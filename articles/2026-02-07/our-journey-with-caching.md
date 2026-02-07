---
title: "Our Journey with Caching"
source: "https://nextjs.org/blog/our-journey-with-caching"
publishedDate: "2024-10-24"
category: "frontend"
feedName: "Next.js Blog"
author: "Sebastian Markbåge"
---

Frontend performance can be hard to get right. Even in highly optimized apps, the most common culprit by far is client-server waterfalls. When introducing Next.js App Router, we knew we wanted to solve this issue. To do that, we needed to move client-server REST fetches to the server using React Server Components in a single roundtrip. This meant the server had to sometimes be dynamic, sacrificing the great initial loading performance of Jamstack. We built partial prerendering to solve this tradeoff and have the best of both worlds.

However, along the way, the developer experience suffered due to the caching defaults and controls we provided. The default for `fetch()` changed to favor performance by caching by default, but quick prototyping and highly dynamic apps suffered. We didn't provide enough control over local database access that wasn't using `fetch()`. We had `unstable_cache()`, but it wasn't ergonomic. This led to the need for segment-level configs, such as `export const dynamic, runtime, fetchCache, dynamicParams, revalidate = ...`, as an escape hatch.

We'll continue supporting that for backward compatibility, of course. But for a moment, I'd like you to forget about all that. We think we have an idea for something simpler.

We've been cooking on a new experimental mode that builds on just two concepts: `<Suspense>` and `use cache`.

## Choose your adventure[](#choose-your-adventure)

The first thing you'll notice is that when you add data to your components, you will now get an error.

To use data, cookies, headers, current time or random values, you now have a choice: do you want the data to be cached (server or client-side) or executed on every request? I'm using `fetch()` as an example, but this applies to any async Node API, such as databases or timers.

## Dynamic[](#dynamic)

If you're still iterating or building a highly dynamic dashboard, you can wrap the component in a `<Suspense>` boundary. `<Suspense>` opts into dynamic data fetching and streaming.

You can also do this in your root layout or use `loading.tsx`.

This ensures that the shell of your app remains instant. You can continue adding more data inside your Page, knowing it will all be dynamic by default. Nothing is cached by default. No more hidden caches.

## Static[](#static)

If you're building something static and don't want to use dynamic functionality, you can use the new `use cache` directive.

By marking the Page with `use cache`, you're indicating that the entire segment should be cached. This means any data you fetch can now be cached, allowing the page to be statically rendered. No `<Suspense>` boundary is used for static content. You can add more data to the page, and it will all be cached.

## Partial[](#partial)

You can also mix and match. For example, you can put `use cache` in your root layout to ensure it is cached. Each layout or page can be cached independently.

While using dynamic data within a specific Page:

## Cached functions[](#cached-functions)

When using a hybrid approach like this, it might be more convenient to add caching closer to the API calls.

You can add `use cache` to any async function, just like `use server`. Think of it as a Server Action but instead of calling a Server you're calling a Cache. It supports the same rich types of arguments and return values beyond just JSON. The cache key automatically includes any arguments and closures, so you don't need to specify a cache key manually.

Since no other data was used in this layout, it can remain static. A benefit of this approach is that if you accidentally add new dynamic data to the layout, it will trigger an error during the build, forcing you to make a new choice. If you add `use cache` to the entire layout, it will be cached with no error. Which approach you choose depends on your use case.

## Tagging a cache[](#tagging-a-cache)

If you want to explicitly clear a cache entry by tag, you can use the new `cacheTag()` API inside the `use cache` function.

Then, just call `revalidateTag('my-tag')` from a Server Action as before.

Since this API can be called after data loading, you can now use data to tag your cache entries.

## Defining the lifetime of a cache[](#defining-the-lifetime-of-a-cache)

If you want to control how long a particular entry or page should live in the cache, you can use the `cacheLife()` API:

By default, it accepts the following values:

-   `"seconds"`
-   `"minutes"`
-   `"hours"`
-   `"days"`
-   `"weeks"`
-   `"max"`

Choose a rough range that bests fits your use case. No need to specify an exact number and calculate how many seconds (or was it milliseconds?) are in a week. However, you can also specify specific values or configure your own named cache profiles.

In addition to `revalidate`, this API can control the `stale` time of the client cache as well as `expire`, which dictates when a Page should expire if it hasn't had much traffic for a while.

## Experimental[](#experimental)

This is still very much an experimental project. It's not production-ready yet and still has missing features and bugs. In particular, we know we need to improve the error stacks for this new type of error. However, if you're feeling adventurous, we'd love your early feedback.

We will publish a more detailed upgrade path. Aside from the early errors, the main breaking change here is undoing the default caching of `fetch()`. That said, we recommend experimenting only on greenfield projects at this early experimental stage. If it pans out well we hope to ship an opt-in version in a minor and make it the default in a future major.

To play with it, you must be on the `canary` version of Next.js:

You must also enable the experimental dynamicIO flag in `next.config.ts`:

Read more about [`use cache`](https://nextjs.org/docs/canary/app/api-reference/directives/use-cache), [`cacheLife`](https://nextjs.org/docs/canary/app/api-reference/next-config-js/cacheLife), and [`cacheTag`](https://nextjs.org/docs/canary/app/api-reference/functions/cacheTag) in our documentation.