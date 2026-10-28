const assert=require('node:assert/strict'),I=require('../dist/interaction.js');
const alpha=new Uint8Array(100*120);
for(let y=10;y<110;y++)for(let x=20;x<70;x++)alpha[y*100+x]=255;
// Transparent hole inside the bounding rectangle must remain ground.
for(let y=60;y<90;y++)for(let x=28;x<63;x++)alpha[y*100+x]=0;
const g={height:500},base={alpha,width:100,height:120,cx:200,cy:450,scale:1,stretch:1,anchorX:50,anchorY:120,headBottom:50};
function point(v,x,y){const dx=(x-v.anchorX)*v.scale,dy=(y-v.anchorY)*v.scale*v.stretch,c=Math.cos(v.rotate||0),s=Math.sin(v.rotate||0);return {x:v.cx+(dx*c-dy*s)*(v.mirror?-1:1),y:v.cy+dx*s+dy*c}}
for(const variant of [{},{mirror:true},{rotate:.22,stretch:1.015},{scale:.55,mirror:true,rotate:-.17,stretch:1.004}]){
 const v={...base,...variant};for(const [x,y,want] of [[45,30,'head'],[24,100,'belly'],[45,75,'ground'],[85,75,'ground']]){const p=point(v,x,y);assert.equal(I.hitRendered(p.x,p.y,g,v),want,'actual opaque pixels, inverse rotation/scale/mirroring and transparent holes')}
 const edge=point(v,17,30);assert.equal(I.hitRendered(edge.x,edge.y,g,v),'head','a small tolerance helps fingers at the feather boundary');
}
assert.equal(I.hitRendered(4,4,g,base),'empty');
const results=[30,60,120].map(fps=>{let x=0;for(let t=0;t<fps;t++)x=I.follow(x,1,1000/fps);return x});
for(const x of results)assert.ok(Math.abs(x-results[0])<1e-12,'gaze smoothing has the same response at 30/60/120 FPS');
console.log('PASS: rendered silhouette touch, transparency, transformed poses, edge tolerance and frame-rate-independent response');

const lying={...base,headRegion:{cx:45,cy:75,rx:25,ry:35}};const lyingPoint=point(lying,24,100);assert.equal(I.hitRendered(lyingPoint.x,lyingPoint.y,g,lying),'belly');const lowerFace=point(lying,30,95);assert.equal(I.hitRendered(lowerFace.x,lowerFace.y,g,lying),'head','a lying head can extend below the standing head boundary');
