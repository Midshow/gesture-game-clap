import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const archive = path.join(root, "合掌网页版-正式版本存档");
const v255 = fs.readFileSync(path.join(archive, "合掌网页版v2.5.5.html"), "utf8");
const v256 = fs.readFileSync(path.join(archive, "合掌网页版v2.5.6.html"), "utf8");
const script = v256.match(/<script>([\s\S]*)<\/script>/)?.[1];

assert.ok(script, "v2.5.6 必须包含内嵌脚本");
assert.doesNotThrow(() => new Function(script), "v2.5.6 内嵌脚本必须通过语法检查");
assert.match(v255, /APP_VERSION = "2\.5\.5"/, "v2.5.5 存档必须保持原版本号");
assert.match(v256, /APP_VERSION = "2\.5\.6"/);

assert.match(v256, /const SKILL_RULES=Object\.freeze/);
assert.match(v256, /function activeSkillRules/);
assert.match(v256, /function createAiContext/);
assert.match(v256, /function createModeStatePort/);
assert.match(v256, /const DUEL_STATE_PORT=createModeStatePort\("duel"/);
assert.match(v256, /const MULTIPLAYER_STATE_PORT=createModeStatePort\("multiplayer"/);
assert.match(v256, /statePort:DUEL_STATE_PORT/);
assert.match(v256, /statePort:MULTIPLAYER_STATE_PORT/);
assert.match(v256, /async function runDuelTransaction/);
assert.match(v256, /DUEL_STATE_PORT\.snapshot\(\)/);
assert.match(v256, /DUEL_STATE_PORT\.restore\(snapshot\)/);

assert.match(v256, /const SHARED_SERVICES=Object\.freeze/);
assert.match(v256, /resolveNoSkillChallenge/);
assert.doesNotMatch(v256, /resolveMpFisherChallenge/, "共享的无技能挑战不得继续带有多人专属命名");
assert.match(v256, /id:"duel-v3",mode:"duel"/);
assert.match(v256, /id:"multiplayer-v3",mode:"multiplayer"/);

assert.match(v256, /resolveSoloMonsterDuel[\s\S]*?attempt<=32/);
assert.match(v256, /resolveMpMonsterDuel[\s\S]*?attempt<=32/);
assert.match(v256, /怪兽猜拳连续32次平局：触发安全兜底/);

assert.match(v256, /availableMoveKeys\(f\.skill,f,false\)/, "多人合法行动必须识别秘偶和后天获得的技能");
assert.match(v256, /秘偶：\$\{SKILLS\[f\.dollSkill\]\.name\}/, "角色卡必须显示秘偶技能名");
assert.match(v256, /async function assignInitialMpDolls/);
assert.match(v256, /const selected=new Set\(mpState\.fighters\.map\(f=>f\.skill\)\)/, "初始秘偶必须排除已选择角色");
assert.match(v256, /roundFlags\.stolen=\{target:t\.id,skills:\[\.\.\.t\.skills\],added\}/);
assert.match(v256, /stolen\.added\|\|\[\]/, "盗贼回合结束时只能移除本次临时新增技能");
assert.match(v256, /async function settleMpDeaths/);
assert.match(v256, /占卜家：是否将当前秘偶替换为/, "真人占卜家必须自主决定是否替换死亡角色秘偶");

console.log("通过：v2.5.6 架构边界、技能注册、AI 上下文与猜拳兜底检查。");
