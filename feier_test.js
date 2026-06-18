/* ============================================================
   TESTDATEI – Feier-Test-Button
   Zeigt oben rechts einen roten Knopf, der die 100%-Feier auslöst.
   Nur zum Ausprobieren der Animation gedacht.

   >>> VOR DEM ÖFFENTLICHEN UPLOAD ENTFERNEN: <<<
       1) Diese Datei (feier_test.js) löschen
       2) In kapitel.html die eine markierte <script>-Zeile löschen
   (Wenn nur die Datei fehlt, ist es harmlos – der Knopf erscheint dann
    einfach nicht. Nach dem Entfernen ggf. die Service-Worker-Version
    in sw.js erhöhen, damit kein alter Cache den Knopf weiter zeigt.)
   ============================================================ */
(function(){
  function addBtn(){
    if(document.getElementById("cfFeierTestBtn")) return;
    var b = document.createElement("button");
    b.id = "cfFeierTestBtn";
    b.type = "button";
    b.textContent = "🎉 Feier testen";
    b.style.cssText =
      "position:fixed;right:12px;top:calc(12px + env(safe-area-inset-top,0px));" +
      "z-index:100000;padding:9px 13px;border:none;border-radius:999px;" +
      "background:#e23b3b;color:#fff;font-weight:700;font-size:14px;" +
      "box-shadow:0 2px 10px rgba(0,0,0,.4);";
    b.addEventListener("click", function(){
      if(typeof cfCelebrate === "function") cfCelebrate();
      else alert("cfCelebrate() nicht gefunden – ist common.js geladen?");
    });
    document.body.appendChild(b);
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", addBtn);
  else addBtn();
})();
