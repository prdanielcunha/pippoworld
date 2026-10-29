#!/usr/bin/env python3
"""Pack v2 native PNGs pixel-exactly. Pass the extracted upload directory."""
from pathlib import Path
from PIL import Image
import hashlib,json,sys
root=Path(__file__).resolve().parents[1];src=Path(sys.argv[1]);dest=root/'dist/assets/clean-v2';dest.mkdir(exist_ok=True)
meta=json.loads((root/'dist/assets/canon/poses.json').read_text());result={'revision':'clean-cutouts-19','source':'Pippo-Recortes-Limpos-v2.zip','variant':'normal/native','library_file_id':'libfile_a0ff5074a2288191ad60de1a1459310a','sprites':{},'atlases':{}}
for group,names in [('poses',[n for n in meta['poses'] if not n.startswith('face_') and n!='body_front']),('expressions',['assembled_'+n for n in ['neutral','happy','curious','surprised','laugh','affection','wink','sleepy','playful','focused','listening','calm']])]:
 atlas=Image.new('RGBA',(2048,2048));x=y=rowh=0
 for name in names:
  filename=('expressoes-completas/expressao_'+name[10:]+'.png') if name.startswith('assembled_') else 'PNG/'+name+'.png'
  p=src/filename;im=Image.open(p).convert('RGBA');w,h=im.size
  if x+w+2>2048:x=0;y+=rowh+2;rowh=0
  assert y+h+2<=2048
  atlas.paste(im,(x+1,y+1));result['sprites'][name]={'atlas':group,'x':x+1,'y':y+1,'w':w,'h':h,'source':filename,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'pixels_sha256':hashlib.sha256(im.tobytes()).hexdigest()}
  if name.startswith('assembled_'):assert (w,h)==(400,400)
  else:assert (w,h)==(meta['poses'][name]['w']+4,meta['poses'][name]['h']+4)
  x+=w+2;rowh=max(rowh,h)
 atlas=atlas.crop((0,0,2048,y+rowh+2));out=dest/(group+'.png');atlas.save(out,optimize=True)
 result['atlases'][group]={'file':group+'.png','sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'bytes':out.stat().st_size}
 for name,p in result['sprites'].items():
  if p['atlas']!=group:continue
  original=Image.open(src/p['source']).convert('RGBA');packed=atlas.crop((p['x'],p['y'],p['x']+p['w'],p['y']+p['h']));assert original.tobytes()==packed.tobytes()
(dest/'sprites.json').write_text(json.dumps(result,ensure_ascii=False,separators=(',',':')))
print('48 complete figures packed pixel-exactly:',sum(p['bytes'] for p in result['atlases'].values()),'bytes')
