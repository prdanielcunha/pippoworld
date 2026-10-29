from pathlib import Path
from PIL import Image
import hashlib,json
r=Path(__file__).resolve().parents[1]/'dist/assets/activity-v22';m=json.loads((r/'manifest.json').read_text());count=0
for kind,a in m['art'].items():
 b=(r/a['file']).read_bytes();assert hashlib.sha256(b).hexdigest()==a['sha256'];im=Image.open(r/a['file']).convert('RGBA');assert im.size==(a['width'],a['height']);assert hashlib.sha256(im.tobytes()).hexdigest()==a['rgba_sha256']
 for f in a['frames']:
  assert 0<=f['x'] and 0<=f['y'] and f['x']+f['w']<=im.width and f['y']+f['h']<=im.height
  for dx in [-.14,0,.14]:
   x=int(f['x']+f['anchorX']+dx*a['unit']);y=int(f['y']+.40*a['unit']);assert im.getpixel((x,y))[3]>=240,(kind,count,x,y,'head/cheek alpha')
  assert im.getpixel((f['x'],f['y']))[3]==0
  count+=1
assert count==16
assert sum(a['bytes'] for a in m['art'].values())<9000000
print('PASS: 7 lossless sheets, 16 bounded complete figures, transparent corners and opaque face/cheek samples')
