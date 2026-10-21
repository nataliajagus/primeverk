(function () {
  var fmt = function (n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

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
    var unitLbl = function (u) { return u === 'm2' ? ui.m2 : ui.mb; };
    var perLbl = function (u) { return u === 'm2' ? ui.perM2 : ui.perMb; };
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
    $('#calc-fields').innerHTML = html;

    var selected = function () {
      return PV.prices.map(function (p) { return { p: p, q: parseFloat(qty[p.id]) }; }).filter(function (s) { return s.q > 0; });
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
    var render = function () {
      var sel = selected(), box = $('#calc-result'), send = $('#calc-send');
      if (!sel.length) { box.innerHTML = '<p class="calc-empty">' + ui.empty + '</p>'; send.disabled = true; return; }
      var t = totals(sel);
      box.innerHTML = '<span class="calc-label">' + ui.total + '</span><div class="calc-sum">' + totalText(t) + '</div><span class="tag-vat">' + ui.vat +
        '</span><ul class="calc-lines">' + sel.map(function (s) { return '<li>' + PV.names[s.p.id] + ' · ' + fmt(s.q) + ' ' + unitLbl(s.p.unit) + '</li>'; }).join('') + '</ul>';
      send.disabled = false;
    };
    $('#calc-fields').addEventListener('input', function (e) {
      var id = e.target.getAttribute('data-id'); if (!id) return;
      if (!usedCalc) { usedCalc = true; track('Calculator used'); }
      qty[id] = e.target.value;
      e.target.closest('.calc-row').classList.toggle('on', parseFloat(e.target.value) > 0);
      render();
    });
    $('#calc-reset').addEventListener('click', function () {
      qty = {}; $$('#calc-fields input').forEach(function (i) { i.value = ''; }); $$('.calc-row').forEach(function (r) { r.classList.remove('on'); }); render();
    });
    $('#calc-send').addEventListener('click', function () {
      var sel = selected(), t = totals(sel);
      var txt = sel.map(function (s) { return '- ' + PV.names[s.p.id] + ': ' + fmt(s.q) + ' ' + unitLbl(s.p.unit); }).join('\n') +
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
