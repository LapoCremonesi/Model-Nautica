/**
 * Punto d'ingresso: monta le sezioni, avvia le animazioni e ricollega
 * tutto quando l'utente cambia lingua.
 */
import './styles/main.css';

import { applyDocumentMeta, onLangChange } from './modules/i18n.js';
import { observeReveals } from './modules/reveal.js';
import { initScroll, initScrollSpy } from './modules/scroll.js';
import { initSea } from './modules/sea.js';
import { playHeroIntro, runPreloader } from './modules/preloader.js';
import { qs } from './modules/dom.js';

import {
  initAnchors,
  initCounters,
  initDrawer,
  renderFooter,
  renderHero,
  renderLangSwitch,
  renderNav,
} from './sections/chrome.js';
import { renderCrew, renderIntro, renderParties, renderPractical } from './sections/story.js';
import { renderTours } from './sections/tours.js';
import { renderFleet } from './sections/fleet.js';
import { renderCoast } from './sections/coast.js';
import { renderContact } from './sections/contact.js';

document.documentElement.classList.add('js');

/** Ridisegna tutti i contenuti testuali (usato anche al cambio lingua). */
function renderAll() {
  applyDocumentMeta();
  renderNav();
  renderLangSwitch();
  renderHero();
  renderIntro();
  renderTours();
  renderFleet();
  renderCoast();
  renderParties();
  renderCrew();
  renderPractical();
  renderContact();
  renderFooter();
  observeReveals();
}

function boot() {
  renderAll();

  const scroller = initScroll();
  initDrawer(scroller);
  initAnchors(scroller);
  initScrollSpy();
  initCounters();
  initSea(qs('#sea'));

  runPreloader().then(playHeroIntro);

  // Al cambio lingua: ricostruisce il markup e riattiva gli osservatori.
  onLangChange(() => {
    renderAll();
    initScrollSpy();
    initCounters();
    // I contenuti già visibili non devono restare invisibili in attesa di scroll.
    requestAnimationFrame(() => {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('is-in');
          el.style.opacity = '1';
          const sel = el.dataset.revealStagger;
          if (sel) el.querySelectorAll(sel).forEach((c) => (c.style.opacity = '1'));
        }
      });
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
