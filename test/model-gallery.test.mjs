import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

test('custom Step picker supports click, keyboard, dismissal and gallery synchronisation',async()=>{
  const document={activeElement:null,events:{},querySelectorAll:()=>[],addEventListener(type,fn){this.events[type]=fn;}};
  const element=()=>({attrs:{},events:{},hidden:false,focus(){document.activeElement=this;},setAttribute(k,v){this.attrs[k]=v;},getAttribute(k){return this.attrs[k];},addEventListener(k,fn){this.events[k]=fn;}});
  const trigger=element(),panel=element(),value={value:'0'},label={textContent:''};
  trigger.attrs['aria-expanded']='false';panel.hidden=true;
  const options=['Standard','Larger screen'].map(text=>{const o=element();o.querySelector=()=>({textContent:text});return o;});
  const gallery=element();gallery.clientWidth=480;gallery.scrollLeft=0;gallery.querySelectorAll=()=>[{dataset:{model:'0'}},{dataset:{model:'1'}}];gallery.scrollTo=({left})=>{gallery.scrollLeft=left;gallery.events.scroll?.();};
  const picker=element();picker.classList={add(){},remove(){}};picker.contains=e=>[picker,trigger,panel,...options].includes(e);picker.querySelector=s=>s==='.model-trigger'?trigger:s==='[role="listbox"]'?panel:s==='#stepModelValue'?label:value;picker.querySelectorAll=()=>options;
  document.querySelector=s=>s==='[data-model-picker]'?picker:s==='#productGallery'?gallery:null;
  vm.runInNewContext(await readFile('dist/full-site.js','utf8'),{document,window:{matchMedia:()=>({matches:true})},requestAnimationFrame:fn=>fn(),setTimeout:fn=>{fn();return 1;},clearTimeout(){}});
  trigger.events.click();assert.equal(trigger.attrs['aria-expanded'],'true');assert.equal(panel.hidden,false);assert.equal(document.activeElement,options[0]);
  const key=key=>({key,preventDefault(){},stopPropagation(){}});
  panel.events.keydown(key('ArrowDown'));assert.equal(document.activeElement,options[1]);
  panel.events.keydown(key('Enter'));assert.equal(gallery.scrollLeft,480);assert.equal(value.value,'1');assert.equal(label.textContent,'Larger screen');assert.equal(trigger.attrs['aria-expanded'],'false');assert.equal(document.activeElement,trigger);
  gallery.scrollLeft=0;gallery.events.scroll();assert.equal(value.value,'0');
  trigger.events.keydown(key('End'));assert.equal(document.activeElement,options[1]);panel.events.keydown(key('Escape'));assert.equal(trigger.attrs['aria-expanded'],'false');
  trigger.events.click();document.events.pointerdown({target:{}});assert.equal(trigger.attrs['aria-expanded'],'false');
});

test('mobile hero Swiper retains drag, controls and range feedback',async()=>{
  let instance;
  const units=Array.from({length:5},()=>({classList:{add(){}}}));
  const stage={events:{},classList:{add(){}},querySelectorAll:()=>units,appendChild(){},addEventListener(k,fn){this.events[k]=fn;}};
  const previous={},next={},position={textContent:''};
  const controls={querySelector:s=>s==='[data-product-previous]'?previous:s==='[data-product-next]'?next:position};
  const document={querySelectorAll:()=>[],querySelector:s=>s==='[data-mobile-products]'?stage:s==='[data-mobile-product-controls]'?controls:null,createElement:()=>({appendChild(){}})};
  class Swiper { constructor(el,options){assert.equal(el,stage);this.params=options;this.activeIndex=0;this.isBeginning=true;this.isEnd=false;instance=this;options.on.init(this);}slideTo(index){this.activeIndex=Math.min(index,3);this.isBeginning=this.activeIndex===0;this.isEnd=this.activeIndex===3;this.params.on.slideChange(this);} }
  vm.runInNewContext(await readFile('dist/full-site.js','utf8'),{document,window:{Swiper,matchMedia:()=>({matches:true})}});
  assert.equal(instance.params.simulateTouch,true);assert.equal(instance.params.grabCursor,true);assert.equal(instance.params.slidesPerView,2);assert.equal(instance.params.breakpoints[900].slidesPerView,4);assert.equal(instance.params.navigation.nextEl,next);assert.equal(position.textContent,'1-2 of 5');
  stage.events.keydown({key:'End',preventDefault(){}});assert.equal(position.textContent,'4-5 of 5');assert.equal(next.disabled,true);
  stage.events.keydown({key:'Home',preventDefault(){}});assert.equal(previous.disabled,true);assert.equal(position.textContent,'1-2 of 5');
});

test('all product pages have shared content/photos and Step uses only a custom two-model control',async()=>{
  const coverage=JSON.parse(await readFile('content/route-coverage.json','utf8'));
  for(const entry of coverage.entries.filter(e=>e.source.includes('/products/'))){
    const html=await readFile(entry.file,'utf8');let last=-1;
    for(const id of ['products','support','platform','faqs']){const at=html.indexOf(`id="${id}"`);assert.ok(at>last,`${entry.preview}: ${id} order`);last=at;}
    assert.match(html,/id="features"/);assert.match(html,/id="installations"/);assert.match(html,/quest-installation-detail-photo.webp/);assert.match(html,/Automated traffic management/);assert.match(html,/data-extra-faq/);
  }
  const step=await readFile('dist/step-pay.html','utf8');assert.match(step,/data-model-picker/);assert.match(step,/role="listbox"/);assert.match(step,/data-model-option="0"/);assert.match(step,/data-model-option="1"/);assert.doesNotMatch(step,/<select[^>]*id="stepModel"/);
  assert.match(step,/assets\/step-pay-wide-navy.webp/);assert.doesNotMatch(step,/class="gallery-slide step-studio"/);
  const home=await readFile('dist/index.html','utf8');assert.doesNotMatch(home,/step-pair-stage/);assert.match(home,/Explore Step &amp; Pay/);assert.doesNotMatch(home,/step-pair-card/);
});
