// simple footer year
document.getElementById('year').textContent = new Date().getFullYear();

// smooth scroll behavior (modern browsers can also use CSS: html { scroll-behavior: smooth; })
document.documentElement.style.scrollBehavior = 'smooth';

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const nav = document.querySelector('.nav');
navToggle?.addEventListener('click', () => {
  nav.classList.toggle('show');
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const scrollPos = window.scrollY + window.innerHeight * 0.3;
  sections.forEach((sec) => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((link) => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${id}`
        );
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// THEMING
const themeToggle = document.getElementById('theme-toggle');
const modeLabel = themeToggle?.querySelector('.mode-label');

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (modeLabel) modeLabel.textContent = '☀️';
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (modeLabel) modeLabel.textContent = '🌙';
  }
}

// initialize
const stored = localStorage.getItem('theme');
if (stored) {
  applyTheme(stored);
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
}

themeToggle?.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});
