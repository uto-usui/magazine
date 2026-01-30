---
title: "Postmortem on Next.js Middleware bypass"
source: "https://vercel.com/blog/postmortem-on-next-js-middleware-bypass"
publishedDate: "2025-03-25"
category: "frontend"
feedName: "Vercel"
author: "Ty Sbano"
---

5 min read

Mar 25, 2025

Last week, we published [CVE-2025-29927](https://github.com/vercel/next.js/security/advisories/GHSA-f82v-jwr5-mffw) and patched a critical severity vulnerability in Next.js. Here’s our post-incident analysis and next steps.

## [Link to heading](#timeline)Timeline

### [Link to heading](#2025-02-27)2025-02-27

On `27 Feb 2025 06:03:00 GMT`, the vulnerability was disclosed to the Next.js team through GitHub private reporting. The researchers also emailed [security@vercel.com](mailto:security@vercel.com).

The initial report disclosed the vulnerability in older versions of Next.js (12.x). Due to the old version range, this was given lower priority in our triage queue.

### [Link to heading](#2025-03-01)2025-03-01

An additional email was sent at `01 Mar 2025 02:00:00 GMT` in a new thread, which extended the affected scope to more recent versions.

Due to multiple reports submitted and internal conversations, triaging was delayed.

### [Link to heading](#2025-03-05)2025-03-05

We began investigating the report to understand the validity and potential impact.

Our security team responded at `05 Mar 2025 10:38:00 GMT` outlining our plans to release an LTS policy ([now published](https://nextjs.org/support-policy)) which would place Next.js 11.x and 12.x out of support for security patches.

### [Link to heading](#2025-03-14)2025-03-14

Our security team raised the report to the Next.js team to begin researching impact and remediation options at `14 Mar 2025 17:18:00 GMT`. The Next.js engineering team confirmed the vulnerability as valid.

Since Next.js can be hosted in multiple ways, all paths needed to be examined.

1.  Static exports were immediately ruled out due to Middleware not being available without a server runtime.
    
2.  We then confirmed self-hosted Next.js applications using `next start` and `output: 'standalone'` were impacted.
    
3.  We then investigated impact on Vercel. The Next.js routing logic is decoupled and runs in a separate system, distributed globally. This made Vercel incidentally invulnerable.
    
4.  Our team then examined open-source Next.js adapters for deploying to other infrastructure platforms. Netlify and Cloudflare Workers were confirmed to never have been affected, for the same decoupling of application routing.
    

On Friday, we determined the best solution for fixing forward was to add validation when the `x-middleware-subrequest` header was passed—then, filter it out if the validation failed. We also listed a workaround for applications unable to upgrade by filtering out the header before it hit the Next.js server. The team began preparing patches for Next.js 15.x and 14.x.

### [Link to heading](#2025-03-17)2025-03-17

On Monday, a pull request containing the patch was opened on the Next.js GitHub repository on `17 Mar 2025 17:54:00 GMT`.

It was then merged at `17 Mar 2025 20:56:00 GMT`.

A patch was released for Next.js 14.2.25 at `17 Mar 2025 22:44:00 GMT` and Next.js 15.2.3 at `18 Mar 2025 00:23:00 GMT`.

### [Link to heading](#2025-03-18)2025-03-18

[CVE-2025-29927](https://github.com/advisories/GHSA-f82v-jwr5-mffw) was issued by GitHub at `18 Mar 2025 18:03:00 GMT`.

### [Link to heading](#2025-03-21)2025-03-21

[CVE-2025-29927](https://github.com/advisories/GHSA-f82v-jwr5-mffw) was made public at `21 Mar 2025 10:17:00 GMT`.

At this time, the only public details available were on the published CVE, which did not cover enough detail to understand the impact of the issue.

While we did verify Netlify and Cloudflare Workers were not impacted, we should have communicated this with their team. Further, we could have done a better job of proactive communication with other infrastructure providers and auth partners.

### [Link to heading](#2025-03-22)2025-03-22

Because the CVE did not state immediately whether Vercel applications were impacted (it was later updated), we quickly published a changelog on Vercel stating customers were protected.

The changelog used the same template from our last resolution, which mentioned our Firewall. This was confusing and did not provide appropriate level of detail on the vulnerability itself.

We published a [blog post](https://nextjs.org/blog/cve-2025-29927) on the Next.js site explaining the CVE in preparation for the full postmortem to come later, as well as sharing to official social channels.

Later that day, we published a backport for Next.js 13.5.9 at `22 Mar 2025 21:21:00 GMT`. While this is outside of our now published [LTS policy](https://nextjs.org/support-policy), we made an exception based on community feedback.

### [Link to heading](#2025-03-23)2025-03-23

We published an additional backport for Next.js 12.3.5 at `23 Mar 2025 06:44:00 GMT`.

## [Link to heading](#technical-analysis)**Technical analysis**

Middleware allows you to redirect, rewrite, or modify the incoming request before producing a response. Because of this, Middleware runs before caching and routing happens.

A pattern that some Next.js applications adopt is using middleware to optimistically verify a user's authentication state by checking cookies. If an auth cookie is set, you can early redirect to the logged-in application (or block specific routes). We do not recommend Middleware to be the sole method of protecting routes in your application.

Next.js uses an internal `x-middleware-subrequest` header to detect and prevent recursion—and bypass the execution of Middleware. Middleware happens separately from the rendering process of a page. Because of the Middleware running in a separate process, we had to leverage an internal header to signal to the routing process that the Middleware had already run when doing a fetch to the app from inside the Middleware.

[Read more](https://zhero-web-sec.github.io/research-and-things/nextjs-and-the-corrupt-middleware) about the vulnerability details from the reporter.

## [Link to heading](#next-steps)Next Steps

-   **Partner mailing list:** To help us more proactively work with partners depending on Next.js, and other infrastructure providers, we are opening a partner mailing list. Please reach out to [`partners@nextjs.org`](mailto:partners@nextjs.org) to be included.
    
-   **Simplify how issues get reported:** We have consolidated [`security@vercel.com`](mailto:security@vercel.com) and [`responsible.disclosure@vercel.com`](mailto:responsible.disclosure@vercel.com) to only use GitHub’s private vulnerability reporting for Next.js. This will help us triage incoming reports more effectively.
    
-   **Improved process:** We are improving how our teams can respond to disclosures and enhancing our run books for Next.js vulnerabilities. Specifically, how we triage reports from open-source to frameworks like Next.js, and the working relationship between our security engineers and the Next.js team.
    
-   **Long Term Support (LTS) policy:** We have published an [LTS policy](https://nextjs.org/support-policy) to outline which versions are actively supported with patches.
    
-   **Deployment adapters:** This vulnerability relied on an internal header that was undocumented. As we work on implementing an official deployment adapters API with partners like Netlify and Cloudflare, we will ensure we document those internal headers or replace them with an appropriate API.
    
-   **Security assessment:** We are further investigating if there are additional places to improve the security of Middleware. All subsequent issues uncovered will follow the new CVE process.
    

## [Link to heading](#acknowledgments)Acknowledgments

Thank you to security researchers Rachid Allam ([zhero](https://x.com/zhero___)) and Yassir Alam ([inzo\_](https://x.com/inzo____)) for responsibly disclosing this issue to our team. These researchers were awarded payouts as part of our bug bounty program.