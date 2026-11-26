/** Two opposing, seamless testimonial rows. Original reviews remain readable without JS. */
export function initTestimonials(doc = document) {
  const root = doc.querySelector('#testimonials');
  if (!root || root.classList.contains('is-enhanced')) return;
  const rows = [...root.querySelectorAll('[data-sw-row]')];
  const button = root.querySelector('[data-sw-pause]');
  const label = root.querySelector('[data-sw-label]');
  const icon = root.querySelector('.sweet-words__pause-icon');
  const tracks = rows.map(row => row.querySelector('.sweet-words__track'));
  const groups = tracks.map(track => track?.querySelector('.sweet-words__group'));
  if (rows.length !== 2 || !button || !label || !icon || groups.some(group => !group || group.children.length < 2)) return;

  // Four equal groups per track: the animation translates by exactly one group.
  // The CSS caps the viewport so three remaining groups always fill it.
  groups.forEach((group, i) => {
    for (let j = 0; j < 3; j++) {
      const copy = group.cloneNode(true);
      copy.classList.add('sweet-words__copy');
      copy.setAttribute('aria-hidden', 'true');
      copy.setAttribute('inert', '');
      tracks[i].append(copy);
    }
  });

  let browsing = false;
  const setBrowsing = value => {
    browsing = value;
    root.classList.toggle('is-browsing', browsing);
    button.setAttribute('aria-pressed', String(browsing));
    label.textContent = browsing ? 'Resume movement' : 'Pause & browse';
    icon.textContent = browsing ? '▶' : 'Ⅱ';
    rows.forEach(row => {
      if (browsing) row.setAttribute('tabindex', '0');
      else { row.removeAttribute('tabindex'); row.scrollLeft = 0; }
    });
  };
  button.addEventListener('click', () => setBrowsing(!browsing));
  // Touch the moving cards to stop them and allow ordinary horizontal swiping.
  const motion = doc.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)');
  rows.forEach(row => row.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch' && !browsing && !motion?.matches) setBrowsing(true);
  }));
  root.classList.add('is-enhanced');
  button.hidden = false;
}
