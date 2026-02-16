/* =============================================
   충북안실련 웹사이트 - 메인 스크립트
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Header Scroll Effect ----
  const header = document.getElementById('header');
  const isSubPage = header && header.classList.contains('scrolled');

  if (!isSubPage) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ---- Mobile Navigation ----
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
      if (mobileOverlay) mobileOverlay.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close mobile menu on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Back to Top Button ----
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Scroll Reveal Animation ----
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Counter Animation ----
  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.ceil(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString() + '+';
          }
        };
        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ---- News Tab Filtering ----
  const newsTabs = document.querySelectorAll('.news-tab');
  const newsItems = document.querySelectorAll('.news-list-item');

  if (newsTabs.length > 0 && newsItems.length > 0) {
    newsTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        newsTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-tab');

        newsItems.forEach(item => {
          if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = '';
            item.style.animation = 'fadeInUp 0.4s ease';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ---- Smooth anchor scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const top = target.offsetTop - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});
