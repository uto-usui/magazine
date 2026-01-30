---
title: "Node.js 10 is being deprecated"
source: "https://vercel.com/changelog/node-js-10-is-being-deprecated"
publishedDate: "2021-02-09"
category: "frontend"
feedName: "Vercel"
author: "Leo Lamprecht"
---

1 min read

Feb 9, 2021

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2iq26xS3E5i3TQMUgYj2Wp%2Fa9fee71ee8915ba66dcf05540e1b3673%2Fpreview.png&w=1920&q=75)

Following the [release of Node.js 14](https://vercel.com/changelog/node-js-14-lts-is-now-available) last week, Vercel is announcing the deprecation of Node.js 10, which reaches its [offical end of life](https://nodejs.org/en/about/releases/) on April 30th 2021.

On **April 20th 2021**, Node.js 10 will be disabled in the Project Settings and existing Projects that have Node.js 10 selected will render an error whenever a new Deployment is created. The same error will show if the Node.js version was configured in the source code.

Serverless Functions of existing Deployments that are using Node.js 10 will be migrated to Node.js 12 on the date mentioned above.

If your Project is using Node.js 10 (which you've either defined in `engines` in `package.json` or on the General page in the Project Settings), we recommend upgrading it to the latest version (Node.js 14).

Need help migrating to Node.js 14? [Let us know](https://vercel.com/support) and we'll help you out.