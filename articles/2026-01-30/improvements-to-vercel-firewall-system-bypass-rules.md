---
title: "Improvements to Vercel Firewall system bypass rules"
source: "https://vercel.com/changelog/improvements-to-vercel-firewall-system-bypass-rules"
publishedDate: "2025-02-28"
category: "frontend"
feedName: "Vercel"
author: "Sage Abraham"
---

1 min read

Feb 28, 2025

[System bypass rules](https://vercel.com/docs/security/vercel-waf/system-bypass-rules) allow Pro and Enterprise customers to configure firewall rules to skip Vercel system mitigations, including [DDoS protection](https://vercel.com/docs/security/ddos-mitigation#system-bypass-rules), for specific IPs and CIDR ranges. Although we strongly recommend against disabling protections, customers—particularly ones that deploy a proxy in front of Vercel—may experience traffic issues that can be mitigated by deploying system bypass rules.

Improvements to the system bypass rules give customers additional control over how the rules are deployed, including:

-   Expanded support beyond production domains to preview domains
    
-   Added support for single domain rules for preview deployment URLs and aliases
    
-   Expanded project-scoped bypass rules to include all domains connected to a project
    
-   Increased limits for system bypass rules for Pro to 25 and Enterprise to 100 (from 3 and 5 respectively)
    

Learn more about the [Vercel Firewall](https://vercel.com/docs/security/vercel-firewall).