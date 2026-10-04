// Liquid-glass on/off switch (Settings, alerts). While pressed the knob swells into a clear lens; it springs
// across on release. A real <button role="switch">, so it's keyboard- and screen-reader-friendly.
import { useState } from "react";
import { motion } from "motion/react";
import { cx } from "./kit";

// Geometry (px): a 64×28 track holding a 38×24 capsule knob, 2px inset.
const TRACK_W = 64, KNOB_W = 38, INSET = 2;
const KNOB_TRAVEL = TRACK_W - KNOB_W - 2 * INSET;
/** Resting knob: frosted white capsule with a top specular edge. */
const knobRest =
  "bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.86))] shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_1px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.16),0_0_0_0.5px_rgba(0,0,0,0.06)]";
/** Pressed knob: clear glass lens over the track — tint shows through, rim and highlight catch the light. */
const knobLens =
  "bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.12))] backdrop-blur-[1.5px] backdrop-saturate-[1.8] shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(255,255,255,0.35),inset_0_0_0_1px_rgba(255,255,255,0.6),0_4px_14px_rgba(0,0,0,0.18)]";

export function Switch({
  checked,
  onChange,
  disabled,
  label,
  describedBy,
  id,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  /** Accessible name when there's no visible <label htmlFor={id}>. */
  label?: string;
  describedBy?: string;
  id?: string;
}) {
  const [pressed, setPressed] = useState(false);
  const release = () => setPressed(false);
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      aria-describedby={describedBy}
      onClick={() => onChange(!checked)}
      onPointerDown={() => !disabled && setPressed(true)}
      onPointerUp={release}
      onPointerLeave={release}
      onPointerCancel={release}
      disabled={disabled}
      style={{ width: TRACK_W }}
      className={cx(
        "relative inline-flex h-7 flex-none cursor-pointer touch-manipulation rounded-full",
        "backdrop-blur-md backdrop-saturate-150 transition-[background-color,box-shadow] duration-300 motion-reduce:transition-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-default disabled:opacity-45",
        checked
          ? "bg-[rgba(52,199,89,0.92)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.12),inset_0_-1px_0_rgba(255,255,255,0.25)]"
          : "bg-[rgba(120,120,128,0.16)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.1),inset_0_0_0_0.5px_rgba(0,0,0,0.05)]"
      )}
    >
      <motion.span
        aria-hidden
        className={cx("absolute rounded-full transition-[background,box-shadow] duration-200", pressed ? knobLens : knobRest)}
        style={{ top: INSET, left: INSET, width: KNOB_W, height: 24 }}
        initial={false}
        animate={{ x: checked ? KNOB_TRAVEL : 0, scaleX: pressed ? 1.32 : 1, scaleY: pressed ? 1.42 : 1 }}
        transition={{ type: "spring", stiffness: 520, damping: 30, mass: 0.8 }}
      />
    </button>
  );
}
