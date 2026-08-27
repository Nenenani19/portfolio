# Anusuri Bhaskara Suresh Swamy - My Portfolio

An interactive, editorial-style developer portfolio built with **React, Vite, and GSAP** —
custom inertia cursor, cinematic loader, word-by-word text reveals on every heading,
scroll-driven project panels, and a full-screen project detail overlay. Fully responsive
across phone, tablet, and desktop, with reduced-motion support built in.

## Features

- Full name ("Anusuri Bhaskara Suresh Swamy") as the animated hero headline, split
  word-by-word with GSAP + SplitType and revealed on load
- The same word-by-word reveal animation on every section heading (About, Skills,
  Education, Certifications, Projects, Contact) via a shared `SplitHeading` component
- Custom inertia cursor — auto-disabled on touch devices and when the OS "reduce motion"
  setting is on
- Light/dark theme toggle, saved to `localStorage`, respects system preference on first visit
- Four scroll-triggered project panels with a full-screen detail modal (`Esc` to close)
- Contact form that **sends real email via EmailJS** — no backend required — with an
  automatic `mailto:` fallback if EmailJS isn't configured
- Keyboard shortcuts: `G` → GitHub, `L` → LinkedIn (disabled while typing or with a modal open)
- Smooth, jitter-free scrolling on touch devices via `ScrollTrigger.normalizeScroll`

## 1. Fill in your details

Everything personal lives in one file:

```
src/config/profile.js
```

- `resumeUrl` — currently `"YOUR_RESUME_URL_HERE"`. Point it at a hosted PDF (Google
  Drive share link, GitHub raw link, etc).
- `email` — your real address. The contact form and email button are disabled until this
  is set.

Project links (`github`, `live`) live in `src/data/projects.js`. Each is currently an
empty string, so the modal shows "coming soon" instead of a dead link — fill them in as
you publish real repos/demos.

Certification links live in `src/components/Certifications.jsx` — add a `url` only once
you have a real verification link.

## 2. Contact form — sending real email (EmailJS)

The form sends messages directly through [EmailJS](https://www.emailjs.com) — a free,
client-side email service, no backend needed. The three keys already live in
`src/config/profile.js` under `emailjs` (`serviceId`, `templateId`, `publicKey`). These
are your EmailJS **public** key and IDs, which are safe to ship in client-side code by
design — EmailJS is built to be called straight from the browser.

**Template setup** (one-time, in the EmailJS dashboard → Email Templates):

1. Paste the HTML from `emailjs-template.html` (included in this project) into the
   template's Content box.
2. Set **Subject** to something like `New portfolio message from {{from_name}}`.
3. Set **To Email** to your real address (or `{{to_email}}`, which the form already sends).
4. Set **Reply To** to `{{from_email}}` so replying in your inbox goes straight to the
   visitor.
5. Use the "Test It" button with sample values to confirm it lands in your inbox.

If EmailJS isn't configured (any of the three keys still say `YOUR_..._HERE`), the form
automatically falls back to opening the visitor's mail app with the message pre-filled —
nothing breaks either way.

## 3. Run it locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## 4. Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview it locally with:

```bash
npm run preview
```

## 5. Deploy

**Vercel**
```bash
npm i -g vercel
vercel
```
Framework preset: Vite. Build command `npm run build`, output directory `dist`.

**Netlify**
- Build command: `npm run build`
- Publish directory: `dist`
- Or drag-and-drop the `dist/` folder into Netlify's deploy UI.

**GitHub Pages**
1. `npm install -D gh-pages`
2. Add `"homepage": "https://<username>.github.io/<repo>"` to `package.json`
3. Add scripts: `"predeploy": "npm run build"`, `"deploy": "gh-pages -d dist"`
4. `npm run deploy`

## Project structure

```
src/
├── components/          # UI building blocks (one .jsx + matching .css each)
│   └── SplitHeading.jsx # shared GSAP + SplitType word-reveal used on every heading
├── config/profile.js    # your name, links, email, resume, EmailJS keys — edit this first
├── data/projects.js     # project content — add new projects here, no JSX needed
├── hooks/                # theme, reduced-motion helpers
├── App.jsx
├── main.jsx
└── index.css             # design tokens (colors, type, spacing) + global styles
emailjs-template.html      # paste into the EmailJS template editor
```

## Notes on interaction details

- **Custom cursor** is automatically disabled on touch devices and when the OS
  "reduce motion" setting is on.
- **Theme** (light/dark) is saved to `localStorage` and respects system preference on
  first visit.
- **Text animations** use the global `.line` / `.word` reveal rules in `index.css`, so
  headings never clip descenders and reflow cleanly at any screen width.
- Nothing in this codebase invents work experience, links, testimonials, or stats —
  nonexistent details were left as explicit placeholders instead.
