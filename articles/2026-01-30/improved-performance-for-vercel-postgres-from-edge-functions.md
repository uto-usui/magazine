---
title: "Improved performance for Vercel Postgres from Edge Functions"
source: "https://vercel.com/changelog/improved-performance-for-vercel-postgres-from-edge-functions"
publishedDate: "2023-07-27"
category: "frontend"
feedName: "Vercel"
author: "Vincent Voyer"
---

1 min read

Jul 27, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3RaXoHJnoitsE6iRWmPAlP%2Fca46740422cdebade9527b62cfc2ca70%2FPostgresLight.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2ODuXU8UyX22pOl7zgWHG0%2F1a2b436438e7364a62594718dd0582bb%2FPostgresDark.jpg&w=1920&q=75)

The [Vercel Postgres SDK](https://vercel.com/docs/storage/vercel-postgres/sdk) has significantly improved performance for Postgres queries from Vercel Edge Functions.

The `@vercel/postgres` package has been updated to use the latest version of Neon’s Serverless driver which adds support for SQL-over-HTTP when you use the [`sql` template literal tag](https://vercel.com/docs/storage/vercel-postgres/sdk#sql). Simple queries that do not require transactions now complete in **~10ms**—up to **a 40% speed increase**.

You do not need to make any changes to your queries to see these improvements, you only need to update to [the latest version of `@vercel/postgres`](https://www.npmjs.com/package/@vercel/postgres/v/0.4.0) to take advantage of these improvements.