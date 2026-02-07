---
title: "Component Test with Storybook and Vitest"
source: "https://storybook.js.org/blog/component-test-with-storybook-and-vitest/"
publishedDate: "2025-07-30"
category: "design-systems"
feedName: "Storybook Blog"
author: "Dominic Nguyen"
---

You already use Storybook to build UI states. With Storybook 9, we evolved our testing workflows using the latest generation of tools. We partnered with Vitest, which ships the fastest test runner available, to build the ultimate component testing workflow. It includes:

👆 Interaction tests  
♿️ Accessibility tests  
🖼️ Visual tests  
🛡️ Coverage reports  
🚥 Test widget to run tests automatically

## Why component tests?

[Component tests](https://storybook.js.org/docs/9/writing-tests/component-testing?ref=storybookblog.ghost.io) hit the sweet spot between the speed of unit tests and the in-browser fidelity of end-to-end (E2E) tests with none of the downsides.

Component tests scale to thousands of UI states with minimal maintenance. Unit tests validate logic; E2E tests are best for a few key flows. Storybook Test covers the middle: your components.

Storybook is perfect for component testing because stories already express every component variation so adding tests to those variations is easy.

![Table grading unit tests, component tests, and end-to-end tests across dimensions of maintenance, iteration speed, and fidelity. Unit tests have poor fidelity. End-to-end tests have OK maintenance and poor iteration speed. Component tests are good in all three dimensions.](https://storybookblog.ghost.io/content/images/2025/07/component-tests-comparison-table.png)

## The 3 types of component tests

In frontend development, there are three core dimensions to test. Storybook supports these tests out-of-the-box in local development and in CI.

1.  Does it work? **Interaction tests**
2.  Can everyone use it? **Accessibility tests**
3.  Does it look right? **Visual tests**

### Interaction tests

Interaction tests simulate user behavior and assert that the component functions as expected. Storybook has supported this test type for years via the `play` function, but you could only run these tests when you navigated to the story. Now you can run all interaction tests across all your stories with a single click and report test statuses in the sidebar thanks to Vitest.

![Two windows. A code editor showing the source of an interaction test (a story) is in the foreground. A browser window showing Storybook with test statuses in the sidebar is in the background.](https://storybookblog.ghost.io/content/images/2025/07/interaction-test.png)

Clicking on an interaction test failure in the sidebar takes you to the Interactions panel. It allows you to step forwards and backwards through the play function and inspect the story at every step along the way.

![Storybook's interaction test debugger panel, showing a passing test.](https://storybookblog.ghost.io/content/images/2025/07/Image-from-Notion.png)

🚥

All tests can run in your CI environment even without Storybook

### Accessibility tests

Accessibility tests scan the rendered DOM to verify that it meets the Web Content Accessibility Guidelines (WCAG). These checks are implemented by `axe-core`, the industry standard tool.

9.0 introduces a redesigned A11y panel, improved violation highlighting, and deep linking to streamline debugging.

![Storybook's Accessibility panel, showing a violation. That same violation is highlighted on the offending element in the canvas.](https://storybookblog.ghost.io/content/images/2025/07/Image-from-Notion--1-.png)

The panel has been overhauled to group violations by type, and allows you to debug each failure by highlighting it in the story and providing useful info on how to fix it.

Our sister tool, Chromatic, just introduced [Accessibility Regression Testing](https://www.chromatic.com/features/accessibility-test?ref=storybookblog.ghost.io) (ART) in the cloud. Most teams have preexisting accessibility debt and can’t drop everything to fix every violation. ART sets a baseline for preexisting violations and stops new WCAG bugs from being introduced. That way you can continue shipping and prioritize debt at your own pace.

![Chromatic's accessibility regression testing, showing a violation highlighted on the snapshot](https://storybookblog.ghost.io/content/images/2025/07/image-17.png)

Detect new violations in your pull request by comparing to a WCAG baseline

### Visual tests

Visual tests compare the appearance of your UI before and after a code change to prevent visual bugs. The best part about visual testing is that you don't need to write any new test code.

Storybook visual tests use Chromatic, a cloud service developed by Storybook maintainers which offers parallelization and consistency across thousands of tests.

When it detects a visual difference, It shows up as a warning in the sidebar. Clicking on that warning takes you to the Visual tests panel, which shows the image difference of the before and after states.

![Storybook's Visual tests panel, showing a visual change in the Button component](https://storybookblog.ghost.io/content/images/2025/07/Image-from-Notion--2-.png)

The Test widget anchors Storybook Test. One click runs all tests across all stories—or configure which types to run. Enable watch mode to instantly rerun only the affected tests when you save.

![Storybook's test widget, divided into three sections. First is "Run component tests, testing... 1/97" with an eye icon and a progress indicator circling a stop icon. Underneath are checkboxes labeled Interactions, Coverage, and Accessibility. Next is "Run visual tests in the cloud" with a play icon. Last is "Run tests" with a downward pointing chevron.](https://storybookblog.ghost.io/content/images/2025/07/test-widget.jpg)

You can then filter the sidebar to only show stories with warnings or errors. Each test type has its own debug panel. Since Storybook runs in your own browser, you can also debug using browser dev tools.

![Storybook's sidebar filtered to only show test errors, with the Interactions panel displaying the error.](https://storybookblog.ghost.io/content/images/2025/07/filter-failures.png)

### Batch testing

Batch test a single story, component, or folder to speed up feedback. Perfect for large Storybooks with thousands of stories.

![The sidebar menu for a story is open. It has three items: Run component tests with a play button, Interactions with a checkmark, and Accessibility with a triangle and "17"](https://storybookblog.ghost.io/content/images/2025/07/batched-tests.png)

## Test coverage

Code coverage compares component code with story code to surface which lines of code & branches are executed by tests. Coverage is built into Storybook to help you ensure that your test suite covers every key UI variation.

![Two windows. A browser window showing the interactive coverage report is in the foreground. Another browser window with Storybook is in the background, where you can see "Coverage 95%"](https://storybookblog.ghost.io/content/images/2025/07/Image-from-Notion--3-.png)

## Powered by Vitest

We chose Vitest because it’s the defacto successor to Jest with better performance and developer experience. Vitest’s test runner powers Storybook Test in our sidebar and enables you to run in the CLI/CI without needing Storybook at all.

Vitest will treat all your stories as tests and outputs results alongside Vitest unit tests.

What’s more, adopting Vitest unlocks a whole ecosystem of integrations for you. For instance, you can run all your Vitest tests from within Visual Studio Code and see the results inline as you edit your code. Since Storybook stories are Vitest tests, you get the same seamless workflow across component and unit tests.

![VS Code showing the source of a stories file. One of the stories' source lines is highlighted and annotated with output from the Vitest extension](https://storybookblog.ghost.io/content/images/2025/07/vitest-plugin-vscode.png)

## Try it today

Storybook Test is part of the recommended install in new Storybook 9 projects.

```
npm create storybook@latest
```

If you have an existing Storybook project, first upgrade it to Storybook 9. Use our automated migration wizard to help you along the way:

```
npx storybook@latest upgrade
```

Then add the Vitest addon to get the core component testing experience. You can also add the Accessibility addon and Visual Test addons.

```
npx storybook add @storybook/addon-vitest
npx storybook add @storybook/addon-a11y
npx storybook add @chromatic-com/storybook
```

Get full docs and examples in the [Storybook Test docs](https://storybook.js.org/docs/writing-tests?ref=storybookblog.ghost.io).

## What’s next?

Storybook 9 is the culmination of a year's worth of work building Storybook Test. Our vision is to create the most ergonomic batteries-included UI testing tool. To that end, we're considering the following improvements:

-   First class MSW data mocking.
-   Automatic multi-viewport / theme / locale testing
-   Syntactic sugar for multiple test steps per story

We want your feedback to help prioritize Storybook’s direction. [Join the discussion on GitHub →](https://github.com/storybookjs/storybook/discussions?ref=storybookblog.ghost.io)

> Have you tried component testing in Storybook yet? We partnered with @vitest.dev to build the \*best\* tool for testing your components in the ways that matter. 👆 Interaction tests ♿️ Accessibility tests 🖼️ Visual tests 🛡️ Coverage reports 🚥 Test widget to run tests automatically
> 
> — [Storybook (@storybook.js.org)](https://bsky.app/profile/did:plc:osfpupzlwycyr6dxic6adh7t?ref_src=embed&ref=storybookblog.ghost.io) [2025-07-29T19:17:01.646Z](https://bsky.app/profile/did:plc:osfpupzlwycyr6dxic6adh7t/post/3lv4t2frzac2h?ref_src=embed&ref=storybookblog.ghost.io)