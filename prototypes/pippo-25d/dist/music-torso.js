'use strict';
// Complete clean limbs. Upper-arm caps stay fixed; only a feathered wrist
// collar and its attached hand/tool turn. No pose quantization or triangle mesh.
const PippoMusicTorso=(()=>{
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),smooth=t=>t*t*(3-2*t);
 const contacts={open:[{x:85,y:518},{x:255,y:518}],grip:[{x:114,y:470},{x:232,y:470}],shaker:[{x:85,y:518},{x:290,y:434}]};
 const shoulder=[{x:80,y:382},{x:260,y:382}];
 const wrists={open:[{x:62,y:455},{x:285,y:455}],grip:[{x:66,y:438},{x:286,y:438}],shaker:[{x:62,y:455},{x:281,y:420}]};
 function support(p,side,style){const along=smooth(clamp((p.y-395)/60,0,1));return style==='shaker'&&side===1?Math.max(along,smooth(clamp((p.x-260)/17,0,1))):along}
 function rotation(level,side,style='grip'){return (side?1:-1)*level/8*(style==='open'?.20:style==='shaker'?.22:.28)}
 function warp(p,levels,style='grip'){const side=p.x<170?0:1,c=wrists[style][side],a=rotation(levels[side],side,style)*support(p,side,style),dx=p.x-c.x,dy=p.y-c.y;return {x:c.x+Math.cos(a)*dx-Math.sin(a)*dy,y:c.y+Math.sin(a)*dx+Math.cos(a)*dy}}
 function create(bodyAtlas,staticAtlas,movingAtlas,meta){
  const caps={},parts={},bodies=new Map(),whole={},meshes={};
  for(const [row,style] of (meta.revision<38?meta.styles.entries():[])){
   const c=document.createElement('canvas');c.width=340;c.height=680;c.getContext('2d').drawImage(staticAtlas,row*340,0,340,680,0,0,340,680);caps[style]=c;
   parts[style]=[0,1].map(side=>{const p=document.createElement('canvas');p.width=340;p.height=680;p.getContext('2d').drawImage(movingAtlas,(row*2+side)*340,0,340,680,0,0,340,680);return p});
  }
  for(const [row,style] of meta.styles.entries()){
   const c=document.createElement('canvas');c.width=340;c.height=680;
   const cc=c.getContext('2d');
   if(meta.revision>=38)cc.drawImage(staticAtlas,row*340,0,340,680,0,0,340,680);
   else {cc.drawImage(caps[style],0,0);for(const part of parts[style])cc.drawImage(part,0,0)}
   whole[style]=c;
   const cells=meta.tiles?.[style]||Array.from({length:43*22},(_,i)=>[(i%22)*16,Math.floor(i/22)*16,16,16]);
   meshes[style]=cells.flatMap(([x,y,w,h])=>{
    const a={x,y},b={x:x+w,y},c={x:x+w,y:y+h},d={x,y:y+h};return [[a,b,c],[a,c,d]];
   });
  }
  // A continuous skin field moves a single painted arm. No independently
  // rotated cap/collar can reveal a second forearm edge. UVs share vertices.
  function triangle(texture,source,dest){
   const [a,b,c]=source,[p,q,r]=dest,den=(b.x-a.x)*(c.y-a.y)-(c.x-a.x)*(b.y-a.y);
   const A=((q.x-p.x)*(c.y-a.y)-(r.x-p.x)*(b.y-a.y))/den;
   const C=((r.x-p.x)*(b.x-a.x)-(q.x-p.x)*(c.x-a.x))/den;
   const B=((q.y-p.y)*(c.y-a.y)-(r.y-p.y)*(b.y-a.y))/den;
   const D=((r.y-p.y)*(b.x-a.x)-(q.y-p.y)*(c.x-a.x))/den;
   const mid={x:(p.x+q.x+r.x)/3,y:(p.y+q.y+r.y)/3};
   ctx.save();ctx.beginPath();for(let i=0;i<3;i++){const v=dest[i],dx=v.x-mid.x,dy=v.y-mid.y,len=Math.hypot(dx,dy)||1;ctx[i?'lineTo':'moveTo'](v.x+dx/len*.35,v.y+dy/len*.35)}ctx.closePath();ctx.clip();
   ctx.transform(A,B,C,D,p.x-A*a.x-C*a.y,p.y-B*a.x-D*a.y);ctx.drawImage(texture,0,0);ctx.restore();
  }
  const output=document.createElement('canvas');output.width=460;output.height=680;const ctx=output.getContext('2d');
  function body(expression,drum){const key=expression+':'+drum;if(!bodies.has(key)){const c=document.createElement('canvas');c.width=340;c.height=680;c.getContext('2d').drawImage(bodyAtlas,...meta.frames[drum?'drumFrames':'bodyFrames'][expression],0,0,340,680);bodies.set(key,c)}return bodies.get(key)}
  function pose(style,levels,expression=0,drum=false){
   ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,460,680);ctx.translate(60,0);
   const rotations=levels.map((level,side)=>rotation(level,side,style));
   if(meta.revision<38){ctx.drawImage(caps[style],0,0);for(let side=0;side<2;side++){const w=wrists[style][side];ctx.save();ctx.translate(w.x,w.y);ctx.rotate(rotations[side]);ctx.drawImage(parts[style][side],-w.x,-w.y);ctx.restore()}}
   else if(levels.every(level=>Math.abs(level)<.0001))ctx.drawImage(whole[style],0,0);
   else for(const vertices of meshes[style])triangle(whole[style],vertices,vertices.map(p=>warp(p,levels,style)));
   return {backend:'canvas',canvas:output,front:output,body:body(expression,drum),levels,rotations,style,contacts:contacts[style].map(p=>warp(p,levels,style)),shoulders:shoulder.map(p=>({...p}))};
  }
  function front(ctx,pose,cx,cy,s,bob=0){ctx.save();ctx.translate(cx-170*s,cy-650*s);ctx.scale(s,s);ctx.drawImage(pose.canvas,-60,0);ctx.restore()}
  return {pose,front,cacheSize:()=>0};
 }
 return {create,warp,contacts,shoulder,wrists,support,rotation};
})();
if(typeof module!=='undefined')module.exports=PippoMusicTorso;
