document.addEventListener('DOMContentLoaded', () => {
  const bar = document.querySelector('.topbar');
  const onScroll = () => bar.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});
