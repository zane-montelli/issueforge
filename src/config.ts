import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { IssueForgeConfig } from "./types.js";

export const CONFIG_FILENAME = ".ai-issue.json";

export async function readConfig(rootDir: string): Promise<IssueForgeConfig | null> {
  const configPath = join(rootDir, CONFIG_FILENAME);
  try {
    const raw = await readFile(configPath, "utf-8");
    return JSON.parse(raw) as IssueForgeConfig;
  } catch {
    return null;
  }
}

export async function writeConfig(rootDir: string, config: IssueForgeConfig): Promise<void> {
  const configPath = join(rootDir, CONFIG_FILENAME);
  const content = `${JSON.stringify(config, null, 2)}\n`;
  await writeFile(configPath, content, "utf-8");
}

/**
 * Finds the nearest .ai-issue.json by walking up from the given directory.
 * Returns the config and the directory it was found in, or null if not found.
 */
export async function findConfig(
  startDir: string,
): Promise<{ config: IssueForgeConfig; rootDir: string } | null> {
  let current = startDir;

  while (true) {
    const config = await readConfig(current);
    if (config !== null) {
      return { config, rootDir: current };
    }

    const parent = join(current, "..");
    if (parent === current) {
      // Reached filesystem root
      return null;
    }
    current = parent;
  }
}
