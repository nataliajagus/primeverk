import { PRICES, SERVICES, CALC_GROUPS, fromPrice, fmtNum } from './data/prices.mjs';
import { BASE, CONTACT, esc, stripTags, icon, urlFor, asset, photo, priceTag, ruler, faqList, faqJsonLd, btn } from './ui.mjs';

export const LANGS = ['is', 'en', 'pl'];
const NAV_ORDER = ['services', 'prices', 'projects', 'faq', 'contact'];
const NAV_PATH = { services: '/services/', prices: '/prices/', projects: '/projects/', faq: '/faq/', contact: '/contact/' };

// ---------- ceny ----------
export function priceText(L, p, { short = false } = {}) {
  const unit = p.unit === 'm2' ? L.ui.perM2 : L.ui.perMb;
  if (p.max === null) return `${L.ui.from} ${fmtNum(p.min)} ${unit}`;
  if (p.min === p.max) return `${fmtNum(p.min)} ${unit}`;
  return `${fmtNum(p.min)}–${fmtNum(p.max)} ${unit}`;
}
const shelf = (L, rows) => `<ul class="shelf">` + rows.map(p =>
  `<li><span class="shelf-name">${L.items[p.id]}</span><span class="shelf-price">${priceText(L, p)}</span></li>`).join('') + `</ul>`;

// ---------- layout ----------
export function layout(L, { key, path, title, desc, body, head = '', pv = null }) {
  const alt = LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${urlFor(l, path)}">`).join('') +
    `<link rel="alternate" hreflang="x-default" href="${urlFor('is', path)}">`;
  const langs = LANGS.map(l => `<a href="${urlFor(l, path)}" lang="${l}" hreflang="${l}"${l === L.code ? ' class="active" aria-current="true"' : ''}>${l.toUpperCase()}</a>`).join('');
  const svcLinks = SERVICES.map(s => `<a href="${urlFor(L.code, '/services/' + s + '/')}">${L.svc[s].name}</a>`).join('');
  const nav = NAV_ORDER.map(k => {
    const a = `<a href="${urlFor(L.code, NAV_PATH[k])}"${key === k || (k === 'services' && key === 'service') ? ' class="on"' : ''}>${L.nav[k]}</a>`;
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
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,500..900&family=Figtree:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${asset('style.css')}?v=${Date.now()}">
${head}
</head>
<body>
<a class="skip" href="#main">${L.ui.skip}</a>
<div class="strip"><div class="wrap strip-in">
  <span>${L.ui.vatLong}</span>
  <span class="strip-r"><a href="${CONTACT.phoneHref}">${icon('phone')}${CONTACT.phone}</a><span class="strip-loc">${icon('pin')}Reykjavík · Keflavík · Selfoss</span></span>
</div>${ruler('ruler-strip')}</div>
<header class="site-header" id="top">
  <div class="wrap hdr">
    <a class="brand" href="${urlFor(L.code, '/')}" aria-label="Prime Verk"><img src="${asset('logo.svg')}" alt="Prime Verk" width="112" height="50"></a>
    <nav class="nav" id="nav" aria-label="Main">${nav}
      <div class="nav-cta-m">${btn(urlFor(L.code, '/contact/'), L.ui.quote, 'gold')}</div>
    </nav>
    <div class="lang" role="group" aria-label="${L.ui.langName}">${langs}</div>
    <a class="btn btn-gold btn-sm hdr-cta" href="${urlFor(L.code, '/contact/')}"><span>${L.ui.quote}</span></a>
    <button class="burger" id="burger" aria-expanded="false" aria-controls="nav" aria-label="${L.ui.menu}"><span></span><span></span><span></span></button>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="foot">
  <div class="wrap foot-grid">
    <div class="foot-brand"><img src="${asset('logo-light.svg')}" alt="Prime Verk" width="120" height="54"><p>${L.footer.tag}</p>
      <span class="tag-vat">${L.ui.vatLong}</span></div>
    <div><h4>${L.footer.services}</h4>${svcLinks}</div>
    <div><h4>${L.footer.pages}</h4>${NAV_ORDER.filter(k => k !== 'services').map(k => `<a href="${urlFor(L.code, NAV_PATH[k])}">${L.nav[k]}</a>`).join('')}</div>
    <div><h4>${L.footer.contact}</h4><a href="${CONTACT.phoneHref}">${CONTACT.phone}</a><a href="mailto:${CONTACT.email}">${CONTACT.email}</a><a href="${CONTACT.facebook}" target="_blank" rel="noopener">Facebook</a><span class="foot-area">${L.contact.areaV}</span></div>
  </div>
  <div class="wrap foot-bot"><span>© ${new Date().getFullYear()} Prime Verk. ${L.footer.rights}</span><span>${L.ui.vatLong}</span><span>${L.footer.credit} <a href="https://nataliajagus.com" target="_blank" rel="noopener">nataliajagus.com</a></span></div>
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
  <div><h2>${L.home.ctaTitle}</h2><p>${L.home.ctaLead}</p></div>
  <div class="cta-btns">${btn(urlFor(L.code, '/contact/'), L.ui.quote, 'dark')}<a class="btn btn-line" href="${CONTACT.phoneHref}"><span>${CONTACT.phone}</span>${icon('phone')}</a></div>
</div></section>`;

const SVC_TONE = { painting: 'gold', plastering: 'basalt', tiling: 'concrete', bathrooms: 'slate', flooring: 'gold' };

function svcCard(L, s, big = false) {
  const fp = fromPrice(s);
  return `<a class="svc-card${big ? ' big' : ''} reveal" href="${urlFor(L.code, '/services/' + s + '/')}">
    ${photo('svc-' + s + '-card', { label: L.svc[s].photos[0], ratio: big ? '16x10' : '4x3', ic: s, tone: SVC_TONE[s] })}
    <div class="svc-body"><span class="svc-ic">${icon(s)}</span><h3>${L.svc[s].name}</h3><p>${L.svc[s].short}</p>
    <div class="svc-foot"><span class="mono">${L.ui.from} ${fmtNum(fp.min)} ${fp.unit === 'm2' ? L.ui.perM2 : L.ui.perMb} · ${L.ui.vat}</span><span class="svc-go">${icon('arrow')}</span></div></div></a>`;
}

const beforeAfter = L => `<div class="ba" style="--pos:50%">
  <div class="ba-layer">${photo('ba-after', { label: L.ui.after, ratio: '21x9', tone: 'gold', ic: 'painting', cls: 'fill' })}</div>
  <div class="ba-layer ba-top">${photo('ba-before', { label: L.ui.before, ratio: '21x9', tone: 'concrete', ic: 'plastering', cls: 'fill' })}</div>
  <span class="ba-tag ba-l">${L.ui.before}</span><span class="ba-tag ba-r">${L.ui.after}</span>
  <div class="ba-handle" aria-hidden="true"><span>${icon('arrow')}</span></div>
  <input type="range" min="0" max="100" value="50" aria-label="${esc(L.ui.dragHint)}">
</div>`;

const miniCalc = L => {
  const p = PRICES.find(x => x.id === 'paint');
  return `<div class="mini" data-min="${p.min}" data-max="${p.max}">
    <label class="mini-in"><span>${L.svc.painting.name}</span><div><input type="number" inputmode="decimal" min="0" step="any" placeholder="0" aria-label="${L.svc.painting.name} (${L.ui.m2})"><em>${L.ui.m2}</em></div></label>
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
      <div class="cta-row">${btn(urlFor(c, '/prices/#calculator'), L.ui.calc, 'gold')}${btn(urlFor(c, '/contact/'), L.ui.quote, 'line')}</div>
    </div>
    <aside class="offer" aria-live="polite">
      <div class="offer-head"><span>${L.nav.services}</span><span class="offer-dots" role="tablist" aria-label="${L.nav.services}">${SERVICES.map((s, i) => `<button class="offer-dot${i === 0 ? ' on' : ''}" type="button" role="tab" aria-selected="${i === 0}" aria-label="${L.svc[s].name}" data-i="${i}"></button>`).join('')}</span></div>
      <div class="offer-stack">${SERVICES.map((s, i) => {
        const S = L.svc[s], fp = fromPrice(s), unit = fp.unit === 'm2' ? L.ui.perM2 : L.ui.perMb;
        return `<div class="offer-item${i === 0 ? ' on' : ''}" role="group" aria-roledescription="slide" aria-label="${i + 1} / ${SERVICES.length}">
          <span class="svc-ic">${icon(s)}</span>
          <h3>${S.name}</h3>
          <p>${S.short}</p>
          <div class="offer-price"><span class="offer-from">${L.ui.from}</span><strong>${fmtNum(fp.min)}</strong><em>${unit}</em><span class="tag-vat">${L.ui.vat}</span></div>
        </div>`;
      }).join('')}</div>
      <div class="offer-foot">
        <a class="btn btn-dark btn-sm offer-link" href="${urlFor(c, '/services/' + SERVICES[0] + '/')}" data-base="${urlFor(c, '/services/')}" data-slugs="${SERVICES.join(',')}"><span>${L.ui.more}</span>${icon('arrow')}</a>
        <div class="offer-nav"><button class="sl-arrow prev" type="button" aria-label="Previous">${icon('arrow')}</button><button class="sl-arrow next" type="button" aria-label="Next">${icon('arrow')}</button></div>
      </div>
    </aside>
  </div>
</section>

<section class="section" id="services">
  <div class="wrap">
    ${secHead(L.nav.services, H.servicesTitle, H.servicesLead)}
    <div class="svc-grid">
      ${svcCard(L, 'painting', true)}${svcCard(L, 'plastering', true)}
      ${svcCard(L, 'tiling')}${svcCard(L, 'bathrooms')}${svcCard(L, 'flooring')}
    </div>
  </div>
</section>

<section class="rail"><div class="wrap">
  <div class="rail-head"><p class="eyebrow">${L.nav.prices}</p><h2>${H.railTitle}</h2><span class="tag-vat">${L.ui.vatLong}</span></div>
  <div class="rail-line" aria-hidden="true"></div>
  <ul class="rail-tags">${SERVICES.map((s, i) => {
    const fp = fromPrice(s);
    return `<li style="--rot:${[-2.2, 1.6, -1.2, 2.2, -1.8][i]}deg;--delay:${i * 60}ms"><a href="${urlFor(c, '/services/' + s + '/')}">${priceTag(L, { label: `${L.svc[s].name} · ${L.ui.from}`, price: fmtNum(fp.min), unit: fp.unit === 'm2' ? L.ui.perM2 : L.ui.perMb })}</a></li>`;
  }).join('')}</ul>
</div></section>

<section class="section">
  <div class="wrap why">
    <div class="why-photo reveal">${photo('why-photo', { label: L.svc.plastering.photos[0], ratio: '4x5', tone: 'concrete', ic: 'level', cls: 'fill' })}</div>
    <div>
      ${secHead('', H.whyTitle)}
      <div class="why-grid">${H.why.map(([t, d, ic]) => `<div class="why-item reveal"><span class="why-ic">${icon(ic === 'handshake' ? 'user' : ic)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
    </div>
  </div>
</section>

<section class="section section-dark ba-sec">
  <div class="wrap">
    ${secHead(L.ui.gallery, H.baTitle, H.baLead, 'on-dark')}
    ${beforeAfter(L)}
    <p class="ba-hint mono">${icon('arrow')} ${L.ui.dragHint}</p>
  </div>
</section>

<section class="section calc-promo">
  <div class="wrap calc-promo-in">
    <div>
      <p class="eyebrow">${L.nav.prices}</p><h2>${H.calcTitle}</h2><p class="sec-lead">${H.calcLead}</p>
      <div class="cta-row">${btn(urlFor(c, '/prices/#calculator'), L.ui.calc, 'gold')}${btn(urlFor(c, '/prices/'), L.prices.listTitle, 'line')}</div>
    </div>
    ${miniCalc(L)}
  </div>
</section>

<section class="section section-sand">
  <div class="wrap">
    ${secHead(L.ui.process, H.processTitle)}
    <ol class="steps">${H.process.map(([t, d]) => `<li class="reveal"><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${secHead(L.nav.projects, H.projectsTitle, H.projectsLead)}
    <div class="proj-grid">
      ${[0, 1, 2].map(i => `<div class="reveal">${photo('proj-' + (i + 1), { label: L.projects.labels[i], ratio: i === 1 ? '4x5' : '4x3', ic: ['painting', 'bathrooms', 'flooring'][i], cls: 'fill' })}</div>`).join('')}
    </div>
    <div class="cta-row">${btn(urlFor(c, '/projects/'), L.nav.projects, 'dark')}<a class="btn btn-line" href="${CONTACT.facebook}" target="_blank" rel="noopener"><span>Facebook</span>${icon('fb')}</a></div>
  </div>
</section>

<section class="section section-sand">
  <div class="wrap">
    ${secHead('', H.revTitle)}
    <div class="rev-grid">${[0, 1, 2].map(() => `<figure class="rev reveal"><span class="stars" aria-hidden="true">★★★★★</span><blockquote>${H.revSoon}</blockquote><figcaption>${H.revWho}</figcaption></figure>`).join('')}</div>
  </div>
</section>

<section class="section">
  <div class="wrap faq-wrap">
    <div>${secHead(L.ui.faq, H.faqTitle)}<div class="cta-row">${btn(urlFor(c, '/faq/'), L.nav.faq, 'line')}</div></div>
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
    const items = PRICES.filter(p => p.svc.includes(s)).slice(0, 3);
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
  const rows = PRICES.filter(p => p.svc.includes(s));
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
    ${priceTag(L, { label: L.ui.from, price: fmtNum(fp.min), unit: fp.unit === 'm2' ? L.ui.perM2 : L.ui.perMb, cls: 'tag-float' })}</div>
</div><div class="wrap">${ruler('ruler-hero')}</div></section>

<section class="section">
  <div class="wrap two">
    <div class="prose">${S.intro.map(p => `<p>${p}</p>`).join('')}</div>
    <div class="includes"><h3>${L.ui.includes}</h3><ul class="ticks">${S.includes.map(x => `<li>${icon('check')}${x}</li>`).join('')}</ul></div>
  </div>
</section>

<section class="section section-dark">
  <div class="wrap">
    ${secHead(L.ui.process, S.name, '', 'on-dark')}
    <ol class="steps on-dark">${S.steps.map(([t, d]) => `<li class="reveal"><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${secHead(L.ui.pricing, L.prices.listTitle, L.prices.lead)}
    ${shelf(L, rows)}
    <p class="fine">${L.prices.note}</p>
    <div class="cta-row">${btn(urlFor(c, '/prices/#calculator'), L.ui.calc, 'gold')}</div>
  </div>
</section>

<section class="section section-sand">
  <div class="wrap">
    ${secHead(L.ui.gallery, L.nav.projects)}
    <div class="proj-grid">${S.photos.map((l, i) => `<div class="reveal">${photo(`svc-${s}-${i + 1}`, { label: l, ratio: i === 1 ? '4x5' : '4x3', ic: s, cls: 'fill' })}</div>`).join('')}</div>
  </div>
</section>

<section class="section">
  <div class="wrap faq-wrap">
    <div>${secHead(L.ui.faq, S.name)}</div>
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
  return layout(L, { key: 'service', path: '/services/' + s + '/', title: S.seo[0], desc: S.seo[1], body });
}

// ---------- CENNIK + KALKULATOR ----------
export function pricesPage(L) {
  const groups = CALC_GROUPS.map(g => {
    const rows = PRICES.filter(p => p.calc === g);
    return `<div class="price-group"><h3>${L.calcGroups[g]}</h3>${shelf(L, rows)}</div>`;
  }).join('');
  const pv = {
    lang: L.code,
    prices: PRICES.map(({ id, calc, unit, min, max }) => ({ id, calc, unit, min, max })),
    groups: CALC_GROUPS, groupNames: L.calcGroups, names: L.items,
    ui: { m2: L.ui.m2, mb: L.ui.mb, kr: L.ui.kr, vat: L.ui.vat, perM2: L.ui.perM2, perMb: L.ui.perMb, from: L.ui.from, ...L.prices },
    contactUrl: urlFor(L.code, '/contact/')
  };
  const body = `
<section class="page-hero"><div class="wrap">${crumbs(L, [[null, L.nav.prices]])}<h1>${L.prices.title}</h1><p class="lead">${L.prices.lead}</p><span class="vat-badge">${L.ui.vatLong}</span></div><div class="wrap">${ruler('ruler-hero')}</div></section>
<section class="section" id="cennik"><div class="wrap">
  ${secHead('', L.prices.listTitle)}
  <div class="price-groups">${groups}</div>
  <p class="fine">${L.prices.note}</p>
</div></section>
<section class="section section-dark" id="calculator"><div class="wrap">
  ${secHead(L.nav.prices, L.prices.calcTitle, L.prices.calcLead, 'on-dark')}
  <div class="calc"><div id="calc-fields" class="calc-fields"></div>
    <aside class="calc-side"><div id="calc-result" class="calc-result" aria-live="polite"></div>
      <p class="fine">${L.prices.disclaimer}</p>
      <button id="calc-send" class="btn btn-gold" type="button" disabled><span>${L.prices.send}</span>${icon('arrow')}</button>
      <button id="calc-reset" class="btn btn-line" type="button"><span>${L.prices.reset}</span></button>
    </aside></div>
</div></section>
${ctaBand(L)}`;
  return layout(L, { key: 'prices', path: '/prices/', title: L.seo.prices[0], desc: L.seo.prices[1], body, pv });
}

// ---------- REALIZACJE ----------
export function projectsPage(L) {
  const ics = ['painting', 'bathrooms', 'flooring', 'plastering', 'tiling', 'painting'];
  const ratios = ['4x3', '4x5', '4x3', '4x3', '4x5', '4x3'];
  const body = `
<section class="page-hero"><div class="wrap">${crumbs(L, [[null, L.nav.projects]])}<h1>${L.projects.title}</h1><p class="lead">${L.projects.lead}</p>
  <div class="cta-row"><a class="btn btn-dark" href="${CONTACT.facebook}" target="_blank" rel="noopener"><span>${L.projects.fb}</span>${icon('fb')}</a></div></div><div class="wrap">${ruler('ruler-hero')}</div></section>
<section class="section"><div class="wrap"><div class="masonry">
  ${L.projects.labels.map((l, i) => `<div class="reveal">${photo('proj-' + (i + 1), { label: l, ratio: ratios[i], ic: ics[i], cls: 'fill' })}</div>`).join('')}
</div></div></section>
${ctaBand(L)}`;
  return layout(L, { key: 'projects', path: '/projects/', title: L.seo.projects[0], desc: L.seo.projects[1], body });
}

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
      <div><dt>${icon('pin')}${C.area}</dt><dd>${C.areaV}</dd></div>
    </dl>
    <span class="vat-badge">${L.ui.vatLong}</span>
    <div class="contact-photo">${photo('contact-photo', { label: L.home.eyebrow, ratio: '4x3', tone: 'slate', ic: 'painting', cls: 'fill' })}</div>
  </div>
  <form id="contact-form" class="form" data-subject="${esc(C.subject)}" data-lbl-name="${esc(C.name)}" data-lbl-phone="${esc(C.fphone)}" data-lbl-email="${esc(C.femail)}" data-from-calc="${esc(C.fromCalc)}">
    <label><span>${C.name}</span><input id="f-name" type="text" required autocomplete="name"></label>
    <div class="row2"><label><span>${C.fphone}</span><input id="f-phone" type="tel" autocomplete="tel"></label>
    <label><span>${C.femail}</span><input id="f-email" type="email" autocomplete="email"></label></div>
    <label><span>${C.msg}</span><textarea id="f-msg" rows="7" required placeholder="${esc(C.ph)}"></textarea></label>
    <p class="form-info" id="f-info" hidden></p>
    <button class="btn btn-gold" type="submit"><span>${C.send}</span>${icon('arrow')}</button>
    <p class="fine">${C.note}</p>
  </form>
</div></section>`;
  return layout(L, { key: 'contact', path: '/contact/', title: L.seo.contact[0], desc: L.seo.contact[1], body });
}
