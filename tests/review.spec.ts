import { test, expect, type Page } from '@playwright/test';
async function enter(page: Page) {
  await page.goto('/'); await expect(page.getByText('Protótipo em avaliação.', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'Começar', exact: true }).click();
  await expect(page.locator('canvas')).toHaveAttribute('data-audio', 'running');
}
async function keyboard(page: Page) {
  await page.locator('[data-target=music_house]').click(); await page.locator('[data-target=keyboard_eight]').click();
}
test('orientação e redimensionamento liberam notas e preservam alvos no iPhone estreito', async ({ page }, info) => {
  await page.setViewportSize({ width: 375, height: 667 }); await enter(page); await keyboard(page);
  const key = page.locator('[data-target=key_0]'); await key.hover(); await page.mouse.down();
  await expect(key).toHaveAttribute('aria-pressed', 'true');
  await page.setViewportSize({ width: 667, height: 375 });
  await expect(key).toHaveAttribute('aria-pressed', 'false'); await expect(page.locator('canvas')).toHaveAttribute('data-voices', '0');
  await page.mouse.up();
  // Insets simulados checam o CSS; não são medição do notch/home indicator físicos.
  await page.addStyleTag({ content: ':root{--safe-left:44px;--safe-right:44px;--safe-bottom:21px;--safe-top:0px}' });
  const pause = (await page.getByRole('button', { name: 'Pausar', exact: true }).boundingBox())!;
  expect(pause.x + pause.width).toBeLessThanOrEqual(667 - 44);
  const nav = (await page.locator('nav').boundingBox())!; expect(nav.y + nav.height).toBeLessThanOrEqual(375 - 21);
  await page.setViewportSize({ width: 375, height: 667 });
  await page.addStyleTag({ content: ':root{--safe-left:0px;--safe-right:0px;--safe-bottom:34px;--safe-top:47px}' });
  const keys = await page.locator('[data-target^=key_]').evaluateAll(nodes => nodes.map(n => { const b = n.getBoundingClientRect(); return { x: b.x, r: b.right, w: b.width }; }));
  keys.forEach((b, i) => { expect(b.w).toBeGreaterThanOrEqual(44); expect(b.x).toBeGreaterThanOrEqual(0); expect(b.r).toBeLessThanOrEqual(375); if (i) expect(b.x).toBeGreaterThanOrEqual(keys[i-1].r - .5); });
  await page.screenshot({ path: info.outputPath('iphone-insets-simulados.png') });
});

test('Pointer Events com dois contatos, glissando e cancelamento independente', async ({ page }) => {
  await enter(page); await keyboard(page);
  const first = page.locator('[data-target=key_0]'), second = page.locator('[data-target=key_4]');
  // Teste portátil do roteamento de contatos; não simula hardware multitoque.
  await first.dispatchEvent('pointerdown', { pointerId: 101, pointerType: 'touch' });
  await second.dispatchEvent('pointerdown', { pointerId: 102, pointerType: 'touch' });
  await expect(first).toHaveAttribute('aria-pressed', 'true'); await expect(second).toHaveAttribute('aria-pressed', 'true');
  await first.dispatchEvent('pointercancel', { pointerId: 101, pointerType: 'touch' });
  await expect(first).toHaveAttribute('aria-pressed', 'false'); await expect(second).toHaveAttribute('aria-pressed', 'true');
  await second.dispatchEvent('pointerup', { pointerId: 102, pointerType: 'touch' });
  await expect(second).toHaveAttribute('aria-pressed', 'false');
  const b = (await first.boundingBox())!; const c = (await second.boundingBox())!;
  await page.mouse.move(b.x+b.width/2,b.y+b.height/2); await page.mouse.down(); await page.mouse.move(c.x+c.width/2,c.y+c.height/2);
  await expect(first).toHaveAttribute('aria-pressed', 'false'); await expect(second).toHaveAttribute('aria-pressed', 'true');
  await page.mouse.up(); await expect(second).toHaveAttribute('aria-pressed', 'false');
});

test('retorno de página preservada exige continuar, sem notas antigas', async ({ page }) => {
  await enter(page); await keyboard(page); await page.locator('[data-target=key_2]').click();
  await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true })));
  await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })));
  await expect(page.getByText('Uma pausa tranquila')).toBeVisible();
  await expect(page.locator('canvas')).toHaveAttribute('data-voices', '0');
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await expect(page.locator('canvas')).toHaveAttribute('data-audio', 'running');
  await expect(page.locator('canvas')).toHaveAttribute('data-voices', '0');
});

test('retomada assíncrona não contorna barreira adulta', async ({ page }) => {
  await page.addInitScript(() => {
    const original = AudioContext.prototype.resume;
    AudioContext.prototype.resume = async function () {
      await original.call(this);
      if ((window as unknown as { holdResume?: boolean }).holdResume) await new Promise<void>(resolve => window.addEventListener('release-resume', () => resolve(), { once: true }));
    };
  });
  await enter(page); await page.getByRole('button', { name: 'Pausar', exact: true }).click();
  await page.evaluate(() => Object.assign(window, { holdResume: true }));
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await page.getByRole('button', { name: 'Responsáveis', exact: true }).first().click();
  await page.evaluate(() => window.dispatchEvent(new Event('release-resume')));
  await expect(page.getByRole('textbox', { name: 'Resposta' })).toBeVisible();
  await expect(page.locator('canvas')).toHaveAttribute('data-audio', 'suspended');
});

test('perda e restauração reais do contexto WebGL mantêm retomada segura', async ({ page }) => {
  await enter(page); await keyboard(page);
  const available = await page.locator('canvas').evaluate((node: HTMLCanvasElement) => {
    const gl = node.getContext('webgl2') || node.getContext('webgl'); const ext = gl?.getExtension('WEBGL_lose_context');
    if (!ext) return false; Object.assign(window, { recoveryContext: ext }); ext.loseContext(); return true;
  });
  test.skip(!available, 'WEBGL_lose_context indisponível neste navegador; falha real não simulada.');
  await expect(page.locator('canvas')).toHaveAttribute('data-graphics', 'lost'); await expect(page.getByText('Uma pausa tranquila')).toBeVisible();
  await page.evaluate(() => (window as unknown as { recoveryContext: WEBGL_lose_context }).recoveryContext.restoreContext());
  await expect(page.locator('canvas')).toHaveAttribute('data-graphics', 'ready', { timeout: 15000 });
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await expect(page.locator('canvas')).toHaveAttribute('data-voices', '0'); await expect(page.locator('canvas')).toHaveAttribute('data-audio', 'running');
});
