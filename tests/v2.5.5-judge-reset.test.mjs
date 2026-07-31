import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const archive = fs.readdirSync(root).find(name => name.includes("正式版本存档"));
const filename = fs.readdirSync(path.join(root, archive)).find(name => name.includes("v2.5.5.html"));
const html = fs.readFileSync(path.join(root, archive, filename), "utf8");

const judgeDuelSettlement = html.match(
  /async function resolveMpJudgeDuel[\s\S]*?\n}\nfunction preventJudgeDialogClose/
)?.[0] || "";

assert.match(
  judgeDuelSettlement,
  /MOVES\[leftMove\]\.gain&&!result\.playerHit/,
  "Multiplayer judge: a forge action hit by an attack must not gain energy"
);
assert.match(
  judgeDuelSettlement,
  /if\(result\.reset\)\{left\.energy=0;right\.energy=0;\}/,
  "Multiplayer judge: a reset must clear both energy values"
);

console.log("通过：审判追加对局的锻造受击与重开清能量检查。");
