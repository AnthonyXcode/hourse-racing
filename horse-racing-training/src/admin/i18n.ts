// The admin namespace is registered here, in the lazy admin bundle, so none of its strings ship with the app.
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { admin as en } from "../i18n/locales/en/admin";
import { admin as zh } from "../i18n/locales/zh-HK/admin";

i18n.addResourceBundle("en", "admin", en, true, true);
i18n.addResourceBundle("zh-HK", "admin", zh, true, true);

export type T = (key: string, opts?: Record<string, unknown>) => string;

/** t() for the admin namespace (keys aren't in the app's typed resources). Re-renders on language change. */
export function useA(): T {
  useTranslation(); // subscribe to language changes
  return (key, opts) => i18n.t(`admin:${key}`, opts as never) as unknown as string;
}
