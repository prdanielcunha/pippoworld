import { Engine } from '@babylonjs/core/Engines/engine.js';
import { content } from './content/pt-BR';
import { createYard } from './scene/yard';
import './style.css';

function element<T extends HTMLElement>(id: string): T {
  const value = document.getElementById(id);
  if (!value) throw new Error(`Elemento ausente: ${id}`);
  return value as T;
}
const canvas = element<HTMLCanvasElement>('world');
const status = element('status');
const pause = element<HTMLButtonElement>('pause');
const overlay = element('paused');
const resume = element<HTMLButtonElement>('resume');
document.title = content.title;
element('title').textContent = content.title;
element('eyebrow').textContent = content.eyebrow;
element('notice').textContent = content.notice;
element('paused-label').textContent = content.paused;
pause.textContent = content.pause;
resume.textContent = content.resume;
status.textContent = content.loading;

let dispose = () => {};
try {
  const engine = new Engine(canvas, true, { stencil: true }, true);
  canvas.tabIndex = -1; // A cena estática não é um controle de teclado.
  // Limita a resolução em telas densas; orçamento final depende de aparelhos reais.
  engine.setHardwareScalingLevel(Math.max(1, window.devicePixelRatio / 1.5));
  const { scene, resize } = createYard(engine);
  let paused = false;
  const render = () => scene.render();
  scene.onAfterRenderObservable.addOnce(() => {
    canvas.dataset.rendered = 'true';
    status.textContent = content.ready;
    pause.disabled = false;
  });
  function setPaused(value: boolean) {
    paused = value;
    overlay.hidden = !value;
    pause.disabled = value;
    if (value) engine.stopRenderLoop(render);
    else engine.runRenderLoop(render);
  }
  const pauseScene = () => { setPaused(true); resume.focus(); };
  const resumeScene = () => { setPaused(false); pause.focus(); };
  const visibility = () => { if (document.hidden) setPaused(true); };
  const blur = () => setPaused(true);
  const onResize = () => { engine.resize(); resize(); if (paused) scene.render(); };
  const lost = () => { setPaused(true); status.textContent = content.unavailable; };
  const restored = () => { status.textContent = content.ready; };
  pause.addEventListener('click', pauseScene);
  resume.addEventListener('click', resumeScene);
  document.addEventListener('visibilitychange', visibility);
  window.addEventListener('blur', blur);
  window.addEventListener('resize', onResize);
  engine.onContextLostObservable.add(lost);
  engine.onContextRestoredObservable.add(restored);
  scene.executeWhenReady(() => engine.runRenderLoop(render));
  dispose = () => {
    pause.removeEventListener('click', pauseScene);
    resume.removeEventListener('click', resumeScene);
    document.removeEventListener('visibilitychange', visibility);
    window.removeEventListener('blur', blur);
    window.removeEventListener('resize', onResize);
    scene.dispose();
    engine.dispose();
  };
} catch (error) {
  status.textContent = content.unavailable;
  canvas.hidden = true;
  console.error('Falha ao iniciar a cena 3D', error);
}
if (import.meta.hot) import.meta.hot.dispose(() => dispose());
window.addEventListener('pagehide', (event) => { if (!event.persisted) dispose(); });
