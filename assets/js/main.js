/* Builds the shared header/footer and fills in content from site-data.js.
   You normally don't need to edit this file. */
(function () {
  var S = window.SITE || {};
  var page = document.body.getAttribute("data-page") || "";

  var NAV = [
    { href: "index.html", label: "Home", id: "home" },
    { href: "about.html", label: "About & Beliefs", id: "about" },
    { href: "ministries.html", label: "Ministries", id: "ministries" },
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
    return [a.street, a.city + ", " + a.province, a.postalCode].filter(Boolean).join(", ");
  }
  function mapsLink() {
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(fullAddress());
  }

  var ICONS = {
    facebook: '<path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8z"/>',
    youtube: '<path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15V9l5.7 3-5.7 3z"/>',
    instagram: '<path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM12 2.2c-2.7 0-3 0-4 .1-4 .2-5.6 1.8-5.7 5.7-.1 1-.1 1.3-.1 4s0 3 .1 4c.2 3.9 1.8 5.5 5.7 5.7 1 .1 1.3.1 4 .1s3 0 4-.1c3.9-.2 5.5-1.8 5.7-5.7.1-1 .1-1.3.1-4s0-3-.1-4c-.2-3.9-1.8-5.5-5.7-5.7-1-.1-1.3-.1-4-.1z"/>',
  };
  function socialLinks() {
    var out = "";
    Object.keys(ICONS).forEach(function (k) {
      var url = S.social && S.social[k];
      if (url) out += '<a href="' + esc(url) + '" aria-label="' + k + '" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">' + ICONS[k] + "</svg></a>";
    });
    return out;
  }

  // ---- Header -------------------------------------------------------------
  var header = document.getElementById("site-header");
  if (header) {
    header.innerHTML =
      '<div class="container nav-wrap">' +
        '<a class="brand" href="index.html"><img class="brand-mark" src="assets/images/apple-touch-icon.png" alt="" width="50" height="50">' +
        '<span class="brand-text"><strong>Citywide</strong><small>Praise &amp; Worship Baptist Church</small></span></a>' +
        '<button class="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu"><span></span><span></span><span></span></button>' +
        '<nav id="site-nav" class="site-nav"><ul>' +
          NAV.map(function (n) {
            return '<li><a href="' + n.href + '"' + (n.id === page ? ' aria-current="page"' : "") +
              (n.id === "give" ? ' class="nav-give"' : "") + ">" + n.label + "</a></li>";
          }).join("") +
        "</ul></nav>" +
      "</div>";
    var btn = header.querySelector(".nav-toggle");
    btn.addEventListener("click", function () {
      var open = header.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  // ---- Footer -------------------------------------------------------------
  var footer = document.getElementById("site-footer");
  if (footer) {
    var sunday = (S.services || []).filter(function (s) { return s.featured; })[0] || (S.services || [])[0];
    footer.innerHTML =
      '<div class="container footer-grid">' +
        '<div><p class="footer-name">' + esc(S.name) + "</p><p class=\"muted\">" + esc(S.tagline) + "</p>" +
          '<div class="social">' + socialLinks() + "</div></div>" +
        "<div><h4>Visit</h4><p>" + esc(fullAddress()) + '<br><a href="' + mapsLink() + '" target="_blank" rel="noopener">Get directions</a></p>' +
          (sunday ? "<p>" + esc(sunday.day) + "s · " + esc(sunday.time) + "</p>" : "") + "</div>" +
        "<div><h4>Contact</h4><p>" +
          (S.phone ? 'Phone: <a href="' + telHref(S.phone) + '">' + esc(S.phone) + "</a><br>" : "") +
          (S.cell ? 'Cell: <a href="' + telHref(S.cell) + '">' + esc(S.cell) + "</a><br>" : "") +
          (S.email ? '<a href="mailto:' + esc(S.email) + '">' + esc(S.email) + "</a>" : "") +
        "</p></div>" +
        "<div><h4>Explore</h4><ul class=\"footer-links\">" +
          NAV.map(function (n) { return '<li><a href="' + n.href + '">' + n.label + "</a></li>"; }).join("") +
        "</ul></div>" +
      "</div>" +
      '<div class="container footer-bottom"><p>© ' + new Date().getFullYear() + " " + esc(S.name) +
        (S.giving && S.giving.charityNumber ? " · Registered charity " + esc(S.giving.charityNumber) : "") + "</p></div>";
  }

  // ---- Simple text fill-ins: <span data-site="phone"></span> --------------
  var main = (S.services || []).filter(function (s) { return s.featured; })[0] || (S.services || [])[0] || {};
  document.querySelectorAll("[data-site]").forEach(function (el) {
    var key = el.getAttribute("data-site");
    var val = {
      sundayTime: main.time, sundayDay: main.day ? main.day + "s" : "",
      street: (S.address || {}).street, city: (S.address || {}).city,
      name: S.name, tagline: S.tagline, address: fullAddress(),
      phone: S.phone, cell: S.cell, email: S.email,
    }[key];
    if (!val) { var wrap = el.closest("[data-hide-empty]"); if (wrap) wrap.remove(); return; }
    if (key === "phone" || key === "cell") el.innerHTML = '<a href="' + telHref(val) + '">' + esc(val) + "</a>";
    else if (key === "email") el.innerHTML = '<a href="mailto:' + esc(val) + '">' + esc(val) + "</a>";
    else el.textContent = val;
  });
  document.querySelectorAll("[data-maps-link]").forEach(function (a) { a.href = mapsLink(); });
  document.querySelectorAll("[data-map]").forEach(function (f) {
    f.src = "https://maps.google.com/maps?q=" + encodeURIComponent(fullAddress()) + "&z=15&output=embed";
  });

  // ---- Services -----------------------------------------------------------
  document.querySelectorAll("[data-services]").forEach(function (el) {
    el.innerHTML = (S.services || []).map(function (s) {
      return '<article class="service-card' + (s.featured ? " featured" : "") + '">' +
        '<p class="service-day">' + esc(s.day) + "</p>" +
        '<p class="service-time">' + esc(s.time) + "</p>" +
        "<h3>" + esc(s.name) + "</h3>" +
        (s.description ? "<p>" + esc(s.description) + "</p>" : "") + "</article>";
    }).join("");
  });

  // ---- Events (past events hide themselves) -------------------------------
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function parse(d) { var p = String(d).split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  document.querySelectorAll("[data-events]").forEach(function (el) {
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var list = (S.events || []).filter(function (e) {
      return e.start && parse(e.end || e.start) >= today;
    }).sort(function (a, b) { return parse(a.start) - parse(b.start); });
    var limit = +el.getAttribute("data-limit") || list.length;
    if (!list.length) {
      el.innerHTML = '<p class="empty-note">No special events are posted right now — join us any Sunday, and check back soon.</p>';
      return;
    }
    el.innerHTML = list.slice(0, limit).map(function (e) {
      var s = parse(e.start), en = e.end ? parse(e.end) : null;
      var range = en && +en !== +s
        ? MONTHS[s.getMonth()] + " " + s.getDate() + " – " + (en.getMonth() !== s.getMonth() ? MONTHS[en.getMonth()] + " " : "") + en.getDate()
        : s.toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" });
      return '<article class="event-card"><div class="event-date"><span>' + MONTHS[s.getMonth()] + "</span><strong>" + s.getDate() + "</strong></div>" +
        "<div><h3>" + esc(e.title) + '</h3><p class="event-meta">' + esc(range) + (e.time ? " · " + esc(e.time) : "") + "</p>" +
        (e.description ? "<p>" + esc(e.description) + "</p>" : "") + "</div></article>";
    }).join("");
  });

  // ---- Leaders ------------------------------------------------------------
  document.querySelectorAll("[data-leaders]").forEach(function (el) {
    el.innerHTML = (S.leaders || []).map(function (l) {
      var initials = l.name.replace(/^(Rev\.|Pastor|Dr\.|Bishop|Elder|Deacon)\s+/i, "").split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join("");
      var bio = [].concat(l.bio || []).filter(Boolean);
      return '<article class="leader-card">' +
        (l.photo ? '<img class="leader-photo" src="assets/images/' + esc(l.photo) + '" alt="' + esc(l.name) + '">' : '<div class="leader-initials" aria-hidden="true">' + esc(initials) + "</div>") +
        "<div><h3>" + esc(l.name) + '</h3><p class="leader-role">' + esc(l.role) + "</p>" +
        (bio.length ? '<div class="leader-bio">' + bio.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>" : "") +
        "</div></article>";
    }).join("");
  });

  // ---- Giving -------------------------------------------------------------
  var G = S.giving || {};
  document.querySelectorAll("[data-give-online]").forEach(function (a) {
    if (G.canadaHelps) a.href = G.canadaHelps; else a.closest("[data-hide-empty]").remove();
  });
  document.querySelectorAll("[data-etransfer]").forEach(function (el) {
    if (G.etransferEmail) el.textContent = G.etransferEmail;
    else el.closest("[data-hide-empty]").remove();
  });
  document.querySelectorAll("[data-paypal]").forEach(function (el) {
    if (G.paypalEmail) el.textContent = G.paypalEmail;
    else el.closest("[data-hide-empty]").remove();
  });
})();
