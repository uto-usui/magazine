---
title: "Vercel CLI expands support for DNS, domains, and project commands"
source: "https://vercel.com/changelog/vercel-cli-expands-support-for-dns-domains-and-project-commands"
publishedDate: "2026-08-21"
category: "frontend"
feedName: "Vercel"
author: "David Lee"
---

The Vercel CLI now provides dedicated commands for managing DNS records, domains, and projects. This brings more of the functionality available through the Vercel dashboard and API to the terminal, where it can be used interactively, in scripts, or by agents.

## [Copy link to heading](#inspect-and-update-dns-records)Inspect and update DNS records

Retrieve the complete configuration for a DNS record or update it in place using its record ID.

`vercel dns update` supports changes to the record name, type, value, TTL, MX priority, and comment. SRV records can also be updated using their priority, weight, port, and target fields.

## [Copy link to heading](#renew-domains-bought-on-vercel)Renew domains bought on Vercel

Renew a domain on demand or control whether it renews automatically.

The renewal command displays the current renewal price and asks for confirmation before completing the purchase.

## [Copy link to heading](#control-project-state-and-observability)Control project state and observability

Pause or resume a project and configure its observability features directly from the CLI. Web Analytics and Speed Insights could already be enabled from the CLI; they can now be disabled as well.

## [Copy link to heading](#add-and-remove-project-members)Add and remove project members

Add a project member with a specific role or remove an existing member.

All of the new commands support structured JSON output for scripts and agents. Billable or destructive actions require explicit confirmation.

Update to the latest version of the Vercel CLI to get started:

```
npm i -g vercel@latest
```

Learn more in the [Vercel CLI documentation](https://vercel.com/docs/cli).