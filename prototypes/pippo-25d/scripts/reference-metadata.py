"""Analyze approved source pixels and write masks/registration JSON only.
Never resaves, redraws, recolors or resizes the reference image files.
"""
from pathlib import Path
import hashlib,json
import numpy as np
from PIL import Image
from scipy import ndimage as nd
root=Path(__file__).resolve().parents[1]/'dist/assets/canon'
sheets={
 'movement':('movement.jpg',[(40,328),(370,667),(707,1011)],['walk0','walk1','walk2','walk3','jump0','jump1','jump2','jump3','stand','down','crouch','up']),
 'contact':('contact.png',[(30,355),(380,683),(710,1017)],['sit','rest','rise','wave','observe','receive','hold','return','turnLeft','turnRight','lookBack','reach']),
 'views':('views.png',[(43,377),(412,735),(765,1037)],['front','quarterLeft','left','backLeft','back','backRight','right','quarterRight','above','below','top','soles']),
 'expressions':('expressions.png',[(28,356),(375,685),(710,1024)],['neutral','happy','curious','surprised','laugh','affection','wink','sleepy','playful','focused','listening','calm'])}
result={'version':1,'maskRevision':'continuous-neck-7','provenance':{},'poses':{}}
for sheet,(filename,rows,names) in sheets.items():
 path=root/filename;im=np.asarray(Image.open(path).convert('RGB')).astype(float);result['provenance'][sheet]={'file':filename,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'source':'user-approved original, byte-for-byte copy'}
 for i,name in enumerate(names):
  col=i%4;row=i//4;x0=col*362;x1=x0+362;y0,y1=rows[row];rgb=im[y0:y1,x0:x1];h,w=rgb.shape[:2]
  # Row-local paper estimate uses empty side strips, avoiding the labels below.
  paper=np.median(np.concatenate([rgb[:,:12],rgb[:,-12:]],axis=1),axis=1)[:,None,:]
  warmth=(rgb[:,:,0]-rgb[:,:,2])-(paper[:,:,0]-paper[:,:,2])
  mask=(warmth>32)|((warmth>12)&(rgb[:,:,0]>239))|((rgb[:,:,2]-rgb[:,:,0]>12)&(rgb[:,:,1]>65))
  mask[:,:3]=False;mask[:,-3:]=False
  if sheet!='expressions' and name not in ['rest','sit','above','below','top','soles','crouch']:
   yy=np.where(mask)[0];floor=int(yy.max());start=max(0,floor-int((floor-yy.min())*.08))
   # In this strip the approved standing/walking figure has orange feet;
   # reject the paper-colored ground bridge between the feet.
   mask[start:floor+1]&=(rgb[start:floor+1,:,0]-rgb[start:floor+1,:,1]>50)
  if name in ['rest','sit'] and sheet=='contact':
   yy=np.where(mask)[0];floor=int(yy.max());start=max(0,floor-int((floor-yy.min())*(.14 if name=='rest' else .04)))
   mask[start:floor+1]&=(rgb[start:floor+1,:,0]-rgb[start:floor+1,:,1]>24)
  labels,n=nd.label(mask);sizes=np.bincount(labels.ravel());sizes[0]=0;largest=int(np.argmax(sizes));mask=labels==largest
  # Close only one-pixel sampling holes; fill the interior to preserve cream cheeks,
  # dark eyes, bill opening and brows without any color-key holes.
  closed=nd.binary_closing(mask,iterations=1);filled=nd.binary_fill_holes(closed)
  if sheet!='expressions' and name not in ['rest','sit','above','below','top','soles']:
   yy=np.where(closed)[0];cut=int(yy.min()+(yy.max()-yy.min())*.82)
   paper_hole=(filled&~closed)&(warmth<45)&(rgb[:,:,0]-rgb[:,:,1]<32)
   filled[cut:][paper_hole[cut:]]=False
  mask=filled
  # The loose ball may touch a wing in the source and therefore belong to the
  # largest connected component. Remove it geometrically, including its stripe;
  # preserve the yellow/orange foreground wing where it overlaps the circle.
  loose_balls={'observe':(284,645,36),'return':(1368,660,39),'reach':(1343,954,42)}
  ball_exclusion=None
  if sheet=='contact' and name in loose_balls:
   cx,cy,radius=loose_balls[name];yy,xx=np.mgrid[y0:y1,x0:x1]
   circle=(xx-cx)**2+(yy-cy)**2<=radius**2
   wing=(rgb[:,:,0]-rgb[:,:,1]>28)&(rgb[:,:,0]-rgb[:,:,2]>60)
   mask[circle&~wing]=False;ball_exclusion=[cx,cy,radius]
   # Filling the old ball/wing enclosure must not turn the paper beneath the
   # arm into an opaque triangle after the ball itself has been removed.
   fy,fx=np.where(mask);lower=yy>fy.min()+y0+(fy.max()-fy.min())*.55
   paper_void=(filled&~closed)&(rgb[:,:,0]-rgb[:,:,2]<85)&(rgb[:,:,0]-rgb[:,:,1]<38)
   mask[lower&paper_void]=False
  if sheet!='expressions' and name not in ['rest','sit','above','below','top','soles','crouch']:
   fy,fx=np.where(mask);cut=int(fy.min()+(fy.max()-fy.min())*.88)
   paper_floor=(rgb[:,:,0]-rgb[:,:,2]<85)&(rgb[:,:,0]-rgb[:,:,1]<38)
   mask[cut:][paper_floor[cut:]]=False
  if sheet=='contact' and name in loose_balls:
   labels,n=nd.label(mask);sizes=np.bincount(labels.ravel());sizes[0]=0;mask=labels==int(np.argmax(sizes))
  neck=None
  if sheet=='expressions':
   yy,xx=np.where(mask);minY,maxY=yy.min(),yy.max();candidates=[]
   for y in range(int(minY+(maxY-minY)*.74),int(minY+(maxY-minY)*.98)):
    span=np.where(mask[y])[0]
    if len(span):candidates.append((int(span[-1]-span[0]+1),y,int(span[0]),int(span[-1])))
   width,ny,nl,nr=min(candidates);neck=((nl+nr)/2,ny)
   mask[min(h,ny+25):]=False
  ys,xs=np.where(mask);bx,by,bw,bh=int(xs.min()),int(ys.min()),int(xs.max()-xs.min()+1),int(ys.max()-ys.min()+1)
  # Store runs of the exact silhouette; the browser keeps original RGB inside.
  runs=[]
  for yy in range(by,by+bh):
   line=mask[yy,bx:bx+bw];edges=np.diff(np.r_[False,line,False].astype(int));starts=np.where(edges==1)[0];ends=np.where(edges==-1)[0]
   for a,b in zip(starts,ends):runs.extend([yy-by,int(a),int(b-a)])
  # Head center is a stable anchor; feet/wing extensions cannot move the actor.
  headY=by+int(bh*.25);lo=max(by,headY-int(bh*.08));hi=min(by+bh,headY+int(bh*.08));hy,hx=np.where(mask[lo:hi]);anchor=float(np.median(hx))-bx
  pose={'sheet':sheet,'sx':x0+bx,'sy':y0+by,'w':bw,'h':bh,'anchor':round(anchor,2),'runs':runs,'sourceCell':i,'contacts':[]}
  bottom=mask[max(by,by+bh-5):by+bh,bx:bx+bw].any(axis=0);edges=np.diff(np.r_[False,bottom,False].astype(int))
  for a,b in zip(np.where(edges==1)[0],np.where(edges==-1)[0]):
   if b-a>=3:pose['contacts'].append({'x':float((a+b)/2),'width':int(b-a)})
  if neck:pose['neck']={'x':round(neck[0]-bx,2),'y':neck[1]-by,'fade':min(32,bh-(neck[1]-by)), 'blendStart':max(0,neck[1]-by-10)}
  if ball_exclusion:pose['looseBallExcluded']=ball_exclusion
  result['poses'][name if sheet!='expressions' else 'face_'+name]=pose
 print(sheet,[(name,result['poses'][name if sheet!='expressions' else 'face_'+name]['h']) for name in names])
# A body-only layer must exclude the old cheeks, not just a horizontal strip.
front=result['poses']['front'];mask=np.zeros((front['h'],front['w']),bool)
for y,x,length in zip(front['runs'][::3],front['runs'][1::3],front['runs'][2::3]):mask[y,x:x+length]=True
yy,xx=np.mgrid[front['sy']:front['sy']+front['h'],front['sx']:front['sx']+front['w']]
mask&=(yy>=236)|((yy>=222)&(xx>=195)&(xx<=245))
runs=[]
for y,line in enumerate(mask):
 edges=np.diff(np.r_[False,line,False].astype(int))
 for a,b in zip(np.where(edges==1)[0],np.where(edges==-1)[0]):runs.extend([y,int(a),int(b-a)])
result['poses']['body_front']={**front,'runs':runs,'role':'body-only','join':{'x':220-front['sx'],'y':244-front['sy']}}
(root/'poses.json').write_text(json.dumps(result,separators=(',',':')))
