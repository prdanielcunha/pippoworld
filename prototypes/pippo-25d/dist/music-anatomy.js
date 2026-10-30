'use strict';
// Proportional musical anatomy: fixed little hands, bounded reach for tools,
// and a kick pedal beside the bass drum connected to Pippo's sitting leg.
const PippoMusicAnatomy=(()=>{
 const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));
 function pawRadius(scale){return clamp(scale*19,7,17)}
 function reach(from,desired,maximum){
  const dx=desired.x-from.x,dy=desired.y-from.y,d=Math.hypot(dx,dy);
  if(!d||d<=maximum)return {x:desired.x,y:desired.y};
  return {x:from.x+dx*maximum/d,y:from.y+dy*maximum/d};
 }
 function pedal(kick,scene,cx,cy,s,press=0){
  const x=clamp(kick.right-scene.left+9*s,17*s,scene.width-22*s);
  const y=clamp(kick.bottom-scene.top+3*s,scene.height*.56,scene.height-16*s);
  const motion=clamp(press,0,1);
  return {x,y,press:motion,hip:{x:cx+55*s,y:cy-111*s},
   heel:{x:x-7*s,y:y-(18-4*motion)*s},
   toe:{x:x+13*s,y:y-(12-4*motion)*s},
   beater:{x:kick.right-scene.left-12*s,y:kick.top-scene.top+kick.height*.63}};
 }
 return {clamp,pawRadius,reach,pedal};
})();
if(typeof module!=='undefined')module.exports=PippoMusicAnatomy;
