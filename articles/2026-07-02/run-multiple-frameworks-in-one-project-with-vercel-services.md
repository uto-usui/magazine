---
title: "Run multiple frameworks in one project with Vercel Services"
source: "https://vercel.com/changelog/run-multiple-frameworks-in-one-project-with-vercel-services"
publishedDate: "2026-06-30"
category: "frontend"
feedName: "Vercel"
author: "Ricardo Gonzalez"
---

You can now deploy multiple frontends and backends together within a single Vercel project.

[Vercel Services is now available](https://vercel.com/blog/vercel-services-run-full-stack-on-vercel), allowing you to deploy full stack apps with multiple frameworks on a shared domain, where services talk to each other privately and deployments build, preview, and roll back together.

Services are defined in `vercel.json`:

vercel.json

```
{  "services": {    "my_frontend": {      "root": "frontend/",      "framework": "nextjs"    },    "my_backend": {      "root": "backend/",      "entrypoint": "main:app"    }  },  // my_backend has no public route  // it is only reachable from my_frontend internally  "rewrites": [    {       "source": "/(.*)",       "destination": { "service": "my_frontend" }    }  ]}
```

Vercel handles routing, builds, and environment variables automatically.

From there, your services show up across the dashboard and CLI:

-   The Deployments panel visualizes the services graph
    
-   The Logs UI filters by individual service
    
-   `vercel dev` runs every service locally for a production-like environment
    

![A visualization of Services Graph in the Deployment UI](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F19SAmPB60ySDbDWxvh3WZT%2Fc5918391753d1810686a591e46e84b52%2Fgraph-light.png&w=1920&q=75)![A visualization of Services Graph in the Deployment UI](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F17GUMAM3VJ81HMhxeEpkX9%2F733dd997748896a2fe2c2e947709f9b8%2Fgraph-dark.png&w=1920&q=75)

A visualization of Services Graph in the Deployment UI

### [Link to heading](#service-bindings)Service bindings

Services talk to each other internally with the new `bindings` key, without routing through the public internet:

vercel.json

```
{  "services": {    "my_frontend": {      "root": "frontend/",      "framework": "nextjs",      "bindings": [        {          "type": "service",          "service": "my_backend",          "format": "url",          "env": "BACKEND_INTERNAL_URL"        }      ]    },    "my_backend": { ... }  },  "rewrites": [ ... ]}
```

The binding exposes my\_backend to my\_frontend as an environment variable.

The frontend reaches the backend privately through the URL in `BACKEND_INTERNAL_URL`:

app/api/users/route.ts

```
export async function GET() {  const url = new URL("/users", process.env.BACKEND_INTERNAL_URL);  const res = await fetch(url);  const users = await res.json();  return Response.json(users);}
```

The route fetches from my\_backend using that variable and returns the response.

### [Link to heading](#framework-defined-infrastructure)Framework-defined infrastructure

Most frameworks run with zero configuration. [Framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure) means each service's framework is auto-detected and auto-provisioned, from FastAPI and Flask to Express and Hono, with first-class support for Go and Rust. Services run on [Fluid compute](https://vercel.com/fluid) with Active CPU pricing, so you only pay for the time your code is actually running.

Read the [documentation](https://vercel.com/docs/services) to get started.