---
title: "The search for speed in Figma"
source: "https://www.figma.com/blog/the-search-for-speed-in-figma-opensearch/"
publishedDate: "2024-10-10"
category: "design"
feedName: "Figma Blog"
---

Earlier this year, we set out to improve the way that search works at Figma. While search infrastructure has been a part of Figma since day one, our growth has made it increasingly challenging for our search system to reliably find the content that users are looking for. We wanted to establish a solid search foundation that we can build on in the coming months and years.

[**ElasticSearch**](https://aws.amazon.com/what-is/elasticsearch/) is a search engine that can be customized for searching through billions of documents.

Until late 2023, we relied on an older version of **ElasticSearch** to power search in Figma. Then, we started upgrading to [OpenSearch](https://opensearch.org/), running as part of AWS’s [managed OpenSearch service](https://aws.amazon.com/opensearch-service/). OpenSearch is a fork of ElasticSearch, created when the ElasticSearch license changed in 2021. While the two are mostly compatible, small differences have accumulated over the last three years, making the migration more challenging than expected.

## [Search at scale](#search-at-scale)

I joined Figma’s search team with very little production experience with either ElasticSearch or OpenSearch, but extensive experience in scaling large web services. As always when tackling issues with web services, I set out to understand what was happening under the hood with OpenSearch.

In an ideal world, the search time reported by OpenSearch and the time reported by our application would be nearly the same, but in this case one is 120x the other. Our search service isn’t \*that\* complicated. So where was the time going?

We learned from [DataDog](https://www.datadoghq.com/)’s native OpenSearch integration that our “average search” took about eight milliseconds (ms). This seemed impressively (and improbably) fast for searching through many terabytes of data, even if that data was broken up into hundreds of index shards searchable in parallel. At the same time, we knew that our service’s search API had a 99th percentile latency of almost one second. Something didn’t add up.

To investigate further, we added extra instrumentation to our code so we could see where time was being spent. We added metrics and traces around most of the large blocks of internal code behind search. This helped us understand several key insights:

1.  OpenSearch might have _claimed_ that it had an average latency of eight ms, but our calls to their API library saw an average latency of 150 ms and a 99th percentile latency of 200–400 ms. Our _minimum_ latency was over 40 ms, which was far higher than their reported _maximum_ latency.
2.  We spent a lot of time creating our queries before we even sent them to OpenSearch.
3.  We spent even more time doing permissions checking on query results after they came back—what we call post-processing—to make sure that we never return file results to users who don’t have permission to see them.
4.  Our performance wasn’t very stable and varied greatly from hour to hour and day to day. At peak times, we were hundreds of milliseconds slower than we were on weekends.

By this point, we were trying to reconcile two pieces of information that contradicted each other: OpenSearch said that searches took around eight ms, while our code said that it took around 150 ms. The only way that would make sense is if the two were across the world from each other, but in reality, they’re actually running in the same AWS [availability zone](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html), only a couple milliseconds away from each other. So we dug deep into the documentation and discovered that the eight ms metric that we’d been looking at was actually the single-shard average query time, not the overall query time.

## [OpenSearch at Figma](#opensearch-at-figma)

To understand how we got here, it’s helpful to understand how OpenSearch (and ElasticSearch) work and how we use them at Figma. Like most web services, we have an API layer that translates between the user’s actions and assorted back-end services. When OpenSearch receives a query, it hits a “coordinator node” which then sends a copy of the query to “worker nodes,” one query per shard for the index being queried. Generally, all of the nodes take turns handling coordinator duty. This is called the [“query” phase of an OpenSearch search](https://opensearch.org/blog/a-query-or-there-and-back-again/). The coordinator then collects results, sorts them, and usually asks for more information from the shards that returned the best results. This is called the “fetch” phase of an OpenSearch search. Finally, it returns the results to the client.

The eight ms timing only covered each of the individual per-shard queries between the coordinator node and the worker nodes. For our initial configuration, there were potentially 500 per-shard queries per user query. Many of those happen in parallel, but not _all_ of them. This is where the discrepancy came up: We were looking at the wrong metric. Instead of what we had been measuring, we needed the latency metric that covers the coordinator node’s view of the query. After looking through documentation and doing a deep dive on Google and Stack Overflow, we turned to our account manager at AWS to help. It turns out that none of OpenSearch’s metrics or logs actually _track_ overall query time, just per-shard time.

In fact, the only place that OpenSearch reports overall query performance is in the query API response, which includes a field (“took”) that is the number of milliseconds that OpenSearch took to answer the query. So, we parsed this value out of each search response and added it to our monitoring. This gave us a backend latency number that mostly matched the timing wrapper that we’d put around OpenSearch API calls. After reconciling several pieces of data, we could more clearly see the story our monitoring system was telling us.

Unfortunately, the story mostly told us that we spent less than 30% of our total query API time waiting on OpenSearch, and in fact, pre- and post-processing took more time than searching. The pre-processing stage fetches a bunch of information about the files that the user can access and builds up an OpenSearch filter clause that _mostly_ excludes files that they can’t access; the post processing phase then verifies that the user actually has access to each and every file returned.

Both steps were slow, post-processing particularly so. We worked with our permissions team to understand and improve post-processing performance. Statistical analysis showed that evaluating different parts of the permission system in a different order might produce the same results in much less time. We also discovered that we were spending a shocking amount of time on run-time type safety checking in Ruby inside of the permissions system, and disabling the most intrusive parts of it gave substantial speedups.

When we started looking at slow search traces, we noticed a number of oddly slow database queries. The database itself was fast, and the load balancing proxy between us and the DB was fast, but actually issuing queries sometimes took tens of milliseconds. After hours of staring at source code and traces, a member of the team identified a problem with the way that we set up new database connections in new threads. Our database connection pool wasn’t large enough, so we were doing expensive setup and teardown operations that were never needed inside of each thread. They fixed the basic problem, and we saw substantial speedups not just in search, but across all Figma. With this insight in mind, they re-evaluated a number of threading experiments that we’d tried in the past, where doing parallel database reads in threads had only rarely been a performance win. With the new initialization code, nearly every opportunity to issue queries in parallel made Figma faster.

## [Assessing and improving performance](#assessing-and-improving-performance)

Once we had aligned on reasonable performance metrics and improved a few of the big problems, it was time to dig deeper. Previously, we didn’t have enough signal to answer some key questions, but by this point, we could let the data guide us:

-   How good are our OpenSearch queries?
-   Do we have the right data in our indexes?
-   Do we have the right OpenSearch configuration?

### [How good are our OpenSearch queries?](#how-good-are-our-opensearch-queries)

With a bit of work, you can get OpenSearch’s query profiler to tell you how much work it does and where it spends its time. We discovered that most of our queries bypassed most of the millions of documents that we have per index shard; they only looked at a few hundred documents per shard per query. This is because the filtering that we built in our pre-processing step manages to eliminate the majority of the files that users can’t access, and OpenSearch’s query optimizer takes full advantage of this. So, our queries weren’t the problem.

### [Do we have the right data?](#do-we-have-the-right-data)

This is still an open question because it’s at least partially a question of search relevancy, not just performance. Do we have enough data to find whatever the user is searching for? Do we actually find it? That isn’t a simple problem, and we’re constantly running experiments to try to improve it. But, we did discover that the vast bulk of the data that we’d been feeding into OpenSearch wasn’t very useful. We were able to trim our index size down repeatedly, first by 50% and then by an additional 90% without a measurable impact on relevancy. This made everything faster, easier, and cheaper.

### [Do we have the right OpenSearch configuration?](#do-we-have-the-right-opensearch-configuration)

OpenSearch provides a lot of flexibility, but with that flexibility comes complexity. For example, Amazon lists [_139_ different OpenSearch server instance types](https://aws.amazon.com/opensearch-service/pricing/) with a wide range of CPU and memory options, ranging from $0.02 to $17 per hour. Each index needs to be broken into some number of shards, but the best number of shards in any situation is far from obvious. And OpenSearch supports a number of features that let you make tradeoffs between CPU, memory, and disk utilization, like compression types and search concurrency. These are all adjustable, and none of them have obvious “best” values. Amazon provides guidance on sizing, especially around the amount of data per OpenSearch node and the ratio of shards to nodes, but we discovered that most of their recommendations were based on throughput-intensive workloads like log querying, not latency-sensitive document search.

In the end, the only way we could understand how all of these options impacted our search performance was to run tests and measure their impact. So we started assembling a load testing system. We built new non-production OpenSearch clusters, loaded data onto them, ran queries against them, measured the results, and then made changes and started testing all over again. OpenSearch has its own benchmarking tool, the imaginatively named opensearch-benchmark, but we were never really able to get consistent results out of it. It’s designed to do performance regression testing for OpenSearch development, and isn’t as good at sending huge numbers of randomized queries to existing OpenSearch instances. Also, strangely, it doesn’t really like to use the server-side “took” latency number, which means that all latency metrics are based on client-side performance. This makes it tricky to get repeatable runs in our environment. In the end, we ended up writing our own benchmark tool in [Go](https://go.dev/) in an afternoon.

This led us to a few key insights:

-   **We had too many shards in our indexes.** We started with 450 shards, and ended up dropping to 180 shards, a 60% reduction. This gave us over a 50% boost in our maximum query rate before excess latency set in. Surprisingly, by reducing the number of shards that the coordinator had to collect data from, our P50 latency—essentially median latency—actually decreased as well.
-   **Reducing the amount of data in our indexes was a substantial improvement.** That was part of what made us confident that we could reduce our shard count safely. By reducing the amount of data, we improved our disk cache hit rate which made all performance more predictable. The initial optimization that reduced our index size by 50% reduced our query latency and made the latency more consistent; reducing it by another 90% by stripping unused data made our entire dataset fit into the operating system’s disk cache and made the system much faster.
-   **Amazon’s recommendations weren’t correct for our usage.** While reviewing AWS’s sizing recommendations, we found that our measurements strongly disagreed with their recommendations. They suggested that we keep shards under 50 GB and provision roughly one index shard for each 1.5 CPUs in the cluster. While that may make sense for log-like searches, for document-like searches where latency matters, it’ll mean that your coordinators will have to do too much work to manage potentially thousands of shards for each query. Since our filters were very effective, we actually saw better performance with fewer, larger shards.
-   **We had provisioned OpenSearch nodes with too much CPU (expensive) and not enough RAM (much cheaper).** We were able to switch to nodes with 1/3rd the CPU and 25% more RAM for about half the price per node and get slightly better performance overall, even before we reduced the size of our indexes.
-   **[Zstandard (zstd)](https://facebook.github.io/zstd/) compression wasn’t a major win**, but it didn’t hurt either.
-   **Concurrent segment search was never a win for our use case.** It started out with a few milliseconds of added latency at low query rates and latency increased much faster as the query load increased. This surprised us, because we still had a lot of free CPU and expected that increasing parallelism would decrease latency, but this didn’t appear to be the case.

All in all, the Figma search team was able to lower API latency about 60%, increase the maximum number of queries per second by at least 50%, and reduced total cost by more than 50%. This was achieved through detailed work across multiple areas, from monitoring and bug fixes to index size reduction and optimized configurations. While there was no single magic bullet, our collaborative effort significantly improved Figma’s search performance and set us up for future scalability. The search for speed is never truly over, but we’ve taken a big leap forward, and we’re ready for whatever challenges come next.