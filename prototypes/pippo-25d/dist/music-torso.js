'use strict';
// Complete clean limbs. Upper-arm caps stay fixed; only a feathered wrist
// collar and its attached hand/tool turn. No pose quantization or triangle mesh.
const PippoMusicTorso=(()=>{
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),smooth=t=>t*t*(3-2*t);
 const contacts={open:[{x:85,y:518},{x:255,y:518}],grip:[{x:114,y:470},{x:232,y:470}],shaker:[{x:85,y:518},{x:290,y:434}]};
 const shoulder=[{x:80,y:382},{x:260,y:382}];
 const wrists={open:[{x:62,y:455},{x:285,y:455}],grip:[{x:66,y:438},{x:286,y:438}],shaker:[{x:62,y:455},{x:281,y:420}]};
 function support(p,side,style){const a=smooth(clamp((p.y-(style==='open'?430:418))/24,0,1));return style==='shaker'&&side===1?Math.max(smooth(clamp((p.y-400)/22,0,1)),smooth(clamp((p.x-271)/9,0,1))):a}
 function rotation(level,side,style='grip'){return (side?1:-1)*level/8*(style==='open'?.20:style==='shaker'?.22:.28)}
 function warp(p,levels,style='grip'){const side=p.x<170?0:1,c=wrists[style][side],a=rotation(levels[side],side,style),dx=p.x-c.x,dy=p.y-c.y;return {x:c.x+Math.cos(a)*dx-Math.sin(a)*dy,y:c.y+Math.sin(a)*dx+Math.cos(a)*dy}}
 function create(bodyAtlas,staticAtlas,movingAtlas,meta){
  const caps={},parts={},bodies=new Map();
  for(const [row,style] of meta.styles.entries()){
   const c=document.createElement('canvas');c.width=340;c.height=680;c.getContext('2d').drawImage(staticAtlas,row*340,0,340,680,0,0,340,680);caps[style]=c;
   parts[style]=[0,1].map(side=>{const p=document.createElement('canvas');p.width=340;p.height=680;p.getContext('2d').drawImage(movingAtlas,(row*2+side)*340,0,340,680,0,0,340,680);return p});
  }
  const output=document.createElement('canvas');output.width=460;output.height=680;const ctx=output.getContext('2d');
  function body(expression,drum){const key=expression+':'+drum;if(!bodies.has(key)){const c=document.createElement('canvas');c.width=340;c.height=680;c.getContext('2d').drawImage(bodyAtlas,...meta.frames[drum?'drumFrames':'bodyFrames'][expression],0,0,340,680);bodies.set(key,c)}return bodies.get(key)}
  function pose(style,levels,expression=0,drum=false){
   ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,460,680);ctx.translate(60,0);ctx.drawImage(caps[style],0,0);
   const rotations=levels.map((level,side)=>rotation(level,side,style));
   for(let side=0;side<2;side++){const w=wrists[style][side];ctx.save();ctx.translate(w.x,w.y);ctx.rotate(rotations[side]);ctx.drawImage(parts[style][side],-w.x,-w.y);ctx.restore()}
   return {canvas:output,front:output,body:body(expression,drum),levels,rotations,style,contacts:contacts[style].map(p=>warp(p,levels,style)),shoulders:shoulder.map(p=>({...p}))};
  }
  function front(ctx,pose,cx,cy,s,bob=0){ctx.save();ctx.translate(cx-170*s,cy-650*s);ctx.scale(s,s);ctx.drawImage(pose.canvas,-60,0);ctx.restore()}
  return {pose,front,cacheSize:()=>0};
 }
 return {create,warp,contacts,shoulder,wrists,support,rotation};
})();
if(typeof module!=='undefined')module.exports=PippoMusicTorso;
