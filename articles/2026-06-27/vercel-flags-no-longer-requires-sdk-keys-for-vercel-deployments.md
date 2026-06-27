---
title: "Vercel Flags no longer requires SDK Keys for Vercel deployments"
source: "https://vercel.com/changelog/authenticate-vercel-flags-with-openid-connect-by-default"
publishedDate: "2026-06-24"
category: "frontend"
feedName: "Vercel"
author: "Luis Meyer"
---

New projects using Vercel Flags no longer need to configure SDK Keys or the `FLAGS` environment variable when evaluating flags inside a Vercel deployment. At runtime, the Vercel adapter automatically receives a short-lived OIDC token, so authentication is handled for you with zero configuration.

For local development, link your project with `vercel link` and pull credentials with `vercel env pull`. That's it.

Existing projects and all SDK Keys are unaffected. This change only applies to new projects, and SDK Keys remain fully supported and are still required for:

-   Cross-project flag access
    
-   Non-Vercel runtimes
    
-   Custom authentication setups
    

Read the [Vercel Flags documentation](https://vercel.com/docs/flags) to get started.