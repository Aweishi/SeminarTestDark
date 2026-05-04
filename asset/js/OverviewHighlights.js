(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  const cards = document.querySelectorAll('.overview-highlight');
  if (!cards.length) return;

  // ── Stagger entrance ──
  gsap.set(cards, { opacity: 0, y: 64, scale: 0.96 });

  ScrollTrigger.create({
    trigger: '.overview-highlights',
    start: 'top 70%',
    onEnter() {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
      });
    },
    onLeaveBack() {
      gsap.set(cards, { opacity: 0, y: 64, scale: 0.96 });
    },
  });

  // ── Parallax per card ──
  cards.forEach((card) => {
    const media = card.querySelector('.overview-highlight-media');
    if (!media) return;

    gsap.fromTo(
      media,
      { yPercent: -15 },
      {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  });
})();
