---
title: "React Query - The Bad Parts"
source: "https://tkdodo.eu/blog/react-query-the-bad-parts"
publishedDate: "2024-12-28"
category: "frontend"
feedName: "TkDodo"
---

28.12.2024 — [ReactJs](https://tkdodo.eu/blog/tags/react-js), [React Query](https://tkdodo.eu/blog/tags/react-query), [Talk](https://tkdodo.eu/blog/tags/talk), [TypeScript](https://tkdodo.eu/blog/tags/type-script), [JavaScript](https://tkdodo.eu/blog/tags/java-script) — 1 min read

![focus photography of gray and black DSLR camera](https://tkdodo.eu/blog/static/02d3513d8cf35bae8a7eaa54f10a0e71/bbe0c/bad-parts.jpg "focus photography of gray and black DSLR camera")

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
-   [#20: You Might Not Need React Query](https://tkdodo.eu/blog/you-might-not-need-react-query)
-   [#21: Thinking in React Query](https://tkdodo.eu/blog/thinking-in-react-query)
-   [#22: React Query and React Context](https://tkdodo.eu/blog/react-query-and-react-context)
-   [#23: Why You Want React Query](https://tkdodo.eu/blog/why-you-want-react-query)
-   [#24: The Query Options API](https://tkdodo.eu/blog/the-query-options-api)
-   [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations)
-   [#26: How Infinite Queries work](https://tkdodo.eu/blog/how-infinite-queries-work)
-   [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/react-query-api-design-lessons-learned)
-   **#28: React Query - The Bad Parts**
-   [#29: Concurrent Optimistic Updates in React Query](https://tkdodo.eu/blog/concurrent-optimistic-updates-in-react-query)
-   [#30: React Query Selectors, Supercharged](https://tkdodo.eu/blog/react-query-selectors-supercharged)

_No translations available._-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Here are the slides + transcript from the talk I recently gave at the [React Day Berlin](https://reactday.berlin/) conference. You can swipe left or right or use the arrow buttons / arrow keys to switch between the slides. You can also find the recording on [the GitNation site](https://gitnation.com/contents/react-query-the-bad-parts). Enjoy!

  

* * *

This is gonna be a quick one, almost a lightning talk really - because mostly,

* * *

... React Query is just great ❤️. I think it's really loved by the community for providing a great Developer Experience and User Experience alike. Now I know that's a bold claim, but I have brought some data to back that up:

* * *

If we look at weekly download numbers on NPM, React Query has grown a lot this year - from 4 million to almost 6 million - a 50% increase.

Now those are huge numbers, but let's compare that to React ...

* * *

which is also growing strong, sitting at 27M weekly downloads. Our curve doesn't look as impressive anymore, but it also kinda implies that React Query is used in more than 20% of all React applications, or in every 5th app.

And some of those apps ...

* * *

... have millions of users themselves, like sentry, bsky or chatGPT, so React Query really gets a lot of exposure.

Now of course download numbers and usage aren't everything, just because something is used often doesn't necessarily mean it's liked.

Maybe a better way is to look at surveys:

* * *

State of frontend 2024 is quite new, and they asked "which tools have you used to fetch data in the last year"?

I'm not gonna nit pick that RQ isn't a data fetching solution like axios or fetch, but behind those, it comes with a very high positive sentiment: Only 2.8% of people who used it didn't like it.

* * *

State of React has a similar question around "Utilities for loading and managing data", and if we group that by positive sentiment, TanStack Query actually comes out at the top with just over 44%.

So, I'm really happy that developers seem to like the library ...

* * *

... because I've been maintaining it for the last 4 years.

My name is Dominik, I'm a Software Engineer living in Vienna, where I will be joining the Frontend Platform Team @ sentry next month. You can find me as TkDodo online almost everywhere, and I also have a blog where I write about React and TypeScript, and of course, React Query.

I've written and talked a lot about why React Query is great, and it really is, but still:

* * *

everything is a tradeoff. Using any piece of technology is usually a good tradeoff if the thing we are getting in return is better for us (worth more) than what we are trading in.

* * *

I think React Query is really a good tradeoff for most situations, but of course there are cases where it might not be the best fit.

* * *

So today, I want to talk about these cases, but also debunk some myths I've heard about React Query that make it sound like it's bad when it probably isn't.

* * *

So maybe the talk is more like React Query - The Tradeoffs.

So let's get started with the first point, the elephant in the room -

* * *

the bundle-size. React Query has a huge bundle size is something I hear often as it's largest drawback.

Okay let's first establish what the "bundle size" isn't:

* * *

It’s not what you see on npm. That’s the size that gets shipped when developers install the library. Yes, it's over 700kb, but we also ship codemods and all the sources and source-maps for you to better debug the lib if necessary. It's definitely NOT what gets shipped to the customer.

Okay, it's...

* * *

...also not what you see on bundlephobia. It's a good site to get a quick overview, but it doesn't understand ESM properly (neither do I btw). We ship a special "legacy" build for older bundlers (👋 webpack 4) that isn’t as optimized, and that is what bundlephobia also picks up. (Any modern bundler like vite or webpack 5 will see the more modern ESM build). So no, that size is also too large.

So where can we get the "correct" size then?

* * *

I like bundlejs because it builds what we export on-the-fly with esbuild and show its size impact.

* * *

If we export everything from React Query, we get to 12.4 kB minzipped. Now that's not nothing, but it’s also not a lot. If we care about size, we should probably use brotli compression instead of gzip -

* * *

that would get it down to 12 kb, nice.

But that is when we really use every single feature the library has to offer, so it isn't the typical starting point. You'll usually get quite far with just a `QueryClient`, a `QueryClientProvider`,`useQuery` and `useMutation`.

* * *

That gets it to under 10kb - 9.63 kB to be exact.

Don't get me wrong - bundle size is an important thing to look at before adding a dependency.

* * *

But the debate about what is "light-weight" and what isn't is not the most important one when it comes to a central tool like your async state manager - Especially because there's one metric that is easily left out - likely because it isn't easy to track:

* * *

and that is bundle size you save by code you don't have to write

A library like react-query "pays for itself" because the more you use it, the more it saves you code that you would otherwise have to write yourself.

So when checking bundle size of a library, it's important to not only think about the immediate size it adds, but also what it can save you in the long run. And on that scale, React Query is a clear and easy win for me. Most custom solutions would likely be larger or would fail in edge case, because caching and cache invalidation is hard.

The next myth I would like to debunk is ...

* * *

the fact that React Query can't even fetch on a button click. I get that a lot. The argument is that it's hard for React Query to do imperative data fetching. And it's true - React Query is declarative by default.

* * *

We define a QueryKey and a QueryFunction for useQuery, and it runs automatically:

This code will try to read tasks from the cache, and if they don't exist, it will go fetch and cache them for us. It will also do a background refetch if the data is considered stale.

So far, so good. Now let’s try to add filtering to our Task List

* * *

We'll add a filter form that has an `onApply` callback, and when that gets called, we’d want to refetch the list with new filters:

If we explore what `useQuery` returns, we might find the `refetch` method, and want to try passing ...

* * *

... filters directly to `refetch`. Seems reasonable, except that `refetch` doesn't accept any arguments, so this won't work.

I understand the frustration about this - but it's just not how React Query is designed to work. See, if we have a static key

* * *

like `['tasks']` and we'd refetch with different arguments for that static key, we would not only overwrite previously cached data, we would also run into race conditions that you'd get with fetching in `useEffect`.

React Query has solved both of these problems with a declarative approach - by making your ...

* * *

"dependencies" (what you use inside the QueryFunction) part of the QueryKey. That means we have to store our `appliedFilters`somewhere, for example, in React State.

When the applied filters change, the key changes and React Query will see a new cache entry and will get data for it, or read it from the cache.

* * *

This will get us from the imperative thinking: "If I click this button, I want to refetch" towards the declarative form of: "I want data that matches this state". How it changes is irrelevant.

It's also irrelevant how / where we store the applied filters. With TanStack Router...

* * *

it's a pretty straight forward change to make a navigation with different search params instead of storing it in React State:

This is of course type-safe depending on the search param schema defined on the route, and now, we get a bunch of things for free, like sharable urls or browser back button navigation 🎉

* * *

Another cool thing is that if you change filters back to something you've already fetched, you'll get an instant result. That's because React Query caches everything separately by its key. It's a simple document cache, which means the complete response will be stored under that key.

So yeah, in this example, if a task is both `status: open` AND`priority: high`, it will be in both caches, because there is ...

* * *

...no normalized caching in React Query. In a normalized cache, every piece of data is stored once, and other parts only reference it, to avoid data duplication.

Dedicated solutions for GraphQL, like Apollo Client or urql, offer normalized caching because they are aware of the schema and the relations between the entities.

React Query only knows Promises - it doesn't actually know what's inside the cache.

* * *

In the long feature comparison list from the docs page, Normalized Caching is pretty much the only thing React Query flat out doesn't support. It's a pretty hard problem to solve and can add a lot of complexity, so the tradeoff we've chosen is to not support it. I think that for most applications, refetching upon invalidation works well and is easier to understand too.

So yeah, if you're using GraphQL and need normalized caching, React Query might not be the right choice for you.

* * *

There is however a community tool I want to highlight called`normy`. It tries to bring automatic normalization and data updates to data fetching libraries, and it has integrations for React Query, swr and rtk-query, so you might want to check that out if it sounds interesting to you.

Okay, so we don't do normalized caching because we try to keep things simple, yet...

* * *

I still hear that React Query is complex and has a steep learning curve.

If something is "easy to understand" for someone is always subjective - Things that are straight-forward for you might be a total mystery to me.

But it's undeniable that React Query, like any concept worth applying, has a learning curve, and it also has an API surface that isn't particularly small.

* * *

I went into a lot of details about React Query's API design in my talk at the React Advanced Conference earlier this year, so definitely check that one out if you want an in-depth look at this topic.

Just to touch on it - Tanner has a great tweet summarising the design-goals of React Query, where he says that ...

* * *

@Tan\_Stack Query's API is actually medium sized when you unpack it all, but the most important part is that you can understand and learn how to use it by starting with a single function that provides 80% of the entire value proposition first try. From there, the rest of its API can be gradually learned if needed.

So while Query's API might seem overwhelming at first, you don't need to learn everything at once.

* * *

You can start with `useQuery` with the minimal required options, which will already give you a ton of things:

* * *

Caching, Request Deduplication, stale-while-revalidate background updates, global state management, automatic garbage collection, handling loading states, error states + retries, the list goes on ...

* * *

Then you might add a `useMutation` for performing updates and tying them to queries with query invalidation; that's already a bit more code, but you can really get very far with just those two (`useQuery` and `useMutation`).

* * *

And as your app complexity grows, you might want to look deeper into what React Query has to offer.

* * *

Maybe you want to add an optimistic update, or an infinite query - those are certainly a bit more involved.

* * *

And all the way on the right side of the scale, we have our Persister Plugins and fine-grained direct cache subscriptions, which are really powerful & flexible. We e.g. use them to build our devtools.

Once you reach a certain application complexity, you are probably happy that those exist, but ...

* * *

...the Query API is absolutely designed to evolve with you.

So don't believe that it's necessary to learn everything from the start if that feels overwhelming. Yes, there's a lot to learn, but you can get there incrementally.

Okay so once you've learned the API and you're thinking that it's actually great...

* * *

... you might want to start managing ALL your state with it. But since React Query is bad...

* * *

it really doesn't want you to do that. React Query is really designed to work with async state - it's...

* * *

an Async State manager that knows about the need of server state. It knows that the data we're seeing is only a snapshot of the source of truth, which lives on the server. It revalidates it and keeps what we see up-to-date, ...

* * *

because it's also a data synchronization tool. It also makes assumptions about your connectivity status and potentially retries getting that state.

This is what we love about React Query, but those are all things you don't need when you're storing something synchronous like a side-bar-state toggle....

* * *

IF I had to write that with React Query, this is probably what it would look like, which is far from ideal.

We need to:

* * *

1) come up with a unique key like `sidebarState` that can't collide with anything else

* * *

2) we don't actually need a `queryFn` because there is no async work to be done. We just pass `initialData` and update that with `setQueryData`.

* * *

3) and we need to turn of a bunch of configs to stop React Query from doing what it does best - managing and synchronizing async state.

This isn't easy to get right, it's verbose and it's not very efficient either.

The split in client state and server state is very much on purpose, because they have different needs. So let's use the right tool for the right job. There are plenty of solutions available to manage client state, for example:

* * *

`zustand` - it's minimal, efficient and un-opinionated. We define a store with our state and actions to update that state. I've then created a custom hook to keep the same API as the previous implementation.

A quite similar solution I also really like is `xstate/store`

* * *

because it works a bit better in TypeScript and is event driven.

But the thing is, there are no surprises with either one, they are both perfectly capable of efficiently managing that client state for us, so they are definitely better choices than using React Query for everything.

Okay, so finally, the last thing I'm often hearing is quite funny: Why do I even need a 3rd party library to do something as basic as data fetching - why

* * *

why isn't this built into React?

I can't really answer that because I don't work on React, but I've certainly felt the frustration myself that we don't have a first class async primitive built into React ...

* * *

like for example`createResource` in solidJs

But I think the reason could be that the React team really wants to get an API right before they ship it. As an example,

* * *

we're still wondering why they didn't ship context selectors - something that a lot of people have been requesting to get fine-grained subscriptions to a context.

In this example, we'd have a `SettingsContext` that contains a bunch of settings, but `useTheme` is only interested in updates to the theme value, and `useColor` should only re-render if color has changed.

The change itself would probably not be hard to implement - but they aren't doing it because the React team has a different vision - a place where ...

* * *

we can call the new `use` operator inside `useMemo`, and React will bail out of rendering if we return the same values.

Now this already composes a lot better than selectors, and eventually, this might lead to a place where we can just write ...

* * *

that code without `useMemo` thanks to the React Compiler.

This is a great vision, but it takes time to get there (so this doesn't exist yet), and I think with data fetching, it's a similar story. Everyone "just wants useQuery", but the React Team thinks bigger.

* * *

Suspense is a beautiful architecture where your components get de-coupled from handling loading and error states. It works so well with TypeScript too because data can’t be `undefined`.

And of course, the vision goes beyond client-side data fetching.

* * *

To solve problems at a scale, React now spans to the server as well thanks to Server Components. I wish I had a quote but I couldn't find a good one from the React team, so I'm just gonna say it:

* * *

Suspense and Server Components ARE the async primitive we've been waiting for. And if you're able to work with a framework that supports Server Components, please use them, and until then - `useQuery`.

* * *

That's al I got, thank you 🙇‍♂️

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)