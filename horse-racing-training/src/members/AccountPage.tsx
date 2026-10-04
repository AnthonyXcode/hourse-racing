// Account page, ?tab=account (design spec §3): staged Profile + Contact edits behind one gold Save;
// Account actions (log out, delete) act immediately.
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { useTranslation } from "react-i18next";
import type { Member } from "../../shared/types";
import {
  DESCRIPTION_MAX,
  NAME_MAX,
  formatHkPhone,
  validateDescription,
  validateDisplayName,
  validateEmail,
  validateTelegram,
  validateWhatsapp,
  type ProfileField,
} from "../../shared/validation";
import { track } from "../analytics";
import { useFmt } from "../i18n/useLanguage";
import { Display, btn, btnDanger, btnPrimary, control, cx, errorBox, modalBg, modalNarrow, sectionBody, sectionHead } from "../kit";
import { ApiError, memberApi } from "./api";
import { useAuth } from "./auth";
import { useCredits } from "../credits/CreditsProvider";
import { AvatarField, type StagedAvatar } from "./AvatarField";
import { LoginEmptyState } from "./GuestPrompts";
import { Counter, Spinner, errorText, visibleLength, fieldErr, formLabel, prefixChip, prefixInput, prefixWrap, useDialog } from "./ui";
import { Switch } from "../Switch";

interface Form {
  displayName: string;
  description: string;
  telegram: string;
  whatsapp: string;
  sameAsLogin: boolean;
  email: string;
  /** Public leaderboard opt-in. */
  leaderboard: boolean;
  /** 5★ pick SMS alerts. */
  alerts: boolean;
}
const fromUser = (u: Member): Form => ({
  displayName: u.displayName,
  description: u.description ?? "",
  telegram: u.telegram ?? "",
  whatsapp: u.whatsapp && u.whatsapp !== u.phone ? u.whatsapp : "",
  sameAsLogin: u.whatsapp != null && u.whatsapp === u.phone,
  email: u.email ?? "",
  leaderboard: !!u.showOnLeaderboard,
  alerts: !!u.alerts5Star,
});
const sameForm = (a: Form, b: Form) => (Object.keys(a) as (keyof Form)[]).every((k) => a[k] === b[k]);

const ANALYTICS_FIELD: Record<ProfileField, string> = { displayName: "name", description: "description", telegram: "telegram", whatsapp: "whatsapp", email: "email" };

export function AccountPage({ onLogout, onDeleted }: { onLogout: () => void; onDeleted: () => void }) {
  const { t } = useTranslation("account");
  const { user, openLogin } = useAuth();
  if (user === undefined) return <Skeleton />;
  if (user === null)
    return (
      <div className="mt-2">
        <Display>{t("page.title")}</Display>
        <div className="mx-auto max-w-[720px]">
          <LoginEmptyState title={t("guest.accountTitle")} onLogin={() => openLogin({ source: "header" })} />
        </div>
      </div>
    );
  return <AccountForm key={user.id} user={user} onLogout={onLogout} onDeleted={onDeleted} />;
}

function AccountForm({ user, onLogout, onDeleted }: { user: Member; onLogout: () => void; onDeleted: () => void }) {
  const { t, i18n } = useTranslation(["account", "common"]);
  const fmt = useFmt();
  const { setUser, setDirty, toast, handleAuthError } = useAuth();
  const [saved, setSaved] = useState<Form>(() => fromUser(user));
  const [form, setForm] = useState<Form>(saved);
  const [avatar, setAvatar] = useState<StagedAvatar>(null);
  const [avatarErr, setAvatarErr] = useState("");
  const [errors, setErrors] = useState<Partial<Record<ProfileField, string>>>({});
  const [box, setBox] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const refs: Record<ProfileField, RefObject<HTMLInputElement & HTMLTextAreaElement>> = {
    displayName: useRef(null),
    description: useRef(null),
    telegram: useRef(null),
    whatsapp: useRef(null),
    email: useRef(null),
  };

  const dirty = !sameForm(form, saved) || avatar !== null;
  useEffect(() => {
    setDirty(dirty);
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty, setDirty]);
  useEffect(() => () => setDirty(false), [setDirty]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (k in errors) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const message = (field: ProfileField, value: string) =>
    field === "displayName"
      ? value.trim()
        ? t("err.nameTooLong")
        : t("err.nameRequired")
      : field === "description"
        ? t("err.bio")
        : t(`err.${field}`);

  async function save() {
    // Client validation first; nothing is sent if any field fails.
    const checks: [ProfileField, ReturnType<typeof validateEmail>][] = [
      ["displayName", validateDisplayName(form.displayName)],
      ["description", validateDescription(form.description)],
      ["telegram", validateTelegram(form.telegram)],
      ["whatsapp", form.sameAsLogin ? { ok: true, value: user.phone } : validateWhatsapp(form.whatsapp)],
      ["email", validateEmail(form.email)],
    ];
    const errs: Partial<Record<ProfileField, string>> = {};
    for (const [f, r] of checks) if (!r.ok) errs[f] = message(f, f === "displayName" ? form.displayName : "");
    setErrors(errs);
    const firstBad = checks.find(([f]) => errs[f])?.[0];
    if (firstBad) {
      refs[firstBad].current?.focus();
      refs[firstBad].current?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    const current: Record<ProfileField, string | null> = {
      displayName: user.displayName,
      description: user.description,
      telegram: user.telegram,
      whatsapp: user.whatsapp,
      email: user.email,
    };
    const patch: Record<string, string | null | boolean> = {};
    const changed: ProfileField[] = [];
    for (const [f, r] of checks) {
      const v = (r as { value: string | null }).value;
      if (v === current[f]) continue;
      changed.push(f);
      if (f === "whatsapp" && form.sameAsLogin) patch.whatsappSameAsLogin = true;
      else patch[f] = v;
    }
    const leaderboardChanged = form.leaderboard !== !!user.showOnLeaderboard;
    if (leaderboardChanged) patch.showOnLeaderboard = form.leaderboard;
    const alertsChanged = form.alerts !== !!user.alerts5Star;
    if (alertsChanged) {
      patch.alerts5Star = form.alerts;
      patch.alertsLang = i18n.language === "en" ? "en" : "zh-HK"; // the SMS language = the site language now
    }

    setSaving(true);
    setBox("");
    let u = user;
    try {
      if (changed.length || leaderboardChanged || alertsChanged) {
        u = (await memberApi.updateMe(patch)).user;
        if (leaderboardChanged) track("profile_updated", { field: "leaderboard", action: form.leaderboard ? "set" : "clear" });
        for (const f of changed) track("profile_updated", { field: ANALYTICS_FIELD[f], action: u[f] == null ? "clear" : "set" });
      }
      if (avatar) {
        try {
          u = (avatar === "remove" ? await memberApi.removeAvatar() : await memberApi.uploadAvatar(avatar.file)).user;
          track("profile_updated", { field: "avatar", action: avatar === "remove" ? "clear" : "set" });
          setAvatar(null);
        } catch (e) {
          if (handleAuthError(e)) return;
          setAvatarErr(e instanceof ApiError && (e.code === "unsupported_type" || e.code === "file_too_large") ? errorText(t, e) : t("err.avatarUpload"));
          setUser(u);
          setSaved(fromUser(u));
          setForm(fromUser(u));
          return;
        }
      }
      setUser(u);
      setSaved(fromUser(u));
      setForm(fromUser(u));
      toast(t("toast.saved"));
    } catch (e) {
      if (handleAuthError(e)) return;
      if (e instanceof ApiError && e.code === "validation_error" && e.extra.field && e.extra.field in refs) {
        const f = e.extra.field as ProfileField;
        setErrors({ [f]: message(f, form[f as keyof Form] as string) });
        refs[f].current?.focus();
      } else setBox(e instanceof ApiError && e.code === "network" ? t("err.network") : t("err.saveFailed"));
    } finally {
      setSaving(false);
    }
  }

  const nameLen = visibleLength(form.displayName);
  const bioLen = visibleLength(form.description);

  const saveButton = (
    <button type="submit" form="account-form" className={btnPrimary} disabled={!dirty || saving}>
      {saving && <Spinner />}
      {saving ? t("saving") : t("save")}
    </button>
  );

  return (
    <div className="mt-2 pb-24 lg:pb-0">
      <Display>{t("page.title")}</Display>
      <form
        id="account-form"
        noValidate
        aria-busy={saving}
        className="mx-auto flex max-w-[720px] flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          void save();
        }}
      >
        {box && (
          <div className={cx(errorBox, "my-0")} role="alert">
            {box}
          </div>
        )}

        <Card title={t("section.profile")}>
          <AvatarField
            name={form.displayName || user.displayName}
            currentUrl={user.avatarUrl}
            staged={avatar}
            onStage={(s) => {
              setAvatar(s);
              setAvatarErr("");
            }}
            error={avatarErr}
            onError={setAvatarErr}
            disabled={saving}
            showRemove
          />
          <Field id="acc-name" label={<>{t("name.label")} <span aria-hidden="true">*</span></>} counter={[nameLen, NAME_MAX]} error={errors.displayName}>
            <input
              ref={refs.displayName}
              id="acc-name"
              autoComplete="nickname"
              maxLength={NAME_MAX * 2}
              required
              readOnly={saving}
              className={cx(control, "w-full scroll-mt-[var(--header-h)]", errors.displayName && "border-bad")}
              value={form.displayName}
              aria-invalid={errors.displayName ? true : undefined}
              aria-describedby={errors.displayName ? "acc-name-error" : undefined}
              onChange={(e) => set("displayName", e.target.value)}
            />
          </Field>
          <Field id="acc-bio" label={t("bio.label")} counter={[bioLen, DESCRIPTION_MAX]} error={errors.description}>
            <textarea
              ref={refs.description}
              id="acc-bio"
              rows={3}
              maxLength={DESCRIPTION_MAX * 2}
              readOnly={saving}
              placeholder={t("bio.placeholder")}
              className={cx(control, "h-auto min-h-[88px] w-full resize-y scroll-mt-[var(--header-h)] py-2 leading-normal", errors.description && "border-bad")}
              value={form.description}
              aria-invalid={errors.description ? true : undefined}
              aria-describedby={errors.description ? "acc-bio-error" : undefined}
              onChange={(e) => set("description", e.target.value)}
            />
          </Field>
        </Card>

        <Card title={t("section.contact")}>
          <Field id="acc-tg" label={t("telegram.label")} error={errors.telegram}>
            <div className={cx(prefixWrap, "scroll-mt-[var(--header-h)]", errors.telegram && "border-bad")}>
              <span aria-hidden="true" className={prefixChip}>
                @
              </span>
              <input
                ref={refs.telegram}
                id="acc-tg"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                maxLength={33}
                readOnly={saving}
                className={prefixInput}
                value={form.telegram.replace(/^@/, "")}
                aria-invalid={errors.telegram ? true : undefined}
                aria-describedby={errors.telegram ? "acc-tg-error" : undefined}
                onChange={(e) => set("telegram", e.target.value.replace(/^@/, ""))}
              />
            </div>
          </Field>

          <div>
            <span className={cx(formLabel, "mb-1 block")} id="acc-wa-label">
              {t("whatsapp.label")}
            </span>
            <label className="flex min-h-11 cursor-pointer items-center gap-2 text-[15px] text-ink">
              <input
                type="checkbox"
                className="size-4 rounded-xs border-line-strong accent-navy-700"
                checked={form.sameAsLogin}
                disabled={saving}
                onChange={(e) => set("sameAsLogin", e.target.checked)}
              />
              {t("whatsapp.same")}
            </label>
            <input
              ref={refs.whatsapp}
              id="acc-wa"
              type="tel"
              autoComplete="tel"
              aria-labelledby="acc-wa-label"
              placeholder="+852 9123 4567"
              disabled={form.sameAsLogin}
              readOnly={saving}
              className={cx(control, "w-full scroll-mt-[var(--header-h)] tabular-nums disabled:bg-surface-2 disabled:text-ink-muted", errors.whatsapp && "border-bad")}
              value={form.sameAsLogin ? formatHkPhone(user.phone) : form.whatsapp}
              aria-invalid={errors.whatsapp ? true : undefined}
              aria-describedby={errors.whatsapp ? "acc-wa-error" : "acc-wa-hint"}
              onChange={(e) => set("whatsapp", e.target.value)}
            />
            {errors.whatsapp ? (
              <p id="acc-wa-error" className={fieldErr}>
                {errors.whatsapp}
              </p>
            ) : (
              !form.sameAsLogin && (
                <p id="acc-wa-hint" className="mt-1 text-[13px] text-ink-muted">
                  {t("whatsapp.hint")}
                </p>
              )
            )}
          </div>

          <Field id="acc-email" label={t("email.label")} error={errors.email}>
            <input
              ref={refs.email}
              id="acc-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={254}
              readOnly={saving}
              className={cx(control, "w-full scroll-mt-[var(--header-h)]", errors.email && "border-bad")}
              value={form.email}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "acc-email-error" : undefined}
              onChange={(e) => set("email", e.target.value)}
            />
          </Field>
          <p className="text-[13px] text-ink-muted">{t("contact.helper")}</p>
        </Card>

        <Card title={t("section.leaderboard")}>
          <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[15px] font-medium text-ink">
            <input
              type="checkbox"
              role="switch"
              className="size-5 flex-none rounded-xs border-line-strong accent-navy-700"
              checked={form.leaderboard}
              disabled={saving}
              aria-describedby="acc-lb-help"
              onChange={(e) => set("leaderboard", e.target.checked)}
            />
            {t("leaderboard.toggle")}
          </label>
          <div id="acc-lb-help" className="flex flex-col gap-1.5 text-[13px] leading-normal text-ink-muted">
            <p>{t("leaderboard.shown")}</p>
            <p>{t("leaderboard.hidden")}</p>
            <p>{t("leaderboard.off")}</p>
          </div>
        </Card>

        <Card title={t("section.notifications")}>
          <div className="flex min-h-11 items-center justify-between gap-3">
            <label htmlFor="acc-alerts-switch" className="cursor-pointer text-[15px] font-medium text-ink">
              {t("alerts.toggle")}
            </label>
            <Switch id="acc-alerts-switch" checked={form.alerts} disabled={saving} describedBy="acc-alerts-help" onChange={(v) => set("alerts", v)} />
          </div>
          <p id="acc-alerts-help" className="text-[13px] leading-normal text-ink-muted">
            {t("alerts.help", { phone: `+852 •••• ${user.phone.slice(-4)}` })}
          </p>
        </Card>

        <Card title={t("section.account")}>
          <div className="-my-4">
            <Row label={t("acct.phone")} value={formatHkPhone(user.phone)} />
            <Row label={t("acct.since")} value={fmt.date(user.createdAt, { dateStyle: "long" })} />
            <div className="flex min-h-14 items-center justify-between gap-3 py-2">
              <button type="button" className={btn} onClick={onLogout}>
                {t("acct.logout")}
              </button>
              <button type="button" className="h-11 cursor-pointer text-[15px] font-medium text-bad hover:underline" onClick={() => setDeleting(true)}>
                {t("acct.delete")}
              </button>
            </div>
          </div>
        </Card>

        {/* ≥ lg: static save row under the last card. */}
        <div className="hidden items-center justify-end gap-3 lg:flex">
          {dirty && <span className="text-[13px] text-ink-muted">{t("unsaved")}</span>}
          {saveButton}
        </div>
      </form>

      {/* Phones / tablets: sticky save bar. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] shadow-pop lg:hidden">
        <div className="flex h-14 items-center justify-between gap-3 px-4">
          <span className="text-[13px] text-ink-muted">{dirty ? t("unsaved") : ""}</span>
          {saveButton}
        </div>
      </div>

      {deleting && (
        <DeleteDialog
          phone={user.phone}
          onCancel={() => setDeleting(false)}
          onDeleted={() => {
            setDirty(false);
            onDeleted();
          }}
        />
      )}
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className={sectionHead}>{title}</h2>
      <div className={cx(sectionBody, "flex flex-col gap-4 px-[13px] py-4")}>{children}</div>
    </section>
  );
}

function Field({ id, label, counter, error, children }: { id: string; label: ReactNode; counter?: [number, number]; error?: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className={formLabel}>
          {label}
        </label>
        {counter && <Counter n={counter[0]} max={counter[1]} />}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className={fieldErr}>
          {error}
        </p>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-h-11 items-center justify-between gap-3 border-b border-line">
      <span className="text-[15px] text-ink">{label}</span>
      <span className="text-[15px] text-ink-strong tabular-nums">{value}</span>
    </div>
  );
}

function DeleteDialog({ phone, onCancel, onDeleted }: { phone: string; onCancel: () => void; onDeleted: () => void }) {
  const { t } = useTranslation(["account", "common", "credits"]);
  const { toast, setUser } = useAuth();
  const { summary } = useCredits();
  const fmtN = useFmt();
  const [digits, setDigits] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const cancel = useRef<HTMLButtonElement>(null);
  useDialog(ref, () => !busy && onCancel(), cancel);
  const match = digits === phone.slice(-4);

  async function run() {
    setBusy(true);
    setErr("");
    try {
      await memberApi.deleteAccount();
      setUser(null);
      onDeleted();
      toast(t("toast.deleted"));
    } catch (e) {
      setErr(errorText(t, e));
      setBusy(false);
    }
  }

  return (
    <div className={modalBg} onClick={() => !busy && onCancel()}>
      <div ref={ref} className={modalNarrow} role="alertdialog" aria-modal="true" aria-labelledby="del-title" aria-describedby="del-body" onClick={(e) => e.stopPropagation()}>
        <h2 id="del-title" className="text-[15px] font-medium text-navy-900 sm:text-[17px]">
          {t("delete.title")}
        </h2>
        {err && (
          <div className={errorBox} role="alert">
            {err}
          </div>
        )}
        <p id="del-body" className="mt-2 text-[15px] leading-normal text-ink">
          {t("delete.body")}
        </p>
        {summary && (summary.balance > 0 || summary.pending.count > 0) && (
          <p className="mt-2 text-[15px] leading-normal font-medium text-bad">
            {t("credits:deleteWarning", { n: fmtN.num(summary.balance), count: summary.pending.count })}
          </p>
        )}
        <label htmlFor="del-digits" className="mt-3 block text-[13px] text-ink">
          {t("delete.prompt")}
        </label>
        <input
          id="del-digits"
          inputMode="numeric"
          autoComplete="off"
          maxLength={4}
          className={cx(control, "mt-1.5 w-28 tabular-nums")}
          value={digits}
          readOnly={busy}
          onChange={(e) => setDigits(e.target.value.replace(/\D/g, "").slice(0, 4))}
        />
        <div className="mt-5 flex items-center justify-between gap-3">
          <button ref={cancel} type="button" className={btn} disabled={busy} onClick={onCancel}>
            {t("delete.cancel")}
          </button>
          <button type="button" className={btnDanger} disabled={!match || busy} onClick={() => void run()}>
            {busy && <Spinner />}
            {busy ? t("delete.deleting") : t("delete.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="mt-2" aria-hidden="true">
      <div className="pt-4 pb-2 sm:pt-8">
        <div className="h-7 w-40 rounded-xs bg-surface-2" />
      </div>
      <div className="mx-auto flex max-w-[720px] flex-col gap-4">
        {[0, 1, 2].map((i) => (
          <section key={i} className="motion-safe:animate-pulse">
            <div className={sectionHead}>
              <div className="h-4 w-24 rounded-xs bg-white/25" />
            </div>
            <div className={cx(sectionBody, "flex flex-col gap-4 px-[13px] py-4")}>
              {i === 0 && <div className="size-18 rounded-full bg-surface-2" />}
              <div className="h-10 rounded-control bg-surface-2" />
              <div className="h-10 rounded-control bg-surface-2" />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
