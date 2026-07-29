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

const originalRandom = Math.random;
Math.random = () => 0;
try {
  assert.equal(
    chooseAiMove("hell", { ...base, aiEnergy: 1, playerEnergy: 0 }, "forge"),
    "knife",
    "面对锻造时，应选择可负担的攻击直接命中"
  );
  assert.equal(
    chooseAiMove("hell", { ...base, aiEnergy: 1, playerEnergy: 1 }, "scissors"),
    "forge",
    "剪刀模式下，应识别锻造对剪刀的克制"
  );
} finally {
  Math.random = originalRandom;
}

console.log("通过：AI强制规则与策略分支。");
