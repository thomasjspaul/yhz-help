// /site.js
document.addEventListener('DOMContentLoaded', () => {
  // 👉 Set this to your main app domain (make BOTH lines match)
  const MAIN_APP_URL = 'https://yhc.app'; // e.g., https://yhc.app or https://yhz.app
  const MAIN          = MAIN_APP_URL;

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

  // FOOTER LINK FIXUPS:
  // If your main inject.js inserts a footer with relative links (e.g., "/privacy"),
  // rewrite them to point at the main site domain when viewed on help.yhz.app.
  const relinkFooter = () => {
    document.querySelectorAll('.yhz-footer a[href^="/"]').forEach(a => {
      a.href = MAIN + a.getAttribute('href');
    });
  };

  // Run now (in case footer is already present)…
  relinkFooter();

  // …and run again when inject.js inserts the footer
  const obs = new MutationObserver(() => {
    if (document.querySelector('.yhz-footer')) {
      relinkFooter();
      obs.disconnect();
    }
  });
  obs.observe(document.body, { childList: true, subtree: true });
});
