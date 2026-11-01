from pathlib import Path
from PIL import Image
import numpy as np,json,hashlib
r=Path('dist/assets/music-render-v37');m=json.loads((r/'manifest.json').read_text())
for name,digest in m['files'].items():
 p=r/name;im=Image.open(p);im.verify();assert hashlib.sha256(p.read_bytes()).hexdigest()==digest,name
for name,digest in m['sources'].items():assert hashlib.sha256(Path(name).read_bytes()).hexdigest()==digest,name
a=np.array(Image.open(r/'body.png').convert('RGBA'));original=np.array(Image.open('sources/v23/music-rig.png').convert('RGBA'))
for i,(x,y,w,h) in enumerate(m['frames']['bodyFrames']):
 assert np.array_equal(a[:365,x:x+340],original[:365,[150,600,1080][i]:[150,600,1080][i]+340]),'exact original head RGBA'
 assert a[400:530,x+150:x+200,3].min()>240,'body must be present, not just equal transparent pixels'
 assert np.array_equal(a[365:,x:x+340],a[365:,:340]),'all expressions use the same body'
foot=np.array(Image.open(r/'feet.png').convert('RGBA'));base=a[:,:340].copy();drum=a[:,1020:1360].copy()
image=Image.fromarray(drum);image.alpha_composite(Image.fromarray(foot),(30,535));reconstructed=np.array(image)
assert np.max(np.abs(reconstructed[535:653,30:150,:3].astype(int)-base[535:653,30:150,:3].astype(int))[foot[:,:,3]>200])<=2,'right foot reconnects at its exact source position'
print('PASS: v37 PNG CRC/hashes, actual opaque original body, exact faces, fixed body across expressions, musician-right foot registration')
