module.exports = function(window, document) {var App = function(options) {window.appOptions = options};var self = window.self;var HTMLElement = window.HTMLElement;var Element = window.Element;var Node = window.Node;var localStorage = window.localStorage;var sessionStorage = window.sessionStorage;var navigator = window.navigator;var history = window.history;var location = window.location;var performance = window.performance;var Image = window.Image;var CustomEvent = window.CustomEvent;var Event = window.Event;var requestAnimationFrame = window.requestAnimationFrame;var cancelAnimationFrame = window.cancelAnimationFrame;var getComputedStyle = window.getComputedStyle;var XMLHttpRequest = window.XMLHttpRequest;var Worker = window.Worker;var SharedWorker = window.SharedWorker;window["createApp"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createApp; });
function install(window2, document2, wx2) {
  window2.structuredClone = function clone(value, seen = /* @__PURE__ */ new Map()) {
    if (value === null || typeof value !== "object") return value;
    if (seen.has(value)) return seen.get(value);
    const out = value instanceof Map ? /* @__PURE__ */ new Map() : value instanceof Set ? /* @__PURE__ */ new Set() : Array.isArray(value) ? [] : {};
    seen.set(value, out);
    if (value instanceof Map) value.forEach((v, k) => out.set(clone(k, seen), clone(v, seen)));
    else if (value instanceof Set) value.forEach((v) => out.add(clone(v, seen)));
    else Object.keys(value).forEach((k) => {
      out[k] = clone(value[k], seen);
    });
    return out;
  };
  if (!Array.prototype.at) Object.defineProperty(Array.prototype, "at", { value(n) {
    return this[n < 0 ? this.length + n : n];
  } });
  if (!Object.fromEntries) Object.fromEntries = (entries) => {
    const result = {};
    for (const [k, v] of entries) result[k] = v;
    return result;
  };
  const proto = window2.Element.prototype;
  if (!proto.insertAdjacentHTML) proto.insertAdjacentHTML = function(position, html) {
    const box = this.ownerDocument.createElement("div");
    box.innerHTML = String(html);
    const nodes = Array.from(box.childNodes), where = String(position).toLowerCase();
    if (where === "beforebegin" || where === "afterend") {
      if (!this.parentNode) return;
      const anchor = where === "beforebegin" ? this : this.nextSibling;
      nodes.forEach((node) => this.parentNode.insertBefore(node, anchor));
    } else if (where === "afterbegin") {
      const anchor = this.firstChild;
      nodes.forEach((node) => this.insertBefore(node, anchor));
    } else if (where === "beforeend") nodes.forEach((node) => this.appendChild(node));
    else throw Error("\u4E0D\u652F\u6301\u7684\u63D2\u5165\u4F4D\u7F6E\uFF1A" + where);
  };
  const selectProto = Object.getPrototypeOf(document2.createElement("select"));
  const selectValue = Object.getOwnPropertyDescriptor(selectProto, "value");
  if (selectValue && !selectProto.__hezhangSelectDefault) {
    Object.defineProperty(selectProto, "value", { configurable: true, get() {
      let value = selectValue.get.call(this);
      if (value === void 0 && this.options.length) {
        value = this.options[0].value;
        selectValue.set.call(this, value);
      }
      return value;
    }, set: selectValue.set });
    Object.defineProperty(selectProto, "__hezhangSelectDefault", { value: true });
  }
  if (!proto.replaceChildren) proto.replaceChildren = function(...nodes) {
    this.innerHTML = "";
    nodes.forEach((n) => this.appendChild(n));
  };
  if (!proto.prepend) proto.prepend = function(...nodes) {
    nodes.slice().reverse().forEach((n) => this.insertBefore(n, this.firstChild));
  };
  if (!proto.showModal) proto.showModal = function() {
    this.open = true;
  };
  if (!proto.close) proto.close = function() {
    this.open = false;
    this.dispatchEvent(new window2.Event({ name: "close", target: this }));
  };
  if (!Object.getOwnPropertyDescriptor(proto, "open")) Object.defineProperty(proto, "open", {
    get() {
      return this.classList.contains("wx-open");
    },
    set(value) {
      this.classList.toggle("wx-open", !!value);
    }
  });
  if (!proto.scrollIntoView) proto.scrollIntoView = function() {
  };
  if (!window2.scrollTo) window2.scrollTo = (options) => wx2.pageScrollTo({ scrollTop: options.top || 0, duration: 0 });
  document2.addEventListener("click", (event) => {
    const summary = event.target.closest && event.target.closest("summary");
    if (summary && summary.parentNode) summary.parentNode.open = !summary.parentNode.open;
  });
  document2.addEventListener("change", () => {
    document2.querySelectorAll(".mp-scene-option").forEach((node) => {
      const input = node.querySelector("input");
      node.classList.toggle("wx-selected", Boolean(input && input.checked));
    });
  });
  window2.navigator.vibrate = () => wx2.vibrateShort && wx2.vibrateShort({ type: "light" });
  window2.__saveWechatCard = async (canvas) => {
    try {
      const file = await new Promise((resolve, reject) => wx2.canvasToTempFilePath({ canvas: canvas.$$node, fileType: "png", success: resolve, fail: reject }));
      wx2.previewImage({ urls: [file.tempFilePath] });
    } catch (error) {
      wx2.showToast({ title: "\u6218\u62A5\u751F\u6210\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5", icon: "none" });
    } finally {
      canvas.remove();
    }
  };
}
function createApp() {
  install(window, document, wx);
  const globalThis = window;
  const structuredClone = window.structuredClone;
  const AudioContext = function() {
    return wx.createWebAudioContext();
  };
  document.body.innerHTML = '\n  <header class="topbar">\n    <button class="brand" id="homeButton" aria-label="\u8FD4\u56DE\u9996\u9875">\n      <span class="brand-mark">\u5408</span>\n      <span><strong>\u5408\u638C</strong><small>\u62CD\u4E24\u4E0B\uFF0C\u89C1\u771F\u62DB</small></span>\n    </button>\n    <nav class="top-actions" aria-label="\u5FEB\u6377\u64CD\u4F5C">\n      <select class="quick-mode" id="quickModeSelect" aria-label="\u6E38\u620F\u6A21\u5F0F">\n        <option value="standard">\u6807\u51C6</option>\n        <option value="endless">\u65E0\u5C3D</option>\n        <option value="zen">\u7985</option>\n      </select>\n      <button class="quiet-button" id="statsButton">\u6218\u7EE9</button>\n      <button class="quiet-button" id="rulesButton">\u89C4\u5219</button>\n      <button class="quiet-button" id="settingsButton">\u8BBE\u7F6E</button>\n    </nav>\n  </header>\n\n  <main>\n    <section class="view home-view active" id="homeView" aria-labelledby="heroTitle">\n      <div class="hero">\n        <p class="eyebrow">\u65E0\u9700\u5B89\u88C5 \xB7 \u79BB\u7EBF\u53EF\u73A9 \xB7 \u4E00\u5206\u949F\u4E0A\u624B</p>\n        <h1 id="heroTitle">\u62CD\u4E24\u4E0B\uFF0C<br><em>\u89C1\u771F\u62DB\u3002</em></h1>\n        <p class="hero-copy">\u953B\u9020\u6512\u80FD\u91CF\uFF0C\u653B\u9632\u731C\u5FC3\u601D\u3002\u5148\u8DDF AI \u7EC3\u51E0\u5C40\uFF0C\u518D\u53BB\u627E\u540C\u5B66\u9762\u5BF9\u9762\u5BF9\u51B3\u3002</p>\n        <div class="hero-actions">\n          <button class="primary-button" data-action="start-game">\u5F00\u59CB\u7EC3\u4E60 <span>\u2192</span></button>\n          <button class="secondary-button" id="multiplayerButton">\u591A\u4EBA\u6280\u80FD\u7248</button>\n          <button class="secondary-button" data-action="start-tutorial">\u4E00\u5206\u949F\u6559\u5B66</button>\n        </div>\n      </div>\n\n      <div class="quick-rules" aria-label="\u6838\u5FC3\u89C4\u5219">\n        <article><span>01</span><strong>\u953B\u9020</strong><p>\u83B7\u5F97 1 \u683C\u80FD\u91CF\uFF0C\u4F46\u6B64\u65F6\u6CA1\u6709\u9632\u5FA1\u3002</p></article>\n        <article><span>02</span><strong>\u51FA\u62DB</strong><p>\u6D88\u8017 N \u683C\u80FD\u91CF\uFF0C\u5C31\u662F N \u7EA7\u653B\u51FB\u3002</p></article>\n        <article><span>03</span><strong>\u535A\u5F08</strong><p>\u9AD8\u7EA7\u538B\u4F4E\u7EA7\uFF1B\u9632\u3001\u63A5\u3001\u95EA\u5404\u6709\u6240\u957F\u3002</p></article>\n      </div>\n\n      <div class="home-stats">\n        <div><strong id="homeGames">0</strong><span>\u7D2F\u8BA1\u7EC3\u4E60</span></div>\n        <div><strong id="homeBest">0</strong><span>\u6700\u9AD8\u8FDE\u80DC</span></div>\n        <div><strong id="homeWinRate">\u2014</strong><span>\u7EC3\u4E60\u80DC\u7387</span></div>\n      </div>\n    </section>\n\n    <section class="view game-view" id="gameView" aria-labelledby="gameHeading">\n      <div class="game-toolbar">\n        <div>\n          <p class="eyebrow" id="modeLabel">AI \u7EC3\u4E60 \xB7 \u666E\u901A</p>\n          <h2 id="gameHeading">\u7B2C <span id="roundNumber">1</span> \u56DE\u5408</h2>\n        </div>\n        <div class="score" id="standardScore" aria-label="\u6BD4\u5206">\n          <span><small>\u4F60</small><strong id="playerScore">0</strong></span>\n          <i>:</i>\n          <span><small>AI</small><strong id="aiScore">0</strong></span>\n        </div>\n        <div class="endless-score hidden" id="endlessScore" aria-label="\u65E0\u5C3D\u6A21\u5F0F\u7EDF\u8BA1">\n          <span><small>\u80DC</small><strong id="endlessWins">0</strong></span>\n          <span><small>\u8D1F</small><strong id="endlessLosses">0</strong></span>\n          <span><small>\u8FDE\u80DC</small><strong id="endlessStreak">0</strong></span>\n          <span><small>\u6700\u9AD8</small><strong id="endlessBest">0</strong></span>\n        </div>\n      </div>\n      <div class="score-feedback" id="scoreFeedback" role="status" aria-live="polite"></div>\n      <aside class="first-turn-hint hidden" id="firstTurnHint" aria-label="\u5BF9\u5C40\u63D0\u793A">\n        <b>\u7B2C\u4E00\u5C40\u5C0F\u63D0\u793A</b><span>\u80FD\u91CF\u5728\u53CC\u65B9\u5934\u50CF\u4E0B\u65B9\uFF1B\u53EF\u7528\u62DB\u5F0F\u4EAE\u8D77\uFF1B\u6BCF\u56DE\u5408\u7ED3\u679C\u4F1A\u663E\u793A\u5728\u4E2D\u95F4\u3002</span><button class="text-button" id="dismissFirstHint">\u77E5\u9053\u4E86</button>\n      </aside>\n\n      <div class="duel-board">\n        <article class="fighter ai" id="aiPanel">\n          <div class="fighter-head"><span class="avatar">\u5FCD</span><div><small>\u5BF9\u624B</small><strong>AI \u5FCD\u8005</strong></div></div>\n          <div class="skill-badge hidden" id="aiSkillBadge"></div>\n          <div class="health-row hidden" id="aiHealthRow"><span>\u751F\u547D</span><div class="health-track"><i id="aiHealthBar"></i></div><b id="aiHealthCount">2</b></div>\n          <div class="energy-row"><span>\u80FD\u91CF</span><div class="energy-track" id="aiEnergy"></div><b id="aiEnergyCount">0</b></div>\n          <div class="revealed-move hidden" id="aiMove"><span>\uFF1F</span><strong>\u7B49\u5F85\u51FA\u62DB</strong></div>\n        </article>\n\n        <div class="clash" id="clash">\n          <p id="clashKicker">\u51C6\u5907\u597D\u4E86\u5417\uFF1F</p>\n          <strong id="clashTitle">\u9009\u62E9\u4F60\u7684\u62DB\u5F0F</strong>\n          <span id="clashDetail">\u6BCF\u56DE\u5408\u4F1A\u5148\u62CD\u624B\u4E24\u6B21\uFF0C\u518D\u540C\u65F6\u63ED\u6653\u3002</span>\n          <div class="timer-track hidden" id="timerTrack"><i id="timerBar"></i></div>\n        </div>\n\n        <article class="fighter player" id="playerPanel">\n          <div class="fighter-head"><span class="avatar">\u4F60</span><div><small>\u6311\u6218\u8005</small><strong>\u4F60</strong></div></div>\n          <div class="skill-badge hidden" id="playerSkillBadge"></div>\n          <div class="health-row hidden" id="playerHealthRow"><span>\u751F\u547D</span><div class="health-track"><i id="playerHealthBar"></i></div><b id="playerHealthCount">2</b></div>\n          <div class="energy-row"><span>\u80FD\u91CF</span><div class="energy-track" id="playerEnergy"></div><b id="playerEnergyCount">0</b></div>\n          <div class="revealed-move hidden" id="playerMove"><span>\uFF1F</span><strong>\u7B49\u5F85\u51FA\u62DB</strong></div>\n        </article>\n      </div>\n\n      <section class="move-dock" aria-labelledby="moveTitle">\n        <div class="dock-heading">\n          <div><p class="eyebrow">\u4F60\u7684\u56DE\u5408</p><h3 id="moveTitle">\u9009\u62E9\u62DB\u5F0F</h3></div>\n          <div class="dock-actions"><button class="text-button" id="battleLogButton">\u6218\u6597\u8BB0\u5F55</button><button class="text-button" id="restartButton">\u91CD\u65B0\u5F00\u59CB</button></div>\n        </div>\n        <div class="move-legend" aria-hidden="true">\n          <span><i class="basic-dot"></i>\u84C4\u529B / \u9632\u5FA1</span>\n          <span><i class="attack-dot"></i>\u653B\u51FB</span>\n        </div>\n        <div class="move-grid" id="moveGrid"></div>\n        <p class="dock-hint" id="dockHint">\u80FD\u91CF\u4E0D\u8DB3\u7684\u62DB\u5F0F\u4F1A\u81EA\u52A8\u9501\u5B9A\u3002</p>\n      </section>\n\n      <details class="battle-log" id="battleLog">\n        <summary>\u6218\u6597\u8BB0\u5F55 <span id="logCount">0</span></summary>\n        <ol id="logList"></ol>\n      </details>\n    </section>\n\n    <section class="view multiplayer-view" id="multiplayerView" aria-labelledby="mpHeading">\n      <div class="mp-toolbar">\n        <div><p class="eyebrow" id="mpModeLabel">\u591A\u4EBA\u7EC4\u961F</p><h2 id="mpHeading">\u7B2C <span id="mpRound">1</span> \u56DE\u5408 \xB7 \u7B2C <span id="mpStep">1</span> \u6B21\u51FA\u624B</h2></div>\n        <button class="text-button" id="mpExitButton">\u9000\u51FA\u6BD4\u8D5B</button>\n      </div>\n      <div class="mp-status" id="mpStatus" role="status" aria-live="polite">\u9009\u62E9\u884C\u52A8\u3002\u653B\u51FB\u6309\u7167\u7B49\u7EA7\u4ECE\u9AD8\u5230\u4F4E\u5224\u5200\uFF1B\u865A\u65E0\u7684\u201C6\u7EA7\u201D\u662F\u653B\u51FB\u7B49\u7EA7\u800C\u975E6\u70B9\u4F24\u5BB3\uFF0C\u6BCF\u6B21\u5224\u5200\u53EA\u51B3\u5B9A\u4E00\u540D\u627F\u4F24\u8005\u3002</div>\n      <div class="mp-flow" id="mpFlow" aria-label="\u672C\u6B21\u51FA\u624B\u7ED3\u7B97\u8FDB\u5EA6"><span>\u9009\u62E9\u884C\u52A8</span><span>\u540C\u65F6\u63ED\u62DB</span><span>\u62B5\u5200\u4E0E\u5224\u5200</span><span>\u6280\u80FD\u4E0E\u4F24\u5BB3</span><span>\u91CD\u5F00\u6216\u7EE7\u7EED</span></div>\n      <div class="mp-spectator hidden" id="mpSpectatorControls"><b>\u89C2\u6218\u63A7\u5236</b><button type="button" id="mpSpectatorPause">\u6682\u505C</button><button type="button" id="mpSpectatorStep">\u5355\u6B65</button><button type="button" id="mpSpectatorSpeed">1\xD7</button><button type="button" id="mpSpectatorSkip">\u76F4\u81F3\u7ED3\u675F</button></div>\n      <div class="mp-arena" id="mpArena"></div>\n      <section class="mp-controls">\n        <div class="dock-heading"><div><p class="eyebrow">\u771F\u4EBA\u73A9\u5BB6</p><h3>\u9009\u62E9\u884C\u52A8\u6216\u53D1\u52A8\u6280\u80FD</h3></div></div>\n        <div class="mp-moves" id="mpMoveGrid"></div>\n        <div class="mp-skill-panel hidden" id="mpSkillPanel"></div>\n      </section>\n      <details class="battle-log mp-log" open><summary>\u591A\u4EBA\u6218\u6597\u8BB0\u5F55 <span id="mpLogCount">0</span></summary><ol id="mpLogList"></ol></details>\n    </section>\n  </main>\n\n  <div class="toast" id="toast" role="status" aria-live="polite"></div>\n  <div class="clap-overlay" id="clapOverlay" aria-hidden="true"><span>\u556A\uFF01</span></div>\n\n  <dialog id="rulesDialog">\n    <div class="dialog-head"><div><p class="eyebrow">\u968F\u65F6\u67E5\u9605</p><h2>\u89C4\u5219\u56FE\u9274</h2></div><button class="icon-button" data-close="rulesDialog" aria-label="\u5173\u95ED">\xD7</button></div>\n    <div class="rule-summary"><b>\u653B\u51FB\u7B49\u7EA7 = \u6D88\u8017\u80FD\u91CF\u6570</b><span>\u540C\u7EA7\u62B5\u5200\u4E14\u5747\u4E0D\u53D7\u4F24\uFF0C\u9AD8\u7EA7\u538B\u5236\u4F4E\u7EA7\u3002</span></div>\n    <div class="rule-grid" id="ruleGrid"></div>\n    <h3 class="skill-rules-title">\u6280\u80FD\u6A21\u5F0F \xB7 \u5B8C\u6574\u6280\u80FD\u56FE\u9274</h3>\n    <div class="rule-grid" id="skillRuleGrid"></div>\n    <details class="embedded-rulebook"><summary>\u89C4\u5219\u603B\u5178 \xB7 \u5B8C\u6574 Markdown</summary><pre id="embeddedRulebook"></pre></details>\n  </dialog>\n\n  <dialog id="settingsDialog">\n    <div class="dialog-head"><div><p class="eyebrow">\u672C\u673A\u4FDD\u5B58</p><h2>\u7EC3\u4E60\u8BBE\u7F6E</h2></div><button class="icon-button" data-close="settingsDialog" aria-label="\u5173\u95ED">\xD7</button></div>\n    <form class="settings-form" method="dialog">\n      <label>\u6E38\u620F\u6A21\u5F0F<select id="modeSelect"><option value="standard">\u6807\u51C6 \xB7 \u8FBE\u5230\u76EE\u6807\u80DC\u573A\u7ED3\u675F</option><option value="endless">\u65E0\u5C3D \xB7 \u6301\u7EED\u8BB0\u5F55\u8FDE\u80DC</option><option value="zen">\u7985 \xB7 \u9690\u85CF\u80FD\u91CF\u7684\u65E0\u5C3D\u5BF9\u51B3</option></select></label>\n      <label>AI \u96BE\u5EA6<select id="difficultySelect"><option value="easy">\u7B80\u5355 \xB7 \u57FA\u7840\u7B56\u7565</option><option value="normal">\u666E\u901A \xB7 \u7A33\u5065\u5E94\u5BF9</option><option value="hard">\u56F0\u96BE \xB7 \u6DF1\u5EA6\u9884\u5224</option><option value="hell">\u5730\u72F1 \xB7 \u6781\u9650\u535A\u5F08</option></select></label>\n      <label id="winScoreSetting">\u76EE\u6807\u80DC\u573A<select id="winScoreSelect"><option value="1">\u4E00\u5C40\u5B9A\u80DC\u8D1F</option><option value="3">\u5148\u5F97 3 \u5206</option><option value="5">\u5148\u5F97 5 \u5206</option><option value="7">\u5148\u5F97 7 \u5206</option></select></label>\n      <label class="switch-row"><span>\u56DE\u5408\u8BA1\u65F6<small>\u8D85\u65F6\u81EA\u52A8\u9009\u62E9\u201C\u9632\u201D</small></span><input id="timerToggle" type="checkbox"></label>\n      <label>\u8BA1\u65F6\u79D2\u6570<input id="timerSeconds" type="number" min="0.5" max="15" step="0.5"></label>\n      <label class="switch-row" id="energySetting"><span>\u663E\u793A\u80FD\u91CF<small>\u7985\u6A21\u5F0F\u4F1A\u5F3A\u5236\u9690\u85CF</small></span><input id="energyToggle" type="checkbox"></label>\n      <label class="switch-row"><span>\u6280\u80FD\u6A21\u5F0F<small>\u542F\u7528\u8840\u91CF\u3001\u653B\u51FB\u529B\u548C\u89D2\u8272\u88AB\u52A8</small></span><input id="skillToggle" type="checkbox"></label>\n      <label id="playerSkillSetting">\u4F60\u7684\u6280\u80FD<select id="playerSkillSelect"></select></label>\n      <label id="aiSkillSetting">AI \u6280\u80FD<select id="aiSkillSelect"></select></label>\n      <div class="skill-description hidden" id="skillDescription"></div>\n      <label class="switch-row"><span>\u526A\u5200\u6A21\u5F0F<small>\u52A0\u5165\u6D88\u80171\u80FD\u91CF\u7684\u7279\u6B8A\u653B\u51FB\u201C\u526A\u5200\u201D</small></span><input id="scissorsToggle" type="checkbox"></label>\n      <label class="switch-row"><span>\u97F3\u6548<small>\u62CD\u624B\u548C\u547D\u4E2D\u53CD\u9988</small></span><input id="soundToggle" type="checkbox"></label>\n      <label>\u5168\u5C40\u573A\u666F<div class="mp-scene-picker" role="radiogroup" aria-label="\u6E38\u620F\u80CC\u666F"><label class="mp-scene-option" data-scene="paper"><input type="radio" name="globalScene" value="paper" checked><span>\u7D20\u8272\u7EB8\u9762</span></label><label class="mp-scene-option" data-scene="corridor"><input type="radio" name="globalScene" value="corridor"><span>\u5B66\u6821\u8D70\u5ECA</span></label><label class="mp-scene-option" data-scene="playground"><input type="radio" name="globalScene" value="playground"><span>\u5B66\u6821\u64CD\u573A</span></label></div></label>\n      <button class="primary-button" value="confirm">\u4FDD\u5B58\u5E76\u91CD\u65B0\u5F00\u59CB</button>\n    </form>\n  </dialog>\n\n  <dialog id="tutorialDialog" class="tutorial-dialog">\n    <button class="icon-button tutorial-close" data-close="tutorialDialog" aria-label="\u5173\u95ED">\xD7</button>\n    <div class="tutorial-step" id="tutorialStep"></div>\n    <div class="tutorial-footer"><div class="tutorial-dots" id="tutorialDots"></div><button class="primary-button" id="tutorialNext">\u4E0B\u4E00\u6B65</button></div>\n  </dialog>\n\n  <dialog id="gameOverDialog" class="game-over-dialog">\n    <p class="eyebrow">\u672C\u5C40\u7ED3\u675F</p><div class="result-seal" id="resultSeal">\u80DC</div>\n    <h2 id="gameOverTitle">\u6F02\u4EAE\uFF01</h2><p id="gameOverText"></p>\n    <div class="game-over-actions"><button class="primary-button" id="playAgainButton">\u518D\u6765\u4E00\u5C40</button><button class="secondary-button" id="shareResultButton">\u4FDD\u5B58\u6218\u62A5</button><button class="secondary-button" id="backHomeButton">\u8FD4\u56DE\u9996\u9875</button></div>\n  </dialog>\n  <dialog id="mpGameOverDialog" class="game-over-dialog">\n    <p class="eyebrow">\u591A\u4EBA\u6BD4\u8D5B\u7ED3\u675F</p><div class="result-seal" id="mpResultSeal">\u80DC</div>\n    <h2 id="mpGameOverTitle">\u4F60\u7684\u9635\u8425\u83B7\u80DC</h2><p id="mpGameOverText"></p>\n    <div class="mp-result-roster" id="mpResultRoster"></div>\n    <div class="game-over-actions"><button class="primary-button" id="mpPlayAgainButton">\u91CD\u65B0\u8BBE\u7F6E</button><button class="secondary-button" id="mpShareResultButton">\u4FDD\u5B58\u591A\u4EBA\u6218\u62A5</button><button class="secondary-button" id="mpBackHomeButton">\u8FD4\u56DE\u9996\u9875</button></div>\n  </dialog>\n  <dialog id="mpJudgeDuelDialog" class="mp-judge-duel-dialog">\n    <p class="eyebrow">\u5BA1\u5224\u8005 \xB7 \u65E0\u6280\u80FD\u8FFD\u52A0\u5BF9\u5C40</p><h2 id="mpJudgeDuelTitle">\u5BA1\u5224\u5F00\u59CB</h2>\n    <div class="mp-judge-board">\n      <section><b id="mpJudgeLeftName">\u4F60</b><span id="mpJudgeLeftHp">\u751F\u547D 2</span><span id="mpJudgeLeftEnergy">\u953B 0</span><strong id="mpJudgeLeftMove">\u7B49\u5F85\u51FA\u62DB</strong></section>\n      <div class="mp-judge-center"><b id="mpJudgeDuelStatus">\u9009\u62E9\u884C\u52A8</b><small>\u65E0\u6280\u80FD \xB7 \u65E0\u526A\u5200</small></div>\n      <section><b id="mpJudgeRightName">AI</b><span id="mpJudgeRightHp">\u751F\u547D 2</span><span id="mpJudgeRightEnergy">\u953B 0</span><strong id="mpJudgeRightMove">\u7B49\u5F85\u51FA\u62DB</strong></section>\n    </div>\n    <div class="mp-judge-moves" id="mpJudgeMoveGrid"></div>\n  </dialog>\n  <dialog id="statsDialog">\n    <div class="dialog-head"><div><p class="eyebrow">\u4EC5\u4FDD\u5B58\u5728\u6B64\u8BBE\u5907</p><h2>\u7EC3\u4E60\u6218\u7EE9</h2></div><button class="icon-button" data-close="statsDialog" aria-label="\u5173\u95ED">\xD7</button></div>\n    <div class="stats-grid" id="statsContent"></div>\n  </dialog>\n  <dialog id="multiplayerSetupDialog">\n    <div class="dialog-head"><div><p class="eyebrow">1\u4F4D\u771F\u4EBA + \u591A\u4F4DAI</p><h2>\u591A\u4EBA\u6BD4\u8D5B\u8BBE\u7F6E</h2></div><button class="icon-button" data-close="multiplayerSetupDialog" aria-label="\u5173\u95ED">\xD7</button></div>\n    <form class="settings-form" id="mpSetupForm" method="dialog">\n      <label>\u961F\u4F0D\u6570\u91CF<select id="mpTeamCount"><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option></select></label>\n      <label>\u6BCF\u961F\u4EBA\u6570<select id="mpTeamSize"><option>1</option><option selected>2</option><option>3</option><option>4</option></select></label>\n      <p class="settings-note">\u5224\u5200\u8303\u56F4\uFF1A\u6240\u6709\u654C\u5BF9\u9635\u8425\u5171\u540C\u53C2\u4E0E\uFF1B\u666E\u901A\u653B\u51FB\u4E0D\u80FD\u6307\u5B9A\u76EE\u6807\u961F\u4F0D\u3002</p>\n      <label>\u4F60\u7684\u6280\u80FD<select id="mpPlayerSkill"></select></label>\n      <div class="skill-description" id="mpSkillDescription"></div>\n      <div id="mpAiSkillSelectors" class="mp-ai-skill-selectors"></div>\n      <button class="primary-button" value="confirm">\u5F00\u59CB\u591A\u4EBA\u6BD4\u8D5B</button>\n    </form>\n  </dialog>\n  ';
  document.querySelectorAll("form button").forEach((button) => {
    if (!button.getAttribute("type")) button.setAttribute("type", "submit");
  });
  [["quickModeSelect", "standard"], ["modeSelect", "standard"], ["difficultySelect", "easy"], ["winScoreSelect", "1"], ["mpTeamCount", "2"], ["mpTeamSize", "2"]].forEach(([id, value]) => document.getElementById(id).value = value);
  const APP_VERSION = "2.5.8";
  const ENGINE_MODULES = /* @__PURE__ */ new Map();
  function defineModule(name, api) {
    if (ENGINE_MODULES.has(name)) throw new Error(`\u6A21\u5757\u91CD\u590D\u6CE8\u518C\uFF1A${name}`);
    ENGINE_MODULES.set(name, Object.freeze(api));
    return api;
  }
  function useModule(name) {
    const api = ENGINE_MODULES.get(name);
    if (!api) throw new Error(`\u6A21\u5757\u672A\u6CE8\u518C\uFF1A${name}`);
    return api;
  }
  function escapeHtml(value) {
    return String(value != null ? value : "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }
  const RuleTrace = defineModule("rule-trace", {
    emit(context, code, summary, detail = "", data2 = {}) {
      const record = { code, summary, detail, data: data2, phase: (context == null ? void 0 : context.phase) || "unknown", time: Date.now() };
      if (context) {
        (context.ruleTrace || (context.ruleTrace = [])).push(record);
        if (Array.isArray(context.events)) context.events.push(`\u3010\u89C4\u5219\u3011${summary}${detail ? `\uFF1A${detail}` : ""}`);
      }
      return record;
    },
    reason(code, summary, detail = "", data2 = {}) {
      return { code, summary, detail, data: data2 };
    }
  });
  const MultiplayerRules = defineModule("multiplayer-rules", {
    resistanceMinLevel: 3,
    maxJudgementHitsPerRound: 1,
    damageFloor: 0,
    attackProtection: true,
    defenseQuotaPerAction: 1,
    voidTargets: "all-legal",
    friendlyVoidTargets: "all-other-legal",
    sameLevelOrder: "random",
    samePriorityOrder: "random"
  });
  const SkillTiming = defineModule("skill-timing", /* @__PURE__ */ (() => {
    const handlers = [];
    return {
      register(definition) {
        if (!(definition == null ? void 0 : definition.id) || !definition.mode || !definition.phase || typeof definition.run !== "function") throw new Error("\u6280\u80FD\u65F6\u673A\u6CE8\u518C\u4FE1\u606F\u4E0D\u5B8C\u6574");
        if (handlers.some((item) => item.id === definition.id)) throw new Error(`\u6280\u80FD\u65F6\u673A\u91CD\u590D\u6CE8\u518C\uFF1A${definition.id}`);
        handlers.push(Object.freeze({ ...definition, priority: Number(definition.priority) || 0 }));
      },
      async dispatch(mode, phase, payload) {
        const eligible = handlers.filter((item) => item.mode === mode && item.phase === phase && (!item.when || item.when(payload)));
        const ordered = [];
        for (const priority of [...new Set(eligible.map((item) => item.priority))].sort((a, b) => a - b)) ordered.push(...shuffleEqualPriority(eligible.filter((item) => item.priority === priority)));
        for (const handler of ordered) {
          RuleTrace.emit(payload.context, "SKILL_TIMING", `${handler.label || handler.id}\u8FDB\u5165\u7ED3\u7B97`, `${phase} \xB7 \u4F18\u5148\u7EA7${handler.priority}`);
          await handler.run(payload);
        }
        return payload;
      },
      inspect(mode = null) {
        return handlers.filter((item) => !mode || item.mode === mode).map(({ run, when, ...item }) => item);
      }
    };
    function shuffleEqualPriority(items) {
      const out = [...items];
      for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
      }
      return out;
    }
  })());
  const VOID_COST = 6;
  const ENERGY_DISPLAY_LIMIT = 12;
  const EMBEDDED_RULEBOOK_MD = "# \u5408\u638C v2.5.8 \u89C4\u5219\n\n\u6280\u80FD\u6761\u6587\u4EE5\u300A\u5408\u638C\u6280\u80FD\u7248\uFF08\u7B2C\u4E09\u7248\uFF09\u300B\u4E3A\u51C6\u3002\u4EE5\u4E0B\u4E3A\u7B2C\u4E09\u7248\u5168\u6587\uFF1B\u57FA\u7840\u52A8\u4F5C\u53CA\u672A\u88AB\u7B2C\u4E09\u7248\u6539\u53D8\u7684\u591A\u4EBA\u5224\u5200\u6CBF\u7528 v2.5.7\u3002\u65E7\u7248\u6280\u80FD\u63CF\u8FF0\u4E0D\u518D\u9002\u7528\u3002\n\n\u5408\u638C\u6280\u80FD\u7248\uFF08\u7B2C\u4E09\u7248\uFF09\n\n\u6CE8\u91CA\uFF1A\n\n\u201C\u4E00\u56DE\u5408\u201D\u6307\u4ECE\u4E00\u6B21\u5171\u540C\u5408\u638C\u5F00\u59CB\u5230\u8FBE\u5230\u91CD\u5F00\u6761\u4EF6\u7684\u4E00\u4E2A\u5468\u671F\u3002\n\n\u201C\u4E00\u8F6E\u201D\u6307\u4ECE\u5206\u961F\u5F00\u59CB\u5230\u6E38\u620F\u5206\u51FA\u80DC\u8D1F\u4E3A\u6B62\u7684\u4E00\u6B21\u6E38\u620F\u3002\n\n\u65F6\u95F4\u8282\u70B9\u7684\u987A\u5E8F\u4F9D\u6B21\u4E3A\u4E0A\u4E00\u56DE\u5408\u7ED3\u675F\u540E\u3001\u672C\u56DE\u5408\u5F00\u59CB\u524D\u3001\u672C\u56DE\u5408\u5F00\u59CB\u65F6\u3001\u672C\u56DE\u5408\u4E2D\u3001\u672C      \u56DE\u5408\u7ED3\u675F\u65F6\u3001\u672C\u56DE\u5408\u7ED3\u675F\u540E\u3002\u201C\u672C\u56DE\u5408\u201D\u5305\u62EC\u4ECE\u672C\u56DE\u5408\u5F00\u59CB\u5230\u7ED3\u675F\u7684\u6240\u6709\u65F6\u95F4\u8282\u70B9\u3002\n\n\u8840\u91CF\u4E0D\u5927\u4E8E0\u7684\u89D2\u8272\u76F4\u63A5\u6B7B\u4EA1\u3002\n\n\u6BCF\u56DE\u5408\u5F00\u59CB\u524D\uFF0C\u8840\u91CF\u57280\u52301\u5185\u4E14\u4E0A\u4E00\u56DE\u5408\u672A\u9020\u6210/\u53D7\u5230\u4F24\u5BB3\u7684\u89D2\u8272\u76F4\u63A5\u6B7B\u4EA1\u3002\n\n\u771F\u5B9E\u4F24\u5BB3\u80FD\u76F4\u63A5\u6263\u9664\u89D2\u8272\u672C\u4F53\u7684\u8840\u91CF\u3002\n\n\u62A4\u76FE\u80FD\u62B5\u6321\u4E00\u6B21\u4EFB\u610F\u5927\u5C0F\u7684\u975E\u771F\u5B9E\u4F24\u5BB3\u3002\n\n\u53EA\u6709\u201C\u63A5\u201D\u548C\u201C\u95EA\u201D\u53EF\u4EE5\u5E2E\u961F\u53CB\u9632\u5FA1\u653B\u51FB\u3002\n\n\u5177\u6709\u53CB\u4F24\u7684\u89D2\u8272\u7684\u653B\u51FB\u53EF\u4EE5\u547D\u4E2D\u961F\u53CB\u3002\n\n\u89D2\u8272\u6B7B\u4EA1\u540E\u6240\u6709\u56E0\u5176\u6280\u80FD\u6548\u679C\u5B58\u5728\u7684\u7269\u4F53\u6216\u6548\u679C\u6D88\u5931\u3002\n\n\u88AB\u201C\u9000\u573A\u201D\u7684\u89D2\u8272\u89C6\u4E3A\u79BB\u5F00\u5BF9\u5C40\uFF0C\u4E0D\u53C2\u4E0E\u5BF9\u5C40\u4E14\u65E0\u6CD5\u53D1\u52A8\u6280\u80FD\u3002\n\n\u901A\u8BC6\u8005\uFF082\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u5F53\u4F60\u953B\u9020\u65F6\uFF0C\u82E5\u4F60\u4E0A\u4E00\u6B21\u4F7F\u7528\u7684\u624B\u52BF\u4E5F\u4E3A\u953B\u9020\uFF0C\u6B64\u6B21\u953B\u9020\u89C6\u4E3A2\u953B\u3002\n\n\u767D\u5854\uFF082\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u6BCF\u56DE\u5408\u4F7F\u7528\u6B66\u5668\u65F6\uFF0C\u82E5\u672C\u6B66\u5668\u662F\u672C\u56DE\u5408\u9996\u6B21\u88AB\u6253\u51FA\uFF0C\u5219\u8FD4\u8FD8\u6253\u51FA\u8BE5\u6B66\u5668\u7684\u82B1\u8D39\u3002\n\n\u6B7B\u795E\uFF082\u88400\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u7684\u653B\u51FB\u547D\u4E2D\u540E\u52A01\u8840\u52A01\u653B\u3002\n\n\u66B4\u541B\uFF083\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u5F53\u4F60\u7684\u8840\u91CF\u4E0D\u5927\u4E8E1\u65F6\uFF0C\u4F60\u9020\u6210\u7684\u4F24\u5BB3\u6539\u4E3A10\u70B9\u3002\n\n\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u96502\u6B21\uFF0C\u6BCF\u56DE\u5408\u5F00\u59CB\u65F6\uFF0C\u4F60\u53EF\u4EE5\u8BB0\u5F55\u5F53\u524D\u8840\u91CF\u5E76\u5C06\u8840\u91CF\u8C03\u6574\u81F31\uFF0C\u6B21\u56DE\u5408\u7ED3\u675F\u65F6\uFF0C\u4F60\u5C06\u8840\u91CF\u8C03\u6574\u56DE\u8BB0\u5F55\u7684\u8840\u91CF\u3002\n\n\u5012\u540A\u4EBA\uFF082\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u5176\u4ED6\u89D2\u8272\u6B7B\u4EA1\u65F6\uFF0C\u4F60\u52A00.5\u8840\u3002\n\n\u4E3B\u52A8\u6280\u80FD\uFF1A\u5F53\u4F60\u7684\u653B\u51FB\u547D\u4E2D\u65F6\uFF0C\u4F60\u53EF\u6263\u9664\u81EA\u5DF1X/2\u8840\u5E76\u4EE4\u6B64\u653B\u51FB\u589E\u52A0\u7B49\u91CF\u4F24\u5BB3\u3002\uFF08X\u4E3A\u6B63\u6574\u6570\uFF09\n\n\u5BA1\u5224\u8005\uFF082\u88401\u653B\uFF09\n\n\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u9650\u4E09\u6B21\uFF0C\u6BCF\u56DE\u5408\u7ED3\u675F\u65F6\uFF0C\u82E5\u672C\u56DE\u5408\u6709\u4F24\u5BB3\u9020\u6210\uFF0C\u4F60\u53EF\u4E0E\u4E00\u540D\u5176\u4ED6\u89D2\u8272\u8FDB\u884C\u4E00\u56DE\u5408\u65E0\u6CD5\u4F7F\u7528\u6280\u80FD\u7684\u5BF9\u5C40\uFF0C\u82E5\u4F60\u8D62\uFF0C\u4F60\u5BF9\u5176\u9020\u6210\u4E00\u6B21\u4F24\u5BB3\u3002\n\n\u602A\u517D\uFF082\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u5F53\u4F60\u547D\u4E2D/\u88AB\u547D\u4E2D\u65F6\uFF0C\u4F60\u4E0E\u5BF9\u65B9\u731C\u62F3\uFF0C\u82E5\u53D7\u4F24\u89D2\u8272\u83B7\u80DC\u5219\u9632\u6B62\u6B64\u4F24\u5BB3\u3002\n\n\u6BCD\u4EB2\uFF081\u88401\u653B\uFF09\n\n\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u56DE\u5408\u5F00\u59CB\u65F6\uFF0C\u82E5\u4E0A\u4E00\u56DE\u5408\u6709\u4F24\u5BB3\u9020\u6210\uFF0C\u4F60\u53EF\u4EE4\u4E00\u540D\u89D2\u8272\u52A00.5\u8840\u3002\n\n\u730E\u4EBA\uFF082\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u5F53\u4F60\u6B7B\u4EA1\u65F6\uFF0C\u4F60\u5BF9\u4E00\u540D\u5176\u4ED6\u89D2\u8272\u9020\u62101\u70B9\u771F\u5B9E\u4F24\u5BB3\u3002\n\n\u6218\u58EB\uFF082\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u7684\u201C\u6B66\u58EB\u5200\u201D\u53EF\u547D\u4E2D\u4F7F\u7528\u201C\u9632\u5FA1\u201D\u7684\u89D2\u8272\u4E14\u4F60\u56E0\u6B64\u9020\u6210\u7684\u4F24\u5BB3\u6539\u4E3A0.5\u70B9\u771F\u5B9E\u4F24\u5BB3\u3002\n\n\u523A\u5BA2\uFF082\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u201C\u9632\u5FA1\u201D\u65F6\u65E0\u6CD5\u88AB\u201C\u624B\u91CC\u5251\u201D\u547D\u4E2D\u3002\n\n\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u9650\u4E00\u6B21\uFF0C\u4F60\u4F7F\u7528\u201C\u5C0F\u5200\u201D\u547D\u4E2D\u5176\u4ED6\u89D2\u8272\u65F6\u4F60\u53EF\u4EE5\u4EE4\u6B64\u653B\u51FB\u7684\u4F24\u5BB3\u589E\u52A00.5\u70B9\u3002\n\n\u7AA5\u79D8\u4EBA\uFF082\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u4F7F\u7528\u201C\u9F99\u7259\u201D\u548C\u201C\u865A\u65E0\u201D\u7684\u82B1\u8D39-1\u4E14\u5FC5\u5B9A\u547D\u4E2D\u3002\n\n\u6BCF\u8F6E\u6E38\u620F\u5F00\u59CB\u524D\uFF0C\u4F60\u4EE4\u4E00\u540D\u5176\u4ED6\u89D2\u8272\u5177\u6709\u201C\u7AA5\u79D8\u201D\u6807\u8BB0\u3002\u6709\u201C\u7AA5\u79D8\u201D\u6807\u8BB0\u7684\u89D2\u8272\u53D7\u5230\u4F24\u5BB3\u65F6\uFF0C\u4F60\u52A01\u8840\u3002\n\n\u56DA\u5F92\uFF082\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u7684\u201C\u95EA\u201D\u82B1\u8D39-2\uFF0C\u4F60\u7684\u653B\u51FB\u82B1\u8D39+1\u3002\n\n\u4F60\u6210\u529F\u201C\u95EA\u201D\u5076\u6570\u6B21\u540E\uFF0C\u4F60\u7684\u653B\u51FB\u82B1\u8D39-1\uFF08\u81F3\u5C11\u4E3A1\uFF09\u3002\n\n\u76D7\u8D3C\uFF082\u88401\u653B\uFF09\n\n\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u9650\u4E24\u6B21\uFF0C\u4F60\u53EF\u4EE5\u9009\u62E9\u4E00\u540D\u5176\u4ED6\u89D2\u8272\u5E76\u89C6\u4E3A\u62E5\u6709\u5176\u5269\u4F59\u6280\u80FD\uFF0C\u5176\u89C6\u4E3A\u5931\u53BB\u5176\u6280\u80FD\uFF0C\u6301\u7EED\u4E00\u56DE\u5408\u3002\u82E5\u5176\u4E8E\u8BE5\u56DE\u5408\u5185\u6B7B\u4EA1\uFF0C\u4F60\u83B7\u5F97\u5176\u6280\u80FD\u3002\n\n\u9ED1\u7687\u5E1D\uFF081\u88401\u653B3\u62A4\u76FE\uFF09\n\n\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u56DE\u5408\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u51CF1\u62A4\u76FE\u5E76\u4EE4\u4E00\u540D\u5176\u4ED6\u89D2\u8272\u52A01\u62A4\u76FE\u3002\n\n\u6076\u9B54\uFF083\u88400\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u6BCF\u56DE\u5408\u7ED3\u675F\u65F6\uFF0C\u4F60\u52A00.5\u653B\u3002\u4F60\u5177\u6709\u53CB\u4F24\u3002\n\n\u89C2\u4F17\uFF082\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u4E00\u540D\u89D2\u8272\u201C\u9000\u573A\u201D\u540E\uFF0C\u82E5\u5176\u4E0D\u5B58\u5728\u961F\u53CB\u4ECD\u5728\u5BF9\u5C40\u5185\uFF0C\u5176\u53D7\u52301\u70B9\u771F\u5B9E\u4F24\u5BB3\u3002\n\n\u4E3B\u52A8\u6280\u80FD\uFF1A\u4F60\u7684\u975E\u201C\u5C0F\u5200\u201D\u653B\u51FB\u547D\u4E2D\u540E\uFF0C\u4F60\u53EF\u4EE5\u9009\u62E9\u4F60\u4EE5\u53CA\u81F3\u591A2\u540D\u5176\u4ED6\u89D2\u8272\u201C\u9000\u573A\u201D\u4E00\u56DE\u5408\u3002\n\n\u9ED1\u591C\uFF082\u88401\u653B\uFF09\n\n\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u6307\u5B9A\u4E00\u540D\u5176\u4ED6\u89D2\u8272\uFF0C\u5176\u89C6\u4E3A\u5931\u53BB\u5176\u88AB\u52A8\u6280\u80FD\u3002\n\n\u9886\u57DF\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u9650\u4E00\u6B21\uFF0C\u6BCF\u56DE\u5408\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u4EE4\u672C\u56DE\u5408\u6240\u6709\u654C\u65B9\u89D2\u8272\u5177\u6709\u53CB\u4F24\u3002\n\n\u592A\u9633\uFF082\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u9020\u6210\u7684\u4F24\u5BB3\u6539\u4E3A\u771F\u5B9E\u4F24\u5BB3\u3002\n\n\u9886\u57DF\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u9650\u4E24\u6B21\uFF0C\u6BCF\u56DE\u5408\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u7533\u660E\u4E00\u79CD\u653B\u51FB\uFF0C\u672C\u56DE\u5408\u6240\u6709\u654C\u65B9\u89D2\u8272\u65E0\u6CD5\u4F7F\u7528\u8BE5\u653B\u51FB\u3002\n\n\u5B66\u5F92\uFF082\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u5F53\u4F60\u547D\u4E2D\u89D2\u8272\u65F6\uFF0C\u82E5\u4F60\u6CA1\u6709\u5176\u6280\u80FD\uFF0C\u4F60\u83B7\u5F97\u5176\u5269\u4F59\u6280\u80FD\u3002\n\n\u5360\u535C\u5BB6\uFF081\u88401\u653B\uFF09\n\n\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u9009\u62E9\u5E76\u83B7\u5F97\u4E00\u4E2A\u672A\u88AB\u9009\u62E9\u8FC7\u7684\u89D2\u8272\u7684\u201C\u79D8\u5076\u201D\u5176\u8840\u91CF\u4E3A1\u3002\u5F53\u4F60\u62E5\u6709\u201C\u79D8\u5076\u201D\u65F6\uFF0C\u4F60\u89C6\u4E3A\u62E5\u6709\u5176\u5BF9\u5E94\u89D2\u8272\u6280\u80FD\uFF0C\u5F53\u4F60\u53D7\u5230\u975E\u771F\u5B9E\u4F24\u5BB3\u65F6\uFF0C\u4F18\u5148\u6263\u9664\u201C\u79D8\u5076\u201D\u8840\u91CF\u3002\u5F53\u6709\u53CB\u65B9\u89D2\u8272\u6B7B\u4EA1\u65F6\uFF0C\u4F60\u53EF\u4EE5\u79FB\u9664\u5F53\u524D\u201C\u79D8\u5076\u201D\uFF0C\u6539\u4E3A\u83B7\u5F97\u8BE5\u89D2\u8272\u7684\u201C\u79D8\u5076\u201D\u3002\n\n\u5B88\u536B\uFF082\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u65E0\u6CD5\u4F7F\u7528\u201C\u953B\u9020\u201D\u3002\u5F53\u4F60\u201C\u9632\u5FA1\u201D\u6216\u201C\u63A5\u201D\u65F6\uFF0C\u4F60\u83B7\u5F970.25\u953B\u3002\u4F60\u7684\u201C\u95EA\u201D\u82B1\u8D39-1\u3002\n\n\u6708\u4EAE\uFF083\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u7684\u201C\u95EA\u201D\u6539\u4E3A\u201C\u9632\u53CD\u201D\u3002\u4F60\u201C\u9632\u53CD\u201D\u65F6\uFF0C\u5BF9\u4F7F\u7528\u6B66\u5668\u7684\u654C\u65B9\u89D2\u8272\u9020\u6210\u5176\u653B\u51FB\u529B\u503C\u7684\u4F24\u5BB3\u3002\n\n\u5148\u9A71\uFF082\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u65E0\u6CD5\u88AB\u6807\u8BB0\u3002\u4F60\u65E0\u6CD5\u6210\u4E3A\u5176\u4ED6\u89D2\u8272\u6280\u80FD\u7684\u76EE\u6807\u3002\u5F53\u4F60\u53D7\u5230\u4F24\u5BB3\u524D\uFF0C\u9632\u6B62\u4E4B\u5E76\u51CF1\u8840\u3002\n\n\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u9650\u4E24\u6B21\uFF0C\u6BCF\u56DE\u5408\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u9632\u6B62\u4F60\u672C\u56DE\u5408\u53D7\u5230\u7684\u4F24\u5BB3\u3002\n\n\u68A6\u9B47\uFF081\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u5F53\u4F60\u6807\u8BB0\u7684\u89D2\u8272\u53D7\u5230\u4F24\u5BB3\u65F6\uFF0C\u4F60\u4EE4\u4F60\u4E3B\u52A8\u6280\u80FD\u4E2D\u7684\u6570\u5B57-1\u3002\n\n\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u6807\u8BB0\u4E00\u540D\u654C\u65B9\u89D2\u8272\uFF0C\u7136\u540E\u672C\u8F6E\u6E38\u620F\u7B2C6\u56DE\u5408\u7ED3\u675F\u540E\uFF0C\u4F60\u4EE4\u88AB\u6807\u8BB0\u7684\u89D2\u8272\u76F4\u63A5\u6B7B\u4EA1\u5E76\u83B7\u5F97\u5176\u6280\u80FD\u3002\n\n\u5947\u8FF9\uFF082\u88401\u653B\uFF09\n\n\u4E3B\u52A8\u6280\u80FD\uFF1A\u5F53\u4F60\u6253\u51FA\u6B66\u5668\u65F6\uFF0C\u4F60\u53EF\u4EE5\u540C\u65F6\u6253\u51FA\u4E00\u4E2A\u201C\u5BA3\u8A00\u201D\u3002\u82E5\u5982\u6B64\u505A\uFF0C\u8BE5\u653B\u51FB\u65E0\u6CD5\u547D\u4E2D\u4E14\u7B49\u7EA7\u4F4E\u4E8E\u5176\u7684\u653B\u51FB\u65E0\u6CD5\u547D\u4E2D\u4F60\uFF0C\u6253\u51FA\u76F8\u540C\u7B49\u7EA7\u6B66\u5668\u7684\u654C\u65B9\u89D2\u8272\u65E0\u6CD5\u4F7F\u7528\u5176\u3002\n\n\u58C1\u5792\uFF082\u88401\u653B\uFF09\n\n\u4E3B\u52A8\u6280\u80FD\uFF1A\u4F60\u53EF\u82B1\u8D392\u953B\u6253\u51FA\u4E00\u4E2A\u201C\u5927\u76FE\u201D\u3002\u201C\u5927\u76FE\u201D\u53EF\u4EE5\u9632\u5FA1\u9664\u201C\u865A\u65E0\u201D\u5916\u7684\u4EFB\u610F\u653B\u51FB\u3002\u4F60\u6253\u51FA\u201C\u5927\u76FE\u201D\u540E\u4F60\u7684\u5927\u76FE\u89C6\u4E3A0\u953B\u76F4\u5230\u56DE\u5408\u7ED3\u675F\u3002\n\n\u6781\u5149\uFF082\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u7684\u6B66\u5668\u53EF\u4EE5\u547D\u4E2D\u591A\u4E2A\u89D2\u8272\u3002\n\n\u9886\u57DF\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u9650\u4E00\u6B21\uFF0C\u6BCF\u56DE\u5408\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u4EE4\u672C\u56DE\u5408\u6240\u6709\u53CB\u65B9\u89D2\u8272\u7684\u6B66\u5668\u53EF\u4EE5\u547D\u4E2D\u591A\u4E2A\u89D2\u8272\n\n\u98CE\u66B4\uFF082\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u7684\u201C\u6B66\u58EB\u5200\u201D\u6539\u4E3A\u201C\u98CE\u66B4\u4E4B\u5203\u201D\uFF0C\u653B\u51FB\u7B49\u7EA7\u6539\u4E3A1.5\u7EA7\uFF0C\u82E5\u4F60\u6253\u51FA\u8BE5\u653B\u51FB\u672A\u547D\u4E2D\u4EFB\u4F55\u89D2\u8272\uFF0C\u4F60\u4E0B\u6B21\u6253\u51FA\u8BE5\u653B\u51FB\u7684\u82B1\u8D39-1\u953B\u3002\n\n\u9B54\u672F\u5E08\uFF082\u88401\u653B\uFF09\n\n\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u9650\u4E24\u6B21\uFF0C\u5F53\u4E00\u540D\u89D2\u8272\u7684\u653B\u51FB\u547D\u4E2D\u4EFB\u610F\u76EE\u6807\u65F6\uFF0C\u4F60\u53EF\u4EE5\u4EE4\u6B64\u653B\u51FB\u65E0\u6548\u5E76\u89C6\u4E3A\u4F60\u6307\u5B9A\u7684\u4E00\u540D\u89D2\u8272\u4F7F\u7528\u76F8\u540C\u653B\u51FB\u547D\u4E2D\u76F8\u540C\u76EE\u6807\u3002\n\n\u89C2\u8005\uFF082\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u5F00\u59CB\u65F6\uFF0C\u4F60\u5C06\u72B6\u6001\u8C03\u6574\u81F3\u201C\u5E73\u9759\u201D\u3002\u5F53\u4F60\u201C\u63A5\u201D\u65F6\uFF0C\u4F60\u5C06\u72B6\u6001\u5207\u6362\u81F3\u201C\u66B4\u6012\u201D\u5E76\u83B7\u5F971\u953B\u3002\u5F53\u4F60\u5904\u4E8E\u201C\u66B4\u6012\u201D\u72B6\u6001\u65F6\uFF0C\u4F60\u9020\u6210\u548C\u53D7\u5230\u7684\u653B\u51FB\u5747\u7FFB\u500D\u3002\u5F53\u4F60\u5904\u4E8E\u201C\u5E73\u9759\u201D\u72B6\u6001\u65F6\uFF0C\u4F60\u9020\u6210\u548C\u53D7\u5230\u7684\u653B\u51FB\u5747\u51CF\u534A\u3002\n\n\u6E14\u592B\uFF083\u88400.5\u653B\uFF09\n\n\u4E3B\u52A8\u6280\u80FD\uFF1A\u5F53\u4E00\u540D\u5176\u4ED6\u89D2\u8272\u53D1\u52A8\u4E3B\u52A8\u6280\u80FD\u65F6\uFF0C\u4F60\u53EF\u4EE5\u5728\u6B64\u6280\u80FD\u6548\u679C\u751F\u6548\u524D\u4E0E\u5176\u8FDB\u884C\u4E00\u56DE\u5408\u65E0\u6CD5\u4F7F\u7528\u6280\u80FD\u7684\u5BF9\u5C40\uFF0C\u82E5\u4F60\u8D62\uFF0C\u4F60\u4EE4\u6B64\u6280\u80FD\u6548\u679C\u5931\u6548\u5E76\u5BF9\u5176\u9020\u62101\u70B9\u4F24\u5BB3\u3002\n\n\u9F99\u9A91\u58EB\uFF081\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u5F00\u59CB\u65F6\uFF0C\u4F60\u83B7\u5F97\u4E00\u6761\u201C\u9F99\u201D\u3002\u4F60\u201C\u63A5\u201D\u5076\u6570\u6B21\u540E\uFF0C\u4F60\u7684\u201C\u9F99\u7259\u201D\u82B1\u8D39-1\uFF08\u81F3\u5C11\u4E3A2\uFF09\u3002\u6BCF\u8F6E\u6E38\u620F\u5F00\u59CB\u65F6/\u4F60\u6210\u529F\u4F7F\u7528\u201C\u9F99\u7259\u201D\u540E\uFF0C\u82E5\u4F60\u6CA1\u6709\u201C\u9F99\u201D\uFF0C\u4F60\u83B7\u5F97\u4E00\u6761\u201C\u9F99\u201D\uFF0C\u5176\u8840\u91CF\u4E3A1\uFF0C\u5F53\u4F60\u53D7\u5230\u975E\u771F\u5B9E\u4F24\u5BB3\u65F6\uFF0C\u4F18\u5148\u6263\u9664\u201C\u9F99\u201D\u8840\u91CF\u3002\n\n\u5723\u6597\u58EB\uFF082\u88401\u653B1\u62A4\u76FE\uFF09\n\n\u4E3B\u52A8\u6280\u80FD\uFF1A\u5F53\u4F60\u5931\u53BB\u62A4\u76FE\u65F6\uFF0C\u4F60\u53EF\u4EE5\u4EE4\u4F60\u4E0B\u6B21\u9020\u6210\u7684\u4F24\u5BB3+0.5\u3002\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u5F53\u4F60\u6740\u6B7B\u4E00\u540D\u89D2\u8272\u65F6\uFF0C\u4F60\u83B7\u5F97\u4E00\u4E2A\u62A4\u76FE\u3002\n\n\u5947\u70B9\uFF082\u88401\u653B\uFF09\n\n\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u56DE\u5408\u5F00\u59CB\u65F6\uFF0C\u4F60\u53EF\u4EE5\u4EE4\u4F60\u672C\u56DE\u5408\u653B\u51FB\u529B-0.5\u5E76\u4EE4\u4E00\u540D\u654C\u65B9\u89D2\u8272\u672C\u56DE\u5408\u53D7\u5230\u7684\u4F24\u5BB3+0.5\u3002\n\n\u9886\u57DF\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u96502\u6B21\uFF0C\u6BCF\u56DE\u5408\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u4EE4\u672C\u56DE\u5408\u6240\u6709\u654C\u65B9\u89D2\u8272\u7684\u88AB\u52A8\u6280\u80FD\u548C\u4E3B\u52A8\u6280\u80FD\u5931\u6548\u3002\n\n\u7267\u7F8A\u4EBA\uFF082\u88400.5\u653B\uFF09\n\n\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u9650\u4E00\u6B21\uFF0C\u6BCF\u56DE\u5408\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u4EE4\u4E00\u540D\u5176\u4ED6\u89D2\u8272\u7684\u6709\u6B21\u6570\u9650\u5236\u7684\u6280\u80FD\u7684\u4E00\u4E2A\u6548\u679C\u6B21\u6570+1\u3002\n\n\u6BCF\u8F6E\u6E38\u620F\u9650\u4E00\u6B21\uFF0C\u6BCF\u56DE\u5408\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u4EE4\u4E00\u540D\u89D2\u8272\u8840\u91CF+1\u3002\n\n\u9886\u57DF\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u9650\u4E00\u6B21\uFF0C\u6BCF\u56DE\u5408\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u4EE4\u672C\u56DE\u5408\u6240\u6709\u53CB\u65B9\u89D2\u8272\u53D7\u5230\u7684\u4F24\u5BB3-0.5\u3002\n\n\u82E6\u4FEE\uFF082\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u6240\u6709\u89D2\u8272\u65E0\u6CD5\u589E\u52A0\u8840\u91CF\u3002\n\n\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u96501\u6B21\uFF0C\u5F53\u4F60\u5373\u5C06\u53D7\u5230\u81F4\u547D\u4F24\u5BB3\u65F6\uFF0C\u4F60\u53EF\u4EE5\u9632\u6B62\u4E4B\u3002\n\n\u6697\u5F71\uFF081\u88401\u653B\uFF09\n\n\u88AB\u52A8\u6280\u80FD\uFF1A\u731C\u62F3\u65F6\uFF0C\u4F60\u89C6\u4E3A\u80DC\u5229\u3002\u5F53\u4F60\u4E0D\u56E0\u88AB\u653B\u51FB\u547D\u4E2D\u800C\u5373\u5C06\u6B7B\u4EA1\u65F6\uFF0C\u4F60\u5C06\u8840\u91CF\u8C03\u6574\u81F31\u3002\n\n# \u57FA\u7840\u52A8\u4F5C\u4E0E\u591A\u4EBA\u5224\u5200\uFF08\u6CBF\u7528\uFF09\n\n## \u6838\u5FC3\u672F\u8BED\n\n| \u672F\u8BED | \u4E25\u683C\u542B\u4E49 |\n| --- | --- |\n| \u4E00\u8F6E | \u4ECE\u5206\u961F\u6216\u5EFA\u7ACB\u5BF9\u5C40\u5F00\u59CB\uFF0C\u5230\u4EA7\u751F\u80DC\u8D1F\u4E3A\u6B62\u3002 |\n| \u56DE\u5408 | \u4ECE\u4E00\u6B21\u5168\u5458\u953B\u6570\u5F52\u96F6\u5F00\u59CB\uFF0C\u5230\u53D1\u751F\u91CD\u5F00\u6761\u4EF6\u4E3A\u6B62\uFF1B\u4E00\u4E2A\u56DE\u5408\u5185\u53EF\u6709\u591A\u6B21\u5171\u540C\u51FA\u624B\u3002 |\n| \u51FA\u624B | \u6240\u6709\u4ECD\u53C2\u4E0E\u7684\u89D2\u8272\u540C\u65F6\u9009\u62E9\u5E76\u7ED3\u7B97\u4E00\u6B21\u884C\u52A8\u3002 |\n| \u953B\uFF0F\u80FD\u91CF | \u7528\u4E8E\u652F\u4ED8\u653B\u51FB\u3001\u95EA\u548C\u7279\u6B8A\u884C\u52A8\u7684\u8D44\u6E90\uFF1B\u672C\u6587\u7EDF\u4E00\u79F0\u201C\u953B\u201D\uFF0C\u754C\u9762\u53EF\u80FD\u663E\u793A\u4E3A\u80FD\u91CF\u3002 |\n| \u653B\u51FB\u7B49\u7EA7 | \u7528\u4E8E\u653B\u51FB\u5148\u540E\u3001\u538B\u5236\u3001\u62B5\u5200\u548C\u9632\u5FA1\u8303\u56F4\u5224\u65AD\uFF1B\u4E0D\u7B49\u4E8E\u4F24\u5BB3\u503C\u3002 |\n| \u653B\u51FB\u529B\uFF0F\u4F24\u5BB3 | \u653B\u51FB\u547D\u4E2D\u540E\u9020\u6210\u7684\u57FA\u7840\u751F\u547D\u635F\u5931\uFF1B\u53EF\u88AB\u6280\u80FD\u8C03\u6574\u3002 |\n| \u771F\u5B9E\u4F24\u5BB3 | \u76F4\u63A5\u4F5C\u7528\u4E8E\u89D2\u8272\u672C\u4F53\u751F\u547D\uFF0C\u7ED5\u8FC7\u79D8\u5076\u3001\u9F99\u548C\u62A4\u76FE\u3002 |\n| \u91CD\u5F00 | \u5F53\u524D\u56DE\u5408\u7ED3\u675F\uFF0C\u6240\u6709\u5B58\u6D3B\u89D2\u8272\u953B\u6570\u6E05\u96F6\uFF0C\u8FDB\u5165\u4E0B\u4E00\u56DE\u5408\u3002 |\n\n## \u89D2\u8272\u552F\u4E00\u6027\n\n\u540C\u4E00\u8F6E\u6E38\u620F\u4E2D\uFF0C\u540C\u4E00\u89D2\u8272\u53EA\u80FD\u5B9E\u9645\u51FA\u73B0\u4E00\u6B21\u3002\u73A9\u5BB6\u3001\u5404AI\u548C\u968F\u673A\u9009\u62E9\u5747\u4E0D\u5F97\u91CD\u590D\u89D2\u8272\u3002\u82E5\u672A\u9009\u62E9\u89D2\u8272\u6570\u91CF\u4E0D\u8DB3\u4EE5\u8986\u76D6\u9700\u8981\u89D2\u8272\u7684\u53C2\u8D5B\u4EBA\u6570\uFF0C\u5FC5\u987B\u963B\u6B62\u5F00\u5C40\u3002\u591A\u4EBA\u8BBE\u7F6E\u4E2D\u7684\u201C\u65E0\u6280\u80FD\u201D\u4E0D\u5C5E\u4E8E\u89D2\u8272\uFF0C\u53EF\u4EE5\u7531\u591A\u540D\u53C2\u8D5B\u8005\u91CD\u590D\u9009\u62E9\uFF1B\u8FD9\u4E9B\u53C2\u8D5B\u8005\u5747\u4F7F\u7528\u57FA\u78402\u8840\u30011\u653B\uFF0C\u4E14\u4E0D\u83B7\u5F97\u89D2\u8272\u6280\u80FD\u3002\u5360\u535C\u5BB6\u7684\u79D8\u5076\u3001\u76D7\u8D3C\u7684\u4E34\u65F6\u6280\u80FD\u3001\u5B66\u5F92\u548C\u68A6\u9B47\u83B7\u5F97\u7684\u6280\u80FD\uFF0C\u5C5E\u4E8E\u6280\u80FD\u83B7\u5F97\uFF0C\u4E0D\u89C6\u4E3A\u7B2C\u4E8C\u540D\u540C\u89D2\u8272\u53C2\u8D5B\u8005\u3002\n\n## \u5BF9\u5C40\u8BBE\u7F6E\n\n- \u53CC\u4EBA\u5BF9\u6218\uFF1A1\u540D\u771F\u4EBA\u73A9\u5BB6\u5BF91\u540DAI\uFF1B\u53EF\u5F00\u542F\u6216\u5173\u95ED\u6280\u80FD\uFF0C\u53EF\u5F00\u542F\u526A\u5200\u6A21\u5F0F\uFF0C\u53EF\u8BBE\u7F6E0.5\u81F315\u79D2\u8BA1\u65F6\u3002\n\n- \u591A\u4EBA\u5BF9\u6218\uFF1A1\u540D\u771F\u4EBA\u73A9\u5BB6\u4E0E\u591A\u540DAI\uFF1B2\u81F36\u961F\u3001\u6BCF\u961F1\u81F34\u4EBA\u3001\u603B\u4EBA\u6570\u4E0D\u8D85\u8FC712\u4EBA\uFF1B\u6BCF\u961F1\u4EBA\u65F6\u4E3A\u6DF7\u6218\u3002\n\n- \u591A\u4EBA\u6A21\u5F0F\u7981\u7528\u526A\u5200\u3002\u9009\u62E9\u89D2\u8272\u7684\u73A9\u5BB6\u548CAI\u5747\u987B\u4F7F\u7528\u4E0D\u540C\u89D2\u8272\uFF1B\u201C\u65E0\u6280\u80FD\u201D\u53EF\u91CD\u590D\u9009\u62E9\uFF0C\u968F\u673A\u89D2\u8272\u4ECE\u672A\u88AB\u9009\u62E9\u89D2\u8272\u4E2D\u62BD\u53D6\u3002\n\n- \u591A\u4EBA\u653B\u51FB\u4E0D\u80FD\u6307\u5B9A\u76EE\u6807\u961F\u4F0D\u3002\u6240\u6709\u654C\u5BF9\u9635\u8425\u4E2D\u80FD\u591F\u88AB\u8BE5\u653B\u51FB\u547D\u4E2D\u7684\u89D2\u8272\u5171\u540C\u8FDB\u5165\u5224\u5200\u8303\u56F4\uFF1B\u730E\u4EBA\u7B49\u660E\u786E\u5199\u660E\u9009\u62E9\u5177\u4F53\u89D2\u8272\u7684\u6280\u80FD\u6548\u679C\u9664\u5916\u3002\n\n# \u7B2C\u4E00\u7F16\u3000\u57FA\u7840\u884C\u52A8\n\n| \u884C\u52A8 | \u82B1\u8D39 | \u7B49\u7EA7\uFF0F\u8303\u56F4 | \u6548\u679C |\n| --- | --- | --- | --- |\n| \u953B\u9020 | 0 | \u2014 | \u672A\u88AB\u653B\u51FB\u547D\u4E2D\u65F6+1\u953B\uFF1B\u88AB\u547D\u4E2D\u5219\u4E0D\u83B7\u5F97\u953B\u3002 |\n| \u9632 | 0 | \u96321\u20142\u7EA7 | \u6321\u5C0F\u5200\u3001\u6B66\u58EB\u5200\uFF1B\u901A\u5E38\u6321\u4E0D\u4F4F3\u7EA7\u4EE5\u4E0A\u3002 |\n| \u63A5 | 0 | \u96322\u20143\u7EA7 | \u63A5\u4F4F\u6B66\u58EB\u5200\u6216\u624B\u91CC\u5251\uFF1B\u6210\u529F\u89E6\u53D1\u91CD\u5F00\u3002 |\n| \u95EA | 2 | \u96322\u20145\u7EA7 | \u95EA\u6389\u6B66\u58EB\u5200\u81F3\u9F99\u7259\uFF1B\u6210\u529F\u89E6\u53D1\u91CD\u5F00\uFF1B\u4E0D\u80FD\u95EA\u5C0F\u5200\u6216\u865A\u65E0\u3002 |\n| \u5C0F\u5200 | 1 | 1\u7EA7 | \u6700\u4F4E\u7EA7\u653B\u51FB\u3002 |\n| \u6B66\u58EB\u5200 | 2 | 2\u7EA7 | \u9AD8\u4E8E\u5C0F\u5200\uFF0C\u53EF\u88AB\u9632\u3001\u63A5\u3001\u95EA\u3002 |\n| \u624B\u91CC\u5251 | 3 | 3\u7EA7 | \u7A81\u7834\u666E\u901A\u9632\uFF0C\u53EF\u88AB\u63A5\u3001\u95EA\u3002 |\n| \u82E6\u65E0 | 4 | 4\u7EA7 | \u666E\u901A\u884C\u52A8\u4E2D\u4EC5\u95EA\u53EF\u9632\u3002 |\n| \u9F99\u7259 | 5 | 5\u7EA7 | \u666E\u901A\u884C\u52A8\u4E2D\u4EC5\u95EA\u53EF\u9632\u3002 |\n| \u865A\u65E0 | 6 | 6\u7EA7\uFF0F\u591A\u4EBA\u5168\u4F53 | \u666E\u901A\u9632\u5FA1\u5747\u4E0D\u80FD\u9632\uFF1B6\u7EA7\u4E0D\u662F6\u70B9\u4F24\u5BB3\u3002\u591A\u4EBA\u4E2D\u8986\u76D6\u6240\u6709\u654C\u65B9\uFF1B\u53CB\u4F24\u89D2\u8272\u4F7F\u7528\u65F6\u8986\u76D6\u9664\u81EA\u5DF1\u5916\u6240\u6709\u89D2\u8272\u3002 |\n| \u526A\u5200 | 1 | \u7279\u6B8A1.5\u7EA7 | \u4EC5\u53CC\u4EBA\u53EF\u9009\uFF1B\u4F7F\u7528\u7279\u6B8A\u514B\u5236\u8868\uFF0C\u4E0D\u7B80\u5355\u6309\u7B49\u7EA7\u6BD4\u8F83\u3002 |\n| \u5927\u76FE | \u9996\u6B212\uFF0C\u5176\u540E0 | \u7279\u6B8A\u9632\u5FA1 | \u58C1\u5792\u6280\u80FD\u63D0\u4F9B\uFF1B\u9632\u5FA1\u9664\u865A\u65E0\u5916\u7684\u653B\u51FB\u3002 |\n\n## \u526A\u5200\u6A21\u5F0F\n\n\u526A\u5200\u6D88\u80171\u953B\uFF0C\u5C5E\u4E8E\u7279\u6B8A\u653B\u51FB\u3002\u5B83\u514B\u5236\u5C0F\u5200\u3001\u6B66\u58EB\u5200\u3001\u624B\u91CC\u5251\u548C\u63A5\uFF1B\u5B83\u88AB\u953B\u9020\u3001\u9632\u3001\u95EA\u3001\u82E6\u65E0\u3001\u9F99\u7259\u548C\u865A\u65E0\u514B\u5236\u3002\u526A\u5200\u6210\u529F\u88AB\u95EA\u6389\u65F6\u6309\u95EA\u6210\u529F\u91CD\u5F00\u3002\u591A\u4EBA\u6A21\u5F0F\u4E0D\u4F7F\u7528\u526A\u5200\u3002\n\n## \u8D44\u6E90\u652F\u4ED8\u4E0E\u953B\u9020\n\n1. \u9009\u62E9\u884C\u52A8\u524D\uFF0C\u89D2\u8272\u5FC5\u987B\u62E5\u6709\u8DB3\u591F\u953B\u6570\uFF1B\u4E0D\u80FD\u900F\u652F\u3002\n\n1. \u6B66\u5668\u3001\u95EA\u3001\u5927\u76FE\u548C\u7279\u6B8A\u884C\u52A8\u7684\u82B1\u8D39\u5728\u7ED3\u7B97\u4E2D\u6263\u9664\uFF1B\u6280\u80FD\u51CF\u8D39\u548C\u52A0\u8D39\u6309\u6280\u80FD\u4F18\u5148\u7EA7\u4FEE\u6B63\u3002\n\n1. \u953B\u9020\u6536\u76CA\u5EF6\u540E\u5230\u547D\u4E2D\u5224\u5B9A\u5B8C\u6210\u540E\u53D1\u653E\u3002\u53EA\u8981\u953B\u9020\u8005\u88AB\u653B\u51FB\u547D\u4E2D\uFF0C\u5373\u4F7F\u6700\u7EC8\u4F24\u5BB3\u88AB\u5B8C\u5168\u9632\u6B62\uFF0C\u4E5F\u4E0D\u83B7\u5F97\u953B\uFF1B\u526A\u5200\u4E0E\u953B\u9020\u7684\u7279\u6B8A\u514B\u5236\u6309\u526A\u5200\u89C4\u5219\u5904\u7406\u3002\n\n1. \u953B\u6570\u4E0D\u8BBE\u4E0A\u9650\uFF1B\u51CF\u8D39\u4E0D\u80FD\u4F7F\u6709\u6700\u4F4E\u82B1\u8D39\u89C4\u5B9A\u7684\u653B\u51FB\u4F4E\u4E8E\u5176\u4E0B\u9650\u3002\u865A\u65E0\u4ECD\u9700\u652F\u4ED86\u953B\uFF0C\u4F46\u89D2\u8272\u62E5\u67096\u953B\u540E\u4ECD\u53EF\u7EE7\u7EED\u83B7\u5F97\u953B\u3002\n\n## \u653B\u51FB\u7B49\u7EA7\u4E0E\u4F24\u5BB3\n\n\u653B\u51FB\u7B49\u7EA7\u51B3\u5B9A\u5148\u540E\u548C\u9632\u5FA1\u5173\u7CFB\uFF1B\u4F24\u5BB3\u901A\u5E38\u7B49\u4E8E\u653B\u51FB\u8005\u5F53\u524D\u653B\u51FB\u529B\u3002\u865A\u65E0\u76846\u7EA7\u4EC5\u8868\u793A\u7B49\u7EA7\u4E0E\u57FA\u7840\u82B1\u8D39\u3002\u6280\u80FD\u53EF\u4EE5\u4F7F\u653B\u51FB\u7B49\u7EA7\u3001\u653B\u51FB\u529B\u3001\u4F24\u5BB3\u6027\u8D28\u548C\u76EE\u6807\u8303\u56F4\u6539\u53D8\u3002\n\n## \u91CD\u5F00\u7684\u4E00\u822C\u7ED3\u679C\n\n\u53D1\u751F\u91CD\u5F00\u65F6\uFF0C\u5F53\u524D\u56DE\u5408\u7ED3\u675F\uFF0C\u6240\u6709\u5B58\u6D3B\u89D2\u8272\u953B\u6570\u6E05\u96F6\uFF0C\u4E0B\u4E00\u56DE\u5408\u5F00\u59CB\u3002\u6280\u80FD\u4EA7\u751F\u7684\u8DE8\u56DE\u5408\u3001\u8DE8\u8F6E\u72B6\u6001\u6309\u5404\u6280\u80FD\u6587\u5B57\u4FDD\u7559\u6216\u6E05\u9664\u3002\n\n# \u7B2C\u4E8C\u7F16\u3000\u53CC\u4EBA\u5BF9\u6218\n\n## \u65E0\u6280\u80FD\u53CC\u4EBA\n\n1. \u53CC\u65B9\u540C\u65F6\u9009\u62E9\u884C\u52A8\uFF0CAI\u4E0D\u5F97\u4F7F\u7528\u8D85\u8FC7\u81EA\u8EAB\u953B\u6570\u7684\u884C\u52A8\u3002\n\n1. \u53CC\u65B9\u4F7F\u7528\u76F8\u540C\u7B49\u7EA7\u653B\u51FB\u65F6\uFF0C\u65E0\u8BBA\u653B\u51FB\u540D\u79F0\u3001\u653B\u51FB\u529B\u6216\u5176\u4ED6\u7ED3\u679C\u5982\u4F55\uFF0C\u53CC\u65B9\u5747\u4E0D\u53D7\u4F24\uFF1B\u4E24\u6B21\u653B\u51FB\u5747\u4E0D\u547D\u4E2D\u3002\n\n1. \u4E0D\u540C\u7B49\u7EA7\u653B\u51FB\u76F8\u9047\u65F6\uFF0C\u9AD8\u7B49\u7EA7\u653B\u51FB\u538B\u5236\u4F4E\u7B49\u7EA7\u653B\u51FB\uFF1B\u88AB\u538B\u5236\u8005\u82E5\u65E0\u6709\u6548\u9632\u5FA1\u5219\u88AB\u547D\u4E2D\u3002\n\n1. \u9632\u3001\u63A5\u3001\u95EA\u6309\u57FA\u7840\u884C\u52A8\u8868\u7ED3\u7B97\u3002\u653B\u51FB\u547D\u4E2D\u3001\u63A5\u6210\u529F\u6216\u95EA\u6210\u529F\u540E\uFF0C\u53CC\u65B9\u953B\u6570\u6E05\u96F6\u5E76\u5F00\u59CB\u4E0B\u4E00\u56DE\u5408\u3002\n\n1. \u65E0\u6280\u80FD\u6807\u51C6\u8D5B\u6309\u547D\u4E2D\u8BA1\u5206\uFF1B\u5148\u8FBE\u5230\u8BBE\u5B9A\u80DC\u5206\u8005\u83B7\u80DC\u3002\u65E0\u5C3D\u6A21\u5F0F\u6309\u8FDE\u7EED\u5BF9\u5C40\u7EDF\u8BA1\u3002\n\n## \u6280\u80FD\u53CC\u4EBA\n\n\u53CC\u65B9\u5404\u9009\u62E9\u4E00\u4E2A\u4E0D\u540C\u89D2\u8272\u3002\u6280\u80FD\u6539\u53D8\u751F\u547D\u3001\u653B\u51FB\u529B\u3001\u884C\u52A8\u3001\u547D\u4E2D\u6216\u4F24\u5BB3\u7ED3\u7B97\u3002\u653B\u51FB\u547D\u4E2D\u540E\u6263\u9664\u751F\u547D\uFF1B\u89D2\u8272\u751F\u547D\u4E0D\u5927\u4E8E0\u65F6\u6B7B\u4EA1\u5E76\u8BB0\u4E3A\u5BF9\u624B\u5F97\u5206\u3002\u6280\u80FD\u53CC\u4EBA\u4E2D\uFF0C\u653B\u51FB\u780D\u5230\u4EBA\u540C\u6837\u5C5E\u4E8E\u91CD\u5F00\u6761\u4EF6\uFF1A\u5B8C\u6210\u8BE5\u6B21\u4F24\u5BB3\u53CA\u6280\u80FD\u7ED3\u7B97\u540E\uFF0C\u53CC\u65B9\u953B\u6570\u6E05\u96F6\u5E76\u8FDB\u5165\u4E0B\u4E00\u56DE\u5408\uFF1B\u63A5\u6210\u529F\u3001\u95EA\u6210\u529F\u4E5F\u7167\u5E38\u91CD\u5F00\u3002\n\n\u540C\u7EA7\u653B\u51FB\u6700\u9AD8\u89C4\u5219\uFF1A\u6280\u80FD\u53CC\u4EBA\u4E2D\uFF0C\u540C\u7B49\u7EA7\u653B\u51FB\u4ECD\u76F4\u63A5\u62B5\u5200\uFF0C\u53CC\u65B9\u90FD\u4E0D\u547D\u4E2D\u3001\u4E0D\u53D7\u4F24\u3002\u8BE5\u89C4\u5219\u5148\u4E8E\u5012\u540A\u4EBA\u3001\u602A\u517D\u3001\u5947\u8FF9\u3001\u62A4\u76FE\u3001\u79D8\u5076\u548C\u6240\u6709\u4F24\u5BB3\u6280\u80FD\u3002\n\n## \u53CC\u4EBA\u7ED3\u7B97\u987A\u5E8F\n\n1. \u68C0\u67E5\u884C\u52A8\u5408\u6CD5\u6027\u5E76\u652F\u4ED8\u6216\u8BB0\u5F55\u8D39\u7528\u3002\n\n1. \u5904\u7406\u540C\u7EA7\u653B\u51FB\uFF1A\u540C\u7B49\u7EA7\u7ACB\u5373\u62B5\u5200\uFF0C\u53CC\u65B9\u653B\u51FB\u5747\u4E0D\u547D\u4E2D\u3002\n\n1. \u5904\u7406\u526A\u5200\u7279\u6B8A\u514B\u5236\u3001\u653B\u51FB\u7B49\u7EA7\u3001\u9632\u3001\u63A5\u3001\u95EA\u548C\u6280\u80FD\u6539\u53D8\u7684\u9632\u5FA1\u3002\n\n1. \u786E\u8BA4\u653B\u51FB\u662F\u5426\u547D\u4E2D\uFF1B\u953B\u9020\u8005\u88AB\u547D\u4E2D\u5219\u4E0D\u5F97\u83B7\u5F97\u953B\u3002\n\n1. \u5904\u7406\u547D\u4E2D\u540E\u6280\u80FD\uFF0C\u5305\u62EC\u5012\u540A\u4EBA\u9009\u62E9\u3001\u9B54\u672F\u5E08\u3001\u602A\u517D\u7B49\u3002\n\n1. \u4F24\u5BB3\u4E3A0\u65F6\u4E0D\u6D88\u8017\u4EFB\u4F55\u62A4\u76FE\uFF1B\u6B63\u6570\u975E\u771F\u5B9E\u4F24\u5BB3\u6309\u5F53\u524D\u534A\u89D2\u8272\u987A\u5E8F\u4F9D\u6B21\u5904\u7406\u5404\u81EA\u62A4\u76FE\u4E0E\u751F\u547D\uFF0C\u518D\u5904\u7406\u672C\u4F53\u62A4\u76FE\u548C\u672C\u4F53\u751F\u547D\uFF1B\u771F\u5B9E\u4F24\u5BB3\u76F4\u63A5\u6263\u9664\u672C\u4F53\u751F\u547D\u3002\n\n1. \u5904\u7406\u9020\u6210\u4F24\u5BB3\u540E\u6280\u80FD\u3001\u6B7B\u4EA1\u548C\u8FDE\u9501\u6548\u679C\u3002\n\n1. \u5904\u7406\u953B\u9020\u6536\u76CA\u3001\u8DE8\u56DE\u5408\u8BB0\u5F55\u3001\u91CD\u5F00\u6216\u7EE7\u7EED\u3002\n\n# \u7B2C\u4E09\u7F16\u3000\u591A\u4EBA\u5BF9\u6218\n\n## \u961F\u4F0D\u3001\u654C\u5BF9\u5173\u7CFB\u4E0E\u80DC\u8D1F\n\n\u89D2\u8272\u751F\u547D\u4E0D\u5927\u4E8E0\u65F6\u6B7B\u4EA1\u5E76\u79BB\u573A\u3002\u573A\u4E0A\u4EC5\u5269\u4E00\u4E2A\u9635\u8425\u65F6\uFF0C\u8BE5\u9635\u8425\u83B7\u80DC\uFF1B\u82E5\u6240\u6709\u89D2\u8272\u540C\u65F6\u6B7B\u4EA1\uFF0C\u5219\u4E3A\u5E73\u5C40\u3002\u73A9\u5BB6\u6B7B\u4EA1\u4F46\u5176\u961F\u53CB\u4ECD\u5B58\u6D3B\u65F6\uFF0C\u5BF9\u5C40\u7EE7\u7EED\uFF0C\u7531AI\u63A7\u5236\u5269\u4F59\u89D2\u8272\u76F4\u5230\u4EA7\u751F\u7ED3\u679C\u3002\u6DF7\u6218\u4E2D\u6BCF\u540D\u89D2\u8272\u5404\u81EA\u6784\u6210\u4E00\u4E2A\u9635\u8425\u3002\n\n## \u6BCF\u56DE\u5408\u4E00\u6B21\u547D\u4E2D\u4E0A\u9650\n\n\u786C\u6027\u9650\u5236\uFF1A\u6BCF\u540D\u89D2\u8272\u6BCF\u56DE\u5408\u5728\u5224\u5200\u4E2D\u6700\u591A\u627F\u53D7\u4E00\u6B21\u6B66\u5668\u653B\u51FB\u3002\u6B66\u5668\u653B\u51FB\u4E00\u65E6\u547D\u4E2D\uFF0C\u6216\u89D2\u8272\u5728\u547D\u4E2D\u524D\u88AB\u9009\u4E3A\u4E3B\u52A8\u627F\u53D7\u8005\uFF0C\u5C31\u7ACB\u5373\u5360\u7528\u5176\u672C\u56DE\u5408\u552F\u4E00\u5224\u5200\u627F\u53D7\u540D\u989D\uFF0C\u65E0\u8BBA\u79D8\u5076\u3001\u9F99\u3001\u62A4\u76FE\u3001\u602A\u517D\u3001\u5148\u9A71\u6216\u5176\u4ED6\u6548\u679C\u662F\u5426\u4F7F\u672C\u4F53\u751F\u547D\u4E0D\u51CF\u5C11\u3002\u8BE5\u89D2\u8272\u4E0D\u518D\u8FDB\u5165\u672C\u6B21\u51FA\u624B\u5176\u4F59\u6B66\u5668\u653B\u51FB\u7684\u5224\u5200\u8303\u56F4\uFF0C\u4E5F\u4E0D\u80FD\u518D\u6B21\u4E3B\u52A8\u627F\u53D7\u3002\u730E\u4EBA\u3001\u6708\u4EAE\u3001\u592A\u9633\u3001\u5723\u6597\u58EB\u3001\u89C2\u4F17\u7B49\u6280\u80FD\u4F24\u5BB3\uFF0C\u4EE5\u53CA\u76F4\u63A5\u6B7B\u4EA1\u3001\u6740\u6B7B\u548C\u6280\u80FD\u81EA\u635F\uFF0C\u4E0D\u5360\u7528\u4E5F\u4E0D\u53D7\u6B64\u540D\u989D\u9650\u5236\u3002\n\n## \u653B\u51FB\u5EFA\u7ACB\u4E0E\u653B\u51FB\u52A8\u4F5C\u7684\u9632\u5FA1\u7B49\u7EA7\n\n\u540C\u4E00\u6B21\u5171\u540C\u51FA\u624B\u4E2D\uFF0C\u6240\u6709\u884C\u52A8\u5408\u6CD5\u4E14\u5DF2\u652F\u4ED8\u82B1\u8D39\u7684\u653B\u51FB\u540C\u65F6\u5EFA\u7ACB\u3002\u6BCF\u4E2A\u653B\u51FB\u52A8\u4F5C\u65E2\u6709\u653B\u51FB\u7B49\u7EA7\uFF0C\u4E5F\u6709\u9632\u5FA1\u7B49\u7EA7 `[0, \u8BE5\u653B\u51FB\u7684\u6700\u7EC8\u7B49\u7EA7]`\uFF1B\u56E0\u6B64\uFF0C\u8BE5\u89D2\u8272\u7684\u884C\u52A8\u53EF\u4EE5\u9632\u5FA1\u672C\u7B49\u7EA7\u53CA\u540E\u7EED\u66F4\u4F4E\u7B49\u7EA7\u7684\u653B\u51FB\uFF0C\u4E0D\u8FDB\u5165\u8FD9\u4E9B\u653B\u51FB\u7684\u53D7\u4F24\u5019\u9009\u8303\u56F4\u3002\u767D\u5854\u7B49\u5148\u652F\u4ED8\u540E\u8FD4\u8FD8\u82B1\u8D39\u8005\u4ECD\u89C6\u4E3A\u5DF2\u7ECF\u652F\u4ED8\u5E76\u5B8C\u6210\u653B\u51FB\u52A8\u4F5C\u3002\n\n- \u80FD\u91CF\u4E0D\u8DB3\u8005\u4E0D\u80FD\u9009\u62E9\u653B\u51FB\uFF1B\u672A\u5B8C\u6210\u5408\u6CD5\u9009\u62E9\u6216\u652F\u4ED8\u7684\u653B\u51FB\u4E0D\u5EFA\u7ACB\uFF0C\u4E5F\u4E0D\u4EA7\u751F\u4FDD\u62A4\u3002\n\n- \u5947\u8FF9\u4EE4\u540C\u7EA7\u654C\u65B9\u201C\u65E0\u6CD5\u4F7F\u7528\u6B66\u5668\u201D\u65F6\uFF0C\u8BE5\u6B66\u5668\u5728\u653B\u51FB\u5EFA\u7ACB\u524D\u5373\u88AB\u963B\u6B62\uFF1A\u4E0D\u80FD\u5EFA\u7ACB\uFF0C\u4E0D\u53C2\u4E0E\u62B5\u5200\uFF0C\u4E0D\u4EA7\u751F\u653B\u51FB\u52A8\u4F5C\u7684\u9632\u5FA1\u7B49\u7EA7\uFF0C\u5DF2\u7ECF\u652F\u4ED8\u7684\u953B\u4E0D\u8FD4\u8FD8\u3002\u653B\u51FB\u5DF2\u7ECF\u5EFA\u7ACB\u540E\u518D\u88AB\u9B54\u672F\u5E08\u5224\u4E3A\u65E0\u6548\u3001\u56E0\u5176\u4ED6\u6280\u80FD\u5C01\u9501\u800C\u5931\u6548\u6216\u6700\u7EC8\u4E0D\u80FD\u547D\u4E2D\uFF0C\u5219\u5DF2\u5EFA\u7ACB\u653B\u51FB\u53CA\u5176\u52A8\u4F5C\u9632\u5FA1\u7B49\u7EA7\u4ECD\u7136\u6709\u6548\u3002\n\n- \u540C\u7B49\u7EA7\u7684\u5168\u90E8\u653B\u51FB\u8005\u4ECE\u8BE5\u7B49\u7EA7\u5F00\u59CB\u5373\u5171\u540C\u83B7\u5F97\u4FDD\u62A4\uFF0C\u4E0D\u56E0\u540C\u7B49\u7EA7\u968F\u673A\u7ED3\u7B97\u987A\u5E8F\u800C\u4E92\u76F8\u6210\u4E3A\u5019\u9009\u3002\n\n- \u653B\u51FB\u8005\u968F\u540E\u88AB\u66F4\u9AD8\u7B49\u7EA7\u653B\u51FB\u547D\u4E2D\u6216\u6B7B\u4EA1\uFF0C\u4E0D\u53D6\u6D88\u5DF2\u7ECF\u5EFA\u7ACB\u7684\u653B\u51FB\uFF1B\u5DF2\u5EFA\u7ACB\u653B\u51FB\u4ECD\u6309\u672C\u6B21\u51FA\u624B\u7684\u65E2\u5B9A\u987A\u5E8F\u5B8C\u6210\u3002\n\n- \u672C\u7B49\u7EA7\u5904\u7406\u5B8C\u6BD5\u540E\uFF0C\u8BE5\u7B49\u7EA7\u653B\u51FB\u8005\u7EE7\u7EED\u6392\u9664\u5728\u6240\u6709\u66F4\u4F4E\u7B49\u7EA7\u653B\u51FB\u7684\u5224\u5200\u8303\u56F4\u4E4B\u5916\u3002\n\n## \u62B5\u5200\n\n\u4ECE\u5F53\u524D\u5C1A\u672A\u5904\u7406\u7684\u6700\u9AD8\u653B\u51FB\u7B49\u7EA7\u5F00\u59CB\u3002\u82E5\u8BE5\u6700\u7EC8\u653B\u51FB\u7B49\u7EA7\u5927\u4E8E\u6216\u7B49\u4E8E3\uFF0C\u4E14\u81F3\u5C11\u6709\u4E24\u4E2A\u654C\u5BF9\u9635\u8425\u540C\u65F6\u6253\u51FA\u76F8\u540C\u6700\u7EC8\u7B49\u7EA7\u7684\u653B\u51FB\uFF0C\u5219\u8BE5\u7B49\u7EA7\u89E6\u53D1\u62B5\u5200\u3002\u62B5\u5200\u53EA\u8981\u6C42\u7B49\u7EA7\u76F8\u540C\uFF0C\u4E0D\u8981\u6C42\u6B66\u5668\u540D\u79F0\u76F8\u540C\uFF1B\u6280\u80FD\u6539\u53D8\u653B\u51FB\u7B49\u7EA7\u540E\uFF0C\u6309\u6539\u53D8\u540E\u7684\u6700\u7EC8\u7B49\u7EA7\u5224\u65AD\u3002\n\n- \u540C\u4E00\u9635\u8425\u591A\u4EBA\u4F7F\u7528\u540C\u4E00\u653B\u51FB\uFF0C\u4E0D\u8DB3\u4EE5\u62B5\u5200\u3002\n\n- \u53EA\u9700\u4E24\u4E2A\u654C\u5BF9\u9635\u8425\u5404\u6709\u81F3\u5C11\u4E00\u540D\u76F8\u540C\u6700\u7EC8\u7B49\u7EA7\u653B\u51FB\u7684\u4F7F\u7528\u8005\uFF0C\u4E0D\u8981\u6C42\u81F3\u5C11\u4E09\u540D\u653B\u51FB\u8005\uFF0C\u4E5F\u4E0D\u8981\u6C42\u6B66\u5668\u540C\u540D\u3002\n\n- 1\u7EA7\u4E0E2\u7EA7\u653B\u51FB\u4E0D\u80FD\u89E6\u53D1\u591A\u4EBA\u62B5\u5200\u3002\n\n- \u6708\u4EAE\u9632\u53CD\u4F18\u5148\u4E8E\u62B5\u5200\u3002\u5B8C\u6210\u672C\u6B21\u51FA\u624B\u7684\u6708\u4EAE\u9632\u53CD\u540E\uFF0C\u5269\u4F59\u653B\u51FB\u624D\u68C0\u67E5\u62B5\u5200\uFF1B\u9664\u6B64\u4EE5\u5916\uFF0C\u62B5\u5200\u4F18\u5148\u4E8E\u666E\u901A\u63A5\u3001\u95EA\u3001\u5E2E\u63A5\u3001\u5E2E\u95EA\u3001\u4E3B\u52A8\u627F\u53D7\u3001\u547D\u4E2D\u548C\u4F24\u5BB3\u6280\u80FD\u3002\n\n- \u62B5\u5200\u6548\u679C\u662F\uFF1A\u672C\u6B21\u5224\u5200\u4E2D\uFF0C\u5168\u5458\u4E0D\u53D7\u8BE5\u7B49\u7EA7\u653B\u51FB\u4F24\u5BB3\uFF1B\u8BE5\u7B49\u7EA7\u653B\u51FB\u5168\u90E8\u5904\u7406\u5B8C\u6BD5\u3002\n\n- \u62B5\u5200\u672C\u8EAB\u4E0D\u91CD\u5F00\uFF1B\u7EE7\u7EED\u5904\u7406\u66F4\u4F4E\u7B49\u7EA7\u653B\u51FB\u3002\u82E5\u5176\u4ED6\u653B\u51FB\u547D\u4E2D\uFF0C\u4ECD\u53EF\u89E6\u53D1\u91CD\u5F00\u3002\n\n## \u9010\u7EA7\u5224\u5200\u603B\u6D41\u7A0B\n\n1. \u68C0\u67E5\u573A\u4E0A\u662F\u5426\u5B58\u5728\u653B\u51FB\uFF1B\u6CA1\u6709\u653B\u51FB\u5219\u8DF3\u81F3\u953B\u9020\u4E0E\u56DE\u5408\u7ED3\u675F\u7ED3\u7B97\u3002\n\n1. \u5148\u5904\u7406\u5947\u8FF9\u4EE4\u540C\u7EA7\u654C\u65B9\u65E0\u6CD5\u4F7F\u7528\u6B66\u5668\u7684\u6548\u679C\uFF1B\u88AB\u963B\u6B62\u7684\u6B66\u5668\u4E0D\u80FD\u5EFA\u7ACB\u3002\u968F\u540E\u540C\u65F6\u5EFA\u7ACB\u5176\u4F59\u884C\u52A8\u5408\u6CD5\u4E14\u5B8C\u6210\u652F\u4ED8\u7684\u653B\u51FB\uFF0C\u5E76\u8BB0\u5F55\u5404\u653B\u51FB\u52A8\u4F5C\u7684\u6700\u7EC8\u653B\u51FB\u7B49\u7EA7\u4E0E\u9632\u5FA1\u7B49\u7EA7\uFF1B\u653B\u51FB\u5EFA\u7ACB\u540E\u518D\u5931\u6548\u3001\u4E0D\u80FD\u547D\u4E2D\u6216\u653B\u51FB\u8005\u6B7B\u4EA1\u5747\u4E0D\u64A4\u9500\u5176\u9632\u5FA1\u7B49\u7EA7\u4E0E\u5DF2\u5EFA\u7ACB\u653B\u51FB\u3002\n\n1. \u68C0\u67E5\u672C\u6B21\u51FA\u624B\u662F\u5426\u5B58\u5728\u5408\u6CD5\u6708\u4EAE\u9632\u53CD\u3002\u82E5\u5B58\u5728\u591A\u540D\u5408\u6CD5\u6708\u4EAE\uFF0C\u5148\u968F\u673A\u786E\u5B9A\u4E00\u540D\u5B9E\u9645\u9632\u53CD\u8005\uFF1B\u8BE5\u6708\u4EAE\u4E00\u6B21\u9632\u53CD\u540C\u65F6\u9632\u4F4F\u5E76\u5206\u522B\u53CD\u5F39\u672C\u6B21\u51FA\u624B\u4E2D\u6240\u6709\u53EF\u80FD\u547D\u4E2D\u81EA\u5DF1\u7684\u653B\u51FB\uFF0C\u4E0D\u53D7\u666E\u901A\u95EA\u7684\u9632\u5FA1\u7B49\u7EA7\u9650\u5236\uFF0C\u5C0F\u5200\u3001\u865A\u65E0\u7B49\u653B\u51FB\u4E5F\u5305\u62EC\u5728\u5185\u3002\u8FD9\u4E9B\u653B\u51FB\u5904\u7406\u5B8C\u6BD5\uFF0C\u4E0D\u518D\u8FDB\u5165\u62B5\u5200\u6216\u540E\u7EED\u5224\u5200\u3002\n\n1. \u5728\u5269\u4F59\u653B\u51FB\u4E2D\u627E\u51FA\u5F53\u524D\u5C1A\u672A\u5904\u7406\u7684\u6700\u9AD8\u653B\u51FB\u7B49\u7EA7\u53CA\u5176\u5168\u90E8\u4F7F\u7528\u8005\uFF1B\u540C\u7B49\u7EA7\u653B\u51FB\u8005\u4E92\u76F8\u4E0D\u8FDB\u5165\u672C\u7B49\u7EA7\u5019\u9009\u8303\u56F4\uFF0C\u540C\u7B49\u7EA7\u5185\u4E0D\u6BD4\u8F83\u653B\u51FB\u4F24\u5BB3\uFF0C\u800C\u662F\u5148\u5C06\u5404\u653B\u51FB\u968F\u673A\u6392\u5E8F\u3002\n\n1. \u68C0\u67E5\u8BE5\u7B49\u7EA7\u662F\u5426\u6EE1\u8DB3\u62B5\u5200\uFF1B\u6EE1\u8DB3\u5219\u53D6\u6D88\u8BE5\u7B49\u7EA7\u5168\u90E8\u4F24\u5BB3\u5E76\u8F6C\u5165\u4E0B\u4E00\u7B49\u7EA7\u3002\n\n1. \u5904\u7406\u653B\u51FB\u5EFA\u7ACB\u540E\u624D\u53D1\u751F\u7684\u65E0\u6548\u3001\u6539\u5199\u6216\u4E0D\u80FD\u547D\u4E2D\u6548\u679C\u3002\n\n1. \u786E\u5B9A\u8BE5\u653B\u51FB\u53EF\u4EE5\u547D\u4E2D\u7684\u5168\u90E8\u654C\u5BF9\u89D2\u8272\uFF0C\u5E76\u6392\u9664\u672C\u7B49\u7EA7\u53CA\u66F4\u9AD8\u7B49\u7EA7\u653B\u51FB\u8005\u3001\u5DF2\u7ECF\u5360\u7528\u5224\u5200\u627F\u53D7\u540D\u989D\u8005\u3002\u666E\u901A\u653B\u51FB\u4E0D\u80FD\u6307\u5B9A\u76EE\u6807\u961F\u4F0D\uFF1B\u5224\u5200\u8303\u56F4\u6C38\u8FDC\u53EA\u9650\u4E8E\u8FD9\u4E9B\u53EF\u80FD\u53D7\u4F24\u8005\u3002\n\n1. \u82E5\u5F53\u524D\u4E0D\u662F\u6781\u5149\u590D\u5236\u653B\u51FB\uFF0C\u5728\u539F\u5224\u5200\u8303\u56F4\u5185\u8BE2\u95EE\u5C1A\u6709\u9632\u5FA1\u989D\u5EA6\u3001\u4E14\u63A5\u6216\u95EA\u80FD\u591F\u9632\u4F4F\u5F53\u524D\u653B\u51FB\u7684\u89D2\u8272\u662F\u5426\u5E2E\u63A5\u6216\u5E2E\u95EA\u3002\u58F0\u660E\u5E2E\u52A9\u8005\u7ACB\u5373\u653E\u5F03\u8BE5\u884C\u52A8\u5BF9\u81EA\u5DF1\u7684\u4FDD\u62A4\uFF1B\u82E5\u53E6\u6709\u653B\u51FB\u968F\u673A\u4F5C\u7528\u4E8E\u81EA\u5DF1\uFF0C\u5FC5\u987B\u7531\u5176\u4ED6\u6709\u6548\u9632\u5FA1\u4FDD\u62A4\uFF0C\u5426\u5219\u4F1A\u88AB\u547D\u4E2D\u3002\n\n1. \u82E5\u6709\u4E00\u4EBA\u6216\u591A\u4EBA\u58F0\u660E\u5E2E\u63A5\u6216\u5E2E\u95EA\uFF0C\u672C\u5200\u88AB\u5B8C\u6574\u9632\u4F4F\u4E14\u65E0\u4EBA\u53D7\u4F24\uFF0C\u5E76\u8BB0\u5F55\u63A5\uFF0F\u95EA\u6210\u529F\u4E0E\u7EDF\u4E00\u91CD\u5F00\uFF1B\u5168\u90E8\u5DF2\u5EFA\u7ACB\u653B\u51FB\u7ED3\u7B97\u5B8C\u6BD5\u540E\uFF0C\u6240\u6709\u5B58\u6D3B\u8005\u953B\u6570\u5F52\u96F6\u3002\u672C\u5200\u7684\u5B9E\u9645\u6210\u529F\u8005\u4ECE\u5168\u90E8\u58F0\u660E\u8005\u4E2D\u7B49\u6982\u7387\u9009\u51FA\uFF1B\u5B9E\u9645\u6210\u529F\u8005\u6D88\u8017\u4E00\u6B21\u9632\u5FA1\u989D\u5EA6\uFF0C\u5176\u4ED6\u58F0\u660E\u8005\u4FDD\u7559\u989D\u5EA6\uFF0C\u4F46\u672C\u6B21\u51FA\u624B\u4ECD\u4E0D\u6062\u590D\u81EA\u6211\u4FDD\u62A4\u3002\u6781\u5149\u590D\u5236\u653B\u51FB\u8DF3\u8FC7\u6574\u4E2A\u5E2E\u63A5\uFF0F\u5E2E\u95EA\u7A97\u53E3\uFF0C\u63A5\u548C\u95EA\u53EA\u80FD\u5728\u67D0\u628A\u590D\u5236\u653B\u51FB\u968F\u673A\u4F5C\u7528\u4E8E\u4F7F\u7528\u8005\u672C\u4EBA\u65F6\u9632\u5FA1\u3002\n\n1. \u82E5\u6CA1\u6709\u5E2E\u63A5\u6216\u5E2E\u95EA\u6210\u529F\uFF0C\u518D\u68C0\u67E5\u4E3B\u52A8\u627F\u53D7\u3002\u53EA\u6709\u672C\u56DE\u5408\u5C1A\u672A\u5360\u7528\u5224\u5200\u540D\u989D\u3001\u4F4D\u4E8E\u539F\u5224\u5200\u8303\u56F4\u4E14\u5F53\u524D\u884C\u52A8\u4E0D\u80FD\u9632\u4F4F\u8BE5\u653B\u51FB\u7684\u89D2\u8272\u53EF\u4EE5\u4E3B\u52A8\u627F\u53D7\u3002\u82E5\u6709\u4E00\u4EBA\u6216\u591A\u4EBA\u4E3B\u52A8\u627F\u53D7\uFF0C\u4ECE\u4E2D\u7B49\u6982\u7387\u9009\u51FA\u4E00\u4EBA\uFF0C\u7ACB\u5373\u786E\u8BA4\u5F53\u524D\u653B\u51FB\u547D\u4E2D\u8BE5\u89D2\u8272\u5E76\u5360\u7528\u5176\u672C\u56DE\u5408\u552F\u4E00\u5224\u5200\u540D\u989D\uFF1B\u4E0D\u5F97\u518D\u7528\u63A5\u6216\u95EA\u66FF\u8FD9\u6B21\u4E3B\u52A8\u627F\u53D7\u9632\u5FA1\u3002\n\n1. \u82E5\u65E0\u4EBA\u4E3B\u52A8\u627F\u53D7\uFF0C\u672A\u58F0\u660E\u5E2E\u52A9\u7684\u6709\u6548\u63A5\uFF0F\u95EA\u4F7F\u7528\u8005\u4EE5\u8BE5\u884C\u52A8\u786E\u5B9A\u4FDD\u62A4\u81EA\u5DF1\uFF0C\u4E0D\u8FDB\u5165\u672C\u5200\u5176\u4F59\u627F\u53D7\u8005\u7684\u968F\u673A\u8303\u56F4\uFF1B\u518D\u4ECE\u5176\u4ED6\u53EF\u80FD\u53D7\u4F24\u8005\u4E2D\u7B49\u6982\u7387\u51B3\u5B9A\u627F\u53D7\u8005\u3002\u82E5\u6240\u6709\u53EF\u80FD\u53D7\u4F24\u8005\u5747\u88AB\u6709\u6548\u63A5\u6216\u95EA\u4FDD\u62A4\uFF0C\u5219\u672C\u5200\u76F4\u63A5\u9632\u5FA1\u6210\u529F\uFF0C\u5E76\u4ECE\u8FD9\u4E9B\u81EA\u4FDD\u8005\u4E2D\u7B49\u6982\u7387\u8BB0\u5F55\u4E00\u540D\u5B9E\u9645\u6210\u529F\u8005\u3002\n\n1. \u63A5\u6216\u95EA\u6210\u529F\u4F1A\u8BB0\u5F55\u91CD\u5F00\u539F\u56E0\uFF0C\u4F46\u4E0D\u7ACB\u523B\u4E2D\u65AD\u540C\u4E00\u6B21\u5171\u540C\u51FA\u624B\u4E2D\u7684\u5176\u4ED6\u5DF2\u5EFA\u7ACB\u653B\u51FB\u3002\u672A\u58F0\u660E\u5E2E\u52A9\u4E14\u6CA1\u6709\u968F\u673A\u9009\u4E2D\u7684\u63A5\uFF0F\u95EA\u4FDD\u7559\u81EA\u6211\u4FDD\u62A4\u548C\u9632\u5FA1\u989D\u5EA6\uFF1B\u58F0\u660E\u5E2E\u52A9\u4F46\u672A\u6210\u4E3A\u5B9E\u9645\u6210\u529F\u8005\u7684\u63A5\uFF0F\u95EA\u53EA\u4FDD\u7559\u540E\u7EED\u5E2E\u52A9\u989D\u5EA6\uFF0C\u4E0D\u6062\u590D\u81EA\u6211\u4FDD\u62A4\u3002\n\n1. \u76EE\u6807\u4E00\u65E6\u901A\u8FC7\u4E3B\u52A8\u627F\u53D7\u6216\u968F\u673A\u5224\u5200\u786E\u5B9A\uFF0C\u5176\u4ED6\u89D2\u8272\u4E0D\u80FD\u518D\u8FFD\u52A0\u5E2E\u52A9\u3002\u4EE3\u7801\u4E2D\u7684\u6240\u6709\u968F\u673A\u9009\u62E9\u5747\u5E94\u8BB0\u5F55\u5019\u9009\u8303\u56F4\u548C\u7ED3\u679C\u3002\n\n1. \u5C06\u547D\u4E2D\u8005\u6807\u8BB0\u4E3A\u672C\u56DE\u5408\u5DF2\u627F\u53D7\u4E00\u6B21\u653B\u51FB\uFF0C\u79FB\u51FA\u540E\u7EED\u653B\u51FB\u7684\u5224\u5200\u8303\u56F4\uFF1B\u4E3B\u52A8\u627F\u53D7\u8005\u5728\u88AB\u9009\u4E2D\u65F6\u7ACB\u5373\u5B8C\u6210\u8FD9\u4E00\u6807\u8BB0\u3002\n\n1. \u6309\u968F\u673A\u987A\u5E8F\u9010\u628A\u5904\u7406\u8BE5\u7B49\u7EA7\u653B\u51FB\uFF1B\u6BCF\u628A\u666E\u901A\u653B\u51FB\u5206\u522B\u786E\u5B9A\u4E00\u540D\u627F\u53D7\u8005\u3002\u8BE5\u7B49\u7EA7\u5168\u90E8\u5904\u7406\u5B8C\u6BD5\u540E\uFF0C\u8FD9\u4E9B\u653B\u51FB\u52A8\u4F5C\u7684\u9632\u5FA1\u7B49\u7EA7\u7EE7\u7EED\u8986\u76D6\u540E\u7EED\u8F83\u4F4E\u7B49\u7EA7\u653B\u51FB\uFF0C\u518D\u8F6C\u5165\u4E0B\u4E00\u8F83\u4F4E\u7B49\u7EA7\uFF0C\u76F4\u81F3\u6240\u6709\u5DF2\u5EFA\u7ACB\u653B\u51FB\u5904\u7406\u5B8C\u6BD5\u3002\n\n## \u63A5\u3001\u95EA\u3001\u5E2E\u52A9\u4E0E\u4E3B\u52A8\u627F\u53D7\n\n\u666E\u901A\u63A5\u548C\u666E\u901A\u95EA\u662F\u5177\u6709\u4E00\u6B21\u9632\u5FA1\u989D\u5EA6\u7684\u884C\u52A8\uFF0C\u4E00\u6B21\u5171\u540C\u51FA\u624B\u4E2D\u53EA\u80FD\u5B9E\u9645\u6321\u4E00\u628A\u5200\u3002\u9664\u6781\u5149\u590D\u5236\u653B\u51FB\u5916\uFF0C\u5B83\u4EEC\u65E2\u53EF\u4EE5\u786E\u5B9A\u4FDD\u62A4\u4F7F\u7528\u8005\u672C\u4EBA\uFF0C\u4E5F\u53EF\u4EE5\u5728\u968F\u673A\u76EE\u6807\u786E\u5B9A\u524D\u58F0\u660E\u5E2E\u63A5\u6216\u5E2E\u95EA\u3002\u5E2E\u52A9\u662F\u4E00\u79CD\u8D4C\u535A\uFF1A\u4E0D\u5E2E\u52A9\u65F6\u81EA\u5DF1\u5FC5\u5B9A\u5B89\u5168\uFF0C\u4F46\u653B\u51FB\u53EF\u80FD\u547D\u4E2D\u5176\u4ED6\u961F\u4F0D\uFF0C\u4E5F\u53EF\u80FD\u547D\u4E2D\u81EA\u5DF1\u7684\u961F\u53CB\uFF1B\u9009\u62E9\u5E2E\u52A9\u5219\u5F53\u524D\u5200\u88AB\u5B8C\u6574\u9632\u4F4F\u3001\u65E0\u4EBA\u53D7\u4F24\u5E76\u6700\u7EC8\u7EDF\u4E00\u91CD\u5F00\u3001\u953B\u6570\u5F52\u96F6\uFF0C\u5374\u7ACB\u5373\u5931\u53BB\u672C\u6B21\u51FA\u624B\u5BF9\u81EA\u5DF1\u7684\u4FDD\u62A4\u3002\u6708\u4EAE\u7684\u9632\u53CD\u662F\u660E\u786E\u4F8B\u5916\uFF1A\u4E00\u6B21\u9632\u53CD\u53EF\u5904\u7406\u672C\u6B21\u51FA\u624B\u4E2D\u5168\u90E8\u5408\u6CD5\u653B\u51FB\u3002\n\n- \u9009\u62E9\u4E0D\u5E2E\u52A9\u65F6\uFF0C\u63A5\uFF0F\u95EA\u4F7F\u7528\u8005\u672C\u4EBA\u4ECE\u8BE5\u5200\u7684\u53EF\u547D\u4E2D\u968F\u673A\u8303\u56F4\u4E2D\u6392\u9664\uFF0C\u5176\u4F59\u672A\u53D7\u4FDD\u62A4\u8005\u7EE7\u7EED\u5E73\u7B49\u5224\u5200\uFF1B\u4F5C\u51FA\u8FD9\u4E00\u9009\u62E9\u540E\uFF0C\u4E0D\u80FD\u56E0\u7ED3\u679C\u5C06\u547D\u4E2D\u961F\u53CB\u800C\u53CD\u6094\u8FFD\u52A0\u5E2E\u52A9\u3002\n\n- \u58F0\u660E\u5E2E\u63A5\u6216\u5E2E\u95EA\u65F6\uFF0C\u8868\u793A\u613F\u610F\u4FDD\u62A4\u5F53\u524D\u6574\u628A\u5200\u7684\u539F\u5224\u5200\u8303\u56F4\uFF0C\u5E76\u7ACB\u5373\u653E\u5F03\u672C\u6B21\u51FA\u624B\u7684\u81EA\u6211\u4FDD\u62A4\u3002\u82E5\u53E6\u6709\u653B\u51FB\u4F5C\u7528\u4E8E\u81EA\u5DF1\uFF0C\u5FC5\u987B\u7531\u5176\u4ED6\u5C1A\u6709\u6548\u7684\u63A5\uFF0F\u95EA\u4FDD\u62A4\uFF0C\u5426\u5219\u4F1A\u88AB\u547D\u4E2D\u3002\n\n- \u591A\u4EBA\u58F0\u660E\u5E2E\u52A9\u65F6\uFF0C\u4ECE\u5168\u90E8\u6709\u6548\u5E2E\u52A9\u8005\u4E2D\u7B49\u6982\u7387\u9009\u51FA\u4E00\u540D\u5B9E\u9645\u6210\u529F\u8005\uFF1B\u53EA\u6709\u5B9E\u9645\u6210\u529F\u8005\u6D88\u8017\u9632\u5FA1\u989D\u5EA6\u5E76\u7D2F\u8BA1\u76F8\u5E94\u6210\u529F\u6B21\u6570\uFF0C\u5176\u4ED6\u5E2E\u52A9\u8005\u4FDD\u7559\u540E\u7EED\u5E2E\u52A9\u989D\u5EA6\uFF0C\u4F46\u4E0D\u6062\u590D\u81EA\u6211\u4FDD\u62A4\u3002\n\n- \u4E3B\u52A8\u627F\u53D7\u5FC5\u987B\u53D1\u751F\u5728\u653B\u51FB\u4F5C\u7528\u5BF9\u8C61\u968F\u673A\u786E\u5B9A\u4E4B\u524D\uFF1B\u76EE\u6807\u786E\u5B9A\u540E\u4E0D\u5F97\u8FFD\u52A0\u4E3B\u52A8\u627F\u53D7\u3002\n\n- \u6781\u5149\u590D\u5236\u653B\u51FB\u4E0D\u80FD\u5E2E\u63A5\u6216\u5E2E\u95EA\uFF1B\u666E\u901A\u63A5\u548C\u95EA\u53EA\u80FD\u5728\u590D\u5236\u653B\u51FB\u968F\u673A\u4F5C\u7528\u4E8E\u4F7F\u7528\u8005\u672C\u4EBA\u65F6\u9632\u5FA1\u3002\u8BE5\u9650\u5236\u4E0D\u53D6\u6D88\u6781\u5149\u5224\u5200\u4E2D\u7684\u4E3B\u52A8\u627F\u53D7\u3002\n\n- \u4E3B\u52A8\u627F\u53D7\u8005\u88AB\u9009\u4E2D\u540E\uFF0C\u5F53\u524D\u653B\u51FB\u76F4\u63A5\u6309\u547D\u4E2D\u81EA\u5DF1\u7ED3\u7B97\uFF0C\u5E76\u7ACB\u5373\u6D88\u8017\u672C\u56DE\u5408\u4E00\u6B21\u5224\u5200\u540D\u989D\u3002\n\n- \u653B\u51FB\u7684\u4F5C\u7528\u5BF9\u8C61\u4E00\u65E6\u901A\u8FC7\u4E3B\u52A8\u627F\u53D7\u6216\u968F\u673A\u5224\u5200\u786E\u5B9A\uFF0C\u5176\u4ED6\u89D2\u8272\u4E0D\u5F97\u518D\u8FFD\u52A0\u5E2E\u52A9\u3002\n\n- \u82E5\u5F53\u524D\u5168\u90E8\u53EF\u80FD\u53D7\u4F24\u8005\u5747\u4F7F\u7528\u4E86\u80FD\u591F\u9632\u4F4F\u8BE5\u5200\u7684\u63A5\u6216\u95EA\u4E14\u5747\u9009\u62E9\u81EA\u4FDD\uFF0C\u5219\u8BE5\u5200\u76F4\u63A5\u9632\u5FA1\u6210\u529F\uFF0C\u518D\u4ECE\u8FD9\u4E9B\u89D2\u8272\u4E2D\u7B49\u6982\u7387\u8BB0\u5F55\u4E00\u540D\u5B9E\u9645\u6210\u529F\u8005\u3002\n\n## \u591A\u961F\u653B\u51FB\u8303\u56F4\n\n\u6240\u6709\u666E\u901A\u653B\u51FB\u5747\u4E0D\u80FD\u6307\u5B9A\u76EE\u6807\u961F\u4F0D\u3002\u573A\u4E0A\u5168\u90E8\u654C\u5BF9\u9635\u8425\u4E2D\u80FD\u591F\u88AB\u5F53\u524D\u653B\u51FB\u547D\u4E2D\u7684\u89D2\u8272\u5171\u540C\u8FDB\u5165\u53EF\u80FD\u53D7\u4F24\u8303\u56F4\u3002\u5224\u5200\u5B8C\u6210\u540E\uFF0C\u4E00\u628A\u666E\u901A\u653B\u51FB\u6700\u7EC8\u53EA\u9009\u51FA\u4E00\u540D\u627F\u53D7\u8005\uFF1B\u865A\u65E0\u6309\u56FA\u5B9A\u5168\u4F53\u76EE\u6807\u89C4\u5219\u5904\u7406\uFF0C\u6781\u5149\u5219\u590D\u5236\u51FA\u6570\u91CF\u7B49\u4E8E\u654C\u65B9\u4EBA\u6570\u7684\u591A\u628A\u76F8\u540C\u653B\u51FB\uFF0C\u6BCF\u4E00\u628A\u4ECD\u5206\u522B\u968F\u673A\u5224\u5200\u3002\u730E\u4EBA\u6B7B\u4EA1\u4F24\u5BB3\u7B49\u660E\u786E\u5199\u660E\u201C\u9009\u62E9\u4E00\u540D\u5176\u4ED6\u89D2\u8272\u201D\u7684\u6280\u80FD\u6548\u679C\u53EF\u4EE5\u76F4\u63A5\u9009\u62E9\u89D2\u8272\uFF0C\u4E0D\u9002\u7528\u666E\u901A\u653B\u51FB\u7684\u968F\u673A\u5224\u5200\u76EE\u6807\u89C4\u5219\u3002\n\n## \u591A\u4EBA\u865A\u65E0\n\n\u865A\u65E0\u5728\u591A\u4EBA\u5BF9\u6218\u4E2D\u662F\u56FA\u5B9A\u5168\u4F53\u76EE\u6807\u653B\u51FB\u3002\u666E\u901A\u89D2\u8272\u6253\u51FA\u865A\u65E0\u65F6\uFF0C\u5411\u6240\u6709\u5408\u6CD5\u654C\u65B9\u89D2\u8272\u5206\u522B\u4EA7\u751F\u4E00\u628A\u56FA\u5B9A\u76EE\u6807\u5200\uFF1B\u5177\u6709\u53CB\u4F24\u7684\u89D2\u8272\u6253\u51FA\u865A\u65E0\u65F6\uFF0C\u76EE\u6807\u6269\u5C55\u4E3A\u9664\u4F7F\u7528\u8005\u81EA\u5DF1\u4EE5\u5916\u7684\u6240\u6709\u5408\u6CD5\u89D2\u8272\uFF0C\u5305\u62EC\u961F\u53CB\u4E0E\u654C\u4EBA\u3002\n\n- \u865A\u65E0\u4ECD\u987B\u5148\u5B8C\u6210\u884C\u52A8\u5408\u6CD5\u6027\u4E0E6\u953B\u652F\u4ED8\uFF0C\u5E76\u6309\u6700\u7EC86\u7EA7\u68C0\u67E5\u62B5\u5200\uFF1B\u53D1\u751F\u62B5\u5200\u65F6\u6574\u6B21\u865A\u65E0\u53D6\u6D88\uFF0C\u4E0D\u5C55\u5F00\u76EE\u6807\u5200\u3002\n\n- \u672A\u62B5\u5200\u65F6\uFF0C\u5148\u4F9D\u636E\u5404\u89D2\u8272\u884C\u52A8\u7684\u9632\u5FA1\u7B49\u7EA7\u53CA\u5DF2\u5360\u7528\u5224\u5200\u540D\u989D\u7B49\u89C4\u5219\u6392\u9664\u5019\u9009\uFF0C\u518D\u5411\u5176\u4F59\u5408\u6CD5\u76EE\u6807\u5C55\u5F00\u56FA\u5B9A\u76EE\u6807\u5200\u3002\n\n- \u6BCF\u628A\u865A\u65E0\u76EE\u6807\u5200\u5206\u522B\u786E\u8BA4\u547D\u4E2D\u5E76\u9020\u6210\u7B49\u4E8E\u653B\u51FB\u8005\u5F53\u524D\u653B\u51FB\u529B\u7684\u4F24\u5BB3\uFF1B\u865A\u65E0\u4E0D\u80FD\u88AB\u9632\u3001\u63A5\u3001\u666E\u901A\u95EA\u6216\u5927\u76FE\u9632\u5FA1\uFF0C\u4F46\u6708\u4EAE\u9632\u53CD\u5C5E\u4E8E\u660E\u786E\u4F8B\u5916\uFF0C\u53EF\u4EE5\u5728\u62B5\u5200\u524D\u9632\u4F4F\u5E76\u53CD\u5F39\u865A\u65E0\u3002\n\n- \u5404\u76EE\u6807\u5200\u5C5E\u4E8E\u540C\u4E00\u6B21\u5171\u540C\u51FA\u624B\u5E76\u540C\u65F6\u53D1\u751F\uFF1B\u4F9D\u6B21\u8BB0\u5F55\u547D\u4E2D\u3001\u4F24\u5BB3\u3001\u6280\u80FD\u548C\u6B7B\u4EA1\uFF0C\u5168\u90E8\u5B8C\u6210\u540E\u7EDF\u4E00\u5904\u7406\u91CD\u5F00\u3002\n\n## \u540C\u7B49\u7EA7\u591A\u628A\u653B\u51FB\u7684\u987A\u5E8F\n\n\u540C\u4E00\u7B49\u7EA7\u5B58\u5728\u591A\u628A\u672A\u62B5\u5200\u653B\u51FB\u65F6\uFF0C\u4E0D\u6309\u653B\u51FB\u529B\u6216\u6700\u7EC8\u4F24\u5BB3\u4ECE\u9AD8\u5230\u4F4E\u6392\u5E8F\uFF0C\u800C\u662F\u5148\u968F\u673A\u6392\u5217\u540E\u9010\u628A\u5224\u5200\u3002\u540C\u7B49\u7EA7\u653B\u51FB\u52A8\u4F5C\u7684\u9632\u5FA1\u7B49\u7EA7\u5747\u8986\u76D6\u672C\u7B49\u7EA7\uFF0C\u6545\u8FD9\u4E9B\u884C\u52A8\u8005\u4E92\u76F8\u4E0D\u6210\u4E3A\u672C\u7B49\u7EA7\u653B\u51FB\u5019\u9009\uFF1B\u6BCF\u628A\u666E\u901A\u653B\u51FB\u5404\u9009\u4E00\u540D\u5176\u4ED6\u627F\u53D7\u8005\u3002\u5DF2\u5360\u7528\u672C\u56DE\u5408\u5224\u5200\u627F\u53D7\u540D\u989D\u8005\u4E0D\u8FDB\u5165\u540E\u7EED\u5019\u9009\u3002\u884C\u52A8\u8005\u5728\u51FA\u624B\u8FC7\u7A0B\u4E2D\u6B7B\u4EA1\u4E5F\u4E0D\u53D6\u6D88\u5DF2\u5EFA\u7ACB\u653B\u51FB\u3002\u8BE5\u7B49\u7EA7\u5B8C\u6210\u540E\uFF0C\u8FD9\u4E9B\u653B\u51FB\u52A8\u4F5C\u7684\u9632\u5FA1\u7B49\u7EA7\u7EE7\u7EED\u8986\u76D6\u66F4\u4F4E\u7B49\u7EA7\u653B\u51FB\u3002\n\n## \u4E3B\u52A8\u627F\u53D7\uFF08\u5E2E\u5403\uFF09\n\n- \u4E3B\u52A8\u627F\u53D7\u53C8\u79F0\u5E2E\u5403\uFF0C\u4E0E\u5E2E\u63A5\u3001\u5E2E\u95EA\u662F\u4E0D\u540C\u7684\u5E2E\u52A9\u65B9\u5F0F\u3002\u53EA\u6709\u539F\u5224\u5200\u8303\u56F4\u5185\u3001\u672C\u56DE\u5408\u5C1A\u672A\u5360\u7528\u5224\u5200\u540D\u989D\u4E14\u5F53\u524D\u884C\u52A8\u4E0D\u80FD\u9632\u4F4F\u8BE5\u653B\u51FB\u7684\u89D2\u8272\u5177\u6709\u4E3B\u52A8\u627F\u53D7\u8D44\u683C\u3002\n\n- \u73A9\u5BB6\u53EA\u80FD\u51B3\u5B9A\u81EA\u5DF1\u662F\u5426\u4E3B\u52A8\u627F\u53D7\uFF0C\u4E0D\u80FD\u6307\u5B9A\u961F\u53CB\u6216\u654C\u4EBA\uFF1BAI\u89D2\u8272\u6309\u89C4\u5219\u6216\u7B56\u7565\u51B3\u5B9A\u81EA\u5DF1\u662F\u5426\u4E3B\u52A8\u627F\u53D7\u3002\n\n- \u82E5\u6709\u591A\u540D\u4E3B\u52A8\u627F\u53D7\u8005\uFF0C\u4ECE\u4E2D\u7B49\u6982\u7387\u968F\u673A\u9009\u51FA\u4E00\u4EBA\uFF1B\u4E3B\u52A8\u627F\u53D7\u8005\u4E0D\u80FD\u6307\u5B9A\u6700\u7EC8\u7531\u8C01\u627F\u53D7\u3002\n\n- \u73A9\u5BB6\u672C\u56DE\u5408\u5DF2\u7ECF\u5360\u7528\u5224\u5200\u540D\u989D\u3001\u5DF2\u7ECF\u6B7B\u4EA1\u3001\u9000\u573A\u3001\u4E0D\u80FD\u88AB\u8BE5\u653B\u51FB\u547D\u4E2D\u6216\u5F53\u524D\u884C\u52A8\u80FD\u591F\u9632\u4F4F\u8BE5\u653B\u51FB\u65F6\uFF0C\u4E0D\u5F97\u4E3B\u52A8\u627F\u53D7\u3002\n\n- \u4E3B\u52A8\u627F\u53D7\u8005\u88AB\u9009\u4E2D\u540E\u7ACB\u5373\u786E\u8BA4\u547D\u4E2D\u5E76\u5360\u7528\u5176\u672C\u56DE\u5408\u552F\u4E00\u5224\u5200\u540D\u989D\uFF0C\u968F\u540E\u6B63\u5E38\u5904\u7406\u547D\u4E2D\u6280\u80FD\u3001\u9632\u6B62\u4F24\u5BB3\u4E0E\u6B7B\u4EA1\uFF1B\u5373\u4F7F\u4F24\u5BB3\u6700\u7EC8\u4E3A0\uFF0C\u4E5F\u4E0D\u80FD\u518D\u88AB\u672C\u56DE\u5408\u5176\u4ED6\u6B66\u5668\u547D\u4E2D\u3002\n\n## \u591A\u4EBA\u91CD\u5F00\u4E0E\u7EE7\u7EED\n\n\u653B\u51FB\u547D\u4E2D\u3001\u63A5\u6210\u529F\u3001\u95EA\u6210\u529F\u6216\u89C2\u4F17\u9000\u573A\u90FD\u4F1A\u8BB0\u5F55\u91CD\u5F00\u3002\u91CD\u5F00\u53EA\u5728\u540C\u4E00\u6B21\u5171\u540C\u51FA\u624B\u4E2D\u5168\u90E8\u5DF2\u5EFA\u7ACB\u653B\u51FB\u3001\u6781\u5149\u590D\u5236\u653B\u51FB\u3001\u547D\u4E2D\u54CD\u5E94\u3001\u4F24\u5BB3\u4E0E\u6B7B\u4EA1\u8FDE\u9501\u7ED3\u7B97\u5B8C\u6210\u540E\u7EDF\u4E00\u6267\u884C\uFF0C\u4E0D\u5F97\u56E0\u5148\u51FA\u73B0\u63A5\uFF0F\u95EA\u6210\u529F\u800C\u4E2D\u65AD\u540C\u65F6\u53D1\u751F\u7684\u5176\u4ED6\u547D\u4E2D\u3002\u5355\u7EAF\u62B5\u5200\u3001\u9632\u4F4F\u653B\u51FB\u6216\u65E0\u4EBA\u88AB\u547D\u4E2D\u4E0D\u91CD\u5F00\uFF0C\u953B\u6570\u4FDD\u7559\u5E76\u7EE7\u7EED\u5F53\u524D\u56DE\u5408\u3002\u62B5\u5200\u4E0E\u5176\u4ED6\u653B\u51FB\u547D\u4E2D\u53EF\u4EE5\u5728\u540C\u4E00\u51FA\u624B\u4E2D\u5E76\u5B58\uFF1B\u6B64\u65F6\u4ECD\u56E0\u5176\u4ED6\u547D\u4E2D\u91CD\u5F00\u3002\n";
  const MOVES = {
    forge: { name: "\u953B\u9020", type: "basic", icon: "\u270A", cost: 0, gain: 1, summary: "+1 \u80FD\u91CF \xB7 \u65E0\u9632\u5FA1", rule: "\u83B7\u5F971\u683C\u80FD\u91CF\uFF1B\u953B\u9020\u65F6\u88AB\u4EFB\u610F\u653B\u51FB\u547D\u4E2D\u3002" },
    guard: { name: "\u9632", type: "basic", icon: "\u{1F6E1}\uFE0F", cost: 0, blocks: [1, 2], summary: "\u6321 1\uFF5E2 \u7EA7 \xB7 \u514D\u8D39", rule: "\u6321\u4F4F\u5C0F\u5200\u548C\u6B66\u58EB\u5200\uFF1B\u6321\u4E0D\u4F4F3\u7EA7\u4EE5\u4E0A\u653B\u51FB\u3002" },
    catch: { name: "\u63A5", type: "basic", icon: "\u{1F932}", cost: 0, blocks: [2, 3], resets: true, summary: "\u6321 2\uFF5E3 \u7EA7 \xB7 \u91CD\u7F6E", rule: "\u63A5\u4F4F\u6B66\u58EB\u5200\u6216\u624B\u91CC\u5251\u540E\uFF0C\u53CC\u65B9\u80FD\u91CF\u5F52\u96F6\u3002" },
    flash: { name: "\u95EA", type: "basic", icon: "\u{1F4A8}", cost: 2, blocks: [2, 3, 4, 5], resets: true, summary: "\u6321 2\uFF5E5 \u7EA7 \xB7 2 \u80FD\u91CF", rule: "\u8EB2\u5F002\uFF5E5\u7EA7\u653B\u51FB\u5E76\u91CD\u7F6E\u80FD\u91CF\uFF1B\u6321\u4E0D\u4E86\u5C0F\u5200\u548C\u865A\u65E0\u3002" },
    scissors: { name: "\u526A\u5200", type: "attack", icon: "\u2702\uFE0F", cost: 1, level: 1.5, summary: "\u7279\u6B8A\u653B\u51FB \xB7 1 \u80FD\u91CF", rule: "\u514B\u5236\u5C0F\u5200\u3001\u6B66\u58EB\u5200\u3001\u624B\u91CC\u5251\u548C\u63A5\uFF1B\u88AB\u9632\u3001\u95EA\u3001\u953B\u9020\u3001\u82E6\u65E0\u3001\u9F99\u7259\u548C\u865A\u65E0\u514B\u5236\u3002" },
    knife: { name: "\u5C0F\u5200", type: "attack", icon: "\u{1F52A}", cost: 1, level: 1, summary: "1 \u7EA7\u653B\u51FB", rule: "\u6700\u4F4E\u6D88\u8017\u7684\u653B\u51FB\uFF0C\u53EF\u51FB\u4E2D\u953B\u9020\u3001\u63A5\u548C\u95EA\u3002" },
    katana: { name: "\u6B66\u58EB\u5200", type: "attack", icon: "\u2694\uFE0F", cost: 2, level: 2, summary: "2 \u7EA7\u653B\u51FB", rule: "\u5F3A\u4E8E\u5C0F\u5200\uFF0C\u4F46\u4F1A\u88AB\u9632\u3001\u63A5\u548C\u95EA\u6321\u4F4F\u3002" },
    shuriken: { name: "\u624B\u91CC\u5251", type: "attack", icon: "\u2726", cost: 3, level: 3, summary: "3 \u7EA7\u653B\u51FB", rule: "\u80FD\u591F\u7A81\u7834\u9632\uFF0C\u4F46\u4F1A\u88AB\u63A5\u6216\u95EA\u6321\u4F4F\u3002" },
    kunai: { name: "\u82E6\u65E0", type: "attack", icon: "\u{1F5E1}\uFE0F", cost: 4, level: 4, summary: "4 \u7EA7\u653B\u51FB", rule: "\u53EA\u6709\u95EA\u80FD\u9632\u4F4F\uFF1B\u9AD8\u7EA7\u653B\u51FB\u4F1A\u538B\u5236\u4F4E\u7EA7\u653B\u51FB\u3002" },
    dragonFang: { name: "\u9F99\u7259", type: "attack", icon: "\u{1F409}", cost: 5, level: 5, summary: "5 \u7EA7\u653B\u51FB", rule: "\u53EA\u6709\u95EA\u80FD\u9632\u4F4F\uFF0C\u5A01\u529B\u4EC5\u6B21\u4E8E\u865A\u65E0\u3002" },
    void: { name: "\u865A\u65E0", type: "attack", icon: "\u25C9", cost: 6, level: 6, multiTarget: true, summary: "6 \u7EA7 \xB7 \u591A\u4EBA\u5168\u4F53", rule: "\u4EFB\u4F55\u9632\u5FA1\u90FD\u65E0\u6CD5\u62B5\u6321\u3002\u591A\u4EBA\u4E2D\u653B\u51FB\u6240\u6709\u5408\u6CD5\u654C\u4EBA\uFF1B\u53CB\u4F24\u89D2\u8272\u4F7F\u7528\u65F6\u653B\u51FB\u9664\u81EA\u5DF1\u5916\u7684\u6240\u6709\u5408\u6CD5\u89D2\u8272\u30026\u7EA7\u662F\u653B\u51FB\u7B49\u7EA7\uFF0C\u4F24\u5BB3\u4ECD\u53D6\u653B\u51FB\u8005\u653B\u51FB\u529B\u3002" }
  };
  const MOVE_KEYS = Object.keys(MOVES);
  const ATTACK_KEYS = MOVE_KEYS.filter((key) => MOVES[key].type === "attack");
  function canAfford(moveKey, energy) {
    return MOVES[moveKey].cost <= energy;
  }
  function outcome(playerHit = false, aiHit = false, reset = false, title = "", detail = "") {
    return { playerHit, aiHit, reset, title, detail };
  }
  function resolveDuelCombat(playerKey, aiKey) {
    const player = MOVES[playerKey];
    const ai = MOVES[aiKey];
    if (!player || !ai) throw new Error("\u672A\u77E5\u62DB\u5F0F");
    if (playerKey === "scissors" || aiKey === "scissors") return resolveScissors(playerKey, aiKey);
    if (player.type === "basic" && ai.type === "basic") {
      if (playerKey === "forge" && aiKey === "forge") return outcome(false, false, false, "\u53CC\u65B9\u953B\u9020", "\u5404\u83B7\u5F971\u683C\u80FD\u91CF\u3002");
      return outcome(false, false, false, "\u76F8\u4E92\u8BD5\u63A2", "\u6CA1\u6709\u4EBA\u88AB\u51FB\u4E2D\u3002");
    }
    if (playerKey === "forge" && ai.type === "attack") return outcome(true, false, false, `${ai.name}\u547D\u4E2D`, "\u953B\u9020\u65F6\u6CA1\u6709\u9632\u5FA1\u3002");
    if (aiKey === "forge" && player.type === "attack") return outcome(false, true, false, `${player.name}\u547D\u4E2D`, "\u953B\u9020\u65F6\u6CA1\u6709\u9632\u5FA1\u3002");
    if (player.type === "attack" && ai.type === "attack") {
      if (player.level === ai.level) return outcome(false, false, false, "\u62B5\u5200", `${player.level}\u7EA7\u5BF9${ai.level}\u7EA7\uFF0C\u53CC\u65B9\u5747\u4E0D\u53D7\u4F24\u3002`);
      return player.level > ai.level ? outcome(false, true, false, `${player.name}\u538B\u5236${ai.name}`, "\u9AD8\u7EA7\u653B\u51FB\u538B\u5236\u4F4E\u7EA7\u653B\u51FB\u3002") : outcome(true, false, false, `${ai.name}\u538B\u5236${player.name}`, "\u9AD8\u7EA7\u653B\u51FB\u538B\u5236\u4F4E\u7EA7\u653B\u51FB\u3002");
    }
    if (player.type === "attack") return attackVsDefense(playerKey, aiKey, false);
    if (ai.type === "attack") return attackVsDefense(aiKey, playerKey, true);
    return outcome(false, false, false, "\u76F8\u4E92\u8BD5\u63A2", "\u6CA1\u6709\u4EBA\u88AB\u51FB\u4E2D\u3002");
  }
  function resolveScissors(playerKey, aiKey) {
    if (playerKey === "scissors" && aiKey === "scissors") {
      return outcome(false, false, false, "\u62B5\u5200", "\u53CC\u65B9\u526A\u5200\u76F8\u62B5\uFF0C\u5747\u4E0D\u53D7\u4F24\u3002");
    }
    const scissorsIsPlayer = playerKey === "scissors";
    const opponentKey = scissorsIsPlayer ? aiKey : playerKey;
    const scissorsWins = ["knife", "katana", "shuriken", "catch"];
    const scissorsLoses = ["forge", "kunai", "dragonFang", "void"];
    if (opponentKey === "guard") {
      return outcome(false, false, false, "\u9632\u4F4F\u526A\u5200", "\u526A\u5200\u88AB\u201C\u9632\u201D\u6321\u4F4F\u3002");
    }
    if (opponentKey === "flash") {
      return outcome(false, false, true, "\u95EA\u8FC7\u526A\u5200", "\u95EA\u6210\u529F\u8EB2\u5F00\u526A\u5200\uFF0C\u53CC\u65B9\u80FD\u91CF\u91CD\u7F6E\u3002");
    }
    if (scissorsWins.includes(opponentKey)) {
      return scissorsIsPlayer ? outcome(false, true, false, "\u526A\u5200\u514B\u5236", `\u526A\u5200\u51FB\u8D25${MOVES[opponentKey].name}\u3002`) : outcome(true, false, false, "\u526A\u5200\u514B\u5236", `\u526A\u5200\u51FB\u8D25${MOVES[opponentKey].name}\u3002`);
    }
    if (scissorsLoses.includes(opponentKey)) {
      return scissorsIsPlayer ? outcome(true, false, false, `${MOVES[opponentKey].name}\u514B\u5236\u526A\u5200`, "\u526A\u5200\u88AB\u514B\u5236\u3002") : outcome(false, true, false, `${MOVES[opponentKey].name}\u514B\u5236\u526A\u5200`, "\u526A\u5200\u88AB\u514B\u5236\u3002");
    }
    return outcome(false, false, false, "\u76F8\u4E92\u8BD5\u63A2", "\u6CA1\u6709\u4EBA\u88AB\u51FB\u4E2D\u3002");
  }
  function attackVsDefense(attackKey, defenseKey, defenderIsPlayer) {
    const attack = MOVES[attackKey];
    const defense = MOVES[defenseKey];
    const blocked2 = Array.isArray(defense.blocks) && defense.blocks.includes(attack.level);
    if (blocked2) {
      return outcome(false, false, Boolean(defense.resets), `${defense.name}\u6210\u529F`, `${defense.name}\u6321\u4F4F\u4E86${attack.level}\u7EA7${attack.name}${defense.resets ? "\uFF0C\u53CC\u65B9\u80FD\u91CF\u5F52\u96F6" : ""}\u3002`);
    }
    return defenderIsPlayer ? outcome(true, false, false, `${attack.name}\u7A81\u7834${defense.name}`, `${defense.name}\u65E0\u6CD5\u9632\u5FA1${attack.level}\u7EA7\u653B\u51FB\u3002`) : outcome(false, true, false, `${attack.name}\u7A81\u7834${defense.name}`, `${defense.name}\u65E0\u6CD5\u9632\u5FA1${attack.level}\u7EA7\u653B\u51FB\u3002`);
  }
  const SKILLS = {
    "none": {
      "name": "\u65E0\u6280\u80FD",
      "hp": 2,
      "attack": 1,
      "description": "\u57FA\u78402\u88401\u653B\uFF0C\u65E0\u89D2\u8272\u6280\u80FD\u3002"
    },
    "generalist": {
      "name": "\u901A\u8BC6\u8005",
      "hp": 2,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u5F53\u4F60\u953B\u9020\u65F6\uFF0C\u82E5\u4F60\u4E0A\u4E00\u6B21\u4F7F\u7528\u7684\u624B\u52BF\u4E5F\u4E3A\u953B\u9020\uFF0C\u6B64\u6B21\u953B\u9020\u89C6\u4E3A2\u953B\u3002"
    },
    "whiteTower": {
      "name": "\u767D\u5854",
      "hp": 2,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u6BCF\u56DE\u5408\u4F7F\u7528\u6B66\u5668\u65F6\uFF0C\u82E5\u672C\u6B66\u5668\u662F\u672C\u56DE\u5408\u9996\u6B21\u88AB\u6253\u51FA\uFF0C\u5219\u8FD4\u8FD8\u6253\u51FA\u8BE5\u6B66\u5668\u7684\u82B1\u8D39\u3002"
    },
    "reaper": {
      "name": "\u6B7B\u795E",
      "hp": 2,
      "attack": 0,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u7684\u653B\u51FB\u547D\u4E2D\u540E\u52A01\u8840\u52A01\u653B\u3002"
    },
    "tyrant": {
      "name": "\u66B4\u541B",
      "hp": 3,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u5F53\u4F60\u7684\u8840\u91CF\u4E0D\u5927\u4E8E1\u65F6\uFF0C\u4F60\u9020\u6210\u7684\u4F24\u5BB3\u6539\u4E3A10\u70B9\u3002 \u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u96502\u6B21\uFF0C\u6BCF\u56DE\u5408\u5F00\u59CB\u65F6\uFF0C\u4F60\u53EF\u4EE5\u8BB0\u5F55\u5F53\u524D\u8840\u91CF\u5E76\u5C06\u8840\u91CF\u8C03\u6574\u81F31\uFF0C\u6B21\u56DE\u5408\u7ED3\u675F\u65F6\uFF0C\u4F60\u5C06\u8840\u91CF\u8C03\u6574\u56DE\u8BB0\u5F55\u7684\u8840\u91CF\u3002"
    },
    "hangedMan": {
      "name": "\u5012\u540A\u4EBA",
      "hp": 2,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u5176\u4ED6\u89D2\u8272\u6B7B\u4EA1\u65F6\uFF0C\u4F60\u52A00.5\u8840\u3002 \u4E3B\u52A8\u6280\u80FD\uFF1A\u5F53\u4F60\u7684\u653B\u51FB\u547D\u4E2D\u65F6\uFF0C\u4F60\u53EF\u6263\u9664\u81EA\u5DF1X/2\u8840\u5E76\u4EE4\u6B64\u653B\u51FB\u589E\u52A0\u7B49\u91CF\u4F24\u5BB3\u3002\uFF08X\u4E3A\u6B63\u6574\u6570\uFF09"
    },
    "judge": {
      "name": "\u5BA1\u5224\u8005",
      "hp": 2,
      "attack": 1,
      "description": "\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u9650\u4E09\u6B21\uFF0C\u6BCF\u56DE\u5408\u7ED3\u675F\u65F6\uFF0C\u82E5\u672C\u56DE\u5408\u6709\u4F24\u5BB3\u9020\u6210\uFF0C\u4F60\u53EF\u4E0E\u4E00\u540D\u5176\u4ED6\u89D2\u8272\u8FDB\u884C\u4E00\u56DE\u5408\u65E0\u6CD5\u4F7F\u7528\u6280\u80FD\u7684\u5BF9\u5C40\uFF0C\u82E5\u4F60\u8D62\uFF0C\u4F60\u5BF9\u5176\u9020\u6210\u4E00\u6B21\u4F24\u5BB3\u3002"
    },
    "monster": {
      "name": "\u602A\u517D",
      "hp": 2,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u5F53\u4F60\u547D\u4E2D/\u88AB\u547D\u4E2D\u65F6\uFF0C\u4F60\u4E0E\u5BF9\u65B9\u731C\u62F3\uFF0C\u82E5\u53D7\u4F24\u89D2\u8272\u83B7\u80DC\u5219\u9632\u6B62\u6B64\u4F24\u5BB3\u3002"
    },
    "mother": {
      "name": "\u6BCD\u4EB2",
      "hp": 1,
      "attack": 1,
      "description": "\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u56DE\u5408\u5F00\u59CB\u65F6\uFF0C\u82E5\u4E0A\u4E00\u56DE\u5408\u6709\u4F24\u5BB3\u9020\u6210\uFF0C\u4F60\u53EF\u4EE4\u4E00\u540D\u89D2\u8272\u52A00.5\u8840\u3002"
    },
    "hunter": {
      "name": "\u730E\u4EBA",
      "hp": 2,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u5F53\u4F60\u6B7B\u4EA1\u65F6\uFF0C\u4F60\u5BF9\u4E00\u540D\u5176\u4ED6\u89D2\u8272\u9020\u62101\u70B9\u771F\u5B9E\u4F24\u5BB3\u3002"
    },
    "warrior": {
      "name": "\u6218\u58EB",
      "hp": 2,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u7684\u201C\u6B66\u58EB\u5200\u201D\u53EF\u547D\u4E2D\u4F7F\u7528\u201C\u9632\u5FA1\u201D\u7684\u89D2\u8272\u4E14\u4F60\u56E0\u6B64\u9020\u6210\u7684\u4F24\u5BB3\u6539\u4E3A0.5\u70B9\u771F\u5B9E\u4F24\u5BB3\u3002"
    },
    "assassin": {
      "name": "\u523A\u5BA2",
      "hp": 2,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u201C\u9632\u5FA1\u201D\u65F6\u65E0\u6CD5\u88AB\u201C\u624B\u91CC\u5251\u201D\u547D\u4E2D\u3002 \u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u9650\u4E00\u6B21\uFF0C\u4F60\u4F7F\u7528\u201C\u5C0F\u5200\u201D\u547D\u4E2D\u5176\u4ED6\u89D2\u8272\u65F6\u4F60\u53EF\u4EE5\u4EE4\u6B64\u653B\u51FB\u7684\u4F24\u5BB3\u589E\u52A00.5\u70B9\u3002"
    },
    "secretKeeper": {
      "name": "\u7AA5\u79D8\u4EBA",
      "hp": 2,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u4F7F\u7528\u201C\u9F99\u7259\u201D\u548C\u201C\u865A\u65E0\u201D\u7684\u82B1\u8D39-1\u4E14\u5FC5\u5B9A\u547D\u4E2D\u3002 \u6BCF\u8F6E\u6E38\u620F\u5F00\u59CB\u524D\uFF0C\u4F60\u4EE4\u4E00\u540D\u5176\u4ED6\u89D2\u8272\u5177\u6709\u201C\u7AA5\u79D8\u201D\u6807\u8BB0\u3002\u6709\u201C\u7AA5\u79D8\u201D\u6807\u8BB0\u7684\u89D2\u8272\u53D7\u5230\u4F24\u5BB3\u65F6\uFF0C\u4F60\u52A01\u8840\u3002"
    },
    "prisoner": {
      "name": "\u56DA\u5F92",
      "hp": 2,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u7684\u201C\u95EA\u201D\u82B1\u8D39-2\uFF0C\u4F60\u7684\u653B\u51FB\u82B1\u8D39+1\u3002 \u4F60\u6210\u529F\u201C\u95EA\u201D\u5076\u6570\u6B21\u540E\uFF0C\u4F60\u7684\u653B\u51FB\u82B1\u8D39-1\uFF08\u81F3\u5C11\u4E3A1\uFF09\u3002"
    },
    "thief": {
      "name": "\u76D7\u8D3C",
      "hp": 2,
      "attack": 1,
      "description": "\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u9650\u4E24\u6B21\uFF0C\u4F60\u53EF\u4EE5\u9009\u62E9\u4E00\u540D\u5176\u4ED6\u89D2\u8272\u5E76\u89C6\u4E3A\u62E5\u6709\u5176\u5269\u4F59\u6280\u80FD\uFF0C\u5176\u89C6\u4E3A\u5931\u53BB\u5176\u6280\u80FD\uFF0C\u6301\u7EED\u4E00\u56DE\u5408\u3002\u82E5\u5176\u4E8E\u8BE5\u56DE\u5408\u5185\u6B7B\u4EA1\uFF0C\u4F60\u83B7\u5F97\u5176\u6280\u80FD\u3002"
    },
    "blackEmperor": {
      "name": "\u9ED1\u7687\u5E1D",
      "hp": 1,
      "attack": 1,
      "description": "\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u56DE\u5408\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u51CF1\u62A4\u76FE\u5E76\u4EE4\u4E00\u540D\u5176\u4ED6\u89D2\u8272\u52A01\u62A4\u76FE\u3002",
      "shields": 3
    },
    "demon": {
      "name": "\u6076\u9B54",
      "hp": 3,
      "attack": 0,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u6BCF\u56DE\u5408\u7ED3\u675F\u65F6\uFF0C\u4F60\u52A00.5\u653B\u3002\u4F60\u5177\u6709\u53CB\u4F24\u3002"
    },
    "audience": {
      "name": "\u89C2\u4F17",
      "hp": 2,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u4E00\u540D\u89D2\u8272\u201C\u9000\u573A\u201D\u540E\uFF0C\u82E5\u5176\u4E0D\u5B58\u5728\u961F\u53CB\u4ECD\u5728\u5BF9\u5C40\u5185\uFF0C\u5176\u53D7\u52301\u70B9\u771F\u5B9E\u4F24\u5BB3\u3002 \u4E3B\u52A8\u6280\u80FD\uFF1A\u4F60\u7684\u975E\u201C\u5C0F\u5200\u201D\u653B\u51FB\u547D\u4E2D\u540E\uFF0C\u4F60\u53EF\u4EE5\u9009\u62E9\u4F60\u4EE5\u53CA\u81F3\u591A2\u540D\u5176\u4ED6\u89D2\u8272\u201C\u9000\u573A\u201D\u4E00\u56DE\u5408\u3002"
    },
    "night": {
      "name": "\u9ED1\u591C",
      "hp": 2,
      "attack": 1,
      "description": "\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u6307\u5B9A\u4E00\u540D\u5176\u4ED6\u89D2\u8272\uFF0C\u5176\u89C6\u4E3A\u5931\u53BB\u5176\u88AB\u52A8\u6280\u80FD\u3002 \u9886\u57DF\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u9650\u4E00\u6B21\uFF0C\u6BCF\u56DE\u5408\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u4EE4\u672C\u56DE\u5408\u6240\u6709\u654C\u65B9\u89D2\u8272\u5177\u6709\u53CB\u4F24\u3002"
    },
    "sun": {
      "name": "\u592A\u9633",
      "hp": 2,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u9020\u6210\u7684\u4F24\u5BB3\u6539\u4E3A\u771F\u5B9E\u4F24\u5BB3\u3002 \u9886\u57DF\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u9650\u4E24\u6B21\uFF0C\u6BCF\u56DE\u5408\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u7533\u660E\u4E00\u79CD\u653B\u51FB\uFF0C\u672C\u56DE\u5408\u6240\u6709\u654C\u65B9\u89D2\u8272\u65E0\u6CD5\u4F7F\u7528\u8BE5\u653B\u51FB\u3002"
    },
    "apprentice": {
      "name": "\u5B66\u5F92",
      "hp": 2,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u5F53\u4F60\u547D\u4E2D\u89D2\u8272\u65F6\uFF0C\u82E5\u4F60\u6CA1\u6709\u5176\u6280\u80FD\uFF0C\u4F60\u83B7\u5F97\u5176\u5269\u4F59\u6280\u80FD\u3002"
    },
    "diviner": {
      "name": "\u5360\u535C\u5BB6",
      "hp": 1,
      "attack": 1,
      "description": "\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u9009\u62E9\u5E76\u83B7\u5F97\u4E00\u4E2A\u672A\u88AB\u9009\u62E9\u8FC7\u7684\u89D2\u8272\u7684\u201C\u79D8\u5076\u201D\u5176\u8840\u91CF\u4E3A1\u3002\u5F53\u4F60\u62E5\u6709\u201C\u79D8\u5076\u201D\u65F6\uFF0C\u4F60\u89C6\u4E3A\u62E5\u6709\u5176\u5BF9\u5E94\u89D2\u8272\u6280\u80FD\uFF0C\u5F53\u4F60\u53D7\u5230\u975E\u771F\u5B9E\u4F24\u5BB3\u65F6\uFF0C\u4F18\u5148\u6263\u9664\u201C\u79D8\u5076\u201D\u8840\u91CF\u3002\u5F53\u6709\u53CB\u65B9\u89D2\u8272\u6B7B\u4EA1\u65F6\uFF0C\u4F60\u53EF\u4EE5\u79FB\u9664\u5F53\u524D\u201C\u79D8\u5076\u201D\uFF0C\u6539\u4E3A\u83B7\u5F97\u8BE5\u89D2\u8272\u7684\u201C\u79D8\u5076\u201D\u3002"
    },
    "guardian": {
      "name": "\u5B88\u536B",
      "hp": 2,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u65E0\u6CD5\u4F7F\u7528\u201C\u953B\u9020\u201D\u3002\u5F53\u4F60\u201C\u9632\u5FA1\u201D\u6216\u201C\u63A5\u201D\u65F6\uFF0C\u4F60\u83B7\u5F970.25\u953B\u3002\u4F60\u7684\u201C\u95EA\u201D\u82B1\u8D39-1\u3002"
    },
    "moon": {
      "name": "\u6708\u4EAE",
      "hp": 3,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u7684\u201C\u95EA\u201D\u6539\u4E3A\u201C\u9632\u53CD\u201D\u3002\u4F60\u201C\u9632\u53CD\u201D\u65F6\uFF0C\u5BF9\u4F7F\u7528\u6B66\u5668\u7684\u654C\u65B9\u89D2\u8272\u9020\u6210\u5176\u653B\u51FB\u529B\u503C\u7684\u4F24\u5BB3\u3002"
    },
    "pioneer": {
      "name": "\u5148\u9A71",
      "hp": 2,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u65E0\u6CD5\u88AB\u6807\u8BB0\u3002\u4F60\u65E0\u6CD5\u6210\u4E3A\u5176\u4ED6\u89D2\u8272\u6280\u80FD\u7684\u76EE\u6807\u3002\u5F53\u4F60\u53D7\u5230\u4F24\u5BB3\u524D\uFF0C\u9632\u6B62\u4E4B\u5E76\u51CF1\u8840\u3002 \u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u9650\u4E24\u6B21\uFF0C\u6BCF\u56DE\u5408\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u9632\u6B62\u4F60\u672C\u56DE\u5408\u53D7\u5230\u7684\u4F24\u5BB3\u3002"
    },
    "nightmare": {
      "name": "\u68A6\u9B47",
      "hp": 1,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u5F53\u4F60\u6807\u8BB0\u7684\u89D2\u8272\u53D7\u5230\u4F24\u5BB3\u65F6\uFF0C\u4F60\u4EE4\u4F60\u4E3B\u52A8\u6280\u80FD\u4E2D\u7684\u6570\u5B57-1\u3002 \u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u6807\u8BB0\u4E00\u540D\u654C\u65B9\u89D2\u8272\uFF0C\u7136\u540E\u672C\u8F6E\u6E38\u620F\u7B2C6\u56DE\u5408\u7ED3\u675F\u540E\uFF0C\u4F60\u4EE4\u88AB\u6807\u8BB0\u7684\u89D2\u8272\u76F4\u63A5\u6B7B\u4EA1\u5E76\u83B7\u5F97\u5176\u6280\u80FD\u3002"
    },
    "miracle": {
      "name": "\u5947\u8FF9",
      "hp": 2,
      "attack": 1,
      "description": "\u4E3B\u52A8\u6280\u80FD\uFF1A\u5F53\u4F60\u6253\u51FA\u6B66\u5668\u65F6\uFF0C\u4F60\u53EF\u4EE5\u540C\u65F6\u6253\u51FA\u4E00\u4E2A\u201C\u5BA3\u8A00\u201D\u3002\u82E5\u5982\u6B64\u505A\uFF0C\u8BE5\u653B\u51FB\u65E0\u6CD5\u547D\u4E2D\u4E14\u7B49\u7EA7\u4F4E\u4E8E\u5176\u7684\u653B\u51FB\u65E0\u6CD5\u547D\u4E2D\u4F60\uFF0C\u6253\u51FA\u76F8\u540C\u7B49\u7EA7\u6B66\u5668\u7684\u654C\u65B9\u89D2\u8272\u65E0\u6CD5\u4F7F\u7528\u5176\u3002"
    },
    "bulwark": {
      "name": "\u58C1\u5792",
      "hp": 2,
      "attack": 1,
      "description": "\u4E3B\u52A8\u6280\u80FD\uFF1A\u4F60\u53EF\u82B1\u8D392\u953B\u6253\u51FA\u4E00\u4E2A\u201C\u5927\u76FE\u201D\u3002\u201C\u5927\u76FE\u201D\u53EF\u4EE5\u9632\u5FA1\u9664\u201C\u865A\u65E0\u201D\u5916\u7684\u4EFB\u610F\u653B\u51FB\u3002\u4F60\u6253\u51FA\u201C\u5927\u76FE\u201D\u540E\u4F60\u7684\u5927\u76FE\u89C6\u4E3A0\u953B\u76F4\u5230\u56DE\u5408\u7ED3\u675F\u3002"
    },
    "aurora": {
      "name": "\u6781\u5149",
      "hp": 2,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u7684\u6B66\u5668\u53EF\u4EE5\u547D\u4E2D\u591A\u4E2A\u89D2\u8272\u3002 \u9886\u57DF\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u9650\u4E00\u6B21\uFF0C\u6BCF\u56DE\u5408\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u4EE4\u672C\u56DE\u5408\u6240\u6709\u53CB\u65B9\u89D2\u8272\u7684\u6B66\u5668\u53EF\u4EE5\u547D\u4E2D\u591A\u4E2A\u89D2\u8272"
    },
    "storm": {
      "name": "\u98CE\u66B4",
      "hp": 2,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u4F60\u7684\u201C\u6B66\u58EB\u5200\u201D\u6539\u4E3A\u201C\u98CE\u66B4\u4E4B\u5203\u201D\uFF0C\u653B\u51FB\u7B49\u7EA7\u6539\u4E3A1.5\u7EA7\uFF0C\u82E5\u4F60\u6253\u51FA\u8BE5\u653B\u51FB\u672A\u547D\u4E2D\u4EFB\u4F55\u89D2\u8272\uFF0C\u4F60\u4E0B\u6B21\u6253\u51FA\u8BE5\u653B\u51FB\u7684\u82B1\u8D39-1\u953B\u3002"
    },
    "magician": {
      "name": "\u9B54\u672F\u5E08",
      "hp": 2,
      "attack": 1,
      "description": "\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u9650\u4E24\u6B21\uFF0C\u5F53\u4E00\u540D\u89D2\u8272\u7684\u653B\u51FB\u547D\u4E2D\u4EFB\u610F\u76EE\u6807\u65F6\uFF0C\u4F60\u53EF\u4EE5\u4EE4\u6B64\u653B\u51FB\u65E0\u6548\u5E76\u89C6\u4E3A\u4F60\u6307\u5B9A\u7684\u4E00\u540D\u89D2\u8272\u4F7F\u7528\u76F8\u540C\u653B\u51FB\u547D\u4E2D\u76F8\u540C\u76EE\u6807\u3002"
    },
    "observer": {
      "name": "\u89C2\u8005",
      "hp": 2,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u5F00\u59CB\u65F6\uFF0C\u4F60\u5C06\u72B6\u6001\u8C03\u6574\u81F3\u201C\u5E73\u9759\u201D\u3002\u5F53\u4F60\u201C\u63A5\u201D\u65F6\uFF0C\u4F60\u5C06\u72B6\u6001\u5207\u6362\u81F3\u201C\u66B4\u6012\u201D\u5E76\u83B7\u5F971\u953B\u3002\u5F53\u4F60\u5904\u4E8E\u201C\u66B4\u6012\u201D\u72B6\u6001\u65F6\uFF0C\u4F60\u9020\u6210\u548C\u53D7\u5230\u7684\u653B\u51FB\u5747\u7FFB\u500D\u3002\u5F53\u4F60\u5904\u4E8E\u201C\u5E73\u9759\u201D\u72B6\u6001\u65F6\uFF0C\u4F60\u9020\u6210\u548C\u53D7\u5230\u7684\u653B\u51FB\u5747\u51CF\u534A\u3002"
    },
    "fisherman": {
      "name": "\u6E14\u592B",
      "hp": 3,
      "attack": 0.5,
      "description": "\u4E3B\u52A8\u6280\u80FD\uFF1A\u5F53\u4E00\u540D\u5176\u4ED6\u89D2\u8272\u53D1\u52A8\u4E3B\u52A8\u6280\u80FD\u65F6\uFF0C\u4F60\u53EF\u4EE5\u5728\u6B64\u6280\u80FD\u6548\u679C\u751F\u6548\u524D\u4E0E\u5176\u8FDB\u884C\u4E00\u56DE\u5408\u65E0\u6CD5\u4F7F\u7528\u6280\u80FD\u7684\u5BF9\u5C40\uFF0C\u82E5\u4F60\u8D62\uFF0C\u4F60\u4EE4\u6B64\u6280\u80FD\u6548\u679C\u5931\u6548\u5E76\u5BF9\u5176\u9020\u62101\u70B9\u4F24\u5BB3\u3002"
    },
    "dragonKnight": {
      "name": "\u9F99\u9A91\u58EB",
      "hp": 1,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u5F00\u59CB\u65F6\uFF0C\u4F60\u83B7\u5F97\u4E00\u6761\u201C\u9F99\u201D\u3002\u4F60\u201C\u63A5\u201D\u5076\u6570\u6B21\u540E\uFF0C\u4F60\u7684\u201C\u9F99\u7259\u201D\u82B1\u8D39-1\uFF08\u81F3\u5C11\u4E3A2\uFF09\u3002\u6BCF\u8F6E\u6E38\u620F\u5F00\u59CB\u65F6/\u4F60\u6210\u529F\u4F7F\u7528\u201C\u9F99\u7259\u201D\u540E\uFF0C\u82E5\u4F60\u6CA1\u6709\u201C\u9F99\u201D\uFF0C\u4F60\u83B7\u5F97\u4E00\u6761\u201C\u9F99\u201D\uFF0C\u5176\u8840\u91CF\u4E3A1\uFF0C\u5F53\u4F60\u53D7\u5230\u975E\u771F\u5B9E\u4F24\u5BB3\u65F6\uFF0C\u4F18\u5148\u6263\u9664\u201C\u9F99\u201D\u8840\u91CF\u3002"
    },
    "saint": {
      "name": "\u5723\u6597\u58EB",
      "hp": 2,
      "attack": 1,
      "description": "\u4E3B\u52A8\u6280\u80FD\uFF1A\u5F53\u4F60\u5931\u53BB\u62A4\u76FE\u65F6\uFF0C\u4F60\u53EF\u4EE5\u4EE4\u4F60\u4E0B\u6B21\u9020\u6210\u7684\u4F24\u5BB3+0.5\u3002 \u88AB\u52A8\u6280\u80FD\uFF1A\u5F53\u4F60\u6740\u6B7B\u4E00\u540D\u89D2\u8272\u65F6\uFF0C\u4F60\u83B7\u5F97\u4E00\u4E2A\u62A4\u76FE\u3002",
      "shields": 1
    },
    "singularity": {
      "name": "\u5947\u70B9",
      "hp": 2,
      "attack": 1,
      "description": "\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u56DE\u5408\u5F00\u59CB\u65F6\uFF0C\u4F60\u53EF\u4EE5\u4EE4\u4F60\u672C\u56DE\u5408\u653B\u51FB\u529B-0.5\u5E76\u4EE4\u4E00\u540D\u654C\u65B9\u89D2\u8272\u672C\u56DE\u5408\u53D7\u5230\u7684\u4F24\u5BB3+0.5\u3002 \u9886\u57DF\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u96502\u6B21\uFF0C\u6BCF\u56DE\u5408\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u4EE4\u672C\u56DE\u5408\u6240\u6709\u654C\u65B9\u89D2\u8272\u7684\u88AB\u52A8\u6280\u80FD\u548C\u4E3B\u52A8\u6280\u80FD\u5931\u6548\u3002"
    },
    "shepherd": {
      "name": "\u7267\u7F8A\u4EBA",
      "hp": 2,
      "attack": 0.5,
      "description": "\u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u9650\u4E00\u6B21\uFF0C\u6BCF\u56DE\u5408\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u4EE4\u4E00\u540D\u5176\u4ED6\u89D2\u8272\u7684\u6709\u6B21\u6570\u9650\u5236\u7684\u6280\u80FD\u7684\u4E00\u4E2A\u6548\u679C\u6B21\u6570+1\u3002 \u6BCF\u8F6E\u6E38\u620F\u9650\u4E00\u6B21\uFF0C\u6BCF\u56DE\u5408\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u4EE4\u4E00\u540D\u89D2\u8272\u8840\u91CF+1\u3002 \u9886\u57DF\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u9650\u4E00\u6B21\uFF0C\u6BCF\u56DE\u5408\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u4EE5\u4EE4\u672C\u56DE\u5408\u6240\u6709\u53CB\u65B9\u89D2\u8272\u53D7\u5230\u7684\u4F24\u5BB3-0.5\u3002"
    },
    "ascetic": {
      "name": "\u82E6\u4FEE",
      "hp": 2,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u6240\u6709\u89D2\u8272\u65E0\u6CD5\u589E\u52A0\u8840\u91CF\u3002 \u4E3B\u52A8\u6280\u80FD\uFF1A\u6BCF\u8F6E\u6E38\u620F\u96501\u6B21\uFF0C\u5F53\u4F60\u5373\u5C06\u53D7\u5230\u81F4\u547D\u4F24\u5BB3\u65F6\uFF0C\u4F60\u53EF\u4EE5\u9632\u6B62\u4E4B\u3002"
    },
    "shadow": {
      "name": "\u6697\u5F71",
      "hp": 1,
      "attack": 1,
      "description": "\u88AB\u52A8\u6280\u80FD\uFF1A\u731C\u62F3\u65F6\uFF0C\u4F60\u89C6\u4E3A\u80DC\u5229\u3002\u5F53\u4F60\u4E0D\u56E0\u88AB\u653B\u51FB\u547D\u4E2D\u800C\u5373\u5C06\u6B7B\u4EA1\u65F6\uFF0C\u4F60\u5C06\u8840\u91CF\u8C03\u6574\u81F31\u3002"
    }
  };
  const SKILL_KEYS = Object.keys(SKILLS).filter((key) => key !== "none");
  const ABILITIES = defineModule("abilities", {
    tyrant: [{ id: "tyrant-passive", type: "passive", name: "\u66B4\u6012" }, { id: "tyrant-active", type: "active", name: "\u8BB0\u5F55\u751F\u547D", limit: 2 }],
    ascetic: [{ id: "ascetic-passive", type: "passive", name: "\u7981\u6B62\u56DE\u8840" }, { id: "ascetic-active", type: "active", name: "\u514D\u4E8E\u81F4\u547D\u4F24\u5BB3", limit: 1 }],
    hangedMan: [{ id: "hanged-passive", type: "passive", name: "\u4EA1\u8005\u56DE\u751F" }, { id: "hanged-active", type: "active", name: "\u5012\u540A\u589E\u4F24" }],
    blackEmperor: [{ id: "emperor-gift", type: "active", name: "\u62A4\u76FE\u8F6C\u79FB" }],
    night: [{ id: "night-seal", type: "active", name: "\u5C01\u5370\u88AB\u52A8" }, { id: "night-field", type: "field", name: "\u53CB\u4F24\u9886\u57DF", limit: 1 }],
    sun: [{ id: "sun-passive", type: "passive", name: "\u771F\u5B9E\u4F24\u5BB3" }, { id: "sun-field", type: "field", name: "\u592A\u9633\u5BA3\u8A00", limit: 2 }],
    pioneer: [{ id: "pioneer-passive", type: "passive", name: "\u4F24\u5BB3\u66FF\u4EE3" }, { id: "pioneer-active", type: "active", name: "\u56DE\u5408\u9632\u62A4", limit: 2 }],
    bulwark: [{ id: "bulwark-shield", type: "active", name: "\u5927\u76FE" }],
    aurora: [{ id: "aurora-passive", type: "passive", name: "\u591A\u76EE\u6807\u6B66\u5668" }, { id: "aurora-field", type: "field", name: "\u6781\u5149\u9886\u57DF", limit: 1 }],
    saint: [{ id: "saint-active", type: "active", name: "\u5931\u76FE\u54CD\u5E94" }, { id: "saint-passive", type: "passive", name: "\u51FB\u6740\u5F97\u76FE" }],
    singularity: [{ id: "singularity-active", type: "active", name: "\u6613\u4F24" }, { id: "singularity-field", type: "field", name: "\u6280\u80FD\u5C01\u9501", limit: 2 }],
    shepherd: [{ id: "shepherd-recharge", type: "active", name: "\u8865\u5145\u6B21\u6570", limit: 1 }, { id: "shepherd-heal", type: "active", name: "\u751F\u547D\u56DE\u590D", limit: 1 }, { id: "shepherd-field", type: "field", name: "\u53CB\u65B9\u51CF\u4F24", limit: 1 }]
  });
  function abilityListFor(skillKey) {
    var _a;
    return ABILITIES[skillKey] || [{ id: `${skillKey}-main`, type: "skill", name: ((_a = SKILLS[skillKey]) == null ? void 0 : _a.name) || skillKey }];
  }
  const SOLO_SKILL_KEYS = [...SKILL_KEYS];
  const SKILL_RULES = Object.freeze({
    secretKeeper: { modifyCost: ({ moveKey, cost }) => moveKey === "dragonFang" || moveKey === "void" ? cost - 1 : cost },
    prisoner: { modifyCost: ({ moveKey, cost, fighter }) => moveKey === "flash" ? 0 : skillMove(moveKey).type === "attack" ? Math.max(1, cost + 1 - (fighter.attackDiscount || 0)) : cost },
    storm: { modifyCost: ({ moveKey, cost, fighter }) => moveKey === "katana" ? Math.max(1, cost - (fighter.stormDiscount || 0)) : cost },
    dragonKnight: { modifyCost: ({ moveKey, cost, fighter }) => moveKey === "dragonFang" ? Math.max(2, cost - Math.floor((fighter.dragonCatch || 0) / 2)) : cost },
    guardian: { filterMoves: (keys) => keys.filter((key) => key !== "forge"), modifyCost: ({ moveKey, cost }) => moveKey === "flash" ? cost - 1 : cost }
  });
  const SKILL_RULE_KEYS = SKILL_KEYS.filter((key) => SKILL_RULES[key]);
  function activeSkillRules(skillKey, fighter) {
    return SKILL_RULE_KEYS.filter((key) => fighterHasSoloSkill(skillKey, fighter, key)).map((key) => SKILL_RULES[key]);
  }
  function createFighter(skillKey) {
    const skill = SKILLS[skillKey] || SKILLS.generalist;
    return {
      energy: 0,
      score: 0,
      hp: skill.hp,
      maxHp: skill.hp,
      attack: skill.attack,
      lastMove: null,
      bigShieldUsed: false,
      observerStance: "calm",
      tyrantUses: 2,
      tyrantRestore: null,
      asceticUses: 1,
      saintBonus: 0,
      passiveSeals: [],
      attackLethal: false,
      boostForge: false,
      generalistBoostPending: false,
      assassinUsed: false,
      flashSuccesses: 0,
      attackDiscount: 0,
      stormDiscount: 0,
      dealtDamageLastRound: false,
      shields: skill.shields || 0,
      dragon: skillKey === "dragonKnight" ? 1 : 0,
      doll: skillKey === "diviner" ? 1 : 0,
      dragonShields: 0,
      dollShields: 0,
      damageOrder: ["dragon", "doll"],
      dollSkill: skillKey === "diviner" ? randomUnusedSkill([skillKey]) : null,
      dragonCatch: 0,
      hangedBoost: 0,
      judgeMove: null,
      judgeUses: 3,
      monsterGesture: null,
      nightUses: 1,
      pioneerUses: 2,
      preventAll: false,
      nightmareClock: 6,
      miracleDeclare: false,
      vulnerable: 0,
      extraSkills: [],
      temporarySkills: [],
      singularityUses: Infinity,
      hunterTriggered: false,
      observerCatch: false,
      nightmareTarget: skillKey === "nightmare",
      thiefUses: 2,
      hook: false,
      disabledSkills: [],
      temporaryDisabledSkills: [],
      thiefBorrowed: null,
      pioneerActiveProtection: false,
      singularityUsedThisRound: false,
      singularityAttackPenalty: 0,
      saintDamageDealt: false,
      saintDamageTaken: false,
      emperorGifted: false,
      shepherdHealUses: 1,
      shepherdRefreshUses: 1,
      shepherdDomainUses: 1,
      shepherdReduction: 0,
      audienceUses: 3,
      audienceRetreat: false,
      audienceSkipEnemy: false,
      magicianUses: 2,
      sunFieldUses: 2,
      singularityFieldUses: 2,
      fieldOpenedThisRound: false,
      sunDeclare: null,
      roundSkillLock: false,
      usedMovesThisRound: []
    };
  }
  function fighterHasSoloSkill(skillKey, fighter, wanted, type = "normal") {
    if (fighter.skipped) return false;
    if (type !== "active" && type !== "field" && hasPassive258(wanted) && (fighter.passiveSeals || []).some((side) => {
      var _a;
      return ((_a = state[side]) == null ? void 0 : _a.hp) > 0;
    })) return false;
    if (fighter.roundSkillLock || (fighter.disabledSkills || []).includes(wanted) || (fighter.temporaryDisabledSkills || []).includes(wanted)) return false;
    return skillKey === wanted || (fighter.extraSkills || []).includes(wanted) || (fighter.temporarySkills || []).includes(wanted) || fighter.dollSkill === wanted;
  }
  function fighterOwnsSoloSkill(skillKey, fighter, wanted) {
    return skillKey === wanted || (fighter.extraSkills || []).includes(wanted) || (fighter.temporarySkills || []).includes(wanted) || fighter.dollSkill === wanted;
  }
  function moveCost(moveKey, skillKey, fighter, rules = null) {
    if (moveKey === "bigShield") return fighter.bigShieldUsed ? 0 : 2;
    if (moveKey === "exit") return 2;
    let cost = MOVES[moveKey].cost;
    for (const rule of rules || activeSkillRules(skillKey, fighter)) if (rule.modifyCost) cost = rule.modifyCost({ moveKey, cost, fighter });
    return Math.max(0, cost);
  }
  function whiteTowerRefunds(moveKey, weaponHistory) {
    return skillMove(moveKey).type === "attack" && !weaponHistory.includes(moveKey);
  }
  function availableMoveKeys(skillKey, fighter = {}, scissorsEnabled = false, rules = null) {
    if (typeof fighter === "boolean") {
      scissorsEnabled = fighter;
      fighter = {};
    }
    let keys = MOVE_KEYS.filter((key) => scissorsEnabled || key !== "scissors");
    for (const rule of rules || activeSkillRules(skillKey, fighter)) if (rule.filterMoves) keys = rule.filterMoves(keys);
    if (fighterHasSoloSkill(skillKey, fighter, "bulwark")) keys.splice(4, 0, "bigShield");
    if (typeof state !== "undefined") {
      const other = fighter === state.player ? state.ai : fighter === state.ai ? state.player : null;
      if ((other == null ? void 0 : other.hp) > 0 && other.sunDeclare) keys = keys.filter((key) => key !== other.sunDeclare);
    }
    return keys;
  }
  function skillMove(moveKey) {
    if (moveKey === "bigShield") return { name: "\u5927\u76FE", type: "basic", icon: "\u25A3", cost: 2, summary: "\u63211\uFF5E5\u7EA7 \xB7 \u9996\u6B212\u953B\uFF0C\u672C\u56DE\u5408\u968F\u540E\u514D\u8D39" };
    if (moveKey === "exit") return { name: "\u9000\u573A", type: "basic", icon: "\u9000", cost: 2, level: 0, summary: "\u89C2\u4F17\u6280\u80FD \xB7 \u7ED3\u675F\u5F53\u524D\u56DE\u5408" };
    return MOVES[moveKey];
  }
  function resolveWithSkills(playerKey, aiKey, playerSkill, aiSkill, playerFighter = {}, aiFighter = {}) {
    if (playerKey === "exit" || aiKey === "exit") {
      if (playerKey === "exit" && aiKey === "exit") return { playerHit: false, aiHit: false, reset: true, title: "\u540C\u65F6\u9000\u573A", detail: "\u53CC\u65B9\u89C2\u4F17\u540C\u65F6\u9000\u573A\uFF0C\u5F53\u524D\u56DE\u5408\u7ED3\u675F\u3002" };
      if (playerKey === "exit") return { playerHit: skillMove(aiKey).type === "attack", aiHit: false, reset: true, title: "\u89C2\u4F17\u9000\u573A", detail: "\u4F60\u7ED3\u675F\u5F53\u524D\u56DE\u5408\uFF1B\u9000\u573A\u65F6\u4ECD\u4F1A\u627F\u53D7AI\u672C\u6B21\u5DF2\u7ECF\u6253\u51FA\u7684\u653B\u51FB\u3002" };
      return { playerHit: false, aiHit: skillMove(playerKey).type === "attack", reset: true, title: "\u89C2\u4F17\u9000\u573A", detail: "AI\u7ED3\u675F\u5F53\u524D\u56DE\u5408\uFF1B\u9000\u573A\u65F6\u4ECD\u4F1A\u627F\u53D7\u4F60\u672C\u6B21\u5DF2\u7ECF\u6253\u51FA\u7684\u653B\u51FB\u3002" };
    }
    if (playerKey === "bigShield" || aiKey === "bigShield") {
      const r = resolveBigShield(playerKey, aiKey);
      return keeperHit258(r, playerKey, aiKey, playerSkill, aiSkill, playerFighter, aiFighter);
    }
    let result = resolveDuelCombat(playerKey, aiKey);
    const playerStorm = fighterHasSoloSkill(playerSkill, playerFighter, "storm") && playerKey === "katana";
    const aiStorm = fighterHasSoloSkill(aiSkill, aiFighter, "storm") && aiKey === "katana";
    if ((playerStorm || aiStorm) && playerKey !== "scissors" && aiKey !== "scissors" && MOVES[playerKey].type === "attack" && MOVES[aiKey].type === "attack") {
      const playerLevel = playerStorm ? 1.5 : MOVES[playerKey].level;
      const aiLevel = aiStorm ? 1.5 : MOVES[aiKey].level;
      result = playerLevel === aiLevel ? { playerHit: false, aiHit: false, reset: false, title: "\u62B5\u5200", detail: `${playerLevel}\u7EA7\u5BF9${aiLevel}\u7EA7\uFF0C\u53CC\u65B9\u5747\u4E0D\u53D7\u4F24\u3002` } : playerLevel > aiLevel ? { playerHit: false, aiHit: true, reset: false, title: "\u653B\u51FB\u538B\u5236", detail: `${playerLevel}\u7EA7\u538B\u5236${aiLevel}\u7EA7\u3002` } : { playerHit: true, aiHit: false, reset: false, title: "\u653B\u51FB\u538B\u5236", detail: `${aiLevel}\u7EA7\u538B\u5236${playerLevel}\u7EA7\u3002` };
    }
    if (playerStorm && ["catch", "flash"].includes(aiKey)) result = { playerHit: false, aiHit: true, reset: false, title: "\u98CE\u66B4\u4E4B\u5203\u547D\u4E2D", detail: "1.5\u7EA7\u4E0D\u5728\u63A5\u3001\u666E\u901A\u95EA\u7684\u9632\u5FA1\u8303\u56F4\u5185\u3002" };
    if (aiStorm && ["catch", "flash"].includes(playerKey)) result = { playerHit: true, aiHit: false, reset: false, title: "\u98CE\u66B4\u4E4B\u5203\u547D\u4E2D", detail: "1.5\u7EA7\u4E0D\u5728\u63A5\u3001\u666E\u901A\u95EA\u7684\u9632\u5FA1\u8303\u56F4\u5185\u3002" };
    if (fighterHasSoloSkill(playerSkill, playerFighter, "warrior") && playerKey === "katana" && aiKey === "guard") {
      result = { playerHit: false, aiHit: true, reset: false, title: "\u6B66\u58EB\u5200\u7A81\u7834\u9632", detail: "\u6218\u58EB\u9020\u62100.5\u70B9\u4F24\u5BB3\u3002", playerDamage: 0, aiDamage: 0.5 };
    }
    if (fighterHasSoloSkill(aiSkill, aiFighter, "warrior") && aiKey === "katana" && playerKey === "guard") {
      result = { playerHit: true, aiHit: false, reset: false, title: "\u6B66\u58EB\u5200\u7A81\u7834\u9632", detail: "\u6218\u58EB\u9020\u62100.5\u70B9\u4F24\u5BB3\u3002", playerDamage: 0.5, aiDamage: 0 };
    }
    if (fighterHasSoloSkill(playerSkill, playerFighter, "assassin") && playerKey === "guard" && aiKey === "shuriken") result = blocked("\u523A\u5BA2\u8BC6\u7834\u624B\u91CC\u5251");
    if (fighterHasSoloSkill(aiSkill, aiFighter, "assassin") && aiKey === "guard" && playerKey === "shuriken") result = blocked("\u523A\u5BA2\u8BC6\u7834\u624B\u91CC\u5251");
    const aiAttackCanHit = !(fighterHasSoloSkill(aiSkill, aiFighter, "miracle") && aiFighter.miracleDeclare);
    const playerAttackCanHit = !(fighterHasSoloSkill(playerSkill, playerFighter, "miracle") && playerFighter.miracleDeclare);
    if (fighterHasSoloSkill(playerSkill, playerFighter, "moon") && playerKey === "flash" && skillMove(aiKey).type === "attack" && aiAttackCanHit) result = { ...result, playerHit: false, reset: true, title: "\u6708\u4EAE\u9632\u53CD", detail: "\u9632\u4F4F\u5E76\u53CD\u5F39\u672C\u6B21\u653B\u51FB\uFF1B\u9632\u53CD\u4E0D\u53D7\u666E\u901A\u95EA\u7684\u53EF\u9632\u7B49\u7EA7\u9650\u5236\u3002" };
    if (fighterHasSoloSkill(aiSkill, aiFighter, "moon") && aiKey === "flash" && skillMove(playerKey).type === "attack" && playerAttackCanHit) result = { ...result, aiHit: false, reset: true, title: "\u6708\u4EAE\u9632\u53CD", detail: "\u9632\u4F4F\u5E76\u53CD\u5F39\u672C\u6B21\u653B\u51FB\uFF1B\u9632\u53CD\u4E0D\u53D7\u666E\u901A\u95EA\u7684\u53EF\u9632\u7B49\u7EA7\u9650\u5236\u3002" };
    return keeperHit258(result, playerKey, aiKey, playerSkill, aiSkill, playerFighter, aiFighter);
  }
  function previewSkillDamage(result, playerKey, aiKey, playerSkill, aiSkill, player, ai) {
    var _a, _b;
    let playerDamage = (_a = result.playerDamage) != null ? _a : result.playerHit ? ai.attack : 0;
    let aiDamage = (_b = result.aiDamage) != null ? _b : result.aiHit ? player.attack : 0;
    if (playerDamage > 0 && fighterHasSoloSkill(aiSkill, ai, "tyrant") && ai.hp <= 1) playerDamage = 10;
    if (aiDamage > 0 && fighterHasSoloSkill(playerSkill, player, "tyrant") && player.hp <= 1) aiDamage = 10;
    const playerMove = skillMove(playerKey);
    const aiMove = skillMove(aiKey);
    if (fighterHasSoloSkill(playerSkill, player, "moon") && playerKey === "flash" && aiMove.type === "attack" && !result.playerHit && !(fighterHasSoloSkill(aiSkill, ai, "miracle") && ai.miracleDeclare)) aiDamage += ai.attack;
    if (fighterHasSoloSkill(aiSkill, ai, "moon") && aiKey === "flash" && playerMove.type === "attack" && !result.aiHit && !(fighterHasSoloSkill(playerSkill, player, "miracle") && player.miracleDeclare)) playerDamage += player.attack;
    return { player: playerDamage, ai: aiDamage };
  }
  function resolveBigShield(playerKey, aiKey) {
    const p = skillMove(playerKey);
    const a = skillMove(aiKey);
    if (playerKey === "bigShield" && a.type === "attack") {
      if (a.level === 6) return { playerHit: true, aiHit: false, reset: false, title: "\u865A\u65E0\u51FB\u7A7F\u5927\u76FE", detail: "\u865A\u65E0\u4E0D\u53EF\u9632\u5FA1\u3002" };
      return blocked("\u5927\u76FE\u6321\u4F4F\u653B\u51FB");
    }
    if (aiKey === "bigShield" && p.type === "attack") {
      if (p.level === 6) return { playerHit: false, aiHit: true, reset: false, title: "\u865A\u65E0\u51FB\u7A7F\u5927\u76FE", detail: "\u865A\u65E0\u4E0D\u53EF\u9632\u5FA1\u3002" };
      return blocked("\u5927\u76FE\u6321\u4F4F\u653B\u51FB");
    }
    return blocked("\u53CC\u65B9\u76F8\u4E92\u8BD5\u63A2");
  }
  function blocked(title) {
    return { playerHit: false, aiHit: false, reset: false, title, detail: "\u6CA1\u6709\u9020\u6210\u4F24\u5BB3\u3002" };
  }
  const legalMoves = (energy, scissorsEnabled = false) => MOVE_KEYS.filter((key) => (scissorsEnabled || key !== "scissors") && canAfford(key, energy));
  const legalSkillMoves = (energy, skill, fighter, scissorsEnabled = false) => {
    const rules = activeSkillRules(skill, fighter);
    return availableMoveKeys(skill, fighter, scissorsEnabled, rules).filter((key) => moveCost(key, skill, fighter, rules) <= energy);
  };
  const LEVELS = {
    easy: { history: 0.2, conditional: 0, noise: 0.95, explore: 0.12, responseRate: 0.15, risk: 0.08, depth: 1, shortlist: 4, repeat: 0, temperature: 1.15 },
    normal: { history: 0.65, conditional: 0.45, noise: 0.34, explore: 0.03, responseRate: 0.3, risk: 0.18, depth: 1, shortlist: 4, repeat: 0.18, temperature: 0.72 },
    hard: { history: 1.15, conditional: 1.05, noise: 0.055, explore: 0, responseRate: 0.45, risk: 0.48, depth: 2, shortlist: 2, repeat: 0.38, temperature: 0.16 },
    hell: { history: 1.42, conditional: 1.38, noise: 0.018, explore: 0, responseRate: 0.65, risk: 0.56, depth: 3, shortlist: 2, repeat: 0.46, temperature: 0.13 }
  };
  function playerMoveWeights(playerEnergy, history, historyStrength, skill = null, fighter = {}, scissorsEnabled = false, context = {}, level = LEVELS.normal) {
    var _a;
    const candidates = skill ? legalSkillMoves(playerEnergy, skill, fighter, scissorsEnabled) : legalMoves(playerEnergy, scissorsEnabled);
    const recent = history.slice(-14);
    const counts = Object.fromEntries(candidates.map((key) => [key, 0]));
    recent.forEach((key, index) => {
      if (key in counts) counts[key] += 0.35 + 0.65 * (index + 1) / Math.max(1, recent.length);
    });
    let similar = [];
    if (level.conditional && ((_a = context.decisionHistory) == null ? void 0 : _a.length)) {
      const previous = context.decisionHistory.at(-1);
      const energyBand = (value) => value <= 1 ? "low" : value >= 4 ? "high" : "mid";
      const playerBand = energyBand(playerEnergy), aiBand = energyBand(context.aiEnergy);
      similar = context.decisionHistory.slice(-24).filter((item) => energyBand(item.playerEnergy) === playerBand && energyBand(item.aiEnergy) === aiBand && item.previousPlayer === (previous == null ? void 0 : previous.move) && item.afterReset === Boolean(context.afterReset));
    }
    return candidates.map((key) => {
      var _a2;
      const move = skillMove(key);
      let weight = 1;
      if (key === "forge") weight += playerEnergy <= 1 ? 2.4 : playerEnergy >= 5 ? -0.45 : 0.55;
      if (move.type === "attack") {
        weight += playerEnergy >= move.cost ? 0.35 : 0;
        if (move.cost === playerEnergy) weight += 0.25;
      }
      if (key === "guard") weight += playerEnergy <= 1 ? 0.7 : 0.15;
      if (key === "catch" && playerEnergy >= 2) weight += 0.2;
      if (key === "flash" && playerEnergy >= 4) weight += 0.35;
      if (skill === "whiteTower" && move.type === "attack" && whiteTowerRefunds(key, context.weaponHistory || [])) weight += 0.75;
      if ((skill === "reaper" || skill === "secretKeeper") && move.type === "attack") weight += 0.35;
      if (skill === "guardian" && (key === "guard" || key === "catch")) weight += 0.55;
      if (skill === "prisoner" && key === "flash") weight += 0.5;
      if (skill === "storm" && key === "katana" && fighter.stormDiscount) weight += 0.65;
      if (recent.length) weight += counts[key] / recent.length * 5 * historyStrength;
      if (level.conditional && ((_a2 = context.decisionHistory) == null ? void 0 : _a2.length)) {
        const matches = similar.filter((item) => item.move === key).length;
        weight += matches * level.conditional * 2.4 / Math.max(1, similar.length);
      }
      return { key, weight: Math.max(0.08, weight) };
    });
  }
  function futureEnergy(energy, moveKey) {
    const move = skillMove(moveKey);
    return Math.max(0, energy - move.cost + (move.gain || 0));
  }
  function scoreMatchup(playerKey, aiKey, aiEnergy, playerEnergy, context) {
    const result = context.skillsEnabled ? resolveWithSkills(playerKey, aiKey, context.playerSkill, context.aiSkill, context.playerFighter, context.aiFighter) : resolveDuelCombat(playerKey, aiKey);
    const roundReset = context.skillsEnabled ? result.reset : basicRoundShouldReset(result);
    let score = 0;
    if (context.skillsEnabled) {
      const damage = previewSkillDamage(
        result,
        playerKey,
        aiKey,
        context.playerSkill,
        context.aiSkill,
        context.playerFighter,
        context.aiFighter
      );
      score += damage.player * 5.5;
      score -= damage.ai * 6.5;
      if (damage.player >= context.playerFighter.hp) score += 28;
      if (damage.ai >= context.aiFighter.hp) score -= 34;
      if (damage.player === 0 && damage.ai === 0) score += 0.45;
      score += skillStrategyValue(aiKey, playerKey, damage, context);
    } else if (result.playerHit && !result.aiHit) score += 12;
    else if (result.aiHit && !result.playerHit) score -= 14;
    else score += 0.8;
    if (roundReset) score += aiEnergy < playerEnergy ? 2.2 : -0.8;
    score += projectedEnergy("ai", aiEnergy, aiKey, context, result.aiHit) * 0.32;
    score -= projectedEnergy("player", playerEnergy, playerKey, context, result.playerHit) * 0.14;
    if (aiKey === "forge" && playerEnergy > 0) score -= 0.45;
    score += matchSituationValue(result, playerKey, aiKey, context);
    return score;
  }
  function projectedEnergy(who, energy, moveKey, context, wasHit = false) {
    const move = skillMove(moveKey);
    if (!context.skillsEnabled) return Math.max(0, futureEnergy(energy, moveKey) - (wasHit && move.gain ? move.gain : 0));
    const skill = who === "ai" ? context.aiSkill : context.playerSkill;
    const fighter = who === "ai" ? context.aiFighter : context.playerFighter;
    const forgeGain = move.gain && !wasHit ? skill === "generalist" && fighter.lastMove === "forge" ? 2 : move.gain : 0;
    let value = Math.max(0, energy - moveCost(moveKey, skill, fighter) + forgeGain);
    if (skill === "whiteTower" && whiteTowerRefunds(moveKey, context.weaponHistory || [])) {
      value += moveCost(moveKey, skill, fighter);
    }
    if (skill === "guardian" && moveKey === "guard") value += 0.25;
    if (skill === "guardian" && moveKey === "catch") value += 0.25;
    return value;
  }
  function skillStrategyValue(aiKey, playerKey, damage, context) {
    const skill = context.aiSkill;
    let value = 0;
    if (skill === "reaper" && damage.player > 0) value += 4;
    if (skill === "secretKeeper" && damage.player > 0) value += 2.5;
    if (skill === "generalist" && (damage.player > 0 || damage.ai > 0)) value += 1.2;
    if (skill === "mother" && damage.player > 0) value += 0.7;
    if (skill === "prisoner" && aiKey === "flash" && damage.ai === 0 && skillMove(playerKey).type === "attack") value += 2;
    if (skill === "storm" && aiKey === "katana" && damage.player === 0) value += 0.7;
    if (skill === "whiteTower" && whiteTowerRefunds(aiKey, context.weaponHistory || [])) {
      value += moveCost(aiKey, skill, context.aiFighter) * 0.7;
    }
    if (skill === "hunter" && context.aiFighter.hp <= 1 && context.playerFighter.hp <= 1) value += 3;
    if (skill === "tyrant" && context.aiFighter.hp <= 1 && damage.player > 0) value += 8;
    if (skill === "bulwark" && aiKey === "bigShield" && context.aiFighter.hp <= 1) value += 2;
    return value;
  }
  function tacticalAiValue(aiKey, context) {
    var _a, _b, _c, _d, _e;
    const move = skillMove(aiKey), playerEnergy = context.playerEnergy || 0, aiEnergy = context.aiEnergy || 0;
    let value = 0;
    if (move.type === "attack") {
      if (move.cost === aiEnergy) value += 0.25;
      if (playerEnergy === 0) value += 0.8;
      if (playerEnergy >= VOID_COST && move.level < 6) value -= 1.2;
    }
    if (aiKey === "forge") {
      value += aiEnergy <= 1 ? 0.75 : aiEnergy >= 4 ? -0.55 : 0.15;
      if (playerEnergy > 0) value -= Math.min(1.5, playerEnergy * 0.24);
    }
    if (aiKey === "guard") value += playerEnergy >= 1 && playerEnergy <= 2 ? 0.7 : playerEnergy >= 3 ? -0.45 : 0.1;
    if (aiKey === "catch") value += playerEnergy >= 2 && playerEnergy <= 3 ? 0.65 : playerEnergy === 0 ? -0.35 : 0;
    if (aiKey === "flash") value += playerEnergy >= 2 && playerEnergy <= 5 ? 0.72 : playerEnergy === 1 || playerEnergy >= 6 ? -0.7 : 0;
    if (aiKey === "bigShield") value += playerEnergy >= 3 ? 1.05 : 0.15;
    if (context.skillsEnabled) {
      const hp = (_b = (_a = context.aiFighter) == null ? void 0 : _a.hp) != null ? _b : 1, maxHp = Math.max(0.5, (_d = (_c = context.aiFighter) == null ? void 0 : _c.maxHp) != null ? _d : hp);
      if (hp / maxHp <= 0.4 && move.type === "attack") value += 0.35;
      if (hp <= ((_e = context.playerFighter) == null ? void 0 : _e.attack) && ["guard", "catch", "flash", "bigShield"].includes(aiKey)) value += 0.6;
    }
    return value;
  }
  function basicRoundShouldReset(result) {
    return Boolean((result == null ? void 0 : result.reset) || (result == null ? void 0 : result.playerHit) || (result == null ? void 0 : result.aiHit));
  }
  function basicEnergyAfterRound(energy, moveKey, wasHit = false, reset = false) {
    if (reset) return 0;
    const move = skillMove(moveKey);
    const gain = move.gain && !wasHit ? move.gain : 0;
    return Math.max(0, energy - move.cost + gain);
  }
  function runBasicEnergyChecks() {
    const failures = [];
    if (basicEnergyAfterRound(4, "catch", false, true) !== 0) failures.push("\u63A5\u4F4F\u91CD\u5F00\u672A\u6E05\u96F6");
    if (basicEnergyAfterRound(5, "flash", false, true) !== 0) failures.push("\u95EA\u6389\u91CD\u5F00\u672A\u6E05\u96F6");
    if (!basicRoundShouldReset({ playerHit: true, aiHit: false, reset: false })) failures.push("\u73A9\u5BB6\u53D7\u4F24\u672A\u89E6\u53D1\u91CD\u5F00");
    if (!basicRoundShouldReset({ playerHit: false, aiHit: true, reset: false })) failures.push("AI\u53D7\u4F24\u672A\u89E6\u53D1\u91CD\u5F00");
    if (basicEnergyAfterRound(5, "knife", false, basicRoundShouldReset({ playerHit: false, aiHit: true, reset: false })) !== 0) failures.push("\u653B\u51FB\u547D\u4E2D\u540E\u53CC\u65B9\u80FD\u91CF\u672A\u6E05\u96F6");
    if (basicEnergyAfterRound(2, "forge", true, false) !== 2) failures.push("\u953B\u9020\u88AB\u547D\u4E2D\u4ECD\u52A0\u80FD\u91CF");
    if (basicEnergyAfterRound(2, "forge", false, false) !== 3) failures.push("\u5B89\u5168\u953B\u9020\u672A\u52A0\u80FD\u91CF");
    if (basicEnergyAfterRound(6, "forge", false, false) !== 7) failures.push("\u953B\u6570\u4ECD\u88AB\u9650\u5236\u4E3A6");
    if (failures.length) console.warn("Basic energy self-check:", failures.join("\u3001"));
    return { passed: failures.length === 0, failures };
  }
  function matchSituationValue(result, playerKey, aiKey, context) {
    const aiLeading = (context.aiScore || 0) - (context.playerScore || 0);
    const target = context.winScore || 3;
    const aiAtMatchPoint = context.mode === "standard" && (context.aiScore || 0) >= target - 1;
    const playerAtMatchPoint = context.mode === "standard" && (context.playerScore || 0) >= target - 1;
    let value = 0;
    if (result.playerHit && !result.aiHit) value += aiAtMatchPoint ? 10 : playerAtMatchPoint ? 6 : 1.5;
    if (result.aiHit && !result.playerHit) value -= playerAtMatchPoint ? 12 : aiAtMatchPoint ? 7 : 2;
    if (aiLeading > 0 && aiKey === "forge" && context.playerEnergy > 0) value -= 0.6;
    if (aiLeading < 0 && skillMove(aiKey).type === "attack") value += 0.35;
    if (context.skillsEnabled) {
      const hpRatio = context.aiFighter.hp / Math.max(0.5, context.aiFighter.maxHp);
      if (hpRatio <= 0.5 && result.aiHit) value -= 3.5;
      if (context.playerFighter.hp <= context.aiFighter.attack && result.playerHit) value += 7;
    }
    return value;
  }
  function persistentSkillValue(context) {
    if (!context.skillsEnabled) return 0;
    const ai = context.aiFighter, player = context.playerFighter;
    let value = (ai.hp - player.hp) * 1.8 + (ai.attack - player.attack) * 2.2;
    value += (ai.attackDiscount || 0) * 1.4 + (ai.stormDiscount || 0) * 0.8 + (ai.boostForge ? 1 : 0);
    value -= (player.attackDiscount || 0) * 1.1 + (player.stormDiscount || 0) * 0.6 + (player.boostForge ? 0.8 : 0);
    if (context.aiSkill === "hunter" && ai.hp <= 1) value += 1.2;
    if (context.playerSkill === "hunter" && player.hp <= 1) value -= 1.4;
    return value;
  }
  function projectedRoundContext(playerKey, aiKey, context) {
    const next = {
      ...context,
      playerFighter: { ...context.playerFighter },
      aiFighter: { ...context.aiFighter },
      history: [...context.history || [], playerKey],
      aiMoveHistory: [...context.aiMoveHistory || [], aiKey],
      weaponHistory: [...context.weaponHistory || []]
    };
    const result = context.skillsEnabled ? resolveWithSkills(playerKey, aiKey, context.playerSkill, context.aiSkill, context.playerFighter, context.aiFighter) : resolveDuelCombat(playerKey, aiKey);
    const roundReset = context.skillsEnabled ? result.reset : basicRoundShouldReset(result);
    next.playerEnergy = projectedEnergy("player", context.playerEnergy, playerKey, context, result.playerHit);
    next.aiEnergy = projectedEnergy("ai", context.aiEnergy, aiKey, context, result.aiHit);
    if (context.skillsEnabled) {
      if (context.playerSkill === "mother" && next.playerFighter.dealtDamageLastRound) next.playerFighter.hp = Math.min(next.playerFighter.maxHp, next.playerFighter.hp + 0.5);
      if (context.aiSkill === "mother" && next.aiFighter.dealtDamageLastRound) next.aiFighter.hp = Math.min(next.aiFighter.maxHp, next.aiFighter.hp + 0.5);
      const damage = previewSkillDamage(result, playerKey, aiKey, context.playerSkill, context.aiSkill, context.playerFighter, context.aiFighter);
      next.playerFighter.hp -= damage.player;
      next.aiFighter.hp -= damage.ai;
      next.playerFighter.energy = next.playerEnergy;
      next.aiFighter.energy = next.aiEnergy;
      projectPersistentSkill("player", playerKey, aiKey, damage.ai, damage.player, next);
      projectPersistentSkill("ai", aiKey, playerKey, damage.player, damage.ai, next);
      if (roundReset) {
        for (const [who, skill] of [["player", context.playerSkill], ["ai", context.aiSkill]]) {
          if (skill === "demon") next[`${who}Fighter`].attack += 0.5;
          if (skill === "generalist" && next[`${who}Fighter`].generalistBoostPending) {
            next[`${who}Fighter`].generalistBoostPending = false;
            next[`${who}Fighter`].boostForge = true;
          }
        }
      }
      if (next.playerFighter.hp <= 0 && context.playerSkill === "hunter") next.aiFighter.hp -= 1;
      if (next.aiFighter.hp <= 0 && context.aiSkill === "hunter") next.playerFighter.hp -= 1;
      const playerDead = next.playerFighter.hp <= 0, aiDead = next.aiFighter.hp <= 0;
      if (playerDead && !aiDead) next.aiScore = (context.aiScore || 0) + 1;
      if (aiDead && !playerDead) next.playerScore = (context.playerScore || 0) + 1;
      if (playerDead) {
        const score = next.playerScore || 0;
        next.playerFighter = createFighter(context.playerSkill);
        next.playerFighter.score = score;
        next.playerEnergy = 0;
      }
      if (aiDead) {
        const score = next.aiScore || 0;
        next.aiFighter = createFighter(context.aiSkill);
        next.aiFighter.score = score;
        next.aiEnergy = 0;
      }
    } else {
      if (result.playerHit && !result.aiHit) next.aiScore = (context.aiScore || 0) + 1;
      if (result.aiHit && !result.playerHit) next.playerScore = (context.playerScore || 0) + 1;
    }
    if (roundReset) next.playerEnergy = next.aiEnergy = 0;
    for (const key of [playerKey, aiKey]) if (skillMove(key).type === "attack" && !next.weaponHistory.includes(key)) next.weaponHistory.push(key);
    next.afterReset = Boolean(roundReset);
    return next;
  }
  function projectPersistentSkill(who, moveKey, opponentMove, dealt, taken, context) {
    const fighter = who === "ai" ? context.aiFighter : context.playerFighter;
    const skill = who === "ai" ? context.aiSkill : context.playerSkill;
    if (skill === "generalist" && moveKey === "forge" && fighter.boostForge) fighter.boostForge = false;
    if (skill === "reaper" && dealt > 0) {
      fighter.hp++;
      fighter.maxHp = Math.max(fighter.maxHp, fighter.hp);
      fighter.attack++;
    }
    if (skill === "secretKeeper" && dealt > 0) {
      fighter.hp++;
      fighter.maxHp = Math.max(fighter.maxHp, fighter.hp);
    }
    if (skill === "prisoner" && moveKey === "flash" && taken === 0 && skillMove(opponentMove).type === "attack") {
      fighter.flashSuccesses++;
      if (fighter.flashSuccesses % 2 === 0) fighter.attackDiscount++;
    }
    if (skill === "storm" && moveKey === "katana") fighter.stormDiscount = dealt === 0 ? 1 : 0;
    if (skill === "assassin" && moveKey === "knife" && dealt > 0) fighter.assassinUsed = true;
    fighter.dealtDamageLastRound = dealt > 0;
  }
  function candidateAiMoves(context) {
    if (context.aiEnergy === 0 && context.playerEnergy === 0) return ["forge"];
    if (context.aiEnergy >= VOID_COST) return ["void"];
    return context.skillsEnabled ? legalSkillMoves(context.aiEnergy, context.aiSkill, context.aiFighter, context.scissorsEnabled) : legalMoves(context.aiEnergy, context.scissorsEnabled);
  }
  function downsideAdjusted(outcomes, risk) {
    const total = outcomes.reduce((sum, item) => sum + item.weight, 0) || 1;
    const expected = outcomes.reduce((sum, item) => sum + item.score * item.weight, 0) / total;
    const ordered = [...outcomes].sort((a, b) => a.score - b.score);
    let remaining = total * 0.35, downside = 0, used = 0;
    for (const item of ordered) {
      const take = Math.min(remaining, item.weight);
      downside += item.score * take;
      used += take;
      remaining -= take;
      if (remaining <= 0) break;
    }
    return expected * (1 - risk) + downside / Math.max(1e-3, used) * risk;
  }
  function planningValue(context, level, remainingDepth) {
    if (remainingDepth <= 0) return persistentSkillValue(context) + context.aiEnergy * 0.22 - context.playerEnergy * 0.12;
    const weights = playerMoveWeights(context.playerEnergy, context.history, level.history, context.skillsEnabled ? context.playerSkill : null, context.playerFighter, context.scissorsEnabled, context, level).sort((a, b) => b.weight - a.weight).slice(0, level.shortlist);
    let best = -Infinity;
    for (const aiKey of candidateAiMoves(context)) {
      const outcomes = weights.map((player) => {
        const immediate = scoreMatchup(player.key, aiKey, context.aiEnergy, context.playerEnergy, context);
        const next = projectedRoundContext(player.key, aiKey, context);
        return { weight: player.weight, score: immediate + planningValue(next, level, remainingDepth - 1) * 0.42 };
      });
      best = Math.max(best, downsideAdjusted(outcomes, level.risk));
    }
    return best;
  }
  function weightedChoice(scored, temperature) {
    const max = Math.max(...scored.map((item) => item.score));
    const weighted = scored.map((item) => ({ ...item, weight: Math.exp((item.score - max) / temperature) }));
    let roll = Math.random() * weighted.reduce((sum, item) => sum + item.weight, 0);
    for (const item of weighted) {
      roll -= item.weight;
      if (roll <= 0) return item.key;
    }
    return weighted[weighted.length - 1].key;
  }
  function chooseAiMove(difficulty, context, playerMove = null) {
    if (context.aiEnergy === 0 && context.playerEnergy === 0) return "forge";
    if (context.aiEnergy >= VOID_COST) return "void";
    const level = LEVELS[difficulty] || LEVELS.normal;
    const aiMoves = candidateAiMoves(context);
    const playerWeights = playerMoveWeights(
      context.playerEnergy,
      context.history,
      level.history,
      context.skillsEnabled ? context.playerSkill : null,
      context.playerFighter,
      context.scissorsEnabled,
      context,
      level
    );
    if (playerMove && Math.random() < level.responseRate) {
      return chooseReactiveMove(aiMoves, playerMove, context, level);
    }
    const scored = aiMoves.map((aiKey) => {
      const matchupScores = playerWeights.map((player) => ({
        score: scoreMatchup(player.key, aiKey, context.aiEnergy, context.playerEnergy, context) + (level.depth > 1 ? planningValue(projectedRoundContext(player.key, aiKey, context), level, level.depth - 1) * 0.38 : 0),
        weight: player.weight
      }));
      const repeats = (context.aiMoveHistory || []).slice(-3).filter((key) => key === aiKey).length;
      const exposurePenalty = repeats * level.repeat * (skillMove(aiKey).type === "attack" ? 0.7 : 1);
      return { key: aiKey, score: downsideAdjusted(matchupScores, level.risk) + tacticalAiValue(aiKey, context) - exposurePenalty + (Math.random() - 0.5) * level.noise };
    }).sort((a, b) => b.score - a.score);
    if (level.explore && Math.random() < level.explore) {
      return weightedChoice(scored, 2.5);
    }
    return weightedChoice(scored.slice(0, level.shortlist), level.temperature);
  }
  function chooseReactiveMove(aiMoves, playerMove, context, level) {
    const scored = aiMoves.map((aiKey) => ({
      key: aiKey,
      score: scoreMatchup(playerMove, aiKey, context.aiEnergy, context.playerEnergy, context) + (level.depth > 1 ? planningValue(projectedRoundContext(playerMove, aiKey, context), level, level.depth - 1) * 0.38 : 0) - (context.aiMoveHistory || []).slice(-3).filter((key) => key === aiKey).length * level.repeat + (Math.random() - 0.5) * level.noise * 0.18
    })).sort((a, b) => b.score - a.score);
    const margin = level.responseRate >= 0.6 ? 0.12 : level.responseRate >= 0.4 ? 0.35 : 0.7;
    const nearBest = scored.filter((item) => scored[0].score - item.score <= margin);
    return weightedChoice(nearBest, Math.max(level.temperature, 0.02));
  }
  function runAiSelfChecks() {
    const failures = [];
    const base = {
      aiEnergy: 0,
      playerEnergy: 0,
      history: [],
      aiMoveHistory: [],
      decisionHistory: [],
      afterReset: false,
      aiScore: 0,
      playerScore: 0,
      winScore: 3,
      mode: "standard",
      skillsEnabled: false,
      playerSkill: "generalist",
      aiSkill: "generalist",
      playerFighter: { energy: 0, score: 0 },
      aiFighter: { energy: 0, score: 0 },
      weaponHistory: [],
      scissorsEnabled: true
    };
    if (chooseAiMove("hell", base) !== "forge") failures.push("\u96F6\u80FD\u91CF\u89C4\u5219");
    if (chooseAiMove("hell", { ...base, aiEnergy: 6, playerEnergy: 3 }) !== "void") failures.push("\u516D\u80FD\u91CF\u89C4\u5219");
    for (const difficulty of Object.keys(LEVELS)) {
      const context = { ...base, aiEnergy: 3, playerEnergy: 2, history: ["forge", "knife", "guard"], aiMoveHistory: ["forge", "guard"], decisionHistory: [] };
      const move = chooseAiMove(difficulty, context);
      if (!legalMoves(3, true).includes(move)) failures.push(`${difficulty}\u5408\u6CD5\u6027`);
    }
    if (failures.length) console.warn("AI self-check:", failures.join("\u3001"));
    return { passed: failures.length === 0, failures };
  }
  const PASSIVE_SKILLS = /* @__PURE__ */ new Set(["generalist", "whiteTower", "reaper", "tyrant", "hangedMan", "monster", "hunter", "warrior", "assassin", "secretKeeper", "prisoner", "demon", "audience", "sun", "apprentice", "guardian", "moon", "pioneer", "nightmare", "aurora", "storm", "observer", "dragonKnight", "saint", "ascetic", "shadow"]);
  function hasPassive258(key) {
    return PASSIVE_SKILLS.has(key);
  }
  function soloHas258(who, key, type = "normal") {
    return fighterHasSoloSkill(who === "player" ? data.settings.playerSkill : data.settings.aiSkill, state[who], key, type);
  }
  function soloSide258(who) {
    return { ...state[who], name: who === "player" ? "\u4F60" : "AI", human: who === "player" };
  }
  function gainHp258(f, amount) {
    const blocked2 = Array.isArray(f.skills) ? aliveMp().some((x) => x.hp > 0 && skillEnabledMp(x, "ascetic")) : ["player", "ai"].some((w) => state[w].hp > 0 && soloHas258(w, "ascetic"));
    if (blocked2 || f.hp <= 0) return 0;
    f.hp += amount;
    f.maxHp = Math.max(f.maxHp || 0, f.hp);
    return amount;
  }
  async function chooseUse258(actor, title) {
    const human = typeof actor === "string" ? actor === "player" : actor.human;
    return human ? await chooseMpOption(title, [{ value: "yes", label: "\u53D1\u52A8" }, { value: "no", label: "\u4E0D\u53D1\u52A8" }]) === "yes" : Math.random() < 0.7;
  }
  function activateTyrant258(f, round) {
    if (f.tyrantUses <= 0 || f.tyrantRestore) return false;
    f.tyrantUses--;
    f.tyrantRestore = { hp: f.hp, round: round + 1 };
    f.hp = 1;
    return true;
  }
  function restoreTyrant258(f, round, events) {
    if (f.hp > 0 && f.tyrantRestore && round >= f.tyrantRestore.round) {
      f.hp = f.tyrantRestore.hp;
      f.tyrantRestore = null;
      events.push((f.name || "\u66B4\u541B") + "\xB7\u66B4\u541B\uFF1A\u6B21\u56DE\u5408\u7ED3\u675F\uFF0C\u6062\u590D\u8BB0\u5F55\u7684\u751F\u547D");
    }
  }
  function keeperAttack258(attack) {
    return ["dragonFang", "void"].includes(attack.key) && skillEnabledMp(attack.attacker, "secretKeeper");
  }
  function keeperHit258(result, pk, ak, ps, as, p, a) {
    var _a, _b;
    const pl = (_a = skillMove(pk)) == null ? void 0 : _a.level, al = (_b = skillMove(ak)) == null ? void 0 : _b.level;
    if (pl && al && pl === al) return result;
    const out = { ...result };
    if (["dragonFang", "void"].includes(pk) && fighterHasSoloSkill(ps, p, "secretKeeper")) {
      out.aiHit = true;
      out.aiDamage = void 0;
      out.reset = false;
      out.title = "\u7AA5\u79D8\uFF1A\u5FC5\u5B9A\u547D\u4E2D";
    }
    if (["dragonFang", "void"].includes(ak) && fighterHasSoloSkill(as, a, "secretKeeper")) {
      out.playerHit = true;
      out.playerDamage = void 0;
      out.reset = false;
      out.title = "\u7AA5\u79D8\uFF1A\u5FC5\u5B9A\u547D\u4E2D";
    }
    return out;
  }
  function sunBannedMp258(f, key) {
    return aliveMp().some((owner) => {
      var _a;
      return owner.team !== f.team && owner.roundFlags.sunDeclare === ((_a = skillMove(key)) == null ? void 0 : _a.name);
    });
  }
  async function initNightSolo258() {
    if (state.nightInitialized) return;
    state.nightInitialized = true;
    for (const who of ["player", "ai"]) {
      const other = who === "player" ? "ai" : "player";
      if (!soloHas258(who, "night", "active") || !soloTargetAllowed(other) || !await chooseUse258(who, "\u9ED1\u591C\uFF1A\u662F\u5426\u4EE4\u5BF9\u624B\u672C\u8F6E\u5931\u53BB\u88AB\u52A8\u6280\u80FD\uFF1F")) continue;
      if (!await soloActiveAllowed(who)) continue;
      state[other].passiveSeals.push(who);
      state.pendingStartEvents.push("\u9ED1\u591C\uFF1A\u5DF2\u5C01\u5370\u5BF9\u624B\u88AB\u52A8\u6280\u80FD");
    }
  }
  async function initNightMp258() {
    for (const night of aliveMp().filter((f) => hasMpSkill(f, "night"))) {
      const pool = aliveMp().filter((f) => f.id !== night.id && !hasMpSkill(f, "pioneer"));
      let target;
      if (night.human) {
        const id = await chooseMpOption("\u9ED1\u591C\uFF1A\u4EE4\u8C01\u672C\u8F6E\u5931\u53BB\u88AB\u52A8\u6280\u80FD\uFF1F", pool.map((f) => ({ value: String(f.id), label: f.name })), { cancelText: "\u4E0D\u53D1\u52A8" });
        target = id == null ? null : pool.find((f) => String(f.id) === id);
      } else target = chooseAiSkillTarget(night, pool, "harm");
      if (target && await mpActiveAllowed(night)) {
        target.passiveSeals.push(night.id);
        logMp(night.name + "\xB7\u9ED1\u591C\uFF1A\u5C01\u5370" + target.name + "\u7684\u88AB\u52A8\u6280\u80FD", "skill");
      }
    }
  }
  function copyRemaining258(source, target, multi) {
    const mapping = { judge: "judgeUses", thief: "thiefUses", pioneer: "pioneerUses", magician: "magicianUses", tyrant: "tyrantUses", ascetic: "asceticUses" };
    const skills = multi ? mpRemainingSkills(target) : [...new Set([target === state.player ? data.settings.playerSkill : data.settings.aiSkill, ...target.extraSkills, ...target.temporarySkills, target.dollSkill].filter((s) => s && s !== "none"))];
    const own = multi ? source.skills : source.extraSkills;
    for (const key of skills) {
      const had = multi ? hasMpSkill(source, key) : fighterOwnsSoloSkill(source === state.player ? data.settings.playerSkill : data.settings.aiSkill, source, key);
      if (had) continue;
      own.push(key);
      if (mapping[key]) source[mapping[key]] = target[mapping[key]];
      if (multi && key in target.activeUses) source.activeUses[key] = target.activeUses[key];
      if (multi && key in target.fieldUses) source.fieldUses[key] = target.fieldUses[key];
      if (key === "assassin") source.assassinUsed = target.assassinUsed;
      if (key === "shepherd") {
        if (multi) source.shepherdUses = { ...target.shepherdUses };
        else for (const field of ["shepherdHealUses", "shepherdRefreshUses", "shepherdDomainUses"]) source[field] = target[field];
      }
      if (!multi) {
        for (const [role, field] of [["sun", "sunFieldUses"], ["singularity", "singularityFieldUses"]]) if (role === key) source[field] = target[field];
      }
    }
  }
  async function hitSkills258(source, target, key, events, multi) {
    const attacker = multi ? source : state[source], victim = multi ? target : state[target];
    const has = (skill) => multi ? skillEnabledMp(attacker, skill) : soloHas258(source, skill);
    if (attacker.hp <= 0) return;
    if (has("reaper")) {
      const gain = gainHp258(attacker, 1);
      attacker.attack++;
      events.push((attacker.name || source) + "\xB7\u6B7B\u795E\uFF1A\u547D\u4E2D\uFF0C\u653B\u51FB+1\uFF0C\u751F\u547D+" + gain);
    }
    if (has("apprentice")) {
      copyRemaining258(attacker, victim, multi);
      events.push((attacker.name || source) + "\xB7\u5B66\u5F92\uFF1A\u547D\u4E2D\uFF0C\u83B7\u5F97\u5C1A\u672A\u62E5\u6709\u7684\u5269\u4F59\u6280\u80FD");
    }
  }
  function lethalBody258(f, damage, trueDamage) {
    if (trueDamage) return damage >= f.hp;
    for (const kind of [.../* @__PURE__ */ new Set([...f.damageOrder || [], "dragon", "doll"])]) if (f[kind] > 0) {
      if (f[kind + "Shields"] > 0) return false;
      damage -= f[kind];
      if (damage <= 0) return false;
    }
    return !(f.shields > 0) && damage >= f.hp;
  }
  async function asceticPreventMp258(f, damage, trueDamage, events) {
    if (!skillEnabledMp(f, "ascetic", "active") || f.asceticUses <= 0 || !lethalBody258(f, damage, trueDamage)) return false;
    if (!await chooseUse258(f, "\u82E6\u4FEE\uFF1A\u662F\u5426\u9632\u6B62\u672C\u6B21\u81F4\u547D\u4F24\u5BB3\uFF1F") || !await mpActiveAllowed(f)) return false;
    f.asceticUses--;
    events.push(f.name + "\xB7\u82E6\u4FEE\uFF1A\u9632\u6B62\u81F4\u547D\u4F24\u5BB3");
    return true;
  }
  async function asceticPreventSolo258(who, damage, events, trueDamage = false) {
    const f = state[who];
    if (damage <= 0 || !soloHas258(who, "ascetic", "active") || f.asceticUses <= 0 || !lethalBody258(f, damage, trueDamage)) return damage;
    if (!await chooseUse258(who, "\u82E6\u4FEE\uFF1A\u662F\u5426\u9632\u6B62\u672C\u6B21\u81F4\u547D\u4F24\u5BB3\uFF1F") || !await soloActiveAllowed(who)) return damage;
    f.asceticUses--;
    events.push("\u82E6\u4FEE\uFF1A\u9632\u6B62\u81F4\u547D\u4F24\u5BB3");
    return 0;
  }
  async function saintSolo258(who, events) {
    const f = state[who], pending = f.saintPending || 0;
    f.saintPending = 0;
    for (let i = 0; i < pending; i++) if (soloHas258(who, "saint", "active") && await chooseUse258(who, "\u5723\u6597\u58EB\uFF1A\u662F\u5426\u4EE4\u4E0B\u6B21\u4F24\u5BB3+0.5\uFF1F") && await soloActiveAllowed(who)) {
      f.saintBonus += 0.5;
      events.push("\u5723\u6597\u58EB\uFF1A\u4E0B\u6B21\u4F24\u5BB3+0.5");
    }
  }
  async function soloSkillDamage258(source, target, amount, events = []) {
    const a = state[source], f = state[target];
    if (f.hp <= 0) return 0;
    const trueDamage = soloHas258(source, "sun");
    let damage = amount + (f.vulnerable || 0) + (a.saintBonus || 0);
    if (soloHas258(source, "tyrant") && a.hp <= 1) damage = 10;
    damage = Math.max(0, damage - (f.shepherdReduction || 0));
    damage = applySoloPioneerProtection(target, damage, events);
    damage = await asceticPreventSolo258(target, damage, events, trueDamage);
    const result = absorbDuelDamage(target, damage, trueDamage, events);
    f.hp -= result.damage;
    f.attackLethal = false;
    if (result.dealt > 0) {
      a.saintBonus = 0;
      state.damageThisRound = true;
      a.dealtDamageLastRound = true;
      if (result.damage > 0) f.tookDamageLastRound = true;
    }
    await saintSolo258(target, events);
    events.push("\u6280\u80FD\u4F24\u5BB3\uFF1A" + source + " \u2192 " + target + "\uFF0C\u5B9E\u9645" + formatNumber(result.dealt));
    return result.dealt;
  }
  async function roundJudgesMp258(events) {
    if (!mpState.fighters.some((f) => f.dealtDamageLastRound || f.tookDamageLastRound)) return;
    for (const judge of shuffleMp(aliveMp().filter((f) => f.hp > 0 && skillEnabledMp(f, "judge", "active") && f.activeUses.judge > 0))) {
      if (await wantsMpJudge(judge)) {
        const target = await chooseMpJudgeOpponent(judge, null);
        if (target) await resolveMpJudgeDuel(judge, target, events);
      }
    }
  }
  async function audienceMp258(actor, key, events) {
    if (key === "knife" || !skillEnabledMp(actor, "audience", "active") || actor.hp <= 0 || actor.retreatUntil >= mpState.round) return;
    if (!await chooseUse258(actor, "\u89C2\u4F17\uFF1A\u975E\u5C0F\u5200\u547D\u4E2D\uFF0C\u662F\u5426\u9000\u573A\u4E00\u56DE\u5408\u5E76\u643A\u5E26\u81F3\u591A2\u4EBA\uFF1F") || !await mpActiveAllowed(actor)) return;
    const selected = [actor], pool = aliveMp().filter((f) => f.id !== actor.id && !f.skipped && !hasMpSkill(f, "pioneer"));
    for (let i = 0; i < 2 && pool.length; i++) {
      let target;
      if (actor.human) {
        const id = await chooseMpOption("\u89C2\u4F17\uFF1A\u9009\u62E9\u7B2C" + (i + 1) + "\u4F4D\u4E00\u540C\u9000\u573A\u8005", pool.map((f) => ({ value: String(f.id), label: f.name })), { cancelText: "\u4E0D\u518D\u9009\u62E9" });
        target = id == null ? null : pool.find((f) => String(f.id) === id);
      } else target = pool.find((f) => f.team !== actor.team);
      if (!target) break;
      selected.push(target);
      pool.splice(pool.indexOf(target), 1);
    }
    const watchers = aliveMp().filter((f) => skillEnabledMp(f, "audience"));
    for (const f of selected) {
      f.retreatUntil = mpState.round + 1;
      f.retreatOwner = actor.id;
      f.skipped = true;
      events.push(f.name + "\xB7\u89C2\u4F17\uFF1A\u7ACB\u5373\u9000\u573A\uFF0C\u4E0B\u4E00\u5B8C\u6574\u56DE\u5408\u4E0D\u53C2\u4E0E\u4E14\u65E0\u6CD5\u53D1\u52A8\u6280\u80FD");
    }
    for (const f of selected) if (!aliveMp().some((ally) => ally.id !== f.id && ally.team === f.team && !ally.skipped && !selected.includes(ally))) for (const watcher of watchers) await applyMpSkillDamage(watcher, f, 1, events, { trueDamage: true, allowJudge: false });
  }
  async function resolveSoloAudience258(event, pk, ak, events) {
    for (const who of ["player", "ai"]) {
      const other = who === "player" ? "ai" : "player", key = who === "player" ? pk : ak;
      if (!event.hit[other] || key === "knife" || !soloHas258(who, "audience", "active") || state[who].hp <= 0 || !await chooseUse258(who, "\u89C2\u4F17\uFF1A\u662F\u5426\u9000\u573A\u4E00\u56DE\u5408\uFF1F") || !await soloActiveAllowed(who)) continue;
      const selected = [who];
      if (soloTargetAllowed(other) && await chooseUse258(who, "\u662F\u5426\u4EE4\u5BF9\u624B\u4E00\u8D77\u9000\u573A\uFF1F")) selected.push(other);
      for (const side of selected) {
        state[side].retreatUntil = state.round + 1;
        state[side].retreatOwner = who;
        state[side].skipped = true;
        state[side].hp -= 1;
        state[side].attackLethal = false;
        events.push("\u89C2\u4F17\uFF1A" + side + "\u7ACB\u5373\u9000\u573A\uFF0C\u4E14\u65E0\u5728\u573A\u961F\u53CB\uFF0C\u53D7\u52301\u70B9\u771F\u5B9E\u4F24\u5BB3");
      }
    }
  }
  async function assassin258(actor, key, events, multi) {
    const f = multi ? actor : state[actor], enabled = multi ? skillEnabledMp(f, "assassin", "active") : soloHas258(actor, "assassin", "active");
    if (key !== "knife" || f.assassinUsed || !enabled || f.hp <= 0) return 0;
    if (!await chooseUse258(actor, "\u523A\u5BA2\uFF1A\u662F\u5426\u6D88\u8017\u672C\u8F6E\u6B21\u6570\uFF0C\u4EE4\u672C\u6B21\u5C0F\u5200\u4F24\u5BB3+0.5\uFF1F")) return 0;
    if (!await (multi ? mpActiveAllowed(f) : soloActiveAllowed(actor))) return 0;
    f.assassinUsed = true;
    events.push("\u523A\u5BA2\uFF1A\u5C0F\u5200\u4F24\u5BB3+0.5");
    return 0.5;
  }
  async function advanceSoloRetreat258() {
    const sides = ["player", "ai"], retired = sides.filter((w) => {
      var _a;
      return state[w].retreatUntil >= state.round && state[w].hp > 0 && ((_a = state[state[w].retreatOwner]) == null ? void 0 : _a.hp) > 0;
    });
    if (!retired.length) return;
    for (const who of retired) state[who].skipped = true;
    state.pendingStartEvents.push("\u89C2\u4F17\uFF1A\u9000\u573A\u671F\u95F4\u6CA1\u6709\u53CC\u65B9\u5728\u573A\u7684\u5BF9\u5C40\uFF0C\u672C\u56DE\u5408\u81EA\u52A8\u7ED3\u675F");
    for (const who of sides) {
      const f = state[who];
      if (!f.skipped && soloHas258(who, "demon")) f.attack += 0.5;
      restoreTyrant258(f, state.round, state.pendingStartEvents);
      f.energy = 0;
    }
    state.round++;
    state.preparedRound = state.round;
    for (const who of sides) {
      state[who].skipped = false;
      state[who].retreatUntil = 0;
    }
  }
  const KEY = "hezhang-game-v2";
  const SAVE_SCHEMA_VERSION = 3;
  const defaults = {
    schemaVersion: SAVE_SCHEMA_VERSION,
    settings: { mode: "standard", difficulty: "normal", winScore: 3, timerEnabled: false, timerSeconds: 15, energyVisible: true, skillsEnabled: false, playerSkill: "generalist", aiSkill: "generalist", scissorsEnabled: false, sound: true, scene: "paper" },
    stats: { games: 0, wins: 0, losses: 0, bestStreak: 0, currentStreak: 0, moves: {}, byDifficulty: {} },
    tutorialSeen: false,
    firstTurnHintSeen: false
  };
  function loadData() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
      const merged = { ...defaults, ...saved, settings: { ...defaults.settings, ...saved.settings }, stats: { ...defaults.stats, ...saved.stats } };
      if (merged.settings.difficulty === "mindreader") merged.settings.difficulty = "hell";
      if (!SOLO_SKILL_KEYS.includes(merged.settings.playerSkill)) merged.settings.playerSkill = "generalist";
      if (!SOLO_SKILL_KEYS.includes(merged.settings.aiSkill)) merged.settings.aiSkill = "generalist";
      merged.settings.timerSeconds = Math.max(0.5, Math.min(15, Number(merged.settings.timerSeconds) || 15));
      merged.schemaVersion = SAVE_SCHEMA_VERSION;
      return merged;
    } catch (e) {
      return structuredClone(defaults);
    }
  }
  function saveData(data2) {
    localStorage.setItem(KEY, JSON.stringify(data2));
  }
  const $ = (id) => document.getElementById(id);
  function renderEnergy(id, countId, energy) {
    const whole = Math.max(0, Math.floor(energy));
    const cellCount = Math.min(Math.max(VOID_COST, Math.ceil(energy)), ENERGY_DISPLAY_LIMIT);
    const overflow = Math.max(0, whole - ENERGY_DISPLAY_LIMIT);
    $(id).innerHTML = Array.from({ length: cellCount }, (_, index) => `<i class="energy-cell ${index < energy ? "filled" : ""}"></i>`).join("") + (overflow ? `<i class="energy-cell filled overflow">+${overflow}</i>` : "");
    $(countId).textContent = formatNumber(energy);
  }
  function renderMoves(energy, onSelect, busy = false, skillKey = null, fighter = {}, scissorsEnabled = false) {
    const keys = skillKey ? availableMoveKeys(skillKey, fighter, scissorsEnabled) : Object.keys(MOVES).filter((key) => scissorsEnabled || key !== "scissors");
    const grid = $("moveGrid");
    const cards = keys.map((key) => {
      const move = skillMove(key);
      const cost = skillKey ? moveCost(key, skillKey, fighter) : move.cost;
      const shortfall = Math.max(0, cost - energy);
      return `<button class="move-card ${move.type}" data-move="${key}" ${busy || shortfall ? "disabled" : ""} aria-label="${move.name}\uFF0C${move.summary}">
      <span class="move-icon">${move.icon}</span><strong>${move.name}</strong><small>${shortfall ? `\u8FD8\u5DEE ${shortfall} \u683C\u80FD\u91CF` : move.summary}</small>
      <span class="move-cost">${cost || (move.gain ? "+1" : "0")}</span>
    </button>`;
    });
    if (skillKey && !busy) cards.push(...getSoloActiveActions(skillKey, fighter).map(([key, name]) => `<button class="move-card active-skill" data-solo-skill="${key}"><span class="move-icon">\u25C6</span><strong>${name}</strong><small>\u4E3B\u52A8\u6280\u80FD</small><span class="move-cost">\u6280</span></button>`));
    grid.innerHTML = cards.join("");
    grid.querySelectorAll("[data-move]").forEach((button) => button.addEventListener("click", () => onSelect(button.dataset.move)));
    grid.querySelectorAll("[data-solo-skill]").forEach((button) => button.addEventListener("click", () => activateSoloSkill(button.dataset.soloSkill)));
  }
  function getSoloActiveActions(skill, f) {
    const list = [];
    const opening = (state.roundActionCount || 0) === 0 && !f.fieldOpenedThisRound;
    if (opening && fighterHasSoloSkill(skill, f, "tyrant", "active") && f.tyrantUses > 0 && !f.tyrantRestore) list.push(["tyrant", "\u66B4\u541B\uFF1A\u8BB0\u5F55\u751F\u547D\u5E76\u964D\u81F31"]);
    if (opening && fighterOwnsSoloSkill(skill, f, "sun") && f.sunFieldUses > 0) list.push(["sunField", "\u592A\u9633\u5BA3\u8A00"]);
    if (opening && fighterOwnsSoloSkill(skill, f, "singularity") && f.singularityFieldUses > 0) list.push(["singularityField", "\u5947\u70B9\u5C01\u9501"]);
    if (opening && fighterHasSoloSkill(skill, f, "pioneer", "active") && f.pioneerUses > 0 && !f.pioneerActiveProtection) list.push(["pioneer", "\u5148\u9A71\u514D\u4F24"]);
    if (fighterHasSoloSkill(skill, f, "miracle")) list.push(["miracle", f.miracleDeclare ? "\u53D6\u6D88\u5BA3\u8A00" : "\u6B66\u5668\u5BA3\u8A00"]);
    if (fighterHasSoloSkill(skill, f, "thief") && f.thiefUses > 0 && !f.thiefBorrowed) list.push(["thief", "\u76D7\u53D6\u6280\u80FD"]);
    if (opening && fighterHasSoloSkill(skill, f, "singularity", "active") && !f.singularityUsedThisRound) list.push(["singularity", "\u5947\u70B9\u6613\u4F24"]);
    if (opening && fighterHasSoloSkill(skill, f, "blackEmperor", "active") && f.shields > 0 && !f.emperorGifted) list.push(["blackEmperor", "\u8F6C\u79FB\u62A4\u76FE"]);
    if (opening && fighterHasSoloSkill(skill, f, "shepherd", "active") && f.shepherdHealUses > 0) list.push(["shepherdHeal", "\u7267\u7F8A\u6CBB\u7597"]);
    if (opening && fighterHasSoloSkill(skill, f, "shepherd", "active") && f.shepherdRefreshUses > 0) list.push(["shepherdRefresh", "\u8865\u5145\u6280\u80FD\u6B21\u6570"]);
    if (opening && fighterHasSoloSkill(skill, f, "shepherd", "active") && f.shepherdDomainUses > 0 && !f.shepherdReduction) list.push(["shepherdDomain", "\u7267\u7F8A\u9886\u57DF"]);
    if (f.dragon > 0 && f.doll > 0) list.push(["damageOrder", "\u8C03\u6574\u627F\u4F24\u987A\u5E8F"]);
    return list;
  }
  function registerSoloField(who, type, param = null) {
    state.duelFields.push({ who, type, param });
    state.player.roundSkillLock = false;
    state.ai.roundSkillLock = false;
    state.player.sunDeclare = null;
    state.ai.sunDeclare = null;
    const sides = new Set(state.duelFields.map((x) => x.who));
    state.duelFieldConflict = sides.size > 1;
    if (state.duelFieldConflict) {
      state.pendingStartEvents.push("\u9886\u57DF\u51B2\u7A81\uFF1A\u53CC\u65B9\u5747\u5C55\u5F00\u9886\u57DF\uFF0C\u672C\u56DE\u5408\u6240\u6709\u9886\u57DF\u5931\u6548\uFF1B\u6B21\u6570\u4E0D\u8FD4\u8FD8");
      return false;
    }
    for (const field of state.duelFields) {
      const other = field.who === "player" ? "ai" : "player";
      if (field.type === "sun") state[field.who].sunDeclare = field.param;
      if (field.type === "singularity") state[other].roundSkillLock = true;
    }
    return true;
  }
  async function activateSoloSkill(key) {
    if (state.busy) return;
    const f = state.player;
    if (!getSoloActiveActions(data.settings.playerSkill, f).some(([action]) => action === key)) return;
    const fieldAction = key === "sunField" || key === "singularityField" || key === "shepherdDomain";
    if (!fieldAction && key !== "fisherman" && !await soloActiveAllowed("player")) {
      render();
      return;
    }
    if (key === "sunField") {
      const value = await chooseMpOption("\u592A\u9633\u5BA3\u8A00\uFF1A\u9009\u62E9\u672C\u56DE\u5408\u7981\u6B62\u654C\u65B9\u4F7F\u7528\u7684\u653B\u51FB", ATTACK_KEYS.filter((x) => data.settings.scissorsEnabled || x !== "scissors").map((x) => ({ value: x, label: skillMove(x).name })));
      if (value) {
        f.sunFieldUses--;
        f.fieldOpenedThisRound = true;
        const active = registerSoloField("player", "sun", value);
        if (active) state.pendingStartEvents.push(`\u4F60\xB7\u592A\u9633\u9886\u57DF\uFF1A\u5BA3\u8A00${skillMove(value).name}`);
        showToast(active ? `\u592A\u9633\u5BA3\u8A00\uFF1A${skillMove(value).name}` : "\u9886\u57DF\u51B2\u7A81\uFF1A\u672C\u56DE\u5408\u9886\u57DF\u5747\u5931\u6548");
      }
    }
    if (key === "singularityField") {
      f.singularityFieldUses--;
      f.fieldOpenedThisRound = true;
      const active = registerSoloField("player", "singularity");
      if (active) state.pendingStartEvents.push("\u4F60\xB7\u5947\u70B9\u9886\u57DF\uFF1AAI\u672C\u56DE\u5408\u4E3B\u52A8\u4E0E\u88AB\u52A8\u6280\u80FD\u5931\u6548");
      showToast(active ? "\u5947\u70B9\u9886\u57DF\uFF1AAI\u672C\u56DE\u5408\u6280\u80FD\u5931\u6548" : "\u9886\u57DF\u51B2\u7A81\uFF1A\u672C\u56DE\u5408\u9886\u57DF\u5747\u5931\u6548");
    }
    if (key === "tyrant") activateTyrant258(f, state.round);
    if (key === "pioneer") {
      f.pioneerUses--;
      f.pioneerActiveProtection = true;
      showToast("\u5148\u9A71\uFF1A\u672C\u56DE\u5408\u53D7\u5230\u7684\u4F24\u5BB3\u5C06\u88AB\u9632\u6B62");
    }
    if (key === "miracle") {
      f.miracleDeclare = !f.miracleDeclare;
      showToast(`\u5947\u8FF9\u5BA3\u8A00\u5DF2${f.miracleDeclare ? "\u5F00\u542F" : "\u53D6\u6D88"}`);
    }
    if (key === "thief" && f.thiefUses > 0) {
      if (!soloTargetAllowed("ai")) {
        showToast("\u5148\u9A71\u4E0D\u80FD\u6210\u4E3A\u76D7\u53D6\u76EE\u6807");
        return;
      }
      beginSoloThiefBorrow("player");
      showToast(`\u76D7\u8D3C\uFF1A\u672C\u56DE\u5408\u6682\u65F6\u76D7\u53D6\u300C${SKILLS[data.settings.aiSkill].name}\u300D`);
    }
    if (key === "singularity") {
      if (!soloTargetAllowed("ai")) {
        showToast("\u5148\u9A71\u4E0D\u80FD\u6210\u4E3A\u6613\u4F24\u76EE\u6807");
        return;
      }
      f.singularityUsedThisRound = true;
      f.singularityAttackPenalty = 0.5;
      f.attack = Math.max(0, f.attack - 0.5);
      state.ai.vulnerable = (state.ai.vulnerable || 0) + 0.5;
      showToast("\u5947\u70B9\uFF1A\u672C\u56DE\u5408\u81EA\u8EAB\u653B\u51FB-0.5\uFF0CAI\u53D7\u5230\u7684\u4F24\u5BB3+0.5");
    }
    if (key === "blackEmperor") {
      const choices = [];
      if (soloTargetAllowed("ai")) choices.push({ value: "ai:fighter", label: `AI\u672C\u4F53 \xB7 ${state.ai.shields || 0}\u62A4\u76FE` });
      for (const side2 of ["player", "ai"]) {
        if (!soloTargetAllowed(side2)) continue;
        const target2 = state[side2], label = side2 === "player" ? "\u4F60\u7684" : "AI\u7684";
        if (target2.dragon > 0) choices.push({ value: `${side2}:dragon`, label: `${label}\u9F99 \xB7 ${target2.dragonShields || 0}\u62A4\u76FE` });
        if (target2.doll > 0) choices.push({ value: `${side2}:doll`, label: `${label}\u79D8\u5076 \xB7 ${target2.dollShields || 0}\u62A4\u76FE` });
      }
      if (!choices.length) {
        showToast("\u5F53\u524D\u6CA1\u6709\u5408\u6CD5\u7684\u62A4\u76FE\u8F6C\u79FB\u76EE\u6807");
        return;
      }
      const value = await chooseMpOption("\u9ED1\u7687\u5E1D\uFF1A\u5C06\u672C\u4F53\u4E0A\u76841\u62A4\u76FE\u8F6C\u79FB\u5230\u54EA\u91CC\uFF1F", choices), [side, kind] = String(value || "").split(":"), target = state[side];
      if (target) {
        f.shields--;
        if (kind === "fighter") target.shields++;
        else if (kind === "dragon") target.dragonShields = (target.dragonShields || 0) + 1;
        else target.dollShields = (target.dollShields || 0) + 1;
        f.emperorGifted = true;
        showToast(`\u9ED1\u7687\u5E1D\uFF1A\u62A4\u76FE\u5DF2\u8F6C\u79FB\u5230${side === "player" ? "\u4F60\u7684" : "AI\u7684"}${kind === "fighter" ? "\u672C\u4F53" : kind === "dragon" ? "\u9F99" : "\u79D8\u5076"}`);
      }
    }
    if (key === "damageOrder") {
      const value = await chooseMpOption("\u8C03\u6574\u975E\u771F\u5B9E\u4F24\u5BB3\u7684\u627F\u53D7\u987A\u5E8F", [{ value: "dragon,doll", label: "\u9F99 \u2192 \u79D8\u5076 \u2192 \u672C\u4F53" }, { value: "doll,dragon", label: "\u79D8\u5076 \u2192 \u9F99 \u2192 \u672C\u4F53" }]);
      if (value) {
        f.damageOrder = value.split(",");
        showToast(`\u627F\u4F24\u987A\u5E8F\uFF1A${f.damageOrder.map((x) => x === "dragon" ? "\u9F99" : "\u79D8\u5076").join(" \u2192 ")} \u2192 \u672C\u4F53`);
      }
    }
    if (key === "shepherdHeal") {
      const options = ["player", "ai"].filter(soloTargetAllowed).map((side) => ({ value: side, label: `\u4EE4${side === "player" ? "\u81EA\u5DF1" : "AI"}\u589E\u52A01\u8840` }));
      if (!options.length) {
        showToast("\u5F53\u524D\u6CA1\u6709\u5408\u6CD5\u6CBB\u7597\u76EE\u6807");
        return;
      }
      const target = await chooseMpOption("\u7267\u7F8A\u4EBA\uFF1A\u4EE4\u8C01\u589E\u52A01\u8840\uFF1F", options);
      if (!target) return;
      f.shepherdHealUses--;
      gainHp258(state[target], 1);
      state[target].maxHp = Math.max(state[target].maxHp, state[target].hp);
      showToast(`\u7267\u7F8A\u4EBA\uFF1A\u4EE4${target === "player" ? "\u4F60" : "AI"}\u751F\u547D+1`);
    }
    if (key === "shepherdRefresh") {
      if (!soloTargetAllowed("ai")) {
        showToast("\u5148\u9A71\u4E0D\u80FD\u6210\u4E3A\u8865\u5145\u6B21\u6570\u7684\u76EE\u6807");
        return;
      }
      const options = soloLimitedUseOptions("ai");
      if (!options.length) {
        showToast("AI\u6CA1\u6709\u53EF\u8865\u5145\u7684\u9650\u6B21\u4E3B\u52A8\u6280\u80FD");
        return;
      }
      const selected = await chooseMpOption("\u7267\u7F8A\u4EBA\uFF1A\u8865\u5145AI\u7684\u54EA\u4E00\u9879\u4E3B\u52A8\u6280\u80FD\uFF1F", options.map((x) => ({ value: x.value, label: x.label }))), entry = options.find((x) => x.value === selected);
      if (!entry) return;
      f.shepherdRefreshUses--;
      entry.apply();
      showToast(`\u7267\u7F8A\u4EBA\uFF1A${entry.label}\u6B21\u6570+1`);
    }
    if (key === "shepherdDomain") {
      f.shepherdDomainUses--;
      f.shepherdReduction = 0.5;
      showToast("\u7267\u7F8A\u9886\u57DF\uFF1A\u4F60\u672C\u56DE\u5408\u53D7\u5230\u7684\u4F24\u5BB3-0.5");
    }
    render();
  }
  function soloOwnsSkill(who, wanted) {
    const fighter = state[who], base = who === "player" ? data.settings.playerSkill : data.settings.aiSkill;
    return base === wanted || (fighter.extraSkills || []).includes(wanted) || (fighter.temporarySkills || []).includes(wanted) || fighter.dollSkill === wanted;
  }
  function soloTargetAllowed(who) {
    return !soloOwnsSkill(who, "pioneer");
  }
  function soloLimitedUseOptions(who) {
    const fighter = state[who], base = who === "player" ? data.settings.playerSkill : data.settings.aiSkill, entries = [];
    const add = (skill, field, label) => {
      if (fighterHasSoloSkill(base, fighter, skill)) entries.push({ value: field, label, apply: () => fighter[field]++ });
    };
    add("judge", "judgeUses", "\u5BA1\u5224\u8005\xB7\u8FFD\u52A0\u5BF9\u5C40");
    add("thief", "thiefUses", "\u76D7\u8D3C\xB7\u76D7\u53D6\u6280\u80FD");
    add("pioneer", "pioneerUses", "\u5148\u9A71\xB7\u56DE\u5408\u9632\u62A4");
    add("magician", "magicianUses", "\u9B54\u672F\u5E08\xB7\u6539\u5199");
    add("tyrant", "tyrantUses", "\u66B4\u541B\xB7\u8BB0\u5F55\u751F\u547D");
    add("ascetic", "asceticUses", "\u82E6\u4FEE\xB7\u514D\u6B7B");
    add("sun", "sunFieldUses", "\u592A\u9633\xB7\u9886\u57DF");
    add("singularity", "singularityFieldUses", "\u5947\u70B9\xB7\u9886\u57DF");
    if (fighterHasSoloSkill(base, fighter, "shepherd")) {
      entries.push({ value: "shepherdHealUses", label: "\u7267\u7F8A\u4EBA\xB7\u751F\u547D\u56DE\u590D", apply: () => fighter.shepherdHealUses++ });
      entries.push({ value: "shepherdRefreshUses", label: "\u7267\u7F8A\u4EBA\xB7\u8865\u5145\u6B21\u6570", apply: () => fighter.shepherdRefreshUses++ });
    }
    return entries;
  }
  function beginSoloThiefBorrow(who) {
    const other = who === "player" ? "ai" : "player", f = state[who], victim = state[other];
    const base = other === "player" ? data.settings.playerSkill : data.settings.aiSkill, stolen = [...new Set([base, ...victim.extraSkills || [], victim.dollSkill].filter(Boolean))];
    const previousExtras = [...f.extraSkills];
    copyRemaining258(f, victim, false);
    f.extraSkills = previousExtras;
    f.thiefUses--;
    f.thiefBorrowed = { skills: stolen, target: other };
    for (const skill of stolen) {
      if (!fighterHasSoloSkill(who === "player" ? data.settings.playerSkill : data.settings.aiSkill, f, skill)) f.temporarySkills.push(skill);
      if (!victim.temporaryDisabledSkills.includes(skill)) victim.temporaryDisabledSkills.push(skill);
    }
  }
  async function soloActiveAllowed(who) {
    const other = who === "player" ? "ai" : "player";
    if (state[who].hp <= 0 || state[who].skipped) return false;
    if (!soloHas258(other, "fisherman", "active") || state[other].hp <= 0) return true;
    if (!await chooseUse258(other, "\u6E14\u592B\uFF1A\u662F\u5426\u6311\u6218\u6B63\u5728\u53D1\u52A8\u7684\u4E3B\u52A8\u6280\u80FD\uFF1F")) return true;
    if (await resolveNoSkillChallenge(soloSide258(other), soloSide258(who))) {
      await soloSkillDamage258(other, who, 1, state.pendingStartEvents);
      return false;
    }
    return true;
  }
  function renderRules() {
    $("ruleGrid").innerHTML = Object.values(MOVES).map((move) => `<article class="rule-card"><span>${move.icon}</span><div><strong>${move.name} \xB7 ${move.cost ? `${move.cost} \u80FD\u91CF` : "\u514D\u8D39"}</strong><small>${move.rule}</small></div></article>`).join("");
    $("skillRuleGrid").innerHTML = Object.values(SKILLS).map((skill) => `<article class="rule-card"><span>\u6280</span><div><strong>${skill.name} \xB7 ${skill.hp}\u8840${skill.attack}\u653B</strong><small>${skill.description}</small></div></article>`).join("");
    $("embeddedRulebook").textContent = EMBEDDED_RULEBOOK_MD;
  }
  function revealMove(who, moveKey, hidden = false) {
    const element = $(`${who}Move`);
    const move = skillMove(moveKey);
    element.classList.toggle("hidden", hidden);
    if (move) element.innerHTML = `<span>${move.icon}</span><strong>${move.name}</strong>`;
  }
  function showToast(message) {
    const toast = $("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timeout);
    showToast.timeout = setTimeout(() => toast.classList.remove("show"), 1800);
  }
  function showClap() {
    const overlay = $("clapOverlay");
    overlay.classList.remove("show");
    void overlay.offsetWidth;
    overlay.classList.add("show");
  }
  function updateHomeStats(stats) {
    $("homeGames").textContent = stats.games;
    $("homeBest").textContent = stats.bestStreak;
    $("homeWinRate").textContent = stats.games ? `${Math.round(stats.wins / stats.games * 100)}%` : "\u2014";
  }
  function renderStats() {
    const stats = data.stats;
    const rate = stats.games ? `${Math.round(stats.wins / stats.games * 100)}%` : "\u2014";
    const moveEntries = Object.entries(stats.moves || {}).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const difficultyEntries = Object.entries(stats.byDifficulty || {});
    const moves = moveEntries.length ? `<ul>${moveEntries.map(([key, count]) => {
      var _a;
      return `<li>${((_a = skillMove(key)) == null ? void 0 : _a.name) || key}\uFF1A${count} \u6B21</li>`;
    }).join("")}</ul>` : "<span>\u5B8C\u6210\u4E00\u5C40\u540E\u5F00\u59CB\u8BB0\u5F55</span>";
    const difficulty = difficultyEntries.length ? `<ul>${difficultyEntries.map(([key, item]) => `<li>${{ easy: "\u7B80\u5355", normal: "\u666E\u901A", hard: "\u56F0\u96BE", hell: "\u5730\u72F1" }[key] || key}\uFF1A${item.wins || 0} \u80DC / ${item.games} \u5C40</li>`).join("")}</ul>` : "<span>\u5B8C\u6210\u4E00\u5C40\u540E\u5F00\u59CB\u8BB0\u5F55</span>";
    $("statsContent").innerHTML = `<article class="stat-card"><strong>${stats.games}</strong><span>\u5B8C\u6210\u5BF9\u5C40</span></article><article class="stat-card"><strong>${rate}</strong><span>\u603B\u80DC\u7387</span></article><article class="stat-card"><strong>${stats.bestStreak}</strong><span>\u6700\u9AD8\u8FDE\u80DC</span></article><article class="stat-card wide"><b>\u5E38\u7528\u62DB\u5F0F</b>${moves}</article><article class="stat-card wide"><b>\u5404\u96BE\u5EA6\u6218\u7EE9</b>${difficulty}</article>`;
  }
  function setView(name) {
    document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
    $(`${name}View`).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  let data = loadData();
  let state;
  let timerId = null;
  let audioContext = null;
  const tutorial = [
    { icon: "\u{1F44F} \u{1F44F}", title: "\u5148\u62CD\u4E24\u4E0B", text: "\u73B0\u5B9E\u6E38\u620F\u91CC\uFF0C\u53CC\u65B9\u6BCF\u56DE\u5408\u5148\u62CD\u624B\u4E24\u6B21\uFF0C\u7136\u540E\u540C\u65F6\u505A\u51FA\u624B\u52BF\u3002\u7F51\u9875\u4F1A\u5E2E\u4F60\u6A21\u62DF\u8FD9\u4E2A\u8282\u594F\u3002", demo: "\u556A \xB7 \u556A \xB7 \u51FA\u62DB\uFF01" },
    { icon: "\u270A", title: "\u953B\u9020\u80FD\u91CF", text: "\u953B\u9020\u80FD\u83B7\u5F971\u683C\u80FD\u91CF\uFF0C\u4F46\u953B\u9020\u65F6\u5B8C\u5168\u6CA1\u6709\u9632\u5FA1\uFF0C\u4EFB\u4F55\u653B\u51FB\u90FD\u4F1A\u547D\u4E2D\u3002", demo: "\u953B\u9020\uFF1A0 \u6D88\u8017 \u2192 +1 \u80FD\u91CF" },
    { icon: "\u{1F52A} \u2694\uFE0F \u2726", title: "\u7B49\u7EA7\u538B\u5236", text: "\u653B\u51FB\u6D88\u8017\u51E0\u683C\u80FD\u91CF\uFF0C\u5C31\u662F\u51E0\u7EA7\u3002\u540C\u7EA7\u653B\u51FB\u76F8\u4E92\u62B5\u6D88\uFF0C\u9AD8\u7EA7\u653B\u51FB\u4F1A\u538B\u5236\u4F4E\u7EA7\u653B\u51FB\u3002", demo: "\u540C\u7EA7\u62B5\u5200 \xB7 \u9AD8\u7EA7\u538B\u5236\u4F4E\u7EA7" },
    { icon: "\u{1F6E1}\uFE0F \u{1F932} \u{1F4A8}", title: "\u4E09\u79CD\u9632\u5FA1", text: "\u9632\u63211\uFF5E2\u7EA7\uFF1B\u63A5\u63212\uFF5E3\u7EA7\uFF1B\u95EA\u6D88\u80172\u80FD\u91CF\uFF0C\u63212\uFF5E5\u7EA7\u3002\u63A5\u548C\u95EA\u6210\u529F\u540E\u53CC\u65B9\u80FD\u91CF\u5F52\u96F6\u3002", demo: "\u6BCF\u79CD\u9632\u5FA1\u90FD\u6709\u7834\u7EFD" },
    { icon: "\u25C9", title: "\u865A\u65E0\u7EC8\u7ED3", text: "\u62E5\u6709\u81F3\u5C116\u683C\u80FD\u91CF\u5373\u53EF\u4F7F\u7528\u865A\u65E0\u3002\u5B83\u65E0\u6CD5\u88AB\u4EFB\u4F55\u9632\u5FA1\u6321\u4F4F\uFF1B\u953B\u6570\u672C\u8EAB\u6CA1\u6709\u4E0A\u9650\u3002", demo: "\u51C6\u5907\u597D\u4E86\uFF0C\u5F00\u59CB\u7B2C\u4E00\u5C40\u5427\uFF01" }
  ];
  let tutorialIndex = 0;
  function newState() {
    const player = data.settings.skillsEnabled ? createFighter(data.settings.playerSkill) : { energy: 0, score: 0 };
    const ai = data.settings.skillsEnabled ? createFighter(data.settings.aiSkill) : { energy: 0, score: 0 };
    const next = {
      player,
      ai,
      endless: { wins: 0, losses: 0, streak: 0, best: 0 },
      round: 1,
      busy: false,
      history: [],
      aiMoveHistory: [],
      decisionHistory: [],
      afterReset: false,
      weaponHistory: [],
      log: [],
      roundActionCount: 0,
      duelFields: [],
      duelFieldConflict: false,
      damageLastRound: false,
      damageThisRound: false,
      preparedRound: 0,
      pendingStartEvents: []
    };
    return next;
  }
  function init() {
    state = newState();
    renderRules();
    populateSkillSelects();
    bindEvents();
    syncSettingsForm();
    applyGlobalScene();
    updateHomeStats(data.stats);
    render();
    globalThis.__hezhangAiChecks = runAiSelfChecks();
  }
  function bindEvents() {
    document.querySelectorAll('[data-action="start-game"]').forEach((button) => button.addEventListener("click", startGame));
    document.querySelectorAll('[data-action="start-tutorial"]').forEach((button) => button.addEventListener("click", openTutorial));
    $("homeButton").addEventListener("click", () => {
      stopTimer();
      setView("home");
      updateHomeStats(data.stats);
    });
    $("statsButton").addEventListener("click", () => {
      renderStats();
      $("statsDialog").showModal();
    });
    $("rulesButton").addEventListener("click", () => $("rulesDialog").showModal());
    $("settingsButton").addEventListener("click", () => $("settingsDialog").showModal());
    $("restartButton").addEventListener("click", resetGame);
    $("battleLogButton").addEventListener("click", () => {
      const log = $("battleLog");
      log.open = true;
      log.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    $("playAgainButton").addEventListener("click", () => {
      $("gameOverDialog").close();
      resetGame();
    });
    $("backHomeButton").addEventListener("click", () => {
      $("gameOverDialog").close();
      setView("home");
      updateHomeStats(data.stats);
    });
    $("shareResultButton").addEventListener("click", shareResultCard);
    $("dismissFirstHint").addEventListener("click", () => {
      data.firstTurnHintSeen = true;
      saveData(data);
      $("firstTurnHint").classList.add("hidden");
    });
    $("tutorialNext").addEventListener("click", nextTutorial);
    document.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => $(button.dataset.close).close()));
    $("settingsDialog").querySelector("form").addEventListener("submit", saveSettings);
    $("modeSelect").addEventListener("change", updateSettingsVisibility);
    $("skillToggle").addEventListener("change", updateSettingsVisibility);
    $("playerSkillSelect").addEventListener("change", updateSkillDescription);
    $("aiSkillSelect").addEventListener("change", updateSkillDescription);
    $("quickModeSelect").addEventListener("change", changeMode);
  }
  async function startGame() {
    if (data.settings.skillsEnabled && data.settings.playerSkill === data.settings.aiSkill) {
      await chooseMpOption(`\u5F53\u524D\u4FDD\u5B58\u7684\u53CC\u4EBA\u89D2\u8272\u91CD\u590D\uFF1A\u53CC\u65B9\u90FD\u662F\u201C${SKILLS[data.settings.playerSkill].name}\u201D\u3002\u540C\u4E00\u5C40\u540C\u6837\u7684\u89D2\u8272\u53EA\u80FD\u51FA\u73B0\u4E00\u6B21\u3002`, [{ value: "settings", label: "\u524D\u5F80\u8BBE\u7F6E\u91CD\u65B0\u9009\u62E9" }], { cancelText: "\u8FD4\u56DE", eyebrow: "\u89D2\u8272\u51B2\u7A81" });
      syncSettingsForm();
      $("settingsDialog").showModal();
      return;
    }
    setView("game");
    await resetGame();
    if (!data.tutorialSeen) openTutorial();
  }
  async function resetGame() {
    var _a;
    stopTimer();
    state = newState();
    if (data.settings.skillsEnabled && data.settings.playerSkill === "diviner") {
      const excluded = [data.settings.playerSkill, data.settings.aiSkill];
      const options = SOLO_SKILL_KEYS.filter((key) => !excluded.includes(key)).map((key) => ({ value: key, label: SKILLS[key].name }));
      state.player.dollSkill = await chooseMpOption("\u5360\u535C\u5BB6\uFF1A\u9009\u62E9\u521D\u59CB\u79D8\u5076", options) || ((_a = options[0]) == null ? void 0 : _a.value) || null;
    }
    if (data.settings.skillsEnabled) await initNightSolo258();
    clearScoreFeedback();
    render();
    startTimer();
  }
  const duelLogCache = /* @__PURE__ */ new WeakMap();
  function renderDuelLog() {
    const list = $("logList"), log = state.log, cache = duelLogCache.get(list);
    const added = cache ? log.length - cache.count : log.length;
    const canPrepend = cache && cache.log === log && added >= 0 && log[added] === cache.head;
    if (!canPrepend) list.innerHTML = log.map(duelLogHtml).join("");
    else if (added) list.insertAdjacentHTML("afterbegin", log.slice(0, added).map(duelLogHtml).join(""));
    duelLogCache.set(list, { log, count: log.length, head: log[0] });
  }
  function duelLogHtml(item) {
    var _a, _b;
    const skillLine = item.skills ? `<br>\u6280\u80FD\uFF1A\u4F60\u300C${escapeHtml(item.skills.player)}\u300D\xB7 AI\u300C${escapeHtml(item.skills.ai)}\u300D` : "";
    const events = ((_a = item.skillEvents) == null ? void 0 : _a.length) ? `<br>${item.skillEvents.map((text) => `<span class="skill-event">${escapeHtml(text)}</span>`).join("")}` : "";
    const trace = ((_b = item.ruleTrace) == null ? void 0 : _b.length) ? `<br><b>\u4E3A\u4EC0\u4E48\u8FD9\u6837\u7ED3\u7B97</b><ol class="rule-trace-list">${item.ruleTrace.map((step) => `<li><b>${escapeHtml(step.summary)}</b>${step.detail ? `<small>${escapeHtml(step.detail)}</small>` : ""}</li>`).join("")}</ol>` : "";
    if (item.system) return `<li><details><summary><b>\u7B2C${item.round}\u56DE\u5408</b>\u3000${escapeHtml(item.title)}</summary><p>${escapeHtml(item.detail)}${events}</p></details></li>`;
    return `<li><details><summary><b>\u7B2C${item.round}\u56DE\u5408</b>\u3000\u4F60 ${skillMove(item.player).name} \xB7 AI ${skillMove(item.ai).name}\u3000\u2014 ${escapeHtml(item.title)}</summary><p>${escapeHtml(item.detail)}${skillLine}${events}<br>\u80FD\u91CF\uFF1A\u4F60 ${item.before.playerEnergy} \u2192 ${item.after.playerEnergy}\uFF0CAI ${item.before.aiEnergy} \u2192 ${item.after.aiEnergy}${item.before.playerHp != null ? `<br>\u751F\u547D\uFF1A\u4F60 ${item.before.playerHp} \u2192 ${item.after.playerHp}\uFF0CAI ${item.before.aiHp} \u2192 ${item.after.aiHp}` : ""}${trace}</p></details></li>`;
  }
  function render() {
    renderEnergy("playerEnergy", "playerEnergyCount", state.player.energy);
    renderEnergy("aiEnergy", "aiEnergyCount", state.ai.energy);
    $("playerScore").textContent = state.player.score;
    $("aiScore").textContent = state.ai.score;
    renderSkillStatus();
    $("roundNumber").textContent = state.round;
    const names = { easy: "\u7B80\u5355", normal: "\u666E\u901A", hard: "\u56F0\u96BE", hell: "\u5730\u72F1" };
    const modeNames = { standard: "\u6807\u51C6", endless: "\u65E0\u5C3D", zen: "\u7985" };
    $("modeLabel").textContent = `${modeNames[data.settings.mode]}\u5BF9\u51B3 \xB7 ${names[data.settings.difficulty]}`;
    const continuous = data.settings.mode !== "standard";
    $("standardScore").classList.toggle("hidden", continuous);
    $("endlessScore").classList.toggle("hidden", !continuous);
    $("endlessWins").textContent = state.endless.wins;
    $("endlessLosses").textContent = state.endless.losses;
    $("endlessStreak").textContent = state.endless.streak;
    $("endlessBest").textContent = state.endless.best;
    const hideEnergy = data.settings.mode === "zen" || !data.settings.energyVisible;
    $("playerPanel").classList.toggle("energy-hidden", hideEnergy);
    $("aiPanel").classList.toggle("energy-hidden", hideEnergy);
    document.body.classList.toggle("zen-mode", data.settings.mode === "zen");
    renderMoves(
      state.player.energy,
      selectMove,
      state.busy,
      data.settings.skillsEnabled ? data.settings.playerSkill : null,
      state.player,
      data.settings.scissorsEnabled
    );
    $("logCount").textContent = state.log.length;
    renderDuelLog();
    $("firstTurnHint").classList.toggle("hidden", data.firstTurnHintSeen || state.round > 1);
  }
  async function selectMove(playerKey) {
    if (await ensureDuelRoundStarted()) return;
    if (data.settings.skillsEnabled && prepareSoloAiPreAction()) return;
    const playerCost = data.settings.skillsEnabled ? moveCost(playerKey, data.settings.playerSkill, state.player) : MOVES[playerKey].cost;
    if (state.busy || playerCost > state.player.energy || data.settings.skillsEnabled && !availableMoveKeys(data.settings.playerSkill, state.player, data.settings.scissorsEnabled).includes(playerKey)) return;
    state.roundActionCount = (state.roundActionCount || 0) + 1;
    state.busy = true;
    stopTimer();
    renderMoves(
      state.player.energy,
      selectMove,
      true,
      data.settings.skillsEnabled ? data.settings.playerSkill : null,
      state.player,
      data.settings.scissorsEnabled
    );
    let aiKey = chooseAiMove(data.settings.difficulty, createAiContext(), playerKey);
    await prepareSoloAiActive(playerKey, aiKey);
    if (data.settings.skillsEnabled) {
      if (state.ai.sunDeclare === playerKey) {
        state.roundActionCount--;
        state.busy = false;
        render();
        showToast("\u592A\u9633\u9886\u57DF\u7981\u6B62\u8BE5\u6B66\u5668\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9");
        return;
      }
      if (!legalSkillMoves(state.ai.energy, data.settings.aiSkill, state.ai, data.settings.scissorsEnabled).includes(aiKey)) aiKey = legalSkillMoves(state.ai.energy, data.settings.aiSkill, state.ai, data.settings.scissorsEnabled)[0];
    }
    revealMove("player", playerKey, true);
    revealMove("ai", aiKey, true);
    $("clash").className = "clash";
    $("clashKicker").textContent = "\u51C6\u5907";
    $("clashTitle").textContent = "\u62CD\u624B\u2014\u2014";
    $("clashDetail").textContent = "\u53CC\u65B9\u5373\u5C06\u540C\u65F6\u51FA\u62DB\u3002";
    await beat();
    await beat();
    revealMove("player", playerKey);
    revealMove("ai", aiKey);
    await DUEL_ENGINE.settleRound(playerKey, aiKey);
  }
  function createAiContext() {
    return {
      aiEnergy: state.ai.energy,
      playerEnergy: state.player.energy,
      history: state.history,
      aiMoveHistory: state.aiMoveHistory,
      decisionHistory: state.decisionHistory,
      afterReset: state.afterReset,
      aiScore: state.ai.score,
      playerScore: state.player.score,
      winScore: data.settings.winScore,
      mode: data.settings.mode,
      skillsEnabled: data.settings.skillsEnabled,
      playerSkill: data.settings.playerSkill,
      aiSkill: data.settings.aiSkill,
      playerFighter: state.player,
      aiFighter: state.ai,
      weaponHistory: state.weaponHistory,
      scissorsEnabled: data.settings.scissorsEnabled
    };
  }
  async function ensureDuelRoundStarted() {
    if (!data.settings.skillsEnabled || state.preparedRound === state.round) return false;
    state.preparedRound = state.round;
    await initNightSolo258();
    await advanceSoloRetreat258();
    state.pendingStartEvents = [...state.pendingStartEvents || [], ...await applyStartOfRoundSkills()];
    const deaths = resolveDeaths(state.pendingStartEvents);
    if (deaths.player || deaths.ai) {
      if (deaths.player && !deaths.ai) state.ai.score++;
      if (deaths.ai && !deaths.player) state.player.score++;
      state.pendingStartEvents.push(deaths.player && deaths.ai ? "\u56DE\u5408\u5F00\u59CB\u6548\u679C\u4EE4\u53CC\u65B9\u540C\u65F6\u6B7B\u4EA1\uFF0C\u672C\u6B21\u5224\u4E3A\u5E73\u5C40" : "\u56DE\u5408\u5F00\u59CB\u6548\u679C\u9020\u6210\u6B7B\u4EA1\uFF0C\u672C\u8F6E\u7ACB\u5373\u7ED3\u675F");
      state.log.unshift({ round: state.round, system: true, title: deaths.player && deaths.ai ? "\u56DE\u5408\u5F00\u59CB \xB7 \u5E73\u5C40" : "\u56DE\u5408\u5F00\u59CB \xB7 \u6280\u80FD\u7ED3\u7B97", detail: state.pendingStartEvents.join(" "), skillEvents: [...state.pendingStartEvents] });
      showScoreFeedback(deaths.ai && !deaths.player, deaths.player && !deaths.ai);
      if (data.settings.mode === "standard" && (state.player.score >= data.settings.winScore || state.ai.score >= data.settings.winScore)) {
        state.busy = false;
        render();
        setTimeout(endGame, 0);
        return true;
      }
      resetLivesAfterDeath(deaths);
      state.weaponHistory = [];
      state.roundActionCount = 0;
      state.duelFields = [];
      state.duelFieldConflict = false;
      state.damageLastRound = true;
      state.damageThisRound = false;
      state.round++;
      state.preparedRound = 0;
      state.pendingStartEvents = [];
      render();
      startTimer();
      return true;
    }
    render();
    return false;
  }
  function prepareSoloAiPreAction() {
    return false;
  }
  function beat() {
    showClap();
    playTone(150);
    if (navigator.vibrate) navigator.vibrate(35);
    return new Promise((resolve) => setTimeout(resolve, 330));
  }
  async function prepareSoloAiActive(playerKey, aiKey) {
    var _a;
    if (!data.settings.skillsEnabled) return;
    const f = state.ai, skill = data.settings.aiSkill, opening = (state.roundActionCount || 0) === 1;
    const skillDiscipline = (_a = { easy: 0.5, normal: 0.72, hard: 0.94, hell: 1 }[data.settings.difficulty]) != null ? _a : 0.72;
    const useSkill = (base = 1, urgent = false) => urgent && skillDiscipline >= 0.9 || Math.random() < base * skillDiscipline;
    if ((state.roundActionCount || 0) === 1 && !f.fieldOpenedThisRound) {
      if (fighterOwnsSoloSkill(skill, f, "singularity") && f.singularityFieldUses > 0 && useSkill(0.32, state.player.hp <= 1)) {
        f.singularityFieldUses--;
        f.fieldOpenedThisRound = true;
        if (registerSoloField("ai", "singularity")) state.pendingStartEvents.push("AI\xB7\u5947\u70B9\u9886\u57DF\uFF1A\u4F60\u672C\u56DE\u5408\u4E3B\u52A8\u4E0E\u88AB\u52A8\u6280\u80FD\u5931\u6548");
      } else if (fighterOwnsSoloSkill(skill, f, "sun") && f.sunFieldUses > 0 && useSkill(0.38)) {
        const legalAttacks = ATTACK_KEYS.filter((x) => data.settings.scissorsEnabled || x !== "scissors"), attacks = (state.history || []).map((x) => x.player).filter((x) => legalAttacks.includes(x)), declared = attacks.at(-1) || legalAttacks[Math.floor(Math.random() * legalAttacks.length)];
        f.sunFieldUses--;
        f.fieldOpenedThisRound = true;
        if (registerSoloField("ai", "sun", declared)) state.pendingStartEvents.push(`AI\xB7\u592A\u9633\u9886\u57DF\uFF1A\u5BA3\u8A00${skillMove(declared).name}`);
      }
    }
    if ((state.roundActionCount || 0) === 1 && fighterHasSoloSkill(skill, f, "tyrant", "active") && f.tyrantUses > 0 && !f.tyrantRestore && useSkill(0.5) && await soloActiveAllowed("ai")) activateTyrant258(f, state.round);
    const hasUsableActive = [["thief", f.thiefUses > 0], ["pioneer", f.pioneerUses > 0 && f.hp <= 1], ["miracle", true], ["singularity", f.singularityUses > 0], ["blackEmperor", f.shields > 1 && !f.emperorGifted], ["shepherd", f.shepherdHealUses > 0 || f.shepherdDomainUses > 0]].some(([k, ok]) => ok && fighterHasSoloSkill(skill, f, k));
    if (hasUsableActive && !await soloActiveAllowed("ai")) return;
    if (fighterHasSoloSkill(skill, f, "thief") && f.thiefUses > 0 && !f.thiefBorrowed && soloTargetAllowed("player") && !fighterHasSoloSkill(skill, f, data.settings.playerSkill) && useSkill(0.9)) beginSoloThiefBorrow("ai");
    if (opening && fighterHasSoloSkill(skill, f, "pioneer", "active") && f.pioneerUses > 0 && f.hp <= 1 && useSkill(1, true)) {
      f.pioneerUses--;
      f.pioneerActiveProtection = true;
    }
    if (fighterHasSoloSkill(skill, f, "miracle")) {
      const playerLevel = skillMove(playerKey).level || 0, aiLevel = skillMove(aiKey).level || 0;
      f.miracleDeclare = playerLevel >= aiLevel && skillMove(playerKey).type === "attack" && useSkill(1, playerLevel > aiLevel);
    }
    if (fighterHasSoloSkill(skill, f, "singularity") && soloTargetAllowed("player") && !f.singularityUsedThisRound && (state.roundActionCount || 0) === 1 && useSkill(0.82, state.player.hp <= f.attack + 1)) {
      f.singularityUsedThisRound = true;
      f.singularityAttackPenalty = 0.5;
      f.attack = Math.max(0, f.attack - 0.5);
      state.player.vulnerable = (state.player.vulnerable || 0) + 0.5;
    }
    if (opening && fighterHasSoloSkill(skill, f, "blackEmperor", "active") && f.shields > 1 && !f.emperorGifted && useSkill(0.75)) {
      const targets = [];
      if (soloTargetAllowed("player")) targets.push({ side: "player", kind: "fighter", score: state.player.shields || 0 });
      for (const side of ["player", "ai"]) {
        if (!soloTargetAllowed(side)) continue;
        const target2 = state[side];
        if (target2.dragon > 0) targets.push({ side, kind: "dragon", score: target2.dragonShields || 0 });
        if (target2.doll > 0) targets.push({ side, kind: "doll", score: target2.dollShields || 0 });
      }
      if (!targets.length) return;
      const picked = targets.sort((a, b) => a.score - b.score)[0], target = state[picked.side];
      f.shields--;
      if (picked.kind === "fighter") target.shields++;
      else if (picked.kind === "dragon") target.dragonShields = (target.dragonShields || 0) + 1;
      else target.dollShields = (target.dollShields || 0) + 1;
      f.emperorGifted = true;
    }
    if (opening && fighterHasSoloSkill(skill, f, "shepherd", "active") && f.shepherdDomainUses > 0 && f.hp <= 1.5 && useSkill(1, true)) {
      f.shepherdDomainUses--;
      f.shepherdReduction = 0.5;
    } else if (opening && fighterHasSoloSkill(skill, f, "shepherd", "active") && soloTargetAllowed("ai") && f.shepherdHealUses > 0 && f.hp < f.maxHp && useSkill(0.9, f.hp <= 1)) {
      f.shepherdHealUses--;
      gainHp258(f, 1);
      f.maxHp = Math.max(f.maxHp, f.hp);
    }
  }
  async function resolveSoloJudgeTriggers(damage, events) {
    var _a;
    if (!((_a = damage.roundEvent) == null ? void 0 : _a.reset) || !(state.damageThisRound || Object.values(damage.roundEvent.damageDealt || {}).some((x) => x > 0))) return;
    for (const who of ["player", "ai"]) {
      const other = who === "player" ? "ai" : "player", f = state[who];
      if (f.hp <= 0 || state[other].hp <= 0 || !soloHas258(who, "judge", "active") || f.judgeUses <= 0 || !soloTargetAllowed(other)) continue;
      if (!await chooseUse258(who, "\u5BA1\u5224\u8005\uFF1A\u672C\u56DE\u5408\u6709\u4F24\u5BB3\uFF0C\u662F\u5426\u53D1\u52A8\u65E0\u6280\u80FD\u5BF9\u5C40\uFF1F")) continue;
      if (!await soloActiveAllowed(who)) continue;
      f.judgeUses--;
      if (await resolveNoSkillChallenge(soloSide258(who), soloSide258(other))) await soloSkillDamage258(who, other, f.attack, events);
    }
  }
  async function settleDuelRound(playerKey, aiKey) {
    var _a;
    const before = { playerEnergy: state.player.energy, aiEnergy: state.ai.energy, playerHp: data.settings.skillsEnabled ? formatNumber(state.player.hp) : null, aiHp: data.settings.skillsEnabled ? formatNumber(state.ai.hp) : null };
    const skillEvents = [];
    const baseResult = data.settings.skillsEnabled ? resolveWithSkills(playerKey, aiKey, data.settings.playerSkill, data.settings.aiSkill, state.player, state.ai) : resolveDuelCombat(playerKey, aiKey);
    const preHit = data.settings.skillsEnabled ? resolveDuelDeclarationRules(baseResult, playerKey, aiKey) : { result: baseResult, suppressed: { player: false, ai: false }, events: [] };
    const result = preHit.result;
    skillEvents.push(...preHit.events);
    const roundReset = basicRoundShouldReset(result);
    state.pendingPlayerMove = playerKey;
    state.pendingAiMove = aiKey;
    skillEvents.push(...state.pendingStartEvents || []);
    state.pendingStartEvents = [];
    if (data.settings.skillsEnabled) {
      if (preHit.suppressed.player) skillEvents.push(...spendSuppressedWeapon("player", playerKey));
      else skillEvents.push(...spendAndGain("player", playerKey, !result.playerHit));
      if (preHit.suppressed.ai) skillEvents.push(...spendSuppressedWeapon("ai", aiKey));
      else skillEvents.push(...spendAndGain("ai", aiKey, !result.aiHit));
      if (roundReset) {
        state.player.energy = state.ai.energy = 0;
        skillEvents.push("\u53CC\u4EBA\u89C4\u5219\uFF1A\u653B\u51FB\u547D\u4E2D\u3001\u63A5\u4F4F\u6216\u95EA\u6389\u5747\u89E6\u53D1\u91CD\u5F00\uFF0C\u53CC\u65B9\u80FD\u91CF\u6E05\u96F6");
      }
    } else {
      state.player.energy = basicEnergyAfterRound(state.player.energy, playerKey, result.playerHit, roundReset);
      state.ai.energy = basicEnergyAfterRound(state.ai.energy, aiKey, result.aiHit, roundReset);
      if (playerKey === "forge" && result.playerHit) skillEvents.push("\u4F60\u953B\u9020\u65F6\u88AB\u653B\u51FB\u547D\u4E2D\uFF0C\u672A\u83B7\u5F97\u80FD\u91CF");
      if (aiKey === "forge" && result.aiHit) skillEvents.push("AI\u953B\u9020\u65F6\u88AB\u653B\u51FB\u547D\u4E2D\uFF0C\u672A\u83B7\u5F97\u80FD\u91CF");
      if ((result.playerHit || result.aiHit) && roundReset) skillEvents.push("\u65E0\u6280\u80FD\u89C4\u5219\uFF1A\u653B\u51FB\u547D\u4E2D\u540E\u7ACB\u5373\u91CD\u5F00\uFF0C\u53CC\u65B9\u80FD\u91CF\u6E05\u96F6");
    }
    for (const [who, key] of [["player", playerKey], ["ai", aiKey]]) {
      if (preHit.suppressed[who]) continue;
      if (skillMove(key).type === "attack") {
        if (!state.weaponHistory.includes(key)) state.weaponHistory.push(key);
        ((_a = state[who]).usedMovesThisRound || (_a.usedMovesThisRound = [])).push(key);
      }
    }
    const scoreBefore = { player: state.player.score, ai: state.ai.score };
    let resultClass = "draw";
    let skillDetail = "";
    let damage = null;
    if (data.settings.skillsEnabled) {
      damage = await resolveDuelDamagePipeline(result, playerKey, aiKey, preHit);
      skillEvents.push(...damage.events || []);
      resultClass = damage.player > 0 && damage.ai === 0 ? "lose" : damage.ai > 0 && damage.player === 0 ? "win" : "draw";
      skillDetail = ` \xB7 \u4F60 ${formatNumber(state.player.hp)} \u751F\u547D\uFF0CAI ${formatNumber(state.ai.hp)} \u751F\u547D`;
      skillEvents.push(...applyEndOfRoundSkills(damage, playerKey, aiKey, roundReset));
      skillEvents.push(...applySoloAdvancedSkills(damage, playerKey, aiKey, roundReset));
      await resolveSoloJudgeTriggers(damage, skillEvents);
      const deaths = resolveDeaths(skillEvents);
      if (deaths.ai && fighterHasSoloSkill(data.settings.playerSkill, state.player, "saint")) {
        state.player.shields++;
        skillEvents.push("\u4F60\xB7\u5723\u6597\u58EB\u6280\u80FD\uFF1A\u51FB\u6740\u540E\u83B7\u5F971\u62A4\u76FE");
      }
      if (deaths.player && fighterHasSoloSkill(data.settings.aiSkill, state.ai, "saint")) {
        state.ai.shields++;
        skillEvents.push("AI\xB7\u5723\u6597\u58EB\u6280\u80FD\uFF1A\u51FB\u6740\u540E\u83B7\u5F971\u62A4\u76FE");
      }
      finishSoloRoundState(deaths, damage, skillEvents, roundReset);
      if (deaths.player || deaths.ai) {
        if (deaths.player && !deaths.ai) state.ai.score++;
        if (deaths.ai && !deaths.player) state.player.score++;
        if (deaths.player && deaths.ai) resultClass = "draw";
        resetLivesAfterDeath(deaths);
      }
    } else {
      if (result.playerHit && !result.aiHit) {
        state.ai.score++;
        resultClass = "lose";
      }
      if (result.aiHit && !result.playerHit) {
        state.player.score++;
        resultClass = "win";
      }
    }
    if (data.settings.mode !== "standard") {
      const playerScored = state.player.score > scoreBefore.player;
      const aiScored = state.ai.score > scoreBefore.ai;
      if (data.settings.skillsEnabled ? playerScored : resultClass === "win") {
        state.endless.wins++;
        state.endless.streak++;
        state.endless.best = Math.max(state.endless.best, state.endless.streak);
      } else if (data.settings.skillsEnabled ? aiScored : resultClass === "lose") {
        state.endless.losses++;
        state.endless.streak = 0;
      }
    }
    showScoreFeedback(state.player.score - scoreBefore.player, state.ai.score - scoreBefore.ai);
    state.decisionHistory.push({
      move: playerKey,
      playerEnergy: Number(before.playerEnergy),
      aiEnergy: Number(before.aiEnergy),
      previousPlayer: state.history.at(-1) || null,
      previousAi: state.aiMoveHistory.at(-1) || null,
      afterReset: state.afterReset
    });
    state.history.push(playerKey);
    state.aiMoveHistory.push(aiKey);
    state.afterReset = Boolean(roundReset);
    const after = { playerEnergy: formatNumber(state.player.energy), aiEnergy: formatNumber(state.ai.energy), playerHp: data.settings.skillsEnabled ? formatNumber(state.player.hp) : null, aiHp: data.settings.skillsEnabled ? formatNumber(state.ai.hp) : null };
    state.log.unshift({ round: state.round, player: playerKey, ai: aiKey, title: result.title, detail: result.detail + skillDetail, before, after, skillEvents, ruleTrace: buildDuelExplanation(result, playerKey, aiKey, roundReset, damage), skills: data.settings.skillsEnabled ? { player: SKILLS[data.settings.playerSkill].name, ai: SKILLS[data.settings.aiSkill].name } : null });
    data.stats.moves[playerKey] = (data.stats.moves[playerKey] || 0) + 1;
    $("clash").className = `clash ${resultClass}`;
    $("clashKicker").textContent = resultClass === "win" ? "\u4F60\u8D62\u4E0B\u8FD9\u56DE\u5408" : resultClass === "lose" ? "AI \u8D62\u4E0B\u8FD9\u56DE\u5408" : "\u672C\u56DE\u5408\u5E73\u5C40";
    $("clashTitle").textContent = result.title;
    $("clashDetail").textContent = result.detail + skillDetail;
    if (result.playerHit || result.aiHit) {
      playTone(resultClass === "win" ? 520 : 95, 0.18);
      if (navigator.vibrate) navigator.vibrate(resultClass === "win" ? [40, 30, 70] : 120);
    }
    if (roundReset) {
      state.damageLastRound = state.damageThisRound;
      state.damageThisRound = false;
      state.weaponHistory = [];
      state.roundActionCount = 0;
      state.duelFields = [];
      state.duelFieldConflict = false;
      state.round++;
    }
    state.busy = false;
    render();
    if (data.settings.mode === "standard" && (state.player.score >= data.settings.winScore || state.ai.score >= data.settings.winScore)) setTimeout(endGame, 550);
    else startTimer();
  }
  function buildDuelExplanation(result, playerKey, aiKey, roundReset, damage) {
    var _a;
    const playerMove = skillMove(playerKey), aiMove = skillMove(aiKey), trace = [
      { code: "DUEL_REVEAL", summary: `\u540C\u65F6\u63ED\u62DB\uFF1A\u4F60\u4F7F\u7528${playerMove.name}\uFF0CAI\u4F7F\u7528${aiMove.name}`, detail: `\u4F60\u7684\u884C\u52A8\u7C7B\u578B\u4E3A${playerMove.type === "attack" ? `${playerMove.level}\u7EA7\u653B\u51FB` : "\u57FA\u7840\u884C\u52A8"}\uFF1BAI\u4E3A${aiMove.type === "attack" ? `${aiMove.level}\u7EA7\u653B\u51FB` : "\u57FA\u7840\u884C\u52A8"}` },
      { code: "DUEL_BASE_RESULT", summary: result.title, detail: result.detail }
    ];
    if (result.playerHit || result.aiHit) trace.push({ code: "DUEL_HIT", summary: `\u653B\u51FB\u547D\u4E2D${result.playerHit && result.aiHit ? "\u53CC\u65B9" : result.playerHit ? "\u4F60" : "AI"}`, detail: "\u653B\u51FB\u547D\u4E2D\u4E0E\u5B9E\u9645\u6389\u8840\u5206\u5F00\u8BB0\u5F55\uFF1B\u62A4\u76FE\u3001\u79D8\u5076\u6216\u6280\u80FD\u53EF\u4EE5\u628A\u6700\u7EC8\u4F24\u5BB3\u964D\u4E3A0" });
    if ((_a = damage == null ? void 0 : damage.ruleTrace) == null ? void 0 : _a.length) trace.push(...damage.ruleTrace);
    if (damage) trace.push({ code: "DUEL_DAMAGE", summary: `\u6700\u7EC8\u4F24\u5BB3\uFF1A\u4F60${formatNumber(damage.player)}\uFF0CAI${formatNumber(damage.ai)}`, detail: "\u4F24\u5BB3\u5DF2\u4F9D\u6B21\u7ECF\u8FC7\u6539\u5199\u3001\u731C\u62F3\u3001\u9632\u4F24\u3001\u51CF\u4F24\u548C\u627F\u4F24\u7269\u5904\u7406" });
    trace.push({ code: roundReset ? "DUEL_RESET" : "DUEL_CONTINUE", summary: roundReset ? "\u672C\u6B21\u51FA\u624B\u89E6\u53D1\u91CD\u5F00" : "\u672C\u6B21\u51FA\u624B\u7EE7\u7EED\u5F53\u524D\u80FD\u91CF\u8FDB\u7A0B", detail: roundReset ? "\u53CC\u65B9\u80FD\u91CF\u6E05\u96F6" : "\u6309\u7167\u884C\u52A8\u82B1\u8D39\u3001\u953B\u9020\u6210\u529F\u4E0E\u6280\u80FD\u8FD4\u8FD8\u66F4\u65B0\u80FD\u91CF" });
    return trace;
  }
  function populateSkillSelects() {
    const options = SOLO_SKILL_KEYS.map((key) => `<option value="${key}">${SKILLS[key].name} \xB7 ${SKILLS[key].hp}\u8840 / ${SKILLS[key].attack}\u653B</option>`).join("");
    $("playerSkillSelect").innerHTML = options;
    $("aiSkillSelect").innerHTML = options;
  }
  function updateSkillDescription() {
    var _a;
    if (!((_a = $("skillToggle")) == null ? void 0 : _a.checked)) return;
    const player = SKILLS[$("playerSkillSelect").value];
    const ai = SKILLS[$("aiSkillSelect").value];
    $("skillDescription").innerHTML = `<b>\u4F60 \xB7 ${player.name}</b>\uFF1A${player.description}<br><b>AI \xB7 ${ai.name}</b>\uFF1A${ai.description}`;
  }
  function renderSkillStatus() {
    const enabled = data.settings.skillsEnabled;
    for (const who of ["player", "ai"]) {
      const skillKey = who === "player" ? data.settings.playerSkill : data.settings.aiSkill;
      const skill = SKILLS[skillKey];
      $(`${who}SkillBadge`).classList.toggle("hidden", !enabled);
      $(`${who}HealthRow`).classList.toggle("hidden", !enabled);
      if (!enabled) continue;
      $(`${who}SkillBadge`).textContent = `${skill.name} \xB7 ${formatNumber(state[who].attack)}\u653B`;
      $(`${who}HealthCount`).textContent = formatNumber(state[who].hp);
      $(`${who}HealthBar`).style.width = `${Math.max(0, Math.min(100, state[who].hp / state[who].maxHp * 100))}%`;
    }
  }
  async function applyStartOfRoundSkills() {
    const events = [];
    for (const who of ["player", "ai"]) {
      const f = state[who];
      if (state.round > 1 && !f.skipped && mpDiesFromInactivity(f)) {
        f.hp = 0;
        f.attackLethal = false;
        events.push("\u56DE\u5408\u5F00\u59CB\u524D\uFF1A\u4F4E\u4E8E1\u8840\u4E14\u4E0A\u4E00\u56DE\u5408\u672A\u9020\u6210\u6216\u53D7\u5230\u4F24\u5BB3\uFF0C\u76F4\u63A5\u6B7B\u4EA1");
      }
      f.dealtDamageLastRound = false;
      f.tookDamageLastRound = false;
    }
    for (const who of ["player", "ai"]) {
      const skill = who === "player" ? data.settings.playerSkill : data.settings.aiSkill;
      if (state[who].hp > 0 && fighterHasSoloSkill(skill, state[who], "mother", "active") && state.damageLastRound) {
        let target = who;
        if (who === "player") {
          const options = ["player", "ai"].filter(soloTargetAllowed).map((side) => ({ value: side, label: `\u4EE4${side === "player" ? "\u81EA\u5DF1" : "AI"}\u6062\u590D0.5\u751F\u547D` }));
          options.push({ value: "skip", label: "\u672C\u56DE\u5408\u4E0D\u53D1\u52A8" });
          target = await chooseMpOption("\u6BCD\u4EB2\u6280\u80FD\uFF1A\u4EE4\u8C01\u6062\u590D0.5\u751F\u547D\uFF1F", options) || "skip";
        } else {
          target = soloTargetAllowed("ai") && state.ai.hp < state.ai.maxHp ? "ai" : "skip";
        }
        if (target === "skip" || !await soloActiveAllowed(who)) continue;
        gainHp258(state[target], 0.5);
        state[target].maxHp = Math.max(state[target].maxHp, state[target].hp);
        events.push(`${who === "player" ? "\u4F60" : "AI"}\xB7\u6BCD\u4EB2\u6280\u80FD\uFF1A\u4EE4${target === "player" ? "\u4F60" : "AI"}\u56DE\u590D0.5\u751F\u547D`);
      }
      if (fighterHasSoloSkill(skill, state[who], "audience") && state[who].audienceRetreat) {
        state[who].audienceRetreat = false;
        const other = who === "player" ? "ai" : "player";
        if (!soloTargetAllowed(other)) {
          events.push(`${who === "player" ? "\u4F60" : "AI"}\xB7\u89C2\u4F17\u6280\u80FD\uFF1A\u5148\u9A71\u4E0D\u80FD\u6210\u4E3A\u201C\u4E0D\u53C2\u4E0E\u5408\u638C\u201D\u7684\u6307\u5B9A\u76EE\u6807\uFF0C\u672C\u6B21\u6CA1\u6709\u5408\u6CD5\u76EE\u6807`);
          continue;
        }
        state[other].hp -= 1;
        events.push(`${who === "player" ? "\u4F60" : "AI"}\xB7\u89C2\u4F17\u6280\u80FD\uFF1A\u4EE4${other === "player" ? "\u4F60" : "AI"}\u4E0D\u53C2\u4E0E\u672C\u6B21\u53CC\u4EBA\u5408\u638C\uFF1B\u573A\u4E0A\u6CA1\u6709\u654C\u65B9\u53C2\u4E0E\uFF0C\u56E0\u6B64\u5BF9\u5176\u9020\u62101\u70B9\u771F\u5B9E\u4F24\u5BB3`);
      }
    }
    return events;
  }
  function createDuelRoundEvent(result, playerKey, aiKey, preHit = null) {
    var _a, _b;
    return {
      phase: "attack-played",
      moves: { player: playerKey, ai: aiKey },
      attackPlayed: {
        player: skillMove(playerKey).type === "attack" && !((_a = preHit == null ? void 0 : preHit.suppressed) == null ? void 0 : _a.player),
        ai: skillMove(aiKey).type === "attack" && !((_b = preHit == null ? void 0 : preHit.suppressed) == null ? void 0 : _b.ai)
      },
      hit: { player: Boolean(result.playerHit), ai: Boolean(result.aiHit) },
      rawDamage: { player: 0, ai: 0 },
      finalDamage: { player: 0, ai: 0 },
      secondaryDamage: { player: 0, ai: 0 },
      damageDealt: { player: 0, ai: 0 },
      prevented: { player: [], ai: [] },
      absorbedBy: { player: null, ai: null },
      reset: basicRoundShouldReset(result)
    };
  }
  function resolveDuelDeclarationRules(baseResult, playerKey, aiKey) {
    const result = { ...baseResult }, suppressed = { player: false, ai: false }, events = [];
    const ps = data.settings.playerSkill, as = data.settings.aiSkill;
    const apply = (who, ownKey, otherKey) => {
      const other = who === "player" ? "ai" : "player", f = state[who], skill = who === "player" ? ps : as;
      if (!fighterHasSoloSkill(skill, f, "miracle") || !f.miracleDeclare) return;
      const own = skillMove(ownKey), opponent = skillMove(otherKey), ownLevel = own.level || 0, otherLevel = opponent.level || 0;
      if (who === "player") result.aiHit = false;
      else result.playerHit = false;
      result.reset = false;
      if (opponent.type === "attack" && otherLevel < ownLevel) {
        if (who === "player") result.playerHit = false;
        else result.aiHit = false;
      }
      if (opponent.type === "attack" && otherLevel === ownLevel) {
        suppressed[other] = true;
        if (who === "player") result.playerHit = false;
        else result.aiHit = false;
      }
      f.miracleDeclare = false;
      events.push(`${who === "player" ? "\u4F60" : "AI"}\xB7\u5947\u8FF9\u6280\u80FD\uFF1A\u6B66\u5668\u5BA3\u8A00\u5728\u547D\u4E2D\u5224\u5B9A\u524D\u751F\u6548`);
    };
    apply("player", playerKey, aiKey);
    apply("ai", aiKey, playerKey);
    if (events.length) {
      result.title = "\u6B66\u5668\u5BA3\u8A00";
      result.detail = `${baseResult.detail} \u5BA3\u8A00\u5DF2\u5148\u4E8E\u547D\u4E2D\u4E0E\u4F24\u5BB3\u7ED3\u7B97\u3002`;
    }
    return { result, suppressed, events };
  }
  async function resolveDuelDamagePipeline(result, playerKey, aiKey, preHit = null) {
    var _a, _b;
    const roundEvent = createDuelRoundEvent(result, playerKey, aiKey, preHit);
    const damage = previewSkillDamage(
      result,
      playerKey,
      aiKey,
      data.settings.playerSkill,
      data.settings.aiSkill,
      state.player,
      state.ai
    );
    roundEvent.rawDamage = { player: damage.player, ai: damage.ai };
    const events = [];
    const ps = data.settings.playerSkill, as = data.settings.aiSkill;
    const finalAttacker = { player: "ai", ai: "player" };
    roundEvent.phase = "on-hit";
    const duelTrace = { phase: "hit-confirmed", events, ruleTrace: [] };
    if (roundEvent.hit.player) {
      const payload = await SkillTiming.dispatch("duel", "before-monster", { context: duelTrace, victim: "player", attacker: "ai", attackKey: aiKey, damage: damage.player, events });
      damage.player = payload.damage;
      finalAttacker.player = payload.attacker;
    }
    if (roundEvent.hit.ai) {
      const payload = await SkillTiming.dispatch("duel", "before-monster", { context: duelTrace, victim: "ai", attacker: "player", attackKey: playerKey, damage: damage.ai, events });
      damage.ai = payload.damage;
      finalAttacker.ai = payload.attacker;
    }
    for (const target of ["player", "ai"]) if (roundEvent.hit[target]) damage[target] += await assassin258(finalAttacker[target], target === "player" ? aiKey : playerKey, events, false);
    for (const target of ["player", "ai"]) if (roundEvent.hit[target]) {
      const source = finalAttacker[target];
      if (soloHas258(source, "observer")) damage[target] *= state[source].observerStance === "rage" ? 2 : 0.5;
      if (soloHas258(target, "observer")) damage[target] *= state[target].observerStance === "rage" ? 2 : 0.5;
    }
    damage.player += damage.player > 0 ? state.player.vulnerable || 0 : 0;
    damage.ai += damage.ai > 0 ? state.ai.vulnerable || 0 : 0;
    if (roundEvent.hit.player) {
      const prevented = await applyDuelMonsterChecks("player", finalAttacker.player, events);
      if (prevented) {
        damage.player = 0;
        roundEvent.prevented.player.push("monster");
      }
    }
    if (roundEvent.hit.ai) {
      const prevented = await applyDuelMonsterChecks("ai", finalAttacker.ai, events);
      if (prevented) {
        damage.ai = 0;
        roundEvent.prevented.ai.push("monster");
      }
    }
    if (roundEvent.hit.player && damage.player > 0) {
      const payload = await SkillTiming.dispatch("duel", "after-monster", { context: duelTrace, victim: "player", attacker: finalAttacker.player, damage: damage.player, events });
      damage.player = payload.damage;
    }
    if (roundEvent.hit.ai && damage.ai > 0) {
      const payload = await SkillTiming.dispatch("duel", "after-monster", { context: duelTrace, victim: "ai", attacker: finalAttacker.ai, damage: damage.ai, events });
      damage.ai = payload.damage;
    }
    for (const target of ["player", "ai"]) if (roundEvent.hit[target]) await hitSkills258(finalAttacker[target], target, target === "player" ? aiKey : playerKey, events, false);
    roundEvent.phase = "before-damage";
    if (damage.player > 0 && state.player.shepherdReduction) {
      damage.player = Math.max(0, damage.player - state.player.shepherdReduction);
      events.push("\u4F60\xB7\u7267\u7F8A\u4EBA\u9886\u57DF\uFF1A\u53D7\u5230\u7684\u4F24\u5BB3-0.5");
    }
    if (damage.ai > 0 && state.ai.shepherdReduction) {
      damage.ai = Math.max(0, damage.ai - state.ai.shepherdReduction);
      events.push("AI\xB7\u7267\u7F8A\u4EBA\u9886\u57DF\uFF1A\u53D7\u5230\u7684\u4F24\u5BB3-0.5");
    }
    damage.player = applySoloPioneerProtection("player", damage.player, events, roundEvent);
    damage.ai = applySoloPioneerProtection("ai", damage.ai, events, roundEvent);
    for (const who of ["player", "ai"]) {
      const source = finalAttacker[who];
      if (damage[who] > 0) damage[who] += state[source].saintBonus || 0;
      const key = who === "player" ? aiKey : playerKey, defense = who === "player" ? playerKey : aiKey;
      const truth = soloHas258(source, "sun") || key === "katana" && defense === "guard" && soloHas258(source, "warrior");
      damage[who] = await asceticPreventSolo258(who, damage[who], events, truth);
    }
    const playerSourceSkill = finalAttacker.player === "player" ? ps : as, aiSourceSkill = finalAttacker.ai === "player" ? ps : as;
    const playerAbsorb = absorbDuelDamage("player", damage.player, fighterHasSoloSkill(playerSourceSkill, state[finalAttacker.player], "sun") || aiKey === "katana" && playerKey === "guard" && fighterHasSoloSkill(playerSourceSkill, state[finalAttacker.player], "warrior"), events);
    const aiAbsorb = absorbDuelDamage("ai", damage.ai, fighterHasSoloSkill(aiSourceSkill, state[finalAttacker.ai], "sun") || playerKey === "katana" && aiKey === "guard" && fighterHasSoloSkill(aiSourceSkill, state[finalAttacker.ai], "warrior"), events);
    damage.player = playerAbsorb.damage;
    damage.ai = aiAbsorb.damage;
    roundEvent.absorbedBy.player = playerAbsorb.absorbedBy;
    roundEvent.absorbedBy.ai = aiAbsorb.absorbedBy;
    for (const [targetSide, key, hit] of [["player", aiKey, result.playerHit], ["ai", playerKey, result.aiHit]]) {
      const source = finalAttacker[targetSide], sourceSkill = source === "player" ? ps : as;
    }
    state.player.hp -= damage.player;
    state.ai.hp -= damage.ai;
    for (const who of ["player", "ai"]) {
      if (state[who].hp <= 0) state[who].attackLethal = Boolean(roundEvent.hit[who]);
      const absorb = who === "player" ? playerAbsorb : aiAbsorb;
      if (absorb.dealt > 0) state[finalAttacker[who]].saintBonus = 0;
      await saintSolo258(who, events);
    }
    roundEvent.phase = "damage-dealt";
    roundEvent.finalDamage = { player: damage.player, ai: damage.ai };
    roundEvent.secondaryDamage = {
      player: state.player.saintDamageTaken ? 0.5 : 0,
      ai: state.ai.saintDamageTaken ? 0.5 : 0
    };
    roundEvent.damageDealt = {
      player: ((_a = playerAbsorb.dealt) != null ? _a : damage.player) + roundEvent.secondaryDamage.player + (state.player.pioneerDamageTaken ? 1 : 0),
      ai: ((_b = aiAbsorb.dealt) != null ? _b : damage.ai) + roundEvent.secondaryDamage.ai + (state.ai.pioneerDamageTaken ? 1 : 0)
    };
    roundEvent.damageSources = { player: finalAttacker.player, ai: finalAttacker.ai };
    roundEvent.damageBySource = { player: 0, ai: 0 };
    for (const targetSide of ["player", "ai"]) roundEvent.damageBySource[finalAttacker[targetSide]] += roundEvent.damageDealt[targetSide] || 0;
    for (const [targetSide, key, hit] of [["player", aiKey, result.playerHit], ["ai", playerKey, result.aiHit]]) {
      if (!hit || key !== "dragonFang") continue;
      const source = finalAttacker[targetSide], sourceSkill = source === "player" ? ps : as;
      if (fighterHasSoloSkill(sourceSkill, state[source], "dragonKnight") && state[source].dragon <= 0) {
        state[source].dragon = 1;
        state[source].dragonShields = 0;
        events.push(`${source === "player" ? "\u4F60" : "AI"}\xB7\u9F99\u9A91\u58EB\u6280\u80FD\uFF1A\u7ECF\u6700\u7EC8\u653B\u51FB\u8005\u5224\u5B9A\uFF0C\u9F99\u7259\u547D\u4E2D\u5E76\u91CD\u65B0\u83B7\u5F97\u9F99`);
      }
    }
    roundEvent.phase = "damage-complete";
    await resolveSoloAudience258(roundEvent, playerKey, aiKey, events);
    damage.events = events;
    damage.roundEvent = roundEvent;
    damage.ruleTrace = duelTrace.ruleTrace;
    return damage;
  }
  async function resolveSoloMagicianDamage(victimWho, attackerWho, attackKey, baseDamage, events) {
    let damage = Math.max(0, baseDamage);
    while (true) {
      const ready = shuffleMp(["player", "ai"].filter((who) => fighterHasSoloSkill(who === "player" ? data.settings.playerSkill : data.settings.aiSkill, state[who], "magician") && (state[who].magicianUses || 0) > 0));
      if (!ready.length) break;
      let changed = false;
      for (const magicianWho of ready) {
        const magician = state[magicianWho], selectable = ["player", "ai"].filter((who) => !fighterHasSoloSkill(who === "player" ? data.settings.playerSkill : data.settings.aiSkill, state[who], "pioneer"));
        let replacement = null;
        if (magicianWho === "player") {
          const value = await chooseMpOption(`\u9B54\u672F\u5E08\uFF1A${attackerWho === "player" ? "\u4F60" : "AI"}\u7684\u653B\u51FB\u5C06\u547D\u4E2D${victimWho === "player" ? "\u4F60" : "AI"}\uFF0C\u662F\u5426\u6539\u5199\uFF1F`, [{ value: "skip", label: "\u4E0D\u53D1\u52A8" }, ...selectable.map((who) => ({ value: who, label: `\u6539\u7528${who === "player" ? "\u4F60" : "AI"}\u7684\u653B\u51FB\u503C ${formatNumber(state[who].attack)}` }))]);
          if (value && value !== "skip") replacement = value;
        } else if (Math.random() < 0.45) replacement = selectable.sort((a, b) => state[b].attack - state[a].attack)[0] || null;
        if (!replacement) continue;
        if (!await soloActiveAllowed(magicianWho)) continue;
        magician.magicianUses--;
        attackerWho = replacement;
        damage = Math.max(0, state[replacement].attack);
        const replacementSkill = replacement === "player" ? data.settings.playerSkill : data.settings.aiSkill;
        changed = true;
        events.push(`${magicianWho === "player" ? "\u4F60" : "AI"}\xB7\u9B54\u672F\u5E08\u6280\u80FD\uFF1A\u6539\u5199\u672C\u5200\uFF0C\u57FA\u7840\u4F24\u5BB3\u53D8\u4E3A${formatNumber(damage)}`);
        break;
      }
      if (!changed) break;
    }
    return { damage, attacker: attackerWho };
  }
  async function resolveSoloHangedBoost(attackerWho, damage, events) {
    const attacker = state[attackerWho], skill = attackerWho === "player" ? data.settings.playerSkill : data.settings.aiSkill;
    if (!fighterHasSoloSkill(skill, attacker, "hangedMan", "active") || attacker.hp <= 0) return damage;
    let amount = 0;
    if (attackerWho === "player") {
      const values = [{ value: "0", label: "\u4E0D\u53D1\u52A8" }];
      for (let n = 0.5; n <= attacker.hp; n += 0.5) values.push({ value: String(n), label: `\u6263\u9664${formatNumber(n)}\u8840\uFF0C\u4F24\u5BB3+${formatNumber(n)}${n === attacker.hp ? "\uFF08\u5C06\u6B7B\u4EA1\uFF09" : ""}` });
      amount = Number(await chooseMpOption("\u5012\u540A\u4EBA\uFF1A\u653B\u51FB\u5DF2\u547D\u4E2D\uFF0C\u9009\u62E9\u6263\u8840\u589E\u4F24", values, { cancelText: "\u4E0D\u53D1\u52A8" }) || 0);
    } else if (Math.random() < 0.55) amount = Math.min(attacker.hp, attacker.hp <= 1 ? attacker.hp : 0.5);
    amount = Math.max(0, Math.min(attacker.hp, amount));
    if (amount > 0 && await soloActiveAllowed(attackerWho)) {
      const paid = commitHangedSacrifice(attacker, amount, attackerWho === "player" ? "\u4F60" : "AI", events);
      damage += paid;
      if (attackerWho === "player") render();
    }
    return damage;
  }
  SkillTiming.register({ id: "duel-magician-rewrite", mode: "duel", phase: "before-monster", priority: 100, label: "\u9B54\u672F\u5E08\u6539\u5199", when: (payload) => ["player", "ai"].some((who) => fighterHasSoloSkill(who === "player" ? data.settings.playerSkill : data.settings.aiSkill, state[who], "magician") && (state[who].magicianUses || 0) > 0), run: async (payload) => {
    const rewritten = await resolveSoloMagicianDamage(payload.victim, payload.attacker, payload.attackKey, payload.damage, payload.events);
    payload.damage = rewritten.damage;
    payload.attacker = rewritten.attacker;
  } });
  SkillTiming.register({ id: "duel-hanged-boost", mode: "duel", phase: "after-monster", priority: 300, label: "\u5012\u540A\u4EBA\u547D\u4E2D\u589E\u4F24", when: (payload) => fighterHasSoloSkill(payload.attacker === "player" ? data.settings.playerSkill : data.settings.aiSkill, state[payload.attacker], "hangedMan", "active"), run: async (payload) => {
    payload.damage = await resolveSoloHangedBoost(payload.attacker, payload.damage, payload.events);
  } });
  async function chooseSoloRpsGesture(who, title) {
    var _a;
    const prepared = (_a = state[who]) == null ? void 0 : _a.monsterGesture;
    if (prepared) {
      state[who].monsterGesture = null;
      return prepared;
    }
    if (who === "ai") return randomRpsGesture();
    const value = await chooseMpOption(title, ["\u77F3\u5934", "\u526A\u5200", "\u5E03"].map((x) => ({ value: x, label: x })), { cancelText: "\u5FC5\u987B\u9009\u62E9\u4E00\u4E2A\u624B\u52BF" });
    return value || await chooseSoloRpsGesture(who, title);
  }
  function randomRpsGesture() {
    var _a;
    const gestures = ["\u77F3\u5934", "\u526A\u5200", "\u5E03"];
    if ((_a = globalThis.crypto) == null ? void 0 : _a.getRandomValues) {
      const values = new Uint32Array(1);
      crypto.getRandomValues(values);
      return gestures[Math.floor(values[0] / 4294967296 * gestures.length)];
    }
    return gestures[Math.floor(Math.random() * gestures.length)];
  }
  async function resolveSoloMonsterDuel(victim, attacker, owner, events) {
    if (soloHas258(victim, "shadow") || soloHas258(attacker, "shadow")) {
      events.push("\u6697\u5F71\uFF1A\u731C\u62F3\u89C6\u4E3A\u80DC\u5229");
      return { prevented: soloHas258(victim, "shadow") };
    }
    while (true) {
      const mine = await chooseSoloRpsGesture(victim, `\u602A\u517D\u6280\u80FD\uFF1A${victim === "player" ? "\u4F60" : "AI"}\u4F5C\u4E3A\u53D7\u51FB\u8005\u9009\u62E9\u624B\u52BF`);
      const theirs = await chooseSoloRpsGesture(attacker, `\u602A\u517D\u6280\u80FD\uFF1A${attacker === "player" ? "\u4F60" : "AI"}\u4F5C\u4E3A\u653B\u51FB\u8005\u9009\u62E9\u624B\u52BF`);
      const ownerLabel = owner === "both" ? "\u53CC\u65B9" : owner === "player" ? "\u4F60" : "AI";
      events.push(`${ownerLabel}\xB7\u602A\u517D\u6280\u80FD\u89E6\u53D1\uFF1A\u53D7\u51FB\u8005\u51FA${mine}\uFF0C\u653B\u51FB\u8005\u51FA${theirs}`);
      if (mine === theirs) {
        events.push("\u602A\u517D\u731C\u62F3\u5E73\u5C40\uFF0C\u91CD\u65B0\u731C\u62F3");
        await showMonsterRpsResult(`${victim === "player" ? "\u4F60" : "AI"} ${mine} \xB7 ${attacker === "player" ? "\u4F60" : "AI"} ${theirs}`, "\u5E73\u5C40\uFF0C\u53CC\u65B9\u91CD\u65B0\u51FA\u624B");
        continue;
      }
      const prevented = mine === "\u77F3\u5934" && theirs === "\u526A\u5200" || mine === "\u526A\u5200" && theirs === "\u5E03" || mine === "\u5E03" && theirs === "\u77F3\u5934";
      events.push(prevented ? `${victim === "player" ? "\u4F60" : "AI"}\u4F5C\u4E3A\u53D7\u51FB\u8005\u731C\u62F3\u83B7\u80DC\uFF0C\u9632\u6B62\u4F24\u5BB3` : `${attacker === "player" ? "\u4F60" : "AI"}\u4F5C\u4E3A\u653B\u51FB\u8005\u731C\u62F3\u83B7\u80DC\uFF0C\u4F24\u5BB3\u7EE7\u7EED`);
      await showMonsterRpsResult(`${victim === "player" ? "\u4F60" : "AI"} ${mine} \xB7 ${attacker === "player" ? "\u4F60" : "AI"} ${theirs}`, prevented ? "\u53D7\u51FB\u8005\u83B7\u80DC\uFF0C\u672C\u6B21\u4F24\u5BB3\u88AB\u9632\u6B62" : "\u653B\u51FB\u8005\u83B7\u80DC\uFF0C\u672C\u6B21\u4F24\u5BB3\u7EE7\u7EED");
      return { mine, theirs, prevented };
    }
  }
  async function applyDuelMonsterChecks(victim, attacker, events) {
    const playerMonster = fighterHasSoloSkill(data.settings.playerSkill, state.player, "monster");
    const aiMonster = fighterHasSoloSkill(data.settings.aiSkill, state.ai, "monster");
    if (!playerMonster && !aiMonster) return false;
    const owners = [...playerMonster ? ["player"] : [], ...aiMonster ? ["ai"] : []];
    let prevented = false;
    for (const owner of owners) {
      const duel = await resolveSoloMonsterDuel(victim, attacker, owner, events);
      prevented = prevented || duel.prevented;
    }
    return prevented;
  }
  async function showMonsterRpsResult(hands, result) {
    await chooseMpOption(`\u602A\u517D\u731C\u62F3\uFF1A${hands}`, [{ value: "continue", label: result }], { cancelText: "\u7EE7\u7EED" });
  }
  function absorbDuelDamage(who, damage, trueDamage, events) {
    const f = state[who], label = who === "player" ? "\u4F60" : "AI";
    if (damage <= 0) {
      events.push(`${label}\u53D7\u52300\u4F24\u5BB3\uFF0C\u4E0D\u6D88\u8017\u4EFB\u4F55\u62A4\u76FE`);
      return { damage: 0, dealt: 0, absorbedBy: null };
    }
    if (trueDamage) return { damage, dealt: damage, absorbedBy: null };
    let absorbedBy = null, dealt = 0;
    const order = [.../* @__PURE__ */ new Set([...f.damageOrder || ["dragon", "doll"], "dragon", "doll"])];
    for (const kind of order) {
      if (damage <= 0) break;
      const hpKey = kind === "dragon" ? "dragon" : "doll", shieldKey = kind === "dragon" ? "dragonShields" : "dollShields", entityLabel = kind === "dragon" ? "\u9F99" : "\u79D8\u5076";
      if ((f[hpKey] || 0) <= 0) continue;
      if ((f[shieldKey] || 0) > 0) {
        f[shieldKey]--;
        events.push(`${label}\u7684${entityLabel}\u5931\u53BB1\u62A4\u76FE\u5E76\u6321\u4F4F\u672C\u6B21\u5269\u4F59\u4F24\u5BB3`);
        return { damage: 0, dealt, absorbedBy: `${kind}-shield` };
      }
      const absorbed = Math.min(f[hpKey], damage);
      f[hpKey] -= absorbed;
      damage -= absorbed;
      dealt += absorbed;
      absorbedBy = kind;
      events.push(`${label}\u7684${entityLabel}\u627F\u53D7${formatNumber(absorbed)}\u70B9\u4F24\u5BB3`);
      if (f[hpKey] <= 0) {
        f[hpKey] = 0;
        f[shieldKey] = 0;
        if (kind === "doll") f.dollSkill = null;
        events.push(`${label}\u7684${entityLabel}${kind === "dragon" ? "\u88AB\u51FB\u7834" : "\u7834\u788E"}`);
      }
    }
    if (damage > 0 && f.shields > 0) {
      f.shields--;
      events.push(`${label}\u5931\u53BB1\u62A4\u76FE`);
      const who2 = label === "AI" ? "ai" : "player", other = who2 === "player" ? "ai" : "player";
      const skill = who2 === "ai" ? data.settings.aiSkill : data.settings.playerSkill;
      if (fighterHasSoloSkill(skill, f, "saint", "active")) f.saintPending = (f.saintPending || 0) + 1;
      return { damage: 0, dealt, absorbedBy: "shield" };
    }
    return { damage, dealt: dealt + damage, absorbedBy };
  }
  function applySoloPioneerProtection(who, damage, events, roundEvent = null) {
    var _a, _b, _c, _d;
    if (damage <= 0) return damage;
    const f = state[who], skill = who === "player" ? data.settings.playerSkill : data.settings.aiSkill, label = who === "player" ? "\u4F60" : "AI";
    if (f.pioneerActiveProtection) {
      (_b = (_a = roundEvent == null ? void 0 : roundEvent.prevented) == null ? void 0 : _a[who]) == null ? void 0 : _b.push("pioneer-active");
      events.push(`${label}\xB7\u5148\u9A71\u4E3B\u52A8\u6280\u80FD\uFF1A\u9632\u6B62\u672C\u56DE\u5408\u7684\u672C\u6B21\u4F24\u5BB3`);
      return 0;
    }
    if (fighterHasSoloSkill(skill, f, "pioneer")) {
      f.hp -= 1;
      f.pioneerDamageTaken = true;
      (_d = (_c = roundEvent == null ? void 0 : roundEvent.prevented) == null ? void 0 : _c[who]) == null ? void 0 : _d.push("pioneer-passive");
      events.push(`${label}\xB7\u5148\u9A71\u88AB\u52A8\u6280\u80FD\uFF1A\u9632\u6B62\u539F\u4F24\u5BB3\u5E76\u5931\u53BB1\u8840\uFF1B\u8FD91\u8840\u8BA1\u4E3A\u53D7\u5230\u4F24\u5BB3`);
      return 0;
    }
    return damage;
  }
  function soloDamageDealtBy(damage, who) {
    var _a, _b, _c, _d;
    const roundEvent = damage.roundEvent;
    if (roundEvent == null ? void 0 : roundEvent.damageBySource) return roundEvent.damageBySource[who] || 0;
    if (!(roundEvent == null ? void 0 : roundEvent.damageSources)) return who === "player" ? (_b = (_a = roundEvent == null ? void 0 : roundEvent.damageDealt) == null ? void 0 : _a.ai) != null ? _b : damage.ai : (_d = (_c = roundEvent == null ? void 0 : roundEvent.damageDealt) == null ? void 0 : _c.player) != null ? _d : damage.player;
    return ["player", "ai"].reduce((sum, target) => sum + (roundEvent.damageSources[target] === who ? roundEvent.damageDealt[target] || 0 : 0), 0);
  }
  function applySoloAdvancedSkills(damage, playerKey, aiKey, roundReset = false) {
    var _a, _b, _c, _d, _e, _f;
    const events = [];
    const pairs = [
      { who: "player", other: "ai", skill: data.settings.playerSkill, dealt: soloDamageDealtBy(damage, "player"), targetDamage: (_c = (_b = (_a = damage.roundEvent) == null ? void 0 : _a.damageDealt) == null ? void 0 : _b.ai) != null ? _c : damage.ai },
      { who: "ai", other: "player", skill: data.settings.aiSkill, dealt: soloDamageDealtBy(damage, "ai"), targetDamage: (_f = (_e = (_d = damage.roundEvent) == null ? void 0 : _d.damageDealt) == null ? void 0 : _e.player) != null ? _f : damage.player }
    ];
    for (const item of pairs) {
      const f = state[item.who], victim = state[item.other], label = item.who === "player" ? "\u4F60" : "AI";
      const didDeal = item.dealt > 0 || f.saintDamageDealt;
      if (fighterHasSoloSkill(item.skill, f, "nightmare") && f.nightmareTarget) {
        const targetDamaged = item.targetDamage > 0 || (item.other === "player" ? state.player.saintDamageTaken || state.player.pioneerDamageTaken : state.ai.saintDamageTaken || state.ai.pioneerDamageTaken);
        if (targetDamaged) {
          f.nightmareClock--;
          events.push(`${label}\xB7\u68A6\u9B47\u6280\u80FD\uFF1A\u6807\u8BB0\u8005\u53D7\u5230\u4F24\u5BB3\uFF0C\u671F\u9650\u7F29\u77ED1\u56DE\u5408`);
        }
        if (roundReset) {
          f.nightmareClock--;
          events.push(`${label}\xB7\u68A6\u9B47\u6280\u80FD\uFF1A\u56DE\u5408\u7ED3\u675F\uFF0C\u5269\u4F59${Math.max(0, f.nightmareClock)}\u56DE\u5408`);
        }
        if (f.nightmareClock <= 0 && victim.hp > 0) {
          victim.attackLethal = false;
          victim.hp = 0;
          const base = item.other === "player" ? data.settings.playerSkill : data.settings.aiSkill;
          if (base && !fighterHasSoloSkill(item.skill, f, base)) f.extraSkills.push(base);
          events.push(`${label}\xB7\u68A6\u9B47\u6280\u80FD\uFF1A\u5012\u8BA1\u65F6\u7ED3\u675F\uFF0C\u5BF9\u624B\u76F4\u63A5\u6B7B\u4EA1\u5E76\u88AB\u593A\u53D6\u6280\u80FD`);
        }
      }
    }
    return events;
  }
  function applyEndOfRoundSkills(damage, playerKey, aiKey, roundReset = false) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    const events = [];
    const roundEvent = damage.roundEvent;
    const pairs = [
      { who: "player", other: "ai", skill: data.settings.playerSkill, dealt: soloDamageDealtBy(damage, "player"), targetDamage: (_c = (_b = (_a = damage.roundEvent) == null ? void 0 : _a.damageDealt) == null ? void 0 : _b.ai) != null ? _c : damage.ai, taken: (_f = (_e = (_d = damage.roundEvent) == null ? void 0 : _d.damageDealt) == null ? void 0 : _e.player) != null ? _f : damage.player, move: playerKey },
      { who: "ai", other: "player", skill: data.settings.aiSkill, dealt: soloDamageDealtBy(damage, "ai"), targetDamage: (_i = (_h = (_g = damage.roundEvent) == null ? void 0 : _g.damageDealt) == null ? void 0 : _h.player) != null ? _i : damage.player, taken: (_l = (_k = (_j = damage.roundEvent) == null ? void 0 : _j.damageDealt) == null ? void 0 : _k.ai) != null ? _l : damage.ai, move: aiKey }
    ];
    for (const item of pairs) {
      const fighter = state[item.who];
      const actor = item.who === "player" ? "\u4F60" : "AI";
      const dealtEvent = item.dealt > 0 || fighter.saintDamageDealt;
      const takenEvent = item.taken > 0 || fighter.saintDamageTaken || fighter.pioneerDamageTaken;
      const victim = state[item.other];
      if (fighterHasSoloSkill(item.skill, fighter, "secretKeeper") && (item.targetDamage > 0 || victim.saintDamageTaken || victim.pioneerDamageTaken)) {
        gainHp258(fighter, 1);
        fighter.maxHp = Math.max(fighter.maxHp, fighter.hp);
        events.push(`${actor}\xB7\u7AA5\u79D8\u4EBA\u6280\u80FD\uFF1A\u7AA5\u79D8\u76EE\u6807\u53D7\u4F24\uFF0C\u751F\u547D+1`);
      }
      const opponentMove = item.who === "player" ? aiKey : playerKey;
      const defenderHit = item.who === "player" ? roundEvent == null ? void 0 : roundEvent.hit.player : roundEvent == null ? void 0 : roundEvent.hit.ai;
      const attackerHit = item.who === "player" ? roundEvent == null ? void 0 : roundEvent.hit.ai : roundEvent == null ? void 0 : roundEvent.hit.player;
      if (fighterHasSoloSkill(item.skill, fighter, "prisoner") && item.move === "flash" && (roundEvent == null ? void 0 : roundEvent.reset) && !defenderHit && skillMove(opponentMove).type === "attack") {
        fighter.flashSuccesses++;
        if (fighter.flashSuccesses % 2 === 0) {
          fighter.attackDiscount++;
          events.push(`${actor}\xB7\u56DA\u5F92\u6280\u80FD\uFF1A\u653B\u51FB\u8D39\u7528\u964D\u4F4E`);
        }
      }
      if (fighterHasSoloSkill(item.skill, fighter, "storm") && item.move === "katana" && !attackerHit) {
        fighter.stormDiscount = 1;
        events.push(`${actor}\xB7\u98CE\u66B4\u6280\u80FD\uFF1A\u98CE\u66B4\u4E4B\u5203\u672A\u547D\u4E2D\uFF0C\u4E0B\u6B21\u4F7F\u7528\u51CF\u8D39`);
      }
      if (roundReset && fighterHasSoloSkill(item.skill, fighter, "demon")) {
        fighter.attack += 0.5;
        events.push(`${actor}\xB7\u6076\u9B54\u6280\u80FD\uFF1A\u56DE\u5408\u7ED3\u675F\uFF0C\u653B\u51FB\u63D0\u53470.5`);
      }
      fighter.dealtDamageLastRound = fighter.dealtDamageLastRound || dealtEvent;
      fighter.tookDamageLastRound = fighter.tookDamageLastRound || takenEvent;
    }
    return events;
  }
  function hangedRecoveryForDeaths(holderId, deadIds) {
    return 0.5 * deadIds.filter((id) => id !== holderId).length;
  }
  function resolveDeaths(events = []) {
    const dead = /* @__PURE__ */ new Set();
    while (true) {
      for (const who of ["player", "ai"]) if (state[who].hp <= 0 && !state[who].attackLethal && soloHas258(who, "shadow")) {
        state[who].hp = 1;
        events.push("\u6697\u5F71\uFF1A\u975E\u653B\u51FB\u547D\u4E2D\u5BFC\u81F4\u7684\u6B7B\u4EA1\u88AB\u66FF\u6362\u4E3A1\u8840");
      }
      const batch = ["player", "ai"].filter((who) => !dead.has(who) && state[who].hp <= 0);
      if (!batch.length) break;
      batch.forEach((who) => dead.add(who));
      for (const who of batch) {
        const other = who === "player" ? "ai" : "player", fighter = state[who];
        const skill = who === "player" ? data.settings.playerSkill : data.settings.aiSkill;
        if (fighterHasSoloSkill(skill, fighter, "hunter") && !fighter.hunterTriggered) {
          fighter.hunterTriggered = true;
          if (!soloTargetAllowed(other)) events.push(`${who === "player" ? "\u4F60" : "AI"}\xB7\u730E\u4EBA\u6280\u80FD\uFF1A\u5148\u9A71\u4E0D\u80FD\u6210\u4E3A\u6307\u5B9A\u76EE\u6807\uFF0C\u6B7B\u4EA1\u4F24\u5BB3\u6CA1\u6709\u5408\u6CD5\u76EE\u6807`);
          else {
            state[other].hp -= 1;
            events.push(`${who === "player" ? "\u4F60" : "AI"}\xB7\u730E\u4EBA\u6280\u80FD\uFF1A\u6B7B\u4EA1\u65F6\u5BF9${other === "player" ? "\u4F60" : "AI"}\u9020\u62101\u70B9\u771F\u5B9E\u4F24\u5BB3`);
          }
        }
      }
      for (const holder of ["player", "ai"]) {
        if (dead.has(holder)) continue;
        const fighter = state[holder], skill = holder === "player" ? data.settings.playerSkill : data.settings.aiSkill;
        const gain = hangedRecoveryForDeaths(holder, batch);
        if (gain && fighterHasSoloSkill(skill, fighter, "hangedMan")) {
          const before = fighter.hp;
          gainHp258(fighter, gain);
          fighter.maxHp = Math.max(fighter.maxHp, fighter.hp);
          events.push(`${holder === "player" ? "\u4F60" : "AI"}\xB7\u5012\u540A\u4EBA\u3010\u4EA1\u8005\u56DE\u751F\u3011\uFF1A${formatNumber(gain / 0.5)}\u540D\u5176\u4ED6\u89D2\u8272\u6B7B\u4EA1\uFF0C\u6062\u590D${formatNumber(gain)}\u751F\u547D\uFF08${formatNumber(before)}\u2192${formatNumber(fighter.hp)}\uFF09`);
        }
      }
    }
    return { player: dead.has("player"), ai: dead.has("ai") };
  }
  function finishSoloRoundState(deaths, damage, events, roundReset = false) {
    state.damageThisRound = state.damageThisRound || Boolean(damage.player > 0 || damage.ai > 0 || state.player.saintDamageTaken || state.ai.saintDamageTaken || state.player.pioneerDamageTaken || state.ai.pioneerDamageTaken);
    for (const who of ["player", "ai"]) {
      const other = who === "player" ? "ai" : "player", f = state[who], victim = state[other];
      if (f.thiefBorrowed && (roundReset || deaths[other])) {
        const stolen = f.thiefBorrowed.skills || [];
        if (deaths[other]) {
          for (const skill of stolen) if (!f.extraSkills.includes(skill)) f.extraSkills.push(skill);
          events.push(`${who === "player" ? "\u4F60" : "AI"}\xB7\u76D7\u8D3C\u6280\u80FD\uFF1A\u76EE\u6807\u5728\u76D7\u53D6\u56DE\u5408\u6B7B\u4EA1\uFF0C\u6C38\u4E45\u83B7\u5F97\u5176\u5269\u4F59\u6280\u80FD`);
        }
        f.temporarySkills = (f.temporarySkills || []).filter((x) => !stolen.includes(x));
        victim.temporaryDisabledSkills = (victim.temporaryDisabledSkills || []).filter((x) => !stolen.includes(x));
        f.thiefBorrowed = null;
      }
      if (roundReset) {
        restoreTyrant258(f, state.round, events);
        if (f.singularityAttackPenalty) {
          f.attack += f.singularityAttackPenalty;
          f.singularityAttackPenalty = 0;
        }
        f.singularityUsedThisRound = false;
        f.vulnerable = 0;
        f.pioneerActiveProtection = false;
        f.bigShieldUsed = false;
        f.emperorGifted = false;
        f.shepherdReduction = 0;
        f.observerCatch = false;
        f.roundSkillLock = false;
        f.fieldOpenedThisRound = false;
        f.sunDeclare = null;
        f.usedMovesThisRound = [];
      }
      f.saintDamageDealt = false;
      f.saintDamageTaken = false;
      f.pioneerDamageTaken = false;
    }
  }
  function resetLivesAfterDeath(deaths) {
    if (!deaths.player && !deaths.ai) return;
    const scores = { player: state.player.score, ai: state.ai.score };
    state.player = createFighter(data.settings.playerSkill);
    state.ai = createFighter(data.settings.aiSkill);
    state.player.score = scores.player;
    state.ai.score = scores.ai;
  }
  function formatNumber(value) {
    return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
  }
  function showScoreFeedback(playerPoint, aiPoint) {
    if (!playerPoint && !aiPoint) return;
    const feedback = $("scoreFeedback");
    const playerPanel = $("playerPanel");
    const aiPanel = $("aiPanel");
    clearTimeout(showScoreFeedback.timeout);
    feedback.className = `score-feedback show ${playerPoint ? "win" : aiPoint ? "lose" : ""}`;
    feedback.textContent = playerPoint ? "\u4F60\u62FF\u4E0B\u4E00\u5206\u3002\u4FDD\u6301\u8FD9\u4E2A\u8282\u594F\u3002" : aiPoint ? "\u5BF9\u624B\u62FF\u4E0B\u4E00\u5206\u3002\u4E0B\u4E00\u56DE\u5408\u8FD8\u6709\u673A\u4F1A\u3002" : "\u53CC\u65B9\u540C\u65F6\u5012\u4E0B\uFF0C\u672C\u56DE\u5408\u4E0D\u8BA1\u5206\u3002";
    playerPanel.classList.toggle("point-won", Boolean(playerPoint));
    playerPanel.classList.toggle("point-lost", Boolean(aiPoint));
    aiPanel.classList.toggle("point-won", Boolean(aiPoint));
    aiPanel.classList.toggle("point-lost", Boolean(playerPoint));
    showScoreFeedback.timeout = setTimeout(clearScoreFeedback, 2400);
  }
  function clearScoreFeedback() {
    var _a, _b;
    const feedback = $("scoreFeedback");
    if (!feedback) return;
    feedback.className = "score-feedback";
    feedback.textContent = "";
    (_a = $("playerPanel")) == null ? void 0 : _a.classList.remove("point-won", "point-lost");
    (_b = $("aiPanel")) == null ? void 0 : _b.classList.remove("point-won", "point-lost");
  }
  function spendAndGain(who, moveKey, allowForgeGain = true) {
    const events = [];
    const move = skillMove(moveKey);
    const skill = who === "player" ? data.settings.playerSkill : data.settings.aiSkill;
    const cost = data.settings.skillsEnabled ? moveCost(moveKey, skill, state[who]) : move.cost;
    state[who].energy = Math.max(0, state[who].energy - cost);
    const generalistBoost = Boolean(move.gain && data.settings.skillsEnabled && fighterHasSoloSkill(skill, state[who], "generalist") && state[who].lastMove === "forge");
    if (move.gain && allowForgeGain) {
      const gain = generalistBoost ? 2 : move.gain;
      state[who].energy += gain;
      if (gain > move.gain) events.push(`${who === "player" ? "\u4F60" : "AI"}\xB7\u901A\u8BC6\u8005\u6280\u80FD\uFF1A\u672C\u6B21\u953B\u9020\u83B7\u5F972\u953B`);
    }
    if (move.gain && !allowForgeGain) events.push(`${who === "player" ? "\u4F60" : "AI"}\u953B\u9020\u65F6\u88AB\u653B\u51FB\u547D\u4E2D\uFF0C\u672A\u83B7\u5F97\u80FD\u91CF`);
    if (generalistBoost) {
      state[who].boostForge = false;
      if (!allowForgeGain) events.push(`${who === "player" ? "\u4F60" : "AI"}\xB7\u901A\u8BC6\u8005\u6280\u80FD\uFF1A\u9996\u6B21\u953B\u9020\u5F3A\u5316\u5DF2\u4F7F\u7528\uFF0C\u4F46\u56E0\u653B\u51FB\u547D\u4E2D\u672A\u83B7\u5F97\u953B`);
    }
    if (data.settings.skillsEnabled && fighterHasSoloSkill(skill, state[who], "whiteTower") && whiteTowerRefunds(moveKey, state.weaponHistory)) {
      state[who].energy += cost;
      events.push(`${who === "player" ? "\u4F60" : "AI"}\xB7\u767D\u5854\u6280\u80FD\uFF1A\u8FD4\u8FD8${formatNumber(cost)}\u80FD\u91CF`);
    }
    if (data.settings.skillsEnabled && fighterHasSoloSkill(skill, state[who], "guardian")) {
      if (moveKey === "guard") {
        state[who].energy += 0.25;
        events.push(`${who === "player" ? "\u4F60" : "AI"}\xB7\u5B88\u536B\u8005\u6280\u80FD\uFF1A\u9632\u8FD4\u8FD80.25\u80FD\u91CF`);
      }
      if (moveKey === "catch") {
        state[who].energy += 0.25;
        events.push(`${who === "player" ? "\u4F60" : "AI"}\xB7\u5B88\u536B\u8005\u6280\u80FD\uFF1A\u63A5\u8FD4\u8FD80.25\u80FD\u91CF`);
      }
    }
    if (data.settings.skillsEnabled && fighterHasSoloSkill(skill, state[who], "storm") && moveKey === "katana") state[who].stormDiscount = 0;
    if (data.settings.skillsEnabled && fighterHasSoloSkill(skill, state[who], "observer") && moveKey === "catch") {
      state[who].energy += 1;
      state[who].observerStance = "rage";
      events.push(`${who === "player" ? "\u4F60" : "AI"}\xB7\u89C2\u8005\u6280\u80FD\uFF1A\u4F7F\u7528\u63A5\u83B7\u5F971\u953B\u5E76\u8FDB\u5165\u66B4\u6012`);
    }
    if (data.settings.skillsEnabled && fighterHasSoloSkill(skill, state[who], "dragonKnight") && moveKey === "catch") state[who].dragonCatch++;
    if (data.settings.skillsEnabled && moveKey === "exit" && fighterHasSoloSkill(skill, state[who], "audience")) {
      state[who].audienceUses = Math.max(0, (state[who].audienceUses || 0) - 1);
      state[who].audienceRetreat = true;
      events.push(`${who === "player" ? "\u4F60" : "AI"}\xB7\u89C2\u4F17\u6280\u80FD\uFF1A\u82B1\u8D392\u953B\u9000\u573A\uFF1B\u82E5\u5B58\u6D3B\uFF0C\u4E0B\u56DE\u5408\u5F00\u59CB\u5904\u7406\u201C\u4E0D\u53C2\u4E0E\u5408\u638C\u201D`);
    }
    state[who].lastMove = moveKey;
    if (moveKey === "bigShield") state[who].bigShieldUsed = true;
    return events;
  }
  function endGame() {
    var _a;
    stopTimer();
    const won = state.player.score > state.ai.score;
    data.stats.games++;
    if (won) {
      data.stats.wins++;
      data.stats.currentStreak++;
      data.stats.bestStreak = Math.max(data.stats.bestStreak, data.stats.currentStreak);
    } else {
      data.stats.losses++;
      data.stats.currentStreak = 0;
    }
    const difficulty = data.settings.difficulty;
    (_a = data.stats.byDifficulty)[difficulty] || (_a[difficulty] = { games: 0, wins: 0 });
    data.stats.byDifficulty[difficulty].games++;
    if (won) data.stats.byDifficulty[difficulty].wins++;
    saveData(data);
    $("resultSeal").textContent = won ? "\u80DC" : "\u8D25";
    $("gameOverTitle").textContent = won ? "\u6F02\u4EAE\uFF01" : "\u518D\u6765\u4E00\u6B21";
    $("gameOverText").textContent = `${state.player.score} : ${state.ai.score} \xB7 ${won ? `\u5F53\u524D ${data.stats.currentStreak} \u8FDE\u80DC` : "AI \u6293\u4F4F\u4E86\u4F60\u7684\u8282\u594F"}`;
    $("gameOverDialog").showModal();
  }
  async function shareResultCard() {
    var _a, _b;
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1600;
    canvas.setAttribute("type", "2d");
    canvas.style.position = "fixed";
    canvas.style.left = "-2000px";
    document.body.appendChild(canvas);
    await canvas.$$prepare();
    const ctx = canvas.getContext("2d");
    const won = state.player.score > state.ai.score;
    ctx.fillStyle = "#f3eddf";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#d73e2d";
    ctx.fillRect(0, 0, 26, canvas.height);
    ctx.fillStyle = "#171412";
    ctx.font = "bold 84px serif";
    ctx.fillText("\u5408\u638C \xB7 \u5BF9\u5C40\u6218\u62A5", 80, 125);
    const mode = { standard: "\u6807\u51C6", endless: "\u65E0\u5C3D", zen: "\u7985" }[data.settings.mode];
    const level = { easy: "\u7B80\u5355", normal: "\u666E\u901A", hard: "\u56F0\u96BE", hell: "\u5730\u72F1" }[data.settings.difficulty];
    ctx.fillStyle = "#746b60";
    ctx.font = "30px sans-serif";
    ctx.fillText(`${mode}\u6A21\u5F0F \xB7 ${level}\u96BE\u5EA6 \xB7 ${state.round - 1}\u56DE\u5408`, 85, 180);
    ctx.fillStyle = won ? "#d73e2d" : "#324f67";
    ctx.font = "bold 164px Georgia";
    ctx.fillText(`${state.player.score} : ${state.ai.score}`, 80, 365);
    ctx.fillStyle = "#171412";
    ctx.font = "bold 46px serif";
    ctx.fillText(won ? "\u672C\u5C40\u83B7\u80DC" : "\u672C\u5C40\u60DC\u8D25", 82, 430);
    if (data.settings.skillsEnabled) {
      ctx.fillStyle = "#fffdf7";
      ctx.fillRect(80, 475, 1040, 105);
      ctx.fillStyle = "#171412";
      ctx.font = "bold 31px sans-serif";
      ctx.fillText(`\u4F60\uFF1A${SKILLS[data.settings.playerSkill].name}`, 110, 520);
      ctx.fillText(`AI\uFF1A${SKILLS[data.settings.aiSkill].name}`, 620, 520);
      ctx.fillStyle = "#746b60";
      ctx.font = "24px sans-serif";
      ctx.fillText(`${SKILLS[data.settings.playerSkill].hp}\u8840 / ${SKILLS[data.settings.playerSkill].attack}\u653B`, 110, 557);
      ctx.fillText(`${SKILLS[data.settings.aiSkill].hp}\u8840 / ${SKILLS[data.settings.aiSkill].attack}\u653B`, 620, 557);
    }
    ctx.fillStyle = "#171412";
    ctx.font = "bold 38px serif";
    ctx.fillText("\u56DE\u5408\u590D\u76D8", 80, 650);
    const rounds = state.log.slice(0, 7).reverse();
    let y = 710;
    for (const item of rounds) {
      if (item.system) {
        ctx.fillStyle = "#fffdf7";
        ctx.fillRect(80, y - 35, 1040, 90);
        ctx.fillStyle = "#171412";
        ctx.font = "bold 27px sans-serif";
        ctx.fillText(`\u7B2C${item.round}\u56DE\u5408  \u7CFB\u7EDF\u7ED3\u7B97`, 105, y);
        ctx.fillStyle = "#746b60";
        ctx.font = "22px sans-serif";
        ctx.fillText(`${item.title}\u3000${item.detail || ""}`.slice(0, 72), 105, y + 35);
        y += 97;
        continue;
      }
      ctx.fillStyle = "#fffdf7";
      ctx.fillRect(80, y - 35, 1040, ((_a = item.skillEvents) == null ? void 0 : _a.length) ? 105 : 76);
      ctx.fillStyle = "#171412";
      ctx.font = "bold 27px sans-serif";
      ctx.fillText(`\u7B2C${item.round}\u56DE\u5408  \u4F60\xB7${skillMove(item.player).name}  /  AI\xB7${skillMove(item.ai).name}`, 105, y);
      ctx.fillStyle = "#746b60";
      ctx.font = "22px sans-serif";
      ctx.fillText(`${item.title}\u3000\u80FD\u91CF ${item.before.playerEnergy}\u2192${item.after.playerEnergy} / ${item.before.aiEnergy}\u2192${item.after.aiEnergy}`, 105, y + 35);
      if ((_b = item.skillEvents) == null ? void 0 : _b.length) {
        ctx.fillStyle = "#8e211b";
        ctx.font = "bold 21px sans-serif";
        ctx.fillText(item.skillEvents.join("\uFF1B").slice(0, 58), 105, y + 68);
        y += 112;
      } else y += 83;
    }
    if (state.log.length > rounds.length) {
      ctx.fillStyle = "#746b60";
      ctx.font = "22px sans-serif";
      ctx.fillText(`\u4EC5\u5C55\u793A\u6700\u8FD1 ${rounds.length} \u56DE\u5408\uFF0C\u5B8C\u6574\u8BB0\u5F55\u8BF7\u5728\u6E38\u620F\u5185\u67E5\u770B\u3002`, 85, y + 5);
    }
    const eventCount = state.log.reduce((sum, item) => {
      var _a2;
      return sum + (((_a2 = item.skillEvents) == null ? void 0 : _a2.length) || 0);
    }, 0);
    ctx.fillStyle = "#171412";
    ctx.font = "bold 30px sans-serif";
    ctx.fillText(`\u6280\u80FD\u89E6\u53D1 ${eventCount} \u6B21\u3000\xB7\u3000\u5E38\u7528\u62DB\u5F0F ${topMoveName()}`, 80, 1530);
    await window.__saveWechatCard(canvas);
  }
  function topMoveName() {
    var _a;
    const counts = {};
    state.log.forEach((item) => {
      if (item.player && skillMove(item.player)) counts[item.player] = (counts[item.player] || 0) + 1;
    });
    const key = (_a = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]) == null ? void 0 : _a[0];
    return key ? skillMove(key).name : "\u2014";
  }
  function startTimer() {
    stopTimer();
    if (!data.settings.timerEnabled || state.busy) return;
    const track = $("timerTrack");
    const bar2 = $("timerBar");
    track.classList.remove("hidden");
    let remaining = data.settings.timerSeconds * 10;
    bar2.style.width = "100%";
    timerId = setInterval(() => {
      remaining--;
      bar2.style.width = `${Math.max(0, remaining / (data.settings.timerSeconds * 10) * 100)}%`;
      if (remaining <= 0) {
        stopTimer();
        showToast("\u65F6\u95F4\u5230\uFF0C\u81EA\u52A8\u9009\u62E9\u201C\u9632\u201D");
        selectMove("guard");
      }
    }, 100);
  }
  function stopTimer() {
    var _a;
    clearInterval(timerId);
    timerId = null;
    (_a = $("timerTrack")) == null ? void 0 : _a.classList.add("hidden");
  }
  function openTutorial() {
    tutorialIndex = 0;
    renderTutorial();
    $("tutorialDialog").showModal();
  }
  function nextTutorial() {
    if (tutorialIndex < tutorial.length - 1) {
      tutorialIndex++;
      renderTutorial();
      return;
    }
    data.tutorialSeen = true;
    saveData(data);
    $("tutorialDialog").close();
    if ($("homeView").classList.contains("active")) startGame();
  }
  function renderTutorial() {
    const step = tutorial[tutorialIndex];
    $("tutorialStep").innerHTML = `<div class="tutorial-icon">${step.icon}</div><p class="eyebrow">${tutorialIndex + 1} / ${tutorial.length}</p><h2>${step.title}</h2><p>${step.text}</p><div class="tutorial-demo">${step.demo}</div>`;
    $("tutorialDots").innerHTML = tutorial.map((_, index) => `<i class="${index === tutorialIndex ? "active" : ""}"></i>`).join("");
    $("tutorialNext").textContent = tutorialIndex === tutorial.length - 1 ? "\u5F00\u59CB\u7EC3\u4E60" : "\u4E0B\u4E00\u6B65";
  }
  function syncSettingsForm() {
    $("quickModeSelect").value = data.settings.mode;
    $("modeSelect").value = data.settings.mode;
    $("difficultySelect").value = data.settings.difficulty;
    $("winScoreSelect").value = String(data.settings.winScore);
    $("timerToggle").checked = data.settings.timerEnabled;
    $("timerSeconds").value = data.settings.timerSeconds;
    $("energyToggle").checked = data.settings.energyVisible;
    $("skillToggle").checked = data.settings.skillsEnabled;
    $("playerSkillSelect").value = data.settings.playerSkill;
    $("aiSkillSelect").value = data.settings.aiSkill;
    $("scissorsToggle").checked = data.settings.scissorsEnabled;
    $("soundToggle").checked = data.settings.sound;
    const scene = document.querySelector(`input[name="globalScene"][value="${data.settings.scene || data.settings.mpScene || "paper"}"]`);
    if (scene) scene.checked = true;
    updateSettingsVisibility();
  }
  async function saveSettings(event) {
    var _a;
    event.preventDefault();
    const nextSettings = {
      mode: $("modeSelect").value,
      difficulty: $("difficultySelect").value,
      winScore: Number($("winScoreSelect").value),
      timerEnabled: $("timerToggle").checked,
      timerSeconds: Math.min(15, Math.max(0.5, Number.isFinite(Number($("timerSeconds").value)) ? Number($("timerSeconds").value) : 15)),
      energyVisible: $("energyToggle").checked,
      skillsEnabled: $("skillToggle").checked,
      playerSkill: $("playerSkillSelect").value,
      aiSkill: $("aiSkillSelect").value,
      scissorsEnabled: $("scissorsToggle").checked,
      sound: $("soundToggle").checked,
      scene: ((_a = document.querySelector('input[name="globalScene"]:checked')) == null ? void 0 : _a.value) || "paper"
    };
    if (nextSettings.skillsEnabled && nextSettings.playerSkill === nextSettings.aiSkill) {
      await chooseMpOption(`\u53CC\u4EBA\u5BF9\u6218\u4E2D\u540C\u4E00\u89D2\u8272\u53EA\u80FD\u51FA\u73B0\u4E00\u6B21\uFF1B\u4F60\u548CAI\u90FD\u9009\u62E9\u4E86\u201C${SKILLS[nextSettings.playerSkill].name}\u201D\u3002\u8BF7\u91CD\u65B0\u9009\u62E9\u5176\u4E2D\u4E00\u65B9\u3002`, [{ value: "back", label: "\u8FD4\u56DE\u91CD\u65B0\u9009\u62E9" }], { cancelText: "\u8FD4\u56DE\u8BBE\u7F6E", eyebrow: "\u8BBE\u7F6E\u6821\u9A8C" });
      return;
    }
    data.settings = nextSettings;
    $("quickModeSelect").value = data.settings.mode;
    saveData(data);
    applyGlobalScene();
    $("settingsDialog").close();
    showToast("\u8BBE\u7F6E\u5DF2\u4FDD\u5B58");
    if ($("gameView").classList.contains("active")) resetGame();
  }
  function applyGlobalScene() {
    const scene = data.settings.scene || data.settings.mpScene || "paper";
    document.body.classList.remove("scene-paper", "scene-corridor", "scene-playground");
    document.body.classList.add(`scene-${scene}`);
  }
  function updateSettingsVisibility() {
    const mode = $("modeSelect").value;
    $("winScoreSetting").classList.toggle("hidden", mode !== "standard");
    $("energySetting").classList.toggle("hidden", mode === "zen");
    const skillsOn = $("skillToggle").checked;
    $("playerSkillSetting").classList.toggle("hidden", !skillsOn);
    $("aiSkillSetting").classList.toggle("hidden", !skillsOn);
    $("skillDescription").classList.toggle("hidden", !skillsOn);
    updateSkillDescription();
  }
  function changeMode() {
    data.settings.mode = $("quickModeSelect").value;
    saveData(data);
    syncSettingsForm();
    if ($("gameView").classList.contains("active")) resetGame();
    else render();
    showToast(`\u5DF2\u5207\u6362\u5230${{ standard: "\u6807\u51C6", endless: "\u65E0\u5C3D", zen: "\u7985" }[data.settings.mode]}\u6A21\u5F0F`);
  }
  function playTone(frequency, duration = 0.08) {
    if (!data.settings.sound) return;
    try {
      audioContext || (audioContext = new AudioContext());
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.frequency.value = frequency;
      oscillator.type = "triangle";
      gain.gain.setValueAtTime(0.08, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(1e-3, audioContext.currentTime + duration);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
    }
  }
  let mpState = null;
  const MP_TEAM_NAMES = ["\u9752\u961F", "\u8D64\u961F", "\u91D1\u961F", "\u7384\u961F", "\u767D\u961F", "\u7D2B\u961F"];
  const MP_ACTIVE_LIMITS = { judge: 3, thief: 2, audience: 3, night: 1, sun: 2, pioneer: 2, bulwark: 2, aurora: 1, magician: 2, singularity: Infinity, shepherd: 1 };
  function initMultiplayerFeature() {
    $("multiplayerButton").addEventListener("click", openMpSetup);
    $("mpExitButton").addEventListener("click", () => {
      if (mpState == null ? void 0 : mpState.autoTimer) clearTimeout(mpState.autoTimer);
      mpState = null;
      setView("home");
    });
    $("mpTeamCount").addEventListener("change", updateMpAiSkillSelectors);
    $("mpTeamSize").addEventListener("change", updateMpAiSkillSelectors);
    $("mpPlayerSkill").addEventListener("change", updateMpSkillDescription);
    $("mpSetupForm").addEventListener("submit", startMultiplayer);
    $("mpPlayAgainButton").addEventListener("click", () => {
      $("mpGameOverDialog").close();
      openMpSetup();
    });
    $("mpBackHomeButton").addEventListener("click", () => {
      $("mpGameOverDialog").close();
      mpState = null;
      setView("home");
    });
    $("mpShareResultButton").addEventListener("click", shareMpResultCard);
    $("mpSpectatorPause").addEventListener("click", () => {
      if (!mpState) return;
      mpState.spectator.paused = !mpState.spectator.paused;
      $("mpSpectatorPause").textContent = mpState.spectator.paused ? "\u7EE7\u7EED" : "\u6682\u505C";
      if (!mpState.spectator.paused) scheduleMpAutoPlay();
    });
    $("mpSpectatorStep").addEventListener("click", () => scheduleMpAutoPlay(true));
    $("mpSpectatorSpeed").addEventListener("click", () => {
      if (!mpState) return;
      mpState.spectator.speed = mpState.spectator.speed === 1 ? 2 : mpState.spectator.speed === 2 ? 4 : 1;
      $("mpSpectatorSpeed").textContent = `${mpState.spectator.speed}\xD7`;
    });
    $("mpSpectatorSkip").addEventListener("click", () => {
      if (!mpState) return;
      mpState.spectator.skip = true;
      mpState.spectator.paused = false;
      scheduleMpAutoPlay(true);
    });
    $("mpPlayerSkill").innerHTML = `<option value="random">\u968F\u673A</option><option value="none">\u65E0\u6280\u80FD \xB7 2\u8840/1\u653B</option>` + SKILL_KEYS.map((key) => `<option value="${key}">${SKILLS[key].name} \xB7 ${SKILLS[key].hp}\u8840/${SKILLS[key].attack}\u653B</option>`).join("");
    updateMpAiSkillSelectors();
    updateMpSkillDescription();
  }
  function openMpSetup() {
    updateMpAiSkillSelectors();
    updateMpSkillDescription();
    $("multiplayerSetupDialog").showModal();
  }
  function updateMpAiSkillSelectors() {
    const teamCount = Number($("mpTeamCount").value), teamSize = Number($("mpTeamSize").value), total = teamCount * teamSize;
    const old = [...document.querySelectorAll("[data-mp-ai-skill]")].map((x) => x.value);
    const options = `<option value="random">\u968F\u673A\u6280\u80FD</option><option value="none">\u65E0\u6280\u80FD</option>` + SKILL_KEYS.map((key) => `<option value="${key}">${SKILLS[key].name}</option>`).join("");
    $("mpAiSkillSelectors").innerHTML = Array.from({ length: Math.max(0, total - 1) }, (_, i) => {
      const id = i + 1, team = Math.floor(id / teamSize), slot = id % teamSize + 1;
      return `<label>${MP_TEAM_NAMES[team] || `\u9635\u8425${team + 1}`} \xB7 ${team === 0 ? `\u961F\u53CB${slot - 1}` : `AI ${slot}`}<select data-mp-ai-skill="${id}">${options}</select></label>`;
    }).join("");
    document.querySelectorAll("[data-mp-ai-skill]").forEach((x, i) => {
      if (old[i] && [...x.options].some((o) => o.value === old[i])) x.value = old[i];
    });
  }
  function updateMpSkillDescription() {
    const s = SKILLS[$("mpPlayerSkill").value] || SKILLS.generalist;
    $("mpSkillDescription").textContent = `${s.name}\uFF1A${s.description}`;
  }
  async function startMultiplayer(event) {
    event.preventDefault();
    const teamCount = Number($("mpTeamCount").value), teamSize = Number($("mpTeamSize").value);
    const format = deriveMpFormat(teamCount, teamSize);
    const total = teamCount * teamSize;
    const chosen = [...document.querySelectorAll("[data-mp-ai-skill]")].map((x) => x.value);
    const requested = [$("mpPlayerSkill").value, ...chosen];
    const validation = validateMpRoleSelection(requested, total);
    if (!validation.ok) {
      await showMpSetupError(validation.message);
      return;
    }
    const skills = assignUniqueMpSkills(requested);
    const fighters = [];
    const scene = data.settings.scene || data.settings.mpScene || "paper";
    saveData(data);
    let n = 0;
    for (let team = 0; team < teamCount; team++) for (let slot = 0; slot < teamSize; slot++) {
      fighters.push(createMpFighter(n, team, n === 0, skills[n]));
      n++;
    }
    mpState = {
      format,
      targetRule: "global",
      teamCount,
      teamSize,
      fighters,
      scene,
      round: 1,
      step: 1,
      log: [],
      over: false,
      pendingSkill: null,
      weaponHistory: [],
      playerTargetTeam: null,
      fishHookOwner: null,
      fieldDeclarations: [],
      fieldConflict: false,
      spectator: { paused: false, speed: 1, skip: false },
      global: { friendlyFireTeams: /* @__PURE__ */ new Set(), multiHitTeams: /* @__PURE__ */ new Set(), disabledSkillTeams: /* @__PURE__ */ new Set(), damageReductionTeams: /* @__PURE__ */ new Map() }
    };
    await assignInitialMpDolls();
    $("multiplayerSetupDialog").close();
    setView("multiplayer");
    await beginMpRound(true);
    renderMp();
  }
  function validateMpRoleSelection(requested, total) {
    if (!Number.isInteger(total) || total < 2) return { ok: false, message: "\u591A\u4EBA\u6BD4\u8D5B\u81F3\u5C11\u9700\u89812\u540D\u89D2\u8272\uFF0C\u8BF7\u91CD\u65B0\u8BBE\u7F6E\u961F\u4F0D\u6570\u91CF\u548C\u6BCF\u961F\u4EBA\u6570\u3002" };
    if (total > 12) return { ok: false, message: `\u5F53\u524D\u8BBE\u7F6E\u4E3A${total}\u4EBA\uFF0C\u8D85\u8FC7\u672C\u7248\u672C\u652F\u6301\u768412\u4EBA\u4E0A\u9650\u3002\u8BF7\u51CF\u5C11\u961F\u4F0D\u6570\u91CF\u6216\u6BCF\u961F\u4EBA\u6570\u3002` };
    const positions = /* @__PURE__ */ new Map(), duplicates = [];
    requested.forEach((key, index) => {
      if (key === "random" || key === "none") return;
      if (positions.has(key)) duplicates.push({ key, first: positions.get(key), again: index });
      else positions.set(key, index);
    });
    const namedCount = positions.size, randomCount = requested.filter((key) => key === "random").length;
    if (namedCount + randomCount > SKILL_KEYS.length) return { ok: false, message: `\u5F53\u524D\u9009\u62E9\u9700\u8981${namedCount + randomCount}\u4E2A\u4E92\u4E0D\u91CD\u590D\u89D2\u8272\uFF0C\u4F46\u89D2\u8272\u6C60\u53EA\u6709${SKILL_KEYS.length}\u540D\u3002\u8BF7\u9009\u62E9\u201C\u65E0\u6280\u80FD\u201D\u6216\u51CF\u5C11\u53C2\u8D5B\u4EBA\u6570\u3002` };
    if (duplicates.length) {
      const labels = duplicates.map(({ key, first, again }) => {
        var _a;
        return `${((_a = SKILLS[key]) == null ? void 0 : _a.name) || key}\uFF08${mpRoleSlotLabel(first)} \u4E0E ${mpRoleSlotLabel(again)}\uFF09`;
      });
      return { ok: false, message: `\u540C\u4E00\u5C40\u4E2D\u540C\u6837\u7684\u89D2\u8272\u53EA\u80FD\u51FA\u73B0\u4E00\u6B21\u3002\u4EE5\u4E0B\u9009\u62E9\u53D1\u751F\u91CD\u590D\uFF1A${labels.join("\uFF1B")}\u3002\u8BF7\u5173\u95ED\u63D0\u793A\u540E\u91CD\u65B0\u9009\u62E9\u3002` };
    }
    return { ok: true, message: "" };
  }
  function mpRoleSlotLabel(index) {
    if (index === 0) return "\u771F\u4EBA\u73A9\u5BB6";
    const teamSize = Number($("mpTeamSize").value), team = Math.floor(index / teamSize), slot = index % teamSize + 1;
    return `${MP_TEAM_NAMES[team] || `\u9635\u8425${team + 1}`}\u7684AI ${slot}`;
  }
  async function showMpSetupError(message) {
    var _a;
    await chooseMpOption(`\u591A\u4EBA\u6BD4\u8D5B\u8BBE\u7F6E\u9700\u8981\u8C03\u6574\uFF1A${message}`, [{ value: "back", label: "\u8FD4\u56DE\u8BBE\u7F6E\u5E76\u91CD\u65B0\u9009\u62E9" }], { cancelText: "\u8FD4\u56DE\u8BBE\u7F6E", eyebrow: "\u8BBE\u7F6E\u6821\u9A8C" });
    const note = $("mpSkillDescription");
    note.textContent = message;
    note.setAttribute("role", "alert");
    (_a = note.scrollIntoView) == null ? void 0 : _a.call(note, { block: "nearest" });
  }
  function assignUniqueMpSkills(requested) {
    const used = /* @__PURE__ */ new Set(), reserved = new Set(requested.filter((key) => key !== "random" && key !== "none"));
    return requested.map((key) => {
      let chosen = key;
      if (chosen === "none") return chosen;
      if (chosen === "random") {
        const pool = SKILL_KEYS.filter((candidate) => !used.has(candidate) && !reserved.has(candidate));
        if (!pool.length) throw new Error("\u53EF\u7528\u89D2\u8272\u4E0D\u8DB3\uFF0C\u65E0\u6CD5\u4FDD\u8BC1\u540C\u4E00\u5C40\u89D2\u8272\u552F\u4E00");
        chosen = pool[Math.floor(Math.random() * pool.length)];
      }
      used.add(chosen);
      return chosen;
    });
  }
  async function assignInitialMpDolls() {
    const selected = new Set(mpState.fighters.map((f) => f.skill));
    const available = () => SKILL_KEYS.filter((key) => !selected.has(key));
    for (const diviner of mpState.fighters.filter((f) => f.skill === "diviner")) {
      const options = available();
      if (!options.length) {
        diviner.doll = 0;
        diviner.dollSkill = null;
        continue;
      }
      let chosen;
      if (diviner.human) {
        chosen = await chooseMpOption("\u5360\u535C\u5BB6\uFF1A\u9009\u62E9\u672A\u88AB\u9009\u62E9\u89D2\u8272\u7684\u521D\u59CB\u79D8\u5076", options.map((key) => ({ value: key, label: SKILLS[key].name })));
      } else chosen = options[Math.floor(Math.random() * options.length)];
      if (!await mpActiveAllowed(diviner)) continue;
      diviner.doll = 1;
      diviner.dollShields = 0;
      diviner.dollSkill = chosen || options[0];
      selected.add(diviner.dollSkill);
    }
  }
  function deriveMpFormat(teamCount, teamSize) {
    return teamSize === 1 ? "ffa" : teamCount === 2 ? "team" : "multi";
  }
  function mpDiesFromInactivity(f) {
    return f.hp > 0 && f.hp < 1 && !f.dealtDamageLastRound && !f.tookDamageLastRound;
  }
  function mpShouldGainForge(f, move) {
    return Boolean((move == null ? void 0 : move.gain) && !f.hitThisStep);
  }
  function createMpFighter(id, team, human, skill) {
    const base = createFighter(skill), def = SKILLS[skill];
    return {
      ...base,
      id,
      team,
      human,
      skill,
      skills: skill === "none" ? [] : [skill],
      name: human ? "\u4F60" : `AI ${id}`,
      alive: true,
      shields: def.shields || 0,
      dragon: skill === "dragonKnight" ? 1 : 0,
      doll: 0,
      dollSkill: null,
      dragonShields: 0,
      dollShields: 0,
      damageOrder: ["dragon", "doll"],
      hook: false,
      markedBy: null,
      nightmareClock: 6,
      damagedThisRound: false,
      skipped: false,
      lastMove: null,
      activeUses: { ...MP_ACTIVE_LIMITS },
      fieldUses: { night: 1, sun: 2, bulwark: 2, aurora: 1, singularity: 2, shepherd: 1 },
      shepherdUses: { recharge: 1, heal: 1, field: 1 },
      roundFlags: {},
      friendlyFire: skill === "demon",
      vulnerable: 0,
      observerCatch: false,
      dragonCatch: 0,
      hangedBoost: 0,
      boostForge: false,
      generalistBoostPending: false,
      judgeArmed: false,
      judgeMove: null,
      magicianTarget: null,
      monsterGesture: null,
      divinerAuto: true,
      markedTarget: null,
      saintTarget: null,
      secretTarget: null,
      judgementHitThisRound: false,
      defenseQuota: 0,
      abilityStates: {}
    };
  }
  function randomUnusedSkill(excluded = []) {
    const pool = SKILL_KEYS.filter((k) => !excluded.includes(k));
    return pool[Math.floor(Math.random() * pool.length)];
  }
  function hasMpSkill(f, key) {
    return f.skills.includes(key) || f.dollSkill === key;
  }
  function mpRemainingSkills(f) {
    return [...new Set([...f.skills || [], f.dollSkill].filter((key) => key && key !== "none"))];
  }
  function mpLimitedUseOptions(f) {
    const entries = [], add = (skill, container, key, label) => {
      var _a, _b;
      if (hasMpSkill(f, skill)) entries.push({ value: `${container}.${key}`, label, remaining: (_b = (_a = f[container]) == null ? void 0 : _a[key]) != null ? _b : 0, apply: () => f[container][key] = (f[container][key] || 0) + 1 });
    };
    add("judge", "activeUses", "judge", "\u5BA1\u5224\u8005\xB7\u8FFD\u52A0\u5BF9\u5C40");
    add("thief", "activeUses", "thief", "\u76D7\u8D3C\xB7\u76D7\u53D6\u6280\u80FD");
    add("pioneer", "activeUses", "pioneer", "\u5148\u9A71\xB7\u56DE\u5408\u9632\u62A4");
    add("magician", "activeUses", "magician", "\u9B54\u672F\u5E08\xB7\u6539\u5199");
    add("sun", "fieldUses", "sun", "\u592A\u9633\xB7\u9886\u57DF");
    add("night", "fieldUses", "night", "\u9ED1\u591C\xB7\u9886\u57DF");
    add("aurora", "fieldUses", "aurora", "\u6781\u5149\xB7\u9886\u57DF");
    add("singularity", "fieldUses", "singularity", "\u5947\u70B9\xB7\u9886\u57DF");
    for (const [skill, field] of [["tyrant", "tyrantUses"], ["ascetic", "asceticUses"]]) if (hasMpSkill(f, skill)) entries.push({ value: field, label: SKILLS[skill].name, remaining: f[field], apply: () => f[field]++ });
    if (hasMpSkill(f, "shepherd")) {
      entries.push({ value: "shepherdUses.recharge", label: "\u7267\u7F8A\u4EBA\xB7\u8865\u5145\u6B21\u6570", remaining: f.shepherdUses.recharge, apply: () => f.shepherdUses.recharge++ });
      entries.push({ value: "shepherdUses.heal", label: "\u7267\u7F8A\u4EBA\xB7\u751F\u547D\u56DE\u590D", remaining: f.shepherdUses.heal, apply: () => f.shepherdUses.heal++ });
    }
    return entries;
  }
  function aliveMp() {
    return mpState.fighters.filter((f) => f.alive);
  }
  function enemiesOf(f) {
    return aliveMp().filter((x) => x.team !== f.team);
  }
  function alliesOf(f) {
    return aliveMp().filter((x) => x.team === f.team && x.id !== f.id);
  }
  function getHuman() {
    return mpState.fighters[0];
  }
  function mpTeamAlive(team) {
    return aliveMp().some((f) => f.team === team);
  }
  const MP_AI_LEVELS = {
    easy: { spread: 2.8, noise: 0.42, skill: 0.65, targetNoise: 0.9, risk: 0.12 },
    normal: { spread: 1.55, noise: 0.2, skill: 1, targetNoise: 0.42, risk: 0.28 },
    hard: { spread: 0.38, noise: 0.055, skill: 1.3, targetNoise: 0.12, risk: 0.52 },
    hell: { spread: 0.18, noise: 0.025, skill: 1.4, targetNoise: 0.06, risk: 0.62 }
  };
  function mpAiLevel() {
    return MP_AI_LEVELS[data.settings.difficulty] || MP_AI_LEVELS.normal;
  }
  function aiUsesSkill(base, urgency = 0) {
    return Math.random() < Math.min(0.96, base * mpAiLevel().skill + urgency);
  }
  function chooseAiSkillTarget(actor, candidates, purpose = "harm") {
    const support = ["heal", "shield", "recharge"].includes(purpose);
    const pool = candidates.filter(Boolean).filter((f) => f.alive && !f.skipped && !hasMpSkill(f, "pioneer") && (support ? f.team === actor.team : f.team !== actor.team));
    if (!pool.length) return null;
    let best = null, bestScore = -Infinity;
    for (const target of pool) {
      let score = Math.random() * mpAiLevel().targetNoise;
      if (purpose === "heal" || purpose === "shield") score += (target.maxHp - target.hp) * 3 + (target.hp <= 1 ? 2.5 : 0) + (target.team === actor.team ? 1.2 : -0.4) + (target.attack || 0) * 0.25;
      else if (purpose === "recharge") score += (target.team === actor.team ? 2 : -0.5) + Object.values(target.activeUses || {}).filter((x) => x <= 0).length;
      else score += (target.team !== actor.team ? 2.4 : -1.4) + (target.attack || 0) * 1.35 + (target.hp <= 1 ? 3 : 0) + (target.energy || 0) * 0.32 + (target.shields ? -0.35 : 0);
      if (best === null || score > bestScore) {
        best = target;
        bestScore = score;
      }
    }
    return best;
  }
  async function beginMpRound(initial = false) {
    var _a, _b;
    mpState.phase = "round-start";
    const openingEvents = [];
    mpState.fieldDeclarations = [];
    mpState.fieldConflict = false;
    mpState.global = { friendlyFireTeams: /* @__PURE__ */ new Set(), multiHitTeams: /* @__PURE__ */ new Set(), disabledSkillTeams: /* @__PURE__ */ new Set(), damageReductionTeams: /* @__PURE__ */ new Map() };
    if (!initial) {
      for (const f of aliveMp()) if (!f.skipped && mpDiesFromInactivity(f)) {
        f.hp = 0;
        openingEvents.push(`${f.name}\u5728\u56DE\u5408\u5F00\u59CB\u524D\u6B7B\u4EA1\uFF1A\u8840\u91CF\u4F4E\u4E8E1\u4E14\u4E0A\u4E00\u56DE\u5408\u672A\u9020\u6210\u6216\u53D7\u5230\u4F24\u5BB3\u3002`);
      }
      await settleMpDeaths(openingEvents);
    }
    if (initial) {
      await initNightMp258();
      for (const keeper of aliveMp().filter((f) => hasMpSkill(f, "secretKeeper"))) {
        const choices = aliveMp().filter((x) => x.id !== keeper.id && !hasMpSkill(x, "pioneer"));
        if (keeper.human) {
          const value = await chooseMpOption("\u7AA5\u79D8\u4EBA\uFF1A\u9009\u62E9\u672C\u8F6E\u7AA5\u79D8\u76EE\u6807", choices.map((x) => ({ value: String(x.id), label: `${x.name} \xB7 ${SKILLS[x.skill].name}` })));
          keeper.secretTarget = Number(value);
        } else keeper.secretTarget = (_b = (_a = chooseAiSkillTarget(keeper, choices, "harm")) == null ? void 0 : _a.id) != null ? _b : null;
        const target = mpState.fighters.find((x) => x.id === keeper.secretTarget);
        if (target) logMp(`${keeper.name}\xB7\u7AA5\u79D8\u4EBA\u6280\u80FD\uFF1A\u6807\u8BB0${target.name}\u3002`, "skill");
      }
    }
    for (const f of aliveMp()) {
      f.bigShieldUsed = false;
      f.damagedThisRound = false;
      f.judgementHitThisRound = false;
      f.defenseQuota = 0;
      f.skipped = Boolean(f.retreatUntil >= mpState.round);
      f.roundFlags = {};
      f.observerCatch = false;
      f.vulnerable = 0;
      f.lastDamageSource = null;
      if (skillEnabledMp(f, "mother") && mpState.damageLastRound) {
        let target = null;
        if (f.human) {
          const legalTargets = aliveMp().filter((x) => !hasMpSkill(x, "pioneer"));
          const choices = [...legalTargets, null], value = await chooseMpOption("\u6BCD\u4EB2\uFF1A\u4EE4\u8C01\u56DE\u590D0.5\u751F\u547D\uFF1F", [
            ...legalTargets.map((x) => ({ value: String(x.id), label: `${x.name} \xB7 ${formatNumber(x.hp)}\u8840` })),
            { value: "skip", label: "\u672C\u56DE\u5408\u4E0D\u53D1\u52A8" }
          ]);
          if (value !== "skip" && value != null) target = choices.find((x) => (x == null ? void 0 : x.id) === Number(value));
        } else target = chooseAiSkillTarget(f, aliveMp(), "heal");
        if (target && await mpActiveAllowed(f)) {
          gainHp258(target, 0.5);
          target.maxHp = Math.max(target.maxHp, target.hp);
          logMp(`${f.name}\xB7\u6BCD\u4EB2\u6280\u80FD\uFF1A\u4EE4${target.name}\u56DE\u590D0.5\u751F\u547D\u3002`, "skill");
        }
      }
      f.dealtDamageLastRound = false;
      f.tookDamageLastRound = false;
      if (skillEnabledMp(f, "blackEmperor", "active") && f.shields > 0 && !f.human) {
        const targets = [];
        for (const target of aliveMp().filter((x) => !hasMpSkill(x, "pioneer"))) {
          if (target.id !== f.id) targets.push({ target, kind: "fighter", shield: target.shields || 0, ally: target.team === f.team });
          if (target.dragon > 0) targets.push({ target, kind: "dragon", shield: target.dragonShields || 0, ally: target.team === f.team });
          if (target.doll > 0) targets.push({ target, kind: "doll", shield: target.dollShields || 0, ally: target.team === f.team });
        }
        const picked = targets.filter((x) => x.ally && !x.target.skipped).sort((a, b) => a.shield - b.shield)[0];
        if (picked && await mpActiveAllowed(f)) {
          f.shields--;
          if (picked.kind === "fighter") picked.target.shields++;
          else if (picked.kind === "dragon") picked.target.dragonShields = (picked.target.dragonShields || 0) + 1;
          else picked.target.dollShields = (picked.target.dollShields || 0) + 1;
          f.roundFlags.emperorGifted = true;
          const label = picked.kind === "fighter" ? picked.target.name : `${picked.target.name}\u7684${picked.kind === "dragon" ? "\u9F99" : "\u79D8\u5076"}`;
          logMp(`${f.name}\xB7\u9ED1\u7687\u5E1D\u6280\u80FD\uFF1A\u5C06\u672C\u4F53\u4E0A\u76841\u62A4\u76FE\u8F6C\u79FB\u7ED9${label}\u3002`, "skill");
        }
      }
      if (skillEnabledMp(f, "nightmare") && f.markedTarget == null && !f.human) {
        const target = chooseAiSkillTarget(f, enemiesOf(f), "harm");
        if (target) {
          target.markedBy = f.id;
          f.markedTarget = target.id;
          f.nightmareClock = 6;
          logMp(`${f.name}\xB7\u68A6\u9B47\u6280\u80FD\uFF1A\u6807\u8BB0${target.name}\u3002`, "skill");
        }
      }
      if (!f.human) await autoMpActive(f);
    }
    for (const f of aliveMp()) {
      if (f.audienceTarget != null) {
        const target = mpState.fighters[f.audienceTarget];
        if (target == null ? void 0 : target.alive) {
          target.skipped = true;
          logMp(`${f.name}\xB7\u89C2\u4F17\u6280\u80FD\uFF1A${target.name}\u672C\u56DE\u5408\u4E0D\u53C2\u4E0E\u5408\u638C\u3002`, "skill");
        }
        f.audienceTarget = null;
        if (!enemiesOf(f).some((x) => !x.skipped)) {
          for (const target2 of enemiesOf(f)) await applyMpSkillDamage(f, target2, 1, openingEvents, { trueDamage: true });
          logMp(`${f.name}\xB7\u89C2\u4F17\u6280\u80FD\uFF1A\u65E0\u654C\u65B9\u53C2\u4E0E\uFF0C\u5BF9\u6240\u6709\u654C\u65B9\u9020\u62101\u70B9\u771F\u5B9E\u4F24\u5BB3\uFF0C\u5E76\u9010\u4E00\u5B8C\u6210\u4F24\u5BB3\u54CD\u5E94\u3002`, "skill");
        }
      }
    }
    await settleMpDeaths(openingEvents);
    openingEvents.forEach((x) => logMp(x, x.includes("\u6B7B\u4EA1") ? "hit" : "skill"));
    if (openingEvents.length && checkMpWinner()) return;
    if (aliveMp().some((f) => f.skipped) && new Set(aliveMp().filter((f) => !f.skipped).map((f) => f.team)).size <= 1) {
      const events = [];
      settleMultiplayerRoundEndSkills({ events });
      await settleMpDeaths(events);
      events.forEach((s) => logMp(s, "skill"));
      if (checkMpWinner()) return;
      mpState.round++;
      mpState.step = 1;
      await beginMpRound();
    }
  }
  async function autoMpActive(f) {
    var _a, _b, _c;
    if (!f.alive || f.skipped) return;
    if (skillEnabledMp(f, "tyrant", "active") && f.tyrantUses > 0 && !f.tyrantRestore && aiUsesSkill(0.45) && await mpActiveAllowed(f)) activateTyrant258(f, mpState.round);
    if (skillEnabledMp(f, "magician") && f.activeUses.magician > 0) {
      const choices = [f, ...alliesOf(f)];
      f.magicianTarget = (_b = (_a = choices.sort((a, b) => a.attack - b.attack)[0]) == null ? void 0 : _a.id) != null ? _b : f.id;
    }
    if (!f.alive) return;
    if (skillEnabledMp(f, "thief") && f.activeUses.thief > 0 && aiUsesSkill(0.18, f.hp <= 1 ? 0.18 : 0) && await mpActiveAllowed(f)) {
      const t = chooseAiSkillTarget(f, aliveMp().filter((x) => x.id !== f.id), "harm");
      if (t) {
        const borrowed = mpRemainingSkills(t), added = borrowed.filter((s) => !hasMpSkill(f, s));
        f.activeUses.thief--;
        f.roundFlags.stolen = { target: t.id, skills: borrowed, added };
        const previousSkills = [...f.skills];
        copyRemaining258(f, t, true);
        f.skills = previousSkills;
        f.skills.push(...added);
        t.roundFlags.skillStolen = true;
        logMp(`${f.name}\xB7\u76D7\u8D3C\u6280\u80FD\uFF1A\u6682\u65F6\u593A\u53D6${t.name}\u7684\u5269\u4F59\u6280\u80FD\u3002`, "skill");
      }
    }
    if (!f.alive) return;
    if (skillEnabledMp(f, "night", "field") && f.fieldUses.night > 0 && aiUsesSkill(0.15, f.hp <= 1 ? 0.2 : 0)) {
      f.fieldUses.night--;
      registerMpField(f, "night");
    }
    if (!f.alive) return;
    if (skillEnabledMp(f, "sun", "field") && f.fieldUses.sun > 0 && aiUsesSkill(0.18, enemiesOf(f).some((x) => x.energy >= 4) ? 0.12 : 0)) {
      f.fieldUses.sun--;
      const threats = enemiesOf(f).flatMap((x) => MOVE_KEYS.filter((k) => {
        var _a2;
        return ((_a2 = MOVES[k]) == null ? void 0 : _a2.type) === "attack" && MOVES[k].cost <= x.energy;
      })).sort((a, b) => MOVES[b].level - MOVES[a].level);
      const declared = threats[0] || ["\u5C0F\u5200", "\u6B66\u58EB\u5200", "\u624B\u91CC\u5251", "\u82E6\u65E0", "\u9F99\u7259", "\u865A\u65E0"][Math.floor(Math.random() * 6)];
      registerMpField(f, "sun", ((_c = MOVES[declared]) == null ? void 0 : _c.name) || declared);
    }
    if (!f.alive) return;
    if (skillEnabledMp(f, "miracle") && aiUsesSkill(0.25, enemiesOf(f).some((x) => x.energy >= 3) ? 0.12 : 0) && await mpActiveAllowed(f)) f.roundFlags.declare = true;
    if (!f.alive) return;
    if (skillEnabledMp(f, "pioneer", "active") && f.activeUses.pioneer > 0 && f.hp <= 1 && await mpActiveAllowed(f)) {
      f.activeUses.pioneer--;
      f.roundFlags.preventAll = true;
      logMp(`${f.name}\xB7\u5148\u9A71\u6280\u80FD\uFF1A\u672C\u56DE\u5408\u9632\u6B62\u53D7\u5230\u4F24\u5BB3\u3002`, "skill");
    }
    if (skillEnabledMp(f, "singularity") && !f.roundFlags.singularityUsed && aiUsesSkill(0.2, enemiesOf(f).some((x) => x.hp <= 1) ? 0.16 : 0) && await mpActiveAllowed(f)) {
      const t = chooseAiSkillTarget(f, enemiesOf(f), "harm");
      if (t) {
        f.roundFlags.singularityUsed = true;
        f.roundFlags.attackPenalty = (f.roundFlags.attackPenalty || 0) + 0.5;
        t.vulnerable += 0.5;
        logMp(`${f.name}\xB7\u5947\u70B9\u6280\u80FD\uFF1A${t.name}\u672C\u56DE\u5408\u6613\u4F240.5\u3002`, "skill");
      }
    }
    if (!f.alive) return;
    if (skillEnabledMp(f, "aurora", "field") && f.fieldUses.aurora > 0 && aiUsesSkill(0.22, enemiesOf(f).length >= 3 ? 0.12 : 0)) {
      f.fieldUses.aurora--;
      registerMpField(f, "aurora");
    }
    if (skillEnabledMp(f, "singularity", "field") && f.fieldUses.singularity > 0 && aiUsesSkill(0.18, enemiesOf(f).some((x) => x.hp <= 1) ? 0.12 : 0)) {
      f.fieldUses.singularity--;
      registerMpField(f, "singularity");
    }
    if (skillEnabledMp(f, "shepherd", "field") && f.shepherdUses.field > 0 && aiUsesSkill(0.25, [f, ...alliesOf(f)].some((x) => x.hp <= 1) ? 0.15 : 0)) {
      f.shepherdUses.field--;
      registerMpField(f, "shepherd");
    }
    if (skillEnabledMp(f, "shepherd") && f.shepherdUses.heal > 0 && aiUsesSkill(0.3, aliveMp().some((x) => x.hp <= 1) ? 0.22 : 0) && await mpActiveAllowed(f)) {
      const t = chooseAiSkillTarget(f, aliveMp(), "heal");
      if (t) {
        f.shepherdUses.heal--;
        gainHp258(t, 1);
        t.maxHp = Math.max(t.maxHp, t.hp);
        logMp(`${f.name}\xB7\u7267\u7F8A\u4EBA\u6280\u80FD\uFF1A\u4EE4${t.name}+1\u8840\u3002`, "skill");
      }
    }
    if (skillEnabledMp(f, "shepherd") && f.shepherdUses.recharge > 0 && aiUsesSkill(0.3) && await mpActiveAllowed(f)) {
      const candidates = aliveMp().filter((x) => x.id !== f.id && mpLimitedUseOptions(x).length);
      const t = chooseAiSkillTarget(f, candidates, "recharge"), option = t ? mpLimitedUseOptions(t).sort((a, b) => a.remaining - b.remaining)[0] : null;
      if (t && option) {
        f.shepherdUses.recharge--;
        option.apply();
        logMp(`${f.name}\xB7\u7267\u7F8A\u4EBA\u6280\u80FD\uFF1A\u8865\u5145${t.name}\u7684${option.label}\u6B21\u6570\u3002`, "skill");
      }
    }
  }
  async function mpActiveAllowed(actor) {
    if (!actor.alive || actor.hp <= 0 || actor.skipped) return false;
    for (const fisher of shuffleMp(aliveMp().filter((f) => f.id !== actor.id && !f.skipped && skillEnabledMp(f, "fisherman", "active")))) {
      if (!fisher.human && fisher.team === actor.team) continue;
      if (!await chooseUse258(fisher, "\u6E14\u592B\uFF1A\u662F\u5426\u6311\u6218" + actor.name + "\u7684\u4E3B\u52A8\u6280\u80FD\uFF1F")) continue;
      if (await resolveNoSkillChallenge(fisher, actor)) {
        const events = [];
        await applyMpSkillDamage(fisher, actor, 1, events, { allowJudge: false });
        await settleMpDeaths(events);
        events.forEach((s) => logMp(s, "skill"));
        return false;
      }
    }
    return actor.alive && actor.hp > 0;
  }
  async function resolveNoSkillChallenge(fisher, actor) {
    const left = { fighter: fisher, hp: 1, energy: 0 }, right = { fighter: actor, hp: 1, energy: 0 };
    const dialog = $("mpJudgeDuelDialog");
    $("mpJudgeDuelTitle").textContent = `\u9C7C\u94A9\u6311\u6218 \xB7 ${fisher.name} \u5BF9 ${actor.name}`;
    dialog.addEventListener("cancel", preventJudgeDialogClose);
    dialog.showModal();
    renderMpJudgeDuel(left, right, null, null, "\u6E14\u592B\u6311\u6218\uFF1A\u65E0\u6280\u80FD\u3001\u65E0\u526A\u5200\uFF0C\u8FDB\u884C\u4E00\u4E2A\u56DE\u5408");
    let step = 1;
    while (true) {
      const leftMove = await chooseMpJudgeDuelAction(left, `${fisher.name}\u9009\u62E9\u884C\u52A8`);
      const rightMove = await chooseMpJudgeDuelAction(right, `${actor.name}\u9009\u62E9\u884C\u52A8`);
      left.energy = Math.max(0, left.energy - MOVES[leftMove].cost);
      right.energy = Math.max(0, right.energy - MOVES[rightMove].cost);
      const result = resolveMultiplayerJudgeCombat(leftMove, rightMove);
      if (MOVES[leftMove].gain && !result.playerHit) left.energy += MOVES[leftMove].gain;
      if (MOVES[rightMove].gain && !result.aiHit) right.energy += MOVES[rightMove].gain;
      renderMpJudgeDuel(left, right, leftMove, rightMove, `\u7B2C${step}\u6B21\u51FA\u624B \xB7 ${result.title}`);
      if (result.playerHit || result.aiHit) {
        dialog.removeEventListener("cancel", preventJudgeDialogClose);
        dialog.close();
        return Boolean(result.aiHit);
      }
      if (result.reset) {
        dialog.removeEventListener("cancel", preventJudgeDialogClose);
        dialog.close();
        return false;
      }
      step++;
    }
  }
  function registerMpField(f, type, param = null) {
    mpState.fieldDeclarations.push({ fighter: f.id, team: f.team, type, param });
    const teams = new Set(mpState.fieldDeclarations.map((x) => x.team));
    mpState.global.friendlyFireTeams.clear();
    mpState.global.multiHitTeams.clear();
    mpState.global.disabledSkillTeams.clear();
    mpState.global.damageReductionTeams.clear();
    for (const x of mpState.fighters) {
      delete x.roundFlags.sunDeclare;
    }
    if (teams.size > 1) {
      mpState.fieldConflict = true;
      logMp("\u9886\u57DF\u51B2\u7A81\uFF1A\u6765\u81EA\u4E0D\u540C\u961F\u4F0D\u7684\u9886\u57DF\u540C\u65F6\u5B58\u5728\uFF0C\u672C\u56DE\u5408\u6240\u6709\u9886\u57DF\u5931\u6548\u3002", "skill");
      return false;
    }
    mpState.fieldConflict = false;
    for (const d of mpState.fieldDeclarations) {
      const owner = mpState.fighters[d.fighter];
      if (d.type === "night") enemiesOf(owner).forEach((x) => mpState.global.friendlyFireTeams.add(x.team));
      if (d.type === "sun") owner.roundFlags.sunDeclare = d.param;
      if (d.type === "aurora") mpState.global.multiHitTeams.add(owner.team);
      if (d.type === "singularity") enemiesOf(owner).forEach((x) => mpState.global.disabledSkillTeams.add(x.team));
      if (d.type === "shepherd") mpState.global.damageReductionTeams.set(owner.team, (mpState.global.damageReductionTeams.get(owner.team) || 0) + 0.5);
    }
    logMp(`${f.name}\xB7${SKILLS[f.skill].name}\u9886\u57DF\u53D1\u52A8\u3002`, "skill");
    return true;
  }
  function skillEnabledMp(f, key = f.skill, abilityType = "normal") {
    if (f.skipped) return false;
    if (abilityType !== "active" && abilityType !== "field" && hasPassive258(key) && (f.passiveSeals || []).some((id) => {
      var _a;
      return (_a = mpState.fighters[id]) == null ? void 0 : _a.alive;
    })) return false;
    return hasMpSkill(f, key) && !f.roundFlags.skillStolen && (abilityType === "field" || !mpState.global.disabledSkillTeams.has(f.team));
  }
  const mpRenderCache = /* @__PURE__ */ new WeakMap();
  function renderMpArena(html) {
    const arena = $("mpArena");
    if (mpRenderCache.get(arena) === html) return;
    arena.innerHTML = html;
    mpRenderCache.set(arena, html);
  }
  function renderMpLog() {
    const list = $("mpLogList"), visible = mpState.log.slice(0, 150);
    let cache = mpRenderCache.get(list);
    if (!cache) {
      cache = { rows: /* @__PURE__ */ new Map(), footer: null };
      mpRenderCache.set(list, cache);
      list.replaceChildren();
    }
    const keep = new Set(visible);
    for (const [entry, row] of cache.rows) if (!keep.has(entry)) {
      row.remove();
      cache.rows.delete(entry);
    }
    let anchor = null;
    const hidden = mpState.log.length - visible.length;
    if (hidden) {
      if (!cache.footer) cache.footer = document.createElement("li");
      const text = `\u66F4\u65E9\u7684 ${hidden} \u6761\u8BB0\u5F55\u5DF2\u6298\u53E0\uFF0C\u4ECD\u4F1A\u4FDD\u7559\u5728\u6218\u62A5\u4E2D\u3002`;
      if (cache.footer.textContent !== text) cache.footer.textContent = text;
      if (list.lastChild !== cache.footer) list.appendChild(cache.footer);
      anchor = cache.footer;
    } else if (cache.footer) {
      cache.footer.remove();
      cache.footer = null;
    }
    for (let i = visible.length - 1; i >= 0; i--) {
      const entry = visible[i];
      let row = cache.rows.get(entry);
      if (!row) {
        row = document.createElement("li");
        if (entry.kind === "trace") {
          row.className = "mp-trace-entry";
          row.innerHTML = `<details><summary>${escapeHtml(entry.text)}</summary><ol class="rule-trace-list">${(entry.trace || []).map((step) => `<li><b>${escapeHtml(step.summary)}</b>${step.detail ? `<small>${escapeHtml(step.detail)}</small>` : ""}</li>`).join("")}</ol></details>`;
        } else {
          row.className = entry.kind === "hit" ? "mp-hit" : "";
          row.textContent = entry.text;
        }
        cache.rows.set(entry, row);
      }
      if (row.parentNode !== list || row.nextSibling !== anchor) list.insertBefore(row, anchor);
      anchor = row;
    }
  }
  function renderMp() {
    var _a;
    if (!mpState) return;
    renderMpFlow();
    $("mpSpectatorControls").classList.toggle("hidden", ((_a = getHuman()) == null ? void 0 : _a.alive) || mpState.over);
    $("mpRound").textContent = mpState.round;
    $("mpStep").textContent = mpState.step;
    $("mpModeLabel").textContent = `${mpState.format === "ffa" ? "\u591A\u4EBA\u6DF7\u6218" : mpState.teamCount === 2 ? "\u7EC4\u961F\u5BF9\u6218" : `${mpState.teamCount}\u961F\u5BF9\u6218`} \xB7 ${mpState.targetRule === "team" ? "\u6307\u5B9A\u76EE\u6807\u961F\u4F0D" : "\u5168\u4F53\u5171\u540C\u5224\u5200"}`;
    const teamColors = ["#52728a", "#b43c32", "#c48a25", "#39353d", "#8a8174", "#775b8b"];
    const legend = Array.from({ length: mpState.teamCount }, (_, team) => `<i style="--team-color:${teamColors[team]}">${mpState.format === "ffa" ? `\u9635\u8425${team + 1}` : MP_TEAM_NAMES[team]}${mpTeamAlive(team) ? "" : " \xB7 \u6DD8\u6C70"}</i>`).join("");
    $("mpArena").className = "mp-arena circle-layout";
    renderMpArena(`<div class="mp-circle-legend">${legend}</div><div class="mp-circle-core"><b>${mpState.responsePending ? "\u5224" : "\u5408\u638C"}</b><span>${mpState.responsePending ? "\u540C\u65F6\u63ED\u62DB \xB7 \u9010\u5200\u5224\u5B9A" : `\u7B2C${mpState.round}\u56DE\u5408 \xB7 \u51FA\u624B${mpState.step}`}</span></div>${mpState.fighters.map((fighter, index) => mpFighterHtml(fighter, index, mpState.fighters.length, teamColors[fighter.team])).join("")}`);
    renderMpMoves();
    renderMpSkillPanel();
    $("mpLogCount").textContent = mpState.log.length;
    renderMpLog();
    scheduleMpAutoPlay();
  }
  function scheduleMpAutoPlay(force = false) {
    var _a, _b, _c, _d, _e;
    if (!mpState || mpState.over || ((_a = getHuman()) == null ? void 0 : _a.alive) && !((_b = getHuman()) == null ? void 0 : _b.skipped) || mpState.autoTimer || mpState.responsePending) return;
    if (((_c = mpState.spectator) == null ? void 0 : _c.paused) && !force) return;
    $("mpStatus").textContent = "\u4F60\u6682\u4E0D\u53C2\u4E0E\uFF0C\u6BD4\u8D5B\u7531\u5728\u573AAI\u81EA\u52A8\u7EE7\u7EED\u3002";
    const delay = ((_d = mpState.spectator) == null ? void 0 : _d.skip) ? 0 : Math.max(80, 450 / (((_e = mpState.spectator) == null ? void 0 : _e.speed) || 1));
    mpState.autoTimer = setTimeout(async () => {
      if (!mpState || mpState.over) return;
      mpState.autoTimer = null;
      if (checkMpWinner()) return;
      const participants = aliveMp().filter((x) => !x.skipped);
      if (!participants.length) {
        const context = { events: [] };
        settleMultiplayerRoundEndSkills(context);
        await settleMpDeaths(context.events);
        context.events.forEach((x) => logMp(x, x.includes("\u6B7B\u4EA1") ? "hit" : "skill"));
        if (checkMpWinner()) return;
        aliveMp().forEach((f) => f.energy = 0);
        mpState.weaponHistory = [];
        mpState.round++;
        mpState.step = 1;
        await beginMpRound();
        renderMp();
        return;
      }
      const aiWorld = createMpAiWorld(), actions = new Map(participants.map((f) => [f.id, chooseMpAiMove(f, aiWorld)]));
      await beat();
      await MULTIPLAYER_ENGINE.resolveActions(actions);
    }, delay);
  }
  function mpFighterHtml(f, index = 0, total = 1, teamColor = "#52728a") {
    const teamLabel = mpState.format === "ffa" ? `\u9635\u8425${f.team + 1}` : MP_TEAM_NAMES[f.team] || `\u961F\u4F0D${f.team + 1}`;
    const tags = [teamLabel, f.shields ? `\u672C\u4F53${f.shields}\u76FE` : "", f.dragon ? `\u9F99${f.dragon}\u8840${f.dragonShields ? `/${f.dragonShields}\u76FE` : ""}` : "", f.doll ? `\u79D8\u5076${f.doll}\u8840${f.dollShields ? `/${f.dollShields}\u76FE` : ""}` : "", f.dragon && f.doll ? `\u627F\u4F24\uFF1A${(f.damageOrder || ["dragon", "doll"]).map((x) => x === "dragon" ? "\u9F99" : "\u79D8\u5076").join("\u2192")}` : "", f.hook ? "\u9C7C\u94A9" : "", f.markedBy != null ? "\u88AB\u6807\u8BB0" : "", f.skipped ? "\u9000\u573A" : ""].filter(Boolean);
    const owned = [...new Set(f.skills)].map((key) => {
      var _a;
      return ((_a = SKILLS[key]) == null ? void 0 : _a.name) || key;
    });
    const skillText = `${owned.join("\u3001")}${f.dollSkill ? ` \xB7 \u79D8\u5076\uFF1A${SKILLS[f.dollSkill].name}` : ""}`;
    const angle = 180 + index * 360 / Math.max(1, total);
    return `<article class="mp-fighter orbit ${f.human ? "human" : ""} ${f.alive ? "" : "dead"} ${f.hitThisStep ? "hit-pulse" : ""}" style="--angle:${angle}deg;--team-color:${teamColor}" title="${escapeHtml(`${f.name} \xB7 ${skillText}`)}"><div class="mp-fighter-head"><b>${f.name}</b><small>${skillText}</small></div><div class="mp-bars"><span>\u751F\u547D ${formatNumber(Math.max(0, f.hp))} / ${formatNumber(f.maxHp)}</span><span>\u80FD\u91CF ${formatNumber(f.energy)}\u3000\xB7\u3000\u653B\u51FB ${formatNumber(f.attack)}</span></div><div class="mp-tags">${tags.map((t) => `<i class="mp-tag">${t}</i>`).join("")}</div><div class="mp-last">${f.lastMove ? `${mpState.responsePending ? "\u672C\u6B21\u63ED\u62DB" : "\u4E0A\u6B21\u884C\u52A8"}\uFF1A${skillMove(f.lastMove).name}` : f.alive ? "\u53CC\u624B\u5408\u638C\uFF0C\u7B49\u5F85\u51FA\u624B" : "\u5DF2\u6DD8\u6C70"}</div></article>`;
  }
  function renderMpFlow() {
    var _a, _b;
    const flow = $("mpFlow");
    if (!flow) return;
    const phases = ["round-start", "combat", "resistance-and-judgement", "post-attack", "death-and-reset"];
    const current = ((_a = mpState.currentAttackContext) == null ? void 0 : _a.phase) || mpState.phase || "round-start";
    const aliases = { "collect-actions": "combat", "commit-actions": "combat", "complete": "death-and-reset" };
    const index = Math.max(0, phases.indexOf(aliases[current] || current));
    [...flow.children].forEach((node, i) => {
      node.classList.toggle("done", i < index);
      node.classList.toggle("active", i === index);
    });
    (_b = document.querySelector(".mp-controls")) == null ? void 0 : _b.classList.toggle("resolving", Boolean(mpState.responsePending || ["commit-actions", "resistance-and-judgement", "post-attack", "death-and-reset"].includes(current)));
  }
  function mpLegalMoves(f) {
    let keys = MOVE_KEYS.filter((key) => key !== "scissors");
    if (skillEnabledMp(f, "bulwark")) keys.push("bigShield");
    if (skillEnabledMp(f, "guardian")) keys = keys.filter((key) => key !== "forge");
    keys = [...new Set(keys)];
    return keys.filter((k) => mpMoveCost(f, k) <= f.energy && !sunBannedMp258(f, k));
  }
  function mpMoveCost(f, key) {
    var _a, _b;
    if (key === "exit") return 2;
    if (key === "bigShield") return f.bigShieldUsed ? 0 : 2;
    let cost = (_b = (_a = MOVES[key]) == null ? void 0 : _a.cost) != null ? _b : 0;
    for (const [skillKey, rule] of Object.entries(SKILL_RULES)) if (skillEnabledMp(f, skillKey) && rule.modifyCost) cost = rule.modifyCost({ moveKey: key, cost, fighter: f });
    return Math.max(0, cost);
  }
  function renderMpMoves() {
    const h = getHuman();
    if (!(h == null ? void 0 : h.alive) || h.skipped || mpState.over) {
      $("mpMoveGrid").innerHTML = "";
      return;
    }
    const moves = mpLegalMoves(h).map((key) => {
      const m = key === "exit" ? { icon: "\u21AA", name: "\u9000\u573A" } : skillMove(key);
      return `<button class="mp-move" data-mp-move="${key}"><span>${m.icon}</span><b>${m.name}</b><small>${mpMoveCost(h, key)}\u953B</small></button>`;
    });
    const skills = getMpActiveActions(h).map(([key, name, icon = "\u25C6"]) => `<button class="mp-move active-skill" data-mp-skill="${key}"><span>${icon}</span><b>${name}</b><small>\u4E3B\u52A8\u6280\u80FD</small></button>`);
    $("mpMoveGrid").innerHTML = [...moves, ...skills].join("");
    $("mpMoveGrid").querySelectorAll("[data-mp-move]").forEach((b) => b.addEventListener("click", () => {
      b.classList.add("selected");
      $("mpStatus").textContent = `\u4F60\u5DF2\u6446\u51FA${skillMove(b.dataset.mpMove).name}\u7684\u624B\u52BF\uFF0C\u6B63\u5728\u7B49\u5F85\u5168\u5458\u540C\u65F6\u63ED\u62DB\u2026\u2026`;
      if (navigator.vibrate) navigator.vibrate(28);
      playMpStep(b.dataset.mpMove);
    }));
    $("mpMoveGrid").querySelectorAll("[data-mp-skill]").forEach((b) => b.addEventListener("click", async () => {
      if (mpState.responsePending) return;
      mpState.responsePending = true;
      document.querySelectorAll(".mp-move").forEach((x) => x.disabled = true);
      try {
        await activateMpSkill(b.dataset.mpSkill);
      } finally {
        if (mpState) {
          mpState.responsePending = false;
          renderMp();
        }
      }
    }));
  }
  function getMpActiveActions(h) {
    const buttons = [];
    if (h.skipped) return buttons;
    const opening = (mpState == null ? void 0 : mpState.phase) === "round-start";
    if (opening && skillEnabledMp(h, "tyrant", "active") && h.tyrantUses > 0 && !h.tyrantRestore) buttons.push(["tyrant", "\u8BB0\u5F55\u751F\u547D\u5E76\u964D\u81F31"]);
    if (skillEnabledMp(h, "thief") && h.activeUses.thief > 0) buttons.push(["thief", "\u76D7\u53D6\u6280\u80FD"]);
    if (opening && skillEnabledMp(h, "night", "field") && h.fieldUses.night > 0) buttons.push(["nightField", "\u53CB\u4F24\u9886\u57DF\uFF08\u56DE\u5408\u5F00\u59CB\uFF09"]);
    if (opening && skillEnabledMp(h, "sun", "field") && h.fieldUses.sun > 0) buttons.push(["sunField", "\u592A\u9633\u5BA3\u8A00\uFF08\u56DE\u5408\u5F00\u59CB\uFF09"]);
    if (opening && skillEnabledMp(h, "pioneer", "active") && h.activeUses.pioneer > 0) buttons.push(["pioneer", "\u9632\u6B62\u672C\u56DE\u5408\u4F24\u5BB3"]);
    if (skillEnabledMp(h, "miracle")) buttons.push(["miracle", "\u5207\u6362\u5BA3\u8A00"]);
    if (opening && skillEnabledMp(h, "aurora", "field") && h.fieldUses.aurora > 0) buttons.push(["aurora", "\u6781\u5149\u9886\u57DF\uFF08\u56DE\u5408\u5F00\u59CB\uFF09"]);
    if (opening && skillEnabledMp(h, "singularity") && !h.roundFlags.singularityUsed) buttons.push(["singularity", "\u5947\u70B9\u6613\u4F24"]);
    if (opening && skillEnabledMp(h, "singularity", "field") && h.fieldUses.singularity > 0) buttons.push(["singularityField", "\u7981\u7528\u654C\u65B9\u6280\u80FD\uFF08\u56DE\u5408\u5F00\u59CB\uFF09"]);
    if (opening && skillEnabledMp(h, "shepherd") && h.shepherdUses.recharge > 0) buttons.push(["shepherdRecharge", "\u8865\u5145\u9650\u6B21\u6280\u80FD\u6B21\u6570"]);
    if (opening && skillEnabledMp(h, "shepherd") && h.shepherdUses.heal > 0) buttons.push(["shepherdHeal", "\u4EE4\u89D2\u8272+1\u8840"]);
    if (opening && skillEnabledMp(h, "shepherd", "field") && h.shepherdUses.field > 0) buttons.push(["shepherdField", "\u53CB\u65B9\u51CF\u4F24\u9886\u57DF\uFF08\u56DE\u5408\u5F00\u59CB\uFF09"]);
    if (opening && skillEnabledMp(h, "nightmare") && h.markedTarget == null) buttons.push(["nightmare", "\u9009\u62E9\u68A6\u9B47\u6807\u8BB0"]);
    if (skillEnabledMp(h, "magician") && h.activeUses.magician > 0) buttons.push(["magicianArm", h.magicianTarget != null ? "\u66F4\u6362\u9B54\u672F\u66FF\u8EAB" : "\u51C6\u5907\u9B54\u672F\u66FF\u8EAB"]);
    if (opening && skillEnabledMp(h, "blackEmperor") && h.shields > 0 && !h.roundFlags.emperorGifted) buttons.push(["blackEmperorGift", "\u8F6C\u79FB\u62A4\u76FE"]);
    if (h.dragon > 0 && h.doll > 0) buttons.push(["damageOrder", "\u8C03\u6574\u627F\u4F24\u987A\u5E8F"]);
    return buttons;
  }
  function renderMpSkillPanel() {
    var _a, _b;
    const panel = $("mpSkillPanel"), human = getHuman();
    if (!(human == null ? void 0 : human.alive)) {
      panel.classList.add("hidden");
      return;
    }
    const entries = [];
    for (const skillKey of [...new Set(human.skills)]) for (const ability of abilityListFor(skillKey)) entries.push(`<span class="skill-event"><b>${((_a = SKILLS[skillKey]) == null ? void 0 : _a.name) || skillKey} \xB7 ${ability.name}</b><small class="rule-line">${ability.type === "active" ? "\u4E3B\u52A8\u6280\u80FD" : ability.type === "reaction" ? "\u53CD\u5E94\u6280\u80FD" : "\u88AB\u52A8/\u6301\u7EED\u6280\u80FD"}</small></span>`);
    if (human.dollSkill) for (const ability of abilityListFor(human.dollSkill)) entries.push(`<span class="skill-event"><b>\u79D8\u5076\uFF1A${(_b = SKILLS[human.dollSkill]) == null ? void 0 : _b.name} \xB7 ${ability.name}</b><small class="rule-line">\u72EC\u7ACB\u4FDD\u7559\u7684\u79D8\u5076\u6280\u80FD</small></span>`);
    panel.innerHTML = entries.join("") || `<span>\u5F53\u524D\u89D2\u8272\u6CA1\u6709\u9700\u8981\u5355\u72EC\u5C55\u793A\u7684\u6280\u80FD\u6A21\u5757\u3002</span>`;
    panel.classList.remove("hidden");
  }
  function chooseMpOption(title, options, { cancelText = "\u53D6\u6D88", eyebrow = "\u4E3B\u52A8\u6280\u80FD" } = {}) {
    var _a, _b, _c;
    if (Array.isArray(globalThis.__hezhangTestChoices)) return Promise.resolve((_c = (_b = globalThis.__hezhangTestChoices.shift()) != null ? _b : (_a = options[0]) == null ? void 0 : _a.value) != null ? _c : null);
    return new Promise((resolve) => {
      const dialog = document.createElement("dialog");
      dialog.innerHTML = `<div class="dialog-head"><div><p class="eyebrow">${eyebrow}</p><h2>${title}</h2></div></div><div class="hero-actions" style="margin-top:22px">${options.map((x) => `<button class="secondary-button" type="button" data-value="${x.value}">${x.label}</button>`).join("")}</div><button class="text-button" type="button" data-cancel="true" style="margin-top:20px">${cancelText}</button>`;
      document.body.appendChild(dialog);
      let finished = false;
      const finish = (value) => {
        if (finished) return;
        finished = true;
        dialog.close();
        dialog.remove();
        resolve(value);
      };
      dialog.querySelectorAll("[data-value]").forEach((button) => button.addEventListener("click", () => finish(button.dataset.value)));
      dialog.querySelector("[data-cancel]").addEventListener("click", () => finish(null));
      dialog.addEventListener("cancel", (event) => {
        event.preventDefault();
        finish(null);
      }, { once: true });
      dialog.showModal();
    });
  }
  async function chooseMpTargetInteractive(actor, allies = false, title = "\u9009\u62E9\u76EE\u6807") {
    const choices = (allies ? alliesOf(actor) : enemiesOf(actor)).filter((x) => !hasMpSkill(x, "pioneer"));
    if (!choices.length) {
      showToast("\u5F53\u524D\u6CA1\u6709\u53EF\u9009\u62E9\u7684\u76EE\u6807");
      return null;
    }
    const value = await chooseMpOption(title, choices.map((x) => ({ value: String(x.id), label: `${x.name} \xB7 ${SKILLS[x.skill].name}` })));
    return value == null ? null : choices.find((x) => x.id === Number(value)) || null;
  }
  async function activateMpSkill(key) {
    const h = getHuman();
    if (!(h == null ? void 0 : h.alive) || h.skipped || !getMpActiveActions(h).some(([action]) => action === key)) return;
    if (mpFisherCanChallengeSkill(key) && !await mpActiveAllowed(h)) {
      renderMp();
      checkMpWinner();
      return;
    }
    if (key === "thief") {
      const choices = aliveMp().filter((x) => x.id !== h.id && !hasMpSkill(x, "pioneer")), value = await chooseMpOption("\u76D7\u53D6\u8C01\u7684\u6280\u80FD\uFF1F", choices.map((x) => ({ value: String(x.id), label: `${x.name} \xB7 ${mpRemainingSkills(x).map((s) => SKILLS[s].name).join("\u3001")}` }))), t = choices.find((x) => x.id === Number(value));
      if (t) {
        const borrowed = mpRemainingSkills(t), added = borrowed.filter((s) => !hasMpSkill(h, s));
        h.activeUses.thief--;
        h.roundFlags.stolen = { target: t.id, skills: borrowed, added };
        const previousSkills = [...h.skills];
        copyRemaining258(h, t, true);
        h.skills = previousSkills;
        h.skills.push(...added);
        t.roundFlags.skillStolen = true;
        logMp(`\u4F60\xB7\u76D7\u8D3C\u6280\u80FD\uFF1A\u6682\u65F6\u593A\u53D6${t.name}\u7684\u5269\u4F59\u6280\u80FD\u3002`, "skill");
      }
    }
    if (key === "tyrant") activateTyrant258(h, mpState.round);
    if (key === "nightField") {
      h.fieldUses.night--;
      registerMpField(h, "night");
    }
    if (key === "sunField") {
      const name = await chooseMpOption("\u592A\u9633\u5BA3\u8A00", ["\u5C0F\u5200", "\u6B66\u58EB\u5200", "\u624B\u91CC\u5251", "\u82E6\u65E0", "\u9F99\u7259", "\u865A\u65E0"].map((x) => ({ value: x, label: x })));
      if (name != null) {
        h.fieldUses.sun--;
        registerMpField(h, "sun", name);
      }
    }
    if (key === "pioneer") {
      h.activeUses.pioneer--;
      h.roundFlags.preventAll = true;
      logMp("\u4F60\xB7\u5148\u9A71\u6280\u80FD\uFF1A\u9632\u6B62\u672C\u56DE\u5408\u53D7\u5230\u7684\u4F24\u5BB3\u3002", "skill");
    }
    if (key === "miracle") {
      h.roundFlags.declare = !h.roundFlags.declare;
      logMp(`\u4F60\xB7\u5947\u8FF9\u6280\u80FD\uFF1A${h.roundFlags.declare ? "\u51C6\u5907\u5BA3\u8A00" : "\u53D6\u6D88\u5BA3\u8A00"}\u3002`, "skill");
    }
    if (key === "aurora") {
      h.fieldUses.aurora--;
      registerMpField(h, "aurora");
    }
    if (key === "singularity") {
      const t = await chooseMpTargetInteractive(h, false, "\u4EE4\u8C01\u8FDB\u5165\u6613\u4F24\uFF1F");
      if (t) {
        h.roundFlags.singularityUsed = true;
        h.roundFlags.attackPenalty = (h.roundFlags.attackPenalty || 0) + 0.5;
        t.vulnerable += 0.5;
        logMp(`\u4F60\xB7\u5947\u70B9\u6280\u80FD\uFF1A${t.name}\u672C\u56DE\u5408\u6613\u4F240.5\u3002`, "skill");
      }
    }
    if (key === "singularityField") {
      h.fieldUses.singularity--;
      registerMpField(h, "singularity");
    }
    if (key === "shepherdRecharge") {
      const choices = aliveMp().filter((x) => x.id !== h.id && !hasMpSkill(x, "pioneer") && mpLimitedUseOptions(x).length);
      const value = await chooseMpOption("\u7267\u7F8A\u4EBA\uFF1A\u4E3A\u8C01\u8865\u5145\u9650\u6B21\u6280\u80FD\u6B21\u6570\uFF1F", choices.map((x) => ({ value: String(x.id), label: x.name })));
      const t = choices.find((x) => x.id === Number(value));
      if (t) {
        const options = mpLimitedUseOptions(t);
        const picked = await chooseMpOption(`\u8865\u5145${t.name}\u7684\u54EA\u4E00\u9879\u4E3B\u52A8\u6280\u80FD\uFF1F`, options.map((x) => ({ value: x.value, label: `${x.label} \xB7 \u5F53\u524D${x.remaining}\u6B21` })));
        const entry = options.find((x) => x.value === picked);
        if (entry) {
          h.shepherdUses.recharge--;
          entry.apply();
          logMp(`\u4F60\xB7\u7267\u7F8A\u4EBA\u6280\u80FD\uFF1A\u8865\u5145${t.name}\u7684${entry.label}\u6B21\u6570\u3002`, "skill");
        }
      }
    }
    if (key === "shepherdHeal") {
      const choices = aliveMp().filter((x) => !hasMpSkill(x, "pioneer"));
      const value = await chooseMpOption("\u4EE4\u8C01\u589E\u52A01\u8840\uFF1F", choices.map((x) => ({ value: String(x.id), label: x.name })));
      const t = choices.find((x) => x.id === Number(value));
      if (t) {
        h.shepherdUses.heal--;
        gainHp258(t, 1);
        t.maxHp = Math.max(t.maxHp, t.hp);
        logMp(`\u4F60\xB7\u7267\u7F8A\u4EBA\u6280\u80FD\uFF1A${t.name}+1\u8840\u3002`, "skill");
      }
    }
    if (key === "shepherdField") {
      h.shepherdUses.field--;
      registerMpField(h, "shepherd");
    }
    if (key === "nightmare") {
      const t = await chooseMpTargetInteractive(h, false, "\u9009\u62E9\u68A6\u9B47\u6807\u8BB0");
      if (t) {
        t.markedBy = h.id;
        h.markedTarget = t.id;
        h.nightmareClock = 6;
        logMp(`\u4F60\xB7\u68A6\u9B47\u6280\u80FD\uFF1A\u6807\u8BB0${t.name}\u3002`, "skill");
      }
    }
    if (key === "judgeArm") {
      const legal = mpJudgeLegalMoves(h), options = legal.map((move2) => ({ value: move2, label: `${skillMove(move2).name} \xB7 ${MOVES[move2].cost}\u953B` }));
      options.push({ value: "cancel", label: "\u53D6\u6D88\u5BA1\u5224\u54CD\u5E94" });
      const move = await chooseMpOption("\u5BA1\u5224\u8005\uFF1A\u9009\u62E9\u8FFD\u52A0\u5BF9\u5C40\u884C\u52A8", options);
      if (move == null) return;
      h.judgeArmed = move !== "cancel";
      h.judgeMove = h.judgeArmed ? move : null;
      logMp(`\u4F60\xB7\u5BA1\u5224\u8005\u6280\u80FD\uFF1A${h.judgeArmed ? `\u5DF2\u51C6\u5907\u4EE5${skillMove(move).name}\u54CD\u5E94\u4E0B\u4E00\u6B21\u4F24\u5BB3` : "\u53D6\u6D88\u54CD\u5E94"}\u3002`, "skill");
    }
    if (key === "magicianArm") {
      const choices = [h, ...alliesOf(h)];
      const value = await chooseMpOption("\u9009\u62E9\u9B54\u672F\u66FF\u8EAB", choices.map((x) => ({ value: String(x.id), label: `${x.name} \xB7 \u653B\u51FB${formatNumber(x.attack)}` })));
      if (value != null) {
        h.magicianTarget = Number(value);
        logMp(`\u4F60\xB7\u9B54\u672F\u5E08\u6280\u80FD\uFF1A\u5DF2\u9009\u62E9${mpState.fighters[h.magicianTarget].name}\u4F5C\u4E3A\u66FF\u8EAB\u3002`, "skill");
      }
    }
    if (key === "monsterGesture") {
      const value = await chooseMpOption("\u9009\u62E9\u602A\u517D\u624B\u52BF", ["\u77F3\u5934", "\u526A\u5200", "\u5E03"].map((x) => ({ value: x, label: x })));
      if (value != null) {
        h.monsterGesture = value;
        logMp(`\u4F60\xB7\u602A\u517D\u6280\u80FD\uFF1A\u5DF2\u51C6\u5907${value}\u3002`, "skill");
      }
    }
    if (key === "blackEmperorGift") {
      const choices = [];
      for (const target2 of aliveMp().filter((x) => !hasMpSkill(x, "pioneer"))) {
        if (target2.id !== h.id) choices.push({ value: `fighter:${target2.id}`, label: `${target2.name}\u672C\u4F53 \xB7 ${target2.shields}\u62A4\u76FE` });
        if (target2.dragon > 0) choices.push({ value: `dragon:${target2.id}`, label: `${target2.name}\u7684\u9F99 \xB7 ${target2.dragonShields || 0}\u62A4\u76FE` });
        if (target2.doll > 0) choices.push({ value: `doll:${target2.id}`, label: `${target2.name}\u7684\u79D8\u5076 \xB7 ${target2.dollShields || 0}\u62A4\u76FE` });
      }
      const value = await chooseMpOption("\u5C06\u672C\u4F53\u4E0A\u76841\u62A4\u76FE\u8F6C\u79FB\u5230\u54EA\u91CC\uFF1F", choices), [kind, idText] = String(value || "").split(":"), target = mpState.fighters.find((x) => x.id === Number(idText));
      if (target && ["fighter", "dragon", "doll"].includes(kind)) {
        h.shields--;
        if (kind === "fighter") target.shields++;
        else if (kind === "dragon") target.dragonShields = (target.dragonShields || 0) + 1;
        else target.dollShields = (target.dollShields || 0) + 1;
        h.roundFlags.emperorGifted = true;
        const label = kind === "fighter" ? target.name : `${target.name}\u7684${kind === "dragon" ? "\u9F99" : "\u79D8\u5076"}`;
        logMp(`\u4F60\xB7\u9ED1\u7687\u5E1D\u6280\u80FD\uFF1A\u5C06\u672C\u4F53\u4E0A\u76841\u62A4\u76FE\u8F6C\u79FB\u7ED9${label}\uFF1B\u8BE5\u62A4\u76FE\u6210\u4E3A\u76EE\u6807\u7684\u5BA2\u89C2\u5C5E\u6027\u3002`, "skill");
      }
    }
    if (key === "damageOrder") {
      const value = await chooseMpOption("\u8C03\u6574\u975E\u771F\u5B9E\u4F24\u5BB3\u7684\u627F\u53D7\u987A\u5E8F", [{ value: "dragon,doll", label: "\u9F99 \u2192 \u79D8\u5076 \u2192 \u672C\u4F53" }, { value: "doll,dragon", label: "\u79D8\u5076 \u2192 \u9F99 \u2192 \u672C\u4F53" }]);
      if (value) {
        h.damageOrder = value.split(",");
        logMp(`\u4F60\u8C03\u6574\u627F\u4F24\u987A\u5E8F\uFF1A${h.damageOrder.map((x) => x === "dragon" ? "\u9F99" : "\u79D8\u5076").join(" \u2192 ")} \u2192 \u672C\u4F53`, "skill");
      }
    }
    if (key === "saintTarget") {
      const choices = aliveMp().filter((x) => x.id !== h.id && !hasMpSkill(x, "pioneer"));
      const value = await chooseMpOption("\u5723\u6597\u58EB\uFF1A\u9884\u9009\u5931\u76FE\u6280\u80FD\u76EE\u6807", choices.map((x) => ({ value: String(x.id), label: `${x.name} \xB7 ${formatNumber(x.hp)}\u8840` })));
      const target = choices.find((x) => x.id === Number(value));
      if (target) {
        h.saintTarget = target.id;
        logMp(`\u4F60\xB7\u5723\u6597\u58EB\u6280\u80FD\uFF1A\u5DF2\u9884\u9009${target.name}\u3002`, "skill");
      }
    }
    const activeEvents = [];
    await settleMpDeaths(activeEvents);
    activeEvents.forEach((x) => logMp(x, x.includes("\u6B7B\u4EA1") ? "hit" : "skill"));
    if (!checkMpWinner()) renderMp();
  }
  function mpFisherCanChallengeSkill(key) {
    return !["nightField", "sunField", "bulwark", "aurora", "singularityField", "shepherdField", "saintTarget", "monsterGesture", "magicianArm", "judgeArm"].includes(key);
  }
  async function playMpStep(humanMove) {
    if (!mpState || mpState.over) return;
    mpState.phase = "combat";
    document.querySelectorAll(".mp-move").forEach((b) => b.disabled = true);
    const rollback = captureMpTransaction();
    const actions = /* @__PURE__ */ new Map();
    mpState.playerTargetTeam = null;
    mpState.playerAudienceTarget = null;
    if (humanMove === "exit") {
      const target = await chooseMpTargetInteractive(getHuman(), false, "\u89C2\u4F17\uFF1A\u4E0B\u4E00\u56DE\u5408\u4EE4\u8C01\u4E0D\u53C2\u4E0E\uFF1F");
      if (!target) {
        renderMp();
        return;
      }
      mpState.playerAudienceTarget = target.id;
    }
    try {
      const aiWorld = createMpAiWorld();
      for (const f of aiWorld.active) actions.set(f.id, f.human ? humanMove : chooseMpAiMove(f, aiWorld));
      await beat();
      await beat();
      await MULTIPLAYER_ENGINE.resolveActions(actions);
    } catch (error) {
      console.error("\u591A\u4EBA\u7ED3\u7B97\u5931\u8D25", error);
      restoreMpTransaction(rollback);
      logMp("\u672C\u6B21\u51FA\u624B\u7ED3\u7B97\u5F02\u5E38\uFF0C\u5DF2\u6062\u590D\u64CD\u4F5C\uFF1B\u672C\u6B21\u884C\u52A8\u4E0D\u8BA1\u5165\u7ED3\u679C\u3002", "hit");
      $("mpStatus").textContent = "\u7ED3\u7B97\u9047\u5230\u5F02\u5E38\uFF0C\u64CD\u4F5C\u5DF2\u7ECF\u6062\u590D\uFF0C\u8BF7\u91CD\u65B0\u51FA\u62DB\u3002";
      renderMp();
    }
  }
  function captureMpTransaction() {
    return { ...structuredClone({ fighters: mpState.fighters, round: mpState.round, step: mpState.step, weaponHistory: mpState.weaponHistory, fieldDeclarations: mpState.fieldDeclarations, fieldConflict: mpState.fieldConflict, global: mpState.global, playerTargetTeam: mpState.playerTargetTeam, playerAudienceTarget: mpState.playerAudienceTarget, fishHookOwner: mpState.fishHookOwner, damageLastRound: mpState.damageLastRound, phase: mpState.phase, responsePending: mpState.responsePending, currentActions: mpState.currentActions, currentAttackContext: mpState.currentAttackContext }), log: mpState.log.slice() };
  }
  function restoreMpTransaction(snapshot) {
    var _a;
    const { log, ...stateSnapshot } = snapshot;
    Object.assign(mpState, structuredClone(stateSnapshot), { log: log.slice() });
    if ((_a = $("mpJudgeDuelDialog")) == null ? void 0 : _a.open) $("mpJudgeDuelDialog").close();
  }
  function chooseMpAiMove(f, world) {
    var _a;
    const legal = mpLegalMoves(f);
    const context = createMpAiContext(f, world);
    const scored = legal.map((key) => ({ key, score: scoreMpAiMove(f, key, context) }));
    const best = Math.max(...scored.map((x) => x.score)), temperature = 0.6 + context.profile.spread * 0.4;
    const weights = scored.map((x) => Math.exp(Math.max(-30, (x.score - best) / temperature)));
    let roll = Math.random() * weights.reduce((sum, w) => sum + w, 0);
    for (let i = 0; i < scored.length; i++) {
      roll -= weights[i];
      if (roll <= 0) return scored[i].key;
    }
    return ((_a = scored[0]) == null ? void 0 : _a.key) || "guard";
  }
  function mpAiIncome(f, key) {
    if (key === "forge") return skillEnabledMp(f, "generalist") && f.lastMove === "forge" ? 2 : 1;
    return (skillEnabledMp(f, "guardian") && ["guard", "catch"].includes(key) ? 0.25 : 0) + (skillEnabledMp(f, "observer") && key === "catch" ? 1 : 0);
  }
  function mpAiForecast(f) {
    const moves = mpLegalMoves(f).map((key) => {
      const cost = mpMoveCost(f, key), attack = skillMove(key).type === "attack" ? makeMpAttack(f, key) : null;
      let weight = attack ? (0.6 + attack.level * 0.1) / (1 + cost * 0.18) : key === "forge" ? 2.4 / (1 + f.energy * 0.35) : key === "flash" ? 0.35 : key === "catch" ? 0.6 : 0.9;
      if (key === f.lastMove) weight *= key === f.previousMove ? 2.5 : 1.5;
      if (key !== "forge") weight += mpAiIncome(f, key);
      if (key === "void") weight *= 2;
      return { key, attack, weight };
    });
    const total = moves.reduce((sum, m) => sum + m.weight, 0);
    return moves.map((m) => ({ ...m, probability: m.weight / total }));
  }
  function mpAiCanHit(f, key, attack, ownAttack) {
    var _a;
    if (f.judgementHitThisRound) return false;
    if (keeperAttack258(attack)) return true;
    if (key === "flash" && skillEnabledMp(f, "moon") && attack.attacker.team !== f.team) return false;
    if (((_a = ownAttack || (skillMove(key).type === "attack" ? makeMpAttack(f, key) : null)) == null ? void 0 : _a.level) >= attack.level) return false;
    return !mpDefensePreview(f, key, attack).blocked;
  }
  function mpAiHitChance(f, forecast, attack) {
    return forecast.reduce((sum, m) => sum + (mpAiCanHit(f, m.key, attack, m.attack) ? m.probability : 0), 0);
  }
  function createMpAiWorld() {
    const active = aliveMp().filter((x) => !x.skipped), forecasts = new Map(active.map((x) => [x.id, mpAiForecast(x)])), threats = [];
    for (const source of active) {
      for (const option of forecasts.get(source.id)) {
        const attack = option.attack;
        if (!attack || attack.declared) continue;
        const friendly = source.friendlyFire || mpState.global.friendlyFireTeams.has(source.team);
        const targets = active.filter((x) => x.id !== source.id && (friendly || x.team !== source.team));
        const chances = new Map(targets.map((x) => [x.id, mpAiHitChance(x, forecasts.get(x.id), attack)]));
        const targetMass = [...chances.values()].reduce((sum, p) => sum + p, 0);
        threats.push({ attack, chances, probability: option.probability, targetMass, multi: attack.key === "void" || skillEnabledMp(source, "aurora") || mpState.global.multiHitTeams.has(source.team) });
      }
    }
    return { active, forecasts, threats };
  }
  function createMpAiContext(f, world = createMpAiWorld()) {
    return {
      enemies: world.active.filter((x) => x.team !== f.team),
      allies: world.active.filter((x) => x.team === f.team && x.id !== f.id),
      forecasts: world.forecasts,
      attacks: new Map(world.threats.filter((t) => t.attack.attacker.id === f.id).map((t) => [t.attack.key, t])),
      threats: world.threats.filter((t) => t.chances.has(f.id)).map((t) => ({ ...t, targetMass: Math.max(0, t.targetMass - t.chances.get(f.id)) })),
      profile: mpAiLevel()
    };
  }
  function scoreMpAiMove(f, key, context = createMpAiContext(f)) {
    var _a;
    const { enemies, allies, forecasts, threats, profile } = context, move = skillMove(key);
    const prediction = context.attacks.get(key), attack = (prediction == null ? void 0 : prediction.attack) || (move.type === "attack" ? makeMpAttack(f, key) : null);
    const cost = attack && skillEnabledMp(f, "whiteTower") && whiteTowerRefunds(key, mpState.weaponHistory || []) ? 0 : mpMoveCost(f, key);
    let score = mpAiIncome(f, key) * (1.2 + 0.8 / (1 + f.energy * 0.4)) - cost * 0.32;
    let safe = 1;
    for (const threat of threats) {
      if (mpAiCanHit(f, key, threat.attack, attack)) safe *= 1 - threat.probability / (threat.multi ? 1 : 1 + threat.targetMass);
    }
    const protection = f.shields + (f.dragon || 0) + (f.doll || 0), health = f.hp + protection * 0.6;
    score -= (1 - safe) * (2.3 + profile.risk + Math.max(0, 2 - health) * 4.4);
    if (attack && !attack.declared) {
      let miss = 1, mass = 0, value = 0, noResistance = 1;
      const friendly = f.friendlyFire || mpState.global.friendlyFireTeams.has(f.team);
      for (const target of friendly ? [...enemies, ...allies] : enemies) {
        const forecast = forecasts.get(target.id), chance = (_a = prediction == null ? void 0 : prediction.chances.get(target.id)) != null ? _a : mpAiHitChance(target, forecast, attack);
        miss *= 1 - chance;
        mass += chance;
        const damage = Math.max(0, attack.damage + (target.vulnerable || 0));
        const buffer = attack.trueDamage ? 0 : (target.shields || 0) + (target.dragon || 0) + (target.doll || 0);
        value += chance * (target.team === f.team ? -1.25 : 1) * (Math.min(2, damage) * 2.6 + (damage > 0 && target.hp + buffer <= damage ? 1.2 : 0) + (target.lastMove === "forge" ? 0.5 : 0) + Math.min(1, target.energy / 6) * 0.5);
        if (target.team !== f.team && attack.level >= 3) noResistance *= 1 - forecast.reduce((sum, m) => {
          var _a2;
          return sum + (((_a2 = m.attack) == null ? void 0 : _a2.level) === attack.level ? m.probability : 0);
        }, 0);
      }
      const multi = key === "void" || skillEnabledMp(f, "aurora") || mpState.global.multiHitTeams.has(f.team);
      score += mass ? noResistance * (multi ? Math.min(3, mass) : 1 - miss) * value / mass : 0;
      if (key === "dragonFang" && skillEnabledMp(f, "dragonKnight") && f.dragon <= 0) score += 0.4 * (1 - miss);
    }
    if (key === "flash" && skillEnabledMp(f, "moon")) score += Math.min(3, threats.reduce((sum, t) => sum + t.probability * t.attack.damage, 0));
    return score;
  }
  function mpJudgeLegalMoves(f) {
    return MOVE_KEYS.filter((key) => key !== "scissors" && MOVES[key].cost <= f.energy);
  }
  function chooseMpJudgeAiMove(f) {
    var _a;
    const legal = mpJudgeLegalMoves(f);
    if (f.energy === 0 && legal.includes("forge")) return "forge";
    const attacks = legal.filter((key) => MOVES[key].type === "attack").sort((a, b) => MOVES[b].level - MOVES[a].level);
    const attackRate = (_a = { easy: 0.48, normal: 0.58, hard: 0.7, hell: 0.82 }[data.settings.difficulty]) != null ? _a : 0.58;
    if (attacks.length && Math.random() < attackRate) return attacks[Math.floor(Math.random() * (data.settings.difficulty === "hell" ? 1 : Math.min(2, attacks.length)))];
    const defense = legal.filter((key) => ["guard", "catch", "flash"].includes(key));
    return defense[Math.floor(Math.random() * defense.length)] || legal[Math.floor(Math.random() * legal.length)] || "forge";
  }
  function createMultiplayerStepContext(actions) {
    return {
      phase: "collect-actions",
      actions,
      events: [],
      attacks: [],
      resisted: /* @__PURE__ */ new Set(),
      resetReasons: [],
      attackResults: [],
      damageEvents: [],
      actionCommits: /* @__PURE__ */ new Map(),
      unestablishedAttacks: []
    };
  }
  function spendSuppressedWeapon(who, moveKey) {
    const skill = who === "player" ? data.settings.playerSkill : data.settings.aiSkill, cost = moveCost(moveKey, skill, state[who]);
    state[who].energy = Math.max(0, state[who].energy - cost);
    return [`${who === "player" ? "\u4F60" : "AI"}\xB7\u5947\u8FF9\u88C1\u5B9A\uFF1A\u540C\u7EA7\u6B66\u5668\u4E0D\u80FD\u5EFA\u7ACB\uFF0C\u4F46\u5DF2\u652F\u4ED8${formatNumber(cost)}\u953B\u4E14\u4E0D\u8FD4\u8FD8`];
  }
  function commitMultiplayerActions(context) {
    var _a;
    const { actions, events } = context;
    context.phase = "commit-actions";
    mpState.currentActions = actions;
    mpState.monsterDuels = /* @__PURE__ */ new Map();
    for (const f of aliveMp()) {
      f.hitThisStep = false;
      const key = actions.get(f.id);
      if (!key) continue;
      if (f.skipped || !mpLegalMoves(f).includes(key)) throw new Error("\u975E\u6CD5\u6216\u88AB\u592A\u9633\u9886\u57DF\u7981\u6B62\u7684\u884C\u52A8");
      f.previousMove = f.lastMove;
      f.lastMove = key;
      const beforeEnergy = f.energy;
      if (key === "exit") {
        f.energy -= 2;
        f.retreating = true;
        f.activeUses.audience--;
        const targets = enemiesOf(f).filter((x) => !hasMpSkill(x, "pioneer"));
        const t = f.human ? mpState.fighters[mpState.playerAudienceTarget] : targets[Math.floor(Math.random() * targets.length)];
        f.audienceTarget = (_a = t == null ? void 0 : t.id) != null ? _a : null;
        events.push(`${f.name}\xB7\u89C2\u4F17\u6280\u80FD\uFF1A\u9000\u573A\u5E76\u7ED3\u675F\u5F53\u524D\u56DE\u5408\uFF1B\u672C\u6B21\u5DF2\u5EFA\u7ACB\u653B\u51FB\u4ECD\u53EF\u547D\u4E2D\u9000\u573A\u8005`);
        context.resetReasons.push("audience-exit");
        continue;
      }
      const cost = mpMoveCost(f, key);
      f.energy = Math.max(0, f.energy - cost);
      if (key === "bigShield") f.bigShieldUsed = true;
      let whiteTowerRefund = 0;
      f.defenseQuota = key === "catch" || key === "flash" ? MultiplayerRules.defenseQuotaPerAction : 0;
      f.selfDefenseForfeited = false;
      const m = skillMove(key);
      if (skillEnabledMp(f, "guardian")) {
        if (key === "guard") f.energy += 0.25;
        if (key === "catch") f.energy += 0.25;
      }
      if (skillEnabledMp(f, "observer") && key === "catch") {
        f.energy += 1;
        f.observerStance = "rage";
      }
      if (skillEnabledMp(f, "dragonKnight") && key === "catch") f.dragonCatch++;
      if (skillEnabledMp(f, "whiteTower") && whiteTowerRefunds(key, mpState.weaponHistory || [])) {
        f.energy += cost;
        whiteTowerRefund = cost;
        events.push(`${f.name}\xB7\u767D\u5854\u6280\u80FD\uFF1A\u672C\u6B66\u5668\u6B64\u524D\u672A\u88AB\u53CC\u65B9\u4F7F\u7528\uFF0C\u6682\u8FD4\u8FD8${formatNumber(cost)}\u953B`);
      }
      context.actionCommits.set(f.id, { key, beforeEnergy, cost, afterEnergy: f.energy, paid: cost > 0, whiteTowerRefund });
    }
    const proposed = aliveMp().filter((f) => {
      var _a2;
      return actions.has(f.id) && ((_a2 = skillMove(actions.get(f.id))) == null ? void 0 : _a2.type) === "attack";
    }).map((f) => makeMpAttack(f, actions.get(f.id)));
    context.attacks = proposed.filter((attack) => {
      const blocker = aliveMp().find((f) => {
        var _a2;
        return f.team !== attack.attacker.team && skillEnabledMp(f, "miracle") && f.roundFlags.declare && ((_a2 = skillMove(actions.get(f.id))) == null ? void 0 : _a2.level) === attack.level;
      });
      if (!blocker) return true;
      attack.suppressed = true;
      context.unestablishedAttacks.push(attack);
      const commit = context.actionCommits.get(attack.attacker.id);
      if (commit == null ? void 0 : commit.whiteTowerRefund) {
        attack.attacker.energy = Math.max(0, attack.attacker.energy - commit.whiteTowerRefund);
        events.push(`${attack.attacker.name}\xB7\u767D\u5854\u6280\u80FD\uFF1A\u6B66\u5668\u88AB\u5947\u8FF9\u963B\u6B62\u5EFA\u7ACB\uFF0C\u4E0D\u6EE1\u8DB3\u201C\u4F7F\u7528\u6B66\u5668\u201D\uFF0C\u64A4\u9500${formatNumber(commit.whiteTowerRefund)}\u953B\u8FD4\u8FD8`);
        commit.whiteTowerRefund = 0;
        commit.afterEnergy = attack.attacker.energy;
      }
      events.push(`${blocker.name}\xB7\u5947\u8FF9\u5BA3\u8A00\uFF1A${attack.attacker.name}\u65E0\u6CD5\u4F7F\u7528\u540C\u7EA7\u6B66\u5668\uFF1B\u8BE5\u653B\u51FB\u4E0D\u80FD\u5EFA\u7ACB\uFF0C\u4E0D\u53C2\u4E0E\u62B5\u5200\uFF0C\u4E5F\u4E0D\u4EA7\u751F\u52A8\u4F5C\u9632\u5FA1\u7B49\u7EA7`);
      RuleTrace.emit(context, "MIRACLE_PREVENT_ESTABLISHMENT", `${attack.attacker.name}\u7684${skillMove(attack.key).name}\u672A\u80FD\u5EFA\u7ACB`, `${blocker.name}\u7684\u5947\u8FF9\u5BA3\u8A00\u4EE4\u540C\u7EA7\u654C\u65B9\u65E0\u6CD5\u4F7F\u7528\u6B66\u5668\uFF1B\u5DF2\u652F\u4ED8\u953B\u4E0D\u8FD4\u8FD8`);
      return false;
    });
    for (const attack of context.attacks) RuleTrace.emit(context, "ACTION_DEFENSE_LEVEL", `${attack.attacker.name}\u7684\u653B\u51FB\u52A8\u4F5C\u540C\u65F6\u5177\u6709\u9632\u5FA1\u7B49\u7EA7`, `\u9632\u5FA1\u7B49\u7EA7\u4E3A[0, ${formatNumber(attack.level)}]\uFF1B\u53EF\u9632\u5FA1\u8BE5\u8303\u56F4\u5185\u7684\u653B\u51FB`, { fighter: attack.attacker.id, level: attack.level });
  }
  async function resolveMoonCountersBeforeResistance(context) {
    const { actions, attacks, events } = context;
    const moons = aliveMp().filter((f) => skillEnabledMp(f, "moon") && actions.get(f.id) === "flash" && (f.defenseQuota || 0) > 0);
    if (!moons.length) return;
    const canReachMoon = (attack, moon2) => !attack.done && !attack.declared && !keeperAttack258(attack) && attack.attacker.team !== moon2.team && mpBaseAttackCandidates(attack, actions, attacks).some((candidate) => candidate.id === moon2.id);
    const eligible = moons.filter((moon2) => attacks.some((attack) => canReachMoon(attack, moon2)));
    if (!eligible.length) return;
    const moon = eligible[Math.floor(Math.random() * eligible.length)];
    context.moonResolved = true;
    context.moonResolver = moon.id;
    const reflected = attacks.filter((attack) => canReachMoon(attack, moon));
    moon.defenseQuota = Math.max(0, (moon.defenseQuota || 0) - 1);
    for (const attack of reflected) {
      attack.done = true;
      attack.moonCountered = true;
      const counterDamage = Math.max(0, attack.attacker.attack);
      const dealt = counterDamage > 0 ? await applyMpDamage(attack.attacker, { attacker: moon, damage: counterDamage, trueDamage: false }, events) : 0;
      if (dealt > 0) await afterMpDamage(moon, attack.attacker, dealt, events, { allowJudge: true });
      events.push(`${moon.name}\xB7\u6708\u4EAE\u9632\u53CD\uFF1A\u5728\u62B5\u5200\u524D\u9632\u4F4F\u5E76\u53CD\u5F39${attack.attacker.name}\u7684${skillMove(attack.key).name}\uFF0C\u53CD\u4F24\u503C${formatNumber(counterDamage)}\uFF0C\u5B9E\u9645\u4F5C\u7528${formatNumber(dealt)}${attack.attacker.team === moon.team ? "\uFF08\u53CB\u4F24\u961F\u53CB\u7684\u653B\u51FB\u540C\u6837\u53EF\u4EE5\u9632\u53CD\uFF09" : ""}`);
      context.attackResults.push({ level: attack.level, type: "moon-counter", attacker: attack.attacker.id, defender: moon.id, damage: dealt });
    }
    if (reflected.length) {
      context.resetReasons.push("moon-counter");
      RuleTrace.emit(context, "MOON_COUNTER_ALL", `${moon.name}\u7684\u9632\u53CD\u5148\u4E8E\u62B5\u5200\u5904\u7406\u672C\u6B21\u51FA\u624B`, `${reflected.map((a) => `${a.attacker.name}\u7684${skillMove(a.key).name}`).join("\u3001")}\u5168\u90E8\u88AB\u9632\u4F4F\u5E76\u5206\u522B\u53CD\u5F39\uFF1B\u8FD9\u4E9B\u5200\u4E0D\u518D\u53C2\u4E0E\u62B5\u5200`);
    }
  }
  async function resolveMultiplayerAttackQueue(context) {
    const { actions, attacks, events, resisted } = context;
    context.phase = "resistance-and-judgement";
    mpState.currentAttackContext = context;
    await resolveMoonCountersBeforeResistance(context);
    while (attacks.some((a) => !a.done)) {
      const remaining = attacks.filter((a) => !a.done);
      const maxLevel = Math.max(...remaining.map((a) => a.level));
      const top = remaining.filter((a) => a.level === maxLevel);
      if (mpShouldResist(top, maxLevel)) {
        top.forEach((a) => {
          a.done = true;
          a.resisted = true;
          resisted.add(a.attacker.id);
        });
        events.push(`${formatNumber(maxLevel)}\u7EA7\u62B5\u5200\uFF1A${top.map((a) => a.attacker.name).join("\u3001")}\u5747\u672A\u9020\u6210\u4F24\u5BB3\uFF0C\u4F18\u5148\u4E8E\u5BA3\u8A00\u548C\u9632\u5FA1\u7ED3\u7B97`);
        RuleTrace.emit(context, "RESISTANCE", `${formatNumber(maxLevel)}\u7EA7\u653B\u51FB\u53D1\u751F\u62B5\u5200`, `${top.map((a) => `${a.attacker.name}\uFF08\u9635\u8425${a.attacker.team + 1}\uFF09`).join("\u3001")}\u6765\u81EA\u654C\u5BF9\u9635\u8425\u4E14\u653B\u51FB\u7B49\u7EA7\u76F8\u540C\uFF1B\u8BE5\u7B49\u7EA7\u5168\u5458\u4E0D\u53D7\u4F24\uFF0C\u7EE7\u7EED\u5224\u66F4\u4F4E\u7B49\u7EA7`);
        context.attackResults.push({ level: maxLevel, type: "resistance", attackers: top.map((a) => a.attacker.id) });
        continue;
      }
      const nextAttack = selectNextMultiplayerAttack(remaining);
      nextAttack.done = true;
      const hit = await judgeMpAttack(nextAttack, actions, events);
      context.attackResults.push({ level: nextAttack.level, damage: nextAttack.damage, type: "judgement", attacker: nextAttack.attacker.id, ...hit });
      if (hit.reset) context.resetReasons.push(hit.reason || "attack-resolution");
    }
  }
  function selectNextMultiplayerAttack(attacks) {
    const max = Math.max(...attacks.map((a) => a.level));
    const same = attacks.filter((a) => a.level === max);
    return same[Math.floor(Math.random() * same.length)] || null;
  }
  function mpActionDefenseCoversAttack(fighter, judgementLevel, attacks) {
    return attacks.some((attack) => attack.attacker.id === fighter.id && attack.level >= judgementLevel);
  }
  async function settleMultiplayerForgeAndRoundSkills(context) {
    const { actions, attacks, events } = context;
    context.phase = "post-attack";
    for (const f of aliveMp()) {
      const move = skillMove(actions.get(f.id));
      if (move == null ? void 0 : move.gain) {
        const boosted = skillEnabledMp(f, "generalist") && f.previousMove === "forge";
        if (mpShouldGainForge(f, move)) {
          f.energy += boosted ? 2 : move.gain;
          if (boosted) events.push(`${f.name}\xB7\u901A\u8BC6\u8005\u6280\u80FD\uFF1A\u672C\u6B21\u953B\u9020\u83B7\u5F972\u953B`);
        } else events.push(`${f.name}\u953B\u9020\u65F6\u88AB\u653B\u51FB\u547D\u4E2D\uFF0C\u672A\u83B7\u5F97\u80FD\u91CF`);
        if (boosted && !mpShouldGainForge(f, move)) events.push(`${f.name}\xB7\u901A\u8BC6\u8005\u6280\u80FD\uFF1A\u9996\u6B21\u953B\u9020\u5F3A\u5316\u5DF2\u4F7F\u7528\uFF0C\u4F46\u56E0\u653B\u51FB\u547D\u4E2D\u672A\u83B7\u5F97\u953B`);
        f.boostForge = false;
      }
    }
    for (const attack of attacks.filter((a) => skillEnabledMp(a.attacker, "storm") && a.key === "katana")) attack.attacker.stormDiscount = attack.hit ? 0 : 1;
    for (const attack of attacks.filter((a) => !a.suppressed)) if (!mpState.weaponHistory.includes(attack.key)) mpState.weaponHistory.push(attack.key);
  }
  function settleMultiplayerRoundEndSkills(context) {
    const { events } = context;
    for (const f of aliveMp()) {
      restoreTyrant258(f, mpState.round, events);
      if (skillEnabledMp(f, "demon")) {
        f.attack += 0.5;
        events.push(`${f.name}\xB7\u6076\u9B54\u6280\u80FD\uFF1A\u56DE\u5408\u7ED3\u675F\uFF0C\u653B\u51FB\u63D0\u53470.5`);
      }
      if (skillEnabledMp(f, "nightmare")) {
        const target = mpState.fighters.find((x) => x.markedBy === f.id && x.alive);
        if (!target) continue;
        f.nightmareClock--;
        events.push(`${f.name}\xB7\u68A6\u9B47\u6280\u80FD\uFF1A\u56DE\u5408\u7ED3\u675F\uFF0C${target.name}\u5269\u4F59${Math.max(0, f.nightmareClock)}\u56DE\u5408`);
        if (f.nightmareClock <= 0) {
          target.attackLethal = false;
          target.hp = 0;
          target.lastDamageSource = f.id;
          events.push(`${f.name}\xB7\u68A6\u9B47\u6280\u80FD\uFF1A\u671F\u9650\u7ED3\u675F\uFF0C${target.name}\u76F4\u63A5\u6B7B\u4EA1`);
          f.skills.push(...mpRemainingSkills(target).filter((s) => !hasMpSkill(f, s)));
        }
      }
    }
  }
  async function finalizeMultiplayerStep(context) {
    var _a;
    const { events, resisted } = context;
    context.phase = "death-and-reset";
    await settleMpDeaths(events);
    const shouldReset = context.resetReasons.length > 0;
    if (shouldReset && new Set(aliveMp().map((f) => f.team)).size > 1) {
      await roundJudgesMp258(events);
      settleMultiplayerRoundEndSkills(context);
      await settleMpDeaths(events);
    }
    mpState.damageLastRound = mpState.fighters.some((f) => f.dealtDamageLastRound || f.tookDamageLastRound);
    events.forEach((x) => logMp(x, x.includes("\u4F24\u5BB3") || x.includes("\u6B7B\u4EA1") ? "hit" : "normal"));
    if ((_a = context.ruleTrace) == null ? void 0 : _a.length) logMp("\u5C55\u5F00\u67E5\u770B\u672C\u6B21\u51FA\u624B\u7684\u5B8C\u6574\u5224\u5B9A\u4F9D\u636E", "trace", { trace: context.ruleTrace });
    if (checkMpWinner()) return;
    if (shouldReset) {
      cleanupMpTemporarySkills();
      aliveMp().forEach((f) => f.energy = 0);
      mpState.weaponHistory = [];
      mpState.round++;
      mpState.step = 1;
      await beginMpRound();
    } else mpState.step++;
    $("mpStatus").textContent = shouldReset ? "\u6EE1\u8DB3\u91CD\u5F00\u6761\u4EF6\uFF1A\u6240\u6709\u5B58\u6D3B\u89D2\u8272\u953B\u6570\u5F52\u96F6\uFF0C\u5F00\u59CB\u65B0\u56DE\u5408\u3002" : resisted.size ? "\u53D1\u751F\u62B5\u5200\uFF1A\u953B\u6570\u4FDD\u7559\uFF0C\u7EE7\u7EED\u5F53\u524D\u56DE\u5408\u3002" : "\u672C\u6B21\u51FA\u624B\u672A\u6EE1\u8DB3\u91CD\u5F00\u6761\u4EF6\uFF0C\u7EE7\u7EED\u5F53\u524D\u56DE\u5408\u3002";
    context.phase = "complete";
    mpState.phase = shouldReset ? "round-start" : "combat";
    mpState.responsePending = false;
    renderMp();
  }
  async function resolveMpActions(actions) {
    const context = createMultiplayerStepContext(actions);
    commitMultiplayerActions(context);
    mpState.phase = "combat";
    mpState.responsePending = true;
    renderMp();
    $("mpStatus").textContent = "\u53CC\u65B9\u884C\u52A8\u5DF2\u7ECF\u9501\u5B9A\uFF0C\u73B0\u5728\u540C\u65F6\u63ED\u62DB\uFF1B\u968F\u540E\u6309\u653B\u51FB\u7B49\u7EA7\u9010\u7EA7\u5224\u5B9A\u3002";
    await beat();
    await resolveMultiplayerAttackQueue(context);
    await settleMultiplayerForgeAndRoundSkills(context);
    await finalizeMultiplayerStep(context);
    mpState.lastStepContext = context;
    return context;
  }
  function makeMpAttack(attacker, key) {
    const move = skillMove(key);
    let damage = attacker.attack - (attacker.roundFlags.attackPenalty || 0);
    if (skillEnabledMp(attacker, "observer")) damage *= attacker.observerStance === "rage" ? 2 : 0.5;
    if (skillEnabledMp(attacker, "tyrant") && attacker.hp <= 1) damage = 10;
    const assassinBonus = false;
    if (assassinBonus) damage += 0.5;
    const declared = skillEnabledMp(attacker, "miracle") && attacker.roundFlags.declare;
    const level = skillEnabledMp(attacker, "storm") && key === "katana" ? 1.5 : move.level;
    return { attacker, key, level, damage: Math.max(0, damage), trueDamage: skillEnabledMp(attacker, "sun"), declared, assassinBonus, targetTeam: attacker.human ? mpState.playerTargetTeam : null, done: false, hit: false };
  }
  async function applyHangedBoost(attack, events) {
    const attacker = attack.attacker;
    if (attack.hangedResolved || !skillEnabledMp(attacker, "hangedMan", "active")) return;
    attack.hangedResolved = true;
    let wanted = attacker.human ? attacker.hangedBoost || 0 : attacker.hp > 0 && Math.random() < 0.55 ? Math.min(attacker.hp, attacker.hp <= 1 ? attacker.hp : 0.5) : 0;
    if (attacker.human) {
      const values = [{ value: "0", label: "\u4E0D\u53D1\u52A8" }];
      for (let n = 0.5; n <= attacker.hp; n += 0.5) values.push({ value: String(n), label: `\u6263\u9664 ${formatNumber(n)} \u8840\uFF0C\u4F24\u5BB3 +${formatNumber(n)}${n === attacker.hp ? "\uFF08\u5C06\u6B7B\u4EA1\uFF09" : ""}` });
      const selected = await chooseMpOption(`\u5012\u540A\u4EBA\uFF1A${skillMove(attack.key).name}\u5DF2\u7ECF\u547D\u4E2D\uFF0C\u9009\u62E9\u6263\u8840\u589E\u4F24`, values, { cancelText: "\u4E0D\u53D1\u52A8" });
      wanted = Number(selected || 0);
    }
    const sacrifice = Math.max(0, Math.min(attacker.hp, wanted));
    attacker.hangedBoost = 0;
    if (sacrifice >= 0.5 && await mpActiveAllowed(attacker)) {
      const paid = commitHangedSacrifice(attacker, sacrifice, attacker.name, events, mpState.currentAttackContext);
      attack.damage += paid;
      $("mpStatus").textContent = `${attacker.name}\u53D1\u52A8\u5012\u540A\u589E\u4F24\uFF1A\u751F\u547D\u7ACB\u5373\u51CF\u5C11${formatNumber(paid)}\uFF0C\u672C\u5200\u4F24\u5BB3\u589E\u52A0\u7B49\u91CF\u3002`;
      renderMp();
    }
  }
  function commitHangedSacrifice(fighter, requested, label, events, context = null) {
    const before = Math.max(0, Number(fighter.hp) || 0), normalized = Math.floor(Math.max(0, Number(requested) || 0) * 2) / 2, paid = Math.min(before, normalized);
    if (paid <= 0) return 0;
    fighter.hp = Math.max(0, before - paid);
    fighter.lastHangedSacrifice = { before, paid, after: fighter.hp };
    const text = `${label}\xB7\u5012\u540A\u4EBA\u6280\u80FD\uFF1A\u653B\u51FB\u547D\u4E2D\u540E\u7ACB\u5373\u6263\u9664${formatNumber(paid)}\u8840\uFF08${formatNumber(before)}\u2192${formatNumber(fighter.hp)}\uFF09\uFF0C\u672C\u5200\u4F24\u5BB3\u589E\u52A0\u7B49\u91CF`;
    events.push(text);
    if (context) RuleTrace.emit(context, "HANGED_SACRIFICE", `${label}\u652F\u4ED8\u5012\u540A\u4EBA\u751F\u547D`, `${formatNumber(before)}\u2192${formatNumber(fighter.hp)}\uFF1B\u589E\u4F24${formatNumber(paid)}`);
    return paid;
  }
  async function judgeMpAttack(attack, actions, events) {
    const context = mpState.currentAttackContext;
    if (attack.declared) {
      RuleTrace.emit(context, "MIRACLE_SELF_MISS", `${attack.attacker.name}\u7684\u5BA3\u8A00\u653B\u51FB\u4E0D\u547D\u4E2D`, `\u8BE5\u653B\u51FB\u52A8\u4F5C\u5DF2\u7ECF\u6210\u7ACB\uFF0C\u5176\u9632\u5FA1\u7B49\u7EA7\u4ECD\u7136\u6709\u6548`);
      return { reset: false };
    }
    const candidates = mpBaseAttackCandidates(attack, actions, (context == null ? void 0 : context.attacks) || []);
    if (!candidates.length) {
      RuleTrace.emit(context, "NO_CANDIDATE", `${attack.attacker.name}\u7684${skillMove(attack.key).name}\u6CA1\u6709\u5408\u6CD5\u76EE\u6807`, `\u5019\u9009\u8005\u7684\u884C\u52A8\u9632\u5FA1\u7B49\u7EA7\u8986\u76D6\u672C\u6B21\u653B\u51FB\u3001\u5DF2\u7528\u5224\u5200\u540D\u989D\u6216\u5DF2\u9000\u573A`);
      return { reset: false };
    }
    if (attack.key === "void") {
      RuleTrace.emit(context, "VOID_EXPAND", `${skillMove(attack.key).name}\u5C55\u5F00\u56FA\u5B9A\u76EE\u6807\u5200`, `${candidates.map((f) => f.name).join("\u3001")}\u5404\u6709\u4E00\u628A\u56FA\u5B9A\u76EE\u6807\u5200`);
      let hitAny = false, defendedAny = false;
      for (const target of shuffleMp(candidates)) {
        const result2 = await resolveFixedMpTarget(attack, target, actions, events);
        hitAny = hitAny || result2.hit;
        defendedAny = defendedAny || result2.reset;
      }
      return { reset: hitAny || defendedAny, reason: hitAny ? "attack-hit" : defendedAny ? "catch-or-flash" : null };
    }
    const aurora = skillEnabledMp(attack.attacker, "aurora") || mpState.global.multiHitTeams.has(attack.attacker.team);
    if (aurora) {
      const copies = enemiesOf(attack.attacker).filter((f) => !f.skipped).length;
      RuleTrace.emit(context, "AURORA_EXPAND", `${skillMove(attack.key).name}\u590D\u5236\u4E3A${copies}\u628A\u76F8\u540C\u653B\u51FB`, `\u6BCF\u628A\u653B\u51FB\u5728\u547D\u4E2D\u524D\u72EC\u7ACB\u5224\u5200\uFF0C\u4E0D\u9884\u5148\u6307\u5B9A\u4F5C\u7528\u5BF9\u8C61`);
      let hitAny = false, defendedAny = false;
      for (let copy = 1; copy <= copies; copy++) {
        const current = mpBaseAttackCandidates(attack, actions, (context == null ? void 0 : context.attacks) || []);
        if (!current.length) {
          RuleTrace.emit(context, "AURORA_COPY_NO_CANDIDATE", `\u6781\u5149\u7B2C${copy}\u628A\u653B\u51FB\u6CA1\u6709\u5408\u6CD5\u5019\u9009`, `\u5148\u524D\u4E3B\u52A8\u627F\u53D7\u6216\u547D\u4E2D\u5DF2\u5360\u7528\u89D2\u8272\u672C\u56DE\u5408\u552F\u4E00\u5224\u5200\u540D\u989D`);
          continue;
        }
        const result2 = await resolveOrdinaryMpKnife(attack, current, actions, events, { allowDefenseHelp: false });
        hitAny = hitAny || result2.hit;
        defendedAny = defendedAny || result2.reset;
      }
      return { reset: hitAny || defendedAny, reason: hitAny ? "attack-hit" : defendedAny ? "catch-or-flash" : null };
    }
    const result = await resolveOrdinaryMpKnife(attack, candidates, actions, events);
    return { reset: result.hit || result.reset, reason: result.hit ? "attack-hit" : result.reset ? "catch-or-flash" : null };
  }
  function shuffleMp(items) {
    const out = [...items];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }
  function mpBaseAttackCandidates(attack, actions, attacks) {
    const friendly = mpState.global.friendlyFireTeams.has(attack.attacker.team) || attack.attacker.friendlyFire;
    return aliveMp().filter((f) => f.id !== attack.attacker.id && !f.skipped).filter((f) => friendly || f.team !== attack.attacker.team).filter((f) => !f.judgementHitThisRound).filter((f) => keeperAttack258(attack) || !mpActionDefenseCoversAttack(f, attack.level, attacks)).filter((f) => {
      var _a;
      return !(skillEnabledMp(f, "miracle") && f.roundFlags.declare && ((_a = skillMove(actions.get(f.id))) == null ? void 0 : _a.level) > attack.level);
    });
  }
  async function resolveOrdinaryMpKnife(attack, candidates, actions, events, { allowDefenseHelp = true } = {}) {
    const context = mpState.currentAttackContext;
    if (allowDefenseHelp) {
      const helpers = await chooseMpDefenseHelpers(candidates, attack, actions);
      if (helpers.length) return await settleMpDefenseHelp(helpers, attack, actions, events);
    }
    const volunteers = await chooseMpVolunteers(candidates, attack, actions);
    if (volunteers.length) return await settleMpVolunteer(volunteers, attack, actions, events);
    let unblocked = candidates.filter((v) => !mpStaticDefense(v, actions.get(v.id), attack).blocked);
    if (allowDefenseHelp) {
      const selfDefenders = candidates.filter((v) => !v.selfDefenseForfeited && (v.defenseQuota || 0) > 0 && mpDefensePreview(v, actions.get(v.id), attack).blocked && mpDefensePreview(v, actions.get(v.id), attack).reset);
      unblocked = unblocked.filter((v) => !selfDefenders.includes(v));
      if (!unblocked.length && selfDefenders.length) return await settleMpSelfDefense(selfDefenders, attack, actions, events);
    }
    if (!unblocked.length) {
      RuleTrace.emit(context, "ALL_STATIC_DEFENSE", `${skillMove(attack.key).name}\u88AB\u666E\u901A\u9632\u5FA1\u5168\u90E8\u6321\u4F4F`);
      return { hit: false, reset: false };
    }
    const victim = unblocked[Math.floor(Math.random() * unblocked.length)];
    if (!victim) return { hit: false, reset: false };
    const preview = mpDefensePreview(victim, actions.get(victim.id), attack);
    if (!victim.selfDefenseForfeited && (victim.defenseQuota || 0) > 0 && preview.blocked && preview.reset) {
      victim.defenseQuota = Math.max(0, (victim.defenseQuota || 0) - 1);
      const result = await mpDefenseResult(victim, actions.get(victim.id), attack, events);
      RuleTrace.emit(context, "DEFENDER_SELECTED", `${victim.name}\u88AB\u968F\u673A\u5224\u4E2D\u5E76${actions.get(victim.id) === "flash" ? "\u95EA\u6389" : "\u63A5\u4F4F"}\u653B\u51FB`, `\u8BE5\u89D2\u8272\u672A\u58F0\u660E\u5E2E\u52A9\uFF0C\u63A5\u6216\u95EA\u4FDD\u62A4\u81EA\u5DF1`);
      events.push(`${victim.name}${result.text}`);
      return { hit: false, reset: basicRoundShouldReset(result) };
    }
    return await resolveMpConfirmedHit(victim, attack, actions, events);
  }
  async function chooseMpDefenseHelpers(candidates, attack, actions) {
    const helpers = [];
    for (const fighter of candidates) {
      if (!fighter.alive || fighter.skipped || fighter.judgementHitThisRound || (fighter.defenseQuota || 0) <= 0) continue;
      const preview = mpDefensePreview(fighter, actions.get(fighter.id), attack);
      if (!preview.blocked || !preview.reset) continue;
      let willingHelp = !fighter.human && mpAiWantsHelp(fighter, candidates, attack, actions, false);
      if (fighter.human) willingHelp = await chooseMpOption(`\u5E2E\u52A9\u9632\u5FA1\uFF1A\u662F\u5426\u7528${skillMove(actions.get(fighter.id)).name}\u5E2E\u52A9\u5F53\u524D\u5224\u5200\u8303\u56F4\uFF1F`, [{ value: "yes", label: `\u5E2E${actions.get(fighter.id) === "flash" ? "\u95EA" : "\u63A5"}\uFF08\u672C\u6B21\u51FA\u624B\u4E0D\u518D\u4FDD\u62A4\u81EA\u5DF1\uFF09` }, { value: "no", label: "\u4E0D\u5E2E\u52A9\uFF1B\u4FDD\u7559\u81EA\u5DF1\u7684\u4FDD\u62A4" }]) === "yes";
      if (willingHelp) {
        fighter.selfDefenseForfeited = true;
        helpers.push(fighter);
      }
    }
    return helpers;
  }
  async function settleMpDefenseHelp(helpers, attack, actions, events) {
    const selected = helpers[Math.floor(Math.random() * helpers.length)];
    if (!selected) return { hit: false, reset: false };
    selected.defenseQuota = Math.max(0, (selected.defenseQuota || 0) - 1);
    const result = await mpDefenseResult(selected, actions.get(selected.id), attack, events);
    RuleTrace.emit(mpState.currentAttackContext, "DEFENSE_HELP_SELECTED", `${selected.name}\u5B9E\u9645\u5B8C\u6210\u5E2E${actions.get(selected.id) === "flash" ? "\u95EA" : "\u63A5"}`, `${helpers.map((f) => f.name).join("\u3001")}\u5747\u58F0\u660E\u5E2E\u52A9\u5E76\u653E\u5F03\u81EA\u4FDD\uFF1B\u5F53\u524D\u5200\u88AB\u5B8C\u6574\u9632\u4F4F\u3001\u65E0\u4EBA\u53D7\u4F24\uFF0C\u8BB0\u5F55\u7EDF\u4E00\u91CD\u5F00`);
    events.push(`${selected.name}\u5E2E${actions.get(selected.id) === "flash" ? "\u95EA" : "\u63A5"}\u6210\u529F\uFF1A\u5F53\u524D\u5200\u88AB\u5B8C\u6574\u9632\u4F4F\uFF0C\u65E0\u4EBA\u53D7\u4F24\uFF1B${result.text}`);
    return { hit: false, reset: basicRoundShouldReset(result) };
  }
  async function settleMpSelfDefense(defenders, attack, actions, events) {
    const selected = defenders[Math.floor(Math.random() * defenders.length)];
    if (!selected) return { hit: false, reset: false };
    selected.defenseQuota = Math.max(0, (selected.defenseQuota || 0) - 1);
    const result = await mpDefenseResult(selected, actions.get(selected.id), attack, events);
    RuleTrace.emit(mpState.currentAttackContext, "SELF_DEFENSE_SELECTED", `${selected.name}\u4EE5${actions.get(selected.id) === "flash" ? "\u95EA" : "\u63A5"}\u4FDD\u62A4\u81EA\u5DF1`, `${defenders.map((f) => f.name).join("\u3001")}\u5747\u6709\u786E\u5B9A\u7684\u81EA\u6211\u4FDD\u62A4\uFF1B\u65E0\u5176\u4ED6\u53EF\u547D\u4E2D\u8005\u65F6\u7B49\u6982\u7387\u8BB0\u5F55\u4E00\u540D\u5B9E\u9645\u6210\u529F\u8005`);
    events.push(`${selected.name}${result.text}`);
    return { hit: false, reset: basicRoundShouldReset(result) };
  }
  async function resolveFixedMpTarget(attack, target, actions, events) {
    return await resolveMpConfirmedHit(target, attack, actions, events);
  }
  function mpStaticDefense(victim, key, attack) {
    const preview = mpDefensePreview(victim, key, attack);
    if (preview.blocked && preview.reset) return { blocked: false, reset: false, text: "" };
    return preview;
  }
  async function chooseMpVolunteers(candidates, attack, actions) {
    const volunteers = [];
    for (const fighter of candidates) {
      if (!fighter.alive || fighter.skipped || fighter.judgementHitThisRound) continue;
      const preview = mpDefensePreview(fighter, actions.get(fighter.id), attack);
      if (preview.blocked) continue;
      let willingTake = !fighter.human && mpAiWantsHelp(fighter, candidates, attack, actions, true);
      if (fighter.human) willingTake = await chooseMpOption(`\u4E3B\u52A8\u627F\u53D7\uFF1A\u662F\u5426\u5728\u5224\u5200\u524D\u627F\u53D7${attack.attacker.name}\u7684${skillMove(attack.key).name}\uFF1F`, [{ value: "yes", label: "\u4E3B\u52A8\u627F\u53D7\uFF08\u7ACB\u5373\u5360\u7528\u672C\u56DE\u5408\u5224\u5200\u540D\u989D\uFF09" }, { value: "no", label: "\u4E0D\u4E3B\u52A8\u627F\u53D7\uFF1B\u7EE7\u7EED\u6B63\u5E38\u5224\u5200" }]) === "yes";
      if (willingTake) volunteers.push(fighter);
    }
    return volunteers;
  }
  function mpAiBodyDamage(victim, attack) {
    let damage = Math.max(0, attack.damage + (victim.vulnerable || 0) + (attack.attacker.saintBonus || 0));
    if (attack.key && skillEnabledMp(victim, "observer")) damage *= victim.observerStance === "rage" ? 2 : 0.5;
    damage = Math.max(0, damage - (mpState.global.damageReductionTeams.get(victim.team) || 0));
    if (!damage || victim.roundFlags.preventAll) return 0;
    if (skillEnabledMp(victim, "pioneer")) return 1;
    if (!attack.trueDamage && !skillEnabledMp(attack.attacker, "sun")) {
      if (victim.shields > 0 || victim.dragon > 0 && victim.dragonShields > 0 || victim.doll > 0 && victim.dollShields > 0) return 0;
      damage = Math.max(0, damage - (victim.dragon || 0) - (victim.doll || 0));
    }
    return damage;
  }
  function mpAiWantsHelp(fighter, candidates, attack, actions, takeHit) {
    var _a;
    const allies = candidates.filter((x) => x.id !== fighter.id && x.team === fighter.team && !mpDefensePreview(x, actions.get(x.id), attack).blocked);
    if (!allies.length) return false;
    const ownDamage = mpAiBodyDamage(fighter, attack);
    if (takeHit) {
      if (ownDamage >= fighter.hp) return false;
      return allies.some((x) => mpAiBodyDamage(x, attack) >= x.hp || x.hp - mpAiBodyDamage(x, attack) < fighter.hp - ownDamage - 1) && aiUsesSkill(0.8);
    }
    const otherThreats = (((_a = mpState.currentAttackContext) == null ? void 0 : _a.attacks) || []).filter((a) => a !== attack && !a.done && a.attacker.id !== fighter.id && (a.attacker.team !== fighter.team || a.attacker.friendlyFire || mpState.global.friendlyFireTeams.has(a.attacker.team)));
    const unsafe = otherThreats.some((a) => mpAiBodyDamage(fighter, a) >= fighter.hp);
    return (!unsafe || allies.some((x) => mpAiBodyDamage(x, attack) >= x.hp)) && aiUsesSkill(0.8);
  }
  async function settleMpVolunteer(volunteers, attack, actions, events) {
    const selected = volunteers[Math.floor(Math.random() * volunteers.length)];
    if (!selected) return { hit: false, reset: false };
    RuleTrace.emit(mpState.currentAttackContext, "VOLUNTEER_SELECTED", `${selected.name}\u88AB\u9009\u4E2D\u4E3B\u52A8\u627F\u53D7`, `${volunteers.length}\u540D\u4E3B\u52A8\u627F\u53D7\u8005\u4E2D\u7B49\u6982\u7387\u9009\u62E9\uFF1B\u8BE5\u89D2\u8272\u7ACB\u5373\u5360\u7528\u672C\u56DE\u5408\u552F\u4E00\u5224\u5200\u540D\u989D`);
    return await resolveMpConfirmedHit(selected, attack, actions, events);
  }
  async function resolveMpConfirmedHit(victim, attack, actions, events) {
    victim.hitThisStep = true;
    victim.judgementHitThisRound = true;
    const defense = actions.get(victim.id);
    const effective = skillEnabledMp(attack.attacker, "warrior") && attack.key === "katana" && defense === "guard" ? { ...attack, damage: 0.5, trueDamage: true } : attack;
    const timing = await SkillTiming.dispatch("multiplayer", "hit-confirmed", { context: mpState.currentAttackContext, attack: effective, victim, events, prevented: false });
    timing.attack.damage += await assassin258(timing.attack.attacker, attack.key, events, true);
    await hitSkills258(timing.attack.attacker, victim, attack.key, events, true);
    const damage = timing.prevented ? 0 : await applyMpDamage(victim, timing.attack, events, { interceptorsResolved: true });
    attack.hit = true;
    if (timing.attack.assassinBonus) timing.attack.attacker.assassinUsed = true;
    victim.damagedThisRound = victim.damagedThisRound || damage > 0;
    RuleTrace.emit(mpState.currentAttackContext, "ATTACK_HIT", `${timing.attack.attacker.name}\u7684${skillMove(attack.key).name}\u547D\u4E2D${victim.name}`, `${timing.attack.originalAttacker ? `\u7ECF\u9B54\u672F\u5E08\u4ECE${timing.attack.originalAttacker.name}\u6539\u5199\uFF1B` : ""}\u5360\u7528${victim.name}\u672C\u56DE\u5408\u552F\u4E00\u5224\u5200\u540D\u989D\uFF1B\u6700\u7EC8\u4F24\u5BB3${formatNumber(damage)}`);
    await afterMpDamage(timing.attack.attacker, victim, damage, events);
    await audienceMp258(timing.attack.attacker, attack.key, events);
    if (skillEnabledMp(timing.attack.attacker, "dragonKnight") && attack.key === "dragonFang" && timing.attack.attacker.dragon <= 0) {
      timing.attack.attacker.dragon = 1;
      timing.attack.attacker.dragonShields = 0;
    }
    return { hit: true, reset: true, damage };
  }
  async function resolveMpMagicianChain(attack, victim, events) {
    const rewritten = { ...attack };
    while (true) {
      const ready = shuffleMp(aliveMp().filter((f) => skillEnabledMp(f, "magician") && f.activeUses.magician > 0));
      if (!ready.length) break;
      let changed = false;
      for (const magician of ready) {
        let replacement = null;
        if (magician.human) {
          const selectable = aliveMp().filter((x) => !hasMpSkill(x, "pioneer"));
          const value = await chooseMpOption(`\u9B54\u672F\u5E08\uFF1A${rewritten.attacker.name}\u7684\u653B\u51FB\u5C06\u547D\u4E2D${victim.name}\uFF0C\u662F\u5426\u6539\u5199\uFF1F`, [{ value: "skip", label: "\u672C\u6B21\u4E0D\u53D1\u52A8" }, ...selectable.map((x) => ({ value: String(x.id), label: `\u6539\u4E3A${x.name}\u7684\u653B\u51FB\u503C ${formatNumber(x.attack)}` }))]);
          if (value != null && value !== "skip") replacement = mpState.fighters[Number(value)];
        } else if (aiUsesSkill(0.45)) {
          const direction = victim.team === magician.team ? -1 : 1;
          const value = (a) => direction * (mpAiBodyDamage(victim, a) + Math.max(0, a.damage) * 0.05);
          let best = value(rewritten);
          for (const target of aliveMp().filter((x) => !x.skipped && !hasMpSkill(x, "pioneer"))) {
            const candidate = { ...rewritten, attacker: target, damage: Math.max(0, target.attack), trueDamage: skillEnabledMp(target, "sun") };
            const score = value(candidate);
            if (score > best + 1e-3) {
              replacement = target;
              best = score;
            }
          }
        }
        if (!replacement) continue;
        if (!await mpActiveAllowed(magician)) continue;
        magician.activeUses.magician--;
        magician.magicianTarget = null;
        rewritten.originalAttacker = rewritten.originalAttacker || rewritten.attacker;
        rewritten.attacker = replacement;
        rewritten.damage = Math.max(0, replacement.attack);
        rewritten.trueDamage = skillEnabledMp(replacement, "sun");
        rewritten.assassinBonus = false;
        changed = true;
        RuleTrace.emit(mpState.currentAttackContext, "MAGICIAN_REWRITE", `${magician.name}\xB7\u9B54\u672F\u5E08\u6539\u5199\u672C\u5200`, `${replacement.name}\u7684\u653B\u51FB\u503C\u6210\u4E3A\u65B0\u7684\u57FA\u7840\u4F24\u5BB3\uFF1B\u5DF2\u652F\u4ED8\u653B\u51FB\u4ECD\u63D0\u4F9B\u4FDD\u62A4`);
        events.push(`${magician.name}\xB7\u9B54\u672F\u5E08\u6280\u80FD\uFF1A\u6539\u5199\u4E3A${replacement.name}\u7684\u653B\u51FB\u503C${formatNumber(rewritten.damage)}`);
        break;
      }
      if (!changed) break;
    }
    return rewritten;
  }
  async function resolveMpMonsterInterception(victim, attack, events) {
    const owners = [victim, attack.attacker].filter((f, index, list) => list.findIndex((x) => x.id === f.id) === index && skillEnabledMp(f, "monster"));
    if (!owners.length) return false;
    let prevented = false;
    for (const owner of owners) {
      const duel = await resolveMpMonsterDuel(victim, attack.attacker, owner, events);
      prevented = prevented || duel.prevented;
    }
    return prevented;
  }
  SkillTiming.register({ id: "mp-magician-rewrite", mode: "multiplayer", phase: "hit-confirmed", priority: 100, label: "\u9B54\u672F\u5E08\u6539\u5199", when: (payload) => aliveMp().some((f) => skillEnabledMp(f, "magician") && f.activeUses.magician > 0), run: async (payload) => {
    payload.attack = await resolveMpMagicianChain(payload.attack, payload.victim, payload.events);
  } });
  SkillTiming.register({ id: "mp-monster-rps", mode: "multiplayer", phase: "hit-confirmed", priority: 200, label: "\u602A\u517D\u731C\u62F3", when: (payload) => skillEnabledMp(payload.victim, "monster") || skillEnabledMp(payload.attack.attacker, "monster"), run: async (payload) => {
    payload.prevented = await resolveMpMonsterInterception(payload.victim, payload.attack, payload.events);
  } });
  SkillTiming.register({ id: "mp-hanged-boost", mode: "multiplayer", phase: "hit-confirmed", priority: 300, label: "\u5012\u540A\u4EBA\u547D\u4E2D\u589E\u4F24", when: (payload) => !payload.prevented && skillEnabledMp(payload.attack.attacker, "hangedMan", "active"), run: async (payload) => {
    await applyHangedBoost(payload.attack, payload.events);
  } });
  function mpDefensePreview(victim, key, attack) {
    if (keeperAttack258(attack)) return { blocked: false, reset: false };
    if (key === "bigShield" && attack.level < 6) return { blocked: true, reset: false };
    if (key === "guard" && skillEnabledMp(victim, "assassin") && attack.key === "shuriken") return { blocked: true, reset: false };
    if (key === "guard" && attack.level <= 2 && !(skillEnabledMp(attack.attacker, "warrior") && attack.key === "katana")) return { blocked: true, reset: false };
    if (key === "catch" && attack.level >= 2 && attack.level <= 3) return { blocked: true, reset: true };
    if (key === "flash" && attack.level >= 2 && attack.level <= 5) return { blocked: true, reset: true };
    return { blocked: false, reset: false };
  }
  async function mpDefenseResult(victim, key, attack) {
    var _a;
    if (keeperAttack258(attack)) return { blocked: false, reset: false, text: "\u7AA5\u79D8\u5FC5\u5B9A\u547D\u4E2D" };
    if (key === "bigShield" && attack.level < 6) return { blocked: true, reset: false, text: "\u7684\u5927\u76FE\u6321\u4F4F\u653B\u51FB" };
    if (key === "guard" && skillEnabledMp(victim, "assassin") && attack.key === "shuriken") return { blocked: true, reset: false, text: "\xB7\u523A\u5BA2\u6280\u80FD\u8BC6\u7834\u624B\u91CC\u5251" };
    if (key === "guard" && attack.level <= 2 && !(skillEnabledMp(attack.attacker, "warrior") && attack.key === "katana")) return { blocked: true, reset: false, text: "\u4F7F\u7528\u9632\u6321\u4F4F\u653B\u51FB" };
    if (key === "catch" && attack.level >= 2 && attack.level <= 3) return { blocked: true, reset: true, text: "\u6210\u529F\u63A5\u4F4F\u653B\u51FB\uFF0C\u89E6\u53D1\u91CD\u5F00" };
    if (key === "flash" && attack.level >= 2 && attack.level <= 5) {
      if (skillEnabledMp(victim, "prisoner")) {
        victim.flashSuccesses++;
        if (victim.flashSuccesses % 2 === 0) victim.attackDiscount++;
      }
      if (skillEnabledMp(victim, "moon") && !((_a = mpState.currentAttackContext) == null ? void 0 : _a.moonResolved)) {
        const counterDamage = Math.max(0, attack.attacker.attack);
        const fallbackEvents = [];
        const dealt = counterDamage > 0 ? await applyMpDamage(attack.attacker, { attacker: victim, damage: counterDamage, trueDamage: false }, fallbackEvents) : 0;
        if (dealt > 0) await afterMpDamage(victim, attack.attacker, dealt, fallbackEvents, { allowJudge: true });
        fallbackEvents.forEach((text) => logMp(text, "skill"));
        RuleTrace.emit(mpState.currentAttackContext, "MOON_COUNTER", `${victim.name}\xB7\u6708\u4EAE\u9632\u53CD${attack.attacker.name}`, `\u4EE5\u653B\u51FB\u6765\u6E90\u7684\u653B\u51FB\u503C\u7ED3\u7B97${formatNumber(counterDamage)}\u70B9\u6280\u80FD\u4F24\u5BB3\uFF0C\u5B9E\u9645\u4F5C\u7528${formatNumber(dealt)}\uFF1B\u4E0D\u5360\u5224\u5200\u540D\u989D`);
        return { blocked: true, reset: true, text: `\u6210\u529F\u95EA\u6389\u653B\u51FB\u5E76\u4EE5\u6765\u6E90\u653B\u51FB\u503C\u9632\u53CD\uFF0C\u5B9E\u9645\u4F5C\u7528${formatNumber(dealt)}\u4F24\u5BB3\uFF0C\u89E6\u53D1\u91CD\u5F00` };
      }
      return { blocked: true, reset: true, text: "\u6210\u529F\u95EA\u6389\u653B\u51FB\uFF0C\u89E6\u53D1\u91CD\u5F00" };
    }
    return { blocked: false, reset: false, text: "" };
  }
  async function applyMpDamage(victim, attack, events, { fromJudge = false, interceptorsResolved = false } = {}) {
    let damage = attack.damage + (victim.vulnerable || 0) + (attack.attacker.saintBonus || 0);
    if (!attack.key && skillEnabledMp(attack.attacker, "tyrant") && attack.attacker.hp <= 1) damage = 10;
    if (skillEnabledMp(attack.attacker, "sun")) attack = { ...attack, trueDamage: true };
    if (attack.key && skillEnabledMp(victim, "observer")) damage *= victim.observerStance === "rage" ? 2 : 0.5;
    damage = Math.max(0, damage - (mpState.global.damageReductionTeams.get(victim.team) || 0));
    if (damage <= 0) {
      events.push(`${victim.name}\u53D7\u52300\u4F24\u5BB3\uFF1A\u4E0D\u6D88\u8017\u672C\u4F53\u3001\u9F99\u6216\u79D8\u5076\u7684\u62A4\u76FE`);
      return 0;
    }
    let dealt = 0;
    if (victim.roundFlags.preventAll) {
      events.push(`${victim.name}\xB7\u5148\u9A71\u4E3B\u52A8\u6280\u80FD\uFF1A\u9632\u6B62\u672C\u56DE\u5408\u53D7\u5230\u7684\u672C\u6B21\u4F24\u5BB3`);
      return 0;
    }
    if (skillEnabledMp(victim, "pioneer")) {
      victim.hp -= 1;
      await afterMpPioneerDamage(victim, events);
      events.push(`${victim.name}\xB7\u5148\u9A71\u88AB\u52A8\u6280\u80FD\uFF1A\u9632\u6B62\u539F\u4F24\u5BB3\u5E76\u4EE4\u672C\u4F53\u5931\u53BB1\u8840\uFF1B\u4E0D\u6D88\u8017\u62A4\u76FE\u3001\u9F99\u6216\u79D8\u5076`);
      return 0;
    }
    if (await asceticPreventMp258(victim, damage, attack.trueDamage, events)) return 0;
    if (!attack.trueDamage) {
      const order = [.../* @__PURE__ */ new Set([...victim.damageOrder || ["dragon", "doll"], "dragon", "doll"])];
      for (const kind of order) {
        if (damage <= 0) break;
        const hpKey = kind === "dragon" ? "dragon" : "doll", shieldKey = kind === "dragon" ? "dragonShields" : "dollShields", label = kind === "dragon" ? "\u9F99" : "\u79D8\u5076";
        if ((victim[hpKey] || 0) <= 0) continue;
        if ((victim[shieldKey] || 0) > 0) {
          victim[shieldKey]--;
          events.push(`${victim.name}\u7684${label}\u5931\u53BB1\u62A4\u76FE\u5E76\u6321\u4F4F\u672C\u6B21\u5269\u4F59\u4F24\u5BB3`);
          return dealt;
        }
        const absorbed = Math.min(victim[hpKey], damage);
        victim[hpKey] -= absorbed;
        damage -= absorbed;
        dealt += absorbed;
        events.push(`${victim.name}\u7684${label}\u627F\u62C5${formatNumber(absorbed)}\u4F24\u5BB3`);
        if (victim[hpKey] <= 0) {
          victim[hpKey] = 0;
          victim[shieldKey] = 0;
          if (kind === "doll") victim.dollSkill = null;
          events.push(`${victim.name}\u7684${label}${kind === "dragon" ? "\u88AB\u51FB\u7834" : "\u7834\u788E"}`);
        }
      }
      if (damage > 0 && victim.shields > 0) {
        victim.shields--;
        events.push(`${victim.name}\u672C\u4F53\u5931\u53BB1\u62A4\u76FE\u5E76\u6321\u4F4F\u672C\u6B21\u5269\u4F59\u4F24\u5BB3`);
        await saintShieldLost(victim, events);
        if (dealt > 0) attack.attacker.saintBonus = 0;
        return dealt;
      }
    }
    victim.hp -= damage;
    dealt += damage;
    if (victim.hp <= 0) victim.attackLethal = Boolean(attack.key);
    if (dealt > 0) attack.attacker.saintBonus = 0;
    if (damage > 0) {
      victim.tookDamageLastRound = true;
      victim.lastDamageSource = attack.attacker.id;
    }
    return dealt;
  }
  async function chooseMpRpsGesture(f, title) {
    if (f.monsterGesture) {
      const prepared = f.monsterGesture;
      f.monsterGesture = null;
      return prepared;
    }
    if (!f.human) return randomRpsGesture();
    return await chooseMpOption(title, ["\u77F3\u5934", "\u526A\u5200", "\u5E03"].map((x) => ({ value: x, label: x })), { cancelText: "\u5FC5\u987B\u9009\u62E9\u4E00\u4E2A\u624B\u52BF" });
  }
  async function resolveMpMonsterDuel(victim, attacker, owner, events) {
    if (skillEnabledMp(victim, "shadow") || skillEnabledMp(attacker, "shadow")) {
      events.push("\u6697\u5F71\uFF1A\u731C\u62F3\u89C6\u4E3A\u80DC\u5229");
      return { prevented: skillEnabledMp(victim, "shadow") };
    }
    while (true) {
      const victimGesture = await chooseMpRpsGesture(victim, `\u602A\u517D\u6280\u80FD\uFF1A${victim.name}\u4F5C\u4E3A\u53D7\u51FB\u8005\u9009\u62E9\u624B\u52BF`);
      const attackerGesture = await chooseMpRpsGesture(attacker, `\u602A\u517D\u6280\u80FD\uFF1A${attacker.name}\u4F5C\u4E3A\u653B\u51FB\u8005\u9009\u62E9\u624B\u52BF`);
      if (victimGesture == null || attackerGesture == null) continue;
      events.push(`${owner.name}\xB7\u602A\u517D\u6280\u80FD\u89E6\u53D1\uFF1A\u53D7\u51FB\u8005${victim.name}\u51FA${victimGesture}\uFF0C\u653B\u51FB\u8005${attacker.name}\u51FA${attackerGesture}`);
      const showResult = victim.human || attacker.human;
      if (victimGesture === attackerGesture) {
        events.push("\u602A\u517D\u731C\u62F3\u5E73\u5C40\uFF0C\u91CD\u65B0\u731C\u62F3");
        if (showResult) await showMonsterRpsResult(`${victim.name} ${victimGesture} \xB7 ${attacker.name} ${attackerGesture}`, "\u5E73\u5C40\uFF0C\u53CC\u65B9\u91CD\u65B0\u51FA\u624B");
        continue;
      }
      const prevented = victimGesture === "\u77F3\u5934" && attackerGesture === "\u526A\u5200" || victimGesture === "\u526A\u5200" && attackerGesture === "\u5E03" || victimGesture === "\u5E03" && attackerGesture === "\u77F3\u5934";
      events.push(prevented ? `${victim.name}\u731C\u62F3\u83B7\u80DC\uFF0C\u9632\u6B62\u4F24\u5BB3` : `${attacker.name}\u731C\u62F3\u83B7\u80DC\uFF0C\u4F24\u5BB3\u7EE7\u7EED`);
      if (showResult) await showMonsterRpsResult(`${victim.name} ${victimGesture} \xB7 ${attacker.name} ${attackerGesture}`, prevented ? "\u53D7\u51FB\u8005\u83B7\u80DC\uFF0C\u672C\u6B21\u4F24\u5BB3\u88AB\u9632\u6B62" : "\u653B\u51FB\u8005\u83B7\u80DC\uFF0C\u672C\u6B21\u4F24\u5BB3\u7EE7\u7EED");
      return { victimGesture, attackerGesture, prevented };
    }
  }
  async function applyMpSkillDamage(attacker, victim, damage, events, { trueDamage = false, allowJudge = true } = {}) {
    const dealt = await applyMpDamage(victim, { attacker, damage: Math.max(0, damage), trueDamage }, events);
    if (dealt > 0) await afterMpDamage(attacker, victim, dealt, events, { allowJudge });
    return dealt;
  }
  async function saintShieldLost(victim, events) {
    if (!skillEnabledMp(victim, "saint", "active") || !await chooseUse258(victim, "\u5723\u6597\u58EB\uFF1A\u5931\u53BB\u62A4\u76FE\uFF0C\u662F\u5426\u4EE4\u4E0B\u6B21\u4F24\u5BB3+0.5\uFF1F") || !await mpActiveAllowed(victim)) return;
    victim.saintBonus = (victim.saintBonus || 0) + 0.5;
    events.push(victim.name + "\xB7\u5723\u6597\u58EB\uFF1A\u4E0B\u6B21\u9020\u6210\u7684\u4F24\u5BB3+0.5");
  }
  async function afterMpDamage(attacker, victim, damage, events, { allowJudge = true } = {}) {
    attacker.dealtDamageLastRound = attacker.dealtDamageLastRound || damage > 0;
    if (damage <= 0) return;
    for (const keeper of aliveMp().filter((f) => skillEnabledMp(f, "secretKeeper") && f.secretTarget === victim.id)) {
      gainHp258(keeper, 1);
      keeper.maxHp = Math.max(keeper.maxHp, keeper.hp);
      events.push(`${keeper.name}\xB7\u7AA5\u79D8\u4EBA\u6280\u80FD\uFF1A${victim.name}\u53D7\u5230\u4F24\u5BB3\uFF0C\u751F\u547D+1`);
    }
    if (victim.markedBy != null) {
      const owner = mpState.fighters[victim.markedBy];
      if (owner) {
        owner.nightmareClock--;
        events.push(`${owner.name}\xB7\u68A6\u9B47\u6280\u80FD\uFF1A${victim.name}\u53D7\u5230\u4F24\u5BB3\uFF0C\u671F\u9650\u7F29\u77ED1\u56DE\u5408`);
      }
    }
  }
  async function afterMpPioneerDamage(victim, events) {
    victim.tookDamageLastRound = true;
    victim.lastDamageSource = victim.id;
    for (const keeper of aliveMp().filter((f) => skillEnabledMp(f, "secretKeeper") && f.secretTarget === victim.id)) {
      gainHp258(keeper, 1);
      keeper.maxHp = Math.max(keeper.maxHp, keeper.hp);
      events.push(`${keeper.name}\xB7\u7AA5\u79D8\u4EBA\u6280\u80FD\uFF1A${victim.name}\u56E0\u5148\u9A71\u5931\u53BB\u751F\u547D\uFF0C\u751F\u547D+1`);
    }
    if (victim.markedBy != null) {
      const owner = mpState.fighters[victim.markedBy];
      if (owner) {
        owner.nightmareClock--;
        events.push(`${owner.name}\xB7\u68A6\u9B47\u6280\u80FD\uFF1A${victim.name}\u56E0\u5148\u9A71\u53D7\u5230\u4F24\u5BB3\uFF0C\u671F\u9650\u7F29\u77ED1\u56DE\u5408`);
      }
    }
  }
  async function wantsMpJudge(judge) {
    if (!judge.human) return Math.random() < 0.7;
    return await chooseMpOption("\u5BA1\u5224\u8005\uFF1A\u662F\u5426\u53D1\u52A8\u8FFD\u52A0\u5BF9\u5C40\uFF1F", [{ value: "yes", label: "\u53D1\u52A8\u5BA1\u5224" }, { value: "no", label: "\u6682\u4E0D\u53D1\u52A8" }]) === "yes";
  }
  async function chooseMpJudgeOpponent(judge, fallback) {
    const choices = aliveMp().filter((x) => x.id !== judge.id && !hasMpSkill(x, "pioneer"));
    if (!choices.length) return null;
    if (!judge.human) return chooseAiSkillTarget(judge, choices, "harm");
    const value = await chooseMpOption("\u5BA1\u5224\u8005\uFF1A\u9009\u62E9\u8FFD\u52A0\u5BF9\u5C40\u7684\u53E6\u4E00\u540D\u89D2\u8272", choices.map((x) => ({ value: String(x.id), label: `${x.name} \xB7 ${x.team === judge.team ? "\u53CB\u65B9" : "\u654C\u65B9"} \xB7 ${formatNumber(x.hp)}\u8840` })), { cancelText: "\u53D6\u6D88\u53D1\u52A8" });
    return value == null ? null : choices.find((x) => x.id === Number(value)) || fallback || null;
  }
  function resolveMultiplayerJudgeCombat(leftKey, rightKey) {
    const left = MOVES[leftKey], right = MOVES[rightKey];
    if (!left || !right || leftKey === "scissors" || rightKey === "scissors") throw new Error("\u591A\u4EBA\u5BA1\u5224\u51FA\u73B0\u975E\u6CD5\u62DB\u5F0F");
    const judged = (leftHit = false, rightHit = false, reset = false, title = "", detail = "") => ({
      playerHit: leftHit,
      aiHit: rightHit,
      reset,
      title,
      detail
    });
    if (left.type === "basic" && right.type === "basic") return judged(false, false, false, "\u76F8\u4E92\u8BD5\u63A2", "\u65E0\u4EBA\u88AB\u547D\u4E2D");
    if (leftKey === "forge" && right.type === "attack") return judged(true, false, true, `${right.name}\u547D\u4E2D`, "\u953B\u9020\u8005\u88AB\u547D\u4E2D");
    if (rightKey === "forge" && left.type === "attack") return judged(false, true, true, `${left.name}\u547D\u4E2D`, "\u953B\u9020\u8005\u88AB\u547D\u4E2D");
    if (left.type === "attack" && right.type === "attack") {
      if (left.level === right.level) return judged(false, false, false, "\u62B5\u5200", "\u540C\u7EA7\u653B\u51FB\u76F8\u62B5");
      return left.level > right.level ? judged(false, true, true, `${left.name}\u538B\u5236${right.name}`, "\u9AD8\u7EA7\u653B\u51FB\u547D\u4E2D") : judged(true, false, true, `${right.name}\u538B\u5236${left.name}`, "\u9AD8\u7EA7\u653B\u51FB\u547D\u4E2D");
    }
    if (left.type === "attack") {
      const blocked2 = Array.isArray(right.blocks) && right.blocks.includes(left.level);
      return blocked2 ? judged(false, false, Boolean(right.resets), `${right.name}\u6210\u529F`, "\u653B\u51FB\u88AB\u9632\u4F4F") : judged(false, true, true, `${left.name}\u7A81\u7834${right.name}`, "\u9632\u5FA1\u8005\u88AB\u547D\u4E2D");
    }
    if (right.type === "attack") {
      const blocked2 = Array.isArray(left.blocks) && left.blocks.includes(right.level);
      return blocked2 ? judged(false, false, Boolean(left.resets), `${left.name}\u6210\u529F`, "\u653B\u51FB\u88AB\u9632\u4F4F") : judged(true, false, true, `${right.name}\u7A81\u7834${left.name}`, "\u9632\u5FA1\u8005\u88AB\u547D\u4E2D");
    }
    return judged(false, false, false, "\u76F8\u4E92\u8BD5\u63A2", "\u65E0\u4EBA\u88AB\u547D\u4E2D");
  }
  async function resolveMpJudgeDuel(judge, opponent, events) {
    if (!await mpActiveAllowed(judge)) return;
    judge.activeUses.judge--;
    judge.judgeArmed = false;
    if (await resolveNoSkillChallenge(judge, opponent)) {
      await applyMpSkillDamage(judge, opponent, judge.attack, events, { allowJudge: false });
      events.push(judge.name + "\xB7\u5BA1\u5224\u8005\uFF1A\u6311\u6218\u83B7\u80DC\uFF0C\u9020\u6210\u4E00\u6B21\u4F24\u5BB3");
    }
  }
  function preventJudgeDialogClose(event) {
    event.preventDefault();
  }
  function renderMpJudgeDuel(left, right, leftMove, rightMove, status) {
    $("mpJudgeLeftName").textContent = left.fighter.name;
    $("mpJudgeRightName").textContent = right.fighter.name;
    $("mpJudgeLeftHp").textContent = `\u751F\u547D ${formatNumber(left.hp)} \xB7 \u62A4\u76FE ${left.shields || 0}`;
    $("mpJudgeRightHp").textContent = `\u751F\u547D ${formatNumber(right.hp)} \xB7 \u62A4\u76FE ${right.shields || 0}`;
    $("mpJudgeLeftEnergy").textContent = `\u953B ${formatNumber(left.energy)}`;
    $("mpJudgeRightEnergy").textContent = `\u953B ${formatNumber(right.energy)}`;
    $("mpJudgeLeftMove").textContent = leftMove ? skillMove(leftMove).name : "\u7B49\u5F85\u51FA\u62DB";
    $("mpJudgeRightMove").textContent = rightMove ? skillMove(rightMove).name : "\u7B49\u5F85\u51FA\u62DB";
    $("mpJudgeDuelStatus").textContent = status;
  }
  async function chooseMpJudgeDuelAction(side, title) {
    const legal = MOVE_KEYS.filter((key) => key !== "scissors" && MOVES[key].cost <= side.energy);
    if (side.fighter.human && Array.isArray(globalThis.__hezhangTestChoices)) return globalThis.__hezhangTestChoices.shift() || legal[0];
    if (!side.fighter.human) {
      $("mpJudgeMoveGrid").innerHTML = `<small>${side.fighter.name}\u6B63\u5728\u9009\u62E9\u2026\u2026</small>`;
      await new Promise((resolve) => setTimeout(resolve, 260));
      return chooseMpJudgeAiMove({ ...side.fighter, energy: side.energy });
    }
    $("mpJudgeDuelStatus").textContent = title;
    return new Promise((resolve) => {
      $("mpJudgeMoveGrid").innerHTML = legal.map((key) => `<button type="button" data-judge-move="${key}"><span>${MOVES[key].icon}</span><b>${MOVES[key].name}</b><small>${MOVES[key].cost || "\u514D\u8D39"}</small></button>`).join("");
      $("mpJudgeMoveGrid").querySelectorAll("[data-judge-move]").forEach((button) => button.addEventListener("click", () => resolve(button.dataset.judgeMove), { once: true }));
    });
  }
  async function settleMpDeaths(events) {
    var _a, _b, _c;
    while (true) {
      for (const f of aliveMp()) if (f.hp <= 0 && !f.attackLethal && skillEnabledMp(f, "shadow")) {
        f.hp = 1;
        events.push(f.name + "\xB7\u6697\u5F71\uFF1A\u975E\u653B\u51FB\u547D\u4E2D\u5BFC\u81F4\u7684\u6B7B\u4EA1\u88AB\u66FF\u6362\u4E3A1\u8840");
      }
      const batch = mpState.fighters.filter((x) => x.alive && x.hp <= 0);
      if (!batch.length) break;
      for (const f of batch) {
        f.alive = false;
        events.push(`${f.name}\u6B7B\u4EA1`);
      }
      for (const f of batch) {
        if (mpState.fishHookOwner === f.id) {
          f.hook = false;
          mpState.fishHookOwner = null;
          events.push(`${f.name}\u6B7B\u4EA1\uFF1A\u5176\u62E5\u6709\u7684\u9C7C\u94A9\u6D88\u5931\uFF0C\u5168\u573A\u53EF\u91CD\u65B0\u653E\u7F6E\u9C7C\u94A9`);
        }
        if (skillEnabledMp(f, "hunter")) {
          const targets = aliveMp().filter((x) => !hasMpSkill(x, "pioneer"));
          let t = null;
          if (targets.length && f.human) {
            const value = await chooseMpOption(`${f.name}\xB7\u730E\u4EBA\uFF1A\u6B7B\u4EA1\u540E\u9009\u62E91\u70B9\u771F\u5B9E\u4F24\u5BB3\u76EE\u6807`, targets.map((x) => ({ value: String(x.id), label: `${x.name} \xB7 ${formatNumber(x.hp)}\u8840` })));
            t = targets.find((x) => x.id === Number(value)) || null;
          } else if (targets.length) t = chooseAiSkillTarget(f, targets, "harm");
          if (t) {
            await applyMpSkillDamage(f, t, 1, events, { trueDamage: true });
            events.push(`${f.name}\xB7\u730E\u4EBA\u6280\u80FD\uFF1A\u6B7B\u4EA1\u540E\u9009\u62E9${t.name}\uFF0C\u7ED3\u7B971\u70B9\u771F\u5B9E\u4F24\u5BB3`);
          }
        }
      }
      const livingHanged = aliveMp().filter((other) => skillEnabledMp(other, "hangedMan"));
      for (const other of livingHanged) {
        const gain = hangedRecoveryForDeaths(other.id, batch.map((f) => f.id));
        if (!gain) continue;
        const before = other.hp;
        gainHp258(other, gain);
        other.maxHp = Math.max(other.maxHp || 0, other.hp);
        events.push(`${other.name}\xB7\u5012\u540A\u4EBA\u3010\u4EA1\u8005\u56DE\u751F\u3011\uFF1A${formatNumber(gain / 0.5)}\u540D\u5176\u4ED6\u89D2\u8272\u6B7B\u4EA1\uFF0C\u6062\u590D${formatNumber(gain)}\u751F\u547D\uFF08${formatNumber(before)}\u2192${formatNumber(other.hp)}\uFF09`);
      }
      for (const f of batch) {
        const killer = mpState.fighters[f.lastDamageSource];
        if ((killer == null ? void 0 : killer.alive) && skillEnabledMp(killer, "saint")) {
          killer.shields++;
          events.push(`${killer.name}\xB7\u5723\u6597\u58EB\u6280\u80FD\uFF1A\u51FB\u6740${f.name}\u540E\u83B7\u5F971\u62A4\u76FE`);
        }
        for (const thief of aliveMp().filter((x) => {
          var _a2;
          return ((_a2 = x.roundFlags.stolen) == null ? void 0 : _a2.target) === f.id;
        })) {
          thief.roundFlags.stolen = null;
          events.push(`${thief.name}\xB7\u76D7\u8D3C\u6280\u80FD\uFF1A\u6C38\u4E45\u4FDD\u7559${f.name}\u7684\u6280\u80FD`);
        }
        for (const diviner of aliveMp().filter((x) => x.team === f.team && skillEnabledMp(x, "diviner", "active"))) {
          if (f.skill === "none") continue;
          let replace = true;
          if (diviner.human) {
            const choice = await chooseMpOption(`\u5360\u535C\u5BB6\uFF1A\u662F\u5426\u5C06\u5F53\u524D\u79D8\u5076\u66FF\u6362\u4E3A${f.name}\u7684${SKILLS[f.skill].name}\u79D8\u5076\uFF1F`, [
              { value: "replace", label: `\u66FF\u6362\u4E3A${SKILLS[f.skill].name}\u79D8\u5076` },
              { value: "keep", label: `\u4FDD\u7559${diviner.dollSkill ? SKILLS[diviner.dollSkill].name : "\u5F53\u524D"}\u79D8\u5076` }
            ], { cancelText: "\u4FDD\u7559\u5F53\u524D\u79D8\u5076" });
            replace = choice === "replace";
          } else {
            const currentValue = diviner.dollSkill ? ((_a = SKILLS[diviner.dollSkill]) == null ? void 0 : _a.attack) || 0 : 0;
            replace = !diviner.dollSkill || Math.random() < 0.45 || SKILLS[f.skill].attack > currentValue;
          }
          if (replace && await mpActiveAllowed(diviner)) {
            diviner.doll = 1;
            diviner.dollShields = 0;
            diviner.dollSkill = f.skill;
            events.push(`${diviner.name}\xB7\u5360\u535C\u5BB6\u6280\u80FD\uFF1A\u83B7\u5F97${SKILLS[f.skill].name}\u79D8\u5076`);
          }
        }
      }
    }
    for (const f of aliveMp()) {
      if (f.retreatOwner != null && !((_b = mpState.fighters[f.retreatOwner]) == null ? void 0 : _b.alive)) {
        f.retreatUntil = 0;
        f.skipped = false;
      }
      if (f.markedBy != null && !((_c = mpState.fighters[f.markedBy]) == null ? void 0 : _c.alive)) f.markedBy = null;
    }
    const remainingFields = mpState.fieldDeclarations.filter((d) => {
      var _a2;
      return (_a2 = mpState.fighters[d.fighter]) == null ? void 0 : _a2.alive;
    });
    if (remainingFields.length !== mpState.fieldDeclarations.length) {
      mpState.fieldDeclarations = [];
      mpState.fieldConflict = false;
      mpState.global = { friendlyFireTeams: /* @__PURE__ */ new Set(), multiHitTeams: /* @__PURE__ */ new Set(), disabledSkillTeams: /* @__PURE__ */ new Set(), damageReductionTeams: /* @__PURE__ */ new Map() };
      for (const declaration of remainingFields) {
        const owner = mpState.fighters[declaration.fighter];
        if (owner == null ? void 0 : owner.alive) registerMpField(owner, declaration.type, declaration.param);
      }
      events.push("\u6280\u80FD\u4EA7\u751F\u7269\u6E05\u7406\uFF1A\u6B7B\u4EA1\u89D2\u8272\u521B\u5EFA\u7684\u9886\u57DF\u5DF2\u79FB\u9664");
    }
  }
  function cleanupMpTemporarySkills() {
    for (const f of aliveMp().filter((x) => x.roundFlags.stolen)) {
      const stolen = f.roundFlags.stolen;
      const target = mpState.fighters[stolen.target];
      if (target == null ? void 0 : target.alive) f.skills = f.skills.filter((s) => !(stolen.added || []).includes(s));
      if (target) target.roundFlags.skillStolen = false;
      f.roundFlags.stolen = null;
    }
  }
  function checkMpWinner() {
    if (mpState == null ? void 0 : mpState.over) return true;
    const teams = [...new Set(aliveMp().map((f) => f.team))];
    if (teams.length > 1) return false;
    if (teams.length === 0) {
      mpState.over = true;
      $("mpStatus").textContent = "\u6240\u6709\u9635\u8425\u540C\u65F6\u6DD8\u6C70\uFF0C\u672C\u573A\u5E73\u5C40\u3002";
      logMp("\u6240\u6709\u89D2\u8272\u540C\u65F6\u6B7B\u4EA1\uFF0C\u6BD4\u8D5B\u5224\u5B9A\u4E3A\u5E73\u5C40\u3002", "hit");
      renderMp();
      showMpGameOver(false, null, true);
      return true;
    }
    mpState.over = true;
    const won = teams[0] === getHuman().team;
    $("mpStatus").textContent = won ? "\u4F60\u7684\u9635\u8425\u83B7\u80DC\u3002" : "\u6BD4\u8D5B\u7ED3\u675F\uFF0CAI\u9635\u8425\u83B7\u80DC\u3002";
    logMp(won ? "\u4F60\u7684\u9635\u8425\u8D62\u5F97\u6BD4\u8D5B\u3002" : "\u6700\u540E\u5B58\u6D3B\u7684AI\u9635\u8425\u8D62\u5F97\u6BD4\u8D5B\u3002", "hit");
    renderMp();
    showMpGameOver(won, teams[0]);
    return true;
  }
  function mpTeamTitle(team) {
    if (team == null) return "\u65E0\u4EBA\u5B58\u6D3B";
    return mpState.format === "ffa" ? `\u9635\u8425 ${team + 1}` : MP_TEAM_NAMES[team] || `\u961F\u4F0D ${team + 1}`;
  }
  function mpRosterHtml() {
    return Array.from({ length: mpState.teamCount }, (_, team) => {
      const members = mpState.fighters.filter((f) => f.team === team);
      return `<section><b>${mpTeamTitle(team)}${team === 0 ? "\uFF08\u73A9\u5BB6\u9635\u8425\uFF09" : ""}</b><span>${members.map((f) => `${f.name}\uFF1A${SKILLS[f.skill].name} \xB7 ${f.alive ? "\u5B58\u6D3B" : "\u6DD8\u6C70"}`).join("<br>")}</span></section>`;
    }).join("");
  }
  function showMpGameOver(won, winnerTeam, draw = false) {
    $("mpResultSeal").textContent = draw ? "\u548C" : won ? "\u80DC" : "\u8D25";
    $("mpGameOverTitle").textContent = draw ? "\u672C\u573A\u5E73\u5C40" : won ? "\u4F60\u7684\u9635\u8425\u83B7\u80DC" : "\u591A\u4EBA\u6BD4\u8D5B\u7ED3\u675F";
    $("mpGameOverText").textContent = draw ? `\u6240\u6709\u89D2\u8272\u540C\u65F6\u6DD8\u6C70 \xB7 \u5171${mpState.round}\u56DE\u5408\u3001${mpState.log.length}\u6761\u8BB0\u5F55` : `${mpTeamTitle(winnerTeam)}\u6210\u4E3A\u6700\u540E\u5B58\u6D3B\u9635\u8425 \xB7 \u5171${mpState.round}\u56DE\u5408\u3001${mpState.log.length}\u6761\u8BB0\u5F55`;
    $("mpResultRoster").innerHTML = mpRosterHtml();
    setTimeout(() => {
      if (!$("mpGameOverDialog").open) $("mpGameOverDialog").showModal();
    }, 350);
  }
  async function shareMpResultCard() {
    if (!mpState) return;
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1600;
    canvas.setAttribute("type", "2d");
    canvas.style.position = "fixed";
    canvas.style.left = "-2000px";
    document.body.appendChild(canvas);
    await canvas.$$prepare();
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#f3eddf";
    ctx.fillRect(0, 0, 1200, 1600);
    ctx.fillStyle = "#d73e2d";
    ctx.fillRect(0, 0, 26, 1600);
    ctx.fillStyle = "#171412";
    ctx.font = "bold 76px serif";
    ctx.fillText("\u5408\u638C \xB7 \u591A\u4EBA\u6218\u62A5", 75, 110);
    ctx.fillStyle = "#746b60";
    ctx.font = "28px sans-serif";
    ctx.fillText(`${mpState.teamCount}\u961F \xB7 \u6BCF\u961F${mpState.teamSize}\u4EBA \xB7 ${mpState.targetRule === "team" ? "\u6307\u5B9A\u76EE\u6807\u961F\u4F0D" : "\u5171\u540C\u5224\u5200"}`, 80, 165);
    let y = 245;
    for (let team = 0; team < mpState.teamCount; team++) {
      ctx.fillStyle = team === 0 ? "#e8eef2" : "#fffdf7";
      ctx.fillRect(75, y - 42, 1050, 62 + mpState.fighters.filter((f) => f.team === team).length * 42);
      ctx.fillStyle = "#171412";
      ctx.font = "bold 32px sans-serif";
      ctx.fillText(`${mpTeamTitle(team)}${team === 0 ? "\uFF08\u73A9\u5BB6\u9635\u8425\uFF09" : ""}`, 100, y);
      y += 45;
      ctx.font = "25px sans-serif";
      for (const f of mpState.fighters.filter((x) => x.team === team)) {
        ctx.fillStyle = f.alive ? "#171412" : "#746b60";
        ctx.fillText(`${f.name}\u3000${SKILLS[f.skill].name}\u3000${f.alive ? "\u5B58\u6D3B" : "\u6DD8\u6C70"}`, 115, y);
        y += 40;
      }
      y += 30;
    }
    if (y < 1370) {
      ctx.fillStyle = "#171412";
      ctx.font = "bold 30px sans-serif";
      ctx.fillText("\u5173\u952E\u6218\u6597\u8BB0\u5F55", 80, y);
      y += 42;
      ctx.font = "21px sans-serif";
      for (const item of mpState.log.slice(0, Math.min(7, Math.floor((1420 - y) / 34)))) {
        ctx.fillStyle = item.kind === "hit" ? "#8e211b" : "#51483f";
        ctx.fillText(item.text.slice(0, 46), 95, y);
        y += 34;
      }
    }
    ctx.fillStyle = "#171412";
    ctx.font = "bold 30px sans-serif";
    ctx.fillText(`\u56DE\u5408 ${mpState.round}\u3000\xB7\u3000\u6218\u6597\u8BB0\u5F55 ${mpState.log.length} \u6761`, 80, 1530);
    await window.__saveWechatCard(canvas);
  }
  function logMp(text, kind = "normal", extra = {}) {
    if (!mpState) return;
    mpState.log.unshift({ text: `\u7B2C${mpState.round}\u56DE\u5408\xB7\u51FA\u624B${mpState.step}\u3000${text}`, kind, ...extra });
  }
  function mpShouldResist(attacks, level) {
    return level >= MultiplayerRules.resistanceMinLevel && new Set(attacks.map((a) => a.attacker.team)).size >= 2;
  }
  function runMpRuleChecks() {
    const required = ["hangedMan", "judge", "monster", "thief", "blackEmperor", "audience", "night", "apprentice", "diviner", "pioneer", "nightmare", "miracle", "aurora", "magician", "observer", "fisherman", "dragonKnight", "saint", "singularity", "shepherd"];
    const fake = (team) => ({ attacker: { team } });
    const resistance = mpShouldResist([fake(0), fake(1)], 3) && !mpShouldResist([fake(0), fake(0)], 3) && !mpShouldResist([fake(0), fake(1)], 2);
    const formats = deriveMpFormat(2, 2) === "team" && deriveMpFormat(3, 2) === "multi" && deriveMpFormat(4, 1) === "ffa";
    const inactivity = !mpDiesFromInactivity({ hp: 1, dealtDamageLastRound: false, tookDamageLastRound: false }) && mpDiesFromInactivity({ hp: 0.5, dealtDamageLastRound: false, tookDamageLastRound: false });
    const forge = !mpShouldGainForge({ hitThisStep: true }, { gain: 1 }) && mpShouldGainForge({ hitThisStep: false }, { gain: 1 });
    const extended = runExtendedSelfChecks();
    return { passed: required.every((k) => SKILLS[k]) && SKILL_KEYS.length === 38 && resistance && formats && inactivity && forge && extended.passed, skills: SKILL_KEYS.length, resistance, formats, inactivity, forge, extended, maxTeams: 6, maxTeamSize: 4, maxPlayers: 12 };
  }
  function runExtendedSelfChecks() {
    const failures = [], previous = mpState;
    try {
      for (const [index, key] of SKILL_KEYS.entries()) {
        const f = createMpFighter(index, 0, false, key);
        if (!Number.isFinite(f.hp) || !Number.isFinite(f.attack) || f.hp <= 0) failures.push(`${key}:\u57FA\u7840\u5C5E\u6027`);
        if (Object.values(f.activeUses).some((x) => x < 0) || Object.values(f.fieldUses).some((x) => x < 0)) failures.push(`${key}:\u6280\u80FD\u6B21\u6570`);
      }
      for (const leftSkill of SKILL_KEYS) for (const rightSkill of SKILL_KEYS) {
        const left = createMpFighter(0, 0, false, leftSkill), right = createMpFighter(1, 1, false, rightSkill);
        left.energy = 3;
        right.energy = 3;
        mpState = { fighters: [left, right], global: { friendlyFireTeams: /* @__PURE__ */ new Set(), multiHitTeams: /* @__PURE__ */ new Set(), disabledSkillTeams: /* @__PURE__ */ new Set(), damageReductionTeams: /* @__PURE__ */ new Map() }, targetRule: "team", round: 1, step: 1, log: [], weaponHistory: [], fieldDeclarations: [] };
        const leftLegal = mpLegalMoves(left), rightLegal = mpLegalMoves(right);
        if (!leftLegal.length || !rightLegal.length) failures.push(`\u7EC4\u5408\u65E0\u884C\u52A8:${leftSkill}/${rightSkill}`);
        if (leftLegal.includes("scissors") || rightLegal.includes("scissors")) failures.push(`\u7EC4\u5408\u526A\u5200:${leftSkill}/${rightSkill}`);
        const attack = makeMpAttack(left, leftLegal.find((k) => {
          var _a;
          return ((_a = skillMove(k)) == null ? void 0 : _a.type) === "attack";
        }) || "knife");
        if (!Number.isFinite(attack.damage) || !Number.isFinite(attack.level)) failures.push(`\u7EC4\u5408\u653B\u51FB:${leftSkill}/${rightSkill}`);
      }
      const a = createMpFighter(0, 0, false, "generalist"), b = createMpFighter(1, 1, false, "generalist");
      mpState = { fighters: [a, b], global: { friendlyFireTeams: /* @__PURE__ */ new Set(), multiHitTeams: /* @__PURE__ */ new Set(), disabledSkillTeams: /* @__PURE__ */ new Set(), damageReductionTeams: /* @__PURE__ */ new Map() }, targetRule: "team", round: 1, step: 1, log: [], weaponHistory: [], fieldDeclarations: [] };
      for (let energy = 0; energy <= 6; energy++) {
        a.energy = energy;
        for (let n = 0; n < 30; n++) {
          const move = chooseMpAiMove(a);
          if (!mpLegalMoves(a).includes(move)) failures.push(`AI\u975E\u6CD5\u884C\u52A8:${energy}:${move}`);
        }
      }
      const snap = captureMpTransaction();
      a.hp = 0.25;
      restoreMpTransaction(snap);
      if (mpState.fighters[0].hp !== snap.fighters[0].hp) failures.push("\u4E8B\u52A1\u56DE\u6EDA");
      if (mpLegalMoves(a).includes("scissors")) failures.push("\u591A\u4EBA\u526A\u5200");
    } catch (error) {
      failures.push(`\u5F02\u5E38:${error.message}`);
    }
    mpState = previous;
    return { passed: failures.length === 0, failures };
  }
  function createModeStatePort(mode, read, replace) {
    return Object.freeze({
      mode,
      read,
      replace,
      snapshot() {
        const current = read();
        return current == null ? current : structuredClone(current);
      },
      restore(snapshot) {
        replace(snapshot == null ? snapshot : structuredClone(snapshot));
      }
    });
  }
  const DUEL_STATE_PORT = createModeStatePort("duel", () => state, (next) => {
    state = next;
  });
  const MULTIPLAYER_STATE_PORT = createModeStatePort("multiplayer", () => mpState, (next) => {
    mpState = next;
  });
  async function runDuelTransaction(work) {
    const snapshot = DUEL_STATE_PORT.snapshot();
    try {
      return await work();
    } catch (error) {
      DUEL_STATE_PORT.restore(snapshot);
      render();
      throw error;
    }
  }
  const SHARED_SERVICES = Object.freeze({ moves: MOVES, noSkillChallenge: resolveNoSkillChallenge, rps: randomRpsGesture });
  const DuelSettlement = defineModule("duel-settlement", {
    resolveBase: resolveDuelCombat,
    resolveSkills: resolveWithSkills,
    resolveDamage: resolveDuelDamagePipeline,
    settleRound: settleDuelRound,
    createRoundEvent: createDuelRoundEvent
  });
  const MultiplayerSettlement = defineModule("multiplayer-settlement", {
    createContext: createMultiplayerStepContext,
    commit: commitMultiplayerActions,
    judge: resolveMultiplayerAttackQueue,
    postAttack: settleMultiplayerForgeAndRoundSkills,
    finalize: finalizeMultiplayerStep,
    resolve: resolveMpActions
  });
  const DUEL_ENGINE = Object.freeze({
    id: "duel-v3",
    mode: "duel",
    statePort: DUEL_STATE_PORT,
    shared: SHARED_SERVICES,
    settlement: DuelSettlement,
    resolveBase: DuelSettlement.resolveBase,
    resolveWithSkills: DuelSettlement.resolveSkills,
    resolveDamage: DuelSettlement.resolveDamage,
    settleRound: (...args) => runDuelTransaction(() => DuelSettlement.settleRound(...args)),
    state: () => DUEL_STATE_PORT.read()
  });
  const MULTIPLAYER_ENGINE = Object.freeze({
    id: "multiplayer-v3",
    mode: "multiplayer",
    statePort: MULTIPLAYER_STATE_PORT,
    shared: SHARED_SERVICES,
    settlement: MultiplayerSettlement,
    createStepContext: MultiplayerSettlement.createContext,
    commitActions: MultiplayerSettlement.commit,
    resolveAttackQueue: MultiplayerSettlement.judge,
    settleRoundSkills: MultiplayerSettlement.postAttack,
    finalizeStep: MultiplayerSettlement.finalize,
    resolveActions: MultiplayerSettlement.resolve,
    resolveJudge: resolveMultiplayerJudgeCombat,
    applyDamage: applyMpDamage,
    settleDeaths: settleMpDeaths,
    state: () => MULTIPLAYER_STATE_PORT.read()
  });
  function runEngineIsolationChecks() {
    const failures = [];
    if (DUEL_ENGINE === MULTIPLAYER_ENGINE) failures.push("\u4E24\u4E2A\u6A21\u5F0F\u9519\u8BEF\u5730\u5171\u4EAB\u540C\u4E00\u5F15\u64CE\u5BF9\u8C61");
    if (DUEL_ENGINE.id === MULTIPLAYER_ENGINE.id) failures.push("\u4E24\u4E2A\u6A21\u5F0F\u7F3A\u5C11\u72EC\u7ACB\u5F15\u64CE\u6807\u8BC6");
    if (DUEL_ENGINE.mode === MULTIPLAYER_ENGINE.mode) failures.push("\u4E24\u4E2A\u5F15\u64CE\u9519\u8BEF\u5730\u58F0\u660E\u4E86\u76F8\u540C\u6A21\u5F0F");
    if (DUEL_ENGINE.statePort === MULTIPLAYER_ENGINE.statePort) failures.push("\u4E24\u4E2A\u5F15\u64CE\u9519\u8BEF\u5730\u5171\u4EAB\u72B6\u6001\u7AEF\u53E3");
    if (DUEL_ENGINE.settlement === MULTIPLAYER_ENGINE.settlement) failures.push("\u4E24\u4E2A\u6A21\u5F0F\u9519\u8BEF\u5730\u5171\u4EAB\u7ED3\u7B97\u6A21\u5757");
    if (DUEL_ENGINE.resolveDamage === MULTIPLAYER_ENGINE.applyDamage) failures.push("\u4E24\u4E2A\u6A21\u5F0F\u9519\u8BEF\u5730\u5171\u4EAB\u4F24\u5BB3\u5165\u53E3");
    return { passed: failures.length === 0, failures, duel: DUEL_ENGINE.id, multiplayer: MULTIPLAYER_ENGINE.id };
  }
  function runRuleScenarioTests() {
    const results = [];
    const test = (id, description, run) => {
      try {
        const passed = Boolean(run());
        results.push({ id, description, passed, error: passed ? null : "\u65AD\u8A00\u672A\u6EE1\u8DB3" });
      } catch (error) {
        results.push({ id, description, passed: false, error: error.message });
      }
    };
    test("D01", "\u53CC\u4EBA\u953B\u9020\u906D\u5C0F\u5200\u547D\u4E2D", () => {
      const r = resolveDuelCombat("forge", "knife");
      return r.playerHit && !r.aiHit;
    });
    test("D02", "\u53CC\u4EBA\u76F8\u540C\u7B49\u7EA7\u653B\u51FB\u5FC5\u5B9A\u62B5\u5200", () => ATTACK_KEYS.filter((k) => k !== "scissors").every((key) => {
      const r = resolveDuelCombat(key, key);
      return !r.playerHit && !r.aiHit && !r.reset;
    }));
    test("D03", "\u6B66\u58EB\u5200\u88AB\u63A5\u4F4F\u5E76\u89E6\u53D1\u91CD\u5F00", () => {
      const r = resolveDuelCombat("katana", "catch");
      return !r.aiHit && r.reset;
    });
    test("D04", "\u624B\u91CC\u5251\u7A81\u7834\u666E\u901A\u9632", () => resolveDuelCombat("shuriken", "guard").aiHit);
    test("D05", "\u865A\u65E0\u65E0\u6CD5\u88AB\u95EA\u9632\u5FA1", () => resolveDuelCombat("void", "flash").aiHit);
    test("D06", "\u526A\u5200\u88AB\u953B\u9020\u514B\u5236", () => resolveDuelCombat("scissors", "forge").playerHit);
    test("D07", "\u65E0\u6280\u80FD\u547D\u4E2D\u91CD\u5F00\u4F1A\u5C06\u53CC\u65B9\u80FD\u91CF\u5F52\u96F6", () => basicEnergyAfterRound(5, "knife", false, true) === 0 && basicEnergyAfterRound(4, "forge", true, true) === 0);
    test("D08", "\u653B\u51FB\u6253\u51FA\u3001\u653B\u51FB\u547D\u4E2D\u3001\u9020\u6210\u4F24\u5BB3\u662F\u4E09\u4E2A\u72EC\u7ACB\u72B6\u6001", () => {
      const event = createDuelRoundEvent(resolveDuelCombat("forge", "knife"), "forge", "knife");
      return event.attackPlayed.ai && !event.attackPlayed.player && event.hit.player && event.rawDamage.player === 0;
    });
    test("D09", "\u53CC\u4EBA\u91CD\u590D\u89D2\u8272\u8BBE\u7F6E\u4F1A\u88AB\u62D2\u7EDD", () => !validateMpRoleSelection(["monster", "monster"], 2).ok);
    test("D10", "\u5012\u540A\u4EBA\u6263\u8840\u7ACB\u5373\u5199\u5165\u89D2\u8272\u751F\u547D\u4E14\u5141\u8BB8\u6263\u81F3\u6B7B\u4EA1", () => {
      const fighter = { hp: 1.5 }, events = [];
      const paid = commitHangedSacrifice(fighter, 1.5, "\u6D4B\u8BD5", events);
      return paid === 1.5 && fighter.hp === 0 && fighter.lastHangedSacrifice.after === 0;
    });
    test("M01", "\u4E09\u7EA7\u4E24\u654C\u5BF9\u9635\u8425\u540C\u7EA7\u653B\u51FB\u5373\u53EF\u62B5\u5200", () => mpShouldResist([{ attacker: { team: 0 } }, { attacker: { team: 1 } }], 3));
    test("M02", "\u4E00\u4E8C\u7EA7\u653B\u51FB\u4E0D\u80FD\u62B5\u5200", () => !mpShouldResist([{ attacker: { team: 0 } }, { attacker: { team: 1 } }], 2));
    test("M03", "\u540C\u9635\u8425\u76F8\u540C\u653B\u51FB\u4E0D\u80FD\u62B5\u5200", () => !mpShouldResist([{ attacker: { team: 0 } }, { attacker: { team: 0 } }], 4));
    test("D11", "\u5012\u540A\u4EBA\u6309\u6BCF\u540D\u5176\u4ED6\u6B7B\u4EA1\u8005\u5206\u522B\u6062\u590D0.5\u751F\u547D", () => hangedRecoveryForDeaths("player", ["ai"]) === 0.5 && hangedRecoveryForDeaths(1, [2, 3, 4]) === 1.5 && hangedRecoveryForDeaths(1, [1]) === 0);
    test("M04", "\u9AD8\u7B49\u7EA7\u653B\u51FB\u52A8\u4F5C\u7684\u9632\u5FA1\u7B49\u7EA7\u8986\u76D6\u540C\u7EA7\u53CA\u4F4E\u7EA7\u653B\u51FB", () => {
      const fighter = { id: 1 }, attacks = [{ attacker: fighter, level: 4 }];
      return mpActionDefenseCoversAttack(fighter, 4, attacks) && mpActionDefenseCoversAttack(fighter, 3, attacks) && !mpActionDefenseCoversAttack(fighter, 5, attacks);
    });
    test("M05", "\u865A\u65E0\u6807\u8BB0\u4E3A\u591A\u4EBA\u8303\u56F4\u653B\u51FB", () => MOVES.void.multiTarget === true && MultiplayerRules.voidTargets === "all-legal");
    test("M06", "\u6BCF\u6B21\u63A5\u6216\u95EA\u53EA\u80FD\u9632\u5FA1\u4E00\u628A\u5200", () => MultiplayerRules.defenseQuotaPerAction === 1);
    test("M07", "\u5224\u5200\u547D\u4E2D\u540D\u989D\u6BCF\u56DE\u5408\u4E00\u6B21", () => MultiplayerRules.maxJudgementHitsPerRound === 1);
    test("M08", "\u968F\u673A\u89D2\u8272\u4E0D\u4F1A\u649E\u4E0A\u4EFB\u4F55\u624B\u52A8\u4FDD\u7559\u89D2\u8272", () => {
      const assigned = assignUniqueMpSkills(["generalist", "random", "monster", "random", "judge"]);
      return new Set(assigned).size === assigned.length && assigned[0] === "generalist" && assigned[2] === "monster" && assigned[4] === "judge";
    });
    test("M09", "\u8D85\u8FC712\u4EBA\u7684\u6BD4\u8D5B\u8BBE\u7F6E\u88AB\u62D2\u7EDD", () => !validateMpRoleSelection(Array(13).fill("random"), 13).ok);
    test("M10", "1\u8840\u89D2\u8272\u4E0D\u4F1A\u56E0\u4F4E\u8840\u91CF\u9759\u9ED8\u6B7B\u4EA1\uFF0C0.5\u8840\u4F1A", () => !mpDiesFromInactivity({ hp: 1, dealtDamageLastRound: false, tookDamageLastRound: false }) && mpDiesFromInactivity({ hp: 0.5, dealtDamageLastRound: false, tookDamageLastRound: false }));
    test("M11", "\u96F6\u4F24\u5BB3\u4ECD\u53EF\u4E0E\u653B\u51FB\u547D\u4E2D\u72B6\u6001\u540C\u65F6\u5B58\u5728", () => {
      const event = createDuelRoundEvent(outcome(true, false, false, "\u547D\u4E2D", "\u6D4B\u8BD5"), "forge", "knife");
      event.finalDamage.player = 0;
      return event.hit.player && event.finalDamage.player === 0;
    });
    test("M12", "\u591A\u4EBA\u526A\u5200\u59CB\u7EC8\u4ECE\u5408\u6CD5\u884C\u52A8\u4E2D\u79FB\u9664", () => {
      const previous = mpState;
      try {
        const fighter = createMpFighter(0, 0, true, "generalist");
        fighter.energy = 6;
        mpState = { fighters: [fighter], global: { disabledSkillTeams: /* @__PURE__ */ new Set() }, targetRule: "global" };
        return !mpLegalMoves(fighter).includes("scissors");
      } finally {
        mpState = previous;
      }
    });
    test("M13", "\u5B66\u5F92\u3001\u76D7\u8D3C\u6216\u79D8\u5076\u83B7\u5F97\u58C1\u5792\u540E\u89E3\u9501\u5927\u76FE", () => {
      const previous = mpState;
      try {
        const fighter = createMpFighter(0, 0, true, "apprentice");
        fighter.skills.push("bulwark");
        fighter.energy = 2;
        mpState = { fighters: [fighter], global: { disabledSkillTeams: /* @__PURE__ */ new Set() }, targetRule: "global" };
        return mpLegalMoves(fighter).includes("bigShield") && mpMoveCost(fighter, "bigShield") === 2;
      } finally {
        mpState = previous;
      }
    });
    test("M14", "\u767D\u5854\u53EF\u5728\u9996\u6B21\u5C0F\u5200\u8FD4\u8FD8\u540E\u518D\u51FA\u4E00\u628A\uFF0C\u4F46\u540C\u6B66\u5668\u4E0D\u91CD\u590D\u8FD4\u8FD8", () => whiteTowerRefunds("knife", []) && !whiteTowerRefunds("knife", ["knife"]));
    test("M15", "\u6076\u9B54\u4E0E\u68A6\u9B47\u81EA\u7136\u5012\u8BA1\u65F6\u53EA\u4F4D\u4E8E\u771F\u6B63\u56DE\u5408\u7ED3\u675F\u9636\u6BB5", () => !settleMultiplayerForgeAndRoundSkills.toString().includes('skillEnabledMp(f,"demon")') && !settleMultiplayerForgeAndRoundSkills.toString().includes("nightmareClock--") && settleMultiplayerRoundEndSkills.toString().includes('skillEnabledMp(f,"demon")') && settleMultiplayerRoundEndSkills.toString().includes("nightmareClock--"));
    test("A01", "\u5730\u72F1\u96BE\u5EA6\u4ECD\u4FDD\u755965%\u9AD8\u538B\u5224\u65AD\u4F46\u4E0D\u518D\u59CB\u7EC8\u9501\u5B9A\u552F\u4E00\u5019\u9009", () => LEVELS.hell.responseRate === 0.65 && LEVELS.hell.shortlist === 2 && LEVELS.hell.temperature >= 0.1 && MP_AI_LEVELS.hell.spread >= 0.15);
    test("S01", "\u591A\u4EBA\u5173\u952E\u53CD\u5E94\u6280\u80FD\u4F18\u5148\u7EA7\u6B63\u786E", () => {
      const h = SkillTiming.inspect("multiplayer").filter((x) => x.phase === "hit-confirmed");
      const byId = Object.fromEntries(h.map((x) => [x.id, x.priority]));
      return byId["mp-magician-rewrite"] < byId["mp-monster-rps"] && byId["mp-monster-rps"] < byId["mp-hanged-boost"];
    });
    test("S02", "\u53CC\u4EBA\u9B54\u672F\u5E08\u5148\u4E8E\u5012\u540A\u4EBA\u9636\u6BB5", () => {
      const h = SkillTiming.inspect("duel");
      return h.some((x) => x.id === "duel-magician-rewrite" && x.priority === 100) && h.some((x) => x.id === "duel-hanged-boost" && x.priority === 300);
    });
    return { passed: results.every((item) => item.passed), total: results.length, passedCount: results.filter((item) => item.passed).length, failed: results.filter((item) => !item.passed), results };
  }
  init();
  initMultiplayerFeature();
  globalThis.__hezhangBasicEnergyChecks = runBasicEnergyChecks();
  globalThis.__hezhangMpChecks = runMpRuleChecks();
  globalThis.__hezhangEngineIsolationChecks = runEngineIsolationChecks();
  globalThis.__hezhangRuleScenarioTests = runRuleScenarioTests();
  globalThis.__hezhangModules = [...ENGINE_MODULES.keys()];
  const online = { session: null, view: null, timer: null, polling: false, sending: false, prompt: null, active: false, generation: 0, lastView: null, hidden: false };
  try {
    online.session = JSON.parse(localStorage.getItem("hezhang.online.session") || "null");
  } catch (_) {
  }
  const original = { getHuman, renderMpMoves, scheduleMpAutoPlay, activateMpSkill, playMpStep };
  const revive = (value) => {
    if (!value || typeof value !== "object") return value;
    if (value.$set) return new Set(value.$set.map(revive));
    if (value.$map) return new Map(value.$map.map(([k, v]) => [revive(k), revive(v)]));
    if (Array.isArray(value)) return value.map(revive);
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, revive(v)]));
  };
  function network(path, method = "GET", body = null, session = online.session) {
    return new Promise((resolve, reject) => wx.request({
      url: session.url + path,
      method,
      data: body || void 0,
      header: { "content-type": "application/json", ...session.token ? { Authorization: "Bearer " + session.token } : {} },
      timeout: 1e4,
      success(res) {
        var _a;
        if (res.statusCode === 200 && res.data.ok) resolve(res.data.result);
        else reject(Error(((_a = res.data) == null ? void 0 : _a.error) || "\u670D\u52A1\u5668\u8FD4\u56DE\u5F02\u5E38"));
      },
      fail() {
        reject(Error("\u8FDE\u63A5\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u670D\u52A1\u5668\u5730\u5740\u3001\u7F51\u7EDC\u548C\u5F00\u53D1\u8005\u5DE5\u5177\u7684\u57DF\u540D\u8BBE\u7F6E"));
      }
    }));
  }
  function rememberSession() {
    localStorage.setItem("hezhang.online.session", JSON.stringify(online.session));
  }
  function stopOnline() {
    online.active = false;
    online.generation++;
    online.lastView = null;
    clearTimeout(online.timer);
    online.timer = null;
    bar.classList.add("hidden");
  }
  const homeActions = document.querySelector("#homeView .hero-actions") || document.querySelector(".hero-actions");
  const onlineButton = document.createElement("button");
  onlineButton.className = "secondary-button";
  onlineButton.textContent = "\u771F\u4EBA\u8054\u673A";
  homeActions.appendChild(onlineButton);
  const lobby = document.createElement("section");
  lobby.id = "onlineView";
  lobby.className = "view";
  document.body.appendChild(lobby);
  const bar = document.createElement("div");
  bar.className = "online-panel hidden";
  $("mpArena").parentNode.insertBefore(bar, $("mpArena"));
  function showOnlineSetup() {
    var _a, _b, _c, _d;
    stopOnline();
    stopTimer();
    setView("online");
    lobby.innerHTML = `<div class="panel online-panel"><p class="eyebrow">\u5B8C\u6574\u6280\u80FD \xB7 \u771F\u4EBA\u623F\u95F4</p><h2>\u8054\u673A\u5BF9\u6218</h2>
    <label>\u670D\u52A1\u5668\u5730\u5740<input id="onlineUrl" type="text" value="${escapeHtml(((_a = online.session) == null ? void 0 : _a.url) || "http://127.0.0.1:3238")}"></label>
    <label>\u6635\u79F0<input id="onlineName" type="text" maxlength="16" value="${escapeHtml(((_b = online.session) == null ? void 0 : _b.name) || "\u73A9\u5BB6")}"></label>
    <label>\u89D2\u8272<select id="onlineRole"><option value="random">\u968F\u673A\u89D2\u8272</option><option value="none">\u65E0\u6280\u80FD</option>${SKILL_KEYS.map((k) => `<option value="${k}">${SKILLS[k].name}</option>`).join("")}</select></label>
    <div class="settings-form"><label>\u961F\u4F0D\u6570\u91CF<select id="onlineTeams">${[2, 3, 4, 5, 6].map((v) => `<option value="${v}">${v}</option>`).join("")}</select></label><label>\u6BCF\u961F\u4EBA\u6570<select id="onlineSize">${[1, 2, 3, 4].map((v) => `<option value="${v}">${v}</option>`).join("")}</select></label></div>
    <button id="onlineCreate" class="primary-button">\u521B\u5EFA\u623F\u95F4</button>
    <label>\u623F\u95F4\u53F7<input id="onlineCode" type="number" maxlength="6"></label><button id="onlineJoin" class="secondary-button">\u52A0\u5165\u623F\u95F4</button>
    ${((_c = online.session) == null ? void 0 : _c.token) ? '<button id="onlineReconnect" class="secondary-button">\u56DE\u5230\u4E0A\u6B21\u623F\u95F4</button>' : ""}
    <p id="onlineMessage">\u4E24\u540D\u4EE5\u4E0A\u771F\u4EBA\u53EF\u5F00\u5C40\uFF0C\u7A7A\u4F4D\u7531 AI \u8865\u9F50\u3002\u8054\u673A\u9700\u8981\u670D\u52A1\u5668\u4FDD\u6301\u8FD0\u884C\u3002</p></div>`;
    $("onlineRole").value = "random";
    $("onlineTeams").value = "2";
    $("onlineSize").value = "1";
    async function connect(join) {
      if (online.sending) return;
      online.sending = true;
      try {
        const url = $("onlineUrl").value.trim().replace(/\/$/, "");
        if (!/^https?:\/\/[^\s/?#]+(?::\d+)?$/.test(url)) throw Error("\u8BF7\u8F93\u5165\u5B8C\u6574\u670D\u52A1\u5668\u5730\u5740\uFF0C\u4F8B\u5982 http://127.0.0.1:3238");
        const name = $("onlineName").value.trim(), role = $("onlineRole").value;
        const result = await network(
          join ? "/rooms/" + $("onlineCode").value.trim() + "/join" : "/rooms",
          "POST",
          { name, role, teamCount: Number($("onlineTeams").value), teamSize: Number($("onlineSize").value) },
          { url }
        );
        online.session = { url, name, code: result.room.code, token: result.token };
        rememberSession();
        enterOnline(result.room);
      } catch (error) {
        $("onlineMessage").textContent = error.message;
      } finally {
        online.sending = false;
      }
    }
    $("onlineCreate").addEventListener("click", () => connect(false));
    $("onlineJoin").addEventListener("click", () => connect(true));
    (_d = $("onlineReconnect")) == null ? void 0 : _d.addEventListener("click", async () => {
      try {
        enterOnline(await network("/rooms/" + online.session.code));
      } catch (e) {
        $("onlineMessage").textContent = e.message;
      }
    });
  }
  onlineButton.addEventListener("click", showOnlineSetup);
  $("homeButton").addEventListener("click", stopOnline);
  $("mpExitButton").addEventListener("click", stopOnline);
  function enterOnline(view) {
    online.active = true;
    online.generation++;
    applyOnline(view);
    pollOnline();
  }
  async function pollOnline() {
    clearTimeout(online.timer);
    if (!online.active || online.hidden) return;
    const generation = online.generation;
    if (!online.sending && !online.polling) {
      online.polling = true;
      try {
        const v = await network("/rooms/" + online.session.code);
        if (online.active && generation === online.generation) applyOnline(v);
      } catch (e) {
        if (online.active) {
          const status = $("onlineStatus") || $("mpStatus");
          status.textContent = e.message + "\uFF1B\u6B63\u5728\u91CD\u8FDE\u3002";
        }
      } finally {
        online.polling = false;
      }
    }
    if (online.active && !online.hidden && generation === online.generation) online.timer = setTimeout(pollOnline, 1200);
  }
  async function sendOnline(action, extra = {}) {
    if (online.sending) return;
    online.sending = true;
    const body = { action, turn: online.view.turn, requestId: Date.now().toString(36) + "-" + Math.random().toString(36).slice(2), ...extra };
    try {
      let view;
      try {
        view = await network("/rooms/" + online.session.code + "/command", "POST", body);
      } catch (e) {
        if (e.message.includes("\u8FDE\u63A5\u5931\u8D25")) view = await network("/rooms/" + online.session.code + "/command", "POST", body);
        else throw e;
      }
      if (view.closed) {
        stopOnline();
        online.session = null;
        rememberSession();
        showOnlineSetup();
        return;
      }
      if (online.active) applyOnline(view);
    } catch (e) {
      showToast(e.message);
    } finally {
      online.sending = false;
    }
  }
  function applyOnline(view) {
    var _a, _b;
    online.view = view;
    const signature = JSON.stringify(view);
    if (signature === online.lastView) {
      promptOnline(view);
      return;
    }
    online.lastView = signature;
    if (view.stage === "lobby") {
      setView("online");
      lobby.innerHTML = `<div class="panel online-panel"><h2>\u623F\u95F4 ${view.code}</h2><p>\u5EA7\u4F4D\u987A\u5E8F\u51B3\u5B9A\u5206\u961F\uFF1B\u4E0D\u8DB3\u7684\u5EA7\u4F4D\u5F00\u5C40\u65F6\u8865 AI\u3002</p>${view.players.map((p) => {
        var _a2;
        return `<p>${escapeHtml(p.name)} \xB7 \u9635\u8425${p.team + 1} \xB7 ${((_a2 = SKILLS[p.role]) == null ? void 0 : _a2.name) || "\u968F\u673A"}${p.id === view.you ? "\uFF08\u4F60\uFF09" : ""}</p>`;
      }).join("")}<p id="onlineStatus">\u7B49\u5F85\u73A9\u5BB6\u52A0\u5165 \xB7 ${view.players.length}/${view.teamCount * view.teamSize}\u4EBA</p>${view.you === 0 ? '<button id="onlineStart" class="primary-button">\u5F00\u59CB\u5BF9\u5C40</button><button id="onlineClose" class="text-button">\u7ED3\u675F\u623F\u95F4</button>' : ""}<button id="onlineBack" class="secondary-button">\u8FD4\u56DE\u9996\u9875</button></div>`;
      (_a = $("onlineStart")) == null ? void 0 : _a.addEventListener("click", () => sendOnline("start"));
      $("onlineBack").addEventListener("click", () => {
        stopOnline();
        setView("home");
      });
    } else if (view.game) {
      mpState = revive(view.game);
      mpState.fighters.forEach((f) => {
        f.human = f.id === view.you;
      });
      if (!$("multiplayerView").classList.contains("active")) setView("multiplayer");
      renderMp();
      bar.classList.remove("hidden");
      $("mpSpectatorControls").classList.add("hidden");
      const pending = view.waitingFor.length ? "\u7B49\u5F85 " + view.waitingFor.join("\u3001") + " \u4F5C\u51FA\u9009\u62E9" : view.busy ? "\u670D\u52A1\u7AEF\u7ED3\u7B97\u4E2D" : view.stage === "prepare" ? "\u53D1\u52A8\u6280\u80FD\u540E\u70B9\u51FB\u51C6\u5907" : view.stage === "choose" ? "\u5168\u5458\u5DF2\u51C6\u5907\uFF0C\u8BF7\u540C\u65F6\u51FA\u62DB" : view.stage === "over" ? view.game.winnerTeam == null ? "\u672C\u573A\u5E73\u5C40" : `\u9635\u8425${view.game.winnerTeam + 1}\u83B7\u80DC` : view.error || "\u7B49\u5F85\u4E2D";
      bar.innerHTML = `<p>\u623F\u95F4 ${view.code} \xB7 ${pending}</p><small>${view.players.map((p) => `${escapeHtml(p.name)}\uFF1A${p.submitted ? "\u5DF2\u9501\u5B9A" : p.ready ? "\u5DF2\u51C6\u5907" : "\u7B49\u5F85"}`).join(" / ")}</small>${view.you === 0 ? '<button id="onlineClose" class="text-button">\u7ED3\u675F\u623F\u95F4</button>' : ""}`;
      $("mpStatus").textContent = view.error || pending;
    }
    (_b = (view.stage === "lobby" ? lobby : bar).querySelector("#onlineClose")) == null ? void 0 : _b.addEventListener("click", () => sendOnline("close"));
    promptOnline(view);
  }
  function promptOnline(view) {
    if (view.prompts.length && !online.prompt) {
      const q = view.prompts[0];
      online.prompt = q.id;
      chooseMpOption(q.title, q.options, { cancelText: q.required ? "\u5FC5\u987B\u9009\u62E9\u4E00\u4E2A\u9009\u9879" : q.cancelText, eyebrow: "\u8F6E\u5230\u4F60\u54CD\u5E94" }).then(async (value) => {
        if (value !== null || !q.required) await sendOnline("answer", { promptId: q.id, value });
      }).finally(() => {
        online.prompt = null;
      });
    }
  }
  getHuman = () => {
    var _a;
    return online.active && ((_a = online.view) == null ? void 0 : _a.game) ? mpState.fighters.find((f) => f.id === online.view.you) : original.getHuman();
  };
  scheduleMpAutoPlay = (...args) => {
    if (!online.active) return original.scheduleMpAutoPlay(...args);
  };
  playMpStep = (move) => online.active ? sendOnline("move", { move }) : original.playMpStep(move);
  activateMpSkill = (skill) => online.active ? sendOnline("skill", { skill }) : original.activateMpSkill(skill);
  renderMpMoves = () => {
    var _a;
    if (!online.active) return original.renderMpMoves();
    const v = online.view;
    $("mpMoveGrid").innerHTML = (v.canReady ? '<button class="mp-move" id="onlineReady">\u51C6\u5907\u5B8C\u6210</button>' : "") + v.skills.map(([key, label]) => `<button class="mp-move" data-online-skill="${key}">${label}</button>`).join("") + v.moves.map((key) => `<button class="mp-move" data-online-move="${key}"><b>${skillMove(key).name}</b><small>${mpMoveCost(getHuman(), key)}\u953B</small></button>`).join("");
    (_a = $("onlineReady")) == null ? void 0 : _a.addEventListener("click", () => sendOnline("ready"));
    $("mpMoveGrid").querySelectorAll("[data-online-skill]").forEach((b) => b.addEventListener("click", () => activateMpSkill(b.dataset.onlineSkill)));
    $("mpMoveGrid").querySelectorAll("[data-online-move]").forEach((b) => b.addEventListener("click", () => playMpStep(b.dataset.onlineMove)));
  };
  if (wx.onHide) wx.onHide(() => {
    online.hidden = true;
    clearTimeout(online.timer);
    online.timer = null;
  });
  if (wx.onShow) wx.onShow(() => {
    online.hidden = false;
    if (online.active) pollOnline();
  });
  window.__hezhangApp = { startGame, startMultiplayer, playMpStep, activateMpSkill, chooseMpOption, getData: () => data, getDuel: () => state, getMp: () => mpState, roles: SKILLS };
}



/***/ })
/******/ ])["default"];}