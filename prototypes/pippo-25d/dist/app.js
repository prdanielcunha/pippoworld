'use strict';
const $=id=>document.getElementById(id),canvas=$('pippo'),ctx=canvas.getContext('2d');
const state={paused:false,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,look:false,tx:0,ty:0,x:0,y:0,blink:0,blinkDuration:240,pet:0,petHeld:false,petDuration:1500,petKind:'head',petSide:1,time:0,last:0,nextBlink:4200,ready:false,draws:0,motion:null,motionReady:false,ballTime:null,ballReacted:false,activity:'yard',stageWidth:0,stageHeight:0,actorX:.5,facing:1,walkDistance:0,pointer:null};
$('reduced').checked=state.reduced;
let base,closed,atlas,atlasMeta,sprites=[],walkAtlas,walkMeta,walkSprites=[];
const eyes=[{x:577,y:425,rx:72,ry:86,angle:-.28},{x:807,y:337,rx:60,ry:81,angle:-.28}];
const ballDuration=2600;
function image(src){return new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=src})}
function message(s){$('status').textContent=s}
function geometry(){const g=PippoInteraction.geometry(state.stageWidth||400,state.stageHeight||500,state.actorX);return state.activity==='music'?{...g,cx:g.width*.5,bodyHeight:Math.min(g.height*.58,g.width*.76),bottom:g.height*.70}:g}
function setBlink(duration){state.blinkDuration=duration;state.blink=duration}
// Keep complete painted poses: the rejected separate-leg rig is not loaded.
function blink(){if(!state.ready||state.paused)return;endGesture();state.turn=null;state.sideRest=false;cancelBall();state.motion=null;state.pet=0;setBlink(260);message('Uma piscadinha suave.');render()}
function pet(kind='head',side=1){
 if(!state.ready||state.paused)return;
 state.turn=null;state.sideRest=false;state.expression=null;state.petHeld=false;cancelBall();state.motion=null;state.petKind=kind;state.petSide=side;
 state.petDuration=kind==='head'?1500:1150;state.pet=state.petDuration;setBlink(kind==='head'?1050:220);
 message(kind==='head'?'Um carinho na cabeça. Pippo fecha os olhinhos.':'Um carinho na barriguinha. Pippo se balança contente.');render();
}
function resize(){
 const box=canvas.getBoundingClientRect();state.stageWidth=box.width;state.stageHeight=box.height;
 const d=Math.min(devicePixelRatio||1,3,Math.sqrt(2400000/Math.max(1,box.width*box.height)));
 canvas.width=Math.round(box.width*d);canvas.height=Math.round(box.height*d);ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
 const g=geometry();state.actorX=PippoInteraction.clamp(state.actorX,g.min,g.max);
 if(state.motion?.walk){const route=PippoInteraction.plan(state.actorX,state.motion.walk.to,g,state.motion.walk.velocity);state.motion=route?{kind:'walk',walk:route}:null;if(!route)state.turn=null}
 render();
}
function eyeClip(e,scale=1){ctx.beginPath();ctx.ellipse(e.x,e.y,e.rx*scale,e.ry*scale,e.angle,0,Math.PI*2);ctx.clip()}
function drawIdle(g,alpha=1){
 const s=g.scale,elapsed=state.petDuration-state.pet,envelope=state.pet>0?Math.sin(Math.PI*elapsed/state.petDuration):0;
 const lean=state.reduced?0:(state.petKind==='head'?envelope*.032*state.petSide:Math.sin(state.time/150)*envelope*.012);
 const stretch=state.reduced?1:1+(state.pet>0&&state.petKind==='belly'?Math.sin(state.time/150)*envelope*.008:Math.sin(state.time/1600)*.0018);
 ctx.save();ctx.globalAlpha=alpha;ctx.translate(g.cx,g.bottom);ctx.scale(state.facing,1);
 drawGroundShadow(0,-12*s,690*s*.63,1146*s*.033,.14);
 for(const fx of [530,830])drawGroundShadow((fx-627)*s,-18*s,130*s,17*s,.24);
 ctx.rotate(lean+(!state.reduced?state.x*.005:0));ctx.scale(s,s*stretch);ctx.translate(-627,-1165);ctx.drawImage(base,0,0);
 if(state.blink>0&&closed){
  const elapsedBlink=state.blinkDuration-state.blink,opacity=Math.min(1,elapsedBlink/65,state.blink/90);
  for(const e of eyes){ctx.save();eyeClip(e,1.17);ctx.globalAlpha=alpha*opacity;ctx.drawImage(closed,0,0,base.width,base.height);ctx.restore()}
 }else if(state.look&&(Math.abs(state.x)+Math.abs(state.y)>.05)){
  for(const e of eyes){ctx.save();eyeClip(e,.87);ctx.drawImage(base,state.x*3.5,state.y*2.2);ctx.restore()}
 }
 ctx.restore();
}
function render(){
 if(!base&&!window.PippoCanon?.ready)return;
 renderBall();const w=canvas.width,h=canvas.height,g=geometry();ctx.clearRect(0,0,w,h);ctx.save();ctx.scale(w/g.width,h/g.height);
 if(window.PippoCanon?.ready){window.PippoCanon.draw(ctx,g);canvas.dataset.action=state.motion?.kind||(state.pet>0?state.petKind:'idle')}
 else if(state.motion&&atlas){drawMotion(g);canvas.dataset.action=state.motion.kind}
 else{drawIdle(g);canvas.dataset.action=state.pet>0?state.petKind:'idle';canvas.dataset.pose='idle'}
 if(state.motion?.walk){ctx.save();ctx.globalAlpha=state.reduced?.3:.45;ctx.strokeStyle='#6d8460';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(state.motion.walk.to*g.width,g.bottom,16,5,0,0,Math.PI*2);ctx.stroke();ctx.restore()}
 if(state.petHeld&&state.pointer){ctx.save();ctx.strokeStyle='rgba(255,250,218,.85)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(state.pointer.lastX,state.pointer.lastY,12,0,Math.PI*2);ctx.stroke();ctx.restore()}
 ctx.restore();canvas.dataset.gesture=state.petHeld?'stroking':'none';canvas.dataset.facing=state.facing===1?'right':'left';canvas.dataset.position=state.actorX.toFixed(4);state.draws++;
}
function advanceMotion(dt){
 const m=state.motion;if(!m)return;
 if(m.walk){
  if(state.turn){state.turn.elapsed+=dt;if(state.turn.elapsed<state.turn.duration)return;dt=state.turn.elapsed-state.turn.duration;state.turn=null}
  const before=state.actorX,result=PippoInteraction.advance(m.walk,dt);state.actorX=result.x;state.walkDistance+=Math.abs(state.actorX-before)*geometry().width;
  if(result.done){state.sideRest=true;state.motion=null;message('Pippo chegou. Toque em outro lugar ou faça carinho.')}
 }else{m.elapsed+=dt;if(!m.persistent&&m.elapsed>=m.duration){state.motion=null;message('Pippo voltou ao repouso.')}}
}
function frame(t){
 const dt=Math.min(t-(state.last||t),50);state.last=t;
 if(!state.paused&&document.visibilityState==='visible'){
  state.time+=dt;state.musicPulse=Math.max(0,(state.musicPulse||0)-dt);state.musicReply=Math.max(0,(state.musicReply||0)-dt);advanceBall(dt);advanceMotion(dt);state.blink=Math.max(state.petHeld&&state.petKind==='head'?220:0,state.blink-dt);state.pet=Math.max(state.petHeld?state.petDuration*.45:0,state.pet-dt);state.x=PippoInteraction.follow(state.x,state.tx,dt);state.y=PippoInteraction.follow(state.y,state.ty,dt);
  if(state.expressionTime>0){state.expressionTime-=dt;if(state.expressionTime<=0)state.expression=null}
  window.PippoActivities?.tick(dt);
  if(state.time>=state.nextBlink&&state.pet===0&&!state.expression&&!state.motion&&!state.sideRest&&state.ballTime===null){setBlink(240);state.nextBlink=state.time+4700+Math.random()*2200}render();
 }
 requestAnimationFrame(frame);
}
function walkTo(target){
 if(!state.ready||!state.motionReady||state.paused)return;
 const g=geometry(),destination=PippoInteraction.clamp(target,g.min,g.max);
 if(state.motion?.walk&&Math.abs(state.motion.walk.to-destination)*g.width<3)return;
 const route=PippoInteraction.plan(state.actorX,destination,g,state.motion?.walk?.velocity);
 if(!route){state.motion=null;state.turn=null;message('Pippo já está desse lado. Experimente o outro lado do quintal.');render();return;}
 if(window.PippoCanon?.ready){
  const continuing=state.motion?.walk&&state.facing===route.direction;
  // The intended direction may differ from the view visible mid-turn.
  // Retargeting the same direction keeps that turn's progress; reversal starts
  // at its actual displayed view, never at the previous command's destination.
  if(!continuing){
   const from=state.turn?PippoInteraction.turnPose(state.turn):state.sideRest||state.motion?.walk?(state.facing===1?'right':'left'):'front';
   state.turn=PippoInteraction.planTurn(from,route.direction,state.reduced);
  }
 }
 state.sideRest=false;state.expression=null;state.petHeld=false;cancelBall();state.pet=0;state.blink=0;state.tx=state.ty=0;if(!state.motion?.walk)state.walkDistance=0;state.facing=route.direction;state.motion={kind:'walk',walk:route};
 message(route.direction===1?'Pippo vai para a direita.':'Pippo vai para a esquerda.');render();
}
function localPoint(e){const r=canvas.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top}}
function point(e){if(!state.look||state.paused)return;const p=localPoint(e),g=geometry();state.tx=PippoInteraction.clamp((p.x-g.cx)/(g.width/2),-1,1);state.ty=PippoInteraction.clamp((p.y-g.bottom+g.bodyHeight/2)/(g.height/2),-1,1)}
function endGesture(){
 const id=state.pointer?.id;state.pointer=null;state.petHeld=false;
 if(id!==undefined&&canvas.hasPointerCapture?.(id))canvas.releasePointerCapture(id);
}
canvas.addEventListener('pointerdown',e=>{
 if(state.paused||!state.ready||state.pointer||e.button>0)return;
 const p=localPoint(e),g=geometry(),region=window.PippoCanon?.ready?window.PippoCanon.hit(p.x,p.y,g):PippoInteraction.hit(p.x,p.y,g,state.facing);
 e.preventDefault();canvas.focus({preventScroll:true});canvas.setPointerCapture(e.pointerId);
 if(region==='head'||region==='belly'){pet(region,p.x<g.cx?-1:1);state.petHeld=true}
 else if(region==='ground'&&state.activity==='yard')walkTo(p.x/g.width);
 state.pointer={...p,lastX:p.x,lastY:p.y,id:e.pointerId,region,lastTarget:p.x};point(e);render();
});
canvas.addEventListener('pointermove',e=>{
 point(e);const down=state.pointer;if(!down||down.id!==e.pointerId||state.paused)return;
 const p=localPoint(e);down.lastX=p.x;down.lastY=p.y;
 if(down.region==='head'||down.region==='belly'){
  state.petSide=PippoInteraction.clamp((p.x-geometry().cx)/Math.max(25,geometry().bodyHeight*.2),-1,1);render();
 }else if(state.activity==='yard'&&down.region==='ground'&&Math.abs(p.x-down.lastTarget)>18){down.lastTarget=p.x;walkTo(p.x/geometry().width)}
});
canvas.addEventListener('pointerup',e=>{
 const down=state.pointer;if(!down||down.id!==e.pointerId)return;
 if(!state.paused&&state.activity==='yard'&&down.region==='ground')walkTo(localPoint(e).x/geometry().width);
 endGesture();render();
});
canvas.addEventListener('pointercancel',()=>{endGesture();render()});canvas.addEventListener('lostpointercapture',()=>{endGesture();render()});
canvas.addEventListener('pointerleave',()=>{state.tx=state.ty=0});
document.addEventListener('keydown',e=>{
 const target=e.target,tag=target?.tagName;
 if(state.activity!=='yard'||$('comparison').open||target?.isContentEditable||['INPUT','TEXTAREA','SELECT'].includes(tag))return;
 if(e.key==='ArrowLeft'||e.key==='ArrowRight'){
  e.preventDefault();if(e.repeat)return;endGesture();walkTo(e.key==='ArrowLeft'?0:1);
 }else if((e.key===' '||e.key==='Enter')&&target===canvas){e.preventDefault();if(!e.repeat)pet('head')}
});
$('walk').onclick=()=>{endGesture();walkTo(0)};$('walkRight').onclick=()=>{endGesture();walkTo(1)};
for(const name of ['jump','crouch'])$(name).onclick=()=>startMotion(name);
$('blink').onclick=blink;$('pet').onclick=()=>{endGesture();pet('head')};$('belly').onclick=()=>{endGesture();pet('belly')};
$('look').onclick=()=>{state.look=!state.look;$('look').setAttribute('aria-pressed',state.look);state.tx=state.ty=0;message(state.look?'Pippo demonstra curiosidade ao seu toque.':'Toque no Pippo para fazer carinho, ou no chão para andar.')};
$('pause').onclick=()=>{endGesture();state.paused=!state.paused;window.PippoActivities?.suspend(state.paused);$('pause').textContent=state.paused?'Continuar':'Pausar';$('pause').setAttribute('aria-pressed',state.paused);message(state.paused?'Encontro pausado.':'Podemos continuar, com calma.');renderBall()};
$('reduced').onchange=e=>{state.reduced=e.target.checked;render()};
$('reference').onclick=()=>{endGesture();$('comparison').showModal();state.wasPaused=state.paused;state.paused=true;window.PippoActivities?.suspend(true)};$('close').onclick=()=>$('comparison').close();$('comparison').addEventListener('close',()=>{state.paused=state.wasPaused;window.PippoActivities?.suspend(state.paused);state.last=0});
 document.addEventListener('visibilitychange',()=>{endGesture();window.PippoActivities?.suspend(state.paused||document.visibilityState!=='visible');state.last=0;state.tx=state.ty=0});
new ResizeObserver(resize).observe(canvas);
window.pippoStudy={getState:()=>({...state}),blink,pet,
 setActivity(activity){endGesture();cancelBall();state.turn=null;state.sideRest=false;state.expression=null;state.motion=null;state.pet=0;state.blink=0;state.activity=activity;state.actorX=activity==='garden'?.35:.5;state.facing=1;state.tx=state.ty=0;resize()},
 setInstrument(instrument){state.musicInstrument=instrument;state.musicPulse=0;state.musicReply=0;render()},
 react(options){if(state.ready&&!state.paused){if(state.activity==='music'){state.musicPulse=200;state.musicReply=options?.automatic?420:0;render();return}state.sideRest=false;state.petKind='belly';state.petDuration=650;state.pet=650;setBlink(180);render()}},
 setReduced(value){state.reduced=value;$('reduced').checked=value;render()}
};
function startMotion(kind){
 if(!state.motionReady||state.paused)return;endGesture();state.turn=null;state.sideRest=false;state.expression=null;cancelBall();state.pet=0;state.blink=0;state.tx=state.ty=0;state.motion={kind,elapsed:0,persistent:['rest','sit'].includes(kind),duration:kind==='jump'?1400:kind==='crouch'?2000:kind==='rest'?7000:kind==='sit'?4500:2200};message({jump:'Pippo se prepara, pula e pousa.',crouch:'Pippo se abaixa e levanta.',sit:'Pippo sentou. Toque nele ou escolha outra brincadeira.',rest:'Pippo descansa sem pressa. Toque nele para acordar.',wave:'Pippo acena para você.',rise:'Pippo se levanta.',lookBack:'Pippo olha para trás.',observe:'Pippo observa a bola.',receive:'Pippo recebe a bola.',hold:'Pippo segura a bola.',return:'Pippo devolve a bola.',reach:'Pippo alcança a bola.',turnLeft:'Pippo vira à esquerda.',turnRight:'Pippo vira à direita.'}[kind]||'Pippo brinca.');render();
}
function motionFrame(m){
 if(m.walk)return PippoInteraction.walkFrame(state.walkDistance,geometry().bodyHeight,walkMeta?walkMeta.frames.length:4);
 const q=m.elapsed/m.duration;if(m.kind==='jump')return 4+(q<.22?0:q<.36?1:q<.70?2:3);return q<.12?8:q<.32?9:q<.65?10:q<.88?11:8;
}
function drawMotion(g){
 const m=state.motion,i=motionFrame(m),meta=m.walk&&walkMeta?walkMeta:atlasMeta,pool=m.walk&&walkMeta?walkSprites:sprites,b=meta.frames[i],sp=pool[i];canvas.dataset.pose=String(i);canvas.dataset.walkFrames=String(walkMeta?walkMeta.frames.length:4);
 const anchor=b.anchorX??b.w/2,s=g.bodyHeight/meta.standingHeight,mirror=m.walk?-state.facing:state.facing;
 let lift=0;if(m.kind==='jump'&&i===6&&!state.reduced){const q=(m.elapsed/m.duration-.36)/.34;lift=Math.sin(Math.PI*q)*g.height*.055}
 // Cached drawings, registered by the head and advanced by distance traveled.
 const air=m.kind==='jump'&&i===6;ctx.save();ctx.translate(g.cx,g.bottom);ctx.scale(mirror,1);
 drawGroundShadow(0,-2*s,b.w*s*(air?.7:.56),Math.max(5*s,b.h*s*.038),air?.075:.14);
 if(!air)for(const foot of sp.contacts)drawGroundShadow((foot.x-anchor)*s,-2*s,Math.max(12,foot.width*s*1.1),Math.max(3,7*s),.26);
 ctx.drawImage(sp.canvas,-anchor*s-sp.pad*s,-b.h*s-lift-sp.pad*s,sp.canvas.width*s,sp.canvas.height*s);ctx.restore();
}
for(const n of ['walk','walkRight','jump','crouch'])$(n).disabled=true;
function makeSprite(b,source=atlas){
 const c=document.createElement('canvas');c.width=b.sw;c.height=b.sh;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(source,b.sx,b.sy,b.sw,b.sh,0,0,b.sw,b.sh);
 const pixels=g.getImageData(0,0,c.width,c.height),prepared=prepareSpritePixels(pixels.data,c.width,c.height,b.seed,b),cropped=document.createElement('canvas');cropped.width=prepared.width;cropped.height=prepared.height;cropped.getContext('2d').putImageData(new ImageData(prepared.pixels,prepared.width,prepared.height),0,0);return {canvas:cropped,pad:prepared.pad,contacts:prepared.contacts};
}
function drawGroundShadow(x,y,width,height,opacity){
 ctx.save();ctx.translate(x,y);ctx.scale(Math.max(1,width/2),Math.max(1,height/2));const gradient=ctx.createRadialGradient(0,0,0,0,0,1);gradient.addColorStop(0,'rgba(92,65,32,'+opacity+')');gradient.addColorStop(.45,'rgba(92,65,32,'+(opacity*.5)+')');gradient.addColorStop(1,'rgba(92,65,32,0)');ctx.fillStyle=gradient;ctx.beginPath();ctx.arc(0,0,1,0,Math.PI*2);ctx.fill();ctx.restore();
}
function cancelBall(){state.ballTime=null;state.ballReacted=false;renderBall()}
$('ball').onclick=()=>{
 if(!state.ready||state.paused||state.ballTime!==null)return;
 endGesture();state.turn=null;state.sideRest=false;state.expression=null;state.motion=null;state.pet=0;state.blink=0;state.ballReacted=false;state.ballTime=0;state.facing=1;message('A bola azul rola para perto do Pippo.');render();
};
function advanceBall(dt){
 if(state.ballTime===null)return;state.ballTime=Math.min(ballDuration,state.ballTime+dt);
 if(!state.ballReacted&&state.ballTime>=ballDuration/2){state.ballReacted=true;state.petKind='belly';state.petDuration=1100;state.pet=1100;setBlink(360);message('Pippo percebe a bola. Ela volta para você.')}
 if(state.ballTime>=ballDuration){state.ballTime=null;message('A bola voltou. Toque para brincar outra vez.')}
}
function renderBall(){
 const active=state.ballTime!==null,q=active?state.ballTime/ballDuration:0,smooth=t=>t*t*(3-2*t),reach=q<.30?smooth(q/.30):q<.64?1:1-smooth((q-.64)/.36),g=geometry();
 const diameter=g.bodyHeight*.25,wrapper=Math.max(72,diameter+14);$('ball').style.width=wrapper+'px';$('ball').style.height=wrapper+'px';$('ball').style.padding=(wrapper-diameter)/2+'px';const distance=Math.max(0,g.width*.93-wrapper/2-g.cx);const x=-distance*reach;
 $('ball').style.visibility=window.PippoCanon?.ready&&((active&&q>=.30&&q<.64)||['receive','hold'].includes(state.motion?.kind))?'hidden':'visible';$('ball').style.transform=`translateX(${x}px)`;$('ball').querySelector('.ball-art').style.transform=state.reduced?'none':`rotate(${x/36}rad)`;$('ball').dataset.phase=active?(q<.5?'outbound':'returning'):'ready';$('ball').setAttribute('aria-disabled',String(state.paused||active));
}
