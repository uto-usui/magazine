---
title: "How v0 authenticates to Snowflake without exposing the user's OAuth token"
source: "https://vercel.com/blog/how-v0-authenticates-to-snowflake-without-exposing-the-users-oauth-token"
publishedDate: "2026-08-20"
category: "frontend"
feedName: "Vercel"
author: "Anika Sikka"
---

AI-generated applications often need to authenticate to external services on behalf of their users. That creates a problem: generated code shouldn't have access to the user's credentials.

We faced that decision when building the v0 [Snowflake integration](https://v0.app/docs/snowflake). It lets users connect Snowflake, inspect schemas, query data, and generate applications that run against their warehouses. That generated code has to authenticate to Snowflake, but it is written by a model and runs without human review, and [prompt injection can steer it into exfiltrating whatever it can read](https://vercel.com/blog/security-boundaries-in-agentic-architectures), so the user's OAuth token should never enter the environment the code runs in.

We solved this with a Snowflake request proxy for v0 sandboxes, built on the [Vercel Sandbox firewall](https://vercel.com/docs/sandbox/concepts/firewall#requests-proxying). The sandbox can run normal Snowflake clients, but the real credential is resolved at request time in a server proxy outside the sandbox runtime. This lets existing Snowflake clients work inside the sandbox without exposing the user's credential to generated code.

The harder problem was deciding where the proxy could safely inject the credential. The obvious implementation, replacing a placeholder token wherever it appears, introduces another credential leak.

## [Copy link to heading](#isolation-doesn't-protect-secrets)Isolation doesn't protect secrets

[v0](https://v0.app/) runs generated applications in isolated sandboxes. Isolation protects the rest of the system from untrusted code, but it doesn't protect secrets inside the sandbox.

If a generated app can read a token from the filesystem, that token can be copied into logs, returned in an API response, embedded into generated client code, or sent to another host. Sandbox isolation limits what the application can access, but it does not help once the credential itself is available inside the sandbox.

For Snowflake, the credential represents the Snowflake role the user connected with. v0 should be able to help the user explore and build with data they are authorized to access, but generated code should not receive raw provider credentials just because it needs one.

## [Copy link to heading](#every-snowflake-request-goes-through-the-proxy)Every Snowflake request goes through the proxy

The sandbox cannot talk to Snowflake directly. When code inside it sends a request to the user's Snowflake account host, the sandbox firewall forwards that request to the v0 Snowflake proxy:

![Diagram of the request path: generated app in sandbox, through the sandbox network policy, to the v0 Snowflake proxy, which verifies the sandbox, resolves the chat, mints a user-scoped token, and forwards to the Snowflake account host.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fca384369d4c1e3005c2af61c%2F3216ae5f48ef8b7c81de0da44fe819b3%2FCleanShot_2026-08-14_at_15.22.53_2x.png&w=1920&q=75)![Diagram of the request path: generated app in sandbox, through the sandbox network policy, to the v0 Snowflake proxy, which verifies the sandbox, resolves the chat, mints a user-scoped token, and forwards to the Snowflake account host.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fca9d868fc8ec0371a643ecc5%2F1353fa3bc2815068bfcc3ee81ad7b28a%2FCleanShot_2026-08-14_at_15.22.55_2x.png&w=1920&q=75)

The request path from generated code to Snowflake. The proxy runs outside the sandbox.

The firewall terminates TLS with a certificate authority unique to each sandbox, which lets the proxy read and rewrite traffic that would otherwise be encrypted. The sandbox trusts that certificate authority automatically, so the Snowflake SDK and CLI run with their default certificate validation, OCSP included. The proxy then verifies the sandbox's OIDC token, looks up the v0 chat the sandbox belongs to, restores the user session bound to that chat, and retrieves a fresh Snowflake credential for that user.

network-policy/index.ts

```
return {  [host]: [    // absolute URL, e.g. https://v0.app/chat/api/sandbox-proxy/snowflake    { forwardURL: getSandboxRequestProxyForwardURL('snowflake') },  ],}
```

Simplified from internal v0 forwarding config

The sandbox does not choose where a token-bearing request is sent. The proxy derives the Snowflake account host from the server-side credential and rejects invalid account URLs, keeping the credential scoped to the connected Snowflake account rather than trusting host information supplied by generated code.

## [Copy link to heading](#compatibility-without-credential-exposure)Compatibility without credential exposure

As a stopgap, the first version of the integration wrote the user's real token into the sandbox's Snowflake token files. The proxy replaced that approach. Ideally, we would remove token files from the sandbox entirely, but Snowflake clients expect credentials in different locations depending on the authentication flow.

Some requests, such as [Snowflake SQL API](https://docs.snowflake.com/en/developer-guide/sql-api/index) calls, authenticate with an `Authorization: Bearer` header. Other client flows read local token files and send the token as part of a login request. Once the client has authenticated, subsequent requests use Snowflake-issued session tokens, and the proxy passes those requests through untouched.

To preserve compatibility, v0 still writes a token-shaped placeholder into the sandbox. The placeholder is a fixed, public, 72-byte string that grants no access, and its only job is to let existing Snowflake SDK and CLI flows behave as if a token exists. The proxy never authorizes a request based on the placeholder itself. Instead, the proxy authorizes the request using the sandbox's server-side identity and its binding to the user's chat.

The real OAuth token, the reusable credential that represents the user, is never written into the sandbox. Snowflake does issue session tokens that live inside the sandbox after login, but each of those belongs to a single authenticated session.

Those sessions are short-lived in practice. The Snowflake helper in generated apps destroys its connection after each query, which ends the session right away. Closing the chat does not end a session on its own, but tearing down the sandbox takes the token with it, and Snowflake expires the session server-side after four hours of inactivity by default. When a request reaches the proxy, it decides whether and where to attach the credential.

## [Copy link to heading](#why-blind-replacement-fails)Why blind replacement fails

The first version of the proxy searched each request for the placeholder and swapped in the real token wherever it appeared:

network-policy/snowflake-proxy.ts

```
const text = await request.text();const patched = text.replaceAll(placeholder, realToken);request = new Request(request, { body: patched });
```

Blind replacement patches the placeholder anywhere it appears in the request body.

The problem is that generated code controls parts of the request, including where the placeholder can appear. A SQL statement, for example, is caller-controlled data. If a query contains the placeholder as a string literal, blind replacement turns that query into one containing the real OAuth token. If the database then returns that string, the real token comes back into the sandbox as query output, and the proxy would have leaked the token it was built to keep out.

Stricter matching does not close the hole. The proxy shouldn't inject a credential based on attacker-controlled text. Instead, it needs to know which field in each Snowflake request carries authentication.

## [Copy link to heading](#injecting-credentials-only-into-authentication-fields)Injecting credentials only into authentication fields

Snowflake requests reach the proxy in three shapes, and each shape puts authentication in a different place.

For Snowflake SQL API requests, the proxy sets the OAuth token on the `Authorization: Bearer` header. The body remains caller-controlled SQL and is not rewritten. If the placeholder appears in the SQL payload, the proxy rejects the request before it reaches Snowflake and logs it as placeholder misuse.

For Snowflake login requests, the proxy parses the JSON request body, sets the token structurally at the login token field, and serializes the body again. If the placeholder remains anywhere else in the request body, the proxy fails closed.

Post-login session requests authenticate with Snowflake-managed session tokens, so the proxy has nothing to inject.

## [Copy link to heading](#failing-closed)Failing closed

The proxy rejects any request where:

-   The sandbox is not bound to a chat
    
-   No user-scoped credential can be obtained
    
-   The Snowflake account host cannot be derived
    
-   The placeholder appears outside an approved authentication field
    
-   A structured login body cannot be parsed safely
    

Requests are also bounded before inspection so that compressed or oversized bodies cannot turn the proxy into an unbounded parser. Every proxied request emits an observability event with the upstream outcome, status, duration, and injection location. This surfaces misuse and integration failures without exposing secrets.

## [Copy link to heading](#handling-refresh-and-deploy)Handling refresh and deploy

Token refresh cannot depend on an ambient browser cookie, because proxy requests originate from the sandbox, not from the user's browser session. v0 binds the user session to the sandbox instead, and the proxy mints and refreshes OAuth credentials from that binding.

The publish path uses [Snowflake CLI](https://docs.snowflake.com/en/developer-guide/snowflake-cli/index) flows with the same credential boundary. Deploy can write the placeholder into credential files, but never the real token.

After deployment, the application runs in [Snowpark Container Services](https://docs.snowflake.com/en/developer-guide/snowpark-container-services/overview) and authenticates as its own service user, with a token that Snowflake manages and rotates automatically, mounted at `/snowflake/session/token`. The user's OAuth token and the v0 proxy are no longer involved.

## [Copy link to heading](#the-resulting-security-boundary)The resulting security boundary

For users, none of this is visible. Connect Snowflake, ask v0 to inspect schemas or build an app, preview the result, and deploy when it's ready.

The security model rests on five rules:

-   Credential injection happens only at each endpoint's authentication fields
    
-   Requests that use the placeholder outside an authentication field are rejected and logged
    
-   Token-bearing requests go only to the connected Snowflake account host
    
-   Credentials are minted and refreshed server-side
    
-   Generated code uses Snowflake without ever reading the user's OAuth token
    

In its first 15 days in production, the proxy attached credentials server-side for roughly 13,000 requests and recorded zero placeholder-misuse rejections.

Although we built this proxy for Snowflake, the same problem applies to other integrations: generated code often needs to authenticate without receiving the user's long-lived credential. The important part is to inject credentials only into protocol-defined authentication fields, rather than rewriting arbitrary request data.

The v0 Snowflake integration is now available in beta. Get started by reading the [integration docs](https://v0.app/docs/snowflake).