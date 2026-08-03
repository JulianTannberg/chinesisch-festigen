// Gemeinsame Realtime-Helfer für die eingeladenen Lernspiele.
(function(){
  "use strict";
  if(window.CF_REALTIME) return;

  let clientPromise = null;

  function normalizeRoom(value){
    return String(value || "")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 6);
  }

  function randomRoom(){
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const bytes = new Uint8Array(6);
    if(window.crypto && crypto.getRandomValues) crypto.getRandomValues(bytes);
    else for(let i=0;i<bytes.length;i++) bytes[i] = Math.floor(Math.random()*256);
    return Array.from(bytes, b => alphabet[b % alphabet.length]).join("");
  }

  function playerId(){
    let id = sessionStorage.getItem("cf_realtime_player_v1");
    if(id) return id;
    id = (window.crypto && crypto.randomUUID)
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem("cf_realtime_player_v1", id);
    return id;
  }

  async function getClient(){
    if(clientPromise) return clientPromise;
    clientPromise = (async () => {
      if(window.CF_SYNC && CF_SYNC.ready){
        try{ await CF_SYNC.ready; }catch(_err){}
      }
      if(!window.supabase || typeof window.supabase.createClient !== "function"){
        throw new Error("Die Online-Verbindung ist noch nicht bereit.");
      }
      const cfg = window.CF_CONFIG || {};
      const url = String(cfg.supabaseUrl || "").trim();
      const key = String(cfg.supabasePublishableKey || cfg.supabaseAnonKey || "").trim();
      if(!url || !key) throw new Error("Supabase ist noch nicht eingerichtet.");
      return window.supabase.createClient(url, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false
        },
        realtime: { params: { eventsPerSecond: 20 } }
      });
    })();
    return clientPromise;
  }

  async function createChannel(topic){
    const client = await getClient();
    const channel = client.channel(topic, {
      config: {
        broadcast: { ack: true, self: false },
        private: false
      }
    });
    return {client, channel};
  }

  async function send(channel, event, payload){
    if(!channel) throw new Error("Keine Verbindung zum Spielraum.");
    return channel.send({type:"broadcast", event, payload:payload || {}});
  }

  async function remove(client, channel){
    if(!client || !channel) return;
    try{ await client.removeChannel(channel); }catch(_err){}
  }

  function roomUrl(page, code){
    const url = new URL(page, location.href);
    url.searchParams.set("room", normalizeRoom(code));
    return url.toString();
  }

  async function copyText(text){
    if(navigator.clipboard && window.isSecureContext){
      await navigator.clipboard.writeText(text);
      return true;
    }
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }

  async function shareInvite(title, text, url){
    if(navigator.share){
      await navigator.share({title, text, url});
      return "shared";
    }
    await copyText(url);
    return "copied";
  }

  function signedIn(){
    try{
      return Boolean(window.CF_SYNC && CF_SYNC.getState && CF_SYNC.getState().signedIn);
    }catch(_err){ return false; }
  }

  window.CF_REALTIME = {
    normalizeRoom,
    randomRoom,
    playerId,
    getClient,
    createChannel,
    send,
    remove,
    roomUrl,
    copyText,
    shareInvite,
    signedIn
  };
})();
