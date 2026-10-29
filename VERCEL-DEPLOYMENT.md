# Parkezi Vercel preview

Project name requested: `parkezi-v8`. Visual design baseline: V12, including both white and black hero homepages and Express Pay. The Vercel project name does not change the design revision number.

## Import settings

- Repository root: this folder, not `dist/`.
- Framework preset: Other.
- Build command: `npm run build`.
- Output directory: `public`.
- Node.js: 24.x.
- The committed `vercel.json` sets these build options and routes every request through `api/preview.mjs`.

No environment variables are required. Deploy the repository root and use the agreed shared preview password. Its server-side hash is included in `server/preview-defaults.mjs`; the plaintext password is not stored in the repository or sent to the browser.

This casual preview gate normalises capitals and whitespace before checking the password. The stored hash corresponds to that normalised value. Existing environment settings may be removed without replacing them. The form has a Show/Hide password control; its script is permitted by a fresh CSP nonce on each response.

The build generates a random session-signing key in `private/preview-config.json`, included only in the server bundle. Each rebuild rotates that key and requires visitors to unlock the preview again.

Optional settings, for an advanced setup:

| Variable | Purpose |
| --- | --- |
| `PREVIEW_PASSWORD` | Add an alternative password. The agreed password remains accepted. |
| `PREVIEW_SESSION_SECRET` | Use a stable custom signing key of at least 32 characters. |

Keep custom values in encrypted Vercel environment variables. `.env.example` contains names only.

## How the gate works

The build copies the original HTML and all assets into `private/site/`, which is included inside the server function. Only `robots.txt` is placed in the public output. The server checks the password/session before reading a site file; this covers homepage variants, Express Pay, style guide, images, fonts, scripts and styles.

A successful login creates a signed, seven-day, HttpOnly, Secure, SameSite=Lax cookie. Wrong passwords keep the preview locked. Automatic build configuration removes the manual setup requirement. Responses use private/no-store caching and `X-Robots-Tag` directives. The HTML retains its noindex metadata and `robots.txt` disallows crawling.

The gate uses `Referrer-Policy: same-origin` so ordinary browser form submissions retain their origin. Previously opened forms with a null origin are accepted only when the browser's Fetch Metadata identifies a same-origin submission. Cross-origin login submissions remain rejected.

This implementation does not require Vercel's paid Password Protection add-on. It is specific to this Vercel package. Opening the original `dist/*.html` files locally or publishing them directly as static output does not apply this server gate.

## Paths

- `/` — white hero homepage.
- `/home-v2.html` — matching black hero homepage.
- `/express-pay.html` — product page.
- `/style-guide/` — developer style guide.

## GitHub handoff

Repository: `https://github.com/dabhandgroup/parkezi-v8`, created by the project owner. The repository is currently public. The default password is stored as a hash; its generated signing key stays in the private server bundle. Custom override values belong only in encrypted Vercel environment variables. Import the full repository root into Vercel.

## Verification

Run `npm run build` and `npm test`. After the Vercel deployment, verify the password screen in a fresh browser session, then submit the password and visit both homepage variants and Express Pay. Confirm an unauthenticated direct image request is also rejected. The server tests cover the gate, sessions, actual asset delivery and the Vercel request adapter. Live deployment verification remains required until recorded in `status.md`.

Lead forms, newsletter and Google review placeholders retain the V12 preview limitations described in `status.md`.

## Official references

- https://vercel.com/docs/functions/runtimes/node-js
- https://vercel.com/docs/project-configuration/vercel-json
- https://vercel.com/docs/rest-api/deployments/create-a-new-deployment
