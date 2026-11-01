'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),{createCanvas,loadImage}=require('@napi-rs/canvas'),T=require('../dist/music-torso.js');
global.document={createElement:()=>createCanvas(1,1)};
(async()=>{
 const dir='dist/assets/music-render-v38/',meta=JSON.parse(fs.readFileSync(dir+'manifest.json'));
 const [body,whole,moving,original]=await Promise.all([dir+'body.png',dir+'whole.png',dir+'moving.png','sources/v23/music-rig.png'].map(loadImage));
 const rig=T.create(body,whole,moving,meta),c=createCanvas(340,680),ctx=c.getContext('2d');
 // The exact original face AND full neck must survive each expression.
 for(let expression=0;expression<3;expression++){
  ctx.clearRect(0,0,340,680);ctx.drawImage(original,-[150,600,1080][expression],0);
  const source=ctx.getImageData(0,0,340,400).data;
  const target=rig.pose('open',[0,0],expression).body.getContext('2d').getImageData(0,0,340,400).data;
  for(let i=0;i<source.length;i+=4)if(source[i+3]>240)for(let k=0;k<4;k++)assert.equal(target[i+k],source[i+k],'original full neck must not be replaced at y365');
 }
 let poses=0;
 for(const style of meta.styles)for(let level=-8;level<=8;level+=.5){
  const pose=rig.pose(style,[level,-level]),a=pose.canvas.getContext('2d').getImageData(0,0,460,680).data;
  // Flood fill each actual painted shoulder root to the grasp, through alpha.
  for(let side=0;side<2;side++){
   const root={x:side?240:100,y:395},hand=pose.contacts[side],seen=new Uint8Array(460*680),q=[];
   for(let y=root.y-3;y<=root.y+3;y++)for(let x=root.x-3;x<=root.x+3;x++)if(a[(y*460+x+60)*4+3]>32){q.push(y*460+x+60);seen[q.at(-1)]=1}
   for(let i=0;i<q.length;i++){const p=q[i],x=p%460,y=Math.floor(p/460);for(const n of [x?p-1:-1,x<459?p+1:-1,y?p-460:-1,y<679?p+460:-1])if(n>=0&&!seen[n]&&a[n*4+3]>32){seen[n]=1;q.push(n)}}
   let connected=false;for(let y=Math.round(hand.y)-5;y<=Math.round(hand.y)+5;y++)for(let x=Math.round(hand.x)-5;x<=Math.round(hand.x)+5;x++)if(seen[y*460+x+60])connected=true;
   assert.ok(connected,style+' must remain connected at '+level);
  }
  for(const [x,y,w,h] of meta.tiles[style]){
   const p=[{x,y},{x:x+w,y},{x:x+w,y:y+h},{x,y:y+h}].map(p=>T.warp(p,[level,-level],style));
   for(const [a,b,c] of [[p[0],p[1],p[2]],[p[0],p[2],p[3]]])assert.ok((b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x)>0,'skin cannot fold or reverse a triangle');
  }
  poses++;
 }
 console.log('PASS: full original face/neck through y399 in all expressions; '+poses+' continuous positive/negative arm poses; actual shoulder-to-grasp raster connectivity and no folded skin triangles');
})().catch(e=>{console.error(e);process.exitCode=1});
