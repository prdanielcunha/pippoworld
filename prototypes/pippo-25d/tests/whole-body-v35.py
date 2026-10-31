from pathlib import Path
from PIL import Image
from scipy.ndimage import label
import numpy as np,json,hashlib
root=Path('dist/assets/music-render-v35');m=json.loads((root/'manifest.json').read_text())
for name,digest in m['files'].items():assert hashlib.sha256((root/name).read_bytes()).hexdigest()==digest,name
for name,digest in m['sources'].items():assert hashlib.sha256(Path(name).read_bytes()).hexdigest()==digest,name
original=np.array(Image.open('sources/v23/music-rig.png').convert('RGBA'))
atlas=np.array(Image.open(root/'body.png').convert('RGBA'))
for style,frames in m['frames'].items():
 for kind,rects in frames.items():
  for expression,(x,y,w,h) in enumerate(rects):
   bx=[150,600,1080][expression];base=original[:680,bx:bx+340];a=atlas[:,x:x+w]
   assert np.array_equal(a[:365],base[:365]),'original expressions/head/neck RGBA'
   assert np.array_equal(a[365:535,140:201],base[365:535,140:201]),'one original belly from neck to hips'
   if kind=='bodyFrames':assert np.array_equal(a[536:],base[536:]),'original stool and exactly two feet'
   assert np.min(a[365:540,140:201,3])>240,'no horizontal hole in the belly'
   comp,_=label(a[:,:,3]>128)
   assert comp[400,170]==comp[490,170]==comp[535,170]!=0,'upper and lower torso remain one connected surface'
   # Every scanline across the center is solid: no faded split at former y515.
   assert np.min(a[500:535,110:230,3])>235,'no translucent waist strip'
for frames in m['frames'].values():
 for normal,drum in zip(frames['bodyFrames'],frames['drumFrames']):
  a=atlas[535:653,normal[0]+190:normal[0]+310];b=atlas[535:653,drum[0]+190:drum[0]+310]
  rgb=a[:,:,:3].astype(float);foot=(rgb[:,:,0]>170)&(rgb[:,:,0]>rgb[:,:,1]*1.5)&(rgb[:,:,1]>rgb[:,:,2]*1.7)&(rgb[:,:,2]<100)&(a[:,:,3]>128)
  assert foot.sum()>1000 and b[:,:,3][foot].max()==0,'moving source foot is absent from drum body, never doubled'
front=np.array(Image.open(root/'front.png').convert('RGBA'))
assert front[535:,:,3].max()==0,'foreground cannot reintroduce stool or lower belly'
print('PASS: 12 complete figures; exact original faces, continuous original belly, preserved stool/feet; no waist hole or foreground stool')
