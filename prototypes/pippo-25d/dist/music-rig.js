'use strict';
// Music-only rig: complete head/neck/torso, independently registered wings.
// Instrument contacts are measured from their live DOM surfaces after layout.
(()=>{
 const performance=PippoPerformance.create();const bodyAlpha=[],skeleton=[];let image,feetImage,renderMeta,torso,loading,overlay,oc,footOverlay,fc,lastHit=null,expression=0,layout=null,dirty=true;

 function prepare(){
  if(loading)return loading;api.failed=false;
  const load=src=>new Promise((resolve,reject)=>{const i=new Image;i.onload=()=>resolve(i);i.onerror=reject;i.src=src});
  loading=Promise.all([load('assets/music-render-v33/body.png'),load('assets/music-render-v33/torso.png'),load('assets/music-render-v33/front.png'),load('assets/music-render-v33/feet.png'),fetch('assets/music-render-v33/manifest.json').then(r=>{if(!r.ok)throw Error('music render manifest');return r.json()})]).then(([body,atlas,front,foot,meta])=>{
   image=body;feetImage=foot;renderMeta=meta;torso=PippoMusicTorso.create(atlas,front);bodyAlpha.length=0;
   // Display sources are immutable PNG images. Hit testing uses prepared alpha
   // rows and never reads/writes the canvases containing the face or feet.
   for(const rows of meta.hitRows){
    const alpha=new Uint8Array(340*680);
    rows.forEach((spans,y)=>{for(let i=0;i<spans.length;i+=2)alpha.fill(255,y*340+spans[i],y*340+spans[i+1])});
    bodyAlpha.push(alpha);
   }
   api.ready=true;dirty=true;return true;
  }).catch(()=>{loading=null;api.failed=true;return false});return loading;
 }
 function clear(){if(overlay){oc.clearRect(0,0,overlay.width,overlay.height);overlay.hidden=true}if(footOverlay){fc.clearRect(0,0,footOverlay.width,footOverlay.height);footOverlay.hidden=true}lastHit=null}
 function surface(el,scene,kind,index){if(!el)return null;return PippoPerformance.contact(el.getBoundingClientRect(),scene,kind,index)}
 function measure(g,kind){
  const scene=document.getElementById('pippo').getBoundingClientRect();
  const targets=Array.from({length:kind==='drum'?5:8},(_,i)=>surface(document.querySelector(kind==='drum'?'[data-piece="'+i+'"]':'[data-note="'+i+'"]'),scene,kind,i));
  return {targets,width:g.width,height:g.height,kind};
 }
 function ensure(g){
  if(!overlay){overlay=document.createElement('canvas');overlay.id='musicHands';overlay.setAttribute('aria-hidden','true');document.getElementById('stage').append(overlay);oc=overlay.getContext('2d');new ResizeObserver(()=>{dirty=true}).observe(document.getElementById('stage'));window.addEventListener('resize',()=>{dirty=true})}
  if(!footOverlay){footOverlay=document.createElement('canvas');footOverlay.id='musicFeet';footOverlay.setAttribute('aria-hidden','true');document.getElementById('stage').append(footOverlay);fc=footOverlay.getContext('2d')}footOverlay.hidden=false;overlay.hidden=false;const ratio=Math.min(window.devicePixelRatio||1,2);if(overlay.width!==Math.round(g.width*ratio)||overlay.height!==Math.round(g.height*ratio)){overlay.width=Math.round(g.width*ratio);overlay.height=Math.round(g.height*ratio);dirty=true}oc.setTransform(overlay.width/g.width,0,0,overlay.height/g.height,0,0);oc.clearRect(0,0,g.width,g.height);oc.imageSmoothingEnabled=true;if(footOverlay.width!==overlay.width||footOverlay.height!==overlay.height){footOverlay.width=overlay.width;footOverlay.height=overlay.height}fc.setTransform(overlay.width/g.width,0,0,overlay.height/g.height,0,0);fc.clearRect(0,0,g.width,g.height);fc.imageSmoothingEnabled=true;
 }
 // Torso, shoulders, whole arms and hands are one painted surface.
 // No hand crop, wrist pivot or separate hand transform remains.
 function stick(ctx,hand,tip,mallet,unit){
  const dx=tip.x-hand.x,dy=tip.y-hand.y,len=Math.hypot(dx,dy)||1,ux=dx/len,uy=dy/len,r=mallet?Math.max(5,unit*12):Math.max(2,unit*4);
  const center={x:tip.x,y:tip.y-r};ctx.save();ctx.lineCap='round';ctx.strokeStyle='#b18d60';ctx.lineWidth=Math.max(3,unit*9);ctx.beginPath();ctx.moveTo(hand.x-ux*28*unit,hand.y-uy*28*unit);ctx.lineTo(center.x,center.y);ctx.stroke();ctx.strokeStyle='#e5c99f';ctx.lineWidth=Math.max(2,unit*5);ctx.stroke();const grad=ctx.createRadialGradient(center.x-r*.3,center.y-r*.4,1,center.x,center.y,r);grad.addColorStop(0,mallet?'#53626a':'#ecd1a0');grad.addColorStop(1,mallet?'#202e35':'#b4854e');ctx.fillStyle=grad;ctx.beginPath();ctx.arc(center.x,center.y,r,0,Math.PI*2);ctx.fill();ctx.restore();return {x:center.x,y:center.y+r};
 }
 function tambourine(ctx,p,r){
  ctx.save();const skin=ctx.createRadialGradient(p.x-r*.3,p.y-r*.3,1,p.x,p.y,r);skin.addColorStop(0,'#fff1ce');skin.addColorStop(1,'#d0b57f');ctx.fillStyle='#98623d';ctx.beginPath();ctx.ellipse(p.x,p.y+5,r,r*.86,0,0,Math.PI*2);ctx.fill();ctx.fillStyle=skin;ctx.strokeStyle='#bc9158';ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(p.x,p.y,r*.92,r*.79,0,0,Math.PI*2);ctx.fill();ctx.stroke();for(let i=0;i<8;i++){const a=i*Math.PI/4,x=p.x+Math.cos(a)*r*.96,y=p.y+Math.sin(a)*r*.82;ctx.fillStyle='#b7bdb5';ctx.strokeStyle='#758278';ctx.lineWidth=1.4;for(const off of [-2,2]){ctx.beginPath();ctx.ellipse(x,y+off,7,3,a,0,Math.PI*2);ctx.fill();ctx.stroke()}}ctx.restore();
 }
 function shaker(ctx,hand,angle,s,headOnly=false){
  ctx.save();ctx.translate(hand.x,hand.y);ctx.rotate(angle);ctx.lineCap='round';if(!headOnly){ctx.lineWidth=9*s;ctx.strokeStyle='#8a5b30';ctx.beginPath();ctx.moveTo(0,12*s);ctx.lineTo(0,-58*s);ctx.stroke()}const g=ctx.createRadialGradient(-10*s,-65*s,1,0,-64*s,29*s);g.addColorStop(0,'#e6bd77');g.addColorStop(1,'#a26c35');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,-66*s,27*s,34*s,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#815128';ctx.lineWidth=3*s;ctx.beginPath();ctx.moveTo(-24*s,-66*s);for(let i=0;i<6;i++)ctx.lineTo((-24+i*9)*s,(-66+(i%2?6:-6))*s);ctx.stroke();ctx.restore();
 }
 const api=window.PippoMusicRig={ready:false,performance,prepare,clear,inspect:()=>lastHit,draw(ctx,g,st){
  if(!image)return null;ensure(g);skeleton.length=0;const kind=st.musicInstrument||'keyboard',model=performance.snapshot(),h=Math.min(g.height*.77,g.width*1.28);const musicPanel=document.getElementById('musicPanel');musicPanel.style.setProperty('--rig-height',h+'px');if(musicPanel.dataset.rig!=='contact-23'){musicPanel.dataset.rig='contact-23';musicPanel.dataset.hands='immutable-music-33';dirty=true}
  if(musicPanel.dataset.hands!=='immutable-music-33'){musicPanel.dataset.hands='immutable-music-33';dirty=true}
  if(dirty||!layout||layout.kind!==kind){layout=measure(g,kind);dirty=false}
  const s=h/650,cx=g.width*.5,cy=g.height*(kind==='drum'?.83:.89)-(kind==='drum'?35:kind==='xylophone'?20:0)*s;
  const active=model.hands.some(h=>h?.active)||model.foot?.active;
  const wanted=model.energy>.65?2:model.energy>.08?1:0;expression=wanted;
  const bob=st.reduced?0:active?Math.sin(model.time/Math.max(60,model.period)*Math.PI)*Math.min(2,g.height*.004)*model.energy:0;
  // One complete registered figure per frame: no double face during transitions.
  const levels=model.hands.map(hit=>!st.reduced&&hit?.active&&!(kind==='keyboard'&&hit.held)?Math.round(hit.lift*8):0);
  const style=kind==='keyboard'||kind==='tambourine'?'open':'grip',pose=torso.pose(style,levels);
  const rect=(kind==='drum'?renderMeta.drumFrames:renderMeta.bodyFrames)[expression];
  ctx.drawImage(image,...rect,cx-170*s,cy-650*s+bob,340*s,680*s);
  ctx.drawImage(pose.canvas,cx-170*s,cy-320*s+bob,340*s,230*s);
  const world=p=>({x:cx+(p.x-170)*s,y:cy+(p.y-650)*s+bob}),contacts=[],targets=layout.targets;
  const hands=pose.contacts.map(world),shoulders=pose.shoulders.map(world);
  for(let side=0;side<2;side++)skeleton.push({side,shoulder:shoulders[side],contact:hands[side],maximum:160*s,continuous:true});
  const reduced=st.reduced;
  if(kind==='tambourine')tambourine(oc,{x:cx,y:cy-128*s},88*s);
  for(let arm=0;arm<2;arm++){
   const hit=model.hands[arm],hand=hands[arm],lift=hit?(reduced?0:hit.lift):.35;
   const amplitude=Math.min(g.height*.09,Math.max(18,model.period*.12));
   if(kind==='keyboard'||kind==='xylophone'){
    const index=hit?.index??(arm?6:1),target=targets[index];if(!target)continue;
    const elevation=kind==='keyboard'?0:hit?lift*amplitude:12*s;
    const tip={x:target.x,y:target.y-elevation};
    if(kind==='xylophone'){
     const contact=stick(oc,hand,tip,true,s);contacts.push({arm,index,tip:contact,target,shaftLength:Math.hypot(tip.x-hand.x,tip.y-hand.y)/s,contact:hit?.contact||false});
    }else contacts.push({arm,index,tip:hand,target,reachable:Math.hypot(hand.x-target.x,hand.y-target.y)<2*s,contact:hit?.held||hit?.contact||false});
   }else if(kind==='drum'){
    const index=hit?.index??(arm?3:2),target=targets[index];if(!target)continue;
    const tip={x:target.x+(index>=3?(index===3?-.22:.22)*g.width*.12:0),y:target.y-(hit?lift*amplitude:12*s)};
    const adjusted={x:tip.x,y:target.y},contact=stick(oc,hand,tip,false,s);
    contacts.push({arm,index,tip:contact,target:adjusted,shaftLength:Math.hypot(tip.x-hand.x,tip.y-hand.y)/s,contact:hit?.contact||false});
   }else if(kind==='shaker'&&arm===1){
    const angle=.22+(hit?.active&&!reduced?Math.sin(hit.q*Math.PI*2)*.2:0);shaker(oc,hand,angle,s);
    contacts.push({arm,index:0,tip:hand,target:hand,contact:hit?.contact||false});
   }else if(kind==='tambourine')contacts.push({arm,index:0,tip:hand,target:hand,contact:arm===1&&hit?.contact||false});
  }
  torso.front(oc,pose,cx,cy,s,bob);
  if(kind==='drum'){
   // The bass pedal is placed to the musician's side of the kick shell.
   // A short orange leg connects it to Pippo; there is no loose floating foot.
   const kick=document.querySelector('[data-piece="0"]')?.getBoundingClientRect(),scene=document.getElementById('pippo').getBoundingClientRect();
   if(kick){
    const q=model.foot?.q??1,press=model.foot?.active?(reduced?1:Math.max(0,1-q*1.4)):0;
    const p=PippoMusicAnatomy.pedal(kick,scene,cx,cy,s,press);
    fc.save();fc.lineCap='round';fc.lineJoin='round';
    // Rocker, hinge and beater stay attached to the same kick at every frame.
    fc.fillStyle='#657c70';fc.strokeStyle='#344f46';fc.lineWidth=Math.max(1.2,s*2);
    fc.beginPath();fc.moveTo(p.x-20*s,p.y);fc.lineTo(p.x+19*s,p.y);fc.lineTo(p.x+14*s,p.y-6*s);fc.lineTo(p.x-14*s,p.y-6*s);fc.closePath();fc.fill();fc.stroke();
    fc.strokeStyle='#819287';fc.lineWidth=Math.max(2,s*4);
    fc.beginPath();fc.moveTo(p.x-15*s,p.y-8*s);fc.lineTo(p.beater.x,p.beater.y);fc.stroke();
    fc.fillStyle='#d6c9ac';fc.beginPath();fc.ellipse(p.beater.x,p.beater.y,7*s,9*s,-.15,0,Math.PI*2);fc.fill();
    // Reuse the real painted ankle and webbed foot, registered at its original hip.
    // The same foot was removed from the body pixels: exactly two feet, never three.
    fc.save();fc.translate(cx+65*s,cy-103*s+bob);fc.scale(1,1+press*.045);
    fc.drawImage(feetImage,expression*120,0,120,118,-45*s,-12*s,120*s,118*s);fc.restore();
    fc.restore();
    contacts.push({foot:true,index:0,contact:model.foot?.contact||false,pedal:p});
   }
  }
  const panel=document.getElementById('musicPanel');panel.dataset.armError='0';panel.dataset.bodySurface='continuous';panel.dataset.poseCache=String(torso.cacheSize());panel.dataset.artReady='true';panel.dataset.rig='contact-23';panel.dataset.hands='immutable-music-33';panel.dataset.pace=model.pace;panel.dataset.expression=['attentive','focused','delighted'][expression];panel.dataset.stroke=String(model.serial);
  lastHit={arms:skeleton.map(a=>({...a})),kind,serial:model.serial,pace:model.pace,expression:panel.dataset.expression,contacts,stage:{width:g.width,height:g.height}};
  return {pose:'music_rig_'+kind+'_'+model.serial,hit:{alpha:bodyAlpha[expression],width:340,height:680,cx,cy,scale:s,stretch:1,anchorX:170,anchorY:650,headBottom:330}};
 }};
})();
