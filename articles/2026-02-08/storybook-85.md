---
title: "Storybook 8.5"
source: "https://storybook.js.org/blog/storybook-8-5/"
publishedDate: "2025-01-18"
category: "design-systems"
feedName: "Storybook Blog"
author: "Michael Shilman"
---

Storybook is the industry standard workshop for building, documenting, and testing UI components. Hundreds of thousands of developers use it every week, including teams at Brex, Slack, and Audi.

[Storybook Test](https://storybook.js.org/blog/storybook-test-sneak-peek/?ref=storybookblog.ghost.io) is our effort to bring best practice component testing to frontend development by making it **fast** and **easy**. Component tests are **fast** because you don’t need to spin up your entire product stack to test your UI. And [Storybook’s component tests](https://storybook.js.org/blog/component-testing/?ref=storybookblog.ghost.io) are **easy** because we have a better way to write, run, and debug tests with realtime feedback.

But just because a UI works as intended doesn’t mean that it's accessible for everybody. Even carefully crafted user interfaces can unintentionally exclude users with visual, auditory, motor, or cognitive impairments.

That’s why I’m excited to announce Storybook 8.5. We’ve upgraded Storybook’s popular Accessibility (a11y) addon to run Axe a11y checks against all your stories as you develop. This makes it dramatically easier to ensure that your UIs meet basic a11y guidelines.

Storybook 8.5 includes:

-   ♿️ **Realtime accessibility tests** to help build UIs for everybody
-   🛡️ **Project code coverage** to measure the completeness of your tests
-   🎯 **Focused tests** for faster test feedback
-   ⚛️ **React Native Web Vite framework** for testing mobile UI
-   🎁 **Storybook test bootcamp** to level up your testing game
-   💯 **Hundreds more improvements**

## Realtime accessibility tests

Accessibility (a11y) is increasingly required in modern user interfaces. It is becoming mandated for private service, e.g. the [European accessibility act](https://ec.europa.eu/social/main.jsp?catId=1202&ref=storybookblog.ghost.io) which goes into law in June 2025, and is already enforced for many government services around the world.

Storybook’s Accessibility addon, `@storybook/addon-a11y`, checks your stories for common a11y issues. It’s built on `axe-core`, an industry standard library that checks the DOM with a suite of [rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md?ref=storybookblog.ghost.io) that implement the Web Content Accessibility Guidelines (WCAG) as well as a collection of best practices.

Until now, you would browse to a story, diagnose its violations, and then fix them.

![Storybook open to a story showing accessibility violations in the addon panel](https://storybookblog.ghost.io/content/images/2025/01/addon-a11y-panel.png)

This is a great workflow to manually improve your UI’s accessibility. However, it does not help you understand the impact of a code change across your entire UI.

Now in Storybook 8.5, you can run the same a11y suite across your entire Storybook, and get realtime feedback on every story, with just one click of a button. Please stay tuned for a detailed post on the accessibility improvements!

0:00

/0:19

![](https://storybookblog.ghost.io/content/media/2025/01/addon-a11y-test-run_thumb.jpg)

## Project code coverage

One huge benefit of component tests is that they are fast and relatively flake-free. This means that you can cover all key UI states in your tests — something that is not practical with end-to-end tests.

But how do you know what’s been tested? Code coverage measures which lines/branches of your UI code are getting run with each of your tests, and is a great way to help ensure that your test suite is complete.

To surface this information, we’ve built coverage into Storybook Test UI:

![Two browser windows. The first shows Storybook's sidebar, including a line that says "Coverage 66%". The second shows an HTML coverage report.](https://storybookblog.ghost.io/content/images/2025/01/addon-test-coverage-summary-and-report.png)

When you opt in, Storybook Test collects coverage during a test run and displays a summary in UI. Click on the results to bring up a full report, where you can see the detailed results for each file in your project, and even the individual lines/branches.

Storybook Test Coverage is available in Storybook 8.5. Please see the [documentation](https://storybook.js.org/docs/writing-tests/test-coverage?ref=storybookblog.ghost.io#with-storybook-test) for details.

## Focused tests

Storybook Test is built on the principle of instant feedback, which is why it surfaces test results in the workshop where you build your components. We’ve partnered with Vitest for blazing fast tests, but full test runs can slow down as your Storybook grows to hundreds or thousands of stories.

That’s why we’ve introduced Focused Tests, which lets you test a single story, component, or group of components in Storybook’s hierarchical sidebar. In practice, we’ve found this helpful while working on components that aren’t reused, while still having the safety of a full test run in CI to catch unknown issues.

0:00

/0:06

![](https://storybookblog.ghost.io/content/media/2025/01/sb-test-focused-tests-optimized_thumb.jpg)

Storybook Focused Tests are available in Storybook 8.5. Please see the [documentation](https://storybook.js.org/docs/writing-tests/test-addon?ref=storybookblog.ghost.io#storybook-ui) for details.

## React Native Web Vite framework

The recently-released [React Native Storybook 8](https://storybook.js.org/blog/react-native-storybook-8/?ref=storybookblog.ghost.io) provides a next-level experience for building out React Native (RN) user interfaces in native fidelity on your mobile device or simulator.

But what if you want to document your native components with Storybook Docs or test them with Storybook Test? The React Native Web Vite (RNW-Vite) framework uses [React Native Web](https://necolas.github.io/react-native-web/?ref=storybookblog.ghost.io) to render your RN stories in the browser. And unlike the native version, it is fully compatible with Storybook’s 500+ public addons.

![](https://storybookblog.ghost.io/content/images/2025/01/CleanShot-2025-01-20-at-11.17.04@2x-1.png)

Marcelo Prado's React Native Flash Calendar running side-by-side in both RNW and RN. The RNW Storybook includes the Docs and Test addons. A test run shows that the calendar passes all WCAG accessibility checks!

RNW-Vite is an officially supported framework that will replace the community-maintained, Webpack-based [RNW addon](https://github.com/storybookjs/addon-react-native-web/tree/main?ref=storybookblog.ghost.io). It is faster and easier to setup than its predecessor, and is compatible with Storybook Test, which requires a Vite-based framework.

RNW-Vite is available in Storybook 8.5. Please see the [documentation](https://storybook.js.org/docs/get-started/frameworks/react-native-web-vite?renderer=react-native-web&ref=storybookblog.ghost.io) for details.

## Storybook Test bootcamp

Over the past two months, we completed the first iteration of the Storybook Test early access program. 400+ participants joined us to kick the tires and provide feedback on the new testing features with hands-on help from the Storybook maintainers. Storybook 8.5 is a product of their feedback! Huge thanks to everyone who took part!

We’ve decided to continue the program—this time as the **Storybook Test Bootcamp**—to help even more folks get excited about testing in Storybook, especially now that accessibility and coverage tests are available. We’ll be sending out more details soon, so sign up to learn more.

**👉** [**Sign up for the Storybook Test Bootcamp**](https://storybook.js.org/sb-test-eap?ref=storybookblog.ghost.io)

## Hundreds more improvements

In addition to the features above, every Storybook release contains hundreds of improvements and bug fixes at every level. Some highlights:

-   ✅ React 19 support
-   ✅ Vite 6 support
-   ✅ Angular 19 support [#29659](https://github.com/storybookjs/storybook/pull/29659?ref=storybookblog.ghost.io) [#29677](https://github.com/storybookjs/storybook/pull/29677?ref=storybookblog.ghost.io)
-   ✅ Code addon panel [#29253](https://github.com/storybookjs/storybook/pull/29253?ref=storybookblog.ghost.io)
-   ✅ Experimental Bun support [#29267](https://github.com/storybookjs/storybook/pull/29267?ref=storybookblog.ghost.io)
-   ✅ Svelte Storybook Test support [#30105](https://github.com/storybookjs/storybook/pull/30105?ref=storybookblog.ghost.io)
-   ✅ Experimental Nuxt support [#28607](https://github.com/storybookjs/storybook/pull/28607?ref=storybookblog.ghost.io)

## Try it today!

Storybook 8.5 is available today. Try it in a new project:

```
npx storybook@latest init
```

Or upgrade an existing project:

```
npx storybook@latest upgrade
```

If you’re upgrading from 7.x, [we have a guide to help you](https://storybook.js.org/docs/migration-guide?ref=storybookblog.ghost.io). We also have [a guide for migrating from older versions](https://storybook.js.org/docs/migration-guide/from-older-version?ref=storybookblog.ghost.io).

## What’s next?

We have one more minor release before Storybook 9. Here’s what's cooking.

-   [CSF factories for typesafety and autocompletion](https://github.com/storybookjs/storybook/discussions/30112?ref=storybookblog.ghost.io)
-   Test and Docs install for new projects
-   [Storybook Test](https://storybook.js.org/blog/storybook-test-sneak-peek/?ref=storybookblog.ghost.io) fixes and improvements

For an up-to-date view on what we’re working on and considering, check out [Storybook’s roadmap](https://github.com/orgs/storybookjs/projects/20/views/1?ref=storybookblog.ghost.io).

## Credits

Huge shoutout to the 36 contributors whose PRs feature in Storybook 8.5!

[@borgund](https://github.com/borgund?ref=storybookblog.ghost.io) [@daleseo](https://github.com/daleseo?ref=storybookblog.ghost.io) [@dannyhw](https://github.com/dannyhw?ref=storybookblog.ghost.io) [@ghengeveld](https://github.com/ghengeveld?ref=storybookblog.ghost.io) [@grantwforsythe](https://github.com/grantwforsythe?ref=storybookblog.ghost.io) [@ianvs](https://github.com/ianvs?ref=storybookblog.ghost.io) [@ingowagner](https://github.com/ingowagner?ref=storybookblog.ghost.io) [@jameshenry](https://github.com/jameshenry?ref=storybookblog.ghost.io) [@joca96](https://github.com/joca96?ref=storybookblog.ghost.io) [@johannesfischer](https://github.com/johannesfischer?ref=storybookblog.ghost.io) [@jonniebigodes](https://github.com/jonniebigodes?ref=storybookblog.ghost.io) [@jreinhold](https://github.com/jreinhold?ref=storybookblog.ghost.io) [@kasperpeulen](https://github.com/kasperpeulen?ref=storybookblog.ghost.io) [@kylegach](https://github.com/kylegach?ref=storybookblog.ghost.io) [@larsrickert](https://github.com/larsrickert?ref=storybookblog.ghost.io) [@leosvelperez](https://github.com/leosvelperez?ref=storybookblog.ghost.io) [@mrginglymus](https://github.com/mrginglymus?ref=storybookblog.ghost.io) [@ndelangen](https://github.com/ndelangen?ref=storybookblog.ghost.io) [@radovenchyk](https://github.com/radovenchyk?ref=storybookblog.ghost.io) [@rdebeasi](https://github.com/rdebeasi?ref=storybookblog.ghost.io) [@schallerala](https://github.com/schallerala?ref=storybookblog.ghost.io) [@sentience](https://github.com/sentience?ref=storybookblog.ghost.io) [@shilman](https://github.com/shilman?ref=storybookblog.ghost.io) [@sidnioulz](https://github.com/sidnioulz?ref=storybookblog.ghost.io) [@slax57](https://github.com/slax57?ref=storybookblog.ghost.io) [@spanishpear](https://github.com/spanishpear?ref=storybookblog.ghost.io) [@tmeasday](https://github.com/tmeasday?ref=storybookblog.ghost.io) [@tobiasdiez](https://github.com/tobiasdiez?ref=storybookblog.ghost.io) [@toothlessdev](https://github.com/toothlessdev?ref=storybookblog.ghost.io) [@valentinpalkovic](https://github.com/valentinpalkovic?ref=storybookblog.ghost.io) [@valeras](https://github.com/valeras?ref=storybookblog.ghost.io) [@vanessayuenn](https://github.com/vanessayuenn?ref=storybookblog.ghost.io) [@yannbf](https://github.com/yannbf?ref=storybookblog.ghost.io)

> Storybook 8.5 is out!
> 
> ♿️ Realtime a11y tests to help build UIs for everybody  
> 🛡️ Project code coverage to measure test completeness  
> 🎯 Focused tests for fast feedback  
> ⚛️ React Native Web Vite framework for testing mobile UI  
> 🎁 Storybook test bootcamp to level up your testing game
> 
> — Storybook (@storybookjs) [January 21, 2025](https://twitter.com/storybookjs/status/1881752469929365789?ref_src=twsrc%5Etfw&ref=storybookblog.ghost.io)