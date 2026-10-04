/**
 * Subiksen V S - Interactive Portfolio Script
 * Modern Responsive Features: Mobile Drawer, ScrollSpy, Reading Progress, 
 * Constellation Canvas, Typewriter, 3D Tilt, Skills Filter, Back-to-Top, Toast
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. DYNAMIC PARTICLE CONSTELLATION CANVAS
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 100);
    });

    const particles = [];
    const count = window.innerWidth < 768 ? 30 : 65;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.6 + 0.8,
        color: Math.random() > 0.5 ? 'rgba(0, 210, 255, ' : 'rgba(168, 85, 247, '
      });
    }

    let mouse = { x: null, y: null };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    function drawParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '0.7)';
        ctx.fill();

        // Connect nearby particles
        const maxDist = window.innerWidth < 768 ? 85 : 110;
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 210, 255, ${0.14 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  /* --------------------------------------------------------------------------
     2. RESPONSIVE MOBILE NAVIGATION & OVERLAY
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');
  const navItems = document.querySelectorAll('.nav-item, .mobile-nav-action a');
  const navbar = document.getElementById('navbar');

  function toggleMobileMenu(isOpen) {
    const shouldOpen = isOpen !== undefined ? isOpen : !navMenu.classList.contains('open');
    if (shouldOpen) {
      mobileToggle.classList.add('active');
      mobileToggle.setAttribute('aria-expanded', 'true');
      navMenu.classList.add('open');
      if (navOverlay) navOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
      if (navOverlay) navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', () => {
      toggleMobileMenu(false);
    });
  }

  // Auto close mobile drawer on nav item click
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('open')) {
        toggleMobileMenu(false);
      }
    });
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('open')) {
      toggleMobileMenu(false);
    }
  });

  /* --------------------------------------------------------------------------
     3. SCROLL PROGRESS BAR, NAVBAR SHADOW & BACK TO TOP
     -------------------------------------------------------------------------- */
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Reading Progress
    if (scrollProgressBar && docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    // Navbar Scrolled State
    if (navbar) {
      if (scrollTop > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to Top Visibility
    if (backToTop) {
      if (scrollTop > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }

    // Active Navigation Highlight (ScrollSpy)
    highlightNavOnScroll();
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. SCROLLSPY (ACTIVE NAV LINK HIGHLIGHTING)
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const mainNavLinks = document.querySelectorAll('.nav-menu .nav-item');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        mainNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* --------------------------------------------------------------------------
     5. TYPEWRITER EFFECT
     -------------------------------------------------------------------------- */
  const typewriterElem = document.getElementById('typewriter');
  const roles = [
    'Java Full Stack Developer',
    'Spring Boot Architect',
    'Angular Frontend Engineer',
    'Python & GenAI (RAG) Specialist'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let speed = 90;

  function typeEffect() {
    if (!typewriterElem) return;
    const current = roles[roleIdx];

    if (isDeleting) {
      typewriterElem.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      speed = 35;
    } else {
      typewriterElem.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      speed = 75;
    }

    if (!isDeleting && charIdx === current.length) {
      speed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 350;
    }

    setTimeout(typeEffect, speed);
  }
  typeEffect();

  /* --------------------------------------------------------------------------
     6. 3D CARD TILT PHYSICS (DESKTOP ONLY)
     -------------------------------------------------------------------------- */
  const heroCard = document.getElementById('heroInteractiveCard');
  if (heroCard && window.matchMedia('(min-width: 992px)').matches) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotX = -(y / (rect.height / 2)) * 8;
      const rotY = (x / (rect.width / 2)) * 8;

      heroCard.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  }

  /* --------------------------------------------------------------------------
     7. SKILLS TABS FILTER
     -------------------------------------------------------------------------- */
  const tabs = document.querySelectorAll('.skill-tab');
  const skillItems = document.querySelectorAll('.skill-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillItems.forEach(item => {
        const cat = item.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     8. TOAST NOTIFICATION HELPER & COPY BUTTONS
     -------------------------------------------------------------------------- */
  const toast = document.getElementById('toast');
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;
    clearTimeout(toastTimeout);
    toast.textContent = message;
    toast.classList.add('show');
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`📋 Copied "${text}" to clipboard!`);
        }).catch(() => {
          showToast(`📋 Copied: ${text}`);
        });
      }
    });
  });

  /* --------------------------------------------------------------------------
     9. CONTACT FORM
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (name && email && message) {
        formStatus.textContent = '✓ Message sent successfully! Subiksen will get back to you shortly.';
        showToast('🚀 Message sent successfully!');
        contactForm.reset();

        setTimeout(() => {
          formStatus.textContent = '';
        }, 5000);
      }
    });
  }

});
