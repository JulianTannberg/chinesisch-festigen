// Chinesisch festigen – Service Worker
// Bei jeder Änderung an der Website die Versionsnummer erhöhen,
// damit alle Geräte die neuen Dateien laden.
const CACHE = "cf-v129-chapters-01-15";

const SHELL = [
  "./",
  "./index.html",
  "./start.html",
  "./kapitel.html",
  "./geschichte.html",
  "./geschichte.js",
  "./geschichte-data.js",
  "./hoeren.html",
  "./schreiben.html",
  "./sprechen.html",
  "./sprechsatz.html",
  "./flashkarten.html",
  "./memory.html",
  "./luecken.html",
  "./stirnspiel.html",
  "./jump-run.html",
  "./jump-run.js",
  "./station-bg-1.png",
  "./station-bg-2.png",
  "./station-bg-3.png",
  "./station-bg-4.png",
  "./suran-game.png",
  "./linyue-game.png",
  "./ueben.html",
  "./wiederholen.html",
  "./chat.html",
  "./einstellungen.html",
  "./fehler.html",
  "./datenschutz.html",
  "./agb.html",
  "./impressum.html",
  "./style.css",
  "./topics.js",
  "./bausteine.js",
  "./common.js",
  "./profile.js",
  "./chatdata.js",
  "./avatars/suran.jpg",
  "./avatars/linyue.jpg",
  "./config.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/crane-1.png",
  "./icons/crane-2.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if(e.request.method !== "GET") return;

  // Hanzi Writer + Zeichendaten vom CDN: einmal geladen, dann aus dem Cache (offline nachzeichnen)
  if(url.hostname === "cdn.jsdelivr.net"){
    e.respondWith(
      caches.open(CACHE).then(async c => {
        const hit = await c.match(e.request);
        if(hit) return hit;
        const res = await fetch(e.request);
        if(res && res.ok) c.put(e.request, res.clone());
        return res;
      })
    );
    return;
  }

  if(url.origin !== location.origin) return;

  // HTML, JS und CSS: erst Netz (damit Updates ankommen), sonst Cache.
  // Nur große, selten geänderte Dateien (Bilder, Audio, Fonts) bleiben cache-first.
  const p = url.pathname;
  const isFresh = e.request.mode === "navigate" ||
                  p.endsWith(".html") || p.endsWith(".js") || p.endsWith(".css");
  if(isFresh){
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request, {ignoreSearch:true}).then(hit => hit || caches.match("./index.html")))
    );
    return;
  }

  // Rest: Cache zuerst, Netz als Ergänzung
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }))
  );
});
