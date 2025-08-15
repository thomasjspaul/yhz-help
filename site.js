// /site.js
document.addEventListener('DOMContentLoaded', () => {
  // 👉 Set this to your main app domain
  const MAIN_APP_URL = 'https://yhc.app'; // change if your main site is different

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
});

<script>
document.addEventListener('DOMContentLoaded', () => {
  const MAIN = 'https://yhz.app'; // or https://yhz.app
  document.querySelectorAll('.yhz-footer a[href^="/"]').forEach(a => {
    a.href = MAIN + a.getAttribute('href');
  });
});
</script>
