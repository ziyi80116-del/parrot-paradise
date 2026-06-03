/* ============================================
   鹦鹉乐园 — Parrot Paradise
   Global JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // === Navigation Scroll Effect ===
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // === Hamburger Menu ===
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // === Back to Top Button ===
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === Scroll Animation (Intersection Observer) ===
  const fadeElements = document.querySelectorAll('.fade-in');
  const staggerContainers = document.querySelectorAll('.stagger-children');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));
  staggerContainers.forEach(el => observer.observe(el));

  // === Image Lightbox ===
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');

  if (lightbox && lightboxImg) {
    // Hook up gallery items
    document.querySelectorAll('.gallery-item img').forEach(img => {
      img.parentElement.addEventListener('click', (e) => {
        e.preventDefault();
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Also hook up any element with data-lightbox attribute
    document.querySelectorAll('[data-lightbox]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        lightboxImg.src = el.dataset.lightbox;
        lightboxImg.alt = el.dataset.lightboxAlt || '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close lightbox
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Keyboard close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // === Video Modal ===
  const videoModal = document.querySelector('.video-modal');
  const videoPlayer = document.querySelector('.video-modal-content video');

  if (videoModal && videoPlayer) {
    document.querySelectorAll('[data-video]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const videoSrc = el.dataset.video;
        videoPlayer.querySelector('source').src = videoSrc;
        videoPlayer.load();
        videoPlayer.play();
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close video modal
    document.querySelector('.video-modal-close')?.addEventListener('click', () => {
      videoPlayer.pause();
      videoModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        videoPlayer.pause();
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        videoPlayer.pause();
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // === Active Nav Link Highlight ===
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // === Smooth Page Transitions (for detail pages) ===
  // Fade in the whole page on load
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s cubic-bezier(0.19, 1, 0.22, 1)';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

});
