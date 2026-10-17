const { createApp } = require('../../js/app');

Page({
  data: { error: '' },
  onReady() {
    this.handlers = {};
    this.disposed = false;
    this.createSelectorQuery().select('#game').fields({ node: true, size: true }).exec(result => {
      if (this.disposed) return;
      const field = result && result[0];
      if (!field || !field.node) {
        this.setData({ error: 'Canvas 初始化失败，请更新微信或开发者工具基础库后重试。' });
        return;
      }
      const api = {
        createCanvas: () => field.node,
        getWindowInfo: () => wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync(),
        getMenuButtonBoundingClientRect: () => wx.getMenuButtonBoundingClientRect(),
        getStorageSync: key => wx.getStorageSync(key),
        setStorageSync: (key, value) => wx.setStorageSync(key, value),
        showToast: options => wx.showToast(options),
        showModal: options => wx.showModal(options),
        onTouchStart: fn => { this.handlers.start = fn; },
        onTouchMove: fn => { this.handlers.move = fn; },
        onTouchEnd: fn => { this.handlers.end = fn; },
        onTouchCancel: fn => { this.handlers.cancel = fn; },
        onShow: fn => { this.handlers.show = fn; },
        onWindowResize: fn => {
          this.resizeHandler = fn;
          wx.onWindowResize(fn);
        }
      };
      try { this.game = createApp(api); }
      catch (error) {
        console.error('合掌页面初始化失败', error);
        this.setData({ error: '界面初始化失败：' + error.message });
      }
    });
  },
  onShow() { if (this.handlers && this.handlers.show) this.handlers.show(); },
  onHide() { if (this.handlers && this.handlers.cancel) this.handlers.cancel(); },
  onUnload() {
    this.disposed = true;
    if (this.resizeHandler) wx.offWindowResize(this.resizeHandler);
    this.handlers = {}; this.game = null;
  },
  dispatchTouch(name, event) {
    if (!this.handlers || !this.handlers[name]) return;
    // Mini-program Canvas events may provide x/y instead of clientX/clientY.
    const normalize = list => (list || []).map(t => ({
      clientX: t.clientX == null ? t.x : t.clientX,
      clientY: t.clientY == null ? t.y : t.clientY
    }));
    this.handlers[name]({ touches: normalize(event.touches), changedTouches: normalize(event.changedTouches) });
  },
  onCanvasStart(event) { this.dispatchTouch('start', event); },
  onCanvasMove(event) { this.dispatchTouch('move', event); },
  onCanvasEnd(event) { this.dispatchTouch('end', event); },
  onCanvasCancel(event) { this.dispatchTouch('cancel', event); }
});
