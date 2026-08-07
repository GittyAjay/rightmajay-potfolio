import { profile } from "../data/content.js";
import portrait from "../assets/img.jpg";

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
          Email is the surest way to reach me. LinkedIn works too, I just check it less.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem", flexWrap: "wrap" }}>
          <a
            href={`mailto:${profile.email}`}
            className="focus-ring"
            style={{
              background: "var(--violet)",
              color: "white",
              padding: "0.85rem 1.6rem",
              borderRadius: 999,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            {profile.email}
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="focus-ring"
            style={{
              padding: "0.85rem 1.6rem",
              borderRadius: 999,
              fontWeight: 700,
              textDecoration: "none",
              color: "var(--bg)",
              border: "2px solid var(--bg)",
            }}
          >
            LinkedIn
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="focus-ring"
            style={{
              padding: "0.85rem 1.6rem",
              borderRadius: 999,
              fontWeight: 700,
              textDecoration: "none",
              color: "var(--bg)",
              border: "2px solid var(--bg)",
            }}
          >
            GitHub
          </a>
          <a
            href={profile.links.site}
            target="_blank"
            rel="noreferrer"
            className="focus-ring"
            style={{
              padding: "0.85rem 1.6rem",
              borderRadius: 999,
              fontWeight: 700,
              textDecoration: "none",
              color: "var(--bg)",
              border: "2px solid var(--bg)",
            }}
          >
            r8majay.web.app
          </a>
        </div>
        <p style={{ marginTop: "2.75rem", fontSize: "0.8rem", opacity: 0.5, fontFamily: "var(--font-mono)" }}>
          {profile.phone} · Built with React
        </p>
      </div>
    </footer>
  );
}
