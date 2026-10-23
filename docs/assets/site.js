(function () {
  var fmt = function (n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // ---- cookies: wybór użytkownika (analityka tylko po zgodzie) ----
  var consentGet = function () { try { return localStorage.getItem('pv-consent'); } catch (e) { return null; } };
  var consentSet = function (v) { try { localStorage.setItem('pv-consent', v); } catch (e) {} };
  var loadAnalytics = function () {
    var m = document.querySelector('meta[name="pv-analytics"]');
    if (!m || document.getElementById('pv-an')) return;
    var parts = m.content.split('|'), s = document.createElement('script');
    s.id = 'pv-an'; s.defer = true; s.src = parts[0]; s.setAttribute('data-domain', parts[1]); document.head.appendChild(s);
  };
  var banner = document.getElementById('cookie');
  var showBanner = function (v) { if (banner) banner.hidden = !v; };
  if (consentGet() === 'all') loadAnalytics();
  if (consentGet() === null) showBanner(true);
  $$('#cookie [data-consent]').forEach(function (b) {
    b.addEventListener('click', function () { var v = b.getAttribute('data-consent'); consentSet(v); showBanner(false); if (v === 'all') loadAnalytics(); });
  });
  $$('.cookie-open').forEach(function (b) { b.addEventListener('click', function () { showBanner(true); }); });

  // ---- zdarzenia (Plausible lub zgodne; bez skryptu analityki nic się nie dzieje) ----
  var track = function (name, props) { try { if (window.plausible) window.plausible(name, props ? { props: props } : undefined); } catch (e) {} };
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    var h = a.getAttribute('href') || '';
    if (h.indexOf('tel:') === 0) track('Call');
    else if (h.indexOf('mailto:') === 0) track('Email');
    else if (h.indexOf('wa.me') >= 0) track('WhatsApp');
    else if (a.closest('.lang-menu')) track('Language', { to: a.getAttribute('lang') });
  });

  // ---- przełącznik języka ----
  var lang = $("#lang");
  if (lang) {
    var lbtn = $(".lang-btn", lang);
    var setLang = function (open) { lang.classList.toggle("open", open); lbtn.setAttribute("aria-expanded", open ? "true" : "false"); };
    lbtn.addEventListener("click", function (e) { e.stopPropagation(); setLang(!lang.classList.contains("open")); });
    document.addEventListener("click", function (e) { if (!lang.contains(e.target)) setLang(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { setLang(false); } });
  }

  // ---- menu mobilne ----
  var burger = $('#burger'), nav = $('#nav');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('nav-open', open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); document.body.classList.remove('nav-open'); }
    });
  }

  // ---- animacje wejścia ----
  var calmMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !calmMotion) {
    document.documentElement.classList.add('js-reveal');
    // oznaczamy tylko elementy poniżej pierwszego ekranu (te widoczne od razu mają animacje w CSS, bez migotania)
    var tag = function (sel, variant, step) {
      $$(sel).forEach(function (el) {
        var had = el.classList.contains('reveal');
        if (!had && el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
        el.classList.add('reveal');
        if (variant) el.classList.add(variant);
        if (!had && step) el.style.transitionDelay = Math.min(Array.prototype.indexOf.call(el.parentNode.children, el) * step, 380) + 'ms';
      });
    };
    tag('.sec-head > *', '', 110);
    tag('.prose > *', '', 110);
    tag('.includes', 'reveal-right');
    tag('.price-group', '', 100);
    tag('.shelf li', '', 45);
    tag('.calc-group', '', 80);
    tag('.contact > div:first-child', 'reveal-left');
    tag('.form', 'reveal-right');
    tag('.why-photo', 'reveal-wipe');
    tag('.how-photo', 'reveal-wipe');
    tag('.cta-photo', 'reveal-wipe');
    tag('.svc-row-photo', 'reveal-wipe');
    tag('.contact-photo', 'reveal-wipe');
    tag('.faq-list details', '', 70);
    tag('.faq-wrap > div:first-child', 'reveal-left');
    tag('.calc-promo-in > div:first-child', 'reveal-left');
    tag('.mini', 'reveal-right');
    tag('.car-card', 'reveal-zoom', 90);
    tag('.car-foot', '');
    tag('.cta-in > *', '', 120);
    tag('.foot-grid > div', '', 90);
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  }

  // ---- FAQ: inteligentne wyszukiwanie ----
  var tools = $('.faq-tools');
  if (tools) {
    var input = $('#faq-q'), clearBtn = $('#faq-clear'), statusEl = $('#faq-status'), noneEl = $('#faq-none');
    var SYN = JSON.parse(tools.getAttribute('data-syn') || '[]');
    var normalize = function (s) {
      return String(s).toLowerCase()
        .replace(/ł/g, 'l').replace(/đ|ð/g, 'd').replace(/þ/g, 'th').replace(/æ/g, 'ae').replace(/ø/g, 'o')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, ' ').trim();
    };
    var stem = function (w) { return w.length > 6 ? w.slice(0, w.length - 2) : w.length > 4 ? w.slice(0, w.length - 1) : w; };
    var STOP = ' czy jak co sie na w z do o i a to ale jest sa mozna mam mi nam wam you can are for and the how what does with your our is do to of in it we be a an er og ad um til ekki eg get ';
    var items = $$('.faq-list details').map(function (d) {
      var qw = normalize($('summary', d).textContent).split(' '), aw = normalize($('.faq-a', d).textContent).split(' ');
      return { el: d, qw: qw, aw: aw, block: d.closest('.faq-block') };
    });
    var variants = function (tok) {
      var st = stem(tok), syn = [];
      SYN.forEach(function (g) { if (g.some(function (x) { return st.indexOf(x) === 0 || (x.indexOf(st) === 0 && st.length >= 3); })) g.forEach(function (x) { if (x !== st && syn.indexOf(x) < 0) syn.push(x); }); });
      return { st: st, syn: syn };
    };
    var inWords = function (words, v) { return words.some(function (w) { return w.indexOf(v) === 0; }); };
    var score = function (it, vs) {
      var s = 0;
      for (var i = 0; i < vs.length; i++) {
        var v = vs[i], t = 0;
        if (inWords(it.qw, v.st)) t = 3; else if (inWords(it.aw, v.st)) t = 1;
        else if (v.syn.some(function (x) { return inWords(it.qw, x); })) t = 0.6;
        else if (v.syn.some(function (x) { return inWords(it.aw, x); })) t = 0.3;
        if (!t) return 0;
        s += t;
      }
      return s;
    };
    var run = function () {
      var q = normalize(input.value);
      var toks = q ? q.split(' ').filter(function (t) { return t.length > 1 && STOP.indexOf(' ' + t + ' ') < 0; }) : [];
      clearBtn.hidden = !input.value;
      var vs = toks.map(variants), shown = 0, max = 0;
      items.forEach(function (it) { it.s = toks.length ? score(it, vs) : 1; if (it.s > max) max = it.s; });
      items.forEach(function (it) {
        var ok = !toks.length || (it.s > 0 && it.s >= max * 0.5);
        it.el.hidden = !ok; if (ok) shown++;
        if (!toks.length) it.el.removeAttribute('open');
      });
      $$('.faq-block').forEach(function (bk) { bk.hidden = !items.some(function (it) { return it.block === bk && !it.el.hidden; }); });
      noneEl.hidden = !(toks.length && !shown);
      statusEl.textContent = toks.length && shown ? tools.getAttribute('data-count') + ' ' + shown : '';
      if (toks.length && shown && shown <= 3) items.forEach(function (it) { if (!it.el.hidden) it.el.setAttribute('open', ''); });
      $$('.chips-link').forEach(function (c) { c.hidden = !!toks.length; });
    };
    var t = null;
    input.addEventListener('input', function () { clearTimeout(t); t = setTimeout(run, 120); });
    input.addEventListener('search', run);
    clearBtn.addEventListener('click', function () { input.value = ''; run(); input.focus(); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Escape') { input.value = ''; run(); } });
    if (location.hash === '#szukaj' || /[?&]q=/.test(location.search)) { var m = location.search.match(/[?&]q=([^&]*)/); if (m) { input.value = decodeURIComponent(m[1]); run(); } }
  }

  // ---- FAQ: płynne rozwijanie i zwijanie ----
  $$('.faq-list details').forEach(function (d) {
    var sm = $('summary', d), body = $('.faq-a', d), anim = null;
    sm.addEventListener('click', function (e) {
      if (calmMotion || !body.animate) return;           // bez animacji: domyślne zachowanie przeglądarki
      e.preventDefault();
      if (anim) { anim.cancel(); anim = null; }
      var closing = d.open && !d.classList.contains('closing');
      var pb = parseFloat(getComputedStyle(body).paddingBottom) || 0;
      if (!closing) {
        d.classList.remove('closing'); d.open = true;
        var h = body.offsetHeight;
        anim = body.animate([{ height: '0px', paddingBottom: '0px', opacity: 0 }, { height: h + 'px', paddingBottom: pb + 'px', opacity: 1 }], { duration: 380, easing: 'cubic-bezier(.2,.7,.2,1)' });
        anim.onfinish = function () { anim = null; };
      } else {
        d.classList.add('closing');
        var h2 = body.offsetHeight;
        anim = body.animate([{ height: h2 + 'px', paddingBottom: pb + 'px', opacity: 1 }, { height: '0px', paddingBottom: '0px', opacity: 0 }], { duration: 300, easing: 'cubic-bezier(.4,0,.2,1)' });
        anim.onfinish = function () { d.open = false; d.classList.remove('closing'); anim = null; };
      }
    });
  });

  // ---- przycisk Zadzwoń (mobile): po przewinięciu ----
  var fab = $(".fab");
  if (fab) { var onScroll = function () { fab.classList.toggle("show", window.scrollY > 420); }; window.addEventListener("scroll", onScroll, { passive: true }); onScroll(); }

  // ---- hero: tło + box oferty zmieniają się razem ----
  var hero = $(".fs-hero");
  if (hero) {
    var slides = $$(".sl-slide", hero), items = $$(".offer-item", hero), tabs = $$(".offer-dot", hero);
    var link = $(".offer-link", hero), slugs = link.dataset.slugs.split(","), cur = 0, timer = null;
    var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches, DUR = 7000;
    hero.style.setProperty("--dur", DUR + "ms");
    var restart = function () {
      clearInterval(timer);
      hero.classList.remove("playing"); void hero.offsetWidth;
      if (calm) return;
      hero.classList.add("playing");
      timer = setInterval(function () { show(cur + 1); }, DUR);
    };
    var show = function (i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("on", k === cur); });
      items.forEach(function (s, k) { s.classList.toggle("on", k === cur); s.setAttribute("aria-hidden", k === cur ? "false" : "true"); });
      tabs.forEach(function (t, k) { t.classList.toggle("on", k === cur); t.setAttribute("aria-selected", k === cur ? "true" : "false"); });
      link.href = link.dataset.base + slugs[cur] + "/";
      if (!hero.classList.contains("paused")) restart(); else { hero.classList.remove("playing"); void hero.offsetWidth; hero.classList.add("playing"); }
    };
    $(".sl-arrow.next", hero).addEventListener("click", function () { show(cur + 1); });
    $(".sl-arrow.prev", hero).addEventListener("click", function () { show(cur - 1); });
    tabs.forEach(function (t) { t.addEventListener("click", function () { show(+t.dataset.i); }); });
    hero.addEventListener("keydown", function (e) { if (e.key === "ArrowRight") show(cur + 1); if (e.key === "ArrowLeft") show(cur - 1); });
    var pause = function () { clearInterval(timer); hero.classList.add("paused"); };
    var resume = function () { hero.classList.remove("paused"); if (!calm) restart(); };
    hero.addEventListener("mouseenter", pause); hero.addEventListener("mouseleave", resume);
    hero.addEventListener("focusin", pause); hero.addEventListener("focusout", resume);
    var sx = null;
    hero.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener("touchend", function (e) { if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1)); sx = null; }, { passive: true });
    show(0);
  }

  // ---- karuzela usług ----
  var car = $(".car");
  if (car) {
    var ctrack = $(".car-track", car), cprev = $(".car-arrow.prev", car), cnext = $(".car-arrow.next", car), thumb = $(".car-thumb", car);
    var calmCar = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var stepW = function () { var c = $(".car-card", ctrack); return c.getBoundingClientRect().width + 20; };
    var sync = function () {
      var max = ctrack.scrollWidth - ctrack.clientWidth, x = ctrack.scrollLeft;
      thumb.style.width = Math.max(12, ctrack.clientWidth / ctrack.scrollWidth * 100) + "%";
      thumb.style.left = (max > 0 ? x / ctrack.scrollWidth * 100 : 0) + "%";
      cprev.disabled = x <= 4; cnext.disabled = x >= max - 4;
    };
    cnext.addEventListener("click", function () { ctrack.scrollBy({ left: stepW(), behavior: calmCar ? "auto" : "smooth" }); });
    cprev.addEventListener("click", function () { ctrack.scrollBy({ left: -stepW(), behavior: calmCar ? "auto" : "smooth" }); });
    ctrack.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    ctrack.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); cnext.click(); } else if (e.key === "ArrowLeft") { e.preventDefault(); cprev.click(); }
    });
    // przeciąganie myszą (dotyk przewija natywnie)
    var down = false, moved = false, sx0 = 0, sl0 = 0;
    ctrack.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true; moved = false; sx0 = e.clientX; sl0 = ctrack.scrollLeft;
    });
    window.addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - sx0;
      if (!moved && Math.abs(dx) > 6) { moved = true; ctrack.classList.add("dragging"); }
      if (moved) ctrack.scrollLeft = sl0 - dx;
    });
    window.addEventListener("pointerup", function () {
      if (!down) return;
      down = false;
      if (moved) {
        ctrack.classList.remove("dragging");
        var w = stepW(), i = Math.round(ctrack.scrollLeft / w);
        ctrack.scrollTo({ left: i * w, behavior: calmCar ? "auto" : "smooth" });
        setTimeout(function () { moved = false; }, 0);
      }
    });
    ctrack.addEventListener("click", function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
    sync();
  }

  // ---- mini-kalkulator (strona główna) ----
  $$('.mini').forEach(function (m) {
    var min = +m.dataset.min, max = +m.dataset.max, input = $('input', m), out = $('.mini-sum', m);
    var usedMini = false;
    input.addEventListener('input', function () {
      if (!usedMini) { usedMini = true; track('Mini calculator'); }
      var q = parseFloat(input.value);
      var kr = out.dataset.kr;
      if (!(q > 0)) { out.textContent = '0 ' + kr; return; }
      out.textContent = (min === max ? fmt(min * q) : fmt(min * q) + ' – ' + fmt(max * q)) + ' ' + kr;
    });
  });

  // ---- kalkulator (strona cennika) ----
  var PV = window.PV;
  if (PV && $('#calc-fields')) {
    var qty = {}, ui = PV.ui, usedCalc = false;
    var unitLbl = function (u) { return u === 'm2' ? ui.m2 : u === 'mb' ? ui.mb : ui.el; };
    var perLbl = function (u) { return u === 'm2' ? ui.perM2 : u === 'mb' ? ui.perMb : ui.perEl; };
    var priceTxt = function (p) {
      if (p.max === null) return ui.from + ' ' + fmt(p.min) + ' ' + perLbl(p.unit);
      if (p.min === p.max) return fmt(p.min) + ' ' + perLbl(p.unit);
      return fmt(p.min) + '–' + fmt(p.max) + ' ' + perLbl(p.unit);
    };
    var html = '';
    PV.groups.forEach(function (g) {
      html += '<fieldset class="calc-group"><legend>' + PV.groupNames[g] + '</legend>';
      PV.prices.filter(function (p) { return p.calc === g; }).forEach(function (p) {
        html += '<div class="calc-row" data-id="' + p.id + '"><div class="cr-info"><span class="cr-name">' + PV.names[p.id] + '</span>' +
          (PV.scopes[p.id] ? '<span class="cr-sub">' + PV.scopes[p.id] + '</span>' : '') +
          (PV.notes[p.id] ? '<span class="cr-sub note">' + PV.notes[p.id] + '</span>' : '') +
          '<span class="cr-price">' + priceTxt(p) + '</span>' +
          '<span class="cr-hint">' + ui.enter + ' ' + PV.hints[p.id] + '</span></div>' +
          '<label class="cr-qty"><span class="sr-only">' + ui.qty + '</span><input type="number" inputmode="decimal" min="0" step="any" placeholder="0" data-id="' + p.id +
          '" aria-label="' + (PV.names[p.id] + ': ' + ui.enter + ' ' + PV.hints[p.id]).replace(/"/g, '') + '"><em>' + unitLbl(p.unit) + '</em></label></div>';
      });
      html += '</fieldset>';
    });
    if (!$('#calc-fields').hasAttribute('data-static')) $('#calc-fields').innerHTML = html;

    var layerSel = {};
    var eff = function (p) {
      if (!p.layers) return p;
      var add = ((layerSel[p.id] || 1) - 1) * p.layers.extra;
      return { id: p.id, unit: p.unit, min: p.min + add, max: p.max === null ? null : p.max + add };
    };
    var selected = function () {
      return PV.prices.map(function (p) { return { p: eff(p), q: parseFloat(qty[p.id]), n: p.layers ? (layerSel[p.id] || 1) : 0 }; }).filter(function (s) { return s.q > 0; });
    };
    var totals = function (sel) {
      var min = 0, max = 0, open = false;
      sel.forEach(function (s) { min += s.p.min * s.q; if (s.p.max === null) { open = true; max += s.p.min * s.q; } else max += s.p.max * s.q; });
      return { min: min, max: max, open: open };
    };
    var totalText = function (t) {
      if (t.open) return ui.openFrom + ' ' + fmt(t.min) + ' ' + ui.kr;
      return Math.round(t.min) === Math.round(t.max) ? fmt(t.min) + ' ' + ui.kr : fmt(t.min) + ' – ' + fmt(t.max) + ' ' + ui.kr;
    };
    var rowText = function (pp, q) {
      if (pp.max === null) return ui.from + ' ' + fmt(pp.min * q);
      return pp.min === pp.max ? fmt(pp.min * q) + ' ' + ui.kr : fmt(pp.min * q) + '–' + fmt(pp.max * q) + ' ' + ui.kr;
    };
    var render = function () {
      PV.prices.forEach(function (pp) {
        var el = $('.sheet-row[data-id="' + pp.id + '"] .row-sum');
        if (!el) return;
        var q = parseFloat(qty[pp.id]), ep = eff(pp);
        if (pp.layers) { var rs = $('.sheet-row[data-id="' + pp.id + '"] .sr-rate strong'); if (rs) rs.textContent = fmt(ep.min); }
        el.textContent = q > 0 ? rowText(ep, q) : el.dataset.empty;
        el.classList.toggle('has', q > 0);
      });
      var sel = selected(), box = $('#calc-result'), send = $('#calc-send');
      if (!sel.length) { box.innerHTML = '<p class="calc-empty">' + ui.empty + '</p>'; send.disabled = true; return; }
      var t = totals(sel);
      box.innerHTML = '<span class="calc-label">' + ui.total + '</span><div class="calc-sum">' + totalText(t) + '</div><span class="tag-vat">' + ui.vat +
        '</span><ul class="calc-lines">' + sel.map(function (s) { return '<li>' + PV.names[s.p.id] + ' · ' + fmt(s.q) + ' ' + unitLbl(s.p.unit) + (s.n ? ' · ' + ui.layersShort + ': ' + s.n : '') + '</li>'; }).join('') + '</ul>';
      send.disabled = false;
    };
    $('#calc-fields').addEventListener('input', function (e) {
      var id = e.target.getAttribute('data-id'); if (!id) return;
      if (!usedCalc) { usedCalc = true; track('Calculator used'); }
      qty[id] = e.target.value;
      var rowEl = e.target.closest('.calc-row'); if (rowEl) rowEl.classList.toggle('on', parseFloat(e.target.value) > 0);
      render();
    });
    $('#calc-fields').addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.layer-btn') : null; if (!b) return;
      var row = b.closest('.calc-row'), id = row.getAttribute('data-id');
      layerSel[id] = +b.getAttribute('data-n');
      $$('.layer-btn', row).forEach(function (x) { var on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      render();
    });
    $('#calc-reset').addEventListener('click', function () {
      layerSel = {}; $$('.layer-btn').forEach(function (x) { var on = x.getAttribute('data-n') === '1'; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      qty = {}; $$('#calc-fields input').forEach(function (i) { i.value = ''; }); $$('.calc-row').forEach(function (r) { r.classList.remove('on'); }); render();
    });
    $('#calc-send').addEventListener('click', function () {
      var sel = selected(), t = totals(sel);
      var txt = sel.map(function (s) { return '- ' + PV.names[s.p.id] + ': ' + fmt(s.q) + ' ' + unitLbl(s.p.unit) + (s.n ? ' (' + ui.layersShort + ': ' + s.n + ')' : ''); }).join('\n') +
        '\n\n' + ui.total + ': ' + totalText(t) + ' ' + ui.vat;
      track('Calculator to contact');
      try { sessionStorage.setItem('pv-calc', txt); } catch (e) {}
      location.href = PV.contactUrl;
    });
    render();
  }

  // ---- formularz kontaktowy (mailto) ----
  var form = $('#contact-form');
  if (form) {
    var msg = $('#f-msg'), saved = null;
    try { saved = sessionStorage.getItem('pv-calc'); } catch (e) {}
    if (saved) {
      msg.value = saved + '\n\n';
      var info = $('#f-info'); info.hidden = false; info.textContent = form.dataset.fromCalc;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      track('Quote request');
      var body = form.dataset.lblName + ': ' + $('#f-name').value + '\n' + form.dataset.lblPhone + ': ' + $('#f-phone').value + '\n' +
        form.dataset.lblEmail + ': ' + $('#f-email').value + '\n\n' + msg.value;
      var to = $('a[href^="mailto:"]').getAttribute('href').replace('mailto:', '');
      location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(form.dataset.subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();
