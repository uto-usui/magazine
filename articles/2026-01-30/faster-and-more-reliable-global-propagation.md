---
title: "Faster and more reliable global propagation"
source: "https://vercel.com/changelog/faster-and-more-reliable-global-propagation"
publishedDate: "2022-06-14"
category: "frontend"
feedName: "Vercel"
author: "Joe Haddad"
---

1 min read

Jun 14, 2022

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5rwly7DW6LaZINmHFFXmrJ%2F5ec5debdfe653e713f720f8cf8115b09%2FInfra_Improvements_-_LIGHT__1_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F224gHeJS74Kg1rLFohZjOo%2Feb2140d5d3a7bf8cfbf2a8a598261a56%2FInfra_Improvements_-_DARK__1_.png&w=1920&q=75)

We've upgraded our infrastructure resulting in significant performance and reliability improvements for all plans. Vercel's Edge infrastructure is now **70% faster at p99** for cache purges and configuration updates, serving over 25B requests per week.

Purges now **propagate globally in ~300ms,** regardless of the region the event originated from. These improvements impact all parts of the Vercel platform:

-   Faster production rollouts
    
-   Faster domain assignments (e.g. globally updating to the most recent deployment)
    
-   Faster project settings changes (e.g. toggling [password protection](https://vercel.com/support/articles/how-do-i-add-password-protection-to-my-vercel-deployment))
    
-   Faster [Incremental Static Regeneration](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration) (ISR) propagation
    

[Deploy now](https://vercel.com/templates) to try our improved infrastructure.