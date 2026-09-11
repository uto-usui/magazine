---
title: "Vercel Sandbox is now available in all regions"
source: "https://vercel.com/changelog/vercel-sandbox-is-now-available-in-all-regions"
publishedDate: "2026-09-10"
category: "frontend"
feedName: "Vercel"
author: "Marc Codina Segura"
---

[Vercel Sandbox](https://vercel.com/docs/sandbox) can now run in all 20 [Vercel compute regions](https://vercel.com/docs/regions), up from four.

Running sandboxes closer to the databases, storage, and other services they access reduces latency. Teams can also keep sandbox workloads in approved regions to support data residency and regional processing requirements.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F62cKFVM6rWGgy8iKKd6Kph%2F485949f27797bf0eff84e3cdb77fa747%2Fglobal_regions_final_-_web_light.png&w=3840&q=95)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4IfdK25xnk6QI20nnTaV1B%2Fb4bce172f24baaeb36196418a8c49d95%2Fglobal_regions_final_-_web_dark.png&w=3840&q=95)

`iad1` remains the default region. Region selection is available on every plan.

Pro and Enterprise teams can also configure failover regions. If Vercel can't create a sandbox in the primary region, it tries each configured failover region in order. Teams with data residency requirements can limit primary and failover regions to approved geographies.

Set a default region for new sandboxes from your project's [Settings > Sandboxes](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fsandboxes&title=Sandbox+Settings).

With the SDK:

```
import { Sandbox } from '@vercel/sandbox';const sandbox = await Sandbox.create({  name: 'my-sandbox',  region: 'syd1',  failoverRegions: ['hkg1', 'sin1'],});
```

Create a sandbox in Sydney with Hong Kong and Singapore as failover regions using the SDK.

With the CLI:

```
sandbox create --name my-sandbox --region syd1 --failover-regions hkg1,sin1
```

Create a sandbox in Sydney with Hong Kong and Singapore as failover regions using the CLI.

A region passed at creation overrides the project default. Existing sandboxes remain in the regions where they were created.

Active CPU and Provisioned Memory rates vary by region. See [Sandbox pricing](https://vercel.com/docs/sandbox/pricing#regional-pricing).

If you use the Sandbox SDK or CLI, update it to the latest version before selecting one of the newly supported regions. Learn about region selection, failover, and CLI configuration in the [Sandbox regions](https://vercel.com/docs/sandbox/concepts/regions) documentation.