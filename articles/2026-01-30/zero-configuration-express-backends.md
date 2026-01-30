---
title: "Zero-configuration Express backends"
source: "https://vercel.com/changelog/zero-configuration-express-backends"
publishedDate: "2025-09-05"
category: "frontend"
feedName: "Vercel"
author: "Jeff See"
---

1 min read

Sep 5, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2F44itpd7WOKfT4ugwZLeT%2Ffb5971cb8fb63ade0a035dadf6dce30e%2FFlagsmith_Dark__3_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7D0ggftKNUQW27A2LgoPrr%2F9c3158deba8c2dbec854fd5f88c920cf%2FFlagsmith_Dark__1_.png&w=1920&q=75)

Express, a fast, unopinionated, minimalist web framework for [Node.js](https://nodejs.org/en/), is now supported with zero-configuration.

app.ts

```
import express from 'express'const app = express()app.get('/', (req, res) => {  res.send('Hello World!')})export default app
```

A "Hello World" Express.js app on Vercel

Vercel's [framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure) now recognizes and deeply understands Express applications. **This update removes the need for redirects in** **`vercel.json`** **or using the** **`/api`** **folder.**

[Deploy Express on Vercel](https://vercel.com/templates/backend/express-js-on-vercel) or [visit the Express on Vercel documentation](https://vercel.com/docs/frameworks/backend/express).