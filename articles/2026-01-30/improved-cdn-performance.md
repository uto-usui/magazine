---
title: "Improved CDN Performance"
source: "https://vercel.com/changelog/improved-cdn-performance"
publishedDate: "2024-07-16"
category: "frontend"
feedName: "Vercel"
author: "Casey Gowrie"
---

1 min read

Jul 16, 2024

We've improved our [**Edge Network**](https://vercel.com/docs/edge-network/overview) performance by increasing the initial TCP congestion window by 300%. This enhancement allows sending more data in the initial and subsequent round-trips, resulting in faster page loads for websites of all sizes.

End users will experience significant speed improvements when first loading any site hosted on Vercel, with many sites seeing up to 3x faster initial page loads. The larger initial congestion window allows data transfer to ramp up more quickly, reaching higher speeds in fewer round-trips. This optimization is particularly beneficial for high-latency connections, such as those on mobile devices.

This performance upgrade is available immediately for all Vercel customers across all plans, with no action required. Your sites will automatically benefit from these improvements without any changes needed on your part.