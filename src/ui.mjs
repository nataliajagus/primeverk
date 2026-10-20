import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
export const BASE = (process.env.BASE ?? '').replace(/\/$/, '');
if (BASE && !/^\/[\w.-]+(\/[\w.-]+)*$/.test(BASE)) throw new Error(`Zły BASE "${BASE}" (w Git Bash użyj MSYS_NO_PATHCONV=1 albo PowerShell)`);
export const CONTACT = {
  phone: '+354 769 6246',
  phoneHref: 'tel:+3547696246',
  email: 'adriannowicki3226@gmail.com', // TODO: docelowo adres na domenie firmy
  facebook: 'https://www.facebook.com/' // TODO: link do profilu FB
};

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
export const stripTags = s => String(s).replace(/<[^>]+>/g, '');

// ---------- ikony (24x24, stroke) ----------
const P = {
  painting: '<rect x="4" y="3" width="14" height="5" rx="1"/><path d="M18 5.5h2.5v5H11.5v3"/><rect x="9.5" y="13.5" width="4" height="7.5" rx="1"/>',
  plastering: '<path d="M12 3 21 8l-9 5L3 8z"/><path d="m3 12.5 9 5 9-5"/><path d="m3 16.5 9 5 9-5"/>',
  tiling: '<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>',
  bathrooms: '<path d="M3 12h18v2.5a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 14.5z"/><path d="M6 12V6.5A2.5 2.5 0 0 1 8.5 4 2.5 2.5 0 0 1 11 6.5"/><path d="M7 19l-1 2M17 19l1 2"/>',
  flooring: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 12h18M9 5v7M15 12v7"/>',
  tag: '<path d="M3 12.5V4h8.5L21 13.5 13.5 21z"/><circle cx="7.5" cy="8.5" r="1.3"/>',
  ruler: '<path d="m3.5 16.5 13-13 4 4-13 13z"/><path d="m7 13 2 2M10 10l1.5 1.5M13 7l2 2"/>',
  level: '<rect x="2" y="8.5" width="20" height="7" rx="1.2"/><rect x="9.5" y="10.5" width="5" height="3" rx="1.2"/><path d="M5.5 8.5v2M18.5 8.5v2"/>',
  user: '<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c.8-3.8 3.8-5.6 7.5-5.6s6.7 1.8 7.5 5.6"/>',
  phone: '<path d="M5 3.5h4l1.5 4-2.2 1.5a11 11 0 0 0 6.7 6.7L16.5 13.5l4 1.5v4a2 2 0 0 1-2 2C10.5 21 3 13.5 3 5.5a2 2 0 0 1 2-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
  pin: '<path d="M12 21s-6.5-5.7-6.5-11a6.5 6.5 0 0 1 13 0c0 5.3-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
  check: '<path d="m4.5 12.5 5 5 10-11"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  camera: '<path d="M4 8h3.5L9 5.5h6L16.5 8H20a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.6"/>',
  fb: '<path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V8.5a.5.5 0 0 1 .5-.5z"/>'
};
export const icon = (name, cls = '') =>
  `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || ''}</svg>`;

// ---------- linki ----------
export const urlFor = (lang, p = '/') => `${BASE}${lang === 'is' ? '' : '/' + lang}${p}`;
export const asset = f => `${BASE}/assets/${f}`;

// ---------- zdjęcia stockowe: placeholdery (podmieniane plikami z src/img/<slot>.jpg|webp|png) ----------
export const PHOTO_SLOTS = new Map();
const TONES = ['concrete', 'basalt', 'gold', 'slate'];
export function photo(slot, { label, ratio = '4x3', tone, ic = 'camera', stock, cls = '', prio = false } = {}) {
  PHOTO_SLOTS.set(slot, { label, ratio });
  const t = tone || TONES[[...slot].reduce((a, c) => a + c.charCodeAt(0), 0) % TONES.length];
  let file = null;
  for (const ext of ['jpg', 'jpeg', 'webp', 'png']) {
    if (fs.existsSync(path.join(ROOT, 'img', `${slot}.${ext}`))) { file = `${slot}.${ext}`; break; }
  }
  if (file) {
    return `<figure class="photo has-img r-${ratio} ${cls}"><img src="${asset('img/' + file)}" alt="${esc(stripTags(label))}" loading="${prio ? 'eager' : 'lazy'}" decoding="async"></figure>`;
  }
  return `<figure class="photo tone-${t} r-${ratio} ${cls}" role="img" aria-label="${esc(stripTags(label))}">` +
    `<span class="photo-ic">${icon(ic)}</span>` +
    `<figcaption><b>${esc(stock || 'STOCK')}</b><span>${esc(stripTags(label))}</span></figcaption></figure>`;
}

// ---------- cenówka z półki ----------
export function priceTag(L, { label, price, unit, note, cls = '' }) {
  return `<div class="tag ${cls}"><span class="tag-hole"></span>` +
    `<span class="tag-label">${label}</span>` +
    `<span class="tag-price"><strong>${price}</strong><em>${unit}</em></span>` +
    `<span class="tag-vat">${L.ui.vat}</span>` +
    (note ? `<span class="tag-note">${note}</span>` : '') + `</div>`;
}

export const ruler = (cls = '') => `<div class="ruler ${cls}" aria-hidden="true"></div>`;

export function faqList(items, id = '') {
  return `<div class="faq-list"${id ? ` id="${id}"` : ''}>` + items.map(([q, a]) =>
    `<details><summary><span>${q}</span>${icon('plus')}</summary><div class="faq-a"><p>${a}</p></div></details>`).join('') + '</div>';
}
export const faqJsonLd = items => `<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: stripTags(q), acceptedAnswer: { '@type': 'Answer', text: stripTags(a) } }))
})}</script>`;

export const btn = (href, text, kind = 'gold', extra = '') =>
  `<a class="btn btn-${kind}" href="${href}"${extra}><span>${text}</span>${icon('arrow')}</a>`;
