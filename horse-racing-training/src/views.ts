// The app's ?tab= views. Home is the landing view: ?tab=home is the default, so it never appears in the URL.
import { LEGAL_VIEWS } from "./LegalPages";

/** Every ?tab= view. "account" is reached from the avatar menu and "member" (?tab=member&id=…) from the
 *  Home leaderboard, so neither is a primary tab. */
export const VIEWS = ["home", "bet", "member", "history", "win-place", "trio", "momentum", "settings", "account", "credits", ...LEGAL_VIEWS] as const;
export type View = (typeof VIEWS)[number];
export const DEFAULT_VIEW: View = "home";

/** Tab named by ?tab= in the URL; unknown or missing → the default tab. */
export function readView(search: string = window.location.search): View {
  const t = new URLSearchParams(search).get("tab");
  return VIEWS.find((v) => v === t) ?? DEFAULT_VIEW;
}
