/**
 * Sezione esperienze: le due uscite in barca e le fasce orarie di partenza.
 */
import { BUSINESS } from '../data/content.js';
import { t } from '../modules/i18n.js';
import { checkIcon, esc, qs } from '../modules/dom.js';

export function renderTours() {
  const d = t().tours;
  const el = qs('#esperienze');
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

      <div class="tours__grid">
        ${d.items.map((tour, i) => tourCard(tour, i, d.cta)).join('')}
      </div>

      <p class="tours__note" data-reveal="fade">${esc(d.priceNote)}</p>

      <div class="slots" data-reveal="up">
        <div class="slots__head">
          <h3>${esc(d.slots.title)}</h3>
          <p>${esc(d.slots.text)}</p>
        </div>
        <ul class="slots__list">
          ${d.slots.list
            .map((s) => `<li><b>${esc(s.time)}</b><p>${esc(s.text)}</p></li>`)
            .join('')}
        </ul>
      </div>
    </div>
  `;
}

function tourCard(tour, index, cta) {
  return `
    <article class="tour" id="${esc(tour.id)}" data-reveal="up" data-reveal-delay="${index * 120}">
      <div class="tour__top">
        <span class="pill pill--accent">${esc(tour.badge)}</span>
        <span class="tour__duration">${esc(tour.duration)}</span>
      </div>

      <h3 class="tour__title">${esc(tour.title)}</h3>
      <p class="tour__text">${esc(tour.text)}</p>

      <ul class="tour__stops">
        ${tour.stops.map((s) => `<li>${esc(s)}</li>`).join('')}
      </ul>

      <ul class="tour__includes">
        ${tour.includes.map((i) => `<li>${checkIcon}<span>${esc(i)}</span></li>`).join('')}
      </ul>

      <dl class="tour__prices">
        ${tour.prices
          .map(
            (p) => `
          <div class="tour__price">
            <dt>${esc(p.label)}</dt>
            <dd>${esc(p.value)}</dd>
            <small>${esc(p.note)}</small>
          </div>`
          )
          .join('')}
      </dl>

      <a class="btn btn--ghost tour__cta" href="${BUSINESS.whatsapp}" target="_blank" rel="noopener">${esc(cta)}</a>
    </article>
  `;
}
