---
title: "Automatically skip unnecessary deployments in monorepos"
source: "https://vercel.com/changelog/automatically-skip-unnecessary-deployments-in-monorepos"
publishedDate: "2024-07-22"
category: "frontend"
feedName: "Vercel"
author: "Tom Knickman"
---

1 min read

Jul 22, 2024

![Root Directory Settings](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4DrkYJr23lN5fXGiihnUcC%2F2313f8d9efdc4787db3dc93d69fe6bc9%2Froot_directory_settings_light.png&w=1920&q=75)![Root Directory Settings](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3uxrFstQGlihHLfOBcfd65%2F5c47ed588ea47c93712d433f189d54f8%2Froot_directory_settings_dark.png&w=1920&q=75)

Vercel now automatically skip builds for unchanged code in your monorepo.

Projects without changes in their source code (or the source code of internal dependencies) will be skipped, reducing build queuing and improving the time to deployment for affected projects.

This feature is powered by [Turborepo](https://turbo.build/repo/docs/core-concepts/package-and-task-graph#package-graph), and works with any [monorepo using workspaces](https://vercel.com/docs/monorepos#requirements). For more advanced customization, like canceling builds based on branches, you can configure an [Ignored Build Step](https://vercel.com/docs/projects/overview#ignore-build-step-on-redeploy).

Learn more about [skipping unaffected projects](https://vercel.com/docs/monorepos#skipping-unaffected-projects).