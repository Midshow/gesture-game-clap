const KEY = "hezhang-game-v2";
const defaults = {
  settings: { mode: "standard", difficulty: "normal", winScore: 3, timerEnabled: false, timerSeconds: 15, energyVisible: true, skillsEnabled: false, playerSkill: "generalist", aiSkill: "generalist", scissorsEnabled: false, sound: true },
  stats: { games: 0, wins: 0, losses: 0, bestStreak: 0, currentStreak: 0 },
  tutorialSeen: false
};

export function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
    const merged = { ...defaults, ...saved, settings: { ...defaults.settings, ...saved.settings }, stats: { ...defaults.stats, ...saved.stats } };
    if (merged.settings.difficulty === "mindreader") merged.settings.difficulty = "hell";
    return merged;
  } catch {
    return structuredClone(defaults);
  }
}

export function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
