(function () {
  var fmt = function (n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

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

  // ---- pojawianie się sekcji ----
  var rev = $$('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-reveal');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    rev.forEach(function (el) { io.observe(el); });
  }

  // ---- przycisk Zadzwoń (mobile): po przewinięciu ----
  var fab = $(".fab");
  if (fab) { var onScroll = function () { fab.classList.toggle("show", window.scrollY > 420); }; window.addEventListener("scroll", onScroll, { passive: true }); onScroll(); }

  // ---- hero: slider usług ----
  var hero = $(".fs-hero");
  if (hero) {
    var slides = $$(".sl-slide", hero), tabs = $$(".sl-tab", hero), cur = 0, timer = null;
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
      slides.forEach(function (s, k) { s.classList.toggle("on", k === cur); s.setAttribute("aria-hidden", k === cur ? "false" : "true"); });
      tabs.forEach(function (t, k) { t.classList.toggle("on", k === cur); t.setAttribute("aria-selected", k === cur ? "true" : "false"); });
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
    if (!calm) restart();
  }

  // ---- before / after ----
  $$('.ba').forEach(function (ba) {
    var input = $('input', ba);
    var set = function () { ba.style.setProperty('--pos', input.value + '%'); };
    input.addEventListener('input', set); set();
  });

  // ---- mini-kalkulator (strona główna) ----
  $$('.mini').forEach(function (m) {
    var min = +m.dataset.min, max = +m.dataset.max, input = $('input', m), out = $('.mini-sum', m);
    input.addEventListener('input', function () {
      var q = parseFloat(input.value);
      var kr = out.dataset.kr;
      if (!(q > 0)) { out.textContent = '0 ' + kr; return; }
      out.textContent = (min === max ? fmt(min * q) : fmt(min * q) + ' – ' + fmt(max * q)) + ' ' + kr;
    });
  });

  // ---- kalkulator (strona cennika) ----
  var PV = window.PV;
  if (PV && $('#calc-fields')) {
    var qty = {}, ui = PV.ui;
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
        html += '<div class="calc-row" data-id="' + p.id + '"><div class="cr-info"><span class="cr-name">' + PV.names[p.id] +
          '</span><span class="cr-price">' + priceTxt(p) + '</span></div>' +
          '<label class="cr-qty"><span class="sr-only">' + ui.qty + '</span><input type="number" inputmode="decimal" min="0" step="any" placeholder="0" data-id="' + p.id +
          '" aria-label="' + PV.names[p.id].replace(/"/g, '') + '"><em>' + unitLbl(p.unit) + '</em></label></div>';
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
      var body = form.dataset.lblName + ': ' + $('#f-name').value + '\n' + form.dataset.lblPhone + ': ' + $('#f-phone').value + '\n' +
        form.dataset.lblEmail + ': ' + $('#f-email').value + '\n\n' + msg.value;
      var to = $('a[href^="mailto:"]').getAttribute('href').replace('mailto:', '');
      location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(form.dataset.subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();
