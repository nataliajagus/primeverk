import LEGAL from './content/legal.mjs';
import { PRICES, SERVICES, CALC_GROUPS, fromPrice, rowsFor, fmtNum } from './data/prices.mjs';
import { BASE, SITE, CONTACT, hasImg, esc, stripTags, icon, flag, urlFor, asset, photo, priceTag, ruler, faqList, faqJsonLd, btn } from './ui.mjs';

export const LANGS = ['is', 'en', 'pl'];
const NAV_ORDER = ['services', 'prices', 'contact'];
const FOOT_PAGES = ['prices', 'faq', 'contact'];
const LANG_NAME = { is: 'Íslenska', en: 'English', pl: 'Polski' };
const NAV_ICON = { services: 'plastering', prices: 'calc', faq: 'help', contact: 'mail' };
const NAV_PATH = { services: '/services/', prices: '/prices/', faq: '/faq/', contact: '/contact/' };

// ---------- ceny ----------
export function priceText(L, p, { short = false } = {}) {
  const unit = p.unit === 'm2' ? L.ui.perM2 : L.ui.perMb;
  if (p.max === null) return `${L.ui.from} ${fmtNum(p.min)} ${unit}`;
  if (p.min === p.max) return `${fmtNum(p.min)} ${unit}`;
  return `${fmtNum(p.min)}–${fmtNum(p.max)} ${unit}`;
}
const shelf = (L, rows) => `<ul class="shelf">` + rows.map(p => {
  const it = L.items[p.id];
  return `<li><div class="shelf-info"><span class="shelf-name">${it.n}</span>${it.s ? `<span class="shelf-sub">${it.s}</span>` : ''}${it.m ? `<span class="shelf-note">${it.m}</span>` : ''}</div><span class="shelf-price">${priceText(L, p)}</span></li>`;
}).join('') + `</ul>`;

const ITEM_ICON = { paint: 'painting', plaster: 'plastering', tiles: 'tiling', floor: 'flooring' };
const priceCards = (L, rows) => `<div class="pcards">` + rows.map(r => {
  const it = L.items[r.id];
  const ic = r.id === 'waterproof' ? 'bathrooms' : ITEM_ICON[r.calc];
  const unit = r.unit === 'm2' ? L.ui.perM2 : L.ui.perMb;
  const amount = r.max === null ? `<span class="pc-from">${L.ui.from}</span><strong>${fmtNum(r.min)}</strong>`
    : r.min === r.max ? `<strong>${fmtNum(r.min)}</strong>` : `<strong>${fmtNum(r.min)}–${fmtNum(r.max)}</strong>`;
  return `<article class="pcard reveal"><span class="pc-ic">${icon(ic)}</span><h3>${it.n}</h3>${it.s ? `<p class="pc-sub">${it.s}</p>` : ''}${it.m ? `<span class="pc-note">${it.m}</span>` : ''}<div class="pc-price">${amount}<em>${unit}</em><b class="tag-vat">${L.ui.vat}</b></div></article>`;
}).join('') + `</div>`;

const sheet = (L, rows, groups) => {
  const P = L.prices;
  const rowHtml = r => {
    const it = L.items[r.id];
    const unit = r.unit === 'm2' ? L.ui.perM2 : L.ui.perMb, u = r.unit === 'm2' ? L.ui.m2 : L.ui.mb;
    const rate = r.max === null ? `${L.ui.from} ${fmtNum(r.min)}` : r.min === r.max ? fmtNum(r.min) : `${fmtNum(r.min)}–${fmtNum(r.max)}`;
    return `<div class="calc-row sheet-row" data-id="${r.id}">
      <div class="sr-name"><h3>${it.n}</h3>${it.s ? `<p>${it.s}</p>` : ''}${it.m ? `<span class="sr-note">${it.m}</span>` : ''}</div>
      <div class="sr-rate" data-label="${esc(P.colRate)}"><strong>${rate}</strong><em>${unit}</em></div>
      <label class="sr-qty" data-label="${esc(P.colQty)}" title="${esc(P.enter)} ${esc(L.itemHints[r.id])}"><input type="number" inputmode="decimal" min="0" step="any" placeholder="0" data-id="${r.id}" aria-label="${esc(it.n)}: ${esc(P.enter)} ${esc(L.itemHints[r.id])}"><em>${u}</em></label>
      <div class="sr-sum" data-label="${esc(P.colCost)}"><span class="row-sum" data-empty="—">—</span></div>
    </div>`;
  };
  const body = groups
    ? groups.map(([id, t, rs]) => `<div class="sheet-group" id="g-${id}">${t}</div>` + rs.map(rowHtml).join('')).join('')
    : rows.map(rowHtml).join('');
  return `<div class="sheet${groups ? ' sticky-foot' : ''}">
    <div class="sheet-head"><span>${P.colWork}</span><span>${P.colRate} <b>(${L.ui.vat})</b></span><span>${P.colQty}</span><span>${P.colCost}</span></div>
    <div id="calc-fields" data-static="1">${body}</div>
    <div class="sheet-foot">
      <div class="sf-note"><p>${P.shortNote}</p></div>
      <div class="sf-total"><div id="calc-result" class="calc-result" aria-live="polite"></div>
        <div class="sf-btns"><button id="calc-send" class="btn btn-gold" type="button" disabled><span>${P.send}</span>${icon('arrow')}</button>
        <button id="calc-reset" class="btn btn-line" type="button"><span>${P.reset}</span></button></div></div>
    </div>
  </div>`;
};

const priceCardsCalc = (L, rows) => `<div class="pcards pcards-calc" id="calc-fields" data-static="1">` + rows.map(r => {
  const it = L.items[r.id];
  const ic = r.id === 'waterproof' ? 'bathrooms' : ITEM_ICON[r.calc];
  const unit = r.unit === 'm2' ? L.ui.perM2 : L.ui.perMb, u = r.unit === 'm2' ? L.ui.m2 : L.ui.mb;
  const amount = r.max === null ? `<span class="pc-from">${L.ui.from}</span><strong>${fmtNum(r.min)}</strong>`
    : r.min === r.max ? `<strong>${fmtNum(r.min)}</strong>` : `<strong>${fmtNum(r.min)}–${fmtNum(r.max)}</strong>`;
  return `<article class="pcard calc-row" data-id="${r.id}"><span class="pc-ic">${icon(ic)}</span><h3>${it.n}</h3>${it.s ? `<p class="pc-sub">${it.s}</p>` : ''}${it.m ? `<span class="pc-note">${it.m}</span>` : ''}
    <div class="pc-price">${amount}<em>${unit}</em><b class="tag-vat">${L.ui.vat}</b></div>
    <label class="pc-qty"><span>${L.prices.enter} ${L.itemHints[r.id]}</span><div><input type="number" inputmode="decimal" min="0" step="any" placeholder="0" data-id="${r.id}" aria-label="${esc(it.n)}: ${esc(L.prices.enter)} ${esc(L.itemHints[r.id])}"><em>${u}</em></div></label>
  </article>`;
}).join('') + `</div>`;

const calcSide = L => `<aside class="calc-side"><div id="calc-result" class="calc-result" aria-live="polite"></div>
      <p class="fine">${L.prices.disclaimer}</p>
      <button id="calc-send" class="btn btn-gold" type="button" disabled><span>${L.prices.send}</span>${icon('arrow')}</button>
      <button id="calc-reset" class="btn btn-line" type="button"><span>${L.prices.reset}</span></button>
    </aside>`;

const calcBlock = L => `<div class="calc"><div id="calc-fields" class="calc-fields"></div>
    <aside class="calc-side"><div id="calc-result" class="calc-result" aria-live="polite"></div>
      <p class="fine">${L.prices.disclaimer}</p>
      <button id="calc-send" class="btn btn-gold" type="button" disabled><span>${L.prices.send}</span>${icon('arrow')}</button>
      <button id="calc-reset" class="btn btn-line" type="button"><span>${L.prices.reset}</span></button>
    </aside></div>`;

const pvFor = (L, rows, groupName) => ({
  lang: L.code,
  prices: rows.map(({ id, unit, min, max }) => ({ id, calc: 'svc', unit, min, max })),
  groups: ['svc'], groupNames: { svc: groupName },
  names: Object.fromEntries(rows.map(x => [x.id, L.items[x.id].n])),
  scopes: Object.fromEntries(rows.map(x => [x.id, L.items[x.id].s || ''])),
  notes: Object.fromEntries(rows.map(x => [x.id, L.items[x.id].m || ''])),
  hints: L.itemHints,
  ui: { m2: L.ui.m2, mb: L.ui.mb, kr: L.ui.kr, vat: L.ui.vat, perM2: L.ui.perM2, perMb: L.ui.perMb, from: L.ui.from, ...L.prices },
  contactUrl: urlFor(L.code, '/contact/')
});

// ---------- dane strukturalne ----------
const abs = path => SITE + path;
const BIZ_ID = () => abs(BASE + '/#business');
const AREAS = ['Reykjavík', 'Keflavík', 'Selfoss'];
const businessLd = L => ({
  '@context': 'https://schema.org', '@type': ['HomeAndConstructionBusiness', 'LocalBusiness'], '@id': BIZ_ID(),
  name: 'Prime Verk', url: abs(urlFor('is', '/')), description: L.seo.home[1],
  image: abs(asset('og.png')), logo: abs(asset('icon-512.png')),
  telephone: CONTACT.phone, email: CONTACT.email,
  address: { '@type': 'PostalAddress', addressCountry: 'IS', addressRegion: 'Höfuðborgarsvæðið' },
  areaServed: AREAS.map(n => ({ '@type': 'City', name: n })),
  knowsLanguage: ['is', 'en', 'pl'],
  contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', telephone: CONTACT.phone, email: CONTACT.email, availableLanguage: ['Icelandic', 'English', 'Polish'] },
  makesOffer: SERVICES.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: L.svc[s].name, url: abs(urlFor(L.code, '/services/' + s + '/')) } })),
  ...(CONTACT.facebook ? { sameAs: [CONTACT.facebook] } : {})
});
const websiteLd = L => ({ '@context': 'https://schema.org', '@type': 'WebSite', '@id': abs(BASE + '/#website'), name: 'Prime Verk', url: abs(urlFor('is', '/')), inLanguage: ['is', 'en', 'pl'], publisher: { '@id': BIZ_ID() } });
const breadcrumbLd = (L, crumbs) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [[L.ui.home, '/'], ...crumbs].map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name: stripTags(name), item: abs(urlFor(L.code, path)) }))
});
const serviceLd = (L, s) => {
  const S = L.svc[s];
  const offers = rowsFor(s).map(r => ({
    '@type': 'Offer', name: stripTags(L.items[r.id].n), priceCurrency: 'ISK', availability: 'https://schema.org/InStock',
    priceSpecification: r.max === null || r.min === r.max
      ? { '@type': 'UnitPriceSpecification', price: r.min, priceCurrency: 'ISK', unitText: r.unit === 'm2' ? 'm²' : 'm', valueAddedTaxIncluded: false }
      : { '@type': 'UnitPriceSpecification', minPrice: r.min, maxPrice: r.max, priceCurrency: 'ISK', unitText: r.unit === 'm2' ? 'm²' : 'm', valueAddedTaxIncluded: false }
  }));
  return { '@context': 'https://schema.org', '@type': 'Service', name: S.name, description: stripTags(S.lead), serviceType: S.name, url: abs(urlFor(L.code, '/services/' + s + '/')), inLanguage: L.htmlLang, provider: { '@id': BIZ_ID() }, areaServed: AREAS.map(n => ({ '@type': 'City', name: n })), offers };
};
const ldTag = o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;

// ---------- layout ----------
export function layout(L, { key, path, title, desc, body, head = '', pv = null, crumbs = null, ld = [] }) {
  const inferred = { services: [[L.nav.services, '/services/']], prices: [[L.nav.prices, '/prices/']], faq: [[L.nav.faq, '/faq/']], contact: [[L.nav.contact, '/contact/']], privacy: [[LEGAL[L.code].title, '/privacy/']] };
  const trail = crumbs || inferred[key] || null;
  const schema = [];
  if (key === 'home') { schema.push(businessLd(L), websiteLd(L)); }
  if (trail) schema.push(breadcrumbLd(L, trail));
  schema.push(...ld);
  const schemaHtml = schema.map(ldTag).join('\n');
  const alt = LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${SITE}${urlFor(l, path)}">`).join('') +
    `<link rel="alternate" hreflang="x-default" href="${SITE}${urlFor('is', path)}">`;
  const langs = LANGS.map(l => `<a role="menuitem" href="${urlFor(l, path)}" lang="${l}" hreflang="${l}"${l === L.code ? ' aria-current="true"' : ''}>${flag(l)}<span>${LANG_NAME[l]}</span></a>`).join('');
  const svcLinks = SERVICES.map(s => `<a href="${urlFor(L.code, '/services/' + s + '/')}">${icon(s)}<span>${L.svc[s].name}</span></a>`).join('');
  const nav = NAV_ORDER.map(k => {
    const a = `<a href="${urlFor(L.code, NAV_PATH[k])}"${key === k || (k === 'services' && key === 'service') ? ' class="on"' : ''}>${icon(NAV_ICON[k])}<span>${L.nav[k]}</span></a>`;
    return k === 'services' ? `<div class="has-sub">${a}<div class="sub">${svcLinks}</div></div>` : a;
  }).join('');
  return `<!doctype html>
<html lang="${L.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(stripTags(title))}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}${urlFor(L.code, path)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="author" content="Prime Verk">
<meta name="theme-color" content="#1E2023">
<meta property="og:title" content="${esc(stripTags(title))}"><meta property="og:description" content="${esc(desc)}"><meta property="og:type" content="website">
<meta property="og:site_name" content="Prime Verk"><meta property="og:url" content="${SITE}${urlFor(L.code, path)}"><meta property="og:locale" content="${{ is: 'is_IS', en: 'en_GB', pl: 'pl_PL' }[L.code]}">
<meta property="og:image" content="${SITE}${asset('og.png')}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${SITE}${asset('og.png')}">
<link rel="icon" href="${asset('favicon.svg')}" type="image/svg+xml">
<link rel="icon" href="${asset('favicon-32.png')}" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="${asset('apple-touch-icon.png')}">
${alt}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,500..900&family=Figtree:wght@400;500;600;700&family=Barlow+Semi+Condensed:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${asset('style.css')}?v=${Date.now()}">
${CONTACT.analytics.src ? `<meta name="pv-analytics" content="${CONTACT.analytics.src}|${CONTACT.analytics.domain}">` : ''}
${head}
${schemaHtml}
</head>
<body>
<a class="skip" href="#main">${L.ui.skip}</a>
<div class="strip"><div class="wrap strip-in">
  <span class="strip-loc">${icon('pin')}Reykjavík · Keflavík · Selfoss</span>
  <span class="strip-r"><a href="${CONTACT.phoneHref}">${icon('phone')}${CONTACT.phone}</a><a class="strip-mail" href="mailto:${CONTACT.email}">${icon('mail')}${CONTACT.email}</a></span>
</div>${ruler('ruler-strip')}</div>
<header class="site-header" id="top">
  <div class="wrap hdr">
    <a class="brand" href="${urlFor(L.code, '/')}" aria-label="Prime Verk"><img src="${asset('logo.svg')}" alt="Prime Verk" width="112" height="50"></a>
    <nav class="nav" id="nav" aria-label="Main">${nav}
      <div class="nav-cta-m">${btn(urlFor(L.code, '/contact/'), L.ui.quote, 'gold')}</div>
    </nav>
    <div class="lang" id="lang"><button class="lang-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="lang-menu" aria-label="${L.ui.langName}">${flag(L.code)}<span>${L.code.toUpperCase()}</span>${icon('chev')}</button><div class="lang-menu" id="lang-menu" role="menu">${langs}</div></div>
    <a class="btn btn-gold btn-sm hdr-cta" href="${urlFor(L.code, '/contact/')}"><span>${L.ui.quote}</span></a>
    <button class="burger" id="burger" aria-expanded="false" aria-controls="nav" aria-label="${L.ui.menu}"><span></span><span></span><span></span></button>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="foot">
  <div class="wrap foot-grid">
    <div class="foot-brand"><img src="${asset('logo-light.svg')}" alt="Prime Verk" width="120" height="54"><p>${L.footer.tag}</p></div>
    <div><h4>${L.footer.services}</h4>${svcLinks}</div>
    <div><h4>${L.footer.pages}</h4>${FOOT_PAGES.map(k => `<a href="${urlFor(L.code, NAV_PATH[k])}">${L.nav[k]}</a>`).join('')}</div>
    <div><h4>${L.footer.contact}</h4><a href="${CONTACT.phoneHref}">${CONTACT.phone}</a><a href="mailto:${CONTACT.email}">${CONTACT.email}</a>${CONTACT.whatsapp ? `<a href="https://wa.me/${CONTACT.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>` : ''}${CONTACT.facebook ? `<a href="${CONTACT.facebook}" target="_blank" rel="noopener">Facebook</a>` : ''}<span class="foot-area">${L.contact.areaV}</span></div>
  </div>
  <div class="wrap foot-bot"><span>© ${new Date().getFullYear()} Prime Verk. ${L.footer.rights}</span><span class="foot-legal"><a href="${urlFor(L.code, '/privacy/')}">${LEGAL[L.code].footer.privacy}</a> <button type="button" class="cookie-open">${LEGAL[L.code].footer.settings}</button></span><span>${L.footer.credit} <a href="https://nataliajagus.com" target="_blank" rel="noopener">nataliajagus.com</a></span></div>
</footer>
<div class="cookie" id="cookie" role="dialog" aria-live="polite" aria-label="Cookies" hidden>
  <p>${LEGAL[L.code].banner.text} <a href="${urlFor(L.code, '/privacy/')}">${LEGAL[L.code].banner.more}</a></p>
  <div class="cookie-btns"><button type="button" class="btn btn-gold btn-sm" data-consent="all"><span>${LEGAL[L.code].banner.accept}</span></button><button type="button" class="btn btn-line btn-sm" data-consent="necessary"><span>${LEGAL[L.code].banner.reject}</span></button></div>
</div>
<a class="fab" href="${CONTACT.phoneHref}" aria-label="${L.ui.call}">${icon('phone')}<span>${L.ui.call}</span></a>
${pv ? `<script>window.PV=${JSON.stringify(pv)};</script>` : ''}
<script src="${asset('site.js')}?v=${Date.now()}" defer></script>
</body>
</html>`;
}

// ---------- elementy wspólne ----------
const secHead = (eyebrow, title, lead = '', cls = '') =>
  `<div class="sec-head ${cls}"><div>${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<h2>${title}</h2></div>${lead ? `<p class="sec-lead">${lead}</p>` : ''}</div>`;

const crumbs = (L, items) => `<nav class="crumbs" aria-label="Breadcrumb"><a href="${urlFor(L.code, '/')}">${L.ui.home}</a>${items.map(([h, t]) => `<span>/</span>${h ? `<a href="${h}">${t}</a>` : `<b>${t}</b>`}`).join('')}</nav>`;

const ctaBand = L => `<section class="cta-band"><div class="wrap cta-in">
  <div class="cta-text">
    <h2>${L.home.ctaTitle}</h2><p>${L.home.ctaLead}</p>
    <ul class="cta-contacts">
      <li><span class="cta-ic">${icon('phone')}</span><a href="${CONTACT.phoneHref}">${CONTACT.phone}</a></li>
      <li><span class="cta-ic">${icon('mail')}</span><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
      <li><span class="cta-ic">${icon('pin')}</span><span>${L.contact.areaV}</span></li>
    </ul>
    <div class="cta-btns">${btn(urlFor(L.code, '/contact/'), L.ui.quote, 'dark')}</div>
  </div>
  <div class="cta-photo">${photo('cta-photo', { label: stripTags(L.home.ctaTitle), ratio: '4x3', tone: 'slate', ic: 'painting' })}</div>
</div></section>`;

const SVC_TONE = { painting: 'gold', plastering: 'basalt', tiling: 'concrete', bathrooms: 'slate', flooring: 'gold' };

const CAR_FOCUS = { painting: '72% 50%', plastering: '45% 38%', tiling: '40% 50%', bathrooms: '78% 50%', flooring: '68% 50%' };
function carCard(L, s) {
  const S = L.svc[s], fp = fromPrice(s);
  const price = fp
    ? `<span class="car-price"><em>${L.ui.from}</em><strong>${fmtNum(fp.min)}</strong><i>${fp.unit === 'm2' ? L.ui.perM2 : L.ui.perMb}</i><b class="tag-vat">${L.ui.vat}</b></span>`
    : `<span class="car-price scope"><strong>${L.ui.byScope}</strong></span>`;
  return `<a class="car-card" href="${urlFor(L.code, '/services/' + s + '/')}" style="--op:${CAR_FOCUS[s]}" draggable="false">
    ${photo('svc-' + s + '-card', { label: S.photos[0], ratio: '4x3', ic: s, tone: SVC_TONE[s] })}
    <span class="car-ic">${icon(s)}</span>
    <div class="car-body">
      <h3>${S.name}</h3>
      <p>${S.short}</p>
      <div class="car-foot-row">
        ${price}
        <span class="car-go">${icon('arrow')}</span>
      </div>
    </div>
  </a>`;
}

function svcCard(L, s, big = false) {
  const fp = fromPrice(s);
  const priceTxt = fp ? `${L.ui.from} ${fmtNum(fp.min)} ${fp.unit === 'm2' ? L.ui.perM2 : L.ui.perMb} · ${L.ui.vat}` : L.ui.byScope;
  return `<a class="svc-card${big ? ' big' : ''} reveal" href="${urlFor(L.code, '/services/' + s + '/')}">
    ${photo('svc-' + s + '-card', { label: L.svc[s].photos[0], ratio: big ? '16x10' : '4x3', ic: s, tone: SVC_TONE[s] })}
    <div class="svc-body"><span class="svc-ic">${icon(s)}</span><h3>${L.svc[s].name}</h3><p>${L.svc[s].short}</p>
    <div class="svc-foot"><span class="mono">${priceTxt}</span><span class="svc-go">${icon('arrow')}</span></div></div></a>`;
}

const scopeTag = L => `<div class="tag tag-float tag-scope"><span class="tag-hole"></span><span class="tag-label">${L.ui.price}</span><span class="tag-text">${L.ui.byScope}</span></div>`;

const miniCalc = L => {
  const p = PRICES.find(x => x.id === 'paint');
  return `<div class="mini" data-min="${p.min}" data-max="${p.max}">
    <label class="mini-in"><span>${L.home.miniLabel}</span><div><input type="number" inputmode="decimal" min="0" step="any" placeholder="0" aria-label="${esc(L.home.miniLabel)} (${L.ui.m2})"><em>${L.ui.m2}</em></div></label>
    <p class="mini-note">${L.home.miniNote}</p>
    <div class="mini-out"><span class="mini-sum" data-kr="${L.ui.kr}">0 ${L.ui.kr}</span><span class="tag-vat">${L.ui.vat}</span></div></div>`;
};

// ---------- STRONA GŁÓWNA ----------
export function homePage(L) {
  const H = L.home, c = L.code;
  const faqs = L.generalFaq.slice(0, 4);
  const body = `
<section class="fs-hero" id="hero" aria-roledescription="carousel" aria-label="${L.nav.services}">
  ${SERVICES.map((s, i) => `<div class="sl-slide${i === 0 ? ' on' : ''}" aria-hidden="true"><div class="sl-bg">${photo('hero-' + s, { label: L.svc[s].photos[0], ratio: '16x9', tone: SVC_TONE[s], ic: s, cls: 'bg', prio: i === 0 })}</div><div class="fs-shade"></div></div>`).join('')}
  <div class="fs-grid">
    <div class="fs-copy">
      <h1>${H.title}</h1>
      <p class="lead">${H.lead}</p>
      <div class="cta-row">${btn(urlFor(c, '/contact/'), L.ui.quote, 'gold')}${btn(urlFor(c, '/prices/#calculator'), L.ui.calc, 'line')}</div>
      <p class="hero-area">${icon('pin')}<span>${H.areaLabel}</span> ${H.area}</p>
    </div>
    <aside class="offer" aria-live="polite">
      <div class="offer-head"><span>${L.nav.services}</span><span class="offer-dots" role="tablist" aria-label="${L.nav.services}">${SERVICES.map((s, i) => `<button class="offer-dot${i === 0 ? ' on' : ''}" type="button" role="tab" aria-selected="${i === 0}" aria-label="${L.svc[s].name}" data-i="${i}"></button>`).join('')}</span></div>
      <div class="offer-stack">${SERVICES.map((s, i) => {
        const S = L.svc[s], fp = fromPrice(s);
        const price = fp
          ? `<div class="offer-price"><span class="offer-from">${L.ui.from}</span><strong>${fmtNum(fp.min)}</strong><em>${fp.unit === 'm2' ? L.ui.perM2 : L.ui.perMb}</em><span class="tag-vat">${L.ui.vat}</span></div>`
          : `<div class="offer-price scope"><strong>${L.ui.byScope}</strong></div>`;
        return `<div class="offer-item${i === 0 ? ' on' : ''}" role="group" aria-roledescription="slide" aria-label="${i + 1} / ${SERVICES.length}">
          <span class="svc-ic">${icon(s)}</span>
          <h3>${S.name}</h3>
          <p>${S.short}</p>
          ${price}
        </div>`;
      }).join('')}</div>
      <div class="offer-foot">
        <a class="btn btn-dark btn-sm offer-link" href="${urlFor(c, '/services/' + SERVICES[0] + '/')}" data-base="${urlFor(c, '/services/')}" data-slugs="${SERVICES.join(',')}"><span>${L.ui.more}</span>${icon('arrow')}</a>
        <div class="offer-nav"><button class="sl-arrow prev" type="button" aria-label="Previous">${icon('arrow')}</button><button class="sl-arrow next" type="button" aria-label="Next">${icon('arrow')}</button></div>
      </div>
    </aside>
  </div>
</section>

<section class="section car-sec" id="services">
  <div class="wrap">
    ${secHead(L.nav.services, H.servicesTitle, H.servicesLead)}
  </div>
  <div class="car" aria-roledescription="carousel" aria-label="${L.nav.services}">
    <div class="car-track" tabindex="0">${SERVICES.map(s => carCard(L, s)).join('')}</div>
    <div class="wrap car-foot">
      <div class="car-progress" aria-hidden="true"><span class="car-thumb"></span></div>
      <div class="car-nav"><button class="car-arrow prev" type="button" aria-label="Previous">${icon('arrow')}</button><button class="car-arrow next" type="button" aria-label="Next">${icon('arrow')}</button></div>
    </div>
  </div>
</section>


<section class="section">
  <div class="wrap why">
    <div class="why-photo reveal">${photo('why-photo', { label: L.svc.plastering.photos[0], ratio: '4x5', tone: 'concrete', ic: 'level', cls: 'fill' })}</div>
    <div>
      ${secHead('', H.whyTitle)}
      <div class="why-grid">${H.why.map(([t, d, ic]) => `<div class="why-item reveal"><span class="why-ic">${icon(ic === 'handshake' ? 'user' : ic)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
    </div>
  </div>
</section>





<section class="section section-sand how">
  <div class="wrap how-in">
    <div class="how-text">
      ${secHead(L.ui.process, H.processTitle)}
      <ol class="how-steps">${H.process.map(([t, d], i) => `<li class="reveal"><span class="how-ic">${icon(['phone', 'ruler', 'level', 'check'][i])}</span><div><span class="how-n">${L.ui.step} ${i + 1}</span><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>
    </div>
    <div class="how-photo reveal">${photo('steps-photo', { label: stripTags(H.processTitle), ratio: '4x5', tone: 'concrete', ic: 'level' })}</div>
  </div>
</section>





<section class="section">
  <div class="wrap faq-wrap">
    <div>${secHead(L.ui.faq, H.faqTitle)}<div class="cta-row">${btn(urlFor(c, '/faq/'), H.faqAll, 'line')}</div></div>
    ${faqList(faqs)}
  </div>
</section>
${ctaBand(L)}
${faqJsonLd(faqs)}`;
  return layout(L, { key: 'home', path: '/', title: L.seo.home[0], desc: L.seo.home[1], body });
}

// ---------- USŁUGI: przegląd ----------
export function servicesPage(L) {
  const c = L.code;
  const rows = SERVICES.map((s, i) => {
    const S = L.svc[s];
    const items = rowsFor(s).slice(0, 3);
    return `<article class="svc-row reveal${i % 2 ? ' flip' : ''}">
      <div class="svc-row-photo">${photo('svc-' + s + '-card', { label: S.photos[0], ratio: '4x3', ic: s, tone: SVC_TONE[s] })}</div>
      <div class="svc-row-text"><span class="svc-ic">${icon(s)}</span><h2>${S.name}</h2><p>${S.lead}</p>
        <ul class="ticks">${S.includes.slice(0, 4).map(x => `<li>${icon('check')}${x}</li>`).join('')}</ul>
        ${shelf(L, items)}
        ${btn(urlFor(c, '/services/' + s + '/'), L.ui.more, 'dark')}</div></article>`;
  }).join('');
  const body = `
<section class="page-hero"><div class="wrap">${crumbs(L, [[null, L.nav.services]])}<h1>${L.svc.index.title}</h1><p class="lead">${L.svc.index.lead}</p></div><div class="wrap">${ruler('ruler-hero')}</div></section>
<section class="section"><div class="wrap svc-rows">${rows}</div></section>
${ctaBand(L)}`;
  return layout(L, { key: 'services', path: '/services/', title: L.seo.services[0], desc: L.seo.services[1], body });
}

// ---------- USŁUGA: podstrona ----------
export function servicePage(L, s) {
  const S = L.svc[s], c = L.code, fp = fromPrice(s);
  const rows = rowsFor(s);
  const others = SERVICES.filter(x => x !== s).slice(0, 3);
  const body = `
<section class="svc-hero"><div class="wrap svc-hero-in">
  <div>
    ${crumbs(L, [[urlFor(c, '/services/'), L.nav.services], [null, S.name]])}
    <span class="svc-ic big">${icon(s)}</span>
    <h1>${S.name}</h1><p class="lead">${S.lead}</p>
    <div class="cta-row">${btn(urlFor(c, '/contact/'), L.ui.quote, 'gold')}${btn('#cennik', L.ui.calc, 'line')}</div>
  </div>
  <div class="svc-hero-photo">${photo('svc-' + s + '-hero', { label: S.photos[0], ratio: '4x3', ic: s, tone: SVC_TONE[s] === 'basalt' ? 'concrete' : SVC_TONE[s], prio: true })}
    ${fp ? priceTag(L, { label: L.ui.from, price: fmtNum(fp.min), unit: fp.unit === 'm2' ? L.ui.perM2 : L.ui.perMb, cls: 'tag-float' }) : scopeTag(L)}</div>
</div><div class="wrap">${ruler('ruler-hero')}</div></section>

<section class="section">
  <div class="wrap two">
    <div class="prose">${S.intro.map(p => `<p>${p}</p>`).join('')}</div>
    <div class="includes"><h3>${L.ui.includes}</h3><ul class="ticks">${S.includes.map(x => `<li>${icon('check')}${x}</li>`).join('')}</ul></div>
  </div>
</section>

<section class="section section-sand how">
  <div class="wrap how-in">
    <div class="how-text">
      ${secHead(L.ui.process, S.stepsTitle)}
      <ol class="how-steps">${S.steps.map(([t, d], i) => `<li class="reveal"><span class="how-ic">${icon(['ruler', 'level', s, 'check'][i] || 'check')}</span><div><span class="how-n">${L.ui.step} ${i + 1}</span><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>
    </div>
    <div class="how-photo reveal">${photo(hasImg('svc-' + s + '-steps') ? 'svc-' + s + '-steps' : 'svc-' + s + '-card', { label: S.photos[0], ratio: '4x5', ic: s, tone: SVC_TONE[s] })}</div>
  </div>
</section>

<section class="section" id="cennik">
  <div class="wrap">
    ${secHead(L.ui.pricing, S.priceTitle, S.priceLead)}
    ${sheet(L, rows)}
  </div>
</section>

<section class="section">
  <div class="wrap faq-wrap">
    <div>${secHead(L.ui.faq, S.faqTitle)}</div>
    ${faqList(S.faq)}
  </div>
</section>

<section class="section section-sand">
  <div class="wrap">
    ${secHead('', L.ui.related)}
    <div class="svc-grid three">${others.map(o => svcCard(L, o)).join('')}</div>
  </div>
</section>
${ctaBand(L)}
${faqJsonLd(S.faq)}`;
  return layout(L, { key: 'service', path: '/services/' + s + '/', title: S.seo[0], desc: S.seo[1], body, pv: pvFor(L, rows, S.name), crumbs: [[L.nav.services, '/services/'], [S.name, '/services/' + s + '/']], ld: [serviceLd(L, s)] });
}

// ---------- CENNIK + KALKULATOR ----------
export function pricesPage(L) {
  const groups = CALC_GROUPS.map(g => [g, L.calcGroups[g], PRICES.filter(x => x.calc === g)]);
  const pv = {
    lang: L.code,
    prices: PRICES.map(({ id, calc, unit, min, max }) => ({ id, calc, unit, min, max })),
    groups: CALC_GROUPS, groupNames: L.calcGroups,
    names: Object.fromEntries(PRICES.map(x => [x.id, L.items[x.id].n])),
    scopes: Object.fromEntries(PRICES.map(x => [x.id, L.items[x.id].s || ''])),
    notes: Object.fromEntries(PRICES.map(x => [x.id, L.items[x.id].m || ''])),
    hints: L.itemHints,
    ui: { m2: L.ui.m2, mb: L.ui.mb, kr: L.ui.kr, vat: L.ui.vat, perM2: L.ui.perM2, perMb: L.ui.perMb, from: L.ui.from, ...L.prices },
    contactUrl: urlFor(L.code, '/contact/')
  };
  const body = `
<section class="page-hero"><div class="wrap">${crumbs(L, [[null, L.nav.prices]])}<h1>${L.prices.title}</h1><p class="lead">${L.prices.lead}</p>
  <ul class="chips chips-link">${groups.map(([id, t]) => `<li><a href="#g-${id}">${t}</a></li>`).join('')}</ul></div><div class="wrap">${ruler('ruler-hero')}</div></section>
<section class="section prices-sec" id="cennik"><div class="wrap" id="calculator">
  ${sheet(L, null, groups)}
  <p class="fine"><b>${L.prices.materials}</b> ${L.prices.note}</p>
</div></section>
${ctaBand(L)}`;
  return layout(L, { key: 'prices', path: '/prices/', title: L.seo.prices[0], desc: L.seo.prices[1], body, pv });
}

// ---------- REALIZACJE ----------
// ---------- FAQ ----------
const FAQ_SEARCH = {
  pl: { label: 'Szukaj pytania', ph: 'Szukaj, np. cena, termin, hydroizolacja', clear: 'Wyczyść', none: 'Nie ma odpowiedzi na to pytanie. Zadzwoń lub napisz, a odpowiemy.', count: 'Znalezione pytania:', all: 'Wszystkie pytania',
    syn: [['cen', 'kosz', 'ile', 'kwot', 'stawk', 'platn'], ['vat', 'netto', 'faktur'], ['termin', 'kiedy', 'czas', 'szybko', 'dlugo', 'trwa'], ['zdjec', 'foto', 'wymiar'], ['wycen', 'ofert', 'kalkulat'], ['materi', 'farb', 'klej', 'plytk'], ['lazien', 'prysznic', 'hydroizol', 'mokr']] },
  en: { label: 'Search questions', ph: 'Search, e.g. price, timing, waterproofing', clear: 'Clear', none: 'No answer found for that. Call or write to us and we will reply.', count: 'Questions found:', all: 'All questions',
    syn: [['price', 'cost', 'much', 'rate', 'pay'], ['vat', 'net', 'invoice'], ['when', 'time', 'long', 'start', 'quick'], ['photo', 'picture', 'measure'], ['quote', 'estimate', 'calcul', 'offer'], ['material', 'paint', 'adhesive', 'tile'], ['bathroom', 'shower', 'waterproof', 'wet']] },
  is: { label: 'Leita að spurningu', ph: 'Leita, t.d. verð, tími, vatnsvörn', clear: 'Hreinsa', none: 'Ekkert svar fannst. Hringdu eða skrifaðu okkur og við svörum.', count: 'Spurningar fundust:', all: 'Allar spurningar',
    syn: [['ver', 'kostn', 'hvad', 'taxt', 'greid'], ['vsk', 'nett', 'reikn'], ['tim', 'hven', 'lengi', 'byrja', 'fljot'], ['mynd', 'ljosm', 'mal'], ['tilbod', 'aaetl', 'reikni'], ['efni', 'malning', 'lim', 'flis'], ['badherb', 'sturt', 'vatnsv', 'votr']] }
};
const faqTools = L => {
  const F = FAQ_SEARCH[L.code];
  return `<div class="faq-tools" data-syn='${esc(JSON.stringify(F.syn))}' data-none="${esc(F.none)}" data-count="${esc(F.count)}">
    <label class="faq-search"><span class="sr-only">${F.label}</span>${icon('search')}<input id="faq-q" type="search" placeholder="${esc(F.ph)}" autocomplete="off" enterkeyhint="search"><button id="faq-clear" class="faq-clear" type="button" hidden aria-label="${esc(F.clear)}">${icon('plus')}</button></label>
    <p id="faq-status" class="faq-status" aria-live="polite"></p>
  </div>
  <div id="faq-none" class="faq-none" hidden><p>${F.none}</p><div class="cta-row">${btn(urlFor(L.code, '/contact/'), L.ui.quote, 'gold')}<a class="btn btn-line" href="${CONTACT.phoneHref}"><span>${CONTACT.phone}</span>${icon('phone')}</a></div></div>`;
};

export function faqPage(L) {
  const blocks = [[L.faqPage.general, L.generalFaq, 'general'], ...SERVICES.map(s => [L.svc[s].name, L.svc[s].faq, s])];
  const all = blocks.flatMap(b => b[1]);
  const body = `
<section class="page-hero"><div class="wrap">${crumbs(L, [[null, L.nav.faq]])}<h1>${L.faqPage.title}</h1><p class="lead">${L.faqPage.lead}</p>
  <ul class="chips chips-link">${blocks.map(([t, , id]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ul></div><div class="wrap">${ruler('ruler-hero')}</div></section>
<section class="section"><div class="wrap faq-all">
  ${faqTools(L)}
  ${blocks.map(([t, items, id]) => `<div class="faq-block" id="${id}"><h2>${t}</h2>${faqList(items)}</div>`).join('')}
</div></section>
${ctaBand(L)}
${faqJsonLd(all)}`;
  return layout(L, { key: 'faq', path: '/faq/', title: L.seo.faq[0], desc: L.seo.faq[1], body });
}

// ---------- KONTAKT ----------
export function contactPage(L) {
  const C = L.contact;
  const body = `
<section class="page-hero"><div class="wrap">${crumbs(L, [[null, L.nav.contact]])}<h1>${C.title}</h1><p class="lead">${C.lead}</p></div><div class="wrap">${ruler('ruler-hero')}</div></section>
<section class="section"><div class="wrap contact">
  <div>
    <dl class="contact-list">
      <div><dt>${icon('phone')}${C.phone}</dt><dd><a href="${CONTACT.phoneHref}">${CONTACT.phone}</a></dd></div>
      <div><dt>${icon('mail')}${C.email}</dt><dd><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></dd></div>
      ${CONTACT.whatsapp ? `<div><dt>${icon('phone')}WhatsApp</dt><dd><a href="https://wa.me/${CONTACT.whatsapp}" target="_blank" rel="noopener">${CONTACT.phone}</a></dd></div>` : ''}
      <div><dt>${icon('pin')}${C.area}</dt><dd>${C.areaV}</dd></div>
    </dl>
    <div class="contact-photo">${photo('contact-photo', { label: L.nav.contact, ratio: '4x3', tone: 'slate', ic: 'painting', cls: 'fill' })}</div>
  </div>
  <form id="contact-form" class="form" data-subject="${esc(C.subject)}" data-lbl-name="${esc(C.name)}" data-lbl-phone="${esc(C.fphone)}" data-lbl-email="${esc(C.femail)}">
    <p class="form-intro">${C.formIntro}</p>
    <label><span>${C.name}</span><input id="f-name" type="text" required autocomplete="name"></label>
    <div class="row2"><label><span>${C.fphone}</span><input id="f-phone" type="tel" autocomplete="tel"></label>
    <label><span>${C.femail}</span><input id="f-email" type="email" autocomplete="email"></label></div>
    <label><span>${C.msg}</span><textarea id="f-msg" rows="7" required placeholder="${esc(C.ph)}"></textarea></label>
    <p class="form-info" id="f-info" hidden></p>
    <button class="btn btn-gold" type="submit"><span>${C.send}</span>${icon('mail')}</button>
    <p class="form-note">${C.note}</p>
    <p class="form-alt">${C.alt} <a href="${CONTACT.phoneHref}">${CONTACT.phone}</a> · <a href="mailto:${CONTACT.email}">${CONTACT.email}</a></p>
  </form>
</div></section>`;
  return layout(L, { key: 'contact', path: '/contact/', title: L.seo.contact[0], desc: L.seo.contact[1], body });
}

// ---------- POLITYKA PRYWATNOŚCI ----------
export function privacyPage(L) {
  const G = LEGAL[L.code];
  const fill = s => s.replace('{EMAIL}', `<a href="mailto:${CONTACT.email}">${CONTACT.email}</a>`).replace('{PHONE}', `<a href="${CONTACT.phoneHref}">${CONTACT.phone}</a>`);
  const body = `
<section class="page-hero"><div class="wrap">${crumbs(L, [[null, G.title]])}<h1>${G.title}</h1><p class="lead">${G.updated}</p></div><div class="wrap">${ruler('ruler-hero')}</div></section>
<section class="section"><div class="wrap legal">
  ${G.sections.map(([h, ps]) => `<section><h2>${h}</h2>${ps.map(t => `<p>${fill(t)}</p>`).join('')}</section>`).join('')}
  <p><button type="button" class="btn btn-line cookie-open"><span>${G.footer.settings}</span></button></p>
</div></section>`;
  return layout(L, { key: 'privacy', path: '/privacy/', title: G.seo[0], desc: G.seo[1], body });
}
