(function(){
  const KEY = "cf_user_name";

  function cleanName(value){
    return String(value || "")
      .replace(/[<>]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 40);
  }
  function escapeHtml(s){
    return String(s ?? "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));
  }
  function getName(){ return cleanName(localStorage.getItem(KEY) || ""); }
  function setName(name){
    const cleaned = cleanName(name);
    if(cleaned) localStorage.setItem(KEY, cleaned);
    else localStorage.removeItem(KEY);
    window.dispatchEvent(new CustomEvent("cf-profile-changed", {detail:{name:cleaned}}));
    return cleaned;
  }
  function nameOrDots(){ return getName() || "……"; }
  function nameForGerman(){ return getName() || "…"; }

  function renderFull(host, options={}){
    const current = getName();
    host.innerHTML = `
      <section class="profileCard">
        <div>
          <div class="profileTitle">Dein Name für Übungen</div>
          <p class="profileText">Wird nur in diesem Browser gespeichert und bei Namenssätzen automatisch eingesetzt.</p>
        </div>
        <div class="profileForm">
          <input class="profileInput" data-profile-input type="text" autocomplete="given-name" placeholder="z. B. Vanessa" value="${escapeHtml(current)}" />
          <button data-profile-save type="button">Speichern</button>
          <button data-profile-clear type="button">Löschen</button>
        </div>
        <div class="profileStatus" data-profile-status>${current ? `Gespeichert: ${escapeHtml(current)}` : "Noch kein Name gespeichert."}</div>
      </section>
    `;
    const input = host.querySelector("[data-profile-input]");
    const status = host.querySelector("[data-profile-status]");
    function save(){
      const name = setName(input.value);
      status.textContent = name ? `Gespeichert: ${name}` : "Noch kein Name gespeichert.";
      if(options.collapseAfterSave && name) renderCompact(host);
    }
    host.querySelector("[data-profile-save]").addEventListener("click", save);
    host.querySelector("[data-profile-clear]").addEventListener("click", () => {
      input.value = "";
      setName("");
      status.textContent = "Noch kein Name gespeichert.";
      if(options.collapseAfterSave) renderFull(host, options);
    });
    input.addEventListener("keydown", e => {
      if(e.key === "Enter"){
        e.preventDefault();
        save();
      }
    });
    setTimeout(() => input.focus(), 0);
  }

  function renderCompact(host){
    const current = getName();
    if(!current){
      host.innerHTML = "";
      return;
    }
    host.innerHTML = `
      <div class="profileMini">
        <span>Name für Übungen: <strong>${escapeHtml(current)}</strong></span>
        <span class="profileMiniBtns">
          <button type="button" data-profile-edit>Name ändern</button>
          <button type="button" data-profile-reset>Fortschritt zurücksetzen</button>
        </span>
      </div>
    `;
    host.querySelector("[data-profile-edit]").addEventListener("click", () => {
      renderFull(host, {collapseAfterSave:true});
    });
    host.querySelector("[data-profile-reset]").addEventListener("click", () => {
      const id = new URLSearchParams(location.search).get("id");
      const ok = window.confirm("Möchtest du den Fortschritt dieses Kapitels wirklich zurücksetzen?\n\nAlle Prozente und Statistiken dieses Kapitels werden gelöscht. Dein Name bleibt erhalten.");
      if(!ok) return;
      if(typeof cfResetProgress === "function") cfResetProgress(id);
      location.reload();
    });
  }

  // Zeigt das große Eingabefeld nur, wenn noch kein Name gespeichert ist.
  function mountSetup(targetId){
    const host = document.getElementById(targetId);
    if(!host) return;
    function refresh(){
      if(getName()) host.innerHTML = "";
      else renderFull(host, {collapseAfterSave:true});
    }
    refresh();
    window.addEventListener("cf-profile-changed", refresh);
  }

  // Zeigt unten nur eine kleine Änderungsmöglichkeit, sobald ein Name gespeichert ist.
  function mountEdit(targetId){
    const host = document.getElementById(targetId);
    if(!host) return;
    function refresh(){ renderCompact(host); }
    refresh();
    window.addEventListener("cf-profile-changed", refresh);
  }

  // Rückwärtskompatibel: alte Aufrufe verhalten sich wie Setup oben.
  function mount(targetId){ mountSetup(targetId); }

  window.CF_PROFILE = { getName, setName, nameOrDots, nameForGerman, mount, mountSetup, mountEdit, cleanName };
})();
