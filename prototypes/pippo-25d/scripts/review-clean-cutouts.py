#!/usr/bin/env python3
"""Create a temporary v18/new browser comparison and a full live-render gallery."""
from pathlib import Path
import subprocess,sys
root=Path(__file__).resolve().parents[1];d=root/'dist';files=['__canonical-v18.js','__sprite-v18.js','__old.html','__clean-review.html']
if '--clean' in sys.argv:
 for n in files:(d/n).unlink(missing_ok=True)
 raise SystemExit
for src,target in [('canonical-art.js','__canonical-v18.js'),('sprite-rendering.js','__sprite-v18.js')]:
 (d/target).write_bytes(subprocess.check_output(['git','show','84e68659abdf6c346eea2ef77b8270f14c2e8072:dist/'+src],cwd=root))
s=(d/'index.html').read_text().replace('canonical-art.js?v=clean-cutouts-19','__canonical-v18.js').replace('sprite-rendering.js?v=clean-cutouts-19','__sprite-v18.js');(d/'__old.html').write_text(s)
(d/'__clean-review.html').write_text('''<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Recortes v18 e novos</title><style>body{font:16px system-ui;background:#173047;color:white;margin:15px}button{padding:12px;margin:4px}iframe{position:absolute;left:-5000px;width:940px;height:900px}#grid{display:grid;grid-template-columns:repeat(8,140px);gap:12px}canvas{width:140px;height:160px;background:#173047}h2{font-size:12px;margin:4px}article{border:1px solid #567}#grid.pairs{grid-template-columns:repeat(2,560px)}.pairs canvas{width:275px;height:320px}.pairs article{display:grid;grid-template-columns:275px 275px}.pairs h2{grid-column:span 2}</style><h1>Recortes: v18 × pacote enviado</h1><button id="compare">Comparar 8 poses ampliadas</button><button id="gallery">Conferir todas as 48 figuras no jogo</button><button id="pink">Fundo rosa</button><p id="status">Preparando…</p><div id="grid"></div><iframe id="old" src="__old.html"></iframe><iframe id="new" src="index.html"></iframe><script>
const frames=['old','new'].map(id=>document.getElementById(id));let ready=0;const timer=setInterval(()=>{if(frames.every(f=>f.contentWindow.PippoCanon?.ready)){clearInterval(timer);document.getElementById('status').textContent='Duas versões prontas.';ready=1}},100);
function draw(f,name){const w=f.contentWindow;w.eval('state.paused=true;state.motion=null;state.turn=null;state.ballTime=null;state.sideRest=false;state.expression=null;state.pet=0;state.blink=0;state.reduced=true;state.time=0');
if(name.startsWith('assembled_'))w.eval('state.expression='+JSON.stringify(name.slice(10)));
else if(name.startsWith('walk'))w.eval('state.facing=-1;state.motion={walk:{},kind:"walk"};state.walkDistance=geometry().bodyHeight*.22*'+Number(name.slice(4)));
else if(['front','left','right','quarterLeft','quarterRight','back','backLeft','backRight','above','below','top','soles','stand','down','up','jump0','jump1','jump2','jump3'].includes(name)){
// Force a pose only inside this review page by a wrapper around turnPose.
w.eval('PippoInteraction.turnPose=()=>'+JSON.stringify(name));w.eval('state.turn={};state.motion={walk:{}}');
}else w.eval('state.motion={kind:'+JSON.stringify(name)+'}');
const g={width:500,height:580,cx:250,bottom:550,bodyHeight:400};const cv=document.createElement('canvas');cv.width=500;cv.height=580;w.PippoCanon.draw(cv.getContext('2d'),g);return cv;}
document.getElementById('compare').onclick=()=>{if(!ready)return;const grid=document.getElementById('grid');grid.className='pairs';grid.replaceChildren();for(const name of ['walk0','walk1','right','jump2','rest','return','assembled_wink','assembled_affection']){const a=document.createElement('article');a.innerHTML='<h2>'+name+' — v18 / pacote enviado</h2>';for(const f of frames)a.append(draw(f,name));grid.append(a)}document.getElementById('status').textContent='8 pares renderizados no mesmo tamanho.'};
document.getElementById('gallery').onclick=async()=>{if(!ready)return;const m=await fetch('assets/clean-v2/sprites.json').then(r=>r.json());const grid=document.getElementById('grid');grid.className='';grid.replaceChildren();for(const name of Object.keys(m.sprites)){const a=document.createElement('article');a.innerHTML='<h2>'+name+'</h2>';a.append(draw(frames[1],name));grid.append(a)}document.getElementById('status').textContent='48 figuras completas renderizadas pelo jogo.'};document.getElementById('pink').onclick=()=>document.querySelectorAll('canvas').forEach(c=>c.style.background='#b64074');
</script></html>''')
print('Open /__clean-review.html; --clean before publishing.')
