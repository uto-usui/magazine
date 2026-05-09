---
title: "Next.js May 2026 security release"
source: "https://vercel.com/changelog/next-js-may-2026-security-release"
publishedDate: "2026-05-07"
category: "frontend"
feedName: "Vercel"
author: "Jimmy Lai"
---

2 min read

May 7, 2026

## [Link to heading](#summary)Summary

We have shipped a coordinated security release for Next.js addressing 13 advisories across denial of service, middleware and proxy bypass, server-side request forgery, cache poisoning, and cross-site scripting. One advisory addresses an upstream React Server Components vulnerability tracked as [CVE-2026-23870](https://github.com/facebook/react/security/advisories/GHSA-rv78-f8rc-xrxh).

### [Link to heading](#recommended-actions)Recommended actions

Patched versions are available for both React and Next.js, and all [affected users](#affected-versions) should upgrade immediately.

## [Link to heading](#impact)Impact

The release addresses the following advisories:

### [Link to heading](#middleware-and-proxy-bypass)Middleware and proxy bypass

Affects applications that rely on `middleware.js` or `proxy.js` for authorization.

### [Link to heading](#denial-of-service)**Denial of service**

Affects applications using Server Functions, Partial Prerendering with Cache Components, or the Image Optimization API.

### [Link to heading](#server-side-request-forgery)**Server-side request forgery**

Affects applications that handle WebSocket upgrade requests.

### [Link to heading](#cache-poisoning)**Cache poisoning**

Affects applications with caching layers in front of React Server Component responses.

### [Link to heading](#cross-site-scripting)**Cross-site scripting**

Affects applications using CSP nonces in App Router, or `beforeInteractive` scripts that consume untrusted input.

## [Link to heading](#resolution)Resolution

These vulnerabilities are addressed by the patched releases of React and Next.js. Patching is the only complete mitigation, and all [affected users](#affected-versions) should upgrade immediately.

Vercel has not deployed new WAF rules for this release; these advisories cannot be reliably blocked at the WAF layer.

## [Link to heading](#affected-versions)Affected versions

Package

Affected

Upgrade to

**Next.js** `13.x`, `14.x`

`all versions`

`15.5.18` or `16.2.6`

**Next.js** `15.x`

`<=15.5.17`

`15.5.18`

**Next.js** `16.x`

`<=16.2.5`

`16.2.6`

**react-server-dom-\*** `19.0.x`

`<=19.0.5`

`19.0.6`

**react-server-dom-\*** `19.1.x`

`<=19.1.6`

`19.1.7`

**react-server-dom-\*** `19.2.x`

`<=19.2.5`

`19.2.6`

## [Link to heading](#fixed-in)Fixed in

-   **Next.js**: [`15.5.18`](https://github.com/vercel/next.js/releases/tag/v15.5.18), [`16.2.6`](https://github.com/vercel/next.js/releases/tag/v16.2.6)
    
-   **React**: [`19.0.6`](https://github.com/facebook/react/releases/tag/v19.0.6), [`19.1.7`](https://github.com/facebook/react/releases/tag/v19.1.7), [`19.2.6`](https://github.com/facebook/react/releases/tag/v19.2.6) for the `react-server-dom-parcel`, `react-server-dom-webpack` and `react-server-dom-turbopack` packages
    

Frameworks and bundlers using `react-server-dom-*` packages should install the latest versions provided by their respective maintainers.

## [Link to heading](#references)References