// /site.js
document.addEventListener('DOMContentLoaded', () => {
  const MAIN_APP_URL = 'https://yhz.app';

  // 1) Ensure required CSS exists (scoped so it won't clash)
  if (!document.getElementById('yhz-help-nav-css')) {
    const style = document.createElement('style');
    style.id = 'yhz-help-nav-css';
    style.textContent = `
      :root { --ink:#0f172a; --border:#e5e7eb; --card:#fff; }
      .yhz-header-wrap { margin: 1rem 0 2rem; }
      .yhz-nav { display:flex; align-items:center; gap:1rem; background:var(--card);
        border:1px solid var(--border); border-radius:12px; padding:1rem; box-shadow:0 1px 3px rgba(0,0,0,.05);
        font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
      .yhz-left { display:flex; align-items:center; gap:.75rem; }
      .yhz-brand { display:flex; align-items:center; gap:.6rem; text-decoration:none; color:var(--ink); font-weight:600; }
      .yhz-brand img { width:28px; height:28px; border-radius:6px; display:block; }
      .yhz-spacer { flex:1; }
      .yhz-menu { display:flex; align-items:center; gap:.5rem; flex-wrap:wrap; }
      .yhz-link { text-decoration:none; color:var(--ink); padding:.5rem .75rem; border-radius:.6rem; }
      .yhz-link:hover { background:#f8fafc; }

      /* Toggle button (hamburger) */
      .yhz-toggle { display:none; border:1px solid var(--border); background:#fff;
        border-radius:.6rem; padding:.45rem .6rem; cursor:pointer; }

      /* Mobile panel + backdrop */
      .yhz-mobile { position:fixed; inset:0; pointer-events:none; z-index:60; }
      .yhz-backdrop { position:fixed; inset:0; background:rgba(0,0,0,.35); opacity:0; transition:opacity .2s ease; }
      .yhz-panel { position:fixed; top:0; right:0; height:100%; width:280px; max-width:85vw;
        background:#fff; border-left:1px solid var(--border); transform:translateX(100%); transition:transform .2s ease;
        display:flex; flex-direction:column; padding:1rem; }
      .yhz-panel .yhz-link { padding:.7rem .75rem; border-radius:.55rem; }

      /* Open state */
      .yhz-mobile.open { pointer-events:auto; }
      .yhz-mobile.open .yhz-backdrop { opacity:1; }
      .yhz-mobile.open .yhz-panel { transform:translateX(0); }

      /* Prevent background scroll when menu open */
      .yhz-no-scroll, .yhz-no-scroll body { overflow:hidden; }

      /* Collapse menu on small screens */
      @media (max-width: 768px) {
        .yhz-menu { display:none; }
        .yhz-toggle { display:inline-flex; align-items:center; justify-content:center; }
      }
    `;
    document.head.appendChild(style);
  }

  // 2) Inject header HTML
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

        <div class="yhz-mobile" id="yhz-mobile">
          <div class="yhz-backdrop" id="yhz-backdrop"></div>
          <div class="yhz-panel" id="yhz-mobile-panel" role="menu" aria-label="Primary mobile">
            <a href="https://yhz.app/dashboard"            class="yhz-link nav-link" role="menuitem">Dashboard</a>
            <a href="https://yhz.app/dashboard/myrequests" class="yhz-link nav-link" role="menuitem">My Requests</a>
            <a href="https://yhz.app/dashboard/requests"   class="yhz-link nav-link" role="menuitem">Requests</a>
            <a href="https://help.yhz.app"                 class="yhz-link nav-link" role="menuitem">Help</a>
            <a href="https://yhz.app/dashboard/logout"     class="yhz-link nav-link" role="menuitem">Log Out</a>
          </div>
        </div>
      </header>
    `;

    // 3) Wire up toggle (and close on backdrop/ESC)
    const toggle   = document.getElementById('yhz-toggle');
    const mobile   = document.getElementById('yhz-mobile');
    const backdrop = document.getElementById('yhz-backdrop');

    function setOpen(open) {
      mobile.classList.toggle('open', open);
      toggle?.setAttribute('aria-expanded', String(open));
      document.documentElement.classList.toggle('yhz-no-scroll', open);
    }

    toggle?.addEventListener('click', () => {
      setOpen(!mobile.classList.contains('open'));
    });
    backdrop?.addEventListener('click', () => setOpen(false));
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }

  // 4) Footer link normalizer (as you had)
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
