---
title: "Serverless Functions are now deployed to US East by default"
source: "https://vercel.com/changelog/serverless-functions-are-now-deployed-to-us-east-by-default"
publishedDate: "2021-01-14"
category: "frontend"
feedName: "Vercel"
author: "Paco Coursey"
---

1 min read

Jan 14, 2021

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4neLj9liH8zhE3b8NgAPYu%2F020a40917ed5c108465956909b4b35b7%2FFunction_Region_OG_Image.png&w=1920&q=75)

Many Serverless Functions communicate with third-party services. Because most of these services are available in the US East region, deploying Serverless Functions to US West leads to slower response times.

For that reason (and to decrease the latency for requests arriving from Europe), newly created projects will default to the **US East** region (Washington, D.C., USA) instead of **US West** (San Francisco, USA) when deploying Serverless Functions.

Existing projects will be unaffected, but can be switched to the new default from the new "Serverless Functions" page in the Project Settings.

Check out [the documentation](https://vercel.com/docs/serverless-functions/regions) as well.