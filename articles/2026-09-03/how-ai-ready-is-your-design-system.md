---
title: "How AI-ready is your design system?"
source: "https://christophhellmuth.com/open-design-system-bench/"
publishedDate: "2026-09-02"
category: "design"
feedName: "Sidebar"
---

open-design-system-bench

## How AI-ready is your design system? Now you can measure it.

Every design system team is having the same conversation right now, and nobody can back it with numbers. We built the eval, ran it against four real systems, and published the harness.

[Get on GitHub](https://github.com/christophhdesign/open-design-system-bench)

![A grid of compass needles on a dark field. On the left they follow one current; on the right they drift into their own directions.](https://christophhellmuth.com/open-design-system-bench/visuals/hero-field.svg)

4systems audited

898graded generations

52-63composite range

0AI-native yet

## Why this exists

Every design system team is having the same conversation right now: developers are generating UI with coding agents, and nobody can say with a straight face whether the output actually follows the system. Anecdotes go both ways. There is no dashboard for this.

If that output ignores the design system, brand drift, accessibility gaps, and rework show up across every feature team. Docs, AGENTS.md files, MCP servers, and skills have been hard to justify because there was nothing to measure them against.

We built open-design-system-bench because we were stuck in that conversation. It is an open benchmark for one question: when an AI agent builds UI against your component library, does it use your system correctly, and how much does each layer of guidance you write actually help?

It started at Nord Security against Aurora, its production design system, and is now generalized for any React and TypeScript component library. Every number is tool-derived and re-runnable. No telemetry.

## What it is

### Two tools in one repo

The audit runs in seconds, needs no API key, and costs nothing. Seven static checks score the things agents depend on: is there an AGENTS.md, can the component catalog be extracted and how well documented it is, is every public component actually reachable from the package entry point, do your names match what models expect, are your tokens machine-readable, can an agent read your deprecations, are your docs greppable text or a JS-rendered site. You get an AI-Readiness Score and a tier: Emerging, Invested, or AI-native.

The benchmark runs real coding agents against your real components. The prompts describe a user need and never name the expected component. A headless agent works in an isolated workspace, and the output is graded on six dimensions: imports, API fidelity, token discipline, static accessibility, compilation, and an LLM-judged rubric for the calls no parser can make. The headline is a matrix of system by context level by model, so you can see what adding an AGENTS.md or a skill bundle is actually worth.

### What a task looks like

Task prompts are intent-level and never name the expected component. A linter enforces that against each system's extracted catalog, and it earns its keep: it caught prompts leaking the words Switch, Section, and Header, which are real component names in these catalogs. The agent sees the prompt. The grader sees everything else.

```
# tasks/confirm-account-deletion.yaml
id: confirm-account-deletion
title: Confirmation before account deletion
prompt: >-
  In the account settings screen, users can delete their account. Deletion is
  permanent. Add a step that makes sure users don't delete their account by
  accident, following our design system.
rubrics:
  - id: uses-confirmation-pattern
    text: >-
      Reaches for the design system's confirmation dialog pattern rather than
      a generic overlay, browser confirm(), or inline warning
    weight: 0.4
    critical: true
  - id: destructive-not-default
    text: >-
      The destructive action is visually distinct (destructive emphasis) and
      is NOT the default-focused or visually primary action
    weight: 0.35
  - id: easy-backout
    text: >-
      The user can easily back out, and the copy states the permanent
      consequence plainly
    weight: 0.25

# Optional, and omitted by all ten starter tasks: the expected component,
# recorded per system and never shown to the generating agent.
hiddenExpectations:
  componentsAnyOf: { reactkit: [Modal], appkit: [Modal] }
```

One of the ten domain-neutral starter tasks, in full. The prompt describes a user need and a constraint; nothing in it names a component, a prop, or a pattern. The rubrics are what the judge scores against, and the weights and the `critical` flag are the task author's, not the model's.

### How one cell runs

A cell is one task, one system, one context level, one model. Generations run in isolated fixture workspaces against the published packages, so the only thing that comes back is a diff. Single-shot API cells and agentic CLI cells are never ranked against each other: agentic cells cost roughly 80x more and see compiler feedback.

One benchmark cell. The diff is graded twice: mechanically against ground truth extracted from the kit's own source, and by a judge that sees only the task's rubrics. Both feed the weighted score and the worst-case gate. The component and token counts are Aurora's two kits, from the committed snapshots the harness extracted.

### Grade the worst dimension, not the average

One early lesson shaped the scoring model. Identical average scores hide opposite failures. One generation uses your system heavily and gets the API subtly wrong. Another avoids your system entirely, hand-rolls everything, and passes every API check by never touching the API. A third builds something impressive that does not compile. Averages treat these as equal. So the gate is the worst dimension, and "ignored the design system" is a first-class metric. A model that never touches your system passes every API check, and for a design system team that is the worst of the three.

## What it found

We pointed open-design-system-bench at four real design systems: Aurora, the production design system at Nord Security where the harness started, plus three widely used open-source design systems, anonymized here as System A, System B, and System C. The five findings below are what the static audit and the generation benchmark turned up in that code.

### Finding 1: every system it touched had a real bug

The extraction step never trusts a hand-written component list. It computes the public API from source: the root barrel union the package.json exports map. That single rule has found shipped defects in every production system audited so far:

-   Three components in one production kit (a Toggle among them) had proper per-directory entry points but were never re-exported. Teams believed they were public. Consumers could not import them.
-   A second production kit had an entire component directory unreachable via either the barrel or the exports map, and a changelog whose version headings no parser could read. Agents migrate what they can read, and no agent could read this one.

None of these were known before the audit ran. All were fixed after.

![Compass needles fanning toward a magnetic pole: the public API, computed from source.](https://christophhellmuth.com/open-design-system-bench/visuals/field-003-pole-plain.svg)

### Finding 2: nobody is AI-native yet

The AI-Readiness Score assembles seven static checks into a 0 to 100 composite with three tiers: Emerging (below 40), Invested (40 to 70), and AI-native (70 and up). The first four-system distribution:

### AI-Readiness composite, by system

static audit basis (surface only) · 2026-08-25

Invested 40 AI-native 70 Aurora System A System B System C 63.4 60.0 56.2 52.2 0 20 40 60 80 100

Nobody is AI-native yet, including teams with far more docs headcount than we have, because making a design system legible to machines is still new work.

System

Composite

Tier

Standout strengths

Standout gaps

**Aurora**

63.4

Invested

machine-readable catalog, agent docs, export hygiene

**System A**

60.0

Invested

Code Connect files, MCP workspace, editor rules

no AGENTS.md, tokens in a separate package

**System B**

56.2

Invested

best vocabulary alignment measured (97.2), 968 documented props

zero agent enablement files

**System C**

52.2

Invested

strong vocabulary (85.8), AGENTS.md present

no root changelog, Sass-only tokens

Aurora's 63.4 is the average of its two component kits (63.4 = mean of 59.3 and 67.5); the kit-level split is folded in here since the score chart and the rest of this page treat Aurora as a single system. Every system lands in the middle tier. The teams with the most docs capacity have not crossed 70. The remaining work is making the system parseable by a machine consumer, which is a different job from writing more pages for humans.

### Finding 3: the failure modes are not what the average shows

Across 898 graded generations (6 model configurations, across Aurora's two component kits), three failure shapes kept appearing, and they can produce identical average scores:

-   **Engage and err:** uses the system heavily, gets APIs subtly wrong.
-   **Avoid the system:** hand-rolls everything; passes every API check by never touching the API. It looks like the safe result, and for a system team it is the worst one.
-   **Architect and collapse:** ambitious structure, does not compile.

That is why the benchmark gates on the worst dimension and treats "ignored the design system" as a first-class metric. A single blended score would paper over those three shapes.

### Finding 4: models arrive with a vocabulary, and it is not yours

The convention lexicon in the repo is empirical: it is the names AI models invented across those 898 generations when they guessed instead of reading. Models expect Switch, Box, TextField, spacing, as. Systems whose names sit close to that prior get compliance without extra enablement; systems with idiosyncratic vocabulary pay a hallucination tax on every generation. The closest alignment we measured (97.2) belonged to one of the open-source systems. That number costs no infrastructure, and it is one of the few advantages you can have before you write a single AGENTS.md.

![Short dashes in a swirling flow field: no single direction, a competing guess rather than one current.](https://christophhellmuth.com/open-design-system-bench/visuals/field-002-drift-plain.svg)

The rest of the failures cluster just as predictably. Models can only follow deprecations they can read. And no amount of prompt engineering helps if a component is not exported. Those gaps close when you treat the design system as an API surface for a new kind of consumer and measure it that way. Writing more documentation pages leaves the exports, the names, and the changelog untouched.

### Finding 5: the tool's own assumptions did not survive contact either

An honest one: the day we pointed the extractor at the three open-source systems, three of its own assumptions broke. It assumed barrels use `export * from`, but two of them re-export by name (87 of 88 barrel statements in one case). It assumed barrel targets are plain re-export files, but one system's barrel points straight at JSX implementation files. It assumed directory indexes are `index.ts`, but a third of that system's are `index.tsx`. A third system initially extracted zero components; after fixing the walkers it extracts 115 with 968 documented props.

The extractor had to change because design systems differ in the mechanical details that machine consumers depend on. Those differences only show up when you point a tool at the source.

![Arrows orbiting a single well: a competing attractor the extractor did not account for.](https://christophhellmuth.com/open-design-system-bench/visuals/field-007-vortex-plain.svg)

### Beyond the audit: what the agents actually did

Everything above this point is the static audit. The two charts below come from a separate behavioral run against Aurora's two kits, with five model configurations at three guidance levels. They are the first numbers on this page that come from watching agents work rather than from reading a repo, and they are Aurora-only: the equivalent runs against the three open-source systems are the next data drop, so no cross-system behavioral comparison exists yet.

#### Failure modes by model

Share of graded cells, per model. "Ignored Aurora" means the generated code imported no design-system component at all. "Hallucinated a component" means it imported a name that does not exist in the extracted catalog. The three measures are independent, so they do not sum to 100%.

-   DeepSeek Flash
-   DeepSeek V4 Pro
-   GPT 5.6 Luna
-   GPT 5.6 Terra
-   Sonnet 5 (single-shot)

0% 25% 50% 75% 100% 7% 4% 55% 63% 9% Ignored Aurora entirely 31% 31% 0% 0% 36% Hallucinated a component 29% 26% 83% 94% 11% Compiled cleanly

Data table

Model

Ignored Aurora

Hallucinated a component

Compiled

DeepSeek Flash

7%

31%

29%

DeepSeek V4 Pro

4%

31%

26%

GPT 5.6 Luna

55%

0%

83%

GPT 5.6 Terra

63%

0%

94%

Sonnet 5 (single-shot)

9%

36%

11%

The two ends of this chart are the same argument the worst-dimension gate exists to make. On the left, engagement without accuracy: the DeepSeek models and single-shot Sonnet reach for Aurora and get names wrong a third of the time. On the right, accuracy through avoidance: the GPT configurations compile 83% and 94% of the time and hallucinate nothing, because they ignored the design system in 55% and 63% of cells. A blended score would call the right-hand pair the winners.

#### Mean score by guidance level

Each model ran at three context levels: nothing at all, the kit instruction files, and the instruction files plus skills and the generated component catalog. This is the chart the whole benchmark exists to produce.

-   DeepSeek Flash
-   DeepSeek V4 Pro
-   GPT 5.6 Luna
-   GPT 5.6 Terra
-   Sonnet 5 (single-shot)

0 25 50 75 100 58.9 58.7 69.0 66.5 51.2 No guidance 79.2 80.2 74.6 76.0 70.3 Instruction files 82.0 84.8 75.3 78.0 75.3 Files + skills + catalog

Data table

Model

No guidance

Instruction files

Files + skills + catalog

Total lift

DeepSeek Flash

58.9

79.2

82.0

+23.1

DeepSeek V4 Pro

58.7

80.2

84.8

+26.1

GPT 5.6 Luna

69.0

74.6

75.3

+6.3

GPT 5.6 Terra

66.5

76.0

78.0

+11.5

Sonnet 5 (single-shot)

51.2

70.3

75.3

+24.1

Aurora's documentation lifts the two DeepSeek models by 23.1 and 26.1 points and single-shot Sonnet by 24.1. It moves GPT 5.6 Luna by 6.3 and Terra by 11.5, and Terra's entire gain comes from one of the two kits.

Two things are worth sitting with. The model that looks best with no help at all, GPT 5.6 Luna at 69.0, ends up tied for last once guidance is in play, because it barely responds to guidance. And the gap between the two documentation levels is small next to the gap between no documentation and any documentation: getting instruction files in front of an agent is the step that matters, and refining them is a second-order gain. That is the Lift number a budget conversation needs, and it is why the benchmark reports a delta rather than a level.

## Run it on your system

What a team does with this, in order:

1.  Run the audit (seconds, free). Fix the fails: they are usually export hygiene and deprecation legibility, and they are real bugs.
2.  Ship the cheap wins: AGENTS.md, machine-readable changelog, committed token file, llms.txt.
3.  Run the benchmark before and after. The delta between bare and guided contexts (Lift) is the number that holds up in a budget conversation: tool-derived, reproducible, and not a survey.

### The 5-minute audit (free, no API key)

```
git clone https://github.com/christophhdesign/open-design-system-bench
cd open-design-system-bench
npm install

# point the harness at your design system (interactive wizard)
npx tsx src/cli.ts init

# extract your component catalog from source
npx tsx src/cli.ts extract

# score it
npx tsx src/cli.ts audit --verbose
```

You get an AI-Readiness Score (0 to 100, tiered Emerging / Invested / AI-native) built from seven static checks, each with concrete findings and fixes. Typical first-run discoveries: components that are not actually exported, deprecations agents cannot read, docs that only exist behind a JS-rendered site.

What the wizard needs from you:

-   Where your component source lives (a local checkout for `docgen` extraction, or just the published npm package name in `npm` consume mode).
-   Optionally: your AGENTS.md/CLAUDE.md paths and a CSS custom-properties token file. Missing pieces score honestly rather than blocking.

60.0System A

56.2System B

52.2System C

Calibration points, same date and basis. If you beat 70, tell us; nobody has yet.

### The benchmark (bring your own key)

The benchmark runs a real coding agent against your real components and grades the output. It costs real LLM money, so it never runs on its own.

```
# sanity pass: 2 cells, a few dollars, ~10 minutes
npx tsx src/cli.ts run --profile smoke

# the meaningful monthly sweep
npx tsx src/cli.ts run --profile medium
```

Auth options: an `ANTHROPIC_API_KEY` in `.env`, an already-authenticated `claude` CLI, or any OpenAI-compatible endpoint via the `providers` map in `bench.config.json` (qualified model strings like `--models "openai:gpt-5.2"` route through single-shot generation).

Each run produces a self-contained `report.html` (safe to email or attach to a ticket) and a `results.json`. Feed the run back into the audit to unlock the four behavioral sub-scores:

```
npx tsx src/cli.ts audit --run runs/<id>
```

Sub-score

What it measures

**Lift**

Guided minus bare compliance. What your enablement docs are worth.

**Ceiling**

Quality and pass rate with full guidance. Your best case.

**Engagement**

How often agents used your system at all. Usually the number that surprises teams most.

**Vocabulary**

Whether hallucinated names at least follow your conventions.

### Comparing and tracking

```
npx tsx src/cli.ts compare runs/<before> runs/<after>   # did the docs change help?
npx tsx src/cli.ts ci --run runs/<id> --freeze          # freeze a baseline
npx tsx src/cli.ts ci --run runs/<newer>                # fail CI on regression
npx tsx src/cli.ts leaderboard audit-*.json             # rank multiple systems
```

### Ground rules worth knowing

-   Task prompts never name expected components; a linter enforces this against your extracted catalog. If it flags your prompts, reword the prompt, do not whitelist the leak.
-   Single-shot and agentic cells are never ranked against each other.
-   v1 scope: React and TypeScript design systems, with other frameworks planned as grader plugins. No telemetry, ever.

### Common friction

-   Monorepo tsconfigs that `extends` a workspace package: symlink or install that package first (the per-repo notes in `examples/oss/README.md` give the exact fix for each).
-   Peer-dependency conflicts in `npm` consume mode: pin them with `fixturePins` in your system config (one of the OSS reference configs pins React 18).
-   npm cache permission errors: add `--cache .npm-cache --no-fund --no-audit`.

## What gets measured

What the harness measures today.

### Tier 1: the static audit

Free, no LLM, seconds. No API key.

1.  1
    
    Enablement surface
    
    AGENTS.md/CLAUDE.md presence and freshness, llms.txt, machine-readable catalog, MCP hints, skills, editor rules, Code Connect.
    
2.  2
    
    Catalog quality
    
    Share of components with typed props, defaults, and descriptions; docgen-ability; staleness against source.
    
3.  3
    
    Export hygiene
    
    Barrel and exports-map consistency (finds unexported public components), types shipped, dist usability outside the monorepo. Directories named `internal`/`private` count as deliberate encapsulation.
    
4.  4
    
    Vocabulary convention-distance
    
    Your names diffed against an empirical lexicon of what models actually invent (mined from 898 graded generations, 6 model configs, 2 production systems). No LLM needed to score it.
    
5.  5
    
    Token machine-readability
    
    CSS custom properties or DTCG, semantic layer, light/dark pairing.
    
6.  6
    
    Deprecation legibility
    
    `@deprecated` annotations, machine-readable changelog. Agents migrate what they can read.
    
7.  7
    
    Docs greppability
    
    Docs reachable as text, coverage of the component set.
    

### Tier 2: the generation benchmark

Real agents build UI from intent-level prompts that never name the expected component, in isolated workspaces. The gate is the worst dimension, not the average. The headline is a matrix of system by context level (bare / agents-md / skill) by model.

1.  8
    
    Imports
    
    Only the system's package, React, and local files. A foreign UI library is a fail.
    
2.  9
    
    API fidelity
    
    No hallucinated components, no invented props. Checked against the catalog extracted from source.
    
3.  10
    
    Token discipline
    
    No raw hex or rgb, no arbitrary values like `bg-[#…]`, no hardcoded inline-style colors.
    
4.  11
    
    Static accessibility
    
    Accessible names on form controls and icon buttons, img alt, label association, valid `aria-*`, and related AST checks.
    
5.  12
    
    Compilation
    
    `tsc --noEmit` against the fixture. An error fails the cell.
    
6.  13
    
    LLM-judged rubrics
    
    The task's own rubrics, scored by a separate model. Covers judgment calls no parser can make, such as action hierarchy. A critical rubric fail cannot be rescued by a high average.
    

Four behavioral sub-scores, derived per run once you feed a benchmark back into the audit:

14.  14
     
     Lift
     
     Guided minus bare compliance. What your enablement docs are worth.
     
15.  15
     
     Ceiling
     
     Quality and pass rate with full guidance. Your best case.
     
16.  16
     
     Engagement
     
     How often agents used your system at all. Usually the number that surprises teams most.
     
17.  17
     
     Vocabulary
     
     Whether hallucinated names at least follow your conventions.
     

### Good first contributions

Ranked by impact-to-effort for a new contributor.

1.  A cheap single-shot eval (retrieval QA is the most self-contained).
2.  A command-template agent adapter (run any agent CLI via placeholders; `src/agents/codex.ts` is the stub showing the shape).
3.  Convention lexicon entries backed by new mined evidence (never hand edits).
4.  Token-source strategies beyond CSS custom properties (DTCG JSON, Sass maps).
5.  Generalizing the a11y grader's component-name heuristics.

## Who uses the numbers

The design system team gets a measured delta (guided vs bare compliance) where it previously had a hunch. Docs or model regressions show up as a score drop before they show up in production.

The company gets a position that is easier to defend than any single score: we published the harness, and anyone can re-run it.

Cost: the audit is free. A monthly benchmark sweep costs tens of dollars in API calls.

## Common questions

The ones that come up most, including the ones about where this tool's own limits are.

"Isn't this just linting with extra steps?"

The audit half is deliberately static, yes, and it is honest about that: the score is labeled surface-only until you feed it a benchmark run. It still earns its keep because of what it checks. Export reachability computed from source, vocabulary distance against an empirically mined lexicon, and deprecation legibility are not in any linter, and they found shipped bugs in every production system we ran it on. The benchmark half does what a linter cannot: it runs real agents against the real components and grades what they produce.

"LLM-as-judge is unreliable."

Partly true, which is why only one of six dimensions is judged. Five are mechanical: imports, API fidelity against the extracted catalog, token discipline, static accessibility, compilation. The judge covers rubrics no parser can score (action hierarchy, appropriate emphasis), supports multiple samples, and its reasoning is stored verbatim in the report for inspection. Gate decisions come from the worst dimension, so a generous judge cannot rescue a cell that fails a mechanical check.

"Scores between systems aren't comparable; every system got different tasks."

The starter tasks are shared and domain-neutral, prompts never name components, and a linter enforces that against each system's actual catalog (it has caught the words Switch, Section, and Header colliding with real component names). Cross-system comparison is fairest on Lift, the within-system delta between guided and bare contexts, which is why the audit treats it as the headline behavioral number. We also never rank single-shot cells against agentic cells; they are different populations at roughly 80x cost difference.

"Why did the open-source systems score in the middle? They have great docs."

They do have great docs, for humans. The middle-tier scores break down into specific, checkable gaps: one ships zero agent enablement files, another has no root changelog and Sass-only token sources, and a third keeps tokens in a separate package with no committed CSS custom-property file. Each system also has real strengths the score credits: the closest vocabulary alignment we have measured (97.2) belongs to one of them, and another ships Code Connect files and an MCP workspace. We are not ranking them. The score explains itself per system.

"The tier thresholds are arbitrary."

They are documented defaults (AI-native at 70, Invested at 40), stated as such in the source, and the plan on record is to recalibrate them from the reference-run distribution. The first four-system sample (52.2 to 63.4) suggests they are in a sane place: everyone is Invested, nobody is AI-native, which matches qualitative experience.

"Won't teams just optimize the score instead of the outcome?"

The audit checks are constructive: gaming export hygiene means exporting your components, gaming deprecation legibility means writing a parseable changelog. The behavioral half is harder to game: prompts never name components, and the strongest metric is a delta (Lift), not a level. If a team games Lift by writing an AGENTS.md so good that agents comply more, that is the outcome.

"Why React + TypeScript only?"

Because that is what we could measure honestly at launch. The grading pipeline leans on TypeScript's compiler and react-docgen. The stated plan is grader plugins for other frameworks (and a multi-framework parity eval). Claiming broader scope before that exists would be a claim we could not back.

"How much does it cost to run?"

The audit: nothing, no API key, seconds. The benchmark: a 2-cell smoke run is a few dollars; a meaningful sweep is tens of dollars. You bring your own key; there is no hosted service and no telemetry.

"Are all three open-source systems still maintained?"

One of the three has its React package in maintenance while its vendor moves to web components. It remains a useful, widely deployed reference snapshot, and the caveat ships in the repo next to its numbers.