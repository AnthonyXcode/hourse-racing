// Presentational components for the bet trainer.
import type { RaceCard, RaceLeg, SettleResult, BetTypeId, HistoryEntry } from "../shared/types";
import { fmtDate } from "./api";

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
    <div className="card-wrap">
      <div className="card-head">
        <span className="race-no">Race {card.raceNumber}</span>
        <span>{card.name}</span>
        <span className="cond">
          {card.class} · {card.distance}m · {card.surface} · {card.going}
        </span>
      </div>
      <table className="racecard">
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
          {card.entries.map((e) => {
            const role = roleOf(e.horseNumber);
            const scratched = e.isScratched;
            return (
              <tr
                key={e.horseNumber}
                className={`${scratched ? "scratched" : ""} role-${role}`}
                onClick={() => !scratched && onCycle(e.horseNumber)}
              >
                <td className="num">{e.horseNumber}</td>
                <td className="hname">
                  {e.horse.name}
                  {e.horse.origin ? <span className="origin"> ({e.horse.origin})</span> : null}
                </td>
                <td>{e.draw}</td>
                <td>{e.weight}</td>
                <td>{e.jockey?.name}</td>
                <td>{e.trainer?.name}</td>
                <td className="odds">{card.winOdds[String(e.horseNumber)] ?? "-"}</td>
                <td className="pick">
                  {scratched ? (
                    <span className="chip scr">SCR</span>
                  ) : role === "banker" ? (
                    <span className="chip banker">膽</span>
                  ) : role === "leg" ? (
                    <span className="chip leg">腳</span>
                  ) : (
                    <span className="chip empty">{bankerEnabled ? "+" : "+"}</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="hint">
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
    <div className="bettype">
      {all.map((b) => {
        const disabled = (b === "doubleTrio" && !dtAvailable) || (b === "tripleTrio" && !ttAvailable);
        return (
          <button
            key={b}
            className={`bt ${value === b ? "active" : ""}`}
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
    <div className="costbar">
      <div>
        <strong>{combos}</strong> combinations × $10
      </div>
      <div className="total">${cost.toLocaleString()}</div>
      <button className="submit" disabled={!canSubmit} onClick={onSubmit}>
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
    <div className="modal-bg" onClick={onClose}>
      <div className={`modal ${result.hit ? "hit" : "miss"}`} onClick={(e) => e.stopPropagation()}>
        <h2>{result.hit ? "HIT ✅" : "MISS ❌"}</h2>
        <p className="detail">{result.detail}</p>

        {/* Finish order of every leg race — always shown, hit or miss. */}
        <div className="legresults">
          {result.legResults.map((lr) => (
            <div key={lr.raceNumber} className={`legres ${lr.covered ? "ok" : "no"}`}>
              <div className="lrhead">
                Race {lr.raceNumber} <span className="mark">{lr.covered ? "✓" : "✗"}</span>
              </div>
              <ol className="finish">
                {lr.finishers.map((f) => (
                  <li key={`${f.position}-${f.horseNumber}`}>
                    <span className="pos">{f.position}</span>
                    <span className="fnum">#{f.horseNumber}</span>
                    <span className="fname">{f.horseName}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <table className="settle">
          <tbody>
            <tr><td>Combinations won</td><td>{result.combosWon} / {result.combos}</td></tr>
            <tr><td>Cost</td><td>${result.cost.toLocaleString()}</td></tr>
            <tr><td>Payout</td><td>{payoutStr}</td></tr>
            <tr className="net"><td>Net</td><td>{netStr}</td></tr>
          </tbody>
        </table>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

// ---- History page ----
const money = (n: number) => `$${n.toLocaleString()}`;

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
    <div className="history">
      <div className="hist-summary">
        <div className="stat"><span>Bets</span><strong>{entries.length}</strong></div>
        <div className="stat"><span>Hits</span><strong>{hits}{entries.length ? ` (${((100 * hits) / entries.length).toFixed(0)}%)` : ""}</strong></div>
        <div className="stat"><span>Total staked</span><strong>{money(totalCost)}</strong></div>
        <div className="stat"><span>Total return</span><strong>{money(totalReturn)}</strong></div>
        <div className={`stat big ${net >= 0 ? "pos" : "neg"}`}>
          <span>Net P&L</span><strong>{net >= 0 ? "+" : ""}{money(net)}</strong>
        </div>
        <div className={`stat ${roi >= 0 ? "pos" : "neg"}`}>
          <span>ROI</span><strong>{roi >= 0 ? "+" : ""}{roi.toFixed(1)}%</strong>
        </div>
        {entries.length > 0 && (
          <button className="clear" onClick={onClear}>Clear all</button>
        )}
      </div>

      {entries.length === 0 ? (
        <p className="empty">No bets yet. Place one from the Bet tab.</p>
      ) : (
        <table className="histtable">
          <thead>
            <tr>
              <th>Placed</th><th>Meeting</th><th>Bet</th><th>Picks</th>
              <th>Combos</th><th>Cost</th><th>Result</th><th>Payout</th><th>Net</th><th></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className={e.hit ? "win" : "lose"}>
                <td className="ts">{new Date(e.ts).toLocaleString()}</td>
                <td>{fmtDate(e.date)} {e.venue}</td>
                <td>{e.betLabel}</td>
                <td className="picks">{e.picks}</td>
                <td className="r">{e.combos}</td>
                <td className="r">{money(e.cost)}</td>
                <td className={e.hit ? "hit" : "miss"}>{e.hit ? "HIT" : "MISS"}</td>
                <td className="r">{e.payout === null ? "?" : money(e.payout)}</td>
                <td className={`r ${(e.net ?? 0) >= 0 ? "pos" : "neg"}`}>
                  {e.net === null ? "—" : `${e.net >= 0 ? "+" : ""}${money(e.net)}`}
                </td>
                <td><button className="del" onClick={() => onDelete(e.id)}>✕</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

/** Compact summary of one leg's picks. */
export function legSummary(leg: RaceLeg): string {
  const b = leg.bankers.length ? `膽 ${leg.bankers.join(",")}` : "";
  const l = leg.legs.length ? `腳 ${leg.legs.join(",")}` : "";
  return [b, l].filter(Boolean).join("  ") || "—";
}
