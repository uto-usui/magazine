---
title: "Improved Speed Insights experience"
source: "https://vercel.com/changelog/improved-speed-insights-experience"
publishedDate: "2023-12-07"
category: "frontend"
feedName: "Vercel"
author: "Tobias Lins"
---

1 min read

Dec 7, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5np6fZDqaragkecOXenLmX%2F77dc13864715d68caf0549fe922569ae%2FSpeed_Insights_v2.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2HLSUnig7iqss7VWnn7pkg%2F9bf55d6026d3c811761fbbef8d95f5a2%2FSpeed_Insights_v2.jpg&w=1920&q=75)

Speed Insights measures site performance and helps you understand areas for improvement. This includes Core Web Vitals like [First Contentful Paint](https://vercel.com/docs/speed-insights#first-contentful-paint-fcp), [Largest Contentful Paint](https://vercel.com/docs/speed-insights#largest-contentful-paint-lcp), [Cumulative Layout Shift](https://vercel.com/docs/speed-insights#cumulative-layout-shift-cls), and more.

The Speed Insights experience has been improved to include:

-   **Support for all frontend frameworks:** You can now use Speed Insights with any framework using the new `@vercel/speed-insights` package. This includes supporting dynamic route segments in frameworks like SvelteKit and Remix.
    
-   **First-party data ingestion**: Data will now be processed directly through your own domain, eliminating the third-party domain lookup.
    
-   **Updated scoring criteria:** All previous and future metrics measured by Speed Insights are now updated with new weights, based on the latest guidance from Core Web Vitals and Lighthouse.
    
-   **UI improvements:** You can now view performance data by region. Displayed metrics now default to p75 (the experience of the fastest 75% of your users).
    
-   **Time to First Byte (TTFB):** This metric is now measured, providing visibility into how quickly the server responds to the first request.
    
-   **Advanced customization**: New tools to [intercept requests](https://vercel.com/docs/speed-insights/package#beforesend) and [set sample rates](https://vercel.com/docs/speed-insights/package#samplerate) on a per-project basis.
    

Speed Insights is [available on all plans](https://vercel.com/docs/speed-insights). Learn more about [upgrading to the new package](https://vercel.com/docs/speed-insights/migrating-from-legacy) and see how to take advantage of the new features.