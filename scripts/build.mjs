import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

await rm('private/site', { recursive: true, force: true });
await mkdir('private/site', { recursive: true });
await cp('dist', 'private/site', { recursive: true });
await mkdir('public', { recursive: true });
await writeFile('public/robots.txt', 'User-agent: *\nDisallow: /\n');

async function verify(dir) {
  let count = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) count += await verify(file);
    else {
      count++;
      if (file.endsWith('.html')) {
        const text = await readFile(file, 'utf8');
        if (!/<meta\s+name="robots"\s+content="noindex,nofollow"/i.test(text)) {
          throw new Error(`Missing noindex metadata: ${file}`);
        }
      }
    }
  }
  return count;
}

const count = await verify('private/site');
console.log(`Prepared ${count} protected site files. Public output contains only robots.txt.`);
