"""Owner source-content comparison, not browser or independent QA. No network requests."""
from pathlib import Path
from bs4 import BeautifulSoup
import json,re,html,hashlib,datetime
root=Path('dist');out=Path('.team/audits/content-2026-11-03');out.mkdir(parents=True,exist_ok=True)
pages=json.loads(Path('content/site-pages.json').read_text())['pages']
def norm(t):return re.sub(r'[^a-z0-9]+',' ',t.lower()).strip()
def before_main(markdown):
 lines=markdown.splitlines();start=next((i for i,l in enumerate(lines) if re.match(r'^# [^#]',l)),0)
 body='\n'.join(lines[start:]);end=re.search(r'(?m)^## Contact Parkezi|^## Contact PARKEZI|^First Name(?: |\\)|^\[!\[Parkezi logo',body)
 return body[:end.start()].strip() if end else body.strip()
intent={
 'home':'Approved redesign: content reorganised into systems, products, support, dashboard, projects, reviews and FAQs. Old diagram removed on request; useful system details retained on the system pages.',
 'about-us':'Source software capabilities, in-house tailoring, supported sites and Australian ownership retained/reworded. Portable payments restored. Repeated philosophy/diagram marketing consolidated; unverified99.9% accuracy omitted.',
 'systems':'Three source system configurations, original menu imagery and full comparison retained; details available on the linked dedicated system pages.',
 'pricing':'Outright/monthly maintenance,24-36month rent-to-own, setup/updates/support retained. Full-service Smart Access installation, site works and standalone training restored.',
 'testimonials':'Intentional exception: unverified named source testimonials are not republished as real proof. Approved labelled sample cards and Google link remain.',
 'success/newsletter':'Intentional exception: no false successful-subscription confirmation while delivery is unconnected.',
 'integrations/selea':'Intentional exception: original wrongly contains Purchase Plans; replaced with compatibility enquiry, no invented guarantee.',
 'products/info-board':'Intentional exception: source wrongly shows Express Pay artwork/copy and lacks display specifications. Information-display enquiry retained with shared system information; no invented unit specs.',
 'services/maintenance':'Intentional exception: original Need some text here placeholder replaced by source-backed maintenance/support facts.',
 'faqs':'All13 source topics retained. Step and Go typo corrected to Step & Pay; unverified uptime/future-region claim omitted; fees qualified. These deliberate source corrections are recorded.',
 'contact':'Source contact channels/hours and three offices retained in the shared form/office selector. Original successful-submit message is intentionally not claimed by unconnected preview forms.'}
rows=[];unmapped=[]
for p in pages:
 source=Path('content/source-site')/(p['sourcePath'].replace('/','__')+'.json');raw=json.loads(source.read_text());file=root/'index.html' if p['sourcePath']=='home' else root/p['sourcePath']/'index.html'
 assert file.is_file(),file
 target=BeautifulSoup(file.read_text(),'html.parser');main=target.main;after_main=BeautifulSoup(str(main),'html.parser');
 if p['sourcePath']!='contact':
  enquiry=after_main.find(id='enquire')
  if enquiry:enquiry.decompose()
 after=after_main.get_text('\n',strip=True);before=before_main(raw['markdown'])
 if p['sourcePath']=='contact':
  lines=raw['markdown'].splitlines();start=next((i for i,l in enumerate(lines) if l.startswith('# ')),0);before='\n'.join(lines[start:]);cut=re.search(r'(?m)^\[!\[Parkezi logo',before);before=before[:cut.start()] if cut else before;after+='\nOffice-selector data (rendering unverified):\n'+json.dumps(json.loads(Path('content/office-details.json').read_text()),indent=2)
 paras=[x.get_text(' ',strip=True) for x in BeautifulSoup(p['bodyHtml'],'html.parser').select('p,li') if len(x.get_text(' ',strip=True))>=55]
 target_norm=norm(main.get_text(' ',strip=True));missing=[x for x in paras if norm(x) not in target_norm]
 preserved_kind=p['kind'] in ['article','project','legal','editorial','integration','about-us'] or (p['kind']=='service' and p['sourcePath'] not in ['services/paid-parking','services/two-way','services/one-way'])
 if preserved_kind and missing:unmapped.append({'route':p['route'],'paragraphs':missing})
 product=p['sourcePath'].startswith('products/')
 sections={k:bool(main.find(id=k)) for k in ['features','products','support','platform','faqs']}
 if product:assert all(sections.values()),(p['sourcePath'],sections)
 faq_count=len(main.select('#faqs details'))
 treatment=intent.get(p['sourcePath'],'Source body/lead retained with current links and shorter headings.' if preserved_kind else 'Captured content curated for the approved redesign; source and target text included below for direct review.')
 if product:treatment+=' Shared system features, SolarGate, installation/support, dashboard and source FAQs are present. Step screen labels remain neutral pending dimension confirmation.'
 if p['sourcePath'] in ['services/paid-parking','services/two-way','services/one-way']:treatment='Original menu/system photograph restored. Source access rules, ANPR entry/exit, induction-loop exit, compatible barriers, live occupancy or direct revenue facts retained on the relevant configuration page.'
 rows.append({'sourcePath':p['sourcePath'],'sourceUrl':p['sourceUrl'],'targetUrl':'https://parkezi-v8.vercel.app'+p['route'],'sourceCaptureFile':str(source),'sourceCaptureSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'targetFile':str(file),'targetSha256':hashlib.sha256(file.read_bytes()).hexdigest(),'kind':p['kind'],'sourceHeadings':re.findall(r'^#{1,4}\s+(.+)$',before,re.M),'targetHeadings':[h.get_text(' ',strip=True) for h in main.select('h1,h2,h3,h4')],'capturedBodyParagraphsChecked':len(paras),'capturedBodyParagraphsPresent':len(paras)-len(missing),'paragraphDifferences':missing,'paragraphMethod':'Exact normalised match of curated source p/li units, not a semantic/browser verdict','productSections':sections if product else None,'faqCount':faq_count,'treatment':treatment,'beforeMarkdown':before,'afterText':after,'httpBrowserStatus':'NOT TESTED: current browser/device controls unavailable; this snapshot is generated target HTML, not a live browser crawl.'})
assert len(rows)==52
assert not unmapped,unmapped
findings=[
 {'id':'CONTENT-01','severity':'P1','status':'FIXED IN SOURCE','scope':'All6 product routes','finding':'Several generated product pages omitted the original shared system-features table and had no FAQ block.','fix':'Restored shared table and source FAQ topics; retained product-specific Express/SolarGate/Step questions.'},
 {'id':'CONTENT-02','severity':'P1','status':'FIXED IN SOURCE','scope':'All6 product routes','finding':'Product templates lacked the approved installation/support and dashboard sections.','fix':'Ordered related product/SolarGate, support, dashboard and FAQs consistently.'},
 {'id':'CONTENT-03','severity':'P1','status':'FIXED IN SOURCE','scope':'Pricing/About/system configurations','finding':'Condensed copy omitted useful installation partner/site-work/training details, temporary integrated payments, loop exit, occupancy and barrier facts.','fix':'Restored these captured facts without reintroducing conflicting numeric proof.'},
 {'id':'CONTENT-04','severity':'P2','status':'FIXED IN SOURCE','scope':'Paid/Two-Way/One-Way','finding':'People/exhibition hero images did not represent the system type.','fix':'Reused the exact original menu photos as lossless WebP derivatives.'},
 {'id':'CONTENT-05','severity':'P1','status':'PENDING CONFIRMATION','scope':'Step & Pay','finding':'User gave uncertain7.4-inch versus earlier34-inch size.','fix':'Standard/Larger screen UI has no numeric size claim; original artwork retained.'},
 {'id':'CONTENT-07','severity':'P2','status':'FIXED IN SOURCE','scope':'Step & Pay/homepage','finding':'Native model selector and reused larger artwork did not meet the requested custom UI/generated-image treatment.','fix':'Custom animated listbox and ChatGPT transparent model illustration; both homepage units share one hover target, genuine Quest photos added.'},
 {'id':'CONTENT-06','severity':'P1','status':'BLOCKED','scope':'All routes/browser journeys','finding':'No current cloud/Chrome/simulator controls are available.','fix':'Do not call this a visual, live-runtime or independent review. Actual selector/menu/mobile/font wrapping checks remain unverified.'}]
report={'event':'parkezi:2026-11-03:product-models-sections-content-audit:v1','method':'Owner comparison of original captured content and generated target HTML; deliberate redesign, not visual parity','sourceSnapshot':'1November2026:11 Firecrawl and41 direct public HTTP captures','targetSnapshot':'Current3November2026 local build; target file hashes bind exact content','routeCount':52,'originalSitemapRoutesIncluded':45,'unmappedPreservedParagraphs':unmapped,'findings':findings,'intentionalExceptions':'Source placeholder text, mismatched vendor/product copy, unsupported accuracy/uptime guarantees, unverified testimonials and false form-success claims are deliberately not copied. No prices/specification downloads invented.','browserStatus':'BLOCKED: no supported browser host/device controls; no screenshots fabricated. Existing2/2 independent review cap exhausted.','rows':rows}
(out/'before-after.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n')
md=['# PARKEZI before/after content audit','','This is an owner source-content audit, not independent or visual QA. All52 captured routes are compared with current generated target HTML. All45 source sitemap routes are included. The original capture is retained; no repeated crawl or invented screenshot.','','## Findings','']
for f in findings:md.append(f"- **{f['id']} {f['status']}** - {f['scope']}: {f['finding']} {f['fix']}")
md+=['','## Complete route matrix','','Exact paragraph matches check preserved curated p/li units, not every wording choice or runtime state. The HTML report includes the captured original and current page text side by side for every route. Intentional corrections remain explicit.','','| Source route | Type | Body units present | FAQs | Treatment |','| --- | --- | --- | --- | --- |']
for r in rows:md.append(f"| [{r['sourcePath']}]({r['sourceUrl']}) | {r['kind']} | {r['capturedBodyParagraphsPresent']}/{r['capturedBodyParagraphsChecked']} | {r['faqCount']} | {r['treatment']} |")
md+=['','## Limits','','No current rendered desktop/mobile/font-loaded wrapping or dropdown interaction result is claimed. Hosted content behind the gate was not crawled through an invented session. The52-route local comparison and exact file hashes are complete; live visual/semantic owner acceptance remains open. The review cap has not been reset.']
(out/'REPORT.md').write_text('\n'.join(md)+'\n')
entries=''.join('<details class="route"><summary>'+html.escape(r['sourcePath'])+' <small>'+html.escape(r['kind'])+'</small></summary><p>'+html.escape(r['treatment'])+'</p><p><a href="'+html.escape(r['sourceUrl'])+'">Original source</a> · <a href="'+html.escape(r['targetUrl'])+'">Redesigned route</a></p><div class="columns"><section><h2>Before: captured original</h2><pre>'+html.escape(r['beforeMarkdown'])+'</pre></section><section><h2>After: current build</h2><pre>'+html.escape(r['afterText'])+'</pre></section></div></details>' for r in rows)
page='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>PARKEZI content comparison</title><style>body{margin:0;padding:32px;background:#f3f5f7;color:#202b34;font:16px/1.6 system-ui}main{max-width:1500px;margin:auto}h1{font-size:36px;line-height:1.2}h2{font-size:22px}input{font:inherit;font-size:max(1rem,16px);padding:14px;width:100%;box-sizing:border-box;margin:20px 0}.route{padding:22px;margin:14px 0;background:white;border:1px solid #d9e1e7;border-radius:10px}summary{cursor:pointer;font-size:20px;font-weight:600}small{font-weight:400;color:#657581}.columns{display:grid;grid-template-columns:1fr 1fr;gap:24px}.columns section{min-width:0;border-top:1px solid #ddd}pre{white-space:pre-wrap;overflow-wrap:anywhere;font:15px/1.7 system-ui}a{color:#234c6b}@media(max-width:800px){body{padding:20px}.columns{grid-template-columns:1fr}}</style></head><body><main><h1>PARKEZI content comparison</h1><p>All52 captured source routes against the current local build. Original1November2026 capture; target3November2026. Owner source audit only. Live browser and simulator verification is blocked. Intentional source corrections are documented, not silently treated as missing content.</p><label for="filter">Find a route or topic</label><input id="filter" type="search" placeholder="Search the comparison"><div>'''+entries+'''</div></main><script>document.querySelector('#filter').addEventListener('input',e=>{const q=e.target.value.toLowerCase();document.querySelectorAll('.route').forEach(d=>d.hidden=!d.textContent.toLowerCase().includes(q));});</script></body></html>'''
(out/'before-after.html').write_text(page)
print(json.dumps({'routes':len(rows),'preservedParagraphUnits':sum(r['capturedBodyParagraphsPresent'] for r in rows),'unmappedRichBodyParagraphs':len(unmapped),'productPages':sum(r['productSections'] is not None for r in rows),'report':str(out/'REPORT.md'),'comparison':str(out/'before-after.html')}))
