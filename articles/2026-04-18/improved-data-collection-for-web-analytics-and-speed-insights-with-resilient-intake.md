---
title: "Improved data collection for Web Analytics and Speed Insights with resilient intake"
source: "https://vercel.com/changelog/improved-data-collection-for-web-analytics-and-speed-insights-with-resilient"
publishedDate: "2026-03-11"
category: "frontend"
feedName: "Vercel"
author: "Damien Simonin Feugas"
---

1 min read

Mar 11, 2026

Web Analytics and Speed Insights version 2 introduces resilient intake to improve data collection reliability. By dynamically discovering endpoints instead of relying on a single predictable path, the new packages ensure you capture more complete traffic and performance data.

To utilize resilient intake, update your packages and deploy your changes. No other configuration is required, and existing implementations will continue working as before. It's available to all teams at no additional cost.

**Install the latest versions**

```
npm install @vercel/analytics@latestnpm install @vercel/speed-insights@latest
```

These packages include a license change from Apache-2.0 to MIT to align with other open source packages. Nuxt applications can leverage Nuxt modules for a one-line installation of [Speed Insights](https://vercel.com/docs/speed-insights/quickstart?framework=nuxt#add-the-speedinsights-component-to-your-app) and [Web Analytics](https://vercel.com/docs/analytics/quickstart?framework=nuxt#add-@vercel/analytics-to-your-project).

Update your packages to capture more data, or explore the [Web Analytics documentation](https://vercel.com/docs/analytics) and [Speed Insights documentation](https://vercel.com/docs/speed-insights).