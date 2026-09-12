// Imported first by index.ts so .env is applied before any other module is evaluated —
// some read process.env at import time (e.g. Playwright's PLAYWRIGHT_BROWSERS_PATH).
import dotenv from "dotenv";

dotenv.config({ quiet: true });
