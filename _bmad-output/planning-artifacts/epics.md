---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
status: complete
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
---

# Spekd - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Spekd, decomposing the requirements from the PRD, UX Design Specification, and Architecture into implementable stories.

Spekd is a full product lifecycle platform with three product phases: **Phase 0: PLAN** (guided product planning using pluggable planning methods), **Phase 1: CREATE** (AI-powered issue creation with clarification loop, code-aware context, and role-adapted questions), and **Phase 2: BUILD** (AI agents or developers implement created issues with full context). The tagline is "Your idea, fully spekd."

**Build Phases vs Product Phases:** Epics 1–9 comprise Build Phase 1 (MVP) and implement Product Phase 1 (CREATE). Epics 10–13 comprise Build Phase 2 and implement Product Phase 0 (PLAN) and Team Collaboration. Epics 14–15 comprise Build Phase 3 and implement Product Phase 2 (BUILD) and Multi-Platform Growth. Each product phase is independently usable — Phase 1 (CREATE) works standalone without Phase 0.

## Requirements Inventory

### Functional Requirements

| ID | Requirement |
|----|-------------|
| FR1 | GitHub OAuth sign-in — authenticate via GitHub OAuth; system requests minimum scopes (read:user, repo) |
| FR2 | Role selection during onboarding — select "I'm a developer" or "I'm not a developer" to set communication preference that tailors subsequent AI behaviour |
| FR3 | BYOK (Bring Your Own Key) — provide Anthropic or OpenAI API key during onboarding; key stored encrypted and never returned in plaintext |
| FR4 | Guided onboarding for non-technical users — step-by-step onboarding flow with contextual guidance, especially for BYOK |
| FR5 | Update account settings — change role preference, API key, or theme post-onboarding |
| FR6 | Delete account — remove all personal data and issue history from the system |
| FR7 | View and select repositories — browse and select from repositories accessible via the authenticated GitHub token |
| FR8 | Manual repository add — add a repository by owner/repo slug if not visible in the list |
| FR9 | Initial repository scan — trigger a background scan of a newly added repository to build a code index |
| FR10 | Scan progress indicator — real-time progress updates during repository scanning |
| FR11 | Re-scan repository — trigger a fresh scan of a previously indexed repository |
| FR12 | Scan failure handling — display actionable error message if scan fails; offer retry |
| FR13 | Remove repository — remove a repository and its code index from the system |
| FR14 | Initiate AI clarification loop — start the issue-creation flow from a repository context; AI asks clarifying questions |
| FR15 | Up to 3 clarifying questions — AI asks up to 3 questions before generating the issue; never skipped in MVP |
| FR16 | Code-index-aware questions — AI uses the repository's code index to inform the questions it asks |
| FR17 | Persona-adapted questions — AI question style and depth adapts to the user's selected role (developer / non-developer) |
| FR18 | Answers incorporated into generation — all clarification answers are passed as context when generating the issue |
| FR19 | Structured issue output — generated issue has title, body, labels, and milestone fields following the active template |
| FR20 | Persona-aware technical notes — generated issue body includes a "Technical Notes" section tailored to the user's role (developer / non-developer) |
| FR21 | Template applied at generation time — one of the 3 built-in templates (Bug Report, Feature Request, Technical Debt) is applied |
| FR22 | Streaming generation — issue content is streamed token-by-token to the UI via SSE |
| FR23 | AI-assisted badge — generated issues are labelled with an "AI-assisted" label on submission |
| FR24 | Review generated issue — user can review the full issue before submitting to GitHub |
| FR25 | Edit all fields — user can edit title, body, labels, and milestone on the review screen |
| FR26 | Submit to GitHub — submit the reviewed/edited issue to the selected GitHub repository via the GitHub API |
| FR27 | Confirm with link — after successful submission, show a confirmation with a direct link to the created GitHub issue |
| FR28 | Submission failure handling — display actionable error and allow retry without losing edits if GitHub submission fails |
| FR29 | 3 built-in templates — Bug Report, Feature Request, Technical Debt templates available at generation time |
| FR30 | Template applied at generation — selected template structures the generated issue's title format, body sections, and default labels |
| FR31 | Issue history stored privately — all generated issues are stored in the user's private DB records, isolated from other users |
| FR32 | Strict multi-tenant isolation — no user can access another user's repositories, issues, or API keys |
| FR33 | View stored issue data — users can view their previously generated issues via the settings/history area |
| FR34 | Informed consent — users are shown what data is stored during onboarding and can delete it at any time |
| FR35 | Strict data isolation — issue data is scoped per user_id at every DB query; no cross-user leakage |
| FR36 | Marketing landing page — public-facing landing page presenting Spekd's value proposition |
| FR37 | Demo of clarification loop — interactive or animated demo of the AI clarification loop on the landing page |
| FR38 | GitHub OAuth CTA — prominent call-to-action on the landing page to sign in with GitHub |
| FR39 | SSR + SEO meta — landing page rendered server-side with full Open Graph and meta tags |
| FR40 | GitHub API error handling — surface actionable error messages for all GitHub API failures (rate limits, auth errors, not found, etc.) |
| FR41 | AI error handling — surface actionable error messages for all AI provider failures (invalid key, quota exceeded, timeout, etc.) |
| FR42 | Mid-stream failure handling — if streaming is interrupted, offer a retry that resumes or restarts generation without losing context |
| FR43 | No silent failures — every error must be visible to the user with an actionable next step |
| FR44 | Retry without losing work — retry actions preserve all previously entered context (repo selection, answers, edits) |

#### Planning Method & Product Phase 0 *(future — Build Phase 2)*

| ID | Requirement |
|----|-------------|
| FR45 | Initiate guided planning — users can initiate a guided planning workflow by selecting a planning method (e.g., BMAD Method) and providing an initial product idea |
| FR46 | Pluggable planning methods — planning methods can be added, selected, and configured independently of the core platform via the `PlanningMethodAdapter` interface |
| FR47 | BMAD planning method — the BMAD planning method guides users through generating: PRD, Architecture Spec, UX Spec, Epics, and Stories |
| FR48 | Planning artifacts as context — planning artifacts generated in Phase 0 are stored per-project and can be used as enriched context during Phase 1 issue creation |
| FR49 | Artifact review & iteration — users can review, edit, and iterate on planning artifacts before finalizing them |
| FR50 | Issue creation from stories — users can create issues from Phase 0 stories directly, with planning context automatically injected into the AI clarification loop |

#### Team Collaboration *(future — Build Phase 2)*

| ID | Requirement |
|----|-------------|
| FR51 | Team workspace creation — users can create a team workspace and invite members by email or GitHub username |
| FR52 | Role-based permissions — team workspaces support role-based permissions: Owner, Admin, Member |
| FR53 | Shared planning artifacts — team members can share planning artifacts (PRDs, architecture specs, etc.) within a team workspace |
| FR54 | Shared repositories — team members can view and collaborate on shared repositories added to the team workspace |
| FR55 | Team defaults — team owners can configure default settings (AI provider, templates, planning method) for the team |
| FR56 | Team data isolation — one team's projects, repos, and artifacts are never accessible to another team |

#### Product Phase 2: BUILD *(future — Build Phase 3)*

| ID | Requirement |
|----|-------------|
| FR57 | Agentic issue assignment — users can assign created issues to AI agents or developers with full planning and creation context attached |
| FR58 | Cross-phase tracking — the system tracks issue implementation status across Phase 0 planning, Phase 1 creation, and Phase 2 build |

### NonFunctional Requirements

| ID | Requirement |
|----|-------------|
| NFR1 | Core Web Vitals — LCP ≤ 2.5s, FID ≤ 100ms, CLS ≤ 0.1 on the landing page |
| NFR2 | App shell load — authenticated app shell loads in ≤ 3s on a standard broadband connection |
| NFR3 | First AI token — first streamed token arrives within ≤ 5s of issue generation being initiated |
| NFR4 | Scan progress updates — scan progress polling delivers updates every ≤ 2s |
| NFR5 | Repository list load — repository list loads in ≤ 3s after authentication |
| NFR6 | Next clarifying question — next question is presented within ≤ 3s of the previous answer being submitted |
| NFR7 | GitHub token encryption — GitHub OAuth tokens are encrypted at rest using AES-256-GCM |
| NFR8 | API key encryption — BYOK API keys are encrypted at rest using AES-256-GCM and never returned in plaintext |
| NFR9 | TLS — all data in transit uses TLS 1.2+ |
| NFR10 | Multi-tenant isolation — all DB queries are scoped by user_id; no cross-tenant data leakage |
| NFR11 | No AI provider logging — user prompts and issue content must not be logged by the AI provider (enforced by provider selection and config) |
| NFR12 | Input sanitisation — all user inputs are sanitised before being used in DB queries or API calls |
| NFR13 | No privilege escalation — users can only access repositories and data that their GitHub token has access to |
| NFR14 | Concurrent users — system supports 500 registered users and 50 concurrent active sessions in Phase 1 |
| NFR15 | Storage review — storage strategy reviewed before Phase 2 scale-up |
| NFR16 | AI provider abstraction — AI SDK provider abstraction allows switching between Anthropic, OpenAI, Azure OpenAI, AWS Bedrock, and Ollama without code changes |
| NFR17 | Non-blocking concurrent scans — repository scans run as background jobs (pg-boss) and do not block the web process |
| NFR18 | WCAG 2.1 AA — all authenticated and public pages meet WCAG 2.1 Level AA |
| NFR19 | Keyboard navigation — full keyboard navigation throughout the app; Cmd+Enter submits at every step |
| NFR20 | Focus management — focus moves programmatically to each new ClarificationCard on mount |
| NFR21 | Colour contrast — minimum 4.5:1 contrast ratio for all text elements |
| NFR22 | Screen reader support — review screen and issue output are fully navigable and readable by screen readers |
| NFR23 | Visible actionable errors — every error state shows a clear message and a next-step action |
| NFR24 | Retry on mid-stream failure — streaming failures offer a one-click retry that preserves context |
| NFR25 | Retry on scan failure — scan failures offer a one-click retry |
| NFR26 | No broken/blank states — no page or component renders a blank or broken state; always show loading or error UI |
| NFR27 | GitHub rate limit respect — Octokit configured with @octokit/plugin-retry and exponential back-off for rate limits |
| NFR28 | AI SDK provider abstraction — Vercel AI SDK used as the abstraction layer for all AI calls |
| NFR29 | OAuth token expiry — expired GitHub OAuth tokens trigger a re-authentication flow without losing user context |
| NFR30 | External call timeouts — all external API calls (GitHub, AI) have explicit timeouts configured |

#### Extensibility & Future Phases *(future — Build Phase 2+)*

| ID | Requirement |
|----|-------------|
| NFR31 | Planning method extensibility — the planning method adapter interface supports adding new planning methods without changes to the core platform |
| NFR32 | Planning artifact scalability — planning artifact storage scales linearly with projects; storage strategy reviewed before Build Phase 2 launch |
| NFR33 | Team operation latency — team workspace operations (invite, permission change, shared artifact access) complete within 2 seconds under normal conditions |
| NFR34 | Self-hostable phases — all phases (PLAN, CREATE, BUILD) are self-hostable via Docker/Kubernetes, consistent with the core deployment architecture |

### Additional Requirements

**Project Initialization:**
- Bootstrap command: `pnpm create next-app@latest spekd --typescript --tailwind --eslint --app --src-dir --turbopack --import-alias "@/*"`
- Story 1.1 must execute this exact command and commit the result before any other code is written

**Implementation Sequence (strict dependency order):**
1. `src/env.ts` — Zod-validated environment schema (must exist before anything else)
2. `src/db/` — Drizzle schema + migrations (must exist before auth or any data layer)
3. `src/lib/crypto.ts` — AES-256-GCM encryption util (must exist before auth saves tokens)
4. `src/lib/auth/` — BetterAuth GitHub provider (depends on db + crypto)
5. `src/lib/github/` — Octokit client + helpers (depends on auth)
6. `src/lib/jobs/` — pg-boss worker setup (depends on db)
7. `src/lib/ai/` — Vercel AI SDK client + provider abstraction (depends on env)
8. Routes, server actions, UI components (depend on all of the above)

**Error Handling Pattern:**
- `Result<T, AppError>` type mandatory for all server actions
- Every server action must return `{ data, error }` — never throw to the client

**Session Guard Pattern:**
- `getSession()` must be the first line of every authenticated server action and server component
- Unauthenticated requests must be redirected to `/` (landing page) immediately

**Background Jobs:**
- pg-boss 12.14.0 for all background repository scan jobs
- Worker process: `WORKER_MODE=true` env flag runs the worker from the same Docker image
- Job table managed by pg-boss migrations (not Drizzle)

**Encryption:**
- AES-256-GCM via `src/lib/crypto.ts`
- `ENCRYPTION_KEY` env var (32-byte hex) required at startup
- Applied to: GitHub OAuth access tokens, BYOK API keys

**Database:**
- Drizzle ORM + PostgreSQL
- Migrations auto-run at container startup via `db:migrate` script

**Caching:**
- Repository list: `unstable_cache` with 60s TTL, tagged `repos-{userId}`
- Code index: `unstable_cache` with 5min TTL, tagged `index-{repoId}`

**Scan Progress Polling:**
- `GET /api/scan-status/[jobId]` endpoint
- Client polls every 2s until job state is `completed` or `failed`

**Streaming:**
- `POST /api/generate` route handler using Vercel AI SDK `streamText`
- SSE (Server-Sent Events) protocol

**Deployment Artifacts:**
- `docker-compose.yml` — local dev + self-hosting
- `helm/` — Kubernetes Helm chart for production
- GitHub Actions CI: build → test → lint → Lighthouse → publish `ghcr.io/spekd/spekd:{semver}` on merge to `main`

**UX / Accessibility Requirements:**
- Dark mode default; light mode toggle; theme persisted in `localStorage` + user profile DB column
- `data-persona` attribute on `<body>` for role-responsive typography density (`developer` / `non-developer`)
- `prefers-reduced-motion` respected across all animations
- `aria-live="polite"` on `StreamingIssueRenderer` and `ClarificationCard` progress indicators
- `axe-core` integrated in dev mode; `eslint-plugin-jsx-a11y` in linter config
- Lighthouse accessibility score ≥ 90 enforced in CI
- Skip-to-content link as first focusable element on every page
- Minimum 44×44px touch targets on all interactive elements

**Custom Components (7 required):**
- `IssueTextarea` — auto-resizing textarea with character count and Cmd+Enter submit
- `ClarificationCard` — animated question card with focus management on mount
- `RepoScanProgress` — progress bar + status text for background scan jobs
- `StreamingIssueRenderer` — SSE consumer with `aria-live` and token-by-token rendering
- `GeneratedIssuePanel` — full issue preview with edit affordances
- `OnboardingStep` — step indicator + content wrapper for multi-step onboarding
- `SidebarNav` — collapsible navigation sidebar with keyboard nav and active-state indicators

**Issue Title Format (Developer role):**
- `[Type]: [Problem description] in [Component]`
- Body sections: Summary → Acceptance Criteria → Steps to Reproduce → Technical Notes → Labels

### FR Coverage Map

| FR | Epic | Story |
|----|------|-------|
| FR1 | Epic 1 | Story 1.2 |
| FR2 | Epic 2 | Story 2.2 |
| FR3 | Epic 2 | Story 2.3 |
| FR4 | Epic 2 | Story 2.1 |
| FR5 | Epic 2 | Story 2.5 |
| FR6 | Epic 2 | Story 2.6 |
| FR7 | Epic 3 | Story 3.1 |
| FR8 | Epic 3 | Story 3.2 |
| FR9 | Epic 3 | Story 3.3 |
| FR10 | Epic 3 | Story 3.4 |
| FR11 | Epic 3 | Story 3.5 |
| FR12 | Epic 3 | Story 3.6 |
| FR13 | Epic 3 | Story 3.7 |
| FR14 | Epic 4 | Story 4.1 |
| FR15 | Epic 4 | Story 4.2 |
| FR16 | Epic 4 | Story 4.3 |
| FR17 | Epic 4 | Story 4.4 |
| FR18 | Epic 4 | Story 4.5 |
| FR19 | Epic 5 | Story 5.1 |
| FR20 | Epic 5 | Story 5.2 |
| FR21 | Epic 5 | Story 5.3 |
| FR22 | Epic 5 | Story 5.4 |
| FR23 | Epic 5 | Story 5.5 |
| FR24 | Epic 6 | Story 6.1 |
| FR25 | Epic 6 | Story 6.2 |
| FR26 | Epic 6 | Story 6.3 |
| FR27 | Epic 6 | Story 6.4 |
| FR28 | Epic 6 | Story 6.5 |
| FR29 | Epic 5 | Story 5.3 |
| FR30 | Epic 5 | Story 5.3 |
| FR31 | Epic 7 | Story 7.1 |
| FR32 | Epic 1 | Story 1.4 |
| FR33 | Epic 7 | Story 7.2 |
| FR34 | Epic 2 | Story 2.4 |
| FR35 | Epic 1 | Story 1.4 |
| FR36 | Epic 8 | Story 8.1 |
| FR37 | Epic 8 | Story 8.2 |
| FR38 | Epic 8 | Story 8.3 |
| FR39 | Epic 8 | Story 8.4 |
| FR40 | Epic 9 | Story 9.1 |
| FR41 | Epic 9 | Story 9.2 |
| FR42 | Epic 9 | Story 9.3 |
| FR43 | Epic 9 | Story 9.4 |
| FR44 | Epic 9 | Story 9.5 |
| FR45 | Epic 10 | Story 10.3 |
| FR46 | Epic 10 | Story 10.1, 10.2 |
| FR47 | Epic 10 | Story 10.2 |
| FR48 | Epic 12 | Story 12.1 |
| FR49 | Epic 11 | Story 11.2, 11.3 |
| FR50 | Epic 12 | Story 12.2 |
| FR51 | Epic 13 | Story 13.1, 13.2 |
| FR52 | Epic 13 | Story 13.3 |
| FR53 | Epic 13 | Story 13.4 |
| FR54 | Epic 13 | Story 13.5 |
| FR55 | Epic 13 | Story 13.6 |
| FR56 | Epic 13 | Story 13.7 |
| FR57 | Epic 14 | Story 14.1 |
| FR58 | Epic 14 | Story 14.2 |

## Epic List

### Build Phase 1 (MVP) — Product Phase 1 (CREATE)

| # | Title | Stories | Key Value |
|---|-------|---------|-----------|
| 1 | Project Foundation & Infrastructure | 1.1–1.5 | Runnable skeleton with auth, DB, encryption, CI |
| 2 | User Account & Onboarding | 2.1–2.6 | Users can sign in, set up role + BYOK, manage account |
| 3 | Repository Management | 3.1–3.7 | Users can add, scan, and manage repositories |
| 4 | AI Clarification Loop | 4.1–4.5 | AI asks up to 3 code-aware, role-adapted questions |
| 5 | AI Issue Generation | 5.1–5.5 | AI generates structured, streamed, templated issues |
| 6 | Issue Review & GitHub Submission | 6.1–6.5 | Users review, edit, submit, and confirm issues on GitHub |
| 7 | Issue History & Privacy | 7.1–7.3 | Issue history stored privately; users control their data |
| 8 | Marketing & Landing Page | 8.1–8.4 | Public landing page with demo, CTA, SSR, and SEO |
| 9 | Error Handling & Resilience | 9.1–9.5 | All failures are visible, actionable, and retryable |

### Build Phase 2 — Product Phase 0 (PLAN) & Teams *(future)*

| # | Title | Stories | Key Value |
|---|-------|---------|-----------|
| 10 | Planning Method Infrastructure | 10.1–10.3 | Pluggable planning method adapter with BMAD as first adapter |
| 11 | Planning Workflow & Artifact Generation | 11.1–11.4 | Guided planning workflow, artifact generation, review, and storage |
| 12 | Phase 0 → Phase 1 Integration | 12.1–12.2 | Planning context flows into issue creation |
| 13 | Team Workspaces & Collaboration | 13.1–13.7 | Teams, invitations, RBAC, shared repos & artifacts |

### Build Phase 3 — Product Phase 2 (BUILD) & Growth *(future)*

| # | Title | Stories | Key Value |
|---|-------|---------|-----------|
| 14 | Agentic Workflow Integration | 14.1–14.2 | AI agents pick up issues with full lifecycle context |
| 15 | Multi-Platform & Growth | 15.1–15.3 | Jira, Azure DevOps support; analytics dashboard |

---

## Epic 1: Project Foundation & Infrastructure

Establish the complete technical foundation: bootstrapped Next.js app, validated environment, Drizzle + PostgreSQL schema with migrations, AES-256-GCM encryption utility, BetterAuth GitHub OAuth, pg-boss worker setup, Vercel AI SDK client, Docker Compose + Kubernetes Helm chart, and GitHub Actions CI/CD pipeline. All subsequent epics depend on this epic being complete.

### Story 1.1: Bootstrap Next.js Application

As a developer,
I want the project bootstrapped with the exact prescribed command,
So that the codebase starts from a consistent, reproducible baseline.

**Acceptance Criteria:**

**Given** the developer has pnpm installed
**When** the bootstrap command is run: `pnpm create next-app@latest spekd --typescript --tailwind --eslint --app --src-dir --turbopack --import-alias "@/*"`
**Then** a Next.js 14+ project is created with TypeScript, Tailwind CSS, ESLint, App Router, src/ directory, Turbopack, and `@/*` import alias
**And** the result is committed to git as the initial commit before any other code is written

**Given** the bootstrapped project
**When** `pnpm dev` is run
**Then** the dev server starts without errors on localhost:3000

---

### Story 1.2: Environment Configuration & Validation

As a developer,
I want all environment variables validated at startup via Zod,
So that the app fails fast with a clear error if required config is missing.

**Acceptance Criteria:**

**Given** `src/env.ts` exists with a Zod schema
**When** the app starts with a missing required env var (e.g. `DATABASE_URL`)
**Then** the process exits immediately with a descriptive error message listing the missing variable

**Given** all required env vars are present
**When** the app starts
**Then** `env` is exported as a typed, validated object used throughout the codebase

**Given** the env schema
**When** reviewed
**Then** it covers: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `ENCRYPTION_KEY` (32-byte hex), and `WORKER_MODE` (optional boolean)

---

### Story 1.3: Database Schema, Migrations & Encryption Utility

As a developer,
I want the Drizzle schema defined and migrations running automatically at container startup, and an AES-256-GCM encryption utility available,
So that the data layer and security primitives are ready before any feature work begins.

**Acceptance Criteria:**

**Given** `src/db/schema.ts` exists
**When** reviewed
**Then** it defines tables: `users` (id, githubId, name, email, isDeveloper, theme, createdAt), `accounts` (BetterAuth adapter), `sessions` (BetterAuth adapter), `repos` (id, userId, owner, repo, scanStatus, lastScannedAt), `repo_files` (id, userId, repoId, filePath, content, sha, indexedAt), `issues` (id, userId, repoId, title, body, labels, milestone, githubIssueUrl, createdAt)

**Given** `src/db/migrate.ts` exists and is called in the container entrypoint
**When** the container starts
**Then** all pending Drizzle migrations are applied automatically before the server accepts requests

**Given** `src/lib/crypto.ts` exists
**When** `encrypt(plaintext)` is called
**Then** it returns an AES-256-GCM encrypted string (IV prepended, base64-encoded) using the `ENCRYPTION_KEY` env var

**Given** `src/lib/crypto.ts`
**When** `decrypt(ciphertext)` is called with a valid encrypted string
**Then** it returns the original plaintext

**Given** an invalid `ENCRYPTION_KEY` length
**When** the app starts
**Then** `env.ts` validation catches it and exits with an error before `crypto.ts` is ever called

---

### Story 1.4: Authentication Foundation (BetterAuth GitHub OAuth)

As a developer,
I want BetterAuth configured with the GitHub provider, Drizzle adapter, and database session strategy,
So that authenticated routes are protected and all session-guarded actions have a consistent `getSession()` primitive.

**Acceptance Criteria:**

**Given** `src/lib/auth/config.ts` exists
**When** a user visits a protected route without a session
**Then** they are redirected to the landing page (`/`)

**Given** `getSession()` is called in a server action or server component
**When** the user is not authenticated
**Then** it returns `null` and the caller redirects to `/`

**Given** `getSession()` is called
**When** the user is authenticated
**Then** it returns `{ userId, githubAccessToken (decrypted), isDeveloper, theme }`

**Given** the GitHub OAuth callback
**When** a new user signs in for the first time
**Then** a user record is created in the `users` table with `githubId`, `name`, and `email`; the GitHub access token is encrypted with `crypto.ts` before storage

**Given** all server actions in the codebase
**When** reviewed
**Then** `getSession()` is the first statement in every authenticated action, and actions return `Result<T, AppError>` — never throwing to the client

**Given** NFR10 and FR35 (multi-tenant isolation)
**When** any DB query is examined
**Then** every query that accesses user-owned data includes a `WHERE user_id = :userId` clause derived from the verified session

---

### Story 1.5: CI/CD Pipeline, Docker Compose & Kubernetes Helm Chart

As a developer,
I want a complete CI/CD pipeline and deployment artifacts,
So that every merge to `main` produces a versioned, deployable container image.

**Acceptance Criteria:**

**Given** `.github/workflows/ci.yml` exists
**When** a pull request is opened
**Then** the pipeline runs: lint → type-check → unit tests → build → Lighthouse accessibility score ≥ 90

**Given** a merge to `main`
**When** the pipeline completes successfully
**Then** a Docker image is published to `ghcr.io/spekd/spekd:{semver}` using the git tag or commit SHA as the version

**Given** `docker-compose.yml` exists
**When** `docker compose up` is run
**Then** the app (web process) and PostgreSQL start, Drizzle migrations run, and the app is accessible on localhost:3000

**Given** `WORKER_MODE=true` in the environment
**When** the container starts
**Then** the process runs the pg-boss worker (not the Next.js server)

**Given** `helm/` chart exists
**When** `helm install spekd ./helm --set image.tag=<version>` is run against a Kubernetes cluster
**Then** the deployment succeeds with web and worker deployments, a PostgreSQL dependency, and appropriate secrets/configmap

---

## Epic 2: User Account & Onboarding

Guide new users through GitHub OAuth sign-in, role selection ("I'm a developer" / "I'm not a developer"), BYOK API key entry, and informed data-consent acknowledgement. Allow existing users to update settings and delete their account. All onboarding steps use the `OnboardingStep` component.

### Story 2.1: Guided Onboarding Flow

As a new user,
I want a step-by-step onboarding flow that guides me through setup,
So that I can get started quickly even if I'm not technically experienced.

**Acceptance Criteria:**

**Given** a user signs in for the first time (no role set)
**When** the OAuth callback completes
**Then** they are redirected to `/onboarding` and see step 1 of the onboarding flow

**Given** the onboarding flow
**When** rendered
**Then** it uses the `OnboardingStep` component with a visible step indicator (e.g. "Step 2 of 4") and a back button on all steps except step 1

**Given** a user on any onboarding step
**When** they press `Cmd+Enter`
**Then** the current step is submitted and the next step is shown

**Given** a user who has already completed onboarding
**When** they visit `/onboarding`
**Then** they are redirected to `/dashboard`

---

### Story 2.2: Role Selection

As a new user,
I want to select whether I'm a developer or not,
So that the AI tailors its questions and generated issues to my technical level.

**Acceptance Criteria:**

**Given** onboarding step "Choose your role"
**When** rendered
**Then** two options are shown with clear descriptions: "I'm a developer" (technical language, file paths, function names in AI output) and "I'm not a developer" (plain language, concept-level descriptions in AI output)

**Given** a user selects a role
**When** they proceed to the next step
**Then** the `is_developer` boolean is saved to the `users` table and included in every subsequent AI prompt via `data-persona`

**Given** the role is saved
**When** the app shell renders
**Then** `data-persona="developer"` or `data-persona="non-developer"` is set on the `<body>` element

---

### Story 2.3: BYOK API Key Entry

As a new user,
I want to securely provide my own AI provider API key,
So that Spekd can make AI calls on my behalf without storing my key in plaintext.

**Acceptance Criteria:**

**Given** the BYOK onboarding step
**When** rendered
**Then** the user sees a provider selector (Anthropic / OpenAI) and a password-type input for the API key, with contextual guidance on where to find the key

**Given** a user submits an API key
**When** the server action processes it
**Then** the key is encrypted with `crypto.ts` before storage and never returned in plaintext in any API response

**Given** a user submits an invalid API key format
**When** the server action validates it
**Then** an inline error is shown without saving the key

**Given** a user completes the BYOK step
**When** AI calls are subsequently made
**Then** the key is decrypted in-memory only at the time of the AI call and is not logged

---

### Story 2.4: Informed Data Consent

As a new user,
I want to understand what data Spekd stores before I start using it,
So that I can make an informed decision about my privacy.

**Acceptance Criteria:**

**Given** an onboarding step titled "Your data & privacy"
**When** rendered
**Then** the user sees a clear, plain-language summary of what is stored: GitHub OAuth token (encrypted), API key (encrypted), repository code indexes, and generated issue history

**Given** the consent step
**When** rendered
**Then** there is a checkbox "I understand what data is stored" that must be checked to proceed

**Given** the user checks the checkbox and proceeds
**When** the server action runs
**Then** a `consentGivenAt` timestamp is written to the `users` table

---

### Story 2.5: Update Account Settings

As an authenticated user,
I want to update my role preference, API key, and theme from the settings page,
So that I can change my preferences without re-doing onboarding.

**Acceptance Criteria:**

**Given** an authenticated user visits `/settings`
**When** the page loads
**Then** they see their current role (developer / non-developer toggle, editable), current AI provider (editable), API key field (masked, replaceable), and theme toggle (dark/light)

**Given** the user changes their role and saves
**When** the server action runs
**Then** the `users` table is updated and `data-persona` on `<body>` reflects the new role immediately

**Given** the user replaces their API key
**When** saved
**Then** the new key is encrypted before storage; the old key is overwritten

**Given** the user toggles theme
**When** the change is saved
**Then** the theme is persisted to the `users` table AND to `localStorage` so it survives page reloads before hydration

---

### Story 2.6: Delete Account

As an authenticated user,
I want to permanently delete my account and all associated data,
So that I can exercise my right to erasure.

**Acceptance Criteria:**

**Given** the settings page
**When** the user clicks "Delete account"
**Then** a confirmation dialog appears explaining exactly what will be deleted: user record, encrypted tokens, all repositories, all issue history

**Given** the user confirms deletion
**When** the server action runs
**Then** all rows in `users`, `accounts`, `sessions`, `repos`, `repo_files`, and `issues` for this `userId` are deleted in a single transaction

**Given** deletion succeeds
**When** complete
**Then** the user is signed out and redirected to `/` with a confirmation message

**Given** deletion fails
**When** the server action returns an error
**Then** an actionable error message is shown and no partial deletion has occurred (transaction rolled back)

---

## Epic 3: Repository Management

Allow authenticated users to browse their GitHub repositories, add repositories manually, trigger background scans to build code indexes, monitor scan progress in real time, re-scan, handle failures, and remove repositories.

### Story 3.1: Browse & Select Repositories

As an authenticated user,
I want to see a list of my GitHub repositories and select one to work with,
So that I can create issues in the right repository.

**Acceptance Criteria:**

**Given** an authenticated user on the repository selection screen
**When** the page loads
**Then** the repository list is fetched from GitHub via Octokit and displayed within ≤ 3s (NFR5)

**Given** the repository list
**When** rendered
**Then** repositories are shown with owner/name, visibility (public/private), and scan status (not scanned / scanning / ready)

**Given** a previously fetched repository list
**When** the cache is still valid (< 60s)
**Then** the cached list is returned without a GitHub API call (`unstable_cache` with `repos-{userId}` tag)

**Given** the user selects a repository with status "ready"
**When** they proceed
**Then** they are taken to the issue creation flow for that repository

**Given** the user selects a repository with status "not scanned"
**When** they proceed
**Then** a scan is triggered and they see the `RepoScanProgress` component before proceeding

---

### Story 3.2: Manual Repository Add

As an authenticated user,
I want to add a repository by typing its owner/repo slug,
So that I can work with repositories not visible in my GitHub list (e.g. org repos).

**Acceptance Criteria:**

**Given** the repository list screen
**When** the user clicks "Add repository manually"
**Then** an input field appears accepting `owner/repo` format

**Given** the user submits a valid `owner/repo` slug
**When** the server action verifies access via Octokit
**Then** the repository is added to the `repos` table and appears in the list

**Given** the user submits a slug for a repository they don't have access to
**When** Octokit returns 404 or 403
**Then** an inline error is shown: "Repository not found or you don't have access"

**Given** the user submits an invalid slug format
**When** validated client-side
**Then** an inline error is shown before the server action is called

---

### Story 3.3: Initial Repository Scan

As an authenticated user,
I want to trigger a background scan of a repository to build its code index,
So that the AI can ask code-aware questions when creating issues.

**Acceptance Criteria:**

**Given** a repository with `scanStatus = 'not_scanned'`
**When** the user initiates a scan (manually or automatically on first select)
**Then** a pg-boss job is enqueued and `scanStatus` is set to `'scanning'`

**Given** the scan job runs in the worker process
**When** complete
**Then** the repository's code index is populated in the `repo_files` table (one row per indexed file with `filePath`, `content`, `sha`); `scanStatus` is set to `'ready'`; `lastScannedAt` is updated

**Given** the scan completes
**When** the user is on the scan progress screen
**Then** they are automatically redirected to the issue creation flow

---

### Story 3.4: Real-Time Scan Progress

As an authenticated user,
I want to see real-time progress while my repository is being scanned,
So that I know the scan is working and how long it will take.

**Acceptance Criteria:**

**Given** a repository with `scanStatus = 'scanning'`
**When** the `RepoScanProgress` component is mounted
**Then** it begins polling `GET /api/scan-status/[jobId]` every 2s (NFR4)

**Given** the polling response
**When** it includes a `progress` percentage and `statusMessage`
**Then** the progress bar and status text update accordingly

**Given** `prefers-reduced-motion` is set in the OS
**When** the progress bar animates
**Then** animations are suppressed

**Given** the scan completes (`state: 'completed'`)
**When** the next poll response arrives
**Then** polling stops and the user is redirected or a "Ready" state is shown

---

### Story 3.5: Re-Scan Repository

As an authenticated user,
I want to trigger a fresh scan of a previously indexed repository,
So that the code index reflects recent changes to the codebase.

**Acceptance Criteria:**

**Given** a repository with `scanStatus = 'ready'`
**When** the user clicks "Re-scan"
**Then** the existing code index rows in `repo_files` for this repository are cleared, `scanStatus` is set to `'scanning'`, a new pg-boss job is enqueued, and the scan progress UI is shown

**Given** the re-scan job runs
**When** complete
**Then** the code index in `repo_files` is replaced with fresh entries and `lastScannedAt` is updated

---

### Story 3.6: Scan Failure Handling

As an authenticated user,
I want to see a clear error and retry option if a scan fails,
So that I can recover without losing my repository selection.

**Acceptance Criteria:**

**Given** a scan job that fails (GitHub API error, rate limit, or worker crash)
**When** the pg-boss job transitions to `'failed'`
**Then** `scanStatus` is set to `'failed'` in the `repos` table

**Given** `scanStatus = 'failed'`
**When** the `RepoScanProgress` component detects this (via polling)
**Then** it shows an actionable error message with a "Retry scan" button (NFR23, NFR25)

**Given** the user clicks "Retry scan"
**When** the action runs
**Then** a new pg-boss job is enqueued and the progress UI resets (FR44 — no loss of repository selection)

---

### Story 3.7: Remove Repository

As an authenticated user,
I want to remove a repository from Spekd,
So that I can declutter my repository list and remove data I no longer need.

**Acceptance Criteria:**

**Given** a repository in the user's list
**When** the user clicks "Remove"
**Then** a confirmation dialog appears

**Given** the user confirms removal
**When** the server action runs
**Then** the repository row and its associated code index rows in `repo_files` are deleted from the `repos` table; no issues are deleted (they remain in history)

**Given** the user is currently on the issue creation flow for the removed repository
**When** removal completes
**Then** they are redirected to the repository selection screen

---

## Epic 4: AI Clarification Loop

Implement the always-on, code-index-aware, role-adapted clarification loop: the AI asks up to 3 questions before generating an issue. Each question appears in a `ClarificationCard`, receives focus on mount, and the AI uses both the code index and the user's role when formulating questions.

### Story 4.1: Initiate Clarification Loop

As an authenticated user with a scanned repository,
I want to start the issue creation flow and receive the first clarifying question,
So that the AI can gather the context it needs to write a high-quality issue.

**Acceptance Criteria:**

**Given** a user with a selected, scanned repository
**When** they click "Create Issue"
**Then** they are taken to the clarification screen and the first `ClarificationCard` is rendered with the AI's first question within ≤ 3s (NFR6)

**Given** the clarification screen
**When** rendered
**Then** focus moves programmatically to the first `ClarificationCard`'s input (NFR20)

**Given** the AI generates the first question
**When** it is displayed
**Then** `aria-live="polite"` announces the new question to screen readers

---

### Story 4.2: Up to 3 Clarifying Questions

As an authenticated user,
I want the AI to ask up to 3 clarifying questions in sequence,
So that my issue is well-defined before generation begins.

**Acceptance Criteria:**

**Given** the user answers question 1
**When** they submit (button click or `Cmd+Enter`)
**Then** question 2 appears as a new `ClarificationCard` within ≤ 3s; focus moves to the new card's input

**Given** the user answers question 2
**When** they submit
**Then** question 3 appears as a new `ClarificationCard` within ≤ 3s; focus moves to the new card's input

**Given** the user answers question 3
**When** they submit
**Then** the clarification loop ends and the "Generate Issue" button becomes active; no further questions are asked

**Given** any question in the flow
**When** the user presses `Cmd+Enter` in the `IssueTextarea`
**Then** the answer is submitted (NFR19)

**Given** previous `ClarificationCard`s
**When** a new question appears
**Then** previous cards remain visible and read-only (for context), and the new card is at the bottom of the list

---

### Story 4.3: Code-Index-Aware Questions

As an authenticated user,
I want the AI's questions to reference the actual structure of my codebase,
So that the questions are specific and relevant rather than generic.

**Acceptance Criteria:**

**Given** a repository with a populated code index in `repo_files`
**When** the AI generates a clarifying question
**Then** the code index (cached with 5min TTL, tagged `index-{repoId}`) is included in the AI system prompt

**Given** a repository with code index describing a React + TypeScript codebase
**When** the AI asks about a bug
**Then** the question references relevant files, components, or patterns from the code index (e.g. "Which component in `src/components/` is affected?")

---

### Story 4.4: Role-Adapted Questions

As an authenticated user,
I want the AI's question style to match my technical level,
So that the questions feel natural and relevant to how I work.

**Acceptance Criteria:**

**Given** a user with role "non-developer" (`is_developer = false`)
**When** the AI generates clarifying questions
**Then** questions use plain language, avoid jargon, focus on user impact and business context, and include brief context clues

**Given** a user with role "developer" (`is_developer = true`)
**When** the AI generates clarifying questions
**Then** questions are precise, technical, and may reference specific files, components, or patterns from the code index

**Given** the role is set
**When** any AI call is made
**Then** the role is passed in the system prompt and `data-persona` is present on `<body>`

---

### Story 4.5: Answers Incorporated into Generation

As an authenticated user,
I want all my clarification answers to be used when the issue is generated,
So that the generated issue reflects everything I've told the AI.

**Acceptance Criteria:**

**Given** the user has answered all 3 clarifying questions
**When** issue generation is triggered
**Then** all 3 question-answer pairs are included in the generation prompt as structured context

**Given** the generation prompt
**When** reviewed
**Then** it contains: user role (developer/non-developer), code index summary, all Q&A pairs, selected template type

---

## Epic 5: AI Issue Generation

Generate a structured, streamed, templated GitHub issue using the Vercel AI SDK. The issue streams token-by-token via SSE to the `StreamingIssueRenderer`, applies the selected template, includes role-aware Technical Notes, and is labelled with "AI-assisted".

### Story 5.1: Structured Issue Output

As an authenticated user,
I want the generated issue to have title, body, labels, and milestone fields,
So that the issue is immediately ready for review and submission.

**Acceptance Criteria:**

**Given** the generation completes
**When** the full issue is assembled
**Then** it contains: `title` (string), `body` (markdown string with required sections), `labels` (string array), `milestone` (string or null)

**Given** the issue body
**When** rendered via `react-markdown` + `remark-gfm`
**Then** all markdown formatting (headers, lists, code blocks) renders correctly in the `GeneratedIssuePanel`

---

### Story 5.2: Role-Aware Technical Notes

As an authenticated user,
I want the generated issue to include a Technical Notes section tailored to my role,
So that the notes are useful and relevant to how I think about problems.

**Acceptance Criteria:**

**Given** a user with role "developer" (`is_developer = true`)
**When** the issue is generated
**Then** Technical Notes include: affected files/modules, suggested implementation approach, potential side-effects, complexity estimate, and relevant API contracts

**Given** a user with role "non-developer" (`is_developer = false`)
**When** the issue is generated
**Then** Technical Notes include: plain-language explanation of the problem, user impact summary, and concept-level description of the affected area without file paths or code references

---

### Story 5.3: Template Applied at Generation

As an authenticated user,
I want to choose a template (Bug Report, Feature Request, Technical Debt) before generating,
So that the generated issue follows the structure appropriate for the issue type.

**Acceptance Criteria:**

**Given** the template selection UI (before or at the start of the clarification loop)
**When** rendered
**Then** the 3 built-in templates are shown with name and brief description

**Given** the user selects "Bug Report"
**When** the issue is generated
**Then** the body includes sections: Summary, Steps to Reproduce, Expected Behaviour, Actual Behaviour, Technical Notes; title format is `[Bug]: [description] in [Component]`

**Given** the user selects "Feature Request"
**When** the issue is generated
**Then** the body includes sections: Summary, User Story, Acceptance Criteria, Technical Notes; title format is `[Feature]: [description]`

**Given** the user selects "Technical Debt"
**When** the issue is generated
**Then** the body includes sections: Summary, Current State, Desired State, Impact, Technical Notes; title format is `[Tech Debt]: [description] in [Component]`

**Given** no template is explicitly selected
**When** generation proceeds
**Then** "Bug Report" is used as the default

---

### Story 5.4: Streaming Generation via SSE

As an authenticated user,
I want to see the issue being written in real time,
So that I have immediate feedback that generation is working.

**Acceptance Criteria:**

**Given** the user triggers issue generation
**When** the `POST /api/generate` route handler starts
**Then** the first token arrives in the `StreamingIssueRenderer` within ≤ 5s (NFR3)

**Given** the `StreamingIssueRenderer`
**When** tokens arrive
**Then** they are appended incrementally and `aria-live="polite"` announces updates to screen readers

**Given** `prefers-reduced-motion` is set
**When** new tokens appear
**Then** no typewriter or fade animations run

**Given** the Vercel AI SDK `streamText`
**When** the provider is Anthropic or OpenAI (determined by the user's stored BYOK provider)
**Then** the correct provider adapter is used with no code changes required (NFR16, NFR28)

---

### Story 5.5: AI-Assisted Badge

As an authenticated user,
I want issues I generate with Spekd to be clearly labelled as AI-assisted,
So that my team knows the issue was AI-generated and can review it accordingly.

**Acceptance Criteria:**

**Given** any issue generated by Spekd
**When** the labels array is assembled
**Then** the label `"ai-assisted"` is always included regardless of template or role

**Given** the generated issue is submitted to GitHub (Epic 6)
**When** the GitHub API creates the issue
**Then** the `"ai-assisted"` label is present on the created issue

---

## Epic 6: Issue Review & GitHub Submission

Let users review the generated issue in a `GeneratedIssuePanel`, edit all fields, submit to GitHub, see a confirmation with a link, and retry on failure without losing their edits.

### Story 6.1: Review Generated Issue

As an authenticated user,
I want to review the fully generated issue before submitting it to GitHub,
So that I can catch any AI errors or make adjustments before the issue is public.

**Acceptance Criteria:**

**Given** generation is complete
**When** the user is on the review screen
**Then** the `GeneratedIssuePanel` shows: title, body (rendered via `react-markdown` + `remark-gfm`), labels (as chips), and milestone (if any)

**Given** the review screen
**When** rendered with a screen reader
**Then** all issue sections (title, body, labels, milestone) are announced correctly and navigable by heading structure (NFR22)

---

### Story 6.2: Edit All Issue Fields

As an authenticated user,
I want to edit the title, body, labels, and milestone before submitting,
So that I can refine the AI output to match my team's exact requirements.

**Acceptance Criteria:**

**Given** the review screen
**When** the user clicks the title
**Then** the title becomes an editable `IssueTextarea`

**Given** the review screen
**When** the user clicks the body
**Then** the body becomes an editable `IssueTextarea` with a live markdown preview toggle

**Given** the user edits labels
**When** they type in the labels field
**Then** existing labels are shown as removable chips and new labels can be added

**Given** the user has edited fields
**When** they press `Cmd+Enter`
**Then** the issue is submitted with the edited values (NFR19)

---

### Story 6.3: Submit to GitHub

As an authenticated user,
I want to submit the reviewed issue directly to GitHub,
So that I don't have to copy-paste anything manually.

**Acceptance Criteria:**

**Given** the user clicks "Submit to GitHub"
**When** the server action runs
**Then** `POST /repos/{owner}/{repo}/issues` is called via Octokit with the title, body, labels, and milestone

**Given** the submission
**When** the Octokit call uses `@octokit/plugin-retry`
**Then** transient 5xx errors are retried with exponential back-off before failing (NFR27)

**Given** a successful submission
**When** the GitHub API returns 201
**Then** the issue URL and number are stored in the `issues` table and the confirmation screen is shown

---

### Story 6.4: Confirmation with GitHub Link

As an authenticated user,
I want to see a confirmation with a direct link to my newly created GitHub issue,
So that I can immediately navigate to it or share it with my team.

**Acceptance Criteria:**

**Given** a successful GitHub submission
**When** the confirmation screen renders
**Then** it shows: "Issue created successfully", the issue title, and a clickable link to the GitHub issue URL (opens in new tab)

**Given** the confirmation screen
**When** rendered
**Then** a "Create another issue" button is present that returns to the repository selection screen

---

### Story 6.5: Submission Failure Handling

As an authenticated user,
I want to see a clear error and retry option if GitHub submission fails,
So that I don't lose my work if there's a temporary API error.

**Acceptance Criteria:**

**Given** the Octokit submission call fails after retries
**When** the error is returned to the client
**Then** an actionable error message is shown: the error type (rate limit / auth / server error) and a "Retry" button (NFR23)

**Given** the user clicks "Retry"
**When** the submission is retried
**Then** all previously edited field values are preserved (FR44)

**Given** a 401/403 from GitHub
**When** the error is shown
**Then** the message explains that re-authentication may be required and provides a "Re-authenticate" link

---

## Epic 7: Issue History & Privacy

Store all generated issues privately per user. Provide a history view in settings. Allow data deletion. Enforce strict multi-tenant isolation at every query.

### Story 7.1: Private Issue Storage

As an authenticated user,
I want my generated issues stored privately in Spekd,
So that I can refer back to them and they are not accessible to other users.

**Acceptance Criteria:**

**Given** an issue is generated and/or submitted
**When** the server action saves it
**Then** a row is inserted into the `issues` table with `userId` set to the authenticated user's ID

**Given** any query to the `issues` table
**When** reviewed
**Then** every query includes `WHERE user_id = :userId` from the verified session (FR35, NFR10)

**Given** two different users
**When** either queries the `issues` table
**Then** they see only their own issues; no cross-user data is ever returned

---

### Story 7.2: View Issue History

As an authenticated user,
I want to view my previously generated issues from the settings area,
So that I can reference past work and track what Spekd has helped me create.

**Acceptance Criteria:**

**Given** an authenticated user visits `/settings/history`
**When** the page loads
**Then** a list of their generated issues is shown, ordered by `createdAt` descending, with: title, repository, creation date, and a link to the GitHub issue (if submitted)

**Given** the issue list
**When** there are no issues
**Then** an empty state is shown: "No issues created yet. Create your first issue!"

**Given** the user clicks an issue in the history list
**When** the detail view opens
**Then** the full title, body, labels, and milestone are shown (read-only)

---

### Story 7.3: Data Deletion (Account-Level)

As an authenticated user,
I want all my issue history deleted when I delete my account,
So that no personal data persists after I leave.

**Acceptance Criteria:**

**Given** the user confirms account deletion (Story 2.6)
**When** the deletion transaction runs
**Then** all rows in the `issues` table for this `userId` are deleted as part of the same atomic transaction

**Given** the deletion transaction
**When** it completes
**Then** a subsequent query to `issues` for the deleted `userId` returns zero rows

---

## Epic 8: Marketing & Landing Page

Build a public-facing, SSR-rendered, SEO-optimised landing page with an interactive demo of the clarification loop, a GitHub OAuth CTA, and full Open Graph meta tags.

### Story 8.1: Landing Page

As a prospective user,
I want to land on a page that clearly explains what Spekd does,
So that I can quickly understand the value and decide whether to sign up.

**Acceptance Criteria:**

**Given** a visitor arrives at `/`
**When** the page loads
**Then** it is server-side rendered (Next.js App Router `page.tsx` with no `'use client'` at the page level) and achieves LCP ≤ 2.5s, FID ≤ 100ms, CLS ≤ 0.1 (NFR1)

**Given** the landing page
**When** rendered
**Then** it includes: headline, value proposition copy, feature highlights, the demo section (Story 8.2), and the CTA section (Story 8.3)

**Given** an already-authenticated user visits `/`
**When** the page loads
**Then** they are redirected to `/dashboard`

---

### Story 8.2: Interactive Demo of Clarification Loop

As a prospective user,
I want to see the AI clarification loop in action without signing in,
So that I can experience the product's core value before committing.

**Acceptance Criteria:**

**Given** the demo section on the landing page
**When** the user scrolls to it or clicks "See how it works"
**Then** an animated/interactive walkthrough of the 3-question clarification loop plays with example questions and answers

**Given** `prefers-reduced-motion` is set
**When** the demo is shown
**Then** animations are replaced with static states or a slide-based (no motion) presentation

**Given** the demo
**When** rendered
**Then** it is keyboard-navigable (next/previous controls accessible via Tab + Enter)

---

### Story 8.3: GitHub OAuth CTA

As a prospective user,
I want a prominent "Sign in with GitHub" button on the landing page,
So that the path from interest to sign-up is frictionless.

**Acceptance Criteria:**

**Given** the landing page
**When** rendered
**Then** a "Sign in with GitHub" button is visible above the fold and repeated in the footer/CTA section

**Given** the user clicks "Sign in with GitHub"
**When** the OAuth flow initiates
**Then** they are redirected to GitHub's OAuth consent screen

**Given** the button
**When** focused via keyboard
**Then** it has a visible focus ring meeting 4.5:1 contrast (NFR21)

---

### Story 8.4: SSR & SEO Meta Tags

As a prospective user (or search engine),
I want the landing page to have complete meta tags and structured data,
So that the page ranks well and previews correctly when shared on social media.

**Acceptance Criteria:**

**Given** the landing page's `<head>`
**When** rendered server-side
**Then** it includes: `<title>`, `<meta name="description">`, `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

**Given** the page
**When** rendered by Next.js on the server
**Then** all meta tags are present in the initial HTML response (not injected client-side)

---

## Epic 9: Error Handling & Resilience

Ensure every error state — GitHub API failures, AI provider errors, mid-stream interruptions, and submission failures — is visible, actionable, and retryable without losing user context.

### Story 9.1: GitHub API Error Handling

As an authenticated user,
I want clear, actionable error messages for all GitHub API failures,
So that I know what went wrong and what to do next.

**Acceptance Criteria:**

**Given** a GitHub API call that returns 401
**When** the error is surfaced
**Then** the message is: "Your GitHub session has expired. Please re-authenticate." with a "Re-authenticate" button

**Given** a GitHub API call that hits rate limits (429)
**When** the error is surfaced
**Then** `@octokit/plugin-retry` retries automatically; if retries are exhausted, the message shows: "GitHub rate limit reached. Please wait X minutes and try again." (NFR27)

**Given** a GitHub API call that returns 404
**When** the error is surfaced
**Then** the message is contextual: "Repository not found. It may have been deleted or you may no longer have access."

**Given** any GitHub API error
**When** surfaced
**Then** it is never a blank screen or unhandled exception; the `Result<T, AppError>` pattern ensures the error reaches the UI (FR43)

---

### Story 9.2: AI Provider Error Handling

As an authenticated user,
I want clear, actionable error messages for all AI provider failures,
So that I can fix the issue (e.g. invalid API key) without contacting support.

**Acceptance Criteria:**

**Given** an AI call that fails due to an invalid API key
**When** the error is surfaced
**Then** the message is: "Your API key appears to be invalid. Please update it in Settings." with a link to `/settings`

**Given** an AI call that fails due to quota exceeded
**When** the error is surfaced
**Then** the message is: "Your API quota has been exceeded. Please check your account at [provider] or update your key."

**Given** an AI call that times out (NFR30)
**When** the error is surfaced
**Then** the message is: "The AI request timed out. Please try again."

**Given** all AI calls
**When** configured
**Then** they have explicit timeouts set via the Vercel AI SDK (NFR30)

---

### Story 9.3: Mid-Stream Failure Handling

As an authenticated user,
I want to be able to retry issue generation if the stream is interrupted,
So that I don't lose my clarification answers and have to start over.

**Acceptance Criteria:**

**Given** a streaming generation that is interrupted (network drop, provider error)
**When** the `StreamingIssueRenderer` detects the stream has ended prematurely (incomplete issue structure)
**Then** an error state is shown with: "Generation was interrupted. Retry to continue." and a "Retry" button (NFR24)

**Given** the user clicks "Retry"
**When** the generation restarts
**Then** all 3 clarification Q&A pairs and the repository context are re-sent; the user does not re-answer any questions (FR44)

**Given** the retry generation
**When** it succeeds
**Then** the `StreamingIssueRenderer` renders the new stream from the beginning

---

### Story 9.4: No Silent Failures

As an authenticated user,
I want every error to be visible with an actionable next step,
So that I'm never left staring at a blank or stuck screen.

**Acceptance Criteria:**

**Given** any server action in the codebase
**When** it returns an error
**Then** the error is of type `AppError` with `code`, `message`, and optional `retryable: boolean` fields

**Given** any server action that returns `{ error: AppError }`
**When** the client component receives it
**Then** it renders a visible error UI with at minimum: the error message and a suggested next action (NFR23)

**Given** any page or component in a loading state
**When** the data fetch fails
**Then** an error boundary catches it and renders the error UI (never a blank page) (NFR26)

**Given** `axe-core` running in dev mode
**When** an error UI is rendered
**Then** no new accessibility violations are introduced

---

### Story 9.5: Retry Without Losing Work

As an authenticated user,
I want all retry actions to preserve my previously entered context,
So that errors are a minor inconvenience rather than a workflow reset.

**Acceptance Criteria:**

**Given** a failed scan and a user retrying
**When** the retry action runs
**Then** the repository selection, role preference, and template choice are all preserved

**Given** a failed GitHub submission and a user retrying
**When** the retry action runs
**Then** the title, body, labels, and milestone edits are all preserved (FR44)

**Given** a failed mid-stream generation and a user retrying
**When** the retry action runs
**Then** all 3 Q&A pairs are re-sent to the AI (Story 9.3)

**Given** a failed AI call during the clarification loop
**When** the retry action runs
**Then** the previous answers are preserved and only the failed question is re-requested

---

## Build Phase 2 — Product Phase 0 (PLAN) & Teams *(future — do not implement in MVP)*

> **Note:** Epics 10–13 are planned for Build Phase 2, after the MVP (Epics 1–9) is complete and validated. They implement Product Phase 0 (PLAN) and Team Collaboration. The implementation sequence follows the architecture doc: team service → schema → adapter interface → BMAD adapter → orchestrator → team routes → project routes → auth guard extension.

---

## Epic 10: Planning Method Infrastructure

Establish the pluggable planning method abstraction layer. Define the `PlanningMethodAdapter` TypeScript interface, implement the BMAD Method as the first adapter, and create the planning workflow initiation flow where users select a planning method and provide their initial product idea.

### Story 10.1: Planning Method Adapter Interface

As a developer,
I want a `PlanningMethodAdapter` TypeScript interface defined in `src/lib/planning/adapter-interface.ts`,
So that planning methods can be added without changes to the core platform.

**Acceptance Criteria:**

**Given** `src/lib/planning/adapter-interface.ts` exists
**When** reviewed
**Then** it defines: `PlanningStep` (id, name, description, inputArtifactTypes, outputArtifactType, order), `ArtifactType` ('prd' | 'architecture' | 'ux_spec' | 'epics' | 'stories'), and `PlanningMethodAdapter` (id, name, getSteps(), executeStep(), getArtifactTypes(), validateArtifact())

**Given** the `PlanningMethodAdapter` interface
**When** a new planning method needs to be added
**Then** only a new adapter implementation in `src/lib/planning/adapters/` is required — no changes to orchestrator, routes, or UI (NFR31)

**Given** the interface
**When** `executeStep()` is called
**Then** it returns `Result<string>` using the same `Result<T, AppError>` pattern as the rest of the codebase

---

### Story 10.2: BMAD Method Adapter

As a developer,
I want the BMAD Method implemented as a `PlanningMethodAdapter` in `src/lib/planning/adapters/bmad/`,
So that users can use the BMAD planning method to generate structured planning artifacts.

**Acceptance Criteria:**

**Given** `src/lib/planning/adapters/bmad/index.ts` exists
**When** `getSteps()` is called
**Then** it returns the BMAD planning steps in order: PRD → Architecture → UX Spec → Epics → Stories

**Given** the BMAD adapter
**When** `executeStep('prd', context)` is called with a product idea and clarification answers
**Then** it generates a PRD using BMAD-specific prompt templates from `src/lib/planning/adapters/bmad/prompts.ts` and the user's AI provider (BYOK)

**Given** the BMAD adapter
**When** `validateArtifact('prd', content)` is called
**Then** it validates the artifact has the required BMAD sections and structure, returning `Result<ValidationResult>`

**Given** the BMAD Method's MIT license
**When** the adapter references BMAD prompts or workflows
**Then** proper attribution is included in the adapter source code

---

### Story 10.3: Planning Workflow Initiation

As an authenticated user,
I want to start a guided planning workflow by selecting a planning method and describing my product idea,
So that I can go from a raw idea to structured planning artifacts.

**Acceptance Criteria:**

**Given** an authenticated user on the dashboard
**When** they click "Start Planning" (or equivalent CTA)
**Then** they see a planning method selection screen listing available methods (initially: BMAD Method)

**Given** the user selects a planning method
**When** they proceed
**Then** they see a text input for their initial product idea with contextual guidance ("Describe your product idea in a few sentences")

**Given** the user submits their product idea
**When** the server action runs
**Then** a `projects` record is created (with `planningMethodId` set to the selected method), and the user is redirected to the planning workflow screen

**Given** a user who is not a developer (`is_developer = false`)
**When** the planning initiation flow renders
**Then** all guidance text uses plain, non-technical language

---

## Epic 11: Planning Workflow & Artifact Generation

Implement the guided planning workflow orchestrator, artifact generation with AI, artifact review/editing, and versioned artifact storage. Users step through each planning phase, with the AI generating artifacts that can be reviewed and iterated upon before moving to the next step.

### Story 11.1: Planning Workflow Orchestrator

As an authenticated user,
I want to be guided through each planning step in the correct order,
So that I produce all required planning artifacts systematically.

**Acceptance Criteria:**

**Given** `src/lib/planning/orchestrator.ts` exists
**When** a planning workflow is started
**Then** the orchestrator calls `adapter.getSteps()` and presents steps in order, tracking which steps are complete

**Given** the planning workflow screen
**When** rendered
**Then** a step indicator shows all planning steps (e.g. "Step 2 of 5: Architecture") with completed steps checked and the current step highlighted

**Given** a step that depends on a previous step's output (e.g. Architecture depends on PRD)
**When** the user tries to skip ahead
**Then** the dependent step is disabled with a tooltip explaining the prerequisite

**Given** the user completes a step
**When** the artifact is generated and reviewed
**Then** they are advanced to the next step automatically, with the completed step marked as done

---

### Story 11.2: Artifact Generation with AI

As an authenticated user,
I want each planning step to generate an artifact using AI,
So that I get structured, professional planning documents without needing to write them from scratch.

**Acceptance Criteria:**

**Given** the user is on a planning step (e.g. "Generate PRD")
**When** they click "Generate"
**Then** the orchestrator calls `adapter.executeStep(stepId, context)` with: product idea, user role, all previously generated artifacts as context, and any clarification answers

**Given** artifact generation
**When** the AI generates content
**Then** it streams token-by-token via SSE to the UI (reusing the `StreamingIssueRenderer` pattern from Epic 5)

**Given** artifact generation completes
**When** the adapter's `validateArtifact()` is called on the result
**Then** validation errors (if any) are shown inline with a "Regenerate" option

**Given** the user's AI provider (BYOK)
**When** any planning AI call is made
**Then** the same Vercel AI SDK provider abstraction from Epic 5 is used (NFR16, NFR28)

---

### Story 11.3: Artifact Review & Editing

As an authenticated user,
I want to review, edit, and iterate on each generated planning artifact,
So that I can refine the AI output before finalizing and moving to the next step.

**Acceptance Criteria:**

**Given** an artifact has been generated
**When** the review screen renders
**Then** the artifact content is shown in a Markdown preview (using `react-markdown` + `remark-gfm`) with an "Edit" toggle that switches to a raw Markdown editor

**Given** the user edits the artifact
**When** they click "Save"
**Then** a new version is created in the `planning_artifacts` table (version incremented) and the previous version is preserved

**Given** the user is unsatisfied with the artifact
**When** they click "Regenerate"
**Then** the AI regenerates the artifact with the same context; previous versions are still accessible

**Given** the user finalizes the artifact
**When** they click "Finalize & Continue"
**Then** the artifact is marked as finalized, the step is marked complete, and they advance to the next step

---

### Story 11.4: Planning Artifact Storage

As a developer,
I want planning artifacts stored in a versioned `planning_artifacts` table,
So that artifact history is preserved and artifacts can be retrieved for context injection.

**Acceptance Criteria:**

**Given** the `planning_artifacts` table exists
**When** reviewed
**Then** it has columns: `id`, `projectId`, `userId`, `type` (prd | architecture | ux_spec | epics | stories), `content` (text/Markdown), `version` (integer), `createdAt`, `updatedAt`

**Given** an artifact is saved or regenerated
**When** the server action runs
**Then** a new row is inserted with `version` incremented from the previous latest version for that `projectId` + `type`

**Given** any query to the `planning_artifacts` table
**When** reviewed
**Then** every query includes `WHERE user_id = :userId` (or team-scoped equivalent) for multi-tenant isolation (NFR10)

**Given** artifact storage
**When** the storage volume is reviewed (NFR32)
**Then** content is stored as `text` (Markdown) — no binary blobs — enabling full-text search and diffing

---

## Epic 12: Phase 0 → Phase 1 Integration

Connect the planning phase to the issue creation phase. Planning context (artifacts, stories) flows into the AI clarification loop so that issues created in Phase 1 benefit from the structured planning done in Phase 0. Users can also create issues directly from Phase 0 stories.

### Story 12.1: Planning Context Injection

As an authenticated user who has completed Phase 0 planning,
I want my planning artifacts used as context when creating issues in Phase 1,
So that the AI asks smarter questions and generates more accurate issues.

**Acceptance Criteria:**

**Given** a user starts issue creation for a repository linked to a project with finalized planning artifacts
**When** the AI clarification loop begins
**Then** the relevant planning artifacts (PRD summary, architecture key decisions, relevant epic/story context) are included in the AI system prompt alongside the code index

**Given** planning context is injected
**When** the AI generates clarifying questions
**Then** the questions reference planning context where relevant (e.g. "Based on your PRD, the user registration feature requires email verification. Should this issue cover that?")

**Given** a repository without any linked project or planning artifacts
**When** issue creation begins
**Then** the Phase 1 flow works identically to the MVP — no planning context, no errors, fully standalone (FR48)

---

### Story 12.2: Issue Creation from Phase 0 Stories

As an authenticated user who has generated stories in Phase 0,
I want to create a GitHub issue directly from a planning story,
So that I can move from planning to execution without re-describing the work.

**Acceptance Criteria:**

**Given** the user is viewing their Phase 0 stories (in the epics/stories artifact)
**When** they click "Create Issue" on a specific story
**Then** they are taken to the Phase 1 issue creation flow with: the story's title, acceptance criteria, and epic context pre-loaded as initial context for the AI

**Given** the pre-loaded context
**When** the AI clarification loop runs
**Then** the AI's questions focus on implementation details and refinements rather than re-asking about requirements already defined in the story

**Given** the issue is generated and submitted
**When** the user returns to the planning view
**Then** the story shows a link to the created GitHub issue

---

## Epic 13: Team Workspaces & Collaboration

Implement team creation, member invitations, role-based access control (Owner/Admin/Member), shared repositories, shared planning artifacts, team-level default settings, and strict team data isolation.

### Story 13.1: Team Creation

As an authenticated user,
I want to create a team workspace,
So that I can collaborate with others on shared projects and repositories.

**Acceptance Criteria:**

**Given** an authenticated user on the dashboard
**When** they click "Create Team"
**Then** they see a form with: team name (required), team slug (auto-generated from name, editable, URL-safe, unique)

**Given** the user submits the form
**When** the server action runs
**Then** a `teams` row is created and a `team_members` row is created with the creator as `role = 'owner'`

**Given** the team is created
**When** the user is redirected to the team workspace
**Then** they see the team dashboard with empty states for projects, repositories, and members

---

### Story 13.2: Member Invitations

As a team owner or admin,
I want to invite members to my team by email or GitHub username,
So that my collaborators can access shared resources.

**Acceptance Criteria:**

**Given** the team settings page
**When** the owner/admin clicks "Invite Member"
**Then** they see an input accepting email address or GitHub username, and a role selector (Admin / Member — Owner cannot be assigned via invite)

**Given** an invitation is sent
**When** the invited user signs in (or is already signed in)
**Then** they see a notification with the team invitation and can accept or decline

**Given** the invited user accepts
**When** the server action runs
**Then** a `team_members` row is created with the selected role and `joinedAt` timestamp (NFR33 — completes within 2s)

**Given** a non-owner/non-admin user
**When** they try to invite members
**Then** the invite action is not available (FR52)

---

### Story 13.3: Role-Based Permissions

As a team owner,
I want team members to have appropriate permissions based on their role,
So that sensitive operations are restricted to authorized users.

**Acceptance Criteria:**

**Given** the roles Owner, Admin, Member
**When** permissions are enforced
**Then** the following matrix applies:
- **Owner**: all permissions + delete team + transfer ownership
- **Admin**: invite/remove members, manage repos, manage projects, configure team defaults
- **Member**: view shared repos, view shared artifacts, create issues in shared repos

**Given** `src/lib/teams/permissions.ts` exists
**When** any team-scoped server action runs
**Then** it calls the permission check before executing and returns `AppError` with code `FORBIDDEN` if unauthorized

**Given** auth guards
**When** extended for Build Phase 2
**Then** team-level RBAC works alongside existing user-level ownership without breaking Phase 1 flows

---

### Story 13.4: Shared Planning Artifacts

As a team member,
I want to view planning artifacts shared within my team workspace,
So that I have context on the product vision and plan when creating issues.

**Acceptance Criteria:**

**Given** a project within a team workspace has finalized planning artifacts
**When** any team member visits the project
**Then** they can view all finalized artifacts (PRD, Architecture, UX Spec, Epics, Stories) in read-only mode

**Given** a team admin or owner
**When** they view shared artifacts
**Then** they can also edit artifacts (creating new versions), while Members have read-only access (FR53)

**Given** artifact access
**When** queried
**Then** access is scoped to team membership — non-members cannot view team artifacts (FR56)

---

### Story 13.5: Shared Repositories

As a team admin or owner,
I want to add repositories to the team workspace,
So that team members can create issues against shared repositories.

**Acceptance Criteria:**

**Given** a team admin/owner on the team settings page
**When** they click "Add Repository"
**Then** they can select from their GitHub repositories or enter an `owner/repo` slug (same as Story 3.1/3.2 but scoped to team)

**Given** a repository is added to the team
**When** any team member visits the team workspace
**Then** they see the shared repository in the team's repository list and can create issues against it (FR54)

**Given** a repository added to a team
**When** linked to a project via `project_repos`
**Then** the project's planning context is available during issue creation for that repository

---

### Story 13.6: Team Default Settings

As a team owner,
I want to configure default settings for the team,
So that new members and projects start with consistent configuration.

**Acceptance Criteria:**

**Given** the team settings page
**When** the owner visits "Defaults" section
**Then** they can set: default AI provider (Anthropic/OpenAI), default issue template (Bug Report/Feature Request/Technical Debt), and default planning method (BMAD Method)

**Given** team defaults are set
**When** a team member starts a new planning workflow or issue creation within the team
**Then** the team defaults are pre-selected (but can be overridden per-session) (FR55)

**Given** a user who also has personal settings
**When** they work within a team context
**Then** team defaults take precedence over personal defaults for team projects

---

### Story 13.7: Team Data Isolation

As a platform operator,
I want strict data isolation between teams,
So that one team's data is never accessible to another team.

**Acceptance Criteria:**

**Given** any query to team-scoped tables (`teams`, `team_members`, `projects`, `project_repos`, `planning_artifacts`)
**When** reviewed
**Then** every query includes `WHERE team_id = :teamId` AND the requesting user's team membership is verified

**Given** two different teams
**When** a member of Team A queries projects, repos, or artifacts
**Then** they see only Team A's data; Team B's data is never returned (FR56)

**Given** team data isolation
**When** combined with user-level isolation (NFR10)
**Then** both isolation layers are enforced — team-scoped resources are filtered by team, personal resources are filtered by user

---

## Build Phase 3 — Product Phase 2 (BUILD) & Growth *(future — do not implement until Build Phase 2 is complete)*

> **Note:** Epics 14–15 are planned for Build Phase 3, after Build Phase 2 (Planning + Teams) is complete and validated. They implement Product Phase 2 (BUILD) and multi-platform expansion.

---

## Epic 14: Agentic Workflow Integration

Enable AI agents or developers to pick up created issues with full lifecycle context — planning artifacts, clarification Q&A, code index — and implement them. Track issue status across all three product phases.

### Story 14.1: Agentic Issue Assignment

As an authenticated user,
I want to assign created issues to AI agents or developers with full context attached,
So that implementers have everything they need to start working immediately.

**Acceptance Criteria:**

**Given** a submitted GitHub issue
**When** the user clicks "Assign to Agent" or "Assign to Developer"
**Then** the full context package is assembled: planning artifacts (if any), clarification Q&A pairs, code index summary, template structure, and issue content

**Given** an AI agent is assigned
**When** the agent starts implementation
**Then** it receives the full context package via a structured API and can reference planning decisions, architecture constraints, and UX specifications (FR57)

**Given** a developer is assigned
**When** they open the issue on GitHub
**Then** the issue body includes a "Context" section with links to relevant planning artifacts and a summary of the clarification loop

---

### Story 14.2: Cross-Phase Status Tracking

As an authenticated user,
I want to see the lifecycle status of my ideas across all phases,
So that I can track progress from idea to planning to issue to implementation.

**Acceptance Criteria:**

**Given** the project dashboard
**When** rendered
**Then** it shows a lifecycle view: ideas → planning artifacts → stories → issues → implementation status (FR58)

**Given** an issue that originated from a Phase 0 story
**When** the issue is updated on GitHub (closed, merged)
**Then** the status is reflected in the lifecycle view via GitHub webhook or polling

**Given** the lifecycle view
**When** the user clicks on any item
**Then** they can drill down to the relevant detail (planning artifact, issue, GitHub PR)

---

## Epic 15: Multi-Platform & Growth

Extend Spekd beyond GitHub to support Jira and Azure DevOps as issue targets. Add an analytics dashboard for usage insights.

### Story 15.1: Jira Integration

As an authenticated user,
I want to submit generated issues to Jira instead of (or in addition to) GitHub,
So that I can use Spekd with my team's existing project management tool.

**Acceptance Criteria:**

**Given** the user's account settings
**When** they configure a Jira connection
**Then** they provide a Jira instance URL and API token (encrypted with `crypto.ts`)

**Given** a Jira connection is configured
**When** the user reviews a generated issue
**Then** a "Submit to Jira" option appears alongside "Submit to GitHub"

**Given** the user submits to Jira
**When** the server action runs
**Then** the issue is created in the selected Jira project with title, description (mapped from body), labels, and a link back to Spekd

---

### Story 15.2: Azure DevOps Integration

As an authenticated user,
I want to submit generated issues to Azure DevOps,
So that I can use Spekd with Azure DevOps-based workflows.

**Acceptance Criteria:**

**Given** the user's account settings
**When** they configure an Azure DevOps connection
**Then** they provide an organization URL and personal access token (encrypted with `crypto.ts`)

**Given** an Azure DevOps connection is configured
**When** the user reviews a generated issue
**Then** a "Submit to Azure DevOps" option appears alongside other submission targets

**Given** the user submits to Azure DevOps
**When** the server action runs
**Then** a work item is created in the selected Azure DevOps project with title, description, and appropriate work item type mapping

---

### Story 15.3: Analytics Dashboard

As an authenticated user (or team owner),
I want to see usage analytics for my Spekd activity,
So that I can understand how the tool is being used and measure productivity.

**Acceptance Criteria:**

**Given** an authenticated user visits `/analytics` (or `/settings/analytics`)
**When** the page loads
**Then** they see: total issues created, issues by template type, issues by repository, average time from idea to issue, and a timeline chart of activity

**Given** a team owner views team analytics
**When** the page loads
**Then** they see aggregated team metrics: total issues across all members, most active repositories, and planning artifacts generated

**Given** the analytics data
**When** queried
**Then** all queries are scoped by `userId` (personal) or `teamId` (team) — no cross-tenant data leakage (NFR10)
