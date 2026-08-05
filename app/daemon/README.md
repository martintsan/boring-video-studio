# daemon — local Node backend

The single local process. Serves the editing/preview/render API and runs the
agent. Binds loopback only.

## Run (M1)

```
npm run build && npm run start:node    # tsc → node dist/server.js (reliable)
# ANTHROPIC_API_KEY / OPENAI_API_KEY in env enables the agent chat route
# BVS_VIDEOS_ROOT sets where projects live (default: ./videos)
```

`npm run dev` (tsx watch) is nicer for iteration but currently hits an
esbuild version conflict in this workspace (tsx's bundled esbuild vs the hoisted
one); until that's deduped, use the build+node path above.

## Providers & models

pi-ai ships 1000+ models across all mainstream providers with base URLs baked in.
We surface a curated set in `src/config/providers.ts`; the user configures one
provider's key and picks a model.

- Set the key via that provider's env var, e.g. `DEEPSEEK_API_KEY`, `ZAI_API_KEY`
  (GLM / z.ai), `MINIMAX_API_KEY`, `MOONSHOT_API_KEY` (Kimi), `QWEN_API_KEY`,
  `OPENROUTER_API_KEY`, plus `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` / `GOOGLE_API_KEY`.
- Select the active model with `BVS_PROVIDER` (e.g. `deepseek`, `zai`) and
  optionally `BVS_MODEL` (e.g. `glm-5.1`). Defaults to the first configured provider.
- Endpoints: `GET /api/providers` (list + configured flag), `GET /api/models?provider=<id>`.
- Add a provider by appending one row to `src/config/providers.ts` (id must match
  pi-ai's provider id).

## Responsibilities

1. **HyperFrames API** — bundle / preview / lint / render / file-mutations for a
   project directory, via `@hyperframes/studio-server`'s `createStudioApi(adapter)`.
   We supply the adapter (file I/O, bundling via `@hyperframes/core`, rendering
   via `@hyperframes/producer` + `@hyperframes/engine`).
2. **Agent** — one `createAgentSession` (`@earendil-works/pi-coding-agent`) per
   video project, with `cwd` = that project's directory. `session.prompt(msg)`
   runs the loop; `session.subscribe(ev)` is relayed to the browser over SSE.
3. **File watch → hot reload** — watch the project dir (`chokidar`); on change,
   push an SSE `file-change` event so the browser preview reloads.
4. **Model config** — `@earendil-works/pi-ai` `getModel(provider, id)` selects the
   underlying model/provider per turn.

## Planned modules (fill in M1–M2)

```
src/
  server.ts             Hono app: mount /api (studio) + /api/projects/:id/chat (agent SSE) + /api/events (file-watch SSE)
  studio/adapter.ts     StudioApiAdapter impl (bundle/lint/render/file I/O)
  ai/sessionRegistry.ts one pi agent session per project (cwd), cached
  ai/studioTools.ts     defineTool(...) wrapping studio-server ops (create_composition, render_scene, ...)
  ai/modelRuntime.ts    ModelRuntime.create() + BYOK key wiring
  projects/store.ts     scan /videos root, create/scaffold a new project dir
```

## Open item (resolve in M2)

`@hyperframes/studio-server` exports the API factory but not a runnable server;
the static-serve + `/api/events` + chokidar wiring lives in the HyperFrames CLI
(`@hyperframes/cli`). Decide: reuse `@hyperframes/cli`'s server if it exports one,
or write our own thin adapter+server against `createStudioApi`. See root README.
