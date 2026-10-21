import { PRICES, SERVICES, CALC_GROUPS, fromPrice, rowsFor, fmtNum } from './data/prices.mjs';
import { BASE, CONTACT, esc, stripTags, icon, flag, urlFor, asset, photo, priceTag, ruler, faqList, faqJsonLd, btn } from './ui.mjs';

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

// ---------- layout ----------
export function layout(L, { key, path, title, desc, body, head = '', pv = null }) {
  const alt = LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${urlFor(l, path)}">`).join('') +
    `<link rel="alternate" hreflang="x-default" href="${urlFor('is', path)}">`;
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
<meta name="theme-color" content="#1E2023">
<meta property="og:title" content="${esc(stripTags(title))}"><meta property="og:description" content="${esc(desc)}"><meta property="og:type" content="website">
<link rel="icon" href="${asset('favicon.svg')}" type="image/svg+xml">
${alt}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,500..900&family=Figtree:wght@400;500;600;700&family=Barlow+Semi+Condensed:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${asset('style.css')}?v=${Date.now()}">
${CONTACT.analytics.src ? `<script defer data-domain="${CONTACT.analytics.domain}" src="${CONTACT.analytics.src}"></script>` : ''}
${head}
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
  <div class="wrap foot-company"><h4>${L.footer.company[0]}</h4><ul>${[1, 2, 3].map(i => `<li><span>${L.footer.company[i]}</span><em>${L.footer.company[4]}</em></li>`).join('')}</ul></div>
  <div class="wrap foot-bot"><span>© ${new Date().getFullYear()} Prime Verk. ${L.footer.rights}</span><span>${L.footer.credit} <a href="https://nataliajagus.com" target="_blank" rel="noopener">nataliajagus.com</a></span></div>
</footer>
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
      <p class="eyebrow"><i></i>${H.eyebrow}</p>
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



<section class="section calc-promo">
  <div class="wrap calc-promo-in">
    <div>
      <p class="eyebrow">${L.nav.prices}</p><h2>${H.calcTitle}</h2><p class="sec-lead">${H.calcLead}</p>
      <div class="cta-row">${btn(urlFor(c, '/prices/#calculator'), H.calcBtn, 'gold')}${btn(urlFor(c, '/prices/#cennik'), L.prices.listTitle, 'line')}</div>
    </div>
    ${miniCalc(L)}
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
  const ld = `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org', '@type': 'HomeAndConstructionBusiness', name: 'Prime Verk',
    telephone: CONTACT.phone, email: CONTACT.email,
    areaServed: ['Reykjavík', 'Keflavík', 'Selfoss'], knowsLanguage: ['is', 'en', 'pl']
  })}</script>`;
  return layout(L, { key: 'home', path: '/', title: L.seo.home[0], desc: L.seo.home[1], body, head: ld });
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
    <div class="cta-row">${btn(urlFor(c, '/contact/'), L.ui.quote, 'gold')}${btn(urlFor(c, '/prices/#calculator'), L.ui.calc, 'line')}</div>
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
    <div class="how-photo reveal">${photo('svc-' + s + '-card', { label: S.photos[0], ratio: '4x5', ic: s, tone: SVC_TONE[s] })}</div>
  </div>
</section>

<section class="section" id="cennik">
  <div class="wrap">
    ${secHead(L.ui.pricing, S.priceTitle, L.prices.lead)}
    ${priceCards(L, rows)}
    <p class="fine">${L.prices.materials}</p>
    <p class="fine">${L.prices.note}</p>
  </div>
</section>

<section class="section section-dark" id="calculator">
  <div class="wrap">
    ${secHead(L.nav.prices, S.calcTitle, L.prices.calcLead, 'on-dark')}
    ${calcBlock(L)}
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
  return layout(L, { key: 'service', path: '/services/' + s + '/', title: S.seo[0], desc: S.seo[1], body, pv: pvFor(L, rows, S.name) });
}

// ---------- CENNIK + KALKULATOR ----------
export function pricesPage(L) {
  const groups = CALC_GROUPS.map(g => {
    const rows = PRICES.filter(p => p.calc === g);
    return `<div class="price-group-block"><h3 class="pg-title">${L.calcGroups[g]}</h3>${priceCards(L, rows)}</div>`;
  }).join('');
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
<section class="page-hero"><div class="wrap">${crumbs(L, [[null, L.nav.prices]])}<h1>${L.prices.title}</h1><p class="lead">${L.prices.lead}</p><span class="vat-badge">${L.ui.vatLong}</span></div><div class="wrap">${ruler('ruler-hero')}</div></section>
<section class="section" id="cennik"><div class="wrap">
  ${secHead('', L.prices.listTitle)}
  <div class="price-groups-v">${groups}</div>
  <p class="fine">${L.prices.materials}</p>
  <p class="fine">${L.prices.note}</p>
</div></section>
<section class="section section-dark" id="calculator"><div class="wrap">
  ${secHead(L.nav.prices, L.prices.calcTitle, L.prices.calcLead, 'on-dark')}
  ${calcBlock(L)}
</div></section>
${ctaBand(L)}`;
  return layout(L, { key: 'prices', path: '/prices/', title: L.seo.prices[0], desc: L.seo.prices[1], body, pv });
}

// ---------- REALIZACJE ----------
// ---------- FAQ ----------
export function faqPage(L) {
  const blocks = [[L.faqPage.general, L.generalFaq, 'general'], ...SERVICES.map(s => [L.svc[s].name, L.svc[s].faq, s])];
  const all = blocks.flatMap(b => b[1]);
  const body = `
<section class="page-hero"><div class="wrap">${crumbs(L, [[null, L.nav.faq]])}<h1>${L.faqPage.title}</h1><p class="lead">${L.faqPage.lead}</p>
  <ul class="chips chips-link">${blocks.map(([t, , id]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ul></div><div class="wrap">${ruler('ruler-hero')}</div></section>
<section class="section"><div class="wrap faq-all">
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
    <div class="contact-photo">${photo('contact-photo', { label: L.home.eyebrow, ratio: '4x3', tone: 'slate', ic: 'painting', cls: 'fill' })}</div>
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
