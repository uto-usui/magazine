---
title: "Storybook 9 is now in beta"
source: "https://storybook.js.org/blog/storybook-9-beta/"
publishedDate: "2025-04-25"
category: "design-systems"
feedName: "Storybook Blog"
author: "Michael Shilman"
---

Storybook 9 is our most ambitious release yet. Beta signifies that 9 is feature complete and ready for your project, but we still need your help to cross the finish line.

Our goal is to turn Storybook into a lean, mean testing machine. Here’s what’s inside:

🚥 Component test widget  
▶️ Interaction testing  
♿️ Accessibility testing  
👁️ Visual testing  
🛡️ Test coverage  
🪶 48% lighter bundle  
🏷️ Tags-based organization  
⚛️ React Native for device and web

![Storybook's test widget. It's titled "Run components tests". Under that is "Testing... 1/97" with an eye and stop icons beside them. Then three rows of checkboxes labeled, Interactions, Coverage, and Accessibility, each with a gray status dot. Under that is another section, titled "Run visual tests in cloud". The final section has a "Run tests" button.](https://storybookblog.ghost.io/content/images/2025/04/keyframe-3.jpg)

## Component testing

Component tests are the Goldilocks of UI tests, combining the speed and reliability of unit tests with the in-browser fidelity of end-to-end (E2E) tests. Unlike E2E tests which are better suited to small numbers of happy-path user flows, it's possible to write and maintain thousands of component tests, giving you full coverage over _all_ your key UI states.

We've teamed up with Vitest, the ecosystem’s fastest test runner, to create a superior tool for testing your components as you develop them.

### Interaction testing

[Interaction tests](https://storybook.js.org/docs/writing-tests/interaction-testing?ref=storybookblog.ghost.io) help you simulate user behavior and assert that components function correctly. They can now be run individually, in a batch, or across the whole Storybook. Enable watch mode to run them whenever you save changes.

![Storybook with the Filled Form story for the LoginForm component open. The Interactions panel is open, showing a passing test with the interactive debugger and each step of the interaction, all of which are successful.](https://storybookblog.ghost.io/content/images/2025/04/sb-9-beta-interactions-1.png)

### Accessibility testing

We've overhauled our accessibility workflow. Just like the functional tests described above, you can now run [accessibility tests](https://storybook.js.org/docs/writing-tests/accessibility-testing?ref=storybookblog.ghost.io) across all your stories, and inspect the violations through a new, efficient UI.

![Storybook, with the Empty Form story of the LoginForm component open. In the preview, a gray button is highlighted and a popover informs about a color contrast ratio violation. The Accessibility panel is open and more details about that violation are shown.](https://storybookblog.ghost.io/content/images/2025/04/sb-9-beta-a11y-3.png)

### Visual testing

At the click of a button, you can [visually test](https://storybook.js.org/docs/writing-tests/visual-testing?ref=storybookblog.ghost.io) all your stories simultaneously to pinpoint changes down to the pixel.

![Storybook with the Primary story of the Button component open. The Visual tests panel is open, showing a visual diff between the baseline and the latest snapshot.](https://storybookblog.ghost.io/content/images/2025/04/sb-9-beta-vta-2.png)

### Test coverage

With the click of a button, you can calculate [test coverage](https://storybook.js.org/docs/writing-tests/test-coverage?ref=storybookblog.ghost.io) to find out exactly which lines, functions, and branches are exercised by your component tests.

![Two browser windows. The foreground window shows an interactive coverage report. Many of the files have 100% coverage and are highlighted green, but card.tsx has 74% and is highlighted yellow. The background window shows Storybook's sidebar, where the coverage summary of 95% is visible.](https://storybookblog.ghost.io/content/images/2025/04/sb-9-beta-coverage-2.png)

## 48% lighter weight

Storybook 9 is less than half the size of Storybook 8. Its dependency structure is also much flatter; it installs faster and won't conflict with any of your project dependencies.

![Dependency graph, Before, A full-height, very complex dependency graph. After, a much simpler graph approximately 10% the size of the other one.](https://storybookblog.ghost.io/content/images/2025/04/sb-9-beta-dependency-graph.jpg)

Dependency graphs for Storybook 8 (left) vs. 9 (right)

[Storybook Tags](https://storybook.js.org/docs/writing-stories/tags?ref=storybookblog.ghost.io) are a new way to organize and filter your stories in the sidebar.

![Storybook's sidebar with the filter menu on the search bar open. There are two options, experimental and play-fn. The sidebar has been filtered to only show the Experimental Feature story under the Button component.](https://storybookblog.ghost.io/content/images/2025/04/sb-9-beta-tags-2.png)

## React Native everywhere

We've brought official [web support for React Native](https://storybook.js.org/docs/get-started/frameworks/react-native-web-vite?ref=storybookblog.ghost.io), bringing full compatibility with Storybook’s documentation and testing features to React Native!

![](https://storybookblog.ghost.io/content/images/2025/04/image.png)

Marcelo Prado's React Native Flash Calendar running side-by-side in both RNW and RN. The RNW Storybook includes the Docs and Test addons. A test run shows that the calendar passes all WCAG accessibility checks!

## Upgrade easily with automigrations

You can upgrade your project to beta today with a single command:

```
npx storybook@next upgrade
```

Our automigration system will detect any relevant breaking changes and guide you through the process step-by-step, providing codemods where possible to automate as much as we can. We’ve also provided a [migration guide](https://storybook.js.org/docs/migration-guide?ref=storybookblog.ghost.io) to help fill in the gaps.

### We need your feedback on 9 beta

We've already done rounds of thorough testing, so you should have a smooth upgrade. But the more projects we can test the better. If you have any issues in your project, please let us know by filing a [GitHub issue](https://github.com/storybookjs/storybook/issues?q=sort%3Aupdated-desc+is%3Aissue+is%3Aopen&ref=storybookblog.ghost.io). The entire team is on deck, waiting to fix bugs and answer questions as they come in.

> Storybook 9 is now in beta! It’s ready for you to try today. Let’s see what’s inside…
> 
> — [Storybook (@storybook.js.org)](https://bsky.app/profile/did:plc:osfpupzlwycyr6dxic6adh7t?ref_src=embed&ref=storybookblog.ghost.io) [2025-04-24T20:03:42.562Z](https://bsky.app/profile/did:plc:osfpupzlwycyr6dxic6adh7t/post/3lnlivip7qk27?ref_src=embed&ref=storybookblog.ghost.io)