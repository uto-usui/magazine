---
title: "Migrating Grep from Create React App to Next.js"
source: "https://vercel.com/blog/migrating-grep-from-create-react-app-to-next-js"
publishedDate: "2025-04-14"
category: "frontend"
feedName: "Vercel"
author: "Ethan Niser"
---

6 min read

Apr 14, 2025

[Grep](https://grep.app/) is extremely fast code search. You can search over a million repositories for specific code snippets, files, or paths. Search results need to appear instantly without loading spinners.

Originally built with Create React App (CRA) as a fully client-rendered Single-Page App (SPA), Grep was fast—but with [CRA now deprecated](https://react.dev/blog/2025/02/14/sunsetting-create-react-app), we wanted to update the codebase to make it even faster and easier to maintain going forward.

Here's how we migrated Grep to Next.js—keeping the interactivity of a SPA, but with the performance improvements from React Server Components.

## [Link to heading](#why-next.js-and-react-server-components)Why Next.js and React Server Components?

Traditional SPAs can navigate between pages quickly. However, this comes at the expense of a larger client-side JavaScript bundle needed to be fetched and parsed before the page is interactive.

We wanted the fastest possible initial page load, while also keeping quick navigations between subsequent pages. Next.js can prerender the majority of the page for predictable and fast initial loads. Then, it can intelligently prefetch other pages, keeping the quick navigation feel of a SPA.

Let's talk about how we migrated to Next.js, while also making the search input interactive faster and getting rid of unnecessary layout shift in the process.

## [Link to heading](#preserving-an-instant-search-experience)Preserving an instant search experience

Grep needs the fastest possible search. Start typing on the homepage, transition to `/search`, and keep typing—all without losing focus. Notice how in the video, the search moves from the center of the home page to the navbar on `/search`.

With a traditional SPA, the search state stays on the client and the UI remains intact. But when moving state to the server, we needed to keep the search input state consistent across page navigations.

### [Link to heading](#root-layout-and-repositioning)**Root layout and repositioning**

You could place the search bar in Next.js’ [root layout](https://nextjs.org/docs/app/getting-started/layouts-and-pages#creating-a-layout). This would prerender the search bar in one place and then you could quickly reposition it on the client after hydration.

layout.tsx

```
export default function RootLayout({ children }) {  return (    <>      <script dangerouslySetInnerHTML={{ __html: "..repositioning logic.." }} />      <SearchBar />      <main>{children}</main>    </>  );}
```

However, this will cause hydration mismatches and cause layout shift. Further, we need to synchronize the state to the URL through search params. Reading `searchParams` from the incoming request in the root layout will limit our ability to prerender the majority of the page.

### [Link to heading](#conditional-rendering-and-shared-state)**Conditional rendering and shared state**

Rather than repositioning the element, we could have two references to the search input and conditionally render them when needed.

1.  **Homepage (client-rendered)**: Center the search bar for a clean, Google-like experience
    
2.  **Header (server-rendered)**: Display the search bar for all routes except the homepage
    

This keeps the homepage minimal while ensuring the search bar instantly appears in the top nav when navigating away—no layout shifts, no flickers.

Here’s how it works. Our header contains the search bar, but only for the `/search` route.

components/header.tsx

```
"use client";export function Header() {  const pathname = usePathname();  return (    <header>      <Logo />      {pathname !== '/' && <SearchBar />}      <ThemeToggle />    </header>  );}
```

The header is rendered in the root layout, keeping it server-rendered across pages:

layout.tsx

```
import { Header } from '@/components/header';export default function RootLayout({ children }) {  return (    <html>      <body>        <Header />        {children}      </body>    </html>  );}
```

Meanwhile, the homepage renders its own version of the `SearchBar` component:

page.tsx

```
export function Homepage() {  return (    <div className="search-centered">      <SearchBar />    </div>  );}
```

This allows the user to start typing on the home page and not lose focus on the input (even though the position shifts) when transitioning to the next page.

### [Link to heading](#keeping-the-search-state-in-sync)**Keeping the search state in sync**

If we're rendering two search inputs, we need to keep their state in sync. The key is URL-based state combined with lightweight shared state management.

1.  **Homepage**: `<SearchBar>` updates query string, navigating to `/search?q=...`
    
2.  **Navbar**: `<SearchBar>` reads from URL query parameters, synchronizing on mount
    

To provide more responsive local feedback, especially during rapid typing, we also manage local input state through React Context and hooks.

## [Link to heading](#server-first,-client-second-data-fetching)Server-first, client-second data fetching

Now, we need to instantly display the search results. The challenge is the handoff between the server and client. Going back to the server for every keystroke could be slow, and doing all data fetching on the client means a slower initial loading experience.

Luckily, there's great solutions in the React community for data fetching like [SWR](https://swr.vercel.app/) and [TanStack Query](https://tanstack.com/query/latest). These abstractions allow you to prefetch data on the server and then hydrate the client-side cache.

### [Link to heading](#server-side-initial-fetch-and-hydration)**Server-side initial fetch and hydration**

When you first visit the search results page (e.g., `/search?q=react`), the server starts fetching data immediately—without blocking. HTML begins streaming to the client while the query is still in-flight.

This is possible because React Server Components can serialize Promises and pass them through a `HydrationBoundary`, allowing TanStack Query to resume the query on the client without redundant fetches.

search/page.tsx

```
import { /* ... */} from "@tanstack/react-query";import { ResultsClient } from "@/components/results";import { apiSearch } from "@/lib/api";import { getFiltersFromRawSearchParams } from "@/lib/utils";const queryClient = new QueryClient({  defaultOptions: {    dehydrate: {      // Include pending queries so the client can pick them up      shouldDehydrateQuery: (query) =>         defaultShouldDehydrateQuery(query) || query.state.status === 'pending'    }  }});const searchOptions = (filters) => ({  queryKey: ["search", filters],  queryFn: () => apiSearch(filters),});export default function SearchPage({ searchParams }) {  const filters = getFiltersFromRawSearchParams(searchParams);  // Kick off the query on the server without 'await'  queryClient.prefetchQuery(searchOptions(filters));  return (    // Pass promise to client    <HydrationBoundary state={dehydrate(queryClient)}>      <ResultsClient />    </HydrationBoundary>  );}
```

On the client, `useSuspenseQuery` hydrates from the server-initiated request, resolving as the data streams in. Once this initial data from the server is loaded, all further searches happen on the client to avoid unnecessary server round trips.

components/results.tsx

```
"use client";import { useSuspenseQuery } from "@tanstack/react-query";import { searchOptions } from "@/lib/queries";export function ResultsClient() {  const filters = useFilters(); // client-side filter + input state  const { data } = useSuspenseQuery(searchOptions(filters));  return <Hits data={data} />;}
```

### [Link to heading](#incremental-client-side-fetching-with-tanstack-query)**Incremental client-side fetching with TanStack Query**

After the initial server-side load, subsequent fetches—triggered by typing, filtering, or pagination—happen client-side with TanStack Query’s `useSuspenseQuery`. To avoid excessive requests, we debounce input changes using React’s `useDeferredValue`:

components/results.tsx

```
'use client';import { useSuspenseQuery } from '@tanstack/react-query';import { useDeferredValue, Suspense } from 'react';import { searchQueryOptions } from '@/lib/queries';import { useNonOptimisticFilters } from '@/hooks/filters';import { Hits } from '@/components/hits';function ResultsInner({ filters }) {  const { data } = useSuspenseQuery(searchQueryOptions(filters));  return <Hits data={data} />;}export function ResultsClient() {  const filters = useNonOptimisticFilters();  const deferredFilters = useDeferredValue(filters);  return (    <Suspense fallback={<ResultsSkeleton />}>      <ResultsInner filters={deferredFilters} />    </Suspense>  );}
```

This ensures new results load smoothly while preventing unnecessary network calls during input changes.

### [Link to heading](#preventing-stale-or-out-of-order-results)**Preventing stale or out-of-order results**

Rapid typing introduced another challenge: older network responses sometimes arrive after newer ones, briefly displaying outdated results. For example, typing `"foo"`, then deleting back to `"f"`, could cause `"foo"` results to reappear after `"f"` was already rendered.

To prevent this, we combined two key strategies:

1.  **Optimistic UI updates with** `**useOptimistic**`**:** React’s `useOptimistic` hook handles optimistic state across async updates, ensuring that the UI always reflects the latest user input—regardless of network latency
    
2.  **Query caching with TanStack Query keys:** Using unique cache keys (`["search", filters]`), TanStack Query ensures only the latest request updates the UI, discarding stale responses
    

Here’s how we implemented `useOptimistic` alongside React’s `useTransition` for instant, reliable feedback:

hooks/filters.ts

```
"use client";import { useRouter, usePathname, useSearchParams } from "next/navigation";import { useOptimistic, useTransition } from "react";export function useFilters() {  const currentFilters = /* ... */;  const [optimisticFilters, setOptimisticFilters] = useOptimistic(    currentFilters,    (_, updatedFilters) => updatedFilters  );  const [isPending, startTransition] = useTransition();  const updateFilters = (updateFn) => {    const newFilters = updateFn(currentFilters);    setOptimisticFilters(newFilters);    // ...    startTransition(() => {       router.replace("/search?" + params.toString());    });  };  return { filters: optimisticFilters, updateFilters, isPending };}
```

This eliminated stale or flickering search results during rapid input changes.

### [Link to heading](#prefetching-dynamic-search-routes)**Prefetching dynamic search routes**

One last optimization was necessary for instantaneous page transitions. Next.js automatically prefetches static routes, but not dynamic ones like `/search?q=react`. To make search results feel instant, we explicitly prefetch the shared layout:

components/prefetch-search-layout.tsx

```
"use client";import { useEffect } from "react";import { useRouter } from "next/navigation";export function PrefetchSearchLayout() {  const router = useRouter();  useEffect(() => {    router.prefetch("/search?q=");  }, [router]);  return null;}
```

This component is rendered alongside the search bar on the homepage. As users start typing and navigate to `/search`, the layout is already cached—making the transition feel instant, even before the query results resolve.

## [Link to heading](#solving-mobile-specific-challenges)Solving mobile-specific challenges

There was one layout challenge left with mobile Safari. Focusing the search input caused unpredictable scroll and zoom behaviors, breaking the layout. To stabilize the input, we introduced a `usePreventScroll` hook:

usePreventScroll.tsx

```
"use client";import { useEffect } from "react";export function usePreventScroll(isFocused: boolean) {  useEffect(() => {    document.body.style.overflow = isFocused ? "hidden" : "";  }, [isFocused]);}
```

By adding this hook to the home page client component, it locks the page overflow, preventing layout jumps and keeping the search experience stable on mobile.

## [Link to heading](#additional-performance-gains-with-partial-prerendering)Additional performance gains with Partial Prerendering

To push Grep’s performance further, we enabled Next.js’s new experimental [Partial Prerendering](https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model) (PPR). PPR blends static prerendering with dynamic streaming, delivering fast initial loads without refactoring.

Before PPR, search bar interactivity was briefly delayed by client-side hydration. With PPR enabled, the search experience became nearly instantaneous:

-   **Static shell:** Core UI loads instantly, providing immediate visual feedback
    
-   **Dynamic streaming:** Search results stream in milliseconds later, keeping the page interactive without delay
    

By enabling PPR, we combined static prerendering with dynamic streaming—with no additional code changes. The first-load experience became instant, with search interactivity arriving only milliseconds later. No refactoring. No tradeoffs. Just faster page loads with a single flag.

## [Link to heading](#final-results-and-what’s-next-for-grep)Final results and what’s next for Grep

Migrating to Next.js transformed Grep into a fast, search-as-you-type experience—reducing client-side execution while maintaining SPA-level responsiveness.

-   **Instant, persistent input**: The search bar remains focused across pages with no flickers or layout shifts
    
-   **Optimized data fetching**: Server-side prefetching and incremental client-side updates ensure fast, real-time search
    
-   **Improved performance:** Fewer blocking scripts and targeted hydration reduce bundle sizes and speed up rendering
    
-   **Enhanced experience:** While we were at it, we shipped dark mode and expanded our search index from 500,000 to 1,000,000 GitHub repos
    

We also achieved measurable performance gains by enabling PPR, leading to faster initial loads by combining static UI with streamed dynamic content. Combined with broader improvements from migrating to Next.js, the result was a faster, more stable experience—especially on mobile.

Metric

CRA (Mobile)

Next.js (Mobile)

Results

First Contentful Paint (FCP)

3.0 seconds

0.9 seconds

70% faster

Largest Contentful Paint (LCP)

3.7 seconds

3.2 seconds

13.51% faster

Speed Index

4.7 seconds

2.9 seconds

38.3% faster

Network Request Finish

1.49 seconds

0.4 seconds

73.15% faster

The results show good improvement due to smarter, more flexible rendering strategies and the ability to fetch data on the server. With this new, stable foundation established, we’re already exploring further improvements:

-   **Private repository indexing**: Secure authentication for private code search, using serverless functions and Edge Middleware for security
    
-   **Advanced query syntax**: Support for GitHub-style filters like `repo:vercel/next.js` or `language:typescript`
    

The move to Next.js wasn’t just about performance—it was about setting Grep up for the future. Faster queries, smoother interactions, and a stronger foundation for what’s next.

[Try Grep](http://grep.app/) for yourself.