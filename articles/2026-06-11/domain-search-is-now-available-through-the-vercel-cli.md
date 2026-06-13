---
title: "Domain Search is now available through the Vercel CLI"
source: "https://vercel.com/changelog/domain-search-is-now-available-through-the-vercel-cli"
publishedDate: "2026-06-09"
category: "frontend"
feedName: "Vercel"
author: "Can Temizyurek"
---

1 min read

Jun 9, 2026

You can now use the Vercel CLI to search domains. Using the `vercel domains search` command, you can supply a domain name and retrieve availability and price results for all TLDs that Vercel supports.

```
~ vercel domains search acmesite --limit 5> Domain        Availability  Purchase        Renewal  acmesite.com  Unavailable   -               -  acmesite.dev  Available     $13 / 1 year    $13 / 1 year  acmesite.app  Available     $14.99 / 1 year $15 / 1 year  acmesite.io   Available     $37.99 / 1 year $46 / 1 year  acmesite.ai   Available     $160 / 2 years  $160 / 2 years> To continue, run `vercel domains search acmesite --next eyJxdWVyeSI6ImFjbWVza...
```

You can also filter by TLD, apply sorting, and filter out unavailable domains.

```
vercel domains search acmesite --tld com --tld aivercel domains search acmesite --availablevercel domains search acmesite --order alphabeticalvercel domains search acmesite --format jsonvercel domains search --help
```

Upgrade your Vercel CLI to version `54.10.1` to get started.