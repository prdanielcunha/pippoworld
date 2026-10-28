const assert=require('node:assert/strict');
const {prepareSpritePixels}=require('../dist/sprite-rendering.js');
const w=20,h=20,input=new Uint8ClampedArray(w*h*4);function pixel(x,y,a,r=240,g=150,b=40){input.set([r,g,b,a],(y*w+x)*4)}
for(let y=4;y<=14;y++)for(let x=4;x<=15;x++)pixel(x,y,255);
for(let y=4;y<=14;y++){pixel(3,y,110);pixel(16,y,110)}pixel(2,2,255,255,0,0);
const out=prepareSpritePixels(input,w,h,[9,9],{x:4,y:4,w:12,h:11});
const at=(x,y)=>Array.from(out.pixels.slice((y*out.width+x)*4,(y*out.width+x)*4+4));
assert.deepEqual(at(8,8),[240,150,40,255],'interior colors must remain untouched');
assert.equal(at(1,1)[3],0,'disconnected red background must be removed');
assert(out.pixels.some((v,i)=>i%4===3&&v>0&&v<220),'fractional coverage must survive');
assert(at(2,8)[3]>0,'fringe must extend outside the previous hard crop');
assert.equal(out.pad,3);assert.equal(out.contacts.length,1);
assert(out.contacts[0].width>=10,'ground contact must span the planted area');
console.log('PASS: interior fidelity, disconnected noise removal, fractional alpha, padded fringe and grounded contact');
