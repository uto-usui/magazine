---
title: "Axios package compromise and remediation steps"
source: "https://vercel.com/changelog/axios-package-compromise-and-remediation-steps"
publishedDate: "2026-03-31"
category: "frontend"
feedName: "Vercel"
author: "Vercel Security"
---

1 min read

Mar 31, 2026

The `axios` npm package was compromised in an [active supply chain attack](https://socket.dev/blog/axios-npm-package-compromised) discovered on March 31, 2026. Vercel investigated this issue and implemented remediation actions to protect the platform. No Vercel systems were affected.

The npm registry removed the compromised package versions, and the latest tag now points to the safe `axios@1.14.0` release.

-   We’ve blocked outgoing access from our build infrastructure to the Command & Control hostname `sfrclak`.com.
    
-   The malicious version of the package has been blocked and unpublished from npm.
    
-   Vercel’s own infrastructure and applications have been unaffected. We recommend checking your supply chain for exposure.
    

### [Link to heading](#affected-versions)Affected versions

Projects using `axios@1.14.1` or `axios@0.30.4` in their build environments are affected by this vulnerability.

-   Check your dependencies and lockfiles for:
    

### [Link to heading](#resolution)Resolution

If your deployments used the malicious package version listed above in your build environment, take the following actions:

-   Search your lockfiles and `node_modules` for `plain-crypto-js` to identify compromised installations
    
-   Redeploy your project to ensure your build uses a clean version of `axios`
    
-   Rotate API keys, database credentials, tokens, and any other sensitive values present in your build environment
    
-   Review your dependency tree for references to `axios@1.14.1` or `axios@0.30.4` and update them to `axios@1.14.0`