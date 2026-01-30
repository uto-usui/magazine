---
title: "Unified security actions dashboard"
source: "https://vercel.com/changelog/unified-security-actions-dashboard"
publishedDate: "2025-12-08"
category: "frontend"
feedName: "Vercel"
author: "wits"
---

1 min read

Dec 8, 2025

Vercel now provides [a unified dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Ffixes&title=View+Security+Actions+Dashboard) that surfaces any security issues requiring action from your team. When a critical vulnerability or security-related task is detected, the dashboard automatically groups your affected projects and guides you through the steps needed to secure them.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3E2E7tJAxU3bhGQ3dAyMKf%2Fda4a6783c0ead2d8946b3dc510af1133%2F2025-12-08_at_10.37.06_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fh7mB0kfyXaEuz3KaklEGX%2Fa718e4aed7986997c353af3a5d0f5ecc%2F2025-12-08_at_10.38.09_2x.png&w=1920&q=75)

This view appears as a banner whenever action is required, and can be accessed anytime through the dashboard search.

Most CVEs are handled automatically through WAF rules and other protections, but when user action is needed, they will appear here.

-   **Automatic detection of security vulnerabilities that require user intervention -** When the platform identifies a vulnerability or configuration that cannot be fully mitigated by Vercel’s autonomous protections, it’s surfaced here with clear instructions.
    
-   **Project grouping based on required actions -** Current categories include unpatched dependencies, manual fix required, unprotected preview deployments. Additional groups will appear over time as new protections and checks are added.
    
-   **Support for both automated remediation -** When possible, [Vercel Agent offers one-click automated upgrades and PRs](https://vercel.com/changelog/automated-react2shell-vulnerability-patching-is-now-available).
    
-   **Support for manual remediation -** For cases requiring manual updates or where GitHub access isn’t available, we provide direct instructions such as: `npx fix-react2shell-next`
    

### [Link to heading](#stay-secure-with-less-effort)Stay secure with less effort

The unified dashboard helps teams act quickly during critical moments, consolidate required fixes in one place, and maintain a stronger security posture across all projects.

Explore the dashboard to [view any required updates](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Ffixes&title=View+Security+Actions+Dashboard).