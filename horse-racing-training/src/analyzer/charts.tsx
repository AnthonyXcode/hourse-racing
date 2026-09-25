// Recharts wrappers for the analyzer tabs. All values are percents on a 0–max axis.
import type { ReactElement, ReactNode } from "react";
import {
  Bar, BarChart, CartesianGrid, ComposedChart, Label, Line, LineChart as RLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
  type TooltipProps,
} from "recharts";
import { useTranslation } from "react-i18next";
import type { CalibBucket } from "../../shared/analyzer/model";
import { empty, tip, tipRow } from "../kit";
import { pc } from "./format";

/** Chart colors — hex mirrors of the @theme tokens in index.css (SVG attributes can't read CSS vars). */
export const C = {
  accent: "#0042e6",
  accent2: "#eb6834",
  warn: "#b45309",
  ink: "#23201d",
  muted: "#806d63",
  grid: "#ede8e8",
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

export function GroupedBars<R extends { n: number }>({ rows, labelOf, series, max }: { rows: R[]; labelOf: (r: R) => string | number; series: Series<R>[]; max: number }) {
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
          <Bar key={j} dataKey={`s${j}`} name={s.name} fill={s.color} maxBarSize={16} radius={[4, 4, 0, 0]} isAnimationActive={false} />
        ))}
      </BarChart>
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
