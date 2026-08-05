# Boring Video Studio

An open-source, **agent-native video studio**. You talk to it; it generates and
edits [HyperFrames](https://github.com/heygen-com/hyperframes) video projects,
renders them live, and you preview/edit the result — then keep steering by chat.

- **Agent base:** [pi](https://github.com/earendil-works/pi) (`@earendil-works/pi-*`, MIT) — in-process agent loop + unified multi-provider LLM API.
- **Editor / render:** HyperFrames Studio (`@hyperframes/*`, Apache-2.0) — reused as dependencies.
- **Stack:** TypeScript / Node throughout. Local web app first; Electron shell later.
- Licensing recorded in [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md).

## MVP (v1) — five capabilities

1. **Project-scoped chat** — conversation is bound to a specific video project; can create a new project. One video = one project directory under `videos/`.
2. **Chat-driven generation** — generate video through conversation, like a Claude session.
3. **Render & preview** — HyperFrames produces an HTML; render it in-app, Artifact / Open-Design style.
4. **Browser interaction** — preview / edit / adjust the rendered page inside the app (embedded HyperFrames Studio).
5. **Live refresh** — keep editing by chat; when the HTML changes, the preview hot-reloads.

Plus a cross-cutting: **configurable underlying agent / model** (pi-ai provider + model per turn).

## Architecture

```
 Browser (web/ — React SPA)
   project home (CapCut-style) │ chat panel │ embedded HyperFrames Studio (preview + edit)
        │ REST + SSE                 │ chat SSE            │ file-change SSE
 ─────────────────────────────────────────────────────────────────────────────
 daemon/ — one local Node process (loopback)
   @hyperframes/studio-server API  │  pi agent (1 session / project, cwd=project dir)  │  chokidar watch
        │                                     │ read/write project files ▲                    │
        └──────────────── shared truth: the project directory on disk ───┴────────────────────┘
                          videos/<project>/  ( index.html + compositions/ + assets/ )
```

The agent and the editor converge on the **filesystem**: the agent writes the
composition HTML; chokidar notices; the browser preview hot-reloads; the user
hand-tweaks in Studio; it saves back to the same files.

## Layout

```
app/
├─ package.json            workspace root (workspaces: daemon, web)
├─ LICENSE                 MIT (+ pointer to THIRD_PARTY_NOTICES)
├─ THIRD_PARTY_NOTICES.md  pi (MIT) + HyperFrames (Apache-2.0)
├─ daemon/                 local Node backend (HyperFrames API + pi agent)
└─ web/                    React SPA (home + chat + embedded Studio)
```

## Milestones

- **M0 — scaffold + license** ✅ (this commit): workspace, licensing, module skeletons.
- **M1 — embed pi**: daemon starts a pi session (`cwd`=project dir) + `POST /api/projects/:id/chat` streaming `session.subscribe` over SSE. Verify: chat makes the agent write HyperFrames HTML into the project dir. → capability ②
- **M2 — render + hot reload**: wire the studio-server API + preview iframe + `file-change` SSE. Verify the core loop: chat → generate → render → auto-refresh. → capabilities ②③⑤ (**first demoable build**)
- **M3 — project mgmt + editor**: CapCut-style home (create/list/thumbnail) + embed Studio `EditorShell`. → capabilities ①④
- **M4 — model config**: pi-ai multi-provider switcher UI.

## Getting started (M1 onward)

```
cd app && npm install     # pulls @hyperframes/* (0.7.94) + @earendil-works/pi-* (0.83.0)
```

Then build the daemon per `daemon/README.md`, starting with the pi session +
`/chat` SSE route.

### Open item for M2
`@hyperframes/studio-server` exposes `createStudioApi(adapter)` but not a runnable
server; the static-serve + `/api/events` + chokidar wiring lives in the
HyperFrames CLI. Decide in M2: reuse `@hyperframes/cli`'s server if exported, or
write our own thin adapter + server against `createStudioApi`.
