---
title: "Protection against React Router and Remix vulnerabilities"
source: "https://vercel.com/changelog/protection-against-react-router-and-remix-vulnerabilities-cve-2025-43864"
publishedDate: "2025-04-26"
category: "frontend"
feedName: "Vercel"
author: "Casey Gowrie"
---

2 min read

Apr 26, 2025

Security researchers reviewing the Remix web framework have discovered two high-severity vulnerabilities in React Router. Vercel proactively deployed mitigation to the Vercel Firewall and **Vercel customers are protected**.

[CVE-2025-43864](https://nvd.nist.gov/vuln/detail/CVE-2025-43864) and [CVE-2025-43865](https://nvd.nist.gov/vuln/detail/CVE-2025-43865) enable an external party to modify the response using certain request headers, which can lead to cache poisoning Denial of Service (DoS). CVE 43865 enables vulnerabilities such as stored Cross Site Scripting (XSS).

## [Link to heading](#impact-and-analysis)Impact and analysis

When we learned about the vulnerability, we started analyzing the impact to the Vercel platform. Here are our findings and recommendations:

-   We were able to reproduce the vulnerability and demonstrate that cache poisoning is trivial, including stored Cross Site Scripting (XSS) injections
    
-   The only precondition is that the customer used an impacted version of Remix / React Router (v7.0.0 branch prior to version v7.5.2) and `Cache-Control` headers
    
-   The impact can extend to any visitor of the application after the cache is poisoned, regardless of authentication state or any other request headers
    
-   Vercel customers using React Router between v7.0.0 and v7.5.1 were impacted before our Firewall mitigation
    
-   We have deployed mitigations for attacks by stripping the `X-React-Router-Spa-Mode` and `X-React-Router-Prerender-Data` headers from the request in the Vercel Firewall. New requests are now protected across all deployments on the Vercel platform. We confirmed our mitigation approach with the Remix / React Router team.
    
-   In addition to mitigating future requests, we have preemptively purged CDN response caches on our network out of caution.
    

Both issues have been patched in React Router 7.5.2. We recommend updating to the latest version and redeploying.

If you are using additional layers of caching, including Cloudflare or other CDNs, we recommend purging those caches separately. Thank you to [zhero](https://x.com/zhero___) for disclosing the vulnerability.