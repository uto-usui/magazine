---
title: "Support for React Router v7"
source: "https://vercel.com/changelog/support-for-react-router-v7"
publishedDate: "2025-02-13"
category: "frontend"
feedName: "Vercel"
author: "Nathan Rajlich"
---

1 min read

Feb 13, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7GcVmscGYK75LuQqHIXyCJ%2F1802d0a16d2f6e1cc202bf4e143119e0%2FRRv7_Light.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7sc6zKPM4smZHtfsZ0nzYY%2Fe9c7566d04fd801b48ca495bd56ee994%2FRRv7_Dark.jpg&w=1920&q=75)

Vercel now supports [React Router v7](https://reactrouter.com/) applications when [used as a framework](https://reactrouter.com/start/framework/installation):

react-router.config.ts

```
import { vercelPreset } from "@vercel/react-router/vite";import type { Config } from "@react-router/dev/config";export default {  ssr: true,  presets: [vercelPreset()],} satisfies Config;
```

Configuring your React Router application with the Vercel preset.

This includes support for server-rendered React Router applications using Vercel's [Fluid compute](https://vercel.com/docs/functions/fluid-compute). Further, the Vercel preset intelligently splits application bundles across Vercel Functions, and supports custom server entry points.

[Deploy React Router to Vercel](https://vercel.com/templates/react-router/react-router-boilerplate) or learn more about [React Router on Vercel](https://vercel.com/docs/frameworks/react-router).