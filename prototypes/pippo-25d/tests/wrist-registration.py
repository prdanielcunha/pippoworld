"""Validate the actual opaque art at registered wrist/body attachment points."""
from pathlib import Path
import re
from PIL import Image
rig=Path('dist/music-rig.js').read_text()
entries=re.findall(r'crop:\[(\d+),(\d+),(\d+),(\d+)\],P:\[[^\]]+\],W:\[(\d+),(\d+)\](,tool:true)?',rig)
assert len(entries)==8
for x,y,w,h,wx,wy,tool in entries:
    im=Image.open('dist/assets/grips-v30/hands.png' if tool else 'dist/assets/hands-approved-v27/hands.png').convert('RGBA')
    px,py=int(x)+int(wx),int(y)+int(wy)
    samples=[im.getpixel((px+dx,py+dy)) for dx in range(-3,4) for dy in range(-3,4)]
    assert min(p[3] for p in samples)>220,('wrist anchor must be inside continuous painted feathers',px,py)
body=Image.open('dist/assets/music-rig-v23/rig.webp').convert('RGBA')
for bx in [150,600,1080]:
    for x,y in [(91,425),(249,425),(91,430),(249,430),(62,472),(249,495)]:
        samples=[body.getpixel((bx+x+dx,y+dy)) for dx in range(-4,5) for dy in range(-4,5)]
        assert min(p[3] for p in samples)>220,'joint must overlap the original body in every expression'
print('PASS: 8 opaque source wrist anchors, 18 opaque body registrations across all expressions')
