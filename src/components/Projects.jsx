import { motion } from "framer-motion";
import { projects, ROLES } from "../data/content.js";
import DeviceShowcase from "./DeviceShowcase.jsx";

const linkLabels = {
  site: "Website",
  github: "Source",
  caseStudy: "Case study",
};

const linkOrder = ["site", "github", "caseStudy"];

// a link is either a plain URL string, or { url, label, note } when it needs
// a different name or a caveat (region locks, differently-named store listing)
const asLink = (value) => (typeof value === "string" ? { url: value } : value);

function ProjectLinks({ links }) {
  const available = linkOrder.filter((k) => links?.[k]);
  if (!available.length) return null;

  const notes = available
    .map((k) => asLink(links[k]).note)
    .filter(Boolean);

  return (
    <>
      <div className="project-links">
        {available.map((k) => {
          const { url, label, isPrivate } = asLink(links[k]);
          const text = label || linkLabels[k];

          // no public listing to link to — show it as a locked, inert pill
          if (isPrivate || !url) {
            return (
              <span key={k} className="project-link is-private">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                {text}
                <em>Private</em>
              </span>
            );
          }

          return (
            <a key={k} href={url} target="_blank" rel="noreferrer" className="focus-ring project-link">
              {text}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          );
        })}
      </div>
      {notes.length > 0 && (
        <p className="link-note">{notes.join(" · ")}</p>
      )}
    </>
  );
}

// the badge answers "was this yours?" before anyone reads a word of prose.
// the note sits outside the pill so a long one wraps instead of stretching it
// past the edge of a narrow card
function RoleBadge({ role, note }) {
  const meta = ROLES[role];
  if (!meta) return null;
  return (
    <span className="role-line">
      <span className={`role-badge is-${role}`}>{meta.label}</span>
      {note && <span className="role-note">{note}</span>}
    </span>
  );
}

function Contributions({ items, color }) {
  if (!items?.length) return null;
  return (
    <div className="contributions" style={{ "--accent": `var(--${color})` }}>
      <p className="contributions-label">Some of what I built</p>
      <ul>
        {items.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

function Stack({ items, color }) {
  if (!items?.length) return null;
  return (
    <div className="showcase-stack">
      {items.map((s) => (
        <span key={s} style={{ background: `var(--${color}-soft)` }}>
          {s}
        </span>
      ))}
    </div>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.tier === "featured");
  const more = projects.filter((p) => p.tier === "more");

  // the zigzag counts only rows that actually have a screenshot, so a
  // text-only row in the middle doesn't put two images on the same side
  let mediaSeen = -1;

  return (
    <section id="work" className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">01 / Work</p>
          <h2>What I've been building</h2>
          <p className="sub">
            Every project below says what I actually did on it — sole developer, team lead,
            or the specific pieces I owned.
          </p>
        </div>

        <p className="group-label">
          <span>Recent work</span>
          <em>{featured.length} products, all live</em>
        </p>
      </div>

      {/* ---- flagship platforms: full-width alternating rows ---- */}
      <div className="showcase">
        {featured.map((p, i) => {
          const hasMedia = Boolean(p.images?.length || p.video);
          if (hasMedia) mediaSeen += 1;
          const flipped = hasMedia && mediaSeen % 2 === 1;
          return (
            <motion.article
              key={p.name}
              className={`showcase-row${flipped ? " is-flipped" : ""}`}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className={`showcase-inner container${hasMedia ? "" : " is-textonly"}${
                  p.scrollShot ? " is-scrollrow" : ""
                }`}
              >
                {hasMedia && (
                  <motion.div
                    className={`showcase-media is-web${p.scrollShot ? " is-scroll" : ""}`}
                    style={{ "--tint": `var(--${p.color})` }}
                    initial={false}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <DeviceShowcase
                      images={p.images}
                      video={p.video}
                      name={p.name}
                      kind="web"
                      tint={`var(--${p.color})`}
                      offset={i * 450}
                      scrollShot={p.scrollShot}
                    />
                  </motion.div>
                )}

                <div className="showcase-body">
                  <p className="showcase-index">{String(i + 1).padStart(2, "0")}</p>
                  <h3>{p.name}</h3>
                  <div className="showcase-meta">
                    <RoleBadge role={p.role} note={p.roleNote} />
                    {p.period && <span className="showcase-period">{p.period}</span>}
                  </div>
                  {p.description && <p className="showcase-desc">{p.description}</p>}
                  <Contributions items={p.contributions} color={p.color} />
                  <Stack items={p.stack} color={p.color} />
                  <ProjectLinks links={p.links} />
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="container">
        {/* ---- everything else: text-only cards, no screenshots to show ---- */}
        {more.length > 0 && (
          <div className="web-block">
            <p className="group-label">
              <span>Also built</span>
              <em>{more.length} more, backend and platform work</em>
            </p>

            <div className="card-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))" }}>
              {more.map((p, i) => (
                <motion.article
                  key={p.name}
                  className="sticker card brief-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{ background: `var(--${p.color}-soft)` }}
                >
                  <div className="web-card-head">
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem" }}>{p.name}</h3>
                    {p.period && <span className="showcase-period">{p.period}</span>}
                  </div>
                  <RoleBadge role={p.role} note={p.roleNote} />
                  {p.description && <p className="showcase-desc">{p.description}</p>}
                  <Contributions items={p.contributions} color={p.color} />
                  <Stack items={p.stack} color={p.color} />
                  <ProjectLinks links={p.links} />
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
