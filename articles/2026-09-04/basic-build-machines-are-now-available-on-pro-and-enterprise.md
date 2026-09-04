---
title: "Basic build machines are now available on Pro and Enterprise"
source: "https://vercel.com/changelog/basic-build-machines"
publishedDate: "2026-09-03"
category: "frontend"
feedName: "Vercel"
author: "Mehul Kar"
---

Pro and Enterprise teams can now select Basic build machines.

Basic build machines have 2 vCPUs and 8 GB of memory, offering a more cost-efficient option for smaller apps or agents that build with fewer resources. New Pro and Enterprise projects still default to [Elastic build machines](https://vercel.com/changelog/elastic-build-machines-is-now-ga), which scale automatically and are recommended for most use cases.

To use Basic build machines, update your project configuration in [team settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fsettings%2Fbuild-and-deployment%23build-machines), [project settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fbuild-and-deployment%23build-machine), or with Vercel CLI `59.6.0` or later:

```
vc project update --build-machine basic
```

Hobby accounts continue to build on the same 2 vCPU machines, now called Basic build machines.

Basic build machines are charged at the same $0.0035 per vCPU per minute, which works out to $0.007 per build minute. See the [pricing page](https://vercel.com/docs/pricing#builds) or read the [build machines documentation](https://vercel.com/docs/builds).