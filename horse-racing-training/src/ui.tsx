// Presentational components for the bet trainer.
import type { CardHorse, PastPerformance, RaceCard, RaceLeg, RaceResult, SettleResult, SettleDetail, BetTypeId, HistoryEntry } from "../shared/types";
import { useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { useGlossary } from "./i18n/glossary";
import { Name } from "./i18n/names";
import { useFmt, useLanguage } from "./i18n/useLanguage";
import { Display, btn, btnDanger, btnPill, btnPrimary, control, cx, empty, errorBox, figure, h3, modal, modalBg, modalNarrow, modeBadge, panel, pill, pillRow, statusChip, table, tablePad } from "./kit";
import { Spinner, useDialog } from "./members/ui";
import { MIN_UNIT, ymd, type SettledBet } from "./slip";
import { useSlipText } from "./BetSlip";
import { Coin } from "./credits/dialogs";

/** Left-aligned card table: 13px headers, hairline rows, zebra stripes. Tighter cell padding on phones. */
const cardTable =
  "w-full border-collapse text-sm [&_th]:border-b [&_th]:border-edge [&_th]:px-2 [&_th]:py-2 [&_th]:text-left [&_th]:text-[13px] [&_th]:font-normal [&_th]:whitespace-nowrap [&_th]:text-ink [&_td]:border-b [&_td]:border-edge [&_td]:px-2 [&_td]:py-2 [&_tbody_tr:nth-child(even)]:bg-zebra [&_tbody_tr:last-child_td]:border-b-0 sm:[&_th]:px-3 sm:[&_td]:px-3";
const modalTitle = "text-[22px] leading-tight font-medium text-navy-900 sm:text-[26px]";
/** Pick checkbox: native input, navy when ticked, 44px tap area from the cell padding. */
const tick = "size-5 cursor-pointer accent-navy-700 disabled:cursor-not-allowed";

/** Pools as HKJC groups them: Win and Place share one page. */
export type Pool = "wp" | Exclude<BetTypeId, "win" | "place">;
export const POOLS: Pool[] = ["wp", "quinella", "qpl", "trio", "tierce", "first4", "doubleTrio", "tripleTrio"];
/** A race's ticked boxes, one list per column. */
export interface Picks {
  win: number[];
  place: number[];
  bankers: number[];
  legs: number[];
}
export type PickCol = keyof Picks;
export const emptyPicks = (): Picks => ({ win: [], place: [], bankers: [], legs: [] });

// ---- Race card ----
export function RaceCardTable({
  card,
  pool,
  picks,
  onToggle,
  onField,
  bankerEnabled,
  bankerMax,
  head,
  readOnly,
}: {
  card: RaceCard;
  pool: Pool;
  picks: Picks;
  onToggle: (col: PickCol, horseNumber: number) => void;
  /** Tick (or clear) every runner in a column. */
  onField: (col: PickCol, on: boolean) => void;
  bankerEnabled: boolean;
  /** Most bankers this pool allows (depth − 1). */
  bankerMax: number;
  /** Extra controls in the title bar (e.g. Results). */
  head?: ReactNode;
  /** View-only race (LIVE: closed / settled / void): every tick disabled. */
  readOnly?: boolean;
}) {
  const { t } = useTranslation(["bet", "common"]);
  const g = useGlossary();
  const [formOf, setFormOf] = useState<CardHorse | null>(null);
  const entries = [...card.entries].sort((a, b) => a.horseNumber - b.horseNumber);
  const runners = entries.filter((e) => !e.isScratched).map((e) => e.horseNumber);
  const odds = runners.map((h) => card.winOdds[String(h)]).filter((o): o is number => o != null && o > 0);
  const fav = odds.length ? Math.min(...odds) : null;
  const cols: [PickCol, string][] =
    pool === "wp"
      ? [["win", t("card.win")], ["place", t("card.place")]]
      : bankerEnabled
        ? [["bankers", t("card.banker")], ["legs", t("card.select")]]
        : [["legs", t("card.select")]];
  const allOn = (col: PickCol) => runners.length > 0 && runners.every((h) => picks[col].includes(h));
  return (
    <section className="mt-3 overflow-hidden rounded-card bg-surface shadow-card">
      <div className="flex min-h-9 items-center gap-2 bg-navy-900 px-[13px] py-2 text-white">
        <h2 className="min-w-0 truncate text-[15px] font-medium sm:text-[17px]">
          {t("common:race", { n: card.raceNumber })} · <Name kind="race" code={card.id} en={card.name} />
        </h2>
        <div className="ml-auto flex flex-none items-center gap-2">{head}</div>
      </div>
      <div className="border-b border-edge px-[13px] py-2 text-[13px] text-ink">
        {g.raceClass(card.class)} · {t("common:metres", { n: card.distance })} · {g.surface(card.surface)} · {g.going(card.going)}
      </div>
      <div className="overflow-x-auto">
        <table className={cardTable}>
          <thead>
            <tr>
              <th className="w-10">{t("common:word.number")}</th>
              <th>{t("common:word.horse")}</th>
              <th className="hidden sm:table-cell">{t("common:word.draw")}</th>
              <th className="hidden sm:table-cell">{t("common:word.weight")}</th>
              <th className="hidden md:table-cell">{t("common:word.jockey")}</th>
              <th className="hidden lg:table-cell">{t("common:word.trainer")}</th>
              <th className="text-right!">{t("card.odds")}</th>
              {cols.map(([c, label]) => (
                <th key={c} className="w-14 text-center!">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => {
              const scratched = e.isScratched;
              const o = card.winOdds[String(e.horseNumber)];
              const isFav = !scratched && fav != null && o === fav;
              return (
                <tr key={e.horseNumber} className={cx("h-11", scratched && "text-ink-muted")}>
                  <td className="tabular-nums">{e.horseNumber}</td>
                  <td>
                    {/* opens past runs */}
                    <button
                      type="button"
                      className={cx("cursor-pointer text-left font-medium hover:underline", scratched ? "line-through" : "text-navy-900")}
                      title={t("form.open")}
                      onClick={() => setFormOf(e.horse)}
                    >
                      <Name kind="horse" code={e.horse.code} en={e.horse.name} />
                    </button>
                    {e.jockey?.name && (
                      <div className="mt-0.5 text-xs text-ink-muted md:hidden">
                        <Name kind="jockey" code={e.jockey.code} en={e.jockey.name} />
                        {e.draw ? <span className="sm:hidden"> · {t("common:word.draw")} {e.draw}</span> : null}
                      </div>
                    )}
                  </td>
                  <td className="hidden tabular-nums sm:table-cell">{e.draw}</td>
                  <td className="hidden tabular-nums sm:table-cell">{e.weight}</td>
                  <td className="hidden md:table-cell">{e.jockey && <Name kind="jockey" code={e.jockey.code} en={e.jockey.name} />}</td>
                  <td className="hidden lg:table-cell">{e.trainer && <Name kind="trainer" code={e.trainer.code} en={e.trainer.name} />}</td>
                  <td className="text-right">
                    {scratched ? (
                      <span className="text-[13px]">{t("common:word.scratchedShort")}</span>
                    ) : (
                      <span className={cx("inline-block min-w-9 rounded-xs px-1 py-0.5 text-center font-medium tabular-nums", isFav && "bg-odds-fav text-white")}>
                        {o ?? "-"}
                      </span>
                    )}
                  </td>
                  {cols.map(([c, label]) => {
                    const on = picks[c].includes(e.horseNumber);
                    const full = c === "bankers" && !on && picks.bankers.length >= bankerMax;
                    return (
                      <td key={c} className="text-center">
                        <input
                          type="checkbox"
                          className={tick}
                          checked={on}
                          disabled={scratched || full || readOnly}
                          aria-label={`${label} ${e.horseNumber}`}
                          onChange={() => onToggle(c, e.horseNumber)}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {/* Field: tick every runner in a selection column (not bankers). */}
            <tr className="h-11">
              <td className="font-medium">F</td>
              <td colSpan={1} className="text-ink">{t("card.field")}</td>
              <td className="hidden sm:table-cell" />
              <td className="hidden sm:table-cell" />
              <td className="hidden md:table-cell" />
              <td className="hidden lg:table-cell" />
              <td />
              {cols.map(([c, label]) => (
                <td key={c} className="text-center">
                  {c !== "bankers" && (
                    <input type="checkbox" className={tick} checked={allOn(c)} disabled={readOnly} aria-label={`${label} ${t("card.field")}`} onChange={() => onField(c, !allOn(c))} />
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-edge px-[13px] py-2 text-[13px] text-ink-muted">
        <span className="inline-flex items-center gap-1.5 text-ink">
          <span className="size-3.5 rounded-xs bg-odds-fav" aria-hidden /> {t("card.favourite")}
        </span>
        <span>
          {t("card.hint")} {bankerEnabled && pool !== "wp" ? t("card.hintBanker") : ""}
        </span>
      </div>
      {formOf && <HorseFormModal horse={formOf} onClose={() => setFormOf(null)} />}
    </section>
  );
}

// ---- A horse's past runs (from the racecard) ----
/** HKJC's own race-replay page for a past run (opens on racing.hkjc.com; we only link to it). */
function replayUrl(r: PastPerformance, lang: "en" | "zh-HK"): string {
  const day = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Hong_Kong" }).format(new Date(r.date)).replaceAll("-", "");
  const no = String(r.raceNumber).padStart(2, "0");
  return `https://racing.hkjc.com/racing/video/play.asp?type=replay-full&date=${day}&no=${no}&lang=${lang === "en" ? "eng" : "chi"}`;
}

export function HorseFormModal({ horse, onClose }: { horse: CardHorse; onClose: () => void }) {
  const { t } = useTranslation(["bet", "common"]);
  const g = useGlossary();
  const fmt = useFmt();
  const { lang } = useLanguage();
  const replay = (r: PastPerformance) => (
    <a
      href={replayUrl(r, lang)}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(btnPill, "gap-1 no-underline")}
      aria-label={t("form.replayAria", { date: fmt.date(r.date), race: r.raceNumber })}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden fill="currentColor">
        <path d="M2 1.2v7.6L8.6 5z" />
      </svg>
      {t("form.replay")}
    </a>
  );
  const runs = horse.pastPerformances ?? [];
  return (
    <div className={modalBg} onClick={onClose}>
      {/* wider than the default modal so all ten columns fit on desktop; phones get cards instead */}
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
            {/* Phones: one compact card per run, every field visible without scrolling. */}
            <ul className="mt-3 divide-y divide-edge rounded-card ring-1 ring-edge sm:hidden">
              {runs.map((r) => {
                const top3 = r.finishPosition > 0 && r.finishPosition <= 3;
                return (
                  <li key={`${r.date}-${r.raceNumber}`} className="px-3 py-2.5 text-[13px] tabular-nums even:bg-zebra">
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium text-navy-900">
                        {fmt.date(r.date, { year: "2-digit", month: "numeric", day: "numeric" })} · {g.venue(r.venue)} {t("form.race", { n: r.raceNumber })}
                      </span>
                      <span className={cx("ml-auto text-[15px] font-medium whitespace-nowrap", top3 && "text-good")}>
                        {r.finishPosition > 0 ? r.finishPosition : "-"}
                        {r.fieldSize ? <span className="text-[13px] font-normal text-ink-3">/{r.fieldSize}</span> : null}
                      </span>
                    </div>
                    <div className="mt-0.5 flex gap-2 text-ink">
                      <span>
                        {g.raceClass(r.raceClass)} · {t("common:metres", { n: r.distance })} · {g.going(r.going)}
                      </span>
                      <span className="ml-auto whitespace-nowrap">
                        <span className="text-ink-3">{t("common:word.odds")}</span> {r.odds ?? "-"}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-ink-3">
                      <span>
                        {t("common:word.draw")} <span className="text-ink">{r.draw ?? "-"}</span> · {t("common:word.weight")}{" "}
                        <span className="text-ink">{r.weight ?? "-"}</span> · {t("common:word.time")} <span className="text-ink">{fmtT(r.finishTime) || "-"}</span>
                      </span>
                      <span className="ml-auto flex-none">{replay(r)}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 hidden overflow-x-auto sm:block">
              <table className={cardTable}>
                <thead>
                  <tr>
                    <th>{t("common:word.date")}</th>
                    <th>{t("common:word.venue")}</th>
                    <th>{t("common:word.class")}</th>
                    <th className="text-right!">{t("form.distance")}</th>
                    <th>{t("form.going")}</th>
                    <th className="text-right!">{t("common:word.draw")}</th>
                    <th className="text-right!">{t("common:word.weight")}</th>
                    <th className="text-right!">{t("common:word.placing")}</th>
                    <th className="text-right!">{t("common:word.time")}</th>
                    <th className="text-right!">{t("common:word.odds")}</th>
                    <th>
                      <span className="sr-only">{t("form.replay")}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {runs.map((r) => (
                    <tr key={`${r.date}-${r.raceNumber}`}>
                      <td className="whitespace-nowrap tabular-nums">{fmt.date(r.date, { year: "2-digit", month: "numeric", day: "numeric" })}</td>
                      <td className="whitespace-nowrap">
                        {g.venue(r.venue)} <span className="text-ink-3">{t("form.race", { n: r.raceNumber })}</span>
                      </td>
                      <td className="whitespace-nowrap">{g.raceClass(r.raceClass)}</td>
                      <td className="text-right tabular-nums">{r.distance}</td>
                      <td className="whitespace-nowrap text-ink-2">{g.going(r.going)}</td>
                      <td className="text-right tabular-nums">{r.draw ?? "-"}</td>
                      <td className="text-right tabular-nums">{r.weight ?? "-"}</td>
                      <td className={cx("text-right tabular-nums whitespace-nowrap", r.finishPosition > 0 && r.finishPosition <= 3 && "font-semibold text-good")}>
                        {r.finishPosition > 0 ? r.finishPosition : "-"}
                        {r.fieldSize ? <span className="font-normal text-ink-3">/{r.fieldSize}</span> : null}
                      </td>
                      <td className="text-right tabular-nums">{fmtT(r.finishTime) || "-"}</td>
                      <td className="text-right tabular-nums">{r.odds ?? "-"}</td>
                      <td className="text-right">{replay(r)}</td>
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

// ---- Pool picker ----
/** Desktop: HKJC-style side menu. Phones: scrolling pill row. */
export function PoolMenu({
  value,
  onChange,
  dtAvailable,
  ttAvailable,
  variant,
}: {
  value: Pool;
  onChange: (p: Pool) => void;
  dtAvailable: boolean;
  ttAvailable: boolean;
  variant: "side" | "row";
}) {
  const { t } = useTranslation(["bet", "common"]);
  const name = usePoolName();
  const off = (p: Pool) => (p === "doubleTrio" && !dtAvailable) || (p === "tripleTrio" && !ttAvailable);
  if (variant === "row")
    return (
      <div className={cx(pillRow, "mt-3")} role="group" aria-label={t("betTypeGroup")}>
        {POOLS.map((p) => (
          <button key={p} className={cx(pill(value === p), "flex-none")} aria-pressed={value === p} disabled={off(p)} title={off(p) ? t("notOffered") : ""} onClick={() => onChange(p)}>
            {name(p)}
          </button>
        ))}
      </div>
    );
  return (
    <nav aria-label={t("betTypeGroup")} className="overflow-hidden rounded-card bg-surface shadow-card">
      <div className="px-3 pt-2 pb-1 text-[13px] text-link">{t("pool.menu")}</div>
      <ul className="divide-y divide-edge">
        {POOLS.map((p) => (
          <li key={p}>
            <button
              type="button"
              className={cx(
                "flex min-h-9 w-full cursor-pointer items-center px-3 text-left text-[13px] transition-colors disabled:cursor-not-allowed disabled:text-disabled",
                value === p ? "bg-navy-700 font-medium text-white" : "text-ink enabled:hover:bg-sky-50"
              )}
              aria-current={value === p ? "true" : undefined}
              disabled={off(p)}
              title={off(p) ? t("notOffered") : ""}
              onClick={() => onChange(p)}
            >
              {name(p)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Display name of a pool ("Win / Place" for the shared page). */
export function usePoolName() {
  const { t } = useTranslation(["bet", "common"]);
  const g = useGlossary();
  return (p: Pool) => (p === "wp" ? t("pool.wp") : g.betType(p));
}

// ---- Stake calculator ----
/** LIVE extras for the stake calculator (amounts in credits). */
export interface LiveStake {
  /** null for guests. */
  balance: number | null;
  /** Credits already on the slip. */
  slipTotal: number;
  /** Shown instead of Add when the race can't take LIVE bets (closed / unavailable / view-only). */
  blockedNote: string | null;
  onLogin: () => void;
  onBuy: () => void;
}

export function StakeBar({
  combos,
  unit,
  onUnit,
  onAdd,
  canAdd,
  live,
}: {
  combos: number;
  unit: number;
  onUnit: (n: number) => void;
  onAdd: () => void;
  canAdd: boolean;
  live?: LiveStake;
}) {
  const { t } = useTranslation(["bet", "common", "credits", "account"]);
  const fmt = useFmt();
  const [draft, setDraft] = useState(String(unit));
  const bad = !(Number(draft) >= MIN_UNIT);
  const total = combos * unit;
  const after = live?.balance != null ? live.balance - live.slipTotal - total : null;
  const short = after != null && after < 0 && combos > 0;
  if (live && live.balance === null && !live.blockedNote)
    return (
      <section role="region" aria-labelledby="live-guest" className="mt-3 rounded-card bg-sky-50 p-[13px] ring-1 ring-navy-700/20 sm:flex sm:items-center sm:gap-4">
        <div className="min-w-0 flex-1">
          <h3 id="live-guest" className="text-[15px] font-medium text-navy-900">{t("credits:guest.title")}</h3>
          <p className="mt-1 text-[13px] leading-normal text-ink">{t("credits:guest.body")}</p>
        </div>
        <button type="button" className={cx(btnPrimary, "mt-3 w-full sm:mt-0 sm:w-auto")} onClick={live.onLogin}>
          {t("account:login")}
        </button>
      </section>
    );
  return (
    <div className="mt-3 rounded-card bg-surface px-[13px] py-3 shadow-card">
      <div className="mb-2 text-[15px] text-ink">{t("stake.title")}</div>
      <div className="grid grid-cols-2 items-center gap-x-4 gap-y-3 sm:flex sm:flex-wrap">
        <div className="text-[15px]">
          {t("stake.combos")}: <strong className="font-medium tabular-nums">{combos ? fmt.num(combos) : "-"}</strong>
        </div>
        <label className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[15px]">
          <span className="whitespace-nowrap">{t("stake.unit")}</span>
          <span className="relative">
            <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-ink">{live ? <Coin /> : "$"}</span>
            <input
              type="number"
              inputMode="numeric"
              min={MIN_UNIT}
              step={1}
              className={cx(control, "w-24 pl-6 tabular-nums", bad && "border-bad")}
              value={draft}
              aria-invalid={bad}
              onChange={(e) => {
                setDraft(e.target.value);
                const n = Math.floor(Number(e.target.value));
                if (n >= MIN_UNIT) onUnit(n);
              }}
              onBlur={() => setDraft(String(unit))}
            />
          </span>
          {live && <span className="text-[15px]">{t("credits:unitWord")}</span>}
        </label>
        <div className="text-[15px] sm:ml-auto">
          {t("stake.total")}: <strong className="font-medium tabular-nums">{combos ? (live ? t("credits:unit", { n: fmt.num(total) }) : fmt.money(total)) : "-"}</strong>
        </div>
        <button
          className={cx(btnPrimary, "justify-self-end")}
          disabled={!canAdd || combos === 0 || short || !!live?.blockedNote}
          aria-describedby={short ? "stake-short" : undefined}
          onClick={onAdd}
        >
          {t("stake.add")}
        </button>
      </div>
      {bad && <p className="mt-2 text-[13px] text-bad">{live ? t("credits:stake.minUnit") : t("stake.minUnit")}</p>}
      {live?.blockedNote && <p className="mt-2 text-[13px] text-ink-muted">{live.blockedNote}</p>}
      {live && !live.blockedNote && after != null && (
        <p className="mt-2 text-[13px] text-ink-muted tabular-nums">
          {t("credits:stake.balance", { bal: fmt.num(live.balance!), after: "" })}
          <span className={short ? "font-medium text-bad" : undefined}>{after < 0 ? `−${fmt.num(-after)}` : fmt.num(after)}</span>
        </p>
      )}
      {short && (
        <p id="stake-short" className="mt-1 text-[13px] text-bad" aria-live="polite">
          {t("credits:stake.short")}{" "}
          <button type="button" className="cursor-pointer text-link hover:underline" onClick={live!.onBuy}>
            {t("credits:buy.cta")}
          </button>
        </p>
      )}
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
/** Outcome of every bet just placed from the slip; a running total when there's more than one. */
export function ResultModal({ bets, onClose, banner }: { bets: SettledBet[]; onClose: () => void; /** Guest "log in to save" prompt, shown above the bets. */ banner?: ReactNode }) {
  const { t } = useTranslation(["bet", "common"]);
  const fmt = useFmt();
  const multi = bets.length > 1;
  const sum = (f: (r: SettleResult) => number | null) => bets.reduce((s, b) => s + (f(b.result) ?? 0), 0);
  const totalNet = sum((r) => r.net);
  const anyHit = bets.some((b) => b.result.hit);
  return (
    <div className={modalBg} onClick={onClose}>
      <div className={modal} role="dialog" aria-modal="true" aria-label={anyHit ? t("result.hit") : t("result.miss")} onClick={(e) => e.stopPropagation()}>
        {banner}
        <div className="flex flex-col gap-4">
          {bets.map((b) => (
            <SettledCard key={b.item.id} bet={b} compact={multi} />
          ))}
        </div>
        {multi && (
          <div className="mt-4 flex items-baseline justify-between rounded-card bg-sky-150 px-[13px] py-3 text-navy-900">
            <span className="font-bold">{t("result.total")}</span>
            <span className="text-sm">
              {t("result.cost")} {fmt.money(sum((r) => r.cost))} · {t("result.payout")} {fmt.money(sum((r) => r.payout))} ·{" "}
              <strong className={cx("text-lg font-bold tabular-nums", totalNet >= 0 ? "text-good" : "text-bad")}>
                {totalNet >= 0 ? "+" : ""}
                {fmt.money(totalNet)}
              </strong>
            </span>
          </div>
        )}
        <button className={cx(btn, "mt-5 w-full sm:w-auto")} onClick={onClose}>{t("common:action.close")}</button>
      </div>
    </div>
  );
}

function SettledCard({ bet, compact }: { bet: SettledBet; compact: boolean }) {
  const { t } = useTranslation(["bet", "common"]);
  const fmt = useFmt();
  const text = useSlipText();
  const { item, result } = bet;
  const payoutStr = result.payout === null ? t("result.payoutUnknown") : fmt.money(result.payout);
  const netStr = result.net === null ? "—" : `${result.net >= 0 ? "+" : ""}${fmt.money(result.net)}`;
  return (
    <section className="overflow-hidden rounded-card ring-1 ring-edge">
      <div className="flex items-center gap-2 bg-navy-900 px-[13px] py-2 text-white">
        <span className="min-w-0 truncate text-[15px] font-medium">{text.title(item)}</span>
        <span className={cx("ml-auto flex-none rounded-full px-2.5 py-0.5 text-[13px] font-bold", result.hit ? "bg-good" : "bg-bad")}>
          {result.hit ? t("result.hit") : t("result.miss")}
        </span>
      </div>
      <div className="px-[13px] py-3">
        <p className="text-[13px] text-ink-muted">{text.picks(item)}</p>
        <p className="mt-1 text-sm text-ink">{settleText(result.detailInfo, t)}</p>

        {/* Finish order of every leg race — always shown, hit or miss. */}
        <div className="mt-3 flex flex-wrap gap-3">
          {result.legResults.map((lr) => (
            <div key={lr.raceNumber} className={cx("flex-[1_1_160px] rounded-control px-3 py-2.5 ring-1", lr.covered ? "bg-good-soft ring-good/25" : "bg-bad-soft ring-bad/20")}>
              <div className="mb-1.5 flex items-baseline justify-between">
                <span className="font-medium">{t("common:race", { n: lr.raceNumber })}</span>
                <span className={cx("text-sm font-medium", lr.covered ? "text-good" : "text-bad")}>{lr.covered ? t("result.covered") : t("result.missed")}</span>
              </div>
              <ol className="text-[13px]">
                {lr.finishers.slice(0, compact ? 4 : undefined).map((f) => (
                  <li key={`${f.position}-${f.horseNumber}`} className="flex gap-2 py-px">
                    <span className="w-4 text-ink-muted tabular-nums">{f.position}</span>
                    <span className="min-w-7 font-medium tabular-nums">#{f.horseNumber}</span>
                    <span className="truncate text-ink">
                      <Name kind="horse" code={f.horseCode} en={f.horseName} />
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <table className="mt-3 w-full border-collapse text-sm [&_td]:border-b [&_td]:border-edge [&_td]:py-2 [&_td:first-child]:text-ink [&_td:last-child]:text-right [&_td:last-child]:font-medium [&_td:last-child]:tabular-nums [&_tr:last-child_td]:border-b-0">
          <tbody>
            <tr><td>{t("result.poolDividend")}</td><td>{result.poolDividendText}</td></tr>
            <tr><td>{t("result.combosWon")}</td><td>{result.combosWon} / {result.combos}</td></tr>
            <tr><td>{t("result.unit")}</td><td>{fmt.money(item.unit)}</td></tr>
            <tr><td>{t("result.cost")}</td><td>{fmt.money(result.cost)}</td></tr>
            <tr><td>{t("result.payout")}</td><td>{payoutStr}</td></tr>
            <tr>
              <td className="font-medium">{t("result.net")}</td>
              <td>
                <span className={cx(figure, "text-[22px]", result.net === null ? "text-ink" : result.net >= 0 ? "text-good" : "text-bad")}>{netStr}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
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
  initialFilter,
}: {
  entries: HistoryEntry[];
  /** Practice rows only (LIVE rows are financial records). */
  onDelete: (id: string) => void;
  /** Clears practice rows; the page shows its own confirm dialog first. Rejects on failure. */
  onClear: () => Promise<unknown>;
  /** Open on this filter (e.g. "pending" from a "N pending live bets" link). */
  initialFilter?: HistoryFilter;
}) {
  const { t } = useTranslation(["history", "common", "credits"]);
  const [confirming, setConfirming] = useState(false);
  const g = useGlossary();
  const fmt = useFmt();
  const when = (ts: string) => fmt.date(ts, { dateStyle: "short", timeStyle: "short" });
  const live = entries.filter((e) => e.mode === "live");
  const practice = entries.filter((e) => e.mode !== "live");
  const pending = live.filter((e) => e.status === "pending");
  const hasLive = live.length > 0;
  const [filter, setFilter] = useState<HistoryFilter>(initialFilter ?? (hasLive ? "live" : "practice"));
  const f: HistoryFilter = hasLive ? filter : "practice";
  const rows = f === "live" ? live : f === "pending" ? pending : practice;
  const isLive = f !== "practice";
  // Practice amounts are imaginary HK$; LIVE amounts are credits. Never mixed in one view.
  const amount = (v: number) => (isLive ? fmt.num(v) : fmt.money(v));
  const signed = (v: number) => (v >= 0 ? "+" : "−") + amount(Math.abs(v));

  // Bets, hit rate, staked and returned all count SETTLED bets only; pending ones are listed separately.
  const settled = rows.filter((e) => e.status !== "pending");
  const pendingRows = rows.filter((e) => e.status === "pending");
  /** Picks are stored in the 膽/腳 format (history keeps it); show B/L in English. */
  const picks = (p: string) => p.replaceAll("膽", t("common:role.bankerShort")).replaceAll("腳", t("common:role.legShort"));
  const totalCost = settled.reduce((s, e) => s + e.cost, 0);
  // Treat unknown payouts (missing dividend) as 0 for the running total. LIVE returns include refunds.
  const totalReturn = settled.reduce((s, e) => s + (e.payout ?? 0) + (e.refund ?? 0), 0);
  const net = totalReturn - totalCost;
  const hits = settled.filter((e) => e.hit).length;
  const roi = totalCost ? (net / totalCost) * 100 : 0;
  const tone = (v: number) => (v >= 0 ? "text-good" : "text-bad");

  const chip = (e: HistoryEntry) =>
    e.status === "pending" ? (
      <span className={statusChip("pending")}>
        <svg aria-hidden="true" viewBox="0 0 12 12" className="size-3 fill-none stroke-current" strokeWidth="1.4">
          <circle cx="6" cy="6" r="4.5" />
          <path d="M6 3.5V6l1.6 1" />
        </svg>
        {t("credits:status.pending")}
      </span>
    ) : e.status === "won" ? (
      <span className={statusChip("won")}>{t("credits:status.won", { n: fmt.num((e.payout ?? 0) + (e.refund ?? 0)) })}</span>
    ) : e.status === "void" || (e.status === "lost" && (e.refund ?? 0) > 0) ? (
      <span className={statusChip("refunded")}>{t("credits:status.refunded", { n: fmt.num(e.refund ?? 0) })}</span>
    ) : (
      <span className={statusChip("lost")}>{t("credits:status.lost")}</span>
    );

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <Display sub={f === "live" ? t("credits:history.subLive") : f === "pending" ? t("credits:history.subPending") : t("sub")}>{t("title")}</Display>
        {practice.length > 0 && f === "practice" && (
          <button className={cx(btnDanger, "mb-2")} onClick={() => setConfirming(true)}>
            {hasLive ? t("credits:history.clearPractice") : t("common:action.clearAll")}
          </button>
        )}
      </div>
      {confirming && <ClearDialog count={practice.length} practiceOnly={hasLive} onCancel={() => setConfirming(false)} onConfirm={onClear} />}

      {hasLive && (
        <div className={cx(pillRow, "mt-2")} role="group" aria-label={t("credits:history.filters")}>
          {(["live", "practice", "pending"] as const).map((k) => (
            <button key={k} type="button" className={cx(pill(f === k), "flex-none")} aria-pressed={f === k} onClick={() => setFilter(k)}>
              {k === "live" ? t("credits:history.filterLive") : k === "practice" ? t("credits:history.filterPractice") : t("credits:history.filterPending", { n: pending.length })}
            </button>
          ))}
        </div>
      )}

      {f === "pending" ? (
        pending.length > 0 && (
          <p className={cx(panel, "mt-4 text-[15px] text-navy-900")}>
            {t("credits:history.pendingSummary", { count: pending.length, n: fmt.num(pending.reduce((s, e) => s + e.cost, 0)) })}
          </p>
        )
      ) : (
        <div className={cx(panel, "mt-4")}>
          {hasLive && <div className="mb-3 text-[13px] font-medium text-ink-muted">{f === "live" ? t("credits:history.statsLive") : t("credits:history.statsPractice")}</div>}
          <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
            <Stat label={t("stat.net")} big tone={tone(net)}>{signed(net)}</Stat>
            <Stat label={t("stat.roi")} tone={tone(roi)}>{roi >= 0 ? "+" : ""}{roi.toFixed(1)}%</Stat>
            <Stat label={t("stat.bets")}>{fmt.num(settled.length)}</Stat>
            <Stat label={t("stat.hits")}>{fmt.num(hits)}{settled.length ? <span className="text-lg text-ink-3"> {((100 * hits) / settled.length).toFixed(0)}%</span> : ""}</Stat>
            <Stat label={t("stat.staked")}>{amount(totalCost)}</Stat>
            <Stat label={t("stat.returned")}>{amount(totalReturn)}</Stat>
          </div>
          {isLive && pendingRows.length > 0 && (
            <p className="mt-4 text-[13px] text-ink-muted">
              {t("credits:history.pendingStats", { count: pendingRows.length, n: fmt.num(pendingRows.reduce((s, e) => s + e.cost, 0)) })}
            </p>
          )}
        </div>
      )}

      {rows.length === 0 ? (
        <div className={cx(panel, empty, "mt-4")}>{f === "live" ? t("credits:history.emptyLive") : f === "pending" ? t("credits:history.emptyPending") : t("empty")}</div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-card bg-surface shadow-card">
          <table
            className={cx(
              table,
              tablePad,
              isLive
                ? "text-sm [&_th:nth-child(-n+5)]:text-left [&_td:nth-child(-n+5)]:text-left [&_th:nth-child(8)]:text-left [&_td:nth-child(8)]:text-left"
                : "text-sm [&_th:nth-child(-n+4)]:text-left [&_td:nth-child(-n+4)]:text-left [&_th:nth-child(8)]:text-left [&_td:nth-child(8)]:text-left [&_th:nth-child(7)]:text-center [&_td:nth-child(7)]:text-center"
            )}
          >
            <thead>
              <tr>
                {isLive && <th>{t("credits:history.status")}</th>}
                <th>{t("col.placed")}</th><th>{t("col.meeting")}</th><th>{t("col.bet")}</th><th>{t("col.picks")}</th>
                <th>{t("col.combos")}</th><th>{t("col.cost")}</th>{!isLive && <th>{t("col.hit")}</th>}<th>{t("col.result")}</th>
                <th>{t("col.dividend")}</th><th>{t("col.payout")}</th><th>{t("col.net")}</th>
                {!isLive && <th><span className="sr-only">{t("col.delete")}</span></th>}
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => {
                const pend = e.status === "pending";
                return (
                  <tr key={e.id}>
                    {isLive && <td>{chip(e)}</td>}
                    <td className="text-ink-3">{when(e.ts)}</td>
                    <td>
                      {fmt.date(ymd(e.date))} {g.venue(e.venue)}
                      {hasLive && <span className={cx(modeBadge(isLive ? "live" : "practice", "white"), "ml-1.5")}>{t(isLive ? "credits:mode.live" : "credits:mode.practice")}</span>}
                    </td>
                    <td>{g.betType(e.betType)}</td>
                    <td className="text-xs text-ink-2">{picks(e.picks)}</td>
                    <td>{e.combos}</td>
                    <td>{amount(e.cost)}</td>
                    {!isLive && <td className={e.hit ? "font-semibold text-good" : "text-bad"}>{e.hit ? "✓" : "✗"}</td>}
                    <td className="font-medium">{pend ? "—" : e.result}</td>
                    <td className="text-ink-2">{pend ? "—" : e.poolDividendText}</td>
                    <td>{pend ? "—" : e.payout === null ? "?" : amount(e.payout)}</td>
                    <td className={cx("font-semibold", !pend && tone(e.net ?? 0))}>{pend || e.net === null ? "—" : signed(e.net)}</td>
                    {!isLive && (
                      <td>
                        <button
                          className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-sm text-ink-3 transition-colors hover:bg-bad-soft hover:text-bad"
                          aria-label={t("deleteAria", { when: when(e.ts) })}
                          onClick={() => onDelete(e.id)}
                        >
                          ✕
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export type HistoryFilter = "live" | "practice" | "pending";

/** In-app confirm for "Clear all" (same pattern as the delete-account dialog): Cancel focused, red outline action. */
function ClearDialog({ count, practiceOnly, onCancel, onConfirm }: { count: number; practiceOnly?: boolean; onCancel: () => void; onConfirm: () => Promise<unknown> }) {
  const { t } = useTranslation(["history", "common", "credits"]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const cancel = useRef<HTMLButtonElement>(null);
  useDialog(ref, () => !busy && onCancel(), cancel);

  async function run() {
    setBusy(true);
    setErr(false);
    try {
      await onConfirm();
      onCancel();
    } catch {
      setErr(true);
      setBusy(false);
    }
  }

  return (
    <div className={modalBg} onClick={() => !busy && onCancel()}>
      <div ref={ref} className={modalNarrow} role="alertdialog" aria-modal="true" aria-labelledby="clear-title" aria-describedby="clear-body" onClick={(e) => e.stopPropagation()}>
        <h2 id="clear-title" className="text-[15px] font-medium text-navy-900 sm:text-[17px]">
          {practiceOnly ? t("credits:history.clearPracticeConfirm", { n: count }) : t("clearConfirm", { n: count })}
        </h2>
        {err && (
          <div className={errorBox} role="alert">
            {t("clearError")}
          </div>
        )}
        <p id="clear-body" className="mt-2 text-[15px] leading-normal text-ink">
          {t("clearBody")}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <button ref={cancel} type="button" className={btn} disabled={busy} onClick={onCancel}>
            {t("clearCancel")}
          </button>
          <button type="button" className={btnDanger} disabled={busy} onClick={() => void run()}>
            {busy && <Spinner />}
            {t("common:action.clearAll")}
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, big, tone, children }: { label: string; big?: boolean; tone?: string; children: ReactNode }) {
  return (
    <div className={cx("flex min-w-0 flex-col", big && "col-span-2 sm:col-span-1")}>
      <span className="text-[13px] text-ink-muted">{label}</span>
      <strong className={cx(figure, "mt-2", big ? "text-[32px]" : "text-[22px]", tone ?? "text-ink")}>{children}</strong>
    </div>
  );
}

export { ymd };

/** Compact summary of one leg's picks. Stored in history as-is — keep the 膽/腳 format. */
export function legSummary(leg: RaceLeg): string {
  const b = leg.bankers.length ? `膽 ${leg.bankers.join(",")}` : "";
  const l = leg.legs.length ? `腳 ${leg.legs.join(",")}` : "";
  return [b, l].filter(Boolean).join("  ") || "—";
}
