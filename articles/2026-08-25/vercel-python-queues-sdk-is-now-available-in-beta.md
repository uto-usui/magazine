---
title: "Vercel Python Queues SDK is now available in beta"
source: "https://vercel.com/changelog/vercel-python-queues-sdk-is-now-available-in-beta"
publishedDate: "2026-08-19"
category: "frontend"
feedName: "Vercel"
author: "Elvis Pranskevichus"
---

The Python SDK for Vercel Queues is now available in beta, bringing first-class Python support for running background workloads on Vercel.

You publish messages to topics, and independent consumer groups process them in parallel with automatic retries, sharding, and delivery guarantees. Messages can be enqueued or consumed from either JavaScript or Python, meaning a Next.js producer can fan out to both Next.js and Python queue consumers.

**Publish a message from your Python API:**

main.py

```
from fastapi import FastAPI, Requestfrom vercel.queue import sendapp = FastAPI()@app.post("/api/orders")async def create_order(request: Request):    body = await request.json()    message_id = await send("orders", body)    return {"message_id": message_id}
```

**Publish a message from a frontend route handler:**

app/api/orders/route.ts

```
import { send } from '@vercel/queue';export async function POST(request: Request) {  const order = await request.json();  const { messageId } = await send('orders', order);  return Response.json({ messageId });}
```

**Create a subscriber:**

subscriber.py

```
from typing import Anyfrom vercel.queue import subscribe@subscribe(topic="orders")async def fulfill_order(order: dict[str, Any]) -> None:    print("Fulfilling order:", order)
```

**Opt project into receiving queue message deliveries:**

pyproject.toml

```
[tool.vercel]entrypoint = "main:app"[[tool.vercel.subscribers]]entrypoint = "subscriber"
```

**Configure cross-runtime consumers:  
**The following configuration allows you to compose a frontend and a backend within a single Vercel project, allowing you to enqueue messages from one service and consume them from another or fan out to multiple.

vercel.json

```
{  "services": {    "frontend": {      "root": "frontend/",      "functions": {        "app/api/queues/fulfill-order/route.ts": {          "experimentalTriggers": [{ "type": "queue/v2beta", "topic": "orders" }]        }      }    },    "backend": {      "root": "backend/",      "entrypoint": "pyproject.toml"    }  }}
```

Get started with `pip install vercel` or visit the [Python SDK reference](https://vercel.com/docs/queues/python-sdk) documentation.