---
title: "Thinking in React Query"
source: "https://tkdodo.eu/blog/thinking-in-react-query"
publishedDate: "2023-06-07"
category: "frontend"
feedName: "TkDodo"
---

07.06.2023 — [ReactJs](https://tkdodo.eu/blog/tags/react-js), [React Query](https://tkdodo.eu/blog/tags/react-query), [Talk](https://tkdodo.eu/blog/tags/talk), [TypeScript](https://tkdodo.eu/blog/tags/type-script), [JavaScript](https://tkdodo.eu/blog/tags/java-script) — 1 min read

![thinking people](https://tkdodo.eu/blog/static/d535183e06354a8b12ffbca2ca6cba20/7d769/thinking.png "thinking people")

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
-   **#21: Thinking in React Query**
-   [#22: React Query and React Context](https://tkdodo.eu/blog/react-query-and-react-context)
-   [#23: Why You Want React Query](https://tkdodo.eu/blog/why-you-want-react-query)
-   [#24: The Query Options API](https://tkdodo.eu/blog/the-query-options-api)
-   [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations)
-   [#26: How Infinite Queries work](https://tkdodo.eu/blog/how-infinite-queries-work)
-   [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/react-query-api-design-lessons-learned)
-   [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/react-query-the-bad-parts)
-   [#29: Concurrent Optimistic Updates in React Query](https://tkdodo.eu/blog/concurrent-optimistic-updates-in-react-query)
-   [#30: React Query Selectors, Supercharged](https://tkdodo.eu/blog/react-query-selectors-supercharged)

-   [한국어](https://velog.io/@seungchan__y/React-Query-%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%82%AC%EA%B3%A0%ED%95%98%EA%B8%B0)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Today's article comes in a different form: it's the slides + transcript from a talk I recently gave at a meetup in Vienna, as well as on the remote day of [React Summit](https://reactsummit.com/). You can swipe left or right or use the arrow buttons / arrow keys to switch between the slides. You can also find the recording on [the GitNation site](https://gitnation.com/contents/thinking-in-react-query). Enjoy!

  

* * *

Hello everyone 👋, thanks for being here with me today, where I want to talk about...

* * *

...tying your shoes correctly.

Most people don't know that there is a right and a wrong way to tie your shoes. Both ways look very similar at first glance, but one knot is stable and the other loosens as you walk. It's a little difference that might change your life. Stay tuned until the end where I'll show you that trick.

* * *

When working with React Query, we might face similar situations, where a small tweak can make a huge difference.

* * *

I discovered this when I started my open source journey back in 2020, where I was mostly helping out by engaging with the community.

I answered A LOT of questions on different platforms, which was a great way for me to get started in open source. Turns out, people are really happy and grateful if you help them solve their problem, and I also learned a lot by having to look at situations I haven't encountered myself yet.

* * *

With that, I got to know React Query pretty well, and that's when I realized a common pattern among those questions. A lot of them showed an underlying misconception of what React Query is or does, and would probably answer themselves with a little shift in thinking.

* * *

My name is Dominik, and I'm a Software Engineer from Vienna. I go by the name TkDodo online almost everywhere, I work as a Frontend Tech Lead at Adverity, and I've also had the privilege to maintain the open source library React Query for the past two years.

* * *

So today, what I really want to talk about is showing you 3 simple ways on how to approach react query with a better mindset. Similar to tying your shoes correctly, once you know it, it hopefully makes a lot of sense and is quite simple to follow.

* * *

So let's take a look at what it takes to be "Thinking in React Query"

* * *

The first point might surprise you, but it's true: Even though it is often described as "the missing piece for data fetching in React", React Query is NOT a data fetching library. It doesn't do any data fetching for you, because if we take a quick look

* * *

at a standard react query example: we can see that we need to provide two things to `useQuery`:

* * *

A unique `queryKey` where React Query will store the data for us,

* * *

and a `queryFn` that will be executed whenever data should be retrieved.

* * *

We can then of course use that hook in a component to render data and the various states the query can be in, but if we take a quick look at the `queryFn` again...

* * *

we can see that in this example, it is implemented with axios, because, why not? But the point is: THAT is your data-fetching library. React Query doesn't care how you do it.

* * *

The only thing it cares about is if we are returning a `fulfilled` or `rejected` Promise.

In fact (and this is probably me talking as a library maintainer), if you're filing an issue telling me you can't show a reproduction because your API is private, I'll likely be telling you that this is the simplest way to implement the `queryFn` - no data fetching at all:

* * *

All we are doing is - return a resolved Promise. Of course, React Query goes very well _with_ data fetching libraries like axios, fetch or graphql-request because they all produce Promises.

Once we understand that React Query doesn't fetch data, it hopefully becomes clear that a whole class of questions around data fetching just disappear. Questions like:

* * *

All questions around data fetching usually have the same answer:

-   How can I define a baseURL with React Query ?
-   How can I access response headers with React Query?
-   How can I make graphQL requests with React Query?

* * *

React Query doesn't care! Just somehow return a Promise, please.

Right, once we've got that, it's only fair to ask:

* * *

If React Query is no data fetching library, what is it? My answer to this question has always been:

* * *

An Async State Manager. Now it's important to understand what we mean by "Async State”.

* * *

The gist of it is that we have, for the longest time, sliced our state into _where_ we need it to live. Do we only need it in one component? We'll probably start out by using local state. Do we need it available higher up the tree?

* * *

Then we move it up and potentially pass data down again as props. Do we need it even higher, or on a much broader scale?

* * *

We'd likely move it to a "global state manager" like redux or zustand, which lives outside of React and then distributes it globally to our application.

* * *

And we've been doing this for all kinds of state - no matter if it's the toggle button we're clicking in our app or the list of issues or profile data we have to fetch over the network. We've treated them all exactly the same.

The shift in thinking comes when we split state differently - not_where_ it is used but by _what kind of state_ it is.

* * *

Because state we own completely and that is synchronously available (like, when I click that dark mode toggle button) has totally different needs than state that is persisted remotely and asynchronously available, like a list of issues.

* * *

With async state or "server state”, we only see a snapshot in time of when we fetched it. It can get out of date, because we are not the only owner of that state. The backend, probably our database owns it. We have just borrowed it to display that snapshot.

You might notice this when you leave a browser tab open for half an hour, and then come back to it. Wouldn't it be nice to automatically see fresh and accurate data? That means WE have to keep it up-to-date, because other users can make changes in the meantime as well. And because state is not synchronously available, meta-information around that state, like loading and error states, need to be managed as well.

* * *

So, keeping your data up-to-date automatically and managing async lifecycles isn't something you would get or need from a traditional, all-purpose state manager. But since we have a tool that is geared towards async state, we can make all that happen, and more. We just need to use the right tool for the right job.

* * *

The second part we need to understand is what a "state manager" is, and why React Query is one. What state managers usually do is making your state available in your app efficiently. The important part here is _efficiently_, put another way, I would frame it as:

* * *

We want updates please, but not too many.

If too many updates weren't a problem, we'd all just stick our state in React Context. But it is a real problem, and a lot of libraries try to solve this in various ways, some more magically than others. Redux and zustand - two popular state management solutions - both offer a selector based api:

* * *

Those make sure that our components are only subscribed to parts of the state they are interested in. If other parts of the store update, those components don't care. And the principle is that we can call those hooks anywhere in our App to get access to that state, because the libraries make it globally available.

* * *

And with React Query, it's really not that different. Except that the part or slice you're subscribing to is defined by the QueryKey

Now wherever we call our `useIssues()` custom hook, we'll get updates if something changed in the `issues` slice of the Query Cache. And if that isn't enough, we can take this a step further, because ReactQuery has selectors as well:

* * *

Now we're talking "fine-grained" subscriptions, where components are only interested in computed or derived results of what is stored. If we toggle one issue from "opened" to "closed", the component that uses the `useIssueCount` hook won't re-render because the length hasn't changed.

And just like with other state managers, we can (and very likely should) call `useQuery` wherever we need to, to get access to that data.

* * *

This makes all solutions that try certain things like calling`useEffect` to sync data from React Query somewhere else or setting data into local state in the (already deprecated) `onSuccess` callback anti-patterns.

All of these are forms of state syncing that take away the single source of truth, and are unnecessary because React Query is already a state manager, so we don't need to put that state into another one.

* * *

Okay okay you might be thinking, now I'm doing this, and I'm calling useQuery wherever I want to / need to. 3 components, 3x `useIssues()`. But if some of our components are rendered conditionally, like when opening a Dialog or because we have dependent queries, we might start to see a lot of fetches to the same endpoint.

* * *

You might be thinking: ugh, I just fetched this like 2 seconds ago, why is it already fetching again?? So you turn to the docs...

* * *

and start to turn off everything, everywhere, all at once, just to not spam your backend that much. Maybe we should've put our data in redux after all...

Bear with me for a second, because there is some logic to this madness. Why is React Query making all those requests?

* * *

It brings us back all the way to the needs of async state: It can be outdated, so we want to update it at some point in time, and React Query does this by certain triggers: window focus, component mount, regaining network connection and QueryKey change.

Whenever one of these events occurs, React Query will refetch that query automatically.

But that's not the whole story. The thing is: React Query will not do this for all Queries - only for Queries that are considered`stale`. And this brings us to the second important takeaway of the day:

* * *

`staleTime` is your best friend

* * *

React Query is also a data synchronization tool, but that doesn't mean it'll blindly refetch all queries in the background. This behaviour can be adjusted by `staleTime`, which defines "the time until data goes stale". The opposite of `stale` is `fresh`, so put another way, as long as data is considered `fresh`, it will be given to us from the cache only, without a refetch. Otherwise, we'll get cached data AND a refetch.

* * *

So only stale queries will be updated automatically, but the thing is: staleTime defaults to zero

Yep, zero as in zero milliseconds, so React Query marks everything as stale instantly. That's certainly aggressive and can lead to overfetching, but instead of erroring on the side of minimizing network requests, React Query errors on the side of keeping things up-to-date.

* * *

Now defining `staleTime` is up to you - it highly depends on your resource and your needs. There is also no "correct" value for `staleTime`.

If you are querying config settings that will only change when the server restarts, `staleTime: Infinity` can be a good choice.

On the other hand, if you have a highly collaborative tool where multiple users update things at the same time, you might be happy with `staleTime: 0`.

* * *

So a very important part of working with React Query evolves around defining `staleTime`. Again, there is no correct value, what I like to do is set a default globally and then potentially overwrite it when needed.

* * *

Okay, let's quickly go back to the needs of async state one more time. We know that React Query keeps our cache up-to-date if data is considered stale and one of those events occur.

The one event that is probably the most important of all and that I want to focus on is the QueryKey change event.

When would that event mostly occur? Well, that brings us to the last point:

* * *

We should treat parameters as dependencies.

I really want to emphasize on this, even though it's already outlined in the docs and I have written [a separate blogpost](https://tkdodo.eu/blog/practical-react-query#treat-the-query-key-like-a-dependency-array) about it.

* * *

If you have parameters, like the filters in this example, that you want to use inside your `queryFn` to make a request, you have to add them to the `queryKey`.

* * *

This ensures a lot of things that make React Query great to work with: For one, it makes sure that entries are cached separately depending on their input, so if we have different filters, we store them under different keys in the cache, which avoids race conditions.

It also enables automatic refetches when `filters` changes, because we go from one cache entry to the other. And it avoids problems with stale closures, which are usually pretty hard to debug.

* * *

It's so important that we've released our own eslint plugin. It can check if you’re using something inside the `queryFn` and tells you to add it to the key. It's also auto fixable, and I can highly recommend using it.

* * *

If you want, you can think about the `queryKey` like the dependency Array for `useEffect`, but without the drawbacks, because we don't have to think about referential stability.

There's no need for `useMemo` or `useCallback` to get involved here - not for the`queryFn` and not for the `queryKey`.

* * *

Now lastly, this might introduce a new problem: We're now using`useQuery` wherever we need to, at any level in our App, but now we have dependencies to our Query that only exists in a certain part of the screen: What if I don't have access to `filters`when I want to call `useIssues` ? Where is it coming from?

* * *

The answer, again, is: React Query doesn't care. It's a pure_client state management_ problem. Because that applied filter is_client state_. And how you manage that is up to you.

It's still totally fine to use local state or global state managers for that as you see fit. Storing `filters` in the url is often a good idea, too.

As an example, let's take a look at how this could look if we've put the filters into a state manager like `zustand`:

* * *

The only thing we’ve changed is, instead of passing `filters` as input to our custom hook, we are getting it from the store directly. This shows the power of composition when writing custom hooks.

And we can see the clear separation between server state, managed by `useQuery`, and client state, in this case, managed by `useStore`. Every time we update `filters` in the store - no matter where - the query will automatically run or read the latest data from the cache if available.

This pattern will enable us to use React Query as a true async state manager.

* * *

In summary:

1.  React Query is NOT a data fetching library - it’s an async state manager.
2.  `staleTime` is your best friend - but you have to set it up to your needs.
3.  Treat parameters as dependencies, and use our lint rule to enforce this.

If we change our thinking to follow these three points, we’ll have an even better time working with React Query, much like a small tweak to how we tie our shoes can be a great quality of life improvement.

* * *

Now I still owe you the solution to tying your shoes correctly.

It's really quite simple. When creating the loop, make sure to pull the shoelace toward yourself first, then pull it through the gap.

* * *

This small difference will result in a knot that will stay horizontal and won't come loose as easily.

There is also [a youtube video](https://www.youtube.com/watch?v=JeXAe4qv22s) if you wanna go watch that.

* * *

So, that's all I got, thanks for listening. Be sure to follow me on [bluesky](https://bsky.app/profile/tkdodo.eu), and subscribe to my [blog](https://tkdodo.eu/). React Query v5 is just around the corner and that is a good way to keep up-to-date. Thanks!

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)