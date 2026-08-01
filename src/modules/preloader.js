/**
 * Schermata di apertura: disegna l'ancora, riempie la barra e sparisce.
 * Restituisce una Promise che si risolve quando l'animazione è finita,
 * così l'hero può partire subito dopo.
 */
import { animate, createTimeline, createDrawable, utils } from 'animejs';
import { qs } from './dom.js';

export function runPreloader() {
  const el = qs('#preloader');
  if (!el) return Promise.resolve();

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finish = () => {
    el.classList.add('is-done');
    document.body.classList.remove('is-locked');
    setTimeout(() => el.remove(), 700);
  };

  if (reduced) {
    finish();
    return Promise.resolve();
  }

  document.body.classList.add('is-locked');

  return new Promise((resolve) => {
    const anchor = createDrawable('.preloader__anchor');
    const ring = qs('.preloader__ring');
    const word = qs('#preloader-word');
    const fill = qs('#preloader-fill');

    utils.set(word, { opacity: 0, translateY: 10 });

    const tl = createTimeline({
      defaults: { ease: 'inOut(2)' },
      onComplete: () => {
        finish();
        resolve();
      },
    });

    tl.add(anchor, { draw: ['0 0', '0 1'], duration: 1100, ease: 'inOut(3)' })
      .add(ring, { rotate: [0, 180], opacity: [0, 0.25], duration: 1100 }, 0)
      .add(word, { opacity: [0, 1], translateY: [10, 0], duration: 700 }, 320)
      .add(fill, { width: ['0%', '100%'], duration: 1000, ease: 'inOut(2)' }, 260)
      .add(
        '.preloader__inner',
        { opacity: [1, 0], translateY: [0, -14], duration: 520, ease: 'in(2)' },
        1450
      );

    // Rete di sicurezza: se qualcosa va storto la pagina non resta bloccata.
    setTimeout(() => {
      if (document.body.classList.contains('is-locked')) {
        finish();
        resolve();
      }
    }, 4000);
  });
}

/** Ingresso dell'hero: titolo riga per riga, poi il resto. */
export function playHeroIntro() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lines = [...document.querySelectorAll('.hero__title .line > span')];
  const rest = ['#hero-eyebrow', '#hero-lead', '.hero__cta', '.hero__stats', '.hero__scroll'];

  if (reduced) {
    utils.set([...lines, ...rest], { opacity: 1, translateY: 0 });
    return;
  }

  utils.set(lines, { translateY: '110%' });
  utils.set(rest, { opacity: 0, translateY: 24 });

  const tl = createTimeline({ defaults: { ease: 'out(4)' } });
  tl.add(lines, { translateY: ['110%', '0%'], duration: 1150, delay: (_, i) => i * 110 })
    .add('#hero-eyebrow', { opacity: [0, 1], translateY: [24, 0], duration: 800 }, 150)
    .add('#hero-lead', { opacity: [0, 1], translateY: [24, 0], duration: 900 }, 700)
    .add('.hero__cta', { opacity: [0, 1], translateY: [24, 0], duration: 900 }, 850)
    .add('.hero__stats', { opacity: [0, 1], translateY: [24, 0], duration: 900 }, 1000)
    .add('.hero__scroll', { opacity: [0, 1], translateY: [24, 0], duration: 700 }, 1200);

  // Il filo dello "scroll" pulsa in loop
  animate('.hero__scroll i', {
    scaleY: [0.25, 1],
    opacity: [0.3, 1],
    transformOrigin: '50% 0%',
    duration: 1600,
    loop: true,
    alternate: true,
    ease: 'inOut(2)',
    delay: 1600,
  });
}
