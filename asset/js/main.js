gsap.registerPlugin(ScrollTrigger);

// Conditionally register SplitText if available
if (typeof SplitText !== 'undefined') {
  gsap.registerPlugin(SplitText);
}

// ── Mobile menu ──
(function () {
  const hamburger = document.getElementById('nav-hamburger');
  const menu      = document.getElementById('mobile-menu');
  const links     = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    gsap.fromTo(links,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.07, delay: 0.1 }
    );
  }

  function closeMenu() {
    // Fade links out first, then remove class so clip-path collapses
    gsap.to(links, { opacity: 0, y: 16, duration: 0.2, ease: 'power2.in', stagger: 0.03 });
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    // Wait for links to fade, then trigger clip-path collapse
    setTimeout(() => {
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }, 220);
  }

  hamburger.addEventListener('click', () => {
    menu.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) closeMenu();
  });
})();

// ── Page load entrance ──
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  // Initial states — set before anything renders
  gsap.set('#hero-bg',    { scale: 1.05 });
  gsap.set('.nav-logo',   { autoAlpha: 0, y: -10 });
  // Use opacity only (not autoAlpha) — scroll trigger also uses opacity,
  // mixing autoAlpha + opacity on the same element causes visibility state conflicts on scrub-up
  gsap.set('#hero-svg',   { opacity: 0, scale: 0.96 });
  gsap.set('#scroll-hint',{ autoAlpha: 0, y: 10 });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl
    .to('#hero-bg',     { scale: 1, duration: 2.4, ease: 'power2.out' }, 0)
    .to('.nav-logo',    { autoAlpha: 1, y: 0, duration: 0.7 }, 0.15)
    .to('#hero-svg',    { opacity: 1, scale: 1, duration: 1.0 }, 0.4)
    .to('#scroll-hint', { autoAlpha: 1, y: 0, duration: 0.6 }, 1.1);
})();

// ── Nav scroll state ──
ScrollTrigger.create({
  start: 'top -60',
  onUpdate: (self) => {
    const nav = document.getElementById('main-nav');
    if (self.scroll() > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
});

// ── Hero parallax ──
gsap.to('#hero-bg', {
  yPercent: 28,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

// ── Hero SVG fade on scroll ──
// Use fromTo so the "from" state is always explicit (opacity:1, y:0),
// regardless of what GSAP recorded at initialization time from the page-load set.
// immediateRender:false prevents overriding the page-load entrance animation.
gsap.fromTo('#hero-svg',
  { opacity: 1, y: 0 },
  {
    opacity: 0,
    y: -50,
    immediateRender: false,
    scrollTrigger: {
      trigger: '#hero',
      start: '25% top',
      end: '75% top',
      scrub: true
    }
  }
);

// ── Scroll hint fade ──
gsap.to('#scroll-hint', {
  opacity: 0,
  scrollTrigger: {
    trigger: '#hero',
    start: '15% top',
    end: '35% top',
    scrub: true
  }
});

// ── Section eyebrow slide-in ──
gsap.utils.toArray('.section-eyebrow').forEach(el => {
  gsap.from(el, {
    opacity: 0, x: -18, duration: 0.55, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%' }
  });
});

// ── Footer entrance ──
gsap.from('#footer', {
  y: 36, opacity: 0, duration: 0.85, ease: 'power3.out',
  scrollTrigger: { trigger: '#footer', start: 'top 94%' }
});

// ── About cells stagger slide ──
gsap.from('.about-cell', {
  y: 48,
  opacity: 0,
  stagger: 0.12,
  duration: 0.85,
  ease: 'power3.out',
  scrollTrigger: { trigger: '.about-grid', start: 'top 78%' }
});

// ── Agenda rows slide from left ──
gsap.from('.agenda-row:not(.is-header)', {
  x: -72,
  opacity: 0,
  stagger: 0.08,
  duration: 0.7,
  ease: 'power3.out',
  scrollTrigger: { trigger: '#agenda-table', start: 'top 76%' }
});

// ── Registration ──
gsap.from('#reg-left', {
  x: -48, opacity: 0, duration: 0.9, ease: 'power3.out',
  scrollTrigger: { trigger: '.reg-grid', start: 'top 80%' }
});
gsap.from('#reg-right', {
  x: 48, opacity: 0, duration: 0.9, ease: 'power3.out',
  scrollTrigger: { trigger: '.reg-grid', start: 'top 80%' }
});

// ── Contact cards ──
gsap.from('#contact-grid > div', {
  y: 48,
  opacity: 0,
  stagger: 0.14,
  duration: 0.8,
  ease: 'power3.out',
  scrollTrigger: { trigger: '#contact-grid', start: 'top 82%' }
});
