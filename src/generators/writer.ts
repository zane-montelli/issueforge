import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import pc from "picocolors";

export interface WrittenFile {
  relativePath: string;
  absolutePath: string;
}

/**
 * Writes content to a file, creating parent directories as needed.
 * Returns the relative path for logging.
 */
export async function writeGeneratedFile(
  rootDir: string,
  relativePath: string,
  content: string,
): Promise<WrittenFile> {
  const absolutePath = join(rootDir, relativePath);
  await mkdir(dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, content, "utf-8");
  return { relativePath, absolutePath };
}

export function logFile(relativePath: string): void {
  console.log(`  ${pc.green("✓")} ${relativePath}`);
}
