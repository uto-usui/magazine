---
title: "Support for TanStack Start"
source: "https://vercel.com/changelog/support-for-tanstack-start"
publishedDate: "2025-11-10"
category: "frontend"
feedName: "Vercel"
author: "Austin Merrick"
---

1 min read

Nov 10, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3CAHbcMenkBzwh1XmCEmw0%2Fb60caace75cd13c5096dd5aa90968161%2FVercel___TanStack_Start_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3jXb9gCyhhIGscGSWi1Ar9%2F7b6195f37a789f9ce1e4aaa5346ce59e%2FVercel___TanStack_Start_-_Dark.png&w=1920&q=75)

Vercel detects and supports TanStack Start applications, a full-stack framework powered by TanStack Router for React and Solid.

[Create a new TanStack Start app](https://vercel.com/templates/starter/tanstack-start-on-vercel) or add nitro() to vite.config.ts in your existing application to easily deploy your projects:

vite.config.ts

```
import { tanstackStart } from '@tanstack/react-start/plugin/vite'import { defineConfig } from 'vite'import viteReact from '@vitejs/plugin-react'import { nitro } from 'nitro/vite'export default defineConfig({  plugins: [    tanstackStart(),    nitro(),    viteReact(),  ],})
```

TanStack Start apps on Vercel use [Fluid compute](https://vercel.com/fluid) with [Active CPU pricing](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute) by default. This means your TanStack Start app will automatically scale up and down based on traffic, and you only pay for what you use, not for idle function time.

Visit the [TanStack Start on Vercel documentation](https://vercel.com/docs/frameworks/full-stack/tanstack-start) to learn more