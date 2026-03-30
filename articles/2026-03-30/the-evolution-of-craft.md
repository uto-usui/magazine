---
title: "The evolution of craft"
source: "https://carlsz.dev/posts/evolution-of-craft"
publishedDate: "2026-03-27"
category: "design"
feedName: "Sidebar"
---

If you read my [Hello World](https://carlsz.dev/posts/hello-world) post, you know I view the current AI explosion not as the end of our profession, but as a “Barnes & Noble gift card” moment. A new medium is here, or perhaps something more akin to a new fundamental force of nature.

But I won’t sugarcoat it, this transition comes with a heavy dose of uncertainty. For decades, UX professionals and engineers have taken deep pride in our craft. As digital artisans, we loved drawing the perfect screen, refining the typography, and hand-writing the boilerplate code to bring a feature to life. We followed a highly predictable, linear path: Research → Design → Build. We were deeply embedded in the manual creation of artifacts. We were Operators.

Today, the economic and technical reality of 2026 has made that exact realization a mandate for the entire industry. It no longer makes sense to do manual production work by hand. The era of the Operator is fading because the friction of production has vanished.

## The Death of the Operator

As UX pioneer Jakob Nielsen recently observed, AI allows us to [completely reverse the traditional creative workflow](https://jakobnielsenphd.substack.com/p/ux-roundup-20260216). Instead of starting with rough outlines and spending weeks inching toward a final product, we can now use AI to generate a fully functional, high-fidelity output in minutes. The prompt is the build. We start with the “final” product, and only then do we step in to iterate, review, and refine the details.

This requires a profound shift in how we view our craft. When a machine can generate thousands of lines of code or complex UI layouts instantly, our core competency is no longer production. It is taste and judgment.

Recent research comparing traditional coding to new AI paradigms confirms this reality. The developer’s primary role is rapidly shifting from a hands-on implementer to a [“Strategic Planner” and “Supervisor”](https://arxiv.org/pdf/2505.19443). We are no longer defining the _how_ line-by-line or pixel-by-pixel. Now, autonomous systems independently interpret high-level goals, decompose tasks, and execute them within sandboxed environments.

## Welcome to the Middle Loop

Software development has long been described in terms of two loops. The inner loop is the developer’s personal cycle of writing, testing, and debugging code. The outer loop is the broader delivery cycle of CI/CD, deployment, and operations. As enterprise technology leaders recently established, a third category of work has emerged: **The Middle Loop**.

The Middle Loop is a [new supervisory layer that sits between inner-loop coding and outer-loop delivery](https://www.thoughtworks.com/content/dam/thoughtworks/documents/report/tw_future%20_of_software_development_retreat_%20key_takeaways.pdf). This loop involves directing, evaluating, and refining the output of AI agents. It requires a fundamentally different skill set than writing code or drawing screens. It demands the ability to decompose complex problems into agent-sized work packages, calibrate trust in AI outputs, and maintain architectural coherence across a fleet of digital workers.

If AI takes over code production, the engineering discipline that used to live in writing and reviewing code does not disappear, it moves upstream. Organizations are finding that their most effective engineers are no longer defined by how fast they type or how well they remember syntax. They are defined by their systems thinking, problem decomposition, and specification clarity.

## The Rise of the Intent Architect

Thriving in the Middle Loop means embracing the identity of an **Intent Architect**. Instead of pushing pixels, we define the strategic goals, the system architecture, and the strict constraints that autonomous agents operate within. We recognize that vague prompts produce vague results, while precise specifications multiply into precise implementations.

If you want to see what this looks like in practice, look at a recently released [`frontend-design skill`](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md) built for Anthropic’s Claude Code. It isn’t a visual mockup. It is a plain-text Markdown file (`SKILL.md`) that guides the AI to create production-grade interfaces. The file explicitly instructs the agent:

-   **Tone:** “Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural… BOLD aesthetic direction.”
-   **Typography:** “Avoid generic fonts like Arial and Inter; opt instead for distinctive choices… Pair a distinctive display font with a refined body font.”
-   **Anti-Patterns:** “NEVER use generic AI-generated aesthetics like overused font families… cliched color schemes… and cookie-cutter design.”

_This_ is the new canvas. The designer didn’t draw the interface; they architected the intent. They explicitly codified their taste into a machine-readable format to prevent the agent from generating generic “AI slop.”

## Codifying Taste into Programmable Infrastructure

This shift requires a profound change in how we communicate. For the last decade, we have optimized our design logic for human eyes. But in the agentic world, the primary consumer of your work is different.

AI doesn’t actually have eyes. What a multimodal model actually “sees” is a massive grid of floating-point values representing colors, borders, and margins. If you hand an AI a picture of a UI, you are giving it a puzzle to solve. If you hand it explicit text, you are giving it your answer key.

As Intent Architects, we are moving beyond static visual exports to build programmable infrastructure. By curating structured, machine-readable instructions and robust component catalogs that live right alongside the codebase, your codified intent becomes the agent’s baseline reality. This ensures that the code generated at machine speed strictly adheres to your standard of taste.

## Embracing the Shift

The Middle Loop naturally creates an identity shift for developers and designers who fell in love with the manual craft of creation. But the manual labor of pixel-pushing and boilerplate-typing was just a phase we are passing out of.

The new era is strategically richer, technically deeper, and far more impactful. The machine can predict the pixel. It can write the loop. But it cannot predict the human purpose, the ethical trade-offs, or the systemic integrity of the software. That remains our domain.