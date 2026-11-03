document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const bar = document.querySelector('.topbar');
  const themeToggle = document.querySelector('#theme-toggle');
  let savedTheme = 'light';

  try {
    savedTheme = localStorage.getItem('portfolio-theme') || 'light';
  } catch {
    savedTheme = 'light';
  }

  root.dataset.theme = savedTheme;
  themeToggle.checked = savedTheme === 'dark';
  themeToggle.addEventListener('change', () => {
    const theme = themeToggle.checked ? 'dark' : 'light';
    root.dataset.theme = theme;
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      return;
    }
  });

  const onScroll = () => bar?.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const pageOrder = ['/', '/about', '/skills', '/projects', '/services', '/cv', '/contact'];
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const currentPageIndex = pageOrder.indexOf(currentPath);
  let touchStart = null;

  if (currentPageIndex !== -1 && window.matchMedia('(max-width: 680px)').matches) {
    document.addEventListener('touchstart', (event) => {
      if (event.touches.length !== 1 || event.target.closest('.nav-links, a, button, input, textarea, select, iframe, [contenteditable="true"]')) {
        touchStart = null;
        return;
      }

      const touch = event.touches[0];
      touchStart = { x: touch.clientX, y: touch.clientY };
    }, { passive: true });

    document.addEventListener('touchend', (event) => {
      const start = touchStart;
      touchStart = null;
      if (!start || event.changedTouches.length !== 1) return;

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - start.x;
      const deltaY = touch.clientY - start.y;

      if (Math.abs(deltaX) < 70 || Math.abs(deltaX) < Math.abs(deltaY) * 1.3) return;

      const nextPageIndex = currentPageIndex + (deltaX < 0 ? 1 : -1);
      if (pageOrder[nextPageIndex]) window.location.assign(pageOrder[nextPageIndex]);
    }, { passive: true });

    document.addEventListener('touchcancel', () => {
      touchStart = null;
    }, { passive: true });
  }

  const filterButtons = document.querySelectorAll('[data-project-filter]');
  const projectCards = document.querySelectorAll('[data-project-category]');
  const projectCount = document.querySelector('#project-count');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.projectFilter;
      let visibleCount = 0;

      filterButtons.forEach((filterButton) => {
        filterButton.setAttribute('aria-pressed', String(filterButton === button));
      });
      projectCards.forEach((card) => {
        const visible = category === 'all' || card.dataset.projectCategory === category;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });
      if (projectCount) projectCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'}`;
    });
  });

  const copyButton = document.querySelector('[data-copy-email]');
  const copyStatus = document.querySelector('#copy-status');
  copyButton?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copyButton.dataset.copyEmail);
      copyStatus.textContent = 'Email address copied.';
    } catch {
      copyStatus.textContent = 'Copy unavailable. Select the email address to copy it.';
    }
  });

  document.querySelector('[data-print-cv]')?.addEventListener('click', () => window.print());
});
