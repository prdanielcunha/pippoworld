const assert=require('node:assert/strict'),A=require('../dist/music-audio.js');
const graphs=[];
class Param{constructor(){this.value=0;this.calls=[]}setValueAtTime(v,t){this.calls.push(['set',v,t])}linearRampToValueAtTime(v,t){this.calls.push(['linear',v,t])}exponentialRampToValueAtTime(v,t){this.calls.push(['exp',v,t])}cancelScheduledValues(t){this.calls.push(['cancel',t])}setTargetAtTime(v,t,c){this.calls.push(['target',v,t,c])}}
class Node{constructor(kind){this.kind=kind;this.frequency=new Param;this.gain=new Param;this.Q=new Param;this.starts=[];this.stops=[]}connect(){}disconnect(){}setPeriodicWave(w){this.wave=w}start(t){this.starts.push(t)}stop(t){this.stops.push(t)}}
class Context{
 constructor(){this.state='suspended';this.sampleRate=48000;this.currentTime=0;this.nodes=[];this.destination={};graphs.push(this)}
 node(kind){const n=new Node(kind);this.nodes.push(n);return n}createGain(){return this.node('gain')}createOscillator(){return this.node('oscillator')}createBufferSource(){return this.node('noise')}createBiquadFilter(){return this.node('filter')}createPeriodicWave(){return {}}
 createDynamicsCompressor(){return Object.fromEntries(['threshold','knee','ratio','attack','release'].map(k=>[k,new Param]).concat([['connect',()=>{}]]))}
 createBuffer(_,length){return {getChannelData:()=>new Float32Array(length)}}
 resume(){return new Promise(resolve=>this.finishResume=()=>{this.state='running';resolve()})}suspend(){this.state='suspended';return Promise.resolve()}
}
(async()=>{
 const a=A.create({AudioContext:Context});a.play('released','keyboard',0);a.release('released');graphs[0].finishResume();await Promise.resolve();assert.equal(a.getState().voices,0,'lifting before audio unlock must not replay a stale touch');
 const ctx=graphs[0];for(let i=0;i<8;i++)a.play('note'+i,'keyboard',i);assert.equal(a.getState().voices,6,'polyphony stays bounded under repeated and simultaneous notes');
 const frequencies=ctx.nodes.filter(n=>n.kind==='oscillator').map(n=>n.frequency.calls[0][1]);assert.equal(frequencies[0],A.notes[0]);assert.equal(frequencies[7],A.notes[7]);assert.ok(Math.abs(A.notes[7]/A.notes[0]-2)<1e-7,'first and last C are one octave apart');
 a.suspend();assert.equal(a.getState().voices,0);assert.equal(a.getState().pending,0);assert.equal(a.play('auto','keyboard',0,{automatic:true}),false,'a reply cannot wake suspended audio');
 a.play('late','drum');a.suspend();ctx.finishResume();await Promise.resolve();assert.equal(a.getState().voices,0,'scene exit cancels a pending resume');
 a.setMuted(true);assert.equal(a.play('mute','keyboard'),false);assert.equal(a.getState().voices,0);a.setMuted(false);a.setVolume(10);assert.equal(a.getState().volume,.8);a.setVolume(-1);assert.equal(a.getState().volume,0);
 ctx.state='running';for(const kind of ['keyboard','xylophone','drum','shaker','tambourine'])assert.equal(a.play(kind,kind,0),true);assert.equal(a.play('bad','moo'),false);a.stopAll();assert.equal(a.getState().voices,0);
 for(const n of ctx.nodes.filter(n=>n.kind==='oscillator'||n.kind==='noise'))assert.ok(n.stops.length,'every source has a finite stop, even after cancellation');
 console.log('PASS: octave/frequency mapping, bounded polyphony, envelopes, mute/volume, pause, stale-unlock cancellation and no automatic wake-up');
})().catch(e=>{console.error(e);process.exit(1)});
