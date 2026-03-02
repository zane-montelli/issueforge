import { join } from "node:path";
import type { GeneratorContext } from "../types.js";
import { buildAreaData, buildBaseData, renderTemplate } from "./render.js";
import { defaultBuildCommands } from "./stacks.js";
import { logFile, writeGeneratedFile } from "./writer.js";

export async function generateCopilot(ctx: GeneratorContext): Promise<void> {
  const { config, rootDir } = ctx;
  const base = buildBaseData(config);

  // Repo-wide instructions
  const instructions = await renderTemplate("copilot/copilot-instructions.md.hbs", base);
  const f1 = await writeGeneratedFile(rootDir, ".github/copilot-instructions.md", instructions);
  logFile(f1.relativePath);

  // Per-area path-scoped instructions
  for (const area of config.areas) {
    const areaData = buildAreaData(config, area, defaultBuildCommands(area.stack));
    const areaInstructions = await renderTemplate("copilot/area.instructions.md.hbs", areaData);
    const filePath = join(".github", "instructions", `${area.name}.instructions.md`);
    const f = await writeGeneratedFile(rootDir, filePath, areaInstructions);
    logFile(f.relativePath);
  }

  // #create-issue prompt file
  const prompt = await renderTemplate("copilot/create-issue.prompt.md.hbs", base);
  const f2 = await writeGeneratedFile(rootDir, ".github/prompts/create-issue.prompt.md", prompt);
  logFile(f2.relativePath);
}
