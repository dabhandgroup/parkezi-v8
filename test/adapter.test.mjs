import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import handler from '../api/preview.mjs';

async function invoke(url, method = 'GET', headers = {}, body, implementation = handler) {
  const result = {};
  const req = { url, method, headers: { host: 'preview.example', ...headers }, body };
  const res = { writeHead(status, values) { result.status = status; result.headers = values; }, end(value) { result.body = Buffer.from(value || '').toString(); } };
  await implementation(req, res);
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

test('one browser session opens every page and survives a fresh build and server instance', async () => {
  const oldPassword = process.env.PREVIEW_PASSWORD;
  const oldSecret = process.env.PREVIEW_SESSION_SECRET;
  process.env.PREVIEW_PASSWORD = 'persistent-preview-fixture';
  delete process.env.PREVIEW_SESSION_SECRET;
  try {
    const login = await invoke('/__preview/login', 'POST', { origin: 'https://preview.example', 'content-type': 'application/x-www-form-urlencoded' }, { password: 'persistent-preview-fixture', next: '/' });
    assert.equal(login.status, 303);
    assert.match(login.headers['set-cookie'], /Path=\//);
    assert.match(login.headers['set-cookie'], /Max-Age=7776000/);
    const cookie = login.headers['set-cookie'].split(';')[0];
    const before = JSON.parse(await readFile('private/preview-config.json', 'utf8'));
    execFileSync(process.execPath, ['scripts/build.mjs'], { stdio: 'pipe' });
    const after = JSON.parse(await readFile('private/preview-config.json', 'utf8'));
    assert.equal(after.sessionSecret, before.sessionSecret);
    const { default: nextDeployment } = await import('../api/preview.mjs?fresh-deployment');
    for (const path of ['/', '/home-v2.html', '/express-pay.html', '/style-guide/']) {
      const page = await invoke(path, 'GET', { cookie }, undefined, nextDeployment);
      assert.equal(page.status, 200, path);
      assert.doesNotMatch(page.body, /id="preview-password"/);
      assert.match(page.headers['x-robots-tag'], /noindex/);
    }
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
