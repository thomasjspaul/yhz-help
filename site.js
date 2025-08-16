// /site.js
document.addEventListener('DOMContentLoaded', () => {
  const MAIN_APP_URL = 'https://yhz.app';

  // Inject header into #shared-header
  const headerTarget = document.getElementById('shared-header');
  if (headerTarget) {
    headerTarget.innerHTML = `
      <header class="yhz-header-wrap">
        <nav class="yhz-nav" id="yhz-nav" aria-label="Primary">
          <div class="yhz-left">
            <a href="/" class="yhz-brand">
              <img src="https://yhz.app/logos/icons/mstile-150x150.png" alt="" aria-hidden="true">
              <span>YHZ Crew Alerts</span>
            </a>
          </div>
          <div class="yhz-spacer"></div>

          <div class="yhz-menu" id="yhz-menu" role="menubar" aria-label="Primary">
            <a href="https://yhz.app/dashboard"            class="yhz-link nav-link" role="menuitem">Dashboard</a>
            <a href="https://yhz.app/dashboard/myrequests" class="yhz-link nav-link" role="menuitem">My Requests</a>
            <a href="https://yhz.app/dashboard/requests"   class="yhz-link nav-link" role="menuitem">Requests</a>
            <a href="https://help.yhz.app"                 class="yhz-link nav-link" role="menuitem">Help</a>
            <a href="https://yhz.app/dashboard/logout"     class="yhz-link nav-link" role="menuitem">Log Out</a>
          </div>

          <button class="yhz-toggle" id="yhz-toggle" aria-controls="yhz-mobile-panel" aria-expanded="false" aria-label="Open menu">
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="#0f172a" stroke-width="2" fill="none" stroke-linecap="round"/>
            </svg>
          </button>
        </nav>

        <!-- Mobile panel + backdrop -->
        <div class="yhz-mobile" id="yhz-mobile">
          <div class="yhz-backdrop" id="yhz-backdrop"></div>
          <div class="yhz-panel" id="yhz-mobile-panel" role="menu" aria-label="Primary mobile">
            <!-- fixed a small URL typo here (was /dashboard/dashboard) -->
            <a href="https://yhz.app/dashboard"            class="yhz-link nav-link" role="menuitem">Dashboard</a>
            <a href="https://yhz.app/dashboard/myrequests" class="yhz-link nav-link" role="menuitem">My Requests</a>
            <a href="https://yhz.app/dashboard/requests"   class="yhz-link nav-link" role="menuitem">Requests</a>
            <a href="https://help.yhz.app"                 class="yhz-link nav-link" role="menuitem">Help</a>
            <a href="https://yhz.app/dashboard/logout"     class="yhz-link nav-link" role="menuitem">Log Out</a>
          </div>
        </div>
      </header>
    `;

    // Toggle behavior
    const toggle   = document.getElementById('yhz-toggle');
    const mobile   = document.getElementById('yhz-mobile');
    const backdrop = document.getElementById('yhz-backdrop');

    function setOpen(open) {
      mobile.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.documentElement.classList.toggle('yhz-no-scroll', open);
    }

    toggle.addEventListener('click', () => {
      setOpen(!mobile.classList.contains('open'));
    });

    // Close on backdrop click or ESC
    backdrop.addEventListener('click', () => setOpen(false));
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // Footer link normalizer (unchanged)
  function fixFooterLinks() {
    const root = document.getElementById('shared-footer');
    if (!root) return;

    root.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;

      if (href.startsWith('/')) {
        a.href = MAIN_APP_URL + href;
      } else if (href.startsWith('https://help.yhz.app/')) {
        a.href = MAIN_APP_URL + href.replace('https://help.yhz.app', '');
      }
    });
  }

  fixFooterLinks();
  const target = document.getElementById('shared-footer') || document.body;
  const obs = new MutationObserver(() => fixFooterLinks());
  obs.observe(target, { childList: true, subtree: true });
});
