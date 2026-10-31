"""Test painted anatomy connection in the actual transparent atlas, not a joint label."""
from pathlib import Path
import json,hashlib
import numpy as np
from PIL import Image
from scipy.ndimage import label
root=Path('dist/assets/music-body-v32');meta=json.loads((root/'source.json').read_text())
for name,digest in meta['files'].items():assert hashlib.sha256((root/name).read_bytes()).hexdigest()==digest
im=Image.open(root/'poses.png').convert('RGBA');assert im.size==(1254,1254)
for row in range(2):
 for col in range(4):
  left=int(col*313.5);top=row*627
  alpha=np.array(im.crop((left,top,int((col+1)*313.5),top+627)))[:,:,3]
  components,_=label(alpha>220)
  body=components[410,165];assert body>0,'torso must be actually painted'
  for side,x in [(0,95),(1,230)]:
   raised=(col==1 and side==0) or (col==2 and side==1) or col==3
   y=400 if raised else 435
   assert components[y,x]==body,('hand and shoulder must be one connected painted body',row,col,side)
print('PASS: hand-to-torso painted connectivity in all eight complete figures; both source masters intact')
