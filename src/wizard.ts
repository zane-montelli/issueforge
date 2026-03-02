import * as p from "@clack/prompts";
import pc from "picocolors";
import { detectAreas } from "./detect.js";
import { runGenerators } from "./generators/index.js";
import { ensureGitignore } from "./gitignore.js";
import {
  ALL_TOOLS,
  DEFAULT_EMOJI_MAP,
  DEFAULT_LABELS,
  type IssueForgeConfig,
  type ProjectArea,
  type SupportedTool,
  TOOL_LABELS,
} from "./types.js";

function isCancel(value: unknown): value is symbol {
  return typeof value === "symbol";
}

function assertNotCancel<T>(value: T | symbol): T {
  if (isCancel(value)) {
    p.cancel("Setup cancelled.");
    process.exit(0);
  }
  return value as T;
}

export async function runWizard(rootDir: string): Promise<void> {
  console.log("");
  p.intro(pc.bold(pc.magenta(" IssueForge ")));
  console.log(pc.dim(`  Initializing AI context files in: ${rootDir}\n`));

  // ── Step 1: GitHub repo ────────────────────────────────────────────────────
  const repo = assertNotCancel(
    await p.text({
      message: "GitHub repository (org/repo)?",
      placeholder: "my-org/my-repo",
      validate(value) {
        if (!value.trim()) return "Repository is required.";
        if (!value.includes("/")) return "Must be in org/repo format.";
      },
    }),
  );

  // ── Step 2: Project board (optional) ───────────────────────────────────────
  const project = assertNotCancel(
    await p.text({
      message: "GitHub Project board name? (leave blank to skip)",
      placeholder: "My Project Board",
    }),
  );

  // ── Step 3: Detect and confirm project areas ───────────────────────────────
  const detected = await detectAreas(rootDir);

  let areas: ProjectArea[];

  if (detected.length > 0) {
    const confirmed = assertNotCancel(
      await p.confirm({
        message: `Detected ${detected.length} project area(s): ${detected.map((d) => `${d.name} (${d.path}/)`).join(", ")}. Use these?`,
        initialValue: true,
      }),
    );

    if (confirmed) {
      areas = detected.map((d) => ({
        name: d.name,
        path: d.path,
        stack: d.detectedStack,
      }));
    } else {
      areas = await promptAreas();
    }
  } else {
    p.log.warn("No project areas detected automatically.");
    areas = await promptAreas();
  }

  // ── Step 4: AI tools ───────────────────────────────────────────────────────
  const selectedTools = assertNotCancel(
    await p.multiselect<SupportedTool>({
      message: "Which AI tools does your team use?",
      options: ALL_TOOLS.map((tool) => ({
        value: tool,
        label: TOOL_LABELS[tool],
        hint: toolHint(tool),
      })),
      required: true,
    }),
  );

  // ── Step 5: Labels ──────────────────────────────────────────────────────────
  const useDefaultLabels = assertNotCancel(
    await p.confirm({
      message:
        "Use default labels (Type: Bug, Type: Feature, Area: Backend, Area: Frontend, etc.)?",
      initialValue: true,
    }),
  );

  const labels = useDefaultLabels ? DEFAULT_LABELS : await promptLabels();

  // ── Build config ────────────────────────────────────────────────────────────
  const config: IssueForgeConfig = {
    repo: repo.trim(),
    project: (project ?? "").trim(),
    areas,
    labels,
    emojiMap: DEFAULT_EMOJI_MAP,
    tools: selectedTools,
  };

  // ── Summary before generating ───────────────────────────────────────────────
  console.log("");
  p.log.info(
    [
      pc.bold("About to generate:"),
      `  Repo:    ${config.repo}`,
      `  Areas:   ${config.areas.map((a) => `${a.name} (${a.path}/)`).join(", ")}`,
      `  Tools:   ${config.tools.map((t) => TOOL_LABELS[t]).join(", ")}`,
    ].join("\n"),
  );

  const proceed = assertNotCancel(
    await p.confirm({ message: "Generate files?", initialValue: true }),
  );

  if (!proceed) {
    p.cancel("Setup cancelled.");
    process.exit(0);
  }

  // ── Generate ────────────────────────────────────────────────────────────────
  console.log("");
  p.log.step("Generating files...");

  await runGenerators({ config, rootDir });
  await ensureGitignore(rootDir);

  // ── Done ────────────────────────────────────────────────────────────────────
  console.log("");
  p.outro(
    [
      pc.bold(pc.green("Done!")),
      "",
      "Next steps:",
      `  1. Run ${pc.cyan("gh auth login")} if you haven't already`,
      "  2. Commit the generated files so your team gets them on clone",
      `  3. Use ${pc.cyan("npx issueforge issue")} to create your first issue`,
      selectedTools.includes("opencode")
        ? `  4. Or use ${pc.cyan("/create-issue")} inside OpenCode`
        : "",
    ]
      .filter(Boolean)
      .join("\n"),
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

async function promptAreas(): Promise<ProjectArea[]> {
  const areas: ProjectArea[] = [];
  let addMore = true;

  p.log.info("Let's define your project areas manually.");

  while (addMore) {
    const name = assertNotCancel(
      await p.text({
        message: "Area name (e.g. frontend, backend)?",
        validate(v) {
          if (!v.trim()) return "Name is required.";
        },
      }),
    );

    const path = assertNotCancel(
      await p.text({
        message: `Directory path for "${name}" (relative to repo root)?`,
        placeholder: name,
        validate(v) {
          if (!v.trim()) return "Path is required.";
        },
      }),
    );

    const stack = assertNotCancel(
      await p.text({
        message: `Tech stack for "${name}"?`,
        placeholder: "e.g. Angular 17, TypeScript",
        validate(v) {
          if (!v.trim()) return "Stack is required.";
        },
      }),
    );

    areas.push({ name: name.trim(), path: path.trim(), stack: stack.trim() });

    addMore = assertNotCancel(
      await p.confirm({ message: "Add another area?", initialValue: false }),
    );
  }

  return areas;
}

async function promptLabels(): Promise<IssueForgeConfig["labels"]> {
  p.log.info("Enter comma-separated label values for each category.");

  const typesRaw = assertNotCancel(
    await p.text({
      message: "Type labels (comma-separated)?",
      initialValue: DEFAULT_LABELS.types.join(", "),
    }),
  );

  const areasRaw = assertNotCancel(
    await p.text({
      message: "Area labels (comma-separated)?",
      initialValue: DEFAULT_LABELS.areas.join(", "),
    }),
  );

  const prioritiesRaw = assertNotCancel(
    await p.text({
      message: "Priority labels (comma-separated)?",
      initialValue: DEFAULT_LABELS.priorities.join(", "),
    }),
  );

  return {
    types: typesRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    areas: areasRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    priorities: prioritiesRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  };
}

function toolHint(tool: SupportedTool): string {
  const hints: Record<SupportedTool, string> = {
    opencode: "AGENTS.md + /create-issue slash command",
    cursor: ".cursor/rules/*.mdc",
    claudecode: "CLAUDE.md + .claude/rules/",
    copilot: ".github/copilot-instructions.md",
    windsurf: ".windsurf/rules/",
  };
  return hints[tool];
}
