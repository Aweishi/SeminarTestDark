(function () {
  const GAP = 16; // must match CSS gap value

  function initTrack(track) {
    const origItems = Array.from(track.children);
    if (!origItems.length) return;

    const container = track.closest('.partners-marquee');
    if (!container) return;

    // Total pixel width of one full set (items + gaps between them + trailing gap for seamless join)
    const setWidth = origItems.reduce((sum, el) => sum + el.offsetWidth + GAP, 0);
    const containerWidth = container.clientWidth;

    // If content fits in one line — stay static, no marquee
    if (setWidth - GAP <= containerWidth) {
      container.classList.add('is-static');
      return;
    }

    // Overflows — enable marquee
    container.classList.add('is-marquee');

    // Clone enough full sets so the track always fills the viewport seamlessly
    const needed = Math.ceil((window.innerWidth * 2) / setWidth) + 1;
    for (let i = 0; i < needed; i++) {
      origItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
    }

    // speed = seconds per 1000px
    const speed = parseFloat(track.dataset.marqueeSpeed) || 20;
    const duration = (setWidth / 1000) * speed;

    track.style.setProperty('--marquee-offset', `-${setWidth}px`);
    track.style.setProperty('--marquee-duration', `${duration}s`);
  }

  function init() {
    document.querySelectorAll('.partners-marquee-track').forEach(initTrack);

    // Pause on hover (only affects marquee containers)
    document.querySelectorAll('.partners-marquee.is-marquee').forEach(marquee => {
      const track = marquee.querySelector('.partners-marquee-track');
      marquee.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
      marquee.addEventListener('mouseleave', () => { track.style.animationPlayState = 'running'; });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
