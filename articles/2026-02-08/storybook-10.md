---
title: "Storybook 10"
source: "https://storybook.js.org/blog/storybook-10/"
publishedDate: "2025-10-29"
category: "design-systems"
feedName: "Storybook Blog"
author: "Michael Shilman"
---

Storybook 10 contains one breaking change: it’s ESM-only. By removing CommonJS from published code, we’ve simplified Storybook and reduced its install size by 29% while simultaneously un-minifying our distribution for easier debugging.

Storybook 10 also includes key improvements to level up your UI development, documentation, and testing workflows:

-   🧩 Module automocking for easier testing
-   🏭 Typesafe CSF factories Preview for React
-   💫 UI editing and sharing optimizations
-   🏷️ Tag filtering exclusion for sidebar management
-   🔀 Svelte async components, Next 16, Vitest 4, and more

And finally, while you’re here, we’re also excited to share some experimental work for feedback:

-   🧪 Test syntax for familiarity and reduced sidebar clutter
-   ⚛️ Component testing RSCs

## ESM-only

ESM-only is the main breaking change in Storybook 10. It reduces install size by 29% on top of the 50% savings we released in [Storybook 9](https://storybook.js.org/blog/storybook-9/?ref=storybookblog.ghost.io).

More importantly, it helps push the Javascript community forward towards a cleaner, simpler future. The ecosystem is healing. We are so excited about this change, we think it deserves [its own post](https://storybook.js.org/blog/storybook-is-going-esm-only/?ref=storybookblog.ghost.io).

ESM-only requires a modern Node that supports `ESM require` (`20.16+`, `22.19+`, or `24+`).

![Storybook 10 is 29% lighter than Storybook 9, which is 50% lighter than Storybook 8.](https://storybookblog.ghost.io/content/images/2025/11/Storybook-10-Image.png)

## Module automocking

In [Storybook 9](https://storybook.js.org/blog/storybook-9/?ref=storybookblog.ghost.io), we teamed up with Vitest to create the best way to test UI components. Users tell us the combination of Storybook’s interactive UI and Vitest’s blazing fast test runner is a match made in heaven.

But they had less kind things to say about our approach to module mocking, which apparently came from another place. 👿 Undeterred, we went back to the drawing board and collaborated with Vitest to create a next-generation module mocking solution.

Storybook’s new `sb.mock` is inspired by `vi.mock`, but it’s simpler, compatible with both Vite and Webpack builders, and available in both development and static production builds. Read all about it in our [feature announcement post.](https://storybook.js.org/blog/next-generation-module-mocking/?ref=storybookblog.ghost.io)

![Vite and Webpack logos, with an illustration of a smaller cube slotting into a larger one.](https://storybookblog.ghost.io/content/images/2025/11/Storybook-10-image--1--1.png)

## Typesafe CSF Factories

Component Story Format (CSF) is how to write component examples and tests in Storybook. We created it in 2019, back when JavaScript ruled the roost and [Flow](https://flow.org/?ref=storybookblog.ghost.io) was still a thing. Fast forward to today, and TypeScript is the norm, making up 80+% of Storybook projects.

To keep up, we’re introducing [CSF Factories](https://storybook.js.org/docs/10/api/csf/csf-next?ref=storybookblog.ghost.io), the next major iteration of CSF. Factories provide better type safety, ergonomics, and autocompletion.

```
// CSF 3
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Button from './Button';

const meta = { component: Button } satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { label: 'Button', primary: true }
};

// CSF Factories - Less boilerplate and no type assignments! 🎉
import preview from '../.storybook/preview';
import Button from './Button';

const meta = preview.meta({ component: Button });

export const Primary = meta.story({
  args: { label: 'Button', primary: true }
});
```

With Storybook 10 we are promoting CSF Factories from `Experimental` to `Preview` status, which means we don’t anticipate any significant changes when we make Factories the default in Storybook 11 next Spring. There are codemods to automatically upgrade your existing stories, but you are not obligated to upgrade. Older versions of CSF are still supported and will be for the foreseeable future.

CSF Factories are available for React only, and we expect to release Vue, Angular, and Web Components factory support in 10.x.

## UI editing and sharing optimizations

At Storybook, we sweat the details, continuously refining our UI to make you more productive. Storybook 10 includes another round of optimizations for easier story editing and sharing.

Want to see how that component looks on your mobile phone? The sharing menu now has a QR code for easy access:

![A menu showing Copy story link, Open in isolation mode, and Scan me with a QR code](https://storybookblog.ghost.io/content/images/2025/11/Screenshot-2025-10-14-at-9.26.29---PM-1.png)

Want to edit that failing story in your favorite editor? That’s now a click away too:

![The Basic story in the sidebar highlighted with an open menu, containing Open in editor, Copy story name, Run component tests, Interactions, and Accessibility](https://storybookblog.ghost.io/content/images/2025/11/Screenshot-2025-10-14-at-9.29.56---PM.png)

Got suggestions for more UI improvements? Feature requests are [always welcome](https://github.com/storybookjs/storybook/discussions?ref=storybookblog.ghost.io).

## Tag filtering exclusion and configuration

Storybook CSF makes it easy to capture every state of your UI. But stories can pile up quickly, with the largest Storybooks containing thousands of stories spanning use cases of both documentation and testing, capturing components in different stages of maturity, owned by different teams, and so on.

To make large Storybooks easier to manage, we added tags to stories:

```
// Button.stories.ts

export const GlassMode: Story = {
  args: { glass: true },
  tags: ['experimental'],
};
```

In Storybook 8.5, we added a filtering UI to filter the the sidebar down to tags matching a particular tag. For example, if you wanted to only show stories with the `experimental` tag, you could select the `experimental` tag in the UI:

![The open filter menu containing Clear filters, experimental (checked), Documentation, and Play](https://storybookblog.ghost.io/content/images/2025/11/Screenshot-2025-10-14-at-9.35.24---PM.png)

A good start, but users immediately wanted more. So in Storybook 10 we’ve beefed up tags with two new features: exclusion and configuration.

Exclusion makes it possible to exclude stories based on selected tags. So if you want to hide stories with the `experimental` tag, you can do that too:

![The open filter menu containing Clear filters, experimental (excluded), Documentation, and Play](https://storybookblog.ghost.io/content/images/2025/11/Screenshot-2025-10-14-at-9.36.40---PM.png)

Not only that, but you can configure the default UI state in the configuration file.

```
// .storybook/main.ts

const config: StorybookConfig = {
  tags: {
    experimental: { defaultFilterSelection: 'exclude' },
  },
};
```

To learn all about Storybook tags, please see [the documentation](https://storybook.js.org/docs/writing-stories/tags?ref=storybookblog.ghost.io).

## Svelte async components and state mocking

Thanks to our vibrant collaboration with the Svelte community, Storybook for Svelte keeps getting better. In Storybook 10, we’ve added support for [async components](https://github.com/storybookjs/storybook/pull/31476?ref=storybookblog.ghost.io), Svelte’s latest innovation. We’ve also added [mocking support for`app/state`](https://www.notion.so/1e56e81620348051bf7ce6271919324f?pvs=21&ref=storybookblog.ghost.io), closing a long-standing gap in our SvelteKit integration. If you’re a Svelte user and haven’t tried Storybook in awhile, we highly recommend giving it another try!

## Next 16, Vitest 4, and more!

Every Storybook release is a chance to upgrade with ecosystem. Storybook 10 adds support for Next 16 and Vitest 4, two of the biggest releases this Fall. We've done this while preserving support for older versions.

## Try Storybook 10 today

Try Storybook 10 in a new project:

```
npm create storybook@latest
```

In an existing Storybook project, use our automated migration wizard to help you upgrade:

```
npx storybook@latest upgrade
```

We also provide a [migration guide](https://storybook.js.org/docs/9/migration-guide?ref=storybookblog.ghost.io) to help fill in the gaps.

## What’s next? Test syntax, RSC testing

Every release we announce what’s next and point at our roadmap. This time we’re doing things a little different and we have a bunch of stuff cooking that you can try today and help us shape the future of UI development together.

### Experimental test syntax

Building on the CSF Factories syntax and Tag exclusion filtering exclusion described above, we’ve made it possible to write tests in a familiar syntax and then easily exclude them from the sidebar to remove clutter for non-technical collaborators:

```
// Button.stories.ts
import preview from '../.storybook/preview';

import { Button } from './Button';

const meta = preview.meta({ component: Button });

export const Disabled = meta.story({ args: { disabled: true } });

// 🆕 .test method: Attach tests to a story!
//    The test function can run the same code as the play function
Disabled.test('should be disabled', async ({ canvas, userEvent, args }) => {
  const button = await canvas.findByRole('button');
  await userEvent.click(button);

  await expect(button).toBeDisabled();
  await expect(args.onClick).not.toHaveBeenCalled();
});
```

For more information, see our [RFC](https://github.com/storybookjs/storybook/discussions/30119?ref=storybookblog.ghost.io) and join our early access program to discuss potential improvements.

### Experimental RSC component testing

Finally, we are collaborating with the entire React ecosystem (React core, Next, Testing Library, Vite, and Vitest) to solve component testing for React Server Components (RSCs).

Until now, RSCs have been exclusively tested end-to-end (E2E), since they span both the client and server. However, it is challenging to scale E2E to a large number of tests due to performance and flake. Comparatively, component tests are fast, highly controlled, and low-flake.

![Before: End-to-End RSC testing. Slow, flaky, and hard to mock in a distributed system. Illustrations labeled Client, Server, and Database with an outline around Client labeled Browser. After: Server-in-browser. Fast, reliable, highly-controlled. Three illustrations labeled Client, Server, and Mocked database, with an outline labeled Browser around all of them.](https://storybookblog.ghost.io/content/images/2025/11/image--6-.png)

We’ve released experimental RSC component testing for Storybook and have opened an early access program to stabilize it with users. If you don’t use Storybook, and want to component test your RSCs directly in Vitest, we’ve also got you covered. Read more about how it in our [RFC](https://github.com/storybookjs/storybook/discussions/32665?ref=storybookblog.ghost.io).

## Credits

### Core team

[Michael Arestad](https://twitter.com/michaelarestad?ref=storybookblog.ghost.io), [Yann Braga](https://twitter.com/yannbf?ref=storybookblog.ghost.io), [João Cardoso](https://twitter.com/xapaxa?ref=storybookblog.ghost.io), [Tom Coleman](https://twitter.com/tmeasday?ref=storybookblog.ghost.io), [Norbert de Langen](https://twitter.com/NorbertdeLangen?ref=storybookblog.ghost.io), [Steve Dodier-Lazaro](https://www.linkedin.com/in/stevedodierlazaro?ref=storybookblog.ghost.io), [Kyle Gach](https://twitter.com/kylegach?ref=storybookblog.ghost.io), [Gert Hengeveld](https://twitter.com/GHengeveld?ref=storybookblog.ghost.io), [Dom Nguyen](https://twitter.com/domyen?ref=storybookblog.ghost.io), [Valentin Palkovic](https://twitter.com/vatcoop?ref=storybookblog.ghost.io), [Kasper Peulen](https://twitter.com/KasperPeulen?ref=storybookblog.ghost.io), [Jeppe Reinhold](https://twitter.com/DrReinhold?ref=storybookblog.ghost.io), [Lars Rickert](https://github.com/larsrickert?ref=storybookblog.ghost.io), [Kai Röder](https://twitter.com/kairoeder?ref=storybookblog.ghost.io), [Michael Shilman (me!)](https://twitter.com/mshilman?ref=storybookblog.ghost.io), [Varun Vachhar](https://twitter.com/winkerVSbecks?ref=storybookblog.ghost.io), [Ian Van Schooten](https://twitter.com/IanVanSchooten?ref=storybookblog.ghost.io), [Daniel Williams](https://twitter.com/Danny_H_W?ref=storybookblog.ghost.io), [Josh Wooding](https://twitter.com/JoshWooding_?ref=storybookblog.ghost.io), and [Vanessa Yuen](https://twitter.com/vanessayuenn?ref=storybookblog.ghost.io)

### Contributors

[@404dealer](https://github.com/404dealer?ref=storybookblog.ghost.io) [@43081j](https://github.com/43081j?ref=storybookblog.ghost.io) [@adamscybot](https://github.com/adamscybot?ref=storybookblog.ghost.io) [@alcpereira](https://github.com/alcpereira?ref=storybookblog.ghost.io) [@alexey-kozlenkov](https://github.com/alexey-kozlenkov?ref=storybookblog.ghost.io) [@avitalhass](https://github.com/avitalhass?ref=storybookblog.ghost.io) [@ayuhito](https://github.com/ayuhito?ref=storybookblog.ghost.io) [@beeequeue](https://github.com/beeequeue?ref=storybookblog.ghost.io) [@benmccann](https://github.com/benmccann?ref=storybookblog.ghost.io) [@brandonroberts](https://github.com/brandonroberts?ref=storybookblog.ghost.io) [@cabbiepete](https://github.com/cabbiepete?ref=storybookblog.ghost.io) [@candrepa1](https://github.com/candrepa1?ref=storybookblog.ghost.io) [@copilot](https://github.com/copilot?ref=storybookblog.ghost.io) [@dannyhw](https://github.com/dannyhw?ref=storybookblog.ghost.io) [@diagramatics](https://github.com/diagramatics?ref=storybookblog.ghost.io) [@dmarcisovska](https://github.com/dmarcisovska?ref=storybookblog.ghost.io) [@dschungelabenteuer](https://github.com/dschungelabenteuer?ref=storybookblog.ghost.io) [@ghengeveld](https://github.com/ghengeveld?ref=storybookblog.ghost.io) [@gingeekrishna](https://github.com/gingeekrishna?ref=storybookblog.ghost.io) [@grantralls](https://github.com/grantralls?ref=storybookblog.ghost.io) [@guysenpai](https://github.com/guysenpai?ref=storybookblog.ghost.io) [@hpohlmeyer](https://github.com/hpohlmeyer?ref=storybookblog.ghost.io) [@ia319](https://github.com/ia319?ref=storybookblog.ghost.io) [@imgbotapp](https://github.com/imgbotapp?ref=storybookblog.ghost.io) [@jakeii](https://github.com/jakeii?ref=storybookblog.ghost.io) [@jatinmehta007](https://github.com/jatinmehta007?ref=storybookblog.ghost.io) [@joe-moran](https://github.com/joe-moran?ref=storybookblog.ghost.io) [@jonniebigodes](https://github.com/jonniebigodes?ref=storybookblog.ghost.io) [@jreinhold](https://github.com/jreinhold?ref=storybookblog.ghost.io) [@jsmike](https://github.com/jsmike?ref=storybookblog.ghost.io) [@julioj11](https://github.com/julioj11?ref=storybookblog.ghost.io) [@k35o](https://github.com/k35o?ref=storybookblog.ghost.io) [@kachurun](https://github.com/kachurun?ref=storybookblog.ghost.io) [@kasperpeulen](https://github.com/kasperpeulen?ref=storybookblog.ghost.io) [@kroeder](https://github.com/kroeder?ref=storybookblog.ghost.io) [@kylegach](https://github.com/kylegach?ref=storybookblog.ghost.io) [@matmilbury](https://github.com/matmilbury?ref=storybookblog.ghost.io) [@mehm8128](https://github.com/mehm8128?ref=storybookblog.ghost.io) [@messenjer](https://github.com/messenjer?ref=storybookblog.ghost.io) [@mihkeleidast](https://github.com/mihkeleidast?ref=storybookblog.ghost.io) [@morfey13](https://github.com/morfey13?ref=storybookblog.ghost.io) [@mrginglymus](https://github.com/mrginglymus?ref=storybookblog.ghost.io) [@natainakata](https://github.com/natainakata?ref=storybookblog.ghost.io) [@ndelangen](https://github.com/ndelangen?ref=storybookblog.ghost.io) [@nischit-ekbote](https://github.com/nischit-ekbote?ref=storybookblog.ghost.io) [@nozomikasajima](https://github.com/nozomikasajima?ref=storybookblog.ghost.io) [@ryomaejii](https://github.com/ryomaejii?ref=storybookblog.ghost.io) [@selenehyun](https://github.com/selenehyun?ref=storybookblog.ghost.io) [@shahabhilash](https://github.com/shahabhilash?ref=storybookblog.ghost.io) [@shilman](https://github.com/shilman?ref=storybookblog.ghost.io) [@sidnioulz](https://github.com/sidnioulz?ref=storybookblog.ghost.io) [@silverwind](https://github.com/silverwind?ref=storybookblog.ghost.io) [@sk-pub](https://github.com/sk-pub?ref=storybookblog.ghost.io) [@steciuk](https://github.com/steciuk?ref=storybookblog.ghost.io) [@synar](https://github.com/synar?ref=storybookblog.ghost.io) [@takashi-kasajima](https://github.com/takashi-kasajima?ref=storybookblog.ghost.io) [@terrymun](https://github.com/terrymun?ref=storybookblog.ghost.io) [@tijmenb](https://github.com/tijmenb?ref=storybookblog.ghost.io) [@tmeasday](https://github.com/tmeasday?ref=storybookblog.ghost.io) [@usrrname](https://github.com/usrrname?ref=storybookblog.ghost.io) [@valentinpalkovic](https://github.com/valentinpalkovic?ref=storybookblog.ghost.io) [@vanessayuenn](https://github.com/vanessayuenn?ref=storybookblog.ghost.io) [@vinay-d07](https://github.com/vinay-d07?ref=storybookblog.ghost.io) [@vivekkavala](https://github.com/vivekkavala?ref=storybookblog.ghost.io) [@walkerburgin](https://github.com/walkerburgin?ref=storybookblog.ghost.io) [@xlecunff-pass](https://github.com/xlecunff-pass?ref=storybookblog.ghost.io) [@y-hsgw](https://github.com/y-hsgw?ref=storybookblog.ghost.io) [@yannbf](https://github.com/yannbf?ref=storybookblog.ghost.io) [@yatishgoel](https://github.com/yatishgoel?ref=storybookblog.ghost.io) [@zenocross](https://github.com/zenocross?ref=storybookblog.ghost.io)

> Storybook 10 is here! ✂️ ESM-only (the only breaking change!) 🧩 Module automocking for easier testing 🏭 Typesafe CSF factories Preview for React 💫 UI editing and sharing optimizations 🏷️ Tag filtering exclusion for sidebar management 🔀 Svelte async component support
> 
> — [Storybook (@storybook.js.org)](https://bsky.app/profile/did:plc:osfpupzlwycyr6dxic6adh7t?ref_src=embed&ref=storybookblog.ghost.io) [2025-11-04T19:02:28.200Z](https://bsky.app/profile/did:plc:osfpupzlwycyr6dxic6adh7t/post/3m4t7wly3m22x?ref_src=embed&ref=storybookblog.ghost.io)