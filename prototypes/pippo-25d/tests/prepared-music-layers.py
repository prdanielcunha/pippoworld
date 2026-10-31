from pathlib import Path
from PIL import Image
import numpy as np,json,hashlib
root=Path('dist/assets/music-render-v33');m=json.loads((root/'manifest.json').read_text())
for name,digest in m['files'].items():assert hashlib.sha256((root/name).read_bytes()).hexdigest()==digest
for name,digest in m['sources'].items():assert hashlib.sha256(Path(name).read_bytes()).hexdigest()==digest
original=np.array(Image.open('sources/v23/music-rig.png').convert('RGBA'));body=np.array(Image.open(root/'body.png').convert('RGBA'))
for frame,bx in enumerate([150,600,1080]):
 for offset in [0,1020]:assert np.array_equal(original[:365,bx:bx+340],body[:365,offset+frame*340:offset+(frame+1)*340]),'all face RGBA remains original'
 assert np.array_equal(original[515:680,bx:bx+340],body[515:,frame*340:(frame+1)*340]),'lower body remains original'
front=np.array(Image.open(root/'front.png').convert('RGBA'));torso=np.array(Image.open(root/'torso.png').convert('RGBA'))
visible=front[:,:,3]>0;assert np.array_equal(front[:,:,:3][visible],torso[:,:,:3][visible]),'front hand RGB remains original'
for offset in [0,340]:
 assert front[70,170+offset,3]==0 and front[180,170+offset,3]==0,'belly cannot cover keyboard through hand mask'
 assert front[215:,offset:offset+340,3].max()==0,'no stool/paw below fingers in foreground'
 for x,y in [(75,170),(252,170)]:assert front[y,x+offset,3]>200,'fingertips remain visible'
print('PASS: exact original face RGBA, preserved lower body, original hand RGB, no belly/stool/paw in foreground')
