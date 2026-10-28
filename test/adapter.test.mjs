import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/preview.mjs';

async function invoke(url, method = 'GET', headers = {}, body) {
  const result = {};
  const req = { url, method, headers: { host: 'preview.example', ...headers }, body };
  const res = { writeHead(status, values) { result.status = status; result.headers = values; }, end(value) { result.body = Buffer.from(value || '').toString(); } };
  await handler(req, res);
  return result;
}

test('Vercel adapter accepts parsed form data and protects the actual HTML and image files', async () => {
  const oldPassword = process.env.PREVIEW_PASSWORD;
  const oldSecret = process.env.PREVIEW_SESSION_SECRET;
  process.env.PREVIEW_PASSWORD = 'adapter-test-password';
  process.env.PREVIEW_SESSION_SECRET = 'adapter-test-secret-with-more-than-thirty-two-characters';
  try {
    const locked = await invoke('/api/preview?__path=home-v2.html');
    assert.equal(locked.status, 401);
    assert.doesNotMatch(locked.body, /black-hero/);
    const login = await invoke('/api/preview?__path=__preview/login', 'POST', { origin: 'https://preview.example', 'content-type': 'application/x-www-form-urlencoded' }, { password: 'adapter-test-password', next: '/home-v2.html' });
    assert.equal(login.status, 303);
    const cookie = login.headers['set-cookie'].split(';')[0];
    const page = await invoke('/api/preview?__path=home-v2.html', 'GET', { cookie });
    assert.equal(page.status, 200);assert.match(page.body, /black-hero/);assert.match(page.headers['x-robots-tag'], /noindex/);
    const image = await invoke('/api/preview?__path=assets/parkezi-logo.svg', 'GET', { cookie });
    assert.equal(image.status, 200);assert.equal(image.headers['content-type'], 'image/svg+xml');
    assert.equal((await invoke('/api/preview?__path=package.json', 'GET', { cookie })).status, 404);
  } finally {
    if (oldPassword === undefined) delete process.env.PREVIEW_PASSWORD; else process.env.PREVIEW_PASSWORD = oldPassword;
    if (oldSecret === undefined) delete process.env.PREVIEW_SESSION_SECRET; else process.env.PREVIEW_SESSION_SECRET = oldSecret;
  }
});

test('the deployed adapter needs no environment setup and blocks unauthenticated Googlebot requests', async () => {
  const oldPassword = process.env.PREVIEW_PASSWORD;
  const oldSecret = process.env.PREVIEW_SESSION_SECRET;
  delete process.env.PREVIEW_PASSWORD;
  delete process.env.PREVIEW_SESSION_SECRET;
  try {
    const page = await invoke('/api/preview?__path=');
    assert.equal(page.status, 401);
    assert.match(page.body, /Private preview/);
    assert.doesNotMatch(page.body, /awaiting secure configuration/);
    const bot = await invoke('/api/preview?__path=home-v2.html', 'GET', { 'user-agent': 'Googlebot' });
    assert.equal(bot.status, 401);
    assert.match(bot.headers['x-robots-tag'], /noindex/);
    const robots = await invoke('/api/preview?__path=robots.txt');
    assert.equal(robots.status, 200);assert.match(robots.body, /User-agent: \*\nDisallow: \//);
  } finally {
    if (oldPassword === undefined) delete process.env.PREVIEW_PASSWORD; else process.env.PREVIEW_PASSWORD = oldPassword;
    if (oldSecret === undefined) delete process.env.PREVIEW_SESSION_SECRET; else process.env.PREVIEW_SESSION_SECRET = oldSecret;
  }
});
