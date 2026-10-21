/* INDIVIDUAL — site behaviour. Vanilla, no dependencies. */
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const body = document.body;
  const page = body.dataset.page;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  const V = window.VEHICLES || [];
  const C = window.CONTACT;
  const eur = (n) => n.toLocaleString("hr-HR") + " €";
  const byId = (id) => V.find((v) => v.id === id);
  const title = (v) => `${v.make} ${v.model}`;
  const img = (v, i) => `images/v/${v.id}/${i}.jpg`;
  const statusLabel = (v) => (v.status === "stock" ? "Na lageru" : v.statusNote || "U dolasku");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ---------- vehicle card ---------- */
  function card(v, idx, lazy = true) {
    const price = v.price ? eur(v.price) : "Cijena na upit";
    const second = v.n > 1 ? `<img src="${img(v, 2)}" alt="" loading="lazy" decoding="async" width="800" height="600">` : "";
    return `<a class="card" href="vozilo.html?v=${v.id}" data-id="${v.id}" data-cursor="Otvori" aria-label="${esc(title(v))}">
      <div class="card__media">
        <span class="chip ${v.status === "soon" ? "is-soon" : ""}"><i></i>${esc(statusLabel(v))}</span>
        <span class="card__idx">${String(idx + 1).padStart(2, "0")}</span>
        <img src="${img(v, 1)}" alt="${esc(title(v))}" ${lazy ? 'loading="lazy"' : ""} decoding="async" width="800" height="600">${second}
      </div>
      <div class="card__body">
        <h3 class="card__title"><small>${esc(v.make)}${v.year !== "—" ? " · " + esc(v.year) : ""}</small>${esc(v.model)}</h3>
        <span class="card__price ${v.price ? "" : "is-ask"}">${price}</span>
        <div class="card__specs"><span>${esc(v.km)} km</span><span>${esc(v.fuel)}</span><span>${esc(v.power)}</span></div>
      </div>
    </a>`;
  }
  window.__card = card;

  /* ---------- loader ---------- */
  const loader = $(".loader");
  const seen = sessionStorage.getItem("ind-seen") === "1";
  function startPage() {
    body.classList.add("is-ready");
    $$("[data-hero-in]").forEach((el) => el.classList.add("is-in"));
    window.dispatchEvent(new Event("page:ready"));
  }
  if (loader && (location.search + location.hash).includes("nol")) {
    loader.remove();
    startPage();
  } else if (loader) {
    if (seen || reduce) loader.classList.add("is-quick");
    const num = $(".loader__num", loader);
    const dur = seen || reduce ? 700 : 2100;
    const t0 = performance.now();
    root.classList.add("is-locked");
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    let loaded = false;
    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 2500))]).then(() => (loaded = true));
    (function tick(now) {
      const p = clamp((now - t0) / dur, 0, 1);
      const e = 1 - Math.pow(1 - p, 3);
      const shown = loaded ? e : Math.min(e, 0.9);
      loader.style.setProperty("--p", shown);
      if (num) num.textContent = String(Math.round(shown * 100)).padStart(2, "0");
      if (p < 1 || !loaded) return requestAnimationFrame(tick);
      if (num) num.textContent = "100";
      setTimeout(() => {
        loader.classList.add("is-done");
        sessionStorage.setItem("ind-seen", "1");
        setTimeout(startPage, 450);
        setTimeout(() => { loader.classList.add("is-gone"); root.classList.remove("is-locked"); }, 1150);
      }, 250);
    })(t0);
  } else {
    startPage();
  }

  /* ---------- scroll reveals ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("is-in");
      io.unobserve(en.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  function observe(scope = document) {
    $$("[data-lines]", scope).forEach((el) => {
      $$(".ln", el).forEach((l, i) => l.style.setProperty("--i", i));
      if (!el.hasAttribute("data-hero-in")) io.observe(el);
    });
    $$("[data-reveal]", scope).forEach((el) => io.observe(el));
  }
  observe();
  window.__observe = observe;

  /* ---------- header, menu ---------- */
  const hdr = $(".hdr");
  let lastY = scrollY;
  addEventListener("scroll", () => {
    const y = scrollY;
    if (hdr && !body.classList.contains("menu-open")) hdr.classList.toggle("is-hidden", y > lastY && y > 300);
    lastY = y;
  }, { passive: true });
  const burger = $(".burger");
  if (burger) {
    burger.addEventListener("click", () => {
      const open = body.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", open);
      root.classList.toggle("is-locked", open);
    });
    $$(".menu a").forEach((a) => a.addEventListener("click", () => { body.classList.remove("menu-open"); root.classList.remove("is-locked"); }));
    addEventListener("keydown", (e) => { if (e.key === "Escape" && body.classList.contains("menu-open")) burger.click(); });
  }

  /* ---------- cursor ---------- */
  const cur = $(".cursor");
  if (cur && fine && !reduce) {
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
    addEventListener("pointermove", (e) => { x = e.clientX; y = e.clientY; cur.classList.add("is-on"); }, { passive: true });
    document.addEventListener("pointerleave", () => cur.classList.remove("is-on"));
    (function loop() {
      cx = lerp(cx, x, 0.22); cy = lerp(cy, y, 0.22);
      cur.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener("pointerover", (e) => {
      const t = e.target.closest("[data-cursor], a, button, input, select, textarea, label");
      cur.classList.remove("is-big", "is-link");
      if (!t) return cur.textContent = "";
      if (t.dataset.cursor) { cur.classList.add("is-big"); cur.textContent = t.dataset.cursor; }
      else { cur.classList.add("is-link"); cur.textContent = ""; }
    });
  }

  /* ---------- magnetic buttons ---------- */
  if (fine && !reduce) {
    $$(".btn, .hdr__cta").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      });
      b.addEventListener("pointerleave", () => { b.style.transition = "transform .6s cubic-bezier(.22,1,.36,1), color .5s, background .5s"; b.style.transform = ""; setTimeout(() => (b.style.transition = ""), 600); });
    });
  }

  /* ---------- counters ---------- */
  $$("[data-count]").forEach((el) => {
    const to = +el.dataset.count;
    const o = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      o.disconnect();
      const t0 = performance.now();
      (function s(now) {
        const p = clamp((now - t0) / 1800, 0, 1);
        el.firstChild.textContent = Math.round(to * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(s);
      })(t0);
    }, { threshold: 0.6 });
    o.observe(el);
  });

  /* ---------- marquee ---------- */
  $$(".marquee__track").forEach((t) => { t.innerHTML += t.innerHTML; });

  /* ---------- contact form → WhatsApp ---------- */
  const form = $("#upit");
  if (form) {
    const sel = $("select", form);
    if (sel) {
      sel.innerHTML = '<option value="">Opći upit / ciljana narudžba</option>' + V.map((v) => `<option value="${v.id}">${esc(title(v))} · ${esc(v.year)}</option>`).join("");
      const pre = new URLSearchParams(location.search).get("v");
      if (pre && byId(pre)) sel.value = pre;
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(form);
      const v = byId(f.get("vozilo"));
      const msg = `Pozdrav, ja sam ${f.get("ime")}${v ? `, zanima me ${title(v)} (${v.year}, ${v.km} km)` : ", zanima me ponuda vozila"}.\n${f.get("poruka") || ""}\nKontakt: ${f.get("tel")}`;
      window.open(`https://wa.me/${C.wa}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    });
  }

  /* ======================================================================
     HOME
     ====================================================================== */
  if (page === "home") {
    /* hero stage & interactive dock */
    const stage = $(".hero__stage");
    const dock = $(".hero__dock");
    const featured = ["bmw-2-active-tourer", "vw-tiguan", "mercedes-b200d", "vw-t-roc"].map(byId).filter(Boolean);

    stage.innerHTML = featured.map((v, i) => `<div class="hero__slide ${i === 0 ? "is-active" : ""}"><img src="${img(v, 1)}" alt="${esc(title(v))}" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} width="900" height="720"></div>`).join("") +
      '<div class="hero__hud-top"><span class="hero__hud-badge"><i></i> Istaknuto na lageru</span><span class="hero__price-badge"></span></div>' +
      '<div class="hero__prog"><i></i></div>' +
      '<div class="hero__cap"><div class="hero__cap-main"><strong></strong><div class="hero__specs-ribbon"></div></div><div class="hero__count"></div></div>';

    if (dock) {
      const shortTitle = (v) => {
        const brand = v.make === "Mercedes-Benz" ? "Mercedes" : v.make === "Volkswagen" ? "VW" : v.make;
        return `${brand} ${v.model.replace(" 2.0 TDI R-Line", " R-Line").replace(" 1.5 TSI", "").replace(" Sport", "")}`;
      };

      dock.innerHTML = featured.map((v, i) => `
        <button class="hero__tab ${i === 0 ? "is-active" : ""}" role="tab" aria-selected="${i === 0}" data-index="${i}" aria-label="${esc(title(v))}">
          <div class="hero__tab-thumb"><img src="${img(v, 1)}" alt="" loading="lazy"></div>
          <div class="hero__tab-meta">
            <span class="hero__tab-name">${esc(shortTitle(v))}</span>
            <span class="hero__tab-price">${v.price ? eur(v.price) : "Na upit"}</span>
          </div>
        </button>
      `).join("");
    }

    const slides = $$(".hero__slide", stage);
    const prog = $(".hero__prog i", stage);
    const priceEl = $(".hero__price-badge", stage);
    const tabs = dock ? $$(".hero__tab", dock) : [];
    const cap = {
      t: $("strong", stage),
      specs: $(".hero__specs-ribbon", stage),
      c: $(".hero__count", stage)
    };

    let cur = 0, t0 = performance.now(), isPaused = false;
    const DUR = 5400;

    function show(i) {
      const prev = slides[cur];
      slides.forEach((s) => s.classList.remove("is-prev"));
      if (prev) { prev.classList.remove("is-active"); prev.classList.add("is-prev"); }
      cur = (i + slides.length) % slides.length;
      slides[cur].classList.add("is-active");

      const v = featured[cur];
      cap.t.textContent = title(v);
      priceEl.textContent = v.price ? eur(v.price) : "Cijena na upit";
      const yr = v.year && v.year !== "—" ? `<span>${esc(v.year)}</span>` : "";
      const km = v.km ? `<span>${esc(v.km)} km</span>` : "";
      const pwr = v.power ? `<span>${esc(v.power)}</span>` : "";
      const gbox = v.gearbox ? `<span>${esc(v.gearbox.split(",")[0].split("(")[0].trim())}</span>` : "";
      const fuel = v.fuel ? `<span>${esc(v.fuel)}</span>` : "";
      cap.specs.innerHTML = [yr, km, pwr, gbox, fuel].filter(Boolean).join("");
      cap.c.textContent = `${String(cur + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;

      tabs.forEach((tab, idx) => {
        const active = idx === cur;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", active);
      });

      t0 = performance.now();
      stage.dataset.id = v.id;
    }

    show(0);

    tabs.forEach((tab, idx) => {
      tab.addEventListener("click", (e) => {
        e.stopPropagation();
        show(idx);
      });
      tab.addEventListener("mouseenter", () => {
        isPaused = true;
        show(idx);
      });
      tab.addEventListener("mouseleave", () => {
        isPaused = false;
        t0 = performance.now();
      });
    });

    stage.addEventListener("mouseenter", () => { isPaused = true; });
    stage.addEventListener("mouseleave", () => { isPaused = false; t0 = performance.now(); });

    (function loop(now) {
      if (!isPaused) {
        const p = clamp((now - t0) / DUR, 0, 1);
        prog.style.transform = `scaleX(${p})`;
        if (p >= 1 && !reduce) show(cur + 1);
      } else {
        prog.style.transform = "scaleX(1)";
      }
      requestAnimationFrame(loop);
    })(performance.now());

    stage.dataset.cursor = "Otvori";
    stage.addEventListener("click", () => (location.href = `vozilo.html?v=${stage.dataset.id}`));

    /* manifesto word by word */
    const man = $("#manifesto");
    const raw = man.dataset.text;
    man.innerHTML = raw.split(" ").map((w) => (w.startsWith("*") ? `<span class="w hl">${w.replace(/\*/g, "")}</span>` : `<span class="w">${w}</span>`)).join(" ");
    const words = $$(".w", man);
    const mm = () => {
      const r = man.getBoundingClientRect();
      const p = clamp((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.25), 0, 1);
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle("on", i < n));
    };
    addEventListener("scroll", mm, { passive: true }); mm();

    /* horizontal showcase */
    const track = $(".hz__track");
    const list = V.filter((v) => v.status === "stock").slice(0, 9);
    track.innerHTML = list.map((v, i) => card(v, i)).join("");
    const hz = $(".hz"), bar = $(".hz__progress i");
    const desktop = matchMedia("(min-width: 861px) and (hover: hover)");
    let dist = 0;
    function size() {
      if (!desktop.matches) { hz.style.height = ""; track.style.transform = ""; return; }
      dist = Math.max(0, track.scrollWidth - innerWidth + 0);
      hz.style.height = `${dist + innerHeight}px`;
    }
    function hzScroll() {
      if (!desktop.matches) return;
      const p = clamp(-hz.getBoundingClientRect().top / (hz.offsetHeight - innerHeight), 0, 1);
      track.style.transform = `translate3d(${-p * dist}px,0,0)`;
      bar.style.transform = `scaleX(${p})`;
    }
    addEventListener("resize", () => { size(); hzScroll(); });
    addEventListener("scroll", hzScroll, { passive: true });
    $$("img", track).forEach((i) => i.addEventListener("load", () => { size(); hzScroll(); }, { once: true }));
    size(); hzScroll();
    $("#hz-count").textContent = String(list.length).padStart(2, "0");
  }

  /* ======================================================================
     PONUDA
     ====================================================================== */
  if (page === "shop") {
    const grid = $(".grid");
    const state = { type: "sve", q: "", sort: "novo", avail: "sve" };
    const qs = new URLSearchParams(location.search);
    if (window.TYPES[qs.get("t")]) state.type = qs.get("t");
    grid.innerHTML = V.map((v, i) => card(v, i)).join("") + '<p class="empty" hidden>Nema rezultata. Nazovite nas — nabavit ćemo ga.</p>';
    const cards = $$(".card", grid);
    const empty = $(".empty", grid);
    const countEl = $("#count");
    const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let token = 0, shown = 0;

    const cnt = (n) => {
      const from = shown; shown = n;
      const t0 = performance.now();
      (function s(now) { const p = clamp((now - t0) / 600, 0, 1); countEl.textContent = String(Math.round(lerp(from, n, 1 - Math.pow(1 - p, 3)))).padStart(2, "0"); if (p < 1) requestAnimationFrame(s); })(t0);
    };

    function apply() {
      const my = ++token;
      const q = norm(state.q);
      let n = 0;
      let list = V.slice();
      if (state.sort === "cijena-asc") list.sort((a, b) => (a.price ?? 1e9) - (b.price ?? 1e9));
      if (state.sort === "cijena-desc") list.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
      if (state.sort === "novo") list = V.slice();
      list.forEach((v) => grid.insertBefore(cards[V.indexOf(v)], empty));
      list.forEach((v) => {
        const el = cards[V.indexOf(v)];
        const ok = (state.type === "sve" || v.type === state.type) &&
          (state.avail === "sve" || v.status === state.avail) &&
          (!q || norm(`${v.make} ${v.model} ${v.fuel} ${v.year}`).includes(q));
        if (ok) { n++; if (el.hidden) { el.hidden = false; requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove("is-out"))); } else el.classList.remove("is-out"); }
        else { el.classList.add("is-out"); setTimeout(() => { if (my === token) el.hidden = true; }, 420); }
      });
      cards.forEach((el, i) => { const num = $(".card__idx", el); });
      let k = 0; list.forEach((v) => { const el = cards[V.indexOf(v)]; const ok = !el.classList.contains("is-out"); if (ok) $(".card__idx", el).textContent = String(++k).padStart(2, "0"); });
      empty.hidden = n !== 0;
      cnt(n);
    }

    $$(".pill[data-type]").forEach((b) => {
      b.setAttribute("aria-pressed", b.dataset.type === state.type);
      b.addEventListener("click", () => {
        state.type = b.dataset.type;
        $$(".pill[data-type]").forEach((x) => x.setAttribute("aria-pressed", x === b));
        apply();
      });
    });
    $$(".pill[data-avail]").forEach((b) => b.addEventListener("click", () => {
      const on = b.getAttribute("aria-pressed") === "true";
      state.avail = on ? "sve" : b.dataset.avail;
      $$(".pill[data-avail]").forEach((x) => x.setAttribute("aria-pressed", !on && x === b));
      apply();
    }));
    $("#q").addEventListener("input", (e) => { state.q = e.target.value; apply(); });
    $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; apply(); });
    apply();
  }

  /* ======================================================================
     VOZILO
     ====================================================================== */
  if (page === "vehicle") {
    const id = new URLSearchParams(location.search).get("v");
    const v = byId(id) || V[0];
    document.title = `${title(v)} ${v.year} · INDIVIDUAL Split`;
    $('meta[name="description"]').setAttribute("content", `${title(v)}, ${v.year}, ${v.km} km, ${v.power}. ${v.tagline} INDIVIDUAL car company, Split.`);
    const price = v.price ? eur(v.price) : "Na upit";
    $("#v-crumb").textContent = title(v);
    $("#v-title").innerHTML = `<small>${esc(v.make)} · ${esc(statusLabel(v))}</small><span class="ln"><span>${esc(v.model)}</span></span>`;
    $("#v-price").innerHTML = `<b>${price}</b><span>${v.price ? (v.vat ? "u sustavu PDV-a" : "cijena vozila") : "nazovite za cijenu"}</span>`;
    $("#v-tag").textContent = v.tagline;

    const specs = [
      ["Marka", v.make], ["Model", v.model], ["Godina / u prometu", v.year], ["Kilometraža", `${v.km} km`],
      ["Snaga", v.power], ["Gorivo", v.fuel], ["Mjenjač", v.gearbox], ["PDV", v.vat ? "Odbitak PDV-a moguć" : "—"], ["Status", statusLabel(v)]
    ].filter((r) => r[1] && r[1] !== "—");
    $("#v-specs").innerHTML = specs.map(([k, val]) => `<div><dt>${k}</dt><dd>${esc(val)}</dd></div>`).join("");
    $("#v-equip").innerHTML = v.equip.length ? v.equip.map((e) => `<li>${esc(e)}</li>`).join("") : "";
    $("#v-equip-wrap").hidden = !v.equip.length;
    $("#v-notes").innerHTML = v.notes.map((e) => `<li>${esc(e)}</li>`).join("");
    $("#v-fb").href = C.fb;

    const msg = encodeURIComponent(`Pozdrav, zanima me ${title(v)} (${v.year}, ${v.km} km). Je li još dostupan?`);
    $("#v-wa").href = `https://wa.me/${C.wa}?text=${msg}`;
    $("#v-upit").href = `index.html?v=${v.id}#kontakt`;

    /* gallery */
    const main = $(".gal__main"), thumbs = $(".gal__thumbs"), ct = $(".gal__ct");
    const nums = Array.from({ length: v.n }, (_, i) => i + 1);
    main.insertAdjacentHTML("afterbegin", nums.map((n, i) => `<img src="${img(v, n)}" alt="${esc(title(v))} — fotografija ${n}" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} width="1600" height="1000">`).join(""));
    thumbs.innerHTML = nums.map((n) => `<button type="button" aria-label="Fotografija ${n}"><img src="${img(v, n)}" alt="" loading="lazy" width="200" height="150"></button>`).join("");
    const mimgs = $$("img", main), tb = $$("button", thumbs);
    let gi = 0;
    function go(i) {
      gi = (i + v.n) % v.n;
      mimgs.forEach((m, k) => m.classList.toggle("is-on", k === gi));
      tb.forEach((b, k) => b.setAttribute("aria-current", k === gi));
      ct.textContent = `${String(gi + 1).padStart(2, "0")} / ${String(v.n).padStart(2, "0")}`;
      lbImg.src = img(v, gi + 1); lbCt.textContent = ct.textContent;
    }
    const lb = $(".lb"), lbImg = $(".lb img"), lbCt = $(".lb__ct");
    tb.forEach((b, k) => b.addEventListener("click", () => go(k)));
    $("[data-prev]").addEventListener("click", (e) => { e.stopPropagation(); go(gi - 1); });
    $("[data-next]").addEventListener("click", (e) => { e.stopPropagation(); go(gi + 1); });
    main.addEventListener("click", () => { lb.classList.add("is-open"); root.classList.add("is-locked"); });
    const close = () => { lb.classList.remove("is-open"); root.classList.remove("is-locked"); };
    $(".lb__btn--x").addEventListener("click", close);
    $(".lb__btn--p").addEventListener("click", () => go(gi - 1));
    $(".lb__btn--n").addEventListener("click", () => go(gi + 1));
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") go(gi - 1);
      if (e.key === "ArrowRight") go(gi + 1);
      if (e.key === "Escape") close();
    });
    let sx = 0;
    main.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
    main.addEventListener("touchend", (e) => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) go(gi + (dx < 0 ? 1 : -1)); });
    go(0);

    /* related */
    const rel = V.filter((x) => x.id !== v.id).sort((a, b) => (b.type === v.type) - (a.type === v.type) || (b.make === v.make) - (a.make === v.make)).slice(0, 3);
    $("#related").innerHTML = rel.map((x, i) => card(x, V.indexOf(x))).join("");

    /* structured data */
    const ld = { "@context": "https://schema.org", "@type": "Car", name: title(v), brand: { "@type": "Brand", name: v.make }, model: v.model, vehicleModelDate: v.year, fuelType: v.fuel, mileageFromOdometer: { "@type": "QuantitativeValue", value: v.km, unitCode: "KMT" }, image: img(v, 1), description: v.tagline };
    if (v.price) ld.offers = { "@type": "Offer", price: v.price, priceCurrency: "EUR", availability: "https://schema.org/InStock", seller: { "@type": "AutoDealer", name: "INDIVIDUAL car company", address: "Split" } };
    const s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(ld); document.head.appendChild(s);
    window.__observe();
  }
})();
