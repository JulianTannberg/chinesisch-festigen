// Chinesisch festigen – gemeinsame Hilfsfunktionen für alle Seiten.
// Wird nach topics.js und vor dem Seitenskript geladen.

function qs(name, fallback="01"){
  const p = new URLSearchParams(location.search);
  return (p.get(name) || fallback).padStart(2,"0");
}

function getTopic(){
  const id = qs("id");
  return (window.CF_TOPICS || []).find(t => t.id === id) || window.CF_TOPICS[0];
}

function escapeHtml(s){
  return String(s ?? "").replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

function shuffle(array){
  const a = array.slice();
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Helligkeit einer Hex-Farbe (0 = schwarz, 1 = weiß)
function cfLuminance(hex){
  const h = String(hex || "").replace("#","");
  if(h.length < 6) return 0;
  const v = [0,2,4].map(i => {
    let c = parseInt(h.substring(i, i+2), 16) / 255;
    return c <= .03928 ? c/12.92 : Math.pow((c+.055)/1.055, 2.4);
  });
  return .2126*v[0] + .7152*v[1] + .0722*v[2];
}

// Setzt die Kapitelfarbe und schaltet bei hellen Farben auf dunkle
// Texte/Rahmen um (Klasse "theme-light" auf <html>).
function applyTheme(topic, pageSuffix){
  try{ window.CF_CHAPTER = topic && topic.id; }catch(e){}
  const accent = topic.accent || "#03172B";
  // Helles Kapitel = in topics.js ist eine dunkle Textfarbe definiert.
  // Fallback: Helligkeit der Akzentfarbe.
  const light = topic.textColor
    ? cfLuminance(topic.textColor) < 0.5
    : cfLuminance(accent) > 0.55;
  const root = document.documentElement;
  root.style.setProperty("--chapter-bg", accent);
  root.style.setProperty("--accent", accent);
  root.style.setProperty("--chapter-text", topic.textColor || (light ? "#0B1B2E" : "#FFFFFF"));
  root.classList.toggle("theme-light", light);
  const meta = document.querySelector('meta[name="theme-color"]');
  if(meta) meta.setAttribute("content", accent);
  document.title = `${topic.id}. ${topic.title} · ${pageSuffix || "Chinesisch festigen"}`;
}

// Hat ein Kapitel schon Inhalt? (für die Kapitelübersicht)
function topicHasContent(t){
  return Boolean((t.vocab || []).length || (t.storyDialog || []).length);
}

// PWA: Service Worker registrieren (nur über HTTPS oder localhost möglich)
(function(){
  if(!("serviceWorker" in navigator)) return;
  const ok = location.protocol === "https:" || ["localhost","127.0.0.1"].includes(location.hostname);
  if(!ok) return;
  // Sobald eine NEUE Version aktiv wird, lädt die Seite genau einmal neu,
  // damit alle Dateien frisch sind (kein doppeltes Laden von Hand nötig).
  let cfReloaded = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if(cfReloaded) return;
    cfReloaded = true;
    location.reload();
  });
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").then(reg => {
      // Beim Öffnen aktiv nach einer neuen Version suchen
      try{ reg.update(); }catch(e){}
    }).catch(() => {});
  });
})();

// Chinesische Sprachausgabe (gemeinsam für Spiele/Übungen).
// ===== ElevenLabs-Audios mit Browserstimme als Fallback =====
// Schema: audio/audio_<kapitel>_<typ>_<hanzi>.<ext>  (typ: "vocable" | "story")
// Beispiel: audio/audio_01_vocable_人.mp3
window.CF_AUDIO = window.CF_AUDIO || {
  enabled: true,        // false = immer Browserstimme (z. B. zum Testen)
  base: "audio/",       // Ordner mit den Audiodateien
  ext: ".mp3",          // Dateiendung
  name: function(text){ return String(text == null ? "" : text).trim(); }, // Hanzi-Teil = exakt der Text
  // Sprecher-Kürzel für Story-Dateien (Hanzi-Name -> lateinisch). Erweiterbar.
  speakerId: function(name){
    var m = {"苏然":"suran","林月":"linyue","suran":"suran","linyue":"linyue"};
    return m[name] || String(name == null ? "" : name).trim();
  }
};
function cfAudioUrl(text, chapter, type, speaker){
  if(!text || !chapter || !type) return "";
  var stem;
  if(type === "story" && speaker){
    stem = "audio_" + chapter + "_story_" + window.CF_AUDIO.speakerId(speaker) + "_" + window.CF_AUDIO.name(text);
  }else{
    stem = "audio_" + chapter + "_" + type + "_" + window.CF_AUDIO.name(text);
  }
  return window.CF_AUDIO.base + encodeURIComponent(stem) + window.CF_AUDIO.ext;
}
var _cfAudioIndex = null;
function _cfBuildAudioIndex(){
  var m = {};
  (window.CF_TOPICS || []).forEach(function(t){
    (t.vocab || []).forEach(function(v){ if(v && v.zh){ (m[v.zh] = m[v.zh] || []).push({chapter:t.id, type:"vocable"}); } });
    (t.understandingVocab || []).forEach(function(v){ if(v && v.zh){ (m[v.zh] = m[v.zh] || []).push({chapter:t.id, type:"vocable"}); } });
    (t.storyDialog || []).forEach(function(l){ if(l && l.zh){ (m[l.zh] = m[l.zh] || []).push({chapter:t.id, type:"story", speaker: window.CF_AUDIO.speakerId(l.speaker)}); } });
  });
  // Einzelzeichen aus dem Schreibtraining (Bausteine) – als vocable
  var bau = window.CF_BAUSTEINE || {};
  Object.keys(bau).forEach(function(cid){
    var d = bau[cid]; if(!d || !d.chars) return;
    Object.keys(d.chars).forEach(function(ch){ (m[ch] = m[ch] || []).push({chapter:cid, type:"vocable"}); });
  });
  return m;
}
function cfAudioUrlFor(text, speaker){
  if(!window.CF_AUDIO || window.CF_AUDIO.enabled === false || !text) return "";
  if(!_cfAudioIndex) _cfAudioIndex = _cfBuildAudioIndex();
  var cands = _cfAudioIndex[String(text)];
  if(!cands || !cands.length) return "";
  var sp = speaker ? window.CF_AUDIO.speakerId(speaker) : null;
  // bevorzugt: passender Sprecher; dann aktuelles Kapitel; sonst erstes
  var pick = null;
  if(sp) pick = cands.find(function(x){ return x.speaker === sp && (!window.CF_CHAPTER || x.chapter === window.CF_CHAPTER); })
              || cands.find(function(x){ return x.speaker === sp; });
  if(!pick && window.CF_CHAPTER) pick = cands.find(function(x){ return x.chapter === window.CF_CHAPTER; });
  if(!pick) pick = cands[0];
  return cfAudioUrl(text, pick.chapter, pick.type, pick.speaker);
}
var _cfQueue = [], _cfPlaying = false, _cfCurAudio = null, _cfCurOnend = null;
function _cfStopAll(){
  var cb = _cfCurOnend; _cfCurOnend = null;
  var q = _cfQueue; _cfQueue = [];
  if(_cfCurAudio){ try{ _cfCurAudio.pause(); }catch(e){} _cfCurAudio = null; }
  _cfPlaying = false;
  if("speechSynthesis" in window){ try{ speechSynthesis.cancel(); }catch(e){} }
  if(cb) cb();
  q.forEach(function(it){ if(it.onend) it.onend(); });
}
function _cfTts(text, rate, cb){
  if(!("speechSynthesis" in window) || !text){ if(cb) cb(); return; }
  try{
    var u = new SpeechSynthesisUtterance(String(text));
    u.lang = "zh-CN";
    u.rate = rate || 0.9;
    var voices = speechSynthesis.getVoices ? speechSynthesis.getVoices() : [];
    var v = voices.find(function(x){ return (x.lang || "").toLowerCase().startsWith("zh"); });
    if(v) u.voice = v;
    u.onend = function(){ if(cb) cb(); };
    u.onerror = function(){ if(cb) cb(); };
    speechSynthesis.speak(u);
  }catch(e){ if(cb) cb(); }
}
function _cfNext(){
  if(_cfPlaying) return;
  var it = _cfQueue.shift();
  if(!it) return;
  _cfPlaying = true;
  _cfCurOnend = it.onend || null;
  var afterEnd = function(){ _cfPlaying = false; _cfCurAudio = null; var cb = _cfCurOnend; _cfCurOnend = null; if(cb) cb(); _cfNext(); };
  if(!it.url){ _cfTts(it.text, it.rate, afterEnd); return; }
  var a = null; try{ a = new Audio(it.url); }catch(e){ a = null; }
  if(!a){ _cfTts(it.text, it.rate, afterEnd); return; }
  _cfCurAudio = a;
  try{ a.preservesPitch = true; a.mozPreservesPitch = true; a.webkitPreservesPitch = true; }catch(e){}
  if(it.rate){ a.playbackRate = Math.max(0.5, Math.min(1.5, it.rate)); }
  var done = false;
  var finish = function(useTts){
    if(done) return; done = true; _cfCurAudio = null;
    if(useTts){ _cfTts(it.text, it.rate, afterEnd); }
    else { afterEnd(); }
  };
  a.addEventListener("ended", function(){ finish(false); });
  a.addEventListener("error", function(){ finish(true); }); // Datei fehlt -> Browserstimme
  var pr = null; try{ pr = a.play(); }catch(e){ finish(true); }
  if(pr && typeof pr.catch === "function") pr.catch(function(){ finish(true); });
}
// opts: { rate: 0.5–1.5, queue: true = anhängen, onend: Callback nach Ende }
function cfSpeakZh(text, opts){
  opts = opts || {};
  if(!text){ if(opts.onend) opts.onend(); return; }
  if(!opts.queue) _cfStopAll();
  _cfQueue.push({ url: cfAudioUrlFor(text, opts.speaker), text: String(text), rate: opts.rate, onend: opts.onend });
  _cfNext();
}

// Enthält der Text chinesische Zeichen? (Satzzeichen-Karten nicht vorlesen)
function cfHasCJK(s){ return /[\u4e00-\u9fff]/.test(String(s || "")); }

// Gerätetyp für gerätespezifische Hinweise
function cfDetectDevice(){
  const ua = navigator.userAgent || "";
  const touchMac = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  if(/iPad/.test(ua) || touchMac) return "ipad";
  if(/iPhone|iPod/.test(ua)) return "iphone";
  if(/Android/.test(ua)) return "android";
  if(/Mac/.test(ua)) return "mac";
  return "windows";
}

// iPhone/iPad? Dort funktioniert die Browser-Spracherkennung nicht
// zuverlässig, auch wenn die Schnittstelle vorhanden ist.
function cfIsIOS(){
  const d = cfDetectDevice();
  return d === "iphone" || d === "ipad";
}

// Kurzer Bestätigungs-/Fehlerton (ohne Audiodateien, funktioniert offline)
let _cfAudioCtx = null;
function cfPlayFeedback(ok){
  try{
    const AC = window.AudioContext || window.webkitAudioContext;
    if(!AC) return;
    if(!_cfAudioCtx) _cfAudioCtx = new AC();
    if(_cfAudioCtx.state === "suspended") _cfAudioCtx.resume();
    const ctx = _cfAudioCtx;
    const t = ctx.currentTime;
    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
    const osc = ctx.createOscillator();
    osc.type = ok ? "sine" : "triangle";
    if(ok){
      osc.frequency.setValueAtTime(660, t);
      osc.frequency.setValueAtTime(880, t + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
      osc.start(t); osc.stop(t + 0.36);
    }else{
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.setValueAtTime(170, t + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
      osc.start(t); osc.stop(t + 0.31);
    }
    osc.connect(gain);
  }catch(e){}
}

// Punktestand (0–100 %) pro Übung und Kapitel – für die grüne
// Füllung der Karten auf der Kapitelseite. Kann auch wieder sinken.
function cfSetScore(name, percent, chapterId){
  const id = chapterId || (typeof topic !== "undefined" && topic ? topic.id : "00");
  const p = Math.max(0, Math.min(100, Math.round(Number(percent) || 0)));
  try{ localStorage.setItem(`cf_score_v1_${id}_${name}`, String(p)); }catch(e){}
}
function cfGetScore(name, chapterId){
  const id = chapterId || (typeof topic !== "undefined" && topic ? topic.id : "00");
  const raw = localStorage.getItem(`cf_score_v1_${id}_${name}`);
  if(raw === null) return null;
  const p = Number(raw);
  return Number.isFinite(p) ? Math.max(0, Math.min(100, p)) : null;
}

// Reiter/Buttons anteilig grün einfärben (gleiche Optik wie die Karten).
// pairs: Array aus [Selektor oder Element, ScoreName].
function cfPaintTabScores(pairs, chapterId){
  (pairs || []).forEach(([sel, name]) => {
    const el = typeof sel === "string" ? document.querySelector(sel) : sel;
    if(!el) return;
    const p = cfGetScore(name, chapterId);
    if(p === null) return;
    el.style.backgroundImage = `linear-gradient(90deg, rgba(34,197,94,.32) ${p}%, rgba(34,197,94,0) ${p}%)`;
  });
}

// Setzt den Lernfortschritt zurück. Mit chapterId nur dieses Kapitel,
// ohne chapterId alle Kapitel. Name und Einstellungen (Ton, Richtung,
// Hinweise, zuletzt gewählter Reiter) bleiben immer erhalten.
function cfResetProgress(chapterId){
  const keep = new Set(["cf_user_name", "cf_kapitel_tab", "cf_ueben_sound", "cf_ime_hint_hidden"]);
  const keepPrefix = ["cf_memory_sound_", "cf_flash_direction_", "cf_write_direction_"];
  const id = chapterId ? String(chapterId) : null;
  const remove = [];
  for(let i = 0; i < localStorage.length; i++){
    const k = localStorage.key(i);
    if(!k || k.indexOf("cf_") !== 0) continue;
    if(keep.has(k)) continue;
    if(keepPrefix.some(p => k.indexOf(p) === 0)) continue;
    // Nur Schlüssel dieses Kapitels: die Kapitel-ID steht als eigenes
    // Segment im Schlüssel (z. B. cf_score_v1_01_tippen).
    if(id && !k.split("_").includes(id)) continue;
    remove.push(k);
  }
  remove.forEach(k => localStorage.removeItem(k));
  return remove.length;
}


// Audio-Blob an den Cloudflare Worker schicken und erkannten Text zurückgeben.
// Wirft einen Fehler, wenn keine Worker-URL konfiguriert ist oder die Anfrage scheitert.
async function cfTranscribe(blob){
  var url = (window.CF_CONFIG && window.CF_CONFIG.workerUrl) || "";
  if(!url) throw new Error("no-worker");
  var form = new FormData();
  form.append("file", blob, "audio.webm");
  var r = await fetch(url, { method: "POST", body: form });
  if(!r.ok) throw new Error("worker-" + r.status);
  var data = await r.json();
  return (data && data.text) ? String(data.text) : "";
}
function cfWorkerReady(){ return !!((window.CF_CONFIG && window.CF_CONFIG.workerUrl)); }


// Globaler iPad/iOS-Fix: Auf festen Seiten (html.noScroll) darf das Fenster nicht
// verrutschen. Nach dem Schließen der Tastatur / bei Viewport-Änderung wieder oben fixieren.
(function cfPinTopGlobal(){
  function pin(){
    if(!document.documentElement.classList.contains("noScroll")) return;
    try{ window.scrollTo(0, 0); }catch(e){}
    if(document.body) document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  document.addEventListener("focusout", function(){ setTimeout(pin, 60); }, true);
  window.addEventListener("orientationchange", function(){ setTimeout(pin, 120); });
  if(window.visualViewport){
    window.visualViewport.addEventListener("resize", function(){
      var ae = document.activeElement;
      var typing = ae && (ae.tagName === "INPUT" || ae.tagName === "TEXTAREA");
      if(!typing) setTimeout(pin, 60);
    });
  }
})();
