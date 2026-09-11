---
title: "How we cut CDN metadata lookup latency by 91%"
source: "https://vercel.com/blog/how-we-cut-cdn-metadata-lookup-latency-by-91-percent"
publishedDate: "2026-09-10"
category: "frontend"
feedName: "Vercel"
author: "Tim Caswell"
---

Every request to Vercel [passes through our CDN](https://vercel.com/blog/life-of-a-vercel-request-what-happens-when-a-user-presses-enter), which executes on average over 80 million routing instructions per second. Part of that work is looking up metadata to determine which paths exist and how to serve them. When that metadata isn’t cached, the CDN has to fetch it before it can serve the response.

We used to fetch and cache metadata one path at a time, retrieving only what each lookup needed. That seemed efficient at the time, but large deployments can contain hundreds of thousands of paths, each with its own cache entry. Every new deployment introduced fresh metadata, making cache misses a recurring cost for large sites that deployed frequently.

Fetching more metadata at once made these lookups faster. By grouping paths together, each fetch could populate the cache for many subsequent lookups. But fetching too much introduced its own costs. Through production experiments, we found a balance that cut P99 metadata lookup latency by 91% and made deployments faster along the way.

## [Copy link to heading](#how-the-cdn-finds-the-right-route)How the CDN finds the right route

The path in a request doesn’t always match the path of the content or function that serves it. Framework routing rules connect the two. A request for `/blog/hello-world`, for example, might resolve to the dynamic route `/blog/[slug]`. A request for that page’s React Server Component payload might resolve to `/blog/[slug].rsc`. As the CDN applies these rules, it may need to check several target paths to find the right response.

The framework describes those routes during a build. With [framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure), application code declares which outputs are static, which need [Functions](https://vercel.com/docs/functions), and which responses can be cached or regenerated. Frameworks translate that intent into [Build Output API](https://vercel.com/docs/build-output-api) outputs, and Vercel generates the routing metadata the CDN reads.

At request time, the CDN needs to determine which target paths exist and retrieve their metadata. The [Bloom filters we added to global routing](https://vercel.com/blog/how-we-made-global-routing-faster-with-bloom-filters) rule out paths that definitely don’t exist. Remaining paths need an exact metadata lookup.

Originally, we stored that metadata as a separate object per target path. The CDN fetched and cached each object independently. This worked well for smaller projects that deployed infrequently. But every new deployment created a fresh set of cache keys, so the first lookup for each path missed the cache.

## [Copy link to heading](#fetching-metadata-in-groups)Fetching metadata in groups

To reduce cache misses, we grouped metadata for many paths into files called shards. We bounded each shard’s size to control how much data a lookup had to fetch. Fetching a shard brought metadata for all of its paths into the cache, so later lookups for those paths could reuse it.

![A per-path cache fill warms one path. A shard fill warms every path assigned to that shard.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fca50ea2533b5800504a69c5e%2F65fc3f448f7f3148b78ae5b85c13de36%2F02-cache-cardinality.png&w=3840&q=95)![A per-path cache fill warms one path. A shard fill warms every path assigned to that shard.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fca6e02e2994dcdccc13d8a65%2F56487405bb02c4ae9d5e7d84ac41fc4c%2F02-cache-cardinality-dark.png&w=3840&q=95)

A per-path cache fill warms one path. A shard fill warms every path assigned to that shard.

Each shard also included an index that let the CDN locate an individual path’s metadata without decoding, decompressing, or parsing the other entries. Each fetch warmed many paths, while each lookup still parsed only the record it needed.

![Per-path lookups needed a dependent HEAD and GET, while the new path fetches one bounded shard after the Bloom filter check and looks the path up locally.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fca2967d3ed4f62d70c18b7dd%2F837ad18196793b64ed780990668d0a5f%2F01-request-path-before-after.png&w=3840&q=95)![Per-path lookups needed a dependent HEAD and GET, while the new path fetches one bounded shard after the Bloom filter check and looks the path up locally.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fcaa1b2c04bdf24cddfc314d6%2F83d865d0e7191a6c53091160929bad69%2F01-request-path-before-after-dark.png&w=3840&q=95)

Per-path lookups needed a dependent HEAD and GET, while the new path fetches one bounded shard after the Bloom filter check and looks the path up locally.

## [Copy link to heading](#fetching-more-without-parsing-more)Fetching more without parsing more

We built the shards using JSONL layouts already used for other large routing datasets at Vercel. JSONL stores one JSON value per line. We borrowed the sorted, alternating key-value records from [Bulk Redirects](https://vercel.com/blog/scaling-redirects-to-infinity-on-vercel) and the directly addressable Base64 data structures we first built for our [Bloom filters](https://vercel.com/blog/how-we-made-global-routing-faster-with-bloom-filters).

We kept the data layout separate from the lookup structures over it, so each workload can pick the properties it needs:

-   Inspectable, sorted key-value JSONL records with random access
    
-   Optional inline indexes for low-overhead binary search
    
-   Embedded Base64 data with offset-based decoding
    
-   Bounded shards that control transfer and cache costs
    

Each shard stores sorted target paths and their metadata as alternating JSONL records. An inline index records where each entry begins, so the routing process can jump directly to it. These positions are stored as fixed-width pointers. Each pointer is a whole number of six-bit Base64 characters, so any single pointer can be decoded in place without first parsing the index line as JSON or decoding the complete Base64 string.

![The routing process binary-searches the encoded paths using build-time byte offsets, then parses only the matching JSON value.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fca6808f46d7394394996a8da%2F48aa72f25cac7e6e0308e29e45e6d13f%2F03-indexed-jsonl-lookup.png&w=3840&q=95)![The routing process binary-searches the encoded paths using build-time byte offsets, then parses only the matching JSON value.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fcadace12121cbb6ef42e3ff0%2Fb8ea75eeb02df661699ba424be4c6eeb%2F03-indexed-jsonl-lookup-dark.png&w=3840&q=95)

The routing process binary-searches the encoded paths using build-time byte offsets, then parses only the matching JSON value.

As with Bulk Redirects, the first metadata fetch for a deployment already identifies which shard holds a given path, so selecting the shard adds no extra round trip.

Within that shard, the routing process uses the index pointers to binary-search the encoded paths. Finding a path takes O(log n) pointer reads and string comparisons. Once it finds a match, it parses the metadata value on the next line. The rest of the shard remains unparsed.

## [Copy link to heading](#finding-the-right-shard-size-in-production)Finding the right shard size in production

We initially hoped the path metadata for most deployments would fit in a single shard. Because the index and binary search kept parsing cheap, we started with multi-megabyte shards.

Large shards only made sense if they stayed cached close to the request. Each routing process keeps a small least-recently-used (LRU) cache of recent shards in memory, in front of a larger cache shared by every process in the region. With only a few shards per deployment, we expected LRU hits most of the time, which would offset the cost of transferring larger shards.

In testing, the regional cache hit rate was high but the LRU hit rate was low, because requests were spread across many processes in each region. Transferring the multi-megabyte shards also cost more than we expected.

![Large shards made LRU misses too slow, while tiny shards made regional misses too common. Production testing found a practical balance at approximately 200 KB.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fcade4fd71b914b53e644e3e9%2F991f9cfa8d45f6643638ce5016645948%2F05-shard-size-tradeoff.png&w=3840&q=95)![Large shards made LRU misses too slow, while tiny shards made regional misses too common. Production testing found a practical balance at approximately 200 KB.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fca9ff6c3621e75bd54e431a9%2Fdc8827b1d19554d965337c1e35b2830b%2F05-shard-size-tradeoff-dark.png&w=3840&q=95)

Large shards made LRU misses too slow, while tiny shards made regional misses too common. Production testing found a practical balance at approximately 200 KB.

We settled on shards of about 200 KB, which kept the regional cache hit rate high and made LRU misses cheap to fill.

Production measurements showed lower average and P99 lookup latency:

**Metadata lookup metric**

**Before: per-path metadata**

**After: indexed shards**

**Improvement**

P99 latency

215.8 ms

19.1 ms

91% lower

Average latency

8.59 ms

1.81 ms

79% lower

Standard deviation

44.9 ms

19.0 ms

58% lower

Measured on production traffic, August 5–12, 2026.

## [Copy link to heading](#shrinking-shards-further-wasn't-worth-the-rollout)Shrinking shards further wasn't worth the rollout

Putting fewer entries in each shard lowered transfer cost but raised the shard count. We also evaluated shrinking shards without increasing their number by encoding the same entries more compactly. We tested three approaches:

-   Front-coding the sorted paths so each stores only what differs from the last.
    
-   Splitting the shard into JSONL documents that deduplicate metadata.
    
-   Using a more compact custom serialization format.
    

Offline simulations measured both encoded size and lookup cost.

Each approach produced much smaller shards, but the simulations predicted only modest latency gains. We decided the extra encoding, compatibility, and rollout work wasn't worth it for this migration. When another workload makes more indexing or compression worth the effort, it will go into the shared library.

## [Copy link to heading](#changing-routing-safely)Changing routing safely

The CDN runs this lookup on requests to every deployment. If the sharded metadata disagreed with the per-path metadata, we would serve a stale route, a wrong status code, or a 404 for a path that exists.

We checked for that disagreement offline first, then in production. Offline, we built test deployments and ran a harness over them that looked up every path both ways and compared the answers.

In production, behind a feature flag, the routing system did both lookups on a random sample of requests while still serving the old result. It compared the new result against the old one in the background, and we watched for mismatches over several weeks without slowing production requests. We called this shadow mode.

Shadow mode found differences, and they were extremely rare. One was a bug in the old encoding, which packed paths into RFC 2047 encoded words to fit non-ASCII text into ASCII-only fields, and only showed up when an emoji was split across two words. The new format stores paths as plain UTF-8, so the bug can't happen there. Catching this edge case increased our confidence in the comparison, so we started letting the shards serve production traffic.

## [Copy link to heading](#faster-builds)Faster builds

Once the shards were serving production, we went back to the build pipeline and removed the work they had made redundant:

-   Skipping the per-path metadata upload saves about 9.7 seconds.
    
-   Writing route group metadata into the manifest saves about 4.5 seconds.
    
-   Not uploading the files those two changes left empty saves about 2.4 seconds.
    

Together those save roughly 16.6 seconds. Across all deployments, the [deploy step is about 10% faster](https://vercel.com/changelog/deployment-step-now-10-faster), and for metadata-heavy deployments, where these steps dominate, we estimate closer to 25%.

## [Copy link to heading](#faster-routing-for-your-next-deployment)Faster routing for your next deployment

Faster metadata lookups improved route resolution as a whole. For large sites, P99 route resolution is now roughly twice as fast. On our own marketing and docs sites, P99 metadata lookup latency fell from 203 ms to 31 ms. Median metadata lookup latency stayed around 0.7 ms.

![Indexed-shard deployments measured 19.1 ms P99 path-metadata lookup latency, versus 215.8 ms for legacy-format deployments in the same production window.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fca9e130eed7fb423952748c1%2F791e2c1fa9be27c8d0ba25b5ae2d50a8%2F04-p99-latency.png&w=1920&q=95)![Indexed-shard deployments measured 19.1 ms P99 path-metadata lookup latency, versus 215.8 ms for legacy-format deployments in the same production window.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fca18e2337b9826addbcc6f51%2Fe37eebc4e5d6f9a8b886eca9eb3f4f4c%2F04-p99-latency-dark.png&w=1920&q=95)

Indexed shards reduced P99 metadata lookup latency by 91%.

The application’s Build Output API contract stayed the same. Frameworks still describe what the application needs, while Vercel improves how the CDN serves it.

Deployments built after July 17, 2026 already use the new metadata shards. For an older deployment, [redeploy your project](https://vercel.com/docs/deployments/managing-deployments#redeploy-a-project) to pick up the faster lookups.