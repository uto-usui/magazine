---
title: "Projects using pnpm can now be deployed with zero configuration"
source: "https://vercel.com/changelog/projects-using-pnpm-can-now-be-deployed-with-zero-configuration"
publishedDate: "2022-03-22"
category: "frontend"
feedName: "Vercel"
author: "Ethan Arrowood"
---

1 min read

Mar 22, 2022

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3afTGxfGMDjdtmslj5QiF8%2F33ef652edcb4a04f82cd3d125db673d0%2FPython_3.9.png&w=1920&q=75)

Projects using [pnpm](https://pnpm.io/) can now be deployed to Vercel with zero configuration. Vercel is also now sponsoring pnpm to further package manager innovation.

Like Yarn and npm, pnpm is a package manager focused on saving disk space and [boosting installation speed](https://pnpm.io/benchmarks) by utilizing symlinks. Starting today, Projects that contain a `pnpm-lock.yaml` file will automatically run `pnpm install` as the default [Install Command](https://vercel.com/docs/concepts/deployments/build-step#install-command) using the latest version of pnpm.

[Check out the documentation](https://vercel.com/docs/concepts/deployments/build-step#install-command) as well.