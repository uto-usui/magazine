---
title: "Navigating tradeoffs in large-scale website migrations"
source: "https://vercel.com/blog/navigating-tradeoffs-in-large-scale-website-migrations"
publishedDate: "2023-02-09"
category: "frontend"
feedName: "Vercel"
author: "Julian Benegas"
---

7 min read

Feb 9, 2023

Fullstack agency, basement.studio, explains their observations migrating a large scale React-based website from Gatsby to Next.js.

“Why migrate a perfectly functioning website to a new framework? Will the end user benefit from all this, or is it just to satisfy the development team?”

We recently helped a client work through this decision process during a redesign of their entire web experience.

With more than 30 static pages, around 600 dynamic pages, and 15 language translations for all of those, our client's codebase at the time was filled with plugins, escape hatches, and unbearable build times. The more we talked with the development team, the more we agreed that as part of the redesign, a better developer experience (DX), faster build times, and versatile APIs would put developers in a “pit of success” that would lead to faster iteration cycles and therefore to a better website for end users.

## [Link to heading](#made-easier-on-vercel)Made easier on Vercel

This client was already leveraging Vercel for their site, which made this migration much easier for us, and much safer for the client. Going in, we knew we only had to worry about the code migration and didn't need to factor in infrastructure changes or configuration. We were confident that we could instantly roll back to the last version, should anything go wrong. Beyond the safety net that Vercel provided, three key things helped to speed up the migration, and ensure a zero downtime rollout for both their end-users and internal stakeholders:

-   **Easy testing and QA**: Vercel [Preview Deployments](https://vercel.com/docs/concepts/deployments/preview-deployments) were instrumental, as we needed to test each page we migrated to make sure we didn’t break anything. Those five-minute build times Vercel was giving us made us really happy.
    
-   **Incrementally adoptable**: Once we proved the idea of migrating to Next.js, the rest of the project went pretty quickly. But since we were keeping the site on Vercel, it was easy to chip away at the site without needing to tackle everything all at once and worry about infrastructure migration.
    
-   **Headless hosting:** Our client was already leveraging a headless CMS, Ghost, so they were able to take advantage of one of the best benefits of using headless tooling—infrastructure flexibility. We only had to factor in their APIs, and Vercel would continue to handle the rest of their infrastructure and data fetching.
    
-   **Performance tracking**: By keeping the site on Vercel, we were able to leverage Vercel [Analytics](https://vercel.com/docs/concepts/analytics) and [Checks](https://vercel.com/docs/integrations/checks-overview) to make sure we were only ever _improving_ site performance. Over the course of our project, the **Real Experience Score improved from 79 to 90 points**. This gave us the confidence to know that the project was a success, and helped our clients prove the concrete impact of the migration.
    

## [Link to heading](#thinking-in-next.js)Thinking in Next.js

So how did our client decide to make the switch from Gatsby to Next.js? Since Vercel took away most of the external considerations, we were able to weigh the ergonomics of both frameworks. We began by looking at the codebase through the lens of both models to start “thinking in Next.js” (ode to the famous [Thinking in React](https://reactjs.org/docs/thinking-in-react.html#gatsby-focus-wrapper)).

Here's the key difference: **Next.js is a fullstack framework.**

On the surface, it provides developers with APIs that unlock several rendering strategies—[Static Generation](https://vercel.com/docs/concepts/get-started/compute#static-site-generation---ssg), [Server-side](https://vercel.com/docs/concepts/next.js/overview#server-side-rendering-\(ssr\)), and [Incremental Static Regeneration (ISR)](https://vercel.com/docs/concepts/next.js/overview#incremental-static-regeneration). Next.js also wraps basic web primitives like images, links, scripts, and fonts with well-thought-out abstractions. Working with React and _every_ styling solution is much simpler.

At a deeper level, Next.js seamlessly provides ways of handling different edge cases that may arise. And that leads us to one of the critical differences between Next.js and Gatsby, the client's original framework: **how they approach extensibility.**

## [Link to heading](#extensibility)Extensibility

Next.js provides developers with primitives that can be adapted to any use case, whereas Gatsby—while it still offers many built-in primitives—tends to suggest a plugin for almost everything.

This means that if you want to add a new feature to a Gatsby site, you’ll likely need to find and install a plugin that provides that feature. This can make it easier to start, but it can also make it harder to customize your site to meet specific needs. Let's explore an example.

### [Link to heading](#image-optimization)Image optimization

Optimizing images is a critical step to take to build a lean and efficient website.

-   How does Gatsby solve image optimization? You will need the `gatsby-plugin-image`
    
    plugin. To make that work, you will also need `gatsby-plugin-sharp`. Additionally, install `gatsby-source-filesystem` if you are using static images and `gatsby-transformer-sharp` in case you use dynamic ones.
    
-   How does Next.js solve image
    
    optimization? Just `import Image from 'next/image'.`
    

This is how you’d do image optimization for each framework:

That’s a big difference. **Thirty-one lines of code, plus three npm packages to accomplish what Next.js can do with just seven lines of code.**

Additionally, Next.js’ Image component allows the developer to tweak how the image will load and look by just passing props into it. This declarative approach scales really well and makes the codebase super easy to understand. It'll also be beneficial when they're upgrading to future versions, as they won't need to worry about the compatibility of those upgrades.

When migrating, images were not as much work as you’d think. It was mainly deleting code and ensuring that styles didn’t break.

### [Link to heading](#fetching-remote-data)Fetching remote data

Every big website, at some point, needs to get remote data from somewhere. This was certainly the case for this project, which read data from:

-   Ghost to get blog posts
    
-   YouTube to get the latest videos
    
-   GitHub to get information about their repo
    

In Gatsby, for each data source, we’d use a different plugin. For Ghost, we’d use `gatsby-source-ghost` and `gatsby-plugin-ghost-images`. For YouTube, we’d use `gatsby-source-youtube-v3`. For GitHub, we’d use `gatsby-source-custom-api`. These were four different dependencies, which needed to be understood by the developer, and consumed in different ways across the application.

In Next.js, we simply `fetch`ed data from its source and passed the data down via `getStaticProps`. Developers now don’t need to go through different plugin documentation, explore various files, and do lots of `cmd + shift + F` (global searches), just to understand how the data gets to the UI: now they just see the data being fetched on the spot and then passed down via props (a common pattern for React developers).

Again, let’s look at a practical code example:

This is a real example, taken from our client's previous codebase (left), and Next.js (right). Again, more than the difference in terms of the number of lines of code, the most important change here is that in Gatsby, there are several layers you need to understand just to know how that `stargazers_count` reaches the UI (an npm package, `gatsby-config.js` → `gatsby-node.js` → render function). In the Next.js example, it’s all condensed into one file and two functions. Colocation is important for us, and the team's developers really enjoyed not having to deal with `gatsby-config` and `gatsby-node`.

Additionally, Gatsby forces all the data to pass through GraphQL, which gets difficult when dealing with remote APIs that do not expose a GraphQL endpoint. In Next.js, you can use GraphQL, `fetch`, or node’s `fs`—whatever you want.

## [Link to heading](#improving-build-times)Improving build times

One of the biggest issues our client had when running Gatsby was the long build times. **We were circling 35-minute build times.** That means, on _every_ push, the developer would need to wait half an hour (sometimes even more) just to share progress with coworkers. This made iteration cycles really slow, and therefore shipping new features was a drag.

Let’s be fair: the site is big. At each build, we were creating close to **10k static pages** (`(static + dynamic pages) * locales`). How could we go faster than this if we were not server rendering?

Luckily, Next.js is very flexible. By taking a hybrid approach, generating the most important pages at build time, while not generating less frequently visited pages and localized ones, we could make builds much leaner. But how would we ensure that every page of the site remains fast? We’d use [Incremental Static Regeneration (ISR)](https://vercel.com/docs/concepts/incremental-static-regeneration/overview): the first time a user requests a page that’s not cached, the Vercel server would:

1.  Generate the page and return the HTML + CSS + JS
    
2.  Push the newly generated page to its content delivery network (CDN)
    

This means, yes, the very first user would take a loading time hit by needing to go to the origin server, but subsequent users would get a fast response from the CDN. That was a tradeoff we were willing to make.

Let’s look at how generating static pages works for both of these frameworks.

With this strategy, our build times **went down from 35 minutes to just five minutes**. Learn more about ISR [in the Next.js docs](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration).

## [Link to heading](#faster-ux,-better-dx,-zero-downtime)Faster UX, better DX, zero downtime

Overall, migrating from Gatsby to Next.js was a great decision for this client. The migration of their large, dynamic website took a small team of developers just **three weeks**, and because of the flexibility and safety provided by Vercel, the site saw zero downtime and internal users were able to continue using the headless tools they were used to with no disruption.

Overall the client was happy to see an 85% reduction in build times, a 14% increase in their Real Experience Score, and a steep reduction in lines of code.