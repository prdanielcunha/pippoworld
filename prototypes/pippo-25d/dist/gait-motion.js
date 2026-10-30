'use strict';
// Planting law for the whole-figure gait mesh; no detached leg images.
const PippoGaitMotion=(()=>{
 const strideRatio=.52,stance=.62;
 function feet(phase,height){const stride=height*strideRatio;return [0,.5].map((offset,i)=>{const p=(phase+offset)%1,contact=p<stance,u=contact?0:(p-stance)/(1-stance),u2=u*u,u3=u2*u;return {x:contact?stride*(p-stance/2):stride*((2*u3-3*u2+1)*stance/2+(u3-2*u2+u)*(1-stance)+(-2*u3+3*u2)*(-stance/2)+(u3-u2)*(1-stance)),y:-(Math.sin(Math.PI*u)**2)*height*.075-(i?height*.012:0),contact}})}
 function map(x,y,source,target){const t=Math.max(0,Math.min(1,(y-305)/55)),weight=t*t*(3-2*t),q=Math.max(0,Math.min(1,(x-source[0].x)/Math.max(1,source[1].x-source[0].x)));return {x:x+weight*((target[0].x-source[0].x)*(1-q)+(target[1].x-source[1].x)*q),y:y+weight*((target[0].y-source[0].y)*(1-q)+(target[1].y-source[1].y)*q)}}
 return {feet,map,strideRatio};
})();
if(typeof module!=='undefined')module.exports=PippoGaitMotion;
