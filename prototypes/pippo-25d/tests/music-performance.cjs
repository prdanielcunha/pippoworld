const assert=require('node:assert/strict'),P=require('../dist/music-performance.js');
const m=P.create();
for(const instrument of ['keyboard','xylophone','tambourine','shaker','drum']){
 m.reset(instrument);const start=m.snapshot().serial;
 for(let i=0;i<16;i++){
  const index=instrument==='drum'?1:instrument==='keyboard'||instrument==='xylophone'?i%8:0;
  m.strike({instrument,index,id:'tap'});let s=m.snapshot();assert.equal(s.serial,start+i+1);assert.ok(s.hands.some(h=>h?.contact),'each onset visibly contacts, even during rapid repetition');m.release('tap');m.advance(40);s=m.snapshot();assert.ok(s.hands.some(h=>h&&h.lift>0),'each onset rebounds instead of holding a static pose');m.advance(40);
 }
 assert.equal(m.snapshot().pace,'quick');assert.equal(m.snapshot().expression,'delighted');
}
m.reset('drum');m.strike({instrument:'drum',index:0});assert.ok(m.snapshot().foot.contact);assert.deepEqual(m.snapshot().hands,[null,null],'bass drum never receives a stick stroke');m.strike({instrument:'drum',index:1,id:'snare'});m.strike({instrument:'drum',index:3,id:'hihat'});assert.deepEqual(m.snapshot().hands.map(h=>h.index),[3,1],'simultaneous hi-hat and snare own separate wings');
m.reset('drum');m.strike({instrument:'drum',index:3});assert.equal(m.snapshot().hands[1].index,3,'right hi-hat uses the right wing');m.reset('drum');m.strike({instrument:'drum',index:4});assert.equal(m.snapshot().hands[0].index,4,'left cymbal uses the left wing');
m.reset('keyboard');m.strike({index:0,id:'left'});m.strike({index:1,id:'right'});assert.ok(m.snapshot().hands.every(Boolean),'neighbouring simultaneous notes use both wings');m.release('left');assert.equal(m.snapshot().held.length,1);assert.equal(m.snapshot().held[0].index,1);m.advance(1000);assert.ok(m.snapshot().hands.find(h=>h.index===1).held,'held note keeps its hand on the key');
m.reset('xylophone');assert.equal(m.snapshot().held.length,0);assert.ok(m.snapshot().hands.every(h=>!h));const serial=m.snapshot().serial;m.advance(5000);assert.equal(m.snapshot().serial,serial,'silence never queues phantom strokes');
for(const width of [280,335,940]){const scene={left:28,top:200},r={left:width*.7,top:600,width:width*.1,height:100};const key=P.contact(r,scene,'keyboard',7);assert.equal(key.y,436);assert.ok(key.x>r.left-scene.left&&key.x<r.left-scene.left+r.width)}
console.log('PASS: 80 rapid strokes, contact/rebound per onset, adaptive pace/joy, separate kick pedal, crossed hands, neighbouring-note polyphony, held-key release and no replay');

// A three-note chord may share an arm, but releasing the newest note restores
// the remaining held key without generating another sound/attack.
m.reset('keyboard');m.strike({index:0,id:'a'});m.strike({index:1,id:'b'});m.strike({index:2,id:'c'});
const beforeRelease=m.snapshot().serial;m.advance(500);m.release('c');
assert.equal(m.snapshot().serial,beforeRelease);
assert.ok(m.snapshot().hands.some(h=>h.index===1&&h.held));
m.release('b');m.release('a');let released=m.snapshot().hands.find(h=>h?.released);
assert.ok(released&&!released.contact&&released.lift===0,'release begins at the key without a new strike');
m.advance(40);assert.ok(m.snapshot().hands.some(h=>h?.released&&h.lift>0));
m.advance(1000);for(const h of m.snapshot().hands){if(h){assert.ok(h.lift<1e-10);assert.equal(h.settle,1);assert.equal(h.held,false)}}
console.log('PASS: chord release restores held notes; silent rebound settles fully, no extra attacks');
