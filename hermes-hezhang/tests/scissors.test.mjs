import test from "node:test";
import assert from "node:assert/strict";
import {resolveStep} from "../src/rules.mjs";

function settle(leftMove,rightMove){
  const room={
    id:"123456",ownerId:"left",status:"playing",round:1,step:1,
    settings:{mode:"duo",teams:2,hp:3,attack:1,energy:6,shield:0,scissors:true},log:[],
    players:[
      {id:"left",name:"甲",team:0,energy:6,attack:1,shield:0,hp:3,alive:true,submitted:{move:leftMove,nonce:"left"}},
      {id:"right",name:"乙",team:1,energy:6,attack:1,shield:0,hp:3,alive:true,submitted:{move:rightMove,nonce:"right"}},
    ],
  };
  return {room,result:resolveStep(room)};
}

for(const move of ["knife","katana","shuriken","catch"]){
  test(`剪刀克制 ${move}`,()=>{
    const {room,result}=settle("scissors",move);
    assert.equal(room.players[0].hp,3);assert.equal(room.players[1].hp,2);assert.equal(room.round,2);
    assert.ok(result.events.some(event=>event.includes("剪刀特殊克制")));
  });
}

for(const move of ["forge","kunai","dragon","void"]){
  test(`${move} 克制剪刀`,()=>{
    const {room,result}=settle("scissors",move);
    assert.equal(room.players[0].hp,2);assert.equal(room.players[1].hp,3);assert.equal(room.round,2);
    assert.ok(result.events.some(event=>event.includes("特殊克制剪刀")));
  });
}

test("防只挡住剪刀，不造成命中或重开",()=>{
  const {room}=settle("scissors","defend");
  assert.deepEqual(room.players.map(player=>player.hp),[3,3]);assert.equal(room.round,1);assert.equal(room.step,2);
});

test("闪过剪刀按闪成功重开",()=>{
  const {room,result}=settle("scissors","flash");
  assert.deepEqual(room.players.map(player=>player.hp),[3,3]);assert.equal(room.round,2);assert.ok(result.events.some(event=>event.includes("闪成功")));
});

test("双剪刀相抵且不重开",()=>{
  const {room,result}=settle("scissors","scissors");
  assert.deepEqual(room.players.map(player=>player.hp),[3,3]);assert.equal(room.round,1);assert.equal(room.step,2);assert.ok(result.events.some(event=>event.includes("双方剪刀相抵")));
});

test("剪刀特殊克制在左右两侧结果对称",()=>{
  const {room}=settle("katana","scissors");
  assert.deepEqual(room.players.map(player=>player.hp),[2,3]);
});
