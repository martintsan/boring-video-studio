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

## Planned structure (fill in M2–M3)

```
src/
  main.tsx
  home/            project gallery + create
  chat/            chat panel, SSE client, message/tool-call rendering
  editor/          embed @hyperframes/studio EditorShell + preview iframe
  lib/eventStream.ts   reusable daemon SSE client
```
