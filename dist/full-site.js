(() => {
  const gallery = document.querySelector('#productGallery');
  const model = document.querySelector('#stepModel');
  if (!gallery || !model) return;
  const slides = [...gallery.querySelectorAll('.gallery-slide')];
  const sync = () => {
    const current = Math.max(0, Math.min(slides.length - 1, Math.round(gallery.scrollLeft / Math.max(1, gallery.clientWidth))));
    model.value = String(current);
  };
  model.addEventListener('change', () => {
    const index = Number(model.value);
    if (!Number.isInteger(index) || index < 0 || index >= slides.length) return;
    gallery.scrollTo({ left: index * gallery.clientWidth, behavior: 'instant' });
  });
  gallery.addEventListener('scroll', sync, { passive: true });
  sync();
})();
