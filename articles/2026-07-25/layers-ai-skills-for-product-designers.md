---
title: "Layers: AI skills for product designers"
source: "https://layers.jamiemill.com/"
publishedDate: "2026-07-22"
category: "design"
feedName: "Sidebar"
---

AI Skills Pack

## Design beyond the surface.

Whether you're directing your AI or working alongside it, Layers walks you both through all seven layers of product design — so the decisions underneath the screen actually get made.

Install in Claude Code, Cursor, Codex & more

```
npx skills add jamiemill/layers-skills
```

Install once with the skills package, then run any `/layers-*` skill in your AI tool.

Works with

-   Claude Code
-   Cursor
-   OpenAI Codex
-   pi.dev
-   \+ 50 more

[Open source · github.com/jamiemill/layers-skills](https://github.com/jamiemill/layers-skills)

The framework

## Seven layers, three zones

Most product design decisions live at one of seven layers. It's easy — for humans and for AI — to stay near the surface; plausible screens come quickly, and the decisions underneath them go unmade. Layers gives you a way to navigate down, find which layer the real problem lives at, and run the skill that thinks with you there.

Not sure where to start? [**Run /layers-orient**](https://layers.jamiemill.com/skills/orient) — it audits all seven layers and tells you which one is your bottleneck.

[Browse all 9 skills →](https://layers.jamiemill.com/skills)

In practice

## What you'd actually say

These are the kinds of prompts the Layers skills are built to handle. Drop one into your AI tool — the skill takes it from there.

### Start broad

When you don't yet know which layer the problem lives at.

-   I've been asked to redesign onboarding — use the **Layers** skills to help me think it through properly.
    
-   Help me figure out why my team can't agree on how to design this feature. Use **Layers** to surface what we're actually disagreeing about.
    
-   I'm stuck on this design and I don't know what's wrong. Use **Layers** to diagnose where the real problem is.
    
-   Audit my mockups with the **Layers** skills — what decisions am I assuming, and which ones haven't actually been made?
    

### Or go straight to a layer

When you know which decisions you need to make.

-   I've got 12 user interviews. Run [`/layers-user-needs`](https://layers.jamiemill.com/skills/user-needs) and turn them into prioritised job stories.
    
-   Help me model the objects, relationships, and vocabulary for this scheduling tool with [`/layers-conceptual-model`](https://layers.jamiemill.com/skills/conceptual-model).
    
-   Run [`/layers-interaction-flow`](https://layers.jamiemill.com/skills/interaction-flow) for this checkout — surface the edge cases and empty states I'm missing.
    
-   My team can't agree on terminology across product, design, and engineering. Use [`/layers-domain`](https://layers.jamiemill.com/skills/domain) to map the conflicts.
    

What you get back

## Decisions, not screens.

Skills capture design decisions as markdown and mermaid — job stories, strategy trees, object maps, breadboards, decision inventories. Plain text, readable by humans, by AI, and by every other tool you use.

Need decisions to live in Linear, Notion, Figma, or GitHub instead? Connect an MCP and the skill writes there directly.

Example artifact Output from `/layers-product-strategy`

### Strategy tree

graph TD
    O\["Outcome: increase weekly active use"\]
    O --> Op1\["Opp — first run: 'I can't tell yet<br/>if this is worth setting up'"\]
    O --> Op2\["Opp — first task: 'doing this by hand<br/>is faster than learning the tool'"\]
    Op1 --> B1\["Bet: show value before signup"\]
    Op2 --> B2\["Bet: pre-filled defaults"\]

**Prioritised bet:** show value before signup.

-   _Risk:_ cold visitors may not engage enough to surface real value.
-   _Validation:_ cohort A/B on signup conversion + qualitative session review.
-   _Linked needs:_ `#user-needs/onboarding-momentum`

About

## The Layers framework, made available to AI.

Layers is a model of product design as seven layers across three zones. The framework is by [Jamie Mill](https://jamiemill.com/); the skills make it executable inside the AI tools you already use.

[More about the framework →](https://layers.jamiemill.com/about)