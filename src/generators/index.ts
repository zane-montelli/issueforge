import pc from "picocolors";
import type { GeneratorContext, SupportedTool } from "../types.js";
import { TOOL_LABELS } from "../types.js";
import { generateClaudeCode } from "./claudecode.js";
import { generateCopilot } from "./copilot.js";
import { generateCursor } from "./cursor.js";
import { generateOpencode } from "./opencode.js";
import { generateWindsurf } from "./windsurf.js";
import { logFile, writeGeneratedFile } from "./writer.js";

const GENERATORS: Record<SupportedTool, (ctx: GeneratorContext) => Promise<void>> = {
  opencode: generateOpencode,
  cursor: generateCursor,
  claudecode: generateClaudeCode,
  copilot: generateCopilot,
  windsurf: generateWindsurf,
};

export async function runGenerators(ctx: GeneratorContext): Promise<void> {
  const { config } = ctx;

  for (const tool of config.tools) {
    const label = TOOL_LABELS[tool];
    console.log(`\n${pc.bold(pc.cyan(label))}`);
    const generator = GENERATORS[tool];
    await generator(ctx);
  }

  // Always write .ai-issue.json last so it reflects the final config
  const configContent = `${JSON.stringify(ctx.config, null, 2)}\n`;
  const f = await writeGeneratedFile(ctx.rootDir, ".ai-issue.json", configContent);
  console.log(`\n${pc.bold("Config")}`);
  logFile(f.relativePath);
}
