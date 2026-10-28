'use strict';
// Continuous two-foot gait. During stance, the world-space foot stays planted.
const PippoRig=(()=>{
 const strideRatio=.52,stance=.62;
 const smooth=t=>t*t*(3-2*t);
 function pose(distance,height){
  const stride=height*strideRatio,phase=((distance/stride)%1+1)%1;
  const feet=[0,.5].map((offset,i)=>{
   const p=(phase+offset)%1,contact=p<stance;
   const swing=contact?0:(p-stance)/(1-stance);
   // Hermite tangents match stance velocity at lift-off and landing.
   const u=swing,u2=u*u,u3=u2*u;
   const x=contact?stride*(p-stance/2):stride*((2*u3-3*u2+1)*stance/2+(u3-2*u2+u)*(1-stance)+(-2*u3+3*u2)*(-stance/2)+(u3-u2)*(1-stance));
   const lift=Math.sin(Math.PI*swing)**2;
   return {x,y:-lift*height*.075-(i?height*.012:0),pitch:lift*.16,contact};
  });
  return {feet,bob:height*.006*(1-Math.cos(phase*Math.PI*4))};
 }
 function rest(height){return {feet:[{x:-height*.04,y:0,pitch:0,contact:true},{x:height*.055,y:-height*.012,pitch:0,contact:true}],bob:0}}
 function leg(foot,height,bob=0){
  const hip={x:height*.035,y:-height*.2-bob},footHeight=height*.15;
  // Joint lies within the solid lower ankle, after cropping its open top rim.
  const ankle={x:foot.x-Math.sin(foot.pitch)*footHeight*.5,y:foot.y-footHeight+Math.cos(foot.pitch)*footHeight*.5};
  const dx=ankle.x-hip.x,dy=ankle.y-hip.y,d=Math.max(1e-6,Math.hypot(dx,dy)),length=height*.13;
  const projection=d/2,bend=Math.sqrt(Math.max(0,length*length-projection*projection));
  const knee={x:hip.x+dx*.5+dy/d*bend,y:hip.y+dy*.5-dx/d*bend};
  return {hip,knee,ankle,length,distance:d};
 }
 function settle(from,fromHeight,height,elapsed){
  const q=smooth(Math.min(1,Math.max(0,elapsed/240))),ratio=height/fromHeight,target=rest(height);
  return {feet:from.feet.map((f,i)=>({x:f.x*ratio*(1-q)+target.feet[i].x*q,y:f.y*ratio*(1-q)+target.feet[i].y*q,pitch:f.pitch*(1-q),contact:q===1||f.contact})),bob:from.bob*ratio*(1-q)};
 }
 return {pose,rest,settle,leg,strideRatio};
})();
if(typeof module!=='undefined')module.exports=PippoRig;
