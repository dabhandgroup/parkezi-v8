# Parkezi redesign — project status

Last updated: 29 October 2026 (Europe/London).

## Current position

### Forgiving password entry

The owner removed the Vercel variables and supplied a screenshot showing a wrong-password message. A fresh live HTTP check accepted the exact agreed password but rejected lowercase and no-space variants. The screenshot does not reveal what was entered, so the specific typed value is unknown.

Password checking now ignores case, spaces and invisible whitespace from pasting. Updated the default hash to match that normalised value and added an accessible Show/Hide password control. No variables need to be restored. Crawler blocking, noindex and private asset serving remain in place.

Verification: the build and all 12 local tests pass. Direct adapter checks with both variables absent accepted the agreed, lowercase/no-space and differently spaced variants and served the actual homepage. The password-control script passed syntax and CSP-nonce checks. A local Chromium download failed, so no new browser click-through result is claimed. Deployment and live HTTP verification of this change are pending.

### Vercel preview login repair

Reproduced the reported `Request not allowed` response on the live preview. The password page's `no-referrer` policy makes browser form submissions send `Origin: null`, while the login handler required an exact origin. Changed the policy to `same-origin` and added compatibility for previously opened forms only when browser Fetch Metadata confirms a same-origin submission. Cross-origin requests remain rejected.

The agreed password is now accepted even when an older optional `PREVIEW_PASSWORD` is configured. Before the repair, the live endpoint also rejected the agreed password when sent with an explicit valid origin; the remote environment is not inspectable, so the underlying configured value is not claimed as verified. Updated the optional-setting documentation accordingly.

Verification: the build and all 11 local authentication/adapter tests pass, including both regression cases. Fix commit `548f5bf2cbc3da715bfd677456ca0381bc38b67c` deployed successfully on Vercel. Live HTTP checks passed for both normal-origin and old-page null-origin password submissions: each returned a 303 redirect and session cookie. Both homepage variants, Express Pay and a protected SVG returned 200 with the cookie. Unauthenticated Googlebot returned 401, robots.txt disallowed crawling, and noindex headers remained present. Wrong passwords and cross-origin submissions were rejected. No cloud browser or account sign-in was used.

### Vercel deployment background

The `parkezi-v8` Vercel preview uses the V12 design. It includes a simple shared-password gate that requires no environment variables. The agreed password is checked against a server-side hash, and the build generates its own private session-signing key. All site files remain behind the gate. Googlebot receives an unauthenticated 401 response; `robots.txt` disallows crawling, every response carries `X-Robots-Tag: noindex`, and the HTML retains noindex metadata.

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
- Product dropdown with larger imagery, no heading tier, stationary cards, image lift beyond card edges, text rollovers and consistent action arrows.
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
