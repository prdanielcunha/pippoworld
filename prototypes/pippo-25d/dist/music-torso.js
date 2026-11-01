'use strict';
// Complete clean limbs. Upper-arm caps stay fixed; only a feathered wrist
// collar and its attached hand/tool turn. No pose quantization or triangle mesh.
const PippoMusicTorso=(()=>{
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),smooth=t=>t*t*(3-2*t);
 const contacts={open:[{x:85,y:518},{x:255,y:518}],grip:[{x:114,y:470},{x:232,y:470}],shaker:[{x:85,y:518},{x:290,y:434}]};
 const shoulder=[{x:80,y:382},{x:260,y:382}];
 const wrists={open:[{x:62,y:455},{x:285,y:455}],grip:[{x:66,y:438},{x:286,y:438}],shaker:[{x:62,y:455},{x:281,y:420}]};
 function support(p,side,style){const along=smooth(clamp((p.y-395)/60,0,1));return style==='shaker'&&side===1?Math.max(along,smooth(clamp((p.x-260)/17,0,1))):along}
 function rotation(level,side,style='grip'){return (side?1:-1)*level/8*(style==='open'?.20:style==='shaker'?.22:.28)}
 function warp(p,levels,style='grip'){const side=p.x<170?0:1,c=wrists[style][side],a=rotation(levels[side],side,style)*support(p,side,style),dx=p.x-c.x,dy=p.y-c.y;return {x:c.x+Math.cos(a)*dx-Math.sin(a)*dy,y:c.y+Math.sin(a)*dx+Math.cos(a)*dy}}
 function create(bodyAtlas,staticAtlas,movingAtlas,meta){
  const caps={},parts={},bodies=new Map(),whole={},meshes={};
  for(const [row,style] of (meta.revision<38?meta.styles.entries():[])){
   const c=document.createElement('canvas');c.width=340;c.height=680;c.getContext('2d').drawImage(staticAtlas,row*340,0,340,680,0,0,340,680);caps[style]=c;
   parts[style]=[0,1].map(side=>{const p=document.createElement('canvas');p.width=340;p.height=680;p.getContext('2d').drawImage(movingAtlas,(row*2+side)*340,0,340,680,0,0,340,680);return p});
  }
  for(const [row,style] of meta.styles.entries()){
   const c=document.createElement('canvas');c.width=340;c.height=680;
   const cc=c.getContext('2d');
   if(meta.revision>=38)cc.drawImage(staticAtlas,row*340,0,340,680,0,0,340,680);
   else {cc.drawImage(caps[style],0,0);for(const part of parts[style])cc.drawImage(part,0,0)}
   whole[style]=c;
   const cells=meta.tiles?.[style]||Array.from({length:43*22},(_,i)=>[(i%22)*16,Math.floor(i/22)*16,16,16]);
   meshes[style]=cells.flatMap(([x,y,w,h])=>{
    const a={x,y},b={x:x+w,y},c={x:x+w,y:y+h},d={x,y:y+h};return [[a,b,c],[a,c,d]];
   });
  }
  let gpu=null;
  if(meta.revision>=38)try{
   const canvas=document.createElement('canvas');canvas.width=460;canvas.height=680;
   const gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:true,preserveDrawingBuffer:true,antialias:false});
   if(gl&&gl.getParameter(gl.VERSION)){
    const shader=(type,code)=>{const sh=gl.createShader(type);gl.shaderSource(sh,code);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw Error('arm shader');return sh};
    const program=gl.createProgram();
    gl.attachShader(program,shader(gl.VERTEX_SHADER,'attribute vec2 position;attribute vec2 uv;varying vec2 tex;void main(){tex=uv;gl_Position=vec4((position.x+60.0)/460.0*2.0-1.0,1.0-position.y/680.0*2.0,0.0,1.0);}'));
    gl.attachShader(program,shader(gl.FRAGMENT_SHADER,'precision mediump float;varying vec2 tex;uniform sampler2D art;void main(){gl_FragColor=texture2D(art,tex);}'));
    gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('arm program');gl.useProgram(program);
    const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    for(const [name,offset] of [['position',0],['uv',8]]){const loc=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,16,offset)}
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
    const textures={};for(const style of meta.styles){const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,whole[style]);textures[style]=texture}
    gpu={canvas,gl,buffer,textures,arrays:Object.fromEntries(meta.styles.map(style=>[style,new Float32Array(meshes[style].length*12)]))};
   }
  }catch(_){gpu=null}
  function accelerated(style,levels){
   if(!gpu||gpu.gl.isContextLost())return false;
   const {gl,canvas,buffer,textures,arrays}=gpu,data=arrays[style];let i=0;
   for(const vertices of meshes[style])for(const source of vertices){const target=warp(source,levels,style);data[i++]=target.x;data[i++]=target.y;data[i++]=source.x/340;data[i++]=source.y/680}
   gl.viewport(0,0,460,680);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,data,gl.DYNAMIC_DRAW);gl.bindTexture(gl.TEXTURE_2D,textures[style]);gl.drawArrays(gl.TRIANGLES,0,data.length/4);
   ctx.drawImage(canvas,-60,0);return true;
  }
  // A continuous skin field moves a single painted arm. No independently
  // rotated cap/collar can reveal a second forearm edge. UVs share vertices.
  function triangle(texture,source,dest){
   const [a,b,c]=source,[p,q,r]=dest,den=(b.x-a.x)*(c.y-a.y)-(c.x-a.x)*(b.y-a.y);
   const A=((q.x-p.x)*(c.y-a.y)-(r.x-p.x)*(b.y-a.y))/den;
   const C=((r.x-p.x)*(b.x-a.x)-(q.x-p.x)*(c.x-a.x))/den;
   const B=((q.y-p.y)*(c.y-a.y)-(r.y-p.y)*(b.y-a.y))/den;
   const D=((r.y-p.y)*(b.x-a.x)-(q.y-p.y)*(c.x-a.x))/den;
   const mid={x:(p.x+q.x+r.x)/3,y:(p.y+q.y+r.y)/3};
   ctx.save();ctx.beginPath();for(let i=0;i<3;i++){const v=dest[i],dx=v.x-mid.x,dy=v.y-mid.y,len=Math.hypot(dx,dy)||1;ctx[i?'lineTo':'moveTo'](v.x+dx/len*.35,v.y+dy/len*.35)}ctx.closePath();ctx.clip();
   ctx.transform(A,B,C,D,p.x-A*a.x-C*a.y,p.y-B*a.x-D*a.y);ctx.drawImage(texture,0,0);ctx.restore();
  }
  const output=document.createElement('canvas');output.width=460;output.height=680;const ctx=output.getContext('2d');
  function body(expression,drum){const key=expression+':'+drum;if(!bodies.has(key)){const c=document.createElement('canvas');c.width=340;c.height=680;c.getContext('2d').drawImage(bodyAtlas,...meta.frames[drum?'drumFrames':'bodyFrames'][expression],0,0,340,680);bodies.set(key,c)}return bodies.get(key)}
  function pose(style,levels,expression=0,drum=false){
   ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,460,680);ctx.translate(60,0);
   const rotations=levels.map((level,side)=>rotation(level,side,style));
   if(meta.revision<38){ctx.drawImage(caps[style],0,0);for(let side=0;side<2;side++){const w=wrists[style][side];ctx.save();ctx.translate(w.x,w.y);ctx.rotate(rotations[side]);ctx.drawImage(parts[style][side],-w.x,-w.y);ctx.restore()}}
   else if(levels.every(level=>Math.abs(level)<.0001))ctx.drawImage(whole[style],0,0);
   else if(!accelerated(style,levels))for(const vertices of meshes[style])triangle(whole[style],vertices,vertices.map(p=>warp(p,levels,style)));
   return {backend:gpu&&!gpu.gl.isContextLost()?'webgl':'canvas',canvas:output,front:output,body:body(expression,drum),levels,rotations,style,contacts:contacts[style].map(p=>warp(p,levels,style)),shoulders:shoulder.map(p=>({...p}))};
  }
  function front(ctx,pose,cx,cy,s,bob=0){ctx.save();ctx.translate(cx-170*s,cy-650*s);ctx.scale(s,s);ctx.drawImage(pose.canvas,-60,0);ctx.restore()}
  return {pose,front,cacheSize:()=>0};
 }
 return {create,warp,contacts,shoulder,wrists,support,rotation};
})();
if(typeof module!=='undefined')module.exports=PippoMusicTorso;
