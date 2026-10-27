import { test, expect } from '@playwright/test';
import { readdir } from 'node:fs/promises';
test('build carrega todos os arquivos e avisos sem fallback HTML indevido', async ({ request, page }) => {
  const html = await request.get('/'); expect(html.ok()).toBe(true);
  expect(await html.text()).toContain('viewport-fit=cover');
  const assets = await readdir('dist/assets');
  for (const name of assets) {
    const r = await request.get('/assets/' + name); expect(r.ok(), name).toBe(true);
    if (name.endsWith('.js')) expect(r.headers()['content-type'], name).toMatch(/javascript/);
    if (name.endsWith('.css')) expect(r.headers()['content-type'], name).toContain('text/css');
    expect((await r.body()).length, name).toBeGreaterThan(0);
  }
  const notices = await request.get('/THIRD_PARTY_NOTICES.txt'); expect(notices.ok()).toBe(true);
  expect(await notices.text()).toContain('Apache License');
  const failed: string[] = []; page.on('requestfailed', r => failed.push(r.url()));
  await page.goto('/'); await expect(page.getByText('Protótipo em avaliação.', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'Começar', exact: true }).click();
  await expect(page.locator('canvas')).toHaveAttribute('data-rendered', 'true'); expect(failed).toEqual([]);
});
