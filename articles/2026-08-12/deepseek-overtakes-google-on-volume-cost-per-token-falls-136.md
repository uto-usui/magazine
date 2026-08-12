---
title: "DeepSeek overtakes Google on volume, cost per token falls 13.6%"
source: "https://vercel.com/blog/deepseek-overtakes-google-on-volume-cost-per-token-falls"
publishedDate: "2026-08-11"
category: "frontend"
feedName: "Vercel"
author: "Amelia Charles"
---

_AI Gateway Production Index — August 2026_

Every month, [AI Gateway](https://vercel.com/ai-gateway) routes tens of trillions of tokens between production applications and AI labs. That traffic gives us a view of what AI usage actually looks like in today's enterprise, and we publish it here monthly. See the Production Index reports from [May](https://vercel.com/blog/ai-gateway-production-index), [June](https://vercel.com/blog/ai-gateway-production-index-june-2026), and [July](https://vercel.com/blog/ai-gateway-production-index-july-2026).

### [Copy link to heading](#august-2026-summary)August 2026 Summary

The August index reports on AI Gateway data collected through July 2026.

-   The average price paid per token fell **13.6%** in July, after rising almost **20%** in May and holding steady in June. Token consumption grew so quickly that even with **37%** growth in spend, cost per token saw a double-digit drop.
    
-   DeepSeek became the **second-largest** lab by token volume, now running **more than twice** Google's volume.
    
-   Anthropic collected **65%** of gateway spending on **30%** of token volume, at **4.4 times** the average price of every other lab's tokens.
    
-   Both media leaderboards changed hands. Google's Nano Banana took the lead in image volume from OpenAI's GPT Image, and ByteDance's Seedance led video in both volume and dollars.
    

## [Copy link to heading](#kimi-k3-launched-into-agent-work)Kimi K3 launched into agent work

Moonshot released Kimi K3 on July 16. Like Z.ai's GLM 5.2 released in June, it is built for long-horizon agent work, so its usage was heavy from the start at about twelve times the tokens per request of its predecessor, K2.5.

It scaled quickly. K3's daily volume tripled between launch week and the final week of July, and by month end its requests were as heavy as Claude Opus 4.8's. On the last full day of July it ranked eighth on the gateway by token volume.

The demand was new rather than diverted. K3 processed nearly two-thirds of all Kimi tokens within two weeks and 82% by the final week, while the rest of the family's volume fell only slightly.

Open weight's share of gateway spend more than doubled in July to 8.6%. More than 90% of that growth is Moonshot and Z.ai. Moonshot's share of total gateway spend quadrupled, to 2.3%. Cheap open-weight models have been taking volume for months without taking revenue. Kimi K3 and GLM 5.2 are the first to capture significant volume at more than eleven times DeepSeek's rate per token.

## [Copy link to heading](#deepseek-is-now-second-by-volume)DeepSeek is now second by volume

In June, this report said DeepSeek had entered the fight for token volume. Last month, we said an open-weight lab would soon be second by volume. In July, DeepSeek surpassed Google to take that place.

Google ran nearly 40% of the gateway’s token volume in April, and DeepSeek less than 1%. By July, DeepSeek ran a quarter, more than twice Google’s 11%. DeepSeek V4 Flash, its cheapest model, ran more tokens alone than all of Google.

The reversal is concentrated in consumer-facing work. Google's share of personal-assistant tokens fell by more than half in a month while DeepSeek's more than tripled, and most of the token share Google gave up went to DeepSeek. DeepSeek's V4 Flash ran more tokens than any other model on the gateway in July, nearly a fifth of the total and 70% more than the next model.

Open-weight models previously owned the cheap end of the market. Their share of gateway token volume nearly tripled between April and June, from 11% to 29%, while share of spend stayed under four cents of every gateway dollar.

In July, volume continued its growth trend, increasing to 36%. Spend broke its trend, more than doubling to nearly nine cents of every dollar, the highest in the index's history.

The four largest frontier labs' combined share of token spend, which had not fallen below 93% in seven months, fell to 89%. Google accounted for most of the decline. Almost none of the spend it lost went to DeepSeek, whose share barely moved even as its volume grew. Z.ai and Moonshot's latest models account for the entire open-weight spend increase.

Buyers sort models by what the task requires, then choose inside that tier according to price. DeepSeek and Opus were never competing. GLM 5.2 and Kimi K3, both released in the last two months, are the first open-weight models running a meaningful share of the workloads historically owned by closed-weight labs.

## [Copy link to heading](#average-price-per-token-fell-13.6%)Average price per token fell 13.6%

Companies bought more inference in July and ran more of it on cheap models. Volume grew 59%, spend grew 37%, and the average price paid per token fell 13.6%.

Holding June's mix of models constant, the average price would have held essentially flat instead of declining. OpenAI is one example: the average cost of an OpenAI token fell to 58% of its June level, because 85% of the volume it added went to GPT-5-Nano, the cheapest model in the GPT-5 family.

The entire decline in average price came from what companies chose to route. Among the thousands of teams that ran more than 10 million tokens in both months, three in four changed at least a tenth of their model mix. Three in five changed at least a quarter.

The median team's cost per token fell 2.9%, but only one team in six stayed within five percent of where it started.

A quarter pared cost by more than 30%, typically teams that entered the month paying well above the gateway average per token. Another quarter paid at least 20% more, typically teams that had been paying below the average. Concurrently, the expensive end shifted down and the cheap end migrated up.

81% of July’s tokens ran on models that were not on the gateway six months ago. Open-weight models crossed a third of all volume, at about a seventh of frontier rates. Google fell from 24.0% of gateway token volume to 10.7%. Anthropic slipped two points to 29.8%, and OpenAI’s share rose to 12.8%.

Gateway spend is up 74% since May and volume has doubled, with July's token growth running at nearly double June's pace. Spend on inference continues to increase even as each dollar buys more tokens than it did in the previous month.

## [Copy link to heading](#anthropic's-premium-widened-as-prices-fell)Anthropic's premium widened as prices fell

Anthropic has held more than 60% of gateway spend in every month we have measured, through a period in which open weight tripled its share of volume. In July, it collected 65.1% of all spend on 30% of total volume.

The average price per Anthropic token ran 4.4 times the average across every other lab, up from 3.4 in June. Part of that rise was Claude Fable 5, which returned on July 1 after a three-week export-control suspension and quickly grew to 13.2% of all gateway spend, second only to Opus 4.8. In coding agents, the gateway's largest use case by tokens, Anthropic collected more than 80% of spend.

Anthropic has no model at the bottom of the market. Haiku 4.5, its least expensive, runs just over two-thirds of the gateway average price per token. OpenAI's GPT-5-Nano runs a sixth; DeepSeek's V4 Flash a sixteenth.

Customers cutting costs on OpenAI or Google can stay in the catalog. Cutting costs on Anthropic means leaving Anthropic, and in July it still took a majority of all spending. Anthropic’s premium is the gap between what the cheap tier can do and what its customers need done.

Switching models on the AI Gateway is a one-line change, so nothing locks a customer in. When Fable 5 came back, daily volume returned to the pre-ban level almost exactly, but nine in ten of the teams running it in July had not used it before. The work returned; the customers were different.

The rest of the market's tokens averaged less than a quarter of Anthropic's price, and Anthropic still took two of every three dollars spent on the gateway. Price competition is happening, but it's happening in the part of the market with the least money in it.

## [Copy link to heading](#google-took-images,-bytedance-took-video)Google took images, ByteDance took video

In June, OpenAI's GPT Image generated most of the gateway's images. In July, Google's Nano Banana led, at 45% of images to GPT Image's 42%, with spend split almost evenly between them. Nearly all of Nano Banana's gain came from one model, Gemini 3.1 Flash Lite Image. Google took the image lead in the same month it fell to fourth by token volume.

ByteDance's Seedance led video on both counts, in videos generated and dollars spent. xAI's Grok Imagine, June's volume leader, fell to second. Chinese labs collected about seven of every ten dollars spent on video.

## [Copy link to heading](#also-in-july’s-data)Also in July’s data

-   Within coding, the gateway's largest workload by tokens, DeepSeek ran nearly a third of the volume and Anthropic collected more than four of every five dollars.
    
-   Back-office agents remain the most expensive work per token, with a share of spending roughly two and a half times their share of volume.
    

## [Copy link to heading](#about-this-report)About this report

This analysis is based on anonymized, aggregate routing data from the Vercel AI Gateway through July 2026.

A few notes on measurement:

-   _Volume_ counts all tokens routed through AI Gateway.
    
-   _Spend_ values every request at the lab's published list price.
    
-   _Price per token_ is calculated as total spend divided by total volume.
    
-   _Open-weight_ volume and spend shares count the four open-weight labs serving their own models at scale (DeepSeek, MiniMax, Moonshot, and Z.ai).
    
-   _Image_ and _video_ figures count media generated, not requests or tokens.
    
-   All figures use the most recent data available; prior months may be revised as methodology is updated.