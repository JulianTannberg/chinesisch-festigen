// Chinesisch festigen – kleine, seitenübergreifende Korrekturen v141
(function(){
  "use strict";
  if(window.CF_FIXES_V141) return;
  window.CF_FIXES_V141 = true;

  const page = location.pathname.split("/").pop() || "index.html";

  // Ein Fortschritts-Reset darf das Profilbild nicht löschen.
  if(typeof window.cfResetProgress === "function" && !window.cfResetProgress.__cfKeepsAvatar){
    const originalReset = window.cfResetProgress;
    const wrappedReset = function(){
      let avatar = "";
      try{ avatar = localStorage.getItem("cf_profile_avatar_v1") || ""; }catch(_err){}
      const result = originalReset.apply(this, arguments);
      if(avatar){ try{ localStorage.setItem("cf_profile_avatar_v1", avatar); }catch(_err){} }
      return result;
    };
    wrappedReset.__cfKeepsAvatar = true;
    window.cfResetProgress = wrappedReset;
  }

  // Das neue Schreibtraining ist eine eigene, zuverlässig initialisierte Seite.
  if(page === "schreiben.html"){
    document.addEventListener("click", event => {
      const tab = event.target.closest('[data-tab="trace"]');
      if(!tab) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const id = new URLSearchParams(location.search).get("id") || "01";
      location.href = `schreibtraining.html?id=${encodeURIComponent(id)}`;
    }, true);
  }

  function currentEmailInitial(){
    try{
      const state = window.CF_SYNC && CF_SYNC.getState ? CF_SYNC.getState() : null;
      const email = state && state.user && state.user.email ? String(state.user.email) : "";
      return (email.trim().charAt(0) || "○").toUpperCase();
    }catch(_err){ return "○"; }
  }

  function avatarData(){
    try{ return localStorage.getItem("cf_profile_avatar_v1") || ""; }
    catch(_err){ return ""; }
  }

  function paintAvatar(){
    const avatar = document.getElementById("profileAvatar");
    if(!avatar) return;
    const data = avatarData();
    if(data){
      avatar.innerHTML = "";
      const img = document.createElement("img");
      img.src = data;
      img.alt = "Profilbild";
      avatar.appendChild(img);
      avatar.classList.add("signedIn");
    }else{
      avatar.textContent = currentEmailInitial();
    }
  }

  function resizeAvatar(file){
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Das Bild konnte nicht gelesen werden."));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error("Das Bildformat wird nicht unterstützt."));
        img.onload = () => {
          const size = 180;
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d");
          const side = Math.min(img.naturalWidth, img.naturalHeight);
          const sx = (img.naturalWidth - side) / 2;
          const sy = (img.naturalHeight - side) / 2;
          ctx.drawImage(img, sx, sy, side, side, 0, 0, size, size);
          resolve(canvas.toDataURL("image/jpeg", .78));
        };
        img.src = String(reader.result || "");
      };
      reader.readAsDataURL(file);
    });
  }

  function enhanceProfile(){
    if(page !== "profil.html") return;
    const hero = document.querySelector(".profileHero");
    if(!hero || document.getElementById("cfAvatarControls")){
      paintAvatar();
      return;
    }

    const wrap = document.createElement("div");
    wrap.id = "cfAvatarControls";
    wrap.innerHTML = `
      <div class="cfAvatarControls">
        <label for="cfAvatarInput">Bild auswählen<input id="cfAvatarInput" type="file" accept="image/*"></label>
        <button id="cfAvatarRemove" type="button">Bild entfernen</button>
      </div>
      <p class="cfAvatarHint">Ohne Bild wird der Anfangsbuchstabe deiner E-Mail-Adresse angezeigt. Das kleine Profilbild wird mit deinem Lernkonto synchronisiert.</p>
    `;
    hero.insertAdjacentElement("afterend", wrap);

    const input = document.getElementById("cfAvatarInput");
    const remove = document.getElementById("cfAvatarRemove");
    input.addEventListener("change", async () => {
      const file = input.files && input.files[0];
      if(!file) return;
      if(file.size > 12 * 1024 * 1024){
        alert("Das Bild ist zu groß. Bitte wähle ein Bild unter 12 MB.");
        input.value = "";
        return;
      }
      try{
        const data = await resizeAvatar(file);
        localStorage.setItem("cf_profile_avatar_v1", data);
        paintAvatar();
      }catch(err){
        alert(err && err.message ? err.message : "Das Bild konnte nicht gespeichert werden.");
      }finally{
        input.value = "";
      }
    });
    remove.addEventListener("click", () => {
      localStorage.removeItem("cf_profile_avatar_v1");
      paintAvatar();
    });

    paintAvatar();
    const avatar = document.getElementById("profileAvatar");
    if(avatar){
      new MutationObserver(() => {
        if(avatarData() && !avatar.querySelector("img")) paintAvatar();
      }).observe(avatar, {childList:true, subtree:true, characterData:true});
    }
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", enhanceProfile, {once:true});
  }else{
    enhanceProfile();
  }

  window.addEventListener("cf-sync-status", () => setTimeout(paintAvatar, 0));
  window.addEventListener("cf-sync-applied", () => setTimeout(paintAvatar, 0));
  if(window.CF_SYNC && CF_SYNC.initialSync){
    CF_SYNC.initialSync.then(() => paintAvatar()).catch(() => {});
  }
})();
