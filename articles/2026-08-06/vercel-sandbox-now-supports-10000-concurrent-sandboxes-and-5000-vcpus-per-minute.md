---
title: "Vercel Sandbox now supports 10,000 concurrent sandboxes and 5,000 vCPUs per minute"
source: "https://vercel.com/changelog/vercel-sandbox-now-supports-10-000-concurrent-sandboxes-and-5-000-vcpus-per-minute"
publishedDate: "2026-08-05"
category: "frontend"
feedName: "Vercel"
author: "Tom Lienard"
---

We've increased the default quotas for [Vercel Sandbox](https://vercel.com/docs/sandbox) on Pro and Enterprise plans:

Quota

Before

After

Concurrent sandboxes

2,000

10,000

vCPUs allocation rate

200/min (Pro), 400/min (Enterprise)

Up to 5,000/min

The higher vCPU allocation rate is possible thanks to a new dynamic quota: instead of a fixed limit, the allowed rate now ramps with sustained usage: it starts at 150 vCPUs per minute and increases by 500 vCPUs per minute as you continue creating sandboxes, up to 5,000 vCPUs per minute

The new quotas apply automatically to all Pro and Enterprise teams. If you need higher quotas, [contact sales](https://vercel.com/contact/sales).

Learn more about [Sandbox pricing](https://vercel.com/docs/sandbox/pricing) and [dynamic quotas](https://vercel.com/docs/limits#dynamic-quotas).