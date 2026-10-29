#!/usr/bin/env python3
"""Restore erased pale cheeks from immutable source sheets in bounded regions.
This repairs alpha masks; it never generates or redraws the character.
"""
from PIL import Image,ImageDraw
from pathlib import Path
import numpy as np,json
from scipy.spatial import ConvexHull
ROOT=Path(__file__).resolve().parents[1]
# Coordinates are inside the original crop, excluding its 2px padding.
REGIONS={
'jump0':[90,75,214,146],'jump1':[65,80,223,151],'jump2':[75,62,235,142],'jump3':[80,75,232,145],
'stand':[20,85,177,156],'down':[45,85,212,166],'crouch':[55,83,223,164],'up':[35,75,191,154],
'sit':[35,98,196,190],'rest':[0,95,145,177],'rise':[30,100,230,197],'wave':[25,75,170,172],
'observe':[65,85,200,178],'receive':[30,85,180,178],'hold':[0,85,163,174],'return':[30,95,175,180],
'turnLeft':[40,68,212,150],'turnRight':[0,80,180,168],'lookBack':[30,80,178,170],'reach':[60,95,240,177],
'front':[0,110,165,174],'quarterLeft':[0,100,145,175],'quarterRight':[35,95,192,174],
'above':[0,90,169,151],'below':[0,42,196,121],'soles':[35,22,170,110],
'face_neutral':[0,190,238,282],'face_happy':[0,175,235,272],'face_curious':[0,145,264,282],
'face_surprised':[0,160,242,284],'face_laugh':[0,170,255,270],'face_affection':[0,180,256,284],
'face_wink':[0,180,243,276],'face_sleepy':[0,180,242,276],'face_playful':[0,170,246,270],
'face_focused':[0,175,235,276],'face_listening':[0,140,264,266],'face_calm':[0,180,231,272]}

# Keep the repair above each chin/neck join. A convex bridge must never
# pick up warm paper in the gap between a raised wing and the head.
LOWER={'front':160,'quarterLeft':160,'quarterRight':155,'jump0':140,'jump1':140,'jump2':115,'jump3':120,'stand':146,'down':154,'crouch':152,'up':145,'sit':175,'rest':162,'rise':185,'wave':148,'observe':165,'receive':160,'hold':160,'return':165,'turnLeft':118,'turnRight':155,'lookBack':155,'reach':165,'above':151,'below':110,'soles':95}
for name,box in REGIONS.items():box[3]=min(box[3],250 if name.startswith('face_') else LOWER[name])

def restore_native(name,image,meta):
 if name not in REGIONS:return image.copy(),{'changed':0}
 p=meta['poses'][name];x0,y0,x1,y1=REGIONS[name];x0+=2;y0+=2;x1+=2;y1+=2
 old=np.array(image);a=old[:,:,3];band=np.zeros(a.shape,bool);band[y0:y1,x0:x1]=True
 yy,xx=np.nonzero((a>240)&band);points=np.stack([xx,yy],axis=1)
 hull=ConvexHull(points);mask=Image.new('L',image.size);ImageDraw.Draw(mask).polygon([tuple(v) for v in points[hull.vertices]],fill=255)
 allowed=(np.array(mask)>0)&band
 sheet=Image.open(ROOT/'dist/assets/canon'/meta['provenance'][p['sheet']]['file']).convert('RGBA')
 raw=np.array(sheet.crop((p['sx']-2,p['sy']-2,p['sx']+p['w']+2,p['sy']+p['h']+2)))
 paper=np.array(p['paperRows']).reshape(-1,3);paper=np.pad(paper,((2,2),(0,0)),mode='edge')[:,None,:]
 contrast=np.linalg.norm(raw[:,:,:3].astype(float)-paper,axis=2)
 coverage=np.clip((contrast-8)/17,0,1)*255
 alpha=np.where(allowed,coverage,0).astype('uint8')
 # Pale fur can have the same RGB as paper. Once a scanline has actual
 # foreground on both sides, its enclosed face interval is opaque, even
 # when a cream highlight fails the color contrast test.
 for y in range(y0,min(y1,a.shape[0])):
  anchors=np.flatnonzero(allowed[y]&(contrast[y]>=15))
  if len(anchors)>1:alpha[y,anchors[0]:anchors[-1]+1]=255
 # Weak paper/grain samples cannot become a new pale halo. Fully opaque
 # supplied pixels stay byte-for-byte intact, including the eyes and beak.
 alpha[alpha<64]=0
 changed=(alpha>a)&(a<250)
 out=old.copy();out[changed,:3]=raw[changed,:3];out[changed,3]=alpha[changed]
 return Image.fromarray(out),{'changed':int(changed.sum()),'region':[x0,y0,x1,y1]}

def prepared_images(src,meta):
 images={};report={}
 for name in meta['poses']:
  im=Image.open(src/'PNG'/(name+'.png')).convert('RGBA');images[name],report[name]=restore_native(name,im,meta)
 b=meta['poses']['body_front'];jx=200+b['join']['x']-b['anchor'];jy=390+b['join']['y']-b['h']
 for name in [n for n in images if n.startswith('face_')]:
  p=meta['poses'][name];scale=323*.56/p['neck']['y'];before=Image.open(src/'PNG'/(name+'.png')).convert('RGBA');after=images[name]
  size=(round(after.width*scale),round(after.height*scale));xy=(round(jx-(p['neck']['x']+2)*scale),round(jy-(p['neck']['y']+2)*scale))
  layers=[]
  for im in [before,after]:
   layer=Image.new('RGBA',(400,400));layer.alpha_composite(im.resize(size,Image.Resampling.LANCZOS),xy);layers.append(np.array(layer))
  oldhead,newhead=layers;full=np.array(Image.open(src/'expressoes-completas'/('expressao_'+name[5:]+'.png')).convert('RGBA'))
  # Only the repaired source-head samples are mapped; body/neck stay intact.
  change=(newhead[:,:,3].astype(int)>oldhead[:,:,3].astype(int)+1)&(newhead[:,:,3]>full[:,:,3])&(full[:,:,3]<250)
  full[change]=newhead[change]
  key='assembled_'+name[5:];images[key]=Image.fromarray(full);rx0,ry0,rx1,ry1=report[name]['region'];report[key]={'changed':int(change.sum()),'source_head':name,'region':[max(0,int(xy[0]+rx0*scale)-3),max(0,int(xy[1]+ry0*scale)-3),min(400,int(xy[0]+rx1*scale)+4),min(400,int(xy[1]+ry1*scale)+4)]}
 return images,report

if __name__=='__main__':
 import sys
 src=Path(sys.argv[1]);dest=Path(sys.argv[2]);dest.mkdir(exist_ok=True,parents=True);meta=json.loads((ROOT/'dist/assets/canon/poses.json').read_text());images,report=prepared_images(src,meta)
 for n,im in images.items():im.save(dest/(n+'.png'))
 (dest/'repair-report.json').write_text(json.dumps(report,indent=2));print(sum(r['changed'] for r in report.values()),'restored samples')
