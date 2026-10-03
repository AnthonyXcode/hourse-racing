// Recharts wrappers for the analyzer tabs. All values are percents on a 0–max axis.
import type { ReactElement, ReactNode } from "react";
import {
  Area, Bar, BarChart, CartesianGrid, Cell, ComposedChart, Label, Line, LineChart as RLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
  type TooltipProps,
} from "recharts";
import { useTranslation } from "react-i18next";
import type { CalibBucket } from "../../shared/analyzer/model";
import { empty, tip, tipRow } from "../kit";
import { pc } from "./format";

/** Chart colors — hex mirrors of the @theme tokens in index.css (SVG attributes can't read CSS vars). */
export const C = {
  accent: "#173e96",
  accent2: "#e0a800",
  warn: "#b45309",
  ink: "#333333",
  muted: "#6a6d73",
  grid: "#e7e7e7",
  good: "#1d7a47",
  bad: "#b4232c",
} as const;

const HEIGHT = 260;
const MARGIN = { top: 14, right: 12, bottom: 4, left: -8 };
const TICK = { fontSize: 11, fill: C.muted };

export interface Series<R> {
  name: string;
  color: string;
  get: (r: R) => number;
}

export function NoData({ msg }: { msg?: string }) {
  const { t } = useTranslation();
  return <div className={empty}>{msg ?? t("state.notEnoughData")}</div>;
}

/** Evenly spaced y ticks 0…max. */
const yTicks = (max: number, n = 5) => [...Array(n + 1)].map((_, i) => (max / n) * i);
const finite = (v: number) => (Number.isFinite(v) ? v : 0);

function Frame({ children }: { children: ReactElement }) {
  return (
    <div className="mx-auto w-full max-w-[820px]">
      <ResponsiveContainer width="100%" height={HEIGHT}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}

function yAxis(max: number) {
  return (
    <YAxis
      type="number"
      domain={[0, max]}
      ticks={yTicks(max)}
      tickFormatter={(v: number) => `${Math.round(v)}`}
      tick={TICK}
      axisLine={false}
      tickLine={false}
      allowDataOverflow
    />
  );
}

/** Tooltip body: a heading and one swatch row per entry. */
function Tip({ head, rows }: { head: ReactNode; rows: { color: string; label: string; value: string; dash?: boolean }[] }) {
  return (
    <div className={tip}>
      <div className="mb-1 text-ink-2">{head}</div>
      {rows.map((r) => (
        <div key={r.label} className={tipRow}>
          <i
            className="inline-block h-2 w-3 flex-none rounded-sm"
            style={r.dash ? { borderTop: `2px dashed ${r.color}`, height: 0 } : { background: r.color }}
          />
          <span className="flex-1 text-ink-2">{r.label}</span>
          <b className="tabular-nums">{r.value}</b>
        </div>
      ))}
    </div>
  );
}

// ---------------- grouped bars ----------------

/** Grouped bars. Optional drill-down: `onSelect(rowIndex, seriesIndex)` on bar click; `selected` keeps that bar
 *  at full strength and dims the others. */
export function GroupedBars<R extends { n: number }>({ rows, labelOf, series, max, onSelect, selected }: {
  rows: R[];
  labelOf: (r: R) => string | number;
  series: Series<R>[];
  max: number;
  onSelect?: (row: number, series: number) => void;
  selected?: { row: number; series: number } | null;
}) {
  const { t } = useTranslation();
  if (!rows.length) return <NoData />;
  const data = rows.map((r) => ({ label: labelOf(r), n: r.n, ...Object.fromEntries(series.map((s, j) => [`s${j}`, finite(s.get(r))])) }));
  return (
    <Frame>
      <BarChart data={data} margin={MARGIN} barGap={2} barCategoryGap="20%">
        <CartesianGrid stroke={C.grid} vertical={false} />
        <XAxis dataKey="label" tick={TICK} tickLine={false} axisLine={{ stroke: C.grid }} interval={0} />
        {yAxis(max)}
        <Tooltip
          cursor={{ fill: C.ink, fillOpacity: 0.04 }}
          isAnimationActive={false}
          content={({ active, payload }: TooltipProps<number, string>) => {
            if (!active || !payload?.length) return null;
            const d = payload[0]!.payload as (typeof data)[number];
            return <Tip head={`${d.label} · ${t("unit.n", { n: d.n })}`} rows={series.map((s, j) => ({ color: s.color, label: s.name, value: pc(Number((d as Record<string, unknown>)[`s${j}`])) }))} />;
          }}
        />
        {series.map((s, j) => (
          <Bar
            key={j}
            dataKey={`s${j}`}
            name={s.name}
            fill={s.color}
            maxBarSize={16}
            radius={[4, 4, 0, 0]}
            isAnimationActive={false}
            cursor={onSelect ? "pointer" : undefined}
            onClick={onSelect ? (_: unknown, i: number) => onSelect(i, j) : undefined}
          >
            {selected &&
              data.map((_, i) => <Cell key={i} fillOpacity={selected.row === i && selected.series === j ? 1 : 0.3} />)}
          </Bar>
        ))}
      </BarChart>
    </Frame>
  );
}

// ---------------- hit vs implied ----------------

/**
 * Actual hit rate (solid line) against the market-implied rate (dashed) per row, with the gap between
 * them shaded — the edge. Rows with no runners leave a gap. `onSelect(rowIndex)` when a row is clicked.
 * `tickOf`: a shorter x-axis label (the tooltip keeps `labelOf`).
 */
export function EdgeChart<R extends { n: number }>({ rows, labelOf, tickOf, hit, implied, color, hitName, impliedName, edgeName, onSelect }: {
  rows: R[];
  labelOf: (r: R) => string;
  tickOf?: (r: R) => string;
  hit: (r: R) => number;
  implied: (r: R) => number;
  color: string;
  hitName: string;
  impliedName: string;
  edgeName: string;
  onSelect?: (row: number) => void;
}) {
  const { t } = useTranslation();
  const data = rows.map((r) => {
    const h = r.n ? hit(r) : NaN, p = r.n ? implied(r) : NaN;
    const ok = Number.isFinite(h) && Number.isFinite(p);
    return { label: labelOf(r), tick: (tickOf ?? labelOf)(r), n: r.n, hit: ok ? h : null, implied: ok ? p : null, gap: ok ? [Math.min(h, p), Math.max(h, p)] : null };
  });
  const vals = data.flatMap((d) => [d.hit ?? 0, d.implied ?? 0]);
  if (!data.some((d) => d.hit != null)) return <NoData />;
  const max = Math.max(10, Math.ceil((Math.max(...vals) * 1.1) / 10) * 10);
  return (
    <Frame>
      <ComposedChart
        data={data}
        margin={{ ...MARGIN, right: 22 }} // room for the last tick ("≥+30%")
        onClick={onSelect ? (s: { activeTooltipIndex?: number } | null) => s?.activeTooltipIndex != null && data[s.activeTooltipIndex]!.n > 0 && onSelect(s.activeTooltipIndex) : undefined}
        style={onSelect ? { cursor: "pointer" } : undefined}
      >
        <CartesianGrid stroke={C.grid} vertical={false} />
        <XAxis dataKey="tick" tick={TICK} tickLine={false} axisLine={{ stroke: C.grid }} interval={0} />
        {yAxis(max)}
        <Tooltip
          cursor={{ fill: C.ink, fillOpacity: 0.04 }}
          isAnimationActive={false}
          content={({ active, payload }: TooltipProps<number, string>) => {
            if (!active || !payload?.length) return null;
            const d = payload[0]!.payload as (typeof data)[number];
            const edge = d.hit != null && d.implied != null ? d.hit - d.implied : NaN;
            return (
              <Tip
                head={`${d.label} · ${t("unit.n", { n: d.n })}`}
                rows={[
                  { color, label: hitName, value: pc(d.hit ?? NaN) },
                  { color: C.muted, label: impliedName, value: pc(d.implied ?? NaN), dash: true },
                  { color: edge >= 0 ? C.good : C.bad, label: edgeName, value: Number.isFinite(edge) ? `${edge >= 0 ? "+" : ""}${edge.toFixed(1)}` : "–" },
                ]}
              />
            );
          }}
        />
        <Area dataKey="gap" stroke="none" fill={color} fillOpacity={0.12} connectNulls={false} isAnimationActive={false} activeDot={false} />
        <Line dataKey="implied" stroke={C.muted} strokeWidth={1.5} strokeDasharray="5 4" dot={{ r: 2.5, fill: C.muted, strokeWidth: 0 }} activeDot={false} connectNulls={false} isAnimationActive={false} />
        <Line
          dataKey="hit"
          stroke={color}
          strokeWidth={2}
          dot={{ r: 3.5, fill: color, stroke: "#fff", strokeWidth: 1 }}
          activeDot={{ r: 5, fill: color, stroke: "#fff", strokeWidth: 2 }}
          connectNulls={false}
          isAnimationActive={false}
        />
      </ComposedChart>
    </Frame>
  );
}

// ---------------- calibration ----------------

/** Actual hit rate per predicted-probability bucket (bars) against perfect calibration (dashed line). */
export function CalibChart({ buckets, color }: { buckets: CalibBucket[]; color: string }) {
  const { t } = useTranslation(["common", "analyzer"]);
  if (!buckets.length) return <NoData />;
  const data = buckets.map((b) => ({ mid: b.mid, label: b.label, n: b.n, actual: finite(b.actual), predicted: finite(b.predicted) }));
  return (
    <Frame>
      <ComposedChart data={data} margin={{ ...MARGIN, bottom: 18 }}>
        <CartesianGrid stroke={C.grid} vertical={false} />
        <XAxis dataKey="mid" tick={TICK} tickLine={false} axisLine={{ stroke: C.grid }} interval={0}>
          <Label value={t("analyzer:chart.calibAxis")} position="insideBottom" offset={-14} style={{ fontSize: 11, fill: C.muted }} />
        </XAxis>
        {yAxis(100)}
        <Tooltip
          cursor={{ fill: C.ink, fillOpacity: 0.04 }}
          isAnimationActive={false}
          content={({ active, payload }: TooltipProps<number, string>) => {
            if (!active || !payload?.length) return null;
            const d = payload[0]!.payload as (typeof data)[number];
            return (
              <Tip
                head={`${d.label} · ${t("unit.n", { n: d.n })}`}
                rows={[
                  { color, label: t("analyzer:chart.actual"), value: pc(d.actual) },
                  { color: C.muted, label: t("analyzer:chart.predicted"), value: pc(d.predicted), dash: true },
                ]}
              />
            );
          }}
        />
        <Bar dataKey="actual" fill={color} maxBarSize={24} radius={[4, 4, 0, 0]} isAnimationActive={false} />
        <Line dataKey="predicted" stroke={C.muted} strokeWidth={1.5} strokeDasharray="5 4" dot={false} activeDot={false} isAnimationActive={false} />
      </ComposedChart>
    </Frame>
  );
}

// ---------------- monthly lines ----------------

export function LineChart<R extends { key: string; races: number }>({ rows, series, max }: { rows: R[]; series: Series<R>[]; max: number }) {
  const { t } = useTranslation();
  if (rows.length < 2) return <NoData msg={t("state.needTwoMonths")} />;
  const data = rows.map((r) => ({ key: r.key, races: r.races, ...Object.fromEntries(series.map((s, j) => [`s${j}`, finite(s.get(r))])) }));
  return (
    <Frame>
      <RLineChart data={data} margin={{ ...MARGIN, right: 18 }}>
        <CartesianGrid stroke={C.grid} vertical={false} />
        <XAxis
          dataKey="key"
          tick={TICK}
          tickLine={false}
          axisLine={{ stroke: C.grid }}
          tickFormatter={(k: string) => k.slice(2)}
          interval={rows.length <= 14 ? 0 : 1}
        />
        {yAxis(max)}
        <Tooltip
          cursor={{ stroke: C.muted, strokeWidth: 1 }}
          isAnimationActive={false}
          content={({ active, payload }: TooltipProps<number, string>) => {
            if (!active || !payload?.length) return null;
            const d = payload[0]!.payload as (typeof data)[number];
            return <Tip head={`${d.key} · ${t("unit.n", { n: d.races })}`} rows={series.map((s, j) => ({ color: s.color, label: s.name, value: pc(Number((d as Record<string, unknown>)[`s${j}`])) }))} />;
          }}
        />
        {series.map((s, j) => (
          <Line
            key={j}
            dataKey={`s${j}`}
            name={s.name}
            stroke={s.color}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            dot={{ r: 3, fill: s.color, stroke: "#fff", strokeWidth: 1 }}
            activeDot={{ r: 5, fill: s.color, stroke: "#fff", strokeWidth: 2 }}
            isAnimationActive={false}
          />
        ))}
      </RLineChart>
    </Frame>
  );
}
