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
export default function DeviceShowcase({ images = [], video, name, kind = "phone", tint, offset = 0, scrollShot = false }) {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  // how far a full-page screenshot has to travel to reveal its bottom edge
  const [shift, setShift] = useState(0);
  const ref = useRef(null);
  const videoRef = useRef(null);
  const screenRef = useRef(null);
  const shotRef = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      // fires a little before the frame arrives, so it is already moving by the
      // time the row is actually being looked at
      { threshold: 0.15, rootMargin: "150px 0px" }
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

  // the screenshot is wider than the window, so its scaled height — and with it
  // the scroll distance — changes with the container. Remeasure on both.
  useEffect(() => {
    if (!scrollShot) return;
    const screen = screenRef.current;
    const shot = shotRef.current;
    if (!screen || !shot) return;

    const measure = () => {
      const ratio = shot.naturalHeight / shot.naturalWidth;
      if (!ratio) return;
      const rendered = screen.clientWidth * ratio;
      setShift(Math.max(0, Math.round(rendered - screen.clientHeight)));
    };

    measure();
    shot.addEventListener("load", measure);
    const observer = new ResizeObserver(measure);
    observer.observe(screen);
    return () => {
      shot.removeEventListener("load", measure);
      observer.disconnect();
    };
  }, [scrollShot]);

  const animated = !video && !scrollShot && images.length > 1 && inView && !paused && !prefersReducedMotion();
  // roughly 65px of page per second — slow enough to read a section in passing
  const scrollSeconds = Math.min(46, Math.max(16, Math.round(shift / 65)));
  // deliberately ignores `paused`: the page pan keeps running under the cursor
  const scrolling = scrollShot && inView && shift > 0 && !prefersReducedMotion();

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

        <div
          ref={screenRef}
          className={`device-screen${scrollShot ? " is-scrolling" : ""}`}
          style={scrollShot ? { "--shot-shift": `${-shift}px`, "--shot-duration": `${scrollSeconds}s` } : undefined}
        >
          {scrollShot ? (
            <img
              ref={shotRef}
              src={images[0]}
              alt={`${name} — full page`}
              loading="lazy"
              className={scrolling ? "is-running" : ""}
            />
          ) : video ? (
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
