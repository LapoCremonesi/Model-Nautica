/**
 * Sezione costa: mappa stilizzata del promontorio del Conero con i punti
 * delle calette. Cliccando un punto (o un nome nell'elenco) il pannello
 * mostra la scheda corrispondente. Una barchetta percorre la rotta in loop
 * grazie a createMotionPath di Anime.js.
 */
import { animate, createMotionPath, utils } from 'animejs';
import { getLang, t } from '../modules/i18n.js';
import { esc, qs, qsa } from '../modules/dom.js';

const harbourLabel = () => (getLang() === 'it' ? 'NUMANA · PARTENZA' : 'NUMANA · DEPARTURE');

/* Posizioni dei punti sulla mappa illustrata (viewBox 0 0 780 660). */
const POINTS = {
  trave: [292, 62],
  mezzavalle: [344, 108],
  portonovo: [400, 152],
  gabbiani: [464, 208],
  'due-sorelle': [520, 272],
  libri: [552, 334],
  frate: [548, 392],
  vela: [516, 434],
  'san-michele': [468, 486],
  urbani: [420, 526],
};

const ROUTE =
  'M262 26 C302 92, 382 122, 470 192 C558 262, 578 342, 518 424 C468 492, 392 542, 336 632';

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function renderCoast() {
  const d = t().beaches;
  const el = qs('#coste');
  if (!el) return;

  el.innerHTML = `
    <div class="shell">
      <div class="section__head section__head--split">
        <div>
          <p class="kicker" data-reveal="fade">${esc(d.kicker)}</p>
          <h2 class="section__title" data-reveal="up" data-reveal-delay="60">${esc(d.title)}</h2>
        </div>
        <p class="section__lead" data-reveal="up" data-reveal-delay="120">${esc(d.lead)}</p>
      </div>

      <div class="coast__layout">
        <div class="coast__map" data-reveal="fade">${mapSvg(d)}</div>
        <div class="coast__panel" id="coast-panel" aria-live="polite"></div>
      </div>

      <div class="coast__list" role="tablist" aria-label="${esc(d.title)}" data-reveal="fade" data-reveal-stagger="button" data-reveal-step="55">
        ${d.items
          .map(
            (b) =>
              `<button type="button" role="tab" data-beach="${esc(b.id)}" aria-selected="false">${esc(
                b.name
              )}</button>`
          )
          .join('')}
      </div>
    </div>
  `;

  initCoast(d);
}

function mapSvg(d) {
  const dots = d.items
    .filter((b) => POINTS[b.id])
    .map((b) => {
      const [x, y] = POINTS[b.id];
      const flip = x > 470;
      return `
      <g class="coast-dot" data-beach="${esc(b.id)}" tabindex="0" role="button" aria-label="${esc(b.name)}">
        <circle class="halo" cx="${x}" cy="${y}" r="11"/>
        <circle class="core" cx="${x}" cy="${y}" r="4.4"/>
        <circle class="hit" cx="${x}" cy="${y}" r="22"/>
        <text x="${flip ? x + 18 : x - 18}" y="${y + 3.5}" text-anchor="${flip ? 'start' : 'end'}">${esc(
        b.name
      )}</text>
      </g>`;
    })
    .join('');

  return `
  <svg viewBox="0 0 780 660" role="img" aria-label="Mappa illustrata della costa del Conero">
    <defs>
      <linearGradient id="landFill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#14663a"/>
        <stop offset="55%" stop-color="#0c4a26"/>
        <stop offset="100%" stop-color="#0a3d1f"/>
      </linearGradient>
      <pattern id="grid" width="46" height="46" patternUnits="userSpaceOnUse">
        <path d="M46 0H0V46" fill="none" stroke="rgba(168,231,185,.07)" stroke-width="1"/>
      </pattern>
    </defs>

    <rect width="780" height="660" fill="url(#grid)"/>

    <!-- terraferma -->
    <path fill="url(#landFill)" d="M0 0 H262 C302 92 382 122 470 192 C558 262 578 342 518 424 C468 492 392 542 336 632 L330 660 H0 Z"/>
    <!-- linea di costa -->
    <path fill="none" stroke="#a8e7b9" stroke-width="2" stroke-opacity=".65" d="${ROUTE}"/>

    <!-- rilievo del monte -->
    <g fill="none" stroke="rgba(168,231,185,.3)" stroke-width="1.5">
      <path d="M96 190 C160 168 214 196 258 250"/>
      <path d="M72 264 C142 246 206 282 248 344"/>
      <path d="M110 382 C176 372 226 406 262 462"/>
    </g>
    <text x="112" y="330" fill="rgba(168,231,185,.62)" font-size="17" letter-spacing="5" font-family="Manrope, sans-serif">MONTE CONERO</text>

    <!-- rotta percorsa dalla barchetta -->
    <path id="coast-route" fill="none" stroke="none" d="M300 30 C348 96 424 130 508 200 C596 272 614 350 556 434 C506 502 430 552 372 636"/>
    <g class="coast-boat" opacity="0">
      <path d="M-11 0 L11 0 L7 7 L-7 7 Z" fill="#df8f56"/>
      <path d="M0 -12 L0 0 M0 -12 L8 -3 L0 -3" fill="#df8f56" stroke="#df8f56" stroke-width="1.4" stroke-linejoin="round"/>
    </g>

    <!-- porto di partenza -->
    <g>
      <circle cx="352" cy="600" r="6.5" fill="#df8f56"/>
      <circle cx="352" cy="600" r="14" fill="none" stroke="#df8f56" stroke-opacity=".5"/>
      <text x="374" y="605" fill="#df8f56" font-size="15" letter-spacing="2.6" font-family="Manrope, sans-serif">${esc(
        harbourLabel()
      )}</text>
    </g>

    ${dots}
  </svg>`;
}

function initCoast(d) {
  const panel = qs('#coast-panel');
  const dots = qsa('.coast-dot');
  const buttons = qsa('.coast__list button');
  let currentId = null;

  function select(id, { animatePanel = true } = {}) {
    const beach = d.items.find((b) => b.id === id);
    if (!beach || !panel || id === currentId) return;
    currentId = id;

    dots.forEach((dot) => dot.classList.toggle('is-active', dot.dataset.beach === id));
    buttons.forEach((b) => {
      const on = b.dataset.beach === id;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', String(on));
    });

    const index = d.items.indexOf(beach) + 1;
    const paint = () => {
      panel.innerHTML = `
        <span class="pill">${esc(beach.tag)}</span>
        <h3>${esc(beach.name)}</h3>
        <p>${esc(beach.text)}</p>
        <p class="coast__counter">${String(index).padStart(2, '0')} / ${String(d.items.length).padStart(2, '0')}</p>
      `;
      if (!REDUCED) {
        animate(panel.children, {
          opacity: [0, 1],
          translateY: [16, 0],
          duration: 620,
          delay: (_, i) => i * 70,
          ease: 'out(3)',
        });
      }
    };

    if (animatePanel && !REDUCED) {
      animate(panel, {
        opacity: [1, 0],
        duration: 180,
        ease: 'in(2)',
        onComplete: () => {
          paint();
          utils.set(panel, { opacity: 1 });
        },
      });
    } else {
      paint();
    }
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => select(dot.dataset.beach));
    dot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        select(dot.dataset.beach);
      }
    });
  });
  buttons.forEach((btn) => btn.addEventListener('click', () => select(btn.dataset.beach)));

  select('due-sorelle', { animatePanel: false });

  if (!REDUCED) {
    // Aloni che pulsano sui punti
    animate('.coast-dot .halo', {
      r: [11, 18],
      opacity: [0.45, 0],
      duration: 2600,
      loop: true,
      delay: (_, i) => i * 260,
      ease: 'out(2)',
    });
    startBoat();
  }
}

/** Barchetta che segue la rotta disegnata sulla mappa. */
function startBoat() {
  const route = qs('#coast-route');
  const boat = qs('.coast-boat');
  if (!route || !boat) return;

  try {
    const { translateX, translateY, rotate } = createMotionPath('#coast-route');
    utils.set(boat, { opacity: 0.9 });
    animate(boat, {
      translateX,
      translateY,
      rotate,
      duration: 16000,
      ease: 'linear',
      loop: true,
    });
  } catch {
    // Se il browser non espone getPointAtLength la barchetta resta nascosta.
    utils.set(boat, { opacity: 0 });
  }
}
