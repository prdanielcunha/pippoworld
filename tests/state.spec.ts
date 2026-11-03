import { test, expect } from '@playwright/test';
import { WorldState, defaults, loadPreferences, loadSession } from '../src/game/state';

test('rega confirma no contato; interrupções não confirmam efeitos futuros', () => {
  const s = new WorldState(); s.active = true; s.navigate('garden'); s.water = .001;
  s.tick(.2); s.pause(); s.tick(10); expect(s.flowerOpen).toBe(false);
  s.paused = false; s.water = .001; s.tick(.7); expect(s.flowerOpen).toBe(true);
  s.navigate('music_house'); expect(s.flowerOpen).toBe(true); expect(s.water).toBe(0);
  s.ball = 1; s.navigate('yard'); expect(s.ball).toBe(0);
  expect(s.safe()).toEqual({ version: 1, place: 'yard', flowerOpen: true });
});
test('preferências fora do esquema e valores inválidos retornam a padrões seguros', () => {
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: () => JSON.stringify({ version: 1, volumes: { animals: 99, voice: 'alto' }, minutes: -1, activities: { yard: false }, reduced: 'true' }) } });
  const p = loadPreferences(); expect(p.volumes.animals).toBe(1); expect(p.volumes.voice).toBe(defaults().volumes.voice); expect(p.activities.yard).toBe(true); expect(p.minutes).toBe(0); expect(p.reduced).toBe(false);
  Object.defineProperty(globalThis, 'sessionStorage', { configurable: true, value: { getItem: () => JSON.stringify({ version: 999, place: 'garden', flowerOpen: true }) } });
  expect(loadSession()).toBeNull();
});
