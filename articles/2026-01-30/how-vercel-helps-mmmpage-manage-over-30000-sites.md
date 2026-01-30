---
title: "How Vercel helps mmm.page manage over 30,000 sites"
source: "https://vercel.com/blog/how-vercel-helps-mmm-page-manage-over-30-000-custom-domains"
publishedDate: "2023-04-07"
category: "frontend"
feedName: "Vercel"
author: "Peri Langlois"
---

2 min read

Apr 7, 2023

[mmm.page](https://mmm.page/) was founded to provide anyone with the tools to create their own website, regardless of their technical know-how. With fast and early success, having the whole platform as a single page application on Amazon Simple Storage Service (Amazon **S3**) became untenable as the user base grew into the tens of thousands. That’s why they turned to Vercel. Thanks to [Server-Side Rendering](https://vercel.com/docs/concepts/next.js/overview#server-side-rendering-ssr) (SSR), ease of deployment, and support for custom domains, Vercel makes it simple to manage mmm.page’s scale, monetize their offerings, and continue to innovate.

> Vercel removes a lot of the tiny frictions so we can move faster.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4DljOjLKpoVR5OItTM34RE/2f2545cfd4547a6b450f3389cd7328d4/image.png)
> 
> **XH Founder**

At its core, mmm.page’s goal is to make the internet less homogenous by empowering people who have never conceived themselves as website builders to build their own websites quickly and easily. Today, over 30,000 users have created sites on the mmm.page’s platform—and those numbers only continue to grow. 

mmm.page started with a single page application (SPA) on Amazon S3 for the initial launch. They quickly realized that Amazon S3 was not the best suited for SEO and the platform would not easily scale. What’s more, it was difficult to set up custom domains, and getting [Preview URLs](https://vercel.com/docs/concepts/deployments/generated-urls) on Amazon S3 was time-consuming and cumbersome. They decided ultimately to fork the viewer experience as a server-side Next.js bundle on Vercel, while the editor experience is still on Amazon S3 (though they're considering migrating that to Vercel, too). 

"The Vercel [custom domain](https://vercel.com/docs/concepts/get-started/assign-domain) support has been a godsend," says XH, noting how they are otherwise notoriously difficult to set up. "**Vercel allows me to quickly set up custom domains. This allowed me to quickly monetize my user base faster, whereas it would have taken me months just to set up** [**SSL certificate generation**](https://vercel.com/docs/concepts/projects/domains/custom-SSL-certificate)**.**"

The site’s [Core Web Vitals](https://vercel.com/docs/concepts/analytics/web-vitals#core-web-vitals) are also always top of mind for mmm.page. The users are used to highly performant sites and are sensitive to any kind of latency. If their own sites are laggy or have a bug, they might leave to another platform. SSR ensures that if changes need to be made to user sites, there won’t be any extra lag time.

As mmm.page continues to grow, they appreciate that with Vercel, you can cache results, with 2-3x fewer calls to the database. This ensures they won’t have a database overload. "Now that we have a hybrid SSR and live dynamic data, once I push that new viewer or update the schema, I can mass update the cache." XH explains.

With Vercel, mmm.page is able to quickly spin up new features, meet the needs of their users, and scale along with them. Would your team's platform benefit from faster iterations and seamless scaling? [Get in touch](https://vercel.com/contact/sales).