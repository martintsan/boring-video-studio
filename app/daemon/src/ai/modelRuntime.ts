import { ModelRuntime } from "@earendil-works/pi-coding-agent";
import { apiKeyFor, PROVIDERS } from "../config/providers.js";
import { getSelection } from "./selection.js";

// One shared ModelRuntime for the process. pi-ai ships every provider's base URL
// and model catalog; we just inject the API keys the user configured (via env)
// for the providers we surface. The active provider/model is selectable.
let runtimePromise: Promise<ModelRuntime> | null = null;

export function getModelRuntime(): Promise<ModelRuntime> {
  if (!runtimePromise) {
    runtimePromise = (async () => {
      const runtime = await ModelRuntime.create();
      for (const provider of PROVIDERS) {
        const key = apiKeyFor(provider);
        if (key) await runtime.setRuntimeApiKey(provider.id, key);
      }
      return runtime;
    })();
  }
  return runtimePromise;
}

// Providers the user has actually configured a key for.
export function configuredProviders(): string[] {
  return PROVIDERS.filter((p) => apiKeyFor(p) !== undefined).map((p) => p.id);
}

// Resolve the model to run: BVS_PROVIDER + BVS_MODEL if set, else the first
// configured provider's first model, else any available model.
export function resolveModel(runtime: ModelRuntime) {
  const selection = getSelection();
  const provider = selection.provider ?? configuredProviders()[0] ?? "anthropic";
  const modelId = selection.model;

  if (modelId) {
    const picked = runtime.getModel(provider, modelId);
    if (picked) return picked;
  }

  const inProvider = runtime.getModels(provider);
  if (inProvider.length > 0) return inProvider[0];

  const anyModel = runtime.getModels();
  if (anyModel.length === 0) {
    throw new Error(
      "No models available. Configure a provider API key (see daemon/src/config/providers.ts).",
    );
  }
  return anyModel[0];
}
