---
title: "Vercel Sandbox now supports 1 vCPU + 2 GB RAM configurations"
source: "https://vercel.com/changelog/vercel-sandbox-now-supports-1-vcpu-2-gb-configurations"
publishedDate: "2026-03-10"
category: "frontend"
feedName: "Vercel"
author: "Rob Herley"
---

1 min read

Mar 10, 2026

Vercel Sandbox now supports creating Sandboxes with only 1 vCPU and 2 GB of RAM. This is ideal for single-threaded or light workloads which don't benefit from additional system resources. When unspecified, the default is still 2 vCPUs and 4 GB of RAM.

Get started by setting the `resources.vcpus` option in the [SDK](https://vercel.com/docs/vercel-sandbox/sdk-reference#sandbox.create):

```
import { Sandbox } from "@vercel/sandbox";const sandbox = await Sandbox.create({  resources: { vcpus: 1 },});
```

Or using the `--vcpus` option in the [CLI](https://vercel.com/docs/vercel-sandbox/cli-reference#sandbox-create):

```
sandbox create --connect --vcpus 1
```

Learn more about Sandbox in the [docs](https://vercel.com/docs/vercel-sandbox).