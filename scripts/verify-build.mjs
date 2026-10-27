import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const references = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m => m[1]);
for (const ref of references) {
  if (/^(https?:|\/)/.test(ref)) throw new Error(`Referência não relativa no build: ${ref}`);
  if (!(await stat(path.resolve(root, ref))).isFile()) throw new Error(`Recurso ausente: ${ref}`);
}
const assets = await readdir(path.join(root, 'assets'));
if (!assets.some(f => f.endsWith('.js')) || !assets.some(f => f.endsWith('.css'))) throw new Error('Build incompleto');
await stat(path.join(root, 'THIRD_PARTY_NOTICES.txt'));
console.log(`Build validado: ${references.length} referências HTML, ${assets.length} assets, avisos de licença presentes.`);
