// Small hand-rolled SVG charts for the analyzer tabs. All values are percents on a 0–max axis.
import type { ReactNode } from "react";
import type { CalibBucket } from "../../shared/analyzer/model";
import { pc } from "./format";

const W = 560, HT = 260, P = { t: 14, r: 12, b: 34, l: 38 };
const px = (i: number, n: number) => P.l + ((W - P.l - P.r) * i) / n;
const py = (v: number, max: number) => P.t + (HT - P.t - P.b) * (1 - (Number.isFinite(v) ? v : 0) / max);

export interface Series<R> {
  name: string;
  color: string;
  get: (r: R) => number;
}

function Axis({ max, ticks = 5 }: { max: number; ticks?: number }) {
  return (
    <>
      {[...Array(ticks + 1)].map((_, i) => {
        const v = (max / ticks) * i, y = py(v, max);
        return (
          <g key={i}>
            <line x1={P.l} y1={y} x2={W - P.r} y2={y} stroke="currentColor" opacity={0.12} />
            <text x={P.l - 6} y={y + 4} textAnchor="end" fontSize={10} fill="currentColor" opacity={0.55}>
              {Math.round(v)}
            </text>
          </g>
        );
      })}
    </>
  );
}

const Svg = ({ children }: { children: ReactNode }) => (
  <svg viewBox={`0 0 ${W} ${HT}`} role="img">
    {children}
  </svg>
);
export const NoData = ({ msg = "not enough data" }: { msg?: string }) => <div className="empty">{msg}</div>;

export function GroupedBars<R extends { n: number }>({ rows, labelOf, series, max }: { rows: R[]; labelOf: (r: R) => string | number; series: Series<R>[]; max: number }) {
  if (!rows.length) return <NoData />;
  const n = rows.length, band = (W - P.l - P.r) / n, bw = Math.min(16, (band - 6) / series.length);
  return (
    <Svg>
      <Axis max={max} />
      {rows.map((r, i) => {
        const x0 = px(i, n) + (band - bw * series.length) / 2;
        return (
          <g key={i}>
            {series.map((se, j) => {
              const v = se.get(r), y = py(v, max);
              return (
                <rect key={j} x={x0 + j * bw} y={y} width={bw - 2} height={Math.max(0, py(0, max) - y)} fill={se.color} rx={2}>
                  <title>{`${labelOf(r)} · ${se.name} ${pc(v)} (n=${r.n})`}</title>
                </rect>
              );
            })}
            <text x={px(i, n) + band / 2} y={HT - 12} textAnchor="middle" fontSize={10} fill="currentColor" opacity={0.6}>
              {labelOf(r)}
            </text>
          </g>
        );
      })}
    </Svg>
  );
}

export function CalibChart({ buckets, color }: { buckets: CalibBucket[]; color: string }) {
  if (!buckets.length) return <NoData />;
  const max = 100, n = buckets.length, band = (W - P.l - P.r) / n, bw = Math.min(30, band - 10);
  const d = buckets.map((b, i) => `${i ? "L" : "M"}${px(i, n) + band / 2},${py(b.predicted, max)}`).join(" ");
  return (
    <Svg>
      <Axis max={max} />
      <path d={d} fill="none" stroke="currentColor" opacity={0.45} strokeDasharray="5 4" strokeWidth={1.5} />
      {buckets.map((b, i) => {
        const x = px(i, n) + (band - bw) / 2, y = py(b.actual, max);
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={Math.max(0, py(0, max) - y)} fill={color} rx={3} opacity={0.85}>
              <title>{`${b.label}: predicted ${pc(b.predicted)}, actual ${pc(b.actual)} (n=${b.n})`}</title>
            </rect>
            <text x={x + bw / 2} y={HT - 12} textAnchor="middle" fontSize={9.5} fill="currentColor" opacity={0.6}>
              {b.mid}
            </text>
          </g>
        );
      })}
      <text x={W - P.r} y={HT - 1} textAnchor="end" fontSize={10} fill="currentColor" opacity={0.5}>
        predicted % (bucket midpoint)
      </text>
    </Svg>
  );
}

export function LineChart<R extends { key: string; races: number }>({ rows, series, max }: { rows: R[]; series: Series<R>[]; max: number }) {
  if (rows.length < 2) return <NoData msg="need at least two months" />;
  const n = rows.length, step = (W - P.l - P.r) / (n - 1);
  return (
    <Svg>
      <Axis max={max} />
      {series.map((se, j) => (
        <g key={j}>
          <path d={`M${rows.map((r, i) => `${P.l + i * step},${py(se.get(r), max)}`).join(" L")}`} fill="none" stroke={se.color} strokeWidth={2.2} strokeLinejoin="round" />
          {rows.map((r, i) => (
            <circle key={i} cx={P.l + i * step} cy={py(se.get(r), max)} r={3} fill={se.color}>
              <title>{`${r.key} · ${se.name} ${pc(se.get(r))} (n=${r.races})`}</title>
            </circle>
          ))}
        </g>
      ))}
      {rows.map((r, i) =>
        n <= 14 || i % 2 === 0 ? (
          <text key={i} x={P.l + i * step} y={HT - 12} textAnchor="middle" fontSize={9.5} fill="currentColor" opacity={0.6}>
            {r.key.slice(2)}
          </text>
        ) : null
      )}
    </Svg>
  );
}
