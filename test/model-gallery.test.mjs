import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

test('custom Step picker supports click, keyboard, dismissal and gallery synchronisation',async()=>{
  const document={activeElement:null,events:{},addEventListener(type,fn){this.events[type]=fn;}};
  const element=()=>({attrs:{},events:{},hidden:false,focus(){document.activeElement=this;},setAttribute(k,v){this.attrs[k]=v;},getAttribute(k){return this.attrs[k];},addEventListener(k,fn){this.events[k]=fn;}});
  const trigger=element(),panel=element(),value={value:'0'},label={textContent:''};
  trigger.attrs['aria-expanded']='false';panel.hidden=true;
  const options=['Standard','Larger screen'].map(text=>{const o=element();o.querySelector=()=>({textContent:text});return o;});
  const gallery=element();gallery.clientWidth=480;gallery.scrollLeft=0;gallery.querySelectorAll=()=>[{dataset:{model:'0'}},{dataset:{model:'1'}}];gallery.scrollTo=({left})=>{gallery.scrollLeft=left;gallery.events.scroll?.();};
  const picker=element();picker.classList={add(){},remove(){}};picker.contains=e=>[picker,trigger,panel,...options].includes(e);picker.querySelector=s=>s==='.model-trigger'?trigger:s==='[role="listbox"]'?panel:s==='#stepModelValue'?label:value;picker.querySelectorAll=()=>options;
  document.querySelector=s=>s==='[data-model-picker]'?picker:gallery;
  vm.runInNewContext(await readFile('dist/full-site.js','utf8'),{document,window:{matchMedia:()=>({matches:true})},requestAnimationFrame:fn=>fn(),setTimeout:fn=>{fn();return 1;},clearTimeout(){}});
  trigger.events.click();assert.equal(trigger.attrs['aria-expanded'],'true');assert.equal(panel.hidden,false);assert.equal(document.activeElement,options[0]);
  const key=key=>({key,preventDefault(){},stopPropagation(){}});
  panel.events.keydown(key('ArrowDown'));assert.equal(document.activeElement,options[1]);
  panel.events.keydown(key('Enter'));assert.equal(gallery.scrollLeft,480);assert.equal(value.value,'1');assert.equal(label.textContent,'Larger screen');assert.equal(trigger.attrs['aria-expanded'],'false');assert.equal(document.activeElement,trigger);
  gallery.scrollLeft=0;gallery.events.scroll();assert.equal(value.value,'0');
  trigger.events.keydown(key('End'));assert.equal(document.activeElement,options[1]);panel.events.keydown(key('Escape'));assert.equal(trigger.attrs['aria-expanded'],'false');
  trigger.events.click();document.events.pointerdown({target:{}});assert.equal(trigger.attrs['aria-expanded'],'false');
});

test('all product pages have shared content/photos and Step uses only a custom two-model control',async()=>{
  const coverage=JSON.parse(await readFile('content/route-coverage.json','utf8'));
  for(const entry of coverage.entries.filter(e=>e.source.includes('/products/'))){
    const html=await readFile(entry.file,'utf8');let last=-1;
    for(const id of ['products','support','platform','faqs']){const at=html.indexOf(`id="${id}"`);assert.ok(at>last,`${entry.preview}: ${id} order`);last=at;}
    assert.match(html,/id="features"/);assert.match(html,/id="installations"/);assert.match(html,/quest-installation-detail-photo.webp/);assert.match(html,/Automated traffic management/);assert.match(html,/data-extra-faq/);
  }
  const step=await readFile('dist/step-pay.html','utf8');assert.match(step,/data-model-picker/);assert.match(step,/role="listbox"/);assert.match(step,/data-model-option="0"/);assert.match(step,/data-model-option="1"/);assert.doesNotMatch(step,/<select[^>]*id="stepModel"/);
  assert.match(step,/assets\/step-pay-wide-generated.webp/);assert.doesNotMatch(step,/class="gallery-slide step-studio"/);
  const home=await readFile('dist/index.html','utf8');assert.match(home,/step-pair-stage/);assert.match(home,/Explore both Step &amp; Pay models/);assert.match(home,/step-pair-card/);
});
