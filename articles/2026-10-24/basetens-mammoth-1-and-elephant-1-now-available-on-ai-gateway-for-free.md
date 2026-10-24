---
title: "Baseten's Mammoth-1 and Elephant-1 now available on AI Gateway for free"
source: "https://vercel.com/changelog/basetens-mammoth-1-and-elephant-1-now-available-on-ai-gateway-for-free"
publishedDate: "2026-10-21"
category: "frontend"
feedName: "Vercel"
author: "Jerilyn Zheng"
---

[Mammoth-1](https://vercel.com/ai-gateway/models/mammoth-1) and [Elephant-1](https://vercel.com/ai-gateway/models/elephant-1) from Baseten are now available for free on AI Gateway for one week. Free access is available through October 27. These decision models classify text, route requests, and score content against criteria you define.

Mammoth-1 is the larger, 27B model, while Elephant-1 is a smaller, 9B option. Mammoth-1 is #1 on the Jev Decision Index and Elephant-1 is tied for #1 on the Artificial Analysis Decision Index.

Both support a 16k-token context window and return choices, probabilities, and scores. Ask several questions about the same input in one request: select a support team with a Choice question, check for a refund request with a Boolean question, or rate urgency with a Score question. Your application chooses the probability threshold for acting automatically or sending a result for review.

Use `baseten/mammoth-1` or `baseten/elephant-1` as the model name:

See the [decision models documentation](https://vercel.com/docs/ai-gateway/modalities/decision) for question types and additional usage details.

AI Gateway provides a unified API for accessing models and tracking usage and cost. Decision calls appear in [logs](https://vercel.com/docs/ai-gateway/observability-and-spend/logs) and count toward [budgets](https://vercel.com/docs/ai-gateway/observability-and-spend/budgets) alongside other model requests.

Browse [all decision models](https://vercel.com/ai-gateway/models?modality=decision) available on AI Gateway.