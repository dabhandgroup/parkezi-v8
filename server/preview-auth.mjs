import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const COOKIE_NAME = '__Host-parkezi_preview';
export const SESSION_SECONDS = 7 * 24 * 60 * 60;
const NO_INDEX = 'noindex, nofollow, noarchive, nosnippet, noimageindex';
const baseHeaders = {
  'X-Robots-Tag': NO_INDEX,
  'Cache-Control': 'private, no-store, max-age=0',
  'CDN-Cache-Control': 'no-store',
  'Vercel-CDN-Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'X-Frame-Options': 'DENY',
};

function response(body, status = 200, headers = {}) {
  return new Response(body, { status, headers: { ...baseHeaders, ...headers } });
}

function escape(value) {
  return String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

export function safeReturnTo(value) {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || /[\\\r\n\u0000]/.test(value)) return '/';
  try {
    const parsed = new URL(value, 'https://preview.invalid');
    if (parsed.origin !== 'https://preview.invalid' || parsed.pathname.startsWith('/__preview/')) return '/';
    return parsed.pathname + parsed.search + parsed.hash;
  } catch { return '/'; }
}

function loginPage(returnTo, message = '', status = 401) {
  return response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Parkezi · Private preview</title><style>*{box-sizing:border-box}body{margin:0;min-height:100svh;display:grid;place-items:center;background:radial-gradient(ellipse at top,#e6ebef,#f6f7f9 60%);color:#202a34;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:24px}main{width:100%;max-width:440px;background:#fff;border:1px solid #e1e6ea;border-radius:22px;padding:40px;box-shadow:0 24px 70px #2233440d}.brand{font-size:23px;letter-spacing:.19em;margin-bottom:35px}h1{font-size:29px;font-weight:500;letter-spacing:-.04em;margin:0 0 14px}p{font-size:16px;line-height:1.65;color:#667480;margin:0 0 26px}label{display:block;font-size:14px;margin-bottom:9px}input,button{font:inherit;font-size:16px;width:100%;min-height:50px;border-radius:100px}input{border:1px solid #cfd7df;padding:13px 18px;background:#fff}button{border:0;background:#1b2530;color:#fff;margin-top:15px;cursor:pointer;transition:background .2s}button:hover{background:#354353}:focus-visible{outline:2px solid #657c91;outline-offset:4px}.error{color:#a33030;font-size:14px;margin:15px 0 0}@media(max-width:430px){main{padding:30px 24px}}</style></head><body><main><div class="brand" aria-label="Parkezi">PARKEZI</div><h1>Private preview.</h1><p>Enter the password to view the Parkezi website.</p><form method="post" action="/__preview/login"><input type="hidden" name="next" value="${escape(safeReturnTo(returnTo))}"><label for="preview-password">Password</label><input id="preview-password" name="password" type="password" autocomplete="current-password" required autofocus maxlength="512"${message ? ' aria-invalid="true" aria-describedby="login-error"' : ''}>${message ? `<p class="error" id="login-error" role="alert">${escape(message)}</p>` : ''}<button type="submit">View website <span aria-hidden="true">→</span></button></form></main></body></html>`, status, {
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'",
  });
}

function equal(a, b) {
  const ah = createHash('sha256').update(String(a)).digest();
  const bh = createHash('sha256').update(String(b)).digest();
  return timingSafeEqual(ah, bh);
}

function sessionKey(password, secret) {
  return createHmac('sha256', secret).update(password).digest();
}

function sign(payload, key) {
  return createHmac('sha256', key).update(payload).digest('base64url');
}

export function createSession(password, secret, now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ exp: Math.floor(now / 1000) + SESSION_SECONDS, nonce: randomBytes(16).toString('hex') })).toString('base64url');
  return payload + '.' + sign(payload, sessionKey(password, secret));
}

export function validSession(token, password, secret, now = Date.now()) {
  if (!token || token.length > 1024) return false;
  const [payload, signature, extra] = token.split('.');
  if (!payload || !signature || extra || !equal(signature, sign(payload, sessionKey(password, secret)))) return false;
  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    const seconds = Math.floor(now / 1000);
    return Number.isInteger(session.exp) && session.exp > seconds && session.exp <= seconds + SESSION_SECONDS && typeof session.nonce === 'string';
  } catch { return false; }
}

function cookie(request) {
  const parts = (request.headers.get('cookie') || '').split(';');
  return parts.map(p => p.trim()).find(p => p.startsWith(COOKIE_NAME + '='))?.slice(COOKIE_NAME.length + 1) || '';
}

export async function handlePreview(request, { password, secret, loadAsset }) {
  const url = new URL(request.url);
  const rawPath = url.searchParams.get('__path');
  let pathname;
  try { pathname = rawPath === null ? url.pathname : '/' + rawPath.replace(/^\/+/, ''); pathname = decodeURIComponent(pathname); }
  catch { return response('Not found', 404); }

  if (pathname === '/robots.txt') return response('User-agent: *\nDisallow: /\n', 200, { 'Content-Type': 'text/plain; charset=utf-8' });
  if (!password || !secret || secret.length < 32) return response('This private preview is awaiting secure configuration.', 503, { 'Content-Type': 'text/plain; charset=utf-8' });

  if (pathname === '/__preview/login' && request.method === 'POST') {
    if (request.headers.get('origin') !== url.origin) return response('Request not allowed', 403);
    if (!request.headers.get('content-type')?.startsWith('application/x-www-form-urlencoded')) return response('Unsupported form', 415);
    const body = await request.text();
    if (body.length > 8192) return response('Request too large', 413);
    const form = new URLSearchParams(body);
    const returnTo = safeReturnTo(form.get('next'));
    const candidate = form.get('password') || '';
    if (candidate.length > 512 || !equal(candidate, password)) return loginPage(returnTo, 'That password wasn’t correct. Please try again.');
    return response(null, 303, {
      Location: returnTo,
      'Set-Cookie': `${COOKIE_NAME}=${createSession(password, secret)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_SECONDS}`,
    });
  }

  if (!['GET', 'HEAD'].includes(request.method)) return response('Method not allowed', 405, { Allow: 'GET, HEAD' });
  const returnTo = safeReturnTo(pathname + (rawPath === null ? url.search : ''));
  if (!validSession(cookie(request), password, secret)) return loginPage(returnTo);
  if (pathname === '/__preview/login') return response(null, 303, { Location: safeReturnTo(url.searchParams.get('next')) });
  if (/[\\\u0000]/.test(pathname) || pathname.split('/').includes('..')) return response('Not found', 404);
  const asset = await loadAsset(pathname);
  if (!asset) return response('Not found', 404, { 'Content-Type': 'text/plain; charset=utf-8' });
  return response(request.method === 'HEAD' ? null : asset.body, 200, { 'Content-Type': asset.contentType });
}
