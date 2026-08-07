import { motion } from "framer-motion";
import { experience } from "../data/content.js";

export default function Experience() {
  return (
    <section id="experience" className="section" style={{ background: "var(--violet-soft)" }}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">02 / Experience</p>
          <h2>Where I've worked</h2>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.5rem 1.5rem",
                  marginBottom: "1.15rem",
                }}
              >
                <div>
                  <h3 style={{ fontSize: "1.25rem" }}>{job.company}</h3>
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
                <div className="job-meta">
                  <div>{job.period}</div>
                  <div>{job.location}</div>
                </div>
              </div>
              <ul style={{ margin: 0, paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {job.points.map((pt, idx) => (
                  <li key={idx} style={{ color: "var(--ink-soft)", fontSize: "0.95rem" }}>
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
