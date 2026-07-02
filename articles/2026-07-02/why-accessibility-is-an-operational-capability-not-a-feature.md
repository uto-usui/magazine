---
title: "Why Accessibility Is An Operational Capability, Not A Feature"
source: "https://smashingmagazine.com/2026/06/why-accessibility-operational-capability-not-feature/"
publishedDate: "2026-06-30"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Mikhail Prosmitskiy)"
---

-   11 min read
-   [Accessibility](https://smashingmagazine.com/category/accessibility), [UX](https://smashingmagazine.com/category/ux), [Design](https://smashingmagazine.com/category/design), [Usability](https://smashingmagazine.com/category/usability)

Teams can generate UI faster than ever, but they still have to guarantee that what they ship is usable, secure, and maintainable. Accessibility as an operational capability rather than a compliance checklist or end-of-project audit, and what that looks like in practice.

We know that right now, a senior engineer is shipping a checkout flow they “built” in a single afternoon. AI assistant does the heavy lifting, happy path runs clean, and a rotating chevron spins on the order summary. Two weeks later, engineering gets a notice from customer support: a blind customer using a screen reader can’t complete the purchase because the “Pay Now” control is a `<div>` with a click handler. No role. Not focusable. Not working.

That gap — between code that runs and a product people can actually use — is becoming one of the defining engineering challenges of the AI era. Teams can generate UI faster than ever, but they still have to guarantee that what they ship is usable, secure, and maintainable.

Accessibility sits right in the middle of that problem.

This is not an article about compliance checklists or end-of-project audits. It’s about engineering systems. Specifically, why accessibility should be treated as an operational capability — alongside privacy, security, reliability, and observability — and what that looks like in practice.

## The Audit Trap

For years, the default way to “do” accessibility was the one-time, audit-only approach: hire a firm, get a list of 200 findings, fix some of them, file the report. A lot of teams have now moved beyond this model — and the reason is worth looking into.

Audits do matter. For sales, procurement, governance — they’re essential. When a buyer asks for [a VPAT or an ACR](https://www.levelaccess.com/blog/vpats-and-acrs-what-you-need-to-know/), you need one. When legal asks if you’re meeting requirements, you need documentation. Audits serve those purposes well.

But audits don’t help you build accessible features during sprint planning. Audits can cost points during a sprint. They don’t catch problems before merge requests. They don’t scale with deployment velocity. The mistake, essentially, is tackling accessibility as a snapshot when you really need constant monitoring. Six months after the audit, the product has shipped dozens of releases, multiple new features, and a redesigned nav. The report is now fiction. Compliance is not a state you reach — it’s a state you maintain, and complexity fights you the whole way.

The [WebAIM Million report](https://webaim.org/projects/million/), which scans the top one million home pages every year, found that 95.9% of pages had detectable WCAG failures in its 2026 run, with an average of 56.1 errors per page. The number of page elements jumped more than 20% in a single year, likely driven by AI-enabled development and ‘vibe coding’ — and more elements mean more places to break. Accessibility debt behaves exactly like technical debt: every inaccessible component you ship becomes a future remediation project, and the interest compounds.

Any strategy that treats accessibility as a periodic event rather than a continuous property of the system is going to lose.

## The AI Problem Nobody Wants To Name

With the scale at which teams now generate UI, the gap doesn’t just persist; it multiplies.

Start with how fast this arrived. [In February 2025, Andrej Karpathy coined “vibe coding”](https://en.wikipedia.org/wiki/Vibe_coding) — a way of working where you “fully give in to the vibes” and “forget that the code even exists”. You describe intent, the model generates, you accept the diffs without reading them. It was meant for weekend projects. It did not stay there. [Y Combinator reported](https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated/) that 25% of its Winter 2025 batch had codebases that were 95% AI-generated.

Models don’t land on non-semantic markup by accident — three forces push them there. Most React code on GitHub uses non-semantic “soup”, so that’s what the models learn. Human reviewers and evaluators judge output visually, so the feedback loop rewards looks, not semantics. And `<div onClick>` is fewer tokens than `<button aria-expanded="true" ...>`, so absent a constraint, the model takes the cheap path.

Here’s the thing about AI-generated UI: it’s inaccessible by default. Not occasionally — by default. A developer writing in Frontend Masters [tested AI-generated React components across multiple tools and documented the pattern](https://frontendmasters.com/blog/ai-generated-ui-is-inaccessible-by-default/). A typical AI-generated sidebar had ten distinct accessibility failures in twenty-nine lines: no landmark, no heading, no list structure, elements with click handlers instead of buttons, no aria-expanded, no keyboard handling, and unlabeled icons. The accessibility tree — the structure screen readers actually read — came back as flat, unstructured text. “Same pixels” as the author put it. “One is a door. The other is a painting of a door”.

Now connect this to security, because the two failures come from the same root. Veracode’s [2025 GenAI Code Security Report](https://www.veracode.com/blog/genai-code-security-report/) tested large language models across dozens of coding tasks and found that a large fraction of AI-generated code introduced security vulnerabilities — including OWASP Top 10 flaws. Cross-site scripting failures were particularly common, and security performance did not meaningfully improve with newer, larger models. The issue wasn’t model intelligence. It was process: developers generating code without specifying security constraints and accepting output without systematic verification.

The same shortcut that skips the security review skips the accessibility review. At scale, AI won’t close the accessibility gap — it has industrialized the very thing that creates it.

The fix is not to ban AI. Your developers are already using it. The fix is to constrain it and verify it — to treat AI as a very fast teammate who always needs guardrails.

## Velocity and Accessibility Are Not Enemies

This is usually where someone says, _“Guardrails? Sounds great, but they will slow us down.”_

In practice, the opposite tends to be true.

[Shift-left](https://en.wikipedia.org/wiki/Shift-left_testing) is the entire DevOps thesis, and it applies cleanly here. An accessibility issue caught during design review is a comment. The same issue found in production is a remediation project.

Catching an accessibility issue as a component is built takes minutes. Fixing one after the fact — discovering it in an audit, diagnosing the root cause, restructuring the markup, applying the necessary fix, writing tests — can easily take hours. Multiply that across hundreds of findings from a late-stage audit, and you have weeks of unplanned work that earlier automated checks — whether in design reviews, development workflows, or CI — could have prevented.

Teams that integrate accessibility into everyday workflows avoid the expensive surprises: emergency audits, remediation sprints, procurement blockers, and redesigns that quietly break core user journeys. Accessibility doesn’t reduce velocity. Unexpected work reduces velocity. In-flow accessibility is one way of eliminating unexpected work.

## What Enterprise-Ready Actually Looks Like

The organizations that scale accessibility successfully do not rely on heroes. They rely on **systems**.

The highest-leverage place to start is the **design system**. One accessible component can be reused thousands of times. [The GOV.UK Design System](https://www.gov.uk/) is a useful example: components undergo both automated and manual testing using assistive technologies such as JAWS, NVDA, VoiceOver, and TalkBack. The team is explicit about the limits of automation and supplements tooling with user testing involving people with disabilities. They’re equally clear that using the design system doesn’t “magically” make a service accessible; it just gives you a higher starting point.

Accessibility becomes infrastructure. That’s the lesson.

From there, it moves into the **engineering workflow**:

-   Accessibility requirements are included in the Definition of Done.
-   Pull request reviews include explicit accessibility checks.
-   Interactive controls use semantic elements (`<button>`, `<a>`) by default.
-   Keyboard navigation and focus management are treated as standard engineering concerns, not optional polish.

Finally, accessibility becomes enforceable through **automation**:

-   [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) catches common issues before code is committed.
-   [LevelCI](https://www.levelaccess.com/level-ci/), [Pa11y](https://pa11y.org/), and similar tools provide automated testing in CI/CD pipelines.
-   [@storybook/addon-a11y](https://github.com/storybookjs/storybook) surfaces issues during component development.

At that point, accessibility stops depending on memory and starts depending on the process. It becomes part of your platform.

## Patterns That Actually Scale

A few implementation patterns consistently show up in teams that do this well.

### Constrain AI Before It Generates

Instead of fixing accessibility after generation, bake requirements directly into tooling through Cursor rules, Copilot instructions, or repository-level standards. Tell the model to use semantic HTML. Tell it when to use buttons versus links. Tell it to expose the state and labels correctly. Models follow persistent constraints far more reliably than one-off prompts.

### Stop Hand-Rolling Complex Widgets

Comboboxes, menus, tabs, modals, and similar controls routinely become accessibility hotspots. Libraries such as Radix UI, React Aria, and Headless UI already solve many of these problems. The scalable approach is not about repeatedly implementing accessibility correctly. It’s inheriting accessible behavior from well-tested primitives.

### Capture Accessibility During Design Handoff

Focus order, labels, heading hierarchy, and interaction states should be specified before implementation begins. If accessibility requirements are absent from the design artifact, they are often absent from the final product. A simple memo at design handoff — what is the tab order, what are the labels, what happens on error — removes a huge amount of guesswork later.

None of these patterns is exotic. They’re just DevOps and platform thinking applied to accessibility.

## The Broader Business Impact

Engineering leaders rarely prioritize accessibility solely because of regulations. But regulations, procurement requirements, user retention, and product quality all point in the same direction.

Legal pressure continues to increase. [Digital accessibility lawsuits in the United States](https://www.accessibility.works/blog/ada-lawsuit-trends-statistics-2024-summary/) have stayed in the thousands per year, and they are not limited to large enterprises. [The European Accessibility Act](https://www.taylorwessing.com/en/interface/2025/accessibility/the-european-accessibility-act-and-its-implementation) is now enforceable across the EU, applying to e‑commerce, banking, ticketing, telecoms, and more, regardless of where the company is headquartered. The message is clear: accessibility is no longer a “nice-to-have” in the eyes of regulators.

But compliance is only part of the story. The bigger story is the market you leave on the table. [The World Economic Forum (December 2023)](https://www.weforum.org/stories/2023/12/driving-disability-inclusion-is-more-than-a-moral-imperative-it-s-a-business-one/) estimates that the world’s 1.3 billion people with disabilities, “along with their friends and family, has a spending power of $13 trillion”; disabled consumers alone control roughly $8 trillion in annual disposable income, [per the Valuable 500](https://www.thevaluable500.com/press-release/inclusive-representation-white-paper-launched-by-valuable-500-at-the-world-economic-forum).

In the UK alone, [the Click-Away Pound Report 2019](https://www.clickawaypound.com/) found the “Click-Away Pound has risen to £17.1 billion” — more than 4.9 million users with access needs who abandon inaccessible sites and spend elsewhere, up almost 45% from £11.75 billion in 2016. People don’t file a bug report. They leave and buy from a competitor.

There is also a procurement reality that turns accessibility from a cost into a moat. If you sell B2B or to government, you will increasingly be asked for proof of accessibility — VPATs/ACRs or equivalent documentation. According to [Level Access’s Seventh Annual State of Digital Accessibility Report](https://www.levelaccess.com/resources/state-of-digital-accessibility-report-2025-2026/?utm_source=SmashingMagazine&utm_medium=paid-media&utm_campaign=fy25q4-om-2025-state-of-digital-accessibility-report&utm_content=customarticle), 75% of organizations now require proof of accessibility at least most of the time when purchasing digital products — essentially unchanged from 74% in the previous report, but with a notable shift towards stricter enforcement, as those that always require it rose from 27% to 31%. A strong ACR accelerates the sales cycle; a weak one, or none at all, creates redlines that stall or kill it. For some buyers, this is a hard requirement before your product can even enter evaluation. A strong accessibility story accelerates the sales cycle. A weak one creates redlines that stall or kill it.

Step back and the deeper pattern is clear: accessibility is a proxy for engineering maturity. A team that ships semantic HTML, manages focus, exposes state correctly, and tests it in CI is a team that has its house in order. The same discipline that produces an accessible component produces a maintainable, testable, less buggy one.

For dev and product leaders, that’s the real business case: accessibility work is platform work. It pays off every time a feature ships faster and more smoothly, with less rework, than it otherwise would have.

## Systems, Not Sprints

If you take one thing from this, make it this: accessibility doesn’t come from an audit, a hero, or a heroic remediation sprint before launch. It comes from systems.

An accessible design system so components start right. A Definition of Done so they stay right. Automated testing and CI gates so regressions fail the build. Governance, so someone owns it. Guardrails for AI-assisted development so your fastest tool stops being your biggest liability.

None of those practices is particularly glamorous. That’s exactly why they work. They’re the same kinds of boring, reliable systems you already trust for security, reliability, and performance.

But there’s one thing no tool on that list can do. No linter, no automated scanner run, no dashboard will ever tell you what it’s actually like to use your product as a blind person with a screen reader, or to navigate your checkout with a keyboard because a tremor makes a mouse inoperable. So build the systems — you need them, and they’re the only way accessibility survives contact with a real release schedule. But test with real users with disabilities regularly. The first time you sit behind someone using JAWS to fight through a form your team thought was “done”, something changes. The tooling tells you whether you passed. A real person tells you whether it actually works.

Accessibility is not a feature. It’s an operational capability. Treat it that way, and you get something dev and product leaders already care about: a faster, safer, more reliable way to ship software.

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (il, yk)