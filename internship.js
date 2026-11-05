document.querySelectorAll('#year').forEach(el => { el.textContent = new Date().getFullYear(); });
const themeButtons = document.querySelectorAll('.theme-toggle');
document.documentElement.dataset.theme = localStorage.getItem('akshatha-theme') === 'light' ? 'light' : 'dark';
function syncThemeButtons() {
  const light = document.documentElement.dataset.theme === 'light';
  themeButtons.forEach(button => { button.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme'); button.querySelector('.theme-icon').textContent = light ? '☾' : '☼'; button.querySelector('.theme-label').textContent = light ? 'Dark' : 'Light'; });
}
syncThemeButtons();
themeButtons.forEach(button => button.addEventListener('click', () => { document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'; localStorage.setItem('akshatha-theme', document.documentElement.dataset.theme); syncThemeButtons(); }));
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); } }), { threshold: 0.12 });
  revealElements.forEach((el, i) => { el.style.setProperty('--reveal-delay', `${Math.min(i % 4, 3) * 75}ms`); observer.observe(el); });
} else revealElements.forEach(el => el.classList.add('visible'));
document.querySelectorAll('.certificate-viewer').forEach(async viewer => {
  const frame = viewer.querySelector('.certificate-pdf'); if (!frame) return;
  try { const response = await fetch(frame.getAttribute('src'), { method: 'HEAD' }); if (response.ok) { frame.hidden = false; viewer.querySelector('.viewer-placeholder').hidden = true; viewer.querySelector('.certificate-actions').hidden = false; viewer.querySelector('.viewer-file-state').textContent = 'Certificate available'; } } catch (_) {}
});

const updateProgress = () => { const range = document.documentElement.scrollHeight - window.innerHeight; document.documentElement.style.setProperty('--scroll-progress', `${range > 0 ? window.scrollY / range * 100 : 0}%`); };
window.addEventListener('scroll', updateProgress, { passive: true }); updateProgress();
