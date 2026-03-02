import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Handlebars from "handlebars";
import type { EmojiMap, IssueForgeConfig, ProjectArea } from "../types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
// templates/ lives two levels up from src/generators/
const TEMPLATES_DIR = join(__dirname, "..", "..", "templates");

export interface TemplateData {
  repo: string;
  repoName: string;
  project: string;
  areas: ProjectArea[];
  hasMultipleAreas: boolean;
  labels: IssueForgeConfig["labels"];
  emojiEntries: Array<{ label: string; emoji: string }>;
  // Optional extras passed per-generator
  [key: string]: unknown;
}

export interface AreaTemplateData extends TemplateData {
  area: ProjectArea & { globs: string[] };
  buildCommands: string;
}

function buildEmojiEntries(emojiMap: EmojiMap): Array<{ label: string; emoji: string }> {
  return Object.entries(emojiMap).map(([label, emoji]) => ({ label, emoji }));
}

function inferRepoName(repo: string): string {
  const parts = repo.split("/");
  return parts[parts.length - 1] ?? repo;
}

export function buildBaseData(config: IssueForgeConfig): TemplateData {
  return {
    repo: config.repo,
    repoName: inferRepoName(config.repo),
    project: config.project,
    areas: config.areas,
    hasMultipleAreas: config.areas.length > 1,
    labels: config.labels,
    emojiEntries: buildEmojiEntries(config.emojiMap),
  };
}

export function buildAreaData(
  config: IssueForgeConfig,
  area: ProjectArea,
  buildCommands: string,
): AreaTemplateData {
  return {
    ...buildBaseData(config),
    area: {
      ...area,
      globs: [`${area.path}/**`],
    },
    buildCommands,
  };
}

export async function renderTemplate(
  templatePath: string,
  data: TemplateData | AreaTemplateData,
): Promise<string> {
  const fullPath = join(TEMPLATES_DIR, templatePath);
  const source = await readFile(fullPath, "utf-8");
  const compiled = Handlebars.compile(source);
  return compiled(data);
}
