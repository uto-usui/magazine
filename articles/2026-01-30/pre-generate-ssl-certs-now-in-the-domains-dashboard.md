---
title: "Pre-generate SSL certs, now in the Domains dashboard"
source: "https://vercel.com/changelog/pre-generate-domain-ssl-certs-now-in-dashboard"
publishedDate: "2025-06-05"
category: "frontend"
feedName: "Vercel"
author: "Ryan Haraki"
---

1 min read

Jun 5, 2025

You can now pre-generate SSL certificates directly from the Vercel Domains dashboard, enabling zero-downtime domain migrations without using the CLI.

After adding an existing domain to your project, select Pre-Generate Certificate to issue certificates before updating DNS records and initiating the remainder of your domain migration.

You can still import a zone file or [use Domain Connect](https://vercel.com/changelog/automated-dns-configuration-with-domain-connect-3kcmg61eR38Q5MzKc4D6P) to migrate DNS records from your previous provider.

[Try it out](https://vercel.com/d?to=/%5Bteam%5D/~/domains/&title=Pre-Generate+your+SSL+certificates) or learn more in [the docs](https://vercel.com/docs/domains/pre-generating-ssl-certs).