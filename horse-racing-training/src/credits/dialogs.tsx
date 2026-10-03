// Credits dialogs (docs/credits/DESIGN-SPEC.md §3b, §6, §7a): 18+ declaration, welcome bonus, slip mode switch.
import { useRef, useState, type ReactNode } from "react";
import { Trans, useTranslation } from "react-i18next";
import { btn, btnPrimary, cx, errorBox, modalBgTop, modalNarrow } from "../kit";
import { useFmt } from "../i18n/useLanguage";
import { Spinner, textBtn, useDialog } from "../members/ui";

/** A gold coin glyph (decorative). */
export function Coin({ size = 14 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 16 16" className="flex-none">
      <circle cx="8" cy="8" r="7.5" className="fill-gold" />
      <circle cx="8" cy="8" r="5" className="fill-none stroke-navy-900" strokeWidth="1" />
    </svg>
  );
}

function Dialog({ titleId, onClose, children, initial, role = "dialog" }: { titleId: string; onClose: () => void; children: ReactNode; initial?: React.RefObject<HTMLElement>; role?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(ref, onClose, initial);
  return (
    <div className={modalBgTop} onClick={onClose}>
      <div ref={ref} className={modalNarrow} role={role} aria-modal="true" aria-labelledby={titleId} onClick={(e) => e.stopPropagation()}>
        <div aria-hidden="true" className="mx-auto mb-3 h-1 w-10 rounded-full bg-line sm:hidden" />
        {children}
      </div>
    </div>
  );
}

const title = "text-[15px] font-medium text-navy-900 sm:text-[17px]";

export function AgeDialog({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => Promise<void> }) {
  const { t } = useTranslation("credits");
  const cancel = useRef<HTMLButtonElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  return (
    <Dialog titleId="age-title" onClose={() => !busy && onCancel()} initial={cancel}>
      <h2 id="age-title" className={title}>
        {t("age.title")}
      </h2>
      {err && (
        <div className={errorBox} role="alert">
          {err}
        </div>
      )}
      <p className="mt-2 text-[15px] leading-normal text-ink">{t("age.body")}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <button ref={cancel} type="button" className={btn} disabled={busy} onClick={onCancel}>
          {t("age.cancel")}
        </button>
        <button
          type="button"
          className={btnPrimary}
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            setErr("");
            try {
              await onConfirm();
            } catch {
              setErr(t("err.generic"));
              setBusy(false);
            }
          }}
        >
          {busy && <Spinner />}
          {t("age.confirm")}
        </button>
      </div>
      <p className="mt-3 text-[13px] text-ink-muted">
        <Trans t={t} i18nKey="age.help" components={{ help: <a className="text-link hover:underline" href="?tab=terms" target="_blank" rel="noopener" /> /* responsible-gambling link: PM to supply (spec §10 Q5) */ }} />
      </p>
    </Dialog>
  );
}

export function WelcomeDialog({ amount, livePaused, onCta, onClose }: { amount: number; livePaused: boolean; onCta: () => void; onClose: () => void }) {
  const { t } = useTranslation("credits");
  const fmt = useFmt();
  return (
    <Dialog titleId="welcome-title" onClose={onClose}>
      <div className="flex justify-center">
        <Coin size={48} />
      </div>
      <h2 id="welcome-title" className={cx(title, "mt-3 text-center")}>
        {t("welcome.title", { n: fmt.num(amount) })}
      </h2>
      <p className="mt-2 text-[15px] leading-normal text-ink">{livePaused ? t("welcome.bodyPaused") : t("welcome.body")}</p>
      <p className="mt-2 text-[13px] text-ink-muted">{t("welcome.note")}</p>
      {livePaused ? (
        <button type="button" className={cx(btnPrimary, "mt-4 w-full")} onClick={onClose}>
          {t("welcome.ok")}
        </button>
      ) : (
        <>
          <button type="button" className={cx(btnPrimary, "mt-4 w-full")} onClick={onCta}>
            {t("welcome.cta")}
          </button>
          <div className="flex justify-center">
            <button type="button" className={textBtn} onClick={onClose}>
              {t("welcome.later")}
            </button>
          </div>
        </>
      )}
    </Dialog>
  );
}

export function SwitchModeDialog({ mode, onCancel, onConfirm }: { mode: "practice" | "live"; onCancel: () => void; onConfirm: () => void }) {
  const { t } = useTranslation("credits");
  const cancel = useRef<HTMLButtonElement>(null);
  return (
    <Dialog titleId="switch-title" onClose={onCancel} initial={cancel} role="alertdialog">
      <h2 id="switch-title" className={title}>
        {t("slip.switchTitle", { mode: t(`mode.${mode}`) })}
      </h2>
      <div className="mt-5 flex items-center justify-between gap-3">
        <button ref={cancel} type="button" className={btn} onClick={onCancel}>
          {t("slip.switchCancel")}
        </button>
        <button type="button" className={btn} onClick={onConfirm}>
          {t("slip.switchConfirm")}
        </button>
      </div>
    </Dialog>
  );
}
