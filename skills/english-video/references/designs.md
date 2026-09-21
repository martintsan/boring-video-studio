# Pick a design · HyperFrames preset catalog

The look of the video is set by one **frame preset** — a whole set of palette, type, and layout. The user picks from the list below (default: `blockframe`).

> **Show the whole table below to the user for selection.**

Source — https://www.hyperframes.dev/design

## Catalog (slug + one-line style)

| slug | style |
|---|---|
| **blockframe** (default) | Neo-brutalist: heavy black borders + hard shadows + candy color clashes. Poster energy, high click rate |
| biennale-yellow | Warm parchment + sun yellow, Instrument Serif, indigo ink, 1px hairlines |
| blue-professional | Corporate parchment + cobalt primary, Space Grotesk + Inter. Steady, professional |
| bold-poster | Shrikhand slanted display + red dot on cream. Magazine-cover energy |
| broadside | Industrial newsprint poster: cream / ink black, Barlow, fire-orange accents |
| capsule | Capsule editorial: cream paper + candy colors, Bodoni Moda serif titles |
| cartesian | Minimal whitespace: warm parchment, ink display face, grey-tan accents, hairlines |
| cobalt-grid | Editorial parchment + cobalt grid, Newsreader + Hanken Grotesk |
| code-editorial | Warm paper + coral accent + JetBrains Mono code face, EB Garamond. Technical-essay feel |
| coral | Bebas Neue caps + coral on cream |
| creative-mode | Cream + saturated candy, Archivo Black + JetBrains Mono |
| daisy-days | Sunny garden pastels, 3px charcoal stroke, hard shadows, Fredoka + Quicksand |
| editorial-forest | Green/pink/cream editorial triad, Source Serif 4 + JetBrains Mono, hairlines |

> The official list changes; the live site is authoritative.

## English typography constraints (override the preset where they conflict)

Every preset above is Latin-script native, so nothing is disqualified — but English text behaves differently from CJK and the constraints are hard:

1. **Line length 45–75 characters** for body copy. CJK is comfortable at 20–25 glyphs; the same physical column is too short for English and creates rivers.
2. **Never hyphenate on purpose.** Do not hand-insert hyphens to balance a line; a broken word mid-line reads as an error on screen.
3. **Tracking goes negative at display sizes, never at body sizes.** Big English headings want tightening (`-0.02em` to `-0.04em`); body copy stays at `0`. Uppercase labels need `+0.08em` or more or they clamp together.
4. **Count words, not glyphs, when sizing.** A 6-word English title occupies far more width than a 6-character Chinese one. If a title will not fit at the intended size, shorten it — do not shrink the type.
5. **Widows and orphans are visible failures.** A single short word alone on a final line (`the`, `a`, `is`) must be fixed by rewriting, `text-wrap: balance`, or an `&nbsp;` glue between the last two words.
6. **Choose one case convention and hold it**: Title Case for display, sentence case for body, ALL CAPS only for small labels and chrome. Mixing them reads as amateur.
7. **Fonts must cover the glyphs used.** Emoji, arrows (`→`), and math symbols (`≤`, `×`) are not present in every Latin face; verify the glyph renders rather than showing tofu.

## Local presets

The sibling skill `verysmallwoods-video` ships three local presets (`swiss-minimalism`, `raycast-dark`, `claude-warm`) on the same `FRAME.md` contract. All three are Latin-native and safe for English; use them with `--preset-dir` pointed at that directory.
