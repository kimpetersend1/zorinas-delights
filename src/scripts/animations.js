export function initAnimations() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) return;
  // Only hide elements once the observer is ready to reveal them.
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        instance.unobserve(entry.target);
      }
    });
  }, { threshold: .075, rootMargin: '0px 0px -26px 0px' });
  document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
  document.documentElement.classList.add('js-motion');
}
