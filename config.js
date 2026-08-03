// Öffentliche Konfiguration. Hier dürfen nur öffentliche Browser-Schlüssel stehen.
// Niemals den Supabase service_role-Schlüssel in diese Datei eintragen.
window.CF_CONFIG = {
  workerUrl: "",
  supabaseUrl: "https://bjjqeftutovmxjsnlstt.supabase.co",
  supabasePublishableKey: "sb_publishable_WTQmmnw0GiUmmZSBGnBqNg_Titl3Qab"
};

(function(){
  "use strict";

  // Das Schreibtraining bleibt auf der eigenen, zuverlässig initialisierten Seite.
  const page = location.pathname.split("/").pop() || "index.html";
  const params = new URLSearchParams(location.search);
  if(page === "schreiben.html" && params.get("mode") === "trace"){
    const target = "schreibtraining.html" + location.search + location.hash;
    location.replace(target);
    return;
  }

  if(window.CF_V142_LOADER_ADDED) return;
  window.CF_V142_LOADER_ADDED = true;

  function addStyles(){
    if(!document.querySelector('link[data-cf-v141="1"]')){
      const oldFixes = document.createElement("link");
      oldFixes.rel = "stylesheet";
      oldFixes.href = "fixes-v141.css?v=141";
      oldFixes.dataset.cfV141 = "1";
      (document.head || document.documentElement).appendChild(oldFixes);
    }

    if(!document.querySelector('link[data-cf-v142="1"]')){
      const newFixes = document.createElement("link");
      newFixes.rel = "stylesheet";
      newFixes.href = "fixes-v142.css?v=142";
      newFixes.dataset.cfV142 = "1";
      (document.head || document.documentElement).appendChild(newFixes);
    }
  }

  function addOldFixScript(){
    if(document.querySelector('script[data-cf-v141="1"]')) return;
    const script = document.createElement("script");
    script.src = "fixes-v141.js?v=141";
    script.defer = true;
    script.dataset.cfV141 = "1";
    (document.head || document.documentElement).appendChild(script);
  }

  function addLate(){
    addStyles();
    addOldFixScript();
  }

  if(document.readyState === "loading"){
    document.write('<link rel="stylesheet" href="fixes-v141.css?v=141" data-cf-v141="1">');
    document.write('<link rel="stylesheet" href="fixes-v142.css?v=142" data-cf-v142="1">');
    document.write('<script src="access.js?v=142"><\/script>');
    document.write('<script src="fixes-v141.js?v=141" defer data-cf-v141="1"><\/script>');
  }else{
    const access = document.createElement("script");
    access.src = "access.js?v=142";
    access.onload = addLate;
    access.onerror = addLate;
    (document.head || document.documentElement).appendChild(access);
  }
})();
