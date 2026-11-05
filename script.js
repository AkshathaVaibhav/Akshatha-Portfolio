// Navigation
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Theme preference: dark is the default; remember the visitor's choice.
const themeButtons = document.querySelectorAll('.theme-toggle');
const savedTheme = localStorage.getItem('akshatha-theme');
document.documentElement.dataset.theme = savedTheme === 'light' ? 'light' : 'dark';
function syncThemeButtons() {
  const light = document.documentElement.dataset.theme === 'light';
  themeButtons.forEach(button => {
    button.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    button.querySelector('.theme-icon').textContent = light ? '☾' : '☼';
    button.querySelector('.theme-label').textContent = light ? 'Dark' : 'Light';
  });
}
syncThemeButtons();
themeButtons.forEach(button => button.addEventListener('click', () => {
  document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('akshatha-theme', document.documentElement.dataset.theme);
  syncThemeButtons();
}));

// Footer year
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Profile image fallback
const profilePhoto = document.querySelector('.profile-photo');
const photoPlaceholder = document.querySelector('.photo-placeholder');
if (profilePhoto && photoPlaceholder) {
  const fallback = () => { profilePhoto.style.display = 'none'; photoPlaceholder.style.display = 'flex'; };
  profilePhoto.addEventListener('error', fallback);
  profilePhoto.addEventListener('load', () => { profilePhoto.style.display = 'block'; photoPlaceholder.style.display = 'none'; });
  if (profilePhoto.complete && profilePhoto.naturalWidth === 0) fallback();
  else if (profilePhoto.complete && profilePhoto.naturalWidth > 0) photoPlaceholder.style.display = 'none';
}

// Scroll reveal, staggered just enough to feel deliberate.
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -45px 0px' });
  revealElements.forEach((element, index) => { element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 75}ms`); observer.observe(element); });
} else revealElements.forEach(element => element.classList.add('visible'));

// Restrained 3D tilt on large screens only.
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('[data-tilt], .project-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--tilt-x', `${-y * 4}deg`);
      card.style.setProperty('--tilt-y', `${x * 5}deg`);
    });
    card.addEventListener('pointerleave', () => { card.style.setProperty('--tilt-x', '0deg'); card.style.setProperty('--tilt-y', '0deg'); });
  });
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navLinks && menuToggle) { navLinks.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); }
});

// Fine progress indicator for long-page navigation.
const updateProgress = () => {
  const range = document.documentElement.scrollHeight - window.innerHeight;
  const progress = range > 0 ? (window.scrollY / range) * 100 : 0;
  document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();
