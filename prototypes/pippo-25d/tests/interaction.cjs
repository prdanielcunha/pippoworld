const assert=require('node:assert/strict'),I=require('../dist/interaction.js');
for(const [w,h] of [[320,360],[400,600],[940,599],[1024,400]]){
 const g=I.geometry(w,h),left=I.plan(.5,-1,g),right=I.plan(.5,2,g);
 assert.equal(left.direction,-1);assert.equal(right.direction,1);
 assert.equal(left.to,g.min);assert.equal(right.to,g.max);
 const half=I.advance(left,left.duration/2);assert.ok(half.x<.5&&half.x>=g.min);
 const redirected=I.plan(half.x,1,g);assert.equal(redirected.from,half.x,'new intention uses current position');
 const arrival=I.advance(redirected,redirected.duration+1000);assert.equal(arrival.x,g.max);assert.equal(arrival.done,true);
 assert.ok(g.min*w-g.bodyHeight*289/334/2>=13.9,'all poses remain inside viewport');
 const headY=g.bottom+(330-1165)*g.scale,bellyY=g.bottom+(850-1165)*g.scale;
 assert.equal(I.hit(g.cx,headY,g),'head');assert.equal(I.hit(g.cx,bellyY,g),'belly');
 assert.equal(I.hit(g.cx,headY,g,-1),'head','mirrored character keeps head target');
 assert.equal(I.hit(2,h*.9,g),'ground');assert.equal(I.hit(2,2,g),'empty');
}
console.log('PASS: both directions, limits, exact arrival, retarget without teleport and touch regions across four sizes');
const meta=require('../dist/assets/walk-cycle-v2.json');
assert.equal(meta.frames.length,8);
for(let n=0;n<8;n++)assert.equal(I.walkFrame((n+.01)*100*.52/8,100),n,'all eight phases are reachable');
assert.equal(I.walkFrame(52,100),0,'last phase wraps back to first');
for(const f of meta.frames){
 assert.ok(f.anchorX>0&&f.anchorX<f.w);assert.ok(f.x>=0&&f.y>=0&&f.x+f.w<=f.sw&&f.y+f.h<=f.sh);
 assert.ok(Math.max(f.anchorX,f.w-f.anchorX)/meta.standingHeight<=289/334/2,'new gait fits existing motion bounds');
}
console.log('PASS: eight gait phases, loop boundary, registration and full silhouette limits');
const phone=I.geometry(360,500);
assert.ok((phone.max-phone.min)*360>150,'phone has a useful horizontal travel range');
assert.equal(I.hit(4,250,phone),'ground','a tap beside Pippo at mid-height is a destination');
const scene=I.geometry(940,599),route=I.plan(scene.min,scene.max,scene),changes=[];
let last=0;
for(let t=0;t<route.duration;t+=10){
 const result=I.advance(route,10),phase=I.walkFrame((result.x-scene.min)*scene.width,scene.bodyHeight);
 if(phase!==last){changes.push(t);last=phase;}
}
for(const t of changes)assert.ok(changes.filter(x=>x>=t&&x<t+1000).length<=8,'no more than one full left/right cycle per second');
console.log('PASS: phone travel, side taps and a bounded slower gait cadence');
const responsive=I.plan(phone.min,phone.max,phone),early=I.advance({...responsive},100);
assert.ok((early.x-phone.min)*phone.width>2,'command produces a visible displacement within 100ms of simulation');
assert.ok(responsive.duration<(phone.max-phone.min)*phone.width/(phone.bodyHeight*.28)*1000,'full route is faster than the previous version');
console.log('PASS: short acceleration and faster full-route traversal');
