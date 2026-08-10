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

### The architecture diagrams

Backend work has no screenshots, so every project in `content.js` carries a
`diagram` instead. Nodes sit on a grid — `col` runs left to right, `row` top to
bottom — and edges join them by `id`. Positions, curves, arrowheads and the
legend are worked out in `src/components/SystemDiagram.jsx`.

```js
diagram: {
  caption: "one line on what the picture is actually saying",
  nodes: [
    // label = what it is, sub = what it runs on, meta = the one fact worth drawing
    { id: "api", label: "Orders API", sub: "Spring Boot", meta: "idempotency key",
      kind: "service", col: 1, row: 0 },
  ],
  edges: [
    // label = what the arrow is, note = what it carries or promises
    { from: "api", to: "kafka", label: "order.placed", note: "acks=all" },
  ],
  facts: [
    { k: "Ordering", v: "keyed by order id, so two edits can't land out of order" },
  ],
}
```

`kind` is one of `client · service · broker · store · guard · chain · external`
and picks the colour and the legend entry. `facts` renders under the caption —
that's the ordering/delivery/failure detail an interviewer asks about, so it
belongs with the picture rather than in the prose below it.

Nothing wraps, so text has to fit its shape: `label` under about 18 characters,
`sub` and `meta` under 22, edge `label` and `note` under 19. Stay within four
columns, and don't route an edge across a column that already has a node in
that row — it will pass behind the box.

### The CV

The download and the embedded viewer both read `profile.resume.url`, which
points at a file in `public/`. Drop the PDF in there under the same name.

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
