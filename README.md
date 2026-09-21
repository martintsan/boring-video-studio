# Boring Video Studio

Boring Video Studio is a collection of [Agent Skills](https://agentskills.io) for planning high-quality videos before production.

The main `boring-video` skill turns a topic, article, research bundle, or draft into four durable planning artifacts:

```text
BEATS.md → NARRATION.md → SCENES.md → STORYBOARD.md
```

It then hands the approved plan to [HyperFrames](https://www.hyperframes.dev), which owns video production, review, timing, animation, verification, and rendering. Optional [ListenHub](https://listenhub.ai) TTS support can provide narration audio and subtitles through the `listenhub-tts` skill.

The existing `verysmallwoods-video` skill remains available as the complete VerySmallWoods publishing workflow for videos, covers, platform copy, blog posts, and social posts.

The `english-video` skill is the English-language counterpart of that pipeline: the same full-release shape, retargeted at an English-speaking audience — finished video, five-ratio covers, YouTube kit, X thread, LinkedIn post, blog article, and newsletter issue, plus English-specific narration and thumbnail rules that CJK pipelines do not cover.

## Installation

Install `boring-video` and its planning stages:

```bash
npx skills add sugarforever/boring-video-studio \
  --skill boring-video to-spec-beats to-narration to-scenes to-storyboard to-video
```

Add `--global` to make the skills available across projects:

```bash
npx skills add sugarforever/boring-video-studio --global \
  --skill boring-video to-spec-beats to-narration to-scenes to-storyboard to-video
```

Video production requires HyperFrames and its local dependencies. Check the environment with:

```bash
npx hyperframes doctor
```

## Usage

Invoke `$boring-video` with a topic or source document:

```text
$boring-video Turn this article into a planned eight-minute faceless explainer.
```

The skill asks for any missing presentation, collaboration, voice, and design choices, then runs the planning chain:

1. `to-spec-beats` defines the argument and learning progression.
2. `to-narration` writes the spoken draft.
3. `to-scenes` designs visual events, worlds, action, and continuity.
4. `to-storyboard` translates the scenes into buildable shots.
5. `to-video` hands the complete plan and optional ListenHub narration to the appropriate HyperFrames workflow.

You can also invoke an individual stage when you already have its input:

```text
$to-scenes Redesign the visual direction for this narration.
```

```text
$to-storyboard Turn SCENES.md into a HyperFrames storyboard.
```

## English publishing pipeline

Install the English release pipeline on its own (this lives in the fork, not upstream yet):

```bash
npx skills add martintsan/boring-video-studio --global --skill english-video
```

Invoke it with a topic or a finished English script:

```text
$english-video Turn this post into a full English release: video, covers, YouTube, X, LinkedIn, blog, newsletter.
```

It asks for the design preset, the narration source (TTS or self-recorded), and the platform set, then runs to the delivery checklist: master render, five-ratio covers, `youtube.md`, `x-thread.md`, `linkedin.md`, `blog.md`, `newsletter.md`, and a 9:16 short-form cut.

What it adds over a plain faceless run:

- **English voice targets** — 140–160 wpm, Flesch-Kincaid grade 7–9, contractions required, one idea per sentence.
- **A pronunciation pass before synthesis** — `scripts/scan-english-pronunciation.sh` flags homographs (`read`, `live`, `record`), dot-file names, version strings, and `a`/`an` mistakes while they are still free to fix.
- **English thumbnail discipline** — five-word ceiling, no phrase broken across lines, and a mandatory 240px legibility test.
- **Per-platform hard limits** — verified YouTube title/description/chapter rules, X's 23-character URL cost, LinkedIn's ~140-character mobile fold.

It reuses the `boring-video` planning artifacts when they exist, so `$boring-video` → `$english-video` is the full plan-to-release path.
