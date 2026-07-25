---
title: "Vercel WAF for Blob is now in beta"
source: "https://vercel.com/changelog/vercel-waf-for-blob-is-now-in-beta"
publishedDate: "2026-07-24"
category: "frontend"
feedName: "Vercel"
author: "Agustin Falco"
---

The [Vercel WAF](https://vercel.com/docs/vercel-firewall) can now protect a Vercel Blob store. The same rules that guard your deployments (deny, challenge, rate limit) now apply to blob traffic with no changes to your code, blob URLs, or `@vercel/blob`.

![The Firewall section of a Blob store's settings, marked Beta. The card reads "This store has no firewall protection. Assign a project to protect it," with a Protect your store button.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2GOvYyPhO2Ul2vn4HEe5UT%2F860909970ae725acb624ea885dd5419b%2Fdeacfd58-29cf-493f-8e8e-d5cf8a811065.png&w=1920&q=75)![The Firewall section of a Blob store's settings, marked Beta. The card reads "This store has no firewall protection. Assign a project to protect it," with a Protect your store button.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1jzQHLIafhIT0QVlbYiLSU%2F021ba12faac549c3be7ff9ac111148b5%2F6c3a96d0-1319-412b-8dc5-a2b01faeaa0e.png&w=1920&q=75)

Protect a Blob store from its settings, no code changes required.

Every blob is already served through [Vercel's CDN](https://vercel.com/docs/caching/cdn-cache), so protection is a switch on the store, not a new proxy. Stop scrapers, geo-restrict downloads, rate limit expensive assets, or block abusive IPs before a byte is served.

Rules evaluate at the edge, matching on IP, country, path, and [more](https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules):

-   Deny returns a `403` and stops the request early, so no data transfer is incurred.
    
-   Challenge serves the standard browser challenge, and a request that fails it is blocked.
    
-   Rate limit returns a `429` when a client exceeds your limit.
    
-   Redirect and log behave as they do for deployment traffic.
    

The OWASP Core Ruleset is not supported, since it targets dynamic application traffic, not object delivery.

### [Copy link to heading](#protecting-a-store)Protecting a store

Setup is a single switch in the dashboard:

-   Open [your Blob store](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fstores%2Fblob%2F%5Bstore%5D%2Fsettings&title=Go+to+your+Blob+store), select **Settings**, then **Protect your store**.
    
-   Vercel connects it to a shared `vercel-blob-default-project` on your team. You author its rules with the standard rule builder, and they take effect immediately.
    
-   One rule set covers every protected store, so rules can't be scoped per store.
    

During the beta, setup is dashboard-only, and challenges need a browser to solve, so server-side `@vercel/blob` requests matching a challenge rule are blocked. Use challenge rules for browser traffic.

Vercel WAF for Blob is available in beta on all plans. See the [documentation](https://vercel.com/docs/vercel-blob/security#firewall-and-waf-integration) for the full setup.