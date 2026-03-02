import { join } from "node:path";
import type { GeneratorContext } from "../types.js";
import { buildAreaData, buildBaseData, renderTemplate } from "./render.js";
import { defaultBuildCommands } from "./stacks.js";
import { logFile, writeGeneratedFile } from "./writer.js";

export async function generateClaudeCode(ctx: GeneratorContext): Promise<void> {
  const { config, rootDir } = ctx;
  const base = buildBaseData(config);

  // Root CLAUDE.md
  const root = await renderTemplate("claudecode/claude-root.md.hbs", base);
  const f1 = await writeGeneratedFile(rootDir, "CLAUDE.md", root);
  logFile(f1.relativePath);

  // Per-area .claude/rules/*.md with paths: frontmatter
  for (const area of config.areas) {
    const areaData = buildAreaData(config, area, defaultBuildCommands(area.stack));
    const areaRule = await renderTemplate("claudecode/area-rule.md.hbs", areaData);
    const rulePath = join(".claude", "rules", `${area.name}.md`);
    const f = await writeGeneratedFile(rootDir, rulePath, areaRule);
    logFile(f.relativePath);
  }
}
