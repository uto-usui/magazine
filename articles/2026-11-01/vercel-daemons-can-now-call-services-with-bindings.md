---
title: "Vercel Daemons can now call services with bindings"
source: "https://vercel.com/changelog/vercel-daemons-can-now-call-services-with-bindings"
publishedDate: "2026-10-30"
category: "frontend"
feedName: "Vercel"
author: "Nik Sidnev"
---

[Vercel Daemons](https://vercel.com/daemons) can now call the [services](https://vercel.com/docs/services) in their deployment through [service bindings](https://vercel.com/docs/services/bindings).

Declare the binding on the daemon. It names the target service and the environment variable that receives the service's URL:

vercel.toml

```
[services.api]root = "api/"entrypoint = "main:app"[daemons.worker]root = "worker/"entrypoint = "Dockerfile"instances = { iad1 = 1 }[[daemons.worker.bindings]]type = "service"service = "api"format = "url"env = "API_URL"
```

A daemon binding the api service, exposed to the worker as API\_URL

The daemon calls that URL like any other HTTP endpoint. Vercel handles the internal routing, authentication, and TLS, and the service stays private:

worker/worker.ts

```
await fetch(new URL('jobs/next', process.env.API_URL));
```

Calling the bound service from the daemon with a plain fetch

Bindings point one way: services can't bind to daemons. Each instance keeps calling the deployment that started it, even after a promotion or rollback.

Learn more about daemon service bindings in the [docs](https://vercel.com/docs/daemons#service-bindings).