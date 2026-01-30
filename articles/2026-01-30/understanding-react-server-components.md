---
title: "Understanding React Server Components"
source: "https://vercel.com/blog/understanding-react-server-components"
publishedDate: "2023-08-01"
category: "frontend"
feedName: "Vercel"
author: "Alice Alexandra Moore"
---

10 min read

Aug 1, 2023

Learn the fundamentals of React Server Components, to better understand why (and when) to adopt.

[React Server Components](https://react.dev/blog/2020/12/21/data-fetching-with-react-server-components) (RSCs) augment the fundamentals of React beyond being a pure rendering library into incorporating data-fetching and remote client-server communication within the framework.

Below, we’ll walk you through why RSCs needed to be created, what they do best, and when to use them. We'll also touch on how Next.js eases and enhances [the RSC implementation details](https://nextjs.org/docs/getting-started/react-essentials?utm_source=vercel_site&utm_medium=web&utm_campaign=understanding_rsc) through the App Router.

## [Link to heading](#why-do-we-need-server-components)Why do we need Server Components?

Take a look at the world before React. With languages like PHP, we had a tighter relationship between client and server. In a monolithic architecture, you could reach out to the server to call data right within the page you were making. However, there were also disadvantages—namely, difficulty scaling monolithic applications due to cross-team dependencies and high traffic demands.

React was created for composability and incremental adoption into existing codebases. Responding to a world craving rich interactivity, it decoupled concerns of client and server, making the frontend so much more flexible to compose. This was especially crucial for teams: two React components, each made by separate developers, would _just_ _work_ together because they were operating within the same framework.

To accomplish this, React had to innovate on top of pre-existing Web standards. Through the past decade of evolution between multi-page applications (MPA) and single-page applications (SPA), between client-side and server-side rendering, [the goal has remained the same](https://github.com/reactwg/server-components/discussions/5): serve fast data, offer rich interactivity, and maintain great developer experience.

### [Link to heading](#what-did-server-side-rendering-and-react-suspense-solve)What did server-side rendering and React Suspense solve?

Along the path to where we are now—Server Components—there's been other issues that have been crucial to solve. To better understand the need for RSCs, it's helpful first to grasp the need for server-side rendering (SSR) and Suspense.

SSR focuses on initial page load, sending pre-rendered HTML to the client that must then be hydrated with downloaded JavaScript before it behaves as a typical React app. SSR also only happens one time: when directly navigating to a page.

With SSR alone, the user gets HTML more quickly, but must wait on an "all-or-nothing" waterfall before being able to interact with JavaScript:

-   All data must be fetched from the server before any of it can be shown.
    
-   All JavaScript must download from the server before the client can be hydrated with it.
    
-   All hydration has to complete on the client before anything can be interacted with.
    

To solve this, [React created Suspense](https://github.com/reactwg/react-18/discussions/37), which allows for server-side HTML streaming and selective hydration on the client. By wrapping a component with `<Suspense>`, you can tell the server to deprioritize that component's rendering and hydration, letting other components load in without getting blocked by the heavier ones.

When you have multiple components in `<Suspense>`, React works down the tree in the order you've written, allowing you to stream in your application optimally. However, if the user attempts to interact with a certain component, that component will be prioritized over the others.

This vastly improves the situation, but still leaves a few remaining issues:

-   Data for the _entire page_ must be fetched from the server before any components can be shown. The only way around this is to fetch data client-side in a `useEffect()` hook, which has a longer roundtrip than server-side fetches and happens only
    
    _after_ the component is rendered and hydrated.
    
-   All page JavaScript is eventually downloaded, even if it's streamed to the browser asynchronously. As app complexity increases, so does the amount of code the user downloads.
    
-   Despite optimizing hydration, users still cannot interact with components until the client-side JavaScript is downloaded and implemented for that component.
    
-   The majority of JavaScript compute weight still ends up on the client, which could be running on any variety of devices. Why not move it to the more powerful, predictable server?
    

![In Next.js without React Server Components, data fetching requires an extra API layer. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fbs1YQSVp9Z60Z572m5ml1%2F3533351c0aef1778285f897c43f5e708%2FWithout_React.png&w=1920&q=75)![In Next.js without React Server Components, data fetching requires an extra API layer. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FkOA2be85nVBQhL0LA9zmO%2F71f1f53fbf206a18f791b38f8cb2fd6b%2FWithout_React-1.png&w=1920&q=75)

In Next.js without React Server Components, data fetching requires an extra API layer.

As Web standards catch up to where JavaScript frameworks have pushed the boundaries, it’s time for another leap forward. There’s a better way to compose faster applications.

## [Link to heading](#what-do-react-server-components-do)What do React Server Components do?

In order to solve the above issues, React has created Server Components. RSCs individually fetch data and render entirely on the server, and the resulting HTML is streamed into the client-side React component tree, interleaving with other Server and Client Components as necessary.

This process eliminates the need for client-side re-rendering, thereby improving performance. For any Client Components, hydration can happen concurrently with RSCs streaming in, since the compute load is shared between client and server.

Put another way, the server, far more powerful and physically closer to your data sources, deals with compute-intensive rendering and ships to the client just the interactive pieces of code.

When an RSC needs to be re-rendered, due to state change, it refreshes on the server and seamlessly merges into the existing DOM **without a hard refresh**. As a result, the client state is preserved even as parts of the view are updated from the server.

### [Link to heading](#rscs:-performance-and-bundle-size)**RSCs: Performance and bundle size**

RSCs can help reduce the size of the client-side JavaScript bundle and improve loading performance.

Traditionally, while navigating the application, the client downloads and then executes all code and data dependencies. Without a React framework that has [code-splitting](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#1-code-splitting), this also means sending users extraneous code not needed for the page they're on.

However, RSCs resolve all dependencies on the server, closer to the sources of your app's data. They also render out code only on the server, which is much faster at this task than client machines (such as mobile phones). Then, React sends only these processed results plus Client Components to the browser.

In other words, with Server Components, the initial page load is faster and leaner. **The base client-side runtime is cacheable and predictable in size, and does not increase as your application grows.** Additional user-facing JavaScript is primarily added as your application needs more client-side interactivity through Client Components.

### [Link to heading](#rscs:-interleaving-and-suspense-integration)**RSCs: Interleaving and Suspense integration**

RSCs are fully interleaved with client-side code, meaning that Client Components and Server Components can render in the same React tree. By moving the majority of your application code to the server, RSCs help to prevent client-side data fetching waterfalls, quickly resolving data dependencies server-side.

In traditional client-side rendering, components use React Suspense to “pause” their rendering process (and show a fallback state) while waiting for asynchronous work to be completed. With RSCs, both data fetching and rendering occur on the server, so Suspense manages the waiting period server-side, too, shortening the total roundtrip to speed up rendering the fallback and completed page.

It's important to note that [Client Components are still SSR'ed on initial load](https://github.com/reactwg/server-components/discussions/4). The RSC model does not replace SSR or Suspense, but rather it works alongside them to provide all parts of your application to your users as they need them.

![In Next.js with React Server Components, data fetching and UI rendering can be done from the same component. Additionally, Server Actions provide a way for users to interact with server-side data before JavaScript loads on the page.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6BZdqyxU26iA3AYmnnuMl8%2Fa70c1b6f55c10aae42df9b16ae8200d5%2FWith_React.png&w=1920&q=75)![In Next.js with React Server Components, data fetching and UI rendering can be done from the same component. Additionally, Server Actions provide a way for users to interact with server-side data before JavaScript loads on the page.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2aHwJjySBsOw8LIAO17NqR%2F9ab2c561c1792af8e874a75ed23c0bda%2FWith_React-1.png&w=1920&q=75)

In Next.js with React Server Components, data fetching and UI rendering can be done from the same component. Additionally, Server Actions provide a way for users to interact with server-side data before JavaScript loads on the page.

### [Link to heading](#rscs:-limitations)**RSCs: Limitations**

All code written for Server Components must be serializable, which means you can’t use lifecycle hooks, such as `useEffect()` or state.

However, you can still interact with the server from the client through Server Actions, which we’ll get to in [just a bit](#server-actions-react’s-first-steps-into-mutability).

Also, RSCs do not support continuous updates, such as through WebSockets. In these cases, a client-side fetching or polling approach would be necessary.

## [Link to heading](#how-to-use-react-server-components)How to use React Server Components

The beauty of RSCs is that you don’t really need to know fully how they work to take advantage of them. In the App Router introduced in Next.js 13.4, which offers the most feature-complete implementation of RSCs, all components are Server Components by default.

If you want to use lifecycle events such as `useEffect()` or state, you’ll need to weave in a Client Component. Opting into a Client Component is a matter of writing "use client" at the top of the component, but for more advanced advice, we recommend you [check the docs](https://nextjs.org/docs/getting-started/react-essentials#client-components).

### [Link to heading](#balancing-server-and-client-components)**Balancing Server and Client Components**

It's important to note that RSCs are not intended to replace Client Components. A healthy application utilizes both RSCs for dynamic data fetching and Client Components for rich interactivity. The challenge lies in determining when to use each component.

As a developer, consider leveraging RSCs for server-side rendering and data fetching, while relying on Client Components for locally interactive features and user experiences. By striking the right balance, you can create a high-performance, efficient, and engaging application.

The most important thing is that you continue to test your applications in non-standard environments: emulate slower computers, slower phones, and slower wifi, and you may be surprised to see how much better your app works with the right combination of components.

RSCs are not the full solution to the problem of burdening users with too much client-side JavaScript, but they certainly give us the power to choose when to put the weight of compute on the user’s device.

### [Link to heading](#improved-data-fetching-with-next.js)Improved data fetching with Next.js

RSCs fetch data on the server, which not only offers secure access to backend data but also enhances performance by reducing server-client interaction. [Coupled with Next.js enhancements](https://nextjs.org/docs/app/building-your-application/data-fetching?utm_source=vercel_site&utm_medium=web&utm_campaign=understanding_rsc), RSCs also allow for smart data caching, multiple fetches in a single roundtrip, and automatic `fetch()` request deduping—all maximizing the efficiency of sending data client side.

Perhaps most importantly, fetching data on the server helps to prevent client-side data fetching waterfalls, where requests stack up against each other and have to be resolved in serial before the user can continue. Server-side fetches have a much smaller overhead, as they don't block the whole client and they resolve much more quickly.

Additionally, you no longer need Next.js-specific, page-level methods like `getServerSideProps()` and `getStaticProps()`, which didn't offer granular enough control for individual components and tended to over-fetch data. (When the user navigated to the page, all data was fetched, regardless of what components they actually interacted with.)

In the Next.js App Router, all fetched data is now static by default, rendered at build time. However, this can be changed easily: Next.js extends the `fetch` options object to provide flexibility in caching and revalidating rules.

You can use the `{next: {revalidate: number}}` option to refresh static data at set intervals or when backend changes occur (Incremental Static Regeneration), while the `{cache: 'no-store'}` option can be passed in the fetch request for dynamic data (server-side rendering).

All this makes React Server Components within the Next.js App Router a powerful tool for efficient, secure, and dynamic data fetching, all cached by default to deliver a high-performance user experience.

[

**Looking for faster data fetching?**

We've written up a detailed guide about the performance and DX gains for data fetching in the Next.js 13.4 App Router.

Learn More



](https://vercel.com/blog/nextjs-app-router-data-fetching)

### [Link to heading](#server-actions:-react’s-first-steps-into-mutability)Server Actions: React’s first steps into mutability

Within the context of RSCs, Server Actions are functions that you define in an RSC on the server side that you can then pass across the server/client boundary. When a user interacts with your app on the client side, they can directly call Server Actions which will be executed securely on the server side.

This approach provides a seamless [Remote Procedure Call](https://en.wikipedia.org/wiki/Remote_procedure_call) (RPC) experience between the client and the server. Instead of writing a separate API route to communicate with the server, you can directly call Server Actions from your Client Components.

Keep in mind, too, that the Next.js App Router is built entirely around smart data caching, revalidating, and mutating. [Server Actions in Next.js](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions?utm_source=vercel_site&utm_medium=web&utm_campaign=understanding_rsc) mean you can both mutate the cache and update the React tree in the same roundtrip request to the server—all while maintaining client cache integrity through navigation.

Specifically, Server Actions are designed to handle tasks like database updates or form submissions. For example, they can progressively enhance your forms, which means that even if JavaScript hasn’t loaded yet, the user can still interact with the form, and Server Actions will handle the submission and processing of the form data.

The opportunities that Server Actions offer, both for progressive enhancement and eliminating development work on APIs, are great for accessibility, usability, and developer experience.

### [Link to heading](#let-next.js-do-the-heavy-lifting)Let Next.js do the heavy lifting

Next.js is the first framework to integrate the entire React architecture for Server Components, Server Actions, Suspense, Transitions, and all else that has changed with the release of RSCs.

While you focus on building your product, Next.js uses strategic streaming and smart caching to make sure your application rendering stays non-blocking and serves dynamic data at top speeds.

Next.js strives to stay on the cutting edge of new React features without sacrificing stability, reliability, and backward compatibility. It will continue to offer smart defaults for your team to iterate quickly while maintaining flexibility and scalability for projects of any scope.

## [Link to heading](#where-do-you-go-from-here)Where do you go from here?

Let’s recap: React Server Components offer a native way to interact with the server right within the component, lightening both the code and cognitive load of interacting with dynamic data. Client Components remain fully functional and fully usable just as before. Your new job is to choose when to use each one.

For more guidance on this topic, feel free to visit [the Next.js docs](https://nextjs.org/docs/getting-started/react-essentials?utm_source=vercel_site&utm_medium=blog&utm_campaign=understanding_rsc). Additionally, we have an [App Router playground](https://vercel.com/templates/next.js/app-directory) you can get started with immediately to feel the differences yourself.

If you're interested in more articles on React Server Components, we think these are particularly insightful:

For direct assistance on migrating your team’s application to the App Router and React Server Components, feel free to [reach out to us](https://vercel.com/contact/sales).