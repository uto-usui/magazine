---
title: "Testing What Users Actually See with Vitest and Chromatic"
source: "https://tympanus.net/codrops/2026/06/24/testing-what-users-actually-see-with-vitest-and-chromatic/"
publishedDate: "2026-06-24"
category: "design"
feedName: "Codrops"
author: "Kyle Gach"
---

Add fast, stable visual testing to your Browser Mode component tests

[chromatic](https://tympanus.net/codrops/tag/chromatic/) [visual testing](https://tympanus.net/codrops/tag/visual-testing/) [vitest](https://tympanus.net/codrops/tag/vitest/)

![Vitest browser test results with Chromatic plugin](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/intro-chromatic-and-vitest.jpg.webp?x68649)

_**Editor’s note:** Today, our friends at Chromatic are sharing an early look at their new visual testing plugin for Vitest. We’re excited to feature this guest article by Kyle Gach, who walks through how visual testing complements traditional component tests and helps catch UI regressions before they reach production._

Your PR to insert an “add to favorites” button is green. Every automated test passes. CI reports no failures.

Then a user reports that the product card doesn’t look right on their phone.

The test suite verified the component logic, but missed the rendered state the user saw: the breakpoint, the spacing, the wrapping, and the final painted layout.

Your Vitest tests can’t see your UI. Visual tests close that gap.

That’s why we’re opening early access to our new Chromatic plugin for Vitest.

![Two product cards. The first one is wider and looks correct. It is labeled with a green checkmark. The second one is narrower and the layout has broken. It is labeled with a red x.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/chromatic-vitest-desktop-mobile-1200x820.jpg.webp?x68649)

## Visual component tests are perfect for UI development

Visual tests are easier to write and maintain than traditional component tests. At the same time, they provide more confidence because they test more.

A traditional component test for a product card might verify that the correct title and price are rendered and the CTA has the correct text and is clickable. Visual tests go beyond that and verify that every detail of the card’s appearance is correct: the fonts in use, colors, spacing, layout, breakpoints, etc. And they cover all of that without a single assertion you have to write and maintain.

By adding visual tests to your Vitest tests, you get the best of both worlds: regular assertions for interactive behavior and non-visual output like accessibility properties plus visual tests for appearance. Users care about both, so we must test both.

## Visual testing with Vitest and Chromatic

If you’re testing your components with Vitest’s Browser Mode, the [Chromatic plugin](https://www.chromatic.com/docs/vitest/) can **add visual tests with no required changes to your test files**.

ℹ️ **What’s Browser Mode?**

Vitest runs in node. By default, it renders the components in your tests in node, too, using a simulated browser environment, like jsdom or happydom. Because it’s only simulated, you often need to mock various browser and DOM APIs. Or worse, skip testing your components’ use of them.

With [Browser Mode](https://vitest.dev/guide/browser/why.html), Vitest spins up a real (typically headless) browser and renders your components there. No more mocking browser APIs. You test all the ways your components interface with the real browser.

The tradeoff is fidelity vs. speed. Browser Mode tests are far more realistic and capable, but slightly slower because of the real browser.

Browser Mode is a requirement for visual testing with Vitest.

### How does it work?

Getting started is as simple as registering the plugin in your Vitest config:

```
// vitest.config.ts
import { defineProject } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { chromaticPlugin } from '@chromatic-com/vitest/plugin'; 

export default defineProject({
  plugins: [chromaticPlugin()], // 👈 Add this; no test file changes required
  test: {
    browser: {
      provider: playwright(),
      enabled: true,
      instances: [{ browser: 'chromium' }],
    },
  },
});
```

With the plugin in place, performing a test run will collect the rendered result at the end of each test. (You can also collect the rendered output at arbitrary points during a test.)

Then you run Chromatic, which uploads those results to the cloud, takes snapshots in parallel, computes their diffs, automatically finds and reduces flake, and finally reports the result as a PR check.

The last step is review. You approve the diffs that look correct and reject the ones that don’t. Then push the changes to fix the rejected snapshots until you’re able to approve everything and merge your PR.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/chromatic-vitest-workflow-1200x288-1.png.webp?x68649)

## How is Chromatic different than Vitest’s visual testing?

Vitest offers a built-in visual testing capability, which also requires Browser Mode. It takes screenshots of your test results, and produces diffs to review. The key difference is that it stores those screenshots in your repo, which means you must store them with git and manage updates. You also must provide the environment to capture those screenshots, which is hard to keep stable, because it can vary based on the OS, browser, installed fonts, locale, etc.

Chromatic, by contrast, collects the rendered result of your tests locally, but captures the actual visual snapshots in a stable cloud environment. This provides a number of benefits:

-   **Branch-aware baselines** track main and feature branches for you, so you don’t have to store them in git.
-   **Cloud rendering** takes snapshots in a controlled, consistent platform to reduce environmental flake
-   [**SteadySnap**](https://www.chromatic.com/features/steadysnap) stabilizes snapshots against animation, loading variance, and capture timing.
-   **Parallel snapshotting** runs your visual tests as fast as possible
-   **Chromatic collects** the rendered HTML, CSS, and assets behind each screenshot, so you can inspect the DOM and reproduce failures without running tests locally.

Or, to summarize with a table:

Comparison

Built-in Vitest visual testing

Chromatic Vitest plugin

Requires Browser Mode

Yes

Yes

Storage

In your repo

In cloud

Browser environment

Unique to every setup

Stable cloud environment

Reproductions

Static screenshot

Static screenshot & inspectable live component

Diff review

Terminal, CI logs, PR checks

Pr checks, dedicated web app

Best for

Solo developers, small libraries

Teams with production apps, design systems

## Get early access

We are opening early access to the Chromatic plugin for teams already using Vitest Browser Mode or actively moving component tests there. The beta is private, with hands-on onboarding for a limited number of teams and free snapshots while evaluating the product.

Bring a real repo, and we will validate Browser Mode collection, CI behavior, PR review, branch baselines, and debugging against it together. Early-access teams can influence the product before launch, with priority access as the beta expands.

This is a good fit if your team already uses Vitest for component tests, has started adopting Browser Mode, and wants visual regression coverage without building screenshot infrastructure around the built-in API.

_Requires Vitest Browser Mode using Playwright. We’ll follow up with onboarding details._

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/BreckenridgeMedium-160x160.png?x68649)

### [Kyle Gach](https://tympanus.net/codrops/author/kylegach/)

DX engineer at Chromatic & Storybook. Working in the overlap between design, engineering, and education. Loves reading, craft cocktails, and bike rides.

### Creative Spotlights

Inside the journeys and portfolios of today's most inspiring [designers](https://tympanus.net/codrops/tag/designer-spotlight/) and [developers](https://tympanus.net/codrops/tag/developer-spotlight/).

![](https://secure.gravatar.com/avatar/6f4def39f0c4360f11ad0aa4de30e35200ae1c5f1365f7c7249837ba3ad7f0f7?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/11/DSC_0112-awwwards-160x160.jpg?x68649)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/huy-160x160.jpeg?x68649)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Adrien_Vanderpotte_3423-1-copie-2-160x160.jpg?x68649)

![](https://secure.gravatar.com/avatar/673ba8ea1ee1d87231a6f5869cc73e976167d7c00a1165eabd9ba81a02854abb?s=160&d=retro&r=g)

![](https://secure.gravatar.com/avatar/0840447446f9c4dacd7171391e4e1634475d723bc557b93d746cd56b95ab3b43?s=160&d=retro&r=g)

![](https://secure.gravatar.com/avatar/9d360a8984abc54d8eedfca50873d7cca9d496a59378a0371d3f8ea103a3feb1?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/09/celia-160x160.jpeg?x68649)

![](https://secure.gravatar.com/avatar/5fcada51aa5e188ba78900105d1e58d88f977c45b87ae90fea631e84eaf0680f?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/01/db-social-pf-160x160.jpg?x68649)

![](https://secure.gravatar.com/avatar/2e189e28555b71adbaad5137cd62e1e333be596f3a4f89ec14d2c60e736049ba?s=160&d=retro&r=g)

![](https://secure.gravatar.com/avatar/2312d29cfd3a049ca9a21acce720d8d4b77ab2d002e59cb3cf8abd293019fd4c?s=160&d=retro&r=g)

### [Studio Stories](https://tympanus.net/codrops/tag/studio-spotlight/)

Discover how studios & agencies started, how they work, and what they've built.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/03/ava-160x160.png?x68649)

![](https://secure.gravatar.com/avatar/23a6300fe4080c3fbc7d7e6deaa885b96c829a6358c86db198f200f5cb676090?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/logo-160x160.png?x68649)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/lemma-logo-160x160.png?x68649)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/basementstudio_logo-160x160.jpeg?x68649)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/Logo-San-Rita-160x160.jpg?x68649)

### [Case Studies](https://tympanus.net/codrops/tag/case-study/)

Discover the ideas, design, and craft behind today’s most inspiring web experiences.