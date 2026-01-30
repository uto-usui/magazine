---
title: "View & query bot verification data in Vercel Observability"
source: "https://vercel.com/changelog/view-and-query-bot-verification-data-in-vercel-observability"
publishedDate: "2025-09-30"
category: "frontend"
feedName: "Vercel"
author: "Casey Gowrie"
---

1 min read

Sep 30, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5aJXuafWQJFIujBXSKWszk%2Fa1b9ccbe15d40d5ef9646cfe68aca82a%2FVerified_Bots_in_O11y_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F23C8yQyaykWi5uDoK5ssdn%2Ff43670532842f2cd6d039acee25396d3%2FVerified_Bots_in_O11y_-_Dark.png&w=1920&q=75)

Vercel inspects every request to identify bot traffic. For requests claiming to come from a verified source, Vercel cross-checks against its directory of [verified bots](https://vercel.com/docs/bot-management#verified-bots) and validates them against strict verification criteria.

We've added three new dimensions to the query builder when analyzing Edge Requests to help you understand bot activity to your projects:

-   **Bot name:** Identify specific bots
    
-   **Bot category:** Group bots by type
    
-   **Bot verified:** Distinguish between verified, spoofed, and unverifiable bots
    

Additionally, the Edge Requests dashboard in Observability now displays verification badges next to bot names.

All users can view bot verification badge while Observability Plus subscribers can query this data at no extra cost.

[Try it out](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fobservability%2Fnotebooks) or learn more about [Observability](https://vercel.com/docs/observability) and [Observability Plus](https://vercel.com/docs/observability/observability-plus).