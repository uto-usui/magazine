---
title: "Building the most ambitious sites on the Web with Vercel and Next.js 14"
source: "https://vercel.com/blog/building-the-most-ambitious-sites-on-the-web-with-vercel-and-next-js-14"
publishedDate: "2023-11-06"
category: "frontend"
feedName: "Vercel"
author: "Guillermo Rauch"
---

5 min read

Nov 6, 2023

At this year's [Next.js Conf](https://www.youtube.com/watch?v=gfU1iZnjRZM&list=PLBnKlKpPeagl57K9bCw_IXShWQXePnXjY&index=1), thousands of community members tuned in to learn about updates to the framework thousands of developers deploy with everyday. Among the announcements were:

-   Server Actions in Next.js are now stable.
    
-   Experimental Partial Prerendering will be introduced into Next.js 14.
    
-   Next.js is **22% faster** to start up your local server and **29% faster** to see code updates after making changes.
    
-   Turbopack is **53.3% faster** to start up your local server and **94.7% faster** to see code updates with Fast Refresh.
    
-   A new course on Next.js Learn is available to teach the latest Next.js features.
    

## [Link to heading](#the-community-that-built-next.js-)The community that built Next.js

We have seen the Next.js community consistently growing over the years, and today, we're proud to say that over 850,000 developers choose to deploy with Next.js every day.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1l1z4xN1KOMPA9Ake68OMo%2Fd9ec7773acbb9b4532952aac07f9498d%2F850k-l.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2YjKkq1Sz1qL6dhzNcxTsH%2F58a7a66e8102c692eb75c5f298d1b724%2F850k-d.jpg&w=1920&q=75)

Our community continues to build some of the most ambitious sites on the web. Sites like Nike, Notion, Adobe, and even some of the most revolutionary AI projects like ChatGPT and Claude.

Thanks to the feedback and collaboration from the community as a whole, we've been able to release Next.js features incrementally like:

-   The App Router, with more **flexibility,** support for nested routes and layouts.
    
-   **Powerful** integrated system to fetch, cache, and revalidate data.
    
-   A **fast** foundation, built on streaming HTTP responses.
    

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3oVY0aWJfHSBzsYXhx020m%2F890acaffa2d1631713242ba9475e0cb7%2FApp_Router-l.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F0kJJblT43oZyizvfbT0mO%2Fa3f49f8d7b9dc40ddc2c8302a3b72435%2FApp_Router-d.jpg&w=1920&q=75)

As we’ve moved from the original [Layouts RFC](https://nextjs.org/blog/layouts-rfc), to Beta, to stabilizing the APIs, we’ve seen continued adoption of the App Router across the top one million websites on the internet.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2Yg561Kd2HRoKJkLty8vNq%2Fe318bc5744a88365bf64b573a7a408b5%2FApp_Router_Growth-l.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F51pEynLD9A4utAt9P6KM0b%2F4d92d5db5f80c5805453e7443fb2f121%2FApp_Router_Growth-d.jpg&w=1920&q=75)

We want Next.js to be easy to use and easy to adopt. To help, we’ve updated [Next.js Learn](https://nextjs.org/learn) to teach the latest Next.js features mentioned above, as well as authentication, using a database, state management, and more to build a real application. This course will help the community to be able to explore and incrementally adopt new features we announced starting with Next.js 13.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7ss3HCaLV3HtNjxjqabATd%2F246fee39943a682eaa81431c18ad0544%2FLearn.jpg&w=1920&q=75)

[

**Start learning the App Router today**

Go from beginner to expert by learning the foundations of Next.js and building a fully functional application that uses all the latest features.

Get Started



](https://nextjs.org/learn)

## [Link to heading](#introducing-next.js-14)Introducing Next.js 14

In introducing Next.js 14 to the world, we're excited to say it contains _no new APIs_.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F49veBmW4H5R8CnHGCVSZFw%2F90c39237c69f2a9eb5d1d6860c8c0510%2FNo_New_APIs-l.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FE9EbsxVDpFAREYN6ZK87Y%2F1cfe80cdd99dd5d60a3946bb66c21884%2FNo_New_APIs-d.jpg&w=1920&q=75)

We want to continue simplifying the framework and even make it possible to leave some APIs behind when you use Next.js App Router. With App Router's new fetching patterns, there is no need to learn Next.js specific functions, like `getServerSideProps`.

With Next.js 14, we also announced that **Server Actions in Next.js are now stable.** This is our recommended way of mutating data, that’s integrated into the fetching and caching layer in Next.js.

Companies like Clerk, Supabase, Shopify, Payload, Sanity, Okta, and more have embraced Server Components and soon Server Actions.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4gwmZgeTpY3iR6mDLb0NTG%2F2bb746818be981d65becbd2fd4be50d3%2FApp_Router_Companies-l.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6QxWu7sxtIOJ39j927bEVF%2Fb296297450e9c0eb17723c394b095a63%2FApp_Router_Companies-d.jpg&w=1920&q=75)

The performance improvements seen from adopting the App Router and Server Components have been promising. For example, the App Router helped luxury brand Jennifer Fisher move from a heavy ecommerce theme to a much faster headless storefront, built with Next.js.

Server Components helped them shift more work away from the device and back to the server, resulting in a faster initial paint _and_ interactivity. This means their customers can more quickly add products to their cart, helping improve conversion rates and increase sales.

[

**Data Fetching with Next.js**

Learn how React Server Components make data fetching \*even easier\* in Next.js 14

Learn More



](https://vercel.com/blog/understanding-react-server-components)

## [Link to heading](#continued-performance-improvements-)Continued performance improvements

Since Next.js Conf 2022, we have made incredible strides in improving the compiler infrastructure. At the time, we announced that we were rewriting the Next.js CLI and bundler in Rust. We shipped a 22% faster initial compile (booting up the dev server and navigating to the first page) and a 29% faster code updates (saving code changes and seeing them on the screen).

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6t1PnBioEma49VqQAxFDmx%2F78dfa4ba139369259f501b32d731790d%2F22-_and_29--l.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FJlTjIUenRIynMNdl2aOir%2F2981d6037043df443a32ad9f92ab6d68%2F22-_and_29--d.jpg&w=1920&q=75)

In order to see the Next.js Compiler succeed with this new infrastructure, there are three things we will continue to monitor:

1.  Fast dev server
    
2.  Fast code updates
    
3.  Fast builds
    

We’re running the entire test suite of Next.js that we've accumulated over seven years. We’ve seen that 90% of our 5,000 tests are passing with the Rust based Next.js Compiler. These tests allow us to continue to evolve and improve the Next.js Compiler while ensuring we’re not making regressions on expected functionality.

Let's talk about some of the performance improvements the Next.js Compiler is going to unlock. First, we're seeing 53% faster initial compile with the most recent introduction of Turbopack and up to 94% faster code updates. Again these apply to both routers (the Pages router and the App router).

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2YchoMegL0r2nFi4aO1pBJ%2F8ffe9e2cc3b683a9b40b9a22a4dc94c9%2F53-_and_94--l.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2tESnsfnPC3Pbk0JL0Fea0%2Fcd3f7f32c3afaf6d5aa02f6bc01435ae%2F53-_and_94--d.jpg&w=1920&q=75)

This is the new baseline of performance and we will keep getting faster in the future. You can track our ongoing progress at [AreWeTurboYet.com](https://areweturboyet.com/).

The goal of Next.js has always been to abstract away all of the complexity to get to a great developer experience in a way where you really didn't have to do anything else other than upgrade the framework to the latest version.

## [Link to heading](#announcing-partial-prerendering)Announcing Partial Prerendering

[Partial Prerendering](https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model) is a new rendering model that combines the benefits of fast Static Rendering and the personalization ability of Dynamic Rendering. It’s a natural progression of years of research into these previously at-odds rendering strategies—All without introducing any new APIs.

Here’s how it works:

When you build your application, Next.js will prerender a static _shell_ for each page of your application, leaving _holes_ for the dynamic content.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2H7K283rw3foKQukxeUhyX%2F94f27f673cbf5886316c6bcdb892c994%2FPPR-l.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4RqaDoPTZzkxpI1YoouC8r%2F4f92f4df7b68167db1555d1f45a6507c%2FPPR-d.jpg&w=1920&q=75)

When a user visits a page, the fast static shell is served from a [Vercel Region](https://vercel.com/products/managed-infrastructure), allowing the user to start consuming the page, and the client and server to work in parallel. The client can start parsing scripts, stylesheets, fonts, and static markup while the server renders dynamic chunks using React’s new streaming architecture.

For Next.js applications, this means:

1.  **Fast Initial Visual** - a cached static shell that loads swiftly for the user.
    
2.  **Fast Dynamic Visual** - the client and server can work in parallel due to streaming, which facilitates quick rendering of dynamic content.
    
3.  **Great DX** - It introduces no new APIs, making it easy to adopt without steep learning curves.
    

Partial Prerendering is the next step towards our ambitious goal of **dynamic at the speed of static.** Soon you’ll be able to leverage its benefits of a more personal, interactive, and dynamic web application without worrying about runtimes or regions.

## [Link to heading](#get-started-today)Get started today

Catch up on the rest of the [videos from Next.js Conf 2023](https://www.youtube.com/playlist?list=PLBnKlKpPeagl57K9bCw_IXShWQXePnXjY), browse our updated [documentation](https://nextjs.org/docs) and [courses](https://nextjs.org/learn), and most importantly—tell us what you think. This community and this framework is stronger with your feedback and your ideas. Thanks for being part of this journey.