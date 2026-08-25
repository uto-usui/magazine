---
title: "Vercel Sandbox is now globally available"
source: "https://vercel.com/changelog/vercel-sandbox-is-now-globally-available"
publishedDate: "2026-08-24"
category: "frontend"
feedName: "Vercel"
author: "Marc Codina Segura"
---

[Vercel Sandbox](https://vercel.com/docs/sandbox) now runs globally, starting with four regions: `iad1` (Washington, D.C.), `sfo1` (San Francisco), `cle1` (Cleveland), and `cdg1` (Paris).

`iad1` remains the default. Support for all Vercel regions is coming soon.

Choose a region close to the databases, object storage, and other services your sandboxes access to reduce latency. Region selection is available on all plans.

Pro and Enterprise teams can also configure failover regions. If the primary region is unavailable, new sandboxes start in the closest configured failover region. Failover only applies to regions you configure; without it, a sandbox starts in its selected region, or the project default.

Snapshots stay in the region where they were created and can't be moved. To create or resume a sandbox from a snapshot, both must be in the same region. During failover, Vercel handles this automatically by loading the snapshot across regions.

Update the SDK or CLI you use to the latest version:

```
pnpm install @vercel/sandbox@latest    # Sandbox SDKpnpm install -g sandbox@latest         # Sandbox CLI pnpm install -g vercel@latest          # Vercel CLI 
```

Configure the default region and failover regions from [Settings > Sandboxes](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fsandboxes&title=Sandbox+Settings) in your project, or with the Vercel CLI:

```
vercel project update my-project --sandbox-region cdg1 --sandbox-failover-regions iad1,cle1
```

Configure Sandbox defaults with the CLI.

Those defaults apply to every sandbox. To override them for a single sandbox, pass `region` and optionally `failoverRegions` at create time with the SDK:

index.ts

```
import { Sandbox } from "@vercel/sandbox";const sandbox = await Sandbox.create({  region: "cdg1",  failoverRegions: ["iad1", "cle1"],});
```

Create a Sandbox in cdg1 with iad1 as a failover region using the SDK.

Or with the CLI:

```
 sandbox create --name my-sandbox --region cdg1 --failover-regions iad1,cle1
```

Create a Sandbox in cdg1 with iad1 as a failover region using the CLI.

Learn more in the [Sandbox regions documentation](https://vercel.com/docs/sandbox/concepts/regions).