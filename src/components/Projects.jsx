import { motion } from "framer-motion";
import { projects, ROLES } from "../data/content.js";
import SystemDiagram from "./SystemDiagram.jsx";
import SkillIcon from "./SkillIcon.jsx";

const linkLabels = {
  site: "Website",
  github: "Source",
  docs: "API docs",
  caseStudy: "Case study",
};

const linkOrder = ["site", "github", "docs", "caseStudy"];

// a link is either a plain URL string, or { url, label, note } when it needs
// a different name or a caveat. Most of this work runs inside a client's or an
// employer's network, so `isPrivate` is the common case rather than the odd one
const asLink = (value) => (typeof value === "string" ? { url: value } : value);

function ProjectLinks({ links }) {
  const available = linkOrder.filter((k) => links?.[k]);
  if (!available.length) return null;

  const notes = available.map((k) => asLink(links[k]).note).filter(Boolean);

  return (
    <>
      <div className="project-links">
        {available.map((k) => {
          const { url, label, isPrivate } = asLink(links[k]);
          const text = label || linkLabels[k];

          // nothing public to link to — show it as a locked, inert pill
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
      {notes.length > 0 && <p className="link-note">{notes.join(" · ")}</p>}
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
          <SkillIcon name={s} glyph="code" />
          {s}
        </span>
      ))}
    </div>
  );
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function Projects() {
  return (
    <section id="work" className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">01 / Work</p>
          <h2>Systems I've built</h2>
          <p className="sub">
            Backend work doesn't screenshot, so each one is drawn instead — the services, the
            topics and the stores, and which way the data actually moves. Every one says what I did
            on it: sole developer, team lead, or the specific pieces I owned.
          </p>
        </div>

        <p className="group-label">
          <span>Production systems</span>
          <em>
            {projects.length} systems · Java · Spring Boot · Kafka
          </em>
        </p>
      </div>

      <div className="showcase">
        {projects.map((p, i) => (
          <motion.article
            key={p.name}
            className="sys-row"
            style={{ "--tint": `var(--${p.color})` }}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container">
              <div className="sys-head">
                <p className="showcase-index">{String(i + 1).padStart(2, "0")}</p>
                <div className="sys-title">
                  <h3>{p.name}</h3>
                  {p.tagline && <p className="sys-tagline">{p.tagline}</p>}
                </div>
                <div className="sys-head-meta">
                  <RoleBadge role={p.role} note={p.roleNote} />
                  {p.period && <span className="showcase-period">{p.period}</span>}
                </div>
              </div>

              {p.diagram && (
                <figure className="sys-panel">
                  <SystemDiagram diagram={p.diagram} name={p.name} uid={slug(p.name)} />
                  {(p.diagram.caption || p.diagram.facts) && (
                    <figcaption>
                      {p.diagram.caption}
                      {p.diagram.facts?.length > 0 && (
                        <ul className="sys-facts">
                          {p.diagram.facts.map((f) => (
                            <li key={f.k}>
                              <span className="sys-fact-key">{f.k}</span>
                              <span>{f.v}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </figcaption>
                  )}
                </figure>
              )}

              <div className="sys-body">
                <div className="sys-main">
                  {p.description && <p className="showcase-desc">{p.description}</p>}
                  <Contributions items={p.contributions} color={p.color} />
                </div>
                <div className="sys-aside">
                  <Stack items={p.stack} color={p.color} />
                  <ProjectLinks links={p.links} />
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
