---
title: "Vercel Services: Run full stack on Vercel"
source: "https://vercel.com/blog/vercel-services-run-full-stack-on-vercel"
publishedDate: "2026-06-30"
category: "frontend"
feedName: "Vercel"
author: "Yury Selivanov"
---

To a user, an app with a Next.js frontend and a FastAPI backend feels like one product, and the same should be true for the engineers who build it. Instead, the two pieces are often deployed across different clouds with different development and deployment workflows.

Today we're introducing [Vercel Services](https://vercel.com/docs/services), which lets you run multiple frameworks in one Vercel Project. This unlocks:

-   **Atomic deployments:** Your frontend, backend, and other services stay in sync and deploy or roll back together
    
-   **Shared preview deployments:** See how any change affects all your services
    
-   **Internal service communication:** Services can talk to each other without routing through the public Internet
    

Vercel handles the rest: routing, builds, deployments, and auto-scaling in production. The developer experience you already know from Vercel now covers your entire application.

## [Link to heading](#compose-applications-with-vercel-services)Compose applications with Vercel Services

Declare your services under the `services` key in `vercel.json` keeping the routing configuration explicit:

vercel.json

```
{  "services": {    "my_frontend": {      "root": "frontend/",      "framework": "nextjs"    },    "my_backend": {      "root": "backend/",      "entrypoint": "main:app"    }  },  // my_backend has no public route  // it is only reachable from my_frontend internally  "rewrites": [    {       "source": "/(.*)",       "destination": { "service": "my_frontend" }    }  ]}
```

Public internet routes to the frontend. The backend has no public route and is only reachable internally via a service binding.

Services can be mounted to a shared routing table without the need for a reverse proxy or CORS.

The services configuration is recognized at multiple levels of the Vercel platform:

-   The Deployments panel shows a visualization of services graph
    
-   The Logs UI allows filtering by individual service
    
-   The `vercel dev` CLI automatically runs all services giving you a production-like environment locally
    

![A visualization of Services Graph in the Deployment UI](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F19SAmPB60ySDbDWxvh3WZT%2Fc5918391753d1810686a591e46e84b52%2Fgraph-light.png&w=1920&q=75)![A visualization of Services Graph in the Deployment UI](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F17GUMAM3VJ81HMhxeEpkX9%2F733dd997748896a2fe2c2e947709f9b8%2Fgraph-dark.png&w=1920&q=75)

A visualization of Services Graph in the Deployment UI

### [Link to heading](#service-bindings)Service bindings

Services can talk to other services internally, without routing through the public Internet. Here's an example how the new `bindings` configuration key enables that:

vercel.json

```
{  "services": {    "my_frontend": {      "root": "frontend/",      "framework": "nextjs",      "bindings": [        {          "type": "service",          "service": "my_backend",          "format": "url",          "env": "BACKEND_INTERNAL_URL"              }      ]    },    "my_backend": { ... }  },  "rewrites": [ ... ]}
```

A binding injects BACKEND\_INTERNAL\_URL into the frontend, pointing at the backend over Vercel's internal network

Now the JavaScript frontend code can talk to the Python service internally via the URL stored in the `BACKEND_INTERNAL_URL` environment variable:

app/api/users/route.ts

```
export async function GET() {  const url = new URL("/users", process.env.BACKEND_INTERNAL_URL);  const res = await fetch(url);  const users = await res.json();  return Response.json(users);}
```

The frontend calls the backend using the injected internal URL. Traffic never leaves Vercel's network.

Service-to-service traffic stays on the Vercel network rather than egressing to the public internet. Many independent services can become one application connected by the same wiring, rather than separate deployments that you stitch together across hosts.

### [Link to heading](#framework-defined-infrastructure)Framework-defined infrastructure

Most frameworks run on Vercel with zero configuration. [Framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure) means that each service's framework is auto-detected and auto-provisioned, from [FastAPI](https://vercel.com/changelog/zero-config-fastapi-backends) and [Flask](https://vercel.com/changelog/zero-configuration-flask-backends) for Python to Express and [Hono](https://vercel.com/changelog/deploy-hono-backends-with-zero-configuration) for TypeScript, with first-class support for [Go](https://vercel.com/changelog/zero-configuration-go-backend-support) and [Rust](https://vercel.com/changelog/rust-runtime-now-in-public-beta-for-vercel-functions) servers.

Services run on Fluid compute, autoscaling with traffic, while you pay only for active CPU time. But framework-defined optimizations go even deeper. With Django, for example, we automatically detect where static assets live and serve them from the CDN.

## [Link to heading](#the-full-stack-platform)The full stack platform

Vercel Services gives Vercel a structured way to build and run your application.

Those services run on a platform that includes everything any backend could need, whether you're building APIs, agents, or background workers: compute, data, networking, background work, and secure connections to external services.

### [Link to heading](#isolated-compute-for-agent-services)Isolated compute for agent services

Agents can read files, run commands, and write code. But that capability needs to be secure. [Vercel Sandbox](https://vercel.com/docs/sandbox) gives each agent its own Linux computer: a filesystem, a shell, [Docker support](https://vercel.com/changelog/run-docker-containers-inside-vercel-sandbox), and its own kernel, completely isolated from your deployments. Agents can execute code, grep files, and spin up Redis or Postgres as dependencies. Nothing inside the sandbox can touch your production environment.

With [automatic persistence](https://vercel.com/changelog/sandbox-persistence-is-now-ga), state carries between sessions, and on Pro, sandboxes can run for up to 24 hours.

### [Link to heading](#real-time-backends-with-websocket-support)Real-time backends with WebSocket support

Vercel Functions handle persistent WebSocket connections in every Vercel runtime, whether your backend is written in Node.js, Python, or Go. They work with standard WebSocket libraries like [Socket.IO](https://socket.io/), and because connections run on Fluid compute with Active CPU pricing, you only pay for the time spent processing messages, not the time a connection sits idle.

### [Link to heading](#reach-external-services-with-vercel-connect)Reach external services with Vercel Connect

Agents and backends need to reach services outside your project (Slack, GitHub, managed databases), which usually means storing a long-lived secret in your environment. [Vercel Connect](https://vercel.com/docs/connect) replaces that with a short-lived credential your app requests at runtime, scoped to the task in front of it. There is no long-lived secret left to leak.

### [Link to heading](#databases-and-storage-for-your-services)Databases and storage for your services

You can provision a database from the [Vercel Marketplace](https://vercel.com/changelog/aws-databases-now-available-on-the-vercel-marketplace) in a few clicks, with credentials injected for you, from providers like Neon, Supabase, and from AWS with Aurora PostgreSQL, Aurora DSQL, and DynamoDB. [Amazon OpenSearch Serverless](https://vercel.com/changelog/amazon-opensearch-serverless-is-now-available-in-the-vercel-marketplace) adds full-text and vector search, and [Vercel Blob](https://vercel.com/docs/vercel-blob) handles object storage. You can [query and manage](https://vercel.com/changelog/query-and-manage-marketplace-databases-from-the-dashboard) any of it without leaving Vercel, and both Blob and the AWS integrations authenticate with short-lived OIDC tokens rather than stored secrets.

### [Link to heading](#run-durable-workflows-and-background-jobs)Run durable workflows and background jobs

Vercel [Queues](https://vercel.com/changelog/vercel-queues-now-in-public-beta) processes background jobs off the request path. Vercel [Workflow](https://vercel.com/blog/introducing-workflow) handles durable multi-step processes that survive crashes and redeploys. And Vercel [Cron](https://vercel.com/changelog/vercel-cron-jobs-are-now-generally-available) runs work on a schedule. This is the part of a backend that outlives a request, and it runs on the same platform as everything else, so the long-running side of your backend needs no separate infrastructure.

### [Link to heading](#connect-privately-and-run-on-the-right-compute)Connect privately and run on the right compute

When a backend needs to reach a private database or an internal network instead of a public service, [Secure Compute](https://vercel.com/changelog/secure-compute-is-now-self-serve), [static IPs](https://vercel.com/changelog/static-ips-are-now-available-for-more-secure-connectivity), and [VPC peering](https://vercel.com/changelog/vpc-peering-now-available-as-self-service-for-vercel-secure-compute) open that path.

Functions run for [up to 30 minutes](https://vercel.com/docs/functions/configuring-functions/duration#extended-max-duration) on Pro and Enterprise, and Python backends deploy with up to 500mb of dependencies.

Underneath all of it, [Fluid compute](https://vercel.com/blog/how-fluid-compute-works-on-vercel) is [the default for new projects](https://vercel.com/changelog/fluid-compute-is-now-the-default-for-new-projects), and Active CPU pricing bills for the time your code is actually running rather than the time it waits, the right shape for idle-heavy backend and AI work.

## [Link to heading](#a-single-platform-for-everything-you-ship)A single platform for everything you ship

Vercel Services brings your frontend, backend, and supporting services into one project. They build together, preview together, deploy together, and communicate internally by default.

Combined with Vercel's built-in primitives for compute, data, queues, workflows, cron, secure networking, and sandboxed agent environments, you can run the full stack without stitching together separate platforms.

To start composing services, read the [Vercel Services documentation](https://vercel.com/docs/services) and the [routing and communication guide](https://vercel.com/docs/services/routing). If you are new to running a backend on Vercel, the [zero-config backends](https://vercel.com/blog/zero-config-backends-on-vercel-ai-cloud) post is the place to begin.

[

**Run your whole backend on Vercel**

Compose a frontend and every backend behind it in one project, on one domain, talking to each other with the connections wired for you.

Get started



](https://vercel.com/kb/vercel-services)