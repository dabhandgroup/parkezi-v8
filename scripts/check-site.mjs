import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('dist');
async function walk(dir){const result=[];for(const item of await readdir(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory())result.push(...await walk(file));else result.push(file);}return result;}
const files=await walk(root),htmlFiles=files.filter(f=>f.endsWith('.html'));
const documents=new Map(await Promise.all(htmlFiles.map(async f=>[f,await readFile(f,'utf8')])));
const coverage=JSON.parse(await readFile('content/route-coverage.json','utf8'));
assert.equal(coverage.entries.length,52);
assert.equal(new Set(coverage.entries.map(e=>e.preview)).size,52);
assert.equal(htmlFiles.length,58);
let references=0,schemas=0;
for(const [file,html] of documents){
 const name=path.relative(root,file);
 assert.match(html,/<meta name="robots" content="noindex,nofollow">/,name);
 assert.match(html,/<meta name="description" content="[^"]+"/,name);
 assert.match(html,/<title>[^<]+<\/title>/,name);
 const ids=[...html.matchAll(/\sid=["']([^"']+)["']/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,`${name}: duplicate IDs`);
 assert.ok(ids.includes('main')&&ids.includes('home')&&ids.includes('enquire'),`${name}: missing journey target`);
 if(name!=='style-guide/index.html')assert.equal((html.match(/<h1\b/g)||[]).length,1,`${name}: one page heading`);
 const stale=/Hey Blake|Need some text here|ep-why-2\.avif|vehicle-exit\.avif|knight-frank\.avif|\u2014/.exec(html);
 assert.ok(!stale,`${name}: stale content ${stale?.[0]}`);
 if(name!=='style-guide/index.html')assert.ok(!html.includes('class="eyebrow"'),`${name}: decorative label`);
 for(const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){assert.ok(JSON.parse(m[1]));schemas++;}
 const menu=/<div class="mega-products">([\s\S]*?)<\/div><\/div><\/div><\/div>/.exec(html)?.[1]||html.slice(html.indexOf('id="mega-products"'),html.indexOf('id="mega-about"'));
 const families=new Set([...menu.matchAll(/data-product="([^"]+)"/g)].map(m=>m[1]));
 if(/href="(?:\/|\.\.\/)?express-pay\.html"/.test(menu))families.add('express');
 assert.deepEqual([...families].sort(),['express','mini','scan','solar','step'],`${name}: five menu product families`);
 for(const m of html.matchAll(/\b(?:href|src|poster)=["']([^"']+)["']/g)){
  const url=m[1].replaceAll('&amp;','&');
  if(/^(https?:|mailto:|tel:|data:)/.test(url))continue;
  const parsed=new URL(url,'https://preview.invalid/'+path.relative(root,file).replaceAll(path.sep,'/'));
  let target=path.join(root,decodeURIComponent(parsed.pathname));
  try{await access(target);}catch{assert.fail(`${name}: missing ${url}`);}
  if(!path.extname(target))target=path.join(target,'index.html');
  const content=documents.get(target);
  if(parsed.hash&&content)assert.ok(new RegExp(`\\sid=["']${parsed.hash.slice(1).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}["']`).test(content),`${name}: missing fragment ${url}`);
  references++;
 }
}
for(const file of files.filter(f=>f.endsWith('.css'))){
 const css=await readFile(file,'utf8');
 for(const m of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)){
  if(/^(data:|https?:|#)/.test(m[1]))continue;
  const target=m[1].startsWith('/')?path.join(root,m[1]):path.resolve(path.dirname(file),m[1].split('?')[0]);
  await access(target);references++;
 }
}
for(const entry of coverage.entries)assert.ok(documents.has(path.resolve(entry.file)),entry.file);
for(const route of ['paid-parking','two-way','one-way']){
 const html=documents.get(path.join(root,`services/${route}/index.html`));
 assert.match(html,/class="system-hero wrap"/);
 assert.equal((html.match(/id="enquiryForm"/g)||[]).length,1,`${route}: one form only`);
 const hero=html.slice(html.indexOf('class="system-hero wrap"'),html.indexOf('</section>',html.indexOf('class="system-hero wrap"')));
 assert.match(hero,/data-system-enquiry/);assert.match(hero,/id="enquire"/);
 assert.match(hero,/class="system-hero-highlights"/);
 assert.match(hero,/class="system-hero-media"/);
 assert.match(hero,/Online enquiries are currently unavailable/);
 assert.match(hero,/class="system-form-details"/);
 assert.ok(!/<input[^>]*name="address"[^>]*\srequired/.test(hero),`${route}: optional collapsed address cannot block validation`);
 assert.match(html,/<script type="module" src="\/system-enquiry.js"><\/script>/);
 assert.equal((html.match(/class="country-picker|class="phone-input country-picker/g)||[]).length,1,`${route}: one custom country picker`);
}
assert.equal(await readFile('dist/index.html','utf8'),await readFile('dist/home-v2.html','utf8'),'dark home alias');
for(const name of ['express-pay.html','step-pay.html']){
 const html=documents.get(path.join(root,name));const gallery=html.slice(html.indexOf('id="productGallery"')-200,html.indexOf('class="pdp-summary"'));
 const count=(gallery.match(/class="gallery-slide\b/g)||[]).length;
 assert.equal(count,name.startsWith('express')?4:2,`${name}: gallery count`);
 if(name.startsWith('step')){
  assert.match(gallery,/src="assets\/step-pay\.webp/);
  assert.ok(gallery.indexOf('assets/step-pay.webp')<gallery.indexOf('assets/step-pay-wide-generated.webp'));
 }
}
const report={htmlFiles:htmlFiles.length,sourceRoutes:coverage.entries.length,localReferences:references,structuredDataBlocks:schemas,sourceOnlyChecks:true,browserChecks:'UNVERIFIED: no supported current-revision browser evidence; two-pass review cap exhausted'};
console.log(JSON.stringify(report,null,2));
