---
title: "Deployment Protection now supports protected rewrites"
source: "https://vercel.com/changelog/deployment-protection-now-supports-protected-rewrites"
publishedDate: "2024-10-11"
category: "frontend"
feedName: "Vercel"
author: "Kit Foster"
---

1 min read

Oct 11, 2024

We've improved how [Vercel Authentication](https://vercel.com/docs/security/deployment-protection/methods-to-protect-deployments/vercel-authentication) handles rewrites between protected deployments. If you have access to the deployment and it belongs to the same team as the original deployment, we now automatically grant access to the rewritten deployment.

Previously, when rewriting to a protected deployment, [Vercel Authentication](https://vercel.com/docs/security/deployment-protection/methods-to-protect-deployments/vercel-authentication) would redirect through `vercel.com` to authenticate the user, causing the rewrite to become a redirect.

Automatic access between protected rewrites is only applicable if you are already authenticated with Vercel on the original deployment. This new behavior does not apply to rewrites when you authenticate using [Shareable Links](https://vercel.com/docs/security/deployment-protection/methods-to-bypass-deployment-protection/sharable-links), [Protection Bypass for Automation](https://vercel.com/docs/security/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation), or [Password Protection](https://vercel.com/docs/security/deployment-protection/methods-to-protect-deployments/password-protection).

Read more about [Deployment Protection](https://vercel.com/docs/security/deployment-protection) in our docs.