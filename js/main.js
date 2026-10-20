(function () {
  // ===== Dane do uzupełnienia (kontakt) =====
  var CONFIG = {
    phone: "+354 769 6246",
    email: "adriannowicki3226@gmail.com", // TODO: docelowo e-mail na domenie firmy
    facebook: "https://www.facebook.com/" // TODO: link do profilu FB firmy
  };

  // ===== Cennik (kr, bez VAT) =====
  // unit: m2 | mb ; max: null = "od" (cena otwarta)
  var PRICES = [
    { group: "paint", items: [
      { id: "paint", unit: "m2", min: 3000, max: 3000 }
    ]},
    { group: "spackle", items: [
      { id: "spackle",  unit: "m2", min: 3500, max: 5000 },
      { id: "joints",   unit: "mb", min: 4000, max: 4000 },
      { id: "renovate", unit: "m2", min: 5000, max: null }
    ]},
    { group: "floor", items: [
      { id: "panelClick",  unit: "m2", min: 1800, max: 2300 },
      { id: "panelGlue",   unit: "m2", min: 4000, max: 4000 },
      { id: "leveling",    unit: "m2", min: 4000, max: 4000 },
      { id: "removeFloor", unit: "m2", min: 2000, max: 2000 }
    ]},
    { group: "tiles", items: [
      { id: "floorTile",  unit: "m2", min: 7500,  max: 7500 },
      { id: "wallTile",   unit: "m2", min: 9500,  max: 9500 },
      { id: "largeTile",  unit: "m2", min: 14000, max: 14000 },
      { id: "removeTile", unit: "m2", min: 6000,  max: 6000 },
      { id: "waterproof", unit: "m2", min: 2800,  max: 4000 }
    ]}
  ];

  var LANGS = ["is", "en", "pl"];
  var lang = "is";
  var qty = {}; // id -> ilość
  // Kropka jako separator tysięcy (is-IS nie grupuje liczb 4-cyfrowych)
  var fmt = { format: function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "."); } };

  function t(key) {
    return (I18N[lang] && I18N[lang][key]) || I18N.is[key] || key;
  }
  function money(n) { return fmt.format(n) + " kr"; }
  function priceLabel(it) {
    var u = " / " + t("unit." + it.unit);
    if (it.max === null) return t("prices.from") + " " + money(it.min) + u;
    if (it.min === it.max) return money(it.min) + u;
    return fmt.format(it.min) + " – " + fmt.format(it.max) + " kr" + u;
  }

  function renderPrices() {
    var html = "";
    PRICES.forEach(function (g) {
      html += '<div class="price-group"><h3>' + t("grp." + g.group) + "</h3><ul>";
      g.items.forEach(function (it) {
        html += '<li><span class="pl-name">' + t("it." + it.id) +
          '</span><span class="pl-price">' + priceLabel(it) + "</span></li>";
      });
      html += "</ul></div>";
    });
    document.getElementById("price-list").innerHTML = html;
  }

  function renderCalc() {
    var html = "";
    PRICES.forEach(function (g) {
      html += '<fieldset class="calc-group"><legend>' + t("grp." + g.group) + "</legend>";
      g.items.forEach(function (it) {
        var v = qty[it.id] || "";
        var on = v !== "" && Number(v) > 0;
        html += '<div class="calc-row' + (on ? " on" : "") + '" data-id="' + it.id + '">' +
          '<div class="cr-info"><span class="cr-name">' + t("it." + it.id) + "</span>" +
          '<span class="cr-price">' + priceLabel(it) + "</span></div>" +
          '<label class="cr-qty"><span class="sr-only">' + t("calc.qty") + "</span>" +
          '<input type="number" inputmode="decimal" min="0" step="any" placeholder="0" value="' + v +
          '" data-id="' + it.id + '" aria-label="' + t("it." + it.id) + " – " + t("calc.qty") + '">' +
          "<em>" + t("unit." + it.unit) + "</em></label></div>";
      });
      html += "</fieldset>";
    });
    document.getElementById("calc-fields").innerHTML = html;
    updateTotal();
  }

  function selected() {
    var out = [];
    PRICES.forEach(function (g) {
      g.items.forEach(function (it) {
        var q = parseFloat(qty[it.id]);
        if (q > 0) out.push({ it: it, q: q });
      });
    });
    return out;
  }

  function totals() {
    var min = 0, max = 0, open = false;
    selected().forEach(function (s) {
      min += s.it.min * s.q;
      if (s.it.max === null) { open = true; max += s.it.min * s.q; }
      else max += s.it.max * s.q;
    });
    return { min: min, max: max, open: open };
  }

  function updateTotal() {
    var sel = selected();
    var box = document.getElementById("calc-result");
    var send = document.getElementById("calc-send");
    if (!sel.length) {
      box.innerHTML = '<p class="calc-empty">' + t("calc.empty") + "</p>";
      send.disabled = true;
      return;
    }
    var tt = totals(), main;
    if (tt.open) main = t("calc.open") + " " + money(Math.round(tt.min));
    else if (Math.round(tt.min) === Math.round(tt.max)) main = money(Math.round(tt.min));
    else main = fmt.format(Math.round(tt.min)) + " – " + fmt.format(Math.round(tt.max)) + " kr";
    var lines = sel.map(function (s) {
      return "<li><span>" + t("it." + s.it.id) + " · " + fmt.format(s.q) + " " + t("unit." + s.it.unit) +
        "</span></li>";
    }).join("");
    box.innerHTML = '<span class="calc-label">' + t("calc.total") + "</span>" +
      '<div class="calc-sum">' + main + '</div><div class="calc-vat">' + t("calc.novat") + "</div>" +
      '<ul class="calc-lines">' + lines + "</ul>";
    send.disabled = false;
  }

  function summaryText() {
    var sel = selected();
    if (!sel.length) return "";
    var tt = totals();
    var lines = sel.map(function (s) {
      return "- " + t("it." + s.it.id) + ": " + fmt.format(s.q) + " " + t("unit." + s.it.unit);
    });
    var total = tt.open ? t("calc.open") + " " + money(Math.round(tt.min))
      : (Math.round(tt.min) === Math.round(tt.max) ? money(Math.round(tt.min))
        : fmt.format(Math.round(tt.min)) + " – " + fmt.format(Math.round(tt.max)) + " kr");
    return lines.join("\n") + "\n\n" + t("calc.total") + ": " + total + " " + t("calc.novat");
  }

  function applyStatic() {
    document.documentElement.lang = lang;
    document.title = t("meta.title");
    document.querySelector('meta[name="description"]').setAttribute("content", t("meta.desc"));
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function setLang(l) {
    if (LANGS.indexOf(l) < 0) l = "is";
    lang = l;
    try { localStorage.setItem("pv-lang", l); } catch (e) {}
    applyStatic();
    renderPrices();
    renderCalc();
  }

  function init() {
    var saved = null;
    try { saved = localStorage.getItem("pv-lang"); } catch (e) {}
    var q = new URLSearchParams(location.search).get("lang");
    lang = LANGS.indexOf(q) >= 0 ? q : (LANGS.indexOf(saved) >= 0 ? saved : "is");

    document.querySelectorAll("[data-phone]").forEach(function (a) {
      a.textContent = CONFIG.phone;
      a.href = "tel:" + CONFIG.phone.replace(/\s/g, "");
    });
    document.querySelectorAll("[data-email]").forEach(function (a) {
      a.textContent = CONFIG.email;
      a.href = "mailto:" + CONFIG.email;
    });
    document.querySelectorAll("[data-fb]").forEach(function (a) { a.href = CONFIG.facebook; });
    document.getElementById("year").textContent = new Date().getFullYear();

    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });

    document.getElementById("calc-fields").addEventListener("input", function (e) {
      var id = e.target.getAttribute("data-id");
      if (!id) return;
      qty[id] = e.target.value;
      var row = e.target.closest(".calc-row");
      row.classList.toggle("on", parseFloat(e.target.value) > 0);
      updateTotal();
    });

    document.getElementById("calc-send").addEventListener("click", function () {
      var ta = document.getElementById("f-msg");
      var s = summaryText();
      if (s) ta.value = s + (ta.value && ta.value.indexOf(s) < 0 ? "\n\n" + ta.value : "");
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
      setTimeout(function () { ta.focus({ preventScroll: true }); }, 500);
    });

    document.getElementById("contact-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var body = t("form.name") + ": " + document.getElementById("f-name").value + "\n" +
        t("form.phone") + ": " + document.getElementById("f-phone").value + "\n" +
        t("form.email") + ": " + document.getElementById("f-email").value + "\n\n" +
        document.getElementById("f-msg").value;
      location.href = "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent(t("mail.subject")) +
        "&body=" + encodeURIComponent(body);
    });

    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("nav");
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });

    setLang(lang);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
