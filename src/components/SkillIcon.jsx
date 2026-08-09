import { skillIcons } from "../data/skillIcons.js";

/**
 * Category glyphs for the entries with no brand mark — "Native Modules",
 * "Deep Linking", "MMKV", and the real brands Simple Icons had to drop (OpenAI,
 * AWS). Without these roughly half the chips would sit iconless next to iconed
 * ones, which reads as broken rather than as a deliberate mix. Stroked rather
 * than filled, so they stay visibly secondary to the real logos.
 */
const glyphs = {
  code: "M8.5 5.5 3 12l5.5 6.5M15.5 5.5 21 12l-5.5 6.5",
  phone: "M8 2.5h8a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 20V4A1.5 1.5 0 0 1 8 2.5ZM10.5 18.6h3",
  motion: "M3 16.5c4.5 0 5-9 9-9s4.5 5.5 9 5.5",
  db: "M12 3c4.4 0 7.5 1.2 7.5 2.8S16.4 8.6 12 8.6 4.5 7.4 4.5 5.8 7.6 3 12 3ZM4.5 5.8v12.4C4.5 19.8 7.6 21 12 21s7.5-1.2 7.5-2.8V5.8M4.5 12c0 1.6 3.1 2.8 7.5 2.8s7.5-1.2 7.5-2.8",
  form: "M5 3.5h14a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V5A1.5 1.5 0 0 1 5 3.5ZM7.5 9h9M7.5 13h9M7.5 17h5",
  check: "M4.5 12.6 9.2 17.3 19.5 7",
  spark: "M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z",
  cloud: "M7.2 18.5h9.9a3.9 3.9 0 0 0 .4-7.8 6 6 0 0 0-11.5 1.5 3.4 3.4 0 0 0 1.2 6.3Z",
};

// project stacks and the skills grid name things slightly differently;
// resolved here rather than duplicating path data
const aliases = {
  React: "React Native",
  "React.js": "React Native",
  Redux: "Redux Toolkit",
  "Redux Saga": "Redux Toolkit",
  "Next.js 14": "Next.js",
  Node: "Node.js",
  "EAS Update": "Expo",
  "EAS Build": "Expo",
};

// which glyph a group falls back to
export const groupGlyph = {
  Core: "code",
  "Navigation & Animation": "motion",
  "Device & Platform": "phone",
  "State & Storage": "db",
  "Forms & Validation": "form",
  "Testing & Release": "check",
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
