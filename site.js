// /site.js
document.addEventListener('DOMContentLoaded', () => {
  const MAIN_APP_URL = 'https://yhz.app';

  // ─────────────────────────────────────────────────────────────
  // 1) Inject minimal, scoped CSS (once)
  // ─────────────────────────────────────────────────────────────
  if (!document.getElementById('yhz-help-nav-css')) {
    const style = document.createElement('style');
    style.id = 'yhz-help-nav-css';
    style.textContent = `
      :root { --ink:#0f172a; --muted:#6b7280; --ring:rgba(37,99,235,.25); --border:#e5e7eb; --brand:#2563eb; --brand-hover:#1d4ed8; }
      .yhz-help-header { margin: 1rem 0 2rem; }
      .yhz-help-nav {
        display:flex; align-items:center; justify-content:space-between; gap:1rem;
        padding:1rem; background:#fff; border:1px solid var(--border); border-radius:12px;
        box-shadow:0 1px 3px rgba(0,0,0,.05);
        font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      }
      .yhz-help-left { display:flex; align-items:center; gap:1rem; min-width:0; }
      .yhz-help-logo { display:flex; align-items:center; gap:.6rem; text-decoration:none; color:var(--ink); font-weight:600; white-space:nowrap; }
      .yhz-help-logo img { width:28px; height:28px; border-radius:6px; display:block; }

      .yhz-help-links { display:flex; align-items:center; gap:.8rem; flex-wrap:wrap; }
      .yhz-help-link {
        display:inline-flex; align-items:center; gap:.35rem;
        padding:.5rem .75rem; border-radius:.55rem; text-decoration:none;
        color:var(--ink); border:1px solid transparent;
      }
      .yhz-help-link:hover { background:#f8fafc; border-color:var(--border); }
      .yhz-help-link.active { background:#eef2ff; border-color:#c7d2fe; color:#1e40af; }

      /* Right-side buttons */
      .yhz-help-actions { display:flex; align-items:center; gap:.6rem; }
      .yhz-help-btn {
        display:inline-flex; align-items:center; gap:.5rem; padding:.5rem .8rem;
        border-radius:.6rem; border:1px solid var(--brand); background:var(--brand); color:#fff; text-decoration:none;
      }
      .yhz-help-btn:hover { background:var(--brand-hover); border-color:var(--brand-hover); }
      .yhz-help-btn.ghost {
        background:transparent; color:var(--ink); border-color:var(--border);
      }
      .yhz-help-btn.ghost:hover { background:#f8fafc; }

      /* Mobile menu */
      .yhz-help-toggle {
        display:none; border:1px solid var(--border); background:#fff; color:var(--ink);
        border-radius:.6rem; padding:.45rem .6rem; cursor:pointer;
      }
      .yhz-help-toggle:focus { outline:3px solid var(--ring); outline-offset:2px; }

      @media (max-width: 720px) {
        .yhz-help-toggle { display:inline-flex; }
        .yhz-help-links { display:none; width:100%; }
        .yhz-help-nav[data-open="true"] .yhz-help-links {
          display:flex; flex-direction:column; align-items:flex-start; gap:.5rem; padding-top:.5rem;
        }
        .yhz-help-actions { margin-left:auto; }
      }
    `;
    document.head.appendChild(style);
  }

  // Helper: make a link element
  function link(href, text, testFn) {
    const a = document.createElement('a');
    a.href = href;
    a.className = 'yhz-help-link';
    a.textContent = text;
    if (typeof testFn === 'function' && testFn(window.location)) {
      a.classList.add('active');
    }
    return a;
  }

  // ─────────────────────────────────────────────────────────────
  // 2) Build Header
  // ─────────────────────────────────────────────────────────────
  const headerTarget = document.getElementById('shared-header');
  if (headerTarget) {
    const header = document.createElement('header');
    header.className = 'yhz-help-header';

    // Nav shell
    const nav = document.createElement('nav');
    nav.className = 'yhz-help-nav';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Help site navigation');

    // Left: logo + primary links
    const left = document.createElement('div');
    left.className = 'yhz-help-left';

    // ✅ Replace logo src if you have one handy
    const logo = document.createElement('a');
    logo.className = 'yhz-help-logo';
    logo.href = '/';
    logo.innerHTML = `
      <img src="https://yhz.app/icon-192.png" alt="" loading="lazy" />
      <span>YHZ Crew Alerts – Help</span>
    `;

    const toggle = document.createElement('button');
    toggle.className = 'yhz-help-toggle';
    toggle.setAttribute('aria-label', 'Toggle menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = 'Menu';

    const links = document.createElement('div');
    links.className = 'yhz-help-links';

    // Links for the Help site
    links.append(
      link('/', 'Help Home', loc => loc.hostname === 'help.yhz.app' && loc.pathname === '/'),
      link('/getting-started', 'Getting Started', loc => loc.pathname.startsWith('/getting-started')),
      link('/categories', 'All Articles', loc => loc.pathname.startsWith('/categories'))
    );

    left.append(logo, toggle, links);

    // Right: actions (back to app, dashboard, logout)
    const actions = document.createElement('div');
    actions.className = 'yhz-help-actions';

    const homeBtn = document.createElement('a');
    homeBtn.className = 'yhz-help-btn ghost';
    homeBtn.href = '/';
    homeBtn.textContent = 'Help Home';

    const backBtn = document.createElement('a');
    backBtn.className = 'yhz-help-btn';
    backBtn.href = MAIN_APP_URL;
    backBtn.textContent = '← Back to App';

    // Optional quick links into app (uncomment if you want them visible on Help)
    const dashBtn = document.createElement('a');
    dashBtn.className = 'yhz-help-btn ghost';
    dashBtn.href = `${MAIN_APP_URL}/dashboard`;
    dashBtn.textContent = 'Dashboard';

    const logoutBtn = document.createElement('a');
    logoutBtn.className = 'yhz-help-btn ghost';
    logoutBtn.href = `${MAIN_APP_URL}/logout`;
    logoutBtn.textContent = 'Log Out';

    actions.append(homeBtn, backBtn, dashBtn, logoutBtn);

    // Assemble nav
    nav.append(left, actions);
    header.appendChild(nav);
    headerTarget.innerHTML = '';
    headerTarget.appendChild(header);

    // Mobile toggle behavior
    toggle.addEventListener('click', () => {
      const isOpen = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!isOpen));
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  // ─────────────────────────────────────────────────────────────
  // 3) Fix footer links inserted by main inject.js
  // ─────────────────────────────────────────────────────────────
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
