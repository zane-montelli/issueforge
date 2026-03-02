import { access, readdir } from "node:fs/promises";
import { join } from "node:path";
import type { DetectedArea } from "./types.js";

interface StackSignature {
  files: string[];
  label: string;
}

// Ordered list — first match wins per directory
const STACK_SIGNATURES: StackSignature[] = [
  { files: ["angular.json"], label: "Angular, TypeScript" },
  { files: ["next.config.ts", "next.config.js", "next.config.mjs"], label: "Next.js, TypeScript" },
  { files: ["nuxt.config.ts", "nuxt.config.js"], label: "Nuxt.js, TypeScript" },
  { files: ["svelte.config.js", "svelte.config.ts"], label: "SvelteKit, TypeScript" },
  { files: ["vite.config.ts", "vite.config.js"], label: "Vite, TypeScript" },
  { files: ["remix.config.js", "remix.config.ts"], label: "Remix, TypeScript" },
  { files: ["package.json"], label: "Node.js" },
  { files: ["*.sln"], label: ".NET" },
  { files: ["*.csproj"], label: ".NET" },
  { files: ["go.mod"], label: "Go" },
  { files: ["Cargo.toml"], label: "Rust" },
  { files: ["pyproject.toml"], label: "Python" },
  { files: ["requirements.txt"], label: "Python" },
  { files: ["pom.xml"], label: "Java / Maven" },
  { files: ["build.gradle", "build.gradle.kts"], label: "Kotlin / Gradle" },
];

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function detectStack(dirPath: string): Promise<string | null> {
  let entries: string[];
  try {
    entries = await readdir(dirPath);
  } catch {
    return null;
  }

  for (const sig of STACK_SIGNATURES) {
    for (const pattern of sig.files) {
      if (pattern.includes("*")) {
        // Glob-style: match by extension
        const ext = pattern.replace("*", "");
        if (entries.some((e) => e.endsWith(ext))) {
          return sig.label;
        }
      } else {
        if (await fileExists(join(dirPath, pattern))) {
          return sig.label;
        }
      }
    }
  }

  return null;
}

function inferAreaName(dirName: string, stack: string): string {
  const lower = dirName.toLowerCase();
  if (
    lower.includes("front") ||
    lower.includes("ui") ||
    lower.includes("web") ||
    lower.includes("client")
  ) {
    return "frontend";
  }
  if (
    lower.includes("back") ||
    lower.includes("api") ||
    lower.includes("server") ||
    lower.includes("service")
  ) {
    return "backend";
  }
  if (lower.includes("mobile") || lower.includes("app")) {
    return "mobile";
  }
  if (lower.includes("admin") || lower.includes("dashboard")) {
    return "admin";
  }
  // Fall back to a cleaned version of the directory name
  return dirName.toLowerCase().replace(/[^a-z0-9]/g, "-");
}

/**
 * Scans one level deep from rootDir and returns detected project areas.
 * Skips hidden directories, node_modules, dist, bin, obj, and other common
 * non-source directories.
 */
export async function detectAreas(rootDir: string): Promise<DetectedArea[]> {
  const SKIP_DIRS = new Set([
    "node_modules",
    "dist",
    ".git",
    ".github",
    "bin",
    "obj",
    "build",
    "out",
    "coverage",
    "tmp",
    "temp",
    ".opencode",
    ".cursor",
    ".windsurf",
    ".claude",
    "templates",
  ]);

  let entries: string[];
  try {
    entries = await readdir(rootDir);
  } catch {
    return [];
  }

  const areas: DetectedArea[] = [];

  for (const entry of entries) {
    if (entry.startsWith(".") || SKIP_DIRS.has(entry)) continue;

    const fullPath = join(rootDir, entry);
    const stack = await detectStack(fullPath);

    if (stack !== null) {
      areas.push({
        name: inferAreaName(entry, stack),
        path: entry,
        detectedStack: stack,
      });
    }
  }

  return areas;
}
