---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish']
inputDocuments: ['PRODUCT_PLAN.md']
workflowType: 'prd'
classification:
  projectType: 'web_app_saas'
  domain: 'product_lifecycle_platform'
  complexity: 'medium'
  projectContext: 'greenfield'
  targetUsers: 'developers, non-technical stakeholders, founders, and teams'
  businessModel: 'B2C and B2B'
  productPhases: ['PLAN', 'CREATE', 'BUILD']
---

# Product Requirements Document — Spekd

**Author:** ChiaLung Liu
**Date:** 2026-03-03
**Tagline:** *Your idea, fully spekd.*

## Executive Summary

Spekd is a full product lifecycle platform that takes users from a rough idea to fully implemented code — across three distinct product phases: **PLAN**, **CREATE**, and **BUILD**.

**Phase 0: PLAN** — Guided product planning using pluggable "planning methods." Non-technical users describe their product idea, and Spekd walks them through generating a complete PRD, architecture spec, UX spec, and prioritized epics and stories. The BMAD Method is the first planning method adapter, but the architecture supports adding new methods without changes to the core platform. Phase 0 is desktop-first, responsive, and designed primarily for non-technical users — founders, product managers, and business stakeholders who have an idea but don't know how to turn it into an actionable development plan.

**Phase 1: CREATE** — AI-powered, repo-aware issue creation with a clarification loop that asks the questions a senior developer would ask *before* the issue is submitted. This is the original core of the product: a user describes what they need, the AI interrogates their intent using full codebase context, and the output is a well-structured GitHub issue that is immediately actionable by both human developers and AI coding agents. Phase 1 is independently usable — it does not require Phase 0. But when Phase 0 planning artifacts exist, they automatically enrich the Phase 1 creation context, producing even better issues.

**Phase 2: BUILD** — AI agents or developers pick up created issues and implement them with full context from Phase 0 planning and Phase 1 creation. The structured, context-complete issues produced by earlier phases are machine-readable by design — enabling agentic development pipelines where tools like Copilot, Cursor, or Claude Code can fulfill issues autonomously.

Target users span the full spectrum: non-technical founders and product managers who need to go from idea to plan, business analysts and stakeholders who need a bridge to GitHub, developers who want speed and quality, and teams who need collaboration and consistency. The product serves both B2C (individuals and small teams) and B2B (organisations and enterprises) markets.

The planning method abstraction is a key architectural differentiator. Rather than embedding a single opinionated planning methodology, Spekd provides an adapter interface that allows different planning methods to plug in. The BMAD Method — an MIT-licensed, multi-agent planning framework — is the first adapter. Future adapters could support Shape Up, SAFe, custom enterprise methodologies, or community-contributed methods. This makes Spekd a platform, not a single-methodology tool.

### What Makes This Special

Spekd is not an issue formatter or a project management tool — it is a **full lifecycle platform** that connects the dots from initial idea through structured planning to actionable development work. No existing tool covers this entire chain with AI-driven intelligence at every step.

**1. AI as Interrogator, Not Generator**
The dominant AI writing tool paradigm is: user provides input → AI produces better output. Spekd inverts this. The AI's primary role is to *ask questions* — surfacing what the user doesn't know they haven't said — before any content is generated. Whether in the planning phase (clarifying product vision) or the creation phase (clarifying issue intent), the output is a byproduct of a structured interrogation, not a one-shot generation.

**2. Repo + Code Context-Driven Clarification**
Spekd uses both repository structure (file tree, README, recent issues) *and* actual source code content (files, functions, modules) to generate targeted clarifying questions and issue content. Context depth adapts to user role: non-technical users see concept-level language ("the billing section"); developers see file paths, function names, and specific implementations.

**3. Planning Method Abstraction**
Spekd introduces pluggable planning methods — structured approaches to product planning that can be added, configured, and selected independently of the core platform. The BMAD Method is the first adapter, guiding users from idea → PRD → Architecture → UX Spec → Epics → Stories. But the adapter interface means Shape Up, SAFe, or custom enterprise methodologies can plug in without architectural changes.

**4. Phase 0 → Phase 1 Data Flow**
Planning artifacts generated in Phase 0 (PRDs, architecture specs, UX specs, stories) flow directly into Phase 1 as enriched context. When a user creates an issue from a Phase 0 story, the AI clarification loop has access to the full planning context — the product vision, architectural decisions, UX constraints, and related stories. This produces dramatically better issues than starting from a blank description.

**5. Agentic Workflow On-Ramp**
A well-formed Spekd issue is machine-readable by design — complete enough for an AI coding agent to act on without further human input. Spekd is positioned as the structured entry point to agentic development pipelines, a space with very few deliberate products. Phase 2 (BUILD) makes this explicit.

**6. Persona-Aware AI Communication**
Spekd adapts interaction style based on user role set during onboarding. Non-technical users receive plain-language, guided questions with concept-level context. Developers receive concise, technical questions with code-level precision. The same underlying context powers both experiences — the difference is communication, not knowledge.

**Why now:** The rise of AI coding agents has raised the quality bar for GitHub issues dramatically. A vague issue that a human developer can muddle through is a hard blocker for an AI agent. Simultaneously, non-technical founders and product managers are increasingly building with AI agents — but they lack the structured planning artifacts these agents need to work effectively. Spekd sits at this intersection at exactly the right moment.

## Success Criteria

### User Success

- A non-technical user reads their AI-generated issue and says "I couldn't have said it better myself — and I actually understand it." Output is clear to both the creator and the developer who receives it.
- Developers act on Spekd-created issues with near-zero follow-up questions — no clarification calls, no Slack threads.
- The AI clarification loop surfaces the right questions before generation such that the final issue is complete and unambiguous on first read.
- A non-technical founder completes the Phase 0 planning workflow and produces a PRD, architecture spec, and UX spec that a technical team can act on without further scoping sessions.
- Team members collaborate effectively within shared workspaces — planning artifacts, repos, and issues are accessible to the right people with the right permissions.

### Business Success

- **3-month targets:** 10 active teams, 200 issues created, 1–2 paying B2B customers.
- **Primary success signal:** User feedback indicating desire for improvement and continued use. Churn or silence signals the opposite.
- Revenue from at least 1 B2B customer validates the paid value proposition before significant growth investment.

### Technical Success

- Issue generation quality is the primary technical metric — output must be structured, complete, and contextually accurate relative to the selected repository.
- Reliability is coupled to GitHub API availability; Spekd handles API failures gracefully (clear error states, no silent failures) rather than guaranteeing uptime independently.
- The interactive clarification loop produces noticeably better output than single-shot generation — this is the measurable quality bar for the AI system.
- Architecture supports future integration with additional platforms (Jira, Azure DevOps, etc.) and optionally GitHub CLI.
- The planning method adapter interface cleanly abstracts planning methodology from core platform logic.

### Phase 0 Success (future — Build Phase 2)

- Planning workflow completion rate exceeds 60% — users who start planning finish with at least a PRD and epics.
- Generated planning artifacts are rated "actionable without major revision" by technical reviewers in >70% of cases.
- Users who flow from Phase 0 to Phase 1 produce higher-quality issues (measured by developer follow-up rate) than users who start directly in Phase 1.

### Team Collaboration Success (future — Build Phase 2)

- Teams of 3+ members actively share planning artifacts and collaborate on issue creation.
- Team workspace setup-to-first-shared-issue time is under 15 minutes.
- Role-based permissions prevent unauthorized access — zero cross-team data leaks.

### Measurable Outcomes

| Metric | Target | Timeframe |
|---|---|---|
| Active teams | 10 | 3 months |
| Issues created | 200 | 3 months |
| Paying B2B customers | 1–2 | 3 months |
| Developer follow-up questions per issue | ~0 | Ongoing |
| User feedback/improvement requests received | Active signal | Ongoing |
| Planning workflow completion rate (Phase 0) | >60% | Post-Build Phase 2 launch |
| Planning artifact quality (actionable without major revision) | >70% | Post-Build Phase 2 launch |
| Team workspace setup-to-first-shared-issue | <15 min | Post-Build Phase 2 launch |

## User Journeys

### Journey 1: Sarah — The BA Who Finally Feels Heard

**Persona:** Sarah is a Business Analyst at a mid-sized SaaS company. She has clear ideas about what the product needs but has never written code. Every time she submits a GitHub issue, it gets returned with questions, or worse — silently misunderstood. She dreads the clarification calls with developers who are hard to get hold of, and she's started to feel like the bottleneck.

**Opening Scene:** Tuesday morning. Sarah has just finished a stakeholder meeting where she's been asked to get a new feature into the next sprint. She opens Spekd, selects the relevant repo, and types in plain language: *"We need to show users their remaining credit balance somewhere on the dashboard."*

**Rising Action:** Instead of immediately generating an issue, Spekd asks three targeted questions: *Where on the dashboard should this appear — header, sidebar, or near the billing section? Should this be real-time or refreshed on page load? Should it show a warning state when credits fall below a threshold?* Sarah answers each one. She didn't know some of these were decisions she needed to make — but the questions make sense to her.

**Climax:** Spekd generates the issue. It has a clear title, a summary that sounds exactly like what she described, acceptance criteria she actually understands, and technical notes referencing the billing module in the repo. She thinks: *"I couldn't have said it better myself — and I actually understand it."* She hits Submit.

**Resolution:** The issue lands in GitHub. The assigned developer reads it, asks zero follow-up questions, and picks it up in the same sprint. For the first time, Sarah feels like a full participant in the development process — not a translator who keeps getting lost.

**Requirements revealed:** Interactive AI clarification loop, repo context integration, structured issue output (title, summary, acceptance criteria, technical notes, labels), GitHub submission, issue history.

---

### Journey 2: Marcus — The Developer Who Just Wants It Done

**Persona:** Marcus is a senior developer at a startup. He writes his own issues when he has to but finds the process tedious. GitHub templates feel rigid. He needs speed and structure, not hand-holding.

**Opening Scene:** Marcus has just identified a bug in the authentication middleware. He knows exactly what it is, what causes it, and roughly how to fix it. He opens Spekd, selects the repo, and types a dense technical description in under 30 seconds.

**Rising Action:** The AI clarification loop kicks in. Marcus is slightly impatient — he already knows the answers. The questions are actually good though: *"Is this reproducible in production or only locally? What's the expected vs actual behaviour on token expiry?"* — things he knows instantly. He answers quickly.

**Climax:** Spekd generates a well-structured issue with labels (`bug`, `auth`, `high-priority`), reproduction steps, expected vs actual behaviour, and technical notes referencing the correct middleware file. It would have taken him 5 minutes to write this himself. It took 45 seconds.

**Resolution:** He submits it directly to GitHub — clean, complete, ready for a teammate or an AI agent. Marcus opens the next tab. He's already moved on.

**Requirements revealed:** Speed-optimised creation flow, technical label inference, repo-aware technical notes, structured bug report format, fast clarification loop.

---

### Journey 3: Jordan — The Developer Who Just Wants to Build

**Persona:** Jordan is a mid-level developer on a cross-functional team where PMs and BAs regularly create GitHub issues. Historically, about half required at least one clarification exchange before Jordan could start. Jordan has started to dread Monday morning issue triage.

**Opening Scene:** Jordan opens GitHub on Monday morning. Four new issues in the backlog. Two were created via Spekd. Jordan clicks the first one.

**Rising Action:** The issue is structured clearly — title, a plain-language summary that still makes technical sense, specific and testable acceptance criteria, correctly categorised labels, and a technical notes section referencing the exact files affected. Jordan reads it once. Everything is there.

**Climax:** Jordan assigns it to themselves and starts working immediately. No Slack message to the BA. No "quick call to clarify." The clarity means Jordan can make confident implementation decisions without second-guessing intent.

**Resolution:** Jordan finishes the issue in the same sprint it was created. At the retrospective, Jordan mentions issue quality has noticeably improved. The team starts tracking clarification requests — trending toward zero.

**Requirements revealed:** Structured issue output optimised for developer consumption, acceptance criteria format, technical notes with file references, accurate label inference, GitHub-native experience.

---

### Journey 4: Priya — The Admin Who Sets the Standard

**Persona:** Priya is an engineering manager at a 20-person product company. She set up Spekd for her team. She cares about consistency — every team has different conventions, and she wants Spekd to match *their* style.

**Opening Scene:** Priya logs into Spekd and navigates to team settings before the team's kick-off next week.

**Rising Action:** She browses Spekd's out-of-the-box templates — bug report, feature request, technical debt. The feature request template is close but missing a "Business Context" section her team always includes. She notes to upload a custom version post-MVP. For now, she selects the feature request template as team default, assigns it to the two repos her team uses most, and sets the default AI provider.

**Climax:** Priya previews what a generated issue looks like with this template applied. It matches her team's conventions closely enough. She saves and Slacks her team: *"Spekd is ready. Just select the repo and describe what you need."*

**Resolution:** The team starts creating issues. Output is consistent — same structure, same labels, same quality bar. When she reviews the backlog on Friday, everything is readable, actionable, and consistent.

**Requirements revealed:** Team settings UI, out-of-the-box template library, template selection per repo, default AI provider setting, admin onboarding flow, template preview.

---

### Journey 5: Alex — The Visitor Who Needs Convincing

**Persona:** Alex is a freelance PM managing projects for three clients, juggling GitHub repos and Linear boards. A colleague mentions Spekd in a Slack community. Alex is sceptical — they've seen a lot of "AI productivity" tools that overpromise.

**Opening Scene:** Alex lands on the Spekd marketing page, giving it 90 seconds to prove itself.

**Rising Action:** The landing page communicates the value proposition clearly: *from idea to fully spekd — plan, create, build.* A demo shows the clarification loop in action. Alex recognises the pain immediately and clicks "Sign in with GitHub."

**Climax:** OAuth takes seconds. Spekd surfaces Alex's accessible repos. They pick a real client repo, type a quick description, answer two clarifying questions, and get a generated issue better than what they'd have written manually. Under two minutes, start to finish.

**Resolution:** Alex is sold. They bookmark Spekd for all three clients and refer two colleagues that week. The product proved its value in the first session without needing to explain itself.

**Requirements revealed:** Marketing landing page, GitHub OAuth, zero-friction onboarding to first issue, repo auto-discovery, clear value communication.

---

### Journey 6: Nadia — The Founder Who Has an Idea

**Persona:** Nadia is a non-technical co-founder of a pre-seed startup. She has a clear product vision — a marketplace for freelance sustainability consultants — but no technical background. She's tried writing specs in Google Docs, but her CTO says they're not detailed enough to start building. She needs a way to go from "I know what I want" to "here's exactly what to build."

**Opening Scene:** Nadia discovers Spekd through a founder community. She signs in with GitHub and sees the option to start a new project with guided planning. She selects the BMAD planning method — the description says it will walk her through creating a full product specification from her idea.

**Rising Action:** Spekd's planning workflow asks Nadia to describe her product in plain language. She types: *"A marketplace where companies can find and hire freelance sustainability consultants for ESG reporting, carbon audits, and compliance projects."* The AI asks structured follow-up questions: *Who are your primary users — the companies hiring or the consultants? What's the core transaction — hourly billing, project-based, or subscription? Do consultants need to be verified or credentialed?* Nadia answers each one, realizing the AI is surfacing decisions she hadn't considered.

**Climax:** Over the course of an hour across two sessions, the BMAD planning method guides Nadia through generating a complete PRD, a high-level architecture spec (she doesn't fully understand the technical details, but trusts the structure), a UX specification with key screen descriptions, and a prioritised set of epics broken into stories. She reviews each artifact, makes edits where her domain knowledge adds nuance, and finalises the plan. Her CTO reads the output and says: *"This is exactly what I needed. I can start building from this."*

**Resolution:** Nadia clicks "Create Issues" on the first epic's stories. Spekd flows her into Phase 1 (CREATE), where the AI clarification loop has access to the full planning context — the PRD, architecture decisions, UX constraints, and related stories. The generated GitHub issues are richer and more contextually complete than anything she could have written from scratch. Her CTO picks up the first issue that afternoon.

**Requirements revealed:** Planning method selection and initiation, BMAD planning method adapter, guided multi-step planning workflow, planning artifact generation (PRD, architecture, UX, epics, stories), artifact review and editing, planning artifact storage per project, Phase 0 → Phase 1 data flow, planning context injection into AI clarification loop, issue creation from planning stories.

---

### Journey 7: Raj — The Team Lead Who Invites the Team

**Persona:** Raj is an engineering team lead at a growing SaaS company. His team of six — three developers, a QA engineer, a designer, and a PM — has been using Spekd individually. Raj wants to bring them into a shared workspace where they can collaborate on planning, share repos, and maintain consistency.

**Opening Scene:** Raj creates a team workspace in Spekd and names it after his product team. He invites his six team members by email and GitHub username.

**Rising Action:** Team members accept their invitations and join the workspace. Raj assigns himself as Owner, promotes the PM to Admin, and keeps the rest as Members. He configures team defaults: the team's preferred AI provider, the BMAD planning method, and the feature request template as the default for their main repos. The PM starts a Phase 0 planning workflow for a new product initiative — the planning artifacts are automatically shared within the team workspace.

**Climax:** The designer reviews the UX spec generated during planning and adds annotations. The developers browse the architecture spec and flag a question about the proposed data model. The PM refines the epics based on the team's feedback — all within the shared workspace. When the stories are ready, the PM creates issues from them, and Raj assigns them across the team.

**Resolution:** The team's entire product lifecycle — from idea through planning to issue creation — lives in one shared workspace with appropriate access controls. Raj can see everything; the PM can manage planning and templates; team members can access shared repos and artifacts. No more duplicated effort, no more context silos. At standup, everyone references the same planning artifacts and issues.

**Requirements revealed:** Team workspace creation, member invitation (email and GitHub username), role-based permissions (Owner, Admin, Member), team default settings (AI provider, planning method, templates), shared planning artifact access, team-scoped repo management, cross-member collaboration on artifacts, team data isolation.

---

### Journey Requirements Summary

| Capability | Journeys That Reveal It |
|---|---|
| Interactive AI clarification loop | Sarah, Marcus, Alex, Nadia |
| Repo context integration | Sarah, Marcus, Jordan |
| Structured issue output (title, summary, AC, labels, technical notes) | All journeys |
| GitHub submission | All journeys |
| Speed-optimised creation flow | Marcus, Alex |
| Out-of-the-box template library | Priya, Raj |
| Team settings + admin configuration | Priya, Raj |
| Template selection per repo | Priya, Raj |
| Developer-optimised issue reading experience | Jordan |
| Marketing landing page + fast onboarding | Alex |
| GitHub OAuth + repo auto-discovery | Alex, Sarah |
| Issue history (stored in DB) | Sarah, Marcus |
| Planning method selection and guided workflow | Nadia |
| Planning artifact generation (PRD, architecture, UX, epics, stories) | Nadia, Raj |
| Planning artifact review and editing | Nadia, Raj |
| Phase 0 → Phase 1 data flow (planning context in issue creation) | Nadia |
| Team workspace creation and member invitation | Raj |
| Role-based permissions (Owner, Admin, Member) | Raj |
| Team default settings (AI provider, planning method, templates) | Raj |
| Shared planning artifact access within team | Raj |
| Team data isolation | Raj |

## Domain-Specific Requirements

### Compliance & Regulatory

- No regulated domain compliance requirements (no HIPAA, PCI-DSS, GDPR-specific obligations beyond standard data handling).
- Issue prompts, generated content, planning artifacts, and GitHub metadata are **strictly private to the creating user or their team workspace**. No cross-user or cross-team data access is permitted.
- GDPR-adjacent right to deletion: users can delete their stored issue history, planning artifacts, and account data at any time. Designed in from the start even if not legally mandated at MVP.

### Technical Constraints

- GitHub OAuth tokens must be stored encrypted at rest, never exposed client-side or logged. Refresh and revocation flows must be handled gracefully.
- Multi-tenant data isolation must be enforced at the database layer — one user's repos, issues, API keys, and settings must never be accessible to another. Team workspace isolation extends this to the team level — one team's projects, repos, planning artifacts, and settings must never be accessible to another team.
- User-submitted descriptions and AI-generated content are processed by third-party AI providers (Anthropic, OpenAI). Users must be informed of this during onboarding.
- When fetching repo context (file tree, README, code), Spekd accesses only what the user's GitHub token has permission to see. No escalation of privilege.
- Planning method adapters must conform to a defined interface and operate within Spekd's security and data isolation boundaries.

### Integration Requirements

- **GitHub API (MVP):** OAuth, repo listing, repo context fetching (file tree, README, file contents, recent issues), issue creation.
- **AI providers (MVP):** Anthropic Claude and OpenAI GPT-4 via Vercel AI SDK. Provider abstraction must allow adding new providers without architectural changes.
- **Planning method adapters (future — Build Phase 2):** BMAD Method as the first adapter. Adapter interface must support adding new planning methods without changes to the core platform.
- **Phase 0 → Phase 1 data flow (future — Build Phase 2):** Planning artifacts (PRD, architecture spec, UX spec, stories) must be accessible as enriched context during Phase 1 issue creation.
- **Phase 2 BUILD integrations (future — Build Phase 3):** Agentic workflow integration, multi-platform issue targets (Jira, Azure DevOps), GitHub CLI submission path.

### Risk Mitigations

- **Token exposure:** Server-side-only token handling; never pass GitHub access tokens to the client. Encrypt at rest.
- **AI hallucination:** Generated content is AI-assisted and must be reviewed before submission. The edit step before submission is the primary mitigation; AI-assisted badge reinforces transparency. In Phase 0 planning, all generated artifacts are editable before finalization.
- **Third-party API dependency:** GitHub API and AI provider outages will affect Spekd. Graceful error states (clear messaging, no silent failures) are the primary mitigation.
- **Prompt injection:** User-submitted descriptions are sanitised and structured before being forwarded to AI providers.
- **Planning method adapter security:** Adapters must not access data outside their assigned project scope. Adapter interface enforces isolation boundaries.

## Innovation & Novel Patterns

### Innovation Areas

**1. AI as Interrogator, Not Generator**
The dominant AI writing tool paradigm is: user provides input → AI produces better output. Spekd inverts this. The AI's primary role is to *ask questions* — surfacing what the user doesn't know they haven't said — before any content is generated. Whether in the planning phase (clarifying product vision) or the creation phase (clarifying issue intent), the output is a byproduct of a structured interrogation, not a one-shot generation.

**2. Repo + Code Context-Driven Clarification**
Spekd uses both repository structure (file tree, README, recent issues) *and* actual source code content (files, functions, modules) to generate targeted clarifying questions and issue content. Context depth adapts to user role: non-technical users see concept-level language ("the billing section"); developers see file paths, function names, and specific implementations.

**3. Planning Method Abstraction**
Spekd introduces a pluggable planning method architecture — a genuinely novel pattern in the product planning space. Rather than embedding a single opinionated methodology, Spekd defines an adapter interface that allows different planning methods (BMAD Method, Shape Up, SAFe, custom enterprise methods) to plug in independently. This makes Spekd a platform for product planning, not a single-methodology tool. The BMAD Method (MIT-licensed) is the first adapter, proving the pattern.

**4. Phase 0 → Phase 1 → Phase 2 Data Continuity**
Most product tools create data silos: planning tools produce documents that are manually translated into project management tools, which produce tickets that are manually interpreted by developers. Spekd maintains structured data continuity across all three phases. A product idea in Phase 0 becomes a planning artifact, which becomes enriched context for Phase 1 issue creation, which becomes a context-complete work item for Phase 2 implementation. No data is lost; no manual translation is required.

**5. Agentic Workflow On-Ramp**
A well-formed Spekd issue is machine-readable by design — complete enough for an AI coding agent to act on without further human input. Spekd is positioned as the structured entry point to agentic development pipelines, a space with very few deliberate products.

**6. Persona-Aware AI Communication**
Spekd adapts interaction style based on user role set during onboarding. Non-technical users receive plain-language, guided questions with concept-level context. Developers receive concise, technical questions with code-level precision. The same underlying context powers both experiences — the difference is communication, not knowledge.

### Competitive Landscape

| Tool | Gap |
|---|---|
| GitHub issue templates | Static structure, no intelligence, requires user to know what to fill in |
| GitHub Copilot | Helps developers write code and comments; not designed for non-technical users or product planning |
| Linear AI | Single-shot generation, no clarification loop, developer-centric, no planning phase |
| Notion AI / Confluence AI | Documentation-focused, not GitHub-native, no repo context, no lifecycle continuity |
| Product planning tools (Productboard, Aha!) | Planning only, no code-aware issue creation, no agentic workflow integration |
| BMAD Framework (standalone) | Powerful planning methodology but requires manual operation; Spekd automates and extends it |

None combine: (a) non-technical user accessibility, (b) AI-driven clarification loop, (c) repo and code context, (d) persona-aware communication, (e) pluggable planning method abstraction, (f) planning-to-creation data continuity, and (g) agentic workflow readiness. Spekd occupies a genuinely unoccupied position across the full product lifecycle.

### Validation Approach

- **Primary:** User feedback after first issue creation — does the non-technical user feel accurately represented? Does the developer act without follow-up?
- **Quantitative:** Track clarification-to-submission ratio. If users rarely skip questions, the interrogation model is working.
- **Quality:** Track developer follow-up rate per issue. Target: trending toward zero.
- **Persona:** Measure whether persona-adapted communication reduces drop-off during the clarification loop for non-technical users.
- **Planning (post-MVP):** Measure planning workflow completion rate and artifact quality ratings from technical reviewers.
- **Data continuity (post-MVP):** Compare issue quality for Phase 0 → Phase 1 users vs Phase 1-only users. Hypothesis: planning context produces measurably better issues.
- **Agentic (post-MVP):** Measure how often Spekd-generated issues are fulfilled by AI agents without human amendment.

### Innovation Risks

- **Interrogation fatigue:** Too many questions frustrate users, especially developers. Mitigation: AI asks the *minimum necessary* questions. Post-MVP single-shot toggle is the escape valve.
- **Context quality dependency:** Sparse README or unclear file structure degrades question quality. Mitigation: graceful fallback to generic-but-useful questions when context is thin.
- **Persona misclassification:** Wrong role setting produces an off-feeling communication style. Mitigation: user-set (not auto-detected), easily changeable in settings.
- **Planning method adapter complexity:** Making the adapter interface generic enough for multiple methods while specific enough to be useful is a design challenge. Mitigation: design the interface with the BMAD Method first; generalise only when a second adapter is in active development.
- **Phase continuity over-promise:** The Phase 0 → Phase 1 → Phase 2 data flow is a vision that will be realised incrementally. Communicate current capabilities clearly; roadmap future phases transparently.
- **Agentic over-promise:** Agentic on-ramp is a vision claim, not an MVP feature. Communicate as roadmap direction only.

## Web App Requirements

### Architecture Overview

Spekd is a hybrid Next.js 16.x App Router application — SSR for public-facing pages (landing, auth) and SPA-like client navigation for the authenticated app shell (dashboard, issue creation, planning, settings). This optimises SEO for acquisition and responsiveness for the core product experience.

- **Rendering:** SSR for `/`, `/sign-in`, `/sign-up`. Client-side navigation within `/dashboard`, `/issues/*`, `/projects/*`, `/settings`.
- **Streaming:** AI issue generation and planning artifact generation stream tokens to the UI in real-time via Vercel AI SDK. Creation and planning pages handle streaming state gracefully — progressive rendering, clear loading states, graceful mid-stream error recovery.
- **Real-time collaboration:** Not in scope for MVP (Build Phase 1).
- **Framework:** Next.js 16.x App Router, TypeScript strict mode.
- **Auth:** BetterAuth (env var: `BETTER_AUTH_SECRET`).
- **Database:** Drizzle ORM + PostgreSQL. Tables: `users`, `repos`, `repo_files`, `issues`, `issue_templates` (snake_case plural).
- **Background jobs:** pg-boss.
- **Styling:** Tailwind CSS v4 + shadcn/ui.
- **AI integration:** Vercel AI SDK with BYOK (Bring Your Own Key) model.
- **Deployment:** Vercel for hosted offering; Docker/Kubernetes for self-hosting. All phases (PLAN, CREATE, BUILD) are self-hostable.
- **Package manager:** pnpm.

### Browser & Device Support

- **Supported browsers:** Chrome, Firefox, Safari, Edge — latest 2 major versions each. No IE11 or legacy Edge support; no legacy polyfills required.
- **Responsive design:** Desktop-first, fully responsive. All screens — including the clarification loop, issue review, and planning workflows — must be fully functional on tablet and mobile, but the primary design target is desktop.

### SEO & Accessibility

- **SEO:** Public pages are server-rendered and fully crawlable. Title, description, Open Graph, and Twitter/X card meta tags on all public pages. Core Web Vitals compliance serves dual purpose as both UX and SEO signal.
- **Accessibility:** WCAG 2.1 AA compliance across all screens. The AI clarification loop must be fully keyboard-navigable and screen-reader friendly. Focus managed correctly as new questions appear dynamically. Colour contrast 4.5:1 (AA) minimum in all UI states.

## Project Scoping

> **Terminology note:** Spekd has two distinct phase systems that should not be confused:
>
> - **Product Phases** describe the user-facing product lifecycle: **Phase 0 (PLAN)**, **Phase 1 (CREATE)**, and **Phase 2 (BUILD)**. These are the three stages a user moves through — from idea to plan to issues to implementation.
> - **Build Phases** describe the order in which we implement the product: **Build Phase 1 (MVP)**, **Build Phase 2**, and **Build Phase 3**. These are engineering milestones that determine what gets built when.
>
> The two systems do not map 1:1. Build Phase 1 delivers Product Phase 1 (CREATE). Build Phase 2 delivers Product Phase 0 (PLAN) plus team collaboration. Build Phase 3 delivers Product Phase 2 (BUILD) plus growth features.

### MVP Philosophy

**Experience MVP** — deliver the "wow" moment as fast as possible. A non-technical user describes what they need, Spekd scans the codebase, asks at most 3 targeted clarifying questions, and produces an issue so good the user says "I couldn't have said it better myself." Everything in Build Phase 1 exists to make that moment happen reliably.

**Single-user focused:** No team management or multi-user collaboration in Build Phase 1. Anyone signs up with GitHub and starts creating issues immediately — zero team setup required.

### Build Phase 1: MVP — Product Phase 1 (CREATE)

The original core: AI-powered, repo-aware issue creation with a clarification loop. This is what ships first. Single-user focused, independently valuable without any planning features.

**Core journeys supported:** Sarah (non-technical creator), Marcus (developer creator), Alex (first-time visitor/onboarding)

1. **GitHub OAuth** — sign in, auto-fetch accessible repos
2. **Repo selection** — pick any accessible repo, or manually add by `owner/repo`
3. **Initial repo code scan** — on first repo add, full codebase scan stores file contents as a code index. Progress bar shown to user.
4. **Manual re-scan** — user triggers fresh scan from repo settings at any time
5. **User role setting** — self-select "I'm a developer" / "I'm not a developer" during onboarding. Controls AI communication style and context depth throughout. Stored as `is_developer` boolean.
6. **BYOK (Bring Your Own Key)** — user provides their own Anthropic or OpenAI API key. No Spekd-hosted AI in MVP. Guided step-by-step setup flow for each provider embedded in onboarding. Keys stored encrypted server-side only. Model recommendations shown in the UI.
7. **Interactive AI clarification loop** — always on for MVP. AI asks **at most 3** targeted questions before generating, using repo + code context. Questions persona-adapted (plain language for non-technical; technical for developers).
8. **AI issue generation** — structured output: title, summary, acceptance criteria, labels, technical notes. Persona-aware: non-technical users see concept-level context; developers see file paths and function references.
9. **Out-of-the-box issue templates** — bug report, feature request, technical debt. Applied at generation time.
10. **Issue review and edit** — user reviews and edits all fields before submitting. AI-assisted badge visible.
11. **Submit to GitHub** — push issue directly via GitHub API
12. **Issue history stored in DB** — stored privately per user; browsing UI is post-MVP
13. **Marketing landing page** — SSR, SEO-optimised, demonstrates the clarification loop, fast path to sign-up

### Build Phase 2: Product Phase 0 (PLAN) + Teams

Guided product planning and team collaboration. Introduces the "project" concept as a thin wrapper over repos, without breaking any Build Phase 1 functionality.

**Core journeys supported:** Nadia (founder planning), Raj (team lead), Priya (admin)

- **Planning method selection** — users choose a planning method (BMAD Method is the first adapter) when starting a new project
- **BMAD planning method adapter** — guided multi-step workflow: idea → PRD → Architecture Spec → UX Spec → Epics → Stories
- **Planning artifact generation, review, and editing** — AI generates artifacts; users review, edit, and iterate before finalising
- **Planning artifact storage** — per-project, accessible within the project scope
- **Phase 0 → Phase 1 flow** — create issues from Phase 0 stories with planning context automatically injected into the AI clarification loop
- **Project wrapper** — thin concept that groups planning artifacts and repos. Phase 1 (CREATE) remains repo-centric and independently usable; the project wrapper is additive, not breaking.
- **Team workspace creation** — create a named team workspace
- **Member invitation** — invite members by email or GitHub username
- **Role-based permissions** — Owner, Admin, Member
- **Shared planning artifacts** — team members access planning artifacts within the team workspace
- **Shared repos** — team members access repos added to the team workspace
- **Team default settings** — AI provider, templates, planning method defaults configurable by Owner/Admin
- **Team data isolation** — enforced at the database layer
- Spekd-hosted AI free tier (usage-limited)
- Scheduled repo re-scan (daily/weekly auto-indexing)
- Custom template upload
- Single-shot generation mode (clarification loop toggle)
- Issue history UI (browse, re-submit, clone)

### Build Phase 3: Product Phase 2 (BUILD) + Growth

Agentic workflow integration and platform expansion. Issues created in Phase 1 can be assigned to AI agents or developers with full Phase 0 and Phase 1 context attached.

- **Agentic workflow integration** — submit issue → trigger AI coding agent with full planning and creation context
- **Implementation status tracking** — track issues across Phase 0 planning, Phase 1 creation, and Phase 2 build
- **Multi-platform integrations** — Jira, Azure DevOps, GitHub CLI
- **Webhook-triggered re-scan** on push events
- **Analytics** — issue count, quality scoring, clarification loop effectiveness, planning workflow metrics
- **GitHub Projects integration**
- **Developer review experience** (reviewer-mindset UI)

### Risk Mitigation Strategy

**Technical Risks:**
- *Code scan infrastructure complexity* — background job processing and full file indexing is the highest-complexity MVP component. Mitigation: use proven queue tooling (pg-boss), scope to GitHub API file fetching (no git clone required), timebox implementation. Fallback: ship with repo-structure-only context first; add full code scanning in fast follow.
- *AI quality variance* — clarification loop quality depends heavily on prompt engineering. Mitigation: invest in prompt iteration with real user descriptions before launch.
- *Code index storage costs* — full file contents grow linearly with users and repos. Mitigation: acceptable at MVP scale; revisit storage strategy (embeddings, chunking) as Build Phase 2 infrastructure work.
- *Planning method adapter interface design* — designing a generic-enough adapter interface before the second adapter exists risks over-engineering. Mitigation: design for BMAD Method first; extract the generic interface when a second method is in active development.

**Market Risks:**
- *Non-technical user trust in AI output* — Mitigation: edit step before submission is the safety valve; AI-assisted badge reinforces transparency.
- *BYOK barrier for non-technical users* — Mitigation: guided "how to get your API key" onboarding flow with step-by-step instructions per provider. Model recommendations in the UI reduce decision fatigue.
- *Developers dismiss it as "just another AI tool"* — Mitigation: code context depth and quality of technical notes is the differentiator. Marcus's journey must feel meaningfully faster and better than writing manually.

## Functional Requirements

### User Account & Onboarding

- FR1: Users can sign in to Spekd using their GitHub account via OAuth.
- FR2: Users can select their role ("I'm a developer" / "I'm not a developer") during onboarding to set their communication preference.
- FR3: Users can provide and save their own Anthropic or OpenAI API key (BYOK) as their AI provider.
- FR4: Users can access step-by-step guidance on obtaining an API key from each supported AI provider, embedded within the onboarding flow.
- FR5: Users can update their role preference and API key at any time in account settings.
- FR6: Users can delete their account and all associated data (issue history, stored API keys, repo index) at any time.

### Repository Management

- FR7: Users can view and select from a list of GitHub repositories they have access to, auto-fetched after OAuth sign-in.
- FR8: Users can manually add a repository by `owner/repo` identifier.
- FR9: Users can trigger an initial full code scan of a newly added repository, indexing full file contents for AI context.
- FR10: The system displays a progress indicator while a repository code scan is in progress.
- FR11: Users can trigger a manual re-scan of any previously added repository to refresh the code index.
- FR12: The system notifies users if a repository scan fails, with actionable guidance on next steps.
- FR13: Users can remove a repository from Spekd, which deletes its stored code index.

### Issue Creation & AI Clarification Loop

- FR14: Users can initiate issue creation by selecting a repository and entering a free-text description.
- FR15: The system conducts an AI-driven clarification loop, asking up to 3 targeted follow-up questions before generating any issue content.
- FR16: Clarifying questions are generated using the selected repository's code index and structure as context.
- FR17: Clarifying questions are adapted in language and technical depth to match the user's selected role (plain language for non-technical; technical, code-level language for developers).
- FR18: Users can answer clarifying questions with answers incorporated into the final issue generation.

### AI Issue Generation

- FR19: The system generates a structured GitHub issue comprising: title, summary, acceptance criteria, labels, and technical notes.
- FR20: Generated technical notes reference file paths and function names for developer-role users, and concept-level descriptions for non-technical users.
- FR21: The system applies an appropriate out-of-the-box issue template (bug report, feature request, or technical debt) during generation.
- FR22: Issue content is streamed to the user progressively as it is generated, with clear loading state feedback.
- FR23: Generated issues are clearly labelled as AI-assisted.

### Issue Review & Submission

- FR24: Users can review all fields of a generated issue before submitting.
- FR25: Users can edit any field (title, summary, acceptance criteria, labels, technical notes) of the generated issue before submitting.
- FR26: Users can submit a reviewed issue directly to GitHub via the GitHub API.
- FR27: The system confirms successful submission and provides a direct link to the created GitHub issue.
- FR28: The system communicates clearly if issue submission fails, with guidance on next steps.

### Issue Templates

- FR29: Users can select from Spekd's out-of-the-box templates: bug report, feature request, and technical debt.
- FR30: The system applies the selected template structure during AI issue generation.

### Issue History

- FR31: The system stores each created issue privately per user in the database.
- FR32: Stored issue data is accessible only to the user who created it; no cross-user access permitted.

### Privacy & Data Controls

- FR33: Users can view what data Spekd stores about them (issue history, API keys, repo index).
- FR34: Users are informed during onboarding that their issue descriptions and repo content are sent to their chosen third-party AI provider.
- FR35: The system enforces strict per-user data isolation — no user can access another user's repos, issues, templates, or settings.

### Marketing & Acquisition

- FR36: Unauthenticated visitors can access a public marketing landing page communicating Spekd's value proposition.
- FR37: The landing page demonstrates the AI clarification loop in action (e.g. demo or animation).
- FR38: Visitors can initiate GitHub OAuth sign-up directly from the landing page.
- FR39: The landing page is server-rendered and fully crawlable, with title, description, Open Graph, and Twitter/X card meta tags.

### Error Handling & System Feedback

- FR40: The system communicates GitHub API errors clearly to users (e.g. token expired, insufficient repo permissions).
- FR41: The system communicates AI provider errors clearly to users (e.g. invalid API key, quota exceeded, provider unavailable).
- FR42: The system handles mid-stream generation failures gracefully, with a clear error state and recovery option.
- FR43: Every error across all core flows surfaces a user-visible, actionable message — no silent failures.
- FR44: Users can re-attempt any failed operation (scan, generation, submission) without losing their in-progress work.

### Planning Method & Product Phase 0 *(future — Build Phase 2)*

- FR45: Users can initiate a guided planning workflow by selecting a planning method (e.g., BMAD Method) and providing an initial product idea.
- FR46: The system supports pluggable planning methods — planning methods can be added, selected, and configured independently of the core platform.
- FR47: The BMAD planning method guides users through generating: PRD, Architecture Spec, UX Spec, Epics, and Stories.
- FR48: Planning artifacts generated in Phase 0 are stored per-project and can be used as enriched context during Phase 1 issue creation.
- FR49: Users can review, edit, and iterate on planning artifacts before finalizing them.
- FR50: Users can create issues from Phase 0 stories directly, with planning context automatically injected into the AI clarification loop.

### Team Collaboration *(future — Build Phase 2)*

- FR51: Users can create a team workspace and invite members by email or GitHub username.
- FR52: Team workspaces support role-based permissions: Owner, Admin, Member.
- FR53: Team members can share planning artifacts (PRDs, architecture specs, etc.) within a team workspace.
- FR54: Team members can view and collaborate on shared repositories added to the team workspace.
- FR55: Team owners can configure default settings (AI provider, templates, planning method) for the team.
- FR56: Team data isolation is enforced — one team's projects, repos, and artifacts are never accessible to another team.

### Product Phase 2: BUILD *(future — Build Phase 3)*

- FR57: Users can assign created issues to AI agents or developers with full planning and creation context attached.
- FR58: The system tracks issue implementation status across Phase 0 planning, Phase 1 creation, and Phase 2 build.

## Non-Functional Requirements

### Performance

- NFR1: Public pages (landing, sign-in) achieve Core Web Vitals green scores: LCP < 2.5s, CLS < 0.1, FID < 100ms on Google PageSpeed Insights.
- NFR2: The authenticated app shell is interactive within 3 seconds on a standard broadband connection.
- NFR3: AI issue generation begins streaming the first token within 5 seconds of the user submitting their final clarification answer.
- NFR4: Repository code scan progress is communicated via incremental updates — not an undifferentiated spinner.
- NFR5: GitHub repo list fetch completes within 3 seconds of OAuth sign-in for accounts with up to 100 repositories.
- NFR6: The clarification loop presents the next question within 3 seconds of the user answering the previous one.

### Security

- NFR7: GitHub OAuth access tokens are stored encrypted at rest and never exposed to the client at any point.
- NFR8: User-provided AI provider API keys are stored encrypted at rest, server-side only; keys are never returned to the client after initial submission.
- NFR9: All data in transit between client, server, and third-party APIs is encrypted via TLS 1.2 or higher.
- NFR10: Multi-tenant data isolation is enforced at the database layer — no user can access another user's repos, issues, code index, API keys, or settings.
- NFR11: User-submitted descriptions and repo content forwarded to AI providers are not stored or logged by Spekd's server beyond the duration of the generation request.
- NFR12: Input submitted to AI models is sanitised to mitigate prompt injection before forwarding.
- NFR13: Spekd accesses only GitHub repository content the authenticated user's token has permission to access — no privilege escalation.

### Scalability

- NFR14: The system supports up to 500 registered users and 50 concurrent active sessions without performance degradation during MVP phase.
- NFR15: Code index storage growth (linear with users and repos) must be reviewed before Build Phase 2 growth begins.
- NFR16: The AI provider abstraction layer supports adding new providers without changes to the core generation pipeline.
- NFR17: The repo scan background job system supports concurrent scans without blocking each other or degrading interactive issue creation.

### Accessibility

- NFR18: All user-facing screens meet WCAG 2.1 AA compliance.
- NFR19: The AI clarification loop is fully keyboard-navigable and operable without a mouse.
- NFR20: Focus is managed correctly as new clarification questions appear dynamically, so screen reader users are notified of new content without losing position.
- NFR21: All interactive elements maintain a colour contrast ratio of at least 4.5:1 (AA) in all states: default, hover, focus, disabled, error, and loading.
- NFR22: AI-generated issue content in the review step is fully readable and navigable by screen readers.

### Reliability

- NFR23: GitHub API and AI provider failures surface user-visible, actionable messages — no silent failures.
- NFR24: If an AI generation stream fails mid-response, a clear error state with a one-click retry is presented, and the user's input is not lost.
- NFR25: If a repository code scan fails, the user receives a clear failure description and a retry option — partial scan results are not silently used as context.
- NFR26: All dependency failures (GitHub API, AI providers) surface clearly rather than producing broken or blank states.

### Integration

- NFR27: GitHub API integration respects GitHub's rate limiting; 429 responses produce an informative message without crashing or hammering the API.
- NFR28: AI provider calls use the Vercel AI SDK's provider abstraction; switching providers requires only a configuration update.
- NFR29: GitHub OAuth token expiry triggers an automatic re-authentication prompt — not an unexplained failure.
- NFR30: All external API calls (GitHub, AI providers) have configured request timeouts; no call blocks indefinitely.

### Extensibility & Future Phases *(future — Build Phase 2+)*

- NFR31: The planning method adapter interface supports adding new planning methods without changes to the core platform.
- NFR32: Planning artifact storage scales linearly with projects; storage strategy reviewed before Build Phase 2 launch.
- NFR33: Team workspace operations (invite, permission change, shared artifact access) complete within 2 seconds under normal conditions.
- NFR34: All phases (PLAN, CREATE, BUILD) are self-hostable via Docker/Kubernetes, consistent with the core deployment architecture.
