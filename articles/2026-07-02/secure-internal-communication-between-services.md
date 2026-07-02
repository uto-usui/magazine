---
title: "Secure internal communication between services"
source: "https://vercel.com/changelog/secure-internal-communication-between-services"
publishedDate: "2026-07-01"
category: "frontend"
feedName: "Vercel"
author: "Brandon Tuttle"
---

Service Bindings make it easy for one Vercel service to securely call another within the same deployment.

When a service declares a binding for another service, Vercel automatically injects the configured environment variable. That means user code can fetch that URL normally, while Vercel handles the internal rewrite, routing, authentication, and TLS behind the scenes.

This enables multi-service applications on Vercel, like a Next.js frontend calling a FastAPI backend, while preserving service isolation and keeping routing configuration simple:

```
{  "services": {    "my_frontend": {      "root": "frontend/",      "framework": "nextjs",      "bindings": [        {           "type": "service",           "service": "my_backend",           "format": "url",           "env": "BACKEND_INTERNAL_URL"         }      ]          },    "my_backend": {      "root": "backend/",      "entrypoint": "main:app"    }  }}
```

In the example above, `my_frontend` will be able to reach the `my_backend` service by making a `fetch()` request to `BACKEND_INTERNAL_URL.`

app/api/users/route.ts

```
export async function GET() {  const url = new URL("/users", process.env.BACKEND_INTERNAL_URL);  const res = await fetch(url);  const users = await res.json();  return Response.json(users);}
```

The frontend calls the backend using the injected internal URL. Traffic never leaves Vercel's network.

On the FastAPI side, `my_backend` exposes a normal route:

```
from fastapi import FastAPIapp = FastAPI()@app.get("/users")def get_users():    return [ ... ]
```

## [Link to heading](#under-the-hood)Under the hood

That URL points inside Vercel, not at a public address. When your code fetches it, the request travels over Vercel's internal network to the same routing layer that handles every other request to your deployment, which sends it to the target service. It never hits the public route table, and Vercel sets up the TLS trust for you, so a plain HTTPS `fetch` works with no certificate config.

A service is only reachable if you expose it, either publicly with a rewrite route or privately with a binding.

## [Link to heading](#observability)Observability

Service-to-service calls also appear in observability, so you can see which bound service was called and how long the request took:

## [Link to heading](#pricing)Pricing

Service-to-service calls are billed as **Service Requests** and **Fast Origin Transfer**. They are not billed as CDN Requests or Fast Data Transfer. See [services pricing and limits](https://vercel.com/docs/services/pricing) for current rates.

## [Link to heading](#learn-more)Learn more

Read the [bindings documentation](https://vercel.com/docs/services/bindings) to declare bindings and see the full reference.