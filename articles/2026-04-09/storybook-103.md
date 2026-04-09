---
title: "Storybook 10.3"
source: "https://storybook.js.org/blog/storybook-10-3/"
publishedDate: "2026-04-06"
category: "design-systems"
feedName: "Storybook Blog"
author: "Michael Shilman"
---

Storybook 10.3 adds MCP for React so AI agents can reuse real components, write stories, and run focused component and accessibility tests. It also improves Storybook’s accessibility, expands CSF Factories to more frameworks, and adds support for newer frontend tooling like Vite 8 and Next.js 16.2.

👇 [**Try Storybook 10.3 today**](#get-started)

## Storybook MCP for React

Storybook MCP for React gives AI agents direct access to your real components, stories, docs, and tests so they can build production grade UI instead of hallucinating their way through it.

0:00

/0:19

With Storybook MCP, an agent is able to query your design system components, use them to build a high-quality UI, and correct its own mistakes using fast component tests.

![](https://storage.ghost.io/c/f9/d7/f9d78a80-56f8-4adc-8ba1-0e2d6ee72b16/content/media/2026/04/Storybook-MCP-Hero_thumb.jpg)

Agents can discover what components already exist, reuse them across app and design-system boundaries, show their work as live story previews right in the chat, and even run focused component and accessibility tests to fix issues on their own. It’s a compelling glimpse of what AI-assisted frontend work looks like when the agent has real context and guardrails, not just vibes. It breaks down into toolsets:

-   🧑‍💻 Dev toolset helps agents **show their work** in all key UI states
-   📚 Docs toolset helps agents **reuse design system components**
-   🧪 Test toolset **sets guardrails** so agents can self-correct

Read the full article:

[

Storybook MCP for React

Storybook-powered agentic UI development

![](https://storage.ghost.io/c/f9/d7/f9d78a80-56f8-4adc-8ba1-0e2d6ee72b16/content/images/icon/icon-192x192.png)Storybook BlogKyle Gach

![](https://storage.ghost.io/c/f9/d7/f9d78a80-56f8-4adc-8ba1-0e2d6ee72b16/content/images/thumbnail/Storybook-MCP-for-React.png)

](https://storybook.js.org/blog/storybook-mcp-for-react/?ref=storybookblog.ghost.io)

## Accessibility overhaul

Storybook’s [component a11y testing workflow](https://storybook.js.org/blog/the-accessibility-pipeline-for-frontend-teams/?ref=storybookblog.ghost.io) makes accessible UI work repeatable, actionable, and part of the normal dev loop. It’s also a great way to work through “a11y debt” in existing codebases. In Storybook 10.x, we used it ourselves to produce a steady stream of a11y improvements across Storybook’s UI.

![Accessibility. 1249 violations, 263 components, 1226 total tests. Accessibility violations charted from Oct 8 2025 thru Jan 5, 2026. On Nov 13, 2025, they decline sharply from 2728 to the current 1249.](https://storage.ghost.io/c/f9/d7/f9d78a80-56f8-4adc-8ba1-0e2d6ee72b16/content/images/2026/04/SB-a11y-burndown.png)

Burndown chart of accessibility violations in Storybook’s UI

Improvements include better ARIA semantics, stronger keyboard navigation and focus management, better contrast and high-contrast support, reduced-motion refinements, WCAG-minded docs fixes, better landmark navigation, accessible resize handles and zoom controls, and continued polish for the A11y addon itself.

For the complete set of changes, please see [accessibility PRs](https://github.com/storybookjs/storybook/pulls?q=is%3Apr+is%3Amerged+label%3Aaccessibility&ref=storybookblog.ghost.io).

## CSF Factories

In [Storybook 10](https://storybook.js.org/blog/storybook-10/?ref=storybookblog.ghost.io) we released [CSF Factories](https://storybook.js.org/docs/10/api/csf/csf-next?ref=storybookblog.ghost.io), a more type-safe way to write component examples and tests with autocompletion and less boilerplate. These improvements are not only far more ergonomic for users, but we’ve also seen them help coding agents write stories more easily.

The initial 10.0 factories release was React-only. Since then, we’ve followed up with support for [Vue](https://storybook.js.org/docs/api/csf/csf-next?renderer=vue&ref=storybookblog.ghost.io), [Angular](https://storybook.js.org/docs/api/csf/csf-next?renderer=angular&ref=storybookblog.ghost.io), and [Web components](https://storybook.js.org/docs/api/csf/csf-next?renderer=web-components&ref=storybookblog.ghost.io).

```
// CSF 3
import type { Meta, StoryObj } from '@storybook/your-framework';
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

There are codemods to automatically upgrade your existing stories, but you are not obligated to upgrade. Older versions of CSF are still supported and will be for the foreseeable future. CSF Factories are in `Preview` status, which means we don’t anticipate any significant changes before their stable release in Storybook 11.

To learn more, read the CSF Next docs for [React](https://storybook.js.org/docs/api/csf/csf-next?renderer=react&ref=storybookblog.ghost.io), [Vue](https://storybook.js.org/docs/api/csf/csf-next?renderer=vue&ref=storybookblog.ghost.io), [Angular](https://storybook.js.org/docs/api/csf/csf-next?renderer=angular&ref=storybookblog.ghost.io), and [Web components](https://storybook.js.org/docs/api/csf/csf-next?renderer=web-components&ref=storybookblog.ghost.io).

## Ecosystem and community

Storybook’s strength comes from its ecosystem: a huge community, first-class framework support, and integrations that meet frontend teams where they work. Storybook 10.3 delivers a broad set of improvements across that ecosystem.

Core improvements include:

-   ⚡ Vite 8
-   ▲ Next.js 16.2
-   📝 ESLint 10
-   🅰️ Angular 21
-   🦀 CLI init support for Rsbuild
-   ⚡️ Preact support for Vitest addon

Meanwhile, the community has also been hard at work:

-   🤘 Community [Vike integration](https://vike.dev/?ref=storybookblog.ghost.io)
-   🚀 Community [Astro framework](https://storybook-astro.org/?ref=storybookblog.ghost.io) (experimental)

## How to upgrade to Storybook 10.3

New to Storybook? Create a project::

```
npm create storybook@latest
```

Already using Storybook? Upgrade now with our automated migration wizard:

```
npx storybook@latest upgrade
```

We also provide a [migration guide](https://storybook.js.org/docs/10/releases/migration-guide?ref=storybookblog.ghost.io) to help upgrading from previous majors.

## What’s next?

As AI models become more capable software builders, development workflows are being completely rewritten. Tools like Storybook need to adapt.

MCP for React is our first move, but it’s only the beginning. We’re already exploring what comes next: reusable skills, support across more frameworks, better ways to visualize components inside agentic editors, and first-class design token support are a few of the things we’re cooking.

But this shift isn’t just about making agents more capable. It’s about creating a better development environment overall. Each step of the way, we plan to keep raising the bar for human developers too, making Storybook more usable, more integrated, and more effective for everyone who builds UI.

## Contributors (10.1-3)

[@43081j](https://github.com/43081j?ref=storybookblog.ghost.io) [@50bbx](https://github.com/50bbx?ref=storybookblog.ghost.io) [@6810779s](https://github.com/6810779s?ref=storybookblog.ghost.io) [@abhaysinh1000](https://github.com/abhaysinh1000?ref=storybookblog.ghost.io) [@achesin](https://github.com/achesin?ref=storybookblog.ghost.io) [@akornmeier](https://github.com/akornmeier?ref=storybookblog.ghost.io) [@alex-js-ltd](https://github.com/alex-js-ltd?ref=storybookblog.ghost.io) [@anchmelev](https://github.com/anchmelev?ref=storybookblog.ghost.io) [@andreww2012](https://github.com/andreww2012?ref=storybookblog.ghost.io) [@ar-saeedi](https://github.com/ar-saeedi?ref=storybookblog.ghost.io) [@beeswhacks](https://github.com/beeswhacks?ref=storybookblog.ghost.io) [@bryan-codaio](https://github.com/bryan-codaio?ref=storybookblog.ghost.io) [@chida09](https://github.com/chida09?ref=storybookblog.ghost.io) [@chiman2937](https://github.com/chiman2937?ref=storybookblog.ghost.io) [@cjeonguk](https://github.com/cjeonguk?ref=storybookblog.ghost.io) [@copilot](https://github.com/copilot?ref=storybookblog.ghost.io) [@createhb21](https://github.com/createhb21?ref=storybookblog.ghost.io) [@dannyhw](https://github.com/dannyhw?ref=storybookblog.ghost.io) [@dididy](https://github.com/dididy?ref=storybookblog.ghost.io) [@dschungelabenteuer](https://github.com/dschungelabenteuer?ref=storybookblog.ghost.io) [@dukedesouth](https://github.com/dukedesouth?ref=storybookblog.ghost.io) [@ec-9624](https://github.com/ec-9624?ref=storybookblog.ghost.io) [@ehoodgoren](https://github.com/ehoodgoren?ref=storybookblog.ghost.io) [@etiennepasteur](https://github.com/etiennepasteur?ref=storybookblog.ghost.io) [@gayanmatch](https://github.com/gayanmatch?ref=storybookblog.ghost.io) [@ghengeveld](https://github.com/ghengeveld?ref=storybookblog.ghost.io) [@gpoole](https://github.com/gpoole?ref=storybookblog.ghost.io) [@harshit-mourya](https://github.com/harshit-mourya?ref=storybookblog.ghost.io) [@hpohlmeyer](https://github.com/hpohlmeyer?ref=storybookblog.ghost.io) [@huang-julien](https://github.com/huang-julien?ref=storybookblog.ghost.io) [@ia319](https://github.com/ia319?ref=storybookblog.ghost.io) [@icopp](https://github.com/icopp?ref=storybookblog.ghost.io) [@jeevikar14](https://github.com/jeevikar14?ref=storybookblog.ghost.io) [@jonathan-fulton](https://github.com/jonathan-fulton?ref=storybookblog.ghost.io) [@jonniebigodes](https://github.com/jonniebigodes?ref=storybookblog.ghost.io) [@jovidecroock](https://github.com/jovidecroock?ref=storybookblog.ghost.io) [@jreinhold](https://github.com/jreinhold?ref=storybookblog.ghost.io) [@jsmike](https://github.com/jsmike?ref=storybookblog.ghost.io) [@k35o](https://github.com/k35o?ref=storybookblog.ghost.io) [@kasperpeulen](https://github.com/kasperpeulen?ref=storybookblog.ghost.io) [@kylegach](https://github.com/kylegach?ref=storybookblog.ghost.io) [@maelryn](https://github.com/maelryn?ref=storybookblog.ghost.io) [@majiayu000](https://github.com/majiayu000?ref=storybookblog.ghost.io) [@matthijsgroen](https://github.com/matthijsgroen?ref=storybookblog.ghost.io) [@michaelarestad](https://github.com/michaelarestad?ref=storybookblog.ghost.io) [@mixelburg](https://github.com/mixelburg?ref=storybookblog.ghost.io) [@mrginglymu](https://github.com/mrginglymus?ref=storybookblog.ghost.io)  [@msmx-mnakagawa](https://github.com/msmx-mnakagawa?ref=storybookblog.ghost.io) [@nathan54villaume](https://github.com/nathan54villaume?ref=storybookblog.ghost.io) [@nathanjessen](https://github.com/nathanjessen?ref=storybookblog.ghost.io) [@ndelangen](https://github.com/ndelangen?ref=storybookblog.ghost.io) [@nikhilchowdhury27](https://github.com/nikhilchowdhury27?ref=storybookblog.ghost.io) [@nnt1054](https://github.com/nnt1054?ref=storybookblog.ghost.io) [@nzws](https://github.com/nzws?ref=storybookblog.ghost.io) [@pallaprolus](https://github.com/pallaprolus?ref=storybookblog.ghost.io) [@pavan-sh](https://github.com/pavan-sh?ref=storybookblog.ghost.io) [@quisido](https://github.com/quisido?ref=storybookblog.ghost.io) [@reduckted](https://github.com/reduckted?ref=storybookblog.ghost.io) [@reeseo3o](https://github.com/reeseo3o?ref=storybookblog.ghost.io) [@remino](https://github.com/remino?ref=storybookblog.ghost.io) [@renoschubert](https://github.com/renoschubert?ref=storybookblog.ghost.io) [@robbchar](https://github.com/robbchar?ref=storybookblog.ghost.io) [@rohan436](https://github.com/rohan436?ref=storybookblog.ghost.io) [@sakit0](https://github.com/sakit0?ref=storybookblog.ghost.io) [@samuelt-beslogic](https://github.com/samuelt-beslogic?ref=storybookblog.ghost.io) [@sekeidesign](https://github.com/sekeidesign?ref=storybookblog.ghost.io) [@shilman](https://github.com/shilman?ref=storybookblog.ghost.io) [@sidnioulz](https://github.com/sidnioulz?ref=storybookblog.ghost.io) [@silverwind](https://github.com/silverwind?ref=storybookblog.ghost.io) [@snippy4](https://github.com/snippy4?ref=storybookblog.ghost.io) [@sod](https://github.com/sod?ref=storybookblog.ghost.io) [@superlipbalm](https://github.com/superlipbalm?ref=storybookblog.ghost.io) [@tanujbhaud](https://github.com/tanujbhaud?ref=storybookblog.ghost.io) [@theruslan](https://github.com/theruslan?ref=storybookblog.ghost.io) [@theseydicharyyev](https://github.com/theseydicharyyev?ref=storybookblog.ghost.io) [@unional](https://github.com/unional?ref=storybookblog.ghost.io) [@valentinfunk](https://github.com/valentinfunk?ref=storybookblog.ghost.io) [@valentinpalkovic](https://github.com/valentinpalkovic?ref=storybookblog.ghost.io) [@vanessayuenn](https://github.com/vanessayuenn?ref=storybookblog.ghost.io) [@viditkbhatnagar](https://github.com/viditkbhatnagar?ref=storybookblog.ghost.io) [@whdjh](https://github.com/whdjh?ref=storybookblog.ghost.io) [@wioletakolodziej](https://github.com/wioletakolodziej?ref=storybookblog.ghost.io) [@wumingdao](https://github.com/wumingdao?ref=storybookblog.ghost.io) [@y-hsgw](https://github.com/y-hsgw?ref=storybookblog.ghost.io) [@yannbf](https://github.com/yannbf?ref=storybookblog.ghost.io) [@yatishgoel](https://github.com/yatishgoel?ref=storybookblog.ghost.io) [@yeonny0723](https://github.com/yeonny0723?ref=storybookblog.ghost.io) [@yoshi-taka](https://github.com/yoshi-taka?ref=storybookblog.ghost.io) [@yue4u](https://github.com/yue4u?ref=storybookblog.ghost.io)

> Storybook 10.3 is out! ✨ Storybook MCP for React ♿ A11y overhaul fixes 100s of issues 🧑‍💻 CLI overhaul for faster, more reliable install 💅 New Viewports and Zoom UI ✅ New onboarding guide 🏭 Type-safe CSF factories for Vue, Angular, and Web Components Take a look ⤵️
> 
> — [Storybook (@storybook.js.org)](https://bsky.app/profile/did:plc:osfpupzlwycyr6dxic6adh7t?ref_src=embed&ref=storybookblog.ghost.io) [2026-04-08T16:56:25.723Z](https://bsky.app/profile/did:plc:osfpupzlwycyr6dxic6adh7t/post/3miyr5wbu5s26?ref_src=embed&ref=storybookblog.ghost.io)