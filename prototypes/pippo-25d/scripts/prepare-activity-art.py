#!/usr/bin/env python3
"""Re-encode the seven original generated PNG sheets losslessly.
Usage: python3 scripts/prepare-activity-art.py PNG_DIRECTORY
The tracked WebPs already contain all RGBA pixels; originals are matched by SHA256.
No matting, resizing, recoloring or compositing is performed.
"""
from pathlib import Path
from PIL import Image
import hashlib,json,sys
root=Path(__file__).resolve().parents[1];folder=Path(sys.argv[1]);out=root/'dist/assets/activity-v22';m=json.loads((out/'manifest.json').read_text());lookup={hashlib.sha256(p.read_bytes()).hexdigest():p for p in folder.glob('*.png')}
for kind,a in m['art'].items():
 source=lookup.get(a['source_sha256']);assert source is not None,kind+' PNG source not found by hash'
 im=Image.open(source).convert('RGBA');assert im.size==(a['width'],a['height'])
 target=out/a['file'];im.save(target,'WEBP',lossless=True,exact=True,method=6);decoded=Image.open(target).convert('RGBA');assert decoded.tobytes()==im.tobytes()
 a['rgba_sha256']=hashlib.sha256(decoded.tobytes()).hexdigest();a['sha256']=hashlib.sha256(target.read_bytes()).hexdigest();a['bytes']=target.stat().st_size
(out/'manifest.json').write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n')
print('7 lossless sheets verified; no visible or hidden RGBA pixel changed')
