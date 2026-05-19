---
title: "Firewall‑mitigated traffic is free on Vercel"
source: "https://vercel.com/changelog/web-application-firewall-mitigated-traffic-is-free-on-vercel"
publishedDate: "2026-05-18"
category: "frontend"
feedName: "Vercel"
author: "Sudais Moorad"
---

1 min read

May 18, 2026

Vercel Firewall now waives CDN Requests and Fast Data Transfer for any traffic denied, challenged, or rate‑limited by Web Application Firewall (WAF).

Vercel has always provided unlimited DDoS mitigation at no cost. Vercel WAF, included in CDN cost, gives you custom rules, managed rules, and rate limiting for bad traffic that isn't DDoS. With this change, you don't pay for requests or bandwidth that WAF denies, challenges, or rate‑limits.

That means no surprise bill when a scraper hammers your product pages, a credential‑stuffing botnet hits your login route, or a bot abuses an expensive endpoint.

The waiver applies automatically to every project using Vercel Firewall and no configuration is required.  
Learn how to implement WAF rules in the [Firewall documentation](https://vercel.com/docs/vercel-firewall).