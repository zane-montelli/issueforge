---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional']
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

# Product Requirements Document - issueforge

**Author:** ChiaLung Liu
**Date:** 2026-03-03

## Executive Summary

IssueForge is a hosted SaaS web application that eliminates the miscommunication loop between non-technical stakeholders and development teams. The core problem: non-developers cannot write actionable GitHub issues, and developers waste significant time in clarification loops — async messages, missed calls, delayed sprints — before any actual work begins. IssueForge solves this by guiding users through an AI-assisted, repo-aware issue creation process that asks the clarifying questions a senior developer would ask, *before* the issue is ever submitted. The result is a well-structured, context-complete issue that is immediately actionable by both human developers and AI coding agents.

Target users span both technical and non-technical roles: developers who want speed and quality, product managers, business analysts, and stakeholders who need a bridge to GitHub. The product serves both B2C (individual users and small teams) and B2B (organisations and enterprises) markets.

### What Makes This Special

IssueForge is not an issue formatter — it is an issue interrogator. While other tools (GitHub templates, Copilot inline suggestions, Linear AI) help structure what a user has already written, IssueForge actively interrogates the user's intent using repo context to surface missing detail, ambiguity, and edge cases — the exact questions a developer would ask in a clarification call. This front-loads the entire clarification conversation into the issue creation moment, eliminating the back-and-forth entirely.

The core differentiator is the **AI clarification loop with code context**: IssueForge understands the repository structure and uses that knowledge to ask targeted, relevant questions that produce complete, unambiguous issues. The downstream benefit extends beyond human developers — well-structured, context-rich issues are a direct enabler of agentic AI workflows, where tools like Copilot, Cursor, or Claude Code can fulfill issues autonomously without further human input. IssueForge becomes the on-ramp to fully agentic development pipelines.

**Why now:** The rise of AI coding agents has raised the quality bar for GitHub issues dramatically. A vague issue that a human developer can muddle through is a hard blocker for an AI agent. IssueForge sits at this intersection at exactly the right moment.

## Project Classification

- **Project Type:** Web Application (SaaS)
- **Domain:** Team Collaboration / Project Management (Developer Productivity)
- **Complexity:** Low–Medium (standard web security, GitHub API integration, AI streaming — no regulated domain concerns)
- **Project Context:** Greenfield
- **Business Model:** B2C and B2B
- **Primary Users:** Developers, product managers, business analysts, non-technical stakeholders

## Success Criteria

### User Success

- A non-technical user reads their AI-generated issue and says "I couldn't have said it better myself — and I actually understand it." The output is clear to both the person who requested it and the developer who receives it.
- Developers can act on issues created via IssueForge with near-zero follow-up questions — no clarification calls, no Slack threads asking "what did you mean by X?"
- The AI clarification loop surfaces the right questions before generation, such that the final issue is complete and unambiguous on first read.

### Business Success

- **3-month targets:** 10 active teams, 200 issues created, 1–2 paying B2B customers.
- **Primary success signal:** User feedback indicating desire for improvement and continued use. A product that users want to see grow is a product with a future. Lack of feedback or churn signals the opposite.
- Revenue from at least 1 B2B customer validates the paid value proposition before significant growth investment.

### Technical Success

- Issue generation quality is the primary technical metric — output must be structured, complete, and contextually accurate relative to the selected repository.
- Reliability is coupled to GitHub API availability; IssueForge should handle API failures gracefully (clear error states, no silent failures) rather than guarantee uptime independently.
- The interactive clarification loop (MVP mode) must produce noticeably better output than single-shot generation — this is the measurable quality bar for the AI system.
- System architecture must support future integration with additional platforms (Jira, Azure DevOps, etc.) via API, and optionally GitHub CLI as an alternative submission path.

### Measurable Outcomes

| Metric | Target | Timeframe |
|---|---|---|
| Active teams | 10 | 3 months |
| Issues created | 200 | 3 months |
| Paying B2B customers | 1–2 | 3 months |
| Developer follow-up questions per issue | ~0 | Ongoing |
| User feedback/improvement requests received | Active signal | Ongoing |

## Product Scope

### MVP — Minimum Viable Product

1. GitHub OAuth login — sign in, auto-fetch accessible repos
2. Repo selection — pick any repo the user can create issues in (or manually add external repos)
3. **Interactive AI clarification loop** — AI asks targeted follow-up questions using repo context before generating the issue (always on for MVP)
4. AI issue generation — produces a well-structured, context-complete issue (title, summary, acceptance criteria, labels, technical notes)
5. Issue review and edit — user can review and edit any field before submitting
6. Submit to GitHub — push the issue directly via GitHub API
7. Issue history stored in database (UI for browsing post-MVP)

### Growth Features (Post-MVP)

- **Single-shot generation mode** — toggle to disable the clarification loop; IssueForge uses best judgement to generate without prompting. Value for power users and teams with strong issue hygiene.
- **Developer review experience** — an intuitive interface for developers to review AI-generated issues, optimised for the reviewer mindset (not the writer mindset). Acknowledges that developers are increasingly code reviewers, not writers.
- **Issue history UI** — browse, re-submit, and clone past issues
- **Saved templates** — reusable prompt templates for common issue types
- **Team settings** — shared repos, default labels, preferred AI provider

### Vision (Future)

- **Agentic workflow integration** — submit an issue and optionally trigger an AI coding agent (Copilot, Cursor, Claude Code) to fulfill it immediately. IssueForge as the on-ramp to fully agentic development pipelines.
- **Multi-platform integrations** — Jira, Azure DevOps, and other project management tools via their APIs (and GitHub CLI as an alternative GitHub submission path)
- **AI tier model** — Free tier with IssueForge-hosted AI (usage-limited), and a BYOK (Bring Your Own Key) option for users with existing API keys from supported providers (Anthropic, OpenAI, and others). BYOK appeals to B2B customers with enterprise AI agreements or cost control requirements.
- **Analytics** — issues created over time, by type, by repo, quality scoring
- **GitHub Projects integration** — assign issues to project boards on submission

## User Journeys

### Journey 1: Sarah — The BA Who Finally Feels Heard

**Persona:** Sarah is a Business Analyst at a mid-sized SaaS company. She has clear ideas about what the product needs but has never written code. Every time she submits a GitHub issue, it gets returned with questions, or worse — silently misunderstood. She dreads the clarification calls with developers who are hard to get hold of, and she's started to feel like the bottleneck.

**Opening Scene:** It's Tuesday morning. Sarah has just finished a stakeholder meeting where she's been asked to get a new feature into the next sprint. She opens IssueForge, selects the relevant repo, and types a description in plain language: *"We need to show users their remaining credit balance somewhere on the dashboard."*

**Rising Action:** Instead of immediately generating an issue, IssueForge asks her three targeted questions: *Where on the dashboard should this appear — header, sidebar, or near the billing section? Should this be real-time or refreshed on page load? Should it show a warning state when credits fall below a threshold?* Sarah answers each one. She didn't know some of these were decisions she needed to make — but the questions make sense to her.

**Climax:** IssueForge generates the issue. Sarah reads it. It has a clear title, a summary that sounds exactly like what she described, acceptance criteria she actually understands, and technical notes referencing the billing module in the repo. She thinks: *"I couldn't have said it better myself — and I actually understand it."* She hits Submit.

**Resolution:** The issue lands in GitHub. The developer assigned to it reads it, asks zero follow-up questions, and picks it up in the same sprint. Sarah doesn't get a Slack message asking for clarification. For the first time, she feels like a full participant in the development process — not a translator who keeps getting lost.

**Requirements revealed:** Interactive AI clarification loop, repo context integration, structured issue output (title, summary, acceptance criteria, technical notes, labels), GitHub submission, issue history.

---

### Journey 2: Marcus — The Developer Who Just Wants It Done

**Persona:** Marcus is a senior developer at a startup. He's deeply technical, writes his own issues when he has to, but finds the process tedious — especially when he already knows what needs to happen. He's tried GitHub templates but they feel rigid. He doesn't need hand-holding. He needs speed and structure.

**Opening Scene:** Marcus has just identified a bug in the authentication middleware. He knows exactly what it is, what causes it, and roughly how to fix it. He opens IssueForge, selects the repo, and types a dense technical description in under 30 seconds.

**Rising Action:** The AI clarification loop kicks in. Marcus is slightly impatient — he already knows the answers. He considers toggling it off, but he's on MVP so it's always on. The questions are actually good though: *"Is this reproducible in production or only locally? What's the expected vs actual behaviour on token expiry?"* — things he knows instantly. He answers quickly.

**Climax:** IssueForge generates a well-structured issue with proper labels (`bug`, `auth`, `high-priority`), reproduction steps, expected vs actual behaviour, and a technical notes section that references the correct middleware file. It would have taken him 5 minutes to write this himself. It took 45 seconds.

**Resolution:** He submits it directly to GitHub. The issue is clean, complete, and ready to be picked up by a teammate — or an AI agent. Marcus opens the next tab. He's already moved on.

**Requirements revealed:** Speed-optimised creation flow, technical label inference, repo-aware technical notes, structured bug report format, fast clarification loop (not just for non-technical users).

---

### Journey 3: Jordan — The Developer Who Just Wants to Build

**Persona:** Jordan is a mid-level developer who spends most of their day in the IDE. They're part of a cross-functional team where PMs and BAs regularly create GitHub issues. Historically, about half of those issues required at least one clarification exchange before Jordan could start. Some took days to resolve. Jordan has started to dread Monday morning issue triage.

**Opening Scene:** Jordan opens GitHub on Monday morning. There are four new issues in the backlog. Two were created via IssueForge by team members. Jordan clicks the first one.

**Rising Action:** The issue is structured clearly — title, a plain-language summary that still makes technical sense, acceptance criteria that are specific and testable, labels that correctly categorise the work, and a technical notes section referencing the exact files affected. Jordan reads it once. Everything is there.

**Climax:** Jordan assigns it to themselves and starts working immediately. No Slack message to the BA. No "quick call to clarify." No waiting for a reply that might not come until tomorrow. The clarity of the issue means Jordan can make confident implementation decisions without second-guessing intent.

**Resolution:** Jordan finishes the issue in the same sprint it was created. At the retrospective, Jordan mentions that issue quality has noticeably improved. The team starts tracking how many clarification requests they send — it's trending toward zero.

**Requirements revealed:** Structured issue output optimised for developer consumption, acceptance criteria format, technical notes with file references, accurate label inference, GitHub native experience (issues feel like they belong in GitHub).

---

### Journey 4: Priya — The Admin Who Sets the Standard

**Persona:** Priya is an engineering manager at a 20-person product company. She's the one who set up IssueForge for her team. She cares deeply about consistency — every team has different conventions, and she wants IssueForge to produce issues that match *their* style, not a generic default.

**Opening Scene:** Priya logs into IssueForge and navigates to the team settings. She wants to configure how issues look before the team starts using it in earnest next week.

**Rising Action:** She browses IssueForge's out-of-the-box templates — there's a bug report template, a feature request template, and a technical debt template. The feature request template is close to what she wants but missing a "Business Context" section her team always includes. She makes a note to upload a custom version post-MVP. For now, she selects the feature request template as the team default and assigns it to the two repos her team uses most. She also sets the default AI provider.

**Climax:** Priya previews what a generated issue will look like with this template applied. It matches her team's conventions closely enough. She saves the configuration and sends a Slack message to her team: *"IssueForge is ready to use. Just select the repo and describe what you need."*

**Resolution:** The team starts creating issues. The output is consistent — every issue follows the same structure, uses the same labels, and meets the quality bar Priya set. When she reviews the backlog on Friday, she's satisfied. Everything is readable, actionable, and consistent. She's already planning what her custom template will look like.

**Requirements revealed:** Team settings UI, out-of-the-box template library (MVP), template selection per repo, default AI provider setting, admin onboarding flow, template preview.

---

### Journey 5: Alex — The Visitor Who Needs Convincing

**Persona:** Alex is a freelance PM who manages projects for three different clients. They juggle GitHub repos, Linear boards, and a lot of client communication. A colleague mentions IssueForge in a Slack community. Alex is sceptical — they've seen a lot of "AI productivity" tools that overpromise and underdeliver.

**Opening Scene:** Alex lands on the IssueForge marketing page. They're giving it 90 seconds before they decide if it's worth signing up.

**Rising Action:** The landing page communicates the value proposition clearly: *bridge the gap between what stakeholders say and what developers need.* There's a short demo showing the clarification loop in action. Alex recognises the pain immediately — they've been on both sides of a bad GitHub issue. They click "Sign in with GitHub."

**Climax:** OAuth takes seconds. IssueForge immediately surfaces Alex's accessible repos. They pick a real client repo and type a quick description of something they've been meaning to log. The AI asks two clarifying questions. The generated issue is better than what Alex would have written manually. Alex submits it directly. It took under two minutes.

**Resolution:** Alex is sold. They bookmark it for all three clients. Later that week they refer two colleagues. The product didn't need to explain itself — it proved its value in the first session.

**Requirements revealed:** Marketing landing page, GitHub OAuth, fast onboarding (zero friction to first issue), repo auto-discovery, clear value communication, shareable/referral moment.

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
- Issue prompts, generated content, and GitHub metadata are stored and are **strictly private to the creating user and their team**. No cross-user or cross-team data access is permitted. Users have the right to delete their stored issue history and account data at any time.
- GDPR-adjacent considerations for European users: right to deletion of stored issue history and user data should be designed in from the start, even if not legally mandated at MVP.

### Technical Constraints

- **GitHub OAuth token security:** Access tokens must be stored encrypted at rest. Tokens must never be exposed client-side or logged. Refresh and revocation flows must be handled gracefully.
- **Multi-tenant data isolation:** Team and user data must be strictly isolated. One team's repos, issues, templates, and settings must never be accessible to another team. Row-level security or equivalent must be enforced at the database layer.
- **AI prompt data handling:** User-submitted issue descriptions and AI-generated content are processed by third-party AI providers (Anthropic, OpenAI). Users should be made aware that their input is sent to these providers. BYOK users should understand their own provider's data handling policies.
- **Repo context sensitivity:** When fetching repo context (file trees, README, code snippets), IssueForge must only access what the user's GitHub token has permission to see. No caching of repo content beyond the session that requested it.

### Integration Requirements

- **GitHub API (MVP):** OAuth, repo listing, repo context fetching (tree, README, recent issues), issue creation.
- **AI providers (MVP):** Anthropic Claude and OpenAI GPT-4 via Vercel AI SDK. Provider abstraction must allow adding new providers without architectural changes.
- **Future integrations (post-MVP):** Jira, Azure DevOps, and other project management platforms via their APIs. GitHub CLI as an alternative submission path.

### Risk Mitigations

- **Token exposure risk:** Strict server-side-only token handling; never pass GitHub access tokens to the client. Encrypt tokens in the database.
- **AI hallucination in issue content:** IssueForge must make clear to users that generated content is AI-assisted and should be reviewed before submission. The edit step before submission is the primary mitigation.
- **Third-party API dependency:** GitHub API and AI provider outages will affect IssueForge. Graceful error states (clear messaging, no silent failures) are the primary mitigation. No independent uptime guarantee.
- **Prompt injection risk:** User-submitted descriptions are passed to AI models. Basic input sanitisation and prompt structure should prevent malicious prompt manipulation from affecting output quality or security.

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. AI as Interrogator, Not Generator**
The dominant paradigm for AI writing tools is: user provides input → AI produces better output. IssueForge inverts this. The AI's primary role is to *ask questions* — surfacing what the user doesn't know they haven't said — before any content is generated. The issue is a byproduct of a structured interrogation, not a one-shot generation. This is a meaningful departure from every comparable tool in the space.

**2. Repo + Code Context-Driven Clarification**
IssueForge uses both repository structure (file tree, README, recent issues) *and* actual source code content (files, functions, modules) to generate targeted clarifying questions and issue content. The depth at which this context is surfaced adapts to the user's role: non-technical users see concept-level language ("the billing section"), while developers see full code-level references (file paths, function names, specific implementations). Code context is used to make the AI smarter — not to overwhelm users who don't need it.

**3. Agentic Workflow On-Ramp**
IssueForge is positioned not just as an issue creation tool but as the structured entry point to agentic development pipelines. A well-formed IssueForge issue is machine-readable by design — complete enough for an AI coding agent to act on without further human input. This positions IssueForge at the intersection of human intent and autonomous execution, a space with very few deliberate products.

**4. Persona-Aware AI Communication**
IssueForge adapts its interaction style based on user role (set during onboarding or in settings). Non-technical users receive plain-language, guided questions with concept-level context. Developers receive concise, technical questions with code-level precision. The same underlying repo and code context powers both experiences — the difference is in how it's communicated, not what's known. This is a deliberate product decision: the tool meets the user where they are, rather than forcing all users into a developer-centric or oversimplified interface.

### Market Context & Competitive Landscape

Existing tools in adjacent spaces:
- **GitHub issue templates** — static structure, no intelligence, requires user to know what to fill in
- **GitHub Copilot** — helps developers write code and comments, not designed for non-technical users
- **Linear AI** — generates issue content from brief descriptions, single-shot, no clarification loop, developer-centric
- **Notion AI / Confluence AI** — documentation-focused, not GitHub-native, no repo context

None of these combine: (a) non-technical user accessibility, (b) AI-driven clarification loop, (c) repo and code context awareness, (d) persona-aware communication, and (e) agentic workflow readiness. IssueForge occupies a genuinely unoccupied position.

### Validation Approach

- **Primary validation:** User feedback after first issue creation. Does the non-technical user feel the output represents them accurately? Does the developer act without follow-up?
- **Quantitative signal:** Track clarification-to-submission ratio. If users rarely skip or dismiss clarifying questions, the interrogation model is working.
- **Quality signal:** Track developer follow-up rate per issue. Trending toward zero is the target.
- **Persona signal:** Measure whether persona-adapted communication reduces drop-off during the clarification loop for non-technical users.
- **Agentic validation (post-MVP):** Measure how often IssueForge-generated issues are successfully fulfilled by AI agents without human amendment.

### Risk Mitigation

- **Interrogation fatigue:** Too many clarifying questions may frustrate users, especially developers. Mitigation: AI must ask the *minimum necessary* questions — quality over quantity. Post-MVP single-shot toggle provides an escape valve.
- **Context quality dependency:** If repo/code context is poor (sparse README, unclear file structure, minimal code), question quality degrades. Mitigation: graceful fallback to generic-but-useful questions when context is thin.
- **Persona misclassification:** If a user's role is set incorrectly, the communication style will feel off. Mitigation: user-set preference (not auto-detected) with easy ability to change in settings.
- **Agentic over-promise:** Positioning as an agentic on-ramp is a vision claim, not an MVP feature. Mitigation: communicate this as a roadmap direction, not a current capability.

## Web App Specific Requirements

### Project-Type Overview

IssueForge is a hybrid Next.js 15 application using the App Router — SSR for public-facing pages (landing, auth) and SPA-like client navigation for the authenticated app shell (dashboard, issue creation, settings). This architecture optimises both SEO for acquisition and responsiveness for the core product experience.

### Technical Architecture Considerations

- **Rendering strategy:** SSR for public pages (`/`, `/sign-in`, `/sign-up`) for SEO and performance. Client-side navigation within the authenticated app shell (`/dashboard`, `/issues/*`, `/settings`) for a fast, fluid user experience.
- **Streaming:** AI issue generation streams tokens to the UI in real-time via Vercel AI SDK. The issue creation page must handle streaming state gracefully — progressive rendering of generated content, clear loading states, and graceful error recovery if the stream fails mid-generation.
- **Real-time collaboration:** Not in scope for MVP. Future consideration only.

### Browser Matrix

- **Supported:** Chrome, Firefox, Safari, Edge — latest 2 major versions each.
- **Not supported:** IE11, legacy Edge, or any browser older than 2 major versions. No polyfills required for legacy support.

### Responsive Design

- **Fully responsive:** Mobile, tablet, and desktop layouts required for all screens.
- **Priority:** Desktop-first for the issue creation flow (primary use case), but all screens must be fully functional and well-designed on mobile.
- **Non-technical users** may access IssueForge on mobile — the clarification loop and issue review experience must be usable on small screens, not just technically functional.

### Performance Targets

- **Core Web Vitals:** Target green scores on Google PageSpeed Insights for public pages (LCP < 2.5s, CLS < 0.1, FID < 100ms).
- **AI generation:** First token streamed to UI within a reasonable window — quality of output is the primary metric, not raw speed, but the UI must feel responsive from the moment generation begins.
- **Repo/code context fetching:** Loading state must be visible and informative. Users should understand why there's a brief wait when context is being fetched.

### SEO Strategy

- **Target:** Public pages (`/`, marketing content) are server-rendered and fully crawlable.
- **Primary acquisition channels:** Organic search + referral/word-of-mouth (Alex's journey).
- **Authenticated app pages:** No SEO requirements — these are behind GitHub OAuth.
- **Meta tags:** Title, description, and Open Graph tags on all public pages. Twitter/X card support for shareability.
- **Performance as SEO:** Core Web Vitals directly affect Google ranking — performance targets above serve dual purpose.

### Accessibility Level

- **Target:** WCAG 2.1 AA compliance across all screens.
- **Priority areas:** The AI clarification loop and issue creation form must be fully keyboard-navigable and screen-reader friendly — non-technical users include users who rely on assistive technology.
- **Colour contrast:** AA minimum across all UI states including disabled, loading, and error states.
- **Focus management:** Proper focus handling during the clarification loop (as new questions appear) and during streaming generation.

### Implementation Considerations

- **Framework:** Next.js 15 App Router with TypeScript strict mode.
- **Styling:** Tailwind CSS v4 + shadcn/ui — accessible component primitives by default, reducing accessibility implementation overhead.
- **Deployment:** Vercel — edge functions and preview deploys. Core Web Vitals monitoring via Vercel Analytics.
- **Package manager:** pnpm.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience MVP — the goal is to deliver the "wow" moment as fast as possible. A non-technical user describes what they need, IssueForge scans the codebase, asks at most 3 targeted clarifying questions, and produces an issue so good the user says "I couldn't have said it better myself." Everything in MVP exists to make that moment happen reliably.

**Core MVP constraint:** Single-user focused. No team management, no multi-user collaboration. Anyone can sign up with GitHub and start creating issues immediately — zero team setup required.

**Resource Requirements:** Small team. Next.js + Vercel stack minimises infrastructure overhead. Primary complexity is in the AI layer (code scanning, context indexing, clarification loop, persona-aware prompting).

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:** Sarah (non-technical creator), Marcus (developer creator), Alex (first-time visitor/onboarding)

**Must-Have Capabilities:**

1. **GitHub OAuth** — sign in, auto-fetch accessible repos
2. **Repo selection** — pick any repo the user can access, or manually add by `owner/repo`
3. **Initial repo code scan** — on first repo add, IssueForge scans the full codebase and stores full file contents as a code index. Progress bar shown to user. Excludes nothing (user's repo, their choice).
4. **Manual re-scan** — user can trigger a fresh scan at any time from repo settings
5. **User role setting** — users self-select "I'm a developer" / "I'm not a developer" during onboarding. Controls communication style and context depth throughout the product.
6. **BYOK (Bring Your Own Key)** — users provide their own Anthropic or OpenAI API key. No IssueForge-hosted AI in MVP. Guided setup flow with step-by-step instructions for obtaining an API key from each provider, embedded in onboarding. Keys stored encrypted server-side only.
7. **Interactive AI clarification loop** — always on for MVP. AI asks **at most 3** targeted questions before generating, using repo + code context. Questions are persona-adapted (plain language for non-technical, technical for developers).
8. **AI issue generation** — structured issue output: title, summary, acceptance criteria, labels, technical notes. Persona-aware: non-technical users see concept-level context, developers see file paths and function references.
9. **Out-of-the-box issue templates** — IssueForge ships with a set of default templates (bug report, feature request, technical debt). Applied at generation time.
10. **Issue review and edit** — user can review and edit all fields before submitting. AI-generated badge visible so users know content is AI-assisted.
11. **Submit to GitHub** — push issue directly via GitHub API
12. **Issue history stored in DB** — stored privately per user; UI for browsing is post-MVP
13. **Marketing landing page** — SSR, SEO-optimised, demonstrates the clarification loop, fast path to sign-up

### Post-MVP Features

**Phase 2 (Growth):**

- **IssueForge-hosted AI (free tier)** — IssueForge-hosted AI with usage limits, once usage patterns are understood and pricing is sustainable
- **Scheduled repo re-scan** — automatic re-indexing on a configurable schedule (daily/weekly) to keep code context fresh
- **Team settings + admin** — Priya's journey: team creation, repo assignment, member management, default template per repo
- **Custom template upload** — teams upload their own issue templates
- **Single-shot generation mode** — toggle to disable the clarification loop for power users
- **Developer review experience** — intuitive interface optimised for developers reviewing AI-generated issues (reviewer mindset, not writer mindset)
- **Issue history UI** — browse, re-submit, clone past issues

**Phase 3 (Expansion):**

- **Agentic workflow integration** — submit issue and optionally trigger an AI coding agent to fulfill it
- **Multi-platform integrations** — Jira, Azure DevOps, GitHub CLI submission path
- **Broader AI tier model** — usage tracking, analytics, more supported providers
- **Webhook-triggered re-scan** — re-index on push events via GitHub webhooks
- **Analytics** — issues created over time, quality scoring, clarification loop effectiveness
- **GitHub Projects integration** — assign issues to project boards on submission

### Risk Mitigation Strategy

**Technical Risks:**
- *Code scan infrastructure complexity* — background job processing, chunked storage, and indexing is the highest-complexity MVP component. Mitigation: use a proven queue solution (e.g. Vercel background functions or a simple job queue), scope scan to GitHub API file fetching (no git clone required), and timebox the implementation.
- *AI quality variance* — the clarification loop quality depends heavily on prompt engineering. Mitigation: invest early in prompt iteration with real user descriptions before launch. Quality is the primary success metric.
- *Code index storage costs* — storing full file contents for every repo at scale is expensive. Mitigation: acceptable for MVP at small user counts; revisit storage strategy (embeddings, chunking) as part of Phase 2 infrastructure work.

**Market Risks:**
- *Non-technical users don't trust AI-generated issues* — they may feel the output doesn't represent them. Mitigation: the edit step before submission is the safety valve; the AI-assisted badge reinforces transparency.
- *BYOK barrier for non-technical users* — requiring an API key may cause drop-off. Mitigation: guided "how to get your API key" onboarding flow with step-by-step instructions per provider.
- *Developers dismiss it as "just another AI tool"* — Mitigation: the code context depth and quality of technical notes is the differentiator. Marcus's journey must feel meaningfully faster and better than writing manually.

**Resource Risks:**
- *Scan infrastructure delays MVP* — if code scanning proves harder than expected, ship without it first (repo structure only) and add full code scanning in a fast follow. The clarification loop still works with repo-level context — it just won't have the "wow" depth.
- *Small team bandwidth* — prioritise issue creation flow above all else. Marketing page, settings, and history are secondary to the core loop working perfectly.

## Functional Requirements

### User Account & Onboarding

- FR1: Users can sign in to IssueForge using their GitHub account via OAuth.
- FR2: Users can select their role ("I'm a developer" / "I'm not a developer") during onboarding to set their communication preference.
- FR3: Users can provide and save their own Anthropic or OpenAI API key (BYOK) as their AI provider.
- FR4: Users can access step-by-step guidance on how to obtain an API key from each supported AI provider, embedded within the onboarding flow.
- FR5: Users can update their role preference and API key at any time in account settings.
- FR6: Users can delete their account and all associated data (issue history, stored API keys, repo index) at any time.

### Repository Management

- FR7: Users can view and select from a list of GitHub repositories they have access to, auto-fetched after OAuth sign-in.
- FR8: Users can manually add a repository by `owner/repo` identifier.
- FR9: Users can trigger an initial full code scan of a newly added repository, which indexes the full file contents for AI context.
- FR10: The system displays a progress indicator to users while a repository code scan is in progress.
- FR11: Users can trigger a manual re-scan of any previously added repository to refresh the code index.
- FR12: The system notifies users clearly if a repository scan fails, with actionable guidance on what to do next.
- FR13: Users can remove a repository from IssueForge, which deletes its stored code index.

### Issue Creation & AI Clarification Loop

- FR14: Users can initiate issue creation by selecting a repository and entering a free-text description of what they need.
- FR15: The system conducts an AI-driven clarification loop, asking the user up to 3 targeted follow-up questions before generating any issue content.
- FR16: Clarifying questions are generated using the selected repository's code index and structure as context.
- FR17: Clarifying questions are adapted in language and technical depth to match the user's selected role (plain language for non-technical users; technical, code-level language for developers).
- FR18: Users can answer clarifying questions and have their answers incorporated into the final issue generation.

### AI Issue Generation

- FR19: The system generates a structured GitHub issue comprising: title, summary, acceptance criteria, labels, and technical notes.
- FR20: Generated technical notes reference relevant file paths and function names for developer-role users, and concept-level descriptions for non-technical users.
- FR21: The system applies an appropriate out-of-the-box issue template (bug report, feature request, or technical debt) during generation.
- FR22: Issue content is streamed to the user progressively as it is generated, with clear loading state feedback.
- FR23: Generated issues are clearly labelled as AI-assisted so users know the content was AI-generated.

### Issue Review & Submission

- FR24: Users can review all fields of a generated issue before submitting.
- FR25: Users can edit any field (title, summary, acceptance criteria, labels, technical notes) of the generated issue before submitting.
- FR26: Users can submit a reviewed issue directly to GitHub via the GitHub API.
- FR27: The system confirms successful issue submission and provides a direct link to the created GitHub issue.
- FR28: The system communicates clearly if issue submission fails, with guidance on next steps.

### Issue Templates

- FR29: Users can select from IssueForge's out-of-the-box issue templates: bug report, feature request, and technical debt.
- FR30: The system applies the selected template structure during AI issue generation.

### Issue History

- FR31: The system stores each created issue privately per user in the database.
- FR32: Stored issue data is accessible only to the user who created it; no cross-user access is permitted.

### Privacy & Data Controls

- FR33: Users can view what data IssueForge stores about them (issue history, API keys, repo index).
- FR34: Users are informed during onboarding that their issue descriptions and repo content are sent to their chosen third-party AI provider.
- FR35: The system enforces strict per-user data isolation — no user can access another user's repos, issues, templates, or settings.

### Marketing & Acquisition

- FR36: Unauthenticated visitors can access a public marketing landing page that communicates IssueForge's value proposition.
- FR37: The landing page demonstrates the AI clarification loop in action (e.g. via demo or animation) to communicate the core differentiator.
- FR38: Visitors can initiate GitHub OAuth sign-up directly from the landing page.
- FR39: The landing page is server-rendered and fully crawlable by search engines, with appropriate meta tags and Open Graph data.

### Error Handling & System Feedback

- FR40: The system communicates GitHub API errors clearly to users (e.g. token expired, insufficient repo permissions).
- FR41: The system communicates AI provider errors clearly to users (e.g. invalid API key, quota exceeded, provider unavailable).
- FR42: The system handles mid-stream generation failures gracefully, with a clear error state and recovery option.
- FR43: The system prevents silent failures across all core flows — every error must surface a user-visible, actionable message.
- FR44: Users can re-attempt any failed operation (scan, generation, submission) without losing their in-progress work.

## Non-Functional Requirements

### Performance

- NFR1: Public pages (landing, sign-in) achieve Core Web Vitals green scores — LCP < 2.5s, CLS < 0.1, FID < 100ms — on Google PageSpeed Insights.
- NFR2: The authenticated app shell loads and is interactive within 3 seconds on a standard broadband connection.
- NFR3: AI issue generation begins streaming the first token to the UI within 5 seconds of the user submitting their final clarification answer.
- NFR4: Repository code scan progress is visible to users; the system provides incremental progress updates, not a spinner with no feedback.
- NFR5: GitHub repo list fetch completes within 3 seconds of OAuth sign-in for accounts with up to 100 repositories.
- NFR6: The clarification loop presents the next question within 3 seconds of the user answering the previous one.

### Security

- NFR7: GitHub OAuth access tokens are stored encrypted at rest and are never exposed to the client (browser) at any point.
- NFR8: User-provided AI provider API keys (BYOK) are stored encrypted at rest using server-side encryption only; keys are never returned to the client after initial submission.
- NFR9: All data in transit between the client, server, and third-party APIs is encrypted via TLS 1.2 or higher.
- NFR10: Multi-tenant data isolation is enforced at the database layer — row-level security or equivalent ensures one user cannot access another user's repos, issues, code index, API keys, or settings.
- NFR11: User-submitted issue descriptions and repo content sent to AI providers (Anthropic, OpenAI) are not stored or logged by IssueForge's server beyond the duration of the generation request.
- NFR12: Input submitted to AI models is sanitised to mitigate prompt injection risks before being forwarded to the AI provider.
- NFR13: IssueForge only accesses GitHub repository content that the authenticated user's token has permission to access — no escalation of privilege.

### Scalability

- NFR14: The system supports up to 500 registered users and 50 concurrent active sessions without performance degradation during the MVP phase.
- NFR15: The code index storage strategy is designed with awareness that stored file contents grow linearly with user and repo count; storage costs must be reviewed and addressed before Phase 2 growth.
- NFR16: The AI provider abstraction layer allows adding new providers (e.g. Google Gemini, Mistral) without requiring changes to the core issue generation flow.
- NFR17: The repo scan background job system is designed to be horizontally scalable — multiple scan jobs can run concurrently without blocking each other or degrading the interactive issue creation experience.

### Accessibility

- NFR18: All user-facing screens meet WCAG 2.1 AA compliance.
- NFR19: The AI clarification loop — including question display, input fields, and progression — is fully keyboard-navigable and operable without a mouse.
- NFR20: Focus is correctly managed as new clarification questions appear dynamically, so screen reader users are notified of new content without losing their position.
- NFR21: All interactive elements maintain a minimum colour contrast ratio of 4.5:1 (AA) in all states — default, hover, focus, disabled, error, and loading.
- NFR22: AI-generated issue content displayed in the review step is fully readable and navigable by screen readers.

### Reliability

- NFR23: GitHub API and AI provider failures are handled gracefully — all errors surface a user-visible, actionable message; no silent failures are permitted.
- NFR24: If an AI generation stream fails mid-response, the system presents a clear error state with a one-click retry option, and the user's input (description + clarification answers) is not lost.
- NFR25: If a repository code scan fails, the user is notified with a clear description of what failed and an option to retry — partial scan results are not silently used as context.
- NFR26: The system does not guarantee uptime independently of GitHub API and AI provider availability, but all dependency failures are surfaced clearly rather than resulting in broken or blank states.

### Integration

- NFR27: GitHub API integration follows GitHub's rate limiting guidelines; the system handles 429 responses gracefully (informative message, no crash) and does not hammer the API under load.
- NFR28: AI provider API calls use the Vercel AI SDK's provider abstraction; switching the active AI provider requires no changes to the generation pipeline, only a configuration update.
- NFR29: The GitHub OAuth token refresh and revocation flow is handled automatically; users are prompted to re-authenticate when tokens expire rather than encountering unexplained failures.
- NFR30: All external API calls (GitHub, AI providers) have request timeouts configured — no call blocks indefinitely. Timeout values are defined and documented per integration.
