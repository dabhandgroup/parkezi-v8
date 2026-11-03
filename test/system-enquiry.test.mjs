import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanName,formatPhone,validPhone } from '../dist/system-enquiry.js';

test('system enquiry strips typed/pasted digits from names without removing valid name punctuation',()=>{
  assert.equal(cleanName('J4ames2'),'James');
  assert.equal(cleanName("Anne-Marie O’Neill"),"Anne-Marie O’Neill");
  assert.equal(cleanName('李３明'),'李明');
});

test('system enquiry sanitises and formats Australian mobile and landline numbers',()=>{
  assert.equal(formatPhone('04a12-345-678'),'0412 345 678');
  assert.equal(formatPhone('0212345678'),'02 1234 5678');
  assert.equal(formatPhone('412345678'),'412 345 678');
  assert.equal(formatPhone('+61 412 345 678'),'0412 345 678');
  assert.equal(formatPhone('1300309998'),'1300 309 998');
  assert.equal(validPhone('1300 309 998'),true);
  assert.equal(validPhone('13 22 66'),true);
  assert.equal(validPhone('0412 345 678'),true);
  assert.equal(validPhone('02 1234 5678'),true);
  assert.equal(validPhone('0412 345'),false);
  assert.equal(validPhone('0412a345678'),false);
  assert.equal(validPhone(''),false);
});

test('country selection preserves international phone digits with appropriate length validation',()=>{
  assert.equal(formatPhone('020 7123 4567','GB'),'02071234567');
  assert.equal(validPhone('02071234567','GB'),true);
  assert.equal(validPhone('123456','GB'),false);
  assert.equal(validPhone('1234567890123456','GB'),false);
});
