/* Builds the shared header/footer and fills every page from site-data.js.
   You normally don't need to edit this file — edit site-data.js instead. */
(function () {
  var S = window.SITE || {};
  var d = document;
  var page = d.body.getAttribute("data-page") || "";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  var NAV = [
    { href: "index.html", label: "Home", id: "home" },
    { href: "about.html", label: "About & Beliefs", id: "about" },
    { href: "ministries.html", label: "Ministries", id: "ministries" },
    { href: "baptism.html", label: "Baptism", id: "baptism" },
    { href: "visit.html", label: "Plan a Visit", id: "visit" },
    { href: "give.html", label: "Give", id: "give" },
  ];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function telHref(p) { return "tel:+1" + String(p).replace(/\D/g, ""); }
  function fullAddress() {
    var a = S.address || {};
    return [a.street, a.city + ", " + [a.province, a.postalCode].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  }
  function mapsLink() { return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(fullAddress()); }
  var services = S.services || [];
  var main = services.filter(function (s) { return s.featured; })[0] || services[0] || {};
  var A = S.address || {};

  // ---- Header ---------------------------------------------------------------
  var header = d.getElementById("site-header");
  if (header) {
    header.className = "site-head";
    header.innerHTML =
      '<div class="wrap head-in">' +
        '<a class="brand" href="index.html" aria-label="' + esc(S.name) + ' — home">' +
          '<span class="brand-mark"><img src="assets/images/apple-touch-icon.png" alt="" width="44" height="44"></span>' +
          "<span><b>Citywide</b><small>Praise &amp; Worship Baptist Church</small></span></a>" +
        '<nav class="nav" aria-label="Main">' +
          '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav-list"><span aria-hidden="true"></span>Menu</button>' +
          '<ul id="nav-list">' +
          NAV.map(function (n) {
            return '<li><a href="' + n.href + '"' + (n.id === page ? ' aria-current="page"' : "") +
              (n.id === "give" ? ' class="give"' : "") + ">" + esc(n.label) + "</a></li>";
          }).join("") +
          "</ul></nav></div>";
    var nav = header.querySelector(".nav"), btn = header.querySelector(".menu-btn");
    var setMenu = function (o) { nav.classList.toggle("open", o); btn.setAttribute("aria-expanded", o); };
    btn.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); btn.focus(); } });
    var onScroll = function () { header.classList.toggle("solid", window.scrollY > 40); };
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  // ---- Footer ---------------------------------------------------------------
  var ICONS = {
    facebook: '<path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8z"/>',
    youtube: '<path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15V9l5.7 3-5.7 3z"/>',
    instagram: '<path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM12 2.2c-2.7 0-3 0-4 .1-4 .2-5.6 1.8-5.7 5.7-.1 1-.1 1.3-.1 4s0 3 .1 4c.2 3.9 1.8 5.5 5.7 5.7 1 .1 1.3.1 4 .1s3 0 4-.1c3.9-.2 5.5-1.8 5.7-5.7.1-1 .1-1.3.1-4s0-3-.1-4c-.2-3.9-1.8-5.5-5.7-5.7-1-.1-1.3-.1-4-.1z"/>',
  };
  var social = Object.keys(ICONS).filter(function (k) { return S.social && S.social[k]; }).map(function (k) {
    return '<a href="' + esc(S.social[k]) + '" aria-label="' + k + '" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">' + ICONS[k] + "</svg></a>";
  }).join("");
  var footer = d.getElementById("site-footer");
  if (footer) {
    footer.className = "foot";
    footer.innerHTML =
      '<div class="wrap"><div class="foot-grid">' +
        '<div><a class="brand" href="index.html"><span class="brand-mark"><img src="assets/images/apple-touch-icon.png" alt="" width="44" height="44" loading="lazy"></span><span><b>Citywide</b><small>Praise &amp; Worship Baptist Church</small></span></a>' +
          '<p class="tag">' + esc(S.tagline) + "</p>" + (social ? '<div class="social">' + social + "</div>" : "") + "</div>" +
        "<div><h3>Visit</h3><address>" + esc(A.street) + "<br>" + esc(A.city + ", " + [A.province, A.postalCode].filter(Boolean).join(" ")) +
          (main.day ? "<br>" + esc(main.day) + "s " + esc(String(main.time || "").split(/\s*[–-]\s*/)[0]) : "") +
          '</address><p style="margin-top:10px"><a href="' + mapsLink() + '" target="_blank" rel="noopener">Get directions</a></p></div>' +
        "<div><h3>Contact</h3><ul>" +
          (S.phone ? '<li><a href="' + telHref(S.phone) + '">Phone ' + esc(S.phone) + "</a></li>" : "") +
          (S.cell ? '<li><a href="' + telHref(S.cell) + '">Cell ' + esc(S.cell) + "</a></li>" : "") +
          (S.email ? '<li><a href="mailto:' + esc(S.email) + '" style="overflow-wrap:anywhere">' + esc(S.email) + "</a></li>" : "") +
        "</ul></div>" +
        "<div><h3>Explore</h3><ul>" + NAV.map(function (n) { return '<li><a href="' + n.href + '">' + esc(n.label) + "</a></li>"; }).join("") + "</ul></div>" +
      "</div>" +
      '<div class="foot-bottom"><span>© ' + new Date().getFullYear() + " " + esc(S.name) + "</span>" +
        (S.giving && S.giving.charityNumber ? "<span>Registered charity " + esc(S.giving.charityNumber) + "</span>" : "") + "</div></div>";
  }

  // ---- Simple fill-ins: <span data-site="phone"></span> ---------------------
  d.querySelectorAll("[data-site]").forEach(function (el) {
    var key = el.getAttribute("data-site");
    var val = {
      sundayTime: main.time, sundayDay: main.day ? main.day + "s" : "", sundayName: main.day,
      street: A.street, city: A.city, cityLine: A.city + ", " + [A.province, A.postalCode].filter(Boolean).join(" "),
      name: S.name, tagline: S.tagline, address: fullAddress(),
      phone: S.phone, cell: S.cell, email: S.email,
    }[key];
    if (!val) { var wrap = el.closest("[data-hide-empty]"); if (wrap) wrap.remove(); return; }
    if (key === "phone" || key === "cell") el.innerHTML = '<a href="' + telHref(val) + '">' + esc(val) + "</a>";
    else if (key === "email") el.innerHTML = '<a href="mailto:' + esc(val) + '">' + esc(val) + "</a>";
    else el.textContent = val;
  });
  d.querySelectorAll("[data-maps-link]").forEach(function (a) { a.href = mapsLink(); });
  d.querySelectorAll("[data-map]").forEach(function (f) {
    f.src = "https://maps.google.com/maps?q=" + encodeURIComponent(fullAddress()) + "&z=15&output=embed";
  });

  // ---- Weekly services as lit church windows ---------------------------------
  // Each window shows the sky for its hour: night before 7 AM, dusk from 5 PM, daylight otherwise.
  var DAYS = { "every day": 0, everyday: 0, daily: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6, sunday: 7 };
  function dayKey(s) { return String(s.day || "").trim().toLowerCase(); }
  function dayShort(s) { var k = dayKey(s); return DAYS[k] === 0 ? "Daily" : DAYS[k] ? String(s.day).trim().slice(0, 3) : String(s.day); }
  var CITY = [
    '<path d="M0 40V22H14V14H26V24H38V8H50V26H62V18H76V28H88V12H100V24H112V18H120V40Z"/><rect x="42" y="12" width="3" height="4"/><rect x="92" y="16" width="3" height="4"/>',
    '<path d="M0 40V18H12V26H24V10H36V22H50V14H64V28H76V16H90V24H104V8H120V40Z"/><rect x="28" y="14" width="3" height="4"/><rect x="68" y="30" width="3" height="4"/><rect x="108" y="12" width="3" height="4"/>',
    '<path d="M0 40V24H16V14H28V26H40V18H54V6H58V2H60V6H64V18H78V26H92V12H106V22H120V40Z"/>',
  ];
  function hourOf(t) {
    var m = String(t || "").match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
    if (!m) return 12;
    var h = +m[1] % 12; if (/pm/i.test(m[3])) h += 12;
    return h + (+m[2] || 0) / 60;
  }
  function shortTime(t) {
    var m = String(t || "").match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
    return m ? m[1] + (m[2] && m[2] !== "00" ? ":" + m[2] : "") + " " + m[3].toUpperCase() : "";
  }
  d.querySelectorAll("[data-services]").forEach(function (el) {
    var list = services.slice().sort(function (a, b) {
      var da = DAYS[dayKey(a)], db = DAYS[dayKey(b)];
      return (da == null ? 8 : da) - (db == null ? 8 : db) || hourOf(a.time) - hourOf(b.time);
    });
    el.innerHTML = '<ol class="week">' + list.map(function (s, i) {
      var h = hourOf(s.time), sky = h < 7 ? "night" : h >= 17 ? "dusk" : "day";
      return '<li class="slot' + (s.featured ? " featured" : "") + '">' +
        '<p class="tick">' + esc(dayShort(s)) + " · " + esc(shortTime(s.time)) + "</p>" +
        '<div class="pane sky-' + sky + '" aria-hidden="true"><svg viewBox="0 0 120 40" preserveAspectRatio="none">' + CITY[i % CITY.length] + "</svg></div>" +
        '<p class="day">' + esc(s.day) + "</p><h3>" + esc(s.name) + "</h3><time>" + esc(s.time) + "</time>" +
        (s.description ? '<p class="desc">' + esc(s.description) + "</p>" : "") + "</li>";
    }).join("") + "</ol>";
  });

  // ---- Upcoming events (past events hide themselves) -------------------------
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function parse(x) { var p = String(x).split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  d.querySelectorAll("[data-events]").forEach(function (el) {
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var list = (S.events || []).filter(function (e) { return e.start && parse(e.end || e.start) >= today; })
      .sort(function (a, b) { return parse(a.start) - parse(b.start); });
    var limit = +el.getAttribute("data-limit") || list.length;
    if (!list.length) {
      var sec = el.closest("[data-hide-if-no-events]");
      if (sec) sec.remove();
      else el.innerHTML = '<p class="empty-note">No special events are posted right now. Join us any Sunday, and check back soon.</p>';
      return;
    }
    el.innerHTML = list.slice(0, limit).map(function (e) {
      var s = parse(e.start), en = e.end ? parse(e.end) : null;
      var range = en && +en !== +s
        ? MONTHS[s.getMonth()] + " " + s.getDate() + " – " + (en.getMonth() !== s.getMonth() ? MONTHS[en.getMonth()] + " " : "") + en.getDate()
        : s.toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" });
      return '<article class="event rv"><div class="event-date"><span>' + MONTHS[s.getMonth()] + "</span><strong>" + s.getDate() + "</strong></div>" +
        "<div><h3>" + esc(e.title) + '</h3><p class="event-meta">' + esc(range) + (e.time ? " · " + esc(e.time) : "") + "</p>" +
        (e.description ? "<p>" + esc(e.description) + "</p>" : "") + "</div></article>";
    }).join("");
  });

  // ---- Leadership -------------------------------------------------------------
  d.querySelectorAll("[data-leaders]").forEach(function (el) {
    var mode = el.getAttribute("data-leaders"); // "excerpt" (home) or "full" (about)
    var leaders = S.leaders || [];
    if (mode === "excerpt") leaders = leaders.slice(0, 1);
    el.innerHTML = leaders.map(function (l) {
      var bio = [].concat(l.bio || []).filter(Boolean);
      var initials = String(l.name).replace(/^(Rev\.|Pastor|Dr\.|Bishop|Elder|Deacon)\s+/i, "").split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join("");
      var face = l.photo
        ? '<div class="mono"><img src="assets/images/' + esc(l.photo) + '" alt="' + esc(l.name) + '"></div>'
        : '<div class="mono" role="img" aria-label="' + esc(l.name) + ' — photo coming soon">' + esc(initials) + "</div>";
      var text = mode === "excerpt"
        ? (bio[0] ? "<p>" + esc(bio[0]) + "</p>" : "") + (bio.length > 1 ? '<p class="vision">' + esc(bio[bio.length - 1]) + "</p>" : "") +
          '<a class="textlink" href="about.html#leadership">Read more<span class="sr"> about ' + esc(l.name) + "</span></a>"
        : '<div class="bio">' + bio.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>";
      return '<article class="leader-card rv' + (mode === "full" ? " full" : "") + '"><div class="mono-wrap">' + face + "</div><div>" +
        (mode === "excerpt" ? '<p class="eyebrow">Our leadership</p>' : "") +
        "<h3>" + esc(l.name) + '</h3><p class="role">' + esc(l.role) + "</p>" + text + "</div></article>";
    }).join("");
  });

  // ---- Ways to give -----------------------------------------------------------
  var G = S.giving || {};
  d.querySelectorAll("[data-ways]").forEach(function (el) {
    var large = el.getAttribute("data-ways") === "large";
    var items = [];
    if (G.canadaHelps) items.push({ t: "CanadaHelps", p: "Give securely online by card or PayPal. Your official tax receipt arrives by email.",
      b: large ? '<a class="btn btn-navy" href="' + esc(G.canadaHelps) + '" target="_blank" rel="noopener">Give online</a>' : "" });
    if (G.etransferEmail) items.push({ t: "Interac e-Transfer", p: "From your Canadian bank app, send to:", pay: G.etransferEmail,
      n: large ? "Autodeposit is on, so no security question is needed. Add your name and the purpose in the message." : "Autodeposit is on." });
    if (G.paypalEmail) items.push({ t: "PayPal", p: "Choose Send in PayPal and send to:", pay: G.paypalEmail,
      n: large ? "Choose Friends & Family where possible so the full gift reaches the church." : "" });
    items.push({ t: "In person", p: "Give during our Sunday worship service with cash or a cheque made out to " + (S.name || "the church") + ".",
      b: large ? '<a class="btn btn-line" href="visit.html">Service times</a>' : "" });
    el.innerHTML = items.map(function (w, i) {
      return '<li class="way rv" style="transition-delay:' + (i * 0.1) + 's"><h3>' + esc(w.t) + "</h3><p>" + esc(w.p) + "</p>" +
        (w.pay ? '<p class="pay">' + esc(w.pay).replace("@", "@<wbr>") + "</p>" : "") + (w.n ? "<p>" + esc(w.n) + "</p>" : "") + (w.b || "") + "</li>";
    }).join("");
  });

  // ---- Inner-page skyline -----------------------------------------------------
  var SKY = '<path d="M0 140V84H48V64H80V92H112V50H150V88H190V70H236V96H270V58H310V82H352V40H392V90H430V66H470V100H510V76H556V54H600V86H640V70H694V60H708V40H716V22H708V16H716V8H724V16H732V22H724V40H732V60H746V70H790V62H830V90H872V48H912V86H950V70H996V98H1030V56H1070V80H1112V42H1150V92H1190V68H1230V100H1270V74H1316V52H1360V88H1400V66H1440V140Z"/>' +
    [[56, 74], [120, 62], [126, 74], [282, 70], [360, 52], [366, 64], [520, 86], [570, 66], [880, 60], [886, 72], [1040, 68], [1120, 54], [1126, 66], [1290, 84], [1370, 64]]
      .map(function (p) { return '<rect class="lit" x="' + p[0] + '" y="' + p[1] + '" width="4" height="6"/>'; }).join("");
  d.querySelectorAll("[data-skyline]").forEach(function (el) {
    el.outerHTML = '<svg class="skyline" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true" focusable="false">' + SKY + "</svg>";
  });

  // ---- Scroll reveals -----------------------------------------------------------
  var targets = d.querySelectorAll(".rv, [data-io], .post, .map-card");
  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(function (t) { t.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    targets.forEach(function (t) { io.observe(t); });
  }
})();
