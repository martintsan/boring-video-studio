# Narration (English)

Narration audio comes from HyperFrames' native options, ListenHub TTS, or the user's own recording. Options below.

## English voice targets (apply before anything else)

- **Pace:** 140–160 words per minute for a tech explainer. Budget: an 8-minute video ≈ 1,150–1,250 words. Count the words in the draft and reconcile against target duration before recording — this is the fastest way to catch an over-long script.
- **Sentence length:** aim ≤ 20 words per sentence; hard ceiling 28. Above that, split.
- **Readability:** target Flesch-Kincaid grade 7–9. Technical terms are welcome, but each one is glossed at first use in one plain clause.
- **Tense and voice:** present tense, active voice, second person ("you run…", not "one might execute…").
- **Contractions are required** (`it's`, `don't`, `we'll`) — their absence makes TTS and read-aloud copy sound stilted.
- **One idea per sentence.** The narration carries meaning the picture cannot; the picture carries structure, comparison, and transformation.

## Self-recorded by the user

Give the user the script for review, then let them record and hand back the audio file. Tell them that also providing an SRT subtitle file improves audio-timeline alignment quality.

If only audio exists: run ASR to produce the SRT, then proofread that transcript **word-for-word against the script** — English ASR's failure mode is homophones (`their/there`, `two/to/too`, `effect/affect`, `compliment/complement`), and it will silently produce a grammatical wrong word.

## ListenHub TTS synthesis

See `references/pronunciation.md` first — English has its own heteronym and dot-file problems and they must be fixed in text **before** synthesis.

Then use the ListenHub scripts with the `en` language flag:

```bash
# 1) list English voices, pick a speakerId
LISTENHUB_API_KEY=...  scripts/listenhub-speakers.sh en --json \
  | python3 -c 'import json,sys; [print(i["name"],i["speakerId"]) for i in json.load(sys.stdin)["data"]["items"]]'

# 2) synthesize audio + subtitles
LISTENHUB_API_KEY=...  scripts/listenhub-tts.sh narration.txt out/ <speakerId>
# → out/narration-full.mp3 + out/narration.srt (raw, uncorrected)
```

Cloned voices appear in the same list with `speakerId` starting `voice-clone-`. Scripts live in the `verysmallwoods-video` skill's `references/listenhub-tts/scripts/` and take the language as an argument.

## Re-time to real cues (required once real audio exists)

1. Take the real `narration-full.mp3` + corrected SRT as the truth timeline.
2. Map each frame's internal disclosure moments (per-word reveals, counters, chart growth) onto the real cue times.
3. Where the animation would finish early, stretch its tail or delay the reveal — never let the frame freeze while narration continues.
4. Where narration arrives before the animation, delay the audio start of that segment or reorder the reveal.
5. Re-run `check` after re-timing; the duration contract must still hold.

## Deliver

Hand the master audio + **corrected** SRT into the render flow (segment → sync durations → re-time → mux → render). The corrected SRT is also the artifact reused for YouTube chapters and the blog transcript — keep it clean once, reuse everywhere.
