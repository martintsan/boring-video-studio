import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import { configuredProviders, getModelRuntime } from "./ai/modelRuntime.js";
import { getProjectSession } from "./ai/sessionRegistry.js";
import { PROVIDERS } from "./config/providers.js";
import { serializeEvent } from "./lib/serializeEvent.js";
import { createProject, listProjects, projectDir } from "./projects/store.js";

const app = new Hono();

app.get("/health", (c) => c.json({ ok: true }));

// Surfaced providers + whether the user has configured a key for each.
app.get("/api/providers", (c) => {
  const configured = new Set(configuredProviders());
  return c.json({
    active: process.env.BVS_PROVIDER ?? configuredProviders()[0] ?? null,
    providers: PROVIDERS.map((p) => ({
      id: p.id,
      label: p.label,
      configured: configured.has(p.id),
    })),
  });
});

// Models for a provider (base URLs + catalog come from pi-ai's builtin data).
app.get("/api/models", async (c) => {
  const runtime = await getModelRuntime();
  const provider = c.req.query("provider") ?? process.env.BVS_PROVIDER ?? configuredProviders()[0];
  if (!provider) return c.json({ provider: null, models: [] });
  const models = runtime.getModels(provider).map((m) => ({
    id: m.id,
    name: (m as { name?: string }).name ?? m.id,
  }));
  return c.json({ provider, models });
});

// List / create video projects (one video = one directory).
app.get("/api/projects", async (c) => c.json({ projects: await listProjects() }));

app.post("/api/projects", async (c) => {
  const body = await c.req.json<{ name?: string }>();
  const { id, dir } = await createProject(body.name ?? "untitled");
  return c.json({ id, dir });
});

// Project-scoped chat: run the agent on a message, stream its events over SSE.
app.post("/api/projects/:id/chat", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json<{ message?: string }>();
  const message = body.message?.trim();
  if (!message) return c.json({ error: "message required" }, 400);

  const session = await getProjectSession(id, projectDir(id));

  return streamSSE(c, async (stream) => {
    const unsubscribe = session.subscribe((event) => {
      void stream.writeSSE({ event: "agent", data: JSON.stringify(serializeEvent(event)) });
    });
    try {
      await session.prompt(message);
      await stream.writeSSE({ event: "done", data: "{}" });
    } catch (err) {
      await stream.writeSSE({
        event: "error",
        data: JSON.stringify({ message: err instanceof Error ? err.message : String(err) }),
      });
    } finally {
      unsubscribe();
    }
  });
});

const port = Number(process.env.PORT ?? 4319);
serve({ fetch: app.fetch, hostname: "127.0.0.1", port }, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Boring Video Studio daemon → http://127.0.0.1:${info.port}`);
});
