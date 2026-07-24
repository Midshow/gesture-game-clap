import { MAX_ENERGY, MOVES } from "./moves.js";

const $ = id => document.getElementById(id);

export function renderEnergy(id, countId, energy) {
  $(id).innerHTML = Array.from({ length: MAX_ENERGY }, (_, index) => `<i class="energy-cell ${index < energy ? "filled" : ""}"></i>`).join("");
  $(countId).textContent = energy;
}

export function renderMoves(filter, energy, onSelect, busy = false) {
  const keys = Object.keys(MOVES).filter(key => filter === "attack" ? MOVES[key].type === "attack" : MOVES[key].type === "basic");
  const grid = $("moveGrid");
  grid.innerHTML = keys.map(key => {
    const move = MOVES[key];
    const shortfall = Math.max(0, move.cost - energy);
    return `<button class="move-card" data-move="${key}" ${busy || shortfall ? "disabled" : ""} aria-label="${move.name}，${move.summary}">
      <span class="move-icon">${move.icon}</span><strong>${move.name}</strong><small>${shortfall ? `还差 ${shortfall} 格能量` : move.summary}</small>
      <span class="move-cost">${move.cost || (move.gain ? "+1" : "0")}</span>
    </button>`;
  }).join("");
  grid.querySelectorAll("[data-move]").forEach(button => button.addEventListener("click", () => onSelect(button.dataset.move)));
}

export function renderRules() {
  $("ruleGrid").innerHTML = Object.values(MOVES).map(move => `<article class="rule-card"><span>${move.icon}</span><div><strong>${move.name} · ${move.cost ? `${move.cost} 能量` : "免费"}</strong><small>${move.rule}</small></div></article>`).join("");
}

export function revealMove(who, moveKey, hidden = false) {
  const element = $(`${who}Move`);
  const move = MOVES[moveKey];
  element.classList.toggle("hidden", hidden);
  if (move) element.innerHTML = `<span>${move.icon}</span><strong>${move.name}</strong>`;
}

export function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove("show"), 1800);
}

export function showClap() {
  const overlay = $("clapOverlay");
  overlay.classList.remove("show");
  void overlay.offsetWidth;
  overlay.classList.add("show");
}

export function updateHomeStats(stats) {
  $("homeGames").textContent = stats.games;
  $("homeBest").textContent = stats.bestStreak;
  $("homeWinRate").textContent = stats.games ? `${Math.round(stats.wins / stats.games * 100)}%` : "—";
}

export function setView(name) {
  document.querySelectorAll(".view").forEach(view => view.classList.remove("active"));
  $(`${name}View`).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export { $ };
