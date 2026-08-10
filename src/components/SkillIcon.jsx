import { skillIcons } from "../data/skillIcons.js";

/**
 * Category glyphs for the entries with no brand mark — "Change data capture",
 * "Thread Pools", "Resilience4j", and the real brands Simple Icons had to drop
 * (Java, AWS, Azure). Without these roughly half the chips would sit iconless
 * next to iconed ones, which reads as broken rather than as a deliberate mix.
 * Stroked rather than filled, so they stay visibly secondary to the real logos.
 */
const glyphs = {
  code: "M8.5 5.5 3 12l5.5 6.5M15.5 5.5 21 12l-5.5 6.5",
  // Java has no mark to use — Oracle had it pulled — so it gets the cup
  java: "M7 10.5h8.5v4.2a3.3 3.3 0 0 1-3.3 3.3h-1.9a3.3 3.3 0 0 1-3.3-3.3v-4.2ZM15.5 11.4h1.4a1.9 1.9 0 0 1 0 3.8h-1.4M9.6 3.2c-1.2 1.3 1.6 2 .4 3.6M13 3.8c-.9 1 1.1 1.5.3 2.7M6.8 20.6h10.4",
  stream: "M3 8h11m0 0-2.6-2.6M14 8l-2.6 2.6M21 16H10m0 0 2.6-2.6M10 16l2.6 2.6",
  db: "M12 3c4.4 0 7.5 1.2 7.5 2.8S16.4 8.6 12 8.6 4.5 7.4 4.5 5.8 7.6 3 12 3ZM4.5 5.8v12.4C4.5 19.8 7.6 21 12 21s7.5-1.2 7.5-2.8V5.8M4.5 12c0 1.6 3.1 2.8 7.5 2.8s7.5-1.2 7.5-2.8",
  shield: "M12 3 4.8 5.9v5.3c0 4.2 3 7.5 7.2 9.3 4.2-1.8 7.2-5.1 7.2-9.3V5.9L12 3Zm-2.6 8.8 2 2 3.6-3.7",
  gear: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm8.4 3a8.4 8.4 0 0 0-.15-1.5l2-1.5-2-3.4-2.35 1a8.4 8.4 0 0 0-2.6-1.5L15 2.5H9l-.3 2.6a8.4 8.4 0 0 0-2.6 1.5l-2.35-1-2 3.4 2 1.5A8.4 8.4 0 0 0 3.6 12",
  cloud: "M7.2 18.5h9.9a3.9 3.9 0 0 0 .4-7.8 6 6 0 0 0-11.5 1.5 3.4 3.4 0 0 0 1.2 6.3Z",
  chain: "M10.3 13.7a3.4 3.4 0 0 0 5 .3l2.4-2.4a3.4 3.4 0 0 0-4.8-4.8l-1.4 1.4M13.7 10.3a3.4 3.4 0 0 0-5-.3l-2.4 2.4a3.4 3.4 0 0 0 4.8 4.8l1.4-1.4",
  spark: "M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z",
  check: "M4.5 12.6 9.2 17.3 19.5 7",
};

// the skills grid and the project stacks name things slightly differently;
// resolved here rather than duplicating path data
const aliases = {
  Kafka: "Apache Kafka",
  "Spring MVC": "Spring",
  "Spring Data JPA": "Spring",
  "Spring Cloud": "Spring",
  "Spring Cloud Gateway": "Spring",
  Maven: "Apache Maven",
  Zipkin: "Jaeger",
  "MongoDB Atlas": "MongoDB",
  "Docker Swarm": "Docker",
  "Kubernetes (EKS)": "Kubernetes",
  Postgres: "PostgreSQL",
  "React Native": "React",
};

// names that want a specific glyph regardless of which group they sit in —
// "Java" should be a cup on a skills chip and on a project stack alike
const nameGlyph = {
  Java: "java",
  "JVM tuning": "java",
  Avalanche: "chain",
  "Change data capture": "stream",
  "Event sourcing": "stream",
  "Kafka Connect": "stream",
  Debezium: "stream",
  AWS: "cloud",
  Azure: "cloud",
  CloudWatch: "cloud",
  Resilience4j: "shield",
  Mockito: "check",
  "REST APIs": "code",
  ExecutorService: "gear",
  "Thread Pools": "gear",
  CompletableFuture: "gear",
  "Streams API": "gear",
  Collections: "db",
  "Query tuning": "db",
};

// which glyph a group falls back to
export const groupGlyph = {
  Core: "java",
  "JVM & Concurrency": "gear",
  "Messaging & Streaming": "stream",
  "Data & Search": "db",
  "Resilience & Observability": "spark",
  "Security & Testing": "shield",
  "Cloud & Delivery": "cloud",
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

  const fallback = nameGlyph[name] || glyph;

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
      <path d={glyphs[fallback] || glyphs.code} />
    </svg>
  );
}
