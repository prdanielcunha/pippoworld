const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');const nodes=new Map;
const ctx=new Proxy({createRadialGradient(){return {addColorStop(){}}}},{get:(o,k)=>k in o?o[k]:(()=>{})});
function node(id){if(!nodes.has(id))nodes.set(id,{style:{},dataset:{},width:400,height:500,setAttribute(k,v){this[k]=v},addEventListener(){},querySelector(){return node('ball-art')},getContext(){return ctx},getBoundingClientRect(){return {width:400,height:500}}});return nodes.get(id)}
const c=vm.createContext({document:{getElementById:node,addEventListener(){},visibilityState:'visible'},window:{PippoCanon:{ready:true,draw(){}}},matchMedia:()=>({matches:false}),ResizeObserver:class{observe(){}},Image:class{},fetch:()=>new Promise(()=>{}),requestAnimationFrame(){},Math,devicePixelRatio:1});for(const f of ['interaction.js','app.js'])vm.runInContext(fs.readFileSync('dist/'+f,'utf8'),c);const run=s=>vm.runInContext(s,c);
run('state.ready=true;state.motionReady=true;state.stageWidth=400;state.stageHeight=500');
const I=require('../dist/interaction.js');
for(const from of ['left','quarterLeft','front','quarterRight','right'])for(const direction of [-1,1]){
 const turn=I.planTurn(from,direction);
 if(from===(direction===1?'right':'left')){assert.equal(turn,null);continue}
 assert.equal(I.turnPose(turn),from,'new turn starts at actual visible view');
 turn.elapsed=turn.duration;assert.equal(I.turnPose(turn),direction===1?'right':'left');
 const views=['left','quarterLeft','front','quarterRight','right'];
 for(let i=1;i<turn.poses.length;i++)assert.equal(Math.abs(views.indexOf(turn.poses[i])-views.indexOf(turn.poses[i-1])),1,'only adjacent views');
}
run('state.actorX=.4;state.sideRest=true;state.facing=1;walkTo(.7)');
assert.equal(run('state.turn'),null,'continue right from right profile without an opposite-side detour');
run('advanceMotion(100000);walkTo(.8)');assert.equal(run('state.turn'),null,'second same-side trip also skips turning');
run('state.motion=null;state.turn=null;state.sideRest=false;state.actorX=.5;walkTo(0);advanceMotion(100)');
const shown=run('PippoInteraction.turnPose(state.turn)');
const progress=run('state.turn.elapsed');run('walkTo(.3)');assert.equal(run('state.turn.elapsed'),progress,'same direction keeps the in-progress turn');
run('walkTo(1)');assert.equal(run('PippoInteraction.turnPose(state.turn)'),shown,'reversal preserves the currently visible view');
const held=run('state.actorX');run('advanceMotion(20)');assert.equal(run('state.actorX'),held,'no translation during reversal views');
run('advanceMotion(100000)');assert.equal(run('state.motion'),null);assert.equal(run('state.sideRest'),true);
run('state.motion=null;state.turn=null;state.sideRest=false;state.actorX=.5;state.reduced=true;walkTo(0);advanceMotion(2)');assert.equal(run('state.turn'),null,'reduced motion skips extended view sequence');
run('state.reduced=false;state.motion=null;state.sideRest=false;state.actorX=.5;walkTo(0);walkTo(.5)');assert.equal(run('state.turn'),null,'stopping at current position cancels stale turn');
run('state.motion=null;state.sideRest=false;state.actorX=.5;walkTo(0);pet("head")');assert.equal(run('state.turn'),null);assert.equal(run('state.motion'),null);
run('walkTo(1);startMotion("rest")');assert.equal(run('state.turn'),null);assert.equal(run('state.motion.kind'),'rest');
console.log('PASS: 10 orientation/direction pairs, same-side continuation, in-turn retarget/reversal, stationary pivot, reduced motion and interruption');
