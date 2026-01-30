---
title: "Migrating a large, open-source React application to Next.js and Vercel"
source: "https://vercel.com/blog/migrating-a-large-open-source-react-application-to-next-js-and-vercel"
publishedDate: "2022-12-08"
category: "frontend"
feedName: "Vercel"
author: "Michael Novotny"
---

10 min read

Dec 8, 2022

If your company started building with React over 5 years ago, chances are you implemented your own custom solution or internal framework. Many engineers and teams want to explore technologies like Next.js and Vercel. However, some don't know where to get started because it's so far from their current reality or they don't see how supporting a custom framework is holding them back.

As a coding exercise, we wanted to show what this could look like by migrating a large, open-source React application to use Next.js.

We managed to **remove 20,000+ lines of code and 30+ dependencies**, all while improving the local iteration speed of making changes from **1.3s to 131ms**. This post will share exactly how we incrementally adopted Next.js and Vercel to rebuild the BBC website.

## [Link to heading](#the-bbc-react-application)The BBC React Application

The BBC [website](https://www.bbc.com/thai) is a large, production-grade, [open-source](https://github.com/bbc/simorgh) React application. It is a completely custom React SPA (single-page application). Very few projects of this size and scope are developed in the open. We admire and applaud the work the BBC has done. This isn't about pointing fingers or calling anyone out. You'll see they have done a good job of configuring their application.

This project is a perfect example of many large-scale React applications. You or your company could have a similar set up. For example, this application contains:

-   React
    
-   TypeScript
    
-   CSS-in-JS (Emotion)
    
-   Babel
    
-   Webpack
    
-   ESLint
    
-   Stylelint
    
-   Prettier
    
-   Cypress
    
-   Jest
    
-   Lighthouse checks
    
-   Web vitals monitoring
    
-   Optimizely (client-side experimentation)
    
-   Storybook
    
-   React Router
    
-   React Helmet
    
-   React Lazyload
    
-   And more...
    

This architecture is very common for companies and developers building React applications in the past 5 years. However, many of these integrations and features are included in Next.js with little to no configuration. Our goal is to show switching to Next.js and Vercel can provide a demonstrative impact to your site performance and developer experience.

## [Link to heading](#goals)Goals

Let’s use the BBC website as an example of such an application and see how we can approach incrementally moving to Next.js and Vercel.

The primary goals should be:

-   **Reuse as much as possible.** At first glance, there is a decent amount of code that can be reused. Emotion is a good styling library, so there's no need to remove or change that right now. The React components and the [built-in component library](https://github.com/vercel-labs/simorgh/tree/9fe338c4505146ff31e17e57344263cf1bb42557/src/app/legacy/psammead) are well done and seem completely reusable. These should be leveraged and not discarded.
    
-   **Delete as much as possible.** This seems contradictory to the previous statement, but it has a different purpose. We want to remove anything from the project that is no longer necessary due to Next.js's capabilities. Let's see how much we can get rid of to reduce the overall code that needs to be maintained so developers can focus on features and delivery.
    
-   **Improve developer experience and performance.** Custom solutions require creating and maintaining documentation or the passing of tribal knowledge to understand the codebase and become a contributor. Projects that leverage well-known and well-documented frameworks such as Next.js allow for quicker onboarding, easier contributions, quicker adoption of new standards (like React Suspense) without having to learn them and implement them into a custom solution, and more.
    

As a proof of concept, let's see if we can take two primary routes of the BBC website, convert them to use Next.js, and deploy them to Vercel.

-   `/news`
    
-   `/news/articles/[slug]`
    

Let’s walk through how we can approach tackling an update like this.

## [Link to heading](#getting-started)Getting Started

We can start by reading through the [documentation](https://github.com/vercel-labs/simorgh/blob/9fe338c4505146ff31e17e57344263cf1bb42557/README.md) and walking the codebase, making mental notes of things that may be useful to us later.

Then, let's fork the [repository](https://github.com/bbc/simorgh) and make two clones:

-   One running the application in its current, untouched state for reference and debugging.
    
-   One to run our Next.js changes.
    

This will also give us the ability to compare before and after metrics when complete. The best first step to make is to start with the smallest, simplest change, to prove a working concept and get it all the way out to production.

We can take this small change from running locally and deploy it all the way out to Vercel. I’ve found establishing this pipeline up front in a project is easier than battling deployment issues later when you think your work is done. This will also give us [Preview Deployments](https://vercel.com/docs/concepts/deployments/preview-deployments) along the way, so we can see and share our progress with others.

For our first step, based on what we learned from the documentation and code, we decide to get Next.js running with [Emotion](https://emotion.sh/docs/introduction) by:

-   Installing Next.js.
    
-   Removing the existing Babel config to let Next.js control as much of the configuration as possible, adding configurations later if needed.
    
-   Adding a `next.config.js` and `_app.js` to [enable Emotion](https://nextjs.org/docs/advanced-features/compiler#emotion).
    
-   Adding a simplistic `/news` page with minimal styles to prove the configuration works.
    
-   Adding the [Vercel for GitHub integration](https://vercel.com/docs/concepts/git/vercel-for-github) to the forked repository.
    

This resulted in our [first commit](https://github.com/vercel-labs/simorgh/pull/1/commits/8917b5dd431089a5360fedf9842be7ebaa0a5106). There were some verification issues when building on Vercel, so we can [disable ESLint verification during builds](https://nextjs.org/docs/api-reference/next.config.js/ignoring-eslint), at least for now.

This gives us our [first preview](https://simorgh-preview-1.vercel.app/news) with some simple hover styles to prove Emotion is working as expected.

![Our first commit of incrementally adopting Next.js to rebuild the BBC website.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3qelLMKuf3mthG0sdCDNjs%2Fdab6541318e3501c008469b0e8a04f14%2FCleanShot_2022-12-23_at_14.13.16.gif&w=1920&q=75)

Our first commit of incrementally adopting Next.js to rebuild the BBC website.

With a basic foundation in place, let's see if we can try and get the front page `/news` to render.

## [Link to heading](#migrating-the-front-page)Migrating the Front Page

The documentation pointed out some key pieces of information for getting started here.

-   There are [routes and corresponding entry components](https://github.com/vercel-labs/simorgh/blob/9fe338c4505146ff31e17e57344263cf1bb42557/src/app/routes/README.md) for each part of the app.
    
-   Access to [a real API is only available to internal BBC team members](https://github.com/vercel-labs/simorgh/blob/9fe338c4505146ff31e17e57344263cf1bb42557/README.md#topic-pages). Otherwise, local development is done using [captured data responses saved as JSON files](https://github.com/vercel-labs/simorgh/tree/9fe338c4505146ff31e17e57344263cf1bb42557/data), which are included in the repository.
    
-   Lastly, a slight adjustment to our original goals... The `/news` route is actually dynamic! This didn’t become clear until reviewing the saved data responses. It's a base route that serves localized translations and content based on the "service" specified at this route (i.e. `/news`, `/arabic`, `/japanese`, etc.).
    

Let’s start by changing the `/news` route we added in Next.js to use the [FrontPage component](https://github.com/vercel-labs/simorgh/blob/9fe338c4505146ff31e17e57344263cf1bb42557/src/app/pages/FrontPage/FrontPage.jsx) and pass it the [corresponding data](https://github.com/vercel-labs/simorgh/blob/9fe338c4505146ff31e17e57344263cf1bb42557/data/news/frontpage/index.json). This seems logical as it has a `pageData` prop. We pass the data, but we’re getting errors.

The first set of errors is due to the app using import aliases to avoid using relative imports (ie. `../..`), so we need to [let Webpack know how to reconcile them via next.config.js](https://github.com/vercel-labs/simorgh/pull/1/commits/877528583347231b35f90a74d623f2c8e22e1d77#diff-882b2c04b01b2e8b2cdcf1817c30ea503a8005f1c0d54cfff37053b6801fea85R12-R15).

The next set of errors is due to an uninitialized state. The website also makes extensive use of [React hooks](https://reactjs.org/docs/hooks-intro.html) for state management. The documentation has a [section on page render lifecycles](https://github.com/vercel-labs/simorgh/tree/9fe338c4505146ff31e17e57344263cf1bb42557#a-page-render-lifecycle) that highlights why we’re getting errors. We need to add the [`PageWrapper component`](https://github.com/vercel-labs/simorgh/blob/9fe338c4505146ff31e17e57344263cf1bb42557/src/app/Layouts/defaultPageWrapper.jsx) and [a handful of context providers](https://github.com/vercel-labs/simorgh/blob/9fe338c4505146ff31e17e57344263cf1bb42557/src/app/legacy/containers/PageHandlers/withContexts.jsx#L33-L59) to `_app.js` . Doing so allows the page to render for the first time!

_**This is an important lesson to remember when transitioning apps…**_ Passing data to components and wiring up state will cause your application to “light up like a Christmas tree”. You should focus on that very early on in the conversion.

However, the Next.js site was showing slightly different data than the unmodified clone we made earlier. The documentation [explains how routes process data before passing it to page-level components](https://github.com/vercel-labs/simorgh/tree/9fe338c4505146ff31e17e57344263cf1bb42557#a-high-level-user-journey). There is a `route` and `getInitialData` for each page. We locate the `getInitialData` for the `/news` page and [apply the appropriate filter functions](https://github.com/vercel-labs/simorgh/blob/9fe338c4505146ff31e17e57344263cf1bb42557/src/app/routes/home/getInitialData/index.js) to the fetched data in Next.js and rendered data matches.

When Vercel tried to deploy these changes, it hit a new build error with timezone data from Moment that wasn’t reproducible during local development. To simulate a production deployment, we can run `npm run build` locally. This led to the discovery that our unmodified clone’s Webpack config is configured to create a `tz` folder with a smaller subset of timezone data to save on bundle size at build/run time. Once we [add the same custom Webpack plugin to our next.config.js](https://github.com/vercel-labs/simorgh/pull/1/commits/d903cb0cf0992ccf01f85d888c200847b4b381d1), Vercel builds and deploys without issue.

To complete this route, we can change the hardcoded `/news` page to be a [dynamic page route](https://nextjs.org/docs/routing/dynamic-routes) so it can load any BBC [service](https://github.com/vercel-labs/simorgh/tree/9fe338c4505146ff31e17e57344263cf1bb42557/data) and [change the “most read” data from being an additional fetch to being fetched with the initial page data](https://github.com/vercel-labs/simorgh/pull/1/commits/165e4e35d6f6ce8971422c3516736b7c019bb6c1) to reach full page parity.

This gives us our [second preview](https://simorgh-preview-2.vercel.app/news) milestone!

![Our application is starting to look more real.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2PEgiu2gbH3rRBQVmvhonE%2Fa7da63ff7cc7634be0159ff89be6d54c%2FCleanShot_2022-12-23_at_14.09.00_2x.png&w=1920&q=75)

Our application is starting to look more real.

We can now view any BBC service as a front page! A few examples:

One more route to go!

## [Link to heading](#adding-the-article-page)Adding the Article Page

With most of the state and context already populated and working knowledge of how the page routing, rendering, and initial data loading works, we can make quick work of the article page.

Let’s add a new dynamic route for articles, [get initial data](https://github.com/vercel-labs/simorgh/blob/9fe338c4505146ff31e17e57344263cf1bb42557/data/news/articles/c6v11qzyv8po.json), [filter it](https://github.com/vercel-labs/simorgh/pull/1/commits/8f5bc94d4cf1c93f22b0557a471f91dd8cd0d158), and pass it to the `ArticlePage` component.

With this, we get our [third preview](https://simorgh-preview-3.vercel.app/news/articles/c6v11qzyv8po) url [with minimal effort](https://github.com/vercel-labs/simorgh/pull/1/commits/1b223e46f8a90f6b6014e9f5485a3ec630c2c7c3). It really was that easy. This reaffirms our belief above that zeroing in on data and state early on is key.

![Our third iteration shows a dynamic route with Next.js, including handling data and state.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1E763P8aLb3N9XmUwPXR2n%2F294a7adf216479c5fed28384c7c1043b%2FCleanShot_2022-12-23_at_14.10.26_2x.png&w=1920&q=75)

Our third iteration shows a dynamic route with Next.js, including handling data and state.

[According to the documentation](https://github.com/vercel-labs/simorgh/tree/9fe338c4505146ff31e17e57344263cf1bb42557#local-development), there are only two article routes that work without internal BBC API access, so these are the only routes we can use to test.

## [Link to heading](#creating-a-fake-api)Creating a Fake API

To better simulate data coming from a real API, let’s [create a fake API to load page data](https://github.com/vercel-labs/simorgh/pull/1/commits/0831d7f51b58f911f57a784f844cee6890010f7c), which simplifies the code in Next.js pages.

Note that we don't use Next.js's `/pages/api` convention here because we are using `getStaticProps` to pre-render the pages at build time, which means we cannot fetch data using the running app itself before the app is built. Ideally, the API would be it's own app, but this works for a proof of concept.

We also [add `statusCode` to the initial page data](https://github.com/vercel-labs/simorgh/pull/1/commits/c8311b756fd4bb71461e9bf11dda6f7a3951b55e), which allows us to [properly render an error page](https://simorgh-preview-error-page.vercel.app/not-a-real-route) since the base Next.js page route is fully dynamic.

## [Link to heading](#tidying-up)Tidying Up

With both routes functional, we can fix minor console errors and [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) issues, comparing the untouched cloned app to our Next.js app.

Some highlights include:

End result, we reach full parity.

## [Link to heading](#removing-unnecessary-code)Removing Unnecessary Code

Finally, it is time to see just how much code can be eliminated or replaced using Next.js.

All this while completely reusing all existing data schemas, state, components, and styles! Here are our final results:

![Our final result – a fully migrated page from a custom React and Express.js server to Next.js and Vercel.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FOyuBJtI77IGZIkNGOt4Tg%2F3200ee135778cc14e5b6994416343407%2FCleanShot_2022-12-23_at_14.10.56_2x.png&w=1920&q=75)

Our final result – a fully migrated page from a custom React and Express.js server to Next.js and Vercel.

## [Link to heading](#reviewing-before-&-after)Reviewing Before & After

Now it's time to compare [our Next.js site](https://simorgh-nextjs.vercel.app/thai) with the [existing BBC website](https://www.bbc.com/thai).

Performance-wise, BBC engineers and contributors deserve kudos for delivering a highly performant and fine-tuned website. Their Lighthouse scores were already good. Our [Next.js version scores](https://pagespeed.web.dev/report?url=https%3A%2F%2Fsimorgh-nextjs.vercel.app%2Fthai&form_factor=mobile) were relatively even with existing [BBCs scores](https://pagespeed.web.dev/report?url=https%3A%2F%2Fwww.bbc.com%2Fthai&form_factor=mobile), with a few scores doing marginally better or worse on both sides (if you view the score links, disregard the SEO score for the Next.js site; it’s because there isn’t a `robots.txt` and [Vercel preview urls are not indexable by default](https://vercel.com/docs/concepts/deployments/preview-deployments#preview-urls)).

However, moving to Next.js brought some notable developer and user experience benefits:

-   Average HMR Time improved from **1.3s to 131ms**
    
    -   _Average of ten runs; adding and removing a_ _`<p>`_ _tag from_ _`FrontPage`_
        
-   The number of network requests was reduced from **57 to 34**
    
    -   _Based on an incognito session, empty cache, and hard reload_
        

## [Link to heading](#unrealized-future-potential)Unrealized Future Potential

Even with all these improvements, it still feels like we're just getting started. There is still so much potential for other optimizations and enhancements we can make in future iterations.

-   Remove the custom ESLint config and move to [Next.js's integrated ESLint capabilities](https://nextjs.org/docs/basic-features/eslint).
    
-   Change all links to use [`next/link`](https://nextjs.org/docs/api-reference/next/link) for fast SPA-like page transitions.
    
-   Change all `<img>` tags to use [`next/image`](https://nextjs.org/docs/api-reference/next/image) and remove the [custom placeholder component](https://github.com/vercel-labs/simorgh/blob/9fe338c4505146ff31e17e57344263cf1bb42557/src/app/legacy/containers/ImageWithPlaceholder/index.jsx) and the `react-lazyload` dependency.
    
-   BBC supports [AMP](https://amp.dev/) on its [front page and article pages](https://github.com/vercel-labs/simorgh/tree/9fe338c4505146ff31e17e57344263cf1bb42557#local-development), which could be replaced with [`next/amp`](https://nextjs.org/docs/api-reference/next/amp).
    
-   Investigate [Internationalized Routing](https://nextjs.org/docs/advanced-features/i18n-routing) to better handle translations, language, and language direction.
    
-   Create the best strategy for SSR, CSR, and ISR based on BBC's CMS, API, and business rules and goals.
    

## [Link to heading](#conclusion)Conclusion

If all things are nearly equal performance-wise, _then what is the point_?

_**We have managed to remove 20,000+ lines of code and 30+ dependencies**_!

And what did we have to do to achieve nearly the same results? _**Nothing.**_

We can't get back the time spent on learning and configuring these dependencies to create a custom framework - but we can cut down on future maintenance.

By leveraging Next.js, we can let go of being experts and maintainers of this frontend tooling and leverage the community surrounding Next.js. You can benefit from new features and enhancements offered through Next.js - often with a simple, non-breaking version bump. By leveraging Vercel Preview Deployments, we can verify our progress in isolation with the full confidence that the end result will scale to meet the BBC's traffic demands and reduce reliance on internal DevOps teams.

Next.js and Vercel enable you and your team to do your best work, work _**only you**_ can do for your project or company, at the moment of inspiration. This freedom allows you to focus on your product and customers instead of application infrastructure.

We hope this has given you and your team an idea of how how to approach such a conversion of your own custom React setup. And BBC, if you’re interested in seeing this through, please [reach out and let us know](https://vercel.com/contact/sales).