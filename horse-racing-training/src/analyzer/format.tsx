import { useState, type KeyboardEvent, type ReactNode } from "react";
import { bad, cx, figure, good, panel, tip } from "../kit";

export const pc = (v: number, d = 1) => (Number.isFinite(v) ? v.toFixed(d) + "%" : "–");
export const signed = (v: number) => (Number.isFinite(v) ? (v >= 0 ? "+" : "") + pc(v) : "–");
/** Tone class for a signed value: green ≥ 0, red < 0. */
export const cls = (v: number) => (Number.isFinite(v) ? (v >= 0 ? good : bad) : "");
export const vs = (a: number, b: number) => (a >= b ? good : bad);
export const money = (v: number) => (Number.isFinite(v) ? (v < 0 ? "−$" : "$") + Math.abs(Math.round(v)).toLocaleString() : "–");

/**
 * Headline figure card. `info`: an ⓘ beside the label that shows an explanation on hover / focus / tap.
 * `onClick`: the whole card becomes a button (e.g. open the rows behind the figure).
 */
export function Kpi({ label, value, sub, tone = "", info, onClick }: {
  label: string; value: ReactNode; sub: ReactNode; tone?: string; info?: ReactNode; onClick?: () => void;
}) {
  const clickable = onClick
    ? {
        role: "button",
        tabIndex: 0,
        onClick,
        onKeyDown: (e: KeyboardEvent) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onClick()),
      }
    : {};
  return (
    <div
      className={cx(panel, "relative", onClick && "cursor-pointer transition-shadow hover:ring-1 hover:ring-accent/40 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none")}
      {...clickable}
    >
      <div className="flex items-center gap-1 text-xs font-medium text-ink-2">
        {label}
        {info && <InfoTip>{info}</InfoTip>}
      </div>
      <div className={cx(figure, "mt-3 text-[30px] sm:text-[36px]", tone)}>{value}</div>
      <div className="mt-2 text-xs leading-snug text-ink-3">{sub}</div>
    </div>
  );
}

/**
 * ⓘ icon with a popup: hover or keyboard focus on desktop, tap on touch. Clicks don't reach the card.
 * The popup spans the nearest positioned ancestor (the card), so it never runs off a phone screen.
 */
export function InfoTip({ children }: { children: ReactNode }) {
  return (
    <span className="group inline-flex" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
      <button type="button" aria-label="Info" className="inline-flex cursor-help rounded-full text-ink-3 hover:text-ink focus-visible:text-ink focus-visible:outline-none">
        <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
          <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 7v4.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="8" cy="4.8" r="0.9" fill="currentColor" />
        </svg>
      </button>
      <span
        role="tooltip"
        className={cx(
          tip,
          "pointer-events-none invisible absolute inset-x-2 top-10 z-40 min-w-0! font-normal leading-snug text-ink-2 opacity-0 transition-opacity",
          "group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
        )}
      >
        {children}
      </span>
    </span>
  );
}

/** Inline percentage meter for table cells. `narrow` for the two-up breakdown tables. */
export const Bar = ({ v, narrow }: { v: number; narrow?: boolean }) => (
  <span className={cx("inline-block h-1.5 overflow-hidden rounded-full bg-surface-3 align-middle", narrow ? "w-10" : "w-[70px]")}>
    <i className="block h-full bg-accent" style={{ width: `${Number.isFinite(v) ? v : 0}%` }} />
  </span>
);

export const Legend = ({ items }: { items: [string, string][] }) => (
  <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-2">
    {items.map(([color, label]) => (
      <span key={label}>
        <i className="mr-1.5 inline-block size-2.5 rounded-full" style={{ background: color }} />
        {label}
      </span>
    ))}
  </div>
);

/** Click-to-sort state for a table. Same key flips direction; a new key starts ascending. */
export function useSort<K extends string>(initial: K, initialDir: 1 | -1 = -1) {
  const [key, setKey] = useState<K>(initial);
  const [dir, setDir] = useState<1 | -1>(initialDir);
  const toggle = (k: K) => {
    setDir(k === key ? (dir === 1 ? -1 : 1) : 1);
    setKey(k);
  };
  const sort = <R extends Record<K, unknown>>(rows: R[]) =>
    [...rows].sort((a, b) => {
      const x = (a[key] ?? 0) as number | string, y = (b[key] ?? 0) as number | string;
      return (x > y ? 1 : x < y ? -1 : 0) * dir;
    });
  return { key, dir, toggle, sort };
}

export function SortTh<K extends string>({ k, sort, children }: { k: K; sort: { key: K; dir: 1 | -1; toggle: (k: K) => void }; children: ReactNode }) {
  return (
    <th onClick={() => sort.toggle(k)} className="cursor-pointer select-none hover:text-ink!">
      {children}
      {sort.key === k ? (sort.dir === 1 ? " ▲" : " ▼") : ""}
    </th>
  );
}
