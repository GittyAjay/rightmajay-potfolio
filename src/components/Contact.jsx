import { profile } from "../data/content.js";
import portrait from "../assets/img.jpg";

// one primary action, the rest outlined — the shape is identical, so it lives
// here rather than being spelled out on every anchor
const pill = {
  padding: "0.85rem 1.6rem",
  borderRadius: 999,
  fontWeight: 700,
  textDecoration: "none",
  color: "var(--bg)",
  border: "2px solid var(--bg)",
};

export default function Contact() {
  return (
    <footer id="contact" className="section">
      <div
        className="container sticker"
        style={{
          background: "var(--ink)",
          color: "var(--bg)",
          padding: "clamp(2.5rem, 6vw, 4rem) clamp(1.5rem, 5vw, 4rem)",
          textAlign: "center",
          borderColor: "var(--ink)",
        }}
      >
        <img
          src={portrait}
          alt={profile.name}
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "50% 8%",
            border: "3px solid var(--violet)",
            marginBottom: "1.5rem",
          }}
        />
        <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", color: "var(--bg)" }}>
          Want to talk about a project?
        </h2>
        <p style={{ color: "var(--bg)", opacity: 0.7, marginTop: "1rem", fontSize: "1.05rem" }}>
          Email is the best way to reach me. LinkedIn works too, I check it less often.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem", flexWrap: "wrap" }}>
          <a
            href={`mailto:${profile.email}`}
            className="focus-ring"
            style={{ ...pill, background: "var(--violet)", color: "white", border: "2px solid var(--violet)" }}
          >
            {profile.email}
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="focus-ring" style={pill}>
            LinkedIn
          </a>
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="focus-ring" style={pill}>
            GitHub
          </a>
          <a
            href={profile.resume.url}
            download={profile.resume.filename}
            className="focus-ring"
            style={{ ...pill, border: "2px dashed var(--bg)" }}
          >
            Download CV
          </a>
        </div>
        <p style={{ marginTop: "2.75rem", fontSize: "0.8rem", opacity: 0.5, fontFamily: "var(--font-mono)" }}>
          {profile.phone}
        </p>
      </div>
    </footer>
  );
}
