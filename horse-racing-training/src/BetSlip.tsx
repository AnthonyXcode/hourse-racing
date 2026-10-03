// HKJC-style bet slip: right-hand panel on desktop, bottom bar + sheet on phones.
// Flow: Add (stake calculator) → slip → Place bet → Confirm → settle.
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGlossary } from "./i18n/glossary";
import { useFmt } from "./i18n/useLanguage";
import { btn, btnPrimary, cx, errorBox, modeBadge } from "./kit";
import { ymd, type SlipItem } from "./slip";

/** Display text for a slip item, in the current language. */
export function useSlipText() {
  const { t } = useTranslation(["bet", "common"]);
  const g = useGlossary();
  const fmt = useFmt();
  const races = (it: SlipItem) => it.selection.raceLegs.map((l) => l.raceNumber);
  return {
    title: (it: SlipItem) =>
      `${g.betType(it.betType)} · ${t("slip.race", { date: fmt.date(ymd(it.date), { month: "numeric", day: "numeric" }), venue: g.venue(it.venue), race: races(it).join(", ") })}`,
    picks: (it: SlipItem) => {
      const multi = it.selection.raceLegs.length > 1;
      return it.selection.raceLegs
        .map((l) => {
          const parts = [
            l.bankers.length ? `${t("common:role.bankerShort")} ${l.bankers.join(",")}` : "",
            l.legs.length ? `${multi || l.bankers.length ? t("common:role.legShort") + " " : ""}${l.legs.join(",")}` : "",
          ].filter(Boolean);
          return (multi ? `${t("common:raceShort", { n: l.raceNumber })}: ` : "") + (parts.join("  ") || "—");
        })
        .join("  |  ");
    },
  };
}

type Stage = "edit" | "confirm";
/** Seconds the confirm step waits before placing the bets by itself. */
const AUTO_CONFIRM_S = 5;

/** LIVE slip extras (docs/credits/DESIGN-SPEC.md §3b). */
export interface LiveSlip {
  balance: number | null;
  /** Non-field error from the last placement attempt. */
  error: string | null;
  /** Items the server said are closed. */
  closedIds: Set<string>;
  /** Shown instead of the items after a successful placement. */
  receipt: { count: number; total: number; balance: number } | null;
  onBuy: () => void;
  onRemoveClosed: () => void;
  onReceiptDone: () => void;
  onViewBets: () => void;
}

interface Props {
  items: SlipItem[];
  onRemove: (id: string) => void;
  onClear: () => void;
  /** Settle (practice) or place (live) everything on the slip; resolves when done. */
  onConfirm: () => Promise<void>;
  /** Set when the slip holds LIVE bets (no auto-confirm, amounts in credits). */
  live?: LiveSlip;
  /** A live meeting is open: an empty slip shows credits, not $. */
  liveContext?: boolean;
}

export function BetSlip(props: Props) {
  const { t } = useTranslation(["bet", "common", "credits"]);
  const fmt = useFmt();
  const [stage, setStage] = useState<Stage>("edit");
  const [sheet, setSheet] = useState(false);
  const [left, setLeft] = useState(AUTO_CONFIRM_S);
  /** When the confirm step places the bets by itself (epoch ms). Wall clock, so throttled timers don't stretch it. */
  const deadline = useRef(0);
  const [busy, setBusy] = useState(false);
  const firing = useRef(false);
  const total = props.items.reduce((s, it) => s + it.cost, 0);
  const live = props.live;
  const mode: "practice" | "live" | null = live ? "live" : props.items.length ? "practice" : null;
  const inCredits = !!live || (!props.items.length && !!props.liveContext);
  const amount = (n: number) => (inCredits ? t("credits:unit", { n: fmt.num(n) }) : fmt.money(n));

  // An emptied slip can't stay on the confirm step.
  useEffect(() => {
    if (!props.items.length) setStage("edit");
  }, [props.items.length]);

  // Closing the phone sheet cancels a pending confirm.
  const closeSheet = () => {
    setSheet(false);
    if (!firing.current) setStage("edit");
  };

  // Phone sheet: Esc closes, page behind doesn't scroll.
  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeSheet();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [sheet]);

  // Settle once, whether tapped or fired by the countdown. Lives here, not in SlipBody, because the
  // body is mounted twice (desktop aside + phone sheet) and must not place the bets twice.
  const confirm = async () => {
    if (firing.current) return;
    firing.current = true;
    setBusy(true);
    try {
      await props.onConfirm();
    } finally {
      firing.current = false;
      setBusy(false);
      setStage("edit");
      if (!live) setSheet(false); // live keeps the sheet open for the receipt or the error
    }
  };

  // Confirm step (practice only): count down, then place the bets automatically. Back cancels.
  // LIVE spends credits and can't be undone, so it always needs an explicit tap (no auto-confirm).
  useEffect(() => {
    if (stage !== "confirm" || busy || live) return;
    const tick = () => {
      const n = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000));
      setLeft(n);
      if (n === 0) void confirm();
    };
    const id = setInterval(tick, 200);
    return () => clearInterval(id);
  }, [stage, busy, !!live]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = (s: Stage) => {
    if (s === "confirm") {
      deadline.current = Date.now() + AUTO_CONFIRM_S * 1000;
      setLeft(AUTO_CONFIRM_S);
    }
    setStage(s);
  };
  const body = <SlipBody {...props} stage={stage} setStage={go} onConfirm={confirm} total={total} left={left} busy={busy} mode={mode} amount={amount} />;

  return (
    <>
      {/* Desktop: sticky right column. */}
      <aside className="sticky top-[calc(var(--header-h,64px)+12px)] hidden lg:block" aria-label={t("slip.title")}>
        {body}
      </aside>

      {/* Phones: bottom bar opens a sheet. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-edge bg-surface pb-[env(safe-area-inset-bottom)] shadow-pop lg:hidden">
        <button
          type="button"
          className="flex h-14 w-full cursor-pointer items-center gap-3 px-4 text-left"
          aria-label={t("slip.open")}
          aria-expanded={sheet}
          onClick={() => setSheet(true)}
        >
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-navy-700 text-[13px] font-medium text-white tabular-nums">{props.items.length}</span>
          <span className="font-medium text-navy-900">{t("slip.title")}</span>
          {mode && <span className={modeBadge(mode, "white")}>{t(`credits:mode.${mode}`)}</span>}
          <span className="ml-auto font-medium tabular-nums">{amount(total)}</span>
          <svg width="14" height="14" viewBox="0 0 12 12" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3 7.5 6 4.5 9 7.5" />
          </svg>
        </button>
      </div>
      {sheet && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={closeSheet} />
          <div role="dialog" aria-modal="true" aria-label={t("slip.title")} className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-auto rounded-t-sheet bg-canvas pb-[env(safe-area-inset-bottom)]">
            <div className="flex justify-center pt-2 pb-1">
              <button type="button" className="h-5 w-16 cursor-pointer" aria-label={t("slip.close")} onClick={closeSheet}>
                <span className="mx-auto block h-1 w-10 rounded-full bg-line-strong" />
              </button>
            </div>
            <div className="px-2 pb-2">{body}</div>
          </div>
        </div>
      )}
    </>
  );
}

function SlipBody({
  items,
  onRemove,
  onClear,
  onConfirm,
  stage,
  setStage,
  total,
  left,
  busy,
  mode,
  amount,
  live,
}: Props & { stage: Stage; setStage: (s: Stage) => void; total: number; left: number; busy: boolean; mode: "practice" | "live" | null; amount: (n: number) => string }) {
  const { t } = useTranslation(["bet", "common", "credits"]);
  const fmt = useFmt();
  const text = useSlipText();
  const after = live?.balance != null ? live.balance - total : null;
  const short = after != null && after < 0;
  const receiptHead = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (live?.receipt) receiptHead.current?.focus();
  }, [live?.receipt]);
  return (
    <div className="overflow-hidden rounded-card bg-surface shadow-card">
      <div className="flex min-h-9 items-center gap-2 bg-navy-900 px-[13px] py-2 text-[15px] font-medium text-white">
        {stage === "confirm" ? (live ? t("credits:slip.confirmTitle") : t("slip.confirmTitle")) : t("slip.title")}
        {mode && <span className={cx(modeBadge(mode, "navy"), "ml-auto")}>{mode === "live" && <span aria-hidden="true" className="size-1.5 rounded-full bg-ink-strong" />}{t(`credits:mode.${mode}`)}</span>}
      </div>
      {live?.receipt ? (
        <div className="m-[13px] rounded-card bg-sky-50 p-[13px]">
          <h3 ref={receiptHead} tabIndex={-1} className="text-[15px] font-medium text-navy-900">
            {t("credits:slip.placedTitle")}
          </h3>
          <p className="mt-1 text-[13px] text-ink tabular-nums">
            {t("credits:slip.placedBody", { count: live.receipt.count, total: fmt.num(live.receipt.total), bal: fmt.num(live.receipt.balance) })}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <button type="button" className={btn} onClick={live.onViewBets}>
              {t("credits:slip.viewBets")}
            </button>
            <button type="button" className="h-11 cursor-pointer text-[15px] text-link hover:underline" onClick={live.onReceiptDone}>
              {t("credits:slip.done")}
            </button>
          </div>
        </div>
      ) : items.length === 0 ? (
        <p className="px-[13px] py-6 text-center text-[13px] text-ink-muted">{t("slip.empty")}</p>
      ) : (
        <ul className="max-h-[55dvh] divide-y divide-edge overflow-auto">
          {items.map((it) => (
            <li key={it.id} className={cx("px-[13px] py-2.5", live?.closedIds.has(it.id) && "bg-bad-soft")}>
              <div className="flex items-start gap-2">
                <span className="min-w-0 flex-1 text-[13px] font-medium text-navy-900">{text.title(it)}</span>
                {live?.closedIds.has(it.id) && <span className="flex-none rounded-full px-2 text-[13px] font-medium text-bad">🔒 {t("credits:slip.closedTag")}</span>}
                {stage === "edit" && (
                  <button
                    type="button"
                    className="-mt-1 -mr-1.5 inline-flex size-7 flex-none cursor-pointer items-center justify-center rounded-full text-ink-muted hover:bg-bad-soft hover:text-bad"
                    aria-label={t("slip.remove")}
                    onClick={() => onRemove(it.id)}
                  >
                    ✕
                  </button>
                )}
              </div>
              <div className="mt-0.5 text-[13px] break-words text-ink">{text.picks(it)}</div>
              <div className="mt-1 flex text-[13px] tabular-nums">
                <span className="text-ink-muted">{live ? t("credits:slip.line", { unit: fmt.num(it.unit), combos: fmt.num(it.combos) }) : t("slip.line", { unit: fmt.money(it.unit), combos: fmt.num(it.combos) })}</span>
                <span className="ml-auto font-medium">{amount(it.cost)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="border-t border-edge bg-sky-150 px-[13px] py-2 text-[13px] text-navy-900">
        <div className="flex">
          <span>{t("slip.count")}</span>
          <span className="ml-auto font-bold tabular-nums">{fmt.num(items.length)}</span>
        </div>
        <div className="flex">
          <span>{t("slip.amount")}</span>
          <span className="ml-auto font-bold tabular-nums">{amount(total)}</span>
        </div>
        {live && live.balance != null && (
          <>
            <div className="flex">
              <span>{t("credits:slip.balance")}</span>
              <span className="ml-auto font-bold tabular-nums">{amount(live.balance)}</span>
            </div>
            <div className="flex">
              <span>{t("credits:slip.after")}</span>
              <span className={cx("ml-auto font-bold tabular-nums", short && "text-bad")} aria-live="polite">
                {short ? `−${t("credits:unit", { n: fmt.num(-after!) })}` : amount(after!)}
              </span>
            </div>
          </>
        )}
      </div>
      {live && !live.receipt && (short || live.error) && (
        <div className="px-[13px]">
          <div className={errorBox} role="alert">
            {live.error ?? t("credits:slip.short")}
            {live.closedIds.size > 0 && (
              <button type="button" className={cx(btn, "mt-2 flex")} onClick={live.onRemoveClosed}>
                {t("credits:slip.removeClosed")}
              </button>
            )}
          </div>
        </div>
      )}
      {stage === "confirm" && live && (
        <div className="px-[13px] pt-3 text-[13px]">
          <p className="text-ink-muted">{t("credits:slip.confirmNote")}</p>
        </div>
      )}
      {stage === "confirm" && !live && (
        <div className="px-[13px] pt-3 text-[13px]">
          <p className="text-ink-muted">{t("slip.confirmNote")}</p>
          {!busy && (
            <p className="mt-1 font-medium text-navy-900" aria-live="polite">
              {t("slip.autoNote", { n: left })}
            </p>
          )}
        </div>
      )}
      <div className="flex gap-2 p-[13px]">
        {stage === "edit" ? (
          <>
            <button className={cx(btn, "flex-none")} disabled={!items.length} onClick={onClear}>
              {t("slip.clear")}
            </button>
            {live && short ? (
              <button className={cx(btnPrimary, "min-w-0 flex-1")} onClick={live.onBuy}>
                {t("credits:buy.cta")}
              </button>
            ) : (
              <button className={cx(btnPrimary, "min-w-0 flex-1")} disabled={!items.length || !!live?.receipt || (live ? live.closedIds.size > 0 : false)} onClick={() => setStage("confirm")}>
                {t("slip.place")}
              </button>
            )}
          </>
        ) : (
          <>
            <button className={cx(btn, "flex-none")} disabled={busy} onClick={() => setStage("edit")}>
              {t("slip.back")}
            </button>
            <button
              className={cx(btnPrimary, "min-w-0 flex-1")}
              disabled={busy}
              onClick={() => void onConfirm()}
            >
              {live ? (busy ? t("credits:slip.placing") : t("credits:slip.confirm", { n: fmt.num(total) })) : busy ? t("slip.confirm") : t("slip.confirmIn", { n: left })}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
