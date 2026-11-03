import { execFileSync } from 'node:child_process';
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
const sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const branch = execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim();
if (branch !== 'dev/first-playable') throw new Error('A demonstração deve usar dev/first-playable.');
execFileSync('git', ['diff', '--quiet', 'HEAD', '--', 'src', 'public', 'index.html', 'vite.config.ts', 'package.json', 'package-lock.json']);
execFileSync('npm', ['run', 'build'], { stdio: 'inherit', env: { ...process.env, VITE_BUILD_REVISION: sourceCommit.slice(0, 7) } });
execFileSync(process.execPath, ['scripts/verify-build.mjs'], { stdio: 'inherit' });
const files = [];
async function collect(directory) {
  for (const name of await readdir(directory)) {
    const file = path.join(directory, name);
    if ((await stat(file)).isDirectory()) await collect(file);
    else { const data = await readFile(file); files.push({ path: path.relative('dist', file).replaceAll('\\', '/'), bytes: data.length, sha256: createHash('sha256').update(data).digest('hex') }); }
  }
}
await collect('dist');
await writeFile('dist/build-info.json', JSON.stringify({ prototype: true, repository: 'prdanielcunha/pippoworld', branch, sourceCommit, builtAtUTC: new Date().toISOString(), files }, null, 2) + '\n');
console.log(`Protótipo ${sourceCommit.slice(0, 7)}: ${files.length} arquivos inventariados em build-info.json.`);
