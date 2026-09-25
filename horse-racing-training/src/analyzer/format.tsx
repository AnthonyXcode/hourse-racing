import { useState, type ReactNode } from "react";
import { bad, cx, good, panel } from "../kit";

export const pc = (v: number, d = 1) => (Number.isFinite(v) ? v.toFixed(d) + "%" : "–");
export const signed = (v: number) => (Number.isFinite(v) ? (v >= 0 ? "+" : "") + pc(v) : "–");
/** Tone class for a signed value: green ≥ 0, red < 0. */
export const cls = (v: number) => (Number.isFinite(v) ? (v >= 0 ? good : bad) : "");
export const vs = (a: number, b: number) => (a >= b ? good : bad);
export const money = (v: number) => (Number.isFinite(v) ? "$" + Math.round(v).toLocaleString() : "–");

export function Kpi({ label, value, sub, tone = "" }: { label: string; value: ReactNode; sub: ReactNode; tone?: string }) {
  return (
    <div className={panel}>
      <div className="text-xs uppercase tracking-[.04em] text-muted">{label}</div>
      <div className={cx("mt-1.5 text-[26px] font-semibold tabular-nums", tone)}>{value}</div>
      <div className="mt-1 text-xs text-muted">{sub}</div>
    </div>
  );
}

/** Inline percentage meter for table cells. `narrow` for the two-up breakdown tables. */
export const Bar = ({ v, narrow }: { v: number; narrow?: boolean }) => (
  <span className={cx("inline-block h-2 overflow-hidden rounded-full bg-ink/10 align-middle", narrow ? "w-10" : "w-[70px]")}>
    <i className="block h-full bg-accent" style={{ width: `${Number.isFinite(v) ? v : 0}%` }} />
  </span>
);

export const Legend = ({ items }: { items: [string, string][] }) => (
  <div className="mb-2 flex flex-wrap gap-4 text-xs text-muted">
    {items.map(([color, label]) => (
      <span key={label}>
        <i className="mr-1.5 inline-block size-2.5 rounded-sm" style={{ background: color }} />
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
