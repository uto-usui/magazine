---
title: "The Pulse: Did capacity shortages turn Anthropic hostile to devs?"
source: "https://newsletter.pragmaticengineer.com/p/the-pulse-did-capacity-shortages"
publishedDate: "2026-05-07"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

_The Pulse is a series covering events, insights, and trends within Big Tech and startups. Notice an interesting event or trend? Hit reply and share it with me._

Today, we cover:

1.  **Did Anthropic turn hostile on devs because capacity was running low?** For the past few weeks, Anthropic has continually upset devs with its “dumber” model, and by removing Claude Code access from some paid accounts. After securing lots of compute from SpaceX, could the reason have been to conceal capacity issues?
    
2.  **Amazon finally allows Claude Code and Codex usage**. The online retail giant wanted to improve its own coding agent, Kiro, so banned other AI coding tools. But that ban is now lifted.
    
3.  **Meta forcefully assigns engineers to data labelling ahead of job cuts.** In several teams, 20-40% of engineers are given menial, data labelling work. Could that actually boost people’s job security – for now?
    
4.  **New trend: small “AI-forward” teams**. Meta and Amazon’s CEOs say teams of 5-10 devs do better work than teams of 50. There are important caveats: it’s unclear what they’ll do with the “excess,” and if it’s limited to “mechanical” work like rewrites.
    
5.  **Industry Pulse**. Why Meta tracks employees’ computer activity, OpenAI starts to move off Datadog, Apple lets slip it uses Claude Code, GitHub → Xbox transfers at Microsoft, VS Code inserted “coathored by Copilot” even when Copilot did nothing, analysis of the Coinbase layoffs.
    

Before we start, last week I covered [big pricing changes coming from GitHub](https://newsletter.pragmaticengineer.com/i/196004322/big-pricing-increase-for-github-copilot), but it seems I underplayed how big they will be. Reader Julien has helpfully [clarified](https://newsletter.pragmaticengineer.com/p/the-pulse-github-breaks/comment/251597672) the actual impact (thank you!)

-   The multipliers will be increased for Pro and Pro+ plans _on annual renewal_ (roughly a ~3x increase on average)
    
-   With other plans (Pro, Pro+, Business, Enterprise) it’s more drastic; they will adopt API token-based pricing and drop request-based pricing.
    

This is indeed a massive change; GitHub has heavily subsidized its usage, relative to API billing, and this change will make pricing unpredictable as of 1 June – at least initially. As Julien put it:

> “We are basically waiting to see how much we will be able to use our actual subscription with the new pricing 😇”