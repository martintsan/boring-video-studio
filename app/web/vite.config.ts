import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Dev server proxies the daemon so the browser talks to one origin.
const DAEMON = process.env.BVS_DAEMON ?? "http://127.0.0.1:4319";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5319,
    proxy: {
      "/api": { target: DAEMON, changeOrigin: true },
      "/bvs": { target: DAEMON, changeOrigin: true },
    },
  },
});
