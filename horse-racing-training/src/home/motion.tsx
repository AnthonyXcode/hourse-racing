// Home page motion: gentle scroll reveals, staggered children and count-up numbers.
// Everything is transform/opacity only. MotionConfig reducedMotion="user" (main.tsx) stills transforms
// for people who ask for reduced motion, and CountUp shows the final value straight away for them.
import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion, type Variants } from "motion/react";

export const EASE = [0.2, 0, 0, 1] as const;

/**
 * True when entrance animations should be skipped: the page was opened in a background tab (no animation
 * frames run there, so content would sit invisible until the tab is shown), or the user prefers reduced motion.
 * Evaluated once at load, so a page opened normally keeps its animations.
 */
const startHidden = typeof document !== "undefined" && document.visibilityState === "hidden";
export function useSkipEntrance() {
  return useReducedMotion() || startHidden;
}

/** Fades and lifts a block into view the first time it scrolls on screen. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const skip = useSkipEntrance();
  return (
    <motion.div
      className={className}
      initial={skip ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Parent / child variants for staggered entrances (use with initial="hidden" whileInView="show"). */
export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});
export const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};
export const slideIn = (from: number): Variants => ({
  hidden: { opacity: 0, x: from },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
});

/** Counts a number up from 0 when it first comes into view; `format` turns it into the displayed text. */
export function CountUp({ value, format, duration = 1.1 }: { value: number | null; format: (v: number | null) => string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useSkipEntrance();
  const [shown, setShown] = useState<number | null>(value == null || reduce ? value : 0);
  useEffect(() => {
    if (value == null || reduce) return setShown(value);
    if (!inView) return;
    const c = animate(0, value, { duration, ease: EASE, onUpdate: setShown });
    return () => c.stop();
  }, [value, inView, reduce, duration]);
  return (
    <span ref={ref} className="tabular-nums">
      {format(shown)}
    </span>
  );
}
