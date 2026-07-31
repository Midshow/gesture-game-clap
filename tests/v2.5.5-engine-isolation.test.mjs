import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.join(root, "合掌网页版-正式版本存档", "合掌网页版v2.5.5.html");
const html = fs.readFileSync(file, "utf8");
const script = html.match(/<script>([\s\S]*)<\/script>/)?.[1];

assert.ok(script, "v2.5.5 必须包含内嵌脚本");
assert.doesNotThrow(() => new Function(script), "v2.5.5 内嵌脚本必须通过语法检查");
assert.match(html, /APP_VERSION = "2\.5\.5"/);
assert.match(html, /function resolveDuelCombat/);
assert.match(html, /function settleDuelRound/);
assert.match(html, /function resolveMultiplayerJudgeCombat/);
assert.match(html, /const DUEL_ENGINE=Object\.freeze/);
assert.match(html, /const MULTIPLAYER_ENGINE=Object\.freeze/);
assert.match(html, /DUEL_ENGINE\.settleRound/);
assert.match(html, /MULTIPLAYER_ENGINE\.resolveActions/);
assert.match(html, /function createMultiplayerStepContext/);
assert.match(html, /function commitMultiplayerActions/);
assert.match(html, /async function resolveMultiplayerAttackQueue/);
assert.match(html, /function settleMultiplayerForgeAndRoundSkills/);
assert.match(html, /function finalizeMultiplayerStep/);

const multiplayerJudge = html.match(
  /function resolveMultiplayerJudgeCombat[\s\S]*?\n}\n\nasync function resolveMpJudgeDuel/
)?.[0] || "";
assert.doesNotMatch(multiplayerJudge, /resolveDuelCombat/, "多人审判不得调用双人判定器");

const duelSettlement = html.match(
  /async function settleDuelRound[\s\S]*?\n}\n\nfunction populateSkillSelects/
)?.[0] || "";
assert.doesNotMatch(duelSettlement, /mpState|resolveMpActions|applyMpDamage/, "双人结算不得引用多人状态");
assert.match(html, /function createDuelRoundEvent/);
assert.match(html, /async function resolveDuelDamagePipeline/);
assert.match(html, /attackPlayed:/);
assert.match(html, /damageDealt:/);
assert.doesNotMatch(html, /function applySkillDamage/, "旧的混合伤害函数不应继续存在");
assert.match(html, /async function applyDuelMonsterChecks/);

const eventFactorySource = html.match(
  /function createDuelRoundEvent[\s\S]*?\n}\n\nfunction resolveDuelDeclarationRules/
)?.[0].replace(/\n\nfunction resolveDuelDeclarationRules[\s\S]*/, "") || "";
const makeEvent = new Function(
  "skillMove",
  `${eventFactorySource}; return createDuelRoundEvent;`
)((key) => ({ type: ["knife", "katana"].includes(key) ? "attack" : "basic" }));
const suppressedEvent = makeEvent(
  { playerHit: false, aiHit: false, reset: false },
  "knife",
  "katana",
  { suppressed: { player: false, ai: true } }
);
assert.equal(suppressedEvent.attackPlayed.player, true);
assert.equal(suppressedEvent.attackPlayed.ai, false, "被宣言禁止的武器不算作攻击打出");

const absorbSource = html.match(
  /function absorbDuelDamage[\s\S]*?\n}\n\nfunction applySoloPioneerProtection/
)?.[0].replace(/\n\nfunction applySoloPioneerProtection[\s\S]*/, "") || "";
const duelState = {
  player: { doll: 1, dragon: 0, shields: 0 },
  ai: { doll: 0, dragon: 0, shields: 0 }
};
const absorb = new Function(
  "state", "formatNumber", "fighterHasSoloSkill", "data",
  `${absorbSource}; return absorbDuelDamage;`
)(duelState, String, () => false, { settings: { playerSkill: "", aiSkill: "" } });
const overflow = absorb("player", 3, false, []);
assert.equal(overflow.damage, 2, "秘偶只能承担自身剩余血量，超额伤害应继续结算");
assert.equal(duelState.player.doll, 0);

const declarationSource = html.match(
  /function resolveDuelDeclarationRules[\s\S]*?\n}\n\nasync function resolveDuelDamagePipeline/
)?.[0].replace(/\n\nasync function resolveDuelDamagePipeline[\s\S]*/, "") || "";
const declarationState = {
  player: { miracleDeclare: true },
  ai: { miracleDeclare: false }
};
const declaration = new Function(
  "state", "data", "fighterHasSoloSkill", "skillMove",
  `${declarationSource}; return resolveDuelDeclarationRules;`
)(
  declarationState,
  { settings: { playerSkill: "miracle", aiSkill: "generalist" } },
  (skill, fighter, wanted) => wanted === "miracle" && skill === "miracle",
  () => ({ type: "attack", level: 2 })
);
const declared = declaration(
  { playerHit: true, aiHit: true, reset: true, detail: "测试" },
  "katana",
  "katana"
);
assert.equal(declared.result.reset, false, "宣言使攻击无法命中时不得触发接闪重开");
assert.equal(declared.suppressed.ai, true, "同级敌方武器应在打出前被禁止");
assert.equal(declarationState.player.miracleDeclare, false, "宣言结算后应清除本回合状态");

const resistanceSource = html.match(
  /function mpShouldResist[\s\S]*?\n}/
)?.[0] || "";
const shouldResist = new Function(`${resistanceSource}; return mpShouldResist;`)();
const attacks = [
  { attacker: { team: 0 } },
  { attacker: { team: 1 } },
  { attacker: { team: 1 } }
];
assert.equal(shouldResist(attacks, 3), true, "多人三级及以上、至少三把最高级攻击应抵刀");
assert.equal(shouldResist(attacks, 2), false, "二级攻击不得触发多人抵刀");
assert.equal(shouldResist(attacks.slice(0, 2), 6), false, "只有两把攻击不得触发多人抵刀");

const prioritySource = html.match(
  /function selectNextMultiplayerAttack[\s\S]*?\n}/
)?.[0] || "";
const selectNextAttack = new Function(`${prioritySource}; return selectNextMultiplayerAttack;`)();
const priorityWinner = selectNextAttack([
  { damage: 1, level: 6, attacker: { id: 1 } },
  { damage: 10, level: 1, attacker: { id: 2 } }
]);
assert.equal(priorityWinner.attacker.id, 2, "多人承伤名额应优先由更高伤害攻击判定");

console.log("通过：v2.5.5 双人/多人引擎入口与依赖隔离检查。");
