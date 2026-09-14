const BOOKING_URL = 'https://get.businessvideosolutions.net/widget/booking/tsH596xa7wEMt84KP8bH';
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
const videoDialog = document.querySelector('#video-dialog');
const bookingDialog = document.querySelector('#booking-dialog');
let dialogOpener;

function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('open');
}
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  menu.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('open', !expanded);
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = new Date().getFullYear();

function showDialog(dialog, opener) {
  dialogOpener = opener;
  dialog.showModal();
  document.body.classList.add('modal-open');
  dialog.querySelector('.dialog-close').focus();
}
for (const dialog of document.querySelectorAll('dialog')) {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (dialog === videoDialog) document.querySelector('#video-mount').replaceChildren();
    if (dialog === bookingDialog) document.querySelector('#calendar-mount').replaceChildren();
    dialogOpener?.focus();
  });
}

document.querySelectorAll('[data-video]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const id = link.dataset.video;
    if (!/^[\w-]{11}$/.test(id)) return;
    document.querySelector('#video-title').textContent = link.dataset.title;
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    frame.title = link.dataset.title;
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    document.querySelector('#video-mount').replaceChildren(frame);
    document.querySelector('#video-fallback').href = `https://www.youtube.com/watch?v=${id}`;
    heroVideo.pause();
    showDialog(videoDialog, link);
  });
});

document.querySelectorAll('.booking-entry').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const business = data.get('business_type');
    const city = data.get('city');
    // These selections only personalize the introduction. The live calendar
    // collects contact details and confirms the appointment in its own form.
    document.querySelector('#booking-context').textContent = `${business} · ${city}. Choose a time below, then add your details to confirm your call.`;
    const status = document.querySelector('.calendar-status');
    status.hidden = false;
    const frame = document.createElement('iframe');
    frame.src = BOOKING_URL;
    frame.title = 'Book a strategy call with Christian at Business Video Solutions';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.addEventListener('load', () => { status.hidden = true; });
    document.querySelector('#calendar-mount').replaceChildren(frame);
    heroVideo.pause();
    showDialog(bookingDialog, form.querySelector('button[type="submit"]'));
  });
});

const heroVideo = document.querySelector('#hero-video');
const motionButton = document.querySelector('.motion-control');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let mediaLoaded = false;
function loadHeroMedia() {
  if (mediaLoaded) return;
  const source = heroVideo.querySelector('source');
  source.src = source.dataset.src;
  heroVideo.load();
  mediaLoaded = true;
}
function updateMotionControl() {
  motionButton.setAttribute('aria-label', heroVideo.paused ? 'Play background video' : 'Pause background video');
  motionButton.querySelector('span').textContent = heroVideo.paused ? '▶' : 'Ⅱ';
}
motionButton.addEventListener('click', () => {
  if (heroVideo.paused) {
    loadHeroMedia();
    heroVideo.play().catch(updateMotionControl);
  } else heroVideo.pause();
});
heroVideo.addEventListener('play', updateMotionControl);
heroVideo.addEventListener('pause', updateMotionControl);
heroVideo.addEventListener('error', () => { motionButton.hidden = true; });
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) heroVideo.pause(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) heroVideo.pause(); });
if (!reducedMotion.matches && !navigator.connection?.saveData) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting && !mediaLoaded) {
        loadHeroMedia();
        heroVideo.play().catch(updateMotionControl);
      } else if (!entry.isIntersecting) heroVideo.pause();
    }
  }, { threshold: .15 });
  observer.observe(heroVideo);
}
