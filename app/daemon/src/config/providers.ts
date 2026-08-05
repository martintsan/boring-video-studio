// Curated list of model providers surfaced in Boring Video Studio.
//
// pi-ai already ships each provider's base URL and full model catalog (1000+
// models), so we do NOT hard-code base URLs or model ids here — we only choose
// which providers to surface and which env var holds each provider's API key.
// The user picks one provider, sets its key, and optionally picks a model.
//
// `id` must match pi-ai's provider id (verified against @earendil-works/pi-ai
// builtin catalog). Add a provider by appending a row here.

export interface ProviderConfig {
  /** pi-ai provider id (e.g. "deepseek", "zai" for GLM, "moonshotai" for Kimi). */
  id: string;
  /** Human-facing name for the picker. */
  label: string;
  /** Env var names checked (in order) for this provider's API key. */
  apiKeyEnv: string[];
}

export const PROVIDERS: ProviderConfig[] = [
  { id: "anthropic", label: "Anthropic (Claude)", apiKeyEnv: ["ANTHROPIC_API_KEY"] },
  { id: "openai", label: "OpenAI (GPT)", apiKeyEnv: ["OPENAI_API_KEY"] },
  { id: "deepseek", label: "DeepSeek", apiKeyEnv: ["DEEPSEEK_API_KEY"] },
  { id: "zai", label: "Zhipu GLM (z.ai)", apiKeyEnv: ["ZAI_API_KEY", "Z_AI_API_KEY", "GLM_API_KEY"] },
  { id: "minimax", label: "MiniMax", apiKeyEnv: ["MINIMAX_API_KEY"] },
  { id: "minimax-cn", label: "MiniMax (CN)", apiKeyEnv: ["MINIMAX_CN_API_KEY", "MINIMAX_API_KEY"] },
  { id: "moonshotai", label: "Moonshot (Kimi)", apiKeyEnv: ["MOONSHOT_API_KEY", "KIMI_API_KEY"] },
  { id: "qwen-token-plan", label: "Qwen (Alibaba)", apiKeyEnv: ["QWEN_API_KEY", "DASHSCOPE_API_KEY"] },
  { id: "openrouter", label: "OpenRouter", apiKeyEnv: ["OPENROUTER_API_KEY"] },
  { id: "groq", label: "Groq", apiKeyEnv: ["GROQ_API_KEY"] },
  { id: "xai", label: "xAI (Grok)", apiKeyEnv: ["XAI_API_KEY"] },
  { id: "mistral", label: "Mistral", apiKeyEnv: ["MISTRAL_API_KEY"] },
  { id: "google", label: "Google (Gemini)", apiKeyEnv: ["GOOGLE_API_KEY", "GEMINI_API_KEY"] },
];

export function apiKeyFor(provider: ProviderConfig): string | undefined {
  for (const name of provider.apiKeyEnv) {
    const value = process.env[name];
    if (value && value.trim()) return value.trim();
  }
  return undefined;
}
