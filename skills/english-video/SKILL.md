---
name: english-video
description: Personal full publishing pipeline in English. Turn a topic, article, or finished script into a complete English release set — finished video, thumbnail covers, YouTube copy, X thread, LinkedIn post, blog article, and newsletter issue. Video production uses HyperFrames. Use when the user wants an English-language release, not just a video file.
---

You are the **orchestrator** of this pipeline. Input is a topic / article / draft script; output is a complete publishable release kit (see Delivery Checklist) — not an mp4. Everything you write is **English**, written for a native English-speaking tech audience.

**The video itself is delegated to HyperFrames — do not re-explain it here.** Entry point is `/hyperframes` (routes "article/topic → faceless explainer" to `/faceless-explainer` for staging, frames, and rendering). Any uncertainty about video generation → read `/hyperframes` first.

Visual content leads with motion, graphics, and diagrams, not static text. Prefer these HyperFrames skills:

- **`/hyperframes-animation`** — motion design and transitions.
- **`/hyperframes-creative`** — make frames look premium, not like slides: `references/video-composition.md` + `references/house-style.md`.

**This skill is one layer above that. Compared to a plain faceless run it adds exactly four things:**

1. **Design is chosen by the user** → `references/designs.md`.
2. **Narration gains a self-recorded option** — faceless defaults to TTS; here the user can also record their own voice (you proofread, segment, align, and re-time). Plus the English pronunciation ladder. → `references/narration.md` + `references/pronunciation.md`.
3. **English-first copy for every platform**, each with its own hard limits and algorithmic norms → `references/platform-copy.md`.
4. **Long-form companions** — blog article + newsletter issue → `references/blog-and-newsletter.md`.

Ask the ①② choices plus the platform set at the start, in one compact question.

## Delivery checklist (this skill's definition of "done")

- [ ] **Master video** — 4K master + 1080p, narration muxed (`renders/`)
- [ ] **Covers, five ratios** — 16:9 / 16:10 / 4:3 / 3:4 / 9:16 (`covers/`)
- [ ] **YouTube kit** — `youtube.md`: 3 title candidates, description, chapters, tags
- [ ] **X thread** — `x-thread.md`, hook + 5–9 posts, alt text on every image
- [ ] **LinkedIn post** — `linkedin.md`, plus a native-upload cut
- [ ] **Blog article** — `blog.md` with SEO frontmatter and a cover image
- [ ] **Newsletter issue** — `newsletter.md` with subject + preheader
- [ ] **Short-form cut** — one 9:16 clip ≤ 30s for Shorts / Reels / TikTok

## Workflow skeleton (each "how" lives in references)

One topic = one project directory (in the current working directory, named `<YYYYMMDD-slug>`).

- Step 0 · Fix the topic, ask the three choices (design / narration source / platform set) → `references/designs.md`
- Step 1 · Reuse planning artifacts if they exist (`BEATS.md`, `NARRATION.md`, `SCENES.md`, `STORYBOARD.md` from `$boring-video`); otherwise run that chain first
- Step 2 · Video — go through `/hyperframes` → `/faceless-explainer`; this skill only supplies English conventions → `references/video.md`
- Step 3 · Narration intake → `references/narration.md`
- Step 4 · Five-ratio covers → `references/covers.md`
- Step 5 · Platform copy → `references/platform-copy.md`
- Step 6 · Blog + newsletter → `references/blog-and-newsletter.md`
- Step 7 · Accept + render — check the delivery list item by item; 1080p first as the floor, then the 4K master
- Step 8 · Release ladder — publish order and cross-linking → `references/platform-copy.md`

## Non-negotiables

- **Every deliverable is English.** No Chinese残留 in titles, captions, covers, or copy.
- **Narration passes the pronunciation ladder before TTS runs** → `references/pronunciation.md`. Fixing the text is cheaper than fixing audio.
- **One keyword per release.** YouTube title, blog slug, and newsletter subject all point at the same search phrase.
- **Nothing ships that fails the 240px thumbnail test** or the caption line-length rule.
- **Platform claims are verified against the live limits** when a number matters (see the tables in `references/platform-copy.md`); do not copy a number from memory into copy that ships.

## Reference index

| To do… | Read |
|---|---|
| Pick a design / preset list | `references/designs.md` |
| Build frames, re-time, render | `references/video.md` |
| Narration (TTS / self-record + align + re-time) | `references/narration.md` |
| English heteronyms, acronyms, number reading | `references/pronunciation.md` |
| Five-ratio covers + safe zones | `references/covers.md` |
| YouTube / X / LinkedIn copy + release order | `references/platform-copy.md` |
| Blog + newsletter | `references/blog-and-newsletter.md` |
