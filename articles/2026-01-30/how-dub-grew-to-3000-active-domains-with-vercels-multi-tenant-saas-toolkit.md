---
title: "How Dub grew to 3,000 active domains with Vercel’s multi-tenant SaaS toolkit "
source: "https://vercel.com/blog/how-dub-grew-to-3000-active-domains-with-vercels-multi-tenant-saas-toolkit"
publishedDate: "2024-05-03"
category: "frontend"
feedName: "Vercel"
author: "Alina Weinstein"
---

2 min read

May 3, 2024

Vercel enabled Dub to build for scale, serving multiple customers across different domains within their application.

## Products Used

Next.js

Preview Deployments

Domains

Web Analytics

[Dub](https://dub.co/) is an open-source link management platform that helps marketing teams create marketing campaigns, link sharing features, and referral programs. Currently, Dub boasts over 3,000 active domains, growing at a remarkable 25% month-over-month rate.

## [Link to heading](#building-for-scale-)**Building for scale**

Since partnering with Vercel, Dub has experienced:

-   3,000 active domains, with a 25% month-over-month growth
    
-   5 million redirects per month, growing at a 40% month-over-month rate
    
-   Streamlined domain addition and management processes
    
-   Increased scalability, handling thousands of domains with ease
    

## [Link to heading](#simplifying-the-complexity-of-domain-management)**Simplifying the complexity of domain management**

Vercel’s powerful API allowed Dub to efficiently manage custom domains from the outset. Vercel simplified the otherwise complex process of setting up reverse proxies and issuing SSL certificates, which allows Dub to easily provision new custom domains on behalf of their users via a simple API call. This ease of integration has been pivotal in Dub's ability to scale quickly and focus on innovation rather than backend complexities.

> We needed a solution that was straightforward, and Vercel delivered just that with their API. An otherwise painful process, Vercel allows us to efficiently add or update domains on our platform and provides clear instructions for our users to configure the appropriate DNS records for those domains.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4QEuVLNyZUg5X6X4cW4pVH/eb7cd219e21b29ae976277871cd5ca4b/profile.jpg)
> 
> **Steven Tey,** CEO at Dub

## [Link to heading](#the-challenge-of-ssl-certificates-and-maintenance)**The challenge of SSL certificates and maintenance**

Managing SSL certificates can be expensive and challenging, especially when dealing with different providers. Dub chose Vercel from the start, leveraging the [Vercel Domains API](https://vercel.com/docs/rest-api/endpoints/domains) to provide SSL certificates cost-effectively.

This approach removed significant barriers typically associated with SSL management, allowing Dub to maintain high security without high costs. Users benefited from the simplified processes, resulting in quicker custom domain setups and more straightforward SSL management, contributing to higher user retention and satisfaction.  

[

**Use Vercel's Domain API in your project to add and remove domains.**

Learn how to programmatically add and remove domains from your platforms.

Get Started



](https://vercel.com/templates/next.js/domains-api)

## [Link to heading](#infrastructure-designed-to-scale-effortlessly)**Infrastructure designed to scale effortlessly**

The collaboration with Vercel has enabled Dub to efficiently serve and track **over 5 million link redirects per month**, with expectations to significantly increase by year-end.

This scalability is supported by Vercel’s managed infrastructure: serverless scalable compute that effortlessly handles increasing volumes of traffic and domain management tasks. Dub's continued growth underscores the transformative impact of choosing the right technology partner in Vercel.