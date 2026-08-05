// Runtime-selectable active provider/model. Defaults from env; the UI overrides
// it via POST /bvs/config. Applied to new and existing agent sessions.
let selection: { provider?: string; model?: string } = {
  provider: process.env.BVS_PROVIDER,
  model: process.env.BVS_MODEL,
};

export function getSelection(): { provider?: string; model?: string } {
  return { ...selection };
}

export function setSelection(next: { provider?: string; model?: string }): void {
  // Picking a provider without a model clears the model (falls back to first).
  selection = { provider: next.provider ?? selection.provider, model: next.model };
}
