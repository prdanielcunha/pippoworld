'use strict';
// Approved source images are copied byte-for-byte. Only masks and placement
// are computed: no regenerated face, detached legs or RGB repainting.
(()=>{
 const cache=new Map(),images={};let meta,renderedHit;
 const unit={movement:302,contact:296,views:323,expressions:323};
 const names=['neutral','happy','curious','surprised','laugh','affection','wink','sleepy','playful','focused','listening','calm'];
 const api=window.PippoCanon={ready:false,names,meta:()=>meta,hit:(x,y,g)=>PippoInteraction.hitRendered(x,y,g,renderedHit)};
 const alphaOf=(g,w,h)=>{const pixels=g.getImageData(0,0,w,h).data;return Uint8Array.from({length:w*h},(_,i)=>pixels[i*4+3])};
 function load(src){return new Promise((resolve,reject)=>{const i=new Image;i.onload=()=>resolve(i);i.onerror=reject;i.src=src})}
 function sprite(name){
  if(cache.has(name))return cache.get(name);const p=meta.poses[name],c=document.createElement('canvas');c.width=p.w+4;c.height=p.h+4;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(images[p.sheet],p.sx,p.sy,p.w,p.h,2,2,p.w,p.h);
  const frame=g.getImageData(0,0,c.width,c.height);frame.data.set(prepareReferencePixels(frame.data,c.width,c.height,p.runs,{neckFade:p.neck ? p.h-p.neck.blendStart : 0,sourceHeight:p.h}));
  g.putImageData(frame,0,0);cache.set(name,{canvas:c,p,alpha:Uint8Array.from({length:c.width*c.height},(_,i)=>frame.data[i*4+3])});return cache.get(name);
 }
 function drawPose(ctx,name,g,{mirror=false,lift=0,rotate=0,shadow=true,stretch=1}={}){
  const {canvas:c,p,alpha}=sprite(name),s=g.bodyHeight/unit[p.sheet],anchor=name==='rest'||name==='sit'?p.w/2:p.anchor;const left=(mirror?p.w-anchor:anchor)*s,right=(mirror?anchor:p.w-anchor)*s,cx=Math.max(left+4,Math.min(g.width-right-4,g.cx));ctx.save();ctx.translate(cx,g.bottom-lift);if(mirror)ctx.scale(-1,1);
  if(shadow){drawGroundShadow(0,lift,g.bodyHeight*.48,g.bodyHeight*.03,lift?.08:.14);if(!lift)for(const foot of p.contacts)drawGroundShadow((foot.x-anchor)*s,0,Math.max(10,foot.width*s),Math.max(3,g.bodyHeight*.012),.2)}
  ctx.rotate(rotate);ctx.scale(1,stretch);renderedHit={alpha,width:c.width,height:c.height,cx,cy:g.bottom-lift,mirror,rotate,scale:s,stretch,anchorX:anchor+2,anchorY:p.h+2,headBottom:2+p.h*.60,headRegion:name==='rest'?{cx:p.anchor+2,cy:p.h*.48+2,rx:p.h*.5,ry:p.h*.5}:null};ctx.drawImage(c,(-anchor-2)*s,(-p.h-2)*s,c.width*s,c.height*s);ctx.restore();return p;
 }
 function expressionSprite(expression){
  const key='assembled_'+expression;if(cache.has(key))return cache.get(key);
  const body=sprite('body_front'),head=sprite('face_'+expression),b=body.p,p=head.p;
  const c=document.createElement('canvas');c.width=400;c.height=400;const g=c.getContext('2d'),anchor=200,bottom=390;
  const bx=anchor-b.anchor-2,by=bottom-b.h-2;
  g.drawImage(body.canvas,bx,by);
  const layer=document.createElement('canvas');layer.width=c.width;layer.height=c.height;const h=layer.getContext('2d');
  const scale=unit.views*.56/p.neck.y,joinX=anchor+b.join.x-b.anchor,joinY=bottom+b.join.y-b.h;
  h.drawImage(head.canvas,joinX-(p.neck.x+2)*scale,joinY-(p.neck.y+2)*scale,head.canvas.width*scale,head.canvas.height*scale);
  // Below the measured neck, the new collar may cover only the real torso.
  const collar=h.getImageData(0,0,c.width,c.height),torso=g.getImageData(0,0,c.width,c.height);
  for(let y=Math.ceil(joinY);y<c.height;y++)for(let x=0;x<c.width;x++){const i=(y*c.width+x)*4;collar.data[i+3]=Math.round(collar.data[i+3]*torso.data[i+3]/255)}
  h.putImageData(collar,0,0);g.drawImage(layer,0,0);
  const result={canvas:c,anchor,bottom,alpha:alphaOf(g,c.width,c.height)};cache.set(key,result);return result;
 }
 api.draw=(ctx,g)=>{
  const st=state,m=st.motion;let pose='front',mirror=false,lift=0;
  if(st.turn&&m?.walk)pose=PippoInteraction.turnPose(st.turn);
  else if(m?.walk){pose='walk'+PippoInteraction.walkFrame(st.walkDistance,g.bodyHeight,4);mirror=st.facing===1}
  else if(m?.kind==='jump'){const q=m.elapsed/m.duration;pose=q<.22?'jump0':q<.34?'jump1':q<.73?'jump2':'jump3';if(!st.reduced&&q>=.34&&q<.73)lift=Math.sin(Math.PI*(q-.34)/.39)*g.bodyHeight*.18}
  else if(m?.kind==='crouch'){const q=m.elapsed/m.duration;pose=q<.12?'stand':q<.3?'down':q<.72?'crouch':q<.9?'down':'up'}
  else if(m?.kind==='sit')pose='sit';else if(m?.kind==='rest')pose='rest';else if(m?.kind==='wave')pose='wave';else if(m?.kind==='rise')pose='rise';
  else if(m&&['lookBack','observe','receive','hold','return','reach','turnLeft','turnRight'].includes(m.kind))pose=m.kind;
  else if(st.ballTime!==null){const q=st.ballTime/ballDuration;pose=q<.30?'observe':q<.46?'receive':q<.64?'hold':q<.86?'return':'front'}
  else if(st.sideRest&&st.pet<=0&&!st.expression)pose=st.facing===1?'right':'left';
  const affection=st.pet>0,face=!m&&st.ballTime===null&&(affection||st.expression||st.blink>0||(st.look&&Math.abs(st.x)>.12));
  const elapsed=st.petDuration-st.pet,envelope=affection?Math.sin(Math.PI*elapsed/st.petDuration):0;
  const breathing=st.reduced||m?.walk||lift||st.ballTime!==null?1:1+Math.sin(st.time/(m?.kind==='rest'?1050:900))*(m?.kind==='rest'?.004:.0025);
  const lean=st.reduced?0:affection?(st.petKind==='head'?.014*st.petSide:Math.sin(st.time/240)*.009)*envelope:0;
  if(face){
   const expression=affection?(st.petKind==='head'?'affection':'laugh'):st.blink>0?'affection':st.expression||(st.look?(st.x>0?'listening':'curious'):'neutral');
   const assembled=expressionSprite(expression),s=g.bodyHeight/unit.views;
   // The neck and upper chest are blended once into the complete body, with
   // the body's silhouette protecting the collar. Animate this single surface.
   ctx.save();ctx.translate(g.cx,g.bottom);ctx.rotate(lean);
   drawGroundShadow(0,0,g.bodyHeight*.48,g.bodyHeight*.03,.14);
   ctx.scale(1,breathing);renderedHit={alpha:assembled.alpha,width:assembled.canvas.width,height:assembled.canvas.height,cx:g.cx,cy:g.bottom,mirror:false,rotate:lean,scale:s,stretch:breathing,anchorX:assembled.anchor,anchorY:assembled.bottom,headBottom:assembled.bottom-unit.views*.4};
   ctx.drawImage(assembled.canvas,-assembled.anchor*s,-assembled.bottom*s,assembled.canvas.width*s,assembled.canvas.height*s);
   ctx.restore();pose='face_'+expression;
  }else drawPose(ctx,pose,g,{mirror,lift,rotate:lean,stretch:breathing});
  canvas.dataset.artSource='approved-original';canvas.dataset.pose=pose;canvas.dataset.walkFrames='4';canvas.dataset.gait='approved-poses';
 };
 api.loading=fetch('assets/canon/poses.json?v=continuous-neck-7',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('reference metadata');return r.json()}).then(async data=>{
  meta=data;await Promise.all(Object.entries(data.provenance).map(async([sheet,p])=>{images[sheet]=await load('assets/canon/'+p.file)}));
  // Warm the first and the profile poses; other crops are cached when first used.
  for(const name of ['front','quarterLeft','left','quarterRight','right','walk0','walk1','walk2','walk3'])sprite(name);
  canvas.dataset.artMask=meta.maskRevision;api.ready=true;state.ready=true;state.motionReady=true;for(const n of ['walk','walkRight','jump','crouch'])$(n).disabled=false;$('ball').disabled=false;$('loading')?.remove();resize();requestAnimationFrame(frame);
 }).catch(()=>{const loading=$('loading');if(loading)loading.textContent='Não foi possível carregar os desenhos originais. Recarregue para tentar novamente.'});
})();
