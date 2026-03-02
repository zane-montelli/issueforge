import type { GeneratorContext } from "../types.js";
import { buildAreaData, buildBaseData, renderTemplate } from "./render.js";
import { defaultBuildCommands } from "./stacks.js";
import { logFile, writeGeneratedFile } from "./writer.js";

export async function generateWindsurf(ctx: GeneratorContext): Promise<void> {
  const { config, rootDir } = ctx;
  const base = buildBaseData(config);

  // Shared always-on rule
  const shared = await renderTemplate("windsurf/shared.md.hbs", base);
  const f1 = await writeGeneratedFile(rootDir, ".windsurf/rules/shared.md", shared);
  logFile(f1.relativePath);

  // Per-area glob-activated rules
  for (const area of config.areas) {
    const areaData = buildAreaData(config, area, defaultBuildCommands(area.stack));
    const areaRule = await renderTemplate("windsurf/area.md.hbs", areaData);
    const f = await writeGeneratedFile(rootDir, `.windsurf/rules/${area.name}.md`, areaRule);
    logFile(f.relativePath);
  }
}
