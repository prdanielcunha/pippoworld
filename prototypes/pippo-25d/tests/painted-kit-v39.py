"""Registration of the actual painted playable surfaces, not CSS rectangles."""
from pathlib import Path
from PIL import Image
import json,hashlib,re
root=Path(__file__).resolve().parents[1]
m=json.loads((root/'dist/assets/drum-kit-v39/layout.json').read_text());im=Image.open(root/'sources/v39/drum-kit-master.png').convert('RGBA')
assert im.size==(1536,1024)
assert all(im.getpixel(p)[3]==0 for p in [(0,0),(1535,0),(0,1023),(1535,1023)])
assert len(m['pieces'])==7
html=(root/'dist/index.html').read_text()
for name,want in m['files'].items():assert hashlib.sha256((root/name).read_bytes()).hexdigest()==want,name
for index,piece in m['pieces'].items():
 x,y=piece['skin'];p=im.getpixel((round(x*1536),round(y*1024)))
 assert p[3]>240 and p[0]>110 and p[1]>100,(index,p,'painted skin/cymbal must exist at actual contact')
 assert f'data-piece="{index}" data-skin-x="{x}" data-skin-y="{y}"' in html
 bx,by,bw,bh=piece['box'];assert bx<x<bx+bw and by<y<by+bh
 assert 0<=bx<1 and 0<=by<1 and bx+bw<=1 and by+bh<=1
assert m['pieces']['6']['skin'][0]>m['pieces']['2']['skin'][0],'front view: high tom at audience right'
assert max(m['pieces'][i]['skin'][1] for i in ['2','6'])<m['pieces']['0']['skin'][1],'rack toms above bass drum'
assert m['pieces']['5']['skin'][0]<m['pieces']['0']['skin'][0]<m['pieces']['1']['skin'][0]
print('PASS: transparent master, hashes, 7 real painted contact surfaces, front-view tom/floor/snare arrangement and HTML registration')
