---
title: "Checks API support added for Marketplace integration providers"
source: "https://vercel.com/changelog/checks-api-support-added-for-marketplace-integration-providers"
publishedDate: "2025-04-30"
category: "frontend"
feedName: "Vercel"
author: "Fabio Benedetti"
---

1 min read

Apr 30, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6ls2JmbyIEsL03K7cinalM%2F5b3e9b8d26c273bf72f0b4bdc545fc59%2FChecks_ALT_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3QcW6i4Mn59P693uGCEiEN%2F8e3445698b8ca1f39cd3471df3f8baf8%2FChecks_ALT_-_Dark__1_.png&w=1920&q=75)

Providers building native integrations for the [Vercel Marketplace](https://vercel.com/marketplace) can now use the [Checks API](https://vercel.com/docs/checks) to deliver deeper functionality for their users.

With Vercel's Checks API, you can define and run custom tests and assertions after every deployment, then surface actionable results directly in the Vercel dashboard.

As a testing provider, you can implement checks such as reliability tests (e.g. API availability, runtime errors), performance tests (e.g. response time thresholds, load simulation), or Web Vitals (e.g. layout shift). This helps developers catch real-world issues earlier in their workflow, powered by your integration.

When building your integration, keep these best practices in mind:

-   Offer minimal or no-configuration solutions so developers can easily run checks
    
-   Provide a guided onboarding experience from installation to first results
    
-   Display clear, actionable outcomes directly in the Vercel dashboard
    
-   Document ways to extend or customize checks for advanced users
    

Learn more in the [Checks API documentation](https://vercel.com/docs/checks).