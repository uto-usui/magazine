---
title: "Deploy a container from a plain Dockerfile"
source: "https://vercel.com/changelog/deploy-a-container-from-a-plain-dockerfile"
publishedDate: "2026-10-27"
category: "frontend"
feedName: "Vercel"
author: "Jeff See"
---

You can now deploy a plain root `Dockerfile` or `Containerfile` on Vercel's [Container runtime](https://vercel.com/docs/functions/runtimes/container) when no other framework is detected. Vercel selects the Container preset, builds that file, and routes all traffic to the resulting image. To get started with containers on Vercel, add a Dockerfile:

Dockerfile

```
FROM node:26-alpineRUN npm i -g srvxCOPY . /appWORKDIR /appEXPOSE 3000CMD ["srvx", "--port", "3000"]
```

When project detection matches another framework, such as Django, that framework still wins. To build use the `Dockerfile` or `Containerfile` instead, run `vercel project update --framework container`, or set the framework in `vercel.json`:

vercel.json

```
{  "framework": "container"}
```

A `Dockerfile.vercel` or `Containerfile.vercel` continues to win over a detected framework, and multi-service projects still use `vercel.json` `services` with a per-service `entrypoint`.

The Container runtime is in beta, runs on Vercel Functions, and is billed with Active CPU pricing. Read the [Container runtime documentation](https://vercel.com/docs/functions/runtimes/container) to get started.