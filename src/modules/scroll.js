/**
 * Scroll fluido (Lenis) + comportamenti legati allo scorrimento:
 * barra di avanzamento, header che si nasconde, link attivo nel menu,
 * parallasse dell'hero e comparsa del pulsante WhatsApp.
 */
import Lenis from 'lenis';
import { utils } from 'animejs';
import { qs, qsa } from './dom.js';

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initScroll() {
  const header = qs('#header');
  const progress = qs('#scroll-progress');
  const fab = qs('#fab');
  const cliffFar = qs('.cliff--far');
  const cliffNear = qs('.cliff--near');
  const heroInner = qs('.hero__inner');

  let lenis = null;
  if (!REDUCED) {
    lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  let lastY = 0;
  let ticking = false;

  function update() {
    const y = window.scrollY || document.documentElement.scrollTop;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(y / max, 1) : 0;

    if (progress) progress.style.width = `${ratio * 100}%`;

    if (header) {
      header.classList.toggle('is-stuck', y > 40);
      const hidden = y > 420 && y > lastY && !document.body.classList.contains('is-locked');
      header.classList.toggle('is-hidden', hidden);
    }

    if (fab) fab.classList.toggle('is-visible', y > 600);

    // Parallasse leggera dell'hero: le falesie si muovono più lentamente.
    if (!REDUCED && y < window.innerHeight * 1.2) {
      if (cliffFar) utils.set(cliffFar, { translateY: y * 0.08 });
      if (cliffNear) utils.set(cliffNear, { translateY: y * 0.16 });
      if (heroInner) {
        utils.set(heroInner, {
          translateY: y * 0.22,
          opacity: Math.max(0, 1 - y / (window.innerHeight * 0.72)),
        });
      }
    }

    lastY = y;
    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  update();

  return {
    lenis,
    scrollTo(target) {
      const el = typeof target === 'string' ? qs(target) : target;
      if (!el) return;
      const offset = -((qs('#header')?.offsetHeight || 76) - 1);
      if (lenis) lenis.scrollTo(el, { offset, duration: 1.2 });
      else {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    },
  };
}

/** Evidenzia nel menu la sezione attualmente visibile. */
export function initScrollSpy() {
  const links = qsa('#nav a[href^="#"]');
  if (!links.length) return;
  const map = new Map();
  links.forEach((link) => {
    const el = qs(link.getAttribute('href'));
    if (el) map.set(el, link);
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = map.get(entry.target);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  map.forEach((_, el) => io.observe(el));
}
