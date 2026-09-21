# Blog + newsletter

Companion long-form pieces, both in English. These are the surfaces that get indexed and keep paying off after the social spike.

## Blog (`blog.md`)

### Voice and structure

Written in the user's preferred English writing style (from context / memory / a style skill), not transcribed from the video. Reuse the narration's argument skeleton, but the prose is written for reading: longer sentences allowed, paragraphs 2–5 sentences, headings do the navigation.

Structure that works for a technical explainer:

1. **Cold open** — the result or the tension, ≤ 3 paragraphs, no throat-clearing.
2. **What this solves** — the reader's problem stated in their words.
3. **How it works** — the mechanism, with code/diagram callouts where the video had them.
4. **What went wrong** — the honest part; this is what makes a technical post trustworthy.
5. **Takeaways** — 3–5 bullets, each actionable standalone.
6. **Links** — video, repo, docs, related posts.

### Frontmatter

```yaml
---
title: "…"              # hook + keyword, ≤ 60 chars so it doesn't truncate in search
date: "YYYY-MM-DD"
excerpt: "…"            # ≤ 160 chars — this becomes the meta description
tags: [...]             # canonical tags (Context Engineering / Claude Code / Agent Skills / AI coding)
lang: "en"
cover: "blog-images/blog-cover.png"
canonical_url: "…"      # set if this is the canonical version
---
```

### English SEO constraints

- **One `<h1>`, in the title only.** Sections are `h2`, subsections `h3`. Do not skip levels.
- **Keyword appears in**: title, first 100 words, one `h2`, and the slug. Not more — keyword stuffing reads bad and ranks worse.
- **Slug**: short, hyphenated, keyword-first: `/hyperframes-faceless-explainer`, not `/2026-07-31-post-7-final-v2`.
- **Anchor text is descriptive.** `the storyboard format reference`, not `click here` / `link`.
- **Code blocks are fenced with a language tag.** Verify long lines don't break the layout; wrap at ~80 chars in the source.
- **Every image has alt text** describing what it shows, not "screenshot".
- **Reading time**: keep the post 1,200–2,500 words. Longer than that and the drop-off kills it unless it is genuinely reference material.

### Images = video stills

Generate a cover image for the post plus 2–4 in-body stills from the video, saved under `blog-images/`. Still selection rule: pick frames that are **legible as a static image** (a mid-transition frame is useless). Give each a caption line.

## Newsletter (`newsletter.md`)

The newsletter is a different job from the blog: it is a **personal note that links out**, not a republication.

### Format

```
Subject: «≤ 45 characters, one specific thing, no clickbait»
Preview: «≤ 90 characters — the second hook, shown after the subject in most clients»

«Personal opening: what this episode actually taught you, 2–3 sentences, first person»

«The one idea worth the reader's time, in plain prose»

→ Watch: «video link»
→ Read in full: «blog link»

«Sign-off»
```

### Rules

- **Subject line ≤ 45 characters** so it doesn't truncate on mobile clients. Test the subject alone: if it does not create curiosity on its own, rewrite.
- **Preview text is not optional.** Most clients show it; leaving it to auto-generate picks a random fragment.
- **Length 150–300 words.** If the newsletter is as long as the blog, the blog loses its reason to exist.
- **Two links max** (video + blog), clearly separated.
- **Personal register** — this is the one surface where first-person asides and in-jokes with the audience belong. The blog and platform copy stay neutral-professional.

## Consistency check across the whole release

Before shipping, verify all seven surfaces agree:

| Surface | Must match |
|---|---|
| YouTube title | Same core claim as blog title |
| Cover text | Not verbatim the YouTube title, but same promise |
| X hook | Same claim, different wording |
| LinkedIn hook | Same claim, professional register |
| Blog excerpt | Same keyword phrase as the YouTube title |
| Newsletter subject | Same single idea, personal voice |

One keyword phrase, one claim, seven phrasings. If two surfaces contradict each other, the release reads confused.
