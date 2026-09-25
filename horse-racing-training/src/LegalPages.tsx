// Footer (Apple-style one-liner: copyright + legal links) and the legal pages it links to.
// Pages are views like the tabs (?tab=privacy …), so links are shareable and keep ?language=.
import { Fragment, type MouseEvent, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useFmt } from "./i18n/useLanguage";
import { Display, container, cx } from "./kit";
import { SITE } from "./site";

export const LEGAL_VIEWS = ["privacy", "terms", "sales", "legal", "sitemap"] as const;
export type LegalView = (typeof LEGAL_VIEWS)[number];
type DocKey = "privacy" | "terms" | "sales" | "legalNotices";
const DOC: Record<Exclude<LegalView, "sitemap">, DocKey> = { privacy: "privacy", terms: "terms", sales: "sales", legal: "legalNotices" };
interface Section {
  heading: string;
  body: readonly string[];
}

/** URL of the current page switched to view `v` (keeps ?language= and anything else). */
export function viewHref(v: string): string {
  const url = new URL(window.location.href);
  if (v === "bet") url.searchParams.delete("tab");
  else url.searchParams.set("tab", v);
  return url.pathname + url.search;
}

/** A real link to a view: shareable / open-in-new-tab, switched in place on a plain click. */
export function ViewLink({ view, onSelect, className, children }: { view: string; onSelect: (v: string) => void; className?: string; children: ReactNode }) {
  const go = (e: MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onSelect(view);
    window.scrollTo(0, 0);
  };
  return (
    <a href={viewHref(view)} onClick={go} className={className}>
      {children}
    </a>
  );
}

/** Fill {{company}} etc. in legal copy (these strings come back via returnObjects, uninterpolated). */
function useFill() {
  const { t } = useTranslation("common");
  const vars: Record<string, string> = { company: SITE.company, email: SITE.email, address: SITE.address, appName: t("appName") };
  return (s: string) => s.replace(/\{\{(\w+)\}\}/g, (m, k: string) => vars[k] ?? m);
}

export function Footer({ onSelect }: { onSelect: (v: string) => void }) {
  const { t } = useTranslation("legal");
  const links: [LegalView, string][] = [
    ["privacy", t("footer.privacy")],
    ["terms", t("footer.terms")],
    ["sales", t("footer.sales")],
    ["legal", t("footer.legal")],
    ["sitemap", t("footer.sitemap")],
  ];
  return (
    <footer className="mt-16 border-t border-edge bg-surface-2/60">
      <div className={cx(container, "flex flex-col gap-2 py-5 text-xs text-ink-3 lg:flex-row lg:items-center lg:gap-6")}>
        <p>{t("footer.copyright", { year: new Date().getFullYear(), company: SITE.company })}</p>
        <nav aria-label={t("footer.nav")}>
          <ul className="flex flex-wrap items-center gap-y-1">
            {links.map(([v, label], i) => (
              <li key={v} className={cx("flex items-center", i > 0 && "before:mx-2.5 before:h-3 before:border-l before:border-ink/20 before:content-['']")}>
                <ViewLink view={v} onSelect={onSelect} className="text-ink-2 hover:text-ink hover:underline">
                  {label}
                </ViewLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

/** Privacy Policy / Terms of Use / Sales and Refunds / Legal. */
export function LegalDoc({ view }: { view: Exclude<LegalView, "sitemap"> }) {
  const { t } = useTranslation("legal");
  const fmt = useFmt();
  const fill = useFill();
  const key = DOC[view];
  const sections = t(`${key}.sections`, { returnObjects: true }) as readonly Section[];
  return (
    <article className="max-w-[72ch] pb-4">
      <Display sub={t("updated", { date: fmt.date(`${SITE.legalUpdated}T12:00:00+08:00`, { dateStyle: "long" }) })}>{t(`${key}.title`)}</Display>
      <p className="mt-4 leading-relaxed text-ink-2">{fill(t(`${key}.intro`))}</p>
      {sections.map((s, i) => (
        <section key={i} className="mt-8">
          <h2 className="font-display text-2xl leading-tight">{fill(s.heading)}</h2>
          <Body lines={s.body.map(fill)} />
        </section>
      ))}
    </article>
  );
}

/** Paragraphs, with consecutive "• " lines grouped into one list. */
function Body({ lines }: { lines: string[] }) {
  const blocks: (string | string[])[] = [];
  for (const l of lines) {
    if (l.startsWith("• ")) {
      const last = blocks[blocks.length - 1];
      if (Array.isArray(last)) last.push(l.slice(2));
      else blocks.push([l.slice(2)]);
    } else blocks.push(l);
  }
  return (
    <>
      {blocks.map((b, i) =>
        Array.isArray(b) ? (
          <ul key={i} className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-2 marker:text-ink-3">
            {b.map((li, j) => (
              <li key={j}>{li}</li>
            ))}
          </ul>
        ) : (
          <p key={i} className="mt-3 leading-relaxed text-ink-2">
            {b}
          </p>
        )
      )}
    </>
  );
}

/** Every page, as links. `tools` are the app's tabs ([view, label]). */
export function SiteMap({ tools, onSelect }: { tools: [string, string][]; onSelect: (v: string) => void }) {
  const { t } = useTranslation("legal");
  const fill = useFill();
  const info: [LegalView, string][] = [
    ["privacy", t("footer.privacy")],
    ["terms", t("footer.terms")],
    ["sales", t("footer.sales")],
    ["legal", t("footer.legal")],
  ];
  const groups: [string, [string, string][]][] = [
    [t("sitemap.tools"), tools],
    [t("sitemap.info"), info],
  ];
  return (
    <article className="pb-4">
      <Display sub={fill(t("sitemap.intro"))}>{t("sitemap.title")}</Display>
      <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map(([heading, links]) => (
          <Fragment key={heading}>
            <section>
              <h2 className="border-b border-edge pb-2 text-sm font-semibold text-ink">{heading}</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {links.map(([v, label]) => (
                  <li key={v}>
                    <ViewLink view={v} onSelect={onSelect} className="text-ink-2 hover:text-ink hover:underline">
                      {label}
                    </ViewLink>
                  </li>
                ))}
              </ul>
            </section>
          </Fragment>
        ))}
      </div>
    </article>
  );
}
