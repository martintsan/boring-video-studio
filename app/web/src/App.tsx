import { useEffect, useRef, useState } from "react";
import {
  type AgentEvent,
  chat,
  createProject,
  listProjects,
  previewUrl,
  watchProject,
} from "./lib/api";

interface Entry {
  id: number;
  role: "user" | "assistant" | "tool" | "system";
  text: string;
}

let entrySeq = 0;

export function App() {
  const [projects, setProjects] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [nonce, setNonce] = useState(1);
  const logRef = useRef<HTMLDivElement>(null);

  // Load projects on mount.
  useEffect(() => {
    listProjects().then((p) => {
      setProjects(p);
      if (p.length > 0) setActive((a) => a ?? p[0]);
    });
  }, []);

  // Hot reload: reload the preview iframe when the active project's files change.
  useEffect(() => {
    if (!active) return;
    return watchProject(active, () => setNonce((n) => n + 1));
  }, [active]);

  // Auto-scroll the transcript.
  useEffect(() => {
    logRef.current?.scrollTo(0, logRef.current.scrollHeight);
  }, [entries]);

  function push(role: Entry["role"], text: string): number {
    const id = ++entrySeq;
    setEntries((prev) => [...prev, { id, role, text }]);
    return id;
  }

  function appendTo(id: number, text: string) {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, text: e.text + text } : e)));
  }

  async function onNewProject() {
    const name = window.prompt("New video project name?");
    if (!name) return;
    const id = await createProject(name);
    setProjects(await listProjects());
    setActive(id);
    setEntries([]);
  }

  async function onSend() {
    const message = input.trim();
    if (!message || !active || busy) return;
    setInput("");
    push("user", message);
    const assistantId = push("assistant", "");
    setBusy(true);
    try {
      await chat(active, message, (ev: AgentEvent) => {
        if (ev.type === "text_delta" && ev.delta) appendTo(assistantId, ev.delta);
        else if (ev.type === "tool_start") push("tool", `🔧 ${ev.tool ?? "tool"}`);
        else if (ev.__event === "error") push("system", `⚠ ${ev.message ?? "error"}`);
      });
    } catch (err) {
      push("system", `⚠ ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <strong>Boring Video Studio</strong>
        <select value={active ?? ""} onChange={(e) => setActive(e.target.value || null)}>
          {projects.length === 0 && <option value="">no projects</option>}
          {projects.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <button onClick={onNewProject}>+ New</button>
      </header>

      <main className="panes">
        <section className="chat">
          <div className="log" ref={logRef}>
            {entries.map((e) => (
              <div key={e.id} className={`entry ${e.role}`}>
                {e.text || (e.role === "assistant" && busy ? "…" : "")}
              </div>
            ))}
          </div>
          <div className="composer">
            <textarea
              value={input}
              placeholder={active ? "Describe or edit the video…" : "Create a project first"}
              disabled={!active || busy}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void onSend();
                }
              }}
            />
            <button onClick={() => void onSend()} disabled={!active || busy}>
              {busy ? "…" : "Send"}
            </button>
          </div>
        </section>

        <section className="preview">
          {active ? (
            <iframe key={nonce} title="preview" src={previewUrl(active, nonce)} />
          ) : (
            <div className="empty">No project selected</div>
          )}
        </section>
      </main>
    </div>
  );
}
