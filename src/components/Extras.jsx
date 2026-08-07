import { motion } from "framer-motion";
import { achievements, education } from "../data/content.js";

export default function Extras() {
  return (
    <section className="section section-tight">
      <div className="container card-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="sticker card"
          style={{ background: "var(--gold-soft)" }}
        >
          <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Achievements</p>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {achievements.map((a) => (
              <li key={a.title}>
                <strong style={{ fontSize: "0.95rem" }}>{a.title}</strong>
                <p style={{ color: "var(--ink-soft)", fontSize: "0.85rem", marginTop: "0.15rem" }}>{a.detail}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.34, 1.56, 0.64, 1] }}
          className="sticker card"
          style={{ background: "var(--teal-soft)" }}
        >
          <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Education</p>
          <strong style={{ fontSize: "0.95rem" }}>{education.degree}</strong>
          <p style={{ color: "var(--ink-soft)", fontSize: "0.85rem", marginTop: "0.3rem" }}>
            {education.school}, {education.location}
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--ink-soft)", marginTop: "0.5rem" }}>
            {education.period}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
