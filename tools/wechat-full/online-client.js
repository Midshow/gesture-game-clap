// Included inside the released game's scope; offline handlers remain available.
const online = {session:null,view:null,timer:null,polling:false,sending:false,prompt:null,active:false,generation:0,lastView:null,hidden:false};
try { online.session=JSON.parse(localStorage.getItem('hezhang.online.session')||'null'); } catch (_) {}
const original = {getHuman,renderMpMoves,scheduleMpAutoPlay,activateMpSkill,playMpStep};
const revive = value => {
  if(!value||typeof value!=='object')return value;
  if(value.$set)return new Set(value.$set.map(revive));
  if(value.$map)return new Map(value.$map.map(([k,v])=>[revive(k),revive(v)]));
  if(Array.isArray(value))return value.map(revive);
  return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,revive(v)]));
};
function network(path,method='GET',body=null,session=online.session) {
  return new Promise((resolve,reject)=>wx.request({url:session.url+path,method,data:body||undefined,
    header:{'content-type':'application/json',...(session.token?{Authorization:'Bearer '+session.token}:{})},timeout:10000,
    success(res){if(res.statusCode===200&&res.data.ok)resolve(res.data.result);else reject(Error(res.data?.error||'服务器返回异常'));},
    fail(){reject(Error('连接失败，请检查服务器地址、网络和开发者工具的域名设置'));}}));
}
function rememberSession(){localStorage.setItem('hezhang.online.session',JSON.stringify(online.session));}
function stopOnline(){online.active=false;online.generation++;online.lastView=null;clearTimeout(online.timer);online.timer=null;bar.classList.add('hidden');}
const homeActions=document.querySelector('#homeView .hero-actions')||document.querySelector('.hero-actions');
const onlineButton=document.createElement('button');onlineButton.className='secondary-button';onlineButton.textContent='真人联机';homeActions.appendChild(onlineButton);
const lobby=document.createElement('section');lobby.id='onlineView';lobby.className='view';document.body.appendChild(lobby);
const bar=document.createElement('div');bar.className='online-panel hidden';$('mpArena').parentNode.insertBefore(bar,$('mpArena'));
function showOnlineSetup(){
  stopOnline();stopTimer();setView('online');
  lobby.innerHTML=`<div class="panel online-panel"><p class="eyebrow">完整技能 · 真人房间</p><h2>联机对战</h2>
    <label>服务器地址<input id="onlineUrl" type="text" value="${escapeHtml(online.session?.url||'http://127.0.0.1:3238')}"></label>
    <label>昵称<input id="onlineName" type="text" maxlength="16" value="${escapeHtml(online.session?.name||'玩家')}"></label>
    <label>角色<select id="onlineRole"><option value="random">随机角色</option><option value="none">无技能</option>${SKILL_KEYS.map(k=>`<option value="${k}">${SKILLS[k].name}</option>`).join('')}</select></label>
    <div class="settings-form"><label>队伍数量<select id="onlineTeams">${[2,3,4,5,6].map(v=>`<option value="${v}">${v}</option>`).join('')}</select></label><label>每队人数<select id="onlineSize">${[1,2,3,4].map(v=>`<option value="${v}">${v}</option>`).join('')}</select></label></div>
    <button id="onlineCreate" class="primary-button">创建房间</button>
    <label>房间号<input id="onlineCode" type="number" maxlength="6"></label><button id="onlineJoin" class="secondary-button">加入房间</button>
    ${online.session?.token?'<button id="onlineReconnect" class="secondary-button">回到上次房间</button>':''}
    <p id="onlineMessage">两名以上真人可开局，空位由 AI 补齐。联机需要服务器保持运行。</p></div>`;
  $('onlineRole').value='random';$('onlineTeams').value='2';$('onlineSize').value='1';
  async function connect(join){
    if(online.sending)return;online.sending=true;
    try{
      const url=$('onlineUrl').value.trim().replace(/\/$/,'');
      if(!/^https?:\/\/[^\s/?#]+(?::\d+)?$/.test(url))throw Error('请输入完整服务器地址，例如 http://127.0.0.1:3238');
      const name=$('onlineName').value.trim(),role=$('onlineRole').value;
      const result=await network(join?'/rooms/'+$('onlineCode').value.trim()+'/join':'/rooms','POST',
        {name,role,teamCount:Number($('onlineTeams').value),teamSize:Number($('onlineSize').value)},{url});
      online.session={url,name,code:result.room.code,token:result.token};rememberSession();enterOnline(result.room);
    }catch(error){$('onlineMessage').textContent=error.message;}finally{online.sending=false;}
  }
  $('onlineCreate').addEventListener('click',()=>connect(false));$('onlineJoin').addEventListener('click',()=>connect(true));
  $('onlineReconnect')?.addEventListener('click',async()=>{try{enterOnline(await network('/rooms/'+online.session.code));}catch(e){$('onlineMessage').textContent=e.message;}});
}
onlineButton.addEventListener('click',showOnlineSetup);
$('homeButton').addEventListener('click',stopOnline);$('mpExitButton').addEventListener('click',stopOnline);
function enterOnline(view){online.active=true;online.generation++;applyOnline(view);pollOnline();}
async function pollOnline(){
  clearTimeout(online.timer);if(!online.active||online.hidden)return;
  const generation=online.generation;
  if(!online.sending&&!online.polling){
    online.polling=true;
    try{const v=await network('/rooms/'+online.session.code);if(online.active&&generation===online.generation)applyOnline(v);}
    catch(e){if(online.active){const status=$('onlineStatus')||$('mpStatus');status.textContent=e.message+'；正在重连。';}}
    finally{online.polling=false;}
  }
  if(online.active&&!online.hidden&&generation===online.generation)online.timer=setTimeout(pollOnline,1200);
}
async function sendOnline(action,extra={}){
  if(online.sending)return;
  online.sending=true;
  const body={action,turn:online.view.turn,requestId:Date.now().toString(36)+'-'+Math.random().toString(36).slice(2),...extra};
  try{
    // Retry exactly the same operation ID after an uncertain network outcome.
    let view;
    try{view=await network('/rooms/'+online.session.code+'/command','POST',body);}
    catch(e){if(e.message.includes('连接失败'))view=await network('/rooms/'+online.session.code+'/command','POST',body);else throw e;}
    if(view.closed){stopOnline();online.session=null;rememberSession();showOnlineSetup();return;}
    if(online.active)applyOnline(view);
  }catch(e){showToast(e.message);}finally{online.sending=false;}
}
function applyOnline(view){
  online.view=view;
  const signature=JSON.stringify(view);
  if(signature===online.lastView){promptOnline(view);return;}
  online.lastView=signature;
  if(view.stage==='lobby'){
    setView('online');
    lobby.innerHTML=`<div class="panel online-panel"><h2>房间 ${view.code}</h2><p>座位顺序决定分队；不足的座位开局时补 AI。</p>${view.players.map(p=>`<p>${escapeHtml(p.name)} · 阵营${p.team+1} · ${SKILLS[p.role]?.name||'随机'}${p.id===view.you?'（你）':''}</p>`).join('')}<p id="onlineStatus">等待玩家加入 · ${view.players.length}/${view.teamCount*view.teamSize}人</p>${view.you===0?'<button id="onlineStart" class="primary-button">开始对局</button><button id="onlineClose" class="text-button">结束房间</button>':''}<button id="onlineBack" class="secondary-button">返回首页</button></div>`;
    $('onlineStart')?.addEventListener('click',()=>sendOnline('start'));$('onlineBack').addEventListener('click',()=>{stopOnline();setView('home');});
  }else if(view.game){
    mpState=revive(view.game);mpState.fighters.forEach(f=>{f.human=f.id===view.you;});
    if(!$('multiplayerView').classList.contains('active'))setView('multiplayer');
    renderMp();bar.classList.remove('hidden');$('mpSpectatorControls').classList.add('hidden');
    const pending=view.waitingFor.length?'等待 '+view.waitingFor.join('、')+' 作出选择':view.busy?'服务端结算中':view.stage==='prepare'?'发动技能后点击准备':view.stage==='choose'?'全员已准备，请同时出招':view.stage==='over'?(view.game.winnerTeam==null?'本场平局':`阵营${view.game.winnerTeam+1}获胜`):view.error||'等待中';
    bar.innerHTML=`<p>房间 ${view.code} · ${pending}</p><small>${view.players.map(p=>`${escapeHtml(p.name)}：${p.submitted?'已锁定':p.ready?'已准备':'等待'}`).join(' / ')}</small>${view.you===0?'<button id="onlineClose" class="text-button">结束房间</button>':''}`;
    $('mpStatus').textContent=view.error||pending;
  }
  (view.stage==='lobby'?lobby:bar).querySelector('#onlineClose')?.addEventListener('click',()=>sendOnline('close'));
  promptOnline(view);
}
function promptOnline(view){
  if(view.prompts.length&&!online.prompt){
    const q=view.prompts[0];online.prompt=q.id;
    chooseMpOption(q.title,q.options,{cancelText:q.required?'必须选择一个选项':q.cancelText,eyebrow:'轮到你响应'}).then(async value=>{
      if(value!==null||!q.required)await sendOnline('answer',{promptId:q.id,value});
    }).finally(()=>{online.prompt=null;});
  }
}
getHuman=()=>online.active&&online.view?.game?mpState.fighters.find(f=>f.id===online.view.you):original.getHuman();
scheduleMpAutoPlay=(...args)=>{if(!online.active)return original.scheduleMpAutoPlay(...args);};
playMpStep=move=>online.active?sendOnline('move',{move}):original.playMpStep(move);
activateMpSkill=skill=>online.active?sendOnline('skill',{skill}):original.activateMpSkill(skill);
renderMpMoves=()=>{
  if(!online.active)return original.renderMpMoves();
  const v=online.view;
  $('mpMoveGrid').innerHTML=(v.canReady?'<button class="mp-move" id="onlineReady">准备完成</button>':'')+
    v.skills.map(([key,label])=>`<button class="mp-move" data-online-skill="${key}">${label}</button>`).join('')+
    v.moves.map(key=>`<button class="mp-move" data-online-move="${key}"><b>${skillMove(key).name}</b><small>${mpMoveCost(getHuman(),key)}锻</small></button>`).join('');
  $('onlineReady')?.addEventListener('click',()=>sendOnline('ready'));
  $('mpMoveGrid').querySelectorAll('[data-online-skill]').forEach(b=>b.addEventListener('click',()=>activateMpSkill(b.dataset.onlineSkill)));
  $('mpMoveGrid').querySelectorAll('[data-online-move]').forEach(b=>b.addEventListener('click',()=>playMpStep(b.dataset.onlineMove)));
};
if(wx.onHide)wx.onHide(()=>{online.hidden=true;clearTimeout(online.timer);online.timer=null;});
if(wx.onShow)wx.onShow(()=>{online.hidden=false;if(online.active)pollOnline();});
