// HKJC-style bet slip: right-hand panel on desktop, bottom bar + sheet on phones.
// Flow: Add (stake calculator) → slip → Place bet → Confirm → settle.
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGlossary } from "./i18n/glossary";
import { useFmt } from "./i18n/useLanguage";
import { btn, btnPrimary, cx } from "./kit";
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

interface Props {
  items: SlipItem[];
  onRemove: (id: string) => void;
  onClear: () => void;
  /** Settle everything on the slip; resolves when done. */
  onConfirm: () => Promise<void>;
}

export function BetSlip(props: Props) {
  const { t } = useTranslation(["bet", "common"]);
  const fmt = useFmt();
  const [stage, setStage] = useState<Stage>("edit");
  const [sheet, setSheet] = useState(false);
  const total = props.items.reduce((s, it) => s + it.cost, 0);

  // An emptied slip can't stay on the confirm step.
  useEffect(() => {
    if (!props.items.length) setStage("edit");
  }, [props.items.length]);

  // Phone sheet: Esc closes, page behind doesn't scroll.
  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheet(false);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [sheet]);

  const confirm = async () => {
    await props.onConfirm();
    setStage("edit");
    setSheet(false);
  };
  const body = <SlipBody {...props} stage={stage} setStage={setStage} onConfirm={confirm} total={total} />;

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
          <span className="ml-auto font-medium tabular-nums">{fmt.money(total)}</span>
          <svg width="14" height="14" viewBox="0 0 12 12" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3 7.5 6 4.5 9 7.5" />
          </svg>
        </button>
      </div>
      {sheet && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setSheet(false)} />
          <div role="dialog" aria-modal="true" aria-label={t("slip.title")} className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-auto rounded-t-sheet bg-canvas pb-[env(safe-area-inset-bottom)]">
            <div className="flex justify-center pt-2 pb-1">
              <button type="button" className="h-5 w-16 cursor-pointer" aria-label={t("slip.close")} onClick={() => setSheet(false)}>
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
}: Props & { stage: Stage; setStage: (s: Stage) => void; total: number }) {
  const { t } = useTranslation(["bet", "common"]);
  const fmt = useFmt();
  const text = useSlipText();
  const [busy, setBusy] = useState(false);
  return (
    <div className="overflow-hidden rounded-card bg-surface shadow-card">
      <div className="flex min-h-9 items-center bg-navy-900 px-[13px] py-2 text-[15px] font-medium text-white">
        {stage === "confirm" ? t("slip.confirmTitle") : t("slip.title")}
      </div>
      {items.length === 0 ? (
        <p className="px-[13px] py-6 text-center text-[13px] text-ink-muted">{t("slip.empty")}</p>
      ) : (
        <ul className="max-h-[55dvh] divide-y divide-edge overflow-auto">
          {items.map((it) => (
            <li key={it.id} className="px-[13px] py-2.5">
              <div className="flex items-start gap-2">
                <span className="min-w-0 flex-1 text-[13px] font-medium text-navy-900">{text.title(it)}</span>
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
                <span className="text-ink-muted">{t("slip.line", { unit: fmt.money(it.unit), combos: fmt.num(it.combos) })}</span>
                <span className="ml-auto font-medium">{fmt.money(it.cost)}</span>
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
          <span className="ml-auto font-bold tabular-nums">{fmt.money(total)}</span>
        </div>
      </div>
      {stage === "confirm" && <p className="px-[13px] pt-3 text-[13px] text-ink-muted">{t("slip.confirmNote")}</p>}
      <div className="flex gap-2 p-[13px]">
        {stage === "edit" ? (
          <>
            <button className={cx(btn, "flex-none")} disabled={!items.length} onClick={onClear}>
              {t("slip.clear")}
            </button>
            <button className={cx(btnPrimary, "min-w-0 flex-1")} disabled={!items.length} onClick={() => setStage("confirm")}>
              {t("slip.place")}
            </button>
          </>
        ) : (
          <>
            <button className={cx(btn, "flex-none")} disabled={busy} onClick={() => setStage("edit")}>
              {t("slip.back")}
            </button>
            <button
              className={cx(btnPrimary, "min-w-0 flex-1")}
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                try {
                  await onConfirm();
                } finally {
                  setBusy(false);
                }
              }}
            >
              {t("slip.confirm")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
