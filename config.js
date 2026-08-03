// Öffentliche Konfiguration. Hier dürfen nur öffentliche Browser-Schlüssel stehen.
// Niemals den Supabase service_role-Schlüssel in diese Datei eintragen.
window.CF_CONFIG = {
  workerUrl: "",
  supabaseUrl: "https://bjjqeftutovmxjsnlstt.supabase.co",
  supabasePublishableKey: "sb_publishable_WTQmmnw0GiUmmZSBGnBqNg_Titl3Qab"
};

(function(){
  "use strict";

  const page = location.pathname.split("/").pop() || "index.html";
  const params = new URLSearchParams(location.search);

  // Das Schreibtraining bleibt auf der eigenen, zuverlässig initialisierten Seite.
  if(page === "schreiben.html" && params.get("mode") === "trace"){
    const target = "schreibtraining.html" + location.search + location.hash;
    location.replace(target);
    return;
  }

  if(window.CF_V147_LOADER_ADDED) return;
  window.CF_V147_LOADER_ADDED = true;

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
    document.write('<script src="access.js?v=147"><\/script>');
    document.write('<script src="fixes-v141.js?v=141" defer data-cf-v141="1"><\/script>');
  }else{
    const access = document.createElement("script");
    access.src = "access.js?v=147";
    access.onload = addLate;
    access.onerror = addLate;
    (document.head || document.documentElement).appendChild(access);
  }

  const MAIN_PAGES = {
    "index.html": "chapters",
    "wiederholen.html": "characters",
    "spiele.html": "games",
    "profil.html": "profile"
  };

  function navMarkup(){
    return `
      <a class="homeNavItem" data-main-nav="chapters" href="index.html">
        <span class="homeNavIcon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5V21h-6v-6H9v6H3z"/></svg>
        </span>
        <span>Kapitel</span>
      </a>
      <a class="homeNavItem" data-main-nav="characters" href="wiederholen.html">
        <span class="homeNavIcon homeNavHanzi" aria-hidden="true">汉</span>
        <span>Zeichen</span>
      </a>
      <a class="homeNavItem" data-main-nav="games" href="spiele.html">
        <span class="homeNavIcon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M7 8h10a5 5 0 0 1 4.7 6.7l-1 2.8a2.8 2.8 0 0 1-4.8.8L14.6 17H9.4l-1.3 1.3a2.8 2.8 0 0 1-4.8-.8l-1-2.8A5 5 0 0 1 7 8Z"/><path d="M7 12v4M5 14h4M16.5 13.5h.01M19 15.5h.01"/></svg>
        </span>
        <span>Spiele</span>
      </a>
      <a class="homeNavItem" data-main-nav="profile" href="profil.html">
        <span class="homeNavIcon homeProfileIcon" id="homeProfileIcon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
        </span>
        <span>Profil</span>
      </a>
    `;
  }

  function addMainNavStyles(){
    if(document.getElementById("cfMainNavV147Style")) return;
    const style = document.createElement("style");
    style.id = "cfMainNavV147Style";
    style.textContent = `
      .homeWithNav{
        padding-bottom:calc(102px + env(safe-area-inset-bottom,0px))!important;
      }
      .homeNav{
        box-sizing:border-box!important;
        height:calc(82px + env(safe-area-inset-bottom,0px))!important;
        min-height:calc(82px + env(safe-area-inset-bottom,0px))!important;
        max-height:calc(82px + env(safe-area-inset-bottom,0px))!important;
        grid-template-columns:repeat(4,minmax(0,1fr))!important;
        grid-auto-rows:66px!important;
        align-items:stretch!important;
        padding:7px 8px calc(9px + env(safe-area-inset-bottom,0px))!important;
        overflow:hidden!important;
      }
      .homeNavItem{
        box-sizing:border-box!important;
        height:66px!important;
        min-height:66px!important;
        max-height:66px!important;
        align-self:stretch!important;
        justify-content:center!important;
        gap:2px!important;
        padding:3px 2px 5px!important;
        margin:0!important;
        overflow:hidden!important;
      }
      .homeNavIcon{
        flex:0 0 31px!important;
        width:31px!important;
        height:31px!important;
      }
      .homeNavItem>span:last-child{
        display:block;
        flex:0 0 auto;
        max-width:100%;
        line-height:1.05;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      .homeProfileIcon.hasAvatar{
        padding:0!important;
        overflow:hidden!important;
        background:#fff!important;
        color:transparent!important;
      }
      .homeProfileIcon.hasAvatar img{
        display:block;
        width:100%;
        height:100%;
        object-fit:cover;
        border-radius:50%;
      }
    `;
    (document.head || document.documentElement).appendChild(style);
  }

  function readAvatar(){
    try{ return localStorage.getItem("cf_profile_avatar_v1") || ""; }
    catch(_err){ return ""; }
  }

  function currentEmail(){
    try{
      const state = window.CF_SYNC && CF_SYNC.getState ? CF_SYNC.getState() : null;
      return state && state.signedIn && state.user ? String(state.user.email || "") : "";
    }catch(_err){ return ""; }
  }

  function defaultProfileSvg(){
    return '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>';
  }

  function paintMainNavProfile(){
    const icon = document.getElementById("homeProfileIcon");
    if(!icon) return;

    const avatar = readAvatar();
    if(avatar){
      if(!icon.querySelector("img") || icon.querySelector("img").src !== avatar){
        icon.innerHTML = "";
        const image = document.createElement("img");
        image.src = avatar;
        image.alt = "";
        icon.appendChild(image);
      }
      icon.classList.add("hasAvatar","signedIn");
      return;
    }

    icon.classList.remove("hasAvatar");
    const email = currentEmail();
    if(email){
      icon.textContent = email.trim().charAt(0).toUpperCase() || "✓";
      icon.classList.add("signedIn");
    }else{
      icon.innerHTML = defaultProfileSvg();
      icon.classList.remove("signedIn");
    }
  }

  function installMainNavigation(){
    const active = MAIN_PAGES[page];
    if(!active) return;

    addMainNavStyles();

    const main = document.querySelector("main.app");
    if(main) main.classList.add("homeWithNav");

    // Auf den drei anderen Hauptseiten ersetzt das untere Menü den großen Home-Knopf.
    if(page !== "index.html" && main){
      const topbar = main.querySelector(".topbar");
      if(topbar){
        const homeLink = topbar.querySelector('a.back[href="index.html"]');
        if(homeLink) topbar.remove();
      }
    }

    let nav = document.querySelector("nav.homeNav");
    if(!nav){
      nav = document.createElement("nav");
      nav.className = "homeNav";
      nav.setAttribute("aria-label","Hauptbereiche");
      nav.innerHTML = navMarkup();
      document.body.appendChild(nav);
    }else{
      // Fehlende Kennungen bei der bereits vorhandenen Kapitel-Navigation ergänzen.
      const items = nav.querySelectorAll(".homeNavItem");
      const names = ["chapters","characters","games","profile"];
      items.forEach((item,index) => {
        if(!item.dataset.mainNav && names[index]) item.dataset.mainNav = names[index];
      });
    }

    nav.querySelectorAll(".homeNavItem").forEach(item => {
      const isActive = item.dataset.mainNav === active;
      item.classList.toggle("active",isActive);
      if(isActive) item.setAttribute("aria-current","page");
      else item.removeAttribute("aria-current");
    });

    paintMainNavProfile();

    const icon = document.getElementById("homeProfileIcon");
    if(icon && !icon.dataset.cfAvatarObserved){
      icon.dataset.cfAvatarObserved = "1";
      new MutationObserver(() => {
        if(readAvatar() && !icon.querySelector("img")) paintMainNavProfile();
      }).observe(icon,{childList:true,subtree:true,characterData:true});
    }

    const profileAvatar = document.getElementById("profileAvatar");
    if(profileAvatar && !profileAvatar.dataset.cfNavObserved){
      profileAvatar.dataset.cfNavObserved = "1";
      new MutationObserver(() => paintMainNavProfile())
        .observe(profileAvatar,{childList:true,subtree:true,characterData:true});
    }

    setTimeout(paintMainNavProfile,0);
    setTimeout(paintMainNavProfile,350);
    setTimeout(paintMainNavProfile,1200);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded",installMainNavigation,{once:true});
  }else{
    installMainNavigation();
  }

  window.addEventListener("cf-sync-status",paintMainNavProfile);
  window.addEventListener("cf-sync-applied",paintMainNavProfile);
  window.addEventListener("storage",event => {
    if(event.key === "cf_profile_avatar_v1") paintMainNavProfile();
  });
  window.addEventListener("focus",paintMainNavProfile);
})();
