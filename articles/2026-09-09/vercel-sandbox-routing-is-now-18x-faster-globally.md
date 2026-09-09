---
title: "Vercel Sandbox routing is now 18x faster globally"
source: "https://vercel.com/changelog/vercel-sandbox-routing-is-now-18x-faster-globally"
publishedDate: "2026-09-08"
category: "frontend"
feedName: "Vercel"
author: "Marc Codina Segura"
---

Requests to [Vercel Sandbox](https://vercel.com/docs/sandbox) public domains are now routed 18x faster.

Domains created with the `sandbox.domain()` SDK call are now resolved from the nearest regional replica, instead of a single centralized store. Incoming requests reach the process running in the sandbox with less latency.

Median domain lookup latency dropped from 62ms to 3.4ms (18x faster). The improvement is largest in regions farthest from the previous store: lookups are now up to 112x faster in Sydney (syd1) and up to 146x faster in Cape Town (cpt1), at p99.

This applies automatically to every request to a sandbox domain. There are no pricing changes.

Learn more about [Vercel Sandbox](https://vercel.com/docs/sandbox) in our documentation.