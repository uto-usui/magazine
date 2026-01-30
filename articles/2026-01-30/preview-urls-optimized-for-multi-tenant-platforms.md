---
title: "Preview URLs optimized for multi-tenant platforms"
source: "https://vercel.com/changelog/preview-urls-optimized-for-multi-tenant-platforms"
publishedDate: "2025-12-17"
category: "frontend"
feedName: "Vercel"
author: "Rhys Sullivan"
---

1 min read

Dec 17, 2025

Vercel helps you create multi-tenant platforms, where a single project can be backed by tens of thousands of domains, like [vibe coding platforms](https://vercel.com/platforms/docs/examples/oss-coding-agent), website builders, e-commerce storefronts and more. We're making it even easier to build those styles of apps today by introducing **dynamic URL prefixes.**

Dynamic URL prefixes allow you to prefix your existing deployment urls with `{data}---`, for example `tenant-123---project-name-git-branch.yourdomain.dev`

This will route the traffic to `project-name-git-branch.yourdomain.dev` while keeping `tenant-123---` in the url which your app can extract and route based on it.

Previously, preview URLs were designed to match a specific preview deployment exactly and Vercel wouldn’t have enough information to route domains to a specific preview deployment.

Now you can:

-   Create unique preview URLs for each tenant
    
-   Encode metadata, routing context, or automation signals directly in the URL
    
-   Use flexible URL structures such as: `tenant-123---project-name-git-branch.yourdomain.dev`
    

Preview URLs for multi-tenant platforms are available for Pro and Enterprise teams, and require a [Preview Deployment Suffix](https://vercel.com/docs/deployments/preview-deployment-suffix) (a Pro [add-on](https://vercel.com/docs/pricing#dx-platform-billable-resources)).

Try the [demo](https://multi-tenant-preview-urls-k6oodlv4w.vercel.rocks/all) or to get started, go to your [team's settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings&title=Set+Preview+Deployment+Suffix) to set your Preview Deployment Suffix. Then, follow [our guide](https://vercel.com/platforms/docs/multi-tenant-platforms/preview-url-prefixes) on configuring multi-tenant preview URLs.