import { cp, mkdir, readFile, stat, lstat, rm, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { renderPages } from './render-pages.mjs';
const output = resolve('dist');
if (dirname(output) !== process.cwd()) throw new Error('Build output must be inside this project.');
const previous = await lstat(output).catch(error => { if (error.code !== 'ENOENT') throw error; });
if (previous?.isSymbolicLink()) throw new Error('Build output must not be a symlink.');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp('public', output, { recursive: true });
const pages = await renderPages(output);
const localFiles = new Set();
for (const file of await readdir(output, {recursive:true})) {
  if (!file.endsWith('.html')) continue;
  const html = await readFile(resolve(output,file), 'utf8');
  for (const [,raw] of html.matchAll(/(?:src|href|poster)="(\/[^"\s]*)"/g)) {
    const path = raw.split(/[?#]/)[0];
    const target = path.endsWith('/') ? path+'index.html' : path;
    localFiles.add(target);
  }
}
for (const path of localFiles) await stat(resolve(output,'.'+path));
console.log(`Built ${pages.length} pages in dist/. Verified ${localFiles.size} local links and assets.`);
