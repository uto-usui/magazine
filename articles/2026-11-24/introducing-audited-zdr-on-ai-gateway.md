---
title: "Introducing Audited ZDR on AI Gateway"
source: "https://vercel.com/blog/introducing-audited-zdr-on-ai-gateway"
publishedDate: "2026-11-23"
category: "frontend"
feedName: "Vercel"
author: "Harpreet Arora"
---

AI is now used in every part of a business, and as a result, companies send source code, customer records, and regulated data through inference providers.

The assurance that no data is retained after processing is still publicly unverified. Payment platforms, cloud infrastructure, and most other layers that handle data this sensitive have a way to prove their controls to outside parties, and inference will follow the same path.

Today we are introducing Audited ZDR on AI Gateway. A provider is labeled Audited ZDR only after an independent security firm tests its zero data retention claims against its code, infrastructure, and live traffic, then publishes the report. [Baseten](https://www.baseten.co/), [Modal](https://modal.com/), and [Wafer](https://www.wafer.ai/) are launch partners that have already begun audits, and more providers are encouraged to join to help raise the bar for security and privacy.

Audited ZDR builds on two steps we took toward stronger governance earlier this year:

-   We launched [team-wide Zero Data Retention (ZDR)](https://vercel.com/blog/zdr-on-ai-gateway) so teams could route traffic exclusively to providers stating a ZDR policy.
    
-   We completed our [ISO/IEC 42001:2023 certification](https://vercel.com/blog/vercel-completes-iso-iec-42001-2023-certification), which put Vercel’s own AI systems under independent third-party audit.
    

We are now asking inference providers for the same thing we asked of ourselves: independent verification.

## [Copy link to heading](#why-a-contract-is-not-enough)Why a contract is not enough

ZDR guarantees rely on contracts and self-attestation. A provider agrees not to retain prompts or completions, and customers take that commitment on faith.

For teams sending proprietary code, customer information, or regulated data through models, self-reported ZDR contracts don't provide enough assurance.

-   Are prompts landing in debug logs, crash dumps, or tracing pipelines?
    
-   Can a rate limit push a request marked ZDR to a non-ZDR endpoint?
    
-   Can a support engineer's debugging tools surface a customer's prompt?
    

Answering these questions means running a bespoke security review for every provider and the models they host. An audit answers them in public.

## [Copy link to heading](#what-audited-zdr-verifies)What Audited ZDR verifies

To qualify for Audited ZDR on AI Gateway, an inference provider engages an independent security firm, chosen from among respected third-party auditors, to run the audit. The firm then tests the provider's zero data retention policy across the serving path for every model, endpoint, feature, and tool that handles AI Gateway traffic.

The audit confirms that customer data is never written or retained on durable storage in any system. Customer data means prompts, completions, system prompts, embeddings, files, images and audio, tool and function-call payloads, and any derived data that could identify them. Coverage spans request logs, traces, metrics, crash dumps, prompt caches, abuse monitoring, analytics, backups, support tools, and training, fine-tuning, and evaluation datasets.

The audit confirms that once a response is returned to AI Gateway, that content is deleted from the inference provider's systems. Where a request uses caching, such as a KV cache, the cache must stay in volatile storage only for the period of the request, and never be written to durable storage. The audit requires this behavior to be disclosed.

The audit also confirms:

-   That a request marked ZDR never fails over to a non-ZDR endpoint, tool, or feature
    
-   That no human or automated process accesses customer data outside handling the request itself
    
-   That sub-processors with access comply with all of the above
    
-   That no training on customer data occurs
    

Auditors verify this by reviewing the inference provider's serving-path source code and infrastructure configuration, then running live tests. They send marked prompts through AI Gateway and search the provider's logging, caching, and storage systems for any trace of them.

Every passing provider publishes the report under the auditor's name. It covers scope, methodology, dates, findings, and fix status, with any exceptions disclosed and redactions limited to exploit detail. AI Gateway links directly to the report.

## [Copy link to heading](#canary-monitoring-between-audits)Canary monitoring between audits

An independent audit checks a provider's code and infrastructure at a point in time, but production systems change. To add a detection layer between independent audits, Vercel also runs [canary audits](https://vercel.com/changelog/ai-gateway-now-runs-canary-zdr-audits) against inference providers on AI Gateway.

Each run sends prompts containing unique, unindexed URLs mapped privately to a provider, model, and run. Because a ZDR provider should never retain, inspect, or crawl prompt content, any request to a canary URL triggers an investigation into the provider and model involved. Canary checks cannot detect prompts written to disk and never read, so they complement independent code and infrastructure audits rather than replacing them.

## [Copy link to heading](#how-audited-zdr-works-in-ai-gateway)How Audited ZDR works in AI Gateway

We are adding an independently Audited ZDR provider tier and a team-wide toggle in AI Gateway policy settings. When enabled, AI Gateway routes and fails over your team's requests only across providers with published audits that meet the bar.

Launch partners have started their audits, and each provider enters the tier as soon as its report is published. Launch partner reports are expected to be published by December 8, 2026.

## [Copy link to heading](#about-ai-gateway)About AI Gateway

AI Gateway provides a unified API for calling models, tracking usage and cost, and configuring retries and failover for higher uptime than connecting to providers directly. It reflects provider pricing with no markup and charges no platform fee on inference, including Bring Your Own Key (BYOK) requests. Read the [AI Gateway documentation](https://vercel.com/docs/ai-gateway) to get started.

The audited tier works alongside AI Gateway's other compliance controls. [Regional inference](https://vercel.com/docs/ai-gateway/security-and-compliance/regional-inference) pins where a provider runs inference to the US, EU, Australia, or Japan, per request or team-wide, and any data the provider stores at rest stays in that region. If AI Gateway can't honor the region, the request fails rather than running elsewhere.

[Provider headquarters](https://vercel.com/changelog/choose-ai-gateway-providers-by-headquarters-country) filters routing by who owns the provider, so a request only reaches providers whose parent company is headquartered in a country you allow.

[Private inference](https://vercel.com/docs/ai-gateway/security-and-compliance/private-inference) connects your own self-hosted or fine-tuned model endpoints to AI Gateway, called as `private/<slug>` with the same SDKs, auth, and observability as catalog models and scoped to your team.