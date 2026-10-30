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
 // Rigid little hand and a short wrist. Far keys do not lengthen the limb.
 function compact(shoulder,desired,scale){
  const maximum=112*scale,bounded={x:clamp(desired.x,shoulder.x-30*scale,shoulder.x+30*scale),y:clamp(desired.y,shoulder.y+45*scale,shoulder.y+112*scale)},contact=reach(shoulder,bounded,maximum);
  return {shoulder,contact,maximum,reachable:Math.hypot(contact.x-desired.x,contact.y-desired.y)<1};
 }
 function pedal(kick,scene,cx,cy,s,press=0){
  // Register under the original painted right foot, not the front drum head.
  const motion=clamp(press,0,1),x=cx+64*s,y=cy+5*s;
  return {x,y,press:motion,hip:{x:cx+64*s,y:cy-103*s},
   heel:{x:x-12*s,y:y-16*s},toe:{x:x+10*s,y:y-(9-4*motion)*s},
   beater:{x:kick.right-scene.left+2*s,y:cy-46*s}};
 }
 return {clamp,pawRadius,reach,compact,pedal};
})();
if(typeof module!=='undefined')module.exports=PippoMusicAnatomy;
