'use strict';
// Music-only rig: complete head/neck/torso, independently registered wings.
// Instrument contacts are measured from their live DOM surfaces after layout.
(()=>{
 const performance=PippoPerformance.create();const bodyAlpha=[],drumBodies=[],feet=[],skeleton=[];let image,armsImage,gripsImage,loading,overlay,oc,footOverlay,fc,lastHit=null,expression=0,layout=null,dirty=true;
 const bodyFrames=[[150,0,340,680],[600,0,340,680],[1080,0,340,680]];

 function prepare(){
  if(loading)return loading;api.failed=false;
  const load=src=>new Promise((resolve,reject)=>{const i=new Image;i.onload=()=>resolve(i);i.onerror=reject;i.src=src});
  loading=Promise.all([load('assets/music-rig-v23/rig.webp'),load('assets/hands-approved-v27/hands.png'),load('assets/grips-v30/hands.png')]).then(([body,arms,grips])=>{
   image=body;armsImage=arms;gripsImage=grips;prepareArmArt();bodyAlpha.length=0;drumBodies.length=0;feet.length=0;
   for(const rect of bodyFrames){
    const c=document.createElement('canvas');c.width=rect[2];c.height=rect[3];const t=c.getContext('2d');t.drawImage(image,...rect,0,0,c.width,c.height);
    const data=t.getImageData(0,0,c.width,c.height);bodyAlpha.push(Uint8Array.from({length:c.width*c.height},(_,n)=>data.data[n*4+3]));
    const foot=document.createElement('canvas');foot.width=120;foot.height=118;const ft=foot.getContext('2d'),pixels=ft.createImageData(120,118);
    // Extract ONLY the original orange ankle/foot. Keep the stool and feathers.
    for(let y=0;y<118;y++)for(let x=0;x<120;x++){
     const k=((y+535)*c.width+x+190)*4,j=(y*120+x)*4,[r,g,b,a]=data.data.slice(k,k+4);
     if(r>170&&r>g*1.50&&g>b*1.7&&b<100){for(let n=0;n<4;n++)pixels.data[j+n]=data.data[k+n];data.data[k+3]=0}
    }
    ft.putImageData(pixels,0,0);t.putImageData(data,0,0);drumBodies.push(c);feet.push(foot);
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
 // The approved hands are rigid sprites: a small wrist, no elbow mesh.
 // Keep the feather texture and silhouette at uniform scale for every note.
 const handArt={open:[{crop:[150,230,400,335],P:[170,295],W:[150,45]},
                          {crop:[704,230,400,335],P:[230,295],W:[250,45]}],
                grip:[{crop:[175,890,350,260],P:[265,115],W:[135,35]},
                          {crop:[729,890,350,260],P:[85,115],W:[215,35]}],
                drum:[{crop:[145,180,450,325],P:[115,218],W:[340,50],tool:true},
                           {crop:[659,180,450,325],P:[335,218],W:[110,50],tool:true}],
                mallet:[{crop:[145,770,450,310],P:[115,187],W:[340,45],tool:true},
                             {crop:[659,770,450,310],P:[335,187],W:[110,45],tool:true}]};
 function prepareArmArt(){
  for(const pair of Object.values(handArt))for(const a of pair){
   const [x,y,w,h]=a.crop,c=document.createElement('canvas');c.width=w;c.height=h;
   const t=c.getContext('2d');t.drawImage(a.tool?gripsImage:armsImage,x,y,w,h,0,0,w,h);
   t.globalCompositeOperation='destination-in';
   const fade=t.createLinearGradient(0,0,0,55);fade.addColorStop(0,'rgba(0,0,0,0)');fade.addColorStop(1,'rgba(0,0,0,1)');
   t.fillStyle=fade;t.fillRect(0,0,w,h);t.globalCompositeOperation='source-over';a.canvas=c;
  }
 }
 function solveArm(shoulder,hand,s,gripping=false,side=0,toolTip=null,mallet=false,attachmentShift=null){
  const a=handArt[toolTip?(mallet?'mallet':'drum'):gripping?'grip':'open'][side],k=(toolTip?.20:gripping?.23:.22)*s;
  // Wrist registration stays inside the original yellow side of the torso.
  // A short overlap hides the source cut; no floating crop or elbow mesh.
  const wrist={x:shoulder.x,y:shoulder.y+(attachmentShift??(toolTip?20:25))*s};
  const offset={x:(a.P[0]-a.W[0])*k,y:(a.P[1]-a.W[1])*k};
  const wanted=Math.atan2(hand.y-wrist.y,hand.x-wrist.x)-Math.atan2(offset.y,offset.x);
  const rotation=Math.max(-.50,Math.min(.50,Math.atan2(Math.sin(wanted),Math.cos(wanted))));
  const pose=PippoMusicAnatomy.anchored(wrist,offset,toolTip,side?0:Math.PI,rotation);
  return {a,k,angle:pose.angle,pose};
 }
 function registerArm(solution,side,gripping){
  const {a,k,angle,pose}=solution,dx=(a.W[0]-a.P[0])*k,dy=(a.W[1]-a.P[1])*k;
  const mappedWrist={x:pose.contact.x+dx*Math.cos(angle)-dy*Math.sin(angle),y:pose.contact.y+dx*Math.sin(angle)+dy*Math.cos(angle)};
  skeleton.push({side,gripping,...pose,mappedWrist,attachmentError:Math.hypot(mappedWrist.x-pose.wrist.x,mappedWrist.y-pose.wrist.y)});
 }
 function paintHand(ctx,solution){
  const {a,k,angle,pose}=solution;ctx.save();ctx.translate(pose.contact.x,pose.contact.y);ctx.rotate(angle);ctx.scale(k,k);ctx.translate(-a.P[0],-a.P[1]);
  ctx.drawImage(a.canvas,0,0);ctx.restore();
 }
 function wing(ctx,shoulder,hand,s,gripping=false,side=0,toolTip=null){
  const solution=solveArm(shoulder,hand,s,gripping,side,toolTip);
  registerArm(solution,side,gripping);paintHand(ctx,solution);return solution.pose;
 }
 function playTool(ctx,shoulder,desired,tip,s,side,mallet){
  const solution=solveArm(shoulder,desired,s,true,side,tip,mallet),hand=solution.pose.contact;
  registerArm(solution,side,true);
  const contact=stick(ctx,hand,tip,mallet,s);paintHand(ctx,solution);return contact;
 }
 function stick(ctx,hand,tip,mallet,unit){
  const dx=tip.x-hand.x,dy=tip.y-hand.y,len=Math.hypot(dx,dy)||1,ux=dx/len,uy=dy/len,r=mallet?Math.max(5,unit*12):Math.max(2,unit*4);
  const center={x:tip.x,y:tip.y-r};ctx.save();ctx.lineCap='round';ctx.strokeStyle='#815332';ctx.lineWidth=Math.max(3,unit*9);ctx.beginPath();ctx.moveTo(hand.x-ux*28*unit,hand.y-uy*28*unit);ctx.lineTo(center.x,center.y);ctx.stroke();ctx.strokeStyle='#d9ac70';ctx.lineWidth=Math.max(2,unit*5);ctx.stroke();const grad=ctx.createRadialGradient(center.x-r*.3,center.y-r*.4,1,center.x,center.y,r);grad.addColorStop(0,mallet?'#53626a':'#ecd1a0');grad.addColorStop(1,mallet?'#202e35':'#b4854e');ctx.fillStyle=grad;ctx.beginPath();ctx.arc(center.x,center.y,r,0,Math.PI*2);ctx.fill();ctx.restore();return {x:center.x,y:center.y+r};
 }
 function tambourine(ctx,p,r){
  ctx.save();const skin=ctx.createRadialGradient(p.x-r*.3,p.y-r*.3,1,p.x,p.y,r);skin.addColorStop(0,'#fff1ce');skin.addColorStop(1,'#d0b57f');ctx.fillStyle='#98623d';ctx.beginPath();ctx.ellipse(p.x,p.y+5,r,r*.86,0,0,Math.PI*2);ctx.fill();ctx.fillStyle=skin;ctx.strokeStyle='#bc9158';ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(p.x,p.y,r*.92,r*.79,0,0,Math.PI*2);ctx.fill();ctx.stroke();for(let i=0;i<8;i++){const a=i*Math.PI/4,x=p.x+Math.cos(a)*r*.96,y=p.y+Math.sin(a)*r*.82;ctx.fillStyle='#b7bdb5';ctx.strokeStyle='#758278';ctx.lineWidth=1.4;for(const off of [-2,2]){ctx.beginPath();ctx.ellipse(x,y+off,7,3,a,0,Math.PI*2);ctx.fill();ctx.stroke()}}ctx.restore();
 }
 function shaker(ctx,hand,angle,s,headOnly=false){
  ctx.save();ctx.translate(hand.x,hand.y);ctx.rotate(angle);ctx.lineCap='round';if(!headOnly){ctx.lineWidth=9*s;ctx.strokeStyle='#8a5b30';ctx.beginPath();ctx.moveTo(0,12*s);ctx.lineTo(0,-58*s);ctx.stroke()}const g=ctx.createRadialGradient(-10*s,-65*s,1,0,-64*s,29*s);g.addColorStop(0,'#e6bd77');g.addColorStop(1,'#a26c35');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,-66*s,27*s,34*s,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#815128';ctx.lineWidth=3*s;ctx.beginPath();ctx.moveTo(-24*s,-66*s);for(let i=0;i<6;i++)ctx.lineTo((-24+i*9)*s,(-66+(i%2?6:-6))*s);ctx.stroke();ctx.restore();
 }
 const api=window.PippoMusicRig={ready:false,performance,prepare,clear,inspect:()=>lastHit,draw(ctx,g,st){
  if(!image)return null;ensure(g);skeleton.length=0;const kind=st.musicInstrument||'keyboard',model=performance.snapshot(),h=Math.min(g.height*.77,g.width*1.28);const musicPanel=document.getElementById('musicPanel');musicPanel.style.setProperty('--rig-height',h+'px');if(musicPanel.dataset.rig!=='contact-23'){musicPanel.dataset.rig='contact-23';musicPanel.dataset.hands='anchored-wrist-31';dirty=true}
  if(dirty||!layout||layout.kind!==kind){layout=measure(g,kind);dirty=false}
  const s=h/650,cx=g.width*.5,cy=g.height*(kind==='drum'?.83:.89);
  const active=model.hands.some(h=>h?.active)||model.foot?.active;
  const wanted=model.energy>.65?2:model.energy>.08?1:0;expression=wanted;
  const bob=st.reduced?0:active?Math.sin(model.time/Math.max(60,model.period)*Math.PI)*Math.min(2,g.height*.004)*model.energy:0;
  // One complete registered figure per frame: no double face during transitions.
  const [bx,by,bw,bh]=bodyFrames[expression];if(kind==='drum')ctx.drawImage(drumBodies[expression],cx-170*s,cy-650*s+bob,bw*s,bh*s);else ctx.drawImage(image,bx,by,bw,bh,cx-170*s,cy-650*s+bob,bw*s,bh*s);
  const shoulders=[{x:cx-79*s,y:cy-245*s+bob},{x:cx+79*s,y:cy-245*s+bob}];
  const targets=layout.targets,contacts=[];const reduced=st.reduced;
  const tambourineCenter={x:cx,y:cy-158*s},tambourineRadius=86*s;
  if(kind==='tambourine')tambourine(oc,tambourineCenter,tambourineRadius);
  for(let arm=0;arm<2;arm++){
   const hit=model.hands[arm];let target,hand,tip,open=kind==='keyboard'||kind==='tambourine',lift=hit?(reduced?0:hit.lift):.7;
   const amplitude=Math.min(g.height*.09,Math.max(18,model.period*.12));
   if(kind==='keyboard'||kind==='xylophone'){
    const index=hit?.index??(kind==='xylophone'?(arm?6:1):(arm?5:2));target=targets[index];if(!target)continue;const held=kind==='keyboard'&&hit?.held,rest=Math.min(12,amplitude*.3);const elevation=held?0:(hit?lift*amplitude+rest*hit.settle:rest);
    tip={x:target.x,y:target.y-elevation};
    if(kind==='keyboard'){hand=wing(oc,shoulders[arm],tip,s,false,arm).contact}
    else{hand={x:cx+(arm?1:-1)*74*s+(tip.x-cx)*.08,y:shoulders[arm].y+(76-(hit?lift*10:0))*s};const contact=playTool(oc,shoulders[arm],hand,tip,s,arm,true);contacts.push({arm,index,tip:contact,target,contact:hit?.contact||false})}
    if(kind==='keyboard')contacts.push({arm,index,tip:hand,target,reachable:Math.hypot(hand.x-tip.x,hand.y-tip.y)<1,contact:hit?.held||hit?.contact||false});
   }else if(kind==='drum'){
    const index=hit?.index??(arm?3:2);target=targets[index];if(!target)continue;
    tip={x:target.x+(index>=3?(index===3?-.22:.22)*g.width*.12:0),y:target.y-(hit?lift*amplitude+Math.min(18,amplitude*.4)*hit.settle:Math.min(18,amplitude*.4))};
    // The surface point stays on the cymbal bow, away from its mounting post.
    target={x:tip.x,y:target.y};hand={x:cx+(arm?1:-1)*74*s+(tip.x-cx)*.06,y:shoulders[arm].y+(76-(hit?lift*12:0))*s};const contact=playTool(oc,shoulders[arm],hand,tip,s,arm,false);contacts.push({arm,index,tip:contact,target,contact:hit?.contact||false});
   }else if(kind==='tambourine'){
    target=arm?{x:cx+tambourineRadius*.70,y:tambourineCenter.y+12*s}:{x:cx-tambourineRadius*.96,y:tambourineCenter.y};hand={...target,y:target.y-(arm?Math.min((hit?lift+hit.settle*.35:.35)*amplitude,Math.max(0,target.y-shoulders[arm].y-72*s)):0)};hand=wing(oc,arm?shoulders[arm]:{x:cx-108*s,y:cy-203*s+bob},hand,s,arm===0,arm).contact;contacts.push({arm,index:0,tip:hand,target:hand,surface:target,contact:arm===1&&hit?.contact||false});
   }else if(kind==='shaker'){
    const swing=arm===1&&hit&&!reduced?Math.sin(hit.q*Math.PI*2)*Math.min(amplitude,26*s):0;
    const desired={x:cx+(arm?1:-1)*82*s,y:cy-160*s+swing};
    hand=solveArm(shoulders[arm],desired,s,arm===1,arm).pose.contact;
    if(arm){
     const angle=.35+(swing/amplitude)*.35,head={x:hand.x+Math.sin(angle)*66*s,y:hand.y-Math.cos(angle)*66*s};
     const solution=solveArm(shoulders[arm],hand,s,true,arm,head,false,90);hand=solution.pose.contact;registerArm(solution,arm,true);
     shaker(oc,hand,angle,s);paintHand(oc,solution);
    }else wing(oc,shoulders[arm],hand,s,false,arm);
    contacts.push({arm,index:0,tip:hand,target:hand,contact:arm===1&&hit?.contact||false});
   }
  }
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
    fc.drawImage(feet[expression],-45*s,-12*s,120*s,118*s);fc.restore();
    fc.restore();
    contacts.push({foot:true,index:0,contact:model.foot?.contact||false,pedal:p});
   }
  }
  const panel=document.getElementById('musicPanel');panel.dataset.armError=String(Math.max(0,...skeleton.map(a=>a.attachmentError)));panel.dataset.wristAttached='true';panel.dataset.artReady='true';panel.dataset.rig='contact-23';panel.dataset.hands='anchored-wrist-31';panel.dataset.pace=model.pace;panel.dataset.expression=['attentive','focused','delighted'][expression];panel.dataset.stroke=String(model.serial);
  lastHit={arms:skeleton.map(a=>({...a})),kind,serial:model.serial,pace:model.pace,expression:panel.dataset.expression,contacts,stage:{width:g.width,height:g.height}};
  return {pose:'music_rig_'+kind+'_'+model.serial,hit:{alpha:bodyAlpha[expression],width:340,height:680,cx,cy,scale:s,stretch:1,anchorX:170,anchorY:650,headBottom:330}};
 }};
})();
