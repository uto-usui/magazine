---
title: "New one-click AI bot managed ruleset"
source: "https://vercel.com/changelog/new-one-click-ai-bot-managed-ruleset"
publishedDate: "2025-05-13"
category: "frontend"
feedName: "Vercel"
author: "Casey Gowrie"
---

1 min read

May 13, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6banKDBb4kG8jG06xZTeeF%2F9fca42fac27e81eee2524f480eb578b2%2FAI_Bots_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4mw8ASfmkVtT8k2Z6UO2JX%2F1387de7903a9f1fa3818c23e14b55240%2FAI_Bots_-_Dark.png&w=1920&q=75)

You can now block AI crawlers and scrapers like GPTBot (OpenAI), ClaudeBot (Anthropic), PerplexityBot, Bytespider (ByteDance), and others with a single toggle using the AI bot managed ruleset. Now available for free on all plans.

The ruleset is managed by Vercel and updates automatically as new crawlers appear, with no additional action required. This protection operates with zero latency impact to legitimate traffic.

For more complete coverage, combine with [**Bot Filter**](https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets#configure-bot-filter-managed-ruleset) to catch AI bots that attempt to spoof user agents to disguise themselves as legitimate browsers or omit proper identification headers.

AI crawlers now generate more traffic than human users on many popular sites, driving up infrastructure costs and raising copyright and data usage concerns. Many of these crawlers do not respect robots.txt or similar directives, making manual solutions unreliable.

[Enable the ruleset](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall%2Fconfigure&title=Enable%20AI%20Bot%20Filter) or learn more [in the documentation](https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets).

If you previously used the Block AI Bots template, we recommend switching to this new managed ruleset to benefit from the updated bot lists.

[

**Need more control?**

Combine the one-click AI Bot filter with granular conditions or rate-limits for customized protection.

Customize



](https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules)