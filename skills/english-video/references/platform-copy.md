# Platform copy · YouTube + X + LinkedIn

All copy is English. Section order is fixed, content is per-episode, written in the user's preferred voice.

> **Character limits below were verified against current platform docs (July 2026). They drift; when a number actually matters, re-check it rather than trusting this file or memory.**

## `youtube.md`

Hard limits: **title 100 characters**, **description 5,000 characters**, **tags 500 characters total** (not per tag). Search results and "up next" truncate the title around **60 characters**, and Google shows roughly the first **157 characters** of the description.

```
## Title candidates (3)
«3 options, each ≤ 100 chars, ≤ 60 chars before the keyword is lost»
Front-load the target keyword + the most clickable concrete detail.
Series framing allowed: "…#7", "Episode 7: …"

## Description
«Channel membership block»
«Personal info block»     ← newsletter / X / YouTube / email etc.
«Opening paragraph — first 157 characters are the Google snippet, write it as ad copy»
«Links»                  ← source article, previous episode, repos, playlist
⏱ Chapters
0:00 «Cold open»
m:ss «Section»
```

### Chapter rules (these are mechanical, not stylistic)

- First chapter **must be `0:00`** or chapters will not render.
- **At least 3 chapters**, in ascending order.
- **Each chapter ≥ 10 seconds.**
- One timestamp per line, `m:ss` or `h:mm:ss`, label on the same line.
- Manual chapters override YouTube's automatic ones.
- Derive times from the real SRT, then **align labels to what is actually on screen** at that moment — draft the labels against the final cut, not against the script.

### Tags

500 characters total. 10–15 specific tags beat 30 generic ones. Include: the primary keyword phrase, 2–3 secondary phrases, the series name, and the specific tool/library names spelled correctly (`HyperFrames`, `Claude Code`, `Agent Skills`).

### Also decide

- **Altered / synthetic content disclosure** — required if any synthetic media appears that could seem real.
- **Thumbnail text** must not duplicate the title verbatim; it adds a second idea.

## `x-thread.md`

Hard limits: **280 characters per post** (free tier), each post in a thread counts separately. **Every URL costs exactly 23 characters** regardless of real length (t.co wrapping). **Each emoji costs 2 characters.** Media does not count.

Structure: hook + 5–9 posts + closing CTA.

```
1/ «Hook — a single claim or result, ≤ 200 chars. No link here.»
2/ «Why it matters / the problem being solved»
3/ «The key insight, compressed»
4/ «How it works — step 1»
5/ «How it works — step 2»
6/ «The surprising part / what broke»
7/ «Numbers or before-after»
8/ «Link to video + blog. One line.»
9/ «Follow CTA / series plug»
```

Rules:
- Post 1 carries the entire thread. If the hook is weak, nothing after it is read — cut the thread, not the hook.
- **Each post must read standalone** if someone hits it out of context (X surfaces individual posts).
- Put the link in a later post, never the first — first-post links suppress reach.
- **Alt text on every image.** Describe the image content, not "image". This is an accessibility requirement, not optional polish.
- Hashtags: 0–1. More reads as spam in this niche.
- Verify each post's length with a counter that models t.co and emoji weighting, not a naive `len()`.

## `linkedin.md`

Hard cap: **3,000 characters**. The number that decides reach is the **"see more" fold: ~210 characters on desktop, ~140 on mobile**. Performance data across large post samples shows the strongest engagement at **2,000–3,000 characters** and at **under 150 characters** — the 600–1,500 middle is the weakest band. So: commit to short or go long, never muddle.

```
«Hook — must land inside 140 characters so it survives mobile truncation»

«Line break early. One sentence per line for the first three lines.»

«Story or insight — 3 to 5 short paragraphs if going long»
«Concrete detail / what you learned / numbers»

«Takeaway, one line»

«Link in the first comment (LinkedIn suppresses external links in the body)»
```

Rules:
- **Front-load the claim before the fold.** Write to the 3,000 cap only if the idea earns the room.
- Line breaks every 1–2 sentences; no gray-text walls.
- Hashtags: 3 max, at the end (`#AI #DevTools #VideoProduction`). More suppresses reach.
- Native video upload performs better than a link — also deliver the **native cut** (vertical 9:16 or square 1:1, 30–90s) from the master.
- Do not paste the YouTube description unchanged. Different audience, different hook.

## Native cut spec (YouTube Shorts / Reels / TikTok / LinkedIn)

One 9:16 clip, **≤ 30s** (Shorts accepts up to 3 min; short wins). It must be self-contained: state the claim, show one visual proof, land the payoff. Do not clip a mid-sentence fragment from the master. Deliver with its own burned-in caption (unlike the master, short-form platforms are watched captioned and their auto-captions mangle technical terms).

## Release ladder (publish order that compounds)

1. **YouTube** — publish with final cover, chapters, tags. This is the canonical artifact.
2. **Blog** — publish with a canonical link back to the YouTube video embedded at top.
3. **X thread** — link the blog (not the raw video), attach 2–3 stills from the video.
4. **LinkedIn** — same day; native cut uploaded, link in first comment.
5. **Newsletter** — next scheduled send, referencing all of the above.

Every downstream surface points upstream to the canonical copy. Cross-links are added **once** and reused, so the copy set stays consistent — write `blog.md` last-ish or keep it in sync deliberately.
