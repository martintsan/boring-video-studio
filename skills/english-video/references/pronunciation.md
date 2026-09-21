# English pronunciation · fix the text BEFORE synthesis

TTS gets English wrong in predictable places, and — same as CJK — **you cannot verify pronunciation from the transcript afterwards**. ASR writes back the same spelled word whether it heard `LIVE` or `LIVE`. So prevention in text is the whole game, and it is cheaper than fixing audio.

Run the scanner before synthesizing:

```bash
scripts/scan-english-pronunciation.sh narration.txt
```

It marks lines `⚠ REVIEW` (bare homograph / hard token) or `✓` (inside a known-safe compound). **Judgment stays with you** — the same word can go either way in different contexts.

## Fix ladder (same shape as the CJK pipeline)

1. **Expand to an unambiguous phrase** (preferred): `read` → `are reading`; `live` → `running live` / `live-streamed`.
2. **Rephrase around it** when expansion still reads wrong: `the lead` → `the main thing you install`.
3. **Slipped into the final?** → regenerate that single sentence and splice the audio track.

Change `narration.txt` and **both audio and subtitles benefit** (the speech path generates subtitles from the input text, so there is nothing else to patch).

## Homograph risk list (AI / software speaking domain — add new traps as you hit them)

| Word | The two readings | Trigger → what to write instead |
|---|---|---|
| read | present `riːd` / past `rɛd` | Any bare `read` is ambiguous. → `you read` is fine when tense is clear from the clause; `I read it yesterday` → `I already read it` often still fails → safest: `I went back to it` or restructure to present tense |
| live | `laɪv` (adj/adv) / `lɪv` (verb) | `live demo` = `laɪv`; `live in a container` = `lɪv`. Never write bare `live` without the noun/verb next to it |
| lead | `liːd` (metal / to guide) | `leads` (noun) vs `led` (past) — write `led` for past tense explicitly; do not write `lead` for past |
| present | adj/noun `ˈprɛzənt` / verb `prɪˈzɛnt` | `a present problem` vs `present the result` — stress flips; ok in context, flag bare uses |
| record | noun `ˈrɛkərd` / verb `rɪˈkɔːrd` | `the record shows` vs `record the output` — stress flips; prefer `the log shows` / `capture the output` |
| content | noun `ˈkɑːntɛnt` / adj `kənˈtɛnt` | Always qualify: `the content of the file` |
| minute | adj `maɪˈnjuːt` / noun `ˈmɪnɪt` | `a minute detail` vs `wait a minute` — avoid the adj, write `a tiny detail` |
| aggregate | noun `ˈæɡrɪɡət` / verb `ˈæɡrɪɡeɪt` | Prefer `combined`, `rolled up` |
| address | `əˈdrɛs` (US) / `ˈædrɛs` | Prefer `URL` when you mean a web address |
| database | stress drift | Fine, but `data base` (two words) breaks it — always one word |
| schema | `ˈskiːmə` | Often misread `ski-MA`. If the engine gets it wrong, write `skeema` in the TTS input only, and keep `schema` in the subtitles/screen |
| cache | `kæʃ` (US, = "cash") / `kæʃ` vs `keɪʃ` | If the voice says `kay-sh`, write `cash` in the TTS input, keep `cache` in subtitles |
| GUI | often spelled out letter-by-letter | Write `the interface` |
| SQL | `ɛs kjuː ɛl` vs `siːkwəl` | Pick one and write it out for the TTS path: `S-Q-L` forces the letter reading |

## `a` vs `an` before initialisms

The choice follows the **sound**, not the letter. Write it out wrong and TTS reads it wrong out loud.

- `an MVP`, `an HTTPS request`, `an F1 score`, `an API`, `an X thread` — the letter name starts on a vowel sound (`em`, `aitch`, `ef`, `ay`), so `an`.
- `a URL`, `a UI kit`, `a YAML file` — `yoo`-initial sound takes `a`.
- Spelled-out words take the article normally: `a database`, `an operator`.

The scanner flags bare `a <ALLCAPS>` for a human call, because it cannot hear the sound. When in doubt, say the acronym out loud first.

## Hard tokens that break TTS (verified pattern from the CJK pipeline, applies identically here)

- **Dot-file names**: `DESIGN.md` gets mangled into one unclear sound. Write the TTS input as `design dot M-D`, then **text-replace back** in the SRT (`design dot m d` → `DESIGN.md`) and write `DESIGN.md` directly on the on-screen card. Sound correct, subtitle clean, picture correct.
- **Version strings**: `v2.14` → write `version two point fourteen`. `gpt-5.5` → `GPT five point five`.
- **Ranges and ratios**: `3x` → `three times`; `10:1` → `ten to one`; `~50ms` → `about fifty milliseconds`.
- **URLs and handles**: never paste a raw URL into narration. Say the human name (`the HyperFrames docs`), put the URL in subtitles and description only.
- **Em-dashes and semicolons**: fine for a human reader, but some engines pause wrongly. If a line scans oddly in the audio, replace `—` with a comma or split the sentence.
- **Slash compounds**: `and/or`, `config/deploy` — say the two words: `configure and deploy`.
- **Acronyms never seen before**: expand on first mention in narration (`Model Context Protocol, MCP`), then use the short form.

## Timing note

English TTS runs **~10% slower than a native speaker's read-aloud estimate** at default rate. Measure the synthesized duration against the script word count; if it overshoots the target, cut words rather than speeding up the engine (speeded-up English picks up a cartoon cadence).

## Honest limitation

Pronunciation cannot be auto-verified (ASR transcribes the same spelling either way). This whole file is **prevention, not proof**. The remaining risk is covered by a listening pass plus single-sentence splicing. **Do not rewrite every homograph — only the ones the engine actually gets wrong**, or the script becomes unnatural.
