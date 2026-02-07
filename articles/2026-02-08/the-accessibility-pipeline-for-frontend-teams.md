---
title: "The accessibility pipeline for frontend teams"
source: "https://storybook.js.org/blog/the-accessibility-pipeline-for-frontend-teams/"
publishedDate: "2025-07-01"
category: "design-systems"
feedName: "Storybook Blog"
author: "Dominic Nguyen"
---

Traditional accessibility tests haven’t kept pace with modern development. Some teams manually audit a handful of pages to generate a VPAT report (slow). Others run automated tests on core user flows (low coverage).

Developers are ultimately accountable for accessibility because our code is scrutinized by users, auditors, and regulators. **But there’s no workflow that delivers fast feedback and high coverage.**

Storybook 9 changes that by integrating accessibility into every stage of development from local to CI to team sign-off. Plus, we’re launching new services to manage and prioritize preexisting accessibility debt.

![Accessibility is integrated at every stage of dev lifecycle: build, push, merge, maintain](https://storybookblog.ghost.io/content/images/2025/07/Frame-1126.png)

## Why accessibility tests fail frontend teams

The way devs check accessibility is out of sync with how apps are built. We talked to teams at Shopify, Indeed, Square, and the Storybook community. Everyone runs into the same blockers:

-   **Low coverage**: Audits only touch a few screens
-   **Slow feedback**: Results come too late to be useful
-   **Noisy results**: The same violations are flagged repeatedly across pages

These issues burn developer time and erode trust in your a11y initiatives. The result? Accessibility ends up outside the development lifecycle.

![](https://storybookblog.ghost.io/content/images/2025/07/image-1.png)

WCAG compliance requires testing the entire experience—not just happy paths.

## How to bring coverage and feedback into the dev cycle

The traditional approach to automated accessibility was to simulate user flows with an end-to-end (E2E) framework. That meant spinning up your full app, navigating through pages, and hoping the results were stable. But they rarely were.

One flaky API or loading delay upstream—and your accessibility test failed for reasons unrelated to the frontend. This workflow wasn’t much better than a manual audit.

**Storybook takes a different approach.** It renders components in isolation with mock data and args—no full app, no backend, no flake. You build atomic components and compose them into pages, writing stories to capture key states along the way. Each story is a self-contained test that’s automatically checked for accessibility violations.

The result is fast, stable feedback during development and audit-ready coverage in CI. You catch issues at the source: components. Let’s see how it works step-by-step:

![Storybook's Accessibility addon panel with violations highlighted in the canvas](https://storybookblog.ghost.io/content/images/2025/07/storybook-a11y-addon.png)

### 1\. Spot issues fast

The redesigned accessibility addon automatically checks your UI for WCAG 2.1 AA violations as you build (customizable to different compliance levels). Issues are grouped by rule and sorted by severity so you can quickly prioritize the most impactful issues.

![The Accessibility addon panel, with "color contrast" and "link name" violations. One violation is highlighted in Storybook's Canvas.](https://storybookblog.ghost.io/content/images/2025/07/image-10.png)

Click any violation to highlight the corresponding DOM node in the canvas. No guessing. No digging through the DOM.

**Engineered for reliability. No flake.**  
9.0 ships with render detection heuristics to further improve the stability of accessibility test results. Our algorithm monitors `document.getAnimations()` to detect when the UI finishes rendering. This is crucial for interactive components with animations and loading states.

### 2\. Fix violations faster

Each violation includes actionable tips to help you fix it—plus the relevant element and selector for fast inspection.

![An expanded group of "insufficient color contrast" violations, showing many details including a link to learn how to resolve them](https://storybookblog.ghost.io/content/images/2025/07/image-11.png)

**Loop in experts with permalinks**  
Accessibility isn’t fully automatable. Some rules require human judgment—especially when it comes to semantic meaning, labels, and keyboard interactions.

Storybook makes it effortless to bring accessibility pros, designers, and PMs into the review process. Every story has a unique permalink that reproduces the exact component state in their browser. For local Storybooks, it copies the localhost address. For published Storybooks, it’s a public URL that anyone on your team can access.

That means experts can jump straight to the exact UI state they need to verify—no setup, no back-and-forth.

![Zoomed-in view of a violation's "Copy link" button](https://storybookblog.ghost.io/content/images/2025/07/image-13.png)

### 3\. Instant feedback for every code change

When you update a component in your editor, Storybook reruns accessibility tests for the currently selected story and any related components (via watch mode). This ensures that every fix is verified automatically.

![Storybook reports a11y test status in the sidebar](https://storybookblog.ghost.io/content/images/2025/07/image-15.png)

### 4\. Test accessibility automatically in CI

Not every issue can be caught during development. That’s why Storybook also runs accessibility checks in CI on every pull request. This acts as a frontend safety net—if a bug slips through local dev, it won’t make it to `main`.

Under the hood, Storybook builds on Vitest to run fast, deterministic accessibility checks alongside your existing unit test suite.

![Output from Vitest CLI with accessibility violations](https://storybookblog.ghost.io/content/images/2025/06/Screenshot-2025-06-30-at-4.58.32---PM.png)

**Level up: Track accessibility debt over time with Chromatic**  
Most CI tools, including Storybook Test's CLI, are designed to surface every violation. This is great for pristine projects with few violations, but noisy when you’ve inherited accessibility debt because it’s impossible to know what’s new and what’s legacy.

To solve this problem, we’ve built [**Accessibility Regression Testing**](https://www.chromatic.com/blog/sneak-peek-accessibility-regression-testing/?ref=storybookblog.ghost.io) into Chromatic, the cloud service by Storybook maintainers. It sets a baseline for every story in your Storybook, then compares new builds against that baseline to flag only new or changed issues.

This helps your team keep shipping without unknowingly piling on more debt.

![Accessibility Regression Testing prevents new WCAG violations without blocking your CI pipeline on preexisting violations](https://storybookblog.ghost.io/content/images/2025/07/image-3.png)

### 5\. Compliance reports for stakeholders

Chromatic also generates accessibility reports across your entire Storybook. These highlight WCAG violations by component—so you can prioritize high-impact fixes like a broken `Button` that appears in dozens of pages.

Think of it as a report-generating sidekick to your VPAT process. Developers resolve actionable issues fast using Chromatic, allowing accessibility pros to focus on mopping up violations that require nuanced judgment.

![Accessibility dashboard with realtime reports](https://storybookblog.ghost.io/content/images/2025/07/image-16.png)

## Your pipeline for accessibility

**Phase**

**Tool**

**Value**

**Dev**

Storybook Test (a11y addon)

Spot and fix issues instantly. Highlight failing nodes in canvas. Share permalinks for async review.

**CI**

Storybook Test and Chromatic

Run accessibility checks on every story in CI with Storybook's CLI. Swap in Chromatic to add regression tracking to detect new/changed violations.

**Review & Reporting**

Chromatic reports + VPAT

Monitor violations by component and track changes over time. Help developers prioritize fixes while enabling auditors to verify tricky cases and prep VPAT documentation.

## Always-on accessibility compliance

If you’re already using Storybook to build components, you’re most of the way there. Now those same stories give you full accessibility coverage—during development, in CI, and beyond.

With Storybook 9, accessibility is baked into your workflow from the first commit. Give it a try in a new project:

```
npm create storybook@latest
```

If you have an existing Storybook project, first upgrade it to Storybook 9. Use our automated migration wizard to help you along the way:

```
npx storybook@latest upgrade
```

We also created a [migration guide](https://storybook.js.org/docs/9/migration-guide?ref=storybookblog.ghost.io) to help fill in the gaps.