'use strict';
// Recorded instruments, served locally. Every touch owns its own source node.
// No oscillator/noise fallback may pretend to be an acoustic instrument.
const PippoAudio=(()=>{
 const notes=[261.625565,293.664768,329.627557,349.228231,391.995436,440,493.883301,523.251131];
 function create({AudioContext=globalThis.AudioContext||globalThis.webkitAudioContext,fetcher=globalThis.fetch,onError=()=>{},onReady=()=>{}}={}){
  let context,master,childBus,replyBus,manifest,loading,muted=false,volume=.45,epoch=0,serial=0;const voices=new Map(),pending=new Map(),buffers=new Map(),rounds=new Map();
  function init(){
   if(context)return context;if(!AudioContext)throw Error('audio-unavailable');
   context=new AudioContext({latencyHint:'interactive'});master=context.createGain();master.gain.value=muted?0:volume;
   childBus=context.createGain();replyBus=context.createGain();childBus.gain.value=.8;replyBus.gain.value=.65;childBus.connect(master);replyBus.connect(master);
   const limiter=context.createDynamicsCompressor();limiter.threshold.value=-9;limiter.knee.value=9;limiter.ratio.value=10;limiter.attack.value=.003;limiter.release.value=.12;const headroom=context.createGain();headroom.gain.value=.7;master.connect(limiter);limiter.connect(headroom);headroom.connect(context.destination);return context;
  }
  function load(){
   if(loading)return loading;
   loading=(async()=>{
    init();const response=await fetcher('assets/audio/manifest.json?v=recorded-music-21');if(!response.ok)throw Error('sample-manifest');manifest=await response.json();
    const items=manifest.samples.filter(s=>!buffers.has(s.id));let next=0;
    await Promise.all(Array.from({length:4},async()=>{while(next<items.length){const s=items[next++],r=await fetcher('assets/audio/'+s.file);if(!r.ok)throw Error('sample-file');const bytes=await r.arrayBuffer();const b=await context.decodeAudioData(bytes);buffers.set(s.id,b)}}));onReady();return true;
   })().catch(error=>{loading=null;onError('load');throw error});return loading;
  }
  function finish(v,fast=false){
   if(!voices.has(v.key))return;voices.delete(v.key);const t=context.currentTime;v.gain.gain.cancelScheduledValues(t);v.gain.gain.setTargetAtTime(0,t,fast?.008:.045);try{v.source.stop(t+(fast?.05:.24))}catch{}
  }
  function release(id){pending.delete(id);for(const v of [...voices.values()])if(v.id===id)finish(v,id.startsWith('reply'))}
  function stopAll(){epoch++;pending.clear();for(const v of [...voices.values()])finish(v,true)}
  function choose(kind,index){const variants=manifest?.instruments[kind]?.[index];if(!variants?.length)return null;const k=kind+':'+index,n=rounds.get(k)||0;rounds.set(k,n+1);return variants[n%variants.length]}
  function sound(id,kind,index,automatic){
   const sample=choose(kind,index),buffer=buffers.get(sample);if(!buffer)return false;
   // Repeated percussion hits may ring together, even from the same finger.
   if(kind==='keyboard')release(id);
   while(voices.size>=24){const v=[...voices.values()].find(v=>v.automatic)||voices.values().next().value;finish(v,true)}
   const t=context.currentTime,gain=context.createGain(),source=context.createBufferSource(),key=++serial;
   source.buffer=buffer;source.connect(gain);gain.connect(automatic?replyBus:childBus);gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(.48,t+.002);
   const v={key,id,kind,gain,source,automatic};voices.set(key,v);source.onended=()=>{voices.delete(key);source.disconnect();gain.disconnect()};source.start(t);source.stop(t+buffer.duration+.02);return true;
  }
  function play(id,kind='keyboard',index=0,{automatic=false}={}){
   if(muted||!['keyboard','xylophone','drum','shaker','tambourine'].includes(kind)||!Number.isInteger(index)||index<0||index>7)return false;
   try{
    init();if(!manifest?.instruments[kind]?.[index]?.every(s=>buffers.has(s)))return false;
    if(automatic&&context.state!=='running')return false;
    const ticket={epoch};pending.set(id,ticket);
    if(context.state==='running'){pending.delete(id);return sound(id,kind,index,automatic)}
    // Resume synchronously from the gesture. Keep all live fingers, cancel
    // released fingers and stale scene/visibility epochs before the promise resolves.
    context.resume().then(()=>{if(!muted&&pending.get(id)===ticket&&ticket.epoch===epoch){pending.delete(id);sound(id,kind,index,automatic)}}).catch(()=>{pending.delete(id);onError('unlock')});return true;
   }catch{onError('unavailable');return false}
  }
  return {load,play,release,stopAll,suspend(){stopAll();if(context&&context.state==='running')context.suspend().catch(()=>{})},setMuted(v){muted=Boolean(v);if(muted)stopAll();if(master)master.gain.setTargetAtTime(muted?0:volume,context.currentTime,.015)},setVolume(v){volume=Math.max(0,Math.min(.8,Number(v)||0));if(master)master.gain.setTargetAtTime(muted?0:volume,context.currentTime,.015)},getState(){return {voices:voices.size,pending:pending.size,loaded:buffers.size,ready:Boolean(manifest&&buffers.size===manifest.samples.length),muted,volume,state:context?.state||'idle'}}};
 }
 return {notes,create};
})();
if(typeof module!=='undefined')module.exports=PippoAudio;
