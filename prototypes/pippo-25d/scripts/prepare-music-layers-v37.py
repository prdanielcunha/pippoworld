"""Clean native arm alpha; stationary upper arms and smoothly turning wrists.

No torso-derived polygon is allowed to become a wrist outline. Moving parts
are feathered partitions of complete clean limbs, never rectangular hand cuts.
"""
from pathlib import Path
import numpy as np,json,hashlib,os
from PIL import Image
from scipy.ndimage import label,binary_dilation
root=Path(__file__).resolve().parents[1];out=root/'dist/assets/music-render-v37';out.mkdir(exist_ok=True)
def save(im,path):
 temp=path.with_suffix('.png.tmp');im.save(temp,format='PNG',optimize=True)
 with Image.open(temp) as check:check.verify()
 os.replace(temp,path)
def smooth(t):
 t=np.clip(t,0,1);return t*t*(3-2*t)
def mapped(name,scale,ox,oy):
 im=Image.open(root/name).convert('RGBA')
 return np.array(im.transform((340,680),Image.Transform.AFFINE,(1/scale,0,-ox/scale,0,1/scale,-oy/scale),Image.Resampling.BICUBIC))
yy,xx=np.mgrid[:680,:340]
sources=['sources/v37/open-arms.png','sources/v37/grip-arms.png','sources/v36/shaker-arm.png']
opened=mapped(sources[0],(340/270)/(887/314),-30*(340/270),-34*(340/270)-20)
grip=mapped(sources[1],.323,29,130)
shaker=mapped(sources[2],.39,-3,7)
for a in [opened,grip]:a[:,:,3]=np.rint(a[:,:,3]*smooth((yy-365)/30)).astype('uint8')
shaker[:,:,3]=np.rint(shaker[:,:,3]*np.where((xx<272)&(yy>340),smooth((yy-365)/35),1)).astype('uint8')
sh=opened.copy();sh[:,170:,3]=0;im=Image.fromarray(sh);im.alpha_composite(Image.fromarray(shaker));sh=np.array(im)
static=Image.new('RGBA',(1020,680));moving=Image.new('RGBA',(2040,680));styles=['open','grip','shaker']
for row,(style,a) in enumerate(zip(styles,[opened,grip,sh])):
 # Disconnected source specks cannot become animated triangles.
 labs,_=label(a[:,:,3]>16);sizes=np.bincount(labs.ravel());sizes[0]=0
 ids=np.argsort(sizes)[-2:];keep=binary_dilation(np.isin(labs,ids),iterations=1);a[~keep,3]=0
 m=smooth((yy-(430 if style=='open' else 418))/24)
 if style=='shaker':m=np.where(xx<170,smooth((yy-430)/24),np.maximum(smooth((yy-400)/22),smooth((xx-271)/9)))
 # Overlap is confined to the feathered wrist collar, well below the shoulder.
 cap=a.copy();cap[:,:,3]=np.rint(cap[:,:,3]*np.minimum(1,(1-m)*2)).astype('uint8');static.paste(Image.fromarray(cap),(row*340,0))
 for side in [0,1]:
  part=a.copy();part[:,:,3]=np.rint(part[:,:,3]*m*(xx<170 if side==0 else xx>=170)).astype('uint8')
  moving.paste(Image.fromarray(part),((row*2+side)*340,0))
save(static,out/'static.png');save(moving,out/'moving.png')
# Same neutral original torso for every expression. Bass uses the musician's
# RIGHT foot: viewer LEFT. The other foot remains part of the original body.
old=Image.open(root/'dist/assets/music-render-v36/body.png').convert('RGBA');base=np.array(old.crop((0,0,340,680)))
bodies=Image.new('RGBA',(2040,680));feet=Image.new('RGBA',(120,118));frames={'bodyFrames':[],'drumFrames':[]};rows=[]
patch=base[535:653,30:150];rgb=patch[:,:,:3].astype(float)
mask=(rgb[:,:,0]>170)&(rgb[:,:,0]>rgb[:,:,1]*1.5)&(rgb[:,:,1]>rgb[:,:,2]*1.7)&(rgb[:,:,2]<100)
foot=np.zeros_like(patch);foot[mask]=patch[mask];feet.paste(Image.fromarray(foot));save(feet,out/'feet.png')
for i in range(3):
 a=base.copy();a[:365]=np.array(old.crop((i*340,0,(i+1)*340,680)))[:365]
 bodies.paste(Image.fromarray(a),(i*340,0));frames['bodyFrames'].append([i*340,0,340,680])
 spans=[]
 for line in a[:,:,3]:
  active=np.r_[False,line>16,False];spans.append(np.where(active[1:]!=active[:-1])[0].tolist())
 rows.append(spans);a[535:653,30:150,3][mask]=0
 bodies.paste(Image.fromarray(a),((i+3)*340,0));frames['drumFrames'].append([(i+3)*340,0,340,680])
save(bodies,out/'body.png')
meta={'revision':37,'styles':styles,'frames':frames,'hitRows':rows,'sources':{},'files':{}}
for p in sources+['dist/assets/music-render-v36/body.png']:meta['sources'][p]=hashlib.sha256((root/p).read_bytes()).hexdigest()
for p in out.glob('*.png'):meta['files'][p.name]=hashlib.sha256(p.read_bytes()).hexdigest()
(out/'manifest.json').write_text(json.dumps(meta,separators=(',',':'))+'\n')
print('Prepared v37 native silhouettes, fixed shoulders, feathered wrist collars and right-foot bass pedal')
