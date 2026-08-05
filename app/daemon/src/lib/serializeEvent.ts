import type { AgentSessionEvent } from "@earendil-works/pi-coding-agent";

// Trim a pi agent event to a small, JSON-safe payload for the browser.
// Field access is loose on purpose: this is a serialization boundary and the
// event union is large; we forward the few kinds the UI renders in M1.
export function serializeEvent(event: AgentSessionEvent): Record<string, unknown> {
  const e = event as unknown as Record<string, any>;
  switch (e.type) {
    case "message_update": {
      const a = e.assistantMessageEvent;
      if (a?.type === "text_delta") return { type: "text_delta", delta: a.delta };
      if (a?.type === "thinking_delta") return { type: "thinking_delta", delta: a.delta };
      return { type: "message_update" };
    }
    case "tool_execution_start":
      return { type: "tool_start", tool: e.toolName ?? e.toolCall?.name };
    case "tool_execution_end":
      return { type: "tool_end", isError: Boolean(e.isError) };
    case "turn_end":
      return { type: "turn_end" };
    case "agent_end":
      return { type: "agent_end" };
    default:
      return { type: e.type };
  }
}
