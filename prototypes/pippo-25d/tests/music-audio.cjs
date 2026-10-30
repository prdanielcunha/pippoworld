const assert=require('node:assert/strict'),A=require('../dist/music-audio.js'),manifest=require('../dist/assets/audio/manifest.json');
const graphs=[];
class Param{constructor(){this.value=1;this.calls=[]}setValueAtTime(v,t){this.calls.push(['set',v,t])}linearRampToValueAtTime(v,t){this.calls.push(['linear',v,t])}cancelScheduledValues(t){this.calls.push(['cancel',t])}setTargetAtTime(v,t,c){this.calls.push(['target',v,t,c])}}
class Node{constructor(kind){this.kind=kind;this.gain=new Param;this.starts=[];this.stops=[]}connect(){}disconnect(){}start(t){this.starts.push(t)}stop(t){this.stops.push(t)}}
class Context{
 constructor(){this.state='suspended';this.currentTime=0;this.nodes=[];this.destination={};this.waits=[];graphs.push(this)}node(kind){const n=new Node(kind);this.nodes.push(n);return n}createGain(){return this.node('gain')}createBufferSource(){return this.node('recording')}createOscillator(){throw Error('synthetic fallback forbidden')}
 createDynamicsCompressor(){return Object.fromEntries(['threshold','knee','ratio','attack','release'].map(k=>[k,new Param]).concat([['connect',()=>{}]]))}
 async decodeAudioData(bytes){const id=Buffer.from(bytes).toString();return {id,duration:manifest.samples.find(s=>s.id===id).duration}}
 resume(){return new Promise(resolve=>this.waits.push(resolve))}finishResume(){this.state='running';this.waits.splice(0).forEach(r=>r())}suspend(){this.state='suspended';return Promise.resolve()}
}
const fetcher=async url=>url.includes('manifest.json')?{ok:true,json:async()=>manifest}:{ok:true,arrayBuffer:async()=>{const s=manifest.samples.find(s=>url.endsWith(s.file));assert.ok(s,'local manifest filename');return Uint8Array.from(Buffer.from(s.id)).buffer}};
(async()=>{
 let ready=0;const attacks=[];const a=A.create({AudioContext:Context,fetcher,onReady:()=>ready++,onAttack:e=>attacks.push(e)});assert.equal(a.play('early','keyboard'),false,'no invented sound before samples load');await a.load();const ctx=graphs[0];assert.equal(ready,1);assert.equal(a.getState().loaded,26);assert.equal(ctx.state,'suspended','preloading never starts the audio context');
 a.play('released','keyboard',0);a.release('released');ctx.finishResume();await Promise.resolve();assert.equal(a.getState().voices,0,'no stale touch after unlock');assert.equal(attacks.length,0,'cancelled unlock never triggers a visual attack');
 ctx.state='suspended';a.play('one','keyboard',0);a.play('two','keyboard',2);ctx.finishResume();await Promise.resolve();assert.equal(a.getState().voices,2,'two fingers survive one asynchronous audio unlock');assert.equal(attacks.length,2,'two real audio starts trigger exactly two visual attacks');assert.deepEqual(attacks.map(a=>a.index),[0,2]);a.release('one');assert.equal(a.getState().voices,1,'releasing one finger leaves the other note sounding');a.stopAll();
 for(let i=0;i<8;i++)a.play('key'+i,'keyboard',i);assert.equal(a.getState().voices,8,'all eight notes can sound together');const played=ctx.nodes.filter(n=>n.kind==='recording').slice(-8).map(n=>n.buffer.id);assert.deepEqual(played,manifest.instruments.keyboard.map(v=>v[0]));
 a.stopAll();for(let i=0;i<3;i++)a.play('same-finger','drum',i);assert.equal(a.getState().voices,3,'drum tails overlap even with one reused finger identifier');
 for(let i=0;i<100;i++)a.play('hit'+i,'drum',i%5);assert.equal(a.getState().voices,24,'repeated hits remain bounded');a.stopAll();
 for(let i=0;i<4;i++)a.play('rattle'+i,'shaker',0);assert.deepEqual(ctx.nodes.filter(n=>n.kind==='recording').slice(-4).map(n=>n.buffer.id),['maraca-1','maraca-2','maraca-3','maraca-1']);
 a.suspend();assert.equal(a.getState().voices,0);assert.equal(a.play('auto','keyboard',0,{automatic:true}),false,'automatic reply cannot wake suspended audio');a.play('late','drum',0);a.suspend();ctx.finishResume();await Promise.resolve();assert.equal(a.getState().voices,0,'scene exit cancels pending resume');
 a.setMuted(true);assert.equal(a.play('muted','keyboard'),false);a.setMuted(false);a.setVolume(20);assert.equal(a.getState().volume,.8);a.setVolume(-1);assert.equal(a.getState().volume,0);assert.equal(a.play('invalid','moo'),false);assert.equal(a.play('invalid','drum',7),false);
 for(const n of ctx.nodes.filter(n=>n.kind==='recording')){assert.ok(n.buffer&&n.starts.length);assert.ok(n.stops.length,'every real recording has a finite stop')}
 let errors=0;const bad=A.create({AudioContext:Context,fetcher:async()=>({ok:false}),onError:()=>errors++});await assert.rejects(bad.load());assert.equal(errors,1);assert.equal(bad.getState().ready,false);assert.equal(bad.play('bad','keyboard'),false,'loading failure never substitutes synthesis');
 console.log('PASS: 26 local recordings, eight-note chords, independent release/unlock, 24 voices, drum overlap, maraca variations, pause/mute/scene cancellation, loading failure and no synthetic fallback');
})().catch(e=>{console.error(e);process.exitCode=1});
