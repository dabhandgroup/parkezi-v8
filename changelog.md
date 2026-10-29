# Parkezi redesign — changelog

Entries are newest first. V-number labels identify design iterations, not hosting or file-storage version numbers. Earlier history was reconstructed from this project's files and the design discussion; consolidated entries do not imply exact release dates.

## 29 October 2026 — Browser password submission repair

- Reproduced the live `Request not allowed` response when the login POST has a null origin. The form's own no-referrer policy caused that browser behaviour.
- Changed the gate's referrer policy to same-origin. Previously opened forms may still submit when browser Fetch Metadata confirms a same-origin request; genuine cross-origin submissions remain blocked.
- Ensured the agreed shared password remains accepted alongside an older optional environment password. The live endpoint also rejected the agreed password with a valid explicit origin before this change; the remote environment value was not inspected.
- Updated setup guidance and added two regression tests. The build and all 11 local tests pass. Live verification of this repair is pending deployment.

## 28 October 2026 — Simple password gate without setup

- Confirmed that the live Vercel preview returned a configuration-required 503 due to missing environment variables.
- Added the agreed default password as a server-side hash and automatic per-build private session signing. No Vercel variables are required; custom variables remain optional overrides.
- Kept unauthenticated pages/assets behind the password form, 401 responses for Googlebot, robots.txt crawl blocking, noindex response headers and page metadata.
- Updated setup instructions and project status. All nine authentication/adapter tests pass, including the no-setup flow. The real agreed-password login passed locally without environment variables.
- Pushed fix commit `051864418d72366e8499e81af422719c012bcdf3`; Vercel reported a successful deployment. Verified all 12 changed files on GitHub. External live HTTP verification was blocked by the workspace network.

## 28 October 2026 — GitHub handoff

- Prepared the complete Vercel project for the owner-created `dabhandgroup/parkezi-v8` repository.
- Included both homepage versions, Express Pay, assets, protected server, build configuration, environment template, source notes, status and changelog.
- Retained the existing V12 design and server-side password behaviour. Actual password/signing-secret values are excluded from the public repository.
- Re-ran the build and all seven authentication/adapter tests successfully.
- Uploaded all 162 files to `main` and verified each remote file SHA against the prepared source. No files were deleted. Upload commit: `d7e2785581f976982b9feba1d1d481642252e6c3`.
- Vercel import and live deployment verification remain for the owner to complete.

## 28 October 2026 — Vercel package preparation

- Prepared a separate Vercel application named `parkezi-v8` around the existing V12 website.
- Added a server-side shared-password form, signed secure session cookie, fail-closed configuration checks, private asset serving and noindex/no-store responses.
- Added Vercel routing/build configuration, environment variable template, deployment instructions and tests covering authentication and actual site/image delivery.
- The original Sites preview remains available. Vercel publication is pending approval of the Vercel connection's access to the intended team. GitHub repository creation is pending; no repository or Vercel URL is claimed as created.

## 28 October 2026 — V12 documentation update

- Added `status.md` covering current scope, implemented features, remaining launch work, verification and handoff files.
- Added this changelog to retain the project's revision history.
- Added a maintenance rule requiring both records to be updated during future work and included in handoff ZIPs.
- Cross-checked the current records against project files and the V12 implementation. No website presentation or interaction changes were made in this update.

## 28 October 2026 — V12

- Rebuilt the small cabinet area behind the SolarGate boom mount using a generated repair asset. The original black mount and boom now rotate together about the axle while the cabinet stays fixed.
- Removed “The Parkezi range” and “Explore all products” from the Products dropdown and enlarged the product imagery.
- Restored product image lift above stationary cards, with rolling product text and consistent action arrows. Contact buttons use arrows instead of mixed arrow/chevron treatments.
- Corrected the Smart Access footer logo's dark background using the original asset and a CSS blend treatment.
- Checked the open barrier, focused product-image lift and partner logos in-browser. Checked local assets/links, duplicate IDs and changed JavaScript syntax.
- Updated both main homepage variants and the HTML package.

Visual source commit: `0c6d866f3f411db2871009b25ca51e3129f04103`.

## 28 October 2026 — V11

- Created a matching black-hero homepage with white navigation/logo/CTAs and a dark opening through the client slider, followed by the white page sections.
- Replaced unbuilt product/system popup copy with the personal scope message to Blake and a new-tab “Book a call” link to `https://dabhandmarketing.com/book-a-call`.
- Added the original Parkezi favicon and touch icon; enlarged the navigation logo.
- Replaced the header's single shrink threshold with separate 140px shrink and 20px expand thresholds to prevent jitter around a small scroll position.
- Inspected both hero variants and mobile menu behaviour, checked popup copy/link and verified no overflow at narrow mobile widths.
- Published V10's retained refinements together with V11 after the earlier workspace interruption.

## 28 October 2026 — V10

- Reduced newsletter prominence and added an email icon inside the field.
- Moved partner logos into their own footer column and removed the crowded partner/newsletter strip.
- Replaced form and About-menu icons with official Lucide assets and bundled the license; enlarged About icons.
- Removed the Systems dropdown's introductory heading tier, increased dropdown photo heights and eagerly loaded hidden-menu images.
- Used white product cards and aligned desktop product bases; enlarged mobile units and moved SolarGate down and left.
- Desktop and mobile layouts were inspected locally. A workspace disconnect blocked V10 publication; these changes were subsequently included in V11.

## 28 October 2026 — V9

- Corrected the cabinet clipping gap, removed the visible “Open barrier” control and retained hover/focus movement.
- Set the SolarGate heading to two desktop lines and matched the installation/support image proportions.
- Shortened the software introduction and synchronized laptop tabs with the floating phone.
- Added a divider and tightened spacing before Our work; converted projects to a Swiper gallery with logos and added Mercure.
- Added clearly marked sample Google review cards pending real review content.
- Refined mega-menu cards, use-case icons and integration photos; tightened hero CTAs and client-logo spacing.
- Simplified the footer, reduced the Google badge, restored a simpler phone treatment and removed its style-guide link.
- Corrected mobile hamburger/X alignment, displayed the real phone number and tidied the product composition.

## Earlier iterations — consolidated history through V8

- Established the professional, restrained homepage direction with individual product imagery, soft shadows, client logos, phone-first CTAs and responsive navigation.
- Added Express Pay as the first product page, including a swipe/drag gallery, arrival-to-exit interaction, payment methods, benefits, source content and FAQs.
- Retained original homepage FAQ and feature-comparison content, restored tooltips and condensed the homepage FAQ section.
- Added installation imagery, Mercure photographs/logo, project content and the interactive desktop/mobile software presentation.
- Developed the full white enquiry form on a gradient section, including required contact fields and optional local image/PDF attachments.
- Added a searchable SVG-flag country picker defaulting to Australia +61, official source contact details, trust marks and original partner logos.
- Added the original Crisp embed and an extensive developer style guide.
- Removed decorative eyebrow labels and unsupported review copy. Review placeholders were removed in V8, then restored as explicitly labelled samples in V9 at the user's request.

## Recording future changes

Use a dated entry for every completed work session. Note the affected pages/features, the reason for the change, verification performed and any incomplete follow-up. Keep this history consistent with `status.md` and the packaged deliverable; do not mark planned work as shipped.
