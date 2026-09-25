// Phone/tablet navigation: a menu button in the header opens a sheet that drops from the top
// of the screen (below `lg`; desktop shows inline tabs instead).
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cx } from "./kit";

const iconBtn = "inline-flex size-11 flex-none cursor-pointer items-center justify-center rounded-[10px] text-ink transition-colors";

export function MobileNav<V extends string>({ title, tabs, view, onSelect }: { title: string; tabs: [V, string][]; view: V; onSelect: (v: V) => void }) {
  const [open, setOpen] = useState(false);
  const openRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // While open: Esc closes, the page behind doesn't scroll, focus moves into the sheet.
  // Growing past `lg` (where inline tabs take over) closes it too.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = () => wide.matches && setOpen(false);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  // Hand focus back to the menu button after closing.
  useEffect(() => {
    if (wasOpen.current && !open) openRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      <button
        ref={openRef}
        type="button"
        className={cx(iconBtn, "-mr-2 ml-auto hover:bg-surface-2 lg:hidden")}
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M3 5.5h14M3 10h14M3 14.5h14" />
        </svg>
      </button>

      {createPortal(
        <div className={cx("fixed inset-0 z-50 lg:hidden", open ? "visible" : "invisible transition-[visibility] duration-200")} aria-hidden={!open}>
          <div
            className={cx("absolute inset-0 bg-ink/30 backdrop-blur-[2px] transition-opacity duration-200 motion-reduce:transition-none", open ? "opacity-100" : "opacity-0")}
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className={cx(
              "absolute inset-x-0 top-0 rounded-b-3xl bg-canvas px-5 pt-4 pb-5 shadow-pop transition-transform duration-200 ease-out motion-reduce:transition-none",
              open ? "translate-y-0" : "-translate-y-full"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl leading-none tracking-[-0.01em] text-ink">{title}</span>
              <button ref={closeRef} type="button" className={cx(iconBtn, "bg-surface-3 hover:bg-surface-3/70")} aria-label="Close menu" onClick={() => setOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
                </svg>
              </button>
            </div>
            <nav aria-label="Sections" className="mt-2">
              <ul className="divide-y divide-edge">
                {tabs.map(([v, label]) => (
                  <li key={v}>
                    <button
                      type="button"
                      className={cx("flex h-14 w-full cursor-pointer items-center justify-between text-left text-base text-ink", view === v && "font-semibold")}
                      aria-current={view === v ? "page" : undefined}
                      onClick={() => {
                        onSelect(v);
                        setOpen(false);
                      }}
                    >
                      {label}
                      {view === v && <span className="size-2 rounded-full bg-accent" aria-hidden />}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
