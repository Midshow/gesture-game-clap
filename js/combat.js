import { MOVES } from "./moves.js";

function outcome(playerHit = false, aiHit = false, reset = false, title = "", detail = "") {
  return { playerHit, aiHit, reset, title, detail };
}

export function resolveCombat(playerKey, aiKey) {
  const player = MOVES[playerKey];
  const ai = MOVES[aiKey];
  if (!player || !ai) throw new Error("未知招式");
  if (playerKey === "scissors" || aiKey === "scissors") return resolveScissors(playerKey, aiKey);

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

function resolveScissors(playerKey, aiKey) {
  if (playerKey === "scissors" && aiKey === "scissors") {
    return outcome(false, false, false, "抵刀", "双方剪刀相抵，均不受伤。");
  }

  const scissorsIsPlayer = playerKey === "scissors";
  const opponentKey = scissorsIsPlayer ? aiKey : playerKey;
  const scissorsWins = ["knife", "katana", "shuriken", "catch"];
  const scissorsLoses = ["forge", "kunai", "dragonFang", "void"];

  if (opponentKey === "guard") {
    return outcome(false, false, false, "防住剪刀", "剪刀被“防”挡住。");
  }
  if (opponentKey === "flash") {
    return outcome(false, false, true, "闪过剪刀", "闪成功躲开剪刀，双方能量重置。");
  }
  if (scissorsWins.includes(opponentKey)) {
    return scissorsIsPlayer
      ? outcome(false, true, false, "剪刀克制", `剪刀击败${MOVES[opponentKey].name}。`)
      : outcome(true, false, false, "剪刀克制", `剪刀击败${MOVES[opponentKey].name}。`);
  }
  if (scissorsLoses.includes(opponentKey)) {
    return scissorsIsPlayer
      ? outcome(true, false, false, `${MOVES[opponentKey].name}克制剪刀`, "剪刀被克制。")
      : outcome(false, true, false, `${MOVES[opponentKey].name}克制剪刀`, "剪刀被克制。");
  }
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
