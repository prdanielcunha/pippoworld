"""Static original body; connected shoulder-to-finger motion surfaces.

The shaker and its grasp are painted on the SAME arm surface. No wood/gourd
transform can move independently of the fingers. Source masters stay intact.
"""
from pathlib import Path
import hashlib,json
import numpy as np
from PIL import Image,ImageDraw,ImageFilter
from scipy.ndimage import label,binary_dilation
root=Path(__file__).resolve().parents[1]
out=root/'dist/assets/music-render-v36';out.mkdir(exist_ok=True)
original=Image.open(root/'sources/v23/music-rig.png').convert('RGBA')
old=Image.open(root/'dist/assets/music-render-v35/body.png').convert('RGBA')
old_front=Image.open(root/'dist/assets/music-render-v35/front.png').convert('RGBA')
shaker=Image.open(root/'sources/v36/shaker-arm.png').convert('RGBA')
def smooth(t):
 t=np.clip(t,0,1);return t*t*(3-2*t)
def polygon(points):
 im=Image.new('L',(1360,2720));ImageDraw.Draw(im).polygon([(x*4,y*4) for x,y in points],fill=255)
 return np.array(im.resize((340,680),Image.Resampling.LANCZOS))/255
def masked(im,m):
 a=np.array(im);a[:,:,3]=np.rint(a[:,:,3]*m).astype('uint8');return a
upper=[(105,369),(83,377),(63,397),(43,427),(34,447),(36,463),(46,477),(61,484),(80,474),(104,450),(113,424),(113,399),(116,380)]
def soft(m):return np.array(Image.fromarray(np.rint(m*255).astype('uint8')).filter(ImageFilter.GaussianBlur(2.5)))/255
left=soft(polygon(upper));right=soft(polygon([(340-x,y) for x,y in upper]));yy,xx=np.mgrid[:680,:340]
fade=smooth((yy-370)/23)
arms=Image.new('RGBA',(1020,680));fronts=Image.new('RGBA',(1020,680));tiles={};checks={}
paint={}
for style,offset in [('open',0),('grip',2040)]:
 im=old.crop((offset,0,offset+340,680));f=np.array(old_front.crop((0 if style=='open' else 340,0,340 if style=='open' else 680,680)))
 mask=np.maximum(np.maximum(left,right)*fade,f[:,:,3]/255)
 a=masked(im,mask);a[:365,:,3]=0;a[535:,:,3]=0
 paint[style]=a
 fronts.paste(Image.fromarray(f),(0 if style=='open' else 340,0))
# The master has a dedicated upright handle grasp. Only the connected right
# arm/object are selected; generated face/belly/stool/feet never enter the game.
mapped=shaker.transform((340,680),Image.Transform.AFFINE,(1/.39,0,3/.39,0,1/.39,-7/.39),Image.Resampling.BICUBIC)
# The clean arm layer was extracted with image_gen. Its alpha already follows
# the actual fingers, handle and gourd, without cheek pixels or polygon cuts.
sh=np.array(mapped)
root_fade=np.where((xx<272)&(yy>340),smooth((yy-365)/35),1)
sh[:,:,3]=np.rint(sh[:,:,3]*root_fade).astype('uint8')
components,_=label(sh[:,:,3]>16);sizes=np.bincount(components.ravel());sizes[0]=0
sh[~binary_dilation(components==sizes.argmax(),iterations=1),3]=0
object_boundary=[(310,303),(333,330),(328,370),(290,390),(282,410),(277,472)]
left_open=paint['open'].copy();left_open[:,170:,3]=0
c=Image.fromarray(left_open);c.alpha_composite(Image.fromarray(sh));paint['shaker']=np.array(c)
# No second front pass is needed for a painted shaker already held in fingers.
for row,style in enumerate(['open','grip','shaker']):
 a=paint[style];arms.paste(Image.fromarray(a),(row*340,0));tiles[style]=[]
 for y in range(40):
  for x in range(20):
   if a[y*17:(y+1)*17,x*17:(x+1)*17,3].max()>0:tiles[style].append([x,y])
 checks[style]={'opaque':int((a[:,:,3]>128).sum())}
arms.save(out/'arms.png',optimize=True);fronts.save(out/'front.png',optimize=True)
# Body below the expression boundary is always the SAME neutral original.
neutral=np.array(original.crop((150,0,490,680)))
bodies=Image.new('RGBA',(2040,680));frames={'bodyFrames':[],'drumFrames':[]};rows=[]
for i,bx in enumerate([150,600,1080]):
 a=neutral.copy();
 # Remove the old resting wing fringe beneath the moving arm, retaining
 # the original belly texture and hips. Feathered alpha, never painted fill.
 ys=np.arange(680);edge=np.interp(ys,[0,390,402,425,450,480,500,679],[0,0,74,65,55,47,0,0]);coverage=np.minimum(smooth((xx-edge[:,None]+2)/4),smooth((340-edge[:,None]-xx+2)/4));a[:,:,3]=np.rint(a[:,:,3]*coverage).astype('uint8')
 head=np.array(original.crop((bx,0,bx+340,680)));a[:365]=head[:365]
 for line_index,line in enumerate(a[:,:,3]):
  if line_index==0:rows.append([])
  active=np.r_[False,line>16,False];rows[-1].append(np.where(active[1:]!=active[:-1])[0].tolist())
 bodies.paste(Image.fromarray(a),(i*340,0));frames['bodyFrames'].append([i*340,0,340,680])
 # Exact v35 neutral foot hole: its joint remains fixed during arm motion.
 old_neutral=np.array(old.crop((0,0,340,680)));old_drum=np.array(old.crop((1020,0,1360,680)))
 removed=(old_neutral[:,:,3]>0)&(old_drum[:,:,3]==0);a[removed,3]=0
 bodies.paste(Image.fromarray(a),((i+3)*340,0));frames['drumFrames'].append([(i+3)*340,0,340,680])
bodies.save(out/'body.png',optimize=True)
meta={'revision':36,'frames':frames,'styles':['open','grip','shaker'],'tiles':tiles,'hitRows':rows,'sources':{},'files':{},'checks':checks,'shakerObjectPolygon':object_boundary}
for p in ['sources/v23/music-rig.png','dist/assets/music-render-v35/body.png','dist/assets/music-render-v35/front.png','sources/v36/shaker-grip-master.png','sources/v36/shaker-arm.png']:
 meta['sources'][p]=hashlib.sha256((root/p).read_bytes()).hexdigest()
for p in out.glob('*.png'):meta['files'][p.name]=hashlib.sha256(p.read_bytes()).hexdigest()
(out/'manifest.json').write_text(json.dumps(meta,separators=(',',':'))+'\n')
print('Prepared static body and connected arms v36:',[(p.name,p.stat().st_size) for p in out.iterdir()])
