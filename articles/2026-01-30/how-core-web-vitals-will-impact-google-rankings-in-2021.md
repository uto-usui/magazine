---
title: "How Core Web Vitals Will Impact Google Rankings in 2021"
source: "https://vercel.com/blog/core-web-vitals"
publishedDate: "2021-04-15"
category: "frontend"
feedName: "Vercel"
author: "Christina Kopecky"
---

4 min read

Apr 15, 2021

Beginning this June, Google will add [Core Web Vitals](https://web.dev/vitals/) to its [Page Experience](https://developers.google.com/search/docs/guides/page-experience) ranking signal. Google [announced](https://developers.google.com/search/blog/2020/05/evaluating-page-experience) last year that changes were coming to the way its algorithm ranks pages that went beyond how quickly pages were loaded, safe-browsing, HTTPS, and their mobile-friendliness. 

Core Web Vitals evaluate speed, responsiveness, and visual stability of pages and prioritize the site in rankings based on the outcomes of these scores. This means your site performance has a direct impact on SEO and your business.

![Search signals are the characteristics of your webpage that determine its Google ranking. Soon, the components of Core Web Vitals will be added to the list of signals to keep in mind when looking to improve SEO. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2uNNQEvf8lNK0AVEnWvICH%2F88a36bd98c48682e4846426d2afc072b%2FPage_Experience.png&w=1920&q=75)![Search signals are the characteristics of your webpage that determine its Google ranking. Soon, the components of Core Web Vitals will be added to the list of signals to keep in mind when looking to improve SEO. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3TcLPJq2ifhpDdkMChsPGZ%2F4d1ba4b8f138fdec4df68572c5291d2f%2FPage_Experience-1.png&w=1920&q=75)

Search signals are the characteristics of your webpage that determine its Google ranking. Soon, the components of Core Web Vitals will be added to the list of signals to keep in mind when looking to improve SEO.

In this post, we’ll take a look at:

-   [What are Core Web Vitals and How Do They Impact SEO?](#what-are-core-web-vitals-and-how-do-they-impact-seo)
    
-   [Improving Website Performance to Increase Google Ranking](#improving-website-performance-to-increase-google-ranking)
    
-   [How to Measure Core Web Vitals and Understand Scoring](#how-to-measure-core-web-vitals-and-understand-scoring)
    

## [Link to heading](#what-are-core-web-vitals-and-how-do-they-impact-seo)What are Core Web Vitals and How Do They Impact SEO?

Core Web Vitals help you understand the impact your application performance has on the end-user. There are three main components to Core Web Vitals that optimize for the quality of your page experience: 

### [Link to heading](#largest-contentful-paint-)Largest Contentful Paint 

[The Largest Contentful Paint (LCP)](https://web.dev/lcp/) metric looks at the _perceived_ loading speed of your page. LCP measures the time it takes to get the largest element on the page visible within the viewport. This could be a large text block, video, or image that takes up the primary real estate on the page. This is not [First Contentful Paint (FCP)](https://web.dev/fcp/), which measures the time from when the page begins to load to when the first element is rendered on screen.

![As the DOM is rendered, the largest element on the page may change. Here, the Largest Contentful Paint is counted until the image is seen on-screen. According to Google, a good LCP is below 2.5 seconds. 
](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6M1k1CSWVhW9BkFe47vz6j%2F4368532f393d9b4ca1606ea8f247d469%2FLCP-2.png&w=1920&q=75)![As the DOM is rendered, the largest element on the page may change. Here, the Largest Contentful Paint is counted until the image is seen on-screen. According to Google, a good LCP is below 2.5 seconds. 
](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1kT2FSeYpj59IJ7j3pSQJF%2F946229f6914832dca8428881ffcc0641%2FLCP-3.png&w=1920&q=75)

As the DOM is rendered, the largest element on the page may change. Here, the Largest Contentful Paint is counted until the image is seen on-screen. According to Google, a good LCP is below 2.5 seconds.

Minimizing your LCP demonstrates your page is usable and getting content on the screen quickly. Aim for an LCP below 2.5 seconds. 

![The lower your LCP metric, the better your page experience will be. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2tmbENSf50Fk8B2ceWHuOW%2Fdd92f582f4c2ffd53dab8527b8ec5880%2FLCP.png&w=1920&q=75)![The lower your LCP metric, the better your page experience will be. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F312NnzOKlK27qvAG4q1EWT%2Fab8dff409ee8f9ed9f1b8f4e23766850%2FLCP-1.png&w=1920&q=75)

The lower your LCP metric, the better your page experience will be.

### [Link to heading](#first-input-delay)First Input Delay

The [First Input Delay (FID)](https://web.dev/fid/) metric is the perception of an end user’s experience interacting with a web page. Imagine clicking inside an input box only for nothing to happen – this frustration with the interactivity and responsiveness of a site is caused by large input delays.

![First Input Delay (FID) is measured from the time a user interaction occurred to when the event handler was finally invoked. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2IMnZm3hSlF7yCX22pUWGD%2F02052073153d48639f39285024304f39%2FFID__2_.png&w=1920&q=75)![First Input Delay (FID) is measured from the time a user interaction occurred to when the event handler was finally invoked. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F78hEEQLOhiy3jPFDo4t2kk%2Fcb5b4939ae56410dbfdfa0535c65ea94%2FFID__3_.png&w=1920&q=75)

First Input Delay (FID) is measured from the time a user interaction occurred to when the event handler was finally invoked.

FID happens when the browser’s main thread is performing other tasks and is unable to respond to the user’s request. The lower your FID score, the more usable your page will be to your end-user. Aim for an FID below 100ms.

![According to Google, aim for an FID below 100ms for a better page experience. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4xbFhG4bZe1YxtxLNI6XcQ%2Fb13c0e4e07b316f6c08791ec413ffbf1%2FFID.png&w=1920&q=75)![According to Google, aim for an FID below 100ms for a better page experience. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F43feUl5NKQ9nIjGvwsTRC5%2F60952c4fe787869af8ecabf47f2e5d00%2FFID-1.png&w=1920&q=75)

According to Google, aim for an FID below 100ms for a better page experience.

### [Link to heading](#cumulative-layout-shift)Cumulative Layout Shift

The [Cumulative Layout Shift (CLS)](https://web.dev/cls/) metric is a measure of your site’s overall layout stability. A site that unexpectedly shifts layout as the page loads can lead to accidental user error and distraction.

![Cumulative Layout Shift (CLS) occurs when elements have been shifted after initially being rendered by the DOM. Here, a button was rendered to the screen after the text block, causing the block to shift downward. The combination of impact and distance is what is considered when calculating CLS. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1YKqaNEgOcRNQz3asRbaES%2Ff2e770e3c43cd19368c4fff279691104%2FCLS-2.png&w=1920&q=75)![Cumulative Layout Shift (CLS) occurs when elements have been shifted after initially being rendered by the DOM. Here, a button was rendered to the screen after the text block, causing the block to shift downward. The combination of impact and distance is what is considered when calculating CLS. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1K2oGe4fLrG9cyG5WJckhC%2F1d26b8f41d6861dc49d9f532745079c6%2FCLS-3.png&w=1920&q=75)

Cumulative Layout Shift (CLS) occurs when elements have been shifted after initially being rendered by the DOM. Here, a button was rendered to the screen after the text block, causing the block to shift downward. The combination of impact and distance is what is considered when calculating CLS.

Each element’s individual [layout shift score](https://web.dev/cls/#layout-shift-score) is only counted toward the CLS if unexpected movement occurs. If a new element is added to the DOM or an existing element changes size, it doesn’t count toward layout shift if the loaded elements maintain their position. Aim for a CLS less than 0.1.

![A good Cumulative Layout Shift (CLS) metric is one that has barely perceptible layout shift. According to Google, aim for a metric below 0.1. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6PCH1sFUkMol75tOi2gHl1%2F4fb29967a96702c3fd322b9fdf106cc3%2FCLS.png&w=1920&q=75)![A good Cumulative Layout Shift (CLS) metric is one that has barely perceptible layout shift. According to Google, aim for a metric below 0.1. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3m6d3zhI1POpzH5aq6VP3c%2F5740179a57bf47d833a6970fc4161628%2FCLS-1.png&w=1920&q=75)

A good Cumulative Layout Shift (CLS) metric is one that has barely perceptible layout shift. According to Google, aim for a metric below 0.1.

## [Link to heading](#improving-website-performance-to-increase-google-ranking)Improving Website Performance to Increase Google Ranking

Improving your vitals helps your site rank higher in comparison to your competitors. Let’s look at strategies for improving your Core Web Vitals: pre-rendering content, image optimization, and font optimization.

![The metrics that make up the Core Web Vitals:  Largest Contentful Paint, First Input Delay, and Cumulative Layout Shift. In addition to previous signals, these will now be considered in determining your overall Google Search ranking. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1L1ZUQ2EpZn3NHbDZ4Ep8C%2F0d3554d9bad29c6377cceda84c203b0e%2FVitals.png&w=1920&q=75)![The metrics that make up the Core Web Vitals:  Largest Contentful Paint, First Input Delay, and Cumulative Layout Shift. In addition to previous signals, these will now be considered in determining your overall Google Search ranking. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7vPX9zgCiZSziRyevEQnTv%2Fcbc0c750b2ac5a8ad4c9c06490269703%2FVitals-1.png&w=1920&q=75)

The metrics that make up the Core Web Vitals: Largest Contentful Paint, First Input Delay, and Cumulative Layout Shift. In addition to previous signals, these will now be considered in determining your overall Google Search ranking.

### [Link to heading](#pre-rendering-content)Pre-rendering Content

One of the first things you can do to optimize your SEO and improve Core Web Vitals is to pre-render your content. By [pre-rendering content](https://nextjs.org/docs/basic-features/pages#pre-rendering), you can generate HTML in advance on the server for each page so that the initial request contains the markup and can immediately be indexed by Google. 

Next.js pre-renders every page [by default](https://nextjs.org/docs/advanced-features/automatic-static-optimization), maximizing performance and SEO.

It’s true Google can crawl JavaScript for client-side rendered applications. However, they recommend using [server-side or pre-rendering](https://developers.google.com/web/updates/2019/02/rendering-on-the-web) to not only make your site faster for users and crawlers, but to account for those bots not using JavaScript.  
  
Services that aim to add pre-rendering on top of single-page applications will likely result in worse Core Web Vitals.

### [Link to heading](#image-optimization)Image Optimization

There are several ways to optimize your images to improve Core Web Vitals and SEO. 

1.  Use the `height` and `width` attributes on your [Image component in Next.js](https://nextjs.org/docs/basic-features/image-optimization) or `<img>` element in HTML to prevent layout shift. Adding these attributes to your markup will tell the browser how much space to allocate. 
    
2.  Lazy-load images as they enter the viewport. 
    
3.  Use modern image formats (WebP, AVIF).
    
4.  Serve correctly sized images using `srcset`.
    
5.  Provide blur-up placeholders.
    

Next.js includes almost all these optimizations out of the box. Stay tuned for blur-up placeholder support.

### [Link to heading](#font-optimization)Font Optimization

Eighty-two percent of pages on desktop use web fonts. Here are some tips to improve your Core Web Vitals when loading fonts:

1.  Use a variable font so that you will only have one file that contains every width, weight, and style of your font choice. 
    
2.  Preconnect to your font file in the head of your HTML document and define it in your CSS.
    
3.  Self-host your font instead of depending on Google fonts. 
    
4.  Use `font-display: optional` to prevent layout shift (CLS). 
    
5.  Have a fallback font in case the initial choice fails to load.
    

Next.js has [Automatic Webfont Optimization](https://nextjs.org/blog/next-10-2#automatic-webfont-optimization) which handles #2 and #3 with support for Google Fonts and Typekit. We are also working on a built-in solution for #4 and #5.

For more information, check out [Web Fonts in 2021](https://leerob.io/blog/fonts).

## [Link to heading](#how-to-measure-core-web-vitals-and-understand-scoring)How to Measure Core Web Vitals and Understand Scoring

After implementing improvements to your site, it is beneficial to measure how your site is performing. [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) is available to audit a web page in five key areas: performance, best practices, accessibility, SEO, and Progressive Web Apps (PWAs). Core Web Vitals are a main part of the performance analysis. 

[Vercel Analytics](https://vercel.com/analytics) takes Lighthouse a step further by providing real-user monitoring and assigning a [Real Experience Score (RES)](https://vercel.com/docs/analytics). This score gives you an overall health check of the Core Web Vitals your users experience. 

![The Vercel dashboard has an Analytics tab where you can go to inspect your Real Experience Score if you are a Pro or Enterprise customer. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F01Q8s53LwBVySwXR6nZRYL%2F8c23d3ae4f1c6ddbc5d158f1b051ed2e%2FBrowser__15_.png&w=1920&q=75)![The Vercel dashboard has an Analytics tab where you can go to inspect your Real Experience Score if you are a Pro or Enterprise customer. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5ZYdYBJ0udCPdX8TaUZOGu%2F9a573a4caa715c6dddc00e747ac5c0e1%2Fbrowser-dark.png&w=1920&q=75)

The Vercel dashboard has an Analytics tab where you can go to inspect your Real Experience Score if you are a Pro or Enterprise customer.

Based on these metrics, you can see whether a performance regression was introduced at any given time and immediately revert back to the previous commit. 

Additionally, you can see a breakdown of each vital and the various routes inside your application. This enables you to analyze and improve the SEO and performance of your site. 

For more information, check out [this guide on Core Web Vitals](https://web.dev/vitals/) from Google. To start measuring your site’s performance today, [enable Vercel Analytics](https://vercel.com/analytics) for any Next.js, Nuxt, or Gatsby application. You can also watch the [video](https://www.youtube.com/watch?v=9SVe7TigqVg) that inspired this blog.

_Thanks to_ [_Shubhie Panicker_](https://twitter.com/shubhie) _for reviewing this post._