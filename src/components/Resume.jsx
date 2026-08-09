import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/content.js";
import cv1 from "../assets/cv-1.jpg";
import cv2 from "../assets/cv-2.jpg";

const pages = [cv1, cv2];

/**
 * The CV itself, on the page. Desktop browsers get the real PDF through
 * <object> — selectable text, sharp at any zoom. Where that fails (most phones)
 * the rendered pages underneath show instead, which is why they live inside the
 * object rather than beside it.
 */
export default function Resume() {
  const [zoomed, setZoomed] = useState(null);

  return (
    <section id="cv" className="section" style={{ background: "var(--gold-soft)" }}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">04 / CV</p>
          <h2>The whole thing, if you'd rather read it</h2>
          <p className="sub">
            Two pages. Read it here or take a copy — the download is the same PDF.
          </p>
        </div>

        <motion.div
          className="cv-shell sticker"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className="cv-bar">
            <span className="cv-file">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                <path d="M14 3v5h5" />
              </svg>
              {profile.resume.filename}
            </span>
            <div className="cv-actions">
              <a href={profile.resume.url} target="_blank" rel="noreferrer" className="focus-ring cv-btn">
                Open full size
              </a>
              <a
                href={profile.resume.url}
                download={profile.resume.filename}
                className="focus-ring cv-btn is-primary"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" />
                </svg>
                Download PDF
              </a>
            </div>
          </div>

          <object
            className="cv-object"
            data={`${profile.resume.url}#toolbar=0&navpanes=0&view=FitH`}
            type="application/pdf"
            aria-label={`${profile.name} — CV`}
          >
            {/* only rendered where the browser can't display a PDF inline */}
            <div className="cv-pages">
              {pages.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className="focus-ring cv-page"
                  onClick={() => setZoomed(src)}
                  aria-label={`CV page ${i + 1}, tap to enlarge`}
                >
                  <img src={src} alt={`CV page ${i + 1}`} loading="lazy" />
                  <span>Page {i + 1}</span>
                </button>
              ))}
            </div>
          </object>
        </motion.div>
      </div>

      {zoomed && (
        <div className="cv-lightbox" role="dialog" aria-modal="true" onClick={() => setZoomed(null)}>
          <img src={zoomed} alt="CV page, enlarged" />
          <button type="button" className="focus-ring cv-close" onClick={() => setZoomed(null)}>
            Close
          </button>
        </div>
      )}
    </section>
  );
}
