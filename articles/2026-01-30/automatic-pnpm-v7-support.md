---
title: "Automatic pnpm v7 Support"
source: "https://vercel.com/changelog/automatic-pnpm-v7-support"
publishedDate: "2022-05-12"
category: "frontend"
feedName: "Vercel"
author: "Ethan Arrowood"
---

1 min read

May 12, 2022

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5WchM1ZgIZu0s3cRCJak4c%2Fcdbb8552dfe138f347fa3f8e19ae0ce3%2Fpnpm-v7-22-05-12-LIGHT.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FTbOfbZ4OXmStmKfyppIGa%2F5ffca1ba9896bf6c9f789c0e8ae85667%2Fpnpm-v7-22-05-12-DARK.png&w=1920&q=75)

Vercel now supports pnpm v7. For deployments with a `pnpm-lock.yaml` file with `version: 5.4`, Vercel will automatically use pnpm v7 for install and build commands.

To upgrade your project to pnpm v7, run `pnpm install -g pnpm@7` locally and then re-run `pnpm install.`After updating, create a new deployment!

[Check out the documentation](https://vercel.com/docs/concepts/deployments/build-step#install-command) as well.