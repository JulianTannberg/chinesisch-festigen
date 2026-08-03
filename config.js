// Öffentliche Konfiguration. Hier dürfen nur öffentliche Browser-Schlüssel stehen.
// Niemals den Supabase service_role-Schlüssel in diese Datei eintragen.
window.CF_CONFIG = {
  workerUrl: "",

  // Supabase: Project Settings → API
  // Beispiel URL: https://xxxxxxxxxxxxxxxxxxxx.supabase.co
  supabaseUrl: "https://bjjqeftutovmxjsnlstt.supabase.co",

  // Neuer "Publishable key" oder älterer öffentlicher "anon"-Schlüssel.
  supabasePublishableKey: "sb_publishable_WTQmmnw0GiUmmZSBGnBqNg_Titl3Qab"
};

// Die Zugangsregeln werden synchron vor sync.js und den jeweiligen
// Seitenskripten geladen.
(function(){
  if(window.CF_ACCESS_LOADER_ADDED) return;
  window.CF_ACCESS_LOADER_ADDED = true;

  if(document.readyState === "loading"){
    document.write('<script src="access.js?v=140"><\/script>');
  }else{
    const script = document.createElement("script");
    script.src = "access.js?v=140";
    (document.head || document.documentElement).appendChild(script);
  }
})();
