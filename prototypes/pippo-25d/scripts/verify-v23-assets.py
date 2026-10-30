from pathlib import Path
from PIL import Image
import hashlib,json
pairs=[('sources/v23/music-rig.png','dist/assets/music-rig-v23/rig.webp'),('sources/v23/sit-transition.png','dist/assets/music-rig-v23/sit.webp'),('sources/v23/passing-near.png','dist/assets/gait-v23/passing-near.webp'),('sources/v23/passing-far.png','dist/assets/gait-v23/passing-far.webp')]
items=[]
for source,target in pairs:
 a,b=Image.open(source),Image.open(target)
 assert a.mode==b.mode=='RGBA' and a.size==b.size and a.tobytes()==b.tobytes(),target
 assert a.getpixel((0,0))[3]==0 and a.getpixel((a.width-1,a.height-1))[3]==0,'transparent corners'
 items.append({'source':source,'file':target,'size':list(a.size),'bytes':Path(target).stat().st_size,'source_sha256':hashlib.sha256(Path(source).read_bytes()).hexdigest(),'sha256':hashlib.sha256(Path(target).read_bytes()).hexdigest(),'rgba_sha256':hashlib.sha256(a.tobytes()).hexdigest()})
im=Image.open(pairs[0][0]);landmarks=[(215,952),(350,950),(689,875),(860,875),(180,714),(370,715),(690,722),(850,715)]
assert all(im.getpixel(p)[3]>200 for p in landmarks),'musical wing contacts/joints must be actual opaque painted pixels'
for base in ['passing-near','passing-far']:
 m=json.loads(Path('dist/assets/gait-v23/'+base+'.json').read_text());im=Image.open('dist/assets/gait-v23/'+m['file'])
 for f in m['frames']:
  assert f['x']>=0 and f['y']>=0 and f['x']+f['w']<=im.width and f['y']+f['h']<=im.height
  assert 0<f['anchor']<f['w'] and f['unit']>0
manifest={'revision':'music-contact-23','tool':'Built-in image generation; original Pippo references','images':items,'source_immutability':'Approved v20 atlases and canonical originals unchanged; existing face-restoration and clean-cutouts tests enforce this.','musical_wing_landmarks':landmarks,'runtime':'One complete head/neck/torso; registered wing sprites; tools and contacts drawn in canvas. Whole-figure gait mesh only; no detached leg sprites.'}
Path('dist/assets/music-rig-v23/manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print('PASS: 4 generated sheets, exact RGBA lossless conversion, actual alpha at 8 wing landmarks, transparent corners and valid gait crops')
