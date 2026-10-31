'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),T=require('../dist/music-torso.js');
class Canvas{getContext(){return new Proxy({},{get:(o,k)=>o[k]||(()=>{}),set:(o,k,v)=>(o[k]=v,true)})}}
global.document={createElement:()=>new Canvas()};
const meta=JSON.parse(fs.readFileSync('dist/assets/music-render-v36/manifest.json'));
const rig=T.create({},{},{},meta);
for(let l=-1;l<=8;l++)for(let r=-1;r<=8;r++){
 const levels=[l,r];
 for(const style of meta.styles){
  const pose=rig.pose(style,levels);
  assert.equal(pose.body.width,340);assert.equal(pose.body.height,680);
  for(let side=0;side<2;side++){
   const p=pose.contacts[side],base=T.contacts[style][side];
   assert.ok(Math.hypot(p.x-base.x,p.y-base.y)<=33,'hand motion stays compact');
   assert.ok(Math.hypot(p.x-base.x,p.y-base.y)>10||levels[side]<7,'high stroke must visibly move the HAND');
   assert.ok(Math.hypot(pose.shoulders[side].x-T.shoulder[side].x,pose.shoulders[side].y-T.shoulder[side].y)<1e-8,'shoulder stays attached');
  }
  assert.ok(rig.cacheSize()<=24);
 }
}
for(const [x,y] of meta.shakerObjectPolygon)assert.equal(T.support({x,y},1,'shaker'),1,'every painted object boundary remains rigid with the grasp');
for(let level=0;level<=8;level++){
 const pts=[{x:310,y:330},{x:292,y:391},{x:290,y:434},{x:277,y:472}],levels=[0,level];
 for(const p of pts)assert.equal(T.support(p,1,'shaker'),1,'all shaker/object pixels share the hand motion');
 for(let i=1;i<pts.length;i++){
  const a=T.warp(pts[0],levels,'shaker'),b=T.warp(pts[i],levels,'shaker');
  assert.ok(Math.abs(Math.hypot(a.x-b.x,a.y-b.y)-Math.hypot(pts[0].x-pts[i].x,pts[0].y-pts[i].y))<1e-8,'gourd/shaft/fingers cannot separate or stretch');
 }
}
console.log('PASS: 100 two-hand poses, visible hand travel, connected shoulders, bounded cache and rigid shaker/handle/grasp');
