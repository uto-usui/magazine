---
title: "FastAPI Lifespan Events are now supported on Vercel"
source: "https://vercel.com/changelog/fastapi-lifespan-events-are-now-supported-on-vercel"
publishedDate: "2025-12-09"
category: "frontend"
feedName: "Vercel"
author: "Ricardo Gonzalez  "
---

1 min read

Dec 9, 2025

Vercel now supports [lifespan events](https://fastapi.tiangolo.com/advanced/events/) for FastAPI apps. This allows you to define logic that can execute on startup and graceful shutdown—such as managing database connections or flushing external logs.

```
from contextlib import asynccontextmanagerfrom fastapi import FastAPI@asynccontextmanagerasync def lifespan(app: FastAPI):    # Startup logic    print("Starting up...")    await startup_tasks()    yield    # Shutdown logic    await cleanup_tasks()app = FastAPI(lifespan=lifespan)
```

Deploy FastAPI on Vercel or visit the [FastAPI on Vercel documentation](https://vercel.com/docs/frameworks/backend/fastapi).