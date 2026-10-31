'use strict';
// One painted torso includes both shoulders, whole arms, wrists and hands.
// Smooth deformation acts on that connected surface; no detached hand sprites.
const PippoMusicTorso=(()=>{
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),smooth=t=>t*t*(3-2*t);
 const contacts={open:[{x:85,y:518},{x:255,y:518}],grip:[{x:94,y:466},{x:259,y:466}],shaker:[{x:85,y:518},{x:290,y:434}]};
 const shoulder=[{x:80,y:382},{x:260,y:382}];
 const wrists={open:[{x:62,y:455},{x:285,y:455}],grip:[{x:66,y:438},{x:286,y:438}],shaker:[{x:62,y:455},{x:270,y:410}]};
 function support(p,side,style){
  const ramp=smooth(clamp((p.y-404)/32,0,1));
  return style==='shaker'&&side===1?Math.max(smooth(clamp((p.y-390)/20,0,1)),smooth(clamp((p.x-261)/11,0,1)),smooth(clamp((Math.hypot(p.x-260,p.y-382)-10)/60,0,1))):ramp;
 }
 function rotation(level,side){return (side?1:-1)*level/8*.42}
 function warp(p,levels,style='grip'){
  const side=p.x<170?0:1,c=wrists[style][side],a=rotation(levels[side],side),w=support(p,side,style),dx=p.x-c.x,dy=p.y-c.y;
  return {x:p.x+(Math.cos(a)*dx-Math.sin(a)*dy-dx)*w,y:p.y+(Math.sin(a)*dx+Math.cos(a)*dy-dy)*w};
 }
 function triangle(ctx,img,src,dst){
  const [a,b,c]=src,[A,B,C]=dst,det=(b.x-a.x)*(c.y-a.y)-(c.x-a.x)*(b.y-a.y);if(!det)return;
  const aa=((B.x-A.x)*(c.y-a.y)-(C.x-A.x)*(b.y-a.y))/det,bb=((B.y-A.y)*(c.y-a.y)-(C.y-A.y)*(b.y-a.y))/det;
  const cc=((C.x-A.x)*(b.x-a.x)-(B.x-A.x)*(c.x-a.x))/det,dd=((C.y-A.y)*(b.x-a.x)-(B.y-A.y)*(c.x-a.x))/det;
  ctx.save();ctx.beginPath();const mid={x:(A.x+B.x+C.x)/3,y:(A.y+B.y+C.y)/3};
  for(let i=0;i<3;i++){const p=dst[i],d=Math.hypot(p.x-mid.x,p.y-mid.y)||1,x=p.x+(p.x-mid.x)/d*.22,y=p.y+(p.y-mid.y)/d*.22;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}
  ctx.closePath();ctx.clip();ctx.transform(aa,bb,cc,dd,A.x-aa*a.x-cc*a.y,A.y-bb*a.x-dd*a.y);ctx.drawImage(img,0,0);ctx.restore();
 }
 function create(bodyAtlas,armAtlas,frontAtlas,meta){
  const art={},frontArt={},fullArt={},cache=new Map();
  for(const [row,style] of meta.styles.entries()){
   for(const [source,target] of [[armAtlas,art],[frontAtlas,frontArt]]){
    const c=document.createElement('canvas');c.width=340;c.height=680;
    c.getContext('2d').drawImage(source,row*340,0,340,680,0,0,340,680);target[style]=c;
   }
  }
  function complete(expression,drum){
   const key=expression+':'+drum;if(fullArt[key])return fullArt[key];
   const c=document.createElement('canvas');c.width=340;c.height=680;
   c.getContext('2d').drawImage(bodyAtlas,...meta.frames[drum?'drumFrames':'bodyFrames'][expression],0,0,340,680);
   return fullArt[key]=c;
  }
  function pose(style,levels,expression=0,drum=false){
   const key=style+':'+levels.join(',');let result=cache.get(key);
   if(result){cache.delete(key);cache.set(key,result);return {...result,body:complete(expression,drum)}}
   const c=document.createElement('canvas'),f=document.createElement('canvas');c.width=f.width=460;c.height=f.height=680;const ctx=c.getContext('2d'),fx=f.getContext('2d');ctx.translate(60,0);fx.translate(60,0);
   if(!levels[0]&&!levels[1]){ctx.drawImage(art[style],0,0);fx.drawImage(frontArt[style],0,0)}
   else{
    // ONLY alpha-selected connected arms are deformed. The body is a
    // separate immutable original surface and never enters this mesh.
    for(const [x,y] of meta.tiles[style]){
     const points=[{x:x*17,y:y*17},{x:(x+1)*17,y:y*17},{x:(x+1)*17,y:(y+1)*17},{x:x*17,y:(y+1)*17}];
     const out=points.map(p=>warp(p,levels,style));
     for(const ids of [[0,1,2],[0,2,3]]){
      triangle(ctx,art[style],ids.map(i=>points[i]),ids.map(i=>out[i]));
      triangle(fx,frontArt[style],ids.map(i=>points[i]),ids.map(i=>out[i]));
     }
    }
   }
   result={canvas:c,front:f,levels,style,contacts:contacts[style].map(p=>warp(p,levels,style)),rotations:levels.map(rotation),shoulders:shoulder.map(p=>({...p}))};
   cache.set(key,result);if(cache.size>24)cache.delete(cache.keys().next().value);
   return {...result,body:complete(expression,drum)};
  }
  function front(ctx,pose,cx,cy,s,bob=0){
   ctx.save();ctx.translate(cx-170*s,cy-650*s+bob);ctx.scale(s,s);ctx.drawImage(pose.front,-60,0);ctx.restore();
  }
  return {pose,front,cacheSize:()=>cache.size};
 }
 return {create,warp,contacts,shoulder,wrists,support,rotation};
})();
if(typeof module!=='undefined')module.exports=PippoMusicTorso;
