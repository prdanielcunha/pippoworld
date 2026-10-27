import { Engine } from '@babylonjs/core/Engines/engine.js';
import { content as c } from './content/pt-BR';
import { Mixer } from './audio/mixer';
import { createYard } from './scene/yard';
import { WorldState, loadPreferences, savePreferences, loadSession, saveSession, defaults, type Place, type Focus } from './game/state';
import type { Channel, RecordedId } from './content/resources';
import './style.css';

const app = document.querySelector<HTMLElement>('#app')!;
const el = <K extends keyof HTMLElementTagNameMap>(tag: K, parent: HTMLElement, className = '', text = '') => {
  const n = document.createElement(tag); n.className = className; n.textContent = text; parent.append(n); return n;
};
const button = (parent: HTMLElement, icon: string, label: string, action: () => void, className = '') => {
  const b = el('button', parent, className, icon); b.type = 'button'; b.setAttribute('aria-label', label); b.title = label; b.onclick = action; return b;
};
const prefs = loadPreferences(); const state = new WorldState(); const audio = new Mixer(prefs);
const restored = loadSession();
if (restored) { state.place = prefs.activities[restored.place] ? restored.place : 'yard'; state.flowerOpen = restored.flowerOpen; }
document.title = c.title;
const header = el('header', app); const brand = el('div', header); el('p', brand, 'eyebrow', c.eyebrow); el('h1', brand, '', c.title);
const controls = el('div', header, 'header-controls');
const adultButton = button(controls, '⚙', c.adults, openGate);
const pauseButton = button(controls, 'Ⅱ', c.pause, pause); pauseButton.id = 'pause'; pauseButton.disabled = true;
const world = el('section', app, 'world'); world.setAttribute('aria-label', c.eyebrow);
const canvas = el('canvas', world); canvas.id = 'world'; canvas.setAttribute('aria-label', c.eyebrow); canvas.tabIndex = -1;
const targetsLayer = el('div', world, 'targets'); const nav = el('nav', world, 'navigation');
const placeLabel = el('p', world, 'place-label');
const status = el('p', app, 'status', c.loading); status.id = 'status'; status.setAttribute('role', 'status');
const notice = el('p', app, 'notice', c.notice);
const overlay = el('div', world, 'overlay'); overlay.setAttribute('role', 'dialog'); overlay.setAttribute('aria-modal', 'true');
let panel = el('div', overlay, 'panel');
let screen: 'entry' | 'play' | 'pause' | 'gate' | 'settings' = 'entry';
let previous: 'entry' | 'pause' = 'entry'; let engine: Engine | undefined; let view: ReturnType<typeof createYard> | undefined;
let disposed = false; let elapsed = 0; let echo = 0; let echoSecond = 0; let returnFocus: HTMLElement | null = null;
let ready = false; let hello = false;
const contacts = new Map<number, { key: string; index?: number }>();
const objectButtons = new Map<string, HTMLButtonElement>();
function cancelSounds() { contacts.clear(); view?.held.clear(); audio.stop(); echo = 0; echoSecond = 0; }
function syncSafe() { if (state.active) saveSession(state.safe()); }
function setScreen(value: typeof screen, heading?: string) {
  screen = value; overlay.hidden = value === 'play'; targetsLayer.inert = value !== 'play'; nav.inert = value !== 'play';
  pauseButton.disabled = value !== 'play' || !ready; adultButton.disabled = value === 'gate' || value === 'settings';
  panel.replaceChildren(); if (heading) el('h2', panel, '', heading);
}
function entry() {
  state.active = false; state.paused = false; cancelSounds();
  setScreen('entry', c.title); el('p', panel, 'intro-icon', '☀');
  const start = button(panel, '▶', c.start, () => { void startGame(); }, 'primary start'); start.disabled = !ready;
  el('p', panel, 'adult-note', c.first); button(panel, '⚙ ' + c.adults, c.adults, openGate);
}
async function startGame() {
  if (!ready || screen !== 'entry') return;
  state.active = true; state.paused = false; setScreen('play');
  const ok = await audio.unlock(); if (!ok) status.textContent = c.audioUnavailable;
  await audio.prepare(); if (!state.active || state.paused) return;
  if (!hello) { audio.recorded('hello'); hello = true; }
  syncSafe(); updateActions(); pauseButton.focus();
}
function pause() {
  if (!state.active || screen !== 'play') return;
  returnFocus = document.activeElement as HTMLElement; state.pause(); cancelSounds(); audio.suspend(); syncSafe();
  setScreen('pause', c.paused);
  button(panel, '▶ ' + c.resume, c.resume, () => { void resume(); }, 'primary').focus();
  button(panel, '⌂ ' + c.finish, c.finish, finish); button(panel, '⚙ ' + c.adults, c.adults, openGate);
}
async function resume() {
  if (!ready) return;
  const ok = await audio.unlock(); status.textContent = ok ? c.ready : c.audioUnavailable;
  state.paused = false; setScreen('play'); updateActions();
  (returnFocus?.isConnected ? returnFocus : pauseButton)?.focus();
}
function finish() {
  cancelSounds(); audio.suspend(); saveSession(null); state.active = false; state.flowerOpen = false; state.navigate('yard');
  elapsed = 0; hello = false; status.textContent = c.ready; view?.build('yard'); entry();
}
function openGate() {
  if (screen === 'play') pause();
  previous = screen === 'entry' ? 'entry' : 'pause';
  state.pause(); cancelSounds(); audio.suspend(); setScreen('gate', c.gate);
  const a = 12 + Math.floor(Math.random() * 18); const b = 13 + Math.floor(Math.random() * 17);
  el('p', panel, '', c.gateHelp); el('p', panel, 'sum', `${a} + ${b} = ?`);
  const label = el('label', panel, '', c.answer); const input = el('input', label); input.inputMode = 'numeric'; input.type = 'text'; input.autocomplete = 'off'; input.maxLength = 3; input.setAttribute('aria-label', c.answer);
  const error = el('p', panel, 'gate-error'); error.setAttribute('role', 'alert');
  button(panel, c.confirm, c.confirm, () => { if (input.value.trim() === String(a + b)) settings(); else { error.textContent = c.wrong; input.value = ''; input.focus(); } });
  button(panel, c.cancel, c.cancel, returnPanel); input.focus();
}
function returnPanel() { if (previous === 'entry') entry(); else { screen = 'play'; pause(); } }
function settings() {
  setScreen('settings', c.settings); panel.classList.add('settings');
  for (const channel of Object.keys(c.channels) as Channel[]) {
    const label = el('label', panel, 'setting', c.channels[channel]); const input = el('input', label); input.type = 'range'; input.min = '0'; input.max = '1'; input.step = '.05'; input.value = String(prefs.volumes[channel]); input.setAttribute('aria-label', c.channels[channel]);
    input.oninput = () => { prefs.volumes[channel] = Number(input.value); audio.configure(prefs); };
  }
  const sample = button(panel, '♪', c.labels.drum_single, () => { void audio.unlock().then(ok => { if (ok && screen === 'settings') audio.instrument('drum', 'sample'); }); }); sample.classList.add('sample');
  function check(labelText: string, value: boolean, action: (value: boolean) => void) {
    const label = el('label', panel, 'setting check', labelText); const input = el('input', label); input.type = 'checkbox'; input.checked = value; input.setAttribute('aria-label', labelText); input.onchange = () => action(input.checked);
  }
  check(c.reduced, prefs.reduced, v => { prefs.reduced = v; }); check(c.hints, prefs.hints, v => { prefs.hints = v; });
  const speechLabel = el('label', panel, 'setting', c.speech); const speech = el('select', speechLabel); speech.setAttribute('aria-label', c.speech);
  for (const [value, text] of [['false', c.silent], ['true', c.occasional]]) { const option = el('option', speech, '', text); option.value = value; } speech.value = String(prefs.speech); speech.onchange = () => { prefs.speech = speech.value === 'true'; };
  const durationLabel = el('label', panel, 'setting', c.duration); const duration = el('select', durationLabel); duration.setAttribute('aria-label', c.duration);
  for (const n of [0, 5, 10, 15]) { const option = el('option', duration, '', n ? `${n} ${c.minutes}` : c.unlimited); option.value = String(n); } duration.value = String(prefs.minutes); duration.onchange = () => { prefs.minutes = Number(duration.value); };
  el('h3', panel, '', c.activities);
  for (const p of ['garden', 'music_house'] as const) check(c.labels[p], prefs.activities[p], v => { prefs.activities[p] = v; });
  el('h3', panel, '', c.resources); el('p', panel, '', c.resourceHelp); el('p', panel, '', c.privacy);
  button(panel, c.reset, c.reset, () => { Object.assign(prefs, defaults()); audio.configure(prefs); savePreferences(prefs); saveSession(null); panel.classList.remove('settings'); finish(); });
  button(panel, c.save, c.save, () => {
    savePreferences(prefs); audio.configure(prefs); audio.suspend();
    if (!prefs.activities[state.place]) { state.navigate('yard'); view?.build('yard'); }
    syncSafe(); panel.classList.remove('settings'); returnPanel();
  }, 'primary');
  panel.querySelector('input')?.focus();
}
function navigate(place: Place, focus: Focus = 'room') {
  if (screen !== 'play' || !prefs.activities[place]) return;
  cancelSounds(); state.navigate(place); state.focus = focus; view?.build(place); syncSafe(); updateActions();
}
function updateActions() {
  if (!view) return;
  targetsLayer.replaceChildren(); objectButtons.clear(); nav.replaceChildren();
  placeLabel.textContent = c.labels[state.place];
  for (const target of view.targets) {
    const id = target.id; if ((id === 'garden' || id === 'music_house') && !prefs.activities[id]) continue; const isKey = id.startsWith('key_');
    const label = isKey ? c.notes[Number(id.slice(4))] : c.labels[id as keyof typeof c.labels];
    const b = button(targetsLayer, '', label, () => {}, 'object-target'); b.dataset.target = id;
    b.onclick = e => { if (e.detail === 0) { interact(id, -1); if (isKey) stopContact(-1); } };
    b.onpointerdown = e => { if (screen !== 'play') return; e.preventDefault(); b.setPointerCapture(e.pointerId); interact(id, e.pointerId); };
    b.onpointerup = e => {
      const hit = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>('[data-target]')?.dataset.target;
      if (id === 'watering_can' && hit === 'flower_main') interact('flower_main', e.pointerId);
      stopContact(e.pointerId);
    }; b.onpointercancel = e => stopContact(e.pointerId); b.onlostpointercapture = e => stopContact(e.pointerId);
    b.onpointermove = e => {
      if (!contacts.has(e.pointerId) || !isKey) return;
      const hit = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>('[data-target]')?.dataset.target;
      const old = contacts.get(e.pointerId)!;
      if (hit?.startsWith('key_') && hit !== 'key_' + old.index) { stopContact(e.pointerId); interact(hit, e.pointerId); }
    };
    objectButtons.set(id, b);
  }
  if (state.place === 'yard') {
    for (const p of ['garden', 'music_house'] as const) if (prefs.activities[p]) button(nav, c.icons[p], c.labels[p], () => navigate(p));
  } else if (state.place === 'garden') {
    button(nav, c.icons.yard, c.labels.yard, () => navigate('yard'));
    if (prefs.activities.music_house) button(nav, c.icons.music_house, c.labels.music_house, () => navigate('music_house'));
  } else if (state.focus === 'room') {
    const origin = state.origin === 'garden' && prefs.activities.garden ? 'garden' : 'yard';
    button(nav, '↶ ' + c.icons[origin], c.back, () => navigate(origin));
    if (prefs.activities.garden && origin !== 'garden') button(nav, c.icons.garden, c.labels.garden, () => navigate('garden'));
    if (origin !== 'yard') button(nav, c.icons.yard, c.labels.yard, () => navigate('yard'));
  } else {
    button(nav, '↶', c.back, () => navigate('music_house'));
    const other = state.focus === 'drum_single' ? 'keyboard_eight' : 'drum_single';
    button(nav, c.icons[other], c.labels[other], () => navigate('music_house', other));
  }
  layout();
}
function stopContact(pointerId: number) {
  const contact = contacts.get(pointerId); if (!contact) return;
  audio.stopKey(contact.key); contacts.delete(pointerId);
  if (contact.index !== undefined && ![...contacts.values()].some(v => v.index === contact.index)) view?.held.delete(contact.index);
}
function interact(id: string, pointerId: number) {
  if (!state.active || state.paused || screen !== 'play') return;
  echo = 0; echoSecond = 0; audio.stopKey('echo'); view?.pulse(id);
  if (id !== 'flower_main' && id !== 'watering_can') state.selected = false;
  if (id === 'garden' || id === 'music_house') { navigate(id); return; }
  if (id.startsWith('key_')) {
    const index = Number(id.slice(4)); const key = 'pointer_' + pointerId;
    contacts.set(pointerId, { key, index }); view?.held.add(index); audio.instrument('key', key, index);
  } else if (id === 'drum_single') {
    if (state.focus === 'room') { navigate('music_house', 'drum_single'); return; }
    audio.instrument('drum', 'drum_' + pointerId); if (prefs.hints) echo = 2.2;
  } else if (id === 'keyboard_eight') navigate('music_house', 'keyboard_eight');
  else if (id === 'ball_main') { if (!state.ball) state.ball = .001; }
  else if (id === 'watering_can') { state.selected = !state.selected; }
  else if (id === 'flower_main') { if (state.selected && !state.water) { state.water = .001; state.selected = false; } }
  else if (id === 'shaker_story') audio.instrument('shaker', 'shaker');
  else if (['duck_main', 'cow_friend', 'chick_friend'].includes(id)) audio.recorded(id as RecordedId);
  // Lolo reage silenciosamente, sem vocalização de coelho.
  layout();
}
function layout() {
  if (!view) return;
  for (const t of view.targets) {
    const b = objectButtons.get(t.id); if (!b) continue;
    const p = view.project(t); b.style.left = p.x + '%'; b.style.top = p.y + '%';
    b.style.width = `max(${t.id.startsWith('key_') ? 44 : 64}px, ${p.width}%)`;
    b.style.height = t.id.startsWith('key_') ? '96px' : `max(64px, ${Math.min(140, world.clientWidth * p.width / 100)}px)`;
    b.classList.toggle('selected', t.id === 'watering_can' && state.selected);
    if (t.id === 'watering_can') b.setAttribute('aria-pressed', String(state.selected));
    if (t.id === 'flower_main') b.setAttribute('aria-label', state.flowerOpen ? c.flowerOpen : c.flowerClosed);
    if (t.id.startsWith('key_')) b.setAttribute('aria-pressed', String(view.held.has(Number(t.id.slice(4)))));
  }
  canvas.dataset.place = state.place; canvas.dataset.focus = state.focus; canvas.dataset.flower = state.flowerOpen ? 'open' : 'closed'; canvas.dataset.ball = state.ball ? 'moving' : 'ready';
  canvas.dataset.voices = String(audio.status.voices); canvas.dataset.audio = audio.status.state;
}
entry();
try {
  engine = new Engine(canvas, true, { stencil: true }, true); engine.setHardwareScalingLevel(Math.max(1, devicePixelRatio / 1.5));
  view = createYard(engine, state); let last = performance.now();
  view.scene.onAfterRenderObservable.addOnce(() => { ready = true; canvas.dataset.rendered = 'true'; status.textContent = c.ready; entry(); });
  const render = () => {
    if (disposed || !view) return;
    const now = performance.now(); const frameSeconds = (now - last) / 1000; const dt = Math.min(.05, frameSeconds); last = now;
    if (screen === 'play') {
      const wasOpen = state.flowerOpen; const beforeBall = state.ball; state.tick(dt); elapsed += frameSeconds;
      if (beforeBall > 0 && beforeBall < 1.2 && state.ball >= 1.2) view.pulse('duck_main');
      if (!wasOpen && state.flowerOpen) syncSafe();
      view.update(dt, prefs.reduced);
      if (echo > 0) { echo -= dt; if (echo <= 0) { view.pulse('rabbit_friend'); view.pulse('drum_single'); audio.instrument('drum', 'echo'); echoSecond = .4; } }
      else if (echoSecond > 0) { echoSecond -= dt; if (echoSecond <= 0) { view.pulse('drum_single'); audio.instrument('drum', 'echo'); } }
      if (prefs.minutes && elapsed >= prefs.minutes * 60) {
        echo = 0; echoSecond = 0; status.textContent = c.ending;
        if ((!state.ball && !state.water && contacts.size === 0) || elapsed >= prefs.minutes * 60 + 3) finish();
      }
    }
    view.scene.render(); layout();
  };
  view.scene.executeWhenReady(() => engine!.runRenderLoop(render));
  const resize = () => { engine!.resize(); view!.resize(); layout(); };
  const visibility = () => { if (document.hidden) pause(); }; const blur = () => pause();
  window.addEventListener('resize', resize); document.addEventListener('visibilitychange', visibility); window.addEventListener('blur', blur);
  canvas.addEventListener('pointerdown', () => { if (state.selected) { state.selected = false; layout(); } });
  engine.onContextLostObservable.add(() => { pause(); ready = false; pauseButton.disabled = true; status.textContent = c.unavailable; });
  engine.onContextRestoredObservable.add(() => { ready = true; status.textContent = c.ready; });
  const dispose = () => {
    if (disposed) return; disposed = true; syncSafe(); cancelSounds(); audio.dispose();
    window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', visibility); window.removeEventListener('blur', blur); view?.scene.dispose(); engine?.dispose();
  };
  window.addEventListener('pagehide', event => { if (!event.persisted) dispose(); else pause(); });
  if (import.meta.hot) import.meta.hot.dispose(dispose);
} catch (error) {
  status.textContent = c.unavailable; canvas.hidden = true; notice.textContent = c.unavailable; console.error('Falha ao iniciar 3D', error);
}
// Mantém o foco dentro dos painéis, inclusive sem pointer/touch.
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') { if (screen === 'play') pause(); else if (screen === 'gate') returnPanel(); }
  if (e.key !== 'Tab' || overlay.hidden) return;
  const nodes = [...panel.querySelectorAll<HTMLElement>('button:not(:disabled),input,select')];
  if (!nodes.length) return; const first = nodes[0]; const last = nodes[nodes.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});
