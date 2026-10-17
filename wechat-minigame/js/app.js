const { MOVES, MOVE_KEYS } = require('./core');
const { settings, createMatch, legalMoves, chooseAi, settle } = require('./match');

const COLOR = { bg: '#f5f0e7', ink: '#292a25', muted: '#77786e', red: '#ad4436',
  white: '#fffdf8', line: '#ddd6ca', pale: '#e9e3d8', green: '#386a58' };
const STORAGE = 'hezhang.wechat.settings.v1';

function createApp(platform) {
  const canvas = platform.createCanvas(), ctx = canvas.getContext('2d');
  let config;
  try { config = settings(platform.getStorageSync(STORAGE)); } catch (_) { config = settings(); }
  let page = 'home', match = null, result = null, committedAi = null;
  let width = 390, height = 844, ratio = 1, top = 24, bottom = 20;
  let scroll = 0, limit = 0, hits = [], finger = null, lastY = 0, contentPass = false;
  const W = 390;

  function resize() {
    const info = platform.getWindowInfo ? platform.getWindowInfo() : platform.getSystemInfoSync();
    width = info.windowWidth; height = info.windowHeight; ratio = Math.min(info.pixelRatio || 1, 3);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    const scale = W / width;
    top = Math.max(20, (info.safeArea ? info.safeArea.top : 24) * scale);
    if (platform.getMenuButtonBoundingClientRect) {
      try { top = Math.max(top, platform.getMenuButtonBoundingClientRect().bottom * scale + 10); } catch (_) {}
    }
    bottom = Math.max(16, (info.safeArea ? Math.max(0, height - info.safeArea.bottom) : 16) * scale);
    draw();
  }
  function text(value, x, y, size = 15, color = COLOR.ink, align = 'left', bold = false) {
    ctx.fillStyle = color; ctx.font = `${bold ? 'bold ' : ''}${size}px sans-serif`;
    ctx.textAlign = align; ctx.textBaseline = 'top'; ctx.fillText(String(value), x, y);
  }
  function panel(x, y, w, h, fill = COLOR.white) {
    ctx.fillStyle = fill; ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = COLOR.line; ctx.lineWidth = 1; ctx.strokeRect(x + .5, y + .5, w - 1, h - 1);
  }
  function button(label, x, y, w, h, action, options = {}) {
    panel(x, y, w, h, options.disabled ? COLOR.pale : options.primary ? COLOR.red : COLOR.white);
    text(label, x + w / 2, y + (options.sub ? 13 : (h - 16) / 2), 16,
      options.disabled ? COLOR.muted : options.primary ? COLOR.white : COLOR.ink, 'center', true);
    if (options.sub) text(options.sub, x + w / 2, y + 37, 11, COLOR.muted, 'center');
    if (!options.disabled) hits.push({ x, y, w, h, action, body: contentPass });
  }
  function wrap(value, x, y, maxWidth = 318, size = 14, color = COLOR.muted) {
    ctx.font = `${size}px sans-serif`;
    let line = '';
    for (const char of value) {
      if (char === '\n' || ctx.measureText(line + char).width > maxWidth) {
        text(line, x, y, size, color); y += size + 9; line = char === '\n' ? '' : char;
      } else line += char;
    }
    if (line) { text(line, x, y, size, color); y += size + 9; }
    return y;
  }
  function navigate(next) { page = next; scroll = 0; draw(); }
  function save() {
    try { platform.setStorageSync(STORAGE, config); }
    catch (_) { platform.showToast({ title: '设置暂未保存', icon: 'none' }); }
    draw();
  }
  function start() {
    match = createMatch(config); result = null; committedAi = chooseAi(match); navigate('battle');
  }
  function leave() {
    if (page === 'battle' && !match.over) {
      platform.showModal({ title: '返回首页？', content: '本局进度将结束。',
        success(res) { if (res.confirm) { match = null; navigate('home'); } } });
    } else navigate('home');
  }
  function play(key) {
    if (page !== 'battle' || result || match.over) return;
    result = settle(match, key, committedAi); committedAi = null; scroll = 0; draw();
  }
  function draw() {
    const H = height * W / width, scale = canvas.width / W;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.fillStyle = COLOR.bg; ctx.fillRect(0, 0, W, H); hits = []; contentPass = false;
    text('合 掌', 22, top, 25, COLOR.ink, 'left', true);
    text('微信小程序 · 基础对战测试版', 22, top + 35, 11, COLOR.muted);
    if (page !== 'home') button('首页', 302, top, 66, 38, leave);
    const origin = top + 80, end = H - bottom - 24;
    ctx.save(); ctx.beginPath(); ctx.rect(0, origin, W, Math.max(0, end - origin)); ctx.clip(); contentPass = true;
    let y = origin - scroll;
    if (page === 'home') {
      panel(22, y, 346, 190);
      text('见招，拆招。', 42, y + 26, 29, COLOR.red, 'left', true);
      wrap('从一次锻造开始，猜中对手的下一手。\n锻造蓄力，攻防博弈，命中得分。', 42, y + 78, 302);
      text('规则基于网页版 v2.5.8.2', 42, y + 158, 12, COLOR.muted); y += 210;
      button(match && !match.over ? '开始新对局' : '开始对战', 22, y, 346, 56, start, { primary: true }); y += 70;
      button('对局设置', 22, y, 168, 50, () => navigate('settings'));
      button('玩法说明', 200, y, 168, 50, () => navigate('rules')); y += 75;
      y = wrap('当前开放：双人基础 AI 对战，可选剪刀。\n角色技能、多人模式与真人联机尚未开放。', 24, y, 342, 13);
    } else if (page === 'settings') {
      text('每局胜分', 22, y, 19, COLOR.ink, 'left', true); y += 34;
      [1, 3, 5].forEach((v, i) => button(`${v} 分`, 22 + i * 118, y, 110, 48, () => { config.winScore = v; save(); }, { primary: config.winScore === v })); y += 76;
      text('AI 难度', 22, y, 19, COLOR.ink, 'left', true); y += 34;
      ['easy', 'normal'].forEach((v, i) => button(i ? '普通' : '入门', 22 + i * 178, y, 168, 48, () => { config.difficulty = v; save(); }, { primary: config.difficulty === v })); y += 76;
      button(`剪刀模式：${config.scissors ? '开启' : '关闭'}`, 22, y, 346, 50, () => { config.scissors = !config.scissors; save(); }); y += 72;
      y = wrap('设置自动保存在本机，并在新对局生效。\nAI 根据双方锻数和历史行动选择招式，在你本次出招前确定行动。', 24, y, 340);
    } else if (page === 'rules') {
      y = wrap('先达到目标分数者获胜。攻击命中得1分；命中、接成功或闪成功后，双方锻数清零，进入下一回合。同级攻击相抵。', 24, y, 340, 15, COLOR.ink) + 20;
      for (const key of MOVE_KEYS) {
        const m = MOVES[key];
        text(`${m.name} · ${m.cost} 锻`, 24, y, 17, COLOR.red, 'left', true); y += 28;
        const rule = key === 'forge' ? '未被命中时获得1锻。剪刀与锻造相遇时，锻造克制剪刀。' : m.rule;
        y = wrap(rule, 24, y, 340) + 18;
      }
    } else if (page === 'log') {
      text('对战记录 · 最近100次出手', 22, y, 18, COLOR.ink, 'left', true); y += 38;
      button('返回对局', 22, y, 346, 44, () => navigate('battle')); y += 64;
      if (!match.log.length) { text('尚未出手。', 24, y, 15, COLOR.muted); y += 40; }
      for (const e of match.log) {
        text(`第${e.round}回合 · 出手${e.step}`, 24, y, 12, COLOR.muted); y += 24;
        text(`你：${MOVES[e.player].name}   /   AI：${MOVES[e.ai].name}`, 24, y, 16, COLOR.ink, 'left', true); y += 27;
        y = wrap(e.title + '。' + e.detail + (e.reset ? ' 本次双方锻数归零。' : ''), 24, y, 340) + 18;
      }
    } else if (page === 'battle') {
      text(`第 ${match.round} 回合 · 出手 ${match.step}`, 22, y, 13, COLOR.muted);
      text(`先得 ${match.settings.winScore} 分`, 366, y, 13, COLOR.muted, 'right'); y += 28;
      panel(22, y, 346, 102);
      text('你', 78, y + 14, 14, COLOR.muted, 'center'); text('AI', 310, y + 14, 14, COLOR.muted, 'center');
      text(`${match.playerScore} : ${match.aiScore}`, 195, y + 20, 32, COLOR.red, 'center', true);
      text(`${match.playerEnergy} 锻`, 78, y + 56, 24, COLOR.ink, 'center', true);
      text(`${match.aiEnergy} 锻`, 310, y + 56, 24, COLOR.ink, 'center', true); y += 122;
      if (result) {
        text(`你 · ${MOVES[result.player].name}    AI · ${MOVES[result.ai].name}`, 22, y, 18, COLOR.ink, 'left', true); y += 32;
        text(result.title, 22, y, 21, COLOR.red, 'left', true); y += 34;
        y = wrap(result.detail + (result.reset ? ' 双方锻数已归零。' : ''), 24, y, 340) + 16;
        if (match.over) {
          text(match.playerScore > match.aiScore ? '本局获胜！' : '本局 AI 获胜', 22, y, 26, COLOR.red, 'left', true); y += 46;
          button('再来一局', 22, y, 346, 52, start, { primary: true });
        } else button('继续出招', 22, y, 346, 52, () => { result = null; committedAi = chooseAi(match); scroll = 0; draw(); }, { primary: true });
        y += 72;
      } else {
        text('选择本次行动', 22, y, 18, COLOR.ink, 'left', true); y += 31;
        const allowed = legalMoves(match.playerEnergy, match.settings.scissors);
        const keys = MOVE_KEYS.filter(k => k !== 'scissors' || match.settings.scissors);
        keys.forEach((key, i) => {
          const m = MOVES[key];
          button(m.name, 22 + i % 3 * 118, y + Math.floor(i / 3) * 76, 110, 66, () => play(key),
            { disabled: !allowed.includes(key), sub: key === 'forge' ? '+1 锻' : `${m.cost} 锻${m.level ? ' · ' + m.level + '级' : ''}` });
        });
        y += Math.ceil(keys.length / 3) * 76 + 8;
      }
      button('查看战报', 22, y, 346, 44, () => navigate('log')); y += 62;
    }
    limit = Math.max(0, y + scroll - end + 12);
    ctx.restore();
    // Discard clipped buttons so swiping cannot select an off-screen action.
    hits = hits.filter(h => !h.body || (h.y < end && h.y + h.h > origin));
    text(limit ? '上下滑动查看更多' : '本地 AI 对战 · 无需服务器', W / 2, H - bottom - 10, 11, COLOR.muted, 'center');
    if (scroll > limit) { scroll = limit; draw(); }
  }
  platform.onTouchStart(e => {
    const t = e.touches[0]; if (!t) return;
    finger = { x: t.clientX * W / width, y: t.clientY * W / width, moved: false }; lastY = finger.y;
  });
  platform.onTouchMove(e => {
    const t = e.touches[0]; if (!finger || !t) return;
    const y = t.clientY * W / width;
    if (Math.abs(y - finger.y) > 10) finger.moved = true;
    if (finger.moved) { scroll = Math.max(0, Math.min(limit, scroll + lastY - y)); draw(); }
    lastY = y;
  });
  platform.onTouchEnd(e => {
    if (!finger) return;
    const start = finger; finger = null;
    const t = e.changedTouches[0]; if (!t || start.moved) return;
    const x = t.clientX * W / width, y = t.clientY * W / width;
    if (Math.hypot(x - start.x, y - start.y) > 12) return;
    const origin = top + 80, end = height * W / width - bottom - 24;
    const hit = hits.find(h => x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h &&
      (!h.body || (y >= origin && y < end)));
    if (hit) hit.action();
  });
  if (platform.onTouchCancel) platform.onTouchCancel(() => { finger = null; });
  if (platform.onWindowResize) platform.onWindowResize(resize);
  if (platform.onShow) platform.onShow(() => { finger = null; resize(); });
  resize();
  return { canvas };
}
module.exports = { createApp };
