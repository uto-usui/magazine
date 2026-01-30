---
title: "Claimed deployments now include third-party resources"
source: "https://vercel.com/changelog/claimed-deployments-now-include-third-party-resources"
publishedDate: "2025-09-23"
category: "frontend"
feedName: "Vercel"
author: "Tony Pan"
---

1 min read

Sep 23, 2025

AI platforms, coding tools, and workflow apps can now create projects on Vercel that users can later claim as their own, transferring deployment ownership together with any resources by third-party providers.

How it works:

1.  Instant deployment: Any third-party can use the [Vercel API](https://vercel.com/docs/rest-api/reference/endpoints/integrations/connect-integration-resource-to-project) to create a project, deploy an application, and attach a resource store (such as a database).
    
2.  Claim and transfer: When a user claims the Vercel deployment, the attached resources automatically move with it. Full ownership of the complete deployment is handed off to the user.
    

This is available today through [Prisma](https://www.prisma.io/blog/introducing-instant-app-deployments-in-partnership-with-vercel), the first Vercel Marketplace provider to support instant deployment. Prisma customers can now spin up a database and a Vercel-hosted app together as a single, bundled stack.

We’re expanding this flow to more Marketplace providers so they can pair their products, such as authentication, observability, and workflow services, with Vercel deployments through one-click claiming.

Check out our [Claim Deployments live demo](https://claim-deployments-demo-with-resource.vercel.app/) and [documentation](https://vercel.com/docs/deployments/claim-deployments) to learn more.