---
title: "Vercel Functions now support graceful shutdown"
source: "https://vercel.com/changelog/vercel-functions-now-support-graceful-shutdown"
publishedDate: "2025-09-08"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

1 min read

Sep 8, 2025

Vercel Functions running on Node.js and Python runtimes now support graceful shutdown, giving you up to 500 milliseconds to run cleanup tasks before termination.

When a function is terminated, such as during scale-down, the runtime receives a `SIGTERM` signal. You can now use this signal to run cleanup tasks like closing database connections or flushing external logs.

```
process.on('SIGTERM', () => {  console.log('Cleanup goes here');});export default {  fetch() {    return new Response('Hi from a Vercel Function!');  }}
```

Learn more about the [SIGTERM signal](https://vercel.com/docs/functions/functions-api-reference#sigterm-signal).