# AGENTS.md — IssueForge

## Project Overview

IssueForge is a CLI tool (`issueforge`) that generates AI agent configuration files
(AGENTS.md, CLAUDE.md, Cursor rules, Copilot instructions, Windsurf rules, OpenCode rules)
for other projects. It is written in TypeScript, targets Node.js >= 18, and uses ESM modules.

## Build / Lint / Format Commands

```bash
# Build (TypeScript -> JS via tsc, outputs to dist/)
npm run build

# Watch mode for development
npm run dev

# Lint (Biome, checks src/ only)
npm run lint

# Lint with auto-fix
npm run lint:fix

# Format with auto-fix
npm run format
```

There are **no tests** in this project. No test runner is configured.

## Tech Stack

| Component      | Tool / Library             |
|----------------|----------------------------|
| Language        | TypeScript 5.x (strict)    |
| Runtime         | Node.js >= 18              |
| Module system   | ESM (`"type": "module"`)   |
| Build           | Plain `tsc` (no bundler)   |
| Linter/Formatter| Biome (not ESLint/Prettier)|
| CLI framework   | Commander                  |
| Interactive UI  | @clack/prompts             |
| Terminal colors | picocolors                 |
| Child processes | execa                      |
| Templating      | Handlebars (.hbs files)    |
| Package manager | npm                        |

## Code Style Guidelines

### Formatting (enforced by Biome)

- **Indent:** 2 spaces
- **Line width:** 100 characters
- **Quotes:** Double quotes (`"`)
- **Semicolons:** Always
- **Trailing commas:** Always

### Imports

Imports follow a strict 3-group order (no blank lines between groups):

1. **Node.js built-ins** with `node:` prefix: `import { readFile } from "node:fs/promises";`
2. **Third-party packages**: `import pc from "picocolors";`
3. **Internal/relative modules** with explicit `.js` extensions: `import { readConfig } from "./config.js";`

Type import conventions:
- Standalone type-only: `import type { IssueForgeConfig } from "./types.js";`
- Mixed value + type: `import { ALL_TOOLS, type SupportedTool } from "./types.js";` (inline `type`)

### Exports

- **Named exports only** — no default exports anywhere in the codebase.
- Functions: `export async function runWizard(...): Promise<void>`
- Constants: `export const CONFIG_FILENAME = ".ai-issue.json";`
- Types: `export type SupportedTool = ...` / `export interface ProjectArea { ... }`

### Naming Conventions

| Kind                | Style              | Examples                                   |
|---------------------|--------------------|--------------------------------------------|
| Types / Interfaces  | PascalCase         | `SupportedTool`, `ProjectArea`, `EmojiMap` |
| Module-level consts | UPPER_SNAKE_CASE   | `CONFIG_FILENAME`, `ALL_TOOLS`, `SKIP_DIRS`|
| Functions           | camelCase          | `readConfig`, `buildBaseData`, `runWizard` |
| Variables / params  | camelCase          | `rootDir`, `configPath`, `fullPath`        |

Function name prefixes follow semantic conventions:
- `run` — entry-point commands (`runWizard`, `runIssueCommand`)
- `generate` — tool generators (`generateCopilot`, `generateCursor`)
- `build` — data construction (`buildBaseData`, `buildAreaData`)
- `detect` / `infer` — analysis (`detectAreas`, `inferRepoName`)
- `ensure` — idempotent operations (`ensureGitignore`)

### Types

- Use `interface` for object shapes (especially exported contracts).
- Use `type` for unions and aliases.
- **Explicit return types on all functions** (exported and non-exported).
- **Explicit parameter types** always — no inferred parameter types.
- Use `as` assertions only for JSON parsing: `JSON.parse(raw) as IssueForgeConfig`.
- Prefer `null` over `undefined` as the "absent value" sentinel (e.g., `string | null`).

### Variables

- Prefer `const`; use `let` only when reassignment is needed. Never use `var`.
- Mutable arrays built via `.push()` in loops.

### Functions

- Use `function` declarations for all named functions (not arrow expressions).
- Arrow functions only in callbacks: `.map((d) => ...)`, `.filter(Boolean)`.
- Always use parentheses around arrow function parameters, even single ones: `(s) => s.trim()`.

### Strings

- **Template literals** for all interpolation and multiline strings.
- **No string concatenation** — use template literals instead.
- Build multi-line output with `[...lines].filter(Boolean).join("\n")`.

### Async Patterns

- `async/await` exclusively — no `.then()` chains or callbacks.
- All file I/O uses `node:fs/promises` (async).
- Sequential `await` in `for...of` loops (not `Promise.all`) where order matters.
- `readFileSync` only at module init time (e.g., reading package.json for version).

### Error Handling

- **Empty `catch` blocks** for graceful fallbacks:
  ```typescript
  try { ... } catch { return null; }
  ```
  Note: bare `catch {}` without binding the error variable.
- `instanceof Error` check when displaying errors to users:
  ```typescript
  const message = err instanceof Error ? err.message : String(err);
  ```
- `process.exit(1)` for fatal errors; `process.exit(0)` for user cancellation.
- No custom error classes. No `throw` statements in the codebase.

### Comments

- Section dividers with Unicode box-drawing: `// ── Section Name ────────────`
- Brief inline `//` comments above the relevant line.
- JSDoc as short descriptive sentences (no `@param`/`@returns` tags):
  ```typescript
  /** Finds the nearest .ai-issue.json by walking up directories. */
  ```

### Module Organization

- `types.ts` — central type registry + related constants/defaults.
- `config.ts` — config file I/O (read/write/find).
- `detect.ts` — project area auto-detection.
- `generators/` — self-contained sub-module with barrel `index.ts`, plus:
  - `render.ts` (Handlebars templating), `writer.ts` (file I/O), `stacks.ts` (stack data)
  - One file per supported tool (`claudecode.ts`, `copilot.ts`, `cursor.ts`, etc.)
- `wizard.ts`, `issue.ts` — top-level command orchestrators.
- `bin/index.ts` — CLI entry point.
- `templates/` — Handlebars `.hbs` template files (not linted/formatted by Biome).

### Generator File Pattern

Every generator follows an identical structure:

1. Import types, `render.ts`, `stacks.ts`, `writer.ts`
2. Export single function: `export async function generate<Tool>(ctx: GeneratorContext): Promise<void>`
3. Destructure: `const { config, rootDir } = ctx;`
4. Build base template data
5. Render + write root template
6. Loop over `config.areas` to render + write per-area templates
7. Log each written file

### ESM Conventions

- Shebang `#!/usr/bin/env node` on CLI entry point.
- `import.meta.url` + `fileURLToPath` + `dirname` to derive `__dirname`.
- All relative import paths use `.js` extension (required by NodeNext resolution).

### CLI / UI Patterns

- `@clack/prompts` imported as namespace: `import * as p from "@clack/prompts";`
- `picocolors` imported as default: `import pc from "picocolors";`
- Cancellation guard: `assertNotCancel<T>()` function checks prompt results.
- Structured output via `p.intro()`, `p.outro()`, `p.log.info()`, `p.spinner()`, etc.
