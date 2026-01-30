---
title: "Introducing Vercel for Platforms"
source: "https://vercel.com/changelog/introducing-vercel-for-platforms"
publishedDate: "2025-12-05"
category: "frontend"
feedName: "Vercel"
author: "Hayden Bleasel"
---

1 min read

Dec 5, 2025

You can now build platforms with the new [Vercel for Platforms](https://vercel.com/platforms) product announced today, making it easy to create and run customer projects on behalf of your users.

Two platform modes are available: [**Multi-Tenant**](https://vercel.com/platforms/docs/multi-tenant-platforms/quickstart) and [**Multi-Project**](https://vercel.com/platforms/docs/multi-project-platforms/quickstart), allowing you to deploy with a single codebase or many, across any number of domains.

### [Link to heading](#multi-tenant-platforms)Multi-Tenant Platforms

Run a single codebase that serves many customers with:

-   Wildcard domains (`*.yourapp.com`) with automatic routing and SSL.
    
-   Custom domain support via SDK, including DNS verification and certificate management.
    
-   Routing Middleware for hostname parsing and customer resolution at the edge.
    
-   Single deployment model: deploy once, changes apply to all tenants.
    

Add custom domains to your app in seconds:

```
import {  addDomain,  getDomainStatus,} from "@/components/vercel-platform/src/actions/add-custom-domain";const added = await addDomain("test.com");if (added.status === "Valid Configuration") {  // do something}const config = await getDomainStatus("test.com");config.dnsRecordsToSet; // show this in a table
```

### [Link to heading](#multi-project-platforms)Multi-Project Platforms

Create a separate Vercel project per customer with:

-   Programmatic project creation with the Vercel SDK.
    
-   Isolation of builds, functions, environment variables, and settings per customer.
    
-   Support for different frameworks per project.
    

Deploy your customer's code into isolated projects in seconds:

```
import { deployFiles } from "@/components/vercel-platform/actions/deploy-files";// automatically detects the framework & build commandsawait deployFiles([], {  // optionally assign a custom domian  domain: "site.myapp.com",});
```

Today we are also introducing [Platform Elements](https://vercel.com/changelog/introducing-platform-elements), a new library to make building on platforms easier.

Start building with our Quickstart for [Multi-Tenant](https://vercel.com/platforms/docs/multi-tenant-platforms/quickstart) or [Multi-Project](https://vercel.com/platforms/docs/multi-project-platforms/quickstart) platform.