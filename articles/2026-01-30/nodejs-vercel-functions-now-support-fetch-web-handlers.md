---
title: "Node.js Vercel Functions now support fetch web handlers"
source: "https://vercel.com/changelog/node-js-vercel-functions-now-support-fetch-web-handlers"
publishedDate: "2025-08-19"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

1 min read

Aug 19, 2025

Vercel Functions running on the Node.js runtime now support the `fetch` web handlers, improving interoperability across JavaScript runtimes and frameworks.

```
export default {  fetch(request: Request) {     return new Response('Hello from Vercel!');  }};
```

You can still [export individual HTTP methods](https://vercel.com/docs/functions/functions-api-reference?framework=other#function-signature), if preferred.

Learn more about [fetch web handlers](https://vercel.com/docs/functions/functions-api-reference?framework=other#fetch-web-standard) [in the docs](https://vercel.com/docs/functions/functions-api-reference?framework=other#fetch-web-standard).