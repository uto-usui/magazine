---
title: "Edge Functions enable Read.cv to deliver profiles globally, with near-zero latency"
source: "https://vercel.com/blog/edge-functions-enable-read-cv-to-deliver-profiles-globally-with-near-zero"
publishedDate: "2023-01-13"
category: "frontend"
feedName: "Vercel"
author: "Greta Workman"
---

2 min read

Jan 13, 2023

Enhance user experience through application performance.

For Read.cv, showing is better than telling. The professional networking platform helps users add a more personal touch to the typical work profile—all made possible with Vercel and [Edge Functions](https://vercel.com/docs/functions).

An important component to the Read.cv app is allowing users to bring custom domains to the service, but to do so, the Read.cv team was considering making different deploys for each domain—an unsustainable practice. Engineers regularly made tweaks to the site’s core infrastructure while balancing high-priority work like building new features and improving user experience.

Moving to Vercel allowed them to incrementally adopt Next.js (moving from Create React App) for better performance and increased flexibility:

-   **Better performance:** Edge Functions allow Read.cv to deliver personalized content from a location close to their users, decreasing latency.
    
-   **Increased flexibility:** Read.cv was able to use the right tool for each job, with some pages served directly from the edge and others pre-generated as static assets ahead of time—all within the same toolkit of Next.js and Vercel.
    

Plus, Vercel’s support for wildcard domains, automatic SSL cert generation, and management of DNS gave them the ability to create a multi-tenant platform. This meant users can bring their own personal domains to Read.cv and display their CV profile on their domain, with no custom infrastructure required. 

Not only is Read.cv benefitting from personalization at the Edge and [easy-to-manage multitenancy](https://github.com/vercel/platforms), but Vercel has also improved their site performance and Time to First Byte or TTFB.

**“We have a global customer base and it’s important to us that our speed is unbiased regardless of location. When we deploy with Vercel, users around the world are instantly served our latest site at an edge near them. With our previous provider, visitors were often being served from an edge in the U.S. even if they were in Asia or Europe.” — Mehdi Mulani, Software Engineer, Read.cv**

If customization is critical to your site or application, let’s talk about how Edge Functions can give you the power of dynamic at the speed of static. [Reach out for more information here.](https://vercel.com/contact)