---
title: "You Might Not Need React Query"
source: "https://tkdodo.eu/blog/you-might-not-need-react-query"
publishedDate: "2023-05-20"
category: "frontend"
feedName: "TkDodo"
---

![trees](https://tkdodo.eu/blog/static/f4480150611739f92319a05f1e56d69b/bbe0c/trees.jpg "trees")

-   [#1: Practical React Query](https://tkdodo.eu/blog/practical-react-query)
-   [#2: React Query Data Transformations](https://tkdodo.eu/blog/react-query-data-transformations)
-   [#3: React Query Render Optimizations](https://tkdodo.eu/blog/react-query-render-optimizations)
-   [#4: Status Checks in React Query](https://tkdodo.eu/blog/status-checks-in-react-query)
-   [#5: Testing React Query](https://tkdodo.eu/blog/testing-react-query)
-   [#6: React Query and TypeScript](https://tkdodo.eu/blog/react-query-and-type-script)
-   [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/using-web-sockets-with-react-query)
-   [#8: Effective React Query Keys](https://tkdodo.eu/blog/effective-react-query-keys)
-   [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/leveraging-the-query-function-context)
-   [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query)
-   [#10: React Query as a State Manager](https://tkdodo.eu/blog/react-query-as-a-state-manager)
-   [#11: React Query Error Handling](https://tkdodo.eu/blog/react-query-error-handling)
-   [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/mastering-mutations-in-react-query)
-   [#13: Offline React Query](https://tkdodo.eu/blog/offline-react-query)
-   [#14: React Query and Forms](https://tkdodo.eu/blog/react-query-and-forms)
-   [#15: React Query FAQs](https://tkdodo.eu/blog/react-query-fa-qs)
-   [#16: React Query meets React Router](https://tkdodo.eu/blog/react-query-meets-react-router)
-   [#17: Seeding the Query Cache](https://tkdodo.eu/blog/seeding-the-query-cache)
-   [#18: Inside React Query](https://tkdodo.eu/blog/inside-react-query)
-   [#19: Type-safe React Query](https://tkdodo.eu/blog/type-safe-react-query)
-   **#20: You Might Not Need React Query**
-   [#21: Thinking in React Query](https://tkdodo.eu/blog/thinking-in-react-query)
-   [#22: React Query and React Context](https://tkdodo.eu/blog/react-query-and-react-context)
-   [#23: Why You Want React Query](https://tkdodo.eu/blog/why-you-want-react-query)
-   [#24: The Query Options API](https://tkdodo.eu/blog/the-query-options-api)
-   [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations)
-   [#26: How Infinite Queries work](https://tkdodo.eu/blog/how-infinite-queries-work)
-   [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/react-query-api-design-lessons-learned)
-   [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/react-query-the-bad-parts)
-   [#29: Concurrent Optimistic Updates in React Query](https://tkdodo.eu/blog/concurrent-optimistic-updates-in-react-query)
-   [#30: React Query Selectors, Supercharged](https://tkdodo.eu/blog/react-query-selectors-supercharged)

-   [한국어](https://velog.io/@cnsrn1874/you-might-not-need-react-query)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Will [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components) kill React Query? This is probably the question I'm getting asked the most for the past couple of months. And the thing is: I have no good answer. Remember: Like most devs in this industry, I'm also just making things up as we go. If you expect me to have a grand plan for everything, I'm here to disappoint. I'm just as curious as you are how things will turn out in the end. 😅

[

![Avatar for TkDodo](https://tkdodo.eu/blog/static/f5315ea49d7e41077957b8c547d2dedb/37851/1021430.jpg)

Dominik 🔮

@

TkDodo

Not gonna lie that (as a maintainer of a library in the data fetching space) I'm feeling mostly afraid of server components and suspense.

"How will this work with react-query" is a good question. It feels like I'm supposed to have an answer but I don't. Huge imposter syndrome rn

\-

Oct 26, 2022



](https://x.com/TkDodo/status/1585204181651988481)

That said, I now had some time to look at this topic a bit closer, and I also discussed this with some folks who know way more about the topic than I do. I now feel confident enough to give you _my opinion_ on the topic. But that's all that is: _my thoughts_, so take it with a grain of salt.

## My Take[](#my-take)

Every tool that we're using should help us solve a problem that we're having. Traditionally, React was pretty un-opinionated on how to do data fetching in your application. It literally didn't care - here's `useEffect` and do with it what you want.

This is the time libraries like [React Query](https://tanstack.com/query/latest/docs/react/overview) or [swr](https://swr.vercel.app/) were born in. They filled a pretty big gap and were quickly adopted because of their great DX and improvements they brought for users as well. [React Router](https://reactrouter.com/en/main) falls into a similar category - solving the need for routing when your "view" library has nothing to offer out of the box.

When Server Side Rendering became a thing, we were mostly focussed on pre-rendering html on the server to speed up the initial page load. After that, our app behaves like a full SPA - client side page navigations and all. In this world, React Query also plays an important role: You can move initial data fetching to the server, and then hydrate the fetch results on the client. This provides a good way to [seed the cache](https://tkdodo.eu/blog/seeding-the-query-cache) as early as possible - on the server.

### So what changed?[](#so-what-changed)

Times are evolving, things get better. Even though it might look like things are oscillating back and forth, they are, in fact, moving forward:

[

![Avatar for swyx](https://tkdodo.eu/blog/static/0f25e3ff4d794ab8fe3df21e03bd52b7/47930/swyx.jpg)

swyx.ai

@

swyx

i'm sure @Mappletons can do better but this is what i see in my head every time i see "devs just go back and forth in endless cycles" comments

![Cynics vs Builders](https://tkdodo.eu/blog/static/04698d1554fb1f7a2ad05a68aca94323/62d06/EXx9RHYVAAUgegZ.jpg)

\-

May 12, 2023



](https://x.com/swyx/status/1260019961868677121)

React is still just a library to render components, but with Server Components, it now offers a new application architecture where you can render them ahead of time, on the server. This could be during build time, or at runtime, where they allow access to data without building an API that needs to be queried from the client:

server-component

```
1export default async function Page() {2  const data = await fetch(3    `https://api.github.com/repos/tanstack/react-query`4  )5
6  return (7    <div>8      <h1>{data.name}</h1>9      <p>{data.description}</p>10    </div>11  )12}
```

It still blows my mind that using `async/await` inside a React Component _just works_, and it's exciting to see frameworks picking up the problem and offering first class solutions to them. This changes things dramatically for applications that are adopting this architecture. React Query is, first and foremost, a library to manage asynchronous state on the client. If your data fetching happens on the server exclusively - why would you need it?

### You Might Not Need It[](#you-might-not-need-it)

And the answer is: You probably don't. If you're starting a new application, and you're using a mature framework like [Next.js](https://nextjs.org/) or [Remix](https://remix.run/) that has a good story around data fetching and mutations, you probably don't need React Query.

And that's totally fine. I'm not here to tell you to use React Query in every possible situation, just because I happen to maintain it. If you decide to use it, it should be because it helps you solve a problem.

### Integration[](#integration)

There is still a lot of space to integrate React Query into this new world of Server Components. For one, most projects won't start on a green field. There are tons of applications out there that have been built over the years, and while you can incrementally adopt the `app` directory, leveraging Server Components requires some sort of re-architecture.

For this transitioning period, React Query integrates very well with the `app` directory and Server Components. You can move some components to fetch on the server only, or you can use Server Components to prefetch your cache and pass the result to a client component, where you `useQuery`. It doesn't have to be all-or-nothing. The [official docs](https://tanstack.com/query/v4/docs/react/guides/ssr#using-the-app-directory-in-nextjs-13) already have a good guide for this integration, and I will likely follow this up with another blog post on things to look out for.

### Hybrid approach[](#hybrid-approach)

This hybrid approach can be especially beneficial if you are hitting a use-case that isn't (yet) well supported by Server Components.

As an example, you might want to render an Infinite Scrolling List, where you pre-fetch the first page on the server, but you want to fetch more pages on the client as the user scrolls towards the end. Or you might have the requirement to have your app work [without network connection](https://tkdodo.eu/blog/offline-react-query) as well. Or maybe you just like the user experience of always seeing fresh data, even without an explicit user interaction (think: interval fetching or all the smart auto-refetches you get from React Query).

React Query has a great story around all these situations, so there are definitely cases where combining it with Server Components makes sense. However, if you've used React Query primarily to fetch some data and display it to the user, I think Server Components will have you nicely covered there as well. And once the mutation story ([server actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)) become an established pattern, you might not even need it for updating data.

### It's not a "killer"[](#its-not-a-killer)

I think it's also fair to say that not everybody will be adopting Server Components, for various reasons. Maybe your backend is not written in nodeJs, and it's fine that your frontend is an SPA without a dedicated server. Maybe you're building a mobile app with React Native. If you're a TanStack Query user, you might not even use React at all.

Further, you can use React Query for things _other than_ data fetching. Have a look at the replies to this tweet to get some inspiration:

[

![Avatar for TkDodo](https://tkdodo.eu/blog/static/f5315ea49d7e41077957b8c547d2dedb/37851/1021430.jpg)

Dominik 🔮

@

TkDodo

What are some things that you use TanStack Query for that is \_not\_ data fetching? Curious to know what other use-cases you all have 😄

\-

Jan 20, 2023



](https://x.com/TkDodo/status/1616490384305311745)

All of these are perfectly fine use-cases to choose Query as your async state manager on the client. But if you are opting to go with a framework that has built-in, first class support for this - please use that! I mean, why would you use remix and not fetch data in their loaders? 🤷‍♂️

So, my prediction is that there will still be plenty of usages outside - and even combined with - React Server Components for TanStack Query. The current narrative is all about RSC though, and that's fine. It's a new, shiny piece of tech that everybody is excited to try out.

But it's still quite early, bleeding edge tech. In order to use them, you have to tightly integrate with a given framework, a router and a bundler. It also means you need to have the infrastructure to handle the additional server load. I kind of keep repeating myself, but:

there is no free lunch; everything is a tradeoff.

![Buzz Lightyear meme: tradeoffs, tradeoffs everywhere](https://tkdodo.eu/blog/static/f4984c75af932f831d2b9ceef2496aea/f21ed/tradeoffs.jpg "Buzz Lightyear meme: tradeoffs, tradeoffs everywhere")

So, I would not feel obliged to move everything over to Server Components immediately. As a Next.js user myself, I'm excited to move our app over to the `app` directory - mainly to benefit from nested routes. And I'll definitely move some of the more static data fetching (e.g. where we have `staleTime: Infinity`) over to Server Components.

But reports of React Query's death are greatly exaggerated.

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)