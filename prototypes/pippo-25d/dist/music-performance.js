'use strict';
// Gesture state shares the event clock with input. No animation queue or rate limiter.
const PippoPerformance=(()=>{
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 function create(){
  let time=0,kind='keyboard',serial=0,last=-Infinity,period=420,energy=0,side=0;
  const hands=[null,null],held=new Map();let foot=null;
  function reset(next=kind){kind=next;hands.fill(null);held.clear();foot=null;last=-Infinity;period=420;energy=0;side=0}
  function strike({instrument=kind,index=0,id=null,automatic=false}={}){
   if(instrument!==kind)reset(instrument);
   const gap=time-last;if(gap>35&&gap<1300)period=period*.35+gap*.65;
   last=time;energy=clamp(energy+.22,0,1);serial++;
   const duration=clamp(period*.66,65,240),hit={index,time,duration,serial,automatic};
   if(kind==='drum'&&index===0){foot=hit;return hit}
   let arm;
   if(kind==='tambourine'||kind==='shaker')arm=1;
   else if(kind==='drum'){arm=index===1||index===3?1:0;if([...held.values()].some(v=>v.arm===arm&&v.index!==index))arm=1-arm;}
   else {
    const other=hands.map((h,i)=>({h,i})).find(({h})=>h&&h.index===index);
    if(other)arm=other.i;
    else if(index<=2)arm=0;else if(index>=5)arm=1;else arm=(side++%2);
    // Two simultaneous neighbouring notes still get two independent hands.
    if(hands[arm]&&[...held.values()].some(v=>v.arm===arm&&v.index!==index))arm=1-arm;
   }
   hands[arm]=hit;if(id!==null)held.set(id,{index,arm,hit});return {...hit,arm};
  }
  function release(id){
   const released=held.get(id);held.delete(id);if(!released)return;
   const arm=released.arm,current=hands[arm];
   const remaining=[...held.values()].filter(v=>v.arm===arm);
   if(current&&remaining.some(v=>v.index===current.index))return;
   if(kind==='keyboard'&&remaining.length){hands[arm]=remaining.at(-1).hit;return}
   // Releasing a sustained key starts a silent rebound from contact, never a new note.
   if(kind==='keyboard'&&current)hands[arm]={...current,time,duration:clamp(period*.66,65,240),released:true};
  }
  function advance(ms){if(Number.isFinite(ms)&&ms>0){time+=ms;energy=Math.max(0,energy-ms/2400)}}
  function gesture(hit,arm){if(!hit)return null;const age=time-hit.time,q=clamp(age/hit.duration,0,1),down=age<28;
   // Contact is immediate at sound onset; rebound is smaller at fast tempi.
   const lift=q<.45?Math.sin(q/.45*Math.PI/2):Math.cos((q-.45)/.55*Math.PI/2);
   const t=clamp((q-.45)/.55,0,1),settle=t*t*(3-2*t);
   return {...hit,age,q,contact:down&&!hit.released,lift,settle,active:age<hit.duration,held:[...held.values()].some(v=>v.arm===arm&&v.index===hit.index)};
  }
  function snapshot(){return {kind,time,serial,period,energy,pace:period<230?'quick':period<600?'flowing':'gentle',expression:energy>.55?'delighted':energy>.08?'focused':'attentive',hands:hands.map((hit,arm)=>gesture(hit,arm)),foot:gesture(foot,-1),held:[...held.values()]}}
  return {strike,release,advance,reset,snapshot};
 }
 // Convert actual DOM geometry to one contact surface in scene coordinates.
 function contact(rect,scene,kind,index){
  const x=rect.left-scene.left+rect.width*.5;
  const y=rect.top-scene.top+rect.height*(kind==='keyboard'?.36:kind==='xylophone'?.30:kind==='drum'?(index===0?.55:index>=3?.48:.08):.5);
  return {x,y};
 }
 return {create,contact,clamp};
})();
if(typeof module!=='undefined')module.exports=PippoPerformance;
