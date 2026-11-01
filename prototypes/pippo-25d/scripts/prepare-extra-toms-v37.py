"""Two real CC0 acoustic recordings, no pitch shifting or synthesis."""
from pathlib import Path
import numpy as np,subprocess,json,hashlib
root=Path(__file__).resolve().parents[1];out=root/'dist/assets/audio';manifest=out/'manifest.json';m=json.loads(manifest.read_text())
for name,source in [('tom-high','hi'),('floor-tom','lo')]:
 p=root/'sources/v37/audio'/f'{name}.flac'
 raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(p),'-f','f32le','-ac','1','-ar','44100','-'])
 a=np.frombuffer(raw,dtype='<f4').copy();a*=.78/max(abs(a));n=len(a)
 a[:44]*=np.linspace(0,1,44);a[-220:]*=np.linspace(1,0,220)
 dst=out/f'{name}.mp3'
 subprocess.run(['ffmpeg','-y','-v','error','-f','f32le','-ar','44100','-ac','1','-i','-','-codec:a','libmp3lame','-b:a','128k',str(dst)],input=a.tobytes(),check=True)
 b=dst.read_bytes();sample={'id':name,'file':dst.name,'duration':n/44100,'note':None,'sample_rate':44100,'channels':1,'source_file':str(p.relative_to(root)),'source_url':f'https://raw.githubusercontent.com/sonic-pi-net/sonic-pi/dev/etc/samples/drum_tom_{source}_soft.flac','source_page':'https://github.com/sonic-pi-net/sonic-pi/blob/dev/etc/samples/README.md','source_sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'source_start':0,'source_end':n/44100,'author':'menegass / Freesound; trimmed by Sonic Pi contributors','license':'CC0-1.0','processing':'mono mix, peak gain, 1 ms attack and 5 ms tail fade, MP3 128 kbit/s; no EQ, synthesis, pitch shifting or reverb','sha256':hashlib.sha256(b).hexdigest(),'bytes':len(b)}
 m['samples']=[s for s in m['samples'] if s['id']!=name]+[sample]
m['instruments']['drum']=m['instruments']['drum'][:5]+[['floor-tom'],['tom-high']]
manifest.write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n')
print('Prepared real high/low tom recordings; existing 26 samples unchanged')
