/* 269999.com — shared layout, forms, ads, media */
(function () {
  const S = window.SITE || {};
  const page = (location.pathname.split("/").pop() || "index.html").replace(".html", "") || "index";
  const $ = (q, el = document) => el.querySelector(q), $$ = (q, el = document) => [...el.querySelectorAll(q)];
  window.$ = $; window.$$ = $$;

  // ---------- Theme ----------
  try { const t = localStorage.getItem("theme"); if (t) document.documentElement.dataset.theme = t; } catch (e) {}

  // ---------- Referral capture (contests) ----------
  try { const r = new URLSearchParams(location.search).get("ref"); if (r) localStorage.setItem("ref", r.slice(0, 24)); } catch (e) {}

  // ---------- Layout ----------
  const NAV = [["index", "Home"], ["analyzer", "Analyzer"], ["meanings", "Meanings"], ["lucky-dates", "Lucky Dates"], ["zodiac", "Zodiac"], ["videos", "Videos"], ["contests", "Contests"], ["support", "Support"]];
  const bizbar = `<div class="bizbar" role="note">Contact, if you are interested in this website / domain name / Sponsorship / Advertisement / Partnership — <a href="${S.bizContactUrl}" target="_blank" rel="noopener">contact here →</a></div>`;
  const header = `<header class="site"><div class="wrap nav">
    <a class="logo" href="index.html" aria-label="269999.com home"><b>久</b><span>269999<small>EASY FORTUNE · LASTING FOREVER</small></span></a>
    <nav><ul class="menu" id="menu">${NAV.map(([h, t]) => `<li><a href="${h}.html" class="${page === h ? "active" : ""}">${t}</a></li>`).join("")}
      <li><a class="cta" href="consult.html">Get a Reading</a></li></ul></nav>
    <div style="display:flex;gap:8px"><button class="theme" id="themeBtn" aria-label="Toggle dark mode">◐</button><button class="burger" id="burger" aria-label="Menu">☰</button></div>
  </div></header>`;
  const year = new Date().getFullYear();
  const footer = `<footer class="site"><div class="wrap">
    <div class="cols">
      <div><a class="logo" href="index.html" style="color:#fff"><b>久</b><span>269999.com</span></a><p style="margin-top:12px">The friendly guide to Chinese lucky numbers, number meanings, lucky dates and zodiac — for curious minds, couples, founders and families worldwide.</p>
        <form data-form="Newsletter signup" class="nl" style="display:flex;gap:6px;margin-top:10px"><input class="hp" name="_honey" tabindex="-1" autocomplete="off"><input type="email" name="email" required placeholder="Email for weekly lucky dates" aria-label="Email"><button class="btn sm gold">Join</button></form></div>
      <div><h4>Free Tools</h4><ul><li><a href="analyzer.html#phone">Phone Number Analyzer</a></li><li><a href="analyzer.html#plate">License Plate Checker</a></li><li><a href="analyzer.html#address">House Number Checker</a></li><li><a href="analyzer.html#price">Lucky Price Finder</a></li><li><a href="lucky-dates.html">Lucky Date Finder</a></li><li><a href="zodiac.html">Zodiac & Compatibility</a></li></ul></div>
      <div><h4>Explore</h4><ul><li><a href="meanings.html">Number Meanings 0–9</a></li><li><a href="number.html?n=269999">What 269999 Means</a></li><li><a href="number.html?n=8888">8888 Meaning</a></li><li><a href="number.html?n=520">520 Meaning</a></li><li><a href="videos.html">Video Library</a></li><li><a href="contests.html">Monthly Contest</a></li></ul></div>
      <div><h4>Work With Us</h4><ul><li><a href="consult.html">Book a Consultation</a></li><li><a href="advertise.html">Advertise & Sponsor</a></li><li><a href="advertise.html#partner">Partnerships</a></li><li><a href="support.html">Donate / Support</a></li><li><a href="careers.html">Join the Team</a></li><li><a href="${S.bizContactUrl}" target="_blank" rel="noopener">Buy this domain</a></li></ul></div>
      <div><h4>Company</h4><ul><li><a href="about.html">About</a></li><li><a href="contact.html">Contact</a></li><li><a href="privacy.html">Privacy Policy</a></li><li><a href="terms.html">Terms of Use</a></li><li><a href="terms.html#trademark">Trademark & Copyright</a></li><li><a href="terms.html#disclaimer">Disclaimer</a></li></ul></div>
    </div>
    <div class="legal"><p><strong>Trademark & copyright disclosure:</strong> "269999" is used here only as a domain name and a descriptive numeral. 269999.com claims no trademark rights in the number 269999 and is not affiliated with, endorsed by, or sponsored by any company, product, stock code, postal code or organization that uses this number. All third-party names, logos and videos belong to their respective owners and are used for identification or embedded under the platforms' terms. Cultural readings are for entertainment and educational purposes only.</p>
    <p>© ${year} 269999.com. Original text, design and tools © 269999.com. All rights reserved. · <a href="terms.html#trademark">Full disclosure</a> · <a href="sitemap.xml">Sitemap</a></p></div>
  </div></footer>
  <div class="sticky-cta"><a class="btn gold sm" href="consult.html">🔮 Free Number Check</a><a class="btn sm" href="support.html">🧧 Support</a></div>`;
  document.body.insertAdjacentHTML("afterbegin", bizbar + header);
  document.body.insertAdjacentHTML("beforeend", footer);
  $("#burger").onclick = () => $("#menu").classList.toggle("open");
  $("#themeBtn").onclick = () => {
    const cur = document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const nxt = cur === "dark" ? "light" : "dark"; document.documentElement.dataset.theme = nxt; try { localStorage.setItem("theme", nxt); } catch (e) {}
  };

  // ---------- Toast ----------
  window.toast = (m, ms = 4200) => { const t = document.createElement("div"); t.className = "toast"; t.textContent = m; document.body.appendChild(t); setTimeout(() => t.remove(), ms); };

  // ---------- Forms (address assembled in memory only) ----------
  const endpoint = () => "https://formsubmit.co/ajax/" + (S.formAlias || atob(S._r.split("").reverse().join("")));
  window.sendForm = async function (subject, data) {
    const payload = Object.assign({ _subject: "[269999.com] " + subject, _template: "table", _captcha: "false", page: location.href }, data);
    try { const r = localStorage.getItem("ref"); if (r) payload.referral = r; } catch (e) {}
    const res = await fetch(endpoint(), { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
    if (!res.ok) throw new Error("send failed");
    return res.json();
  };
  document.addEventListener("submit", async (e) => {
    const f = e.target; if (!f.matches("form[data-form]")) return;
    e.preventDefault();
    if (f._honey && f._honey.value) return;
    const btn = f.querySelector("button[type=submit],button:not([type])"); const old = btn ? btn.innerHTML : "";
    if (btn) { btn.disabled = true; btn.innerHTML = "Sending…"; }
    const data = {}; new FormData(f).forEach((v, k) => { if (k !== "_honey") data[k] = data[k] ? data[k] + ", " + v : v; });
    if (f.dataset.extra) try { Object.assign(data, JSON.parse(f.dataset.extra)); } catch (x) {}
    try {
      await sendForm(f.dataset.form, data);
      const ok = f.dataset.success || "Thank you! We received your message and will reply within 24–48 hours.";
      f.innerHTML = `<div class="card fade" style="text-align:center"><div class="icon">🧧</div><h3>Received — thank you!</h3><p class="muted" style="margin:0">${ok}</p></div>`;
      if (window.gtag) gtag("event", "generate_lead", { form: f.dataset.form });
    } catch (err) {
      toast("Couldn't send right now — please try again in a moment.");
      if (btn) { btn.disabled = false; btn.innerHTML = old; }
    }
  });

  // ---------- AdSense (loads only if a real publisher ID is set) ----------
  const realAds = S.adsenseClient && !/X{6,}/.test(S.adsenseClient);
  $$(".ad").forEach(el => {
    if (!realAds) { el.textContent = "Advertisement"; return; }
    el.classList.add("filled"); el.innerHTML = `<ins class="adsbygoogle" style="display:block;width:100%" data-ad-client="${S.adsenseClient}" data-ad-slot="${(S.adSlots || {})[el.dataset.slot] || ""}" data-ad-format="auto" data-full-width-responsive="true"></ins>`;
  });
  if (realAds) {
    const s = document.createElement("script"); s.async = true; s.crossOrigin = "anonymous";
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + S.adsenseClient; document.head.appendChild(s);
    s.onload = () => $$(".adsbygoogle").forEach(() => { try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {} });
  }
  if (S.ga4) { const g = document.createElement("script"); g.async = true; g.src = "https://www.googletagmanager.com/gtag/js?id=" + S.ga4; document.head.appendChild(g); window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); }; gtag("js", new Date()); gtag("config", S.ga4); }

  // ---------- YouTube (click-to-load, privacy-enhanced) ----------
  window.renderVideos = function (el, list) {
    if (!el) return;
    el.innerHTML = (list || S.videos || []).map(v => `<div><div class="video" data-id="${v.id}" role="button" tabindex="0" aria-label="Play: ${v.title}"><img loading="lazy" src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="${v.title}"><div class="play"><b>▶</b></div></div><p style="margin:8px 0 0;font-weight:600">${v.title}</p></div>`).join("");
    $$(".video", el).forEach(v => { const go = () => { v.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${v.dataset.id}?autoplay=1&rel=0" title="YouTube video" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`; }; v.onclick = go; v.onkeydown = e => { if (e.key === "Enter") go(); }; });
  };
  renderVideos($("[data-videos]"), $("[data-videos]") && $("[data-videos]").dataset.videos === "3" ? (S.videos || []).slice(0, 3) : null);

  // ---------- Donation links ----------
  $$("[data-donate]").forEach(a => { const url = (S.donate || {})[a.dataset.donate]; if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; } else { a.href = "#pledge"; } });

  // ---------- Countdown ----------
  const cd = $("[data-countdown]");
  if (cd && S.contest) { const end = new Date(S.contest.closes).getTime(); const tick = () => { let d = Math.max(0, end - Date.now()); const u = [864e5, 36e5, 6e4, 1e3].map(x => { const v = Math.floor(d / x); d -= v * x; return v; }); cd.innerHTML = ["Days", "Hrs", "Min", "Sec"].map((l, i) => `<div><b>${u[i]}</b>${l}</div>`).join(""); }; tick(); setInterval(tick, 1000); }

  // ---------- Share ----------
  window.shareIt = async (title, url) => { url = url || location.href; try { if (navigator.share) return await navigator.share({ title, url }); await navigator.clipboard.writeText(url); toast("Link copied — share your lucky result!"); } catch (e) {} };

  // ---------- Smooth hash tabs helper ----------
  window.esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
})();
