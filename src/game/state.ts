import type { Channel } from '../content/resources';
export type Place = 'yard' | 'garden' | 'music_house';
export type Focus = 'room' | 'drum_single' | 'keyboard_eight';
export interface Preferences {
  version: 1; volumes: Record<Channel, number>; reduced: boolean; hints: boolean;
  speech: boolean; minutes: number; activities: Record<Place, boolean>;
}
export const defaults = (): Preferences => ({ version: 1, volumes: { voice: .6, animals: .6, instruments: .5, ambience: .2 }, reduced: false, hints: false, speech: true, minutes: 0, activities: { yard: true, garden: true, music_house: true } });
const prefKey = 'world.preferences'; const sessionKey = 'world.session';
export function loadPreferences(): Preferences {
  const p = defaults();
  try {
    const d = JSON.parse(localStorage.getItem(prefKey) || 'null');
    if (!d || d.version !== 1) return p;
    for (const c of Object.keys(p.volumes) as Channel[]) if (typeof d.volumes?.[c] === 'number' && Number.isFinite(d.volumes[c])) p.volumes[c] = Math.max(0, Math.min(1, d.volumes[c]));
    for (const key of ['reduced', 'hints', 'speech'] as const) if (typeof d[key] === 'boolean') p[key] = d[key];
    if ([0, 5, 10, 15].includes(d.minutes)) p.minutes = d.minutes;
    for (const k of ['garden', 'music_house'] as const) if (typeof d.activities?.[k] === 'boolean') p.activities[k] = d.activities[k];
  } catch { /* armazenamento negado/corrompido: padrões seguros */ }
  return p;
}
export function savePreferences(p: Preferences) { try { localStorage.setItem(prefKey, JSON.stringify(p)); } catch { /* sessão continua em memória */ } }
export interface SafeSession { version: 1; place: Place; flowerOpen: boolean; }
export function loadSession(): SafeSession | null {
  try {
    const d = JSON.parse(sessionStorage.getItem(sessionKey) || 'null');
    if (d?.version === 1 && ['yard', 'garden', 'music_house'].includes(d.place) && typeof d.flowerOpen === 'boolean') return { version: 1, place: d.place, flowerOpen: d.flowerOpen };
  } catch { /* recuperação acolhedora */ }
  return null;
}
export function saveSession(s: SafeSession | null) { try { if (s) sessionStorage.setItem(sessionKey, JSON.stringify(s)); else sessionStorage.removeItem(sessionKey); } catch { /* sem persistência */ } }
export class WorldState {
  place: Place = 'yard'; focus: Focus = 'room'; flowerOpen = false; selected = false;
  ball = 0; water = 0; active = false; paused = false;
  origin: Place = 'yard';
  navigate(place: Place) { if (place === 'music_house' && this.place !== place) this.origin = this.place; this.cancel(); this.place = place; this.focus = 'room'; }
  cancel() { this.selected = false; this.ball = 0; this.water = 0; }
  pause() { this.paused = true; this.cancel(); }
  tick(dt: number) {
    if (!this.active || this.paused) return;
    if (this.ball) this.ball = this.ball + dt >= 2.4 ? 0 : this.ball + dt;
    if (this.water) { this.water += dt; if (this.water >= .65) this.flowerOpen = true; if (this.water >= 1.3) this.water = 0; }
  }
  safe(): SafeSession { return { version: 1, place: this.place, flowerOpen: this.flowerOpen }; }
}
