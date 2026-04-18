---
title: "Query and manage Marketplace databases from the dashboard"
source: "https://vercel.com/changelog/query-and-manage-marketplace-databases-from-the-dashboard"
publishedDate: "2026-04-06"
category: "frontend"
feedName: "Vercel"
author: "James Clarke"
---

1 min read

Apr 6, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4NDF11u6PaqGAGviAEyE4f%2Fe3b39e44893e89358521be8fc4640821%2Fimage__160_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4yPmRpssQEIpC2jWPCwnP2%2F9e3c0cc4ea31cba23171b18a2df9f3a9%2Fimage__159_.png&w=1920&q=75)

You can now run SQL queries, view and edit data, and inspect your database schema directly from the Vercel dashboard. This capability is available for supported marketplace database integrations, including AWS Aurora Postgres, Neon, Prisma, and Supabase, with more services coming soon.

Instead of relying on `psql` or external database UI tools, teams can manage their data directly within Vercel.

The integration resource page for supported Postgres databases now includes three new tabs:

-   **Query**: Run any SQL query, view results, and copy them as CSV, JSON, or Markdown.
    
-   **Data Editor**: View table data in a spreadsheet-like interface. You can sort, copy, edit, insert, and delete rows, then apply changes to the database atomically.
    
-   **Schema**: View tables and relations in a visual graph layout.
    

This is currently available to users with Owner permissions. Manage your [database](https://vercel.com/marketplace/category/database?search=postgres) by navigating to the Browser section of your database page in the dashboard.