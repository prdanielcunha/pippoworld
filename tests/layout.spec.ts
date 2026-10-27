import { test, expect } from '@playwright/test';
for (const viewport of [{ width: 390, height: 844 }, { width: 820, height: 1180 }, { width: 1180, height: 820 }, { width: 844, height: 390 }]) {
  test(`teclas grandes e áreas disjuntas ${viewport.width}x${viewport.height}`, async ({ page }, info) => {
    await page.setViewportSize(viewport); await page.goto('/');
    await page.getByRole('button', { name: 'Começar', exact: true }).click();
    await page.locator('[data-target=music_house]').click();
    await page.locator('[data-target=keyboard_eight]').click();
    await expect(page.locator('[data-target^=key_]')).toHaveCount(8);
    const bounds = await page.locator('[data-target]').evaluateAll(nodes => nodes.map(n => {
      const b = n.getBoundingClientRect(); return { id: (n as HTMLElement).dataset.target!, x: b.x, y: b.y, w: b.width, h: b.height };
    }));
    for (const a of bounds) if (a.id.startsWith('key_')) { expect(a.w).toBeGreaterThanOrEqual(44); expect(a.h).toBeGreaterThanOrEqual(64); }
    for (let i = 0; i < bounds.length; i++) for (let j = i + 1; j < bounds.length; j++) {
      const a = bounds[i], b = bounds[j];
      const w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
      const h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      expect(w > 1 && h > 1, `alvos ${a.id}/${b.id} se sobrepõem`).toBe(false);
    }
    await page.screenshot({ path: info.outputPath('keyboard-layout.png') });
  });
}
