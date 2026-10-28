#!/usr/bin/env python3
"""Generate a local, deterministic browser comparison; --clean removes fixtures.
Run at Site root. No image generation or changes to approved sources.
"""
from pathlib import Path
import subprocess, sys
REVIEW_HTML='<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Comparação de giros — v14 e candidata</title><style>body{font:16px system-ui;background:#f4f0e3;color:#233c30;margin:24px}iframe{position:absolute;left:-5000px;width:600px;height:900px}section{margin:16px 0;padding:12px;background:white}article{display:flex;gap:12px}figure{margin:0}canvas{background:#b4c9a5;width:210px;height:220px}h2{font-size:19px}figcaption{font-size:13px}button{padding:12px}#result{font-weight:bold}</style><h1>Giros: comparação com a versão 14</h1><p>Mesmas imagens e instantes. Capturas determinísticas do renderizador real. Não acrescenta intermediários à caminhada.</p><button id="run">Comparar versões</button><p id="result">Preparando desenhos…</p><div id="samples"></div><iframe id="old" src="__baseline.html"></iframe><iframe id="next" src="index.html"></iframe><script>\nconst frames=[\'old\',\'next\'].map(id=>document.getElementById(id));\nconst ready=setInterval(()=>{if(frames.every(f=>f.contentWindow.PippoCanon?.ready)){clearInterval(ready);frames.forEach(f=>f.contentWindow.eval(\'state.paused=true\'));document.getElementById(\'result\').textContent=\'Desenhos prontos para comparar.\'}},100);\nconst cases=[\n {title:\'Continuar para a direita a partir do perfil direito\',setup:\'state.sideRest=true;state.facing=1;state.actorX=.4;walkTo(.8)\',times:[0,100,200,320]},\n {title:\'Inverter o destino durante o giro iniciado de frente\',setup:\'walkTo(0);advanceMotion(200);walkTo(1)\',times:[0,80,160,320]},\n {title:\'Caminhada original e chegada à esquerda\',setup:\'walkTo(0)\',times:[320,720,1120,2200]}\n];\ndocument.getElementById(\'run\').onclick=()=>{\n document.getElementById(\'samples\').replaceChildren();\n for(const c of cases){const section=document.createElement(\'section\');section.innerHTML=\'<h2>\'+c.title+\'</h2>\';document.getElementById(\'samples\').append(section);\n for(const [i,f] of frames.entries()){\n const w=f.contentWindow;w.eval(\'state.paused=false;state.motion=null;state.turn=null;state.sideRest=false;state.actorX=.5;state.facing=1;state.pet=0;state.blink=0;state.expression=null;state.ballTime=null;state.walkDistance=0;state.reduced=false;\'+c.setup);\n const row=document.createElement(\'article\');section.append(row);let previous=0;\n for(const t of c.times){w.eval(\'advanceMotion(\'+ (t-previous) +\');render();state.paused=true\');previous=t;\n const source=w.document.getElementById(\'pippo\'),fig=document.createElement(\'figure\'),cv=document.createElement(\'canvas\');cv.width=420;cv.height=440;\n cv.getContext(\'2d\').drawImage(source,0,0,source.width,source.height,0,0,420,440);\n const caption=document.createElement(\'figcaption\');caption.textContent=(i?\'Candidata\':\'Versão 14\')+\' · \'+t+\' ms · \'+source.dataset.pose;fig.append(cv,caption);row.append(fig);\n }\n }\n }\n document.getElementById(\'result\').textContent=\'Comparação pronta: 24 capturas. Caminhada permanece com quatro poses.\';\n};\n</script></html>'
root=Path(__file__).resolve().parents[1]
files=['__app-v14.js','__interaction-v14.js','__canonical-art-v14.js','__baseline.html','__review.html']
if '--clean' in sys.argv:
 for name in files:(root/'dist'/name).unlink(missing_ok=True)
 raise SystemExit
base='07e765836f19759e0c12082b57324e46b57a3ff4'
def source(name):
 # GitHub stores the Site in a subdirectory, Site history at the root.
 for revision,prefix in [(base,''),('fc248bad25224f55e276cb4e7fba2c726f683148','prototypes/pippo-25d/')]:
  result=subprocess.run(['git','show',revision+':'+prefix+'dist/'+name],cwd=root,capture_output=True)
  if result.returncode==0:return result.stdout.decode()
 raise SystemExit('Version 14 source unavailable: restore original Site history before running.')
for name in ['app','interaction','canonical-art']:
 (root/'dist'/('__'+name+'-v14.js')).write_text(source(name+'.js'))
page=source('index.html')
for name in ['app','interaction','canonical-art']:page=page.replace('src="'+name+'.js','src="__'+name+'-v14.js')
(root/'dist/__baseline.html').write_text(page)
(root/'dist/__review.html').write_text(REVIEW_HTML)
print('Open /__review.html through the supported Site preview. Clean before publication.')
