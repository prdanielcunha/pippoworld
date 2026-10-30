'use strict';
(()=>{
 let age=1600,image,loading,alpha=[];
 const ys=[[0,30,480,510,800,910,1024],[0,60,510,540,790,910,1024],[0,90,540,570,770,905,1024]];
 function prepare(){if(loading)return loading;loading=new Promise(resolve=>{const i=new Image;i.onload=()=>{image=i;for(let n=0;n<3;n++){const c=document.createElement('canvas');c.width=512;c.height=1024;const ctx=c.getContext('2d');ctx.drawImage(i,n*512,0,512,1024,0,0,512,1024);const data=ctx.getImageData(0,0,512,1024).data;alpha.push(Uint8Array.from({length:512*1024},(_,k)=>data[k*4+3]))}resolve(true)};i.onerror=()=>resolve(false);i.src='assets/music-rig-v23/sit.webp'});return loading}
 function mapY(y,from,to){let i=0;while(i<from.length-2&&y>from[i+1])i++;return to[i]+(y-from[i])/(from[i+1]-from[i])*(to[i+1]-to[i])}
 const api=window.PippoStation={prepare,enter(reduced=false){age=reduced?1600:0;prepare();window.PippoGait?.prepare()},advance(dt){age=Math.min(1600,age+Math.max(0,dt))},interrupt(){age=1600},cancel(){age=1600},inspect:()=>PippoStationMotion.sample(age),draw(ctx,g,st){
  const motion=PippoStationMotion.sample(age,st.reduced);if(motion.phase==='ready')return null;
  window.PippoMusicRig?.clear();const h=Math.min(g.height*.77,g.width*1.28),bottom=g.height*((st.musicInstrument||'keyboard')==='drum'?.83:.89),cx=g.width*motion.x;
  if(motion.phase==='approach'){
   const walkG={...g,cx,bottom,bodyHeight:h};const distance=motion.distance*g.width;const gait=window.PippoGait?.draw(ctx,walkG,st,distance,true);if(gait)return {...gait,pose:'station_approach_'+gait.index};
   return window.PippoCanon.drawRegistered(ctx,'walk'+PippoInteraction.walkFrame(distance,h,4),walkG,{mirror:true,shadow:false});
  }
  if(motion.phase==='turn')return window.PippoCanon.drawRegistered(ctx,['right','quarterRight','front'][motion.view],{...g,cx,bottom,bodyHeight:h},{shadow:false});
  if(!image)return null;
  const q=motion.sit,at=q*2,a=Math.min(1,Math.floor(at)),b=a+1,u=at-a,which=u<.5?a:b,to=ys[a].map((y,k)=>y*(1-u)+ys[b][k]*u),from=ys[which],s=h/820,x=g.width*.5-280*s,y=bottom-910*s;
  // Continuous vertical deformation of one complete pose; no blended faces.
  for(let sy=0;sy<1024;sy+=8){const end=Math.min(1024,sy+8),dy=mapY(sy,from,to),dh=mapY(end,from,to)-dy;ctx.drawImage(image,which*512,sy,512,end-sy,x,y+dy*s,512*s,dh*s+.3)}
  return {pose:'station_sit_'+Math.round(q*100),hit:{alpha:alpha[which],width:512,height:1024,cx:g.width*.5,cy:bottom,scale:s,stretch:1,anchorX:280,anchorY:910,headBottom:540}};
 }};
})();
