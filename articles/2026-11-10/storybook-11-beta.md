---
title: "Storybook 11 beta"
source: "https://storybook.js.org/blog/storybook-11-beta/"
publishedDate: "2026-11-09"
category: "design-systems"
feedName: "Storybook Blog"
author: "Michael Shilman"
---

Coding agents can build UI quickly, but without context a lot of it is slop. Duplicate components. Wrong APIs. Missing states.

We believe Storybook is at the center of agentic UI development. The components, stories, and tests your team maintains are fundamental context agents need to work well.

Storybook 11 beta brings official skills and headless CLI tools that let agents iterate autonomously. All of this comes in a 25% smaller package with up to 10x faster context delivery than v10.

🌟 Official skills for coding agents  
🤖 Claude and Codex plugins  
🛠️ Headless CLI tools for your own workflows  
🏭 Type-safe stories  
📚 Agent-ready docgen for all core frameworks

![Reuse your components](https://storage.ghost.io/c/f9/d7/f9d78a80-56f8-4adc-8ba1-0e2d6ee72b16/content/images/2026/11/Components-become-matching-product-UI--reused-from-AI-.jpg)

## Storybook skills

Skills are the centerpiece of Storybook 11. The `ui-workflow` skill guides the agent through building UI with your components, writing stories, testing its work, and presenting it for human review.

![Workflow from build to review](https://storage.ghost.io/c/f9/d7/f9d78a80-56f8-4adc-8ba1-0e2d6ee72b16/content/images/2026/11/Frame-1217.jpg)

**Use your components.** The `component-docs` skill helps the agent find existing components and query their APIs, metadata, documentation, and code examples in a token-efficient format before it starts building.

**Test.** With `storybook tools test run`, the agent runs functional and accessibility tests powered by Vitest. It can test specific stories or the entire project, inspect failures, fix its work, and rerun tests before handing it over.

**Review.** The agent uses `storybook tools review create` to prepare a browser review. It groups stories for changed components and affected pages, with summaries of the changes and key states to check. You can see what the agent built and review its work at a glance.

![](https://storage.ghost.io/c/f9/d7/f9d78a80-56f8-4adc-8ba1-0e2d6ee72b16/content/images/2026/11/image.png)

Get agents to curate changes for you to review using Storybook 11's review tool

Skills get installed on upgrade and in new projects. They are also available on [skills.sh](http://skills.sh/?ref=storybookblog.ghost.io) and in Claude Code and Codex plugins. Learn more from [our documentation](https://storybook.js.org/docs/11/ai/connect?ref=storybookblog.ghost.io).

Storybook continues to support MCP, which has expanded support for all core frameworks. But we recommend skills as the most ergonomic way to use Storybook locally with agents, because they let agents fetch component context without a running Storybook instance.

![Use Storybook CLI to retrieve UI context](https://storage.ghost.io/c/f9/d7/f9d78a80-56f8-4adc-8ba1-0e2d6ee72b16/content/images/2026/11/context-share.jpg)

## Storybook CLI

Storybook 11's CLI contains a new [`tools` command](https://storybook.js.org/docs/11/api/cli-options?ref=storybookblog.ghost.io#tools) that exposes a fast, headless Storybook. In addition to powering the official skills, the new CLI makes it easy to write your own skills, tools, and workflows.

```
npx storybook@next tools --help

# List components and documentation with their IDs
npx storybook@next tools docs list
npx storybook@next tools docs show --id "your-component-id"
```

Storybook’s CLI is fast. It attaches to an existing dev server when a tool needs the browser, as `storybook tools review create` does, and bypasses the dev server entirely when it’s not needed. On large projects like Chromatic, cold-start docgen results are delivered to agents ~10x faster than in Storybook 10. We anticipate another 2x improvement once TypeScript 7.1 stabilizes.

## Type-safe stories

Storybook 11 upgrades CSF, our story format for component examples. [CSF 4](https://storybook.js.org/docs/11/writing-stories/csf?ref=storybookblog.ghost.io) is fully type-safe with a modern, ergonomic “factories” API. Storybook addons can extend the type system to add parameters and other config options.

```
import preview from '../.storybook/preview';
import { Button } from './Button';

const meta = preview.meta({
	component: Button,
  parameters: { layout: 'centered' },
});

export const Primary = meta.story({ args: { primary: true } });
// etc.
```

Storybook 11 provides codemods to automatically upgrade your existing stories. You can upgrade incrementally and CSF 3 remains fully supported. For more information, see [the docs](https://storybook.js.org/docs/11/writing-stories/csf/upgrade?ref=storybookblog.ghost.io).

![](https://storage.ghost.io/c/f9/d7/f9d78a80-56f8-4adc-8ba1-0e2d6ee72b16/content/images/2026/11/image-2.png)

## Framework support

In the process of rebuilding Storybook’s core architecture, we've also leveled up all our core frameworks, especially when it comes to docgen extraction and code snippet examples.

**React.** React users get fast, accurate component metadata from `react-component-meta`. It replaces the existing options of `react-docgen` and `react-docgen-typescript`, providing better accuracy and performance.

**Vue.** We've upgraded to `vue-component-meta` to give Vue users better component metadata. We are also working with maintainer [Tobias Diez](https://github.com/tobiasdiez?ref=storybookblog.ghost.io) to ensure that Storybook for Nuxt is agent-ready.

**Angular.** `@storybook/angular-vite` is a new collaboration with Analog.js maintainer [Brandon Roberts](https://github.com/brandonroberts?ref=storybookblog.ghost.io) and the Angular Core team. It’s insanely fast, provides high quality component metadata, and solves hundreds of outstanding issues from `@storybook/angular`. If you’re on Angular 21+, [here’s how to migrate](https://storybook.js.org/docs/11/get-started/frameworks/angular-vite?ref=storybookblog.ghost.io).

**Web Components.** Web components are getting some long overdue love in Storybook. We collaborated with `wc-storybook-helpers` creator [Burton Smith](https://github.com/break-stuff?ref=storybookblog.ghost.io) to integrate controls support for slots, events, CSS variables, and more based on your custom elements manifest (CEM). Additionally, Storybook now computes the CEM if it’s not provided and automatically updates it on code changes.

**Svelte.** Svelte has been promoted to a core Storybook framework. Storybook 11 supports Svelte 5 and SvelteKit 3, no longer requires an addon for Svelte CSF, and has seen significant docgen performance improvement due to a rewrite of the TypeScript integration. Many thanks to Svelte core maintainer [Paolo Ricciuti](https://github.com/paoloricciuti?ref=storybookblog.ghost.io) for designing the type safe factory upgrade to Svelte Native CSF.

## Try it out today

We want your help to get Storybook 11 ready for release in December.

Run the upgrade command on your project. It applies automigrations and tells you what to change by hand, if necessary. The [migration guide](https://storybook.js.org/docs/11/releases/migration-guide?ref=storybookblog.ghost.io) lists every breaking change.

```
npx storybook@next upgrade
```

You can also install it in a new project:

```
npm create storybook@next
```

If you run into any problems, please file a GitHub issue with a reproduction. We've also opened GitHub discussions for each of the major feature areas.