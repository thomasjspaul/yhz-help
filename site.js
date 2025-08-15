// /site.js
document.addEventListener('DOMContentLoaded', () => {
  const MAIN_APP_URL = 'https://yhz.app';

  // HEADER: Help Home + Back to App
  const headerTarget = document.getElementById('shared-header');
  if (headerTarget) {
    headerTarget.innerHTML = `
      <header class="yhz-header">
        <nav class="yhz-nav">
          <a class="brand" href="/">Help Home</a>
          <a class="button" href="${MAIN_APP_URL}">← Back to App</a>
        </nav>
      </header>
    `;
  }

  // Fix footer links inserted by main inject.js:
  // - Convert href="/privacy" → "https://yhz.app/privacy"
  // - Convert href="https://help.yhz.app/privacy" → "https://yhz.app/privacy"
  function fixFooterLinks() {
    const root = document.getElementById('shared-footer');
    if (!root) return;

    root.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;

      if (href.startsWith('/')) {
        a.href = MAIN_APP_URL + href; // make absolute to main site
      } else if (href.startsWith('https://help.yhz.app/')) {
        a.href = MAIN_APP_URL + href.replace('https://help.yhz.app', '');
      }
    });
  }

  // Run once now…
  fixFooterLinks();

  // …and again whenever inject.js mutates the footer
  const target = document.getElementById('shared-footer') || document.body;
  const obs = new MutationObserver(() => fixFooterLinks());
  obs.observe(target, { childList: true, subtree: true });
});
