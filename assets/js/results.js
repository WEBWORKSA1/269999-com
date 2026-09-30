/* 269999.com — result rendering */
(function () {
  const L = window.Lucky;
  const col = s => s >= 70 ? "var(--good)" : s >= 45 ? "var(--mid)" : "var(--bad)";
  const CTX = {
    phone: "phone number", plate: "license plate", address: "house / unit number", price: "price", number: "number", date: "date"
  };
  window.renderAnalysis = function (a, el, opts = {}) {
    if (!a) { el.innerHTML = `<p class="muted">Please enter at least one digit.</p>`; return; }
    const D = L.DIGITS, ctx = CTX[a.ctx] || "number";
    const pills = a.digits.map(x => `<span class="pill ${D[x].tone === "good" ? "good" : D[x].tone === "bad" ? "bad" : ""}" title="${D[x].ch} ${D[x].py}">${x}</span>`).join("");
    const combos = a.found.length ? a.found.map(f => `<tr><td><b style="font-family:var(--serif);font-size:1.2rem">${f.p}</b></td><td>${f.m}</td><td><span class="tag ${f.v > 0 ? "good" : "bad"}">${f.v > 0 ? "+" : ""}${f.v}</span></td></tr>`).join("") : `<tr><td colspan="3" class="muted">No famous combinations detected — the reading relies on single digits.</td></tr>`;
    const uniq = [...new Set(a.digits)].sort();
    const dig = uniq.map(x => `<tr><td><b>${x}</b> ${D[x].ch}</td><td>${D[x].py}</td><td>${D[x].sound}</td><td>×${a.counts[x]}</td></tr>`).join("");
    const elTot = a.digits.length;
    const els = Object.entries(a.elements).map(([k, v]) => `<div style="margin:6px 0"><div style="display:flex;justify-content:space-between;font-size:.88rem"><span>${k}</span><span>${v}</span></div><div class="bar"><i style="width:${(v / elTot) * 100}%"></i></div></div>`).join("");
    const fours = a.counts[4];
    const tips = [];
    if (fours) tips.push(`Contains ${fours}× digit 4 (四 ≈ 死). Many Chinese buyers avoid it for ${ctx}s — especially at the end.`);
    if (a.counts[8] + a.counts[6] + a.counts[9] >= Math.ceil(a.digits.length / 2)) tips.push("Rich in 8 / 6 / 9 — the prosperity, smoothness and longevity trio. Strong resale appeal.");
    if (a.n81) tips.push(`Traditional 81-number method (last four digits ÷ 80): <b>${a.n81.value}</b> — ${a.n81.label}.`);
    tips.push(`Digit sum ${a.sum.join(" → ")}: ${a.sum[a.sum.length - 1] === 8 ? "ends on 8, a wealth signal" : a.sum[a.sum.length - 1] === 9 ? "ends on 9, completion and longevity" : a.sum[a.sum.length - 1] === 4 ? "reduces to 4 — a mild caution" : "a balanced root number"}.`);
    el.innerHTML = `<div class="card fade">
      <div class="grid g2" style="align-items:center">
        <div class="center"><div class="gauge" style="--v:${a.score};--gcol:${col(a.score)}"><span>${a.score}</span></div>
          <div class="stars" aria-label="${a.stars} of 5">${"★".repeat(a.stars)}${"☆".repeat(5 - a.stars)}</div></div>
        <div><div class="kicker">Your ${ctx} reading</div><h2 style="word-break:break-all">${a.input}</h2><p style="font-size:1.15rem;font-weight:700;color:${col(a.score)}">${a.verdict}</p>
          <div class="pill-row">${pills}</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px"><button class="btn sm" onclick="shareIt('My lucky number score: ${a.score}/100','${location.origin + location.pathname.replace(/[^/]*$/, "")}number.html?n=${a.input}')">Share result</button><a class="btn sm ghost" href="number.html?n=${a.input}">Full meaning page</a><a class="btn sm gold" href="consult.html?n=${a.input}&t=${a.ctx}">Ask an expert</a></div></div>
      </div>
      <h3 style="margin-top:24px">Key insights</h3><ul>${tips.map(t => `<li>${t}</li>`).join("")}</ul>
      <h3>Lucky & unlucky combinations</h3><div class="table-wrap"><table><thead><tr><th>Pattern</th><th>Meaning</th><th>Effect</th></tr></thead><tbody>${combos}</tbody></table></div>
      <div class="grid g2" style="margin-top:18px"><div><h3>Digit by digit</h3><div class="table-wrap"><table><thead><tr><th>Digit</th><th>Pinyin</th><th>Sound / symbolism</th><th>Count</th></tr></thead><tbody>${dig}</tbody></table></div></div>
      <div><h3>Five Elements balance (河图)</h3>${els}<p class="muted" style="font-size:.85rem">He Tu mapping: 1·6 Water, 2·7 Fire, 3·8 Wood, 4·9 Metal, 5·0 Earth.</p></div></div>
    </div>
    <div class="ad" data-slot="result"></div>
    ${opts.gate === false ? "" : `<div class="leadbox" style="margin-top:18px"><div class="grid g2" style="align-items:center"><div><h3>📩 Get your free full PDF-style report + 3 better alternatives</h3><p class="muted" style="margin:0">Includes the I-Ching style reading, best matching zodiac signs and 3 hand-picked luckier ${ctx}s. Sent to your inbox.</p></div>
      <form data-form="Lead: Full report request" data-extra='${JSON.stringify({ analyzed: a.input, type: a.ctx, score: a.score })}' data-success="Your report request is in. Watch your inbox (and spam folder) within 24 hours.">
        <input class="hp" name="_honey" tabindex="-1" autocomplete="off"><div class="row"><div><label>Name</label><input name="name" required></div><div><label>Email</label><input type="email" name="email" required></div></div>
        <label class="check" style="margin:10px 0"><input type="checkbox" name="consent" value="yes" required> I agree to receive my report and occasional lucky-date emails. Unsubscribe anytime.</label>
        <button class="btn gold" type="submit">Send my free report →</button></form></div></div>`}`;
    // fill new ad slot if ads active
    const S = window.SITE || {};
    if (S.adsenseClient && !/X{6,}/.test(S.adsenseClient)) { const ad = el.querySelector(".ad"); ad.classList.add("filled"); ad.innerHTML = `<ins class="adsbygoogle" style="display:block" data-ad-client="${S.adsenseClient}" data-ad-slot="${S.adSlots.result}" data-ad-format="auto" data-full-width-responsive="true"></ins>`; try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {} }
    else { const ad = el.querySelector(".ad"); if (ad) ad.textContent = "Advertisement"; }
  };
})();
