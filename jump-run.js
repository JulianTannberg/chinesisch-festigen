(() => {
  "use strict";

  const topic = getTopic();
  const testMode = new URLSearchParams(location.search).get("test") === "1";
  applyTheme(topic, "Su Rans Reise");

  const $ = id => document.getElementById(id);
  const backUrl = `kapitel.html?id=${topic.id}${testMode ? "&test=1" : ""}`;
  $("backLink").href = backUrl;
  $("lockedBack").href = backUrl;
  $("finishBack").href = backUrl;
  $("title").textContent = `Su Rans Reise · Kapitel ${topic.id}`;
  $("subtitle").textContent = testMode
    ? `${topic.title}: Testmodus – Fortschritt und Bestzeit werden nicht gespeichert.`
    : `${topic.title}: Sammle die Vokabeln und öffne die Tore.`;
  $("chapterNo").textContent = topic.id;
  $("chapterTitle").textContent = topic.title;
  if(testMode){
    const badge = document.querySelector(".topbar .bonusBadge");
    if(badge) badge.textContent = "Testmodus";
  }

  const unlocked = topicHasContent(topic) && (testMode || cfBonusGameUnlocked(topic));
  if(!unlocked){
    $("lockedPanel").hidden = false;
    return;
  }
  $("gameArea").hidden = false;

  const canvas = $("gameCanvas");
  const ctx = canvas.getContext("2d");
  const VIEW_W = canvas.width;
  const VIEW_H = canvas.height;
  const WORLD_W = 3300;
  const GROUND_Y = 470;
  const PLAYER_W = 42;
  const PLAYER_H = 62;
  const GRAVITY = 1800;
  const RUN_SPEED = 285;
  const JUMP_SPEED = 690;

  function cleanText(v){ return String(v == null ? "" : v).trim(); }
  function uniqueBy(items, keyFn){
    const seen = new Set();
    return items.filter(item => {
      const key = keyFn(item);
      if(!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  function pickEvenly(items, count){
    if(items.length <= count) return items.slice();
    const out = [];
    for(let i = 0; i < count; i++){
      const idx = Math.round(i * (items.length - 1) / (count - 1));
      out.push(items[idx]);
    }
    return uniqueBy(out, v => v.zh);
  }

  const vocabSource = uniqueBy(
    [...(topic.vocab || []), ...(topic.understandingVocab || [])]
      .filter(v => cleanText(v.zh) && cleanText(v.de)),
    v => v.zh
  );
  const words = pickEvenly(vocabSource, Math.min(6, vocabSource.length));

  if(words.length < 2){
    $("gameArea").hidden = true;
    $("lockedPanel").hidden = false;
    $("lockedPanel").querySelector("h2").textContent = "Für dieses Level fehlen noch Vokabeln";
    $("lockedPanel").querySelector("p").textContent = "Sobald das Kapitel Vokabeldaten enthält, kann das Bonusspiel automatisch daraus erzeugt werden.";
    return;
  }

  const wordPositions = [
    {x: 410, y: 326},
    {x: 830, y: 276},
    {x: 1090, y: 326},
    {x: 1540, y: 266},
    {x: 1885, y: 326},
    {x: 2290, y: 256}
  ];

  const platforms = [
    // Boden mit Sprunglücken
    {x: 0, y: GROUND_Y, w: 560, h: 70, ground: true},
    {x: 660, y: GROUND_Y, w: 620, h: 70, ground: true},
    {x: 1380, y: GROUND_Y, w: 650, h: 70, ground: true},
    {x: 2130, y: GROUND_Y, w: 520, h: 70, ground: true},
    {x: 2760, y: GROUND_Y, w: 540, h: 70, ground: true},
    // erhöhte Plattformen
    {x: 330, y: 390, w: 190, h: 24},
    {x: 700, y: 340, w: 250, h: 24},
    {x: 1010, y: 390, w: 190, h: 24},
    {x: 1440, y: 330, w: 230, h: 24},
    {x: 1780, y: 390, w: 220, h: 24},
    {x: 2160, y: 320, w: 270, h: 24},
    {x: 2860, y: 380, w: 180, h: 24}
  ];

  const halfway = Math.max(1, Math.ceil(words.length / 2));
  const gates = [
    {x: 1215, y: 310, w: 34, h: 160, need: halfway, quizWord: words[Math.min(1, words.length - 1)], open: false, asked: false},
    {x: 2585, y: 310, w: 34, h: 160, need: words.length, quizWord: words[Math.max(0, words.length - 2)], open: false, asked: false}
  ];

  const collectibles = words.map((word, i) => ({
    word,
    x: wordPositions[i].x,
    y: wordPositions[i].y,
    w: 92,
    h: 50,
    collected: false
  }));

  const player = {
    x: 72, y: GROUND_Y - PLAYER_H,
    w: PLAYER_W, h: PLAYER_H,
    vx: 0, vy: 0,
    grounded: true,
    facing: 1
  };

  const input = {left: false, right: false, jumpRequested: false};
  let started = false;
  let paused = true;
  let finished = false;
  let cameraX = 0;
  let collectedCount = 0;
  let startTime = 0;
  let pausedAt = 0;
  let pausedTotal = 0;
  let lastFrame = performance.now();
  let messageTimer = 0;
  let activeQuizGate = null;

  const avatar = new Image();
  avatar.src = "avatars/suran.jpg";

  function bestKey(){ return `cf_jump_best_v1_${topic.id}`; }
  function doneKey(){ return `cf_jump_done_v1_${topic.id}`; }
  function getBest(){
    if(testMode) return null;
    const n = Number(localStorage.getItem(bestKey()));
    return Number.isFinite(n) && n > 0 ? n : null;
  }
  function formatTime(ms){
    const total = Math.max(0, Math.floor(ms / 1000));
    const min = Math.floor(total / 60);
    const sec = String(total % 60).padStart(2, "0");
    return `${min}:${sec}`;
  }
  function elapsed(now = performance.now()){
    if(!started) return 0;
    const currentPause = pausedAt ? now - pausedAt : 0;
    return Math.max(0, now - startTime - pausedTotal - currentPause);
  }
  function updateHud(){
    $("collectHud").textContent = `Vokabeln: ${collectedCount} / ${words.length}`;
    $("timeHud").textContent = `Zeit: ${formatTime(elapsed())}`;
    const best = getBest();
    $("bestHud").textContent = `Bestzeit: ${best ? formatTime(best) : "–"}`;
  }

  function showMessage(html, duration = 1500){
    const el = $("jumpMessage");
    el.innerHTML = html;
    el.hidden = false;
    clearTimeout(messageTimer);
    messageTimer = setTimeout(() => { el.hidden = true; }, duration);
  }

  function resetGame(showStart){
    player.x = 72;
    player.y = GROUND_Y - PLAYER_H;
    player.vx = 0;
    player.vy = 0;
    player.grounded = true;
    player.facing = 1;
    collectibles.forEach(c => c.collected = false);
    gates.forEach(g => { g.open = false; g.asked = false; });
    collectedCount = 0;
    cameraX = 0;
    finished = false;
    activeQuizGate = null;
    $("quizModal").hidden = true;
    $("finishOverlay").hidden = true;
    $("jumpMessage").hidden = true;
    pausedTotal = 0;
    pausedAt = 0;
    if(showStart){
      started = false;
      paused = true;
      $("startOverlay").hidden = false;
    }else{
      started = true;
      paused = false;
      startTime = performance.now();
      $("startOverlay").hidden = true;
    }
    updateHud();
  }

  function startGame(){
    started = true;
    paused = false;
    finished = false;
    startTime = performance.now();
    pausedTotal = 0;
    pausedAt = 0;
    $("startOverlay").hidden = true;
    updateHud();
  }

  function pauseClock(){
    if(!pausedAt) pausedAt = performance.now();
  }
  function resumeClock(){
    if(pausedAt){
      pausedTotal += performance.now() - pausedAt;
      pausedAt = 0;
    }
  }

  function intersects(a, b){
    return a.x < b.x + b.w && a.x + a.w > b.x &&
           a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function respawn(){
    let x = 72;
    if(gates[1].open) x = 2790;
    else if(gates[0].open) x = 1405;
    player.x = x;
    player.y = GROUND_Y - PLAYER_H;
    player.vx = 0;
    player.vy = 0;
    player.grounded = true;
    showMessage("Noch einmal – du behältst deine gesammelten Vokabeln.", 1300);
  }

  function collect(c){
    c.collected = true;
    collectedCount++;
    cfPlayFeedback(true);
    cfSpeakZh(c.word.zh, {rate: 0.82});
    showMessage(`<strong>${escapeHtml(c.word.zh)}</strong><br>${escapeHtml(c.word.de)}`, 1700);
    updateHud();
  }

  function buildQuizOptions(correct){
    const other = uniqueBy(vocabSource, v => cleanText(v.de))
      .filter(v => v.zh !== correct.zh && cleanText(v.de) !== cleanText(correct.de));
    const choices = shuffle(other).slice(0, 3).map(v => v.de);
    choices.push(correct.de);
    return shuffle(uniqueBy(choices, x => cleanText(x)));
  }

  function openQuiz(gate){
    if(activeQuizGate || gate.open) return;
    activeQuizGate = gate;
    gate.asked = true;
    paused = true;
    pauseClock();
    const word = gate.quizWord;
    $("quizTitle").textContent = "Was bedeutet dieses Wort?";
    $("quizHanzi").textContent = word.zh;
    $("quizFeedback").textContent = "";
    const options = $("quizOptions");
    options.innerHTML = "";
    buildQuizOptions(word).forEach(label => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "jumpQuizOption";
      btn.textContent = label;
      btn.addEventListener("click", () => answerQuiz(btn, label, word.de));
      options.appendChild(btn);
    });
    $("quizModal").hidden = false;
    cfSpeakZh(word.zh, {rate: 0.78});
  }

  function answerQuiz(button, answer, correct){
    if(!activeQuizGate) return;
    const feedback = $("quizFeedback");
    if(cleanText(answer) === cleanText(correct)){
      button.classList.add("correct");
      feedback.textContent = "Richtig – das Tor ist offen!";
      cfPlayFeedback(true);
      const gate = activeQuizGate;
      gate.open = true;
      activeQuizGate = null;
      document.querySelectorAll(".jumpQuizOption").forEach(b => b.disabled = true);
      setTimeout(() => {
        $("quizModal").hidden = true;
        paused = false;
        resumeClock();
        showMessage("Tor geöffnet!", 1000);
      }, 650);
    }else{
      button.classList.add("wrong");
      button.disabled = true;
      feedback.textContent = "Noch nicht. Probiere eine andere Antwort.";
      cfPlayFeedback(false);
    }
  }

  function completeGame(){
    if(finished) return;
    finished = true;
    paused = true;
    pauseClock();
    const result = elapsed();
    const oldBest = getBest();
    const isBest = !testMode && (!oldBest || result < oldBest);
    if(!testMode){
      localStorage.setItem(doneKey(), "1");
      if(isBest) localStorage.setItem(bestKey(), String(Math.round(result)));
    }
    updateHud();
    $("finishText").textContent = testMode
      ? `Du hast ${words.length} Vokabeln gesammelt und das Testlevel in ${formatTime(result)} erreicht. Im Testmodus wird nichts gespeichert.`
      : `Du hast ${words.length} Vokabeln gesammelt und das Ziel in ${formatTime(result)} erreicht.${isBest ? " Neue Bestzeit!" : ""}`;
    $("finishOverlay").hidden = false;
    cfPlayFeedback(true);
    if(typeof cfCelebrateDone === "function") cfCelebrateDone();
  }

  function tryGate(gate){
    if(gate.open) return;
    if(collectedCount >= gate.need){
      openQuiz(gate);
    }else{
      const missing = gate.need - collectedCount;
      showMessage(`Sammle zuerst noch ${missing} ${missing === 1 ? "Vokabel" : "Vokabeln"}.`, 1200);
    }
  }

  function update(dt){
    if(!started || paused || finished) return;

    let direction = 0;
    if(input.left) direction -= 1;
    if(input.right) direction += 1;
    player.vx = direction * RUN_SPEED;
    if(direction) player.facing = direction;

    if(input.jumpRequested && player.grounded){
      player.vy = -JUMP_SPEED;
      player.grounded = false;
    }
    input.jumpRequested = false;

    const oldX = player.x;
    player.x += player.vx * dt;
    player.x = Math.max(0, Math.min(WORLD_W - player.w, player.x));

    // Geschlossene Tore blockieren und öffnen bei erfüllter Sammelbedingung die Aufgabe.
    for(const gate of gates){
      if(gate.open) continue;
      const gateBox = {x: gate.x, y: gate.y, w: gate.w, h: gate.h};
      if(intersects(player, gateBox)){
        if(oldX + player.w <= gate.x + 6){
          player.x = gate.x - player.w;
        }else if(oldX >= gate.x + gate.w - 6){
          player.x = gate.x + gate.w;
        }
        player.vx = 0;
        tryGate(gate);
      }
    }

    const previousBottom = player.y + player.h;
    player.vy += GRAVITY * dt;
    player.y += player.vy * dt;
    player.grounded = false;

    // Landen auf Boden und Plattformen.
    for(const p of platforms){
      const horizontal = player.x + player.w > p.x + 3 && player.x < p.x + p.w - 3;
      const currentBottom = player.y + player.h;
      if(horizontal && player.vy >= 0 && previousBottom <= p.y + 5 && currentBottom >= p.y){
        player.y = p.y - player.h;
        player.vy = 0;
        player.grounded = true;
      }
    }

    if(player.y > VIEW_H + 120) respawn();

    for(const c of collectibles){
      if(!c.collected && intersects(player, c)) collect(c);
    }

    if(player.x + player.w > 3160 && gates.every(g => g.open) && collectedCount === words.length){
      completeGame();
    }

    cameraX = Math.max(0, Math.min(WORLD_W - VIEW_W, player.x - 260));
    updateHud();
  }

  function hexToRgb(hex){
    const h = String(hex || "#03172B").replace("#", "").padEnd(6, "0").slice(0, 6);
    return {
      r: parseInt(h.slice(0,2),16) || 3,
      g: parseInt(h.slice(2,4),16) || 23,
      b: parseInt(h.slice(4,6),16) || 43
    };
  }
  function rgba(hex, alpha){
    const c = hexToRgb(hex);
    return `rgba(${c.r},${c.g},${c.b},${alpha})`;
  }
  function mix(hex, amount){
    const c = hexToRgb(hex);
    const m = amount >= 0 ? 255 : 0;
    const a = Math.abs(amount);
    const f = n => Math.round(n + (m - n) * a);
    return `rgb(${f(c.r)},${f(c.g)},${f(c.b)})`;
  }

  function roundedRect(x, y, w, h, r){
    const radius = Math.min(r, w/2, h/2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  function drawBackground(){
    const accent = topic.accent || "#03172B";
    const sky = ctx.createLinearGradient(0, 0, 0, VIEW_H);
    sky.addColorStop(0, mix(accent, 0.35));
    sky.addColorStop(0.65, mix(accent, 0.72));
    sky.addColorStop(1, "#f7e9d8");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);

    // Sonne/Mond
    ctx.fillStyle = "rgba(255,245,210,.78)";
    ctx.beginPath();
    ctx.arc(780, 92, 45, 0, Math.PI * 2);
    ctx.fill();

    // Ferne Berge mit Parallax-Effekt
    const par = cameraX * 0.16;
    ctx.fillStyle = rgba(accent, 0.24);
    ctx.beginPath();
    ctx.moveTo(-200 - par, 360);
    for(let x = -200; x < 1400; x += 230){
      ctx.lineTo(x - par + 115, 205 + ((x / 230) % 2 ? 35 : 0));
      ctx.lineTo(x - par + 230, 360);
    }
    ctx.lineTo(1300, 540);
    ctx.lineTo(-200, 540);
    ctx.closePath();
    ctx.fill();

    // Stadt-Silhouette
    const cityOffset = -(cameraX * 0.35) % 420;
    ctx.fillStyle = rgba(accent, 0.30);
    for(let x = cityOffset - 100; x < VIEW_W + 100; x += 105){
      const h = 55 + ((Math.abs(Math.round(x / 105))) % 4) * 18;
      ctx.fillRect(x, GROUND_Y - h, 72, h);
      ctx.fillRect(x + 20, GROUND_Y - h - 14, 32, 14);
    }
  }

  function drawWorld(){
    const accent = topic.accent || "#03172B";
    ctx.save();
    ctx.translate(-cameraX, 0);

    // Wasser in den Sprunglücken
    ctx.fillStyle = "rgba(58,139,176,.62)";
    ctx.fillRect(0, GROUND_Y + 18, WORLD_W, VIEW_H - GROUND_Y);
    ctx.strokeStyle = "rgba(255,255,255,.45)";
    ctx.lineWidth = 3;
    for(let x = 0; x < WORLD_W; x += 58){
      ctx.beginPath();
      ctx.arc(x, GROUND_Y + 25, 24, Math.PI, 0);
      ctx.stroke();
    }

    // Plattformen
    for(const p of platforms){
      ctx.fillStyle = p.ground ? mix(accent, -0.10) : mix(accent, 0.18);
      roundedRect(p.x, p.y, p.w, p.h, p.ground ? 10 : 12);
      ctx.fill();
      ctx.fillStyle = p.ground ? "rgba(214,188,162,.92)" : "rgba(246,227,229,.78)";
      roundedRect(p.x, p.y, p.w, Math.min(10, p.h), 8);
      ctx.fill();
    }

    // Tore
    gates.forEach((g, index) => {
      if(g.open){
        ctx.strokeStyle = "rgba(34,197,94,.8)";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(g.x + g.w/2, g.y);
        ctx.lineTo(g.x + g.w/2, g.y - 55);
        ctx.stroke();
        ctx.fillStyle = "rgba(34,197,94,.88)";
        ctx.beginPath();
        ctx.arc(g.x + g.w/2, g.y - 62, 11, 0, Math.PI*2);
        ctx.fill();
        return;
      }
      ctx.fillStyle = "#7b4b2a";
      ctx.fillRect(g.x, g.y, g.w, g.h);
      ctx.fillStyle = "#c9984a";
      for(let y = g.y + 10; y < g.y + g.h; y += 28) ctx.fillRect(g.x + 5, y, g.w - 10, 7);
      ctx.fillStyle = "rgba(255,255,255,.92)";
      roundedRect(g.x - 34, g.y - 55, 102, 42, 12);
      ctx.fill();
      ctx.fillStyle = "#0b1b2e";
      ctx.font = "700 18px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`Tor ${index + 1}`, g.x + g.w/2, g.y - 29);
    });

    // Sammel-Vokabeln
    for(const c of collectibles){
      if(c.collected) continue;
      ctx.shadowColor = "rgba(255,215,90,.78)";
      ctx.shadowBlur = 18;
      ctx.fillStyle = "rgba(255,250,225,.96)";
      roundedRect(c.x, c.y, c.w, c.h, 18);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(184,135,40,.8)";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = "#1e2a34";
      const size = c.word.zh.length > 4 ? 19 : c.word.zh.length > 2 ? 23 : 28;
      ctx.font = `800 ${size}px "Microsoft YaHei", "Noto Sans SC", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(c.word.zh, c.x + c.w/2, c.y + c.h/2 + 1, c.w - 12);
    }

    // Ziel: Tor zum nächsten Kapitel
    ctx.fillStyle = "#a11f2b";
    ctx.fillRect(3130, 340, 18, 130);
    ctx.fillRect(3220, 340, 18, 130);
    ctx.fillStyle = "#d5a33b";
    ctx.fillRect(3114, 332, 140, 16);
    ctx.fillStyle = "rgba(255,255,255,.95)";
    roundedRect(3136, 360, 96, 50, 8);
    ctx.fill();
    ctx.fillStyle = "#9d2431";
    ctx.font = "800 24px \"Microsoft YaHei\", sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("下一章", 3184, 385);

    drawPlayer();
    ctx.restore();
  }

  function drawPlayer(){
    const x = player.x;
    const y = player.y;
    // Körper
    ctx.fillStyle = "#31485e";
    roundedRect(x + 5, y + 25, player.w - 10, player.h - 23, 10);
    ctx.fill();
    ctx.fillStyle = "#1e2a34";
    ctx.fillRect(x + 8, y + player.h - 11, 11, 11);
    ctx.fillRect(x + player.w - 19, y + player.h - 11, 11, 11);

    // Kopf mit vorhandenem Su-Ran-Avatar; Fallback als einfache Figur.
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + player.w/2, y + 18, 18, 0, Math.PI * 2);
    ctx.clip();
    if(avatar.complete && avatar.naturalWidth){
      ctx.drawImage(avatar, x + 3, y, 36, 36);
    }else{
      ctx.fillStyle = "#f0c5a7";
      ctx.fillRect(x + 3, y, 36, 36);
    }
    ctx.restore();
    ctx.strokeStyle = "rgba(255,255,255,.9)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x + player.w/2, y + 18, 18, 0, Math.PI * 2);
    ctx.stroke();

    // Blickrichtung
    ctx.fillStyle = "rgba(255,255,255,.95)";
    ctx.beginPath();
    const eyeX = x + player.w/2 + player.facing * 7;
    ctx.arc(eyeX, y + 16, 2.5, 0, Math.PI*2);
    ctx.fill();
  }

  function draw(){
    ctx.clearRect(0, 0, VIEW_W, VIEW_H);
    drawBackground();
    drawWorld();
  }

  function frame(now){
    const dt = Math.min(0.033, Math.max(0, (now - lastFrame) / 1000));
    lastFrame = now;
    update(dt);
    draw();
    requestAnimationFrame(frame);
  }

  function setControl(name, active){
    if(name === "jump"){
      if(active) input.jumpRequested = true;
      return;
    }
    input[name] = active;
  }

  window.addEventListener("keydown", e => {
    if(["ArrowLeft","ArrowRight","ArrowUp"," ","Spacebar","a","A","d","D","w","W"].includes(e.key)) e.preventDefault();
    if(e.key === "ArrowLeft" || e.key === "a" || e.key === "A") input.left = true;
    if(e.key === "ArrowRight" || e.key === "d" || e.key === "D") input.right = true;
    if(e.key === "ArrowUp" || e.key === " " || e.key === "Spacebar" || e.key === "w" || e.key === "W") input.jumpRequested = true;
  }, {passive: false});
  window.addEventListener("keyup", e => {
    if(e.key === "ArrowLeft" || e.key === "a" || e.key === "A") input.left = false;
    if(e.key === "ArrowRight" || e.key === "d" || e.key === "D") input.right = false;
  });
  window.addEventListener("blur", () => { input.left = false; input.right = false; });

  document.querySelectorAll("[data-control]").forEach(btn => {
    const name = btn.dataset.control;
    const down = e => {
      e.preventDefault();
      try{ btn.setPointerCapture(e.pointerId); }catch(err){}
      btn.classList.add("active");
      setControl(name, true);
    };
    const up = e => {
      e.preventDefault();
      btn.classList.remove("active");
      setControl(name, false);
    };
    btn.addEventListener("pointerdown", down);
    btn.addEventListener("pointerup", up);
    btn.addEventListener("pointercancel", up);
    btn.addEventListener("lostpointercapture", up);
  });

  $("startBtn").addEventListener("click", startGame);
  $("restartBtn").addEventListener("click", () => resetGame(false));
  $("playAgainBtn").addEventListener("click", () => resetGame(false));

  resetGame(true);
  requestAnimationFrame(frame);
})();
