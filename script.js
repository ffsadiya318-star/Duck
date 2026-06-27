// ============================================
//   SADEE CLOUD - Main JavaScript
//   script.js
// ============================================


/* ─── NOTIFICATION TOAST ─────────────────── */
function showNotify(msg) {
  const n = document.getElementById('notify');
  if (!n) return;
  n.textContent = msg || '✓ Done!';
  n.style.display = 'block';
  clearTimeout(n._timer);
  n._timer = setTimeout(() => { n.style.display = 'none'; }, 2500);
}


/* ─── COPY SERVER CONFIG ─────────────────── */
function copyConfig(config) {
  navigator.clipboard.writeText(config)
    .then(() => showNotify('✓ Config copied to clipboard!'))
    .catch(() => showNotify('✓ Config: ' + config));
}


/* ─── GOOGLE LOGIN ───────────────────────── */
function googleLogin() {
  showNotify('🔐 Redirecting to Google Sign In...');

  setTimeout(() => {
    // Replace with your real Firebase / Google OAuth credentials:
    // firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    alert(
      'Google OAuth\n\n' +
      'Production use: integrate Firebase Auth or Google OAuth 2.0.\n\n' +
      'Redirect URL:\nhttps://accounts.google.com/oauth2/auth'
    );
  }, 600);
}


/* ─── EMAIL LOGIN ────────────────────────── */
function emailLogin() {
  const email = document.getElementById('email')?.value.trim();
  const pass  = document.getElementById('password')?.value;

  if (!email || !pass) {
    showNotify('⚠ Please fill in all fields');
    return;
  }

  if (!isValidEmail(email)) {
    showNotify('⚠ Enter a valid email address');
    return;
  }

  showNotify('✓ Signing in...');

  // Replace with your real auth call:
  // fetch('/api/login', { method:'POST', body: JSON.stringify({email, pass}) })
  //   .then(r => r.json())
  //   .then(data => { if (data.token) window.location = '/dashboard'; })
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


/* ─── REGISTER REDIRECT ──────────────────── */
function showRegister() {
  showNotify('Registration page — coming soon!');
  // window.location.href = 'register.html';
}


/* ─── MOBILE HAMBURGER MENU ──────────────── */
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  if (!links) return;

  const isOpen = links.dataset.open === 'true';

  if (isOpen) {
    closeMenu(links);
  } else {
    openMenu(links);
  }
}

function openMenu(links) {
  links.dataset.open = 'true';
  Object.assign(links.style, {
    display:         'flex',
    flexDirection:   'column',
    position:        'fixed',
    top:             '64px',
    left:            '0',
    right:           '0',
    background:      'rgba(10,15,30,0.98)',
    padding:         '1.5rem 2rem',
    gap:             '1rem',
    borderBottom:    '1px solid rgba(255,255,255,0.08)',
    backdropFilter:  'blur(12px)',
    zIndex:          '99'
  });
}

function closeMenu(links) {
  links.dataset.open = 'false';
  links.style.cssText = '';
  if (window.innerWidth <= 768) links.style.display = 'none';
}


/* ─── SMOOTH SCROLL ──────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }

      // Close mobile menu after navigation
      const navLinks = document.querySelector('.nav-links');
      if (navLinks && window.innerWidth <= 768) closeMenu(navLinks);
    });
  });

  // Reset nav display on resize
  window.addEventListener('resize', () => {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    if (window.innerWidth > 768) {
      navLinks.style.cssText = '';
      navLinks.dataset.open = 'false';
    } else {
      if (navLinks.dataset.open !== 'true') {
        navLinks.style.display = 'none';
      }
    }
  });

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
});
