---
title: "Nuxt July 2026 security advisory"
source: "https://vercel.com/changelog/nuxt-july-2026-security-advisory"
publishedDate: "2026-07-27"
category: "frontend"
feedName: "Vercel"
author: "Daniel Roe"
---

The [Nuxt](https://nuxt.com/) team has released Nuxt 4.5.1 and 3.21.10, along with `@nuxt/devtools` 3.3.1, to address eight security advisories, including a high-severity server-side remote code execution vulnerability.

## [Copy link to heading](#vulnerabilities-addressed)Vulnerabilities addressed

**Vulnerability**

**Severity**

**Advisory**

Server-side remote code execution via server island props

High

[GHSA-9473-5f9j-94wq](https://github.com/nuxt/nuxt/security/advisories/GHSA-9473-5f9j-94wq)

Unauthorized component instantiation via server island props

Medium

[GHSA-48hr-524c-v5w3](https://github.com/nuxt/nuxt/security/advisories/GHSA-48hr-524c-v5w3)

Route rule authorization bypass

High

[GHSA-hxvh-4h3w-prp9](https://github.com/nuxt/nuxt/security/advisories/GHSA-hxvh-4h3w-prp9)

Server component denial of service

High

[GHSA-hxcr-hm88-mpq6](https://github.com/nuxt/nuxt/security/advisories/GHSA-hxcr-hm88-mpq6), [GHSA-9pgf-384g-p7mv](https://github.com/nuxt/nuxt/security/advisories/GHSA-9pgf-384g-p7mv)

Cross-user disclosure of cached payloads, affecting Nuxt 4.x versions 4.4.0 and later

High

[GHSA-wm8w-6qjm-cv43](https://github.com/nuxt/nuxt/security/advisories/GHSA-wm8w-6qjm-cv43)

Development server path disclosure

Low

[GHSA-7c4v-fwgw-9rf7](https://github.com/nuxt/nuxt/security/advisories/GHSA-7c4v-fwgw-9rf7)

Remote code execution in Nuxt DevTools, development-only, fixed in `@nuxt/devtools` 3.3.1

Critical

[GHSA-279x-mwfv-vcqv](https://github.com/nuxt/nuxt/security/advisories/GHSA-279x-mwfv-vcqv)

## [Copy link to heading](#vercel-platform-protections)Vercel platform protections

Vercel received advance notice of the server-side remote code execution vulnerability, [GHSA-9473-5f9j-94wq](https://github.com/nuxt/nuxt/security/advisories/GHSA-9473-5f9j-94wq), and deployed platform-wide WAF mitigations before public disclosure.

Applications deployed on Vercel are automatically protected by these mitigations, with no configuration changes required. However, do not rely on them for full protection. Upgrading to a patched version is still required.

The WAF mitigations cover only direct exploitation of the server-side RCE. The remaining component-instantiation, caching, authorization, denial-of-service, and development-time vulnerabilities require upgrading Nuxt and Nuxt DevTools.

## [Copy link to heading](#recommended-action)Recommended action

All Nuxt users should upgrade as soon as possible:

-   Nuxt 4: `4.5.1` or later
    
-   Nuxt 3: `3.21.10` or later
    
-   Nuxt DevTools: `3.3.1` or later
    

To upgrade, run:

```
npx nuxt upgrade --dedupe
```

Upgrading to the latest patched Nuxt release

This also refreshes the lockfile, pulling in the patched Nuxt DevTools version.

Users who previously upgraded for the earlier route rule advisory, CVE-2026-53721, must still upgrade. The newly disclosed authorization bypass is a regression in that earlier fix.

Nuxt 4 users who cache authenticated pages containing user-specific data should also follow Nuxt’s guidance and purge any upstream caches that may still contain payloads generated before the fix.

Vercel platform protections provide an additional layer of defense, but they are not a replacement for upgrading affected dependencies.

Read the [Nuxt security announcement](https://nuxt.com/blog/v4-5-security) for affected configurations and complete remediation guidance.