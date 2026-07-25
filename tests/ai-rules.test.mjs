import assert from "node:assert/strict";
import { chooseAiMove } from "../js/ai.js";

const base = {
  history: [],
  weaponHistory: [],
  skillsEnabled: false,
  scissorsEnabled: true
};

for (const difficulty of ["easy", "normal", "hard", "hell"]) {
  assert.equal(
    chooseAiMove(difficulty, { ...base, aiEnergy: 0, playerEnergy: 0 }),
    "forge",
    `${difficulty}难度在双方0能量时必须锻造`
  );
  assert.equal(
    chooseAiMove(difficulty, { ...base, aiEnergy: 6, playerEnergy: 4 }),
    "void",
    `${difficulty}难度在AI有6能量时必须使用虚无`
  );
}

console.log("通过：AI两条强制规则。");
