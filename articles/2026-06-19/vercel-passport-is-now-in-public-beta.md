---
title: "Vercel Passport is now in Public Beta"
source: "https://vercel.com/changelog/vercel-passport-is-now-in-public-beta"
publishedDate: "2026-06-17"
category: "frontend"
feedName: "Vercel"
author: "Jas Garcha"
---

Enterprise teams can now control access to their Vercel deployments with [Vercel Passport](https://vercel.com/docs/passport), using their own identity provider.

Visitors authenticate through providers like Okta, Auth0, or any compatible OIDC provider before they can view a protected deployment.

Use Passport to:

-   Reuse an OIDC application across multiple projects
    
-   Set a team default that applies to new projects automatically
    
-   Assign Passport to existing projects in bulk
    

After Passport authenticates a visitor, Vercel injects a signed JWT into the `x-vercel-oidc-passport-token` request header. Read it server-side to access the `external_sub` claim, the stable visitor identifier returned by your identity provider:

app/api/route.ts

```
export async function GET(request: Request) {  const token = request.headers.get('x-vercel-oidc-passport-token');  const payload = JSON.parse(    Buffer.from(token!.split('.')[1], 'base64url').toString()  );  const visitorId = payload.external_sub;}
```

Read the Passport token server-side to identify the visitor

Read the [documentation](https://vercel.com/docs/passport) to get started.