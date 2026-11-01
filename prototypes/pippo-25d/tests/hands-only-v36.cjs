'use strict';
// Real raster regression. Installed runtime canvas is only a test dependency.
const fs=require('node:fs'),assert=require('node:assert/strict'),{createCanvas,loadImage}=require('@napi-rs/canvas');
const T=require('../dist/music-torso.js');
global.document={createElement:()=>createCanvas(1,1)};
function components(data,w,h){
 const labels=new Int32Array(w*h);let id=0;const queue=new Int32Array(w*h);
 for(let i=0;i<w*h;i++)if(data[i*4+3]>32&&!labels[i]){
  let start=0,end=0;queue[end++]=i;labels[i]=++id;
  while(start<end){const p=queue[start++],x=p%w,y=Math.floor(p/w);
   for(const q of [x?p-1:-1,x<w-1?p+1:-1,y?p-w:-1,y<h-1?p+w:-1])if(q>=0&&!labels[q]&&data[q*4+3]>32){labels[q]=id;queue[end++]=q}
  }
 }
 return labels;
}
(async()=>{
 const dir='dist/assets/music-render-v37/',meta=JSON.parse(fs.readFileSync(dir+'manifest.json'));
 const [body,arms,front]=await Promise.all(['body','static','moving'].map(n=>loadImage(dir+n+'.png'))),rig=T.create(body,arms,front,meta);
 let checked=0;
 for(const style of meta.styles)for(const levels of [[0,0],[0,8],[8,0],[8,8],[-1,-1],[3,6],[6,3]]){
  const pose=rig.pose(style,levels),c=createCanvas(340,680),ctx=c.getContext('2d');ctx.drawImage(pose.body,0,0);const before=ctx.getImageData(0,0,340,680).data;ctx.drawImage(pose.canvas,-60,0);
  assert.ok(before[(450*340+170)*4+3]>240,'the original belly must actually be present and opaque');
  const pixels=ctx.getImageData(0,0,340,680).data,b=before;
  for(let y=365;y<550;y++)for(let x=150;x<=200;x++)for(let k=0;k<4;k++)assert.equal(pixels[(y*340+x)*4+k],b[(y*340+x)*4+k],'belly pixels must remain unchanged while hands move');
  const ap=pose.canvas.getContext('2d').getImageData(0,0,460,680).data,labels=components(ap,460,680);
  for(let side=0;side<2;side++){
   const hand=pose.contacts[side],root=T.shoulder[side];
   const near=p=>{const ids=[];for(let y=Math.round(p.y)-5;y<=Math.round(p.y)+5;y++)for(let x=Math.round(p.x)-5;x<=Math.round(p.x)+5;x++){const n=labels[y*460+x+60];if(n)ids.push(n)}return new Set(ids)};
   const rootIds=near(root),handIds=near(hand);assert.ok([...handIds].some(id=>rootIds.has(id)),style+' arm must remain painted continuously from shoulder to moving hand');
  }
  checked++;
 }
 for(const drum of [false,true]){
  const a=rig.pose('grip',[0,0],0,drum).body.getContext('2d').getImageData(0,365,340,315).data;
  for(const expression of [1,2])assert.deepEqual(rig.pose('grip',[0,0],expression,drum).body.getContext('2d').getImageData(0,365,340,315).data,a,'expression changes cannot move belly, seat or feet');
 }
 console.log('PASS: '+checked+' real raster poses: unchanged belly pixels, shoulder-to-hand alpha connectivity and expression-independent body');
})().catch(e=>{console.error(e);process.exitCode=1});
