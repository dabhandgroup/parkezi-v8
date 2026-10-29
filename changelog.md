# Parkezi redesign — changelog

Entries are newest first. V-number labels identify design iterations, not hosting or file-storage version numbers. Earlier history was reconstructed from this project's files and the design discussion; consolidated entries do not imply exact release dates.

## 29 October 2026 — Remove internal wording from client layouts

- The owner confirmed the layouts have been sent to the client and asked for no AI/internal design notes apart from Google review placeholders.
- Removed the floating Design previews controls from all five pages and removed their JavaScript handlers. Replaced preview page titles/descriptions with normal page metadata.
- Removed software-interface demonstration notes and captions, cleaned accessibility labels, and removed internal preview explanations from dynamic form/newsletter/review messages and the developer guide.
- Kept the clearly labelled Google review placeholders and the owner's approved personal Hey Blake scope popup. Unconnected forms use honest phone/email fallbacks and do not claim successful delivery.
- Build, JavaScript syntax, visible-copy, local-asset and unique-ID checks pass. Commit `46bca9b4f16a7aa37fc0bff4297f5a43de56d124` deployed successfully on Vercel. All five live pages and their accessibility text passed the copy scan; served JavaScript contained the cleaned dynamic messages. Internal project-note URLs return 404 and noindex remains in place.

## 29 October 2026 — Dark navigation, logos and remembered access

- Fixed Home V2 logo rendering by preserving the original marks and blending away their light backgrounds. Added the utility-bar divider and refined the header boundary.
- Applied dark dropdown cards and a dark full-screen mobile menu to Home V2, including hover states, borders and text colours. The other pages retain their existing white navigation.
- Synchronised header measurements before menus open and after font loading; rounded size updates and slightly increased hover-close tolerance.
- Replaced the Express Pay mobile-payment graphic with a decorative QR-style scan card using the official Lucide QR icon. Included the upstream licence; no real payment QR is encoded.
- Stopped changing the default preview signing key on every build. One 90-day browser cookie now covers all pages and survives normal deployments. Updated setup documentation to explain the casual default and optional private-key override.
- All 13 authentication/adapter tests pass, including session reuse after a rebuild and fresh server instance. JavaScript syntax, all local asset references, unique IDs and QR SVG checks pass.
- Commit `e53e82de54590352e8b4c4ca1f55fca6bbf7f848` deployed successfully on Vercel. A live HTTP cookie jar reused one 90-day login across both homepages and Express Pay. Verified the new dark menu/logo styles, header synchronisation and QR asset with noindex retained.
- Automatic approval review rejected cloud-browser inspection because of the owner's earlier no-cloud-browser instruction. Verification continues through source and live HTTP checks; the rejected action was not retried.

## 29 October 2026 — Dropdown card contrast and headings

- Follow-up to the owner's Systems-menu screenshot: tightened desktop panel padding, heading/card/list gaps and photograph height, without reducing text sizes or changing the mobile layout.
- Gave About Us, Installation, Case Studies, Blog and FAQs white card backgrounds with subtle borders against the grey dropdown panel.
- Restored Products and added Systems headings, matching About Parkezi and Integrations. Removed the hardware-installation line beneath the product cards.
- Preserved product image lift, text rollovers and arrow animations. Allowed extra desktop clearance for the images and avoided duplicate headings inside the mobile accordions.
- Applied the navigation changes to all five pages, including Express Pay and the developer style guide. The build passes; checked heading presence, removal of the installation strip and unique IDs across all pages.
- Commit `095de300648bc61fbff69fccc71039148c3d6902` deployed successfully on Vercel. Live homepage, black-hero and Express Pay HTML and shared CSS checks passed with noindex retained. No new browser visual check was performed during this pass.
- Prepared the requested client email with homepage, black-hero option and Express Pay preview links. No email has been sent.

## 29 October 2026 — Forgiving preview password entry

- Checked the supplied wrong-password screenshot and re-tested the live endpoint. The exact agreed password worked; case and spacing variations were rejected. The screenshot does not establish the entered value.
- Made this casual preview password case-insensitive and ignored spaces and invisible paste whitespace. Updated the stored default hash accordingly. No Vercel variables are required or need restoring.
- Added an accessible Show/Hide password button and nonce-authorised script. Kept the password form and Google crawler blocking.
- Build and all 12 local tests pass. Verified real default-password variants and actual homepage delivery through the adapter with no environment variables; checked script syntax and CSP nonce. Local Chromium download was unavailable.
- Fix commit `29a3d96df85690de41588d88d424dd2cb064fed3` deployed successfully on Vercel. Four live password variants passed through login and loaded the homepage. Verified the Show/Hide control and its CSP nonce in the served HTML. Googlebot remained blocked, robots.txt disallowed crawling, noindex remained active and a wrong password was rejected.

## 29 October 2026 — Browser password submission repair

- Reproduced the live `Request not allowed` response when the login POST has a null origin. The form's own no-referrer policy caused that browser behaviour.
- Changed the gate's referrer policy to same-origin. Previously opened forms may still submit when browser Fetch Metadata confirms a same-origin request; genuine cross-origin submissions remain blocked.
- Ensured the agreed shared password remains accepted alongside an older optional environment password. The live endpoint also rejected the agreed password with a valid explicit origin before this change; the remote environment value was not inspected.
- Updated setup guidance and added two regression tests. The build and all 11 local tests pass.
- Fix commit `548f5bf2cbc3da715bfd677456ca0381bc38b67c` deployed successfully on Vercel. Live HTTP checks passed for normal and null-origin password submissions, redirect/session creation, both homepages, Express Pay and a protected SVG. Googlebot remained unauthenticated with a 401, robots.txt disallowed crawling and noindex headers remained in place. Wrong passwords and cross-origin submissions were rejected.

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
