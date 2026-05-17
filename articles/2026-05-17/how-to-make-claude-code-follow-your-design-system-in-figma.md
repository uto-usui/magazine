---
title: "How to make Claude Code follow your design system in Figma"
source: "https://uxdesign.cc/how-to-make-claude-code-follow-your-design-system-in-figma-559618cffaa9"
publishedDate: "2026-05-15"
category: "design"
feedName: "Sidebar"
fetchedBy: "playwright"
---

## 4 Skills that bind every value to your design system, so you can actually iterate on what Claude builds.

[

![Sen Lin](https://miro.medium.com/v2/resize:fill:64:64/1*x9-fDYFAndhQpVhRHHxL-g.jpeg)



](https://medium.com/@sunless77?source=post_page---byline--559618cffaa9---------------------------------------)

5 min read

May 7, 2026

Press enter or click to view image in full size

![A chrome robotic hand holds a glowing orange sphere containing a vintage desktop computer, set against a grayscale collage of scientific diagrams and celestial illustrations.](https://miro.medium.com/v2/resize:fit:700/0*TVUM36VQ51vWEChC.png)

Claude Code can now write directly to the Figma canvas through [Figma MCP](https://help.figma.com/hc/en-us/articles/39888612464151-Claude-Code-and-Figma-Set-up-the-MCP-server#h_01KPPEJMXTZGNJS32R62SCME0S).

You describe an interface in natural language; it builds it. Visually, the result can be pixel-perfect. But click into any layer and you’ll find `#5C6AC4` where `color/brand/primary` should be, `14` where `text/body-sm` is defined, a freshly minted one-off component where an existing Button instance is sitting right there in the library.

Press enter or click to view image in full size

![A Figma canvas showing a registration form with Email, Password, and Confirm Password fields. The right panel reveals the problem: Selection Colors shows raw hex values 1E1E1E and B3B3B3 with no token bindings, highlighted in red.](https://miro.medium.com/v2/resize:fit:700/0*eo35ZwXBvEA1qpXv.png)

You can not iterate on this

The design system has all of this. Claude Code used none of it.

The problem isn’t capability. It knows how to call the Figma API, how to query a library, how to bind a variable. It just doesn’t know that in _your_ project, it _must_. Nobody told it the rules, so it made up its own.

## The Harness, and What It Isn’t

In AI engineering, people talk about a concept called **Harness**:

> _The constraint framework you build around a model. It defines what the model can do, what it can’t, and how to verify the output. The model is the engine; the harness is everything that makes the engine run by your rules._

I want to be precise here: what I built is not a harness. A harness is an architectural concern. It lives at the system level. What I built is closer to a **workflow enforcement layer**:

_A set of rules that sit inside the harness and govern how the AI behaves in one specific context._

In this case, Figma. And the problem is governance.

Press enter or click to view image in full size

![Figma logo at center with curved arrows connecting to repeating icons of a book, diamond grid, and diamond shape on both sides, illustrating the cyclical flow between design system components, variables, and styles.](https://miro.medium.com/v2/resize:fit:700/0*TYG5Vlsdt-tzRHvE.png)

Figma has its own governance system: variables, styles, component libraries, naming conventions. But Claude Code operates entirely outside that system.

-   Every color value is isolated.
-   Every component is improvised.
-   Every modification requires re-locating everything from scratch.
-   It passes visual QA. It fails structural QA.

The question is straightforward:

> **How do you make Claude Code work _within_ design system governance, instead of freestyling, in Figma?**

## Four Skills, Four Rules

Based on that framing, I built a set of Claude Code Skills specifically for Figma design workflows. Four skills, each handling one job.

## Get Sen Lin’s stories in your inbox

Join Medium for free to get updates from this writer.

Remember me for faster sign in

**📎 Install:** [**github.com/senlindesign/claude2figma**](http://github.com/senlindesign/claude2figma)

Press enter or click to view image in full size

![Flowchart of four Claude Code Skills for Figma: Preflight runs once to load the Design System, Reference Interpreter optionally parses references into a Design Brief, then Component Rules and Style Binding loop per section to search libraries and bind every value to tokens.](https://miro.medium.com/v2/resize:fit:700/0*tApP499uN9t8on_m.png)

### 01 | Preflight: Health Check Before Anything Moves

Press enter or click to view image in full size

![Preflight check output showing all 7 checks passed: MCP connection, CLAUDE.md, Figma file access, libraries, 16 text styles, 347 variables, and 78 component sets. Right side displays the generated Token Map listing available tokens for backgrounds, text colors, spacing, border radius, and text styles.](https://miro.medium.com/v2/resize:fit:700/0*eU9OpQKvT1_31Iwt.png)

Every design session starts with three parallel checks:

1.  Is Figma MCP connected?
2.  Are file read/write permissions in place?
3.  Are styles, variables, and components from the current file fully loaded?

It outputs a **Token Map** and **Component Registry** as the reference baseline for the entire session. Until Preflight passes, no node gets created.

The value is simple: you don’t discover thirty minutes in that your library tokens never loaded.

### 02 | Reference Interpreter: Plan Before You Build

When you share a screenshot, a reference link, or a design description, this skill triggers. It parses your input into a structured Design Brief: which sections to build, which components to use, which tokens to apply. You confirm direction first. Then construction begins.

### 03 | Component Rules: Search Before You Create

Every UI construction task follows one rule: search the connected library first. If a matching component exists, use its instance. Only if nothing is found do you build from scratch, and even then, auto layout and semantic naming are mandatory.

> _This skill changes the AI’s default behavior. Without it, the instinct is to_ invent_. With it, the first move becomes_ look up_._

For any team that maintains a design system, that sequence is the difference between usable and not.

### 04 | Style Binding: Token Enforcement and QA

Whenever a task involves color, typography, spacing, or border radius, this rule activates. Every visual property must bind to its corresponding variable or style. No raw values accepted.

After writing to Figma, it runs a QA pass, confirming bindings item by item.

This is the most essential of the four. It does exactly one thing: turn `#5C6AC4` back into `color/brand/primary`.

Press enter or click to view image in full size

![Side-by-side comparison of Figma output. Left (With Skills): Input Field uses a library component instance with variant properties like State and Value Type. Right (Without Skills): visually similar form but Selection Colors shows raw hex values 1E1E1E and B3B3B3 with no design system bindings.](https://miro.medium.com/v2/resize:fit:700/0*YkIymmYtTQR-dxZ0.png)

## The Tool Follows the Scenario

These skills don’t just solve a token-binding problem. They encode a more fundamental judgment: the same AI tool should play different roles in different contexts, and produce different kinds of output accordingly.

Press enter or click to view image in full size

![Two chrome robotic hands each holding a glowing orange sphere: one containing a pencil, the other a vintage computer, with a white asterisk shape connecting them, representing the intersection of design and code.](https://miro.medium.com/v2/resize:fit:700/0*vBR1zbVNa1g36g7M.png)

When the designer needs to stay in the loop, Claude Code acts as a **design assistant**. Its output must be something a human can pick up, modify, and iterate on. That means compliance at every layer: tokens, components, layout structure. All four skills are active. The full governance chain is in effect.

When the goal is a quick prototype, it switches to **coding mode**. Speed takes priority over compliance. The enforcement layer steps back. Raw values are expected, not exceptions.

AI is powerful enough to write Figma. It’s powerful enough to write React. But the gap between a powerful tool and a usable one is often just a set of rules that nobody wrote.

Press enter or click to view image in full size

![“Pondering…” logo in red pixel-style typeface with an asterisk icon, subtitled “Design to Build — About becoming an AI-native Designer.”](https://miro.medium.com/v2/resize:fit:700/0*4s5BVZIdzXUCiyQo.png)

## Further reading

-   [Claude Code and Figma: Set up the MCP server](https://help.figma.com/hc/en-us/articles/39888612464151-Claude-Code-and-Figma-Set-up-the-MCP-server#h_01KPPEJMXTZGNJS32R62SCME0S) — Figma
-   [Claude Code Can’t Design in Figma…But It Can Do This](https://youtu.be/-fQFzomsvMU?si=8xyyXHN2Y41vCt5V) — Jeffrey @ Lytbox

Want to become an AI-native designer? [Join my newsletter](https://aiinterface.substack.com/) “Design to Build” for practical tools, real design workflows, and no-code tutorials.