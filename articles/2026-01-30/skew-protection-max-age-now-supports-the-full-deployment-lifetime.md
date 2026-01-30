---
title: "Skew Protection max age now supports the full deployment lifetime"
source: "https://vercel.com/changelog/skew-protection-max-age-now-supports-the-full-deployment-lifetime"
publishedDate: "2025-11-06"
category: "frontend"
feedName: "Vercel"
author: "Steven Salat"
---

1 min read

Nov 6, 2025

Skew Protection helps ensure that requests for a user's session are consistently routed to the same deployment, even when new versions are being rolled out.

You can now configure your project's [Skew Protection](https://vercel.com/docs/skew-protection) max age to persist for the entire lifetime of your deployments. This removes the previous limits of 12 hours on Pro and 7 days on Enterprise.

Set the value to any duration less than or equal to your project's [Deployment Retention](https://vercel.com/docs/deployment-retention) policy.

Learn more about [Skew Protection](https://vercel.com/docs/skew-protection) and [enable it in your project](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fadvanced%23skew-protection&title=Enable+Skew+Protection).