'use strict';
const assert=require('node:assert/strict'),T=require('../dist/music-torso.js');
class Canvas{getContext(){const grad={addColorStop(){}};return new Proxy({createLinearGradient:()=>grad},{get:(o,k)=>o[k]||(()=>{}),set:(o,k,v)=>(o[k]=v,true)})}}
global.document={createElement:()=>new Canvas()};const rig=T.create({});
for(let l=0;l<=8;l++)for(let r=0;r<=8;r++){
 const levels=[l,r];
 for(const root of T.shoulder){const p=T.warp(root,levels);assert.ok(Math.hypot(p.x-root.x,p.y-root.y)<1e-8,'the torso shoulder must not leave the neck/body')}
 for(let x=0;x<=340;x+=10)for(let y=330;y<560;y+=5){
  const a=T.warp({x,y},levels),b=T.warp({x,y:y+1},levels);
  assert.ok(b.y>a.y,'continuous torso surface cannot fold or invert during a stroke');
 }
 for(const style of ['open','grip']){
  const pose=rig.pose(style,levels);
  assert.equal(pose.contacts.length,2);
  for(let side=0;side<2;side++){
   const p=pose.contacts[side],base=T.contacts[style][side];assert.equal(p.x,base.x,'notes must never stretch the arm sideways');assert.ok(base.y-p.y>=0&&base.y-p.y<=25,'short lift stays within the whole-arm pose');
  }
 }
 assert.ok(rig.cacheSize()<=24,'stroke pose cache has a fixed memory bound');
}
console.log('PASS: connected torso through all 81 two-hand stroke combinations; no folding, shoulder drift or unbounded pose cache');
