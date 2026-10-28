'use strict';
(()=>{
 const $=id=>document.getElementById(id),game=window.pippoStudy;
 const defaults={volume:.45,muted:false,replies:true,reduced:game.getState().reduced};let prefs={...defaults};
 try{const p=JSON.parse(localStorage.getItem('pippo.preferences.v1')||'{}');for(const k of ['muted','replies','reduced'])if(typeof p[k]==='boolean')prefs[k]=p[k];if(typeof p.volume==='number'&&Number.isFinite(p.volume))prefs.volume=Math.max(0,Math.min(.8,p.volume))}catch{}
 const save=()=>{try{localStorage.setItem('pippo.preferences.v1',JSON.stringify(prefs))}catch{}};
 const audio=PippoAudio.create({onError:()=>{$('musicStatus').textContent='O som não abriu. Toque novamente ou confira o volume do aparelho.'}});
 audio.setVolume(prefs.volume);audio.setMuted(prefs.muted);game.setReduced(prefs.reduced);
 const notes=['Dó','Ré','Mi','Fá','Sol','Lá','Si','Dó'];let activity='yard',instrument='keyboard',blocked=false,waterTime=null,bloom=false;
 const held=new Map(),keyboardHeld=new Set();let phrase=[],replyWait=null,replyCursor=null,replyClock=0,flashClock=0;
 const titles={yard:'Vamos brincar.',music:'Uma música com Pippo.',garden:'O jardim do Pippo.'};
 function status(s){$('musicStatus').textContent=s}
 function clearReply(){replyWait=null;replyCursor=null;replyClock=0;for(let i=0;i<3;i++)audio.release('reply'+i);for(const key of document.querySelectorAll('[data-note]'))key.classList.remove('reply')}
 function clearHeld(){held.clear();keyboardHeld.clear();for(const e of document.querySelectorAll('.playing'))e.classList.remove('playing')}
 function halt(){clearReply();clearHeld();phrase=[];audio.suspend()}
 function setActivity(next){
  if(!titles[next])return;halt();waterTime=null;$('gardenObjects').classList.remove('watering');activity=next;document.body.dataset.activity=next;
  $('musicPanel').hidden=next!=='music';$('gardenObjects').hidden=next!=='garden';$('ball').hidden=next!=='yard';$('directions').hidden=next!=='yard';$('gestures').hidden=next!=='yard';
  for(const b of document.querySelectorAll('[data-place]'))b.setAttribute('aria-pressed',String(b.dataset.place===next));
  $('sceneTitle').textContent=titles[next];$('hint').textContent=next==='yard'?'Toque ao lado para andar. Deslize na cabeça ou barriga para carinho.':next==='music'?'Pippo está aqui para ouvir você.':'Toque no regador para abrir a flor.';
  $('stage').setAttribute('aria-label',next==='yard'?'Quintal: toque no chão para andar e no Pippo para carinho':next==='music'?'Casa da Música: Pippo escuta os instrumentos':'Jardim: toque no regador ou na flor');$('pippo').setAttribute('aria-label',next==='yard'?'Pippo: toque ao lado para andar e deslize na cabeça ou barriga para carinho. Setas para andar.':'Pippo: deslize na cabeça ou barriga para carinho');if(next==='music')status('Escolha um instrumento e toque.');game.setActivity(next);$('status').textContent=next==='music'?'Escolha um instrumento e toque.':next==='garden'?(bloom?'A flor continua aberta.':'A flor está fechadinha. O regador está aqui.'):'A bola está aqui. Podemos brincar sem pressa.';
 }
 function selectInstrument(next){
  if(!['keyboard','drum','xylophone','shaker','tambourine'].includes(next))return;
  halt();instrument=next;$('keys').hidden=!['keyboard','xylophone'].includes(next);$('percussion').hidden=['keyboard','xylophone'].includes(next);
  $('musicPanel').dataset.instrument=next;
  for(const b of document.querySelectorAll('button[data-instrument]'))b.setAttribute('aria-pressed',String(b.dataset.instrument===next));
  $('percussion').dataset.kind=next;$('percussion').setAttribute('aria-label',{drum:'Tocar tambor',shaker:'Tocar chocalho',tambourine:'Tocar pandeiro'}[next]||'Tocar');
  $('percussionName').textContent={drum:'Tambor',shaker:'Chocalho',tambourine:'Pandeiro'}[next]||'';
  status('Toque para experimentar. Pippo escuta e espera.');
 }
 function start(id,index,element){
  if(activity!=='music'||blocked||game.getState().paused||held.has(id))return;
  clearReply();if(phrase.length>=3)phrase.shift();phrase.push(index);held.set(id,{index,element});element.classList.add('playing');
  audio.play(id,instrument,index);game.react();status(prefs.muted?'Som desligado. Você pode ligar nos ajustes.':instrument==='keyboard'||instrument==='xylophone'?notes[index]+'.':'Você tocou.');
 }
 function end(id,oneShot=false){const h=held.get(id);if(!h)return;held.delete(id);if(instrument==='keyboard'&&!oneShot)audio.release(id);if(![...held.values()].some(v=>v.element===h.element))h.element.classList.remove('playing');if(held.size===0){replyWait=1250;status('Pippo está ouvindo…')}}
 function pointerControl(element,index){
  element.addEventListener('pointerdown',e=>{if(e.button>0)return;e.preventDefault();element.focus({preventScroll:true});element.setPointerCapture(e.pointerId);start('pointer'+e.pointerId,index,element)});
  for(const event of ['pointerup','pointercancel','lostpointercapture'])element.addEventListener(event,e=>end('pointer'+e.pointerId));
  // Enter and Space also work with a keyboard or switch-access click.
  element.addEventListener('click',e=>{if(e.detail!==0)return;const id='accessible'+index;start(id,index,element);end(id,true)});
 }
 for(const key of document.querySelectorAll('[data-note]'))pointerControl(key,Number(key.dataset.note));pointerControl($('percussion'),0);
 document.addEventListener('keydown',e=>{
  if(activity!=='music'||blocked||$('comparison').open||e.target?.isContentEditable||['INPUT','TEXTAREA','SELECT'].includes(e.target?.tagName)||!/^Digit[1-8]$/.test(e.code)||e.repeat)return;
  e.preventDefault();const i=Number(e.code.slice(-1))-1;if(!['keyboard','xylophone'].includes(instrument)&&i!==0)return;keyboardHeld.add(e.code);start(e.code,i,['keyboard','xylophone'].includes(instrument)?document.querySelector('[data-note="'+i+'"]'):$('percussion'));
 });
 document.addEventListener('keyup',e=>{keyboardHeld.delete(e.code);end(e.code)});window.addEventListener('blur',()=>{halt()});
 for(const b of document.querySelectorAll('[data-place]'))b.onclick=()=>setActivity(b.dataset.place);
 for(const b of document.querySelectorAll('button[data-instrument]'))b.onclick=()=>selectInstrument(b.dataset.instrument);
 $('water').onclick=()=>{
  if(blocked||game.getState().paused||waterTime!==null)return;waterTime=0;$('gardenObjects').classList.add('watering');$('status').textContent='A água cai na flor.';
 };
 $('flower').onclick=()=>$('water').click();
 $('resetGarden').onclick=()=>{bloom=false;waterTime=null;$('gardenObjects').classList.remove('bloom','watering');$('flower').setAttribute('aria-label','Flor fechada. Toque para regar');$('status').textContent='A flor está pronta para outra brincadeira.'};
 $('volume').value=String(prefs.volume*100);$('mute').checked=prefs.muted;$('replies').checked=prefs.replies;
 $('volume').oninput=e=>{prefs.volume=Number(e.target.value)/100;audio.setVolume(prefs.volume);save()};
 $('mute').onchange=e=>{prefs.muted=e.target.checked;audio.setMuted(prefs.muted);clearReply();save();status(prefs.muted?'Som desligado.':'Som ligado. Toque em um instrumento.')};
 $('replies').onchange=e=>{prefs.replies=e.target.checked;clearReply();save()};
 $('reduced').addEventListener('change',e=>{prefs.reduced=e.target.checked;document.body.classList.toggle('reduced',prefs.reduced);save()});document.body.classList.toggle('reduced',prefs.reduced);
 window.PippoActivities={
  suspend(value){blocked=Boolean(value);halt();document.body.classList.toggle('world-paused',blocked)},
  tick(dt){
   if(blocked)return;
   if(waterTime!==null){waterTime+=dt;if(waterTime>=1000){waterTime=null;bloom=true;$('gardenObjects').classList.remove('watering');$('gardenObjects').classList.add('bloom');$('flower').setAttribute('aria-label','Flor aberta. Toque para regar outra vez');$('status').textContent='A flor abriu!';game.react()}}
   if(activity!=='music'||blocked||held.size)return;
   if(flashClock>0){flashClock-=dt;if(flashClock<=0)for(const e of document.querySelectorAll('.reply'))e.classList.remove('reply')}
   if(replyWait!==null){replyWait-=dt;if(replyWait<=0){replyWait=null;if(prefs.replies&&!prefs.muted&&phrase.length){replyCursor=0;replyClock=0;status('Pippo responde. Você pode tocar quando quiser.')}else phrase=[]}}
   if(replyCursor!==null){replyClock-=dt;if(replyClock<=0){const i=replyCursor,note=phrase[i];audio.play('reply'+i,instrument,note,{automatic:true});game.react();const key=document.querySelector('[data-note="'+note+'"]');if(['keyboard','xylophone'].includes(instrument))key.classList.add('reply');flashClock=200;replyCursor++;replyClock=340;if(replyCursor>=phrase.length){replyCursor=null;phrase=[];status('Agora você. Toque como quiser.')}}}
  }
 };
 selectInstrument('keyboard');setActivity('yard');
})();
