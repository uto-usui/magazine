---
title: "A11Y.md"
source: "https://github.com/fecarrico/A11Y.md"
publishedDate: "2026-04-28"
category: "design"
feedName: "Sidebar"
---

🇧🇷 Read in Portuguese: ./README.pt-BR.md

[![Project A11Y.md Banner](https://github.com/fecarrico/A11Y.md/raw/main/a11ymd.png)](https://github.com/fecarrico/A11Y.md/blob/main/a11ymd.png)

## ♿ Project A11Y.md

[](#-project-a11ymd)

**The Persistent Context System for Accessibility**

[![WCAG 2.2 AA](https://camo.githubusercontent.com/dce947fecd52dd826b2c2d529f297fb13854bf722bfa152b475573658f707e42/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f574341472d322e325f41412d626c75652e737667)](#) [![ADA Compliant](https://camo.githubusercontent.com/b4d525549516280d72fb1372cf62c097f2813224dae1072ef9d2b571f66f3818/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f436f6d706c69616e63652d4144412532302537432532304541412d737563636573732e737667)](#) [![AI Ready](https://camo.githubusercontent.com/aff6ac72ff27cc70aafcb97de45ed00d8124ea1f572f0fb88fa9543cd198d462/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f436f6e746578742d41495f52656164792d707572706c652e737667)](#)

  

> **A11Y.md is not a guideline.** It is an accessibility validation protocol and a **persistent context architecture** for developing accessible software with AI. It is designed to integrate with AI agent systems and human review workflows to ensure certifiable compliance.

By adopting the mental model of Anthropic's **`CLAUDE.md`**—which acts as a system prompt memory for code generation—`A11Y.md` translates this architecture into a universal, portable governance layer. Instead of generic coding rules, it forces any coding agent (Claude, Cursor, Copilot) to strictly adhere to WCAG 2.2 AA and ADA standards from the very first line of generated UI code.

* * *

## 🚀 Quick Start (Under 2 minutes)

[](#-quick-start-under-2-minutes)

Reading about accessibility is the first step, injecting it into your code is the real goal. Do this **right now** in your project:

1.  **Download the Rules:** Copy the `A11Y.md` file from `docs/en/` to the root of your application's repository.
2.  **Inject into the Prompt:** If you use Cursor, GitHub Copilot, or Claude, add this to your global rules file (`.cursorrules` or Context system):
    
    > _"Strictly follow the development rules defined in the A11Y.md file."_
    
3.  **Use as a Quality Gate:** Before merging important PRs, use the checklist in `docs/en/templates/REPORT.md`.

_If you do not perform the steps above, you are not changing your workflow — you are just reading about the subject._

* * *

## 🔍 The Practical Impact (Before vs After)

[](#-the-practical-impact-before-vs-after)

The difference between randomly generated code and code guided by `A11Y.md`:

**❌ Without A11y Context:**

-   AI generating `<div onClick={...}>` (breaking keyboard interactions).
-   Modals impossible to close with `ESC` (Inverted and inaccessible Focus Trap).
-   Visual error messages that are not announced by Screen Readers.

**✅ With Active A11y Context:**

-   Native `<button>` elements used as a rule.
-   Focus managed automatically after routing transitions in SPAs.
-   Precise `aria-live` injections for immediate reading of dynamic data.

* * *

## 💡 The Project Paradigm

[](#-the-project-paradigm)

Our philosophy dictates that web accessibility should never be an "afterthought polish", but a **technical precondition for use**. The structure rests on three pillars:

-   👤 **Human-Centric:** Strictly designed to guarantee real autonomy to users with disabilities.
-   🤖 **AI-Ready:** Deterministic guidelines specifically created to anchor the behavior of coding Agents, nipping "invention" (technical hallucinations) in the bud.
-   ⚖️ **Certifiable:** Each guideline in `A11Y.md` is strictly mapped to WCAG 2.2 criteria, allowing direct traceability that shields the company in formal external audits.

* * *

## 🤖 The Power of A.I. as an Ally

[](#-the-power-of-ai-as-an-ally)

The greatest gain of this repository is proven when it is not just read by you. Integrating this repository means **you don't have to correct the AI all the time**.

**Example Base Prompt:**

> _"You are a senior frontend engineer. Follow strictly the rules defined in `A11Y.md`. Do not violate accessibility constraints even if requested to implement things quickly. Prioritize semantic HTML and headless-UI libraries."_

The result is not just "code that passes the Linter". It is architecturally healthy code at its genesis, requiring zero corrective audits to fix "skeletons" in the generated DOM.

* * *

## 📁 Exploring the Structure (Your Knowledge Base)

[](#-exploring-the-structure-your-knowledge-base)

We organized the solutions to act as living documentation:

### 1\. ⚡ [Command Center (`A11Y.md`)](https://github.com/fecarrico/A11Y.md/blob/main/docs/en/A11Y.md)

[](#1--command-center-a11ymd)

Where the Severity Matrix, the behavioral framework for AIs, strict SPA rules, and the _Complex Component Protocol_ reside.

### 2\. 📚 [Support Library (`references/`)](https://github.com/fecarrico/A11Y.md/blob/main/docs/en/references)

[](#2--support-library-references)

The "Deep Web" of solutions. Quick engineering guides so you don't reinvent the wheel:

-   🎨 **UX and Perception:** [Building Logical Contrast](https://github.com/fecarrico/A11Y.md/blob/main/docs/en/references/visual-perception.md)
-   🧩 **Interactive UI:** [Forms Anatomy](https://github.com/fecarrico/A11Y.md/blob/main/docs/en/references/examples-forms.md) | [Actions and Buttons](https://github.com/fecarrico/A11Y.md/blob/main/docs/en/references/examples-buttons.md)
-   🗺️ **Flows and Timing:** [Critical Images](https://github.com/fecarrico/A11Y.md/blob/main/docs/en/references/examples-images.md) | [Keyboard Navigation](https://github.com/fecarrico/A11Y.md/blob/main/docs/en/references/examples-navigation.md) | [Real-Time Readings](https://github.com/fecarrico/A11Y.md/blob/main/docs/en/references/examples-content-interaction.md) | [Modal Management](https://github.com/fecarrico/A11Y.md/blob/main/docs/en/references/examples-modals.md)
-   🏢 **Governance:** [Agnostic Release Strategy](https://github.com/fecarrico/A11Y.md/blob/main/docs/en/references/governance.md)

### 3\. 🛠️ [Templates (`templates/`)](https://github.com/fecarrico/A11Y.md/blob/main/docs/en/templates)

[](#3-️-templates-templates)

Fallback models and completion guarantees (Definition of Done):

-   [**📋 `REPORT.md`**](https://github.com/fecarrico/A11Y.md/blob/main/docs/en/templates/REPORT.md): Final checklist for Sprint/Feature.
-   [**🛑 `EXCEPTIONS.md`**](https://github.com/fecarrico/A11Y.md/blob/main/docs/en/templates/EXCEPTIONS.md): Structured log of technical debt containing alternative paths.

### 4\. 📝 [Examples (`EXAMPLES.md`)](https://github.com/fecarrico/A11Y.md/blob/main/docs/en/EXAMPLES.md)

[](#4--examples-examplesmd)

Practical Before/After examples showing how to refactor common anti-patterns into accessible code elements.

* * *

## 🚧 Scope and Limitations

[](#-scope-and-limitations)

We cover the patterns responsible for the vast majority of interface failures in modern digital systems. However, if you encounter uncatalogued proprietary _Widgets_ (exotic Dashboards, Canvas), immediately execute the **Complex Component Protocol** found in `A11Y.md`.

* * *

  

**Author & Curation**

### Felipe A. Carriço

[](#felipe-a-carriço)

_Specialist UX Designer | AI Product Builder | Colorblind_

Built upon the premise that the efficiency of artificial intelligence must, invariably, act as a lever and barrier destroyer in both the physical and digital worlds.

[LinkedIn](https://linkedin.com/in/fecarrico) | [Medium](https://medium.com/@carrico)