'use strict';
for(const button of document.querySelectorAll('[data-pose]'))button.onclick=()=>startMotion(button.dataset.pose);
for(const [name,label] of Object.entries({neutral:'Neutro',happy:'Feliz',curious:'Curioso',surprised:'Surpreso',laugh:'Risada',affection:'Carinho',wink:'Piscadinha',sleepy:'Sonolento',playful:'Brincalhão',focused:'Concentrado',listening:'Escutando',calm:'Tranquilo'})){
 const button=document.createElement('button');button.textContent=label;button.onclick=()=>{if(!state.ready||state.paused)return;endGesture();cancelBall();state.motion=null;state.turn=null;state.sideRest=false;state.pet=0;state.blink=0;state.expression=name;state.expressionTime=2200;message('Pippo: '+label.toLowerCase()+'.');render()};$('expressions').append(button);
}
