import { skillIcons } from "../data/skillIcons.js";

/**
 * Category glyphs for the entries with no brand mark — "RAG pipelines", "RBAC",
 * "REST APIs", and the few real brands Simple Icons had to drop (OpenAI, AWS,
 * Azure). Without these roughly a third of the chips would sit iconless next to
 * iconed ones, which reads as broken rather than as a deliberate mix.
 * Stroked rather than filled, so they stay visibly secondary to the real logos.
 */
const glyphs = {
  code: "M8.5 5.5 3 12l5.5 6.5M15.5 5.5 21 12l-5.5 6.5",
  db: "M12 3c4.4 0 7.5 1.2 7.5 2.8S16.4 8.6 12 8.6 4.5 7.4 4.5 5.8 7.6 3 12 3ZM4.5 5.8v12.4C4.5 19.8 7.6 21 12 21s7.5-1.2 7.5-2.8V5.8M4.5 12c0 1.6 3.1 2.8 7.5 2.8s7.5-1.2 7.5-2.8",
  spark: "M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5ZM18.5 3v3M20 4.5h-3",
  shield: "M12 3.2 19 6v5.7c0 4.2-2.9 7.6-7 9.1-4.1-1.5-7-4.9-7-9.1V6l7-2.8ZM9.4 12.1l1.9 1.9 3.4-3.6",
  cloud: "M7.2 18.5h9.9a3.9 3.9 0 0 0 .4-7.8 6 6 0 0 0-11.5 1.5 3.4 3.4 0 0 0 1.2 6.3Z",
  check: "M4.5 12.6 9.2 17.3 19.5 7",
};

// project stacks name things slightly differently from the skills grid
// ("React" vs "React.js"); resolved here rather than duplicating path data
const aliases = {
  React: "React.js",
  "Next.js": "Next.js 14",
  Prisma: "Prisma ORM",
  Claude: "Claude API",
  Express: "Express.js",
  Node: "Node.js",
  Redux: "Redux Toolkit",
  "Socket.IO": "Socket.io",
  MERN: "MongoDB",
};

// which glyph a group falls back to
export const groupGlyph = {
  Languages: "code",
  Frontend: "code",
  Backend: "code",
  Databases: "db",
  "AI & GenAI": "spark",
  "Auth & Security": "shield",
  "Cloud & DevOps": "cloud",
  "Testing & Quality": "check",
};

export default function SkillIcon({ name, glyph = "code" }) {
  const brand = skillIcons[name] || skillIcons[aliases[name]];

  if (brand) {
    return (
      <svg
        className="skill-icon is-brand"
        viewBox="0 0 24 24"
        width="14"
        height="14"
        aria-hidden="true"
        // near-black marks keep their brand colour on light and inherit the
        // chip's text colour on dark, where they'd otherwise vanish
        style={{ "--brand": brand.hex, "--brand-dark": brand.dark ? "currentColor" : brand.hex }}
      >
        <path fill="currentColor" d={brand.path} />
      </svg>
    );
  }

  return (
    <svg
      className="skill-icon is-glyph"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={glyphs[glyph] || glyphs.code} />
    </svg>
  );
}
