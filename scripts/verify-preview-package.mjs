import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { chromium, expect } from '@playwright/test';
const root = path.resolve(process.argv[2] || 'dist');
const reportPath = process.argv[3] || 'work/package-verification.json';
const types = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.json': 'application/json', '.txt': 'text/plain' };
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://local').pathname);
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    const data = await readFile(file); res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }); res.end(data);
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const address = server.address(); const url = `http://127.0.0.1:${address.port}`;
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH, args: ['--enable-unsafe-swiftshader'] });
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const response = await page.request.get(url + '/build-info.json'); if (!response.ok()) throw new Error('Missing build identity');
  const info = await response.json();
  for (const file of info.files) {
    const response = await page.request.get(url + '/' + file.path); if (!response.ok()) throw new Error(`HTTP failure: ${file.path}`);
    const data = await response.body();
    if (createHash('sha256').update(data).digest('hex') !== file.sha256) throw new Error(`Integrity mismatch: ${file.path}`);
  }
  const errors = [], failedRequests = [];
  page.on('pageerror', e => errors.push(e.message)); page.on('requestfailed', r => failedRequests.push(r.url()));
  await page.goto(url); await expect(page.locator('canvas')).toHaveAttribute('data-rendered', 'true'); await expect(page.getByText('Versão de teste: ' + info.sourceCommit.slice(0, 7), { exact: true })).toBeVisible();
  await page.screenshot({ path: 'work/prototype-entry.png' });
  await page.getByRole('button', { name: 'Começar', exact: true }).click();
  await expect(page.locator('canvas')).toHaveAttribute('data-rendered', 'true'); await expect(page.locator('canvas')).toHaveAttribute('data-audio', 'running');
  if (errors.length || failedRequests.length) throw new Error(JSON.stringify({ errors, failedRequests }));
  const report = { sourceCommit: info.sourceCommit, testedBundle: root, checkedAtUTC: new Date().toISOString(), filesHTTP200AndSHA256Verified: info.files.length, adultVersionVisible: true, engineRendered: true, audioAfterGesture: 'running', errors, failedRequests, scope: 'Pacote exato publicado, servido em HTTP local. Não é teste de aparelho físico nem requisição ao domínio externo.' };
  await mkdir(path.dirname(reportPath), { recursive: true });
  await writeFile(reportPath, JSON.stringify(report, null, 2) + '\n'); console.log(JSON.stringify(report));
} finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
