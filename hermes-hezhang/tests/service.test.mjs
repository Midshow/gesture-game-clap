import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import {JsonStore} from "../src/store.mjs";
import {GameService} from "../src/game.mjs";

function setup(){const dir=fs.mkdtempSync(path.join(os.tmpdir(),"hezhang-"));const store=new JsonStore(path.join(dir,"state.json")).load();return {dir,store,game:new GameService(store)};}

test("创建、加入、秘密提交和重启恢复",async()=>{
  const {dir,store,game}=setup();const room=await game.create({ownerId:"a",ownerName:"甲",teams:2,hp:2});
  await game.join(room.id,{userId:"b",name:"乙",team:1});await game.start(room.id,"a");
  let first=await game.submit(room.id,{userId:"a",move:"forge",eventId:"e1"});assert.equal(first.waiting,1);assert.equal(first.resolution,null);
  assert.equal(game.view(room.id,"b").room.players.find(p=>p.name==="甲").submitted,true);
  let second=await game.submit(room.id,{userId:"b",move:"forge",eventId:"e2"});assert.ok(second.resolution);assert.equal(game.get(room.id).players[0].energy,1);
  const reloaded=new JsonStore(path.join(dir,"state.json")).load();assert.equal(reloaded.state.rooms[room.id].players[0].energy,1);
});

test("锻造被小刀命中时不得获得锻且重开清锻",async()=>{
  const {game}=setup();const room=await game.create({ownerId:"a",ownerName:"甲",teams:2,hp:2});await game.join(room.id,{userId:"b",name:"乙",team:1});await game.start(room.id,"a");
  game.get(room.id).players.find(p=>p.id==="b").energy=1;
  await game.submit(room.id,{userId:"a",move:"forge"});const out=await game.submit(room.id,{userId:"b",move:"knife"});
  const a=game.get(room.id).players.find(p=>p.id==="a");assert.equal(a.hp,1);assert.equal(a.energy,0);assert.ok(out.resolution.events.some(x=>x.includes("不获得锻")));
});

test("三级以上敌对阵营同级攻击抵刀且不重开",async()=>{
  const {game}=setup();const room=await game.create({ownerId:"a",ownerName:"甲",teams:2,hp:2});await game.join(room.id,{userId:"b",name:"乙",team:1});await game.start(room.id,"a");
  for(const p of game.get(room.id).players)p.energy=3;
  await game.submit(room.id,{userId:"a",move:"shuriken",nonce:"1"});const out=await game.submit(room.id,{userId:"b",move:"shuriken",nonce:"2"});
  assert.equal(game.get(room.id).round,1);assert.equal(game.get(room.id).step,2);assert.ok(out.resolution.events.some(x=>x.includes("3级抵刀")));
});

test("重复事件不会重复提交",async()=>{
  const {game}=setup();const room=await game.create({ownerId:"a",ownerName:"甲",teams:2,hp:2});await game.join(room.id,{userId:"b",name:"乙",team:1});await game.start(room.id,"a");
  await game.submit(room.id,{userId:"a",move:"forge",eventId:"same"});const again=await game.submit(room.id,{userId:"a",move:"forge",eventId:"same"});assert.equal(again.you.submitted.move,"forge");
});

test("公共房间状态不暴露平台用户ID且进行中的房间不能重复开始",async()=>{
  const {game}=setup();const room=await game.create({ownerId:"qq-internal-a",ownerName:"甲",teams:2,hp:2});
  await game.join(room.id,{userId:"qq-internal-b",name:"乙",team:1});const started=await game.start(room.id,"qq-internal-a");
  assert.equal("ownerId" in started,false);assert.equal(started.ownerName,"甲");assert.ok(started.players.every(player=>!("id" in player)));
  await assert.rejects(()=>game.start(room.id,"qq-internal-a"),/正在进行中/);
});

test("空闲房间与事件去重记录按配置清理",async()=>{
  const {store}=setup(),game=new GameService(store,{roomIdleHours:1});
  store.state.rooms.old={id:"old",ownerId:"a",status:"finished",round:1,step:1,createdAt:1,updatedAt:1,settings:{teams:2,hp:2},players:[],log:[]};
  store.state.processed.oldEvent=1;
  await game.create({ownerId:"new",ownerName:"新房主",teams:2,hp:2});
  assert.equal(store.state.rooms.old,undefined);assert.equal(store.state.processed.oldEvent,undefined);
});

test("双人对局限制第三人且创建强制2队",async()=>{
  const {game}=setup();const room=await game.create({ownerId:"a",ownerName:"甲",teams:6,hp:2});
  assert.equal(room.settings.teams,2);assert.equal(room.settings.mode,"duo");
  await game.join(room.id,{userId:"b",name:"乙",team:1});
  await assert.rejects(()=>game.join(room.id,{userId:"c",name:"丙",team:0}),/双人对局房间已满/);
});

test("删除大厅房间",async()=>{
  const {game}=setup();const room=await game.create({ownerId:"a",ownerName:"甲"});
  const out=await game.deleteRoom(room.id,"a");assert.equal(out.removed,true);assert.throws(()=>game.get(room.id),/房间不存在/);
});

test("删除房间仅房主可删",async()=>{
  const {game}=setup();const room=await game.create({ownerId:"a",ownerName:"甲"});
  await game.join(room.id,{userId:"b",name:"乙",team:1});
  await assert.rejects(()=>game.deleteRoom(room.id,"b"),/只有房主可以删除房间/);
  await assert.rejects(()=>game.deleteRoom(room.id),/只有房主可以删除房间/);
  const out=await game.deleteRoom(room.id,"a");assert.equal(out.removed,true);
});

test("建房四属性配置与默认值",async()=>{
  const {game}=setup();const def=await game.create({ownerId:"a",ownerName:"甲"});
  assert.deepEqual({hp:def.settings.hp,attack:def.settings.attack,energy:def.settings.energy,shield:def.settings.shield},{hp:1,attack:1,energy:0,shield:0});
  const cfg=await game.create({ownerId:"c",ownerName:"丙",hp:3,attack:2,energy:1,shield:2});
  assert.deepEqual({hp:cfg.players[0].hp,attack:cfg.players[0].attack,energy:cfg.players[0].energy,shield:cfg.players[0].shield},{hp:3,attack:2,energy:1,shield:2});
});

test("剪刀模式默认开启、可关闭且关闭时服务端拒绝提交",async()=>{
  const {game}=setup();const enabled=await game.create({ownerId:"a",ownerName:"甲",energy:1});
  assert.equal(enabled.settings.scissors,true);await game.join(enabled.id,{userId:"b",name:"乙",team:1});await game.start(enabled.id,"a");
  assert.ok(game.view(enabled.id,"a").legal.some(move=>move.key==="scissors"));
  const disabled=await game.create({ownerId:"c",ownerName:"丙",energy:1,scissors:false});
  assert.equal(disabled.settings.scissors,false);await game.join(disabled.id,{userId:"d",name:"丁",team:1});await game.start(disabled.id,"c");
  assert.ok(!game.view(disabled.id,"c").legal.some(move=>move.key==="scissors"));
  await assert.rejects(()=>game.submit(disabled.id,{userId:"c",move:"scissors"}),/未开启剪刀模式/);
});

test("多人模式暂未开放",async()=>{
  const {game}=setup();await assert.rejects(()=>game.create({ownerId:"a",ownerName:"甲",mode:"multi"}),/多人模式暂未开放/);
});

test("护盾抵挡一次非真实伤害",async()=>{
  const {game}=setup();const room=await game.create({ownerId:"a",ownerName:"甲",hp:2,attack:2,shield:1});
  await game.join(room.id,{userId:"b",name:"乙",team:1});await game.start(room.id,"a");game.get(room.id).players.find(p=>p.id==="b").energy=1;
  await game.submit(room.id,{userId:"a",move:"forge"});const out=await game.submit(room.id,{userId:"b",move:"knife"});const a=game.get(room.id).players.find(p=>p.id==="a");
  assert.equal(a.hp,2);assert.equal(a.shield,0);assert.ok(out.resolution.events.some(x=>x.includes("被护盾挡下")));
});

test("零攻击力保持零伤害且不消耗护盾，正攻击力按配置结算",async()=>{
  const {game}=setup();const zero=await game.create({ownerId:"a",ownerName:"甲",hp:2,attack:0,energy:1,shield:1});
  await game.join(zero.id,{userId:"b",name:"乙",team:1});await game.start(zero.id,"a");
  await game.submit(zero.id,{userId:"a",move:"forge"});await game.submit(zero.id,{userId:"b",move:"knife"});assert.equal(game.get(zero.id).players[0].hp,2);assert.equal(game.get(zero.id).players[0].shield,1);
  const two=await game.create({ownerId:"c",ownerName:"丙",hp:2,attack:2});await game.join(two.id,{userId:"d",name:"丁",team:1});await game.start(two.id,"c");game.get(two.id).players[1].energy=1;
  await game.submit(two.id,{userId:"c",move:"forge"});await game.submit(two.id,{userId:"d",move:"knife"});assert.equal(game.get(two.id).players[0].hp,0);
});

test("结束后导出战报并由房主重开恢复初始属性",async()=>{
  const {game}=setup();const room=await game.create({ownerId:"a",ownerName:"甲",hp:1,attack:1,energy:1,shield:0});
  await game.join(room.id,{userId:"b",name:"乙",team:1});await game.start(room.id,"a");await game.submit(room.id,{userId:"a",move:"forge"});await game.submit(room.id,{userId:"b",move:"knife"});
  assert.equal(game.get(room.id).status,"finished");const exported=game.exportRoom(room.id);assert.ok(exported.log.length>0);assert.ok(exported.players.every(p=>!("id" in p)));
  const again=await game.start(room.id,"a");assert.equal(again.status,"playing");assert.equal(again.round,1);assert.equal(again.log.length,1);assert.equal(game.get(room.id).players[0].hp,1);
});

test("专用收件人接口与公共房间视图隔离",async()=>{
  const {game}=setup();const room=await game.create({ownerId:"internal-a",ownerName:"甲"});await game.join(room.id,{userId:"internal-b",name:"乙",team:1});
  assert.deepEqual(game.recipients(room.id),[{id:"internal-a",name:"甲"},{id:"internal-b",name:"乙"}]);assert.ok(room.players.every(p=>!("id" in p)));
});

test("房间列表接口不暴露ID且反映可加入状态",async()=>{
  const {game}=setup();
  const r1=await game.create({ownerId:"a",ownerName:"甲",hp:2});
  await game.join(r1.id,{userId:"b",name:"乙",team:1});
  const r2=await game.create({ownerId:"c",ownerName:"丙"});
  await game.join(r2.id,{userId:"d",name:"丁",team:1});await game.start(r2.id,"c");
  const rooms=game.listRooms();
  assert.equal(rooms.length,2);
  const lobby=rooms.find(r=>r.id===r1.id);assert.equal(lobby.status,"lobby");assert.equal(lobby.players.length,2);
  assert.ok(lobby.players.every(p=>!("id" in p)));
  assert.equal(rooms.find(r=>r.id===r2.id).status,"playing");
});
