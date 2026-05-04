gsap.registerPlugin(ScrollTrigger);

// Conditionally register SplitText if available
if (typeof SplitText !== 'undefined') {
  gsap.registerPlugin(SplitText);
}

// ── Mobile menu ──
(function () {
  const hamburger = document.getElementById('nav-hamburger');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-nav-link');

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

// ── Loader + Page load entrance ──
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loader  = document.getElementById('loader');

  // Set hero initial states before loader exits
  gsap.set('#hero-bg', { scale: 1.08 });
  gsap.set('.nav-logo', { autoAlpha: 0, y: -10 });
  gsap.set('.nav-desktop a', { autoAlpha: 0, y: -8 });
  gsap.set('#hero-svg', { opacity: 0, scale: 0.96 });
  gsap.set('#scroll-hint', { autoAlpha: 0, y: 10 });

  function runHeroEntrance() {
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('#hero-bg',       { scale: 1, duration: 2.4, ease: 'power2.out' }, 0)
      .to('.nav-logo',      { autoAlpha: 1, y: 0, duration: 0.65 }, 0)
      .to('.nav-desktop a', { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07 }, 0.1)
      .to('#hero-svg',      { opacity: 1, scale: 1, duration: 1.0 }, 0.2)
      .to('#scroll-hint',   { autoAlpha: 1, y: 0, duration: 0.6 }, 1.0);
  }

  if (reduced) {
    if (loader) loader.style.display = 'none';
    gsap.set(['#hero-bg', '.nav-logo', '.nav-desktop a', '#hero-svg', '#scroll-hint'], { clearProps: 'all' });
    return;
  }

  if (!loader) { runHeroEntrance(); return; }

  const loaderNumber  = document.getElementById('loader-number');
  const loaderBar     = document.getElementById('loader-bar');
  const loaderTrack   = document.getElementById('loader-bar-track');
  const loaderCounter = document.getElementById('loader-counter');

  const obj = { v: 0 };
  gsap.to(obj, {
    v: 100,
    duration: 1.8,
    ease: 'power1.inOut',
    delay: 0.1,
    onUpdate() {
      const v = Math.round(obj.v);
      loaderBar.style.width = v + '%';
      loaderNumber.textContent = v;
    },
    onComplete() {
      gsap.timeline({
        onComplete() {
          loader.style.display = 'none';
          runHeroEntrance();
        }
      })
        .to(loaderCounter, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }, 0)
        .to(loaderTrack,   { opacity: 0, duration: 0.25 }, 0)
        .to(loader,        { yPercent: -100, duration: 0.8, ease: 'expo.inOut' }, 0.3);
    }
  });
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

// ── Section rules draw from left ──
gsap.utils.toArray('.section-rule').forEach(el => {
  gsap.from(el, {
    scaleX: 0, transformOrigin: 'left center', duration: 1.0, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 90%' }
  });
});

// ── Agenda meta stagger in ──
gsap.from('.agenda-meta-item', {
  y: 28, opacity: 0, stagger: 0.1, duration: 0.75, ease: 'power3.out',
  scrollTrigger: { trigger: '.agenda-meta', start: 'top 82%' }
});

// ── Partners tiers stagger in ──
gsap.from('.partners-tier', {
  y: 44, opacity: 0, stagger: 0.18, duration: 0.85, ease: 'power3.out',
  scrollTrigger: { trigger: '#partners .section-rule', start: 'top 82%' }
});

// ── Location entrance ──
gsap.from('.location-info', {
  x: -40, opacity: 0, duration: 0.85, ease: 'power3.out',
  scrollTrigger: { trigger: '.location-grid', start: 'top 82%' }
});
gsap.from('.location-map', {
  x: 40, opacity: 0, duration: 0.85, ease: 'power3.out',
  scrollTrigger: { trigger: '.location-grid', start: 'top 82%' }
});

// ── Giveaway intro fade up ──
gsap.from('.giveaway-intro', {
  y: 32, opacity: 0, duration: 0.8, ease: 'power3.out',
  scrollTrigger: { trigger: '.giveaway-intro', start: 'top 88%' }
});

// Accordion
function initAccordionCSS() {
  document.querySelectorAll('[data-accordion-css-init]').forEach((accordion) => {
    const closeSiblings = accordion.getAttribute('data-accordion-close-siblings') === 'true';

    accordion.addEventListener('click', (event) => {
      const toggle = event.target.closest('[data-accordion-toggle]');
      if (!toggle) return; // Exit if the clicked element is not a toggle

      const singleAccordion = toggle.closest('[data-accordion-status]');
      if (!singleAccordion) return; // Exit if no accordion container is found

      const isActive = singleAccordion.getAttribute('data-accordion-status') === 'active';
      singleAccordion.setAttribute('data-accordion-status', isActive ? 'not-active' : 'active');

      // When [data-accordion-close-siblings="true"]
      if (closeSiblings && !isActive) {
        accordion.querySelectorAll('[data-accordion-status="active"]').forEach((sibling) => {
          if (sibling !== singleAccordion) sibling.setAttribute('data-accordion-status', 'not-active');
        });
      }
    });
  });
}

// Initialize Accordion CSS
document.addEventListener('DOMContentLoaded', () => {
  initAccordionCSS();
});