const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-navigation');

function closeMenu({ restoreFocus = false } = {}) {
  if (!menuToggle || !nav) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
  nav.classList.remove('is-open');
  if (restoreFocus) menuToggle.focus();
}

export function initNavigation() {
  if (!header || !menuToggle || !nav) return;
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 5);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') closeMenu({ restoreFocus: true });
  });
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) closeMenu();
  });
  const media = window.matchMedia('(min-width: 761px)');
  media.addEventListener?.('change', (event) => { if (event.matches) closeMenu(); });
}
