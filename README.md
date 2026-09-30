# 269999.com — Easy Fortune · Lasting Forever

A static website about Chinese lucky numbers. It combines free tools, a meaning page for any number, lucky dates and zodiac with lead generation, donations, contests, AdSense and YouTube. It runs on the **GitHub Pages free plan**, with no build step.

See **[BUILD-PROMPTS.md](BUILD-PROMPTS.md)** for the research, the strategy, the 29-site audit and the phase-wise build prompts.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Hero analyzer, tools, 269999 story, videos, lead form, contest, donate, FAQ |
| `analyzer.html` | Phone / Plate / Address / Price / Compare tools |
| `number.html?n=` | Meaning page for any number |
| `meanings.html` | Digits 0–9, combinations, zodiac numbers, 0–999 index |
| `lucky-dates.html` | Almanac and auspicious-date finder |
| `zodiac.html` | Sign, lucky numbers, compatibility |
| `consult.html` | 3-step lead-gen form and packages |
| `support.html` | Donations, memberships, pledge form |
| `contests.html` | Monthly contest, referral entries, rules |
| `videos.html` | YouTube library and submissions |
| `advertise.html` | Sponsorship packages and partnerships |
| `careers.html` | Talent applications |
| `about` / `contact` / `privacy` / `terms` / `404` | Company and legal pages |

## Configure (edit `assets/js/config.js` only)

- **`adsenseClient` / `adSlots`:** ads switch on automatically once a real `ca-pub-` ID is set. Also update `ads.txt`.
- **`donate.paypal` / `buymeacoffee` / `kofi` / `stripe`:** paste your links. Any empty link falls back to the pledge form.
- **`contest`:** month, close date, prizes. **`videos`:** YouTube IDs. **`ga4`:** analytics ID.

## Forms and the contact address

Every form posts to FormSubmit through AJAX. The contact address is stored reversed and base64-encoded, and is only assembled in memory when a form is submitted. It never appears in the HTML or on screen.

- **First submission:** FormSubmit sends a one-time activation email. Click the link in it to start receiving form submissions.
- **Optional extra privacy:** afterwards, paste the random alias FormSubmit gives you into `formAlias`.

## Deploy on GitHub Pages (free)

1. Go to Settings → Pages → Source and choose **Deploy from a branch**, then `main`, then `/ (root)`.
2. The site goes live at `https://webworksa1.github.io/269999-com/`.
3. To use a custom domain:
   - Add a file named `CNAME` containing `269999.com`.
   - Point the domain's DNS A records at 185.199.108.153, .109.153, .110.153 and .111.153.
   - Turn on "Enforce HTTPS".

## Trademark & copyright

"269999" is used only as a domain name and a descriptive numeral. The site claims no trademark rights in it and is not affiliated with any entity that uses the number. Original content © 2026 269999.com. All rights reserved.
