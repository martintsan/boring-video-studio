# Covers · five-ratio HTML posters

Covers reuse the HyperFrames design chosen for the video. One HTML template set covers all five ratios; if a previous episode's cover HTML exists on hand, reuse it as the base — otherwise write a new one.

## Design rules

1. **Five ratios**: 16:9 / 16:10 / 4:3 / 3:4 / 9:16.
2. Title and graphic elements centered.
3. Brand / logo involved → get the asset with the logo tool or skill; never redraw it.

## English thumbnail rules (these bite harder in English than in CJK)

- **≤ 5 words on the thumbnail.** CJK packs meaning into 4 glyphs; English needs 2–3× the width for the same idea. Long thumbnail text is the single most common English-thumbnail failure.
- **Never break a phrase across two thumbnail lines.** `Zero-config / deployment across machines` reads broken. Break at a clause boundary or cut a word.
- **Word length matters**: prefer one-syllable words. `Ship it in seconds` renders far bigger than `Deploy your infrastructure immediately` at the same pixel budget.
- **ALL CAPS is not automatically better.** Caps are for ≤ 3 words. Beyond that, caps reduce reading speed and force smaller type. For 4–5 words use Title Case with heavy weight.
- **Tracking:** caps need `+0.06em`–`+0.12em` or they collide; sentence/title case stays at `0` or slightly negative.
- **Drop articles and filler** — `a`, `the`, `is`, `how to` are pixels you cannot read at 240px. `How to Ship Fast` → `SHIP FASTER`.
- **Homophone/ambiguity check**: a thumbnail is read silently in 0.5s. If a word can be misread (`read`, `lead`, `live`), pick a different word — there is no audio to disambiguate.

## Safe zones (verify per platform before shipping)

- **YouTube 16:9**: the duration badge sits **bottom-right** — keep that corner clear of text.
- **9:16 (Shorts / Reels / TikTok)**: the bottom ~20% and the right rail carry UI overlays (caption, like/share column). Keep the title in the vertical middle band.
- **3:4 / 4:3**: cropping risk on grid surfaces — keep all text inside the central 80%.

## The 240px test (non-negotiable)

Every cover must pass before it ships:

1. Downscale the 16:9 cover to **240px wide** (feed thumbnail size) and to **120px** (dense grid / mobile).
2. Look at the downscaled image. If the title is not readable in under one second, **the cover fails** — fix by shortening the text, not by bumping weight.
3. Also check the **1:1 center crop** (grid surfaces on several platforms crop square). Nothing important may live in the cropped margin.

> Produce these evidence images every time and actually look at them. A script can verify ratio and pixel dimensions; it cannot verify "the title still reads at 240px" — that is a human/agent visual judgment.

## Output

`covers/` with all five ratios, named by ratio, plus the downscaled evidence images for review.
