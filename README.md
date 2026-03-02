# IssueForge

**One command. Every AI tool. Any repo.**

IssueForge scaffolds AI coding tool context files and a GitHub issue creation workflow into any repository — frontend, backend, monorepo, or any language. Run it once and every developer on the team gets full, scoped AI context from day one.

```bash
npx issueforge init
```

---

## Why IssueForge?

AI coding tools (OpenCode, Cursor, Claude Code, Copilot, Windsurf) are only as useful as the context they have. Most teams:

- Write context files once, by hand, for one tool
- Leave new developers to figure out project structure themselves
- Hardcode repo-specific details into scripts that never get shared

IssueForge solves this by generating the right context files for every AI tool your team uses, with proper subdirectory scoping so a frontend developer working in `src/frontend/` only sees frontend context — and a backend developer in `src/api/` only sees backend context.

---

## Supported AI Tools

| Tool | Files generated |
|---|---|
| **OpenCode** | `AGENTS.md` (root + per-area) · `.opencode/commands/create-issue.md` |
| **Cursor** | `.cursor/rules/shared.mdc` · `.cursor/rules/<area>.mdc` |
| **Claude Code** | `CLAUDE.md` · `.claude/rules/<area>.md` |
| **GitHub Copilot** | `.github/copilot-instructions.md` · `.github/instructions/<area>.instructions.md` · `.github/prompts/create-issue.prompt.md` |
| **Windsurf** | `.windsurf/rules/shared.md` · `.windsurf/rules/<area>.md` |

---

## Requirements

- **Node.js** >= 18
- **gh CLI** — [cli.github.com](https://cli.github.com) — authenticated via `gh auth login`

No token files. No `.env` secrets. IssueForge uses the `gh` CLI's own auth for everything.

---

## Quick Start

### 1. Initialize your repo

Run this from your repository root (or anywhere inside it):

```bash
npx issueforge init
```

The wizard will:
- Auto-detect your project areas (Angular frontend, .NET backend, Go service, etc.)
- Ask which AI tools your team uses
- Generate all context files with proper subdirectory scoping
- Write a `.ai-issue.json` config (commit this — your whole team benefits)

### 2. Create an issue

```bash
npx issueforge issue
```

Interactive terminal wizard. Reads your `.ai-issue.json`, prompts for title, type, area, priority, and body, then calls `gh issue create` directly.

Or, if you use **OpenCode**, just run `/create-issue` in the chat.

---

## What Gets Generated

For a repo with a `frontend/` (Angular) and `backend/` (.NET) area, selecting OpenCode + Copilot:

```
your-repo/
├── AGENTS.md                                      ← OpenCode: root context
├── CLAUDE.md                                      ← Claude Code compat fallback
├── .ai-issue.json                                 ← committed config (no secrets)
├── .gitignore                                     ← .env.local added automatically
│
├── .opencode/commands/
│   └── create-issue.md                            ← /create-issue slash command
│
├── .github/
│   ├── copilot-instructions.md                    ← repo-wide Copilot context
│   ├── instructions/
│   │   ├── frontend.instructions.md               ← applyTo: frontend/**
│   │   └── backend.instructions.md                ← applyTo: backend/**
│   └── prompts/
│       └── create-issue.prompt.md                 ← #create-issue in Copilot Chat
│
├── frontend/
│   └── AGENTS.md                                  ← frontend-specific context
└── backend/
    └── AGENTS.md                                  ← backend-specific context
```

Every generated file includes the correct frontmatter for its tool's scoping mechanism — so rules for `backend/**` only activate when a developer is working in backend files.

---

## Subdirectory Scoping

This is the key feature. A developer who only works on the frontend:

- Opens their terminal in `frontend/`
- Their AI tool loads `frontend/AGENTS.md` automatically (OpenCode, Claude Code)
- Cursor and Windsurf rules only activate on `frontend/**` glob patterns
- Copilot instructions use `applyTo: "frontend/**"` frontmatter

They never see backend context cluttering their AI sessions. Same in reverse.

---

## `.ai-issue.json` Reference

Committed to your repo. No secrets — auth is handled by `gh auth login`.

```json
{
  "repo": "your-org/your-repo",
  "project": "My Project Board",
  "areas": [
    { "name": "frontend", "path": "src/frontend", "stack": "Angular 17, TypeScript" },
    { "name": "backend", "path": "src/api", "stack": "Node.js, PostgreSQL" }
  ],
  "labels": {
    "types": ["Type: Bug", "Type: Feature", "Type: Refactor", "Type: Documentation", "Type: DevOps"],
    "areas": ["Area: Backend", "Area: Frontend"],
    "priorities": ["Priority: Urgent", "Priority: High", "Priority: Medium", "Priority: Low"]
  },
  "emojiMap": {
    "Type: Bug": "🐛",
    "Type: Feature": "✨",
    "Type: Refactor": "♻️",
    "Type: Documentation": "📄",
    "Type: DevOps": "👷"
  },
  "tools": ["opencode", "copilot"]
}
```

---

## Auto-Detected Stacks

IssueForge scans your subdirectories and identifies stacks automatically:

| Detected file | Stack |
|---|---|
| `angular.json` | Angular, TypeScript |
| `next.config.*` | Next.js, TypeScript |
| `vite.config.*` | Vite, TypeScript |
| `nuxt.config.*` | Nuxt.js, TypeScript |
| `svelte.config.*` | SvelteKit, TypeScript |
| `*.sln` / `*.csproj` | .NET |
| `go.mod` | Go |
| `Cargo.toml` | Rust |
| `pyproject.toml` / `requirements.txt` | Python |
| `pom.xml` | Java / Maven |
| `build.gradle*` | Kotlin / Gradle |
| `package.json` (fallback) | Node.js |

Detected areas are shown for confirmation before anything is written.

---

## New Developer Onboarding

After IssueForge is set up in a repo:

1. Clone the repo
2. Run `gh auth login` (one-time)
3. Open the repo in their AI tool — context is already there

No extra setup. No shared scripts. No `.env.local` to copy around.

---

## Commands

```bash
npx issueforge init     # Initialize IssueForge in the current repo
npx issueforge issue    # Create a GitHub issue interactively
npx issueforge --help   # Show help
npx issueforge --version
```

---

## Contributing

Issues and PRs are welcome. The codebase is TypeScript with Biome for linting and formatting.

```bash
git clone https://github.com/tinoluu-n/issueforge
cd issueforge
npm install
npm run dev        # watch mode
npm run build      # compile
npm run lint       # biome check
npm run lint:fix   # biome check --write
```

---

## License

MIT — [ChiaLung Liu](https://github.com/tinoluu-n) © 2026
