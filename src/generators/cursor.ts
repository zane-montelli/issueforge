import type { GeneratorContext } from "../types.js";
import { buildAreaData, buildBaseData, renderTemplate } from "./render.js";
import { defaultBuildCommands } from "./stacks.js";
import { logFile, writeGeneratedFile } from "./writer.js";

export async function generateCursor(ctx: GeneratorContext): Promise<void> {
  const { config, rootDir } = ctx;
  const base = buildBaseData(config);

  // Shared always-on rule
  const shared = await renderTemplate("cursor/shared.mdc.hbs", base);
  const f1 = await writeGeneratedFile(rootDir, ".cursor/rules/shared.mdc", shared);
  logFile(f1.relativePath);

  // Per-area glob-scoped rules
  for (const area of config.areas) {
    const areaData = buildAreaData(config, area, defaultBuildCommands(area.stack));
    const areaRule = await renderTemplate("cursor/area.mdc.hbs", areaData);
    const f = await writeGeneratedFile(rootDir, `.cursor/rules/${area.name}.mdc`, areaRule);
    logFile(f.relativePath);
  }
}
