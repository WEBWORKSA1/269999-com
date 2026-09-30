/* 269999.com — Lucky Number Engine (cultural / entertainment use) */
(function (w) {
  const DIGITS = {
    0: { ch: "零", py: "líng", s: 0, el: "Earth", sound: "sounds like 灵 (líng, spirit) — wholeness, a fresh start", tone: "neutral" },
    1: { ch: "一", py: "yī / yāo", s: 1, el: "Water", sound: "unity & beginnings; read yāo (要, 'want') inside phone numbers", tone: "good" },
    2: { ch: "二 / 兩", py: "èr / liǎng", s: 1, el: "Fire", sound: "'good things come in pairs'; Cantonese yi ≈ 易 (easy)", tone: "good" },
    3: { ch: "三", py: "sān", s: 1, el: "Wood", sound: "Cantonese saam ≈ 生 (life, birth); growth", tone: "good" },
    4: { ch: "四", py: "sì", s: -5, el: "Metal", sound: "sounds like 死 (sǐ, death) — the most avoided digit", tone: "bad" },
    5: { ch: "五", py: "wǔ", s: 0, el: "Earth", sound: "sounds like 我 (wǒ, me) and 无 (wú, none); the Five Elements", tone: "neutral" },
    6: { ch: "六", py: "liù", s: 3, el: "Water", sound: "sounds like 溜 / 顺 (smooth flow); Cantonese luk ≈ 禄 (fortune)", tone: "good" },
    7: { ch: "七", py: "qī", s: 0, el: "Fire", sound: "sounds like 起 (rise) and 妻 (wife); also the Ghost Month (7th)", tone: "neutral" },
    8: { ch: "八", py: "bā", s: 4, el: "Wood", sound: "sounds like 发 (fā, prosper) — the luckiest digit", tone: "good" },
    9: { ch: "九", py: "jiǔ", s: 3, el: "Metal", sound: "sounds like 久 (jiǔ, long-lasting); the emperor's number", tone: "good" }
  };
  const COMBOS = [
    ["5201314", 10, "我爱你一生一世 — 'I love you for a lifetime'"],
    ["269999", 12, "易祿久久久久 (Cantonese) — 'easy fortune, lasting forever'"],
    ["8888", 16, "发发发发 — prosperity multiplied"], ["9999", 14, "久久久久 — forever and ever (长长久久)"],
    ["6666", 12, "顺顺顺顺 — everything goes smoothly"], ["1688", 10, "一路发发 — prosper all the way"],
    ["1314", 8, "一生一世 — one lifetime"], ["1818", 8, "要发要发 — want to prosper"],
    ["888", 12, "triple prosperity"], ["999", 10, "eternal, supreme"], ["666", 10, "very smooth — also 'awesome' in net slang"],
    ["168", 12, "一路发 — prosperity all the way"], ["518", 10, "我要发 — I will prosper"], ["520", 6, "我爱你 — I love you"],
    ["748", -8, "去死吧 — 'go die' (avoid)"], ["250", -8, "二百五 — slang for a fool"], ["514", -6, "我要死 — 'I want to die' (avoid)"],
    ["88", 10, "双发 — double prosperity"], ["99", 8, "久久 — long, long time"], ["66", 8, "六六大顺 — smooth in all things"],
    ["68", 8, "顺发 / 禄发 — smooth prosperity"], ["28", 8, "易发 (Cantonese) — easy prosperity"], ["58", 6, "我发 — I prosper"],
    ["89", 6, "发久 — lasting wealth"], ["26", 3, "易禄 (Cantonese) — easy fortune; Mandarin èr-liù can echo 二流"],
    ["69", 2, "顺久 — smooth for a long time"], ["16", 4, "一路 / 要顺 — want smoothness"], ["18", 5, "要发 — want to prosper"],
    ["19", 3, "一久 — long-lasting"], ["36", 3, "生禄 (Cantonese) — birth of fortune"], ["38", -4, "三八 — rude slang in Mandarin"],
    ["44", -12, "死死 — double death"], ["14", -12, "要死 — 'want to die'"], ["74", -10, "气死 — 'angry to death'"],
    ["54", -8, "我死 / 无事 — ambiguous, usually avoided"], ["24", -6, "易死 (Cantonese) — 'easy to die'"], ["94", -6, "久死 — lasting death"]
  ];
  const L81 = [1,3,5,6,7,8,11,13,15,16,17,18,21,23,24,25,29,31,32,33,35,37,39,41,45,47,48,52,57,61,63,65,67,68,81];
  const M81 = [27,30,38,49,51,55,58,71,73,75,77,78];

  function clean(v) { return String(v || "").replace(/[^0-9]/g, ""); }

  function num81(d) {
    if (d.length < 4) return null;
    const last4 = parseInt(d.slice(-4), 10);
    let r = Math.round((last4 / 80 - Math.floor(last4 / 80)) * 80);
    if (r === 0) r = 80;
    const cls = L81.includes(r) ? "good" : M81.includes(r) ? "mixed" : "caution";
    return { value: r, cls, label: cls === "good" ? "Auspicious (吉)" : cls === "mixed" ? "Mixed (半吉)" : "Challenging (凶)" };
  }

  function reduce(d) { let s = d.split("").reduce((a, b) => a + +b, 0); const steps = [s]; while (s > 9) { s = String(s).split("").reduce((a, b) => a + +b, 0); steps.push(s); } return steps; }

  function analyze(input, ctx) {
    const d = clean(input);
    if (!d) return null;
    let score = 50;
    const digits = d.split("").map(Number);
    const counts = Array(10).fill(0); digits.forEach(x => counts[x]++);
    const weight = Math.min(1, 6 / d.length);
    digits.forEach(x => score += DIGITS[x].s * weight * 1.6);
    const found = []; let masked = d;
    COMBOS.forEach(([p, v, m]) => {
      if (masked.includes(p)) { found.push({ p, v, m }); score += v * (p.length >= 4 ? 1 : 0.8); masked = masked.split(p).join("-".repeat(p.length)); }
    });
    const tail = d.match(/(\d)\1{2,}$/);
    if (tail && [6, 8, 9].includes(+tail[1])) score += 6;
    if (d.endsWith("4")) score -= 6;
    const n81 = num81(d);
    if (n81) score += n81.cls === "good" ? 8 : n81.cls === "mixed" ? 1 : -6;
    score = Math.max(3, Math.min(99, Math.round(score)));
    const els = { Water: 0, Fire: 0, Wood: 0, Metal: 0, Earth: 0 };
    digits.forEach(x => els[DIGITS[x].el]++);
    const verdict = score >= 85 ? "Exceptionally auspicious (大吉)" : score >= 70 ? "Auspicious (吉)" : score >= 55 ? "Fairly good (小吉)" : score >= 40 ? "Neutral (平)" : "Challenging (凶) — consider alternatives";
    return { input: d, score, verdict, stars: Math.round(score / 20), digits, counts, found, n81, sum: reduce(d), elements: els, ctx: ctx || "number" };
  }

  // ---------- Zodiac ----------
  const ZODIAC = [
    { en: "Rat", ch: "鼠", lucky: [2, 3], em: "🐀" }, { en: "Ox", ch: "牛", lucky: [1, 4], em: "🐂" },
    { en: "Tiger", ch: "虎", lucky: [1, 3, 4], em: "🐅" }, { en: "Rabbit", ch: "兔", lucky: [3, 4, 6], em: "🐇" },
    { en: "Dragon", ch: "龙", lucky: [1, 6, 7], em: "🐉" }, { en: "Snake", ch: "蛇", lucky: [2, 8, 9], em: "🐍" },
    { en: "Horse", ch: "马", lucky: [2, 3, 7], em: "🐎" }, { en: "Goat", ch: "羊", lucky: [3, 4, 9], em: "🐐" },
    { en: "Monkey", ch: "猴", lucky: [1, 7, 8], em: "🐒" }, { en: "Rooster", ch: "鸡", lucky: [5, 7, 8], em: "🐓" },
    { en: "Dog", ch: "狗", lucky: [3, 4, 9], em: "🐕" }, { en: "Pig", ch: "猪", lucky: [2, 5, 8], em: "🐖" }
  ];
  const STEMS = "甲乙丙丁戊己庚辛壬癸", BRANCHES = "子丑寅卯辰巳午未申酉戌亥";
  const STEM_EL = ["Wood", "Wood", "Fire", "Fire", "Earth", "Earth", "Metal", "Metal", "Water", "Water"];

  function lunarYear(date) {
    try {
      const parts = new Intl.DateTimeFormat("en-u-ca-chinese", { year: "numeric", month: "numeric", day: "numeric" }).formatToParts(date);
      const ry = parts.find(p => p.type === "relatedYear");
      if (ry) return { year: +ry.value, month: (parts.find(p => p.type === "month") || {}).value, day: (parts.find(p => p.type === "day") || {}).value };
    } catch (e) {}
    const y = date.getFullYear();
    return { year: (date.getMonth() < 1 || (date.getMonth() === 1 && date.getDate() < 4)) ? y - 1 : y };
  }
  function zodiacOf(date) {
    const ly = lunarYear(date); const i = ((ly.year - 4) % 12 + 12) % 12; const s = ((ly.year - 4) % 10 + 10) % 10;
    return Object.assign({ index: i, year: ly.year, element: STEM_EL[s], ganzhi: STEMS[s] + BRANCHES[i], lunar: ly }, ZODIAC[i]);
  }
  const SIX_HARMONY = [[0, 1], [2, 11], [3, 10], [4, 9], [5, 8], [6, 7]];
  const HARM = [[0, 7], [1, 6], [2, 5], [3, 4], [8, 11], [9, 10]];
  function compat(a, b) {
    const has = (L) => L.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
    if (a === b) return { score: 72, label: "Same sign — deep understanding, occasional stubbornness" };
    if (has(SIX_HARMONY)) return { score: 95, label: "Six Harmony (六合) — a classic ideal match" };
    if (a % 4 === b % 4) return { score: 90, label: "Three Harmony (三合) — natural allies" };
    if (Math.abs(a - b) === 6) return { score: 30, label: "Clash (六冲) — strong friction, needs patience" };
    if (has(HARM)) return { score: 42, label: "Harm (六害) — hidden misunderstandings" };
    return { score: 64, label: "Neutral — works with effort and respect" };
  }

  // ---------- Almanac (simplified 建除十二神) ----------
  const OFFICERS = [
    ["建 Establish", "Travel, starting plans, meetings", "Digging, moving house"],
    ["除 Remove", "Cleaning, clearing clutter, medical care, moving", "Weddings, long trips"],
    ["满 Full", "Opening a shop, celebrations, collecting", "Medical procedures, lawsuits"],
    ["平 Balance", "Repairs, paving, routine work", "Major launches"],
    ["定 Stable", "Weddings, contracts, hiring", "Lawsuits, long trips"],
    ["执 Hold", "Contracts, collecting debts, planting", "Moving, travel"],
    ["破 Break", "Demolition, ending things", "Almost all important events"],
    ["危 Danger", "Worship, careful detailed tasks", "Climbing, risky ventures"],
    ["成 Success", "Weddings, openings, moving, signing — all major events", "Lawsuits"],
    ["收 Receive", "Collecting, harvesting, buying property", "Funerals, medical"],
    ["开 Open", "Grand openings, weddings, moving, new jobs", "Burials"],
    ["闭 Close", "Saving money, building walls, rest", "Openings, medical"]
  ];
  const ACTIVITY = { wedding: [4, 8, 10, 2], moving: [1, 4, 8, 10], opening: [10, 8, 2], contract: [4, 5, 8], travel: [0, 1, 8, 10], renovation: [1, 3, 8, 10], property: [9, 8, 4] };
  const TERM = [[1, 6, 1], [2, 4, 2], [3, 6, 3], [4, 5, 4], [5, 6, 5], [6, 6, 6], [7, 7, 7], [8, 8, 8], [9, 8, 9], [10, 8, 10], [11, 7, 11], [12, 7, 0]];
  function jdn(dt) { const a = Math.floor((14 - (dt.getMonth() + 1)) / 12), y = dt.getFullYear() + 4800 - a, m = dt.getMonth() + 1 + 12 * a - 3; return dt.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045; }
  function monthBranch(dt) { const m = dt.getMonth() + 1, d = dt.getDate(); const t = TERM[m - 1]; let b = t[2]; if (d < t[1]) b = (b + 11) % 12; return b; }
  function day(dt) {
    const j = jdn(dt), s = (j + 9) % 10, b = (j + 1) % 12, mb = monthBranch(dt), o = (b - mb + 12) % 12;
    let lunar = ""; try { lunar = new Intl.DateTimeFormat("zh-CN-u-ca-chinese", { month: "long", day: "numeric" }).format(dt); } catch (e) {}
    return { date: dt, ganzhi: STEMS[s] + BRANCHES[b], branch: b, animal: ZODIAC[b], clash: ZODIAC[(b + 6) % 12], officer: o, off: OFFICERS[o], lunar };
  }
  function findDays(activity, start, days, zIdx) {
    const good = ACTIVITY[activity] || ACTIVITY.wedding, out = [];
    for (let i = 0; i < days; i++) {
      const dt = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i), info = day(dt);
      if (!good.includes(info.officer)) continue;
      if (zIdx != null && zIdx !== "" && info.clash.en === ZODIAC[+zIdx].en) continue;
      info.rank = good.indexOf(info.officer); out.push(info);
    }
    return out;
  }

  // ---------- Generators ----------
  function personalNumbers(dob, name) {
    const z = zodiacOf(dob); const lp = reduce(clean(dob.toISOString().slice(0, 10))).pop();
    const nameVal = (name || "").toUpperCase().replace(/[^A-Z]/g, "").split("").reduce((a, c) => a + ((c.charCodeAt(0) - 64 - 1) % 9 + 1), 0);
    const nameNum = nameVal ? reduce(String(nameVal)).pop() : null;
    const set = new Set([...z.lucky, lp, 8, 6, 9].filter(x => x !== 4));
    if (nameNum && nameNum !== 4) set.add(nameNum);
    return { zodiac: z, lifePath: lp, nameNumber: nameNum, lucky: [...set].slice(0, 6) };
  }
  function luckyPrices(base) {
    const b = Math.max(1, Math.floor(+base || 100));
    const endings = [8, 9, 6, 88, 68, 99, 66, 168, 888, 188, 288, 999, 1688, 2699, 9999, 8888];
    const opts = new Set();
    endings.forEach(e => { const m = Math.pow(10, String(e).length); [-1, 0, 1].forEach(k => { const p = (Math.floor(b / m) + k) * m + e; if (p > 0 && p >= b * 0.75 && p <= b * 1.3) opts.add(p); }); });
    return [...opts].filter(p => !String(p).includes("4")).map(p => ({ price: p, a: analyze(String(p)) })).sort((x, y) => (y.a.score - x.a.score) || (Math.abs(x.price - b) - Math.abs(y.price - b))).slice(0, 8);
  }

  w.Lucky = { DIGITS, COMBOS, ZODIAC, analyze, zodiacOf, compat, day, findDays, OFFICERS, personalNumbers, luckyPrices, clean };
})(window);
