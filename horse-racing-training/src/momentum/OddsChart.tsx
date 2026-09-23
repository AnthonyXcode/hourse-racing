// Win-odds time-series for one race (Recharts). x = minutes to post (left → right toward
// the off), y = win odds on an inverted log scale, so a shortening price (money coming) rises.
import { useMemo } from "react";
import {
  CartesianGrid, Label, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis,
  type TooltipProps,
} from "recharts";
import { impliedProbs, pointAt, RECENT_SECS, type RaceSeries } from "../../shared/momentum/model";
import { NoData } from "../analyzer/charts";

// Validated categorical palette (dataviz reference, light). Fixed order, never cycled:
// horses 9+ reuse a hue with a dashed stroke, so identity is hue + dash, stable per horse.
const PALETTE = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300", "#4a3aa7", "#e34948"];
export function horseStyle(n: number): { color: string; dash?: string } {
  const i = (n - 1) % PALETTE.length;
  return { color: PALETTE[i]!, dash: n > PALETTE.length ? "6 3" : undefined };
}

const TICKS = [1, 1.5, 2, 3, 5, 8, 12, 20, 35, 60, 99, 200, 500, 999];
const INK = "#15181d", MUTED = "#6b7280", GRID = "#e4e7ec";

type Row = { m: number } & Record<string, number>; // m = minutes before post (negative)

export function OddsChart({ series, focus, onFocus }: { series: RaceSeries; focus: number | null; onFocus: (h: number | null) => void }) {
  const { rows, lo, hi, xMin } = useMemo(() => {
    // h<N> = win odds; r<N> = last-5-min move at that moment (for the tooltip).
    const rows: Row[] = series.points.map((p) => {
      const r: Row = { m: -p.secsToPost / 60 } as Row;
      for (const [h, o] of Object.entries(p.win)) r[`h${h}`] = o;
      const before = pointAt(series.points, p.secsToPost + RECENT_SECS);
      if (before && before !== p) {
        const p0 = impliedProbs(before.win), p1 = impliedProbs(p.win);
        for (const h of Object.keys(p1)) if (p0[+h]) r[`r${h}`] = (p1[+h]! - p0[+h]!) / p0[+h]!;
      }
      return r;
    });
    const all = series.points.flatMap((p) => Object.values(p.win));
    return {
      rows,
      // Snap the domain out to the nearest ticks so both ends are labelled.
      lo: [...TICKS].reverse().find((t) => t <= Math.min(...all)) ?? 1,
      hi: TICKS.find((t) => t >= Math.max(...all)) ?? 999,
      xMin: Math.min(-30, Math.floor(rows[0]?.m ?? -30)),
    };
  }, [series]);

  if (rows.length < 2) return <NoData msg={rows.length ? "waiting for a second snapshot…" : "no snapshots yet"} />;
  const names = new Map(series.runners.map((r) => [r.horseNo, r.name]));
  const last = rows.length - 1;
  const xMax = Math.max(0, Math.ceil(rows[last]!.m));

  return (
    <ResponsiveContainer width="100%" height={380}>
      <LineChart data={rows} margin={{ top: 12, right: 36, bottom: 28, left: 16 }} onMouseLeave={() => onFocus(null)}>
        <CartesianGrid stroke={GRID} vertical={false} />
        <XAxis
          dataKey="m"
          type="number"
          domain={[xMin, xMax]}
          ticks={range(xMin, xMax, 5)}
          tickFormatter={(m: number) => (m === 0 ? "off" : `${m}`)}
          tick={{ fontSize: 11, fill: MUTED }}
          stroke={GRID}
        >
          <Label value="Minutes to post time" position="bottom" offset={10} style={{ fontSize: 12, fill: INK, fontWeight: 600 }} />
        </XAxis>
        <YAxis
          scale="log"
          domain={[lo, hi]}
          reversed
          allowDataOverflow
          ticks={TICKS.filter((t) => t >= lo && t <= hi)}
          tick={{ fontSize: 11, fill: MUTED }}
          stroke={GRID}
          width={44}
        >
          <Label value="Win odds (log scale)" angle={-90} position="insideLeft" offset={-4} style={{ fontSize: 12, fill: INK, fontWeight: 600, textAnchor: "middle" }} />
        </YAxis>
        <ReferenceLine x={0} stroke={MUTED} strokeDasharray="4 3" />
        <Tooltip content={<OddsTooltip names={names} focus={focus} />} cursor={{ stroke: MUTED, strokeWidth: 1 }} isAnimationActive={false} />
        {series.runners.map(({ horseNo }) => {
          const { color, dash } = horseStyle(horseNo);
          const dim = focus != null && focus !== horseNo;
          return (
            <Line
              key={horseNo}
              dataKey={`h${horseNo}`}
              name={`${horseNo}`}
              stroke={color}
              strokeDasharray={dash}
              strokeWidth={focus === horseNo ? 3 : 2}
              strokeOpacity={dim ? 0.15 : 1}
              dot={false}
              activeDot={dim ? false : { r: 4, stroke: "#fff", strokeWidth: 2 }}
              connectNulls
              isAnimationActive={false}
              onMouseEnter={() => onFocus(horseNo)}
              label={(p: { index: number; x: number; y: number; value?: number }) =>
                p.index === last && p.value != null ? (
                  <text key={horseNo} x={p.x + 6} y={p.y + 4} fontSize={11} fontWeight={600} fill={INK} opacity={dim ? 0.2 : 1}>
                    {horseNo}
                  </text>
                ) : (
                  <g key={`${horseNo}-${p.index}`} />
                )
              }
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}

function range(from: number, to: number, step: number): number[] {
  const out: number[] = [];
  for (let v = Math.ceil(from / step) * step; v <= to; v += step) out.push(v);
  return out;
}

function OddsTooltip({ active, payload, label, names, focus }: TooltipProps<number, string> & { names: Map<number, string>; focus: number | null }) {
  if (!active || !payload?.length) return null;
  const row = payload[0]!.payload as Row;
  const move = (h: number): number | undefined => row[`r${h}`];
  // Biggest last-5-min steamer first; horses without a 5-min history go last, by odds.
  const items = [...payload]
    .filter((p) => p.value != null)
    .sort((a, b) => {
      const x = move(Number(a.name)), y = move(Number(b.name));
      if (x == null || y == null) return x == null ? (y == null ? Number(a.value) - Number(b.value) : 1) : -1;
      return y - x;
    });
  const m = Number(label);
  return (
    <div className="mo-tip">
      <div className="mo-tip-head">
        <span>{m >= 0 ? (m === 0 ? "at the off" : `${m.toFixed(1)} min after post`) : `${(-m).toFixed(1)} min to post`}</span>
        <span>odds · last 5m</span>
      </div>
      {items.map((p) => {
        const h = Number(p.name);
        const { color, dash } = horseStyle(h);
        return (
          <div key={h} className={`mo-tip-row${focus === h ? " on" : ""}`}>
            <Swatch color={color} dash={dash} />
            <span className="n">{h}</span>
            <span className="name">{names.get(h) ?? ""}</span>
            <b>{p.value}</b>
            <span className={`mv ${move(h) == null ? "" : move(h)! >= 0 ? "good" : "bad"}`}>
              {move(h) == null ? "–" : `${move(h)! >= 0 ? "+" : ""}${(100 * move(h)!).toFixed(1)}%`}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/** Line-sample key: hue + dash, matching the chart stroke. */
export function Swatch({ color, dash }: { color: string; dash?: string }) {
  return (
    <svg width={18} height={8} className="swatch" aria-hidden>
      <line x1={1} y1={4} x2={17} y2={4} stroke={color} strokeWidth={2.5} strokeDasharray={dash ? "4 3" : undefined} strokeLinecap={dash ? "butt" : "round"} />
    </svg>
  );
}
