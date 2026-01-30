---
title: "Intelligent ignored builds using Turborepo"
source: "https://vercel.com/changelog/intelligent-ignored-builds-using-turborepo"
publishedDate: "2022-08-26"
category: "frontend"
feedName: "Vercel"
author: "Tom Knickman"
---

1 min read

Aug 26, 2022

![Intelligent ignored builds using Turborepo](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FdvrRBlZot9GWQ6SyvUOvm%2Fcdde4147a75308e191c23f6c38b6a610%2FNew_System_Environment_Variable_-_LIGHT.png&w=1920&q=75)![Intelligent ignored builds using Turborepo](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F37JBI8vsgrbgYrxfUz4RUL%2F347346dd79232902cbc3bf471fdf1e0f%2FNew_System_Environment_Variable-_DARK.png&w=1920&q=75)

When deployed on Vercel, [Turborepo](https://turborepo.org/) now supports only building affected projects via the new [`turbo-ignore`](https://www.npmjs.com/package/turbo-ignore) npm package, saving time and helping teams stay productive.

[`turbo-ignore`](https://www.npmjs.com/package/turbo-ignore) leverages the Turborepo dependency graph to automatically determine if each app, or one of its dependencies has changed and needs to be deployed.

Try it now by setting `npx turbo-ignore` as the [Ignored Build Step](https://vercel.com/docs/concepts/projects/overview#ignored-build-step) for each project within your monorepo.

[Check out the documentation](https://vercel.com/docs/concepts/monorepos/turborepo#step-4:-setup-the-ignored-build-step) to learn more.