import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Dev: Vite serves the SPA on WEB_PORT and proxies /api to the Express server
// on PORT. Prod: `npm run build` emits dist/, which the Express server serves
// directly, so WEB_PORT is unused.
//
// Ports come from .env (see .env.example). The third loadEnv argument is ""
// so unprefixed vars are read too — the default only exposes VITE_*. These
// values stay in the config and are never bundled into client code.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const webPort = Number(env.WEB_PORT) || 5173;
  const apiPort = Number(env.PORT) || 8787;

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: webPort,
      proxy: {
        "/api": `http://localhost:${apiPort}`,
      },
    },
    build: {
      outDir: "dist",
    },
  };
});
