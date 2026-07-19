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
    navigator.serviceWorker.register("sw.js", { updateViaCache: "none" }).then(reg => {
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
    var m = {"苏然":"suran","蘇然":"suran","Sū Rán":"suran","Sū Rán (WeChat)":"suran","林月":"linyue","Lín Yuè":"linyue","男人":"nanren","suran":"suran","linyue":"linyue","nanren":"nanren"};
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
  // Einzelzeichen: ALLE Hanzi des Kapitels (Vokabeln + Zusatz + Geschichte) als vocable,
  // damit beim Antippen der Kärtchen (Üben) und im Schreibtraining jede Datei greift.
  (window.CF_TOPICS || []).forEach(function(t){
    var seen = {};
    function addChars(s){
      String(s || "").split("").forEach(function(ch){
        if(/[\u4e00-\u9fff]/.test(ch) && !seen[ch]){ seen[ch] = 1; (m[ch] = m[ch] || []).push({chapter:t.id, type:"vocable"}); }
      });
    }
    (t.vocab || []).forEach(function(v){ if(v) addChars(v.zh); });
    (t.understandingVocab || []).forEach(function(v){ if(v) addChars(v.zh); });
    (t.storyDialog || []).forEach(function(l){ if(l) addChars(l.zh); });
  });
  return m;
}
function cfAudioUrlFor(text, speaker){
  if(!window.CF_AUDIO || window.CF_AUDIO.enabled === false || !text) return "";
  if(!_cfAudioIndex) _cfAudioIndex = _cfBuildAudioIndex();
  var cands = _cfAudioIndex[String(text)];
  if(!cands || !cands.length) return "";
  var cur = window.CF_CHAPTER;
  var sp = speaker ? window.CF_AUDIO.speakerId(speaker) : null;
  var pick = null;
  if(sp){
    // Bei angegebenem Sprecher NUR gleiche Stimme (Story) ODER sprecherneutrale Vokabel.
    // KEIN Rückgriff auf eine fremde Stimme – sonst lieber Browserstimme.
    pick = cands.find(function(x){ return x.speaker === sp && (!cur || x.chapter === cur); })
        || cands.find(function(x){ return x.speaker === sp; })
        || cands.find(function(x){ return !x.speaker && (!cur || x.chapter === cur); })
        || cands.find(function(x){ return !x.speaker; });
    return pick ? cfAudioUrl(text, pick.chapter, pick.type, pick.speaker) : "";
  }
  pick = (cur && cands.find(function(x){ return x.chapter === cur; })) || cands[0];
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
// Stimmen einmalig vorwärmen (iOS/Safari liefert getVoices() anfangs leer –
// die Liste kommt erst per voiceschanged). Wir cachen sie, sobald verfügbar.
var _cfVoices = [];
function _cfLoadVoices(){
  try{
    if(!("speechSynthesis" in window)) return;
    var v = speechSynthesis.getVoices ? speechSynthesis.getVoices() : [];
    if(v && v.length) _cfVoices = v;
  }catch(e){}
}
if("speechSynthesis" in window){
  _cfLoadVoices();
  try{ speechSynthesis.addEventListener("voiceschanged", _cfLoadVoices); }catch(e){
    try{ speechSynthesis.onvoiceschanged = _cfLoadVoices; }catch(e2){}
  }
  // iOS/Safari: Sprachausgabe muss einmal innerhalb einer echten Nutzer-Geste
  // „entsperrt“ werden. Beim ersten Tipp einen leeren, stummen Spruch absetzen,
  // danach funktioniert speak() auch in späteren (verschachtelten) Aufrufen.
  var _cfSpeechUnlocked = false;
  var _cfUnlockSpeech = function(){
    if(_cfSpeechUnlocked) return;
    _cfSpeechUnlocked = true;
    try{
      var u = new SpeechSynthesisUtterance(" ");
      u.volume = 0; u.rate = 1;
      speechSynthesis.speak(u);
    }catch(e){}
    _cfLoadVoices();
  };
  ["touchend","pointerdown","mousedown","keydown"].forEach(function(ev){
    document.addEventListener(ev, _cfUnlockSpeech, { once:false, passive:true, capture:true });
  });
}
function _cfTts(text, rate, cb){
  if(!("speechSynthesis" in window) || !text){ if(cb) cb(); return; }
  try{
    // iOS-Eigenheit: speechSynthesis bleibt manchmal „pausiert“ hängen und
    // spricht dann nicht mehr. Vor jedem Sprechen aufwecken.
    try{ if(speechSynthesis.paused) speechSynthesis.resume(); }catch(e){}
    var u = new SpeechSynthesisUtterance(String(text));
    u.lang = "zh-CN";
    u.rate = rate || 0.9;
    if(!_cfVoices.length) _cfLoadVoices();
    var v = _cfVoices.find(function(x){ return (x.lang || "").toLowerCase().indexOf("zh") === 0; })
         || _cfVoices.find(function(x){ return (x.lang || "").toLowerCase().indexOf("zh") !== -1; });
    if(v) u.voice = v;
    var done = false;
    u.onend = function(){ if(done) return; done = true; if(cb) cb(); };
    u.onerror = function(){ if(done) return; done = true; if(cb) cb(); };
    speechSynthesis.speak(u);
    // Sicherheitsnetz: Falls onend/onerror auf iOS ausbleibt, Callback nach
    // einer geschätzten Dauer trotzdem auslösen, damit die Warteschlange läuft.
    var est = 700 + String(text).length * 220;
    setTimeout(function(){ if(done) return; done = true; if(cb) cb(); }, est);
  }catch(e){ if(cb) cb(); }
}
function _cfNext(){
  if(_cfPlaying) return;
  var it = _cfQueue.shift();
  if(!it) return;
  _cfPlaying = true;
  _cfCurOnend = it.onend || null;
  var afterEnd = function(){ _cfPlaying = false; _cfCurAudio = null; var cb = _cfCurOnend; _cfCurOnend = null; if(cb) cb(); _cfNext(); };
  // Keine Audiodatei hinterlegt -> direkt Browserstimme.
  if(!it.url){ _cfTts(it.text, it.rate, afterEnd); return; }
  // iOS/Safari: Die Browserstimme funktioniert nur, wenn sie SYNCHRON aus der
  // Antipp-Geste heraus startet. Der Umweg „Audiodatei laden -> Fehler -> Stimme“
  // ist asynchron und bleibt auf dem iPhone still. Da die App in der Regel ohne
  // Audiodateien läuft, sprechen wir auf iOS sofort mit der Browserstimme.
  if(cfIsIOS()){ _cfTts(it.text, it.rate, afterEnd); return; }
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
// Wie cfSetScore, aber der Wert kann nur STEIGEN, nie fallen. Wird im
// „Fehler wiederholen“-Modus benutzt: ein zweiter Durchgang darf den
// Punktestand verbessern, aber niemals verschlechtern.
function cfRaiseScore(name, percent, chapterId){
  const cur = cfGetScore(name, chapterId);
  const p = Math.max(0, Math.min(100, Math.round(Number(percent) || 0)));
  if(cur === null || p > cur) cfSetScore(name, p, chapterId);
}

// Alle wertbaren Aktivitäten eines Kapitels (eine Quelle der Wahrheit).
var CF_SCORE_NAMES = ["hoeren","lernen","tippen","schreibtraining","sprechen",
  "ueben_hoeren","ueben_zhde","ueben_dezh","flash","memory","luecken"];

// „Durchgearbeitet"-Markierung: eine Aktivität gilt als erledigt, sobald sie
// EINMAL komplett durchgespielt wurde – unabhängig davon, wie viel davon richtig
// war. (Prozente zählen weiter nur das, was beim ersten Mal richtig war.)
// Dient allein der Freischaltung des nächsten Kapitels.
function cfMarkDone(name, chapterId){
  const id = chapterId || (typeof topic !== "undefined" && topic ? topic.id : "00");
  try{ localStorage.setItem(`cf_done_v1_${id}_${name}`, "1"); }catch(e){}
}
function cfIsDone(name, chapterId){
  const id = chapterId || (typeof topic !== "undefined" && topic ? topic.id : "00");
  try{ return localStorage.getItem(`cf_done_v1_${id}_${name}`) === "1"; }catch(e){ return false; }
}

// Hat das Kapitel überhaupt Inhalt für diese Aktivität? (sonst nicht mitzählen)
function cfActivityApplicable(topic, name){
  if(!topic) return false;
  const hasVocab = (topic.vocab || []).length > 0;
  const hasStory = (topic.storyDialog || []).length > 0;
  const hasGaps  = (topic.gapExercises || []).length > 0;
  const hasChars = !!(window.CF_BAUSTEINE && window.CF_BAUSTEINE[topic.id] &&
                      window.CF_BAUSTEINE[topic.id].chars &&
                      Object.keys(window.CF_BAUSTEINE[topic.id].chars).length);
  switch(name){
    case "memory": case "flash": case "tippen": return hasVocab;
    case "luecken": return hasGaps;
    case "ueben_hoeren": case "ueben_zhde": case "ueben_dezh": case "sprechen": return hasStory;
    case "hoeren": return hasVocab || hasStory;
    case "lernen": case "schreibtraining": return hasChars;
    default: return true;
  }
}

// Mittel über die ANWENDBAREN Aktivitäten. Nicht gespielte zählen als 0,
// d. h. eine Gruppe/ein Kapitel ist erst 100 %, wenn wirklich alles 100 % ist.
// Gibt null zurück, wenn keine Aktivität anwendbar ist (leeres Kapitel).
function cfGroupPercent(topic, names){
  if(!topic) return null;
  const appl = (names || []).filter(n => cfActivityApplicable(topic, n));
  if(!appl.length) return null;
  let sum = 0;
  for(const n of appl){ sum += (cfGetScore(n, topic.id) || 0); }
  return Math.round(sum / appl.length);
}

// Gesamtfortschritt eines Kapitels über alle anwendbaren Aktivitäten.
function cfChapterPercent(topic){
  return cfGroupPercent(topic, CF_SCORE_NAMES);
}

// Ist das Kapitel komplett DURCHGEARBEITET? D. h. jede anwendbare,
// prozentgebende Aktivität wurde mindestens einmal bis zum Ende gespielt –
// egal ob richtig oder falsch. Das ist die Bedingung für die Freischaltung
// des nächsten Kapitels (NICHT 100 %). Gibt false bei leeren Kapiteln.
function cfChapterWorkedThrough(topic){
  if(!topic) return false;
  const appl = CF_SCORE_NAMES.filter(n => cfActivityApplicable(topic, n));
  if(!appl.length) return false;
  return appl.every(n => cfIsDone(n, topic.id));
}

// Das Bonusspiel („Su Rans Reise“) eines Kapitels ist freigeschaltet, sobald das
// Kapitel komplett durchgearbeitet wurde (jede prozentgebende Aktivität einmal
// gespielt). Identische Bedingung wie die Freischaltung des nächsten Kapitels.
function cfBonusGameUnlocked(topic){
  return cfChapterWorkedThrough(topic);
}

// Abschlussgeschichte: Sie wird erst freigeschaltet, wenn wirklich alle
// 15 Kapitel Inhalt haben und jedes davon mindestens einmal vollständig
// durchgearbeitet wurde. Die Prozentwerte sind dafür ausdrücklich egal.
function cfStoryProgress(topics){
  const list = (topics || window.CF_TOPICS || []).slice(0, 15);
  const done = list.filter(t => topicHasContent(t) && cfChapterWorkedThrough(t)).length;
  return { done, total: 15 };
}
function cfStoryUnlocked(topics){
  const list = (topics || window.CF_TOPICS || []).slice(0, 15);
  return list.length === 15 && list.every(t => topicHasContent(t) && cfChapterWorkedThrough(t));
}

// Proper-Name-Reserve für Karten-Übungen: Namen, die GANZ bleiben sollen, aber
// nicht als Verstehen-Vokabel im Kapitel stehen. Mehrzeichige Verstehen-Vokabeln
// (understandingVocab) werden ohnehin automatisch zusammengehalten – die müssen
// hier NICHT rein. AKTIVE Vokabeln (z. B. 北京, 上海, 德国) werden bewusst in
// Einzelzeichen zerlegt, weil sie aktiv geübt werden – auch wenn sie hier stünden.
var CF_PROPER_NAMES = [
  "清华大学","五道口","苏然","林月","微信","支付宝","国庆节","北京烤鸭","中国","美国","鸭子"];

// Zerlegt einen chinesischen Satz in Karten-Token:
//  • Verstehen-Vokabeln (mehrzeichig) und Reserve-Namen bleiben als EINE Karte.
//  • AKTIVE Vokabeln werden zeichenweise getrennt (sie werden ja geübt).
//  • alles andere ebenfalls zeichenweise.
// topic (optional): liefert vocab + understandingVocab des Kapitels.
function cfSplitZhTokens(zh, topic){
  const strip = s => String(s || "").replace(/[\s。！？!?，,、；;：:·.…—–\-]/g, "");
  const clean = strip(zh);

  // aktive Vokabeln werden NICHT zusammengehalten (Übung)
  const activeSet = new Set();
  if(topic && Array.isArray(topic.vocab)){
    for(const v of topic.vocab){ const z = strip(v && v.zh); if(z) activeSet.add(z); }
  }

  let keep = (window.CF_PROPER_NAMES || []).slice();
  if(topic && Array.isArray(topic.understandingVocab)){
    for(const v of topic.understandingVocab){
      const z = strip(v && v.zh);
      if(z.length >= 2) keep.push(z); // Einzelzeichen sind ohnehin schon eine Karte
    }
  }
  // alles Aktive aus der „ganz lassen“-Liste entfernen → wird zerlegt
  keep = [...new Set(keep.filter(Boolean))]
    .filter(w => !activeSet.has(w))
    .sort((a,b) => b.length - a.length);

  const tokens = [];
  let i = 0;
  while(i < clean.length){
    let matched = "";
    for(const n of keep){ if(n && clean.startsWith(n, i)){ matched = n; break; } }
    if(matched){ tokens.push(matched); i += matched.length; }
    else { tokens.push(clean[i]); i += 1; }
  }
  return tokens;
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
  const keep = new Set(["cf_user_name", "cf_kapitel_tab", "cf_ueben_sound", "cf_ime_hint_hidden", "cf_age_ok"]);
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


// Textauswahl kurzzeitig sperren (z. B. während einer gedrückt gehaltenen Aufnahme)
function cfNoSelect(on){ try{ document.body.classList.toggle("cf-noselect", !!on); }catch(e){} }


// Altersbestätigung (mind. 16). Blockiert die App bis bestätigt; auf Rechtsseiten nicht.
function cfAgeGate(){
  try{
    if(localStorage.getItem("cf_age_ok") === "1") return;
  }catch(e){ return; }
  var path = (location.pathname || "").toLowerCase();
  if(path.indexOf("datenschutz") !== -1 || path.indexOf("agb") !== -1 || path.indexOf("impressum") !== -1) return;
  function build(){
    if(!document.body || document.getElementById("cfAgeGate")) return;
    var ov = document.createElement("div");
    ov.id = "cfAgeGate";
    ov.setAttribute("style", "position:fixed;inset:0;z-index:99999;background:#03172B;color:#fff;display:flex;align-items:center;justify-content:center;padding:24px;overflow:auto;-webkit-user-select:none;user-select:none;");
    ov.innerHTML =
      '<div style="max-width:440px;width:100%;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);border-radius:20px;padding:22px;">' +
        '<div style="font-size:22px;font-weight:850;margin-bottom:10px;">Kurz bestätigen</div>' +
        '<p style="font-size:15px;line-height:1.5;opacity:.92;margin:0 0 14px;">Bitte bestätige dein Alter, bevor du startest. Für die Sprechübungen kann die App auf dein Mikrofon zugreifen.</p>' +
        ((typeof cfIsIOS === "function" && cfIsIOS()) ? '<p style="font-size:13px;line-height:1.5;opacity:.85;margin:0 0 14px;background:rgba(255,255,255,.06);border-radius:12px;padding:10px 12px;">Hinweis für iPhone/iPad: Die automatische Spracherkennung in den Sprechübungen ist hier derzeit nicht möglich. Hören, das Bauen mit Kärtchen und das Selbst-Aufnehmen in „Aussprache" funktionieren normal.</p>' : '') +
        '<button id="cfAgeYes" type="button" style="width:100%;min-height:52px;font-size:16px;font-weight:800;border-radius:14px;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.16);color:#fff;margin-bottom:10px;">Ich bin mindestens 16 Jahre alt</button>' +
        '<button id="cfAgeNo" type="button" style="width:100%;min-height:44px;font-size:14px;border-radius:14px;border:1px solid rgba(255,255,255,.18);background:transparent;color:#fff;opacity:.85;">Ich bin jünger als 16</button>' +
        '<p style="font-size:12px;line-height:1.5;opacity:.7;margin:14px 0 0;">Mehr dazu in der <a href="datenschutz.html" style="color:#8fc7ff;">Datenschutzerklärung</a>.</p>' +
      '</div>';
    document.body.appendChild(ov);
    document.getElementById("cfAgeYes").addEventListener("click", function(){
      try{ localStorage.setItem("cf_age_ok", "1"); }catch(e){}
      ov.parentNode && ov.parentNode.removeChild(ov);
    });
    document.getElementById("cfAgeNo").addEventListener("click", function(){
      ov.querySelector("div").innerHTML =
        '<div style="font-size:22px;font-weight:850;margin-bottom:10px;">Schade!</div>' +
        '<p style="font-size:15px;line-height:1.5;opacity:.92;margin:0;">Diese App kannst du leider erst ab 16 Jahren nutzen. Schau gern wieder vorbei, wenn du so weit bist.</p>';
    });
  }
  if(document.body) build();
  else document.addEventListener("DOMContentLoaded", build);
}
// cfAgeGate(); // vorerst deaktiviert – keine Altersbestätigung beim Öffnen (Funktion bleibt erhalten)

// App-eigene Rückfrage (statt window.confirm). Gibt ein Promise<boolean> zurück.
// Nutzung: if(!(await cfConfirm("Text", {title, confirmText, cancelText}))) return;
function cfConfirm(message, opts){
  opts = opts || {};
  var title       = opts.title       || "Bist du sicher?";
  var confirmText = opts.confirmText || "Zurücksetzen";
  var cancelText  = opts.cancelText  || "Abbrechen";
  var esc = (typeof escapeHtml === "function") ? escapeHtml : function(s){ return String(s == null ? "" : s); };
  return new Promise(function(resolve){
    if(typeof document === "undefined" || !document.body){ resolve(false); return; }
    var prev = document.getElementById("cfConfirm");
    if(prev && prev.parentNode) prev.parentNode.removeChild(prev);
    var ov = document.createElement("div");
    ov.id = "cfConfirm";
    ov.setAttribute("style", "position:fixed;inset:0;z-index:99998;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(3,12,24,.66);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);-webkit-user-select:none;user-select:none;");
    ov.innerHTML =
      '<div role="dialog" aria-modal="true" style="max-width:380px;width:100%;background:#16222F;border:1px solid rgba(255,255,255,.16);border-radius:18px;padding:20px;box-shadow:0 18px 50px rgba(0,0,0,.45);color:#fff;font-family:inherit;">' +
        '<div style="font-size:18px;font-weight:850;margin-bottom:8px;">' + esc(title) + '</div>' +
        '<p style="font-size:14px;line-height:1.5;opacity:.9;margin:0 0 18px;white-space:pre-line;">' + esc(message) + '</p>' +
        '<div style="display:flex;gap:10px;">' +
          '<button id="cfConfirmNo" type="button" style="flex:1;min-height:48px;font-size:15px;font-weight:800;border-radius:13px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);color:#fff;cursor:pointer;">' + esc(cancelText) + '</button>' +
          '<button id="cfConfirmYes" type="button" style="flex:1;min-height:48px;font-size:15px;font-weight:800;border-radius:13px;border:1px solid rgba(229,115,115,.55);background:rgba(214,69,69,.9);color:#fff;cursor:pointer;">' + esc(confirmText) + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ov);
    function close(val){ if(ov.parentNode) ov.parentNode.removeChild(ov); resolve(val); }
    document.getElementById("cfConfirmYes").addEventListener("click", function(){ close(true); });
    document.getElementById("cfConfirmNo").addEventListener("click", function(){ close(false); });
    ov.addEventListener("click", function(e){ if(e.target === ov) close(false); });
  });
}

// ===== Feier bei 100 % im Kapitel (Konfetti + Lampions, chinesisch angehaucht) =====
// Selbstständig, ohne Bibliothek. Overlay blockiert nichts (pointer-events:none)
// und entfernt sich von allein.
function cfEnsureCelebrateStyle(){
  if(document.getElementById("cfCelebrateStyle")) return;
  var st = document.createElement("style");
  st.id = "cfCelebrateStyle";
  st.textContent =
    "#cfCelebrate{position:fixed;inset:0;z-index:99999;pointer-events:none;overflow:hidden;}" +
    "#cfCelebrate .cfConf{position:absolute;top:-12vh;width:10px;height:14px;border-radius:2px;opacity:.95;animation:cfFall linear forwards;}" +
    // Endlos-Konfetti (für die dauerhafte 100-%-Feier): fällt immer wieder neu.
    "#cfCelebrate.cfHold .cfConf{animation-iteration-count:infinite;}" +
    // Lampion baumelt jetzt OBEN am Bildschirmrand (fällt nicht herab). Er hängt
    // an einer Schnur vom oberen Rand und schwingt sanft hin und her.
    "#cfCelebrate .cfLamp{position:absolute;top:0;font-size:34px;transform-origin:50% 0;}" +
    "#cfCelebrate .cfLamp .cfLampSwing{display:inline-block;transform-origin:50% -34px;animation:cfSwing ease-in-out infinite alternate;}" +
    "#cfCelebrate .cfLamp .cfLampSwing::before{content:'';position:absolute;left:50%;top:-34px;width:2px;height:34px;background:rgba(255,210,120,.7);transform:translateX(-50%);}" +
    // Kranich: fliegt quer über den Bildschirm und schwebt dabei sanft auf und ab.
    // .cfCrane = Flug (X), .craneBob = Schweben (Y), img = Spiegelung der Richtung.
    "#cfCelebrate .cfCrane{position:absolute;will-change:transform;animation:cfFlyR linear forwards;}" +
    "#cfCelebrate .cfCrane.l{animation-name:cfFlyL;}" +
    // Endlos-Kraniche (dauerhafte Feier): fliegen immer wieder hin und her.
    "#cfCelebrate.cfHold .cfCrane{animation-iteration-count:infinite;}" +
    "#cfCelebrate .craneBob{animation:cfBob ease-in-out infinite alternate;}" +
    "#cfCelebrate .cfCrane img{display:block;width:74px;height:auto;filter:drop-shadow(0 6px 10px rgba(0,0,0,.28));}" +
    "#cfCelebrate .cfCrane.l img{transform:scaleX(-1);}" +
    "#cfCelebrate .cfBanner{position:absolute;left:50%;top:38%;transform:translate(-50%,-50%) scale(.4);" +
      "text-align:center;color:#fff;font-weight:800;text-shadow:0 2px 10px rgba(0,0,0,.5);" +
      "animation:cfPop .6s cubic-bezier(.2,1.4,.4,1) forwards, cfFade .8s ease 3.4s forwards;}" +
    // In der dauerhaften Feier bleibt der Banner stehen (kein Ausblenden).
    "#cfCelebrate.cfHold .cfBanner{animation:cfPop .6s cubic-bezier(.2,1.4,.4,1) forwards;}" +
    "#cfCelebrate .cfBanner .cfZh{font-size:46px;color:#ffd966;}" +
    "#cfCelebrate .cfBanner .cfDe{font-size:22px;margin-top:6px;}" +
    "#cfCelebrate.soft .cfBanner .cfZh{font-size:38px;color:#bfe3c6;}" +
    // „Weiter“-Button der dauerhaften Feier – anklickbar (pointer-events aktiv).
    "#cfCelebrate .cfDoneBtn{position:absolute;left:50%;top:62%;transform:translateX(-50%);pointer-events:auto;" +
      "padding:14px 30px;border:none;border-radius:999px;background:#e23b3b;color:#fff;font-size:18px;font-weight:800;" +
      "box-shadow:0 6px 18px rgba(0,0,0,.4);cursor:pointer;opacity:0;animation:cfBtnIn .5s ease .5s forwards;}" +
    "@keyframes cfFall{to{transform:translateY(122vh) rotate(720deg);}}" +
    "@keyframes cfSwing{from{transform:rotate(-16deg);}to{transform:rotate(16deg);}}" +
    "@keyframes cfBob{from{transform:translateY(-7px);}to{transform:translateY(7px);}}" +
    "@keyframes cfFlyR{from{transform:translateX(-16vw);}to{transform:translateX(120vw);}}" +
    "@keyframes cfFlyL{from{transform:translateX(16vw);}to{transform:translateX(-120vw);}}" +
    "@keyframes cfPop{to{transform:translate(-50%,-50%) scale(1);}}" +
    "@keyframes cfFade{to{opacity:0;}}" +
    "@keyframes cfBtnIn{to{opacity:1;}}";
  document.head.appendChild(st);
}

// ===== Große Feier bei 100 % im Kapitel =====
// Dauerhafte 100-%-Feier: Konfetti regnet immer weiter, rote Lampions baumeln
// oben am Rand, Kraniche fliegen endlos hin und her – bis der Button gedrückt wird.
function cfCelebrate(opts){
  opts = opts || {};
  if(document.getElementById("cfCelebrate")) return; // läuft schon
  cfEnsureCelebrateStyle();
  var wrap = document.createElement("div");
  wrap.id = "cfCelebrate";
  wrap.className = "cfHold";
  wrap.setAttribute("aria-hidden", "true");
  var colors = ["#e23b3b","#f5c518","#ffffff","#ff8a3d","#ffd966","#c0392b"];
  var n = opts.pieces || 90;
  for(var i = 0; i < n; i++){
    var c = document.createElement("div");
    c.className = "cfConf";
    c.style.left = (Math.random() * 100) + "vw";
    c.style.background = colors[(Math.random() * colors.length) | 0];
    c.style.animationDuration = (2.2 + Math.random() * 2.2) + "s";
    c.style.animationDelay = (Math.random() * 1.2) + "s";
    if(Math.random() < 0.5) c.style.borderRadius = "50%";
    wrap.appendChild(c);
  }
  // baumelnde rote Lampions am oberen Rand (fallen nicht)
  var lamps = 6;
  for(var k = 0; k < lamps; k++){
    var l = document.createElement("div");
    l.className = "cfLamp";
    l.innerHTML = "<span class='cfLampSwing'>🏮</span>";
    l.style.left = (6 + Math.random() * 86) + "vw";
    l.querySelector(".cfLampSwing").style.animationDuration = (1.4 + Math.random() * 0.9) + "s";
    l.querySelector(".cfLampSwing").style.animationDelay = (Math.random() * 0.8) + "s";
    wrap.appendChild(l);
  }
  // fliegende Kraniche, von beiden Seiten (Aquarell-Bilder), endlos
  var cranes = 5;
  for(var m = 0; m < cranes; m++){
    var cr = document.createElement("div");
    var leftDir = Math.random() < 0.5; // true = fliegt nach links
    cr.className = "cfCrane" + (leftDir ? " l" : "");
    var src = leftDir ? "icons/crane-2.png" : "icons/crane-1.png";
    cr.innerHTML = '<div class="craneBob"><img src="' + src + '" alt="" /></div>';
    cr.style.top = (6 + Math.random() * 48) + "vh";
    cr.style.animationDuration = (5 + Math.random() * 3) + "s";
    cr.style.animationDelay = (Math.random() * 1.6) + "s";
    cr.querySelector("img").style.width = (58 + Math.random() * 34) + "px";
    cr.querySelector(".craneBob").style.animationDuration = (1.5 + Math.random() * 1) + "s";
    wrap.appendChild(cr);
  }
  var banner = document.createElement("div");
  banner.className = "cfBanner";
  banner.innerHTML =
    '<div class="cfZh">' + (opts.zh || "好极了！") + '</div>' +
    '<div class="cfDe">' + (opts.text || "Kapitel zu 100 % gemeistert! 🎉") + '</div>';
  wrap.appendChild(banner);
  // Button beendet die Feier
  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "cfDoneBtn";
  btn.textContent = opts.button || "Weiter";
  var close = function(){ if(wrap.parentNode) wrap.parentNode.removeChild(wrap); };
  btn.addEventListener("click", close);
  wrap.appendChild(btn);
  document.body.appendChild(wrap);
  try{ if(typeof cfPlayFeedback === "function") cfPlayFeedback(true); }catch(e){}
}

// ===== Dezente Feier, wenn ein Kapitel komplett DURCHGEARBEITET wurde =====
// (alles einmal gespielt, aber noch nicht 100 % richtig). Sanfter als die
// große 100-%-Feier: wenige Lampions, kein Feuerwerk, freundliche Botschaft.
function cfCelebrateDone(opts){
  opts = opts || {};
  if(document.getElementById("cfCelebrate")) return;
  cfEnsureCelebrateStyle();
  var wrap = document.createElement("div");
  wrap.id = "cfCelebrate";
  wrap.className = "soft";
  wrap.setAttribute("aria-hidden", "true");
  var colors = ["#9bd3a7","#ffd966","#ffffff","#bfe3c6"];
  for(var i = 0; i < 28; i++){
    var c = document.createElement("div");
    c.className = "cfConf";
    c.style.left = (Math.random() * 100) + "vw";
    c.style.background = colors[(Math.random() * colors.length) | 0];
    c.style.animationDuration = (3 + Math.random() * 2) + "s";
    c.style.animationDelay = (Math.random() * 1.4) + "s";
    if(Math.random() < 0.6) c.style.borderRadius = "50%";
    wrap.appendChild(c);
  }
  for(var k = 0; k < 3; k++){
    var l = document.createElement("div");
    l.className = "cfLamp";
    l.innerHTML = "<span class='cfLampSwing'>🏮</span>";
    l.style.left = (16 + Math.random() * 68) + "vw";
    l.querySelector(".cfLampSwing").style.animationDuration = (1.6 + Math.random() * 0.8) + "s";
    l.querySelector(".cfLampSwing").style.animationDelay = (Math.random() * 0.8) + "s";
    wrap.appendChild(l);
  }
  var banner = document.createElement("div");
  banner.className = "cfBanner";
  banner.innerHTML =
    '<div class="cfZh">' + (opts.zh || "做到了！") + '</div>' +
    '<div class="cfDe">' + (opts.text || "Stark – du hast dieses Kapitel komplett durchgearbeitet!") + '</div>';
  wrap.appendChild(banner);
  document.body.appendChild(wrap);
  try{ if(typeof cfPlayFeedback === "function") cfPlayFeedback(true); }catch(e){}
  setTimeout(function(){ if(wrap.parentNode) wrap.parentNode.removeChild(wrap); }, opts.duration || 4200);
}

// Ausblendbarer Info-Hinweis mit kleiner Dauer-Zeile, die ihn wieder öffnet.
// tipEl = große Box, lineEl = kleine Zeile, btnEl = "Verstanden"-Knopf.
function cfWireInfoTip(tipEl, lineEl, btnEl, storageKey){
  if(!tipEl || !lineEl) return;
  const show = big => { tipEl.style.display = big ? "" : "none"; lineEl.style.display = big ? "none" : ""; };
  let dismissed = false;
  try{ dismissed = localStorage.getItem(storageKey) === "1"; }catch(e){}
  show(!dismissed);
  if(btnEl) btnEl.addEventListener("click", () => { try{ localStorage.setItem(storageKey, "1"); }catch(e){} show(false); });
  lineEl.addEventListener("click", () => show(true)); // wieder anzeigen
}
