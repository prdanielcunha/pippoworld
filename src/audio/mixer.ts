import { recordings, type Channel, type RecordedId } from '../content/resources';
import type { Preferences } from '../game/state';
interface Voice { source: AudioScheduledSourceNode; gain: GainNode; channel: Channel; key: string; }
export const frequencies = [261.625565, 293.664768, 329.627557, 349.228231, 391.995436, 440, 493.883301, 523.251131];
export class Mixer {
  private context?: AudioContext; private buses = {} as Record<Channel, GainNode>;
  private voices: Voice[] = []; private buffers = new Map<RecordedId, AudioBuffer>();
  private recording?: RecordedId; private noise?: AudioBuffer;
  private retiring = new Set<Voice>(); private desiredRunning = false; private revision = 0;
  constructor(private preferences: Preferences, private onInterruption?: () => void) {}
  async unlock() {
    this.desiredRunning = true; const revision = ++this.revision;
    try {
      if (!this.context) {
        const ctx = this.context = new AudioContext({ latencyHint: 'interactive' });
        ctx.onstatechange = () => { if (this.desiredRunning && ctx.state !== 'running') this.onInterruption?.(); };
        const limiter = ctx.createDynamicsCompressor(); limiter.threshold.value = -10; limiter.ratio.value = 12; limiter.connect(ctx.destination);
        for (const c of ['voice', 'animals', 'instruments', 'ambience'] as Channel[]) { const bus = ctx.createGain(); bus.connect(limiter); this.buses[c] = bus; }
        this.configure(this.preferences);
        this.noise = ctx.createBuffer(1, ctx.sampleRate * .3, ctx.sampleRate);
        const data = this.noise.getChannelData(0);
        // Ruído instrumental, nunca usado como vocalização animal.
        let seed = 17; for (let i = 0; i < data.length; i++) { seed = (seed * 16807) % 2147483647; data[i] = seed / 1073741824 - 1; }
      }
      await this.context.resume();
      if (!this.desiredRunning) { await this.context.suspend(); return false; }
      return revision === this.revision && this.context.state === 'running';
    } catch { return false; }
  }
  configure(p: Preferences) { this.preferences = p; if (this.context) for (const c of Object.keys(p.volumes) as Channel[]) this.buses[c].gain.setTargetAtTime(p.volumes[c] * .65, this.context.currentTime, .015); }
  private release(v: Voice) {
    const ctx = this.context!; const now = ctx.currentTime;
    v.gain.gain.cancelScheduledValues(now); v.gain.gain.setTargetAtTime(0, now, .012);
    try { v.source.stop(now + .06); } catch { /* já finalizada */ }
    this.voices = this.voices.filter(x => x !== v); this.retiring.add(v);
  }
  stopKey(key: string) { for (const v of [...this.voices]) if (v.key === key) this.release(v); }
  stopChannels(channels: Channel[]) { for (const v of [...this.voices]) if (channels.includes(v.channel)) this.release(v); this.recording = undefined; }
  stop() { this.stopChannels(['voice', 'animals', 'instruments', 'ambience']); }
  suspend() {
    this.desiredRunning = false; this.revision++; this.stop();
    // Inclui fontes em liberação: nenhuma cauda antiga reaparece ao retomar.
    for (const v of this.retiring) { v.gain.disconnect(); try { v.source.stop(); } catch { /* já terminou */ } }
    this.retiring.clear(); void this.context?.suspend().catch(() => {});
  }
  dispose() { this.suspend(); if (this.context) this.context.onstatechange = null; void this.context?.close().catch(() => {}); }
  get status() { return { state: this.context?.state ?? 'locked', voices: this.voices.length, channels: this.voices.map(v => v.channel) }; }
  private attach(source: AudioScheduledSourceNode, channel: Channel, key: string, level: number, duration: number, sustained = false) {
    const ctx = this.context!; const now = ctx.currentTime;
    if (this.voices.length >= 12) this.release(this.voices[0]);
    const gain = ctx.createGain(); gain.gain.setValueAtTime(0, now); gain.gain.linearRampToValueAtTime(level, now + .006); if (sustained) gain.gain.setValueAtTime(level, now + Math.max(.007, duration - .04)); gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
    source.connect(gain); gain.connect(this.buses[channel]);
    const voice = { source, gain, channel, key }; this.voices.push(voice);
    source.onended = () => { this.retiring.delete(voice); this.voices = this.voices.filter(v => v !== voice); source.disconnect(); gain.disconnect(); };
    source.start(now); source.stop(now + duration + .02); return voice;
  }
  instrument(kind: 'key' | 'drum' | 'shaker', key: string, index = 0) {
    const ctx = this.context; if (!ctx || ctx.state !== 'running') { if (ctx && this.desiredRunning) this.onInterruption?.(); return; }
    this.stopChannels(['voice', 'animals']); this.stopKey(key);
    if (kind === 'shaker') {
      const source = ctx.createBufferSource(); source.buffer = this.noise!;
      const filter = ctx.createBiquadFilter(); filter.type = 'highpass'; filter.frequency.value = 3800;
      // Enveloppe courte de graines secouées, synthèse instrumentale identifiée.
      const v = this.attach(source, 'instruments', key, .22, .23); source.disconnect(); source.connect(filter); filter.connect(v.gain);
    } else {
      if (kind === 'key') {
        const osc = ctx.createOscillator(); osc.type = 'triangle';
        osc.frequency.setValueAtTime(frequencies[index], ctx.currentTime);
        this.attach(osc, 'instruments', key, .22, 2.5);
      } else {
        // Modos de membrana com decaimentos distintos: tambor sintetizado.
        for (const [ratio, level, duration] of [[1, .4, .38], [1.59, .13, .23], [2.14, .06, .14]]) {
          const osc = ctx.createOscillator(); osc.type = 'sine';
          osc.frequency.setValueAtTime(210 * ratio, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(150 * ratio, ctx.currentTime + .08);
          this.attach(osc, 'instruments', key, level, duration);
        }
      }
    }
  }
  async prepare() {
    if (!this.context) return;
    await Promise.all(Object.entries(recordings).map(async ([id, r]) => {
      if (!r.url || !r.origin || !r.license) return;
      try { const response = await fetch(r.url); if (!response.ok) return; this.buffers.set(id as RecordedId, await this.context!.decodeAudioData(await response.arrayBuffer())); } catch { /* recurso indisponível: não substituir por síntese */ }
    }));
  }
  recorded(id: RecordedId) {
    const ctx = this.context; const buffer = this.buffers.get(id); const r = recordings[id];
    if (!buffer) { this.stopChannels(['voice', 'animals']); return false; }
    if (!ctx || ctx.state !== 'running' || !buffer || (r.channel === 'voice' && !this.preferences.speech)) return false;
    if (this.recording === id && this.voices.some(v => v.key === id)) return true;
    this.stopChannels(['voice', 'animals']); this.recording = id;
    const source = ctx.createBufferSource(); source.buffer = buffer;
    this.attach(source, r.channel, id, .7, buffer.duration, true); return true;
  }
}
