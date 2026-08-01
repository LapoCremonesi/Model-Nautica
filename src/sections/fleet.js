/**
 * Sezione flotta: due schede barca con illustrazione vettoriale disegnata
 * al volo (line art animata con il modulo drawable di Anime.js).
 */
import { animate, createDrawable, createTimeline, utils } from 'animejs';
import { t } from '../modules/i18n.js';
import { esc, qs, qsa } from '../modules/dom.js';

/** Profilo stilizzato dello Stella Maris 700: scafo, tendalino, fuoribordo. */
function boatArt() {
  return `
  <svg viewBox="0 0 640 330" role="img" aria-label="Illustrazione della barca Stella Maris 700" class="boat">
    <defs>
      <linearGradient id="hullFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0e5f6d" stop-opacity=".55"/>
        <stop offset="100%" stop-color="#04202d" stop-opacity=".9"/>
      </linearGradient>
      <linearGradient id="canopyFill" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#2fb5b0" stop-opacity=".35"/>
        <stop offset="100%" stop-color="#9fe8dc" stop-opacity=".18"/>
      </linearGradient>
    </defs>

    <g class="boat__fills">
      <path fill="url(#hullFill)" d="M70 196 H556 L600 140 L610 200 C588 240 480 264 330 264 C208 264 118 242 70 212 Z"/>
      <path fill="url(#canopyFill)" d="M150 84 C260 68 400 66 486 82 L480 96 C398 82 262 84 156 98 Z"/>
    </g>

    <g class="boat__lines" fill="none" stroke="#9fe8dc" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
      <!-- scafo -->
      <path class="draw" d="M70 196 H556 L600 140 L610 200 C588 240 480 264 330 264 C208 264 118 242 70 212 Z"/>
      <!-- linea di galleggiamento -->
      <path class="draw" opacity=".55" d="M84 228 C170 246 250 252 340 250 C440 248 540 234 592 214"/>
      <!-- tendalino -->
      <path class="draw" d="M150 84 C260 68 400 66 486 82"/>
      <path class="draw" d="M156 98 C262 84 398 82 480 96"/>
      <!-- montanti -->
      <path class="draw" d="M172 92 L182 196"/>
      <path class="draw" d="M460 90 L452 196"/>
      <!-- console di guida -->
      <path class="draw" d="M300 196 V138 C300 130 306 126 314 126 H366 C374 126 380 130 380 138 V196"/>
      <path class="draw" d="M312 126 L328 100 H372 L380 126"/>
      <!-- sedute -->
      <path class="draw" d="M204 196 V172 H268 V196"/>
      <path class="draw" d="M400 196 V176 H444 V196"/>
      <!-- prua e battagliola -->
      <path class="draw" opacity=".7" d="M500 196 C520 190 546 176 566 160"/>
      <!-- fuoribordo -->
      <path class="draw" d="M70 178 H40 V214 H58 L52 244 H74"/>
      <path class="draw" opacity=".6" d="M44 186 H66"/>
    </g>

    <g class="boat__spray" fill="none" stroke="#9fe8dc" stroke-width="2" stroke-linecap="round" opacity=".5">
      <path class="draw" d="M24 252 C56 264 96 270 140 272"/>
      <path class="draw" d="M40 276 C82 286 130 290 176 290"/>
    </g>
  </svg>`;
}

export function renderFleet() {
  const d = t().fleet;
  const el = qs('#flotta');
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

      <div class="fleet__stage" data-reveal="scale">
        <div class="fleet__tabs" role="tablist" aria-label="${esc(d.title)}">
          ${d.boats
            .map(
              (b, i) => `
            <button role="tab" type="button" id="tab-${esc(b.id)}"
              aria-selected="${i === 0}" aria-controls="panel-${esc(b.id)}"
              data-boat="${esc(b.id)}">${esc(b.name)}</button>`
            )
            .join('')}
        </div>

        <div class="fleet__boat" role="tabpanel" id="panel-${esc(d.boats[0].id)}" aria-labelledby="tab-${esc(d.boats[0].id)}">
          <div class="fleet__art">${boatArt()}</div>
          <div>
            <h3 class="fleet__name" id="fleet-name">${esc(d.boats[0].name)}</h3>
            <p style="color:color-mix(in srgb, var(--foam) 62%, transparent)">${esc(d.specs[0].value)} · ${esc(
    d.specs[3].value
  )}</p>
            <dl class="fleet__specs">
              ${d.specs
                .map((s) => `<div><dt>${esc(s.label)}</dt><dd>${esc(s.value)}</dd></div>`)
                .join('')}
            </dl>
          </div>
        </div>
      </div>

      <ul class="fleet__features" data-reveal="fade" data-reveal-stagger="li" data-reveal-step="100">
        ${d.features
          .map((f) => `<li><b>${esc(f.title)}</b><p>${esc(f.text)}</p></li>`)
          .join('')}
      </ul>
    </div>
  `;

  initFleetTabs();
  initBoatDrawing(el);
}

function initFleetTabs() {
  const tabs = qsa('.fleet__tabs button');
  const name = qs('#fleet-name');
  const panel = qs('.fleet__boat');
  const boats = t().fleet.boats;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (tab.getAttribute('aria-selected') === 'true') return;
      tabs.forEach((x) => x.setAttribute('aria-selected', String(x === tab)));
      const boat = boats.find((b) => b.id === tab.dataset.boat);
      if (!boat || !name) return;

      panel?.setAttribute('id', `panel-${boat.id}`);
      panel?.setAttribute('aria-labelledby', `tab-${boat.id}`);

      animate(name, {
        opacity: [1, 0],
        translateY: [0, -12],
        duration: 220,
        ease: 'in(2)',
        onComplete: () => {
          name.textContent = boat.name;
          animate(name, { opacity: [0, 1], translateY: [12, 0], duration: 420, ease: 'out(3)' });
        },
      });

      animate('.boat', {
        translateX: [0, -18, 0],
        rotate: [0, -1.4, 0],
        duration: 900,
        ease: 'inOut(3)',
      });
    });
  });
}

/** La barca si "disegna" quando entra nel viewport, poi ondeggia piano. */
function initBoatDrawing(root) {
  const svg = root.querySelector('.boat');
  if (!svg) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const lines = createDrawable('.boat .draw');
  utils.set('.boat__fills', { opacity: 0 });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);

        createTimeline({ defaults: { ease: 'inOut(2)' } })
          .add(lines, {
            draw: ['0 0', '0 1'],
            duration: 1500,
            delay: (_, i) => i * 70,
          })
          .add('.boat__fills', { opacity: [0, 1], duration: 900, ease: 'out(2)' }, 900);

        // Ondeggio continuo, appena percettibile
        animate(svg, {
          translateY: [0, -8],
          rotate: [-0.6, 0.6],
          duration: 4200,
          loop: true,
          alternate: true,
          ease: 'inOut(2)',
        });
      });
    },
    { threshold: 0.25 }
  );
  io.observe(svg);
}
