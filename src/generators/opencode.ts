import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import type { GeneratorContext } from "../types.js";
import { buildAreaData, buildBaseData, renderTemplate } from "./render.js";
import { defaultBuildCommands } from "./stacks.js";
import { logFile, writeGeneratedFile } from "./writer.js";

export async function generateOpencode(ctx: GeneratorContext): Promise<void> {
  const { config, rootDir } = ctx;
  const base = buildBaseData(config);

  // Root AGENTS.md
  const rootAgents = await renderTemplate("shared/agents-root.md.hbs", {
    ...base,
    areaAgentsExists: true,
  });
  const f1 = await writeGeneratedFile(rootDir, "AGENTS.md", rootAgents);
  logFile(f1.relativePath);

  // Per-area AGENTS.md files
  for (const area of config.areas) {
    const areaData = buildAreaData(config, area, defaultBuildCommands(area.stack));
    const areaAgents = await renderTemplate("shared/agents-area.md.hbs", areaData);
    const areaPath = join(area.path, "AGENTS.md");
    const f = await writeGeneratedFile(rootDir, areaPath, areaAgents);
    logFile(f.relativePath);
  }

  // .opencode/commands/ directory
  await mkdir(join(rootDir, ".opencode", "commands"), { recursive: true });

  // /create-issue command
  const createIssue = await renderTemplate("opencode/create-issue.md.hbs", base);
  const f2 = await writeGeneratedFile(rootDir, ".opencode/commands/create-issue.md", createIssue);
  logFile(f2.relativePath);
}
