---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish']
inputDocuments: ['PRODUCT_PLAN.md']
workflowType: 'prd'
classification:
  projectType: 'web_app_saas'
  domain: 'team_collaboration_project_management'
  complexity: 'low-medium'
  projectContext: 'greenfield'
  targetUsers: 'developers and non-technical stakeholders'
  businessModel: 'B2C and B2B'
---

# Product Requirements Document — IssueForge

**Author:** ChiaLung Liu
**Date:** 2026-03-03

## Executive Summary

IssueForge is a hosted SaaS web application that eliminates the miscommunication loop between non-technical stakeholders and development teams. Non-developers cannot write actionable GitHub issues; developers waste significant time in clarification loops — async messages, missed calls, delayed sprints — before any actual work begins. IssueForge solves this by guiding users through an AI-assisted, repo-aware issue creation process that asks the clarifying questions a senior developer would ask *before* the issue is submitted. The result is a well-structured, context-complete issue that is immediately actionable by both human developers and AI coding agents.

Target users span both technical and non-technical roles: developers who want speed and quality, and product managers, business analysts, and stakeholders who need a bridge to GitHub. The product serves both B2C (individuals and small teams) and B2B (organisations and enterprises) markets.

### What Makes This Special

IssueForge is not an issue formatter — it is an issue interrogator. While other tools (GitHub templates, Copilot inline suggestions, Linear AI) help structure what a user has already written, IssueForge actively interrogates the user's intent using full repo and code context to surface missing detail, ambiguity, and edge cases — the exact questions a developer would ask in a clarification call. This front-loads the entire clarification conversation into the issue creation moment, eliminating the back-and-forth entirely.

The core differentiator is the **AI clarification loop with code context**: IssueForge reads actual file contents (not just repo structure) and uses that knowledge to ask targeted, relevant questions that produce complete, unambiguous issues. Well-structured, context-rich issues are also a direct enabler of agentic AI workflows, where tools like Copilot, Cursor, or Claude Code can fulfill issues autonomously without further human input. IssueForge becomes the on-ramp to fully agentic development pipelines.

**Why now:** The rise of AI coding agents has raised the quality bar for GitHub issues dramatically. A vague issue that a human developer can muddle through is a hard blocker for an AI agent. IssueForge sits at this intersection at exactly the right moment.

## Success Criteria

### User Success

- A non-technical user reads their AI-generated issue and says "I couldn't have said it better myself — and I actually understand it." Output is clear to both the creator and the developer who receives it.
- Developers act on IssueForge-created issues with near-zero follow-up questions — no clarification calls, no Slack threads.
- The AI clarification loop surfaces the right questions before generation such that the final issue is complete and unambiguous on first read.

### Business Success

- **3-month targets:** 10 active teams, 200 issues created, 1–2 paying B2B customers.
- **Primary success signal:** User feedback indicating desire for improvement and continued use. Churn or silence signals the opposite.
- Revenue from at least 1 B2B customer validates the paid value proposition before significant growth investment.

### Technical Success

- Issue generation quality is the primary technical metric — output must be structured, complete, and contextually accurate relative to the selected repository.
- Reliability is coupled to GitHub API availability; IssueForge handles API failures gracefully (clear error states, no silent failures) rather than guaranteeing uptime independently.
- The interactive clarification loop produces noticeably better output than single-shot generation — this is the measurable quality bar for the AI system.
- Architecture supports future integration with additional platforms (Jira, Azure DevOps, etc.) and optionally GitHub CLI.

### Measurable Outcomes

| Metric | Target | Timeframe |
|---|---|---|
| Active teams | 10 | 3 months |
| Issues created | 200 | 3 months |
| Paying B2B customers | 1–2 | 3 months |
| Developer follow-up questions per issue | ~0 | Ongoing |
| User feedback/improvement requests received | Active signal | Ongoing |

## User Journeys

### Journey 1: Sarah — The BA Who Finally Feels Heard

**Persona:** Sarah is a Business Analyst at a mid-sized SaaS company. She has clear ideas about what the product needs but has never written code. Every time she submits a GitHub issue, it gets returned with questions, or worse — silently misunderstood. She dreads the clarification calls with developers who are hard to get hold of, and she's started to feel like the bottleneck.

**Opening Scene:** Tuesday morning. Sarah has just finished a stakeholder meeting where she's been asked to get a new feature into the next sprint. She opens IssueForge, selects the relevant repo, and types in plain language: *"We need to show users their remaining credit balance somewhere on the dashboard."*

**Rising Action:** Instead of immediately generating an issue, IssueForge asks three targeted questions: *Where on the dashboard should this appear — header, sidebar, or near the billing section? Should this be real-time or refreshed on page load? Should it show a warning state when credits fall below a threshold?* Sarah answers each one. She didn't know some of these were decisions she needed to make — but the questions make sense to her.

**Climax:** IssueForge generates the issue. It has a clear title, a summary that sounds exactly like what she described, acceptance criteria she actually understands, and technical notes referencing the billing module in the repo. She thinks: *"I couldn't have said it better myself — and I actually understand it."* She hits Submit.

**Resolution:** The issue lands in GitHub. The assigned developer reads it, asks zero follow-up questions, and picks it up in the same sprint. For the first time, Sarah feels like a full participant in the development process — not a translator who keeps getting lost.

**Requirements revealed:** Interactive AI clarification loop, repo context integration, structured issue output (title, summary, acceptance criteria, technical notes, labels), GitHub submission, issue history.

---

### Journey 2: Marcus — The Developer Who Just Wants It Done

**Persona:** Marcus is a senior developer at a startup. He writes his own issues when he has to but finds the process tedious. GitHub templates feel rigid. He needs speed and structure, not hand-holding.

**Opening Scene:** Marcus has just identified a bug in the authentication middleware. He knows exactly what it is, what causes it, and roughly how to fix it. He opens IssueForge, selects the repo, and types a dense technical description in under 30 seconds.

**Rising Action:** The AI clarification loop kicks in. Marcus is slightly impatient — he already knows the answers. The questions are actually good though: *"Is this reproducible in production or only locally? What's the expected vs actual behaviour on token expiry?"* — things he knows instantly. He answers quickly.

**Climax:** IssueForge generates a well-structured issue with labels (`bug`, `auth`, `high-priority`), reproduction steps, expected vs actual behaviour, and technical notes referencing the correct middleware file. It would have taken him 5 minutes to write this himself. It took 45 seconds.

**Resolution:** He submits it directly to GitHub — clean, complete, ready for a teammate or an AI agent. Marcus opens the next tab. He's already moved on.

**Requirements revealed:** Speed-optimised creation flow, technical label inference, repo-aware technical notes, structured bug report format, fast clarification loop.

---

### Journey 3: Jordan — The Developer Who Just Wants to Build

**Persona:** Jordan is a mid-level developer on a cross-functional team where PMs and BAs regularly create GitHub issues. Historically, about half required at least one clarification exchange before Jordan could start. Jordan has started to dread Monday morning issue triage.

**Opening Scene:** Jordan opens GitHub on Monday morning. Four new issues in the backlog. Two were created via IssueForge. Jordan clicks the first one.

**Rising Action:** The issue is structured clearly — title, a plain-language summary that still makes technical sense, specific and testable acceptance criteria, correctly categorised labels, and a technical notes section referencing the exact files affected. Jordan reads it once. Everything is there.

**Climax:** Jordan assigns it to themselves and starts working immediately. No Slack message to the BA. No "quick call to clarify." The clarity means Jordan can make confident implementation decisions without second-guessing intent.

**Resolution:** Jordan finishes the issue in the same sprint it was created. At the retrospective, Jordan mentions issue quality has noticeably improved. The team starts tracking clarification requests — trending toward zero.

**Requirements revealed:** Structured issue output optimised for developer consumption, acceptance criteria format, technical notes with file references, accurate label inference, GitHub-native experience.

---

### Journey 4: Priya — The Admin Who Sets the Standard

**Persona:** Priya is an engineering manager at a 20-person product company. She set up IssueForge for her team. She cares about consistency — every team has different conventions, and she wants IssueForge to match *their* style.

**Opening Scene:** Priya logs into IssueForge and navigates to team settings before the team's kick-off next week.

**Rising Action:** She browses IssueForge's out-of-the-box templates — bug report, feature request, technical debt. The feature request template is close but missing a "Business Context" section her team always includes. She notes to upload a custom version post-MVP. For now, she selects the feature request template as team default, assigns it to the two repos her team uses most, and sets the default AI provider.

**Climax:** Priya previews what a generated issue looks like with this template applied. It matches her team's conventions closely enough. She saves and Slacks her team: *"IssueForge is ready. Just select the repo and describe what you need."*

**Resolution:** The team starts creating issues. Output is consistent — same structure, same labels, same quality bar. When she reviews the backlog on Friday, everything is readable, actionable, and consistent.

**Requirements revealed:** Team settings UI, out-of-the-box template library, template selection per repo, default AI provider setting, admin onboarding flow, template preview.

---

### Journey 5: Alex — The Visitor Who Needs Convincing

**Persona:** Alex is a freelance PM managing projects for three clients, juggling GitHub repos and Linear boards. A colleague mentions IssueForge in a Slack community. Alex is sceptical — they've seen a lot of "AI productivity" tools that overpromise.

**Opening Scene:** Alex lands on the IssueForge marketing page, giving it 90 seconds to prove itself.

**Rising Action:** The landing page communicates the value proposition clearly: *bridge the gap between what stakeholders say and what developers need.* A demo shows the clarification loop in action. Alex recognises the pain immediately and clicks "Sign in with GitHub."

**Climax:** OAuth takes seconds. IssueForge surfaces Alex's accessible repos. They pick a real client repo, type a quick description, answer two clarifying questions, and get a generated issue better than what they'd have written manually. Under two minutes, start to finish.

**Resolution:** Alex is sold. They bookmark IssueForge for all three clients and refer two colleagues that week. The product proved its value in the first session without needing to explain itself.

**Requirements revealed:** Marketing landing page, GitHub OAuth, zero-friction onboarding to first issue, repo auto-discovery, clear value communication.

---

### Journey Requirements Summary

| Capability | Journeys That Reveal It |
|---|---|
| Interactive AI clarification loop | Sarah, Marcus, Alex |
| Repo context integration | Sarah, Marcus, Jordan |
| Structured issue output (title, summary, AC, labels, technical notes) | All journeys |
| GitHub submission | All journeys |
| Speed-optimised creation flow | Marcus, Alex |
| Out-of-the-box template library | Priya |
| Team settings + admin configuration | Priya |
| Template selection per repo | Priya |
| Developer-optimised issue reading experience | Jordan |
| Marketing landing page + fast onboarding | Alex |
| GitHub OAuth + repo auto-discovery | Alex, Sarah |
| Issue history (stored in DB) | Sarah, Marcus |

## Domain-Specific Requirements

### Compliance & Regulatory

- No regulated domain compliance requirements (no HIPAA, PCI-DSS, GDPR-specific obligations beyond standard data handling).
- Issue prompts, generated content, and GitHub metadata are **strictly private to the creating user**. No cross-user or cross-team data access is permitted.
- GDPR-adjacent right to deletion: users can delete their stored issue history and account data at any time. Designed in from the start even if not legally mandated at MVP.

### Technical Constraints

- GitHub OAuth tokens must be stored encrypted at rest, never exposed client-side or logged. Refresh and revocation flows must be handled gracefully.
- Multi-tenant data isolation must be enforced at the database layer — one user's repos, issues, API keys, and settings must never be accessible to another.
- User-submitted descriptions and AI-generated content are processed by third-party AI providers (Anthropic, OpenAI). Users must be informed of this during onboarding.
- When fetching repo context (file tree, README, code), IssueForge accesses only what the user's GitHub token has permission to see. No escalation of privilege.

### Integration Requirements

- **GitHub API (MVP):** OAuth, repo listing, repo context fetching (file tree, README, file contents, recent issues), issue creation.
- **AI providers (MVP):** Anthropic Claude and OpenAI GPT-4 via Vercel AI SDK. Provider abstraction must allow adding new providers without architectural changes.
- **Future integrations (post-MVP):** Jira, Azure DevOps, GitHub CLI submission path.

### Risk Mitigations

- **Token exposure:** Server-side-only token handling; never pass GitHub access tokens to the client. Encrypt at rest.
- **AI hallucination:** Generated content is AI-assisted and must be reviewed before submission. The edit step before submission is the primary mitigation; AI-assisted badge reinforces transparency.
- **Third-party API dependency:** GitHub API and AI provider outages will affect IssueForge. Graceful error states (clear messaging, no silent failures) are the primary mitigation.
- **Prompt injection:** User-submitted descriptions are sanitised and structured before being forwarded to AI providers.

## Innovation & Novel Patterns

### Innovation Areas

**1. AI as Interrogator, Not Generator**
The dominant AI writing tool paradigm is: user provides input → AI produces better output. IssueForge inverts this. The AI's primary role is to *ask questions* — surfacing what the user doesn't know they haven't said — before any content is generated. The issue is a byproduct of a structured interrogation, not a one-shot generation.

**2. Repo + Code Context-Driven Clarification**
IssueForge uses both repository structure (file tree, README, recent issues) *and* actual source code content (files, functions, modules) to generate targeted clarifying questions and issue content. Context depth adapts to user role: non-technical users see concept-level language ("the billing section"); developers see file paths, function names, and specific implementations.

**3. Agentic Workflow On-Ramp**
A well-formed IssueForge issue is machine-readable by design — complete enough for an AI coding agent to act on without further human input. IssueForge is positioned as the structured entry point to agentic development pipelines, a space with very few deliberate products.

**4. Persona-Aware AI Communication**
IssueForge adapts interaction style based on user role set during onboarding. Non-technical users receive plain-language, guided questions with concept-level context. Developers receive concise, technical questions with code-level precision. The same underlying context powers both experiences — the difference is communication, not knowledge.

### Competitive Landscape

| Tool | Gap |
|---|---|
| GitHub issue templates | Static structure, no intelligence, requires user to know what to fill in |
| GitHub Copilot | Helps developers write code and comments; not designed for non-technical users |
| Linear AI | Single-shot generation, no clarification loop, developer-centric |
| Notion AI / Confluence AI | Documentation-focused, not GitHub-native, no repo context |

None combine: (a) non-technical user accessibility, (b) AI-driven clarification loop, (c) repo and code context, (d) persona-aware communication, and (e) agentic workflow readiness. IssueForge occupies a genuinely unoccupied position.

### Validation Approach

- **Primary:** User feedback after first issue creation — does the non-technical user feel accurately represented? Does the developer act without follow-up?
- **Quantitative:** Track clarification-to-submission ratio. If users rarely skip questions, the interrogation model is working.
- **Quality:** Track developer follow-up rate per issue. Target: trending toward zero.
- **Persona:** Measure whether persona-adapted communication reduces drop-off during the clarification loop for non-technical users.
- **Agentic (post-MVP):** Measure how often IssueForge-generated issues are fulfilled by AI agents without human amendment.

### Innovation Risks

- **Interrogation fatigue:** Too many questions frustrate users, especially developers. Mitigation: AI asks the *minimum necessary* questions. Post-MVP single-shot toggle is the escape valve.
- **Context quality dependency:** Sparse README or unclear file structure degrades question quality. Mitigation: graceful fallback to generic-but-useful questions when context is thin.
- **Persona misclassification:** Wrong role setting produces an off-feeling communication style. Mitigation: user-set (not auto-detected), easily changeable in settings.
- **Agentic over-promise:** Agentic on-ramp is a vision claim, not an MVP feature. Communicate as roadmap direction only.

## Web App Requirements

### Architecture Overview

IssueForge is a hybrid Next.js 15 App Router application — SSR for public-facing pages (landing, auth) and SPA-like client navigation for the authenticated app shell (dashboard, issue creation, settings). This optimises SEO for acquisition and responsiveness for the core product experience.

- **Rendering:** SSR for `/`, `/sign-in`, `/sign-up`. Client-side navigation within `/dashboard`, `/issues/*`, `/settings`.
- **Streaming:** AI issue generation streams tokens to the UI in real-time via Vercel AI SDK. The creation page handles streaming state gracefully — progressive rendering, clear loading states, graceful mid-stream error recovery.
- **Real-time collaboration:** Not in scope for MVP.
- **Framework:** Next.js 15 App Router, TypeScript strict mode.
- **Styling:** Tailwind CSS v4 + shadcn/ui.
- **Deployment:** Vercel — edge functions, preview deploys, Core Web Vitals monitoring via Vercel Analytics.
- **Package manager:** pnpm.

### Browser & Device Support

- **Supported browsers:** Chrome, Firefox, Safari, Edge — latest 2 major versions each. No IE11 or legacy Edge support; no legacy polyfills required.
- **Responsive design:** Fully responsive across mobile, tablet, and desktop. Desktop-first for the issue creation flow (primary use case), but all screens — including the clarification loop and issue review — must be fully functional and well-designed on mobile.

### SEO & Accessibility

- **SEO:** Public pages are server-rendered and fully crawlable. Title, description, Open Graph, and Twitter/X card meta tags on all public pages. Core Web Vitals compliance serves dual purpose as both UX and SEO signal.
- **Accessibility:** WCAG 2.1 AA compliance across all screens. The AI clarification loop must be fully keyboard-navigable and screen-reader friendly. Focus managed correctly as new questions appear dynamically. Colour contrast 4.5:1 (AA) minimum in all UI states.

## Project Scoping

### MVP Philosophy

**Experience MVP** — deliver the "wow" moment as fast as possible. A non-technical user describes what they need, IssueForge scans the codebase, asks at most 3 targeted clarifying questions, and produces an issue so good the user says "I couldn't have said it better myself." Everything in MVP exists to make that moment happen reliably.

**Single-user focused:** No team management or multi-user collaboration. Anyone signs up with GitHub and starts creating issues immediately — zero team setup required.

### MVP Feature Set (Phase 1)

**Core journeys supported:** Sarah (non-technical creator), Marcus (developer creator), Alex (first-time visitor/onboarding)

1. **GitHub OAuth** — sign in, auto-fetch accessible repos
2. **Repo selection** — pick any accessible repo, or manually add by `owner/repo`
3. **Initial repo code scan** — on first repo add, full codebase scan stores file contents as a code index. Progress bar shown to user.
4. **Manual re-scan** — user triggers fresh scan from repo settings at any time
5. **User role setting** — self-select "I'm a developer" / "I'm not a developer" during onboarding. Controls AI communication style and context depth throughout.
6. **BYOK (Bring Your Own Key)** — user provides their own Anthropic or OpenAI API key. No IssueForge-hosted AI in MVP. Guided step-by-step setup flow for each provider embedded in onboarding. Keys stored encrypted server-side only.
7. **Interactive AI clarification loop** — always on for MVP. AI asks **at most 3** targeted questions before generating, using repo + code context. Questions persona-adapted (plain language for non-technical; technical for developers).
8. **AI issue generation** — structured output: title, summary, acceptance criteria, labels, technical notes. Persona-aware: non-technical users see concept-level context; developers see file paths and function references.
9. **Out-of-the-box issue templates** — bug report, feature request, technical debt. Applied at generation time.
10. **Issue review and edit** — user reviews and edits all fields before submitting. AI-assisted badge visible.
11. **Submit to GitHub** — push issue directly via GitHub API
12. **Issue history stored in DB** — stored privately per user; browsing UI is post-MVP
13. **Marketing landing page** — SSR, SEO-optimised, demonstrates the clarification loop, fast path to sign-up

### Post-MVP Features

**Phase 2 (Growth):**
- IssueForge-hosted AI free tier (usage-limited, once pricing is sustainable)
- Scheduled repo re-scan (daily/weekly auto-indexing)
- Team settings + admin (Priya's journey: team creation, repo assignment, member management, default template per repo)
- Custom template upload
- Single-shot generation mode (clarification loop toggle)
- Developer review experience (reviewer-mindset UI)
- Issue history UI (browse, re-submit, clone)

**Phase 3 (Expansion):**
- Agentic workflow integration (submit issue → trigger AI coding agent)
- Multi-platform integrations (Jira, Azure DevOps, GitHub CLI)
- Webhook-triggered re-scan on push events
- Analytics (issue count, quality scoring, clarification loop effectiveness)
- GitHub Projects integration

### Risk Mitigation Strategy

**Technical Risks:**
- *Code scan infrastructure complexity* — background job processing and full file indexing is the highest-complexity MVP component. Mitigation: use proven queue tooling, scope to GitHub API file fetching (no git clone required), timebox implementation. Fallback: ship with repo-structure-only context first; add full code scanning in fast follow.
- *AI quality variance* — clarification loop quality depends heavily on prompt engineering. Mitigation: invest in prompt iteration with real user descriptions before launch.
- *Code index storage costs* — full file contents grow linearly with users and repos. Mitigation: acceptable at MVP scale; revisit storage strategy (embeddings, chunking) as Phase 2 infrastructure work.

**Market Risks:**
- *Non-technical user trust in AI output* — Mitigation: edit step before submission is the safety valve; AI-assisted badge reinforces transparency.
- *BYOK barrier for non-technical users* — Mitigation: guided "how to get your API key" onboarding flow with step-by-step instructions per provider.
- *Developers dismiss it as "just another AI tool"* — Mitigation: code context depth and quality of technical notes is the differentiator. Marcus's journey must feel meaningfully faster and better than writing manually.

## Functional Requirements

### User Account & Onboarding

- FR1: Users can sign in to IssueForge using their GitHub account via OAuth.
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
- FR13: Users can remove a repository from IssueForge, which deletes its stored code index.

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

- FR29: Users can select from IssueForge's out-of-the-box templates: bug report, feature request, and technical debt.
- FR30: The system applies the selected template structure during AI issue generation.

### Issue History

- FR31: The system stores each created issue privately per user in the database.
- FR32: Stored issue data is accessible only to the user who created it; no cross-user access permitted.

### Privacy & Data Controls

- FR33: Users can view what data IssueForge stores about them (issue history, API keys, repo index).
- FR34: Users are informed during onboarding that their issue descriptions and repo content are sent to their chosen third-party AI provider.
- FR35: The system enforces strict per-user data isolation — no user can access another user's repos, issues, templates, or settings.

### Marketing & Acquisition

- FR36: Unauthenticated visitors can access a public marketing landing page communicating IssueForge's value proposition.
- FR37: The landing page demonstrates the AI clarification loop in action (e.g. demo or animation).
- FR38: Visitors can initiate GitHub OAuth sign-up directly from the landing page.
- FR39: The landing page is server-rendered and fully crawlable, with title, description, Open Graph, and Twitter/X card meta tags.

### Error Handling & System Feedback

- FR40: The system communicates GitHub API errors clearly to users (e.g. token expired, insufficient repo permissions).
- FR41: The system communicates AI provider errors clearly to users (e.g. invalid API key, quota exceeded, provider unavailable).
- FR42: The system handles mid-stream generation failures gracefully, with a clear error state and recovery option.
- FR43: Every error across all core flows surfaces a user-visible, actionable message — no silent failures.
- FR44: Users can re-attempt any failed operation (scan, generation, submission) without losing their in-progress work.

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
- NFR11: User-submitted descriptions and repo content forwarded to AI providers are not stored or logged by IssueForge's server beyond the duration of the generation request.
- NFR12: Input submitted to AI models is sanitised to mitigate prompt injection before forwarding.
- NFR13: IssueForge accesses only GitHub repository content the authenticated user's token has permission to access — no privilege escalation.

### Scalability

- NFR14: The system supports up to 500 registered users and 50 concurrent active sessions without performance degradation during MVP phase.
- NFR15: Code index storage growth (linear with users and repos) must be reviewed before Phase 2 growth begins.
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
