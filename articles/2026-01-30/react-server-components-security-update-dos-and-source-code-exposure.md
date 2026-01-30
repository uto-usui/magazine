---
title: "React Server Components security update: DoS and Source Code Exposure"
source: "https://vercel.com/changelog/react-server-components-security-update-dos-and-source-code-exposure"
publishedDate: "2025-12-11"
category: "frontend"
feedName: "Vercel"
author: "Liz Hurder"
---

2 min read

Dec 11, 2025

> _See the_ [_Security Bulletin_](https://vercel.com/kb/bulletin/security-bulletin-cve-2025-55184-and-cve-2025-55183) _for the latest updates._

## [Link to heading](#summary)**Summary**

Two additional vulnerabilities in React Server Components have been identified: a high-severity Denial of Service ([CVE-2025-55184](https://www.cve.org/CVERecord?id=CVE-2025-55184)) and a medium-severity Source Code Exposure ([CVE-2025-55183](https://www.cve.org/CVERecord?id=CVE-2025-55183)). These issues were discovered while security researchers examined the patches for the original React2Shell vulnerability. The initial fix was incomplete and did not fully prevent denial-of-service attacks for all payload types, resulting in [CVE-2025-67779](https://www.cve.org/CVERecord?id=CVE-2025-67779).

**Importantly, none of these new issues allow for Remote Code Execution.**

We created new rules to address these vulnerabilities and deployed them to the Vercel WAF to automatically protect all projects hosted on Vercel at no cost. However, do not rely on the WAF for full protection. Immediate upgrades to a patched version are required.

## [Link to heading](#impact)**Impact**

### [Link to heading](#denial-of-service-\(cve-2025-55184\))**Denial of Service (**[**CVE-2025-55184**](https://www.cve.org/CVERecord?id=CVE-2025-55184)**)**

A malicious HTTP request can be crafted and sent to any App Router endpoint that, when deserialized, can cause the server process to hang and consume CPU.

### [Link to heading](#source-code-exposure-\(cve-2025-55183\))**Source Code Exposure (**[**CVE-2025-55183**](https://www.cve.org/CVERecord?id=CVE-2025-55183)**)**

A malicious HTTP request can be crafted and sent to any App Router endpoint that can return the compiled source code of Server Actions. This could reveal business logic, but would not expose secrets unless they were hardcoded directly into Server Action's code.

These vulnerabilities are present in versions `19.0.0`, `19.0.1`, `19.1.0`, `19.1.1`, `19.1.2`, `19.2.0`, and `19.2.1` of the following packages:

-   `react-server-dom-parcel`
    
-   `react-server-dom-webpack`
    
-   `react-server-dom-turbopack`
    

These packages are included in the following frameworks and bundlers:

-   **Next.js**: `13.x`, `14.x`, `15.x`, and `16.x`.
    
-   Other frameworks and plugins that embed or depend on React Server Components implementation (e.g., Vite, Parcel, React Router, RedwoodSDK, Waku)
    

## [Link to heading](#resolution)**Resolution**

After creating mitigations to address these vulnerabilities, we deployed them across our globally-distributed platform to protect our customers. We still recommend upgrading to the latest patched version.

Updated releases of React and affected downstream frameworks include fixes to prevent these issues. All users should upgrade to a patched version as soon as possible.

## [Link to heading](#fixed-in)**Fixed in**

-   **React:** `19.0.2,` `19.1.3,` `19.2.2`.
    
-   **Next.js:** `14.2.35,` `15.0.7,` `15.1.11,` `15.2.8,` `15.3.8,` `15.4.10,` `15.5.9,` `15.6.0-canary.60,` `16.0.10,` `16.1.0-canary.19`.
    

Frameworks and bundlers using the aforementioned packages should install the latest versions provided by their respective maintainers.

## [Link to heading](#credit)**Credit**

Thanks to [RyotaK](https://ryotak.net/) from GMO Flatt Security Inc. and [Andrew MacPherson](https://github.com/AndrewMohawk) for identifying and responsibly reporting these vulnerabilities, and the Meta Security and React teams for their partnership.

## [Link to heading](#references)**References**