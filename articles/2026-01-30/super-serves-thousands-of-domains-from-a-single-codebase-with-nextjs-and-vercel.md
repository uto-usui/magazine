---
title: "Super serves thousands of domains from a single codebase with Next.js and Vercel"
source: "https://vercel.com/blog/super-serves-thousands-of-domains-on-one-project-with-next-js-and-vercel"
publishedDate: "2023-02-01"
category: "frontend"
feedName: "Vercel"
author: "Peri Langlois"
---

2 min read

Feb 1, 2023

[Super](https://super.so/) is the easiest way to create a website using nothing but Notion. In less than a minute, Super allows you to build a sleek, easy-to-manage site with instant page loads, SEO optimization, and zero code. 

CEO and Founder Jason Werner switched to Next.js and Vercel from Gatsby and [Netlify](https://vercel.com/kb/guide/vercel-vs-netlify) early on, and has never looked back.  “Because Vercel is the creator and maintainer of Next.js, I know the hosting solution and features will always be perfectly integrated with the framework. It just pairs so well” says Werner.

Werner uses [Vercel’s API](https://vercel.com/docs/rest-api) to let his users [add or](https://github.com/vercel/examples/blob/main/solutions/domains-api/pages/api/add-domain.js) [remove](https://github.com/vercel/examples/blob/main/solutions/domains-api/pages/api/remove-domain.js) custom domains to their Super projects. With the API, he is also able to [detect any configuration changes in his users' domains](https://github.com/vercel/examples/blob/main/solutions/domains-api/pages/api/check-domain.js) and update it in real time.

## [Link to heading](#features-for-multiple–or-thousands–of-subdomains)Features for multiple–or thousands–of subdomains

Using Next.js and Vercel frontend allows Super to effectively serve over 15,000 custom domains. “By far my favorite Vercel feature is the ability to connect as many domains as I need to a single project,” Werner explains. 

If your domain is managed by Vercel, meaning it is using Vercel nameservers, then you can point a subdomain to an external service by adding domain name system (DNS) records with the [Vercel command-line interface (CLI)](https://vercel.com/docs/cli).

Additionally, Vercel features like GitHub integrations, Incremental Static Regeneration (ISR), Domains API, and Edge Middleware help Super give their users the best possible experience. 

### [Link to heading](#github-integrations:-deploying-every-push-by-default)GitHub integrations: deploying every push by default

“The way Vercel syncs up with GitHub is really nice–the GitHub integration is amazing,” says Werner. [Vercel for GitHub](https://vercel.com/docs/concepts/git/vercel-for-github) automatically deploys your GitHub projects with Vercel, providing [Preview Deployment](https://vercel.com/features/previews) URLs, and automatic Custom Domain updates.

### [Link to heading](#on-demand-isr-for-faster-build-times-and-better-performance)On-demand ISR for faster build times and better performance

With over 17 million page views per month, Super makes heavy use of Vercel’s On-demand [Incremental Static Regeneration](https://vercel.com/docs/concepts/incremental-static-regeneration/overview) (ISR). ISR allows Super to leverage [Vercel's global cache](https://vercel.com/docs/concepts/edge-network/caching) while maintaining full dynamism over their content – meaning users can easily create or update content without redeploying the site. Overall, ISR has three main benefits for developers: better performance, lower database load, and faster build times.

### [Link to heading](#edge-middleware-gives-users-speed-and-personalization)Edge Middleware gives users speed _and_ personalization

[Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware) allows you to deliver content to your site's visitors with speed and personalization. They are deployed globally on Vercel's [Edge Network](https://vercel.com/docs/concepts/edge-network/overview) and enable you to move server-side logic to the Edge, close to your visitor's origin. Super currently uses Middleware for custom routing on their landing page, and is actively working on moving their whole platform to the Edge.

### [Link to heading](#domains-api-for-programmatic-domain-management)Domains API for programmatic domain management

Super adds and removes custom domains programmatically on behalf of their customers, via Vercel’s [Domains API](https://vercel.com/templates/next.js/domains-api). The Domains API also auto-generates SSL certificates and re-aliases thousands of domains whenever there’s a new production deployment–in mere seconds. 

## [Link to heading](#easily-build-multi-tenant-apps-with-next.js-and-vercel)Easily build multi-tenant apps with Next.js and Vercel

By using Next.js and Vercel, Super has fast, globally distributed sites. Their customers get all the benefits of Next.js without touching any code. 

You and your business can harness this technology to build your own multi-tenant apps. Check out the below resources, and get your platform started on Vercel today. 

-   Build your own multi-tenant site with the [Platforms Starter Kit](https://demo.vercel.pub/platforms-starter-kit) 
    
-   [Check out our guide](https://vercel.com/guides/nextjs-multi-tenant-application) on building apps with custom domains 
    
-   See our [Platforms on Github](https://github.com/vercel/platforms)