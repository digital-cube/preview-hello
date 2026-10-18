# preview-hello

The smallest project with two halves, for showing a Thilo-AI preview end to end: a backend that answers `GET /api/hello` with `{"message": "hello world", "at": "<iso>"}`, and a Vite + TypeScript page that asks it on load and prints the answer.

- `backend/` — Express on `127.0.0.1:$((PORT+1000))`, loopback only.
- `frontend/` — Vite on `$PORT`; `server.proxy` sends `/api` to the backend, so one port carries the page, the API and HMR.

## Run

```sh
npm install
npm run dev -- --host 0.0.0.0 --port $PORT
```

Without `$PORT` it uses 5173 (backend on 6173). In a runner box the dev server must bind `0.0.0.0`.

`tools/box/setup.sh` runs `npm install` when the runner box sets the project up, so the first preview start is warm.
