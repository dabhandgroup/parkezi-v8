import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

test('Step model selection moves to the chosen image and gallery navigation updates the selector',async()=>{
  const handlers={},events={};
  const model={value:'0',addEventListener:(type,fn)=>handlers[type]=fn};
  const gallery={clientWidth:480,scrollLeft:0,querySelectorAll:()=>[{},{}],addEventListener:(type,fn)=>events[type]=fn,scrollTo(args){this.scrollLeft=args.left;events.scroll?.();}};
  const document={querySelector:selector=>selector==='#productGallery'?gallery:model};
  vm.runInNewContext(await readFile('dist/full-site.js','utf8'),{document});
  model.value='1';handlers.change();assert.equal(gallery.scrollLeft,480);assert.equal(model.value,'1');
  gallery.scrollLeft=0;events.scroll();assert.equal(model.value,'0');
  model.value='7';handlers.change();assert.equal(gallery.scrollLeft,0);
});

test('product pages retain shared information in the requested order and the Step control has two models',async()=>{
  const coverage=JSON.parse(await readFile('content/route-coverage.json','utf8'));
  for(const entry of coverage.entries.filter(e=>e.source.includes('/products/'))){
    const html=await readFile(entry.file,'utf8');
    let last=-1;
    for(const id of ['products','support','platform','faqs']){
      const at=html.indexOf(`id="${id}"`);assert.ok(at>last,`${entry.preview}: ${id} order`);last=at;
    }
    assert.match(html,/id="features"/);assert.match(html,/Automated traffic management/);assert.match(html,/data-extra-faq/);
  }
  const step=await readFile('dist/step-pay.html','utf8');
  assert.match(step,/<select id="stepModel"/);assert.match(step,/<option value="0">Standard<\/option>/);assert.match(step,/<option value="1">Larger screen<\/option>/);
  assert.doesNotMatch(step,/class="gallery-slide step-studio"/);
});
