'use strict';
// One painted torso includes both shoulders, whole arms, wrists and hands.
// Smooth deformation acts on that connected surface; no detached hand sprites.
const PippoMusicTorso=(()=>{
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),smooth=t=>t*t*(3-2*t);
 function influence(p,cx){const d=Math.hypot(p.x-cx,p.y-493),radial=1-smooth(clamp((d-53)/65,0,1));return radial*smooth(clamp((p.y-400)/55,0,1))*smooth(clamp((535-p.y)/28,0,1))}
 function warp(p,levels){return {x:p.x,y:p.y-24*(levels[0]/8*influence(p,85)+levels[1]/8*influence(p,255))}}
 const contacts={open:[{x:85,y:518},{x:255,y:518}],grip:[{x:94,y:466},{x:259,y:466}]};
 const shoulder=[{x:80,y:382},{x:260,y:382}];
 function triangle(ctx,img,src,dst){
  const [a,b,c]=src,[A,B,C]=dst,det=(b.x-a.x)*(c.y-a.y)-(c.x-a.x)*(b.y-a.y);if(!det)return;
  const aa=((B.x-A.x)*(c.y-a.y)-(C.x-A.x)*(b.y-a.y))/det,bb=((B.y-A.y)*(c.y-a.y)-(C.y-A.y)*(b.y-a.y))/det;
  const cc=((C.x-A.x)*(b.x-a.x)-(B.x-A.x)*(c.x-a.x))/det,dd=((C.y-A.y)*(b.x-a.x)-(B.y-A.y)*(c.x-a.x))/det;
  ctx.save();ctx.beginPath();const mid={x:(A.x+B.x+C.x)/3,y:(A.y+B.y+C.y)/3};
  for(let i=0;i<3;i++){const p=dst[i],d=Math.hypot(p.x-mid.x,p.y-mid.y)||1,x=p.x+(p.x-mid.x)/d*.22,y=p.y+(p.y-mid.y)/d*.22;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}
  ctx.closePath();ctx.clip();ctx.transform(aa,bb,cc,dd,A.x-aa*a.x-cc*a.y,A.y-bb*a.x-dd*a.y);ctx.drawImage(img,0,0);ctx.restore();
 }
 function create(bodyAtlas,frontAtlas,meta){
  const frontArt={},fullArt={},cache=new Map();
  for(const [style,row] of [['open',0],['grip',1]]){
   const f=document.createElement('canvas');f.width=340;f.height=680;
   f.getContext('2d').drawImage(frontAtlas,row*340,0,340,680,0,0,340,680);frontArt[style]=f;
  }
  // Assemble each expression once. The animated surface includes the original
  // continuous belly, head and lower body; there is no live torso/base overlap.
  function complete(style,expression,drum){
   const key=style+expression+drum;if(fullArt[key])return fullArt[key];
   const c=document.createElement('canvas');c.width=340;c.height=680;
   const ctx=c.getContext('2d'),rect=meta.frames[style][drum?'drumFrames':'bodyFrames'][expression];
   ctx.drawImage(bodyAtlas,...rect,0,0,340,680);
   return fullArt[key]=c;
  }
  function pose(style,levels,expression=0,drum=false){
   const key=style+':'+expression+':'+drum+':'+levels.join(',');if(cache.has(key)){const value=cache.get(key);cache.delete(key);cache.set(key,value);return value}
   const c=document.createElement('canvas'),f=document.createElement('canvas');c.width=f.width=340;c.height=f.height=680;const ctx=c.getContext('2d'),fx=f.getContext('2d'),whole=complete(style,expression,drum);
   const foreground=document.createElement('canvas');foreground.width=340;foreground.height=680;foreground.getContext('2d').drawImage(frontArt[style],0,0);
   if(!levels[0]&&!levels[1]){ctx.drawImage(whole,0,0);fx.drawImage(foreground,0,0)}
   else{
    // Head and lower body are copied from the same complete figure. The
    // deformation is exactly zero at both band boundaries; no torso layer
    // is translated or cropped against a fixed lower belly.
    ctx.drawImage(whole,0,0);ctx.clearRect(0,365,340,195);
    const cols=12,rows=14;
    for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
     const points=[{x:x*340/cols,y:365+y*195/rows},{x:(x+1)*340/cols,y:365+y*195/rows},{x:(x+1)*340/cols,y:365+(y+1)*195/rows},{x:x*340/cols,y:365+(y+1)*195/rows}];
     const out=points.map(p=>warp(p,levels));
     triangle(ctx,whole,[points[0],points[1],points[2]],[out[0],out[1],out[2]]);triangle(ctx,whole,[points[0],points[2],points[3]],[out[0],out[2],out[3]]);
     triangle(fx,foreground,[points[0],points[1],points[2]],[out[0],out[1],out[2]]);triangle(fx,foreground,[points[0],points[2],points[3]],[out[0],out[2],out[3]]);
    }
   }
   const result={canvas:c,front:f,levels,style,contacts:contacts[style].map(p=>warp(p,levels)),shoulders:shoulder.map(p=>warp(p,levels))};cache.set(key,result);if(cache.size>24)cache.delete(cache.keys().next().value);return result;
  }
  // This is the SAME torso surface, drawn again only where hands pass in front
  // of the instrument. It never has a separate position, rotation or skeleton.
  function front(ctx,pose,cx,cy,s,bob){
   ctx.save();ctx.translate(cx-170*s,cy-650*s+bob);ctx.scale(s,s);ctx.beginPath();
   ctx.drawImage(pose.front,0,0);ctx.restore();
  }
  return {pose,front,cacheSize:()=>cache.size};
 }
 return {create,warp,contacts,shoulder};
})();
if(typeof module!=='undefined')module.exports=PippoMusicTorso;
