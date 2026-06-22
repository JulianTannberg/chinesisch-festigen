// Chinesisch festigen – Service Worker
// Bei jeder Änderung an der Website die Versionsnummer erhöhen,
// damit alle Geräte die neuen Dateien laden.
const CACHE = "cf-v96-jump-background-cache-fix";

const SHELL = [
  "./",
  "./index.html",
  "./start.html",
  "./kapitel.html",
  "./hoeren.html",
  "./schreiben.html",
  "./sprechen.html",
  "./sprechsatz.html",
  "./flashkarten.html",
  "./memory.html",
  "./luecken.html",
  "./jump-run.html",
  "./jump-run.js",
  "./station-bg-1.png?v=96",
  "./station-bg-2.png?v=96",
  "./station-bg-3.png?v=96",
  "./station-bg-4.png?v=96",
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
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(SHELL.map(async url => {
      try{
        const response = await fetch(url, {cache:"reload"});
        if(response && response.ok) await cache.put(url, response.clone());
      }catch(_err){
        // Eine einzelne noch nicht veröffentlichte Datei darf das Update nicht blockieren.
      }
    }));
    await self.skipWaiting();
  })());
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

  // Die vier Bahnhofsbilder immer zuerst frisch anfordern. Frühere Versionen
  // konnten eine vorübergehende 404-Antwort im Cache festhalten.
  if(/station-bg-[1-4]\.png$/.test(url.pathname)){
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try{
        const response = await fetch(e.request, {cache:"no-store"});
        if(response && response.ok){
          await cache.put(e.request, response.clone());
          return response;
        }
      }catch(_err){}
      return (await cache.match(e.request)) ||
             (await cache.match(url.pathname, {ignoreSearch:true})) ||
             new Response("Hintergrundbild fehlt", {status:404});
    })());
    return;
  }

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
      if(res && res.ok){
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }))
  );
});
