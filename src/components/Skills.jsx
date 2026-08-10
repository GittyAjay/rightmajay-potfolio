import { motion } from "framer-motion";
import { skills } from "../data/content.js";
import SkillIcon, { groupGlyph } from "./SkillIcon.jsx";

const palette = ["violet", "coral", "teal", "gold"];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">03 / Stack</p>
          <h2>What I actually use</h2>
          <p className="sub">
            Not an exhaustive list. These are the ones I'd be comfortable being handed a production
            incident in on day one — and the solid ones are what I'm in most weeks.
          </p>
        </div>
        <div className="card-grid skills-grid">
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
                <h3 className="skill-group-head">{group.group}</h3>
                <div className="skill-chips">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className={`skill-chip${group.core?.includes(item) ? " is-core" : ""}`}
                    >
                      <SkillIcon name={item} glyph={groupGlyph[group.group]} />
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
