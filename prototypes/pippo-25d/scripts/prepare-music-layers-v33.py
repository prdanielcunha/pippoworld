"""Deterministic render layers: preserve source RGB, mask alpha before runtime.
No original file is overwritten. Face/feet come from the v23 PNG master.
"""
from pathlib import Path
import json,hashlib
import numpy as np
from PIL import Image,ImageDraw,ImageFilter
from scipy.ndimage import label,binary_dilation
root=Path(__file__).resolve().parents[1];out=root/'dist/assets/music-render-v33';out.mkdir(exist_ok=True)
original=Image.open(root/'sources/v23/music-rig.png').convert('RGBA')
source=Image.open(root/'dist/assets/music-body-v32/poses.png').convert('RGBA')
frames=Image.new('RGBA',(2040,680));feet=Image.new('RGBA',(360,118));rows=[]
for i,bx in enumerate([150,600,1080]):
 im=original.crop((bx,0,bx+340,680));a=np.array(im);alpha=a[:,:,3];rows.append([])
 for line in alpha:
  active=np.r_[False,line>16,False];edges=np.where(active[1:]!=active[:-1])[0];rows[-1].append(edges.tolist())
 # Head remains original RGBA. Keep original lower belly behind the new torso
 # so the fade never leaves a transparent horizontal gap above the stool.
 a[365:515,:,3]=0
 frames.paste(Image.fromarray(a),(i*340,0))
 foot=np.zeros((118,120,4),dtype=np.uint8);patch=a[535:653,190:310];rgb=patch[:,:,:3].astype(float)
 mask=(rgb[:,:,0]>170)&(rgb[:,:,0]>rgb[:,:,1]*1.5)&(rgb[:,:,1]>rgb[:,:,2]*1.7)&(rgb[:,:,2]<100)
 foot[mask]=patch[mask];patch[mask,3]=0
 feet.paste(Image.fromarray(foot),(i*120,0));frames.paste(Image.fromarray(a),(1020+i*340,0))
frames.save(out/'body.png',optimize=True);feet.save(out/'feet.png',optimize=True)
# The front mask follows the painted fingertips, rather than a broad polygon
# passing through them and including orange feet / belly beneath them.
open_edge=[(58,402),(102,398),(125,403),(138,416),(143,430),(142,436),(137,440),(130,441),(126,438),(125,447),(121,454),(116,458),(109,461),(102,461),(98,465),(92,467),(85,466),(81,462),(75,462),(68,459),(64,453),(62,443),(62,431),(58,419)]
grip_edge=[(57,402),(101,398),(121,403),(133,415),(133,433),(130,439),(123,445),(119,445),(116,441),(115,451),(111,458),(105,460),(99,460),(94,463),(87,464),(80,462),(73,461),(67,457),(63,450),(61,439),(60,425),(57,415)]
torsos=Image.new('RGBA',(680,230));fronts=Image.new('RGBA',(680,230))
for style,row,edge in [('open',0,open_edge),('grip',1,grip_edge)]:
 # Same registration as v32, prepared once in source space, not in Safari.
 frame=source.crop((0,row*627,314,(row+1)*627))
 scale=340/270
 layer=frame.transform((340,230),Image.Transform.AFFINE,(1/scale,0,30,0,1/scale,34+350/scale),Image.Resampling.BICUBIC)
 a=np.array(layer);ys=np.arange(230);fade=np.minimum(np.clip(ys/30,0,1),np.clip((215-ys)/20,0,1));a[:,:,3]=np.rint(a[:,:,3]*fade[:,None]).astype('uint8')
 components,n=label(a[:,:,3]>16);sizes=np.bincount(components.ravel());sizes[0]=0;keep=binary_dilation(components==sizes.argmax(),iterations=2);a[~keep,3]=0
 layer=Image.fromarray(a);torsos.paste(layer,(row*340,0))
 mask=Image.new('L',(314*4,627*4));draw=ImageDraw.Draw(mask)
 for mirror in [False,True]:draw.polygon([((340-x if mirror else x)*4,y*4) for x,y in edge],fill=255)
 mask=mask.resize((314,627),Image.Resampling.LANCZOS)
 mask=mask.transform((340,230),Image.Transform.AFFINE,(1/scale,0,30,0,1/scale,34+350/scale),Image.Resampling.BICUBIC)
 front=np.array(layer);front[:,:,3]=np.minimum(front[:,:,3],np.array(mask));fronts.paste(Image.fromarray(front),(row*340,0))
torsos.save(out/'torso.png',optimize=True);fronts.save(out/'front.png',optimize=True)
meta={'revision':33,'bodyFrames':[[i*340,0,340,680] for i in range(3)],'drumFrames':[[1020+i*340,0,340,680] for i in range(3)],'hitRows':rows,'sources':{},'files':{}}
for p in [root/'sources/v23/music-rig.png',root/'dist/assets/music-body-v32/poses.png']:meta['sources'][str(p.relative_to(root))]=hashlib.sha256(p.read_bytes()).hexdigest()
for p in out.glob('*.png'):meta['files'][p.name]=hashlib.sha256(p.read_bytes()).hexdigest()
(out/'manifest.json').write_text(json.dumps(meta,separators=(',',':'))+'\n')
print('Prepared immutable-color PNG render layers:',[(p.name,p.stat().st_size) for p in out.iterdir()])
