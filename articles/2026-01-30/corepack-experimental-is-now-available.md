---
title: "Corepack (experimental) is now available"
source: "https://vercel.com/changelog/corepack-experimental-is-now-available"
publishedDate: "2022-07-14"
category: "frontend"
feedName: "Vercel"
author: "Steven Salat"
---

1 min read

Jul 14, 2022

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7F9V7KvrF5Ff53oa1veHe3%2Fc7c94180341739b4b49620c80e736630%2F178598851-ef37f144-3e82-4197-8108-8cd26095a0c3.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F55bANePZSdLvk52LG4FWjh%2Fa055f72d658062fbc51d173f4df78bab%2F178598853-a8c857f6-88ec-49f7-9003-bbcb1ab1d284.png&w=1920&q=75)

[Corepack](https://nodejs.org/docs/latest-v16.x/api/corepack.html) allows you to use a specific package manager version (pnpm, yarn, npm) in your Project. Starting today, you can enable experimental Corepack support.

Enable Corepack by adding [`packageManager`](https://nodejs.org/docs/latest-v16.x/api/packages.html#packagemanager) to your `package.json` file and `ENABLE_EXPERIMENTAL_COREPACK=1` as an Environment Variable in your Project. Corepack is experimental and not subject to semantic versioning rules. Breaking changes or removal may occur in any future release of Node.js.

[Check out the documentation](https://vercel.com/docs/concepts/deployments/configure-a-build#corepack) as well.