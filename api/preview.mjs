import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { handlePreview } from '../server/preview-auth.mjs';
import { DEFAULT_PASSWORD_HASH } from '../server/preview-defaults.mjs';

const root = path.join(process.cwd(), 'private', 'site');
let generatedConfig;
async function previewSecret() {
  const configured = process.env.PREVIEW_SESSION_SECRET;
  if (configured && configured.length >= 32) return configured;
  generatedConfig ||= readFile(path.join(process.cwd(), 'private', 'preview-config.json'), 'utf8').then(JSON.parse).catch(() => ({}));
  return (await generatedConfig).sessionSecret;
}
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.avif': 'image/avif', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8' };

async function loadAsset(pathname) {
  let relative = pathname.replace(/^\/+/, '') || 'index.html';
  if (relative.endsWith('/')) relative += 'index.html';
  if (relative === 'style-guide') relative += '/index.html';
  const absolute = path.resolve(root, relative);
  if (!absolute.startsWith(root + path.sep)) return null;
  try { return { body: await readFile(absolute), contentType: types[path.extname(absolute).toLowerCase()] || 'application/octet-stream' }; }
  catch { return null; }
}

export default async function handler(req, res) {
  try {
    const host = String(req.headers.host || 'preview.invalid');
    const requestUrl = new URL(req.url || '/', `https://${host}`);
    let body;
    if (!['GET', 'HEAD'].includes(req.method) && req.body !== undefined) {
      body = typeof req.body === 'string' || Buffer.isBuffer(req.body) ? req.body : new URLSearchParams(req.body).toString();
      if (Buffer.byteLength(body) > 8192) {
        res.writeHead(413, { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' });res.end('Request too large');return;
      }
    } else if (!['GET', 'HEAD'].includes(req.method)) {
      const chunks = []; let length = 0;
      for await (const chunk of req) {
        length += chunk.length;
        if (length > 8192) {
          res.writeHead(413, { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' });res.end('Request too large');return;
        }
        chunks.push(chunk);
      }
      body = Buffer.concat(chunks);
    }
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) if (value !== undefined) headers.set(key, Array.isArray(value) ? value.join(', ') : value);
    const request = new Request(requestUrl, { method: req.method, headers, body });
    const response = await handlePreview(request, { password: process.env.PREVIEW_PASSWORD, passwordHash: DEFAULT_PASSWORD_HASH, secret: await previewSecret(), loadAsset });
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch {
    res.writeHead(500, { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' });
    res.end('The private preview could not be loaded.');
  }
}
