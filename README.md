# Anusuri Bhaskara Suresh Swamy — Portfolio

An interactive, editorial-style developer portfolio built with React, Vite, and GSAP —
custom cursor, cinematic loader, scroll-driven project reveals, and a full-screen project
detail overlay.

## 1. Fill in your details

Everything personal lives in one file:

```
src/config/profile.js
```

Two things were intentionally left as placeholders (nothing was invented for you):

- `email` — currently `"YOUR_EMAIL_HERE"`. The contact form and email button stay
  disabled until you set this.
- `resumeUrl` — currently `"YOUR_RESUME_URL_HERE"`. Point it at a hosted PDF (Google
  Drive share link, GitHub raw link, etc).

### Making the contact form actually send email

By default, once `email` is set, the form falls back to opening the visitor's mail app
with the message pre-filled. To have it send the message directly — no page reload,
no mail app — connect a free [EmailJS](https://www.emailjs.com) account:

1. Create a free account at emailjs.com and connect your inbox (Gmail, Outlook, etc.)
   as an "Email Service".
2. Create an "Email Template" with `from_name`, `from_email`, and `message` variables
   (EmailJS's template editor shows you exactly how).
3. Copy your **Service ID**, **Template ID**, and **Public Key** into
   `src/config/profile.js` under `emailjs`.

Once all three are filled in, the form sends for real and shows a "Message sent" state.
Nothing is invented on your behalf — until you add these, the form quietly keeps using
the mailto fallback.

Project links (`github`, `live`) live in `src/data/projects.js`. Each is currently an
empty string, so the modal shows "coming soon" instead of a dead link — fill them in as
you publish real repos/demos.

Certification links live in `src/components/Certifications.jsx` — add a `url` only once
you have a real verification link.

## 2. Run it locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## 3. Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview it locally with:

```bash
npm run preview
```

## 4. Deploy

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
├── components/       # UI building blocks (one .jsx + matching .css each)
├── config/profile.js # your name, links, email, resume — edit this first
├── data/projects.js  # project content — add new projects here, no JSX needed
├── hooks/            # theme, reduced-motion helpers
├── App.jsx
├── main.jsx
└── index.css         # design tokens (colors, type, spacing) + global styles
```

## Notes on interaction details

- **Custom cursor** is automatically disabled on touch devices and when the OS
  "reduce motion" setting is on.
- **Theme** (light/dark) is saved to `localStorage` and respects system preference on
  first visit.
- **Keyboard shortcuts**: press `G` to open GitHub, `L` to open LinkedIn (disabled while
  typing in the contact form or a modal is open). `Esc` closes the project modal.
- Nothing in this codebase invents work experience, links, testimonials, or stats —
  nonexistent details were left as explicit placeholders instead.
