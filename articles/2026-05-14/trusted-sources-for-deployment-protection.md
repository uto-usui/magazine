---
title: "Trusted Sources for Deployment Protection"
source: "https://vercel.com/changelog/trusted-sources-for-deployment-protection"
publishedDate: "2026-05-13"
category: "frontend"
feedName: "Vercel"
author: "Kit Foster"
---

1 min read

May 13, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2kfGtNDULCkyVEjOaA6GCq%2Fd973810bd2a3d93c20b4778883982da5%2FScreenshot_2026-05-05_at_14.39.14.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FERMcyd46Qpjfox7u349O3%2F338f1c00de8e16036f1aa01cd64f2b40%2FScreenshot_2026-05-05_at_14.39.23.png&w=1920&q=75)

[Trusted Sources](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/trusted-sources) lets protected deployments accept [short-lived identity tokens (OIDC)](https://vercel.com/docs/oidc) from Vercel projects and external services you authorize, so you no longer have to share a long-lived [Protection Bypass for Automation](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation) secret. Trusted Sources is the recommended approach, but Protection Bypass for Automation continues to work

Callers attach an OIDC token in the `x-vercel-trusted-oidc-idp-token` header. Vercel then verifies the signature, checks the claims you configured, and confirms the environment matches the rule.

### [Link to heading](#authorize-vercel-projects)Authorize Vercel projects

By default, the [Vercel OIDC token](https://vercel.com/docs/oidc/reference) for a project can call its own deployments. To authorize another project in the same team, add it to Trusted Sources.

Self-access and cross-project rules are both customizable with `from`/`to` environment pairs. To authenticate a request from a project, forward its Vercel OIDC token:

function.ts

```
import { getVercelOidcToken } from '@vercel/oidc';await fetch('https://protected-project.vercel.app/api/data', {    headers: { 'x-vercel-trusted-oidc-idp-token': await getVercelOidcToken() },});
```

Vercel Function example

### [Link to heading](#authorize-external-services)Authorize external services

Any custom OIDC provider can be authorized as a trusted external service, such as GitHub Actions, or a Vercel project in another team.

workflow.yaml

```
- uses: actions/github-script@v7  id: token  with:    script: |      const token = await core.getIDToken();      core.setSecret(token);      core.setOutput('token', token);- run: |    curl -sSf https://protected-project.vercel.app/api/data \      -H "x-vercel-trusted-oidc-idp-token: ${{ steps.token.outputs.token }}"
```

GitHub Action example

Read the [documentation](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/trusted-sources) to learn more.