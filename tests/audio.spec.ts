import { expect, test } from '@playwright/test';

test('áudio real no primeiro gesto: oito alturas, sinal, liberação, limites e silêncio na pausa', async ({ page }) => {
  await page.addInitScript(() => {
    const data: { pitches: number[]; analyser?: AnalyserNode } = { pitches: [] };
    Object.assign(window, { audioEvidence: data });
    const createOsc = AudioContext.prototype.createOscillator;
    AudioContext.prototype.createOscillator = function () {
      const osc = createOsc.call(this); const start = osc.start.bind(osc);
      let pitch = osc.frequency.value; const set = osc.frequency.setValueAtTime.bind(osc.frequency);
      osc.frequency.setValueAtTime = (value: number, when: number) => { pitch = value; return set(value, when); };
      osc.start = (when?: number) => { data.pitches.push(pitch); start(when); }; return osc;
    };
    const createCompressor = AudioContext.prototype.createDynamicsCompressor;
    AudioContext.prototype.createDynamicsCompressor = function () {
      const node = createCompressor.call(this); data.analyser = this.createAnalyser(); node.connect(data.analyser); return node;
    };
  });
  await page.goto('/'); await page.getByRole('button', { name: 'Começar', exact: true }).click();
  await expect(page.locator('canvas')).toHaveAttribute('data-audio', 'running');
  await page.locator('nav').getByRole('button', { name: 'Casa da Música', exact: true }).click();
  await page.locator('[data-target=keyboard_eight]').click();
  for (let i = 0; i < 8; i++) await page.locator(`[data-target=key_${i}]`).click();
  const pitches = await page.evaluate(() => (window as unknown as { audioEvidence: { pitches: number[] } }).audioEvidence.pitches);
  const expected = [261.625565, 293.664768, 329.627557, 349.228231, 391.995436, 440, 493.883301, 523.251131];
  expect(pitches).toHaveLength(8); pitches.forEach((n, i) => expect(n).toBeCloseTo(expected[i], 2));
  const key = page.locator('[data-target=key_0]'); await key.hover(); await page.mouse.down();
  await expect.poll(async () => page.evaluate(() => {
    const analyser = (window as unknown as { audioEvidence: { analyser: AnalyserNode } }).audioEvidence.analyser;
    const samples = new Float32Array(analyser.fftSize); analyser.getFloatTimeDomainData(samples);
    return Math.sqrt(samples.reduce((sum, n) => sum + n * n, 0) / samples.length);
  })).toBeGreaterThan(.001);
  await page.mouse.up(); await expect(key).toHaveAttribute('aria-pressed', 'false');
  await page.getByRole('button', { name: 'Tambor', exact: true }).click();
  const drum = page.locator('[data-target=drum_single]');
  // Repetição rápida pelo caminho acessível, sem fila de ataques antigos.
  await drum.evaluate(node => { for (let i = 1; i <= 40; i++) (node as HTMLButtonElement).click(); });
  await expect.poll(async () => Number(await page.locator('canvas').getAttribute('data-voices'))).toBeLessThanOrEqual(12);
  await page.getByRole('button', { name: 'Pausar', exact: true }).click();
  await expect(page.locator('canvas')).toHaveAttribute('data-voices', '0');
  await expect(page.locator('canvas')).toHaveAttribute('data-audio', 'suspended');
});
