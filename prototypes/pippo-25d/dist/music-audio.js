'use strict';
// Local synthesis only. No microphone, network audio or recorded animal sounds.
const PippoAudio=(()=>{
 const notes=[261.625565,293.664768,329.627557,349.228231,391.995436,440,493.883301,523.251131];
 function create({AudioContext=globalThis.AudioContext||globalThis.webkitAudioContext,onError=()=>{}}={}){
  let context,master,noise,wave,muted=false,volume=.45,epoch=0;const voices=new Map(),pending=new Map();
  function init(){
   if(context)return context;
   if(!AudioContext)throw Error('audio-unavailable');
   context=new AudioContext({latencyHint:'interactive'});master=context.createGain();master.gain.value=volume;
   const limiter=context.createDynamicsCompressor();limiter.threshold.value=-14;limiter.knee.value=12;limiter.ratio.value=8;limiter.attack.value=.003;limiter.release.value=.12;master.connect(limiter);limiter.connect(context.destination);
   noise=context.createBuffer(1,Math.ceil(context.sampleRate*.6),context.sampleRate);const data=noise.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;
   wave=context.createPeriodicWave(new Float32Array(6),new Float32Array([0,1,.3,.13,.05,.02]),{disableNormalization:false});return context;
  }
  function release(id){
   pending.delete(id);const v=voices.get(id);if(!v)return;voices.delete(id);
   const t=context.currentTime;v.gain.gain.cancelScheduledValues(t);v.gain.gain.setTargetAtTime(0,t,.008);
   for(const s of v.sources)try{s.stop(t+.05)}catch{};
  }
  function stopAll(){epoch++;pending.clear();for(const id of [...voices.keys()])release(id)}
  function sound(id,kind,index){
   release(id);while(voices.size>=6)release(voices.keys().next().value);
   const t=context.currentTime,gain=context.createGain(),sources=[];gain.connect(master);const v={gain,sources};voices.set(id,v);
   function oscillator(freq,type='sine'){const o=context.createOscillator();o.type=type;o.frequency.setValueAtTime(freq,t);o.connect(gain);sources.push(o);return o}
   let duration=.9,peak=.16;
   if(kind==='keyboard'){const o=oscillator(notes[index]);o.setPeriodicWave(wave);duration=1.8;peak=.16}
   else if(kind==='xylophone'){const f=notes[index];oscillator(f);const overtone=oscillator(f*2.76);const overtoneGain=context.createGain();overtone.disconnect();overtoneGain.gain.value=.2;overtone.connect(overtoneGain);overtoneGain.connect(gain);duration=.75;peak=.13}
   else if(kind==='drum'){const o=oscillator(135);o.frequency.exponentialRampToValueAtTime(61,t+.18);duration=.38;peak=.4}
   else {const source=context.createBufferSource(),filter=context.createBiquadFilter();source.buffer=noise;filter.type='bandpass';filter.frequency.value=kind==='shaker'?4300:7200;filter.Q.value=kind==='shaker'?.7:2;source.connect(filter);filter.connect(gain);sources.push(source);duration=kind==='shaker'?.16:.34;peak=kind==='shaker'?.24:.18;
    if(kind==='tambourine')for(const f of [3100,4730,6210]){const overtone=oscillator(f),partial=context.createGain();overtone.disconnect();partial.gain.value=.2;overtone.connect(partial);partial.connect(gain)}
   }
   gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(peak,t+.006);gain.gain.exponentialRampToValueAtTime(.0001,t+duration);
   let ended=0;for(const source of sources){source.onended=()=>{if(++ended===sources.length){if(voices.get(id)===v)voices.delete(id);gain.disconnect()}};source.start(t);source.stop(t+duration+.03)}
   return true;
  }
  function play(id,kind='keyboard',index=0,{automatic=false}={}){
   if(muted||!['keyboard','xylophone','drum','shaker','tambourine'].includes(kind)||!Number.isInteger(index)||index<0||index>7)return false;
   try{
    init();if(automatic&&context.state!=='running')return false;
    const ticket={epoch};pending.set(id,ticket);
    if(context.state==='running'){pending.delete(id);return sound(id,kind,index)}
    context.resume().then(()=>{if(!muted&&pending.get(id)===ticket&&ticket.epoch===epoch){pending.delete(id);sound(id,kind,index)}}).catch(()=>{pending.delete(id);onError()});return true;
   }catch{onError();return false}
  }
  return {play,release,stopAll,suspend(){stopAll();if(context&&context.state==='running')context.suspend().catch(()=>{})},setMuted(v){muted=Boolean(v);if(muted)stopAll();if(master)master.gain.setTargetAtTime(muted?0:volume,context.currentTime,.015)},setVolume(v){volume=Math.max(0,Math.min(.8,Number(v)||0));if(master)master.gain.setTargetAtTime(muted?0:volume,context.currentTime,.015)},getState(){return {voices:voices.size,pending:pending.size,muted,volume,state:context?.state||'idle'}}};
 }
 return {notes,create};
})();
if(typeof module!=='undefined')module.exports=PippoAudio;
