---
title: "Vercel Sandbox now supports up to 32 vCPU + 64 GB RAM configurations"
source: "https://vercel.com/changelog/vercel-sandbox-now-supports-up-to-32-vcpu-64-gb-ram-configurations"
publishedDate: "2026-04-08"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

1 min read

Apr 8, 2026

Vercel Sandbox now supports creating sandboxes with up to 32 vCPUs and 64 GB of RAM for Enterprise customers. This enables running large, resource-intensive applications that are CPU-bound or require a large amount of memory.

Get started by setting the `resources.vcpus` option in the [SDK](https://vercel.com/docs/vercel-sandbox/sdk-reference#sandbox.create):

```
import { Sandbox } from "@vercel/sandbox";const sandbox = await Sandbox.create({  resources: { vcpus: 32 },});
```

Or using the `--vcpus` option in the [CLI](https://vercel.com/docs/vercel-sandbox/cli-reference#sandbox-create):

```
sandbox create --connect --vcpus 32
```

Learn more about Sandbox in the [docs](https://vercel.com/docs/vercel-sandbox).