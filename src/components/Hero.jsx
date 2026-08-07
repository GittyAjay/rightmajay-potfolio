import { motion } from "framer-motion";
import Blobs from "./Blobs.jsx";
import { profile } from "../data/content.js";
import portrait from "../assets/img.jpg";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="section"
      style={{ position: "relative", paddingTop: "clamp(4rem, 10vw, 6.5rem)" }}
    >
      <Blobs />
      <motion.div
        className="container hero-grid"
        variants={container}
        initial="hidden"
        animate="show"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div>
          <motion.p variants={item} className="eyebrow" style={{ marginBottom: "1.25rem" }}>
            Ajay Kumar Pandey · Mumbai
          </motion.p>
          <motion.h1
            variants={item}
            style={{
              fontSize: "clamp(2.4rem, 5.4vw, 3.9rem)",
              lineHeight: 1.05,
            }}
          >
            {profile.tagline}
          </motion.h1>
          <motion.p
            variants={item}
            style={{
              marginTop: "1.5rem",
              fontSize: "1.1rem",
              color: "var(--ink-soft)",
              maxWidth: 520,
            }}
          >
            {profile.blurb}
          </motion.p>
          <motion.div variants={item} style={{ display: "flex", gap: "1rem", marginTop: "2.25rem", flexWrap: "wrap" }}>
            <a
              href="#work"
              className="focus-ring"
              style={{
                background: "var(--violet)",
                color: "white",
                padding: "0.85rem 1.6rem",
                borderRadius: 999,
                fontWeight: 700,
                textDecoration: "none",
                border: "2.5px solid var(--border)",
                boxShadow: "5px 5px 0 rgba(var(--shadow-color), 1)",
                display: "inline-block",
                transition: "transform 0.3s var(--ease-spring), box-shadow 0.3s var(--ease-spring)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-2px, -2px)";
                e.currentTarget.style.boxShadow = "7px 7px 0 rgba(var(--shadow-color), 1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = "5px 5px 0 rgba(var(--shadow-color), 1)";
              }}
            >
              See what I've built
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="focus-ring"
              style={{
                padding: "0.85rem 1.6rem",
                borderRadius: 999,
                fontWeight: 700,
                textDecoration: "none",
                color: "var(--ink)",
                border: "2.5px solid var(--border)",
                display: "inline-block",
              }}
            >
              Email me
            </a>
            <a
              href={profile.resume.url}
              download={profile.resume.filename}
              className="focus-ring hero-resume"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" />
              </svg>
              Download CV
            </a>
          </motion.div>
        </div>

        <motion.div variants={item} className="hero-portrait-wrap">
          <div className="hero-portrait sticker">
            <img src={portrait} alt={`${profile.name}, ${profile.role}`} loading="eager" />
          </div>
          <div className="hero-badge">
            <strong>7+ yrs</strong>
            <span>shipping RN apps</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
