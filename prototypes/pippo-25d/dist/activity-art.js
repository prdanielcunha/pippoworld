'use strict';
// Complete activity figures. The approved yard atlases remain unchanged.
(()=>{
 const bank=new Map(),pending=new Map(),failed=new Set();let meta,lastObject;
 const ids=['drum','drumNear','keyboard','xylophone','shaker','tambourine','garden'];
 function request(kind){
  if(!meta||!ids.includes(kind)||bank.has(kind)||pending.has(kind)||failed.has(kind))return;
  if(kind==='drum')request('drumNear');
  const p=meta.art[kind],image=new Image();pending.set(kind,image);
  image.onload=()=>{const frames=p.frames.map(f=>{const canvas=document.createElement('canvas');canvas.width=f.w;canvas.height=f.h;const ctx=canvas.getContext('2d');ctx.drawImage(image,f.x,f.y,f.w,f.h,0,0,f.w,f.h);const bytes=ctx.getImageData(0,0,f.w,f.h).data;return {...f,canvas,alpha:Uint8Array.from({length:f.w*f.h},(_,i)=>bytes[i*4+3])}});bank.set(kind,{...p,frames});pending.delete(kind)};
  image.onerror=()=>{pending.delete(kind);failed.add(kind)};image.src='assets/activity-v22/'+p.file;
 }
 function pose(st){
  if(st.activity==='garden')return {kind:'garden',frame:st.watering?1:0};
  if(st.activity!=='music')return null;
  const kind=st.musicInstrument||'keyboard',active=st.musicPulse>0;
  if(kind==='drum'){if(active&&[1,2].includes(st.musicIndex))return {kind:'drumNear',frame:st.musicIndex===2?0:1};return {kind,frame:active?(st.musicIndex===0?3:st.musicIndex===4?1:2):0}}
  return {kind,frame:active?1:0};
 }
 function water(ctx,st,start,g){
  if(!st.watering)return;
  const end={x:g.width*.78,y:g.height*.788},clock=st.reduced?0:st.time;ctx.save();ctx.fillStyle='#438fae';
  for(let lane=0;lane<3;lane++)for(let drop=0;drop<9;drop++){
   const t=((clock/580+drop/9+lane*.065)%1),x=start.x+(end.x-start.x+(lane-1)*g.width*.025)*t,y=start.y+(end.y-start.y)*t*t;
   ctx.globalAlpha=.7*(1-t*.25);ctx.beginPath();ctx.ellipse(x,y,Math.max(1.7,g.width*.002),Math.max(3,g.height*.006),-.35,0,Math.PI*2);ctx.fill();
  }
  ctx.strokeStyle='#8cc3c6';ctx.lineWidth=2;ctx.globalAlpha=.6;
  if(!st.reduced)for(let i=0;i<4;i++){const t=(st.time/450+i/4)%1;ctx.beginPath();ctx.arc(end.x+(i-1.5)*g.width*.015,end.y,4+t*6,Math.PI,Math.PI*2);ctx.stroke()}
  ctx.restore();
 }
 const api=window.PippoActivityArt={objectHit(x,y){if(!lastObject)return false;const {rect,scale,origin}=lastObject,sx=(x-origin.x)/scale,sy=(y-origin.y)/scale;return sx>=rect[0]&&sx<=rect[2]&&sy>=rect[1]&&sy<=rect[3]},pose,prepare:request,ready:kind=>bank.has(kind),draw(ctx,g,st){
  const selected=pose(st);if(!selected){lastObject=null;return null}request(selected.kind);const art=bank.get(selected.kind);if(!art)return null;
  const f=art.frames[selected.frame],garden=selected.kind==='garden';
  // A shared unit and measured head registration prevent per-pose resizing.
  const h=garden?Math.min(g.height*.70,g.width*.95):selected.kind.startsWith('drum')?Math.min(g.height*.70,g.width*.88):Math.min(g.height*.73,g.width*1.42);
  const scale=h/art.unit,cx=g.width*(garden?.31:.5),cy=g.height*(garden?.84:['keyboard','xylophone'].includes(selected.kind)?.90:.88),x=cx-f.anchorX*scale,y=cy-f.anchorY*scale;
  const rotate=st.reduced?0:st.pet>0?Math.sin(st.time/180)*.008:0;
  ctx.save();ctx.translate(cx,cy);ctx.rotate(rotate);ctx.drawImage(f.canvas,x-cx,y-cy,f.w*scale,f.h*scale);ctx.restore();
  lastObject=garden?{rect:selected.frame===0?[440,520,780,735]:[315,570,690,800],scale,origin:{x,y}}:null;
  if(garden){document.body.classList.add('has-garden-art');water(ctx,st,{x:x+art.nozzle[0]*scale,y:y+art.nozzle[1]*scale},g)}
  const panel=document.getElementById('musicPanel');if(!garden&&panel){panel.dataset.artReady='true';if(selected.kind.startsWith('drum'))panel.style?.setProperty('--near-hit-y',(cy-h*.34)+'px')}
  return {pose:'activity_'+selected.kind+'_'+selected.frame,hit:{alpha:f.alpha,width:f.w,height:f.h,cx,cy,mirror:false,rotate,scale,stretch:1,anchorX:f.anchorX,anchorY:f.anchorY,headBottom:art.unit*.49}};
 }};
 api.loading=fetch('assets/activity-v22/manifest.json?v=activity-polish-22').then(r=>{if(!r.ok)throw Error('activity art manifest');return r.json()}).then(m=>{meta=m;const kind=typeof state!=='undefined'?(pose(state)?.kind):null;if(kind)request(kind)}).catch(()=>{});
})();
if(typeof module!=='undefined')module.exports={};
