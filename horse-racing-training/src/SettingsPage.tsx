// Settings: per-browser preferences. For now, the cut-off notification opt-in.
import { useTranslation } from "react-i18next";
import { NotifyToggle, storedCutoff } from "./momentum/notify";
import { cutoffLabel } from "./momentum/cutoff";
import { Display, h3, page, panel } from "./kit";

export function SettingsPage() {
  const { t } = useTranslation();
  const { t: tm } = useTranslation(["momentum", "common"]);
  return (
    <div className={page}>
      <Display>{t("settings.title")}</Display>
      <div className={panel}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <h3 className={h3}>{t("settings.notify.title")}</h3>
            <p className="text-ink-2">{tm("notify.hint")}</p>
            <p className="mt-1 text-xs text-ink-3">{t("settings.notify.cutoff", { when: cutoffLabel(tm, storedCutoff()) })}</p>
          </div>
          <NotifyToggle className="flex-none self-start sm:self-center" />
        </div>
      </div>
    </div>
  );
}
