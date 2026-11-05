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
  if(!stage||!controls||typeof window.Swiper!=='function') return;
  const units=[...stage.querySelectorAll(':scope > .hero-unit')];
  const wrapper=document.createElement('div');wrapper.className='swiper-wrapper';
  units.forEach(unit=>{unit.classList.add('swiper-slide');wrapper.appendChild(unit);});
  stage.appendChild(wrapper);stage.classList.add('swiper');
  const previous=controls.querySelector('[data-product-previous]'),next=controls.querySelector('[data-product-next]'),position=controls.querySelector('[data-product-position]');
  const sync=swiper=>{
    const visible=Number(swiper.params.slidesPerView)||1,index=swiper.activeIndex||0;
    previous.disabled=swiper.isBeginning;next.disabled=swiper.isEnd;
    position.textContent=`${index+1}-${Math.min(units.length,index+visible)} of ${units.length}`;
  };
  const carousel=new window.Swiper(stage,{slidesPerView:2,spaceBetween:12,simulateTouch:true,grabCursor:true,focusableElements:'input, select, option, textarea, video, label',threshold:6,breakpointsBase:'container',watchOverflow:true,speed:window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:350,keyboard:{enabled:true,onlyInViewport:true,pageUpDown:false},mousewheel:{forceToAxis:true,releaseOnEdges:true},navigation:{prevEl:previous,nextEl:next},breakpoints:{650:{slidesPerView:3,spaceBetween:16},900:{slidesPerView:4,spaceBetween:16}},on:{init:sync,slideChange:sync,resize:sync,breakpoint:sync}});
  stage.addEventListener('keydown',event=>{
    if(!['Home','End'].includes(event.key)) return;
    event.preventDefault();carousel.slideTo(event.key==='Home'?0:units.length-1);
  });
})();
