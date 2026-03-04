---
stepsCompleted: ['step-01-init', 'step-02-context', 'step-03-starter', 'step-04-decisions', 'step-05-patterns', 'step-06-structure', 'step-07-validation', 'step-08-complete']
inputDocuments: ['_bmad-output/planning-artifacts/prd.md', '_bmad-output/planning-artifacts/ux-design-specification.md']
workflowType: 'architecture'
lastStep: 8
status: 'complete'
project_name: 'spekd'
user_name: 'ChiaLung Liu'
date: '2026-03-03'
completedAt: '2026-03-03'
updatedAt: '2026-03-04'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

---

## Project Context Analysis

### Requirements Overview

**Functional Requirements (58 FRs across 11 domains):**

| Domain | FR Count | Architectural Weight | Build Phase |
|---|---|---|---|
| User Account & Onboarding | FR1–FR6 | Auth system, encrypted key storage, user lifecycle management | Build Phase 1 (MVP) |
| Repository Management | FR7–FR13 | GitHub API integration, background scan jobs, code index storage | Build Phase 1 (MVP) |
| AI Clarification Loop | FR14–FR18 | AI provider abstraction, prompt engineering, streaming state management | Build Phase 1 (MVP) |
| AI Issue Generation | FR19–FR23 | Streaming output, template engine, persona-aware generation | Build Phase 1 (MVP) |
| Issue Review & Submission | FR24–FR28 | GitHub issue write API, edit UI, optimistic submission | Build Phase 1 (MVP) |
| Issue Templates | FR29–FR30 | Template store, generation-time application | Build Phase 1 (MVP) |
| Issue History & Privacy | FR31–FR35 | Per-user private storage, data isolation enforcement, GDPR-adjacent controls | Build Phase 1 (MVP) |
| Marketing & Error Handling | FR36–FR44 | SSR landing page, SEO meta, graceful error surface across all flows | Build Phase 1 (MVP) |
| Planning Method & Phase 0 | FR45–FR50 | Planning method adapter pattern, artifact generation, workflow orchestration | Future — Build Phase 2 |
| Team Collaboration | FR51–FR56 | Team workspaces, invites, shared projects, role-based permissions | Future — Build Phase 2 |
| Phase 2 BUILD | FR57–FR58 | Agentic workflows, AI agents pick up and implement issues | Future — Build Phase 3 |

The **repo scan pipeline** (FR9–FR12) and the **AI clarification loop** (FR14–FR18) are the two highest-complexity functional domains — each requires coordinating multiple systems (GitHub API, background jobs, AI provider, streaming, database) in sequence.

**Non-Functional Requirements (34 NFRs — architecture-shaping):**

The NFRs are unusually specific and collectively define the architecture constraints:

- **Performance:** Streaming first token ≤ 5s (NFR3), clarification loop next question ≤ 3s (NFR6), app shell interactive ≤ 3s (NFR2) — rules out synchronous AI calls behind a loading spinner; requires streaming-first server architecture
- **Security:** Tokens and API keys encrypted at rest, never client-exposed (NFR7–NFR8); TLS everywhere (NFR9); strict multi-tenant DB isolation (NFR10); AI input sanitised for prompt injection (NFR12) — rules out client-side token handling entirely; requires server-side-only AI calls
- **Scalability:** 500 users / 50 concurrent sessions at MVP (NFR14); concurrent background scans non-blocking (NFR17); provider abstraction supports new AI providers without pipeline changes (NFR16)
- **Accessibility:** WCAG 2.1 AA across all screens (NFR18–NFR22); dynamic focus management as questions appear (NFR20)
- **Reliability:** No silent failures anywhere; one-click retry on any failed operation preserving user input (NFR24–NFR26); GitHub rate limit handling (NFR27); all external calls have timeouts (NFR30)
- **Extensibility & Future Phases (NFR31–NFR34):** Planning method adapter interface must be pluggable; team authorization must be additive to existing row-level ownership; Phase 1 (CREATE) must remain independently usable without project/team context

**Scale & Complexity Assessment:**

- **Complexity level: Medium** — not enterprise-scale, but the combination of background job infrastructure (code scan), streaming AI output, encrypted credential storage, and strict multi-tenant isolation lifts this clearly above a simple CRUD app
- **Primary domain:** Full-stack web app with significant server-side orchestration — Next.js App Router server actions and route handlers carry most of the architectural weight
- **Estimated architectural components:** ~12 distinct system components (auth, GitHub integration layer, repo scan job queue, code index store, AI provider abstraction, prompt engine, streaming pipeline, template engine, issue submission service, user data store, marketing SSR layer, error boundary system)

---

### Technical Constraints & Dependencies

**Mandated tech stack:**

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16.x App Router, TypeScript strict | Node.js runtime — no edge runtime (self-hosting requirement) |
| Auth | BetterAuth, GitHub OAuth | OAuth redirect URLs env-var configurable for GitHub Enterprise |
| Database | PostgreSQL | Neon for hosted SaaS; customer-provisioned for self-host. Connection string via env var |
| ORM | Drizzle ORM | Schema-first, type-safe, fully portable |
| AI SDK | Vercel AI SDK | Anthropic, OpenAI, Azure OpenAI, Ollama, AWS Bedrock all supported |
| GitHub API | Octokit | Base URL configurable via `GITHUB_API_BASE_URL` env var |
| Styling | Tailwind CSS v4 + shadcn/ui | Client-side only, no deployment dependency |
| Deployment | Docker Compose + Kubernetes manifests | Same image for all deployment targets |
| Package manager | pnpm | No change |

**Key constraints derived from the stack:**

- **No Vercel-proprietary primitives** — edge runtime, Vercel Queues, and Vercel KV are explicitly excluded. All route handlers use `export const runtime = 'nodejs'`. This is the foundational self-hosting constraint and it governs every infrastructure decision downstream.
- **PostgreSQL-backed job queue (pg-boss)** — background repo scans run via pg-boss, a battle-tested PostgreSQL job queue. Zero additional infrastructure for self-hosted customers; the job worker runs as a separate process from the same Docker image (`WORKER_MODE=true` env var). No Redis, no RabbitMQ, no external queue service.
- **Neon PostgreSQL for hosted SaaS** — Neon's serverless driver requires connection pooling. For self-hosted deployments, standard `pg` driver with a connection pool. The Drizzle adapter is configured per driver at boot.
- **Streaming via Node.js runtime** — Vercel AI SDK's `streamText` / `streamObject` work fully in Node.js server mode. Streaming is delivered to the client via standard HTTP streaming (Transfer-Encoding: chunked), compatible with any reverse proxy or load balancer.
- **GitHub API base URL configurable** — Octokit accepts a `baseUrl` option. `GITHUB_API_BASE_URL` defaults to `https://api.github.com`; GitHub Enterprise Server customers set it to their internal endpoint.
- **All four AI providers supported:** Anthropic and OpenAI via standard Vercel AI SDK providers; Azure OpenAI via `@ai-sdk/azure`; Ollama via its OpenAI-compatible API endpoint (`OLLAMA_BASE_URL` env var); AWS Bedrock via `@ai-sdk/amazon-bedrock`. Provider selection is resolved from the user's BYOK settings at runtime.

**External dependencies (hosted SaaS):**

- GitHub API (github.com or GHE)
- Anthropic / OpenAI / Azure OpenAI / AWS Bedrock / Ollama (user BYOK)
- Vercel platform (for hosted SaaS only — not a runtime dependency for self-hosted)

---

### Self-Hosting Architecture

**Deployment model:** Single codebase, environment-variable-driven. The same Docker image runs in three modes depending on env vars:

| Mode | Command / Env | Purpose |
|---|---|---|
| Web server | `next start` | Serves the Next.js application |
| Job worker | `WORKER_MODE=true node worker.js` | Processes background repo scan jobs via pg-boss |
| Both (small deploys) | Docker Compose single-container | Web + worker in one process for minimal infra |

**Docker Compose (small / single-server deployment):**
- `app` service: Next.js web server + pg-boss worker
- `postgres` service: standard PostgreSQL 16
- Single `.env` file for all configuration
- Exposed port 3000 (or configurable)

**Kubernetes (enterprise deployment):**
- `app` Deployment: Next.js web server, horizontally scalable
- `worker` Deployment: pg-boss worker, horizontally scalable (pg-boss handles distributed job locking)
- PostgreSQL via customer-managed instance or managed cloud service (RDS, Cloud SQL, etc.)
- ConfigMap + Secrets for environment configuration
- Helm chart published alongside Docker images

**Licensing:** Architecture keeps options open — a `LICENSE_KEY` env var is reserved in the configuration schema but not validated in MVP. Can be activated post-MVP without architectural changes.

**GitHub Enterprise Server support:**
- `GITHUB_API_BASE_URL` — Octokit base URL (e.g. `https://github.mycompany.com/api/v3`)
- `GITHUB_OAUTH_BASE_URL` — BetterAuth OAuth endpoint base (e.g. `https://github.mycompany.com`)
- Both default to github.com values if unset

---

### Cross-Cutting Concerns Identified

**1. Multi-tenant data isolation**
Every database query scoped to the authenticated user. Service layer functions are user-scoped by construction — no raw queries outside of typed service wrappers. Drizzle query helpers wrapped in user-scoped service functions make accidental cross-user access structurally impossible.

**2. Encrypted credential storage**
GitHub OAuth tokens and BYOK API keys encrypted before writing to the database; decrypted only within server-side service functions. A single `lib/crypto.ts` module wraps all credential I/O. Keys never serialised to client state or included in API responses.

**3. Error surfacing (no silent failures)**
Every external call (GitHub API, AI providers, pg-boss jobs) wrapped in a consistent error-handling layer that maps errors to user-facing messages and preserves in-progress work. This is an architectural requirement — enforced at the service layer, not left to individual route handlers.

**4. Streaming state management**
AI output streamed via HTTP chunked transfer from server actions / route handlers. Client handles partial content via Vercel AI SDK's `useChat` / `useCompletion` hooks. Accessible `aria-live` regions announce streamed content. Submit button disabled until stream completes.

**5. Background job architecture (pg-boss)**
Repo scan jobs enqueued via pg-boss; picked up by the worker process. Progress reported back to the client via polling (`/api/scan-status/[jobId]` route). Job failure, retry logic, and partial-result invalidation all handled within the job worker. Dead-letter handling surfaces failures to the user with actionable messages.

**6. AI provider abstraction**
Application-level `AIService` wraps Vercel AI SDK. Resolves provider from user's BYOK settings, decrypts API key server-side, applies persona-aware prompt construction, and returns a stream. Adding a new provider requires only a new branch in the provider resolver — no changes to the generation pipeline.

**7. Persona-aware prompt engineering**
User role setting (`developer` / `non-technical`) flows as a typed context parameter through the prompt engine. All prompt templates are parameterised by role — question generation, issue generation, and technical note formatting all branch on this value server-side.

**8. Deployment-mode configuration**
All environment-specific behaviour (database driver, GitHub base URL, AI provider endpoints, worker mode) is resolved at application boot from env vars. No runtime environment detection — explicit configuration only. A `config/env.ts` module validates and exposes all env vars with strong types (using `zod` for schema validation at boot). Missing required vars cause a loud startup failure, not a silent runtime error.

---

## Starter Template Evaluation

### Primary Technology Domain

Full-stack web application — Next.js App Router with server-side orchestration, background job processing, and streaming AI output.

### Starter Options Considered

| Option | Verdict | Reason |
|---|---|---|
| `create-next-app` | **Selected** | Official, minimal, current — configures exactly what the PRD mandates without extras to unpick |
| `create-t3-app` | Rejected | Includes tRPC (not needed); lags on Tailwind v4; adds complexity to remove |
| Custom scaffold | Rejected | No advantage — `create-next-app` arrives at the same place with less manual work |

### Selected Starter: `create-next-app`

**Rationale for Selection:**
The PRD mandates Next.js App Router, TypeScript strict, Tailwind CSS v4, and pnpm. `create-next-app` configures all of these with one command and no extraneous opinions. It is the canonical foundation — the architecture layers on top of it rather than around it.

**Initialization Command:**

```bash
pnpm create next-app@latest spekd \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --turbopack \
  --import-alias "@/*"
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript 5.x, strict mode — `tsconfig.json` with `"strict": true`
- Node.js runtime throughout — no edge runtime (`export const runtime = 'nodejs'` added to all route handlers post-init)
- Path alias `@/*` → `./src/*` — consistent import paths across the codebase

**Framework Structure:**
- Next.js 16.1.6 (latest), App Router
- `src/app/` — all routes
- `src/components/` — UI components
- `src/lib/` — server-side utilities and service layer
- `src/config/` — Zod-validated environment configuration (added post-init)

**Styling:**
- Tailwind CSS v4 — configured via `src/app/globals.css` (v4 CSS-first config)
- shadcn/ui added post-init: `pnpm dlx shadcn@latest init`

**Build Tooling:**
- Turbopack dev server — significantly faster HMR than Webpack
- `next build` outputs a Node.js server bundle (not static export)
- `output: 'standalone'` added to `next.config.ts` post-init for optimised Docker images

**Testing Framework:**
Not included by `create-next-app` — added post-init:
- Vitest for unit and integration tests
- Playwright for end-to-end tests

**Code Organisation (established post-init):**

```
src/
├── app/                    # Next.js App Router routes
│   ├── (auth)/             # Sign-in, sign-up (SSR)
│   ├── (marketing)/        # Landing page (SSR)
│   └── (app)/              # Authenticated app shell
│       ├── dashboard/
│       ├── issues/
│       └── settings/
├── components/
│   ├── ui/                 # shadcn/ui base components
│   └── spekd/              # Custom product components
├── lib/
│   ├── db/                 # Drizzle schema + client
│   ├── auth/               # BetterAuth configuration
│   ├── github/             # Octokit integration layer
│   ├── ai/                 # AI provider abstraction + prompt engine
│   ├── jobs/               # pg-boss worker + job definitions
│   └── crypto.ts           # Credential encryption/decryption
└── config/
    └── env.ts              # Zod-validated environment configuration
```

**Development Experience:**
- `pnpm dev` — Turbopack dev server with HMR
- `pnpm build` — production build
- `pnpm start` — production Node.js server
- `WORKER_MODE=true node src/lib/jobs/worker.js` — background job worker process

**Deployment:**
- `next.config.ts` output set to `standalone` — produces a minimal self-contained Docker image
- `Dockerfile` and `docker-compose.yml` added post-init
- Kubernetes Helm chart added alongside Docker Compose

**Package versions confirmed (2026-03-03):**

| Package | Version |
|---|---|
| `next` | 16.1.6 |
| `drizzle-orm` | 0.45.1 |
| `pg-boss` | 12.14.0 |

**Note:** Project initialization using the command above is the first implementation story.

---

## Core Architectural Decisions

### Decision Priority Analysis

**Already decided (not re-decided — from PRD, Step 2, Step 3):**
- Framework: Next.js 16.x App Router, TypeScript strict, Node.js runtime (no edge runtime)
- Auth: BetterAuth + GitHub OAuth
- Database: PostgreSQL + Drizzle ORM 0.45.1 (Neon for SaaS, customer-provisioned for self-host)
- AI SDK: Vercel AI SDK — Anthropic, OpenAI, Azure OpenAI, Ollama, AWS Bedrock
- Background jobs: pg-boss 12.14.0 (PostgreSQL-backed, zero additional infrastructure)
- Styling: Tailwind CSS v4 + shadcn/ui
- Deployment: Docker Compose + Kubernetes, single codebase env-var-driven
- GitHub integration: Octokit with configurable `GITHUB_API_BASE_URL`

**Critical Decisions (block implementation):**
- Code index storage: full text in PostgreSQL (MVP); pgvector deferred to Phase 2
- Session strategy: database sessions (required for multi-instance K8s + account deletion)
- API pattern: Server Actions for mutations, Route Handlers for streaming + polling
- Error handling: typed `Result<T, AppError>` discriminated union — no thrown errors across server/client boundary

**Important Decisions (shape architecture):**
- Caching: Next.js `unstable_cache` selectively (repo list, code index reads) — no Redis
- Client state: Vercel AI SDK hooks + React Context + Server Components — no external state library
- Authorization: row-level ownership enforced at service layer
- CI/CD: GitHub Actions + Vercel (SaaS) + GitHub Container Registry (self-hosted images)

**Deferred Decisions (post-MVP):**
- pgvector embeddings for semantic code search (Phase 2 — NFR15)
- External KMS for encryption key management (enterprise hardening)
- Redis or edge cache for high-scale deployments
- Licence key validation (architecture reserved; not activated in MVP)

---

### Data Architecture

**Code index storage: Full text in PostgreSQL (MVP)**
- File contents stored as `text` in a `repo_files` table scoped per user and repo
- Rationale: PRD explicitly defers embeddings/chunking to Phase 2 (NFR15). Simple, proven, zero extra dependencies. Migrating to `pgvector` in Phase 2 is a Drizzle schema migration — no architectural change.
- Table structure: `(id, userId, repoId, filePath, content, sha, indexedAt)` — `sha` allows diff-based re-indexing on re-scan

**Planning artifacts storage (Build Phase 2):**
- Planning artifacts stored in a `planning_artifacts` table: `(id, projectId, userId, type, content, version, createdAt, updatedAt)`
- Planning artifact types: `prd`, `architecture`, `ux_spec`, `epics`, `stories`
- Artifacts are versioned — each save creates a new version row; latest version is the active one
- Content stored as `text` (Markdown) — no binary blobs; allows full-text search and diffing

**Team data model (Build Phase 2):**
- New tables: `teams`, `team_members`, `projects`, `project_repos`
- `teams`: `(id, name, slug, ownerId, createdAt, updatedAt)` — slug is URL-safe unique identifier
- `team_members`: `(id, teamId, userId, role: 'owner' | 'admin' | 'member', invitedAt, joinedAt)`
- `projects`: `(id, teamId, name, description, planningMethodId, createdAt, updatedAt)` — nullable `teamId` for personal projects
- `project_repos`: `(id, projectId, repoId)` — links projects to repos
- The "project" concept is additive — Phase 1 (CREATE) continues to work repo-centric without any project context. Repos do not require a project wrapper.

**Caching: Next.js `unstable_cache` (selective)**
- GitHub repo list: 60s TTL per user — avoids redundant API calls on page navigation
- Code index reads: 5-minute TTL per repo — index changes only on re-scan
- No Redis, no external cache — keeps self-hosted deployment to zero extra services at MVP scale

**Migration strategy: Drizzle Kit**
- Development: `drizzle-kit push` for schema iteration
- Production: `drizzle-kit migrate` generates versioned SQL migration files
- Migrations run automatically at container startup via an init script — self-hosted customers receive schema upgrades on image update with no manual SQL

---

### Authentication & Security

**Session strategy: Database sessions (BetterAuth)**
- Sessions stored in PostgreSQL — supports revocation, works across multiple app instances
- Required for: Kubernetes horizontal scaling (shared session store), account deletion (FR6) that immediately invalidates all sessions
- BetterAuth handles session creation, refresh, and revocation natively

**Encryption: AES-256-GCM via Node.js `crypto`**
- `src/lib/crypto.ts` — single module for all credential I/O
- `ENCRYPTION_KEY` env var: 32-byte hex, validated at boot via Zod
- No external KMS for MVP — documented as a post-MVP hardening option for enterprise self-hosted customers
- GitHub tokens and BYOK API keys are encrypted before every DB write; decrypted only within server-side service functions; never serialised to client state

**Authorization: Row-level ownership at service layer**
- Every service function accepts `userId` as a required parameter and applies it as a `WHERE` filter
- `checkOwnership(userId, resourceId)` guard called before any mutating operation on user-owned resources
- No RBAC for MVP — single-user model; team RBAC is a Build Phase 2 concern

**Authorization: Team-level RBAC (Build Phase 2)**
- Row-level ownership extended to team-level RBAC. Service functions accept `userId` + optional `teamId` and check permissions via `team_members` table.
- Roles: `owner` (full control, delete team), `admin` (manage members, manage projects), `member` (view/edit projects they have access to)
- Authorization checks implemented in `src/lib/teams/permissions.ts` — centralised, not scattered across routes
- Phase 1 (CREATE) routes remain unaffected — they continue using `userId`-only ownership guards. Team RBAC is additive.

---

### Planning Method Adapter Architecture (Build Phase 2)

> **Note:** This section describes architecture planned for Build Phase 2. It is NOT implemented in Build Phase 1 (MVP). Agents should not implement any of this during Build Phase 1.

**Planning Method Adapter Interface:**

The planning system uses a pluggable adapter pattern. Each planning methodology (BMAD Method, Lean Canvas, etc.) implements a common `PlanningMethodAdapter` TypeScript interface.

```typescript
// src/lib/planning/adapter-interface.ts

interface PlanningStep {
  id: string
  name: string
  description: string
  inputArtifactTypes: ArtifactType[]
  outputArtifactType: ArtifactType
  order: number
}

type ArtifactType = 'prd' | 'architecture' | 'ux_spec' | 'epics' | 'stories'

interface PlanningMethodAdapter {
  /** Unique identifier for this planning method */
  id: string

  /** Human-readable name (e.g. "BMAD Method") */
  name: string

  /** Returns the ordered list of planning steps */
  getSteps(): PlanningStep[]

  /** Executes a single planning step, returning generated artifact content */
  executeStep(stepId: string, context: PlanningContext): Promise<Result<string>>

  /** Returns the artifact types this method produces */
  getArtifactTypes(): ArtifactType[]

  /** Validates an artifact of the given type */
  validateArtifact(type: ArtifactType, content: string): Promise<Result<ValidationResult>>
}
```

**BMAD Method Adapter:**
- First implementation of the `PlanningMethodAdapter` interface
- Licensed MIT — can be bundled directly
- Steps: Idea → PRD → Architecture → UX Spec → Epics → Stories
- Each step uses AI generation with BMAD-specific prompt templates
- Adapter code lives in `src/lib/planning/adapters/bmad/`

**Planning Orchestrator:**
- `src/lib/planning/orchestrator.ts` — manages the planning workflow lifecycle
- Loads the appropriate adapter based on user/team selection (stored in `projects.planningMethodId`)
- Coordinates step execution, artifact persistence, and progress tracking
- Uses the same `Result<T, AppError>` pattern as all other service functions
- Uses the same BYOK AI provider abstraction — no separate AI configuration

**Planning Artifact Storage:**
- Artifacts stored in the `planning_artifacts` table (defined in Data Architecture above)
- Each artifact is versioned — planning steps can be re-run to regenerate artifacts
- Artifacts are scoped to a project (and transitively to a user or team)

---

### API & Communication Patterns

**Server Actions for mutations:**
- Issue creation, settings saves, GitHub submission, API key storage — all Server Actions
- Colocated with components, type-safe end-to-end, no manual `fetch`
- Return typed `Result<T, AppError>` — never throw across the server/client boundary

**Route Handlers for streaming and polling:**

| Route | Purpose |
|---|---|
| `POST /api/generate` | AI clarification questions and issue generation — streaming response |
| `GET /api/scan-status/[jobId]` | Repo scan job progress — polled every 2s from client |
| `ALL /api/auth/[...all]` | BetterAuth handler |

**Error handling standard: `Result<T, AppError>`**
- All server actions and service functions return `{ data: T } | { error: AppError }`
- `AppError`: `{ code: string, message: string, retryable: boolean }`
- `message` is always user-facing plain English — no raw API error strings
- `retryable: true` instructs the client to show a retry button and preserve in-progress work (NFR24)
- No raw `try/catch` in route handlers — errors caught at the service layer and mapped to `AppError`

**GitHub API rate limiting:**
- Octokit `@octokit/plugin-retry` handles 429 and 5xx with exponential backoff
- Rate limit remaining checked before bulk file fetches during repo scan
- If below threshold: scan pauses, user sees a warning with estimated resume time (NFR27)

---

### Frontend Architecture

**Client state: No external state library**

| Concern | Solution |
|---|---|
| Streaming AI output | Vercel AI SDK `useChat` hook |
| Issue creation multi-step flow | `useReducer` + `IssueCreationContext` |
| User session / profile | BetterAuth `useSession` hook |
| Sidebar collapsed, theme | `SidebarContext`, `ThemeContext` (React Context) |
| Server data (repos, issue history) | Next.js Server Components + `revalidatePath` after mutations |

Rationale: Server Components + Server Actions + Vercel AI SDK hooks cover all state needs. No Zustand, Redux, or Jotai — fewer dependencies, simpler mental model, no hydration complexity.

**Performance optimisation:**
- `next/image` — all images auto-optimised with responsive `sizes`
- `next/font` — Geist typeface, zero layout shift, no external requests
- Route-level code splitting via App Router (automatic)
- `loading.tsx` skeleton files for all authenticated routes
- `Suspense` boundaries around all async Server Components

---

### Infrastructure & Deployment

**CI/CD pipeline (GitHub Actions):**

| Stage | Trigger | Action |
|---|---|---|
| Lint + typecheck | Every PR | `pnpm lint && pnpm typecheck` |
| Unit + integration tests | Every PR | Vitest |
| Build check | Every PR | `pnpm build` |
| E2E tests | Merge to `main` | Playwright |
| Docker image build + push | Merge to `main` | Push to `ghcr.io/spekd/spekd:{semver}` |
| Hosted SaaS deploy | Merge to `main` | Vercel auto-deploy |

Self-hosted upgrade path: customers pull the new semver-tagged image and restart their containers. No in-place migration scripts — Drizzle migrations run at container startup automatically.

**Monitoring & logging:**

| Concern | Hosted SaaS | Self-hosted |
|---|---|---|
| Error tracking | Sentry (free tier) | Optional — `SENTRY_DSN` env var; omit to disable |
| Performance | Vercel Analytics | Customer's own tooling |
| Logging | Structured JSON to stdout | Customers pipe to their log aggregator |
| Job monitoring | pg-boss job state (SQL-queryable) | Same |

**Environment configuration (`src/config/env.ts` — Zod-validated at boot):**

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `DATABASE_URL` | Yes | — | PostgreSQL connection string |
| `ENCRYPTION_KEY` | Yes | — | 32-byte hex key for AES-256-GCM |
| `BETTER_AUTH_SECRET` | Yes | — | BetterAuth session secret |
| `GITHUB_CLIENT_ID` | Yes | — | GitHub OAuth app client ID |
| `GITHUB_CLIENT_SECRET` | Yes | — | GitHub OAuth app client secret |
| `NEXT_PUBLIC_APP_URL` | Yes | — | Public base URL (OAuth redirects) |
| `GITHUB_API_BASE_URL` | No | `https://api.github.com` | GitHub Enterprise Server API base |
| `GITHUB_OAUTH_BASE_URL` | No | `https://github.com` | GitHub Enterprise Server OAuth base |
| `WORKER_MODE` | No | `false` | Run as job worker only |
| `SENTRY_DSN` | No | — | Error tracking DSN (omit to disable) |
| `LICENSE_KEY` | No | — | Reserved for future self-host licensing |

Missing required vars cause a loud startup failure with a clear message identifying the missing variable — not a silent runtime error.

**Build Phase 2 environment variables (not needed for Build Phase 1):**

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `PLANNING_ARTIFACTS_DIR` | No | — | Optional file-system-based artifact storage path for self-hosted mode |

### Decision Impact Analysis

**Implementation sequence (decisions that unblock others):**
1. `src/config/env.ts` — all other modules depend on validated env vars
2. `src/lib/db/` — Drizzle schema + client; all service functions depend on this
3. `src/lib/crypto.ts` — credential storage depends on this before auth can store tokens
4. `src/lib/auth/` — BetterAuth config; all authenticated routes depend on this
5. `src/lib/github/` — Octokit client; repo management and submission depend on this
6. `src/lib/jobs/` — pg-boss setup; repo scan depends on this
7. `src/lib/ai/` — provider abstraction + prompt engine; clarification loop depends on this
8. Route handlers and Server Actions — depend on all service layer modules above

**Cross-component dependencies:**
- pg-boss job worker shares the same `DATABASE_URL` as the web server — single PostgreSQL instance serves both
- AI provider resolution reads the user's encrypted API key from the DB — depends on both `db` and `crypto` modules
- GitHub submission uses the user's encrypted OAuth token — same dependency chain
- Streaming route handler (`/api/generate`) depends on `ai`, `db`, `crypto`, and `github` modules simultaneously — the most complex dependency node in the graph

---

## Implementation Patterns & Consistency Rules

### Naming Patterns

**Database naming conventions (Drizzle schema):**
- Tables: `snake_case` plural — `users`, `repos`, `repo_files`, `issues`, `issue_templates`, `teams`, `team_members`, `projects`, `project_repos`, `planning_artifacts`
- Columns: `snake_case` — `user_id`, `created_at`, `api_key_encrypted`
- Primary keys: always `id` (UUID, `crypto.randomUUID()`)
- Foreign keys: `{referenced_table_singular}_id` — `user_id`, `repo_id`, `team_id`, `project_id`
- Boolean columns: `is_` prefix — `is_developer`, `is_indexed`
- Timestamp columns: `created_at`, `updated_at`, `indexed_at` — all `timestamp with time zone` (UTC)
- Index naming: `{table}_{column(s)}_idx` — `repos_user_id_idx`

**API / Route naming conventions:**
- Route handler directories: `kebab-case` — `/api/scan-status/[jobId]/route.ts`
- Route parameters: `camelCase` — `[jobId]`, `[repoId]`
- Query parameters: `camelCase` — `?userId=`, `?page=`
- HTTP methods: `GET` reads, `POST` creates/actions, `PATCH` partial updates, `DELETE` deletes — no `PUT`
- No `/api/v1/` versioning prefix for MVP — add when breaking changes require it

**Code naming conventions:**
- Components: `PascalCase` files and exports — `ClarificationCard.tsx`
- Server actions: `camelCase` verbs — `createIssue`, `submitToGitHub`, `saveApiKey`
- Service functions: `camelCase` verbs — `getUserRepos`, `getCodeIndex`, `enqueueRepoScan`
- Types and interfaces: `PascalCase` — `AppError`, `IssueCreationContext`, `RepoScanJob`
- Zod schemas: `PascalCase` + `Schema` suffix — `CreateIssueSchema`, `ApiKeySchema`
- Constants: `SCREAMING_SNAKE_CASE` — `MAX_CLARIFICATION_QUESTIONS`, `SCAN_POLL_INTERVAL_MS`
- React Contexts: `PascalCase` + `Context` suffix — `IssueCreationContext`, `SidebarContext`
- Custom hooks: `use` prefix, `camelCase` — `useIssueCreation`, `useScanStatus`

**File naming conventions:**
- React components: `PascalCase.tsx` — `ClarificationCard.tsx`
- Non-component modules: `kebab-case.ts` — `crypto.ts`, `env.ts`, `github-client.ts`
- Route handlers: always `route.ts` inside the route directory
- Server actions: `actions.ts` colocated in the route directory that uses them
- Drizzle schema: `schema.ts` in `src/lib/db/`
- Test files: colocated, same name + `.test.ts` / `.test.tsx` — `ClarificationCard.test.tsx`

---

### Structure Patterns

**Service layer layout (`src/lib/`):**

```
src/lib/
├── db/
│   ├── schema.ts          # All Drizzle table definitions
│   ├── client.ts          # Drizzle client singleton
│   └── migrations/        # Drizzle Kit generated SQL files
├── auth/
│   └── index.ts           # BetterAuth instance + getSession() helper
├── github/
│   ├── client.ts          # createGitHubClient(token, baseUrl?)
│   ├── repos.ts           # getUserRepos(), getRepoFileTree(), getFileContent()
│   └── issues.ts          # submitIssue()
├── ai/
│   ├── provider.ts        # getAIProvider(userId) — resolves + decrypts BYOK key
│   ├── prompts.ts         # All prompt templates, parameterised by role
│   ├── clarification.ts   # generateClarificationQuestions()
│   └── generation.ts      # generateIssue() — returns ReadableStream
├── jobs/
│   ├── boss.ts            # pg-boss singleton
│   ├── worker.ts          # Worker entrypoint (WORKER_MODE=true)
│   └── scan-repo.ts       # Repo scan job handler
├── planning/                    # (Build Phase 2 — do not implement in MVP)
│   ├── orchestrator.ts          # Planning workflow orchestration
│   ├── adapter-interface.ts     # PlanningMethodAdapter TypeScript interface
│   └── adapters/
│       └── bmad/                # BMAD Method adapter (MIT licensed)
│           ├── index.ts         # Adapter entry point
│           ├── steps.ts         # BMAD step definitions
│           └── prompts.ts       # BMAD-specific prompt templates
├── teams/                       # (Build Phase 2 — do not implement in MVP)
│   ├── service.ts               # Team CRUD, member management
│   └── permissions.ts           # RBAC permission checks
└── crypto.ts              # encrypt(), decrypt()
```

**Component structure rules:**
- `src/components/ui/` — shadcn/ui base components only; never modified directly
- `src/components/spekd/` — all custom product components; one primary export per file
- No barrel `index.ts` files — import directly from the file path (keeps tree-shaking clean)
- Server Components are the default; `'use client'` added only when browser APIs, event handlers, or hooks are needed
- Service layer files (`src/lib/`) never import from `src/components/` — the dependency is one-way only

**Test location: colocated**
- Unit and integration test files live next to the files they test
- E2E tests: `tests/e2e/` at project root (Playwright convention)
- Test helpers and fixtures: `tests/helpers/`

---

### Format Patterns

**Server Action return format — `Result<T, AppError>` (mandatory):**

```typescript
type Result<T> = { data: T; error?: never } | { data?: never; error: AppError }

type AppError = {
  code: string        // machine-readable: 'GITHUB_TOKEN_EXPIRED', 'AI_QUOTA_EXCEEDED'
  message: string     // user-facing plain English — always present
  retryable: boolean  // true = show retry button and preserve user input
}
```

**API Route Handler response format:**

```typescript
// Success
Response.json({ data: T }, { status: 200 })

// Error
Response.json({ error: { code: string, message: string } }, { status: 4xx | 5xx })

// Streaming (AI generation)
new Response(stream, { headers: { 'Content-Type': 'text/event-stream' } })
```

**Date / time format:**
- PostgreSQL storage: `timestamp with time zone` (UTC)
- Over-the-wire: ISO 8601 string — `"2026-03-03T12:00:00.000Z"`
- Never Unix epoch integers in API responses
- Relative/locale display formatting: client-side only

**JSON field naming:**
- All fields: `camelCase` — `{ userId, repoId, createdAt }`
- Drizzle `casing: 'camelCase'` config option auto-converts from DB `snake_case`

**ID format:**
- All IDs: UUID v4 strings — never auto-increment integers in API responses (prevents sequential enumeration)

---

### Communication Patterns

**pg-boss job naming: `kebab-case`**
- Queue names: `repo-scan`, `repo-rescan`
- Job data: typed interfaces in the job handler file (`scan-repo.ts`)

**Scan progress polling:**
- Client polls `GET /api/scan-status/[jobId]` every 2000ms
- Response shape: `{ status: 'pending' | 'active' | 'completed' | 'failed', progress: number, step: string }`
- Client stops polling when status is `completed` or `failed`
- No WebSockets or Server-Sent Events for MVP — polling is sufficient at MVP scale and simpler behind reverse proxies in self-hosted deployments

**Streaming AI output:**
- Server: Vercel AI SDK `streamText()` → `ReadableStream` → Route Handler response
- Client: Vercel AI SDK `useChat()` hook — handles stream consumption, partial state, error recovery
- `aria-live="polite"` wraps the streamed content container for screen reader announcements

---

### Process Patterns

**Error handling — mandatory sequence:**
1. Service functions catch external errors (GitHub API, AI provider, pg-boss) and map to `AppError`
2. Server Actions call service functions and return `Result<T>` — no `try/catch` in the action body
3. Route Handlers wrap service calls in a single `try/catch`, return structured JSON errors
4. Client components check `result.error` before using `result.data` — never assume success
5. `retryable: true` → show retry button, preserve all user input in component state
6. Never log raw API error objects in production — log sanitised `code` values only

**Loading state patterns:**
- Page-level: `loading.tsx` skeleton files (Next.js App Router automatic)
- Client-side: `isLoading` boolean in local component state — never global
- Button loading: `isLoading` prop → spinner replaces label, `disabled={true}`, width locked to prevent layout shift
- Streaming: implicit in stream progress — cursor visible, submit disabled until complete
- Skeleton: `bg-muted animate-pulse`; suppressed under `prefers-reduced-motion`

**Authentication guard — mandatory first line:**

```typescript
// Every authenticated Server Component and Server Action starts with this
const session = await getSession()
if (!session) redirect('/sign-in')  // Server Component
// or
if (!session) return { error: { code: 'UNAUTHENTICATED', message: 'Please sign in.', retryable: false } }  // Server Action
const userId = session.user.id  // typed, always present after this point
```

Never accept `userId` as a parameter from the client — always read from session server-side.

**Validation pattern:**
- All external input validated with Zod `safeParse` before use — never `parse` (throws)
- Schema defined in the same file as the action/route that uses it
- Validation errors mapped to `AppError` with `code: 'VALIDATION_ERROR'`

---

### Enforcement Guidelines

**All AI agents MUST:**
- Return `Result<T, AppError>` from every server action — never throw, never return raw data
- Call `getSession()` as the first line of every authenticated server action and Server Component
- Read `userId` from session only — never accept it as a client-supplied parameter
- Use Zod `safeParse` for all external input — never trust unvalidated data
- Name database tables `snake_case` plural
- Name all JSON response fields `camelCase`
- Colocate test files next to the files they test
- Never import from `src/components/` in `src/lib/` files — service layer has no UI dependency
- Never add `'use client'` to any file in `src/lib/` — all service layer code is server-only

**Good example:**

```typescript
// ✅ Correct server action
export async function createIssue(input: unknown): Promise<Result<Issue>> {
  const session = await getSession()
  if (!session) return { error: { code: 'UNAUTHENTICATED', message: 'Please sign in.', retryable: false } }

  const parsed = CreateIssueSchema.safeParse(input)
  if (!parsed.success) return { error: { code: 'VALIDATION_ERROR', message: 'Invalid input.', retryable: false } }

  return issueService.create(session.user.id, parsed.data)
}
```

**Anti-patterns:**

```typescript
// ❌ Throws instead of returning Result
export async function createIssue(input: FormData) {
  const issue = await issueService.create(input.get('userId') as string, input)
  return issue  // no Result wrapper; userId from client; no validation
}
```

---

## Project Structure & Boundaries

### Requirements → Structure Mapping

| FR Domain | FR Range | Primary Location | Build Phase |
|---|---|---|---|
| User Account & Onboarding | FR1–FR6 | `src/app/(auth)/`, `src/lib/auth/`, `src/components/spekd/auth/` | Build Phase 1 (MVP) |
| Repository Management | FR7–FR13 | `src/app/(app)/dashboard/`, `src/lib/github/`, `src/lib/jobs/`, `src/lib/db/schema.ts` | Build Phase 1 (MVP) |
| AI Clarification Loop | FR14–FR18 | `src/app/api/generate/route.ts`, `src/lib/ai/clarification.ts`, `src/components/spekd/clarification/` | Build Phase 1 (MVP) |
| AI Issue Generation | FR19–FR23 | `src/lib/ai/generation.ts`, `src/lib/ai/prompts.ts`, `src/components/spekd/issue-editor/` | Build Phase 1 (MVP) |
| Issue Review & Submission | FR24–FR28 | `src/app/(app)/issues/new/`, `src/lib/github/issues.ts`, `src/components/spekd/issue-editor/` | Build Phase 1 (MVP) |
| Issue Templates | FR29–FR30 | `src/app/(app)/settings/templates/`, `src/lib/db/schema.ts` | Build Phase 1 (MVP) |
| Issue History & Privacy | FR31–FR35 | `src/app/(app)/issues/`, `src/app/(app)/settings/`, service-layer ownership guards | Build Phase 1 (MVP) |
| Marketing & Error Handling | FR36–FR44 | `src/app/(marketing)/`, `src/components/spekd/error/`, `src/app/global-error.tsx` | Build Phase 1 (MVP) |
| Planning Method & Phase 0 | FR45–FR50 | `src/app/(app)/projects/`, `src/lib/planning/`, `src/components/spekd/planning/` | Future — Build Phase 2 |
| Team Collaboration | FR51–FR56 | `src/app/(app)/teams/`, `src/lib/teams/`, `src/components/spekd/teams/` | Future — Build Phase 2 |
| Phase 2 BUILD | FR57–FR58 | Architecture TBD — agentic workflow engine | Future — Build Phase 3 |

---

### Complete Project Directory Structure

```
spekd/
├── .github/
│   └── workflows/
│       ├── ci.yml                         # Lint, typecheck, Vitest, build on every PR
│       └── release.yml                    # E2E (Playwright), Docker build+push to ghcr.io on main merge
├── .env.example                           # All env vars with descriptions; committed to repo
├── .gitignore
├── Dockerfile                             # Multi-stage: deps → builder → runner (standalone output)
├── docker-compose.yml                     # app + postgres services for self-hosted small deployments
├── helm/                                  # Kubernetes Helm chart
│   └── spekd/
│       ├── Chart.yaml
│       ├── values.yaml
│       └── templates/
│           ├── deployment-app.yaml
│           ├── deployment-worker.yaml
│           ├── service.yaml
│           ├── configmap.yaml
│           └── secret.yaml
├── next.config.ts                         # output: 'standalone'; no edge runtime
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json                          # strict: true; path alias @/* → ./src/*
├── eslint.config.mjs
├── vitest.config.ts                       # Unit + integration tests
├── playwright.config.ts                   # E2E tests
├── drizzle.config.ts                      # Drizzle Kit configuration
├── public/
│   ├── favicon.ico
│   ├── og-image.png                       # Open Graph image (FR44)
│   └── assets/
│       └── logo.svg
├── tests/
│   ├── helpers/                           # Shared test utilities and fixtures
│   │   ├── db.ts                          # Test DB setup / teardown helpers
│   │   ├── auth.ts                        # Mock session factories
│   │   └── factories.ts                   # Test data factories (repos, issues, users)
│   └── e2e/                               # Playwright E2E tests
│       ├── auth.spec.ts                   # Sign-in flow (FR1–FR4)
│       ├── onboarding.spec.ts             # BYOK onboarding (FR5)
│       ├── repo-management.spec.ts        # Add/remove repos, scan trigger (FR7–FR11)
│       ├── issue-creation.spec.ts         # Full clarification → generation → review → submit (FR14–FR28)
│       ├── issue-history.spec.ts          # History view, delete (FR31–FR35)
│       └── settings.spec.ts              # Templates, API key management (FR29–FR30, FR5–FR6)
└── src/
    ├── middleware.ts                      # BetterAuth session check on /(app)/* routes
    ├── config/
    │   └── env.ts                         # Zod-validated env vars; fails loud on missing required vars
    ├── app/
    │   ├── globals.css                    # Tailwind v4 CSS-first config + design tokens
    │   ├── layout.tsx                     # Root layout: fonts, metadata, ThemeProvider
    │   ├── not-found.tsx                  # 404 page
    │   ├── global-error.tsx               # Top-level error boundary (FR44)
    │   ├── (marketing)/                   # Public-facing SSR pages (FR36–FR44)
    │   │   ├── layout.tsx                 # Marketing layout: navbar + footer
    │   │   ├── page.tsx                   # Landing page (FR36–FR38)
    │   │   ├── pricing/
    │   │   │   └── page.tsx
    │   │   └── docs/
    │   │       └── page.tsx
    │   ├── (auth)/                        # Sign-in / sign-up (FR1–FR4)
    │   │   ├── layout.tsx                 # Centered card layout
    │   │   ├── sign-in/
    │   │   │   └── page.tsx               # GitHub OAuth entry point
    │   │   └── sign-up/
    │   │       └── page.tsx               # GitHub OAuth entry point (same flow)
    │   ├── (app)/                         # Authenticated app shell (FR5–FR35)
    │   │   ├── layout.tsx                 # Sidebar + header shell; session guard
    │   │   ├── loading.tsx                # App shell skeleton
    │   │   ├── onboarding/
    │   │   │   ├── page.tsx               # BYOK onboarding flow (FR5) + persona selection
    │   │   │   ├── loading.tsx
    │   │   │   └── actions.ts             # saveApiKey, setPersona server actions
    │   │   ├── dashboard/
    │   │   │   ├── page.tsx               # Repo list + add-repo CTA (FR7–FR8)
    │   │   │   ├── loading.tsx
    │   │   │   └── actions.ts             # addRepo, removeRepo, triggerRescan server actions
    │   │   ├── issues/
    │   │   │   ├── page.tsx               # Issue history list (FR31–FR33)
    │   │   │   ├── loading.tsx
    │   │   │   ├── [issueId]/
    │   │   │   │   ├── page.tsx           # Issue detail / re-edit view (FR33)
    │   │   │   │   └── actions.ts         # deleteIssue server action (FR35)
    │   │   │   └── new/
    │   │   │       ├── page.tsx           # Issue creation shell — wraps multi-step flow (FR14–FR28)
    │   │   │       ├── loading.tsx
    │   │   │       └── actions.ts         # createIssue, submitToGitHub server actions
    │   │   ├── projects/                  # (Build Phase 2 — do not implement in MVP)
    │   │   │   ├── page.tsx               # Project list
    │   │   │   ├── [projectId]/
    │   │   │   │   ├── page.tsx           # Project overview + planning artifacts
    │   │   │   │   ├── plan/
    │   │   │   │   │   └── page.tsx       # Planning workflow UI
    │   │   │   │   └── actions.ts
    │   │   │   └── new/
    │   │   │       ├── page.tsx           # New project + planning method selection
    │   │   │       └── actions.ts
    │   │   ├── teams/                     # (Build Phase 2 — do not implement in MVP)
    │   │   │   ├── page.tsx               # Team management
    │   │   │   ├── [teamId]/
    │   │   │   │   ├── page.tsx           # Team overview
    │   │   │   │   ├── settings/
    │   │   │   │   │   └── page.tsx       # Team settings (defaults, members)
    │   │   │   │   └── actions.ts
    │   │   │   └── new/
    │   │   │       ├── page.tsx           # Create team
    │   │   │       └── actions.ts
    │   │   └── settings/
    │   │       ├── page.tsx               # Settings index — redirect to /settings/account
    │   │       ├── account/
    │   │       │   ├── page.tsx           # Profile, persona, delete account (FR5–FR6)
    │   │       │   └── actions.ts         # updatePersona, deleteAccount server actions
    │   │       ├── api-keys/
    │   │       │   ├── page.tsx           # BYOK key management (FR5)
    │   │       │   └── actions.ts         # saveApiKey, removeApiKey server actions
    │   │       └── templates/
    │   │           ├── page.tsx           # Issue template list + editor (FR29–FR30)
    │   │           └── actions.ts         # saveTemplate, deleteTemplate server actions
    │   └── api/
    │       ├── auth/
    │       │   └── [...all]/
    │       │       └── route.ts           # BetterAuth handler (all auth methods)
    │       ├── generate/
    │       │   └── route.ts               # POST — AI clarification + generation streaming (FR14–FR23)
    │       └── scan-status/
    │           └── [jobId]/
    │               └── route.ts           # GET — pg-boss job progress polling (FR9–FR12)
    ├── components/
    │   ├── ui/                            # shadcn/ui base components (never modified directly)
    │   │   ├── button.tsx
    │   │   ├── card.tsx
    │   │   ├── dialog.tsx
    │   │   ├── input.tsx
    │   │   ├── textarea.tsx
    │   │   ├── badge.tsx
    │   │   ├── skeleton.tsx
    │   │   ├── toast.tsx
    │   │   └── tooltip.tsx
    │   └── spekd/                         # Custom product components
    │       ├── layout/
    │       │   ├── AppShell.tsx           # Sidebar + header layout wrapper
    │       │   ├── Sidebar.tsx            # Navigation sidebar (collapsible)
    │       │   ├── Header.tsx             # Top bar with breadcrumbs + user menu
    │       │   └── ThemeToggle.tsx        # Light/dark mode toggle
    │       ├── auth/
    │       │   ├── SignInCard.tsx         # GitHub OAuth button card (FR1–FR4)
    │       │   └── OnboardingWizard.tsx   # BYOK + persona selection wizard (FR5)
    │       ├── repos/
    │       │   ├── RepoList.tsx           # Grid of connected repos (FR7–FR8)
    │       │   ├── RepoCard.tsx           # Individual repo card with scan status
    │       │   ├── AddRepoDialog.tsx      # Repo picker dialog (FR8)
    │       │   └── ScanProgress.tsx       # Scan progress bar with polling (FR9–FR12)
    │       ├── issue-creation/
    │       │   ├── IssueCreationProvider.tsx  # IssueCreationContext — multi-step state (FR14–FR28)
    │       │   ├── RepoSelector.tsx           # Step 1: repo + label selection (FR13, FR14)
    │       │   ├── ClarificationCard.tsx      # Step 2: AI question + user answer (FR14–FR18)
    │       │   ├── ClarificationHistory.tsx   # Answered questions summary (FR18)
    │       │   ├── IssueEditor.tsx            # Step 3: markdown editor for generated issue (FR22–FR24)
    │       │   ├── IssuePreview.tsx           # Live markdown preview (FR24–FR25)
    │       │   └── SubmitDialog.tsx           # GitHub submission confirmation (FR26–FR28)
    │       ├── history/
    │       │   ├── IssueHistoryList.tsx   # Paginated issue history (FR31–FR32)
    │       │   └── IssueHistoryCard.tsx   # Individual history entry with actions (FR33–FR35)
    │       ├── settings/
    │       │   ├── ApiKeyForm.tsx         # BYOK key input + validation (FR5)
    │       │   ├── PersonaSelector.tsx    # Developer / non-technical toggle (FR5)
    │       │   ├── TemplateEditor.tsx     # Issue template create/edit (FR29–FR30)
    │       │   └── DangerZone.tsx         # Delete account (FR6)
    │       └── error/
    │           ├── ErrorBoundary.tsx      # React error boundary wrapper (FR44)
    │           ├── ErrorCard.tsx          # User-facing error message + retry button (NFR24–NFR25)
    │           └── NotFound.tsx           # 404 component
    ├── lib/
    │   ├── db/
    │   │   ├── schema.ts                  # All Drizzle table definitions (users, repos, repo_files, issues, templates, sessions, teams, team_members, projects, project_repos, planning_artifacts)
    │   │   ├── client.ts                  # Drizzle client singleton (Neon driver for SaaS; pg for self-host)
    │   │   └── migrations/               # Drizzle Kit generated SQL files (versioned, auto-run at startup)
    │   ├── auth/
    │   │   └── index.ts                   # BetterAuth instance + getSession() helper
    │   ├── github/
    │   │   ├── client.ts                  # createGitHubClient(token, baseUrl?)
    │   │   ├── repos.ts                   # getUserRepos(), getRepoFileTree(), getFileContent()
    │   │   └── issues.ts                  # submitIssue()
    │   ├── ai/
    │   │   ├── provider.ts               # getAIProvider(userId) — resolves + decrypts BYOK key
    │   │   ├── prompts.ts                # All prompt templates, parameterised by role (developer | non-technical)
    │   │   ├── clarification.ts          # generateClarificationQuestions()
    │   │   └── generation.ts             # generateIssue() — returns ReadableStream
    │   ├── jobs/
    │   │   ├── boss.ts                   # pg-boss singleton
    │   │   ├── worker.ts                 # Worker entrypoint — runs when WORKER_MODE=true
    │   │   └── scan-repo.ts              # 'repo-scan' + 'repo-rescan' job handlers
    │   ├── planning/                      # (Build Phase 2 — do not implement in MVP)
    │   │   ├── orchestrator.ts            # Planning workflow orchestration
    │   │   ├── adapter-interface.ts       # PlanningMethodAdapter TypeScript interface
    │   │   └── adapters/
    │   │       └── bmad/                  # BMAD Method adapter (MIT licensed)
    │   │           ├── index.ts           # Adapter entry point
    │   │           ├── steps.ts           # BMAD step definitions
    │   │           └── prompts.ts         # BMAD-specific prompt templates
    │   ├── teams/                          # (Build Phase 2 — do not implement in MVP)
    │   │   ├── service.ts                 # Team CRUD, member management
    │   │   └── permissions.ts             # RBAC permission checks
    │   └── crypto.ts                     # encrypt(), decrypt() using AES-256-GCM
    └── types/
        ├── api.ts                         # Result<T>, AppError, API response shapes
        ├── issue.ts                       # Issue, IssueTemplate, IssueStatus types
        ├── repo.ts                        # Repo, RepoFile, ScanStatus types
        ├── auth.ts                        # Session, User, Persona types
        ├── planning.ts                    # (Build Phase 2) PlanningStep, ArtifactType, PlanningContext types
        └── team.ts                        # (Build Phase 2) Team, TeamMember, TeamRole types
```

---

### Architectural Boundaries

**API Boundaries:**

| Boundary | Inbound | Outbound |
|---|---|---|
| `/api/auth/[...all]` | Browser ↔ BetterAuth | PostgreSQL (sessions table) |
| `/api/generate` | Browser (POST JSON) | `src/lib/ai/` — streams back SSE |
| `/api/scan-status/[jobId]` | Browser (GET poll) | pg-boss job state in PostgreSQL |
| Server Actions | Next.js form/button events | `src/lib/` service layer only |
| `src/lib/github/` | Called from Server Actions + job worker | GitHub API (configurable base URL) |
| `src/lib/ai/` | Called from `/api/generate` route handler | AI provider API (user's BYOK key) |
| `src/lib/jobs/` | Worker process (`WORKER_MODE=true`) | `src/lib/github/` + `src/lib/db/` |

**Component Boundaries:**

- `src/components/ui/` — read-only shadcn primitives; composed by `src/components/spekd/`
- `src/components/spekd/issue-creation/IssueCreationProvider.tsx` — owns the multi-step issue creation state machine; all child components subscribe via `useIssueCreation()` hook
- No component file imports from `src/lib/` directly — all server interaction goes through Server Actions or the streaming route handler
- `'use client'` boundary: all `src/components/spekd/` components with event handlers; layout components are Server Components

**Service Boundaries:**

- `src/lib/` modules are server-only — never bundled to the client
- `crypto.ts` is imported only by `auth/index.ts`, `github/client.ts`, `ai/provider.ts` — nowhere else
- `jobs/worker.ts` is the only file that imports from `jobs/boss.ts` directly; other code enqueues via named helper functions
- Each `src/lib/` subdirectory is an isolated service — cross-service calls are explicitly named function calls, never re-exported shared state

**Data Boundaries:**

- PostgreSQL is the single source of truth — no client-side persistent state
- `repo_files` table rows are scoped `(userId, repoId)` — the Drizzle query in `github/repos.ts` applies both filters as a WHERE clause; no cross-user reads are structurally possible
- `unstable_cache` caches are keyed per `userId` — no shared cache entries across users
- Encrypted fields (`githubTokenEncrypted`, `apiKeyEncrypted`) are decrypted only inside `src/lib/` functions; Drizzle's mapped types ensure they are never returned raw to callers outside the service layer

---

### Integration Points

**Internal Communication:**

```
Browser → Server Action (mutation) → src/lib/{db,github,ai,crypto}/ → PostgreSQL
Browser → /api/generate (POST stream) → src/lib/ai/ → AI Provider API → SSE back to browser
Browser → /api/scan-status/[jobId] (GET poll) → pg-boss state in PostgreSQL → JSON response
Worker (WORKER_MODE=true) → pg-boss → scan-repo.ts → src/lib/github/ → src/lib/db/ → PostgreSQL
```

**External Integrations:**

| Integration | Module | Config |
|---|---|---|
| GitHub REST API | `src/lib/github/client.ts` | `GITHUB_API_BASE_URL`, per-user OAuth token |
| GitHub OAuth | `src/lib/auth/index.ts` (BetterAuth) | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GITHUB_OAUTH_BASE_URL` |
| Anthropic API | `src/lib/ai/provider.ts` | User BYOK key (decrypted at call time) |
| OpenAI API | `src/lib/ai/provider.ts` | User BYOK key |
| Azure OpenAI | `src/lib/ai/provider.ts` | User BYOK key + `AZURE_OPENAI_ENDPOINT` |
| Ollama | `src/lib/ai/provider.ts` | `OLLAMA_BASE_URL` (self-hosted only) |
| AWS Bedrock | `src/lib/ai/provider.ts` | User BYOK key (IAM credentials) |
| Sentry | `src/config/env.ts` | `SENTRY_DSN` (optional) |

**Data Flow — Issue Creation (FR14–FR28):**

```
1. User selects repo + label → RepoSelector → Server Action → DB (repo_files read)
2. POST /api/generate {context, messages: []} → AI clarification question → SSE stream
3. User answers → POST /api/generate {context, messages: [q1, a1, ...]} → next question OR issue draft
4. Issue draft streamed into IssueEditor → user edits markdown
5. User clicks Submit → submitToGitHub Server Action → github/issues.ts → GitHub API → issue URL
6. Success → save to issues table → redirect to /issues/[id]
```

**Data Flow — Repo Scan (FR9–FR12):**

```
1. addRepo Server Action → insert into repos → enqueue 'repo-scan' job via pg-boss
2. Client starts polling /api/scan-status/[jobId] every 2s
3. Worker picks up job → github/repos.ts → fetch file tree + file contents → upsert repo_files rows
4. Worker updates job progress → polling client reflects progress (0–100%)
5. Job completes → client stops polling → repo marked is_indexed: true
```

---

### File Organisation Patterns

**Configuration files (project root):**
- `next.config.ts` — Next.js config (`output: 'standalone'`, image domains, no edge runtime)
- `drizzle.config.ts` — Drizzle Kit config (migrations dir, schema path, DB URL from env)
- `vitest.config.ts` — test runner config (coverage thresholds, aliases)
- `playwright.config.ts` — E2E config (base URL, browser targets, test dir)
- `.env.example` — all env vars documented; committed; `.env.local` never committed

**Source organisation:**
- Route groups `(auth)`, `(marketing)`, `(app)` — group routes by access level without affecting URL
- `actions.ts` colocated with the route page that uses them — discoverable, not a distant `src/actions/` directory
- `src/types/` — pure TypeScript type definitions only; no runtime code; imported everywhere

**Test organisation:**
- Unit/integration tests: colocated as `*.test.ts` / `*.test.tsx` next to source files
- E2E tests: `tests/e2e/*.spec.ts` — Playwright convention
- Shared helpers: `tests/helpers/` — DB factories, mock session helpers; not colocated (shared across E2E tests)

**Asset organisation:**
- `public/` — static assets served at `/`; only truly static files here (favicon, OG image, logo SVG)
- Fonts: loaded via `next/font` in `src/app/layout.tsx` — no static font files in `public/`
- Images in components: `next/image` with `src` pointing to `public/assets/` or remote URLs

---

### Development Workflow Integration

**Development server:**
- `pnpm dev` — Turbopack dev server, HMR, `localhost:3000`
- `WORKER_MODE=true node src/lib/jobs/worker.js` — run worker separately in development if testing scan jobs
- `docker-compose up` — full stack including PostgreSQL for local development

**Build process:**
- `pnpm build` — `next build` with `output: 'standalone'`; outputs `.next/standalone/`
- `Dockerfile` copies `.next/standalone/` into the runner stage — minimal production image
- `drizzle-kit generate` creates migration files; `drizzle-kit migrate` applies them (run in entrypoint script)

**Deployment structure:**
- SaaS: Vercel reads `next.config.ts`; worker deployed as a separate container sharing the same PostgreSQL instance
- Self-hosted Docker Compose: single `docker-compose.yml` starts `app` (web + worker) and `postgres` services
- Self-hosted Kubernetes: `helm/spekd/` chart deploys `app` Deployment (web) + `worker` Deployment (pg-boss worker) separately for independent scaling

---

## Architecture Validation Results

### Coherence Validation

**Decision Compatibility:** All technology choices are mutually compatible. No version conflicts, no contradictory patterns, no runtime incompatibilities. Next.js 16 App Router + Vercel AI SDK + BetterAuth are designed to work together in the Node.js runtime. Drizzle ORM 0.45.1 is fully compatible with both Neon and standard `pg`. pg-boss 12.14.0 shares the same `DATABASE_URL` as the web server — zero secondary infrastructure. Tailwind CSS v4 + shadcn/ui have explicit mutual support. The dual-process model (web + worker from same image via `WORKER_MODE=true`) is internally coherent and supported by pg-boss's distributed job locking.

**Pattern Consistency:** All naming conventions, return formats, auth guards, and communication patterns are consistent across all five domains (DB, API, code, files, jobs). The single `casing: 'camelCase'` Drizzle option eliminates all manual field mapping. pg-boss queue names (`repo-scan`, `repo-rescan`) correctly follow the documented `kebab-case` job naming rule.

**Structure Alignment:** The project structure fully supports every architectural decision. Route groups `(auth)`, `(marketing)`, `(app)` cleanly separate the three access domains. `actions.ts` colocation, `src/lib/` service isolation, and `src/types/` type-only modules enforce architectural boundaries at the file system level.

---

### Requirements Coverage Validation

**Functional Requirements Coverage (all 58 FRs):**

| Domain | FRs | Architectural Owner | Build Phase |
|---|---|---|---|
| User Account & Onboarding | FR1–FR6 | `(auth)/`, `(app)/onboarding/`, `(app)/settings/account/`, `lib/auth/`, `lib/crypto.ts` | Build Phase 1 (MVP) |
| Repository Management | FR7–FR13 | `(app)/dashboard/`, `lib/github/`, `lib/jobs/`, `lib/db/schema.ts` | Build Phase 1 (MVP) |
| AI Clarification Loop | FR14–FR18 | `/api/generate`, `lib/ai/clarification.ts`, `lib/ai/prompts.ts` | Build Phase 1 (MVP) |
| AI Issue Generation | FR19–FR23 | `/api/generate`, `lib/ai/generation.ts`, `lib/ai/prompts.ts` | Build Phase 1 (MVP) |
| Issue Review & Submission | FR24–FR28 | `(app)/issues/new/`, `lib/github/issues.ts`, `IssueEditor.tsx`, `SubmitDialog.tsx` | Build Phase 1 (MVP) |
| Issue Templates | FR29–FR30 | `(app)/settings/templates/`, `lib/db/schema.ts` | Build Phase 1 (MVP) |
| Issue History & Privacy | FR31–FR35 | `(app)/issues/`, row-level ownership guards in service layer | Build Phase 1 (MVP) |
| Marketing & Error Handling | FR36–FR44 | `(marketing)/`, `global-error.tsx`, `ErrorCard.tsx`, `ErrorBoundary.tsx` | Build Phase 1 (MVP) |
| Planning Method & Phase 0 | FR45–FR50 | `(app)/projects/`, `lib/planning/`, planning adapter interface | Future — Build Phase 2 |
| Team Collaboration | FR51–FR56 | `(app)/teams/`, `lib/teams/`, RBAC permission checks | Future — Build Phase 2 |
| Phase 2 BUILD | FR57–FR58 | Agentic workflow engine (architecture TBD) | Future — Build Phase 3 |

No FR without a named architectural home. Build Phase 2 and 3 FRs are architecturally planned but not implemented in MVP.

**Non-Functional Requirements Coverage (all 34 NFRs):**

| NFR Category | Key NFRs | Architecture Response |
|---|---|---|
| Performance | NFR2 (≤3s shell), NFR3 (≤5s first token), NFR6 (≤3s next question) | Server Components + streaming first; `loading.tsx` skeletons; no synchronous AI calls |
| Security | NFR7–NFR12 | `crypto.ts` isolation, server-only `src/lib/`, `getSession()` guard, Zod `safeParse`, row-level ownership |
| Scalability | NFR14–NFR17 | pg-boss distributed locking, K8s horizontal scaling, `getAIProvider()` provider abstraction |
| Accessibility | NFR18–NFR22 | `aria-live` on streamed content, shadcn/ui WCAG-compliant primitives, `prefers-reduced-motion` on skeletons |
| Reliability | NFR24–NFR27, NFR30 | `retryable` flag in `AppError`, `ErrorCard.tsx` retry button, Octokit retry plugin, timeouts on all external calls |
| Extensibility & Future Phases | NFR31–NFR34 | Pluggable `PlanningMethodAdapter` interface, additive team RBAC, Phase 1 independence preserved |

---

### Implementation Readiness Validation

**Decision Completeness:** All critical decisions documented with exact package versions (Next.js 16.1.6, Drizzle 0.45.1, pg-boss 12.14.0). Auth, DB, AI, job queue, caching, session strategy, error format — all decided and documented. Deferred decisions (pgvector, Redis, RBAC, licence key) explicitly labelled as post-MVP — agents will not attempt to implement them. Build Phase 2 architecture (planning adapters, team RBAC) is planned at the interface level but explicitly marked as "do not implement in MVP".

**Structure Completeness:** 70+ files explicitly named with purpose annotations. Every route has a corresponding `actions.ts` or `route.ts`. All service layer modules are named to file level. Test structure covers all six E2E user flows. Build Phase 2 directories (projects, teams, planning) are shown in the tree for forward planning but clearly annotated.

**Pattern Completeness:** Good/anti-pattern code examples provided for server actions. Auth guard pattern shown with exact TypeScript syntax. Validation pattern (Zod `safeParse`) documented with error mapping. Loading state, error handling sequence, streaming, and polling all fully specified with TypeScript examples.

---

### Gap Analysis Results

**Critical Gaps:** None found.

**Important Gaps (resolved in this step):**

1. **Missing optional env vars** — `AZURE_OPENAI_ENDPOINT` and `OLLAMA_BASE_URL` were referenced in the external integrations table but absent from the env var table. Added below.
2. **"Next.js 15" copy artefact** — The tech constraint table read "Next.js 15 App Router". Corrected to "Next.js 16.x" in the document.

**Nice-to-Have:**
- `src/types/jobs.ts` for pg-boss job data interfaces is implied by the worker but not listed in `src/types/`. Agents will create it naturally during worker implementation — not a blocking gap.

---

### Additional Environment Variables

The following optional vars are appended to the env var table from Step 4:

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `AZURE_OPENAI_ENDPOINT` | No | — | Azure OpenAI resource endpoint URL |
| `OLLAMA_BASE_URL` | No | `http://localhost:11434` | Ollama server base URL for local LLM inference |

---

### Architecture Completeness Checklist

**Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed (Medium — CRUD + background jobs + streaming AI)
- [x] Technical constraints identified (self-hosting, no Vercel primitives, BYOK, GHE support)
- [x] Cross-cutting concerns mapped (8 concerns documented)

**Architectural Decisions**
- [x] Critical decisions documented with exact versions
- [x] Technology stack fully specified (all layers)
- [x] Integration patterns defined (Server Actions + Route Handlers + streaming + polling)
- [x] Performance considerations addressed (streaming-first, `unstable_cache`, `loading.tsx`)
- [x] Planning method adapter interface defined (Build Phase 2)
- [x] Team data model and RBAC defined (Build Phase 2)

**Implementation Patterns**
- [x] Naming conventions established (DB, API, code, file, job)
- [x] Structure patterns defined (service layer, component boundaries, test colocation)
- [x] Communication patterns specified (pg-boss, streaming, polling, `Result<T, AppError>`)
- [x] Process patterns documented (auth guard, validation, error handling, loading states)

**Project Structure**
- [x] Complete directory structure defined (70+ files with purpose annotations)
- [x] Component boundaries established (`ui/`, `spekd/`, `lib/` isolation)
- [x] Integration points mapped (all internal and external)
- [x] Requirements to structure mapping complete (all 58 FRs accounted for)
- [x] Build Phase 2 directories planned and annotated

---

### Architecture Readiness Assessment

**Overall Status: READY FOR IMPLEMENTATION**

**Confidence Level: High**

The architecture is internally consistent, fully covers all 58 FRs and 34 NFRs, and provides unambiguous implementation guidance at the file level. No blocking gaps exist. Every architectural decision has a clear rationale, a named location in the project, and a documented pattern for implementation. Build Phase 2 and 3 features are architecturally planned at the interface level, ensuring no breaking changes will be required when they are implemented.

**Key Strengths:**
- Self-hosting is a first-class concern woven through every layer — no Vercel primitives, pg-boss for zero-infra job queue, Docker Compose + K8s, env-var-driven config throughout
- `Result<T, AppError>` + `getSession()` guard are structural safeguards that prevent entire classes of bugs at compile time, not just conventions
- Streaming-first AI pipeline meets all three performance NFRs (NFR2, NFR3, NFR6) without special infrastructure
- PostgreSQL-only stack (app data + job queue + sessions) means zero additional services for self-hosted MVP customers
- Planning method adapter pattern ensures new planning methodologies can be added without modifying core orchestration code
- Team RBAC is designed as additive — Phase 1 (CREATE) remains fully functional without any project or team context

**Areas for Future Enhancement (post-MVP):**
- pgvector embeddings for semantic code search (Phase 2 — NFR15 explicitly deferred)
- Redis or edge cache for deployments beyond MVP scale
- RBAC for team/organisation access (Build Phase 2 — planned, interface defined)
- Planning method adapter implementations beyond BMAD (Build Phase 2)
- External KMS for enterprise encryption key management
- Agentic workflow engine for Phase 2 BUILD (Build Phase 3 — architecture TBD)

---

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented — do not introduce alternatives not listed here
- Use `Result<T, AppError>` from every server action — never throw, never return raw data
- Call `getSession()` as the mandatory first line of every authenticated server action and Server Component
- Read `userId` from session only — never accept it as a client-supplied parameter
- Use Zod `safeParse` for all external input — never `parse` (throws)
- Never import from `src/components/` in `src/lib/` files — service layer has no UI dependency
- Never add `'use client'` to any file in `src/lib/` — all service layer code is server-only
- Do NOT implement any Build Phase 2 or Build Phase 3 features during Build Phase 1 — they are documented here for forward planning only
- Refer to this document for all architectural questions before making independent decisions

**First Implementation Step:**

```bash
pnpm create next-app@latest spekd \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --turbopack \
  --import-alias "@/*"
```

**Build Phase 1 (MVP) implementation sequence (blocked order):**
1. `src/config/env.ts` — Zod env validation; all other modules depend on this
2. `src/lib/db/schema.ts` + `client.ts` — all service functions depend on this
3. `src/lib/crypto.ts` — credential storage; required before auth can store tokens
4. `src/lib/auth/index.ts` — BetterAuth + `getSession()`; all authenticated routes depend on this
5. `src/lib/github/` — Octokit layer; repo management and submission depend on this
6. `src/lib/jobs/` — pg-boss setup; repo scan depends on this
7. `src/lib/ai/` — provider abstraction + prompt engine; clarification loop depends on this
8. Route handlers and Server Actions — depend on all service layer modules above

**Build Phase 2 implementation sequence (after MVP is complete):**
1. `src/lib/teams/` — Team service + RBAC permissions (foundation for shared projects)
2. `src/lib/db/schema.ts` — Add `teams`, `team_members`, `projects`, `project_repos`, `planning_artifacts` tables
3. `src/lib/planning/adapter-interface.ts` — Define the `PlanningMethodAdapter` interface
4. `src/lib/planning/adapters/bmad/` — BMAD Method adapter implementation
5. `src/lib/planning/orchestrator.ts` — Planning workflow orchestration
6. `src/app/(app)/teams/` — Team management routes and UI
7. `src/app/(app)/projects/` — Project management + planning workflow routes and UI
8. Extend existing auth guards to support team-level RBAC alongside user-level ownership
