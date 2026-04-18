---
title: "Scaling redirects to infinity on Vercel"
source: "https://vercel.com/blog/scaling-redirects-to-infinity-on-vercel"
publishedDate: "2026-03-03"
category: "frontend"
feedName: "Vercel"
author: "Ben Roberts"
---

6 min read

Mar 3, 2026

Redirects are trivial at a small scale, but at millions, latency and cost become real systems problems.

Previously on Vercel, redirects were handled by routing rules and middleware. Routing rules support up to 2,000 complex redirects with wildcards, and they function as an ordered list evaluated in sequence. Each rule may involve regex matching, meaning a single request could trigger many expensive evaluations. This is acceptable for a few thousand routing rules, but as counts grow, per-request work increases linearly.

Middleware offers more flexibility, but it adds latency by running extra code on every request. To serve millions of redirects with low latency, we needed a dedicated lookup path with near-constant or logarithmic time per request. Building on our [previous work to make global routing faster with Bloom filters](https://vercel.com/blog/how-we-made-global-routing-faster-with-bloom-filters), we found a way to scale to millions of redirects.

## [Link to heading](#what-we-optimized-for)What we optimized for

-   **Scale:**
    
    -   Support millions of static redirects per project
        
-   **Runtime behavior:**
    
    -   No additional latency cost for projects that don't configure redirects
        
    -   A fast "no redirect" path, since most requests won't be redirected
        
    -   Low process memory usage, relying on external storage and caching layers instead
        
-   **Engineering values:**
    
    -   Simplicity and debuggability over premature optimization
        
    -   Evolve iteratively rather than trying to get it perfect on the first try
        

With those goals in mind, we started with the simplest design we could think of, combining the redirects and Bloom filter in a single file. Since the redirect data was already JSON, and our Bloom filters already supported JSON exporting, we decided to use the JSONL file format to store this information.

## [Link to heading](#json-and-bloom-filters-versus-napkin-math)JSON and Bloom filters versus napkin math

A Bloom filter is a probabilistic data structure that tests whether an element is a member of a set. Bloom filters can return false positives but never false negatives, so they answer "definitely not in the set" or "maybe in the set." By checking a small, cached Bloom filter first, we could skip the redirect lookup entirely for requests that don't match, keeping the common "no redirect" path extremely cheap. Only on a positive match would we parse the JSON file.

Simple, but would it scale? The napkin math said no. A million redirects could easily produce a file in the hundreds of megabytes, and fetching and parsing something that large would blow our latency and memory budgets. We needed to avoid loading the entire dataset at once.

## [Link to heading](#sharding-and-bloom-filters-keep-memory-low-and-lookups-fast)Sharding and Bloom filters keep memory low and lookups fast

The fix was sharding. Instead of one massive JSONL file, we hashed the redirect path to distribute entries across many small shards. This allows us to load a small slice of data for a specific request, which shifts the burden from process memory to external storage and the file system cache. The Bloom filter still sits in front, short-circuiting the lookup for the vast majority of traffic. But now, when a request does pass the Bloom filter, we only need to fetch and parse a single small shard rather than the entire redirect set.

## [Link to heading](#shard-structure)Shard structure

Each shard contains 3 parts:

-   A header line that encodes the properties of the Bloom filter
    
-   The base64 encoded Bloom filter
    
-   A JSON object of redirects, keyed by src path
    

Here is a sample:

```
{"version":"bulk-redirects","bloom":{"n":3,"p":1e-7,"m":102,"k":23,"s":0}}"Mec7FxGVcJ0fHdj8HA=="{"/old-path":{"destination":"/new-path", ...},"/another-old-path":{"destination":"/another-new-path", ...}, ...}
```

Shard format with header, Bloom filter, and redirect map

At build time, we generate all of the shards and their Bloom filters and upload them to external storage. At runtime, the server only needs to know which dataset and shard count apply to a given project or deployment when it receives a request.

### [Link to heading](#the-lookup-path-checks-the-bloom-filter-before-parsing-json)**The lookup path checks the Bloom filter before parsing JSON**

At request time, the bulk redirect lookup works like this:

-   Check whether the project or deployment has bulk redirects configured. If not, skip everything and proceed as usual.
    
-   Compute the redirect key from the incoming request and hash it to determine the shard.
    
-   Retrieve the shard from the cache or origin, and check the Bloom filter.
    
    -   If the key is not present in the Bloom filter, we do not parse the JSON body of the shard.
        
    -   If the key is maybe present in the Bloom filter, we load the JSON body of the shard and look up the exact redirect inside that object.
        

This design has some nice properties:

-   **Fast negative lookups:** Bloom filters are very fast and can be tuned to have a very low false positive rate
    
-   **Human‑readable shards:** Shards are just JSONL files. If something goes wrong, it's easy to dump a shard and see exactly what it contains
    
-   **Low implementation risk:** JSON parsing and Bloom filters are simple, so this can ship quickly, allowing us to gather real‑world data
    

## [Link to heading](#json-parsing-became-a-bottleneck-on-positive-lookups)JSON parsing became a bottleneck on positive lookups

We suspected JSON parsing might become a bottleneck, and our dogfooding confirmed it. When the Bloom filter indicated a redirect might exist, parsing the full JSON body for the relevant shard took considerable time. We also saw massive latency spikes under high CPU load, since JSON parsing is CPU-intensive and competes for resources with everything else on the node.

Reducing shard size would help with parsing speed, but smaller shards increase cardinality (the number of shards to manage) and cache miss rates. This created a trade-off. Large shards meant higher CPU overhead from parsing, while small shards meant more I/O latency from cache misses. We needed a data format that could retrieve a single value without parsing the entire shard.

## [Link to heading](#binary-search-over-sorted-keys-to-avoid-parsing-the-entire-shard)Binary search over sorted keys to avoid parsing the entire shard

Instead of storing redirects in a JSON blob, we implemented a binary search keyed by the redirect path. Each shard stores its redirect keys in sorted order, so we can perform a logarithmic-time search over those keys. Once we find the key, we only need to parse the JSON for that specific redirect. This sidesteps the shard size problem entirely. Lookup cost no longer scales with the total amount of data in the shard, so we can keep shards large enough for good cache hit rates without paying for full JSON parsing.

```
{"version":"bulk-redirects","bloom":{"n":3,"p":1e-7,"m":102,"k":23,"s":0}}"Mec7FxGVcJ0fHdj8HA==""/old-path"{"destination":"/new-path", ...}"/another-old-path"{"destination":"/another-new-path", ...}
```

Sorted keys enable binary search without parsing the full shard

## [Link to heading](#latency-dropped-and-the-spikes-disappeared)**Latency dropped and the spikes disappeared**

With JSON parsing out of the hot path for positive lookups, requests for redirects that actually exist became both faster and more predictable.

The most visible improvement was the elimination of the latency spikes we had seen under high CPU load. When parsing a full JSON shard, redirect lookups competed for CPU time with everything else running on the node. With binary search, the per-request CPU cost dropped low enough that resource contention stopped being a factor.

## [Link to heading](#designing-for-the-common-case)Designing for the common case

Redirects themselves are simple. The challenge comes from combining that simple abstraction with large, mostly cold datasets and strict latency expectations at the edge. Routing rules were the wrong tool for this job.

Instead, we built a dedicated path for bulk redirects:

-   Shard redirect data so each piece stays small
    
-   Use Bloom filters so the common "no redirect" case stays cheap
    
-   Store redirects in a layout that supports binary search over keys
    

This development cycle reinforced a principle we keep coming back to. Avoid premature optimization. By starting with a simple, debuggable implementation and instrumenting it, we let production data dictate where complexity was actually needed.

## [Link to heading](#get-started-with-bulk-redirects)Get started with bulk redirects

Bulk redirects are available for Pro and Enterprise customers, configurable via project configuration, the dashboard, API, or CLI. The current limit is 1 million redirects per project. If you need more capacity, [reach out to us](https://vercel.com/contact/sales).

**Plan**

**Included redirects**

**Additional capacity**

Pro

1,000 per project

$50/month per 25,000

Enterprise

10,000 per project

$50/month per 25,000

Use bulk redirects to manage large-scale migrations, fix broken links, handle expired pages, and more. See our [bulk redirects documentation](https://vercel.com/docs/redirects/bulk-redirects) or the [getting started guide](https://vercel.com/docs/redirects/bulk-redirects/getting-started).