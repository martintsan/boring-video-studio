# Voice branch

Read this reference when `/to-video` reaches its Voice step.

## User recording

Accept the audio and SRT. Correct terminology, names, and recognition errors while preserving timestamps. If the spoken wording differs materially from locked `NARRATION.md`, update the locked text to the recording before retiming.

## TTS

Use `/media-use` to resolve voice capability and the selected TTS skill to synthesize locked narration. Preserve pronunciation decisions with the project.

## Temporal truth

Persist the resolved branch under `audio/`:

- `narration-full.<ext>`: locked full voice;
- `narration.srt`: corrected distributable cues;
- `audio_meta.json`: the owning HyperFrames workflow's current timing schema;
- per-scene or per-frame voice files when that workflow's production loop requires them.

Real audio and cue timings override estimates. Cut or mount voice according to the selected HyperFrames production loop, align shot actions and focus changes to their narration anchors, and keep the distributable SRT separate when subtitles are not burned into the video.

This reference chooses and reconciles voice. Animatic, narration lock, retiming, build, and verification remain owned by `/to-video`.
