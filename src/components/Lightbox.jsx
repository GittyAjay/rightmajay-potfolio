import { useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Full-screen viewer for a screenshot or clip. Rendered into document.body
 * rather than in place: every showcase row sits inside a transformed element
 * (framer-motion, plus the hover lift), and `position: fixed` is measured
 * against the nearest transformed ancestor rather than the viewport — so an
 * in-place overlay would be trapped inside the card.
 */
export default function Lightbox({ src, video, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // the page behind must not scroll while the viewer is open
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <button type="button" className="lightbox-close focus-ring" onClick={onClose} aria-label="Close">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {/* stopPropagation so scrolling or scrubbing the media doesn't dismiss it */}
      <div className="lightbox-scroll" onClick={(e) => e.stopPropagation()}>
        {video ? (
          <video src={video} poster={src} controls autoPlay muted loop playsInline aria-label={alt} />
        ) : (
          <img src={src} alt={alt} />
        )}
      </div>

      <p className="lightbox-hint">Scroll to read · pinch to zoom</p>
    </div>,
    document.body
  );
}
