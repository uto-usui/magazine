---
title: "Bulk redirects are now generally available"
source: "https://vercel.com/changelog/bulk-redirects-are-now-generally-available"
publishedDate: "2025-11-13"
category: "frontend"
feedName: "Vercel"
author: "Ben Roberts"
---

1 min read

Nov 13, 2025

Vercel now supports [bulk redirects](https://vercel.com/docs/redirects/bulk-redirects), allowing up to one million static URL redirects per project.

This feature adds import options for formats like CSV and JSON, so teams can more easily manage large-scale migrations, fix broken links, handle expired pages, and more.

To use bulk redirects, set the `bulkRedirectsPath` field in your `vercel.json` to a file or folder containing your redirects. These will be automatically imported at build time.

redirects.csv

```
source,destination,statusCode/product/old,/product/new,308
```

vercel.json

```
"bulkRedirectsPath": "redirects.csv"
```

This feature is available for Pro and Enterprise customers, and includes rates for additional capacity:

-   **Pro:** 1,000 bulk redirects included per project
    
-   **Enterprise:** 10,000 bulk redirects included per project
    
-   **Additional capacity:** starts at $50/month per 25,000 redirects
    

[Get started](https://vercel.com/docs/redirects/bulk-redirects/getting-started) with bulk redirects.