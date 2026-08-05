# Third-party notices

This file records third-party notices for code, packages, or substantial
implementation portions incorporated into, adapted by, or prominently embedded
in Boring Video Studio — beyond routine package-manager dependency metadata
(routine dependencies carry their own license inside `node_modules`).

---

## Pi (`@earendil-works/pi-*`)

Boring Video Studio embeds Pi as its agent runtime — `@earendil-works/pi-coding-agent`
(in-process agent loop) and `@earendil-works/pi-ai` (unified multi-provider LLM API).

- Upstream: https://github.com/earendil-works/pi
- Package family: `@earendil-works/pi-*`
- License: MIT
- Copyright: Copyright (c) 2025 Mario Zechner

```
MIT License

Copyright (c) 2025 Mario Zechner

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## HyperFrames (`@hyperframes/*`)

Boring Video Studio embeds the HyperFrames Studio editor (`@hyperframes/studio`)
and its backend/runtime packages (`@hyperframes/studio-server`, `@hyperframes/core`,
`@hyperframes/player`, `@hyperframes/engine`, `@hyperframes/producer`) as the
video composition editing, preview, and render surface.

- Upstream: https://github.com/heygen-com/hyperframes
- Package family: `@hyperframes/*`
- License: Apache-2.0 (full text: https://www.apache.org/licenses/LICENSE-2.0)
- Copyright: Copyright (c) HeyGen and the HyperFrames contributors

Apache-2.0 obligations we honor: the license text and any upstream `NOTICE`
travel with these packages inside `node_modules` when distributed; any file we
copy from or adapt (rather than depend on) will carry a "modified from
@hyperframes/…" note and its attribution will be added to this section.

> TODO (before first distribution): if the app is bundled/packaged (e.g. an
> Electron build), verify the Apache-2.0 LICENSE + NOTICE for the `@hyperframes/*`
> packages are included in the distributed artifact.
