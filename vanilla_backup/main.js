/**
 * PIP'S PORTFOLIO — main.js
 * haX.baby "Baby's First Website" Hackathon 2026
 * Track 1: Pip, the Skull Baby · Junior Dream Engineer
 *
 * Features:
 * ✦ Custom cursor + sparkle trail
 * ✦ Web Audio API lullaby synth + mute toggle (REQUIRED)
 * ✦ Day/Night theme toggle with localStorage
 * ✦ Scroll-reveal animations + IntersectionObserver
 * ✦ Skill bar animations
 * ✦ Pip eye-tracking (hero avatar)
 * ✦ Lantern glow hover effect
 * ✦ Lullaby keyboard (playable piano)
 * ✦ Live guestbook (localStorage)
 * ✦ Visitor counter odometer
 * ✦ Hidden Easter egg: type "goodnight" OR click 💀 x5
 * ✦ Navbar scroll behaviour
 * ✦ Star field generator
 */

'use strict';

/* ── WAIT FOR DOM ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initTheme();
  initStarField();
  initNavbar();
  initCursor();
  initSparkleTrail();
  initScrollReveal();
  initSkillBars();
  initStoryScenes();
  initAudio();
  initLullabyKeys();
  initLanternEffect();
  initGuestbook();
  initOdometer();
  initEasterEgg();
  initCardTilt();
});

/* ══════════════════════════════════════════════════════════════
   1. LOADING SCREEN
══════════════════════════════════════════════════════════════ */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 1600);

  document.body.style.overflow = 'hidden';
}

/* ══════════════════════════════════════════════════════════════
   2. DAY / NIGHT THEME TOGGLE
══════════════════════════════════════════════════════════════ */
function initTheme() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  // Check saved preference
  const saved = localStorage.getItem('pip-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'night' : 'day');
  applyTheme(initial, false);

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'day' ? 'night' : 'day', true);
    playClickSound();
  });
}

function applyTheme(theme, animate = true) {
  const html = document.documentElement;

  if (animate) {
    html.style.transition = 'background 0.5s, color 0.5s';
    setTimeout(() => { html.style.transition = ''; }, 600);
  }

  html.setAttribute('data-theme', theme);
  localStorage.setItem('pip-theme', theme);

  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = theme === 'day' ? '🌙' : '☀️';

  // Update meta theme-color
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'day' ? '#fff8f1' : '#0d0a1a';

  // Pip avatar glow
  const avatar = document.getElementById('pip-avatar-img');
  if (avatar) {
    avatar.style.transition = 'filter 0.6s';
    avatar.style.filter = theme === 'night'
      ? 'drop-shadow(0 0 30px rgba(196,168,224,0.5)) drop-shadow(0 0 60px rgba(196,168,224,0.2))'
      : 'drop-shadow(0 8px 24px rgba(163,64,99,0.25))';
  }

  // Lantern glow
  const lanternImg = document.getElementById('lantern-img');
  if (lanternImg) {
    lanternImg.style.filter = theme === 'night'
      ? 'drop-shadow(0 0 24px #f5c842) drop-shadow(0 0 48px rgba(245,200,66,0.4)) brightness(1.1)'
      : 'drop-shadow(0 4px 12px rgba(245,200,66,0.3))';
  }
}

/* ══════════════════════════════════════════════════════════════
   3. ANIMATED STAR FIELD
══════════════════════════════════════════════════════════════ */
function initStarField() {
  const field = document.getElementById('star-field');
  if (!field) return;

  const starCount = 60;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < starCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'star-dot';
    const size = Math.random() * 3 + 1;
    Object.assign(dot.style, {
      left:       `${Math.random() * 100}%`,
      top:        `${Math.random() * 100}%`,
      width:      `${size}px`,
      height:     `${size}px`,
      '--duration': `${Math.random() * 4 + 2}s`,
      '--delay':    `${Math.random() * 4}s`,
    });
    fragment.appendChild(dot);
  }

  field.appendChild(fragment);
}

/* ══════════════════════════════════════════════════════════════
   4. NAVBAR SCROLL BEHAVIOUR
══════════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    navbar.classList.toggle('scrolled', scroll > 60);
    lastScroll = scroll;
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════════════
   5. CUSTOM CURSOR + HOVER STATES
══════════════════════════════════════════════════════════════ */
function initCursor() {
  // Only on non-touch devices
  if (!window.matchMedia('(hover: hover)').matches) return;

  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  let cx = 0, cy = 0;
  let tx = 0, ty = 0;

  document.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
  });

  // Smooth lag cursor
  function animate() {
    cx += (tx - cx) * 0.15;
    cy += (ty - cy) * 0.15;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  // Hover states
  const interactables = document.querySelectorAll('a, button, .project-card, .lullaby-key, .trait-pill');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%,-50%) scale(0.8)');
  document.addEventListener('mouseup',   () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
}

/* ══════════════════════════════════════════════════════════════
   6. SPARKLE CURSOR TRAIL (+2 pts Side Quest)
══════════════════════════════════════════════════════════════ */
function initSparkleTrail() {
  if (!window.matchMedia('(hover: hover)').matches) return;

  const canvas = document.getElementById('sparkle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const particles = [];
  const SYMBOLS = ['✦', '✧', '·', '⋆', '°', '☆', '★'];
  let mouseX = -200, mouseY = -200;
  let lastSpawn = 0;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const now = Date.now();
    if (now - lastSpawn > 30) { // spawn every 30ms
      spawnParticle(e.clientX, e.clientY);
      lastSpawn = now;
    }
  });

  function spawnParticle(x, y) {
    const theme = document.documentElement.getAttribute('data-theme');
    const hue = theme === 'night'
      ? Math.random() * 60 + 260  // purples/pinks
      : Math.random() * 40 + 320; // pinks/reds

    particles.push({
      x, y,
      alpha: 1,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      size: Math.random() * 14 + 7,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5 - 0.8,
      decay: Math.random() * 0.02 + 0.015,
      color: `hsl(${hue}, 80%, 70%)`
    });

    // Keep particle pool manageable
    if (particles.length > 60) particles.shift();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.alpha  -= p.decay;
      p.x      += p.vx;
      p.y      += p.vy;
      p.vy     += 0.03; // gentle gravity

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle   = p.color;
      ctx.font        = `${p.size}px serif`;
      ctx.fillText(p.symbol, p.x, p.y);
      ctx.restore();
    }

    requestAnimationFrame(draw);
  }
  draw();
}

/* ══════════════════════════════════════════════════════════════
   7. SCROLL REVEAL (IntersectionObserver)
══════════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════════════════════
   8. SKILL BARS ANIMATION
══════════════════════════════════════════════════════════════ */
function initSkillBars() {
  const skillRows = document.querySelectorAll('.skill-row');
  if (!skillRows.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const row = entry.target;
        const fill = row.querySelector('.skill-bar-fill');
        const pct  = row.dataset.pct || '0.8';

        // Stagger animation
        setTimeout(() => {
          fill.style.width = (parseFloat(pct) * 100) + '%';
          fill.style.transform = 'scaleX(1)';
          row.classList.add('animated');
        }, 100 * [...skillRows].indexOf(row));

        observer.unobserve(row);
      }
    });
  }, { threshold: 0.5 });

  skillRows.forEach(row => observer.observe(row));
}

/* ══════════════════════════════════════════════════════════════
   9. STORY SCROLL SCENES
══════════════════════════════════════════════════════════════ */
function initStoryScenes() {
  const scenes = document.querySelectorAll('.story-scene');
  if (!scenes.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });

  scenes.forEach(scene => observer.observe(scene));
}

/* ══════════════════════════════════════════════════════════════
   10. WEB AUDIO API — LULLABY SYNTH + CLICK SOUNDS
       MUTE TOGGLE IS REQUIRED BY HACKATHON RULES
══════════════════════════════════════════════════════════════ */
let audioCtx = null;
let isMuted  = false;

// Pentatonic C major scale (C4–C5)
const PENTATONIC = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];

function initAudio() {
  const muteBtn = document.getElementById('mute-toggle');
  if (!muteBtn) return;

  // Initialise AudioContext on first interaction
  document.addEventListener('click', ensureAudioCtx, { once: true });
  document.addEventListener('keydown', ensureAudioCtx, { once: true });

  // Mute toggle
  muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    muteBtn.setAttribute('aria-pressed', String(isMuted));
    muteBtn.textContent = isMuted ? '🔇' : '🔊';
    muteBtn.classList.toggle('muted', isMuted);
    muteBtn.title = isMuted ? 'Unmute sounds' : 'Mute sounds';
    localStorage.setItem('pip-muted', String(isMuted));
  });

  // Restore mute preference
  if (localStorage.getItem('pip-muted') === 'true') {
    isMuted = true;
    muteBtn.setAttribute('aria-pressed', 'true');
    muteBtn.textContent = '🔇';
    muteBtn.classList.add('muted');
  }
}

function ensureAudioCtx() {
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) audioCtx = new AudioCtx();
  }
}

/**
 * Play a single tone using Web Audio API
 * @param {number} freq     - Frequency in Hz
 * @param {number} duration - Duration in seconds
 * @param {number} gain     - Volume (0–1)
 * @param {'sine'|'triangle'|'sawtooth'} type - Oscillator waveform
 */
function playTone(freq, duration = 0.6, gain = 0.25, type = 'sine') {
  if (isMuted || !audioCtx) return;

  const osc  = audioCtx.createOscillator();
  const gain_node = audioCtx.createGain();

  osc.type = type;
  osc.frequency.value = freq;

  // Bell-like envelope: short attack, long release
  gain_node.gain.setValueAtTime(0, audioCtx.currentTime);
  gain_node.gain.linearRampToValueAtTime(gain, audioCtx.currentTime + 0.02);
  gain_node.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

  osc.connect(gain_node);
  gain_node.connect(audioCtx.destination);

  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + duration);
}

/** Short click sound for UI interactions */
function playClickSound() {
  const randNote = PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)];
  playTone(randNote, 0.25, 0.18, 'sine');
}

/* ══════════════════════════════════════════════════════════════
   11. LULLABY LAB — INTERACTIVE PIANO KEYS
══════════════════════════════════════════════════════════════ */
function initLullabyKeys() {
  const keys = document.querySelectorAll('.lullaby-key');
  if (!keys.length) return;

  keys.forEach(key => {
    const noteIdx = parseInt(key.dataset.note, 10);

    const play = () => {
      ensureAudioCtx();
      playTone(PENTATONIC[noteIdx], 0.8, 0.3, 'sine');
      key.classList.add('pressed');
      setTimeout(() => key.classList.remove('pressed'), 180);
    };

    key.addEventListener('click', play);
    key.addEventListener('touchstart', (e) => { e.preventDefault(); play(); }, { passive: false });
  });

  // Keyboard support: keys 1–6 play the notes
  document.addEventListener('keydown', (e) => {
    const idx = parseInt(e.key, 10) - 1;
    if (idx >= 0 && idx < PENTATONIC.length) {
      const key = document.querySelector(`.lullaby-key[data-note="${idx}"]`);
      if (key) key.click();
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   12. NIGHTLIGHT LANTERN GLOW HOVER
══════════════════════════════════════════════════════════════ */
function initLanternEffect() {
  const card = document.getElementById('nightlight-card');
  const wrap = document.getElementById('lantern-wrap');
  const img  = document.getElementById('lantern-img');
  if (!card || !wrap || !img) return;

  card.addEventListener('mouseenter', () => {
    ensureAudioCtx();

    // Play a soft chime
    playTone(528, 1.2, 0.15, 'sine');

    wrap.style.background = 'radial-gradient(ellipse at 50% 60%, rgba(245,200,66,0.2) 0%, #0d0a1a 60%)';
    img.style.filter = 'drop-shadow(0 0 20px #f5c842) drop-shadow(0 0 50px rgba(245,200,66,0.4)) brightness(1.15)';
    img.style.transform = 'scale(1.05) translateY(-4px)';
  });

  card.addEventListener('mouseleave', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    wrap.style.background = 'linear-gradient(135deg, #0d0a1a 0%, #1a1228 100%)';
    img.style.filter = theme === 'night'
      ? 'drop-shadow(0 0 24px #f5c842) drop-shadow(0 0 48px rgba(245,200,66,0.4)) brightness(1.1)'
      : 'drop-shadow(0 4px 12px rgba(245,200,66,0.3))';
    img.style.transform = '';
  });
}

/* ══════════════════════════════════════════════════════════════
   13. GUESTBOOK — LOCAL STORAGE DREAM WALL (+2 pts Side Quest)
══════════════════════════════════════════════════════════════ */
const DREAMS_KEY = 'pip-dream-wall';

const SEED_DREAMS = [
  { name: 'Luna',    location: 'Mumbai',    wish: 'I dream of flying over silver seas with Pip tonight!',            time: '2 min ago' },
  { name: 'Aiden',   location: 'Delhi',     wish: 'Tonight I dream of a library made entirely of clouds.',           time: '5 min ago' },
  { name: 'Priya',   location: 'Bangalore', wish: 'I want to dream about a field of fireflies and warm tea.',        time: '11 min ago' },
  { name: 'Kai',     location: 'Chennai',   wish: 'Tonight, please bring me a dream of music that never ends.',      time: '18 min ago' },
  { name: 'Zara',    location: 'Pune',      wish: 'I dream of painting the night sky with Pip using stardust.',      time: '25 min ago' },
];

function initGuestbook() {
  const form  = document.getElementById('dream-form');
  const wall  = document.getElementById('dream-wall');
  if (!form || !wall) return;

  // Load existing + seeded dreams
  let dreams = loadDreams();
  if (dreams.length === 0) {
    dreams = SEED_DREAMS;
    saveDreams(dreams);
  }

  renderDreamWall(dreams);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    ensureAudioCtx();

    const name  = document.getElementById('visitor-name').value.trim();
    const loc   = document.getElementById('visitor-location').value.trim();
    const wish  = document.getElementById('visitor-wish').value.trim();

    if (!name || !wish) return;

    // Play success chime
    playTone(523.25, 0.8, 0.25);
    setTimeout(() => playTone(659.25, 0.8, 0.2), 300);
    setTimeout(() => playTone(783.99, 1.2, 0.18), 600);

    const newDream = {
      name,
      location: loc || '✦ Dreamland',
      wish,
      time: 'just now',
    };

    dreams = [newDream, ...dreams].slice(0, 20); // keep latest 20
    saveDreams(dreams);
    renderDreamWall(dreams);

    form.reset();

    // Update odometer
    updateOdometer(getVisitCount());
  });
}

function loadDreams() {
  try {
    return JSON.parse(localStorage.getItem(DREAMS_KEY) || '[]');
  } catch { return []; }
}

function saveDreams(dreams) {
  localStorage.setItem(DREAMS_KEY, JSON.stringify(dreams));
}

function renderDreamWall(dreams) {
  const wall = document.getElementById('dream-wall');
  if (!wall) return;

  wall.innerHTML = dreams.map(d => `
    <div class="dream-card">
      <div class="dream-card-name">🌙 ${escapeHtml(d.name)} <span style="color:var(--text-soft); font-size:0.75rem; font-family:var(--font-mono)">from ${escapeHtml(d.location)}</span></div>
      <div class="dream-card-wish">"${escapeHtml(d.wish)}"</div>
      <div class="dream-card-time">${escapeHtml(d.time)}</div>
    </div>
  `).join('');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/* ══════════════════════════════════════════════════════════════
   14. VISITOR COUNTER ODOMETER (+1 pt Side Quest)
══════════════════════════════════════════════════════════════ */
function initOdometer() {
  const count = getVisitCount();
  renderOdometer(count);
}

function getVisitCount() {
  let count = parseInt(localStorage.getItem('pip-visit-count') || '0', 10);
  count += 1;
  localStorage.setItem('pip-visit-count', String(count));
  return count + 2847; // Offset so it starts at a nice number
}

function renderOdometer(count) {
  const odometer = document.getElementById('odometer');
  if (!odometer) return;

  const digits = String(count).padStart(6, '0').split('');
  odometer.innerHTML = digits.map((d, i) => `
    <div class="odometer-digit" style="animation-delay:${i * 0.1}s">${d}</div>
  `).join('');
}

function updateOdometer(count) {
  renderOdometer(count + 1);
}

/* ══════════════════════════════════════════════════════════════
   15. HIDDEN EASTER EGG 🥚
       — Type "GOODNIGHT" anywhere
       — OR click the footer skull 5 times
       — OR click the Pip nightcap star 5 times (in footer)
══════════════════════════════════════════════════════════════ */
function initEasterEgg() {
  let typed = '';
  let skullClicks = 0;
  let skullResetTimer = null;

  // Keyboard trigger: type "GOODNIGHT"
  document.addEventListener('keypress', (e) => {
    typed += e.key.toUpperCase();
    if (typed.includes('GOODNIGHT')) {
      triggerEasterEgg();
      typed = '';
      return;
    }
    // Reset buffer after 3s of inactivity
    if (typed.length > 20) typed = typed.slice(-20);
  });

  // Skull click trigger
  const skull = document.getElementById('pip-footer-skull');
  if (skull) {
    skull.addEventListener('click', () => {
      skullClicks++;

      // Visual feedback
      skull.style.transform = `scale(${1 + skullClicks * 0.1}) rotate(${skullClicks * 15}deg)`;

      clearTimeout(skullResetTimer);
      skullResetTimer = setTimeout(() => {
        skullClicks = 0;
        skull.style.transform = '';
      }, 2000);

      if (skullClicks >= 5) {
        skull.style.transform = '';
        skullClicks = 0;
        triggerEasterEgg();
      }
    });

    // Keyboard accessible
    skull.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') skull.click();
    });
  }
}

function triggerEasterEgg() {
  // Show overlay
  const backdrop = document.getElementById('easter-egg-backdrop');
  const msg      = document.getElementById('easter-egg-msg');

  if (backdrop) backdrop.classList.add('show');
  if (msg)      msg.classList.add('show');

  // Confetti! (using canvas-confetti CDN)
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#a34063', '#f5c842', '#e8d5b7', '#fff8f1', '#c4a8e0', '#5c4033'],
    });
    // Second burst
    setTimeout(() => confetti({
      particleCount: 80,
      spread: 120,
      origin: { x: 0.1, y: 0.6 },
      colors: ['#a34063', '#f5c842', '#c4a8e0'],
    }), 500);
    setTimeout(() => confetti({
      particleCount: 80,
      spread: 120,
      origin: { x: 0.9, y: 0.6 },
      colors: ['#a34063', '#f5c842', '#e8d5b7'],
    }), 800);
  }

  // Play secret lullaby melody
  ensureAudioCtx();
  const secretMelody = [261.63, 329.63, 392.00, 523.25, 659.25, 523.25, 392.00, 329.63, 261.63];
  secretMelody.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 1.0, 0.2, 'sine'), i * 350);
  });

  // Close on Escape
  const onEscape = (e) => {
    if (e.key === 'Escape') {
      closeEasterEgg();
      document.removeEventListener('keydown', onEscape);
    }
  };
  document.addEventListener('keydown', onEscape);
}

// Global function (called from HTML onclick)
window.closeEasterEgg = function () {
  document.getElementById('easter-egg-backdrop')?.classList.remove('show');
  document.getElementById('easter-egg-msg')?.classList.remove('show');
};

/* ══════════════════════════════════════════════════════════════
   16. PROJECT CARD TILT EFFECT
══════════════════════════════════════════════════════════════ */
function initCardTilt() {
  if (!window.matchMedia('(hover: hover)').matches) return;

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const tilt   = 6;

      card.style.transform = `translateY(-8px) rotateX(${-dy * tilt}deg) rotateY(${dx * tilt}deg)`;

      // Update gradient position for the glow effect
      const mx = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const my = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      card.style.setProperty('--mx', mx + '%');
      card.style.setProperty('--my', my + '%');
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   17. CONFETTI LIBRARY (inline fallback if CDN unavailable)
       Full canvas-confetti via CDN script tag in index.html
       We add it dynamically here as a fallback
══════════════════════════════════════════════════════════════ */
(function loadConfettiCDN() {
  if (typeof confetti !== 'undefined') return;
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
  script.async = true;
  document.head.appendChild(script);
})();

/* ══════════════════════════════════════════════════════════════
   18. HERO PARALLAX (subtle scroll effect)
══════════════════════════════════════════════════════════════ */
(function initParallax() {
  const pipHero = document.getElementById('pip-hero');
  if (!pipHero) return;
  if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    pipHero.style.transform = `translateY(${scroll * 0.12}px)`;
  }, { passive: true });
})();

/* ══════════════════════════════════════════════════════════════
   19. SMOOTH CLICK SOUNDS ON ALL BUTTONS & LINKS
══════════════════════════════════════════════════════════════ */
document.addEventListener('click', (e) => {
  const target = e.target.closest('a, button');
  if (target && !target.id.includes('mute') && !target.id.includes('theme')) {
    // Don't double-play for lullaby keys (they handle their own audio)
    if (!target.classList.contains('lullaby-key')) {
      playClickSound();
    }
  }
}, { passive: true });

/* ══════════════════════════════════════════════════════════════
   20. GOODBYE — Pip waves when tab becomes visible again
══════════════════════════════════════════════════════════════ */
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    // Pip wakes up when you come back!
    const avatar = document.getElementById('pip-avatar-img');
    if (avatar) {
      avatar.style.animation = 'none';
      avatar.style.transform = 'scale(1.05)';
      setTimeout(() => {
        avatar.style.transform = '';
        avatar.style.animation = '';
      }, 400);
    }
  }
});
