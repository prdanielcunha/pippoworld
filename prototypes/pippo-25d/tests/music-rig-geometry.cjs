'use strict';
// Reproduce the v26 contact geometry with a minimal Canvas/DOM simulator.
// This is NOT a pixel, audio, browser or physical-device acceptance test.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
class Canvas {
 constructor(){this.width=0;this.height=0;this.hidden=false}
 getContext(){
  const gradient={addColorStop(){}};
  return new Proxy({
   getImageData:()=>({data:new Uint8ClampedArray(this.width*this.height*4)}),
   createRadialGradient:()=>gradient
  },{get:(target,key)=>key in target?target[key]:(...args)=>undefined,
     set:(target,key,value)=>{target[key]=value;return true}});
 }
 setAttribute(){}
}
class FakeImage{set src(value){this.onload()}}
let width=390,height=520;
const stage=new Canvas();stage.append=element=>{stage.overlay=element};
stage.getBoundingClientRect=()=>({left:0,top:0,width,height,right:width,bottom:height});
const pippo=new Canvas();pippo.getBoundingClientRect=stage.getBoundingClientRect;
const panel={dataset:{},style:{setProperty(){}}};
const document={
 createElement:()=>new Canvas(),
 getElementById:id=>id==='stage'?stage:id==='pippo'?pippo:panel,
 querySelector:selector=>{
  const index=Number((selector.match(/"(\d+)"/)||[])[1]||0);
  if(selector.includes('data-piece')){
   const positions=[[.44,.72,.3,.22],[.58,.68,.17,.11],[.33,.68,.14,.12],[.74,.60,.2,.06],[.20,.58,.2,.06]];
   const [x,y,w,h]=positions[index];
   return {getBoundingClientRect:()=>({left:x*width,top:y*height,width:w*width,height:h*height,
    right:(x+w)*width,bottom:(y+h)*height})};
  }
  const keyWidth=width*.78/8;
  return {getBoundingClientRect:()=>({left:width*.11+index*keyWidth,top:height*.72,
   width:keyWidth,height:height*.18})};
 }
};
const window={devicePixelRatio:2,addEventListener(){}};
const context=vm.createContext({document,window,Image:FakeImage,ResizeObserver:class{observe(){}},Uint8Array,Uint8ClampedArray});
for(const file of ['music-performance.js','music-anatomy.js','music-rig.js']){
 vm.runInContext(fs.readFileSync('dist/'+file,'utf8'),context,{filename:file});
}
const rig=window.PippoMusicRig;
(async()=>{
 await rig.prepare();
 assert.ok(rig.ready,'rig should prepare before drawing');
 let scenarios=0,contacts=0,pedals=0;
 for(const w of [320,390,940]){
  width=w;height=w===940?630:w===320?480:520;
  const drawing=new Canvas().getContext();
  for(const kind of ['keyboard','xylophone','drum','tambourine','shaker']){
   rig.performance.reset(kind);
   const count=kind==='drum'?5:kind==='keyboard'||kind==='xylophone'?8:1;
   for(let index=0;index<count;index++){
    rig.performance.strike({instrument:kind,index,id:'touch'+index});
    const result=rig.draw(drawing,{width,height,bodyHeight:height*.58},{musicInstrument:kind,reduced:false});
    assert.ok(result?.hit?.width===340,'complete Pippo body remains the original source width');
    assert.equal(panel.dataset.hands,'compact-26');
    const inspected=rig.inspect();
    assert.equal(inspected.kind,kind);
    for(const contact of inspected.contacts.filter(c=>c.contact&&!c.foot&&c.tip&&c.target)){
     const error=Math.hypot(contact.tip.x-contact.target.x,contact.tip.y-contact.target.y);
     assert.ok(error<1e-5,kind+' attack must reach its surface');
     contacts++;
    }
    if(kind==='drum'&&index===0){
     const kick=inspected.contacts.find(c=>c.foot);
     assert.ok(kick?.pedal,'bass drum must use the foot instead of a drumstick');
     assert.ok(kick.pedal.x>0&&kick.pedal.x<width,'pedal stays within the stage');
     pedals++;
    }
    scenarios++;
    rig.performance.advance(33);
    rig.performance.release('touch'+index);
   }
  }
 }
 assert.equal(scenarios,69);
 assert.equal(pedals,3);
 assert.ok(contacts>=60);
 console.log('PASS: '+scenarios+' geometry scenarios, '+contacts+' precise active contacts, '+pedals+' pedal checks across 320/390/940 widths');
})().catch(error=>{console.error(error);process.exitCode=1});
