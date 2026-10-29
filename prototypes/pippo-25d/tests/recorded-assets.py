from pathlib import Path
import json,hashlib,subprocess
import numpy as np
r=Path(__file__).resolve().parents[1]/'dist/assets/audio';m=json.loads((r/'manifest.json').read_text());assert len(m['samples'])==26
assert sum(s['bytes'] for s in m['samples'])<1000000
for s in m['samples']:
 b=(r/s['file']).read_bytes();assert len(b)==s['bytes'];assert hashlib.sha256(b).hexdigest()==s['sha256'];assert s['license'] in ['CC0','CC0-1.0','Iowa MIS unrestricted use'],s['license']
 a=np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i',str(r/s['file']),'-f','f32le','-ac','1','-ar','44100','-']),dtype='<f4');assert np.isfinite(a).all() and .01<max(abs(a))<1;assert abs(len(a)/44100-s['duration'])<.03
 if s['note']:
  n=s['note'];semi={'C':0,'D':2,'E':4,'F':5,'G':7,'A':9,'B':11}[n[0]];hz=440*2**(((int(n[1])+1)*12+semi-69)/12);clip=a[:int(.6*44100)];sp=abs(np.fft.rfft(clip*np.hanning(len(clip)),n=262144));f=np.fft.rfftfreq(262144,1/44100);mask=(f>hz*.97)&(f<hz*1.03);peak=f[mask][np.argmax(sp[mask])];assert abs(1200*np.log2(peak/hz))<25,(n,peak)
for kind,count in [('keyboard',8),('xylophone',8),('drum',5),('shaker',1),('tambourine',1)]:assert len(m['instruments'][kind])==count
print('PASS: 26 hashes, licensed sources, decoded audio, levels, recorded note tuning and <1 MB budget')
