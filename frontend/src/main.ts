import "./style.css";

type Hello = { message: string; at: string };

const LABEL = "Bekend kaže:";

async function load(): Promise<void> {
  document.querySelector("#label")!.textContent = LABEL;
  const res = await fetch("/api/hello");
  if (!res.ok) {
    document.querySelector("#message")!.textContent = `greška ${res.status}`;
    return;
  }
  const hello = (await res.json()) as Hello;
  document.querySelector("#message")!.textContent = hello.message;
  document.querySelector("#at")!.textContent = hello.at;
}

void load();
