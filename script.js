document.addEventListener('DOMContentLoaded', () => {
  // Update Copyright Year dynamically
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
