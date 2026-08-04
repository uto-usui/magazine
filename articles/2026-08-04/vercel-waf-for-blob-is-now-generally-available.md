---
title: "Vercel WAF for Blob is now generally available"
source: "https://vercel.com/changelog/vercel-waf-for-blob-is-now-generally-available"
publishedDate: "2026-08-03"
category: "frontend"
feedName: "Vercel"
author: "Agustin Falco"
---

Vercel WAF for Blob is now generally available and supported for production use on all plans. If you protected a store [during the beta](https://vercel.com/changelog/vercel-waf-for-blob-is-now-in-beta), nothing has changed: your rules and setup carry over exactly as they are.

[Vercel WAF](https://vercel.com/docs/vercel-firewall/vercel-waf) protects a Blob store with [custom rules](https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules), the same kind you use to guard your deployments. Rules that match on properties like IP address, country, and path can deny, challenge, or rate limit requests to your stored objects. This requires no changes to your code, your blob URLs, or how you use `@vercel/blob`.

Rules are evaluated at Vercel's edge, so a denied request is turned away before any data transfer occurs. Unwanted traffic to AI-generated media, user uploads, or paid downloads never reaches your store and never generates a bill.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1wSg82jXbEKt55Qd2kptmz%2Fd70dd3226697bd9a21c0c4ffb4d688f6%2F509df9dc-518f-4407-b9ca-ce0a677d5573.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6Y51xK0ZSw60fHX69zSKhw%2F154a4a933afff30cdf190eacacb4226a%2F3f652001-4626-4579-97b1-3d6af869a0cf.png&w=1920&q=75)

To enable protection, open your [Blob store's Settings tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fstores%2Fblob%2F%5Bstore%5D%2Fsettings), and in the Firewall section select **Protect your store**, then Enable firewall. This connects the store to a dedicated team-wide project where your Blob firewall rules live, shared by every store you protect.

Read the [Blob security documentation](https://vercel.com/docs/vercel-blob/security#firewall-and-waf-integration) to protect a store.