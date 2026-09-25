// Presentational components for the bet trainer.
import type { RaceCard, RaceLeg, RaceResult, SettleResult, BetTypeId, HistoryEntry } from "../shared/types";
import type { ReactNode } from "react";
import { fmtDate } from "./api";
import { cx } from "./kit";

// HKJC-style tables: grey header with a red rule, light row dividers.
const hkTable =
  "w-full border-collapse text-[13px] [&_th]:border-b-2 [&_th]:border-hkjc-red [&_th]:bg-[#ececec] [&_th]:text-left [&_td]:border-b [&_td]:border-[#eee]";
const chip = "inline-block min-w-[22px] rounded-[10px] px-1.5 py-0.5 text-center text-xs font-bold";
const modalBg = "fixed inset-0 flex items-center justify-center bg-black/50";
const modal = "min-w-[340px] rounded-lg bg-white px-7 py-6 shadow-[0_10px_40px_rgba(0,0,0,.3)]";
const modalH2 = "mt-0 mb-2 text-2xl font-bold";
const modalBtn = "cursor-pointer rounded border-none bg-hkjc-dark px-[18px] py-2 text-[13.33px] text-white";

export const HORSE_ROLE = { none: 0, leg: 1, banker: 2 } as const;
export type Role = keyof typeof HORSE_ROLE;

// ---- HKJC-style race card table ----
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
  return (
    <div className="overflow-hidden rounded-md border border-line bg-white">
      <div className="flex items-baseline gap-3.5 bg-hkjc-dark px-3 py-2.5 text-sm text-white">
        <span className="rounded-[3px] bg-hkjc-red px-2 py-0.5 font-bold">Race {card.raceNumber}</span>
        <span>{card.name}</span>
        <span className="ml-auto opacity-85">
          {card.class} · {card.distance}m · {card.surface} · {card.going}
        </span>
      </div>
      <table className={cx(hkTable, "[&_td]:px-2 [&_td]:py-[7px] [&_th]:px-2 [&_th]:py-[7px] [&_th]:font-semibold")}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Horse</th>
            <th>Draw</th>
            <th>Wt.</th>
            <th>Jockey</th>
            <th>Trainer</th>
            <th>Win</th>
            <th>Pick</th>
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
                  scratched ? "cursor-default line-through opacity-45" : "cursor-pointer",
                  // a picked row's colour beats the hover tint
                  role === "leg" ? "bg-leg" : role === "banker" ? "bg-banker" : "hover:bg-[#fafafa]"
                )}
                onClick={() => !scratched && onCycle(e.horseNumber)}
              >
                <td className="w-9 font-bold">{e.horseNumber}</td>
                <td className="font-semibold">
                  {e.horse.name}
                  {e.horse.origin ? <span className="font-normal text-[#999]"> ({e.horse.origin})</span> : null}
                </td>
                <td>{e.draw}</td>
                <td>{e.weight}</td>
                <td>{e.jockey?.name}</td>
                <td>{e.trainer?.name}</td>
                <td className="text-right tabular-nums">{card.winOdds[String(e.horseNumber)] ?? "-"}</td>
                <td>
                  {scratched ? (
                    <span className={cx(chip, "bg-[#ccc] text-white")}>SCR</span>
                  ) : role === "banker" ? (
                    <span className={cx(chip, "bg-banker-bd text-white")}>膽</span>
                  ) : role === "leg" ? (
                    <span className={cx(chip, "bg-leg-bd text-white")}>腳</span>
                  ) : (
                    <span className={cx(chip, "bg-[#eee] text-[#aaa]")}>{bankerEnabled ? "+" : "+"}</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="m-0 px-3 py-2 text-xs text-[#888]">
        Click a row to pick. {bankerEnabled ? "Click again to make it a banker (膽), again to clear." : "Click again to clear."}
      </p>
    </div>
  );
}

// ---- Bet type picker ----
const BET_LABELS: Record<BetTypeId, string> = {
  win: "Win",
  place: "Place",
  quinella: "Quinella",
  qpl: "Quinella Place",
  trio: "Trio",
  tierce: "Tierce",
  first4: "First 4",
  doubleTrio: "Double Trio",
  tripleTrio: "Triple Trio",
};

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
  const all: BetTypeId[] = ["win", "place", "quinella", "qpl", "trio", "tierce", "first4", "doubleTrio", "tripleTrio"];
  return (
    <div className="my-2.5 flex flex-wrap gap-1.5">
      {all.map((b) => {
        const disabled = (b === "doubleTrio" && !dtAvailable) || (b === "tripleTrio" && !ttAvailable);
        return (
          <button
            key={b}
            className={cx(
              "cursor-pointer rounded-2xl border px-3 py-[7px] text-[13px] disabled:cursor-not-allowed disabled:opacity-40",
              value === b ? "border-hkjc-dark bg-hkjc-dark text-white" : "border-line bg-white"
            )}
            disabled={disabled}
            title={disabled ? "Not offered this meeting" : ""}
            onClick={() => onChange(b)}
          >
            {BET_LABELS[b]}
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
  return (
    <div className="sticky bottom-0 mt-3 flex items-center gap-[18px] rounded-md border border-t-[3px] border-line border-t-hkjc-red bg-white px-4 py-3">
      <div>
        <strong>{combos}</strong> combinations × $10
      </div>
      <div className="ml-auto text-[22px] font-extrabold text-hkjc-red">${cost.toLocaleString()}</div>
      <button
        className="cursor-pointer rounded border-none bg-hkjc-red px-[22px] py-2.5 text-[15px] font-bold text-white disabled:cursor-not-allowed disabled:bg-[#ccc]"
        disabled={!canSubmit} onClick={onSubmit}>
        Place bet
      </button>
    </div>
  );
}

// ---- Result modal ----
export function ResultModal({ result, onClose }: { result: SettleResult; onClose: () => void }) {
  const payoutStr =
    result.payout === null ? "unknown (dividend missing from data)" : `$${result.payout.toLocaleString()}`;
  const netStr = result.net === null ? "—" : `${result.net >= 0 ? "+" : ""}$${result.net.toLocaleString()}`;
  return (
    <div className={modalBg} onClick={onClose}>
      <div className={modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={cx(modalH2, result.hit ? "text-hit" : "text-miss")}>{result.hit ? "HIT ✅" : "MISS ❌"}</h2>
        <p className="my-3.5 text-sm text-[#444]">{result.detail}</p>

        {/* Finish order of every leg race — always shown, hit or miss. */}
        <div className="my-3 flex flex-wrap gap-2.5">
          {result.legResults.map((lr) => (
            <div key={lr.raceNumber} className={cx(
                "flex-[1_1_140px] rounded-[5px] border px-2.5 py-2",
                lr.covered ? "border-hit bg-[#f1faf3]" : "border-miss bg-[#fdf2f3]"
              )}>
              <div className="mb-1 flex justify-between text-[13px] font-bold">
                Race {lr.raceNumber} <span className={lr.covered ? "text-hit" : "text-miss"}>{lr.covered ? "✓" : "✗"}</span>
              </div>
              <ol className="m-0 list-none p-0 text-[13px]">
                {lr.finishers.map((f) => (
                  <li key={`${f.position}-${f.horseNumber}`} className="flex gap-1.5 py-px">
                    <span className="w-4 font-bold text-[#999]">{f.position}</span>
                    <span className="min-w-7 font-bold">#{f.horseNumber}</span>
                    <span className="text-[#444]">{f.horseName}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <table className="my-3 w-full border-collapse [&_td]:border-b [&_td]:border-[#eee] [&_td]:px-1 [&_td]:py-1.5 [&_td:last-child]:text-right [&_td:last-child]:font-semibold [&_td:last-child]:tabular-nums">
          <tbody>
            <tr><td>Pool dividend</td><td>{result.poolDividendText}</td></tr>
            <tr><td>Combinations won</td><td>{result.combosWon} / {result.combos}</td></tr>
            <tr><td>Cost</td><td>${result.cost.toLocaleString()}</td></tr>
            <tr><td>Payout</td><td>{payoutStr}</td></tr>
            <tr className="text-base">
              {/* ! beats the table-level td border rules */}
              <td className="border-t-2 border-b-0! border-t-hkjc-dark!">Net</td>
              <td className="border-t-2 border-b-0! border-t-hkjc-dark!">{netStr}</td>
            </tr>
          </tbody>
        </table>
        <button className={modalBtn} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

// ---- Official result + dividends (HKJC local-results style) ----
const money = (n: number) => `$${n.toLocaleString()}`;
const fmtT = (s?: number) => (s == null ? "" : s >= 60 ? `${Math.floor(s / 60)}:${(s % 60).toFixed(2).padStart(5, "0")}` : s.toFixed(2));

export function ResultPanel({ result, onClose }: { result: RaceResult; onClose: () => void }) {
  const fo = [...result.finishOrder].sort((a, b) => a.finishPosition - b.finishPosition);
  const at = (pos: number) => fo.filter((f) => f.finishPosition === pos).map((f) => f.horseNumber);
  const top = (n: number) => fo.filter((f) => f.finishPosition <= n).map((f) => f.horseNumber);

  type Row = { pool: string; combo: string; div: number };
  const rows: Row[] = [];
  const add = (pool: string, combo: string, div?: number) => {
    if (div != null) rows.push({ pool, combo, div });
  };
  add("Win", at(1).join(","), result.winDividend);
  (result.placeDividends ?? []).forEach((d, i) => add("Place", at(i + 1).join(","), d));
  add("Quinella", top(2).join("-"), result.quinellaDividend);
  const qp = result.quinellaPlaceDividends ?? [];
  const t3 = top(3);
  if (qp.length === 3 && t3.length >= 3) {
    add("Quinella Place", `${t3[0]}-${t3[1]}`, qp[0]);
    add("Quinella Place", `${t3[0]}-${t3[2]}`, qp[1]);
    add("Quinella Place", `${t3[1]}-${t3[2]}`, qp[2]);
  }
  add("Tierce", top(3).join("-"), result.tierceDividend);
  add("Trio", top(3).join(","), result.trioDividend);
  add("First 4", top(4).join(","), result.first4Dividend);
  if (result.doubleTrioLegs) add("Double Trio", `Races ${result.doubleTrioLegs.join(",")}`, result.doubleTrioDividend);
  if (result.tripleTrioLegs) add("Triple Trio", `Races ${result.tripleTrioLegs.join(",")}`, result.tripleTrioDividend);

  return (
    <div className={modalBg} onClick={onClose}>
      <div className={cx(modal, "max-h-[86vh] min-w-[560px] overflow-auto")} onClick={(e) => e.stopPropagation()}>
        <h2 className={modalH2}>Race {result.raceNumber} Result</h2>
        <table className={cx(hkTable, "[&_td]:px-2 [&_td]:py-1.5 [&_th]:px-2 [&_th]:py-1.5 [&_th]:font-bold")}>
          <thead>
            <tr><th>Pl.</th><th>No.</th><th>Horse</th><th>Jockey</th><th>Win Odds</th><th>Time</th></tr>
          </thead>
          <tbody>
            {fo.map((f) => (
              <tr key={`${f.finishPosition}-${f.horseNumber}`}>
                <td className="w-8 font-bold">{f.finishPosition}</td>
                <td className="w-9 font-bold">{f.horseNumber}</td>
                <td className="font-semibold">{f.horseName}</td>
                <td>{f.jockeyName ?? ""}</td>
                <td className="text-right tabular-nums">{f.winOdds}</td>
                <td className="text-right tabular-nums">{fmtT(f.finishTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="mt-4 mb-1.5 border-b-2 border-hkjc-red pb-1 text-[1.17em] font-bold">Dividends</h3>
        <table className={cx(hkTable, "[&_td]:px-2 [&_td]:py-1.5 [&_th]:px-2 [&_th]:py-1.5 [&_th]:font-bold")}>
          <thead>
            <tr><th>Pool</th><th>Combination</th><th>Dividend (per $10)</th></tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.pool}</td>
                <td className="tabular-nums">{r.combo}</td>
                <td className="text-right font-semibold tabular-nums">{money(r.div)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className={modalBtn} onClick={onClose}>Close</button>
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
  const totalCost = entries.reduce((s, e) => s + e.cost, 0);
  // Treat unknown payouts (missing dividend) as 0 for the running total.
  const totalReturn = entries.reduce((s, e) => s + (e.payout ?? 0), 0);
  const net = totalReturn - totalCost;
  const hits = entries.filter((e) => e.hit).length;
  const roi = totalCost ? (net / totalCost) * 100 : 0;

  return (
    <div className="mt-3.5">
      <div className="mb-3.5 flex flex-wrap items-center gap-3.5 rounded-md border border-line bg-white px-4 py-3.5">
        <Stat label="Bets">{entries.length}</Stat>
        <Stat label="Hits">{hits}{entries.length ? ` (${((100 * hits) / entries.length).toFixed(0)}%)` : ""}</Stat>
        <Stat label="Total staked">{money(totalCost)}</Stat>
        <Stat label="Total return">{money(totalReturn)}</Stat>
        <Stat label="Net P&L" big tone={net >= 0 ? "text-hit" : "text-miss"}>{net >= 0 ? "+" : ""}{money(net)}</Stat>
        <Stat label="ROI" tone={roi >= 0 ? "text-hit" : "text-miss"}>{roi >= 0 ? "+" : ""}{roi.toFixed(1)}%</Stat>
        {entries.length > 0 && (
          <button className="ml-auto cursor-pointer rounded border border-miss bg-white px-3.5 py-[7px] text-[13.33px] text-miss" onClick={onClear}>
            Clear all
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <p className="my-4 p-[30px] text-center text-[#888]">No bets yet. Place one from the Bet tab.</p>
      ) : (
        <table className="w-full border-collapse border border-line bg-white text-[13px] [&_td]:border-b [&_td]:border-[#eee] [&_td]:px-2 [&_td]:py-[7px] [&_th]:border-b-2 [&_th]:border-hkjc-red [&_th]:bg-[#ececec] [&_th]:p-2 [&_th]:text-left [&_th]:font-bold">
          <thead>
            <tr>
              <th>Placed</th><th>Meeting</th><th>Bet</th><th>Picks</th>
              <th>Combos</th><th>Cost</th><th>Hit?</th><th>Result</th><th>Dividend</th><th>Payout</th><th>Net</th><th></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id}>
                <td className="whitespace-nowrap text-[#888]">{new Date(e.ts).toLocaleString()}</td>
                <td>{fmtDate(e.date)} {e.venue}</td>
                <td>{e.betLabel}</td>
                <td className="text-xs text-[#444]">{e.picks}</td>
                <td className="text-right tabular-nums">{e.combos}</td>
                <td className="text-right tabular-nums">{money(e.cost)}</td>
                <td className="text-center">{e.hit ? "✅" : "❌"}</td>
                <td className="whitespace-nowrap font-semibold tabular-nums">{e.result}</td>
                <td className="text-right tabular-nums">{e.poolDividendText}</td>
                <td className="text-right tabular-nums">{e.payout === null ? "?" : money(e.payout)}</td>
                <td className={cx("text-right font-bold tabular-nums", (e.net ?? 0) >= 0 ? "text-hit" : "text-miss")}>
                  {e.net === null ? "—" : `${e.net >= 0 ? "+" : ""}${money(e.net)}`}
                </td>
                <td><button className="cursor-pointer border-none bg-transparent text-sm text-[#bbb] hover:text-miss" onClick={() => onDelete(e.id)}>✕</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function Stat({ label, big, tone, children }: { label: string; big?: boolean; tone?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col text-xs text-[#777]">
      <span>{label}</span>
      <strong className={cx(big ? "text-[22px]" : "text-lg", tone ?? "text-hkjc-dark")}>{children}</strong>
    </div>
  );
}

/** Compact summary of one leg's picks. */
export function legSummary(leg: RaceLeg): string {
  const b = leg.bankers.length ? `膽 ${leg.bankers.join(",")}` : "";
  const l = leg.legs.length ? `腳 ${leg.legs.join(",")}` : "";
  return [b, l].filter(Boolean).join("  ") || "—";
}
