import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";
import { profile } from "../data/content.js";
import portrait from "../assets/img.jpg";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#cv", label: "CV" },
  { href: "#contact", label: "Contact" },
];

export default function Nav({ theme, toggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#top");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["top", ...links.map((l) => l.href.slice(1))];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <nav className="container nav-bar">
        <a href="#top" className="focus-ring brand" aria-label={`${profile.name} — home`}>
          <img src={portrait} alt="" className="brand-avatar" />
          <span className="brand-text">
            <strong>
              Ajay<span style={{ color: "var(--violet)" }}>.</span>
            </strong>
            <small>{profile.role}</small>
          </span>
        </a>

        <div className="nav-right">
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`focus-ring nav-link${active === l.href ? " is-active" : ""}`}
                  aria-current={active === l.href ? "page" : undefined}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <span className="nav-divider" aria-hidden="true" />
          <a href={`mailto:${profile.email}`} className="focus-ring nav-cta">
            <span className="status-dot" aria-hidden="true" />
            Available
          </a>
          <ThemeToggle theme={theme} toggle={toggle} />
        </div>
      </nav>
      <span className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    </header>
  );
}
