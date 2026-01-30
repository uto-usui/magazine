---
title: "Zero-configuration FastAPI backends"
source: "https://vercel.com/changelog/zero-config-fastapi-backends"
publishedDate: "2025-09-25"
category: "frontend"
feedName: "Vercel"
author: "Ricardo Gonzalez  "
---

1 min read

Sep 25, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6bdnndVO6Gu140EhF4cswf%2F5ade97c12cd5f7f570da998e61dc5e01%2FFastAPI-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7CIFoJXotAVToMHSGCWUCu%2F4803277d0c598fdeb3b558ee5a51f7f4%2FFastAPI-dark.png&w=1920&q=75)

[FastAPI](https://fastapi.tiangolo.com/), a modern, high-performance, web framework for building APIs with [Python](https://vercel.com/docs/functions/runtimes/python), is now supported with zero-configuration.

app.py

```
from fastapi import FastAPI app = FastAPI() @app.get("/") def read_root():     return {"Hello": "World"}
```

A "Hello World" FastAPI app on Vercel

Vercel's [framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure) now recognizes and deeply understands FastAPI applications. This update removes the need for redirects in `vercel.json` or using the `/api` folder.

Backends on Vercel use [Fluid compute](https://vercel.com/fluid) with [Active CPU pricing](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute) by default. This means your FastAPI app will automatically scale up and down based on traffic, and you only pay for what you use.

[Deploy FastAPI on Vercel](https://vercel.com/templates/python/fastapi-python-boilerplate) or visit the [FastAPI on Vercel documentation](https://vercel.com/docs/frameworks/backend/fastapi).