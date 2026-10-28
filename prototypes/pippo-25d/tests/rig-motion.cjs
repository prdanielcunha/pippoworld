const assert=require('node:assert/strict'),R=require('../dist/rig-motion.js');
const h=400,stride=h*R.strideRatio,eps=1e-6;
for(let n=0;n<4000;n++){
 const pose=R.pose(n/1000*stride,h);assert.equal(pose.feet.length,2);
 for(const foot of pose.feet)for(const v of [foot.x,foot.y,foot.pitch])assert.ok(Number.isFinite(v));
 for(const foot of pose.feet){
  const leg=R.leg(foot,h,pose.bob),distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
  assert.ok(leg.distance<=leg.length*2,'foot stays within the connected leg reach');
  assert.ok(Math.abs(distance(leg.hip,leg.knee)-leg.length)<1e-7);
  assert.ok(Math.abs(distance(leg.knee,leg.ankle)-leg.length)<1e-7);
  assert.ok(Math.abs(leg.ankle.x-(foot.x-Math.sin(foot.pitch)*h*.075))<1e-7,'joint follows the rotated solid ankle');
 }
}
for(const boundary of [0,.12,.5,.62,1]){
 const a=R.pose((boundary-eps)*stride,h),b=R.pose((boundary+eps)*stride,h);
 for(let i=0;i<2;i++)assert.ok(Math.hypot(a.feet[i].x-b.feet[i].x,a.feet[i].y-b.feet[i].y)<.01,'position is continuous across support and loop boundaries');
 const left=R.pose((boundary-2*eps)*stride,h),right=R.pose((boundary+2*eps)*stride,h);
 for(let i=0;i<2;i++){
  const va=(a.feet[i].x-left.feet[i].x)/(eps*stride),vb=(right.feet[i].x-b.feet[i].x)/(eps*stride);
  assert.ok(Math.abs(va-vb)<.001,'horizontal velocity is continuous at support changes');
 }
}
for(const facing of [-1,1]){
 const d1=.1*stride,d2=.3*stride,f1=R.pose(d1,h).feet[0],f2=R.pose(d2,h).feet[0];
 assert.ok(f1.contact&&f2.contact);
 assert.ok(Math.abs((facing*d1-facing*f1.x)-(facing*d2-facing*f2.x))<1e-9,'support foot stays fixed in world space');
}
const from=R.pose(.8*stride,h),landed=R.settle(from,h,h,240),rest=R.rest(h);
assert.deepEqual(landed,rest,'arrival settles into a planted two-foot rest');
console.log('PASS: two feet, continuous positions and velocities, planted support in both directions and exact settled rest');
