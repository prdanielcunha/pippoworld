#!/usr/bin/env python3
"""Local deterministic comparison with v15. Run --clean before publication."""
from pathlib import Path
import subprocess,sys
root=Path(__file__).resolve().parents[1]
files=['__app-v15.js','__interaction-v15.js','__baseline.html','__retarget.html']
if '--clean' in sys.argv:
 for name in files:(root/'dist'/name).unlink(missing_ok=True)
 raise SystemExit

def source(name):
 for revision,prefix in [('bf62b80b0b7d7cd45eb9fdd5abbc43a583d35be7',''),('d055e608454e8e08fb34cd135b75052409f11ce1','prototypes/pippo-25d/')]:
  r=subprocess.run(['git','show',revision+':'+prefix+'dist/'+name],cwd=root,capture_output=True)
  if r.returncode==0:return r.stdout.decode()
 raise SystemExit('Version 15 source unavailable in this checkout history.')
for name in ['app','interaction']:(root/'dist'/('__'+name+'-v15.js')).write_text(source(name+'.js'))
page=source('index.html')
for name in ['app','interaction']:page=page.replace('src="'+name+'.js','src="__'+name+'-v15.js')
(root/'dist/__baseline.html').write_text(page)
(root/'dist/__retarget.html').write_text('''<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Continuidade do destino — comparação v15 e v16</title><style>body{margin:24px;font:16px system-ui;background:#f4f0e3;color:#233c30}iframe{position:absolute;left:-5000px;width:940px;height:900px}button{padding:12px}article{display:flex;gap:12px}canvas{background:#b4c9a5;width:250px;height:200px}figure{margin:0}figcaption{font-size:14px}section{background:white;padding:16px;margin:16px 0}table{border-collapse:collapse;margin:12px 0}td,th{padding:8px 18px;border:1px solid #9cae96}h2{font-size:18px}</style><h1>Caminhada: mudar o destino sem reiniciar a velocidade</h1><p>Comparação determinística com a versão 15. As mesmas quatro poses originais permanecem.</p><button id="run">Comparar caminhada</button><p id="result">Preparando desenhos…</p><div id="output"></div><iframe id="old" src="__baseline.html"></iframe><iframe id="next" src="index.html"></iframe><script>
const frames=['old','next'].map(id=>document.getElementById(id));
const ready=setInterval(()=>{if(frames.every(f=>f.contentWindow.PippoCanon?.ready)){clearInterval(ready);frames.forEach(f=>f.contentWindow.eval('state.paused=true'));document.getElementById('result').textContent='Desenhos prontos.'}},100);
document.getElementById('run').onclick=()=>{
 const output=document.getElementById('output');output.replaceChildren();let displacements=[];
 for(const [i,f] of frames.entries()){
  const w=f.contentWindow;w.eval('state.paused=false;state.motion=null;state.turn=null;state.sideRest=true;state.facing=1;state.actorX=.3;state.pet=0;state.blink=0;state.expression=null;state.ballTime=null;state.walkDistance=0;state.reduced=false;walkTo(.65);advanceMotion(400);window.reviewStartX=state.actorX;walkTo(.8)');
  const section=document.createElement('section');section.innerHTML='<h2>'+(i?'Candidata v16':'Publicada v15')+'</h2>';output.append(section);const row=document.createElement('article');section.append(row);let previous=0,values=[];
  for(const t of [0,50,100,200]){w.eval('advanceMotion('+(t-previous)+');render();state.paused=true');previous=t;
   const source=w.document.getElementById('pippo'),fig=document.createElement('figure'),cv=document.createElement('canvas');cv.width=500;cv.height=400;cv.getContext('2d').drawImage(source,0,0,source.width,source.height,0,0,500,400);
   const dx=w.eval('(state.actorX-window.reviewStartX)*geometry().width');values.push(dx);
   const caption=document.createElement('figcaption');caption.textContent=t+' ms · '+dx.toFixed(2)+' px · '+source.dataset.pose;fig.append(cv,caption);row.append(fig);
  }displacements.push(values);
 }
 const table=document.createElement('table');table.innerHTML='<tr><th>Após mudar o destino</th><th>v15: distância</th><th>v16: distância</th></tr>'+[0,50,100,200].map((t,j)=>'<tr><td>'+t+' ms</td><td>'+displacements[0][j].toFixed(2)+' px</td><td>'+displacements[1][j].toFixed(2)+' px</td></tr>').join('');output.prepend(table);
 document.getElementById('result').textContent='Comparação pronta. Mesma posição na troca; a v16 mantém a velocidade em vez de começar do zero.';
};
</script></html>''')
print('Open /__retarget.html via supported Site preview, then --clean before packaging.')
