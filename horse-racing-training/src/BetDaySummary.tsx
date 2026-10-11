// Bet tab card (under "Analysis for reference", same collapsible look): the member's own bets on the
// selected racing day, so they don't have to switch to History mid-meeting. Live (credits) and practice (imaginary HK$) are never mixed: each
// gets its own block. Guests see this visit's practice bets (nothing is saved for them) and a log-in link.
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import type { HistoryEntry, Venue } from "../shared/types";
import { btn, cx, panel } from "./kit";
import { HistoryLedger } from "./ui";
import { useGlossary } from "./i18n/glossary";
import { useFmt } from "./i18n/useLanguage";
import { ymd } from "./slip";

const OPEN_KEY = "pt:daySummaryOpen";
const COLLAPSE = { duration: 0.24, ease: [0.2, 0, 0, 1] } as const;
const readOpen = () => {
  try {
    return localStorage.getItem(OPEN_KEY) === "1";
  } catch {
    return false;
  }
};

/** Settled-bet totals (pending LIVE bets are counted apart, as on History). */
function totals(rows: HistoryEntry[]) {
  const settled = rows.filter((e) => e.status !== "pending");
  const pending = rows.filter((e) => e.status === "pending");
  const staked = settled.reduce((s, e) => s + e.cost, 0);
  const returned = settled.reduce((s, e) => s + (e.payout ?? 0) + (e.refund ?? 0), 0);
  return {
    settled: settled.length,
    hits: settled.filter((e) => e.hit).length,
    staked,
    returned,
    net: returned - staked,
    roi: staked ? ((returned - staked) / staked) * 100 : 0,
    pending: pending.length,
    pendingStake: pending.reduce((s, e) => s + e.cost, 0),
  };
}

export function BetDaySummary({
  date,
  venue,
  entries,
  guest,
  onLogin,
  onOpenHistory,
  shareName,
  onDelete,
}: {
  /** Meeting date (YYYYMMDD) and venue. */
  date: string;
  venue: Venue;
  /** The member's history (null while loading) or, for guests, this visit's bets. */
  entries: HistoryEntry[] | null;
  guest: boolean;
  onLogin: () => void;
  onOpenHistory: () => void;
  /** Member's display name: Share on live bets, as on History. */
  shareName?: string;
  /** Delete a practice bet (members only, as on History). */
  onDelete?: (id: string) => void;
}) {
  const { t } = useTranslation(["bet", "history", "credits", "common"]);
  const g = useGlossary();
  const fmt = useFmt();
  const [open, setOpen] = useState(readOpen);
  const day = (entries ?? []).filter((e) => e.date === date && e.venue === venue).sort((a, b) => b.ts.localeCompare(a.ts));
  const live = day.filter((e) => e.mode === "live");
  const practice = day.filter((e) => e.mode !== "live");

  // Collapsed line: one figure per mode, net of settled bets.
  const amount = (isLive: boolean, v: number) => (isLive ? t("credits:unit", { n: fmt.num(v) }) : fmt.money(v));
  const signed = (isLive: boolean, v: number) => (v >= 0 ? "+" : "−") + amount(isLive, Math.abs(v));
  const tone = (v: number) => (v > 0 ? "text-good" : v < 0 ? "text-bad" : "text-ink");
  const brief = ([[true, live], [false, practice]] as const)
    .filter(([, rows]) => rows.length)
    .map(([isLive, rows]) => {
      const s = totals(rows);
      return (
        <span key={String(isLive)} className="whitespace-nowrap">
          {isLive ? t("credits:history.filterLive") : t("credits:history.filterPractice")} {t("bet:day.bets", { count: rows.length })}
          {s.settled > 0 && <span className={cx("ml-1 font-medium", tone(s.net))}>{signed(isLive, s.net)}</span>}
        </span>
      );
    });

  const toggle = () => {
    const o = !open;
    setOpen(o);
    try {
      localStorage.setItem(OPEN_KEY, o ? "1" : "0");
    } catch {
      /* per-device convenience only */
    }
  };

  return (
    <section className={cx(panel, "mt-3 p-0 sm:p-0")}>
      <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left sm:px-5"
        aria-expanded={open}
        aria-controls="bet-day-summary"
        onClick={toggle}
      >
        <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3">
          <span className="flex-none text-sm font-semibold text-ink">{t("bet:day.cardTitle")}</span>
          <span className="flex min-w-0 flex-wrap items-center gap-x-3 text-xs text-ink-2 tabular-nums">
            <span className="whitespace-nowrap">
              {fmt.date(ymd(date))} {g.venue(venue)}
            </span>
            {entries === null ? t("common:state.loading") : brief.length ? brief : t("bet:day.none")}
          </span>
        </span>
        <motion.span aria-hidden className="flex-none text-ink-3" animate={{ rotate: open ? 180 : 0 }} transition={COLLAPSE}>
          ▼
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="day"
            id="bet-day-summary"
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={COLLAPSE}
          >
            <div className="border-t border-edge px-4 pt-3 pb-4 sm:px-5">
              {entries === null ? (
                <div className="h-16 rounded-card bg-surface-2 motion-safe:animate-pulse" role="status" aria-label={t("common:state.loading")} />
              ) : day.length === 0 ? (
                <p className="m-0 text-[13px] text-ink-muted">{t("bet:day.empty")}</p>
              ) : (
                <div className="flex flex-col gap-5">
                  {live.length > 0 && <HistoryLedger rows={live} isLive statsLabel where={false} flat shareName={shareName} emptyText="" />}
                  {practice.length > 0 && <HistoryLedger rows={practice} isLive={false} statsLabel where={false} flat onDelete={onDelete} emptyText="" />}
                </div>
              )}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <p className="m-0 text-[12px] leading-normal text-ink-muted">{guest ? t("bet:day.guestNote") : t("bet:day.note")}</p>
                {guest ? (
                  <button type="button" className={cx(btn, "h-11")} onClick={onLogin}>
                    {t("bet:day.login")}
                  </button>
                ) : (
                  <button type="button" className="inline-flex min-h-11 cursor-pointer items-center text-[13px] text-link hover:underline" onClick={onOpenHistory}>
                    {t("bet:day.history")}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
