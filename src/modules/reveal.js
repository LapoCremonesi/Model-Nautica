/**
 * Rivelazioni allo scroll basate su Anime.js.
 * Ogni elemento marcato con data-reveal entra in scena quando raggiunge
 * la viewport; data-reveal-stagger anima invece i figli in sequenza.
 */
import { animate, stagger, utils } from 'animejs';

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const PRESETS = {
  up: { translateY: [42, 0], opacity: [0, 1] },
  down: { translateY: [-32, 0], opacity: [0, 1] },
  left: { translateX: [-46, 0], opacity: [0, 1] },
  right: { translateX: [46, 0], opacity: [0, 1] },
  fade: { opacity: [0, 1] },
  scale: { scale: [0.92, 1], opacity: [0, 1] },
  mask: { translateY: ['110%', '0%'] },
};

let observer;

function play(el) {
  const type = el.dataset.reveal || 'up';
  const delay = Number(el.dataset.revealDelay || 0);
  const duration = Number(el.dataset.revealDuration || 900);
  const staggerSel = el.dataset.revealStagger;

  if (staggerSel) {
    const children = [...el.querySelectorAll(staggerSel)];
    if (children.length) {
      utils.set(el, { opacity: 1 });
      utils.set(children, { opacity: 0 });
      animate(children, {
        ...(PRESETS[type] || PRESETS.up),
        duration,
        delay: stagger(Number(el.dataset.revealStep || 90), { start: delay }),
        ease: 'out(3)',
      });
      el.classList.add('is-in');
      return;
    }
  }

  animate(el, {
    ...(PRESETS[type] || PRESETS.up),
    duration,
    delay,
    ease: 'out(3)',
    onBegin: () => el.classList.add('is-in'),
  });
}

function ensureObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        play(entry.target);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
  );
  return observer;
}

/** Registra tutti i [data-reveal] presenti in root (idempotente). */
export function observeReveals(root = document) {
  const targets = [...root.querySelectorAll('[data-reveal]')].filter((el) => !el.dataset.revealBound);

  if (REDUCED) {
    targets.forEach((el) => {
      el.dataset.revealBound = '1';
      el.classList.add('is-in');
      utils.set(el, { opacity: 1 });
      const sel = el.dataset.revealStagger;
      if (sel) utils.set([...el.querySelectorAll(sel)], { opacity: 1 });
    });
    return;
  }

  const io = ensureObserver();
  targets.forEach((el) => {
    el.dataset.revealBound = '1';
    io.observe(el);
  });
}

/** Anima un numero da 0 al valore finale (usato dai contatori dell'hero). */
export function countUp(el, value, { suffix = '', decimals = 0, duration = 1800, delay = 0 } = {}) {
  if (REDUCED) {
    el.textContent = value.toFixed(decimals) + suffix;
    return;
  }
  const state = { n: 0 };
  animate(state, {
    n: value,
    duration,
    delay,
    ease: 'out(4)',
    onUpdate: () => {
      el.textContent = state.n.toFixed(decimals).replace('.', ',') + suffix;
    },
  });
}
