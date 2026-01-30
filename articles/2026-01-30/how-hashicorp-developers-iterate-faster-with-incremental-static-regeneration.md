---
title: "How HashiCorp developers iterate faster with Incremental Static Regeneration"
source: "https://vercel.com/blog/how-hashicorp-developers-iterate-faster-with-isr"
publishedDate: "2022-04-26"
category: "frontend"
feedName: "Vercel"
author: "Bryce Kalow"
---

5 min read

Apr 26, 2022

Streamline development and deployment of large-scale projects with ISR.

Incremental Static Regeneration (ISR) dramatically reduces build times, allowing developers to deliver faster changes and better site performance. With Next.js 12.1, we’ve now introduced [on-demand ISR](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta), our most requested feature by developers shipping large-scale projects.

  
Bryce Kalow, a senior web engineer at HashiCorp, met with us to explain how HashiCorp's engineers use ISR and on-demand ISR to iterate quickly—while maintaining flexible sites and apps.

-   [What is ISR?](#what-is-isr)
    
-   [How HashiCorp uses ISR](#how-hashicorp-uses-isr)
    
-   [Try on-demand ISR](#try-on-demand-isr)
    

## [Link to heading](#what-is-isr-)What is ISR? 

ISR was introduced in Next.js 9.5 and is one of the [rendering strategies](https://nextjs.org/learn/seo/rendering-and-ranking/rendering-strategies) available to Next.js developers. It allows you to rerun getStaticProps after your build has completed. This offers much more flexibility than traditional static applications. Enterprises especially favor ISR for building large sites and keeping content fresh and updated.

Traditional [static site generation](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) (SSG) forces an entire site rebuild with every (even minor) change. Since build times scale linearly with the number of pages you have, you could wait for hours for your site to build—think about a site with thousands or even millions of pages.  

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F08ufxp0anPGzo8tcZqoEx%2F84a62b51c3bed49eb5828fa545fbf2a5%2FVercel-ISR-Blog_Graphic_1_Desktop-Light-V4-1440x686_1x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7aDflDTgtvD3Q1r8uZC2VV%2Fa74cc96ce493ba91f96ac055c65c634a%2FVercel-ISR-Blog_Graphic_1_Desktop-Dark-V4-1440x686_1x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1o8dzUHYjla85EqcqliHGZ%2F8f171ee993eabdeb31a946dac81cd220%2FVercel-ISR-Blog_Graphic_1_Mobile-Light-V4-375x792_1x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6yX2X66XHF7GwdS4KMJ0G0%2F51ee3b303948eb5fd6d98cd6d37eab28%2FVercel-ISR-Blog_Graphic_1_Mobile-Dark-V4-375x792_1x.png&w=1920&q=75)

**Leverage the power of server-side code**  

ISR makes this process much faster and more efficient by enabling you to use SSG on a per-page basis, without needing to rebuild the entire site. Static pages can be generated at runtime instead of at build time, saving you time on every build.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4gWbWmqzZVdLiYj03iwFil%2Ffdf5490ab2c018f892887275327b654f%2FVercel-ISR-Blog_Graphic_2_Desktop-Light-V4-1600x708_1x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5EzjlU5rg6Qwak7xLODEnZ%2F8d4252176e56bf024ef7f8b6a434b3cf%2FVercel-ISR-Blog_Graphic_2_Desktop-Dark-V4-1600x708_1x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5AGapIWPUt9Gti33UlqfOJ%2F404f7d3213dd805bc116bef1f87f77c6%2FVercel-ISR-Blog_Graphic_2_Mobile-Light-V4-375x936_1x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3MCGUTIQY8fLPX4gEz3Pkl%2F30e18d9ca40c7a94069f9e38175a2f69%2FVercel-ISR-Blog_Graphic_2_Mobile-Dark-V4-375x936_1x.png&w=1920&q=75)

Since ISR was released, we've seen companies like Tripadvisor and HashiCorp drastically improve their build times and retain incredible performance. With on-demand ISR, you can purge the Next.js cache for a specific page on demand. This makes it easier to update your site, particularly when content is created or updated from your headless CMS, or when ecommerce metadata changes (price, description, category, reviews, etc.).

## [Link to heading](#how-hashicorp-uses-isr-)How HashiCorp uses ISR 

Bryce Kalow, Senior Web Engineer at HashiCorp, showed us how their documentation team uses ISR to manage content updates and open-source contributions.

**Q: For people not as familiar with software development, build times can seem like just one step in a larger process. Why is ISR part of your team’s workflow?**

**Bryce:** You can’t understate the impact build times have on iteration. At HashiCorp, we have eight open-source products, each with a documentation site built from content in its repository.

Over the past year, my team and I have been rolling out versioned documentation for all of our products. This means we’re now rendering many past versions of our documentation, instead of just the latest version. That's a huge increase in the number of pages! To facilitate this, we have shifted to serving our documentation content from an API, instead of reading directly from the file system. With so many new pages to render, it would have significantly slowed down our process and increased our build times to statically generate these pages. 

With our new API and ISR, we’re able to statically generate only the most visited pages, which we determine from our analytics data, and defer the rest to after the initial build. ISR also allows us to propagate content changes to our sites without doing a full rebuild. We’ve currently got our revalidate timeout set to one hour.

```
// Pre-render the top pages based on traffic data// `fallback: blocking` will generate the page on-demand// it if hasn't already been generated.export async function getStaticPaths(ctx)   {  return {    paths: await getTopPathsFromAnalytics(ctx),    fallback: 'blocking'  }}// Fetch the data for this specific pageexport async function getStaticProps(ctx) {  return {    props: await getDocumentationContent(ctx),    revalidate: 360 // 1 hour  }}
```

**Q: How does on-demand ISR compliment ISR? And how does it get used?**

**Bryce:** ISR has been great for us. With it, we’ve got a reasonable baseline for time to content changes going live. We’re always looking to shorten feedback cycles, though. We'd like to be able to push changes out as they happen so our content creators aren't left wondering why their changes haven't propagated. 

With on-demand ISR, you can revalidate pages that use getStaticProps instantly. This means you can manually purge the Next.js cache for a specific page any time you want with just an API call. If your CMS exposes a webhook for when content changes are made, for example, you can have it call your revalidate endpoint. 

With this in place, you can get near-instant updates without relying on a deploy trigger to rebuild your entire site, which would re-generate unchanged pages, or a more aggressive revalidate timer, which makes your cache less effective. Instrumenting on-demand ISR in our existing Next.js sites is quick, and the programmatic interface lets us adjust the logic to suit our architecture.

pages/api/revalidate.js

```
export default async function revalidate(request, response) {  const { secret, path } = request.query  // Check for secret to confirm this is a valid request  if (secret !== process.env.REVALIDATE_SECRET) {    return response.send(401)  }  if (await isValidPage(path)) {    await response.unstable_revalidate(path)    return response.status(200).json({ revalidated: true })  }  return response.send(400)}
```

**Q:  Where does on-demand ISR fit into the rest of your workflow?** 

**Bryce:** We’re excited about the possibilities that on-demand ISR provides for us. Our documentation content lives in GitHub, we use a GitHub application to listen for push events that include documentation changes, and we use GitHub Actions to upload that content to our database. This means we have access to the files changed, and so we can use that diff to trigger on-demand ISR from our workflows for only the pages that have changed. 

We’re currently using Vercel deploy hooks to trigger a full-site deploy when large amounts of pages are updated, such as on a product release, but we would also like to explore swapping this out with targeted on-demand ISR calls to avoid unnecessary builds.

> A lot of teams struggle with trying to implement their own version of ISR at scale. In an enterprise organization, entire teams can be dedicated to making it work. But with Vercel, ISR works out of the box.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/1j1PE35gfWE7JXpwf1KGVe/0835f019a691f938107eb224409c73d7/bryce.jpeg)
> 
> **Bryce Kalow,** Senior Web Engineer at HashiCorp

**Q: Now that you’re using on-demand ISR, what will the team be working on next?**

**Bryce:** In the short term, we’re looking to expand our usage of on-demand ISR across our suite of Next.js sites. With on-demand ISR implemented, we can start to tweak some of our revalidate timers to take advantage of more aggressive caching, without worrying about serving stale content to our users. Overall, we think implementing on-demand ISR will speed up the iteration process across the board for all of our sites.

We’re also really interested in continuing to leverage [Edge compute](http://vercel.com/edge). Next.js’s [Middleware](https://nextjs.org/docs/advanced-features/middleware) functions have been a fun testbed for our team to assess what we can shift to the Edge without having a huge negative impact on our runtime performance, or losing the benefits of static generation. As you can see, this is a common theme for us and a big reason why we’re so excited for new features like on-demand ISR!

## [Link to heading](#try-on-demand-isr)Try on-demand ISR

Learn more about on-demand ISR and start using it today: