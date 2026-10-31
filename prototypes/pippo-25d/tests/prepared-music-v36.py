from pathlib import Path
from PIL import Image
import numpy as np,json,hashlib
root=Path('dist/assets/music-render-v36');meta=json.loads((root/'manifest.json').read_text())
for name,digest in meta['files'].items():assert hashlib.sha256((root/name).read_bytes()).hexdigest()==digest,name
for name,digest in meta['sources'].items():assert hashlib.sha256(Path(name).read_bytes()).hexdigest()==digest,name
body=np.array(Image.open(root/'body.png').convert('RGBA'));original=np.array(Image.open('sources/v23/music-rig.png').convert('RGBA'))
for kind,rects in meta['frames'].items():
 base=body[:,rects[0][0]:rects[0][0]+340]
 for i,(x,y,w,h) in enumerate(rects):
  a=body[:,x:x+w];bx=[150,600,1080][i]
  assert np.array_equal(a[:365],original[:365,bx:bx+340]),'head remains exact original'
  assert np.array_equal(a[365:],base[365:]),'expression never replaces belly/seat/feet'
arms=np.array(Image.open(root/'arms.png').convert('RGBA'))
for row,style in enumerate(meta['styles']):
 a=arms[:,row*340:(row+1)*340]
 assert a[365:550,150:201,3].max()==0,'moving surfaces contain no central belly pixels'
 if style!='shaker':assert a[:365,:,3].max()==0,'no head pixels in arm surface'
 assert a[535:,:,3].max()==0,'moving surfaces contain no stool or feet'
print('PASS: v36 source/output hashes, original heads, identical body across expressions, arm surfaces exclude belly/stool/feet')
