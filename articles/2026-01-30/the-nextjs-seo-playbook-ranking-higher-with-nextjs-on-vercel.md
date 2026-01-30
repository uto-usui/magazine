---
title: "The Next.js SEO Playbook: Ranking higher with Next.js on Vercel"
source: "https://vercel.com/blog/nextjs-seo-playbook"
publishedDate: "2023-02-23"
category: "frontend"
feedName: "Vercel"
author: "Alice Alexandra Moore"
---

9 min read

Feb 23, 2023

Your app deserves a bigger audience.

Search engine optimization (SEO) lets customers find and trust you more easily. And yet, improving your application's SEO is too often an opaque process. When SEO success feels like magic, you’re not always sure how to repeat or better it.

In this article, we'll demystify SEO, clarifying some of the most technical aspects of the process. SEO doesn't have to be a chore, and with Next.js on Vercel as your solid foundation, you're ready to build up best practices, seeing exponential gains in the process.

So, let’s start from the beginning.

[

**Want to follow along?**

Use this Next.js template to start your own SEO journey.

Deploy Now



](https://vercel.com/templates/next.js/nextjs-boilerplate)

## [Link to heading](#competing-for-better-seo-with-next.js)Competing for better SEO with Next.js

Next.js treats SEO as a critical priority, bringing together tools and recommendations for developers to most easily implement good SEO patterns. Analytics are built into the framework itself, making it easy to monitor your application's performance. When paired with [Vercel's Edge Network](https://vercel.com/docs/concepts/edge-network/overview), you get automated, per-deployment performance statistics for improved decision making.

Here's some more SEO best practices and how you can use Next.js tools to accomplish them.

![Adopting SEO is an incremental process where each step allows you to rank higher in search engines while bettering your user experience.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5yk52RKKsbSOUA8qehIuQ6%2Fa4058911b3cbc5ba151c07acd8238e61%2FInline_Graphic-Light.png&w=1920&q=75)![Adopting SEO is an incremental process where each step allows you to rank higher in search engines while bettering your user experience.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7EgL186mBywgleBnrDzDUq%2Fd1c08860e5ccad311db56d56680ba1e9%2FInline_Graphic-Dark.png&w=1920&q=75)

Adopting SEO is an incremental process where each step allows you to rank higher in search engines while bettering your user experience.

### [Link to heading](#rendering-and-why-it-matters)Rendering and why it matters

Instead of browsing websites through clicking, search engines crawl source code in the order it's written, queueing up links to index next. Client-side JavaScript, meanwhile, is sent to a render queue and takes a bit longer (and more compute power) to index.

This means that prerendering your site statically or on the server is the best practice for SEO, since it makes the crawler willing to reindex your site more frequently. Prerendering methods, however, also have their downfalls, since Static Site Generation (SSG) can often mean slow build times, and Server-side Rendering (SSR) can, without proper caching, lead to slow initial page load performance while blocking rendering for your data being retrieved.

To combine the strengths of SSR and SSG, [Next.js offers Incremental Static Regeneration (ISR)](https://vercel.com/docs/concepts/incremental-static-regeneration/overview), which pre-renders all your pages like SSG but also allows you to update specific pages as needed, without redeploying your app. You get your dynamic content at the speed—and crawler indexability—of static.

Check out [this deep dive into the Next.js 13 App Router](https://vercel.com/blog/next-js-13-data-fetching) to learn more about rendering dynamically fetched data.

### [Link to heading](#speed-across-all-platforms)Speed across all platforms

ISR with Next.js doesn’t just mean that your page can be crawled more easily. It means that your pages will load near-instantly for users. And in SEO, speed affects everything:

1.  **User experience.** Faster websites keep users engaged with content for longer, leading to higher conversion rates. Milliseconds of time shaved can, quite literally, [make millions](https://web.dev/milliseconds-make-millions/).
    
2.  **Search engine ranking.** Google considers site speed as [a strong ranking factor](https://nextjs.org/learn/seo/web-performance?utm_source=vercel_site&utm_medium=social&utm_campaign=blog_seo_playbook) in their algorithms. Given equal relevance to a topic, your faster website will always rank higher in results, driving organic traffic your way.
    
3.  **Mobile optimization.** Most users discover new websites on mobile devices, and Google crawls websites on a mobile browser by default. Your mobile speed affects your search rank on both mobile and desktop devices.
    

So, besides its rendering strategy, how can Next.js help?

1.  **Image optimization.** Next.js features a plug-and-play [`next/image` component](https://nextjs.org/docs/basic-features/image-optimization?utm_source=vercel_site&utm_medium=social&utm_campaign=blog_seo_playbook) that appropriately formats images based on the user’s device—with minimal additional JavaScript. Since serving oversized images to your user is often the largest speed throttle of an application, `next/image` enhances UX for free.
    
2.  **Code splitting with dynamic imports.** As your application grows in size, you don’t need to ask your user to load more JavaScript. With [dynamic imports](https://nextjs.org/learn/seo/improve/dynamic-imports?utm_source=vercel_site&utm_medium=social&utm_campaign=blog_seo_playbook), you can choose to defer scripts ([third-party](https://nextjs.org/learn/seo/improve/third-party-scripts?utm_source=vercel_site&utm_medium=social&utm_campaign=blog_seo_playbook) included) all the way down to the component level, only serving code that will actually be used.
    
3.  **Font optimization.** Your brand’s custom fonts are heavy, but that doesn’t mean you need to change your look. Next.js has built-in [Automatic Webfont Optimization](https://nextjs.org/docs/basic-features/font-optimization?utm_source=vercel_site&utm_medium=social&utm_campaign=blog_seo_playbook), which eliminates extraneous data fetches and ensures your font always renders on time.
    
4.  **Develop once, deploy everywhere.** Gone are the days of creating separate Accelerated Mobile Pages (AMP) for your application. Your codebase on Next.js, when following principles of responsive design, will run quickly across all desktop and mobile devices alike.
    

Each speed increase is an SEO win, and you can [track your results](https://vercel.com/analytics) in realtime.

### [Link to heading](#content-strategies)Content strategies

Headers matter. But so do subheaders, lists, tables, and any other elements that visually break up your text for the user. Search engine crawlers use the same types of information to gain context. The more you strategize content, the higher you can rank for specific topics.

Additionally, make use of structured data, which means following [Schema recommendations](http://schema.org/) for things like events, business information, places, products, and reviews. This allows your data to be [shown natively in Google](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data), differentiating you from your competition and allowing your users to navigate directly to relevant content.

While a full exploration of content architecture is beyond the scope of this Next.js-focused article, check out [Google's SEO docs](https://developers.google.com/search/docs/appearance) for the most up-to-date and comprehensive information. For structured data, you can also use [Google’s Structured Data Markup Helper](https://www.google.com/webmasters/markup-helper/u/0/), which generates usable HTML based on your content requirements.

### [Link to heading](#engineering-your-way-to-success)Engineering your way to success

Writing well-structured content goes a long way to boost your application’s SEO, but there’s even more you can do. When you have a clear vision of your application’s structure, including a knowledge of what pillar pages you want user to engage with most, you can echo that vision in Next.js in a way that doesn’t just improve SEO, but also improves user flow.

**Dynamic metadata**

In any application, the HTML `head` component offers a unique SEO opportunity: you can add a huge amount of information about your page to help search engines easily understand where to slot your content and how to display it. Titles, descriptions, meta tags, logos, open graph images, structured data markup, and more all play into the story you want Google to tell about your application.

Configuring individual head components for each of your pages can get tedious and messy, so Next.js offers a [dynamic `next/head`](https://nextjs.org/docs/api-reference/next/head?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_seo_playbook) that allows you to separate the logic of your `head` out into as many components as needed. With the built-in `key` attribute, you can make sure your application doesn’t have any duplicate properties fighting for attention.

With the recently introduced App Router, you can [take your metadata a step further](https://beta.nextjs.org/docs/api-reference/metadata?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_seo_playbook), dynamically generating it at a component level, and exporting it all together based on the structure of your application.

And the best news? We’re currently rolling out [updates to built-in support for SEO in metadata](https://www.youtube.com/watch?v=UfNMlhu3L4I?utm_source=youtube&utm_medium=blog&utm_campaign=blog_seo_playbook) that help your tags be far more legible and flexible.

**Smarter navigation**

Search engine crawlers map out your site based on which pages link to which. This map includes an overall prioritization of your content, largely through understanding what pages are most often linked.

Think about your homepage. It’s likely back-linked from every page on your application, which tells the crawler to give it a high priority. Or maybe your landing pages are back-linked from all their subpages, meaning the they can be indexed as next highest.

Keep in mind that getting linked from sites that aren’t your own also goes a long way toward building up the search engine rank of your content.

Carefully planning your site structure can feel arduous, but Next.js offers some tools to help:

1.  **App Router.** The new [Next.js 13 `app` directory](https://beta.nextjs.org/docs/routing/fundamentals?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_seo_playbook) offers the most intuitive way to structure your website, mirroring its final build right inside the directory. Directory-based routing means that you’re always thinking about page hierarchy, and your SEO will reflect those choices.
    
2.  **Layouts.** Within the App Router, you can use [layouts and nested layouts](https://beta.nextjs.org/docs/routing/pages-and-layouts?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_seo_playbook) to template pages for your site and individual sections of it. This means you can implement repeating elements, such as nav bars, footers, or backlinks, in just one central location.
    
3.  **Dynamic routing.** Sensible, indexable URLs also play into good SEO, and when you have a site with a lot of content from your CMS, you can quickly run into the chore of naming. [Next.js Dynamic Segments](https://beta.nextjs.org/docs/routing/defining-routes#dynamic-segments?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_seo_playbook) allow you to programmatically name and template all subpages of a directory, regardless of the number of items.
    
4.  **The** **`Link`** **component.** Next.js uses React’s [`Link` component](https://beta.nextjs.org/docs/routing/linking-and-navigating#link-component?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_seo_playbook) to provide prefetching (loading pages in the background to make user navigation feel faster) and the ability to link to dynamic routes from one central place in the codebase. If you require an even more advanced dynamic linking strategy, [the `useRouter()` hook](https://beta.nextjs.org/docs/routing/linking-and-navigating#userouter-hook?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_seo_playbook) allows you to programmatically change routes for your users on-demand.
    

Consistent linking goes a long way to boosting your site’s SEO, and it can also help you locate instances of near-duplicate content or places your navigation feels inconsistent. Better SEO always means a better user experience.

In case you do want to keep two versions of similar content, choose one to be the preferred version, and let Google know which version to show users through [canonical linking](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

**Fixing dead ends**

Implementing smarter navigation site-wide can also help you find those broken links and orphaned pages. Dead ends like these in your codebase deteriorate user experience and, as importantly, confuse search engine crawlers.

An organized Next.js codebase goes a long way to help you fix dead ends, but Google’s [Page Indexing report](https://support.google.com/webmasters/answer/7440203?hl=en&ref_topic=9456557) can provide you with a deeper understanding of which pages Google is struggling to find.

**Don't let errors slow down your users**

Every application needs good errors. Next.js provides [sensible defaults](https://nextjs.org/docs/advanced-features/custom-error-page?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_seo_playbook) that can be tweaked with your application’s branding to ease the user experience. Here are some other best practices:

-   If a requested page isn’t found, route users to a 404 Page, instead of looping them back to the homepage or anywhere else. This keeps users and crawlers alike from getting confused about site structure.
    
-   Your 404 Page shouldn’t beat around the bush. Let the user know they’ve encountered an error. A light touch of humor never hurts.
    
-   Link from your 404 Page to your best site content. Don’t let the user journey end with the error.
    
-   Keep the page simple and informative. Don’t let your user spend too long on this part of the journey.
    

Sometimes, you have partially-built pages that you’d like to ship for user testing, or private information you don’t want search engines to index. In both cases, you can [block search indexing](https://developers.google.com/search/docs/crawling-indexing/block-indexing) through the inclusion of a `noindex` attribute.

### [Link to heading](#ranking-regionally)Ranking regionally

Internationalization (i18n) and localization are two complementary processes that allow your site to climb the search engine rankings across the globe.

I18n is the technical side of the process, which involves prepping your codebase to accept various types of languages and serve proper versions of your pages to users and search engines alike.

You'll need to implement [modern CSS](https://css-tricks.com/control-layout-in-a-multi-directional-website/) to make sure any directionality of language is supported without breaking your UI. Then, Next.js provides an even more advanced feature set to [help optimize your site for any region](https://nextjs.org/docs/advanced-features/i18n-routing?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_seo_playbook). After opting into the `i18n` configuration, Next.js will automatically detect current locale, smartly transition between locales, and even auto-add the proper `lang` attribute to the `<html>` tag.

Next.js doesn't know about language variants of a page, so it's up to you to add the `hreflang` meta tags using [`next/head`](https://nextjs.org/docs/api-reference/next/head). You can learn more about `hreflang` in the [Google Webmasters documentation](https://developers.google.com/search/docs/specialty/international/localized-versions).

For localization, many applications opt into auto-translation by the user’s browser, which can work well once your site is properly internationalized. However, if you know you want to attract users in a specific region, it’s worth humanly adapting your content to best fit the market of that region. No machine can fully understand all the linguistic, political, cultural, and legal nuances.

## [Link to heading](#shipping-with-vercel-gives-you-a-clear-picture)Shipping with Vercel gives you a clear picture

![Vercel Analytics provides a Real Experience Score: realtime data from your actual users.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FR7RNdkL7gD9eobHU6hY4o%2Fb7e1e4b3de68129b238430b3b001578b%2Freal_experience_light.png&w=1920&q=75)![Vercel Analytics provides a Real Experience Score: realtime data from your actual users.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FEMSfSCtxKZY0et6yGIM48%2F872b5d60988cb0a6787a4378d03c4a9e%2Freal_experience_dark.png&w=1920&q=75)

Vercel Analytics provides a Real Experience Score: realtime data from your actual users.

Through this marathon of SEO for Next.js, you might be wondering: how do I track my progress?

[Next.js Analytics](https://nextjs.org/analytics?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_seo_playbook) enables you to easily analyze and measure the performance of pages using Lighthouse and Core Web Vitals. And since Vercel is the native Next.js platform, we build support for all Next.js features the day they’re released.

That means you can start collecting your [Real Experience Score](https://vercel.com/docs/concepts/analytics/web-vitals#real-experience-score-res)—a continuous measure of how your site is performing for your actual users—with zero additional configuration on Vercel deployments.

Add to that features like our [Git-centric workflow](https://vercel.com/docs/concepts/deployments/git), [live team commenting](https://vercel.com/docs/concepts/deployments/comments) on Preview Deployments, and [advanced notifications](https://vercel.com/blog/building-a-powerful-notification-system-for-vercel-with-knock-app), and you have a full-featured feedback center without changing your codebase.

[

**Have more questions about SEO?**

Our team specializes in helping large teams migrate to Vercel without losing current search engine rankings.

Talk with an Expert



](https://vercel.com/contact/sales)

## [Link to heading](#start-ranking-higher-today)Start ranking higher today

Give your website the boost it needs by [deploying to Next.js on Vercel](https://vercel.com/solutions/nextjs).

After a quick deploy, you can follow along with the [Next.js SEO course](https://nextjs.org/learn/seo/introduction-to-seo?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_seo_playbook), which takes you step-by-step to better SEO implementation.

Have more questions? Feel free to [take a product tour](https://vercel.com/product-tour?thankyou) or [chat with an SEO expert](https://vercel.com/contact/sales) today.