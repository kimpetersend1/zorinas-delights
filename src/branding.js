// Progressive enhancement: colours remain readable and all downloads work without JS.
const status = document.querySelector('#copy-status');
for (const button of document.querySelectorAll('[data-copy]')) {
  button.addEventListener('click', async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      status.textContent = `${value} copied to clipboard.`;
    } catch {
      status.textContent = `Clipboard unavailable. Select and copy ${value} manually.`;
    }
  });
}
