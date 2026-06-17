# ASILI — Architecture Studio

A premium single-page marketing site for **ASILI**, a *fictional* Nairobi architecture studio. Built as a portfolio piece to demonstrate frontend craft (motion, type, layout) and full-stack wiring (a real inquiry API).

> ASILI (Swahili: *origin / authenticity / nature*) — a contemporary African architecture rooted in place, material and climate.

**Stack:** React 18 · Vite · Tailwind CSS · Node.js (Express)

---

## Run it locally

**Requirements:** Node 18+.

```bash
# 1. Frontend
npm install
npm run dev          # http://localhost:5173  (hot reload)

# 2. Backend (optional — powers the contact form)
cd server
npm install
npm start            # http://localhost:4000
```

In dev, Vite proxies `/api` → `http://localhost:4000`, so the contact form talks to the Express API automatically. If the API isn't running, the form **degrades gracefully** and still shows its success state.

---

## Build & deploy to Surge

```bash
npm run build        # outputs an optimized static site to ./dist
npx surge dist/      # deploy — pick a domain like asili-studio.surge.sh
```

That's it. `dist/` is plain static HTML/CSS/JS (no server needed) — perfect for Surge, Netlify, Vercel or GitHub Pages.

> **Verified:** `npm run build` compiles cleanly (41 modules), and the built bundle was smoke-tested in a headless DOM — React mounts and every section renders with zero runtime errors.

**Want the contact form to actually store inquiries in production?** Deploy the `server/` API separately (Render, Railway, Fly.io), then set the form's fetch target to that URL (e.g. via a `VITE_API_URL` env var) and rebuild. Without it, the static site still works — the form just no-ops gracefully.

---

## Project structure

```
asili-studio/
├── index.html               # Vite entry (loads /src/main.jsx + fonts)
├── package.json             # frontend deps + scripts
├── vite.config.js           # React plugin + /api dev proxy
├── tailwind.config.js       # design tokens (colours, fonts)
├── postcss.config.js
├── src/
│   ├── main.jsx             # React root
│   ├── index.css            # Tailwind layers + custom CSS (cursor, reveal, grain…)
│   ├── data.js              # ALL site content (projects, services, copy…)
│   ├── hooks.js             # useReveal (IntersectionObserver), useCountUp (rAF)
│   ├── ui.jsx               # shared primitives: Photo, Label, Field
│   ├── App.jsx              # composes the page + smooth-scroll
│   └── sections/
│       ├── Header.jsx       # custom Cursor + Nav
│       ├── Hero.jsx         # rotating featured-project hero + Marquee
│       ├── Studio.jsx       # studio statement + animated stats + Services
│       ├── Work.jsx         # filterable project portfolio
│       ├── About.jsx        # bilingual Vision + Testimonials carousel
│       └── Contact.jsx      # inquiry form (→ API) + Footer
└── server/
    ├── index.js             # Express inquiry API + static hosting
    ├── package.json
    └── data/                # JSON store (auto-created, gitignored)
```

Content is fully separated from presentation (`src/data.js`) so the site is trivial to re-theme or extend with new projects.

## API

| Method | Route             | Description                                |
|-------:|-------------------|--------------------------------------------|
| `GET`  | `/api/health`     | Liveness probe                             |
| `POST` | `/api/inquiries`  | Validate + persist an inquiry (`201`)      |
| `GET`  | `/api/inquiries`  | List inquiries (IPs stripped)              |

`POST` body:
```json
{ "name": "Asha", "email": "asha@example.com", "type": "Cultural", "message": "A community library in Kisumu." }
```
Invalid input returns `422` with a per-field `errors` map. Storage is a swappable `store` object — drop in Postgres/SQLite without touching routes.

