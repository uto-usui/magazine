---
title: "Vercel applications are protected from Next.js August 2026 security vulnerabilities"
source: "https://vercel.com/changelog/nextjs-august-2026-security-release"
publishedDate: "2026-08-25"
category: "frontend"
feedName: "Vercel"
author: "Steven Salat"
---

## [Copy link to heading](#summary)Summary

Two vulnerabilities affecting Next.js were disclosed in the August 2026 Security Release. Next.js applications hosted on Vercel are protected and require no customer action.

### [Copy link to heading](#next.js-august-2026-vulnerabilities)Next.js August 2026 vulnerabilities

Next.js disclosed the following critical vulnerabilities:

-   [GHSA-2xp9-vwfh-vxw4](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4) originates in the upstream libheif dependency and can lead to unauthenticated remote code execution when Image Optimization processes a crafted AVIF input.
    
-   [CVE-2026-75604](https://www.cve.org/CVERecord?id=CVE-2026-75604) ([GHSA-p293-qw3h-jr36](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36)) can lead to unauthenticated remote code execution on Windows-hosted Next.js servers in applications using the Pages Router and App Router without Cache Components.
    

After the AVIF vulnerability was identified, Vercel applied protections to its managed Image Optimization service.

## [Copy link to heading](#impact-on-vercel-deployments)Impact on Vercel deployments

Applications hosted on Vercel are protected. No upgrades, configuration changes, or redeploys are required.

-   Once the AVIF vulnerability was identified, Vercel disabled AVIF optimization across its managed Image Optimization service. AVIF inputs are served as-is and do not pass through the affected processing path.
    
-   The second vulnerability only affects servers using a Windows filesystem. Vercel's Next.js runtime uses Linux and is not affected.
    

## [Copy link to heading](#resolution-for-self-hosted-applications)Resolution for self-hosted applications

Self-hosted Next.js applications should upgrade to the appropriate patched version.

For applications running Next.js 15.x or earlier:

terminal

```
npm install next@15.5.24
```

For applications running Next.js 16.x:

terminal

```
npm install next@16.3.3
```

In the patched releases, AVIF images are not resized or optimized. They are served as-is until a fixed libheif version is available. There is no workaround for the Windows vulnerability; affected servers should upgrade immediately.

## [Copy link to heading](#credit)Credit

Thanks to the Hacktron team for responsibly disclosing the AVIF vulnerability, and to [evolutionstorm](https://github.com/evolutionstorm) and [B0RI](https://github.com/B0RI) for responsibly disclosing the Windows vulnerability.

## [Copy link to heading](#references)References