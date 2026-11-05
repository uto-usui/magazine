---
title: "November 2026 Security Release"
source: "https://nextjs.org/blog/november-2026-security-release"
publishedDate: "2026-11-03"
category: "frontend"
feedName: "Next.js Blog"
author: "Jamiboy Mohammad"
---

[Last week](https://nextjs.org/blog/upcoming-nextjs-security-release-november-2026) we announced an upcoming security release for Next.js.

Updates are now available in v16.4.5 (Active LTS) and v15.5.29 (Maintenance LTS) to address these issues. Please patch your Next.js dependencies to maintain the security of your applications.

## [Copy link to heading](#impact)Impact

### [Copy link to heading](#cross-tenant-cache-disclosure-when-combining-unstable_cache-and-use-cache-high-severity)Cross-tenant cache disclosure when combining `unstable_cache` and `use cache` (High Severity)

[**GHSA-mfr8-8qww-v76h**](https://github.com/vercel/next.js/security/advisories/GHSA-mfr8-8qww-v76h)

Applications with Cache Components enabled can disclose cached content across root-parameter values when the same public `use cache` function is called both directly and from inside `unstable_cache`. The cached function must read a root parameter, such as a tenant identifier.

During a cold cache fill, a concurrent call through `unstable_cache` can receive another request's result without checking its root parameters. That result can then be stored and served to later callers with the same arguments until the entry is revalidated or evicted. Where root parameters separate tenants, the result can contain another tenant's data.

### [Copy link to heading](#cross-root-parameter-disclosure-in-nested-use-cache-functions-medium-severity)Cross-root-parameter disclosure in nested `use cache` functions (Medium Severity)

[**GHSA-vc7v-qv4w-wrv8**](https://github.com/vercel/next.js/security/advisories/GHSA-vc7v-qv4w-wrv8)

Applications using Cache Components and nested public `use cache` functions can serve content generated for one root-parameter value to requests for another. This affects applications where an inner cached function reads a root parameter and returns an early value alongside a slower asynchronous value, while the outer function finishes without waiting for the slower value.

The outer entry can be stored before the inner function's root-parameter dependencies are recorded. This can disclose tenant-, site-, or locale-specific content across the corresponding routing boundary. The attacker does not inject arbitrary response content; the application generates the content that is incorrectly reused.

### [Copy link to heading](#cross-user-cache-disclosure-and-poisoning-through-binary-use-cache-arguments-medium-severity)Cross-user cache disclosure and poisoning through binary `use cache` arguments (Medium Severity)

[**GHSA-rhh4-g77r-r9qj**](https://github.com/vercel/next.js/security/advisories/GHSA-rhh4-g77r-r9qj)

Distinct binary arguments passed to a `use cache` function can produce the same cache identity. If an application uses those arguments to distinguish users or accounts, and the remaining cache-identity inputs match, a caller can receive another user's cached result or cause their own result to be served to another user.

This affects applications that pass security-significant binary arguments through `use cache` and share the resulting entries across callers. It does not permit arbitrary access to unrelated cache entries.

### [Copy link to heading](#shared-shell-cache-poisoning-in-self-hosted-applications-medium-severity)Shared shell cache poisoning in self-hosted applications (Medium Severity)

Self-hosted applications running `next start` with Cache Components enabled and Partial Prefetching disabled or unset can have a shared page shell poisoned by an unauthenticated request. A crafted URL can cause request-specific values to be stored in a shell used by other URLs, resulting in incorrect server-rendered content or persistent 404 responses.

The affected route shape has a prerenderable dynamic parameter requested with a value not generated at build time, at least two deeper parameters that are never prerendered, and a blocking fallback shell. A layout must read the shallower of those deeper parameters inside a Suspense boundary. Build-generated values and configurations with Partial Prefetching enabled were not affected in the reported tests.

### [Copy link to heading](#cross-client-response-injection-and-disclosure-through-stale-compressed-response-framing-medium-severity)Cross-client response injection and disclosure through stale compressed response framing (Medium Severity)

[**GHSA-pc58-hwjq-p385**](https://github.com/vercel/next.js/security/advisories/GHSA-pc58-hwjq-p385)

Self-hosted applications that return an attacker-controlled fetched `Response` unchanged can forward decompressed body bytes with the original compressed response's framing headers. Behind an HTTP/1.1 reverse proxy that queues pipelined requests on a shared backend connection, this mismatch can cause responses to be assigned to the wrong clients.

An attacker who can arrange requests on that connection can inject a response for another client or receive another client's response. This issue requires the described proxy behavior; it does not apply to every reverse-proxy configuration.

[**GHSA-f3mh-rxg3-f5g2**](https://github.com/vercel/next.js/security/advisories/GHSA-f3mh-rxg3-f5g2)

App Router Edge Route Handlers and Pages Router Edge API routes that set cookies with `NextResponse.cookies.set()` can expose the serialized cookie in the internal `x-middleware-set-cookie` response header. Unlike `Set-Cookie`, this header can be read by same-origin JavaScript, exposing cookie values even when they are marked `HttpOnly`.

Impact requires a sensitive cookie to be set on an affected response and attacker-controlled JavaScript running on the same origin. This is not an independent way to execute JavaScript. The reproduced leak did not affect Node.js Route Handlers or routes setting cookies through `cookies().set()`.

### [Copy link to heading](#svg-rejection-bypass-in-image-optimization-medium-severity)SVG rejection bypass in Image Optimization (Medium Severity)

[**GHSA-7qx7-33qx-rqx2**](https://github.com/vercel/next.js/security/advisories/GHSA-7qx7-33qx-rqx2)

An attacker-controlled image from a permitted source can be misclassified as AVIF and bypass `images.dangerouslyAllowSVG: false`. The image optimization backend can then identify and decode the original bytes as SVG, reaching a parser the application configured Next.js to exclude.

The image-source allowlist still applies. The issue requires a native image backend capable of decoding SVG. It increases exposure to SVG parser resource exhaustion or decoder vulnerabilities; this finding does not itself demonstrate cross-site scripting or remote code execution.

## [Copy link to heading](#our-security-program)Our security program

We work with security researchers to secure Next.js and other open source frameworks through [Vercel's Open Source Bug Bounty](https://hackerone.com/vercel). Anyone interested in contributing to the security of eligible frameworks is encouraged to participate there.

Any questions or concerns regarding our security programs or vulnerability management can be sent to [security@vercel.com](mailto:security@vercel.com).