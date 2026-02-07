---
title: "Next.js 13.4"
source: "https://nextjs.org/blog/next-13-4"
publishedDate: "2023-05-05"
category: "frontend"
feedName: "Next.js Blog"
author: "Sebastian Markbåge"
---

Next.js 13.4 is a foundational release, marking stability for the App Router:

-   [**App Router (Stable)**](#nextjs-app-router):
    -   React Server Components
    -   Nested Routes & Layouts
    -   Simplified Data Fetching
    -   Streaming & Suspense
    -   Built-in SEO Support
-   [**Turbopack (Beta)**](#turbopack-beta): Your local dev server, faster and with improved stability
-   [**Server Actions (Alpha)**](#server-actions-alpha): Mutate data on the server with zero client JavaScript

Since the release of [Next.js 13](https://nextjs.org/blog/next-13) six months ago, we've been focused on building the foundations for the future of Next.js—App Router—in a way that can be incrementally adopted without unnecessary breaking changes.

Today, with the release of 13.4, you can now start adopting the App Router for production.

## Next.js App Router[](#nextjs-app-router)

We released Next.js in 2016 to provide an easy way to server-render React applications, with our goal to create a more dynamic, personalized, and global web.

[In the original announcement post](https://vercel.com/blog/next), we shared some design principles of Next.js:

-   **Zero setup. Use the filesystem as an API**
-   **Only JavaScript. Everything is a function**
-   **Automatic server rendering and code splitting**
-   **Data fetching is up to the developer**

Next.js is now six years old. Our original design principles have remained—and as Next.js has been adopted by more developers and companies, we have been working on a foundational upgrade to the framework to better achieve these principles.

We've been working on the next generation of Next.js, and today with `13.4`, this next generation is stable and ready for adoption. This post will share more about our design decisions and choices for the App Router.

### Zero setup. Use the filesystem as an API[](#zero-setup-use-the-filesystem-as-an-api)

[File-system based routing](https://nextjs.org/docs/app/building-your-application/routing) has been a core feature of Next.js. In our original post, we showed this example of creating a route from a single React component:

There was nothing additional to configure. Drop a file inside `pages/` and the Next.js router would take care of the rest. We still love this simplicity with routing. But as usage of the framework grew, so have the types of interfaces developers are looking to build with it.

Developers have asked for improved support for defining layouts, nesting pieces of UI as layouts, and having more flexibility over defining loading and error states. This wasn't an easy thing to retrofit into the existing Next.js router.

Every part of the framework has to be designed around the router. Page transitions, data fetching, caching, mutating and revalidating data, streaming, styling content, and more.

To make our router compatible with streaming, and to solve these requests for enhanced support for layouts, we set out to build a new version of our router.

This is where we landed after our initial release of our [Layouts RFC](https://nextjs.org/blog/layouts-rfc).

What's more important than what you see here is what you _don't_ see. This new router (which can be incrementally adopted through the `app/` directory) has an entirely different architecture, built on the foundation of [React Server Components](https://nextjs.org/docs/getting-started/react-essentials) and [Suspense](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming).

This foundation has allowed us to remove Next.js specific APIs that were initially developed to extend the React primitives. For example, you no longer have to use a custom `_app` file to customize the global shared layout:

With the Pages Router, layouts were not able to be composed, and data fetching could not be colocated with the component. With the new App Router, this is now supported.

With the Pages Router, `_document` was used to customize the initial payload from the server.

With the App Router, you no longer need to import `<Html>`, `<Head>`, and `<Body>` from Next.js. Instead, you just use React.

The opportunity to build a new file-system router was also the right time to address many other related feature requests with our routing system. For example:

-   Previously, you could only import global stylesheets from external npm packages (like component libraries) in `_app.js`. This was a less-than-ideal developer experience. With the App Router, you can import (and colocate) any CSS file in any component.
-   Previously, opt-ing into server-side rendering with Next.js (through `getServerSideProps`) meant that interacting with your application was blocked until the entire page was hydrated. With the App Router, we've refactored the architecture to be deeply integrated with React Suspense, meaning we can selectively hydrate parts of the page, without blocking other components in the UI from being interactive. Content can be instantly streamed from the server, improving the perceived loading performance of a page.

The [router](https://nextjs.org/docs/app/building-your-application/routing) is the core of what makes Next.js work. But it's not about the router itself, but how it integrates the rest of the pieces of the framework—like [data fetching](https://nextjs.org/docs/app/building-your-application/data-fetching).

### Only JavaScript. Everything is a function[](#only-javascript-everything-is-a-function)

Next.js and React developers want to write JavaScript and TypeScript code and compose application components together. From our original post:

> In future versions of Next.js, we added a DX improvement to automatically import React for you.

This component encapsulates logic that can be reused and composed anywhere in your application. Paired with file-system routing, this meant an easy way to get started building React applications that felt like writing JavaScript and HTML.

For example, if you wanted to fetch some data, the original version of Next.js looked like this:

> In future versions of Next.js, we added a DX improvement that polyfilled fetch so you didn't need to import `isomorphic-fetch` or `node-fetch`, and could use the Web `fetch API` on both the client and server.

As adoption grew and the framework matured, we explored new patterns for data fetching.

`getInitialProps` ran both the server _and_ client. This API extended the React component, allowing you to make a `Promise` and forward the results to the component's `props`.

While `getInitialProps` does still work today, we then iterated forward on the next generation of data fetching APIs based on customer feedback: `getServerSideProps` and `getStaticProps`.

These APIs made it more clear where your code was running, either the client or server, and allowed Next.js applications to be [automatically statically optimized](https://nextjs.org/docs/pages/building-your-application/rendering/automatic-static-optimization). Further, it allowed for [static exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports), enabling Next.js to be deployed to places that don't support a server (e.g. AWS S3 bucket).

However, this was not "just JavaScript", and we wanted to adhere closer to our original design principle.

Since Next.js was created, we've worked closely with the React core team at Meta to build framework features on top of React primitives. Our partnership, in combination with the years of research and development from the React core team, has led to an opportunity for Next.js to achieve our goals through the latest version of the React architecture, including [Server Components](https://nextjs.org/docs/getting-started/react-essentials).

With the App Router, you [fetch data](https://nextjs.org/docs/app/building-your-application/data-fetching) using the familiar `async` and `await` syntax. There are no new APIs to learn. By default, all components are React Server Components, so data fetching happens securely on the server. For example:

Critically, the "data fetching is up to the developer" principle is realized. You can fetch data and compose _any_ component. And not just first-party components, but _any_ component in the Server Components ecosystem, like a [Twitter embed](https://github.com/vercel-labs/react-tweet) `react-tweet`, which has been designed to integrate with Server Components and run entirely on the server.

Since the router is integrated with [React Suspense](https://react.dev/reference/react/Suspense), you can more fluidly display fallback content while parts of your content are loading, and progressively reveal content as desired.

Further, the router marks page navigations as [transitions](https://react.dev/reference/react/useTransition), enabling route transitions to be interruptible.

### Automatic server rendering and code splitting[](#automatic-server-rendering-and-code-splitting)

When we created Next.js, it was still common for developers to manually configure webpack, babel, and other tooling to get a React application running. Adding further optimizations like server rendering or code splitting was often not implemented in custom solutions. Next.js, as well as other React frameworks, created an abstraction layer to implement and force these best practices.

Route-based code splitting meant that each file in your `pages/` directory would be code split into its own JavaScript bundle, helping reduce the file system and improve initial page load performance.

This was beneficial for both server-rendered applications as well as single-page applications with Next.js, as the latter often loaded a single large JavaScript bundle on application startup. However, to implement component-level code splitting, developers needed to use `next/dynamic` to dynamically import components.

With the App Router, Server Components are not included in the JavaScript bundle for the browser. [Client components](https://nextjs.org/docs/getting-started/react-essentials#client-components) are automatically code split by default (either with webpack or Turbopack in Next.js). Further, since the entire router architecture is streaming and Suspense enabled, you can progressively send parts of your UI from the server to the client.

For example, you can code split entire code paths with conditional logic. In this example, you would not need to load the dashboard's client-side JavaScript for logged-out users.

## Turbopack (Beta)[](#turbopack-beta)

[Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), our new bundler we're testing and stabilizing through Next.js, helps speed up local iterations while working on your Next.js application (through `next dev --turbo`) and soon your production builds (`next build --turbo`).

Since the alpha release in Next.js 13, we've seen a steady growth in adoption as we've worked to patch bugs and add support for missing features. We've been dogfooding Turbopack on [Vercel.com](https://vercel.com/) and with many Vercel customers operating large Next.js websites to gather feedback and improve stability. We are grateful for the community's support in testing and reporting bugs to our team.

Now six months later, we're ready to move forward into the beta phase.

Turbopack does not yet have full feature parity with webpack and Next.js. We are tracking support for those features in [this issue](https://github.com/vercel/next.js/issues/49174). However, the majority of use cases should now be supported. Our goal with this beta is to continue addressing remaining bugs from increased adoption and prepare for stability in a future version.

Our investment into improving the incremental engine and caching layer of Turbopack will not only speed up local development, but also production builds soon. Stay tuned for a future Next.js version where you'll be able to run `next build --turbo` for instant builds.

Try out the [Turbopack](https://nextjs.org/docs/architecture/turbopack) beta today in Next.js 13.4 with `next dev --turbo`.

## Server Actions (Alpha)[](#server-actions-alpha)

The React ecosystem has seen a lot of innovation and exploration of ideas around forms, managing form state, and caching and revalidating of data. Over time, React has become more opinionated about some of these patterns. For example, recommended ["uncontrolled components"](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components) for form state.

The current ecosystem of solutions has either been reusable client-side solutions or primitives built into frameworks. Until now, there hasn't been a way to compose server mutations and data primitives. The React team [has been working](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023) on a first-party solution for mutations.

We're excited to announce support for experimental **Server Actions in Next.js**, enabling you to mutate data on the server, calling functions directly _without_ needing to create an in-between API layer.

With Server Actions, you have powerful server-first data mutations, less client-side JavaScript, and progressively enhanced forms.

Server Actions in Next.js have been designed for deep integration with the rest of the data lifecycle, including the Next.js Cache, Incremental Static Regeneration (ISR), and the client router.

Revalidating data through new APIs `revalidatePath` and `revalidateTag` mean that mutating, re-rendering the page, or redirecting can happen in **one network roundtrip**, ensuring the correct data is displayed on the client, even if the upstream provider is slow.

Server Actions are designed to be composable. Anyone in the React community can build and publish Server Actions and distribute them in the ecosystem. Just like Server Components, we're excited about the new era of composable primitives for both the client and the server.

[Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions) are available today in alpha with Next.js 13.4. By opting into using Server Actions, Next.js will use the experimental release channel of React.

## Other Improvements[](#other-improvements)

-   [Draft Mode](https://nextjs.org/docs/app/building-your-application/configuring/draft-mode): Fetch and render draft content from your headless CMS. Draft mode works in both `pages` and `app`. We've enhanced and simplified the existing Preview Mode API, which continues to work for `pages`. Preview Mode does _not_ work in `app`—you should use Draft Mode.

## Frequently Asked Questions[](#frequently-asked-questions)

### What does App Router stability mean?[](#what-does-app-router-stability-mean)

Marking the App Router as stable today does not mean our work is done. Stability means that the core of the App Router is ready for production and has been validated by both our own internal testing, as well as many Next.js early adopters.

There are still additional optimizations we'd like to make in the future, including Server Actions reaching full stability. It was important for us to push towards core stability to help provide clarity for the community on where they should begin learning and building applications today.

The App Router is built on top of the React `canary` channel, which is now ready for framework adoption of features like Server Components. [Learn more](https://react.dev/blog/2023/05/03/react-canaries).

### What does this mean for the Next.js beta docs?[](#what-does-this-mean-for-the-nextjs-beta-docs)

Starting today, we recommend building new applications with the App Router. The Next.js beta documentation, which has been used to explain the App Router and re-written from the ground up, is now merged back into the [stable Next.js documentation](https://nextjs.org/docs). You can now easily toggle between the App or Pages Router.

We recommend reading the [App Router Incremental Adoption Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration) to learn how to adopt the App Router.

### Is the Pages Router going away?[](#is-the-pages-router-going-away)

No. We are committed to supporting `pages/` development, including bug fixes, improvements, and security patches, for multiple major versions moving forward. We want to ensure developers have enough time to incrementally adopt the App Router as they're ready.

Using both `pages/` and `app/` in production together is supported and encouraged. The App Router can be adopted on a [per-route basis](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration).

### Does this mean Server Components are "complete"?[](#does-this-mean-server-components-are-complete)

Next.js is one framework that is choosing the build on the React architecture, which includes Server Components. We hope that the experience provided with the App Router will encourage other frameworks (or new frameworks) to consider using this architecture, as well.

There are still patterns yet to be defined in this ecosystem, like handling infinite scroll. For now, we recommend using client solutions for these patterns while the ecosystem grows and libraries are created or updated.

Next.js is the result of the combined work of over 2,600 individual developers, industry partners like Google and Meta, and our core team at Vercel. Join the community on [GitHub Discussions](https://github.com/vercel/next.js/discussions), [Reddit](https://www.reddit.com/r/nextjs/), and [Discord](https://nextjs.org/discord).

This release was brought to you by:

-   The **Next.js** team: [Andrew](https://github.com/acdlite), [Balazs](https://github.com/balazsorban44), [Jan](https://github.com/jankaifer), [Jiachi](https://github.com/huozhi), [Jimmy](https://github.com/feedthejim), [JJ](https://github.com/ijjk), [Josh](https://github.com/gnoff), [Sebastian](https://github.com/sebmarkbage), [Shu](https://github.com/shuding), [Steven](https://github.com/styfle), [Tim](https://github.com/timneutkens), and [Wyatt](https://github.com/wyattjoh).
-   The **Turbopack** team: [Alex](https://github.com/alexkirsz), [Donny](https://github.com/kdy1), [Justin](https://github.com/jridgewell), [Leah](https://github.com/forsakenharmony), [Maia](https://github.com/padmaia), [OJ](https://github.com/kwonoj), [Tobias](https://github.com/sokra), and [Will](https://github.com/wbinnssmith).

And the contributions of: @shuding, @huozhi, @wyattfry, @styfle, @sreetamdas, @afonsojramos, @timneutkens, @alexkirsz, @chriswdmr, @jankaifer, @pn-code, @kdy1, @sokra, @kwonoj, @martin-wahlberg, @Kikobeats, @JTaylor0196, @sebmarkbage, @ijjk, @gnoff, @jridgewell, @sagarpreet-xflowpay, @balazsorban44, @cprussin, @ForsakenHarmony, @li-jia-nan, @dciug, @albertothedev, @DuCanhGH, @feedthejim, @patrick91, @padmaia, @sophiebits, @eps1lon, @reconbot, @acdlite, @cjmling, @nabsul, @motopods, @hanneslund, @tunamagur0, @devknoll, @apeltop, @maranomynet, @y-tsubuku, @EndangeredMassa, @ykzts, @AviAvinav, @adilansari, @wyattjoh, @charkour, @delbaoliveira, @agadzik, @Just-Moh-it, @rodrigofeijao, @leerob, @juliusmarminge, @koba04, @Phiction, @jessewarren-aa, @ryo-manba, @Yovach, and @dylanjha.