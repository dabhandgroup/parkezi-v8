# Parkezi — Vercel preview

Complete V12 website design, packaged for the Vercel project **parkezi-v8**.

## Deploy

1. Import this GitHub repository into Vercel as **parkezi-v8**.
2. Keep the repository root as the Root Directory. Framework: **Other**. The committed `vercel.json` sets the build command and output directory.
3. Add encrypted environment variables for **Production and Preview**:
   - `PREVIEW_PASSWORD`: the shared password supplied by the project owner.
   - `PREVIEW_SESSION_SECRET`: a random string of at least 32 characters (generate with `openssl rand -hex 32`).
4. Deploy, then check the password screen and both homepage variants.

The preview stays locked if either environment variable is missing. Never put actual secret values in this public repository. Read [VERCEL-DEPLOYMENT.md](VERCEL-DEPLOYMENT.md) for the full setup.

## Pages

| URL | Page |
| --- | --- |
| `/` | White-hero homepage |
| `/home-v2.html` | Matching black-hero homepage |
| `/express-pay.html` | Express Pay product page |
| `/style-guide/` | Developer style guide |

## Edit and check

The original HTML, CSS, JavaScript and local assets are in `dist/`. Run:

```sh
npm ci
npm test
npm run build
```

The build copies site files into the private server bundle. Public output contains only `robots.txt`. All pages and assets are served through the password/session check; HTML metadata, server headers and robots.txt disable indexing. Do not change the Vercel output directory to `dist/`, which would bypass this serving model.

## Project records

Read and update [status.md](status.md) and [changelog.md](changelog.md) after every work session. Include them in every handoff ZIP. Original source content is in `content/`; artwork notes and vendor licenses are included.

## Preview limitations

The enquiry form and newsletter are local interaction previews pending real endpoints. Attachments remain local. Google review cards are labelled samples pending verified review text. The original Crisp workspace is embedded. Only the homepage and Express Pay are redesigned; other product/system links show the scope message and booking link.

The original `parkezi.com.au` website is unaffected. Vercel project naming does not alter the V12 design revision.
