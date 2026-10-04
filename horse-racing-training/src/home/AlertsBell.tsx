// Bell on the "5 stars" card: 5★ pick SMS alerts (members only). Guests get the login sheet first, then
// the popup. Two SMS per racing day; the server sends them (server/alerts).
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "motion/react";
import { useTranslation } from "react-i18next";
import { btn, btnPrimary, cx, modalBgTop, modalNarrow } from "../kit";
import { useAuth } from "../members/auth";
import { memberApi } from "../members/api";
import { Spinner, useDialog } from "../members/ui";
import { Switch } from "../Switch";

/** +85291235678 → +852 •••• 5678 */
export const maskedPhone = (e164: string) => `+852 •••• ${e164.slice(-4)}`;

export function AlertsBell() {
  const { t } = useTranslation("home");
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const on = !!auth.user?.alerts5Star;
  // Attention loop while alerts are off: a short ring every few seconds + a soft gold pulse behind the bell.
  // Stops once alerts are on, while hovered / focused, and for reduced motion.
  const reduce = useReducedMotion();
  const [hold, setHold] = useState(false);
  const ring = !on && !reduce && !hold;
  const tap = () => (auth.user ? setOpen(true) : auth.openLogin({ source: "alerts", onLoggedIn: () => setOpen(true) }));
  return (
    <>
      <button
        type="button"
        className="relative inline-flex size-11 flex-none cursor-pointer items-center justify-center rounded-full text-navy-700 transition-colors hover:bg-sky-50"
        aria-label={t("alerts.bell")}
        aria-pressed={on}
        title={t("alerts.bell")}
        onClick={tap}
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
        onFocus={() => setHold(true)}
        onBlur={() => setHold(false)}
      >
        {ring && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-1 rounded-full bg-gold"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.45, 0], scale: [0.6, 1.25, 1.5] }}
            transition={{ duration: 1.2, ease: "easeOut", repeat: Infinity, repeatDelay: 1.0 }}
          />
        )}
        <motion.svg
          viewBox="0 0 24 24"
          className="relative size-6"
          aria-hidden="true"
          fill={on ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ originX: 0.5, originY: 0.1 }}
          animate={ring ? { rotate: [0, -16, 14, -10, 8, -4, 0] } : { rotate: 0 }}
          transition={ring ? { duration: 0.9, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.3 } : { duration: 0.2 }}
        >
          <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16Z" />
          <path d="M10 20.5a2 2 0 0 0 4 0" fill="none" />
        </motion.svg>
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
        <div className="mt-3 flex min-h-11 items-center justify-between gap-3 rounded-card border border-line px-[13px] py-2">
          <label htmlFor="alerts-switch-dialog" className="cursor-pointer text-[15px] font-medium text-ink">
            {t("alerts.toggle")}
          </label>
          <Switch id="alerts-switch-dialog" checked={on} disabled={busy} onChange={setOn} />
        </div>
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
        <div className="flex min-h-11 flex-none items-center gap-3 self-start sm:self-center">
          {busy && <Spinner />}
          <label htmlFor="alerts-switch-settings" className="cursor-pointer text-[15px] font-medium text-ink">
            {t("alerts.toggle")}
          </label>
          <Switch id="alerts-switch-settings" checked={!!user.alerts5Star} disabled={busy} onChange={(v) => void set(v)} />
        </div>
      ) : (
        <button type="button" className={cx(btn, "h-11 flex-none self-start sm:self-center")} onClick={() => auth.openLogin({ source: "alerts" })}>
          {t("alerts.loginCta")}
        </button>
      )}
    </div>
  );
}
