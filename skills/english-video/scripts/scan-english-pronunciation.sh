#!/usr/bin/env bash
# scan-english-pronunciation.sh — flag high-risk English TTS tokens in a narration file
# BEFORE synthesizing. English analogue of the CJK heteronym scanner.
#
#   scan-english-pronunciation.sh <narration.txt>
#
# Marks each non-empty line:
#   ⚠ REVIEW  — contains a bare homograph or a hard-to-speak token (dot-file, raw URL,
#               version string, bare slash-compound, a/an-before-vowel-sound)
#   ✓         — contains a known-safe compound of a risk word, nothing else flagged
#   (blank)   — nothing flagged
#
# Judgment stays with the agent: the same word reads differently by context
# ("live demo" = /laɪv/, "live in a container" = /lɪv/). This finds candidates,
# it does not decide. Fix ladder: ① expand to an unambiguous phrase →
# ② rephrase → ③ single-sentence audio splice if it already shipped.
set -euo pipefail

txt="${1:?usage: scan-english-pronunciation.sh <narration.txt>}"
[ -f "$txt" ] || { echo "✗ no such file: $txt"; exit 1; }
command -v python3 >/dev/null || { echo "need python3" >&2; exit 1; }

python3 - "$txt" <<'PY'
import re, sys

txt = sys.argv[1]
lines = open(txt, encoding="utf-8").read().splitlines()

# Homographs whose reading depends on a context word. bare = risky, safe = adjacent
# pattern that disambiguates (so don't nag about it).
HOMOGRAPH = {
    "read":     [r"\b(re-?read|re-read|reads back|misread)\b", r"\bwill read\b", r"\bre-reads\b"],
    "live":     [r"\blive (demo|stream|coding|session|server)\b", r"\blive-\w+"],
    "led":      [r"\bled to\b", r"\bleads to\b"],
    "present":  [r"\bpresent the\b", r"\ba present\b", r"\bpresent day\b"],
    "record":   [r"\brecord(ing)?s? (the|a|this)\b", r"\bthe record\b"],
    "content":  [r"\bcontent (of|is|marketing|type)\b", r"\bcontents\b"],
    "invalid":  [r"\binvalid(in)?\b"],
    "aggregate":[r"\baggregat(e|ed|ion)\b"],
    "database": [r"\bdatabase\b"],
    "schema":   [r"\bschema(s)?\b"],
    "cache":    [r"\bcache(s|d)?\b"],
    "SQL":      [r"\bSQL\b"],
    "minute":   [r"\bminute\b"],
}

# Hard tokens: always worth a look.
HARD = {
    "dot-file name":        r"\b\w+\.(md|json|ya?ml|py|js|ts|tsx|toml|sh|txt|mp4|mp3|srt|html|csv|sql|lock)\b",
    "raw URL":              r"(https?://|www\.)\S+",
    "version string":       r"\bv\d+(\.\d+)+\b",
    "version w/o v":        r"\b\d+\.\d+\.\d+\b",
    "multiplier / ratio":   r"\b\d+(x|×|:)\d*\b",
    "unit w/ number":       r"\b\d+(ms|s|kb|mb|gb|k|m|b)\b",
    "slash compound":       r"\b\w+/\w+\b",
    "approx / math":        r"(~|≈|≤|≥|\+/-)\s?\d",
    "bare percent sign":    r"\b\d+%",
}

# a/an before an initialism that starts with a vowel *sound* (an MVP, an HTTPS call)
ARTICLE = r"\ba\s+(M[A-Z]{1,}|H[A-Z]{2,}|F[A-Z]+|X[A-Z]+|S[A-Z]{2,})\b"

review = safe = clean = 0
for i, ln in enumerate(lines, 1):
    if not ln.strip():
        continue
    hits = []
    has_safe_context = False

    for word, safes in HOMOGRAPH.items():
        if re.search(rf"\b{re.escape(word)}\b", ln, re.IGNORECASE):
            if any(re.search(p, ln, re.IGNORECASE) for p in safes):
                has_safe_context = True
            else:
                hits.append(f"homograph `{word}` (bare)")

    for label, pat in HARD.items():
        m = re.search(pat, ln, re.IGNORECASE)
        if m:
            hits.append(f"{label} `{m.group(0)[:24]}`")

    if re.search(ARTICLE, ln, re.IGNORECASE):
        hits.append("article before initialism (a vs an — read the sound)")

    if hits:
        review += 1
        print(f"⚠ REVIEW  L{i}: {'; '.join(hits)}")
        print(f"          {ln.strip()[:120]}")
    elif has_safe_context:
        safe += 1
        print(f"✓         L{i}: risk word sits in a known-safe compound")
    else:
        clean += 1

total = review + safe + clean
print(f"\n{review} line(s) to review · {safe} safe-context · {clean} clean · {total} checked")
if review == 0:
    print("No high-risk tokens. Still do one listening pass before the master render.")
PY
