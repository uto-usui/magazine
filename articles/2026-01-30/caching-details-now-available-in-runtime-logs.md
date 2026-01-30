---
title: "Caching details now available in Runtime Logs"
source: "https://vercel.com/changelog/caching-details-now-available-in-runtime-logs"
publishedDate: "2025-10-31"
category: "frontend"
feedName: "Vercel"
author: "Luc Leray"
---

1 min read

Oct 31, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FceFK8hSmuRjhbXik89a2r%2F848197f034c3e877d9c5ceb61b104409%2FCache_Insights_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1JU566aEYwjXVuPnV6w43J%2F4264f5231e3ef2b9d7089ed1abb9060b%2FCache_Insights_-_Dark.png&w=1920&q=75)

You can now view more details on how Vercel's [CDN](https://vercel.com/docs/cdn) globally serves cached content to users as quickly as possible.

In the right-hand panel of the Runtime Logs page, we now list:

-   **Cache key**: A unique identifier for a specific version of a cached page
    
-   **Cache tags**: Tags associated with the cached data
    
-   **Revalidation reason**: If a revalidation took place, the reason why the content was being revalidated (time-based, tag-based, or deployment-based)
    

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2bobT48iegA1gtZuQ0G2Cs%2Fe93ccb9c32d7f16468ef783f7e969433%2FCache_Insights_Secondary_-_Light__1_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F78Zhrc5cpaYDs1qowutail%2Fd394c76a2aa7cda72789590928c59833%2FCache_Insights_Secondary_-_Darl.png&w=1920&q=75)

This is available to all Vercel users at no additional cost. [Try it out](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Flogs) or learn more about [Runtime Logs](https://vercel.com/docs/logs/runtime).