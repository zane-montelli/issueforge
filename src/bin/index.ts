#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Command } from "commander";
import { runIssueCommand } from "../issue.js";
import { runWizard } from "../wizard.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgPath = join(__dirname, "..", "..", "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf-8")) as { version: string };

const program = new Command();

program
  .name("issueforge")
  .description("Scaffold AI coding tool context files and GitHub issue creation for any repo")
  .version(pkg.version);

program
  .command("init")
  .description("Initialize IssueForge in the current repository")
  .action(async () => {
    await runWizard(process.cwd());
  });

program
  .command("issue")
  .description("Create a GitHub issue interactively using your .ai-issue.json config")
  .action(async () => {
    await runIssueCommand(process.cwd());
  });

// Default to showing help if no command given
program.action(() => {
  program.help();
});

program.parse(process.argv);
