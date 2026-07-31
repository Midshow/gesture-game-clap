import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const archive=fs.readdirSync(root).find(name=>name.includes("正式版本存档"));
const file=fs.readdirSync(path.join(root,archive)).find(name=>name.includes("v2.5.5.html"));
const html=fs.readFileSync(path.join(root,archive,file),"utf8");
const script=html.match(/<script>([\s\S]*)<\/script>/)?.[1];

assert.doesNotThrow(()=>new Function(script));
assert.match(html,/function chooseAiSkillTarget/);
assert.match(html,/secretTarget===victim\.id/);
assert.match(html,/async function soloActiveAllowed/);
assert.match(html,/await resolveMpFisherChallenge\(fisherSide,actorSide\)/);
assert.match(html,/const magicians=aliveMp\(\)\.filter/);
assert.match(html,/hunterTarget:null,saintTarget:null,secretTarget:null,grantedShields:\{\}/);
assert.match(html,/mpState\.phase="round-start"/);
assert.match(html,/mpState\.phase="combat"/);
assert.match(html,/其交出的\$\{granted\}个黑皇帝护盾消失/);
assert.doesNotMatch(
  html.match(/async function soloActiveAllowed[\s\S]*?\n}/)?.[0]||"",
  /Math\.random\(\)<\.5/
);

console.log("通过：角色技能审计修复与AI目标策略检查。");
