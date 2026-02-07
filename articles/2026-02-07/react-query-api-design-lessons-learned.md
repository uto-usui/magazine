---
title: "React Query API Design - Lessons Learned"
source: "https://tkdodo.eu/blog/react-query-api-design-lessons-learned"
publishedDate: "2024-10-25"
category: "frontend"
feedName: "TkDodo"
---

25.10.2024 — [ReactJs](https://tkdodo.eu/blog/tags/react-js), [React Query](https://tkdodo.eu/blog/tags/react-query), [Talk](https://tkdodo.eu/blog/tags/talk), [TypeScript](https://tkdodo.eu/blog/tags/type-script), [API Design](https://tkdodo.eu/blog/tags/api-design) — 1 min read

![Times gone by a Back to School scene from the 20th Century. Blackboard and chalk.](https://tkdodo.eu/blog/static/1ebc314ad52f42d673f51e3dfbbbe426/bbe0c/lessons-learned.jpg "Times gone by a Back to School scene from the 20th Century. Blackboard and chalk.")

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
-   **#27: React Query API Design - Lessons Learned**
-   [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/react-query-the-bad-parts)
-   [#29: Concurrent Optimistic Updates in React Query](https://tkdodo.eu/blog/concurrent-optimistic-updates-in-react-query)
-   [#30: React Query Selectors, Supercharged](https://tkdodo.eu/blog/react-query-selectors-supercharged)

-   [한국어](https://velog.io/@willy4202/%EB%B2%88%EC%97%AD-React-Query-API-%EB%94%94%EC%9E%90%EC%9D%B8-%EA%B7%B8-%EA%B5%90%ED%9B%88)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Here are the slides + transcript from the talk I recently gave at the [React Advanced](https://reactadvanced.com/) conference in London. You can swipe left or right or use the arrow buttons / arrow keys to switch between the slides. You can also find the recording on [the GitNation site](https://gitnation.com/contents/react-query-api-design-lessons-learned). Enjoy!

  

* * *

Hello everyone 👋 I'm super excited to be here today, because this is the first time that I'm giving a live talk at an in-person conference, and I'm very happy that it's happening at React Advanced in London today.

* * *

My name is Dominik, and I'm a Software Engineer from Vienna, where I work as a frontend tech lead at Adverity. You can find me as TkDodo online almost everywhere, and for the last three and a half years,

* * *

I have maintained a quite popular open source React Library React Query

* * *

sorry, TanStack React Query as we call it these days.

Quick question, raise your hands - who of you has heard about react query? Who has worked with it?

That's great - it means you might know some of the APIs I'm gonna talk about, because today, I want to...

* * *

... walk you through some of the API design choices that we made in React Query, tell some stories about things that went well, but also highlight tradeoffs and mistakes that we made, and what lessons we can all learn from those. And I want to talk about that, mainly for two reasons:

* * *

1\. API Design is hard.

* * *

If you don't believe me, Julius said it. Very smart guy, he maintains tRPC, also contributes to React Query. If he says it, it's probably right.

* * *

and 2. I think React Query has a really really sweet API, which I think is part of why React Query has become so successful in the last couple of years.

Now of course I can't take credit for that - Tanner Linsley made the library and designed most APIs, and he has a very good tweet summarizing the goal:

* * *

@Tan\_Stack Query's API is actually medium sized when you unpack it all, but the most important part is that you can understand and learn how to use it by starting with a single function that provides 80% of the entire value proposition first try. From there, the rest of its API can be gradually learned if needed.

And I think that's what it takes for a library to become popular -

* * *

It needs to be both minimal and intuitive as well as powerful and flexible. Now for any given API...

* * *

... those two things are usually at the opposite side of the same scale.

* * *

Take `Array.join` for example: very good example for a minimal API that does one thing very well, no surprises, super intuitive.

* * *

On the other side of the spectrum, I'd see`Array.reduce`, which is very powerful (you can implement all array functions with reduce) and flexible, but can be hard to understand and if that's the only API we have available, we'd also not be happy.

* * *

So the missing part is the second scale, which is usually "app complexity". As app complexity grows, your APIs should likely become more powerful & flexible.

* * *

So on that scale, `useQuery` would be right about here (bottom left) if you pass the minimal required options to it:

* * *

Simple API, easy to use, but it gives you a ton of things:

* * *

Caching, Request Deduplication, stale-while-revalidate background updates, global state management, automatic garbage collection, handling loading states, error states + retries, the list goes on...

* * *

Then you might add a useMutation for performing updates and tying them to queries with query invalidation; that's already a bit more code, but you can really get very far with just those two (useQuery and useMutation).

And as your app complexity grows,

* * *

...so does the flexibility of the Query APIs that you are using. You might want to add an optimistic update, or an infinite query - those are certainly a bit more involved.

* * *

And all the way on the right side of the scale, we have our Persister Plugins and fine-grained direct cache subscriptions (which we e.g. use to build the devtools). Now you don't need to learn those when you're starting out, but once you reach a certain app complexity, you are probably happy that those exist.

Okay, so we got to this API that evolves with you ...

* * *

...through careful planning, lots of iteration and a couple of major versions. So that gets me right to my first learning I had as an open source maintainer

* * *

I'm no longer excited about major versions (and probably neither should you).

* * *

I think API design is especially hard in open source because whatever we decide - we can't easily revert it.

* * *

At adverity, we used to distribute our design-system via a private npm registry. Now we have a monorepo so we don't need to anymore, but we adhered to semantic versioning, and do you know what the latest version of that was?

* * *

`105.2.0`

Nobody cared. It's just numbers going up. Most projects would just update, see that the "major change" was either affecting a component they weren't using at all, or was a tiny change, fixed it an moved on. It just wasn't a big deal.

But in open source, we cannot do breaking changes lightly,

* * *

it has to be a marketing event really. We need announcement tweets and videos and blogposts and everything

Users hear about a new "major" version. Major sounds "huge", and "good", so the immediate question is always:

* * *

What are the new features?

The problem is: major versions are not about features. They are about breaking existing APIs. Features mostly go in minors.

* * *

Remember hooks? They came in 16.8. React Router added route loaders in 6.4, and bun added windows support in 1.1

That's because adding features rarely needs to break an existing API. Of course there are exceptions, e.g. when you re-design something from the ground up that enables some new features. But usually, features come in minors.

* * *

So when I got asked about the new features in React Query v5, I started to sweat. We basically wanted to break a lot of APIs and rename things, and there weren't any features planned.

So we added some things that honestly, we could've also backported to v4. This is by no means great because we're withholding features from users just to have some kind of "marketing event" and "great new version".

* * *

If it were up to me, I'd want a better system. Something where we decouple "breaking changes" from "marketing events". Anthony Fu had a great suggestion:

* * *

to do 4-digit semver, so you can have an epoch number before major that you can use for big overhauls or for marketing. I think it's a nice idea. I doubt it will happen though - just something to think about.

And maybe, when a new version comes out - don't think about what's new - ask what's breaking instead.

* * *

Okay, So I'm no longer excited about major versions, but what I am still excited about, even more than before I started with open source, is TYPESCRIPT.

* * *

Don't worry - we're not gonna go into library level typescript today, but if you're building something, I think it helps tremendously to think about types from the beginning and

* * *

design your APIs with types in mind.

Now there are lots of people who say that you should "just make it work" first and you can figure out the types later. I think they're wrong. When working with JavaScript, we can come up with all sorts of cute and dynamic constructs that work at runtime, but are very hard to type.

* * *

Sure, almost everything is doable with enough magic, but usually, the price for that is type complexity and maintenance burden.

Not sure who said it, but this phrase stuck with me:

* * *

If something is hard for a compiler to figure out, it's also hard for humans to understand. So if we are having troubles expressing what we want to the compiler, maybe the API we've chosen isn't the best.

One of the "cute and dynamic" constructs we had in React Query from when it started out (where it had no types), was was actually `useQuery`, because you could call it 3 different ways:

* * *

with different positional arguments. There's no good way to make this work in TypeScript except with overloads, which is what we did. Overloads are problematic because they are a lot of overhead and error messages aren't good.

* * *

TypeScript will try all overloads and then show an error for the last one it tried, which might be completely misleading. Also, we had to do some runtime checks to transform different version into the same structure. And really, who needs three ways to achieve the same thing?

* * *

So since v5, you can only call useQuery with the options syntax. With that, we reduced lines of types on useQuery by 80% - from 125 to just 25 lines of types.

Had we started with types in mind from the beginning, I think this is where we would've landed right away. Okay enough about TypeScript already, there's one thing that always comes up once a library reaches a certain threshold of usage:

* * *

Users want more features!

And to be honest, managing a demanding user base is one of the more tricky things in open source. On the one hand, if you want to gain adoption, you need to listen to user feedback and meet their expectations, help them fix their problems etc. On the other hand, the more you add to your library the more bloated the API becomes, adding complexity and thus reducing adoption again. We have to balance this somehow.

* * *

My advice here would be to just take your time before adding anything. Users can be very demanding, and in that relationship between user and maintainer, it's their job to tell you all about their use-case and how important it is for them and their deadlines

But it's the maintainer's job to have the bigger picture in mind. Will this work for everybody? What about cases that the original requester hasn't considered because they don't even know about them… Remember: once an API is added, we can't change it without a new major release.

* * *

An example where I got this wrong was the refetchPage API for infinite queries. For context, infinite queries are our way to make building doom-scrolling pages simple - sorry about that. But technically, an infinite query is just one cache entry that is chunked up into multiple pages, where each page is built upon the previous one.

Now quite a lot of people complained that whenever a refetch occurs, React Query would refetch all pages that are currently in the cache and wanted a way to only refetch a single page, e.g. after updating a specific entry on that page.

* * *

This sounded reasonable at first, so we added a new field to some existing APIs like invalidateQueries.

Now, instead of refetching all pages, you could return false to have a specific page not refetch. That API was a mistake for a couple of reasons:

* * *

The API is weird and confusing. refetchPage now exists on invalidateQueries, but invalidateQueries doesn't know about the type of a query. If there is a match for tasks that is a non-infinite query, the param does nothing.

We only added this API to imperative methods because of technical constraints. If an automatic refetch occurs that was triggered by React Query, you would still refetch all pages.

Correctness is the main reason why we invalidate all pages per default. Each page builds upon the next like a linked-list. If you only refetch a page in the middle and one entry was deleted by someone else in the meantime, your UI can get weirdly out of sync.

* * *

So we took a step back and asked people that used it what their main motivation was, and it was always the same: If the user scrolls down a lot, and I have 100 pages in the cache, I don't want to spam my server. That's fair, so we tried to find an API that solves that problem instead. Eventually,

* * *

we settled on a new option on useInfiniteQuery - maxPages, which simply allows you to limit how many pages you have in your cache.

This API is a lot better because it solves the problem holistically (from a different point of view), for all kinds of refetches, and also speeds up rendering when you navigate to a page that has cached entries. We shipped in v5 and removed refetchPages completely.

My takeaway here is that I landed on a suboptimal API decision too quickly, and had I given myself more time to really understand the problem we're trying to solve, I could've come up with something better.

* * *

The only alternative really is to ship new APIs with an unstable or experimental name, which can work but might lead to users not really wanting to use it. We did this for some APIs, and these are the messages I get, so I'm not sure if that's really better.

* * *

Another API that also gets requested often is to be able to debounce API calls. You would want that for example when having a search field and you want to auto-filter.

* * *

Unless you want to fetch on every keystroke, you likely want some way of debouncing that. This is a very good example for a feature that will not make it into React Query because it's not its responsibility. There are a lot of ways to do debouncing in different ways, and it likely needs more than just a number as an option. This can get complicated fast, and also adds more bundle size.

The good news is that you can relatively easily implement this in user-land

* * *

You can use your favourite `useDebounce` implementation, write one yourself,

* * *

or just `useDeferredValue` from React. The way this works is that filter will contain the current user input to display, and debouncedFilter has the debounced value that you pass to React Query.

* * *

This "Inversion of Control" is a great way to give users the flexibility to implement features on their own and still keep a small API surface.

Now the QueryKey is quite special here, but we can get inversion of control on other options as well by simply making them a function.

* * *

On example is a discussion I had with a user who felt that refetches on window focus, which are turned on by default via refetchOnWindowFocus: true aren't great when the Query is in error state, which I agree might not be what you want. But to add a separate option just for that case is not a great API. So instead, what we did was make it accept a callback function:

* * *

The function always gets the query passed, and you can derive from that what you want. That makes it very easy to implement that and similar feature in user-land. So by now, we've made almost all options accept callback functions. It's a cheap trick to allow users to implement certain behaviours for different states of the Query.

Okay lastly, even if we keep all these points in mind, no matter how well we try to design an API, some people will be unhappy with it.

* * *

And they will usually be the loudest. And open source maintainers are not immune to making errors, so chances are that eventually, we'll release an API that isn't well received. I learned that lesson the hard way in v4 of React Query, where we made some changes to our primary states.

* * *

Let's take that search example from before again and see what happens if we handle loading and error states in v4 with the derived boolean flags isLoading and isError.

* * *

This worked fine in v3, but in v4, it would just render a spinner for all eternity.

* * *

That's because queries that start in a disabled state are also in "isLoading" state. Now there are of course reasons for this, and it didn't sound as bad when I thought about it, but objectively, when you zoom out a bit and have no knowledge about React Query and you see this code and how it behaves - it's a very bad API. Absolutely horrible, no excuses. Turns out, a lot of people felt that way:

* * *

And I agree - that's messed up. Btw, that counter is still going up even though we've since fixed this in v5. But we got those reports right AFTER we had released the v4 major version. That feedback would've been very good a couple of days earlier.

What stuck with me is the user expectation that maintainers get everything right in their APIs while at the same time, the willingness to try out beta versions and report feedback is limited.

So if there's one thing that you take away from this talk, I want it to be this:

* * *

Please help out maintainers of open source libraries you are using by trying out a beta version and report feedback. I guarantee you it's the best time to be heard.

Without that early feedback, mistakes might make it into the "stable" release. But "stable" doesn't mean bug-free or battle-tested - it just means we can't change our APIs anymore - it's now set in stone.

Open source is a two-way street, and this is one of the best ways to help while also getting the most in return.

* * *

That's all I got, thank you 🙏

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)