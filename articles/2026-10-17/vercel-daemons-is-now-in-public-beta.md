---
title: "Vercel Daemons is now in public beta"
source: "https://vercel.com/changelog/vercel-daemons-is-now-in-public-beta"
publishedDate: "2026-10-15"
category: "frontend"
feedName: "Vercel"
author: "Steren"
---

[Vercel Daemons](https://vercel.com/daemons) is now in public beta, allowing you to run long-running processes that pull and execute work from [Vercel Queues](https://vercel.com/docs/queues), databases, or third-party systems without requiring an HTTP server:

-   Consumers using [Vercel Queues poll mode](https://vercel.com/docs/queues/poll-mode), Celery, BullMQ, RabbitMQ, or Kafka.
    
-   Temporal or Cadence workers that long-poll their task queues.
    
-   Self-hosted CI runners for GitHub Actions, GitLab, or CircleCI that poll for jobs without requiring inbound connections.
    

Daemons run containers on Fluid compute and deploy alongside your app in the same project. Vercel builds your image and maintains the instance count you configure in each region, restarting instances that exit or crash.

Get started by packaging your application and dependencies in a Dockerfile or Containerfile, then adding a `daemons` entry to one configuration file at your project root. This example uses `worker/Dockerfile` to run one Celery worker in `iad1` (Washington, D.C.):

A Celery worker on Vercel

Set any connection details your worker needs in your project's production environment variables, then deploy to production. Vercel starts the configured instances, and their output appears in your project's [Logs](https://vercel.com/docs/logs/runtime). CPU and memory metrics are available with [Observability Plus](https://vercel.com/docs/observability/observability-plus).

Learn more in the [Vercel Daemons documentation](https://vercel.com/docs/daemons).