---
title: "Stage and manually promote deployments to production"
source: "https://vercel.com/changelog/stage-and-manually-promote-deployments-to-production"
publishedDate: "2023-12-19"
category: "frontend"
feedName: "Vercel"
author: "Sean Massa"
---

1 min read

Dec 19, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3YuTKVU00Qu8CUhl7QQLWL%2Fdbd4ab924fa06ff3c5fda6a6f951cfa9%2FManual_Promote__2_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F22cxrRdsTCq8EEWgmdju85%2F34246773aca774ce8b354c7298eaa610%2FManual_Promote_Dark__2_.png&w=1920&q=75)

You can now control when domains are assigned to deployments, enabling the manual promotion of production deployments to serve traffic.

When a new deployment is created (with our [Git Integrations](https://vercel.com/docs/deployments/git), CLI, or [REST API](https://vercel.com/docs/rest-api)), Vercel will automatically apply any custom domains configured for the project.

You can now create staged deployments that do not assign domains, which can later be promoted to production and serve traffic. This is helpful for custom workflows and having multiple production environments for QA or testing.

**From the dashboard**

-   Disable the assignment of domains for your production branch in your Git project settings.
    
-   Find your deployment from the list of all deployments and use the right menu to select **Promote to Production**.
    

**From the CLI**

-   `vercel --prod --skip-domain`
    
-   `vercel promote [deployment-id or url]`
    

[Learn more](https://vercel.com/docs/deployments/managing-deployments#manually-promoting-to-production) in our documentation.