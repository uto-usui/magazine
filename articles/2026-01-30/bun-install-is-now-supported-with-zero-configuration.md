---
title: "Bun install is now supported with zero configuration"
source: "https://vercel.com/changelog/bun-install-is-now-supported-with-zero-configuration"
publishedDate: "2023-09-11"
category: "frontend"
feedName: "Vercel"
author: "Steven Salat"
---

1 min read

Sep 11, 2023

![Vercel + Bun logo in dark theme](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7JPS5n0FeR230KPlnU35yM%2F5db145a29b079f3320d197a822072659%2FBun_Light.png&w=1920&q=75)![Vercel + Bun logo in dark theme](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7tWQ0xTNNXf5KTmcrG4Lmt%2F2b52a43df754fe8564b6838e9812b78d%2FBun_Dark.png&w=1920&q=75)

Projects using [Bun as a package manager](https://bun.sh/docs/cli/install) can now be deployed to Vercel with zero configuration.

Like yarn, npm, and pnpm, Bun acts as a package manager focused on saving disk space and boosting installation speed. Starting today, Projects that contain a `bun.lockb` file will automatically run `bun install` as the default [Install Command](https://vercel.com/docs/concepts/deployments/build-step#install-command) using `bun@1`.

This change impacts the build phase but not runtime. Therefore, Serverless Functions will not use the Bun runtime yet.

[Check out the documentation](https://vercel.com/docs/concepts/deployments/build-step#install-command) to learn more.