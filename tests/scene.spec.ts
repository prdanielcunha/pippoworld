import { expect, test, type Page } from '@playwright/test';

async function begin(page: Page) {
  await page.goto('/'); await expect(page.locator('canvas')).toHaveAttribute('data-rendered', 'true');
  await page.getByRole('button', { name: 'Começar', exact: true }).click();
  await expect(page.locator('canvas')).toHaveAttribute('data-audio', 'running');
}
async function tap(page: Page, id: string) { await page.locator(`[data-target="${id}"]`).click(); }
async function gate(page: Page) {
  await page.getByRole('button', { name: 'Responsáveis', exact: true }).first().click();
  const question = await page.locator('.sum').innerText();
  const values = question.match(/\d+/g)!.map(Number);
  await page.getByRole('textbox', { name: 'Resposta' }).fill(String(values[0] + values[1]));
  await page.getByRole('button', { name: 'Confirmar acesso' }).click();
}
for (const viewport of [{ width: 390, height: 844 }, { width: 820, height: 1180 }, { width: 1180, height: 820 }, { width: 844, height: 390 }]) {
  test(`percursos livres, 3D e pausa ${viewport.width}x${viewport.height}`, async ({ page }, info) => {
    const errors: string[] = [], external: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('request', r => { if (!r.url().startsWith('http://127.0.0.1:4173')) external.push(r.url()); });
    await page.setViewportSize(viewport); await begin(page);
    await page.screenshot({ path: info.outputPath('yard.png') });
    await tap(page, 'duck_main'); await tap(page, 'ball_main');
    await expect(page.locator('canvas')).toHaveAttribute('data-ball', 'moving');
    await page.getByRole('button', { name: 'Pausar', exact: true }).click();
    await expect(page.locator('canvas')).toHaveAttribute('data-ball', 'ready');
    await page.getByRole('button', { name: 'Continuar', exact: true }).click();
    // Música antes de regar; tecla por tecla e troca durante ataque.
    await tap(page, 'music_house');
    await tap(page, 'rabbit_friend'); await tap(page, 'keyboard_eight');
    await expect(page.locator('[data-target^=key_]')).toHaveCount(8);
    for (let i = 0; i < 8; i++) await tap(page, 'key_' + i);
    await page.screenshot({ path: info.outputPath('keyboard.png') });
    await page.getByRole('button', { name: 'Tambor', exact: true }).click();
    await tap(page, 'drum_single');
    await page.getByRole('button', { name: 'Voltar', exact: true }).click();
    await page.getByRole('button', { name: 'Voltar', exact: true }).click();
    await page.locator('nav').getByRole('button', { name: 'Jardim', exact: true }).click();
    await tap(page, 'chick_friend'); await tap(page, 'cow_friend');
    await tap(page, 'watering_can');
    await expect(page.locator('[data-target=watering_can]')).toHaveAttribute('aria-pressed', 'true');
    await tap(page, 'flower_main');
    await expect(page.locator('canvas')).toHaveAttribute('data-flower', 'open');
    await tap(page, 'shaker_story'); await page.screenshot({ path: info.outputPath('garden.png') });
    await page.locator('nav').getByRole('button', { name: 'Casa da Música', exact: true }).click();
    await page.getByRole('button', { name: 'Voltar', exact: true }).click();
    await expect(page.locator('canvas')).toHaveAttribute('data-place', 'garden');
    await expect(page.locator('canvas')).toHaveAttribute('data-flower', 'open');
    await page.evaluate(() => window.dispatchEvent(new Event('blur')));
    await expect(page.getByText('Uma pausa tranquila')).toBeVisible();
    await expect(page.locator('canvas')).toHaveAttribute('data-voices', '0');
    await page.getByRole('button', { name: 'Concluir', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Começar', exact: true })).toBeVisible();
    expect(errors).toEqual([]); expect(external).toEqual([]);
  });
}

test('barreira, cancelamento, preferências persistentes e recuperação', async ({ page }) => {
  await begin(page);
  await page.getByRole('button', { name: 'Responsáveis', exact: true }).first().click();
  await page.getByRole('textbox', { name: 'Resposta' }).fill('0');
  await page.getByRole('button', { name: 'Confirmar acesso' }).click();
  await expect(page.getByText('Confira a soma e tente novamente.')).toBeVisible();
  await expect(page.getByText('Ajustes dos responsáveis', { exact: true })).toBeHidden();
  await page.getByRole('button', { name: 'Cancelar', exact: true }).click();
  await expect(page.getByText('Uma pausa tranquila')).toBeVisible();
  await gate(page);
  await page.getByRole('checkbox', { name: 'Reduzir movimento' }).check();
  await page.getByRole('checkbox', { name: 'Casa da Música' }).uncheck();
  await page.getByRole('slider', { name: 'Instrumentos', exact: true }).fill('0.2');
  await page.getByRole('button', { name: 'Salvar e voltar' }).click();
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await expect(page.locator('nav').getByRole('button', { name: 'Casa da Música', exact: true })).toHaveCount(0);
  await page.reload(); await page.getByRole('button', { name: 'Começar', exact: true }).click();
  await gate(page);
  await expect(page.getByRole('checkbox', { name: 'Reduzir movimento' })).toBeChecked();
  await expect(page.getByRole('slider', { name: 'Instrumentos', exact: true })).toHaveValue('0.2');
  await page.evaluate(() => { localStorage.setItem('world.preferences', '{bad'); sessionStorage.setItem('world.session', '{bad'); });
  await page.reload(); await page.getByRole('button', { name: 'Começar', exact: true }).click();
  await expect(page.locator('canvas')).toHaveAttribute('data-place', 'yard');
});

test('multitoque real, liberação independente e cancelamento', async ({ page, context, browserName }) => {
  test.skip(browserName !== 'chromium', 'CDP é exclusivo do Chromium; entrada por Pointer Events tem caso portátil separado.');
  await begin(page); await page.locator('nav').getByRole('button', { name: 'Casa da Música', exact: true }).click(); await tap(page, 'keyboard_eight');
  const a = (await page.locator('[data-target=key_0]').boundingBox())!;
  const b = (await page.locator('[data-target=key_4]').boundingBox())!;
  const client = await context.newCDPSession(page);
  const p1 = { x: a.x + a.width / 2, y: a.y + a.height / 2, id: 1 };
  const p2 = { x: b.x + b.width / 2, y: b.y + b.height / 2, id: 2 };
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [p1, p2] });
  await expect(page.locator('[data-target=key_0]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-target=key_4]')).toHaveAttribute('aria-pressed', 'true');
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [p1] });
  await expect(page.locator('[data-target=key_0]')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('[data-target=key_4]')).toHaveAttribute('aria-pressed', 'true');
  await page.evaluate(() => window.dispatchEvent(new Event('blur')));
  await expect(page.locator('canvas')).toHaveAttribute('data-voices', '0');
  await client.send('Input.dispatchTouchEvent', { type: 'touchCancel', touchPoints: [] });
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await expect(page.locator('[data-target=key_4]')).toHaveAttribute('aria-pressed', 'false');
});

test('sem WebGL apresenta fallback e não permite iniciar', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type: string, ...args: unknown[]) { if (type.includes('webgl')) return null; return Reflect.apply(original, this, [type, ...args]); } as typeof original;
  });
  await page.goto('/'); await expect(page.getByRole('status')).toContainText('Não foi possível abrir');
  await expect(page.getByRole('button', { name: 'Começar', exact: true })).toBeDisabled();
});
