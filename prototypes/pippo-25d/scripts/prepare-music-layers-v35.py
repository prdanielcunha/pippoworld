"""Build complete, immutable-color musical figures before any deformation.

The original belly is never cut into upper/lower layers. New painted arms are
registered with a spatial feather mask, then flattened in premultiplied RGBA.
The original head, central belly, stool and feet remain the v23 source pixels.
"""
from pathlib import Path
import json, hashlib
import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import label, binary_dilation

root=Path(__file__).resolve().parents[1]
out=root/'dist/assets/music-render-v35';out.mkdir(exist_ok=True)
original=Image.open(root/'sources/v23/music-rig.png').convert('RGBA')
source=Image.open(root/'dist/assets/music-body-v32/poses.png').convert('RGBA')
grip=Image.open(root/'sources/v35/grip-master.png').convert('RGBA')
yy,xx=np.mgrid[:680,:340]
def smooth(t):
 t=np.clip(t,0,1);return t*t*(3-2*t)
def largest(a):
 comp,_=label(a[:,:,3]>16);sizes=np.bincount(comp.ravel());sizes[0]=0
 a[~binary_dilation(comp==sizes.argmax(),iterations=2),3]=0
 return a
def polygon(points):
 m=Image.new('L',(340*4,680*4));ImageDraw.Draw(m).polygon([(x*4,y*4) for x,y in points],fill=255)
 return np.array(m.resize((340,680),Image.Resampling.LANCZOS))/255
def blend(base,paint,weight):
 # Linear premultiplied blend avoids the translucent band produced by
 # drawing two independently faded surfaces on top of one another.
 a=base.astype(float)/255;b=paint.astype(float)/255;w=weight[:,:,None]
 alpha=a[:,:,3:4]*(1-w)+b[:,:,3:4]*w
 rgb=a[:,:,:3]*a[:,:,3:4]*(1-w)+b[:,:,:3]*b[:,:,3:4]*w
 rgb=np.divide(rgb,alpha,out=np.zeros_like(rgb),where=alpha>0)
 return np.rint(np.concatenate((rgb,alpha),axis=2)*255).astype('uint8')

scale=340/270
opened=source.crop((0,0,314,627)).transform((340,680),Image.Transform.AFFINE,(1/scale,0,30,0,1/scale,34+20/scale),Image.Resampling.BICUBIC)
# Registration: original neck y350, short wrists near y478. Only arms enter
# the assembled figure; the generated head, belly, feet and stool never do.
closed=grip.transform((340,680),Image.Transform.AFFINE,(1/.41,0,12/.41,0,1/.41,10/.41),Image.Resampling.BICUBIC)
paint={s:largest(np.array(im)) for s,im in [('open',opened),('grip',closed)]}
open_source=[(58,402),(102,398),(125,403),(138,416),(143,430),(142,436),(137,440),(130,441),(126,438),(125,447),(121,454),(116,458),(109,461),(102,461),(98,465),(92,467),(85,466),(81,462),(75,462),(68,459),(64,453),(62,443),(62,431),(58,419)]
open_edge=[((x-30)*scale,(y-34)*scale-20) for x,y in open_source]
# Follow the actual curled-finger silhouette, including the thumb recess.
# A broad lower polygon would copy belly shadow back over an instrument.
grip_source=[(150,1070),(195,1080),(240,1105),(280,1130),(315,1150),(325,1180),(312,1185),(290,1180),(283,1175),(283,1190),(274,1210),(260,1218),(245,1218),(230,1230),(210,1232),(192,1228),(180,1230),(166,1218),(158,1200),(155,1170),(154,1120)]
grip_edge=[(x*.41-12,y*.41-10) for x,y in grip_source]
grip_right_source=[(772,1070),(730,1075),(690,1085),(665,1100),(638,1120),(622,1140),(608,1160),(605,1177),(610,1184),(620,1185),(635,1180),(643,1170),(642,1188),(635,1203),(638,1215),(650,1222),(665,1221),(680,1215),(693,1226),(709,1232),(728,1229),(744,1219),(755,1200),(761,1170),(767,1130)]
right_edges={'open':[((340-x-30)*scale,(y-34)*scale-20) for x,y in open_source], 'grip':[(x*.41-12,y*.41-10) for x,y in grip_right_source]}
front={}
for style,edge in [('open',open_edge),('grip',grip_edge)]:
 m=np.maximum(polygon(edge),polygon(right_edges[style]))
 a=paint[style].copy();a[:,:,3]=np.rint(a[:,:,3]*m).astype('uint8');front[style]=a

figures=Image.new('RGBA',(4080,680));fronts=Image.new('RGBA',(680,680));feet=Image.new('RGBA',(360,118));rows=[];frames={}
for row,style in enumerate(['open','grip']):
 # Side-local feathering joins shoulders/arms, never a horizontal waist fade.
 side=smooth((np.abs(xx-170)-39)/31)
 vertical=smooth((yy-370)/36)*(1-smooth((yy-482)/28))
 weight=np.maximum(side*vertical,front[style][:,:,3]/255)
 # Preserve the original continuous central belly all the way to its hips.
 weight[:,140:201]=0
 fronts.paste(Image.fromarray(front[style]),(row*340,0))
 frames[style]={'bodyFrames':[],'drumFrames':[]}
 for expression,bx in enumerate([150,600,1080]):
  base=np.array(original.crop((bx,0,bx+340,680)))
  if row==0:
   spans=[]
   for line in base[:,:,3]:
    active=np.r_[False,line>16,False];spans.append(np.where(active[1:]!=active[:-1])[0].tolist())
   rows.append(spans)
  a=blend(base,paint[style],weight)
  a[:365]=base[:365];a[536:]=base[536:]
  # Bit-exact pixels in all preserved regions, including transparent RGB.
  a[:,140:201]=base[:,140:201]
  x=(row*6+expression)*340
  figures.paste(Image.fromarray(a),(x,0));frames[style]['bodyFrames'].append([x,0,340,680])
  patch=a[535:653,190:310];rgb=patch[:,:,:3].astype(float)
  mask=(rgb[:,:,0]>170)&(rgb[:,:,0]>rgb[:,:,1]*1.5)&(rgb[:,:,1]>rgb[:,:,2]*1.7)&(rgb[:,:,2]<100)
  foot=np.zeros((118,120,4),dtype=np.uint8);foot[mask]=patch[mask]
  if row==0:feet.paste(Image.fromarray(foot),(expression*120,0))
  patch[mask,3]=0;x=(row*6+3+expression)*340
  figures.paste(Image.fromarray(a),(x,0));frames[style]['drumFrames'].append([x,0,340,680])
figures.save(out/'body.png',optimize=True);fronts.save(out/'front.png',optimize=True);feet.save(out/'feet.png',optimize=True)
meta={'revision':35,'frames':frames,'hitRows':rows,'sources':{},'files':{}}
for name in ['sources/v23/music-rig.png','dist/assets/music-body-v32/poses.png','sources/v35/grip-master.png']:
 meta['sources'][name]=hashlib.sha256((root/name).read_bytes()).hexdigest()
for p in out.glob('*.png'):meta['files'][p.name]=hashlib.sha256(p.read_bytes()).hexdigest()
(out/'manifest.json').write_text(json.dumps(meta,separators=(',',':'))+'\n')
print('Prepared complete figures v35:',[(p.name,p.stat().st_size) for p in out.iterdir()])
