import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const archive = fs.readdirSync(root).find(name => name.includes("正式版本存档"));
const filename = fs.readdirSync(path.join(root, archive)).find(name => name.includes("v2.5.5.html"));
const html = fs.readFileSync(path.join(root, archive, filename), "utf8");

const volunteerSource = html.match(/function canHumanVolunteerMp[\s\S]*?\n}/)?.[0] || "";
const fighters = [
  { id: 0, team: 0, human: true, alive: true, skipped: false },
  { id: 1, team: 0, human: false, alive: true, skipped: false },
  { id: 2, team: 1, human: false, alive: true, skipped: false },
  { id: 3, team: 1, human: false, alive: true, skipped: false }
];
const canVolunteer = new Function(
  "aliveMp", "skillMove",
  `${volunteerSource}; return canHumanVolunteerMp;`
)(() => fighters, key => ({ type: ["knife", "katana"].includes(key) ? "attack" : "basic" }));

const attack = { attacker: fighters[2] };
const defensiveActions = new Map([[0, "guard"], [1, "forge"], [2, "knife"], [3, "katana"]]);
assert.equal(
  canVolunteer(fighters.filter(f => f.team === 0), attack, defensiveActions),
  false,
  "A defending human must not be offered voluntary damage"
);

const insufficientForgeActions = new Map([[0, "forge"], [1, "guard"], [2, "knife"], [3, "katana"]]);
assert.equal(
  canVolunteer(fighters.filter(f => f.team === 0), attack, insufficientForgeActions),
  true,
  "A human forger may volunteer when hostile attacks outnumber forgers"
);

const enoughForgeActions = new Map([[0, "forge"], [1, "forge"], [2, "knife"], [3, "katana"]]);
assert.equal(
  canVolunteer(fighters.filter(f => f.team === 0), attack, enoughForgeActions),
  false,
  "No voluntary substitution is needed when forgers cover all hostile attacks"
);

assert.match(html, /roundEvent\.hit\.player&&roundEvent\.hit\.ai&&bothMonsters/);
assert.match(html, /mpState\.monsterDuels=new Map\(\)/);
assert.match(html, /mpState\.monsterDuels\?\.get\(pairKey\)/);
assert.match(html, /showMonsterRpsResult/);
assert.match(html, /if\(f\.monsterGesture\)\{const prepared=f\.monsterGesture;f\.monsterGesture=null;return prepared;\}/);

const previewSource = html.match(/function mpDefensePreview[\s\S]*?\n}/)?.[0] || "";
const candidateSource = html.match(/function mpDamageCandidates[\s\S]*?\n}/)?.[0] || "";
const candidateState = {
  currentActions: new Map([[0, "knife"], [1, "forge"], [2, "forge"], [3, "forge"], [4, "guard"], [5, "catch"]])
};
const candidateFighters = [
  { id: 1, team: 1, skills: [] },
  { id: 2, team: 2, skills: [] },
  { id: 3, team: 3, skills: [] },
  { id: 4, team: 4, skills: [] },
  { id: 5, team: 5, skills: [] }
];
const damageCandidates = new Function(
  "aliveMp", "mpState", "skillEnabledMp",
  `${previewSource};${candidateSource}; return mpDamageCandidates;`
)(() => candidateFighters, candidateState, () => false);
const knifeTargets = damageCandidates(
  candidateFighters,
  { key: "knife", level: 1, attacker: { team: 0, skills: [] } },
  candidateState.currentActions
);
assert.deepEqual(
  knifeTargets.map(f => f.id),
  [1, 2, 3, 5],
  "Knife judgement must exclude Guard but retain Forge and Catch users"
);

console.log("通过：多人主动承伤条件与双方怪兽单次猜拳检查。");
