import { test, expect } from '@playwright/test';

test('framebuffer 3D contém cores reais e arrasto livre não move a câmera', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto('/');
  await page.getByRole('button', { name: 'Começar', exact: true }).click();
  const first = await page.locator('canvas').evaluate((node: HTMLCanvasElement) => new Promise<{ colors: number; yellow: number; blue: number }>(resolve => requestAnimationFrame(() => {
    const gl = node.getContext('webgl2') || node.getContext('webgl'); if (!gl) throw new Error('WebGL ausente');
    const pixels = new Uint8Array(4 * gl.drawingBufferWidth * gl.drawingBufferHeight);
    gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    Object.assign(window, { cameraFrame: pixels });
    const colors = new Set<string>(); let yellow = 0, blue = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      const [r, g, b] = [pixels[i], pixels[i+1], pixels[i+2]]; colors.add(`${r},${g},${b}`);
      if (r > 150 && g > 100 && b < g * .65) yellow++;
      if (b > r * 1.4 && b > g * 1.1) blue++;
    } resolve({ colors: colors.size, yellow, blue });
  })));
  expect(first.colors).toBeGreaterThan(20); expect(first.yellow).toBeGreaterThan(100); expect(first.blue).toBeGreaterThan(100);
  await page.mouse.move(180, 160); await page.mouse.down(); await page.mouse.move(230, 260, { steps: 8 }); await page.mouse.up();
  const changed = await page.locator('canvas').evaluate((node: HTMLCanvasElement) => new Promise<number>(resolve => requestAnimationFrame(() => {
    const gl = (node.getContext('webgl2') || node.getContext('webgl'))!;
    const pixels = new Uint8Array(4 * gl.drawingBufferWidth * gl.drawingBufferHeight);
    gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    const first = (window as unknown as { cameraFrame: Uint8Array }).cameraFrame; let changed = 0;
    for (let i = 0; i < pixels.length; i += 4) if (Math.abs(first[i]-pixels[i]) + Math.abs(first[i+1]-pixels[i+1]) + Math.abs(first[i+2]-pixels[i+2]) > 30) changed++;
    resolve(changed / (pixels.length / 4));
  })));
  expect(changed).toBeLessThan(.001);
});
