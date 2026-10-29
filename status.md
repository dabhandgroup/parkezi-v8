# Parkezi redesign — project status

Last updated: 29 October 2026 (Europe/London).

## Current position

### Dark homepage polish and remembered preview access

Corrected the Home V2 client-logo strip by removing the flattening brightness filter and blending the original marks into the dark hero. Added a fine divider under the utility bar and strengthened the existing navigation/hero separator. Desktop dropdowns and the full-screen mobile menu now use dark panels, cards, borders and readable text on Home V2; the white homepage and product-page navigation retain their white theme.

The header position is synchronised before a dropdown opens and after fonts load, with rounded measurements to avoid repeated fractional updates. Increased the pointer-leave grace period slightly. Replaced the Express Pay mobile-payment illustration with a QR-style scan graphic using the official Lucide QR icon, with its licence included. It is decorative and does not encode a payment destination.

Repeated password prompts were caused by a new signing key on every deployment. The casual preview gate now uses a stable default key and a 90-day cookie shared by all pages and tabs on the same browser/domain. No environment variables are required. The fallback key is derivable from the public preview configuration, consistent with the owner's requested casual access gate; a private environment key remains optional. Googlebot rejection, robots blocking and noindex remain enabled.

Verification: all 13 tests pass, including one login reused across all four page routes after rebuilding and loading a fresh server module. Changed JavaScript passes syntax checks; all local assets and unique IDs are valid. New QR artwork parses as SVG. Commit `e53e82de54590352e8b4c4ca1f55fca6bbf7f848` deployed successfully on Vercel. A live HTTP cookie jar saved the 90-day cookie at Path=/ and reused it for the homepage, Home V2 and Express Pay without another password submission. Live dark-menu/logo CSS, header synchronisation and the QR SVG were verified, with noindex retained. Cloud-browser inspection was rejected by automatic approval review because of the owner's earlier instruction against using that browser; no attempt was made to bypass the rejection.

### Navigation menu refinements

Added white backgrounds and subtle borders to all five About cards, retaining white on hover and keyboard focus. Restored a simple Products heading and added Systems to match the existing About Parkezi and Integrations headings. Removed the hardware-installation strip beneath the product cards. Product image lift and text rollover animations remain in place, with extra desktop clearance beneath the restored heading. Mobile accordion labels remain the menu headings, without duplicate headings inside them.

Following the owner's screenshot, tightened the desktop Systems panel: reduced outer padding, heading gap, card padding and list spacing; photos are 200px high instead of 215px. Text sizes are unchanged. This reduces the panel's vertical footprint while preserving three aligned cards and substantial imagery. Mobile styles are unchanged.

Applied the shared navigation changes to the white homepage, both black-hero variations, Express Pay and the developer style guide. The build passes; all five pages contain the expected four headings, omit the installation strip and have unique IDs. Commit `095de300648bc61fbff69fccc71039148c3d6902` deployed successfully on Vercel. Authenticated live checks returned 200 for the white homepage, matching black hero and Express Pay, verified all four menu headings and removal of the installation strip, and confirmed the updated white-card and hover-clearance CSS. No new browser visual check was performed during this pass. Prepared the requested client email with homepage, black-hero option and Express Pay preview links; this is a draft only and has not been sent.

### Forgiving password entry

The owner removed the Vercel variables and supplied a screenshot showing a wrong-password message. A fresh live HTTP check accepted the exact agreed password but rejected lowercase and no-space variants. The screenshot does not reveal what was entered, so the specific typed value is unknown.

Password checking now ignores case, spaces and invisible whitespace from pasting. Updated the default hash to match that normalised value and added an accessible Show/Hide password control. No variables need to be restored. Crawler blocking, noindex and private asset serving remain in place.

Verification: the build and all 12 local tests pass. Direct adapter checks with both variables absent accepted the agreed, lowercase/no-space and differently spaced variants and served the actual homepage. The password-control script passed syntax and CSP-nonce checks. Fix commit `29a3d96df85690de41588d88d424dd2cb064fed3` deployed successfully on Vercel. Live HTTP logins passed for all four variants: lowercase/no-space, original spelling, extra spaces and invisible paste whitespace. Each issued a session cookie and loaded the homepage with a 200 response and noindex header. The live Show/Hide control and matching CSP nonce were present; Googlebot remained blocked, robots.txt disallowed crawling, and a wrong password was rejected. A local Chromium download failed, so no new browser click-through result is claimed.

### Vercel preview login repair

Reproduced the reported `Request not allowed` response on the live preview. The password page's `no-referrer` policy makes browser form submissions send `Origin: null`, while the login handler required an exact origin. Changed the policy to `same-origin` and added compatibility for previously opened forms only when browser Fetch Metadata confirms a same-origin submission. Cross-origin requests remain rejected.

The agreed password is now accepted even when an older optional `PREVIEW_PASSWORD` is configured. Before the repair, the live endpoint also rejected the agreed password when sent with an explicit valid origin; the remote environment is not inspectable, so the underlying configured value is not claimed as verified. Updated the optional-setting documentation accordingly.

Verification: the build and all 11 local authentication/adapter tests pass, including both regression cases. Fix commit `548f5bf2cbc3da715bfd677456ca0381bc38b67c` deployed successfully on Vercel. Live HTTP checks passed for both normal-origin and old-page null-origin password submissions: each returned a 303 redirect and session cookie. Both homepage variants, Express Pay and a protected SVG returned 200 with the cookie. Unauthenticated Googlebot returned 401, robots.txt disallowed crawling, and noindex headers remained present. Wrong passwords and cross-origin submissions were rejected. No cloud browser or account sign-in was used.

### Vercel deployment background

The `parkezi-v8` Vercel preview uses the V12 design with later refinements. It includes a simple shared-password gate that requires no environment variables. The agreed password is checked against a server-side hash, and the default preview signing key remains stable across builds. A 90-day cookie unlocks all site files in the same browser. Googlebot receives an unauthenticated 401 response; `robots.txt` disallows crawling, every response carries `X-Robots-Tag: noindex`, and the HTML retains noindex metadata.

Repository: `dabhandgroup/parkezi-v8`. The owner has connected it to Vercel at https://parkezi-v8.vercel.app/. The earlier deployment returned a configuration-required 503 because the manual environment setup was incomplete; the 28 October change removed that requirement. Environment settings remain optional; an alternative password no longer disables the agreed default.

Verification for this change: nine local authentication/adapter tests pass, including no-environment startup, default hash login, actual protected HTML/image delivery, Googlebot rejection and robots directives. The real agreed-password login also passed through the local deployment adapter with no environment variables. GitHub commit `051864418d72366e8499e81af422719c012bcdf3` received a successful Vercel deployment status, and all 12 changed source files were verified against remote main. Final external live HTTP verification was unavailable because the workspace network rejected access; no cloud-browser sign-in was used.

GitHub upload verified: all 162 prepared files match the remote `main` branch, with no deletions. Website/configuration upload commit: `d7e2785581f976982b9feba1d1d481642252e6c3`. The build and all seven authentication/adapter tests passed before upload.

V12 is the current implemented design. The homepage, its matching black-hero version, and one product page (Express Pay) are built as a static HTML/CSS/JavaScript preview. The project is ready for continued design review; production form handling, final review content and the remaining website pages are outstanding.

The original Sites preview is owner-private. The Vercel preview uses the shared password gate. The original parkezi.com.au website has not been replaced.

## Pages and deliverables

| File | Purpose | Status |
| --- | --- | --- |
| `dist/index.html` | Main homepage with white hero | Implemented |
| `dist/home-v2.html` | Same homepage with black hero, white navigation and dark client slider | Implemented |
| `dist/home-v2-alt.html` | Earlier compact black-hero exploration | Retained variation; not the matching black-hero version |
| `dist/express-pay.html` | Express Pay product page | Implemented |
| `dist/style-guide/index.html` | Developer style guide | Implemented; excluded from footer navigation |
| `Parkezi-Website-HTML-v12.zip` | Downloadable HTML package | Current release package; includes these tracking files |

Preview: https://parkezi-homepage-preview-v2.harry516378.chatgpt.site

Matching black hero: https://parkezi-homepage-preview-v2.harry516378.chatgpt.site/home-v2.html

## Completed

- Refined responsive homepage with individually positioned product units, aligned desktop bases, larger mobile units, client logos and Google rating badges.
- White and black hero variants with phone-first CTAs and secondary outlined Contact buttons.
- Utility bar, mega menus, full-screen mobile menu, animated hamburger/X, larger navigation logo, original favicon and separate header shrink/expand thresholds.
- Product dropdown with larger imagery, a consistent section heading, stationary cards, image lift beyond card edges, text rollovers and consistent action arrows.
- SolarGate outdoor feature with original boom and black mount rotating together around the axle. A generated repair layer fills the cabinet surface behind the mount.
- Installation/support section, dark software section, and laptop/phone demos that update together.
- Mercure installation gallery and draggable project carousel with client logos.
- Comparison tables and feature tooltips; original homepage FAQs retained in a condensed layout and Express Pay FAQs open by default.
- Full enquiry form with first name, last name, email, phone, address and message, plus optional local attachments. Searchable country picker uses SVG flags and defaults to Australia +61.
- Compact newsletter, dedicated Partners column, contact details, office addresses and corrected Smart Access logo treatment.
- Original Crisp workspace embed.
- Unbuilt product/system popups explain the current scope to Blake and link to https://dabhandmarketing.com/book-a-call in a new tab.

## Remaining work

| Item | Current state / next action |
| --- | --- |
| Enquiry delivery | Local preview only. Connect the approved form endpoint and verify delivery, validation, errors and attachment handling. |
| Newsletter delivery | Local preview only. Connect the chosen subscription service if this is retained for launch. |
| Google review text | Clearly labelled sample cards. Replace with verified Parkezi reviews before launch; do not invent names or testimonials. |
| Remaining pages | Only the homepage and Express Pay have been redesigned. Confirm scope for other products, systems, pricing, about, integrations and case-study pages. Existing source links and scope popups remain in use. |
| Final approval | Obtain final design/content approval, including the preferred hero variant and product artwork. |
| Production launch | Confirm hosting and domain handoff, remove preview-only controls/notices and noindex settings as appropriate, then verify live forms, analytics, metadata, accessibility and responsive behaviour. |

No remaining item above should be treated as completed until it is implemented and verified.

## Verification record

- V11: white/black hero layouts inspected at mobile widths, including a 305px content viewport; no horizontal page overflow observed. Full-screen mobile menu and popup booking destination checked. Header stayed compact after small scroll changes.
- V12: open barrier inspected in-browser; boom and black mount share one rotating layer. Product image lift verified with keyboard focus (42px upward movement and 1.06 scale in the dropdown). Partner logos loaded and Smart Access rendered without its dark rectangle.
- V12: local page links/assets and duplicate IDs checked across all five pages. Changed JavaScript passed syntax checks.
- This documentation update changes project records only; it does not require a new visual QA pass. Production delivery and real Google review content remain unverified because they are not connected/supplied.

## Source and handoff

- Buildless site: `dist/` contains deployable HTML, styles, scripts and local assets.
- `content/` retains original FAQ, navigation, office, Express Pay and source-reference data.
- `design-notes/` and `design-notes-v*.md` retain artwork prompts and implementation notes.
- Latest visual release source baseline: `0c6d866f3f411db2871009b25ca51e3129f04103` (V12). Later documentation commits can follow this baseline without changing the visual version.
- Release history is in [changelog.md](changelog.md).

## Keep these records current

For every subsequent work session, read this file and the changelog first. Update this status with the final state, remaining work, relevant verification and current deliverable. Append a dated changelog entry describing what changed, why and what was checked. Record failures or incomplete work plainly. Preserve previous entries; correct historical errors explicitly. Do not place credentials, access tokens or private session URLs in either file. Include both files in every handoff ZIP.
