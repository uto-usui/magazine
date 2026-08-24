---
title: "Run background tasks with Celery on Vercel"
source: "https://vercel.com/changelog/run-background-tasks-with-celery-on-vercel"
publishedDate: "2026-07-31"
category: "frontend"
feedName: "Vercel"
author: "Ricardo Gonzalez"
---

[Celery](https://docs.celeryq.dev/en/stable/getting-started/introduction.html), an asynchronous distributed task queue for Python, is now supported natively on Vercel. Tasks are executed as Vercel Functions and automatically scale with traffic.

worker.py

```
from celery import Celeryapp = Celery("celery", broker="vercel://")@app.taskdef add(x, y):    return x + y
```

By default, task results are stored in [Runtime Cache](https://vercel.com/docs/caching/runtime-cache), which is sufficient for small data sizes and relatively short workflow runtimes. For workloads that require stronger persistence guarantees, more storage or longer retention, a durable result backend can be configured.

app.py

```
from fastapi import FastAPIfrom worker import add, app as celeryapp = FastAPI()@app.post("/add")def enqueue(x: int, y: int):    return { "id": add.delay(x, y).id }@app.get("/result/{task_id}")def result(task_id):    task = celery.AsyncResult(task_id)    return { "status": task.status, "result": task.result }
```

Celery workers can be declared as `subscribers` in `pyproject.toml`.

pyproject.toml

```
[[tool.vercel.subscribers]]entrypoint = "worker:app"
```

When running on Vercel, the [vercel:// broker](https://github.com/vercel/vercel-py/tree/main/integrations/vercel-celery) is automatically installed and to use [Vercel Queues](https://vercel.com/docs/queues), and the default Celery [broker\_url](https://docs.celeryq.dev/en/latest/userguide/configuration.html#broker-settings) is set to `vercel://`.  
  
Celery workloads on Vercel use [Fluid compute](https://vercel.com/fluid) with [Active CPU pricing](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute) by default. This means your Celery workers will automatically scale up and down based on traffic, and you only pay for what you use.  
  
[Deploy Celery workloads on Vercel](https://vercel.com/templates/python/python-celery-starter) or visit the [Python runtime documentation](https://vercel.com/docs/functions/runtimes/python).