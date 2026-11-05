document.querySelectorAll('#year').forEach((el) => { el.textContent = new Date().getFullYear(); });
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealElements.forEach((el) => observer.observe(el));
} else revealElements.forEach((el) => el.classList.add('visible'));
// When the original certificate PDF is added at the expected path, reveal its viewer.
document.querySelectorAll('.certificate-viewer').forEach(async (viewer) => {
  const frame = viewer.querySelector('.certificate-pdf');
  if (!frame) return;
  try {
    const response = await fetch(frame.getAttribute('src'), { method: 'HEAD' });
    if (response.ok) {
      frame.hidden = false;
      viewer.querySelector('.viewer-placeholder').hidden = true;
      viewer.querySelector('.certificate-actions').hidden = false;
      viewer.querySelector('.viewer-file-state').textContent = 'Certificate available';
    }
  } catch (_) { /* Keep the upload placeholder visible until the PDF is available. */ }
});
