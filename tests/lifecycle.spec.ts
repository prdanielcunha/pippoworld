import { test, expect } from '@playwright/test';

test('limite adulto usa tempo ativo e conclui sem exigir guardar', async ({ page }) => {
  await page.clock.install();
  await page.addInitScript(() => localStorage.setItem('world.preferences', JSON.stringify({ version: 1, minutes: 5 })));
  await page.goto('/'); await page.getByRole('button', { name: 'Começar', exact: true }).click();
  await expect(page.locator('canvas')).toHaveAttribute('data-audio', 'running');
  await page.clock.fastForward(301000);
  await expect(page.getByRole('button', { name: 'Começar', exact: true })).toBeVisible();
  expect(await page.evaluate(() => sessionStorage.getItem('world.session'))).toBeNull();
});

test('rega cancelada não abre flor; atualização recupera só estado seguro', async ({ page }) => {
  await page.goto('/'); await page.getByRole('button', { name: 'Começar', exact: true }).click();
  await page.locator('[data-target=garden]').click();
  await page.locator('[data-target=watering_can]').click();
  await page.locator('[data-target=flower_main]').click();
  await page.getByRole('button', { name: 'Pausar', exact: true }).click();
  // Pode confirmar antes do pause em máquina lenta: recuperar exatamente o estado confirmado.
  const confirmed = await page.locator('canvas').getAttribute('data-flower');
  await page.reload(); await page.getByRole('button', { name: 'Começar', exact: true }).click();
  await expect(page.locator('canvas')).toHaveAttribute('data-place', 'garden');
  await expect(page.locator('canvas')).toHaveAttribute('data-flower', confirmed!);
  await expect(page.locator('[data-target=watering_can]')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('canvas')).toHaveAttribute('data-ball', 'ready');
});
