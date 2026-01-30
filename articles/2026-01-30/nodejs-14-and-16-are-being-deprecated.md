---
title: "Node.js 14 and 16 are being deprecated"
source: "https://vercel.com/changelog/node-js-14-and-16-are-being-deprecated"
publishedDate: "2023-05-19"
category: "frontend"
feedName: "Vercel"
author: "Sean Massa"
---

1 min read

May 19, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6JLmPDvgimE8qEnJZjIU1J%2Ff222775d612aa391dad96f20e777ecc5%2FNode.js_14_and_16_are_being_deprecated_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2QrK7HVbJ6I27GptFNqoBe%2F027bdb289b29de17e91fb8a6ca478604%2FNode.js_14_and_16_are_being_deprecated_-_Dark.png&w=1920&q=75)

Vercel is announcing the deprecation of Node.js 14 and 16, which will be discontinued on **August 15th 2023** and **January 31 2025** respectively. Node.js 14 reached [official end of life](https://github.com/nodejs/Release#end-of-life-releases) on April 30th 2023. Node.js 16 reached [official end of life](https://nodejs.org/en/blog/announcements/nodejs16-eol) on September 11, 2023.

**On** **August 15th 2023**, Node.js 14 will be disabled in the Project Settings and existing Projects that have Node.js 14 selected will render an error whenever a new Deployment is created. The same error will show if the Node.js version was configured in the source code.

**On January 31 2025**, Node.js 16 will be disabled in the Project Settings and existing Projects that have Node.js 16 selected will render an error whenever a new Deployment is created. The same error will show if the Node.js version was configured in the source code.

While existing Deployments with Serverless Functions will not be affected, Vercel strongly encourages upgrading to [Node.js 18](https://vercel.com/changelog/node-js-18-lts-is-now-available) or [Node.js 20](https://vercel.com/changelog/node-js-v20-lts-is-now-generally-available) to ensure you receive security updates (using either `engines` in `package.json` or the [General page in the Project Settings](https://vercel.com/docs/concepts/projects/overview#general-settings)).

[Check out the documentation](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/node-js) as well.