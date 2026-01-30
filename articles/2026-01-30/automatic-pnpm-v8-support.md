---
title: "Automatic pnpm v8 support"
source: "https://vercel.com/changelog/automatic-pnpm-v8-support"
publishedDate: "2023-03-28"
category: "frontend"
feedName: "Vercel"
author: "Ethan Arrowood"
---

1 min read

Mar 28, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2zG9t1ad1WB5ZhthNodkm5%2F41b43c1187a02d0620c1e34c06cf61f6%2Fpnpm-v7-22-05-12-LIGHT.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FUbYCSZ5cSZMY2L84IZJe6%2Ff5a2fff8f93b3c84a58765bb821050e4%2Fpnpm-v7-22-05-12-DARK.png&w=1920&q=75)

Vercel now supports pnpm v8. For deployments with a `pnpm-lock.yaml` file with `lockfileVersion: '6.0',` Vercel will automatically use pnpm v8 for install and build commands.

To upgrade your project to pnpm v8, run `pnpm install -g pnpm@8` locally and then re-run `pnpm install` to generate the new `pnpm-lock.yaml` file. After updating, create a new deployment for the changes to take effect.

If you want to specify an exact version of pnpm in your Vercel project, enable [Corepack](https://vercel.com/docs/concepts/deployments/configure-a-build#corepack) (experimental).

[Check out the documentation](https://vercel.com/docs/concepts/deployments/build-step#install-command) to learn more.