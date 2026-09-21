# Video · delegated to HyperFrames

## Rule 0 · A video is not a slide deck (highest priority, read this first)

What separates a video from a deck is **motion and graphics**, not the same text in a bigger font. So when staging:

- **Content moves first** — anything expressible as a chart/data animation, diagram, SVG draw, counter, or kinetic type must move. Static text only for a line that genuinely lands as a still.
- **Every frame is alive** — each scene has at least one sustained or focal action (arc drawing, scan line, bars growing, digits ticking, decorative drift/breath). Decorations may never sit frozen.
- **Real transitions between scenes** — outgoing + incoming animate together (wipe / push / blur dissolve). A hard cut is a slide advance.
- **Layers** — background (giant ghost type / texture / grid / glow) → midground (information) → foreground (rules, registration marks, metadata). Never "a centered paragraph plus whitespace".

**Therefore these two skills are mandatory and outrank every default pattern:**

- **`/hyperframes-animation`** — all motion knowledge lives here: atomic animations, multi-stage scene blueprints, **scene transitions** (`transitions/`), frame techniques (`techniques.md`: SVG draw, clip-path reveal, counters, chart growth, per-word kinetic type), easing/stagger and spring easing (`adapters/gsap-easing-and-stagger.md`). Any "how does it move" question starts here.
- **`/hyperframes-creative`** — non-motion design direction so frames read premium, not slideshow: `references/video-composition.md` (video is not a webpage: scale, layering, ghost type, texture, fill the frame, dual focus) + `references/house-style.md` (avoid AI-flavored clichés — gradient text, left border bars, identical card grids, pure-black-centered layouts; tint neutrals with the primary).

(Technical contract stays in `/hyperframes-core`, command flow in `/hyperframes-cli`; the two above decide whether it looks good and moves enough — read before acting.)

---

Production runs through HyperFrames — **do not re-explain it here.** The `/hyperframes` entry routes "article / topic → faceless explainer" to `/faceless-explainer`, which does everything: brief, design selection and `frame.md`, STORYBOARD, frame-by-frame `compositions/frames/`, `index.html` assembly, transitions, lint/check, render. Steps, gates, and scripts live in `/faceless-explainer` and the domain skills (`/hyperframes-core`, `/hyperframes-animation`, `/hyperframes-creative`, `/hyperframes-cli`, `/media-use`) — read them, don't copy them.

This skill adds the English-specific user conventions faceless does not have:

- **STORYBOARD must be created** — every episode writes `STORYBOARD.md`, even with a single scene. Format: `/hyperframes-core` → `references/storyboard-format.md`.
- **Design** — use the preset chosen in Step 0 (default `blockframe`), see `references/designs.md`.
- **Script** — written to the user's English voice conventions (from context / memory / a style skill), constrained by `references/narration.md`.
- **Narration** — see `references/narration.md` (self-recorded or TTS, user's choice).
- **Re-time to real cues** — once real audio + SRT exist, re-lay each frame's internal reveals onto the real cue timeline. Otherwise the animation finishes and freezes while narration keeps talking over a still image. Method in `references/narration.md`.
- **Preview** — after `check` passes and before rendering, **explicitly ask the user whether they want a Studio preview**. If yes, read the HyperFrames comments file after their feedback and act on it in full.
- **Subtitles are not burned into the master** — the user uses platform captions on YouTube; leave the bottom caption safe zone clear.
- **Frame rate** — decide intelligently from the motion spec, tell the user, and allow an override. Report: chosen fps, the reasoning, and how other frame rates would change the output. An explicit user fps always wins.
- **Render** — 1080p{fps} high first as the floor, then the 4K master if disk allows (`--resolution landscape-4k --fps {fps}`). `{fps}` is the value decided above.

## English-specific staging rules

- **Text is longer than you think.** An English sentence occupies ~2–2.5× the width of its Chinese equivalent. Design type blocks from a word count, not a character count, and keep a short-line budget per frame (≤ 12 words on screen at once for a narrated beat).
- **Never break a phrase across a visual line break.** "zero-config / deployment" mid-phrase reads worse than the same break in CJK. Break at clause boundaries.
- **Numbers and units render literally** — check that `1.2M`, `$4.99`, `3×`, `ms` didn't get mangled by a font fallback or a locale-formatted separator.
- **Avoid idioms on screen.** "A picture is worth a thousand words" as a display line is fine; puns and culturally loaded references do not survive the caption layer or a non-native audience. Prefer plain, concrete phrasing in on-screen text and let the narration carry any color.
