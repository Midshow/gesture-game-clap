const KEY = "hezhang-game-v2";
const defaults = {
  settings: { difficulty: "normal", winScore: 3, timerEnabled: false, timerSeconds: 15, sound: true },
  stats: { games: 0, wins: 0, losses: 0, bestStreak: 0, currentStreak: 0 },
  tutorialSeen: false
};

export function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
    return { ...defaults, ...saved, settings: { ...defaults.settings, ...saved.settings }, stats: { ...defaults.stats, ...saved.stats } };
  } catch {
    return structuredClone(defaults);
  }
}

export function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
