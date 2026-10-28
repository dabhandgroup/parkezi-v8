# Parkezi redesign — project status

Last updated: 28 October 2026 (Europe/London).

## Current position

### Vercel deployment preparation

The protected Vercel source is prepared under the requested project name `parkezi-v8`, using the V12 design. Local build and server-side password/session checks pass. All site files are bundled privately and served through an authenticated function; public output contains only robots.txt. Read `VERCEL-DEPLOYMENT.md` for import settings and environment variable names.

GitHub repository: `dabhandgroup/parkezi-v8`, created by the project owner. This is the Vercel-ready source handoff; the owner will connect the repository to Vercel. Vercel has not been deployed from this repository yet. The repository is public; the actual preview password and session secret must be configured as encrypted Vercel environment variables and are excluded from the source. The earlier direct Vercel attempt was blocked by team access and the connection was subsequently removed.

V12 is the current implemented design. The homepage, its matching black-hero version, and one product page (Express Pay) are built as a static HTML/CSS/JavaScript preview. The project is ready for continued design review; production form handling, final review content and the remaining website pages are outstanding.

The preview is owner-private. The original parkezi.com.au website has not been replaced.

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
