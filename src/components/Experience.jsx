import { motion } from "framer-motion";
import { experience } from "../data/content.js";

export default function Experience() {
  return (
    <section id="experience" className="section" style={{ background: "var(--violet-soft)" }}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">02 / Experience</p>
          <h2>Where I've worked</h2>
          <p className="sub">Two companies in seven years.</p>
        </div>

        <div className="stack">
          {experience.map((job, i) => (
            <motion.div
              key={job.company + job.period}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
              className="sticker card"
            >
              <div className="job-head">
                <div className="job-ident">
                  {job.logo && (
                    <a
                      href={job.site}
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={-1}
                      aria-hidden="true"
                      className={`company-logo is-${job.logoBg || "light"}`}
                    >
                      <img src={job.logo} alt="" loading="lazy" />
                    </a>
                  )}
                  <div className="job-ident-text">
                  <h3 style={{ fontSize: "1.25rem" }}>
                    {job.site ? (
                      <a href={job.site} target="_blank" rel="noreferrer" className="focus-ring company-link">
                        {job.company}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M7 17 17 7M9 7h8v8" />
                        </svg>
                      </a>
                    ) : (
                      job.company
                    )}
                  </h3>
                  {job.roles ? (
                    <ol className="role-track">
                      {job.roles.map((r) => (
                        <li key={r.title}>
                          <strong>{r.title}</strong>
                          <span>{r.period}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p style={{ color: "var(--violet)", fontWeight: 700, fontSize: "0.95rem", marginTop: "0.25rem" }}>
                      {job.role}
                    </p>
                  )}
                  </div>
                </div>
                <div className="job-meta">
                  <div>{job.period}</div>
                  <div>{job.location}</div>
                </div>
              </div>

              {job.summary && <p className="job-summary">{job.summary}</p>}

              <ul style={{ margin: 0, paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {job.points.map((pt, idx) => (
                  <li key={idx} style={{ color: "var(--ink-soft)", fontSize: "0.95rem" }}>
                    {pt}
                  </li>
                ))}
              </ul>

              {/* the company → product mapping, which nothing else on the page states */}
              {job.projects?.length > 0 && (
                <div className="job-projects">
                  <p className="job-projects-label">Built here</p>
                  <div className="job-projects-list">
                    {job.projects.map((name) => (
                      <a key={name} href="#work" className="focus-ring job-project-chip">
                        {name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
