---
title: "How we migrated the database behind every Vercel build"
source: "https://vercel.com/blog/how-we-migrated-the-database-behind-every-vercel-build"
publishedDate: "2026-08-11"
category: "frontend"
feedName: "Vercel"
author: "Melkey Moksyakov"
---

Every build on Vercel starts in the build warm pool, which is a set of standby containers that let builds begin without waiting for new compute. The pool runs on state that tracks which containers are ready, the tokens each one uses to authenticate, and the mapping that ties every running build back to the deployment that gets billed for it. When we built the pool, we put all of that in Redis, which was fast and made sense at the time.

Over the years, though, that state turned into a liability. Tokens and container statuses can be rebuilt if they get lost, but the billing mappings can't, and all of it was sitting in a store that we ran as an ephemeral cache. That state needed to live somewhere durable, which is why we decided to migrate it to DynamoDB.

The problem is that the pool never stops. Containers are coming up, polling, picking up work, and expiring around the clock, which meant we couldn't pause the world, copy the data, and restart. The migration had to happen live, under production traffic, in phases, each one behind a flag with a rollback ready if we needed it.

## [Copy link to heading](#durable-state-in-an-ephemeral-store)Durable state in an ephemeral store

Redis was a good home for it at first. It was fast, familiar, and efficient for the access patterns the pool started with. But over time the state became more important than the store holding it. If Redis became unavailable or lost data, the pool could no longer reliably authenticate containers, track which of them were ready, or resolve the work in flight.

Lose a token and the pool rebuilds it within about ten minutes. Lose a mapping and the build is never billed, because nothing else records which deployment it belonged to.

We wanted it in durable storage and landed on DynamoDB. On-demand scaling fits bursty deployment traffic, [TTL is native](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/howitworks-ttl.html), and there are no connections to manage at high concurrency. But what it did not promise was Redis's latency.

## [Copy link to heading](#what-redis-made-cheap)What Redis made cheap

Inside Redis, the pool's state looked like this:

-   Tokens lived in a set so we could check membership, and in a sorted set so we could expire them
    
-   Each lifecycle status (pending, polling, building) had its own sorted set, which meant a status change was a removal from one set and an add to the next
    
-   A string tied each working container to its deployment
    

All of these operations were cheap, about a millisecond each, and the code grew to lean on that speed. A single run of the supply loop, which is the loop that refills each warm pool in turn, would make hundreds of count calls just to tally up the pending and polling containers.

That's how the warm pool grew, one easy write at a time, until data we needed to keep was sitting in structures built for speed. Untangling that layout was where the migration started.

## [Copy link to heading](#designing-the-schema-from-the-access-patterns)Designing the schema from the access patterns

Most migration plans treat the database as the thing being replaced. You map the access patterns, copy the data, and verify that the two stores agree. We planned ours that way too, so before designing any schema, we listed everything the code actually asked of that state:

-   Verify a token when a container polls for work
    
-   Add a token when a new container comes up
    
-   Expire tokens past their deadline
    
-   Count tokens to size the pool
    
-   Move a container between lifecycle statuses
    
-   Count containers by status
    
-   Look up the deployment behind a container's callback
    
-   Remove expired containers
    

Almost every operation already knows which container it's touching, and only polling ever starts from a token. So we put the container at the center of the model. The container ID became the sort key, and the token became just a field on the record, stored as a hash so that reading the table never hands you a usable credential. Verifying a token now just means looking up its container and comparing the hashes.

Two of the access patterns couldn't be served by a key lookup alone. Status counts had to skip containers that were already past expiry, which takes a time-aware index. And the deployment lookups feed billing, so they needed consistent reads, and the mapping got a small table of its own.

```
type ContainerRecord = {  warmPoolId: string   // partition key  containerId: string  // sort key  token: string        // stored as a hash  status: 'pending' | 'polling' | 'building'  expiresAt: number    // one expiry for the whole record}
```

A simplified sketch of the shape we shipped. Three status sorted sets became one field.

Reading a container's state, moving its status, and clearing its token all became direct key lookups. Counting a status became a single read against the time-aware index, one query per status with expired containers already filtered out.

```
// count containers in one status via the index, skipping expired onesqueryCount({  partition: `${warmPoolId}#${status}`,  where: 'expiresAt > now',})
```

One query per status, bounded by expiry.

Where Redis had let the data structures imply what we needed, DynamoDB made us spell out keys, indexes, conditional writes, and TTL behavior. So instead of carrying the Redis structures forward, we modeled the container and added the indexes that its access patterns needed.

## [Copy link to heading](#shadow-mode-validated-every-write)Shadow mode validated every write

The rollout ran as feature-flagged phases: Redis-only, then dual writes, shadow reads, DynamoDB-primary, and finally DynamoDB-only. Every phase kept a rollback open for as long as possible. The last step, which removed the Redis writes, was the only one without an easy rollback, but any lingering token expires within ten minutes anyway.

We started by baselining the existing Redis operations, their counts and their latencies, so that the dashboards had a normal to compare against. The new DynamoDB methods merged days before anything actually called them. Dual writes went out next, with Redis still the source of truth and DynamoDB failures logged instead of fatal. Then came shadow reads, which queried both stores and compared the results. And then primary reads flipped, with the Redis writes kept on until the new path had proven itself.

What the comparisons told us was whether the two stores agreed on the stored values, which is something tests alone couldn't. They said nothing about timing. We checked that every write landed in both stores, that expiration kept moving forward as containers changed status so stale state never piled up, that clearing a token left the rest of the container's record intact, and that the counts stayed close enough to steer the pool.

On top of the comparisons we built dashboards that watched match rates, write errors, per-query latency, and expiration counts while Redis was still serving production. That way any divergence surfaced while it was still cheap to investigate, instead of showing up as a cutover failure. Every mismatch got chased down to a real bug, a dual-write race, or an expected difference before we moved on. Those dashboards decided when each phase advanced, and every time the numbers held steady under production traffic, the next step felt safer.

![Dual writes running in shadow mode, with both stores receiving every mutation over the same window.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2LFW6LfoshDFZsywwhRzuW%2F22a1702569f28e73bdf586a53e8a2756%2Fparity-dashboard.png&w=1920&q=75)![Dual writes running in shadow mode, with both stores receiving every mutation over the same window.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4T4nftO9zLXxaU6lQRGOmp%2F46dbdc7ca6b051852227ead8767c14ae%2FCleanShot_2026-08-11_at_18.08.12.png&w=1920&q=75)

Dual writes running in shadow mode, with both stores receiving every mutation over the same window.

## [Copy link to heading](#two-failures-along-the-way)Two failures along the way

In March, one region's builds went down, and the investigation pointed at our own comparison machinery, which was the added load of checking two stores against each other. The scenario had actually come up in review, and we had throttled the comparisons for exactly that reason, but the throttling wasn't enough. Four days later, a pull request citing the incident added the index that the status counts needed. Without it, every count was O(n) work, and the comparisons were counting constantly. With the index in place, the rollout continued.

Later that month, the Redis infrastructure that we were migrating off actually went down. The warm pool and its token handling stayed up, because both of them were already reading from DynamoDB as the source of truth. Builds still felt the outage, but through services further up the pipeline that hadn't moved yet. The failure we'd been migrating away from arrived before the migration was even finished, and the state that had already moved survived it.

## [Copy link to heading](#the-supply-loop-stalled-on-slower-reads)The supply loop stalled on slower reads

In April, the supply loop began to stall. The shadow data had looked healthy when we advanced primary reads, and the per-query latency had looked acceptable on the dashboards. What failed was a behavior that neither one measured.

We drew the loop to see where the time was going.

```
the loop as designed  check → create → check → create → check → create → ...          one state read before every containerwhat slower reads demand  check → create, create, create, ... → check          stop paying a read before every create
```

Redrawn from the investigation's original sketch. Every check on the top line is a round trip to the store.

At P95 on `getWarmPoolTokenCount`, that check measured 1.29ms on Redis and 5.13ms on DynamoDB. At the time we shorthanded it as two to three times slower per query, which turned out to be an underestimate.

A few extra milliseconds cost nothing when you only pay them once. But the loop was paying them before every container, hundreds of times per run, and that stretched runs out to minutes at their worst, which meant the pool couldn't stay ahead of demand. The loop was an N+1 query, and Redis had just simply been fast enough to hide it.

No one wrote "this loop requires millisecond reads" anywhere. But the assumption lived in the design, and at a millisecond per check, nothing had ever made us stop and look.

## [Copy link to heading](#we-rebuilt-the-loop-around-the-new-latency)We rebuilt the loop around the new latency

DynamoDB was never going to match Redis's millisecond, so instead of chasing it, we designed the requirement out.

The first attempt was batching, which is the shape drawn at the bottom of the sketch. The size of the gap depends on which percentile you look at, and at P90, where it was widest, the gap was about 17x. So the batch design checked state once per 17 containers, with one read amortized across the whole batch, and that constant was lifted straight from the measurement. But the constant was also the reason we walked away from it. It hard-coded a latency ratio that would drift with load, which meant one more unwritten dependency on the store's speed. Concurrency didn't need a constant at all.

What shipped instead let the loop's supply calls run concurrently, so each warm pool was no longer waiting behind the one before it, and each call worked from the last state it saw. Overlapping the reads bought us the same thing that batching would have, which is that no run serialized on any single read. The worst case is a few extra containers created from a stale picture of the pool, and that went into the pull request as an accepted cost. The redesign meant we could keep the more durable store without compromising the thing users actually care about, which is builds starting quickly and reliably. The fixes landed the same way the rollout did, one measured step at a time. As one of us put it, "we have less risk on each iteration because we've corrected for a previous misestimation."

It turned out the loop had stalled under Redis too, sometimes for a minute or more, and we only learned that while we were diagnosing DynamoDB. The evidence had been in our telemetry the whole time, but because the pool sits ahead of demand rather than in any request path, nothing had ever forced us to go look until the migration did. And the redesign ended up removing a flaw that was older than the project itself.

## [Copy link to heading](#migrating-the-assumptions)Migrating the assumptions

The migration completed in April, with the Redis calls gone from the warm pool paths. Copying the data turned out to be the easy part. The real work was finding the assumptions that had been built on top of the store, and then redesigning the loop that had held them. The state that every build depends on now lives in a store that was built to keep it, and the loop that manages it no longer serializes on any single read.

The April retrospective put the lesson in one sentence. "Even a 1ms-to-15ms query time degradation on P90 could bring down our warm pool management logic." Nobody had written that sentence in February, when the migration started.