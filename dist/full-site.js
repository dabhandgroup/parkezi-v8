(() => {
  const picker = document.querySelector('[data-model-picker]');
  const gallery = document.querySelector('#productGallery');
  if (!picker || !gallery) return;
  const trigger = picker.querySelector('.model-trigger');
  const panel = picker.querySelector('[role="listbox"]');
  const label = picker.querySelector('#stepModelValue');
  const value = picker.querySelector('input[name="step-model"]');
  const options = [...picker.querySelectorAll('[data-model-option]')];
  const slides = [...gallery.querySelectorAll('.gallery-slide')];
  let closeTimer;
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const paint = index => {
    value.value = String(index);
    label.textContent = options[index].querySelector('strong').textContent;
    options.forEach((option,i) => option.setAttribute('aria-selected',String(i === index)));
  };
  const close = (restoreFocus = false) => {
    clearTimeout(closeTimer);
    trigger.setAttribute('aria-expanded','false');
    panel.setAttribute('aria-hidden','true');
    picker.classList.remove('is-open');
    closeTimer = setTimeout(() => { panel.hidden = true; },reduced() ? 0 : 180);
    if (restoreFocus) trigger.focus();
  };
  const open = (index = Number(value.value)) => {
    clearTimeout(closeTimer);
    panel.hidden = false;
    panel.setAttribute('aria-hidden','false');
    trigger.setAttribute('aria-expanded','true');
    requestAnimationFrame(() => { picker.classList.add('is-open'); options[index].focus(); });
  };
  const choose = index => {
    if (!Number.isInteger(index) || index < 0 || index >= options.length) return;
    paint(index);
    const slide = slides.findIndex(item => item.dataset.model === String(index));
    if (slide >= 0) gallery.scrollTo({left:slide * gallery.clientWidth,behavior:'instant'});
    close(true);
  };
  trigger.addEventListener('click',() => trigger.getAttribute('aria-expanded') === 'true' ? close() : open());
  trigger.addEventListener('keydown',event => {
    if (!['ArrowDown','ArrowUp','Home','End'].includes(event.key)) return;
    event.preventDefault();
    open(event.key === 'End' || event.key === 'ArrowUp' ? options.length - 1 : 0);
  });
  options.forEach((option,index) => option.addEventListener('click',() => choose(index)));
  panel.addEventListener('keydown',event => {
    const current = Math.max(0,options.indexOf(document.activeElement));
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(true); return; }
    if (event.key === 'Tab') { close(); return; }
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); choose(current); return; }
    if (!['ArrowDown','ArrowUp','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : Math.max(0,Math.min(options.length - 1,current + (event.key === 'ArrowDown' ? 1 : -1)));
    options[next].focus();
  });
  document.addEventListener('pointerdown',event => { if (!picker.contains(event.target)) close(); });
  picker.addEventListener('focusout',event => { if (!picker.contains(event.relatedTarget)) close(); });
  gallery.addEventListener('scroll',() => {
    const current = Math.max(0,Math.min(slides.length - 1,Math.round(gallery.scrollLeft / Math.max(1,gallery.clientWidth))));
    const model = Number(slides[current].dataset.model);
    if (Number.isInteger(model) && model >= 0 && model < options.length) paint(model);
  },{passive:true});
  paint(0);
})();

(() => {
  const stage=document.querySelector('[data-mobile-products]');
  const controls=document.querySelector('[data-mobile-product-controls]');
  if(!stage||!controls) return;
  const units=[...stage.querySelectorAll(':scope > .hero-unit')];
  const previous=controls.querySelector('[data-product-previous]');
  const next=controls.querySelector('[data-product-next]');
  const position=controls.querySelector('[data-product-position]');
  const mobile=()=>window.matchMedia('(max-width:970px)').matches;
  const maximum=()=>Math.max(0,stage.scrollWidth-stage.clientWidth);
  const current=()=>units.reduce((best,item,index)=>Math.abs(item.offsetLeft-stage.scrollLeft)<Math.abs(units[best].offsetLeft-stage.scrollLeft)?index:best,0);
  const sync=()=>{
    const index=current();
    const visible=Math.max(1,Math.round(stage.clientWidth/units[0].offsetWidth));
    previous.disabled=stage.scrollLeft<=1;next.disabled=stage.scrollLeft>=maximum()-1;
    const last=Math.min(units.length,index+visible);
    position.textContent=last===index+1?`${index+1} of ${units.length}`:`${index+1}-${last} of ${units.length}`;
  };
  const go=index=>{
    index=Math.max(0,Math.min(units.length-1,index));
    if(!mobile()) return index;
    stage.scrollTo({left:Math.min(units[index].offsetLeft,maximum()),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    return index;
  };
  previous.addEventListener('click',()=>go(current()-1));
  next.addEventListener('click',()=>go(current()+1));
  stage.addEventListener('scroll',sync,{passive:true});
  stage.addEventListener('keydown',event=>{
    if(!mobile()||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const index=go(event.key==='Home'?0:event.key==='End'?units.length-1:current()+(event.key==='ArrowRight'?1:-1));
    units[index].focus({preventScroll:true});
  });
  window.addEventListener('resize',sync);
  sync();
})();

(() => {
  document.querySelectorAll('.step-pair-card').forEach(card=>{
    const reference=card.parentElement.querySelector('.product-image > img[src*="scan-go.webp"]');
    if(!reference) return;
    const sync=()=>{
      const height=reference.getBoundingClientRect().height;
      // Normalized staging cut-outs already enlarged the older shared artwork.
      // This final adjustment targets about 25% over that shared desktop reference.
      if(height>0) card.style.setProperty('--pair-display-height',`${Math.round(height*1.04*100)/100}px`);
    };
    sync();
    if(typeof ResizeObserver!=='undefined') new ResizeObserver(sync).observe(reference);
    else window.addEventListener('resize',sync);
    reference.addEventListener('load',sync);
  });
})();
