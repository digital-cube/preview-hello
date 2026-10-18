import express from "express";

const app = express();
const port = Number(process.env.API_PORT ?? 6173);

app.get("/api/hello", (_req, res) => {
  res.json({ message: "hello world", at: new Date().toISOString() });
});

// Loopback only: the browser reaches the API through Vite's proxy.
app.listen(port, "127.0.0.1", () => {
  console.log(`backend: http://127.0.0.1:${port}/api/hello`);
});
