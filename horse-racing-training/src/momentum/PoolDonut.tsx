// Estimated split of the WIN (or PLACE) pool across runners at the latest snapshot.
// HKJC doesn't publish per-runner investment, but in a parimutuel pool a runner's share
// of the money ∝ 1 / its odds, so share_i = (1/odds_i) / Σ(1/odds_j) and $ = share × pool.
import { useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, type TooltipProps } from "recharts";
import { impliedProbs, type RaceSeries } from "../../shared/momentum/model";
import { useTranslation } from "react-i18next";
import { Swatch, horseStyle, useMediaQuery, useRunnerNames } from "./OddsChart";
import { cx, figure, h3, note, panel, seg, segBtn, tip, tipRow } from "../kit";

interface Slice {
  horseNo: number;
  name: string;
  odds: number;
  share: number;
  amount: number | null;
}

const money = (v: number) => "$" + Math.round(v).toLocaleString();

export function PoolDonut({ series, focus, onFocus }: { series: RaceSeries; focus: number | null; onFocus: (h: number | null) => void }) {
  const { t } = useTranslation("momentum");
  const nameOf = useRunnerNames(series);
  const [pool, setPool] = useState<"win" | "pla">("win");
  const wide = useMediaQuery("(min-width: 640px)");
  const last = series.points[series.points.length - 1]!;
  const total = pool === "win" ? last.winPool : last.plaPool;

  const slices = useMemo<Slice[]>(() => {
    const odds = last[pool];
    const share = impliedProbs(odds);
    return Object.keys(share)
      .map(Number)
      .sort((a, b) => a - b) // fixed order round the ring, so slices don't jump between refreshes
      .map((h) => ({ horseNo: h, name: nameOf(h), odds: odds[h]!, share: share[h]!, amount: total ? share[h]! * total : null }));
  }, [last, pool, total, nameOf]);

  return (
    <div className={panel}>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <h3 className={cx(h3, "mb-0")}>{t("pool.title")}</h3>
        <div className={cx(seg, "ml-auto")} role="group" aria-label={t("pool.pool")}>
          <button className={segBtn(pool === "win")} onClick={() => setPool("win")}>{t("pool.win")}</button>
          <button className={segBtn(pool === "pla")} onClick={() => setPool("pla")}>{t("pool.place")}</button>
        </div>
      </div>
      <div className="relative">
        <ResponsiveContainer width="100%" height={wide ? 260 : 240}>
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
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center" aria-hidden>
          <small className="text-xs text-ink-3">{pool === "win" ? t("pool.winPool") : t("pool.placePool")}</small>
          <b className={cx(figure, "mt-1 text-[20px] font-normal sm:text-[22px]")}>{total ? money(total) : "–"}</b>
        </div>
      </div>
      <div className={note}>
        {t("pool.note")}
      </div>
    </div>
  );
}

function DonutTip({ active, payload, pool }: TooltipProps<number, string> & { pool: "win" | "pla" }) {
  const { t } = useTranslation("momentum");
  if (!active || !payload?.length) return null;
  const s = payload[0]!.payload as Slice;
  return (
    <div className={tip}>
      <div className={tipRow}>
        <Swatch {...horseStyle(s.horseNo)} />
        <span className="w-[18px] font-semibold tabular-nums">{s.horseNo}</span>
        <span className="flex-1 text-ink-2">{s.name}</span>
      </div>
      <div className={tipRow}>
        <span className="flex-1 text-ink-2">{pool === "win" ? t("pool.winOdds") : t("pool.placeOdds")}</span>
        <b className="tabular-nums">{s.odds}</b>
      </div>
      <div className={tipRow}>
        <span className="flex-1 text-ink-2">{t("pool.share")}</span>
        <b className="tabular-nums">{(100 * s.share).toFixed(1)}%</b>
      </div>
      {s.amount != null && (
        <div className={tipRow}>
          <span className="flex-1 text-ink-2">{t("pool.est")}</span>
          <b className="tabular-nums">{money(s.amount)}</b>
        </div>
      )}
    </div>
  );
}
