import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const archive = fs.readdirSync(root).find(name => name.includes("正式版本存档"));
const filename = fs.readdirSync(path.join(root, archive)).find(name => name.includes("v2.5.5.html"));
const html = fs.readFileSync(path.join(root, archive, filename), "utf8");
const script = html.match(/<script>([\s\S]*)<\/script>/)?.[1];

assert.ok(script);
assert.doesNotThrow(() => new Function(script), "The single-file script must remain syntactically valid");
assert.match(html, /function mpDamageCandidates/);
assert.match(html, /if\(!available\.length\)return settleAllMpDefenses/);
assert.match(html, /async function mpActiveAllowed/);
assert.match(html, /await resolveMpFisherChallenge\(fisher,actor\)/);
assert.match(html, /async function resolveMpFisherChallenge/);
assert.doesNotMatch(
  html.match(/async function mpActiveAllowed[\s\S]*?\n}\nasync function resolveMpFisherChallenge/)?.[0] || "",
  /Math\.random\(\)<\.5/,
  "Fisherman challenge must not be resolved by a 50% kill roll"
);
assert.match(html, /fisher\.hook=false;actor\.hp=0/);
assert.match(html, /鱼钩保留/);
assert.match(html, /function mpFisherCanChallengeSkill/);

console.log("通过：多人判刀候选过滤与渔夫实际无技能对局检查。");
