// /site.js
document.addEventListener('DOMContentLoaded', () => {
  // 👉 Set this to your main app domain
  const MAIN_APP_URL = 'https://yhc.app'; // change to https://yhz.app if that’s your main domain

  // 👉 If your main-site paths differ, edit these slugs
  const ABOUT_URL   = `${MAIN_APP_URL}/about`;
  const PRIV_URL    = `${MAIN_APP_URL}/privacy`;
  const TERMS_URL   = `${MAIN_APP_URL}/terms`;

  const navLinks = [
    { href: '/', label: 'Help Home', internal: true },
    { href: ABOUT_URL,  label: 'About',   internal: false },
    { href: PRIV_URL,   label: 'Privacy', internal: false },
    { href: TERMS_URL,  label: 'Terms',   internal: false },
  ];

  // HEADER
  const headerTarget = document.getElementById('shared-header');
  if (headerTarget) {
    headerTarget.innerHTML = `
      <header class="yhz-header">
        <nav class="yhz-nav">
          <a class="brand" href="/">YHZ Crew Alerts Help</a>
          <div class="links">
            ${navLinks.map(l => `
              <a class="nav-link" href="${l.href}" ${l.internal ? '' : 'target="_self" rel="noopener"'}>${l.label}</a>
            `).join('')}
          </div>
          <a class="button" href="${MAIN_APP_URL}">← Back to App</a>
        </nav>
      </header>
    `;

    // Highlight only the internal "Help Home" link when on the help site
    const path = location.pathname.replace(/index\.html$/,'') || '/';
    headerTarget.querySelectorAll('.nav-link').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path && href.startsWith('/')) a.classList.add('active');
    });
  }

  // FOOTER
  const footerTarget = document.getElementById('shared-footer');
  if (footerTarget) {
    footerTarget.innerHTML = `
      <footer class="yhz-footer">
        <div class="page">
          <small>© ${new Date().getFullYear()} YHZ Crew Alerts</small>
        </div>
      </footer>
    `;
  }
});
