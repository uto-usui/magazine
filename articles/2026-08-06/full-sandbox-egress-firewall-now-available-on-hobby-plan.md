---
title: "Full Sandbox egress firewall now available on Hobby plan"
source: "https://vercel.com/changelog/full-sandbox-egress-firewall-now-available-on-hobby-plan"
publishedDate: "2026-08-05"
category: "frontend"
feedName: "Vercel"
author: "Brandon Tuttle"
---

All [Vercel Sandbox](https://vercel.com/docs/sandbox) firewall features are now available on the Hobby plan.

This brings the same network isolation that protects production workloads to the free tier, giving Hobby builders control over exactly what leaves the sandbox while keeping secrets out of the code entirely. Because the firewall attaches secrets to outbound requests itself, sandboxed code can call authenticated services like [AI Gateway](https://vercel.com/ai-gateway) without ever seeing the token.

Define `allow-all`, `deny-all`, or custom network policies with domain and IP-based rules, using matchers to scope each rule by path, method, query string, or headers. Custom policies can safely broker credentials or proxy requests through infrastructure you control. To get started, pass a `networkPolicy` when you create a sandbox.

sandbox.ts

```
import { Sandbox } from '@vercel/sandbox';const sandbox = await Sandbox.create({  networkPolicy: {    allow: {      "ai-gateway.vercel.sh": [{        transform: [{          headers: {            "Authorization": `Bearer ${process.env.AI_GATEWAY_TOKEN}`          }        }],      }],      "*": []    }  }});
```

A custom policy that brokers an AI Gateway token onto outbound requests.

The [Sandbox CLI](https://vercel.com/docs/sandbox/cli-reference) manages the same policies, letting you update them live without restarting the sandbox.

```
# Create a sandbox whose egress is limited to Vercel AI Gatewaysandbox create --name my-sandbox --allowed-domain ai-gateway.vercel.sh# Update the policy live, without restarting the sandboxsandbox config network-policy my-sandbox --network-policy deny-all
```

Creating a locked-down sandbox from the terminal, then denying all egress on the fly.

Network policies reduce data exfiltration risk when running untrusted or AI-generated code. Learn more in the [Sandbox firewall documentation](https://vercel.com/docs/sandbox/concepts/firewall).