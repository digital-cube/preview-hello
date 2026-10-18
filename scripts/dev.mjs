// Starts the backend and the Vite dev server together.
//
//   npm run dev -- --host 0.0.0.0 --port $PORT
//
// The preview tunnel forwards ONE port ($PORT), so only Vite listens on it.
// The backend listens on loopback at PORT+1000 and Vite proxies /api to it.
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    host: { type: "string", default: process.env.HOST ?? "127.0.0.1" },
    port: { type: "string", default: process.env.PORT ?? "5173" },
  },
  strict: false,
});

// A fresh checkout has no node_modules yet (a runner box runs
// tools/box/setup.sh only before an agent session), so the first start
// installs them instead of failing.
if (!existsSync("node_modules/.bin/vite")) {
  console.log("dev: node_modules missing — npm install");
  const r = spawnSync("npm", ["install", "--no-fund", "--no-audit"], { stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const port = Number(values.port);
const apiPort = port + 1000;
const env = { ...process.env, API_PORT: String(apiPort) };

const children = [
  spawn("node", ["backend/server.mjs"], { stdio: "inherit", env }),
  spawn(
    "npx",
    ["vite", "--host", values.host, "--port", String(port), "--strictPort"],
    { stdio: "inherit", env, cwd: "frontend" },
  ),
];

const stop = (code) => {
  for (const c of children) c.kill("SIGTERM");
  process.exit(code);
};
process.on("SIGINT", () => stop(0));
process.on("SIGTERM", () => stop(0));
for (const c of children) c.on("exit", (code) => stop(code ?? 1));
