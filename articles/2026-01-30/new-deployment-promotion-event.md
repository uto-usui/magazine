---
title: "New deployment promotion event"
source: "https://vercel.com/changelog/new-webhook-for-promotion-events"
publishedDate: "2024-07-03"
category: "frontend"
feedName: "Vercel"
author: "Mark Knichel"
---

1 min read

Jul 3, 2024

Get notified after a deployment [promotion](https://vercel.com/docs/deployments/managing-deployments#managing-promotion) by subscribing to the new `deployment.promoted` [event](https://vercel.com/docs/observability/webhooks-overview/webhooks-api#deployment.promoted) through a webhook.

A promotion is the act of assigning your production domains to a deployment, so it starts serving your production traffic. This new event will notify you when:

-   Deployments are automatically promoted and domains are assigned (default)
    
-   Deployments are [explicitly promoted](https://vercel.com/docs/deployments/managing-deployments#staging-and-promoting-a-production-deployment) from the CLI, API, or Dashboard.
    

[Learn more about promotions](https://vercel.com/docs/deployments/managing-deployments#managing-promotion) or see the [full list of events](https://vercel.com/docs/observability/webhooks-overview/webhooks-api).