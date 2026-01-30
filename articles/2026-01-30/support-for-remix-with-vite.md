---
title: "Support for Remix with Vite"
source: "https://vercel.com/changelog/support-for-remix-with-vite"
publishedDate: "2024-03-06"
category: "frontend"
feedName: "Vercel"
author: "Nathan Rajlich"
---

1 min read

Mar 6, 2024

Vercel now supports deploying Remix applications using Vite.

vite.config.js

```
import { vitePlugin as remix } from '@remix-run/dev';import { installGlobals } from '@remix-run/node';import { defineConfig } from 'vite';import tsconfigPaths from 'vite-tsconfig-paths';import { vercelPreset } from '@vercel/remix/vite';installGlobals();export default defineConfig({  plugins: [    remix({      presets: [vercelPreset()],    }),    tsconfigPaths(),  ],});
```

Configuring your Remix application with the Vercel Vite preset.

We've collaborated with the Remix team to add [Server Bundles](https://remix.run/docs/en/main/future/server-bundles) to Remix. Vercel will now detect Remix projects using Vite and optimize them using our new Vite preset ([@vercel/remix/vite](https://www.npmjs.com/package/@vercel/remix)).

This preset enables adding additional features for Remix on Vercel such as:

-   **Streaming SSR:** Dynamically stream content with both Node.js and Edge runtimes
    
-   **API Routes:** Easily build your serverless API with Remix and a route `loader`
    
-   **Advanced Caching:** Use powerful cache headers like `stale-while-revalidate`
    
-   **Data Mutations:** Run `actions` inside Vercel Functions
    

[Deploy Remix to Vercel](https://vercel.com/templates/remix/remix-boilerplate) or learn more [in the docs](https://vercel.com/docs/frameworks/remix).