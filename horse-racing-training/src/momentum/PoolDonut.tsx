// Estimated split of the WIN (or PLACE) pool across runners at the latest snapshot.
// HKJC doesn't publish per-runner investment, but in a parimutuel pool a runner's share
// of the money ∝ 1 / its odds, so share_i = (1/odds_i) / Σ(1/odds_j) and $ = share × pool.
import { useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, type TooltipProps } from "recharts";
import { impliedProbs, type RaceSeries } from "../../shared/momentum/model";
import { Swatch, horseStyle } from "./OddsChart";

interface Slice {
  horseNo: number;
  name: string;
  odds: number;
  share: number;
  amount: number | null;
}

const money = (v: number) => "$" + Math.round(v).toLocaleString();

export function PoolDonut({ series, focus, onFocus }: { series: RaceSeries; focus: number | null; onFocus: (h: number | null) => void }) {
  const [pool, setPool] = useState<"win" | "pla">("win");
  const last = series.points[series.points.length - 1]!;
  const total = pool === "win" ? last.winPool : last.plaPool;

  const slices = useMemo<Slice[]>(() => {
    const odds = last[pool];
    const share = impliedProbs(odds);
    const names = new Map(series.runners.map((r) => [r.horseNo, r.name]));
    return Object.keys(share)
      .map(Number)
      .sort((a, b) => a - b) // fixed order round the ring, so slices don't jump between refreshes
      .map((h) => ({ horseNo: h, name: names.get(h) ?? "", odds: odds[h]!, share: share[h]!, amount: total ? share[h]! * total : null }));
  }, [last, pool, total, series.runners]);

  return (
    <div className="panel">
      <div className="mo-head">
        <h3>Pool split</h3>
        <div className="seg" role="group" aria-label="Pool">
          <button className={pool === "win" ? "on" : ""} onClick={() => setPool("win")}>Win</button>
          <button className={pool === "pla" ? "on" : ""} onClick={() => setPool("pla")}>Place</button>
        </div>
      </div>
      <div className="donut">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <defs>
              {slices.filter((s) => horseStyle(s.horseNo).dash).map((s) => (
                <pattern key={s.horseNo} id={`hatch-${s.horseNo}`} width={6} height={6} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect width={6} height={6} fill={horseStyle(s.horseNo).color} opacity={0.45} />
                  <line x1={0} y1={0} x2={0} y2={6} stroke={horseStyle(s.horseNo).color} strokeWidth={3} />
                </pattern>
              ))}
            </defs>
            <Pie
              data={slices}
              dataKey="share"
              nameKey="horseNo"
              innerRadius="58%"
              outerRadius="92%"
              startAngle={90}
              endAngle={-270}
              stroke="#fff"
              strokeWidth={2}
              isAnimationActive={false}
              labelLine={false}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, payload }) => {
                const s = payload as Slice;
                if (s.share < 0.045) return null; // too thin to label; the tooltip and table cover it
                const r = (innerRadius + outerRadius) / 2, a = (-midAngle * Math.PI) / 180;
                return (
                  <text x={cx + r * Math.cos(a)} y={cy + r * Math.sin(a)} textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700} fill="#fff" style={{ paintOrder: "stroke", stroke: "rgba(0,0,0,.35)", strokeWidth: 2 }}>
                    {s.horseNo}
                  </text>
                );
              }}
              onMouseEnter={(_, i) => onFocus(slices[i]!.horseNo)}
              onMouseLeave={() => onFocus(null)}
            >
              {slices.map((s) => {
                const { color, dash } = horseStyle(s.horseNo);
                return <Cell key={s.horseNo} fill={dash ? `url(#hatch-${s.horseNo})` : color} opacity={focus != null && focus !== s.horseNo ? 0.25 : 1} />;
              })}
            </Pie>
            <Tooltip content={<DonutTip pool={pool} />} isAnimationActive={false} />
          </PieChart>
        </ResponsiveContainer>
        <div className="donut-center" aria-hidden>
          <small>{pool === "win" ? "Win" : "Place"} pool</small>
          <b>{total ? money(total) : "–"}</b>
        </div>
      </div>
      <div className="note">
        Estimated from the latest odds: a runner's share of the pool is proportional to 1 / its odds. Striped slices are horses 9 and up.
      </div>
    </div>
  );
}

function DonutTip({ active, payload, pool }: TooltipProps<number, string> & { pool: "win" | "pla" }) {
  if (!active || !payload?.length) return null;
  const s = payload[0]!.payload as Slice;
  return (
    <div className="mo-tip">
      <div className="mo-tip-row">
        <Swatch {...horseStyle(s.horseNo)} />
        <span className="n">{s.horseNo}</span>
        <span className="name">{s.name}</span>
      </div>
      <div className="mo-tip-row">
        <span className="name">{pool === "win" ? "Win" : "Place"} odds</span>
        <b>{s.odds}</b>
      </div>
      <div className="mo-tip-row">
        <span className="name">Share of pool</span>
        <b>{(100 * s.share).toFixed(1)}%</b>
      </div>
      {s.amount != null && (
        <div className="mo-tip-row">
          <span className="name">Est. amount</span>
          <b>{money(s.amount)}</b>
        </div>
      )}
    </div>
  );
}
