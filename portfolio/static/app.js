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
