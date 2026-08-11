document.addEventListener('DOMContentLoaded', function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  var fadeImgs = document.querySelectorAll('img.js-fade');
  fadeImgs.forEach(function (img) {
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add('is-loaded');
    }
  });

  var menuBtn = document.querySelector('.nav-menu-btn');
  var mobileMenu = document.querySelector('.mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
    });
  }

  var langBtns = document.querySelectorAll('.lang-btn');
  if (langBtns.length) {
    langBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = btn.getAttribute('data-lang');
        langBtns.forEach(function (b) { b.classList.toggle('active', b === btn); });
        document.querySelectorAll('[data-' + lang + ']').forEach(function (el) {
          el.textContent = el.getAttribute('data-' + lang);
        });
        document.querySelectorAll('[data-' + lang + '-html]').forEach(function (el) {
          el.innerHTML = el.getAttribute('data-' + lang + '-html');
        });
      });
    });
  }
});
