---
title: "Sign JWTs from your Functions without managing private keys"
source: "https://vercel.com/changelog/sign-jwts-from-your-functions-without-managing-private-keys"
publishedDate: "2026-08-18"
category: "frontend"
feedName: "Vercel"
author: "Marc Greenstock"
---

Vercel KMS lets you sign JWTs and arbitrary messages from your Vercel Functions using managed asymmetric signing keys, so private keys never live in your code or environment variables. Your function authenticates with its [Vercel OIDC](https://vercel.com/docs/oidc) token, and the private key stays inside Vercel's key management service while verifiers use only the public key.

With Vercel KMS you can:

-   Create and rotate issuers and signing keys (RSA, ECDSA, and EdDSA) from the CLI and dashboard.
    
-   Sign JWTs with custom claims and a configurable TTL, or sign raw bytes, using the `@vercel/kms` package.
    
-   Grant a project signing access per environment, including production, preview, development, and custom environments.
    
-   Constrain the claims a project can request per grant, and validate token claims against a JSON Schema.
    
-   Verify signed tokens anywhere. Each issuer publishes a public [OpenID Connect Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html) document at `https://kms.vercel.com/<issuerId>/.well-known/openid-configuration` and a JWK set at `https://kms.vercel.com/<issuerId>/jwks.json`, so any standard OIDC or JOSE library can validate tokens without Vercel-specific code.
    

Sign a token inside a function:

```
import { signToken } from '@vercel/kms';export async function GET() {  // Sign a short-lived JWT with your claims.  const token = await signToken({    issuerId: '123e4567-e89b-42d3-a456-426614174000',    claims: { sub: 'user_123', scope: 'read:data' },    ttl: 300,  });  // Send the signed token as a Bearer credential to the downstream API.  const res = await fetch('https://api.example.com/data', {    headers: { Authorization: `Bearer ${token}` },  });  return new Response(await res.text(), { status: res.status });}
```

The private key never leaves Vercel KMS

Verify a token anywhere with a standard JOSE library, using the issuer's public JWKS:

```
import { createRemoteJWKSet, jwtVerify } from 'jose';const issuer = 'https://kms.vercel.com/123e4567-e89b-42d3-a456-426614174000';const jwks = createRemoteJWKSet(new URL(`${issuer}/jwks.json`));const { payload } = await jwtVerify(token, jwks, { issuer });
```

The JWK set is used to verify the token

Set up an issuer and grant a project access from the CLI:

```
vercel kms add my-issuer --algorithm ES256vercel kms add-grant 123e4567-e89b-42d3-a456-426614174000 --project my-app --environment production
```

Requires Vercel CLI 59.1.0 or Later

As a best practice, create a separate issuer per project and environment. Isolating issuers keeps each token audience distinct, scopes signing access to exactly one project and environment, and lets you rotate or revoke keys for one without affecting the others.

To get started, [read the docs](https://vercel.com/docs/kms) or open Key Management in your team's dashboard.

**Vercel KMS is in beta and available on all plans.** Features and behavior may change before general availability. Usage is subject to the [Beta Agreement](https://vercel.com/docs/release-phases/public-beta-agreement).