---
title: "Manage Vercel Firewall in the CLI"
source: "https://vercel.com/changelog/manage-vercel-firewall-in-the-cli"
publishedDate: "2026-05-12"
category: "frontend"
feedName: "Vercel"
author: "Yash Kothari"
---

1 min read

May 12, 2026

You can now manage the [Vercel Firewall](https://vercel.com/docs/vercel-firewall/vercel-waf) directly from the CLI.

Using the `vercel firewall` command, you can configure [custom rules](https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules), [IP blocks](https://vercel.com/docs/vercel-firewall/vercel-waf/ip-blocking), [system bypasses](https://vercel.com/docs/vercel-firewall/vercel-waf/system-bypass-rules), [attack mode](https://vercel.com/docs/vercel-firewall/attack-mode), and [system mitigations](https://vercel.com/docs/vercel-firewall/ddos-mitigation).

```
vercel firewall rules add --ai "Rate limit /api to 100 requests per minute by IP"vercel firewall ip-blocks block 1.2.3.4vercel firewall system-bypass add 10.0.0.1vercel firewall attack-mode enable --duration 1hvercel firewall system-mitigations pause
```

Manage Vercel Firewall functionality from the CLI

Building on the new CLI commands, the [Vercel Firewall skill](https://skills.sh/vercel/vercel-plugin/vercel-firewall) lets agents interact with the Firewall and includes best practices for rolling out new Firewall rules safely.

```
npx skills add vercel/vercel-plugin --skill vercel-firewall
```

Update to the latest CLI version and run `vercel firewall` to get started. Learn more about the [Vercel Firewall CLI commands.](https://vercel.com/docs/cli/firewall)