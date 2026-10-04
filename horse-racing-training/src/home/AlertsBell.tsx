// Bell on the "5 stars" card: 5★ pick SMS alerts (members only). Guests get the login sheet first, then
// the popup. Two SMS per racing day; the server sends them (server/alerts).
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { btn, btnPrimary, cx, modalBgTop, modalNarrow } from "../kit";
import { useAuth } from "../members/auth";
import { memberApi } from "../members/api";
import { Spinner, useDialog } from "../members/ui";

/** +85291235678 → +852 •••• 5678 */
export const maskedPhone = (e164: string) => `+852 •••• ${e164.slice(-4)}`;

export function AlertsBell() {
  const { t } = useTranslation("home");
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const on = !!auth.user?.alerts5Star;
  const tap = () => (auth.user ? setOpen(true) : auth.openLogin({ source: "alerts", onLoggedIn: () => setOpen(true) }));
  return (
    <>
      <button
        type="button"
        className="inline-flex size-11 flex-none cursor-pointer items-center justify-center rounded-full text-navy-700 transition-colors hover:bg-sky-50"
        aria-label={t("alerts.bell")}
        aria-pressed={on}
        title={t("alerts.bell")}
        onClick={tap}
      >
        <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true" fill={on ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
          <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16Z" />
          <path d="M10 20.5a2 2 0 0 0 4 0" fill="none" />
        </svg>
      </button>
      {/* Portalled: the card animates with a transform, which would trap a fixed-position modal inside it. */}
      {open && auth.user && createPortal(<AlertsDialog onClose={() => setOpen(false)} />, document.body)}
    </>
  );
}

function AlertsDialog({ onClose }: { onClose: () => void }) {
  const { t, i18n } = useTranslation("home");
  const auth = useAuth();
  const user = auth.user!;
  const [on, setOn] = useState(!!user.alerts5Star);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useDialog(ref, () => !busy && onClose());
  async function save() {
    if (on === !!user.alerts5Star) return onClose();
    setBusy(true);
    setErr("");
    try {
      const r = await memberApi.updateMe({ alerts5Star: on, alertsLang: i18n.language === "en" ? "en" : "zh-HK" });
      auth.setUser(r.user);
      auth.toast(on ? t("alerts.on") : t("alerts.off"));
      onClose();
    } catch (e) {
      if (auth.handleAuthError(e)) return onClose();
      setErr(t("alerts.error"));
      setBusy(false);
    }
  }
  return (
    <div className={modalBgTop} onClick={() => !busy && onClose()}>
      <div ref={ref} className={modalNarrow} role="dialog" aria-modal="true" aria-labelledby="alerts-title" onClick={(e) => e.stopPropagation()}>
        <h2 id="alerts-title" className="text-[17px] font-medium text-navy-900">
          {t("alerts.title")}
        </h2>
        <p className="mt-2 text-[15px] text-ink">{t("alerts.intro")}</p>
        <ul className="mt-1 list-disc pl-5 text-[15px] leading-normal text-ink">
          <li>{t("alerts.pre")}</li>
          <li>{t("alerts.post")}</li>
        </ul>
        <p className="mt-2 text-[13px] text-ink-muted tabular-nums">{t("alerts.to", { phone: maskedPhone(user.phone) })}</p>
        <label className="mt-3 flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-card border border-line px-[13px] text-[15px] font-medium text-ink">
          {t("alerts.toggle")}
          <input type="checkbox" role="switch" className="size-5 flex-none accent-navy-700" checked={on} disabled={busy} onChange={(e) => setOn(e.target.checked)} />
        </label>
        <p className="mt-2 text-[13px] leading-normal text-ink-muted">{t("alerts.note")}</p>
        {err && (
          <p className="mt-2 text-[13px] text-bad" role="alert">
            {err}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between gap-3">
          <button type="button" className={cx(btn, "h-11")} disabled={busy} onClick={onClose}>
            {t("alerts.close")}
          </button>
          <button type="button" className={cx(btnPrimary, "h-11")} disabled={busy} onClick={() => void save()}>
            {busy && <Spinner />}
            {t("alerts.save")}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Settings page panel: the same 5★ alert switch. Saves as soon as it's flipped; guests get a log-in button. */
export function AlertsSetting() {
  const { t, i18n } = useTranslation("home");
  const auth = useAuth();
  const user = auth.user;
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  async function set(on: boolean) {
    setBusy(true);
    setErr("");
    try {
      const r = await memberApi.updateMe({ alerts5Star: on, alertsLang: i18n.language === "en" ? "en" : "zh-HK" });
      auth.setUser(r.user);
      auth.toast(on ? t("alerts.on") : t("alerts.off"));
    } catch (e) {
      if (!auth.handleAuthError(e)) setErr(t("alerts.error"));
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <h3 className="mb-1 text-[17px] leading-tight font-medium text-navy-900">{t("alerts.title")}</h3>
        <p className="text-ink-2">
          {t("alerts.intro")} {t("alerts.pre")} {t("alerts.post")}
        </p>
        {user && <p className="mt-1 text-xs text-ink-3 tabular-nums">{t("alerts.to", { phone: maskedPhone(user.phone) })}</p>}
        <p className="mt-1 text-xs text-ink-3">{t("alerts.note")}</p>
        {err && (
          <p className="mt-1 text-[13px] text-bad" role="alert">
            {err}
          </p>
        )}
      </div>
      {user ? (
        <label className="flex min-h-11 flex-none cursor-pointer items-center gap-3 self-start text-[15px] font-medium text-ink sm:self-center">
          {busy && <Spinner />}
          {t("alerts.toggle")}
          <input type="checkbox" role="switch" className="size-5 flex-none accent-navy-700" checked={!!user.alerts5Star} disabled={busy} onChange={(e) => void set(e.target.checked)} />
        </label>
      ) : (
        <button type="button" className={cx(btn, "h-11 flex-none self-start sm:self-center")} onClick={() => auth.openLogin({ source: "alerts" })}>
          {t("alerts.loginCta")}
        </button>
      )}
    </div>
  );
}
