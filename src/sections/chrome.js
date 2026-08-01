/**
 * Elementi di cornice: menu, drawer mobile, selettore lingua, footer, hero.
 */
import { animate, utils } from 'animejs';
import { BUSINESS, LANGS } from '../data/content.js';
import { getLang, setLang, t } from '../modules/i18n.js';
import { esc, qs, qsa, socialIcons } from '../modules/dom.js';
import { countUp } from '../modules/reveal.js';

/* ---------------- Navigazione ---------------- */

export function renderNav() {
  const data = t();
  const nav = qs('#nav');
  const drawerNav = qs('#drawer-nav');

  const links = data.nav.items
    .map((item) => `<a href="#${item.id}">${esc(item.label)}</a>`)
    .join('');
  if (nav) nav.innerHTML = links;

  if (drawerNav) {
    drawerNav.innerHTML = data.nav.items
      .map(
        (item, i) =>
          `<a href="#${item.id}"><span>0${i + 1}</span>${esc(item.label)}</a>`
      )
      .join('');
  }

  const book = qs('#header-book');
  if (book) book.textContent = data.nav.book;
}

export function renderLangSwitch() {
  const box = qs('#lang');
  if (!box) return;
  box.innerHTML = LANGS.map(
    (lang) =>
      `<button type="button" data-lang="${lang}" aria-pressed="${lang === getLang()}">${lang}</button>`
  ).join('');
  box.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
}

export function initDrawer(scroller) {
  const burger = qs('#burger');
  const drawer = qs('#drawer');
  if (!burger || !drawer) return;

  const close = () => {
    burger.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    scroller?.lenis?.start();
  };

  const open = () => {
    burger.setAttribute('aria-expanded', 'true');
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    scroller?.lenis?.stop();
    const items = qsa('#drawer-nav a');
    utils.set(items, { opacity: 0, translateY: 24 });
    animate(items, {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 700,
      delay: (_, i) => 180 + i * 65,
      ease: 'out(3)',
    });
  };

  burger.addEventListener('click', () => {
    if (burger.getAttribute('aria-expanded') === 'true') close();
    else open();
  });

  drawer.addEventListener('click', (e) => {
    if (e.target.closest('a')) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
  });

  return { close };
}

/** Intercetta i link interni e li affida allo scroll fluido. */
export function initAnchors(scroller) {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = qs(href);
    if (!target) return;
    e.preventDefault();
    scroller.scrollTo(target);
  });
}

/* ---------------- Hero ---------------- */

export function renderHero() {
  const data = t().hero;

  qs('#hero-eyebrow').textContent = data.eyebrow;
  qs('#hero-title').innerHTML = data.title
    .map((line) => `<span class="line"><span>${esc(line)}</span></span>`)
    .join('');
  qs('#hero-lead').textContent = data.lead;

  const primary = qs('#hero-primary');
  primary.textContent = data.primary;
  primary.href = BUSINESS.whatsapp;

  const secondary = qs('#hero-secondary');
  secondary.textContent = data.secondary;

  qs('#hero-scroll span').textContent = data.scroll;

  const stats = qs('#hero-stats');
  stats.innerHTML = data.stats
    .map(
      (s) =>
        `<li><b data-count="${s.value}" data-suffix="${esc(s.suffix)}">0</b><span>${esc(
          s.label
        )}</span></li>`
    )
    .join('');
}

export function initCounters() {
  const nodes = qsa('#hero-stats b[data-count]');
  if (!nodes.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        const value = Number(entry.target.dataset.count);
        countUp(entry.target, value, {
          suffix: entry.target.dataset.suffix || '',
          decimals: Number.isInteger(value) ? 0 : 1,
          delay: 200,
        });
      });
    },
    { threshold: 0.4 }
  );
  nodes.forEach((n) => io.observe(n));
}

/* ---------------- Footer ---------------- */

export function renderFooter() {
  const data = t();
  const f = data.footer;
  const el = qs('#footer');
  if (!el) return;

  el.innerHTML = `
    <div class="shell">
      <div class="footer__top">
        <div class="footer__brand">
          <a class="brand" href="#top">
            <svg class="brand__mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <path d="M24 6v30M24 6a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM14 16h20M8 30c0 9 7 14 16 14s16-5 16-14"/>
            </svg>
            <span class="brand__text"><strong>Model</strong><em>Nautica</em></span>
          </a>
          <p>${esc(f.tagline)}</p>
          <div class="contact__socials" style="margin-top:1.4rem">
            ${BUSINESS.social
              .map(
                (s) =>
                  `<a href="${s.href}" target="_blank" rel="noopener" aria-label="${esc(
                    s.label
                  )}">${socialIcons[s.icon] || ''}</a>`
              )
              .join('')}
          </div>
        </div>

        <div class="footer__col">
          <h4>${esc(f.nav)}</h4>
          <ul>
            ${data.nav.items.map((i) => `<li><a href="#${i.id}">${esc(i.label)}</a></li>`).join('')}
          </ul>
        </div>

        <div class="footer__col">
          <h4>${esc(f.legal)}</h4>
          <ul>
            <li><a href="${BUSINESS.phoneHref}">${esc(BUSINESS.phone)}</a></li>
            <li><a href="${BUSINESS.emailHref}">${esc(BUSINESS.email)}</a></li>
            <li><a href="${BUSINESS.maps}" target="_blank" rel="noopener">${esc(BUSINESS.marina)}</a></li>
            <li>${esc(BUSINESS.city)}</li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <span>© ${new Date().getFullYear()} ${esc(BUSINESS.name)} — ${esc(f.rights)}</span>
        <div class="footer__vat">
          <span>${esc(f.network)}</span>
          ${BUSINESS.vat.map((v) => `<span>${esc(v.holder)} · P.IVA ${esc(v.piva)}</span>`).join('')}
        </div>
        <span>${esc(f.credits)}</span>
      </div>
    </div>
  `;
}
