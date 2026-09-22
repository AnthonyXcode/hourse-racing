import { useState, type ReactNode } from "react";

export const pc = (v: number, d = 1) => (Number.isFinite(v) ? v.toFixed(d) + "%" : "–");
export const signed = (v: number) => (Number.isFinite(v) ? (v >= 0 ? "+" : "") + pc(v) : "–");
export const cls = (v: number) => (Number.isFinite(v) ? (v >= 0 ? "good" : "bad") : "");
export const vs = (a: number, b: number) => (a >= b ? "good" : "bad");
export const money = (v: number) => (Number.isFinite(v) ? "$" + Math.round(v).toLocaleString() : "–");

export function Kpi({ label, value, sub, tone = "" }: { label: string; value: ReactNode; sub: ReactNode; tone?: string }) {
  return (
    <div className="panel kpi">
      <div className="label">{label}</div>
      <div className={`value ${tone}`}>{value}</div>
      <div className="sub">{sub}</div>
    </div>
  );
}

export const Bar = ({ v }: { v: number }) => (
  <span className="bar">
    <i style={{ width: `${Number.isFinite(v) ? v : 0}%` }} />
  </span>
);

export const Legend = ({ items }: { items: [string, string][] }) => (
  <div className="legend">
    {items.map(([color, label]) => (
      <span key={label}>
        <i style={{ background: color }} />
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
    <th onClick={() => sort.toggle(k)} className="sortable">
      {children}
      {sort.key === k ? (sort.dir === 1 ? " ▲" : " ▼") : ""}
    </th>
  );
}
