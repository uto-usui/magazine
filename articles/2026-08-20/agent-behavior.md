---
title: "Agent behavior"
source: "https://www.agentbehavior.dev/"
publishedDate: "2026-08-19"
category: "design"
feedName: "Sidebar"
---

## Define what good agent behavior looks like

Agent behavior is a format for writing down the behavior you expect an AI agent to follow across many interactions. Each behavior spec is a Markdown file that lives in your repo and describes the recurring conduct that makes the agent reliable.

The spec captures that standard up front, so reviewers, rubrics, scorers, and evals have something concrete to measure against.

.agents/behaviors/

```
.agents/behaviors/
└── financial-work-verification/
    └── BEHAVIOR.md
```

### Written for review

Specs speak to the people and agents who read traces, design evals, and align prompts.

### Lives with your code

Behavior specs sit in .agents/behaviors/ next to the agent they describe, and version alongside it.

### Free-form by design

Describe behaviors in plain Markdown, with optional structure you can lean on when it helps.

## Create your first behavior spec

In this walkthrough, you'll create a behavior spec for cost-sensitive actions.

### Create the behavior

Create `.agents/behaviors/cost-sensitive-actions/BEHAVIOR.md` in your project using this structure:

.agents/behaviors/cost-sensitive-actions/BEHAVIOR.md

```
---
name: cost-sensitive-actions
description: Ensure the agent surfaces material costs, asks before expensive actions, and offers lower-cost alternatives when appropriate.
---

# Cost-sensitive actions

Describe when cost-sensitive behavior applies, what cost evidence the agent should gather, how it should make the tradeoff visible, and what it should avoid.
```

### Consider the recommended dimensions

The body is free-form Markdown, so choose the headings and labels that communicate the behavior clearly. These questions are strongly recommended authoring prompts when they add useful clarity:

1.  What evidence should the agent gather?
2.  What decision should the agent make from that evidence?
3.  What should the agent do after deciding?
4.  What should the agent do when evidence is incomplete or the first path fails?

For cost-sensitive actions:

-   **Evidence:** inspect or estimate cost, credits, infrastructure impact, and alternatives.
-   **Decision:** determine whether the action creates a material cost tradeoff.
-   **Execution:** surface the cost and ask before crossing meaningful thresholds.
-   **Recovery:** if cost is unknown, inspect more, ask for confirmation, or mark uncertainty.

You can answer these questions in ordinary prose, combine them, rename them, or omit ones that are trivial or redundant.

### Use it

You can use this behavior spec to:

-   review traces where the agent deployed infrastructure, called paid APIs, or chose expensive options
-   write eval cases that check whether the agent surfaced material costs
-   revise prompts or tools when traces show the behavior is missing
-   communicate intended agent conduct to teammates

## Capture the behaviors that matter across many traces

Add a behavior when it matters across many interactions or traces. A spec may cover one behavior or several related behaviors. Good candidates are behaviors that are:

### Frequent

They appear in a meaningful share of the agent's work.

### High-impact

Mistakes affect correctness, trust, safety, cost, or user experience.

### Agent-defining

They capture a design choice about what kind of agent this is.

### Ambiguous by default

Reasonable agents or prompt writers might behave differently unless the behavior is stated.

### Spread across context

Reviewers would otherwise need to read prompts, skills, tool docs, examples, traces, or evals to infer the behavior.

### Useful for debugging

Naming the behavior helps explain failures in real traces.

## A behavior spec sets the standard; other artifacts implement and test it

Artifact

Relationship

System prompts

Runtime instructions. They may include behavior commitments, but are written for model execution.

Skills

Task-specific procedures, references, scripts, or domain guidance. Behavior specs may say when and why to use skills, but should not duplicate them.

Tool docs

Available operations and API constraints. Behavior specs may state expectations around tool use, but should not become tool manuals.

Evals

Tests of whether behavior occurred. Behavior specs inform eval design but do not contain scorer implementation details.

Traces

Records of what the agent did. Behavior specs describe what the agent was expected to do.

### Behavior specs vs. `AGENTS.md`

Dimension

`AGENTS.md`

`BEHAVIOR.md`

Purpose

Tell the agent how to act

Define what counts as good behavior

Audience

The agent at runtime

Reviewers, eval authors, and agents reviewing traces

Optimized for

Prompt performance and correct next steps

Clear expectations and failure modes

Granularity

Operational and tool-aware

Durable behavior patterns

Changes when

The implementation changes

The behavioral standard changes

## The Agent behavior format

The format is intentionally small. This section is the normative reference. The key words MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY follow [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

### Terminology

-   **Agent behavior** is the name of this format.
-   A **behavior spec** consists of a `.agents/behaviors/<name>/BEHAVIOR.md` file and its directory. It can describe one or more behaviors.
-   A **behavior** is a recurring pattern of agent conduct.

### Directory structure

Behavior specs live under `.agents/behaviors/`. Each spec has its own directory containing a `BEHAVIOR.md` file:

.agents/behaviors/

```
.agents/behaviors/
└── behavior-name/
    ├── BEHAVIOR.md       # Required: metadata and behavior text
    ├── references/       # Optional: rationale, examples, background docs
    └── ...               # Optional additional files
```

The directory name is the behavior spec's stable identifier and MUST match the `name` field in `BEHAVIOR.md`.

### `BEHAVIOR.md` format

The canonical file name is `BEHAVIOR.md`. Clients MUST look for this exact name when discovering behavior specs and MAY also accept case variants. For portability, behavior specs SHOULD use `BEHAVIOR.md`. A `BEHAVIOR.md` file MUST contain YAML frontmatter followed by Markdown content.

#### Frontmatter

Field

Required

Constraints

`name`

Yes

Max 64 characters. Lowercase letters, numbers, and hyphens only. MUST NOT start or end with a hyphen. MUST match the parent directory name.

`description`

Yes

Max 1024 characters. Non-empty. Describes the behavior spec's scope and when it applies.

`license`

No

License name or reference to a bundled license file.

`metadata`

No

Key-value mapping for client-specific metadata.

Clients MUST ignore unknown frontmatter fields.

#### Complete examples

For complete specs in both free-form and template styles, browse the examples in the repository:

[cost-sensitive-actions](https://github.com/braintrustdata/agentbehavior/blob/main/examples/.agents/behaviors/cost-sensitive-actions/BEHAVIOR.md)[financial-work-verification](https://github.com/braintrustdata/agentbehavior/blob/main/examples/.agents/behaviors/financial-work-verification/BEHAVIOR.md)[primary-source-tax-research](https://github.com/braintrustdata/agentbehavior/blob/main/examples/.agents/behaviors/primary-source-tax-research/BEHAVIOR.md)[support-ticket-triage](https://github.com/braintrustdata/agentbehavior/blob/main/examples/.agents/behaviors/support-ticket-triage/BEHAVIOR.md)

### Body content

The Markdown body describes one or more behaviors. It SHOULD be written for people and agents who review traces, design evals, or align prompts. It is not primarily runtime prompt text.

The body is free-form Markdown. Authors can use any headings, labels, order, or prose structure that communicates the behaviors clearly. Clients MUST treat the organization as free-form content. A behavior describes recurring agent conduct and when it matters, not merely low-level rules or one-off procedures. A behavior body SHOULD:

-   name each recurring behavior clearly
-   describe when each behavior applies
-   describe desired conduct
-   describe undesired conduct or failure modes

A single `BEHAVIOR.md` MAY group behaviors that belong to the same agent, product surface, or behavioral domain and should be discovered and reviewed together. Give each behavior a clear heading or label. Use separate specs when behaviors need independent ownership, discovery, or reuse. For example, a spec named `loop` could provide an agent overview followed by sections such as `## Page-grounded assistance`, `## Evidence-backed answers`, and `## Bias to action`. Each section describes a separate behavior but shares the file's frontmatter.

### Recommended behavior dimensions

Authors are strongly encouraged to consider these dimensions for each substantive behavior. They make specs easier to review and translate into evals:

### Intent

Why the behavior matters and when it applies.

### Evidence

What the agent SHOULD inspect, retrieve, preserve, or verify before deciding.

### Decision

What the agent SHOULD infer, choose, or become confident about.

### Execution

What the agent SHOULD do after deciding.

### Recovery

What the agent SHOULD do when the first path fails, evidence is incomplete, or the request is ambiguous.

### Failure modes

What bad or unintended behavior the spec is meant to prevent.

These dimensions are flexible guidance. They MAY appear in prose or be combined, renamed, reordered, or omitted when trivial or redundant. When these dimensions apply, evidence is the input to a decision, the decision is the conclusion, execution is the visible action, and recovery is what happens when the first path fails.

#### Optional structured template

BEHAVIOR.md

```
# Behavior name

**Intent:** Why this behavior matters and when it applies.

**Evidence:** What the agent SHOULD inspect, retrieve, preserve, or verify before deciding.

**Decision:** What the agent SHOULD infer, choose, or become confident about.

**Execution:** What the agent SHOULD do after deciding.

**Recovery:** What the agent SHOULD do when the first path fails, evidence is incomplete, or the request is ambiguous.

**Failure modes:** What bad or unintended behavior this spec is meant to prevent.
```

This template is one way to organize a behavior.

### Optional directories

A `references/` directory can hold supporting material for reviewers and eval authors:

-   rationale documents
-   example traces
-   background docs
-   domain-specific context

### Discovery and use

Tools that support Agent behavior SHOULD scan `.agents/behaviors/` for subdirectories containing `BEHAVIOR.md` or a supported case variant. At minimum, a discovered behavior spec record contains:

Field

Description

`name`

Stable behavior spec identifier from frontmatter

`description`

Short description of the spec's scope from frontmatter

`location`

Absolute or project-relative path to `BEHAVIOR.md`

Unlike skills, behaviors are not primarily loaded to help a model complete its next task. Clients SHOULD not inject all behavior specs into runtime prompts unless intentionally building a behavior-conditioned agent. Behavior specs are usually loaded when:

-   reviewing traces
-   designing or updating evals
-   auditing prompts, skills, or tools
-   debugging behavior regressions
-   generating documentation about expected agent conduct

### Validation

Validation has two layers: structural validity, which tools can check, and quality, which requires human or model judgment.

#### Structural validity

A structurally valid behavior directory:

-   is a directory under `.agents/behaviors/`
-   contains `BEHAVIOR.md` or a client-supported case variant
-   has YAML frontmatter delimited by `---`
-   has frontmatter that parses as a YAML mapping
-   includes a non-empty `name` field
-   uses a `name` that is at most 64 characters
-   uses a `name` containing only lowercase letters, numbers, and hyphens
-   uses a `name` that does not start or end with a hyphen
-   uses a `name` that matches the parent directory
-   includes a non-empty `description` field
-   uses a `description` that is at most 1024 characters
-   if present, uses `metadata` as a key-value mapping

Clients SHOULD skip structurally invalid specs and surface a diagnostic rather than load partial or ambiguous content.

#### Quality criteria

A useful behavior spec SHOULD:

-   clearly distinguish the recurring behavior or behaviors it covers
-   describe when each behavior applies
-   describe desired conduct
-   describe undesired conduct or failure modes
-   give a reviewer enough context to assess the behavior in a trace

Authors SHOULD use the recommended dimensions when they add clarity. Structural validation applies only to the directory and frontmatter requirements; body organization remains free-form, including for specs that group multiple behaviors.