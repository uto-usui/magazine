---
title: "Vercel Postgres is now generally available for Hobby and Pro users"
source: "https://vercel.com/changelog/vercel-postgres-is-now-available-for-pro-users"
publishedDate: "2023-10-13"
category: "frontend"
feedName: "Vercel"
author: "Edward Thomson"
---

1 min read

Oct 13, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3RaXoHJnoitsE6iRWmPAlP%2Fca46740422cdebade9527b62cfc2ca70%2FPostgresLight.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2ODuXU8UyX22pOl7zgWHG0%2F1a2b436438e7364a62594718dd0582bb%2FPostgresDark.jpg&w=1920&q=75)

The Vercel KV and Vercel Postgres products have been sunset. You can now deploy alternative storage solutions for [KV](https://vercel.com/marketplace?search=kv) and [Postgres](https://vercel.com/marketplace?search=postgres) through the [Vercel Marketplace Storage](https://vercel.com/marketplace/category/storage), with automatic account provisioning and unified billing.

[Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres/quickstart), our serverless SQL database, is now available for Hobby and Pro users.

During the beta period, we reduced cold start times to 100-200ms and fixed several bugs around handling connections. Usage prices have also been **lowered from the beta**:

-   Total storage:
    
    **reduced 60% from $0.30/GB to $0.12/GB**
    
-   Written data:
    
    **reduced 4% from $0.10/GB to $0.096/GB**
    
-   Data transfer: **reduced 55% from $0.20/GB to $0.09/GB**
    

**Billing will begin on October 19th** and Pro users have the following usage included:

-   1 database then $1.00 USD per additional database
    
-   100 hours of compute time per month then $0.10 USD per additional compute-hour
    
-   512 MB total storage then $0.12 USD per additional GB
    
-   512 MB written data per month then $0.096 USD per additional GB
    
-   512 MB data transfer per month then $0.09 USD per additional GB
    

If you were a beta participant and want to opt out of using Vercel Postgres, you can backup your database and [delete it](https://vercel.com/docs/storage/vercel-postgres/usage-and-pricing#managing-charges).

[Check out the documentation](https://vercel.com/docs/storage/vercel-postgres) to learn more.