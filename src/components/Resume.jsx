import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/content.js";

/**
 * The CV itself, on the page. Desktop browsers get the real PDF through
 * <object> — selectable text, sharp at any zoom. Most phones can't render a PDF
 * inline at all, so the fallback inside the object hands them the file instead
 * of leaving an empty grey box.
 *
 * The file is checked before it is embedded. A dev server (and most static
 * hosts) answer a missing path with index.html rather than a 404, and <object>
 * will happily render that — the whole site, nested inside its own CV viewer.
 * A HEAD request that comes back as anything other than a PDF is treated as a
 * missing file, which is what it is.
 */
function usePdfPresent(url) {
  const [state, setState] = useState("checking");

  useEffect(() => {
    let cancelled = false;
    fetch(url, { method: "HEAD" })
      .then((res) => {
        const type = res.headers.get("content-type") || "";
        if (!cancelled) setState(res.ok && type.includes("pdf") ? "ok" : "missing");
      })
      .catch(() => {
        if (!cancelled) setState("missing");
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return state;
}

export default function Resume() {
  const pdf = usePdfPresent(profile.resume.url);

  return (
    <section id="cv" className="section" style={{ background: "var(--gold-soft)" }}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">04 / CV</p>
          <h2>The CV, if you'd rather read it</h2>
          <p className="sub">Two pages. Read it here or take a copy.</p>
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
            {/* a download button that hands back the 404 page is worse than no
                button, so both actions wait until the file is confirmed */}
            {pdf === "ok" && (
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
            )}
          </div>

          {pdf === "ok" ? (
            <object
              className="cv-object"
              data={`${profile.resume.url}#toolbar=0&navpanes=0&view=FitH`}
              type="application/pdf"
              aria-label={`${profile.name} — CV`}
            >
              {/* only rendered where the browser can't display a PDF inline */}
              <div className="cv-fallback">
                <p>Your browser won't show a PDF on the page — the file itself is two pages, and it opens fine.</p>
                <a href={profile.resume.url} download={profile.resume.filename} className="focus-ring cv-btn is-primary">
                  Download the CV
                </a>
              </div>
            </object>
          ) : (
            <div className="cv-fallback" aria-live="polite">
              {pdf === "missing" && (
                <>
                  <p>
                    The CV isn't on the page right now — <code>{profile.resume.url}</code> isn't there.
                    Drop the PDF into <code>public/</code> under that name and it appears here.
                  </p>
                  <a href={`mailto:${profile.email}`} className="focus-ring cv-btn is-primary">
                    Ask me for a copy
                  </a>
                </>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
