---
title: "Shai-Hulud 2.0 Supply Chain Compromise "
source: "https://vercel.com/changelog/shai-hulud-2-0-supply-chain-compromise"
publishedDate: "2025-11-24"
category: "frontend"
feedName: "Vercel"
author: "Aaron Brown"
---

1 min read

Nov 24, 2025

Multiple npm packages from various web services [were compromised](https://helixguard.ai/blog/malicious-sha1hulud-2025-11-24) through account takeover/developer compromise. A malicious actor was able to add a stealthy loader to the package.json file that locates the Bun runtime, silently installs, then executes a malicious script.

Our investigation has shown that no Vercel environment was impacted and we are notifying a small set of customers with affected builds.

### [Link to heading](#impact-to-vercel-customers)Impact to Vercel Customers

Vercel has taken immediate steps to address this for our customers. As an initial step, we reset the cache for projects that pulled in any of the vulnerable packages while we continue to investigate whether any loaders successfully ran.

-   As of this publication, **no Vercel-managed systems** or internal build processes have been impacted.
    
-   **Preliminary analysis** identified **a limited set of Vercel customer builds** referencing the compromised packages.
    
-   Impacted customers are being contacted directly with detailed mitigation steps.
    

We will continue to issue updates throughout our investigation.