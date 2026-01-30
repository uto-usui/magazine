---
title: "Using the latest Next.js 12.3 features on Vercel"
source: "https://vercel.com/blog/using-the-latest-next-js-12-3-features-on-vercel"
publishedDate: "2022-09-13"
category: "frontend"
feedName: "Vercel"
author: "Lee Robinson"
---

3 min read

Sep 13, 2022

When we created Next.js in [2016](https://vercel.com/blog/next), we set out to make it easier for developers to create fast and scalable web applications, and over the years, Next.js has become one of the most popular React frameworks. We’re excited to release [Next.js 12.3](https://nextjs.org/blog/next-12-3) which includes Fast Refresh for `.env` files, improvements to the Image Component, and updates to upcoming routing features.

While these Next.js features work out of the box when self-hosting, Vercel natively supports and extends them, allowing teams to improve their workflow and iterate faster while building and sharing software with the world.

Let’s take a look at how these new Next.js features are enhanced on Vercel.

## [Link to heading](#environment-variables)Environment Variables

Environment variables allow you to store and use secrets in your applications without exposing them. Next.js and Vercel have built-in support to conveniently manage environment variables across teams and the project lifecycle.

The latest release of Next.js extends [Fast Refresh](https://nextjs.org/docs/basic-features/fast-refresh) to some configuration files, including when you [make changes to environment variables inside .env files](https://twitter.com/nextjs/status/1567923180295053312?s=20&t=yIEhU3s7rjv9Hty651C7tQ).

On Vercel, you can easily enhance your workflow from local machine into the cloud without using an external tool or building custom infrastructure to manage your secrets. Environment variables can be configured in your project settings on the Vercel dashboard.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2sENO8JwNs89wvF7Ba7GCm%2F9460e88fac06c4e25412362230077944%2FScreenshot_2022-09-14_at_10.09.47_AM.png&w=1920&q=75)

These values are encrypted and [only visible to individuals with the correct privileges](https://vercel.com/docs/concepts/teams/roles-and-permissions), making it safe to add sensitive data like authentication tokens or private keys.

Finally, when developing locally, you can [pull environment variables](https://vercel.com/docs/cli#commands/env) from Vercel into your Next.js application, which will automatically create a `.env` file in your local project.

To learn more about environment variables on Vercel, read our [documentation](https://vercel.com/docs/concepts/projects/environment-variables).

## [Link to heading](#image-optimization)Image Optimization

Images are a fundamental part of the web but significantly contribute to a page’s weight and overall site speed. This makes it important to optimize images for faster site performance, better user experience, and healthier [Core Web Vitals](https://vercel.com/docs/concepts/analytics/web-vitals#core-web-vitals).

However, optimizing images is a multi-step process that can be difficult to scale manually and consistently enforce. For example, some steps may include: converting image formats, reducing file sizes, updating code to follow the latest best practices, uploading files to a Content Delivery Network, and connecting everything to a live website.

The Next.js [Image Component](https://nextjs.org/docs/basic-features/image-optimization) is an extension of the HTML `<img>` element. It includes built-in optimizations to help you achieve great performance by default. Adding a new image is as simple as [importing the image component](https://nextjs.org/docs/basic-features/image-optimization#using-the-image-component) and pointing it to the local or remote source of the file.

When using the Image Component, Next.js will automatically:

-   Generate a correctly sized image for multiple devices
    
-   Lazy load images when they enter the viewport
    
-   Prevent [Cumulative Layout Shift](https://nextjs.org/learn/seo/web-performance/cls) of the page as images load
    

When deploying, Vercel will automatically:

-   Optimize and transform source images into multiple variations
    
-   Cache images around the world on [Vercel’s Edge Network](https://vercel.com/docs/concepts/edge-network/overview)
    
-   Serve the correct format, size, and quality for each site visitor from the location closest to them
    

Furthermore, you can monitor the impact of your images with [Vercel’s Usage tab.](https://vercel.com/docs/concepts/limits/usage) This will provide you with the insight to take any actions to optimize your images or let you know if any large image files are consuming too much bandwidth.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7mKWRDRIN9zAYkHzBlzSHc%2F33a994731fd884a0febc9869cd178279%2FCleanShot_2022-09-08_at_13.38.06_2x.png&w=1920&q=75)

Overall, deploying Next.js projects on Vercel gives you improved performance and a better developer experience across your entire workflow.

To learn more about image optimization on Vercel, read our [documentation](https://vercel.com/docs/concepts/image-optimization).

## [Link to heading](#the-future-of-next.js)The future of Next.js

Earlier this year, we published our [Layouts RFC](https://nextjs.org/blog/layouts-rfc) which introduced the biggest update to Next.js since it was released. When these features are available, you can expect a full integration with Vercel’s infrastructure primitives such as [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions) and [Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions).

For more insights on the future of layouts and more in Next.js, you’re invited to the global Next.js community conference on October 25th. [Claim your free ticket](https://nextjs.org/conf) and follow [@nextjs](https://twitter.com/nextjs) for more announcements soon.

## [Link to heading](#try-next.js-12.3)Try Next.js 12.3

-   [Join us for an in-depth look at Next.js 12.3](https://vercel.com/try/wbn-live-nextjs-12-3-q-and-a) with VP of Developer Experience Lee Robinson on **Sep. 14 9am PT.**
    
-   And in the meantime, explore the power of Next.js 12.3 on Vercel, get started with our [Next.js template](https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2Fvercel%2Fvercel%2Ftree%2Fmain%2Fexamples%2Fnextjs&template=nextjs&id=67753070&b=main&from=templates).