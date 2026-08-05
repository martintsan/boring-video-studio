# web — React SPA (the app shell)

Runs in the browser, talks to the local `daemon`. Reuses HyperFrames Studio
components (`@hyperframes/studio`: `StudioApp` / `EditorShell` / `Player` / ...)
for the editing surface, and adds the agent + project layers on top.

## Surfaces (MVP)

- **Project home** — CapCut-style gallery of `/videos/*` projects; "new project".
- **Chat panel** — conversation bound to the active project; renders the agent
  event stream (text / thinking / tool calls) from the daemon SSE.
- **Preview + edit** — embedded HyperFrames Studio (`EditorShell` / preview
  iframe). Hot-reloads on the daemon's `file-change` SSE.
- **Model picker** — choose the underlying pi model/provider.

## Run (M2)

Two processes. Terminal 1 — daemon (with a provider key):

```
cd ../daemon && export ANTHROPIC_API_KEY=sk-...   # or another provider's key
export BVS_VIDEOS_ROOT="$PWD/../videos"
npm run build && npm run start:node               # :4319
```

Terminal 2 — web dev server (proxies /api and /bvs to the daemon):

```
npm run dev        # http://127.0.0.1:5319
```

Open the URL, create a project, and chat: the agent writes HyperFrames HTML into
the project dir, the preview iframe renders it, and edits hot-reload the preview.

## Structure

- `src/App.tsx` — two-pane shell: chat (left) + preview iframe (right), project picker.
- `src/lib/api.ts` — daemon client: projects, chat SSE (fetch stream), file-change EventSource.

## Planned structure (M3)

```
src/
  main.tsx
  home/            project gallery + create
  chat/            chat panel, SSE client, message/tool-call rendering
  editor/          embed @hyperframes/studio EditorShell + preview iframe
  lib/eventStream.ts   reusable daemon SSE client
```
