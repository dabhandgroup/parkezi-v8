import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

// Keep the approved HTML site and its components. Content is edited in site-pages.json.
const data = JSON.parse(await readFile('content/site-pages.json','utf8'));
const pages = data.pages;
const byPath = new Map(pages.map(p => [p.sourcePath,p]));
const base = await readFile('dist/express-pay.html','utf8');
const home = await readFile('dist/index.html','utf8');
const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plain = html => html.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name==='calendar'?'list':name}"></use></svg>`;
const link = p => p.sourcePath === 'home' ? '/' : `/${p.sourcePath}/`;
function section(html,id) {
  const start = new RegExp(`<section\\b[^>]*\\bid=["']${id}["'][^>]*>`).exec(html);
  if (!start) throw new Error(`Missing approved section: ${id}`);
  const tags=/<\/?section\b[^>]*>/g;tags.lastIndex=start.index;let depth=0,m;
  while ((m=tags.exec(html))) {depth+=m[0].startsWith('</')?-1:1;if(!depth)return html.slice(start.index,tags.lastIndex);}
  throw new Error(`Unclosed section: ${id}`);
}
const enquiry = section(base,'enquire');
const products = section(base,'products');
const comparison = section(base,'features');
const systemCards = section(home,'systems');
const support = section(home,'support');
const installations = await readFile('content/product-installations.html','utf8');
const platform = section(home,'platform');
const productFaqs = JSON.parse(await readFile('content/product-faqs.json','utf8'));
function productQuestions(p) { return p.sourcePath==='products/solargate-mobile-boom-gate' ? [...productFaqs.solar,...productFaqs.common] : productFaqs.common; }
const faqIcon = '<svg class="faq-icon icon" aria-hidden="true" focusable="false"><use href="#i-plus"></use></svg>';
function productFaqBlock(p) {
  const questions=productQuestions(p);
  const more=questions.length>6?'<button class="faq-show-all button button-outline" type="button" aria-expanded="false">Show all questions</button>':'';
  return `<section class="section wrap product-faqs" id="faqs"><div class="section-header"><h2>Product questions</h2></div><div class="faq-list faq-items">${questions.map((q,i)=>`<details${i>=6?' data-extra-faq hidden':''}><summary>${esc(q.question)}${faqIcon}</summary>${q.paragraphs.map(t=>`<p>${esc(t)}</p>`).join('')}</details>`).join('')}${more}</div></section>`;
}
const reviewCards = [...home.matchAll(/<article class="review-card\b[\s\S]*?<\/article>/g)].slice(0,4).map(m=>m[0].replace(' swiper-slide','')).join('');
if ((reviewCards.match(/<article /g)||[]).length!==4) throw new Error('Expected four approved sample cards');
const crumb = p => `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span aria-current="page">${esc(p.title)}</span></nav>`;
const actions = () => `<div class="content-hero-actions"><a class="button button-dark" href="#enquire">Discuss your site ${icon('arrow')}</a><a class="button button-outline" href="tel:1300309998">${icon('phone')}1300 309 998</a></div>`;
function hero(p,{noImage=false}={}) {
  const lead = p.kind==='newsletter' ? 'News, product updates and practical parking information from PARKEZI.' : p.lead;
  if(noImage || !p.image)return `<section class="content-intro wrap" id="home">${crumb(p)}<h1>${esc(p.title)}</h1>${p.date?`<p class="article-date">${esc(p.date)}</p>`:''}<p class="hero-lead">${esc(lead)}</p></section>`;
  return `<section class="content-hero wrap" id="home"><div class="content-hero-copy">${crumb(p)}<h1>${esc(p.title)}</h1><p class="hero-lead">${esc(lead)}</p>${actions()}</div><figure class="content-hero-media${p.imageKind==='logo'?' is-logo':''}"><img src="/${p.image}" alt="${esc(p.imageAlt||p.title)}" fetchpriority="high" decoding="async">${p.kind==='about-us'?'<figcaption>The PARKEZI team at an industry exhibition.</figcaption>':''}</figure></section>`;
}
function cards(list,label) {
  return `<div class="site-card-grid">${list.map(p=>`<a class="site-card" href="${link(p)}"><div class="site-card-media${p.imageKind==='logo'?' is-logo':''}"><img src="/${p.image}" alt="${esc(p.imageAlt||p.title)}" loading="lazy" decoding="async"></div><div class="site-card-copy">${p.date?`<span class="article-date">${esc(p.date)}</span>`:''}<h2>${esc(p.title)}</h2><p>${esc(p.lead.length>210?p.lead.slice(0,207).replace(/\s+\S*$/,'')+'...':p.lead)}</p><span class="text-link">${label} ${icon('arrow')}</span></div></a>`).join('')}</div>`;
}
function editorial(p,body=p.bodyHtml) {
  return `<section class="section wrap"><div class="article-layout"><div class="article-body">${body}</div><aside class="article-aside"><h2>Talk about your site</h2><p>Discuss access, payments and the setup your car park needs.</p><a class="button button-dark" href="#enquire">Contact PARKEZI ${icon('arrow')}</a><a class="text-link" href="/systems/">Explore systems ${icon('arrow')}</a></aside></div></section>`;
}
function splitSections(body) {
  const chunks=body.split(/(?=<h2>)/).filter(s=>plain(s));
  return chunks.map((chunk,i)=>{
    const match=/<h2>([\s\S]*?)<\/h2>/.exec(chunk);
    return `<section class="section${i%2?' tinted-section':''}"><div class="wrap editorial-split"><h2>${match?match[1]:'Your parking setup'}</h2><div class="editorial-copy">${match?chunk.replace(match[0],''):chunk}</div></div></section>`;
  }).join('');
}
const systemInfo={
 'services/paid-parking':{title:'Payments and access',text:'Designed for parking environments requiring payment integration. Manage parking fees with ticketless payment stations, payment gateways and remote access. Whitelist rules give registered users access alongside paying visitors.',items:['ANPR, QR codes and NFC access options','Tariffs and free-parking periods configured for your site','Visitor payments alongside staff and resident access','Parking revenue paid to your account, less processing fees'],fit:'Parking stations, shopping centres and hotels',related:'express-pay'},
 'services/two-way':{title:'Control entry and exit',text:'Manage authorised vehicles in both directions. PARKEZI Two-Way supports controlled access at gated communities, office complexes and other sites where entry and exit need to be managed.',items:['Number plate recognition for authorised vehicles','Access rules for residents, staff and visitors','Control security gates, boom gates and garage doors','Live occupancy and vehicle counts','Cloud management and reporting'],fit:'Office complexes, residential buildings and industrial sites',related:'scan-and-go'},
 'services/one-way':{title:'A simpler access setup',text:'A straightforward system focused on entry access control. Use number plate recognition to manage authorised vehicle entry, with a setup matched to how your site operates.',items:['ANPR entry for registered vehicles','Site-specific access rules','Induction-loop opening on exit','Cloud-based access management'],fit:'Small businesses, caravan parks and visitor parking',related:'scan-and-go-mini'}
};
function systemEnquiry(p) {
  let form = /<form\b[^>]*id="enquiryForm"[\s\S]*?<\/form>/.exec(enquiry)?.[0];
  if (!form) throw new Error('Missing approved enquiry form');
  const address = /<label\b[^>]*>\s*Address\s*\*[\s\S]*?<\/label>/i.exec(form)?.[0];
  const attachments = /<div class="attachment-field">[\s\S]*?(?=<div class="form-bottom">)/.exec(form)?.[0];
  if (!address || !attachments) throw new Error('Missing optional enquiry details');
  form = form.replace('id="enquiryForm"',`id="enquiryForm" data-system-enquiry data-system="${esc(p.title)}" aria-labelledby="systemEnquiryTitle"`)
    .replace('<div class="form-fields">',`<input type="hidden" name="system" value="${esc(p.title)}"><div class="form-fields">`)
    .replace(address,'')
    .replace(attachments,`<details class="system-form-details"><summary>Add site details or files ${icon('plus')}</summary><div class="system-form-extras"><div class="form-fields">${address.replace(/Address\s*\*/,'Site address (optional)').replace(/\srequired(?:="")?/,'')}</div>${attachments}</div></details>`)
    .replace('placeholder="First name"','placeholder="James"')
    .replace('placeholder="Last name"','placeholder="Bond"')
    .replace('placeholder="Email address"','placeholder="jamesbond@email.com"')
    .replace('placeholder="Phone number"','placeholder="0412 345 678" inputmode="tel" pattern="[0-9 ]{7,22}"')
    .replace('rows="4"','rows="2"')
    .replace('Tell us about your site or what you need','Site location, spaces and access needs')
    .replace('By submitting this form, you accept Parkezi’s','Please read our')
    .replace('<div class="form-bottom">','<div class="form-bottom"><p class="system-form-availability">Online enquiries are currently unavailable. <a href="tel:1300309998">Call us</a> or <a href="mailto:info@parkezi.com.au">email our team</a>.</p>');
  return `<div class="system-enquiry-card" id="enquire"><h2 id="systemEnquiryTitle">Discuss your site</h2><p class="system-form-intro">Tell us what your car park needs.</p>${form}</div>`;
}
function systemHero(p,s) {
  const highlights = {
    'services/paid-parking':['Ticketless visitor payments','Access for staff and registered vehicles','Site-specific tariffs and free-parking periods'],
    'services/two-way':['ANPR entry and exit for authorised vehicles','Access rules for residents, staff and visitors','Live occupancy and vehicle counts'],
    'services/one-way':['Number plate recognition on entry','Site-specific vehicle access rules','Induction-loop opening on exit']
  }[p.sourcePath];
  return `<section class="system-hero wrap" id="home"><div class="system-hero-copy">${crumb(p)}<h1>${esc(p.title)}</h1><p class="hero-lead">${esc(p.lead)}</p><ul class="system-hero-highlights">${highlights.map(t=>`<li>${icon('check')}<span>${esc(t)}</span></li>`).join('')}</ul><p class="system-hero-fit"><strong>Suited to</strong> ${esc(s.fit)}.</p></div>${systemEnquiry(p)}<figure class="system-hero-media"><img src="/${p.image}" alt="${esc(p.imageAlt||p.title)}" fetchpriority="high" decoding="async"><figcaption>Explore the setup for your site. <a href="/systems/">Compare systems ${icon('arrow')}</a></figcaption></figure></section>`;
}
function systemContact() {
  return `<section class="system-footer-cta" id="contact-details" aria-labelledby="systemCtaTitle"><div class="wrap system-footer-cta-grid"><div><h2 id="systemCtaTitle">Let’s talk parking.</h2><p>Discuss access, payments and the setup your car park needs.</p></div><div class="system-footer-cta-actions"><div class="system-footer-cta-buttons"><a class="button button-dark" href="#enquire">Discuss your site ${icon('arrow')}</a><a class="button button-outline" href="tel:1300309998">${icon('phone')}1300 309 998</a></div><a class="system-footer-cta-email" href="mailto:info@parkezi.com.au">${icon('mail')}info@parkezi.com.au</a></div></div></section>`;
}
const hardware={
 'products/scan-and-go':{subtitle:'Number plate access control',images:[['scan-go.webp','Scan & Go access control unit',true],['parkezi-anpr-unit-detail.webp','PARKEZI ANPR equipment at an industry exhibition',false],['parkezi-driveway-access-overview.webp','PARKEZI payment and access equipment at a vehicle entrance',true],['parkezi-driveway-access-detail.webp','PARKEZI access-control equipment beside a driveway',true]],highlights:['Self-contained access control unit','ANPR identification of whitelisted vehicles','Entry or exit access control'],body:'<h2>Recognise authorised vehicles</h2><p>Scan & Go is a self-contained system for entry or exit access control. Its ANPR camera identifies whitelisted vehicles so access can be managed around the users and rules at your site.</p><h2>Connected access</h2><p>Use PARKEZI to manage vehicle permissions and access rules. Talk to the team about camera positioning, your existing barriers and the configuration your site needs.</p>'},
 'products/scan-and-go-mini':{subtitle:'Access control for tighter spaces',images:[['scan-go-mini.webp','Scan & Go Mini camera and controller',true],['mini-camera.webp','Scan & Go Mini camera',true],['mini-controller.webp','Scan & Go Mini controller',true]],highlights:['Compact ANPR access control','Separate camera and control components','Suitable for limited-space locations'],body:'<h2>A compact configuration</h2><p>Scan & Go Mini offers the benefits of Scan & Go in a configuration suited to limited-space areas. Its compact components let you plan camera and controller placement around the entrance.</p><h2>Plan the placement</h2><p>Speak to PARKEZI about the available mounting space, existing equipment and access rules. The team can help assess the configuration for your site.</p>'},
 'products/solargate-mobile-boom-gate':{subtitle:'Portable, solar-powered access',images:[['solargate-portable-barrier.webp','SolarGate+ portable barrier with solar panel',true],['solar-gate-closed.webp','SolarGate+ portable barrier in its closed position',true]],highlights:['Solar-powered operation','Mobile barrier for temporary sites','Can be paired with PARKEZI ANPR'],body:null}
};
function productPage(p) {
  const h=hardware[p.sourcePath];const n=h.images.length;const body=(h.body||p.bodyHtml).replace(/<p>Frequently Asked Questions\s*<\/p>[\s\S]*?(?=<h2>Discuss your site<\/h2>)/i,'');
  return `<section class="pdp-top wrap source-product-lead" id="home"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/#products">Products</a><span>/</span><span aria-current="page">${esc(p.title)}</span></nav><div class="pdp-grid"><div class="pdp-gallery"><div class="gallery-track" id="productGallery" tabindex="0" aria-label="${esc(p.title)} image gallery. Swipe or use arrow keys to explore">${h.images.map(([src,alt,contain],i)=>`<div class="gallery-slide${contain?' contain':''}" role="group" aria-label="${i+1} of ${n}"><button class="gallery-zoom" data-gallery-zoom="${i}" type="button" aria-label="Enlarge ${esc(alt)}"><img src="/assets/${src}" alt="${esc(alt)}" ${i?'loading="lazy"':'fetchpriority="high"'} decoding="async"></button></div>`).join('')}</div><div class="gallery-controls"><span id="galleryCaption" aria-live="polite">${esc(h.images[0][1])}</span><div><button data-gallery-prev type="button" aria-label="Previous product image">${icon('chevron')}</button><button data-gallery-next type="button" aria-label="Next product image">${icon('chevron')}</button></div></div><div class="gallery-thumbs" aria-label="${esc(p.title)} images">${h.images.map(([src,alt,contain],i)=>`<button class="gallery-thumb${contain?' contain':''}" data-gallery-thumb="${i}" aria-pressed="${i===0}" type="button" aria-label="Show ${esc(alt)}"><img src="/assets/${src}" alt="" loading="lazy"></button>`).join('')}</div></div><div class="pdp-summary"><div class="pdp-heading"><h1>${esc(p.title)}</h1><p class="pdp-subtitle">${esc(h.subtitle)}</p></div><p class="pdp-description">${esc(p.lead)}</p><ul class="pdp-highlights">${h.highlights.map(t=>`<li>${icon('check')}<span>${esc(t)}</span></li>`).join('')}</ul><div class="pdp-actions"><a class="button button-dark" href="#enquire">Discuss your site ${icon('arrow')}</a><a class="button button-outline" href="tel:1300309998">${icon('phone')}1300 309 998</a></div><p class="pdp-configuration">Configured for your site. <a href="/installation/">Installation and support ${icon('arrow')}</a></p></div></div></section><nav class="product-subnav" aria-label="Product page navigation"><div class="wrap"><strong>${esc(p.title)}</strong><a href="#overview">Overview</a><a href="/systems/">System options</a><a href="#enquire">Contact ${icon('arrow')}</a></div></nav><div id="overview">${splitSections(body)}</div>${installations}${comparison}${products}${support}${platform}${productFaqBlock(p)}`;
}
async function content(p) {
  switch(p.kind){
    case 'product': return productPage(p);
    case 'about-us': {
      const chunks=p.bodyHtml.split(/(?=<h2>)/).filter(Boolean);
      return hero(p)+splitSections(chunks.slice(0,2).join(''))+`<section class="wrap about-photo-grid" aria-label="Meet the PARKEZI team"><img src="/assets/parkezi-team-at-exhibition.webp" alt="PARKEZI team member at an industry exhibition" loading="lazy"><img src="/assets/parkezi-team-advice.webp" alt="PARKEZI team speaking with an exhibition visitor" loading="lazy"></section>`+splitSections(chunks.slice(2).join(''));
    }
    case 'pricing': return hero(p)+`<section class="section wrap"><div class="plan-grid"><article class="plan-card">${icon('card')}<h2>Outright ownership</h2><p>Buy the system with a one-time payment and a monthly maintenance fee.</p><a class="button button-dark" href="#enquire">Discuss a purchase ${icon('arrow')}</a></article><article class="plan-card">${icon('calendar')}<h2>Rent to own</h2><p>Rent the system on a plan that allows you to own it after 24 to 36 months.</p><a class="button button-outline" href="#enquire">Discuss a plan ${icon('arrow')}</a></article></div></section><section class="section tinted-section"><div class="wrap"><div class="section-header"><h2>Included in each plan</h2></div><div class="feature-note-grid"><article class="feature-note"><h3>System setup</h3><p>Site setup and system configuration.</p></article><article class="feature-note"><h3>Software updates</h3><p>Updates for your PARKEZI software.</p></article><article class="feature-note"><h3>Ongoing support</h3><p>Support through the Plan Preventative Maintenance scheme.</p></article></div></div></section><section class="section wrap"><div class="editorial-split"><h2>Installation choices</h2><div class="editorial-copy"><p>PARKEZI partners with Smart Access Solutions for full-service installation, including site assessment, formwork, electrical work and product installation. If your business has its own installation capability, purchase a standalone system and receive training. Discuss your site and requirements to work out the setup and costs.</p><a class="text-link" href="/installation/">Explore installation ${icon('arrow')}</a></div></div></section>`;
    case 'systems': return hero(p)+systemCards.replace('id="systems"','id="system-options"')+comparison;
    case 'service': {
      const s=systemInfo[p.sourcePath];
      return (s?systemHero(p,s):hero(p))+(s?`<section class="section wrap"><div class="editorial-split"><h2>${s.title}</h2><div class="editorial-copy"><p>${s.text}</p><ul>${s.items.map(t=>`<li>${t}</li>`).join('')}</ul><p><strong>Suitable sites:</strong> ${s.fit}.</p><a class="text-link" href="/products/${s.related}/">Explore the hardware ${icon('arrow')}</a></div></div></section><section class="section tinted-section"><div class="wrap editorial-split"><h2>Configure your system</h2><div class="editorial-copy"><p>Your traffic flow, users, access rules and existing hardware help determine the setup. PARKEZI can assess the site and configure the software around your requirements.</p><a class="text-link" href="/systems/">Compare system features ${icon('arrow')}</a></div></div></section>`:splitSections(p.bodyHtml))+(p.sourcePath==='services/integrations'?`<section class="section wrap"><div class="section-header"><h2>Integration options</h2></div>${cards(pages.filter(q=>q.kind==='integration'),'Explore integration')}</section>`:'');
    }
    case 'our-work': return hero(p,{noImage:true})+`<section class="section wrap">${cards(pages.filter(q=>q.kind==='project'),'View project')}</section>`;
    case 'blog': return hero(p,{noImage:true})+`<section class="section wrap">${cards(pages.filter(q=>q.kind==='article').sort((a,b)=>new Date(b.date)-new Date(a.date)),'Read article')}</section>`;
    case 'article': return hero({...p,image:''},{noImage:true})+`<figure class="article-cover wrap"><img src="/${p.image}" alt="${esc(p.imageAlt)}" fetchpriority="high"></figure>`+editorial(p);
    case 'project': return hero(p)+(p.bodyHtml?editorial(p):`<section class="section wrap"><a class="text-link" href="/our-work/">View more PARKEZI projects ${icon('arrow')}</a></section>`);
    case 'faqs': {
      const faqs=p.faqs;
      return hero(p,{noImage:true})+`<section class="section wrap"><div class="content-faq-list faq-items">${faqs.map(q=>`<details><summary>${esc(q.question)}${faqIcon}</summary><div>${q.paragraphs.map(t=>`<p>${esc(t)}</p>`).join('')}</div></details>`).join('')}</div></section>`;
    }
    case 'testimonials':return hero(p,{noImage:true})+`<section class="section wrap"><div class="section-header"><div class="google-subline"><img src="/assets/google.svg" alt="Google" width="28" height="28"><span>reviews</span></div><a class="google-button" href="https://share.google/VfGvd0vTujh7s6tyS" target="_blank" rel="noopener">View PARKEZI on Google ${icon('arrow')}</a></div><div class="site-review-grid">${reviewCards}</div></section>`;
    case 'contact':return hero(p,{noImage:true});
    case 'newsletter':return hero(p,{noImage:true})+`<section class="section wrap"><div class="editorial-split"><h2>Stay in touch</h2><div class="editorial-copy"><p>Follow PARKEZI on LinkedIn for news and updates, or contact the team with a question about your site.</p><a class="button button-dark" href="https://www.linkedin.com/company/parkezi/" target="_blank" rel="noopener">PARKEZI on LinkedIn ${icon('arrow')}</a></div></div></section>`;
    case 'legal':return hero(p,{noImage:true})+`<section class="section wrap"><div class="article-body legal-copy">${p.bodyHtml}</div></section>`;
    default:return hero(p)+editorial(p)+(p.sourcePath.startsWith('products/')?installations+comparison+products+support+platform+productFaqBlock(p):'');
  }
}
function absolute(html) {
  return html.replace(/\b(href|src|poster)=(['"])([^'"]+)\2/g,(m,attr,quote,url)=>{
    const systemLinks={'/systems#paid-parking':'/services/paid-parking/','/systems#two-way-parking':'/services/two-way/','/systems#one-way-parking':'/services/one-way/'};
    if(systemLinks[url])return `${attr}=${quote}${systemLinks[url]}${quote}`;
    if(/^(#|\/|mailto:|tel:|data:|https?:)/.test(url)){
      if(/^https?:\/\/(?:www\.)?parkezi\.com\.au(?:\/|$)/i.test(url)){
        const parsed=new URL(url);return `${attr}=${quote}${parsed.pathname}${parsed.search}${parsed.hash}${quote}`;
      }return m;
    }
    return `${attr}=${quote}/${url.replace(/^\.\.\//,'')}${quote}`;
  }).replace(/(<a\b[^>]*href=["']\/(?!\/)[^"']*["'][^>]*)(?:\s+target=["']_blank["'])([^>]*>)/g,'$1$2');
}
function document(p,main){
  let prefix=base.slice(0,base.indexOf('<main'));
  let suffix=base.slice(base.indexOf('</main>')+7);
  if(systemInfo[p.sourcePath]) suffix=suffix.replace('</body>','<script type="module" src="/system-enquiry.js"></script></body>');
  prefix=prefix.replace(/<title>[\s\S]*?<\/title>/,`<title>${esc(p.metaTitle||p.title+' | PARKEZI')}</title>`)
    .replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${esc(p.description||p.lead)}">`)
    .replace(/<link rel="preload"[^>]*as="image"[^>]*>/g,'')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g,'')
    .replace(/<body[^>]*>/,`<body class="design-v7 content-page${p.kind==='product'?' product-page':''}">`);
  if(p.kind!=='product')suffix=suffix.replace(/<div class="mobile-product-cta">[\s\S]*?<\/div>/,'');
  const schema={"@context":"https://schema.org","@type":p.kind==='article'?'Article':p.kind==='product'?'Product':'WebPage',name:p.title,description:p.description||p.lead,url:`https://www.parkezi.com.au${link(p)}`};
  if(p.image)schema.image=`https://www.parkezi.com.au/${p.image}`;
  if(p.kind==='article'){schema.headline=p.title;schema.author={"@type":"Organization",name:"PARKEZI"};if(p.date&&!isNaN(Date.parse(p.date)))schema.datePublished=new Date(p.date).toISOString().slice(0,10);}
  if(p.kind==='product')schema.brand={"@type":"Brand",name:"PARKEZI"};
  const structured=p.sourcePath.startsWith('products/') ? {'@context':'https://schema.org','@graph':[schema, {'@type':'FAQPage',mainEntity:productQuestions(p).map(q=>({'@type':'Question',name:q.question,acceptedAnswer:{'@type':'Answer',text:q.paragraphs.join(' ')}}))}]} : schema;
  prefix=prefix.replace('</head>',`<script type="application/ld+json">${JSON.stringify(structured).replace(/</g,'\\u003c')}</script></head>`);
  return absolute(`${prefix}<main id="main">${main}${systemInfo[p.sourcePath]?systemContact():enquiry}</main>${suffix}`);
}
let generated=0;
for(const p of pages){
  if(p.kind==='existing'){
    if(p.sourcePath==='home')continue;
    const source=p.sourcePath==='products/express-pay'?'express-pay.html':'step-pay.html';
    const target=`dist/${p.sourcePath}/index.html`;await mkdir(path.dirname(target),{recursive:true});await writeFile(target,absolute(await readFile(`dist/${source}`,'utf8')));generated++;continue;
  }
  const target=`dist/${p.sourcePath}/index.html`;await mkdir(path.dirname(target),{recursive:true});await writeFile(target,document(p,await content(p)));generated++;
}
await writeFile('content/route-coverage.json',JSON.stringify({capturedSource:'https://www.parkezi.com.au',sourceRoutes:pages.length,generatedRoutes:generated,entries:pages.map(p=>({source:p.sourceUrl,preview:link(p),file:p.sourcePath==='home'?'dist/index.html':`dist/${p.sourcePath}/index.html`,kind:p.kind,sourceSha256:p.sourceSha256}))},null,2)+'\n');
console.log(`Prepared ${generated} content routes from ${pages.length} captured source pages.`);
