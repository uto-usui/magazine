---
title: "Advanced egress firewall filtering for Vercel Sandbox"
source: "https://vercel.com/changelog/advanced-egress-firewall-filtering-for-vercel-sandbox"
publishedDate: "2026-02-11"
category: "frontend"
feedName: "Vercel"
author: "Valerian Roche"
---

2 min read

Feb 11, 2026

[Vercel Sandbox](https://vercel.com/docs/vercel-sandbox) can now enforce egress network policies through Server Name Indication (SNI) filtering and CIDR blocks, giving you control over which hosts a sandbox can reach. Outbound TLS connections are matched against your policy at the handshake, unauthorized destinations are rejected before any data is transmitted.

By default, sandboxes have unrestricted internet access. When running untrusted or AI generated code, you can lock down the network to only the services your workload actually needs. A compromised or hallucinated code snippet cannot exfiltrate data or make unintended API calls, traffic to any domain not on your allowlist is blocked.

### [Link to heading](#going-beyond-ip-based-rules-to-host-based)Going beyond IP based rules to host based

The modern internet runs on hostnames, not IP addresses, a handful of addresses serve thousands of domains. Traditional IP-based firewall rules can't precisely distinguish between them.

Host-based egress control typically requires an HTTP proxy, but that breaks non-HTTP protocols like Redis and Postgres. Instead, we built an SNI-peeking firewall that inspects the initial unencrypted bytes of a TLS handshake to extract the target hostname. Since nearly all internet traffic is TLS-encrypted today, this covers all relevant cases. For legacy or non-TLS systems, we do also support IP/CIDR-based rules as a fallback.

### [Link to heading](#restrict-to-specific-hosts-at-creation)Restrict to specific hosts at creation

Define which domains the sandbox can reach. Everything else is denied by default. Wildcard support makes it easy to allowlist services behind CDNs:

```
import { Sandbox } from '@vercel/sandbox';const sandbox = await Sandbox.create({  networkPolicy: {    allow: ['ai-gateway.vercel.sh', '*.vercel.com'],  },});// Can reach Vercel AI Gateway and Vercel, nothing elseawait sandbox.runCommand('node', ['process-data.js']);
```

### [Link to heading](#adjust-after-initial-setup)Adjust after initial setup

Policies can be updated dynamically on a running sandbox without restarting the process. Start with full internet access to install dependencies, lock it down before executing untrusted code, reopen to stream results after user approval, and then air gap again with `deny-all`, fully in one session:

```
import { Sandbox } from '@vercel/sandbox';const sandbox = await Sandbox.create();// Phase 1: Open network, download everything we needawait sandbox.runCommand('npm', ['install']);await sandbox.runCommand('aws', ['s3', 'cp', 's3://my-bucket/input-data', './data', '--recursive']);// Phase 2: Lock down, only the AI gateway is reachableawait sandbox.updateNetworkPolicy({  allow: ['ai-gateway.vercel.sh'],});// Run the untrusted / agent-driven workload in isolationawait sandbox.runCommand('node', ['agent.js']);// Phase 3: Open a narrow hole to post results backawait sandbox.updateNetworkPolicy({  allow: ['my-bucket.s3.amazonaws.com'],});await sandbox.runCommand('aws', ['s3', 'cp', './output/results.json', 's3://my-bucket/output/results.json']);// Phase 4: Lockdown Internet accessawait sandbox.updateNetworkPolicy('deny-all');
```

Read the [documentation](https://vercel.com/docs/vercel-sandbox/concepts/firewall) to learn more about network egress firewall policies, available on all plans.