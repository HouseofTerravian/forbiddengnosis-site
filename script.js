/* ================================================================
   FORBIDDEN GNOSIS — SHARED SCRIPT
   ================================================================ */

/* ── NAV HAMBURGER ── */
(function () {
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
    this.classList.toggle('open');
  });

  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      hamburger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.focus();
    }
  });
})();

/* ── NAV SCROLL SHADOW ── */
(function () {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });
})();

/* ── ACTIVE NAV LINK ── */
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href').split('/').pop().split('?')[0];
    if (href === page) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
})();
