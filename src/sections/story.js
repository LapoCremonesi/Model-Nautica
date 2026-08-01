/**
 * Sezioni narrative: intro, feste in barca, equipaggio, informazioni pratiche.
 */
import { BUSINESS } from '../data/content.js';
import { t } from '../modules/i18n.js';
import { esc, qs } from '../modules/dom.js';

const HIGHLIGHT_ICONS = [
  '<path d="M12 3 3 8v5c0 5 3.8 8.3 9 9 5.2-.7 9-4 9-9V8l-9-5Z"/>',
  '<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20c0-3 2.7-5 6-5s6 2 6 5M17 8.5a2.5 2.5 0 1 0 0-5M22 20c0-2.4-1.6-4-4-4.5"/>',
  '<path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
  '<path d="M6 3h12l-1.6 7.4a4.6 4.6 0 0 1-9 0L6 3ZM12 15v6M8.5 21h7"/>',
];

export function renderIntro() {
  const d = t().intro;
  const el = qs('#intro');
  if (!el) return;

  el.innerHTML = `
    <div class="shell">
      <div class="intro__grid">
        <div>
          <p class="kicker" data-reveal="fade">${esc(d.kicker)}</p>
          <h2 class="section__title" data-reveal="up" data-reveal-delay="60">${esc(d.title)}</h2>
          <div class="intro__body" style="margin-top:1.8rem" data-reveal="up" data-reveal-delay="140">
            ${d.body.map((p) => `<p>${esc(p)}</p>`).join('')}
          </div>
        </div>
        <ul class="intro__highlights" data-reveal="fade" data-reveal-stagger="li" data-reveal-step="110">
          ${d.highlights
            .map(
              (h, i) => `
            <li>
              <svg class="intro__icon" viewBox="0 0 24 24" aria-hidden="true">${HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length]}</svg>
              <h3>${esc(h.title)}</h3>
              <p>${esc(h.text)}</p>
            </li>`
            )
            .join('')}
        </ul>
      </div>
    </div>
  `;
}

export function renderParties() {
  const d = t().parties;
  const el = qs('#feste');
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

      <div class="parties__grid" data-reveal="fade" data-reveal-stagger=".card" data-reveal-step="110">
        ${d.items
          .map(
            (item, i) => `
          <article class="card">
            <span class="card__num">0${i + 1}</span>
            <h3 class="card__title">${esc(item.title)}</h3>
            <p class="card__text">${esc(item.text)}</p>
          </article>`
          )
          .join('')}
      </div>

      <div class="parties__note" data-reveal="up">
        <p>${esc(d.note)}</p>
        <a class="btn btn--solid" href="${BUSINESS.whatsapp}" target="_blank" rel="noopener">${esc(d.cta)}</a>
      </div>
    </div>
  `;
}

export function renderCrew() {
  const d = t().crew;
  const el = qs('#equipaggio');
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

      <div class="crew__grid" data-reveal="fade" data-reveal-stagger=".crew__card" data-reveal-step="130">
        ${d.people
          .map(
            (p) => `
          <article class="crew__card">
            <div class="crew__avatar" aria-hidden="true">${esc(p.name.charAt(0))}</div>
            <h3>${esc(p.name)}</h3>
            <span class="crew__role">${esc(p.role)}</span>
            <p>${esc(p.text)}</p>
          </article>`
          )
          .join('')}
      </div>
    </div>
  `;
}

export function renderPractical() {
  const d = t().practical;
  const el = qs('#informazioni');
  if (!el) return;

  el.innerHTML = `
    <div class="shell">
      <div class="section__head">
        <p class="kicker" data-reveal="fade">${esc(d.kicker)}</p>
        <h2 class="section__title" data-reveal="up" data-reveal-delay="60">${esc(d.title)}</h2>
      </div>
      <ul class="practical__grid" data-reveal="fade" data-reveal-stagger="li" data-reveal-step="90">
        ${d.items
          .map((i) => `<li><b>${esc(i.title)}</b><p>${esc(i.text)}</p></li>`)
          .join('')}
      </ul>
    </div>
  `;
}
