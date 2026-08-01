/**
 * Gestione della lingua: stato corrente, persistenza e notifica ai moduli
 * che devono ridisegnarsi quando l'utente cambia IT/EN.
 */
import { CONTENT, LANGS } from '../data/content.js';

const STORAGE_KEY = 'mn-lang';
const listeners = new Set();

function detect() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && LANGS.includes(stored)) return stored;
  const browser = (navigator.language || 'it').slice(0, 2).toLowerCase();
  return LANGS.includes(browser) ? browser : 'it';
}

let current = detect();

export const getLang = () => current;
export const t = () => CONTENT[current];

export function setLang(lang) {
  if (!LANGS.includes(lang) || lang === current) return;
  current = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  applyDocumentMeta();
  listeners.forEach((fn) => fn(current));
}

export function onLangChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function applyDocumentMeta() {
  const data = t();
  document.documentElement.lang = current;
  document.title = data.meta.title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', data.meta.description);
}
