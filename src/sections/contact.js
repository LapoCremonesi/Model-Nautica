/**
 * Sezione contatti: recapiti, modulo di richiesta prenotazione (che compone
 * un messaggio WhatsApp già pronto) e collegamento alla mappa del porto.
 */
import { animate } from 'animejs';
import { BUSINESS } from '../data/content.js';
import { getLang, t } from '../modules/i18n.js';
import { esc, qs, socialIcons } from '../modules/dom.js';

export function renderContact() {
  const d = t().contact;
  const el = qs('#contatti');
  if (!el) return;

  const f = d.form;

  el.innerHTML = `
    <div class="shell">
      <div class="section__head section__head--split">
        <div>
          <p class="kicker" data-reveal="fade">${esc(d.kicker)}</p>
          <h2 class="section__title" data-reveal="up" data-reveal-delay="60">${esc(d.title)}</h2>
        </div>
        <p class="section__lead" data-reveal="up" data-reveal-delay="120">${esc(d.lead)}</p>
      </div>

      <div class="contact__layout">
        <dl class="contact__details" data-reveal="fade" data-reveal-stagger=".contact__row" data-reveal-step="90">
          <div class="contact__row">
            <dt>${esc(d.labels.phone)}</dt>
            <dd><a href="${BUSINESS.phoneHref}">${esc(BUSINESS.phone)}</a></dd>
          </div>
          <div class="contact__row">
            <dt>${esc(d.labels.email)}</dt>
            <dd><a href="${BUSINESS.emailHref}">${esc(BUSINESS.email)}</a></dd>
          </div>
          <div class="contact__row">
            <dt>${esc(d.labels.marina)}</dt>
            <dd><a href="${BUSINESS.maps}" target="_blank" rel="noopener">${esc(BUSINESS.marina)}<br>${esc(
    BUSINESS.city
  )}</a></dd>
          </div>
          <div class="contact__row">
            <dt>${esc(d.labels.office)}</dt>
            <dd style="font-size:1rem">${esc(BUSINESS.office)}</dd>
          </div>
          <div class="contact__row" style="border-bottom:0">
            <dt>${esc(d.labels.hours)}</dt>
            <dd style="font-size:1rem">${esc(d.hours)}</dd>
          </div>
          <div class="contact__socials">
            ${BUSINESS.social
              .map(
                (s) =>
                  `<a href="${s.href}" target="_blank" rel="noopener" aria-label="${esc(s.label)}">${
                    socialIcons[s.icon] || ''
                  }</a>`
              )
              .join('')}
          </div>
        </dl>

        <form class="form" id="booking-form" novalidate data-reveal="up">
          <h3>${esc(f.title)}</h3>
          <div class="form__grid">
            <div class="field">
              <label for="bf-name">${esc(f.name)} *</label>
              <input id="bf-name" name="name" type="text" autocomplete="name" required>
            </div>
            <div class="field">
              <label for="bf-phone">${esc(f.phone)} *</label>
              <input id="bf-phone" name="phone" type="tel" autocomplete="tel" required>
            </div>
            <div class="field">
              <label for="bf-email">${esc(f.email)}</label>
              <input id="bf-email" name="email" type="email" autocomplete="email">
            </div>
            <div class="field">
              <label for="bf-date">${esc(f.date)}</label>
              <input id="bf-date" name="date" type="date">
            </div>
            <div class="field">
              <label for="bf-people">${esc(f.people)} *</label>
              <input id="bf-people" name="people" type="number" min="1" max="12" value="2" required>
            </div>
            <div class="field">
              <label for="bf-tour">${esc(f.tour)}</label>
              <select id="bf-tour" name="tour">
                ${f.tourOptions.map((o) => `<option>${esc(o)}</option>`).join('')}
              </select>
            </div>
            <div class="field field--full">
              <label for="bf-message">${esc(f.message)}</label>
              <textarea id="bf-message" name="message" placeholder="${esc(f.messagePlaceholder)}"></textarea>
            </div>
          </div>

          <div class="form__foot">
            <p class="form__error" id="form-error" role="alert"></p>
            <button class="btn btn--solid btn--block" type="submit">${esc(f.submit)}</button>
            <p class="form__privacy">${esc(f.privacy)}</p>
          </div>
        </form>
      </div>

      <div class="map-card" data-reveal="fade">
        <div>
          <h4>${esc(BUSINESS.marina)}</h4>
          <p>${esc(BUSINESS.city)}</p>
        </div>
        <a class="btn btn--ghost" href="${BUSINESS.maps}" target="_blank" rel="noopener">Google Maps</a>
      </div>
    </div>
  `;

  initForm();
}

function initForm() {
  const form = qs('#booking-form');
  const error = qs('#form-error');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = t().contact.form;
    const data = Object.fromEntries(new FormData(form).entries());

    const required = ['name', 'phone', 'people'];
    let valid = true;
    required.forEach((key) => {
      const input = form.elements[key];
      const field = input.closest('.field');
      const ok = String(data[key] || '').trim().length > 0;
      field.classList.toggle('is-invalid', !ok);
      if (!ok) valid = false;
    });

    if (!valid) {
      error.textContent = f.required;
      animate(form, { translateX: [0, -9, 9, -5, 0], duration: 420, ease: 'inOut(2)' });
      return;
    }

    error.textContent = '';
    window.open(buildWhatsappUrl(data), '_blank', 'noopener');
  });

  form.addEventListener('input', (e) => {
    e.target.closest('.field')?.classList.remove('is-invalid');
  });
}

/** Compone il messaggio WhatsApp con i dati del modulo. */
function buildWhatsappUrl(data) {
  const it = getLang() === 'it';
  const lines = [
    it ? 'Ciao Model Nautica! Vorrei prenotare un’escursione.' : 'Hello Model Nautica! I would like to book a trip.',
    '',
    `${it ? 'Nome' : 'Name'}: ${data.name}`,
    `${it ? 'Telefono' : 'Phone'}: ${data.phone}`,
  ];
  if (data.email) lines.push(`Email: ${data.email}`);
  if (data.date) lines.push(`${it ? 'Data' : 'Date'}: ${data.date}`);
  lines.push(`${it ? 'Persone' : 'Guests'}: ${data.people}`);
  if (data.tour) lines.push(`${it ? 'Esperienza' : 'Experience'}: ${data.tour}`);
  if (data.message) lines.push('', data.message);

  return `${BUSINESS.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
}
