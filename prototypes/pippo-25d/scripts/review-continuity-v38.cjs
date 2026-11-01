'use strict';
const fs=require('node:fs'),{createCanvas,loadImage}=require('@napi-rs/canvas'),T=require('../dist/music-torso.js');
global.document={createElement:()=>createCanvas(1,1)};
(async()=>{
 const dir='dist/assets/music-render-v38/',m=JSON.parse(fs.readFileSync(dir+'manifest.json'));
 const im=await Promise.all(['body','whole','moving'].map(n=>loadImage(dir+n+'.png'))),rig=T.create(...im,m);
 const c=createCanvas(1020,2040),ctx=c.getContext('2d');ctx.fillStyle='#dfe6cc';ctx.fillRect(0,0,c.width,c.height);
 for(let row=0;row<3;row++)for(let col=0;col<3;col++){
  const style=m.styles[row],p=rig.pose(style,[0,[-8,0,8][col]],col);ctx.save();ctx.translate(col*340,row*680);ctx.drawImage(p.body,0,0);ctx.drawImage(p.canvas,-60,0);ctx.restore();
 }
 fs.writeFileSync('evidence/v38/continuity-review.png',c.toBuffer('image/png'));
})().catch(e=>{console.error(e);process.exitCode=1});
