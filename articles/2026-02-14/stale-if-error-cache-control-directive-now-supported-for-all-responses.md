---
title: "Stale-if-error cache-control directive now supported for all responses"
source: "https://vercel.com/changelog/stale-if-error-cache-control-header-is-now-supported"
publishedDate: "2026-02-13"
category: "frontend"
feedName: "Vercel"
author: "Shraddha Agarwal"
---

1 min read

Feb 13, 2026

Vercel CDN now supports the `stale-if-error` directive with Cache-Control headers, enabling more resilient caching behavior during origin failures.

You can now use the `stale-if-error` directive to specify how long (in seconds) a stale cached response can still be served if a request to the origin fails. When this directive is present and the origin returns an error, the CDN may serve a previously cached response instead of returning the error to the client. Stale responses may be served for errors like 500 Internal Server Errors, network failures, or DNS errors.

This allows applications to remain available and respond gracefully when upstream services are temporarily unavailable.

Read the [stale-if-error documentation](https://vercel.com/docs/headers/cache-control-headers#stale-if-error) to learn more.