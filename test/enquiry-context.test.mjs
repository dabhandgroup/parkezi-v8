import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

test('enquiry context follows the actual page and excludes query strings and fragments', async () => {
  const makeForm = () => {
    const inputs = new Map();
    return { inputs, events: {}, querySelector(selector) { return inputs.get(/name="([^"]+)"/.exec(selector)[1]); }, appendChild(input) { inputs.set(input.name,input); }, addEventListener(name,fn) { this.events[name]=fn; } };
  };
  const forms=[makeForm(),makeForm()];
  const window={location:{origin:'https://parkezi-v8.vercel.app',pathname:'/step-pay.html',search:'?email=private@example.test',hash:'#enquire'}};
  const document={title:'Fallback',querySelector:selector=>selector==='h1'?{textContent:'  Step & Pay  '}:null,querySelectorAll:selector=>selector==='#enquiryForm,#newsletterPreview'?forms:[],createElement:()=>({})};
  vm.runInNewContext(await readFile('dist/full-site.js','utf8'),{document,window});
  for (const form of forms) {
    assert.equal(form.inputs.size,3);
    assert.equal(form.inputs.get('enquiry_page').value,'/step-pay.html');
    assert.equal(form.inputs.get('enquiry_page_title').value,'Step & Pay');
    assert.equal(form.inputs.get('enquiry_page_url').value,'https://parkezi-v8.vercel.app/step-pay.html');
    assert.equal(form.inputs.get('enquiry_page_url').type,'hidden');
    assert.equal(form.inputs.get('enquiry_page_url').defaultValue,form.inputs.get('enquiry_page_url').value);
  }
  window.location.pathname='/products/step-and-pay/';
  forms[0].events.submit();
  assert.equal(forms[0].inputs.size,3);
  assert.equal(forms[0].inputs.get('enquiry_page').value,'/products/step-and-pay/');
});
