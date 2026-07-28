// ═══════════════════════════════════════════════════════
//   RED DEAD REDEMPTION 2 — PORTFOLIO JAVASCRIPT v2
//   Blood Red War Theme | Chinese Rocks RG Font
//   Author: Siva Balaji S
// ═══════════════════════════════════════════════════════

// ─── Custom Cursor ──────────────────────────────────────
const cursorGlow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

// ─── Navbar Scroll ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveNav();
});

// ─── Mobile Menu ────────────────────────────────────────
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu    = document.getElementById('mobileMenu');
mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('visible');
  mobileMenu.classList.toggle('hidden');
});
function closeMobileMenu() {
  mobileMenu.classList.remove('visible');
  mobileMenu.classList.add('hidden');
}

// ─── Star Field — dim reddish tint ───────────────────────
const starField = document.getElementById('starField');
for (let i = 0; i < 140; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  const size = Math.random() * 2.5 + 0.5;
  // Mix of white, pale red, and warm stars
  const hue = Math.random() < 0.3 ? `rgba(255,${Math.floor(Math.random()*80)},${Math.floor(Math.random()*80)},1)` : 'rgba(255,255,255,1)';
  star.style.cssText = `
    width:${size}px; height:${size}px;
    background:${hue};
    left:${Math.random()*100}%; top:${Math.random()*100}%;
    --dur:${(Math.random()*3+2).toFixed(1)}s;
    --delay:${(Math.random()*3).toFixed(1)}s;
    --min-op:${(Math.random()*0.25+0.1).toFixed(2)};
  `;
  starField.appendChild(star);
}

// ─── Campfire Particles — blood/ember red ────────────────
const campfire = document.getElementById('campfireParticles');
if (campfire) {
  // Deep blood reds, ember orange-reds
  const colors = ['#8b0000','#c0392b','#e74c3c','#ff6b35','#a93226','#d35400'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const sz = Math.random() * 7 + 3;
    p.style.cssText = `
      width:${sz}px; height:${sz}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      left:${Math.random()*60-30}px;
      box-shadow: 0 0 ${Math.floor(sz*2)}px ${colors[Math.floor(Math.random()*colors.length)]};
      --dur:${(Math.random()*2.2+1.2).toFixed(1)}s;
      --delay:${(Math.random()*2.5).toFixed(1)}s;
    `;
    campfire.appendChild(p);
  }
}

// ─── Tech Badges ─────────────────────────────────────────
const techs = [
  'HTML5','CSS3','JavaScript','PHP','MySQL','SQL','Bootstrap',
  'AJAX','Git','GitHub','VS Code','XAMPP','Docker','AWS','Azure',
  'phpMyAdmin','OpenStreetMap','GPS API','Razorpay','PWA',
  'Generative AI','Google Cloud'
];
const badgeContainer = document.getElementById('techBadges');
if (badgeContainer) {
  techs.forEach(t => {
    const span = document.createElement('span');
    span.className = 'tech-tag';
    span.textContent = t;
    badgeContainer.appendChild(span);
  });
}

// ─── Intersection Observer — Reveal ──────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// ─── Skill Bars ───────────────────────────────────────────
const skillItems    = document.querySelectorAll('.skill-item');
let   skillsDone    = false;
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !skillsDone) {
      skillsDone = true;
      skillItems.forEach((item, idx) => {
        const pct = item.dataset.pct;
        const bar = item.querySelector('.skill-bar-fill');
        if (bar) setTimeout(() => { bar.style.width = pct + '%'; }, idx * 120);
      });
      skillObserver.disconnect();
    }
  });
}, { threshold: 0.25 });
const skillsSec = document.getElementById('skills');
if (skillsSec) skillObserver.observe(skillsSec);

// ─── Parallax Hero ───────────────────────────────────────
const heroImg = document.getElementById('heroImg');
window.addEventListener('scroll', () => {
  if (heroImg) heroImg.style.transform = `translateY(${window.scrollY * 0.22}px)`;
});

// ─── Blood drip cursor trail effect ──────────────────────
const trail = [];
for (let i = 0; i < 6; i++) {
  const dot = document.createElement('div');
  dot.style.cssText = `
    width:${8-i}px; height:${8-i}px;
    background: rgba(192,57,43,${0.5 - i*0.07});
    border-radius:50%; position:fixed; pointer-events:none;
    z-index:9998; transform:translate(-50%,-50%);
    transition: left ${0.05+i*0.03}s, top ${0.05+i*0.03}s;
  `;
  document.body.appendChild(dot);
  trail.push(dot);
}
document.addEventListener('mousemove', e => {
  trail.forEach(dot => {
    dot.style.left = e.clientX + 'px';
    dot.style.top  = e.clientY + 'px';
  });
});

// ─── Active Nav Links ─────────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');
const sectionToNav = {
  'hero':         '#hero',
  'about':        '#about',
  'skills':       '#skills',
  'projects':     '#projects',
  'education':    '#education',
  'certificates': '#certificates',
  'resume-section':'#contact',
  'contact':      '#contact'
};
function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 250) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === sectionToNav[current]) link.classList.add('active');
  });
}

// ─── Contact Form ─────────────────────────────────────────
function handleContactForm(e) {
  e.preventDefault();
  const name    = document.getElementById('cname').value.trim();
  const email   = document.getElementById('cemail').value.trim();
  const message = document.getElementById('cmsg').value.trim();
  if (!name || !email || !message) {
    alert('Please fill in all fields, partner.');
    return;
  }
  const subject = `Portfolio Contact from ${name}`;
  const body    = `${message}\n\nFrom: ${name} (${email})`;
  window.location.href = `mailto:sivathetechie24@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const succ = document.getElementById('formSuccess');
  succ.classList.remove('hidden');
  document.getElementById('contactForm').reset();
  setTimeout(() => succ.classList.add('hidden'), 5000);
}

// ─── Page Load Blood-Red Fade-In ──────────────────────────
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.background = '#0a0000';
  document.body.style.transition = 'opacity 1.2s ease';
  requestAnimationFrame(() => {
    setTimeout(() => { document.body.style.opacity = '1'; }, 80);
  });
});
