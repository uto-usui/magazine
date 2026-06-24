---
title: "Custom OIDC Token Audiences"
source: "https://vercel.com/changelog/custom-oidc-token-audiences"
publishedDate: "2026-06-23"
category: "frontend"
feedName: "Vercel"
author: "Marc Greenstock"
---

Vercel's OIDC issuer (`oidc.vercel.com`) now supports custom audiences. Deployments can request OIDC tokens with a specific audience claim, enabling secure service-to-service authentication with third-party providers.

### [Link to heading](#why-custom-audiences)Why custom audiences?

Vercel OIDC tokens are issued with a fixed audience (`https://vercel.com/{owner}`). While most cloud providers don't require a specific audience value, using a unique audience per provider is a security best practice. If a provider is compromised, an attacker cannot replay the token against a different provider - the mismatched `aud` claim will cause verification to fail. This new service makes it easy to mint provider-specific tokens without managing additional infrastructure.

### [Link to heading](#how-it-works)How it works

When a Vercel deployment runs, it receives an OIDC token signed by Vercel. The new exchange service accepts this token and returns a new one signed with the same key, but with an updated audience (`aud`) claim targeting your downstream service.

```
import { awsCredentialsProvider } from '@vercel/oidc-aws-credentials-provider';import { S3Client } from '@aws-sdk/s3-client';const s3 = new S3Client({  region: 'us-east-1',   credentials: awsCredentialsProvider({    // The token's `aud` claim will be set to sts.amazonaws.com    audience: 'sts.amazonaws.com',    clientConfig: { region: 'us-east-1' },  }),});
```

The exchanged token:

-   Preserves all original claims (project, environment, owner, expiration)
    
-   Sets the `iss` (issuer) to `https://oidc.vercel.com/{owner}`, scoped to the team that owns the deployment
    
-   Includes an `act` (actor) claim with the original token's audience and issued-at time, providing an auditable delegation chain
    
-   Updates the `aud` to the requested downstream audience
    
-   Updates the `iat` (issued-at) to the current timestamp, reflecting when the new token was created
    

You can optionally pass a `jti` (JWT ID) to assign a unique identifier to the exchanged token. This is useful for auditing and tracing token usage across services - for example, correlating a specific token exchange with downstream API calls in your logs.

Downstream services verify the exchanged token using the public key available at `https://oidc.vercel.com/{owner}/.well-known/jwks`.

Both the signing key and the token exchange endpoint are replicated across all [Vercel regions](https://vercel.com/docs/regions), ensuring low-latency token exchange regardless of where the deployment is running.