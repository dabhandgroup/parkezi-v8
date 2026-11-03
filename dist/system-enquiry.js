export const cleanName = value => value.replace(/\p{N}/gu,'');

export function formatPhone(value,country='AU') {
  let digits=value.replace(/\D/g,'').slice(0,15);
  if(country!=='AU') return digits;
  if(digits.startsWith('61')&&digits.length===11) digits='0'+digits.slice(2);
  const groups=/^1[38]00/.test(digits)?[4,3,3]:/^13/.test(digits)?[2,2,2]:digits.startsWith('0') ? (/^0[45]/.test(digits)?[4,3,3]:[2,4,4]) : [3,3,3];
  let offset=0;
  return groups.map(size=>{const part=digits.slice(offset,offset+size);offset+=size;return part;}).filter(Boolean).join(' ')+(digits.length>offset?' '+digits.slice(offset):'');
}

export function validPhone(value,country='AU') {
  if(!/^[\d ]+$/.test(value)) return false;
  const digits=value.replace(/\D/g,'');
  return country==='AU' ? /^(?:0?[234578]\d{8}|13\d{4}|1[38]00\d{6})$/.test(digits) : digits.length>=7&&digits.length<=15;
}

function initialise(form) {
  const country=form.querySelector('.country-native');
  const selection=form.querySelector('#formSelection');
  selection.textContent=form.dataset.system;
  const fields=[...form.querySelectorAll('[name="firstName"],[name="lastName"],[name="email"],[name="phone"],[name="message"]')];
  const countryCode=()=>country.selectedOptions[0]?.dataset.country||'AU';
  const labelOf={firstName:'first name',lastName:'last name',email:'email address',phone:'phone number',message:'message'};
  fields.forEach(field=>{
    const wrapper=field.closest('.field-icon-wrap,.phone-input');
    const status=document.createElement('span');
    status.className='system-field-status';status.setAttribute('aria-hidden','true');
    status.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path class="field-good" d="m5 12 4 4L19 6"/><g class="field-bad"><circle cx="12" cy="12" r="9"/><path d="M12 7v6m0 3v1"/></g></svg>';
    wrapper.append(status);
    const error=document.createElement('span');
    error.className='system-field-error';error.id=`system-${field.name}-error`;error.setAttribute('aria-live','polite');
    field.closest('label').append(error);field.setAttribute('aria-describedby',error.id);
    const validate=(show=false)=>{
      let message='';
      field.setCustomValidity('');
      if(!field.value.trim()) message=`Enter your ${labelOf[field.name]}.`;
      else if(field.name==='phone'&&!validPhone(field.value,countryCode())) message=countryCode()==='AU'?'Enter a valid Australian phone number.':'Enter 7 to 15 phone digits.';
      else if(field.name==='email'&&field.validity.typeMismatch) message='Enter a valid email address.';
      else if(field.validity.tooLong) message='Please shorten this entry.';
      field.setCustomValidity(message);
      const touched=show||field.dataset.touched==='true';
      wrapper.classList.toggle('is-valid',touched&&!message);
      wrapper.classList.toggle('is-invalid',touched&&!!message);
      field.setAttribute('aria-invalid',String(touched&&!!message));
      error.textContent=touched?message:'';
      return !message;
    };
    field.addEventListener('input',()=>{
      if(field.name==='firstName'||field.name==='lastName') field.value=cleanName(field.value);
      if(field.name==='phone') field.value=formatPhone(field.value,countryCode());
      validate();
    });
    field.addEventListener('blur',()=>{field.dataset.touched='true';validate(true);});
    field.addEventListener('invalid',()=>{field.dataset.touched='true';validate(true);});
    if(field.name==='phone'){
      field.addEventListener('beforeinput',event=>{if(event.inputType==='insertText'&&event.data&&/[^\d ]/.test(event.data))event.preventDefault();});
      country.addEventListener('change',()=>{field.value=formatPhone(field.value,countryCode());validate();});
    }
    field.validateSystemField=validate;
  });
  form.addEventListener('submit',event=>{
    const results=fields.map(field=>field.validateSystemField(true));
    if(results.includes(false)){event.preventDefault();event.stopImmediatePropagation();form.reportValidity();}
  },true);
}

if(typeof document!=='undefined') document.querySelectorAll('[data-system-enquiry]').forEach(initialise);
