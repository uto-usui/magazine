---
title: "New execution duration limit for Edge Functions"
source: "https://vercel.com/changelog/new-execution-duration-limit-for-edge-functions"
publishedDate: "2025-02-06"
category: "frontend"
feedName: "Vercel"
author: "Shohei Maeda"
---

1 min read

Feb 6, 2025

Starting on March 1st, 2025, we will begin the rollout of a new execution duration limit of 300 seconds for [Vercel Functions](https://vercel.com/docs/functions/runtimes/edge-runtime) using the Edge runtime.

Previously, Edge Functions had no fixed timeout for streaming responses, leading to unpredictable behavior based on system resources and traffic. With this update, Edge Functions will consistently allow streaming responses for up to 300 seconds, including post-response tasks like `waitUntil()`.

Please note that Edge Functions must begin sending a response within **25 seconds** to maintain streaming capabilities beyond this period. This limit remains as before.

Learn more about [Vercel Functions using the Edge runtime](https://vercel.com/docs/functions/runtimes/edge/edge-functions).