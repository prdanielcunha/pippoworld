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
 function plan(from,to,g,velocity=0){
  to=clamp(to,g.min,g.max);from=clamp(from,g.min,g.max);
  const distance=Math.abs(to-from)*g.width;if(distance<3)return null;
  const duration=Math.max(350,distance/(g.bodyHeight*.42)*1000+120),delta=to-from;
  // Preserve same-direction speed when a new touch changes the destination.
  // A nearby stop may require immediate braking; cap its entry slope so the
  // path stays monotonic instead of overshooting or walking backwards.
  const entrySlope=clamp(velocity*duration/delta,0,3);
  return {from,to,elapsed:0,duration,direction:delta>0?1:-1,entrySlope,velocity:entrySlope*delta/duration};
 }
 function advance(walk,dt){
  walk.elapsed=Math.min(walk.duration,walk.elapsed+Math.max(0,dt));
  const q=walk.elapsed/walk.duration,a=Math.min(.25,120/walk.duration);
  const entry=walk.entrySlope||0,cruise=(1-a*entry/2)/(1-a);
  // Integrate a continuous speed profile: inherited speed -> cruise -> stop.
  // Entry zero is exactly the previous short acceleration/braking curve.
  const eased=q<a?entry*q+(cruise-entry)*q*q/(2*a):q>1-a?1-cruise*(1-q)**2/(2*a):a*(entry+cruise)/2+(q-a)*cruise;
  const slope=q<a?entry+(cruise-entry)*q/a:q>1-a?cruise*(1-q)/a:cruise;
  walk.velocity=(walk.to-walk.from)*slope/walk.duration;
  return {x:walk.from+(walk.to-walk.from)*eased,done:q>=1};
 }
 function hit(x,y,g,facing=1){
  const bx=627+(x-g.cx)/g.scale*facing,by=1165+(y-g.bottom)/g.scale;
  if(((bx-665)/310)**2+((by-330)/315)**2<=1)return 'head';
  if(((bx-635)/325)**2+((by-850)/260)**2<=1)return 'belly';
  return y>=g.height*.25?'ground':'empty';
 }
 // Sample the silhouette actually drawn, with a small child-friendly edge
 // tolerance. Ground shadows and transparent paper never count as the duck.
 function hitRendered(x,y,g,view){
  if(!view)return hit(x,y,g);
  const dx=(x-view.cx)*(view.mirror?-1:1),dy=y-view.cy,c=Math.cos(view.rotate||0),s=Math.sin(view.rotate||0);
  const px=(dx*c+dy*s)/view.scale+view.anchorX,py=(-dx*s+dy*c)/(view.scale*(view.stretch||1))+view.anchorY;
  const radius=Math.min(10,Math.max(1,Math.ceil(6/view.scale)));
  let nearest=Infinity,foundY=py,foundX=px;
  for(let yy=Math.max(0,Math.floor(py-radius));yy<=Math.min(view.height-1,Math.ceil(py+radius));yy++)for(let xx=Math.max(0,Math.floor(px-radius));xx<=Math.min(view.width-1,Math.ceil(px+radius));xx++){
   const d=(xx-px)**2+(yy-py)**2;
   if(d<=radius*radius&&d<nearest&&view.alpha[yy*view.width+xx]>32){nearest=d;foundY=yy;foundX=xx}
  }
  if(Number.isFinite(nearest)){const h=view.headRegion;return (h?((foundX-h.cx)/h.rx)**2+((foundY-h.cy)/h.ry)**2<=1:foundY<view.headBottom)?'head':'belly'}
  return y>=g.height*.25?'ground':'empty';
 }
 function follow(value,target,dt){return target+(value-target)*Math.exp(-Math.max(0,dt)/200)}
 const turnViews=['left','quarterLeft','front','quarterRight','right'];
 function turnPose(turn){
  return turn.poses[Math.min(turn.poses.length-1,Math.floor(Math.max(0,turn.elapsed)/turn.duration*turn.poses.length))];
 }
 function planTurn(from,direction,reduced=false){
  const start=turnViews.indexOf(from),end=direction===1?4:0;
  if(start<0||start===end)return null;
  const step=end>start?1:-1,poses=[];
  // Begin with the view already on screen. One complete painted duck per frame.
  for(let i=start;i!==end+step;i+=step)poses.push(turnViews[i]);
  return {elapsed:0,duration:reduced?1:poses.length*80,poses};
 }
 function walkFrame(distance,height,count=8){
  // One full left/right stride per 0.52 body heights; avoids a rapid foot flicker.
  const stride=height*.52;
  return Math.floor(Math.max(0,distance)/stride*count)%count;
 }
 return {clamp,geometry,plan,advance,hit,hitRendered,follow,walkFrame,turnPose,planTurn};
})();
if(typeof module!=='undefined')module.exports=PippoInteraction;
