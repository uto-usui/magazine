---
title: "Preparing for the worst: Our core database failover test"
source: "https://vercel.com/blog/preparing-for-the-worst-our-core-database-failover-test"
publishedDate: "2025-08-28"
category: "frontend"
feedName: "Vercel"
author: "Matheus Fernandes"
---

4 min read

Aug 28, 2025

Many engineering teams have disaster recovery plans. But unless those plans are regularly exercised on production workloads, they don’t mean much. Real resilience comes from verifying that systems remain stable under pressure. Not just in theory, but in practice.

On July 24, 2025, we successfully performed a full production failover of our core control-plane database from Azure West US to East US 2 with zero customer impact.

This was a test across all control-plane traffic: every API request, every background job, every deployment and build operation. Preview and development traffic routing was affected, though our production CDN traffic, served by a separate globally-replicated DynamoDB architecture, remained completely isolated and unaffected across our 19 regions.

This operation was a deliberate, high-stakes exercise. We wanted to ensure that if the primary region became unavailable, our systems could continue functioning with minimal disruption. The result: a successful failover with zero customer downtime, no degraded performance in production, and no postmortem needed.

## [Link to heading](#our-motivation)Our motivation

Datacenter outages aren't hypothetical. And in the face of that reality, our platform must be ready to pivot instantly to maintain uptime and continue serving production traffic.

Our architecture is designed for resilience. Each of our 19 cloud regions operates autonomously, with a full copy of the metadata required to serve applications independently. If a region becomes unavailable, our anycast routing layer removes it from rotation within seconds, automatically rerouting traffic with no disruption. Compute is equally resilient: we support backup regions for function execution during regional failures.

But architecture alone isn’t enough.

Last year, Azure’s West US region suffered two major power failures that prevented us from performing critical write operations. While a replica existed in East US 2, we had never fully rehearsed a failover. The incident revealed that although many of our internal services were ready, some were not. It exposed a gap in our operational resilience.

We committed to closing that gap. Over the following months, we worked to ensure we could fail over cleanly and reliably. And not just in principle, but in practice.

## [Link to heading](#preparing-to-fail\(over\))Preparing to fail(over)

Preparation revealed more problems than expected.

For example, some of our internal services use proprietary Cosmos DB clients which lacked failover awareness. These services needed the ability to detect when the database's primary write region changed and redirect their writes accordingly, without requiring a restart or redeploy. In other words, they had to programmatically update their write targets at runtime based on the latest metadata from Cosmos DB.

We noticed some limitations during tests in staging, like hardcoding a five-minute wait before recognizing a new write region. We patched that delay down to five milliseconds and upstreamed the change to our monorepo.

We also discovered that Cosmos DB’s failover protocol requires every database partition to recognize the new write region. During the transition, some services disagreed on where writes should go, causing elevated latencies. For larger collections, writes could stall for minutes. We worked around this.

Across 57 staging failovers, we tested every codepath and SDK to build confidence before attempting a production failover. By the time July 24 arrived, we had a well-defined playbook.

## [Link to heading](#the-live-exercise)The live exercise

At 14:09 UTC, we initiated the failover from West US to East US 2. By 14:23, the switch was complete. An hour later, we reversed it.

There was minor operational impact: about 500 builds were disrupted, mostly our own. One customer (ourselves) saw elevated latencies due to a particularly large database partition. Serving of preview and development traffic remained unaffected. Importantly, no customer-facing production traffic was impacted.

The failover succeeded. All services remained operational, the correct alerts fired, and on-call teams handled all events with zero customer impact.

## [Link to heading](#operational-readiness)Operational readiness

Behind the scenes, our on-call engineers (who are on-call 24/7) were fully staffed and engaged during the failover. Every alert fired as expected, and responders followed established playbooks to validate each subsystem. Many of our alerts are paired with detailed runbooks in Notion, giving clear instructions on how to respond when specific conditions are met.

Not all alerts are precise. Some are broad, catch-all indicators that correlate with known bad states, essentially trailing signals that something is likely wrong even if the exact cause isn't yet known. These are designed to prompt immediate investigation, even when the issue is still ambiguous. During the test, both targeted and catch-all alerts helped validate system health across services, ensuring no signal was missed and no issue went undetected.

## [Link to heading](#lessons-and-loose-ends)Lessons and loose ends

This was a graceful failover. In a real incident, we would perform an Offline Region operation, which is more aggressive and can't be reversed for up to two business days. We've tested that scenario twice in staging and came out with a few observations that are being prioritized and helped inform our near-term roadmap.

We also observed inconsistencies during the failover: some clients saw the write region flip back and forth. About 2% of write traffic never fully transitioned to the new region, based on Azure metrics. These edge cases help inform our near-term roadmap.

## [Link to heading](#built-for-resilience)Built for resilience

Exercises like this aren’t risk-free, but they’re far safer than performing your first failover in the middle of a live outage. Our platform is designed to keep serving end users even if an entire cloud region goes offline. This failover proved that our control plane can recover quickly and that our on-call teams are ready.

We will continue to rigorously test, refine, and ensure that Vercel remains resilient. Importantly, we prioritize this so our customers don't have to.

## [Link to heading](#credit-to-azure)Credit to Azure

We want to acknowledge our strong partnership with Azure, mentioned throughout this blog. They've been a reliable and collaborative partner, working closely with us through past incidents, during this exercise, and in the follow-up. Power disruptions are an industry-wide reality — not a reflection of any single provider. Exercises like this are part of responsible engineering, ensuring that both our systems and our vendor relationships are resilient and ready for real-world failure scenarios. We're grateful for Azure’s continued support and shared focus on building reliable, scalable infrastructure.