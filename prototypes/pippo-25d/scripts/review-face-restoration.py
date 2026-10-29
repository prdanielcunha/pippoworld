#!/usr/bin/env python3
"""Create a temporary v19/restored browser comparison and a full live-render gallery."""
from pathlib import Path
import subprocess,sys
root=Path(__file__).resolve().parents[1];d=root/'dist';files=['__face-canonical-v19.js','__face-sprite-v19.js','__face-old.html','__face-review.html']
if '--clean' in sys.argv:
 for n in files:(d/n).unlink(missing_ok=True)
 for n in ['poses.png','expressions.png','sprites.json']:(d/'__v19'/n).unlink(missing_ok=True)
 if (d/'__v19').exists():(d/'__v19').rmdir()
 raise SystemExit
(d/'__v19').mkdir(exist_ok=True)
for name in ['poses.png','expressions.png','sprites.json']:
 (d/'__v19'/name).write_bytes(subprocess.check_output(['git','show','19d16d63d7f61a400845b11a8239042b3db925e0:dist/assets/clean-v2/'+name],cwd=root))
for src,target in [('canonical-art.js','__face-canonical-v19.js'),('sprite-rendering.js','__face-sprite-v19.js')]:
 (d/target).write_bytes(subprocess.check_output(['git','show','19d16d63d7f61a400845b11a8239042b3db925e0:dist/'+src],cwd=root).replace(b'assets/clean-v2/',b'__v19/'))
s=(d/'index.html').read_text().replace('canonical-art.js?v=face-restoration-20','__face-canonical-v19.js').replace('sprite-rendering.js?v=face-restoration-20','__face-sprite-v19.js');(d/'__face-old.html').write_text(s)
(d/'__face-review.html').write_text('''<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Recortes v19 e novos</title><style>body{font:16px system-ui;background:#173047;color:white;margin:15px}button{padding:12px;margin:4px}iframe{position:absolute;left:-5000px;width:940px;height:900px}#grid{display:grid;grid-template-columns:repeat(8,140px);gap:12px}canvas{width:140px;height:160px;background:#173047}h2{font-size:12px;margin:4px}article{border:1px solid #567}#grid.pairs{grid-template-columns:repeat(2,560px)}.pairs canvas{width:275px;height:320px}.pairs article{display:grid;grid-template-columns:275px 275px}.pairs h2{grid-column:span 2}</style><h1>Rosto: v19 × recuperação do original</h1><button id="compare">Comparar 8 poses ampliadas</button><button id="face">Ampliar o rosto apontado</button><button id="gallery">Conferir todas as 48 figuras no jogo</button><button id="pink">Fundo rosa</button><p id="status">Preparando…</p><div id="grid"></div><iframe id="old" src="__face-old.html"></iframe><iframe id="new" src="index.html"></iframe><script>
const frames=['old','new'].map(id=>document.getElementById(id));let ready=0;const timer=setInterval(()=>{if(frames.every(f=>f.contentWindow.PippoCanon?.ready)){clearInterval(timer);document.getElementById('status').textContent='Duas versões prontas.';ready=1}},100);
function draw(f,name){const w=f.contentWindow;w.eval('state.paused=true;state.motion=null;state.turn=null;state.ballTime=null;state.sideRest=false;state.expression=null;state.pet=0;state.blink=0;state.reduced=true;state.time=0');
if(name.startsWith('assembled_'))w.eval('state.expression='+JSON.stringify(name.slice(10)));
else if(name.startsWith('walk'))w.eval('state.facing=-1;state.motion={walk:{},kind:"walk"};state.walkDistance=geometry().bodyHeight*.22*'+Number(name.slice(4)));
else if(['front','left','right','quarterLeft','quarterRight','back','backLeft','backRight','above','below','top','soles','stand','down','up','jump0','jump1','jump2','jump3'].includes(name)){
// Force a pose only inside this review page by a wrapper around turnPose.
w.eval('PippoInteraction.turnPose=()=>'+JSON.stringify(name));w.eval('state.turn={};state.motion={walk:{}}');
}else w.eval('state.motion={kind:'+JSON.stringify(name)+'}');
const g={width:500,height:580,cx:250,bottom:550,bodyHeight:400};const cv=document.createElement('canvas');cv.width=500;cv.height=580;w.PippoCanon.draw(cv.getContext('2d'),g);return cv;}
document.getElementById('face').onclick=()=>{if(!ready)return;const grid=document.getElementById('grid');grid.className='';grid.style.gridTemplateColumns='repeat(2,580px)';grid.replaceChildren();for(const [i,f] of frames.entries()){const a=document.createElement('article');a.innerHTML='<h2>'+['Versão 19 — partes transparentes','Recuperação dos pixels originais'][i]+'</h2>';const src=draw(f,'front'),cv=document.createElement('canvas');cv.width=600;cv.height=530;cv.style.width='570px';cv.style.height='503px';cv.getContext('2d').drawImage(src,125,215,250,225,0,0,600,530);a.append(cv);grid.append(a)}document.getElementById('status').textContent='Mesmo rosto, mesma escala; folha original usada somente nas regiões recuperadas.'};
document.getElementById('compare').onclick=()=>{if(!ready)return;const grid=document.getElementById('grid');grid.className='pairs';grid.style.gridTemplateColumns='repeat(2,560px)';grid.replaceChildren();for(const name of ['front','wave','jump2','above','assembled_neutral','assembled_wink','assembled_surprised','assembled_affection']){const a=document.createElement('article');a.innerHTML='<h2>'+name+' — v19 / rosto recuperado</h2>';for(const f of frames)a.append(draw(f,name));grid.append(a)}document.getElementById('status').textContent='8 pares renderizados no mesmo tamanho.'};
document.getElementById('gallery').onclick=async()=>{if(!ready)return;const m=await fetch('assets/clean-v2/sprites.json').then(r=>r.json());const grid=document.getElementById('grid');grid.className='';grid.style.gridTemplateColumns='repeat(8,140px)';grid.replaceChildren();for(const name of Object.keys(m.sprites)){const a=document.createElement('article');a.innerHTML='<h2>'+name+'</h2>';a.append(draw(frames[1],name));grid.append(a)}document.getElementById('status').textContent='48 figuras completas renderizadas pelo jogo.'};document.getElementById('pink').onclick=()=>document.querySelectorAll('canvas').forEach(c=>c.style.background='#b64074');
</script></html>''')
print('Open /__face-review.html; --clean before publishing.')
