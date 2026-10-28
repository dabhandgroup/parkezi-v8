# Parkezi Vercel preview

Project name requested: `parkezi-v8`. Visual design baseline: V12, including both white and black hero homepages and Express Pay. The Vercel project name does not change the design revision number.

## Import settings

- Repository root: this folder, not `dist/`.
- Framework preset: Other.
- Build command: `npm run build`.
- Output directory: `public`.
- Node.js: 24.x.
- The committed `vercel.json` sets these build options and routes every request through `api/preview.mjs`.

Set these encrypted environment variables for both Production and Preview before deploying:

| Variable | Value |
| --- | --- |
| `PREVIEW_PASSWORD` | The shared preview password supplied by the project owner. |
| `PREVIEW_SESSION_SECRET` | A random secret of at least 32 characters. Generate with `openssl rand -hex 32` or a password manager. |

Never put actual values into source control. `.env.example` contains names only. Redeploy after changing environment variables. Rotating either variable invalidates existing preview sessions.

## How the gate works

The build copies the original HTML and all assets into `private/site/`, which is included inside the server function. Only `robots.txt` is placed in the public output. The server checks the password/session before reading a site file; this covers homepage variants, Express Pay, style guide, images, fonts, scripts and styles.

A successful login creates a signed, seven-day, HttpOnly, Secure, SameSite=Lax cookie. Wrong passwords and missing configuration keep the preview locked. Responses use private/no-store caching and `X-Robots-Tag` directives. The HTML retains its noindex metadata and `robots.txt` disallows crawling.

This implementation does not require Vercel's paid Password Protection add-on. It is specific to this Vercel package. Opening the original `dist/*.html` files locally or publishing them directly as static output does not apply this server gate.

## Paths

- `/` — white hero homepage.
- `/home-v2.html` — matching black hero homepage.
- `/express-pay.html` — product page.
- `/style-guide/` — developer style guide.

## GitHub handoff

Repository: `https://github.com/dabhandgroup/parkezi-v8`, created by the project owner. The repository is currently public. Password and signing-secret values belong only in Vercel encrypted environment variables. Import the full repository root into Vercel.

## Verification

Run `npm run build` and `npm test`. After the Vercel deployment, verify the password screen in a fresh browser session, then submit the password and visit both homepage variants and Express Pay. Confirm an unauthenticated direct image request is also rejected. The server tests cover the gate, sessions, actual asset delivery and the Vercel request adapter. Live deployment verification remains required until recorded in `status.md`.

Lead forms, newsletter and Google review placeholders retain the V12 preview limitations described in `status.md`.

## Official references

- https://vercel.com/docs/functions/runtimes/node-js
- https://vercel.com/docs/project-configuration/vercel-json
- https://vercel.com/docs/rest-api/deployments/create-a-new-deployment
