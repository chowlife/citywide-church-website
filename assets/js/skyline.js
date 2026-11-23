/* Home page only: the city at dawn.
   Draws the sun rays and lit windows, plays the sunrise, then keeps a few windows
   switching on and off. Also moves the skyline layers at different speeds on scroll. */
(function () {
  var d = document, NS = "http://www.w3.org/2000/svg";
  var hero = d.querySelector(".hero");
  if (!hero) return;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var seed = 11; function rnd() { seed = seed * 16807 % 2147483647; return seed / 2147483647; }

  // Sun rays: slim wedges radiating from the sun at (720,110)
  var rays = d.getElementById("rays");
  for (var i = 0; i < 18; i++) {
    var a = i / 18 * Math.PI * 2, w = 0.045, L = 620;
    var pt = function (t) { return (720 + Math.cos(t) * L).toFixed(1) + "," + (110 + Math.sin(t) * L).toFixed(1); };
    var p = d.createElementNS(NS, "polygon");
    p.setAttribute("points", "720,110 " + pt(a - w) + " " + pt(a + w));
    rays.appendChild(p);
  }

  // Windows: a grid inside each building, a seeded subset lit, each with its own flicker delay
  var cfg = { back: [3, 4, 9, 12, 0.2, 7], mid: [5, 7, 12, 16, 0.42, 8], front: [6, 8, 14, 18, 0.5, 9] };
  var wins = [];
  d.querySelectorAll(".layer[data-l]").forEach(function (svg, li) {
    var c = cfg[svg.dataset.l], ww = c[0], wh = c[1], gx = c[2], gy = c[3], prob = c[4], pad = c[5];
    var frag = d.createDocumentFragment();
    svg.querySelectorAll(".b").forEach(function (b, bi) {
      b.style.setProperty("--d", (li * 420 + bi * 60) + "ms");
      var bb; try { bb = b.getBBox(); } catch (e) { return; }
      var top = bb.y + (+b.dataset.top || pad + 3);
      var cols = Math.floor((bb.width - 2 * pad + gx - ww) / gx); if (cols < 1) return;
      var x0 = bb.x + (bb.width - ((cols - 1) * gx + ww)) / 2;
      for (var y = top; y + wh <= bb.y + bb.height - 12; y += gy) for (var k = 0; k < cols; k++) {
        if (rnd() > prob) continue;
        var r = d.createElementNS(NS, "rect");
        r.setAttribute("x", (x0 + k * gx).toFixed(1)); r.setAttribute("y", y.toFixed(1));
        r.setAttribute("width", ww); r.setAttribute("height", wh); r.setAttribute("class", "w");
        r.style.setProperty("--wd", (2300 + li * 250 + rnd() * 2900 | 0) + "ms");
        frag.appendChild(r); wins.push(r);
      }
    });
    svg.querySelector(".wins").appendChild(frag);
  });

  var heroOn = true;
  if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { heroOn = es[0].isIntersecting; }).observe(hero);

  // Start the sunrise
  requestAnimationFrame(function () { requestAnimationFrame(function () {
    hero.classList.add("go");
    if (reduce) return;
    setTimeout(function () {
      hero.classList.add("settled");
      setInterval(function () {
        if (!heroOn || d.hidden || !wins.length) return;
        wins[(Math.random() * wins.length) | 0].classList.toggle("dark");
      }, 1100);
    }, 8000);
  }); });

  // Parallax: back layers move slower than front ones
  if (reduce) return;
  var layers = [].slice.call(d.querySelectorAll("[data-depth]")), fade = d.querySelector("[data-fade]"), ticking = false;
  addEventListener("scroll", function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var y = window.scrollY, h = hero.offsetHeight; if (y > h) return;
      layers.forEach(function (l) { l.style.transform = "translate3d(0," + (y * l.dataset.depth).toFixed(1) + "px,0)"; });
      if (fade) fade.style.opacity = Math.max(0, 1 - y / (h * 0.6)).toFixed(3);
    });
  }, { passive: true });
})();
