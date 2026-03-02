import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const MANAGED_ENTRIES = [".env.local", "*.env"];

/**
 * Appends IssueForge-managed entries to .gitignore if they are not already present.
 * Creates the file if it does not exist.
 */
export async function ensureGitignore(rootDir: string): Promise<void> {
  const gitignorePath = join(rootDir, ".gitignore");

  let existing = "";
  try {
    existing = await readFile(gitignorePath, "utf-8");
  } catch {
    // File doesn't exist — we'll create it
  }

  const lines = existing.split("\n").map((l) => l.trim());
  const toAdd: string[] = [];

  for (const entry of MANAGED_ENTRIES) {
    if (!lines.includes(entry)) {
      toAdd.push(entry);
    }
  }

  if (toAdd.length === 0) return;

  const separator = existing.length > 0 && !existing.endsWith("\n") ? "\n" : "";
  const block = toAdd.join("\n");
  await writeFile(gitignorePath, `${existing}${separator}${block}\n`, "utf-8");
}
