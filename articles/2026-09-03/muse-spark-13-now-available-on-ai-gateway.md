---
title: "Muse Spark 1.3 now available on AI Gateway"
source: "https://vercel.com/changelog/muse-spark-1-3-now-available-on-ai-gateway"
publishedDate: "2026-09-02"
category: "frontend"
feedName: "Vercel"
author: "Zachary Chen"
---

[Muse Spark 1.3 from Meta](https://vercel.com/ai-gateway/models/muse-spark-1.3) is now available on AI Gateway, in both the standard and contributor pricing tiers.

This model improves on prior Muse Spark models at agent work and coding, with a 1M token context window and text, image, and PDF input. On coding it takes fewer turns and writes less filler than the previous release.

To use Muse Spark 1.3, set `model` to `meta/muse-spark-1.3`:

## [Copy link to heading](#contributor-tier)Contributor tier

[Muse Spark 1.3 Contributor](https://vercel.com/ai-gateway/models/muse-spark-1.3-contributor) is a pricing tier on the same model rather than a separate one, with the same weights, capabilities, and context window. The difference is that Meta uses the inputs and outputs sent to this tier to train and improve its models, and pricing is lower in exchange.

Model

Input

Output

Cached input

`meta/muse-spark-1.3`

$1.25

$4.25

$0.15

`meta/muse-spark-1.3-contributor`

$0.10

$0.20

$0.002

Rates are per million tokens and unchanged from Muse Spark 1.2 on both tiers.

To use it in a coding agent, see the [coding agents guide](https://vercel.com/docs/ai-gateway/coding-agents), then run `vercel ai-gateway coding-agents setup` to connect Claude Code, Codex, Cursor, and more, then select `meta/muse-spark-1.3` in the agent.

Try Muse Spark 1.3 in the [model playground](https://vercel.com/ai-gateway/models/muse-spark-1.3).

You can view [all language models](https://vercel.com/ai-gateway/models?type=text) available on AI Gateway.