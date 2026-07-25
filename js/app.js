import { MOVES, MAX_ENERGY } from "./moves.js";
import { resolveCombat } from "./combat.js";
import { chooseAiMove } from "./ai.js";
import { SKILLS, SKILL_KEYS, createFighter, moveCost, previewSkillDamage, resolveWithSkills, skillMove, whiteTowerRefunds } from "./skills.js";
import { loadData, saveData } from "./storage.js";
import { $, renderEnergy, renderMoves, renderRules, revealMove, showToast, showClap, updateHomeStats, setView } from "./ui.js";

let data = loadData();
let state;
let timerId = null;
let audioContext = null;

const tutorial = [
  { icon: "👏 👏", title: "先拍两下", text: "现实游戏里，双方每回合先拍手两次，然后同时做出手势。网页会帮你模拟这个节奏。", demo: "啪 · 啪 · 出招！" },
  { icon: "✊", title: "锻造能量", text: "锻造能获得1格能量，但锻造时完全没有防御，任何攻击都会命中。", demo: "锻造：0 消耗 → +1 能量" },
  { icon: "🔪 ⚔️ ✦", title: "等级压制", text: "攻击消耗几格能量，就是几级。同级攻击相互抵消，高级攻击会压制低级攻击。", demo: "同级抵刀 · 高级压制低级" },
  { icon: "🛡️ 🤲 💨", title: "三种防御", text: "防挡1～2级；接挡2～3级；闪消耗2能量，挡2～5级。接和闪成功后双方能量归零。", demo: "每种防御都有破绽" },
  { icon: "◉", title: "虚无终结", text: "攒满6格即可使用虚无。它无法被任何防御挡住，但攒能量的过程会让你很危险。", demo: "准备好了，开始第一局吧！" }
];
let tutorialIndex = 0;

function newState() {
  return {
    player: data.settings.skillsEnabled ? createFighter(data.settings.playerSkill) : { energy: 0, score: 0 },
    ai: data.settings.skillsEnabled ? createFighter(data.settings.aiSkill) : { energy: 0, score: 0 },
    endless: { wins: 0, losses: 0, streak: 0, best: 0 },
    round: 1, busy: false, history: [], weaponHistory: [], log: []
  };
}

function init() {
  state = newState();
  renderRules();
  populateSkillSelects();
  bindEvents();
  syncSettingsForm();
  updateHomeStats(data.stats);
  render();
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}

function bindEvents() {
  document.querySelectorAll('[data-action="start-game"]').forEach(button => button.addEventListener("click", startGame));
  document.querySelectorAll('[data-action="start-tutorial"]').forEach(button => button.addEventListener("click", openTutorial));
  $("homeButton").addEventListener("click", () => { stopTimer(); setView("home"); updateHomeStats(data.stats); });
  $("rulesButton").addEventListener("click", () => $("rulesDialog").showModal());
  $("settingsButton").addEventListener("click", () => $("settingsDialog").showModal());
  $("restartButton").addEventListener("click", resetGame);
  $("playAgainButton").addEventListener("click", () => { $("gameOverDialog").close(); resetGame(); });
  $("backHomeButton").addEventListener("click", () => { $("gameOverDialog").close(); setView("home"); updateHomeStats(data.stats); });
  $("tutorialNext").addEventListener("click", nextTutorial);
  document.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", () => $(button.dataset.close).close()));
  $("settingsDialog").querySelector("form").addEventListener("submit", saveSettings);
  $("modeSelect").addEventListener("change", updateSettingsVisibility);
  $("skillToggle").addEventListener("change", updateSettingsVisibility);
  $("playerSkillSelect").addEventListener("change", updateSkillDescription);
  $("aiSkillSelect").addEventListener("change", updateSkillDescription);
  $("quickModeSelect").addEventListener("change", changeMode);
}

function startGame() {
  setView("game");
  resetGame();
  if (!data.tutorialSeen) openTutorial();
}

function resetGame() {
  stopTimer();
  state = newState();
  clearScoreFeedback();
  render();
  startTimer();
}

function render() {
  renderEnergy("playerEnergy", "playerEnergyCount", state.player.energy);
  renderEnergy("aiEnergy", "aiEnergyCount", state.ai.energy);
  $("playerScore").textContent = state.player.score;
  $("aiScore").textContent = state.ai.score;
  renderSkillStatus();
  $("roundNumber").textContent = state.round;
  const names = { easy: "简单", normal: "普通", hard: "困难", hell: "地狱" };
  const modeNames = { standard: "标准", endless: "无尽", zen: "禅" };
  $("modeLabel").textContent = `${modeNames[data.settings.mode]}对决 · ${names[data.settings.difficulty]}`;
  const continuous = data.settings.mode !== "standard";
  $("standardScore").classList.toggle("hidden", continuous);
  $("endlessScore").classList.toggle("hidden", !continuous);
  $("endlessWins").textContent = state.endless.wins;
  $("endlessLosses").textContent = state.endless.losses;
  $("endlessStreak").textContent = state.endless.streak;
  $("endlessBest").textContent = state.endless.best;
  const hideEnergy = data.settings.mode === "zen" || !data.settings.energyVisible;
  $("playerPanel").classList.toggle("energy-hidden", hideEnergy);
  $("aiPanel").classList.toggle("energy-hidden", hideEnergy);
  document.body.classList.toggle("zen-mode", data.settings.mode === "zen");
  renderMoves(
    state.player.energy, selectMove, state.busy,
    data.settings.skillsEnabled ? data.settings.playerSkill : null, state.player,
    data.settings.scissorsEnabled
  );
  $("logCount").textContent = state.log.length;
  $("logList").innerHTML = state.log.map(item => `<li><b>第${item.round}回合</b>　你 ${skillMove(item.player).name} · AI ${skillMove(item.ai).name}　— ${item.title}</li>`).join("");
}

async function selectMove(playerKey) {
  const playerCost = data.settings.skillsEnabled
    ? moveCost(playerKey, data.settings.playerSkill, state.player)
    : MOVES[playerKey].cost;
  if (state.busy || playerCost > state.player.energy) return;
  state.busy = true;
  stopTimer();
  renderMoves(
    state.player.energy, selectMove, true,
    data.settings.skillsEnabled ? data.settings.playerSkill : null, state.player,
    data.settings.scissorsEnabled
  );
  const aiKey = chooseAiMove(data.settings.difficulty, {
    aiEnergy: state.ai.energy, playerEnergy: state.player.energy, history: state.history,
    skillsEnabled: data.settings.skillsEnabled,
    playerSkill: data.settings.playerSkill, aiSkill: data.settings.aiSkill,
    playerFighter: state.player, aiFighter: state.ai,
    weaponHistory: state.weaponHistory,
    scissorsEnabled: data.settings.scissorsEnabled
  }, playerKey);
  revealMove("player", playerKey, true);
  revealMove("ai", aiKey, true);
  $("clash").className = "clash";
  $("clashKicker").textContent = "准备";
  $("clashTitle").textContent = "拍手——";
  $("clashDetail").textContent = "双方即将同时出招。";
  await beat();
  await beat();
  revealMove("player", playerKey);
  revealMove("ai", aiKey);
  settleRound(playerKey, aiKey);
}

function beat() {
  showClap();
  playTone(150);
  if (navigator.vibrate) navigator.vibrate(35);
  return new Promise(resolve => setTimeout(resolve, 330));
}

function settleRound(playerKey, aiKey) {
  const result = data.settings.skillsEnabled
    ? resolveWithSkills(playerKey, aiKey, data.settings.playerSkill, data.settings.aiSkill)
    : resolveCombat(playerKey, aiKey);
  state.pendingPlayerMove = playerKey;
  state.pendingAiMove = aiKey;
  applyStartOfRoundSkills();
  spendAndGain("player", playerKey);
  spendAndGain("ai", aiKey);
  for (const key of [playerKey, aiKey]) {
    if (skillMove(key).type === "attack" && !state.weaponHistory.includes(key)) state.weaponHistory.push(key);
  }
  const scoreBefore = { player: state.player.score, ai: state.ai.score };
  let resultClass = "draw";
  let skillDetail = "";
  if (data.settings.skillsEnabled) {
    const damage = applySkillDamage(result, playerKey, aiKey);
    resultClass = damage.player > 0 && damage.ai === 0 ? "lose" : damage.ai > 0 && damage.player === 0 ? "win" : "draw";
    skillDetail = ` · 你 ${formatNumber(state.player.hp)} 生命，AI ${formatNumber(state.ai.hp)} 生命`;
    applyEndOfRoundSkills(damage, playerKey, aiKey);
    const deaths = resolveDeaths();
    if (deaths.player || deaths.ai) {
      if (deaths.player && !deaths.ai) state.ai.score++;
      if (deaths.ai && !deaths.player) state.player.score++;
      if (deaths.player && deaths.ai) resultClass = "draw";
      resetLivesAfterDeath(deaths);
    }
  } else {
    if (result.playerHit && !result.aiHit) { state.ai.score++; resultClass = "lose"; }
    if (result.aiHit && !result.playerHit) { state.player.score++; resultClass = "win"; }
  }
  if (data.settings.mode !== "standard") {
    const playerScored = state.player.score > scoreBefore.player;
    const aiScored = state.ai.score > scoreBefore.ai;
    if (data.settings.skillsEnabled ? playerScored : resultClass === "win") {
      state.endless.wins++;
      state.endless.streak++;
      state.endless.best = Math.max(state.endless.best, state.endless.streak);
    } else if (data.settings.skillsEnabled ? aiScored : resultClass === "lose") {
      state.endless.losses++;
      state.endless.streak = 0;
    }
  }
  showScoreFeedback(state.player.score - scoreBefore.player, state.ai.score - scoreBefore.ai);
  if (result.reset || result.playerHit || result.aiHit) state.player.energy = state.ai.energy = 0;
  state.history.push(playerKey);
  state.log.unshift({ round: state.round, player: playerKey, ai: aiKey, title: result.title });
  $("clash").className = `clash ${resultClass}`;
  $("clashKicker").textContent = resultClass === "win" ? "你赢下这回合" : resultClass === "lose" ? "AI 赢下这回合" : "本回合平局";
  $("clashTitle").textContent = result.title;
  $("clashDetail").textContent = result.detail + skillDetail;
  if (result.playerHit || result.aiHit) { playTone(resultClass === "win" ? 520 : 95, .18); if (navigator.vibrate) navigator.vibrate(resultClass === "win" ? [40, 30, 70] : 120); }
  state.round++;
  state.busy = false;
  render();
  if (data.settings.mode === "standard" && (state.player.score >= data.settings.winScore || state.ai.score >= data.settings.winScore)) setTimeout(endGame, 550);
  else startTimer();
}

function populateSkillSelects() {
  const options = SKILL_KEYS.map(key => `<option value="${key}">${SKILLS[key].name} · ${SKILLS[key].hp}血 / ${SKILLS[key].attack}攻</option>`).join("");
  $("playerSkillSelect").innerHTML = options;
  $("aiSkillSelect").innerHTML = options;
}

function updateSkillDescription() {
  if (!$("skillToggle")?.checked) return;
  const player = SKILLS[$("playerSkillSelect").value];
  const ai = SKILLS[$("aiSkillSelect").value];
  $("skillDescription").innerHTML = `<b>你 · ${player.name}</b>：${player.description}<br><b>AI · ${ai.name}</b>：${ai.description}`;
}

function renderSkillStatus() {
  const enabled = data.settings.skillsEnabled;
  for (const who of ["player", "ai"]) {
    const skillKey = who === "player" ? data.settings.playerSkill : data.settings.aiSkill;
    const skill = SKILLS[skillKey];
    $(`${who}SkillBadge`).classList.toggle("hidden", !enabled);
    $(`${who}HealthRow`).classList.toggle("hidden", !enabled);
    if (!enabled) continue;
    $(`${who}SkillBadge`).textContent = `${skill.name} · ${formatNumber(state[who].attack)}攻`;
    $(`${who}HealthCount`).textContent = formatNumber(state[who].hp);
    $(`${who}HealthBar`).style.width = `${Math.max(0, Math.min(100, state[who].hp / state[who].maxHp * 100))}%`;
  }
}

function applyStartOfRoundSkills() {
  for (const who of ["player", "ai"]) {
    const skill = who === "player" ? data.settings.playerSkill : data.settings.aiSkill;
    if (skill === "mother" && state[who].dealtDamageLastRound) {
      state[who].hp = Math.min(state[who].maxHp, state[who].hp + .5);
    }
  }
}

function applySkillDamage(result, playerKey, aiKey) {
  const damage = previewSkillDamage(
    result, playerKey, aiKey, data.settings.playerSkill, data.settings.aiSkill, state.player, state.ai
  );
  if (damage.ai > 0 && data.settings.playerSkill === "assassin" && playerKey === "knife" && !state.player.assassinUsed) {
    state.player.assassinUsed = true;
  }
  if (damage.player > 0 && data.settings.aiSkill === "assassin" && aiKey === "knife" && !state.ai.assassinUsed) {
    state.ai.assassinUsed = true;
  }
  state.player.hp -= damage.player;
  state.ai.hp -= damage.ai;
  return damage;
}

function applyEndOfRoundSkills(damage, playerKey, aiKey) {
  const pairs = [
    { who: "player", other: "ai", skill: data.settings.playerSkill, dealt: damage.ai, taken: damage.player, move: playerKey },
    { who: "ai", other: "player", skill: data.settings.aiSkill, dealt: damage.player, taken: damage.ai, move: aiKey }
  ];
  for (const item of pairs) {
    const fighter = state[item.who];
    if (item.skill === "generalist" && (item.dealt > 0 || item.taken > 0)) fighter.boostForge = true;
    if (item.skill === "reaper" && item.dealt > 0) { fighter.hp += 1; fighter.maxHp = Math.max(fighter.maxHp, fighter.hp); fighter.attack += 1; }
    if (item.skill === "secretKeeper" && item.dealt > 0) { fighter.hp += 1; fighter.maxHp = Math.max(fighter.maxHp, fighter.hp); }
    const opponentMove = item.who === "player" ? aiKey : playerKey;
    if (item.skill === "prisoner" && item.move === "flash" && item.taken === 0 && skillMove(opponentMove).type === "attack") {
      fighter.flashSuccesses++;
      if (fighter.flashSuccesses % 2 === 0) fighter.attackDiscount++;
    }
    if (item.skill === "storm" && item.move === "katana" && item.dealt === 0) fighter.stormDiscount = 1;
    if (item.skill === "demon") fighter.attack += .5;
    fighter.dealtDamageLastRound = item.dealt > 0;
  }
}

function resolveDeaths() {
  let playerDead = state.player.hp <= 0;
  let aiDead = state.ai.hp <= 0;
  if (playerDead && data.settings.playerSkill === "hunter") state.ai.hp -= 1;
  if (aiDead && data.settings.aiSkill === "hunter") state.player.hp -= 1;
  playerDead = state.player.hp <= 0;
  aiDead = state.ai.hp <= 0;
  return { player: playerDead, ai: aiDead };
}

function resetLivesAfterDeath(deaths) {
  if (!deaths.player && !deaths.ai) return;
  const scores = { player: state.player.score, ai: state.ai.score };
  state.player = createFighter(data.settings.playerSkill);
  state.ai = createFighter(data.settings.aiSkill);
  state.player.score = scores.player;
  state.ai.score = scores.ai;
}

function formatNumber(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

function showScoreFeedback(playerPoint, aiPoint) {
  if (!playerPoint && !aiPoint) return;
  const feedback = $("scoreFeedback");
  const playerPanel = $("playerPanel");
  const aiPanel = $("aiPanel");
  clearTimeout(showScoreFeedback.timeout);
  feedback.className = `score-feedback show ${playerPoint ? "win" : aiPoint ? "lose" : ""}`;
  feedback.textContent = playerPoint
    ? "你拿下一分。保持这个节奏。"
    : aiPoint
      ? "对手拿下一分。下一回合还有机会。"
      : "双方同时倒下，本回合不计分。";
  playerPanel.classList.toggle("point-won", Boolean(playerPoint));
  playerPanel.classList.toggle("point-lost", Boolean(aiPoint));
  aiPanel.classList.toggle("point-won", Boolean(aiPoint));
  aiPanel.classList.toggle("point-lost", Boolean(playerPoint));
  showScoreFeedback.timeout = setTimeout(clearScoreFeedback, 2400);
}

function clearScoreFeedback() {
  const feedback = $("scoreFeedback");
  if (!feedback) return;
  feedback.className = "score-feedback";
  feedback.textContent = "";
  $("playerPanel")?.classList.remove("point-won", "point-lost");
  $("aiPanel")?.classList.remove("point-won", "point-lost");
}

function spendAndGain(who, moveKey) {
  const move = skillMove(moveKey);
  const skill = who === "player" ? data.settings.playerSkill : data.settings.aiSkill;
  const cost = data.settings.skillsEnabled ? moveCost(moveKey, skill, state[who]) : move.cost;
  state[who].energy = Math.max(0, state[who].energy - cost);
  if (move.gain) {
    const gain = data.settings.skillsEnabled && skill === "generalist" && state[who].boostForge ? 2 : move.gain;
    state[who].energy = Math.min(MAX_ENERGY, state[who].energy + gain);
    state[who].boostForge = false;
  }
  if (data.settings.skillsEnabled && skill === "whiteTower" && whiteTowerRefunds(moveKey, state.weaponHistory)) {
    state[who].energy = Math.min(MAX_ENERGY, state[who].energy + cost);
  }
  if (data.settings.skillsEnabled && skill === "guardian") {
    if (moveKey === "guard") state[who].energy = Math.min(MAX_ENERGY, state[who].energy + .25);
    if (moveKey === "catch") state[who].energy = Math.min(MAX_ENERGY, state[who].energy + .5);
  }
  if (data.settings.skillsEnabled && skill === "storm" && moveKey === "katana") state[who].stormDiscount = 0;
}

function endGame() {
  stopTimer();
  const won = state.player.score > state.ai.score;
  data.stats.games++;
  if (won) {
    data.stats.wins++;
    data.stats.currentStreak++;
    data.stats.bestStreak = Math.max(data.stats.bestStreak, data.stats.currentStreak);
  } else {
    data.stats.losses++;
    data.stats.currentStreak = 0;
  }
  saveData(data);
  $("resultSeal").textContent = won ? "胜" : "败";
  $("gameOverTitle").textContent = won ? "漂亮！" : "再来一次";
  $("gameOverText").textContent = `${state.player.score} : ${state.ai.score} · ${won ? `当前 ${data.stats.currentStreak} 连胜` : "AI 抓住了你的节奏"}`;
  $("gameOverDialog").showModal();
}

function startTimer() {
  stopTimer();
  if (!data.settings.timerEnabled || state.busy) return;
  const track = $("timerTrack");
  const bar = $("timerBar");
  track.classList.remove("hidden");
  let remaining = data.settings.timerSeconds * 10;
  bar.style.width = "100%";
  timerId = setInterval(() => {
    remaining--;
    bar.style.width = `${Math.max(0, remaining / (data.settings.timerSeconds * 10) * 100)}%`;
    if (remaining <= 0) { stopTimer(); showToast("时间到，自动选择“防”"); selectMove("guard"); }
  }, 100);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
  $("timerTrack")?.classList.add("hidden");
}

function openTutorial() {
  tutorialIndex = 0;
  renderTutorial();
  $("tutorialDialog").showModal();
}

function nextTutorial() {
  if (tutorialIndex < tutorial.length - 1) { tutorialIndex++; renderTutorial(); return; }
  data.tutorialSeen = true;
  saveData(data);
  $("tutorialDialog").close();
  if ($("homeView").classList.contains("active")) startGame();
}

function renderTutorial() {
  const step = tutorial[tutorialIndex];
  $("tutorialStep").innerHTML = `<div class="tutorial-icon">${step.icon}</div><p class="eyebrow">${tutorialIndex + 1} / ${tutorial.length}</p><h2>${step.title}</h2><p>${step.text}</p><div class="tutorial-demo">${step.demo}</div>`;
  $("tutorialDots").innerHTML = tutorial.map((_, index) => `<i class="${index === tutorialIndex ? "active" : ""}"></i>`).join("");
  $("tutorialNext").textContent = tutorialIndex === tutorial.length - 1 ? "开始练习" : "下一步";
}

function syncSettingsForm() {
  $("quickModeSelect").value = data.settings.mode;
  $("modeSelect").value = data.settings.mode;
  $("difficultySelect").value = data.settings.difficulty;
  $("winScoreSelect").value = String(data.settings.winScore);
  $("timerToggle").checked = data.settings.timerEnabled;
  $("timerSeconds").value = data.settings.timerSeconds;
  $("energyToggle").checked = data.settings.energyVisible;
  $("skillToggle").checked = data.settings.skillsEnabled;
  $("playerSkillSelect").value = data.settings.playerSkill;
  $("aiSkillSelect").value = data.settings.aiSkill;
  $("scissorsToggle").checked = data.settings.scissorsEnabled;
  $("soundToggle").checked = data.settings.sound;
  updateSettingsVisibility();
}

function saveSettings(event) {
  event.preventDefault();
  data.settings = {
    mode: $("modeSelect").value,
    difficulty: $("difficultySelect").value,
    winScore: Number($("winScoreSelect").value),
    timerEnabled: $("timerToggle").checked,
    timerSeconds: Math.min(15, Math.max(0, Number.isFinite(Number($("timerSeconds").value)) ? Number($("timerSeconds").value) : 15)),
    energyVisible: $("energyToggle").checked,
    skillsEnabled: $("skillToggle").checked,
    playerSkill: $("playerSkillSelect").value,
    aiSkill: $("aiSkillSelect").value,
    scissorsEnabled: $("scissorsToggle").checked,
    sound: $("soundToggle").checked
  };
  $("quickModeSelect").value = data.settings.mode;
  saveData(data);
  $("settingsDialog").close();
  showToast("设置已保存");
  if ($("gameView").classList.contains("active")) resetGame();
}

function updateSettingsVisibility() {
  const mode = $("modeSelect").value;
  $("winScoreSetting").classList.toggle("hidden", mode !== "standard");
  $("energySetting").classList.toggle("hidden", mode === "zen");
  const skillsOn = $("skillToggle").checked;
  $("playerSkillSetting").classList.toggle("hidden", !skillsOn);
  $("aiSkillSetting").classList.toggle("hidden", !skillsOn);
  $("skillDescription").classList.toggle("hidden", !skillsOn);
  updateSkillDescription();
}

function changeMode() {
  data.settings.mode = $("quickModeSelect").value;
  saveData(data);
  syncSettingsForm();
  if ($("gameView").classList.contains("active")) resetGame();
  else render();
  showToast(`已切换到${{ standard: "标准", endless: "无尽", zen: "禅" }[data.settings.mode]}模式`);
}

function playTone(frequency, duration = .08) {
  if (!data.settings.sound) return;
  try {
    audioContext ||= new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.frequency.value = frequency;
    oscillator.type = "triangle";
    gain.gain.setValueAtTime(.08, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + duration);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  } catch {}
}

init();
