import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import {spawn} from "node:child_process";

async function startServer(t){
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),"hezhang-server-"));
  const port=33000+Math.floor(Math.random()*1000),config=path.join(dir,"config.json");
  fs.writeFileSync(config,JSON.stringify({host:"127.0.0.1",port,adminToken:"test-token-not-for-production",dataFile:path.join(dir,"state.json")}),"utf8");
  const child=spawn(process.execPath,[path.resolve("src/server.mjs")],{env:{...process.env,HEZHANG_CONFIG:config},stdio:["ignore","pipe","pipe"]});
  t.after(()=>child.kill());
  let response;
  for(let i=0;i<30;i++){try{response=await fetch(`http://127.0.0.1:${port}/health`);break;}catch{await new Promise(r=>setTimeout(r,30));}}
  assert.ok(response);
  return {base:`http://127.0.0.1:${port}`,headers:{authorization:"Bearer test-token-not-for-production","content-type":"application/json"},response};
}

test("服务能够启动并响应健康检查",async t=>{
  const {response}=await startServer(t);assert.equal(response.status,200);const body=await response.json();assert.equal(body.ok,true);assert.equal(body.ruleset,"base-online-v3");
});

test("HTTP房间列表脱敏且DELETE校验房主身份",async t=>{
  const {base,headers}=await startServer(t);
  const created=await (await fetch(`${base}/rooms`,{method:"POST",headers,body:JSON.stringify({ownerId:"private-owner",ownerName:"甲"})})).json();
  const rid=created.result.id;
  const listed=await (await fetch(`${base}/rooms`,{headers})).json();
  assert.equal(listed.result.length,1);assert.ok(listed.result[0].players.every(p=>!("id" in p)));
  const denied=await (await fetch(`${base}/rooms/${rid}`,{method:"DELETE",headers,body:JSON.stringify({userId:"intruder"})})).json();
  assert.equal(denied.ok,false);assert.match(denied.error,/只有房主/);
  const removed=await (await fetch(`${base}/rooms/${rid}`,{method:"DELETE",headers,body:JSON.stringify({userId:"private-owner"})})).json();
  assert.equal(removed.ok,true);assert.equal(removed.result.removed,true);
});
