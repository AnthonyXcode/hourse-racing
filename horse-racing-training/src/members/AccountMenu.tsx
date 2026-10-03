// Header entry (design spec §1): Log in pill for guests; avatar + account menu for members
// (popover from sm, bottom sheet on phones).
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { maskPhoneUi } from "../../shared/validation";
import { btnPill, cx } from "../kit";
import { useAuth } from "./auth";
import { Avatar } from "./ui";
import { useCredits } from "../credits/CreditsProvider";
import { useFmt } from "../i18n/useLanguage";

export function AccountEntry({ current, onNavigate, onLogout }: { current: string; onNavigate: (v: "account" | "history" | "credits") => void; onLogout: () => void }) {
  const { t } = useTranslation(["account", "common", "credits"]);
  const { user, openLogin, guard } = useAuth();
  const { balance } = useCredits();
  const fmt = useFmt();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  // Two renderings of one menu: a popover in the header (≥ sm) and a bottom sheet portalled to <body> (< sm).
  // The sheet must live outside the sticky header: the header is its own stacking context (z-40), so a
  // sheet inside it would sit under the page's own fixed z-40 bars (bet slip, account Save bar).
  const popover = useRef<HTMLDivElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  /** Whichever rendering is showing at this width. */
  const visibleMenu = () => [popover.current, sheet.current].find((el) => el && el.offsetParent !== null) ?? null;
  const menuId = useId();

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) trigger.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    visibleMenu()?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!popover.current?.contains(t) && !sheet.current?.contains(t) && !trigger.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    // Phones get a bottom sheet: the page behind it shouldn't scroll.
    const phone = window.matchMedia("(max-width: 639.98px)").matches;
    const prev = document.body.style.overflow;
    if (phone) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (user === undefined) return <span aria-hidden="true" className="size-7 flex-none rounded-full bg-white/20" />;

  if (user === null)
    return (
      <button type="button" className={cx(btnPill, "relative flex-none before:absolute before:-inset-2 before:content-['']")} onClick={() => openLogin({ source: "header" })}>
        {t("login")}
      </button>
    );

  const items: { key: string; label: string; value?: string; current?: boolean; run: () => void }[] = [
    { key: "profile", label: t("menu.profile"), current: current === "account", run: () => guard(() => onNavigate("account")) },
    { key: "credits", label: t("credits:menu.credits"), value: balance == null ? undefined : fmt.num(balance), current: current === "credits", run: () => guard(() => onNavigate("credits")) },
    { key: "history", label: t("menu.history"), current: current === "history", run: () => guard(() => onNavigate("history")) },
    { key: "logout", label: t("menu.logout"), run: () => guard(onLogout) },
  ];

  const head = (
    <div className="border-b border-line px-[13px] py-2">
      <div className="truncate text-[15px] font-medium text-navy-900">{user.displayName}</div>
      <div className="text-[13px] text-ink-muted tabular-nums">{maskPhoneUi(user.phone)}</div>
    </div>
  );
  /** Menu rows: 48px with dividers in the phone sheet, 44px in the popover. */
  const list = (phone: boolean) =>
    items.map((it) => (
      <button
        key={it.key}
        type="button"
        role="menuitem"
        aria-current={it.current ? "page" : undefined}
        className={cx(
          "flex w-full cursor-pointer items-center px-[13px] text-left text-[15px] hover:bg-sky-50 focus-visible:bg-sky-50",
          phone ? "h-12 border-b border-line last:border-b-0" : "h-11",
          it.current ? "font-medium text-navy-700" : "text-ink"
        )}
        onClick={() => {
          close();
          it.run();
        }}
      >
        {it.label}
        {it.value && <span className="ml-auto text-ink-muted tabular-nums">{it.value}</span>}
      </button>
    ));

  const onKey = (e: React.KeyboardEvent) => {
    const els = [...(visibleMenu()?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [])];
    const i = els.indexOf(document.activeElement as HTMLElement);
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const n = els.length;
      els[(i + (e.key === "ArrowDown" ? 1 : n - 1)) % n]?.focus();
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      els[e.key === "Home" ? 0 : els.length - 1]?.focus();
    } else if (e.key === "Tab") close(false);
  };

  return (
    <div className="relative flex-none">
      <button
        ref={trigger}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? `${menuId} ${menuId}-sheet` : undefined}
        aria-label={t("menu.open", { name: user.displayName })}
        className="relative flex min-h-11 cursor-pointer items-center gap-2 rounded-full text-white"
        onClick={() => setOpen((o) => !o)}
      >
        <Avatar name={user.displayName} src={user.avatarUrl} size="size-7" />
        <span className="hidden max-w-[12ch] truncate text-[13px] lg:inline">{user.displayName}</span>
        <svg aria-hidden="true" viewBox="0 0 12 12" className="hidden size-3 fill-none stroke-current text-white/75 lg:block" strokeWidth="1.6">
          <path d="M2.5 4.5L6 8l3.5-3.5" />
        </svg>
      </button>

      {open && (
        <div ref={popover} id={menuId} role="menu" aria-label={t("menu.open", { name: user.displayName })} onKeyDown={onKey} className="absolute top-full right-0 z-50 mt-1 hidden w-60 rounded-card bg-surface py-1 text-ink shadow-pop sm:block">
          {head}
          {list(false)}
        </div>
      )}
      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 sm:hidden">
            <div aria-hidden="true" className="absolute inset-0 bg-ink/40" onClick={() => close()} />
            <div
              ref={sheet}
              id={`${menuId}-sheet`}
              role="menu"
              aria-label={t("menu.open", { name: user.displayName })}
              onKeyDown={onKey}
              className="absolute inset-x-0 bottom-0 rounded-t-sheet bg-surface pb-[env(safe-area-inset-bottom)] text-ink shadow-pop motion-safe:animate-[sheet-up_250ms_ease-out]"
            >
              <button type="button" tabIndex={-1} aria-hidden="true" className="flex h-6 w-full cursor-pointer items-center justify-center" onClick={() => close()}>
                <span className="h-1 w-10 rounded-full bg-line" />
              </button>
              {head}
              {list(true)}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
