---
title: "Simplifying runtime caching on Vercel"
source: "https://vercel.com/blog/simplifying-runtime-caching-on-vercel"
publishedDate: "2026-10-30"
category: "frontend"
feedName: "Vercel"
author: "Yvonne Zhou"
---

Today, we’re bringing Data Cache into Runtime Cache, giving developers one product for data caching across frameworks and APIs. If you use Next.js `fetch` caching or `unstable_cache`, you won’t need to change your code. Pro and Enterprise projects will get larger storage allocations.

Runtime Cache lets your code reuse fetched or computed data across requests without operating a separate caching service. Over the past year, we’ve improved read performance during traffic bursts, increased storage budgets, and made cache usage easier to investigate.

## [Copy link to heading](#why-we-built-runtime-cache)Why we built Runtime Cache

Data Cache was originally launched as Vercel’s data caching service for the Next.js App Router, used by `fetch` caching and `unstable_cache`. Unlike [CDN caching](https://vercel.com/docs/caching/cdn-cache), which stores complete HTTP responses, Data Cache stores data your application uses to generate those responses. A product page, for example, can reuse cached catalog data while rendering a personalized response for each visitor.

We wanted developers to have access to that service without depending on Next.js. Last year, we [introduced Runtime Cache](https://vercel.com/changelog/introducing-the-runtime-cache-api) with a direct API: `getCache` from `@vercel/functions`. Applications can use it for feature flag lookups in Routing Middleware, caching CMS content during builds, and data caching in SvelteKit and Nuxt apps.

Frameworks can expose this service through their own APIs, too. On Vercel, Next.js itself uses the Runtime Cache API for `'use cache: remote'`, which caches function and component outputs.

## [Copy link to heading](#how-runtime-cache-works)How Runtime Cache works

The infrastructure behind Runtime Cache is a distributed caching service shared by many teams. A Go API handles requests, backed by Redis fleets in every Vercel region. Every hour, the service handles more than 440 million reads and moves more than 18 TB of data.

Each region has its own cache. A cache hit takes one round trip to the cache service in the region where your code runs. Vercel handles authentication with short-lived credentials, so you don’t need to manage API keys.

On a cache miss, your app or framework fetches or computes the value and writes it to that region’s cache. The service doesn’t check other regions for a cached copy.

Each cached entry stores its tags and write time. When the service reads an entry, it checks a separate tag store in the same region for those tags’ invalidation timestamps. If any tag was invalidated after the entry was written, the entry is stale.

For example, an application can tag all its cached product data with `catalog`. When the catalog changes, invalidating that tag writes a single timestamp, even if a million entries share the tag. The service doesn’t need to find and delete those entries individually.

The invalidation immediately updates the tag store in the region receiving the request. Vercel’s shared tag infrastructure, also used by the [CDN](https://vercel.com/docs/cdn), distributes the timestamp through the global push pipeline, typically reaching other regions within a few hundred milliseconds.

Your app or framework chooses what to cache and handles misses. Runtime Cache handles regional storage, authentication, and distributing tag invalidations across regions.

## [Copy link to heading](#what-we’ve-shipped)What we’ve shipped

#### [Copy link to heading](#faster-reads-during-traffic-bursts)Faster reads during traffic bursts

Checking whether an entry is still fresh adds a dependency to every cache hit. During traffic bursts, a slow shard in the tag store could delay reads even when the cached value was already available.

We added circuit breakers that let reads temporarily check freshness using tag timestamps cached in memory, so they can proceed without waiting for the slow shard to respond. During this fallback, a read can briefly treat recently invalidated data as fresh.

We enabled the breakers in every region in August. During the heaviest bursts in our largest region, p99 cache-service read latency fell to about one fifth of its previous level at comparable traffic. On-call alerts for this failure mode stopped.

#### [Copy link to heading](#more-storage-and-fewer-evictions)More storage and fewer evictions

We raised Runtime Cache storage budgets for Pro projects in June and Enterprise projects in October, giving applications more room for data they reuse. This reduces the need to evict cached entries to make room for new data. Among Enterprise projects with frequent evictions, cache miss rates roughly halved within a day.

#### [Copy link to heading](#more-visibility-into-cache-behavior)More visibility into cache behavior

We’ve added deployment markers, revalidation causes, and write utilization to the Runtime Cache view in [Observability](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fruntime-cache%3Ftab%3Dentry&title=Runtime+Cache). These help you compare changes in cache behavior with releases, see why entries are refreshed, and identify data that gets written to the cache but rarely read.

## [Copy link to heading](#bringing-data-cache-into-runtime-cache)Bringing Data Cache into Runtime Cache

We’re simplifying caching on Vercel by consolidating on Runtime Cache. Until now, Next.js `fetch` caching and `unstable_cache` have used Data Cache, while `getCache` and `'use cache: remote'` have used Runtime Cache. The migration brings all four APIs under Runtime Cache, so you and coding agents have one set of storage budgets and usage tools to work with.

If you use `fetch` caching or `unstable_cache`, nothing changes in your code. On Pro, each project and environment gets its own storage allocation, with 8x the space of Data Cache’s previous team-wide pool. Enterprise projects get 10x their previous Data Cache storage.

Previously unbilled Data Cache reads and writes will follow [Runtime Cache pricing](https://vercel.com/docs/pricing/regional-pricing). New teams use Runtime Cache automatically, and existing teams will receive their migration and billing details in advance.

See the [changelog](https://vercel.com/changelog/data-cache-is-moving-to-runtime-cache) for the rollout, pricing, and early opt-in details. Before migrating, review your cache usage and follow the [optimization guide](https://vercel.com/kb/guide/optimize-runtime-cache-reads-on-vercel) to reduce unnecessary reads and writes.