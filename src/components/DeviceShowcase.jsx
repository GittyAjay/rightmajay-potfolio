import { useEffect, useRef, useState } from "react";

const CYCLE_MS = 2800;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Screenshots inside a phone (or browser) frame, cycling on their own like a
 * short clip. The timer only runs while the frame is on screen, and stays put
 * entirely if the visitor asked for reduced motion.
 */
export default function DeviceShowcase({ images = [], video, name, kind = "phone", tint, offset = 0 }) {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // the video is never fetched until it scrolls into view, then pauses on exit
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView && !prefersReducedMotion()) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [inView]);

  const animated = !video && images.length > 1 && inView && !paused && !prefersReducedMotion();

  useEffect(() => {
    if (!animated) return;
    // stagger each project so the whole page doesn't flip in unison
    const start = setTimeout(() => {
      setIndex((i) => (i + 1) % images.length);
    }, CYCLE_MS + offset);
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, CYCLE_MS);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [animated, images.length, offset]);

  if (!images.length && !video) return null;

  const isPhone = kind === "phone";

  return (
    <div
      ref={ref}
      className={`device device-${kind}`}
      style={{ "--tint": tint }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="device-frame">
        {isPhone ? <span className="device-notch" aria-hidden="true" /> : (
          <span className="device-bar" aria-hidden="true">
            <i /><i /><i />
          </span>
        )}

        <div className="device-screen">
          {video ? (
            <video
              ref={videoRef}
              src={video}
              poster={images[0]}
              muted
              loop
              playsInline
              preload="none"
              aria-label={`${name} walkthrough`}
            />
          ) : (
            images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={i === 0 ? `${name} screenshot` : ""}
                aria-hidden={i === 0 ? undefined : true}
                loading={i === 0 ? "eager" : "lazy"}
                className={i === index ? "is-current" : ""}
              />
            ))
          )}
        </div>
      </div>

      {!video && images.length > 1 && (
        <div className="device-progress" role="presentation">
          {images.map((src, i) => (
            <span key={src} className={i === index ? "is-active" : ""}>
              <i style={{ animationDuration: `${CYCLE_MS}ms`, animationPlayState: animated ? "running" : "paused" }} />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
