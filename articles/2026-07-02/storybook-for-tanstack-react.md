---
title: "Storybook for TanStack React"
source: "https://storybook.js.org/blog/storybook-for-tanstack-react/"
publishedDate: "2026-06-16"
category: "design-systems"
feedName: "Storybook Blog"
author: "Julien Huang"
---

TanStack has become one of the most productive ways to build React apps. **Router** gives you type-safe, file-based routing with loaders and nested layouts. **Query** handles server state with a small API surface. **Start** connects the stack with server functions that feel like local calls.

Storybook should fit that workflow.

With the help of the TanStack core team, we’ve shipped **`@storybook/tanstack-react`**, a dedicated Storybook framework for TanStack-powered React apps. It removes the setup work that usually appears when components depend on Router or Start.

Here’s what you get out of the box:

-   🛣 Automatic TanStack Router wrapping with memory history
-   🧭 Type-safe `route`, `params`, `query`, and `path` configuration
-   🌲 Code-based, file-based, and nested Route support
-   🧪 Auto-mocked TanStack Start server functions
-   ⚙️ Zero-config setup on top of `@storybook/react-vite`

## Router-aware rendering for file-based routes and nested layouts

`@storybook/tanstack-react` wraps every story in `<RouterProvider>` automatically. Every story runs inside a router created from `parameters.tanstack.router`, using in-memory history so navigation works inside the preview without changing the browser URL.

For most components, the defaults are enough. When a story needs route state, use the typed `tanstack.router` parameter:

```
// Page.stories.ts

import type { Meta, StoryObj } from '@storybook/tanstack-react';
import { Route } from './Page';

const meta = {
  parameters: {
    layout: 'fullscreen',
    tanstack: {
      router: {
        route: Route, // 👈 Supply the Route here
        // 👇 Rest of these properties are type-safe
        params: { id: '42' },
        query: { tab: 'details' },
      },
    },
  },
} satisfies Meta<typeof Route>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

When you pass a `route`, Storybook type-checks `params` and `query` against that route’s declared params and search schema. A misspelled param name or invalid search value fails at compile time, not just runtime.

For story-specific loader data or router context, use `routeOverrides`:

```
// Page.stories.ts
// ...continued from above

export const WithCustomLoader: Story = {
  parameters: {
    tanstack: {
      router: {
        route: Route,
        params: { id: '42' },
        routeOverrides: {
          '/items/$id': {
            loader: async () => ({
              item: { id: '42', name: 'Loaded inside Storybook' },
            }),
          },
        },
      },
    },
  },
};
```

## Mocked TanStack Start server functions

TanStack Start lets components call server functions as if they were local functions. That works well in app code because the framework rewires those calls at build time.

Stories have a different constraint: you need isolated component states without booting a Start server, database, auth layer, or external service.

`@storybook/tanstack-react` automatically stubs `createServerFn()` handlers. They become plain mock functions that you can configure per story for success, loading, empty, and error states.

```
// Orders.stories.ts
import { mocked } from 'storybook/test';
// 👇 Automatically mocked
import { getOrders } from '../server/orders';
import { OrdersList } from './OrdersList';

const meta = {
  component: OrdersList,
} satisfies Meta<typeof OrdersList>;
 
export default meta;
type Story = StoryObj<typeof meta>;

// 👇 This story will render with a network error
export const OrdersFailed: Story = {
  beforeEach: async () => {
    mocked(getOrders).mockRejectedValueOnce(new Error('Network unreachable'));
  },
};
```

The story owns the server response shape, so the component can be tested against precise states without extra infrastructure.

## TanStack Query integration

The framework also works with TanStack Query. Provide a shared `QueryClient` with a decorator in your project configuration, then seed data per story.

```
// .storybook/preview.tsx

import type { Preview } from '@storybook/tanstack-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 👇 Create a new QueryClient
const queryClient = new QueryClient();

const preview: Preview = {
  component: Dashboard,
  beforeEach: () => {
    // 👇 Clear the cache between stories so each story starts fresh
    queryClient.clear();
  },
  parameters: {
    tanstack: {
      router: {
        // 👇 Assign queryClient
        context: { queryClient },
      },
    },
  },
  decorators: [
    (Story) => (
      // 👇 Provide the QueryClient to all stories
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default preview;

// ---

// Dashboard.stories.ts

import type { Meta, StoryObj } from '@storybook/tanstack-react';
import type { QueryClient } from '@tanstack/react-query';
import { Dashboard } from './Dashboard';

const meta = {
  component: Dashboard,
} satisfies Meta<typeof Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};

export const LoggedIn: Story = {
  // 👇 Seed the data necessary for this story
  beforeEach: async ({ parameters }) => {
    const qc: QueryClient = parameters.tanstack?.router?.context?.queryClient;
    qc?.setQueryData(['currentUser'], {
      id: 'user-1',
      name: 'Ada Lovelace',
    });
  },
};
```

Combined with mocked server functions, this gives each story control over the full data lifecycle: loading, success, empty, and error.

## Server-only dependencies, handled

TanStack Start apps often import modules that only belong on the server: database clients, filesystem helpers, secret managers, and other runtime-specific dependencies.

Those imports can break a browser preview before the component renders.

The framework handles this in three layers:

1.  **Framework-level mocks for TanStack Start internals.** Imports from `@tanstack/react-start/*` and related packages are redirected to browser-safe mocks at build time through Vite plugins.
2.  **Automatic TanStack Start entry point stubbing.** Server and runtime entry points and `createServerFn()` handlers are rewritten into a no-op browser module.
3.  **Storybook module mocking for app-specific cases.** For dependencies outside the automatic Start and server handling, use [Storybook’s standard module mocking](https://storybook.js.org/docs/writing-stories/mocking-data-and-modules/mocking-modules?ref=storybookblog.ghost.io).

That setup lets components from Start apps render in Storybook without rewriting imports or maintaining separate preview-only component versions.

## Getting started

For a new project, run this command:

```
npm create storybook@latest
```

The CLI detects TanStack Router and TanStack Start, then installs `@storybook/tanstack-react` with appropriate defaults.

If you are using AI, Storybook 10.4 was also released with Automated AI Setup. Give this prompt to your agent to have it set up Storybook in your project, complete with stories for your components.

```
Set up Storybook for me with npm create storybook@latest and follow its instructions precisely
```

For an existing project already using `@storybook/react-vite`, run:

```
npx storybook@latest automigrate
```

The migration swaps the framework, updates your config, and keeps existing stories in place.

If you're just getting started with TanStack, Storybook is one of the available add-ons in the CLI.

Requirements:

-   React ≥ 18
-   Vite ≥ 7
-   `@tanstack/react-router`
-   Optional: `@tanstack/react-start`

For full details, please see [Storybook’s TanStack React framework docs](https://storybook.js.org/docs/get-started/frameworks/tanstack-react?ref=storybookblog.ghost.io).

## Thanks

We received invaluable support from the TanStack team while developing this framework. Specifically, [Dominik Dorfmeister](https://x.com/TkDodo?ref=storybookblog.ghost.io) provided guidance on which TanStack features Storybook should support, and [Nicolas Beaussart](https://x.com/beaussan?ref=storybookblog.ghost.io) shared implementation reviews and technical feedback. Thank you for your help!

[

Storybook (@storybook.js.org)

Did you know Storybook has @tanstack.com React support built-in? 🛣 Automatic Router wrapping with memory history 🧭 Type-safe route, params, query, and path configuration 🌲 Code-based, file-based, and nested Route support 🧪 Auto-mocked Start server functions ⚙️ Zero-config setup https://storybook.js.org/blog/storybook-for-tanstack-react/

![](https://storage.ghost.io/c/f9/d7/f9d78a80-56f8-4adc-8ba1-0e2d6ee72b16/content/images/icon/apple-touch-icon-85ad9333-3d20-4758-8f1e-f64153be482f.png)Bluesky SocialStorybook

![](https://storage.ghost.io/c/f9/d7/f9d78a80-56f8-4adc-8ba1-0e2d6ee72b16/content/images/thumbnail/bafkreifldvl7m7xqlbnhwxbc7d44otiqqtvomlwlzbtvgqks5ve76aclje-60fc2869-456f-4c9c-8639-abf45cbf21de)

](https://bsky.app/profile/storybook.js.org/post/3mpjhhstork2f?ref=storybookblog.ghost.io)