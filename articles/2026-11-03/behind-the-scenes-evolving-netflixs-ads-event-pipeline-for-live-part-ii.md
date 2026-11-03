---
title: "Behind the Scenes: Evolving Netflix’s Ads Event Pipeline for Live — Part II"
source: "https://netflixtechblog.com/behind-the-scenes-evolving-netflixs-ads-event-pipeline-for-live-part-ii-826ebf9ad9fb"
publishedDate: "2026-10-14"
category: "engineering"
feedName: "Netflix Tech Blog"
author: "Netflix Technology Blog"
---

> **Note:** Full content could not be retrieved. [Read the original article](https://netflixtechblog.com/behind-the-scenes-evolving-netflixs-ads-event-pipeline-for-live-part-ii-826ebf9ad9fb)

By [Yogesh Nagarur](https://www.linkedin.com/in/yogeshnagarur/)

### Introduction

In [Part 1 of this series](https://netflixtechblog.com/behind-the-scenes-building-a-robust-ads-event-processing-pipeline-e4e86caf9249), we shared how Netflix built the Ads Event pipeline and approached it as a system design problem: replacing fragmented pipelines with a centralized collection, enrichment, and a standard data contract. The result was Ads Event Publisher, the system that collects ad telemetry from client devices, _enriches_ it with the context of the ad that was actually served, and publishes a single, unified stream of ad events to every downstream consumer: frequency capping, metrics, billing, measurement partners, and reporting. Any member viewing or account details that move through this pipeline end-to-end are encrypted and handled in accordance with Netflix’s strict privacy and security practices to safeguard member PII.

If ad serving is the “brain” and ad events are the “heartbeats” that feed it, then enrichment is what gives each heartbeat its meaning, turning a bare “\[Somebody\] watched an ad to completion” signal into “_this_ campaign, _this_ creative, at _this_ price, for _this_ break.” Part 1 described that enrichment step as a single box in the architecture. This post is about what was inside that box, and why we rebuilt it.

Part 1 ended with a look at what was on the horizon: ads on live streams, de-duplication, and richer data signals. A single project delivered all three by rebuilding the Ads Event Publisher around stateful stream processing. We replaced a database lookup with a real-time streaming join in Apache Flink, which let the system scale for Live, took a dependency off the critical path, and replaced the engine of a high-traffic pipeline without downtime.

Let’s dive in.

### A quick recap: enrichment and the Metadata Registry

When an ad is served, the ad server knows everything about it: the campaign, the creative, the price of the impression, the targeting context, and the tracking URLs that measurement partners expect us to fire. The client device, by contrast, knows almost nothing: just an opaque token and _when_ to send each event. Enrichment is the act of reuniting the two.

In the architecture from Part 1, that reunion happened through the **Ads Metadata Registry**, a Key-Value store:

-   When the ad server made a decision, it **wrote the metadata** for that impression into the registry.
-   It encoded only reference identifiers into the opaque token returned to the device, keeping the token small.
-   Later, when the client fired an event carrying that token, the Ads Event Publisher decoded the token, **looked up the metadata** in the registry, and stitched the two together into an enriched ad event.

This design served us well. The registry was globally replicated, which gave us a useful property almost for free: an event arriving in _any_ region could find its metadata regardless of where the ad was decided. It future-proofed the token against ever-growing metadata, and it carried us through the first phase of Netflix’s advertising growth.

![](https://cdn-images-1.medium.com/max/1024/1*LkXsONCex0Q1KvttewSZ1w.png)

_The ad server writes per-impression metadata to the globally replicated registry on the serving path, and the Ads Event Publisher reads it back to enrich each client event._

But as we looked ahead, especially to ads on live streams, the limits of this design became clear.

### Why we needed to evolve

The forcing function was Live. Netflix’s live slate has grown rapidly, from [NFL games](https://www.netflix.com/tudum/articles/nfl-games-on-netflix) to [blockbuster fight nights](https://www.netflix.com/tudum/tyson-fury-vs-arslanbek-makhmudov) to the [FIFA Women’s World Cup 2027](https://www.netflix.com/tudum/features/fifa-womens-world-cup-2027), and viewership keeps growing. That traffic looks nothing like Subscription Video on Demand (SVOD): a single event can surge toward tens of millions of concurrent viewers within minutes, then drain just as fast when it ends. Building the ad pipeline for Live meant building for that trajectory.

To see why the old design could not get there, let’s put some numbers on it. When Netflix streamed the [Jake Paul vs. Mike Tyson fight](https://www.netflix.com/tudum/articles/jake-paul-vs-mike-tyson-live-release-date-news) to more than 100 million viewers, a single ad break at that scale would generate an enormous volume of ad events. Serving those ads in the old design would have meant writing metadata for each of them to the Metadata Registry and waiting for acknowledgment before the ads could serve: millions of must-succeed database writes per second on the ad-serving critical path. That pattern created three core problems at Live scale:

1.  **It was a scaling bottleneck.** Every ad and every ad break is a write. Multiply that by tens of millions of concurrent viewers, keep it non-lossy (a dropped write is a dropped ad, and lost revenue), add Live’s spiky on/off pattern, and the write load becomes enormous. But you cannot safely scale the registry up once the event starts. Adding nodes reshuffles data across the cluster to rebalance it, and doing that in the middle of a live event could slow or even fail the very writes you are adding capacity for. That leaves one safe option: pre-scaling for the peak in advance and hoping the forecast is accurate.
2.  **Fewer dependencies on the critical path.** Serving an ad meant a synchronous, must-succeed write to the registry, followed by a wait for its acknowledgment. Every system on the critical path is one more thing that can stop an ad from serving, and the metadata registry had no fallback, so an unhealthy registry meant serving stopped. Taking hard dependencies off that path was the goal, and the registry was the biggest one we could remove.
3.  **It put event freshness at risk.** If writing slowed down under load, or lookups timed out, events spilled into retries and dead-letter queues, and enriched ad events were delivered late. Some systems might be fine, but others, such as frequency capping, cannot. It needs events under a strict SLA to decide whether the next selected ad can run without breaking policies.

So we asked a simple question: _the ad server already knows and logs everything about the ad it served. Does it really need to write that to a database on the hot path? Can we match that against the downstream Kafka stream of client events, which is always there, after the fact?_

The write leaves the critical path entirely; no shared datastore outage can stop serving, and enrichment becomes something we scale elastically with Live rather than a cluster we babysit.

Matching two streams after the fact is a streaming join, and that is where Flink comes in.

### Why Flink

We chose Apache Flink because near-real-time, **stateful stream processing** is exactly what it is built for, and because it has deep, production-tested platform support at Netflix. Just as important, we already knew how to run it. As Part 1 noted, our Ads Sessionizer is a large stateful Flink job, so operating one at scale, tuning state, checkpoints, and recovery under production load, was familiar ground for the team. Enrichment on Flink was built on that experience rather than starting from scratch.

### The new architecture

At its core, the new Ads Event Publisher is built as an Apache Flink streaming job. Each event moves through a handful of stages:

1.  **Normalize.** Client events arrive from several sources, including SVOD, live, playback, and embedded ad breaks, each with a slightly different shape. We first normalize them into a common form.
2.  **Re-route.** Client events and response events may appear in different regions; we inspect and reroute them to the correct job-processing region for a successful join.
3.  **Join.** The heart of the job: we match each client event to the ad-serving response for the same impression, enriching it with the full serving context using a KeyedCoProcessFunction
4.  **Deduplicate.** Revenue-bearing events are de-duplicated, so nothing is counted twice.
5.  **Publish.** We extract measurement beacons for our partners and route the enriched ad event to its downstream consumers.

![](https://cdn-images-1.medium.com/max/1024/1*jJ5eKCy_hgiUp0-fJLb6FQ.png)

_The ad server logs responses to Kafka rather than writing to a registry; the Flink job joins responses with client events in real time and routes enriched ad events downstream._

The join is the interesting part. Client events and ad serving responses arrive on separate streams at different times, so the job holds recent responses in memory and matches events against them over a **60-minute window**. Three things can happen:

-   **The response is already there** when an event arrives → we enrich it on the spot.
-   **The event arrives first** → we hold it for a configuration duration (currently set to 60 minutes) until the matching response shows up, then enrich it.
-   **No response arrives within the window** → we mark the event as _unmatched_ for later recovery.

We built the join as a custom Flink operator (a KeyedCoProcessFunction) rather than a built-in windowed join. We do not need a windowed join ordering and time-window semantics, since downstream consumers handle ordering; we simply match each client event to its response by key. Owning the operator at its lowest API form lets us control the matching state directly, including how long we hold it and what we do with an event that never matches. This allows us to tune retention per stream or persist unmatched events to a durable store later without rewriting the join. Our goal is always to build a strong base to reap the benefits later as we scale.

To make that concrete, picture a member watching a live game. When the ad server decides which ad to show, it logs its response, and a few seconds later, the member’s device fires a “first quartile” event carrying the opaque token. Both arrive at the job keyed to the same impression, and because the response is already waiting, the event is enriched on the spot with its campaign, creative, price, and tracking URLs, then published downstream in near real-time.

Why 60 minutes? Almost all events, roughly 99.999% of them, reach the job well before that, so extending the window further would only grow the state store and lengthen checkpoints for a vanishingly small gain. The remaining 0.001% still matters for precise billing and reporting, and we recover those events via a separate path described later on.

### Cross-region: matching events where their data lives

The Metadata Registry handled cross-region enrichment for us because it was built on a globally replicated key-value store: a client event could land in any region and still find its ad’s metadata. Global replication was a feature the platform provided (see [Netflix’s Key-Value Data Abstraction Layer](https://netflixtechblog.com/introducing-netflixs-key-value-data-abstraction-layer-1ea8a0a11b30)), so serving an ad in one region and enriching its events in another was simply not something we had to think about.

A streaming join does not come with that convenience, and here the two sides of the join live in different places. The ad serving response stays in the region where the ad was served. The client event, though, is fired by the device, and the device can be anywhere: a member might start an ad on home wifi and switch to mobile data partway through, and that network change can route the event to a different region than the one that served the ad. So a client event is routed to a region that does not have the matching serving response.

The tempting fix is to stream every region’s serving responses into every other region so that each region can match any client event locally. We rejected it: that would mean every region storing every serving response worldwide, the vast majority of which will never be used in the join, which is wasteful in both cost and compute.

Instead, we treat this as a routing problem and route the client event rather than replicating the response. We encode the serving region into the ad token, so when a client event arrives in the wrong region, we forward it to the region that owns its response. For example, an ad is served in _us-east-2_, the member’s device switches from wifi to mobile data mid-ad, and the resulting event arrives in _us-east-1_. That region reads the token, sees the ad belongs to _eu-west-1_, and forwards the event back there, where its serving response is waiting. Only the small trickle of genuinely cross-region events pays for the extra hop.

### Catching the long tail of late-arriving events

Sixty minutes covers the vast majority of events, but not all of them. A device may have been offline, an ad paused, or an engagement event delayed by hours. Rather than drop these stragglers, we set them aside and recover them through a companion path: an hourly Spark batch job, orchestrated by [Maestro](https://netflixtechblog.com/maestro-netflixs-workflow-orchestrator-ee13a06f9c78), Netflix’s workflow orchestrator, re-pairs each straggler with its serving response from our data warehouse (which has a far longer retention than our in-stream window) and publishes it through the same downstream sinks. This keeps the streaming job’s memory bounded while still catching the long tail.

This also lets us support event types that arrive well after the 60-minute window, including certain tracking-related events, while keeping the door open to extending the system to additional event types down the line and improving our match rate as needed. We also designed this offline job with reuse in mind: it can replay dead-letter queues and backfill historical data, giving us a single mechanism for both long-tail recovery and operational recovery.

### What was hard

Beyond the architecture itself, three things took real work, and together they are what made the pipeline stable, correct, and safe to switch on.

#### Keeping the core lean.

Operating a stateful streaming join at live-event scale took real tuning, and most of our hard-won lessons come back to one idea: the job’s only job is matching events. Anything else we were tempted to bolt on, such as external lookups or incidental side-processing, was better moved off the hot path, or it eventually showed up as instability under load. Getting this right was the difference between a job that comfortably kept pace with live traffic and one that fell behind. It is unglamorous work, and it is most of the work.

#### De-duplicating Events

Duplicates are a fact of life here in an event processing pipeline. A client may retry an event, and our upstream delivery is at-least-once so that the same event can arrive more than once. For revenue-bearing events, the ones that feed billing, nothing should be counted twice.

The solution here is a simple and idempotent key. For each event, we compute a stable ID by hashing a few fields that uniquely identify it, such as the ad ID, the event type, and, for repeatable events, an offset or timestamp. The same underlying event always hashes to the same ID, so if we have seen an ID before, we drop the repeat.

What changed with Flink is where we remember those IDs. The previous design kept them in an external key-value store and did a check-and-write over the network for every event; Flink lets us keep that state local to the job instead. We key the stream by event ID, which routes every copy of a given event to the same place, and a local state store with a short time-to-live remembers the IDs we have recently seen. Keying by ID also removes the race the external store had to guard against, since a given ID is handled in only one place at a time, with no network hop on the hot path. Multiple improvements here alone.

We are deliberate about the guarantee: at-least-once delivery with best-effort de-duplication, not exactly-once. In-stream dedup removes the vast majority of duplicates within its window. However, a few can still slip past, for instance, through a cross-region reroute, a late-arriving recovery, or a restart that replays recent events. So we also carry the event ID through to the enriched ad event itself, which lets consumers who need exact counts, such as billing, run their own idempotent de-duplication over their own, longer windows.

#### Production Rollout

This was the most challenging part of the project. For a system that feeds billing and frequency capping, “trust me, the new one is correct” is not good enough, so we ran the Flink pipeline alongside the legacy one and made it earn its traffic.

Both pipelines continuously processed the full event stream, allowing us to compare them in real time: we published their outputs side by side. We ran automated audits that alerted us when the two drifted apart. Those audits earned their keep, surfacing subtle discrepancies we would never have caught from dashboards alone.

How do we know the enrichment logic between the two systems was equal for the audits to make sense? Early in development, we extracted that logic into a shared module that both the legacy service and the Flink job depend on, so any change to how an event is enriched is applied to both at the same time. A failure in the audits, therefore, pointed to a real difference in the pipeline mechanics.

Cutover was a separate question from comparison, and this is the part that warrants precision. We could not simply send a random percentage of events to each pipeline, because the same event landing in both would be double-counted downstream. Instead, the split was deterministic: a _stable key_ on each event decided which pipeline was responsible for publishing it, so every event was published exactly once, even though both pipelines saw all of them. Raising the threshold moved events from the legacy pipeline to Flink a slice at a time, and we could dial it back instantly if anything looked off.

![](https://cdn-images-1.medium.com/max/1024/1*Jkq04O2VHHi13xBaqb_Q3g.png)

_Both pipelines process the same events behind a gradual traffic dial; an audit compares their outputs until we trust them; then the legacy service and registry are retired._

By the time we fully cut over, the two pipelines agreed on well over 99.99% of events, and we rolled it out region by region rather than all at once. Then came the satisfying part: we turned off the ad server’s writes to the Metadata Registry, and decommissioned the legacy service and the registry itself. The single point of failure on the ad-serving critical path is simply _gone_. One of the oldest ad serving components at Netflix was _deleted_.

#### Operating the Flink platform

Operating a large stateful streaming job in production is its own job, and we did not build that muscle alone. We leaned heavily on Netflix’s Flink platform team. Early on, the job’s checkpoints were slow and heavy. The first checkpoint in particular took a long time, and we were holding more state in memory than we needed. Working with the platform team, we trimmed the state, reduced checkpoint durations, and validated the gains in load tests. That is what keeps the job from stalling during Live bursts.

The same team also gave us operational scaffolding we did not have to invest in, including continuous delivery and canary deployments, so we could ship and roll out the Flink job with the same guardrails and confidence as the rest of our production systems. Netflix operates more than 25,000 Flink jobs (see [Building a Scalable Flink Platform at Netflix](https://www.youtube.com/watch?v=T_Z4KLye0J0)), and that maturity is what we have to build on. We layered on custom canary metrics that catch issues before a release, CI/CD that lets us stagger rollouts, and a deploy flow that keeps the old job running until the new one has detected healthy checkpoints, so we never destroy a working job before the new job gives us the green light.

### The results

-   **Enrichment is off the critical path for ad serving.** The ad server no longer performs a synchronous, must-succeed database write to serve an ad. It logs and moves on, and an entire class of “the lookup store is down, so ad serving is down” failures no longer exists.
-   **Fewer systems, fewer schemas, fewer hops.** We retired both the legacy service and the Metadata Registry.
-   **Built for Live, and continuously tested for it.** An ad break is what this service is designed to handle, so during our journey, we also ran large-scale load tests to simulate real-life traffic. In our latest load test, a single AWS region handled one ad break for a large concurrent audience, processing hundreds of thousands of events per second, joining the large majority of them against their serving responses in real time, and outputting enriched ad events at a comparable rate, all with negligible timeouts and errors. We test this throughout development and keep doing so as live audiences grow, and we are not at the ceiling yet.
-   **We delivered the Part 1 roadmap.** Live-stream ad events, in-stream de-duplication, and richer real-time enrichment all shipped on this foundation.

### Key takeaways

-   **Take the database off the hot path when you can.** Our biggest win wasn’t raw performance — it was blast radius. Trading a synchronous write-and-wait for a fire-and-forget log plus a downstream join removed an entire failure mode from ad serving.
-   **Match events where their data lives.** Real-time joins beat global replication by routing events to their data rather than copying the data everywhere.
-   **Earn the cutover.** Running both systems in parallel and diffing their output on live traffic was slower than a flag-day switch — and it’s the only reason we trust the result.

### What’s next

We have an exciting list of projects on the horizon: scaling the live path for the next tier of concurrent audiences, bringing the remaining delayed _engagement_ events fully into the streaming world, reducing the Flink state size we need to manage, working on bringing even more resilience to the eventing processing pipeline, and continuing to add new event types and richer signals for our downstream consumers.

Re-architecting the engine of a running, revenue-critical pipeline in place was a real multi-team effort. If building real-time systems at this kind of scale sounds like your thing, [Ads Engineering is hiring](https://jobs.netflix.com/).

### Acknowledgements

This was a multi-team effort across Netflix. Thank you to everyone who designed, built, validated, and operated the new pipeline:

**Ads Engineering:** [Yogesh Nagarur](https://www.linkedin.com/in/yogeshnagarur/), [Kinesh Satiya](https://www.linkedin.com/in/kineshsatiya/), [Jeet Mehta](https://www.linkedin.com/in/jeetm35/), [Nitin Saini](https://www.linkedin.com/in/nsainiusc/), [Persis Shah](https://www.linkedin.com/in/persisshah/), [Guangyu Chen](https://www.linkedin.com/in/guangyuc/), [Jimmy Liu](https://www.linkedin.com/in/jimmy-liu-a904583a6/), [Riley Berton](https://www.linkedin.com/in/riley-berton/), [Simon Spencer](https://www.linkedin.com/in/simonspencer1/), [Aadesh Patel](http://linkedin.com/in/aadesh-patel-535ab998)

**Ads Data Engineering:** [Eugene Yusim](https://www.linkedin.com/in/eugene-yusim/), [Brandon Nicklas](https://www.linkedin.com/in/brandon-nicklas-b111736a/), [Indu Narayan](https://www.linkedin.com/in/indunarayan/)

**Ads SRE:** [Max Michaels](https://www.linkedin.com/in/max-michaels/), [Kevin Chung](https://www.linkedin.com/in/kevin-bitwyse/), [Carlos Avalos](https://www.linkedin.com/in/carlosavaloswa/), [Brian Christie](https://www.linkedin.com/in/brianrchristie/)

**Data Movement:** [Mark Cho](https://www.linkedin.com/in/markcho/), [Herbert Wang](https://www.linkedin.com/in/herbert-wang-08239741/), [Shraddha Ladda](https://www.linkedin.com/in/shraddha-ladda/), [Nikhil Sulegaon](https://www.linkedin.com/in/nikhil-sulegaon/), [James Lubin](https://www.linkedin.com/in/james-lubin/)**,** [Daniel Trager](https://www.linkedin.com/in/danieltrager/)

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=826ebf9ad9fb)

* * *

[Behind the Scenes: Evolving Netflix’s Ads Event Pipeline for Live — Part II](https://netflixtechblog.com/behind-the-scenes-evolving-netflixs-ads-event-pipeline-for-live-part-ii-826ebf9ad9fb) was originally published in [Netflix TechBlog](https://netflixtechblog.com) on Medium, where people are continuing the conversation by highlighting and responding to this story.