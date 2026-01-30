---
title: "Introducing Platform Elements"
source: "https://vercel.com/changelog/introducing-platform-elements"
publishedDate: "2025-12-05"
category: "frontend"
feedName: "Vercel"
author: "Hayden Bleasel"
---

1 min read

Dec 5, 2025

As part of the new [Vercel for Platforms](https://vercel.com/platforms) product, you can now use a set of prebuilt UI blocks and actions to add functionality directly to your application.

[An all-new library](https://vercel.com/platforms/docs/platform-elements/blocks/custom-domain) of production-ready shadcn/ui components and actions help you launch (and upgrade) quickly.

**Blocks:**

-   [custom-domain](https://vercel.com/platforms/docs/platform-elements/blocks/custom-domain): Domain configuration with DNS validation and real-time verification
    
-   [deploy-popover](https://vercel.com/platforms/docs/platform-elements/blocks/deploy-popover): Deployment interface with status and history
    
-   [dns-table](https://vercel.com/platforms/docs/platform-elements/blocks/dns-table): DNS records in a copyable format
    
-   [claim-deployment](https://vercel.com/platforms/docs/platform-elements/blocks/claim-deployment): Ownership verification flow
    
-   [report-abuse](https://vercel.com/platforms/docs/platform-elements/blocks/report-abuse): Abuse reporting form
    

**Actions:**

-   [add-custom-domain](https://vercel.com/platforms/docs/platform-elements/actions/add-custom-domain): Add and verify domains programmatically
    
-   [deploy-files](https://vercel.com/platforms/docs/platform-elements/actions/deploy-files): Deploy files to any project
    

You can install Platforms components with the Vercel Platforms CLI. For example:

```
npx @vercel/platforms add claim-deployment
```

Start building with Platform Elements using our Quickstart for [Multi-Tenant](https://vercel.com/platforms/docs/multi-tenant-platforms/quickstart) or [Multi-Project](https://vercel.com/platforms/docs/multi-project-platforms/quickstart) platforms.