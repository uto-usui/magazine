---
title: "Easier toolbar setup for SvelteKit and other Vite-based frameworks"
source: "https://vercel.com/changelog/easier-toolbar-setup-for-sveltekit-and-other-vite-based-frameworks"
publishedDate: "2024-07-04"
category: "frontend"
feedName: "Vercel"
author: "Simon Holthausen"
---

1 min read

Jul 4, 2024

Vite-based frameworks such as SvelteKit, Remix, Nuxt, or Astro can now more easily integrate with the Vercel Toolbar in both [local](https://vercel.com/docs/workflow-collaboration/vercel-toolbar/in-production-and-localhost/add-to-localhost) and [production](https://vercel.com/docs/workflow-collaboration/vercel-toolbar/in-production-and-localhost/add-to-production) environments. The Toolbar enables you to comment on deployments, toggle feature flags, view draft content from a CMS, [and more](https://vercel.com/docs/workflow-collaboration/vercel-toolbar#vercel-toolbar-features).

The updated `@vercel/toolbar` package offers a Vite plugin and client-side function for injection and configuration, and can be integrated like this:

vite.config.js

```
import { vercelToolbar } from '@vercel/toolbar/plugins/vite';import { defineConfig } from 'vite';export default defineConfig({  plugins: [/* others...*/ vercelToolbar()]  // ...});
```

```
// in your framework's client entry point:import { mountVercelToolbar } from '@vercel/toolbar/vite';mountVercelToolbar();
```

[Check out the documentation](https://vercel.com/docs/workflow-collaboration/vercel-toolbar/in-production-and-localhost/add-to-localhost) to learn more.