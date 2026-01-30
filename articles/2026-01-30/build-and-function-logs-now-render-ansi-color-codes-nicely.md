---
title: "Build and Function Logs now render ANSI color codes nicely"
source: "https://vercel.com/changelog/build-and-function-logs-now-render-ansi-color-codes-nicely"
publishedDate: "2020-12-03"
category: "frontend"
feedName: "Vercel"
author: "Nathan Rajlich"
---

1 min read

Dec 3, 2020

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1FNLaKNJo3OjbJWHetqaIZ%2Ff317b763e99191fcd8987c3dd3c6a1ef%2FANSI_Colors_OG_Image_.png&w=1920&q=75)

If the logs that your source code or your framework are exposing within the Build Step or within your Serverless Functions contain ANSI color codes for providing more clarity, Vercel previously directly printed them out in the respective views on the Dashboard.

As of today, however, all of those codes are automatically parsed within the Deployment View, which contains Build Logs on the main page, but also the logs for your Serverless Functions on the "Functions" tab.

In the example above, you can see that ANSI codes are now automatically rendered as the colors they are supposed to represent, which makes the text much easier to understand.