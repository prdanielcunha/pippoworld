const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const nodes=new Map(),documentEvents={};
function node(id){
 if(!nodes.has(id))nodes.set(id,{style:{},dataset:{},events:{},setAttribute(k,v){this[k]=v},addEventListener(k,f){this.events[k]=f},querySelector(){return node('ball-art')},getContext(){return {}},getBoundingClientRect(){return {left:0,top:0,width:400,height:500}},focus(){},setPointerCapture(id){this.capture=id},hasPointerCapture(id){return this.capture===id},releasePointerCapture(){this.capture=null}});
 return nodes.get(id);
}
const c=vm.createContext({document:{getElementById:node,visibilityState:'visible',addEventListener(k,f){documentEvents[k]=f}},window:{},matchMedia:()=>({matches:false}),ResizeObserver:class{observe(){}},Image:class{},fetch:()=>new Promise(()=>{}),requestAnimationFrame(){},Math,devicePixelRatio:1});
for(const f of ['rig-motion.js','interaction.js','app.js'])vm.runInContext(fs.readFileSync('dist/'+f,'utf8'),c);
const run=s=>vm.runInContext(s,c),canvas=node('pippo');run('state.ready=true;state.motionReady=true;state.stageWidth=400;state.stageHeight=500');
function pointer(type,x,y){canvas.events[type]({clientX:x,clientY:y,pointerId:1,button:0,preventDefault(){}})}

const g=run('geometry()'),headY=g.bottom+(330-1165)*g.scale;
pointer('pointerdown',g.cx,headY);assert.equal(run('state.petHeld'),true);assert.equal(canvas.capture,1);
pointer('pointermove',g.cx+70,headY+40);assert.equal(run('state.petKind'),'head');assert.equal(run('state.motion'),null,'a long stroke is not interpreted as a destination');
run('for(let t=0;t<3000;t+=50)frame(t)');assert.ok(run('state.pet')>0,'holding sustains affection beyond its initial timer');assert.ok(run('state.blink')>0);
canvas.events.pointerleave();assert.equal(run('state.petHeld'),true,'capture keeps the gesture when the pointer leaves');
pointer('pointerup',g.cx+70,headY+40);assert.equal(run('state.petHeld'),false);assert.equal(canvas.capture,null);
run('for(let t=3000;t<5000;t+=50)frame(t)');assert.equal(run('state.pet'),0,'release returns to rest');
pointer('pointerdown',g.cx,g.bottom+(850-1165)*g.scale);assert.equal(run('state.petKind'),'belly');pointer('pointercancel',0,0);assert.equal(run('state.petHeld'),false);
let prevented=false;
function key(key,target={tagName:'BUTTON'},repeat=false){documentEvents.keydown({key,target,repeat,preventDefault(){prevented=true}})}
key('ArrowLeft');assert.equal(run('state.facing'),-1);assert.equal(prevented,true,'page keys are handled without canvas focus');
run('advanceMotion(100)');const elapsed=run('state.motion.walk.elapsed');key('ArrowLeft',undefined,true);assert.equal(run('state.motion.walk.elapsed'),elapsed,'key repeat never restarts the route');
const before=run('state.motion.walk.to');key('ArrowRight',{tagName:'INPUT'});assert.equal(run('state.motion.walk.to'),before,'form controls retain arrow keys');
node('comparison').open=true;key('ArrowRight');assert.equal(run('state.motion.walk.to'),before,'comparison dialog retains keyboard focus');node('comparison').open=false;
key('ArrowRight');assert.equal(run('state.facing'),1);
run('advanceMotion(100000)');assert.equal(run('state.motion'),null,'arrival finishes the restored whole-pose walk');node('walkRight').onclick();assert.match(node('status').textContent,/já está desse lado/,'a boundary command explains why movement stopped');
console.log('PASS: long affection stroke, hold/release, capture/cancel, page-level arrows, key repeat, form/dialog guards and edge feedback');
