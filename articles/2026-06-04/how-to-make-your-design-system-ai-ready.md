---
title: "How To Make Your Design System AI-Ready"
source: "https://smashingmagazine.com/2026/06/how-make-design-system-ai-ready/"
publishedDate: "2026-06-03"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Vitaly Friedman)"
---

-   4 min read
-   [Design](https://smashingmagazine.com/category/design), [AI](https://smashingmagazine.com/category/ai), [Design Patterns](https://smashingmagazine.com/category/design-patterns), [UX](https://smashingmagazine.com/category/ux)

Practical guide on how to reduce drifts, minimize mistakes, maintain context, and improve the quality of AI-generated prototypes. Brought to you by [Design Patterns For AI Interfaces](https://ai-design-patterns.com/), **friendly video course on UX** and design patterns by Vitaly.

**AI-generated prototypes** often don’t deliver consistently decent results because of tiny inconsistencies scattered all across a design system. I’s decisions made but not documented, hard-coded values never cleaned up, or **relying too much on AI** making sense of mock-ups or design flows on its own.

Yesterday I stumbled upon a [useful practical guide](https://hvpandya.com/llm-design-systems) by Hardik Pandya from Atlassian — on **how to reduce drifts**, minimize mistakes, maintain context, and improve the quality of AI-generated prototypes. Let’s see how it works.

[![A diagram comparing traditional with LLM-readable design systems by showing their processes and an example file structure.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-make-design-system-ai-ready/1-traditional-llm-readable-design-systems.jpg)](https://hvpandya.com/llm-design-systems)

To get better results, AI needs better guidance that minimizes assumptions and reduces ambiguity. Guide by [Hardik Pandya](https://hvpandya.com/llm-design-systems). ([Large preview](https://files.smashing.media/articles/how-make-design-system-ai-ready/1-traditional-llm-readable-design-systems.jpg))

## 1\. Design Decisions Are Infrastructure

Unsurprisingly, better AI prototypes **come from better data** — but also from better human guidance. We shouldn’t assume that AI knows how to choose the right component and how to design with accessibility in mind. It needs priorities, a clear path on how we make decisions, design principles, examples, do’s and don’ts.

In fact, we should treat design decisions as **infrastructure**. That means that every time we make a decision — not just a design decision, but even a decision on how to actually prioritize our work and how we make decisions around here — it must find a path into the spec file that is then consumed by AI.

## 2\. Auditing: FigmaLint

One of the useful tools to audit the quality of the design system is [FigmaLint](https://www.figma.com/community/plugin/1521241390290871981/figmalint). It’s a useful **free Figma plugin** for auditing tokens, states, accessibility, binding tokens, renaming layers, detecting detached instances, missing interactive states and hard-coded values — and preparing the design documentation.

[![A screenshot showcasing FigmaLint, an AI-powered design system auditing and auto-fix tool within Figma, with various UI screens displaying features like component auditing, interactive states, design token usage, and property recommendations.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-make-design-system-ai-ready/2-figmalint.jpg)](https://www.figma.com/community/plugin/1521241390290871981/figmalint)

Neat little helper to streamline auditing: [FigmaLint](https://www.figma.com/community/plugin/1521241390290871981/figmalint). ([Large preview](https://files.smashing.media/articles/how-make-design-system-ai-ready/2-figmalint.jpg))

If you often have to work with **vendors and third parties** who supply you with their design systems and component libraries, that’s a great helper to have by your side — especially if you want to improve the quality of prototypes, AI-generated code, and AI-written documentation.

## 3\. Three Layers: Spec Files + Token Layer + Auditing

To ensure quality, we establish design principles, guidelines, and rules in the form of “**spec files”**. It’s structured Markdown files that include spacing rules, color choices, component usage guidelines, priorities, etc. AI is going to read and reuse that spec file every time it’s going to generate a prototype.

[![An example of a folder that organizes spec files to be AI-friendly.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-make-design-system-ai-ready/3-spec-files.jpg)](https://hvpandya.com/llm-design-systems)

An example of a folder that organizes spec files to be AI-friendly. [Jump to full example](https://hvpandya.com/llm-design-systems). ([Large preview](https://files.smashing.media/articles/how-make-design-system-ai-ready/3-spec-files.jpg))

Because the spec files are text files, it’s much more **cost-effective** but also much more accurate, just because we don’t rely on AI recognizing or decoding patterns from mock-ups but get specific guidelines instead. In fact, extending code is often a more effective way than generating code from mock-ups.

The **token layer** lists and keeps updated all tokens used throughout the design system. AI always chooses from a closed set of named variables instead of inventing plausible values ad hoc.

[![Five levels of context engineering](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-make-design-system-ai-ready/4-five-levels-context-engineering.jpg)](https://www.linkedin.com/posts/vitalyfriedman_five-levels-of-context-engineering-how-share-7439202839077335040-KoU2)

Context engineering is everything. Five levels of context engineering: [a practical overview](https://www.linkedin.com/posts/vitalyfriedman_five-levels-of-context-engineering-how-share-7439202839077335040-KoU2), by Matthew Alverson, via Addy Osmani. ([Large preview](https://files.smashing.media/articles/how-make-design-system-ai-ready/4-five-levels-context-engineering.jpg))

An **audit script** catches what AI gets wrong. It scans the prototype and flags every hard-coded value and flags it if necessary. It can be a regular software doing that, with AI waiting for its feedback to come back.

Finally, when a design system **ships updates**, a sync routine flags which spec files need updating. The goal is to make sure that AI always reads up-to-date, current specs, not the ones written against an outdated version.

## 4\. Examples of AI-Ready Design Systems

-   [Atlassian](https://atlassian.design/llms.txt)
-   [Carbon](https://carbondesignsystem.com/llms.txt)
-   [CMS Design System](https://design.cms.gov/llms.txt)
-   [Nordhealth](https://nordhealth.design/ai/)

## Wrapping Up

Ultimately, AI **cannot magically resolve** technical debt or design debt without proper guidance. It relies heavily on clear decisions, established priorities, and well-defined principles.

The more **deliberate and precise** designers are in guiding AI, the better the overall outcomes will be. This requires not just cleaning up and improving design systems but also maintaining them over time as decisions need to trickle down into Markdown files. We’ll be busy for years to come.

## Meet “Design Patterns For AI Interfaces”

Meet [**Design Patterns For AI Interfaces**](https://ai-design-patterns.com/), Vitaly’s new **video course** with 100s of real-life examples and UX guidelines to design AI features that people actually use — with a [live UX training](https://smashingconf.com/online-workshops/workshops/ai-interfaces-vitaly-friedman/) later this year. [Jump to a free preview](https://www.youtube.com/watch?v=jhZ3el3n-u0).

[![Design Patterns For AI Interfaces promo picture](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/product-designer-career-paths/design-patterns-ai-interfaces.png)](https://ai-design-patterns.com/)

Meet [Design Patterns For AI Interfaces](https://ai-design-patterns.com/), Vitaly’s video course on interface design & UX.

## Useful Resources

-   [FigmaLint](https://www.figma.com/community/plugin/1521241390290871981/figmalint), by TJ Pitre
-   [Atlassian AI-Ready Design System Example](https://atlassian.design/), by Atlassian
-   [Carbon AI-Ready Design System Example](https://carbondesignsystem.com/llms.txt), by IBM
-   [CMS Design System AI-Ready Example](https://design.cms.gov/llms.txt), by Centers for Medicare & Medicaid Services
-   [Nordhealth AI-Ready Design System Example](https://nordhealth.design/ai/), by Nordhealth

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (yk)