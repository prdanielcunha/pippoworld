'use strict';
const PippoInteraction=(()=>{
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 function geometry(width,height,x=.5){
  // Leave a usable path on phone screens, beyond the character's touch area.
  const bodyHeight=Math.min(height*.66,width*.56);
  // Includes the widest jump and registered walking silhouette.
  const margin=Math.min(.45,(bodyHeight*289/334/2+14)/width);
  return {width,height,bodyHeight,scale:bodyHeight/1146,bottom:height*.87,min:margin,max:1-margin,cx:clamp(x,margin,1-margin)*width};
 }
 function plan(from,to,g){
  to=clamp(to,g.min,g.max);from=clamp(from,g.min,g.max);
  const distance=Math.abs(to-from)*g.width;if(distance<3)return null;
  return {from,to,elapsed:0,duration:Math.max(350,distance/(g.bodyHeight*.42)*1000+120),direction:to>from?1:-1};
 }
 function advance(walk,dt){
  walk.elapsed=Math.min(walk.duration,walk.elapsed+Math.max(0,dt));
  const q=walk.elapsed/walk.duration,a=Math.min(.25,120/walk.duration);
  // Brief acceleration/braking, then cruise; no long slow start on each command.
  const eased=q<a?q*q/(2*a*(1-a)):q>1-a?1-(1-q)**2/(2*a*(1-a)):(q-a/2)/(1-a);
  return {x:walk.from+(walk.to-walk.from)*eased,done:q>=1};
 }
 function hit(x,y,g,facing=1){
  const bx=627+(x-g.cx)/g.scale*facing,by=1165+(y-g.bottom)/g.scale;
  if(((bx-665)/310)**2+((by-330)/315)**2<=1)return 'head';
  if(((bx-635)/325)**2+((by-850)/260)**2<=1)return 'belly';
  return y>=g.height*.25?'ground':'empty';
 }
 function walkFrame(distance,height,count=8){
  // One full left/right stride per 0.52 body heights; avoids a rapid foot flicker.
  const stride=height*.52;
  return Math.floor(Math.max(0,distance)/stride*count)%count;
 }
 return {clamp,geometry,plan,advance,hit,walkFrame};
})();
if(typeof module!=='undefined')module.exports=PippoInteraction;
