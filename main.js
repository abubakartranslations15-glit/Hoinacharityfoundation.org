// =========================================================
// HOINA — shared interactivity
// =========================================================
document.addEventListener('DOMContentLoaded', function () {

  /* ---- Hamburger / mega menu ---- */
  var hamburger = document.querySelector('.hamburger-btn');
  var megaMenu = document.querySelector('.mega-menu');
  var scrim = document.querySelector('.scrim');

  function closeMenu () {
    if (!hamburger) return;
    hamburger.setAttribute('aria-expanded', 'false');
    megaMenu.classList.remove('is-open');
    scrim.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  function openMenu () {
    hamburger.setAttribute('aria-expanded', 'true');
    megaMenu.classList.add('is-open');
    scrim.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });
    document.querySelector('.mega-menu-close').addEventListener('click', closeMenu);
    scrim.addEventListener('click', closeMenu);
  }

  /* ---- Generic "only one dropdown open at a time" ---- */
  var dropdownTriggers = document.querySelectorAll('[data-dropdown-trigger]');
  dropdownTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var targetId = trigger.getAttribute('data-dropdown-trigger');
      var target = document.getElementById(targetId);
      var isOpen = target.classList.contains('is-open');
      document.querySelectorAll('.js-dropdown.is-open').forEach(function (el) {
        el.classList.remove('is-open');
      });
      if (!isOpen) target.classList.add('is-open');
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.js-dropdown.is-open').forEach(function (el) {
      el.classList.remove('is-open');
    });
  });

  /* ---- FAQ floating widget ---- */
  var faqToggle = document.querySelector('.float-faq');
  var faqPanel = document.querySelector('.faq-panel');
  if (faqToggle && faqPanel) {
    faqToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      faqPanel.classList.toggle('is-open');
    });
    document.addEventListener('click', function (e) {
      if (!faqPanel.contains(e.target) && e.target !== faqToggle) {
        faqPanel.classList.remove('is-open');
      }
    });
    document.querySelectorAll('.faq-q').forEach(function (q) {
      q.addEventListener('click', function () {
        var item = q.closest('.faq-item');
        var wasOpen = item.classList.contains('is-open');
        document.querySelectorAll('.faq-item.is-open').forEach(function (i) { i.classList.remove('is-open'); });
        if (!wasOpen) item.classList.add('is-open');
      });
    });
  }

  /* ---- Hero fading image carousel ---- */
  var slides = document.querySelectorAll('.hero-visual .slide');
  if (slides.length > 1) {
    var current = 0;
    setInterval(function () {
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
    }, 4200);
  }

  /* ---- Mark current page in nav ---- */
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    if (link.getAttribute('href') === here) link.classList.add('is-active');
  });
});
