---
title: "Vercel CLI now supports verifying DNS configuration"
source: "https://vercel.com/changelog/vercel-cli-now-supports-verifying-dns-configuration"
publishedDate: "2026-06-23"
category: "frontend"
feedName: "Vercel"
author: "Can Temizyurek"
---

You can now use the Vercel CLI to diagnose a domain's DNS configuration.

Using the `vercel domains verify` command, you can check whether a domain is correctly configured, attached to the right project, and verified. If not, it returns the exact steps to fix it.

```
▲ vercel domains verify example.com --project my-site> Checked example.com under my-team 1.23sStatus  DNS Configuration    ✘ Invalid Configuration  Project              ✔ Verified for my-siteWhat to fix  1. Point example.com to Vercel with one of the following options:     a) Add an A record:        A    @    76.76.21.21     b) Switch to the Vercel nameservers:        ns1.vercel-dns.com        ns2.vercel-dns.comCurrently resolves to  Type    Value  A       1.2.3.4Nameservers  ns1.provider.com  ns2.provider.com
```

vercel domains verify output showing an invalid DNS configuration.

`vercel domains verify` inspects ownership, DNS records, nameservers, DNSSEC, conflicting records, and project attachment, and tells you precisely what to change. When the domain is correctly configured, you get a single line back:

```
▲ vercel domains verify example.com --project my-site> Success! Valid Configuration: example.com is configured (A record) and verified for project my-site 0.41s
```

Output when the domain is correctly configured and verified.

With `--format json`, the command returns the full diagnosis: status, reason, recommended records, detected conflicts, and suggested next commands. It exits non-zero when misconfigured or unverified, making it scriptable for CI and automation:

```
▲ vercel domains verify example.com --format json{   "status":"action_required",   "reason":"invalid_configuration",   "message":"example.com has an invalid DNS configuration. Apply the recommended DNS changes, then retry verification.",   "ok":false,   "recommended":{      "records":[         {            "type":"A",            "name":"@",            "value":"76.76.21.21"         }      ],      "nameservers":[         "ns1.vercel-dns.com",         "ns2.vercel-dns.com"      ]   },   "conflicts":[],   "next":[      {         "command":"vercel domains verify example.com",         "when":"Re-check after completing the required changes"      }   ]}
```

Full JSON diagnosis including status, reason, recommended records, and suggested next commands.

You can also scope to a project, enforce exact matching, or run non-interactively:

```
vercel domains verify example.com --project my-sitevercel domains verify example.com --strictvercel domains verify example.com --format jsonvercel domains verify example.com --non-interactivevercel domains verify --help
```

Common vercel domains verify flags.

Upgrade your Vercel CLI to version `54.15.1` to get started. Learn more in the [vercel domains verify documentation](https://file+.vscode-resource.vscode-cdn.net/docs/cli/domains#verify).