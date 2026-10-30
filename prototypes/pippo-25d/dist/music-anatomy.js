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
 // Two fixed-length bones. Targets outside reach are clamped, never stretched.
 function arm(shoulder,contact,scale,side=0,palm={x:0,y:32}){
  const upper=72*scale,lower=72*scale;
  const desired={x:contact.x-palm.x*scale,y:contact.y-palm.y*scale};
  const wrist=reach(shoulder,desired,(upper+lower)*.97);
  let dx=wrist.x-shoulder.x,dy=wrist.y-shoulder.y,d=Math.hypot(dx,dy);
  if(d<Math.abs(upper-lower)+1e-4){d=Math.abs(upper-lower)+1e-4;dx=0;dy=d;wrist.x=shoulder.x;wrist.y=shoulder.y+d}
  const along=(upper*upper-lower*lower+d*d)/(2*d),height=Math.sqrt(Math.max(0,upper*upper-along*along)),sign=side?-1:1;
  const elbow={x:shoulder.x+dx*along/d-sign*dy*height/d,y:shoulder.y+dy*along/d+sign*dx*height/d};
  return {shoulder,elbow,wrist,contact:{x:wrist.x+palm.x*scale,y:wrist.y+palm.y*scale},upper,lower};
 }
 function pedal(kick,scene,cx,cy,s,press=0){
  // Register under the original painted right foot, not the front drum head.
  const motion=clamp(press,0,1),x=cx+64*s,y=cy+5*s;
  return {x,y,press:motion,hip:{x:cx+64*s,y:cy-103*s},
   heel:{x:x-12*s,y:y-16*s},toe:{x:x+10*s,y:y-(9-4*motion)*s},
   beater:{x:kick.right-scene.left+2*s,y:cy-46*s}};
 }
 return {clamp,pawRadius,reach,arm,pedal};
})();
if(typeof module!=='undefined')module.exports=PippoMusicAnatomy;
