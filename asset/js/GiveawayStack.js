(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const section  = document.getElementById('giveaway');
  const deck     = document.getElementById('giveaway-deck');
  const controls = document.getElementById('giveaway-controls');
  const prevBtn  = document.getElementById('gw-prev');
  const nextBtn  = document.getElementById('gw-next');
  const dotsWrap = document.getElementById('gw-dots');

  if (!section || !deck) return;

  const allCards = Array.from(deck.querySelectorAll('.giveaway-card'));
  const n = allCards.length;
  if (n < 1) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let currentPage = 0;
  let isSpread    = false;
  let st          = null;
  let animating   = false;

  function getPerPage() {
    if (window.innerWidth <= 768)  return 1;
    if (window.innerWidth <= 1024) return 2;
    return 4;
  }
  function getTotalPages() { return Math.ceil(n / getPerPage()); }
  function getCardWidth()  { return window.innerWidth <= 768 ? 240 : 260; }

  function getPageCards(page) {
    const pp = getPerPage();
    return allCards.slice(page * pp, page * pp + pp);
  }

  function getStep(count, cw) {
    if (count <= 1) return 0;
    const W   = window.innerWidth;
    const pad = W <= 480 ? 48 : W <= 768 ? 64 : 160;
    return Math.min(cw + 28, (W - pad - cw) / (count - 1));
  }

  /* ── Stacked state ── */
  function positionStacked(cards) {
    const m    = cards.length;
    const maxD = Math.max(m - 1, 1);
    gsap.set(cards, { display: 'block' });
    cards.forEach((card, i) => {
      const depth = m - 1 - i;
      gsap.set(card, {
        x: -depth * 5, y: -depth * 8,
        rotation: -depth * (8 / maxD),
        scale:    1 - depth * (0.1 / maxD),
        zIndex:   i + 1,
        transformOrigin: 'center bottom',
      });
    });
  }

  /* ── Spread ── */
  function animateSpread(cards) {
    const m    = cards.length;
    const cw   = getCardWidth();
    const step = getStep(m, cw);
    const mid  = (m - 1) / 2;

    const tl = gsap.timeline({ onComplete() { animating = false; } });
    cards.forEach((card, i) => {
      const tx  = (i - mid) * step;
      const rot = (m > 1 && mid > 0) ? ((i - mid) / mid) * 5 : 0;
      tl.to(card, { x: tx, y: 0, rotation: rot, scale: 1, duration: 0.6, ease: 'power3.out' }, i * 0.08);
    });
  }

  /* ── Collapse back to stack ── */
  function animateCollapse(cards, onDone) {
    const m    = cards.length;
    const maxD = Math.max(m - 1, 1);
    const tl   = gsap.timeline({ onComplete: onDone });
    cards.forEach((card, i) => {
      const depth = m - 1 - i;
      tl.to(card, {
        x: -depth * 5, y: -depth * 8,
        rotation: -depth * (8 / maxD),
        scale:    1 - depth * (0.1 / maxD),
        duration: 0.32, ease: 'power2.in',
      }, 0);
    });
  }

  /* ── Controls ── */
  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    const total = getTotalPages();
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'spk-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Prize group ' + (i + 1));
      dot.addEventListener('click', () => { if (!animating && i !== currentPage) goToPage(i); });
      dotsWrap.appendChild(dot);
    }
  }

  function updateControls() {
    const total = getTotalPages();
    if (controls) controls.style.display = total <= 1 ? 'none' : '';
    if (prevBtn) prevBtn.disabled = currentPage === 0;
    if (nextBtn) nextBtn.disabled = currentPage >= total - 1;
    dotsWrap && dotsWrap.querySelectorAll('.spk-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentPage);
    });
  }

  function goToPage(page) {
    if (animating) return;
    animating = true;
    const from = getPageCards(currentPage);
    animateCollapse(from, () => {
      gsap.set(from, { display: 'none' });
      currentPage = page;
      const to = getPageCards(currentPage);
      positionStacked(to);
      animateSpread(to);
      updateControls();
    });
    dotsWrap && dotsWrap.querySelectorAll('.spk-dot').forEach((d, i) => {
      d.classList.toggle('active', i === page);
    });
    if (prevBtn) prevBtn.disabled = page === 0;
    if (nextBtn) nextBtn.disabled = page >= getTotalPages() - 1;
  }

  function init() {
    if (st) { st.kill(); st = null; }
    gsap.set(allCards, { display: 'none' });
    positionStacked(getPageCards(0));
    isSpread = false;
    currentPage = 0;
    buildDots();
    updateControls();

    st = ScrollTrigger.create({
      trigger: section,
      start: 'top 25%',
      onEnter() {
        if (!isSpread) { isSpread = true; animateSpread(getPageCards(currentPage)); }
      },
      onLeaveBack() {
        isSpread = false;
        gsap.killTweensOf(getPageCards(currentPage));
        positionStacked(getPageCards(currentPage));
      },
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { if (currentPage > 0) goToPage(currentPage - 1); });
  if (nextBtn) nextBtn.addEventListener('click', () => { if (currentPage < getTotalPages() - 1) goToPage(currentPage + 1); });

  init();

  let rTimer;
  window.addEventListener('resize', () => {
    clearTimeout(rTimer);
    rTimer = setTimeout(() => { currentPage = 0; init(); if (isSpread) animateSpread(getPageCards(0)); }, 200);
  });
})();
