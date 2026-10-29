const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');const nodes=new Map;
const ctx=new Proxy({createRadialGradient(){return {addColorStop(){}}}},{get:(o,k)=>k in o?o[k]:(()=>{})});
function node(id){if(!nodes.has(id))nodes.set(id,{style:{},dataset:{},width:400,height:500,setAttribute(k,v){this[k]=v},addEventListener(){},querySelector(){return node('ball-art')},getContext(){return ctx},getBoundingClientRect(){return {width:400,height:500}}});return nodes.get(id)}
const c=vm.createContext({document:{getElementById:node,addEventListener(){},visibilityState:'visible'},window:{PippoCanon:{ready:true,draw(){}}},matchMedia:()=>({matches:false}),ResizeObserver:class{observe(){}},Image:class{},fetch:()=>new Promise(()=>{}),requestAnimationFrame(){},Math,devicePixelRatio:1});for(const f of ['interaction.js','app.js'])vm.runInContext(fs.readFileSync('dist/'+f,'utf8'),c);const run=s=>vm.runInContext(s,c);
const I=require('../dist/interaction.js');
const close=(a,b,why)=>assert.ok(Math.abs(a-b)<1e-10,why+': '+a+' vs '+b);
for(const [w,h] of [[320,360],[400,600],[940,599],[1024,400]])for(const direction of [-1,1]){
 const g=I.geometry(w,h),start=direction===1?g.min:g.max,end=direction===1?g.max:g.min;
 const first=I.plan(start,end,g);const current=I.advance(first,first.duration*.35).x;
 const next=I.plan(current,end-direction*.01,g,first.velocity);
 close(next.velocity,first.velocity,'retarget inherits speed');close(I.advance(next,0).x,current,'no teleport');
 const speed=next.velocity;I.advance(next,.01);assert.ok(Math.abs(next.velocity-speed)<.00000001,'no zero-speed reset');
 for(const target of [current+direction*.01,end]){
  const route=I.plan(current,target,g,first.velocity);let previous=current;
  while(route.elapsed<route.duration){const value=I.advance(route,7);assert.ok(direction*(value.x-previous)>=-1e-12,'monotonic braking');assert.ok(value.x>=g.min-1e-12&&value.x<=g.max+1e-12,'no overshoot');previous=value.x}
  close(previous,route.to,'exact arrival');close(route.velocity,0,'arrival stops');
 }
 const reversed=I.plan(current,start,g,first.velocity);close(reversed.velocity,0,'reversal stops for pivot instead of inheriting opposite speed');
 for(const t of [0,10,120,350,800]){
  const route=I.plan(start,end,g),q=Math.min(1,t/route.duration),a=Math.min(.25,120/route.duration);
  const old=q<a?q*q/(2*a*(1-a)):q>1-a?1-(1-q)**2/(2*a*(1-a)):(q-a/2)/(1-a);
  close(I.advance(route,t).x,start+(end-start)*old,'ordinary start preserves v15 path');
 }
}
run('state.ready=true;state.motionReady=true;state.stageWidth=940;state.stageHeight=599;state.actorX=.3;state.sideRest=true;state.facing=1;walkTo(.65);advanceMotion(400)');
const v=run('state.motion.walk.velocity'),x=run('state.actorX'),phase=run('state.walkDistance');run('walkTo(.8)');
close(run('state.motion.walk.velocity'),v,'game passes current speed');close(run('state.actorX'),x,'game keeps actor position');close(run('state.walkDistance'),phase,'game keeps stride phase');
run('advanceMotion(30)');assert.ok(run('state.actorX')>x);run('state.paused=true');const held=run('state.actorX');run('frame(100);frame(150)');close(run('state.actorX'),held,'pause freezes route');
run('state.paused=false;pet("head")');assert.equal(run('state.motion'),null,'affection cancels route and velocity');run('state.sideRest=true;state.facing=1;walkTo(.8)');assert.equal(run('state.motion.walk.velocity'),0,'new walk after affection starts at rest');
console.log('PASS: inherited speed, no retarget stall, monotonic nearby braking, opposite-direction pivot, exact stop, unchanged normal path, preserved gait phase and pause/cancel across four sizes');

const g=I.geometry(940,599);let expected;
for(const fps of [30,60,120]){
 let route=I.plan(.3,.65,g),position=.3;
 const advanceFor=duration=>{let elapsed=0;while(elapsed<duration){const dt=Math.min(1000/fps,duration-elapsed);position=I.advance(route,dt).x;elapsed+=dt}};
 advanceFor(400);route=I.plan(position,.8,g,route.velocity);advanceFor(200);
 if(expected===undefined)expected=position;else close(position,expected,'30/60/120 FPS simulated partitions agree');
}
console.log('PASS: matching route results at simulated 30/60/120 FPS; not a physical FPS measurement');
