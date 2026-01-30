---
title: "Node.js 12 is being deprecated"
source: "https://vercel.com/changelog/node-js-12-is-being-deprecated"
publishedDate: "2022-05-20"
category: "frontend"
feedName: "Vercel"
author: "Steven Salat"
---

1 min read

May 20, 2022

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3lUpeTG1ecQ3QJSFP4XMkG%2F7927fc8d9e32af439334e13d2776d6a9%2Fog-image-node-12-deprecated-white-bg.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5FYtsLcZUNK63Ghy78fnu4%2F3c456ca42e2e39f3a97663350620a3cf%2Fog-image-node-12-deprecated-black-bg.png&w=1920&q=75)

Following the [release of Node.js 16](https://vercel.com/changelog/node-js-16-lts-is-now-available) last week, Vercel is announcing the deprecation of Node.js 12, which reached its [official end of life](https://nodejs.org/en/blog/release/v12.22.12/) on April 30th 2022.

On **October 3rd 2022**, Node.js 12 will be disabled in the Project Settings and existing Projects that have Node.js 12 selected will render an error whenever a new Deployment is created. The same error will show if the Node.js version was configured in the source code.

While existing Deployments with Serverless Functions using the Node.js 12 runtime will not be affected, we strongly encourage upgrading to Node.js 16 to ensure you receive security updates (using either `engines` in `package.json` or the General page in the Project Settings).

Check out [the documentation](https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-version) as well.