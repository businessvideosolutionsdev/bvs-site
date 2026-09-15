const BOOKING_URL = 'https://get.businessvideosolutions.net/widget/booking/tsH596xa7wEMt84KP8bH';
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
const videoDialog = document.querySelector('#video-dialog');
const bookingDialog = document.querySelector('#booking-dialog');
const heroVideo = document.querySelector('#hero-video');
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
    document.querySelector('#video-fallback').textContent = 'Watch on YouTube ↗';
    heroVideo?.pause();
    showDialog(videoDialog, link);
  });
});

// Keep native selects as the form data source and no-JavaScript fallback.
// The visible controls share a themed listbox pattern with keyboard support.
let closeActiveSelect = () => {};
document.querySelectorAll('.booking-entry select').forEach(select => {
  const label = select.labels[0];
  const labelText = [...label.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).map(node => node.textContent.trim()).join(' ');
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'select-trigger';
  trigger.id = `${select.id}-trigger`;
  trigger.setAttribute('role', 'combobox');
  trigger.setAttribute('aria-label', labelText);
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-required', String(select.required));
  const value = document.createElement('span');
  const chevron = document.createElement('span');
  chevron.className = 'select-chevron';
  chevron.setAttribute('aria-hidden', 'true');
  trigger.append(value, chevron);
  const list = document.createElement('div');
  list.id = `${select.id}-options`;
  list.className = 'select-menu';
  list.setAttribute('role', 'listbox');
  list.setAttribute('aria-label', labelText);
  list.hidden = true;
  trigger.setAttribute('aria-controls', list.id);
  const error = document.createElement('span');
  error.className = 'select-error';
  error.id = `${select.id}-error`;
  error.hidden = true;
  const options = [...select.options].filter(option => option.value !== '');
  const optionElements = options.map((option, index) => {
    const item = document.createElement('div');
    item.id = `${select.id}-option-${index}`;
    item.className = 'select-option';
    item.setAttribute('role', 'option');
    item.textContent = option.textContent;
    item.addEventListener('pointerdown', event => event.preventDefault());
    item.addEventListener('click', () => choose(index));
    list.append(item);
    return item;
  });
  let active = 0;
  let search = '';
  let lastKeyTime = 0;
  function sync() {
    value.textContent = select.selectedOptions[0]?.textContent || '';
    optionElements.forEach((item, index) => item.setAttribute('aria-selected', String(options[index].value === select.value)));
    if (select.validity.valid) {
      trigger.removeAttribute('aria-invalid');
      trigger.removeAttribute('aria-describedby');
      error.hidden = true;
    }
  }
  function highlight(index) {
    active = Math.max(0, Math.min(options.length - 1, index));
    optionElements.forEach((item, i) => item.classList.toggle('is-active', i === active));
    trigger.setAttribute('aria-activedescendant', optionElements[active].id);
    optionElements[active].scrollIntoView({block:'nearest'});
  }
  function close() {
    list.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.removeAttribute('aria-activedescendant');
    search = '';
  }
  function open() {
    closeActiveSelect();
    closeActiveSelect = close;
    const rect = trigger.getBoundingClientRect();
    const width = Math.min(Math.max(rect.width, 235), innerWidth - 24);
    const below = innerHeight - rect.bottom - 16;
    const above = rect.top - 16;
    const opensAbove = below < Math.min(options.length * 46 + 16, 280) && above > below;
    list.style.width = `${width}px`;
    list.style.left = `${Math.max(12, Math.min(rect.left, innerWidth - width - 12))}px`;
    list.style.maxHeight = `${Math.max(100, Math.min(330, opensAbove ? above : below))}px`;
    list.style.top = opensAbove ? 'auto' : `${rect.bottom + 8}px`;
    list.style.bottom = opensAbove ? `${innerHeight - rect.top + 8}px` : 'auto';
    list.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    highlight(Math.max(0, options.findIndex(option => option.value === select.value)));
  }
  function choose(index) {
    select.value = options[index].value;
    select.dispatchEvent(new Event('change', {bubbles:true}));
    close();
    trigger.focus({preventScroll:true});
  }
  trigger.addEventListener('click', () => list.hidden ? open() : close());
  trigger.addEventListener('keydown', event => {
    if (event.key === 'Tab' || event.key === 'Escape') { close(); return; }
    if (['ArrowDown','ArrowUp','Home','End','Enter',' '].includes(event.key)) {
      event.preventDefault();
      if (list.hidden) { open(); if(event.key === 'End') highlight(options.length - 1); return; }
      if (event.key === 'Enter' || event.key === ' ') choose(active);
      else highlight(event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : active + (event.key === 'ArrowDown' ? 1 : -1));
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      if (list.hidden) open();
      const now = Date.now();
      search = (now - lastKeyTime > 700 ? '' : search) + event.key.toLowerCase();
      lastKeyTime = now;
      const match = options.findIndex(option => option.textContent.toLowerCase().startsWith(search));
      if (match >= 0) highlight(match);
    }
  });
  document.addEventListener('pointerdown', event => { if (!trigger.contains(event.target) && !list.contains(event.target)) close(); });
  document.addEventListener('focusin', event => { if (!trigger.contains(event.target) && !list.contains(event.target)) close(); });
  document.addEventListener('scroll', event => { if (!list.contains(event.target)) close(); }, true);
  window.addEventListener('resize', close);
  select.addEventListener('change', sync);
  select.addEventListener('invalid', event => {
    event.preventDefault();
    trigger.setAttribute('aria-invalid', 'true');
    trigger.setAttribute('aria-describedby', error.id);
    error.textContent = select.name === 'city' ? 'Choose your area to continue.' : 'Choose your business to continue.';
    error.hidden = false;
  });
  select.form.addEventListener('reset', () => queueMicrotask(sync));
  select.hidden = true;
  label.htmlFor = trigger.id;
  label.append(trigger, error);
  document.body.append(list);
  select.form.noValidate = true;
  sync();
});

document.querySelectorAll('.booking-entry').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.querySelector('.select-trigger[aria-invalid="true"]')?.focus();
      return;
    }
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
    heroVideo?.pause();
    showDialog(bookingDialog, form.querySelector('button[type="submit"]'));
  });
});

const motionButton = document.querySelector('.motion-control');
if (heroVideo && motionButton) {
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
}

document.querySelectorAll('[data-local-video]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const source = link.dataset.localVideo;
    if (!/^\/assets\/videos\/[a-z0-9-]+\.mp4$/.test(source)) return;
    event.preventDefault();
    const video = document.createElement('video');
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.src = source;
    video.poster = link.dataset.poster || '';
    video.setAttribute('aria-label', link.dataset.title);
    document.querySelector('#video-title').textContent = link.dataset.title;
    document.querySelector('#video-mount').replaceChildren(video);
    const fallback = document.querySelector('#video-fallback');
    fallback.href = source;
    fallback.textContent = 'Open the full video ↗';
    heroVideo?.pause();
    showDialog(videoDialog, link);
    video.play().catch(() => {});
  });
});

const library = document.querySelector('.library-grid');
if (library) {
  const cards = [...library.querySelectorAll('.result-card')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  const more = document.querySelector('.library-more');
  const moreButton = document.querySelector('#more-stories');
  const smallScreen = matchMedia('(max-width: 640px)');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const pageSize = () => smallScreen.matches ? 3 : 6;
  let category = 'all';
  let limit = pageSize();
  const matchingCards = () => cards.filter(card => category === 'all' || card.dataset.category === category);
  cards.forEach((card, index) => {
    card.tabIndex = -1;
    const title = card.querySelector('h3');
    title.id = `library-story-${index}`;
    card.setAttribute('aria-labelledby', title.id);
  });
  function renderLibrary() {
    const matches = matchingCards();
    const visible = new Set(matches.slice(0, limit));
    cards.forEach(card => { card.hidden = !visible.has(card); });
    more.hidden = visible.size >= matches.length;
    document.querySelector('#story-count').textContent = `Showing ${visible.size} of ${matches.length} ${matches.length === 1 ? 'story' : 'stories'}`;
    moreButton.setAttribute('aria-label', `View more client stories: show the next ${Math.min(pageSize(), matches.length - visible.size)}`);
  }
  filters.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.filter;
    limit = pageSize();
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    renderLibrary();
  }));
  moreButton.addEventListener('click', () => {
    const newlyVisible = matchingCards().slice(limit, limit + pageSize());
    limit += pageSize();
    renderLibrary();
    const first = newlyVisible[0];
    if (!first) return;
    first.focus({preventScroll:true});
    first.scrollIntoView({behavior:reduceMotion.matches ? 'instant' : 'smooth',block:'start'});
    if (!reduceMotion.matches) newlyVisible.forEach((card, index) => card.animate(
      [{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}],
      {duration:400,delay:index * 45,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'}
    ));
  });
  smallScreen.addEventListener('change', () => { limit = pageSize(); renderLibrary(); });
  renderLibrary();
}

// Small, event-driven movements: no automatic logo animation or scroll hijacking.
const pageMotion = matchMedia('(prefers-reduced-motion: reduce)');
const sticker = document.querySelector('.result-sticker');
const heroFrame = document.querySelector('.hero-frame');
const logoRail = document.querySelector('.logo-rail');
const logoBand = document.querySelector('.client-band');
let motionFrame = 0;
const clamp = (number,min,max) => Math.max(min,Math.min(max,number));
function updateScrollMotion() {
  motionFrame = 0;
  if (pageMotion.matches) return;
  if (sticker && heroFrame) {
    const rect = heroFrame.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < innerHeight) {
      const progress = clamp((innerHeight / 2 - rect.top - rect.height / 2) / innerHeight, -.5, .5);
      sticker.style.setProperty('--sticker-y', `${progress * -28}px`);
      sticker.style.setProperty('--sticker-tilt', `${progress * 6}deg`);
    }
  }
  if (logoRail && logoBand) {
    const rect = logoBand.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < innerHeight) {
      const progress = clamp((innerHeight - rect.top) / (innerHeight + rect.height), 0, 1);
      logoRail.scrollLeft = (logoRail.scrollWidth - logoRail.clientWidth) * progress;
    }
  }
}
function queueScrollMotion() {
  if (!motionFrame && !pageMotion.matches) motionFrame = requestAnimationFrame(updateScrollMotion);
}
window.addEventListener('scroll', queueScrollMotion, {passive:true});
window.addEventListener('resize', queueScrollMotion, {passive:true});
const revealObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    revealObserver.unobserve(entry.target);
    if (pageMotion.matches) continue;
    entry.target.animate(
      [{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],
      {duration:550,easing:'cubic-bezier(.2,.7,.2,1)'}
    );
  }
}, {threshold:.1,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.section-heading,.service-card,.process-grid>li,.local-copy,.local-photo,.team-grid>article,.page-cta,.blog-card,.editorial-photo,.results-grid:not(.library-grid)>.result-card').forEach(element => {
  if (element.getBoundingClientRect().top >= innerHeight * .85) revealObserver.observe(element);
});
pageMotion.addEventListener('change', () => {
  if (pageMotion.matches) {
    cancelAnimationFrame(motionFrame);
    motionFrame = 0;
    sticker?.style.removeProperty('--sticker-y');
    sticker?.style.removeProperty('--sticker-tilt');
    document.getAnimations().forEach(animation => animation.cancel());
  } else queueScrollMotion();
});
queueScrollMotion();
