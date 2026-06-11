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

// Chinesische Sprachausgabe (gemeinsam für Spiele/Übungen).
// opts: { rate: 0.4–1.0, queue: true = an laufende Ausgabe anhängen }
function cfSpeakZh(text, opts){
  opts = opts || {};
  if(!("speechSynthesis" in window) || !text) return;
  try{
    if(!opts.queue) speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text));
    u.lang = "zh-CN";
    u.rate = opts.rate || 0.9;
    const voices = speechSynthesis.getVoices ? speechSynthesis.getVoices() : [];
    const v = voices.find(v => (v.lang || "").toLowerCase().startsWith("zh"));
    if(v) u.voice = v;
    speechSynthesis.speak(u);
  }catch(e){}
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
