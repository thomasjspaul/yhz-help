// /site.js
document.addEventListener('DOMContentLoaded', () => {
  // ⬇️ Set this to your main app URL
  const MAIN_APP_URL = 'https://yhz.app'; // change to https://yhc.app if that's your main domain

  const navLinks = [
    { href: '/', label: 'Help Home' },
    { href: '/about.html', label: 'About' },
    { href: '/privacy.html', label: 'Privacy' },
    { href: '/terms.html', label: 'Terms' },
  ];

  // HEADER
  const headerTarget = document.getElementById('shared-header');
  if (headerTarget) {
    headerTarget.innerHTML = `
      <header class="yhz-header">
        <nav class="yhz-nav">
          <a class="brand" href="/">YHZ Crew Alerts Help</a>
          <div class="links">
            ${navLinks.map(l => `<a class="nav-link" href="${l.href}">${l.label}</a>`).join('')}
          </div>
          <a class="button" href="${MAIN_APP_URL}">← Back to App</a>
        </nav>
      </header>
    `;

    // Highlight active link
    const path = location.pathname.replace(/index\.html$/,'') || '/';
    headerTarget.querySelectorAll('.nav-link').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path) a.classList.add('active');
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
