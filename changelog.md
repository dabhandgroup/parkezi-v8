# Parkezi redesign — changelog

## 2026-11-01T11:43:51.710204+00:00 - Step & Pay larger-screen configuration implemented and self-checked

Event `parkezi:2026-11-01:step-pay-option-implemented:v1`, implements Harry's correction `parkezi:2026-11-01:34inch-step-pay-option:v1` without changing parent routing history. Same DAB-47/task branch/draft PR https://github.com/dabhandgroup/parkezi-v8/pull/1. Standalone 34-inch catalogue cards and display anchors removed across existing pages. All menus/catalogues now contain the original five product families. No original or supplied asset deleted or altered.

New /step-pay.html reuses the existing Express Pay product-page components: two-image gallery, overview, screen options, source-supported FAQs, five-product range and existing enquiry/footer. The supplied 34-inch artwork is explicitly a Step & Pay larger-screen configuration. Existing Step & Pay links/triggers now open the local page; menu design/copy remains with destination-only changes. Product-page metadata/JSON-LD and source provenance recorded. Existing scope popup now truthfully names the homepage, Express Pay and Step & Pay. No invented prices, default screen dimensions or technical features.

Preserved approved dark index/home-v2, white alternative, original icon/five-product menu design, all professional page photos and the praised support section. Exact support/platform/case-study/project/enquiry sections are unchanged from 44bf3b2 on all four homepage variants. Express Pay retains its five-image gallery; Step & Pay has two matched slides/thumbs/captions/zoom indices. New CSS is page-scoped for Step configurations and restores the original five-product grid breakpoints.

GPT self-check evidence `/Users/harrylang/.t3/scratch/parkezi-feedback-2026-11-01/step-pay-option-checks.json`, SHA256 `74a43f5d7a22b4146326ec086c6b05b3d12fc25339f2a50368588a83af5df27e`: seven pages local assets/unique IDs/noindex, all Step links, five-product taxonomy, retained menu design, Step anchors/schema/new copy, two galleries and unchanged assets PASS. Node24.18.0 build PASS; 13/13 adapter/auth tests PASS, extended existing same-cookie test now serves /step-pay.html and /home-white.html and verifies Step page content behind the gate. Changed JS syntax and git diff whitespace checks PASS. Tests are local fixtures, not hosted/browser journey evidence.

Final independent report remains historical against 20e70d4; current taxonomy/page/link changes supersede affected review evidence. Two consumed passes/cap exhaustion retained; no third reviewer. Current visual/mobile/font-loaded wrapping/runtime checks remain unverified because prior matching preview required Vercel SSO and builder preview tools cannot verify own edits. Do not claim independent readiness or Done. Next: commit/push same draft PR and capture exact source/preview receipts. No main merge, production publication, service/protection change, real submissions or client contact. Local working logs and exact scoped Obsidian mirrors manually read back; branch copies contain this history.

## 2026-11-01T11:40:21.950405+00:00 - Step & Pay larger-screen correction and final review limits

Event `parkezi:2026-11-01:34inch-step-pay-option:v1`, actual request 1 November 2026 in Brain continuation, exact message timestamp unavailable, explicit client clarification for Parkezi. Parent routing comment bf9ae880-5a86-4d72-8e52-6da179a3b27f on existing DAB-47 is preserved. Owner pickup comment 244fc723-1d0e-4a1b-b673-7ac71cbe4b8b records the implementation plan. Harry says the 34-inch image is Step & Pay with a larger screen, not a new product. Remove its standalone catalogue card and put the image/details on a Step & Pay page; preserve the approved dark default, original menu design, professional page/support photography and other work. Same branch/PR, no new builder/issue or production authority.

Related event `parkezi:2026-11-01:photo-review-final:v1`: final Grok 4.6 pass completed at 2026-11-01T11:37:26.585Z. Report `/Users/harrylang/Documents/Clients/Parkezi/website-v8/.team/reviews/professional-photos-r2.md`, SHA256 `4cbf957cc3e82d4de4a1b9879eacd479b8280a964f1d2cde4894d4bbdcf7c7be`, reviewed source 20e70d43fba48e64dbfb87128b2ff9a9a56d697c/tree 440c73446ee40ab8a60e9859b9f3dbb3ac9ccb5f. Source criteria aligned; PHOTO-C04 and USER-01/04/05/06/11 BLOCKED by Vercel SSO redirect. No login/bypass. Advisory stale Photos.md sentence fixed in docs-only commit 44bf3b207dd091579a4ca2e7621767ae7ebb76b9/tree e5e182da2d4f3755bc261c899dd80434bb56b264; product files unchanged. No independent visual readiness.

Review ledger reconciled: pass 1 superseded/cancel requested, pass 2 completed BLOCKED, cap 2 exhausted. No active review to cancel and no third/replacement review. Ledger and builder-response-r2.md preserve decisions. This new product taxonomy/page/link revision will invalidate affected source evidence; final checks will be GPT self-checks only, actual browser wrapping/journeys remain unverified. DAB-47 In Progress, draft PR https://github.com/dabhandgroup/parkezi-v8/pull/1; no Done or owner acceptance.

Plan: remove standalone 34-inch cards from all page catalogues and restore five-product layout; reuse existing Express Pay product-page structure for Step & Pay with two gallery/configuration images and bounded supplied copy; wire existing Step & Pay links to local page without redesigning menus. Preserve all original and supplied assets. Criteria STEP-34-01..04 in .team/ACCEPTANCE.md. Next: implement, self-check routes/gallery/catalogue/assets and exact final revision, push same PR/preview and read back receipts. Local/mapped logs reconciled and manually mirrored, no automatic sync or blanket historical backfill claim.

## 2026-11-01T11:31:14.022032+00:00 - Corrected dark-home candidate pushed and read back

Event `parkezi:2026-11-01:dark-home-corrected-candidate:v1`, following Harry's menu/dark-home correction. Same draft PR https://github.com/dabhandgroup/parkezi-v8/pull/1 pushed and immediately re-linked in T3. Exact head `20e70d43fba48e64dbfb87128b2ff9a9a56d697c`, tree `440c73446ee40ab8a60e9859b9f3dbb3ac9ccb5f`, clean task worktree `/Users/harrylang/Documents/Clients/Parkezi/worktrees/dab-47-professional-photos`. PR title/body/head/draft read back via authenticated GitHub. Vercel status for this exact head is success, deployment `6XBFv9PtHpyNruQ9kfdWw96t2EjB`; same branch-preview alias https://parkezi-v8-git-amend-dab-47-profe-52a566-dabhandgroups-projects.vercel.app. This is an automatic branch preview, not a main/production release.

Root is the matching dark home; original headers/menus restored byte-for-byte across six pages; professional photos stay in page sections. The liked support image is unchanged. White route retained at /home-white.html. Six-page source/asset/ID/noindex/gallery/header/dark-white checks, original 114-asset blob comparisons, Node24 build and 13 tests pass. Corrected browser journeys/layout/wrapping remain unverified until actual independent observations.

DAB-47 comment c8385463-a382-45a3-94bf-91cad6295808 saved and fetched again, comment pagination exhausted. Same issue In Progress, same PR draft; no new issue, main merge or service changes. Selected Grok pass 2 reserved against corrected identity; pass 1 remains superseded with task cancellation requested, never reset. Only two total passes allowed; any remaining blocked checks must be escalated rather than launching a third. Root ledger/report under .team/reviews preserves exact candidate/task history. Next: final independent pass and honest handback. Root/mapped logs manually reconciled and read back; branch remains frozen at above identity.

## 2026-11-01T11:30:27.457113+00:00 - Original menus restored and dark homepage made default

Event `parkezi:2026-11-01:restore-menus-dark-home:v1`, source Harry's current owning-session messages/screenshots (11:27:57 menu screenshot and 11:28:25 support screenshot, source timezone Europe/London; exact message timestamp unavailable). Harry requested the dark variant as the actual homepage, original menus retained and new images used on page sections. He positively praised the new installation/support treatment. This supersedes the menu alterations in prior photo candidate 5c667bf; no unrelated approved page work reverted.

Result in amend/dab-47-professional-photos: all six current page headers match corresponding origin/main header markup byte-for-byte. Original five-product menus and icon About cards restored; new CSS no longer styles menus. Index now equals the matching dark home-v2; white alternative retained as home-white.html, documented in Redirects.md, no HTTP redirects added. Page-level support/benefits photography, Express Pay gallery and updated catalogue artwork retained. The praised support derivative is unchanged. New 34-inch display remains on page catalogues with an enquiry anchor, not the original menu.

Checks: Node 24.18.0 build PASS, 13/13 existing auth/adapter tests PASS, six-page original-header parity/assets/IDs/noindex PASS, gallery slide/thumb/zoom/caption parity PASS, dark/white source routing PASS, all 114 original asset blobs unchanged. New derivative hashes unchanged. One initial overbroad source-asset assertion incorrectly included added files; corrected original-blob comparison passes. No new browser verification claimed; screenshots establish Harry's feedback on the prior candidate, not the corrected final revision.

Canonical DAB-47 stays In Progress, same draft PR https://github.com/dabhandgroup/parkezi-v8/pull/1. Linear comment 25115b6d-f77c-4f79-8264-435ce96a9bfc saved/fetched, comments exhausted. GPT owning session is builder, Harry accountable. Stale pass-1 task cancellation requested via task_cancel; preserve its result/counter, no restart or reset. Only the second/final review pass remains for this outcome. Next: push corrected frozen candidate, re-link PR immediately, record exact SHA/tree, then final independent check. Main/production, services, real forms and client messaging unchanged. Local working logs and exact scoped vault mirrors manually reconciled/read back; branch log copies include current history.

## 2026-11-01T11:24:42.137822+00:00 - Draft photo amendment PR and final source identity

Event `parkezi:2026-11-01:professional-photos-pr:v1`, following authorised/candidate photo events. Draft PR https://github.com/dabhandgroup/parkezi-v8/pull/1, created as dabhandgroup and linked in T3 immediately. Head `5c667bf1ee0a5ba702a471524032c68321a5d407`, tree `6e4d88e4e07174a0c67ae401a79943303e2c0121`, branch amend/dab-47-professional-photos, clean task worktree `/Users/harrylang/Documents/Clients/Parkezi/worktrees/dab-47-professional-photos`. PR metadata read back: open, draft, unmerged, correct main base a6a890e07751a8849c18814981d30583f484c5c0. No main/production change made.

GitHub Vercel commit status is success and PR bot reports an automatically created branch preview https://parkezi-v8-git-amend-dab-47-profe-52a566-dabhandgroups-projects.vercel.app, deployment `EMKV1bupBHJS1HPMkjRQSCYmEJEa`. This establishes the branch preview receipt for this head, not authenticated runtime or visual acceptance. Existing shared gate remains; do not bypass it or start unsolicited login flows.

DAB-47 comment `4daf3572-224b-47ad-8268-38de25949a10` with PR/head/tree/checks was saved and fetched again; comments hasNextPage=false. Issue remains In Progress, Harry accountable, existing Parkezi/DAB and current/request-date labels. Builder Node 24 build and 13 tests plus assets/IDs/noindex/gallery parity pass. Independent selected Grok 4.6 review pass 1 reserved against exact head; actual task/report and final readiness remain pending. Ledger `/Users/harrylang/Documents/Clients/Parkezi/website-v8/.team/reviews/professional-photos-cycle.json`, max two passes for this outcome. Historical setup reviews are separate.

No real enquiry, merge, provider/permission change, client message or explicit production deployment. Next: independently assess this exact branch preview/source; report actual browser limitations and keep draft until acceptance. Manual local/mapped log event readbacks verified; older histories retained. Task branch remains frozen; subsequent workstream receipt updates are outside the reviewed product tree.

## 2026-11-01T11:23:36.913800+00:00 - Professional-photo amendment candidate

Event `parkezi:2026-11-01:professional-photos-candidate:v1`, implementing `parkezi:2026-11-01:professional-photos-authorised:v1`. DAB-47, GPT owning-session builder; Harry accountable. Branch amend/dab-47-professional-photos in `/Users/harrylang/Documents/Clients/Parkezi/worktrees/dab-47-professional-photos`. Five existing pages share professional people photography in About/Installation menus; three homepage variants use the real company/exhibition and equipment photos; Express Pay starts its five-image gallery with the professional product photo. Six-product menus/catalogues include a 34-inch display enquiry destination. Supplied updated Step & Pay artwork is used in menu/catalogue/on-foot payment. Hero cutouts and ecosystem diagram are intentionally retained; no new About page or video embed is claimed.

Seven descriptive WebP assets total 492,254 bytes. Original assets are preserved; content/professional-photo-sources.json records source/output hashes and Photos.md records placement and limits. CSS handles six catalogue products and five gallery thumbnails. Gallery captions/lightbox labels now derive from actual slide alt text rather than four fixed labels.

Self-checks: actual Node 24.18.0 build PASS, 13/13 existing adapter/auth tests PASS, changed JS syntax PASS, five-page local asset/ID/noindex PASS, five-slide thumbnail/zoom/initial-caption parity PASS. Original incidental Node 22 run was repeated under required Node 24. These checks do not establish browser layout/journeys. Own browser verification is unavailable under current harness policy; independent actual desktop/tablet/mobile and heading-wrap evidence remains required. No real submissions, service/configuration changes, production deployment or client contact.

Next: commit/freeze candidate, open and immediately link draft PR, independent Grok 4.6 review (max two passes for this outcome). No release or Done; matching hosted branch preview and review results remain pending. Exact reviewed SHA/tree and PR receipt will supplement this event. Root local logs are working record; mapped vault mirrors new events manually, existing histories preserved. Task-branch copies include the current handover events.

## 2026-11-01T11:20:17.587748+00:00 - Authorised professional-photo amendment

Event `parkezi:2026-11-01:professional-photos-authorised:v1`. Source: Harry's owning-session correction and supplied `/Users/harrylang/Downloads/SAS-0001-20261101T111518Z-1-001.zip`, actual request date 2026-11-01, exact message time unavailable. Supersedes the intake-only interpretation of `parkezi:2026-11-01:client-feedback-assets-intake:v1`; earlier feedback/assets retained.

Harry explicitly requested applying the professional Drive photos to About Us and relevant areas. The ZIP contains the same 11 named JPEGs and six MP4s. All 11 photos inspected in a contact sheet; subjects are company/exhibition, people and equipment. Use truthful alt text, not installation claims for trade-show imagery. Apply company/About/support photos, a genuine product photo in Express Pay gallery, and supplied display/Step & Pay catalogue artwork. No full About page, video embedding, new technical claims, hero-default decision, service changes or release inferred.

Canonical [DAB-47](https://linear.app/dabhandmarketing/issue/DAB-47/redesign-v8v12-recover-parkezi-source-and-organise-continuation), Harry accountable, In Progress. Authenticated comment `94096c32-420c-4252-b845-d47269202ff7` saved and read back, comments exhausted (hasNextPage=false). get_agent_context was advertised but returned Tool get_agent_context not found; source/handover remain available. DAB-46 unchanged.

GPT owning session is builder. Task branch `amend/dab-47-professional-photos`, isolated worktree `/Users/harrylang/Documents/Clients/Parkezi/worktrees/dab-47-professional-photos`, freshly fetched origin/main a6a890e07751a8849c18814981d30583f484c5c0/tree b19a1e86bf61f6e23619e40d31eabaa3baf72682. Independent selected Grok 4.6 reviewer will inspect the final candidate, max two passes for this distinct product-photo outcome; no setup-review counter reset. Criteria PHOTO-01..04 and plan are recorded in branch .team files and Linear. Runtime/responsive/gallery/menu and 320/390 heading checks require actual evidence; no unverified Done. No push/PR/deployment yet. Next: implement and self-check candidate, freeze identity, obtain independent review and create/link PR. Local logs remain working record; only exact mapped status/changelog mirrors receive this event, preserving existing histories.

## 2026-11-01T11:13:13.280783+00:00 - Client feedback and additional product assets

Events `parkezi:2026-11-01:client-feedback-assets-intake:v1` and `parkezi:2026-11-01:client-extra-product-zip:v1`. Actual request date 2026-11-01; exact user-message timestamps unavailable. Source: Harry's client-feedback and attached-ZIP messages in the owning Parkezi - Redesign session. Canonical [DAB-47](https://linear.app/dabhandmarketing/issue/DAB-47/redesign-v8v12-recover-parkezi-source-and-organise-continuation), In Progress, Harry accountable, existing DAB/Parkezi. DAB-46 remains separate.

Reported feedback: client likes the direction, clearer product layout, swipeable gallery and larger contact form. Black hero is also liked, but product photos look dirty; cause is not verified. This is positive direction feedback, not final hero/content/launch approval. Client refers to a new 34-inch display and updated Step & Pay; technical specifications and final artwork accuracy remain unverified. More professional images are expected. Technician completion photos are reference material, not automatically website-ready.

Observed intake: authenticated Drive folder https://drive.google.com/drive/folders/12ckdkhHQQq8h3cuFThalzN64_mS6YvOR returned 11 JPEG photos and 6 MP4 videos (17 direct items, limit 100). No video download, visual quality review or recursive completeness claimed. ZIP `reclaudeconnector.zip`, attachment ref `file_6c7262e7-5177-4f5e-b4ee-86b9e74fadac`, is 2677970 bytes, SHA-256 `6bf449d40bee8d21fd0b77eed905170036c9e3ea477db9a10e471c451e7d283e`. Its four images were extracted to scratch and visually inspected: two polished product illustrations and two workshop photos showing the display and payment terminal. PNG filenames start with ChatGPT Image; preserve as supplied artwork, not evidence of unaltered photography. Final hardware/detail fidelity needs confirmation before use.

Evidence: `/Users/harrylang/.t3/scratch/parkezi-feedback-2026-11-01/intake-evidence.json` records exact archive/member names, bytes and hashes; unchanged scratch image copies are beside it. INTAKE-01 feedback captured PASS; INTAKE-02 folder listing and four ZIP images inspected PASS within stated bounds; INTAKE-03 local/mapped records and authenticated Linear comment `67d7f8a5-a7d0-4154-9827-f53c257dceef` read back PASS at 2026-11-01T11:13:39.271434+00:00; comments hasNextPage=false and issue remains DAB-47, In Progress, Harry, DAB/Parkezi, Current requests + Requested 2026-11-01. Product amendment criteria are not established. Actual implementation builder/reviewer will be assigned for the agreed outcome; no independent review is claimed for this administrative intake and no review pass is consumed.

Scope/result: intake only. Full V8 change list is awaited; no product/UI code, image editing, connector installation, endpoint, real submission, release, permissions or client-contact changes. Original source HEAD `a6a890e07751a8849c18814981d30583f484c5c0`, tree `b19a1e86bf61f6e23619e40d31eabaa3baf72682`. Prior setup reviews remain historical against their own hashes; this log update is not represented as independently reviewed.

Records: local `/Users/harrylang/Documents/Clients/Parkezi/website-v8/status.md` and `/Users/harrylang/Documents/Clients/Parkezi/website-v8/changelog.md` are the working record. Mirror only `/Users/harrylang/Documents/GitHub/dab-hand-vault/Projects/Websites/Parkezi/Workstreams/Website Redesign/status.md` and `/Users/harrylang/Documents/GitHub/dab-hand-vault/Projects/Websites/Parkezi/Workstreams/Website Redesign/changelog.md`. Existing event sets matched before writing; different historical bodies are preserved. Manual mirroring, not automatic sync. Linear comment `67d7f8a5-a7d0-4154-9827-f53c257dceef` was saved and fetched again, with matching event IDs/archive hash; no issue-field changes. Next: receive Harry's full changes, agree the product/image scope, then prepare a numbered amendment plan before any implementation.

## 2026-11-01T08:05:44.008646+00:00 - T3 short naming convention

Event `parkezi:2026-11-01:t3-short-name:v1`. Actual request date 2026-11-01, exact message timestamp unavailable, source Miscellaneous thread779e6189-5e5a-4478-9440-4fb8b66634eb. Harry requested new T3 items use project name - short descriptor, preferably one word; Shopify when verified Shopify work. Actual client conversation continues directly in its owning session.

Result/readback: display project **Clients / Parkezi - Redesign**, existing session **Parkezi - Redesign**. Project/session IDs and repo/checkout unchanged. No new thread, duplicate issue or unrelated bulk rename. Convention saved in existing project-workstream-setup skill, shared workflow and local AGENTS/HANDOVER. Skill validator PASS. Canonical [DAB-47](https://linear.app/dabhandmarketing/issue/DAB-47/redesign-v8v12-recover-parkezi-source-and-organise-continuation) naming correction saved/read back; state remains In Progress. Evidence `/Users/harrylang/.t3/scratch/2026-10-31-use-this-extracted-migration-folder-b66634eb/Working/parkezi-setup-2026-11-01/naming-service-readback.json` and naming-policy-update.json.

Builder/checker /root performed metadata/instruction readback; no independent product review claimed for this small update. Prior independent setup review is historical against its own recorded hashes; later naming/log files have new hashes in naming-final-manifest.json. Original product source commit/tree remains unchanged. Local logs are working record; exact scoped Obsidian pair mirrors this new event only, both read back; previous histories preserved. No automatic/exhaustive backfill claimed.

Next: talk in <t3-thread://v2/6f278c24-e457-4037-b250-4cec290cac60/mcp:launch:9748691fb872c2b16e1f94c8a39c09317ba17c93ebd3ad32b9ce18e78b2b3c67>. Product/runtime/branch-protection/owner-approval gates remain open.

## 2026-11-01T08:01:11.408589+00:00 - Independent setup review and handback

Event `parkezi:2026-11-01:independent-setup-handback:v1`. Builder /root; independent reviewer /root/parkezi_setup_review checked all165 baseline files and all15 frozen setup files at manifest2b8498a565258c58cee7d2ef58e24b0cd8dc12631fca1a1b5c2f1cd4362ed3c7. Initial independent result PASS for setup, report SHA256dc5428361d0673b19fcfec60e8be441351e6b22a17cb3136d6bd0b357b8f038e. No blocking setup findings. Only the two existing source logs changed; original product files/commit/tree unchanged.

Final orientation completed in owning Website redesign session, canonical DAB-47 In Progress, authenticated GitHub fetch/push dry-run and local/mapped Obsidian event readbacks passed. SETUP-01 through05 observed; SETUP-06 initial review passed, this handback-log-only revision is being rechecked against final-setup-manifest-v2.json and .team/REVIEW.md is the authoritative final reviewer result. The only revision after initial review adds this receipt, puts log events newest first and refreshes current snapshot. No product or workflow criteria changed.

Mapping ledger: intake parkezi:2026-11-01:intake-v8-setup, setup parkezi:2026-11-01:source-project-github-logs:v1, session parkezi:2026-11-01:owner-session-git-readback:v1 all map to DAB-47. Earlier parity DAB-46 unchanged. Local pair is working record; only new events mirrored in exact scoped Obsidian pair; final new event read back in both. No exhaustive historical backfill or automatic sync claimed.

Remaining blockers/next action: continue in the owning session with Blake feedback/preferred hero and agreed remaining page scope. Fresh gated-preview runtime/journey verification, final reviews/ratings/content policy, form/newsletter delivery and owner acceptance are pending; GitHub main protection remains off. No new product work/release, actual Git push/PR or permission change. DAB-47 stays open, no Done.

## 2026-11-01T07:57:14.933093+00:00 - Owner session and final setup receipts

Event `parkezi:2026-11-01:owner-session-git-readback:v1`. What/why: completed the actual requested T3 session and canonical tracking instead of leaving an empty project. Result: Website redesign launched and read back in Clients / Parkezi: <t3-thread://v2/6f278c24-e457-4037-b250-4cec290cac60/mcp:launch:9748691fb872c2b16e1f94c8a39c09317ba17c93ebd3ad32b9ce18e78b2b3c67>. First prompt is complete read-only orientation; live run observed. Root checkout binding is confirmed by project path; thread branch/worktree fields are null for root mode and are not claimed as separate worktree binding.

DAB-47 write/readback confirms existing DAB/Parkezi, Harry, In Progress, Current requests and Requested 2026-11-01. New scope/ACs and actual owner-session link retained alongside original description/history. Current-request index document9ca8c085-968a-4df1-b99f-fbe4962642fa now has the Parkezi delta and was read back; latest queue26 records, hasNextPage=false. Evidence `/Users/harrylang/.t3/scratch/2026-10-31-use-this-extracted-migration-folder-b66634eb/Working/parkezi-setup-2026-11-01/setup-receipts.json`. Setup builder /root; independent reviewer /root/parkezi_setup_review assigned to final setup manifest, with actual result in `/Users/harrylang/Documents/Clients/Parkezi/website-v8/.team/REVIEW.md` when present. Product builder/reviewer and owner acceptance remain pending.

New setup events are saved in both exact mapped local/Obsidian pairs and read back. Old local history retained, scoped vault mirror contains only these new events; no claim that earlier histories are identical or exhaustive. No product edits, Git remote push/PR, main merge, deployment, permissions or client contact. Main protection remains a documented gap. Preview/runtime and original DAB-47 content-policy acceptance remain unverified/open.

Next: consult independent setup review, then continue client decisions in the owning session. Any later authorised product change uses an issue-scoped task branch/worktree and PR with independent final revision evidence and Harry acceptance.


## 2026-11-01T07:55:59.400554+00:00 - Parkezi V8/V12 continuation setup

- Event `parkezi:2026-11-01:source-project-github-logs:v1`, initial request `parkezi:2026-11-01:intake-v8-setup`; spelling correction PARKEZI reconciled. Source Miscellaneous 779e6189-5e5a-4478-9440-4fb8b66634eb, actual request date 2026-11-01, precise request time unavailable.
- What/why: recovered exact V8 repository rather than reusing old Next.js or Webflow parity source; cloned separately, established client T3 registration, local task branch/credential routing, canonical Linear mapping, workflow handover and scoped logs.
- Result: baseline a6a890e07751a8849c18814981d30583f484c5c0 / tree b19a1e86bf61f6e23619e40d31eabaa3baf72682; 165 tracked hashes; authenticated clone/fetch/push dry-run PASS, no actual push. No product implementation, permission change, release or client message.
- Issue/readback: [DAB-47](https://linear.app/dabhandmarketing/issue/DAB-47/redesign-v8v12-recover-parkezi-source-and-organise-continuation), correct existing DAB/Parkezi, In Progress, Harry, Current requests + Requested 2026-11-01 confirmed. Old description/history retained. DAB-46 unaffected. Two current/archived project candidates, both comments exhausted; complete transitions not established.
- Mapping: local `/Users/harrylang/Documents/Clients/Parkezi/website-v8/status.md` and `changelog.md` are working records; scoped mirror `/Users/harrylang/Documents/GitHub/dab-hand-vault/Projects/Websites/Parkezi/Workstreams/Website Redesign/status.md` and `changelog.md` contains new events only. Differing older histories preserved, not overwritten or claimed fully backfilled.
- Evidence: `/Users/harrylang/.t3/scratch/2026-10-31-use-this-extracted-migration-folder-b66634eb/Working/parkezi-setup-2026-11-01/baseline-manifest.json`, discovery-evidence.json, git-readiness.txt; T3 project mcp:6f1cb6a5-6824-4823-ae8f-5e20b2a5fef0. Registry confirms current vault. New event saved/readback is checked before handback.
- Limits: main unprotected; preview gate and automation timeout prevent new UI/runtime acceptance. Forms/newsletter not connected, reviews labelled samples, final scope/hero/approval still open. No Done. Builder /root, independent final setup reviewer pending.
- Next: start client orientation session, capture launch/readback, final setup review and owner handback. Future client implementation requires new specific task authority.

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
