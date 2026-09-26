// Presentational components for the bet trainer.
import type { CardHorse, RaceCard, RaceLeg, RaceResult, SettleResult, SettleDetail, BetTypeId, HistoryEntry } from "../shared/types";
import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { useGlossary } from "./i18n/glossary";
import { Name } from "./i18n/names";
import { useFmt } from "./i18n/useLanguage";
import { Display, btn, btnPrimary, cx, empty, figure, h3, modal, modalBg, panel, pill, pillRow, table, tablePad } from "./kit";

/** Left-aligned card table: sentence-case headers, hairline rows. Tighter cell padding on phones. */
const cardTable =
  "w-full border-collapse text-sm [&_th]:border-b [&_th]:border-edge [&_th]:px-2 [&_th]:py-2.5 [&_th]:text-left [&_th]:text-xs [&_th]:font-medium [&_th]:whitespace-nowrap [&_th]:text-ink-3 [&_td]:border-b [&_td]:border-edge [&_td]:px-2 [&_td]:py-2.5 [&_tbody_tr:last-child_td]:border-b-0 sm:[&_th]:px-3 sm:[&_td]:px-3";
const chip = "inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-semibold";
const modalTitle = "font-display text-[30px] leading-tight tracking-[-0.01em] sm:text-[34px]";

export const HORSE_ROLE = { none: 0, leg: 1, banker: 2 } as const;
export type Role = keyof typeof HORSE_ROLE;

// ---- Race card ----
export function RaceCardTable({
  card,
  roleOf,
  onCycle,
  bankerEnabled,
}: {
  card: RaceCard;
  roleOf: (horseNumber: number) => Role;
  onCycle: (horseNumber: number) => void;
  bankerEnabled: boolean;
}) {
  const { t } = useTranslation(["bet", "common"]);
  const g = useGlossary();
  const [formOf, setFormOf] = useState<CardHorse | null>(null);
  return (
    <div className="mt-3 overflow-hidden rounded-card bg-surface shadow-card">
      <div className="flex flex-col gap-1 border-b border-edge px-4 pt-4 pb-3 sm:flex-row sm:items-end sm:gap-4 sm:px-5 sm:pt-5">
        <div className="min-w-0">
          <div className="text-xs font-medium text-ink-3">{t("common:race", { n: card.raceNumber })}</div>
          <h2 className="mt-0.5 font-display text-2xl leading-tight tracking-[-0.01em]">
            <Name kind="race" code={card.id} en={card.name} />
          </h2>
        </div>
        <div className="text-sm text-ink-2 sm:ml-auto sm:pb-0.5">
          {g.raceClass(card.class)} · {t("common:metres", { n: card.distance })} · {g.surface(card.surface)} · {g.going(card.going)}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className={cardTable}>
          <thead>
            <tr>
              <th>{t("common:word.number")}</th>
              <th>{t("common:word.horse")}</th>
              <th className="hidden sm:table-cell">{t("common:word.draw")}</th>
              <th className="hidden sm:table-cell">{t("common:word.weight")}</th>
              <th className="hidden sm:table-cell">{t("common:word.jockey")}</th>
              <th className="hidden sm:table-cell">{t("common:word.trainer")}</th>
              <th className="text-right!">{t("card.win")}</th>
              <th className="text-center!">{t("card.pick")}</th>
            </tr>
          </thead>
          <tbody>
            {[...card.entries].sort((a, b) => a.horseNumber - b.horseNumber).map((e) => {
              const role = roleOf(e.horseNumber);
              const scratched = e.isScratched;
              return (
                <tr
                  key={e.horseNumber}
                  className={cx(
                    "transition-colors",
                    scratched ? "cursor-default line-through opacity-45" : "cursor-pointer",
                    // a picked row's colour beats the hover tint
                    role === "leg" ? "bg-leg" : role === "banker" ? "bg-banker" : "hover:bg-canvas"
                  )}
                  onClick={() => !scratched && onCycle(e.horseNumber)}
                >
                  <td className="w-9 font-semibold tabular-nums">{e.horseNumber}</td>
                  <td>
                    {/* own click: opens past runs instead of cycling the pick */}
                    <button
                      type="button"
                      className="cursor-pointer text-left font-medium underline decoration-ink/25 underline-offset-2 hover:decoration-ink"
                      title={t("form.open")}
                      onClick={(ev) => {
                        ev.stopPropagation();
                        setFormOf(e.horse);
                      }}
                    >
                      <Name kind="horse" code={e.horse.code} en={e.horse.name} />
                    </button>
                    {e.jockey?.name && (
                      <div className="mt-0.5 text-xs text-ink-3 sm:hidden">
                        <Name kind="jockey" code={e.jockey.code} en={e.jockey.name} />
                      </div>
                    )}
                  </td>
                  <td className="hidden tabular-nums sm:table-cell">{e.draw}</td>
                  <td className="hidden tabular-nums sm:table-cell">{e.weight}</td>
                  <td className="hidden sm:table-cell">{e.jockey && <Name kind="jockey" code={e.jockey.code} en={e.jockey.name} />}</td>
                  <td className="hidden text-ink-2 sm:table-cell">{e.trainer && <Name kind="trainer" code={e.trainer.code} en={e.trainer.name} />}</td>
                  <td className="text-right tabular-nums">{card.winOdds[String(e.horseNumber)] ?? "-"}</td>
                  <td className="text-center">
                    {scratched ? (
                      <span className={cx(chip, "bg-surface-3 text-ink-3")}>{t("common:word.scratchedShort")}</span>
                    ) : role === "banker" ? (
                      <span className={cx(chip, "bg-banker-bd text-white")}>{t("common:role.bankerShort")}</span>
                    ) : role === "leg" ? (
                      <span className={cx(chip, "bg-accent text-white")}>{t("common:role.legShort")}</span>
                    ) : (
                      <span className={cx(chip, "bg-surface-2 text-ink-3")}>+</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="border-t border-edge px-4 py-3 text-xs text-ink-3 sm:px-5">
        {t("card.hint")} {bankerEnabled ? t("card.hintBanker") : t("card.hintClear")}
      </p>
      {formOf && <HorseFormModal horse={formOf} onClose={() => setFormOf(null)} />}
    </div>
  );
}

// ---- A horse's past runs (from the racecard) ----
function HorseFormModal({ horse, onClose }: { horse: CardHorse; onClose: () => void }) {
  const { t } = useTranslation(["bet", "common"]);
  const g = useGlossary();
  const fmt = useFmt();
  const runs = horse.pastPerformances ?? [];
  return (
    <div className={modalBg} onClick={onClose}>
      {/* wider than the default modal so all ten columns fit without scrolling */}
      <div className={modal} style={{ maxWidth: "min(860px, 100%)" }} role="dialog" aria-modal="true" aria-label={t("form.title")} onClick={(e) => e.stopPropagation()}>
        <div className="text-xs font-medium text-ink-3">{t("form.title")}</div>
        <h2 className={modalTitle}>
          <Name kind="horse" code={horse.code} en={horse.name} />
        </h2>
        {runs.length === 0 ? (
          <p className={cx(empty, "px-0")}>{t("form.empty")}</p>
        ) : (
          <>
            <p className="mt-2 text-xs text-ink-3">{t("form.note")}</p>
            <div className="mt-3 overflow-x-auto">
              <table className={cardTable}>
                <thead>
                  <tr>
                    <th>{t("common:word.date")}</th>
                    <th>{t("common:word.venue")}</th>
                    <th className="hidden sm:table-cell">{t("common:word.class")}</th>
                    <th className="text-right!">{t("form.distance")}</th>
                    <th className="hidden sm:table-cell">{t("form.going")}</th>
                    <th className="hidden text-right! sm:table-cell">{t("common:word.draw")}</th>
                    <th className="hidden text-right! sm:table-cell">{t("common:word.weight")}</th>
                    <th className="text-right!">{t("common:word.placing")}</th>
                    <th className="hidden text-right! sm:table-cell">{t("common:word.time")}</th>
                    <th className="text-right!">{t("common:word.odds")}</th>
                  </tr>
                </thead>
                <tbody>
                  {runs.map((r) => (
                    <tr key={`${r.date}-${r.raceNumber}`}>
                      <td className="whitespace-nowrap tabular-nums">{fmt.date(r.date, { year: "2-digit", month: "numeric", day: "numeric" })}</td>
                      <td className="whitespace-nowrap">
                        {g.venue(r.venue)} <span className="text-ink-3">{t("form.race", { n: r.raceNumber })}</span>
                      </td>
                      <td className="hidden whitespace-nowrap sm:table-cell">{g.raceClass(r.raceClass)}</td>
                      <td className="text-right tabular-nums">{r.distance}</td>
                      <td className="hidden whitespace-nowrap text-ink-2 sm:table-cell">{g.going(r.going)}</td>
                      <td className="hidden text-right tabular-nums sm:table-cell">{r.draw ?? "-"}</td>
                      <td className="hidden text-right tabular-nums sm:table-cell">{r.weight ?? "-"}</td>
                      <td className={cx("text-right tabular-nums whitespace-nowrap", r.finishPosition > 0 && r.finishPosition <= 3 && "font-semibold text-good")}>
                        {r.finishPosition > 0 ? r.finishPosition : "-"}
                        {r.fieldSize ? <span className="font-normal text-ink-3">/{r.fieldSize}</span> : null}
                      </td>
                      <td className="hidden text-right tabular-nums sm:table-cell">{fmtT(r.finishTime) || "-"}</td>
                      <td className="text-right tabular-nums">{r.odds ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        <button className={cx(btn, "mt-5 w-full sm:w-auto")} onClick={onClose}>{t("common:action.close")}</button>
      </div>
    </div>
  );
}

// ---- Bet type picker ----

export function BetTypePicker({
  value,
  onChange,
  dtAvailable,
  ttAvailable,
}: {
  value: BetTypeId;
  onChange: (b: BetTypeId) => void;
  dtAvailable: boolean;
  ttAvailable: boolean;
}) {
  const { t } = useTranslation(["bet", "common"]);
  const g = useGlossary();
  const all: BetTypeId[] = ["win", "place", "quinella", "qpl", "trio", "tierce", "first4", "doubleTrio", "tripleTrio"];
  return (
    <div className={cx(pillRow, "mt-3")} role="group" aria-label={t("betTypeGroup")}>
      {all.map((b) => {
        const disabled = (b === "doubleTrio" && !dtAvailable) || (b === "tripleTrio" && !ttAvailable);
        return (
          <button
            key={b}
            className={cx(pill(value === b), "flex-none")}
            aria-pressed={value === b}
            disabled={disabled}
            title={disabled ? t("notOffered") : ""}
            onClick={() => onChange(b)}
          >
            {g.betType(b)}
          </button>
        );
      })}
    </div>
  );
}

// ---- Cost bar ----
export function CostBar({
  combos,
  cost,
  onSubmit,
  canSubmit,
}: {
  combos: number;
  cost: number;
  onSubmit: () => void;
  canSubmit: boolean;
}) {
  const { t } = useTranslation(["bet", "common"]);
  const fmt = useFmt();
  return (
    <div className="sticky bottom-3 z-30 mt-4 flex items-center gap-3 rounded-card bg-surface/95 p-3 shadow-pop backdrop-blur sm:gap-4 sm:p-4">
      <div className="text-sm text-ink-2">
        <span className="font-semibold text-ink tabular-nums">{fmt.num(combos)}</span>
        <span className="hidden sm:inline">{t("cost.combinations")}</span> {t("cost.perUnit")}
      </div>
      <div className={cx(figure, "ml-auto text-[26px] text-ink sm:text-[28px]")}>{fmt.money(cost)}</div>
      <button className={btnPrimary} disabled={!canSubmit} onClick={onSubmit}>
        {t("cost.placeBet")}
      </button>
    </div>
  );
}

/** Translated explanation of a settle result (falls back to nothing for unknown codes). */
function settleText(d: SettleDetail | undefined, t: TFunction<["bet", "common"]>): string {
  if (!d) return "";
  const nums = (hs: number[]) => hs.map((h) => `#${h}`).join(", ");
  switch (d.code) {
    case "invalid": return t("detail.invalid");
    case "noResult": return t("detail.noResult", { race: d.race });
    case "missNoneInTop": return t("detail.missNoneInTop", { horses: nums(d.horses), depth: d.depth });
    case "hitPlaced": return t("detail.hitPlaced", { horses: nums(d.horses), depth: d.depth });
    case "missNoPair": return t("detail.missNoPair", { top3: d.top3.join("-") });
    case "hitPairs": return t("detail.hitPairs", { pairs: d.pairs });
    case "missRace": return t("detail.missRace", { race: d.race });
    case "hitLegs": {
      const legs = d.legs
        .map((l) => (l.bankers.length ? t("detail.legBankers", { race: l.race, bankers: l.bankers.join(",") }) : t("common:raceShort", { n: l.race })))
        .join(" + ");
      return t("detail.hitLegs", { legs }) + (d.deadHeat > 1 ? " " + t("detail.deadHeat", { n: d.deadHeat }) : "");
    }
  }
}

// ---- Result modal ----
export function ResultModal({ result, onClose }: { result: SettleResult; onClose: () => void }) {
  const { t } = useTranslation(["bet", "common"]);
  const fmt = useFmt();
  const payoutStr = result.payout === null ? t("result.payoutUnknown") : fmt.money(result.payout);
  const netStr = result.net === null ? "—" : `${result.net >= 0 ? "+" : ""}${fmt.money(result.net)}`;
  return (
    <div className={modalBg} onClick={onClose}>
      <div className={modal} role="dialog" aria-modal="true" aria-label={result.hit ? t("result.hit") : t("result.miss")} onClick={(e) => e.stopPropagation()}>
        <h2 className={cx("font-display text-[40px] leading-none tracking-[-0.02em]", result.hit ? "text-good" : "text-bad")}>
          {result.hit ? t("result.hit") : t("result.miss")}
        </h2>
        <p className="mt-3 text-sm text-ink-2">{settleText(result.detailInfo, t)}</p>

        {/* Finish order of every leg race — always shown, hit or miss. */}
        <div className="mt-5 flex flex-wrap gap-3">
          {result.legResults.map((lr) => (
            <div
              key={lr.raceNumber}
              className={cx(
                "flex-[1_1_160px] rounded-control px-3.5 py-3 ring-1",
                lr.covered ? "bg-good-soft ring-good/25" : "bg-bad-soft ring-bad/20"
              )}
            >
              <div className="mb-2 flex items-baseline justify-between">
                <span className="font-display text-lg leading-none">{t("common:race", { n: lr.raceNumber })}</span>
                <span className={cx("text-sm font-semibold", lr.covered ? "text-good" : "text-bad")}>{lr.covered ? t("result.covered") : t("result.missed")}</span>
              </div>
              <ol className="text-[13px]">
                {lr.finishers.map((f) => (
                  <li key={`${f.position}-${f.horseNumber}`} className="flex gap-2 py-px">
                    <span className="w-4 text-ink-3 tabular-nums">{f.position}</span>
                    <span className="min-w-7 font-semibold tabular-nums">#{f.horseNumber}</span>
                    <span className="truncate text-ink-2">
                      <Name kind="horse" code={f.horseCode} en={f.horseName} />
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <table className="mt-5 w-full border-collapse text-sm [&_td]:border-b [&_td]:border-edge [&_td]:py-2.5 [&_td:first-child]:text-ink-2 [&_td:last-child]:text-right [&_td:last-child]:font-medium [&_td:last-child]:tabular-nums [&_tr:last-child_td]:border-b-0">
          <tbody>
            <tr><td>{t("result.poolDividend")}</td><td>{result.poolDividendText}</td></tr>
            <tr><td>{t("result.combosWon")}</td><td>{result.combosWon} / {result.combos}</td></tr>
            <tr><td>{t("result.cost")}</td><td>{fmt.money(result.cost)}</td></tr>
            <tr><td>{t("result.payout")}</td><td>{payoutStr}</td></tr>
            <tr>
              <td className="border-t border-t-ink/25 pt-3.5">{t("result.net")}</td>
              <td className={cx("border-t border-t-ink/25 pt-3.5")}>
                <span className={cx(figure, "text-[28px]", result.net === null ? "text-ink" : result.net >= 0 ? "text-good" : "text-bad")}>{netStr}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <button className={cx(btn, "mt-5 w-full sm:w-auto")} onClick={onClose}>{t("common:action.close")}</button>
      </div>
    </div>
  );
}

// ---- Official result + dividends (HKJC local-results style) ----
const fmtT = (s?: number) => (s == null ? "" : s >= 60 ? `${Math.floor(s / 60)}:${(s % 60).toFixed(2).padStart(5, "0")}` : s.toFixed(2));

export function ResultPanel({ result, onClose }: { result: RaceResult; onClose: () => void }) {
  const { t } = useTranslation(["bet", "common"]);
  const g = useGlossary();
  const fmt = useFmt();
  const fo = [...result.finishOrder].sort((a, b) => a.finishPosition - b.finishPosition);
  const at = (pos: number) => fo.filter((f) => f.finishPosition === pos).map((f) => f.horseNumber);
  const top = (n: number) => fo.filter((f) => f.finishPosition <= n).map((f) => f.horseNumber);

  type Row = { pool: BetTypeId; combo: string; div: number };
  const rows: Row[] = [];
  const add = (pool: BetTypeId, combo: string, div?: number) => {
    if (div != null) rows.push({ pool, combo, div });
  };
  add("win", at(1).join(","), result.winDividend);
  (result.placeDividends ?? []).forEach((d, i) => add("place", at(i + 1).join(","), d));
  add("quinella", top(2).join("-"), result.quinellaDividend);
  const qp = result.quinellaPlaceDividends ?? [];
  const t3 = top(3);
  if (qp.length === 3 && t3.length >= 3) {
    add("qpl", `${t3[0]}-${t3[1]}`, qp[0]);
    add("qpl", `${t3[0]}-${t3[2]}`, qp[1]);
    add("qpl", `${t3[1]}-${t3[2]}`, qp[2]);
  }
  add("tierce", top(3).join("-"), result.tierceDividend);
  add("trio", top(3).join(","), result.trioDividend);
  add("first4", top(4).join(","), result.first4Dividend);
  if (result.doubleTrioLegs) add("doubleTrio", t("panel.legRaces", { list: result.doubleTrioLegs.join(",") }), result.doubleTrioDividend);
  if (result.tripleTrioLegs) add("tripleTrio", t("panel.legRaces", { list: result.tripleTrioLegs.join(",") }), result.tripleTrioDividend);

  return (
    <div className={modalBg} onClick={onClose}>
      <div className={modal} role="dialog" aria-modal="true" aria-label={t("panel.title", { n: result.raceNumber })} onClick={(e) => e.stopPropagation()}>
        <h2 className={modalTitle}>{t("panel.title", { n: result.raceNumber })}</h2>
        <div className="mt-4 overflow-x-auto">
          <table className={cardTable}>
            <thead>
              <tr>
                <th>{t("common:word.placing")}</th>
                <th>{t("common:word.number")}</th>
                <th>{t("common:word.horse")}</th>
                <th className="hidden sm:table-cell">{t("common:word.jockey")}</th>
                <th className="text-right!">{t("common:word.odds")}</th>
                <th className="text-right!">{t("common:word.time")}</th>
              </tr>
            </thead>
            <tbody>
              {fo.map((f) => (
                <tr key={`${f.finishPosition}-${f.horseNumber}`}>
                  <td className="w-8 font-semibold tabular-nums">{f.finishPosition}</td>
                  <td className="w-9 tabular-nums text-ink-2">{f.horseNumber}</td>
                  <td>
                    <span className="font-medium">
                      <Name kind="horse" code={f.horseCode} en={f.horseName} />
                    </span>
                    {f.jockeyName && (
                      <div className="mt-0.5 text-xs text-ink-3 sm:hidden">
                        <Name kind="jockey" code={f.jockeyCode} en={f.jockeyName} />
                      </div>
                    )}
                  </td>
                  <td className="hidden sm:table-cell">{f.jockeyName ? <Name kind="jockey" code={f.jockeyCode} en={f.jockeyName} /> : ""}</td>
                  <td className="text-right tabular-nums">{f.winOdds}</td>
                  <td className="text-right tabular-nums">{fmtT(f.finishTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className={cx(h3, "mt-6")}>{t("panel.dividends")}</h3>
        <div className="overflow-x-auto">
          <table className={cardTable}>
            <thead>
              <tr>
                <th>{t("common:word.pool")}</th>
                <th>{t("common:word.combination")}</th>
                <th className="text-right!">{t("panel.per10")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td>{g.betType(r.pool)}</td>
                  <td className="tabular-nums">{r.combo}</td>
                  <td className="text-right font-medium tabular-nums">{fmt.money(r.div)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className={cx(btn, "mt-5 w-full sm:w-auto")} onClick={onClose}>{t("common:action.close")}</button>
      </div>
    </div>
  );
}

// ---- History page ----

export function HistoryPage({
  entries,
  onDelete,
  onClear,
}: {
  entries: HistoryEntry[];
  onDelete: (id: string) => void;
  onClear: () => void;
}) {
  const { t } = useTranslation(["history", "common"]);
  const g = useGlossary();
  const fmt = useFmt();
  const money = fmt.money;
  const when = (ts: string) => fmt.date(ts, { dateStyle: "short", timeStyle: "short" });
  const totalCost = entries.reduce((s, e) => s + e.cost, 0);
  // Treat unknown payouts (missing dividend) as 0 for the running total.
  const totalReturn = entries.reduce((s, e) => s + (e.payout ?? 0), 0);
  const net = totalReturn - totalCost;
  const hits = entries.filter((e) => e.hit).length;
  const roi = totalCost ? (net / totalCost) * 100 : 0;

  const tone = (v: number) => (v >= 0 ? "text-good" : "text-bad");

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <Display sub={t("sub")}>{t("title")}</Display>
        {entries.length > 0 && (
          <button className={cx(btn, "mb-2 text-bad")} onClick={onClear}>
            {t("common:action.clearAll")}
          </button>
        )}
      </div>

      <div className={cx(panel, "mt-4 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]")}>
        <Stat label={t("stat.net")} big tone={tone(net)}>{net >= 0 ? "+" : ""}{money(net)}</Stat>
        <Stat label={t("stat.roi")} tone={tone(roi)}>{roi >= 0 ? "+" : ""}{roi.toFixed(1)}%</Stat>
        <Stat label={t("stat.bets")}>{fmt.num(entries.length)}</Stat>
        <Stat label={t("stat.hits")}>{fmt.num(hits)}{entries.length ? <span className="text-lg text-ink-3"> {((100 * hits) / entries.length).toFixed(0)}%</span> : ""}</Stat>
        <Stat label={t("stat.staked")}>{money(totalCost)}</Stat>
        <Stat label={t("stat.returned")}>{money(totalReturn)}</Stat>
      </div>

      {entries.length === 0 ? (
        <div className={cx(panel, empty, "mt-4")}>{t("empty")}</div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-card bg-surface shadow-card">
          <table
            className={cx(
              table,
              tablePad,
              "text-sm [&_th:nth-child(-n+4)]:text-left [&_td:nth-child(-n+4)]:text-left [&_th:nth-child(8)]:text-left [&_td:nth-child(8)]:text-left [&_th:nth-child(7)]:text-center [&_td:nth-child(7)]:text-center"
            )}
          >
            <thead>
              <tr>
                <th>{t("col.placed")}</th><th>{t("col.meeting")}</th><th>{t("col.bet")}</th><th>{t("col.picks")}</th>
                <th>{t("col.combos")}</th><th>{t("col.cost")}</th><th>{t("col.hit")}</th><th>{t("col.result")}</th>
                <th>{t("col.dividend")}</th><th>{t("col.payout")}</th><th>{t("col.net")}</th>
                <th><span className="sr-only">{t("col.delete")}</span></th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id}>
                  <td className="text-ink-3">{when(e.ts)}</td>
                  <td>{fmt.date(ymd(e.date))} {g.venue(e.venue)}</td>
                  <td>{g.betType(e.betType)}</td>
                  <td className="text-xs text-ink-2">{e.picks}</td>
                  <td>{e.combos}</td>
                  <td>{money(e.cost)}</td>
                  <td className={e.hit ? "font-semibold text-good" : "text-bad"}>{e.hit ? "✓" : "✗"}</td>
                  <td className="font-medium">{e.result}</td>
                  <td className="text-ink-2">{e.poolDividendText}</td>
                  <td>{e.payout === null ? "?" : money(e.payout)}</td>
                  <td className={cx("font-semibold", tone(e.net ?? 0))}>
                    {e.net === null ? "—" : `${e.net >= 0 ? "+" : ""}${money(e.net)}`}
                  </td>
                  <td>
                    <button
                      className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-sm text-ink-3 transition-colors hover:bg-bad-soft hover:text-bad"
                      aria-label={t("deleteAria", { when: when(e.ts) })}
                      onClick={() => onDelete(e.id)}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Stat({ label, big, tone, children }: { label: string; big?: boolean; tone?: string; children: ReactNode }) {
  return (
    <div className={cx("flex min-w-0 flex-col", big && "col-span-2 sm:col-span-1")}>
      <span className="text-xs font-medium text-ink-2">{label}</span>
      <strong className={cx(figure, "mt-2 font-normal", big ? "text-[40px]" : "text-[26px]", tone ?? "text-ink")}>{children}</strong>
    </div>
  );
}

/** "20260923" → Date at noon HK time (safe to format in any timezone). */
export const ymd = (d: string) => new Date(`${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}T12:00:00+08:00`);

/** Compact summary of one leg's picks. Stored in history as-is — keep the 膽/腳 format. */
export function legSummary(leg: RaceLeg): string {
  const b = leg.bankers.length ? `膽 ${leg.bankers.join(",")}` : "";
  const l = leg.legs.length ? `腳 ${leg.legs.join(",")}` : "";
  return [b, l].filter(Boolean).join("  ") || "—";
}
