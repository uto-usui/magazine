---
title: "Unlimited Vercel Blob stores on every plan"
source: "https://vercel.com/changelog/unlimited-vercel-blob-stores-on-every-plan"
publishedDate: "2026-09-23"
category: "frontend"
feedName: "Vercel"
author: "Agustin Falco"
---

You can now create as many [Vercel Blob](https://vercel.com/docs/vercel-blob) stores as you need. The previous limits of 100 stores on Hobby, 500 on Pro, and 1,000 on Enterprise no longer apply.

Blob store creation is now billed alongside other [Blob Advanced Operations](https://vercel.com/docs/vercel-blob/usage-and-pricing#pricing), including `put()`, `copy()`, and `list()` calls. On Pro that's $5.00 per million. On Hobby it counts toward the 2,000 free operations you get each month. Deleting a store is free.

Create a new store whenever you want a hard boundary instead of a pathname convention:

-   Separate production, staging, and preview data, and hand each environment its own credential.
    
-   Create a store per customer in a multi-tenant app, so you can export or delete one tenant's data in a single call.
    
-   Spin up a store for a preview branch or a migration, then delete it when you're done.
    

Storage, operations, and data transfer are still billed on what you use, so splitting the same data across more stores costs the same.

Store creation shows up under Blob Advanced Operations on your usage page and in the [Observability dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fobservability%2Fblob&title=Go+to+Blob+Observability).

Learn more in the [Vercel Blob Pricing documentation](https://vercel.com/docs/vercel-blob/usage-and-pricing).