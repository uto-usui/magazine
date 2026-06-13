---
title: "DeepSeek enters the fight for token volume, Anthropic continues to dominate spend"
source: "https://vercel.com/blog/ai-gateway-production-index-june-2026"
publishedDate: "2026-06-08"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

6 min read

Jun 8, 2026

Every month, [AI Gateway](https://vercel.com/ai-gateway) routes tens of trillions of tokens between production applications and AI labs, giving us visibility into what AI usage actually looks like, separate from leaderboards and benchmarks. We publish the data monthly in the AI Gateway production index.

### [Link to heading](#may-2026-summary)**May 2026 summary**

-   Total AI Gateway tokens grew **+20% MoM**; total spend grew **+43% MoM**. Customers paid almost 20% more per token on average than in April.
    
-   DeepSeek’s share of tokens jumped from under **1% to 17%** in a single month, while its share of spend stayed near 1%.
    
-   Anthropic’s share of spend grew from **61% to 65%** in May, holding 70–80% of spend across every high-stakes use case (AI app generation, back office agents, and coding agents).
    
-   Cost-consciousness meant smarter routing between low-cost and frontier models. Customers got more deliberate about which model did which work, while overall usage kept climbing.
    

Last month, headlines about blown token budgets dominated tech news: [Uber burned through](https://fortune.com/2026/05/26/uber-coo-ai-spending-tokens-claude-code/) its annual Claude Code budget shortly after Q1 and Amazon [shut down KiroRank](https://www.cio.com/article/4178825/amazon-deletes-devs-tokenmaxxing-leaderboard-to-minimize-costs-2.html) to curb unproductive tokenmaxxing. While runaway cost is a real problem, this month’s report shows that spend on production use cases still increased.

Two insights emerged from AI Gateway data in May:

-   **Low-cost models entered production:** New models shipped at price points that made the established labs look even more expensive, and they are capable enough to enter the mix in production.
    
-   **Spend is increasing, but with smarter model mixes:** Teams are still increasing token budgets, but they are implementing smarter routing strategies to get more value out of every dollar.
    

## [Link to heading](#low-cost-models-saw-significant-production-volume-for-the-first-time)Low-cost models saw significant production volume for the first time

From February to April, volume distribution across labs on AI Gateway changed slowly, but in May, DeepSeek V4's launch completely shifted token share. The low-cost end of the market that barely existed in April became AI Gateway’s third-largest provider by volume in May, without a significant impact on overall spend.

In April, DeepSeek accounted for less than 1% of AI Gateway tokens and less than 0.2% of spend. In May, its volume share jumped to 17% of tokens, putting it in third place, ahead of OpenAI. Almost all of the volume comes from two models: `deepseek/deepseek-v4-flash` and `deepseek/deepseek-v4-pro`, both released in May.

The spend picture tells the other half of the story. Even though DeepSeek’s token share grew to 17% in a single month, its cost share stayed near 1%.

DeepSeek V4 Flash launched at $0.14 input / $0.28 output per million tokens, roughly 20–50× lower than comparable Anthropic models and 8–12× lower than other value-tier flagships like Qwen 3.6 Plus and Kimi K2.6. With a savings gap that big, teams adopted V4 Flash quickly.

Price alone wouldn’t have shifted DeepSeek’s volume that much in a month, meaning teams testing DeepSeek V4 against their existing evals found the output good enough to ship, not just low-cost enough to try.

Value-tier models have always been available on AI Gateway, but have never captured token share at this scale, meaning DeepSeek V4 was the first model at its price point to clear the quality bar for production work.

## [Link to heading](#frontier-labs-continued-to-capture-a-majority-of-new-spend)Frontier labs continued to capture a majority of new spend

Even as the low-cost end of the market grew fastest in volume, the expensive end grew faster in dollars.

Anthropic’s token share grew from 26% to 32%, and its spend share from 61% to 65%. OpenAI’s token share held near 13%, but its spend share ticked up from 12% to 13% on a much larger total, so customers were paying more per OpenAI token in May.

The average token got more expensive in May, even with DeepSeek pulling the average down. That increase happened because the work that demands frontier models grew faster than the work that doesn’t. The AI coding agent use case shows the low-cost/frontier split most clearly:

-   DeepSeek drove 49% of the segment’s token volume, but only 4% of the cost.
    
-   Anthropic drove 28% of tokens and 70% of the cost.
    

Lower-cost models are now a meaningful part of production workflows, but frontier model use is still growing, driving the increase in overall spend.

The frontier is getting more expensive per token, and customers are still paying. Anthropic continues to lead on spend, taking 65% of all gateway spend in May, and 70–80% of spend across every high-stakes use case.

## [Link to heading](#cost-discipline-became-a-routing-strategy)Cost discipline became a routing strategy

Increased overall spend showed that demand for AI continued to grow in May, but teams applied more precision to their budgets through routing. They sent the cheap, high-volume work to lower-priced models and used frontier models where quality mattered most. Slow adoption of Google's latest Flash model is a clear example.

Gemini 3.5 Flash launched in May at a higher price point than Gemini 3.0 Flash, but migration didn’t happen at scale. By month-end, 3.5 held only 7% of the Flash family’s tokens while 3.0 held 90%.

Compared to the rapid adoption of Gemini 3.1 Pro across February and March, slower migration to 3.5 Flash shows that teams happy with 3.0 Flash aren't willing to pay the higher cost yet.

## [Link to heading](#conclusion:-cost-effective,-capable-options-mean-smarter-model-mixes)Conclusion: Cost-effective, capable options mean smarter model mixes

This month's report signals increased pricing sensitivity in the market, even as overall spend and token volume grow. That means developers are looking for ways to get more out of every dollar.

Data revealed two optimization strategies:

1.  Using DeepSeek's cheap, but capable V4 family for lower-risk, high-volume tasks
    
2.  Choosing to delay model family upgrades until the ROI makes sense
    

Routing gives teams the ability to adjust their model mix, and budget, in real time as the labs compete for different layers of production AI workloads.

## [Link to heading](#appendix)Appendix

### Token vs cost share by B2B classification

B2B applications run fewer, more expensive calls, while B2C applications run many cheap ones. On a per-token basis, B2B cost roughly 60% more than B2C in May.

### [Link to heading](#agent-tool-use-across-tokens-and-requests)Agent tool use across tokens and requests

Just under a quarter of requests end in a tool call, but those requests carry well over half of all tokens. Both metrics are roughly flat month-over-month.

### [Link to heading](#model-diversity-distribution-by-request-volume)Model diversity distribution by request volume

The more requests an app serves, the more models it runs in production. Single-model setups dominate the lowest-volume tier, while at 1M+ requests the majority of apps route across 11 or more models.

### Cost vs volume share by use case

Use case cost share indicates how expensive a wrong answer is, not how many tokens it burns. Personal assistants and coding agents run cheap per token, while back-office and recruiting work costs far more.

## [Link to heading](#previous-reports)Previous reports

Read the [April 2026 AI Gateway production index](https://vercel.com/blog/ai-gateway-production-index).

### [Link to heading](#about-this-data)About this data

This analysis is based on anonymized, aggregate routing data from the Vercel AI Gateway through May 2026.

A few notes on measurement:

-   _Spend_ uses market-rate pricing (published list price) to provide a normalized view across teams that bring their own API keys.
    
-   _Volume_ counts tokens routed through AI Gateway.
    
-   _B2C_, _B2B_, and _use-case_ classifications are aggregate. No individual team or workload is identified.