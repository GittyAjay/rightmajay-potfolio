import { motion } from "framer-motion";
import { skills } from "../data/content.js";

const palette = ["violet", "coral", "teal", "gold"];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">03 / Stack</p>
          <h2>What I actually use</h2>
          <p className="sub">
            Not an exhaustive list. These are the ones I'd be comfortable being handed a bug in on day one.
          </p>
        </div>
        <div className="card-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))" }}>
          {skills.map((group, i) => {
            const c = palette[i % palette.length];
            return (
              <motion.div
                key={group.group}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.34, 1.56, 0.64, 1] }}
                className="sticker card"
                style={{ background: `var(--${c}-soft)` }}
              >
                <h3 style={{ fontSize: "1.05rem", marginBottom: "1rem" }}>{group.group}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {group.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.78rem",
                        background: "var(--bg-raised)",
                        border: "1.5px solid var(--border)",
                        borderRadius: 999,
                        padding: "0.3rem 0.7rem",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
