'use strict';
// Prepared once when the atlas loads; never blur the character artwork per frame.
function prepareSpritePixels(input,width,height,seed,bounds){
 const size=width*height,core=new Uint8Array(size),queue=[seed[1]*width+seed[0]];core[queue[0]]=1;
 const neighbors=p=>{const x=p%width,y=Math.floor(p/width);return [x>0?p-1:-1,x+1<width?p+1:-1,y>0?p-width:-1,y+1<height?p+width:-1];};
 while(queue.length){const p=queue.pop();for(const n of neighbors(p))if(n>=0&&!core[n]&&input[n*4+3]>220){core[n]=1;queue.push(n);}}
 // Restore the original fractional-alpha fringe only within two pixels of the core.
 const owner=new Int32Array(size).fill(-1),distance=new Uint8Array(size).fill(255);
 for(let i=0;i<size;i++)if(core[i]){owner[i]=i;distance[i]=0;}
 for(let pass=1;pass<=2;pass++)for(let i=0;i<size;i++)if(distance[i]===255&&input[i*4+3]>=12){
  for(const n of neighbors(i))if(n>=0&&distance[n]<pass){const o=owner[n];let delta=0;for(let k=0;k<3;k++)delta+=Math.abs(input[i*4+k]-input[o*4+k]);if(delta<150){owner[i]=o;distance[i]=pass;break;}}
 }
 const alpha=new Float32Array(size);
 for(let i=0;i<size;i++)if(owner[i]>=0)alpha[i]=input[i*4+3];
 // One-pixel coverage filter; RGB inside the silhouette remains unfiltered.
 const pad=3,outW=bounds.w+pad*2,outH=bounds.h+pad*2,out=new Uint8ClampedArray(outW*outH*4),kernel=[1,2,1];
 for(let y=0;y<outH;y++)for(let x=0;x<outW;x++){
  const sx=bounds.x+x-pad,sy=bounds.y+y-pad;if(sx<0||sx>=width||sy<0||sy>=height)continue;
  const p=sy*width+sx;let a=0,nearest=owner[p];
  for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const xx=sx+dx,yy=sy+dy;if(xx<0||xx>=width||yy<0||yy>=height)continue;const n=yy*width+xx;a+=alpha[n]*kernel[dx+1]*kernel[dy+1];if(nearest<0&&owner[n]>=0)nearest=owner[n];}
  a/=16;if(a<1||nearest<0)continue;const target=(y*outW+x)*4;
  const color=core[p]?p:nearest;for(let k=0;k<3;k++)out[target+k]=input[color*4+k];out[target+3]=Math.round(a);
 }
 // Contact spans are measured from the grounded part of the feet, not the tail or body.
 const runs=[];let start=-1;const bottom=bounds.y+bounds.h-1;
 for(let x=bounds.x;x<=bounds.x+bounds.w;x++){let hit=false;if(x<bounds.x+bounds.w)for(let y=Math.max(bounds.y,bottom-5);y<=bottom;y++)if(core[y*width+x]){hit=true;break;}
  if(hit&&start<0)start=x;if(!hit&&start>=0){if(x-start>=3)runs.push({x:(start+x-1)/2-bounds.x,width:x-start});start=-1;}}
 return {pixels:out,width:outW,height:outH,pad,contacts:runs};
}
if(typeof module!=='undefined')module.exports={prepareSpritePixels};

function prepareReferencePixels(input,width,height,runs,{neckFade=0,sourceHeight=height-4,paperRows=null}={}){
 const out=new Uint8ClampedArray(input),mask=new Uint8Array(width*height),core=new Uint8Array(width*height);
 for(let i=0;i<runs.length;i+=3){const row=runs[i]+2,start=runs[i+1]+2;mask.fill(1,row*width+start,row*width+start+runs[i+2])}
 // Pull the matte in by one pixel before coverage filtering. This prevents
 // the original ivory paper from becoming a white fringe on a colored scene.
 for(let y=1;y<height-1;y++)for(let x=1;x<width-1;x++){
  const n=y*width+x;let inside=true;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(!mask[n+dy*width+dx])inside=false;core[n]=inside?1:0;
 }
 // Color samples must come from beyond the original antialiased paper edge.
 // The previous nearest-core lookup could select the contaminated pixel itself.
 let colorCore=core;
 if(paperRows)for(let pass=0;pass<2;pass++){
  const next=new Uint8Array(width*height);
  for(let y=1;y<height-1;y++)for(let x=1;x<width-1;x++){
   const n=y*width+x;let inside=true;
   for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(!colorCore[n+dy*width+dx])inside=false;
   next[n]=inside?1:0;
  }
  colorCore=next;
 }
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const n=y*width+x;let coverage=0;
  for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const xx=x+dx,yy=y+dy;if(xx>=0&&yy>=0&&xx<width&&yy<height)coverage+=core[yy*width+xx]*(dx===0?2:1)*(dy===0?2:1)}
  out[n*4+3]=Math.round(255*coverage/16);
  if(coverage>0&&coverage<16){let found=-1,best=Infinity;for(let dy=-3;dy<=3;dy++)for(let dx=-3;dx<=3;dx++){const xx=x+dx,yy=y+dy,d=dx*dx+dy*dy;if(xx>=0&&yy>=0&&xx<width&&yy<height&&core[yy*width+xx]&&d<best){found=(yy*width+xx)*4;best=d}}if(found>=0)for(let k=0;k<3;k++)out[n*4+k]=input[found+k]}
  if(paperRows&&coverage>0&&!colorCore[n]){
   let found=-1,best=Infinity;
   for(let dy=-6;dy<=6;dy++)for(let dx=-6;dx<=6;dx++){
    const xx=x+dx,yy=y+dy,d=dx*dx+dy*dy;
    if(xx>=0&&yy>=0&&xx<width&&yy<height&&colorCore[yy*width+xx]&&d<best){found=(yy*width+xx)*4;best=d}
   }
   if(found>=0){
    const row=Math.max(0,Math.min(sourceHeight-1,y-2))*3;let numerator=0,denominator=0;
    for(let k=0;k<3;k++){const delta=input[found+k]-paperRows[row+k];numerator+=(input[n*4+k]-paperRows[row+k])*delta;denominator+=delta*delta}
    const matte=denominator>100?Math.max(0,Math.min(1,numerator/denominator)):1;
    out[n*4+3]=Math.round(out[n*4+3]*matte);
    for(let k=0;k<3;k++)out[n*4+k]=input[found+k];
   }
  }
  if(neckFade>0){const fade=Math.max(0,Math.min(1,(sourceHeight-(y-2))/neckFade));out[n*4+3]=Math.round(out[n*4+3]*fade)}
 }
 return out;
}
if(typeof module!=='undefined')module.exports.prepareReferencePixels=prepareReferencePixels;
