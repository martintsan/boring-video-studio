import { mkdir, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Root under which every video project lives. One video = one directory.
export const VIDEOS_ROOT = process.env.BVS_VIDEOS_ROOT ?? join(process.cwd(), "videos");

export function slugify(name: string): string {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "untitled"
  );
}

export function projectDir(id: string): string {
  return join(VIDEOS_ROOT, id);
}

export async function listProjects(): Promise<string[]> {
  try {
    const entries = await readdir(VIDEOS_ROOT, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    return [];
  }
}

// Minimal placeholder host. The agent replaces/expands this into a real
// HyperFrames composition; M2 wires studio-server for preview/render.
const SCAFFOLD_INDEX_HTML = `<!-- Boring Video Studio project. The agent authors the HyperFrames composition here. -->
<div id="root" class="hf-root"></div>
`;

export async function createProject(name: string): Promise<{ id: string; dir: string }> {
  const id = slugify(name);
  const dir = projectDir(id);
  await mkdir(join(dir, "compositions", "frames"), { recursive: true });
  await writeFile(join(dir, "index.html"), SCAFFOLD_INDEX_HTML, "utf8");
  return { id, dir };
}
