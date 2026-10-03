/**
 * Subiksen V S - Interactive Portfolio Script
 * Medium-Level Balance: Dynamic Particles, Typewriter, 3D Tilt, Tabs, Toasts
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

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = window.innerWidth < 768 ? 35 : 70;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.8 + 0.8,
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
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 210, 255, ${0.15 * (1 - dist / 110)})`;
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
     2. TYPEWRITER EFFECT
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
      speed = 40;
    } else {
      typewriterElem.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      speed = 80;
    }

    if (!isDeleting && charIdx === current.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 400;
    }

    setTimeout(typeEffect, speed);
  }
  typeEffect();

  /* --------------------------------------------------------------------------
     3. 3D CARD TILT PHYSICS
     -------------------------------------------------------------------------- */
  const heroCard = document.getElementById('heroInteractiveCard');
  if (heroCard) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotX = -(y / (rect.height / 2)) * 10;
      const rotY = (x / (rect.width / 2)) * 10;

      heroCard.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  }

  /* --------------------------------------------------------------------------
     4. SKILLS TABS FILTER
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
     5. TOAST NOTIFICATION HELPER & COPY BUTTONS
     -------------------------------------------------------------------------- */
  const toast = document.getElementById('toast');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
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
        });
      }
    });
  });

  /* --------------------------------------------------------------------------
     6. CONTACT FORM
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
