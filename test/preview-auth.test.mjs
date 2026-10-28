import test from 'node:test';
import assert from 'node:assert/strict';
import { COOKIE_NAME, SESSION_SECONDS, createSession, handlePreview, safeReturnTo, validSession } from '../server/preview-auth.mjs';

const password = 'fixture-password';
const secret = 'fixture-secret-with-at-least-thirty-two-characters';
let reads = [];
const options = { password, secret, loadAsset: async pathname => { reads.push(pathname); return { body: '<h1>Protected site</h1>', contentType: 'text/html; charset=utf-8' }; } };
const origin = 'https://parkezi-v8.example';
function req(route, init = {}) { return new Request(origin + route, init); }
function login(candidate = password, next = '/') {
  return req('/api/preview?__path=__preview/login', { method: 'POST', headers: { origin, 'content-type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ password: candidate, next }) });
}

test('every page and asset is blocked before the password; no content is read', async () => {
  reads = [];
  for (const route of ['/', '/home-v2.html', '/express-pay.html', '/assets/parkezi-logo.svg', '/api/preview?__path=assets/solar-cabinet-repair-v12.png']) {
    const response = await handlePreview(req(route), options);
    assert.equal(response.status, 401);
    assert.match(await response.text(), /Private preview/);
    assert.match(response.headers.get('x-robots-tag'), /noindex/);
    assert.match(response.headers.get('cache-control'), /no-store/);
  }
  assert.deepEqual(reads, []);
});

test('valid login issues a secure signed cookie and returns to the selected page', async () => {
  const response = await handlePreview(login(password, '/home-v2.html'), options);
  assert.equal(response.status, 303);
  assert.equal(response.headers.get('location'), '/home-v2.html');
  const cookie = response.headers.get('set-cookie');
  assert.match(cookie, new RegExp('^' + COOKIE_NAME + '='));
  assert.match(cookie, /HttpOnly/);assert.match(cookie, /Secure/);assert.match(cookie, /SameSite=Lax/);assert.match(cookie, /Path=\//);
  const accepted = await handlePreview(req('/api/preview?__path=home-v2.html', { headers: { cookie: cookie.split(';')[0] } }), options);
  assert.equal(accepted.status, 200);
  assert.match(await accepted.text(), /Protected site/);
  assert.equal(reads.at(-1), '/home-v2.html');
});

test('incorrect password, tampered, expired and rotated sessions do not grant access', async () => {
  assert.equal((await handlePreview(login('wrong'), options)).status, 401);
  const now = Date.now();
  const valid = createSession(password, secret, now);
  assert.equal(validSession(valid, password, secret, now), true);
  assert.equal(validSession(valid + 'x', password, secret, now), false);
  assert.equal(validSession(valid, password, secret, now + (SESSION_SECONDS + 1) * 1000), false);
  assert.equal(validSession(valid, 'new-password', secret, now), false);
  assert.equal(validSession(valid, password, 'different-secret', now), false);
});

test('missing password or signing secret fails closed', async () => {
  assert.equal((await handlePreview(req('/'), { ...options, password: undefined })).status, 503);
  assert.equal((await handlePreview(req('/'), { ...options, secret: undefined })).status, 503);
  assert.equal((await handlePreview(req('/'), { ...options, secret: 'short' })).status, 503);
});

test('cross-origin login is rejected and redirect destinations stay on the same site', async () => {
  const request = req('/__preview/login', { method: 'POST', headers: { origin: 'https://other.example', 'content-type': 'application/x-www-form-urlencoded' }, body: 'password=test' });
  assert.equal((await handlePreview(request, options)).status, 403);
  for (const value of ['https://other.example', '//other.example', '/\\other.example', '/\r\nInjected: yes', '/__preview/login']) assert.equal(safeReturnTo(value), '/');
  assert.equal((await handlePreview(login(password, 'https://other.example'), options)).headers.get('location'), '/');
});

test('robots are disallowed, source traversal is rejected, and HEAD has no body', async () => {
  const robots = await handlePreview(req('/robots.txt'), options);
  assert.match(await robots.text(), /Disallow: \//);
  const cookie = COOKIE_NAME + '=' + createSession(password, secret);
  const blocked = await handlePreview(req('/api/preview?__path=..%2F..%2F.env', { headers: { cookie } }), options);
  assert.equal(blocked.status, 404);
  const head = await handlePreview(req('/index.html', { method: 'HEAD', headers: { cookie } }), options);
  assert.equal(head.status, 200);assert.equal(await head.text(), '');
});
