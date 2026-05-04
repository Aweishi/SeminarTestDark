(function () {
  const track = document.getElementById('speakers-track');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.speaker-card'));
  const total = cards.length;
  const prevBtn = document.getElementById('spk-prev');
  const nextBtn = document.getElementById('spk-next');
  const dotsWrap = document.getElementById('spk-dots');
  const controls = document.getElementById('speakers-controls');

  const GAP = 24;
  let current = 0;

  function getVisible() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function getCardWidth() {
    const wrapW = track.parentElement.offsetWidth;
    const visible = getVisible();
    /* peek: show 0.5 of next card when ≥ 2 visible, full width on mobile */
    const perView = visible >= 2 ? visible + 0.5 : 1;
    const gaps = Math.ceil(perView) - 1;
    return (wrapW - GAP * gaps) / perView;
  }

  function getMaxPos() {
    return Math.max(0, total - getVisible());
  }

  function applyCardWidths() {
    const cw = getCardWidth();
    cards.forEach(c => { c.style.width = cw + 'px'; });
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    const steps = getMaxPos() + 1;

    /* hide controls entirely when all cards fit */
    if (total <= getVisible()) {
      controls.style.display = 'none';
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      return;
    }
    controls.style.display = '';
    prevBtn.style.display = '';
    nextBtn.style.display = '';

    for (let i = 0; i < steps; i++) {
      const dot = document.createElement('button');
      dot.className = 'spk-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to position ' + (i + 1));
      dot.addEventListener('click', () => { current = i; render(); });
      dotsWrap.appendChild(dot);
    }
  }

  function render() {
    const maxPos = getMaxPos();
    current = Math.min(current, maxPos);

    const cw = getCardWidth();
    const offset = current * (cw + GAP);
    track.style.transform = `translateX(-${offset}px)`;

    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= maxPos;

    dotsWrap.querySelectorAll('.spk-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', () => { if (current > 0) { current--; render(); } });
  nextBtn.addEventListener('click', () => { if (current < getMaxPos()) { current++; render(); } });

  let rTimer;
  window.addEventListener('resize', () => {
    clearTimeout(rTimer);
    rTimer = setTimeout(() => { applyCardWidths(); buildDots(); render(); }, 80);
  });

  applyCardWidths();
  buildDots();
  render();
})();

function initPixelatedImageReveal() {
  const animationStepDuration = 0.2;
  const gridSize = 10;
  const pixelSize = 100 / gridSize;
  const cards = document.querySelectorAll('[data-pixelated-image-reveal]');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches;

  cards.forEach((card) => {
    const pixelGrid = card.querySelector('[data-pixelated-image-reveal-grid]');
    const activeCard = card.querySelector('[data-pixelated-image-reveal-active]');
    const existingPixels = pixelGrid.querySelectorAll('.pixelated-image-card__pixel');
    existingPixels.forEach(pixel => pixel.remove());

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixelated-image-card__pixel');
        pixel.style.width = `${pixelSize}%`;
        pixel.style.height = `${pixelSize}%`;
        pixel.style.left = `${col * pixelSize}%`;
        pixel.style.top = `${row * pixelSize}%`;
        pixelGrid.appendChild(pixel);
      }
    }

    // Mobile (≤768px): bio is always visible below the photo via CSS — skip animation
    if (isTouchDevice && window.innerWidth <= 768) return;

    const pixels = pixelGrid.querySelectorAll('.pixelated-image-card__pixel');
    const totalPixels = pixels.length;
    const staggerDuration = animationStepDuration / totalPixels;
    let isActive = false;
    let delayedCall;

    const animatePixels = (activate) => {
      isActive = activate;
      gsap.killTweensOf(pixels);
      if (delayedCall) delayedCall.kill();
      gsap.set(pixels, { display: 'none' });

      gsap.to(pixels, {
        display: 'block',
        duration: 0,
        stagger: { each: staggerDuration, from: 'random' }
      });

      delayedCall = gsap.delayedCall(animationStepDuration, () => {
        activeCard.style.display = activate ? 'flex' : 'none';
        activeCard.style.pointerEvents = activate ? 'none' : '';
      });

      gsap.to(pixels, {
        display: 'none',
        duration: 0,
        delay: animationStepDuration,
        stagger: { each: staggerDuration, from: 'random' }
      });
    };

    if (isTouchDevice) {
      card.addEventListener('click', () => animatePixels(!isActive));
    } else {
      card.addEventListener('mouseenter', () => {
        if (!isActive) animatePixels(true);
      });
      card.addEventListener('mouseleave', () => {
        if (isActive) animatePixels(false);
      });
    }
  });
}

function initSpeakersReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = document.querySelectorAll('#speakers-track .speaker-card');
  if (!cards.length || !window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  /* start invisible */
  gsap.set(cards, { opacity: 0, y: 100, scale: 0.94 });

  ScrollTrigger.create({
    trigger: '#speakers',
    start: 'top 50%',
    onEnter() {
      gsap.to(cards, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
      });
    },
    onLeaveBack() {
      gsap.set(cards, { opacity: 0, y: 100, scale: 0.94 });
    },
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initPixelatedImageReveal();
  initSpeakersReveal();
});