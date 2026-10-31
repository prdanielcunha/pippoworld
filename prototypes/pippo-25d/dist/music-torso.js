'use strict';
// One painted torso includes both shoulders, whole arms, wrists and hands.
// Smooth deformation acts on that connected surface; no detached hand sprites.
const PippoMusicTorso=(()=>{
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),smooth=t=>t*t*(3-2*t);
 function influence(p,cx){const d=Math.hypot(p.x-cx,p.y-493),radial=1-smooth(clamp((d-53)/65,0,1));return radial*smooth(clamp((p.y-400)/55,0,1))*smooth(clamp((560-p.y)/33,0,1))}
 function warp(p,levels){return {x:p.x,y:p.y-24*(levels[0]/8*influence(p,85)+levels[1]/8*influence(p,255))}}
 const contacts={open:[{x:85,y:518},{x:255,y:518}],grip:[{x:109,y:481},{x:243,y:481}]};
 const shoulder=[{x:80,y:382},{x:260,y:382}];
 function triangle(ctx,img,src,dst){
  const [a,b,c]=src,[A,B,C]=dst,det=(b.x-a.x)*(c.y-a.y)-(c.x-a.x)*(b.y-a.y);if(!det)return;
  const aa=((B.x-A.x)*(c.y-a.y)-(C.x-A.x)*(b.y-a.y))/det,bb=((B.y-A.y)*(c.y-a.y)-(C.y-A.y)*(b.y-a.y))/det;
  const cc=((C.x-A.x)*(b.x-a.x)-(B.x-A.x)*(c.x-a.x))/det,dd=((C.y-A.y)*(b.x-a.x)-(B.y-A.y)*(c.x-a.x))/det;
  ctx.save();ctx.beginPath();const mid={x:(A.x+B.x+C.x)/3,y:(A.y+B.y+C.y)/3};
  for(let i=0;i<3;i++){const p=dst[i],d=Math.hypot(p.x-mid.x,p.y-mid.y)||1,x=p.x+(p.x-mid.x)/d*.22,y=p.y+(p.y-mid.y)/d*.22;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}
  ctx.closePath();ctx.clip();ctx.transform(aa,bb,cc,dd,A.x-aa*a.x-cc*a.y,A.y-bb*a.x-dd*a.y);ctx.drawImage(img,0,0);ctx.restore();
 }
 function create(atlas,frontAtlas){
  const art={},frontArt={},cache=new Map();
  for(const [style,row] of [['open',0],['grip',1]]){
   const c=document.createElement('canvas');c.width=340;c.height=230;const t=c.getContext('2d');
   // Prepared RGBA layers already include their source-space alpha masks.
   t.drawImage(atlas,row*340,0,340,230,0,0,340,230);art[style]=c;
   const f=document.createElement('canvas');f.width=340;f.height=230;
   f.getContext('2d').drawImage(frontAtlas,row*340,0,340,230,0,0,340,230);frontArt[style]=f;
  }
  function pose(style,levels){
   const key=style+':'+levels.join(',');if(cache.has(key)){const value=cache.get(key);cache.delete(key);cache.set(key,value);return value}
   const c=document.createElement('canvas'),f=document.createElement('canvas');c.width=f.width=340;c.height=f.height=230;const ctx=c.getContext('2d'),fx=f.getContext('2d');
   if(!levels[0]&&!levels[1]){ctx.drawImage(art[style],0,0);fx.drawImage(frontArt[style],0,0)}
   else{
    const cols=12,rows=14;
    for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
     const points=[{x:x*340/cols,y:y*230/rows},{x:(x+1)*340/cols,y:y*230/rows},{x:(x+1)*340/cols,y:(y+1)*230/rows},{x:x*340/cols,y:(y+1)*230/rows}];
     const out=points.map(p=>{const q=warp({x:p.x,y:p.y+330},levels);return {x:q.x,y:q.y-330}});
     triangle(ctx,art[style],[points[0],points[1],points[2]],[out[0],out[1],out[2]]);triangle(ctx,art[style],[points[0],points[2],points[3]],[out[0],out[2],out[3]]);
     triangle(fx,frontArt[style],[points[0],points[1],points[2]],[out[0],out[1],out[2]]);triangle(fx,frontArt[style],[points[0],points[2],points[3]],[out[0],out[2],out[3]]);
    }
   }
   const result={canvas:c,front:f,levels,style,contacts:contacts[style].map(p=>warp(p,levels)),shoulders:shoulder.map(p=>warp(p,levels))};cache.set(key,result);if(cache.size>24)cache.delete(cache.keys().next().value);return result;
  }
  // This is the SAME torso surface, drawn again only where hands pass in front
  // of the instrument. It never has a separate position, rotation or skeleton.
  function front(ctx,pose,cx,cy,s,bob){
   ctx.save();ctx.translate(cx-170*s,cy-650*s+bob);ctx.scale(s,s);ctx.beginPath();
   ctx.drawImage(pose.front,0,330);ctx.restore();
  }
  return {pose,front,cacheSize:()=>cache.size};
 }
 return {create,warp,contacts,shoulder};
})();
if(typeof module!=='undefined')module.exports=PippoMusicTorso;
