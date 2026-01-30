---
title: "Critical npm supply chain attack response - September 8, 2025"
source: "https://vercel.com/blog/critical-npm-supply-chain-attack-response-september-8-2025"
publishedDate: "2025-09-08"
category: "frontend"
feedName: "Vercel"
author: "Aaron Brown"
---

2 min read

Sep 8, 2025

On September 9, 2025, the campaign extended to DuckDB-related packages after the `duckdb_admin` account was breached. These releases contained the same wallet-drainer malware, confirming this was part of a coordinated effort targeting prominent npm maintainers.

While Vercel customers were not impacted by the DuckDB incident, we continue to track activity across the npm ecosystem with our partners to ensure deployments on Vercel remain secure by default.

## [Link to heading](#overview)Overview

On September 8, 2025, a [supply chain attack compromised 18 popular npm packages](https://www.aikido.dev/blog/npm-debug-and-chalk-packages-compromised) including `chalk`, `debug`, and `ansi-styles`. The injected code was designed to intercept cryptocurrency transactions in browsers.

Our security and engineering teams identified all affected Vercel projects in the initial compromise and purged build caches. Impacted customers were notified with [specific guidance](https://vercel.com/blog/critical-npm-supply-chain-attack-response-september-8-2025#recommendations). No Vercel customers were affected in the DuckDB incident.

## [Link to heading](#impact)Impact

The malicious code injected into these packages:

-   Executed in client-side browsers when bundled into web applications
    
-   Intercepted cryptocurrency and web3 wallet interactions
    
-   Redirected payment destinations to attacker-controlled addresses
    

Analysis identified 70 Vercel teams with builds containing the compromised package versions across 76 unique projects.

## [Link to heading](#resolution)Resolution

Our incident response team:

1.  **Identified all affected projects** through our deployment dependency tracking system
    
2.  **Purged build caches** for all 76 unique affected projects to prevent serving malicious code
    
3.  **Notified affected customers** with specific project lists requiring rebuilds
    

The malicious package versions have been removed from npm. Projects rebuilt after our cache purge use clean package versions.

## [Link to heading](#timeline)Timeline

-   Initial reports of malicious activity in npm packages
    
-   **17:39 UTC** - Vercel incident response activated
    
-   **22:19 UTC** - Build caches purged for affected projects
    

## [Link to heading](#technical-details)Technical details

The attack originated from a phishing campaign targeting npm package maintainers. The attacker used the domain `npmjs.help` (now taken down) to harvest credentials through a convincing two-factor authentication update email:

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5tM4vLlfmeLdOEIHdS0kn9%2Ffc45fbb4a675a7e766cc7b511c29f21b%2FScreenshot_2025-09-08_214245.png&w=1920&q=75)

The email created false urgency with a 48-hour deadline, claiming accounts would be locked starting September 10, 2025. We strongly encourage npm package authors to look out for this attack pattern and verify any security-related emails by navigating directly to [npmjs.com](https://www.npmjs.com/) rather than clicking email links.

## [Link to heading](#recommendations)Recommendations

**For affected customers:**

-   Rebuild projects listed in our notification email
    
-   Review your dependency update practices
    
-   Consider implementing package version pinning
    

**For all customers:**

-   Use `npm audit` to check for known vulnerabilities
    
-   Implement dependency scanning in CI/CD pipelines
    
-   Consider using `npm ci` with lockfiles in production builds
    
-   Enable npm package provenance where available
    

## [Link to heading](#prevention-measures)Prevention measures

We continue to strengthen our supply chain security posture:

-   Enhanced monitoring for suspicious package updates
    
-   Improved tooling for rapid cache invalidation during incidents
    

This incident reinforces the importance of defense-in-depth strategies for supply chain security. While we cannot prevent all upstream compromises, we can minimize impact through rapid detection and response.

## [Link to heading](#credit)Credit

Thanks to Aikido Security for early detection and the npm community's rapid response in addressing the compromised packages.

## [Link to heading](#references)References

_For questions about this incident, please contact_ [_security@vercel.com_](mailto:security@vercel.com)