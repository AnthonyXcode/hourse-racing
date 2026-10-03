// Login / sign-up sheet (design spec §2): 1 phone + Turnstile → 2 SMS code → 3 welcome (new members only).
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Trans, useTranslation } from "react-i18next";
import type { Member, PublicConfig } from "../../shared/types";
import { NAME_MAX, OTP_LENGTH, RESEND_SECONDS, maskPhoneUi, normalizeHkMobile, validateDisplayName } from "../../shared/validation";
import { track } from "../analytics";
import { useLanguage } from "../i18n/useLanguage";
import { btnPrimary, control, cx, errorBox, modalBgTop, modalNarrow } from "../kit";
import { ApiError, memberApi } from "./api";
import { AvatarField, type StagedAvatar } from "./AvatarField";
import { Turnstile, type TurnstileHandle } from "./Turnstile";
import { Counter, Spinner, errorText, visibleLength, fieldErr, formLabel, prefixChip, prefixInput, prefixWrap, textBtn, useDialog } from "./ui";

type Step = "phone" | "code" | "welcome";

/** "+852 9123-4567" / "85291234567" / "91234567" → up to 8 national digits. */
function nationalDigits(raw: string): string {
  const d = raw.replace(/\D/g, "");
  for (const p of ["00852", "852"]) if (d.length > 8 && d.startsWith(p)) return d.slice(p.length, p.length + 8);
  return d.slice(0, 8);
}
const groupPhone = (d: string) => (d.length > 4 ? `${d.slice(0, 4)} ${d.slice(4)}` : d);

export function LoginModal({
  config,
  onClose,
  onVerified,
  onDone,
}: {
  config: PublicConfig | null;
  onClose: () => void;
  /** Code accepted: returns an optional toast that replaces "Logged in as …". */
  onVerified: (user: Member, isNew: boolean) => Promise<string | undefined>;
  onDone: (user: Member, message: string | undefined) => void;
}) {
  const { t } = useTranslation(["account", "common"]);
  const { lang } = useLanguage();
  const [step, setStep] = useState<Step>("phone");
  const [digits, setDigits] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [box, setBox] = useState(""); // one non-field error at a time
  const [token, setToken] = useState<string | null>(null);
  const [waiting, setWaiting] = useState<"send" | "resend" | null>(null); // tapped before the Turnstile token arrived
  const [sending, setSending] = useState(false);
  const [sentTo, setSentTo] = useState(""); // E.164
  const [resendAt, setResendAt] = useState(0); // epoch ms
  const [blockedUntil, setBlockedUntil] = useState(0); // rate-limited: no sends until then
  const [now, setNow] = useState(Date.now());
  const [code, setCode] = useState("");
  const [codeErr, setCodeErr] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [locked, setLocked] = useState(false);
  const [live, setLive] = useState("");
  // welcome step
  const [member, setMember] = useState<Member | null>(null);
  const [toastOverride, setToastOverride] = useState<string | undefined>();
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [avatar, setAvatar] = useState<StagedAvatar>(null);
  const [avatarErr, setAvatarErr] = useState("");
  const [saving, setSaving] = useState(false);

  const dialog = useRef<HTMLDivElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const codeInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const turnstile = useRef<TurnstileHandle>(null);
  const titleId = "login-title";

  const close = () => {
    if (step === "welcome" && member) onDone(member, toastOverride); // closing step 3 = Skip
    else onClose();
  };
  useDialog(dialog, close, phoneInput);

  // Countdown clock (resend + rate-limit wait), only while something is counting.
  const counting = now < Math.max(resendAt, blockedUntil);
  useEffect(() => {
    if (!counting) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [counting]);
  const resendLeft = Math.max(0, Math.ceil((Math.max(resendAt, blockedUntil) - now) / 1000));
  const blocked = now < blockedUntil;
  // Announce "you can resend" once, not every second.
  const wasCounting = useRef(false);
  useEffect(() => {
    if (step === "code" && wasCounting.current && !counting) setLive(t("loginFlow.resendReady"));
    wasCounting.current = counting;
  }, [counting, step, t]);

  // On every step change: focus the step's field and replace the live region's text, so nothing from the
  // previous step (e.g. "Incorrect code") is left behind.
  useEffect(() => {
    if (step === "code") codeInput.current?.focus();
    if (step === "phone") phoneInput.current?.focus();
    if (step === "welcome") nameInput.current?.focus();
    setLive(step === "code" && sentTo ? t("loginFlow.codeSent", { phone: maskPhoneUi(sentTo) }) : step === "welcome" ? t("welcome.title") : "");
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  async function send(resend: boolean) {
    const phone = normalizeHkMobile(digits);
    if (!phone) {
      setPhoneErr(t("err.phoneInvalid"));
      setStep("phone");
      return;
    }
    // Same number as the code we just sent, still inside the resend cooldown: that code is still valid,
    // so go back to entering it (keeping the countdown) instead of asking for another SMS.
    if (!resend && phone === sentTo && Date.now() < resendAt) {
      setWaiting(null);
      setBox("");
      setStep("code");
      return;
    }
    if (!config) {
      setBox(t("err.network")); // /api/config unreachable: no Turnstile site key
      return;
    }
    if (!token) {
      setWaiting(resend ? "resend" : "send"); // fires when the token arrives
      return;
    }
    setWaiting(null);
    setSending(true);
    setBox("");
    try {
      const r = await memberApi.startOtp(phone, token, lang);
      track("otp_requested", { resend, lang });
      setSentTo(r.phone);
      const n = Date.now();
      setNow(n);
      setResendAt(n + (r.resendIn || RESEND_SECONDS) * 1000);
      setCode("");
      setCodeErr("");
      setLocked(false);
      setStep("code");
      if (step === "code") setLive(t("loginFlow.codeSent", { phone: maskPhoneUi(r.phone) })); // a resend: no step change to announce it
    } catch (e) {
      if (e instanceof ApiError && e.code === "invalid_phone") {
        setPhoneErr(t("err.phoneInvalid"));
        setStep("phone");
      } else {
        if (e instanceof ApiError && e.code === "rate_limited") {
          const n = Date.now();
          setNow(n);
          setBlockedUntil(n + (e.extra.retryAfter ?? 60) * 1000);
        }
        setBox(errorText(t, e));
      }
    } finally {
      setSending(false);
      turnstile.current?.reset(); // tokens are single-use: get a fresh one for a resend
    }
  }

  // Tapped Send before Turnstile was ready: go as soon as it is.
  useEffect(() => {
    if (token && waiting) void send(waiting === "resend");
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  async function verify(value = code) {
    if (value.length !== OTP_LENGTH || verifying || locked) return;
    setVerifying(true);
    setBox("");
    setCodeErr("");
    try {
      const r = await memberApi.checkOtp(sentTo, value);
      const override = await onVerified(r.user, r.isNew);
      if (r.isNew) {
        setMember(r.user);
        setToastOverride(override);
        setName(r.user.displayName);
        setStep("welcome");
      } else onDone(r.user, override);
    } catch (e) {
      const c = e instanceof ApiError ? e.code : "";
      if (c === "invalid_code" || c === "code_expired") {
        setCodeErr(errorText(t, e));
        setLive(errorText(t, e));
        setCode("");
        if (c === "code_expired") setResendAt(0); // resend straight away
        codeInput.current?.focus();
      } else {
        if (c === "too_many_attempts") setLocked(true);
        setBox(errorText(t, e));
      }
    } finally {
      setVerifying(false);
    }
  }

  async function finishWelcome(skip: boolean) {
    if (!member) return;
    if (skip) return onDone(member, toastOverride);
    const v = validateDisplayName(name);
    if (!v.ok) {
      setNameErr(name.trim() ? t("err.nameTooLong") : t("err.nameRequired"));
      nameInput.current?.focus();
      return;
    }
    setSaving(true);
    setBox("");
    let u = member;
    try {
      if (v.value !== member.displayName) {
        u = (await memberApi.updateMe({ displayName: v.value })).user;
        track("profile_updated", { field: "name", action: "set" });
      }
      if (avatar && avatar !== "remove") {
        try {
          u = (await memberApi.uploadAvatar(avatar.file)).user;
          track("profile_updated", { field: "avatar", action: "set" });
        } catch (e) {
          setAvatarErr(e instanceof ApiError && (e.code === "unsupported_type" || e.code === "file_too_large") ? errorText(t, e) : t("err.avatarUpload"));
          setMember(u);
          return;
        }
      }
      onDone(u, toastOverride);
    } catch (e) {
      setBox(e instanceof ApiError && e.code === "network" ? t("err.network") : t("err.saveFailed"));
    } finally {
      setSaving(false);
    }
  }

  const title = step === "phone" ? t("loginFlow.title") : step === "code" ? t("loginFlow.codeTitle") : t("welcome.title");
  const sendBusy = sending || waiting !== null;

  return (
    <div className={modalBgTop} onClick={() => step === "phone" && close()}>
      <div
        ref={dialog}
        className={modalNarrow}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <div aria-hidden="true" className="mx-auto mb-3 h-1 w-10 rounded-full bg-line sm:hidden" />
        <div className="flex items-start justify-between gap-3">
          <h2 id={titleId} className="pt-2.5 text-[15px] font-medium text-navy-900 sm:text-[17px]">
            {title}
          </h2>
          <button
            type="button"
            className="-mt-1 -mr-3 inline-flex size-11 flex-none cursor-pointer items-center justify-center rounded-full text-ink-muted hover:bg-sky-50"
            aria-label={t("common:action.close")}
            onClick={close}
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 stroke-current" strokeWidth="1.8" fill="none">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {live}
        </p>

        {box && (
          <div className={errorBox} role="alert">
            {box}
          </div>
        )}

        {step === "phone" && (
          <form
            noValidate
            aria-busy={sendBusy}
            onSubmit={(e) => {
              e.preventDefault();
              void send(false);
            }}
          >
            <p className="mt-1 text-[13px] leading-normal text-ink-muted">{t("loginFlow.intro")}</p>
            <label htmlFor="login-phone" className={cx(formLabel, "mt-4 mb-1.5 block")}>
              {t("loginFlow.phoneLabel")}
            </label>
            <div className={cx(prefixWrap, phoneErr && "border-bad")}>
              <span aria-hidden="true" className={prefixChip}>
                +852
              </span>
              <input
                ref={phoneInput}
                id="login-phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={9}
                placeholder={t("loginFlow.phonePlaceholder")}
                className={prefixInput}
                value={groupPhone(digits)}
                aria-invalid={phoneErr ? true : undefined}
                aria-describedby={phoneErr ? "login-phone-error" : undefined}
                onChange={(e) => {
                  const d = nationalDigits(e.target.value);
                  setDigits(d);
                  if (phoneErr && normalizeHkMobile(d)) setPhoneErr("");
                }}
                onPaste={(e) => {
                  e.preventDefault(); // pasted "+852 9123 4567" is longer than maxLength
                  setDigits(nationalDigits(e.clipboardData.getData("text")));
                  setPhoneErr("");
                }}
                onBlur={() => digits && !normalizeHkMobile(digits) && setPhoneErr(t("err.phoneInvalid"))}
              />
            </div>
            {phoneErr && (
              <p id="login-phone-error" className={fieldErr}>
                {phoneErr}
              </p>
            )}
          </form>
        )}

        {step === "code" && (
          <form
            noValidate
            aria-busy={verifying}
            onSubmit={(e) => {
              e.preventDefault();
              void verify();
            }}
          >
            <p className="mt-1 text-[13px] leading-normal text-ink-muted">
              {t("loginFlow.codeSent", { phone: "" })}
              <span className="font-medium text-ink-strong tabular-nums">{maskPhoneUi(sentTo)}</span>{" "}
              <button
                type="button"
                className={cx(textBtn, "h-auto py-2 text-[13px]")}
                onClick={() => {
                  setBox("");
                  setStep("phone");
                }}
              >
                {t("loginFlow.change")}
              </button>
            </p>
            <label htmlFor="login-otp" className={cx(formLabel, "mt-3 mb-1.5 block")}>
              {t("loginFlow.codeLabel")}
            </label>
            <input
              ref={codeInput}
              id="login-otp"
              name="otp"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="\d{6}"
              maxLength={OTP_LENGTH}
              placeholder="••••••"
              readOnly={verifying}
              disabled={locked}
              className={cx(control, "h-12 w-full text-center text-2xl font-medium tabular-nums disabled:bg-surface-2 disabled:text-ink-muted", codeErr && "border-bad")}
              style={{ letterSpacing: "0.5em", paddingLeft: "0.5em" }}
              value={code}
              aria-invalid={codeErr ? true : undefined}
              aria-describedby={codeErr ? "login-otp-error" : undefined}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH);
                setCode(v);
                if (v) setCodeErr("");
                if (v.length === OTP_LENGTH) void verify(v); // autofill / paste / 6th digit
              }}
            />
            {codeErr && (
              <p id="login-otp-error" className={fieldErr}>
                {codeErr}
              </p>
            )}
          </form>
        )}

        {/* One Turnstile widget for sends and resends; it must stay mounted across steps 1–2. */}
        {step !== "welcome" && config && (
          <Turnstile
            ref={turnstile}
            siteKey={config.turnstileSiteKey}
            lang={lang}
            onToken={setToken}
            onError={() => {
              setWaiting(null);
              setBox(t("err.turnstile"));
            }}
          />
        )}

        {step === "phone" && (
          <>
            <button
              type="button"
              className={cx(btnPrimary, "mt-4 w-full")}
              disabled={digits.length !== 8 || sendBusy || blocked}
              onClick={() => void send(false)}
            >
              {sendBusy && <Spinner />}
              {sending ? t("loginFlow.sending") : waiting ? t("loginFlow.checking") : t("loginFlow.send")}
            </button>
            <p className="mt-3 text-[13px] leading-normal text-ink-muted">
              <Trans
                t={t}
                i18nKey="loginFlow.consent"
                components={{
                  terms: <ConsentLink view="terms" />,
                  privacy: <ConsentLink view="privacy" />,
                }}
              />
            </p>
          </>
        )}

        {step === "code" && (
          <>
            <button type="button" className={cx(btnPrimary, "mt-4 w-full")} disabled={code.length !== OTP_LENGTH || verifying || locked} onClick={() => void verify()}>
              {verifying && <Spinner />}
              {verifying ? t("loginFlow.verifying") : t("loginFlow.verify")}
            </button>
            <div className="mt-2 flex min-h-11 items-center justify-center">
              {resendLeft > 0 ? (
                <span className="text-[13px] text-ink-muted tabular-nums">{t("loginFlow.resendIn", { s: resendLeft })}</span>
              ) : (
                <button type="button" className={textBtn} disabled={sendBusy} onClick={() => void send(true)}>
                  {sendBusy && <Spinner />}
                  {t("loginFlow.resend")}
                </button>
              )}
            </div>
          </>
        )}

        {step === "welcome" && member && (
          <form
            noValidate
            aria-busy={saving}
            onSubmit={(e) => {
              e.preventDefault();
              void finishWelcome(false);
            }}
          >
            <p className="mt-1 text-[13px] leading-normal text-ink-muted">{t("welcome.intro")}</p>
            <div className="mt-4">
              <AvatarField name={name || member.displayName} currentUrl={null} staged={avatar} onStage={setAvatar} error={avatarErr} onError={setAvatarErr} disabled={saving} />
            </div>
            <div className="mt-4 mb-1.5 flex items-baseline justify-between">
              <label htmlFor="welcome-name" className={formLabel}>
                {t("name.label")}
              </label>
              <Counter n={visibleLength(name)} max={NAME_MAX} />
            </div>
            <input
              ref={nameInput}
              id="welcome-name"
              autoComplete="nickname"
              maxLength={NAME_MAX * 2 /* code points vs UTF-16 units; the counter and validation enforce NAME_MAX */}
              className={cx(control, "w-full", nameErr && "border-bad")}
              value={name}
              readOnly={saving}
              aria-invalid={nameErr ? true : undefined}
              aria-describedby={nameErr ? "welcome-name-error" : undefined}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                setName(e.target.value);
                if (validateDisplayName(e.target.value).ok) setNameErr("");
              }}
            />
            {nameErr && (
              <p id="welcome-name-error" className={fieldErr}>
                {nameErr}
              </p>
            )}
            <button type="submit" className={cx(btnPrimary, "mt-4 w-full")} disabled={saving}>
              {saving && <Spinner />}
              {saving ? t("saving") : t("welcome.done")}
            </button>
            <div className="flex justify-center">
              <button type="button" className={textBtn} disabled={saving} onClick={() => void finishWelcome(true)}>
                {t("welcome.skip")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/** Terms / Privacy open in a new tab so the login sheet isn't lost. */
function ConsentLink({ view, children }: { view: "terms" | "privacy"; children?: ReactNode }) {
  const url = new URL(window.location.href);
  url.search = "";
  url.searchParams.set("tab", view);
  const lang = new URLSearchParams(window.location.search).get("language");
  if (lang) url.searchParams.set("language", lang);
  return (
    <a href={url.pathname + url.search} target="_blank" rel="noopener" className="text-link hover:underline">
      {children}
    </a>
  );
}
