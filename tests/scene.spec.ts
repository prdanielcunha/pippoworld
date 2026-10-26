import { expect, test } from '@playwright/test';

for (const viewport of [{ width: 1280, height: 800 }, { width: 390, height: 844 }]) {
  test(`cena real, câmera fixa e pausa em ${viewport.width}px`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    const external: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => {
      if (!request.url().startsWith('http://127.0.0.1:4173')) external.push(request.url());
    });
    await page.setViewportSize(viewport);
    await page.goto('/');
    const canvas = page.locator('canvas');
    await expect(canvas).toHaveAttribute('data-rendered', 'true');
    await expect(page.getByRole('status')).toContainText('estudo provisório');
    // Readback do framebuffer: confirma desenho de cores diferentes, não só um canvas vazio.
    const colors = await canvas.evaluate((node: HTMLCanvasElement) => new Promise<{ colors: number; yellow: number; blue: number }>(resolve => requestAnimationFrame(() => {
      const gl = node.getContext('webgl2') || node.getContext('webgl');
      if (!gl) throw new Error('WebGL não inicializado');
      const pixels = new Uint8Array(4 * gl.drawingBufferWidth * gl.drawingBufferHeight);
      gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
      const unique = new Set<string>();
      let yellow = 0;
      let blue = 0;
      for (let i = 0; i < pixels.length; i += 4) {
        const [r, g, b] = [pixels[i], pixels[i+1], pixels[i+2]];
        unique.add(`${r},${g},${b}`);
        if (r > 150 && g > 100 && b < g * 0.65) yellow++;
        if (b > r * 1.4 && b > g * 1.1) blue++;
      }
      resolve({ colors: unique.size, yellow, blue });
    })));
    expect(colors.colors).toBeGreaterThan(20);
    expect(colors.yellow).toBeGreaterThan(100);
    expect(colors.blue).toBeGreaterThan(100);
    const before = await canvas.screenshot({ path: testInfo.outputPath('before.png') });
    await canvas.hover();
    await page.mouse.down();
    await page.mouse.move(80, 250, { steps: 8 });
    await page.mouse.up();
    await canvas.screenshot({ path: testInfo.outputPath(`yard-${viewport.width}.png`) });
    const after = await canvas.screenshot();
    const changedFraction = await page.evaluate(async ({ first, second }) => {
      const pixels = async (source: string) => {
        const image = new Image();
        image.src = source;
        await image.decode();
        const target = document.createElement('canvas');
        target.width = image.width; target.height = image.height;
        const context = target.getContext('2d')!;
        context.drawImage(image, 0, 0);
        return context.getImageData(0, 0, image.width, image.height).data;
      };
      const a = await pixels(first); const b = await pixels(second);
      let changed = 0;
      for (let i = 0; i < a.length; i += 4) {
        if (Math.abs(a[i]-b[i]) + Math.abs(a[i+1]-b[i+1]) + Math.abs(a[i+2]-b[i+2]) > 30) changed++;
      }
      return changed / (a.length / 4);
    }, { first: `data:image/png;base64,${before.toString('base64')}`, second: `data:image/png;base64,${after.toString('base64')}` });
    // Tolera antialiasing nas bordas; um movimento da câmera altera os objetos.
    expect(changedFraction).toBeLessThan(0.001);
    await page.getByRole('button', { name: 'Pausar', exact: true }).click();
    await expect(page.getByText('Uma pausa tranquila')).toBeVisible();
    await page.getByRole('button', { name: 'Continuar', exact: true }).click();
    await expect(page.getByText('Uma pausa tranquila')).toBeHidden();
    await page.evaluate(() => window.dispatchEvent(new Event('blur')));
    await expect(page.getByText('Uma pausa tranquila')).toBeVisible();
    await page.getByRole('button', { name: 'Continuar', exact: true }).click();
    await expect(page.getByText('Uma pausa tranquila')).toBeHidden();
    expect(errors).toEqual([]);
    expect(external).toEqual([]);
  });
}

test('informa indisponibilidade quando WebGL não existe', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type: string, ...args: unknown[]) {
      if (type.includes('webgl')) return null;
      return Reflect.apply(original, this, [type, ...args]);
    } as typeof original;
  });
  await page.goto('/');
  await expect(page.getByRole('status')).toContainText('Não foi possível abrir');
  await expect(page.getByRole('button', { name: 'Pausar', exact: true })).toBeDisabled();
});
