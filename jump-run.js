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
  const BASE_VIEW_W = 960;
  const BASE_VIEW_H = 540;
  let VIEW_W = BASE_VIEW_W;
  let VIEW_H = BASE_VIEW_H;
  let sceneYOffset = 0;
  const WORLD_W = 3600;
  const GROUND_Y = 470;
  const BASE_ASPECT = BASE_VIEW_W / BASE_VIEW_H;
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
      // Dieser Text liegt als zwei getrennte ElevenLabs-Dateien vor.
      // Deshalb werden beide Teile nacheinander abgespielt.
      audioParts: ["没事，谢谢。", "我看手机了。"],
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
      replyZh: "地铁在那儿。",
      closingZh: "谢谢！"
    }
  ];

  // Die Spielphysik bleibt bestehen, die Welt wird aber als Bahnhof gezeichnet.
  // Der Boden ist nun durchgehend; die früheren Wasserlücken sind nasse,
  // frisch gewischte Stellen, die übersprungen werden müssen.
  const platforms = [
    {x: 0, y: GROUND_Y, w: WORLD_W, h: 70, ground: true, type: "station-floor"},
    // Einheitliche, von unten durchlässige Bahnhofsebenen. Die Unterkante liegt
    // hoch genug, damit Su Ran sichtbar darunter durchlaufen kann.
    {x: 250, y: 350, w: 220, h: 22, type: "station-platform"},
    {x: 810, y: 300, w: 220, h: 22, type: "station-platform"},
    {x: 1090, y: 350, w: 180, h: 22, type: "station-platform"},
    {x: 1710, y: 320, w: 235, h: 22, type: "station-platform"},
    {x: 2180, y: 290, w: 250, h: 22, type: "station-platform"},
    {x: 2540, y: 350, w: 180, h: 22, type: "station-platform"},
    {x: 2990, y: 320, w: 210, h: 22, type: "station-platform"}
  ];

  const wetHazards = [
    {x: 650, w: 110},
    // Rund um Lin Yue und den Startpunkt bleibt bewusst eine sichere Fläche.
    {x: 1780, w: 120},
    {x: 2440, w: 120},
    {x: 3060, w: 120}
  ];

  // Richtige Wörter dürfen auch auf Plattformen liegen. Falsche Wörter stehen
  // bewusst auf ebener Strecke und mit viel Abstand, damit ein normaler Sprung
  // auf Handy und Tablet genügt. So bleibt der Doppelsprung eine Hilfe, aber
  // keine zwingende Voraussetzung.
  const missionCorrectSpots = [
    [
      {x:820,y:400},{x:2280,y:400}
    ],
    [
      {x:260,y:400},{x:860,y:265},{x:1240,y:400},{x:1710,y:275},{x:2250,y:250},{x:3020,y:280}
    ],
    [
      {x:390,y:290},{x:900,y:265},{x:1800,y:275},{x:2600,y:310}
    ],
    [
      {x:230,y:400},{x:820,y:265},{x:1900,y:400},{x:3070,y:280}
    ],
    [
      {x:920,y:265},{x:1830,y:275},{x:2580,y:310},{x:3290,y:400}
    ]
  ];

  const missionDecoySpots = [
    [
      {x:1050,y:400},{x:1730,y:400},{x:2570,y:400}
    ],
    [
      {x:500,y:400},{x:1080,y:400},{x:1940,y:400},{x:2660,y:400}
    ],
    [
      {x:610,y:400},{x:1190,y:400},{x:2250,y:400},{x:3020,y:400}
    ],
    [
      {x:470,y:400},{x:1180,y:400},{x:2230,y:400},{x:2650,y:400}
    ],
    [
      {x:1240,y:400},{x:2200,y:400},{x:2910,y:400},{x:3130,y:400}
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
  function createMixedBankOrder(tokens){
    if(tokens.length <= 1) return tokens.map(t => t.id);
    if(tokens.length === 2) return [tokens[1].id, tokens[0].id];

    const targetIndex = new Map(tokens.map((token, index) => [token.id, index]));
    const score = order => {
      let samePosition = 0;
      let correctNeighbours = 0;
      for(let i = 0; i < order.length; i++){
        if(targetIndex.get(order[i].id) === i) samePosition++;
        if(i > 0 && targetIndex.get(order[i].id) === targetIndex.get(order[i - 1].id) + 1){
          correctNeighbours++;
        }
      }
      // Eine niedrige Punktzahl bedeutet: deutlich von der richtigen Reihenfolge entfernt.
      return samePosition * 12 + correctNeighbours * 6 + (targetIndex.get(order[0].id) === 0 ? 4 : 0);
    };

    let best = shuffleCopy(tokens);
    let bestScore = score(best);
    for(let attempt = 0; attempt < 80; attempt++){
      const candidate = shuffleCopy(tokens);
      const candidateScore = score(candidate);
      if(candidateScore < bestScore){
        best = candidate;
        bestScore = candidateScore;
        if(bestScore === 0) break;
      }
    }
    return best.map(t => t.id);
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
  let sentenceBankOrder = [];
  let stumbleCount = 0;
  let waterCount = 0;
  let sentenceMistakeMissions = new Set();
  let subwayUnlocked = false;
  let cameraX = Math.max(0, LINYUE_X - 420);
  let startTime = 0;
  let pausedAt = 0;
  let pausedTotal = 0;
  let lastFrame = performance.now();
  let messageTimer = 0;
  let sentenceLocked = false;
  let pseudoFullscreen = false;
  let sceneMode = "";
  let confettiTimer = 0;
  let conversationPending = false;
  let slipping = false;
  let slipResetAt = 0;
  let slipDirection = 1;
  let slipHazard = null;

  // Ganzkörper-Sprites im neuen Chibi-/Anime-Design. Die bisherigen Avatare
  // bleiben als Fallback erhalten, falls ein Bild noch nicht hochgeladen wurde.
  const suRanSprite = new Image();
  suRanSprite.decoding = "async";
  suRanSprite.src = "suran-game.png";
  const linYueSprite = new Image();
  linYueSprite.decoding = "async";
  linYueSprite.src = "linyue-game.png";

  const avatarSu = new Image();
  avatarSu.src = "avatars/suran.jpg";
  const avatarLin = new Image();
  avatarLin.src = "avatars/linyue.jpg";

  function bestKey(){ return `cf_jump_best_v2_${topic.id}`; }
  function doneKey(){ return `cf_jump_done_v2_${topic.id}`; }
  function checkpointKey(){ return `cf_jump_checkpoint_v2_${topic.id}_${testMode ? "test" : "normal"}`; }
  function clearCheckpoint(){
    try{ sessionStorage.removeItem(checkpointKey()); }catch(_err){}
  }
  function saveCheckpoint(){
    try{
      sessionStorage.setItem(checkpointKey(), JSON.stringify({
        currentMission,
        subwayUnlocked,
        stumbleCount,
        waterCount,
        sentenceMistakeMissions: Array.from(sentenceMistakeMissions),
        elapsedMs: elapsed(),
        savedAt: Date.now()
      }));
    }catch(_err){}
  }
  function readCheckpoint(){
    try{
      const raw = sessionStorage.getItem(checkpointKey());
      if(!raw) return null;
      const state = JSON.parse(raw);
      if(!state || !Number.isInteger(state.currentMission)) return null;
      if(state.currentMission < 0 || state.currentMission >= missions.length) return null;
      return {
        currentMission: state.currentMission,
        subwayUnlocked: Boolean(state.subwayUnlocked),
        stumbleCount: Math.max(0, Number(state.stumbleCount) || 0),
        waterCount: Math.max(0, Number(state.waterCount) || 0),
        sentenceMistakeMissions: Array.isArray(state.sentenceMistakeMissions)
          ? state.sentenceMistakeMissions.filter(v => Number.isInteger(v) && v >= 0 && v < missions.length)
          : [],
        elapsedMs: Math.max(0, Number(state.elapsedMs) || 0)
      };
    }catch(_err){
      return null;
    }
  }
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
    input.left = false;
    input.right = false;
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


  function worldToScreen(x, y){
    return {x: x - cameraX, y};
  }

  function clamp(value, min, max){ return Math.max(min, Math.min(max, value)); }

  function setSceneBubbleHtml(id, html){
    const el = $(id);
    if(!el) return;
    el.innerHTML = html;
  }

  function showSceneBubble(id, show = true){
    const el = $(id);
    if(el) el.hidden = !show;
  }

  function updateScenePositions(){
    if($("sceneOverlay").hidden) return;
    const viewportRect = $("jumpViewport").getBoundingClientRect();
    const scale = Math.min(viewportRect.width / VIEW_W, viewportRect.height / VIEW_H);
    const contentW = VIEW_W * scale;
    const contentH = VIEW_H * scale;
    const contentOffsetX = (viewportRect.width - contentW) / 2;
    const contentOffsetY = (viewportRect.height - contentH) / 2;

    const su = $("sceneSuBubble");
    const lin = $("sceneLinBubble");
    const suPos = worldToScreen(player.x + player.w/2, player.y - 48 + sceneYOffset);
    const linPos = worldToScreen(LINYUE_X, GROUND_Y - 132 + sceneYOffset);
    const marginX = 12;
    const minTop = 8;
    const maxTop = viewportRect.height - 180;
    const gap = 14;

    function bubbleRect(el, anchorX, anchorY, side){
      const w = el.offsetWidth || 220;
      const h = el.offsetHeight || 86;
      let x = side === "right"
        ? anchorX - 22 * scale
        : anchorX - w + 40 * scale;
      let y = anchorY - 136 * scale;
      x = clamp(x, marginX, viewportRect.width - w - marginX);
      y = clamp(y, minTop, maxTop);
      return {x, y, w, h};
    }
    function overlaps(a, b){
      return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    }
    function applyRect(el, rect){
      el.style.left = `${Math.round(rect.x)}px`;
      el.style.top = `${Math.round(rect.y)}px`;
    }

    let suRect = null;
    let linRect = null;

    if(su && !su.hidden){
      const suAnchorX = contentOffsetX + suPos.x * scale;
      const suAnchorY = contentOffsetY + suPos.y * scale;
      suRect = bubbleRect(su, suAnchorX, suAnchorY, "left");
    }
    if(lin && !lin.hidden){
      const linAnchorX = contentOffsetX + linPos.x * scale;
      const linAnchorY = contentOffsetY + linPos.y * scale;
      // Standard: Lin Yues Blase rechts von ihrer Figur.
      // Wenn Su Ran rechts von ihr steht, wird ihre Blase nach links verlagert.
      const side = suPos.x >= linPos.x ? "left" : "right";
      linRect = bubbleRect(lin, linAnchorX, linAnchorY, side);
    }

    if(suRect && linRect && overlaps(suRect, linRect)){
      if(suPos.x >= linPos.x){
        suRect.y = clamp(Math.min(suRect.y, linRect.y - suRect.h - gap), minTop, maxTop);
        if(overlaps(suRect, linRect)){
          linRect.y = clamp(suRect.y + suRect.h + gap, minTop, maxTop);
        }
      }else{
        linRect.y = clamp(Math.min(linRect.y, suRect.y - linRect.h - gap), minTop, maxTop);
        if(overlaps(suRect, linRect)){
          suRect.y = clamp(linRect.y + linRect.h + gap, minTop, maxTop);
        }
      }
      if(overlaps(suRect, linRect)){
        const verticalRoomAbove = Math.max(suRect.y, linRect.y) - minTop;
        if(verticalRoomAbove > suRect.h + gap){
          suRect.y = clamp(Math.min(suRect.y, linRect.y - suRect.h - gap), minTop, maxTop);
        }else{
          linRect.y = clamp(Math.max(linRect.y, suRect.y + suRect.h + gap), minTop, maxTop);
        }
      }
    }

    if(su && suRect) applyRect(su, suRect);
    if(lin && linRect) applyRect(lin, linRect);
  }

  function syncCanvasAspect(){
    const viewport = $("jumpViewport");
    if(!viewport) return;
    const rect = viewport.getBoundingClientRect();
    if(rect.width < 1 || rect.height < 1) return;

    const actualAspect = rect.width / rect.height;
    VIEW_W = BASE_VIEW_W;
    VIEW_H = actualAspect < BASE_ASPECT
      ? Math.round(BASE_VIEW_W / actualAspect)
      : BASE_VIEW_H;
    sceneYOffset = Math.max(0, (VIEW_H - BASE_VIEW_H) / 2);

    if(canvas.width !== VIEW_W) canvas.width = VIEW_W;
    if(canvas.height !== VIEW_H) canvas.height = VIEW_H;
    cameraX = Math.max(0, Math.min(WORLD_W - VIEW_W, cameraX));
    updateScenePositions();
  }

  function hideSceneOverlay(){
    $("sceneOverlay").hidden = true;
    $("sentenceTray").hidden = true;
    showSceneBubble("sceneSuBubble", false);
    showSceneBubble("sceneLinBubble", false);
    sceneMode = "";
  }

  function renderSuBuiltSentence(){
    const body = $("builtSentenceArea");
    if(!body) return;
    body.innerHTML = "";
    const built = document.createElement("div");
    built.className = "jumpBuiltSentence";
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
    if(selectedTokenIds.length){
      body.appendChild(built);
    }
  }

  function showSceneBuilder(){
    $("sceneOverlay").hidden = false;
    $("sentenceTray").hidden = false;
    showSceneBubble("sceneSuBubble", false);
    showSceneBubble("sceneLinBubble", false);
    sceneMode = "build";
    updateScenePositions();
  }

  function showSuSpeechBubble(text){
    $("sceneOverlay").hidden = false;
    $("sentenceTray").hidden = true;
    setSceneBubbleHtml("sceneSuBubbleBody", safeHtml(text));
    showSceneBubble("sceneSuBubble", true);
    showSceneBubble("sceneLinBubble", false);
    sceneMode = "suSpeak";
    updateScenePositions();
  }

  function showLinSpeechBubble(text){
    $("sceneOverlay").hidden = false;
    $("sentenceTray").hidden = true;
    showSceneBubble("sceneSuBubble", true);
    setSceneBubbleHtml("sceneLinBubbleBody", safeHtml(text));
    showSceneBubble("sceneLinBubble", true);
    sceneMode = "linReply";
    updateScenePositions();
  }

  function clearConfetti(){
    clearTimeout(confettiTimer);
    const layer = $("confettiLayer");
    if(layer) layer.innerHTML = "";
  }

  function launchConfetti(){
    const layer = $("confettiLayer");
    if(!layer) return;
    layer.innerHTML = "";
    const colors = ["#f6d083","#d9a6af","#f1d8cc","#5b7086","#ebbc6a","#ffffff"];
    for(let i = 0; i < 72; i++){
      const piece = document.createElement("span");
      piece.className = "jumpConfetti";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[i % colors.length];
      piece.style.setProperty("--dx", `${(Math.random() * 220 - 110).toFixed(0)}px`);
      piece.style.setProperty("--rot", `${(Math.random() * 820 - 410).toFixed(0)}deg`);
      piece.style.animationDuration = `${2.8 + Math.random() * 1.8}s`;
      piece.style.animationDelay = `${Math.random() * 0.35}s`;
      layer.appendChild(piece);
    }
    confettiTimer = setTimeout(() => { layer.innerHTML = ""; }, 4600);
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
    const correctSpots = missionCorrectSpots[index];
    const decoySpots = missionDecoySpots[index];
    const tokenObjects = m.tokens.map((text, i) => ({
      id: `m${index}-t${i}`,
      text,
      kind: "correct",
      meta: vocabMap.get(text) || {zh:text, de:""},
      x: correctSpots[i % correctSpots.length].x,
      y: correctSpots[i % correctSpots.length].y
    }));
    const decoyObjects = m.decoys.map((text, i) => ({
      id: `m${index}-d${i}`,
      text,
      kind: "decoy",
      meta: vocabMap.get(text) || {zh:text, de:""},
      x: decoySpots[i % decoySpots.length].x,
      y: decoySpots[i % decoySpots.length].y
    }));
    return [...tokenObjects, ...decoyObjects].map(obj => ({
      ...obj,
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
    slipping = false;
    slipResetAt = 0;
    slipDirection = 1;
    slipHazard = null;
    cameraX = Math.max(0, Math.min(WORLD_W - VIEW_W, player.x - 330));
  }

  function resetCurrentMission(reason){
    collectedTokenIds = new Set();
    selectedTokenIds = [];
    sentenceBankOrder = [];
    currentCollectibles.forEach(c => { c.active = true; });
    conversationPending = false;
    placePlayerAtLinYue();
    if(reason === "slip" || reason === "water"){
      waterCount++;
      saveCheckpoint();
      showMessage("Ausgerutscht – die Wörter dieses Satzes sind wieder weg.", 1800);
    }
    updateHud();
  }

  function finishSlip(){
    const hazard = slipHazard;
    const direction = slipDirection || player.facing || 1;

    slipping = false;
    slipResetAt = 0;
    player.stunnedUntil = 0;

    // Nur die Wörter des aktuellen Satzes gehen verloren. Bereits gelöste
    // Sätze und Kontrollpunkte bleiben erhalten.
    collectedTokenIds = new Set();
    selectedTokenIds = [];
    sentenceBankOrder = [];
    currentCollectibles.forEach(c => { c.active = true; });
    conversationPending = false;

    // Su Ran rutscht in seiner bisherigen Laufrichtung vollständig über die
    // nasse Stelle. Dadurch bleibt er nicht in einer Endlosschleife hängen.
    if(hazard){
      if(direction > 0){
        player.x = hazard.x + hazard.w + 18;
      }else{
        player.x = hazard.x - player.w - 18;
      }
    }
    player.x = Math.max(0, Math.min(WORLD_W - player.w, player.x));
    player.y = GROUND_Y - PLAYER_H;
    player.vx = 0;
    player.vy = 0;
    player.grounded = true;
    player.jumpsLeft = 2;
    player.facing = direction;
    slipHazard = null;

    waterCount++;
    saveCheckpoint();
    showMessage("Ausgerutscht – die Wörter dieses Satzes sind wieder weg.", 1800);
    updateHud();
  }

  function resetGame(showStart){
    clearCheckpoint();
    clearConfetti();
    currentMission = 0;
    currentCollectibles = createMissionCollectibles(0);
    collectedTokenIds = new Set();
    selectedTokenIds = [];
    sentenceBankOrder = [];
    stumbleCount = 0;
    waterCount = 0;
    sentenceMistakeMissions = new Set();
    subwayUnlocked = false;
    finished = false;
    sentenceLocked = false;
    conversationPending = false;
    particles.length = 0;
    placePlayerAtLinYue();
    hideSceneOverlay();
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
      showMessage("Sammle die Wörter und kehre zu Lin Yue zurück.", 1500);
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
    hideSceneOverlay();
    showMessage("Sammle die Wörter und kehre zu Lin Yue zurück.", 1500);
  }

  function restoreCheckpoint(state){
    currentMission = state.currentMission;
    subwayUnlocked = state.subwayUnlocked;
    currentCollectibles = subwayUnlocked ? [] : createMissionCollectibles(currentMission);
    collectedTokenIds = new Set();
    selectedTokenIds = [];
    sentenceBankOrder = [];
    stumbleCount = state.stumbleCount;
    waterCount = state.waterCount;
    sentenceMistakeMissions = new Set(state.sentenceMistakeMissions);
    finished = false;
    sentenceLocked = false;
    conversationPending = false;
    particles.length = 0;
    placePlayerAtLinYue();
    hideSceneOverlay();
    $("finishOverlay").hidden = true;
    $("startOverlay").hidden = true;
    $("jumpMessage").hidden = true;
    started = true;
    pausedTotal = 0;
    pausedAt = 0;
    startTime = performance.now() - state.elapsedMs;

    if(subwayUnlocked){
      paused = false;
      showMessage("Fortgesetzt: Laufe jetzt zum U-Bahn-Eingang! →", 3000);
      updateHud();
    }else{
      paused = false;
      showMessage(`Fortgesetzt bei Satz ${currentMission + 1}.`, 1800);
    }
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
    cfSpeakZh(c.text, {rate:1.0});
    const meaning = c.meta && c.meta.de ? `<br>${safeHtml(c.meta.de)}` : "";
    showMessage(`<strong>${safeHtml(c.text)}</strong>${meaning}`, 1350);
    updateHud();
    if(collectedCount() === mission().tokens.length){
      setTimeout(() => showMessage("Alle Wörter gefunden – zurück zu Lin Yue!", 1700), 250);
    }
  }

  function hitDecoy(c){
    c.active = false;
    stumbleCount++;
    saveCheckpoint();
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
    conversationPending = false;
    paused = true;
    pauseClock();
    sentenceLocked = false;
    selectedTokenIds = [];
    const correctTokens = currentCollectibles.filter(c => c.kind === "correct");
    sentenceBankOrder = createMixedBankOrder(correctTokens);
    $("sentenceFeedback").textContent = "";
    showSceneBuilder();
    renderSentenceBuilder();
  }

  function tokenById(id){
    return currentCollectibles.find(c => c.id === id);
  }

  function renderSentenceBuilder(){
    renderSuBuiltSentence();

    const bank = $("wordBank");
    bank.innerHTML = "";
    const correctTokens = currentCollectibles.filter(c => c.kind === "correct");
    if(sentenceBankOrder.length !== correctTokens.length){
      sentenceBankOrder = createMixedBankOrder(correctTokens);
    }
    const display = sentenceBankOrder
      .map(id => tokenById(id))
      .filter(token => token && !selectedTokenIds.includes(token.id));
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
    if(!display.length){
      const checkBtn = document.createElement("button");
      checkBtn.type = "button";
      checkBtn.className = "primaryBtn jumpInlineCheckBtn";
      checkBtn.textContent = "Prüfen";
      checkBtn.disabled = sentenceLocked;
      checkBtn.addEventListener("click", checkSentence);
      bank.appendChild(checkBtn);
    }
    updateScenePositions();
  }

  function resetSentenceOrder(){
    if(sentenceLocked) return;
    selectedTokenIds = [];
    sentenceBankOrder = createMixedBankOrder(currentCollectibles.filter(c => c.kind === "correct"));
    $("sentenceFeedback").textContent = "";
    renderSentenceBuilder();
    updateScenePositions();
  }

  function speakZhParts(parts, options, done){
    const sequence = (Array.isArray(parts) ? parts : [parts]).filter(Boolean);
    let index = 0;
    const playNext = () => {
      if(index >= sequence.length){
        if(typeof done === "function") done();
        return;
      }
      cfSpeakZh(sequence[index++], {
        rate: options?.rate,
        speaker: options?.speaker,
        onend: playNext
      });
    };
    playNext();
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
      sentenceMistakeMissions.add(currentMission);
      saveCheckpoint();
      $("sentenceFeedback").textContent = "Noch nicht richtig. Tippe Wörter in der Sprechblase an, um sie zurückzulegen.";
      const bubble = $("sceneSuBubble");
      bubble.classList.remove("shake");
      void bubble.offsetWidth;
      bubble.classList.add("shake");
      cfPlayFeedback(false);
      return;
    }

    sentenceLocked = true;
    $("sentenceFeedback").textContent = "";
    cfPlayFeedback(true);
    showSuSpeechBubble(mission().zh);

    speakZhParts(mission().audioParts || [mission().zh], {
      rate:1.0,
      speaker:"suran"
    }, () => {
      setTimeout(() => {
        showReplyOrAdvance();
      }, 320);
    });
  }

  function showReplyOrAdvance(){
    const reply = mission().replyZh;
    const closing = mission().closingZh;

    const finishConversation = () => {
      if(!closing){
        setTimeout(advanceMission, 450);
        return;
      }
      setTimeout(() => {
        showSuSpeechBubble(closing);
        cfSpeakZh(closing, {
          rate:1.0,
          speaker:"suran",
          onend:() => { setTimeout(advanceMission, 450); }
        });
      }, 320);
    };

    if(reply){
      showLinSpeechBubble(reply);
      cfSpeakZh(reply, {
        rate:1.0,
        speaker:"linyue",
        onend:finishConversation
      });
    }else{
      finishConversation();
    }
  }

  function advanceMission(){
    hideSceneOverlay();
    sentenceLocked = false;
    conversationPending = false;
    if(currentMission >= missions.length - 1){
      subwayUnlocked = true;
      paused = false;
      resumeClock();
      currentCollectibles = [];
      collectedTokenIds = new Set();
      selectedTokenIds = [];
      sentenceBankOrder = [];
      saveCheckpoint();
      showMessage("Die U-Bahn ist gefunden – laufe jetzt zum Eingang! →", 2600);
      updateHud();
      return;
    }
    currentMission++;
    currentCollectibles = createMissionCollectibles(currentMission);
    collectedTokenIds = new Set();
    selectedTokenIds = [];
    sentenceBankOrder = [];
    placePlayerAtLinYue();
    saveCheckpoint();
    paused = false;
    resumeClock();
    showMessage("Neuer Satz – sammle die richtigen Wörter.", 1400);
    updateHud();
  }

  function completeGame(){
    if(finished) return;
    finished = true;
    clearCheckpoint();
    paused = true;
    pauseClock();
    const result = elapsed();
    const oldBest = getBest();
    const isBest = !testMode && (!oldBest || result < oldBest);
    const firstTryCount = missions.length - sentenceMistakeMissions.size;
    const perfectRoute = stumbleCount === 0 && waterCount === 0;
    const completelyFlawless = perfectRoute && firstTryCount === missions.length;
    if(!testMode){
      localStorage.setItem(doneKey(), "1");
      if(isBest) localStorage.setItem(bestKey(), String(Math.round(result)));
    }

    $("finishCard").classList.toggle("jumpPerfectFinish", perfectRoute);
    $("finishTitle").textContent = perfectRoute ? "Perfekter Lauf!" : "Level geschafft!";
    $("finishIcon").textContent = perfectRoute ? "✨🚇✨" : "🚇";
    $("perfectAward").hidden = !perfectRoute;
    $("perfectAward").textContent = completelyFlawless
      ? "Makellos: alle Sätze beim ersten Versuch – ohne Stolperer und Ausrutscher!"
      : "Sicher ans Ziel: ohne Stolperer und Ausrutscher!";
    $("finishText").textContent = testMode
      ? `Du hast die U-Bahn in ${formatTime(result)} erreicht. Im Testmodus wird nichts gespeichert.`
      : `Du hast die U-Bahn in ${formatTime(result)} erreicht.${isBest ? " Neue Bestzeit!" : ""}`;
    $("finishStats").innerHTML = `
      <div class="jumpFinishStat"><strong>${firstTryCount}/${missions.length}</strong><span>Sätze beim ersten Versuch</span></div>
      <div class="jumpFinishStat"><strong>${stumbleCount}</strong><span>Stolperer</span></div>
      <div class="jumpFinishStat"><strong>${waterCount}</strong><span>Ausrutscher</span></div>`;
    $("finishOverlay").hidden = false;
    launchConfetti();
    cfPlayFeedback(true);
    if(typeof cfCelebrateDone === "function"){
      cfCelebrateDone();
      if(perfectRoute) setTimeout(() => cfCelebrateDone(), 700);
    }
  }

  function requestJump(){
    if(!started || paused || finished || performance.now() < player.stunnedUntil) return;
    input.jumpQueue = Math.min(2, input.jumpQueue + 1);
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

    if(slipping && now >= slipResetAt){
      finishSlip();
      return;
    }

    const stunned = now < player.stunnedUntil;
    let direction = 0;
    if(slipping){
      direction = slipDirection;
      player.vx = slipDirection * 250;
    }else{
      if(!stunned && !conversationPending){
        if(input.left) direction -= 1;
        if(input.right) direction += 1;
      }
      player.vx = direction * RUN_SPEED;
    }
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
      // Einweg-Ebene: von unten und seitlich keine Kollision, Landung nur von oben.
      const horizontal = player.x + player.w > p.x + 4 && player.x < p.x + p.w - 4;
      const currentBottom = player.y + player.h;
      if(horizontal && player.vy >= 0 && previousBottom <= p.y + 7 && currentBottom >= p.y){
        player.y = p.y - player.h;
        player.vy = 0;
        player.grounded = true;
        player.jumpsLeft = 2;
      }
    }

    if(!slipping && player.grounded && player.y + player.h >= GROUND_Y - 2){
      const feetLeft = player.x + 9;
      const feetRight = player.x + player.w - 9;
      const wet = wetHazards.find(h => feetRight > h.x + 8 && feetLeft < h.x + h.w - 8);
      if(wet){
        slipping = true;
        slipHazard = wet;
        slipDirection = Math.sign(player.vx) || player.facing || 1;
        slipResetAt = now + 720;
        player.stunnedUntil = slipResetAt;
        player.vx = slipDirection * 250;
        player.vy = -70;
        player.grounded = false;
        input.left = false;
        input.right = false;
        cfPlayFeedback(false);
        showMessage("Vorsicht, rutschig!", 850);
      }
    }

    // Sicherheitsnetz, falls die Figur durch einen Darstellungsfehler unter den Boden gerät.
    if(player.y > BASE_VIEW_H + 125){
      resetCurrentMission("slip");
      return;
    }

    for(const c of currentCollectibles){
      if(!c.active) continue;
      // Bei falschen Wörtern ist die tatsächliche Trefferfläche etwas kleiner
      // als die sichtbare Blase. Das macht knappe Sprünge auf Touch-Geräten fairer.
      const hitbox = c.kind === "decoy"
        ? {x:c.x + 12, y:c.y + 7, w:Math.max(20,c.w - 24), h:c.h - 14}
        : c;
      if(!intersects(player, hitbox)) continue;
      if(c.kind === "correct") collectCorrect(c);
      else hitDecoy(c);
    }

    if(!subwayUnlocked && collectedCount() === mission().tokens.length){
      const playerCenter = player.x + player.w/2;
      if(Math.abs(playerCenter - LINYUE_X) < 86){
        if(player.grounded){
          openSentenceTask();
        }else{
          conversationPending = true;
          input.left = false;
          input.right = false;
          player.vx = 0;
        }
      }
    }

    if(subwayUnlocked && player.x + player.w > SUBWAY_X + 88){
      completeGame();
    }

    cameraX = Math.max(0, Math.min(WORLD_W - VIEW_W, player.x - 360));
    updateHud();
    updateScenePositions();
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
    const floorY = GROUND_Y + sceneYOffset;

    // Helle, freundliche Bahnhofswelt wie im abgestimmten Entwurf.
    const sky = ctx.createLinearGradient(0,0,0,VIEW_H);
    sky.addColorStop(0,"#d8ecfb");
    sky.addColorStop(.46,"#a9c9e5");
    sky.addColorStop(1,"#eef3f4");
    ctx.fillStyle = sky;
    ctx.fillRect(0,0,VIEW_W,VIEW_H);

    ctx.save();
    ctx.translate(0,sceneYOffset);

    // Stadt hinter der großen Glasfront: bewusst weich und ruhig gehalten.
    const cityOffset = -((cameraX * .075) % 620);
    for(let x=cityOffset-180, i=0; x<VIEW_W+220; x+=92, i++){
      const h = 82 + (i % 5) * 28;
      const y = GROUND_Y - h - 55;
      ctx.fillStyle = i % 2 ? "rgba(91,125,158,.34)" : "rgba(72,105,139,.27)";
      roundedRect(x,y,72,h,5); ctx.fill();
      ctx.fillStyle = "rgba(232,243,250,.48)";
      for(let wy=y+13; wy<y+h-8; wy+=18){
        for(let wx=x+10; wx<x+62; wx+=17){
          ctx.fillRect(wx,wy,7,7);
        }
      }
    }

    // Glaswände und Dachkonstruktion.
    ctx.fillStyle = "rgba(232,243,250,.34)";
    ctx.fillRect(0,0,VIEW_W,GROUND_Y);
    ctx.strokeStyle = "rgba(61,91,121,.38)";
    ctx.lineWidth = 3;
    const glassOffset = -((cameraX * .16) % 170);
    for(let x=glassOffset-170; x<VIEW_W+170; x+=170){
      ctx.beginPath(); ctx.moveTo(x,105); ctx.lineTo(x,GROUND_Y); ctx.stroke();
    }
    for(let y=105;y<GROUND_Y;y+=92){
      ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(VIEW_W,y); ctx.stroke();
    }

    // Lichtes Glasdach mit diagonalen Streben.
    const roof = ctx.createLinearGradient(0,0,0,170);
    roof.addColorStop(0,"rgba(245,250,253,.92)");
    roof.addColorStop(1,"rgba(186,211,231,.42)");
    ctx.fillStyle = roof;
    ctx.fillRect(0,0,VIEW_W,170);
    ctx.strokeStyle = "rgba(45,74,102,.68)";
    ctx.lineWidth = 7;
    const roofOffset = -((cameraX * .10) % 230);
    for(let x=roofOffset-260;x<VIEW_W+300;x+=230){
      ctx.beginPath(); ctx.moveTo(x,170); ctx.lineTo(x+190,0); ctx.stroke();
    }
    ctx.strokeStyle = "rgba(255,255,255,.72)";
    ctx.lineWidth = 3;
    for(let y=38;y<170;y+=44){
      ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(VIEW_W,y);ctx.stroke();
    }

    // Moderner Zug parallel zur Laufrichtung. Durch Parallaxe bleibt er im Hintergrund.
    const trainOffset = -420 - ((cameraX * .11) % 1320);
    for(let tx=trainOffset-1320; tx<VIEW_W+900; tx+=1320){
      ctx.save();
      ctx.shadowColor = "rgba(20,50,77,.16)";
      ctx.shadowBlur = 14;
      const trainGrad = ctx.createLinearGradient(0,280,0,438);
      trainGrad.addColorStop(0,"#ffffff");
      trainGrad.addColorStop(.78,"#e8edf0");
      trainGrad.addColorStop(1,"#d6e0e7");
      ctx.fillStyle = trainGrad;
      roundedRect(tx,282,1050,158,26); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#2f5d87";
      ctx.fillRect(tx,370,1050,18);
      ctx.fillStyle = "#d9a6af";
      ctx.fillRect(tx,390,1050,5);
      for(let wx=tx+58; wx<tx+940; wx+=124){
        ctx.fillStyle = "#24405b";
        roundedRect(wx,310,86,48,9); ctx.fill();
        ctx.fillStyle = "rgba(157,195,222,.42)";
        roundedRect(wx+6,316,74,36,6); ctx.fill();
      }
      ctx.restore();
    }

    // Dunkle Säulen rahmen die Szene und erzeugen Tiefe.
    const columnOffset = -((cameraX * .30) % 500);
    for(let x=columnOffset-90;x<VIEW_W+220;x+=500){
      const columnGrad = ctx.createLinearGradient(x,0,x+58,0);
      columnGrad.addColorStop(0,"#24384a");
      columnGrad.addColorStop(.55,"#31485e");
      columnGrad.addColorStop(1,"#1e2a34");
      ctx.fillStyle = columnGrad;
      ctx.fillRect(x,118,58,GROUND_Y-118);
      ctx.fillStyle = "#1e2a34";
      roundedRect(x-11,116,80,23,4);ctx.fill();
      roundedRect(x-13,GROUND_Y-28,84,28,4);ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,.10)";
      ctx.fillRect(x+8,138,5,GROUND_Y-175);
    }

    // Warmes Lichtband über dem Bahnsteig.
    const light = ctx.createLinearGradient(0,330,0,floorY);
    light.addColorStop(0,"rgba(255,244,218,0)");
    light.addColorStop(1,"rgba(255,244,218,.42)");
    ctx.fillStyle = light;
    ctx.fillRect(0,300,VIEW_W,GROUND_Y-300);

    ctx.restore();
  }

  function drawStationFloor(){
    const floorGrad = ctx.createLinearGradient(0,GROUND_Y,0,VIEW_H+80);
    floorGrad.addColorStop(0,"#f1e4d7");
    floorGrad.addColorStop(.68,"#dac5b0");
    floorGrad.addColorStop(1,"#b99b80");
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0,GROUND_Y,WORLD_W,VIEW_H-GROUND_Y+140);

    // Große, ruhige Fliesen statt kleinteiligem Muster.
    ctx.strokeStyle = "rgba(132,105,80,.32)";
    ctx.lineWidth = 2;
    for(let x=0;x<WORLD_W;x+=118){
      ctx.beginPath();ctx.moveTo(x,GROUND_Y);ctx.lineTo(x,GROUND_Y+58);ctx.stroke();
    }
    for(let y=GROUND_Y+30;y<GROUND_Y+62;y+=30){
      ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(WORLD_W,y);ctx.stroke();
    }

    // Taktile Leitlinie und klare Bahnsteigkante.
    ctx.fillStyle = "#efbd62";
    ctx.fillRect(0,GROUND_Y+13,WORLD_W,18);
    ctx.fillStyle = "rgba(133,91,42,.55)";
    for(let x=10;x<WORLD_W;x+=24){
      ctx.beginPath();ctx.arc(x,GROUND_Y+22,3.1,0,Math.PI*2);ctx.fill();
    }
    ctx.fillStyle = "#21364b";
    ctx.fillRect(0,GROUND_Y+58,WORLD_W,82);
    ctx.fillStyle = "#17283a";
    ctx.fillRect(0,GROUND_Y+64,WORLD_W,10);

    // Gleise laufen parallel zum Spielweg und verstärken die Seitenansicht.
    ctx.fillStyle = "#0f1f2e";
    ctx.fillRect(0,GROUND_Y+94,WORLD_W,12);
    ctx.fillRect(0,GROUND_Y+126,WORLD_W,12);
    ctx.fillStyle = "#6f5948";
    for(let x=0;x<WORLD_W;x+=64){
      ctx.fillRect(x,GROUND_Y+86,38,56);
    }
    ctx.fillStyle = "rgba(255,255,255,.22)";
    ctx.fillRect(0,GROUND_Y+94,WORLD_W,3);
  }

  function drawStationPlatform(p){
    // Schlichte Sprungbalken: keine Bänke, keine großen Aufbauten.
    ctx.save();
    ctx.shadowColor = "rgba(22,43,63,.22)";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 7;
    const barGrad = ctx.createLinearGradient(0,p.y,0,p.y+p.h);
    barGrad.addColorStop(0,"#f3d9b5");
    barGrad.addColorStop(.55,"#d8b586");
    barGrad.addColorStop(1,"#b88d61");
    ctx.fillStyle = barGrad;
    roundedRect(p.x,p.y,p.w,p.h,9);ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "#20364b";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = "#efbd62";
    roundedRect(p.x+10,p.y+4,p.w-20,4,2);ctx.fill();
    ctx.fillStyle = "#24384a";
    ctx.fillRect(p.x+8,p.y+p.h-1,p.w-16,9);
    // Zwei sehr schmale Außenstützen lassen den Weg darunter frei.
    ctx.fillStyle = "#2c4359";
    ctx.fillRect(p.x+17,p.y+p.h+7,8,38);
    ctx.fillRect(p.x+p.w-25,p.y+p.h+7,8,38);
    ctx.restore();
  }

  function drawWetFloorHazards(){
    wetHazards.forEach((h,index) => {
      const grad = ctx.createLinearGradient(h.x,GROUND_Y-4,h.x+h.w,GROUND_Y+30);
      grad.addColorStop(0,"rgba(185,216,235,.12)");
      grad.addColorStop(.45,"rgba(92,137,171,.48)");
      grad.addColorStop(1,"rgba(231,244,250,.22)");
      ctx.fillStyle = grad;
      roundedRect(h.x,GROUND_Y-3,h.w,34,17);ctx.fill();
      ctx.strokeStyle = "rgba(46,82,112,.52)";ctx.lineWidth=2.5;ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,.78)";ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(h.x+12,GROUND_Y+9);ctx.quadraticCurveTo(h.x+h.w*.45,GROUND_Y-2,h.x+h.w-10,GROUND_Y+10);ctx.stroke();

      // Kompaktes Warnschild; die Szene bleibt trotz Hindernis übersichtlich.
      const sx=h.x-28, sy=GROUND_Y-59;
      ctx.fillStyle="#efbd62";
      ctx.beginPath();ctx.moveTo(sx,GROUND_Y);ctx.lineTo(sx+12,sy);ctx.lineTo(sx+38,sy);ctx.lineTo(sx+50,GROUND_Y);ctx.closePath();ctx.fill();
      ctx.strokeStyle="#20364b";ctx.lineWidth=3;ctx.stroke();
      ctx.fillStyle="#20364b";
      ctx.beginPath();ctx.moveTo(sx+25,sy+14);ctx.lineTo(sx+34,sy+36);ctx.lineTo(sx+16,sy+36);ctx.closePath();ctx.fill();
      ctx.fillStyle="#efbd62";ctx.fillRect(sx+23,sy+21,4,8);

      // Kleine Reinigungsmarkierung nur an jeder zweiten Pfütze.
      if(index % 2 === 1){
        ctx.fillStyle="#d9a6af";ctx.fillRect(h.x+h.w-14,GROUND_Y-35,8,35);
        ctx.fillStyle="#f6e3e5";roundedRect(h.x+h.w-20,GROUND_Y-35,26,7,3);ctx.fill();
      }
    });
  }

  function drawWorld(){
    ctx.save();
    ctx.translate(-cameraX,sceneYOffset);

    drawStationFloor();

    for(const p of platforms){
      if(p.ground) continue;
      drawStationPlatform(p);
    }

    drawWetFloorHazards();
    drawStationSigns();
    drawLinYue();
    drawCollectibles();
    drawSubway();
    drawParticles();
    drawPlayer();
    ctx.restore();
  }

  function drawStationSigns(){
    // Stationsschild im Stil der dunklen HUD-Flächen.
    ctx.save();
    ctx.shadowColor="rgba(0,0,0,.16)";ctx.shadowBlur=10;
    ctx.fillStyle = "#071d33";
    roundedRect(62,286,260,60,12);ctx.fill();
    ctx.shadowBlur=0;
    ctx.strokeStyle="#efc77f";ctx.lineWidth=3;ctx.stroke();
    ctx.fillStyle = "#f7e4c5";
    ctx.font = '850 25px "Microsoft YaHei","Noto Sans SC",sans-serif';
    ctx.textAlign = "center";ctx.textBaseline = "middle";
    ctx.fillText("北京南站",192,311);
    ctx.font = '700 12px system-ui,sans-serif';
    ctx.fillStyle="rgba(247,228,197,.82)";
    ctx.fillText("BEIJING SOUTH",192,332);

    ctx.fillStyle="#24384a";ctx.fillRect(3238,294,14,176);
    ctx.fillStyle="#071d33";roundedRect(3110,276,270,68,12);ctx.fill();
    ctx.strokeStyle="#efc77f";ctx.lineWidth=3;ctx.stroke();
    ctx.fillStyle="#f7e4c5";
    ctx.font='900 29px "Microsoft YaHei","Noto Sans SC",sans-serif';
    ctx.fillText("↓  地铁",3245,310);
    ctx.restore();
  }

  function drawLinYue(){
    const feetY = GROUND_Y + 1;
    const imageReady = linYueSprite.complete && linYueSprite.naturalWidth;
    const drawH = 132;
    const drawW = imageReady ? drawH * linYueSprite.naturalWidth / linYueSprite.naturalHeight : 60;

    // Weicher Bodenschatten bindet den Sticker optisch in die Szene ein.
    ctx.save();
    ctx.fillStyle="rgba(20,42,62,.18)";
    ctx.beginPath();ctx.ellipse(LINYUE_X,feetY+1,drawW*.38,7,0,0,Math.PI*2);ctx.fill();
    ctx.restore();

    if(imageReady){
      ctx.save();
      ctx.translate(LINYUE_X,feetY);
      ctx.drawImage(linYueSprite,-drawW/2,-drawH,drawW,drawH);
      ctx.restore();
      return;
    }

    // Fallback, falls das neue Bild noch nicht im gleichen Ordner liegt.
    const x = LINYUE_X - 23;
    const y = GROUND_Y - 72;
    ctx.fillStyle = "#f6e3e5";roundedRect(x+5,y+28,36,44,10);ctx.fill();
    ctx.save();ctx.beginPath();ctx.arc(x+23,y+18,19,0,Math.PI*2);ctx.clip();
    if(avatarLin.complete && avatarLin.naturalWidth) ctx.drawImage(avatarLin,x+4,y-1,38,38);
    ctx.restore();
  }

  function drawCollectibles(){
    for(const c of currentCollectibles){
      if(!c.active) continue;
      ctx.save();
      ctx.shadowColor = "rgba(239,189,98,.82)";
      ctx.shadowBlur = 18;
      const bubbleGrad = ctx.createLinearGradient(0,c.y,0,c.y+c.h);
      bubbleGrad.addColorStop(0,"rgba(255,253,243,.99)");
      bubbleGrad.addColorStop(1,"rgba(246,226,194,.98)");
      ctx.fillStyle = bubbleGrad;
      roundedRect(c.x,c.y,c.w,c.h,18);ctx.fill();
      ctx.shadowBlur = 0;
      // Kleine Sprechblasenspitze statt eines schwebenden Rechtecks.
      ctx.beginPath();
      ctx.moveTo(c.x+c.w*.42,c.y+c.h-2);
      ctx.lineTo(c.x+c.w*.50,c.y+c.h+11);
      ctx.lineTo(c.x+c.w*.58,c.y+c.h-2);
      ctx.closePath();ctx.fill();
      ctx.strokeStyle = "#c58f40";ctx.lineWidth = 3;roundedRect(c.x,c.y,c.w,c.h,18);ctx.stroke();
      ctx.fillStyle = "#1e2a34";
      const len = Array.from(c.text).length;
      const size = len > 5 ? 17 : len > 3 ? 20 : 27;
      ctx.font = `900 ${size}px "Microsoft YaHei","Noto Sans SC",sans-serif`;
      ctx.textAlign = "center";ctx.textBaseline = "middle";
      ctx.fillText(c.text,c.x+c.w/2,c.y+c.h/2+1,c.w-12);
      // Dezente Lichtpunkte wie im Entwurfsbild.
      ctx.fillStyle="rgba(255,239,177,.95)";
      ctx.beginPath();ctx.arc(c.x+c.w-5,c.y+4,3,0,Math.PI*2);ctx.fill();
      ctx.restore();
    }
  }

  function drawSubway(){
    const x = SUBWAY_X;
    ctx.save();
    ctx.shadowColor="rgba(15,31,46,.24)";ctx.shadowBlur=18;
    ctx.fillStyle="#263c51";roundedRect(x-80,248,246,222,20);ctx.fill();
    ctx.shadowBlur=0;
    const stone=ctx.createLinearGradient(x-60,0,x+150,0);
    stone.addColorStop(0,"#d8c3ae");stone.addColorStop(.5,"#f0e4d8");stone.addColorStop(1,"#bda48e");
    ctx.fillStyle=stone;roundedRect(x-59,272,204,198,13);ctx.fill();
    ctx.fillStyle="#071d33";roundedRect(x-53,285,192,61,10);ctx.fill();
    ctx.strokeStyle="#efc77f";ctx.lineWidth=3;ctx.stroke();
    ctx.fillStyle="#f7e4c5";ctx.font='900 34px "Microsoft YaHei","Noto Sans SC",sans-serif';
    ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText("↓  地铁",x+43,316);

    ctx.fillStyle="#0b2135";ctx.fillRect(x-34,354,164,116);
    const stair=ctx.createLinearGradient(0,370,0,470);stair.addColorStop(0,"#31485e");stair.addColorStop(1,"#17283a");
    ctx.fillStyle=stair;
    for(let i=0;i<6;i++) ctx.fillRect(x-23+i*11,448-i*16,138-i*11,8);
    ctx.strokeStyle="#e8cfac";ctx.lineWidth=4;
    ctx.beginPath();ctx.moveTo(x-23,368);ctx.lineTo(x-23,456);ctx.stroke();
    ctx.beginPath();ctx.moveTo(x+117,368);ctx.lineTo(x+117,456);ctx.stroke();

    if(!subwayUnlocked){
      ctx.fillStyle="#b96f7e";ctx.fillRect(x-37,405,166,13);
      ctx.fillRect(x-30,390,11,80);ctx.fillRect(x+111,390,11,80);
      ctx.fillStyle="#f6e3e5";
      for(let i=0;i<6;i++) ctx.fillRect(x-31+i*29,405,15,13);
    }else{
      ctx.fillStyle="rgba(34,197,94,.92)";
      ctx.beginPath();ctx.moveTo(x+43,365);ctx.lineTo(x+73,397);ctx.lineTo(x+56,397);ctx.lineTo(x+56,433);ctx.lineTo(x+30,433);ctx.lineTo(x+30,397);ctx.lineTo(x+13,397);ctx.closePath();ctx.fill();
    }
    ctx.restore();
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
    const now = performance.now();
    const stunned = now < player.stunnedUntil;
    const walk = player.grounded && Math.abs(player.vx) > 5 && !stunned;
    const step = walk ? Math.sin(now / 92) : 0;
    const bob = walk ? Math.abs(step) * 2.6 : (player.grounded ? 0 : 1.5);
    const feetX = player.x + player.w/2;
    const feetY = player.y + player.h;
    const imageReady = suRanSprite.complete && suRanSprite.naturalWidth;
    const drawH = 124;
    const drawW = imageReady ? drawH * suRanSprite.naturalWidth / suRanSprite.naturalHeight : 62;

    ctx.save();
    ctx.fillStyle="rgba(20,42,62,.20)";
    ctx.beginPath();ctx.ellipse(feetX,feetY+2,drawW*.40,7,0,0,Math.PI*2);ctx.fill();
    ctx.restore();

    if(imageReady){
      ctx.save();
      ctx.translate(feetX,feetY);
      if(stunned) ctx.rotate(player.facing * Math.PI/2.65);
      else ctx.rotate(step * .018 * (player.facing || 1));
      // Die Vorlage blickt nach links; für die Laufrichtung nach rechts wird sie gespiegelt.
      if(player.facing > 0) ctx.scale(-1,1);
      ctx.drawImage(suRanSprite,-drawW/2,-drawH-bob,drawW,drawH);
      ctx.restore();
      return;
    }

    // Kompakter Fallback aus dem bisherigen Avatar.
    const x=player.x,y=player.y;
    ctx.fillStyle="#31485e";roundedRect(x+5,y+28,player.w-10,player.h-28,10);ctx.fill();
    ctx.save();ctx.beginPath();ctx.arc(x+player.w/2,y+19,19,0,Math.PI*2);ctx.clip();
    if(avatarSu.complete && avatarSu.naturalWidth) ctx.drawImage(avatarSu,x+3,y,38,38);
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
    updateScenePositions();
    requestAnimationFrame(frame);
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

  const moveZone = $("moveZone");
  const jumpZone = $("jumpZone");
  let movePointerId = null;
  let moveStartX = 0;

  function applyMoveDirection(direction){
    input.left = direction < 0;
    input.right = direction > 0;
    moveZone.classList.toggle("moving-left", direction < 0);
    moveZone.classList.toggle("moving-right", direction > 0);
  }
  function stopTouchMovement(){
    movePointerId = null;
    applyMoveDirection(0);
  }
  function directionForMoveEvent(e, allowSwipe){
    const rect = moveZone.getBoundingClientRect();
    const delta = e.clientX - moveStartX;
    if(allowSwipe && Math.abs(delta) >= 18) return delta < 0 ? -1 : 1;
    const localX = e.clientX - rect.left;
    const deadZone = Math.min(42, rect.width * .10);
    if(localX < rect.width / 2 - deadZone) return -1;
    if(localX > rect.width / 2 + deadZone) return 1;
    return 0;
  }
  moveZone.addEventListener("pointerdown", e => {
    if(movePointerId !== null) return;
    e.preventDefault();
    e.stopPropagation();
    movePointerId = e.pointerId;
    moveStartX = e.clientX;
    try{ moveZone.setPointerCapture(e.pointerId); }catch(_err){}
    applyMoveDirection(directionForMoveEvent(e, false));
  }, {passive:false});
  moveZone.addEventListener("pointermove", e => {
    if(e.pointerId !== movePointerId) return;
    e.preventDefault();
    applyMoveDirection(directionForMoveEvent(e, true));
  }, {passive:false});
  const endMove = e => {
    if(e.pointerId !== movePointerId) return;
    e.preventDefault();
    stopTouchMovement();
  };
  moveZone.addEventListener("pointerup", endMove, {passive:false});
  moveZone.addEventListener("pointercancel", endMove, {passive:false});
  moveZone.addEventListener("lostpointercapture", endMove, {passive:false});
  moveZone.addEventListener("contextmenu", e => e.preventDefault());

  let jumpPointerId = null;
  jumpZone.addEventListener("pointerdown", e => {
    e.preventDefault();
    e.stopPropagation();
    if(jumpPointerId !== null) return;
    jumpPointerId = e.pointerId;
    try{ jumpZone.setPointerCapture(e.pointerId); }catch(_err){}
    jumpZone.classList.add("active");
    requestJump();
  }, {passive:false});
  const endJump = e => {
    if(e.pointerId !== jumpPointerId) return;
    e.preventDefault();
    jumpPointerId = null;
    jumpZone.classList.remove("active");
  };
  jumpZone.addEventListener("pointerup", endJump, {passive:false});
  jumpZone.addEventListener("pointercancel", endJump, {passive:false});
  jumpZone.addEventListener("lostpointercapture", endJump, {passive:false});
  jumpZone.addEventListener("contextmenu", e => e.preventDefault());

  window.addEventListener("blur", () => {
    input.left = false;
    input.right = false;
    stopTouchMovement();
    jumpPointerId = null;
    jumpZone.classList.remove("active");
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
    requestAnimationFrame(syncCanvasAspect);
    setTimeout(syncCanvasAspect, 120);
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
    requestAnimationFrame(syncCanvasAspect);
    setTimeout(syncCanvasAspect, 120);
  });
  window.addEventListener("resize", syncCanvasAspect, {passive:true});
  window.addEventListener("orientationchange", () => setTimeout(syncCanvasAspect, 180), {passive:true});

  $("startBtn").addEventListener("click",startGame);
  $("restartBtn").addEventListener("click",() => resetGame(false));
  $("playAgainBtn").addEventListener("click",() => resetGame(false));
  $("fullscreenBtn").addEventListener("click",toggleFullscreen);

  const savedCheckpoint = readCheckpoint();
  if(savedCheckpoint) restoreCheckpoint(savedCheckpoint);
  else resetGame(true);
  updateFullscreenButton();
  syncCanvasAspect();
  requestAnimationFrame(frame);
})();
