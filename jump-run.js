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
    : `${topic.title}: Sammle die richtigen Wörter und bilde Sätze.`;
  $("chapterNo").textContent = topic.id;
  $("chapterTitle").textContent = topic.title;
  if(testMode){
    const badge = document.querySelector(".topbar .bonusBadge");
    if(badge) badge.textContent = "Testmodus";
    $("testSentenceBtn").hidden = false;
  }

  const unlocked = topicHasContent(topic) && (testMode || cfBonusGameUnlocked(topic));
  if(!unlocked){
    $("lockedPanel").hidden = false;
    return;
  }
  if(topic.id !== "01"){
    $("lockedPanel").hidden = false;
    $("lockedPanel").querySelector("h2").textContent = "Testversion zunächst nur für Kapitel 1";
    $("lockedPanel").querySelector("p").textContent = "Sobald Steuerung und Satzaufgaben abgestimmt sind, können die weiteren Kapitel mit ihren eigenen Geschichten aufgebaut werden.";
    return;
  }
  $("gameArea").hidden = false;

  const canvas = $("gameCanvas");
  const ctx = canvas.getContext("2d");
  const VIEW_W = canvas.width;
  const VIEW_H = canvas.height;
  const WORLD_W = 3600;
  const GROUND_Y = 470;
  const PLAYER_W = 44;
  const PLAYER_H = 68;
  const GRAVITY = 1850;
  const RUN_SPEED = 295;
  const JUMP_SPEED = 690;
  const DOUBLE_JUMP_SPEED = 625;
  const LINYUE_X = 1535;
  const SUBWAY_X = 3425;

  const missions = [
    {
      de: "Ah! Entschuldigung!",
      zh: "啊！对不起！",
      tokens: ["啊", "对不起"],
      decoys: ["谢谢", "你好", "再见"],
      cueZh: "",
      replyZh: "没关系。"
    },
    {
      de: "Alles gut, danke. Ich habe auf mein Handy geschaut.",
      zh: "没事，谢谢。我看手机了。",
      tokens: ["没事", "谢谢", "我", "看", "手机", "了"],
      decoys: ["对不起", "你", "叫", "北京"],
      cueZh: "你没事吧？",
      replyZh: "我也看手机了。"
    },
    {
      de: "Hallo, ich heiße Su Ran.",
      zh: "你好，我叫苏然。",
      tokens: ["你好", "我", "叫", "苏然"],
      decoys: ["你", "林月", "名字", "是"],
      cueZh: "",
      replyZh: ""
    },
    {
      de: "Wie heißt du?",
      zh: "你叫什么名字？",
      tokens: ["你", "叫", "什么", "名字"],
      decoys: ["我", "苏然", "哪里", "吗"],
      cueZh: "",
      replyZh: "嗨，我叫林月。"
    },
    {
      de: "Entschuldigung, wo ist die U-Bahn?",
      zh: "请问，地铁在哪里？",
      tokens: ["请问", "地铁", "在", "哪里"],
      decoys: ["那儿", "手机", "北京", "微信"],
      cueZh: "",
      replyZh: "地铁在那儿。"
    }
  ];

  const platforms = [
    {x: 0, y: GROUND_Y, w: 650, h: 70, ground: true},
    {x: 760, y: GROUND_Y, w: 560, h: 70, ground: true},
    {x: 1430, y: GROUND_Y, w: 580, h: 70, ground: true},
    {x: 2120, y: GROUND_Y, w: 620, h: 70, ground: true},
    {x: 2860, y: GROUND_Y, w: 740, h: 70, ground: true},
    {x: 250, y: 355, w: 220, h: 24},
    {x: 810, y: 330, w: 220, h: 24},
    {x: 1090, y: 385, w: 165, h: 24},
    {x: 1710, y: 340, w: 235, h: 24},
    {x: 2180, y: 315, w: 250, h: 24},
    {x: 2540, y: 375, w: 170, h: 24},
    {x: 2990, y: 345, w: 195, h: 24}
  ];

  const missionSpots = [
    [
      {x:1080,y:400},{x:1250,y:320},{x:1750,y:275},{x:1900,y:400},{x:1460,y:400}
    ],
    [
      {x:840,y:265},{x:1120,y:320},{x:1250,y:400},{x:1740,y:275},{x:1930,y:400},
      {x:2180,y:250},{x:2360,y:250},{x:2550,y:310},{x:2690,y:400},{x:1510,y:400}
    ],
    [
      {x:390,y:290},{x:610,y:400},{x:900,y:265},{x:1190,y:320},
      {x:1800,y:275},{x:2250,y:250},{x:2600,y:310},{x:3020,y:280}
    ],
    [
      {x:230,y:400},{x:470,y:290},{x:820,y:265},{x:1180,y:400},
      {x:1900,y:400},{x:2230,y:250},{x:2650,y:400},{x:3070,y:280}
    ],
    [
      {x:920,y:265},{x:1240,y:400},{x:1830,y:275},{x:2200,y:250},
      {x:2580,y:310},{x:2910,y:400},{x:3070,y:280},{x:3290,y:400}
    ]
  ];

  function cleanText(v){ return String(v == null ? "" : v).trim(); }
  function safeHtml(v){
    return String(v == null ? "" : v)
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;").replace(/'/g,"&#039;");
  }
  function shuffleCopy(items){
    const out = items.slice();
    for(let i = out.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }
  function intersects(a, b){
    return a.x < b.x + b.w && a.x + a.w > b.x &&
           a.y < b.y + b.h && a.y + a.h > b.y;
  }

  const vocabMap = new Map();
  [...(topic.vocab || []), ...(topic.understandingVocab || [])].forEach(v => {
    if(v && cleanText(v.zh)) vocabMap.set(cleanText(v.zh), v);
  });

  const player = {
    x: LINYUE_X - 120,
    y: GROUND_Y - PLAYER_H,
    w: PLAYER_W,
    h: PLAYER_H,
    vx: 0,
    vy: 0,
    grounded: true,
    facing: 1,
    jumpsLeft: 2,
    stunnedUntil: 0
  };

  const input = {left: false, right: false, jumpQueue: 0};
  const particles = [];
  let started = false;
  let paused = true;
  let finished = false;
  let currentMission = 0;
  let currentCollectibles = [];
  let collectedTokenIds = new Set();
  let selectedTokenIds = [];
  let subwayUnlocked = false;
  let cameraX = Math.max(0, LINYUE_X - 420);
  let startTime = 0;
  let pausedAt = 0;
  let pausedTotal = 0;
  let lastFrame = performance.now();
  let messageTimer = 0;
  let sentenceLocked = false;
  let pseudoFullscreen = false;

  const avatarSu = new Image();
  avatarSu.src = "avatars/suran.jpg";
  const avatarLin = new Image();
  avatarLin.src = "avatars/linyue.jpg";

  function bestKey(){ return `cf_jump_best_v2_${topic.id}`; }
  function doneKey(){ return `cf_jump_done_v2_${topic.id}`; }
  function getBest(){
    if(testMode) return null;
    const n = Number(localStorage.getItem(bestKey()));
    return Number.isFinite(n) && n > 0 ? n : null;
  }
  function formatTime(ms){
    const total = Math.max(0, Math.floor(ms / 1000));
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2,"0")}`;
  }
  function elapsed(now = performance.now()){
    if(!started) return 0;
    const currentPause = pausedAt ? now - pausedAt : 0;
    return Math.max(0, now - startTime - pausedTotal - currentPause);
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

  function mission(){ return missions[currentMission]; }
  function collectedCount(){ return collectedTokenIds.size; }

  function updateHud(){
    const m = mission();
    $("stepHud").textContent = subwayUnlocked ? "Ziel" : `Satz ${currentMission + 1} / ${missions.length}`;
    $("taskHud").textContent = subwayUnlocked ? "Laufe jetzt zum U-Bahn-Eingang →" : m.de;
    $("collectHud").textContent = subwayUnlocked
      ? "Alle Sätze gelöst"
      : `Wörter: ${collectedCount()} / ${m.tokens.length}`;
    $("timeHud").textContent = `Zeit: ${formatTime(elapsed())}`;
  }

  function showMessage(html, duration = 1450){
    const el = $("jumpMessage");
    el.innerHTML = html;
    el.hidden = false;
    clearTimeout(messageTimer);
    messageTimer = setTimeout(() => { el.hidden = true; }, duration);
  }

  function createMissionCollectibles(index){
    const m = missions[index];
    const tokenObjects = m.tokens.map((text, i) => ({
      id: `m${index}-t${i}`,
      text,
      kind: "correct",
      meta: vocabMap.get(text) || {zh:text, de:""}
    }));
    const decoyObjects = m.decoys.map((text, i) => ({
      id: `m${index}-d${i}`,
      text,
      kind: "decoy",
      meta: vocabMap.get(text) || {zh:text, de:""}
    }));
    const objects = shuffleCopy([...tokenObjects, ...decoyObjects]);
    const spots = missionSpots[index];
    return objects.map((obj, i) => ({
      ...obj,
      x: spots[i % spots.length].x,
      y: spots[i % spots.length].y,
      w: Math.max(78, Math.min(132, 42 + textWidthEstimate(obj.text))),
      h: 50,
      active: true
    }));
  }

  function textWidthEstimate(text){
    return Array.from(text).length * 25;
  }

  function placePlayerAtLinYue(){
    player.x = LINYUE_X - 125;
    player.y = GROUND_Y - PLAYER_H;
    player.vx = 0;
    player.vy = 0;
    player.grounded = true;
    player.facing = 1;
    player.jumpsLeft = 2;
    player.stunnedUntil = 0;
    cameraX = Math.max(0, Math.min(WORLD_W - VIEW_W, player.x - 330));
  }

  function resetCurrentMission(reason){
    collectedTokenIds = new Set();
    selectedTokenIds = [];
    currentCollectibles.forEach(c => { c.active = true; });
    placePlayerAtLinYue();
    if(reason === "water"){
      showMessage("Ins Wasser gefallen – die Wörter dieses Satzes sind wieder weg.", 1800);
    }
    updateHud();
  }

  function resetGame(showStart){
    currentMission = 0;
    currentCollectibles = createMissionCollectibles(0);
    collectedTokenIds = new Set();
    selectedTokenIds = [];
    subwayUnlocked = false;
    finished = false;
    sentenceLocked = false;
    particles.length = 0;
    placePlayerAtLinYue();
    $("sentenceOverlay").hidden = true;
    $("replyOverlay").hidden = true;
    $("missionOverlay").hidden = true;
    $("finishOverlay").hidden = true;
    $("jumpMessage").hidden = true;
    $("testSentenceBtn").hidden = !testMode;
    pausedTotal = 0;
    pausedAt = 0;
    if(showStart){
      started = false;
      paused = true;
      $("startOverlay").hidden = false;
    }else{
      started = true;
      paused = true;
      startTime = performance.now();
      $("startOverlay").hidden = true;
      showMissionIntro();
    }
    updateHud();
  }

  function startGame(){
    started = true;
    paused = true;
    finished = false;
    startTime = performance.now();
    pausedTotal = 0;
    pausedAt = performance.now();
    $("startOverlay").hidden = true;
    showMissionIntro();
  }

  function showMissionIntro(){
    const m = mission();
    paused = true;
    pauseClock();
    $("missionBadge").textContent = `Satz ${currentMission + 1} von ${missions.length}`;
    $("missionPrompt").textContent = m.de;
    if(m.cueZh){
      $("partnerCueZh").textContent = m.cueZh;
      $("partnerCue").hidden = false;
      cfSpeakZh(m.cueZh, {rate:0.78});
    }else{
      $("partnerCue").hidden = true;
    }
    $("missionOverlay").hidden = false;
    updateHud();
  }

  function beginMissionSearch(){
    $("missionOverlay").hidden = true;
    paused = false;
    resumeClock();
    showMessage("Sammle nur die Wörter für den deutschen Satz.", 1500);
  }

  function spawnBurst(x, y, good){
    for(let i = 0; i < 14; i++){
      const a = Math.random() * Math.PI * 2;
      const speed = 70 + Math.random() * 150;
      particles.push({
        x, y,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed - 45,
        life: 0.55 + Math.random() * 0.35,
        maxLife: 0.9,
        good
      });
    }
  }

  function collectCorrect(c){
    c.active = false;
    collectedTokenIds.add(c.id);
    spawnBurst(c.x + c.w/2, c.y + c.h/2, true);
    cfPlayFeedback(true);
    cfSpeakZh(c.text, {rate:0.80});
    const meaning = c.meta && c.meta.de ? `<br>${safeHtml(c.meta.de)}` : "";
    showMessage(`<strong>${safeHtml(c.text)}</strong>${meaning}`, 1350);
    updateHud();
    if(collectedCount() === mission().tokens.length){
      setTimeout(() => showMessage("Alle Wörter gefunden – zurück zu Lin Yue!", 1700), 250);
    }
  }

  function hitDecoy(c){
    c.active = false;
    spawnBurst(c.x + c.w/2, c.y + c.h/2, false);
    player.stunnedUntil = performance.now() + 900;
    player.vx = 0;
    if(player.grounded) player.vy = -90;
    cfPlayFeedback(false);
    const meaning = c.meta && c.meta.de ? ` – ${safeHtml(c.meta.de)}` : "";
    showMessage(`Falsches Wort: <strong>${safeHtml(c.text)}</strong>${meaning}`, 1050);
  }

  function openSentenceTask(){
    if(paused || sentenceLocked || collectedCount() !== mission().tokens.length) return;
    paused = true;
    pauseClock();
    sentenceLocked = false;
    selectedTokenIds = [];
    $("sentenceTitle").textContent = mission().de;
    $("sentenceFeedback").textContent = "";
    $("sentenceOverlay").hidden = false;
    renderSentenceBuilder();
  }

  function tokenById(id){
    return currentCollectibles.find(c => c.id === id);
  }

  function renderSentenceBuilder(){
    const built = $("builtSentence");
    built.innerHTML = "";
    selectedTokenIds.forEach(id => {
      const token = tokenById(id);
      if(!token) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "jumpBuiltToken";
      btn.textContent = token.text;
      btn.disabled = sentenceLocked;
      btn.addEventListener("click", () => {
        if(sentenceLocked) return;
        selectedTokenIds = selectedTokenIds.filter(v => v !== id);
        renderSentenceBuilder();
      });
      built.appendChild(btn);
    });
    $("sentencePlaceholder").hidden = selectedTokenIds.length > 0;

    const bank = $("wordBank");
    bank.innerHTML = "";
    const correctTokens = currentCollectibles.filter(c => c.kind === "correct");
    const unselected = correctTokens.filter(c => !selectedTokenIds.includes(c.id));
    const display = selectedTokenIds.length === 0 ? shuffleCopy(unselected) : unselected;
    display.forEach(token => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "jumpWordToken";
      btn.textContent = token.text;
      btn.disabled = sentenceLocked;
      btn.addEventListener("click", () => {
        if(sentenceLocked) return;
        selectedTokenIds.push(token.id);
        $("sentenceFeedback").textContent = "";
        renderSentenceBuilder();
      });
      bank.appendChild(btn);
    });
  }

  function resetSentenceOrder(){
    if(sentenceLocked) return;
    selectedTokenIds = [];
    $("sentenceFeedback").textContent = "";
    renderSentenceBuilder();
  }

  function checkSentence(){
    if(sentenceLocked) return;
    const target = mission().tokens;
    if(selectedTokenIds.length !== target.length){
      $("sentenceFeedback").textContent = "Setze zuerst alle gesammelten Wörter in die Sprechblase.";
      return;
    }
    const selected = selectedTokenIds.map(id => tokenById(id)?.text || "");
    const correct = selected.every((text, i) => text === target[i]);
    if(!correct){
      $("sentenceFeedback").textContent = "Noch nicht richtig. Tippe Wörter in der Sprechblase an, um sie zurückzulegen.";
      const bubble = document.querySelector(".jumpSpeechBubbleSu");
      bubble.classList.remove("shake");
      void bubble.offsetWidth;
      bubble.classList.add("shake");
      cfPlayFeedback(false);
      return;
    }

    sentenceLocked = true;
    $("sentenceFeedback").textContent = mission().zh;
    document.querySelector(".jumpSpeechBubbleSu").classList.add("correct");
    cfPlayFeedback(true);
    cfSpeakZh(mission().zh, {rate:0.78});
    renderSentenceBuilder();
    setTimeout(() => {
      $("sentenceOverlay").hidden = true;
      document.querySelector(".jumpSpeechBubbleSu").classList.remove("correct");
      showReplyOrAdvance();
    }, 1050);
  }

  function showReplyOrAdvance(){
    const reply = mission().replyZh;
    if(reply){
      $("replyBubble").textContent = reply;
      $("replyContinueBtn").textContent = currentMission === missions.length - 1 ? "Zur U-Bahn" : "Weiter";
      $("replyOverlay").hidden = false;
      cfSpeakZh(reply, {rate:0.78});
    }else{
      setTimeout(advanceMission, 350);
    }
  }

  function advanceMission(){
    $("replyOverlay").hidden = true;
    sentenceLocked = false;
    if(currentMission >= missions.length - 1){
      subwayUnlocked = true;
      $("testSentenceBtn").hidden = true;
      paused = false;
      resumeClock();
      currentCollectibles = [];
      collectedTokenIds = new Set();
      selectedTokenIds = [];
      showMessage("Die U-Bahn ist gefunden – laufe jetzt zum Eingang! →", 2600);
      updateHud();
      return;
    }
    currentMission++;
    currentCollectibles = createMissionCollectibles(currentMission);
    collectedTokenIds = new Set();
    selectedTokenIds = [];
    placePlayerAtLinYue();
    showMissionIntro();
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
    $("finishText").textContent = testMode
      ? `Du hast alle ${missions.length} Sätze gebildet und die U-Bahn in ${formatTime(result)} erreicht. Im Testmodus wird nichts gespeichert.`
      : `Du hast alle ${missions.length} Sätze gebildet und die U-Bahn in ${formatTime(result)} erreicht.${isBest ? " Neue Bestzeit!" : ""}`;
    $("finishOverlay").hidden = false;
    cfPlayFeedback(true);
    if(typeof cfCelebrateDone === "function") cfCelebrateDone();
  }

  function requestJump(){
    if(!started || paused || finished || performance.now() < player.stunnedUntil) return;
    input.jumpQueue = Math.min(2, input.jumpQueue + 1);
  }


  function testOpenSentenceTask(){
    if(!testMode || paused || finished || subwayUnlocked) return;
    currentCollectibles.filter(c => c.kind === "correct").forEach(c => {
      c.active = false;
      collectedTokenIds.add(c.id);
    });
    placePlayerAtLinYue();
    updateHud();
    openSentenceTask();
  }

  function update(dt, now){
    particles.forEach(p => {
      p.life -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 420 * dt;
    });
    for(let i = particles.length - 1; i >= 0; i--){
      if(particles[i].life <= 0) particles.splice(i,1);
    }

    if(!started || paused || finished) return;

    const stunned = now < player.stunnedUntil;
    let direction = 0;
    if(!stunned){
      if(input.left) direction -= 1;
      if(input.right) direction += 1;
    }
    player.vx = direction * RUN_SPEED;
    if(direction) player.facing = direction;

    if(input.jumpQueue > 0 && !stunned){
      if(player.grounded){
        player.vy = -JUMP_SPEED;
        player.grounded = false;
        player.jumpsLeft = 1;
        input.jumpQueue--;
      }else if(player.jumpsLeft > 0){
        player.vy = -DOUBLE_JUMP_SPEED;
        player.jumpsLeft--;
        input.jumpQueue--;
        spawnBurst(player.x + player.w/2, player.y + player.h, true);
      }else{
        input.jumpQueue = 0;
      }
    }else if(stunned){
      input.jumpQueue = 0;
    }

    const oldX = player.x;
    player.x += player.vx * dt;
    player.x = Math.max(0, Math.min(WORLD_W - player.w, player.x));

    if(!subwayUnlocked){
      const barrierX = SUBWAY_X - 18;
      if(player.x + player.w > barrierX && oldX + player.w <= barrierX + 8){
        player.x = barrierX - player.w;
        player.vx = 0;
        showMessage("Erst Lin Yue fragen, wo die U-Bahn ist.", 1200);
      }
    }

    const previousBottom = player.y + player.h;
    player.vy += GRAVITY * dt;
    player.y += player.vy * dt;
    player.grounded = false;

    for(const p of platforms){
      const horizontal = player.x + player.w > p.x + 4 && player.x < p.x + p.w - 4;
      const currentBottom = player.y + player.h;
      if(horizontal && player.vy >= 0 && previousBottom <= p.y + 7 && currentBottom >= p.y){
        player.y = p.y - player.h;
        player.vy = 0;
        player.grounded = true;
        player.jumpsLeft = 2;
      }
    }

    if(player.y > VIEW_H + 125){
      resetCurrentMission("water");
      return;
    }

    for(const c of currentCollectibles){
      if(!c.active || !intersects(player, c)) continue;
      if(c.kind === "correct") collectCorrect(c);
      else hitDecoy(c);
    }

    if(!subwayUnlocked && collectedCount() === mission().tokens.length){
      const playerCenter = player.x + player.w/2;
      if(Math.abs(playerCenter - LINYUE_X) < 86){
        openSentenceTask();
      }
    }

    if(subwayUnlocked && player.x + player.w > SUBWAY_X + 88){
      completeGame();
    }

    cameraX = Math.max(0, Math.min(WORLD_W - VIEW_W, player.x - 360));
    updateHud();
  }

  function hexToRgb(hex){
    const h = String(hex || "#03172B").replace("#","").padEnd(6,"0").slice(0,6);
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
  function roundedRect(x,y,w,h,r){
    const radius = Math.min(r,w/2,h/2);
    ctx.beginPath();
    ctx.moveTo(x+radius,y);
    ctx.arcTo(x+w,y,x+w,y+h,radius);
    ctx.arcTo(x+w,y+h,x,y+h,radius);
    ctx.arcTo(x,y+h,x,y,radius);
    ctx.arcTo(x,y,x+w,y,radius);
    ctx.closePath();
  }

  function drawBackground(){
    const accent = topic.accent || "#03172B";
    const sky = ctx.createLinearGradient(0,0,0,VIEW_H);
    sky.addColorStop(0,mix(accent,0.34));
    sky.addColorStop(0.68,mix(accent,0.72));
    sky.addColorStop(1,"#f5e7d7");
    ctx.fillStyle = sky;
    ctx.fillRect(0,0,VIEW_W,VIEW_H);

    ctx.fillStyle = "rgba(255,245,210,.76)";
    ctx.beginPath();
    ctx.arc(800,88,43,0,Math.PI*2);
    ctx.fill();

    const par = cameraX * 0.15;
    ctx.fillStyle = rgba(accent,0.22);
    ctx.beginPath();
    ctx.moveTo(-250-par,370);
    for(let x=-250;x<1500;x+=240){
      ctx.lineTo(x-par+120,210+((Math.abs(x/240)%2)*38));
      ctx.lineTo(x-par+240,370);
    }
    ctx.lineTo(1400,540);
    ctx.lineTo(-300,540);
    ctx.closePath();
    ctx.fill();

    const cityOffset = -(cameraX * 0.30) % 460;
    ctx.fillStyle = rgba(accent,0.27);
    for(let x=cityOffset-100;x<VIEW_W+120;x+=115){
      const h = 58 + (Math.abs(Math.round(x/115)) % 4) * 18;
      ctx.fillRect(x,GROUND_Y-h,78,h);
      ctx.fillRect(x+22,GROUND_Y-h-13,34,13);
    }
  }

  function drawWorld(){
    const accent = topic.accent || "#03172B";
    ctx.save();
    ctx.translate(-cameraX,0);

    ctx.fillStyle = "rgba(55,137,177,.65)";
    ctx.fillRect(0,GROUND_Y+14,WORLD_W,VIEW_H-GROUND_Y);
    ctx.strokeStyle = "rgba(255,255,255,.44)";
    ctx.lineWidth = 3;
    for(let x=0;x<WORLD_W;x+=58){
      ctx.beginPath();
      ctx.arc(x,GROUND_Y+24,23,Math.PI,0);
      ctx.stroke();
    }

    for(const p of platforms){
      ctx.fillStyle = p.ground ? mix(accent,-0.08) : mix(accent,0.17);
      roundedRect(p.x,p.y,p.w,p.h,p.ground?10:12);
      ctx.fill();
      ctx.fillStyle = p.ground ? "rgba(214,188,162,.93)" : "rgba(246,227,229,.82)";
      roundedRect(p.x,p.y,p.w,Math.min(10,p.h),8);
      ctx.fill();
    }

    drawStationSigns();
    drawLinYue();
    drawCollectibles();
    drawSubway();
    drawParticles();
    drawPlayer();
    ctx.restore();
  }

  function drawStationSigns(){
    ctx.fillStyle = "rgba(255,255,255,.92)";
    roundedRect(65,365,230,58,12);
    ctx.fill();
    ctx.fillStyle = "#10263b";
    ctx.font = "800 22px system-ui,sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("北京南站 · Bahnhof",180,394);

    ctx.fillStyle = "#19344e";
    ctx.fillRect(3240,335,16,135);
    ctx.fillStyle = "rgba(255,255,255,.94)";
    roundedRect(3145,318,210,58,12);
    ctx.fill();
    ctx.fillStyle = "#10263b";
    ctx.font = "850 22px system-ui,sans-serif";
    ctx.fillText("地铁  →  U-Bahn",3250,347);
  }

  function drawLinYue(){
    const x = LINYUE_X - 23;
    const y = GROUND_Y - 72;
    ctx.fillStyle = "#f6e3e5";
    roundedRect(x+5,y+28,36,44,10);
    ctx.fill();
    ctx.fillStyle = "#7a3142";
    ctx.fillRect(x+8,y+62,10,10);
    ctx.fillRect(x+28,y+62,10,10);

    ctx.save();
    ctx.beginPath();
    ctx.arc(x+23,y+18,19,0,Math.PI*2);
    ctx.clip();
    if(avatarLin.complete && avatarLin.naturalWidth) ctx.drawImage(avatarLin,x+4,y-1,38,38);
    else {ctx.fillStyle="#edc2a4";ctx.fillRect(x+4,y-1,38,38);}
    ctx.restore();
    ctx.strokeStyle = "rgba(255,255,255,.95)";
    ctx.lineWidth = 3;
    ctx.beginPath();ctx.arc(x+23,y+18,19,0,Math.PI*2);ctx.stroke();

    ctx.fillStyle = "rgba(255,255,255,.94)";
    roundedRect(LINYUE_X-70,y-52,140,38,12);
    ctx.fill();
    ctx.fillStyle = "#10263b";
    ctx.font = "800 17px system-ui,sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const label = subwayUnlocked ? "一路平安！" : (collectedCount() === mission().tokens.length ? "Komm zu mir!" : "林月 · Lin Yue");
    ctx.fillText(label,LINYUE_X,y-33);
  }

  function drawCollectibles(){
    for(const c of currentCollectibles){
      if(!c.active) continue;
      ctx.shadowColor = "rgba(255,215,90,.72)";
      ctx.shadowBlur = 16;
      ctx.fillStyle = "rgba(255,251,230,.97)";
      roundedRect(c.x,c.y,c.w,c.h,18);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(180,128,35,.82)";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = "#1e2a34";
      const len = Array.from(c.text).length;
      const size = len > 5 ? 17 : len > 3 ? 20 : 27;
      ctx.font = `850 ${size}px "Microsoft YaHei","Noto Sans SC",sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(c.text,c.x+c.w/2,c.y+c.h/2+1,c.w-12);
    }
  }

  function drawSubway(){
    const x = SUBWAY_X;
    ctx.fillStyle = "#24384a";
    ctx.fillRect(x-42,280,170,190);
    ctx.fillStyle = "#e7ceba";
    ctx.fillRect(x-24,305,134,165);
    ctx.fillStyle = "#9d2431";
    ctx.beginPath();
    ctx.arc(x+43,330,31,0,Math.PI*2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "900 35px system-ui,sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("M",x+43,330);
    ctx.fillStyle = "#10263b";
    ctx.font = "800 21px system-ui,sans-serif";
    ctx.fillText("地铁入口",x+43,386);

    if(!subwayUnlocked){
      ctx.fillStyle = "rgba(130,55,40,.96)";
      ctx.fillRect(x-18,408,122,18);
      ctx.fillRect(x-12,395,12,75);
      ctx.fillRect(x+86,395,12,75);
      ctx.fillStyle = "rgba(255,255,255,.95)";
      roundedRect(x-6,360,96,34,10);
      ctx.fill();
      ctx.fillStyle = "#7a2630";
      ctx.font = "800 15px system-ui,sans-serif";
      ctx.fillText("noch geschlossen",x+42,377);
    }else{
      ctx.fillStyle = "rgba(34,197,94,.88)";
      roundedRect(x-3,360,92,34,10);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "850 17px system-ui,sans-serif";
      ctx.fillText("OFFEN",x+43,377);
    }
  }

  function drawParticles(){
    for(const p of particles){
      const alpha = Math.max(0,p.life/p.maxLife);
      ctx.fillStyle = p.good ? `rgba(248,190,60,${alpha})` : `rgba(190,65,75,${alpha})`;
      ctx.beginPath();
      ctx.arc(p.x,p.y,4+alpha*3,0,Math.PI*2);
      ctx.fill();
    }
  }

  function drawPlayer(){
    const x = player.x;
    const y = player.y;
    const stunned = performance.now() < player.stunnedUntil;
    ctx.save();
    if(stunned){
      ctx.translate(x+player.w/2,y+player.h/2);
      ctx.rotate(player.facing * Math.PI/2.6);
      ctx.translate(-(x+player.w/2),-(y+player.h/2));
    }

    ctx.fillStyle = "#31485e";
    roundedRect(x+5,y+28,player.w-10,player.h-28,10);
    ctx.fill();

    const walk = player.grounded && Math.abs(player.vx) > 5 && !stunned;
    const phase = Math.sin(performance.now()/80) * (walk ? 6 : 0);
    ctx.strokeStyle = "#1e2a34";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x+16,y+player.h-10);
    ctx.lineTo(x+15+phase,y+player.h+1);
    ctx.moveTo(x+player.w-16,y+player.h-10);
    ctx.lineTo(x+player.w-15-phase,y+player.h+1);
    ctx.stroke();

    ctx.save();
    ctx.beginPath();
    ctx.arc(x+player.w/2,y+19,19,0,Math.PI*2);
    ctx.clip();
    if(avatarSu.complete && avatarSu.naturalWidth) ctx.drawImage(avatarSu,x+3,y,38,38);
    else {ctx.fillStyle="#efc3a4";ctx.fillRect(x+3,y,38,38);}
    ctx.restore();
    ctx.strokeStyle = "rgba(255,255,255,.94)";
    ctx.lineWidth = 3;
    ctx.beginPath();ctx.arc(x+player.w/2,y+19,19,0,Math.PI*2);ctx.stroke();
    ctx.restore();
  }

  function draw(){
    ctx.clearRect(0,0,VIEW_W,VIEW_H);
    drawBackground();
    drawWorld();
  }

  function frame(now){
    const dt = Math.min(0.033,Math.max(0,(now-lastFrame)/1000));
    lastFrame = now;
    update(dt,now);
    draw();
    requestAnimationFrame(frame);
  }

  function setControl(name,active){
    if(name === "jump"){
      if(active) requestJump();
      return;
    }
    input[name] = active;
  }

  window.addEventListener("keydown", e => {
    if(["ArrowLeft","ArrowRight","ArrowUp"," ","Spacebar","a","A","d","D","w","W"].includes(e.key)) e.preventDefault();
    if(e.key === "ArrowLeft" || e.key === "a" || e.key === "A") input.left = true;
    if(e.key === "ArrowRight" || e.key === "d" || e.key === "D") input.right = true;
    if(!e.repeat && (e.key === "ArrowUp" || e.key === " " || e.key === "Spacebar" || e.key === "w" || e.key === "W")) requestJump();
  }, {passive:false});
  window.addEventListener("keyup", e => {
    if(e.key === "ArrowLeft" || e.key === "a" || e.key === "A") input.left = false;
    if(e.key === "ArrowRight" || e.key === "d" || e.key === "D") input.right = false;
  });
  window.addEventListener("blur", () => {
    input.left = false;
    input.right = false;
  });

  const activePointers = new Map();
  document.querySelectorAll("[data-control]").forEach(btn => {
    const name = btn.dataset.control;
    const down = e => {
      e.preventDefault();
      e.stopPropagation();
      activePointers.set(e.pointerId,name);
      try{ btn.setPointerCapture(e.pointerId); }catch(err){}
      btn.classList.add("active");
      setControl(name,true);
    };
    const up = e => {
      e.preventDefault();
      e.stopPropagation();
      const stored = activePointers.get(e.pointerId) || name;
      activePointers.delete(e.pointerId);
      btn.classList.remove("active");
      setControl(stored,false);
    };
    btn.addEventListener("pointerdown",down,{passive:false});
    btn.addEventListener("pointerup",up,{passive:false});
    btn.addEventListener("pointercancel",up,{passive:false});
    btn.addEventListener("lostpointercapture",up,{passive:false});
    btn.addEventListener("contextmenu",e => e.preventDefault());
  });

  function updateFullscreenButton(){
    const active = Boolean(document.fullscreenElement) || pseudoFullscreen;
    $("fullscreenBtn").textContent = active ? "✕ Vollbild" : "⛶ Vollbild";
    $("fullscreenBtn").setAttribute("aria-label", active ? "Vollbild verlassen" : "Vollbild einschalten");
  }
  function setPseudoFullscreen(active){
    pseudoFullscreen = active;
    $("jumpViewport").classList.toggle("jumpPseudoFullscreen",active);
    document.body.classList.toggle("jumpNoScroll",active);
    updateFullscreenButton();
  }
  async function toggleFullscreen(){
    const viewport = $("jumpViewport");
    if(document.fullscreenElement){
      try{ await document.exitFullscreen(); }catch(err){}
      return;
    }
    if(pseudoFullscreen){
      setPseudoFullscreen(false);
      return;
    }
    try{
      if(viewport.requestFullscreen){
        await viewport.requestFullscreen({navigationUI:"hide"});
        if(screen.orientation && screen.orientation.lock){
          try{ await screen.orientation.lock("landscape"); }catch(err){}
        }
      }else{
        setPseudoFullscreen(true);
      }
    }catch(err){
      setPseudoFullscreen(true);
    }
  }
  document.addEventListener("fullscreenchange",() => {
    if(!document.fullscreenElement && !pseudoFullscreen){
      document.body.classList.remove("jumpNoScroll");
    }
    updateFullscreenButton();
  });

  $("startBtn").addEventListener("click",startGame);
  $("missionStartBtn").addEventListener("click",beginMissionSearch);
  $("sentenceResetBtn").addEventListener("click",resetSentenceOrder);
  $("sentenceCheckBtn").addEventListener("click",checkSentence);
  $("replyContinueBtn").addEventListener("click",advanceMission);
  $("restartBtn").addEventListener("click",() => resetGame(false));
  $("playAgainBtn").addEventListener("click",() => resetGame(false));
  $("fullscreenBtn").addEventListener("click",toggleFullscreen);
  $("testSentenceBtn").addEventListener("click",testOpenSentenceTask);

  resetGame(true);
  updateFullscreenButton();
  requestAnimationFrame(frame);
})();
