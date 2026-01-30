---
title: "Vercel Secure Compute now supports multiple environments"
source: "https://vercel.com/changelog/vercel-secure-compute-now-supports-multiple-environments"
publishedDate: "2025-04-03"
category: "frontend"
feedName: "Vercel"
author: "Miroslav Simulcik"
---

1 min read

Apr 3, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F49jJUIECvS4wVjt9VsLNxK%2F64b01b46b4987a6f2e2bedc96cf8290c%2FCleanShot_2025-04-02_at_21.58.32_2x__2_fixed.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4rI2iVkWMIc2DtoBKGCDkb%2Fb4efcd736097d1a34fae4833f0a18f40%2FCleanShot_2025-04-02_at_21.58.40_2x.png&w=1920&q=75)

Teams using [Vercel Secure Compute](https://vercel.com/docs/secure-compute) can now associate each [project environment](https://vercel.com/docs/deployments/environments)—Production, Preview, and custom—with a distinct Secure Compute network, directly from the project settings. This simplifies environment-specific network isolation within a single project.

To connect your project's environments to Secure Compute:

1.  Navigate to [your project's **Secure Compute** settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fsecure-compute&title=Open+Secure+Compute+settings)
    
2.  For every environment you want to connect to Secure Compute:
    
    -   Select an **active** network
        
    -   Optionally, select a **passive** network to enable failover
        
    -   Optionally, enable **builds** to include the project's build container in the network
        
3.  Click **Save** to persist your changes
    

Learn more about [Secure Compute](https://vercel.com/docs/secure-compute).