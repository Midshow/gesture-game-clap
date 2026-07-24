import { MOVES, MAX_ENERGY } from "./moves.js";
import { resolveCombat } from "./combat.js";
import { chooseAiMove } from "./ai.js";
import { loadData, saveData } from "./storage.js";
import { $, renderEnergy, renderMoves, renderRules, revealMove, showToast, showClap, updateHomeStats, setView } from "./ui.js";

let data = loadData();
let state;
let timerId = null;
let audioContext = null;

const tutorial = [
  { icon: "👏 👏", title: "先拍两下", text: "现实游戏里，双方每回合先拍手两次，然后同时做出手势。网页会帮你模拟这个节奏。", demo: "啪 · 啪 · 出招！" },
  { icon: "✊", title: "锻造能量", text: "锻造能获得1格能量，但锻造时完全没有防御，任何攻击都会命中。", demo: "锻造：0 消耗 → +1 能量" },
  { icon: "🔪 ⚔️ ✦", title: "等级压制", text: "攻击消耗几格能量，就是几级。同级互杀，高级攻击会压制低级攻击。", demo: "3级手里剑 ＞ 2级武士刀" },
  { icon: "🛡️ 🤲 💨", title: "三种防御", text: "防挡1～2级；接挡2～3级；闪消耗2能量，挡2～5级。接和闪成功后双方能量归零。", demo: "每种防御都有破绽" },
  { icon: "◉", title: "虚无终结", text: "攒满6格即可使用虚无。它无法被任何防御挡住，但攒能量的过程会让你很危险。", demo: "准备好了，开始第一局吧！" }
];
let tutorialIndex = 0;

function newState() {
  return {
    player: { energy: 0, score: 0 },
    ai: { energy: 0, score: 0 },
    endless: { wins: 0, losses: 0, streak: 0, best: 0 },
    round: 1, busy: false, history: [], log: []
  };
}

function init() {
  state = newState();
  renderRules();
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
  render();
  startTimer();
}

function render() {
  renderEnergy("playerEnergy", "playerEnergyCount", state.player.energy);
  renderEnergy("aiEnergy", "aiEnergyCount", state.ai.energy);
  $("playerScore").textContent = state.player.score;
  $("aiScore").textContent = state.ai.score;
  $("roundNumber").textContent = state.round;
  const names = { easy: "简单", normal: "普通", hard: "困难", mindreader: "读心挑战" };
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
  renderMoves(state.player.energy, selectMove, state.busy);
  $("logCount").textContent = state.log.length;
  $("logList").innerHTML = state.log.map(item => `<li><b>第${item.round}回合</b>　你 ${MOVES[item.player].name} · AI ${MOVES[item.ai].name}　— ${item.title}</li>`).join("");
}

async function selectMove(playerKey) {
  if (state.busy || MOVES[playerKey].cost > state.player.energy) return;
  state.busy = true;
  stopTimer();
  renderMoves(state.player.energy, selectMove, true);
  const aiKey = chooseAiMove(data.settings.difficulty, { aiEnergy: state.ai.energy, playerEnergy: state.player.energy, history: state.history }, playerKey);
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
  const result = resolveCombat(playerKey, aiKey);
  spendAndGain("player", playerKey);
  spendAndGain("ai", aiKey);
  let resultClass = "draw";
  if (result.playerHit && !result.aiHit) { state.ai.score++; resultClass = "lose"; }
  if (result.aiHit && !result.playerHit) { state.player.score++; resultClass = "win"; }
  if (data.settings.mode !== "standard") {
    if (resultClass === "win") {
      state.endless.wins++;
      state.endless.streak++;
      state.endless.best = Math.max(state.endless.best, state.endless.streak);
    } else if (resultClass === "lose") {
      state.endless.losses++;
      state.endless.streak = 0;
    }
  }
  if (result.reset || result.playerHit || result.aiHit) state.player.energy = state.ai.energy = 0;
  state.history.push(playerKey);
  state.log.unshift({ round: state.round, player: playerKey, ai: aiKey, title: result.title });
  $("clash").className = `clash ${resultClass}`;
  $("clashKicker").textContent = resultClass === "win" ? "你赢下这回合" : resultClass === "lose" ? "AI 赢下这回合" : "本回合平局";
  $("clashTitle").textContent = result.title;
  $("clashDetail").textContent = result.detail;
  if (result.playerHit || result.aiHit) { playTone(resultClass === "win" ? 520 : 95, .18); if (navigator.vibrate) navigator.vibrate(resultClass === "win" ? [40, 30, 70] : 120); }
  state.round++;
  state.busy = false;
  render();
  if (data.settings.mode === "standard" && (state.player.score >= data.settings.winScore || state.ai.score >= data.settings.winScore)) setTimeout(endGame, 550);
  else startTimer();
}

function spendAndGain(who, moveKey) {
  const move = MOVES[moveKey];
  state[who].energy = Math.max(0, state[who].energy - move.cost);
  if (move.gain) state[who].energy = Math.min(MAX_ENERGY, state[who].energy + move.gain);
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
    timerSeconds: Math.min(30, Math.max(5, Number($("timerSeconds").value) || 15)),
    energyVisible: $("energyToggle").checked,
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
