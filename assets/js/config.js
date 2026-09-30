/* ==========================================================
   269999.com — Site configuration (edit this file only)
   ========================================================== */
window.SITE = {
  name: "269999.com",
  tagline: "Easy Fortune · Lasting Forever",
  url: "https://269999.com",
  // Top-of-page acquisition / sponsorship banner target
  bizContactUrl: "https://web.works/contact",

  // Contact routing. The address is stored encoded and is only
  // assembled in memory at submit time — it never appears in the HTML.
  // After the first FormSubmit activation email, you may replace
  // `formAlias` with the random alias FormSubmit gives you for extra privacy.
  _r: "=02bj5CbpFWbnBUMhN3ay92diV2d",
  formAlias: "",

  // Google AdSense — replace with your publisher ID once approved
  adsenseClient: "ca-pub-XXXXXXXXXXXXXXXX",
  adSlots: { top: "1111111111", inContent: "2222222222", sidebar: "3333333333", result: "4444444444" },

  // Google Analytics 4 (optional) e.g. "G-XXXXXXX"
  ga4: "",

  // Donation / support links (leave "" to fall back to the pledge form)
  donate: {
    paypal: "",        // e.g. https://www.paypal.com/donate/?hosted_button_id=XXXX
    buymeacoffee: "",  // e.g. https://buymeacoffee.com/yourname
    kofi: "",          // e.g. https://ko-fi.com/yourname
    stripe: ""         // e.g. https://buy.stripe.com/xxxx
  },
  donationGoal: { label: "Launch fund: tools, translators & monthly prizes", raised: 0, target: 8888, currency: "USD" },

  youtubeChannel: "https://www.youtube.com/results?search_query=chinese+lucky+numbers",
  videos: [
    { id: "sr673iAqLZY", title: "Meanings behind Chinese numbers" },
    { id: "wf13M4MoHS4", title: "Chinese lucky & unlucky numbers explained" },
    { id: "QwvlAbisiRc", title: "Most lucky and unlucky numbers for Chinese people" },
    { id: "H9xQPJZgt5E", title: "Special number phrases: 520, 38 and more" },
    { id: "jxKWegGb-3I", title: "Chinese lucky numbers and meanings" },
    { id: "ZKycQG3KTf4", title: "Money, lucky and unlucky numbers vocabulary" }
  ],

  contest: {
    title: "Lucky Number Story of the Month",
    month: "October 2026",
    closes: "2026-10-31T23:59:00-04:00",
    prizes: ["1st: US$188 + featured story", "2nd: US$88 + free full reading", "3rd: US$28 gift card", "10 runners-up: Premium lucky-date calendar (PDF)"]
  }
};
