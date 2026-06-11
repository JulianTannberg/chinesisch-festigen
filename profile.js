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
  function mount(targetId){
    const host = document.getElementById(targetId);
    if(!host) return;
    const current = getName();
    host.innerHTML = `
      <section class="profileCard">
        <div>
          <div class="profileTitle">Dein Name für Übungen</div>
          <p class="profileText">Wird nur in diesem Browser gespeichert und bei Namenssätzen automatisch eingesetzt.</p>
        </div>
        <div class="profileForm">
          <input class="profileInput" id="cfProfileName" type="text" autocomplete="given-name" placeholder="z. B. Vanessa" value="${escapeHtml(current)}" />
          <button id="cfProfileSave" type="button">Speichern</button>
          <button id="cfProfileClear" type="button">Löschen</button>
        </div>
        <div class="profileStatus" id="cfProfileStatus">${current ? `Gespeichert: ${escapeHtml(current)}` : "Noch kein Name gespeichert."}</div>
      </section>
    `;
    const input = document.getElementById("cfProfileName");
    const status = document.getElementById("cfProfileStatus");
    function save(){
      const name = setName(input.value);
      status.textContent = name ? `Gespeichert: ${name}` : "Noch kein Name gespeichert.";
    }
    document.getElementById("cfProfileSave").addEventListener("click", save);
    document.getElementById("cfProfileClear").addEventListener("click", () => {
      input.value = "";
      const name = setName("");
      status.textContent = "Noch kein Name gespeichert.";
    });
    input.addEventListener("keydown", e => {
      if(e.key === "Enter"){
        e.preventDefault();
        save();
      }
    });
  }
  window.CF_PROFILE = { getName, setName, nameOrDots, nameForGerman, mount, cleanName };
})();
