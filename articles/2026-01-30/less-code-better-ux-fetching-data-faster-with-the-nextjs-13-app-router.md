---
title: "Less code, better UX: Fetching data faster with the Next.js 13 App Router"
source: "https://vercel.com/blog/nextjs-app-router-data-fetching"
publishedDate: "2023-02-10"
category: "frontend"
feedName: "Vercel"
author: "Alice Alexandra Moore"
---

4 min read

Feb 10, 2023

Fetch and render dynamic data directly inside React Server Components.

There's plenty to be excited about with the launch of Next.js 13, from the release of the automatically self-hosted [`@next/font`](https://nextjs.org/blog/next-13#nextfont?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_fetching_data_faster) to the highly-optimized [`next/image` component](https://nextjs.org/docs/basic-features/image-optimization?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_fetching_data_faster). Today, we'll talk about the `app` directory, and how React Server Components and nested layouts save time for developers and users alike when it comes to fetching data and serving it on Vercel.

[

**Ready to try out the App Router for yourself?**

Deploy this template in just one click to play with the Next.js 13 App Router.

Deploy now



](https://vercel.com/templates/next.js/app-directory)

With Next.js 13 App Router, we fetch data directly inside the relevant component instead of at the page level, and we're able to sharply reduce duplicate code. Additionally, thanks to [layouts](https://beta.nextjs.org/docs/routing/pages-and-layouts#layouts?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_fetching_data_faster), we can render our dynamic header just one time between all pages that share the same layout. Take a look:

Also, with Next.js 13's [Loading UI](https://www.youtube.com/watch?v=2o5m1ovfl3c?utm_source=vercel_site&utm_medium=blog&utm_campaign=yt_fetching_data_faster), even server-side fetches can now have their own custom loading skeletons. Previously, a user would need to wait on server-side data before seeing even the static UI, or Largest Contentful Paint (LCP). Not only does this reduced time to LCP and interaction have UX benefits, but also it improves your application's [Core Web Vitals](https://web.dev/vitals/#core-web-vitals) for higher rankings in Google searches.

Let's dive into the improvements in data fetching at the page level versus with the Next.js 13 `app` directory.

## [Link to heading](#data-fetching-with-pages)Data fetching with `pages`

On a page level, data fetching is done in a few different ways:

1.  **Server-side rendered (SSR) data.** For data that you want to pre-render on the server before showing it to the user, you use [`getServerSideProps()`](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_fetching_data_faster), which runs at page request. This can only be used at the `page` level in your Next.js app. You can then separately configure your [`Cache-Control` headers](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_fetching_data_faster) to cache data at a set interval and speed up UX.
    
2.  **Static-site generated (SSG) data.** If you wish to pre-render pages that use dynamic data to serve them to the user at static speed, you can use [`getStaticProps()`](https://nextjs.org/docs/basic-features/data-fetching/get-static-props?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_fetching_data_faster), which only runs on build. This is great for large amounts of non user-specific data (from a CMS, for example) that can be publicly cached.
    
3.  **Incremental statically-generated (ISR) data.** Next.js offers the option to update content incrementally without needing to redeploy, as well as deferring generating static pages to runtime instead of buildtime. To opt-in to this ISR, simply [add a revalidate prop](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_fetching_data_faster) to `getStaticProps()`.
    
4.  **Dynamic client-side data.** Data that the client needs to update can be fetched at the page level (at initial page load) or component level (at component mount). You can use the [`useEffect() hook`](https://nextjs.org/docs/basic-features/data-fetching/client-side#client-side-data-fetching-with-useeffect?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_fetching_data_faster) or the [SWR library](https://nextjs.org/docs/basic-features/data-fetching/client-side#client-side-data-fetching-with-swr?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_fetching_data_faster) (which we highly recommend).
    

While these data-fetching methods are sufficient, we felt there were ways to reduce boilerplate, improve performance, and simplify Next.js-specific APIs by aligning with React and the Web platform.

## [Link to heading](#vastly-improved-data-fetching-with-app-router)Vastly improved data fetching with App Router

With the new Next.js 13 `app` directory, all components are now Server Components by default, meaning you can fetch your data inside layouts, pages, and individual components. In addition to saving development time through reducing boilerplate and duplicate code, this also provides a more responsive user experience through smarter [caching](https://beta.nextjs.org/docs/data-fetching/fundamentals#caching-data?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_fetching_data_faster) and [deduping](https://beta.nextjs.org/docs/data-fetching/fundamentals#automatic-fetch-request-deduping?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_fetching_data_faster), as well as the new [Loading UI](https://www.youtube.com/watch?v=2o5m1ovfl3c?utm_source=vercel_site&utm_medium=blog&utm_campaign=yt_fetching_data_faster).

### [Link to heading](#server-components)Server Components

Whenever possible, we [recommend fetching data inside Server Components](https://beta.nextjs.org/docs/rendering/server-and-client-components#why-server-components?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_fetching_data_faster), which **always fetch data on the server**. Not only does this give you direct access to your backend data, but it's also secure by default, preventing sensitive environment variables from leaking to the client.

Server-side fetches mean you fetch and render in the same environment, which reduces the back-and-forth between server and client, freeing up the main client thread for other computation. It also means that you can make multiple fetches in the same roundtrip, rather than having them come one-by-one from the client. This lets the request resolve in parallel and helps prevent unwanted waterfalls, where requests stack up on top of one another. 

### [Link to heading](#static-vs.-dynamic-data)Static vs. dynamic data

![Dynamic data requires data to be fetched anew on each request. Static data allows cached data to be reused on each request.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6HZozVA475VQnGvYhFMqWb%2Fb2a86c0bab78a784c015df9a1eeabdbc%2Fdynamic-and-static-data-fetching-light.png&w=1920&q=75)![Dynamic data requires data to be fetched anew on each request. Static data allows cached data to be reused on each request.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3GrrPSEiwOPYV7lTH5U0k4%2F7796145e07fa7d93ad40df91b0b8e35e%2Fimage.png&w=1920&q=75)

Dynamic data requires data to be fetched anew on each request. Static data allows cached data to be reused on each request.

The new data fetching in Next.js 13 is built on top of the [`fetch()` Web API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and makes use of `async` / `await` in Server Components.

Now, instead of using `getServerSideProps()` and `getStaticProps()`, **all fetched data is static by default**, meaning it's rendered at build time. However, Next.js extends the `fetch` options object to allow each request to set its own [caching and revalidating rules](https://beta.nextjs.org/docs/data-fetching/caching?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_fetching_data_faster).  
  
With the [`{next: revalidate}` option](https://beta.nextjs.org/docs/data-fetching/revalidating?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_fetching_data_faster), you are able to refresh any piece of your static data, either at a set interval or when that piece changes in your backend.

For dynamic data that changes often or is specific to users, you can pass the [`{cache: no-store}` option](https://beta.nextjs.org/docs/data-fetching/fetching#dynamic-data-fetching?utm_source=vercel_site&utm_medium=blog&utm_campaign=blog_fetching_data_faster) in the `fetch` request.

## [Link to heading](#fetch-your-own-data)Fetch your own data

Ready to try out these new features? Get started with our [Next.js 13 App Playground](https://vercel.com/templates/next.js/app-directory) or [deploy your own Next.js app to Vercel](https://vercel.com/new).

To learn more about how Vercel can serve your dynamic data at the speed of static, [take a product tour](https://vercel.com/product-tour?thankyou) or [get in touch with our team](https://vercel.com/contact/sales) today.

\[[These links](https://status-code-test-server.vercel.app/discovery) are [temporarily displayed](https://status-code-test-server.vercel.app/discovery-alternative) for SEO testing purposes.\]