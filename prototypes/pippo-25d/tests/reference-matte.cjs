const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),{spawnSync}=require('node:child_process');
const {prepareReferencePixels}=require('../dist/sprite-rendering.js'),meta=require('../dist/assets/canon/poses.json');
const old={module:{exports:{}}};vm.runInNewContext(fs.readFileSync('tests/fixtures/sprite-rendering-v16.js','utf8'),old);
const previous=old.module.exports.prepareReferencePixels;
const sheets={};let beforeTotal=0,afterTotal=0,interior=0;
for(const [name,p] of Object.entries(meta.poses)){
 assert.equal(p.paperRows.length,p.h*3,'paper estimate follows each source row');
 if(!sheets[p.sheet]){const raw=spawnSync('python3',['-c','from PIL import Image; import sys; sys.stdout.buffer.write(Image.open(sys.argv[1]).convert("RGBA").tobytes())','dist/assets/canon/'+meta.provenance[p.sheet].file],{maxBuffer:20*1024*1024});assert.equal(raw.status,0);sheets[p.sheet]=raw.stdout}
 const source=sheets[p.sheet],sw=1448,width=p.w+4,height=p.h+4,input=new Uint8ClampedArray(width*height*4),mask=new Uint8Array(width*height);
 for(let y=0;y<p.h;y++)input.set(source.subarray(((p.sy+y)*sw+p.sx)*4,((p.sy+y)*sw+p.sx+p.w)*4),((y+2)*width+2)*4);
 for(let i=0;i<p.runs.length;i+=3)mask.fill(1,(p.runs[i]+2)*width+p.runs[i+1]+2,(p.runs[i]+2)*width+p.runs[i+1]+2+p.runs[i+2]);
 const opts={paperRows:p.paperRows,neckFade:p.neck?p.h-p.neck.blendStart:0,sourceHeight:p.h},out=prepareReferencePixels(input,width,height,p.runs,opts),base=previous(input,width,height,p.runs,opts);
 let oldPale=0,newPale=0,alphaOld=0,alphaNew=0;
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const i=(y*width+x)*4;alphaOld+=base[i+3];alphaNew+=out[i+3];assert.ok(out[i+3]<=base[i+3],'unmatting never adds silhouette: '+name);
  let deep=true;for(let dy=-3;dy<=3&&deep;dy++)for(let dx=-3;dx<=3;dx++){const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=width||yy>=height||!mask[yy*width+xx]){deep=false;break}}
  if(deep){for(let k=0;k<4;k++)assert.equal(out[i+k],base[i+k],'protected interior, including whites/cream/neck: '+name);interior++}
  else{const row=Math.max(0,Math.min(p.h-1,y-2))*3;const pale=pixels=>pixels[i+3]>64&&pixels[i]>p.paperRows[row]-10&&pixels[i+1]>p.paperRows[row+1]-12&&pixels[i+2]>p.paperRows[row+2]-15;if(pale(base))oldPale++;if(pale(out))newPale++}
 }
 assert.ok(alphaNew/alphaOld>.97,'retain at least 97% alpha area: '+name);
 assert.ok(newPale<=oldPale,'no increase in paper-like contour: '+name);
 beforeTotal+=oldPale;afterTotal+=newPale;
}
assert.ok(afterTotal<beforeTotal*.3,'reduce paper-like edge samples without color-keying genuine white details');
console.log('PASS: all 49 crops, protected interior '+interior+' pixels; paper-like edge samples '+beforeTotal+' -> '+afterTotal+'; no added silhouette, retained area and row-local matting');
