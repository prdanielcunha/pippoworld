'use strict';
// Export an actual renderer cycle for reviewing the wrist, not a generated
// animation. Run from the prototype directory; ffmpeg is used only to encode.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{spawnSync}=require('node:child_process');
const {createCanvas,loadImage}=require('@napi-rs/canvas'),T=require('../dist/music-torso.js'),P=require('../dist/music-performance.js');
global.document={createElement:()=>createCanvas(1,1)};
(async()=>{
 const dir='dist/assets/music-render-v38/',m=JSON.parse(fs.readFileSync(dir+'manifest.json'));
 const ims=await Promise.all(['body','whole','moving'].map(n=>loadImage(dir+n+'.png'))),rig=T.create(...ims,m),clock=P.create();clock.reset('shaker');
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'pippo-wrist-v38-')),c=createCanvas(440,680),ctx=c.getContext('2d');
 for(let frame=0;frame<144;frame++){
  if(frame%24===0)clock.strike({instrument:'shaker',index:0});
  const hit=clock.snapshot().hands[1],level=hit?.active?Math.sin(hit.q*Math.PI*2)*8:0,p=rig.pose('shaker',[0,level],clock.snapshot().energy>.65?2:clock.snapshot().energy>.08?1:0);
  ctx.fillStyle='#eee8d4';ctx.fillRect(0,0,440,680);ctx.save();const breath=1+Math.sin(clock.snapshot().time/850)*.003;ctx.translate(220,650);ctx.scale(breath,breath);ctx.translate(-220,-650);ctx.drawImage(p.body,30,0);ctx.drawImage(p.canvas,-30,0);ctx.restore();
  fs.writeFileSync(path.join(tmp,String(frame).padStart(4,'0')+'.png'),c.toBuffer('image/png'));clock.advance(1000/60);
 }
 fs.mkdirSync('evidence/v38',{recursive:true});const output='evidence/v38/shaker-wrist-cycle.mp4';
 const r=spawnSync('ffmpeg',['-y','-v','error','-framerate','60','-i',path.join(tmp,'%04d.png'),'-c:v','libx264','-pix_fmt','yuv420p','-crf','20','-movflags','+faststart',output],{encoding:'utf8'});
 if(r.status!==0)throw Error(r.stderr);fs.rmSync(tmp,{recursive:true});console.log(output);
})().catch(e=>{console.error(e);process.exitCode=1});
