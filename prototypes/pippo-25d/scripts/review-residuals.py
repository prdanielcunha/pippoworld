#!/usr/bin/env python3
"""Compare source-space contact regions against v17. --clean before publication."""
from pathlib import Path
import subprocess,sys
REVIEW_HTML='<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Resíduos de chão — comparação ampliada</title><style>body{font:15px system-ui;background:#173047;color:#dae6eb;margin:16px}h1{font-size:24px}h2{font-size:16px;margin:8px 0 4px}section{margin:8px 0}article{display:flex;gap:14px}figure{margin:0}figcaption{font-size:13px;color:#bfcfd9}canvas{display:block;background:#173047}button{padding:8px}</style><h1>Regiões de contato ampliadas — v17 × correção</h1><p>Somente o personagem e a transparência, no mesmo fundo. Sem o branco das folhas originais.</p><button id="render">Comparar regiões de contato</button><p id="status">Preparando…</p><div id="out"></div><script src="sprite-rendering.js"></script><script>\nconst imgs={};let oldMeta,meta;Promise.all([fetch(\'__poses-v17.json\').then(r=>r.json()),fetch(\'assets/canon/poses.json\').then(r=>r.json())]).then(async data=>{[oldMeta,meta]=data;await Promise.all(Object.entries(meta.provenance).map(([n,p])=>new Promise(resolve=>{let i=new Image;i.onload=()=>{imgs[n]=i;resolve()};i.src=\'assets/canon/\'+p.file})));document.getElementById(\'status\').textContent=\'Recortes prontos.\'});\ndocument.getElementById(\'render\').onclick=()=>{const root=document.getElementById(\'out\');root.replaceChildren();for(const [name,box] of [[\'crouch\',[830,965,185,50]],[\'above\',[128,985,170,55]],[\'top\',[790,934,202,72]],[\'rest\',[440,325,265,30]],[\'sit\',[83,332,230,28]]]){const [x,y,w,h]=box,section=document.createElement(\'section\');section.innerHTML=\'<h2>\'+name+\'</h2>\';const row=document.createElement(\'article\');section.append(row);root.append(section);for(const [m,label] of [[oldMeta,\'Versão 17 — ainda com fundo\'],[meta,\'Correção — contorno do personagem\']]){const p=m.poses[name],raw=document.createElement(\'canvas\');raw.width=p.w+4;raw.height=p.h+4;const g=raw.getContext(\'2d\');g.drawImage(imgs[p.sheet],p.sx,p.sy,p.w,p.h,2,2,p.w,p.h);const f=g.getImageData(0,0,raw.width,raw.height);f.data.set(prepareReferencePixels(f.data,raw.width,raw.height,p.runs,{paperRows:p.paperRows,sourceHeight:p.h}));g.putImageData(f,0,0);const cv=document.createElement(\'canvas\');cv.width=w*2;cv.height=h*2;cv.getContext(\'2d\').drawImage(raw,x-p.sx+2,y-p.sy+2,w,h,0,0,w*2,h*2);const fig=document.createElement(\'figure\'),caption=document.createElement(\'figcaption\');caption.textContent=label;fig.append(caption,cv);row.append(fig)}}document.getElementById(\'status\').textContent=\'Cinco regiões comparadas na mesma escala.\'};\n</script></html>\n'
root=Path(__file__).resolve().parents[1]
files=['__residuals.html','__poses-v17.json','__floor.html']
if '--clean' in sys.argv:
 for name in files:(root/'dist'/name).unlink(missing_ok=True)
 raise SystemExit
for revision,prefix in [('55f04fd949954b109ae43c0982aa80838d1fdfa7',''),('2bc445d1f90229b400192b8d2fad555a97611abf','prototypes/pippo-25d/')]:
 r=subprocess.run(['git','show',revision+':'+prefix+'dist/assets/canon/poses.json'],cwd=root,capture_output=True)
 if r.returncode==0:
  (root/'dist/__poses-v17.json').write_bytes(r.stdout)
  break
else:raise SystemExit('Version 17 metadata unavailable in checkout history.')
(root/'dist/__residuals.html').write_text(REVIEW_HTML)
print('Open /__residuals.html through supported Site preview. --clean before packaging.')
