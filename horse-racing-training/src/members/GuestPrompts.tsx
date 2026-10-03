// Guest prompts (design spec §4): the save banner in the result modal and the login empty state
// for History / Account.
import { useId } from "react";
import { useTranslation } from "react-i18next";
import { btnPrimary, cx, panel } from "../kit";

/** Result-modal banner: sky panel, gold Log in (never a gold banner). */
export function SaveBanner({ onLogin }: { onLogin: () => void }) {
  const { t } = useTranslation("account");
  const id = useId();
  return (
    <section role="region" aria-labelledby={id} className="mb-4 rounded-card bg-sky-50 p-[13px] ring-1 ring-navy-700/20 sm:flex sm:items-center sm:gap-4">
      <div className="min-w-0 flex-1">
        <h3 id={id} className="text-[15px] font-medium text-navy-900">
          {t("guest.bannerTitle")}
        </h3>
        <p className="mt-1 text-[13px] leading-normal text-ink">{t("guest.bannerBody")}</p>
      </div>
      <button type="button" className={cx(btnPrimary, "mt-3 w-full sm:mt-0 sm:w-auto")} onClick={onLogin}>
        {t("guest.bannerCta")}
      </button>
    </section>
  );
}

/** Centred login call-to-action that replaces member-only content for guests. */
export function LoginEmptyState({ title, onLogin }: { title: string; onLogin: () => void }) {
  const { t } = useTranslation("account");
  return (
    <div className={cx(panel, "mt-4 flex flex-col items-center py-10 text-center sm:py-10")}>
      <h2 className="text-[17px] font-medium text-navy-900">{title}</h2>
      <p className="mt-2 max-w-[40ch] text-[13px] leading-normal text-ink-muted">{t("guest.historyBody")}</p>
      <button type="button" className={cx(btnPrimary, "mt-5")} onClick={onLogin}>
        {t("guest.historyCta")}
      </button>
      <p className="mt-3 max-w-[40ch] text-[13px] leading-normal text-ink-muted">{t("guest.noAccount")}</p>
    </div>
  );
}
