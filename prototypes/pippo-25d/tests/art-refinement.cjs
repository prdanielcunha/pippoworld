const assert=require('node:assert/strict'),fs=require('node:fs'),meta=require('../dist/assets/canon/poses.json');
function kept(name,x,y){const p=meta.poses[name];x-=p.sx;y-=p.sy;for(let i=0;i<p.runs.length;i+=3)if(p.runs[i]===y&&x>=p.runs[i+1]&&x<p.runs[i+1]+p.runs[i+2])return true;return false}
for(const [name,x,y] of [['return',1368,644],['return',1368,659],['observe',284,645],['reach',1343,954]])assert.equal(kept(name,x,y),false,'loose source ball and stripe are excluded: '+name);
assert.equal(kept('body_front',158,223),false,'old left cheek must not become a neck spike');assert.equal(kept('body_front',280,223),false,'old right cheek must not become a neck spike');assert.equal(kept('body_front',220,240),true,'retain the actual body neck');
const wink=meta.poses.face_wink;assert.equal(kept('face_wink',wink.sx+70,wink.sy+268),true,'keep the lower cheek that a generic 87% crop cut off');
for(const [name,p] of Object.entries(meta.poses).filter(([name])=>name.startsWith('face_'))){assert.ok(p.neck&&p.neck.x>0&&p.neck.x<p.w);assert.ok(p.h>p.neck.y+5,'retain original collar below the measured neck');assert.ok(p.neck.blendStart<p.neck.y,'feather begins above the registration line')}
assert.notEqual(meta.poses.face_affection.neck.x/meta.poses.face_affection.w,wink.neck.x/wink.w,'register tilted expressions by their own neck centers');
const code=fs.readFileSync('dist/canonical-art.js','utf8');assert.ok(!code.includes('p.h*.87'),'renderer must not restore the generic face-cut rectangle');assert.ok(code.includes("sprite('body_front')"),'assemble from the true head-free body');
const {prepareReferencePixels}=require('../dist/sprite-rendering.js');
// A broad collar must fade over many rows, not end as a four-pixel flat strip.
const width=30,height=46,input=new Uint8ClampedArray(width*height*4).fill(255),runs=[];
for(let y=0;y<40;y++)runs.push(y,0,26);
const feather=prepareReferencePixels(input,width,height,runs,{neckFade:24,sourceHeight:40});
const alphas=Array.from({length:20},(_,n)=>feather[((n+19)*width+12)*4+3]);
assert.ok(new Set(alphas).size>=18,'the collar has a gradual multi-row transition');
for(let n=1;n<alphas.length;n++)assert.ok(alphas[n]<=alphas[n-1]&&alphas[n]>0,'no gap or hard step inside the collar');
assert.ok(code.includes('collar.data[i+3]*torso.data[i+3]/255'),'extended collar is constrained to the real torso silhouette');
console.log('PASS: single ball, intact cheeks, extended original collars, gradual neck alpha and torso silhouette constraint');

for(const [name,x,y] of [['crouch',846,980],['crouch',933,1001],['crouch',929,1008],['above',108,1005],['above',206,1024],['above',226,1035],['top',803,994],['top',873,1009],['top',865,1023],['top',973,983]])assert.equal(kept(name,x,y),false,'painted source floor is not duck silhouette: '+name);
console.log('PASS: crouch and overhead paper-floor samples excluded, including enclosed wing gaps');
