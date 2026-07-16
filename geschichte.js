(function(){
  "use strict";

  const story = window.CF_STORY;
  const topics = window.CF_TOPICS || [];
  const params = new URLSearchParams(location.search);
  const testMode = params.get("test") === "1";
  const unlocked = (typeof cfStoryUnlocked === "function" && cfStoryUnlocked(topics)) || testMode;
  const progress = typeof cfStoryProgress === "function" ? cfStoryProgress(topics) : {done:0,total:15};

  const lockedEl = document.getElementById("storyLocked");
  const readerEl = document.getElementById("storyReader");
  const track = document.getElementById("storyTrack");
  const viewport = document.getElementById("storyViewport");
  const chapterSelect = document.getElementById("storyChapterSelect");
  const positionLabel = document.getElementById("storyPositionLabel");
  const pageCounter = document.getElementById("storyPageCounter");
  const prevBtn = document.getElementById("storyPrev");
  const nextBtn = document.getElementById("storyNext");
  const pinyinBtn = document.getElementById("togglePinyin");
  const germanBtn = document.getElementById("toggleGerman");
  const contentsBtn = document.getElementById("storyContentsBtn");

  if(!story || !Array.isArray(story.chapters) || story.chapters.length !== 15){
    lockedEl.hidden = false;
    lockedEl.querySelector("h1").textContent = "Die Geschichte konnte nicht geladen werden";
    lockedEl.querySelector("p").textContent = "Bitte lade die App neu. Die Lesedaten sind nicht vollständig vorhanden.";
    return;
  }

  if(!unlocked){
    lockedEl.hidden = false;
    document.getElementById("storyLockedProgress").textContent = `${progress.done} von 15 Kapiteln sind bereits durchgearbeitet.`;
    contentsBtn.hidden = true;
    return;
  }

  readerEl.hidden = false;

  const STORAGE_POSITION = "cf_story_position_v1";
  const STORAGE_PINYIN = "cf_story_show_pinyin_v1";
  const STORAGE_GERMAN = "cf_story_show_german_v1";
  let pageIndex = 0;
  let showPinyin = readBool(STORAGE_PINYIN, false);
  let showGerman = readBool(STORAGE_GERMAN, false);
  let saveTimer = null;
  let pendingScroll = 0;

  function esc(value){
    return String(value == null ? "" : value)
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }

  function readBool(key, fallback){
    try{
      const value = localStorage.getItem(key);
      return value === null ? fallback : value === "1";
    }catch(e){ return fallback; }
  }

  function writeBool(key, value){
    try{ localStorage.setItem(key, value ? "1" : "0"); }catch(e){}
  }

  function readPosition(){
    try{
      const parsed = JSON.parse(localStorage.getItem(STORAGE_POSITION) || "{}");
      const page = Number(parsed.page);
      const scrollTop = Number(parsed.scrollTop);
      return {
        page:Number.isInteger(page) ? Math.max(0, Math.min(15, page)) : 0,
        scrollTop:Number.isFinite(scrollTop) ? Math.max(0, scrollTop) : 0
      };
    }catch(e){ return {page:0,scrollTop:0}; }
  }

  function currentPage(){ return track.children[pageIndex] || null; }

  function savePositionSoon(){
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      const page = currentPage();
      try{
        localStorage.setItem(STORAGE_POSITION, JSON.stringify({
          page:pageIndex,
          scrollTop:page ? page.scrollTop : 0
        }));
      }catch(e){}
    }, 120);
  }

  function renderIntro(){
    const extras = story.intro.extraVocab.map(v => `
      <tr><td class="storyTableZh">${esc(v.zh)}</td><td>${esc(v.pinyin)}</td><td>${esc(v.de)}</td><td>${esc(v.hint || "")}</td></tr>
    `).join("");
    const patterns = story.intro.patterns.map(p => `
      <article class="storyPatternCard">
        <strong>${esc(p.pattern)}</strong>
        <span>${esc(p.meaning)}</span>
        <small>${esc(p.example)}</small>
      </article>
    `).join("");
    return `
      <section class="storyPage storyIntroPage" data-page="0" aria-label="Lesehilfe">
        <div class="storyPageInner">
          <div class="storyCoverMark">完整的故事</div>
          <h1>${esc(story.title)}</h1>
          <p class="storyLead">${esc(story.subtitle)}</p>
          <div class="storyIntroNotice">
            <strong>Du hast es geschafft.</strong>
            <p>${esc(story.intro.lead)}</p>
            <p>${esc(story.intro.tip)}</p>
          </div>
          <h2>Extra-Vokabeln für die Lesefassung</h2>
          <div class="storyTableWrap">
            <table class="storyVocabTable">
              <thead><tr><th>Hanzi</th><th>Pinyin</th><th>Deutsch</th><th>Hinweis</th></tr></thead>
              <tbody>${extras}</tbody>
            </table>
          </div>
          <h2>Lesehilfe</h2>
          <p>Diese Formen musst du noch nicht selbst bilden. Für die Geschichte reicht es, wenn du sie beim Lesen wiedererkennst.</p>
          <div class="storyPatternGrid">${patterns}</div>
          <div class="storyReadingTip"><strong>Lesetipp</strong><p>${esc(story.intro.readingTip)}</p></div>
          <button class="storyStartBtn" type="button" data-go-page="1">Mit Kapitel 1 beginnen ›</button>
        </div>
      </section>`;
  }

  function renderUnit(unit){
    const speaker = unit.speaker ? `<div class="storySpeaker">${esc(unit.speaker)}</div>` : "";
    const label = unit.speaker ? `${unit.speaker}: ${unit.zh}` : unit.zh;
    return `
      <article class="storyUnit ${esc(unit.type)}" data-unit-id="${esc(unit.id)}">
        ${speaker}
        <div class="storyUnitText">
          <div class="storyZh">${esc(unit.zh)}</div>
          <div class="storyPinyin">${esc(unit.pinyin)}</div>
          <div class="storyGerman">${esc(unit.de)}</div>
        </div>
        <button class="storyPlay" type="button" data-speak="${esc(unit.id)}" aria-label="${esc(label)} anhören" title="Abschnitt anhören">▶</button>
      </article>`;
  }

  function renderChapter(chapter, index){
    return `
      <section class="storyPage" data-page="${index + 1}" data-chapter="${esc(chapter.id)}" aria-label="Kapitel ${index + 1}: ${esc(chapter.titleDe)}">
        <div class="storyPageInner">
          <header class="storyChapterHeading">
            <div class="storyChapterNo">Kapitel ${index + 1} von 15</div>
            <h1>${esc(chapter.titleZh)}</h1>
            <p>${esc(chapter.titleDe)}</p>
            <button class="storyPlayChapter" type="button" data-play-chapter="${esc(chapter.id)}">▶ Kapitel anhören</button>
          </header>
          <div class="storyUnits">${chapter.units.map(renderUnit).join("")}</div>
          <div class="storyEndMark">第 ${index + 1} 章 · Ende des Kapitels</div>
        </div>
      </section>`;
  }

  track.innerHTML = renderIntro() + story.chapters.map(renderChapter).join("");

  chapterSelect.innerHTML = `<option value="0">Lesehilfe & Extra-Vokabeln</option>` +
    story.chapters.map((c,i) => `<option value="${i+1}">Kapitel ${i+1} · ${esc(c.titleDe)}</option>`).join("");

  const unitMap = new Map();
  story.chapters.forEach(c => c.units.forEach(u => unitMap.set(u.id, u)));

  function applyHelpVisibility(){
    readerEl.classList.toggle("showPinyin", showPinyin);
    readerEl.classList.toggle("showGerman", showGerman);
    pinyinBtn.classList.toggle("active", showPinyin);
    germanBtn.classList.toggle("active", showGerman);
    pinyinBtn.setAttribute("aria-pressed", String(showPinyin));
    germanBtn.setAttribute("aria-pressed", String(showGerman));
    pinyinBtn.textContent = showPinyin ? "Pinyin an" : "Pinyin";
    germanBtn.textContent = showGerman ? "Deutsch an" : "Deutsch";
  }

  function updateNavigation(){
    const chapter = pageIndex > 0 ? story.chapters[pageIndex - 1] : null;
    const label = chapter ? `Kapitel ${pageIndex} · ${chapter.titleDe}` : "Lesehilfe";
    positionLabel.textContent = label;
    pageCounter.textContent = chapter ? `${pageIndex} / 15` : "Lesehilfe";
    chapterSelect.value = String(pageIndex);
    prevBtn.disabled = pageIndex === 0;
    nextBtn.disabled = pageIndex === 15;
    nextBtn.textContent = pageIndex === 0 ? "Kapitel 1 ›" : (pageIndex === 15 ? "Ende" : "Nächstes Kapitel ›");
    window.CF_CHAPTER = chapter ? chapter.id : null;
  }

  function goToPage(nextIndex, options){
    const opts = options || {};
    const target = Math.max(0, Math.min(15, Number(nextIndex) || 0));
    if(target === pageIndex && !opts.force){ return; }
    pageIndex = target;
    track.style.transform = `translate3d(${-pageIndex * 100}%,0,0)`;
    updateNavigation();
    const page = currentPage();
    if(page){
      requestAnimationFrame(() => {
        page.scrollTop = Number.isFinite(opts.scrollTop) ? opts.scrollTop : 0;
        savePositionSoon();
      });
    }
  }

  function speakUnit(id, button){
    const unit = unitMap.get(id);
    if(!unit) return;
    document.querySelectorAll(".storyPlay.playing").forEach(b => b.classList.remove("playing"));
    button.classList.add("playing");
    cfSpeakZh(unit.zh, {
      speaker:unit.speaker || undefined,
      rate:0.88,
      onend:() => button.classList.remove("playing")
    });
  }

  function playChapter(id, button){
    const chapter = story.chapters.find(c => c.id === id);
    if(!chapter || !chapter.units.length) return;
    document.querySelectorAll(".storyPlayChapter.playing").forEach(b => b.classList.remove("playing"));
    button.classList.add("playing");
    chapter.units.forEach((unit,index) => {
      cfSpeakZh(unit.zh, {
        speaker:unit.speaker || undefined,
        rate:0.88,
        queue:index > 0,
        onend:index === chapter.units.length - 1 ? () => button.classList.remove("playing") : undefined
      });
    });
  }

  track.addEventListener("click", event => {
    const play = event.target.closest("[data-speak]");
    if(play){ speakUnit(play.dataset.speak, play); return; }
    const playChapterBtn = event.target.closest("[data-play-chapter]");
    if(playChapterBtn){ playChapter(playChapterBtn.dataset.playChapter, playChapterBtn); return; }
    const go = event.target.closest("[data-go-page]");
    if(go) goToPage(Number(go.dataset.goPage));
  });

  pinyinBtn.addEventListener("click", () => {
    showPinyin = !showPinyin;
    writeBool(STORAGE_PINYIN, showPinyin);
    applyHelpVisibility();
  });
  germanBtn.addEventListener("click", () => {
    showGerman = !showGerman;
    writeBool(STORAGE_GERMAN, showGerman);
    applyHelpVisibility();
  });
  prevBtn.addEventListener("click", () => goToPage(pageIndex - 1));
  nextBtn.addEventListener("click", () => goToPage(pageIndex + 1));
  chapterSelect.addEventListener("change", () => goToPage(Number(chapterSelect.value)));
  contentsBtn.addEventListener("click", () => {
    chapterSelect.focus();
    try{ chapterSelect.showPicker(); }catch(e){ chapterSelect.click(); }
  });

  Array.from(track.children).forEach(page => page.addEventListener("scroll", () => {
    if(page === currentPage()) savePositionSoon();
  }, {passive:true}));

  // Kindle-artiges Weiterblättern: horizontal wischen. Vertikales Lesen bleibt
  // unberührt; erst eine klare seitliche Bewegung wechselt das Kapitel.
  let startX = 0, startY = 0, startTime = 0, tracking = false;
  viewport.addEventListener("pointerdown", e => {
    if(e.pointerType === "mouse" && e.button !== 0) return;
    startX = e.clientX; startY = e.clientY; startTime = Date.now(); tracking = true;
  }, {passive:true});
  viewport.addEventListener("pointerup", e => {
    if(!tracking) return;
    tracking = false;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const fastEnough = Date.now() - startTime < 900;
    if(fastEnough && Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.35){
      if(dx < 0) goToPage(pageIndex + 1);
      else goToPage(pageIndex - 1);
    }
  }, {passive:true});
  viewport.addEventListener("pointercancel", () => { tracking = false; }, {passive:true});

  document.addEventListener("keydown", e => {
    if(e.key === "ArrowRight" || e.key === "PageDown") goToPage(pageIndex + 1);
    if(e.key === "ArrowLeft" || e.key === "PageUp") goToPage(pageIndex - 1);
  });
  window.addEventListener("pagehide", savePositionSoon);
  document.addEventListener("visibilitychange", () => { if(document.hidden) savePositionSoon(); });

  const saved = readPosition();
  pageIndex = saved.page;
  pendingScroll = saved.scrollTop;
  applyHelpVisibility();
  goToPage(pageIndex, {force:true, scrollTop:pendingScroll});
})();
