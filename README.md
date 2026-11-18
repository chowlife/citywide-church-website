# Citywide Praise and Worship Baptist Church — Website

A simple, fast website made of plain HTML/CSS/JavaScript files.
**No database, no WordPress, no special software, no monthly fees.**
The whole website is this one folder — copy it anywhere and it works.

---

## 1. Folder layout

```
citywide-church-website/
├── index.html          Home page
├── about.html          About us, mission, leadership, statement of faith
├── ministries.html     Women's, Men's, Children's, Bible Study / Prayer
├── visit.html          Service times, map, contact info, FAQ
├── give.html           CanadaHelps, e-Transfer, in-person giving
├── README.md           This guide
└── assets/
    ├── css/style.css   Colours, fonts, layout
    ├── js/site-data.js ★ EDIT THIS for times, events, phone, leaders, giving
    ├── js/main.js      Builds the menu/footer (normally leave alone)
    └── images/         Put photos here
```

## 2. Everyday updates (no coding needed)

Open **`assets/js/site-data.js`** in any text editor (Notepad works; the free
[VS Code](https://code.visualstudio.com) is nicer). Everything there shows up on
every page automatically:

| To change…              | Edit this in site-data.js |
|-------------------------|---------------------------|
| Service times           | `services`                |
| Upcoming events         | `events` (copy the example block, remove the `//`) |
| Phone / email / address | `phone`, `cell`, `email`, `address` |
| Facebook / YouTube      | `social`                  |
| Pastor & leaders        | `leaders`                 |
| e-Transfer email        | `giving.etransferEmail`   |

- **Events remove themselves** the day after they end, so the site never shows stale events.
- Anything left as `""` (empty) is hidden automatically.
- Keep the quotes and commas. If the page goes blank after an edit, you probably deleted a comma or quote.

## 3. Adding photos

1. Save the photo into `assets/images/` (use simple names like `pastor.jpg` — no spaces).
2. Resize large phone photos to about 1600px wide first (keeps the site fast).
3. Hook it up:
   - **Pastor / leader photo:** in `site-data.js`, set `photo: "pastor.jpg"`.
   - **Home page background:** save as `hero.jpg`, then follow the comment above `<section class="hero">` in `index.html`.
   - **Grey "Photo of…" boxes:** in the HTML, replace the `<div class="photo-label">…</div>` line with the `<img …>` line shown in the comment right above it.

## 4. Preview on your own computer

Double-click `index.html` — it opens in your browser. That's it.
(The map only shows when the site is online or served locally.)

## 5. Moving between computers

Pick **one** of these:

- **Recommended — GitHub (free):** keep the folder in a GitHub repository.
  From *any* computer you can log in to github.com and edit `site-data.js`
  right in the browser (pencil icon → Commit). The live site updates itself
  in about a minute. Nothing to install.
- **OneDrive / Google Drive / USB stick:** copy the whole folder. Upload it to the host after changes.

## 6. Going live (hosting + domain)

**Recommended setup (≈ $15–25 CAD / year total):**

1. **Domain** — register at a Canadian-friendly registrar (Namecheap, Rebel.ca, GoDaddy).
   Available as of Nov 17, 2026:
   - `citywidepraise.ca` ← top pick (short, Canadian, easy to say)
   - `citywidepraise.com` (grab too, if budget allows, so no one else takes it)
   - `cwpwc.ca`, `citywidebaptist.ca`, `citywidepraisechurch.ca`, `citywideajax.ca`
   - (`citywidechurch.ca` is already taken)
   .ca domains require a Canadian presence — the church qualifies as a Canadian charity.
2. **Hosting — free** on **Cloudflare Pages** or **Netlify**:
   - Create an account, choose "Import from GitHub" (or drag-and-drop this folder).
   - Under *Custom domains*, add `citywidepraise.ca` and follow the DNS instructions.
   - HTTPS (the padlock) is set up automatically.
3. **Church email (optional, free):** as a registered charity you can apply for
   **Google for Nonprofits** (free Google Workspace) to get addresses like
   `pastor@citywidepraise.ca`. Zoho Mail also has a free tier.

### Can we host it ourselves (a computer at the church/home)?
Technically yes, but **not recommended**: home/church internet plans usually
block web servers or change your IP address, the PC must stay on 24/7, power or
internet outages take the site down, and you become responsible for security
updates. Free hosting above is faster, more reliable and still 100% yours — you
own the domain and the files, and can move to any other host at any time
by uploading this same folder.

## 7. Before launch checklist

- [x] Confirm phone numbers
- [x] Confirm weekday meeting times (Monday Morning Prayer, Thursday Bible Study)
- [x] Confirm pastor's name/title
- [ ] Add pastor photo and short bio
- [ ] Add postal code
- [x] Add email address and e-Transfer email
- [ ] Turn on auto-renew for citywidepraise.ca at Namecheap (registered until Nov 18, 2027)
- [ ] Add Facebook / YouTube links if any
- [ ] Add real photos (hero, congregation, worship)
- [ ] Update the church's address on the CanadaHelps / CRA listing (it still shows 1593 Seguin Sq, Pickering)
- [ ] Redirect or retire the old `cwpwccanada.wordpress.com` site (WordPress.com shows ads on it)
