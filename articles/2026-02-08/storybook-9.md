---
title: "Storybook 9"
source: "https://storybook.js.org/blog/storybook-9/"
publishedDate: "2025-06-03"
category: "design-systems"
feedName: "Storybook Blog"
author: "Michael Shilman"
---

Storybook’s superpower is showing every possible state of your UI in one place, from a basic button to an obscure page. That makes it the perfect foundation for automated testing.

With Storybook 9, we partnered with the latest generation of testing tools to build the ultimate component testing tool. Vitest ships the fastest test runner available. Playwright delivers unmatched browser fidelity. And of course, Storybook is the easiest way to express UI variations.

-   ▶️ **Interaction tests**: Verify functionality by simulating user behavior
-   ♿ **Accessibility tests**: Detect, diagnose, and fix WCAG violations
-   👁️ **Visual tests**: Check for appearance bugs down to the pixel
-   🛡️ **Coverage reports:** Understand which code is tested at a glance
-   🚥 **Test widget**: Click to run a comprehensive test suite

And core upgrades:

-   🪶 **48% Leaner**: Smaller install with optional docs and test packages
-   ✍️ **Story generation**: Tools to write stories automatically
-   🏷️ **Tag-based organization:** Filter and group stories by tag
-   🌐 **Story globals:** Set context (theme, viewport, locale) at the story level
-   🏗️ **Frameworks**: Major updates for Svelte, Next.js, React Native, and more!

## Say hello to Storybook Test

In Storybook 9, we teamed up with Vitest, the ecosystem’s fastest test runner, to create a superior tool for testing components. Kick off tests across all your stories at once. Enable "Watch mode" to run only the relevant tests when you save a file.

### Why test components?

Unit tests validate logic; E2E tests are best for a few key flows. Storybook Test covers the middle – your components. Component tests hit the sweet spot between the speed of unit tests and the in-browser fidelity of end-to-end (E2E) tests, while avoiding the downsides.

Storybook is the perfect tool for testing components because stories already express every variation, so adding tests to those variations is easy. This allows your test suite to scale to thousands of UI states with minimal maintenance.

![Table showing that component tests have good maintenance, iteration speed, and fidelity. Unit tests have good maintenance and iteration speed, but bad fidelity. And end-to-end tests have good fidelity, but bad maintenance and iteration speed.](https://storybookblog.ghost.io/content/images/2025/06/image.png)

### The 3 main types of frontend tests

In frontend development, there are three key dimensions that your users interact with. Storybook runs tests against these dimensions in local development and CI.

1.  **Interaction tests** – Does it work?
2.  **Accessibility tests** – Can everyone use it?
3.  **Visual tests** – Does it look right?

### Interaction tests

[Interaction tests](https://storybook.js.org/docs/writing-tests/interaction-testing?ref=storybookblog.ghost.io) simulate user behavior and assert that the component functions as expected. Storybook has supported this for years, but you could only run these tests when you navigated to the story. Now you can run all interaction tests across all your stories with a single click and report test statuses in the sidebar.

![Storybook showing a passing interaction test with the debugger panel open](https://storybookblog.ghost.io/content/images/2025/06/Image-from-Notion.png)

### Accessibility tests

Accessibility compliance is essential for modern frontends. But traditional accessibility testing methods are too late, too slow and expensive for too little coverage. Storybook lets you run [accessibility tests](https://storybook.js.org/docs/writing-tests/accessibility-testing?ref=storybookblog.ghost.io) across all your stories simultaneously and inspect the violations directly in your browser. This way, you catch WCAG violations early in the development cycle. These checks are implemented by `axe-core`, the industry standard tool.

![Storybook showing a story with accessibility violations, detailed in both the accessibility addon panel and the highlight menu in the story preview](https://storybookblog.ghost.io/content/images/2025/06/Image-from-Notion--1-.png)

### Visual tests

Visual bugs ruin even the best frontends. Storybook helps you prevent bugs by scanning all your stories to pinpoint UI changes down to the pixel. Powered by [Chromatic](https://storybook.js.org/blog/storybook-8-beta/?ref=storybookblog.ghost.io), the visual testing cloud service made by Storybook maintainers.

![Storybook showing a visual test with a highlighted difference in the visual tests panel](https://storybookblog.ghost.io/content/images/2025/06/Image-from-Notion--2-.png)

### Test coverage

Storybook’s superpower is that you can test _all_ the UI states in your application, not just happy paths. But how do you know if you've tested everything? That's where [test coverage](https://storybook.js.org/docs/writing-tests/test-coverage?ref=storybookblog.ghost.io) comes in. Compute exactly which lines, functions, and branches are exercised by your component tests.

![Two browser windows. The foreground shows the HTML coverage report. The background shows Storybook after a test run, where you can see the calculated coverage summary.](https://storybookblog.ghost.io/content/images/2025/06/Image-from-Notion--3-.png)

### Test Widget: Click to test everything

The Test Widget anchors Storybook Test. Run all tests across all stories—or configure which types to run. You can then filter the sidebar to only show stories with warnings or errors. Each test type has its own debug panel. Since Storybook runs in your own browser, you can also debug using browser dev tools.

![Storybook's test widget, showing watch mode activated. Part of the UI says "Run component tests. Watching for file changes."](https://storybookblog.ghost.io/content/images/2025/06/testing-widget.png)

## Core upgrades

### 48% Leaner

Storybook 9 is less than half the size of Storybook 8 with a flatter dependency structure that prevents conflicts in your `package.json`. The lighter weight also results in a faster install.

![A before/after of Storybook's dependency graph. The before is vastly larger and more complex.](https://storybookblog.ghost.io/content/images/2025/06/storybook-9-dep-graph-1.png)

### Story generation

[Storybook 9’s story generation](https://storybook.js.org/docs/get-started/whats-a-story?ref=storybookblog.ghost.io#working-with-stories) allows you to create and edit stories from the UI, to capture every state of your component. With the new [Test Codegen addon](https://github.com/igrlk/storybook-addon-test-codegen?ref=storybookblog.ghost.io) by Igor Luchenkov, you don't need to write code to test your components either. You can record your interactions with your component, add assertions, and save your test... all without leaving Storybook.

![Adding a new stories file for a component in Storybook](https://storybookblog.ghost.io/content/images/2025/06/story-gen.png)

### Tags-based organization

[Tags](https://storybook.js.org/docs/writing-stories/tags?ref=storybookblog.ghost.io) help you to organize and filter stories and components in large Storybooks. Tag stories based on status (`alpha`, `stable`, `deprecated`, etc.), role (`design`, `dev`, `product`), team, feature area, or whatever fits your needs. From there, you can filter the sidebar by tag or even show tags as badges using the [Storybook Tag Badges addon](https://github.com/Sidnioulz/storybook-addon-tag-badges?ref=storybookblog.ghost.io) by Steve Dodier-Lazaro.

![Storybook's sidebar with the filter menu open, showing the available tags to filter on](https://storybookblog.ghost.io/content/images/2025/06/tags.png)

### Story globals

[Story globals](https://storybook.js.org/docs/essentials/toolbars-and-globals?ref=storybookblog.ghost.io#setting-globals-on-a-story) let you set context variables—like the **theme**, **viewport**, **locale**, or **background**—on a per-story or per-component basis. That makes it easy to test and document your UI under real conditions: dark mode, mobile view, right-to-left locale, and more.

![Using a story global to toggle different themes](https://storybookblog.ghost.io/content/images/2025/06/globals.png)

```
// Button.stories.ts
export default { component: Button };

// Normal story: theme is configurable in UI
export const Default = { args: { label: 'Button' } };

// 🌎 Force this story to be in the "dark" theme 
export const Dark = {
  ...Default,
  globals: { theme: 'dark' }
};
```

## Framework improvements

Storybook supports every major frontend web framework and 9.0 has major quality of life improvements across them all.

### Vite-powered Next.js

[`@storybook/nextjs-vite`](https://storybook.js.org/docs/get-started/frameworks/nextjs?ref=storybookblog.ghost.io#with-vite) is a new, instant-on evolution of Storybook’s Next.js framework. It has the same features (Navigation/Route mocking, Image and Font components, etc.) as its Webpack-based predecessor. But since it’s based on Vite, it provides a modern development experience that is fully compatible with Storybook Test and Vitest.

![CLI output when starting Storybook with the `nextjs-vite` framework](https://storybookblog.ghost.io/content/images/2025/06/image--1-.png)

### Svelte 5 support

[The Svelte CSF](https://github.com/storybookjs/addon-svelte-csf?ref=storybookblog.ghost.io) story format has been upgraded to Svelte 5, including support for new language features like runes and snippets.

```
<Story name="Default" args={{ exampleProp: true }}>
  {#snippet template(args)}
    <MyComponent {...args}>Reactive</MyComponent>
  {/snippet}
</Story>
```

### React Native everywhere

Storybook [React Native](https://github.com/storybookjs/react-native?ref=storybookblog.ghost.io) and [React Native Web](https://storybook.js.org/docs/get-started/frameworks/react-native-web-vite?ref=storybookblog.ghost.io) can now run side-by-side in your mobile project. So you can develop components in full fidelity on devices and simulators. But you can also document and test those same stories using the full feature set of Storybook for Web.

![](https://storybookblog.ghost.io/content/images/2025/06/Image-from-Notion.webp)

Marcelo Prado's React Native Flash Calendar running side-by-side in both RNW and RN. The RNW Storybook includes the Docs and Test addons. A test run shows that the calendar passes all WCAG accessibility checks!

## Try Storybook 9 today

Try it in a new project:

```
npm create storybook@latest
```

If you have an existing Storybook project, use our automated migration wizard to help you along the way:

```
npx storybook@latest upgrade
```

We also provide a [migration guide](https://storybook.js.org/docs/9/migration-guide?ref=storybookblog.ghost.io) to help fill in the gaps.

## What’s next?

With overwhelmingly positive pre-release responses to Storybook Test and our bundle size reductions, we plan to double down in 9.x.

-   ESM-only to further reduce install size and complexity
-   Streamlined module mocking
-   Better typesafety and autocompletion for stories

For an up-to-date view on what we’re working on, check out [Storybook’s roadmap](https://github.com/orgs/storybookjs/projects/20/views/1?ref=storybookblog.ghost.io).

## Credits

### Core team

[Michael Arestad](https://twitter.com/michaelarestad?ref=storybookblog.ghost.io), [Yann Braga](https://twitter.com/yannbf?ref=storybookblog.ghost.io), [João Cardoso](https://twitter.com/xapaxa?ref=storybookblog.ghost.io), [Tom Coleman](https://twitter.com/tmeasday?ref=storybookblog.ghost.io), [Norbert de Langen](https://twitter.com/NorbertdeLangen?ref=storybookblog.ghost.io), [Kyle Gach](https://twitter.com/kylegach?ref=storybookblog.ghost.io), [Gert Hengeveld](https://twitter.com/GHengeveld?ref=storybookblog.ghost.io), [Dom Nguyen](https://twitter.com/domyen?ref=storybookblog.ghost.io), [Valentin Palkovic](https://twitter.com/vatcoop?ref=storybookblog.ghost.io), [Kasper Peulen](https://twitter.com/KasperPeulen?ref=storybookblog.ghost.io), [Jeppe Reinhold](https://twitter.com/DrReinhold?ref=storybookblog.ghost.io), [Lars Rickert](https://github.com/larsrickert?ref=storybookblog.ghost.io), [Kai Röder](https://twitter.com/kairoeder?ref=storybookblog.ghost.io), [Michael Shilman (me!)](https://twitter.com/mshilman?ref=storybookblog.ghost.io), [Varun Vachhar](https://twitter.com/winkerVSbecks?ref=storybookblog.ghost.io), [Ian Van Schooten](https://twitter.com/IanVanSchooten?ref=storybookblog.ghost.io), [Daniel Williams](https://twitter.com/Danny_H_W?ref=storybookblog.ghost.io), [Josh Wooding](https://twitter.com/JoshWooding_?ref=storybookblog.ghost.io), and [Vanessa Yuen](https://twitter.com/vanessayuenn?ref=storybookblog.ghost.io)

### Contributors

[@acusti](https://github.com/acusti?ref=storybookblog.ghost.io) [@agentender](https://github.com/agentender?ref=storybookblog.ghost.io) [@alirezaebrahimkhani](https://github.com/alirezaebrahimkhani?ref=storybookblog.ghost.io) [@ashphy](https://github.com/ashphy?ref=storybookblog.ghost.io) [@audie80](https://github.com/audie80?ref=storybookblog.ghost.io) [@b0g3r](https://github.com/b0g3r?ref=storybookblog.ghost.io) [@benmccann](https://github.com/benmccann?ref=storybookblog.ghost.io) [@dannyhw](https://github.com/dannyhw?ref=storybookblog.ghost.io) [@dummdidumm](https://github.com/dummdidumm?ref=storybookblog.ghost.io) [@edbzn](https://github.com/edbzn?ref=storybookblog.ghost.io) [@fi3ework](https://github.com/fi3ework?ref=storybookblog.ghost.io) [@filipemelo2002](https://github.com/filipemelo2002?ref=storybookblog.ghost.io) [@flaval](https://github.com/flaval?ref=storybookblog.ghost.io) [@gchqdeveloper548](https://github.com/gchqdeveloper548?ref=storybookblog.ghost.io) [@ghengeveld](https://github.com/ghengeveld?ref=storybookblog.ghost.io) [@guria](https://github.com/guria?ref=storybookblog.ghost.io) [@hakshu25](https://github.com/hakshu25?ref=storybookblog.ghost.io) [@iineineno03k](https://github.com/iineineno03k?ref=storybookblog.ghost.io) [@irinaklimova](https://github.com/irinaklimova?ref=storybookblog.ghost.io) [@jamesives](https://github.com/jamesives?ref=storybookblog.ghost.io) [@jonniebigodes](https://github.com/jonniebigodes?ref=storybookblog.ghost.io) [@jreinhold](https://github.com/jreinhold?ref=storybookblog.ghost.io) [@jsmike](https://github.com/jsmike?ref=storybookblog.ghost.io) [@kasperpeulen](https://github.com/kasperpeulen?ref=storybookblog.ghost.io) [@kenrick95](https://github.com/kenrick95?ref=storybookblog.ghost.io) [@kroeder](https://github.com/kroeder?ref=storybookblog.ghost.io) [@kylegach](https://github.com/kylegach?ref=storybookblog.ghost.io) [@larsrickert](https://github.com/larsrickert?ref=storybookblog.ghost.io) [@laupetin](https://github.com/laupetin?ref=storybookblog.ghost.io) [@leeovictor](https://github.com/leeovictor?ref=storybookblog.ghost.io) [@leoeuclids](https://github.com/leoeuclids?ref=storybookblog.ghost.io) [@makotot](https://github.com/makotot?ref=storybookblog.ghost.io) [@masstronaut](https://github.com/masstronaut?ref=storybookblog.ghost.io) [@mrginglymus](https://github.com/mrginglymus?ref=storybookblog.ghost.io) [@muhdhishamp](https://github.com/muhdhishamp?ref=storybookblog.ghost.io) [@ndelangen](https://github.com/ndelangen?ref=storybookblog.ghost.io) [@netroy](https://github.com/netroy?ref=storybookblog.ghost.io) [@notwoods](https://github.com/notwoods?ref=storybookblog.ghost.io) [@okathira](https://github.com/okathira?ref=storybookblog.ghost.io) [@rchaoz](https://github.com/rchaoz?ref=storybookblog.ghost.io) [@robertisaac](https://github.com/robertisaac?ref=storybookblog.ghost.io) [@sentience](https://github.com/sentience?ref=storybookblog.ghost.io) [@shilman](https://github.com/shilman?ref=storybookblog.ghost.io) [@sidnioulz](https://github.com/sidnioulz?ref=storybookblog.ghost.io) [@sookmax](https://github.com/sookmax?ref=storybookblog.ghost.io) [@spanishpear](https://github.com/spanishpear?ref=storybookblog.ghost.io) [@tmeasday](https://github.com/tmeasday?ref=storybookblog.ghost.io) [@tomkalina](https://github.com/tomkalina?ref=storybookblog.ghost.io) [@valentinpalkovic](https://github.com/valentinpalkovic?ref=storybookblog.ghost.io) [@vanessayuenn](https://github.com/vanessayuenn?ref=storybookblog.ghost.io) [@webpro](https://github.com/webpro?ref=storybookblog.ghost.io) [@wlewis-formative](https://github.com/wlewis-formative?ref=storybookblog.ghost.io) [@xeho91](https://github.com/xeho91?ref=storybookblog.ghost.io) [@yannbf](https://github.com/yannbf?ref=storybookblog.ghost.io) [@yatishgoel](https://github.com/yatishgoel?ref=storybookblog.ghost.io)

> Storybook 9 is here! ▶️ Interaction tests ♿ Accessibility tests 👁️ Visual tests 🛡️ Coverage reports 🚥 Test widget 🪶 48% Leaner ✍️ Story generation 🏷️ Tag-based organization 🌐 Story globals 🏗️ Major updates for Svelte, Next.js, React Native, and more! Let’s dive in!
> 
> — [Storybook (@storybook.js.org)](https://bsky.app/profile/did:plc:osfpupzlwycyr6dxic6adh7t?ref_src=embed&ref=storybookblog.ghost.io) [2025-06-03T17:05:00.092Z](https://bsky.app/profile/did:plc:osfpupzlwycyr6dxic6adh7t/post/3lqprkrffn22q?ref_src=embed&ref=storybookblog.ghost.io)