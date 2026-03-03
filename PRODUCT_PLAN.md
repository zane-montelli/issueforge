# IssueForge Web App — Product & Technical Plan

## Product Vision

**IssueForge** becomes a hosted web app that lets anyone on a team — developers, PMs, BAs, stakeholders — describe what they need in plain language, and AI drafts a well-structured GitHub issue that's clear for both humans and AI coding agents. Users review, edit, and submit directly to GitHub.

---

## MVP Scope (Lean)

The MVP ships with four capabilities:

1. **GitHub OAuth login** — sign in, auto-fetch accessible repos
2. **Repo selection** — pick any repo the user can create issues in (or manually add external repos)
3. **AI-powered issue creation** — describe what you need in plain language; AI drafts a structured issue with optional repo/code context
4. **Submit to GitHub** — review, edit, and push the issue directly to GitHub via API

Everything else (issue history, saved templates, team settings, analytics) lives in the database schema from day one but the UI for those features ships post-MVP.

---

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15** (App Router) | React, SSR, API routes, Vercel deployment |
| Language | **TypeScript** (strict) | Consistent with existing project |
| Auth | **BetterAuth** | GitHub OAuth provider, Drizzle adapter |
| Database | **PostgreSQL** (Neon) | Serverless Postgres, generous free tier |
| ORM | **Drizzle** | Type-safe, lightweight, great DX |
| AI | **Vercel AI SDK** | Multi-provider (Anthropic Claude + OpenAI GPT-4). Provider abstraction built in |
| GitHub API | **Octokit** (`@octokit/rest`) | Repos, file tree, issues, README, etc. |
| Styling | **Tailwind CSS v4** + **shadcn/ui** | Rapid UI development, accessible components |
| Deployment | **Vercel** | Hosting, edge functions, preview deploys |
| Package manager | **pnpm** | Fast, disk-efficient |

---

## Project Structure

```
issueforge/
├── public/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # Root layout (providers, fonts)
│   │   ├── page.tsx                 # Landing / marketing page
│   │   ├── (auth)/
│   │   │   ├── sign-in/page.tsx     # Sign in with GitHub
│   │   │   └── sign-up/page.tsx     # Sign up (redirects to GitHub OAuth)
│   │   ├── (app)/                   # Authenticated app shell
│   │   │   ├── layout.tsx           # App layout (sidebar, header)
│   │   │   ├── dashboard/page.tsx   # Repo list + recent activity
│   │   │   ├── issues/
│   │   │   │   ├── new/page.tsx     # The main issue creation page
│   │   │   │   └── [id]/page.tsx    # Issue detail (post-MVP: history)
│   │   │   └── settings/page.tsx    # User settings (post-MVP)
│   │   └── api/
│   │       ├── auth/[...all]/route.ts  # BetterAuth handler
│   │       ├── github/
│   │       │   ├── repos/route.ts      # Fetch user's repos
│   │       │   ├── repo-context/route.ts # Fetch repo structure/files for AI context
│   │       │   └── issues/route.ts     # Create issue on GitHub
│   │       └── ai/
│   │           └── generate/route.ts   # AI issue generation endpoint (streaming)
│   ├── lib/
│   │   ├── auth.ts                  # BetterAuth server config
│   │   ├── auth-client.ts           # BetterAuth client
│   │   ├── db/
│   │   │   ├── index.ts             # Drizzle client instance
│   │   │   ├── schema.ts            # All Drizzle table definitions
│   │   │   └── migrations/          # Drizzle migration files
│   │   ├── github.ts                # Octokit helpers (fetch repos, tree, files, create issue)
│   │   └── ai.ts                    # AI provider config (Claude + OpenAI via Vercel AI SDK)
│   ├── components/
│   │   ├── ui/                      # shadcn/ui components
│   │   ├── issue-form.tsx           # Main issue creation form
│   │   ├── issue-preview.tsx        # Markdown preview of generated issue
│   │   ├── repo-selector.tsx        # Repo picker (search + select)
│   │   ├── context-toggle.tsx       # Toggle for repo/code context
│   │   └── provider-selector.tsx    # AI provider picker (Claude/GPT-4)
│   └── types/
│       └── index.ts                 # Shared TypeScript types
├── drizzle.config.ts                # Drizzle Kit config
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── biome.json
├── package.json
└── .env.local                       # Secrets (never committed)
```

---

## Database Schema

The schema is designed to support the full product vision, even though the MVP only uses a subset.

### Tables

**`user`** (BetterAuth core)
- `id`, `name`, `email`, `emailVerified`, `image`, `createdAt`, `updatedAt`
- Additional: `githubUsername` (string)

**`session`** (BetterAuth core)
- `id`, `userId`, `token`, `expiresAt`, `ipAddress`, `userAgent`, `createdAt`, `updatedAt`

**`account`** (BetterAuth core)
- `id`, `userId`, `accountId`, `providerId`, `accessToken`, `refreshToken`, `accessTokenExpiresAt`, `scope`, `idToken`, `password`, `createdAt`, `updatedAt`

**`verification`** (BetterAuth core)
- `id`, `identifier`, `value`, `expiresAt`, `createdAt`, `updatedAt`

**`issue`** (IssueForge — created issues history)
- `id` (uuid, pk)
- `userId` (fk -> user)
- `githubRepoFullName` (string, e.g. "org/repo")
- `githubIssueNumber` (integer, nullable — set after submission)
- `githubIssueUrl` (string, nullable)
- `title` (string)
- `body` (text — the final markdown body)
- `labels` (jsonb — array of label strings)
- `userPrompt` (text — what the user originally typed)
- `aiProvider` (string — "claude" | "openai")
- `usedRepoContext` (boolean)
- `status` (enum: "draft" | "submitted")
- `createdAt`, `updatedAt`

**`template`** (post-MVP — saved issue templates)
- `id` (uuid, pk)
- `userId` (fk -> user, nullable — null = shared/global)
- `name` (string)
- `description` (text)
- `promptTemplate` (text — pre-filled prompt text)
- `labels` (jsonb)
- `createdAt`, `updatedAt`

**`team`** (post-MVP — team/org settings)
- `id` (uuid, pk)
- `name` (string)
- `githubOrg` (string, nullable)
- `defaultAiProvider` (string)
- `createdAt`, `updatedAt`

**`team_member`** (post-MVP)
- `id` (uuid, pk)
- `teamId` (fk -> team)
- `userId` (fk -> user)
- `role` (enum: "owner" | "member")
- `createdAt`

---

## Core User Flow (MVP)

```
1. User visits issueforge.dev
2. Clicks "Sign in with GitHub"
3. BetterAuth handles OAuth → user created in DB, access token stored in account table
4. Dashboard shows list of repos (fetched via GitHub API using stored access token)
5. User can also manually add a repo by entering "owner/repo"
6. User clicks "New Issue" → picks a repo
7. Issue creation page:
   a. Text area: "Describe what you need..." (plain language)
   b. Toggle: "Include repo context" (on/off — saves tokens when off)
   c. AI provider selector: Claude / GPT-4
   d. Click "Generate Issue"
8. If repo context is ON:
   - API fetches repo tree, README, recent issues, and optionally specific files via GitHub API
   - This context is included in the AI prompt
9. AI generates a structured issue (streamed to the UI) with:
   - Title (with emoji prefix)
   - Labels (type, priority, area — inferred from content)
   - Body with sections: Summary, Acceptance Criteria, Technical Notes, etc.
10. User sees a live Markdown preview, can edit any field
11. User clicks "Submit to GitHub"
12. API calls GitHub Issues API → issue created
13. Issue record saved to DB (history)
14. User sees success + link to the GitHub issue
```

---

## AI Prompt Strategy

The AI generation endpoint constructs a system prompt + user message:

**System prompt:**
- You are an expert at writing GitHub issues that are clear for developers, AI coding agents, PMs, and stakeholders
- Always structure issues with: Title, Summary, Acceptance Criteria, Steps to Reproduce (for bugs), Technical Notes (optional), Labels
- Use clear, concise language; avoid ambiguity
- If repo context is provided, reference specific files, directories, and architectural patterns

**User message:**
- The user's plain language description
- (If context toggle ON) Repo metadata: file tree, README excerpt, recent issue titles, relevant code snippets

**Output format:**
- Structured JSON with `title`, `body` (markdown), `labels` (array), `emoji`

---

## API Routes Detail

| Route | Method | Purpose |
|---|---|---|
| `/api/auth/[...all]` | GET/POST | BetterAuth handler |
| `/api/github/repos` | GET | List repos user has access to (paginated) |
| `/api/github/repo-context` | POST | Fetch repo tree + README + recent issues for AI context |
| `/api/github/issues` | POST | Create issue on GitHub (title, body, labels, repo) |
| `/api/ai/generate` | POST | Stream AI-generated issue (accepts prompt + optional context) |

---

## Environment Variables

```
# BetterAuth
BETTER_AUTH_SECRET=          # Random secret for session encryption
BETTER_AUTH_URL=             # e.g. https://issueforge.dev

# GitHub OAuth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Database
DATABASE_URL=                # Neon Postgres connection string

# AI Providers
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
```

---

## Implementation Plan (Ordered)

| # | Task | Priority |
|---|---|---|
| 1 | Clean out existing CLI code. Initialize Next.js 15 project with TypeScript, Tailwind, pnpm | High |
| 2 | Set up Biome for linting/formatting (carry over style conventions) | High |
| 3 | Set up Drizzle + Neon PostgreSQL (schema, migrations, client) | High |
| 4 | Set up BetterAuth with GitHub OAuth + Drizzle adapter | High |
| 5 | Build sign-in page and auth flow | High |
| 6 | Build GitHub API layer (Octokit: list repos, fetch tree/files, create issues) | High |
| 7 | Build dashboard page (repo list with search) | High |
| 8 | Set up Vercel AI SDK with Claude + OpenAI providers | High |
| 9 | Build AI issue generation endpoint (streaming, with/without repo context) | High |
| 10 | Build issue creation page (form, generate, preview, edit, submit) | High |
| 11 | Add manual repo entry (for repos not in user's account) | Medium |
| 12 | Save issue history to database on submit | Medium |
| 13 | Add shadcn/ui components and polish the UI | Medium |
| 14 | Deploy to Vercel, configure production env vars | High |
| 15 | Landing page (marketing copy explaining the product) | Medium |

---

## What Gets Deleted

The entire existing codebase gets replaced:
- `src/` (CLI code, generators, templates, wizard, issue command) — all removed
- `templates/` — removed (no more Handlebars)
- `dist/` — removed
- Current `package.json` dependencies (commander, clack, handlebars, execa) — replaced

We keep:
- `.git` history
- `LICENSE`
- `biome.json` (adapted for the new project)
- `.gitignore` (updated)

---

## Post-MVP Features (Future)

These are designed into the schema but not built for MVP:

1. **Issue history** — browse past issues, re-submit, clone
2. **Saved templates** — reusable prompt templates for common issue types (bug report, feature request, refactor)
3. **Team settings** — shared repos, default labels, preferred AI provider
4. **Analytics** — issues created over time, by type, by repo
5. **Multi-provider AI settings** — per-user default provider, token usage tracking
6. **GitHub Projects integration** — assign issues to project boards
7. **Issue refinement** — AI suggests improvements to manually-written issues
