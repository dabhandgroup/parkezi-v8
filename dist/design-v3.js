// Product gallery and content controls use the same native, dependency-free UI as the homepage.
(() => {
 const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
 const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
 qa('[data-feature-tab]').forEach(tab=>{
  function activate(){qa('[data-feature-tab]').forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;q('#'+t.dataset.featureTab+'Panel').hidden=!active;});}
  tab.addEventListener('click',activate);
  tab.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const tabs=qa('[data-feature-tab]'),next=e.key==='Home'?tabs[0]:e.key==='End'?tabs.at(-1):tabs[(tabs.indexOf(tab)+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length];next.click();next.focus();});
 });
 const gallery=q('#productGallery');
 if(gallery){
  const slides=qa('.gallery-slide',gallery),thumbs=qa('[data-gallery-thumb]'),labels=['Express Pay · full unit','Contactless payment','Vehicle exit','Installed at a car park'];let current=0,raf;
  function update(){current=Math.max(0,Math.min(slides.length-1,Math.round(gallery.scrollLeft/gallery.clientWidth)));thumbs.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===current)));q('#galleryCaption').textContent=labels[current];}
  function go(index){gallery.scrollTo({left:((index+slides.length)%slides.length)*gallery.clientWidth,behavior:reduced()?'instant':'smooth'});}
  thumbs.forEach((b,i)=>b.addEventListener('click',()=>go(i)));
  q('[data-gallery-prev]').addEventListener('click',()=>go(current-1));q('[data-gallery-next]').addEventListener('click',()=>go(current+1));
  gallery.addEventListener('scroll',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(update);},{passive:true});
  gallery.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();go(e.key==='Home'?0:e.key==='End'?slides.length-1:current+(e.key==='ArrowRight'?1:-1));}});
  qa('[data-gallery-zoom]').forEach(b=>b.addEventListener('click',()=>{const img=q('img',b),index=Number(b.dataset.galleryZoom);openDialog(`<div class="gallery-lightbox"><img src="${img.getAttribute('src')}" alt="${img.alt}"></div><h2 id="dialogTitle" class="gallery-lightbox-label">${labels[index]}</h2>`,b);}));
  new ResizeObserver(()=>{gallery.scrollTo({left:current*gallery.clientWidth,behavior:'instant'});}).observe(gallery);
 }
 const journey=q('#journeyPanel');
 if(journey){
  const steps=[{title:'Scan & Enter',copy:'ANPR camera scans all car number plates on arrival at the carpark, logging entry time automatically.',image:'anpr-camera.avif',alt:'ANPR camera reading a number plate',status:'Number plate recognised',operator:'The number plate and entry time start the parking session automatically.'},{title:'Pay',copy:'Authorised vehicles are granted instant egress. Paid customers can pay via Step & Pay terminal, QR code or Express Pay station.',image:'1_1.avif',alt:'Driver paying contactlessly at Express Pay',status:'Payment confirmed',operator:'Every transaction is logged in real time through Parkezi’s cloud parking management software.'},{title:'Leave',copy:'Once payment is collected, the visitor exits. A tax invoice can be emailed or provided via QR code link.',image:'ep-why-2.avif',alt:'Vehicle leaving a car park through an open barrier',status:'Exit authorised',operator:'The vehicle’s licence plate is scanned and payment is verified in real time.'}];let selected=0;const tabs=qa('[data-journey]');
  function select(i){selected=i;const step=steps[i];tabs.forEach((b,n)=>{b.setAttribute('aria-selected',String(n===i));b.tabIndex=n===i?0:-1;});journey.setAttribute('aria-labelledby',tabs[i].id);q('#journeyTitle').textContent=step.title;q('#journeyCopy').textContent=step.copy;q('#journeyImage').src='assets/'+step.image;q('#journeyImage').alt=step.alt;q('#journeyStatus').textContent=step.status;q('#operatorCopy').textContent=step.operator;q('[data-journey-next]').innerHTML=(i===0?'Next: payment':i===1?'Next: exit':'Back to arrival')+' <svg class="icon"><use href="#i-arrow"/></svg>';}
  tabs.forEach((b,i)=>{b.addEventListener('click',()=>select(i));b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowRight'?1:-1)+3)%3;select(next);tabs[next].focus();});});q('[data-journey-next]').addEventListener('click',()=>select((selected+1)%3));
 }
 qa('.operator-benefit').forEach(d=>d.addEventListener('toggle',()=>{if(!d.open)return;qa('.operator-benefit').forEach(other=>{if(other!==d)other.open=false;});q('#operatorImage').src='assets/'+d.dataset.benefitImage;q('#operatorImage').alt=q('summary',d).textContent.replace('+','').trim();}));
})();
