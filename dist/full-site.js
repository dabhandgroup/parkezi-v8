(() => {
  const gallery = document.querySelector('#productGallery');
  const choices = [...document.querySelectorAll('[data-screen-option]')];
  if (!gallery || !choices.length) return;
  const sync = () => {
    const current = Math.round(gallery.scrollLeft / Math.max(1, gallery.clientWidth));
    choices.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.screenOption) === current)));
  };
  choices.forEach(button => button.addEventListener('click', () => {
    document.querySelector(`[data-gallery-thumb="${button.dataset.screenOption}"]`)?.click();
  }));
  gallery.addEventListener('scroll', sync, { passive: true });
  sync();
})();
