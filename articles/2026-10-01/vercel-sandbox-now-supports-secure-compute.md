---
title: "Vercel Sandbox now supports Secure Compute"
source: "https://vercel.com/changelog/vercel-sandbox-now-supports-secure-compute"
publishedDate: "2026-09-30"
category: "frontend"
feedName: "Vercel"
author: "Karim Hasebou"
---

Vercel Sandbox now supports [Secure Compute](https://vercel.com/docs/networking/secure-compute), connecting sandboxes to a team's dedicated network. Public-internet traffic exits through the network's static IPs, and sandboxes can reach private resources in an AWS VPC through VPC peering.

You can attach a sandbox to your network in your code or via the CLI.

In your code, pass an existing Secure Compute network ID when creating a sandbox:

```
import { Sandbox } from '@vercel/sandbox';const sandbox = await Sandbox.create({  networkId: '3k9x7m2p5q8w1z4n',});
```

In the CLI, append `--network-id` and your network id value when you run the sandbox create command:

```
npx sandbox@latest create --network-id your_network_id_here
```

Existing sandboxes can attach to or change networks with `sandbox.update()`. The change takes effect on the next session. A running session keeps its current network until it stops.

Available to Enterprise teams with Secure Compute.

Learn more in the [Sandbox documentation](https://vercel.com/docs/sandbox/concepts/secure-compute).