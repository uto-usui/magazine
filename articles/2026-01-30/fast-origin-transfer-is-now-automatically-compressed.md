---
title: "Fast Origin Transfer is now automatically compressed"
source: "https://vercel.com/changelog/fast-origin-transfer-is-now-automatically-compressed"
publishedDate: "2024-07-15"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

1 min read

Jul 15, 2024

We’ve improved Fast Origin Transfer—our Edge Network’s ability to transfer data from every region globally to the origin—to be compressed by default.

Fast Origin Transfer is incurred when using any of Vercel’s compute projects, like Functions, Middleware, and Incremental Static Regeneration (ISR). Starting today, all data transfer between edge regions and the origin location is now automatically compressed. This matches the behavior of Fast Data Transfer.

Learn more about [Fast Origin Transfer](https://vercel.com/docs/pricing/networking#fast-origin-transfer) and how to optimize.