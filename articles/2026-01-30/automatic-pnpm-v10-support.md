---
title: "Automatic pnpm v10 support"
source: "https://vercel.com/changelog/automatic-pnpm-v10-support"
publishedDate: "2025-02-28"
category: "frontend"
feedName: "Vercel"
author: "Austin Merrick"
---

1 min read

Feb 28, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F67zTMSYmjAghbXTjPySZ1p%2Fd97fd7481adfd030ce1589ffe8614179%2FClaim_Deployment_Light.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4RXBXOZ25N9LaEMFJd0CVe%2F57eb4984826b611278b5d023d3bf1877%2FClaim_Deployment_Dark.jpg&w=1920&q=75)

Vercel now supports pnpm v10.

New projects with a `pnpm-lock.yaml` file with `lockfileVersion: '9.0'` will automatically use pnpm v10 for Install and Build Commands. Existing projects will continue to use pnpm v9 for backwards compatibility, since pnpm v9 also uses `lockfileVersion: '9.0'`.

Check your [build logs](https://vercel.com/docs/deployments/logs) to see which version a deployment uses. If you'd like to manually upgrade or downgrade your version, [use Corepack](https://vercel.com/docs/deployments/configure-a-build#corepack).

Visit the [package managers documentation](https://vercel.com/docs/deployments/builds/package-managers#supported-package-managers) to learn more.