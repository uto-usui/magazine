---
title: "Revert and pin deployments with Instant Rollback"
source: "https://vercel.com/changelog/revert-and-pin-deployments-with-instant-rollback"
publishedDate: "2023-12-19"
category: "frontend"
feedName: "Vercel"
author: "Sean Massa"
---

1 min read

Dec 19, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6VQMsjhpegDltbqu5x9IPT%2Fbd1ea93275469e38e57fe7e27c86f4f2%2FInstant_Rollback_-_Light_Mode.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4U00NSZktLy4VBKD5yHLUE%2F8fc47850afc8ab653907698325d1ccd6%2FInstant_Rollback_-_Light_Mode__1_.png&w=1920&q=75)

[Instant Rollback](https://vercel.com/docs/deployments/instant-rollback) enables you to quickly revert to a previous production deployment, making it easier to fix breaking changes.

You can now choose to prevent the automatic assignment of production domains when rolling back. Reverted deployments will not be replaced by new production deployments until you [manually promote](https://vercel.com/changelog/stage-and-manually-promote-deployments-to-production) a new deployment.

[Learn more](https://vercel.com/docs/deployments/managing-deployments#manually-promoting-to-production) in our documentation.