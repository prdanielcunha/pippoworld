const assert=require('node:assert/strict'),{spawnSync}=require('node:child_process');
const result=spawnSync('python3',['-c',String.raw`
from PIL import Image
import numpy as np,json,hashlib
from pathlib import Path
root=Path('.');meta=json.load(open('dist/assets/clean-v2/sprites.json'));canon=json.load(open('dist/assets/canon/poses.json'));fixture=json.load(open('tests/fixtures/v19-protected-pixels.json'));masks=np.load('tests/fixtures/v19-protected-pixels.npz');atlases={g:Image.open('dist/assets/clean-v2/'+p['file']) for g,p in meta['atlases'].items()};images={};protected=0
for n,p in meta['sprites'].items():
 im=atlases[p['atlas']].crop((p['x'],p['y'],p['x']+p['w'],p['y']+p['h']));a=np.array(im);images[n]=a
 mask=np.unpackbits(masks[n])[:p['w']*p['h']].reshape(p['h'],p['w']).astype(bool)
 assert hashlib.sha256(a[mask].tobytes()).hexdigest()==fixture[n]['rgba_sha256'],('changed v19 opaque detail or exterior of face region',n)
 protected+=int(mask.sum())
# Regression for the exact pale gap next to the right eye. One of these
# highlights has almost the same color as paper and must still be opaque.
p=canon['poses']['front'];sheet=Image.open('dist/assets/canon/views.png').convert('RGBA')
for x,y in [(154,115),(154,123),(156,133),(151,131)]:
 assert images['front'][y,x,3]==255,('missing cheek',x,y)
 assert tuple(images['front'][y,x,:3])==sheet.getpixel((p['sx']+x-2,p['sy']+y-2))[:3],('must restore original RGB',x,y)
for x,y in [(165,130),(165,115),(0,0)]:assert images['front'][y,x,3]==0,('outside the actual face',x,y)
for n,x,y in [('turnLeft',150,133),('jump2',220,129)]:assert images[n][y,x,3]==0,('keep the real gap between head and wing',n)
for n,p in meta['sprites'].items():
 if n.startswith('assembled_'):assert p['repair']['changed']>0,('review all twelve complete expressions',n)
 if n.startswith('walk'):assert p['pixels_sha256']==p['source_pixels_sha256'],('walking art must be untouched',n)
assert meta['revision']=='face-restoration-20'
print('PASS: restored right-eye/cheek highlights use exact original RGB and opaque alpha; all 12 complete expressions checked; '+str(protected)+' v19 protected pixels unchanged, including opaque eyes, beak, feet, crest/tail and outside repair regions')
`],{encoding:'utf8',maxBuffer:1000000});if(result.stdout)process.stdout.write(result.stdout);if(result.stderr)process.stderr.write(result.stderr);assert.equal(result.status,0,'face restoration regressions');
