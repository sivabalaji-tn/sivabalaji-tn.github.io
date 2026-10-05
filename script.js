const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// PROFILE PHOTO SETUP
// Put the image inside the "assets" folder, then type its complete filename here.
// Examples: "my-photo.jpg", "siva.png", or "professional portrait.jpeg"
// Leave this empty ('') whenever you want to show the placeholder instead.
const profileImageFile = 'profile-photo.jpeg';

// MOODLE PROJECT IMAGE SETUP
// Put the screenshot inside the "assets" folder and type its complete filename here.
// Example: const moodleProjectImageFile = 'moodle-dashboard.png';
// Leave it empty to keep the reserved image space visible.
const moodleProjectImageFile = '1754750422974.jpg';

const profileImage = document.querySelector('#profile-image');
const portraitPlaceholder = document.querySelector('#portrait-placeholder');

if (profileImageFile.trim()) {
  profileImage.addEventListener('load', () => {
    profileImage.hidden = false;
    portraitPlaceholder.hidden = true;
  });

  profileImage.addEventListener('error', () => {
    profileImage.hidden = true;
    portraitPlaceholder.hidden = false;
    console.warn(`Profile image not found: assets/${profileImageFile}`);
  });

  profileImage.src = `assets/${encodeURIComponent(profileImageFile.trim())}`;
}

const moodleProjectImage = document.querySelector('#moodle-project-image');
const moodleImagePlaceholder = document.querySelector('#moodle-image-placeholder');

if (moodleProjectImageFile.trim()) {
  moodleProjectImage.addEventListener('load', () => {
    moodleProjectImage.hidden = false;
    moodleImagePlaceholder.hidden = true;
  });

  moodleProjectImage.addEventListener('error', () => {
    moodleProjectImage.hidden = true;
    moodleImagePlaceholder.hidden = false;
    console.warn(`Moodle project image not found: assets/${moodleProjectImageFile}`);
  });

  moodleProjectImage.src = `assets/${encodeURIComponent(moodleProjectImageFile.trim())}`;
}

const themeColor = document.querySelector('meta[name="theme-color"]');
const savedTheme = localStorage.getItem('portfolio-theme-v2');
if (savedTheme === 'light' || savedTheme === 'dark') {
  root.dataset.theme = savedTheme;
}

function updateThemeLabel() {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
  themeColor.setAttribute('content', root.dataset.theme === 'dark' ? '#0b0b0b' : '#ffffff');
}

themeToggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme-v2', root.dataset.theme);
  updateThemeLabel();
});

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

function updateLocalTime() {
  const time = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(new Date());
  document.querySelector('#local-time').textContent = `· ${time}`;
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll('main section[id]')];
const navItems = [...document.querySelectorAll('.nav-links a')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navItems.forEach((item) => {
      item.classList.toggle('active', item.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55%', threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));
document.querySelector('#year').textContent = new Date().getFullYear();
updateLocalTime();
updateThemeLabel();
setInterval(updateLocalTime, 30000);
