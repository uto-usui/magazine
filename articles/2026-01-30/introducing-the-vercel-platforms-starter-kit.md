---
title: "Introducing the Vercel Platforms Starter Kit"
source: "https://vercel.com/blog/platforms-starter-kit"
publishedDate: "2023-07-05"
category: "frontend"
feedName: "Vercel"
author: "Steven Tey"
---

2 min read

Jul 5, 2023

A fullstack template for building multi-tenant applications with custom domains using Next.js App Router, Vercel Postgres, and the Vercel Domains API.

[

**Platforms Starter Kit**

Next.js template for building multi-tenant applications with custom domains using App Router, Vercel Postgres, and the Vercel Domains API.

View Template



](https://vercel.com/templates/next.js/platforms-starter-kit)

## [Link to heading](#multi-tenant-apps-in-days,-not-months)Multi-tenant apps in days, not months

Here's an example code snippet demonstrating how to use it within Next.js:

app/api/geo/route.ts

```
import { geolocation } from '@vercel/functions';export function GET(request: Request) {  const { city } = geolocation(request);  return new Response(`<h1>Your location is ${city}</h1>`, {    headers: { 'content-type': 'text/html' },  });}
```

Reading the city from the geo IP headers in a Vercel Edge Function.

In the above example, we import the `geolocation` helper from `@vercel/edge`.

The Platforms Starter Kit comes with powerful features that lets you build multi-tenant apps in record time.

1.  **Multi-tenancy:** Programmatically assign unlimited custom domains, subdomains, and SSL certificates to your users using the [Vercel Domains API](https://vercel.com/docs/rest-api/endpoints#domains)
    
2.  **Performance**: Fast & beautiful blog posts cached via [Vercel's Edge Network](https://vercel.com/docs/concepts/edge-network/overview), with the ability to invalidate the cache on-demand (when users make changes) using [Incremental Static Regeneration](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration) + Next.js' [`revalidateTag` API](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)
    
3.  **AI Editor**: AI-powered Markdown editor for a Notion-style writing experience powered by [Novel](https://novel.sh/)
    
4.  **Image Uploads**: Drag & drop / copy & paste image uploads, backed by [Vercel Blob](https://vercel.com/storage/blob)
    
5.  **Custom styles**: Custom fonts, 404 pages, favicons, sitemaps for each site via the [Next.js file-based Metadata API](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
    
6.  **Dynamic OG Cards**: Each blog post comes with a dynamic OG image powered by [@vercel/og](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation)
    
7.  **Dark Mode**: For a better user experience at night
    

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7tiAitb8kdgUGktycr540c%2Fd33f2834f9356bce25e0721c4ebe4f9a%2FCleanShot_2023-07-05_at_08.39.10.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fk7XpXIE0rDsHCAYvkKhff%2Fff44c07588068d8fefa334cd6a318c8a%2FCleanShot_2023-07-05_at_08.39.02.png&w=1920&q=75)

[

**How to build a multi-tenant app with custom domains using Next.js**

Create a full-stack application with multi-tenancy and custom domain support using Next.js App Router, Vercel Postgres, and the Vercel Domains API.

Read the guide



](https://vercel.com/guides/nextjs-multi-tenant-application)

## [Link to heading](#what-is-a-multi-tenant-application)What is a multi-tenant application?

Multi-tenant applications serve multiple customers across different subdomains/custom domains with a single unified codebase.

Take our demo app as an example:

-   Subdomain: [demo.vercel.pub](http://demo.vercel.pub/)
    
-   Custom domain: [platformize.co](http://platformize.co/) (maps to [demo.vercel.pub](http://demo.vercel.pub/))
    
-   Editing & publishing backend: [app.vercel.pub](http://app.vercel.pub/)
    

Another example is [Hashnode](https://vercel.com/customers/hashnode), a popular blogging platform. Each writer has their own unique **`.hashnode.dev`** subdomain for their blog:

Users can also map custom domains to their **`.hashnode.dev`** subdomain:

With the Platforms Starter Kit on Vercel Pro, you can offer [unlimited custom domains at no extra cost](https://vercel.com/changelog/unlimited-custom-domains-for-all-pro-teams) to your customers as a premium feature, without having to worry about custom nameservers or configuring SSL certificates.

## [Link to heading](#build-for-scale)Build for scale

A year ago, we launched the first version of this starter kit to make it easier for makers to start their own platform on Vercel.

Since then, we've seen a variety of successful platforms grow to tens of thousands of custom domains and millions of pageviews on Vercel:

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5lqOlw4oiYDeuKG7N7JFEH/14d1e373ad84b3404d8f80741b925033/l4uu5ycbbdrqa8ikj9iy)

Hashnode, a blogging platform for the developer community built with Next.js, uses Vercel to manage over 35,000 custom domains for their customers. After evaluating alternative solutions, Hashnode ultimately chose Vercel because of the ability to manage custom domains at scale and the smooth and intuitive developer experience. [Read the full customer story](https://vercel.com/customers/hashnode).

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/IawgbMaR9MiBMxKVCEia0/997dd1d442f330632efecba705a5794c/12722727-44f6-4c9a-84ca-5a2afe35309d.png)

Super is the largest Notion-to-website builder that lets you create SEO-optimized sites using nothing but Notion. Using Next.js and Vercel allows Super to effectively serve 15,000 custom domains and 17 million monthly pageviews. “By far my favorite Vercel feature is the ability to connect as many domains as I need to a single project,” CEO & Founder Jason Werner explains in his [customer story](https://vercel.com/customers/super-serves-thousands-of-domains-on-one-project-with-next-js-and-vercel).

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/60np6JiGOmLi1jeXVnVqQk/be1bf131df10567244730424ccae49fd/icon-512x512.png)

Incident.io is a Slack-powered incident management platform, driven by automation. With the Platforms Starter Kit, they were able to ship beautiful and fast status pages (like this one for [Linear](https://linearstatus.com/)) without having to worry about SSL certificate management. [Read about their experience](https://incident.io/blog/how-we-built-status-pages).

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/1N0EMHaT8dWI9DapgsrwVc/8998badc58c998ea54146bc8aa05cfbc/unnamed.png)

Beyond Menu is a complete ordering solution for independent restaurant owners. By using the Vercel Platforms Starter Kit, they serve 6,000 custom domains for restaurant owners all over the world with a focus on speed and performance.

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/1IJLD9N9kmGYkwk6xwOPNC/ae6fcbad4df3db07457e63f1563db351/mintlify.3e5350dd.svg)

Mintlify is a platform that provides beautiful documentation sites for [hundreds of API-first SaaS companies](https://mintlify.com/showcase). "Vercel Platforms is making our product the fastest and most performant docs solution on the market", says founder Han Wang.

![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/mn0WlpMNuKvVBZCugmO4z/fec2dc4630f8e772634ae8b602e09a2b/logo.png)

Dub is an open-source link management tool for modern marketing teams to create, share, and track short links. Thanks to the Platforms Starter Kit, they were able to grow to ~900 custom domains without having to manage SSL certificates or set up NGINX proxies. [Check out their code](https://github.com/steven-tey/dub) to learn more about their implementation.

## [Link to heading](#build-the-platform-of-your-dreams)Build the platform of your dreams

It's been incredible to see the [amount](https://twitter.com/perryraskin/status/1618099492888391681) [of](https://twitter.com/flexdinesh/status/1620906810965360640) [love](https://twitter.com/SSardorf/status/1651602178715553792) the template has gotten since it's inception.

> Just stumbled upon the Vercel Platform Starter Kit. Game changer for anyone who wants to quickly create a multi-tenant app that enables user custom domains.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5FG66NOWIAeGgZK9j9W9yt/1106918ce5d29336e1572c21303fccdb/l44yJ2SR_400x400.jpg)
> 
> **Perry Raskin,** CoverDash

With the new version – now built with the App Router – we cannot wait to see what platforms you build on Vercel!

[

**How to build a multi-tenant app with custom domains using Next.js**

Create a full-stack application with multi-tenancy and custom domain support using Next.js App Router, Vercel Postgres, and the Vercel Domains API.

Read the guide



](https://vercel.com/guides/nextjs-multi-tenant-application)[

**Platforms Starter Kit**

Next.js template for building multi-tenant applications with custom domains using App Router, Vercel Postgres, and the Vercel Domains API.

View Template



](https://vercel.com/templates/next.js/platforms-starter-kit)[

**Platforms Starter Kit GitHub Repo**

A full-stack Next.js app with multi-tenancy and custom domain support. Built with Next.js App Router and the Vercel Domains API.

Star on GitHub



](https://github.com/vercel/platforms)