import { access } from "node:fs/promises";
import { join } from "node:path";
import { getHyperframeRuntimeScript } from "@hyperframes/core";
import { bundleToSingleHtml } from "@hyperframes/core/compiler";
import type { ResolvedProject, StudioApiAdapter } from "@hyperframes/studio-server";
import { listProjects as listProjectNames, projectDir } from "../projects/store.js";

// URL (under /api) where the HyperFrames runtime JS is served. Referenced by
// sub-composition HTML; the main bundle inlines the runtime for M2 simplicity.
export const RUNTIME_URL = "/api/runtime.js";

export function runtimeScript(): string {
  return getHyperframeRuntimeScript();
}

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function toProject(id: string): ResolvedProject {
  return { id, dir: projectDir(id) };
}

// Our implementation of the studio-server contract. Bundling/runtime come from
// @hyperframes/core; render (MP4 export) is a deferred slice (post-M2).
export function createStudioAdapter(): StudioApiAdapter {
  return {
    async listProjects() {
      return (await listProjectNames()).map(toProject);
    },

    async resolveProject(id) {
      const dir = projectDir(id);
      return (await exists(dir)) ? toProject(id) : null;
    },

    async bundle(dir) {
      try {
        return await bundleToSingleHtml(dir, { runtime: "inline" });
      } catch {
        return null;
      }
    },

    // M2 stub: real linting wired later; preview/hot-reload don't depend on it.
    lint() {
      return { findings: [] };
    },

    runtimeUrl: RUNTIME_URL,

    rendersDir(project) {
      return join(project.dir, "renders");
    },

    // MP4 export is a deferred slice (post-M2). Throwing surfaces a clear error
    // on the /render route without pretending to support it.
    startRender() {
      throw new Error("Render (MP4 export) is not implemented yet (post-M2).");
    },
  };
}
