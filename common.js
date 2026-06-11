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
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
})();


// Gemeinsame Geräte-, Audio- und Eingabehilfen
function cfDetectDevice(){
  const ua = navigator.userAgent || "";
  const platform = navigator.platform || "";
  const touchMac = platform === "MacIntel" && navigator.maxTouchPoints > 1;
  const isIPad = /iPad/.test(ua) || touchMac;
  const isIPhone = /iPhone|iPod/.test(ua);
  const isIOS = isIPad || isIPhone;
  const isAndroid = /Android/.test(ua);
  const isWindows = /Windows/.test(ua);
  const isMac = /Macintosh|Mac OS X/.test(ua) && !touchMac;
  const isSamsung = /SamsungBrowser/i.test(ua);
  const isBrave = !!navigator.brave;
  const isChrome = /Chrome|CriOS|Chromium/i.test(ua) && !/Edg|OPR|SamsungBrowser/i.test(ua);
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua) || isIOS;
  let type = "desktop";
  if(isIPad) type = "ipad";
  else if(isIPhone) type = "iphone";
  else if(isAndroid) type = "android";
  else if(isWindows) type = "windows";
  else if(isMac) type = "mac";
  return {ua, platform, type, isIPad, isIPhone, isIOS, isAndroid, isWindows, isMac, isSamsung, isBrave, isChrome, isSafari};
}

function cfSpeechRecognitionClass(){
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function cfSpeechRecognitionAvailable(){
  return !!cfSpeechRecognitionClass();
}

let cfZhVoice = null;
function cfPickZhVoice(){
  if(!("speechSynthesis" in window)) return null;
  const voices = speechSynthesis.getVoices ? speechSynthesis.getVoices() : [];
  cfZhVoice = voices.find(v => (v.lang || "").toLowerCase().startsWith("zh-cn"))
           || voices.find(v => (v.lang || "").toLowerCase().startsWith("zh"))
           || null;
  return cfZhVoice;
}
if("speechSynthesis" in window){
  cfPickZhVoice();
  const prevVoicesChanged = speechSynthesis.onvoiceschanged;
  speechSynthesis.onvoiceschanged = function(ev){
    cfPickZhVoice();
    if(typeof prevVoicesChanged === "function") prevVoicesChanged.call(this, ev);
  };
}

function cfSpeakZh(text, options={}){
  const value = String(text || "").trim();
  if(!value || !("speechSynthesis" in window)) return;
  try{
    if(options.reset !== false) speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(value);
    u.lang = options.lang || "zh-CN";
    u.rate = Number(options.rate) || 0.85;
    const voice = cfZhVoice || cfPickZhVoice();
    if(voice) u.voice = voice;
    speechSynthesis.speak(u);
  }catch(e){}
}

function cfStripPunctuation(s){
  return String(s || "").replace(/[\s。！？!?，,、；;：:·.]/g, "").trim();
}

function cfUnique(items){
  return [...new Set((items || []).filter(x => x !== undefined && x !== null && String(x).trim() !== "").map(x => String(x).trim()))];
}

function cfImeInstructions(){
  const d = cfDetectDevice();
  if(d.isIPad || d.isIPhone){
    return {
      title: d.isIPad ? "Hanzi auf dem iPad schreiben" : "Hanzi auf dem iPhone schreiben",
      steps: [
        "Einstellungen öffnen → Allgemein → Tastatur → Tastaturen.",
        "„Tastatur hinzufügen“ wählen und „Chinesisch (vereinfacht)“ hinzufügen.",
        "Für Anfänger praktisch: „Pinyin – QWERTZ/QWERTY“. Für Handschrift: „Handschrift“ hinzufügen.",
        "Beim Tippen auf die Globus-Taste 🌐 wechseln und dann Pinyin eingeben, z. B. nihao → 你好."
      ],
      note: "Die Diktierfunktion der iOS-Tastatur kann ebenfalls funktionieren, aber die Browser-Spracherkennung ist auf iPhone/iPad oft unzuverlässig."
    };
  }
  if(d.isAndroid){
    return {
      title: "Hanzi auf Android schreiben",
      steps: [
        "Gboard oder Samsung-Tastatur öffnen → Einstellungen der Tastatur.",
        "Sprachen → Tastatur hinzufügen → Chinesisch (vereinfacht).",
        "Pinyin auswählen. Falls gewünscht zusätzlich Handschrift aktivieren.",
        "Beim Tippen über die Sprach-/Globus-Taste zur chinesischen Tastatur wechseln und Pinyin eingeben, z. B. nihao → 你好."
      ],
      note: "Auf Samsung-Geräten liegt die Sprach-/Tastatur-Umschaltung je nach Tastatur unten links oder auf der Leertaste."
    };
  }
  if(d.isWindows){
    return {
      title: "Hanzi unter Windows schreiben",
      steps: [
        "Windows-Einstellungen öffnen → Zeit und Sprache → Sprache und Region.",
        "Sprache hinzufügen → „Chinesisch (vereinfacht, China)“ installieren.",
        "Mit Windows-Taste + Leertaste zur chinesischen Eingabe wechseln.",
        "Pinyin tippen, z. B. nihao, dann 你好 auswählen und mit Enter übernehmen."
      ],
      note: "Für die Übung reicht meist die normale Microsoft-Pinyin-Eingabe."
    };
  }
  return {
    title: "Hanzi schreiben",
    steps: [
      "Füge in deinem Gerät eine chinesische Tastatur hinzu.",
      "Wähle am besten „Chinesisch vereinfacht / Pinyin“.",
      "Wechsle beim Tippen zur chinesischen Tastatur und gib Pinyin ein, z. B. nihao → 你好."
    ],
    note: "Die genaue Bezeichnung hängt vom Gerät und der Tastatur-App ab."
  };
}
