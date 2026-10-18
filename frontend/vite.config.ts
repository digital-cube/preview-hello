import { defineConfig } from "vite";

const apiPort = Number(process.env.API_PORT ?? 6173);

export default defineConfig({
  server: {
    // The preview arrives under its own public hostname, not localhost.
    allowedHosts: true,
    proxy: {
      "/api": `http://127.0.0.1:${apiPort}`,
    },
  },
});
