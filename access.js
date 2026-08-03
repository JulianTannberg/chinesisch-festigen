// Chinesisch festigen – Zugangssteuerung
// Frei ohne Konto: Kapitel 1, Zeichen aus Kapitel 1 und Spiele mit Kapitel 1.
// Anmeldung nötig: Kapitel 2–15 und die vollständige chinesische Geschichte.
(function(){
  "use strict";
  if(window.CF_ACCESS) return;

  const path = location.pathname.split("/").pop() || "index.html";
  const params = new URLSearchParams(location.search);
  const chapterPages = new Set([
    "kapitel.html", "hoeren.html", "schreiben.html", "sprechen.html",
    "sprechsatz.html", "ueben.html", "flashkarten.html", "luecken.html",
    "jump-run.html", "chat.html"
  ]);

  function storedSession(){
    try{
      for(let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i) || "";
        if(!/^sb-.*-auth-token$/.test(key)) continue;
        const parsed = JSON.parse(localStorage.getItem(key) || "null");
        const candidates = [parsed, parsed && parsed.session, parsed && parsed.currentSession];
        if(Array.isArray(parsed)) candidates.push(parsed[0]);
        if(candidates.some(v => v && typeof v === "object" && v.access_token)) return true;
      }
    }catch(_err){}
    return false;
  }

  function currentTarget(){
    return path + location.search + location.hash;
  }

  function safeTarget(value){
    const v = String(value || "");
    if(!v || v.includes("://") || v.startsWith("//")) return "index.html";
    return v;
  }

  function loginUrl(target){
    return "konto.html?from=" + encodeURIComponent(safeTarget(target || currentTarget())) + "&required=1";
  }

  function goLogin(target){
    location.href = loginUrl(target);
  }

  function requestedChapter(){
    const n = Number(params.get("id") || 1);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }

  function routeNeedsLogin(){
    if(path === "geschichte.html") return true;
    return chapterPages.has(path) && requestedChapter() > 1;
  }

  function addStyles(){
    if(document.getElementById("cfAccessStyles")) return;
    const style = document.createElement("style");
    style.id = "cfAccessStyles";
    style.textContent = `
      html.cfAuthChecking body{visibility:hidden}
      .cfLoginLocked{cursor:pointer!important;filter:saturate(.72);opacity:.72}
      .cfLoginLocked:focus{outline:3px solid #58d68d;outline-offset:3px}
      .cfAccessNote{margin:12px 0;padding:11px 14px;border:1px solid rgba(255,255,255,.25);border-radius:14px;background:rgba(255,255,255,.08);font-size:14px;line-height:1.45}
      .cfAccessLoginLink{display:inline-flex;margin-top:8px;padding:8px 13px;border:1px solid currentColor;border-radius:999px;color:inherit;text-decoration:none;font-weight:800}
      .cfLoginBadge{display:inline-flex!important}
      .memoryChapterChoice.cfLoginLockedChapter{opacity:.42!important;cursor:pointer!important}
    `;
    (document.head || document.documentElement).appendChild(style);
  }

  addStyles();

  const signedInAtStart = storedSession();

  // Vor den jeweiligen Seitenskripten auf Kapitel 1 begrenzen.
  if(!signedInAtStart && path === "memory.html"){
    try{ localStorage.setItem("cf_memory_selected_chapters_v2", JSON.stringify(["01"])); }catch(_err){}
  }

  if(!signedInAtStart && path === "stirnspiel.html"){
    try{ localStorage.setItem("cf_heads_chapters", JSON.stringify(["01"])); }catch(_err){}
    if(params.get("id") !== "01"){
      params.set("id", "01");
      history.replaceState(null, "", path + "?" + params.toString() + location.hash);
    }
  }

  function waitForSync(callback, tries){
    tries = tries || 0;
    if(window.CF_SYNC && CF_SYNC.ready){
      CF_SYNC.ready
        .then(() => callback(CF_SYNC.getState()))
        .catch(() => callback({signedIn:false}));
      return;
    }
    if(tries > 160){
      callback({signedIn:storedSession()});
      return;
    }
    setTimeout(() => waitForSync(callback, tries + 1), 25);
  }

  function addLoginNote(host, text, target){
    if(!host || host.querySelector(".cfAccessNote")) return;
    const note = document.createElement("div");
    note.className = "cfAccessNote";
    note.innerHTML =
      `<strong>Anmeldung für weitere Inhalte</strong><br>${text}<br>` +
      `<a class="cfAccessLoginLink" href="${loginUrl(target || currentTarget())}">Jetzt anmelden</a>`;
    host.appendChild(note);
  }

  function lockIndex(){
    const cards = Array.from(document.querySelectorAll(".chapterCard"));
    cards.forEach(card => {
      const label = card.querySelector(".chapterNo")?.textContent || "";
      const match = label.match(/(\d+)/);
      const chapter = match ? Number(match[1]) : 0;
      if(chapter <= 1) return;

      card.classList.add("locked", "cfLoginLocked");
      card.dataset.cfLoginLocked = "1";
      card.dataset.cfTarget = `kapitel.html?id=${String(chapter).padStart(2,"0")}`;
      card.removeAttribute("href");
      card.setAttribute("role", "link");
      card.tabIndex = 0;

      let badge = card.querySelector(".soonBadge");
      if(!badge){
        badge = document.createElement("span");
        card.appendChild(badge);
      }
      badge.className = "soonBadge cfLoginBadge";
      badge.textContent = "🔒 Ab Kapitel 2 bitte anmelden";
    });

    const story = document.querySelector(".storyUnlockCard");
    if(story){
      story.classList.add("locked", "cfLoginLocked");
      story.dataset.cfLoginLocked = "1";
      story.dataset.cfTarget = "geschichte.html";
      story.removeAttribute("href");
      story.setAttribute("role", "link");
      story.tabIndex = 0;

      const action = story.querySelector(".storyUnlockAction");
      if(action) action.textContent = "🔒 Anmeldung nötig";

      const hint = story.querySelector(".storyUnlockHint");
      if(hint){
        hint.textContent =
          "Die vollständige chinesische Geschichte ist nach der Anmeldung und nach Abschluss aller Kapitel verfügbar.";
      }
    }
  }

  function lockReview(){
    const rows = Array.from(document.querySelectorAll(".chapterCharRow"));
    rows.forEach((row, index) => {
      if(index === 0) return;

      row.classList.add("locked");
      row.querySelectorAll(".charCell").forEach(button => {
        button.classList.add("locked");
        button.disabled = true;
        button.setAttribute("aria-disabled", "true");
      });

      let hint = row.querySelector(".lockHint");
      if(!hint){
        hint = document.createElement("div");
        hint.className = "lockHint";
        row.querySelector(".chapterCharHead")?.after(hint);
      }
      hint.textContent = "Bitte anmelden, um Zeichen ab Kapitel 2 zu üben";
    });

    addLoginNote(
      document.querySelector("main.app"),
      "Ohne Konto kannst du die Zeichen aus Kapitel 1 üben. Ab Kapitel 2 wird dein Zugang über die Anmeldung freigeschaltet.",
      "wiederholen.html"
    );
  }

  function lockMemory(){
    function paint(){
      document.querySelectorAll(".memoryChapterChoice").forEach(button => {
        if(button.dataset.id === "01") return;
        button.classList.add("cfLoginLockedChapter");
        button.classList.remove("active");
        button.dataset.cfAccessBlocked = "1";
        button.setAttribute("aria-disabled", "true");
        button.title = "Ab Kapitel 2 bitte anmelden";
      });

      const all = document.getElementById("selectAll");
      if(all){
        all.dataset.cfAccessBlocked = "1";
        all.textContent = "Alle Kapitel (Anmeldung nötig)";
      }

      const info = document.getElementById("selectionInfo");
      if(info && !info.dataset.cfAccessText){
        info.dataset.cfAccessText = "1";
        info.textContent = "Ohne Anmeldung ist Kapitel 1 verfügbar.";
      }
    }

    paint();
    const picker = document.getElementById("chapterPicker");
    if(picker){
      new MutationObserver(paint).observe(picker, {childList:true, subtree:true});
    }

    addLoginNote(
      document.getElementById("setupCard"),
      "Memory ist mit Kapitel 1 frei spielbar. Weitere Kapitel werden nach der Anmeldung freigeschaltet.",
      "memory.html"
    );
  }

  function explainGames(){
    const subtitle = document.querySelector(".subtitle");
    if(subtitle){
      subtitle.textContent =
        "Die drei Spiele sind mit den Inhalten aus Kapitel 1 frei. Weitere Kapitel werden nach der Anmeldung freigeschaltet.";
    }
    addLoginNote(
      document.querySelector("main.app"),
      "Du kannst alle drei Spielarten bereits mit Kapitel 1 ausprobieren.",
      "spiele.html"
    );
  }

  function explainStirnspiel(){
    const notice = document.getElementById("notice");
    if(notice){
      notice.textContent =
        "Ohne Anmeldung ist Kapitel 1 verfügbar. Weitere Kapitel werden nach der Anmeldung freigeschaltet.";
    }
  }

  function explainAccount(){
    const card = document.getElementById("signedOutCard");
    const intro = card && card.querySelector("p.small");
    if(intro){
      intro.textContent =
        "Kapitel 1 sowie die Spiele mit Kapitel 1 sind frei. Mit deiner Anmeldung werden Kapitel 2–15, weitere Spielinhalte und die vollständige chinesische Geschichte freigeschaltet und dein Fortschritt auf deinen Geräten abgeglichen.";
    }
  }

  function applySignedOutRules(){
    if(path === "index.html") lockIndex();
    if(path === "wiederholen.html") lockReview();
    if(path === "memory.html") lockMemory();
    if(path === "spiele.html") explainGames();
    if(path === "stirnspiel.html") explainStirnspiel();
    if(path === "konto.html") explainAccount();
  }

  document.addEventListener("click", event => {
    const blocked = event.target.closest(
      "[data-cf-login-locked='1'], [data-cf-access-blocked='1']"
    );
    if(!blocked) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    goLogin(blocked.dataset.cfTarget || currentTarget());
  }, true);

  document.addEventListener("keydown", event => {
    if(event.key !== "Enter" && event.key !== " ") return;
    const blocked = event.target.closest(
      "[data-cf-login-locked='1'], [data-cf-access-blocked='1']"
    );
    if(!blocked) return;
    event.preventDefault();
    goLogin(blocked.dataset.cfTarget || currentTarget());
  }, true);

  function redirectAfterLogin(state){
    if(path !== "konto.html" || !state || !state.signedIn) return;
    const from = safeTarget(params.get("from"));
    if(from && from !== "profil.html" && from !== "konto.html"){
      location.replace(from);
    }
  }

  if(routeNeedsLogin()){
    document.documentElement.classList.add("cfAuthChecking");
    waitForSync(state => {
      if(state && state.signedIn){
        document.documentElement.classList.remove("cfAuthChecking");
      }else{
        goLogin(currentTarget());
      }
    });
  }

  const runWhenReady = () => waitForSync(state => {
    redirectAfterLogin(state);
    if(!state || !state.signedIn) applySignedOutRules();
  });

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", runWhenReady, {once:true});
  }else{
    runWhenReady();
  }

  window.addEventListener("cf-sync-status", event => {
    const state = event.detail || {};
    redirectAfterLogin(state);
    if(!state.signedIn) applySignedOutRules();
  });

  window.CF_ACCESS = {storedSession, loginUrl, goLogin};
})();
