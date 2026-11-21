/** Defer scroll reveal setup until the introduction begins its exit.
 * The critical head gate owns overlay timing and its fail-open watchdog so a
 * delayed or failed module cannot leave the homepage blocked.
 */
export function afterSignatureReveal(callback, doc = document) {
  if (!doc.documentElement.classList.contains('signature-hold')) {
    callback();
    return;
  }
  doc.addEventListener('signature:reveal', callback, { once: true });
}
