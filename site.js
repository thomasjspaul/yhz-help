// /site.js
document.addEventListener('DOMContentLoaded', () => {
  const MAIN_APP_URL = 'https://yhz.app';
  const DASH_URL = `${MAIN_APP_URL}/dashboard`;
  const HELP_HOME = '/';

  // 1) Minimal, scoped styles (no mobile panel / no hamburger)
  if (!document.getElementById('yhz-help-min-css')) {
    const style = document.createElement('style');
    style.id = 'yhz-help-min-css';
    style.textContent = `
      :root { --ink:#0f172a; --border:#e5e7eb; --brand:#2563eb; --brand-hover:#1d4ed8; }
      .yhz-header-wrap { margin: 1rem 0 2rem; }
      .yhz-nav {
        display:flex; align-items:center; justify-content:space-between; gap:1rem; flex-wrap:wrap;
        background:#fff; border:1px solid var(--border); border-radius:12px; padding:1rem;
        box-shadow:0 1px 3px rgba(0,0,0,.05);
        font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      }
      .yhz-brand { display:flex; align-items:center; gap:.6rem; text-decoration:none; color:var(--ink); font-weight:600; }
      .yhz-brand img { width:28px; height:28px; border-radius:6px; display:block; }
      .yhz-actions { display:flex; align-items:center; gap:.6rem; flex-wrap:wrap; }
      .yhz-btn {
        display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
        padding:.5rem .85rem; border-radius:.6rem; text-decoration:none; cursor:pointer;
        border:1px solid var(--brand); background:var(--brand); color:#fff;
      }
      .yhz-btn:hover { background:var(--brand-hover); border-color:var(--brand-hover); }
      .yhz-btn.ghost { background:#fff; color:var(--ink); border-color:var(--border); }
      .yhz-btn.ghost:hover { background:#f8fafc; }
    `;
    document.head.appendChild(style);
  }

  // 2) Header injection (brand on the left, two buttons on the right)
  const headerTarget = document.getElementById('shared-header');
  if (headerTarget) {
    headerTarget.innerHTML = `
      <header class="yhz-header-wrap">
        <nav class="yhz-nav" aria-label="Help site navigation">
          <a href="${HELP_HOME}" class="yhz-brand">
            <img src="https://yhz.app/logos/icons/mstile-150x150.png" alt="" aria-hidden="true">
            <span>YHZ Crew Alerts — Help</span>
          </a>
          <div class="yhz-actions">
            <a class="yhz-btn ghost" href="${HELP_HOME}">Help Home</a>
            <a class="yhz-btn" href="${DASH_URL}">← Back to Dashboard</a>
          </div>
        </nav>
      </header>
    `;
  }

  // 3) Footer link normalizer (unchanged)
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

  fixFooterLinks();
  const target = document.getElementById('shared-footer') || document.body;
  const obs = new MutationObserver(() => fixFooterLinks());
  obs.observe(target, { childList: true, subtree: true });
});
