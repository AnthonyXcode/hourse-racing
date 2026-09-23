// Lazily-opened singleton (DB + poller) shared by the server entry and the API routes.
import { openDb, repo, type Repo } from "./db";
import { createPoller, type Poller } from "./poller";
import { hkjcClient } from "./hkjcClient";

let inst: { repo: Repo; poller: Poller } | null = null;

export function momentum() {
  if (!inst) {
    const r = repo(openDb());
    inst = {
      repo: r,
      poller: createPoller({
        client: hkjcClient,
        repo: r,
        windowSecs: (Number(process.env.MOMENTUM_WINDOW_MIN) || 30) * 60,
      }),
    };
  }
  return inst;
}
