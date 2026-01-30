---
title: "Exceeding included Image Optimization usage no longer pauses deployments"
source: "https://vercel.com/changelog/exceeding-included-image-optimization-usage-no-longer-pauses-deployments"
publishedDate: "2023-09-28"
category: "frontend"
feedName: "Vercel"
author: "Steven Salat"
---

1 min read

Sep 28, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F57Z88aALMUvEYjwHevxrt8%2F4d2c81e6626cffa011ac8050c6a27fec%2FImage_Optimization_-_Dark_Mode.png&w=1920&q=75)

Based on your feedback, rather than pausing a deployment when exceeding the included [Image Optimization usage](https://vercel.com/docs/image-optimization/limits-and-pricing), Vercel will now **only pause optimization for additional source images**.

-   Your existing images and all traffic will not be affected
    
-   Additional source images will throw a 402 status code when optimizing, triggering the [`onError`](https://nextjs.org/docs/app/api-reference/components/image#onerror) callback (if provided) and showing the [`alt`](https://nextjs.org/docs/app/api-reference/components/image#alt) text instead of the image 
    

[Check out our documentation](https://vercel.com/docs/image-optimization/limits-and-pricing) to learn more.

**Ready to deploy?** Start building with a free account. Speak to an expert for your _Pro_ or Enterprise needs.

**Explore Vercel Enterprise** with an interactive product tour, trial, or a personalized demo.