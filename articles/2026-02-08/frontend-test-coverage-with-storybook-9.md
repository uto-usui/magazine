---
title: "Frontend test coverage with Storybook 9"
source: "https://storybook.js.org/blog/frontend-test-coverage-with-storybook-9/"
publishedDate: "2025-06-17"
category: "design-systems"
feedName: "Storybook Blog"
author: "Dominic Nguyen"
---

Frontend coverage has always been frustrating. With backend code, you can throw a unit test at every function and call it a day. But frontend UIs are dynamic, stateful, and dependent on rendering context—like browsers, devices, and user preferences. This makes it difficult to track coverage for frontends. Traditional tools can’t keep up with the explosion of UI states in modern apps.

**Storybook 9 brings frontend coverage into focus.** It tracks how much of your component code is exercised by stories to give you granular visibility into what needs testing. This post shows you how to integrate coverage into your development workflow with Storybook.

## Why frontend coverage matters

The aim of frontend testing is to verify that the UI works as a user would experience it. The first step is confirming that every relevant component state is represented in a test.

Coverage tells you what states are missing from tests. It scans the underlying component code to highlight which branches and conditions are exercised by tests—and which aren’t. Storybook adapts coverage analysis to work directly with your `*.stories` files.

### Stories give you expansive coverage for free

When you write stories, you naturally record the key states of your UI. In Storybook 9, every story is automatically testable across three dimensions:

-   **Interaction** – Simulate real user events with Vitest
-   **Accessibility** – Audit for WCAG violations with `axe-core`
-   **Visual** – Detect pixel-level regressions with Chromatic

With Storybook coverage, you can see how much of your component code is tested by stories. That creates a tight feedback loop:

![](https://storybookblog.ghost.io/content/images/2025/05/test-coverage-development.gif)

Write stories → check coverage → fill gaps → repeat

## The frontend coverage workflow

Storybook 9 includes a new coverage workflow that makes it easy to test, measure, and improve your component coverage—right from your development environment.

### 1\. Run your tests

Run all your tests with a single click or command. Storybook executes interaction tests (Vitest), accessibility checks (axe), and visual tests (Chromatic) against each story.

You can run tests directly inside Storybook using the built-in test widget, or run them headlessly in CI without booting the Storybook UI at all.

![Storybook's test widget, showing a 56% coverage summary](https://storybookblog.ghost.io/content/images/2025/06/Screenshot-2025-06-16-at-10.07.04---PM.png)

### 2\. See what’s not covered

The coverage report highlights:

-   Components that don’t have stories
-   Lines of code not exercised by any story
-   Branches and prop combinations that haven’t been tested

It’s powered by Vitest and fully compatible with industry tools like Istanbul, so you can include frontend metrics in the same reports you use for backend and service-layer coverage.

![Two browser windows. The foreground is an interactive coverage report showing Card to be the only source file with poor coverage. The background is the Storybook app.](https://storybookblog.ghost.io/content/images/2025/06/Frontend-Test-Coverage-with-Storybook-9.png)

Drilling into the Card component in this example, we can see that the CardAction and CardFooter sub-components are not yet tested:

![The source code of the Card component and it sub-components, annotated with coverage reporting. The CardAction and CardFooter functions are uncovered.](https://storybookblog.ghost.io/content/images/2025/06/CleanShot-2025-06-16-at-22.24.51@2x.png)

### 3\. Fill in the gaps

Storybook includes tools to quickly increase coverage:

**For components with no stories**

Click the “Add Story” button to generate a new story file with default arguments, or write a `*.stories.ts` file manually.

![Storybook's sidebar with the "Add new component" button highlighted](https://storybookblog.ghost.io/content/images/2025/06/CleanShot-2025-06-16-at-22.08.34@2x.png)

**For components with partial coverage**

Use the Controls panel to tweak props, then click “Create a new story” to capture that state as a new story. Or write a story manually to target a branch or prop configuration.

![A toolbar with three buttons, Save, New, and Reset. A status text says "Unsaved changes"](https://storybookblog.ghost.io/content/images/2025/06/Screenshot-2025-06-16-at-10.10.40---PM.png)

### 4\. Re-run the test suite to confirm

Once you’ve added stories, re-run your tests. The coverage report updates immediately to reflect which lines of code are now exercised.

You can see that our new stories for CardAction and CardFooter gave us full coverage.

![Two browser windows. The foreground is an interactive coverage report showing all files to have full coverage. The background is the Storybook app.](https://storybookblog.ghost.io/content/images/2025/06/Screenshot-2025-06-16-at-10.27.07---PM.png)

* * *

## **Where Storybook fits in your frontend testing strategy**

**Test Type**

**Strengths**

**Limitations**

End-to-end

Validates real user flows across systems

Slow, flaky, limited coverage

Storybook tests

High coverage of UI states, fast, reliable

Doesn’t test full app behavior

Each test type solves a unique problem. For a comprehensive testing strategy you need both.

-   End-to-end tests are essential for verifying critical user flows—login, checkout, onboarding. But they’re expensive to write and maintain which constrains how much of your app is worth testing with them.
-   Storybook tests pick up where E2E leaves off by providing broad coverage across the full surface area of your components—props, themes, edge states, viewports, and more. All without flake or maintenance overhead.

* * *

## **Use AI to accelerate coverage**

The foundational models that power Cursor, ChatGPT, Claude, and Windsurf trained on thousands of stories. This allows them to generate stories directly from your component code.

Storybook’s coverage tools help you discern what needs coverage. AI can help you add the necessary stories to untested UIs. While it isn’t perfect, it’s a solid starting point that you can refine later.

* * *

## Get started

Storybook 9 gives you a focused workflow for writing, testing, and tracking UI coverage. It helps ensure that even the most obscure edge case behaves as expected. And it integrates with your existing coverage tooling to give the whole team visibility into what’s tested.

You already write stories. Storybook 9 shows you how much of the frontend they cover. Try it in a new project:

```
npm create storybook@latest
```

If you have an existing Storybook project, first upgrade it to Storybook 9. Use our automated migration wizard to help you along the way:

```
npx storybook@latest upgrade
```

We also created a [migration guide](https://storybook.js.org/docs/9/migration-guide?ref=storybookblog.ghost.io) to help fill in the gaps.

* * *

## Learn more

If you want to learn more or have some questions, we're hosting a live session next week all about test coverage in Storybook:

🗓️ June 26 | 🕗 12:00pm ET / 18:00 CET  
📍 Live Zoom webinar  
🔗 [**Register here →**](https://us02web.zoom.us/webinar/register/3017502664055/WN_-VZe5M9bRwqvpcMqq7SvfA?ref=storybookblog.ghost.io)

* * *

> Our latest post walks through how to use the coverage reporting in Storybook 9 to be sure your components are well-tested.
> 
> — [Storybook (@storybook.js.org)](https://bsky.app/profile/did:plc:osfpupzlwycyr6dxic6adh7t?ref_src=embed&ref=storybookblog.ghost.io) [2025-06-18T18:38:01.074Z](https://bsky.app/profile/did:plc:osfpupzlwycyr6dxic6adh7t/post/3lrvnqvqpek2u?ref_src=embed&ref=storybookblog.ghost.io)