# Current-site redesign coverage

Harry requested the full live PARKEZI site on 1 November 2026, alongside specific product, photography, review and spacing refinements. Event: `parkezi:2026-11-01:full-site-redesign-and-refinements:v1`. DAB-47 and draft PR #1 remain the same outcome.

The verified source is `https://www.parkezi.com.au`, matching Harry's screenshot. The spoken spelling was not used as a different domain.

## Capture

All 52 discovered HTML routes were captured. The live sitemap listed 45, all included. The union of captured internal links introduced no additional HTML routes. Eleven captures used Firecrawl; after its credit limit, the remaining 41 used direct public HTTP. No authenticated pages, forms or customer portal were scraped. Source records, URLs, titles and capture metadata are in `content/source-site/`. Captured copy and source hashes are mapped in `content/site-pages.json`.

## Implementation

`content/route-coverage.json` lists every source URL, preview route and generated file. `scripts/build-pages.mjs` uses the approved existing HTML components and curated content in `content/site-pages.json`. The normal build regenerates the routes before preparing the gated server output. No framework or new dependency was introduced.

The preview contains 52 corresponding source routes and six retained design/product/style-guide routes, 58 HTML files total. It covers:

- Homepage, systems, pricing, installation, About, FAQs, contact and reviews.
- Existing Express Pay and Step & Pay pages with source-path aliases.
- Scan & Go, Scan & Go Mini, SolarGate+ and the legacy Info Board enquiry route.
- Five services and four integrations.
- Project index and eight project stories.
- Blog index and 17 complete source articles.
- Privacy policy and an informational updates route replacing the misleading newsletter-success state.

The five-family product catalogue is preserved. The 34-inch display remains a Step & Pay configuration. Info Board is a thin legacy source page retained as an information-display enquiry, not the 34-inch product. No standalone 34-inch card or route was added.

## Source decisions

`content/source-caveats.json` records placeholders and errors deliberately not carried over: empty maintenance copy, Selea's incorrect pricing content, unsupported Info Board specifications, generic named testimonials and false newsletter delivery confirmation. Shared conflicting numeric boilerplate was not turned into new proof panels. Source articles retain their useful copy with shorter section headings and current internal links. The FAQ's old Step and Go typo is corrected to Step & Pay; an unverified uptime claim and speculative future service region are omitted. Backup options require site confirmation.

Genuine supplied professional photography is used as exhibition/team/equipment context. It is not labelled as a client installation. Case stories without suitable installation photography use their actual client brand. The blurry Range Rover image is removed from the Express gallery and its other active placements. Original assets are retained.

The Google reviews remain explicitly labelled sample cards, with four visible at the large-screen carousel breakpoint and a real Google profile link. Authentic review/rating approval remains outstanding. Enquiry/newsletter delivery and attachments remain unconnected; the preview does not claim to send them.

## Evidence limits

Build, static route/reference checks and adapter/authentication tests are owner self-checks. They do not prove rendered layout, loaded-font wrapping at 320px/390px, hover/swipe behaviour, keyboard journeys or live form delivery. These remain unverified.

The existing two-pass independent review ledger is preserved and exhausted. Pass 2 checked an older `20e70d4` revision and was blocked by Vercel SSO. Full-site and later product edits make affected earlier evidence stale. No third/replacement review, protection bypass or Playwright was used. The PR remains draft and unmerged; main and production are unchanged.

## 3 November2026 - before/after content check

Harry requested a complete content comparison after product-page improvements. The owner audit is in `.team/audits/content-2026-11-03/REPORT.md`, with searchable `before-after.html` and exact source/target hashes in `before-after.json`. All52 captured routes are included.854 curated body p/li units are checked; the preserved rich-body categories have no unmatched paragraph units. This is not proof of every semantic equivalence or a live visual audit: before text is the original captured Markdown and after text is generated target HTML. Deliberate wording/design changes and source defects are disclosed.

The audit restored product feature tables, source FAQs, the approved SolarGate/support/dashboard sequence, pricing installation partner/site-work/training details, temporary integrated payments and system occupancy/barrier/induction-loop/direct-revenue facts. Unsupported accuracy/uptime, unverified testimonials, wrong Selea pricing/Info Board product copy and false form-success text remain deliberate exceptions. The new Step selector's exact screen dimensions are pending, so current labels are neutral. All editable host-page controls have a16px minimum CSS safeguard; actual computed/focus/autofill checks and third-party iframe fields remain browser-unverified.

## Final 3 November model/photo correction

Event `parkezi:2026-11-03:custom-selector-generated-unit:v1` supersedes the earlier reuse-only image approach above. Harry explicitly requested a ChatGPT-generated transparent cutout, a custom dropdown and grouped homepage movement.

The Standard/Larger screen selector now uses an animated custom listbox with thumbnails, keyboard navigation, selection, Escape/outside dismissal and gallery synchronisation. No native model select popup remains. Screen dimensions are still unconfirmed.

Built-in ChatGPT image_gen created `artwork/step-pay-wide-generated.png` from the original standard and supplied larger-screen references. A targeted second image edit corrected the vertical PARKEZI wordmark. The selected 1024x1536 RGBA PNG has real transparent pixels; the website uses a lossless WebP derivative. Full prompts, reference paths and SHA256 evidence are in `content/generated-step-pay.json`. It is an expressly requested product illustration, not a real installation photo or confirmed hardware specification. All supplied/original source assets remain preserved.

Both Step & Pay models are grouped in the homepage hero and the single Step & Pay catalogue card. Hover/focus moves their wrapper together; reduced-motion preferences remove this movement. They remain one product family, with the standard model first in the product gallery.

Two genuine Quest Apartments hardware photographs from the original site now appear on all six product routes with accurate installation captions. They show general PARKEZI payment/access hardware, without claiming to depict the illustrated larger model. Source/derivative hashes are in `content/additional-product-photos.json`.

Owner build/source/fixture checks are separate from actual rendered verification. Supported Chrome access failed, device controls are unavailable and the cloud browser prompt could not start because credits were insufficient. Current dropdown/hover/mobile/font-loaded checks are BLOCKED. Independent review remains at two consumed passes; no replacement was launched.
