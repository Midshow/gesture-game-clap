import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { loadGame } from './helpers/offline-game.mjs';
const require = createRequire(import.meta.url);
const core = require('../wechat-minigame/js/core.js');
const { createMatch, legalMoves, chooseAi, settle, settings } = require('../wechat-minigame/js/match.js');

test('项目使用小程序入口，所有页面资源齐全', () => {
  const root = new URL('../wechat-minigame/', import.meta.url);
  const config = JSON.parse(fs.readFileSync(new URL('project.config.json', root)));
  assert.equal(config.compileType, 'miniprogram');
  assert.equal(config.appid, 'wx01fee00acfaa4d5e');
  const app = JSON.parse(fs.readFileSync(new URL('app.json', root)));
  for (const p of app.pages) for (const ext of ['js','json','wxml','wxss']) assert.ok(fs.existsSync(new URL(p + '.' + ext, root)));
});

test('微信规则生成文件与正式版保持同步', () => {
  execFileSync(process.execPath, ['tools/sync-wechat-core.cjs', '--check']);
});
test('全部121组基础行动和锻数结算与v2.5.8.2一致', () => {
  const g = loadGame();
  for (const p of core.MOVE_KEYS) for (const a of core.MOVE_KEYS) {
    const expected = JSON.parse(JSON.stringify(g(`resolveDuelCombat('${p}','${a}')`)));
    assert.deepEqual(core.resolveDuelCombat(p, a), expected, `${p}/${a}`);
    const reset = g(`basicRoundShouldReset(resolveDuelCombat('${p}','${a}'))`);
    for (const energy of [6, 7, 15]) {
      const state = createMatch({ scissors: true }); state.playerEnergy = energy; state.aiEnergy = energy;
      settle(state, p, a);
      assert.equal(state.playerEnergy, g(`basicEnergyAfterRound(${energy},'${p}',${expected.playerHit},${reset})`));
      assert.equal(state.aiEnergy, g(`basicEnergyAfterRound(${energy},'${a}',${expected.aiHit},${reset})`));
    }
  }
});
test('命中计分、接闪清零、抵刀扣锻及结束后拒绝出手', () => {
  const s = createMatch({ winScore: 1 });
  settle(s, 'forge', 'forge'); assert.equal(s.playerEnergy, 1);
  settle(s, 'knife', 'knife'); assert.equal(s.playerEnergy, 0); assert.equal(s.round, 1);
  s.playerEnergy = s.aiEnergy = 5;
  settle(s, 'catch', 'katana'); assert.equal(s.playerEnergy, 0); assert.equal(s.aiEnergy, 0); assert.equal(s.round, 2);
  s.playerEnergy = s.aiEnergy = 5;
  settle(s, 'flash', 'dragonFang'); assert.equal(s.round, 3); assert.equal(s.aiEnergy, 0);
  s.playerEnergy = 1;
  settle(s, 'knife', 'forge'); assert.equal(s.playerScore, 1); assert.equal(s.over, true);
  assert.throws(() => settle(s, 'forge', 'forge'));
});
test('非法行动不改变对局、设置清洗、剪刀开关', () => {
  assert.deepEqual(settings({winScore: -1, difficulty: 'bad', scissors: 'yes'}), settings());
  const s = createMatch(); const before = JSON.stringify(s);
  for (const key of ['void', 'scissors', '__proto__', 'missing']) assert.throws(() => settle(s, key, 'forge'));
  assert.equal(JSON.stringify(s), before);
  s.playerEnergy = s.aiEnergy = 1;
  assert.throws(() => settle(s, 'scissors', 'forge'));
  s.settings.scissors = true; settle(s, 'scissors', 'forge'); assert.equal(s.aiScore, 1);
});
test('AI仅选择合法行动，模拟完整对局并限制战报长度', () => {
  let seed = 123;
  const rng = () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 4294967296);
  for (const difficulty of ['easy', 'normal']) for (const scissors of [false, true]) {
    for (let game = 0; game < 25; game++) {
      const s = createMatch({difficulty, scissors});
      let steps = 0;
      while (!s.over && steps++ < 500) {
        const a = chooseAi(s, rng), legal = legalMoves(s.playerEnergy, scissors);
        assert.ok(legalMoves(s.aiEnergy, scissors).includes(a));
        settle(s, legal[Math.floor(rng() * legal.length)], a);
        assert.ok(s.playerEnergy >= 0 && s.aiEnergy >= 0);
      }
      assert.ok(s.over); assert.ok(s.log.length <= 100);
    }
  }
});
