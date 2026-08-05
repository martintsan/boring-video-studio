import { homedir } from "node:os";
import { join } from "node:path";
import {
  createAgentSession,
  DefaultResourceLoader,
  SessionManager,
  type AgentSession,
} from "@earendil-works/pi-coding-agent";
import { getModelRuntime, resolveModel } from "./modelRuntime.js";
import { HYPERFRAMES_SYSTEM_PROMPT } from "./systemPrompt.js";

// pi's global config dir (auth.json / models.json / extensions / skills).
const AGENT_DIR = process.env.BVS_AGENT_DIR ?? join(homedir(), ".pi", "agent");

// One agent session per video project, keyed by project id. The session's cwd is
// the project directory, so the agent reads/writes that project's files directly.
const sessions = new Map<string, AgentSession>();

export async function getProjectSession(projectId: string, cwd: string): Promise<AgentSession> {
  const existing = sessions.get(projectId);
  if (existing) return existing;

  const modelRuntime = await getModelRuntime();
  const model = resolveModel(modelRuntime);

  const resourceLoader = new DefaultResourceLoader({
    cwd,
    agentDir: AGENT_DIR,
    appendSystemPrompt: [HYPERFRAMES_SYSTEM_PROMPT],
  });
  await resourceLoader.reload();

  const { session } = await createAgentSession({
    cwd,
    agentDir: AGENT_DIR,
    model,
    modelRuntime,
    tools: ["read", "bash", "edit", "write"],
    resourceLoader,
    sessionManager: SessionManager.inMemory(),
  });

  sessions.set(projectId, session);
  return session;
}
