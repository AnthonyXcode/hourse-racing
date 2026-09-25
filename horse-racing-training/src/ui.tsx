// Presentational components for the bet trainer.
import type { RaceCard, RaceLeg, RaceResult, SettleResult, BetTypeId, HistoryEntry } from "../shared/types";
import type { ReactNode } from "react";
import { fmtDate } from "./api";
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
  return (
    <div className="mt-3 overflow-hidden rounded-card bg-surface shadow-card">
      <div className="flex flex-col gap-1 border-b border-edge px-4 pt-4 pb-3 sm:flex-row sm:items-end sm:gap-4 sm:px-5 sm:pt-5">
        <div className="min-w-0">
          <div className="text-xs font-medium text-ink-3">Race {card.raceNumber}</div>
          <h2 className="mt-0.5 font-display text-2xl leading-tight tracking-[-0.01em]">{card.name}</h2>
        </div>
        <div className="text-sm text-ink-2 sm:ml-auto sm:pb-0.5">
          {card.class} · {card.distance}m · {card.surface} · {card.going}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className={cardTable}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Horse</th>
              <th className="hidden sm:table-cell">Draw</th>
              <th className="hidden sm:table-cell">Wt.</th>
              <th className="hidden sm:table-cell">Jockey</th>
              <th className="hidden sm:table-cell">Trainer</th>
              <th className="text-right!">Win</th>
              <th className="text-center!">Pick</th>
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
                    <span className="font-medium">{e.horse.name}</span>
                    {e.horse.origin ? <span className="text-ink-3"> ({e.horse.origin})</span> : null}
                    {e.jockey?.name && <div className="mt-0.5 text-xs text-ink-3 sm:hidden">{e.jockey.name}</div>}
                  </td>
                  <td className="hidden tabular-nums sm:table-cell">{e.draw}</td>
                  <td className="hidden tabular-nums sm:table-cell">{e.weight}</td>
                  <td className="hidden sm:table-cell">{e.jockey?.name}</td>
                  <td className="hidden text-ink-2 sm:table-cell">{e.trainer?.name}</td>
                  <td className="text-right tabular-nums">{card.winOdds[String(e.horseNumber)] ?? "-"}</td>
                  <td className="text-center">
                    {scratched ? (
                      <span className={cx(chip, "bg-surface-3 text-ink-3")}>SCR</span>
                    ) : role === "banker" ? (
                      <span className={cx(chip, "bg-banker-bd text-white")}>膽</span>
                    ) : role === "leg" ? (
                      <span className={cx(chip, "bg-accent text-white")}>腳</span>
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
        Tap a row to pick. {bankerEnabled ? "Tap again to make it a banker (膽), again to clear." : "Tap again to clear."}
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
    <div className={cx(pillRow, "mt-3")} role="group" aria-label="Bet type">
      {all.map((b) => {
        const disabled = (b === "doubleTrio" && !dtAvailable) || (b === "tripleTrio" && !ttAvailable);
        return (
          <button
            key={b}
            className={cx(pill(value === b), "flex-none")}
            aria-pressed={value === b}
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
    <div className="sticky bottom-3 z-30 mt-4 flex items-center gap-3 rounded-card bg-surface/95 p-3 shadow-pop backdrop-blur sm:gap-4 sm:p-4">
      <div className="text-sm text-ink-2">
        <span className="font-semibold text-ink tabular-nums">{combos}</span>
        <span className="hidden sm:inline"> combinations</span> × $10
      </div>
      <div className={cx(figure, "ml-auto text-[26px] text-ink sm:text-[28px]")}>${cost.toLocaleString()}</div>
      <button className={btnPrimary} disabled={!canSubmit} onClick={onSubmit}>
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
      <div className={modal} role="dialog" aria-modal="true" aria-label={result.hit ? "Hit" : "Miss"} onClick={(e) => e.stopPropagation()}>
        <h2 className={cx("font-display text-[40px] leading-none tracking-[-0.02em]", result.hit ? "text-good" : "text-bad")}>
          {result.hit ? "Hit" : "Miss"}
        </h2>
        <p className="mt-3 text-sm text-ink-2">{result.detail}</p>

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
                <span className="font-display text-lg leading-none">Race {lr.raceNumber}</span>
                <span className={cx("text-sm font-semibold", lr.covered ? "text-good" : "text-bad")}>{lr.covered ? "✓ covered" : "✗ missed"}</span>
              </div>
              <ol className="text-[13px]">
                {lr.finishers.map((f) => (
                  <li key={`${f.position}-${f.horseNumber}`} className="flex gap-2 py-px">
                    <span className="w-4 text-ink-3 tabular-nums">{f.position}</span>
                    <span className="min-w-7 font-semibold tabular-nums">#{f.horseNumber}</span>
                    <span className="truncate text-ink-2">{f.horseName}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <table className="mt-5 w-full border-collapse text-sm [&_td]:border-b [&_td]:border-edge [&_td]:py-2.5 [&_td:first-child]:text-ink-2 [&_td:last-child]:text-right [&_td:last-child]:font-medium [&_td:last-child]:tabular-nums [&_tr:last-child_td]:border-b-0">
          <tbody>
            <tr><td>Pool dividend</td><td>{result.poolDividendText}</td></tr>
            <tr><td>Combinations won</td><td>{result.combosWon} / {result.combos}</td></tr>
            <tr><td>Cost</td><td>${result.cost.toLocaleString()}</td></tr>
            <tr><td>Payout</td><td>{payoutStr}</td></tr>
            <tr>
              <td className="border-t border-t-ink/25 pt-3.5">Net</td>
              <td className={cx("border-t border-t-ink/25 pt-3.5")}>
                <span className={cx(figure, "text-[28px]", result.net === null ? "text-ink" : result.net >= 0 ? "text-good" : "text-bad")}>{netStr}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <button className={cx(btn, "mt-5 w-full sm:w-auto")} onClick={onClose}>Close</button>
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
      <div className={modal} role="dialog" aria-modal="true" aria-label={`Race ${result.raceNumber} result`} onClick={(e) => e.stopPropagation()}>
        <h2 className={modalTitle}>Race {result.raceNumber} result</h2>
        <div className="mt-4 overflow-x-auto">
          <table className={cardTable}>
            <thead>
              <tr><th>Pl.</th><th>No.</th><th>Horse</th><th className="hidden sm:table-cell">Jockey</th><th className="text-right!">Odds</th><th className="text-right!">Time</th></tr>
            </thead>
            <tbody>
              {fo.map((f) => (
                <tr key={`${f.finishPosition}-${f.horseNumber}`}>
                  <td className="w-8 font-semibold tabular-nums">{f.finishPosition}</td>
                  <td className="w-9 tabular-nums text-ink-2">{f.horseNumber}</td>
                  <td>
                    <span className="font-medium">{f.horseName}</span>
                    {f.jockeyName && <div className="mt-0.5 text-xs text-ink-3 sm:hidden">{f.jockeyName}</div>}
                  </td>
                  <td className="hidden sm:table-cell">{f.jockeyName ?? ""}</td>
                  <td className="text-right tabular-nums">{f.winOdds}</td>
                  <td className="text-right tabular-nums">{fmtT(f.finishTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className={cx(h3, "mt-6")}>Dividends</h3>
        <div className="overflow-x-auto">
          <table className={cardTable}>
            <thead>
              <tr><th>Pool</th><th>Combination</th><th className="text-right!">Per $10</th></tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td>{r.pool}</td>
                  <td className="tabular-nums">{r.combo}</td>
                  <td className="text-right font-medium tabular-nums">{money(r.div)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className={cx(btn, "mt-5 w-full sm:w-auto")} onClick={onClose}>Close</button>
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

  const tone = (v: number) => (v >= 0 ? "text-good" : "text-bad");

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <Display sub="Every practice bet you've settled, newest first.">History</Display>
        {entries.length > 0 && (
          <button className={cx(btn, "mb-2 text-bad")} onClick={onClear}>
            Clear all
          </button>
        )}
      </div>

      <div className={cx(panel, "mt-4 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]")}>
        <Stat label="Net P&L" big tone={tone(net)}>{net >= 0 ? "+" : ""}{money(net)}</Stat>
        <Stat label="ROI" tone={tone(roi)}>{roi >= 0 ? "+" : ""}{roi.toFixed(1)}%</Stat>
        <Stat label="Bets">{entries.length}</Stat>
        <Stat label="Hits">{hits}{entries.length ? <span className="text-lg text-ink-3"> {((100 * hits) / entries.length).toFixed(0)}%</span> : ""}</Stat>
        <Stat label="Total staked">{money(totalCost)}</Stat>
        <Stat label="Total return">{money(totalReturn)}</Stat>
      </div>

      {entries.length === 0 ? (
        <div className={cx(panel, empty, "mt-4")}>No bets yet. Place one from the Bet tab.</div>
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
                <th>Placed</th><th>Meeting</th><th>Bet</th><th>Picks</th>
                <th>Combos</th><th>Cost</th><th>Hit</th><th>Result</th><th>Dividend</th><th>Payout</th><th>Net</th><th><span className="sr-only">Delete</span></th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id}>
                  <td className="text-ink-3">{new Date(e.ts).toLocaleString()}</td>
                  <td>{fmtDate(e.date)} {e.venue}</td>
                  <td>{e.betLabel}</td>
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
                      aria-label={`Delete bet placed ${new Date(e.ts).toLocaleString()}`}
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

/** Compact summary of one leg's picks. */
export function legSummary(leg: RaceLeg): string {
  const b = leg.bankers.length ? `膽 ${leg.bankers.join(",")}` : "";
  const l = leg.legs.length ? `腳 ${leg.legs.join(",")}` : "";
  return [b, l].filter(Boolean).join("  ") || "—";
}
