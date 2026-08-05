// Thin client for the daemon. Vite proxies /api and /bvs to it in dev.

export interface AgentEvent {
  type?: string;
  delta?: string;
  tool?: string;
  isError?: boolean;
  __event?: string;
  message?: string;
}

export async function listProjects(): Promise<string[]> {
  const res = await fetch("/bvs/projects");
  return ((await res.json()) as { projects: string[] }).projects;
}

export async function createProject(name: string): Promise<string> {
  const res = await fetch("/bvs/projects", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return ((await res.json()) as { id: string }).id;
}

export function previewUrl(projectId: string, nonce: number): string {
  return `/api/projects/${projectId}/preview?t=${nonce}`;
}

export interface ProviderInfo {
  id: string;
  label: string;
  configured: boolean;
}

export async function getProviders(): Promise<{ active: string | null; providers: ProviderInfo[] }> {
  return (await fetch("/bvs/providers")).json();
}

export async function getModels(provider: string): Promise<{ id: string; name: string }[]> {
  const res = await fetch(`/bvs/models?provider=${encodeURIComponent(provider)}`);
  return ((await res.json()) as { models: { id: string; name: string }[] }).models;
}

export async function getConfig(): Promise<{ provider?: string; model?: string }> {
  return (await fetch("/bvs/config")).json();
}

export async function setConfig(provider: string, model?: string): Promise<{ provider?: string; model?: string }> {
  const res = await fetch("/bvs/config", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ provider, model }),
  });
  return res.json();
}

// POST chat and stream SSE events (fetch, since EventSource is GET-only).
export async function chat(
  projectId: string,
  message: string,
  onEvent: (ev: AgentEvent) => void,
): Promise<void> {
  const res = await fetch(`/bvs/projects/${projectId}/chat`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.body) return;
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const frames = buffer.split("\n\n");
    buffer = frames.pop() ?? "";
    for (const frame of frames) {
      let eventName: string | undefined;
      let data: AgentEvent = {};
      for (const line of frame.split("\n")) {
        if (line.startsWith("event:")) eventName = line.slice(6).trim();
        else if (line.startsWith("data:")) {
          try {
            data = JSON.parse(line.slice(5).trim());
          } catch {
            // ignore malformed frame
          }
        }
      }
      onEvent({ ...data, __event: eventName });
    }
  }
}

// Subscribe to file-change events for hot reload (GET → EventSource).
export function watchProject(projectId: string, onChange: () => void): () => void {
  const source = new EventSource(`/bvs/projects/${projectId}/events`);
  source.addEventListener("file-change", () => onChange());
  return () => source.close();
}
