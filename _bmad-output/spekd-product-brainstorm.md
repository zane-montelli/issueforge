# Spekd — Product Brainstorm & Deep-Dive

**"Your idea, fully spekd."**

**Prepared for:** ChiaLung Liu
**Date:** 2026-03-04
**Context:** Rebrand from IssueForge → Spekd; expansion from single-purpose issue creator to full product lifecycle platform

---

## Table of Contents

1. [Product Vision & Positioning](#1-product-vision--positioning)
2. [User Personas](#2-user-personas)
3. [Phase 0: PLAN — Deep Dive](#3-phase-0-plan--deep-dive)
4. [Phase 2: BUILD — Deep Dive](#4-phase-2-build--deep-dive)
5. [Planning Method Abstraction](#5-planning-method-abstraction)
6. [Cross-Phase Data Flow](#6-cross-phase-data-flow)
7. [Changes to the Existing PRD](#7-changes-to-the-existing-prd)
8. [MVP Phasing & Build Sequence](#8-mvp-phasing--build-sequence)

---

## 1. Product Vision & Positioning

### The Core Insight

The software industry has a massive gap between "I have an idea" and "a developer is writing code." Today, this gap is filled with a patchwork of ad-hoc conversations, scattered documents, and tribal knowledge. The people with the ideas (founders, PMs, subject-matter experts) can't express them in a way that's developer-actionable. The developers who receive vague inputs waste enormous time clarifying before they can build. And the AI coding agents that are reshaping development? They're completely blocked by ambiguity — they need machine-readable precision to operate.

**IssueForge solved one slice of this: the issue creation moment.** It front-loaded the clarification conversation into the issue itself, producing developer-ready GitHub issues.

**Spekd solves the entire arc.** From the first spark of an idea, through structured product planning, to actionable development tasks, to AI-assisted or human implementation. Every step is guided, every output flows into the next, and every artifact is structured enough for both humans and AI agents to act on.

### Positioning Statement

**Spekd** is a product lifecycle platform that takes you from raw idea to deployed feature. It guides non-technical users through structured product planning, transforms plans into developer-ready issues, and connects those issues to build tooling — AI coding agents, human developers, or both.

**For** founders, product managers, business analysts, and developers
**Who** need to go from idea to implementation without the communication breakdown
**Spekd is** a three-phase lifecycle platform (Plan → Create → Build)
**That** guides users through structured product thinking, produces actionable development artifacts, and connects directly to build tooling
**Unlike** GitHub Issues, Linear, Notion, or standalone AI writing tools
**Our product** understands your codebase, adapts to your technical level, and treats the entire idea-to-code pipeline as one continuous, intelligent experience.

### The Tagline: "Your idea, fully spekd."

This works at every level:
- **Phase 0 (PLAN):** Your idea, fully specified — planned, structured, documented
- **Phase 1 (CREATE):** Your feature, fully specified — clarified, detailed, ready for development
- **Phase 2 (BUILD):** Your spec, fully executed — implemented, tested, deployed
- **Brand identity:** "Spekd" as a verb — to have your idea fully worked out, soup to nuts

### Competitive Landscape (Expanded)

| Competitor | What They Do | What Spekd Does Differently |
|---|---|---|
| **GitHub Issues + Copilot** | Template-based issue creation; Copilot helps developers in-editor | Spekd interrogates intent before generating; non-technical users supported; full lifecycle |
| **Linear** | Fast project management with AI-assisted issue creation | Single-shot generation; developer-centric; no product planning phase; no build phase |
| **Notion AI / Confluence AI** | Document-oriented AI writing | No code context; no GitHub integration; no structured issue output; no lifecycle |
| **Cursor / Copilot (Build)** | AI coding from issue/prompt context | Needs well-structured input to work well — Spekd *creates* that structured input |
| **BMAD (standalone)** | AI-driven product planning methodology | Requires LLM expertise; prompt-heavy; not productized; no issue or build integration |
| **Lovable / Bolt / v0** | Instant app generation from prompts | Skip the planning entirely; produce demo-quality code; no product discipline |
| **Jira + Confluence** | Enterprise issue + document management | Legacy; no AI interrogation; complex setup; separate planning and issue tools |

**Spekd's unique position:** No product connects idea → structured plan → developer-ready issue → build tooling as a single intelligent pipeline. Every existing tool covers one segment. Spekd covers the arc.

### Why This Rebrand Matters

"IssueForge" is descriptive and limiting — it tells you exactly what it does (forge issues) and nothing about where it's going. "Spekd" is:

1. **Memorable and brandable** — short, distinctive, ownable
2. **Expansive** — "spekd" (specified, specced out) applies to planning, issue creation, AND building
3. **Verb-ready** — "I spekd that feature" / "Is that feature fully spekd?"
4. **Non-technical first** — doesn't reference GitHub, issues, or forging; feels approachable
5. **Domain-available** — spekd.com / spekd.dev / spekd.io (to verify)

---

## 2. User Personas

### Primary Personas

#### Persona 1: Maya — The First-Time Founder

**Phase affinity:** Phase 0 (PLAN) → Phase 1 (CREATE)

**Background:** Maya is a domain expert (healthcare, fintech, education — pick one) with a strong product idea and zero software development experience. She has a rough sketch of what she wants to build, some notes in a Google Doc, and a burning conviction that this thing needs to exist. She might be pre-funding, bootstrapping, or working with a small freelance team.

**Pain today:** Maya has tried explaining her idea to developers three times. Each time, she gets different interpretations. One freelancer built the wrong thing. A friend suggested she write a PRD, but she doesn't know what that is. She's heard of "user stories" but has never written one. She's losing confidence — not in her idea, but in her ability to communicate it.

**What Spekd gives her:**
- Phase 0 walks her through her idea step by step, using language she understands
- She never has to know what a "PRD" or "architecture doc" is — Spekd asks her the right questions and produces the artifacts
- Phase 1 turns those artifacts into specific, developer-ready GitHub issues
- She can hand a developer (or an AI agent) a complete set of issues and say "build this"

**Emotional journey:** Overwhelmed → Guided → Articulate → Empowered
**Key metric:** Does Maya feel like she can hand the output to a developer and be understood?

---

#### Persona 2: Sarah — The Business Analyst (Existing IssueForge Persona)

**Phase affinity:** Phase 1 (CREATE), sometimes Phase 0 for new initiatives

**Background:** Sarah works at a mid-sized SaaS company. She knows the product deeply but doesn't write code. She creates GitHub issues that come back with questions or get misinterpreted.

**What Spekd gives her:** Same as IssueForge today — the AI clarification loop that produces issues she's proud of. But now, when a completely new initiative starts, she can use Phase 0 to think through the full scope before creating individual issues.

**Extension for Spekd:** Sarah might use Phase 0 when her VP says "we need to rethink our onboarding flow." She uses the planning phase to map out the initiative, then flows directly into Phase 1 to generate the specific issues.

---

#### Persona 3: Marcus — The Developer Who Wants Structure (Existing IssueForge Persona)

**Phase affinity:** Phase 1 (CREATE), Phase 2 (BUILD)

**Background:** Senior developer who writes his own issues and wants speed. He knows the codebase and just needs the issue well-formatted.

**What Spekd gives him:** Phase 1 is his 45-second issue creation. But now, Phase 2 lets him pipe that issue directly into an AI coding agent. Marcus doesn't need Phase 0 — he's already the technical expert.

**Extension for Spekd:** Marcus picks up an issue created by Maya or Sarah in Phase 1, and uses Phase 2 to see all the context (planning artifacts, user research, related issues) bundled alongside the issue. He can also trigger an AI agent to start a PR draft.

---

#### Persona 4: Devon — The Solo Builder

**Phase affinity:** All three phases

**Background:** Devon is a full-stack developer building a side project or early-stage startup. They're both the product thinker AND the builder. They have ideas but lack product discipline — they jump straight to code, skip planning, and end up refactoring endlessly.

**Pain today:** Devon's projects sprawl. Features get half-built. There's no written plan, so when Devon returns to the project after a break, they've lost context. They've tried using BMAD or similar methodologies but found them too heavy for a solo developer.

**What Spekd gives them:**
- Phase 0 gives Devon lightweight product planning that prevents scope creep
- Phase 1 creates structured issues so Devon has a clear backlog
- Phase 2 lets Devon hand issues to AI coding agents (Copilot, Cursor, Claude Code) with full context
- The whole thing feels like a smart collaborator, not a process bureaucracy

**Emotional journey:** Scattered → Organized → Focused → Shipping
**Key metric:** Does Devon ship features faster with fewer rewrites?

---

#### Persona 5: Priya — The Engineering Manager (Existing IssueForge Persona, Extended)

**Phase affinity:** Phase 0 (PLAN) for new projects, Phase 1 (CREATE) for team standards

**Background:** Manages a 20-person engineering org. Cares about consistency, predictability, and reducing clarification overhead across the team.

**Extension for Spekd:** Priya uses Phase 0 to kick off new product initiatives with her PM counterpart. The planning output flows into Phase 1, where her team creates issues that follow consistent conventions. In Phase 2, she monitors which issues are being picked up by AI agents vs. humans.

---

#### Persona 6: Jordan — The Issue Consumer (Passive Persona)

**Phase affinity:** Receives Phase 1 output; works in Phase 2

**Background:** Developer who picks up issues from the backlog. Never uses Spekd directly but benefits from well-structured issues and rich context.

**What Spekd gives them (indirectly):**
- Issues that require zero follow-up questions
- Planning context attached to issues so they understand the "why" not just the "what"
- Phase 2 tooling that pre-loads all relevant context when they start implementation

---

### Cross-Phase User Patterns

| Pattern | Personas | Flow |
|---|---|---|
| **Idea-to-Issues** | Maya, Sarah, Priya | Phase 0 → Phase 1 |
| **Issue-Only** | Sarah, Marcus, Alex | Phase 1 standalone |
| **Full Lifecycle** | Devon, Priya | Phase 0 → Phase 1 → Phase 2 |
| **Build-Only** | Marcus, Jordan | Phase 2 (picks up existing issues) |
| **Plan-Only** | Maya (early stage) | Phase 0 only, exports artifacts |

---

## 3. Phase 0: PLAN — Deep Dive

### What Is Phase 0?

Phase 0 is a **guided product planning experience** that takes a rough idea and produces structured product artifacts — the kind of documents a senior product manager or business analyst would create. The user doesn't need to know what these artifacts are or how to create them. They just answer questions, make decisions when prompted, and Spekd produces the output.

Think of it as "an expert product manager who interviews you about your idea, then writes all the docs."

### The Non-Technical User Experience

**Entry point:** User signs into Spekd and clicks "Start a New Project" (or similar CTA). They have NOT selected a planning method yet — the platform first orients them.

#### Step 1: Project Intake

A conversational, guided intake:

```
Spekd: "Tell me about your idea in your own words. Don't worry about 
        being precise — just describe what you want to build and who 
        it's for."

Maya:  "I want to build an app that helps pet owners find and book 
        trusted pet sitters in their neighborhood. Kind of like Uber 
        but for pet sitting."

Spekd: "Great — a marketplace for pet sitting services. Before we 
        dive into planning, let me ask a few quick questions to 
        understand where you are..."
```

The intake collects:
- What's the idea? (free text, natural language)
- Who is it for? (audience)
- What stage are you at? (just an idea / some notes / have a doc already)
- What's your goal with this planning session? (understand what to build / create a plan for developers / get issues for my backlog)
- Do you have an existing codebase? (connects to Phase 1/2)

#### Step 2: Planning Method Selection

After intake, Spekd recommends a planning method based on the user's goal and stage. The user can accept the recommendation or choose manually.

```
Spekd: "Based on your idea and goals, I recommend the BMAD Planning 
        Method — it'll guide you through creating a complete product 
        brief, requirements doc, architecture decisions, and 
        implementation plan. This usually takes 2-4 sessions.

        You can also choose:
        → Lean Canvas (faster, high-level, good for validation)
        → Custom Method (bring your own planning templates)
        
        Which works for you?"
```

#### Step 3: Guided Planning Sessions

The planning method drives the session. For BMAD, this might look like:

**Session 1: Discovery & Product Brief**
- Spekd asks about target users, problems being solved, competitive landscape
- Conversation is adaptive — follows up on interesting answers, skips irrelevant areas
- At the end, produces a Product Brief / Executive Summary

**Session 2: Requirements Deep-Dive**
- Walks through user journeys ("Walk me through what happens when Maya's user opens the app for the first time...")
- Identifies functional requirements from the conversation
- Produces a PRD-style document

**Session 3: Technical & Architecture**
- For non-technical users: "What platforms should this work on? Web, mobile, both?"
- For technical users: "What tech stack are you considering? Any constraints?"
- Produces architecture recommendations / constraints

**Session 4: Scoping & Epics**
- Prioritization: "If you could only ship one thing first, what would it be?"
- Breaks the plan into epics and stories
- This is the handoff point to Phase 1

#### Step 4: Artifact Review & Export

All produced artifacts are stored in the project. The user can:
- Review and edit any artifact
- Export as Markdown, PDF, or Google Docs
- Flow directly into Phase 1 (CREATE) to generate issues from the plan
- Share artifacts with team members (future)

### Key Phase 0 UX Principles

1. **One question at a time.** Never present a multi-field form. Each interaction is a question and an answer — like talking to a consultant.

2. **Save & resume.** Sessions can be interrupted and resumed. "Pick up where you left off" is essential for busy founders.

3. **Show progress, not process.** Maya doesn't care that she's in "Step 3 of the BMAD workflow." She cares that she can see her product taking shape. Show the growing artifact, not the methodology's step counter.

4. **Plain language, always.** "Let's figure out what your app needs to do" not "Let's define your functional requirements." The artifacts can use technical terminology — the conversation never does (for non-technical users).

5. **The AI should feel like a smart co-founder, not a form wizard.** It should challenge assumptions ("Are you sure you need both a web app AND a mobile app for launch?"), offer opinions ("Most marketplace apps launch with one side first — supply or demand. Which matters more to start?"), and explain why things matter ("Acceptance criteria help developers know exactly when a feature is done").

6. **Artifacts should be impressive.** When Maya reads her PRD, she should think "this is what a real product plan looks like." The quality of the output is what makes her trust the platform and share it with potential co-founders or investors.

### Phase 0 Technical Architecture Considerations

- **Session state:** Each planning session is a persisted conversation with structured output. Think of it as a specialized chat session that produces artifacts at checkpoints.
- **Planning method drives prompts:** The planning method adapter provides the prompt templates, question sequences, and artifact schemas. The Spekd platform handles the UI, conversation state, and artifact storage.
- **Multi-session support:** A project can have multiple planning sessions across different areas (product, technical, UX). Each session produces its own artifacts.
- **Artifact storage:** Planning artifacts are stored as structured markdown with frontmatter (similar to the existing `_bmad-output/planning-artifacts/` format). They're associated with a project, not a repo.

---

## 4. Phase 2: BUILD — Deep Dive

### What Is Phase 2?

Phase 2 is the **build orchestration layer** — it connects the well-structured issues from Phase 1 to the tools and agents that actually implement them. Spekd doesn't write the code itself (that's what Copilot, Cursor, Claude Code, etc. do). Instead, it:

1. **Packages context** — bundles the issue with all relevant planning artifacts, codebase context, related issues, and acceptance criteria into a complete implementation brief
2. **Triggers agents** — dispatches the implementation brief to connected AI coding tools or assigns to human developers
3. **Tracks progress** — monitors PRs, code reviews, and completion status back to the original issue
4. **Closes the loop** — marks issues as done, tracks implementation against acceptance criteria

### How Phase 2 Works

#### For AI Coding Agents

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Phase 1    │────→│   Phase 2    │────→│  AI Agent    │
│  (Issue)     │     │  (Context    │     │  (Cursor,    │
│              │     │   Bundle)    │     │   Copilot,   │
│ - Title      │     │              │     │   Claude)    │
│ - AC         │     │ - Issue      │     │              │
│ - Tech Notes │     │ - PRD section│     │ Creates PR   │
│ - Labels     │     │ - Arch notes │     │              │
└──────────────┘     │ - Code index │     └──────┬───────┘
                     │ - Related    │            │
                     │   issues     │            ▼
                     └──────────────┘     ┌──────────────┐
                                          │   GitHub PR  │
                                          │ (linked to   │
                                          │  issue)      │
                                          └──────────────┘
```

**The Context Bundle is the key innovation.** Today, when you hand an AI coding agent a GitHub issue, the agent gets the issue text and maybe the repo. With Spekd Phase 2, the agent gets:

- The issue itself (from Phase 1)
- Relevant sections of the PRD (from Phase 0)
- Architecture decisions and constraints (from Phase 0)
- The user persona this feature serves (from Phase 0)
- The code index — what files exist, what they do (from Phase 1's repo scan)
- Related issues — what else is being built alongside this feature
- Acceptance criteria in machine-readable format
- Implementation notes and suggested approach

This is the difference between handing a contractor a napkin sketch and handing them architectural blueprints.

#### For Human Developers

Phase 2 for human developers is lighter-touch:

1. **Issue context page:** When a developer opens an issue (in Spekd or via a link), they see not just the issue but a rich context sidebar: related planning artifacts, architecture notes, similar past issues, and the full code index for the affected area.

2. **PR template generation:** When the developer starts a PR, Spekd can generate a PR description template that links back to the issue, references acceptance criteria, and lists affected files.

3. **Completion tracking:** Spekd monitors GitHub for PRs that reference the issue and tracks them through review → merge → deploy.

### Phase 2 Integrations

| Integration | Type | Purpose |
|---|---|---|
| **GitHub API** | Core | PR monitoring, issue status updates, webhook-driven events |
| **Copilot Workspace** | Agent dispatch | Send context bundle to Copilot for PR generation |
| **Cursor** | Agent dispatch | Open Cursor with pre-loaded context (via deep link or API) |
| **Claude Code / Claude CLI** | Agent dispatch | Send structured prompt with full context |
| **Custom webhook** | Extensible | POST context bundle to any URL — supports self-hosted agents |
| **GitHub Actions** | CI/CD tracking | Monitor deployment status linked back to issues |
| **Slack / Discord** | Notification | Notify when issues are picked up, PRs created, PRs merged |

### Phase 2 Key User Journeys

**Journey: Devon hands off to AI agent**

1. Devon finishes planning (Phase 0) and creates 5 issues (Phase 1) for the first sprint
2. On each issue, Devon sees a "Build with AI" button
3. Devon clicks it on the first issue — selects "Claude Code" as the agent
4. Spekd packages the context bundle and provides Devon with a structured prompt to paste into Claude Code (or, if API integration exists, dispatches it directly)
5. Claude Code generates a PR. Devon reviews it.
6. Spekd detects the PR (via webhook), links it to the issue, and updates the issue status
7. Devon merges. Spekd marks the issue as completed.

**Journey: Marcus reviews an AI-generated PR**

1. Marcus opens an issue in GitHub that was created by Sarah via Spekd Phase 1
2. An AI agent (triggered by another team member) has already created a PR
3. Marcus clicks the Spekd link in the issue description to see the full context bundle
4. He reviews the PR knowing exactly what was intended (the planning context, acceptance criteria, and user persona)
5. He approves and merges. Spekd tracks the completion.

### Phase 2 Technical Considerations

- **Context Bundle API:** A well-defined JSON/Markdown format that packages all relevant context for an issue. This is the "export format" that any build tool can consume.
- **Webhook listeners:** Spekd needs to receive GitHub webhooks for PR creation, review, merge, and deployment events to close the loop.
- **Agent adapters:** Similar to the planning method adapter pattern (see Section 5), build agents should be pluggable. Each agent has an adapter that knows how to format and dispatch the context bundle.
- **Privacy considerations:** The context bundle may contain proprietary code and business strategy. It should never be stored on Spekd's servers beyond the dispatch — it's a pass-through, not a repository.

---

## 5. Planning Method Abstraction

### Why Abstraction Matters

BMAD is the first planning method, but it will not be the last. Different users and organizations have different planning needs:

- A startup founder might want a **Lean Canvas** approach — fast, high-level, validation-focused
- An enterprise PM might want a **SAFe-aligned** approach — epics, features, enablers, mapped to program increments
- A design-led team might want a **Design Sprint** approach — user research → prototype → validate
- A solo developer might want a **Build-in-Public** approach — lightweight specs, fast iteration
- A team might have their own **Custom Method** — internal templates and processes they've developed

### The Planning Method Adapter

A planning method adapter is a structured definition that tells Spekd:

1. **What sessions to run** — the sequence of planning conversations
2. **What questions to ask** — the prompt templates for each session
3. **What artifacts to produce** — the output documents and their schemas
4. **How to transition between sessions** — what triggers the next phase
5. **How artifacts map to Phase 1** — which outputs flow into issue creation

#### Conceptual Interface

```typescript
interface PlanningMethod {
  /** Unique identifier for this method */
  id: string
  
  /** Display name shown to users */
  name: string
  
  /** Description for method selection UI */
  description: string
  
  /** Who is this method best for? */
  recommendedFor: string[]
  
  /** Estimated time to complete (in sessions) */
  estimatedSessions: number
  
  /** The ordered sequence of planning sessions */
  sessions: PlanningSession[]
  
  /** How this method's artifacts map to Phase 1 inputs */
  phaseOneMapping: PhaseOneMapping
}

interface PlanningSession {
  /** Unique session identifier */
  id: string
  
  /** Session name shown to user */
  name: string
  
  /** What this session accomplishes */
  description: string
  
  /** The AI persona for this session (e.g., "product strategist") */
  persona: AIPersona
  
  /** 
   * The prompt template that drives the conversation.
   * Includes:
   * - System prompt (the AI's role and instructions)
   * - Initial question (how the session starts)
   * - Follow-up logic (how to respond to user answers)
   * - Completion criteria (when the session is done)
   */
  promptTemplate: PromptTemplate
  
  /** What artifact(s) this session produces */
  outputs: ArtifactSchema[]
  
  /** Prerequisites: which sessions must complete first */
  dependsOn: string[]
}

interface ArtifactSchema {
  /** Artifact type: 'prd', 'architecture', 'ux-spec', 'epics', etc. */
  type: string
  
  /** Display name */
  name: string
  
  /** Template/schema for the artifact content */
  template: string
  
  /** Whether this artifact can be edited by the user post-generation */
  editable: boolean
}

interface PhaseOneMapping {
  /** Which artifacts contain issues/stories to import into Phase 1 */
  issueSourceArtifacts: string[]
  
  /** How to extract issue data from the artifacts */
  issueExtractionPrompt: string
  
  /** Context artifacts to attach to every generated issue */
  contextArtifacts: string[]
}
```

#### The BMAD Adapter (First Implementation)

```typescript
const bmadMethod: PlanningMethod = {
  id: 'bmad',
  name: 'BMAD Method',
  description: 'Comprehensive product planning: brief → PRD → architecture → UX → epics. Best for new products that need thorough planning.',
  recommendedFor: ['New product ideas', 'Major features', 'Product rethinks'],
  estimatedSessions: 4,
  sessions: [
    {
      id: 'discovery',
      name: 'Product Discovery',
      description: 'Explore your idea, target users, and market context',
      persona: { role: 'Strategic Business Analyst', style: 'curious, probing, encouraging' },
      promptTemplate: bmadDiscoveryPrompt,
      outputs: [{ type: 'product-brief', name: 'Product Brief', template: '...', editable: true }],
      dependsOn: []
    },
    {
      id: 'requirements',
      name: 'Requirements Deep-Dive',
      description: 'Define user journeys, functional requirements, and success criteria',
      persona: { role: 'Product Manager', style: 'precise, user-focused' },
      promptTemplate: bmadRequirementsPrompt,
      outputs: [{ type: 'prd', name: 'Product Requirements Document', template: '...', editable: true }],
      dependsOn: ['discovery']
    },
    {
      id: 'architecture',
      name: 'Technical Architecture',
      description: 'Define technical approach, stack, and infrastructure',
      persona: { role: 'Solutions Architect', style: 'pragmatic, decisive' },
      promptTemplate: bmadArchitecturePrompt,
      outputs: [{ type: 'architecture', name: 'Architecture Decision Document', template: '...', editable: true }],
      dependsOn: ['requirements']
    },
    {
      id: 'epics',
      name: 'Epic & Story Breakdown',
      description: 'Break requirements into implementable epics and user stories',
      persona: { role: 'Technical Product Manager', style: 'structured, detail-oriented' },
      promptTemplate: bmadEpicsPrompt,
      outputs: [{ type: 'epics', name: 'Epic Breakdown', template: '...', editable: true }],
      dependsOn: ['requirements', 'architecture']
    }
  ],
  phaseOneMapping: {
    issueSourceArtifacts: ['epics'],
    issueExtractionPrompt: 'Extract each user story as a separate issue with title, description, acceptance criteria, and labels...',
    contextArtifacts: ['product-brief', 'prd', 'architecture']
  }
}
```

#### Example: Lean Canvas Adapter (Future)

```typescript
const leanCanvasMethod: PlanningMethod = {
  id: 'lean-canvas',
  name: 'Lean Canvas',
  description: 'Fast, focused product validation. One session, one canvas. Best for hypothesis testing and early-stage ideas.',
  recommendedFor: ['Early-stage validation', 'Side projects', 'Pivots'],
  estimatedSessions: 1,
  sessions: [
    {
      id: 'canvas',
      name: 'Build Your Canvas',
      description: 'Work through all 9 blocks of the Lean Canvas',
      persona: { role: 'Startup Advisor', style: 'direct, challenging, time-aware' },
      promptTemplate: leanCanvasPrompt,
      outputs: [{ type: 'lean-canvas', name: 'Lean Canvas', template: '...', editable: true }],
      dependsOn: []
    }
  ],
  phaseOneMapping: {
    issueSourceArtifacts: ['lean-canvas'],
    issueExtractionPrompt: 'Extract the key solution hypotheses as feature issues...',
    contextArtifacts: ['lean-canvas']
  }
}
```

### Method Selection UX

The planning method selection should feel like choosing an AI model, not configuring software:

```
┌────────────────────────────────────────────────────┐
│                                                    │
│  Choose your planning approach                     │
│                                                    │
│  ┌──────────────────────────────────────────────┐  │
│  │ ⭐ Recommended for you                       │  │
│  │                                               │  │
│  │ BMAD Method                                   │  │
│  │ Comprehensive · 4 sessions · Best for new     │  │
│  │ products that need thorough planning           │  │
│  │                                         [Use] │  │
│  └──────────────────────────────────────────────┘  │
│                                                    │
│  ┌──────────────┐  ┌──────────────┐               │
│  │ Lean Canvas  │  │ Custom       │               │
│  │ Fast · 1 ses │  │ Your own     │               │
│  │   [Use]      │  │   [Import]   │               │
│  └──────────────┘  └──────────────┘               │
│                                                    │
│  Learn about planning methods →                    │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Custom Method Support (Post-MVP)

Power users and organizations could define their own planning methods by:

1. **Uploading templates:** Markdown templates for each artifact they want produced
2. **Defining sessions:** What questions to explore in each session
3. **Setting personas:** What AI personality to use for each session
4. **Mapping to Phase 1:** How their artifacts translate into issues

This turns Spekd into a platform, not just a tool — organizations can encode their own product development culture into it.

---

## 6. Cross-Phase Data Flow

### The Data Model

```
┌─────────────────────────────────────────────────┐
│                    PROJECT                       │
│  (top-level container — name, description,       │
│   owner, team members, created_at)               │
│                                                  │
│  ┌───────────────┐                               │
│  │   Phase 0     │                               │
│  │   PLAN        │                               │
│  │               │                               │
│  │ ┌───────────┐ │                               │
│  │ │ Planning  │ │                               │
│  │ │ Sessions  │ │                               │
│  │ │ (conv.    │ │                               │
│  │ │  history) │ │                               │
│  │ └─────┬─────┘ │                               │
│  │       ▼       │                               │
│  │ ┌───────────┐ │      ┌───────────────┐        │
│  │ │ Artifacts │─┼─────→│   Phase 1     │        │
│  │ │ (PRD,     │ │      │   CREATE      │        │
│  │ │  arch,    │ │      │               │        │
│  │ │  epics)   │ │      │ ┌───────────┐ │        │
│  │ └───────────┘ │      │ │ Issues    │ │        │
│  └───────────────┘      │ │ (title,   │ │        │
│                          │ │  body,    │ │        │
│                          │ │  AC,      │ │        │
│                          │ │  labels,  │─┼──┐     │
│                          │ │  context) │ │  │     │
│                          │ └───────────┘ │  │     │
│                          │               │  │     │
│                          │ ┌───────────┐ │  │     │
│                          │ │ Code      │ │  │     │
│                          │ │ Index     │ │  │     │
│                          │ │ (repo     │─┼──┤     │
│                          │ │  scan)    │ │  │     │
│                          │ └───────────┘ │  │     │
│                          └───────────────┘  │     │
│                                             │     │
│                          ┌───────────────┐  │     │
│                          │   Phase 2     │  │     │
│                          │   BUILD       │◀─┘     │
│                          │               │        │
│                          │ ┌───────────┐ │        │
│                          │ │ Context   │ │        │
│                          │ │ Bundles   │ │        │
│                          │ └─────┬─────┘ │        │
│                          │       ▼       │        │
│                          │ ┌───────────┐ │        │
│                          │ │ PRs &     │ │        │
│                          │ │ Deploys   │ │        │
│                          │ └───────────┘ │        │
│                          └───────────────┘        │
└─────────────────────────────────────────────────┘
```

### Phase 0 → Phase 1 Data Flow

When a user completes Phase 0 and moves to Phase 1, the following data flows:

| From Phase 0 | To Phase 1 | How |
|---|---|---|
| **Epics/Stories** from the epic breakdown | **Pre-populated issue drafts** in the issue creation queue | Each story becomes a draft issue. The user can review, refine via the clarification loop, and submit. |
| **PRD sections** (user journeys, requirements) | **Contextual prompts** during the clarification loop | The AI references the PRD when asking clarifying questions: "Based on your PRD, Sarah's journey mentions a credit balance display — is this related?" |
| **Architecture decisions** | **Technical notes** in generated issues | Issues reference architecture decisions: "Per the architecture doc, this should use the pg-boss job queue for background processing." |
| **Success criteria** | **Acceptance criteria seed** | The AI uses project-level success criteria to generate issue-level acceptance criteria. |
| **Planning method metadata** | **Issue labels and templates** | The planning method informs which issue template to use and what labels to apply. |

#### The Phase 0 → Phase 1 Transition UX

```
┌────────────────────────────────────────────────────┐
│                                                    │
│  🎉 Your product plan is ready!                    │
│                                                    │
│  4 artifacts created:                              │
│  ✓ Product Brief                                   │
│  ✓ Product Requirements Document                   │
│  ✓ Architecture Decision Document                  │
│  ✓ Epic Breakdown (9 epics, 42 stories)            │
│                                                    │
│  What's next?                                      │
│                                                    │
│  ┌──────────────────────────────────────────────┐  │
│  │ Create Issues from Your Plan                  │  │
│  │                                               │  │
│  │ We found 42 stories in your plan that can     │  │
│  │ become GitHub issues. Spekd will refine each  │  │
│  │ one with AI-powered clarification, adding     │  │
│  │ code context from your repo.                  │  │
│  │                                               │  │
│  │ → Start with Epic 1 (5 stories)        [Go]  │  │
│  │ → Review all epics first                      │  │
│  │ → I'll come back to this later                │  │
│  └──────────────────────────────────────────────┘  │
│                                                    │
│  ┌──────────────────────────────────────────────┐  │
│  │ Export Artifacts                               │  │
│  │ Download as Markdown · Share link · PDF       │  │
│  └──────────────────────────────────────────────┘  │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Phase 1 → Phase 2 Data Flow

When an issue is created in Phase 1 and handed to Phase 2:

| From Phase 1 | To Phase 2 | How |
|---|---|---|
| **Complete issue** (title, body, AC, labels, technical notes) | **Primary context** in the context bundle | The issue is the central artifact the agent works from |
| **Code index** (repo scan) | **Codebase context** in the context bundle | Agent knows the repo structure, file contents, existing patterns |
| **Related issues** (same epic, same repo) | **Sibling context** in the context bundle | Agent understands what else is being built to avoid conflicts |
| **Planning artifacts** (if Phase 0 was used) | **Strategic context** in the context bundle | Agent understands the "why" — user persona, business goal, architectural constraints |

### Phase 2 → GitHub Data Flow (Closing the Loop)

| From Phase 2 / GitHub | Back to Spekd | How |
|---|---|---|
| **PR created** (webhook) | Issue status: "In Progress" | GitHub webhook triggers status update |
| **PR linked to issue** | Issue ↔ PR association | GitHub issue reference in PR description |
| **PR reviewed** | Issue status: "In Review" | Review event webhook |
| **PR merged** | Issue status: "Done" | Merge event webhook |
| **Deployment detected** | Issue status: "Deployed" | GitHub Actions / deployment webhook |

### The Project as the Unifying Container

The **Project** is the new top-level concept that ties everything together. In the current IssueForge design, the top-level containers are repos and issues. In Spekd:

- A **Project** can have planning artifacts (Phase 0), issues (Phase 1), and build context (Phase 2)
- A Project can be associated with one or more GitHub repos
- Users who only use Phase 1 still have a project — it's just one without planning artifacts
- The project is the context boundary — all data within a project flows freely between phases; no data leaks between projects

---

## 7. Changes to the Existing PRD

The existing IssueForge PRD is excellent and thorough. Here's what changes, what stays, and what needs to be added for the Spekd vision.

### What Stays (Fully Preserved)

- **FR1–FR44** — All 44 functional requirements remain valid for Phase 1 (CREATE)
- **NFR1–NFR30** — All non-functional requirements remain valid
- **User journeys 1–5** — Sarah, Marcus, Jordan, Priya, Alex all still work
- **Architecture decisions** — Next.js 16, BetterAuth, PostgreSQL, Drizzle, Vercel AI SDK, pg-boss, all stay
- **Security model** — Encrypted credentials, multi-tenant isolation, no silent failures
- **Self-hosting architecture** — Docker Compose, Kubernetes, env-var-driven config
- **UX design system** — Tailwind v4, shadcn/ui, dark-default, persona-aware

### What Changes (Modifications)

| Area | Current (IssueForge) | New (Spekd) |
|---|---|---|
| **Product name** | IssueForge | Spekd |
| **Positioning** | AI-powered issue creation tool | Product lifecycle platform (Plan → Create → Build) |
| **Top-level concept** | Repos + Issues | Projects (containing repos, planning artifacts, issues, build context) |
| **Navigation** | Dashboard → Repos → Issues | Dashboard → Projects → [Plan / Create / Build] |
| **Landing page copy** | "Bridge the gap between stakeholders and developers" | "Your idea, fully spekd." — Plan, Create, Build |
| **Landing page demo** | Clarification loop demo | Full lifecycle demo (Plan → Create → Build preview) |
| **Post-MVP roadmap** | Phase 2 (Growth), Phase 3 (Expansion) | Phase 0 (PLAN), current MVP is Phase 1 (CREATE), Phase 2 (BUILD) |
| **Branding** | "IssueForge" throughout CSS, components, meta tags | "Spekd" — `--color-primary` may shift to match new brand |
| **Component namespace** | `src/components/issueforge/` | `src/components/spekd/` |
| **Docker image** | `ghcr.io/issueforge/issueforge` | `ghcr.io/spekd/spekd` |
| **Domain** | issueforge.com (or similar) | spekd.com / spekd.dev |

### What Gets Added (New Requirements for Expanded Vision)

#### New Functional Requirements (Phase 0 — PLAN)

- **FR-P01:** Users can create a new project and associate it with one or more GitHub repositories.
- **FR-P02:** Users can start a guided planning session within a project.
- **FR-P03:** Users can select a planning method (BMAD, Lean Canvas, Custom) before starting a planning session.
- **FR-P04:** The system recommends a planning method based on the user's project intake responses.
- **FR-P05:** Planning sessions are conversational — the AI asks questions one at a time and the user responds.
- **FR-P06:** Each planning session produces one or more structured artifacts (PRD, architecture doc, etc.).
- **FR-P07:** Users can review and edit planning artifacts after generation.
- **FR-P08:** Users can save and resume planning sessions across multiple sittings.
- **FR-P09:** Users can export planning artifacts as Markdown or PDF.
- **FR-P10:** Users can flow directly from Phase 0 output (epics/stories) into Phase 1 issue creation.
- **FR-P11:** Planning artifacts are stored per-project and accessible to all project members (future: team sharing).
- **FR-P12:** The system supports pluggable planning methods via the Planning Method Adapter interface.

#### New Functional Requirements (Phase 2 — BUILD)

- **FR-B01:** Users can view a rich context page for any issue that includes related planning artifacts, code index, and sibling issues.
- **FR-B02:** Users can generate a context bundle for any issue, packaging all relevant context for implementation.
- **FR-B03:** Users can dispatch a context bundle to a connected build agent (AI coding tool or webhook endpoint).
- **FR-B04:** The system receives GitHub webhooks for PR creation, review, merge, and deployment events.
- **FR-B05:** The system updates issue status (In Progress, In Review, Done, Deployed) based on GitHub events.
- **FR-B06:** Users can generate a PR description template from an issue's context.
- **FR-B07:** The build phase supports pluggable agent adapters for different AI coding tools.
- **FR-B08:** Users can track the implementation status of all issues in a project from a project dashboard.

#### New Data Model Requirements

- **FR-D01:** A Project entity exists as the top-level container for all Spekd data.
- **FR-D02:** Projects contain: planning sessions, planning artifacts, issues, repo associations, and build state.
- **FR-D03:** Planning sessions store the full conversation history and are associated with a planning method.
- **FR-D04:** Planning artifacts are stored as structured markdown with typed frontmatter.

### Architecture Impact

The existing architecture accommodates the expansion well, but needs these additions:

| New Component | Location | Purpose |
|---|---|---|
| `src/lib/planning/` | Service layer | Planning method resolution, session management, artifact storage |
| `src/lib/planning/methods/` | Adapters | Individual planning method adapters (BMAD, Lean Canvas, etc.) |
| `src/lib/build/` | Service layer | Context bundle generation, agent dispatch, webhook handling |
| `src/lib/build/agents/` | Adapters | Individual build agent adapters |
| `src/app/(app)/projects/` | Routes | Project management UI |
| `src/app/(app)/projects/[projectId]/plan/` | Routes | Planning session UI |
| `src/app/(app)/projects/[projectId]/build/` | Routes | Build status UI |
| `src/app/api/webhooks/github/` | Route handler | Incoming GitHub webhooks for Phase 2 |

**Database additions:**

```
projects (id, userId, name, description, createdAt, updatedAt)
project_repos (projectId, repoId)  -- many-to-many
planning_sessions (id, projectId, methodId, status, conversationHistory, createdAt)
planning_artifacts (id, projectId, sessionId, type, name, content, createdAt)
build_dispatches (id, issueId, agentType, contextBundleHash, status, prUrl, createdAt)
```

---

## 8. MVP Phasing & Build Sequence

### The Build Order

The principle is: **design the full vision, build Phase 1 first, add Phase 0 and Phase 2 as fast-follows.**

#### Phase 1 (CREATE) — Ship First (Existing IssueForge MVP)

**Timeline:** Current development — this is what's already designed and broken into epics.

**What ships:**
- All 9 existing epics (Foundation, Onboarding, Repo Management, AI Clarification, AI Generation, Review & Submit, Issue History, Landing Page, Error Handling)
- Rebranded from IssueForge to Spekd (name, domain, CSS, components, docker images)
- The "Project" container is introduced at this stage, but in MVP it's a thin wrapper — one project = one repo for most users
- Landing page communicates the full Spekd vision (Plan → Create → Build) but only Create is functional

**What changes from current IssueForge epics for the rebrand:**
1. All `issueforge` references → `spekd` (component folder, docker image, CSS classes, meta tags, landing page copy)
2. Landing page copy shifts from "issue creation tool" to "product lifecycle platform" with a teaser for Plan and Build phases
3. The navigation structure adds a "Projects" level above repos, but for MVP it's simplified — creating a project is implicit when you connect your first repo
4. The data model adds the `projects` table but existing Phase 1 functionality creates one silently

**Key milestone:** A user can sign in, connect a repo, describe an issue, answer AI questions, and submit to GitHub — all under the Spekd brand.

---

#### Phase 0 (PLAN) — Second Release

**Timeline:** 4–8 weeks after Phase 1 launch, depending on user feedback and team capacity.

**Why second:** Phase 0 requires more AI prompt engineering work (planning conversations are longer and more complex than 3-question clarification loops), and the planning method adapter system needs careful design. But Phase 0 is what differentiates Spekd from every other AI issue tool — it's the strategic moat.

**What ships (Phase 0 MVP):**
- Project creation with a "Start Planning" CTA
- BMAD as the single available planning method (no method selection UI yet — BMAD is the default)
- 4 planning sessions: Discovery → Requirements → Architecture → Epics
- Artifact generation and storage for each session
- Artifact review and edit
- Phase 0 → Phase 1 handoff: "Create issues from your plan" flow
- Export artifacts as Markdown

**What's deferred to Phase 0.1:**
- Multiple planning methods (Lean Canvas, Custom)
- Method selection UI with recommendations
- Save & resume for planning sessions (MVP: complete a session in one sitting)
- Team sharing of planning artifacts

**Technical work required:**
1. Planning method adapter interface (design it for extensibility, implement only BMAD)
2. `src/lib/planning/` service layer
3. Planning session UI (conversational, one question at a time)
4. Artifact storage and rendering
5. Phase 0 → Phase 1 transition flow
6. New database tables: `planning_sessions`, `planning_artifacts`

---

#### Phase 2 (BUILD) — Third Release

**Timeline:** 8–16 weeks after Phase 1 launch.

**Why third:** Phase 2 depends on external integrations (GitHub webhooks, AI agent APIs) that are still maturing. It also depends on having well-structured issues (from Phase 1) and planning context (from Phase 0) to demonstrate its value. Phase 2 is also the most technically complex — webhook handling, context bundle packaging, agent dispatch, and status tracking.

**What ships (Phase 2 MVP):**
- Rich issue context page (planning artifacts + code index + related issues)
- Context bundle generation (Markdown export of full context for manual use)
- GitHub webhook integration for PR → issue linking
- Issue status tracking (Open → In Progress → In Review → Done)
- PR description template generation
- Manual "copy context for AI agent" flow (not automated dispatch)

**What's deferred to Phase 2.1:**
- Automated agent dispatch (Copilot Workspace, Cursor deep links, Claude Code API)
- Agent adapter system
- Deployment tracking
- Project dashboard with build progress

**Technical work required:**
1. `src/lib/build/` service layer
2. Context bundle format and generation
3. GitHub webhook endpoint and event processing
4. Issue status state machine
5. Rich issue context UI
6. New database tables: `build_dispatches` (or simplified tracking table)

---

### The Overall Timeline

```
Month 1-2:  Phase 1 (CREATE) — Core Spekd launch
            ├─ Rebrand from IssueForge
            ├─ All 9 epics shipped
            └─ Landing page communicates full vision

Month 3-4:  Phase 0 (PLAN) — BMAD planning
            ├─ Guided planning sessions
            ├─ Artifact generation
            └─ Phase 0 → Phase 1 handoff

Month 4-6:  Phase 2 (BUILD) — Context bundles + tracking
            ├─ Rich issue context
            ├─ GitHub webhook integration
            └─ Manual AI agent context export

Month 6+:   Platform expansion
            ├─ Multiple planning methods
            ├─ Automated agent dispatch
            ├─ Team collaboration
            └─ Analytics & insights
```

---

## Appendix A: Open Questions for ChiaLung

These emerged during the brainstorm and need your input:

1. **Pricing model for Spekd vs IssueForge:** Does the expanded vision change the pricing strategy? Phase 0 (PLAN) is high-value for non-technical users — is it a premium feature? Does Phase 2 (BUILD) have its own pricing tier?

2. **BMAD licensing/attribution:** BMAD is an existing methodology. Are there licensing considerations for productizing it? Do we need to attribute or get permission?

3. **Project vs Repo as primary container:** In the current IssueForge design, repos are the primary container. In Spekd, projects are. How aggressive should the MVP migration be? Should Phase 1 ship with explicit "Projects" or keep the repo-centric model and add projects when Phase 0 launches?

4. **Team features timing:** The current PRD defers team features to post-MVP (Priya's journey). With Spekd's expanded scope, team features become more important (sharing planning artifacts, project membership). Should this be prioritized alongside Phase 0?

5. **Brand identity:** Does "Spekd" have a visual identity direction yet? Colour palette, logo, typeface? The existing Forge Blue (`#5B6CF0`) may or may not carry over. 

6. **Self-hosting scope:** Does the expanded vision (Phase 0 + Phase 2) apply to self-hosted deployments? Or is the self-hosted version Phase 1 only, with Phase 0/2 as cloud-only premium features?

7. **Mobile-first for Phase 0?** The existing UX spec says desktop-first. But Maya (the founder persona) might brainstorm her product idea on her phone during a commute. Is Phase 0's planning experience mobile-optimized or desktop-only?

8. **AI model flexibility for planning:** Phase 1 uses BYOK (bring your own API key). Does Phase 0 use the same model? Planning conversations are longer and more nuanced — should Spekd recommend specific models for planning vs. issue creation?

---

## Appendix B: Naming & Terminology Reference

| Old Term (IssueForge) | New Term (Spekd) | Notes |
|---|---|---|
| IssueForge | Spekd | Product name |
| Issue creation | Phase 1: CREATE | Core flow preserved |
| (none) | Phase 0: PLAN | New |
| (none) | Phase 2: BUILD | New |
| (none) | Project | Top-level container for all phases |
| (none) | Planning Method | Pluggable system (BMAD, Lean Canvas, Custom) |
| (none) | Planning Session | One guided conversation within Phase 0 |
| (none) | Artifact | Produced document (PRD, Architecture, etc.) |
| (none) | Context Bundle | Packaged context for Phase 2 build agents |
| Repo scan / Code index | Repo scan / Code index | Unchanged |
| Clarification loop | Clarification loop | Unchanged |
| BYOK | BYOK | Unchanged |
| AI-assisted badge | AI-assisted badge | Unchanged — or rebrand to "Spekd by AI" |

---

*End of brainstorm document. This is a working document for discussion — not a final PRD. The next step is to review these ideas with ChiaLung, resolve the open questions, and determine which elements to incorporate into the updated Spekd PRD.*
