import { motion } from "framer-motion";

export default function ThemeToggle({ theme, toggle }) {
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      className="focus-ring theme-toggle"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
    >
      <motion.span
        className="theme-knob"
        animate={{ x: isDark ? 24 : 2 }}
        transition={{ type: "spring", stiffness: 480, damping: 32 }}
      >
        <motion.svg
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isDark ? (
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          ) : (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </>
          )}
        </motion.svg>
      </motion.span>
    </button>
  );
}
