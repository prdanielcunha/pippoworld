const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const {prepareReferencePixels}=require('../dist/sprite-rendering.js'),meta=require('../dist/assets/canon/poses.json');
for(const [sheet,p] of Object.entries(meta.provenance)){
 const bytes=fs.readFileSync('dist/assets/canon/'+p.file);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),p.sha256,'approved original file is byte-for-byte unchanged: '+sheet);
}
for(const name of ['walk0','walk1','walk2','walk3','front','left','right','sit','rest','rise','wave','observe','receive','hold','return','lookBack',...['neutral','happy','curious','surprised','laugh','affection','wink','sleepy','playful','focused','listening','calm'].map(x=>'face_'+x)]){
 const p=meta.poses[name];assert.ok(p&&p.runs.length>0,name+' is an approved source crop');assert.ok(p.anchor>=0&&p.anchor<=p.w);
 for(let i=0;i<p.runs.length;i+=3){assert.ok(p.runs[i]>=0&&p.runs[i]<p.h);assert.ok(p.runs[i+1]>=0&&p.runs[i+1]+p.runs[i+2]<=p.w)}
}
const w=16,h=16,input=new Uint8ClampedArray(w*h*4),runs=[];for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=(y*w+x)*4;input.set([x*11,y*13,71,255],i)}
for(let y=2;y<10;y++)runs.push(y,2,8);const out=prepareReferencePixels(input,w,h,runs);
for(let y=6;y<10;y++)for(let x=6;x<10;x++){const p=(y*w+x)*4;assert.deepEqual([...out.slice(p,p+3)],[...input.slice(p,p+3)],'interior source RGB remains unchanged');assert.equal(out[p+3],255)}
assert.equal(out[3],0,'paper outside the source silhouette is transparent');assert.ok([...out].filter((_,i)=>i%4===3).some(v=>v>0&&v<255),'boundary retains fractional coverage');
const face=prepareReferencePixels(input,w,h,runs,{neckFade:4,sourceHeight:12});assert.ok(face[(13*w+8)*4+3]===0,'expression crop cannot leave the original flat shoulder strip');
const app=fs.readFileSync('dist/app.js','utf8');assert.ok(!app.includes("image('assets/walk-cycle-v2.png')"),'rejected generated profile is never loaded');assert.ok(!app.includes("image('assets/walk-rig-v1.png')"),'rejected detached-leg rig is never loaded');
console.log('PASS: immutable approved originals, source/mask coverage, complete pose inventory, exact interior RGB, neck masking and rejected assets excluded');
