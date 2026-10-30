'use strict';
// Original full figures + four approved-internally passing/up studies.
// A single whole figure is deformed per sample. Never crossfade double feet.
(()=>{
 const sources=[],frames=[],count=32;let loading=false,ready=false,quality=256,error=null,settle=null,failed=false;
 const points=[[[45,268],[140,269]],[[82,271],[169,251]],[[206,657],[300,710]],[[116,666],[410,697]],[[43,267],[146,267]],[[83,274],[164,253]],[[228,650],[290,710]],[[117,667],[407,699]]];
 function load(src){return new Promise((resolve,reject)=>{const i=new Image;i.onload=()=>resolve(i);i.onerror=reject;i.src=src})}
 function tri(ctx,img,a,b,c,A,B,C){const den=a.x*(b.y-c.y)+b.x*(c.y-a.y)+c.x*(a.y-b.y);if(Math.abs(den)<1e-5)return;const solve=k=>[(A[k]*(b.y-c.y)+B[k]*(c.y-a.y)+C[k]*(a.y-b.y))/den,(A[k]*(c.x-b.x)+B[k]*(a.x-c.x)+C[k]*(b.x-a.x))/den,(A[k]*(b.x*c.y-c.x*b.y)+B[k]*(c.x*a.y-a.x*c.y)+C[k]*(a.x*b.y-b.x*a.y))/den];const [xx,xy,xt]=solve('x'),[yx,yy,yt]=solve('y');ctx.save();ctx.beginPath();const mx=(A.x+B.x+C.x)/3,my=(A.y+B.y+C.y)/3;for(const [i,p] of [A,B,C].entries()){const dx=p.x-mx,dy=p.y-my,l=Math.hypot(dx,dy)||1,x=p.x+dx/l*.35,y=p.y+dy/l*.35;if(!i)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.closePath();ctx.clip();ctx.transform(xx,yx,xy,yy,xt,yt);ctx.drawImage(img,0,0);ctx.restore()}
 function sample(phase,customTarget=null){
  const index=Math.floor(phase*8)%8,src=sources[index],canvas=document.createElement('canvas');canvas.width=canvas.height=quality;const ctx=canvas.getContext('2d');ctx.scale(quality/400,quality/400);ctx.imageSmoothingEnabled=true;
  // Upper picture remains intact, including continuous head, cheek and neck.
  ctx.drawImage(src.canvas,0,0,400,305,0,0,400,305);
  const intended=customTarget||PippoGaitMotion.feet(phase,302).map(f=>({x:200+f.x,y:390+f.y-14})).sort((a,b)=>a.x-b.x),source=src.points;
  // Preserve ankle/webbing anatomy: a numeric gait must not over-stretch art.
  const strength=Math.min(1,...source.flatMap((p,i)=>[12/Math.max(1,Math.abs(intended[i].x-p.x)),8/Math.max(1,Math.abs(intended[i].y-p.y))]));const target=source.map((p,i)=>({x:p.x+(intended[i].x-p.x)*strength,y:p.y+(intended[i].y-p.y)*strength}));
  for(let y=305;y<400;y+=19)for(let x=60;x<360;x+=20){const a={x,y},b={x:x+20,y},c={x:x+20,y:Math.min(400,y+19)},d={x,y:Math.min(400,y+19)},map=p=>PippoGaitMotion.map(p.x,p.y,source,target);tri(ctx,src.canvas,a,b,c,map(a),map(b),map(c));tri(ctx,src.canvas,a,c,d,map(a),map(c),map(d))}
  const alpha=ctx.getImageData(0,0,quality,quality).data;return {canvas,alpha:Uint8Array.from({length:quality*quality},(_,i)=>alpha[i*4+3])};
 }
 async function prepare(){if(loading||ready||failed)return;loading=true;try{
  await window.PippoCanon.loading;const configs=await Promise.all(['passing-near','passing-far'].map(async n=>{const meta=await fetch('assets/gait-v23/'+n+'.json').then(r=>r.json()),image=await load('assets/gait-v23/'+meta.file);return {meta,image}}));
  quality=window.innerWidth>700?400:256;
  for(let i=0;i<8;i++){
   let image,p,scale,ox,oy,rect;
   if([0,1,4,5].includes(i)){const old=window.PippoCanon.walkSource(i<2?i:i-2);image=old.canvas;p=old.p;scale=1;ox=200-p.anchor-2;oy=390-p.h-2;rect=[0,0,image.width,image.height]}
   else {const cfg=configs[i<4?0:1];p=cfg.meta.frames[i%4-2];image=cfg.image;scale=302/p.unit;ox=200-p.anchor*scale;oy=390-p.h*scale;rect=[p.x,p.y,p.w,p.h]}
   const canvas=document.createElement('canvas');canvas.width=canvas.height=400;canvas.getContext('2d').drawImage(image,...rect,ox,oy,rect[2]*scale,rect[3]*scale);sources.push({canvas,points:points[i].map(([x,y])=>({x:ox+x*scale,y:oy+y*scale}))});
  }
  // Two samples per browser frame keeps preparation bounded and interruptible.
  for(let i=0;i<count;i++){frames.push(sample(i/count));if(i%2===1)await new Promise(resolve=>requestAnimationFrame(resolve))}
  ready=true;
 }catch(e){loading=false;failed=true;sources.length=0;frames.length=0;error=String(e.message)}}
 function paint(ctx,g,f,mirror,pose){const s=g.bodyHeight/302*400/quality;ctx.save();ctx.translate(g.cx,g.bottom);ctx.save();ctx.globalAlpha=.13;ctx.fillStyle='#74603e';ctx.beginPath();ctx.ellipse(0,0,g.bodyHeight*.29,g.bodyHeight*.025,0,0,Math.PI*2);ctx.fill();ctx.restore();if(mirror)ctx.scale(-1,1);ctx.drawImage(f.canvas,-quality*.5*s,-quality*.975*s,quality*s,quality*s);ctx.restore();return {pose,hit:{alpha:f.alpha,width:quality,height:quality,cx:g.cx,cy:g.bottom,mirror,rotate:0,scale:s,stretch:1,anchorX:quality*.5,anchorY:quality*.975,headBottom:quality*.57}}}
 const api=window.PippoGait={prepare,get ready(){return ready},advance(dt){if(settle)settle.age=Math.min(240,settle.age+dt)},beginSettle(distance,height,mirror){if(!ready)return;const phase=Math.floor(((distance/(height*.52))%1+1)%1*count)/count;settle={phase,age:0,mirror,frames:[]}},cancelSettle(){settle=null},drawSettle(ctx,g){if(!settle)return null;const i=Math.round(settle.age/240*12),t=i/12,q=t*t*(3-2*t);if(!settle.frames[i]){const from=PippoGaitMotion.feet(settle.phase,302).map(f=>({x:200+f.x,y:376+f.y})).sort((a,b)=>a.x-b.x),rest=[{x:200-302*.04,y:376},{x:200+302*.055,y:376-302*.012}],target=from.map((f,j)=>({x:f.x*(1-q)+rest[j].x*q,y:f.y*(1-q)+rest[j].y*q}));settle.frames[i]=sample(settle.phase,target)}return paint(ctx,g,settle.frames[i],settle.mirror,'gait_settle_'+i)},draw(ctx,g,st,distance=st.walkDistance,mirror=st.facing===1){if(!ready)return null;settle=null;const phase=((distance/(g.bodyHeight*.52))%1+1)%1,index=Math.floor(phase*count)%count,f=frames[index];return {...paint(ctx,g,f,mirror,'gait_mesh_'+index),phase,index}},inspect:()=>({error,ready,samples:frames.length,quality,bytes:frames.length*quality*quality*5})};
})();
