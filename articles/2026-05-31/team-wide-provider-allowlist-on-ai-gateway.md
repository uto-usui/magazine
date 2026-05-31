---
title: "Team-wide provider allowlist on AI Gateway"
source: "https://vercel.com/changelog/team-wide-provider-allowlist-on-ai-gateway"
publishedDate: "2026-05-28"
category: "frontend"
feedName: "Vercel"
author: "Rohan Taneja"
---

2 min read

May 28, 2026

AI Gateway now supports a team-wide provider allowlist. Teams can restrict which providers can serve requests, so traffic only routes to approved providers. The allowlist applies to every request through AI Gateway, including Bring Your Own Key (BYOK) traffic.

Regulated teams typically vet AI providers across multiple dimensions with security and legal sign-off, ending up with a vendor set that reflects the specific requirements of their org. The allowlist turns that approved-vendor list into a routing guarantee:

-   Enforcement happens at the gateway level, not at the request level. A developer on the team cannot route traffic to a provider the org hasn't approved.
    
-   This restriction also applies to coding agents. Even if an agent omits or modifies request-level provider filters, AI Gateway still blocks unapproved providers.
    
-   Only team owners can modify the provider allowlist, keeping control centralized and auditable.
    
-   New providers are disabled by default once the allowlist is on, so the approved set doesn't silently expand when AI Gateway integrates a new vendor.
    

## [Link to heading](#how-to-configure)How to configure

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fu7ThO4cjnLxInRHNMgOGa%2F528de956122fc76926a2608cd596a77e%2FCleanShot_2026-05-22_at_00.59.46_2x.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F31HLdcvZ7UQdf306LJDWRk%2Fd99fe2436e22dbe4ca6d4d12795c3530%2FCleanShot_2026-05-22_at_01.00.13_2x.png&w=1920&q=75)

Toggle on **Provider Allowlist** in the AI Gateway [**Settings**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fsettings&title=AI+Gateway+Settings) tab. All current providers are allowed by default, so existing traffic is unaffected. Disable any providers your team shouldn't use.

The allowlist filters by provider, not by model. AI Gateway falls back to other allowed providers for the same model if the initial provider fails. The allowlist also functions as an `and` with other restrictions applied to the team, like Zero Data Retention (ZDR) or request-level filtering.

For example, if a team has disabled DeepSeek in their allowlist and a request pins routing to only the DeepSeek provider:

```
import { streamText } from 'ai';const result = streamText({  model: 'deepseek/deepseek-v4-pro',  prompt,  providerOptions: {    gateway: {      only: ['deepseek'],    },  },});
```

Removes all routing options except for the DeepSeek provider

Since DeepSeek is not in the allowlist, AI Gateway rejects the request.

```
{  "error": {    "type": "no_providers_available",    "message": "Your team has restricted access to this provider. Contact the owner of the account for more details. Providers considered: deepseek"  }}
```

Error when accessing provider that is not in the allowlist

Provider Allowlist works across every API format supported by AI Gateway, including AI SDK, OpenAI Chat Completions API, and Anthropic Messages API.

Read the [provider allowlist documentation](https://vercel.com/docs/ai-gateway/capabilities/provider-allowlist) for more information. For other account-level security and compliance functionality, check the [Zero Data Retention](https://vercel.com/docs/ai-gateway/capabilities/zdr) and [Disallow Prompt Training](https://vercel.com/docs/ai-gateway/capabilities/disallow-prompt-training) documentation.