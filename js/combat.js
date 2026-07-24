import { MOVES } from "./moves.js";

function outcome(playerHit = false, aiHit = false, reset = false, title = "", detail = "") {
  return { playerHit, aiHit, reset, title, detail };
}

export function resolveCombat(playerKey, aiKey) {
  const player = MOVES[playerKey];
  const ai = MOVES[aiKey];
  if (!player || !ai) throw new Error("未知招式");

  if (player.type === "basic" && ai.type === "basic") {
    if (playerKey === "forge" && aiKey === "forge") return outcome(false, false, false, "双方锻造", "各获得1格能量。");
    return outcome(false, false, false, "相互试探", "没有人被击中。");
  }
  if (playerKey === "forge" && ai.type === "attack") return outcome(true, false, false, `${ai.name}命中`, "锻造时没有防御。");
  if (aiKey === "forge" && player.type === "attack") return outcome(false, true, false, `${player.name}命中`, "锻造时没有防御。");
  if (player.type === "attack" && ai.type === "attack") {
    if (player.level === ai.level) return outcome(false, false, false, "抵刀", `${player.level}级对${ai.level}级，双方均不受伤。`);
    return player.level > ai.level
      ? outcome(false, true, false, `${player.name}压制${ai.name}`, "高级攻击压制低级攻击。")
      : outcome(true, false, false, `${ai.name}压制${player.name}`, "高级攻击压制低级攻击。");
  }
  if (player.type === "attack") return attackVsDefense(playerKey, aiKey, false);
  if (ai.type === "attack") return attackVsDefense(aiKey, playerKey, true);
  return outcome(false, false, false, "相互试探", "没有人被击中。");
}

function attackVsDefense(attackKey, defenseKey, defenderIsPlayer) {
  const attack = MOVES[attackKey];
  const defense = MOVES[defenseKey];
  const blocked = Array.isArray(defense.blocks) && defense.blocks.includes(attack.level);
  if (blocked) {
    return outcome(false, false, Boolean(defense.resets), `${defense.name}成功`, `${defense.name}挡住了${attack.level}级${attack.name}${defense.resets ? "，双方能量归零" : ""}。`);
  }
  return defenderIsPlayer
    ? outcome(true, false, false, `${attack.name}突破${defense.name}`, `${defense.name}无法防御${attack.level}级攻击。`)
    : outcome(false, true, false, `${attack.name}突破${defense.name}`, `${defense.name}无法防御${attack.level}级攻击。`);
}
