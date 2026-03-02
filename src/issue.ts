import * as p from "@clack/prompts";
import { execa } from "execa";
import pc from "picocolors";
import { findConfig } from "./config.js";
import type { IssueForgeConfig } from "./types.js";

function isCancel(value: unknown): value is symbol {
  return typeof value === "symbol";
}

function assertNotCancel<T>(value: T | symbol): T {
  if (isCancel(value)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }
  return value as T;
}

function applyEmoji(
  title: string,
  typeLabel: string,
  emojiMap: IssueForgeConfig["emojiMap"],
): string {
  const emoji = emojiMap[typeLabel];
  return emoji ? `${emoji} ${title}` : title;
}

async function checkGhAuth(): Promise<boolean> {
  try {
    await execa("gh", ["auth", "status"], { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

export async function runIssueCommand(cwd: string): Promise<void> {
  console.log("");
  p.intro(pc.bold(pc.magenta(" IssueForge — Create Issue ")));

  // ── Find config ─────────────────────────────────────────────────────────────
  const found = await findConfig(cwd);
  if (!found) {
    p.log.error(
      [
        "No .ai-issue.json found in this directory or any parent directory.",
        `Run ${pc.cyan("npx issueforge init")} first to set up IssueForge in your repo.`,
      ].join("\n"),
    );
    process.exit(1);
  }

  const { config } = found;
  p.log.info(`Using config from: ${pc.dim(found.rootDir)}`);
  p.log.info(`Targeting repo: ${pc.cyan(config.repo)}`);

  // ── Check gh auth ───────────────────────────────────────────────────────────
  const authed = await checkGhAuth();
  if (!authed) {
    p.log.error(
      ["GitHub CLI is not authenticated.", `Run ${pc.cyan("gh auth login")} and try again.`].join(
        "\n",
      ),
    );
    process.exit(1);
  }

  // ── Title ───────────────────────────────────────────────────────────────────
  const title = assertNotCancel(
    await p.text({
      message: "Issue title?",
      validate(v) {
        if (!v.trim()) return "Title is required.";
      },
    }),
  );

  // ── Type label ──────────────────────────────────────────────────────────────
  const typeLabel = assertNotCancel(
    await p.select({
      message: "Type?",
      options: [
        ...config.labels.types.map((t) => ({ value: t, label: t })),
        { value: "", label: "Skip" },
      ],
    }),
  );

  // ── Area label ──────────────────────────────────────────────────────────────
  const areaLabel = assertNotCancel(
    await p.select({
      message: "Area?",
      options: [
        ...config.labels.areas.map((a) => ({ value: a, label: a })),
        { value: "", label: "Skip" },
      ],
    }),
  );

  // ── Priority ────────────────────────────────────────────────────────────────
  const priorityLabel = assertNotCancel(
    await p.select({
      message: "Priority?",
      options: [
        ...config.labels.priorities.map((pr) => ({ value: pr, label: pr })),
        { value: "", label: "Skip" },
      ],
    }),
  );

  // ── Body ────────────────────────────────────────────────────────────────────
  const body = assertNotCancel(
    await p.text({
      message: "Issue body? (describe the issue in detail)",
      placeholder: "What needs to be done and why...",
      validate(v) {
        if (!v.trim()) return "Body is required.";
      },
    }),
  );

  // ── Build final title with emoji ────────────────────────────────────────────
  const finalTitle = typeLabel
    ? applyEmoji(title.trim(), typeLabel, config.emojiMap)
    : title.trim();

  // ── Confirm ──────────────────────────────────────────────────────────────────
  console.log("");
  p.log.info(
    [
      pc.bold("Creating issue:"),
      `  Title:    ${finalTitle}`,
      typeLabel ? `  Type:     ${typeLabel}` : "",
      areaLabel ? `  Area:     ${areaLabel}` : "",
      priorityLabel ? `  Priority: ${priorityLabel}` : "",
      `  Repo:     ${config.repo}`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  const confirmed = assertNotCancel(await p.confirm({ message: "Submit?", initialValue: true }));

  if (!confirmed) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  // ── Build gh args ────────────────────────────────────────────────────────────
  const args: string[] = [
    "issue",
    "create",
    "--repo",
    config.repo,
    "--title",
    finalTitle,
    "--body",
    body.trim(),
  ];

  if (typeLabel) args.push("--label", typeLabel);
  if (areaLabel) args.push("--label", areaLabel);
  if (priorityLabel) args.push("--label", priorityLabel);
  if (config.project) args.push("--project", config.project);

  // ── Execute ──────────────────────────────────────────────────────────────────
  const spinner = p.spinner();
  spinner.start("Creating issue...");

  try {
    const result = await execa("gh", args, { stdio: "pipe" });
    const issueUrl = result.stdout.trim();
    spinner.stop("Issue created!");
    console.log("");
    p.outro(`${pc.green(pc.bold("Done!"))} ${pc.cyan(issueUrl)}`);
  } catch (err) {
    spinner.stop("Failed to create issue.");
    const message = err instanceof Error ? err.message : String(err);
    p.log.error(message);
    process.exit(1);
  }
}
