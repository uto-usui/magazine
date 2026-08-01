---
title: "Vercel Passport is now generally available"
source: "https://vercel.com/changelog/vercel-passport-generally-available"
publishedDate: "2026-07-31"
category: "frontend"
feedName: "Vercel"
author: "Andrew Qu"
---

[Vercel Passport](https://vercel.com/passport) is now generally available.

Passport allows you to protect your Vercel deployments with your own identity provider. Visitors authenticate through Okta, Microsoft Entra ID, or any OIDC provider before viewing a protected deployment, and Vercel forwards a signed identity token to the deployment so application code can build on who the visitor is.

## [Copy link to heading](#read-visitor-identity-in-application-code)Read visitor identity in application code

The `getIdentity()` helper in `@vercel/passport` reads the Vercel request context and returns the authenticated visitor. Vercel strips client-supplied values for the `x-vercel-oidc-passport-token` header and injects the verified token after Passport validates the session, so the identity your code receives is already verified.

```
pnpm add @vercel/passport
```

The package that reads and verifies Passport identity

The `subject` field is a stable identifier for the visitor, scoped to your team and the [Vercel Connect](https://vercel.com/docs/connect) application that links Passport to your identity provider, and `externalSubject` is the visitor's ID in the provider itself. The helper returns `null` only when a request arrives without a Passport session, because unauthenticated browser visitors are redirected to the identity provider before they ever reach your code.

app/api/me/route.ts

```
import { getIdentity } from '@vercel/passport';export async function GET() {  const identity = await getIdentity();  if (!identity) {    return Response.json({ error: 'Unauthorized' }, { status: 401 });  }  return Response.json(identity);}
```

Reading the authenticated visitor in a route handler

In local development, `getIdentity()` returns a configurable [development identity](https://vercel.com/docs/passport/read-identity), so the same code path works without a real identity provider.

## [Copy link to heading](#authorize-with-groups-from-your-identity-provider)Authorize with groups from your identity provider

The signed Passport token can now carry additional identity claims from your provider, such as group membership. Request the `groups` scope and allowlist the claim in the Vercel Connect application that Passport uses, then read it from the identity payload:

app/api/admin/route.ts

```
import { getIdentity } from '@vercel/passport';export async function GET() {  const identity = await getIdentity();  const groups = identity?.payload.groups ?? [];  if (!groups.includes('engineering')) {    return Response.json({ error: 'Forbidden' }, { status: 403 });  }  return Response.json({ groups });}
```

Authorizing a request with groups from the Passport token

The [additional identity scopes documentation](https://vercel.com/docs/passport/additional-identity-scopes) covers provider configuration, including a full Okta walkthrough.

## [Copy link to heading](#verify-identity-in-downstream-services)Verify identity in downstream services

Forward the Passport token from your application to another backend as a bearer token and verify it there with `verifyIdentity()`, available in `@vercel/passport` 1.0.0 and later. The helper checks the token signature, the Passport claims, and that the token came from the expected project and environment:

app/api/do-stuff/route.ts

```
import { verifyIdentity } from '@vercel/passport';export async function GET(request) {  try {    const identity = await verifyIdentity(request, {      ownerId: 'team_your_team_id_here',      projectId: 'prj_your_project_id_here',      environment: 'production',    });    return Response.json({ subject: identity.subject });  } catch {    return Response.json({ error: 'Unauthorized' }, { status: 401 });  }}
```

Verifying a forwarded Passport token in a downstream service

Services outside JavaScript can verify the token as a standard JWT with the published [JWKS](https://passport.vercel.com/.well-known/jwks.json). Learn more in the [verify identity documentation](https://vercel.com/docs/passport/verify-identity).

## [Copy link to heading](#monitor-passport-access)Monitor Passport access

Every successful Passport authentication records a `passport-access-granted` event in both the [Activity Log](https://vercel.com/dashboard/activity?types=passport-access-granted) and [Audit Logs](https://vercel.com/docs/audit-log), identifying the visitor and recording the protected hostname and project. The Activity Log view is already filtered to Passport access.

## [Copy link to heading](#bypass-passport-for-automated-traffic)Bypass Passport for automated traffic

[Protection Bypass for Automation](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation) now applies to Passport. Webhooks, cron jobs, and CI runs that already send a bypass secret in the `x-vercel-protection-bypass` header or query parameter keep working when you turn Passport on. Because Passport runs in Vercel's network before your deployment's routes and proxy functions, the secret has to be part of the original request rather than added by your own middleware. A bypassed request has no signed-in visitor, so `getIdentity()` returns `null`.

## [Copy link to heading](#bypass-passport-with-trusted-sources)Bypass Passport with Trusted Sources

[Trusted Sources](https://vercel.com/changelog/trusted-sources-for-deployment-protection) offers the same bypass without a shared secret. Protected deployments accept short-lived OIDC tokens from the Vercel projects and external services you authorize, which is how the workflow that triggers [eve](https://vercel.com/changelog/introducing-eve-an-open-source-agent-framework) from Slack reaches a Passport-protected deployment.

## [Copy link to heading](#protect-custom-environments)Protect custom environments

Passport now supports [custom environments](https://vercel.com/docs/deployments/custom-environments), so deployments in an environment like `staging` or `qa` get the same identity provider sign-in as your preview and production deployments.

## [Copy link to heading](#get-started)Get started

Vercel Passport is available on the [Enterprise plan](https://vercel.com/docs/plans). New guides cover [identity provider setup](https://vercel.com/docs/passport/set-up-identity-provider), [token claims](https://vercel.com/docs/passport/token-claims), local development, [forwarding identity between backends](https://vercel.com/docs/passport/forward-identity), and bypassing Passport for automation.

Set up Passport with your identity provider in the [Passport documentation](https://vercel.com/docs/passport), or configure it programmatically through the [Vercel API](https://vercel.com/docs/rest-api/reference/endpoints/projects/update-an-existing-project).