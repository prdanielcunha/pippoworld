#!/usr/bin/env python3
"""Prepare licensed acoustic recordings for the game, without synthesis.
Usage: python3 scripts/prepare-recorded-audio.py /path/to/download-cache
Original URLs and hashes stay in the manifest. If sources.json is absent, download and verify originals from the tracked manifest.
"""
from pathlib import Path
import sys,json,subprocess,hashlib,urllib.request
import numpy as np
from scipy.signal import find_peaks
root=Path(__file__).resolve().parents[1];cache=Path(sys.argv[1]);out=root/'dist/assets/audio';out.mkdir(parents=True,exist_ok=True);rate=44100
cache.mkdir(parents=True,exist_ok=True)
if (cache/'sources.json').exists():
 sources={s['name']:s for s in json.load(open(cache/'sources.json'))}
else:
 sources={}
 for s in json.loads((out/'manifest.json').read_text())['samples']:
  name=s['source_file'];assert Path(name).name==name
  sources[name]={'name':name,'url':s['source_url'],'page':s['source_page'],'license':s['license'],'author':s['author']}
  target=cache/name
  if not target.exists():target.write_bytes(urllib.request.urlopen(s['source_url']).read())
  assert hashlib.sha256(target.read_bytes()).hexdigest()==s['source_sha256'],name
manifest={'revision':'recorded-music-21','samples':[],'instruments':{'keyboard':[],'xylophone':[],'drum':[],'shaker':[],'tambourine':[]}}
waveforms={}
def decode(name):
 if name not in waveforms:waveforms[name]=np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i',str(cache/name),'-ar',str(rate),'-ac','1','-f','f32le','-']),dtype='<f4')
 return waveforms[name]
def first(a):
 level=np.max(np.abs(a));hits=np.flatnonzero(np.abs(a)>max(.00003,level*.025));return max(0,(int(hits[0]) if len(hits) else 0)/rate-.004)
def add(id,name,start,length,note=None):
 a=decode(name);start=max(0,float(start));end=min(len(a)/rate,start+length);clip=a[round(start*rate):round(end*rate)].copy();peak=float(np.max(np.abs(clip)));assert peak>.001,(id,peak)
 clip*=.70/peak;fade=min(len(clip)//3,int(rate*(.07 if id.startswith('piano') else .025)));clip[-fade:]*=np.linspace(1,0,fade);clip[:44]*=np.linspace(0,1,44)
 file=id+'.mp3';subprocess.run(['ffmpeg','-v','error','-y','-f','f32le','-ar',str(rate),'-ac','1','-i','pipe:0','-c:a','libmp3lame','-b:a','128k',str(out/file)],input=clip.astype('<f4').tobytes(),check=True)
 s=sources[name];m={'id':id,'file':file,'duration':len(clip)/rate,'note':note,'sample_rate':rate,'channels':1,'source_file':name,'source_url':s['url'],'source_page':s['page'],'source_sha256':hashlib.sha256((cache/name).read_bytes()).hexdigest(),'source_start':start,'source_end':end,'author':s['author'],'license':s['license'],'processing':'mono mix, trim, peak gain, 1 ms attack and short tail fade, MP3 128 kbit/s; no EQ, synthesis, pitch shifting or reverb','sha256':hashlib.sha256((out/file).read_bytes()).hexdigest(),'bytes':(out/file).stat().st_size};manifest['samples'].append(m);return id
for n in ['C4','D4','E4','F4','G4','A4','B4','C5']:
 name='piano-'+n+'.aiff';a=decode(name);manifest['instruments']['keyboard'].append([add('piano-'+n,name,first(a),3.8,n)])
# The Iowa file contains chromatic notes, not eight evenly spaced white notes.
def onsets(name):
 a=decode(name);hop=220;energy=np.array([np.max(np.abs(a[i:i+hop])) for i in range(0,len(a),hop)]);pk,_=find_peaks(energy,height=energy.max()*.15,prominence=energy.max()*.08,distance=int(.8*rate/hop));assert len(pk)==12,(name,len(pk));starts=[]
 for p in pk:
  left=max(0,p-int(.10*rate/hop));segment=a[left*hop:(p+1)*hop];starts.append(left*hop/rate+first(segment))
 return starts
x5=onsets('xylophone-C5B5.aif');x6=onsets('xylophone-C6B6.aif')
for i,(n,semi) in enumerate(zip(['C5','D5','E5','F5','G5','A5','B5','C6'],[0,2,4,5,7,9,11,0])):
 name='xylophone-C5B5.aif' if i<7 else 'xylophone-C6B6.aif';start=(x5 if i<7 else x6)[semi];manifest['instruments']['xylophone'].append([add('xylophone-'+n,name,start,1.35,n)])
for n in ['kick','snare','tom','hihat','cymbal']:
 name=n+'.flac';a=decode(name);manifest['instruments']['drum'].append([add(n,name,first(a),min(2.2,len(a)/rate))])
maracas=[]
for i in [1,2,3]:
 name='maraca'+str(i)+'.wav';a=decode(name);maracas.append(add('maraca-'+str(i),name,first(a),min(1,len(a)/rate)))
manifest['instruments']['shaker'].append(maracas)
name='pandeiro-collection.mp3';a=decode(name);pandeiros=[]
for i,(start,length) in enumerate([(.91,1.45),(3.80,1.45)]):
 window=a[int(start*rate):int((start+length)*rate)];pandeiros.append(add('pandeiro-'+str(i+1),name,start+first(window),length))
manifest['instruments']['tambourine'].append(pandeiros)
(out/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n');print(len(manifest['samples']),'real recorded clips;',sum(s['bytes'] for s in manifest['samples']),'bytes')
