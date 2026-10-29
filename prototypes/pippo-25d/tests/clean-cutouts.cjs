const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto'),vm=require('node:vm'),{spawnSync}=require('node:child_process');
const meta=require('../dist/assets/canon/poses.json'),clean=require('../dist/assets/clean-v2/sprites.json');
const poses=Object.keys(meta.poses).filter(n=>!n.startsWith('face_')&&n!=='body_front');
assert.equal(poses.length,36);assert.equal(Object.keys(clean.sprites).length,48);
const decoded={};
for(const [name,p] of Object.entries(clean.atlases)){
 const path='dist/assets/clean-v2/'+p.file,bytes=fs.readFileSync(path);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),p.sha256);
 const raw=spawnSync('python3',['-c','from PIL import Image;import sys;sys.stdout.buffer.write(Image.open(sys.argv[1]).convert("RGBA").tobytes())',path],{maxBuffer:32*1024*1024});assert.equal(raw.status,0);decoded[name]=raw.stdout;
}
for(const [name,p] of Object.entries(clean.sprites)){
 const data=Buffer.alloc(p.w*p.h*4),atlas=decoded[p.atlas];
 for(let y=0;y<p.h;y++)atlas.copy(data,y*p.w*4,((p.y+y)*2048+p.x)*4,((p.y+y)*2048+p.x+p.w)*4);
 assert.equal(crypto.createHash('sha256').update(data).digest('hex'),p.pixels_sha256,'registered prepared RGBA: '+name);
 assert.ok(data.some((v,i)=>i%4===3&&v===0),'transparent background: '+name);
 if(name.startsWith('assembled_'))assert.deepEqual([p.w,p.h],[400,400]);else assert.deepEqual([p.w,p.h],[meta.poses[name].w+4,meta.poses[name].h+4]);
}
// Execute the real loader and draw paths. Crop coordinates, alpha from uploaded
// pixels and sprite anchors must survive; old paper processing must not run.
const draws=[],nodes=new Map();let mattingCalls=0;
function makeCanvas(){const c={width:0,height:0,dataset:{}};let pixels;
 c.getContext=()=>({drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh){assert.equal(sw,c.width);assert.equal(sh,c.height);assert.equal(dx,0);assert.equal(dy,0);pixels=Buffer.alloc(sw*sh*4);const atlas=decoded[img.group];for(let y=0;y<sh;y++)atlas.copy(pixels,y*sw*4,((sy+y)*2048+sx)*4,((sy+y)*2048+sx+sw)*4)},getImageData(){return {data:pixels}}});return c}
const actor=makeCanvas();
const context={console,Uint8Array,Map,Math,document:{createElement:makeCanvas},window:{},canvas:actor,state:{},prepareReferencePixels(){mattingCalls++;throw Error('double matting')},$:n=>{if(!nodes.has(n))nodes.set(n,{disabled:true,remove(){}});return nodes.get(n)},resize(){},requestAnimationFrame(){},frame(){},Image:class{set src(v){this.group=v.includes('expressions.png')?'expressions':'poses';queueMicrotask(()=>this.onload())}},fetch:async url=>({ok:true,json:async()=>url.includes('clean-v2')?clean:meta}),PippoInteraction:{walkFrame:()=>2,turnPose:()=> 'quarterRight',hitRendered:()=>{}},drawGroundShadow(){},ballDuration:2000};
vm.runInNewContext(fs.readFileSync('dist/canonical-art.js','utf8'),context);
context.window.PippoCanon.loading.then(()=>{
 const api=context.window.PippoCanon;assert.equal(api.ready,true);assert.equal(actor.dataset.artMask,clean.revision);
 const g={width:600,height:650,cx:300,bottom:600,bodyHeight:323};
 const ctx={save(){},restore(){},translate(){},scale(){},rotate(){},drawImage(...args){draws.push(args)}};
 for(const expression of api.names){context.state={expression,time:0,ballTime:null,reduced:true};api.draw(ctx,g);const args=draws.at(-1);assert.deepEqual(args.slice(1),[-200,-390,400,400]);assert.equal(args[0].width,400)}
 context.state={motion:{walk:{}},facing:1,walkDistance:100,ballTime:null,reduced:true};api.draw(ctx,g);assert.equal(actor.dataset.pose,'walk2');assert.equal(draws.at(-1)[0].width,meta.poses.walk2.w+4);
 context.state={motion:{kind:'rest'},ballTime:null,reduced:true};api.draw(ctx,g);assert.equal(actor.dataset.pose,'rest');
 assert.equal(mattingCalls,0);assert.ok(!fs.readFileSync('dist/canonical-art.js','utf8').includes('collar.data['));
 console.log('PASS: 48 registered prepared RGBA sprites, immutable atlas hashes, native registration, 12 full-expression anchors, walking/rest loading and no second mask/composite');
}).catch(e=>{console.error(e);process.exitCode=1});
