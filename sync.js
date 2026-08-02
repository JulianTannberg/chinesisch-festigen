(function(){
  "use strict";

  const TABLE = "user_progress";
  const BOUND_USER_KEY = "cf_sync_bound_user_v1";
  const META_PREFIX = "cf_sync_meta_v1_";
  const PENDING_PREFIX = "cf_sync_pending_v1_";
  const LAST_SYNC_PREFIX = "cf_sync_last_v1_";
  const SDK_URL = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
  const POLL_MS = 30000;

  const cfg = window.CF_CONFIG || {};
  const supabaseUrl = String(cfg.supabaseUrl || "").trim();
  const supabaseKey = String(cfg.supabasePublishableKey || cfg.supabaseAnonKey || "").trim();
  const configured = Boolean(supabaseUrl && supabaseKey);

  let client = null;
  let currentUser = null;
  let currentSession = null;
  let readyResolve;
  let initialSyncResolve;
  let initialSyncFinished = false;
  let needsRefresh = false;
  let syncPromise = null;
  let flushTimer = null;
  let muted = false;
  let status = configured ? "Verbindung wird vorbereitet …" : "Synchronisierung noch nicht eingerichtet.";
  let lastError = "";
  let lastSync = 0;

  const ready = new Promise(resolve => { readyResolve = resolve; });
  const initialSync = new Promise(resolve => { initialSyncResolve = resolve; });

  function finishInitialSync(){
    if(initialSyncFinished) return;
    initialSyncFinished = true;
    initialSyncResolve(getState());
  }

  const storageProto = window.Storage && window.Storage.prototype;
  const raw = storageProto ? {
    getItem: storageProto.getItem,
    setItem: storageProto.setItem,
    removeItem: storageProto.removeItem,
    key: storageProto.key
  } : null;

  function rawGet(key){
    try{ return raw ? raw.getItem.call(localStorage, key) : localStorage.getItem(key); }
    catch(_err){ return null; }
  }
  function rawSet(key, value){
    muted = true;
    try{
      if(raw) raw.setItem.call(localStorage, key, String(value));
      else localStorage.setItem(key, String(value));
    }catch(_err){}
    muted = false;
  }
  function rawRemove(key){
    muted = true;
    try{
      if(raw) raw.removeItem.call(localStorage, key);
      else localStorage.removeItem(key);
    }catch(_err){}
    muted = false;
  }

  function safeParse(value, fallback){
    try{
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === "object" ? parsed : fallback;
    }catch(_err){ return fallback; }
  }

  function emit(){
    const detail = getState();
    try{ window.dispatchEvent(new CustomEvent("cf-sync-status", {detail})); }catch(_err){}
  }

  function setStatus(text, error){
    status = String(text || "");
    lastError = error ? String(error.message || error) : "";
    emit();
  }

  function shouldSyncKey(key){
    const k = String(key || "");
    if(!k.startsWith("cf_")) return false;
    if(k.startsWith("cf_sync_")) return false;
    if(k === "cf_age_ok") return false;
    if(k === "cf_user_avatar") return false;
    return true;
  }

  function listSyncableLocal(){
    const result = {};
    try{
      for(let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        if(shouldSyncKey(key)) result[key] = localStorage.getItem(key);
      }
    }catch(_err){}
    return result;
  }

  function getBoundUser(){ return rawGet(BOUND_USER_KEY) || ""; }
  function bucketId(){ return (currentUser && currentUser.id) || getBoundUser() || "guest"; }
  function metaKey(id){ return META_PREFIX + String(id || "guest"); }
  function pendingKey(id){ return PENDING_PREFIX + String(id || "guest"); }
  function lastSyncKey(id){ return LAST_SYNC_PREFIX + String(id || "guest"); }
  function readMeta(id){ return safeParse(rawGet(metaKey(id)) || "{}", {}); }
  function readPending(id){ return safeParse(rawGet(pendingKey(id)) || "{}", {}); }
  function writeMeta(id, value){ rawSet(metaKey(id), JSON.stringify(value || {})); }
  function writePending(id, value){ rawSet(pendingKey(id), JSON.stringify(value || {})); }

  function noteChange(key, value, deleted){
    if(muted || !shouldSyncKey(key)) return;
    const id = bucketId();
    const now = Date.now();
    const meta = readMeta(id);
    const pending = readPending(id);
    meta[key] = now;
    pending[key] = {
      value: deleted ? null : String(value),
      deleted: Boolean(deleted),
      updated_at: now
    };
    writeMeta(id, meta);
    writePending(id, pending);
    scheduleFlush();
  }

  function installStorageHooks(){
    if(!storageProto || storageProto.__cfSyncHooked) return;
    try{
      const originalSetItem = storageProto.setItem;
      const originalRemoveItem = storageProto.removeItem;
      storageProto.setItem = function(key, value){
        const isLocal = this === window.localStorage;
        let oldValue = null;
        if(isLocal){ try{ oldValue = originalSetItem === raw.setItem ? raw.getItem.call(this, key) : this.getItem(key); }catch(_err){} }
        const result = originalSetItem.call(this, key, value);
        if(isLocal && oldValue !== String(value)) noteChange(String(key), String(value), false);
        return result;
      };
      storageProto.removeItem = function(key){
        const isLocal = this === window.localStorage;
        let existed = false;
        if(isLocal){ try{ existed = raw.getItem.call(this, key) !== null; }catch(_err){} }
        const result = originalRemoveItem.call(this, key);
        if(isLocal && existed) noteChange(String(key), null, true);
        return result;
      };
      Object.defineProperty(storageProto, "__cfSyncHooked", {value:true, configurable:false});
    }catch(err){
      console.warn("CF_SYNC: localStorage-Hooks konnten nicht installiert werden.", err);
    }
  }

  function scheduleFlush(){
    if(!currentUser || !client || !navigator.onLine) return;
    clearTimeout(flushTimer);
    flushTimer = setTimeout(() => syncNow({quiet:true}), 900);
  }

  function loadSdk(){
    if(window.supabase && typeof window.supabase.createClient === "function") return Promise.resolve(window.supabase);
    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-cf-supabase-sdk="1"]');
      if(existing){
        existing.addEventListener("load", () => resolve(window.supabase), {once:true});
        existing.addEventListener("error", () => reject(new Error("Supabase-Bibliothek konnte nicht geladen werden.")), {once:true});
        return;
      }
      const script = document.createElement("script");
      script.src = SDK_URL;
      script.async = true;
      script.dataset.cfSupabaseSdk = "1";
      script.onload = () => window.supabase ? resolve(window.supabase) : reject(new Error("Supabase-Bibliothek ist nicht verfügbar."));
      script.onerror = () => reject(new Error("Supabase-Bibliothek konnte nicht geladen werden."));
      document.head.appendChild(script);
    });
  }

  function migrateGuestStateToUser(userId){
    const guestMeta = readMeta("guest");
    const guestPending = readPending("guest");
    const userMeta = readMeta(userId);
    const userPending = readPending(userId);
    Object.keys(guestMeta).forEach(key => {
      if(!userMeta[key] || Number(guestMeta[key]) > Number(userMeta[key])) userMeta[key] = guestMeta[key];
    });
    Object.keys(guestPending).forEach(key => {
      const g = guestPending[key];
      const u = userPending[key];
      if(!u || Number(g.updated_at || 0) > Number(u.updated_at || 0)) userPending[key] = g;
    });
    writeMeta(userId, userMeta);
    writePending(userId, userPending);
    rawRemove(metaKey("guest"));
    rawRemove(pendingKey("guest"));
  }

  function clearSyncableLocal(){
    const keys = Object.keys(listSyncableLocal());
    muted = true;
    try{ keys.forEach(key => rawRemove(key)); }finally{ muted = false; }
  }

  async function bindUser(user){
    if(!user) return;
    const previous = getBoundUser();
    if(previous && previous !== user.id){
      clearSyncableLocal();
      rawRemove(metaKey(user.id));
      rawRemove(pendingKey(user.id));
    }else if(!previous){
      migrateGuestStateToUser(user.id);
    }
    rawSet(BOUND_USER_KEY, user.id);
    currentUser = user;
    lastSync = Number(rawGet(lastSyncKey(user.id)) || 0);
    emit();
    await syncNow({initial:true});
  }

  async function fetchRemoteRows(userId){
    const {data, error} = await client
      .from(TABLE)
      .select("key,value,deleted,updated_at")
      .eq("user_id", userId);
    if(error) throw error;
    return Array.isArray(data) ? data : [];
  }

  function ensureLocalOnlyPending(userId, local, remoteByKey, meta, pending){
    const now = Date.now();
    Object.keys(local).forEach(key => {
      if(remoteByKey[key] || pending[key]) return;
      const ts = Number(meta[key] || 0) || now;
      meta[key] = ts;
      pending[key] = {value:String(local[key]), deleted:false, updated_at:ts};
    });
  }

  function applyRemoteRows(userId, rows){
    const local = listSyncableLocal();
    let changed = 0;
    const meta = readMeta(userId);
    const pending = readPending(userId);
    const remoteByKey = {};
    rows.forEach(row => { if(row && shouldSyncKey(row.key)) remoteByKey[row.key] = row; });

    const allKeys = new Set([...Object.keys(local), ...Object.keys(remoteByKey), ...Object.keys(pending)]);
    muted = true;
    try{
      allKeys.forEach(key => {
        const remote = remoteByKey[key];
        const localTs = Number(meta[key] || 0);
        const remoteTs = remote ? Number(remote.updated_at || 0) : 0;

        if(remote && remoteTs >= localTs){
          const before = rawGet(key);
          const after = remote.deleted ? null : (remote.value == null ? "" : String(remote.value));
          if(before !== after) changed++;
          if(remote.deleted) rawRemove(key);
          else rawSet(key, after);
          meta[key] = remoteTs;
          delete pending[key];
          return;
        }

        if(remote && localTs > remoteTs && !pending[key]){
          const value = rawGet(key);
          pending[key] = {value, deleted:value === null, updated_at:localTs};
        }
      });
    }finally{
      muted = false;
    }

    ensureLocalOnlyPending(userId, listSyncableLocal(), remoteByKey, meta, pending);
    writeMeta(userId, meta);
    writePending(userId, pending);
    return changed;
  }

  async function flushPending(userId){
    const pending = readPending(userId);
    const keys = Object.keys(pending).filter(shouldSyncKey);
    if(!keys.length) return 0;

    let sent = 0;
    for(let i = 0; i < keys.length; i += 100){
      const batchKeys = keys.slice(i, i + 100);
      const rows = batchKeys.map(key => {
        const item = pending[key] || {};
        return {
          user_id: userId,
          key,
          value: item.deleted ? null : String(item.value == null ? "" : item.value),
          deleted: Boolean(item.deleted),
          updated_at: Number(item.updated_at || Date.now())
        };
      });
      const {error} = await client.from(TABLE).upsert(rows, {onConflict:"user_id,key"});
      if(error) throw error;

      const latest = readPending(userId);
      batchKeys.forEach(key => {
        const before = pending[key];
        const after = latest[key];
        if(after && before && Number(after.updated_at) === Number(before.updated_at)) delete latest[key];
      });
      writePending(userId, latest);
      sent += rows.length;
    }
    return sent;
  }

  async function syncNow(options){
    options = options || {};
    if(!configured) throw new Error("Supabase ist noch nicht eingerichtet.");
    await ready;
    if(!client || !currentUser) throw new Error("Bitte zuerst anmelden.");
    if(!navigator.onLine) throw new Error("Keine Internetverbindung.");
    if(syncPromise) return syncPromise;

    syncPromise = (async () => {
      if(!options.quiet) setStatus("Fortschritt wird synchronisiert …");
      try{
        const rows = await fetchRemoteRows(currentUser.id);
        const changed = applyRemoteRows(currentUser.id, rows);
        if(changed > 0){
          needsRefresh = true;
          try{ window.dispatchEvent(new CustomEvent("cf-sync-applied", {detail:{changed}})); }catch(_err){}
        }
        await flushPending(currentUser.id);
        lastSync = Date.now();
        rawSet(lastSyncKey(currentUser.id), String(lastSync));
        setStatus("Fortschritt ist synchronisiert.");
        return true;
      }catch(err){
        console.error("CF_SYNC:", err);
        setStatus("Synchronisierung nicht möglich.", err);
        throw err;
      }finally{
        syncPromise = null;
      }
    })();
    return syncPromise;
  }

  async function sendOtp(email){
    await ready;
    if(!client) throw new Error("Supabase ist noch nicht eingerichtet.");
    const normalized = String(email || "").trim().toLowerCase();
    if(!/^\S+@\S+\.\S+$/.test(normalized)) throw new Error("Bitte eine gültige E-Mail-Adresse eingeben.");
    setStatus("Anmeldecode wird gesendet …");
    const {error} = await client.auth.signInWithOtp({
      email: normalized,
      options: {shouldCreateUser:true}
    });
    if(error){ setStatus("Anmeldecode konnte nicht gesendet werden.", error); throw error; }
    setStatus("Der Anmeldecode wurde per E-Mail gesendet.");
    return normalized;
  }

  async function verifyOtp(email, token){
    await ready;
    if(!client) throw new Error("Supabase ist noch nicht eingerichtet.");
    const normalized = String(email || "").trim().toLowerCase();
    const cleanToken = String(token || "").replace(/\s+/g, "");
    if(!cleanToken) throw new Error("Bitte den Code aus der E-Mail eingeben.");
    setStatus("Code wird geprüft …");
    const {data, error} = await client.auth.verifyOtp({email:normalized, token:cleanToken, type:"email"});
    if(error){ setStatus("Der Code konnte nicht bestätigt werden.", error); throw error; }
    if(data && data.user) await bindUser(data.user);
    return data;
  }

  async function signOut(){
    await ready;
    if(!client) return;
    await syncNow({quiet:true}).catch(() => {});
    const {error} = await client.auth.signOut();
    if(error) throw error;
    currentSession = null;
    currentUser = null;
    setStatus("Abgemeldet. Der lokale Fortschritt bleibt auf diesem Gerät erhalten.");
  }

  function getState(){
    return {
      configured,
      ready:Boolean(client) || !configured,
      signedIn:Boolean(currentUser),
      user:currentUser ? {id:currentUser.id, email:currentUser.email || ""} : null,
      status,
      lastError,
      lastSync,
      needsRefresh
    };
  }

  function formatLastSync(){
    if(!lastSync) return "Noch nicht synchronisiert";
    try{ return new Date(lastSync).toLocaleString("de-DE", {dateStyle:"short", timeStyle:"short"}); }
    catch(_err){ return new Date(lastSync).toLocaleString("de-DE"); }
  }

  async function init(){
    installStorageHooks();
    if(!configured){
      readyResolve(getState());
      finishInitialSync();
      emit();
      return;
    }
    try{
      const sdk = await loadSdk();
      client = sdk.createClient(supabaseUrl, supabaseKey, {
        auth:{persistSession:true, autoRefreshToken:true, detectSessionInUrl:true}
      });
      const {data, error} = await client.auth.getSession();
      if(error) throw error;
      currentSession = data && data.session ? data.session : null;
      currentUser = currentSession ? currentSession.user : null;
      readyResolve(getState());
      if(currentUser) await bindUser(currentUser);
      else setStatus("Nicht angemeldet. Der Fortschritt wird nur auf diesem Gerät gespeichert.");
      finishInitialSync();

      client.auth.onAuthStateChange((_event, session) => {
        currentSession = session || null;
        const user = session && session.user ? session.user : null;
        setTimeout(() => {
          if(user) bindUser(user).catch(err => setStatus("Synchronisierung nicht möglich.", err));
          else{
            currentUser = null;
            setStatus("Nicht angemeldet. Der Fortschritt wird nur auf diesem Gerät gespeichert.");
          }
        }, 0);
      });
    }catch(err){
      client = null;
      currentUser = null;
      readyResolve(getState());
      finishInitialSync();
      setStatus("Supabase konnte nicht geladen werden. Die App funktioniert weiterhin lokal.", err);
    }
  }

  window.addEventListener("online", () => { if(currentUser) syncNow({quiet:true}).catch(() => {}); });
  window.addEventListener("focus", () => { if(currentUser) syncNow({quiet:true}).catch(() => {}); });
  document.addEventListener("visibilitychange", () => {
    if(document.visibilityState === "visible" && currentUser) syncNow({quiet:true}).catch(() => {});
  });
  setInterval(() => { if(currentUser && navigator.onLine) syncNow({quiet:true}).catch(() => {}); }, POLL_MS);

  window.CF_SYNC = {
    ready,
    initialSync,
    getState,
    formatLastSync,
    sendOtp,
    verifyOtp,
    signOut,
    syncNow,
    isConfigured:() => configured
  };

  init();
})();
