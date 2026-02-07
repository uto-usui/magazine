---
title: "Next-generation module mocking in Storybook"
source: "https://storybook.js.org/blog/next-generation-module-mocking/"
publishedDate: "2025-08-21"
category: "design-systems"
feedName: "Storybook Blog"
author: "Valentin Palkovic"
---

Consistency is the bedrock of developing and testing UI in isolation. Your Storybook stories should render the same UI every time, regardless of who is viewing them, when they're viewing them, or whether your backend services are online. The same input to your story should always produce identical output.

This is straightforward when your component's only input is props. For network data, the popular [Mock Service Worker addon](https://storybook.js.org/addons/msw-storybook-addon?ref=storybookblog.ghost.io) is a fantastic solution. But what about other dependencies? How do you handle components that rely on browser APIs like `localStorage` or which require authentication to work?

Mocking these inputs has been a long-standing challenge. In Storybook 8.1, we introduced a [standards-based approach using Subpath Imports](https://storybook.js.org/blog/type-safe-module-mocking/?ref=storybookblog.ghost.io). While powerful, it required manual `package.json` configuration and changes to your component's import paths.

Today, we’re thrilled to introduce a next-generation solution that is simpler, more powerful, and offers a superior developer experience.

## Introducing `sb.mock()`

The new module mocking feature is powered by Vitest's battle-tested mocking engine, but is deeply integrated into Storybook's workflow to work seamlessly for both **Vite and Webpack** in both **dev and production** modes.

It’s all centered around a new, intuitive API: `sb.mock()`.

Consider a user-configurable `Dashboard` component that allows the user to choose what information is shown and stores those settings in the browser’s local storage:

```
// lib/settings.ts
export const getDashboardLayout = () => {
  const layout = window.localStorage.getItem('dashboard.layout');
  return layout ? JSON.parse(layout) : [];
};

// components/Dashboard.tsx
import { getDashboardLayout } from '../lib/settings.ts';

export const Dashboard = () => {
  const layout = getDashboardLayout();
  // ...logic to display layout
};
```

Now, you can mock it globally for all your stories with a single line in your `.storybook/preview.ts` file:

```
// .storybook/preview.ts
import { sb } from 'storybook/test';

// That's it! The settings module will now be mocked in all stories.
sb.mock('../lib/settings.ts');
```

This approach is cleaner, requires no changes to your component code, and is completely type-safe.

## How to use automocking

The `sb.mock()` API is designed to be flexible and cover all your mocking needs directly from your preview configuration.

### Automocking without mock files

For a majority of cases, you can use the automatically generated mocks. If you call `sb.mock('...', { spy: true })`, Storybook will replace all exports with spies that call the original functions while recording every interaction. This allows you to continue using the original behavior (or modify it, as needed) and track its usage.

```
// .storybook/preview.ts
import { sb } from 'storybook/test';

sb.mock('../lib/analytics.ts', { spy: true });
```

Now, in your stories, you can import from the original path and either use the original functionality or configure the mock for that specific story. This colocates the mock’s behavior with where it is used.

```
// components/Dashboard.stories.ts
import { mocked } from 'storybook/test';
import { trackEvent } from '../lib/analytics.ts';

export const MyStory = {
  beforeEach: () => {
    /*
     * The `trackEvent` function is already a mock!
     * The `mocked` utility is just for proper mock function types
     */
    mocked(trackEvent).mockResolvedValue({ status: 'ok' });
  },
  play: async () => {
    // ... interact with the component
    await expect(trackEvent).toHaveBeenCalledWith('dashboard-viewed');
  },
};
```

### Replacing modules

If you set `spy` to `false` (or omit it), Storybook automatically mocks the module by replacing its exports with safe, inert values. Functions and class instances are replaced with empty mocks (`vi.fn()`), arrays are emptied, objects are deeply cloned, and primitives are kept as-is. This gives you a clean slate to work with in every story.

```
// .storybook/preview.ts
import { sb } from 'storybook/test';

sb.mock('../lib/analytics.ts');
```

### Automocking with `__mocks__`

If a file exists in a `__mocks__` directory adjacent to the original module, Storybook will automatically use it. This convention, popularized by Jest and Vitest, is perfect for more complex modules that need dedicated mock implementations. It also ensures that the original functionality is never executed, which can be important when mocking things like server code in a browser environment.

**For local modules**, place the `__mocks__` directory adjacent to the original module:

```
src/
├── lib/
│   ├── __mocks__/
│   │   └── analytics.ts  // This mock will be used automatically
│   └── analytics.ts      // The original module
└── components/
    └── Dashboard.tsx
```

```
// src/lib/__mocks__/analytics.ts
// A custom mock implementation for all stories
export const trackEvent = async () => {
  return { status: 'ok' };
};
```

**For `node_modules`**, create a `__mocks__` directory in your project's root. Inside, create a file named after the package you want to mock. For deep imports, replicate the folder structure.

```
// project-root/__mocks__/lodash-es.js
export default {
  VERSION: 'mocked!',
};

// project-root/__mocks__/lodash-es/add.js
export default (a, b) => 'mocked add';
```

Then, register the mock in your Storybook preview config:

```
// .storybook/preview.ts
import { sb } from 'storybook/test';

sb.mock('../src/lib/analytics.ts');
sb.mock('lodash-es');
sb.mock('lodash-es/add');
```

Currently, we only support mocking ES Modules. Mocking CommonJS modules is not supported.

### Type-safe mocking with `import()`

To improve developer experience and prevent broken paths, `sb.mock` also accepts a dynamic `import()` statement. This gives you full TypeScript support and IDE autocompletion, ensuring that if you refactor or move a file, your mock paths will be updated automatically.

```
// .storybook/preview.ts
import { sb } from 'storybook/test';

// ✅ Type-safe, refactor-friendly, and recommended!
sb.mock(import('../lib/analytics.ts'));
```

Under the hood, Storybook still operates on the string path, but this syntax provides a superior authoring experience. Note that any aliased paths are not supported within the `import()` statement.

## How it works: Ahead-of-time transformation

The magic behind `sb.mock()` is a powerful **Ahead-of-Time (AOT)** transformation strategy. Unlike our previous approach that manipulated `package.json`, this new system integrates directly with your bundler.

During startup, custom Vite and Webpack plugins scan your `.storybook/preview.ts` file for all `sb.mock()` calls. They then intelligently rewrite your application's dependency graph _before_ it's served to the browser or bundled for production.

This means the final code that runs in the browser already has the mocked modules baked in. This approach is:

-   **Performant**: There is zero runtime overhead.
-   **Robust**: It works identically in dev mode and in static production builds.
-   **Simple**: It requires no complex client-side interception or Service Workers.

### Comparison to other mocking solutions

This new API offers a clear improvement over our previous approach and provides a focused alternative to general-purpose testing tools.

-   **vs. old subpath imports**: The new API is a major leap forward. You no longer need to modify `package.json`, change your component import paths, or create boilerplate `.mock.ts` files.
-   **vs. Vitest**: While powered by Vitest's engine, the Storybook implementation is tailored for component isolation.
    -   **Global scope**: Mocks are defined globally in `preview.ts` and apply to all stories.
    -   **No factory functions**: The API does not accept a runtime factory (e.g., `sb.mock('path', () => ({}))`) to ensure reliability in static builds. For complex mocks, use the `__mocks__` directory.
    -   **Static by design**: The system is intentionally static to guarantee consistency between development and production builds.

## Try it today

Module mocking is available in **Storybook 9.1**. To get started, upgrade your project:

```
npx storybook@latest upgrade
```

To learn more, check out the full examples and API details in the [**Storybook documentation**](https://storybook.js.org/docs/writing-stories/mocking-data-and-modules/mocking-modules?ref=storybookblog.ghost.io). We can't wait to see what you build!

> Testing components that depend on things like localStorage or authentication can be tricky. Storybook makes it easy with our new module mocking API built on top of @vitest.dev's excellent mocking tools. storybook.js.org/blog/next-ge...
> 
> — [Storybook (@storybook.js.org)](https://bsky.app/profile/did:plc:osfpupzlwycyr6dxic6adh7t?ref_src=embed&ref=storybookblog.ghost.io) [2025-08-21T18:00:06.677Z](https://bsky.app/profile/did:plc:osfpupzlwycyr6dxic6adh7t/post/3lwwji2agw22o?ref_src=embed&ref=storybookblog.ghost.io)