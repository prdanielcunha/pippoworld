'use strict';
const PippoStationMotion=(()=>{
 const smooth=t=>t*t*(3-2*t);
 function sample(age,reduced=false){if(reduced||age>=1600)return {phase:'ready',x:.5,sit:1};if(age<850){const q=smooth(Math.max(0,age)/850);return {phase:'approach',x:-.14+.64*q,distance:q*.64,sit:0}}if(age<1050)return {phase:'turn',x:.5,view:Math.min(2,Math.floor((age-850)/200*3)),sit:0};return {phase:'sit',x:.5,sit:smooth((age-1050)/550)}}
 return {sample};
})();
if(typeof module!=='undefined')module.exports=PippoStationMotion;
