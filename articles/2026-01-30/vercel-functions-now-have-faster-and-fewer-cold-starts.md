---
title: "Vercel Functions now have faster and fewer cold starts"
source: "https://vercel.com/changelog/vercel-functions-now-have-faster-and-fewer-cold-starts"
publishedDate: "2024-06-05"
category: "frontend"
feedName: "Vercel"
author: "Joe Haddad"
---

1 min read

Jun 5, 2024

Vercel's infrastructure now keeps a minimum of one function instance warm for production environments on paid plans. This improves startup times for apps with relatively low traffic.

This builds on our recent improvements to make Vercel Functions start up even faster, by [powering them with Rust](https://vercel.com/blog/vercel-functions-are-now-faster-and-powered-by-rust) and adding support for [bytecode caching](https://vercel.com/blog/introducing-bytecode-caching-for-vercel-functions).

Get started with [Vercel Functions](https://vercel.com/docs/functions/quickstart).