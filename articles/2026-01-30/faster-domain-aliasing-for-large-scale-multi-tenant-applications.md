---
title: "Faster domain aliasing for large-scale multi-tenant applications"
source: "https://vercel.com/changelog/faster-domain-aliasing-for-large-scale-multi-tenant-applications"
publishedDate: "2025-03-14"
category: "frontend"
feedName: "Vercel"
author: "Mark Glagola"
---

1 min read

Mar 14, 2025

Bulk aliasing for multi-tenant applications now runs significantly faster, reducing total aliasing time by up to **95%**.

Multi-tenant applications on Vercel let a single project serve many customers behind the scenes. These applications are often fronted by hundreds or thousands of domains. Previously, aliasing—the process of pointing a domain to a different deployment—was a slow process that added significant overhead to deployments.

This optimization is now live for all customers and has led to dramatic improvements, like:

-   **App with 13,254 domains:** ~10min → 28 seconds
    
-   **App with 23,743 domains:** 8min 37secs → 26 seconds
    

Learn more about [multi-tenant applications](https://vercel.com/solutions/multi-tenant-saas) on Vercel.

[

**How to build a multi-tenant app with custom domains using Next.js**

Create a full-stack application with multi-tenancy and custom domain support using Next.js App Router, Vercel Postgres, and the Vercel Domains API.

Read the guide



](https://vercel.com/guides/nextjs-multi-tenant-application)