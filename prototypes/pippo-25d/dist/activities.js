'use strict';
(()=>{
 const $=id=>document.getElementById(id),game=window.pippoStudy;
 const defaults={volume:.45,muted:false,replies:true,reduced:game.getState().reduced};let prefs={...defaults};
 try{const p=JSON.parse(localStorage.getItem('pippo.preferences.v1')||'{}');for(const k of ['muted','replies','reduced'])if(typeof p[k]==='boolean')prefs[k]=p[k];if(typeof p.volume==='number'&&Number.isFinite(p.volume))prefs.volume=Math.max(0,Math.min(.8,p.volume))}catch{}
 const save=()=>{try{localStorage.setItem('pippo.preferences.v1',JSON.stringify(prefs))}catch{}};
 const audio=PippoAudio.create({onAttack:hit=>{game.react({music:true,...hit,id:held.has(hit.id)?hit.id:null})},onError:()=>{$('retryAudio').hidden=false;$('musicStatus').textContent='O som não abriu. Tente carregar novamente.'},onReady:()=>{audioReady=true;refreshReady()}});
 audio.setVolume(prefs.volume);audio.setMuted(prefs.muted);game.setReduced(prefs.reduced);
 const notes=['Dó','Ré','Mi','Fá','Sol','Lá','Si','Dó'];let audioReady=false,artReady=!window.PippoMusicRig;const useTouchEvents=typeof window.TouchEvent==='function'||'ontouchstart' in window;let activity='yard',instrument='keyboard',blocked=false,waterTime=null,bloom=false;
 const held=new Map(),keyboardHeld=new Set();let inputClock=0,lastOnset=null;let phrase=[],replyWait=null,replyCursor=null,replyClock=0,flashClock=0;
 const titles={yard:'Vamos brincar.',music:'Uma música com Pippo.',garden:'O jardim do Pippo.'};
 function status(s){$('musicStatus').textContent=s}
 function clearReply(){replyWait=null;replyCursor=null;replyClock=0;for(let i=0;i<3;i++)audio.release('reply'+i);for(const key of document.querySelectorAll('.reply'))key.classList.remove('reply')}
 function clearHeld(){window.PippoMusicRig?.performance.reset(instrument);held.clear();keyboardHeld.clear();$('musicPanel').dataset.held='0';for(const e of document.querySelectorAll('.playing'))e.classList.remove('playing')}
 function halt(){clearReply();clearHeld();phrase=[];lastOnset=null;audio.suspend()}
 function setActivity(next){
  if(!titles[next])return;halt();waterTime=null;$('gardenObjects').classList.remove('watering');$('gardenObjects').dataset.pouring='false';$('gardenObjects').style?.setProperty('--pour',bloom?'1':'0');game.setGarden?.(bloom?1:0,false);activity=next;document.body.dataset.activity=next;
  $('musicPanel').hidden=next!=='music';$('instrumentNav').hidden=next!=='music';$('gardenObjects').hidden=next!=='garden';$('ball').hidden=next!=='yard';$('directions').hidden=next!=='yard';$('gestures').hidden=next!=='yard';
  for(const b of document.querySelectorAll('[data-place]'))b.setAttribute('aria-pressed',String(b.dataset.place===next));
  $('sceneTitle').textContent=titles[next];$('hint').textContent=next==='yard'?'Toque ao lado para andar. Deslize na cabeça ou barriga para carinho.':next==='music'?'Pippo está aqui para ouvir você.':'Toque no regador para abrir a flor.';
  $('stage').setAttribute('aria-label',next==='yard'?'Quintal: toque no chão para andar e no Pippo para carinho':next==='music'?'Casa da Música: Pippo escuta os instrumentos':'Jardim: toque no regador ou na flor');$('pippo').setAttribute('aria-label',next==='yard'?'Pippo: toque ao lado para andar e deslize na cabeça ou barriga para carinho. Setas para andar.':'Pippo: deslize na cabeça ou barriga para carinho');if(next==='music')prepareAudio();game.setActivity(next);game.setInstrument?.(instrument);$('status').textContent=next==='music'?'Escolha um instrumento e toque.':next==='garden'?(bloom?'A flor continua aberta.':'A flor está fechadinha. O regador está aqui.'):'A bola está aqui. Podemos brincar sem pressa.';
 }
 function refreshReady(){const ready=audioReady&&artReady;$('musicPanel').dataset.ready=String(ready);if(ready){$('retryAudio').hidden=true;if(activity==='music')status('Toque nos instrumentos. Pode tocar junto.')}}
 function prepareAudio(){
  refreshReady();if(audioReady&&artReady)return;
  status('Preparando os sons e os desenhos dos instrumentos…');
  if(window.PippoMusicRig&&!artReady)window.PippoMusicRig.prepare().then(ok=>{artReady=ok;refreshReady();if(!ok){$('retryAudio').hidden=false;status('Os desenhos não carregaram. Toque para tentar novamente.')}});
  if(!audioReady){if(audio.load)audio.load().catch(()=>{});else audioReady=true}refreshReady();
 }
 $('retryAudio').onclick=()=>{if(activity==='music')prepareAudio()};
 function selectInstrument(next){
  if(!['keyboard','drum','xylophone','shaker','tambourine'].includes(next))return;
  halt();instrument=next;$('keys').hidden=!['keyboard','xylophone'].includes(next);$('percussion').hidden=['keyboard','xylophone','drum'].includes(next);$('drumKit').hidden=next!=='drum';$('keyboardStand').hidden=!['keyboard','xylophone'].includes(next);
  $('musicPanel').dataset.instrument=next;document.body.dataset.instrument=next;game.setInstrument?.(next);
  for(const b of document.querySelectorAll('button[data-instrument]'))b.setAttribute('aria-pressed',String(b.dataset.instrument===next));
  $('percussion').dataset.kind=next;$('percussion').setAttribute('aria-label',{drum:'Tocar tambor',shaker:'Tocar chocalho',tambourine:'Tocar pandeiro'}[next]||'Tocar');
  $('percussionName').textContent={drum:'Tambor',shaker:'Chocalho',tambourine:'Pandeiro'}[next]||'';
  status('Toque para experimentar. Pippo escuta e espera.');
 }
 function playGesture(id,index,automatic=false){const sounded=audio.play(id,instrument,index,{automatic});if(!audio.attackEvents||!sounded)game.react({music:true,instrument,index,id:held.has(id)?id:null,automatic})}
 function start(id,index,element){
  if(activity!=='music'||blocked||game.getState().paused||held.has(id))return;
  if(!audioReady||!artReady){status('Preparando os sons e os desenhos dos instrumentos…');return}

  if(replyCursor!==null){phrase=[];lastOnset=null}clearReply();if(phrase.length>=3)phrase.shift();phrase.push({index,gap:lastOnset===null?0:Math.max(35,inputClock-lastOnset)});lastOnset=inputClock;held.set(id,{index,element});element.classList.add('playing');
  playGesture(id,index);$('musicPanel').dataset.held=String(held.size);status(prefs.muted?'Som desligado. Você pode ligar nos ajustes.':instrument==='keyboard'||instrument==='xylophone'?notes[index]+'.':'Você tocou.');
 }
 function end(id,oneShot=false,cancelled=false){window.PippoMusicRig?.performance.release(id);const h=held.get(id);if(!h)return;held.delete(id);if(cancelled||instrument==='keyboard'&&!oneShot)audio.release(id);$('musicPanel').dataset.held=String(held.size);if(![...held.values()].some(v=>v.element===h.element))h.element.classList.remove('playing');if(held.size===0){replyWait=1250;status('Pippo está ouvindo…')}}
 const drumParts=[...document.querySelectorAll('[data-piece]')];
 function pointerControl(element,index){
  element.addEventListener('pointerdown',e=>{if(e.button>0||e.pointerType==='touch'&&useTouchEvents)return;e.preventDefault();if(e.pointerType!=='touch')element.focus({preventScroll:true});try{element.setPointerCapture(e.pointerId)}catch{}start('pointer'+e.pointerId,index,element);const h=held.get('pointer'+e.pointerId);if(h){h.x=e.clientX;h.y=e.clientY}});
  element.addEventListener('pointermove',e=>{const id='pointer'+e.pointerId,h=held.get(id);if(instrument!=='shaker'||!h||blocked||game.getState().paused)return;if(Math.hypot(e.clientX-h.x,e.clientY-h.y)>18){playGesture(id,0);h.x=e.clientX;h.y=e.clientY}});
  for(const event of ['pointerup','pointercancel','lostpointercapture'])element.addEventListener(event,e=>end('pointer'+e.pointerId,false,event!=='pointerup'));
  element.addEventListener('click',e=>{if(e.detail!==0)return;const id='accessible'+index;start(id,index,element);end(id,true)});
 }
 for(const key of document.querySelectorAll('[data-note]'))pointerControl(key,Number(key.dataset.note));pointerControl($('percussion'),0);for(const part of drumParts)pointerControl(part,Number(part.dataset.piece));
 // TouchEvents keep every finger independent on iPhone/iPad, without focus
 // transfers or a primary-pointer gate. Pointer events remain for mouse/pen.
 function touchTarget(touch){
  const hit=document.elementFromPoint?.(touch.clientX,touch.clientY)||touch.target;
  const el=hit?.closest?.('[data-note],[data-piece],#percussion');
  return el&&$('musicPanel').contains(el)?el:null;
 }
 function touchMove(e){
  if(activity!=='music')return;e.preventDefault();
  for(const touch of e.changedTouches){const id='touch'+touch.identifier,el=touchTarget(touch),old=held.get(id);
   if(old?.element===el){if(instrument==='shaker'&&Math.hypot(touch.clientX-(old.x??touch.clientX),touch.clientY-(old.y??touch.clientY))>18){playGesture(id,0);old.x=touch.clientX;old.y=touch.clientY}continue;}if(old)end(id,false,true);
   if(el){start(id,Number(el.dataset.note??el.dataset.piece??0),el);const h=held.get(id);if(h){h.x=touch.clientX;h.y=touch.clientY}}
  }
 }
 $('musicPanel').addEventListener('touchstart',touchMove,{passive:false});$('musicPanel').addEventListener('touchmove',touchMove,{passive:false});
 for(const event of ['touchend','touchcancel'])$('musicPanel').addEventListener(event,e=>{e.preventDefault();for(const t of e.changedTouches)end('touch'+t.identifier,false,event==='touchcancel')},{passive:false});
 document.addEventListener('keydown',e=>{
  if(activity!=='music'||blocked||$('comparison').open||e.target?.isContentEditable||['INPUT','TEXTAREA','SELECT'].includes(e.target?.tagName)||!/^Digit[1-8]$/.test(e.code)||e.repeat)return;
  e.preventDefault();const i=Number(e.code.slice(-1))-1;if(instrument==='drum'?i>4:!['keyboard','xylophone'].includes(instrument)&&i!==0)return;keyboardHeld.add(e.code);start(e.code,i,['keyboard','xylophone'].includes(instrument)?document.querySelector('[data-note="'+i+'"]'):instrument==='drum'?drumParts[i]:$('percussion'));
 });
 document.addEventListener('keyup',e=>{keyboardHeld.delete(e.code);end(e.code)});window.addEventListener('blur',()=>{halt()});
 for(const b of document.querySelectorAll('[data-place]'))b.onclick=()=>setActivity(b.dataset.place);
 for(const b of document.querySelectorAll('button[data-instrument]'))b.onclick=()=>selectInstrument(b.dataset.instrument);
 $('water').onclick=()=>{
  if(blocked||game.getState().paused||waterTime!==null)return;game.beginGarden?.();waterTime=0;$('gardenObjects').classList.add('watering');$('gardenObjects').dataset.pouring='false';$('status').textContent='Pippo pega o regador. Vamos cuidar da flor.';
 };
 $('flower').onclick=()=>$('water').click();
 $('resetGarden').onclick=()=>{bloom=false;waterTime=null;$('gardenObjects').classList.remove('bloom','watering');$('gardenObjects').dataset.pouring='false';$('gardenObjects').style?.setProperty('--pour','0');game.setGarden?.(0,false);$('flower').setAttribute('aria-label','Flor fechada. Toque para regar');$('status').textContent='A flor está pronta para outra brincadeira.'};
 $('volume').value=String(prefs.volume*100);$('mute').checked=prefs.muted;$('replies').checked=prefs.replies;
 $('volume').oninput=e=>{prefs.volume=Number(e.target.value)/100;audio.setVolume(prefs.volume);save()};
 $('mute').onchange=e=>{prefs.muted=e.target.checked;audio.setMuted(prefs.muted);clearReply();save();status(prefs.muted?'Som desligado.':'Som ligado. Toque em um instrumento.')};
 $('replies').onchange=e=>{prefs.replies=e.target.checked;clearReply();save()};
 $('reduced').addEventListener('change',e=>{prefs.reduced=e.target.checked;document.body.classList.toggle('reduced',prefs.reduced);save()});document.body.classList.toggle('reduced',prefs.reduced);
 window.PippoActivities={
  getMusicState:()=>({activity,instrument,held:held.size,artReady,audio:audio.getState?.()}),
  suspend(value){blocked=Boolean(value);halt();document.body.classList.toggle('world-paused',blocked)},
  tick(dt,elapsed=dt){
   if(blocked)return;inputClock+=elapsed;
   if(waterTime!==null){waterTime+=elapsed;const pouring=waterTime>=350&&waterTime<2500,progress=bloom?1:Math.max(0,Math.min(1,(waterTime-900)/2100));$('gardenObjects').dataset.pouring=String(pouring);$('gardenObjects').style?.setProperty('--pour',String(progress));game.setGarden?.(progress,pouring);if(waterTime>=3000){waterTime=null;bloom=true;game.setGarden?.(1,false);$('gardenObjects').dataset.pouring='false';$('gardenObjects').style?.setProperty('--pour','1');$('gardenObjects').classList.remove('watering');$('gardenObjects').classList.add('bloom');$('flower').setAttribute('aria-label','Flor aberta. Toque para regar outra vez');$('status').textContent='A flor abriu!';game.react({garden:true})}}
   if(activity!=='music'||blocked||held.size)return;
   if(flashClock>0){flashClock-=elapsed;if(flashClock<=0)for(const e of document.querySelectorAll('.reply'))e.classList.remove('reply')}
   if(replyWait!==null){replyWait-=elapsed;if(replyWait<=0){replyWait=null;if(prefs.replies&&!prefs.muted&&phrase.length){replyCursor=0;replyClock=elapsed;status('Pippo responde. Você pode tocar quando quiser.')}else phrase=[]}}
   if(replyCursor!==null){replyClock-=elapsed;if(replyClock<=0){const i=replyCursor,note=phrase[i].index;playGesture('reply'+i,note,true);const key=['keyboard','xylophone'].includes(instrument)?document.querySelector('[data-note="'+note+'"]'):instrument==='drum'?drumParts[note]:$('percussion');key.classList.add('reply');flashClock=200;replyCursor++;replyClock+=phrase[replyCursor]?.gap??340;if(replyCursor>=phrase.length){replyCursor=null;phrase=[];status('Agora você. Toque como quiser.')}}}
  }
 };
 selectInstrument('keyboard');setActivity('yard');
})();
