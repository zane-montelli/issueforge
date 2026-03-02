export type SupportedTool = "opencode" | "cursor" | "claudecode" | "copilot" | "windsurf";

export interface ProjectArea {
  name: string;
  path: string;
  stack: string;
}

export interface LabelConfig {
  types: string[];
  areas: string[];
  priorities: string[];
}

export interface EmojiMap {
  [label: string]: string;
}

export interface IssueForgeConfig {
  repo: string;
  project: string;
  areas: ProjectArea[];
  labels: LabelConfig;
  emojiMap: EmojiMap;
  tools: SupportedTool[];
}

export interface DetectedArea {
  name: string;
  path: string;
  detectedStack: string;
}

export interface GeneratorContext {
  config: IssueForgeConfig;
  rootDir: string;
}

export const DEFAULT_LABELS: LabelConfig = {
  types: ["Type: Bug", "Type: Feature", "Type: Refactor", "Type: Documentation", "Type: DevOps"],
  areas: ["Area: Backend", "Area: Frontend"],
  priorities: ["Priority: Urgent", "Priority: High", "Priority: Medium", "Priority: Low"],
};

export const DEFAULT_EMOJI_MAP: EmojiMap = {
  "Type: Bug": "🐛",
  "Type: Feature": "✨",
  "Type: Refactor": "♻️",
  "Type: Documentation": "📄",
  "Type: DevOps": "👷",
};

export const ALL_TOOLS: SupportedTool[] = [
  "opencode",
  "cursor",
  "claudecode",
  "copilot",
  "windsurf",
];

export const TOOL_LABELS: Record<SupportedTool, string> = {
  opencode: "OpenCode",
  cursor: "Cursor",
  claudecode: "Claude Code",
  copilot: "GitHub Copilot",
  windsurf: "Windsurf",
};
