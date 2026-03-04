---
title: "Expose your design system to LLMs"
source: "https://hvpandya.com/llm-design-systems"
publishedDate: "2026-03-03"
category: "design"
feedName: "Sidebar"
---

LLMs drift, fabricate tokens, and start every session from scratch. Here's how to feed your design system to AI coding agents so they stop guessing.

AI experiments

##### Contents

1.  [TL;DR](#tldr)
2.  [LLMs don't think in design systems](#llms-dont-think-in-design-systems)
3.  [Making your design system LLM-readable](#making-your-design-system-llm-readable)
4.  [The setup](#the-setup)
5.  [We tried this with Atlassian's design system](#we-tried-this-with-atlassians-design-system)
6.  [Why this matters for large prototypes](#why-this-matters-for-large-prototypes)
7.  [FAQs](#faqs)

* * *

## TL;DR

Your design system already exists as code: component libraries, token files, Figma variables. The problem is that LLMs can’t use it properly when vibe coding. They fabricate token names, drift on values within a session, lose all context between sessions, and never notice when the upstream library ships breaking changes.

The method described here restructures your design system into a format LLMs can reliably consume: structured spec files, a closed token layer, and automated auditing that catches every violation.

**Result: your 10th AI session produces the same visual quality as your 1st.**

## LLMs don’t think in design systems

You’re vibe coding a prototype. You describe a component, the AI builds it, it looks good. You describe another one, that looks good too. By the end of the session, you’ve got 15 components and a layout that feels professional. Great first day.

Here’s what actually happened under the surface.

The AI made somewhere between 200 and 300 visual micro-decisions during that session:

-   What padding to use on this card
-   What shade of blue for that link
-   What border radius on this button
-   How much spacing between a heading and a paragraph
-   What font weight for that label
-   Whether to use 12px or 16px for secondary text

Each of those decisions looked fine in isolation:

-   Card padding was 16px in one component and 12px in another
-   Link color was `#2563EB` in the nav but `#1D4ED8` in the content area
-   One button has a 6px border radius, another has 8px

Why would you notice? Each individual choice was reasonable.

But 200 reasonable guesses don’t add up to a consistent design. They add up to a prototype that feels slightly off without you being able to say exactly why.

### It gets worse across multiple vibe coding sessions

You come back the next day. New AI session. The AI has **zero memory** of yesterday’s decisions. It doesn’t know it picked `#2563EB` for links, or 16px for card padding, or 8px for border radius. It starts guessing again. Different guesses this time.

Now you’ve got two layers of inconsistency: yesterday’s 200 guesses and today’s 200 different guesses, sitting side by side in the same prototype.

By session five, your prototype feels “off” but you can’t pinpoint why. By session ten, it looks like three different products built by three different teams who never talked to each other.

### Three LLM limitations that cause this

**1\. They fabricate values.** LLMs don’t look up your design system tokens. They generate plausible-looking ones. If your system uses `--space-200` for 8px, the LLM might write `padding: 12px` because 12px is a reasonable number. It’s not wrong per se. It’s just not yours.

**2\. They have no cross-session memory.** Every new session starts from zero context. The LLM doesn’t know it used `#2563EB` for links yesterday. It picks a new blue today. By session five you have three different blues in the same prototype, all of them “fine.”

**3\. They can’t read design intent from source code.** Point an LLM at a component library like [Atlaskit](https://atlassian.design/) and it sees APIs: import `Button`, pass `appearance="primary"`, done. What it can’t extract from source code:

-   When to pick one component over another
-   What spacing to use between them
-   How to compose them into layouts that follow your conventions

That knowledge lives in designers’ heads. LLMs need it written down in a format they can consume at the start of every session.

## Making your design system LLM-readable

The approach has three layers: spec files the LLM reads, a token layer it picks from, and an audit that catches what it gets wrong.

Instead of the LLM deciding “what blue should this link be?”, it reads a spec file and finds `var(--color-link)`. Instead of fabricating a spacing value, it reads the token reference and finds `var(--space-200)`. The design decision was already made by a human. The LLM just looks it up.

Think of it like **Infrastructure as Code**. Before IaC, every server was configured by hand and no two were quite the same. IaC made server configuration reproducible and auditable. This does the same for design decisions: makes them machine-readable so LLMs stop guessing.

Traditional methodOne-time styleguide → drift

Designer creates styleguide

AI reads it once

Guesses on gaps

Drifts each session

Inconsistent output

LLM-readable methodContinuous spec → audit → enforce

Spec DS local to repo

AI reads specs

Uses tokens

Mandated audit looks for drift

Consistent output

update specs with regular source sync

Four parts, each targeting a specific LLM limitation:

**1\. Spec files the LLM reads every session.** Solves the memory problem. Your spacing rules, color choices, and component usage guidelines go into structured markdown files. The LLM reads them at session start. No spec file means the LLM guesses. A spec file means it looks up.

**2\. A closed token layer the LLM picks from.** Solves the fabrication problem. Instead of `padding: 16px` scattered across 30 files, you create `var(--space-200)` and use it everywhere. The LLM picks from a closed set of named variables instead of inventing plausible values.

**3\. An audit script that catches what the LLM gets wrong.** Solves the drift problem. It scans CSS files and flags every raw value with the correct token to use instead. If the LLM writes `color: #2563EB`, the script says “use `var(--color-link)`.” Runs in CI. Zero violations required.

**4\. Drift detection for upstream design system updates.** Solves the stale-priors problem. When your design system library ships updates, a sync routine flags which spec files need updating. The LLM always reads current specs, not ones written against a version from three months ago.

## The setup

Everything above (the spec files, the token layer, the audit script, the drift detection) can be implemented with a single prompt.

Paste this into Claude Code (or any AI coding agent) at the root of your project:

Audit this project and make the design system LLM-readable.

Step 1: Audit
Scan every CSS/SCSS file. List every hardcoded visual value:
hex colors, rgb/rgba colors, pixel spacing, raw font sizes,
font weights, border radii, z-index values, box shadows,
and transition durations. Group them by category. Count totals.
Report which files have the most hardcoded values.

Step 2: Token layer
Create a tokens.css file with three layers:
- Layer 1: upstream design system tokens (use existing ones
  if the project already uses a design system, otherwise
  derive sensible primitives from the audit)
- Layer 2: project aliases that reference Layer 1 with
  fallbacks, e.g. --color-text: var(--ds-text, #292A2E)
- Layer 3 is the components themselves — they only ever
  reference Layer 2 aliases, never raw values

Include tokens for: colors (text, background, link, border,
interactive states), spacing (at least 8 steps), typography
(font families, sizes, weights, line heights), border radius,
elevation/shadow, z-index, and motion/transitions.

Step 3: Spec files
Create a specs/ directory. Write structured markdown specs:
- specs/foundations/ — color.md, spacing.md, typography.md,
  radius.md, elevation.md, motion.md
- specs/tokens/ — token-reference.md (master map of every
  CSS variable, its value, and when to use it)
- specs/components/ — one file per major component in the
  project. Each spec follows this template:
  1. Metadata (name, category, status)
  2. Overview (when to use, when not to use)
  3. Anatomy (parts of the component)
  4. Tokens used (which CSS variables it references)
  5. Props/API (if applicable)
  6. States (default, hover, active, focus, disabled, error)
  7. Code example
  8. Cross-references (related components)

Only spec components that actually exist in this project.

Step 4: Audit script
Create scripts/token-audit.js (or .sh) that:
- Scans all CSS files for hardcoded values
- Suggests the correct token for each violation
- Prints file, line number, violation, and suggestion
- Returns exit code 1 if any errors found (CI-ready)
- Distinguishes errors (hardcoded colors, spacing) from
  warnings (raw durations, uncommon values)

Step 5: Replace hardcoded values
Go through every CSS file and replace hardcoded values with
the tokens from Step 2. Every color:, background:, padding:,
margin:, gap:, border-radius:, font-size:, font-weight:,
box-shadow:, z-index:, and transition: should reference a
var(--token). No raw values should remain.

Step 6: Project instructions
Add a section to the project's AI instruction file (CLAUDE.md,
.cursorrules, or equivalent) that says:
"Before writing or modifying any UI code, read the relevant
spec file in specs/. Use only tokens from tokens.css. Run the
token audit script before committing. Zero errors required."

Run the audit script at the end and confirm zero violations.

Review the output, adjust token values to match your taste, and commit. What you’ll get back:

-   A `tokens.css` file with three-layer indirection
-   Foundation and component spec files for everything in your project
-   A token audit script that catches hardcoded values in CI
-   Every hardcoded CSS value replaced with the correct token
-   A project instruction file for every future AI session

### What the prompt does

Six steps, each producing something you’ll want to review.

### Step 1: Find every hardcoded value

The prompt scans every CSS file and counts hardcoded values: hex colors, pixel spacing, raw font sizes, border radii. That count becomes your baseline. If it finds hundreds of violations across dozens of files, you know how far things have drifted.

> **Tip:** Pay attention to the files with the most hardcoded values. Those are where the most guessing happened.

### Step 2: Create named tokens for every value

The prompt creates a `tokens.css` file with three layers of indirection.

First, upstream tokens from your design system land in prefixed variables:

```
--ds-text: #292A2E;
--ds-space-100: 8px;
--ds-radius-200: 8px;
```

Your project then aliases each one, with the raw value as a fallback:

```
--color-text: var(--ds-text, #292A2E);
--space-100: var(--ds-space-100, 8px);
--radius-200: var(--ds-radius-200, 8px);
```

Components only ever reference the alias, never the upstream token:

```
color: var(--color-text);
padding: var(--space-100);
border-radius: var(--radius-200);
```

The alias layer is what protects you. If the design system renames a token upstream, you update one alias. Dark mode, high contrast, any future theme: resolves automatically through the chain.

### Step 3: Write spec files for every component

The prompt generates structured markdown specs organized in tiers:

1.  **Foundations:** color, spacing, typography, radius, elevation, motion
2.  **Token reference:** the master map of every CSS variable
3.  **Atoms:** button, input, icon-button. Single purpose elements
4.  **Molecules and organisms:** composed components specific to your product
5.  **Patterns:** layout rules, content flow, spacing between elements
6.  **Cross references:** “Uses” and “Used by” links across all files

Each file follows a consistent 8-section template: metadata, overview, anatomy, tokens, props/API, states, code examples, and cross-references.

Review the foundation specs first. Color and spacing govern everything downstream; if those are right, the component specs follow.

> **Warning:** Check that it only documented components you actually use. A small, accurate spec layer beats a comprehensive but stale one.

### Step 4: Wire up audit scripts and AI instructions

The prompt wires up three things:

**A project instruction file** that requires spec consultation before any UI work. Gets read at the start of every AI session.

**A token audit script** that scans CSS files, finds hardcoded values, and suggests the correct token. Returns exit code 1 on errors so you can put it in CI.

Sample output:

```
Token Audit
Scanning 28 CSS file(s)...

src/components/Nav.css
  x L42: Hardcoded color #1868DB, use var(--color-link)
  x L78: Raw spacing 12px in padding, use var(--space-150)
  ! L96: Raw duration 0.2s, consider using --motion-* token

=== Summary ===
Files scanned:      28
Files with issues:  0
Errors:             0
Warnings:           0
```

**A design review checklist** covering hardcoded values, state coverage, component anatomy, spacing consistency, typography, motion, accessibility, and divergence documentation.

### Step 5: Replace every hardcoded value with a token

The prompt goes through every CSS file and replaces hardcoded values with the tokens it created. Every `color:`, `padding:`, `border-radius:`, `font-size:` flows through `var(--token)` now.

### Step 6: Detect upstream design system drift

The prompt sets up a sync routine that pins your design system package versions and detects drift. When the upstream library ships updates, it flags which spec files might need updating. Non-blocking: it reports findings but doesn’t auto-modify specs.

After initial setup, maintenance is minimal:

-   **New component?** Add a spec file before or while building it.
-   **Design system update?** The sync routine flags it. Update the affected docs.
-   **New pattern?** If a designer corrects the same thing in two PR reviews, it’s a pattern. Write it down.
-   **Token audit fails?** Fix the hardcoded value, not the audit script.

## We tried this with Atlassian’s design system

We ran this on a React + TypeScript + Vite project using [Atlaskit](https://atlassian.design/) (Atlassian’s public design system). The method works with any component library.

### 64 spec files across 3 tiers

Tier

Files

What it covers

Foundations + tokens

19

Color, typography, spacing, radius, elevation, motion, z-index, iconography, accessibility, and the master map of every CSS variable

Components (atoms, molecules, organisms)

38

Button, input, avatar, tabs, dropdown-menu, modal-dialog, form, table, navigation, content-panel

Patterns

7

Canvas-content-flow, three-column-layout, panel-expand-collapse, responsive-grid, form-layout

### The file hierarchy

The complete `specs/` directory:

your-project/
├── specs/
│   ├── foundations/                     # Tier 1: Visual primitives
│   │   ├── color.md
│   │   ├── typography.md
│   │   ├── spacing.md
│   │   ├── radius.md
│   │   ├── elevation.md
│   │   ├── motion.md
│   │   ├── z-index.md
│   │   ├── iconography.md
│   │   ├── accessibility.md
│   │   ├── breakpoints.md
│   │   ├── grid.md
│   │   ├── borders.md
│   │   └── opacity.md
│   │
│   ├── tokens/                         # Tier 1: CSS variable reference
│   │   ├── token-reference.md
│   │   ├── color-tokens.md
│   │   ├── spacing-tokens.md
│   │   ├── typography-tokens.md
│   │   ├── elevation-tokens.md
│   │   └── motion-tokens.md
│   │
│   ├── atoms/                          # Tier 2: Components
│   │   ├── button.md
│   │   ├── icon-button.md
│   │   ├── input.md
│   │   ├── textarea.md
│   │   ├── checkbox.md
│   │   ├── radio.md
│   │   ├── toggle.md
│   │   ├── avatar.md
│   │   ├── badge.md
│   │   ├── lozenge.md
│   │   ├── tag.md
│   │   ├── spinner.md
│   │   └── link.md
│   │
│   ├── molecules/                      # Tier 2: Composed components
│   │   ├── tabs.md
│   │   ├── breadcrumbs.md
│   │   ├── dropdown-menu.md
│   │   ├── modal-dialog.md
│   │   ├── banner.md
│   │   ├── flag.md
│   │   ├── inline-message.md
│   │   ├── tooltip.md
│   │   ├── form.md
│   │   ├── select.md
│   │   ├── date-picker.md
│   │   ├── pagination.md
│   │   ├── inline-edit.md
│   │   ├── search.md
│   │   ├── popup.md
│   │   ├── progress-bar.md
│   │   ├── side-navigation.md
│   │   └── empty-state.md
│   │
│   ├── organisms/                      # Tier 2: Product-specific assemblies
│   │   ├── table.md
│   │   ├── navigation.md
│   │   ├── page-header.md
│   │   ├── content-panel.md
│   │   ├── chat-panel.md
│   │   ├── dashboard-card.md
│   │   └── work-item-header.md
│   │
│   └── patterns/                       # Tier 3: Layout & composition rules
│       ├── canvas-content-flow.md
│       ├── three-column-layout.md
│       ├── responsive-grid.md
│       ├── panel-expand-collapse.md
│       ├── form-layout.md
│       ├── list-detail.md
│       └── error-handling.md
│
├── tokens.css                          # ← Every CSS variable (3-layer indirection)
├── scripts/
│   └── token-audit.js                  # ← Catches hardcoded values in CI
└── CLAUDE.md                           # ← AI reads this at the start of every session

Each tier only references the tier above it:

1.  **Foundations + tokens** define the raw values and name them as CSS variables: what blues exist, what spacing steps exist, and what `--color-link` or `--space-200` resolves to
2.  **Components** (atoms, molecules, organisms) use those tokens to style elements. A button knows its padding token, its color token, and its radius token. A dropdown composes button, popup, and list items. A navigation bar assembles dropdown, breadcrumbs, and avatar
3.  **Patterns** describe how to arrange components on a page: three-column layout rules, spacing between content sections, how panels expand and collapse

When the AI builds a form, it reads `patterns/form-layout.md` for spacing rules, `molecules/form.md` for the form structure, `atoms/input.md` for the input component, and `tokens/spacing-tokens.md` for the exact values. Every decision is a lookup.

### Every visual value gets a name

After running the prompt, every hardcoded visual value in the project got replaced with a named CSS variable. The audit found 418 raw values scattered across 28 files. The prompt mapped all of them to 230+ tokens stored in `tokens.css`:

-   69 colors (backgrounds, text, borders, links, interactive states)
-   12 spacing values (padding, margin, gap, all on a 4px base grid)
-   8 font sizes (from caption to display)
-   7 radii (from subtle 2px to fully rounded)
-   8 z-index levels (dropdowns, modals, tooltips, toasts)

No file contains a raw hex color or a pixel value anymore. The AI can’t pick the wrong blue because there’s only `var(--color-link)`.

### Before and after

Scenario

Without legible DS

With legible DS

Link color

AI writes `#2563EB` in one component, `#1D4ED8` in another. Both look blue. Neither is “wrong.”

`var(--color-link)`. One blue. Every component. Every session.

Card padding

AI writes `12px` here, `16px` there, `14px` somewhere else. All “look fine.”

`var(--space-200)` or the audit script fails with a specific suggestion.

Dark mode

Hardcoded `#FFFFFF` breaks. Each component needs individual fixes.

Token chain resolves per theme automatically. Zero component changes.

New session

AI starts fresh. Different guesses. Two sessions’ worth of inconsistency.

AI reads the same specs. Same tokens. Same output quality.

Design review

Manual visual comparison. “Does this look right?” “I think so.”

Automated audit: 0 errors = ship. Non-zero = specific line numbers and fix suggestions.

## Why this matters for large prototypes

Vibe coded prototypes fall apart past a few sessions because LLMs compound their mistakes silently. Each session introduces new fabricated values, new inconsistencies, new drift from the source design system. By session ten the prototype looks like three different products.

A legible design system constrains the LLM at every point where it would otherwise guess. Specs give it memory across sessions. The token layer gives it a closed set of values instead of fabricating new ones. The audit catches anything that slips through. Drift detection keeps everything current with upstream.

**Your 10th session produces the same visual quality as your 1st.**

### Our results

Metric

Before

After

Hardcoded CSS values

418 across 28 files

0

Spec files

0

64 (3 tiers)

Design tokens mapped

Scattered, inconsistent

230+ with three layer indirection

Upstream packages tracked

Not tracked

39 with drift detection

AI output consistency

Variable, depends on session

Constrained: same spec, same tokens, same audit

The numbers matter less than what changed about how we work. We stopped reviewing LLM output for visual consistency because the constraints handle it. The LLM reads the spec, uses the token, and the audit catches anything it misses. Human taste goes in once. The LLM follows it mechanically from that point on.

## FAQs

#### _“Isn’t this just documentation?”_

Documentation tells you what exists. This also blocks what shouldn’t exist. The audit script returns exit code 1 if any hardcoded value appears in CSS. The project instruction file gates every UI change behind spec consultation. You can’t merge code that violates the token layer.

#### _“3 to 4 days of setup seems like a lot.”_

That’s the manual estimate. The [setup prompt](#the-setup) gets an AI agent through all six steps in one session. You review its output, adjust token values to your taste, and commit. Typical turnaround is a few hours.

#### _“Won’t the specs get stale?”_

Spec files live in the repo next to the code they govern, not in a wiki or a Figma comment. When a component changes in a PR, the spec file is right there in the same diff. The drift detection routine flags upstream design system updates that affect your specs.

#### _“Can’t the AI just read the source code?”_

It can read component APIs. It cannot read your opinions about when to use a modal vs. an inline message, what spacing convention you follow between sections, or how your three-column layout behaves at tablet breakpoints. Source code shows what was built. Specs describe how to build the next thing.

#### _“Our designers already know this stuff.”_

Unwritten knowledge doesn’t transfer to AI sessions, new hires, or contractors. It also doesn’t survive someone leaving the team. Spec files put that knowledge in version control where it gets read at the start of every AI session and every onboarding.

### Read more

### **[Brief Note on Portfolios](https://hvpandya.com/brief-note-on-portfolios)**Career

### **[How to Hire](https://hvpandya.com/how-to-hire)**Leadership

### **[Understanding Hype](https://hvpandya.com/hype)**Product

### **[Operational Dilution in Startups](https://hvpandya.com/operational-dilution-in-startups)**Leadership

### **[Superpower Your Job Search with LLMs](https://hvpandya.com/job-search-with-llms)**Career