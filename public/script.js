/* script.js — loader to main, and video param handling */

/* ---------- YouTube ID extractor ----------
 Accepts:
  - raw video ID (11-char)
  - https://youtu.be/VIDEOID
  - https://www.youtube.com/watch?v=VIDEOID
*/
function getYouTubeID(input) {
  if (!input) return null;

  // Raw 11-char ID
  const raw = String(input).trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) return raw;

  // Try URL parse
  try {
    const url = new URL(raw);
    // short link
    if (url.hostname.includes('youtu.be')) {
      return url.pathname.slice(1).split(/[?&]/)[0] || null;
    }
    // youtube domain
    if (url.hostname.includes('youtube.com')) {
      return url.searchParams.get('v') || null;
    }
  } catch (e) {
    // not a URL
  }

  // fallback: try to extract 11-chars anywhere
  const maybe = raw.match(/[A-Za-z0-9_-]{11}/);
  return maybe ? maybe[0] : null;
}

/* ---------- read params ----------
 webVideo takes priority over video
*/
function readVideoParam() {
  const params = new URLSearchParams(window.location.search);
  return params.get('webVideo') || params.get('video') || null;
}

/* ---------- Loader simulation ----------
 Smooth increments with small random steps, reaches 100, then reveal UI.
*/
function runLoader({onComplete} = {}) {
  const percentEl = document.getElementById('percent');
  const progressBar = document.getElementById('progressBar');

  let pct = 0;

  // Non-linear step pattern for realism
  function step() {
    // if near end, smaller increments; otherwise random medium increments
    const gap = 100 - pct;
    let inc;
    if (gap > 40) inc = Math.random() * 6 + 6;         // faster early
    else if (gap > 12) inc = Math.random() * 4 + 2.5;  // medium
    else inc = Math.random() * 1.7 + 0.3;              // fine-tuning

    pct = Math.min(100, +(pct + inc).toFixed(2));
    percentEl.textContent = `${Math.floor(pct)}%`;
    progressBar.style.width = `${pct}%`;

    if (pct < 100) {
      // variable timeout to feel organic
      const t = 90 + Math.random() * 140;
      setTimeout(step, t);
    } else {
      // small pause at 100 for polish
      setTimeout(() => {
        onComplete && onComplete();
      }, 450);
    }
  }

  // slight startup delay then start
  setTimeout(step, 300);
}

/* ---------- Show main UI ----------
 Hide loader and reveal main container with animations.
*/
function revealMain() {
  const loaderEl = document.getElementById('loader');
  const container = document.querySelector('.container');

  // Fade out loader
  loaderEl.style.transition = 'opacity 420ms ease, transform 420ms ease';
  loaderEl.style.opacity = '0';
  loaderEl.style.transform = 'scale(0.98) translateY(-6px)';

  // after fade, remove from layout and show container
  setTimeout(() => {
    loaderEl.style.display = 'none';
    container.classList.add('show');
    container.setAttribute('aria-hidden','false');
    document.querySelector('.overlay').setAttribute('aria-hidden','false');
  }, 460);
}

/* ---------- Setup video src ----------
 Default island video ID (Island Song)
*/
const DEFAULT_VIDEO = 'q3w-NOtKo4A';

function applyVideoParam() {
  const rawParam = readVideoParam();
  const chosen = getYouTubeID(rawParam) || DEFAULT_VIDEO;
  const iframe = document.getElementById('ytPlayer');
  iframe.src = `https://www.youtube.com/embed/${chosen}?rel=0`;
}

/* ---------- Init flow ----------
 Start loader, then on complete reveal and load video.
*/
window.addEventListener('DOMContentLoaded', () => {
  // Start loader progress
  runLoader({
    onComplete() {
      // Once loader done -> reveal UI and set video
      revealMain();
      applyVideoParam();

      // small parallax effect for extra polish
      document.addEventListener('mousemove', (e) => {
        const cont = document.querySelector('.container');
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        cont.style.transform = `translate(${x}px, ${y}px) scale(1)`;
      });

      console.log('🌴 Island ready — video loaded. Website by Luis.');
    }
  });
});
