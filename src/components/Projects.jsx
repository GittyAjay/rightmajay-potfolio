import { motion } from "framer-motion";
import { projects } from "../data/content.js";
import DeviceShowcase from "./DeviceShowcase.jsx";

const linkLabels = {
  ios: "App Store",
  android: "Google Play",
  site: "Website",
  github: "Source",
  caseStudy: "Case study",
};

const linkOrder = ["ios", "android", "site", "github", "caseStudy"];

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
  const apps = projects.filter((p) => p.shotType === "phone");
  const sites = projects.filter((p) => p.shotType !== "phone");

  // count only the store listings that are actually public
  const isLive = (v) => v && !(typeof v === "object" && (v.isPrivate || !v.url));
  const onIos = apps.filter((p) => isLive(p.links?.ios)).length;
  const onAndroid = apps.filter((p) => isLive(p.links?.android)).length;

  return (
    <section id="work" className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">01 / Work</p>
          <h2>What I've been building</h2>
          <p className="sub">
            Most of these are live on the Play Store or the web. A couple I built on my own, the rest with small teams.
          </p>
        </div>

        <p className="group-label">
          <span>Mobile apps</span>
          <em>
            {apps.length} shipped · {onIos} on the App Store, {onAndroid} on Google Play
          </em>
        </p>
      </div>

      {/* ---- mobile apps: full-width alternating rows ---- */}
      <div className="showcase">
        {apps.map((p, i) => {
          const flipped = i % 2 === 1;
          return (
            <motion.article
              key={p.name}
              className={`showcase-row${flipped ? " is-flipped" : ""}`}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="showcase-inner container">
                <motion.div
                  className="showcase-media is-phone"
                  style={{ "--tint": `var(--${p.color})` }}
                  initial={false}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <DeviceShowcase
                    images={p.images}
                    name={p.name}
                    kind="phone"
                    tint={`var(--${p.color})`}
                    offset={i * 450}
                  />
                </motion.div>

                <div className="showcase-body">
                  <p className="showcase-index">{String(i + 1).padStart(2, "0")}</p>
                  <h3>{p.name}</h3>
                  {p.period && <p className="showcase-period">{p.period}</p>}
                  {p.description && <p className="showcase-desc">{p.description}</p>}
                  <Stack items={p.stack} color={p.color} />
                  <ProjectLinks links={p.links} />
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* ---- web products: two-up grid of browser cards ---- */}
      <div className="container web-block">
        <p className="group-label">
          <span>Web products</span>
          <em>{sites.length} live sites and dashboards</em>
        </p>

        <div className="web-grid">
          {sites.map((p, i) => (
            <motion.article
              key={p.name}
              className="web-card sticker"
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="web-card-media" style={{ "--tint": `var(--${p.color})` }}>
                <DeviceShowcase
                  images={p.images}
                  video={p.video}
                  name={p.name}
                  kind="web"
                  tint={`var(--${p.color})`}
                  offset={i * 450}
                />
              </div>

              <div className="web-card-body">
                <div className="web-card-head">
                  <h3>{p.name}</h3>
                  {p.period && <span className="showcase-period">{p.period}</span>}
                </div>
                {p.description && <p className="showcase-desc">{p.description}</p>}
                <Stack items={p.stack} color={p.color} />
                <ProjectLinks links={p.links} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
