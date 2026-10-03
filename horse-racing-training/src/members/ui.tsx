// Small shared pieces for the membership UI: avatar, spinner, toast, dialog focus handling, error text.
import { useEffect, useRef, type RefObject } from "react";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { charLength, stripFormat } from "../../shared/validation";
import { cx } from "../kit";
import { ApiError } from "./api";

/** "陳大文" → "陳"; "Tony Chan" → "TC"; "" → "". */
export function initials(name: string): string {
  const s = name.trim();
  if (!s) return "";
  const first = [...s][0]!;
  if (!/[A-Za-z]/.test(first)) return first; // CJK (or any non-Latin script): first character
  const words = s.split(/\s+/);
  const last = words.length > 1 ? [...words[words.length - 1]!][0] : "";
  return (first + (last ?? "")).toUpperCase();
}

/**
 * Circle avatar: the photo, else initials on sky-100 / navy-900 (design spec D3), else a person glyph.
 * `size` is a literal class (size-7, size-18) so Tailwind can see it.
 */
export function Avatar({
  name,
  src,
  size,
  text = "text-[13px]",
  ring,
  alt,
}: {
  name: string;
  src: string | null | undefined;
  size: string;
  text?: string;
  ring?: boolean;
  alt?: string;
}) {
  const ini = initials(name);
  return (
    <span className={cx("relative inline-flex flex-none items-center justify-center overflow-hidden rounded-full bg-sky-100 font-medium text-navy-900", size, text, ring && "ring-1 ring-line")}>
      {src ? (
        <img src={src} alt={alt ?? ""} className="size-full object-cover" />
      ) : ini ? (
        <span aria-hidden="true">{ini}</span>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 fill-current">
          <circle cx="8" cy="5" r="3" />
          <path d="M2 14c0-3.3 2.7-5 6-5s6 1.7 6 5z" />
        </svg>
      )}
    </span>
  );
}

/** 16px inline spinner for busy buttons. */
export const Spinner = () => <span aria-hidden="true" className="size-4 flex-none rounded-full border-2 border-current border-r-transparent motion-safe:animate-spin" />;

/** Bottom toast: role=status, 3 s, no close button (design spec §2 Success). */
export function Toast({ message, raised }: { message: string; raised: boolean }) {
  return (
    <div
      role="status"
      className={cx(
        "fixed left-1/2 z-[70] max-w-[calc(100vw-32px)] -translate-x-1/2 rounded-control bg-navy-900 px-4 py-2.5 text-[13px] text-white shadow-pop",
        raised ? "bottom-[calc(72px+env(safe-area-inset-bottom))] lg:bottom-[calc(16px+env(safe-area-inset-bottom))]" : "bottom-[calc(16px+env(safe-area-inset-bottom))]"
      )}
    >
      {message}
    </div>
  );
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

/**
 * Modal focus handling: focus `initial` (or the first focusable) on open, trap Tab inside `ref`,
 * Esc → onEscape, and give focus back to whatever had it before on close.
 */
export function useDialog(ref: RefObject<HTMLElement>, onEscape: () => void, initial?: RefObject<HTMLElement>) {
  const esc = useRef(onEscape);
  esc.current = onEscape;
  useEffect(() => {
    const before = document.activeElement as HTMLElement | null;
    const el = ref.current;
    (initial?.current ?? el?.querySelector<HTMLElement>(FOCUSABLE))?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (!el) return;
      if (e.key === "Escape") {
        e.stopPropagation();
        esc.current();
        return;
      }
      if (e.key !== "Tab") return;
      const items = [...el.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((n) => n.offsetParent !== null || n === document.activeElement);
      if (!items.length) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    el?.addEventListener("keydown", onKey);
    return () => {
      el?.removeEventListener("keydown", onKey);
      if (before && document.contains(before)) before.focus();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

/** Localised text for an API / network error. */
export function errorText(t: TFunction<"account">, e: unknown): string {
  if (!(e instanceof ApiError)) return t("err.generic");
  switch (e.code) {
    case "invalid_phone":
      return t("err.phoneInvalid");
    case "turnstile_failed":
      return t("err.turnstile");
    case "rate_limited":
      return t("err.rateLimited", { min: Math.max(1, Math.ceil((e.extra.retryAfter ?? 60) / 60)) });
    case "otp_send_failed":
      return t("err.smsFailed");
    case "invalid_code":
      return t("err.otpWrong", { n: e.extra.attemptsLeft ?? 0 });
    case "code_expired":
      return t("err.otpExpired");
    case "too_many_attempts":
      return t("err.otpLocked");
    case "network":
      return t("err.network");
    case "unsupported_type":
      return t("err.avatarType");
    case "file_too_large":
      return t("err.avatarTooLarge");
    default:
      return t("err.generic");
  }
}

/** Characters as validation counts them: invisible format characters dropped, ends trimmed. */
export const visibleLength = (s: string) => charLength(stripFormat(s).trim());

/**
 * "n/max" counter for a label row: muted, red once over the limit; screen readers hear it only from 90%.
 * Used by the welcome step and the account page so both behave the same.
 */
export function Counter({ n, max }: { n: number; max: number }) {
  const { t } = useTranslation("account");
  return (
    <>
      <span aria-hidden="true" className={cx("text-[13px] tabular-nums", n > max ? "text-bad" : "text-ink-muted")}>
        {t("name.counter", { n, max })}
      </span>
      <span className="sr-only" aria-live="polite">
        {n >= max * 0.9 ? t("name.nearLimit", { n, max }) : ""}
      </span>
    </>
  );
}

/** Shared label/field styles for the membership forms. */
export const formLabel = "text-[13px] font-medium text-ink";
export const fieldErr = "mt-1 text-[13px] text-bad";
export const textBtn = "inline-flex h-11 cursor-pointer items-center text-[15px] text-link hover:underline disabled:cursor-default disabled:text-ink-muted disabled:no-underline";
/** Fixed-prefix input wrapper (+852, @): control look, focus ring on the wrapper. */
export const prefixWrap =
  "flex h-10 min-w-0 items-stretch rounded-control border border-line-strong bg-surface text-base text-ink focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-navy-700 sm:text-sm";
export const prefixChip = "flex flex-none items-center rounded-l-control border-r border-line-strong bg-surface-2 px-3 text-ink-muted tabular-nums";
export const prefixInput = "min-w-0 flex-1 bg-transparent px-3 tabular-nums outline-none placeholder:text-ink-muted";
