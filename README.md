# Ajay Kumar Pandey — Portfolio

A one-page portfolio built with React + Vite, in the spirit of playful, bouncy,
sticker-card sites like joshwcomeau.com — spring animations, colorful floating
blobs, light/dark toggle, layered "sticker" shadows.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

Output goes to `dist/` — deploy that folder anywhere static (Vercel, Netlify,
GitHub Pages, etc).

## Editing content

All the text (name, bio, skills, experience, projects) lives in one place:

```
src/data/content.js
```

Change it there and everything on the page updates.

## Structure

```
src/
  components/   UI pieces (Hero, Projects, Experience, Skills, etc.)
  data/         content.js — all your resume content
  useTheme.js   dark/light mode logic (persisted in localStorage)
  index.css     design tokens (colors, fonts, spacing) + global styles
```

## Stack

- React 18 + Vite
- Framer Motion (scroll reveals, spring toggle animation)
- Plain CSS with custom properties (no Tailwind/CSS framework)
- Fonts: Fraunces (display), Plus Jakarta Sans (body), JetBrains Mono (labels)
