---
title: "Impeccable: Design skills for AI harnesses"
source: "https://impeccable.style/"
publishedDate: "2026-05-27"
category: "design"
feedName: "Sidebar"
---

01

### Respects your design system.

Inherits your tokens, components, and conventions instead of overwriting them. New work fits the system, not the model's defaults.

/impeccable polish : scanning codebase

› Walking src/…

✓ src/styles/tokens.css  14 colors, 6 font sizes, 7 spacing steps

✓ tailwind.config.ts  theme.extend merged

✓ src/components/  34 components

· Button: primary, secondary, ghost, destructive

· Card: 3 variants, 8px / 16px radii

· Input, Select, Dialog, Toast, Table…

✓ DESIGN.md  brand rules loaded

→ Matching your system. Not inventing one.

02

### Real product context.

Captures the brief once, in `PRODUCT.md`. Every command reads it before designing.

PRODUCT.md Loaded on every command

Users SREs on call, reading fast, often in the dark.

Register Product. Design serves the task.

Brand voice Calm, clinical, no hype.

Anti-references Purple gradients. Glassmorphism. "Boost your productivity."

03

### Travels as DESIGN.md.

`/impeccable document` writes one in the [Google Stitch format](https://stitch.withgoogle.com/docs/design-md/format/). Your visual system becomes portable.

DESIGN.md Google Stitch spec

Primaryoklch(78% .12 82)

WordmarkSpaced 400

IM

Avenir Next

BodyRegular 400

Aa

Avenir Next

Components34

Primary Ghost

Email address

Readable by every DESIGN.md-aware tool.

04

### Tuned to the agent you actually use.

Plays to each agent's strengths and around its weaknesses. Below: Codex used image generation to draft Neo Mirai before `/impeccable craft` turned it into shipped code.

[Read the case →](https://impeccable.style/cases/neo-mirai)  ·  [Open the live build →](https://impeccable.style/neo-mirai/)

05

### Brand work is not product UI.

A landing page and a dashboard play by different rules. Impeccable runs in two registers, _brand_ or _product_, and every command knows which.

Brand mode

Issue 04

_Shape_ the story.

Product mode

Users12,482

Active now1,207

Conversion4.8%

06

### Block slop before it ships.

A detector you can wire into PR checks. 41 deterministic rules, no LLM, exit codes the build can read.

feat/pricing-page ✗ failing

$ npx impeccable detect src/

✗ `src/Hero.tsx:42` gradient-text

✗ `src/Card.tsx:8` side-stripe-border

✗ `src/Button.tsx:17` ai-color-palette

3 anti-patterns · exit 1

07

### Iterate in your live app. BETA

Pick any element in your running dev server, leave a comment or a stroke, hit Go. Three production-quality variants swap in via your framework's HMR.

localhost:3000

section.hero more elegant

bolder ×3 Go

[See how Live Mode works →](https://impeccable.style/live-mode)

08

### Accept writes to source.

Variants land in your real file as an ordinary edit, not a throwaway mock. A diff you can review, commit, or undo.

✓ Wrote src/Hero.astro

\- "Welcome to Our Hotel"

\+ "Where the coast forgets time"

\- "Book Now"

\+ "Reserve your stay"