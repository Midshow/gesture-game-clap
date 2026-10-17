// Browser APIs used by the released game but not supplied by kbone.
export default function install(window, document, wx) {
  window.structuredClone = function clone(value, seen = new Map()) {
    if (value === null || typeof value !== 'object') return value;
    if (seen.has(value)) return seen.get(value);
    const out = value instanceof Map ? new Map() : value instanceof Set ? new Set() : Array.isArray(value) ? [] : {};
    seen.set(value, out);
    if (value instanceof Map) value.forEach((v,k) => out.set(clone(k,seen),clone(v,seen)));
    else if (value instanceof Set) value.forEach(v => out.add(clone(v,seen)));
    else Object.keys(value).forEach(k => { out[k] = clone(value[k],seen); });
    return out;
  };
  if (!Array.prototype.at) Object.defineProperty(Array.prototype, 'at', {value(n) {return this[n < 0 ? this.length + n : n];}});
  if (!Object.fromEntries) Object.fromEntries = entries => {const result={};for(const [k,v] of entries)result[k]=v;return result;};
  const proto = window.Element.prototype;
  if (!proto.insertAdjacentHTML) proto.insertAdjacentHTML = function(position, html) {
    const box=this.ownerDocument.createElement('div');box.innerHTML=String(html);
    const nodes=Array.from(box.childNodes),where=String(position).toLowerCase();
    if(where==='beforebegin'||where==='afterend'){
      if(!this.parentNode)return;
      const anchor=where==='beforebegin'?this:this.nextSibling;
      nodes.forEach(node=>this.parentNode.insertBefore(node,anchor));
    }else if(where==='afterbegin'){
      const anchor=this.firstChild;nodes.forEach(node=>this.insertBefore(node,anchor));
    }else if(where==='beforeend')nodes.forEach(node=>this.appendChild(node));
    else throw Error('不支持的插入位置：'+where);
  };
  // kbone leaves a dynamically populated select without a value or visible child.
  // Match the browser's first enabled option default, including later AI rows.
  const selectProto=Object.getPrototypeOf(document.createElement('select'));
  const selectValue=Object.getOwnPropertyDescriptor(selectProto,'value');
  if(selectValue&&!selectProto.__hezhangSelectDefault){
    Object.defineProperty(selectProto,'value',{configurable:true,get(){
      let value=selectValue.get.call(this);
      if(value===undefined&&this.options.length){value=this.options[0].value;selectValue.set.call(this,value);}
      return value;
    },set:selectValue.set});
    Object.defineProperty(selectProto,'__hezhangSelectDefault',{value:true});
  }
  if (!proto.replaceChildren) proto.replaceChildren = function(...nodes) { this.innerHTML=''; nodes.forEach(n=>this.appendChild(n)); };
  if (!proto.prepend) proto.prepend = function(...nodes) { nodes.slice().reverse().forEach(n=>this.insertBefore(n,this.firstChild)); };
  if (!proto.showModal) proto.showModal = function() { this.open = true; };
  if (!proto.close) proto.close = function() { this.open = false; this.dispatchEvent(new window.Event({name:'close',target:this})); };
  if (!Object.getOwnPropertyDescriptor(proto, 'open')) Object.defineProperty(proto, 'open', {
    get() { return this.classList.contains('wx-open'); },
    set(value) { this.classList.toggle('wx-open', !!value); }
  });
  if (!proto.scrollIntoView) proto.scrollIntoView = function() {};
  if (!window.scrollTo) window.scrollTo = options => wx.pageScrollTo({scrollTop:options.top||0,duration:0});
  // Generic kbone elements do not implement the HTML details default action.
  document.addEventListener('click', event => {
    const summary = event.target.closest && event.target.closest('summary');
    if (summary && summary.parentNode) summary.parentNode.open = !summary.parentNode.open;
  });
  document.addEventListener('change', () => {
    document.querySelectorAll('.mp-scene-option').forEach(node => {
      const input=node.querySelector('input'); node.classList.toggle('wx-selected',Boolean(input&&input.checked));
    });
  });
  window.navigator.vibrate = () => wx.vibrateShort && wx.vibrateShort({type:'light'});
  window.__saveWechatCard = async canvas => {
    try {
      const file=await new Promise((resolve,reject)=>wx.canvasToTempFilePath({canvas:canvas.$$node,fileType:'png',success:resolve,fail:reject}));
      wx.previewImage({urls:[file.tempFilePath]});
    } catch(error) { wx.showToast({title:'战报生成失败，请重试',icon:'none'}); }
    finally {canvas.remove();}
  };
  // kbone supplies localStorage through wx; no network is needed for offline play.
}
