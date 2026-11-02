---
title: "Control AI crawlers and assistants separately in Vercel Firewall"
source: "https://vercel.com/changelog/block-ai-crawlers-and-assistants-independently-with-managed-rules"
publishedDate: "2026-10-29"
category: "frontend"
feedName: "Vercel"
author: "Mark Knichel"
---

You can now log or block requests from AI crawlers and AI assistants separately with the AI Bots managed ruleset in [Vercel Firewall](https://vercel.com/docs/vercel-firewall).

-   **AI crawlers:** bots that collect content for indexing and model training
    
-   **AI assistants:** bots that fetch pages in response to user actions or search queries
    

For example, you can block AI crawlers while allowing AI assistants to retrieve your content to answer users’ questions. Vercel updates the rules as new bots are added.

To configure these controls, open your project’s [**Security > Firewall > Rules**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall%2Frules). Under **Bot Management**, enable **AI Bots** and select the gear icon beside it. Set an action for AI crawlers and AI assistants, then review and publish your changes.

You can also modify these rule settings using the Vercel CLI:

```
vercel firewall rules edit ai-bots --category ai-crawlers --action deny --yesvercel firewall rules edit ai-bots --category ai-assistants --action log --yes
```

Configure the AI Bots ruleset to block AI crawlers and allow AI assistants.

Review the changes with `vercel firewall diff`, then apply them with `vercel firewall publish`.

The AI Bots managed ruleset is available on all plans. Learn more in the [documentation](https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets#configure-ai-bots-managed-ruleset).