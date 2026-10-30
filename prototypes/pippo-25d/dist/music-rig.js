'use strict';
// Music-only rig: complete head/neck/torso, independently registered wings.
// Instrument contacts are measured from their live DOM surfaces after layout.
(()=>{
 const performance=PippoPerformance.create();const bodyAlpha=[];let image,loading,overlay,oc,lastHit=null,expression=0,previous=0,blend=1,layout=null,dirty=true;
 const bodyFrames=[[150,0,340,680],[600,0,340,680],[1080,0,340,680]];
 const arms={open:[[60,680,208,300,120,34,155,272],[294,680,208,300,76,35,56,270]],grip:[[575,680,185,280,115,42,127,215],[790,680,185,280,60,35,52,215]]};
 function prepare(){if(loading)return loading;api.failed=false;loading=new Promise(resolve=>{const i=new Image;i.onload=()=>{image=i;for(const rect of bodyFrames){const c=document.createElement('canvas');c.width=rect[2];c.height=rect[3];const t=c.getContext('2d');t.drawImage(i,...rect,0,0,c.width,c.height);const rgba=t.getImageData(0,0,c.width,c.height).data;bodyAlpha.push(Uint8Array.from({length:c.width*c.height},(_,n)=>rgba[n*4+3]))}api.ready=true;dirty=true;resolve(true)};i.onerror=()=>{loading=null;api.failed=true;resolve(false)};i.src='assets/music-rig-v23/rig.webp'});return loading}
 function clear(){if(overlay){oc.clearRect(0,0,overlay.width,overlay.height);overlay.hidden=true}lastHit=null}
 function surface(el,scene,kind,index){if(!el)return null;return PippoPerformance.contact(el.getBoundingClientRect(),scene,kind,index)}
 function measure(g,kind){
  const scene=document.getElementById('pippo').getBoundingClientRect();
  const targets=Array.from({length:kind==='drum'?5:8},(_,i)=>surface(document.querySelector(kind==='drum'?'[data-piece="'+i+'"]':'[data-note="'+i+'"]'),scene,kind,i));
  return {targets,width:g.width,height:g.height,kind};
 }
 function ensure(g){
  if(!overlay){overlay=document.createElement('canvas');overlay.id='musicHands';overlay.setAttribute('aria-hidden','true');document.getElementById('stage').append(overlay);oc=overlay.getContext('2d');new ResizeObserver(()=>{dirty=true}).observe(document.getElementById('stage'));window.addEventListener('resize',()=>{dirty=true})}
  overlay.hidden=false;const ratio=Math.min(window.devicePixelRatio||1,2);if(overlay.width!==Math.round(g.width*ratio)||overlay.height!==Math.round(g.height*ratio)){overlay.width=Math.round(g.width*ratio);overlay.height=Math.round(g.height*ratio);dirty=true}oc.setTransform(overlay.width/g.width,0,0,overlay.height/g.height,0,0);oc.clearRect(0,0,g.width,g.height);oc.imageSmoothingEnabled=true;
 }
 function wing(ctx,shoulder,hand,s,gripping=false){
  // A gently bent broad duck wing, not an image stretched between joints.
  // The round feathered paw always has the same size regardless of the target.
  const r=PippoMusicAnatomy.pawRadius(s),dx=hand.x-shoulder.x,dy=hand.y-shoulder.y;
  const bendX=shoulder.x+dx*.38-(dx>=0?1:-1)*r*.28,bendY=shoulder.y+dy*.58-r*.26;
  ctx.save();ctx.lineCap='round';ctx.lineJoin='round';
  ctx.beginPath();ctx.moveTo(shoulder.x,shoulder.y);ctx.quadraticCurveTo(bendX,bendY,hand.x,hand.y);
  ctx.strokeStyle='#d3a340';ctx.lineWidth=r*2.2;ctx.stroke();
  ctx.strokeStyle='#f4cc53';ctx.lineWidth=r*1.95;ctx.stroke();
  ctx.translate(hand.x,hand.y);
  const a=Math.atan2(dy,dx);ctx.rotate(a);
  ctx.fillStyle='#f7d260';ctx.strokeStyle='#c9973b';ctx.lineWidth=Math.max(1.3,s*2);
  ctx.beginPath();ctx.ellipse(0,0,r*1.1,r*.87,0,0,Math.PI*2);ctx.fill();ctx.stroke();
  // Three soft feather tips read as a little hand without human fingers.
  for(let i=-1;i<=1;i++){ctx.beginPath();ctx.ellipse(r*.67,i*r*.47,r*.43,r*.3,i*.12,0,Math.PI*2);ctx.fill();ctx.stroke()}
  if(gripping){ctx.strokeStyle='#e6b953';ctx.lineWidth=Math.max(1,s*1.5);ctx.beginPath();ctx.arc(r*.24,r*.1,r*.34,-.7,1.2);ctx.stroke()}
  ctx.restore();
 }
 function stick(ctx,hand,tip,mallet,unit){
  const dx=tip.x-hand.x,dy=tip.y-hand.y,len=Math.hypot(dx,dy)||1,ux=dx/len,uy=dy/len,r=mallet?Math.max(5,unit*12):Math.max(2,unit*4);
  const center={x:tip.x,y:tip.y-r};ctx.save();ctx.lineCap='round';ctx.strokeStyle='#815332';ctx.lineWidth=Math.max(3,unit*9);ctx.beginPath();ctx.moveTo(hand.x-ux*10,hand.y-uy*10);ctx.lineTo(center.x,center.y);ctx.stroke();ctx.strokeStyle='#d9ac70';ctx.lineWidth=Math.max(2,unit*5);ctx.stroke();const grad=ctx.createRadialGradient(center.x-r*.3,center.y-r*.4,1,center.x,center.y,r);grad.addColorStop(0,mallet?'#53626a':'#ecd1a0');grad.addColorStop(1,mallet?'#202e35':'#b4854e');ctx.fillStyle=grad;ctx.beginPath();ctx.arc(center.x,center.y,r,0,Math.PI*2);ctx.fill();ctx.restore();return {x:center.x,y:center.y+r};
 }
 function tambourine(ctx,p,r){
  ctx.save();const skin=ctx.createRadialGradient(p.x-r*.3,p.y-r*.3,1,p.x,p.y,r);skin.addColorStop(0,'#fff1ce');skin.addColorStop(1,'#d0b57f');ctx.fillStyle='#98623d';ctx.beginPath();ctx.ellipse(p.x,p.y+5,r,r*.86,0,0,Math.PI*2);ctx.fill();ctx.fillStyle=skin;ctx.strokeStyle='#bc9158';ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(p.x,p.y,r*.92,r*.79,0,0,Math.PI*2);ctx.fill();ctx.stroke();for(let i=0;i<8;i++){const a=i*Math.PI/4,x=p.x+Math.cos(a)*r*.96,y=p.y+Math.sin(a)*r*.82;ctx.fillStyle='#b7bdb5';ctx.strokeStyle='#758278';ctx.lineWidth=1.4;for(const off of [-2,2]){ctx.beginPath();ctx.ellipse(x,y+off,7,3,a,0,Math.PI*2);ctx.fill();ctx.stroke()}}ctx.restore();
 }
 function shaker(ctx,hand,angle,s){
  ctx.save();ctx.translate(hand.x,hand.y);ctx.rotate(angle);ctx.lineCap='round';ctx.lineWidth=9*s;ctx.strokeStyle='#8a5b30';ctx.beginPath();ctx.moveTo(0,12*s);ctx.lineTo(0,-58*s);ctx.stroke();const g=ctx.createRadialGradient(-10*s,-65*s,1,0,-64*s,29*s);g.addColorStop(0,'#e6bd77');g.addColorStop(1,'#a26c35');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,-66*s,27*s,34*s,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#815128';ctx.lineWidth=3*s;ctx.beginPath();ctx.moveTo(-24*s,-66*s);for(let i=0;i<6;i++)ctx.lineTo((-24+i*9)*s,(-66+(i%2?6:-6))*s);ctx.stroke();ctx.restore();
 }
 const api=window.PippoMusicRig={ready:false,performance,prepare,clear,inspect:()=>lastHit,draw(ctx,g,st){
  if(!image)return null;ensure(g);const kind=st.musicInstrument||'keyboard',model=performance.snapshot(),h=Math.min(g.height*.77,g.width*1.28);const musicPanel=document.getElementById('musicPanel');musicPanel.style.setProperty('--rig-height',h+'px');if(musicPanel.dataset.rig!=='contact-23'){musicPanel.dataset.rig='contact-23';musicPanel.dataset.hands='compact-26';dirty=true}
  if(dirty||!layout||layout.kind!==kind){layout=measure(g,kind);dirty=false}
  const s=h/650,cx=g.width*.5,cy=g.height*(kind==='drum'?.83:.89);
  const active=model.hands.some(h=>h?.active)||model.foot?.active;
  const wanted=model.energy>.65?2:model.energy>.08?1:0;expression=wanted;
  const bob=st.reduced?0:active?Math.sin(model.time/Math.max(60,model.period)*Math.PI)*Math.min(2,g.height*.004)*model.energy:0;
  // One complete registered figure per frame: no double face during transitions.
  const [bx,by,bw,bh]=bodyFrames[expression];ctx.drawImage(image,bx,by,bw,bh,cx-170*s,cy-650*s+bob,bw*s,bh*s);
  const shoulders=[{x:cx-91*s,y:cy-260*s+bob},{x:cx+91*s,y:cy-260*s+bob}];
  const targets=layout.targets,contacts=[],singleRadius=Math.min(g.width*.18,h*.24),wingReach=Math.min(g.width*.27,h*.24);const reduced=st.reduced;
  if(kind==='tambourine')tambourine(oc,{x:cx,y:g.height*.70},singleRadius);
  for(let arm=0;arm<2;arm++){
   const hit=model.hands[arm];let target,hand,tip,open=kind==='keyboard'||kind==='tambourine',lift=hit?(reduced?0:hit.lift):.7;
   const amplitude=Math.min(g.height*.09,Math.max(18,model.period*.12));
   if(kind==='keyboard'||kind==='xylophone'){
    const index=hit?.index??(kind==='xylophone'?(arm?7:0):(arm?6:1));target=targets[index];if(!target)continue;const held=kind==='keyboard'&&hit?.held,rest=Math.min(12,amplitude*.3);const elevation=held?0:(hit?lift*amplitude+rest*hit.settle:rest);
    tip={x:target.x,y:target.y-elevation};
    if(kind==='keyboard'){hand=tip;wing(oc,shoulders[arm],hand,s)}
    else{hand=PippoMusicAnatomy.reach(shoulders[arm],{x:tip.x+(arm?1:-1)*g.width*.045,y:tip.y-Math.min(g.width*.12,h*.16)},Math.min(g.width*.24,h*.30));const contact=stick(oc,hand,tip,true,s);wing(oc,shoulders[arm],hand,s,true);contacts.push({arm,index,tip:contact,target,contact:hit?.contact||false})}
    if(kind==='keyboard')contacts.push({arm,index,tip:hand,target,contact:hit?.held||hit?.contact||false});
   }else if(kind==='drum'){
    const index=hit?.index??(arm?3:2);target=targets[index];if(!target)continue;
    tip={x:target.x+(index>=3?(index===3?-.22:.22)*g.width*.12:0),y:target.y-(hit?lift*amplitude+Math.min(18,amplitude*.4)*hit.settle:Math.min(18,amplitude*.4))};
    // The surface point stays on the cymbal bow, away from its mounting post.
    target={x:tip.x,y:target.y};hand=PippoMusicAnatomy.reach(shoulders[arm],{x:tip.x*.72+shoulders[arm].x*.28,y:Math.max(shoulders[arm].y+g.height*.04,tip.y-Math.min(g.width*.12,h*.15))},Math.min(g.width*.24,h*.31));const contact=stick(oc,hand,tip,false,s);wing(oc,shoulders[arm],hand,s,true);contacts.push({arm,index,tip:contact,target,contact:hit?.contact||false});
   }else if(kind==='tambourine'){
    target=arm?{x:cx+singleRadius*.25,y:g.height*.68}:{x:cx-singleRadius*.96,y:g.height*.70};hand={...target,y:target.y-(arm?(hit?lift+hit.settle*.35:.35)*amplitude:0)};wing(oc,shoulders[arm],hand,s);contacts.push({arm,index:0,tip:hand,target,contact:arm===1&&hit?.contact||false});
   }else if(kind==='shaker'){
    const swing=arm===1&&hit&&!reduced?Math.sin(hit.q*Math.PI*2)*amplitude:0;
    hand={x:cx+(arm?1:-1)*wingReach,y:g.height*.72+swing};if(arm)shaker(oc,hand,.35+(swing/amplitude)*.35,s*1.4);wing(oc,shoulders[arm],hand,s,arm===1);contacts.push({arm,index:0,tip:hand,target:hand,contact:arm===1&&hit?.contact||false});
   }
  }
  if(kind==='drum'){
   // The bass pedal is placed to the musician's side of the kick shell.
   // A short orange leg connects it to Pippo; there is no loose floating foot.
   const kick=document.querySelector('[data-piece="0"]')?.getBoundingClientRect(),scene=document.getElementById('pippo').getBoundingClientRect();
   if(kick){
    const q=model.foot?.q??1,press=model.foot?.active?(reduced?1:Math.max(0,1-q*1.4)):0;
    const p=PippoMusicAnatomy.pedal(kick,scene,cx,cy,s,press);
    oc.save();oc.lineCap='round';oc.lineJoin='round';
    // Rocker, hinge and beater stay attached to the same kick at every frame.
    oc.fillStyle='#657c70';oc.strokeStyle='#344f46';oc.lineWidth=Math.max(1.2,s*2);
    oc.beginPath();oc.moveTo(p.x-20*s,p.y);oc.lineTo(p.x+19*s,p.y);oc.lineTo(p.x+14*s,p.y-6*s);oc.lineTo(p.x-14*s,p.y-6*s);oc.closePath();oc.fill();oc.stroke();
    oc.strokeStyle='#819287';oc.lineWidth=Math.max(2,s*4);
    oc.beginPath();oc.moveTo(p.x-15*s,p.y-8*s);oc.lineTo(p.beater.x,p.beater.y);oc.stroke();
    oc.fillStyle='#d6c9ac';oc.beginPath();oc.ellipse(p.beater.x,p.beater.y,7*s,9*s,-.15,0,Math.PI*2);oc.fill();
    // A seated duck's bent leg, short ankle and rounded three-toed foot.
    const knee={x:p.hip.x+21*s,y:p.hip.y+40*s};
    oc.strokeStyle='#ce8330';oc.lineWidth=19*s;oc.beginPath();oc.moveTo(p.hip.x,p.hip.y);oc.quadraticCurveTo(knee.x,knee.y,p.heel.x,p.heel.y);oc.stroke();
    oc.strokeStyle='#eda347';oc.lineWidth=15*s;oc.stroke();
    oc.fillStyle='#eba04a';oc.strokeStyle='#c68034';oc.lineWidth=Math.max(1,s*2);
    oc.beginPath();oc.ellipse(p.toe.x,p.toe.y,21*s,10*s,-.16,0,Math.PI*2);oc.fill();oc.stroke();
    for(let i=-1;i<=1;i++){oc.beginPath();oc.ellipse(p.toe.x+12*s,p.toe.y+i*5.2*s,8*s,4*s,-.12,0,Math.PI*2);oc.fill()}
    oc.restore();
    contacts.push({foot:true,index:0,contact:model.foot?.contact||false,pedal:p});
   }
  }
  const panel=document.getElementById('musicPanel');panel.dataset.artReady='true';panel.dataset.rig='contact-23';panel.dataset.hands='compact-26';panel.dataset.pace=model.pace;panel.dataset.expression=['attentive','focused','delighted'][expression];panel.dataset.stroke=String(model.serial);
  lastHit={kind,serial:model.serial,pace:model.pace,expression:panel.dataset.expression,contacts,stage:{width:g.width,height:g.height}};
  return {pose:'music_rig_'+kind+'_'+model.serial,hit:{alpha:bodyAlpha[expression],width:340,height:680,cx,cy,scale:s,stretch:1,anchorX:170,anchorY:650,headBottom:330}};
 }};
})();
