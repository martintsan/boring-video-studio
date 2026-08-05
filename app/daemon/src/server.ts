import { serve } from "@hono/node-server";
import { createStudioApi } from "@hyperframes/studio-server";
import chokidar from "chokidar";
import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import { configuredProviders, getModelRuntime } from "./ai/modelRuntime.js";
import { getProjectSession } from "./ai/sessionRegistry.js";
import { PROVIDERS } from "./config/providers.js";
import { serializeEvent } from "./lib/serializeEvent.js";
import { createProject, listProjects, projectDir } from "./projects/store.js";
import { createStudioAdapter, runtimeScript } from "./studio/adapter.js";

const app = new Hono();

// --- HyperFrames Studio surface (SPA-compatible), mounted at /api ---

// Runtime JS for previews. Registered before the /api mount so it takes
// precedence over the studio-api catch-all.
app.get("/api/runtime.js", (c) => {
  c.header("content-type", "application/javascript; charset=utf-8");
  return c.body(runtimeScript());
});

// bundle / preview / lint / render / file-mutations, via our adapter.
app.route("/api", createStudioApi(createStudioAdapter()));

// --- Boring Video Studio surface (agent + projects + hot reload) at /bvs ---

const bvs = new Hono();

bvs.get("/health", (c) => c.json({ ok: true }));

bvs.get("/providers", (c) => {
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

bvs.get("/models", async (c) => {
  const runtime = await getModelRuntime();
  const provider = c.req.query("provider") ?? process.env.BVS_PROVIDER ?? configuredProviders()[0];
  if (!provider) return c.json({ provider: null, models: [] });
  const models = runtime.getModels(provider).map((m) => ({
    id: m.id,
    name: (m as { name?: string }).name ?? m.id,
  }));
  return c.json({ provider, models });
});

bvs.get("/projects", async (c) => c.json({ projects: await listProjects() }));

bvs.post("/projects", async (c) => {
  const body = await c.req.json<{ name?: string }>();
  const { id, dir } = await createProject(body.name ?? "untitled");
  return c.json({ id, dir });
});

// Project-scoped chat: run the agent, stream its events over SSE.
bvs.post("/projects/:id/chat", async (c) => {
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

// File-watch SSE: drives browser hot-reload when the agent (or user) edits files.
bvs.get("/projects/:id/events", (c) => {
  const dir = projectDir(c.req.param("id"));
  return streamSSE(c, async (stream) => {
    const watcher = chokidar.watch(dir, { ignoreInitial: true });
    watcher.on("all", (event, path) => {
      void stream.writeSSE({ event: "file-change", data: JSON.stringify({ event, path }) });
    });
    await new Promise<void>((resolve) => {
      stream.onAbort(() => {
        void watcher.close();
        resolve();
      });
    });
  });
});

app.route("/bvs", bvs);

const port = Number(process.env.PORT ?? 4319);
serve({ fetch: app.fetch, hostname: "127.0.0.1", port }, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Boring Video Studio daemon → http://127.0.0.1:${info.port}`);
});
