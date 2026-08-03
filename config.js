// Öffentliche Konfiguration. Hier dürfen nur öffentliche Browser-Schlüssel stehen.
// Niemals den Supabase service_role-Schlüssel in diese Datei eintragen.
window.CF_CONFIG = {
  workerUrl: "",
  supabaseUrl: "https://bjjqeftutovmxjsnlstt.supabase.co",
  supabasePublishableKey: "sb_publishable_WTQmmnw0GiUmmZSBGnBqNg_Titl3Qab"
};

(function(){
  "use strict";

  // Der alte Direktaufruf des Schreibtrainings startet im bisherigen
  // schreiben.html zu früh. Neue und gespeicherte Links werden sauber umgeleitet.
  const page = location.pathname.split("/").pop() || "index.html";
  const params = new URLSearchParams(location.search);
  if(page === "schreiben.html" && params.get("mode") === "trace"){
    const target = "schreibtraining.html" + location.search + location.hash;
    location.replace(target);
    return;
  }

  if(window.CF_V141_LOADER_ADDED) return;
  window.CF_V141_LOADER_ADDED = true;

  function addLate(){
    if(!document.querySelector('link[data-cf-v141="1"]')){
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "fixes-v141.css?v=141";
      link.dataset.cfV141 = "1";
      (document.head || document.documentElement).appendChild(link);
    }
    if(!document.querySelector('script[data-cf-v141="1"]')){
      const script = document.createElement("script");
      script.src = "fixes-v141.js?v=141";
      script.defer = true;
      script.dataset.cfV141 = "1";
      (document.head || document.documentElement).appendChild(script);
    }
  }

  if(document.readyState === "loading"){
    document.write('<link rel="stylesheet" href="fixes-v141.css?v=141" data-cf-v141="1">');
    document.write('<script src="access.js?v=141"><\/script>');
    document.write('<script src="fixes-v141.js?v=141" defer data-cf-v141="1"><\/script>');
  }else{
    const access = document.createElement("script");
    access.src = "access.js?v=141";
    access.onload = addLate;
    (document.head || document.documentElement).appendChild(access);
  }
})();
