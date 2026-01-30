---
title: "Rolling Releases are now generally available"
source: "https://vercel.com/changelog/rolling-releases-are-now-generally-available"
publishedDate: "2025-06-25"
category: "frontend"
feedName: "Vercel"
author: "Brooke Mosby"
---

1 min read

Jun 25, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3HNVgQInHoRT8OJk9tSmTX%2Fd00040796e8a9e092b06ebdd4c66cac3%2FRolling_Releases_Changelog.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7BDZGXm4IdgK9GF1aY5dnS%2F7a2832646b9d139426251cd047c6c626%2FRolling_Releases_Changelog.png&w=1920&q=75)

Rolling Releases are now generally available, allowing safe, incremental rollouts of new deployments with built-in monitoring, rollout controls, and no custom routing required.

Each rollout starts at a defined stage and can either progress automatically or be manually promoted to a full release. You can configure rollout stages per project and decide how each stage progresses, with updates propagating globally in under 300ms through our fast propagation pipeline.

Rolling releases also include:

-   **Real-time monitoring**: Track and compare error rates and [Speed Insights](https://vercel.com/docs/speed-insights) (like [Core Web Vitals](https://web.dev/articles/vitals#core-web-vitals), Time to First Byte, and more) between versions
    
-   **Flexible controls**: Rollouts can be managed via REST API, CLI, the project dashboard, or the Vercel Terraform provider
    
-   **Version-labeled logs**: Logs and telemetry are labeled by deployment for easier debugging
    

Pro and Enterprise teams can enable Rolling Releases on one project at no additional cost. Enterprise customers can upgrade to unlimited projects.

Learn more about [Rolling Releases](https://vercel.com/docs/rolling-releases) or [enable it on your project](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fbuild-and-deployment&title=Go+to+Rolling+Releases).